# 07. Seguridad, integridad y antireversing educativo

## 7.1 Enfoque

EduRoom incorpora una capa educativa para demostrar detección de cambios y diagnóstico defensivo. No pretende hacer invisible el código ni impedir que el propietario de un equipo inspeccione su ejecución. Un cliente web entrega JavaScript al navegador y siempre debe considerarse observable.

La seguridad principal continúa basada en autenticación, autorización en servidor, validación, mínimos privilegios y protección de secretos. Los controles de integridad ayudan a detectar diferencias entre un build aprobado y los archivos presentes; no corrigen una vulnerabilidad ni sustituyen una firma digital.

## 7.2 Componentes implementados

| Componente | Ubicación | Responsabilidad |
|---|---|---|
| Generador | `scripts/generate-checksum.js` | Crear `integrity-manifest.json` mediante SHA-256 |
| Verificador CLI | `scripts/verify-integrity.js` | Detectar archivos modificados, faltantes o nuevos |
| Verificador de backend | `backend/src/security/checksum.ts` | Comprobar JavaScript compilado antes de escuchar conexiones |
| Diagnóstico defensivo | `backend/src/security/antiDebug.ts` | Advertir sobre entorno no productivo o instrumentación visible |
| Endpoint público resumido | `GET /api/security/integrity` | Informar estado sin divulgar hashes o rutas |
| Cliente | `frontend/src/security/clientIntegrity.ts` | Consultar el estado y traducirlo para la interfaz |
| Ofuscador | `frontend/scripts/obfuscate-build.cjs` | Transformar únicamente el JavaScript del build propio |

### 7.2.1 Estado comprobado de cada mecanismo

| Mecanismo | Estado en el código | Estado en el despliegue declarado | Dictamen |
|---|---|---|---|
| Checksum SHA-256 de artefactos | Implementado | El candidato verifica scopes de backend y frontend antes del puerto | Implementado; producción aún muestra alcance anterior de 19 |
| Endpoint de integridad | Implementado y público | Respondió `verified`, 19 archivos y 0 discrepancias el 16-08-2026 | Operativo, no firmado |
| AES-256-GCM | Implementado y usado por `SecureNote` | `APP_ENCRYPTION_KEY` se genera como secreto en Render | Implementado |
| Ofuscación del frontend | Implementada y demostrada localmente | `render.yaml` declara `npm run render:build`; falta acreditar el redespliegue | Cumple como técnica de dificultad, no de invisibilidad |
| Diagnóstico antidebug | Implementado | Se ejecuta antes de abrir el puerto | Educativo y no bloqueante |

“Implementado” no significa invulnerable. El endpoint público refleja la verificación ejecutada por el backend al arrancar y no acredita que el frontend servido esté ofuscado.

## 7.3 Archivos protegidos

El manifest cubre artefactos generados, no código propietario de terceros:

- `backend/dist/**/*.js`;
- `frontend/dist/**/*.js`;
- `frontend/dist/**/*.css`;
- `frontend/dist/**/*.html`.

Se excluyen `.git`, `node_modules`, temporales y extensiones fuera del alcance. Los archivos fuente no se validan al arrancar porque el proceso productivo ejecuta el contenido compilado de `backend/dist`.

Existen dos alcances de verificación:

- `scripts/verify-integrity.js` compara todos los archivos declarados en los scopes; en el manifest auditado fueron 22: 19 JavaScript del backend y 3 artefactos del frontend.
- `backend/src/security/checksum.ts` verifica todos los archivos pertenecientes a los scopes del manifest. El candidato local verificó 22/22, incluido frontend. El endpoint público todavía informó 19 porque corresponde al despliegue anterior.

## 7.4 Verificación al iniciar

`server.ts` ejecuta primero el diagnóstico no destructivo y después la verificación. El servidor solo comienza a escuchar cuando esa etapa termina.

| Condición | `STRICT_INTEGRITY=false` | `STRICT_INTEGRITY=true` |
|---|---|---|
| Manifest válido y archivos iguales | Arranca como `verified` | Arranca como `verified` |
| Archivo modificado, faltante o nuevo | Registra advertencia y arranca | Impide el arranque |
| Manifest ausente | Informa `unavailable` y arranca | Impide el arranque; el modo estricto exige evidencia verificable |
| Manifest inválido | Registra advertencia y arranca | Impide el arranque |

La variable opcional `INTEGRITY_MANIFEST_PATH` permite indicar otra ubicación. Si se omite, el backend busca el manifest en ubicaciones compatibles con desarrollo y contenedor.

## 7.5 Endpoint de estado

`GET /api/security/integrity` devuelve únicamente:

```json
{
  "status": "verified",
  "checkedAt": "2026-08-13T20:00:00.000Z",
  "filesChecked": 18,
  "modifiedFilesCount": 0
}
```

Los estados son `verified`, `warning` y `unavailable`. El reporte interno conserva las categorías necesarias para el log, pero el cliente no recibe hashes completos, nombres de archivos discrepantes ni rutas del servidor.

## 7.6 Diagnóstico antidebug no destructivo

`antiDebug.ts` registra una advertencia cuando `NODE_ENV` no es `production` y revisa de forma demostrativa tres variables:

- `NODE_OPTIONS`, solo cuando contiene `--inspect`, `--debug` o `--require`;
- `VSCODE_INSPECTOR_OPTIONS`, cuando tiene un valor;
- `NODE_INSPECT_RESUME_ON_START`, cuando tiene un valor.

