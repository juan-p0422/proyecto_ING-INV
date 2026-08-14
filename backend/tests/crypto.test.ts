import { describe, expect, it } from 'vitest';
import { decryptText, encryptText, EncryptionConfigurationError } from '../src/security/crypto';

const testKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

describe('AES-256-GCM', () => {
  it('cifra y descifra texto UTF-8', () => {
    const payload = encryptText('Retroalimentación privada de prueba.', testKey);
    expect(payload.ciphertext).not.toContain('Retroalimentación');
    expect(decryptText(payload, testKey)).toBe('Retroalimentación privada de prueba.');
  });

  it('utiliza un IV aleatorio para cada operación', () => {
    expect(encryptText('mismo texto', testKey).iv).not.toBe(encryptText('mismo texto', testKey).iv);
  });

  it('rechaza un payload alterado', () => {
    const payload = encryptText('contenido íntegro', testKey);
    payload.ciphertext = `${payload.ciphertext.slice(0, -2)}AA`;
    expect(() => decryptText(payload, testKey)).toThrow('No fue posible autenticar');
  });

  it('requiere material de clave suficiente', () => {
    expect(() => encryptText('texto', 'corta')).toThrow(EncryptionConfigurationError);
  });
});
