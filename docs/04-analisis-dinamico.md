# 04. Análisis dinámico seguro desde navegador

## 4.1 Alcance y objetivo

El análisis dinámico estudia una aplicación mientras se ejecuta, relacionando acciones legítimas del usuario con cambios visibles, solicitudes de red y métricas generales del navegador. En este proyecto se aplica a Google Classroom mediante navegación manual con una cuenta controlada y contenido sintético.

Los objetivos son:

1. Describir flujos funcionales observables, como abrir una clase, consultar una tarea o realizar una entrega de prueba.
2. Identificar categorías generales de entrada y salida sin inferir detalles internos no demostrables.
3. Registrar códigos de estado, tiempos, tamaños y comportamiento del cliente de manera agregada.
4. Derivar requisitos de seguridad y rendimiento para EduRoom.
5. Generar evidencia académica reproducible, anonimizada y proporcional.

Este procedimiento es **solo de observación**. No se altera tráfico, no se repiten solicitudes fuera de la navegación ordinaria, no se automatiza la recopilación, no se realizan pruebas ofensivas y no se accede a información de terceros. Una solicitud observada no se presenta como una API pública ni se reutiliza fuera de su flujo legítimo.

## 4.2 Principios de ejecución segura

| Principio | Aplicación práctica |
|---|---|
| Autorización | Usar únicamente una cuenta, clases y archivos controlados por el investigador |
| Minimización | Registrar categorías y métricas, no cuerpos completos ni valores de sesión |
| No interferencia | Ejecutar cada flujo manualmente una cantidad mínima de veces |
| No modificación | No editar, reenviar, importar ni reproducir solicitudes observadas |
| Anonimización | Ocultar correos, nombres, códigos, identificadores, cookies y tokens antes de guardar evidencia |
| Trazabilidad | Documentar fecha, versión, precondiciones, acción y resultado |
| Detención | Finalizar la prueba si aparecen datos ajenos o si continuar exige superar un control |

## 4.3 Ambiente de prueba

### 4.3.1 Configuración recomendada

| Componente | Configuración académica segura | Registro permitido |
|---|---|---|
| Navegador | Versión estable y perfil separado para la práctica | Nombre y versión del navegador |
| Cuenta | Personal o académica controlada, sin datos reales de terceros | Tipo de cuenta y rol, nunca credenciales |
| Clase de prueba | Curso creado o autorizado para la práctica | Alias ficticio del curso |
| Contenido | Textos, fechas y archivos completamente sintéticos | Descripción general y hash del archivo de prueba |
| DevTools | Network, Application, Performance y Memory del navegador | Métricas y capturas ya censuradas |
| OWASP ZAP | Opcional y exclusivamente en modo pasivo | Alertas generales revisadas y sanitizadas |
| Red local | Red confiable, sin captura de tráfico de otros dispositivos | Tipo de conexión y latencia aproximada |
| Evidencias | Capturas manuales, una por momento relevante | PNG anonimizado y ficha de evidencia |

### 4.3.2 Preparación

1. Definir el flujo, resultado esperado y criterio de detención antes de iniciar sesión.
2. Crear un perfil de navegador dedicado, sin extensiones innecesarias ni cuentas personales adicionales.
3. Preparar una clase, usuarios y documentos sintéticos bajo control del investigador.
4. Cerrar pestañas que puedan mostrar correo, calendario u otra información personal.
5. Desactivar sincronización de capturas y copias automáticas si pudieran transferir evidencia sensible.
6. Anotar sistema operativo, navegador, fecha, zona horaria, tipo de red y rol de prueba.
7. Definir qué regiones de cada captura se censurarán antes de incorporarla al reporte.

No debe utilizarse navegación privada como sustituto de un ambiente controlado: puede reducir persistencia local, pero no elimina información de la sesión ni cambia las obligaciones éticas.

### 4.3.3 Uso opcional de OWASP ZAP

DevTools es suficiente para el procedimiento principal. Si la institución autoriza ZAP, se empleará únicamente como proxy pasivo de la sesión propia. Deben permanecer deshabilitados el escaneo activo, la exploración automatizada, el *fuzzer*, la repetición de solicitudes y cualquier complemento que genere tráfico adicional.

