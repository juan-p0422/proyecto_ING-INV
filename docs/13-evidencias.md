# 13. Checklist maestro de evidencias

**Proyecto:** EduRoom

**Aplicación pública:** [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com)

**Repositorio:** [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV)

**Guía de carpetas:** [`evidence/README.md`](../evidence/README.md)

Este checklist registra qué debe capturarse, dónde debe guardarse y qué evidencia existe realmente. La presencia de una carpeta o de documentación narrativa no sustituye una captura, log o exportación sanitizada.

## 13.1 Estados

| Estado | Uso |
|---|---|
| ✅ Disponible | Existe un archivo verificable en la ruta indicada |
| ◐ Parcial | Existe evidencia relacionada, pero no muestra toda la acción requerida |
| ⬜ Pendiente | Debe capturarse, exportarse o seleccionarse |
| ⛔ No aplicable | No corresponde a la versión; debe justificarse |
| ⚠ Requiere revisión | El archivo existe, pero puede exponer un secreto real reutilizable |

Los estados iniciales se determinaron revisando el repositorio. Deben actualizarse después de incorporar la evidencia y calcular su hash; la anonimización se aplica según la política de cada categoría.

## 13.2 Privacidad y ética

El alumno autoriza el uso académico sin anonimización adicional de capturas propias procedentes de cuentas personales/controladas. Nombres del alumno, avatares propios, URL, identificadores propios, códigos de clases de prueba y resoluciones distintas de la sugerida no invalidan la captura. No se censuran, modifican, eliminan o reemplazan los originales existentes.

La autorización no incluye secretos reutilizables. Antes de incorporar o presentar cualquier evidencia:

- ocultar JWT, cookies, contraseñas, tokens y encabezados `Authorization`;
- ocultar claves, secretos, cadenas de conexión y valores de variables;
- usar cuentas propias/controladas, cuentas demo y contenido sintético;
- evitar capturar correo, mensajería, administrador de contraseñas y escritorio personal;
- revisar la barra de direcciones, pestañas, consola y paneles laterales;
- marcar como **Requiere revisión** —sin eliminar automáticamente— cualquier archivo que muestre un secreto real reutilizable;
- calcular SHA-256 después de aprobar la versión final aplicable.

Las capturas de Google Classroom deben ser propias, manuales, autorizadas y obtenidas con una cuenta controlada. Para los archivos existentes en `evidence/ui/google-classroom/` y `evidence/dynamic/google-classroom/`, el alumno autorizó conservar nombres, avatares, URL, identificadores, códigos y recursos visibles sin anonimización adicional. Ningún script de este proyecto debe automatizar, inspeccionar o capturar ese servicio.

## 13.3 Guía para nombrar archivos

Formato:

```text
<PREFIJO>-<NN>-<descripcion-corta>[-<viewport>].png
```

Ejemplos obligatorios:

```text
GC-01-dashboard.png
ER-01-login.png
API-01-health.png
SEC-01-integrity-verified.png
RND-02-successful-deploy.png
```

Prefijos adicionales: `GH` para GitHub, `DB` para base de datos y `PRE` para presentación. Usar dos dígitos, minúsculas y guiones. No incluir información personal en el nombre.

Las capturas Playwright existentes conservan nombres previos porque ya están enlazadas desde otros documentos. Los nombres canónicos para la entrega técnica se registran en [`27-evidencias-tecnicas-finales.md`](27-evidencias-tecnicas-finales.md), sin eliminar el original.

## 13.4 A. Evidencias de Google Classroom

> Las capturas de Google Classroom corresponden a evidencia manual obtenida desde cuentas personales/controladas por el alumno. El alumno autorizó su inclusión sin anonimización adicional. Se usan exclusivamente con fines académicos para demostrar flujos, estructura y comportamiento observable.

Se conserva la resolución original 1919 × 1079. Los nombres, avatares, URL, identificadores, códigos y recursos visibles pertenecen a cuentas personales/controladas y su inclusión fue autorizada. Las imágenes no se anonimizan, censuran, reemplazan o eliminan. El tamaño no invalida la evidencia ni pretende equivalencia pixel a pixel.

