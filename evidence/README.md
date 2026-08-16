# Evidencias académicas de EduRoom

Este directorio organiza la evidencia de la ingeniería inversa ética y de la implementación independiente de EduRoom.

**Aplicación evaluada:** [EduRoom en Render](https://eduroom-znb0.onrender.com)

**Repositorio:** [proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV)

**Checklist maestro:** [`docs/13-evidencias.md`](../docs/13-evidencias.md)

## Estructura

```text
evidence/
├── api/                     Respuestas y ejecuciones sanitizadas de la API
├── ui/
│   ├── google-classroom/    Capturas propias, manuales y anonimizadas
│   └── eduroom/             Capturas de EduRoom obtenidas desde Render
├── security/                Checksum, cifrado, ofuscación y controles defensivos
├── render/                  Deploy, variables ocultas y disponibilidad
├── github/                  Repositorio, commit o etiqueta de entrega
├── database/                Esquema y datos sintéticos cifrados
├── performance/
│   └── eduroom/             Métricas ligeras y capturas del cliente público
└── presentation/            Evidencia seleccionada para exposición y PDF
```

Los archivos `.gitkeep` conservan en Git las carpetas todavía vacías. Pueden permanecer cuando se agreguen evidencias.

## Alcance ético

- Las capturas de Google Classroom deben ser realizadas manualmente por el alumno con una cuenta controlada.
- Ningún script del proyecto debe iniciar sesión, navegar o capturar Google Classroom.
- No se incorporan logos, recursos comerciales ni activos de Google a EduRoom.
- La comparación se limita a flujos, jerarquía y comportamiento; no pretende equivalencia pixel a pixel.
- Solo se ejecutan pruebas sobre EduRoom, infraestructura propia y datos sintéticos.

## Convención de nombres

Formato:

```text
<PREFIJO>-<NÚMERO>-<descripcion-corta>[-<viewport>].<extensión>
```

Prefijos:

| Prefijo | Categoría | Ejemplo |
|---|---|---|
| `GC` | Google Classroom observado | `GC-01-dashboard.png` |
| `ER` | Interfaz EduRoom | `ER-01-login-1280x720.png` |
| `API` | API de EduRoom | `API-01-health.png` |
| `SEC` | Seguridad | `SEC-01-integrity-ok.png` |
| `RND` | Render | `RND-01-deploy-success.png` |
| `GH` | GitHub | `GH-01-repository.png` |
| `DB` | Base de datos | `DB-01-secure-note-ciphertext.png` |
| `PRE` | Presentación | `PRE-01-demo-flow.png` |

Reglas:

- usar dos dígitos correlativos;
- usar minúsculas, números y guiones en la descripción;
- añadir el viewport cuando sea relevante, por ejemplo `1280x720`;
- no incluir nombres, correos, códigos de clase, IDs o fechas personales en el nombre;
- no reutilizar un ID para otra evidencia;
- no sobrescribir el original: crear una nueva revisión, por ejemplo `SEC-01-integrity-ok-r2.png`.

Las capturas Playwright existentes conservan sus nombres actuales porque otros documentos ya las referencian. Para la carpeta final de presentación puede seleccionarse una copia anonimizada con el nombre canónico.

## Estados del checklist

| Estado | Significado |
|---|---|
| ✅ Disponible | Existe un archivo comprobable en el repositorio |
| ◐ Parcial | Existe evidencia relacionada, pero no muestra toda la acción solicitada |
| ⬜ Pendiente | Debe capturarse manualmente o exportarse |
| ⛔ No aplicable | No corresponde a la versión evaluada; requiere justificación |

## Procedimiento de incorporación

1. Preparar una cuenta demo y contenido sintético.
2. Ejecutar una sola vez el flujo necesario.
3. Capturar únicamente la ventana o región relevante.
4. Crear una copia de trabajo y ocultar de forma irreversible los datos sensibles.
5. Revisar barra de direcciones, pestañas, consola, DevTools, notificaciones y metadatos.
6. Asignar el nombre canónico.
7. Calcular SHA-256 de la versión anonimizada.
8. Registrar archivo, fecha, entorno, commit, acción, resultado y limitaciones en `docs/13-evidencias.md`.
9. Abrir la imagen final al 100 % para confirmar legibilidad y censura.
10. Incluir en `presentation/` solo una selección; conservar el original sanitizado en su categoría.

## Privacidad obligatoria

Antes de confirmar una evidencia:

- ocultar correos y nombres personales;
- ocultar fotografías, avatares y notificaciones;
- ocultar contraseñas, JWT, cookies y encabezados `Authorization`;
- ocultar claves, secretos, cadenas de conexión y valores de variables;
- ocultar códigos de clase reales, invitaciones, IDs y URL privadas;
- usar cuentas demo y archivos sintéticos;
- evitar capturar el administrador de contraseñas, correo o mensajería;
- eliminar originales sensibles que no deban conservarse según la política institucional.

En DevTools, no mostrar cuerpos de autenticación, cookies, almacenamiento con tokens, query strings sensibles ni respuestas con identificadores personales.

## Metadatos mínimos

Cada evidencia debe tener una ficha en el checklist:

| Campo | Ejemplo |
|---|---|
| ID | `SEC-01` |
| Fecha y zona | `2026-08-15 18:30 America/Mexico_City` |
| Entorno | Render Production |
| Fuente | EduRoom |
| Rol | Profesor demo |
| Acción | Consultar integridad |
| Resultado | `verified` |
| Archivo | `evidence/security/SEC-01-integrity-ok.png` |
| Commit | Hash corto de la entrega |
| SHA-256 | Hash de la evidencia anonimizada |
| Datos ocultos | Correo e identificadores |
| Limitaciones | Estado correspondiente al arranque |

## Cálculo de SHA-256

PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath evidence/security/SEC-01-integrity-ok.png
```

Linux o macOS:

```bash
sha256sum evidence/security/SEC-01-integrity-ok.png
```

El hash debe calcularse después de anonimizar la imagen. Si la evidencia cambia, también cambia su hash.

## Inventario inicial

- `ui/eduroom/capture-manifest.json` registra 27 capturas automatizadas de nueve flujos en tres viewports.
- La carpeta también conserva nombres legados usados por el comparativo visual; no deben contarse como ejecuciones adicionales sin revisar el manifest.
- `ui/google-classroom/README.md` contiene el protocolo para capturas manuales; actualmente no acredita que ya existan capturas de Classroom.
- `performance/eduroom/` conserva una medición puntual reproducible del cliente público; no representa memoria del servidor ni un benchmark.
- Las carpetas API, seguridad, Render, GitHub, base de datos y presentación se crean como contenedores de entrega. Su existencia no equivale a evidencia completada.

## Exclusiones

No confirmar:

- archivos `.env`;
- volcados completos de base de datos;
- HAR sin sanitizar;
- exportaciones de cookies o almacenamiento local;
- tokens o credenciales demo;
- paneles con valores de secretos;
- capturas de cuentas de terceros;
- artefactos de Google descargados de Internet.
