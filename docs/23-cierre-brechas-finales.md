# 23. Cierre de brechas finales

## 23.1 Propósito y criterio de cierre

Este documento convierte los nueve requisitos originalmente parciales en acciones verificables. Después de la reevaluación del 16-08-2026, el estado vigente es **29 Cumple, 3 Cumple documentalmente, 2 Parcial justificado y 0 Falta**. Se distingue entre **corrección incorporada al repositorio**, **evidencia pendiente** y **cierre confirmado**. Una configuración local o versionada no demuestra por sí sola que Render ya la ejecute; una carpeta vacía tampoco constituye evidencia.

El reporte definitivo fue exportado como `evidence/final-pdf/II_GLOBAL_23110022_8C.docx` y `evidence/final-pdf/II_GLOBAL_23110022_8C.pdf`; sus 26 páginas fueron revisadas. La reevaluación detectó que el reporte incorpora `GC-DYN-03-application-storage.png`, donde se observan valores de cookies de sesión. Esa evidencia queda **Requiere revisión**: no se modifica ni elimina el original, pero el PDF no debe entregarse o proyectarse hasta invalidar las sesiones asociadas o generar una edición segura autorizada que omita esa figura.

El trabajo sobre Google Classroom se limita a observación manual, autorizada y de caja negra con una cuenta controlada. No se automatiza, no se eluden controles y no se afirma que la plataforma haya sido vulnerada. EduRoom conserva código, identidad visual, textos y recursos propios.

## 23.2 Matriz de cierre