| ID | Evidencia | Ruta | Estado | Observaciones |
|---|---|---|---|---|
| GC-01 | Login / Inicio | `evidence/ui/google-classroom/GC-01-login-o-inicio.png` | ✅ Usada | Inicio autenticado; captura funcional más cercana al flujo de acceso |
| GC-02 | Dashboard de cursos | `evidence/ui/google-classroom/GC-02-dashboard-clase.png` | ✅ Usada | Referencia manual de escritorio |
| GC-03 | Creación de clase | `evidence/ui/google-classroom/GC-03-crear-clase.png` | ✅ Usada | Modal de creación |
| GC-04 | Tablón | `evidence/ui/google-classroom/GC-04-tablon.png` | ✅ Usada | Contexto y navegación del curso |
| GC-05 | Trabajo de clase | `evidence/ui/google-classroom/GC-05-trabajo-clase.png` | ✅ Usada | Editor de tarea como captura funcional equivalente |
| GC-06 | Detalle de tarea | `evidence/ui/google-classroom/GC-06-detalle-tarea.png` | ✅ Usada | Instrucciones y comentarios |
| GC-07 | Entrega | `evidence/ui/google-classroom/GC-07-entrega-tarea.png` | ✅ Usada | Estado entregado y trabajo asociado |
| GC-08 | Personas | `evidence/ui/google-classroom/GC-08-personas.png` | ✅ Usada | Profesores y estudiantes |
| GC-09 | Calificaciones | `evidence/ui/google-classroom/GC-09-calificaciones.png` | ✅ Usada | Libro de calificaciones |
| GC-DYN-01 | DevTools Network XHR | `evidence/dynamic/google-classroom/GC-DYN-01-network-xhr.png` | ✅ Usada | Solicitudes, estados, tamaños y tiempos |
| GC-DYN-02 | DevTools Network general | `evidence/dynamic/google-classroom/GC-DYN-02-network-status-codes.png` | ✅ Complementaria | Códigos y recursos |
| GC-DYN-03 | DevTools Application | `evidence/dynamic/google-classroom/GC-DYN-03-application-storage.png` | ⚠️ Requiere revisión | Muestra valores de cookies de sesión; conservar el original, pero no entregar/proyectar hasta invalidarlas o preparar una edición segura autorizada |
| GC-DYN-04 | Service workers/cache | `evidence/dynamic/google-classroom/GC-DYN-04-service-workers-cache.png` | ✅ Complementaria | Evidencia del entorno del navegador |
| GC-DYN-05 | Performance | `evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png` | ✅ Usada | Traza manual y métricas visibles |
| GC-DYN-06 | Memory | `evidence/dynamic/google-classroom/GC-DYN-06-memory-summary.png` | ✅ Usada | Resumen manual del snapshot |

**Resultado QA:** nueve flujos visuales y seis evidencias dinámicas clasificadas. El comparativo flexible usa la resolución disponible sin exigir equivalencia de viewport. La identidad, URL y resolución no penalizan; GC-DYN-03 se separa únicamente por el posible carácter reutilizable de las cookies visibles.

## 13.5 B. Evidencias de EduRoom

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| ER-01 | Login | `evidence/ui/eduroom/ER-01-login.png` | ✅ Disponible | Fuente actual: `login-1280x720.png`; existe también en tableta y móvil |
| ER-02 | Registro | `evidence/ui/eduroom/ER-02-registro.png` | ⬜ Pendiente | Usar correo sintético único y ocultar la contraseña |
| ER-03 | Dashboard | `evidence/ui/eduroom/ER-03-dashboard.png` | ✅ Disponible | Fuente actual: `dashboard-1280x720.png` |
| ER-04 | Crear curso | `evidence/ui/eduroom/ER-04-crear-curso.png` | ◐ Parcial | El dashboard existe, pero falta el modal o confirmación explícita de creación |
| ER-05 | Unirse a curso | `evidence/ui/eduroom/ER-05-unirse-curso.png` | ◐ Parcial | Existe dashboard de estudiante; falta capturar la acción con una clase propia/controlada |
| ER-06 | Crear anuncio | `evidence/ui/eduroom/ER-06-crear-anuncio.png` | ◐ Parcial | `course-stream-1280x720.png` muestra el tablón; falta la creación o confirmación |
| ER-07 | Crear tarea | `evidence/ui/eduroom/ER-07-crear-tarea.png` | ◐ Parcial | Existen `classwork-1280x720.png` y detalle; falta la acción de creación |
| ER-08 | Entregar tarea | `evidence/ui/eduroom/ER-08-entrega.png` | ✅ Disponible | Fuente actual: `assignment-submission-1280x720.png` |
| ER-09 | Calificar y retroalimentar | `evidence/ui/eduroom/ER-09-calificacion.png` | ✅ Disponible | Fuente actual: `assignment-graded-1280x720.png` |
| ER-10 | Comentarios | `evidence/ui/eduroom/ER-10-comentarios.png` | ⬜ Pendiente | Mostrar contenido sintético y ambos roles autorizados |
| ER-11 | Estado de integridad | `evidence/ui/eduroom/ER-11-integridad.png` | ✅ Disponible | Fuente actual: `integrity-1280x720.png` |
| ER-12 | Secure notes o cifrado | `evidence/ui/eduroom/ER-12-secure-notes.png` | ⬜ Pendiente | Si no existe vista UI, usar evidencia API y DB, indicándolo |

