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

Los estados iniciales se determinaron revisando el repositorio. Deben actualizarse después de capturar, anonimizar y calcular el hash de cada archivo.

## 13.2 Privacidad y ética

Antes de guardar cualquier evidencia:

- ocultar correos, nombres completos, fotografías, avatares y notificaciones;
- ocultar JWT, cookies, contraseñas, tokens y encabezados `Authorization`;
- ocultar claves, secretos, cadenas de conexión y valores de variables;
- ocultar códigos de clase reales, enlaces de invitación e identificadores;
- usar cuentas demo y contenido sintético;
- evitar capturar correo, mensajería, administrador de contraseñas y escritorio personal;
- revisar la barra de direcciones, pestañas, consola y paneles laterales;
- calcular SHA-256 solo después de aplicar la censura definitiva.

Las capturas de Google Classroom deben ser propias, manuales, autorizadas y obtenidas con una cuenta controlada. Ningún script de este proyecto debe automatizar, inspeccionar o capturar ese servicio.

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
SEC-01-integrity-ok.png
RND-01-deploy-success.png
```

Prefijos adicionales: `GH` para GitHub, `DB` para base de datos y `PRE` para presentación. Usar dos dígitos, minúsculas y guiones. No incluir información personal en el nombre.

Las capturas Playwright existentes conservan nombres previos porque ya están enlazadas desde otros documentos. La columna “Ruta sugerida” define el nombre canónico para seleccionar o copiar una versión final anonimizada, sin eliminar el original.

## 13.4 A. Evidencias de Google Classroom

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| GC-01 | Pantalla inicial o dashboard | `evidence/ui/google-classroom/GC-01-dashboard.png` | ⬜ Pendiente | Ocultar cuenta, clases ajenas, avatar y notificaciones |
| GC-02 | Clase demo propia | `evidence/ui/google-classroom/GC-02-clase-demo.png` | ⬜ Pendiente | Usar clase controlada; ocultar código e integrantes |
| GC-03 | Tablón | `evidence/ui/google-classroom/GC-03-tablon.png` | ⬜ Pendiente | Publicaciones completamente sintéticas |
| GC-04 | Trabajo de clase | `evidence/ui/google-classroom/GC-04-trabajo-clase.png` | ⬜ Pendiente | Evitar materiales, nombres o fechas personales |
| GC-05 | Detalle de tarea | `evidence/ui/google-classroom/GC-05-tarea.png` | ⬜ Pendiente | Mostrar jerarquía y estado, no activos propietarios |
| GC-06 | Entrega de tarea | `evidence/ui/google-classroom/GC-06-entrega.png` | ⬜ Pendiente | Archivo y texto de prueba; ocultar identidad |
| GC-07 | Personas | `evidence/ui/google-classroom/GC-07-personas.png` | ⬜ Pendiente | Censurar todos los nombres, correos, fotos y roles identificables |
| GC-08 | DevTools Network | `evidence/ui/google-classroom/GC-08-network.png` | ⬜ Pendiente | Mostrar solo tipo, estado, tiempo y tamaño; ocultar URL, headers, bodies y tokens |
| GC-09 | DevTools Application | `evidence/ui/google-classroom/GC-09-application.png` | ⬜ Pendiente | No mostrar cookies, almacenamiento, tokens ni valores de sesión |
| GC-10 | Performance o Memory | `evidence/ui/google-classroom/GC-10-performance-memory.png` | ⬜ Pendiente | Conservar solo métricas agregadas; no subir heap snapshots |

`evidence/ui/google-classroom/README.md` es una guía, no una evidencia visual. Si no se dispone de capturas propias autorizadas, mantener los estados pendientes y explicar la limitación.

## 13.5 B. Evidencias de EduRoom

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| ER-01 | Login | `evidence/ui/eduroom/ER-01-login.png` | ✅ Disponible | Fuente actual: `login-1280x720.png`; existe también en tableta y móvil |
| ER-02 | Registro | `evidence/ui/eduroom/ER-02-registro.png` | ⬜ Pendiente | Usar correo sintético único y ocultar la contraseña |
| ER-03 | Dashboard | `evidence/ui/eduroom/ER-03-dashboard.png` | ✅ Disponible | Fuente actual: `dashboard-1280x720.png` |
| ER-04 | Crear curso | `evidence/ui/eduroom/ER-04-crear-curso.png` | ◐ Parcial | El dashboard existe, pero falta el modal o confirmación explícita de creación |
| ER-05 | Unirse a curso | `evidence/ui/eduroom/ER-05-unirse-curso.png` | ◐ Parcial | Existe dashboard de estudiante; falta capturar la acción con código censurado |
| ER-06 | Crear anuncio | `evidence/ui/eduroom/ER-06-crear-anuncio.png` | ◐ Parcial | `course-stream-1280x720.png` muestra el tablón; falta la creación o confirmación |
| ER-07 | Crear tarea | `evidence/ui/eduroom/ER-07-crear-tarea.png` | ◐ Parcial | Existen `classwork-1280x720.png` y detalle; falta la acción de creación |
| ER-08 | Entregar tarea | `evidence/ui/eduroom/ER-08-entrega.png` | ✅ Disponible | Fuente actual: `assignment-submission-1280x720.png` |
| ER-09 | Calificar y retroalimentar | `evidence/ui/eduroom/ER-09-calificacion.png` | ✅ Disponible | Fuente actual: `assignment-graded-1280x720.png` |
| ER-10 | Comentarios | `evidence/ui/eduroom/ER-10-comentarios.png` | ⬜ Pendiente | Mostrar contenido sintético y ambos roles autorizados |
| ER-11 | Estado de integridad | `evidence/ui/eduroom/ER-11-integridad.png` | ✅ Disponible | Fuente actual: `integrity-1280x720.png` |
| ER-12 | Secure notes o cifrado | `evidence/ui/eduroom/ER-12-secure-notes.png` | ⬜ Pendiente | Si no existe vista UI, usar evidencia API y DB, indicándolo |

El manifiesto [`capture-manifest.json`](../evidence/ui/eduroom/capture-manifest.json) registra 27 capturas de nueve flujos en tres viewports. El resultado responsive completo está en [`18-capturas-eduroom-render.md`](18-capturas-eduroom-render.md).

## 13.6 C. Evidencias de API

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| API-01 | Health check | `evidence/api/API-01-health.png` | ⬜ Pendiente | Mostrar URL, HTTP 200, `status=ok`, fecha y ambiente |
| API-02 | Login | `evidence/api/API-02-login.png` | ⬜ Pendiente | Ocultar contraseña, JWT, headers y almacenamiento |
| API-03 | Courses | `evidence/api/API-03-courses.png` | ⬜ Pendiente | Censurar IDs y códigos; mostrar método, ruta y estado |
| API-04 | Assignments | `evidence/api/API-04-assignments.png` | ⬜ Pendiente | Usar tarea y curso sintéticos |
| API-05 | Submissions | `evidence/api/API-05-submissions.png` | ⬜ Pendiente | Mostrar `SUBMITTED` o `GRADED` sin identidad |
| API-06 | Integrity endpoint | `evidence/api/API-06-integrity.png` | ⬜ Pendiente | Mostrar estado y contadores; no hashes ni rutas |

Los resultados textuales ya están documentados en [`14-pruebas-api-render.md`](14-pruebas-api-render.md), pero las capturas sanitizadas de esta carpeta siguen pendientes.

## 13.7 D. Evidencias de seguridad

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| SEC-01 | Checksum correcto | `evidence/security/SEC-01-integrity-ok.png` | ⬜ Pendiente | Capturar `22 archivos coinciden` después del build ofuscado |
| SEC-02 | Checksum fallido | `evidence/security/SEC-02-integrity-fail.png` | ⬜ Pendiente | Usar copia temporal; mostrar archivo modificado y código 1 |
| SEC-03 | Cifrado en base de datos | `evidence/security/SEC-03-database-encryption.png` | ⬜ Pendiente | Mostrar IV, auth tag y ciphertext truncado; no clave ni texto real |
| SEC-04 | Ofuscación frontend | `evidence/security/SEC-04-frontend-obfuscation.png` | ⬜ Pendiente | Comparar build normal/ofuscado sin afirmar cifrado |
| SEC-05 | Token inválido rechazado | `evidence/security/SEC-05-invalid-token.png` | ⬜ Pendiente | Mostrar HTTP 401 y ocultar el token sintético |
| SEC-06 | Rol no autorizado rechazado | `evidence/security/SEC-06-role-forbidden.png` | ⬜ Pendiente | Mostrar HTTP 403 de estudiante al crear/calificar |

La implementación y los resultados ya se explican en [`20-validacion-seguridad-producto.md`](20-validacion-seguridad-producto.md). La captura de checksum fallido nunca debe realizarse sobre producción ni sobre la única copia de la entrega.

## 13.8 E. Evidencias de despliegue y repositorio

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| RND-01 | Render dashboard | `evidence/render/RND-01-dashboard.png` | ⬜ Pendiente | Ocultar IDs de servicio, propietario, consumo y datos no necesarios |
| RND-02 | Variables configuradas | `evidence/render/RND-02-variables-hidden.png` | ⬜ Pendiente | Mostrar solo nombres y presencia; todos los valores deben quedar ocultos |
| RND-03 | Deploy exitoso | `evidence/render/RND-03-deploy-success.png` | ⬜ Pendiente | Mostrar estado y fecha; ocultar información de cuenta |
| RND-04 | URL funcionando | `evidence/render/RND-04-url-working.png` | ⬜ Pendiente | Capturar EduRoom o health en la URL pública |
| GH-01 | Repositorio GitHub | `evidence/github/GH-01-repository.png` | ⬜ Pendiente | Mostrar nombre, estructura y commit/etiqueta; ocultar cuenta personal innecesaria |

No capturar valores de `DATABASE_URL`, `JWT_SECRET`, `APP_ENCRYPTION_KEY` ni credenciales de PostgreSQL.

## 13.9 Evidencias complementarias de base de datos

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| DB-01 | Modelo o esquema Prisma | `evidence/database/DB-01-schema.png` | ⬜ Pendiente | Mostrar entidades y relaciones propias de EduRoom |
| DB-02 | Payload cifrado de SecureNote | `evidence/database/DB-02-secure-note-ciphertext.png` | ⬜ Pendiente | Base controlada; truncar ciphertext y ocultar IDs |
| DB-03 | Migraciones aplicadas | `evidence/database/DB-03-migrations.png` | ⬜ Pendiente | Mostrar nombres y estado, no cadena de conexión |

## 13.10 Evidencias para presentación

| ID | Evidencia | Ruta sugerida | Estado | Observaciones |
|---|---|---|---|---|
| PRE-01 | Flujo completo seleccionado | `evidence/presentation/PRE-01-demo-flow.png` | ⬜ Pendiente | Composición o captura propia: curso, entrega y calificación |
| PRE-02 | Resultados de pruebas | `evidence/presentation/PRE-02-test-summary.png` | ⬜ Pendiente | 26/26 API, 14/14 defensivas y 27 capturas, con fecha |
| PRE-03 | Comparativo autorizado | `evidence/presentation/PRE-03-ui-comparison.png` | ⬜ Pendiente | Sin logos copiados; Classroom anonimizado y EduRoom desde Render |
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
| SHA-256 | Hash de la versión anonimizada |
| Datos ocultos | Categorías censuradas |
| Clasificación | Observación / inferencia / implementación EduRoom |
| Limitaciones | Condiciones que afectan la interpretación |
```

