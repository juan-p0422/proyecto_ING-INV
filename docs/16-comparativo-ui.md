# Comparativo visual de interfaces: Google Classroom observado vs EduRoom

## 16.1 Propósito

Este documento compara la **estructura, jerarquía, navegación y correspondencia de flujos** de una referencia pública observada —Google Classroom— y la réplica académica independiente EduRoom. No se busca equivalencia pixel a pixel ni reproducir la identidad visual propietaria.

EduRoom usa nombre, marca, paleta, componentes, textos y código propios. No incorpora logos, assets, iconografía propietaria, tipografías remotas, textos comerciales ni colores exactos de Google. Las coincidencias se evalúan como patrones funcionales generales de una plataforma LMS.

Recursos del proyecto: [EduRoom en Render](https://eduroom-znb0.onrender.com) · [repositorio](https://github.com/juan-p0422/proyecto_ING-INV).

## 16.2 Alcance

Se comparan los siguientes flujos:

1. login o pantalla inicial;
2. dashboard o listado de cursos;
3. vista de curso y tablón;
4. trabajo de clase y tareas;
5. detalle de tarea;
6. personas o miembros;
7. entrega de tarea;
8. calificación y retroalimentación;
9. estado de integridad de EduRoom, sin equivalente requerido en la referencia.

La observación de Google Classroom debe realizarla manualmente el alumno con una cuenta controlada y contenido sintético. La automatización incluida en el repositorio abre exclusivamente EduRoom.

## 16.3 Viewports y protocolo común

| Dispositivo | Viewport CSS | Objetivo |
|---|---:|---|
| Escritorio | 1280 × 720 | Navegación completa, distribución multicolumna y contenido sobre el pliegue |
| Tableta | 768 × 1024 | Reacomodo de tarjetas, jerarquía intermedia y legibilidad táctil |
| Móvil | 390 × 844 | Apilamiento, navegación compacta, controles táctiles y ausencia de desbordamiento |

Para que el par sea comparable, ambas capturas deben utilizar el mismo viewport, zoom 100 %, tema claro, idioma consistente y un estado funcional equivalente. Deben anotarse fecha, navegador, rol y origen.

Las 27 capturas de EduRoom fueron obtenidas el 14-08-2026 desde Render mediante `tests/capture-eduroom-ui.js`. El manifiesto de procedencia está en [`evidence/ui/eduroom/capture-manifest.json`](../evidence/ui/eduroom/capture-manifest.json).

## 16.4 Escala de evaluación manual

| Nivel | Definición |
|---|---|
| **Alta** | El mismo objetivo, jerarquía y recorrido principal son reconocibles; las diferencias no obstaculizan la tarea |
| **Media** | La función existe y es comprensible, pero cambia la densidad, ubicación, cantidad de pasos o respuesta adaptable |
| **Baja** | Solo hay correspondencia conceptual parcial o el flujo requiere una estrategia sustancialmente distinta |
| **No aplicable** | No existe equivalente, quedó fuera de alcance o se trata de una función propia de seguridad |

La escala no califica parecido estético. Una identidad visual distinta es un resultado deliberado y favorable para la independencia del proyecto.

## 16.5 Tabla de pares visuales

“Referencia pendiente” significa que el alumno debe añadir una captura propia anonimizada en `evidence/ui/google-classroom/`; no autoriza a ningún script a obtenerla.

| Flujo | Viewport | Referencia observada | Réplica EduRoom | Criterio comparado | Resultado |
|---|---|---|---|---|---|
| Login / inicio | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/01-login--desktop-1280x720.png) | Jerarquía, acceso y llamada principal | Par pendiente; EduRoom disponible |
| Login / inicio | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/01-login--tablet-768x1024.png) | Reacomodo del panel | Par pendiente; EduRoom disponible |
| Login / inicio | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/01-login--mobile-390x844.png) | Legibilidad y formulario táctil | Par pendiente; EduRoom disponible |
| Dashboard de cursos | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png) | Colección, acción primaria y tarjetas | Par pendiente; EduRoom disponible |
| Dashboard de cursos | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/02-dashboard-cursos--tablet-768x1024.png) | Rejilla y prioridades | Par pendiente; EduRoom disponible |
| Dashboard de cursos | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/02-dashboard-cursos--mobile-390x844.png) | Apilamiento y acciones por rol | Par pendiente; EduRoom disponible |
| Curso / tablón | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png) | Contexto, pestañas y flujo | Par pendiente; EduRoom disponible |
| Curso / tablón | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/03-curso-tablon--tablet-768x1024.png) | Navegación y columnas | Par pendiente; EduRoom disponible |
| Curso / tablón | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/03-curso-tablon--mobile-390x844.png) | Encabezado y contenido apilado | Par pendiente; EduRoom disponible |
| Trabajo de clase | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png) | Lista de actividades y estado | Par pendiente; EduRoom disponible |
| Trabajo de clase | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/04-trabajo-clase--tablet-768x1024.png) | Densidad de filas | Par pendiente; EduRoom disponible |
| Trabajo de clase | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/04-trabajo-clase--mobile-390x844.png) | Lectura y acceso táctil | Par pendiente; EduRoom disponible |
| Detalle de tarea | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/06-detalle-tarea--desktop-1280x720.png) | Instrucciones, fecha y revisión | Par pendiente; EduRoom disponible |
| Detalle de tarea | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/06-detalle-tarea--tablet-768x1024.png) | Separación de contenido | Par pendiente; EduRoom disponible |
| Detalle de tarea | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/06-detalle-tarea--mobile-390x844.png) | Orden de lectura | Par pendiente; EduRoom disponible |
| Personas / miembros | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/05-personas--desktop-1280x720.png) | Agrupación docente/estudiante | Par pendiente; EduRoom disponible |
| Personas / miembros | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/05-personas--tablet-768x1024.png) | Tarjetas de integrantes | Par pendiente; EduRoom disponible |
| Personas / miembros | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/05-personas--mobile-390x844.png) | Privacidad y apilamiento | Par pendiente; EduRoom disponible |
| Entrega | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/07-entrega--desktop-1280x720.png) | Estado y editor de respuesta | Par pendiente; EduRoom disponible |
| Entrega | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/07-entrega--tablet-768x1024.png) | Jerarquía instrucciones/trabajo | Par pendiente; EduRoom disponible |
| Entrega | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/07-entrega--mobile-390x844.png) | Flujo vertical y estado | Par pendiente; EduRoom disponible |
| Calificación / feedback | 1280×720 | Referencia pendiente | [Captura](../evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png) | Nota, estado y feedback | Par pendiente; EduRoom disponible |
| Calificación / feedback | 768×1024 | Referencia pendiente | [Captura](../evidence/ui/eduroom/08-calificacion-retroalimentacion--tablet-768x1024.png) | Visibilidad del resultado | Par pendiente; EduRoom disponible |
| Calificación / feedback | 390×844 | Referencia pendiente | [Captura](../evidence/ui/eduroom/08-calificacion-retroalimentacion--mobile-390x844.png) | Lectura móvil de resultado | Par pendiente; EduRoom disponible |
| Estado de integridad | 1280×720 | No aplicable | [Captura](../evidence/ui/eduroom/09-integridad--desktop-1280x720.png) | Estado propio de seguridad | Evidencia EduRoom completa |
| Estado de integridad | 768×1024 | No aplicable | [Captura](../evidence/ui/eduroom/09-integridad--tablet-768x1024.png) | Estado propio de seguridad | Evidencia EduRoom completa |
| Estado de integridad | 390×844 | No aplicable | [Captura](../evidence/ui/eduroom/09-integridad--mobile-390x844.png) | Estado propio de seguridad | Evidencia EduRoom completa |

