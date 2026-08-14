# 10. Despliegue local y en Render

## Arquitectura de producción

EduRoom se despliega como una sola aplicación web:

1. Vite compila React en `frontend/dist` con `VITE_API_URL=/api`.
2. TypeScript compila Express en `backend/dist` y Prisma genera su cliente.
3. Con `NODE_ENV=production`, Express sirve los archivos de `frontend/dist` y devuelve `index.html` como fallback para las rutas de la SPA.
4. La API permanece bajo `/api` y no queda interceptada por el fallback.
5. Antes de cada arranque, `npm run start:prod` ejecuta `prisma migrate deploy` y luego `npm start`.

Docker Compose agrega PostgreSQL como servicio `db`. El Blueprint de Render crea una base PostgreSQL administrada y un solo servicio web Node para el backend y el frontend compilado.

## Ejecución local con Docker Compose

Requisitos: Docker Desktop con Docker Compose v2.

Desde la raíz del repositorio:

```bash
docker compose up --build -d
docker compose ps
```

La aplicación completa queda en `http://localhost:3000`. Compose espera a que PostgreSQL esté sano antes de iniciar el backend; el backend aplica las migraciones y expone su propio healthcheck.

Comprueba la API:

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:

```json
{"status":"ok","service":"eduroom-api"}
```

Comprueba también el frontend y el fallback SPA:

```bash
curl -I http://localhost:3000/
curl -I http://localhost:3000/login
```

Ambas rutas deben entregar HTML. Una ruta desconocida bajo `/api`, en cambio, debe conservar una respuesta API `404`.

La carga de datos de demostración es opcional:

```bash
docker compose exec backend npm run prisma:seed
```

Para inspeccionar problemas:

```bash
docker compose logs -f db backend
```

Para detener los contenedores sin borrar PostgreSQL:

```bash
docker compose down
```

`docker compose down -v` también elimina el volumen y todos los datos locales; úsalo únicamente cuando quieras reiniciar la base desde cero.

## Variables locales

Compose dispone de valores de demostración, por lo que puede arrancar sin un `.env`. Para personalizar el entorno, copia `.env.example` como `.env` en la raíz y reemplaza las claves. `.gitignore` y `.dockerignore` excluyen los archivos `.env` reales.

Variables requeridas por la aplicación:

| Variable | Valor local típico | Descripción |
|---|---|---|
| `DATABASE_URL` | `postgresql://...@localhost:5432/eduroom?schema=public` | Conexión de Prisma cuando se ejecuta fuera de Compose. Dentro de Compose se genera con host `db`. |
| `JWT_SECRET` | secreto aleatorio de 32+ caracteres | Firma y verificación de JWT. |
| `APP_ENCRYPTION_KEY` | secreto aleatorio distinto de 32+ caracteres | Derivación de la clave usada para notas cifradas. |
| `PORT` | `3000` | Puerto de Express y puerto publicado por Compose. |
| `NODE_ENV` | `production` | Activa el servicio de archivos estáticos de React. |
| `CORS_ORIGIN` | `http://localhost:3000` | Orígenes permitidos, separados por comas. |
| `STRICT_INTEGRITY` | `false` | Si es `true`, una discrepancia del manifiesto impide arrancar. |

Variables adicionales:

| Variable | Uso |
|---|---|
| `VITE_API_URL` | Se incorpora durante el build de Vite. Debe ser `/api` para el contenedor full-stack. |
| `JWT_EXPIRES_IN` | Vigencia de los tokens; valor predeterminado `8h`. |
| `INTEGRITY_MANIFEST_PATH` | Ruta opcional a un manifiesto de integridad alternativo. |

Genera secretos independientes, por ejemplo:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Ejecuta el comando dos veces y no reutilices una clave como la otra.

## Construcción de la imagen Docker

El contexto debe ser la raíz porque el Dockerfile copia tanto `backend` como `frontend`:

```bash
docker build \
  -f backend/Dockerfile \
  --build-arg VITE_API_URL=/api \
  -t eduroom:local .
```

Las etapas ejecutan `npm ci` (instalación reproducible desde los lockfiles), `prisma generate`, `npm run build` para backend y frontend, y finalmente instalan solo dependencias de producción. El contenedor arranca con:

```bash
npm run start:prod
```

Este script equivale a:

```bash
npm run db:deploy && npm start
```

## Despliegue mediante Blueprint en Render

