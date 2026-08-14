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
docker compose up --build -d
docker compose ps
curl http://localhost:3000/api/health
docker compose exec backend npm run prisma:seed
```

Abre `http://localhost:3000`. Express entrega la aplicación React y la API bajo `/api` desde el mismo contenedor. La primera ejecución espera a PostgreSQL, aplica `prisma migrate deploy` y después inicia el servidor. La respuesta de salud esperada es:

```json
{"status":"ok","service":"eduroom-api","uptime":12.345,"timestamp":"2026-08-13T20:00:00.000Z","environment":"production"}
```

Compose incluye valores de demostración para arrancar sin configuración adicional. Para personalizarlos, copia `.env.example` como `.env`, cambia las claves locales y vuelve a crear los contenedores. El archivo `.env` está ignorado por Git y no debe confirmarse.

Para detener el entorno sin borrar los datos:

```bash
docker compose down
```

Usa `docker compose down -v` solo si también quieres eliminar el volumen local de PostgreSQL.

La imagen full-stack también se puede construir por separado:

```bash
docker build -f backend/Dockerfile --build-arg VITE_API_URL=/api -t eduroom:local .
```

El Dockerfile usa etapas separadas para instalar y compilar Vite, generar Prisma, compilar TypeScript y crear una imagen de ejecución con dependencias de producción. Su comando final ejecuta `npm run start:prod`, que aplica las migraciones pendientes antes de `npm start`.

## Credenciales demo

Después de ejecutar `docker compose exec backend npm run prisma:seed`, quedan disponibles:

| Rol | Correo | Contraseña |
|---|---|---|
| Profesor | `teacher@eduroom.local` | `Teacher123!` |
| Estudiante | `student@eduroom.local` | `Student123!` |

El seed también crea el curso `Diseño de experiencias educativas`, código `AULA2026`, un anuncio, una tarea, una inscripción, una entrega pendiente y un comentario. Es idempotente: puede repetirse para restaurar el escenario antes de una presentación.

Estas credenciales son exclusivamente locales y no deben cargarse en un entorno público.

## Desarrollo sin Docker

1. Ejecuta `powershell -ExecutionPolicy Bypass -File scripts/setup.ps1`.
2. Configura PostgreSQL y ajusta `backend/.env` a partir de `backend/.env.example`.
3. Ejecuta `npm --prefix backend run prisma:migrate`.
4. Opcionalmente carga datos con `npm --prefix backend run prisma:seed`.
5. Copia `frontend/.env.example` como `frontend/.env` para que Vite use `http://localhost:3000/api`.
6. Inicia API y cliente en terminales separadas con `npm run dev:backend` y `npm run dev:frontend`.

Para validar un build completo:

```bash
npm run build
npm test
```

Ambos comandos deben finalizar con código `0`. El build valida TypeScript y genera los artefactos de producción; las pruebas cubren cifrado autenticado, manipulación de ciphertext, healthcheck y entrega de la SPA sin confundir rutas `/api` con rutas del frontend.

Los scripts principales del backend son `dev`, `build`, `start`, `start:prod`, `prisma:migrate` y `prisma:seed`. También se conservan alias `db:*` para los flujos de Docker y Render.

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
| Seguridad | `POST /api/security/secure-notes` | Crea una nota cifrada del usuario autenticado |
| Seguridad | `GET /api/security/secure-notes` | Descifra únicamente las notas del usuario autenticado |

`GET /comments` acepta `assignmentId` como query opcional. Las calificaciones se validan en el intervalo 0–100.

## Variables y seguridad

Consulta [`.env.example`](.env.example). Las variables principales son:

| Variable | Uso |
|---|---|
| `DATABASE_URL` | Conexión PostgreSQL usada por Prisma. Compose la construye para el servicio `db`; Render la toma de la base administrada. |
| `JWT_SECRET` | Firma de tokens; usa un secreto aleatorio de al menos 32 caracteres. |
| `APP_ENCRYPTION_KEY` | Material de clave para AES-256-GCM; debe ser distinto de `JWT_SECRET`. |
| `PORT` | Puerto de escucha. Compose usa `3000`; Render lo inyecta automáticamente. |
| `NODE_ENV` | Usa `production` para servir `frontend/dist` desde Express. |
| `CORS_ORIGIN` | Uno o varios orígenes exactos separados por comas. El valor `self` usa `RENDER_EXTERNAL_URL`. |
| `STRICT_INTEGRITY` | Con `true`, una discrepancia del manifiesto bloquea el arranque. |
| `VITE_API_URL` | URL incorporada al build de Vite; usa `/api` en la aplicación full-stack. |

`JWT_EXPIRES_IN` e `INTEGRITY_MANIFEST_PATH` son opcionales. Nunca confirmes archivos `.env`; en producción usa HTTPS y el gestor de secretos de la plataforma.