## 16.6 Plantillas de análisis por flujo

### 16.6.1 Login / inicio

**Captura de referencia observada:**  
> ESPACIO RESERVADO — añadir captura manual propia y anonimizada de la pantalla inicial autorizada.

**Captura EduRoom:**  
![Login de EduRoom en escritorio](../evidence/ui/eduroom/01-login--desktop-1280x720.png)

**Qué comparar:** claridad del propósito, campos, acción principal, alternativa de registro y respuesta móvil.

**Similitudes funcionales:** punto de entrada autenticado y separación entre identificación y contenido privado.

**Diferencias deliberadas:** EduRoom presenta narrativa, marca y composición propias; utiliza registro interno en lugar de identidad Google.

**Resultado académico:** correspondencia funcional estimada **Alta**; comparación visual final pendiente de referencia autorizada.

### 16.6.2 Dashboard de cursos

**Captura de referencia observada:**  
> ESPACIO RESERVADO — lista de clases con nombres, códigos, personas y fotos ocultos.

**Captura EduRoom:**  
![Dashboard de EduRoom](../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png)

**Qué comparar:** colección de cursos, acción crear/unirse, información resumida y prioridad de navegación.

**Similitudes funcionales:** tarjeta como acceso a un espacio académico y acción condicionada por rol.

**Diferencias deliberadas:** tarjetas, copy, paleta, monogramas y panel de integridad originales.

**Resultado académico:** correspondencia de navegación **Alta**; identidad visual independiente.

### 16.6.3 Vista de curso / tablón

**Captura de referencia observada:**  
> ESPACIO RESERVADO — tablón de una clase sintética y controlada.

**Captura EduRoom:**  
![Tablón de EduRoom](../evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png)

**Qué comparar:** contexto del curso, navegación secundaria, publicaciones y comentarios.

