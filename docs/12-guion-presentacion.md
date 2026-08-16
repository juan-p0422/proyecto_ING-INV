# 12. Guion de presentación presencial

**Proyecto:** EduRoom

**Tema:** ingeniería inversa ética de Google Classroom y réplica académica independiente

**Duración objetivo:** 10 minutos y 20 segundos; rango aceptable de 8 a 12 minutos

**Aplicación:** [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com)

**Repositorio:** [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV)

## 12.1 Mensaje central

Al finalizar, el profesor debe comprender que EduRoom demuestra un proceso completo y trazable: observación ética de una aplicación no open source, reconstrucción conceptual, implementación independiente, protección educativa y validación mediante pruebas.

La exposición distingue tres niveles:

1. **Observado:** comportamiento visible en una cuenta controlada y fuentes públicas.
2. **Inferido:** hipótesis técnicas razonables, presentadas como tales.
3. **Implementado:** decisiones verificables en el código propio de EduRoom.

## 12.2 Distribución del tiempo

| Tiempo | Bloque | Resultado que debe quedar claro |
|---|---|---|
| 0:00–0:30 | Portada | Qué se construyó y dónde se verifica |
| 0:30–1:10 | Problema | Qué exigía el examen y por qué se eligió Classroom |
| 1:10–1:45 | Alcance ético | Qué se observó y qué acciones se excluyeron |
| 1:45–2:25 | Metodología | Cómo se pasó de observación a implementación |
| 2:25–3:05 | Análisis de referencia | Flujos, entradas, salidas, tecnologías y memoria |
| 3:05–3:40 | Modelo reconstruido | Entidades y relaciones conceptuales |
| 3:40–4:20 | Arquitectura de EduRoom | Frontend, backend, base, GitHub y Render |
| 4:20–7:30 | Demostración en vivo | Flujo profesor–estudiante completo |
| 7:30–8:20 | Seguridad | Diferencia entre autenticación, cifrado, checksum y ofuscación |
| 8:20–9:05 | Pruebas | Evidencia API, defensiva y visual |
| 9:05–9:45 | Comparativo, resultados y límites | Correspondencia funcional sin copia visual |
| 9:45–10:20 | Conclusión | Aprendizaje y valor profesional |

Si solo hay ocho minutos, conservar la apertura, el alcance ético, el modelo, la demo de tarea–entrega–calificación, seguridad y conclusión. Si hay doce minutos, añadir la vista de miembros, un comentario y la matriz OWASP.

## 12.3 Guion literal para exponer

### 0:00–0:30 — Portada

**Mostrar:** portada con el nombre EduRoom, las dos URL y una captura propia del dashboard.

**Decir:**

> Buenos días. Presento EduRoom, una réplica académica independiente desarrollada a partir de un ejercicio de ingeniería inversa ética de Google Classroom. El proyecto completo puede verificarse en GitHub y la aplicación está desplegada en Render. La idea central no fue copiar el producto, sino comprender sus flujos observables y reconstruir una solución propia, documentada y comprobable.

### 0:30–1:10 — Problema y elección del caso

**Mostrar:** requisitos del examen resumidos en cinco palabras: analizar, reconstruir, implementar, proteger y demostrar.

**Decir:**

> El examen pedía analizar una aplicación no open source, identificar estructuras, tecnologías, entradas, salidas y comportamiento dinámico, y después construir una réplica funcional con medidas de protección. Elegí Google Classroom porque sus roles y flujos educativos son conocidos: profesor, estudiante, curso, tarea, entrega y calificación. Al ser software propietario, el reto consistió en trabajar únicamente con información pública y con el comportamiento visible desde cuentas autorizadas.

### 1:10–1:45 — Límites éticos

**Mostrar:** una lámina dividida entre “permitido” y “excluido”.

**Decir:**

> Aquí ingeniería inversa ética significa observación de caja negra. Se revisaron interfaces, documentación pública, respuestas visibles y métricas normales del navegador. No se decompiló Google Classroom, no se evadió autenticación, no se explotaron vulnerabilidades, no se hicieron pruebas de carga y no se accedió a información de terceros. Tampoco se copiaron logos, recursos, textos comerciales ni identidad visual. Por eso cualquier afirmación sobre tecnologías internas se presenta como inferencia y no como un hecho confirmado.

### 1:45–2:25 — Metodología

**Mostrar:** secuencia `OSINT → caja negra → análisis dinámico → modelo conceptual → implementación → protección → pruebas`.

**Decir:**

> El proceso tuvo siete etapas. Primero, OSINT para reunir información pública. Segundo, observación de caja negra con cuentas controladas. Tercero, análisis dinámico en el navegador para registrar navegación, tráfico legítimo, almacenamiento, rendimiento y memoria. Cuarto, reconstrucción conceptual del dominio. Quinto, diseño e implementación de EduRoom. Sexto, controles educativos de protección. Y séptimo, pruebas funcionales, visuales y defensivas. La documentación conserva la trazabilidad entre cada observación, la inferencia correspondiente y la decisión de diseño.

