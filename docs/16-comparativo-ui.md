# Comparativo visual de UIs: Google Classroom observado vs EduRoom

**Referencia pública observada vs réplica académica independiente**<br>
**Fecha:** 16-08-2026 (`America/Mexico_City`)<br>
**Deploy de EduRoom:** <https://eduroom-znb0.onrender.com><br>
**Repositorio:** <https://github.com/juan-p0422/proyecto_ING-INV>

## 16.1 Propósito

El comparativo estudia composición, navegación, jerarquía, densidad, flujos, responsividad aproximada y correspondencia funcional. Google Classroom funciona como referencia manual observada; EduRoom es una réplica académica independiente implementada con identidad y código propios.

La evaluación no mide parecido pixel a pixel. **Alta** indica que se conserva el objetivo, jerarquía y flujo principal; **Media**, que se conserva el objetivo con cambios relevantes; **Baja**, que solo existe correspondencia parcial; y **No aplicable**, que el elemento es exclusivo de uno de los productos.

## 16.2 Nota de autorización de evidencias

> Las capturas de Google Classroom corresponden a evidencia manual obtenida desde cuentas personales/controladas por el alumno. El alumno autorizó su inclusión sin anonimización adicional. Se usan exclusivamente con fines académicos para demostrar flujos, estructura y comportamiento observable.

Las imágenes conservan su resolución original de 1919 × 1079 y no fueron anonimizadas, censuradas, modificadas, eliminadas ni reemplazadas. Su resolución se acepta como **referencia manual de escritorio**. Google Classroom no fue abierto ni automatizado por scripts del proyecto.

## 16.3 Límites

- No se copian marcas, logos o identidad de Google dentro de EduRoom.
- No se copian recursos visuales o assets de Google en la réplica.
- No se copian textos propietarios como contenido de EduRoom.
- No se afirma equivalencia pixel a pixel.
- Las capturas de referencia conservan su resolución original y se usan como evidencia funcional.
- Los viewports 1280 × 720, 768 × 1024 y 390 × 844 se aplican a EduRoom para demostrar su respuesta multiplataforma, no para invalidar la referencia manual.
- Las capturas dinámicas describen observación desde DevTools y no implican acceso a código, servidores o información interna de Google.

## 16.4 Capturas detectadas y clasificación

### 16.4.1 Google Classroom

| Archivo | Ruta | Resolución | Flujo asignado | Estado | Observación |
|---|---|---:|---|---|---|
| `GC-01-login-o-inicio.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Login / Inicio | Usada | Captura funcional más cercana: muestra el inicio autenticado/dashboard |
| `GC-02-dashboard-clase.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Dashboard de cursos | Usada | Referencia manual observada en resolución original |
| `GC-03-crear-clase.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Creación de clase | Usada | Modal de creación con datos de clase controlada |
| `GC-04-tablon.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Tablón del curso | Usada | Contexto, pestañas, encabezado y acciones docentes |
| `GC-05-trabajo-clase.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Trabajo de clase | Usada | Editor de tarea como captura funcional equivalente al flujo docente |
| `GC-06-detalle-tarea.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Detalle de tarea | Usada | Vista de instrucciones y comentarios |
| `GC-07-entrega-tarea.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Entrega de tarea | Usada | Estado entregado y panel de trabajo |
| `GC-08-personas.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Personas / miembros | Usada | Agrupación profesores/estudiantes |
| `GC-09-calificaciones.png` | `evidence/ui/google-classroom/` | 1919 × 1079 | Calificaciones | Usada | Libro de calificaciones y promedio |
| `GC-DYN-01-network-xhr.png` | `evidence/dynamic/google-classroom/` | 1919 × 1079 | DevTools Network | Usada | Fetch/XHR, estados, tamaños y tiempos |
| `GC-DYN-02-network-status-codes.png` | `evidence/dynamic/google-classroom/` | 1919 × 1079 | DevTools Network | Complementaria | Inventario general de recursos y códigos |
| `GC-DYN-03-application-storage.png` | `evidence/dynamic/google-classroom/` | 1919 × 1079 | DevTools Application | Requiere revisión | Contiene valores visibles de cookies; no exportar/proyectar hasta invalidar sesiones o preparar una edición segura autorizada |
| `GC-DYN-04-service-workers-cache.png` | `evidence/dynamic/google-classroom/` | 1919 × 1079 | DevTools Application | Complementaria | Service workers/cache del entorno observado |
| `GC-DYN-05-performance-summary.png` | `evidence/dynamic/google-classroom/` | 1919 × 1079 | Performance | Usada | Traza y resumen de interacción |
| `GC-DYN-06-memory-summary.png` | `evidence/dynamic/google-classroom/` | 1919 × 1079 | Memory | Usada | Resumen manual de heap snapshot |

