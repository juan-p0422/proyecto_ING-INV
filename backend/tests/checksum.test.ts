import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { verifyRuntimeIntegrity } from '../src/security/checksum';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true }),
  ));
});

describe('integridad estricta', () => {
  it('impide continuar cuando el manifiesto no contiene un build verificable', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'eduroom-integrity-'));
    temporaryDirectories.push(directory);
    const manifestPath = path.join(directory, 'integrity-manifest.json');
    await writeFile(manifestPath, JSON.stringify({
      version: 1,
      algorithm: 'sha256',
      generatedAt: new Date().toISOString(),
      scopes: [{ root: 'backend/dist', extensions: ['.js'] }],
      files: [],
    }));

    await expect(verifyRuntimeIntegrity({ strict: true, manifestPath }))
      .rejects.toThrow('STRICT_INTEGRITY');
  });

  it('incluye los artefactos del frontend en la verificación estricta', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'eduroom-integrity-'));
    temporaryDirectories.push(directory);
    const frontendDirectory = path.join(directory, 'frontend', 'dist');
    await mkdir(frontendDirectory, { recursive: true });
    const frontendPath = path.join(frontendDirectory, 'index.html');
    await writeFile(frontendPath, '<!doctype html><title>EduRoom</title>');
    const relativePath = 'frontend/dist/index.html';
    const sha256 = createHash('sha256').update(await readFile(frontendPath)).digest('hex');
    const manifestPath = path.join(directory, 'integrity-manifest.json');
    await writeFile(manifestPath, JSON.stringify({
      version: 1,
      algorithm: 'sha256',
      generatedAt: new Date().toISOString(),
      scopes: [{ root: 'frontend/dist', extensions: ['.html'] }],
      files: [{ path: relativePath, sha256 }],
    }));

    await expect(verifyRuntimeIntegrity({ strict: true, manifestPath }))
      .resolves.toMatchObject({ status: 'verified', filesChecked: 1 });
    await writeFile(frontendPath, '<!doctype html><title>Alterado</title>');
    await expect(verifyRuntimeIntegrity({ strict: true, manifestPath }))
      .rejects.toThrow('STRICT_INTEGRITY');
  });
});
