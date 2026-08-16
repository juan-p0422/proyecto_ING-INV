# Memoria técnica de EduRoom

## Propósito

Esta memoria registra un ejercicio académico de ingeniería inversa ética de caja negra y la construcción de EduRoom. El objeto observado es Google Classroom, pero el producto resultante es independiente: usa identidad, interfaz, código y modelo de datos propios.

**Recursos verificables del proyecto:** [aplicación pública en Render](https://eduroom-znb0.onrender.com) · [repositorio de EduRoom](https://github.com/juan-p0422/proyecto_ING-INV). La disponibilidad del repositorio depende de su visibilidad y de los permisos de la cuenta visitante.

## Índice documental

| Documento | Contenido | Estado revisado |
|---|---|---|
| [01](01-marco-teorico.md) | Fundamentos y límites éticos | Completo |
| [02](02-analisis-google-classroom.md) | Análisis funcional observable | Completo |
| [03](03-herramientas-utilizadas.md) | Instrumentos y trazabilidad | Completo |
| [04](04-analisis-dinamico.md) | Protocolo de pruebas dinámicas | Completo |
| [05](05-reconstruccion-estructuras.md) | Inferencias de dominio | Completo |
| [06](06-diseno-replica.md) | Arquitectura de EduRoom | Implementado v0.1 |
| [07](07-seguridad-antireversing.md) | Seguridad y resistencia al abuso | Implementado y documentado |
| [08](08-checksum.md) | Integridad mediante SHA-256 | Implementado y documentado |
| [09](09-cifrado-ofuscacion.md) | AES-GCM, hash y ofuscación | Implementado y documentado |
| [10](10-despliegue-render.md) | Docker y despliegue en Render | Configuración lista |
| [11](11-conclusiones.md) | Cumplimiento, limitaciones y trabajo futuro | Completo |
| [12](12-guion-presentacion.md) | Guion para exposición y demostración presencial | Listo |
| [13](13-evidencias.md) | Checklist y fichas de evidencia | Listo |
| [14](14-pruebas-api-render.md) | Pruebas reproducibles de la API desplegada | Verificado el 14-08-2026 |
| [15](15-analisis-vulnerabilidades.md) | Riesgos, controles y plan de tratamiento | Auditoría documental completada |
| [16](16-comparativo-ui.md) | Comparación funcional y diferenciación visual | Completo |
| [17](17-reporte-final-integrado.md) | Reporte final: 21 secciones, matriz de cumplimiento, resultados y referencias | Listo para revisión y exportación a PDF |
| [18](18-capturas-eduroom-render.md) | Capturas Playwright de EduRoom en Render y revisión responsive | 27 capturas; aprobado con una advertencia |
| [19](19-presentacion-diapositivas.md) | Estructura narrativa de 16 diapositivas, selección de evidencia y exportación | Lista para generar el PDF final |
| [20](20-validacion-seguridad-producto.md) | Validación técnica de checksum, AES-GCM, ofuscación y antireversing | Auditado con advertencias documentadas |
| [21](21-matriz-cumplimiento-rubrica.md) | Auditoría final requisito por requisito, riesgos y acciones de cierre | 29 cumple, 3 cumple documentalmente, 2 parcial justificado, 0 falta |
| [22](22-validacion-final-render.md) | Validación final end-to-end del despliegue, trazabilidad e incidencias | 19/19 pasos aprobados; funcional con observaciones |
| [23](23-cierre-brechas-finales.md) | Matriz operativa para cerrar los nueve requisitos parciales, acciones manuales y checklist de declaración final | Correcciones técnicas incorporadas; evidencias manuales y redespliegue pendientes |
| [24](24-guia-capturas-classroom.md) | Guía de captura manual, autorización, resolución original y revisión de secretos | Política vigente documentada |
| [25](25-medicion-performance-memory.md) | Protocolo manual de Classroom y medición reproducible de Performance/Memory de EduRoom | EduRoom medido; Classroom pendiente de transcripción manual validada |
| [26](26-comparativo-ui-print.md) | Versión imprimible del comparativo flexible por flujo y evidencia responsiva | Cerrado con referencias manuales autorizadas y limitaciones declaradas |
| [27](27-evidencias-tecnicas-finales.md) | Inventario físico de API, seguridad, Render, GitHub, base de datos, Classroom y EduRoom | 69 capturas y SEC-07 textual; 25 técnicas pendientes |
| [28](28-validacion-strict-integrity.md) | Validación de integridad previa al arranque, alcance y fallo controlado | Cumple con prueba local estricta y verificación productiva no bloqueante |
| [29](29-limitaciones-proteccion-cliente-web.md) | Limitaciones de protección del frontend, frontera de confianza y controles compensatorios | Cumple con limitación técnica documentada |
| [30](30-presentacion-final-print.md) | Fuente Marp de 16 diapositivas con notas orales, evidencias reales y tiempos | Lista para exportación y ensayo manual |
| [31](31-reporte-final-pdf-ready.md) | Reporte definitivo con portada, índice, tablas, referencias 21-30 y anexo de 69 figuras | Exportado y revisado en Word y PDF como `II_GLOBAL_23110022_8C` |
| [32](32-veredicto-final-entrega.md) | Reevaluación final, conteos, riesgos, archivos exactos de entrega y aptitud presencial | Aptitud condicionada a revisar GC-DYN-03; 0 requisitos en Falta |

El archivo [`checksums.sha256`](checksums.sha256) es el manifiesto de integridad de las fuentes generado por los scripts multiplataforma; no sustituye los capítulos explicativos 07–09.

## Correspondencia con los requisitos del examen

| Bloque | Evidencia principal |
|---|---|
| Marco teórico | [01](01-marco-teorico.md), [02](02-analisis-google-classroom.md), [03](03-herramientas-utilizadas.md), [08](08-checksum.md) y [09](09-cifrado-ofuscacion.md) |
| Ingeniería inversa | [02](02-analisis-google-classroom.md), [04](04-analisis-dinamico.md) y [05](05-reconstruccion-estructuras.md) |
| Réplica funcional y modelo de datos | [05](05-reconstruccion-estructuras.md), [06](06-diseno-replica.md) y el esquema `backend/prisma/schema.prisma` |
| Protección educativa | [07](07-seguridad-antireversing.md), [08](08-checksum.md), [09](09-cifrado-ofuscacion.md), [20](20-validacion-seguridad-producto.md) y [29](29-limitaciones-proteccion-cliente-web.md) |
| Docker, Render, variables y seed | [10](10-despliegue-render.md), `README.md`, `.env.example`, `docker-compose.yml`, `render.yaml` y `backend/prisma/seed.ts` |
| Pruebas y vulnerabilidades | [14](14-pruebas-api-render.md) y [15](15-analisis-vulnerabilidades.md) |
| Equivalencia de flujos sin copia visual | [16](16-comparativo-ui.md) |
| Limitaciones éticas y técnicas | [11](11-conclusiones.md), [15](15-analisis-vulnerabilidades.md), [29](29-limitaciones-proteccion-cliente-web.md) y la sección homónima de `README.md` |
| Entrega final y presentación | [12](12-guion-presentacion.md), [13](13-evidencias.md), [17](17-reporte-final-integrado.md), [19](19-presentacion-diapositivas.md), [21](21-matriz-cumplimiento-rubrica.md), [23](23-cierre-brechas-finales.md), [30](30-presentacion-final-print.md), [31](31-reporte-final-pdf-ready.md) y [32](32-veredicto-final-entrega.md) |
| Consigna completa integrada | [17](17-reporte-final-integrado.md), con trazabilidad hacia los capítulos 01-18 |

## Convenciones de evidencia

Cada evidencia deberá nombrarse `EV-<capítulo>-<número>`, indicar fecha y hora, cuenta de prueba y acción realizada. Las capturas de cuentas personales/controladas pueden conservar identidad, URL, códigos y resolución original por autorización expresa; ningún archivo de entrega puede incluir secretos reutilizables completos. `GC-DYN-03-application-storage.png` queda Requiere revisión por cookies visibles.

> **Espacio de evidencia EV-00-01:** captura de la estructura del repositorio y versión etiquetada.

## Declaración de alcance

No se realiza scraping masivo, evasión de autenticación, explotación, descompilación, desensamblado, extracción de código ni acceso a información ajena. La observación se limita a interfaces públicas, documentación disponible y solicitudes legítimas producidas por la cuenta de prueba del investigador.

EduRoom no incorpora logos, marcas visuales, capturas, tipografías remotas ni assets de Google. Las menciones textuales a Google Classroom se limitan a identificar el objeto académico y citar fuentes públicas.
