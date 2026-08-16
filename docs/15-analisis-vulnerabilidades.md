# 15. Análisis defensivo de vulnerabilidades

## 15.1 Identificación del análisis

| Campo | Valor |
|---|---|
| Aplicación evaluada | EduRoom |
| Código fuente | [Repositorio de EduRoom](https://github.com/juan-p0422/proyecto_ING-INV) |
| Instancia propia | [EduRoom en Render](https://eduroom-znb0.onrender.com) |
| Fecha de revisión | 14-08-2026, `America/Mexico_City` |
| Marco | [OWASP Top 10:2021](https://owasp.org/Top10/2021/) |
| Enfoque | Revisión de código y comprobaciones dinámicas defensivas de baja carga |

Este documento es una evaluación académica, no un certificado de seguridad ni un pentest profesional. OWASP Top 10 se utiliza como marco de concientización y clasificación; no representa cobertura completa. Para una verificación formal futura se recomienda OWASP ASVS.

## 15.2 Alcance y reglas éticas

### Incluido

- código propio de EduRoom: frontend React/Vite, API Express/TypeScript, Prisma y PostgreSQL;
- autenticación, autorización por rol y membresía, validación, errores y exposición de información;
- JWT, CORS, cifrado AES-256-GCM, bcrypt, checksums SHA-256 e integridad del build;
- configuración declarativa de Render y dependencias npm;
- comprobaciones normales sobre cuentas y datos sintéticos en el despliegue propio.

### Google Classroom

Google Classroom se conserva únicamente como referencia externa observada mediante caja negra ética, documentación pública e interfaces legítimas. No se evaluó su seguridad, no se enviaron payloads de prueba y no se formulan conclusiones sobre vulnerabilidades o controles internos de Google. Las inferencias funcionales del proyecto no describen su arquitectura privada.

### Excluido

- explotación, bypass, fuerza bruta, ingeniería social o acceso no autorizado;
- escaneo agresivo, fuzzing masivo, pruebas de carga o denegación de servicio;
- modificación o eliminación destructiva de información;
- pruebas contra Google Classroom o cualquier sistema de terceros;
- análisis de infraestructura interna de Render, PostgreSQL administrado o cuentas ajenas;
- afirmaciones de que la ausencia de un hallazgo equivale a ausencia de vulnerabilidades.

## 15.3 Metodología

La metodología combinó cuatro fuentes de evidencia:

1. **Revisión de diseño:** límites de confianza, activos, roles y flujos de datos.
2. **Revisión de código:** rutas, middleware, consultas Prisma, esquema, cliente, cifrado, checksums y despliegue.
3. **Comprobación dinámica defensiva:** 14 solicitudes secuenciales mediante `tests/render-security-check.js`.
4. **Componentes:** `npm audit --omit=dev` separado para backend y frontend.

### Controles revisados

| Área | Elementos inspeccionados |
|---|---|
| Autenticación | bcrypt, login, registro, expiración y validación de JWT |
| Autorización | rol global, rol por inscripción, pertenencia y docente propietario |
| Entradas | esquemas Zod, longitudes, tipos, fechas, notas y límite JSON de 100 KiB |
| Errores | respuestas 400/401/403/404/409/500 y ausencia de trazas al cliente |
| Exposición | selecciones seguras de usuario, endpoint de integridad y respuestas de notas |
| Sesión | almacenamiento del JWT, expiración, revocación y rotación |
| CORS | allowlist, `credentials=false` y origen propio de Render |
| Integridad | SHA-256, manifiesto, alcance y `STRICT_INTEGRITY` |
| Cifrado | bcrypt para contraseñas y AES-256-GCM para `SecureNote` |
| Dependencias | lockfiles y advisories conocidos reportados por npm en la fecha de revisión |

La severidad combina probabilidad e impacto cualitativos. “Implementado” describe presencia del control, no demuestra que sea infalible.

## 15.4 Activos y fronteras de confianza

| Superficie | Activos | Frontera |
|---|---|---|
| Navegador | credenciales, JWT, contenido académico | usuario ↔ frontend |
| API pública | identidades, roles y reglas de negocio | Internet ↔ Express |
| Persistencia | usuarios, inscripciones, entregas y notas | API ↔ PostgreSQL |
| Build | JavaScript, HTML, CSS y manifiesto | pipeline ↔ runtime |
| Render | secretos, logs, red y base administrada | operador ↔ plataforma |

## 15.5 Evaluación OWASP Top 10:2021

| Categoría | Riesgo | Cómo podría afectar a EduRoom | Evidencia en código o API | Mitigación implementada | Recomendación de mejora |
|---|---|---|---|---|---|
| **A01 Broken Access Control** | Acceso o modificación fuera del rol/curso | Lectura de cursos ajenos, creación de tareas o calificación indebida | `requireAuth`, `requireCourseMember` y `requireCourseTeacher`; prueba: estudiante recibió 403 al crear tarea y calificar | Autorización en backend, filtrado de entregas por rol, docente propietario | Impedir autoasignación pública de `TEACHER`; añadir pruebas sistemáticas IDOR por cada recurso y auditoría de decisiones |
| **A02 Cryptographic Failures** | Exposición por hash, cifrado o claves mal administradas | Compromiso de contraseñas o notas; pérdida de acceso al rotar mal la clave | bcrypt coste 12; `crypto.ts` usa AES-256-GCM, IV aleatorio, etiqueta y derivación `scrypt`; secretos externos | Hash no reversible de contraseñas, cifrado autenticado de `SecureNote`, HTTPS en Render | KMS/secret manager, identificador y rotación de clave, cifrado de backups y política formal de datos; separar claramente datos no cifrados |
| **A03 Injection** | SQL/JSON/script injection | Alteración de consultas, datos o contenido mostrado | Prisma construye consultas; Zod valida strings/tipos/longitudes; React renderiza texto por defecto | ORM parametrizado, JSON máximo 100 KiB, validación del lado servidor | Añadir tests de caracteres límite, mantener prohibido SQL crudo y sanitizar contextualmente cualquier HTML futuro |
| **A04 Insecure Design** | Reglas insuficientes desde el diseño | Docentes autoasignados, códigos reutilizables, ausencia de baja o auditoría | Registro acepta `role`; código de curso no expira; no hay recuperación, revocación ni eliminación | Separación de roles y membresía; códigos aleatorios; unicidad de inscripción/entrega | Alta docente por invitación/aprobación, códigos revocables/expirables, modelado de amenazas, ciclo de vida y limpieza QA |
| **A05 Security Misconfiguration** | Configuración permisiva o información innecesaria | Arranque con integridad degradada o políticas inconsistentes | Helmet, CORS allowlist, `credentials=false`, errores genéricos; `STRICT_INTEGRITY=false` en `render.yaml` | Cabeceras defensivas, mismo origen en Render, secretos generados, límite de body | Validar cabeceras/CSP en CI, activar integridad estricta después de asegurar el pipeline, publicar versión no sensible en health |
| **A06 Vulnerable and Outdated Components** | Dependencia con advisory conocido | Compromiso por una biblioteca transitiva | Lockfiles separados; el 14-08-2026 `npm audit --omit=dev` reportó 0 vulnerabilidades de producción en backend y 0 en frontend | Versionado bloqueado con `package-lock.json` | Automatizar actualización y revisión; auditar también dependencias de desarrollo; no interpretar 0 advisories como garantía |
| **A07 Identification and Authentication Failures** | Suplantación o sesión robada | Uso de JWT obtenido mediante XSS, cuentas no verificadas o tokens no revocables | JWT expira en 8 h; secreto ≥32; token en `localStorage`; rate limit 50/15 min en `/api/auth`; sin MFA/revocación | bcrypt, mensajes de login uniformes, validación de token y rate limit | Cookie `HttpOnly`, `Secure`, `SameSite`; refresh rotatorio, revocación, verificación de correo, MFA opcional y alta docente controlada |
| **A08 Software and Data Integrity Failures** | Build o manifiesto sustituido | Ejecución de artefactos alterados con apariencia válida | Manifest SHA-256 comprueba modificados, ausentes y nuevos; no está firmado; modo Render no estricto | Generación/verificación automatizada y endpoint público reducido | Firmar manifiesto o usar attestations del pipeline; verificar firma con clave pública externa y fijar procedencia del despliegue |
| **A09 Security Logging and Monitoring Failures** | Incidentes no detectados o no atribuibles | Abuso de cuentas/códigos sin alerta o trazabilidad | Logs de arranque, integridad y errores; no existe bitácora estructurada de eventos de seguridad | Mensajes sin stack trace al cliente y diagnósticos mínimos | Logging estructurado y sanitizado, correlation ID, eventos de auth/rol/calificación, alertas, retención y acceso restringido |
| **A10 Server-Side Request Forgery (SSRF)** | Servidor inducido a consultar URL controlada | Acceso a metadata cloud o red interna si se implementara importación remota | Ninguna ruta actual ejecuta fetch de URL aportada por usuario; `Attachment.fileUrl` solo está modelado | **No aplicable en la funcionalidad actual** | Si se añade importación/webhook: allowlist de esquema/host/puerto, bloquear IP privadas/metadata, sin redirecciones y con egress restringido |

### Interpretación de CORS

Una solicitud con `Origin: https://origen-no-permitido.invalid` recibió HTTP 200 de `/api/health`, pero **sin** `Access-Control-Allow-Origin`. Esto es el comportamiento conceptual esperado: CORS no impide que una solicitud llegue al servidor; el navegador impide que el origen ajeno lea la respuesta. CORS no sustituye autenticación ni autorización.

## 15.6 Pruebas defensivas permitidas y resultados

La ejecución se realizó el 14-08-2026 a las 20:32 (`America/Mexico_City`), equivalente a `2026-08-15T02:32:30.077Z`. Fueron 14 solicitudes secuenciales, 14 aprobadas y 0 fallidas.

| ID | Prueba permitida | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| SEC-01 | Consultar `/api/courses` sin token | 401 | 401 | Aprobado |
| SEC-02 | Consultar `/api/auth/me` con token sintético inválido | 401 | 401 | Aprobado |
| SEC-03 | Consultar endpoint de integridad | 200 y estado conocido | 200, `verified` | Aprobado |
| SEC-04 | Enviar origen CORS no permitido a health | Sin ACAO para ese origen | 200 sin ACAO | Aprobado |
| SEC-05 | Enviar registro con payload vacío | 400 controlado | 400 | Aprobado |
| SEC-06 | Registrar cuentas sintéticas | 201, sin `passwordHash` | 201 | Advertencia¹ |
| SEC-07 | Consultar perfil autenticado | 200, sin `passwordHash` | 200 | Aprobado |
| SEC-08 | Crear curso/tarea de preparación como docente | 201 | 201 | Aprobado |
| SEC-09 | Intentar crear tarea como estudiante | 403 | 403 | Aprobado |
| SEC-10 | Crear entrega sintética como estudiante | 201 | 201 | Aprobado |
| SEC-11 | Intentar calificar como estudiante | 403 | 403 | Aprobado |

¹ El contrato actual permite registrar un docente de forma anónima. La prueba confirma el comportamiento, pero este se clasifica como hallazgo y no como control satisfactorio.

El script utilizado es `tests/render-security-check.js`. No se probaron expiración real de ocho horas, fuerza bruta, rate-limit por saturación, cuerpos masivos, explotación de XSS/SQLi, manipulación destructiva del manifiesto en producción ni sistemas de terceros.

## 15.7 Matriz de riesgos

| ID | Hallazgo | Severidad | Probabilidad | Impacto | Evidencia | Mitigación | Estado |
|---|---|---|---|---|---|---|---|
| V-01 | Registro anónimo permite seleccionar `TEACHER` | Alta | Alta | Administración de cursos por cuentas no autorizadas | `auth.ts`; registro QA devolvió rol docente | Invitación/aprobación y rol `STUDENT` forzado públicamente | Abierto |
| V-02 | JWT persistido en `localStorage` | Alta | Media | Robo de sesión si existe XSS | `frontend/src/services/api.ts` | Cookie HttpOnly + CSP + revisión XSS | Abierto |
| V-03 | Sin revocación, refresh ni rotación de sesión | Media | Media | Token válido hasta 8 h aun tras incidente | JWT autocontenido; `render.yaml` | Tokens cortos, refresh rotatorio y revocación | Abierto |
| V-04 | Código de curso no expira ni se revoca | Media | Media | Inscripción no deseada al filtrarse | `POST /api/courses/join` | Rotación, expiración, aprobación y registro de uso | Abierto |
| V-05 | Manifiesto SHA-256 no firmado | Media | Media | Sustitución coordinada de build y hashes | `checksum.ts`, `integrity-manifest.json` | Firma/attestation y clave pública externa | Mitigado parcialmente |
| V-06 | Integridad no estricta en Render | Media | Baja | Artefacto discrepante podría iniciar con advertencia | `STRICT_INTEGRITY=false` | Activar después de validar empaquetado y recuperación | Abierto |
| V-07 | Clave AES única sin rotación/versionado | Media | Baja | Exposición global o pérdida de notas | `APP_ENCRYPTION_KEY`, `crypto.ts` | KMS, key ID, rotación y recifrado | Abierto |
| V-08 | Sin auditoría estructurada y alertas | Media | Alta | Abuso no atribuible o detectado tarde | No existe entidad/evento de auditoría | Logs sanitizados, alertas y retención | Abierto |
| V-09 | Sin verificación de correo/MFA/recuperación | Media | Media | Cuentas falsas o recuperación insegura futura | Módulo auth mínimo | Verificación y recuperación de un uso; MFA opcional | Abierto |
| V-10 | Rate limit limitado al módulo auth | Media | Media | Abuso de rutas de escritura | `app.ts` limita solo `/api/auth` | Cuotas por usuario/ruta y protección de plataforma | Abierto |
| V-11 | CRUD y limpieza incompletos | Baja | Alta | Acumulación de datos sintéticos y retención indefinida | Sin DELETE/anonimización | Política de retención y endpoint administrativo seguro | Abierto |
| V-12 | Endpoint de integridad público | Baja | Baja | Exposición menor de estado/conteos | `/api/security/integrity` | Mantener salida mínima o restringir según amenaza | Aceptado académicamente |
| V-13 | Adjuntos futuros podrían introducir SSRF/malware | Media futura | Baja actual | Acceso a red interna o archivo malicioso | Modelo `Attachment`, sin carga/fetch actual | Diseño seguro antes de implementar | No aplicable actualmente |
| V-14 | Dependencias pueden volverse vulnerables | Variable | Media | Riesgo de cadena de suministro | Audit actual 0/0; lockfiles | Monitoreo continuo, actualización y SBOM | Mitigado actualmente |

## 15.8 Priorización

1. Forzar rol estudiante en el registro público y crear un canal controlado para docentes.
2. Migrar la sesión fuera de `localStorage` y añadir ciclo de revocación/renovación.
3. Incorporar bitácora de seguridad, alertas y trazabilidad de versión desplegada.
4. Firmar el manifiesto y evaluar `STRICT_INTEGRITY=true` con procedimiento de recuperación.
5. Diseñar rotación de claves, retención de datos y códigos de curso revocables.
6. Mantener dependencias, pruebas de autorización y revisión OWASP en CI.

## 15.9 Reproducción segura

```bash
node tests/render-security-check.js
```

Para un entorno local propio:

```powershell
$env:EDUROOM_BASE_URL = 'http://localhost:3000'
node tests/render-security-check.js
```

El script crea dos cuentas, un curso, una tarea y una entrega sintéticos porque no existe un endpoint de limpieza. Debe ejecutarse una sola vez cuando sea necesario, no en bucle ni como monitor frecuente.

## 15.10 Conclusión

El nivel de riesgo se clasifica como **medio para una demostración académica con datos sintéticos**, con dos hallazgos altos que impiden recomendar el sistema para información educativa real: autoasignación pública del rol docente y exposición potencial del JWT ante XSS por `localStorage`. Los controles de autorización por curso, validación, errores, bcrypt, AES-GCM, CORS e integridad funcionaron en los escenarios defensivos probados.

La evaluación está limitada por una sola revisión temporal, ausencia de pentest independiente, falta de acceso a infraestructura interna y exclusión deliberada de técnicas ofensivas. Las recomendaciones futuras prioritarias son corregir el alta de docentes y la sesión, introducir auditoría, firmar el manifiesto, rotar claves y adoptar OWASP ASVS para requisitos verificables más amplios.

## 15.11 Referencias

- [OWASP Top 10:2021](https://owasp.org/Top10/2021/)
- [OWASP: cómo utilizar Top 10 como estándar](https://owasp.org/Top10/2021/A00_2021_How_to_use_the_OWASP_Top_10_as_a_standard/)
- [OWASP A10:2021 — SSRF](https://owasp.org/Top10/2021/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)
- [Documentación de pruebas funcionales de Render](14-pruebas-api-render.md)
- [Cifrado y ofuscación](09-cifrado-ofuscacion.md)
- [Checksums](08-checksum.md)