### 16.4.2 EduRoom

| Flujo | Escritorio | Tableta | Móvil | Estado |
|---|---|---|---|---|
| Login / Inicio | `01-login--desktop-1280x720.png` | `01-login--tablet-768x1024.png` | `01-login--mobile-390x844.png` | Usada |
| Dashboard | `02-dashboard-cursos--desktop-1280x720.png` | `02-dashboard-cursos--tablet-768x1024.png` | `02-dashboard-cursos--mobile-390x844.png` | Usada |
| Curso / Tablón | `03-curso-tablon--desktop-1280x720.png` | `03-curso-tablon--tablet-768x1024.png` | `03-curso-tablon--mobile-390x844.png` | Usada |
| Trabajo de clase | `04-trabajo-clase--desktop-1280x720.png` | `04-trabajo-clase--tablet-768x1024.png` | `04-trabajo-clase--mobile-390x844.png` | Usada |
| Personas | `05-personas--desktop-1280x720.png` | `05-personas--tablet-768x1024.png` | `05-personas--mobile-390x844.png` | Usada |
| Detalle de tarea | `06-detalle-tarea--desktop-1280x720.png` | `06-detalle-tarea--tablet-768x1024.png` | `06-detalle-tarea--mobile-390x844.png` | Usada |
| Entrega | `07-entrega--desktop-1280x720.png` | `07-entrega--tablet-768x1024.png` | `07-entrega--mobile-390x844.png` | Usada |
| Calificaciones | `08-calificacion-retroalimentacion--desktop-1280x720.png` | `08-calificacion-retroalimentacion--tablet-768x1024.png` | `08-calificacion-retroalimentacion--mobile-390x844.png` | Usada |
| Seguridad / integridad | `09-integridad--desktop-1280x720.png` | `09-integridad--tablet-768x1024.png` | `09-integridad--mobile-390x844.png` | Usada |

Además de la serie seleccionada anterior, la carpeta contiene una serie previa de 27 PNG registrada en `capture-manifest.json`. Se conserva como evidencia complementaria y trazable; no se cuenta como 27 flujos adicionales ni sustituye los pares principales. Cada patrón de la tabla representa sus tres archivos de escritorio, tableta y móvil.

| Archivo | Ruta | Resolución | Flujo asignado | Estado | Observación |
|---|---|---|---|---|---|
| `login-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Login / Inicio | Complementaria | Serie registrada en el manifiesto; el escritorio coincide binariamente con la serie seleccionada |
| `dashboard-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Dashboard | Complementaria | Serie registrada en el manifiesto |
| `course-stream-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Curso / Tablón | Complementaria | Variante previa conservada |
| `classwork-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Trabajo de clase | Complementaria | Variante previa conservada |
| `people-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Personas | Complementaria | Variante previa conservada |
| `assignment-detail-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Detalle de tarea | Complementaria | Variante previa conservada |
| `assignment-submission-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Entrega | Complementaria | Serie registrada en el manifiesto |
| `assignment-graded-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Calificaciones | Complementaria | Serie registrada en el manifiesto |
| `integrity-{1280x720,768x1024,390x844}.png` | `evidence/ui/eduroom/` | Tres viewports | Seguridad / integridad | Complementaria | Serie registrada en el manifiesto |
| `capture-manifest.json` | `evidence/ui/eduroom/` | No aplicable | Trazabilidad | Complementaria | Registra fuente, fecha, viewport y ausencia de automatización de Classroom |

En total se detectaron **54 PNG de EduRoom**: 27 seleccionados para el comparativo y 27 complementarios. Esta distinción evita inflar el número de flujos demostrados.

## 16.5 Matriz comparativa flexible por flujo