El proxy puede observar contenido sensible de la sesión. Por ello:

- se usa un perfil y una cuenta de prueba;
- no se guarda una sesión persistente de ZAP con tráfico de Google Classroom;
- no se exportan solicitudes, respuestas, HAR, cookies o certificados de la sesión;
- se registran solo categorías de alertas, encabezados no sensibles y métricas generales;
- se elimina el material temporal al terminar conforme a la política institucional.

Si no puede garantizarse esta configuración o no existe autorización expresa, ZAP no se utiliza y el estudio continúa únicamente con DevTools.

## 4.4 Diseño de casos de observación

Cada caso debe contener una sola acción principal para facilitar la relación temporal entre entrada y salida.

| Caso | Precondición | Acción manual | Resultado visible esperado |
|---|---|---|---|
| AD-01 | Cuenta de prueba autorizada | Acceder normalmente | Área autenticada y clases asociadas a la cuenta |
| AD-02 | Cuenta inscrita en una clase sintética | Abrir la clase | Contexto, navegación y publicaciones autorizadas |
| AD-03 | Rol docente en clase propia | Crear una publicación ficticia | Nuevo elemento visible en el contexto correcto |
| AD-04 | Tarea sintética asignada a estudiante controlado | Abrir la tarea | Instrucciones, adjuntos y vencimiento visibles |
| AD-05 | Archivo ficticio preparado | Entregar el trabajo manualmente | Cambio de estado y marca temporal visible |
| AD-06 | Entrega de prueba disponible al docente | Devolver con comentario ficticio | Nuevo estado y retroalimentación para el usuario controlado |
| AD-07 | Preferencias accesibles | Consultar configuración de notificaciones | Opciones visibles sin modificarlas, salvo que el caso lo requiera |

No se fuerza expiración de sesión, no se provocan errores deliberados contra el servicio y no se prueban identificadores distintos a los que la interfaz presenta legítimamente a la propia cuenta.

## 4.5 Procedimiento con DevTools: pestaña Network

### 4.5.1 Preparación de la captura

1. Abrir Google Classroom en el perfil de prueba.
2. Abrir las herramientas de desarrollador mediante el menú del navegador.
3. Seleccionar la pestaña **Network** o **Red**.
4. Desactivar **Preserve log** para evitar mezclar navegaciones y conservar datos más tiempo del necesario.
5. Limpiar la lista antes de cada caso mediante el botón correspondiente.
6. Mantener desactivadas opciones que modifiquen las condiciones, como bloqueo de solicitudes o limitación artificial de red, salvo que el objetivo sea medir EduRoom en un entorno propio.
7. Ejecutar una sola acción manual y detener la observación al aparecer el resultado.

No se utiliza **Copy as cURL**, no se edita y reenvía una solicitud, y no se exporta un archivo HAR de la sesión. Un HAR suele contener URL completas, encabezados, cuerpos, cookies y tokens, por lo que una captura agregada es suficiente para este estudio.

### 4.5.2 Filtro Fetch/XHR

El filtro **Fetch/XHR** reduce la vista a solicitudes iniciadas por mecanismos comunes de comunicación asíncrona. El objetivo no es descubrir endpoints, sino observar si una acción visible coincide temporalmente con una o más comunicaciones de datos.

Para cada flujo pueden anotarse:

- cantidad aproximada de solicitudes Fetch/XHR;
- método HTTP mostrado, expresado de forma agregada;
- familia de recurso, por ejemplo «consulta de clase», «actualización de entrega» o «configuración»;
- dominio general cuando no revele información sensible;
- código de estado;
- duración y tamaño transferido;
- relación temporal con el cambio de interfaz.

Las URL se recortan antes de una captura para ocultar rutas, consultas e identificadores. No se inspeccionan ni copian cuerpos cuando puedan contener nombres, texto académico, archivos, correo o datos de sesión.

### 4.5.3 Tipos de peticiones propias

La navegación ordinaria puede mostrar solicitudes de documentos, scripts, hojas de estilo, imágenes, fuentes, medios y Fetch/XHR. También pueden aparecer conexiones persistentes u otros tipos administrados por el navegador. La clasificación permitida es descriptiva:

