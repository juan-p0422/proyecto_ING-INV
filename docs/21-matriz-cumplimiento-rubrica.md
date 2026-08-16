# 21. Matriz final de cumplimiento de la rúbrica

## 21.1 Datos de la evaluación

| Campo | Valor |
|---|---|
| Proyecto | EduRoom |
| Objeto externo | Google Classroom, aplicación no open source observada mediante caja negra |
| Repositorio | [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV) |
| Deploy | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |
| Fecha | 16-08-2026, `America/Mexico_City` |
| Rol evaluador | Profesor evaluador y auditor final de cumplimiento |
| Método | Revisión documental, inspección de código/configuración, pruebas locales y comprobación pública no destructiva |

## 21.2 Escala de evaluación

| Estado | Criterio |
|---|---|
| **Cumple** | Existe implementación y evidencia suficiente, coherente y verificable para el requisito |
| **Cumple documentalmente** | La técnica, medición o limitación está demostrada mediante documentación y artefactos revisables; puede faltar una evidencia operativa complementaria |
| **Parcial justificado** | Existe trabajo relevante o una guía completa, pero falta evidencia física, exportación, ejecución o cierre de una condición menor |
| **Falta** | No se encontró implementación ni evidencia suficiente |

Un estado “Cumple” no implica ausencia de limitaciones. “Cumple documentalmente” reconoce una demostración académica reproducible sin convertirla en garantía productiva. “Parcial justificado” señala exactamente qué evidencia o ejecución falta. Si aparece un secreto reutilizable completo, la evidencia afectada se marca además **Requiere revisión** y no se presenta hasta controlar el riesgo.

## 21.3 Comprobaciones realizadas

- `node scripts/verify-integrity.js`: **22 archivos coinciden con el manifest**.
- `npm test`: **9 pruebas de backend y 2 de frontend aprobadas**.
- Aplicación pública: HTTP 200.
- `GET /api/health`: `status=ok`, ambiente `production`.
- `GET /api/security/integrity`: `verified`, 19 archivos del backend y 0 discrepancias.
- Repositorio de GitHub: accesible públicamente mediante HTTP 200.
- Evidencia visual: 9 capturas UI y 6 dinámicas manuales autorizadas de Classroom, más 54 PNG de EduRoom en tres viewports.
- Revisión de secretos: `GC-DYN-03-application-storage.png` contiene valores visibles de cookies de sesión y queda **Requiere revisión**; no se reproducen sus valores en la documentación.

La API pública no identifica el commit desplegado. Por ello estas comprobaciones acreditan el estado observado, pero no demuestran por sí solas que Render corresponda al último cambio local.

## 21.4 Matriz de cumplimiento

