# 02. Análisis funcional de Google Classroom

## Método y frontera

Este capítulo describe únicamente comportamiento observable mediante navegación normal en una cuenta personal de prueba y documentación pública. El nombre del producto se usa con finalidad de identificación académica; no implica afiliación. No se copian estilos, textos extensos, iconos, recursos ni nomenclatura propietaria en EduRoom.

## Inventario preliminar de capacidades observables

| Área | Entrada del usuario | Resultado observable | Certeza |
|---|---|---|---|
| Acceso | Autenticación válida | Sesión y vista de cursos | Alta |
| Cursos | Selección de una clase | Contexto del curso | Alta |
| Participación | Código o invitación autorizada | Asociación a una clase | Alta |
| Publicación | Contenido creado por docente | Elemento visible según permisos | Media |
| Entregas | Archivo o respuesta del estudiante | Estado de entrega | Media |
| Evaluación | Calificación y comentario | Retroalimentación visible | Media |

## Flujo de referencia

Un usuario autenticado consulta sus cursos, entra a uno y actúa según su rol. La interfaz comunica estados y limita acciones. Esta descripción no afirma tecnología, tablas ni servicios internos.

## Diferenciación de EduRoom

EduRoom adopta capacidades genéricas de un LMS: cuentas, roles, cursos y códigos de acceso. Su identidad visual usa una paleta crema, azul petróleo y coral; sus textos, componentes y modelo se desarrollaron desde cero. La primera versión no intenta reproducir paridad funcional ni apariencia exacta.

> **Espacio de evidencia EV-02-01:** vista general anonimizada de la cuenta de prueba.

> **Espacio de evidencia EV-02-02:** secuencia de navegación con fecha, navegador y resultado esperado/obtenido.

## Riesgos de interpretación

Una respuesta HTTP no revela necesariamente una entidad persistente; una pantalla puede combinar varias fuentes. Por eso las conclusiones estructurales se expresan como hipótesis y se validan únicamente contra las necesidades de la réplica.

