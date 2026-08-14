import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { verifyBackendIntegrity } from '../src/security/checksum';

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

    await expect(verifyBackendIntegrity({ strict: true, manifestPath }))
      .rejects.toThrow('STRICT_INTEGRITY');
  });
});