| Categoría visible | Pregunta de observación segura |
|---|---|
| Documento | ¿Cuánto tarda en iniciar la navegación principal? |
| Script/estilo | ¿Qué proporción del tamaño transferido corresponde a recursos estáticos? |
| Imagen/fuente | ¿Se reutiliza el recurso desde caché en una segunda vista normal? |
| Fetch/XHR | ¿Coincide con la acción propia y qué estado general devuelve? |
| Otros | ¿Es necesario para representar el flujo observado? |

No se atribuye un propósito interno únicamente por el nombre o la secuencia de una solicitud. Toda explicación que exceda lo visible se marca como inferencia.

### 4.5.4 Códigos de estado

Se registra el código mostrado por el navegador sin intentar provocar respuestas adicionales.

| Familia | Interpretación general permitida |
|---|---|
| `2xx` | La solicitud observada fue procesada satisfactoriamente |
| `3xx` | Ocurrió una redirección o resolución equivalente |
| `4xx` | La solicitud no pudo procesarse por una condición del cliente o autorización |
| `5xx` | El servicio informó una condición de servidor |

Un código aislado no demuestra vulnerabilidad ni causa raíz. Si aparece un error inesperado, se registra el contexto visible y se detiene el caso; no se repite de forma intensiva.

### 4.5.5 Tiempos de carga

La columna **Time** y el panel **Timing** permiten observar duración total y fases generales. Para el reporte se prefieren métricas agregadas: tiempo de carga inicial, duración aproximada de la acción y rango de respuesta de Fetch/XHR.

La medición debe repetirse como máximo unas pocas veces de forma manual y justificable. Se anotan red, equipo, caché y hora, porque los resultados dependen de conectividad, ubicación, carga del servicio y estado del navegador. No se interpreta una medición local como rendimiento global del producto.

### 4.5.6 Tamaño de recursos

Las columnas **Size**, **Transferred** o equivalentes permiten distinguir bytes transferidos y tamaño del recurso. Se registran totales o rangos, no contenidos. Una diferencia entre tamaño transferido y tamaño del recurso puede ser compatible con compresión o caché, pero no prueba por sí sola una tecnología concreta.

### 4.5.7 Almacenamiento y cookies desde Network

Los encabezados pueden indicar que existe gestión de sesión o caché. Se permite anotar la presencia de atributos generales, como `Secure`, `HttpOnly` o `SameSite`, sin registrar nombres ni valores de cookies. Los encabezados `Authorization`, `Cookie` y `Set-Cookie`, así como parámetros de sesión, deben permanecer fuera de capturas y notas.

## 4.6 Procedimiento con DevTools: pestaña Application

La pestaña **Application** o **Aplicación** muestra almacenamiento y componentes administrados por el navegador. Se consulta únicamente el origen abierto y se observa la estructura general; no se edita, elimina, exporta o reutiliza ningún valor durante el caso.

### 4.6.1 Cookies

Puede observarse:

- cantidad aproximada de cookies para el origen;
- alcance por dominio y ruta;
- presencia de fecha de expiración;
- atributos `Secure`, `HttpOnly` y `SameSite` cuando la interfaz los muestre.

No debe copiarse ni divulgarse el nombre completo, valor, identificador, fecha exacta asociable a la sesión o encabezado de cookie. Una cookie de autenticación permite representar una sesión y debe tratarse como credencial.

### 4.6.2 Local Storage

Puede registrarse si el origen utiliza almacenamiento local y clasificar de forma general sus entradas como preferencia, estado de interfaz o dato no identificable, solo cuando resulte evidente por observación normal.

No se copian claves o valores, no se buscan tokens, no se alteran entradas y no se concluye que una clave tenga un propósito concreto por su nombre. Si se ve información personal o de sesión, se cierra el panel sin capturarla.

### 4.6.3 Session Storage

Se observa únicamente la existencia y volumen aproximado de entradas durante la pestaña actual. Este almacenamiento puede variar al cerrar la sesión o pestaña. No se comparan cuentas reales ni se exportan valores.

### 4.6.4 Service Workers

Puede anotarse si el navegador muestra un *service worker* registrado para el origen, su estado general y alcance visible. No se detiene, actualiza, inspecciona su código ni se activa la opción de trabajo sin conexión. Su presencia es compatible con funciones de caché o ciclo de aplicación, pero no permite afirmar su responsabilidad exacta.