| ID | Requisito parcial | Evidencia faltante | Acción de cierre | Archivo/carpeta donde debe quedar la evidencia | Estado esperado después del cierre |
|---|---|---|---|---|---|
| BF-01 | Evidencia real del análisis dinámico de Classroom | No falta recaptura; existe una revisión de seguridad pendiente sobre GC-DYN-03 | **CIERRE DOCUMENTAL.** GC-DYN-01..06 muestran Network, códigos, Application, service workers/cache, Performance y Memory. Se registraron fecha, navegador, flujo y valores legibles. GC-DYN-03 queda **Requiere revisión** por cookies visibles y no debe proyectarse mientras puedan ser reutilizables | `evidence/dynamic/google-classroom/GC-DYN-01..06`, `docs/04-analisis-dinamico.md`, `docs/25-medicion-performance-memory.md` | **Cumple documentalmente**; seguridad de GC-DYN-03 pendiente |
| BF-02 | Medición concreta de Performance/Memory | Ninguna métrica adicional obligatoria; una repetición controlada sería mejora, no requisito | **CERRADO DOCUMENTALMENTE.** GC-DYN-01 registra DCL 455 ms, Load 2.19 s, 64 solicitudes y 1,060 kB transferidos; GC-DYN-05 registra 20.62 s, INP 58 ms y CLS 0; GC-DYN-06 permite transcribir tamaños retenidos visibles. EduRoom conserva JSON reproducible | `evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png`, `GC-DYN-06-memory-summary.png`, `evidence/performance/eduroom/`, `docs/25-medicion-performance-memory.md` | **Cumple documentalmente**; muestra puntual, no benchmark |
| BF-03 | Capturas manuales y autorizadas de Classroom | Ninguna captura adicional requerida para acreditar los flujos observados | **CERRADO.** Existen nueve capturas UI y seis dinámicas manuales. El alumno autorizó conservarlas e incluirlas sin anonimización, censura o cambio de resolución | `evidence/ui/google-classroom/`, `evidence/dynamic/google-classroom/`; inventario en `docs/13-evidencias.md` | **Cumple**; queda pendiente únicamente completar metadatos/hashes para cadena de evidencia |
| BF-04 | Comparativo UI con pares visuales completos | Ninguna para el cierre documental flexible; login/creación/trabajo declaran la captura funcional más cercana | **CERRADO.** Los documentos 16/26 usan las referencias manuales en resolución original, una serie principal de 27 capturas responsivas de EduRoom y resultados Alta/Media/Baja/No aplicable sin comparación pixel a pixel. Otras 27 capturas EduRoom quedan clasificadas como complementarias | `docs/16-comparativo-ui.md`, `docs/26-comparativo-ui-print.md`, `evidence/ui/google-classroom/`, `evidence/ui/eduroom/` | **Cumple**; exportación a PDF permanece como acción de presentación |
| BF-05 | Evidencias visuales de API, seguridad, Render, GitHub y base de datos | Faltan físicamente 25 archivos: API-01..06, SEC-01..06, RND-01..05, GH-01..04 y DB-01..04; SEC-07 ya dispone de prueba documental equivalente | **[PENDIENTE DE CAPTURA MANUAL]** Las carpetas de captura solo contienen marcadores. Capturar respuestas y paneles propios después del despliegue final. Nombres, avatares, URL, IDs y datos de prueba propios/controlados están autorizados y no requieren censura; contraseñas, JWT completos, cookies, tokens privados, claves, cadenas de conexión y valores de variables no deben publicarse. GC-DYN-03 ya se clasifica **Requiere revisión** sin eliminar el original | `evidence/api/`, `evidence/security/`, `evidence/render/`, `evidence/github/`, `evidence/database/`; inventario en `docs/27-evidencias-tecnicas-finales.md` | **Parcial justificado** hasta que existan los 25 archivos o se justifique formalmente un No aplica; no depende de resolución o identidad propia visible |
| BF-06 | Checksum productivo: modo anterior no bloqueante y alcance backend | Falta solo acreditar mediante redespliegue que la URL pública usa el candidato estricto de 22 artefactos | **CERRADO ACADÉMICAMENTE.** Producción respondió HTTP 200, `verified`, 19 y cero discrepancias; local `strict=true` verificó 22/22 antes del puerto; `npm run integrity:demo` detectó una modificación exclusivamente temporal. `render.yaml` configura el modo estricto. **[PENDIENTE DE CAPTURA MANUAL]** Capturar el redespliegue para atribuir el bloqueo completo a producción | `docs/28-validacion-strict-integrity.md`, `tests/integrity-demo.js`, `backend/src/security/checksum.ts`, `backend/src/server.ts`; futuras `SEC-01`, `RND-02` y `RND-05` | **Cumple con demostración local estricta y verificación productiva no bloqueante**; acreditación operativa del nuevo deploy pendiente |
| BF-07 | Ofuscación fuera del pipeline anterior de Render | Falta únicamente acreditar que la URL pública fue redesplegada desde el commit final | **CERRADO DOCUMENTALMENTE / DEMOSTRADO LOCALMENTE.** `npm run render:build` instaló dependencias, compiló, ofuscó 1 JS, generó/verificó 22 artefactos y terminó con código 0; 12 pruebas y la sintaxis del bundle fueron aprobadas. `render.yaml` invoca ese comando. **[PENDIENTE DE CAPTURA MANUAL]** Redesplegar y capturar el log para atribuirlo a producción | `package.json`, `render.yaml`, `frontend/scripts/obfuscate-build.cjs`, `evidence/security/SEC-07-obfuscated-build-proof.txt`; producción: `evidence/render/RND-02-successful-deploy.png`, `RND-05-logs-startup.png` | **Cumple** como técnica demostrativa reproducible; despliegue público pendiente de acreditación operativa |
| BF-08 | Protección global del cliente, que continúa siendo observable | Ninguna evidencia adicional para el cierre conceptual; SEC-04/05 siguen siendo evidencia visual complementaria del control en servidor | **CERRADO DOCUMENTALMENTE.** La observabilidad de HTML, CSS y JavaScript se reconoce como propiedad inherente de la web. EduRoom mantiene JWT, roles, validación, secretos y decisiones críticas en servidor; ofuscación e integridad se presentan como dificultad y detección, no como invisibilidad. Capturar 401/403 en SEC-04/05 refuerza la trazabilidad, pero no condiciona el criterio técnico | `docs/29-limitaciones-proteccion-cliente-web.md`, `docs/07-seguridad-antireversing.md`, `docs/09-cifrado-ofuscacion.md`, `docs/20-validacion-seguridad-producto.md` | **Cumple con limitación técnica documentada** |
| BF-09 | Presentación preparada pero no ejecutada ni exportada | PDF final de 16 páginas, ensayo cronometrado y evidencia de ejecución | **MATERIAL CERRADO / EJECUCIÓN PENDIENTE.** `docs/30-presentacion-final-print.md` contiene 16 diapositivas, notas orales, rutas reales, tiempos, checklist, exportación y planes B. **[PENDIENTE DE EXPORTACIÓN MANUAL]** Generar y revisar el PDF. **[PENDIENTE DE EJECUCIÓN MANUAL]** Ensayar 8–12 minutos y registrar fecha/duración. GC-DYN-03 debe excluirse mientras esté en revisión | `docs/12-guion-presentacion.md`, `docs/19-presentacion-diapositivas.md`, `docs/30-presentacion-final-print.md`; PDF en `evidence/final-pdf/eduroom-presentacion-final.pdf`; registro en `docs/13-evidencias.md` | **Parcial justificado** hasta exportación, revisión, ensayo y constancia autorizada de la exposición; la preparación documental ya está completa |

