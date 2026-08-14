# Memoria técnica de EduRoom

## Propósito

Esta memoria registra un ejercicio académico de ingeniería inversa ética de caja negra y la construcción de EduRoom. El objeto observado es Google Classroom, pero el producto resultante es independiente: usa identidad, interfaz, código y modelo de datos propios.

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

El archivo [`checksums.sha256`](checksums.sha256) es el manifiesto de integridad de las fuentes generado por los scripts multiplataforma; no sustituye los capítulos explicativos 07–09.

## Correspondencia con los requisitos del examen

| Bloque | Evidencia principal |
|---|---|
| Marco teórico | [01](01-marco-teorico.md), [02](02-analisis-google-classroom.md), [03](03-herramientas-utilizadas.md), [08](08-checksum.md) y [09](09-cifrado-ofuscacion.md) |
| Ingeniería inversa | [02](02-analisis-google-classroom.md), [04](04-analisis-dinamico.md) y [05](05-reconstruccion-estructuras.md) |
| Réplica funcional y modelo de datos | [05](05-reconstruccion-estructuras.md), [06](06-diseno-replica.md) y el esquema `backend/prisma/schema.prisma` |
| Protección educativa | [07](07-seguridad-antireversing.md), [08](08-checksum.md) y [09](09-cifrado-ofuscacion.md) |
| Docker, Render, variables y seed | [10](10-despliegue-render.md), `README.md`, `.env.example`, `docker-compose.yml`, `render.yaml` y `backend/prisma/seed.ts` |
| Limitaciones éticas y técnicas | [11](11-conclusiones.md) y la sección homónima de `README.md` |

## Convenciones de evidencia

Cada evidencia deberá nombrarse `EV-<capítulo>-<número>`, indicar fecha y hora, cuenta de prueba, acción realizada y datos anonimizados. Las capturas se guardarán fuera del control de versiones cuando incluyan información sensible.

> **Espacio de evidencia EV-00-01:** captura de la estructura del repositorio y versión etiquetada.

## Declaración de alcance

No se realiza scraping masivo, evasión de autenticación, explotación, descompilación, desensamblado, extracción de código ni acceso a información ajena. La observación se limita a interfaces públicas, documentación disponible y solicitudes legítimas producidas por la cuenta de prueba del investigador.

EduRoom no incorpora logos, marcas visuales, capturas, tipografías remotas ni assets de Google. Las menciones textuales a Google Classroom se limitan a identificar el objeto académico y citar fuentes públicas.