La carpeta contiene 54 PNG: una serie de 27 capturas seleccionada para el comparativo final y una serie previa de 27 conservada como evidencia complementaria. El [`capture-manifest.json`](../evidence/ui/eduroom/capture-manifest.json) registra esta última en nueve flujos y tres viewports. No se interpretan como 18 flujos diferentes. El resultado responsive está en [`18-capturas-eduroom-render.md`](18-capturas-eduroom-render.md) y la clasificación completa en [`16-comparativo-ui.md`](16-comparativo-ui.md).

## 13.6 C. Evidencias de API

| ID | Evidencia | Ruta requerida | Estado | Observaciones |
|---|---|---|---|---|
| API-01 | Health en navegador | `evidence/api/API-01-health-browser.png` | ⬜ Pendiente | Mostrar URL, HTTP 200, `status=ok`, fecha y ambiente |
| API-02 | Integridad en navegador | `evidence/api/API-02-integrity-browser.png` | ⬜ Pendiente | Mostrar estado y contadores, sin secretos |
| API-03 | Prueba E2E en terminal | `evidence/api/API-03-e2e-test-terminal.png` | ⬜ Pendiente | Mostrar comando y resumen verificable |
| API-04 | Login en Postman | `evidence/api/API-04-postman-login.png` | ⬜ Pendiente | Ocultar contraseña y JWT completo |
| API-05 | Courses en Postman | `evidence/api/API-05-postman-courses.png` | ⬜ Pendiente | Datos propios/controlados son aceptables |
| API-06 | Assignments en Postman | `evidence/api/API-06-postman-assignments.png` | ⬜ Pendiente | Datos propios/controlados son aceptables |

Los resultados textuales ya están documentados en [`14-pruebas-api-render.md`](14-pruebas-api-render.md), pero las capturas técnicas requeridas en esta carpeta siguen pendientes.

## 13.7 D. Evidencias de seguridad

| ID | Evidencia | Ruta requerida | Estado | Observaciones |
|---|---|---|---|---|
| SEC-01 | Integridad verificada | `evidence/security/SEC-01-integrity-verified.png` | ⬜ Pendiente | Mostrar alcance y cero discrepancias |
| SEC-02 | Checksum local correcto | `evidence/security/SEC-02-checksum-local-ok.png` | ⬜ Pendiente | Ejecutar sobre candidato aprobado |
| SEC-03 | Checksum local fallido | `evidence/security/SEC-03-checksum-local-fail.png` | ⬜ Pendiente | Usar una copia temporal y mostrar código de salida |
| SEC-04 | Token inválido rechazado | `evidence/security/SEC-04-token-invalid-rejected.png` | ⬜ Pendiente | Mostrar HTTP 401 sin token reutilizable |
| SEC-05 | Acceso por rol denegado | `evidence/security/SEC-05-role-access-denied.png` | ⬜ Pendiente | Mostrar HTTP 403 con cuenta controlada |
| SEC-06 | Prueba de datos cifrados | `evidence/security/SEC-06-encrypted-data-proof.png` | ⬜ Pendiente | No mostrar clave ni plaintext sensible |
| SEC-07 | Prueba de build ofuscado | `evidence/security/SEC-07-obfuscated-build-proof.txt` | ✅ Disponible | Documentación equivalente: 1 JS, manifest 22/22, sintaxis válida y 12 pruebas; no es cifrado |

