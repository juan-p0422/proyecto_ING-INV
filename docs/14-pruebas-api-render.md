# 14. Pruebas de API contra Render

## 14.1 Ficha de ejecución

| Campo | Valor |
|---|---|
| Aplicación | EduRoom |
| URL base | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |
| API base | `https://eduroom-znb0.onrender.com/api` |
| Repositorio | [proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV) |
| Fecha y hora | 14-08-2026 20:21, `America/Mexico_City` (15-08-2026 02:21 UTC) |
| Ambiente | Render Production |
| Ejecutor | Node.js `fetch`, script secuencial propio |
| Commit local revisado | `b647a87ac96af08f619f3d9d335f07efc3358d22` |
| Resultado global | 26 solicitudes aprobadas, 0 fallidas |

La prueba se realizó una sola vez, sin concurrencia, carga, fuzzing ni reintentos. Se crearon dos cuentas `example.com`, un curso y contenido académico totalmente sintético. Tokens, contraseña y código de curso se mantuvieron en memoria y no se imprimieron.

## 14.2 Método y criterios

El inventario se obtuvo directamente de `backend/src/app.ts` y los módulos de `backend/src/routes`. Después se ejecutó [el smoke test](../tests/render-api-smoke-test.js) contra el despliegue propio. Cada caso se clasifica así:

- **Aprobado:** código HTTP y contrato esencial coinciden con lo esperado.
- **Advertencia:** funciona, pero existe una limitación o riesgo relevante.
- **Fallido:** la respuesta no cumple el contrato o el endpoint no está disponible.

Un estado aprobado demuestra el escenario probado en ese momento; no garantiza ausencia de defectos. La identidad del commit activo en Render no puede confirmarse desde la API porque `/api/health` no publica una versión.

## 14.3 Inventario y resultados por endpoint

| ID | Método | Ruta | Auth | Rol requerido | Entrada principal | Respuesta esperada | Resultado obtenido | Estado |
|---|---|---|---|---|---|---|---|---|
| R-01 | GET | `/api/health` | No | Público | Ninguna | 200; `status=ok`, servicio y ambiente | 200; contrato correcto; 442 ms | Aprobado |
| R-02 | GET | `/api/security/integrity` | No | Público | Ninguna | 200; estado, fecha y conteos, sin rutas/hashes | 200; `verified`, 19 archivos, 0 discrepancias | Aprobado |
| R-03 | POST | `/api/auth/register` | No | Público | `name`, `email`, `password`, `role?` | 201; JWT y usuario sin `passwordHash` | Docente 201 (2216 ms); estudiante 201 (1547 ms) | Advertencia¹ |
| R-04 | POST | `/api/auth/login` | No | Público | `email`, `password` | 200; JWT y usuario seguro | Ambos roles 200; tokens válidos | Aprobado |
| R-05 | GET | `/api/auth/me` | Sí | Cualquier usuario | Bearer JWT | 200; perfil propio sin hash | Docente y estudiante 200 | Aprobado |
| R-06 | GET | `/api/courses` | Sí | Cualquier usuario | Bearer JWT | 200; cursos inscritos | 200; arreglo válido | Aprobado |
| R-07 | POST | `/api/courses` | Sí | `TEACHER` global | `title`, `description?`, `color?` | 201 para docente; 403 para estudiante | Docente 201; control estudiante 403 | Aprobado |
| R-08 | POST | `/api/courses/join` | Sí | Usuario autenticado | `code` | 201; curso y rol de inscripción | Estudiante unido; 201 | Aprobado |
| R-09 | GET | `/api/courses/:id` | Sí | Integrante | `id` en ruta | 200; curso y rol local | Docente integrante; 200 | Aprobado |
| R-10 | GET | `/api/courses/:id/members` | Sí | Integrante | `id` en ruta | 200; inscripciones y usuarios seguros | 200; exactamente 2 integrantes QA | Aprobado |
| R-11 | POST | `/api/courses/:courseId/announcements` | Sí | Docente propietario | `title`, `content` | 201; anuncio y autor | 201; anuncio creado | Aprobado |
| R-12 | GET | `/api/courses/:courseId/announcements` | Sí | Integrante | `courseId` | 200; arreglo descendente | Estudiante obtuvo anuncio; 200 | Aprobado |
| R-13 | POST | `/api/courses/:courseId/assignments` | Sí | Docente propietario | `title`, `description?`, `dueDate?` | 201; tarea | 201; tarea creada | Aprobado |
| R-14 | GET | `/api/courses/:courseId/assignments` | Sí | Integrante | `courseId` | 200; vista filtrada por rol | Estudiante obtuvo tareas; 200 | Aprobado |
| R-15 | GET | `/api/assignments/:id` | Sí | Integrante | `id` | 200; tarea y entregas autorizadas | 200 antes y después de calificar | Aprobado |
| R-16 | POST | `/api/assignments/:id/submit` | Sí | Estudiante inscrito | `content` | 201; estado `SUBMITTED` | 201; estado correcto | Aprobado |
| R-17 | PATCH | `/api/submissions/:id/grade` | Sí | Docente propietario | `grade` 0–100, `feedback?` | 200; estado `GRADED` | 200; nota 95 persistida | Aprobado |
| R-18 | POST | `/api/courses/:courseId/comments` | Sí | Integrante | `content`, `assignmentId?` | 201; comentario y autor | Comentario de tarea; 201 | Aprobado |
| R-19 | GET | `/api/courses/:courseId/comments` | Sí | Integrante | `assignmentId?` query | 200; arreglo ascendente | Filtro por tarea; 200 y contenido recuperado | Aprobado |
| R-20 | POST | `/api/security/secure-notes` | Sí | Propietario autenticado | `text` | 201; solo `id` y fecha | 201; no expuso payload cifrado | Aprobado |
| R-21 | GET | `/api/security/secure-notes` | Sí | Propietario autenticado | Bearer JWT | 200; notas propias descifradas | 200; texto sintético recuperado | Aprobado |

