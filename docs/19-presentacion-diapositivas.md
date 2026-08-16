# 19. Estructura de diapositivas para la presentación final

**Formato:** 15 diapositivas

**Duración asociada:** 8–12 minutos

**Audiencia:** profesor y compañeros de clase

**Propósito:** explicar y demostrar el proceso académico, no vender un producto ni imitar una identidad visual

**Guion oral completo:** [`12-guion-presentacion.md`](12-guion-presentacion.md)

> **Trabajo de comunicación:** al finalizar, la audiencia debe comprender que EduRoom convierte observaciones éticas de caja negra en una implementación LMS independiente, funcional, protegida y respaldada por evidencia reproducible.

## 19.1 Sistema visual recomendado

- Usar identidad propia de EduRoom; no incorporar logos, iconos, tipografías ni paleta de Google.
- Mantener títulos de una línea, máximo tres ideas visibles por diapositiva y texto corporal grande.
- Alternar diagramas, capturas y cifras; evitar llenar las diapositivas con párrafos.
- Usar capturas de Classroom solo si son propias, autorizadas, anonimizadas y necesarias.
- Usar capturas de EduRoom obtenidas desde Render y registradas en [`18-capturas-eduroom-render.md`](18-capturas-eduroom-render.md).
- Presentar fechas junto a los resultados de prueba y aclarar que reflejan una ejecución, no una garantía absoluta.

## Diapositiva 1 — EduRoom reconstruye flujos, no identidad propietaria

### Bullets visibles

