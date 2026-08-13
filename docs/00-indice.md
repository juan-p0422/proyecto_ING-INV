# Memoria técnica de EduRoom

## Propósito

Esta memoria registra un ejercicio académico de ingeniería inversa ética de caja negra y la construcción de EduRoom. El objeto observado es Google Classroom, pero el producto resultante es independiente: usa identidad, interfaz, código y modelo de datos propios.

## Índice documental

| Documento | Contenido | Estado inicial |
|---|---|---|
| [01](01-marco-teorico.md) | Fundamentos y límites éticos | Base redactada |
| [02](02-analisis-google-classroom.md) | Análisis funcional observable | Base redactada |
| [03](03-herramientas-utilizadas.md) | Instrumentos y trazabilidad | Base redactada |
| [04](04-analisis-dinamico.md) | Protocolo de pruebas dinámicas | Base redactada |
| [05](05-reconstruccion-estructuras.md) | Inferencias de dominio | Base redactada |
| [06](06-diseno-replica.md) | Arquitectura de EduRoom | Implementada v0.1 |
| [07](07-seguridad-antireversing.md) | Seguridad y resistencia al abuso | Base redactada |
| [08](08-checksum.md) | Integridad mediante SHA-256 | Procedimiento listo |
| [09](09-cifrado-ofuscacion.md) | Cifrado, hash y ofuscación | Base redactada |
| [10](10-despliegue-render.md) | Despliegue en Render | Configuración lista |
| [11](11-conclusiones.md) | Hallazgos, límites y trabajo futuro | Borrador |

## Convenciones de evidencia

Cada evidencia deberá nombrarse `EV-<capítulo>-<número>`, indicar fecha y hora, cuenta de prueba, acción realizada y datos anonimizados. Las capturas se guardarán fuera del control de versiones cuando incluyan información sensible.

> **Espacio de evidencia EV-00-01:** captura de la estructura del repositorio y versión etiquetada.

## Declaración de alcance

No se realiza scraping masivo, evasión de autenticación, explotación, descompilación, desensamblado, extracción de código ni acceso a información ajena. La observación se limita a interfaces públicas, documentación disponible y solicitudes legítimas producidas por la cuenta de prueba del investigador.