| Flujo | Captura Google Classroom disponible | Resolución Classroom | Captura EduRoom disponible | Resolución EduRoom | Criterio comparado | Similitud funcional | Diferencias deliberadas | Resultado |
|---|---|---:|---|---:|---|---|---|---|
| Login / Inicio | `GC-01-login-o-inicio.png` | 1919 × 1079 | `01-login--desktop-1280x720.png` | 1280 × 720 | Entrada y orientación inicial | Ambas conducen al entorno educativo | Classroom muestra inicio ya autenticado; EduRoom muestra formulario y registro propios | **Baja** |
| Dashboard de cursos | `GC-02-dashboard-clase.png` | 1919 × 1079 | `02-dashboard-cursos--desktop-1280x720.png` | 1280 × 720 | Colección, navegación y acciones | Curso como unidad principal y acceso por tarjeta | Navegación, tarjetas, paleta y panel de integridad propios | **Alta** |
| Creación de clase | `GC-03-crear-clase.png` | 1919 × 1079 | `02-dashboard-cursos--desktop-1280x720.png` | 1280 × 720 | Acción docente de crear curso | Ambos exponen creación desde el dashboard | Classroom muestra modal; EduRoom evidencia la acción próxima pero no el modal en esta captura | **Media** |
| Tablón del curso | `GC-04-tablon.png` | 1919 × 1079 | `03-curso-tablon--desktop-1280x720.png` | 1280 × 720 | Contexto, pestañas y publicaciones | Contexto persistente y comunicación del curso | Encabezado, componentes, copy y densidad propios | **Alta** |
| Trabajo de clase | `GC-05-trabajo-clase.png` | 1919 × 1079 | `04-trabajo-clase--desktop-1280x720.png` | 1280 × 720 | Gestión docente de actividades | Centralización de tareas y acción de creación | Referencia muestra editor; EduRoom muestra listado y menor complejidad | **Media** |
| Detalle de tarea | `GC-06-detalle-tarea.png` | 1919 × 1079 | `06-detalle-tarea--desktop-1280x720.png` | 1280 × 720 | Título, instrucciones, estado y comentarios | Actividad como centro del flujo | EduRoom usa paneles, textos y alcance propios | **Alta** |
| Entrega de tarea | `GC-07-entrega-tarea.png` | 1919 × 1079 | `07-entrega--desktop-1280x720.png` | 1280 × 720 | Trabajo enviado, estado y acción | Cambio de estado visible y vínculo con la tarea | EduRoom prioriza respuesta textual y no replica integraciones | **Alta** |
| Personas / miembros | `GC-08-personas.png` | 1919 × 1079 | `05-personas--desktop-1280x720.png` | 1280 × 720 | Agrupación y roles | Separación de profesores y estudiantes | EduRoom usa tarjetas y avatares tipográficos propios | **Alta** |
| Calificaciones | `GC-09-calificaciones.png` | 1919 × 1079 | `08-calificacion-retroalimentacion--desktop-1280x720.png` | 1280 × 720 | Nota, escala y lectura del resultado | Evaluación asociada al trabajo | Classroom presenta libro agregado; EduRoom prioriza nota/feedback individual | **Media** |
| Seguridad / integridad | No existe equivalente requerido | No aplicable | `09-integridad--desktop-1280x720.png` | 1280 × 720 | Estado defensivo propio | No se evalúa similitud | Función académica exclusiva de EduRoom | **No aplicable** |

Referencia manual observada en resolución original; se usa como evidencia funcional, no como comparación pixel a pixel.

## 16.6 Comparaciones visuales por flujo

### 16.6.1 Login / Inicio — captura funcional equivalente

| Google Classroom: inicio autenticado | EduRoom: acceso público |
|---|---|
| ![Inicio manual de Classroom](../evidence/ui/google-classroom/GC-01-login-o-inicio.png) | ![Login de EduRoom](../evidence/ui/eduroom/01-login--desktop-1280x720.png) |

- **Qué comparar:** orientación inicial, navegación hacia cursos y prioridad de acceso.
- **Similitudes:** ambos son puntos de entrada al ecosistema educativo.
- **Diferencias deliberadas:** la referencia está autenticada; EduRoom presenta autenticación/registro con narrativa propia.
- **Resultado:** **Baja**, porque el estado exacto difiere, aunque la captura es funcionalmente cercana.

### 16.6.2 Dashboard de cursos

| Google Classroom: referencia manual de escritorio | EduRoom: escritorio 1280 × 720 |
|---|---|
| ![Dashboard manual de Classroom](../evidence/ui/google-classroom/GC-02-dashboard-clase.png) | ![Dashboard de EduRoom](../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png) |

- **Qué comparar:** composición general, colección de cursos, navegación y acciones.
- **Similitudes:** curso como unidad visual principal y acceso directo.
- **Diferencias deliberadas:** EduRoom usa layout, tarjetas, paleta, textos e integridad propios.
- **Resultado:** **Alta**.

### 16.6.3 Creación de clase — captura funcional equivalente

| Google Classroom: creación manual | EduRoom: dashboard con acción docente |
|---|---|
| ![Crear clase en Classroom](../evidence/ui/google-classroom/GC-03-crear-clase.png) | ![Dashboard docente de EduRoom](../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png) |

- **Qué comparar:** descubrimiento de la acción y datos mínimos del curso.
- **Similitudes:** creación disponible desde el contexto principal del docente.
- **Diferencias deliberadas:** el modal de EduRoom no está capturado; su modelo y campos son propios.
- **Resultado:** **Media**.

