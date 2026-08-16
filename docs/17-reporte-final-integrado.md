---
title: "EduRoom: reporte final integrado"
subtitle: "Ingeniería inversa ética de Google Classroom y réplica académica independiente"
author: "Juan Pantoja"
date: "Agosto de 2026"
lang: es-MX
geometry: margin=2.2cm
toc: true
numbersections: false
---

<div style="text-align:center; margin-top:12%;">

# EduRoom

## Reporte final integrado de ingeniería inversa ética

**Aplicación analizada:** Google Classroom  
**Producto académico independiente:** EduRoom  
**Tipo de análisis:** caja negra, OSINT y análisis dinámico no invasivo  
**Asignatura:** Ingeniería inversa  
**Tipo de entrega:** examen práctico  
**Autor:** Juan Pantoja  
**Fecha:** agosto de 2026

[Repositorio del proyecto](https://github.com/juan-p0422/proyecto_ING-INV)  
[Aplicación desplegada en Render](https://eduroom-znb0.onrender.com)

</div>

> **Declaración de independencia:** EduRoom no es un producto de Google, no está afiliado con Google y no incorpora código, logos, activos, textos comerciales ni recursos visuales de Google. Las menciones a Google Classroom identifican únicamente la aplicación propietaria observada con fines académicos.

<div style="page-break-after: always;"></div>

## Resumen ejecutivo

Este reporte documenta un ejercicio académico de ingeniería inversa ética aplicado a una aplicación no open source. Google Classroom fue estudiado mediante información pública, observación funcional autorizada y un protocolo de análisis dinámico no invasivo desde el navegador. No se accedió a código, bases de datos, infraestructura o información privada de Google. Las estructuras descritas para el objeto analizado son modelos conceptuales inferidos, no afirmaciones sobre su implementación interna.

El conocimiento funcional se transformó en EduRoom, una aplicación web independiente con roles de profesor y estudiante, cursos, anuncios, tareas, entregas, comentarios, calificaciones y retroalimentación. La réplica se implementó con React, Express, TypeScript, Prisma y PostgreSQL; se desplegó en Render y se protegió con autenticación JWT, bcrypt, validación Zod, autorización en servidor, AES-256-GCM para notas seleccionadas, ofuscación del frontend, checksum SHA-256 y diagnóstico antidebug no destructivo.

La validación documentada comprende 11 pruebas automatizadas locales, 26 solicitudes API aprobadas contra Render, 14 controles defensivos aprobados y 27 capturas Playwright de EduRoom. El análisis también registra limitaciones y riesgos: autoasignación pública del rol docente, JWT en `localStorage`, falta de revocación, manifiesto no firmado, integridad no estricta en Render y un desbordamiento de 32 px en el login de tableta.

---

## 1. Portada

| Campo | Valor |
|---|---|
| Nombre del proyecto | **EduRoom** |
| Aplicación analizada | **Google Classroom** |
| Tipo de análisis | **Caja negra, OSINT y análisis dinámico no invasivo** |
| Producto resultante | Réplica académica independiente de funciones generales de un LMS |
| Repositorio | [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV) |
| Deploy | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |
| Documento rector | `docs/17-reporte-final-integrado.md` |
| Evidencias | `evidence/ui/eduroom/` y checklist en `docs/13-evidencias.md` |

**[INSERTAR CAPTURA: portada académica o captura anonimizada del dashboard de EduRoom]**

---

## 2. Introducción

La ingeniería inversa forma una de las herramientas más importantes en el ambiente profesional moderno, siendo utilizada en múltiples contextos industriales. Asimismo, forma una de las disciplinas más esenciales para el desarrollo de sistemas de software.

En software, la ingeniería inversa permite pasar de un comportamiento observable a una descripción de requisitos, estados, relaciones y decisiones de diseño. Puede apoyar interoperabilidad, migración, mantenimiento, aseguramiento de calidad, análisis de riesgos y aprendizaje arquitectónico. Su aplicación legítima exige una delimitación previa: autorización, minimización de datos, respeto a propiedad intelectual y ausencia de técnicas que eludan controles.

Este proyecto toma Google Classroom como aplicación propietaria de referencia. Su estudio se limita a documentación pública, pantallas visibles y acciones realizadas por una cuenta controlada. A partir de los flujos observables se reconstruye un dominio educativo conceptual y se desarrolla EduRoom, una implementación original que demuestra el ciclo completo de observación, modelado, construcción, protección, prueba y despliegue.

La réplica no pretende reemplazar ni reproducir exactamente Google Classroom. Su finalidad es demostrar que patrones generales como cursos, participantes, tareas, entregas y evaluación pueden identificarse y materializarse de forma independiente y ética.

---

## 3. Objetivos

### 3.1 Objetivo general

Desarrollar y demostrar un procedimiento académico completo de ingeniería inversa ética sobre una aplicación externa no open source, construir una réplica funcional independiente y aplicar medidas defensivas que permitan estudiar integridad, confidencialidad y resistencia básica al análisis del producto propio.

### 3.2 Objetivos específicos

- Desarrollar y demostrar los procedimientos para la ingeniería inversa tanto para un objetivo externo como para proteger un proyecto propio de ser analizado.
- Demostrar el procedimiento para realizar análisis dinámicos de software.
- Desarrollar un análisis de vulnerabilidades.
- Demostrar la reconstrucción de estructuras de datos y patrones de información en aplicaciones.
- Demostrar técnicas antireversing.
- Implementar cifrados y checksums en productos de software.
- Identificar tecnologías, entradas, salidas, estados y uso general de memoria desde el navegador.
- Construir una réplica fiable de los flujos académicos esenciales sin copiar código o identidad visual.
- Validar el producto mediante pruebas locales, API, defensivas, visuales y de integridad.
- Preparar una demostración presencial reproducible con evidencias anonimizadas.

### 3.3 Correspondencia con la consigna

| Instrucción académica | Respuesta del proyecto | Evidencia principal |
|---|---|---|
| Tomar una aplicación no open source | Google Classroom | [Análisis de caja negra](02-analisis-google-classroom.md) |
| Reconstruir estructuras, tecnologías, entradas/salidas y memoria | Modelo conceptual y protocolo dinámico | [Análisis dinámico](04-analisis-dinamico.md), [estructuras](05-reconstruccion-estructuras.md) |
| Crear una réplica fiable | EduRoom full-stack | [Diseño](06-diseno-replica.md), deploy público |
| Implementar cifrado u ofuscación | AES-256-GCM y ofuscación JavaScript | [Cifrado y ofuscación](09-cifrado-ofuscacion.md) |
| Implementar checksum previo a ejecución | Manifest SHA-256 y verificación de arranque | [Checksum](08-checksum.md) |
| Presentar presencialmente | Guion, checklist y capturas | [Guion](12-guion-presentacion.md), [evidencias](13-evidencias.md) |

---

## 4. Alcance y límites éticos

### 4.1 Qué se analizó

- información pública y documentación oficial de Google Classroom;
- pantallas y flujos accesibles mediante una cuenta controlada;
- acciones legítimas de creación, consulta, entrega y calificación con datos sintéticos;
- metadatos generales de solicitudes originadas por acciones propias;
- almacenamiento del navegador, rendimiento y memoria desde una perspectiva general;
- código, arquitectura, configuración y despliegue de EduRoom, por ser un producto propio.

### 4.2 Qué no se hizo

- evasión de autenticación, bypass de autorización o escalamiento de privilegios;
- explotación, fuerza bruta, fuzzing, escaneo activo o denegación de servicio;
- scraping masivo o recopilación de información de terceros;
- descompilación, desensamblado o extracción de código propietario;
- acceso a bases de datos, servidores, secretos, tokens o infraestructura de Google;
- pruebas de vulnerabilidades contra Google Classroom;
- copia de logos, iconos, paletas exactas, textos comerciales, capturas integradas o activos protegidos.

### 4.3 Por qué no se vulneró ni se copió código propietario

El método se diseñó como caja negra: se estudian entradas, salidas, estados y relaciones visibles sin intentar obtener la implementación. El resultado es una especificación funcional propia. EduRoom se escribió desde cero con un stack elegido por el autor y no contiene elementos que permitan confundirlo con un producto oficial.

### 4.4 Protección de datos personales

- se usan cuentas y contenido sintéticos;
- correos de automatización pertenecen al dominio reservado `example.com`;
- tokens, contraseñas, códigos e identificadores no se imprimen en reportes;
- capturas de Google Classroom deben anonimizar nombres, correos, fotos, códigos y archivos;
- los originales sensibles no deben incorporarse al repositorio;
- la evidencia final anonimizada debe recibir un checksum SHA-256.

> **Criterio de detención:** si una prueba requiere datos ajenos, evasión de controles, carga agresiva o una acción no autorizada, no se ejecuta.

---

## 5. Marco teórico

### 5.1 Ingeniería inversa

Proceso de comprensión de un sistema existente a partir de sus artefactos o comportamiento. En caja negra, la atención se centra en entradas, salidas, estados, restricciones y efectos observables.

### 5.2 Análisis estático

Examina artefactos sin ejecutar el objetivo: documentación pública, HTML entregado, cabeceras visibles, archivos propios, configuración y esquemas. Sobre Google Classroom se limita a información pública; sobre EduRoom incluye revisión completa del repositorio.

### 5.3 Análisis dinámico

Estudia el sistema durante la ejecución. DevTools permite relacionar una acción autorizada con solicitudes, almacenamiento, uso del hilo principal y memoria. Una medición aislada no demuestra una fuga ni revela la infraestructura del servidor.

### 5.4 OSINT

Open Source Intelligence reúne información disponible públicamente. En este proyecto se utiliza para contextualizar funciones, plataformas y documentación oficial. No equivale a enumerar activos privados ni autoriza intrusión.

### 5.5 Reconstrucción de estructuras

Convierte comportamiento en entidades, atributos, relaciones, estados y reglas. El modelo resultante es una hipótesis útil para construir EduRoom; no se presenta como la base de datos interna de Google Classroom.

### 5.6 Antireversing

Conjunto de técnicas que elevan el costo de análisis o detectan condiciones anómalas. En EduRoom se limita a ofuscación, integridad y diagnóstico ambiental no destructivo. No intenta impedir herramientas legítimas ni utiliza evasión del sistema.

### 5.7 Checksums y SHA-256

Un checksum resume bytes para detectar cambios. SHA-256 genera un resumen de 256 bits; una modificación normalmente produce un valor diferente. Un hash sin firma no autentica autoría: si el manifiesto y el archivo pueden sustituirse juntos, ambos pueden recalcularse.

### 5.8 Cifrado

Transforma texto legible en ciphertext mediante una clave. AES-GCM ofrece confidencialidad y autenticidad del mensaje. En EduRoom protege únicamente `SecureNote`; TLS, autorización y gestión de secretos siguen siendo necesarios.

### 5.9 Ofuscación

Transforma código para dificultar su lectura conservando su ejecución. El JavaScript enviado al navegador no puede mantenerse secreto; por ello, la ofuscación es una barrera de esfuerzo y no un control de acceso.

### 5.10 Seguridad en aplicaciones web

La seguridad web depende de controles complementarios: autenticación, autorización, validación, sesiones, cifrado, configuración, dependencias, registros e integridad. OWASP Top 10 se usa como marco de concientización, no como certificación de cobertura total.

El desarrollo conceptual ampliado está en [01-marco-teorico.md](01-marco-teorico.md).

---

## 6. Aplicación objetivo: Google Classroom

### 6.1 Descripción pública

Google Classroom es una plataforma propietaria de Google Workspace for Education orientada a organizar experiencias de enseñanza y aprendizaje. La información oficial describe creación de clases, trabajo académico, comunicación, entrega, evaluación y retroalimentación.

### 6.2 Funciones principales observables

| Área | Comportamiento público general |
|---|---|
| Clases | Creación, unión, listado y contexto persistente |
| Tablón | Publicaciones y comunicación del curso |
| Trabajo de clase | Tareas, materiales, preguntas y organización temática |
| Entregas | Asociación entre estudiante, actividad y estado |
| Evaluación | Puntuación, devolución y retroalimentación |
| Personas | Docentes y estudiantes vinculados a una clase |
| Integraciones | Servicios de Workspace y herramientas educativas, según edición |

### 6.3 Usuarios

- **Docente:** organiza clases, publica trabajo, consulta entregas y evalúa.
- **Estudiante:** se incorpora a clases, consulta actividades, entrega y recibe retroalimentación.
- **Administrador o tutor:** existen funciones públicas adicionales según cuenta y edición, pero no forman parte del núcleo reconstruido.

### 6.4 Flujos observados

```text
Docente: acceso -> clase -> publicación/tarea -> revisión -> calificación
Estudiante: acceso -> clase -> tarea -> entrega -> resultado
```

**[INSERTAR CAPTURA: lista de clases autorizada y anonimizada]**  
**[INSERTAR CAPTURA: tablón con contenido sintético]**  
**[INSERTAR CAPTURA: tarea y entrega sin datos personales]**

### 6.5 Tecnologías inferidas

El análisis no confirma frameworks, lenguajes, bases de datos o servicios internos de Google. Solo pueden registrarse señales de alto nivel:

- aplicación web accesible desde navegador moderno;
- comunicación HTTPS y recursos cliente-servidor;
- interfaz dinámica con cambios de estado sin recarga total en varios flujos;
- integración pública con cuentas y productos de Google Workspace;
- persistencia de sesión y almacenamiento gestionados por mecanismos que no se inspeccionaron internamente.

Toda detección mediante Wappalyzer o una herramienta similar debe etiquetarse como **inferencia probabilística**, con fecha, señal y nivel de confianza.

### 6.6 Entradas y salidas

| Flujo | Entradas del usuario | Salidas visibles |
|---|---|---|
| Acceso | identidad y credenciales gestionadas por Google | sesión o mensaje de error |
| Clase | selección, invitación o código autorizado | espacio de clase y navegación |
| Publicación | texto, destinatarios y configuración | entrada visible en el flujo |
| Tarea | título, instrucciones, fecha, recursos | actividad publicada y estado |
| Entrega | contenido o archivo autorizado | confirmación y estado de entrega |
| Evaluación | nota y feedback | resultado visible para el estudiante |

### 6.7 Almacenamiento y sesiones de forma conceptual

La sesión puede observarse únicamente desde las áreas estándar del navegador y sin copiar valores sensibles. Cookies, almacenamiento local, caché y service workers se registran por categoría, propósito aparente y cambios generales. No se publican nombres completos, valores, tokens ni mecanismos internos inferidos sin evidencia.

### 6.8 Uso general de memoria desde navegador

El procedimiento compara una línea base con ciclos repetidos de navegación y, cuando esté disponible, recolección de basura. Se observan tamaño del heap, nodos DOM, listeners y retención entre snapshots. Solo una tendencia reproducible y explicable permitiría formular una hipótesis de fuga; no se obtuvieron métricas de memoria de servidores de Google.

El análisis detallado está en [02-analisis-google-classroom.md](02-analisis-google-classroom.md).

---

## 7. Herramientas

| Herramienta | Función | Uso o estado en el proyecto |
|---|---|---|
| Navegador | Ejecutar y observar interfaces web | Usado en observación autorizada y QA de EduRoom |
| DevTools | Network, Application, Performance, Memory y accesibilidad | Protocolo documentado; evidencias sensibles deben censurarse |
| Lighthouse | Rendimiento, accesibilidad y buenas prácticas | Herramienta propuesta para línea base propia; no se atribuyen métricas no registradas |
| Wappalyzer o similar | Inferencia tecnológica por señales públicas | Uso conceptual; cualquier resultado sobre terceros es probabilístico |
| OWASP ZAP pasivo | Observar alertas sobre tráfico autorizado | Solo modo pasivo/local si se ejecuta; no se usó escaneo activo contra terceros |
| Postman | Ejercitar y documentar API propia | Colección de 23 solicitudes en `tests/` |
| Node.js `fetch` | Automatización de contratos HTTP | Smoke test de 26 solicitudes y control defensivo de 14 |
| Playwright | Captura visual automatizada | 27 capturas de EduRoom; nunca abre Google Classroom |
| Docker/Compose | Entorno reproducible | Backend, frontend y PostgreSQL |
| Git/GitHub | Versionado y trazabilidad | Repositorio, commits y revisión de cambios |
| Render | Deploy administrado | Servicio web Node y PostgreSQL |
| Node.js/TypeScript | Runtime y lenguaje | Backend, scripts y validación estática |
| Express | API REST y middleware | Rutas, errores, seguridad y archivos estáticos |
| React/Vite | Interfaz y build | SPA original y responsive |
| Prisma | Modelo, migraciones y cliente tipado | Esquema relacional y acceso PostgreSQL |
| PostgreSQL | Persistencia | Usuarios, cursos, actividad y notas seguras |
| SHA-256 | Integridad | `node:crypto`, scripts PowerShell/Bash y manifest JSON |
| `javascript-obfuscator` | Ofuscación | Transformación educativa del build frontend |
| Vitest | Pruebas automatizadas | 9 casos backend y 2 frontend |

Las configuraciones y limitaciones están en [03-herramientas-utilizadas.md](03-herramientas-utilizadas.md).

---

## 8. Metodología

| Fase | Procedimiento | Producto |
|---|---|---|
| 1. Reconocimiento público | Consultar fuentes oficiales y delimitar alcance | Contexto y bibliografía |
| 2. Observación funcional | Recorrer acciones legítimas con datos sintéticos | Inventario de pantallas, roles y estados |
| 3. Análisis dinámico | Network, Application, Performance y Memory | Bitácoras y capturas anonimizadas |
| 4. Reconstrucción | Inferir entidades, relaciones y reglas | Modelo conceptual |
| 5. Diseño | Elegir arquitectura, identidad y límites | Especificación de EduRoom |
| 6. Implementación | Construir API, SPA y persistencia | Aplicación funcional |
| 7. Pruebas | Unitarias/integración, API, defensivas y visuales | Resultados reproducibles |
| 8. Protección | Cifrado, checksum, ofuscación y diagnóstico | Controles educativos documentados |
| 9. Despliegue | Migraciones, secretos y healthcheck en Render | URL pública |
| 10. Presentación | Guion, contingencia y evidencias | Demostración presencial |

En cada fase se separan tres clases de afirmación:

- **Observación:** hecho visible o respuesta reproducible.
- **Inferencia:** explicación plausible con nivel de certeza limitado.
- **Implementación propia:** decisión comprobable dentro del repositorio de EduRoom.

---

## 9. Análisis dinámico

### 9.1 Procedimiento

1. Preparar una cuenta controlada y contenido sintético.
2. Registrar fecha, zona horaria, navegador, versión, rol y precondición.
3. Abrir DevTools antes de la acción.
4. Ejecutar una sola acción funcional.
5. Registrar únicamente método, tipo, estado, tiempo, tamaño y efecto visible.
6. Sanitizar identificadores, cuerpos, cookies, tokens y rutas privadas.
7. Repetir solo si se necesita confirmar un patrón.
8. Calcular SHA-256 de la evidencia anonimizada.

### 9.2 Network

Se correlacionan acciones con solicitudes Fetch/XHR, documentos y recursos. Se observan códigos HTTP y tiempos generales sin inferir endpoints internos no demostrados ni conservar headers sensibles.

**[INSERTAR CAPTURA: Network censurado con columnas de tipo, estado, tiempo y tamaño]**

### 9.3 Application

Se inventarían cookies, Local Storage, Session Storage, Cache Storage y service workers por categoría. Los valores se ocultan. En EduRoom se confirmó que el JWT se guarda en `localStorage`, decisión que se registra como riesgo frente a XSS.

**[INSERTAR CAPTURA: categorías de almacenamiento sin valores]**

### 9.4 Performance

Se registra una navegación representativa para observar tareas largas, scripting, layout y pintura. Las cifras dependen del equipo y red; deben acompañarse de contexto y no generalizarse a la infraestructura del proveedor.

**[INSERTAR CAPTURA: traza Performance con datos personales ausentes]**

### 9.5 Memory

Se comparan snapshots antes y después de repetir un flujo. Una subida temporal puede deberse a caché o recolección diferida. Solo la retención sostenida de objetos ya inaccesibles justificaría una hipótesis de fuga.

**[INSERTAR CAPTURA: resumen de heap sin contenido sensible]**

### 9.6 Evidencias sugeridas

| ID | Evidencia | Criterio |
|---|---|---|
| EV-09-01 | Network | Acción propia y columnas sanitizadas |
| EV-09-02 | Application | Categorías, nunca tokens o valores |
| EV-09-03 | Performance | Equipo, fecha, duración y flujo |
| EV-09-04 | Memory | Línea base y repetición comparable |
| EV-09-05 | Bitácora | Observación separada de inferencia |

### 9.7 Limitaciones

No se midió memoria de servidores, no se obtuvo una vista de procesos internos y no se ejecutó instrumentación invasiva. El protocolo completo está en [04-analisis-dinamico.md](04-analisis-dinamico.md).

---

## 10. Análisis de vulnerabilidades

### 10.1 Metodología OWASP

OWASP Top 10:2021 se aplicó al código y despliegue propios. Google Classroom no fue probado. La revisión cubrió autenticación, autorización, validación, errores, exposición, JWT, CORS, dependencias, integridad y cifrado.

### 10.2 Tabla de riesgos prioritarios

| ID | Hallazgo | Severidad | Evidencia | Mitigación recomendada | Estado |
|---|---|---|---|---|---|
| V-01 | Registro público permite seleccionar `TEACHER` | Alta | `backend/src/routes/auth.ts` | Alta docente por invitación/aprobación | Abierto |
| V-02 | JWT persistido en `localStorage` | Alta | `frontend/src/services/api.ts` | Cookie `HttpOnly`, `Secure`, `SameSite`; CSP | Abierto |
| V-03 | Sin revocación o refresh rotatorio | Media | JWT autocontenido por 8 h | Ciclo corto y revocable | Abierto |
| V-04 | Código de curso no expira | Media | `/api/courses/join` | Rotación, expiración y aprobación | Abierto |
| V-05 | Manifiesto SHA-256 no firmado | Media | `integrity-manifest.json` | Firma o attestation del pipeline | Parcial |
| V-06 | `STRICT_INTEGRITY=false` en Render | Media | `render.yaml` | Activar tras validar pipeline y recuperación | Abierto |
| V-07 | Clave AES única sin rotación | Media | `APP_ENCRYPTION_KEY` | KMS, identificador y recifrado | Abierto |
| V-08 | Sin auditoría estructurada | Media | ausencia de eventos persistentes | Logs sanitizados y alertas | Abierto |
| V-09 | Dependencias futuras vulnerables | Variable | ecosistema npm | Auditoría y actualización continua | Mitigado actualmente |
| V-10 | Adjuntos futuros pueden introducir SSRF/malware | Media futura | modelo sin carga activa | Diseño seguro antes de implementar | No aplicable hoy |

### 10.3 Controles observados

- bcrypt con coste 12;
- JWT firmado y expirable;
- validación Zod y límites de longitud;
- Prisma para consultas estructuradas;
- autorización por rol, membresía y docente propietario;
- Helmet, CORS allowlist y JSON limitado a 100 KiB;
- rate limit en `/api/auth`;
- errores genéricos sin stack trace al cliente;
- AES-256-GCM para notas seguras;
- verificación SHA-256 de artefactos backend.

### 10.4 Pruebas defensivas

El 14 de agosto de 2026 se ejecutaron 14 controles secuenciales: 14 aprobados y 0 fallidos. Se confirmaron 401 sin token y con JWT inválido, 400 para payload vacío, 403 al crear tarea o calificar como estudiante, ausencia de `passwordHash`, CORS sin autorización para origen ajeno e integridad `verified`.

### 10.5 Limitaciones

No fue un pentest; no hubo fuerza bruta, carga, fuzzing, explotación ni revisión de infraestructura interna. El análisis completo está en [15-analisis-vulnerabilidades.md](15-analisis-vulnerabilidades.md).

---

## 11. Reconstrucción de estructuras de datos

Las siguientes entidades pertenecen a **EduRoom**. Constituyen una reconstrucción funcional propia y no una afirmación sobre el esquema interno de Google Classroom.

### 11.1 User

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `id` | `String`, CUID, PK | Identidad interna |
| `name` | `String` | Nombre visible |
| `email` | `String`, único | Identificación de acceso |
| `passwordHash` | `String` | Hash bcrypt, nunca respuesta pública |
| `role` | `STUDENT` o `TEACHER` | Rol global |
| `createdAt` | `DateTime` | Trazabilidad básica |

### 11.2 Course

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `id` | CUID, PK | Curso |
| `title`, `description` | Texto | Contexto académico |
| `code` | Único | Inscripción por invitación |
| `teacherId` | FK `User` | Docente propietario |
| `color` | Hexadecimal validado | Identidad visual propia |
| `createdAt` | Fecha | Orden y trazabilidad |

### 11.3 Enrollment

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `userId`, `courseId` | FK y unicidad compuesta | Evitar inscripción duplicada |
| `roleInCourse` | `STUDENT`/`TEACHER` | Autorización contextual |
| `createdAt` | Fecha | Momento de incorporación |

### 11.4 Announcement

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `courseId`, `authorId` | FK | Contexto y autor |
| `title`, `content` | Texto validado | Comunicación |
| `createdAt` | Fecha | Flujo cronológico |

### 11.5 Assignment

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `courseId` | FK | Curso propietario |
| `title`, `description` | Texto | Actividad e instrucciones |
| `dueDate` | Fecha opcional | Límite |
| `createdAt` | Fecha | Publicación |

### 11.6 Submission

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `assignmentId`, `studentId` | FK, únicos en conjunto | Una entrega por estudiante/tarea |
| `content` | Texto | Respuesta |
| `status` | `SUBMITTED`/`GRADED` | Estado |
| `grade` | 0-100 opcional | Evaluación |
| `feedback` | Texto opcional | Retroalimentación |
| `submittedAt` | Fecha | Último envío |

### 11.7 Comment

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `courseId`, `authorId` | FK | Curso y autor |
| `assignmentId` | FK opcional | Comentario general o de tarea |
| `content` | Texto validado | Conversación |
| `createdAt` | Fecha | Orden |

### 11.8 Attachment

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `ownerId` | FK | Propietario |
| `courseId`, `assignmentId`, `submissionId` | FK opcionales | Contexto |
| `fileName`, `fileUrl`, `mimeType` | Metadatos | Representación del adjunto |
| `createdAt` | Fecha | Registro |

La entidad está modelada, pero no existe carga binaria ni almacenamiento real de archivos.

### 11.9 SecureNote

| Campo | Tipo/Regla | Propósito |
|---|---|---|
| `ownerId` | FK | Aislamiento por usuario |
| `encryptedPayload` | JSON serializado | Versión, algoritmo, IV, auth tag y ciphertext |
| `createdAt` | Fecha | Registro |

### 11.10 Relaciones principales

```text
User 1 ---- N Course (docente)
User N ---- N Course (mediante Enrollment)
Course 1 -- N Announcement
Course 1 -- N Assignment
Assignment 1 -- N Submission
Course/Assignment 1 -- N Comment
User 1 -- N SecureNote
```

Véase [05-reconstruccion-estructuras.md](05-reconstruccion-estructuras.md) y `backend/prisma/schema.prisma`.

---

## 12. Diseño de EduRoom

### 12.1 Arquitectura general

```text
Navegador
  React + Vite + React Router
          |
          | HTTPS / JSON / Bearer JWT
          v
API Express + TypeScript
  Zod + middleware + reglas de autorización
          |
          | Prisma Client
          v
PostgreSQL
```

En producción, Express sirve la SPA y la API bajo el mismo origen. En desarrollo pueden ejecutarse por separado.

### 12.2 Frontend

- páginas de autenticación, dashboard, tablón, trabajo, personas y tarea;
- componentes y CSS propios;
- navegación protegida con React Router;
- consumo de API mediante `fetch`;
- interfaz adaptable a escritorio, tableta y móvil;
- indicador de integridad en dashboard.

### 12.3 Backend

- API REST Express organizada por recursos;
- TypeScript y manejo uniforme de errores;
- autenticación JWT;
- autorización por rol global, inscripción y propietario;
- validación Zod;
- módulos de cifrado, checksum y diagnóstico.

### 12.4 Base de datos

PostgreSQL aplica claves, unicidad, índices y relaciones. Prisma gestiona esquema, cliente y migraciones. El seed local construye un escenario demostrativo idempotente.

### 12.5 Autenticación y roles

`TEACHER` y `STUDENT` son roles globales; `EnrollmentRole` expresa el rol dentro del curso. La interfaz adapta acciones, pero el backend vuelve a comprobar permisos. Ocultar botones no se considera autorización.

### 12.6 Flujo de profesor

`registro/login -> dashboard -> crear curso -> anuncio -> tarea -> revisar entrega -> calificar y retroalimentar`.

### 12.7 Flujo de estudiante

`registro/login -> unirse con código -> consultar curso -> abrir tarea -> entregar -> consultar calificación`.

El diseño ampliado está en [06-diseno-replica.md](06-diseno-replica.md).

---

## 13. Implementación

### 13.1 Tecnologías

| Capa | Tecnologías |
|---|---|
| Frontend | React 19, React Router, Vite, TypeScript y CSS propio |
| Backend | Node.js 20+, Express 4, TypeScript, Zod |
| Seguridad | JWT, bcrypt, Helmet, CORS, rate limiting, `node:crypto` |
| Datos | Prisma 6 y PostgreSQL |
| Pruebas | Vitest, Node `fetch`, Postman y Playwright |
| Operación | Docker Compose, GitHub, Render Blueprint |

### 13.2 Endpoints implementados

| Área | Método y ruta | Acceso |
|---|---|---|
| Salud | `GET /api/health` | Público |
| Auth | `POST /api/auth/register` | Público |
| Auth | `POST /api/auth/login` | Público |
| Auth | `GET /api/auth/me` | Autenticado |
| Cursos | `GET /api/courses` | Autenticado |
| Cursos | `POST /api/courses` | Docente global |
| Cursos | `POST /api/courses/join` | Autenticado |
| Cursos | `GET /api/courses/:id` | Integrante |
| Cursos | `GET /api/courses/:id/members` | Integrante |
| Anuncios | `GET /api/courses/:courseId/announcements` | Integrante |
| Anuncios | `POST /api/courses/:courseId/announcements` | Docente propietario |
| Tareas | `GET /api/courses/:courseId/assignments` | Integrante |
| Tareas | `POST /api/courses/:courseId/assignments` | Docente propietario |
| Tareas | `GET /api/assignments/:id` | Integrante; entregas filtradas |
| Entregas | `POST /api/assignments/:id/submit` | Estudiante inscrito |
| Entregas | `PATCH /api/submissions/:id/grade` | Docente propietario |
| Comentarios | `GET /api/courses/:courseId/comments` | Integrante |
| Comentarios | `POST /api/courses/:courseId/comments` | Integrante |
| Seguridad | `GET /api/security/integrity` | Resumen público |
| Seguridad | `POST /api/security/secure-notes` | Autenticado |
| Seguridad | `GET /api/security/secure-notes` | Propietario autenticado |

### 13.3 Modelos y migraciones

El esquema Prisma contiene nueve modelos y migraciones versionadas. `prisma migrate deploy` se ejecuta antes del arranque de producción.

### 13.4 Docker

`docker-compose.yml` define PostgreSQL y la aplicación. El Dockerfile usa etapas para construir frontend/backend y una etapa final de ejecución. Las credenciales del seed son exclusivamente locales.

### 13.5 Render

`render.yaml` declara un servicio web Node y una base PostgreSQL. Los secretos se generan en la plataforma, el cliente usa `/api` y el healthcheck apunta a `/api/health`.

La guía completa está en [10-despliegue-render.md](10-despliegue-render.md).

---

## 14. Seguridad del producto propio

### 14.1 JWT

El token incluye sujeto, correo y rol, se firma con `JWT_SECRET` y expira según `JWT_EXPIRES_IN` (8 h en Render). El middleware rechaza tokens ausentes, inválidos o expirados. Limitación: no existe revocación y el cliente lo guarda en `localStorage`.

### 14.2 bcrypt

Las contraseñas se transforman con bcrypt, coste 12. El backend selecciona campos seguros y no devuelve `passwordHash`.

### 14.3 Control de roles

Las rutas verifican docente global, integrante del curso, rol local y docente propietario. Las entregas del estudiante se filtran por identidad. Riesgo abierto: el registro público acepta el rol docente solicitado.

### 14.4 Validación y errores

Zod valida correo, longitudes, IDs, fechas, color, contenido y calificación 0-100. Express limita JSON a 100 KiB. Los errores internos devuelven un mensaje genérico sin stack trace.

### 14.5 CORS y cabeceras

Render usa `CORS_ORIGIN=self`, `credentials=false` y Helmet. Una prueba con origen ajeno recibió respuesta del servidor, pero no `Access-Control-Allow-Origin`; el navegador es quien aplica CORS. CORS no sustituye autorización.

### 14.6 Cifrado AES-GCM

`SecureNote` usa AES-256-GCM, IV aleatorio de 12 bytes y auth tag de 16 bytes. `scrypt` deriva una clave de 32 bytes desde `APP_ENCRYPTION_KEY`. La manipulación del ciphertext o una clave incorrecta impiden autenticación/descifrado.

### 14.7 Ofuscación frontend

`npm run build:obfuscated` compila y transforma el JavaScript propio mediante `javascript-obfuscator`. No cifra código, no protege secretos y no reemplaza reglas del backend.

### 14.8 Checksum SHA-256

```bash
npm run integrity:generate
npm run integrity:verify
```

El manifiesto registra ruta, hash y tamaño de artefactos. El backend verifica JavaScript de `backend/dist` antes de abrir el puerto y clasifica archivos modificados, ausentes o nuevos. Con `STRICT_INTEGRITY=true` bloquea discrepancias; Render está configurado actualmente en `false`.

### 14.9 Antireversing educativo

El diagnóstico identifica variables de instrumentación y ambiente de producción, emite advertencias y no termina procesos ni modifica el sistema. La combinación de autorización en servidor, ofuscación, checksum y separación de secretos constituye defensa en profundidad limitada.

Véanse [07-seguridad-antireversing.md](07-seguridad-antireversing.md), [08-checksum.md](08-checksum.md) y [09-cifrado-ofuscacion.md](09-cifrado-ofuscacion.md).

---

## 15. Pruebas

### 15.1 Resumen verificable

| Suite | Fecha | Alcance | Resultado |
|---|---|---|---|
| Vitest backend | 14-08-2026 | checksum, cifrado y SPA producción | 9 aprobadas, 0 fallidas |
| Vitest frontend | 14-08-2026 | cliente API | 2 aprobadas, 0 fallidas |
| API Render | 14-08-2026 | todos los 21 endpoints; 26 solicitudes | 26 aprobadas, 0 fallidas |
| Seguridad Render | 14-08-2026 | 14 controles defensivos | 14 aprobados, 0 fallidos |
| UI Render | 14-08-2026 | 9 flujos x 3 viewports | 27 capturas; 1 advertencia responsive |
| Dependencias producción | 14-08-2026 | `npm audit --omit=dev` | 0 advisories backend; 0 frontend |
| Deploy puntual | 14-08-2026 22:31 local | raíz, health e integridad | HTTP 200; `verified`; 19 archivos; 0 discrepancias |

### 15.2 Pruebas locales

```bash
npm test
npm run build
```

Vitest cubre cifrado/descifrado, rechazo de alteración, integridad estricta, salud, entrega SPA y cliente API. La compilación valida TypeScript y genera los artefactos.

### 15.3 Pruebas API en Render

`tests/render-api-smoke-test.js` registra dos cuentas sintéticas y recorre curso, inscripción, anuncio, tarea, entrega, calificación, comentario, nota segura e integridad. No imprime secretos ni ejecuta concurrencia.

### 15.4 Pruebas visuales

`tests/capture-eduroom-ui.js` captura exclusivamente EduRoom en 1280x720, 768x1024 y 390x844. Hallazgo: el login de tableta presenta 32 px de overflow porque la cuadrícula mínima requiere 800 px y el breakpoint se activa en 760 px.

### 15.5 Pruebas de integridad

Se verifica coincidencia del build, detección de modificación y comportamiento estricto en prueba automatizada. La alteración demostrativa debe hacerse sobre una copia local y restaurarse después.

### 15.6 Pruebas defensivas

Se permitieron únicamente casos de bajo impacto: falta/token inválido, entrada vacía, roles incorrectos, `passwordHash`, CORS e integridad. No hubo fuerza bruta, carga o explotación.

Detalles: [pruebas API](14-pruebas-api-render.md), [seguridad](15-analisis-vulnerabilidades.md) y [capturas](18-capturas-eduroom-render.md).

---

## 16. Comparativo visual

La comparación evalúa correspondencia funcional y estructural, no identidad estética. No pretende equivalencia pixel a pixel. EduRoom mantiene nombre, marca, paleta, copy, componentes e iconografía propios.

| Flujo | Correspondencia funcional | Diferencia deliberada |
|---|---|---|
| Login | Acceso y registro | Identidad interna y narrativa propia |
| Dashboard | Colección de cursos y acción por rol | Tarjetas y panel de integridad originales |
| Tablón | Contexto, navegación y publicaciones | Encabezado editorial propio |
| Trabajo | Lista y creación de tareas | Sin temas/rúbricas avanzadas |
| Personas | Separación docente/estudiante | Avatares tipográficos propios |
| Entrega | Estado, envío y actualización | Respuesta textual sin adjuntos binarios |
| Calificación | Nota y feedback | Escala fija 0-100 |
| Integridad | Función propia de EduRoom | Sin equivalente requerido |

Documento completo: [Comparativo visual de interfaces](16-comparativo-ui.md).  
Versión imprimible: [Comparativo listo para PDF](pdf/comparativo-ui-print.md).

![Dashboard móvil de EduRoom](../evidence/ui/eduroom/dashboard-390x844.png)

**[INSERTAR CAPTURA: par manual anonimizado Google Classroom/EduRoom]**

---

## 17. Evidencias

| ID | Evidencia esperada | Ruta o estado |
|---|---|---|
| EV-17-01 | Estructura y commit del repositorio | `[INSERTAR CAPTURA]` |
| EV-17-02 | Observación externa autorizada | `[INSERTAR CAPTURA ANONIMIZADA]` |
| EV-17-03 | Network censurado | `[INSERTAR CAPTURA]` |
| EV-17-04 | Modelo Prisma/relaciones | `backend/prisma/schema.prisma` |
| EV-17-05 | Login/dashboard EduRoom | `evidence/ui/eduroom/` |
| EV-17-06 | Curso, tablón y trabajo | `evidence/ui/eduroom/` |
| EV-17-07 | Personas | `evidence/ui/eduroom/people-1280x720.png` |
| EV-17-08 | Entrega y calificación | `evidence/ui/eduroom/assignment-*.png` |
| EV-17-09 | Integridad verificada | `/api/security/integrity` y captura de dashboard |
| EV-17-10 | Integridad alterada local | `[INSERTAR CAPTURA DE CAMBIO CONTROLADO]` |
| EV-17-11 | Nota cifrada y recuperación | `[INSERTAR CAPTURA SIN CLAVE/CIPHERTEXT COMPLETO]` |
| EV-17-12 | Build ofuscado | `[INSERTAR CAPTURA COMPARATIVA]` |
| EV-17-13 | Smoke test API | salida sanitizada 26/26 |
| EV-17-14 | Seguridad defensiva | salida sanitizada 14/14 |
| EV-17-15 | Capturas UI | 27 PNG y `capture-manifest.json` |
| EV-17-16 | Deploy | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |

Cada evidencia debe registrar fecha, zona, herramienta, versión, rol, precondición, acción, resultado, clasificación, censura y SHA-256. El checklist completo está en [13-evidencias.md](13-evidencias.md).

---

## 18. Resultados

### 18.1 Logros

- se documentó una metodología ética para una aplicación no open source;
- se identificaron roles, flujos, entradas, salidas, estados y estructuras conceptuales;
- se preparó un procedimiento reproducible de análisis dinámico y memoria;
- se implementó EduRoom con los flujos esenciales solicitados;
- se incorporaron cifrado, ofuscación, checksum y antireversing educativo;
- se desplegó la aplicación con PostgreSQL y migraciones;
- se validaron contratos API, autorización, cifrado, integridad y UI responsive;
- se generaron documentación, guion y evidencias para presentación presencial.

### 18.2 Cumplimiento de requisitos

| Requisito | Estado | Evidencia |
|---|---|---|
| Aplicación no open source | Cumplido | Google Classroom como referencia |
| Caja negra y OSINT | Cumplido/documentado | capítulos 02-04 |
| Estructuras de datos | Cumplido | Prisma y capítulo 05 |
| Tecnologías | Cumplido con distinción inferencia/hecho | capítulos 02, 03 y 13 |
| Entradas y salidas | Cumplido | capítulos 02 y 06 de este reporte |
| Uso de memoria | Procedimiento completo; evidencia manual pendiente | capítulo 09 |
| Réplica funcional | Cumplido | EduRoom y pruebas API |
| Roles/cursos/tareas/entregas/comentarios/notas | Cumplido | API, UI y esquema |
| Cifrado/ofuscación | Cumplido | AES-GCM y build ofuscado |
| Checksum previo a ejecución | Cumplido | manifest y verificación backend |
| Vulnerabilidades | Cumplido defensivamente | capítulo 15 |
| Presentación | Preparada | guion y evidencias |

### 18.3 Estado del deploy

La verificación puntual del 14-08-2026 a las 22:31 (`America/Mexico_City`) produjo:

| Recurso | Resultado |
|---|---|
| `/` | HTTP 200, HTML |
| `/api/health` | HTTP 200, `status=ok`, `environment=production` |
| `/api/security/integrity` | HTTP 200, `verified`, 19 archivos, 0 discrepancias |

Este resultado prueba disponibilidad e integridad en ese instante; no es una garantía permanente ni identifica el commit desplegado porque el healthcheck no publica versión.

---

## 19. Limitaciones

- EduRoom no es equivalente en amplitud a Google Classroom.
- No se accedió al código, esquema, infraestructura o datos propietarios de Google.
- Las tecnologías internas atribuidas a Google no se confirman; se mantienen como inferencias limitadas.
- No se realizó pentest ni evaluación de seguridad de Google Classroom.
- El protocolo de memoria requiere capturas manuales finales para la presentación.
- SHA-256 detecta cambios respecto de un manifiesto confiable, pero el manifiesto no está firmado.
- En web, el cliente recibe código ejecutable; la ofuscación puede revertirse con esfuerzo.
- Render usa `STRICT_INTEGRITY=false`, por lo que una discrepancia no bloquearía el arranque.
- El plan gratuito puede dormir servicios, introducir cold starts y limitar recursos/disponibilidad.
- El JWT se guarda en `localStorage` y no existe revocación o renovación.
- El registro público permite solicitar rol docente y debe corregirse antes de uso real.
- No hay verificación de correo, recuperación, MFA, auditoría completa, rotación de claves o KMS.
- Los adjuntos están modelados, pero no existe carga binaria.
- Las automatizaciones crean datos sintéticos persistentes porque no hay endpoint de limpieza.
- El login presenta overflow de 32 px en 768x1024; los otros 26 escenarios visuales no mostraron overflow.
- La visibilidad del repositorio depende de sus permisos; debe comprobarse antes de entregar.

---

## 20. Conclusiones

El proyecto demuestra un ciclo completo de ingeniería inversa ética: delimitación, observación, análisis dinámico, reconstrucción, diseño, implementación, protección, prueba y presentación. Google Classroom fue tratado como una aplicación propietaria de caja negra, sin intentar vulnerar controles o extraer implementación. Esta separación permitió estudiar necesidades funcionales sin apropiarse de código o identidad visual.

EduRoom materializa el modelo reconstruido mediante una arquitectura full-stack propia. Roles, cursos, anuncios, tareas, entregas, comentarios, calificaciones y retroalimentación funcionan en una instancia pública. Las pruebas confirman el recorrido docente-estudiante y la aplicación de controles de autorización en los escenarios evaluados.

La protección se abordó por propiedades: bcrypt protege contraseñas; JWT y autorización gestionan acceso; AES-GCM protege notas seleccionadas; SHA-256 detecta cambios; la ofuscación eleva el costo de lectura; el diagnóstico antidebug registra señales sin interferir con el entorno. Ninguna técnica se presenta como garantía absoluta.

El nivel de madurez es apropiado para una demostración académica con datos sintéticos, no para información educativa real. Las prioridades futuras son cerrar el alta de docentes, migrar la sesión a cookies seguras, firmar el manifiesto, activar integridad estricta, rotar claves, añadir auditoría y corregir el breakpoint del login.

En conclusión, EduRoom cumple la consigna central: reconstruye de manera fiable los patrones esenciales observables de un LMS, conserva una identidad independiente, documenta sus límites y deja evidencia reproducible para una defensa presencial transparente.

---

## 21. Referencias

### 21.1 Fuentes públicas y estándares

1. Google for Education. [Google Classroom: página pública del producto](https://edu.google.com/workspace-for-education/products/classroom/).
2. Google Classroom Help. [Getting started with Classroom for teachers](https://support.google.com/edu/classroom/answer/9582854?co=GENIE.Platform%3DDesktop&hl=en).
3. Google Classroom Help. [Create an assignment](https://support.google.com/edu/classroom/answer/6020265?co=GENIE.Platform%3DDesktop&hl=en-EN).
4. OWASP Foundation. [OWASP Top 10:2021](https://owasp.org/Top10/2021/).
5. Node.js. [Node.js documentation: Crypto](https://nodejs.org/api/crypto.html).
6. Express.js. [Express 4.x API Reference](https://expressjs.com/en/4x/api/).
7. React. [React reference](https://react.dev/reference/react).
8. Prisma. [Prisma ORM v6 documentation](https://www.prisma.io/docs/orm/v6).
9. PostgreSQL Global Development Group. [PostgreSQL documentation](https://www.postgresql.org/docs/).
10. Docker. [Docker Compose documentation](https://docs.docker.com/compose/).
11. Render. [Web Services documentation](https://render.com/docs/web-services).
12. Render. [Render Postgres documentation](https://render.com/docs/postgresql).
13. MDN Web Docs. [Web security](https://developer.mozilla.org/en-US/docs/Web/Security).
14. GitHub Docs. [GitHub documentation](https://docs.github.com/).
15. Chrome for Developers. [Lighthouse documentation](https://developer.chrome.com/docs/lighthouse/).
16. Postman. [Postman documentation](https://learning.postman.com/docs/).

### 21.2 Documentación interna

- [00 - Índice y matriz de cumplimiento](00-indice.md)
- [01 - Marco teórico](01-marco-teorico.md)
- [02 - Análisis de Google Classroom](02-analisis-google-classroom.md)
- [03 - Herramientas](03-herramientas-utilizadas.md)
- [04 - Análisis dinámico](04-analisis-dinamico.md)
- [05 - Reconstrucción de estructuras](05-reconstruccion-estructuras.md)
- [06 - Diseño de EduRoom](06-diseno-replica.md)
- [07 - Seguridad y antireversing](07-seguridad-antireversing.md)
- [08 - Checksum](08-checksum.md)
- [09 - Cifrado y ofuscación](09-cifrado-ofuscacion.md)
- [10 - Despliegue en Render](10-despliegue-render.md)
- [11 - Conclusiones](11-conclusiones.md)
- [12 - Guion de presentación](12-guion-presentacion.md)
- [13 - Evidencias](13-evidencias.md)
- [14 - Pruebas API Render](14-pruebas-api-render.md)
- [15 - Análisis de vulnerabilidades](15-analisis-vulnerabilidades.md)
- [16 - Comparativo UI](16-comparativo-ui.md)
- [18 - Capturas de EduRoom](18-capturas-eduroom-render.md)
- [Versión imprimible del comparativo UI](pdf/comparativo-ui-print.md)

---

**Declaración final:** no se vulneró Google Classroom, no se intentó acceso no autorizado, no se copiaron activos propietarios y no se incorporaron datos personales reales a EduRoom.
