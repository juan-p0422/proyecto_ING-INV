---
title: "Comparativo visual de interfaces"
subtitle: "Google Classroom observado vs EduRoom"
author: "Juan Pantoja"
date: "Agosto de 2026"
lang: es-MX
geometry: margin=18mm
papersize: letter
fontsize: 11pt
colorlinks: true
linkcolor: "0B6B63"
urlcolor: "0B6B63"
header-includes: |
  <style>
    @page { size: Letter; margin: 18mm; }
    body { font-family: Arial, Helvetica, sans-serif; color: #172a2f; line-height: 1.4; }
    h1, h2, h3 { color: #154f59; page-break-after: avoid; }
    h1 { font-size: 26pt; }
    h2 { font-size: 18pt; border-bottom: 2px solid #27786f; padding-bottom: 5px; }
    h3 { font-size: 12pt; color: #8a4b2a; }
    img { display: block; max-width: 100%; max-height: 125mm; margin: 8px auto; object-fit: contain; }
    table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
    th, td { border: 1px solid #b9c7c8; padding: 6px; vertical-align: top; }
    th { background: #eaf2f0; color: #154f59; }
    blockquote { border-left: 4px solid #27786f; background: #f2f6f5; padding: 8px 12px; margin: 10px 0; }
    code { color: #6f3c25; overflow-wrap: anywhere; }
    .cover { min-height: 220mm; display: flex; flex-direction: column; justify-content: center; text-align: center; }
    .cover .project { font-size: 34pt; color: #154f59; margin: 8px 0; }
    .cover .subtitle { font-size: 18pt; color: #53696d; }
    .cover .meta { margin-top: 35mm; font-size: 11pt; }
    .page-break { break-after: page; page-break-after: always; }
    .placeholder { min-height: 42mm; border: 2px dashed #89999b; display: flex; align-items: center; justify-content: center; text-align: center; color: #596a6d; background: #fafbfa; padding: 10px; }
    .caption { text-align: center; font-size: 8.5pt; color: #5f6f72; }
    .status { font-weight: bold; color: #0b6b63; }
    .privacy { border: 2px solid #a95d34; background: #fff7f1; padding: 10px; }
    .small { font-size: 8.5pt; color: #5f6f72; }
  </style>
---

<div class="cover">

<p class="project">EduRoom</p>

# Comparativo visual de interfaces

<p class="subtitle">Google Classroom observado vs EduRoom</p>

**Reporte académico listo para exportación a PDF**

<div class="meta">

**Autor:** Juan Pantoja  
**Asignatura:** Ingeniería inversa  
**Aplicación propia:** [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com)  
**Repositorio:** [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV)  
**Fecha:** Agosto de 2026

</div>

</div>

<div class="page-break"></div>

## Propósito y límites éticos

Este reporte compara estructura, jerarquía, navegación, densidad y comportamiento responsivo entre una referencia pública observada y EduRoom, una réplica académica independiente. La comparación se limita a patrones funcionales generales de una plataforma LMS.

> **La comparación no pretende equivalencia pixel a pixel, sino correspondencia de flujos, jerarquía y comportamiento de interfaz.**

EduRoom usa nombre, marca, paleta, textos, componentes y código propios. No incorpora logos, assets, iconografía propietaria, tipografías remotas, textos comerciales ni colores exactos de Google.

### Reglas para la evidencia de referencia

- Las capturas de Google Classroom deben ser realizadas manualmente por el alumno.
- Se utilizará una cuenta controlada y contenido sintético.
- No se automatiza, descarga o captura Google Classroom mediante scripts.
- Antes de guardar una imagen se ocultarán nombres, correos, códigos de clase, fotografías, avatares, identificadores, archivos y notificaciones.
- Los originales sensibles no se incorporarán al repositorio.
- Las capturas de EduRoom proceden exclusivamente de la instancia propia en Render.

<div class="privacy">

**Advertencia de privacidad:** una superposición editable no constituye anonimización irreversible. La copia final debe censurarse o difuminarse antes de entrar al repositorio y después debe calcularse su SHA-256.

</div>

### Viewports de evidencia

| Dispositivo | Resolución | Uso |
|---|---:|---|
| Escritorio | 1280 x 720 | Distribución completa y contenido sobre el pliegue |
| Tableta | 768 x 1024 | Reacomodo de tarjetas y navegación intermedia |
| Móvil | 390 x 844 | Apilamiento, legibilidad y controles táctiles |

### Escala manual

| Nivel | Interpretación |
|---|---|
| Alta | El objetivo, la jerarquía y el recorrido principal son equivalentes funcionalmente |
| Media | La función existe, pero cambia densidad, posición o cantidad de pasos |
| Baja | Correspondencia conceptual parcial o alcance reducido |
| No aplicable | Sin equivalente o función propia de seguridad |

<div class="page-break"></div>

## 1. Login / inicio

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Pantalla inicial autorizada y anonimizada  
Ruta esperada: `evidence/ui/google-classroom/01-login--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Login de EduRoom en Render](../../evidence/ui/eduroom/01-login--desktop-1280x720.png)

<p class="caption">Figura 1. Login de EduRoom, viewport 1280 x 720.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Jerarquía | Propósito, credenciales y acción primaria claramente separados | Alta |
| Navegación | Acceso a inicio de sesión y registro propio | Alta |
| Diferencia deliberada | Marca, narrativa y composición originales | Favorable |
| Alcance | Autenticación interna, sin identidad Google | Independiente |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/01-login--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/01-login--mobile-390x844.png).

<div class="page-break"></div>

## 2. Dashboard de cursos

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Lista de clases con datos personales y códigos ocultos  
Ruta esperada: `evidence/ui/google-classroom/02-dashboard-cursos--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Dashboard de cursos de EduRoom](../../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png)

<p class="caption">Figura 2. Dashboard docente con curso sintético.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Organización | Colección de cursos mediante tarjetas | Alta |
| Acción principal | Crear curso o unirse según rol | Alta |
| Jerarquía | Saludo, integridad, colección y resumen | Alta |
| Identidad | Tarjetas, monogramas, copy y paleta propios | Diferenciada |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/02-dashboard-cursos--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/02-dashboard-cursos--mobile-390x844.png).

<div class="page-break"></div>

## 3. Curso / tablón

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Tablón de una clase controlada con contenido sintético  
Ruta esperada: `evidence/ui/google-classroom/03-curso-tablon--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Tablón de EduRoom](../../evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png)

<p class="caption">Figura 3. Curso y tablón. El código activo aparece difuminado.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Contexto | Título, descripción, rol y código de aula | Alta |
| Navegación | Tablón, trabajo de clase y personas | Alta |
| Comunicación | Anuncios y comentarios del curso | Alta |
| Densidad | Encabezado editorial ocupa más área visible | Media |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/03-curso-tablon--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/03-curso-tablon--mobile-390x844.png).

<div class="page-break"></div>

## 4. Trabajo de clase

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Trabajo de clase con actividad sintética  
Ruta esperada: `evidence/ui/google-classroom/04-trabajo-clase--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Trabajo de clase de EduRoom](../../evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png)

<p class="caption">Figura 4. Lista de actividades y acción docente.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Actividades | Título, instrucciones, fecha y estado | Alta |
| Acción docente | Creación de tarea dentro del curso propio | Alta |
| Navegación | Cada fila abre el detalle correspondiente | Alta |
| Alcance | Sin temas, rúbricas o adjuntos binarios | Media |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/04-trabajo-clase--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/04-trabajo-clase--mobile-390x844.png).

<div class="page-break"></div>

## 5. Detalle de tarea

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Tarea propia, sin comentarios, adjuntos o identidades reales  
Ruta esperada: `evidence/ui/google-classroom/06-detalle-tarea--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Detalle de tarea de EduRoom](../../evidence/ui/eduroom/06-detalle-tarea--desktop-1280x720.png)

<p class="caption">Figura 5. Instrucciones, fecha y revisión según rol.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Jerarquía | Curso, título, fecha e instrucciones | Alta |
| Rol | Entrega estudiantil o revisión docente | Alta |
| Estado | Pendiente, entregada o calificada | Alta |
| Alcance | Sin archivos reales ni rúbricas | Media |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/06-detalle-tarea--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/06-detalle-tarea--mobile-390x844.png).

<div class="page-break"></div>

## 6. Entrega

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Entrega sintética sin archivos personales  
Ruta esperada: `evidence/ui/google-classroom/07-entrega--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Entrega registrada en EduRoom](../../evidence/ui/eduroom/07-entrega--desktop-1280x720.png)

<p class="caption">Figura 6. Entrega textual registrada por el estudiante.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Flujo | Tarea, respuesta, envío y confirmación | Alta |
| Estado | Entregada y posteriormente calificada | Alta |
| Actualización | La respuesta puede reenviarse | Alta |
| Tipos de entrega | Solo texto; sin almacenamiento binario | Baja |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/07-entrega--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/07-entrega--mobile-390x844.png).

<div class="page-break"></div>

## 7. Personas / miembros

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Miembros sintéticos con nombres, correos y fotografías ocultos  
Ruta esperada: `evidence/ui/google-classroom/05-personas--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Personas en EduRoom](../../evidence/ui/eduroom/05-personas--desktop-1280x720.png)

<p class="caption">Figura 7. Agrupación de docentes y estudiantes. Los correos aparecen difuminados.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Agrupación | Equipo docente y estudiantes separados | Alta |
| Rol | Etiqueta visible por integrante | Alta |
| Privacidad | Evidencia generada con correos difuminados | Satisfactoria |
| Identidad | Avatares tipográficos y tarjetas originales | Diferenciada |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/05-personas--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/05-personas--mobile-390x844.png).

<div class="page-break"></div>

## 8. Calificación / retroalimentación

### Referencia observada

<div class="placeholder">

**[INSERTAR CAPTURA AQUÍ]**  
Calificación y retroalimentación completamente ficticias  
Ruta esperada: `evidence/ui/google-classroom/08-calificacion-retroalimentacion--desktop-1280x720.png`

</div>

### Réplica EduRoom

![Calificación y retroalimentación en EduRoom](../../evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png)

<p class="caption">Figura 8. Resultado visible para el estudiante.</p>

| Criterio | Observación EduRoom | Evaluación provisional |
|---|---|---|
| Estado | Transición de entregada a calificada | Alta |
| Nota | Escala de 0 a 100 | Alta |
| Feedback | Retroalimentación textual visible | Alta |
| Profundidad | Sin rúbricas, ponderaciones o libro completo | Baja |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/08-calificacion-retroalimentacion--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/08-calificacion-retroalimentacion--mobile-390x844.png).

<div class="page-break"></div>

## 9. Seguridad / integridad

### Referencia observada

<div class="placeholder">

**NO APLICABLE**  
No se busca ni se solicita un equivalente en Google Classroom.  
No debe intentarse inferir o probar un control interno del sistema de terceros.

</div>

### Réplica EduRoom

![Estado de integridad de EduRoom](../../evidence/ui/eduroom/09-integridad--desktop-1280x720.png)

<p class="caption">Figura 9. Resumen de integridad propio de EduRoom.</p>

| Criterio | Observación EduRoom | Evaluación |
|---|---|---|
| Función | Estado visible de verificación del build | Propia |
| Exposición | Resumen sin hashes ni rutas internas | Adecuada |
| Comparación | Sin equivalente requerido | No aplicable |
| Alcance | SHA-256 detecta cambios; no prueba autoría | Documentado |

**Otros viewports EduRoom:** [tableta](../../evidence/ui/eduroom/09-integridad--tablet-768x1024.png) - [móvil](../../evidence/ui/eduroom/09-integridad--mobile-390x844.png).

<div class="page-break"></div>

## Conclusión de la comparación

EduRoom conserva patrones funcionales generales de una plataforma LMS: colección de cursos, contexto persistente, navegación por tablón, trabajo y personas, creación y consulta de tareas, entrega, calificación y retroalimentación.

La evidencia disponible muestra una correspondencia alta en navegación y jerarquía, media en densidad visual y profundidad funcional, y una diferenciación intencional clara en identidad. El encabezado editorial de EduRoom ocupa más espacio visible en la vista de curso, mientras que funciones avanzadas como rúbricas, almacenamiento de adjuntos, notificaciones y administración institucional permanecen fuera de alcance.

El diseño no intenta confundirse con Google Classroom. EduRoom mantiene nombre, componentes, paleta, copy y comportamiento visual propios. La evaluación final de cada par solo debe cerrarse cuando el alumno incorpore capturas manuales, autorizadas y anonimizadas de la referencia.

> **Conclusión académica:** la réplica preserva los flujos y relaciones principales observables de un LMS, pero mantiene una identidad independiente y reconoce sus diferencias deliberadas y limitaciones.

### Estado de evidencia

| Conjunto | Estado |
|---|---|
| EduRoom escritorio | Completo: 9 flujos |
| EduRoom tableta | Completo: 9 flujos |
| EduRoom móvil | Completo: 9 flujos |
| Google Classroom | Pendiente de capturas manuales anonimizadas |
| Automatización de Google Classroom | Prohibida y no realizada |

<div class="page-break"></div>

## Instrucciones de exportación a PDF

### Opción A: Pandoc con motor HTML/CSS

Ejecutar desde la raíz del repositorio. Se recomienda un motor que respete CSS y saltos de página HTML, como WeasyPrint:

```powershell
New-Item -ItemType Directory -Force output/pdf | Out-Null
pandoc docs/pdf/comparativo-ui-print.md `
  --from markdown+raw_html `
  --standalone `
  --pdf-engine=weasyprint `
  --resource-path=".;docs/pdf;evidence/ui" `
  -o output/pdf/comparativo-ui.pdf
```

En Linux o macOS, sustituir los acentos graves de continuación de PowerShell por `\` o escribir el comando en una sola línea.

Si WeasyPrint no está instalado:

```bash
python -m pip install weasyprint
```

### Opción B: VS Code Markdown PDF

1. Instalar la extensión **Markdown PDF** de yzane.
2. Abrir `docs/pdf/comparativo-ui-print.md`.
3. Verificar que las rutas relativas muestren las capturas de EduRoom.
4. Abrir la paleta de comandos con `Ctrl+Shift+P`.
5. Seleccionar **Markdown PDF: Export (pdf)**.
6. Mover el resultado final a `output/pdf/comparativo-ui.pdf`.

### Control previo y posterior

- [ ] Reemplazar cada marcador `[INSERTAR CAPTURA AQUÍ]` disponible.
- [ ] Confirmar que ninguna captura incluya datos sensibles.
- [ ] Confirmar que ninguna imagen use logos o activos protegidos dentro de EduRoom.
- [ ] Revisar portada, márgenes y saltos de página.
- [ ] Confirmar que ninguna tabla o imagen esté cortada.
- [ ] Revisar el PDF al 100 % y en modo de páginas continuas.
- [ ] Calcular SHA-256 del PDF final.

Documento fuente ampliado: [`docs/16-comparativo-ui.md`](../16-comparativo-ui.md).
