# 20. Validación de seguridad del producto

## 20.1 Identificación

| Campo | Valor |
|---|---|
| Producto | EduRoom |
| Repositorio | [https://github.com/juan-p0422/proyecto_ING-INV](https://github.com/juan-p0422/proyecto_ING-INV) |
| Deploy | [https://eduroom-znb0.onrender.com](https://eduroom-znb0.onrender.com) |
| Fecha de auditoría | 15-08-2026 |
| Ambiente local | Windows, Node.js 20 o superior |
| Ambiente remoto | Render Production |
| Enfoque | Revisión de código, configuración, pruebas unitarias y comprobaciones no destructivas |

## 20.2 Resumen técnico

EduRoom implementa los cuatro mecanismos solicitados, pero con alcances diferentes:

- **Checksum:** SHA-256 sobre artefactos compilados, manifest JSON, verificador CLI, comprobación del backend antes del arranque y endpoint público resumido.
- **Cifrado:** AES-256-GCM usado realmente para el campo `SecureNote.encryptedPayload`; la clave se deriva desde `APP_ENCRYPTION_KEY`.
- **Ofuscación:** transformación moderada del JavaScript compilado mediante `javascript-obfuscator`.
- **Antireversing educativo:** diagnóstico de variables asociadas a instrumentación, aviso de producción y visualización del estado de integridad.

El dictamen es **cumplimiento técnico con advertencias**. Cifrado y checksum están implementados y probados. La ofuscación funciona localmente, pero el pipeline declarado de Render utiliza el build normal; por ello no se afirma que el bundle público actual esté ofuscado. El endpoint de integridad verifica 19 archivos JavaScript del backend, mientras que el verificador CLI cubre las 22 entradas del manifest, incluido el frontend.

## 20.3 Tabla de mecanismos implementados

| Mecanismo | Archivo principal | Propósito | Cómo probarlo | Resultado esperado | Evidencia esperada |
|---|---|---|---|---|---|
| Generación SHA-256 | `scripts/generate-checksum.js` | Crear manifest de artefactos | `node scripts/generate-checksum.js` después del build final | JSON válido y número de archivos | Consola con conteo y copia de `integrity-manifest.json` |
| Verificación CLI | `scripts/verify-integrity.js` | Detectar modificados, faltantes y nuevos | `node scripts/verify-integrity.js` | Salida 0 si coincide; 1 ante discrepancia | Log de éxito y prueba controlada en copia |
| Verificación de arranque | `backend/src/security/checksum.ts` | Comprobar backend antes de escuchar | Iniciar con `STRICT_INTEGRITY=false/true` en entorno controlado | Advertir o bloquear según política | Log de arranque sanitizado |
| Manifest de build | `integrity-manifest.json` | Congelar hashes, tamaños, scopes y fecha | Revisar esquema y comparar con artefactos | `version=1`, `algorithm=sha256` | Fragmento sin necesidad de mostrar todos los hashes |
| Endpoint de integridad | `backend/src/routes/security.ts` | Publicar estado resumido | `curl .../api/security/integrity` | Estado y contadores, sin rutas ni hashes | Respuesta JSON fechada |
| AES-256-GCM | `backend/src/security/crypto.ts` | Confidencialidad y autenticidad del campo | Ejecutar `crypto.test.ts` | Ida y vuelta, IV distinto y alteración rechazada | Resultado de cuatro pruebas |
| Uso del cifrado | `backend/src/routes/security.ts`, `backend/prisma/schema.prisma` | Cifrar notas antes de persistirlas | Crear nota sintética y revisar DB controlada | No aparece el marcador en `encryptedPayload` | Captura censurada de payload y recuperación |
| Ofuscación | `frontend/scripts/obfuscate-build.cjs` | Dificultar lectura casual del bundle | `npm run build:obfuscated` | JavaScript transformado y aplicación funcional | Log, tamaño y hash del bundle |
| Diagnóstico antidebug | `backend/src/security/antiDebug.ts` | Advertir señales ambientales | Arrancar una copia con variable de prueba | Advertencia con nombre, sin valor ni bloqueo | Log sanitizado |
| Estado visual | `frontend/src/security/clientIntegrity.ts`, `DashboardPage.tsx` | Mostrar el estado del backend | Abrir dashboard | Verificada, advertencia o no disponible | Captura del panel |

## 20.4 Checksum e integridad

### 20.4.1 Algoritmo

Los tres verificadores usan **SHA-256**:

- Node.js: `crypto.createHash('sha256')`;
- PowerShell: `Get-FileHash -Algorithm SHA256`;
- Linux/macOS: `sha256sum`.

SHA-256 produce 256 bits, representados por 64 caracteres hexadecimales. Detecta diferencias de bytes, pero no cifra, no identifica al autor y no protege el manifest frente a sustitución.

### 20.4.2 Archivos protegidos

`integrity-manifest.json` declara:

| Scope | Extensiones |
|---|---|
| `backend/dist` | `.js` |
| `frontend/dist` | `.js`, `.css`, `.html` |

El manifest auditado contiene 22 entradas: 19 del backend y 3 del frontend. Ignora directorios inexistentes, `.git`, `node_modules`, temporales y extensiones no declaradas.

`docs/checksums.sha256` es un segundo manifiesto para fuentes y documentación. Lo producen `scripts/checksum.ps1` y `scripts/checksum.sh`; excluye `dist`, dependencias, Git y archivos de ambiente privados.

### 20.4.3 Generación

```bash
npm run build:obfuscated
node scripts/generate-checksum.js
```

El generador:

1. recorre los scopes;
2. ordena las rutas;
3. calcula SHA-256 y tamaño;
4. registra fecha UTC;
5. escribe `integrity-manifest.json`;
6. termina con error si no encuentra artefactos.

El manifest debe generarse después de la última compilación u ofuscación. Regenerarlo sin investigar un fallo destruye la capacidad de distinguir un cambio autorizado de uno inesperado.

### 20.4.4 Verificación

```bash
node scripts/verify-integrity.js
```

El CLI valida formato y algoritmo, recalcula hashes y clasifica:

- **modificados:** ruta conocida con hash distinto;
- **faltantes:** entrada del manifest que ya no existe;
- **nuevos:** archivo actual dentro del scope sin entrada.

Cualquier discrepancia produce código de salida `1`.

El backend ejecuta `verifyBackendIntegrity` antes de abrir el puerto. Ese módulo filtra solo `backend/dist/**/*.js`; no verifica actualmente el frontend aunque esté declarado en el manifest.

### 20.4.5 Efecto de modificar un archivo

En una copia temporal se generó un manifest válido, se sustituyó un JavaScript del frontend y se volvió a verificar. Resultado:

```text
Verificación de integridad fallida.
Modificados (1):
  - frontend/dist/assets/index-BmPgmr7d.js
```

El proceso terminó con código `1`. La prueba no alteró la evidencia original ni software de terceros.

### 20.4.6 STRICT_INTEGRITY

Con `STRICT_INTEGRITY=false`, el backend registra la anomalía y prioriza disponibilidad. Con `STRICT_INTEGRITY=true`, cualquier resultado distinto de `verified` impide que el servidor abra el puerto.

| Condición | `false` | `true` |
|---|---|---|
| Backend coincidente | Arranca como `verified` | Arranca como `verified` |
| Modificado, faltante o nuevo | Advierte y arranca como `warning` | Impide abrir el puerto |
| Manifest ausente | Arranca como `unavailable` | Impide abrir el puerto |
| Manifest inválido | Advierte y arranca como `warning` | Impide abrir el puerto |

`render.yaml` configura actualmente `STRICT_INTEGRITY=false`. Esto favorece disponibilidad, pero permite iniciar ante una advertencia. El cambio a modo estricto debe acompañarse de una canalización reproducible y un procedimiento de recuperación.

### 20.4.7 Endpoint

```bash
curl https://eduroom-znb0.onrender.com/api/security/integrity
```

Resultado observado:

```json
{
  "status": "verified",
  "checkedAt": "2026-08-15T23:32:23.187Z",
  "filesChecked": 19,
  "modifiedFilesCount": 0
}
```

La respuesta no publica hashes, rutas ni variables. `checkedAt` indica el momento de comprobación durante el arranque, no el momento de la consulta. Los 19 archivos corresponden al backend.

### 20.4.8 Limitaciones

- El manifest no está firmado.
- Quien pueda sustituir archivos, manifest y verificador puede producir un conjunto coherente.
- La verificación runtime ocurre al iniciar, no continuamente.
- El frontend solo queda cubierto por el verificador CLI.
- Los archivos fuera de los scopes no se verifican.
- El endpoint no identifica el commit desplegado.
- Un hash coincidente no demuestra corrección ni ausencia de vulnerabilidades.

## 20.5 Cifrado AES-256-GCM

### 20.5.1 Diseño

`backend/src/security/crypto.ts` implementa:

- algoritmo `aes-256-gcm`;
- clave derivada de 32 bytes;
- IV aleatorio de 12 bytes;
- auth tag de 16 bytes;
- ciphertext, IV y tag representados en Base64;
- payload versionado.

`APP_ENCRYPTION_KEY` debe ser un secreto independiente de `JWT_SECRET`. La configuración exige al menos 32 caracteres. El código deriva la clave AES mediante `scryptSync` y el contexto fijo `eduroom:aes-256-gcm:v1`. Se recomienda generar 32 bytes aleatorios:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

El valor se guarda en el gestor de secretos de Render o en un `.env` no versionado. Nunca debe aparecer en capturas.

### 20.5.2 Uso real

El dato cifrado es el texto de una **nota segura**:

1. `POST /api/security/secure-notes` exige JWT.
2. Zod valida texto de 1 a 5000 caracteres.
3. `encryptText` produce el payload.
4. Prisma persiste el JSON en `SecureNote.encryptedPayload`.
5. La respuesta de creación solo expone `id` y `createdAt`.
6. `GET /api/security/secure-notes` filtra por `ownerId`.
7. Solo las notas del propietario se descifran y devuelven.

Si falta `APP_ENCRYPTION_KEY`, los endpoints responden `503` y no degradan a texto plano.

### 20.5.3 Cómo comprobar ausencia de texto plano

1. Crear una nota con un marcador sintético único.
2. Consultar la tabla `SecureNote` en una base controlada.
3. Verificar que `encryptedPayload` contiene `version`, `algorithm`, `iv`, `authTag` y `ciphertext`.
4. Buscar el marcador: no debe aparecer.
5. Recuperar la nota como propietario: debe volver el texto.
6. Consultar con otro usuario: la nota no debe aparecer.
7. Alterar una copia del ciphertext en una prueba aislada: el descifrado debe fallar.

No se debe mostrar la clave, el JWT ni el ciphertext completo en la evidencia.

### 20.5.4 Pruebas ejecutadas

`backend/tests/crypto.test.ts` contiene cuatro casos, todos aprobados:

- cifra y descifra UTF-8;
- usa IV distintos para el mismo texto;
- rechaza un ciphertext alterado;
- rechaza material de clave insuficiente.

### 20.5.5 Limitaciones

- No existe rotación ni versionado de claves operativo.
- Todas las notas dependen del mismo secreto de aplicación.
- No hay KMS/HSM ni clave por usuario.
- No se usa AAD para vincular criptográficamente los metadatos.
- `ownerId`, fecha y longitud aproximada permanecen observables.
- El texto aparece en memoria durante el uso autorizado.
- Perder o cambiar la clave impide recuperar notas anteriores.
- El cifrado de campo no sustituye TLS, autorización, backups ni control de acceso a la base.

## 20.6 Ofuscación del frontend

### 20.6.1 Herramienta y script

La dependencia es `javascript-obfuscator`; durante la auditoría se resolvió la versión `4.2.2`. Scripts:

```json
{
  "frontend": "npm run build && node scripts/obfuscate-build.cjs",
  "root": "npm --prefix backend run build && npm --prefix frontend run build:obfuscated"
}
```

Comando:

```bash
npm run build:obfuscated
```

### 20.6.2 Archivos afectados

El script recorre `frontend/dist` y transforma todos los `.js`. No ofusca HTML, CSS, código del backend ni dependencias fuera del bundle. La ejecución auditada procesó un archivo.

Configuración relevante:

- compactación;
- identificadores hexadecimales;
- string array con codificación Base64 y umbral 0.75;
- semilla fija para reproducibilidad;
- sin inyección de código muerto;
- sin aplanamiento de flujo;
- sin `selfDefending`;
- sin renombrado global.

### 20.6.3 Diferencia frente al cifrado

La ofuscación conserva un programa ejecutable que puede estudiarse. Base64 tampoco es cifrado. AES-GCM requiere una clave secreta y protege datos; la ofuscación solo eleva el costo de lectura casual. Ninguna autoriza operaciones: las decisiones críticas permanecen en el backend.

### 20.6.4 Estado en Render

`render.yaml` ejecuta `npm run build`. Los Dockerfiles también usan el build normal. En consecuencia:

- el mecanismo está implementado;
- el build ofuscado fue probado localmente;
- el deploy actual no puede declararse ofuscado basándose en la configuración versionada;
- el endpoint de integridad no permite inferir ofuscación del frontend.

Para activarlo, la canalización debe ejecutar el build ofuscado, generar el manifest después de la transformación, verificarlo y redesplegar. Ese cambio debe probarse antes de habilitar modo estricto.

### 20.6.5 Limitaciones

- El navegador recibe código ejecutable.
- Un analista puede desofuscar o instrumentar el cliente.
- Los secretos incorporados al bundle siguen expuestos.
- Dificulta depuración, auditoría y monitoreo.
- Puede aumentar tamaño y tiempo de carga.
- La semilla reproducible facilita evidencia, pero también hace determinista la transformación.

## 20.7 Técnicas antireversing educativas

### 20.7.1 Validaciones implementadas

`backend/src/security/antiDebug.ts`:

- advierte si `NODE_ENV` no es `production`;
- revisa `NODE_OPTIONS` cuando contiene `--inspect`, `--debug` o `--require`;
- revisa presencia de `VSCODE_INSPECTOR_OPTIONS`;
- revisa presencia de `NODE_INSPECT_RESUME_ON_START`;
- registra únicamente el nombre de la variable.

`server.ts` ejecuta el diagnóstico y luego la integridad antes de abrir el puerto. `frontend/src/main.tsx` muestra un aviso estático en producción. El dashboard consulta el estado del backend y lo anuncia de forma visible.

### 20.7.2 Advertencias esperadas

```text
[anti-debug] NODE_ENV no es production; diagnóstico educativo sin bloqueo.
[anti-debug] Variable de instrumentación detectada: NODE_OPTIONS.
```

El texto exacto depende de la señal presente. No se imprime el valor, porque podría contener rutas o información sensible.

### 20.7.3 Razón del carácter educativo

Las señales ambientales son fáciles de alterar, pueden ser legítimas y no prueban un ataque. Su valor académico es mostrar que una aplicación puede reconocer ciertas condiciones y registrar evidencia. No deben usarse para autenticación, autorización ni atribución.

### 20.7.4 Por qué no deben ser destructivas

Un control antireversing defensivo no debe:

- cerrar o modificar procesos ajenos;
- borrar archivos o evidencia;
- degradar el equipo;
- bloquear herramientas de accesibilidad;
- ocultar actividad maliciosa;
- castigar falsos positivos;
- impedir que el propietario audite su propio sistema.

EduRoom cumple esta restricción: solo registra advertencias y devuelve un reporte interno.

### 20.7.5 Limitaciones

- No detecta todas las formas de depuración.
- No detecta DevTools del navegador.
- No bloquea instrumentación.
- Un atacante puede eliminar o modificar el diagnóstico.
- El aviso del cliente es estático y alterable.
- El control no sustituye monitoreo, permisos, firma de código o endurecimiento de infraestructura.

## 20.8 Comandos de prueba

```bash
# 1. Compilar sin ofuscación.
npm run build

# 2. Crear manifest para los bytes actuales.
node scripts/generate-checksum.js

# 3. Verificar el manifest.
node scripts/verify-integrity.js

# 4. Crear el build ofuscado.
npm run build:obfuscated

# 5. Para una release coherente, regenerar y verificar después de ofuscar.
node scripts/generate-checksum.js
node scripts/verify-integrity.js

# 6. Ejecutar pruebas unitarias.
npm test

# 7. Consultar Render.
curl https://eduroom-znb0.onrender.com/api/security/integrity
```

Comando equivalente que respeta el orden de release:

```bash
npm run release:educational
```

Advertencia: ejecutar el generador modifica `integrity-manifest.json`. Solo debe hacerse sobre una versión aprobada; para demostrar fallos se usa una copia temporal.

## 20.9 Resultados de la auditoría

| ID | Verificación | Resultado | Estado |
|---|---|---|---|
| VAL-01 | Build normal | Compilación completa | Aprobado |
| VAL-02 | Pruebas automatizadas | 9 backend + 2 frontend | Aprobado |
| VAL-03 | Pruebas AES-GCM | 4/4 | Aprobado |
| VAL-04 | Build ofuscado | 1 JavaScript transformado | Aprobado |
| VAL-05 | Integridad después de ofuscar | 22/22 | Aprobado |
| VAL-06 | Alteración controlada en copia | Detectada; salida 1 | Aprobado |
| VAL-07 | Endpoint Render | `verified`, 19, 0 | Aprobado con alcance backend |
| VAL-08 | `STRICT_INTEGRITY` de Render | Configurado en `false` | Advertencia |
| VAL-09 | Ofuscación en pipeline Render | No incluida en `buildCommand` | Advertencia |
| VAL-10 | Firma del manifest | No implementada | Recomendación |

## 20.10 Hallazgos y recomendaciones

| ID | Hallazgo | Impacto | Recomendación | Prioridad |
|---|---|---|---|---|
| H-01 | Runtime verifica solo backend | Una modificación exclusiva del frontend no cambia el endpoint | Ampliar alcance o verificar en CI antes de publicar | Media |
| H-02 | Render usa build normal | No puede acreditarse ofuscación del deploy | Crear pipeline de release con build ofuscado y evidencia | Media |
| H-03 | `STRICT_INTEGRITY=false` | Una discrepancia del backend no detiene arranque | Activar tras probar manifest y recuperación | Media |
| H-04 | Manifest sin firma | Puede sustituirse junto con archivos | Firmar y distribuir huella confiable | Media |
| H-05 | Clave única sin rotación | Cambio o pérdida afecta todas las notas | Versionar claves y definir rotación | Media |
| H-06 | Antidebug basado en señales débiles | Evasión y falsos positivos | Mantenerlo informativo; no usarlo como control de acceso | Baja |

## 20.11 Evidencias requeridas

| Evidencia | Contenido | Criterio de aceptación |
|---|---|---|
| EV-20-01 | Salida de `npm run build` | Backend y frontend completan |
| EV-20-02 | Salida de build ofuscado | Número de JS transformados |
| EV-20-03 | Manifest | Algoritmo, fecha, scopes y conteo |
| EV-20-04 | Verificación correcta | 22 archivos coincidentes |
| EV-20-05 | Modificación controlada | Grupo “Modificados” y código 1 |
| EV-20-06 | Endpoint Render | Estado, fecha y contadores |
| EV-20-07 | Pruebas AES-GCM | Cuatro casos aprobados |
| EV-20-08 | Payload de nota segura | IV, auth tag y ciphertext; sin texto ni clave |
| EV-20-09 | Recuperación autorizada | Propietario recupera; otro usuario no |
| EV-20-10 | Diagnóstico antidebug | Nombre de señal sin valor y servicio operativo |

## 20.12 Conclusión

EduRoom demuestra checksum SHA-256, cifrado AES-256-GCM, ofuscación de JavaScript y diagnóstico antireversing educativo mediante código verificable. La implementación distingue correctamente integridad, confidencialidad y dificultad de análisis, y evita controles destructivos.

El cumplimiento debe presentarse con dos reservas: el endpoint runtime cubre el backend, no todo el manifest; y la configuración declarativa de Render no activa el build ofuscado. Estas limitaciones no invalidan la implementación académica, pero impiden afirmar cobertura integral o protección productiva fuerte. Las siguientes mejoras recomendadas son integrar la release educativa en CI, ampliar o trasladar la verificación del frontend, firmar el manifest y establecer rotación de claves.
