import { api, ApiError } from '../services/api';

export type IntegrityState = 'verified' | 'mismatch' | 'unavailable';

type IntegrityResponse = {
  valid: boolean;
  buildId?: string;
};

/**
 * Comprobación conceptual para fines educativos. El servidor debe decidir si el
 * identificador pertenece a un build autorizado. Esta señal del cliente puede
 * alterarse y nunca sustituye autenticación, autorización ni controles del servidor.
 */
export async function verifyClientIntegrity(): Promise<IntegrityState> {
  const buildId = import.meta.env.VITE_BUILD_ID ?? 'development';
  try {
    const result = await api<IntegrityResponse>('/security/integrity', {
      method: 'POST',
      body: JSON.stringify({ buildId, client: 'eduroom-web' }),
    });
    return result.valid ? 'verified' : 'mismatch';
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 501)) {
      return 'unavailable';
    }
    return 'unavailable';
  }
}
