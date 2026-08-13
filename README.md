# EduRoom

EduRoom es una réplica académica y original de funciones generales de un LMS. Se construyó mediante ingeniería inversa ética de caja negra: observación de interfaces y flujos, documentación pública y tráfico generado por una cuenta propia de prueba. No contiene marcas, código, recursos visuales ni datos propietarios de Google.

## Alcance de esta primera versión

- Registro e inicio de sesión con JWT y contraseñas protegidas con bcrypt.
- Roles de estudiante, docente y administrador.
- Creación de cursos para docentes y unión mediante código.
- Panel adaptable para consultar cursos y participantes.
- API REST en Express/TypeScript y PostgreSQL mediante Prisma.
- Ejecución local con Docker Compose y despliegue declarativo en Render.
- Reporte académico base en [`docs/00-indice.md`](docs/00-indice.md).

## Inicio rápido con Docker

Requisitos: Docker Desktop y Docker Compose.

```bash
docker compose up --build
```

Abre `http://localhost:5173`. La API responde en `http://localhost:3000/api/health`. Para cargar la cuenta docente de demostración:

```bash
docker compose exec backend npm run db:seed
```

Credenciales: `docente@eduroom.local` / `Demo1234!`. Son únicamente datos locales y deben cambiarse o eliminarse en otros entornos.

## Desarrollo sin Docker

1. Ejecuta `powershell -ExecutionPolicy Bypass -File scripts/setup.ps1`.
2. Configura PostgreSQL y ajusta `backend/.env`.
3. Ejecuta `npm --prefix backend run db:migrate`.
4. En terminales separadas ejecuta `npm run dev:backend` y `npm run dev:frontend`.

## Variables y seguridad

Consulta [`.env.example`](.env.example). `JWT_SECRET` debe ser aleatorio y tener al menos 32 caracteres. Nunca confirmes archivos `.env`. En producción restringe `CORS_ORIGIN` al dominio real del frontend, usa HTTPS y gestiona secretos desde la plataforma.

## Estructura

```text
backend/   API, modelo Prisma y migraciones
frontend/  cliente React/Vite
docs/      memoria académica y protocolo ético
scripts/   preparación y manifiesto SHA-256
```

## Render

El archivo [`render.yaml`](render.yaml) crea PostgreSQL, la API y el sitio estático. Si Render asigna nombres de host distintos, actualiza `VITE_API_URL` y `CORS_ORIGIN` en el panel y vuelve a desplegar. El procedimiento completo está en [`docs/10-despliegue-render.md`](docs/10-despliegue-render.md).

## Aviso académico

Este repositorio documenta una reconstrucción conceptual. Las afirmaciones sobre el sistema observado deben acompañarse de fecha, entorno, evidencia anonimizada y nivel de certeza. Está prohibido incorporar credenciales, tokens, datos de terceros o capturas con información personal.

