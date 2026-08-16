# 25. Medición de Performance y Memory

## 25.1 Objetivo y alcance

Este capítulo documenta dos alcances separados:

1. **Google Classroom como referencia externa:** medición exclusivamente manual, autorizada y de caja negra desde DevTools, con una cuenta controlada y contenido sintético.
2. **EduRoom como producto propio:** medición ligera y reproducible de la página pública desplegada en Render mediante Playwright y Chromium.

Las métricas describen el comportamiento del cliente en un equipo, navegador, red y momento concretos. No revelan memoria de servidor, arquitectura interna ni una vulnerabilidad. No se automatiza Google Classroom, no se extraen datos personales y no se publican archivos `.heapsnapshot`.

## 25.2 Google Classroom: protocolo manual autorizado

### 25.2.1 Preparación segura

1. Usar una cuenta de prueba autorizada y una clase controlada con textos y archivos sintéticos.
2. Cerrar correo, mensajería, administrador de contraseñas, otras pestañas y extensiones innecesarias.
3. Fijar navegador, versión, viewport, zoom 100 %, red y flujo que se observará.
4. Abrir DevTools solo en la pestaña autorizada. No instalar scripts, extensiones de captura ni automatizaciones.
5. Las capturas de la cuenta personal/controlada pueden conservar nombres, avatares, URL, identificadores y códigos propios conforme a la autorización del alumno. Antes de compartirlas, revisar únicamente secretos reutilizables completos.
6. Definir una sola interacción breve, por ejemplo abrir una clase demo y cambiar a “Trabajo de clase”.

### 25.2.2 Captura de Performance

1. Abrir DevTools y seleccionar **Performance**.
2. Activar capturas de pantalla solo si la clase demo no contiene información identificable.
3. Presionar **Record**, ejecutar una vez el flujo definido y detener la grabación inmediatamente.
4. Registrar duración aproximada, evento `DOMContentLoaded` o `Load` cuando aparezca, actividad general del hilo principal, recursos y tareas largas visibles.
5. Capturar únicamente el resumen y la línea de tiempo necesarios. No ampliar funciones, argumentos, cuerpos de red o cadenas internas.
6. Antes de guardar, comprobar que no aparezcan contraseñas, JWT completos, cookies de sesión completas, claves API, tokens privados o variables sensibles completas. Los datos propios expresamente autorizados no requieren anonimización adicional.
7. Guardar el original autorizado como `evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png` y calcular su SHA-256 sin alterar la resolución.

Una grabación aislada no permite concluir que existe un problema de rendimiento. Para comparar tendencias deben repetirse las condiciones, pero no se debe generar carga masiva ni ejecutar ciclos automatizados.

### 25.2.3 Captura de Memory snapshot

1. Abrir DevTools y seleccionar **Memory**.
2. Elegir **Heap snapshot** únicamente sobre la cuenta y clase sintéticas.
3. Tomar una instantánea inicial; anotar solo el tamaño agregado mostrado por DevTools y, si está disponible, el número total agregado de objetos.
4. Ejecutar manualmente una sola vez el mismo flujo definido para Performance.
5. Tomar una segunda instantánea solo si la política institucional lo permite y registrar la diferencia aproximada.
6. No buscar cadenas, nombres de objetos de negocio, URL, credenciales, tokens ni contenido de usuario.
7. No subir el archivo `.heapsnapshot`: puede contener texto, objetos y credenciales presentes en la sesión. Conservar únicamente la captura autorizada del resumen en `evidence/dynamic/google-classroom/GC-DYN-06-memory-summary.png`.
8. Cerrar DevTools, eliminar las instantáneas locales y revisar la papelera o ubicación temporal según la política del equipo.

Una variación entre snapshots puede deberse a caché, carga diferida o recolección de basura. Solo una retención sostenida, reproducible y explicable permitiría formular una hipótesis; esta práctica no intenta demostrar fugas de memoria de Google Classroom.

### 25.2.4 Registro de medición manual

Las capturas existentes fueron revisadas el 16-08-2026. Se transcriben únicamente valores legibles en DevTools; un campo truncado o no visible se declara como tal y no se estima.

| Fecha | Navegador | Viewport | Flujo observado | Tiempo de carga aproximado | Recursos principales observados | Uso de memoria aproximado | Observaciones | Captura asociada |
|---|---|---|---|---:|---|---:|---|---|
| 16-08-2026, 00:27–00:37 hora visible del equipo | Opera GX sobre Chromium, DevTools 150 visible | Modo responsive 472 × 760 dentro de una captura original 1919 × 1079 | Dashboard y detalle de la actividad “Actividad de análisis funcional” en clase controlada | Network: `DOMContentLoaded` 455 ms, `Load` 2.19 s y finalización 6.96 s en GC-DYN-01; Performance: rango grabado 20.62 s, INP 58 ms y CLS 0 en GC-DYN-05 | Network muestra 64 solicitudes, 1,060 kB transferidos y 4,262 kB de recursos en GC-DYN-01; no se transcriben URL internas | Heap snapshot: la categoría `(compiled code)` muestra 24,473 kB retenidos; `Function`, 15,261 kB; `(string)`, 12,256 kB. El tamaño total del snapshot no se transcribe porque la etiqueta está truncada | Muestra puntual de cliente; no mide servidores ni demuestra fuga. Se conserva la resolución original autorizada y no se publica `.heapsnapshot` | `GC-DYN-01-network-xhr.png`, `GC-DYN-05-performance-summary.png`, `GC-DYN-06-memory-summary.png` |