## 23.3 Correcciones técnicas incorporadas

En la comprobación pública de solo lectura del 16-08-2026 (`America/Mexico_City`), `/`, `/api/health`, `/api/security/integrity` y el repositorio público respondieron HTTP 200. Integridad informó `verified`, `filesChecked=19` y cero discrepancias. Esto confirma disponibilidad y consistencia del backend observado, pero también confirma que la URL todavía expone el alcance anterior. No acredita aún la verificación de 22 artefactos ni el pipeline ofuscado candidato.

La configuración candidata de cierre aplica una única secuencia de release:

```text
build backend + build frontend ofuscado
→ generar integrity-manifest.json
→ verificar todos los scopes
→ arrancar con STRICT_INTEGRITY=true
```

Cambios verificables:

- `backend/src/security/checksum.ts` comprueba en arranque todos los archivos declarados dentro de los scopes del manifest, incluidos los artefactos estáticos del frontend.
- `backend/src/server.ts` realiza esa verificación antes de escuchar conexiones.
- `render.yaml` ejecuta `npm run render:build` y configura `STRICT_INTEGRITY=true`.
- `backend/Dockerfile` ofusca el frontend, genera el manifest desde los artefactos de las mismas etapas y copia ese manifest a la imagen final.
- `backend/tests/checksum.test.ts` incluye una prueba de detección sobre un artefacto del frontend.

Estos cambios describen el **candidato versionado**. Hasta completar un deploy posterior y conservar RND-03/SEC-01, no debe afirmarse que la URL pública ya ejecuta esta configuración.

## 23.4 Comandos reproducibles de cierre técnico

Desde la raíz del repositorio:

```powershell
npm ci --include=dev --prefix backend
npm ci --include=dev --prefix frontend
npm test
npm run render:build
npm run verify:integrity
```

Prueba opcional del contenedor candidato:

```powershell
docker build -f backend/Dockerfile -t eduroom:cierre .
docker run --rm --env-file backend/.env -e STRICT_INTEGRITY=true -p 3000:3000 eduroom:cierre
```

La segunda terminal puede consultar, sin autenticación ni carga repetitiva:

```powershell
Invoke-RestMethod https://eduroom-znb0.onrender.com/api/health
Invoke-RestMethod https://eduroom-znb0.onrender.com/api/security/integrity
```

