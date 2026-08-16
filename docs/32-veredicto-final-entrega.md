# 32. Veredicto final de entrega

## 32.1 Identificación y alcance

| Campo | Resultado |
|---|---|
| Proyecto | EduRoom |
| Alumno | Juan Oswaldo Emilio Olivares Pantoja |
| Registro y grupo | 23110022, 8C |
| Repositorio | <https://github.com/juan-p0422/proyecto_ING-INV> |
| Deploy | <https://eduroom-znb0.onrender.com> |
| Fecha de reevaluación | 16-08-2026, `America/Mexico_City` |
| Método | Revisión documental, inventario físico, inspección visual de evidencias y comprobación pública no destructiva |

La reevaluación acepta como evidencia válida las capturas manuales obtenidas desde cuentas personales/controladas por el alumno. No se penalizan nombres, avatares, URL, identificadores, códigos propios ni resoluciones distintas de los viewports objetivo. Una captura funcionalmente equivalente es suficiente cuando el flujo está documentado y no se afirma equivalencia pixel a pixel.

## 32.2 Estado final

**Veredicto académico: cumplimiento sustancial con aptitud presencial condicionada.**

| Estado | Cantidad |
|---|---:|
| Cumple | 29 |
| Cumple documentalmente | 3 |
| Parcial justificado | 2 |
| Falta | 0 |
| Total | 34 |

Los tres cierres documentales corresponden a ingeniería inversa exhaustiva, análisis dinámico y uso de memoria. Existen nueve capturas UI y seis dinámicas manuales de Classroom; Performance/Memory cuentan con valores visibles transcritos y EduRoom conserva una medición reproducible. Los dos parciales justificados son la serie de evidencias técnicas ausentes y la presentación todavía no exportada/ejecutada.

No se identificó un requisito completamente ausente. El proyecto no se declara cerrado al 100 % porque siguen faltando 25 capturas técnicas, la presentación PDF/ensayo y la correlación del deploy final con el commit candidato.

## 32.3 Comprobaciones verificadas

- `evidence/ui/google-classroom/`: 9 PNG, todos de 1919 × 1079.
- `evidence/dynamic/google-classroom/`: 6 PNG, todos de 1919 × 1079.
- `evidence/ui/eduroom/`: 54 PNG; 18 de 1280 × 720, 18 de 768 × 1024 y 18 de 390 × 844.
- `evidence/api/`, `evidence/render/`, `evidence/database/` y `evidence/github/`: 0 imágenes; solo marcadores `.gitkeep`.
- `evidence/security/`: prueba textual `SEC-07-obfuscated-build-proof.txt`; 0 PNG.
- Reporte final: `II_GLOBAL_23110022_8C.pdf`, 26 páginas, y su versión DOCX.
- El 16-08-2026, `/`, `/api/health`, `/api/security/integrity` y GitHub respondieron HTTP 200.
- `/api/security/integrity` respondió `verified`, `filesChecked=19` y `modifiedFilesCount=0`; esto no acredita todavía el candidato local de 22 artefactos.

## 32.4 Revisión de secretos reutilizables

### Evidencia que requiere revisión

`evidence/dynamic/google-classroom/GC-DYN-03-application-storage.png` muestra valores de cookies de sesión en DevTools; algunos aparecen sin truncamiento visible. Una cookie autenticada puede funcionar como token privado reutilizable. Por ello:

1. el original se conserva sin censura, modificación o borrado automático;
2. la identidad, URL y resolución continúan aceptadas y no son la causa del riesgo;
3. la evidencia se marca **Requiere revisión**;
4. no debe entregarse ni proyectarse mientras esas sesiones puedan seguir vigentes;
5. el alumno debe cerrar/inutilizar las sesiones asociadas o generar una edición de entrega autorizada que omita esa figura;
6. no se reproducen los valores de las cookies en este documento.

El PDF actual incluye esa figura, por lo que también queda condicionado a la misma revisión. No se detectaron JWT completos, contraseñas, claves API, cadenas de conexión o variables sensibles completas en el texto extraído del DOCX/PDF. La conclusión se limita a los archivos revisados y no garantiza el contenido de futuras capturas.

## 32.5 Riesgos restantes