Solo muestra el **nombre** de la variable; nunca su valor. El reporte se devuelve internamente, pero `server.ts` no lo usa para autorizar, terminar procesos ni exponer información.

Este diagnóstico:

- no bloquea el desarrollo;
- no termina otros procesos;
- no modifica archivos, memoria o configuración;
- no intenta ocultarse;
- no ejecuta acciones maliciosas;
- puede producir falsos positivos y no se usa como decisión de autorización.

## 7.7 Estado visible en el dashboard

El frontend consulta el endpoint al mostrar el dashboard y presenta uno de tres estados: **verificada**, **advertencia** o **no disponible**. Durante la consulta muestra **comprobando**. En producción también se escribe en consola un aviso educativo.

El aviso de `frontend/src/main.tsx` es estático: indica que la protección de integridad está habilitada, pero no detecta por sí mismo DevTools ni una modificación. La señal real del dashboard procede de `GET /api/security/integrity`.

La señal del cliente puede alterarse y es solo informativa. La política estricta se aplica antes del arranque en el backend, donde el usuario del navegador no puede cambiarla.

## 7.8 Generación de una entrega educativa

```bash
npm run render:build
```

El comando compila el backend, genera el frontend ofuscado, crea el manifest y verifica inmediatamente el resultado. También pueden ejecutarse las etapas por separado:

```bash
npm run build:obfuscated
npm run integrity:generate
npm run integrity:verify
```

El manifest debe generarse **después** de la última transformación. Si se recompila u ofusca nuevamente, los bytes cambian y se requiere un manifest nuevo asociado a esa versión.

El Blueprint actual declara `npm run render:build` y `STRICT_INTEGRITY=true`; Docker aplica la misma secuencia educativa. Ambos fueron validados localmente. No debe afirmarse que la versión pública ya use el candidato sin desplegar el commit final y conservar evidencia del artefacto.

## 7.9 Reacción ante modificaciones

Una diferencia no implica automáticamente un ataque: también puede deberse a una compilación posterior, cambio de finales de línea, despliegue incompleto o manifest desactualizado. El procedimiento es:

1. Conservar el log y no sobrescribir inmediatamente el manifest.
2. Comparar el artefacto con el commit y la canalización esperados.
3. Determinar si el cambio fue autorizado.
4. Reconstruir desde una fuente confiable cuando exista duda.
5. Generar un manifest nuevo solo para una entrega aprobada.

## 7.10 Limitaciones

- Un atacante capaz de cambiar archivos y manifest puede generar hashes coherentes.
- SHA-256 aporta integridad comparativa, no identidad del autor.
- La comprobación ocurre al arranque; cambios posteriores requieren una nueva verificación o reinicio.
- La comprobación candidata cubre backend y frontend; la URL pública aún expone el conteo anterior de 19 archivos.
- La ofuscación puede revertirse y no protege secretos incluidos por error.
- El endpoint resume el estado del backend; no vuelve confiable al navegador.
- Variables de instrumentación son señales débiles y pueden ser legítimas.
- El control no reemplaza firma digital, arranque verificado, permisos del sistema o monitoreo.

## 7.11 Resultado de validación del 16-08-2026

- `npm run build`: aprobado; produjo el bundle normal.
- `npm test`: aprobado; 10 pruebas de backend y 2 de frontend.
- `npm run build:obfuscated`: aprobado; procesó un archivo JavaScript.
- `node scripts/verify-integrity.js` después del build ofuscado: aprobado, 22 archivos coincidentes.
- Prueba controlada sobre una copia temporal: una sustitución produjo código de salida `1` y clasificó un archivo como modificado.
- Render: `GET /api/security/integrity` devolvió `verified`, `filesChecked=19` y `modifiedFilesCount=0`.

La comprobación evidencia funcionamiento para los casos ejecutados. No es una certificación, no garantiza ausencia de vulnerabilidades y no convierte el endpoint en una atestación remota firmada.

## 7.12 Observabilidad del cliente web

HTML, CSS y JavaScript deben descargarse al navegador y pueden inspeccionarse mediante DevTools. EduRoom no trata esa propiedad como un fallo ni confía en ocultar el bundle: los secretos, permisos y decisiones se mantienen en Express. La ofuscación dificulta lectura casual y la integridad detecta cambios, pero el cliente continúa siendo observable y modificable localmente.

El análisis completo, los controles implementados y las mejoras futuras se documentan en [29. Limitaciones de protección del cliente web](29-limitaciones-proteccion-cliente-web.md).

## 7.13 Evidencias sugeridas para presentación

| Evidencia | Demostración segura |
|---|---|
| EV-07-01 | Build exitoso y lista de artefactos cubiertos |
| EV-07-02 | Generación de `integrity-manifest.json` mostrando solo rutas y conteo |
| EV-07-03 | `npm run integrity:verify` con resultado válido |
| EV-07-04 | Endpoint con `status`, fecha y contadores, sin hashes |
| EV-07-05 | Dashboard con “Integridad del sistema: Verificada” |
| EV-07-06 | Copia temporal modificada que produce advertencia, seguida de su descarte |
| EV-07-07 | Arranque bloqueado en copia temporal con `STRICT_INTEGRITY=true` |
| EV-07-08 | Comparación de tamaño entre build normal y ofuscado |

Las pruebas de modificación se realizan sobre una copia temporal de los artefactos propios. No se altera la entrega original ni software de terceros.

## 7.13 Referencias base

- OWASP Application Security Verification Standard (ASVS).
- OWASP Password Storage Cheat Sheet.
- NIST FIPS PUB 180-4, *Secure Hash Standard*.
