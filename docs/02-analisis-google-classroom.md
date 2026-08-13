# 02. Análisis académico de caja negra de Google Classroom

## 2.1 Objetivo, método y alcance

El presente capítulo caracteriza Google Classroom mediante **análisis de caja negra**: se estudian entradas, salidas, estados visibles, flujos normales de usuario y documentación pública, sin acceder a su implementación interna. El nombre del producto se utiliza únicamente para identificar el objeto de estudio académico; Google y Google Classroom son marcas de sus respectivos titulares y este proyecto no implica afiliación.

La información se organiza en tres niveles:

| Nivel | Definición | Ejemplo en este capítulo |
|---|---|---|
| Información pública | Afirmación respaldada por documentación oficial accesible | Existencia de aplicaciones para Android e iOS |
| Observación externa | Conducta reproducible mediante una cuenta de prueba autorizada | Una clase aparece en la lista después de unirse |
| Inferencia conceptual | Hipótesis compatible con lo observado, no confirmación interna | Existencia lógica de una relación de inscripción |

Las funciones pueden variar por fecha, región, edición de Google Workspace, tipo de cuenta, dispositivo y políticas del administrador. El análisis describe la versión accesible durante la práctica y no constituye una especificación oficial exhaustiva.

## 2.2 Identificación general de la aplicación

