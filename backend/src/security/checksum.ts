import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type IntegrityStatus = 'verified' | 'warning' | 'unavailable';

type ManifestEntry = { path: string; sha256: string; size?: number };
type ManifestScope = { root: string; extensions: string[] };
type IntegrityManifest = {
  version: number;
  algorithm: string;
  generatedAt: string;
  scopes: ManifestScope[];
  files: ManifestEntry[];
};

export type IntegrityReport = {
  status: IntegrityStatus;
  checkedAt: string | null;
  filesChecked: number;
  modifiedFilesCount: number;
  modifiedFiles: string[];
  missingFiles: string[];
  newFiles: string[];
  manifestFound: boolean;
};

let latestReport: IntegrityReport = {
  status: 'unavailable',
  checkedAt: null,
  filesChecked: 0,
  modifiedFilesCount: 0,
  modifiedFiles: [],
  missingFiles: [],
  newFiles: [],
  manifestFound: false,
};

export async function calculateFileSha256(absolutePath: string): Promise<string> {
  const bytes = await fs.readFile(absolutePath);
  return createHash('sha256').update(bytes).digest('hex');
}

async function exists(absolutePath: string) {
  try { await fs.access(absolutePath); return true; } catch { return false; }
}

async function locateManifest(explicitPath?: string): Promise<string | null> {
  const candidates = [
    explicitPath ? path.resolve(explicitPath) : null,
    path.resolve(process.cwd(), 'integrity-manifest.json'),
    path.resolve(process.cwd(), '..', 'integrity-manifest.json'),
    path.resolve(__dirname, '..', '..', '..', '..', 'integrity-manifest.json'),
  ].filter((candidate): candidate is string => Boolean(candidate));
  for (const candidate of [...new Set(candidates)]) if (await exists(candidate)) return candidate;
  return null;
}

function validateManifest(value: unknown): IntegrityManifest {
  const candidate = value as Partial<IntegrityManifest>;
  if (candidate.version !== 1 || candidate.algorithm !== 'sha256' || !Array.isArray(candidate.files) || !Array.isArray(candidate.scopes)) {
    throw new Error('Formato de manifest de integridad no compatible.');
  }
  for (const entry of candidate.files) {
    if (!entry || typeof entry.path !== 'string' || !/^[a-f0-9]{64}$/.test(entry.sha256)) throw new Error('Entrada inválida en el manifest de integridad.');
  }
  return candidate as IntegrityManifest;
}

function safeResolve(root: string, relativePath: string): string {
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(`${root}${path.sep}`)) throw new Error('El manifest contiene una ruta fuera del proyecto.');
  return resolved;
}

async function collectJavaScript(directory: string): Promise<string[]> {
  if (!await exists(directory)) return [];
  const result: string[] = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await collectJavaScript(absolute));
    else if (entry.isFile() && entry.name.endsWith('.js') && !/\.(tmp|temp)\.js$/i.test(entry.name)) result.push(absolute);
  }
  return result;
}

export async function verifyBackendIntegrity(options: { strict: boolean; manifestPath?: string }): Promise<IntegrityReport> {
  const checkedAt = new Date().toISOString();
  const locatedManifest = await locateManifest(options.manifestPath);
  if (!locatedManifest) {
    latestReport = { ...latestReport, status: 'unavailable', checkedAt, manifestFound: false };
    console.warn('[integrity] Manifest no encontrado; verificación no disponible.');
    if (options.strict) {
      throw new Error('STRICT_INTEGRITY requires an integrity manifest before startup.');
    }
    return latestReport;
  }

  try {
    const manifestRoot = path.dirname(locatedManifest);
    const manifest = validateManifest(JSON.parse(await fs.readFile(locatedManifest, 'utf8')));
    const expectedEntries = manifest.files.filter((entry) => entry.path.startsWith('backend/dist/') && entry.path.endsWith('.js'));
    const expectedPaths = new Set(expectedEntries.map((entry) => entry.path));
    const modifiedFiles: string[] = [];
    const missingFiles: string[] = [];
    let filesChecked = 0;

    for (const entry of expectedEntries) {
      const absolute = safeResolve(manifestRoot, entry.path);
      if (!await exists(absolute)) { missingFiles.push(entry.path); continue; }
      filesChecked += 1;
      if (await calculateFileSha256(absolute) !== entry.sha256) modifiedFiles.push(entry.path);
    }

    const backendScope = manifest.scopes.find((scope) => scope.root === 'backend/dist');
    const currentFiles = backendScope ? await collectJavaScript(safeResolve(manifestRoot, backendScope.root)) : [];
    const newFiles = currentFiles
      .map((absolute) => path.relative(manifestRoot, absolute).split(path.sep).join('/'))
      .filter((relative) => !expectedPaths.has(relative));
    const modifiedFilesCount = modifiedFiles.length + missingFiles.length + newFiles.length;

    latestReport = {
      status: modifiedFilesCount === 0 && expectedEntries.length > 0 ? 'verified' : 'warning',
      checkedAt,
      filesChecked,
      modifiedFilesCount,
      modifiedFiles,
      missingFiles,
      newFiles,
      manifestFound: true,
    };

    if (latestReport.status === 'verified') console.info(`[integrity] ${filesChecked} archivos del backend verificados.`);
    else if (expectedEntries.length === 0) console.warn('[integrity] El manifiesto no contiene artefactos verificables del backend.');
    else console.warn(`[integrity] Advertencia: ${modifiedFilesCount} discrepancias en artefactos del backend.`);
  } catch (error) {
    latestReport = { ...latestReport, status: 'warning', checkedAt, manifestFound: true, modifiedFilesCount: Math.max(1, latestReport.modifiedFilesCount) };
    console.warn(`[integrity] No fue posible completar la verificación: ${error instanceof Error ? error.message : 'error desconocido'}`);
  }

  if (options.strict && latestReport.status !== 'verified') {
    throw new Error('STRICT_INTEGRITY impidió el arranque por una discrepancia de integridad.');
  }
  return latestReport;
}

export function getPublicIntegrityStatus() {
  const { status, checkedAt, filesChecked, modifiedFilesCount } = latestReport;
  return { status, checkedAt, filesChecked, modifiedFilesCount };
}
