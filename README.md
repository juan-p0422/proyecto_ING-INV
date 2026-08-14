# EduRoom

EduRoom es una implementación académica y original de funciones generales de un LMS. Su diseño procede de ingeniería inversa ética de caja negra: observación de interfaces y flujos, documentación pública y tráfico generado por una cuenta propia de prueba. No contiene código, recursos visuales, credenciales ni datos propietarios de Google.

## Funcionalidades

- Registro, login, consulta de sesión y JWT con contraseñas protegidas mediante bcrypt.
- Roles globales `TEACHER` y `STUDENT`, además de rol local por inscripción.
- Cursos con docente propietario, código de acceso y listado de integrantes.
- Anuncios, tareas con fecha límite, entregas, calificación y retroalimentación.
- Comentarios generales del curso o asociados a una tarea.
- Modelo de adjuntos relacionado con cursos, tareas y entregas.
- Validación de entradas con Zod, CORS configurable, Helmet y límite de solicitudes de autenticación.

El backend no devuelve `passwordHash`. Un docente solo puede crear contenido y calificar dentro de los cursos que posee; un estudiante solo puede entregar en cursos donde está inscrito como estudiante.

## Stack

Node.js 20+, Express, TypeScript, Prisma, PostgreSQL, JWT, bcrypt y Zod. El cliente incluido usa React/Vite.

## Inicio rápido con Docker

Requisitos: Docker Desktop y Docker Compose.

```bash
docker compose up --build
docker compose exec backend npm run prisma:seed
```

Abre `http://localhost:5173`. La API responde en `http://localhost:3000/api/health`.

El seed crea dos cuentas locales con la contraseña `Demo1234!`:

- `docente@eduroom.local`
- `estudiante@eduroom.local`

Estas credenciales son únicamente para desarrollo y no deben cargarse en un entorno público.

## Desarrollo sin Docker

1. Ejecuta `powershell -ExecutionPolicy Bypass -File scripts/setup.ps1`.
2. Configura PostgreSQL y ajusta `backend/.env` a partir de `backend/.env.example`.
3. Ejecuta `npm --prefix backend run prisma:migrate`.
4. Opcionalmente carga datos con `npm --prefix backend run prisma:seed`.
5. Inicia API y cliente en terminales separadas con `npm run dev:backend` y `npm run dev:frontend`.

Para validar un build completo:

```bash
npm run build
```

Los scripts principales del backend son `dev`, `build`, `start`, `prisma:migrate` y `prisma:seed`. También se conservan alias `db:*` para los flujos de Docker existentes.

## API

Salvo registro y login, los endpoints requieren `Authorization: Bearer <token>`.

| Área | Método y ruta | Acceso |
|---|---|---|
| Auth | `POST /api/auth/register` | Público; `role` opcional (`STUDENT` por defecto) |
| Auth | `POST /api/auth/login` | Público |
| Auth | `GET /api/auth/me` | Autenticado |
| Cursos | `GET /api/courses` | Cursos del usuario |
| Cursos | `POST /api/courses` | Docente |
| Cursos | `GET /api/courses/:id` | Integrante |
| Cursos | `POST /api/courses/join` | Autenticado, mediante `code` |
| Cursos | `GET /api/courses/:id/members` | Integrante |
| Anuncios | `GET /api/courses/:courseId/announcements` | Integrante |
| Anuncios | `POST /api/courses/:courseId/announcements` | Docente propietario |
| Tareas | `GET /api/courses/:courseId/assignments` | Integrante |
| Tareas | `POST /api/courses/:courseId/assignments` | Docente propietario |
| Tareas | `GET /api/assignments/:id` | Integrante; entregas filtradas por rol |
| Entregas | `POST /api/assignments/:id/submit` | Estudiante inscrito |
| Entregas | `PATCH /api/submissions/:id/grade` | Docente propietario |
| Comentarios | `GET /api/courses/:courseId/comments` | Integrante |
| Comentarios | `POST /api/courses/:courseId/comments` | Integrante |
| Seguridad | `GET /api/security/integrity` | Resumen público sin hashes ni rutas |

`GET /comments` acepta `assignmentId` como query opcional. Las calificaciones se validan en el intervalo 0–100.

## Variables y seguridad

Consulta [`.env.example`](.env.example). `JWT_SECRET` debe ser aleatorio y tener al menos 32 caracteres. `CORS_ORIGIN` acepta uno o varios orígenes separados por comas. Nunca confirmes archivos `.env`; en producción usa HTTPS y el gestor de secretos de la plataforma.

## Integridad y build educativo

```bash
npm run release:educational
```

El comando compila, ofusca el JavaScript propio del frontend, genera `integrity-manifest.json` y verifica SHA-256. También están disponibles `npm run integrity:generate` y `npm run integrity:verify`. La ofuscación no es cifrado y no sustituye autorización ni gestión de secretos.

El backend verifica sus artefactos al arrancar cuando encuentra el manifest. `STRICT_INTEGRITY=true` bloquea el inicio ante una discrepancia; con `false` registra una advertencia. `INTEGRITY_MANIFEST_PATH` permite indicar una ubicación alternativa.

## Estructura

```text
backend/   API, esquema Prisma, migraciones y seed
frontend/  cliente React/Vite
docs/      memoria académica y protocolo ético
scripts/   preparación y manifiesto SHA-256
```

La derivación conceptual del modelo se documenta en [`docs/05-reconstruccion-estructuras.md`](docs/05-reconstruccion-estructuras.md). El despliegue declarativo está en [`render.yaml`](render.yaml) y su procedimiento en [`docs/10-despliegue-render.md`](docs/10-despliegue-render.md).

## Aviso académico

Las entidades de EduRoom son una reconstrucción conceptual propia, no una afirmación sobre la implementación interna de Google Classroom. Las observaciones deben acompañarse de fecha, entorno, evidencia anonimizada y nivel de certeza. Está prohibido incorporar credenciales, tokens, datos de terceros o capturas con información personal.