1. Publica el repositorio en un origen autorizado. Verifica antes que ningún `.env` esté versionado con `git ls-files "*.env"`.
2. En el Dashboard de Render elige **New > Blueprint**.
3. Conecta el repositorio y permite que Render detecte `render.yaml` en la raíz.
4. Revisa el nombre, la región y los planes disponibles antes de aplicar el Blueprint.
5. Crea los recursos. El Blueprint enlaza `DATABASE_URL` con la cadena privada de PostgreSQL y genera `JWT_SECRET` y `APP_ENCRYPTION_KEY`.
6. Espera a que termine el build y revisa en los logs que `prisma migrate deploy` finalice antes de que Express escuche el puerto.
7. Abre `https://<nombre-del-servicio>.onrender.com/api/health` y después `https://<nombre-del-servicio>.onrender.com/`.

El servicio usa estos comandos declarados:

```bash
# Build
npm ci --prefix backend && npm ci --prefix frontend && npm --prefix backend run db:generate && npm run build

# Start
npm --prefix backend run start:prod
```

El build ejecuta explícitamente `prisma generate`; `npm run build` compila TypeScript y Vite. El start aplica solo migraciones ya versionadas mediante `prisma migrate deploy`: no usa `prisma migrate dev` ni crea migraciones en producción.

## Variables en Render

| Variable | Configuración del Blueprint |
|---|---|
| `DATABASE_URL` | `fromDatabase.connectionString` de `eduroom-db`. |
| `JWT_SECRET` | `generateValue: true`; no se almacena en Git. |
| `APP_ENCRYPTION_KEY` | `generateValue: true`; no se almacena en Git. |
| `NODE_ENV` | `production`. |
| `CORS_ORIGIN` | `self`; el backend lo resuelve a `RENDER_EXTERNAL_URL`. Para dominios personalizados, reemplázalo por los orígenes HTTPS exactos, separados por comas. |
| `STRICT_INTEGRITY` | `false` inicialmente. Actívalo solo con un manifiesto regenerado para el artefacto desplegado. |
| `VITE_API_URL` | `/api`, incorporado al frontend durante el build. |
| `PORT` | No se fija en el Blueprint: Render lo proporciona y Express lo lee. |

`JWT_SECRET` y `APP_ENCRYPTION_KEY` deben mantenerse estables. Cambiar el primero invalida sesiones; cambiar el segundo impide descifrar notas ya almacenadas.

## Lista de verificación posterior

- `GET /api/health` devuelve HTTP `200` y JSON con `status: ok`.
- `/` y una ruta profunda de React entregan la SPA.
- Una ruta inexistente como `/api/no-existe` devuelve `404` y no `index.html`.
- Los logs muestran las migraciones aplicadas sin errores.
- Se puede registrar un usuario, iniciar sesión y consultar cursos.
- No hay secretos en el repositorio, logs, capturas o evidencias.

## Solución de problemas

- **El build de Vite apunta a otra API:** confirma que `VITE_API_URL=/api` estaba presente durante el build y solicita un redeploy con limpieza de caché.
- **La aplicación inicia antes de tener tablas:** confirma que el Start Command sea `npm --prefix backend run start:prod` y revisa el resultado de `prisma migrate deploy`.
- **Render no detecta el puerto:** no fijes un puerto distinto; el servidor ya escucha `process.env.PORT` en `0.0.0.0`.
- **CORS falla con un dominio personalizado:** configura `CORS_ORIGIN` con la URL HTTPS exacta. Se aceptan varios orígenes separados por comas.
- **El frontend devuelve 404 al recargar:** confirma `NODE_ENV=production` y que el build produjo `frontend/dist/index.html`.
- **PostgreSQL no conecta:** verifica que `DATABASE_URL` siga enlazada a `eduroom-db` y que la base y el servicio estén en la misma región.

Los planes, límites y disponibilidad pueden cambiar. Verifica la configuración vigente antes de un despliegue real y define copias de seguridad, retención, alertas, dominio y política de privacidad según el entorno.

## Referencias operativas

- [Render Blueprint YAML Reference](https://render.com/docs/blueprint-spec)
- [Render: Monorepo Support](https://render.com/docs/monorepo-support)
- [Render: Default Environment Variables](https://render.com/docs/environment-variables)
- [Render: Health Checks](https://render.com/docs/health-checks)
- [Prisma: Deploying database changes with Prisma Migrate](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate)