### 4.6.5 Cache Storage y caché del navegador

Puede observarse la existencia de contenedores de caché y el tipo general de recursos, sin abrir ni guardar su contenido. No se divulgan URL completas, respuestas ni datos de usuario. Para comparar una segunda carga ordinaria se registra solo si el panel Network indica uso de caché; no se fuerza una descarga repetida.

### 4.6.6 Matriz de registro permitido

| Área | Sí se registra | No se copia ni divulga |
|---|---|---|
| Cookies | Cantidad y atributos defensivos generales | Nombre, valor, token, identificador o encabezado completo |
| Local Storage | Existencia y categoría aproximada | Claves, valores, perfiles o contenido académico |
| Session Storage | Existencia y comportamiento temporal general | Datos de sesión o comparaciones entre terceros |
| Service Workers | Presencia, estado y alcance general | Código, URL completa o respuestas interceptadas |
| Cache | Uso aparente y tamaños agregados | Contenido, URL con parámetros o archivos personales |

## 4.7 Análisis de memoria y rendimiento desde navegador

### 4.7.1 Pestaña Performance

La herramienta **Performance** permite grabar durante unos segundos la interacción de la propia pestaña. El procedimiento seguro es:

1. Cerrar otras aplicaciones y pestañas para reducir ruido y exposición.
2. Abrir una vista de prueba sin información personal.
3. Iniciar la grabación.
4. Ejecutar una sola acción normal, como cambiar entre dos secciones de la clase sintética.
5. Detener la grabación inmediatamente.
6. Registrar métricas agregadas y descartar la traza local cuando termine la práctica.

Pueden anotarse duración total, actividad aproximada del hilo principal, eventos de renderizado, tareas largas y cambios de diseño. No se extraen funciones, argumentos, textos o detalles de implementación propietaria. El objetivo es describir la experiencia visible y establecer criterios comparables para EduRoom.

### 4.7.2 Memory snapshots

Una instantánea de memoria puede contener texto, objetos de la interfaz, URL y otros datos presentes en la sesión. Por ello su uso es opcional y de riesgo superior. Si la práctica académica exige una instantánea:

- se usa exclusivamente la sesión sintética controlada;
- se verifica previamente que no haya nombres, mensajes ni archivos reales;
- se toma una sola instantánea para observar métricas globales;
- se registran únicamente memoria total aproximada, cantidad agregada de objetos y tendencia entre momentos;
- no se buscan cadenas, credenciales, objetos internos o contenido de usuario;
- no se incorpora el archivo de instantánea al repositorio ni al reporte;
- se elimina de forma segura al terminar la medición.

Para la mayoría de los objetivos, el monitor de rendimiento y las métricas agregadas son suficientes y reducen la exposición.

### 4.7.3 Métricas generales

| Métrica | Interpretación permitida | Limitación |
|---|---|---|
| Tiempo de carga observado | Experiencia en un equipo y red concretos | No representa a todos los usuarios |
| Uso aproximado de memoria | Huella de la pestaña durante el caso | Incluye navegador, extensiones y cachés |
| Actividad del hilo principal | Trabajo del cliente durante una interacción | No identifica arquitectura de servidor |
| Tareas largas | Posibles bloqueos perceptibles | Requieren repetición controlada para confirmar |
| Cambios de diseño/renderizado | Trabajo visual producido por la interfaz | No demuestra por sí solo un problema |
| Recursos transferidos | Volumen aproximado de la sesión | Varía por caché, compresión y estado previo |

Las mediciones del navegador son muestras, no pruebas de la infraestructura interna ni evaluaciones exhaustivas de seguridad.

### 4.7.4 Medición concreta de EduRoom y cierre pendiente de Classroom

El procedimiento reproducible y los resultados se documentan en [25. Medición de Performance y Memory](25-medicion-performance-memory.md). Una navegación pública controlada de EduRoom en Render, ejecutada el `2026-08-16T06:42:33.184Z` con Chromium 151 y viewport 1280 × 720, obtuvo:

