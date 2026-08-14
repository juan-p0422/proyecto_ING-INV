'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(projectRoot, 'integrity-manifest.json');
const scopes = [
  { root: 'backend/dist', extensions: ['.js'] },
  { root: 'frontend/dist', extensions: ['.js', '.css', '.html'] },
];

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function isTemporary(name) {
  return name.startsWith('.') || name.endsWith('~') || /\.(tmp|temp|swp)$/i.test(name);
}

function collectFiles(directory, extensions) {
  if (!fs.existsSync(directory)) return [];
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || isTemporary(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...collectFiles(absolute, extensions));
    else if (entry.isFile() && extensions.includes(path.extname(entry.name).toLowerCase())) result.push(absolute);
  }
  return result;
}

function sha256(absolutePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');
}

const files = scopes.flatMap((scope) =>
  collectFiles(path.join(projectRoot, scope.root), scope.extensions).map((absolutePath) => ({
    path: toPosix(path.relative(projectRoot, absolutePath)),
    sha256: sha256(absolutePath),
    size: fs.statSync(absolutePath).size,
  })),
).sort((left, right) => left.path.localeCompare(right.path));

if (files.length === 0) {
  console.error('No se encontraron artefactos. Ejecuta primero el build del backend y frontend.');
  process.exit(1);
}

const manifest = {
  version: 1,
  algorithm: 'sha256',
  generatedAt: new Date().toISOString(),
  scopes,
  files,
};

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Manifest generado: ${path.relative(projectRoot, manifestPath)} (${files.length} archivos).`);

