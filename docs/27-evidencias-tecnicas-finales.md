# 27. Evidencias técnicas finales

**Proyecto:** EduRoom  
**Fecha de inventario:** 16-08-2026 (`America/Mexico_City`)  
**Deploy:** <https://eduroom-znb0.onrender.com>  
**Repositorio:** <https://github.com/juan-p0422/proyecto_ING-INV>

## 27.1 Propósito y criterio de aceptación

Este documento registra únicamente archivos comprobados en el repositorio. Una implementación, resultado narrado o carpeta vacía no se contabiliza como captura. Los estados son **Capturada**, **Pendiente**, **No aplica** y **Requiere revisión**.

El alumno autoriza expresamente el uso académico de capturas propias obtenidas desde cuentas personales o controladas, sin anonimización adicional. Por ello, nombres del alumno, avatares propios, URL, identificadores de recursos propios, códigos de clases de prueba y resoluciones distintas de las sugeridas no invalidan una evidencia. Las imágenes existentes no se censuran, modifican, eliminan ni reemplazan.

La autorización no comprende secretos reutilizables. Una captura que muestre una contraseña, JWT completo, cookie de sesión, encabezado `Authorization`, token privado, clave de API, variable de entorno completa o cadena de conexión real se clasifica **Requiere revisión** y se excluye de la presentación hasta que el alumno prepare una copia segura. El original no se elimina automáticamente.

Las capturas de Google Classroom son observación manual de cuentas personales/controladas; no se automatizó la plataforma y no se afirma que haya sido vulnerada. Todo el material se usa exclusivamente para demostrar estructura, flujos y comportamiento observable.

## 27.2 Resultado del inventario

| Categoría | Capturadas | Pendientes | Requiere revisión | Observación |
|---|---:|---:|---:|---|
| API | 0 | 6 | 0 | Solo existe `.gitkeep` |
| Seguridad | 1 | 6 | 0 | SEC-07 cuenta con evidencia textual reproducible; las otras seis faltan |
| Render | 0 | 5 | 0 | Solo existe `.gitkeep` |
| Base de datos | 0 | 4 | 0 | Solo existe `.gitkeep` |
| GitHub | 0 | 4 | 0 | Solo existe `.gitkeep` |
| Google Classroom UI | 9 | 0 | 0 | Capturas manuales autorizadas; GC-02 usa nombre singular |
| DevTools Classroom | 5 | 0 | 1 | Seis archivos existentes; GC-DYN-03 requiere revisión por cookies visibles |
| EduRoom UI | 54 | 0 | 0 | Dos series de 27 PNG; nueve flujos por tres viewports |

No se detectaron secretos reutilizables en las categorías técnicas pendientes porque todavía no contienen PNG. En la evidencia dinámica existente, `GC-DYN-03-application-storage.png` sí muestra valores de cookies de sesión y se clasifica **Requiere revisión**. La autorización sobre cuenta, identidad y resolución no convierte un token de sesión en dato seguro para publicación.

## 27.3 Tabla global de evidencias técnicas requeridas