| Métrica | Resultado puntual |
|---|---:|
| Load time | 481.60 ms |
| DOMContentLoaded | 481.30 ms |
| Recursos aproximados, incluido documento | 5 |
| Transferencia aproximada | 93,361 bytes |
| JS heap usado aproximado | 2,185,404 bytes |

La evidencia estructurada está en [`evidence/performance/eduroom/`](../evidence/performance/eduroom/) y se genera con `npm run performance:eduroom`. Es una muestra del cliente público, no de la memoria del servidor ni un benchmark estadístico.

Para Google Classroom se mantiene **[PENDIENTE DE MEDICIÓN MANUAL]**. Las capturas Performance/Memory deben ser obtenidas y validadas manualmente; no se automatiza la plataforma ni se publican snapshots de heap.

## 4.8 Tabla de hallazgos esperados

Esta tabla sirve como hipótesis de observación. Debe completarse con resultados reales sin copiar detalles sensibles.

| Flujo observado | Entrada controlada | Salida visible | Recurso de red observado de forma genérica | Evidencia |
|---|---|---|---|---|
| Inicio de sesión normal | Selección de cuenta controlada | Área autenticada | Documento, redirección y configuración de sesión | EV-04-01 |
| Lista de clases | Apertura de la página principal | Tarjetas de clases autorizadas | Consulta Fetch/XHR de datos de usuario | EV-04-02 |
| Apertura de clase | Selección de una clase sintética | Tablón o contexto del curso | Consulta de contexto y recursos estáticos | EV-04-03 |
| Consulta de trabajo | Selección de una tarea ficticia | Instrucciones, fecha y adjuntos de prueba | Consulta Fetch/XHR de actividad | EV-04-04 |
| Publicación de prueba | Texto sintético creado por docente controlado | Nuevo elemento visible | Solicitud de actualización y consulta posterior | EV-04-05 |
| Entrega de prueba | Archivo ficticio y confirmación manual | Estado entregado y marca temporal | Transferencia de archivo y actualización de estado | EV-04-06 |
| Devolución de trabajo | Comentario y puntuación ficticios | Estado devuelto y retroalimentación visible | Actualización de evaluación/notificación | EV-04-07 |
| Segunda navegación normal | Regreso a una vista ya abierta | Carga potencialmente más breve | Recursos servidos desde caché y nuevas consultas | EV-04-08 |

Los nombres de recursos son categorías creadas para el reporte; no corresponden necesariamente a endpoints o componentes reales.

## 4.9 Tratamiento y sanitización de evidencias

Las capturas se realizan manualmente. Se recomienda encuadrar desde el inicio solo las columnas necesarias, en lugar de capturar la pantalla completa y depender únicamente de censura posterior.

Antes de almacenar una evidencia deben ocultarse:

- nombre, correo, fotografía y avatar;
- códigos de clase e invitaciones;
- URL completas, rutas, parámetros e identificadores;
- encabezados y cuerpos de solicitud o respuesta;
- cookies, tokens y valores de almacenamiento;
- nombres de archivo, contenido de tareas y comentarios personales;
- datos de otras pestañas, extensiones o notificaciones del sistema.

La versión anonimizada recibe un identificador, se exporta como PNG y se calcula su SHA-256. Si existiera un original con datos sensibles, se mantiene fuera del repositorio con acceso restringido y se elimina según la política institucional. La imagen censurada debe revisarse visualmente antes de cada commit.

## 4.10 Recomendaciones de seguridad derivadas

Las siguientes recomendaciones se obtienen de patrones generales de aplicaciones cliente-servidor y orientan el diseño de EduRoom; no constituyen afirmaciones sobre deficiencias de Google Classroom.

### Protección de sesiones

- Transmitir credenciales y tokens solo mediante HTTPS.
- Reducir la vida útil de sesiones y definir cierre e invalidación.
- Evitar datos sensibles dentro de tokens legibles por el cliente.
- Preferir cookies `HttpOnly`, `Secure` y `SameSite` cuando la arquitectura adoptada las utilice.
- No registrar encabezados de autenticación en logs o herramientas de análisis.

### Validación en servidor