## 25.3 EduRoom: medición reproducible en Render

### 25.3.1 Instrumento

El script [`tests/performance-eduroom.js`](../tests/performance-eduroom.js) usa Playwright con Chromium y realiza una sola navegación a <https://eduroom-znb0.onrender.com>. No inicia sesión, no crea registros y no repite solicitudes. Obtiene:

- `loadEventEnd - startTime` y `domContentLoadedEventEnd - startTime` desde Navigation Timing;
- conteo de entradas de recursos e iniciadores, sin guardar URL;
- transferencia aproximada reportada por el navegador;
- heap JavaScript usado/total mediante Chrome DevTools Protocol, con respaldo en `performance.memory`;
- conteo agregado de elementos DOM, nodos y documentos;
- HTTP de la navegación y screenshot de la vista pública.

Comando:

```powershell
npm run performance:eduroom
```

Variables opcionales:

```powershell
$env:EDUROOM_BASE_URL = 'https://eduroom-znb0.onrender.com'
$env:EDUROOM_BROWSER_CHANNEL = 'chrome'
npm run performance:eduroom
```

Cada ejecución crea archivos fechados y no sobrescribe evidencia previa.

### 25.3.2 Resultado concreto de la ejecución

Ejecución puntual, no benchmark:

| Campo | Resultado |
|---|---|
| Fecha UTC | `2026-08-16T06:42:33.184Z` |
| Destino | `https://eduroom-znb0.onrender.com` |
| Alcance | Página pública; una navegación; sin autenticación |
| Navegador | Chromium/Chrome `151.0.7922.138` |
| Viewport | 1280 × 720 |
| HTTP | 200 |
| Load time | 481.60 ms |
| DOMContentLoaded | 481.30 ms |
| Response start | 264.70 ms |
| Navegación + espera visual de 1.5 s | 1,990.17 ms |
| Recursos aproximados | 5, incluido el documento; 4 entradas de recurso |
| Tipos observados | 1 `script`, 1 `link`, 2 `other`, más el documento |
| Transferencia aproximada | 93,361 bytes (aprox. 91.17 KiB) |
| Cuerpo codificado aproximado | 92,115 bytes (aprox. 89.96 KiB) |
| JS heap usado | 2,185,404 bytes (aprox. 2.08 MiB) |
| JS heap total | 3,407,872 bytes (aprox. 3.25 MiB) |
| Elementos DOM | 42 |
| Nodos CDP | 88 |
| Documentos CDP | 2 |

Artefactos:

| Evidencia | Ruta | SHA-256 |
|---|---|---|
| Resultado estructurado | [`eduroom-performance-20260816T064230Z.json`](../evidence/performance/eduroom/eduroom-performance-20260816T064230Z.json) | `ab02d8172e6e7ebc083e7a89e0fd2abf867dbe167352e882e7f4a6d6bbf5fa6d` |
| Captura pública | [`eduroom-performance-20260816T064230Z.png`](../evidence/performance/eduroom/eduroom-performance-20260816T064230Z.png) | `d963acb98174209a5e345e0d3d6c6ee95f82e4be4842403f95e2ed43badeb347` |

La captura fue revisada: muestra únicamente el login vacío de EduRoom, sin credenciales ni datos personales.

### 25.3.3 Interpretación permitida

La ejecución demuestra que el navegador pudo cargar la página pública y obtener métricas básicas del cliente. En esa muestra, Navigation Timing informó cerca de 482 ms hasta `load` y CDP informó aproximadamente 2.08 MiB de heap JavaScript usado después de la estabilización. Estos valores sirven como línea base de EduRoom para el entorno registrado.

No se concluye que todas las sesiones tendrán esos tiempos, que el servidor utiliza esa memoria ni que existe o no una fuga. Para un benchmark se necesitarían varias ejecuciones controladas, percentiles, estado de caché documentado y comparación por commit; ese trabajo queda fuera de esta medición académica ligera.

## 25.4 Comparabilidad y limitaciones

| Aspecto | Google Classroom | EduRoom |
|---|---|---|
| Obtención | Manual y autorizada | Playwright sobre producto propio |
| Estado actual | Captura y transcripción documental disponibles; sin automatización | Una muestra concreta disponible |
| Cuenta | Demo controlada | Sin autenticación |
| Memoria | Resumen de DevTools; no publicar snapshot | Heap JavaScript aproximado de Chromium/CDP |
| Recursos | Categorías agregadas | Conteos por iniciador y bytes aproximados |
| Finalidad | Referencia observable | Línea base reproducible de la réplica |

No deben compararse ambos valores como si fueran una prueba de superioridad: los flujos, estado de sesión, caché, contenido, red y complejidad son distintos. La comparación académica válida describe método, contexto y orden de magnitud, manteniendo separados hecho observado, medición e inferencia.

## 25.5 Criterio de cierre del requisito

EduRoom cuenta con medición concreta, JSON, screenshot y comando reproducible. Google Classroom cuenta con Performance y Memory observados manualmente, más una transcripción conservadora de los valores visibles. El requisito se evalúa **Cumple documentalmente**: acredita el uso de la herramienta y una medición de cliente, pero no constituye benchmark, inspección de servidores ni diagnóstico de fuga.