### 16.6.4 Tablón del curso

| Google Classroom: referencia manual | EduRoom: escritorio 1280 × 720 |
|---|---|
| ![Tablón manual de Classroom](../evidence/ui/google-classroom/GC-04-tablon.png) | ![Tablón de EduRoom](../evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png) |

- **Qué comparar:** contexto, pestañas, publicaciones y acciones docentes.
- **Similitudes:** navegación contextual y comunicación dentro del curso.
- **Diferencias deliberadas:** encabezado editorial, tarjetas y copy originales.
- **Resultado:** **Alta**.

### 16.6.5 Trabajo de clase — captura funcional equivalente

| Google Classroom: editor de tarea | EduRoom: listado de actividades |
|---|---|
| ![Trabajo de clase manual](../evidence/ui/google-classroom/GC-05-trabajo-clase.png) | ![Trabajo de clase de EduRoom](../evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png) |

- **Qué comparar:** gestión de actividades, jerarquía de datos y acción docente.
- **Similitudes:** tareas centralizadas dentro del curso.
- **Diferencias deliberadas:** la referencia muestra creación detallada; EduRoom evidencia listado y menor complejidad.
- **Resultado:** **Media**.

### 16.6.6 Detalle de tarea

| Google Classroom: referencia manual | EduRoom: escritorio 1280 × 720 |
|---|---|
| ![Detalle manual de Classroom](../evidence/ui/google-classroom/GC-06-detalle-tarea.png) | ![Detalle de EduRoom](../evidence/ui/eduroom/06-detalle-tarea--desktop-1280x720.png) |

- **Qué comparar:** título, instrucciones, metadatos, comentarios y estado.
- **Similitudes:** una actividad concentra contexto y siguientes acciones.
- **Diferencias deliberadas:** estructura interna, textos y componentes propios.
- **Resultado:** **Alta**.

### 16.6.7 Entrega de tarea

| Google Classroom: referencia manual | EduRoom: escritorio 1280 × 720 |
|---|---|
| ![Entrega manual de Classroom](../evidence/ui/google-classroom/GC-07-entrega-tarea.png) | ![Entrega de EduRoom](../evidence/ui/eduroom/07-entrega--desktop-1280x720.png) |

- **Qué comparar:** estado entregado, trabajo asociado y reversibilidad.
- **Similitudes:** cambio de estado visible vinculado a la tarea.
- **Diferencias deliberadas:** EduRoom usa contenido textual sintético y no replica adjuntos/integraciones.
- **Resultado:** **Alta**.

### 16.6.8 Personas / miembros

| Google Classroom: referencia manual | EduRoom: escritorio 1280 × 720 |
|---|---|
| ![Personas manual de Classroom](../evidence/ui/google-classroom/GC-08-personas.png) | ![Personas de EduRoom](../evidence/ui/eduroom/05-personas--desktop-1280x720.png) |

- **Qué comparar:** agrupación por rol, conteos y densidad.
- **Similitudes:** profesores y estudiantes se presentan en secciones diferenciadas.
- **Diferencias deliberadas:** EduRoom usa tarjetas y avatares tipográficos propios.
- **Resultado:** **Alta**.

### 16.6.9 Calificaciones

| Google Classroom: libro de calificaciones | EduRoom: resultado individual |
|---|---|
| ![Calificaciones manual de Classroom](../evidence/ui/google-classroom/GC-09-calificaciones.png) | ![Calificación de EduRoom](../evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png) |

- **Qué comparar:** nota, escala, estado y vínculo con la actividad.
- **Similitudes:** la evaluación cierra el ciclo de trabajo.
- **Diferencias deliberadas:** Classroom agrega resultados; EduRoom prioriza nota y feedback individual.
- **Resultado:** **Media**.

### 16.6.10 Seguridad / integridad, elemento propio

| Google Classroom | EduRoom |
|---|---|
| **No aplicable:** no se busca equivalente. | ![Integridad de EduRoom](../evidence/ui/eduroom/09-integridad--desktop-1280x720.png) |

- **Qué comparar:** no es un par; documenta una función defensiva propia.
- **Similitudes:** no evaluadas.
- **Diferencias deliberadas:** resumen no sensible del checksum incorporado por EduRoom.
- **Resultado:** **No aplicable**.

## 16.7 Evidencia dinámica complementaria de Classroom

| Network Fetch/XHR | Network y códigos de estado |
|---|---|
| ![Network XHR manual](../evidence/dynamic/google-classroom/GC-DYN-01-network-xhr.png) | ![Network status manual](../evidence/dynamic/google-classroom/GC-DYN-02-network-status-codes.png) |