**Similitudes funcionales:** curso persistente, pestañas y flujo cronológico de comunicación.

**Diferencias deliberadas:** encabezado editorial de gran escala, navegación y componentes desarrollados para EduRoom. El código activo aparece difuminado en la evidencia.

**Resultado académico:** correspondencia estructural **Alta** y densidad sobre el pliegue **Media** por el tamaño deliberado del encabezado.

### 16.6.4 Trabajo de clase / tareas

**Captura de referencia observada:**  
> ESPACIO RESERVADO — trabajo de clase con actividad y contenido sintéticos.

**Captura EduRoom:**  
![Trabajo de clase de EduRoom](../evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png)

**Qué comparar:** agrupación de actividades, estado, fecha, descripción y acción docente.

**Similitudes funcionales:** acceso desde el curso y lista de tareas navegables.

**Diferencias deliberadas:** EduRoom no reproduce temas, rúbricas, adjuntos reales ni taxonomías comerciales.

**Resultado académico:** correspondencia funcional **Alta**; profundidad del LMS **Media**.

### 16.6.5 Detalle de tarea

**Captura de referencia observada:**  
> ESPACIO RESERVADO — tarea propia, sin comentarios, archivos o identidades reales.

**Captura EduRoom:**  
![Detalle de tarea de EduRoom](../evidence/ui/eduroom/06-detalle-tarea--desktop-1280x720.png)

**Qué comparar:** título, instrucciones, fecha, contexto, entrega y revisión.

**Similitudes funcionales:** una actividad centraliza instrucciones y estados dependientes del rol.

**Diferencias deliberadas:** la réplica admite respuesta textual, no carga binaria, rúbricas o integración externa.

**Resultado académico:** jerarquía **Alta**; amplitud funcional **Media**.

### 16.6.6 Personas / miembros

**Captura de referencia observada:**  
> ESPACIO RESERVADO — usar cuentas sintéticas; ocultar nombre, correo y fotografía incluso si pertenecen al alumno.

**Captura EduRoom:**  
![Personas de EduRoom](../evidence/ui/eduroom/05-personas--desktop-1280x720.png)

**Qué comparar:** separación de docentes y estudiantes, conteo, etiquetas y adaptación.

**Similitudes funcionales:** agrupación explícita por función dentro del curso.

**Diferencias deliberadas:** avatares tipográficos propios y tarjetas originales. Los correos se difuminan durante la captura automática.

**Resultado académico:** correspondencia de jerarquía **Alta**.

### 16.6.7 Entrega de tarea

**Captura de referencia observada:**  
> ESPACIO RESERVADO — entrega sintética sin archivos personales ni historial identificable.

**Captura EduRoom:**  
![Entrega en EduRoom](../evidence/ui/eduroom/07-entrega--desktop-1280x720.png)

**Qué comparar:** estado pendiente/entregado, control de envío, respuesta y posibilidad de actualización.

**Similitudes funcionales:** la entrega pertenece a un estudiante y una tarea y muestra estado visible.

**Diferencias deliberadas:** EduRoom usa texto directo y no replica integración con almacenamiento de terceros.

**Resultado académico:** correspondencia de flujo **Alta**; tipos de entrega **Baja** por alcance deliberado.

### 16.6.8 Calificación / retroalimentación

**Captura de referencia observada:**  
> ESPACIO RESERVADO — calificación ficticia y comentarios sin datos personales.

**Captura EduRoom:**  
![Calificación en EduRoom](../evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png)

**Qué comparar:** nota, escala, estado y retroalimentación legible para el estudiante.

**Similitudes funcionales:** transición de entregada a calificada y retorno de feedback.

**Diferencias deliberadas:** escala fija 0–100; no hay rúbricas, ponderaciones ni libro de calificaciones.

**Resultado académico:** correspondencia del flujo básico **Alta**; profundidad evaluativa **Baja**.

### 16.6.9 Estado de integridad

**Captura de referencia observada:**  
> NO APLICABLE — no se busca ni se solicita un equivalente en Google Classroom.

**Captura EduRoom:**  
![Estado de integridad en EduRoom](../evidence/ui/eduroom/09-integridad--desktop-1280x720.png)

**Qué comparar:** no es un par visual; documenta una función defensiva propia de EduRoom.

**Similitudes:** no aplicable.

**Diferencias deliberadas:** indicador académico agregado por el proyecto para exponer un resumen no sensible del checksum.

**Resultado académico:** **No aplicable** como correspondencia; evidencia propia satisfactoria.

## 16.7 Resumen de calidad visual y UX

