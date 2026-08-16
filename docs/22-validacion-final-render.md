# Validación final end-to-end de EduRoom en Render

## 1. Identificación de la ejecución

| Campo | Valor |
|---|---|
| Aplicación | EduRoom, réplica académica independiente |
| Ambiente | Render Production |
| URL base | <https://eduroom-znb0.onrender.com> |
| Repositorio | <https://github.com/juan-p0422/proyecto_ING-INV> |
| Fecha local | 15 de agosto de 2026 (America/Mexico_City) |
| Marca de tiempo de la corrida aprobada | 2026-08-16T00:54:33.344Z (UTC) |
| Versión declarada en `package.json` | 0.1.0 |
| Commit local y `origin/main` consultado | `b647a87ac96af08f619f3d9d335f07efc3358d22` (`b647a87`) |
| Mensaje del commit | `fix: instalar dependencias de compilacion en Render` |
| Identificador sanitizado de corrida | `1786841663695-f2lezi` |
| Runner | `node tests/render-final-e2e.js` |

El endpoint de salud no publica una versión ni un identificador de compilación. Por ello, el commit anterior demuestra la coincidencia entre el repositorio local y `origin/main` al momento de la revisión, pero **no permite asegurar criptográficamente que Render esté ejecutando ese commit exacto**. La correlación del despliegue deberá completarse con una captura del panel de Render o exponiendo un identificador de build no sensible.

## 2. Alcance y controles de seguridad de la prueba

La validación comprobó disponibilidad, integridad y un flujo completo entre los roles docente y estudiante. Se usaron nombres genéricos, correos únicos del dominio reservado `example.com` y contenido sintético. El runner:

- realizó 19 solicitudes HTTP secuenciales, sin concurrencia ni reintentos;
- aplicó un timeout de 30 segundos por solicitud;
- no imprimió contraseñas, JWT, códigos de curso ni identificadores internos reales;
- no ejecutó fuerza bruta, carga masiva, borrado ni modificación destructiva;
- comprobó los estados HTTP y también propiedades funcionales de las respuestas.

Las cuentas y registros de prueba quedan persistentes porque la API no ofrece una operación de limpieza y eliminarlos directamente habría excedido el alcance no destructivo autorizado.

## 3. Comprobaciones públicas previas

| Comprobación | Método y recurso | Resultado obtenido | Tiempo observado | Estado | Evidencia sugerida |
|---|---|---|---:|---|---|
| Carga de la aplicación | `GET /` | HTTP 200, `text/html`, título `EduRoom` | 395 ms | Aprobado | `evidence/render/RND-02-home-ok.png` |
| Salud del servicio | `GET /api/health` | HTTP 200; `status: ok`; servicio `eduroom-api`; ambiente `production` | 291 ms | Aprobado | `evidence/api/API-01-health.png` |
| Integridad en runtime | `GET /api/security/integrity` | HTTP 200; `status: verified`; 19 archivos revisados; 0 modificados | 320 ms | Aprobado | `evidence/security/SEC-01-integrity-ok.png` |

La primera consulta se hizo de forma aislada antes del flujo. La corrida E2E volvió a consultar salud e integridad y obtuvo nuevamente HTTP 200.

## 4. Flujo funcional end-to-end

Los resultados siguientes corresponden exclusivamente a la corrida final aprobada. Las rutas se muestran anonimizadas con `:id`.