| Application / almacenamiento | Service workers / cache |
|---|---|
| **[EVIDENCIA EN REVISIÓN]** `GC-DYN-03-application-storage.png` se conserva como original autorizado, pero no se incrusta en la versión de entrega por cookies visibles. | ![Service workers manual](../evidence/dynamic/google-classroom/GC-DYN-04-service-workers-cache.png) |

| Performance | Memory |
|---|---|
| ![Performance manual](../evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png) | ![Memory manual](../evidence/dynamic/google-classroom/GC-DYN-06-memory-summary.png) |

Estas capturas complementan el análisis de comportamiento observable; no se usan para afirmar equivalencia de implementación interna.

## 16.8 Comparativo responsivo de EduRoom

Classroom se conserva como referencia manual observada en resolución original. La adaptación responsiva se acredita sobre EduRoom, producto propio capturable automáticamente en Render.

| Flujo EduRoom | Escritorio 1280 × 720 | Tableta 768 × 1024 | Móvil 390 × 844 | Evaluación responsiva |
|---|---|---|---|---|
| Login | [Captura](../evidence/ui/eduroom/01-login--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/01-login--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/01-login--mobile-390x844.png) | Reflujo del panel y formulario legible |
| Dashboard | [Captura](../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/02-dashboard-cursos--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/02-dashboard-cursos--mobile-390x844.png) | Rejilla adaptable y acciones conservadas |
| Tablón | [Captura](../evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/03-curso-tablon--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/03-curso-tablon--mobile-390x844.png) | Contexto y navegación se apilan |
| Trabajo | [Captura](../evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/04-trabajo-clase--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/04-trabajo-clase--mobile-390x844.png) | Actividades legibles en secuencia vertical |
| Personas | [Captura](../evidence/ui/eduroom/05-personas--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/05-personas--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/05-personas--mobile-390x844.png) | Roles conservan jerarquía |
| Detalle | [Captura](../evidence/ui/eduroom/06-detalle-tarea--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/06-detalle-tarea--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/06-detalle-tarea--mobile-390x844.png) | Paneles reordenados sin perder estado |
| Entrega | [Captura](../evidence/ui/eduroom/07-entrega--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/07-entrega--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/07-entrega--mobile-390x844.png) | CTA y respuesta permanecen accesibles |
| Calificación | [Captura](../evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/08-calificacion-retroalimentacion--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/08-calificacion-retroalimentacion--mobile-390x844.png) | Nota y feedback legibles |
| Integridad | [Captura](../evidence/ui/eduroom/09-integridad--desktop-1280x720.png) | [Captura](../evidence/ui/eduroom/09-integridad--tablet-768x1024.png) | [Captura](../evidence/ui/eduroom/09-integridad--mobile-390x844.png) | Estado propio visible en tres tamaños |

## 16.9 Resumen de calidad

| Dimensión | Evaluación | Fundamento |
|---|---|---|
| Estructura y navegación | Alta | Dashboard, curso, tablón, actividades, personas y resultado conservan objetivos y jerarquía general |
| Respuesta multiplataforma | Alta en EduRoom | Nueve flujos cuentan con evidencia 1280 × 720, 768 × 1024 y 390 × 844 |
| Identidad y contenido | Independiente | EduRoom usa marca, paleta, componentes, textos y datos sintéticos propios |
| Equivalencia estricta | No pretendida | Las resoluciones difieren y no se busca coincidencia pixel a pixel |
| Limitaciones | Declaradas | Login e inicio tienen estados distintos; creación y trabajo usan capturas funcionales cercanas; Classroom solo acredita una resolución manual |

### Resultado agregado

| Resultado | Flujos |
|---|---:|
| Alta | 5 |
| Media | 3 |
| Baja | 1 |
| No aplicable | 1 |

## 16.10 Conclusión

Las capturas respaldan una correspondencia funcional alta en los flujos principales de dashboard, tablón, detalle, entrega y personas, y una correspondencia media en creación, trabajo de clase y calificaciones. El inicio recibe valoración baja porque la referencia disponible muestra una sesión autenticada mientras EduRoom muestra el acceso público; esta limitación se documenta sin inventar una captura faltante.

EduRoom alcanza correspondencia funcional suficiente como réplica académica de patrones generales de un LMS y demuestra adaptación responsiva propia. No es una copia visual exacta: conserva identidad, textos, recursos, composición detallada y decisiones de producto independientes.

Versión preparada para impresión: [26. Comparativo UI para impresión](26-comparativo-ui-print.md).
