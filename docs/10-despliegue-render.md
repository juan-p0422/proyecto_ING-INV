# 10. Despliegue en Render

## Arquitectura desplegada

El blueprint define una base PostgreSQL administrada, un servicio web Docker para la API y un sitio estático para React. La migración Prisma se ejecuta al iniciar el contenedor de backend.

## Procedimiento

1. Publicar el repositorio en un origen autorizado sin archivos `.env`.
2. En Render elegir **New Blueprint** y seleccionar el repositorio.
3. Revisar nombres, región y planes antes de aplicar `render.yaml`.
4. Esperar la creación de la base y el despliegue de la API.
5. Confirmar `GET /api/health` y después abrir el sitio.
6. Si cambian los hostnames, corregir `VITE_API_URL` en el frontend y `CORS_ORIGIN` en la API; redesplegar ambos.

## Variables

| Servicio | Variable | Fuente |
|---|---|---|
| API | `DATABASE_URL` | Base administrada |
| API | `JWT_SECRET` | Generada como secreto |
| API | `CORS_ORIGIN` | URL exacta del frontend |
| Frontend | `VITE_API_URL` | URL pública de API + `/api` |

## Comprobación

Registrar estado de migración, respuesta de salud, alta de un usuario de prueba, inicio de sesión y consulta de cursos. No usar credenciales de demostración en un entorno público.

> **Espacio de evidencia EV-10-01:** panel de servicios ocultando identificadores sensibles.

> **Espacio de evidencia EV-10-02:** respuesta del endpoint de salud y navegación final.

## Operación

Antes de uso real se deben revisar plan de disponibilidad, copias, retención de logs, dominio, alertas y política de privacidad. A agosto de 2026, la documentación de Render indica que PostgreSQL gratuito expira a los 30 días y no incluye copias de seguridad; sirve para la demostración, no para producción. Los planes y nombres del servicio pueden cambiar, por lo que el blueprint debe verificarse al desplegar.

## Referencias operativas

- [Render Blueprint YAML Reference](https://render.com/docs/blueprint-spec)
- [Render: Deploy for Free](https://render.com/docs/free)
- [Render: Monorepo Support](https://render.com/docs/monorepo-support)
