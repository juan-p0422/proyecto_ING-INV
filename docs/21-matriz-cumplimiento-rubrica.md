# 21. Matriz final de cumplimiento de la rúbrica

## 21.1 Datos de la evaluación

| Campo | Valor |
|---|---|
| Proyecto | EduRoom |
| Objeto externo | Google Classroom, aplicación no open source observada mediante caja negra |
| Repositorio | [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV) |
| Deploy | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |
| Fecha | 15-08-2026, `America/Mexico_City` |
| Rol evaluador | Profesor evaluador y auditor final de cumplimiento |
| Método | Revisión documental, inspección de código/configuración, pruebas locales y comprobación pública no destructiva |

## 21.2 Escala de evaluación

| Estado | Criterio |
|---|---|
| **Cumple** | Existe implementación o documentación suficiente, coherente y verificable para el requisito |
| **Parcial** | Existe trabajo relevante, pero falta evidencia, alcance productivo o cierre de una condición |
| **Falta** | No se encontró implementación ni evidencia suficiente |

Un estado “Cumple” no implica ausencia de limitaciones. “Parcial” tampoco significa que el componente no exista: señala exactamente qué falta para demostrarlo frente al profesor.

## 21.3 Comprobaciones realizadas

- `node scripts/verify-integrity.js`: **22 archivos coinciden con el manifest**.
- `npm test`: **9 pruebas de backend y 2 de frontend aprobadas**.
- Aplicación pública: HTTP 200.
- `GET /api/health`: `status=ok`, ambiente `production`.
- `GET /api/security/integrity`: `verified`, 19 archivos del backend y 0 discrepancias.
- Repositorio de GitHub: accesible públicamente mediante HTTP 200.
- Evidencia UI: 27 capturas registradas por Playwright, con una advertencia responsive documentada.

La API pública no identifica el commit desplegado. Por ello estas comprobaciones acreditan el estado observado, pero no demuestran por sí solas que Render corresponda al último cambio local.

## 21.4 Matriz de cumplimiento