La implementación y los resultados ya se explican en [`20-validacion-seguridad-producto.md`](20-validacion-seguridad-producto.md). La captura de checksum fallido nunca debe realizarse sobre producción ni sobre la única copia de la entrega.

## 13.8 E. Evidencias de despliegue y repositorio

| ID | Evidencia | Ruta requerida | Estado | Observaciones |
|---|---|---|---|---|
| RND-01 | Dashboard del servicio | `evidence/render/RND-01-service-dashboard.png` | ⬜ Pendiente | Datos propios visibles son aceptables; secretos no |
| RND-02 | Deploy exitoso | `evidence/render/RND-02-successful-deploy.png` | ⬜ Pendiente | Mostrar estado, fecha y commit si están disponibles |
| RND-03 | Variables ocultas | `evidence/render/RND-03-env-vars-hidden.png` | ⬜ Pendiente | Mostrar nombres, nunca valores reales |
| RND-04 | Healthcheck | `evidence/render/RND-04-health-check.png` | ⬜ Pendiente | Mostrar URL pública y estado |
| RND-05 | Logs de arranque | `evidence/render/RND-05-logs-startup.png` | ⬜ Pendiente | No exponer cadenas de conexión o tokens |
| GH-01 | Inicio del repositorio | `evidence/github/GH-01-repository-home.png` | ⬜ Pendiente | Nombre y avatar propios están autorizados |
| GH-02 | Commits finales | `evidence/github/GH-02-commits-finales.png` | ⬜ Pendiente | Mostrar trazabilidad final |
| GH-03 | Carpeta docs | `evidence/github/GH-03-docs-folder.png` | ⬜ Pendiente | Mostrar documentos entregados |
| GH-04 | Actions o vínculo Render | `evidence/github/GH-04-actions-or-render-link.png` | ⬜ Pendiente | Usar el mecanismo aplicable |

No capturar valores de `DATABASE_URL`, `JWT_SECRET`, `APP_ENCRYPTION_KEY` ni credenciales de PostgreSQL.

## 13.9 Evidencias complementarias de base de datos

| ID | Evidencia | Ruta requerida | Estado | Observaciones |
|---|---|---|---|---|
| DB-01 | Dashboard de Render Postgres | `evidence/database/DB-01-render-postgres-dashboard.png` | ⬜ Pendiente | No mostrar credenciales o URL de conexión |
| DB-02 | Migración Prisma correcta | `evidence/database/DB-02-prisma-migrate-success.png` | ⬜ Pendiente | Mostrar nombres y estado |
| DB-03 | SecureNote cifrada | `evidence/database/DB-03-secure-note-encrypted.png` | ⬜ Pendiente | No mostrar clave ni plaintext sensible |
| DB-04 | Registros demo | `evidence/database/DB-04-demo-records.png` | ⬜ Pendiente | Datos propios/controlados o sintéticos |

## 13.10 Evidencias para presentación

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| PRE-01 | Flujo completo seleccionado | `evidence/presentation/PRE-01-demo-flow.png` | ⬜ Pendiente | Composición o captura propia: curso, entrega y calificación |
| PRE-02 | Resultados de pruebas | `evidence/presentation/PRE-02-test-summary.png` | ⬜ Pendiente | 26/26 API, 14/14 defensivas y 27 capturas, con fecha |
| PRE-03 | Comparativo autorizado | `docs/16-comparativo-ui.md` y `docs/26-comparativo-ui-print.md` | ✅ Disponible | Classroom original autorizado y EduRoom desde Render; sin incorporar assets de Google en la réplica |
| PRE-04 | Arquitectura y modelo | `evidence/presentation/PRE-04-architecture-model.png` | ⬜ Pendiente | Diagramas propios, legibles en proyector |

Esta carpeta contiene copias seleccionadas para exponer; la evidencia fuente permanece en su categoría original.

## 13.11 Ficha de trazabilidad

Completar una ficha por archivo:

```markdown
### [ID] — [Título]

| Campo | Valor |
|---|---|
| Fecha y hora | AAAA-MM-DD HH:MM, zona horaria |
| Responsable | Identificador académico |
| Fuente | Google Classroom observado / EduRoom / Render / GitHub / DB |
| Entorno | Render Production / Local controlado |
| Herramienta y versión | Navegador, Postman, terminal, Playwright, etc. |
| Rol | Profesor / estudiante / público |
| Precondición | Estado inicial |
| Acción | Acción realizada |
| Resultado | Resultado visible |
| Archivo | evidence/categoria/ID-descripcion.png |
| Commit | Hash corto o etiqueta |
| SHA-256 | Hash de la versión final aprobada |
| Datos visibles | Propios/controlados autorizados; indicar si se preparó una copia segura |
| Clasificación | Observación / inferencia / implementación EduRoom |
| Limitaciones | Condiciones que afectan la interpretación |
```

