# 18. Capturas automatizadas de EduRoom en Render

## 18.1 Ficha de ejecución

| Campo | Valor |
|---|---|
| Aplicación | EduRoom |
| URL | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |
| Ambiente | Render Production |
| Fecha local | 14-08-2026, 22:17, `America/Mexico_City` |
| Fecha UTC del manifiesto | `2026-08-15T04:17:24Z` |
| Herramienta | Playwright 1.62.1 con Chrome headless |
| Comando | `npm run capture:ui` |
| Resultado | 27 capturas generadas |
| Datos | Cuentas `example.com` y contenido completamente sintético |
| Google Classroom | No abierto, capturado ni automatizado |

Las capturas y el manifiesto se guardan en [`evidence/ui/eduroom/`](../evidence/ui/eduroom/). El script utilizado es [`tests/capture-eduroom-ui.js`](../tests/capture-eduroom-ui.js).

## 18.2 Preparación del escenario

Las credenciales demo del `seed` existen únicamente para desarrollo local y no deben utilizarse en Render. Por ello, el script registra en cada ejecución:

- un docente temporal con correo único bajo `example.com`;
- un estudiante temporal con correo único bajo `example.com`;
- un curso, anuncio, tarea, entrega, comentario y calificación sintéticos.

Tokens, contraseña, código de curso e identificadores no se imprimen ni se escriben en el manifiesto. Antes de cada captura se difuminan el código de curso y los correos visibles en la página de personas.

Actualmente la API no ofrece eliminación de datos QA. El script debe ejecutarse solo de forma puntual y nunca como monitor recurrente o prueba de carga.

## 18.3 Viewports

| Perfil | Dimensiones CSS | Capturas |
|---|---:|---:|
| Escritorio | 1280 × 720 | 9 |
| Tableta | 768 × 1024 | 9 |
| Móvil | 390 × 844 | 9 |
| **Total** | - | **27** |

## 18.4 Tabla de capturas generadas

| Flujo | 1280 × 720 | 768 × 1024 | 390 × 844 |
|---|---|---|---|
| Login | [login-1280x720.png](../evidence/ui/eduroom/login-1280x720.png) | [login-768x1024.png](../evidence/ui/eduroom/login-768x1024.png) | [login-390x844.png](../evidence/ui/eduroom/login-390x844.png) |
| Dashboard | [dashboard-1280x720.png](../evidence/ui/eduroom/dashboard-1280x720.png) | [dashboard-768x1024.png](../evidence/ui/eduroom/dashboard-768x1024.png) | [dashboard-390x844.png](../evidence/ui/eduroom/dashboard-390x844.png) |
| Curso / tablón | [course-stream-1280x720.png](../evidence/ui/eduroom/course-stream-1280x720.png) | [course-stream-768x1024.png](../evidence/ui/eduroom/course-stream-768x1024.png) | [course-stream-390x844.png](../evidence/ui/eduroom/course-stream-390x844.png) |
| Trabajo de clase | [classwork-1280x720.png](../evidence/ui/eduroom/classwork-1280x720.png) | [classwork-768x1024.png](../evidence/ui/eduroom/classwork-768x1024.png) | [classwork-390x844.png](../evidence/ui/eduroom/classwork-390x844.png) |
| Detalle de tarea docente | [assignment-detail-1280x720.png](../evidence/ui/eduroom/assignment-detail-1280x720.png) | [assignment-detail-768x1024.png](../evidence/ui/eduroom/assignment-detail-768x1024.png) | [assignment-detail-390x844.png](../evidence/ui/eduroom/assignment-detail-390x844.png) |
| Personas | [people-1280x720.png](../evidence/ui/eduroom/people-1280x720.png) | [people-768x1024.png](../evidence/ui/eduroom/people-768x1024.png) | [people-390x844.png](../evidence/ui/eduroom/people-390x844.png) |
| Integridad | [integrity-1280x720.png](../evidence/ui/eduroom/integrity-1280x720.png) | [integrity-768x1024.png](../evidence/ui/eduroom/integrity-768x1024.png) | [integrity-390x844.png](../evidence/ui/eduroom/integrity-390x844.png) |
| Entrega estudiantil | [assignment-submission-1280x720.png](../evidence/ui/eduroom/assignment-submission-1280x720.png) | [assignment-submission-768x1024.png](../evidence/ui/eduroom/assignment-submission-768x1024.png) | [assignment-submission-390x844.png](../evidence/ui/eduroom/assignment-submission-390x844.png) |
| Calificación y feedback | [assignment-graded-1280x720.png](../evidence/ui/eduroom/assignment-graded-1280x720.png) | [assignment-graded-768x1024.png](../evidence/ui/eduroom/assignment-graded-768x1024.png) | [assignment-graded-390x844.png](../evidence/ui/eduroom/assignment-graded-390x844.png) |