Después de preparar la versión final de cada evidencia —original autorizado para Classroom y versión sanitizada cuando corresponda a otras categorías—:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath evidence/security/SEC-01-integrity-verified.png
```

No se debe regenerar el manifest para ocultar un fallo inesperado. Primero se investiga la diferencia; solo se regenera después de aprobar el cambio. Tampoco se ejecutan scripts contra Google Classroom.

## 23.5 Criterios de privacidad antes de aceptar una captura

El alumno autoriza el uso académico sin anonimización adicional de capturas propias procedentes de cuentas personales/controladas. Nombres, avatares, URL, identificadores, códigos y datos de prueba propios no invalidan la evidencia, sin importar su resolución. Esta autorización incluye las capturas existentes de Classroom, cuyo hash debe calcularse sobre el original conservado.

La autorización no comprende contraseñas, JWT completos, cookies, encabezados `Authorization`, tokens privados, claves, valores completos de variables o cadenas de conexión. Si un archivo contiene un secreto real reutilizable, debe marcarse **Requiere revisión**, conservarse sin borrado automático y excluirse de la presentación hasta preparar una copia segura.

## Checklist para declarar el proyecto cerrado al 100 %

- [x] GC-01 a GC-09 y GC-DYN-01 a GC-DYN-06 existen y fueron obtenidas manualmente con autorización.
- [x] GC-DYN-01/02 registran Network y códigos observados desde la cuenta controlada.
- [x] GC-DYN-03/04 documentan Application, almacenamiento y service workers/cache.
- [x] GC-DYN-05/06 fueron transcritas al documento 25 con fecha, duración, flujo y métricas agregadas visibles, sin inventar valores.
- [ ] `docs/04-analisis-dinamico.md` contiene resultados observados y separa hechos de inferencias.
- [x] El comparativo flexible usa capturas funcionales equivalentes y EduRoom no copia identidad visual, logos, recursos o textos propietarios.
- [ ] API-01..06, SEC-01..07, RND-01..05, GH-01..04 y DB-01..04 existen o cada ausencia tiene una justificación académica aceptada.
- [ ] Todas las evidencias tienen ficha y SHA-256; Classroom conserva los originales autorizados y las demás categorías aplican su política de privacidad.
- [ ] `npm test` finaliza sin fallos.
- [x] `npm run render:build` finaliza y reporta instalación, ofuscación, manifest 22/22 y código 0.
- [ ] El despliegue final está asociado a un commit/etiqueta identificable y RND-02 muestra éxito sin secretos.
- [x] La detección previa al arranque funciona: producción reporta `verified` sin bloqueo y local estricto verifica 22/22 y detecta alteración temporal.
- [ ] El redespliegue final demuestra `STRICT_INTEGRITY=true` con conteo completo en la URL pública.
- [x] SEC-07 acredita mediante documentación equivalente la release ofuscada sin describirla como cifrado ni como protección absoluta.
- [ ] SEC-04 y SEC-05 muestran que el servidor rechaza token inválido y rol insuficiente, con valores sensibles ocultos.
- [x] La documentación declara que el cliente web continúa siendo observable y que no contiene secretos ni decisiones de autorización.
- [x] `docs/30-presentacion-final-print.md` contiene las 16 diapositivas, notas orales, evidencias reales, tiempos, checklist, plan B e instrucciones de exportación.
- [x] `docs/31-reporte-final-pdf-ready.md` contiene portada, índice, tablas de síntesis, referencias 21-30 y 69 figuras existentes con pie y clasificación.
- [x] El reporte final fue exportado como `evidence/final-pdf/II_GLOBAL_23110022_8C.docx` y `evidence/final-pdf/II_GLOBAL_23110022_8C.pdf`, y sus 26 páginas fueron revisadas visualmente.
- [ ] El reporte fue exportado y revisado; el comparativo y la presentación todavía deben exportarse y revisarse página por página.
- [ ] La presentación fue ensayada en 8–12 minutos y cuenta con plan B local; su ejecución real fue confirmada por una persona autorizada.
- [x] `docs/checksums.sha256` se regeneró después del último cambio documental aprobado; la correlación con el commit final se confirma al versionar la entrega.
- [ ] Resolver `GC-DYN-03-application-storage.png`: contiene cookies visibles y se clasifica Requiere revisión aunque la cuenta sea propia/controlada.
- [ ] `git status` no contiene secretos reutilizables ni cambios accidentales; las capturas propias/controladas visibles cuentan con autorización documentada.
- [ ] El evaluador revisó todas las condiciones anteriores; solo entonces se reemplazan los estados “Parcial” por “Cumple”.

Mientras exista una casilla sin validar, el veredicto correcto sigue siendo **cierre en proceso**, no “100 % cerrado”. La condición prioritaria es controlar el riesgo de GC-DYN-03 antes de entregar o proyectar el reporte que la contiene.