### 2:25–3:05 — Google Classroom como referencia observada

**Mostrar:** una captura propia y anonimizada o, si no está disponible, el diagrama de flujos de `docs/02-analisis-google-classroom.md`.

**Decir:**

> En la referencia se observaron flujos de acceso, lista de clases, tablón, trabajo de clase, personas, entrega y retroalimentación. Las entradas principales son credenciales, códigos de curso, textos, archivos y calificaciones; las salidas son estados, listados, avisos, entregas y comentarios. Desde el navegador se pueden observar solicitudes HTTPS, recursos JavaScript, almacenamiento de sesión y consumo de memoria durante acciones normales. Como inferencias de alto nivel, esas señales son compatibles con una aplicación web moderna, autenticación federada, APIs, almacenamiento en nube y una arquitectura cliente–servidor; no permiten asegurar frameworks, bases de datos ni topología interna.

### 3:05–3:40 — Modelo reconstruido

**Mostrar:** diagrama entidad–relación propio.

**Decir:**

> La reconstrucción produjo un modelo de dominio independiente. User representa la identidad; Course, el espacio del profesor; Enrollment relaciona usuarios y cursos; Assignment define una actividad; Submission almacena la entrega; Comment modela la conversación; Attachment representa un recurso asociado. Grade se entiende conceptualmente como el resultado de evaluación y en EduRoom se implementa mediante los campos de nota, retroalimentación y estado de Submission. Esta aclaración evita afirmar que conocemos el modelo interno de Google.

### 3:40–4:20 — Arquitectura de EduRoom

**Mostrar:** diagrama de tres capas con navegador, API y PostgreSQL.

**Decir:**

> EduRoom es una aplicación web propia. El frontend usa React, TypeScript y Vite. El backend usa Node.js, Express, TypeScript, Prisma y validación con Zod. PostgreSQL persiste usuarios, cursos, inscripciones, tareas, entregas, comentarios, adjuntos y notas seguras. El frontend consume una API REST bajo `/api`; Render aloja la aplicación y la base de datos; GitHub conserva código, documentación, pruebas y evidencia reproducible.

### 4:20–7:30 — Demostración en vivo

Usar dos perfiles de navegador: uno para profesor y otro para estudiante. Preparar cuentas temporales con datos sintéticos; no mostrar contraseñas, JWT, códigos reutilizables ni paneles con secretos.

#### 4:20–4:40 — Acceso