- Ingeniería inversa ética de Google Classroom
- Réplica académica independiente
- [Deploy](https://eduroom-znb0.onrender.com) · [GitHub](https://github.com/juan-p0422/proyecto_ING-INV)

### Qué mostrar en pantalla

Portada limpia con una captura propia del dashboard de EduRoom en un marco de navegador. No usar imágenes ni marca de Google.

### Qué decir oralmente

> EduRoom es el resultado de observar flujos funcionales de una plataforma educativa y reconstruirlos con arquitectura, código e identidad propios. La aplicación se puede verificar en Render y toda la trazabilidad está en GitHub.

### Evidencia relacionada

- [Dashboard de EduRoom](../evidence/ui/eduroom/dashboard-1280x720.png)
- [Reporte final integrado](17-reporte-final-integrado.md)

---

## Diapositiva 2 — El examen exigía analizar, reconstruir y proteger

### Bullets visibles

- Aplicación no open source
- Estructuras, tecnologías, datos y comportamiento
- Réplica funcional, protección y demostración

### Qué mostrar en pantalla

Una secuencia simple de cinco verbos: **analizar → inferir → diseñar → implementar → validar**.

### Qué decir oralmente

> El reto no terminaba en describir una interfaz. Había que analizar una aplicación propietaria de forma legítima, reconstruir un modelo conceptual, implementar los flujos y documentar controles como cifrado, ofuscación y checksums.

### Evidencia relacionada

- [Índice documental](00-indice.md)
- [Matriz de la consigna](17-reporte-final-integrado.md#33-correspondencia-con-la-consigna)

---

## Diapositiva 3 — Caja negra define un límite ético verificable

### Bullets visibles

- Sí: fuentes públicas, cuentas controladas, uso normal
- No: decompilación, bypass, explotación o carga
- Observación ≠ implementación interna

### Qué mostrar en pantalla

Dos columnas, “Dentro del alcance” y “Fuera del alcance”, con iconos genéricos propios.

### Qué decir oralmente

> Se observaron únicamente interfaces, documentación pública y comportamiento generado por cuentas autorizadas. No se accedió a código de Google, no se vulneró el servicio y no se automatizaron pruebas contra Classroom. Las inferencias se mantienen separadas de los hechos observables.

### Evidencia relacionada

- [Marco teórico](01-marco-teorico.md)
- [Análisis dinámico](04-analisis-dinamico.md)

---

## Diapositiva 4 — La metodología conecta observación con evidencia

### Bullets visibles

- OSINT y observación funcional
- Análisis dinámico y reconstrucción conceptual
- Implementación, protección y pruebas

### Qué mostrar en pantalla

Flujo horizontal: `OSINT → caja negra → análisis dinámico → modelo → EduRoom → protección → QA`.

### Qué decir oralmente

> Cada etapa produce una salida concreta: las fuentes públicas acotan el contexto; la observación identifica flujos; el navegador aporta evidencia dinámica; el modelo organiza entidades; y la implementación se valida con pruebas y documentación.

### Evidencia relacionada

- [Herramientas utilizadas](03-herramientas-utilizadas.md)
- [Metodología integrada](17-reporte-final-integrado.md#8-metodología)

---

## Diapositiva 5 — Classroom aportó patrones funcionales, no código

### Bullets visibles

- Cursos, tablón, trabajo de clase y personas
- Tareas, entregas, comentarios y calificaciones
- Entradas, salidas, sesión y memoria observables

### Qué mostrar en pantalla

Una captura propia de Classroom completamente anonimizada junto a un mapa de flujos. Si no existe una captura autorizada, mostrar solo el mapa y el marcador **[INSERTAR CAPTURA AUTORIZADA]**.

### Qué decir oralmente

> Los flujos principales permitieron identificar entradas como credenciales, códigos, textos, archivos y notas; y salidas como estados, listados y retroalimentación. Network, Application, Performance y Memory ayudan a estudiar el comportamiento del navegador, pero no revelan el esquema interno del servicio.

### Evidencia relacionada

- [Análisis de Google Classroom](02-analisis-google-classroom.md)
- [Comparativo de interfaz](16-comparativo-ui.md)

---

## Diapositiva 6 — El dominio reconstruido organiza el flujo educativo

### Bullets visibles

- User · Course · Enrollment
- Assignment · Submission · Comment
- Grade conceptual · Attachment

### Qué mostrar en pantalla

Diagrama entidad–relación: `User ↔ Enrollment ↔ Course → Assignment → Submission`, con Comment y Attachment conectados a su contexto.

### Qué decir oralmente

> Este modelo es una reconstrucción propia. Enrollment separa la identidad de la pertenencia a un curso. Assignment y Submission representan la actividad y su entrega. Grade no es una tabla independiente en EduRoom: la evaluación se implementa dentro de Submission con nota, feedback y estado.

### Evidencia relacionada

- [Reconstrucción de estructuras](05-reconstruccion-estructuras.md)
- [Esquema Prisma](../backend/prisma/schema.prisma)

---

## Diapositiva 7 — EduRoom usa una arquitectura web de tres capas

### Bullets visibles

- React + TypeScript + Vite
- Express + Prisma + Zod
- PostgreSQL en Render; código y documentación en GitHub

### Qué mostrar en pantalla

Diagrama: **Navegador → API REST `/api` → PostgreSQL**, con Render alrededor del servicio y GitHub como repositorio de entrega.

### Qué decir oralmente

> El frontend gestiona vistas y navegación; el backend aplica autenticación, autorización, validación y reglas del dominio; Prisma conecta con PostgreSQL. Render publica la aplicación y GitHub conserva la fuente reproducible y su memoria técnica.

### Evidencia relacionada

- [Diseño de la réplica](06-diseno-replica.md)
- [Configuración Render](../render.yaml)
- [Docker Compose](../docker-compose.yml)

---

## Diapositiva 8 — Dos roles recorren el mismo curso con permisos distintos

### Bullets visibles

- Profesor: crea, publica y califica
- Estudiante: se une, consulta y entrega
- Ambos: participan mediante comentarios autorizados

### Qué mostrar en pantalla

Dos carriles de proceso convergentes en Course: profesor arriba, estudiante abajo.

### Qué decir oralmente

> La correspondencia funcional se demuestra en un único ciclo: el profesor crea el espacio y la actividad; el estudiante se inscribe y entrega; el profesor evalúa; ambos consultan el resultado según su autorización.

### Evidencia relacionada

- [Tablón del curso](../evidence/ui/eduroom/course-stream-1280x720.png)
- [Vista de personas](../evidence/ui/eduroom/people-1280x720.png)

---

## Diapositiva 9 — La demo empieza con el flujo del profesor

### Bullets visibles

- Login con cuenta sintética
- Crear curso y anuncio
- Crear tarea “Mapa de arquitectura”

### Qué mostrar en pantalla

Cambiar del modo presentación al perfil del profesor. Mantener esta diapositiva como respaldo si Render tarda.

### Qué decir oralmente

> Crearé un curso nuevo, publicaré un anuncio y definiré una tarea. Estas acciones requieren rol de profesor y, para los recursos del curso, ser su propietario.

### Evidencia relacionada

- [Login](../evidence/ui/eduroom/login-1280x720.png)
- [Trabajo de clase](../evidence/ui/eduroom/classwork-1280x720.png)

---

## Diapositiva 10 — La entrega prueba el cambio de rol y de permisos

### Bullets visibles

- Estudiante se une mediante código
- Consulta la tarea y envía contenido sintético
- No puede crear tareas ni calificar

### Qué mostrar en pantalla

Perfil separado del estudiante: dashboard, curso, detalle de tarea y entrega.

### Qué decir oralmente

> El estudiante entra con otra sesión, usa el código temporal y registra su entrega. La interfaz y la API limitan las acciones según el rol y la membresía. Las pruebas defensivas confirmaron respuestas 403 en operaciones reservadas al profesor.

### Evidencia relacionada

- [Detalle de tarea](../evidence/ui/eduroom/assignment-detail-1280x720.png)
- [Entrega](../evidence/ui/eduroom/assignment-submission-1280x720.png)

---

## Diapositiva 11 — La calificación cierra el ciclo de extremo a extremo

### Bullets visibles

- Profesor revisa la entrega
- Asigna nota y retroalimentación
- Salud, integridad y repositorio cierran la demo

### Qué mostrar en pantalla

Volver al perfil del profesor; después abrir las pestañas preparadas de `/api/health`, `/api/security/integrity` y GitHub.

### Qué decir oralmente

> El profesor asigna la nota y el feedback; el estado pasa a calificado. Después muestro los endpoints públicos de salud e integridad y la documentación que permite repetir la prueba.

### Evidencia relacionada

- [Entrega calificada](../evidence/ui/eduroom/assignment-graded-1280x720.png)
- [Estado de integridad](../evidence/ui/eduroom/integrity-1280x720.png)

---

## Diapositiva 12 — Cada control de seguridad resuelve un problema distinto

### Bullets visibles

- JWT, bcrypt y autorización por rol
- AES-256-GCM para datos recuperables
- SHA-256, ofuscación y antireversing educativo

### Qué mostrar en pantalla

Tabla breve `Control | Objetivo | Límite`: identidad, contraseñas, confidencialidad, integridad y dificultad de lectura.

### Qué decir oralmente

> JWT identifica la sesión; bcrypt aplica hash a contraseñas; AES-GCM cifra notas seguras; SHA-256 detecta cambios en artefactos cubiertos; y la ofuscación dificulta lectura casual. No son equivalentes ni infalibles. La auditoría conserva riesgos abiertos como el alta pública de docentes y el token en localStorage.

### Evidencia relacionada

- [Seguridad y antireversing](07-seguridad-antireversing.md)
- [Checksum](08-checksum.md)
- [Cifrado y ofuscación](09-cifrado-ofuscacion.md)
- [Análisis de vulnerabilidades](15-analisis-vulnerabilidades.md)

---

## Diapositiva 13 — Las pruebas respaldan la demo y también revelan límites

### Bullets visibles

- API Render: **26/26** solicitudes aprobadas
- Seguridad defensiva: **14/14** comprobaciones aprobadas
- UI: **27** capturas; una advertencia responsive

### Qué mostrar en pantalla

Tres cifras grandes con fecha `14–15 de agosto de 2026`; debajo: “resultado de escenarios probados, no garantía de ausencia de defectos”.

### Qué decir oralmente

> Las pruebas fueron secuenciales, de bajo volumen y con datos sintéticos. La API completó 26 solicitudes; el control defensivo, 14 comprobaciones; y Playwright generó nueve flujos en tres viewports. Se documentó un overflow de 32 píxeles en el login de tableta, lo cual demuestra que la evidencia también sirve para encontrar mejoras.

### Evidencia relacionada

- [Pruebas API en Render](14-pruebas-api-render.md)
- [Pruebas defensivas](15-analisis-vulnerabilidades.md)
- [Capturas automatizadas](18-capturas-eduroom-render.md)

---

## Diapositiva 14 — La correspondencia es funcional, no pixel a pixel

### Bullets visibles

- Coinciden jerarquía, navegación y flujo educativo
- Cambian marca, estilos, recursos y decisiones técnicas
- Resultados funcionales con limitaciones explícitas

### Qué mostrar en pantalla

Par visual autorizado del mismo flujo. Classroom debe estar anonimizado; EduRoom debe provenir de Render. Incluir al pie:

> La comparación no pretende equivalencia pixel a pixel, sino correspondencia de flujos, jerarquía y comportamiento de interfaz.

### Qué decir oralmente

> Se compara la estructura de interacción, no la apariencia propietaria. EduRoom conserva patrones generales de una plataforma LMS con identidad independiente. No se afirma haber replicado la arquitectura interna y se reconocen límites en ofuscación, checksums, sesiones y responsive.

### Evidencia relacionada

- [Comparativo visual](16-comparativo-ui.md)
- [Comparativo listo para PDF](pdf/comparativo-ui-print.md)
- [Conclusiones](11-conclusiones.md)

---

## Diapositiva 15 — Comprender cómo se observa ayuda a construir y proteger

### Bullets visibles

- Observación ética → requisitos verificables
- Arquitectura independiente → réplica funcional
- Protección + QA → evidencia y mejora continua

### Qué mostrar en pantalla

Síntesis de **analizar, construir, proteger**, con las URL del deploy y el repositorio. No cerrar solo con “Gracias”.

### Qué decir oralmente

> El aprendizaje principal es que la ingeniería inversa ética puede traducir comportamiento externo en requisitos sin acceder a propiedad ajena. EduRoom materializa esos requisitos con código propio y el análisis defensivo muestra que construir y proteger son actividades conectadas. El resultado no es una copia, sino una demostración académica independiente y verificable.

### Evidencia relacionada

- [EduRoom en Render](https://eduroom-znb0.onrender.com)
- [Repositorio](https://github.com/juan-p0422/proyecto_ING-INV)
- [Reporte final integrado](17-reporte-final-integrado.md)

## 19.2 Notas de montaje

- Reservar unos 30 segundos para la portada, 3 minutos y 10 segundos para la demo y 30–40 segundos para cada lámina analítica.
- Usar “Qué decir oralmente” como notas del presentador, no como contenido visible.
- Mantener dos perfiles de navegador y las pestañas de salud e integridad abiertas antes de empezar.
- Si Render está lento, continuar con capturas y ejecutar el flujo local preparado; el plan está en [`12-guion-presentacion.md`](12-guion-presentacion.md).
- Si no hay capturas autorizadas de Classroom, no sustituirlas por material descargado. Presentar el diagrama funcional y declarar la ausencia.
- No proyectar contraseñas, JWT, archivos `.env`, códigos activos, paneles de infraestructura ni datos personales.

## 19.3 Lista de evidencia mínima

- [ ] Captura propia y anonimizada de la referencia observada, o marcador ético de ausencia.
- [ ] Dashboard, curso, trabajo de clase, entrega y calificación de EduRoom.
- [ ] Respuesta de `/api/health`.
- [ ] Respuesta de `/api/security/integrity`.
- [ ] Resumen del smoke test y de las pruebas defensivas.
- [ ] Diagrama del modelo de datos.
- [ ] Diagrama de arquitectura.
- [ ] Repositorio accesible o clon local preparado.
