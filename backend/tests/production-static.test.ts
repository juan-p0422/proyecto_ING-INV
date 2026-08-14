import type { Server } from 'node:http';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('servidor full-stack de producción', () => {
  let server: Server;
  let origin: string;

  beforeAll(async () => {
    Object.assign(process.env, {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://eduroom:unused@127.0.0.1:5432/eduroom?schema=public',
      JWT_SECRET: 'validation_secret_with_more_than_32_characters',
      APP_ENCRYPTION_KEY: 'validation_encryption_key_with_more_than_32_characters',
      CORS_ORIGIN: 'http://localhost',
      STRICT_INTEGRITY: 'false',
      FRONTEND_DIST_PATH: path.resolve(process.cwd(), 'tests/fixtures/frontend'),
    });

    const { app } = await import('../src/app');
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('No se obtuvo el puerto de prueba.');
    origin = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  });

  it('mantiene disponible el healthcheck de la API', async () => {
    const response = await fetch(`${origin}/api/health`);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'ok', service: 'eduroom-api' });
  });

  it.each(['/', '/courses/demo'])('sirve index.html para %s', async (route) => {
    const response = await fetch(`${origin}${route}`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/html');
    expect(await response.text()).toContain('<div id="root"></div>');
  });

  it('no convierte rutas API desconocidas en respuestas SPA', async () => {
    const response = await fetch(`${origin}/api/no-existe`);
    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).toContain('application/json');
  });
});
