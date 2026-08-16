'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function verify(filePath, expectedHash) {
  const actualHash = sha256(filePath);
  return { ok: actualHash === expectedHash, expectedHash, actualHash };
}

const demoDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'eduroom-integrity-demo-'));
const controlledFile = path.join(demoDirectory, 'controlled-artifact.txt');

try {
  console.log('=== Demostración controlada de integridad EduRoom ===');
  console.log(`Directorio temporal: ${demoDirectory}`);
  console.log('Los artefactos productivos no se modifican.');

  fs.writeFileSync(controlledFile, 'artefacto-controlado-v1\n', 'utf8');
  const expectedHash = sha256(controlledFile);
  console.log(`Manifest temporal generado: SHA-256 ${expectedHash}`);

  const initial = verify(controlledFile, expectedHash);
  if (!initial.ok) throw new Error('La verificación inicial debía coincidir.');
  console.log('OK: verificación inicial correcta; 0 discrepancias.');

  fs.appendFileSync(controlledFile, 'modificacion-temporal-controlada\n', 'utf8');
  const modified = verify(controlledFile, expectedHash);
  if (modified.ok) throw new Error('La modificación controlada no fue detectada.');

  console.log('DETECTADO: el archivo temporal ya no coincide con el checksum esperado.');
  console.log(`Esperado: ${modified.expectedHash}`);
  console.log(`Actual:   ${modified.actualHash}`);
  console.log('RESULTADO: demostración aprobada; la discrepancia fue detectada.');
} finally {
  fs.rmSync(demoDirectory, { recursive: true, force: true });
  console.log('Limpieza: directorio temporal eliminado.');
}