## 13.12 Procedimiento de captura

1. Preparar datos sintéticos y confirmar el rol.
2. Ejecutar solo el flujo necesario; no repetir pruebas que acumulen datos en Render.
3. Capturar una región legible con la fecha o contexto registrable.
4. Trabajar sobre una copia y aplicar censura irreversible.
5. Revisar al 100 % que no existan datos sensibles.
6. Guardar en la carpeta correspondiente con nombre canónico.
7. Calcular SHA-256.
8. Completar la ficha y actualizar el estado a disponible.
9. Verificar que la imagen abra desde el repositorio.
10. Seleccionar para presentación solo las evidencias indispensables.

## 13.13 Control final antes de entregar

- [ ] Todas las evidencias tienen ID único y ruta consistente.
- [ ] No hay correos, nombres, fotos, tokens, cookies, claves o contraseñas visibles.
- [ ] Los códigos de clase e invitaciones reales están ocultos.
- [ ] Solo se utilizaron cuentas demo y contenido sintético.
- [ ] Las capturas de Classroom son propias, manuales y autorizadas.
- [ ] No se automatizó Google Classroom.
- [ ] Network y Application no exponen headers, bodies, cookies o almacenamiento sensible.
- [ ] La evidencia de cifrado no muestra `APP_ENCRYPTION_KEY` ni texto personal.
- [ ] La prueba de checksum fallido se hizo en una copia temporal y se descartó.
- [ ] `node scripts/verify-integrity.js` termina correctamente en la entrega final.
- [ ] Las variables de Render muestran nombres, nunca valores.
- [ ] La URL pública y el repositorio fueron comprobados desde una sesión sin privilegios.
- [ ] Cada archivo final tiene fecha, commit y SHA-256.
- [ ] Las imágenes seleccionadas para presentación son legibles en 1280 × 720.
- [ ] `docs/checksums.sha256` fue regenerado después del último cambio documental.

## 13.14 Resultado inicial del inventario

La carpeta de EduRoom contiene evidencia automatizada útil para login, dashboard, tablón, trabajo de clase, personas, detalle, entrega, calificación e integridad. Las acciones de registro, creación, unión y comentarios requieren capturas adicionales. No se encontraron capturas que acrediten por sí mismas Google Classroom, API, seguridad, Render, GitHub o base de datos; esas categorías permanecen pendientes aunque existan resultados narrativos en otros documentos.

No debe cambiarse un estado a disponible por la sola existencia de una implementación. El estado se actualiza cuando el archivo sanitizado existe, abre correctamente y tiene trazabilidad.