¹ El endpoint funciona conforme al código, pero permitir que un cliente anónimo seleccione `role=TEACHER` constituye una advertencia de seguridad y diseño. Para producción, el alta docente debe requerir invitación, aprobación o administración.

## 14.4 Trazabilidad de la ejecución automatizada

El script realizó 26 solicitudes porque algunos endpoints se probaron para ambos roles o en más de un estado. Resumen sanitizado:

```text
Base URL: https://eduroom-znb0.onrender.com
Ejecución UTC: 2026-08-15T02:21:20.343Z
Solicitudes: 26
Aprobadas: 26
Fallidas: 0
Duración aproximada: 11.8 s
Datos sensibles en salida: ninguno
```

Tiempos puntuales observados: 120–442 ms en la mayoría de operaciones una vez activo el servicio; 1.49–2.22 s para registro/login por el coste esperado de bcrypt. Son valores orientativos de una sola ejecución, no una prueba de rendimiento.

### Flujo comprobado

`health → integrity → registro de ambos roles → login → /me → crear curso → unir estudiante → consultar curso e integrantes → crear/listar anuncio → crear/listar/abrir tarea → entregar → calificar → comentar/listar → crear/leer nota segura → verificar prohibición de crear curso como estudiante`.

## 14.5 Endpoints esperados que no existen

Todos los endpoints solicitados para el examen existen y respondieron. Durante la inspección no se encontraron rutas de actualización o eliminación.

| Endpoint esperado en un LMS completo | Estado real | Justificación | Impacto académico | Recomendación |
|---|---|---|---|---|
| `DELETE /api/users/me` o limpieza QA | No existe; respondería 404 | No fue implementado en el prototipo | Los datos sintéticos de cada corrida permanecen en Render | Añadir baja/anonimización o job de limpieza con autorización |
| `PATCH/DELETE /api/courses/:id` | No existe; respondería 404 | Alcance centrado en creación y consulta | No se demuestra ciclo de vida completo del curso | Implementar con docente propietario y auditoría |
| `PATCH/DELETE` de tareas, anuncios y comentarios | No existen; responderían 404 | CRUD parcial deliberado | La réplica cubre flujos principales, no mantenimiento completo | Priorizar según rúbrica y añadir pruebas de autorización |
| Cierre/revocación de sesión | No existe | JWT autocontenido hasta expiración | Sesiones comprometidas no pueden invalidarse selectivamente | Refresh tokens rotatorios y revocación |
| Carga real de adjuntos | No existe | Solo está modelada la entidad `Attachment` | La equivalencia funcional es parcial | Almacén privado, validación MIME/tamaño y análisis de archivos |

No se enviaron solicitudes adicionales a estas rutas inexistentes durante la corrida para evitar ruido y datos innecesarios; su ausencia se confirma en el registro de rutas del código.

## 14.6 Artefactos reproducibles

### Script Node.js

```powershell
node tests/render-api-smoke-test.js
```

Puede apuntarse a un entorno propio alternativo sin editar el archivo:

```powershell
$env:EDUROOM_BASE_URL = 'http://localhost:3000'
node tests/render-api-smoke-test.js
```

El script requiere Node.js 20 o superior, usa `fetch`, ejecuta solicitudes secuenciales, aplica timeout de 30 segundos por solicitud y termina con código 1 ante el primer incumplimiento. No imprime tokens, contraseña ni código de curso.

### Postman

Importar `tests/eduroom-render.postman_collection.json` y ejecutar **una sola iteración**, en el orden definido. La colección genera correos únicos, encadena tokens e identificadores y contiene aserciones de estado y contrato. Al terminar, limpiar las variables actuales antes de compartir o exportar la colección.

## 14.7 Observaciones de QA

- **QA-01 — Advertencia alta:** el registro público acepta `TEACHER` solicitado por el cliente.
- **QA-02 — Advertencia media:** no hay endpoints de limpieza; las pruebas dejan datos sintéticos persistentes.
- **QA-03 — Advertencia media:** el JWT se guarda en `localStorage` en el cliente y no existe revocación.
- **QA-04 — Advertencia media:** `STRICT_INTEGRITY=false` en `render.yaml`; una discrepancia advertiría pero no bloquearía el arranque.
- **QA-05 — Advertencia baja:** `/api/health` no informa versión o commit, por lo que falta trazabilidad exacta entre despliegue y repositorio.
- **QA-06 — Aprobado:** autorización negativa docente/estudiante funcionó para creación de curso.
- **QA-07 — Aprobado:** la nota segura no expuso ciphertext al crearla y solo se recuperó con el token de su propietario.

## 14.8 Limitaciones y cierre

La ejecución cubrió todos los endpoints implementados y el flujo feliz completo, más un control negativo de rol. No fue un pentest, prueba de carga, auditoría de infraestructura ni análisis de concurrencia. Para respetar Render se evitó probar límites de rate limiting, cuerpos masivos, ataques de diccionario y enumeración.

Resultado final: **API funcional para la demostración académica, con 26/26 solicitudes aprobadas y cinco advertencias documentadas para evolución**.