| ID | Nombre de archivo | Ruta | Categoría | Qué demuestra | Estado | Observaciones |
|---|---|---|---|---|---|---|
| API-01 | `API-01-health-browser.png` | `evidence/api/` | API | Disponibilidad y respuesta de health | **Pendiente** | La carpeta solo contiene `.gitkeep` |
| API-02 | `API-02-integrity-browser.png` | `evidence/api/` | API | Estado público de integridad | **Pendiente** | Mostrar estado y contadores, nunca secretos |
| API-03 | `API-03-e2e-test-terminal.png` | `evidence/api/` | API | Ejecución reproducible de pruebas E2E | **Pendiente** | Conservar comando, resumen y fecha |
| API-04 | `API-04-postman-login.png` | `evidence/api/` | API | Autenticación mediante API | **Pendiente** | No mostrar contraseña ni JWT completo |
| API-05 | `API-05-postman-courses.png` | `evidence/api/` | API | Consulta autorizada de cursos | **Pendiente** | Datos propios/controlados son aceptables |
| API-06 | `API-06-postman-assignments.png` | `evidence/api/` | API | Consulta autorizada de tareas | **Pendiente** | Datos propios/controlados son aceptables |
| SEC-01 | `SEC-01-integrity-verified.png` | `evidence/security/` | Seguridad | Verificación positiva del manifest | **Pendiente** | Mostrar cero discrepancias y alcance |
| SEC-02 | `SEC-02-checksum-local-ok.png` | `evidence/security/` | Seguridad | Checksum local correcto | **Pendiente** | PNG pendiente; resultado documental 22/22 en `docs/28-validacion-strict-integrity.md` |
| SEC-03 | `SEC-03-checksum-local-fail.png` | `evidence/security/` | Seguridad | Detección controlada de alteración | **Pendiente** | PNG pendiente; `tests/integrity-demo.js` acredita fallo sobre copia temporal |
| SEC-04 | `SEC-04-token-invalid-rejected.png` | `evidence/security/` | Seguridad | Rechazo 401 de token inválido | **Pendiente** | Token sintético y no reutilizable |
| SEC-05 | `SEC-05-role-access-denied.png` | `evidence/security/` | Seguridad | Rechazo 403 por rol | **Pendiente** | Mostrar ruta, rol de prueba y estado |
| SEC-06 | `SEC-06-encrypted-data-proof.png` | `evidence/security/` | Seguridad | Persistencia cifrada | **Pendiente** | Nunca mostrar clave ni plaintext sensible |
| SEC-07 | `SEC-07-obfuscated-build-proof.txt` | `evidence/security/` | Seguridad | Build educativo ofuscado | **Capturada** | Documentación equivalente: código 0, 1 JS, manifest 22/22 y 12 pruebas; PNG opcional |
| RND-01 | `RND-01-service-dashboard.png` | `evidence/render/` | Render | Servicio propio y estado | **Pendiente** | Datos propios visibles son aceptables; secretos no |
| RND-02 | `RND-02-successful-deploy.png` | `evidence/render/` | Render | Deploy final exitoso | **Pendiente** | Incluir fecha/commit si están disponibles |
| RND-03 | `RND-03-env-vars-hidden.png` | `evidence/render/` | Render | Variables configuradas con valores ocultos | **Pendiente** | Si un valor real es visible: Requiere revisión |
| RND-04 | `RND-04-health-check.png` | `evidence/render/` | Render | Healthcheck productivo | **Pendiente** | Mostrar URL y estado |
| RND-05 | `RND-05-logs-startup.png` | `evidence/render/` | Render | Arranque, integridad y versión desplegada | **Pendiente** | Excluir cadenas de conexión y tokens |
| DB-01 | `DB-01-render-postgres-dashboard.png` | `evidence/database/` | Base de datos | Servicio PostgreSQL controlado | **Pendiente** | No mostrar credenciales ni URL de conexión |
| DB-02 | `DB-02-prisma-migrate-success.png` | `evidence/database/` | Base de datos | Migraciones aplicadas | **Pendiente** | Mostrar nombres y resultado |
| DB-03 | `DB-03-secure-note-encrypted.png` | `evidence/database/` | Base de datos | SecureNote almacenada cifrada | **Pendiente** | No incluir clave ni plaintext real |
| DB-04 | `DB-04-demo-records.png` | `evidence/database/` | Base de datos | Registros de demostración | **Pendiente** | Usar datos propios/controlados o sintéticos |
| GH-01 | `GH-01-repository-home.png` | `evidence/github/` | GitHub | Repositorio y estructura pública | **Pendiente** | Nombre/avatar propios no invalidan la captura |
| GH-02 | `GH-02-commits-finales.png` | `evidence/github/` | GitHub | Historial final y trazabilidad | **Pendiente** | Mostrar commits relevantes |
| GH-03 | `GH-03-docs-folder.png` | `evidence/github/` | GitHub | Documentación entregada | **Pendiente** | Mostrar documentos 13, 17, 21, 23 y 27 |
| GH-04 | `GH-04-actions-or-render-link.png` | `evidence/github/` | GitHub | Automatización o vínculo de deploy | **Pendiente** | Si no se usa Actions, capturar el vínculo aplicable |
| GC-01 | `GC-01-login-o-inicio.png` | `evidence/ui/google-classroom/` | Classroom UI | Inicio autenticado como referencia funcional | **Capturada** | Original autorizado, 1919 × 1079 |
| GC-02 | `GC-02-dashboard-clase.png` | `evidence/ui/google-classroom/` | Classroom UI | Dashboard de clases | **Capturada** | El nombre real es singular; equivale al solicitado `dashboard-clases` |
| GC-03 | `GC-03-crear-clase.png` | `evidence/ui/google-classroom/` | Classroom UI | Creación de clase | **Capturada** | Original autorizado |
| GC-04 | `GC-04-tablon.png` | `evidence/ui/google-classroom/` | Classroom UI | Tablón y navegación de curso | **Capturada** | Original autorizado |
| GC-05 | `GC-05-trabajo-clase.png` | `evidence/ui/google-classroom/` | Classroom UI | Trabajo de clase | **Capturada** | Original autorizado |
| GC-06 | `GC-06-detalle-tarea.png` | `evidence/ui/google-classroom/` | Classroom UI | Detalle de actividad | **Capturada** | Original autorizado |
| GC-07 | `GC-07-entrega-tarea.png` | `evidence/ui/google-classroom/` | Classroom UI | Entrega y estado | **Capturada** | Original autorizado |
| GC-08 | `GC-08-personas.png` | `evidence/ui/google-classroom/` | Classroom UI | Miembros y roles | **Capturada** | Original autorizado |
| GC-09 | `GC-09-calificaciones.png` | `evidence/ui/google-classroom/` | Classroom UI | Libro de calificaciones | **Capturada** | Original autorizado |
| GC-DYN-01 | `GC-DYN-01-network-xhr.png` | `evidence/dynamic/google-classroom/` | DevTools Classroom | Solicitudes Fetch/XHR | **Capturada** | Observación manual autorizada |
| GC-DYN-02 | `GC-DYN-02-network-status-codes.png` | `evidence/dynamic/google-classroom/` | DevTools Classroom | Recursos y códigos de estado | **Capturada** | Observación manual autorizada |
| GC-DYN-03 | `GC-DYN-03-application-storage.png` | `evidence/dynamic/google-classroom/` | DevTools Classroom | Categorías de almacenamiento | **Requiere revisión** | Valores de cookies visibles; conservar original, invalidar sesiones y excluir de entrega/proyección hasta preparar una edición segura autorizada |
| GC-DYN-04 | `GC-DYN-04-service-workers-cache.png` | `evidence/dynamic/google-classroom/` | DevTools Classroom | Service workers y cache | **Capturada** | Observación manual autorizada |
| GC-DYN-05 | `GC-DYN-05-performance-summary.png` | `evidence/dynamic/google-classroom/` | DevTools Classroom | Traza de Performance | **Capturada** | Métricas visibles transcritas en el documento 25 |
| GC-DYN-06 | `GC-DYN-06-memory-summary.png` | `evidence/dynamic/google-classroom/` | DevTools Classroom | Resumen de Memory | **Capturada** | Tamaños retenidos visibles transcritos en el documento 25; no se publica `.heapsnapshot` |

