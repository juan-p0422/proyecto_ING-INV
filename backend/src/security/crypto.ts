import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_BYTES = 12;
const KEY_BYTES = 32;
const KEY_DERIVATION_CONTEXT = 'eduroom:aes-256-gcm:v1';

export type EncryptedTextPayload = {
  version: 1;
  algorithm: typeof ALGORITHM;
  iv: string;
  authTag: string;
  ciphertext: string;
};

export class EncryptionConfigurationError extends Error {
  constructor(message = 'APP_ENCRYPTION_KEY no está configurada correctamente.') {
    super(message);
    this.name = 'EncryptionConfigurationError';
  }
}

function deriveKey(keyMaterial = process.env.APP_ENCRYPTION_KEY): Buffer {
  if (!keyMaterial || keyMaterial.length < 32) throw new EncryptionConfigurationError();
  return scryptSync(keyMaterial, KEY_DERIVATION_CONTEXT, KEY_BYTES);
}

function decodePayload(payload: EncryptedTextPayload | string): EncryptedTextPayload {
  let parsed: unknown = payload;
  if (typeof payload === 'string') {
    try { parsed = JSON.parse(payload); }
    catch { throw new Error('El payload cifrado no tiene un formato válido.'); }
  }
  const value = parsed as Partial<EncryptedTextPayload>;
  if (value.version !== 1 || value.algorithm !== ALGORITHM || typeof value.iv !== 'string' || typeof value.authTag !== 'string' || typeof value.ciphertext !== 'string') {
    throw new Error('El payload cifrado no tiene un formato válido.');
  }
  return value as EncryptedTextPayload;
}

export function encryptText(plaintext: string, keyMaterial?: string): EncryptedTextPayload {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, deriveKey(keyMaterial), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return {
    version: 1,
    algorithm: ALGORITHM,
    iv: iv.toString('base64'),
    authTag: cipher.getAuthTag().toString('base64'),
    ciphertext: ciphertext.toString('base64'),
  };
}

export function decryptText(payload: EncryptedTextPayload | string, keyMaterial?: string): string {
  const value = decodePayload(payload);
  const iv = Buffer.from(value.iv, 'base64');
  const authTag = Buffer.from(value.authTag, 'base64');
  if (iv.length !== IV_BYTES || authTag.length !== 16) throw new Error('El payload cifrado no tiene un formato válido.');
  try {
    const decipher = createDecipheriv(ALGORITHM, deriveKey(keyMaterial), iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(Buffer.from(value.ciphertext, 'base64')), decipher.final()]).toString('utf8');
  } catch (error) {
    if (error instanceof EncryptionConfigurationError) throw error;
    throw new Error('No fue posible autenticar o descifrar el payload.');
  }
}

