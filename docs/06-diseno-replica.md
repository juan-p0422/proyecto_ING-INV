# 06. Diseño de la réplica educativa EduRoom

## Objetivo de EduRoom

EduRoom es un prototipo académico de sistema de gestión del aprendizaje (LMS). Su objetivo es demostrar, con una implementación original, cómo pueden organizarse cursos, comunicación, actividades, entregas y evaluación mediante flujos comunes en plataformas educativas.

El proyecto se construye a partir de observación de caja negra limitada a interfaces públicas o propias, flujos ejecutados con cuentas de prueba, tráfico generado por esas cuentas y documentación pública. No extrae código, recursos privados ni información no autorizada del producto estudiado.

## Diferencias frente a Google Classroom

EduRoom no busca una copia visual ni comercial de Google Classroom. Las diferencias deliberadas incluyen:

- identidad, nombre, símbolo y textos propios;
- paleta editorial verde, ámbar y marfil, sin reproducir colores de marca;
- jerarquía visual basada en composición editorial, esquinas asimétricas y motivos circulares;
- navegación, tarjetas, formularios y estados diseñados específicamente para este prototipo;
- alcance reducido a los casos de uso académicos esenciales;
- autenticación local mediante la API de EduRoom, sin servicios o cuentas de Google;
- ausencia de integraciones propietarias, almacenamiento en Drive, videollamadas o calendarios externos.

Google Classroom es una marca y producto de Google. EduRoom es un trabajo independiente, educativo y sin afiliación.

## Funcionalidades replicadas de forma conceptual

La réplica reproduce conceptos generales de un LMS, no elementos protegidos de una interfaz específica:

| Área conceptual | Implementación en EduRoom |
|---|---|
| Acceso | Registro con rol e inicio de sesión mediante JWT |
| Aula | Creación de cursos por docentes y unión por código para estudiantes |
| Tablón | Publicación de anuncios y conversación general del curso |
| Trabajo de clase | Creación, listado y consulta de tareas |
| Entregas | Respuesta en texto y actualización de la entrega |
| Evaluación | Calificación de 0 a 100 y retroalimentación docente |
| Personas | Consulta de docentes y estudiantes inscritos |
| Conversación | Comentarios generales y comentarios asociados a una tarea |

## Arquitectura frontend

El frontend utiliza React, Vite y TypeScript. `App.tsx` define las rutas y `ProtectedRoute` limita las vistas privadas. `AuthContext` mantiene la sesión de interfaz y guarda, de forma deliberadamente simple para el prototipo, el JWT y el usuario en `localStorage`.

```text
BrowserRouter
├── /login y /register
└── ProtectedRoute
    ├── /dashboard
    ├── /courses/:id
    │   ├── /stream
    │   ├── /classwork
    │   └── /people
    └── /assignments/:id
            │
            ▼
   services/api.ts ──Authorization: Bearer──> API REST
```

Los componentes reutilizables principales son `Layout`, `Navbar`, `CourseCard`, `AssignmentCard`, `AnnouncementCard`, `CommentBox`, `Modal`, `ProtectedRoute` y los estados de carga, error y vacío. Las páginas mantienen el estado específico de cada flujo y consumen un cliente API único configurado con `VITE_API_URL`.

La interfaz se adapta a escritorio, tableta y móvil mediante cuadrículas fluidas y puntos de quiebre. Los formularios conservan etiquetas visibles, mensajes con roles semánticos y foco perceptible.

### Integridad conceptual del cliente

`frontend/src/security/clientIntegrity.ts` envía `VITE_BUILD_ID` a `POST /api/security/integrity`. Si el servidor implementa el contrato, puede indicar si el identificador corresponde a un build reconocido; si el endpoint no existe, la interfaz informa “sin endpoint” y continúa funcionando.

Esta comprobación es exclusivamente educativa: cualquier lógica ejecutada en el navegador puede inspeccionarse o alterarse. No sustituye validación de entradas, autenticación, autorización, controles de acceso, TLS, gestión segura de secretos ni verificación del lado servidor.

## Flujo de usuario docente

1. El docente se registra seleccionando su rol o inicia sesión.
2. En el panel crea un curso con nombre, descripción y color distintivo.
3. Comparte el código generado con sus estudiantes.
4. En **Tablón** publica anuncios y responde comentarios del grupo.
5. En **Trabajo de clase** crea tareas con instrucciones y fecha límite opcional.
6. Abre una tarea para consultar entregas.
7. Asigna una calificación de 0 a 100 y retroalimentación individual.
8. En **Personas** consulta la comunidad inscrita.

## Flujo de usuario estudiante

1. El estudiante se registra seleccionando su rol o inicia sesión.
2. En el panel introduce el código compartido por el docente.
3. Consulta anuncios y participa en comentarios desde **Tablón**.
4. Revisa las actividades y sus estados en **Trabajo de clase**.
5. Abre una tarea, lee las instrucciones y entrega una respuesta en texto.
6. Puede actualizar la respuesta; al hacerlo vuelve al estado pendiente de revisión.
7. Consulta la calificación y retroalimentación cuando el docente evalúa.
8. Usa los comentarios de la actividad para resolver dudas en contexto.

## Capturas sugeridas

- **EV-06-01:** inicio de sesión y registro con selección de rol.
- **EV-06-02:** panel docente con cursos y diálogo de creación.
- **EV-06-03:** panel estudiante y diálogo de unión mediante código.
- **EV-06-04:** cabecera original del curso y pestaña Tablón con anuncios.
- **EV-06-05:** Trabajo de clase en estados docente y estudiante.
- **EV-06-06:** detalle de tarea con entrega textual del estudiante.
- **EV-06-07:** revisión, calificación y retroalimentación del docente.
- **EV-06-08:** vista Personas y adaptación móvil de las vistas principales.

Para que la evidencia sea reproducible, cada captura debería registrar resolución, rol de prueba, fecha, ruta visible y versión del build.