## 27.4 Evidencia UI propia de EduRoom

La carpeta `evidence/ui/eduroom/` contiene 54 PNG. La serie principal usa los prefijos `01-` a `09-`; la serie complementaria usa nombres funcionales. Ambas cubren tres viewports: 1280 × 720, 768 × 1024 y 390 × 844.

| ID | Archivos | Categoría | Qué demuestra | Estado | Observaciones |
|---|---|---|---|---|---|
| ER-01 | `01-login--*` y `login-*` | EduRoom UI | Acceso | **Capturada** | Seis archivos entre ambas series |
| ER-02 | `02-dashboard-cursos--*` y `dashboard-*` | EduRoom UI | Dashboard | **Capturada** | Tres viewports por serie |
| ER-03 | `03-curso-tablon--*` y `course-stream-*` | EduRoom UI | Tablón | **Capturada** | Tres viewports por serie |
| ER-04 | `04-trabajo-clase--*` y `classwork-*` | EduRoom UI | Trabajo de clase | **Capturada** | Tres viewports por serie |
| ER-05 | `05-personas--*` y `people-*` | EduRoom UI | Personas | **Capturada** | Tres viewports por serie |
| ER-06 | `06-detalle-tarea--*` y `assignment-detail-*` | EduRoom UI | Detalle | **Capturada** | Tres viewports por serie |
| ER-07 | `07-entrega--*` y `assignment-submission-*` | EduRoom UI | Entrega | **Capturada** | Tres viewports por serie |
| ER-08 | `08-calificacion-retroalimentacion--*` y `assignment-graded-*` | EduRoom UI | Calificación | **Capturada** | Tres viewports por serie |
| ER-09 | `09-integridad--*` y `integrity-*` | EduRoom UI | Integridad | **Capturada** | Tres viewports por serie |