Antes de entregar, verifica que solo estén versionadas las plantillas públicas:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)'
```

En PowerShell, el equivalente es `git ls-files | Select-String '(^|/)\.env($|\.)'`.

La salida esperada contiene únicamente `.env.example`, `backend/.env.example` y `frontend/.env.example`; nunca una ruta terminada exactamente en `.env` ni variantes privadas como `.env.local`.

Genera una clave de cifrado de 32 bytes con Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Asigna el resultado a `APP_ENCRYPTION_KEY`. Si la variable no existe, la aplicación sigue disponible, pero los endpoints de notas seguras responden `503`. No cambies o pierdas la clave mientras existan notas: AES-GCM detectará la clave incorrecta y no podrá recuperarlas.

Ejemplo autenticado:

```bash
curl -X POST http://localhost:3000/api/security/secure-notes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Nota privada de demostración"}'

curl http://localhost:3000/api/security/secure-notes \
  -H "Authorization: Bearer <token>"
```

## Integridad y build educativo

```bash
npm run release:educational
```

El comando compila, ofusca el JavaScript propio del frontend, genera `integrity-manifest.json` y verifica SHA-256. También están disponibles `npm run integrity:generate` y `npm run integrity:verify`. La ofuscación no es cifrado y no sustituye autorización ni gestión de secretos.

El backend verifica sus artefactos antes de abrir el puerto. `STRICT_INTEGRITY=true` bloquea el inicio ante una discrepancia, un manifiesto inválido o ausente; con `false` registra una advertencia o estado no disponible. `INTEGRITY_MANIFEST_PATH` permite indicar una ubicación alternativa.

## Estructura

```text
backend/   API, esquema Prisma, migraciones y seed
frontend/  cliente React/Vite
docs/      memoria académica y protocolo ético
scripts/   preparación y manifiesto SHA-256
```

La derivación conceptual del modelo se documenta en [`docs/05-reconstruccion-estructuras.md`](docs/05-reconstruccion-estructuras.md). El despliegue declarativo está en [`render.yaml`](render.yaml) y su procedimiento en [`docs/10-despliegue-render.md`](docs/10-despliegue-render.md).

Para la exposición consulta [`docs/12-guion-presentacion.md`](docs/12-guion-presentacion.md) y completa [`docs/13-evidencias.md`](docs/13-evidencias.md).

El índice completo de la memoria y la correspondencia con los requisitos del examen están en [`docs/00-indice.md`](docs/00-indice.md).

## Despliegue en Render

`render.yaml` crea PostgreSQL y un único servicio web Node. El build instala ambos paquetes, ejecuta `prisma generate` y compila backend y frontend; el arranque ejecuta `prisma migrate deploy` antes de iniciar Express. En Render selecciona **New > Blueprint**, conecta el repositorio y aplica el archivo de la raíz. Los secretos se generan sin quedar escritos en el repositorio.

Después del despliegue valida `https://<servicio>.onrender.com/api/health` y abre la misma URL sin `/api/health` para probar la SPA. El procedimiento completo, la lista de variables y la solución de problemas están en [`docs/10-despliegue-render.md`](docs/10-despliegue-render.md).

## Limitaciones éticas y técnicas

- El análisis descrito es de caja negra, manual y limitado a información pública, interfaces visibles y acciones realizadas con cuentas y datos de prueba autorizados. No incluye evasión de autenticación, explotación, scraping masivo, descompilación, extracción de código ni acceso a datos de terceros.
- Las entidades reconstruidas son inferencias conceptuales para EduRoom; no revelan ni pretenden describir la arquitectura, base de datos o código internos de Google Classroom.
- EduRoom no usa logos, iconos, tipografías remotas, capturas incorporadas, paletas de marca ni otros assets de Google. Las referencias textuales se conservan solo para identificar el objeto académico del análisis y citar documentación pública.
- El JWT se guarda en `localStorage` por simplicidad del prototipo; una aplicación productiva debería evaluar cookies `HttpOnly`, protección CSRF, revocación y renovación de sesión.
- Los adjuntos están reconstruidos en el modelo de datos, pero no existe carga binaria ni almacenamiento de archivos. Tampoco se implementan recuperación de cuenta, notificaciones, auditoría completa, rúbricas, rotación de claves o KMS.
- SHA-256 detecta cambios respecto de un manifiesto confiable, pero no autentica por sí solo al autor. La ofuscación solo eleva el esfuerzo de lectura y AES-GCM protege las notas seguras seleccionadas, no todo el sistema ni el código entregado al navegador.
- El seed contiene credenciales conocidas y datos sintéticos: es exclusivo para desarrollo y demostraciones locales, no para un despliegue público.

## Aviso académico

Las entidades de EduRoom son una reconstrucción conceptual propia, no una afirmación sobre la implementación interna de Google Classroom. Las observaciones deben acompañarse de fecha, entorno, evidencia anonimizada y nivel de certeza. Está prohibido incorporar credenciales, tokens, datos de terceros o capturas con información personal.
