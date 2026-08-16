# Evidencia de Performance/Memory de EduRoom

Esta carpeta contiene mediciones ligeras de la página pública de EduRoom generadas por `tests/performance-eduroom.js`.

Cada ejecución realiza una sola navegación sin autenticación y crea:

- un JSON con contexto, métricas aproximadas y limitaciones;
- un screenshot de la vista pública correspondiente.

Comando desde la raíz:

```powershell
npm run performance:eduroom
```

Los archivos fechados no deben interpretarse como un benchmark estadístico ni como memoria del servidor. No se guardan URL de recursos, credenciales, tokens o datos personales. Este script no abre ni automatiza Google Classroom.