| Paso | Acción | Método y ruta | Validación aplicada | Resultado | Tiempo | Estado | Evidencia sugerida |
|---:|---|---|---|---|---:|---|---|
| 1 | Comprobar salud | `GET /api/health` | HTTP 200 y `status=ok` | Servicio disponible | 263 ms | Aprobado | `API-01-health.png` |
| 2 | Comprobar integridad | `GET /api/security/integrity` | HTTP 200 y estado presente | `verified` | 234 ms | Aprobado | `SEC-01-integrity-ok.png` |
| 3 | Registrar docente | `POST /api/auth/register` | HTTP 201 | Cuenta docente sintética creada | 1540 ms | Aprobado | `API-02-register-teacher.png` |
| 4 | Registrar estudiante | `POST /api/auth/register` | HTTP 201 | Cuenta estudiante sintética creada | 1594 ms | Aprobado | `API-03-register-student.png` |
| 5 | Iniciar sesión docente | `POST /api/auth/login` | HTTP 200 y JWT presente en memoria | Autenticación correcta | 1513 ms | Aprobado | `API-04-login-teacher.png` |
| 6 | Crear curso | `POST /api/courses` | HTTP 201; respuesta con ID y código | Curso creado | 135 ms | Aprobado | `API-05-create-course.png` |
| 7 | Crear anuncio | `POST /api/courses/:id/announcements` | HTTP 201 e ID de anuncio | Anuncio creado | 161 ms | Aprobado | `API-06-create-announcement.png` |
| 8 | Crear tarea | `POST /api/courses/:id/assignments` | HTTP 201 e ID de tarea | Tarea creada | 130 ms | Aprobado | `API-07-create-assignment.png` |
| 9 | Iniciar sesión estudiante | `POST /api/auth/login` | HTTP 200 y JWT presente en memoria | Autenticación correcta | 1480 ms | Aprobado | `API-08-login-student.png` |
| 10 | Unir estudiante al curso | `POST /api/courses/join` | HTTP 201 y curso esperado | Inscripción creada | 124 ms | Aprobado | `API-09-join-course.png` |
| 11 | Consultar anuncio | `GET /api/courses/:id/announcements` | El arreglo contiene el anuncio creado | Visible para estudiante | 117 ms | Aprobado | `API-10-list-announcements.png` |
| 12 | Consultar tarea | `GET /api/courses/:id/assignments` | El arreglo contiene la tarea creada | Visible para estudiante | 130 ms | Aprobado | `API-11-list-assignments.png` |
| 13 | Enviar entrega | `POST /api/assignments/:id/submit` | HTTP 201 e ID de entrega | Entrega registrada | 130 ms | Aprobado | `API-12-submit-assignment.png` |
| 14 | Crear comentario | `POST /api/courses/:id/comments` | HTTP 201 e ID de comentario | Comentario asociado a la tarea | 141 ms | Aprobado | `API-13-create-comment.png` |
| 15 | Reingresar como docente | `POST /api/auth/login` | HTTP 200 y JWT nuevo presente | Segundo login correcto | 1452 ms | Aprobado | `API-14-teacher-relogin.png` |
| 16 | Revisar entrega | `GET /api/assignments/:id` | La colección docente contiene la entrega | Entrega visible para docente | 124 ms | Aprobado | `API-15-review-submission.png` |
| 17 | Calificar entrega | `PATCH /api/submissions/:id/grade` | HTTP 200; estado `GRADED`; nota 95 | Calificación persistida | 136 ms | Aprobado | `API-16-grade-submission.png` |
| 18 | Confirmar calificación | `GET /api/assignments/:id` | La vista del estudiante contiene nota 95 | Calificación visible | 123 ms | Aprobado | `API-17-student-grade.png` |
| 19 | Confirmar comentario | `GET /api/courses/:id/comments` | La colección contiene el comentario creado | Comentario visible para docente | 119 ms | Aprobado | `API-18-list-comments.png` |

**Resumen automatizado:** 19 solicitudes ejecutadas, 19 aprobadas, 0 fallidas. Tiempo de pared de la corrida: aproximadamente 10.4 segundos.

## 5. Errores e incidencias detectadas

### 5.1 Producto desplegado

No se detectaron fallos funcionales del producto durante la corrida aprobada. Todos los recursos creados pudieron recuperarse con el rol correspondiente y la nota quedó visible para el estudiante.

### 5.2 Ajustes del arnés de prueba

Antes de la corrida aprobada se realizaron dos ejecuciones parciales. Ambas ayudaron a corregir el runner y no representan defectos del servicio:

| ID | Incidencia | Diagnóstico | Corrección aplicada | Estado |
|---|---|---|---|---|
| QA-RUN-01 | `POST /api/courses` respondió HTTP 400 | El runner envió los campos `name` y `section`; el contrato real requiere `title`, `description` y `color` | Se alineó el payload con el esquema Zod del backend | Corregido |
| QA-RUN-02 | La unión al curso se marcó fallida pese a recibir HTTP 201 | El runner esperaba el valor predeterminado HTTP 200; la API crea una inscripción y responde correctamente con 201 | Se configuró `expected: [201]` | Corregido |

Las ejecuciones parciales dejaron datos sintéticos adicionales: la primera creó dos cuentas; la segunda creó dos cuentas, un curso, un anuncio, una tarea y una inscripción. No contienen información personal real. Se recomienda aplicar una política de expiración o limpieza administrativa controlada para datos QA, sin exponer un endpoint público destructivo.

## 6. Observaciones y recomendaciones

1. Agregar a `/api/health` un campo no sensible como `version` o un hash corto inyectado por `BUILD_COMMIT`; esto permitiría correlacionar repositorio y despliegue.
2. Mantener un contrato OpenAPI o tipos compartidos para evitar divergencias entre payloads de prueba y validaciones Zod.
3. Ejecutar `tests/render-final-e2e.js` una sola vez después de cada despliegue candidato, nunca en bucle, porque crea registros persistentes.
4. Conservar capturas sanitizadas del panel de Render, la terminal y los endpoints. Antes de entregar, revisar que no muestren JWT, contraseñas, correos completos ni códigos de curso.
5. Considerar una estrategia de datos QA con TTL o una tarea administrativa autenticada y auditable para retirar registros sintéticos antiguos.

## 7. Reproducción controlada

Desde la raíz del repositorio:

```bash
node tests/render-final-e2e.js
```

Para apuntar a un ambiente local autorizado:

```powershell
$env:EDUROOM_BASE_URL = 'http://localhost:3000'
node tests/render-final-e2e.js
```

El comando debe ejecutarse de manera puntual. Un resultado válido termina con `failed: 0` e `integrityStatus: "verified"`.

## 8. Veredicto

**Estado final del sistema: funcional con observaciones.**

EduRoom estuvo disponible en Render y completó el flujo requerido entre docente y estudiante sin fallos en la corrida final. Las observaciones pendientes se limitan a trazabilidad de la versión desplegada y gestión de datos sintéticos; no impidieron el uso funcional evaluado.