| Requisito del profesor | Evidencia en el proyecto | Archivo o URL | Estado | Observaciones | Recomendación |
|---|---|---|---|---|---|
| Marco teórico | Define ingeniería inversa, caja negra, OSINT, análisis dinámico, checksum, cifrado, ofuscación y límites éticos | [Marco teórico](01-marco-teorico.md) | **Cumple** | La terminología separa observación, inferencia e implementación | Mantener referencias y fecha de consulta en la versión PDF |
| Información pública de Google Classroom | Contexto, funciones, usuarios, integraciones y fuentes oficiales | [Análisis de Classroom](02-analisis-google-classroom.md) | **Cumple** | No afirma acceso a código ni infraestructura privada | Adjuntar capturas propias y anonimizadas para reforzar la defensa |
| Aplicación no open source como objetivo | Google Classroom se identifica como software propietario observado externamente | [Alcance](01-marco-teorico.md), [reporte integrado](17-reporte-final-integrado.md) | **Cumple** | El enfoque es compatible con una práctica ética de caja negra | Repetir la declaración de alcance al iniciar la exposición |
| Herramientas utilizadas | DevTools, Git, Node.js, Prisma, Docker, Postman, Playwright y utilidades de checksum documentadas | [Herramientas](03-herramientas-utilizadas.md) | **Cumple** | Se explica propósito, salida y precauciones | Añadir versiones exactas a la evidencia final |
| Alcance ético y legal | Excluye bypass, explotación, carga, scraping y recopilación de terceros | [Marco teórico](01-marco-teorico.md), [análisis dinámico](04-analisis-dinamico.md) | **Cumple** | EduRoom mantiene identidad y código independientes | Conservar solo capturas autorizadas y censuradas |
| Ingeniería inversa exhaustiva | Existe análisis funcional, modelo, tecnología inferida y metodología dinámica | [Análisis](02-analisis-google-classroom.md), [dinámico](04-analisis-dinamico.md), [modelo](05-reconstruccion-estructuras.md) | **Parcial** | La cobertura documental es amplia, pero faltan capturas y resultados dinámicos reales de Classroom | Completar GC-01 a GC-10, especialmente Network, Application y Performance/Memory |
| Análisis dinámico | Protocolo seguro para flujos, Network, Application, Performance y Memory | [Análisis dinámico](04-analisis-dinamico.md) | **Parcial** | Predomina el procedimiento; varias tablas y espacios de evidencia siguen sin resultados obtenidos | Ejecutar una sesión manual autorizada y registrar fecha, flujo, métricas agregadas y capturas |
| Análisis de vulnerabilidades | OWASP Top 10, matriz de riesgos y 14/14 comprobaciones defensivas | [Análisis de vulnerabilidades](15-analisis-vulnerabilidades.md), [script](../tests/render-security-check.js) | **Cumple** | Se documentan riesgos abiertos y no se realizaron ataques ofensivos | Priorizar el alta docente pública y la gestión del JWT |
| Reconstrucción de estructuras de datos | Entidades, atributos, relaciones y estados conceptuales | [Reconstrucción](05-reconstruccion-estructuras.md), [Prisma](../backend/prisma/schema.prisma) | **Cumple** | Se declara que el modelo es propio y no el esquema interno de Google | Añadir una captura final del diagrama ER como DB-01 |
| Identificación de tecnologías | Distingue tecnologías públicas, inferidas y stack propio | [Classroom](02-analisis-google-classroom.md), [diseño de EduRoom](06-diseno-replica.md) | **Cumple** | No convierte inferencias sobre Google en hechos confirmados | Mantener etiquetas “inferido” y “confirmado” en diapositivas |
| Entradas y salidas | Documenta credenciales, códigos, textos, archivos, tareas, estados y respuestas visibles | [Análisis de Classroom](02-analisis-google-classroom.md), [API](14-pruebas-api-render.md) | **Cumple** | Incluye perspectiva funcional y contratos propios de API | Mostrar un ejemplo sanitizado de entrada/salida en la exposición |
| Uso de memoria | Explica Performance, heap, DOM, listeners, línea base y límites | [Análisis dinámico](04-analisis-dinamico.md), [reporte final](17-reporte-final-integrado.md) | **Parcial** | El propio reporte reconoce que la evidencia manual está pendiente; no hay medición concreta | Capturar GC-10 con memoria aproximada antes/después y condiciones del equipo, sin heap dump |
| Réplica funcional | SPA y API desplegadas; 26/26 solicitudes aprobadas y 27 capturas automatizadas | [EduRoom](https://eduroom-znb0.onrender.com), [pruebas API](14-pruebas-api-render.md), [capturas](18-capturas-eduroom-render.md) | **Cumple** | La funcionalidad central se encuentra operativa | Repetir un smoke test final después del último despliegue |
| Roles de profesor y estudiante | Registro/login, autorización global y membresía por curso | [Rutas de autenticación](../backend/src/routes/auth.ts), [pruebas API](14-pruebas-api-render.md) | **Cumple** | Las pruebas negativas devolvieron 403 en operaciones reservadas | Impedir que el registro público seleccione `TEACHER` sin invitación |
| Cursos | Crear, listar, consultar, unirse y obtener miembros | [Rutas de cursos](../backend/src/routes/courses.ts), [colección Postman](../tests/eduroom-render.postman_collection.json) | **Cumple** | Flujo probado en Render | Añadir expiración o rotación de códigos de ingreso |
| Tareas | Crear, listar y consultar detalle por curso | [Rutas de tareas](../backend/src/routes/assignments.ts), [pruebas API](14-pruebas-api-render.md) | **Cumple** | Creación restringida al profesor propietario | Capturar ER-07 mostrando la confirmación de creación |
| Entregas | Envío del estudiante y estado persistido | [Assignments](../backend/src/routes/assignments.ts), [captura de entrega](../evidence/ui/eduroom/assignment-submission-1280x720.png) | **Cumple** | La prueba obtuvo `SUBMITTED` | Añadir política de reentrega o cierre si la rúbrica lo exige |
| Comentarios | Crear y consultar comentarios de curso o tarea | [Rutas de comentarios](../backend/src/routes/comments.ts), [pruebas API](14-pruebas-api-render.md) | **Cumple** | Endpoint probado por integrante autorizado | Capturar ER-10 con contenido sintético |
| Calificaciones | Profesor califica 0–100 con feedback y estado `GRADED` | [Rutas de entregas](../backend/src/routes/submissions.ts), [captura](../evidence/ui/eduroom/assignment-graded-1280x720.png) | **Cumple** | Nota 95 persistida en la prueba de Render | Mostrar el resultado desde ambos roles en la demo |
| Protección del proyecto propio | Combina autorización, cifrado, checksum, ofuscación y diagnóstico antidebug | [Seguridad](07-seguridad-antireversing.md), [validación](20-validacion-seguridad-producto.md) | **Parcial** | Son controles educativos; el frontend sigue siendo observable, Render no usa build ofuscado y la integridad no es estricta | Integrar release educativa en CI, firmar manifest y mantener secretos solo en servidor |
| Proceso de checksum | Generador, manifest, verificador, prueba correcta y prueba controlada fallida | [Checksum](08-checksum.md), [generador](../scripts/generate-checksum.js), [verificador](../scripts/verify-integrity.js) | **Cumple** | La auditoría final obtuvo 22/22 | Conservar log SEC-01 y prueba temporal SEC-02 |
| Checksum antes de ejecutarse | `server.ts` verifica antes de abrir el puerto | [Servidor](../backend/src/server.ts), [módulo](../backend/src/security/checksum.ts), [Render](../render.yaml) | **Parcial** | En Render `STRICT_INTEGRITY=false`; runtime verifica 19 JS del backend y no el frontend | Probar recuperación, activar modo estricto y ampliar o trasladar la verificación del frontend |
| Proceso de cifrado y ofuscación | Algoritmos, claves, IV, tag, payload, herramienta, comandos y límites documentados | [Cifrado y ofuscación](09-cifrado-ofuscacion.md), [validación](20-validacion-seguridad-producto.md) | **Cumple** | Se diferencia correctamente cifrado, hash, Base64 y ofuscación | Adjuntar SEC-03 y SEC-04 sin exponer claves |
| Cifrado | AES-256-GCM se usa antes de persistir `SecureNote`; 4/4 pruebas específicas aprobadas | [Crypto](../backend/src/security/crypto.ts), [ruta](../backend/src/routes/security.ts), [pruebas](../backend/tests/crypto.test.ts) | **Cumple** | IV aleatorio, tag autenticado y ciphertext Base64; falta rotación de clave | Versionar claves, considerar AAD y aislar notas corruptas |
| Cifrado de código fuente u ofuscación | `javascript-obfuscator` transforma el JavaScript compilado; build local verificado | [Ofuscador](../frontend/scripts/obfuscate-build.cjs), [package](../frontend/package.json) | **Parcial** | La técnica existe, pero `render.yaml` y Docker usan el build normal; no se acredita en producción | Cambiar el pipeline a release ofuscada, redesplegar y capturar el bundle/manifest |
| Técnicas antireversing | Diagnóstico de variables de instrumentación, advertencias y estado visual | [Antidebug](../backend/src/security/antiDebug.ts), [seguridad](07-seguridad-antireversing.md) | **Cumple** | Es deliberadamente no destructivo, no bloqueante y fácil de evadir | Demostrar una advertencia en copia local y explicar sus límites |
| Docker | Dockerfile multietapa, Compose, PostgreSQL, healthcheck y seed | [Docker Compose](../docker-compose.yml), [Dockerfile](../backend/Dockerfile), [despliegue](10-despliegue-render.md) | **Cumple** | Configuración reproducible disponible; la evidencia visual de Docker está pendiente | Ejecutar una vez desde limpio y capturar servicios saludables |
| GitHub | Repositorio público, código, documentación, pruebas y configuración | [Repositorio](https://github.com/juan-p0422/proyecto_ING-INV) | **Cumple** | La URL respondió HTTP 200 durante la auditoría | Confirmar que todos los cambios locales estén committeados, etiquetados y enviados |
| Render | Aplicación pública, healthcheck y PostgreSQL configurado | [Deploy](https://eduroom-znb0.onrender.com), [health](https://eduroom-znb0.onrender.com/api/health), [configuración](../render.yaml) | **Cumple** | HTTP 200 y producción saludable; no se expone versión/commit | Redesplegar el commit final y añadir versión no sensible al healthcheck |
| Pruebas de API y producto | Smoke test, Postman, seguridad defensiva, unitarias y visuales | [API](14-pruebas-api-render.md), [OWASP](15-analisis-vulnerabilidades.md), [UI](18-capturas-eduroom-render.md) | **Cumple** | 26/26 API, 14/14 defensivas y 11 unitarias en la auditoría final | Guardar capturas API-01 a API-06 y resumen PRE-02 |
| Evidencias visuales | Existen capturas de EduRoom y estructura de evidencias | [Checklist](13-evidencias.md), [evidencia](../evidence/README.md) | **Parcial** | 5 evidencias marcadas disponibles, 4 parciales y 37 pendientes; no hay evidencia propia de Classroom | Completar primero GC-01 a GC-10, SEC, Render, GitHub y base de datos |
| Comparativo UI | Documento, versión para PDF y espacios de pares visuales | [Comparativo](16-comparativo-ui.md), [versión PDF](pdf/comparativo-ui-print.md) | **Parcial** | EduRoom tiene capturas; faltan las capturas manuales y autorizadas de Classroom | Incorporar pares equivalentes y anonimizar antes de exportar |
| Presentación presencial | Guion de 10:20, 15 diapositivas, demo y planes B | [Guion](12-guion-presentacion.md), [diapositivas](19-presentacion-diapositivas.md) | **Parcial** | La preparación existe, pero el repositorio no puede acreditar que la exposición ya se realizó; faltan archivos PRE | Exportar a PDF, ensayar con cronómetro y preparar entorno local sin internet |
| Reporte final integrado | Portada, metodología, análisis, réplica, seguridad, pruebas, límites y conclusiones | [Reporte final](17-reporte-final-integrado.md) | **Cumple** | Integra 21 secciones y referencias cruzadas | Exportar a PDF después de completar evidencias y actualizar resultados finales |

## 21.5 Resumen ejecutivo

EduRoom satisface la mayor parte de la consigna en implementación, documentación y pruebas. La réplica está operativa, el repositorio es público, Render responde, los flujos de profesor y estudiante funcionan y la API fue probada de extremo a extremo. El modelo de datos, OWASP, AES-256-GCM, checksum, ofuscación y antireversing cuentan con código y explicación técnica.

La principal debilidad no está en el núcleo funcional, sino en la **evidencia académica de la observación externa**. El análisis dinámico y de memoria está desarrollado como protocolo, pero faltan resultados manuales y capturas de Classroom. El comparativo visual tampoco puede cerrarse sin esas imágenes autorizadas.

En protección existen dos reservas técnicas: Render mantiene `STRICT_INTEGRITY=false` y el verificador de arranque cubre solo el backend; además, el pipeline productivo ejecuta el build normal y no acredita la ofuscación del frontend desplegado.

### Conteo sin ponderación

| Estado | Requisitos |
|---|---:|
| Cumple | 25 |
| Parcial | 9 |
| Falta | 0 |
| Total evaluado | 34 |

Este conteo no equivale a una calificación numérica porque la consigna no asigna pesos. Un requisito parcial relacionado con evidencia puede tener más impacto académico que varios requisitos funcionales completos.

## 21.6 Riesgos pendientes

| ID | Riesgo | Severidad | Efecto académico o técnico | Tratamiento |
|---|---|---|---|---|
| RF-01 | Sin capturas propias de Classroom | Alta académica | Debilita la demostración del objetivo externo y el comparativo | Completar GC-01 a GC-10 con cuenta controlada |
| RF-02 | Sin medición real de Performance/Memory | Alta académica | El requisito de uso de memoria queda en nivel procedimental | Registrar línea base, interacción y métrica agregada |
| RF-03 | Registro público permite solicitar `TEACHER` | Alta técnica | Una cuenta anónima puede obtener capacidades docentes | Forzar `STUDENT` y usar invitación/aprobación para profesores |
| RF-04 | `STRICT_INTEGRITY=false` y frontend fuera del runtime | Media | Una discrepancia puede no impedir el arranque ni aparecer en el endpoint | Pipeline reproducible, verificación completa y modo estricto |
| RF-05 | Ofuscación no activada en Render | Media académica | No puede demostrarse protección del bundle productivo | Publicar release ofuscada con evidencia del manifest |
| RF-06 | JWT en `localStorage` y sin revocación | Media técnica | Mayor impacto potencial de XSS y sesiones no revocables | Cookies HttpOnly/SameSite, expiración corta y revocación |
| RF-07 | Healthcheck sin commit o versión | Media de trazabilidad | No se correlaciona Render con la entrega final | Publicar identificador de build no sensible |
| RF-08 | 37 evidencias pendientes | Alta académica | La entrega visual no respalda todo lo afirmado | Priorizar checklist y calcular SHA-256 por archivo |
| RF-09 | Overflow de 32 px en login de tableta | Baja técnica | Reduce calidad responsive demostrable | Ajustar breakpoint y repetir captura de 768 × 1024 |
| RF-10 | Presentación todavía no exportada ni evidenciada | Media académica | Riesgo operativo si falla Markdown, red o Render | Generar PDF y preparar dos perfiles más entorno local |

## 21.7 Acciones finales antes de entregar

### Prioridad 0 — imprescindibles para cerrar la rúbrica

1. Obtener y anonimizar GC-01 a GC-10, incluyendo Network, Application y Performance/Memory.
2. Registrar una medición dinámica real con fecha, equipo, flujo, línea base y resultado agregado.
3. Completar los pares del comparativo UI y exportar su versión PDF.
4. Capturar checksum correcto/fallido, cifrado en base, ofuscación y rechazos 401/403.
5. Capturar Render, variables con valores ocultos, deploy exitoso, GitHub y esquema de base.

### Prioridad 1 — coherencia entre entrega y producción

6. Revisar `git status`, confirmar únicamente archivos aprobados, crear commit final, etiqueta y push.
7. Redesplegar ese commit y repetir health, integridad, smoke test y comprobaciones defensivas.
8. Añadir al healthcheck un identificador de versión o commit sin información sensible.
9. Integrar `npm run release:educational` en CI; probar y decidir activación de `STRICT_INTEGRITY=true`.
10. Confirmar que el bundle publicado corresponde al build ofuscado antes de declararlo en la exposición.

### Prioridad 2 — seguridad y calidad

11. Restringir el alta de profesores mediante invitación o aprobación.
12. Planificar migración del JWT desde `localStorage` y añadir revocación.
13. Corregir el overflow del login en tableta y regenerar las capturas afectadas.
14. Añadir rotación/versionado de `APP_ENCRYPTION_KEY` y considerar AAD.

### Prioridad 3 — presentación

15. Exportar el reporte, comparativo y diapositivas a PDF.
16. Ensayar el guion de 8–12 minutos con profesor y estudiante en perfiles separados.
17. Despertar Render 10–15 minutos antes y dejar local Docker preparado.
18. Verificar en modo incógnito que GitHub, Render y todos los enlaces sean accesibles.
19. Regenerar `docs/checksums.sha256` después del último cambio y conservar el commit final.

## 21.8 Veredicto general

**Veredicto: cumplimiento sustancial, apto para demostración presencial con reservas.**

El proyecto demuestra competencia real en arquitectura, reconstrucción de dominio, desarrollo full-stack, seguridad defensiva y documentación. No se identificó un requisito completamente ausente. Sin embargo, nueve requisitos permanecen parciales y varios corresponden directamente al núcleo académico de ingeniería inversa: análisis dinámico real, memoria y evidencia visual del objetivo externo.

Como profesor evaluador, consideraría el proyecto técnicamente sólido y bien preparado, pero no recomendaría declararlo “cerrado al 100 %” hasta completar la evidencia manual, alinear el pipeline de protección con Render y demostrar la presentación desde el commit final. Con esas acciones, la entrega quedaría en condiciones de aspirar a la máxima valoración disponible bajo la rúbrica.
