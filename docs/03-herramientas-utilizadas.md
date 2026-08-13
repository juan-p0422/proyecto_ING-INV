# 03. Herramientas utilizadas

## Instrumentación

| Herramienta | Finalidad legítima | Datos capturados | Control |
|---|---|---|---|
| Navegador | Recorrer flujos manuales | Estados visibles | Cuenta de prueba |
| DevTools/Network | Revisar tráfico propio | Método, estado, tiempos | Ocultar tokens y cookies |
| DevTools/Application | Comprender sesión local | Claves y caducidad generales | No exportar secretos |
| Markdown | Bitácora reproducible | Notas y tablas | Revisión antes de commit |
| Git | Historial e integridad | Cambios del proyecto | Sin datos sensibles |
| Docker | Entorno repetible | Logs propios | Red local aislada |

## Entorno sugerido de registro

Anotar sistema operativo, versión del navegador, fecha, zona horaria, resolución, rol y precondiciones. Exportaciones HAR solo se conservarán si son indispensables y después de sanitizar encabezados, parámetros e información personal.

## Desarrollo de la réplica

Node.js y Express implementan la API; TypeScript aporta comprobación estática; Prisma modela PostgreSQL; React y Vite sirven la interfaz. JWT representa la sesión de API y bcrypt deriva hashes de contraseña. Docker y Render aportan ejecución local y despliegue.

> **Espacio de evidencia EV-03-01:** tabla de versiones obtenida con `node --version`, `npm --version` y `docker version`.

## Cadena de custodia

Cada evidencia debe registrar origen, responsable, transformación aplicada y hash SHA-256. No se modifica el original; para el reporte se trabaja con una copia anonimizada. La ausencia de datos sensibles tiene prioridad sobre conservar una captura completa.