| Elemento | Identificación |
|---|---|
| Nombre | Google Classroom |
| URL principal | [https://classroom.google.com/](https://classroom.google.com/) |
| Tipo de aplicación | Plataforma web y móvil para gestión del aprendizaje y coordinación de actividades educativas |
| Propósito | Ayudar a organizar clases, distribuir trabajo, recibir entregas, comunicar retroalimentación y consultar progreso |
| Usuarios principales | Profesores, estudiantes, personal administrativo y, en ciertas configuraciones, tutores o responsables |
| Contexto de uso | Instituciones educativas, formación remota o híbrida y escenarios educativos con cuentas personales compatibles |

Google presenta Classroom como parte de Google Workspace for Education y como un entorno donde docentes pueden crear, administrar y medir experiencias de aprendizaje. La descripción institucional enfatiza asignación, evaluación, comunicación y colaboración, con diferencias entre ediciones y complementos. Véase la [descripción oficial del producto](https://edu.google.com/workspace-for-education/products/classroom/).

## 2.3 Información pública disponible

### 2.3.1 Descripción pública

Según la información oficial, Classroom centraliza tareas habituales de enseñanza: organizar cursos, distribuir actividades, recibir trabajos, ofrecer comentarios y calificar. Algunas funciones avanzadas —por ejemplo, determinadas analíticas, integraciones o herramientas de aprendizaje— dependen de la edición contratada. Por tanto, una función anunciada públicamente no necesariamente aparece en toda cuenta.

### 2.3.2 Plataformas soportadas

El servicio puede utilizarse mediante navegador web en computadora y dispone de aplicaciones móviles para Android y iOS. En dispositivos móviles, algunas tareas pueden requerir otras aplicaciones de Google para editar tipos de archivo concretos. La disponibilidad y los requisitos deben comprobarse en la [ayuda oficial sobre la aplicación de Classroom](https://support.google.com/edu/classroom/answer/6118412?hl=es-001).

| Plataforma | Forma general de acceso | Consideración observable |
|---|---|---|
| Computadora | Navegador web | Ofrece la experiencia web y vistas amplias de gestión |
| Android | Aplicación móvil | Algunas operaciones de contenido interactúan con aplicaciones auxiliares |
| iPhone/iPad | Aplicación móvil | Capacidades adaptadas al sistema móvil y a su versión compatible |
| ChromeOS | Navegador en el dispositivo | No requiere una aplicación móvil para el acceso web ordinario |

### 2.3.3 Integración con cuentas Google

El acceso se realiza mediante una cuenta Google. Dependiendo del contexto puede ser una cuenta personal o una cuenta administrada de Google Workspace for Education. El dominio, la edad, la edición y las políticas institucionales pueden condicionar creación de clases, comunicación, almacenamiento e integración con otros servicios. Esto es un ejemplo de **autenticación federada** observable: la identidad se gestiona en el ecosistema de cuentas Google y Classroom consume la sesión autorizada.

### 2.3.4 Integraciones conceptuales

| Servicio relacionado | Integración conceptual observable o documentada |
|---|---|
| Google Drive | Conservación y asociación de archivos de clase, materiales y trabajos; la capacidad depende del almacenamiento disponible |
| Documentos, Hojas de cálculo y Presentaciones | Creación, edición o entrega de documentos colaborativos asociados a actividades |
| Google Meet | Enlace de videollamada asociado a una clase cuando la edición y el administrador lo permiten |
| Google Calendar | Representación de fechas de entrega y eventos relacionados con las clases |
| Gmail | Recepción de invitaciones, avisos o respuestas a determinadas comunicaciones, si el servicio está habilitado |

La ayuda oficial indica que Classroom funciona con Drive, Documentos y otros servicios de Workspace, y que el almacenamiento puede ser compartido entre productos ([cuentas de usuario de Classroom](https://support.google.com/edu/classroom/answer/7582372?hl=es)). Las tareas con fecha pueden aparecer en calendarios de Classroom y Google Calendar ([uso de calendarios](https://support.google.com/edu/classroom/answer/7184151?hl=es)). Meet puede vincularse conceptualmente con Classroom, Calendar y Gmail, sujeto a permisos administrativos ([videollamadas en Classroom](https://support.google.com/edu/classroom/answer/9776888?hl=es)).

Estas relaciones se describen en términos funcionales. No se afirma que compartan una base de datos, protocolo interno o arquitectura específica.

## 2.4 Análisis de funcionalidades observables

### 2.4.1 Gestión de clases

Una clase actúa como contenedor contextual para participantes, publicaciones y trabajo académico. Desde el exterior puede observarse la creación de una clase con metadatos como nombre, sección, materia o aula, y su aparición posterior en el listado del usuario. El profesor dispone de acciones de configuración y organización que no se muestran de la misma forma al estudiante.

### 2.4.2 Código de clase o invitación

La incorporación de estudiantes puede realizarse mediante código, enlace o invitación enviada por el profesor. El resultado visible es la asociación del usuario con la clase. Los códigos pueden habilitarse, deshabilitarse o restablecerse, lo cual sugiere conceptualmente un mecanismo de invitación con estado y vigencia, no necesariamente una propiedad fija del curso. Véase la [documentación oficial sobre invitaciones](https://support.google.com/edu/classroom/answer/6020282?hl=es).

### 2.4.3 Publicaciones en el tablón

El tablón presenta comunicaciones ordenadas dentro del contexto de una clase. Una publicación puede contener texto y recursos relacionados; su visibilidad y la posibilidad de comentar dependen del rol y de la configuración del curso. El comportamiento observable incluye creación, visualización cronológica y notificación eventual a participantes.

### 2.4.4 Tareas

Una tarea representa una actividad asignada a uno o varios estudiantes. Puede exponer título, instrucciones, puntuación posible, tema, destinatarios, adjuntos, fecha y hora de entrega. Desde el punto de vista del profesor, la interfaz resume trabajos asignados y recibidos; desde el del estudiante, presenta acciones para consultar, adjuntar, entregar o retirar una entrega cuando esté permitido.

### 2.4.5 Materiales

Los materiales son recursos de consulta sin el mismo ciclo de entrega y calificación de una tarea. Pueden incluir texto, enlaces o archivos y organizarse por tema. Esta distinción observable justifica separar conceptualmente un recurso informativo de una actividad evaluable, aunque una implementación propia podría reutilizar una estructura común de publicación.

### 2.4.6 Entregas

La entrega vincula una tarea con un estudiante y sus respuestas o archivos. La interfaz muestra cambios de estado al enviar, retirar o recibir nuevamente un trabajo. Las entregas pueden incluir documentos creados en servicios compatibles o archivos cargados por el usuario. La documentación pública enumera varios formatos de documentos, imágenes, texto, audio y video, sujetos a límites y edición ([calificación y comentarios](https://support.google.com/edu/classroom/answer/16643267?hl=es)).

### 2.4.7 Calificaciones

El profesor puede introducir una puntuación o devolver un trabajo con comentarios y, en ciertos flujos, devolverlo sin puntuación. Una calificación puede permanecer como borrador hasta que se devuelve el trabajo y se hace visible al estudiante. La vista de calificaciones agrega resultados por alumno y actividad; algunas configuraciones admiten escalas, categorías o exportación. Véase la [ayuda oficial sobre calificar y devolver tareas](https://support.google.com/edu/classroom/answer/6020294?hl=es).

### 2.4.8 Comentarios

Se observan comentarios asociados a contextos distintos: comunicaciones visibles para la clase y comentarios privados vinculados al trabajo de un estudiante. La diferencia de audiencia es relevante para el control de acceso. Un comentario privado no debe modelarse como si fuera una publicación general, aun cuando ambos contengan texto y autor.

### 2.4.9 Roles de profesor y estudiante

| Capacidad general | Profesor | Estudiante |
|---|---:|---:|
| Crear o administrar una clase | Sí, según tipo de cuenta y políticas | No como función del rol estudiante |
| Invitar o gestionar participantes | Sí, según permisos | Puede aceptar invitación o ingresar un código |
| Publicar trabajo de clase | Sí | Consulta y responde según configuración |
| Entregar trabajo | No como destinatario ordinario | Sí, para tareas asignadas |
| Calificar y devolver | Sí | Consulta el resultado publicado |
| Comentar | Según configuración | Según configuración y contexto |

La interfaz representa permisos, pero el modelo conceptual exige que las decisiones de autorización se apliquen también en el servidor. Las capacidades exactas pueden variar para profesores colaboradores, administradores o ediciones específicas.

### 2.4.10 Notificaciones

Las notificaciones comunican eventos como nuevas publicaciones, tareas, comentarios, trabajos devueltos o calificaciones disponibles. Pueden mostrarse por correo o en dispositivos móviles y admiten preferencias del usuario. Desde caja negra solo se observa el evento y su entrega visible; no puede concluirse el mecanismo interno que lo transporta. La documentación confirma, por ejemplo, que al devolver trabajos los estudiantes pueden recibir avisos por correo o móvil ([cuaderno de calificaciones](https://support.google.com/edu/classroom/answer/9199710?hl=es)).

## 2.5 Entradas y salidas de datos

### 2.5.1 Matriz de interacción

| Flujo | Entradas típicas | Salidas visibles |
|---|---|---|
| Acceso | Cuenta Google, selección de identidad, consentimiento aplicable | Sesión iniciada, nombre/imagen de cuenta y lista de clases autorizadas |
| Crear clase | Nombre, sección, materia, aula u otros metadatos | Nueva tarjeta de clase, contexto vacío y código/invitación disponible |
| Unirse | Código, enlace o aceptación de invitación | Clase incorporada al listado y contenido visible según rol |
| Publicar | Texto, audiencia, tema o adjuntos | Entrada en tablón o trabajo de clase y posible aviso |
| Crear tarea | Título, instrucciones, destinatarios, puntos, fecha, tema y adjuntos | Actividad visible y contadores de estado |
| Entregar | Respuesta, archivos, enlaces o confirmación | Marca temporal, estado actualizado y archivos asociados |
| Evaluar | Puntuación, rúbrica o comentario | Trabajo devuelto, calificación visible y notificación eventual |

### 2.5.2 Archivos adjuntos

Los archivos pueden provenir del dispositivo, de Drive o de editores compatibles. Una actividad puede entregar una copia individual, permitir colaboración o servir como recurso de consulta, según la opción elegida por el profesor. En el reporte solo deben usarse archivos sintéticos y capturas que oculten nombres, correos, identificadores y contenido personal.

### 2.5.3 Estados conceptuales de una tarea y su entrega

La tarea y la entrega poseen ciclos relacionados pero distintos. Una tarea puede estar programada, publicada o cerrada desde la perspectiva del curso; la entrega individual puede encontrarse en estados visibles como asignada, entregada o devuelta. La terminología exacta puede variar por idioma y versión.

| Estado conceptual | Interpretación externa | Actor que normalmente provoca la transición |
|---|---|---|
| Borrador/programada | Aún no disponible o pendiente de publicación | Profesor |
| Asignada | Actividad disponible y sin entrega final registrada | Profesor/sistema |
| Entregada | El estudiante confirmó el envío | Estudiante |
| Entregada con retraso | El envío ocurrió después del vencimiento visible | Estudiante/sistema |
| Devuelta | El profesor retornó el trabajo, con o sin calificación | Profesor |
| Retirada | El estudiante revirtió una entrega cuando la interfaz lo permitió | Estudiante |

La observación de una etiqueta no permite asegurar cómo se almacena el estado. Una implementación puede derivarlo a partir de fechas y eventos en vez de persistirlo como un único campo.

### 2.5.4 Fechas de entrega

Una tarea puede tener fecha y, según la configuración, hora límite. La interfaz compara ese vencimiento con el momento de entrega para informar puntualidad o retraso. La fecha también puede reflejarse en Calendar. Para evidencias reproducibles deben anotarse zona horaria, configuración regional y hora del dispositivo, pues estos factores pueden cambiar la representación visible.

## 2.6 Tecnologías inferidas mediante observación no invasiva

Las siguientes afirmaciones son **inferencias de alto nivel**, no hallazgos sobre código o infraestructura interna:

| Inferencia | Evidencia externa compatible | Límite de la conclusión |
|---|---|---|
| Aplicación web moderna | Navegación interactiva, actualización parcial de vistas y adaptación a distintos tamaños | No determina framework, lenguaje ni organización del código |
| Autenticación federada | Acceso mediante una cuenta Google y sesión compartida con servicios autorizados | No revela el protocolo o configuración interna concreta |
| Uso de APIs | El cliente intercambia datos para actualizar cursos, tareas y estados; Google también documenta capacidades de integración | No autoriza enumerar endpoints ni afirmar que una solicitud observada sea API pública |
| Almacenamiento en nube | Archivos y documentos permanecen disponibles entre dispositivos y se relacionan con Drive | No demuestra topología, proveedor interno de cada dato ni esquema físico |
| Arquitectura cliente-servidor | El navegador presenta una interfaz y recibe respuestas remotas asociadas a la cuenta | No revela cantidad de servicios, bases de datos o límites de componentes |

Solo puede revisarse el tráfico generado por acciones normales de la cuenta de prueba. Métodos, códigos de estado y tiempos pueden documentarse después de eliminar tokens, cookies, identificadores y datos personales. No se modifican solicitudes ni se intenta descubrir recursos no enlazados.

## 2.7 Modelo conceptual de datos reconstruido

El modelo siguiente busca explicar las funciones observables y orientar EduRoom. **No representa ni afirma reproducir el esquema interno de Google Classroom.** Los nombres y campos son decisiones académicas propias.

### Usuario

| Campo conceptual | Propósito |
|---|---|
| `id` | Identificador interno de la réplica |
| `nombreVisible` | Nombre mostrado en la interfaz |
| `correo` | Identidad de acceso o contacto |
| `rolGlobal` | Capacidad institucional general, si se requiere |
| `preferenciasNotificacion` | Canales y eventos seleccionados |

### Curso

| Campo conceptual | Propósito |
|---|---|
| `id` | Identificador del espacio académico |
| `nombre` | Título visible |
| `seccion`, `materia`, `aula` | Metadatos opcionales |
| `estado` | Activo, archivado u otro estado propio |
| `creadoPor` | Usuario responsable de su creación |

### Inscripción

| Campo conceptual | Propósito |
|---|---|
| `id` | Identificador de la relación |
| `usuarioId`, `cursoId` | Referencias al participante y curso |
| `rolEnCurso` | Profesor, profesor colaborador o estudiante |
| `estado` | Invitada, activa o retirada |
| `fechaIngreso` | Marca temporal de incorporación |

### Publicación

| Campo conceptual | Propósito |
|---|---|
| `id`, `cursoId`, `autorId` | Identidad, contexto y autor |
| `contenido` | Texto de la comunicación |
| `audiencia` | Grupo autorizado para verla |
| `publicadaEn` | Orden cronológico |
| `estado` | Borrador, programada o publicada |

### Tarea

| Campo conceptual | Propósito |
|---|---|
| `id`, `cursoId`, `autorId` | Identidad y contexto |
| `titulo`, `instrucciones` | Descripción de la actividad |
| `puntosMaximos` | Referencia de evaluación opcional |
| `fechaEntrega` | Vencimiento opcional con zona horaria |
| `estado` | Borrador, programada o publicada |

### Entrega

| Campo conceptual | Propósito |
|---|---|
| `id`, `tareaId`, `estudianteId` | Relación entre actividad y participante |
| `estado` | Asignada, entregada, retirada o devuelta |
| `entregadaEn` | Momento de confirmación |
| `devueltaEn` | Momento de devolución |
| `respuestaTexto` | Respuesta opcional propia de la réplica |

### Comentario

| Campo conceptual | Propósito |
|---|---|
| `id`, `autorId` | Identidad y autor |
| `contextoTipo`, `contextoId` | Publicación, tarea o entrega relacionada |
| `contenido` | Texto del comentario |
| `visibilidad` | Clase, grupo o privado |
| `creadoEn` | Marca temporal |

### Archivo adjunto

| Campo conceptual | Propósito |
|---|---|
| `id` | Identificador lógico |
| `propietarioId` | Usuario o contexto autorizado |
| `nombre`, `tipoMime`, `tamano` | Metadatos visibles |
| `ubicacionSegura` | Referencia controlada al almacenamiento propio |
| `contextoTipo`, `contextoId` | Publicación, tarea o entrega asociada |

### Calificación

| Campo conceptual | Propósito |
|---|---|
| `id`, `entregaId` | Evaluación asociada a una entrega |
| `evaluadorId` | Profesor responsable |
| `valor`, `maximo` | Puntuación y escala |
| `estado` | Borrador o publicada/devuelta |
| `retroalimentacion` | Comentario evaluativo opcional |
| `publicadaEn` | Momento en que se hace visible |

### Relaciones principales

| Origen | Relación | Destino |
|---|---|---|
| Usuario | participa mediante | Inscripción |
| Inscripción | pertenece a | Curso |
| Curso | contiene | Publicación y Tarea |
| Tarea | recibe | Entrega |
| Entrega | puede contener | Archivo adjunto y Calificación |
| Usuario | crea | Publicación, Tarea o Comentario |

La asociación `Inscripción` permite expresar un rol dependiente del curso y evita asumir que una persona tiene un único rol en todo el sistema. `Comentario` y `Archivo adjunto` se modelan mediante un contexto para reutilizar comportamiento, aunque una réplica futura podría preferir relaciones explícitas separadas.

## 2.8 Límites éticos y legales del análisis

El trabajo se rige por minimización, proporcionalidad, autorización y no interferencia. En particular:

- no se realizó ingeniería inversa de binarios, aplicaciones móviles o extensiones;
- no se descompiló, desensambló, extrajo ni analizó código propietario;
- no se intentó explotar vulnerabilidades, alterar solicitudes ni evadir autenticación o autorización;
- no se accedió a clases, archivos, cuentas o datos de terceros;
- no se efectuó scraping masivo, enumeración automatizada, pruebas de carga ni escaneo activo;
- no se copiaron marcas, iconos, estilos, textos, recursos visuales o conjuntos de datos de Google;
- no se conservaron cookies, tokens, identificadores o información personal en la evidencia;
- no se presenta una inferencia como descripción confirmada de la arquitectura interna.

La práctica usa navegación normal, documentación pública y contenido sintético dentro de cuentas autorizadas. Si durante una observación apareciera información no prevista o fuera necesario superar un control, el procedimiento se detendría y el hecho se documentaría sin ampliarlo. Las condiciones de servicio y la legislación aplicable deben revisarse antes de cualquier cambio de alcance.

## 2.9 Evidencias sugeridas

El alumno puede capturar manualmente las siguientes vistas utilizando exclusivamente cuentas y datos de prueba. Antes de incorporarlas al reporte debe ocultar correo, fotografía, nombre real, códigos activos, identificadores, nombres de archivo personales y notificaciones ajenas.

| Evidencia | Captura sugerida | Objetivo académico | Precauciones |
|---|---|---|---|
| EV-02-01 | Pantalla de inicio | Identificar punto de acceso y contexto público | No mostrar una sesión o cuenta personal |
| EV-02-02 | Lista de clases | Observar la organización general del usuario | Usar clases sintéticas y anonimizar nombres/códigos |
| EV-02-03 | Creación de clase | Registrar entradas visibles del formulario | No crear clases fuera de la cuenta de prueba |
| EV-02-04 | Tablón | Documentar publicaciones y audiencia contextual | Usar textos ficticios y ocultar participantes |
| EV-02-05 | Trabajo de clase | Diferenciar tareas, materiales y organización | No reutilizar contenidos con derechos de terceros |
| EV-02-06 | Entrega de tarea | Mostrar entrada, adjunto sintético y cambio de estado | No subir documentos reales; ocultar identificadores |
| EV-02-07 | Comentarios | Comparar comentario de clase y privado | Usar conversaciones ficticias sin datos personales |
| EV-02-08 | Calificaciones | Registrar estado antes/después de devolución | Usar puntuaciones simuladas y ocultar nombres |

Cada evidencia debe acompañarse de fecha y hora, zona horaria, navegador/dispositivo, tipo de cuenta, rol, precondición, acción, resultado, nivel de certeza y transformación de anonimización. Se recomienda tomar una captura anterior y otra posterior en los flujos con cambio de estado.

## 2.10 Conclusión del análisis

Desde una perspectiva de caja negra, Google Classroom puede caracterizarse como un sistema cliente-servidor de gestión educativa que articula identidad, clases, membresías, comunicaciones, actividades, archivos, entregas y evaluación. La integración conceptual con otros servicios de Google reduce fricción entre creación de contenido, almacenamiento, calendario, videollamada y comunicación.

Estas observaciones son suficientes para derivar requisitos generales de un LMS, pero no para conocer la implementación propietaria. EduRoom toma únicamente esos requisitos funcionales de alto nivel y los resuelve mediante arquitectura, modelo, textos e identidad visual originales.

## 2.11 Fuentes públicas consultadas

- [Google for Education: Classroom](https://edu.google.com/workspace-for-education/products/classroom/).
- [Ayuda de Classroom: cuentas de usuario](https://support.google.com/edu/classroom/answer/7582372?hl=es).
- [Ayuda de Classroom: aplicación móvil](https://support.google.com/edu/classroom/answer/6118412?hl=es-001).
- [Ayuda de Classroom: invitar alumnos](https://support.google.com/edu/classroom/answer/6020282?hl=es).
- [Ayuda de Classroom: calendarios](https://support.google.com/edu/classroom/answer/7184151?hl=es).
- [Ayuda de Classroom: videollamadas](https://support.google.com/edu/classroom/answer/9776888?hl=es).
- [Ayuda de Classroom: calificar y devolver tareas](https://support.google.com/edu/classroom/answer/6020294?hl=es).
- [Ayuda de Classroom: calificar, evaluar y comentar](https://support.google.com/edu/classroom/answer/16643267?hl=es).