El archivo `capture-manifest.json` registra 27 de estas capturas, su fuente y viewport. No se cuentan las dos series como 18 flujos distintos.

## 27.5 Acciones pendientes por categoría

### API

Capturar health, integridad y pruebas E2E; después registrar login, cursos y tareas desde Postman con datos controlados. Un JWT completo o contraseña visible obliga a marcar la copia **Requiere revisión**.

### Seguridad

Ejecutar la verificación positiva y la prueba negativa solo en una copia temporal. Capturar 401/403 con credenciales sintéticas y prueba de cifrado sin clave. SEC-07 ya demuestra el build ofuscado sin afirmar confidencialidad absoluta.

La validación de integridad cuenta además con evidencia documental reproducible: endpoint productivo `verified`, prueba local estricta 22/22 y demostración temporal de discrepancia. Las capturas SEC-01..03 continúan pendientes como soporte visual, pero su ausencia no invalida la ejecución técnica registrada en [el documento 28](28-validacion-strict-integrity.md).

### Render

Capturar dashboard, deploy, health y logs del mismo commit. En variables de entorno deben verse los nombres y el ocultamiento de valores, nunca su contenido real.

### Base de datos

Capturar servicio, migraciones y registros controlados. La evidencia cifrada debe mostrar únicamente que el valor persistido no está en claro; nunca la clave de cifrado.

### GitHub

Capturar repositorio, commits finales, carpeta `docs/` y el vínculo de despliegue o automatización aplicable. El nombre y avatar propios están autorizados.

### Classroom y análisis manual

La serie solicitada está completa y los originales se conservan sin edición y en resolución original. GC-DYN-05/06 están **Capturadas** y sus valores legibles fueron transcritos en el documento 25. GC-DYN-03 existe, pero queda **Requiere revisión** y no debe proyectarse por cookies visibles.

## 27.6 Recomendaciones para la presentación presencial

1. Seleccionar una evidencia por afirmación crítica y abrirla desde el repositorio, no desde una sesión privada activa.
2. Mostrar primero el inventario y distinguir con claridad **Capturada** de **Pendiente**.
3. Usar Classroom únicamente como observación manual autorizada; no ejecutar scripts ni afirmar acceso interno.
4. Presentar EduRoom con datos controlados y explicar que su identidad visual y código son propios.
5. Revisar cada captura técnica futura al 100 %: un dato propio visible es aceptable, pero un secreto reutilizable no.
6. Preparar una copia local y el PDF final en `evidence/final-pdf/` como respaldo si Render no responde.
7. Calcular SHA-256 después de aprobar la versión final de cada archivo; para Classroom, calcularlo sobre el original autorizado.

## 27.7 Veredicto documental

La evidencia manual de Classroom, la evidencia visual de EduRoom y la demostración textual SEC-07 están disponibles. La brecha global de evidencias técnicas queda **Parcial justificado** porque faltan 25 capturas: 6 API, 6 de seguridad, 5 de Render, 4 de base de datos y 4 de GitHub. Ninguna ausencia se atribuye a censura, identidad visible o resolución. De forma independiente, GC-DYN-03 queda **Requiere revisión** por cookies visibles.