## 13.12 Procedimiento de captura

1. Preparar datos sintéticos y confirmar el rol.
2. Ejecutar solo el flujo necesario; no repetir pruebas que acumulen datos en Render.
3. Capturar una región legible con la fecha o contexto registrable.
4. Conservar el original. Si aparece un secreto real reutilizable, marcarlo **Requiere revisión** y preparar por separado una copia segura para exposición.
5. Revisar al 100 % que no existan contraseñas, JWT completos, cookies, claves, tokens privados o cadenas de conexión visibles.
6. Guardar en la carpeta correspondiente con nombre canónico.
7. Calcular SHA-256.
8. Completar la ficha y actualizar el estado a disponible.
9. Verificar que la imagen abra desde el repositorio.
10. Seleccionar para presentación solo las evidencias indispensables.

## 13.13 Control final antes de entregar

- [ ] Todas las evidencias tienen ID único y ruta consistente.
- [ ] No hay contraseñas, JWT completos, cookies, claves, tokens privados o cadenas de conexión visibles.
- [x] Los nombres, avatares, URL, identificadores y códigos propios/controlados visibles cuentan con autorización académica.
- [ ] Cada evidencia proviene de una cuenta propia/controlada, una cuenta demo o contenido sintético.
- [x] Las capturas de Classroom son propias, manuales y autorizadas.
- [x] No se automatizó Google Classroom.
- [ ] Network y Application no exponen headers, bodies, cookies o almacenamiento sensible.
- [ ] La evidencia de cifrado no muestra `APP_ENCRYPTION_KEY` ni texto personal.
- [ ] La prueba de checksum fallido se hizo en una copia temporal y se descartó.
- [ ] `node scripts/verify-integrity.js` termina correctamente en la entrega final.
- [ ] Las variables de Render muestran nombres, nunca valores.
- [ ] La URL pública y el repositorio fueron comprobados desde una sesión sin privilegios.
- [ ] Cada archivo final tiene fecha, commit y SHA-256.
- [ ] Las capturas responsivas de EduRoom seleccionadas para presentación son legibles; las referencias de Classroom conservan su resolución original autorizada.
- [x] `docs/checksums.sha256` fue regenerado después del último cambio documental.

## 13.14 Resultado inicial del inventario

La carpeta de EduRoom contiene 54 PNG útiles para login, dashboard, tablón, trabajo de clase, personas, detalle, entrega, calificación e integridad. Classroom cuenta con nueve capturas UI y seis dinámicas manuales autorizadas. API, Render, GitHub y base de datos solo contienen `.gitkeep`; seguridad incorpora SEC-07 como evidencia textual reproducible y mantiene seis capturas pendientes. El inventario exhaustivo está en [`27-evidencias-tecnicas-finales.md`](27-evidencias-tecnicas-finales.md).

No debe cambiarse un estado a disponible por la sola existencia de una implementación. El estado se actualiza cuando el archivo final existe, abre correctamente, tiene trazabilidad y cumple la política aplicable: original autorizado para Classroom o versión sanitizada para las demás categorías cuando corresponda.

## 13.15 Artefactos del reporte final

| Artefacto | Ruta | SHA-256 | Validación |
|---|---|---|---|
| Documento Word | `evidence/final-pdf/II_GLOBAL_23110022_8C.docx` | `2F9CAF2316F7AF403D9FB6789B5F4B5BD994BC97C0C3F679B2877C698A177B4E` | Abre correctamente; 70 imágenes en línea: logotipo institucional y 69 figuras |
| Documento PDF | `evidence/final-pdf/II_GLOBAL_23110022_8C.pdf` | `466E71DD9E83DB8392219DE48B19ECF9D56BA039B0EC2DE3C2E1AFEFEE965BA0` | 26 páginas tamaño carta revisadas visualmente, sin páginas vacías ni superposiciones |

Los dos hashes se conservan también en `evidence/final-pdf/SHA256SUMS.txt`.