| Requisito del profesor | Evidencia en el proyecto | Archivo o URL | Estado | Observaciones | Recomendación |
|---|---|---|---|---|---|
| Marco teórico | Define ingeniería inversa, caja negra, OSINT, análisis dinámico, checksum, cifrado, ofuscación y límites éticos | [Marco teórico](01-marco-teorico.md) | **Cumple** | La terminología separa observación, inferencia e implementación | Mantener referencias y fecha de consulta en la versión PDF |
| Información pública de Google Classroom | Contexto, funciones, usuarios, integraciones y fuentes oficiales | [Análisis de Classroom](02-analisis-google-classroom.md) | **Cumple** | No afirma acceso a código ni infraestructura privada; existen capturas manuales autorizadas | Conservar la nota de autorización y el alcance de caja negra |
| Aplicación no open source como objetivo | Google Classroom se identifica como software propietario observado externamente | [Alcance](01-marco-teorico.md), [reporte integrado](17-reporte-final-integrado.md) | **Cumple** | El enfoque es compatible con una práctica ética de caja negra | Repetir la declaración de alcance al iniciar la exposición |
| Herramientas utilizadas | DevTools, Git, Node.js, Prisma, Docker, Postman, Playwright y utilidades de checksum documentadas | [Herramientas](03-herramientas-utilizadas.md) | **Cumple** | Se explica propósito, salida y precauciones | Añadir versiones exactas a la evidencia final |
| Alcance ético y legal | Excluye bypass, explotación, carga, scraping y recopilación de terceros | [Marco teórico](01-marco-teorico.md), [análisis dinámico](04-analisis-dinamico.md) | **Cumple** | EduRoom mantiene identidad y código independientes | Conservar capturas propias/controladas autorizadas y excluir secretos reutilizables de la presentación |
| Ingeniería inversa exhaustiva | Existe análisis funcional, modelo, tecnología inferida, nueve capturas UI y seis capturas dinámicas manuales | [Análisis](02-analisis-google-classroom.md), [dinámico](04-analisis-dinamico.md), [modelo](05-reconstruccion-estructuras.md) | **Cumple documentalmente** | La cobertura funcional, estructural y dinámica está acreditada; los metadatos y valores legibles de Performance/Memory se consolidaron sin inventar cifras | Conservar los originales y excluir GC-DYN-03 de exposición hasta revisar sus cookies visibles |
| Análisis dinámico | Protocolo seguro, seis capturas manuales de DevTools y medición reproducible del cliente de EduRoom | [Análisis dinámico](04-analisis-dinamico.md), [medición](25-medicion-performance-memory.md), [evidencia dinámica](../evidence/dynamic/google-classroom/) | **Cumple documentalmente** | Network, Application, Performance y Memory cuentan con evidencia manual; GC-DYN-01 registra 64 solicitudes, DCL 455 ms y Load 2.19 s, y GC-DYN-05 registra 20.62 s, INP 58 ms y CLS 0 | Mantener el alcance de caja negra y tratar GC-DYN-03 como Requiere revisión por cookies visibles |
| Análisis de vulnerabilidades | OWASP Top 10, matriz de riesgos y 14/14 comprobaciones defensivas | [Análisis de vulnerabilidades](15-analisis-vulnerabilidades.md), [script](../tests/render-security-check.js) | **Cumple** | Se documentan riesgos abiertos y no se realizaron ataques ofensivos | Priorizar el alta docente pública y la gestión del JWT |
| Reconstrucción de estructuras de datos | Entidades, atributos, relaciones y estados conceptuales | [Reconstrucción](05-reconstruccion-estructuras.md), [Prisma](../backend/prisma/schema.prisma) | **Cumple** | Se declara que el modelo es propio y no el esquema interno de Google | Añadir una captura final del diagrama ER como DB-01 |
| Identificación de tecnologías | Distingue tecnologías públicas, inferidas y stack propio | [Classroom](02-analisis-google-classroom.md), [diseño de EduRoom](06-diseno-replica.md) | **Cumple** | No convierte inferencias sobre Google en hechos confirmados | Mantener etiquetas “inferido” y “confirmado” en diapositivas |
| Entradas y salidas | Documenta credenciales, códigos, textos, archivos, tareas, estados y respuestas visibles | [Análisis de Classroom](02-analisis-google-classroom.md), [API](14-pruebas-api-render.md) | **Cumple** | Incluye perspectiva funcional y contratos propios de API | Mostrar un ejemplo sanitizado de entrada/salida en la exposición |
| Uso de memoria | Explica Performance, heap, DOM, listeners, línea base y límites; EduRoom registra 2,185,404 bytes de heap JS usado y Classroom aporta heap snapshot manual | [Análisis dinámico](04-analisis-dinamico.md), [medición](25-medicion-performance-memory.md), [JSON](../evidence/performance/eduroom/eduroom-performance-20260816T064230Z.json) | **Cumple documentalmente** | GC-DYN-06 permite transcribir tamaños retenidos visibles —24,473 kB para `(compiled code)`, 15,261 kB para `Function` y 12,256 kB para `(string)`— sin publicar el snapshot ni estimar el total truncado | Presentarlo como muestra puntual del cliente, no como memoria de servidor ni prueba de fuga |
| Réplica funcional | SPA y API desplegadas; 26/26 solicitudes aprobadas y 27 capturas automatizadas | [EduRoom](https://eduroom-znb0.onrender.com), [pruebas API](14-pruebas-api-render.md), [capturas](18-capturas-eduroom-render.md) | **Cumple** | La funcionalidad central se encuentra operativa | Repetir un smoke test final después del último despliegue |
| Roles de profesor y estudiante | Registro/login, autorización global y membresía por curso | [Rutas de autenticación](../backend/src/routes/auth.ts), [pruebas API](14-pruebas-api-render.md) | **Cumple** | Las pruebas negativas devolvieron 403 en operaciones reservadas | Impedir que el registro público seleccione `TEACHER` sin invitación |
| Cursos | Crear, listar, consultar, unirse y obtener miembros | [Rutas de cursos](../backend/src/routes/courses.ts), [colección Postman](../tests/eduroom-render.postman_collection.json) | **Cumple** | Flujo probado en Render | Añadir expiración o rotación de códigos de ingreso |
| Tareas | Crear, listar y consultar detalle por curso | [Rutas de tareas](../backend/src/routes/assignments.ts), [pruebas API](14-pruebas-api-render.md) | **Cumple** | Creación restringida al profesor propietario | Capturar ER-07 mostrando la confirmación de creación |
| Entregas | Envío del estudiante y estado persistido | [Assignments](../backend/src/routes/assignments.ts), [captura de entrega](../evidence/ui/eduroom/assignment-submission-1280x720.png) | **Cumple** | La prueba obtuvo `SUBMITTED` | Añadir política de reentrega o cierre si la rúbrica lo exige |
| Comentarios | Crear y consultar comentarios de curso o tarea | [Rutas de comentarios](../backend/src/routes/comments.ts), [pruebas API](14-pruebas-api-render.md) | **Cumple** | Endpoint probado por integrante autorizado | Capturar ER-10 con contenido sintético |
| Calificaciones | Profesor califica 0–100 con feedback y estado `GRADED` | [Rutas de entregas](../backend/src/routes/submissions.ts), [captura](../evidence/ui/eduroom/assignment-graded-1280x720.png) | **Cumple** | Nota 95 persistida en la prueba de Render | Mostrar el resultado desde ambos roles en la demo |
| Protección del proyecto propio | Combina autorización, cifrado, checksum, ofuscación y diagnóstico antidebug | [Seguridad](07-seguridad-antireversing.md), [validación](20-validacion-seguridad-producto.md), [limitación del cliente](29-limitaciones-proteccion-cliente-web.md) | **Cumple** | **Cumple con limitación técnica documentada:** el cliente es observable por diseño web; JWT, roles, validación y decisiones críticas se comprueban en servidor, mientras ofuscación e integridad actúan como capas limitadas y verificables | Mantener secretos solo en servidor; capturar 401/403 y el manifest del nuevo deploy como evidencia operativa, sin condicionar este cierre técnico |
| Proceso de checksum | Generador, manifest, verificador, prueba correcta y prueba controlada fallida | [Checksum](08-checksum.md), [generador](../scripts/generate-checksum.js), [verificador](../scripts/verify-integrity.js) | **Cumple** | La auditoría final obtuvo 22/22 | Conservar log SEC-01 y prueba temporal SEC-02 |
| Checksum antes de ejecutarse | `server.ts` verifica antes de abrir el puerto; Render reporta detección no bloqueante y el candidato estricto cubre backend/frontend | [Validación estricta](28-validacion-strict-integrity.md), [demo](../tests/integrity-demo.js), [módulo](../backend/src/security/checksum.ts) | **Cumple** | Producción respondió `verified`, 19 y cero discrepancias; local `strict=true` verificó 22/22 y la alteración temporal fue detectada. El modo productivo de 22 archivos aún requiere redespliegue | Redesplegar para acreditar el modo bloqueante completo, sin condicionar el cumplimiento académico ya demostrado |
| Proceso de cifrado y ofuscación | Algoritmos, claves, IV, tag, payload, herramienta, comandos y límites documentados | [Cifrado y ofuscación](09-cifrado-ofuscacion.md), [validación](20-validacion-seguridad-producto.md) | **Cumple** | Se diferencia correctamente cifrado, hash, Base64 y ofuscación | Adjuntar SEC-03 y SEC-04 sin exponer claves |
| Cifrado | AES-256-GCM se usa antes de persistir `SecureNote`; 4/4 pruebas específicas aprobadas | [Crypto](../backend/src/security/crypto.ts), [ruta](../backend/src/routes/security.ts), [pruebas](../backend/tests/crypto.test.ts) | **Cumple** | IV aleatorio, tag autenticado y ciphertext Base64; falta rotación de clave | Versionar claves, considerar AAD y aislar notas corruptas |
| Cifrado de código fuente u ofuscación | `javascript-obfuscator` transforma el JavaScript compilado; pipeline candidato reproducido de extremo a extremo | [Ofuscador](../frontend/scripts/obfuscate-build.cjs), [evidencia SEC-07](../evidence/security/SEC-07-obfuscated-build-proof.txt), [validación](20-validacion-seguridad-producto.md) | **Cumple** | `npm run render:build` terminó con 1 JS transformado, manifest 22/22, sintaxis válida y 12 pruebas aprobadas; dificulta lectura, no vuelve invisible el frontend | Redesplegar para atribuir la misma release a la URL pública y conservar evidencia de Render |
| Técnicas antireversing | Diagnóstico de variables de instrumentación, advertencias y estado visual | [Antidebug](../backend/src/security/antiDebug.ts), [seguridad](07-seguridad-antireversing.md) | **Cumple** | Es deliberadamente no destructivo, no bloqueante y fácil de evadir | Demostrar una advertencia en copia local y explicar sus límites |
| Docker | Dockerfile multietapa, Compose, PostgreSQL, healthcheck y seed | [Docker Compose](../docker-compose.yml), [Dockerfile](../backend/Dockerfile), [despliegue](10-despliegue-render.md) | **Cumple** | Configuración reproducible disponible; la evidencia visual de Docker está pendiente | Ejecutar una vez desde limpio y capturar servicios saludables |
| GitHub | Repositorio público, código, documentación, pruebas y configuración | [Repositorio](https://github.com/juan-p0422/proyecto_ING-INV) | **Cumple** | La URL respondió HTTP 200 durante la auditoría | Confirmar que todos los cambios locales estén committeados, etiquetados y enviados |
| Render | Aplicación pública, healthcheck y PostgreSQL configurado | [Deploy](https://eduroom-znb0.onrender.com), [health](https://eduroom-znb0.onrender.com/api/health), [configuración](../render.yaml) | **Cumple** | HTTP 200 y producción saludable; no se expone versión/commit | Redesplegar el commit final y añadir versión no sensible al healthcheck |
| Pruebas de API y producto | Smoke test, Postman, seguridad defensiva, unitarias y visuales | [API](14-pruebas-api-render.md), [OWASP](15-analisis-vulnerabilidades.md), [UI](18-capturas-eduroom-render.md) | **Cumple** | 26/26 API, 14/14 defensivas y 12 unitarias en la auditoría final | Guardar capturas API-01 a API-06 y resumen PRE-02 |
| Evidencias visuales | Existen nueve capturas UI y seis dinámicas autorizadas de Classroom, 54 PNG de EduRoom, SEC-07 textual e inventario técnico global | [Checklist](13-evidencias.md), [inventario final](27-evidencias-tecnicas-finales.md) | **Parcial justificado** | La resolución y los datos propios autorizados no penalizan; faltan físicamente 25 capturas técnicas. Además, GC-DYN-03 queda **Requiere revisión** porque muestra valores de cookies potencialmente reutilizables | Invalidar las sesiones asociadas o preparar una copia segura autorizada de GC-DYN-03; crear solo las capturas técnicas ausentes |
| Comparativo UI | Matriz flexible, diez flujos, versión imprimible y evidencia responsiva de EduRoom | [Comparativo](16-comparativo-ui.md), [versión imprimible](26-comparativo-ui-print.md) | **Cumple** | Usa nueve referencias manuales en resolución original y una serie principal de 27 capturas EduRoom; conserva otras 27 como complementarias sin duplicar flujos | Exportar el documento 26 a PDF sin alterar las evidencias originales |
| Presentación presencial | Guion, fuente Marp de 16 diapositivas, demo, checklist y planes B | [Guion](12-guion-presentacion.md), [estructura](19-presentacion-diapositivas.md), [presentación imprimible](30-presentacion-final-print.md) | **Parcial justificado** | El contenido está preparado, pero no existe el PDF revisado ni constancia de ensayo o ejecución; GC-DYN-03 no debe proyectarse mientras esté en revisión | Exportar las 16 diapositivas, revisar página por página, ensayar con cronómetro y registrar la ejecución autorizada |
| Reporte final integrado | Portada formal, índice, lista de figuras, metodología, análisis, réplica, seguridad, pruebas, 69 figuras, límites y conclusiones | [Reporte integrado](17-reporte-final-integrado.md), [versión PDF-ready](31-reporte-final-pdf-ready.md), `evidence/final-pdf/II_GLOBAL_23110022_8C.docx` y `evidence/final-pdf/II_GLOBAL_23110022_8C.pdf` | **Cumple** | **Cumple documentalmente y en artefactos:** contiene los datos definitivos, responde a la consigna y fue revisado visualmente página por página; las capturas autorizadas no se penalizan por resolución o datos propios visibles | Conservar los artefactos aprobados y sus hashes junto al commit final |

## 21.5 Resumen ejecutivo

EduRoom satisface la mayor parte de la consigna en implementación, documentación y pruebas. La réplica está operativa, el repositorio es público, Render responde, los flujos de profesor y estudiante funcionan y la API fue probada de extremo a extremo. El modelo de datos, OWASP, AES-256-GCM, checksum, ofuscación y antireversing cuentan con código y explicación técnica.

La observación externa cuenta ahora con nueve capturas UI y seis capturas dinámicas manuales autorizadas. El comparativo acepta su resolución original y documenta de forma expresa cuándo se reutiliza una captura funcional cercana. La brecha del comparativo visual queda cerrada sin afirmar equivalencia pixel a pixel.

En protección, las reservas técnicas originales fueron corregidas en la configuración candidata: `STRICT_INTEGRITY=true`, verificación runtime de backend y frontend, y release ofuscada en Render/Docker. La reserva académica se mantiene hasta redesplegar el commit final y conservar evidencia verificable; además, el cliente web seguirá siendo observable y la ofuscación no constituye cifrado.

### Conteo sin ponderación

| Estado | Requisitos |
|---|---:|
| Cumple | 29 |
| Cumple documentalmente | 3 |
| Parcial justificado | 2 |
| Falta | 0 |
| Total evaluado | 34 |

Este conteo no equivale a una calificación numérica porque la consigna no asigna pesos. Un requisito parcial relacionado con evidencia puede tener más impacto académico que varios requisitos funcionales completos.

## 21.6 Riesgos pendientes

| ID | Riesgo | Severidad | Efecto académico o técnico | Tratamiento |
|---|---|---|---|---|
| RF-01 | Login de Classroom no capturado como estado previo a autenticación | Baja académica | El par usa el inicio autenticado como captura funcional más cercana | Mantener resultado Bajo o añadir en el futuro una captura manual exacta, sin invalidar el cierre actual |
| RF-02 | GC-DYN-03 expone valores de cookies de sesión | Alta de seguridad | La evidencia está autorizada por identidad y resolución, pero algunos valores pueden funcionar como tokens privados reutilizables y el PDF final ya incorpora la imagen | Invalidar las sesiones asociadas; excluir la figura del material que se entregue o proyecte hasta preparar una copia segura autorizada |
| RF-03 | Registro público permite solicitar `TEACHER` | Alta técnica | Una cuenta anónima puede obtener capacidades docentes | Forzar `STUDENT` y usar invitación/aprobación para profesores |
| RF-04 | Modo estricto y alcance completo aún sin evidencia de redespliegue | Media operativa | El requisito académico está demostrado; no puede atribuirse el bloqueo de 22 archivos a la URL pública | Redesplegar y capturar log y endpoint del mismo commit |
| RF-05 | Release ofuscada demostrada localmente pero aún no acreditada en la URL pública | Media operativa | La técnica cumple académicamente; no puede atribuirse al deploy vigente sin correlación de commit | Redesplegar y conservar RND-02, RND-05, manifest y bundle |
| RF-06 | JWT en `localStorage` y sin revocación | Media técnica | Mayor impacto potencial de XSS y sesiones no revocables | Cookies HttpOnly/SameSite, expiración corta y revocación |
| RF-07 | Healthcheck sin commit o versión | Media de trazabilidad | No se correlaciona Render con la entrega final | Publicar identificador de build no sensible |
| RF-08 | 25 evidencias técnicas pendientes, además de exportaciones y trazabilidad final | Alta académica | API, seguridad, Render, GitHub y DB todavía no tienen todas las capturas | Completar el inventario 27 y calcular SHA-256 por archivo aprobado |
| RF-09 | Overflow de 32 px en login de tableta | Baja técnica | Reduce calidad responsive demostrable | Ajustar breakpoint y repetir captura de 768 × 1024 |
| RF-10 | Fuente de presentación completa, pero PDF y ejecución todavía no acreditados | Media académica | Riesgo operativo si falla la exportación, la red o Render | Exportar el documento 30, revisar las 16 páginas y preparar dos perfiles más entorno local |

## 21.7 Acciones finales antes de entregar

### Prioridad 0 — imprescindibles para cerrar la rúbrica

1. Invalidar las sesiones/cookies visibles en GC-DYN-03 y excluir esa figura de entrega o proyección hasta completar la revisión.
2. Calcular SHA-256 de las capturas originales autorizadas y asociarlo a su ficha de evidencia.
3. Exportar el comparativo cerrado del documento 26 a PDF.
4. Capturar checksum correcto/fallido, cifrado en base, ofuscación y rechazos 401/403.
5. Capturar Render, variables con valores ocultos, deploy exitoso, GitHub y esquema de base.

### Prioridad 1 — coherencia entre entrega y producción

6. Revisar `git status`, confirmar únicamente archivos aprobados, crear commit final, etiqueta y push.
7. Redesplegar ese commit y repetir health, integridad, smoke test y comprobaciones defensivas.
8. Añadir al healthcheck un identificador de versión o commit sin información sensible.
9. Verificar que Render ejecute `npm run render:build` y arranque con `STRICT_INTEGRITY=true`.
10. Confirmar que el bundle publicado y el alcance completo del endpoint corresponden al manifest generado por ese build.

### Prioridad 2 — seguridad y calidad

11. Restringir el alta de profesores mediante invitación o aprobación.
12. Planificar migración del JWT desde `localStorage` y añadir revocación.
13. Corregir el overflow del login en tableta y regenerar las capturas afectadas.
14. Añadir rotación/versionado de `APP_ENCRYPTION_KEY` y considerar AAD.

### Prioridad 3 — presentación

15. El reporte final ya fue exportado y revisado; exportar todavía el comparativo y `docs/30-presentacion-final-print.md` a PDF.
16. Ensayar el guion de 8–12 minutos con profesor y estudiante en perfiles separados.
17. Despertar Render 10–15 minutos antes y dejar local Docker preparado.
18. Verificar en modo incógnito que GitHub, Render y todos los enlaces sean accesibles.
19. Regenerar `docs/checksums.sha256` después del último cambio y conservar el commit final.

## 21.8 Veredicto general

**Veredicto: cumplimiento sustancial; aptitud presencial condicionada a resolver la evidencia GC-DYN-03.**

El proyecto demuestra competencia real en arquitectura, reconstrucción de dominio, desarrollo full-stack, seguridad defensiva y documentación. No se identificó un requisito completamente ausente. Tres requisitos se reconocen como Cumple documentalmente y dos permanecen como Parcial justificado; el comparativo UI, la ofuscación reproducible, la verificación previa a ejecución y la protección del cliente con limitación técnica documentada se encuentran cerrados académicamente.

Como profesor evaluador, considero el proyecto técnicamente sólido. No recomiendo entregar ni proyectar el PDF actual hasta invalidar las cookies que aparecen en GC-DYN-03 o generar una edición de entrega que omita esa figura sin alterar el original. Después deben completarse las 25 capturas técnicas, la exportación/ejecución de la presentación y la correlación del deploy con el commit final.

## 21.9 Plan de cierre final

El plan operativo y su checklist de aceptación se encuentran en [23. Cierre de brechas finales](23-cierre-brechas-finales.md). El orden de cierre es:

1. **Congelar el candidato técnico.** Ejecutar pruebas, `npm run render:build` y `npm run integrity:verify`; revisar que no haya secretos ni cambios accidentales.
2. **Redesplegar el mismo commit.** Confirmar en Render la release ofuscada, `STRICT_INTEGRITY=true` y el manifest de backend/frontend antes de atribuir esos controles a producción.
3. **Registrar evidencia propia.** Conservar las capturas manuales autorizadas de Classroom en resolución original y completar metadatos/métricas, sin automatizar la plataforma.
4. **Trazar.** Calcular SHA-256 de los originales autorizados de Classroom; para las demás categorías, aplicar la política de privacidad correspondiente.
5. **Cerrar evidencia técnica.** El comparativo UI está cerrado; completar las series API, SEC, RND y DB con datos propios o sintéticos.
6. **Exportar y ensayar.** Conservar el reporte final ya aprobado; generar el PDF de 16 diapositivas desde el documento 30, revisar todas sus páginas y ensayar la presentación de 8–12 minutos con el checklist y plan B del documento 12.
7. **Reauditar.** Cambiar un estado de **Parcial justificado** a **Cumple** solo cuando exista evidencia revisable del resultado, no por la sola existencia de una instrucción, carpeta o configuración.

Los puntos restantes que dependen de intervención humana permanecen identificados en el documento 23. El conteo oficial de esta reevaluación queda en **29 Cumple, 3 Cumple documentalmente, 2 Parcial justificado y 0 Falta**. La evidencia GC-DYN-03 se registra adicionalmente como **Requiere revisión** y condiciona la entrega presencial segura.