- Validar tipo, longitud, formato y relación de cada entrada.
- Aplicar límites de tamaño a cuerpos y archivos.
- No confiar en campos ocultos, controles visuales ni estados guardados por React.
- Responder con errores genéricos sin revelar detalles internos.

### Control de roles

- Comprobar identidad, rol y pertenencia al curso en cada operación protegida.
- Separar permisos de profesor y estudiante en el backend.
- Evitar acceso horizontal filtrando cada consulta por el usuario autorizado.
- Mantener pruebas de autorización positivas y negativas sobre EduRoom.

### Minimización de datos

- Solicitar y devolver únicamente campos necesarios para la vista.
- No almacenar datos académicos en el cliente durante más tiempo del requerido.
- Definir retención y eliminación de archivos, entregas y registros.
- Usar datos sintéticos en desarrollo, demostración y documentación.

### Auditoría

- Registrar eventos relevantes con usuario interno, acción, recurso, resultado y fecha.
- Excluir contraseñas, tokens, cuerpos completos y archivos de los logs.
- Proteger registros contra acceso no autorizado y manipulación.
- Establecer retención, revisión de alertas y respuesta ante incidentes.

## 4.11 Plantilla de evidencia

Copiar y completar una ficha por captura. Los campos sensibles deben sustituirse por una categoría, no por un valor parcialmente visible.

```markdown
### EV-04-XX — [Título breve]

| Campo | Registro |
|---|---|
| Fecha y hora | AAAA-MM-DD HH:MM, zona horaria |
| Responsable | Identificador académico, sin credenciales |
| Objetivo | [Qué se pretende observar] |
| Caso de prueba | AD-XX |
| Navegador y versión | [Dato] |
| Sistema operativo | [Dato] |
| Red | Local controlada; tipo de conexión |
| Tipo de cuenta/rol | Personal o académica controlada; profesor/estudiante |
| Precondición | [Estado inicial] |
| Entrada sintética | [Descripción, no dato sensible] |
| Acción manual | [Una acción concreta] |
| Salida visible | [Resultado] |
| Filtro de Network | Fetch/XHR, documento u otro |
| Código(s) de estado | [Valores agregados] |
| Tiempo aproximado | [Rango en ms/s] |
| Tamaño aproximado | [Rango en KB/MB] |
| Almacenamiento observado | [Existencia y atributos generales] |
| Resultado esperado/obtenido | [Comparación] |
| Clasificación | Observación / inferencia |
| Datos censurados | [Categorías ocultadas] |
| Archivo de captura | EV-04-XX.png |
| SHA-256 | [Hash de la captura anonimizada] |
| Observaciones | [Limitaciones y contexto] |
```

### Lista de capturas sugeridas

| Identificador | Encuadre recomendado |
|---|---|
| EV-04-01 | Estado visible antes y después del acceso, sin identidad |
| EV-04-02 | Network filtrado con URL y columnas sensibles fuera del encuadre |
| EV-04-03 | Resumen de códigos, tiempos y tamaños para abrir una clase |
| EV-04-04 | Application mostrando solo columnas de atributos, con nombres y valores ocultos |
| EV-04-05 | Performance con métricas generales de una interacción breve |
| EV-04-06 | Estado anterior y posterior de una entrega completamente sintética |
| EV-04-07 | Devolución y comentario ficticios en cuentas controladas |
| EV-04-08 | Tabla final de hallazgos, sin captura directa de secretos |

## 4.12 Criterio de detención y cierre

La sesión se detendrá si aparece información de terceros, si una herramienta intenta generar tráfico adicional, si se requiere alterar una solicitud, si la aplicación presenta un error inesperado que pudiera agravarse o si no puede garantizarse la anonimización.

Al finalizar:

1. Detener cualquier grabación de Network, Performance, Memory o proxy pasivo.
2. Cerrar sesión mediante la interfaz normal.
3. Cerrar el perfil de prueba.
4. Eliminar HAR, sesiones de proxy e instantáneas de memoria que no deban conservarse.
5. Revisar y anonimizar capturas manuales.
6. Completar las fichas de evidencia y calcular sus hashes.
7. Registrar limitaciones y cualquier desviación del protocolo.

El resultado esperado es una descripción académica de comportamiento externo. No se busca descubrir secretos, componentes internos o mecanismos de protección del servicio observado.
