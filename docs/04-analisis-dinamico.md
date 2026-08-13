# 04. Análisis dinámico

## Protocolo

El análisis dinámico consiste en ejecutar acciones normales y registrar respuestas visibles y tráfico propio. Antes de cada caso se define la precondición; durante la prueba no se alteran solicitudes, no se automatizan grandes volúmenes y no se consultan identificadores ajenos.

| Caso | Precondición | Acción | Evidencia esperada |
|---|---|---|---|
| AD-01 | Cuenta de prueba válida | Iniciar sesión | Transición a área autenticada |
| AD-02 | Usuario dentro de un curso | Abrir el curso | Navegación contextual |
| AD-03 | Docente de prueba | Crear contenido inocuo | Confirmación y nuevo estado |
| AD-04 | Estudiante de prueba | Enviar respuesta sintética | Estado de entrega |
| AD-05 | Sesión expirada | Recargar una vista protegida | Solicitud de autenticación |

## Registro de red

Para cada solicitud relevante se anotan método, categoría aproximada del recurso, código de estado, tiempo y relación con la acción. Se eliminan URL con identificadores, cuerpos personales, cookies y encabezados de autorización. No se infiere una API pública a partir de endpoints internos.

## Resultados iniciales

Los flujos sugieren separación por identidad, contexto de curso y permisos. Esta es una inferencia funcional útil para diseñar EduRoom, no una afirmación sobre los componentes internos de la plataforma analizada.

> **Espacio de evidencia EV-04-01:** cronología acción–respuesta, con valores sensibles censurados.

> **Espacio de evidencia EV-04-02:** captura de estados anterior y posterior al caso AD-03.

## Criterio de detención

La prueba se detiene ante datos de terceros, errores que sugieran exposición no prevista, necesidad de eludir controles o volumen que pudiera afectar el servicio. El hallazgo se documenta sin intentar ampliarlo.

