# 24. Guía de capturas manuales de Google Classroom

## 24.1 Propósito

Esta guía establece cómo conservar, describir y presentar la evidencia manual de Google Classroom obtenida desde cuentas personales o controladas por el alumno. No autoriza automatización, scraping, evasión de autenticación, pruebas de carga ni acceso a información de terceros.

## 24.2 Nota de autorización

> Las capturas de Google Classroom y otras plataformas corresponden a cuentas personales/controladas por el alumno. El alumno autorizó su inclusión sin anonimización adicional. Se usan exclusivamente como evidencia académica de flujos, pruebas y despliegue.

Los originales existentes en `evidence/ui/google-classroom/` y `evidence/dynamic/google-classroom/` se conservan sin modificación, censura, recorte o cambio de resolución. Nombres del alumno, avatares propios, URL, identificadores y códigos de clases controladas no invalidan la evidencia. Una resolución de 1919 x 1079 u otra distinta se acepta como referencia manual observada y no se compara pixel a pixel.

## 24.3 Captura permitida

1. Iniciar sesión manualmente en una cuenta propia o controlada.
2. Abrir únicamente el flujo que se documentará.
3. Capturar la ventana o DevTools mediante una acción manual del sistema operativo.
4. Conservar el archivo original y registrar fecha, navegador, flujo y resolución cuando esos datos estén disponibles.
5. Clasificar la imagen como referencia observada o evidencia dinámica; no atribuirla a código o infraestructura interna de Google.

No se automatiza Google Classroom. Las capturas actuales son suficientes para los flujos inventariados; si falta un subestado exacto, puede usarse la referencia funcional más cercana y debe documentarse esa decisión.

## 24.4 Revisión de secretos

La autorización de datos propios no incluye contraseñas, JWT completos, cookies de sesión, encabezados `Authorization`, claves API, tokens privados, variables de entorno sensibles ni cadenas de conexión. Si una imagen futura muestra un secreto reutilizable:

- no debe incorporarse al PDF o presentación;
- debe clasificarse **Requiere revisión**;
- no debe borrarse o modificarse automáticamente;
- el alumno debe preparar una nueva captura segura mediante una sesión controlada.

## 24.5 Inventario vigente

| Categoría | Cantidad | Ruta | Estado |
|---|---:|---|---|
| Interfaz de Classroom | 9 | `evidence/ui/google-classroom/` | Capturada y autorizada |
| DevTools de Classroom | 6 | `evidence/dynamic/google-classroom/` | Capturada y autorizada |

La descripción archivo por archivo se encuentra en [27. Evidencias técnicas finales](27-evidencias-tecnicas-finales.md). El análisis y los límites interpretativos se encuentran en [04. Análisis dinámico](04-analisis-dinamico.md) y [25. Medición de Performance/Memory](25-medicion-performance-memory.md).

## 24.6 Redacción académica obligatoria

- “Se observó manualmente desde una cuenta controlada”.
- “La captura muestra comportamiento visible del cliente”.
- “La tecnología interna no puede confirmarse con esta evidencia”.
- “No se vulneró Google Classroom”.
- “No se pretende equivalencia pixel a pixel”.

No usar expresiones como “se hackeó”, “se extrajo el código”, “se descubrió la base de datos” o “se clonó Google Classroom”, porque ninguna de ellas corresponde al alcance o a la evidencia disponible.