El archivo [`capture-manifest.json`](../evidence/ui/eduroom/capture-manifest.json) registra origen, fecha, canal de navegador, viewport, ruta y medición de desbordamiento de cada captura, pero no contiene credenciales ni identificadores de los recursos.

## 18.5 Observaciones responsive

### Escritorio 1280 × 720

- Las vistas de curso, personas y detalle aprovechan distribuciones multicolumna.
- La navegación principal, el perfil y las pestañas permanecen visibles.
- El encabezado editorial del curso ocupa una proporción importante del primer viewport; parte del contenido requiere desplazamiento vertical.
- Los nueve escenarios reportaron `documentWidth=viewportWidth`, sin desbordamiento horizontal.

### Tableta 768 × 1024

- Dashboard, curso, trabajo, tarea, personas, entrega, calificación e integridad se reacomodan sin desbordamiento horizontal.
- **Advertencia UI-RESP-01:** el login conserva la cuadrícula de dos columnas a 768 px. Sus mínimos son 380 + 420 px, por lo que `documentWidth=800` frente a `viewportWidth=768`: existe un desbordamiento horizontal de 32 px y el borde derecho del formulario puede quedar recortado.
- Causa probable: el cambio a una columna está definido en `@media (max-width: 760px)`, ocho píxeles por debajo del viewport de tableta evaluado.
- Recomendación: mover el breakpoint de autenticación a 800 px o permitir que las columnas se contraigan con mínimos compatibles; añadir una aserción automatizada que falle ante overflow.

### Móvil 390 × 844

- Los nueve escenarios se apilan en una columna sin desbordamiento horizontal detectado.
- La navegación secundaria, tarjetas y panel de trabajo conservan un orden de lectura coherente.
- Parte del contenido queda debajo del pliegue, comportamiento esperado para una página desplazable.
- La navegación principal reduce información secundaria y conserva marca, perfil y acciones esenciales.

## 18.6 Accesibilidad visual básica

Esta revisión es visual y no sustituye WCAG, pruebas con lector de pantalla ni auditoría con tecnologías de asistencia.

| Área | Observación | Estado |
|---|---|---|
| Etiquetas de formulario | Correo y contraseña muestran etiquetas visibles, no solo placeholder | Aprobado visualmente |
| Jerarquía | Títulos y subtítulos distinguen curso, sección, tarea y estado | Aprobado visualmente |
| Estados | Entregada, calificada e integridad incluyen texto además de color | Aprobado visualmente |
| Legibilidad | Tipografía y espaciado son legibles en las tres muestras | Aprobado visualmente |
| Reflow | Correcto en 26/27 capturas | Advertencia en login de tableta |
| Contraste | No se observaron combinaciones evidentemente ilegibles | Pendiente de medición WCAG formal |
| Foco de teclado | No puede evaluarse en capturas estáticas | Pendiente |
| Zoom 200 % | No forma parte de esta corrida | Pendiente |
| Lector de pantalla | No forma parte de esta corrida | Pendiente |

Recomendaciones:

1. corregir `UI-RESP-01` y convertir la medición de overflow en una aserción bloqueante;
2. medir contraste con WCAG 2.2 y conservar texto redundante para estados;
3. ejecutar navegación completa con teclado y foco visible;
4. comprobar zoom 200 % y reflow equivalente a 320 CSS px;
5. validar nombres accesibles, landmarks y orden semántico con una herramienta especializada.

## 18.7 Reproducción

Requisitos: Node.js 20+, dependencias instaladas y Chrome disponible.

```bash
npm install
npm run capture:ui
```

Para usar otro entorno propio o canal de navegador:

```powershell
$env:EDUROOM_BASE_URL = 'http://localhost:3000'
$env:EDUROOM_BROWSER_CHANNEL = 'msedge'
npm run capture:ui
```

No usar este script con una URL de Google Classroom. El propio código fija flujos y selectores exclusivos de EduRoom y declara en el manifiesto `googleClassroomAutomated: false`.

## 18.8 Resultado

La automatización produjo correctamente todas las capturas solicitadas y amplió la cobertura a tres viewports para los nueve flujos. El resultado general es **aprobado con advertencia responsive** por el desbordamiento específico del login en 768 × 1024. No se capturaron datos personales reales ni se automatizó ningún sistema de terceros.