| Dimensión | Evaluación provisional | Evidencia y observación |
|---|---|---|
| Correspondencia de navegación | Alta | Dashboard → curso → tablón/trabajo/personas → tarea |
| Correspondencia de jerarquía | Alta | Curso, actividad, estado y acciones mantienen prioridad reconocible |
| Correspondencia de densidad visual | Media | El encabezado editorial de EduRoom ocupa más área sobre el pliegue en curso |
| Correspondencia responsiva | Alta en EduRoom; par pendiente | Las muestras 1280×720, 768×1024 y 390×844 se reacomodan sin desbordamiento visible |
| Diferencias intencionales | Alta diferenciación | Marca, copy, color, composición, iconos y componentes propios |
| Profundidad funcional | Media | Se cubre el núcleo; faltan adjuntos reales, rúbricas, notificaciones y funciones institucionales |

Hallazgos de QA visual de EduRoom:

- la identidad es consistente entre autenticación, dashboard y curso;
- las acciones cambian de manera comprensible según profesor o estudiante;
- el móvil conserva orden de lectura y controles utilizables;
- el encabezado del curso desplaza parte del contenido en escritorio, una decisión estética que reduce densidad inmediata;
- el panel de integridad es comprensible, aunque comparte captura con el dashboard y no constituye una pantalla autónoma;
- deben ejecutarse pruebas adicionales con zoom 200 %, teclado, lector de pantalla y contraste antes de afirmar accesibilidad completa.

## 16.8 Diferencias éticas y elementos no replicados

- logos, nombre de producto como marca de la réplica y recursos gráficos de Google;
- iconografía propietaria, textos comerciales, paleta exacta y composición pixel a pixel;
- tipografías o archivos remotos del objeto observado;
- integraciones con servicios Google, videoconferencia y almacenamiento;
- funciones institucionales, notificaciones, rúbricas y libro de calificaciones completo;
- cualquier comportamiento interno no demostrable mediante interfaz pública.

## 16.9 Checklist de capturas

### Google Classroom — manual, autorizado y anonimizado

- [ ] Login o pantalla inicial autorizada.
- [ ] Lista de clases.
- [ ] Tablón de una clase controlada.
- [ ] Trabajo de clase.
- [ ] Personas.
- [ ] Detalle de tarea.
- [ ] Entrega.
- [ ] Calificación y retroalimentación.
- [ ] Cada flujo en 1280×720, 768×1024 y 390×844 cuando sea razonablemente accesible.
- [ ] Fecha, navegador, viewport y rol registrados.
- [ ] SHA-256 calculado después de anonimizar.

### EduRoom — Render

- [x] Login o inicio, tres viewports.
- [x] Dashboard de cursos, tres viewports.
- [x] Curso/tablón, tres viewports.
- [x] Trabajo de clase, tres viewports.
- [x] Personas, tres viewports.
- [x] Detalle de tarea, tres viewports.
- [x] Entrega, tres viewports.
- [x] Calificación y feedback, tres viewports.
- [x] Estado de integridad, tres viewports.
- [x] Manifiesto con origen, fecha y declaración de no automatización de Google Classroom.

## 16.10 Advertencia de privacidad

Antes de capturar Google Classroom, ocultar **nombres, correos, códigos de clase, fotografías, avatares, nombres de archivo, identificadores, notificaciones y cualquier dato personal**. Utilizar únicamente una cuenta controlada y contenido sintético. Revisar también barras del navegador, menús, paneles laterales y miniaturas.

La anonimización debe realizarse sobre una copia. Los originales sensibles no deben entrar al repositorio. El desenfoque debe ser irreversible en el archivo entregado; no basta superponer una figura editable. Después de anonimizar, calcular SHA-256 y registrar la evidencia.

## 16.11 Automatización y generación del inventario

```bash
npm run ui:capture
npm run ui:report
```

`ui:capture` abre solo EduRoom, crea contenido sintético y guarda 27 PNG en `evidence/ui/eduroom/`. Usa Chrome mediante Playwright y admite `EDUROOM_BASE_URL` y `EDUROOM_BROWSER_CHANNEL`. No debe ejecutarse repetidamente porque la API no ofrece limpieza de los datos QA.

`ui:report` compara nombres de archivo esperados y genera `evidence/ui/ui-comparison-inventory.md`. Nunca descarga ni abre Google Classroom: las referencias deben ser aportadas manualmente en `evidence/ui/google-classroom/`.

## 16.12 Conclusión

EduRoom preserva patrones funcionales generales de una plataforma LMS: colección de cursos, contexto persistente, navegación por tablón/trabajo/personas, tareas, entrega, evaluación y feedback. La correspondencia se concentra en objetivos y estructura, mientras que la identidad visual permanece independiente mediante marca, textos, componentes y decisiones gráficas propias.

La evidencia de EduRoom está completa para los tres viewports. La calificación comparativa definitiva de cada par debe cerrarse únicamente cuando el alumno aporte capturas manuales, propias, autorizadas y anonimizadas de la referencia observada.
