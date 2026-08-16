---
marp: true
title: "EduRoom: ingeniería inversa ética y réplica académica"
description: "Presentación final presencial, 16 diapositivas"
author: "Juan Pantoja"
date: "16-08-2026"
lang: es-MX
size: 16:9
paginate: true
theme: default
style: |
  section { font-family: Arial, Helvetica, sans-serif; padding: 52px 64px; color: #172033; }
  h1 { color: #173b67; font-size: 42px; }
  h2 { color: #173b67; font-size: 34px; }
  p, li { font-size: 23px; line-height: 1.25; }
  strong { color: #0e6b66; }
  small { font-size: 15px; color: #526175; }
  table { font-size: 17px; }
  table img { max-height: 250px; object-fit: contain; }
  code { font-size: 19px; }
  blockquote { border-left: 5px solid #0e6b66; color: #334155; }
  .metric { font-size: 42px; font-weight: 700; color: #0e6b66; }
  .footer { position: absolute; left: 64px; bottom: 24px; font-size: 14px; color: #64748b; }
---

<!--
INSTRUCCIONES DE EXPORTACIÓN

Opción recomendada con Marp CLI, desde la raíz del repositorio:
  npx @marp-team/marp-cli docs/30-presentacion-final-print.md --pdf --allow-local-files -o evidence/final-pdf/eduroom-presentacion-final.pdf

Alternativa con Visual Studio Code:
  1. Abrir este archivo con la extensión Marp for VS Code.
  2. Ejecutar “Marp: Export Slide Deck”.
  3. Elegir PDF y guardar como evidence/final-pdf/eduroom-presentacion-final.pdf.

Antes de entregar: revisar las 16 páginas, imágenes, saltos, enlaces y secretos; abrir el PDF sin conexión. La exportación real y su revisión deben registrarse en docs/13-evidencias.md.
-->

<!-- _class: lead -->

# EduRoom

## Ingeniería inversa ética y réplica académica independiente

[Deploy](https://eduroom-znb0.onrender.com) · [Repositorio](https://github.com/juan-p0422/proyecto_ING-INV)

<small>Presentación final · 16-08-2026</small>

![bg right:43% contain](../evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png)

<!--
Diapositiva 1 — Portada
Qué mostrar: esta portada y la captura real del dashboard de EduRoom.
Qué decir oralmente: “Presento EduRoom, una réplica académica independiente construida a partir de observación ética de Google Classroom. El objetivo fue comprender flujos observables, implementarlos con código propio y respaldarlos con evidencia verificable.”
Evidencia relacionada: docs/17-reporte-final-integrado.md y dashboard de EduRoom.
Ruta de imagen: evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png.
Tiempo aproximado: 0:25.
-->

---

# La consigna exigía analizar, construir y demostrar

- Analizar una aplicación **no open source**.
- Reconstruir estructuras, tecnologías, entradas y salidas.
- Implementar una réplica funcional independiente.
- Aplicar cifrado, ofuscación, integridad y validación.
- Demostrar resultados con pruebas y documentación.

**Analizar → inferir → diseñar → implementar → validar**

<div class="footer">Consigna del proyecto · alcance académico</div>

<!--
Diapositiva 2 — Consigna del proyecto
Qué mostrar: los cinco verbos como secuencia acumulativa.
Qué decir oralmente: “La tarea no era describir pantallas. Exigía pasar de una aplicación propietaria observada externamente a un modelo propio, una implementación funcional y controles demostrables.”
Evidencia relacionada: docs/17-reporte-final-integrado.md, sección de correspondencia con la consigna; docs/21-matriz-cumplimiento-rubrica.md.
Ruta de imagen: no existe una imagen específica; la secuencia tipográfica es el recurso visual.
Tiempo aproximado: 0:30.
-->

---

# Tres objetivos conectan análisis y producto

1. **Comprender** flujos educativos observables sin acceder a implementación propietaria.
2. **Reconstruir** un modelo de dominio y una arquitectura propios.
3. **Validar** EduRoom mediante pruebas funcionales, visuales y defensivas.

> El resultado esperado no es una copia: es una demostración académica trazable.

<!--
Diapositiva 3 — Objetivos
Qué mostrar: los tres objetivos y la frase de resultado.
Qué decir oralmente: “Los objetivos forman una cadena: observar de forma legítima, convertir lo observado en requisitos y comprobar una solución independiente. La trazabilidad separa observado, inferido e implementado.”
Evidencia relacionada: docs/12-guion-presentacion.md y docs/17-reporte-final-integrado.md.
Ruta de imagen: no aplica.
Tiempo aproximado: 0:30.
-->

---

# Classroom aportó patrones funcionales, no código

- Cursos, tablón, trabajo de clase y personas.
- Tareas, entregas, comentarios y calificaciones.
- Estados y jerarquías visibles desde una cuenta controlada.
- Arquitectura interna: **no conocida ni afirmada**.

![bg right:49% contain](../evidence/ui/google-classroom/GC-02-dashboard-clase.png)

<div class="footer">Referencia manual de escritorio · resolución original conservada</div>

<!--
Diapositiva 4 — Aplicación analizada: Google Classroom
Qué mostrar: GC-02 en su resolución original, sin modificar ni censurar.
Qué decir oralmente: “Classroom se usó como referencia funcional. Las capturas muestran una sesión propia o controlada y permiten describir navegación y flujos. No permiten conocer su base de datos, código o topología interna.”
Evidencia relacionada: docs/02-analisis-google-classroom.md, docs/16-comparativo-ui.md y docs/27-evidencias-tecnicas-finales.md.
Ruta de imagen: evidence/ui/google-classroom/GC-02-dashboard-clase.png.
Tiempo aproximado: 0:35.
-->

---

# La metodología mantuvo un límite ético verificable

**Dentro del alcance**

- Fuentes públicas y uso normal.
- Cuentas personales o controladas.
- DevTools manual y observación de caja negra.

**Fuera del alcance**

- Automatización de Classroom.
- Bypass, explotación, carga o acceso a terceros.
- Copia de marcas, assets o textos propietarios.

<!--
Diapositiva 5 — Metodología ética
Qué mostrar: contraste entre acciones permitidas y excluidas.
Qué decir oralmente: “No se vulneró Google Classroom. La observación fue manual, autorizada y de caja negra. Las inferencias se etiquetan como inferencias y EduRoom conserva identidad, recursos y código propios.”
Evidencia relacionada: docs/01-marco-teorico.md y docs/04-analisis-dinamico.md.
Ruta de imagen: no aplica.
Tiempo aproximado: 0:35.
-->

---

# El análisis dinámico registró comportamiento observable

- Network: solicitudes legítimas, recursos y estados.
- Application: almacenamiento, cache y service workers.
- Performance: traza manual disponible.
- Memory: heap snapshot manual disponible.
- EduRoom: medición reproducible sin carga masiva.

![bg right:48% contain](../evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png)

<div class="footer">No se inventan valores: la transcripción manual pendiente permanece declarada</div>

<!--
Diapositiva 6 — Análisis dinámico
Qué mostrar: GC-DYN-05; si preguntan por memoria, abrir GC-DYN-06. Conservar originales autorizados.
Qué decir oralmente: “DevTools permitió observar el comportamiento de una sesión normal. Las capturas de Performance y Memory existen, pero los valores de Classroom no se transcriben hasta validarlos manualmente. EduRoom sí tiene una muestra JSON reproducible.”
Evidencia relacionada: docs/04-analisis-dinamico.md y docs/25-medicion-performance-memory.md.
Rutas de imagen: evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png; evidence/dynamic/google-classroom/GC-DYN-06-memory-summary.png; evidence/performance/eduroom/eduroom-performance-20260816T064230Z.png.
Tiempo aproximado: 0:45.
-->

---

# El modelo reconstruido explica el ciclo educativo

```text
User ──< Enrollment >── Course ──< Assignment ──< Submission
  │                         │             │              │
  └──────── Comment ────────┘          Attachment     grade + feedback
```

- El modelo es **propio de EduRoom**.
- `Grade` se implementa dentro de `Submission`.
- No se atribuye este esquema a Google.

<!--
Diapositiva 7 — Reconstrucción de estructuras
Qué mostrar: el modelo relacional simplificado; si el profesor pide detalle, abrir backend/prisma/schema.prisma.
Qué decir oralmente: “Enrollment resuelve la pertenencia entre usuarios y cursos. Assignment representa la actividad; Submission, la entrega y su evaluación. Es una reconstrucción conceptual propia, no el esquema interno de Classroom.”
Evidencia relacionada: docs/05-reconstruccion-estructuras.md y backend/prisma/schema.prisma.
Ruta de imagen: no existe PNG específico; el esquema textual se imprime en la diapositiva.
Tiempo aproximado: 0:40.
-->

---

# EduRoom separa interfaz, reglas y persistencia

```text
Navegador
React + TypeScript + Vite
          ↓  HTTPS / API REST
Servidor
Express + Zod + Prisma + controles de acceso
          ↓
PostgreSQL
```

**Render** publica el servicio · **GitHub** conserva fuente y trazabilidad

<!--
Diapositiva 8 — Arquitectura de EduRoom
Qué mostrar: las tres capas y la dirección de confianza.
Qué decir oralmente: “El frontend presenta la experiencia. El backend vuelve a validar autenticación, rol, membresía y entrada. Prisma conecta con PostgreSQL. Render aloja el servicio y GitHub conserva el repositorio académico.”
Evidencia relacionada: docs/06-diseno-replica.md, render.yaml y docker-compose.yml.
Ruta de imagen: no existe PNG específico; usar el diagrama textual o abrir render.yaml si solicitan implementación.
Tiempo aproximado: 0:40.
-->

---

# La demo recorre un flujo completo entre dos roles

| Profesor | Estudiante | Profesor |
|---|---|---|
| Crea curso y tarea | Se une y entrega | Califica y retroalimenta |
| ![](../evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png) | ![](../evidence/ui/eduroom/07-entrega--desktop-1280x720.png) | ![](../evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png) |

<!--
Diapositiva 9 — Demo funcional
Qué mostrar: cambiar a Render con dos perfiles preparados; esta secuencia queda como respaldo visual.
Qué decir oralmente: “El profesor crea el curso y la tarea; el estudiante se incorpora y entrega; el profesor asigna calificación y feedback. Cada cambio de rol se valida también en la API.”
Evidencia relacionada: docs/14-pruebas-api-render.md y evidencia UI de EduRoom.
Rutas de imagen: evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png; 07-entrega--desktop-1280x720.png; 08-calificacion-retroalimentacion--desktop-1280x720.png.
Tiempo aproximado: 1:15.
-->

---

# Render validó el flujo con solicitudes controladas

- Smoke test API: **26/26 solicitudes aprobadas**.
- Pruebas defensivas: **14/14 comprobaciones aprobadas**.
- Health e integridad respondieron en el despliegue observado.
- Pruebas secuenciales, de bajo volumen y con datos sintéticos.

![bg right:43% contain](../evidence/ui/eduroom/09-integridad--desktop-1280x720.png)

<div class="footer">Los resultados prueban los escenarios ejecutados, no ausencia total de defectos</div>

<!--
Diapositiva 10 — Pruebas en Render
Qué mostrar: la vista de integridad de EduRoom y, si hay red, /api/health y /api/security/integrity. No afirmar que existen capturas API o del panel Render: continúan pendientes.
Qué decir oralmente: “Las pruebas se ejecutaron con pocas solicitudes y datos controlados. Los resultados 26 de 26 y 14 de 14 corresponden a escenarios concretos; no son una certificación de seguridad absoluta.”
Evidencia relacionada: docs/14-pruebas-api-render.md, docs/15-analisis-vulnerabilidades.md y docs/22-validacion-final-render.md.
Ruta de imagen existente: evidence/ui/eduroom/09-integridad--desktop-1280x720.png. Capturas técnicas API/Render: pendientes según docs/27-evidencias-tecnicas-finales.md.
Tiempo aproximado: 0:45.
-->

---

# Cada control protege una propiedad diferente

| Control | Propósito | Límite |
|---|---|---|
| JWT + roles | Identidad y autorización | El servidor debe validar cada solicitud |
| bcrypt | Contraseñas almacenadas | Hash, no cifrado recuperable |
| AES-256-GCM | Confidencialidad e integridad de notas seguras | Depende de proteger la clave |
| SHA-256 | Detectar cambios del artefacto | No reemplaza una firma digital |

<!--
Diapositiva 11 — Seguridad, cifrado y checksum
Qué mostrar: tabla; después, si se solicita, abrir el endpoint de integridad o ejecutar npm run integrity:demo sobre la copia temporal.
Qué decir oralmente: “JWT y roles controlan acceso; bcrypt deriva contraseñas; AES-GCM protege información recuperable; SHA-256 detecta diferencias. Son controles complementarios con límites distintos.”
Evidencia relacionada: docs/08-checksum.md, docs/09-cifrado-ofuscacion.md, docs/20-validacion-seguridad-producto.md y docs/28-validacion-strict-integrity.md.
Ruta de imagen: evidence/ui/eduroom/09-integridad--desktop-1280x720.png. Evidencia textual: evidence/security/SEC-07-obfuscated-build-proof.txt.
Tiempo aproximado: 0:50.
-->

---

# El frontend puede observarse; la seguridad vive en el servidor

- HTML, CSS y JavaScript deben descargarse al navegador.
- La ofuscación **dificulta lectura**, pero no vuelve invisible el código.
- El checksum detecta cambios; no impide toda modificación.
- Roles, validación, secretos y decisiones críticas permanecen en backend.
- Antidebug educativo: diagnóstico no destructivo.

<!--
Diapositiva 12 — Antireversing y limitaciones
Qué mostrar: las cinco afirmaciones; opcionalmente SEC-07 como prueba reproducible del build ofuscado.
Qué decir oralmente: “Una aplicación web entrega su cliente al navegador. Por eso no vendo protección absoluta: la ofuscación eleva el esfuerzo y la integridad detecta cambios, mientras el control efectivo de permisos debe permanecer en servidor.”
Evidencia relacionada: docs/07-seguridad-antireversing.md, docs/09-cifrado-ofuscacion.md y docs/29-limitaciones-proteccion-cliente-web.md.
Ruta de imagen: no existe PNG específico; evidence/security/SEC-07-obfuscated-build-proof.txt es evidencia documental equivalente.
Tiempo aproximado: 0:40.
-->

---

# La correspondencia es funcional, no pixel a pixel

| Referencia manual observada | Réplica académica independiente |
|---|---|
| ![](../evidence/ui/google-classroom/GC-04-tablon.png) | ![](../evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png) |

- Coinciden contexto, navegación y propósito del tablón.
- Cambian marca, componentes, textos y decisiones visuales.

<!--
Diapositiva 13 — Comparativo UI
Qué mostrar: el par visual de tablón. La captura de Classroom se conserva en resolución original y sin anonimización adicional.
Qué decir oralmente: “La comparación evalúa estructura, jerarquía y flujo. No pretende equivalencia pixel a pixel y EduRoom no incorpora logos, recursos o textos propietarios.”
Evidencia relacionada: docs/16-comparativo-ui.md y docs/26-comparativo-ui-print.md.
Rutas de imagen: evidence/ui/google-classroom/GC-04-tablon.png; evidence/ui/eduroom/03-curso-tablon--desktop-1280x720.png.
Tiempo aproximado: 0:50.
-->

---

# La evidencia disponible es real, trazable y limitada

| Classroom manual | DevTools manual | EduRoom en Render |
|---|---|---|
| 9 capturas UI | 6 capturas dinámicas | 54 capturas UI |
| ![](../evidence/ui/google-classroom/GC-07-entrega-tarea.png) | ![](../evidence/dynamic/google-classroom/GC-DYN-01-network-xhr.png) | ![](../evidence/ui/eduroom/07-entrega--desktop-1280x720.png) |

> Las capturas visibles pertenecen a cuentas personales/controladas del alumno y se incluyen con autorización para fines académicos.

<!--
Diapositiva 14 — Evidencias
Qué mostrar: las tres categorías existentes. No representar como capturadas las series API, Render, GitHub o base de datos que el inventario marca pendientes.
Qué decir oralmente: “La evidencia disponible se usa sin alterar sus originales autorizados. Nombres, avatares, URL o códigos controlados no invalidan la captura; un secreto reutilizable sí debe excluirse de la proyección.”
Evidencia relacionada: docs/13-evidencias.md y docs/27-evidencias-tecnicas-finales.md.
Rutas de imagen: evidence/ui/google-classroom/GC-07-entrega-tarea.png; evidence/dynamic/google-classroom/GC-DYN-01-network-xhr.png; evidence/ui/eduroom/07-entrega--desktop-1280x720.png.
Tiempo aproximado: 0:40.
-->

---

# Los resultados muestran cumplimiento y límites abiertos

| Resultado | Alcance comprobado |
|---|---|
| <span class="metric">29</span> Cumple | Matriz académica de 34 requisitos |
| <span class="metric">5</span> Parcial | Evidencia o acción manual todavía pendiente |
| <span class="metric">0</span> Falta | Ningún requisito completamente ausente |

- Comparativo UI: cerrado documentalmente.
- Cliente observable: cumple con limitación técnica documentada.
- Presentación: lista para exportar; ejecución aún no acreditada.

<!--
Diapositiva 15 — Resultados
Qué mostrar: 29 Cumple, 5 Parcial y 0 Falta, con los tres matices.
Qué decir oralmente: “La auditoría no identifica requisitos ausentes. Los parciales restantes dependen principalmente de transcripción manual, capturas técnicas, exportación o ejecución presencial. No convierto una preparación en evidencia de una exposición ya realizada.”
Evidencia relacionada: docs/21-matriz-cumplimiento-rubrica.md y docs/23-cierre-brechas-finales.md.
Ruta de imagen: no aplica.
Tiempo aproximado: 0:40.
-->

---

<!-- _class: lead -->

# Comprender cómo se observa ayuda a construir y proteger

- **Observación ética** → requisitos verificables.
- **Arquitectura independiente** → réplica funcional.
- **Protección + QA** → evidencia, límites y mejora continua.

[EduRoom](https://eduroom-znb0.onrender.com) · [Repositorio y documentación](https://github.com/juan-p0422/proyecto_ING-INV)

<small>EduRoom no es una copia visual ni una reconstrucción de la arquitectura interna de Google.</small>

<!--
Diapositiva 16 — Conclusiones
Qué mostrar: síntesis final y enlaces.
Qué decir oralmente: “La ingeniería inversa ética puede convertir comportamiento externo en requisitos sin acceder a propiedad ajena. EduRoom demuestra esa transición con código propio, controles defensivos y evidencia revisable. El valor final está tanto en la implementación como en reconocer sus límites.”
Evidencia relacionada: docs/11-conclusiones.md y docs/17-reporte-final-integrado.md.
Ruta de imagen: no aplica.
Tiempo aproximado: 0:35. Duración total estimada: 10:55.
-->