**Acción:** abrir [EduRoom en Render](https://eduroom-znb0.onrender.com) en el perfil del profesor e iniciar sesión. Si se muestra el registro, usar una dirección sintética única y no reutilizable.

**Decir:**

> La aplicación permite registro e inicio de sesión por rol. Para no dedicar la demostración a escribir contraseñas, usaré dos cuentas sintéticas previamente verificadas.

#### 4:40–5:20 — Profesor crea curso y anuncio

**Acción:** crear el curso `Arquitectura de software — Demo`, guardar el código fuera de la pantalla y crear el anuncio `Bienvenida a la demostración`.

**Decir:**

> Como profesor puedo crear un curso. El backend valida el rol y genera un código de ingreso. Dentro del tablón publico un anuncio; la respuesta queda asociada al curso y al autor autenticado.

#### 5:20–5:50 — Profesor crea tarea

**Acción:** abrir **Trabajo de clase** y crear `Mapa de arquitectura` con la instrucción `Describir frontend, API y base de datos`.

**Decir:**

> En Trabajo de clase creo una tarea sintética. Esta operación está autorizada para el profesor propietario del curso; un estudiante recibe un 403 si intenta el mismo endpoint.

#### 5:50–6:30 — Estudiante se une y entrega

**Acción:** cambiar al perfil del estudiante, iniciar sesión, unirse con el código, abrir la tarea y entregar `Frontend React; API Express; persistencia PostgreSQL`.

**Decir:**

> Ahora cambio a una sesión separada de estudiante. El código lo incorpora al curso mediante Enrollment. El estudiante ve la tarea y registra una entrega, pero no tiene controles de creación o calificación.

#### 6:30–7:00 — Profesor califica

**Acción:** volver al perfil del profesor, abrir la entrega, asignar `95` y escribir `Estructura correcta y bien relacionada`.

**Decir:**

> Regreso al profesor. La entrega aparece vinculada a la tarea y al estudiante. Asigno una calificación de 95 y una retroalimentación sintética. El estado cambia a calificada y la autorización impide que el propio estudiante ejecute esta operación.

#### 7:00–7:30 — Comentario, salud, integridad y repositorio

**Acción:** crear o mostrar un comentario; abrir las pestañas preparadas de `/api/health`, `/api/security/integrity` y el repositorio.

**Decir:**

> El curso también admite comentarios de sus integrantes. El endpoint de salud confirma disponibilidad del servicio. El endpoint de integridad informa el resultado del manifiesto sin exponer hashes ni rutas internas. Finalmente, en GitHub se encuentran el código, las pruebas y la memoria técnica que respaldan la demostración.

## 12.4 Seguridad y protección — 7:30–8:20

**Mostrar:** una tabla de cinco controles y su propósito.

**Decir:**

> Los controles tienen propósitos diferentes. JWT transporta la identidad autenticada; bcrypt protege contraseñas mediante hash; las reglas de rol y pertenencia limitan operaciones; AES-256-GCM cifra y autentica las notas seguras almacenadas; SHA-256 verifica la integridad de los artefactos incluidos en el manifiesto. La ofuscación y el antireversing educativo —incluido un control antidebug no destructivo— dificultan la lectura casual, pero no vuelven el software irreversible ni reemplazan una autorización correcta. Además, la auditoría documentó riesgos abiertos, como el alta pública de profesores y el almacenamiento del JWT en `localStorage`.

## 12.5 Pruebas y evidencia — 8:20–9:05

**Mostrar:** los tres resultados con fecha y alcance.

**Decir:**

> La validación se ejecutó contra Render con pocas solicitudes secuenciales y datos sintéticos. El smoke test registró 26 de 26 solicitudes aprobadas; esto confirma los escenarios probados, no la ausencia total de defectos. El script defensivo completó 14 de 14 comprobaciones, incluyendo acceso sin token, token inválido, rol estudiante y payload vacío. Playwright generó 27 capturas en escritorio, tableta y móvil. Veintiséis no presentaron desbordamiento; el login de 768 por 1024 mostró una advertencia de 32 píxeles que quedó registrada como mejora.

## 12.6 Comparativo, resultados y limitaciones — 9:05–9:45

**Mostrar:** un par visual autorizado: Classroom anonimizado a la izquierda y EduRoom desde Render a la derecha.

**Decir:**

> El comparativo evalúa navegación, jerarquía y correspondencia de flujos, no identidad visual ni equivalencia pixel a pixel. EduRoom conserva patrones generales de un LMS —curso, tablón, tarea, entrega y evaluación— con nombre, estilos, código y recursos propios. El proyecto cumple los roles, cursos, anuncios, tareas, entregas, comentarios, calificaciones, despliegue y documentación. Sus límites también están explícitos: no se conoce la arquitectura interna de Google, no hubo decompilación ni explotación, y checksums u ofuscación solo elevan el costo de modificación o lectura; no la impiden por completo.

## 12.7 Conclusión — 9:45–10:20

**Mostrar:** tres conclusiones y los enlaces finales.

**Decir:**

> La principal conclusión es que la ingeniería inversa ética puede convertir comportamiento externo en requisitos verificables sin acceder a código propietario. EduRoom demuestra esa transición con una arquitectura independiente y un flujo funcional de extremo a extremo. Profesionalmente, el ejercicio también muestra la relación entre construir y proteger software: comprender cómo se observa un sistema ayuda a documentar límites, diseñar mejores controles y validar con evidencia. Todo lo mostrado queda disponible en el deploy y en el repositorio. Gracias; quedo atento a sus preguntas.

## 12.8 Preguntas probables y respuestas breves

| Pregunta | Respuesta sugerida |
|---|---|
| ¿Copiaste Google Classroom? | “No. Se observaron patrones funcionales generales y EduRoom se implementó con código, identidad visual y modelo propios.” |
| ¿Cómo sabes qué tecnologías usa Google? | “No lo afirmo como certeza. Las herramientas del navegador permiten inferir rasgos, pero la arquitectura interna permanece desconocida.” |
| ¿La ofuscación evita ingeniería inversa? | “No. Solo aumenta el esfuerzo de lectura; el navegador necesita recibir código ejecutable.” |
| ¿El checksum evita modificaciones? | “Detecta cambios en archivos cubiertos por el manifiesto; no evita por sí mismo que alguien reemplace también el verificador o el manifiesto.” |
| ¿AES-GCM cifra las contraseñas? | “No. Las contraseñas usan bcrypt, que es hash no reversible. AES-GCM se usa en notas seguras que sí necesitan recuperarse.” |
| ¿Las pruebas prueban que no hay vulnerabilidades? | “No. Demuestran los casos y controles evaluados en una fecha; la matriz conserva riesgos y recomendaciones abiertas.” |
| ¿Por qué `Grade` no aparece como tabla? | “Es un concepto de evaluación implementado dentro de `Submission` mediante nota, feedback y estado; podría separarse si el dominio requiriera historial o rúbricas.” |

## 12.9 Checklist antes de presentar

### Un día antes

- [ ] Confirmar que el commit de entrega está identificado y que el repositorio abre con los permisos del profesor.
- [ ] Ejecutar `npm test`, `npm run integrity:verify` y revisar que no se proyecten secretos.
- [ ] Preparar una versión local con `docker compose up --build -d` y `docker compose exec backend npm run prisma:seed`.
- [ ] Exportar las diapositivas y los documentos esenciales a PDF para uso sin conexión.
- [ ] Guardar en local las capturas de `evidence/ui/eduroom/` y las capturas autorizadas y anonimizadas de Classroom.
- [ ] Crear o validar dos cuentas temporales de Render con datos sintéticos; no publicar sus contraseñas.
- [ ] Preparar un curso de respaldo ya configurado, sin sustituir el curso que se creará durante la demo.
- [ ] Verificar cable, adaptador, resolución del proyector y fuentes.

### Quince minutos antes

- [ ] Abrir [EduRoom](https://eduroom-znb0.onrender.com) y consultar [`/api/health`](https://eduroom-znb0.onrender.com/api/health) para despertar Render.
- [ ] Consultar [`/api/security/integrity`](https://eduroom-znb0.onrender.com/api/security/integrity) una vez y dejar la pestaña lista.
- [ ] Iniciar sesión en perfiles separados de profesor y estudiante.
- [ ] Comprobar que el profesor pueda crear contenido y que el estudiante pueda unirse al curso de respaldo.
- [ ] Abrir el repositorio y los documentos 12, 13, 15, 17, 18 y 19.
- [ ] Cerrar correo, mensajería, administrador de contraseñas, panel de Render, DevTools con tokens y archivos `.env`.
- [ ] Activar “No molestar”, ocultar marcadores personales y fijar el zoom del navegador en 100 %.
- [ ] Tener cronómetro visible solo para el expositor.

### Justo antes de proyectar

- [ ] Confirmar que no aparecen nombres, correos, fotos, códigos activos, JWT ni datos personales.
- [ ] Empezar en la portada, no en el escritorio ni en la consola.
- [ ] Tener el código del curso temporal disponible fuera de la pantalla proyectada.
- [ ] Recordar la frase: “observación e inferencia, no acceso a la implementación propietaria”.

## 12.10 Orden de ventanas y pestañas

1. **Ventana 1 — Presentación:** `docs/19-presentacion-diapositivas.md` o su PDF, en pantalla completa.
2. **Ventana 2 — Profesor:** perfil exclusivo con el dashboard de EduRoom.
3. **Ventana 3 — Estudiante:** perfil distinto o ventana privada.
4. **Ventana 4 — Estado público:** pestañas de `/api/health` y `/api/security/integrity`.
5. **Ventana 5 — Evidencias:** comparativo visual y capturas anonimizadas.
6. **Ventana 6 — GitHub o editor:** reporte final y esquema Prisma.
7. **Ventana 7 — Plan B local:** `http://localhost:3000` y una terminal con Docker saludable.

No abrir durante la proyección el panel administrativo de Render, archivos `.env`, almacenamiento del navegador ni respuestas que incluyan tokens.

## 12.11 Plan B si Render está dormido o lento

1. Despertarlo 10 a 15 minutos antes mediante una sola consulta a `/api/health`.
2. Si tarda, decir: “Render está reactivando la instancia; mientras responde, mostraré la evidencia de la última ejecución controlada”.
3. Continuar con `evidence/ui/eduroom/` y `docs/14-pruebas-api-render.md`; no hacer recargas rápidas ni repetir el smoke test.
4. Reintentar una vez después de explicar la arquitectura.
5. Si no se recupera, completar el mismo flujo en la instancia local preparada.

## 12.12 Plan B si falla internet

La contingencia debe prepararse antes de salir; sin red no conviene depender de descargar imágenes Docker o paquetes.

1. Dejar Docker construido, iniciado y sembrado previamente.
2. Abrir `http://localhost:3000` en los dos perfiles y verificar `http://localhost:3000/api/health`.
3. Usar el PDF local, las capturas locales y el clon local del repositorio.
4. Ejecutar solo pruebas locales ya instaladas si el profesor las solicita.
5. Explicar que se demuestra la misma versión preparada para Render y que la evidencia fechada del entorno productivo está en los documentos 14 y 18.

Comandos de preparación:

```bash
docker compose up --build -d
docker compose exec backend npm run prisma:seed
docker compose ps
npm run integrity:verify
```

## 12.13 Regla de cierre

No terminar en una consola ni en una limitación. Volver a la diapositiva final y cerrar con el vínculo entre observación ética, construcción independiente, protección y evidencia verificable.
