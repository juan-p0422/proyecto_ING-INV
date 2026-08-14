import { api } from '../services/api';

export type IntegrityState = 'verified' | 'warning' | 'unavailable';

type IntegrityResponse = {
  status: IntegrityState;
  checkedAt: string | null;
  filesChecked: number;
  modifiedFilesCount: number;
};

/**
 * Comprobación conceptual para fines educativos. El servidor debe decidir si el
 * identificador pertenece a un build autorizado. Esta señal del cliente puede
 * alterarse y nunca sustituye autenticación, autorización ni controles del servidor.
 */
export async function verifyClientIntegrity(): Promise<IntegrityState> {
  try {
    const result = await api<IntegrityResponse>('/security/integrity');
    return ['verified', 'warning', 'unavailable'].includes(result.status) ? result.status : 'unavailable';
  } catch {
    return 'unavailable';
  }
}
