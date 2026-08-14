import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api, ApiError } from '../src/services/api';

const getItem = vi.fn();
Object.defineProperty(globalThis, 'localStorage', {
  value: { getItem },
  configurable: true,
});

describe('cliente API', () => {
  beforeEach(() => {
    getItem.mockReset();
    vi.restoreAllMocks();
  });

  it('envía el token disponible y conserva encabezados propios', async () => {
    getItem.mockReturnValue('token-de-prueba');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ));

    await expect(api<{ ok: boolean }>('/health', {
      headers: { 'X-Test': 'eduroom' },
    })).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0].toString()).toMatch(/\/api\/health$/);
    expect(fetchMock.mock.calls[0][1]?.headers).toMatchObject({
      Authorization: 'Bearer token-de-prueba',
      'Content-Type': 'application/json',
      'X-Test': 'eduroom',
    });
  });

  it('convierte una respuesta no exitosa en ApiError', async () => {
    getItem.mockReturnValue(null);
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ message: 'Acceso denegado.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    ));

    await expect(api('/courses')).rejects.toMatchObject({
      name: ApiError.name,
      status: 403,
      message: 'Acceso denegado.',
    });
  });
});