| ID | Riesgo | Nivel | Condición de cierre |
|---|---|---|---|
| RV-01 | Cookies visibles en GC-DYN-03 y en el PDF que la incorpora | Alto | Invalidar sesiones y excluir la figura de la versión que se entregue/proyecte, o acreditar que dejó de ser reutilizable |
| RV-02 | 25 capturas técnicas ausentes: 6 API, 6 seguridad, 5 Render, 4 base de datos y 4 GitHub | Alto académico | Crear los archivos o justificar formalmente un No aplica |
| RV-03 | Presentación de 16 diapositivas sin PDF revisado, ensayo ni constancia de ejecución | Medio académico | Exportar, revisar, ensayar 8–12 minutos y registrar fecha/duración |
| RV-04 | Deploy público aún informa 19 archivos y no identifica commit | Medio operativo | Redesplegar el commit final y conservar logs/endpoint del mismo artefacto |
| RV-05 | Registro público permite solicitar rol docente | Alto técnico | Restringir `TEACHER` por invitación o aprobación antes de uso real |
| RV-06 | JWT del cliente en `localStorage`, sin revocación | Medio técnico | Migrar a cookie HttpOnly/SameSite o añadir revocación y expiración corta |

## 32.6 Recomendación para la presentación

Antes de presentarse:

1. resolver RV-01 y regenerar la versión de entrega sin incrustar GC-DYN-03 mientras sea sensible;
2. exportar `docs/30-presentacion-final-print.md` a PDF y revisar sus 16 páginas;
3. ensayar el recorrido en 8–12 minutos con dos perfiles controlados;
4. abrir Render 10–15 minutos antes y mantener plan B local;
5. mostrar primero el alcance ético: observación manual de caja negra, sin automatización ni afirmación de vulneración de Google Classroom;
6. explicar Performance/Memory como muestras puntuales del cliente, no como benchmark de infraestructura;
7. explicar que la ofuscación dificulta lectura, pero no vuelve invisible el frontend;
8. tener preparados `npm test`, `npm run integrity:demo` y la respuesta pública de integridad.

## 32.7 Archivos PDF a entregar

### Obligatorio

| Archivo exacto | Estado |
|---|---|
| `evidence/final-pdf/II_GLOBAL_23110022_8C.pdf` | Existe y fue revisado; **no liberar todavía** porque incorpora GC-DYN-03. Regenerar una edición segura o invalidar de forma verificable las sesiones antes de entregarlo |

### Material complementario

| Archivo exacto | Estado |
|---|---|
| `evidence/final-pdf/eduroom-presentacion-final.pdf` | No existe; pendiente de exportación y revisión |

No existe un PDF separado del comparativo. `docs/26-comparativo-ui-print.md` está preparado como fuente y puede exportarse solo si el profesor solicita un anexo; su versión de entrega no debe incrustar GC-DYN-03 mientras esté en revisión.

## 32.8 Código fuente a entregar

Entregar una copia del directorio raíz `proyecto_ING-INV/` con:

- `frontend/` — código fuente, configuración y script de ofuscación; excluir `node_modules/` y `dist/` regenerable;
- `backend/` — código fuente, Prisma, pruebas y Dockerfile; excluir `node_modules/`, `build/` regenerable y cualquier `.env`;
- `scripts/` y `tests/` — checksum, integridad, rendimiento y pruebas reproducibles;
- `docs/` — memoria académica 00–32 y manifiesto documental;
- `evidence/` — solo evidencia aprobada para entrega; conservar GC-DYN-03 en resguardo y excluirla del paquete público mientras esté en revisión;
- `README.md`, `package.json`, `render.yaml`, `docker-compose.yml`, `.env.example`, `integrity-manifest.json` y archivos de lock correspondientes.

No entregar `.env`, contraseñas, JWT, cookies, claves, cadenas de conexión, `node_modules/`, artefactos temporales de `tmp/` ni cachés locales. El historial `.git/` puede omitirse del archivo comprimido; el repositorio público conserva la trazabilidad remota.

## 32.9 Nota de autorización de evidencias sin censura

> Las capturas de Google Classroom y otras plataformas corresponden a cuentas personales/controladas por el alumno. El alumno autorizó su inclusión sin anonimización adicional. Se usan exclusivamente como evidencia académica de flujos, pruebas y despliegue. Nombres, avatares, URL, identificadores, códigos propios y resolución original no invalidan la evidencia. Esta autorización no comprende secretos reutilizables completos; cualquier JWT, contraseña, clave API, variable sensible, cookie de sesión o token privado visible se clasifica Requiere revisión.

## 32.10 Confirmación de aptitud presencial

El proyecto es **académicamente apto en contenido y técnicamente demostrable**, con 0 requisitos en Falta. No obstante, la entrega presencial se considera **condicionada** por RV-01. Una vez invalidada la sesión expuesta o generada una edición segura que no incluya GC-DYN-03, el proyecto puede declararse **apto para entrega presencial con reservas menores**, aunque continúen como Parcial justificado las capturas técnicas y la constancia de ejecución de la presentación.

