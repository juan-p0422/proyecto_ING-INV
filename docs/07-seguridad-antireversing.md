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

## 7.3 Archivos protegidos

El manifest cubre artefactos generados, no código propietario de terceros:

- `backend/dist/**/*.js`;
- `frontend/dist/**/*.js`;
- `frontend/dist/**/*.css`;
- `frontend/dist/**/*.html`.

Se excluyen `.git`, `node_modules`, temporales y extensiones fuera del alcance. Los archivos fuente no se validan al arrancar porque el proceso productivo ejecuta el contenido compilado de `backend/dist`.

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

`antiDebug.ts` registra una advertencia cuando `NODE_ENV` no es `production` y comprueba de forma demostrativa la presencia de variables asociadas a instrumentación de Node. Solo muestra el **nombre** de la variable; nunca su valor.

Este diagnóstico:

- no bloquea el desarrollo;
- no termina otros procesos;
- no modifica archivos, memoria o configuración;
- no intenta ocultarse;
- no ejecuta acciones maliciosas;
- puede producir falsos positivos y no se usa como decisión de autorización.

## 7.7 Estado visible en el dashboard

El frontend consulta el endpoint al mostrar el dashboard y presenta uno de tres estados: **verificada**, **advertencia** o **no disponible**. Durante la consulta muestra **comprobando**. En producción también se escribe en consola el aviso educativo solicitado.

La señal del cliente puede alterarse y es solo informativa. La política estricta se aplica antes del arranque en el backend, donde el usuario del navegador no puede cambiarla.

## 7.8 Generación de una entrega educativa

```bash
npm run release:educational
```

El comando compila el backend, genera el frontend ofuscado, crea el manifest y verifica inmediatamente el resultado. También pueden ejecutarse las etapas por separado:

```bash
npm run build:obfuscated
npm run integrity:generate
npm run integrity:verify
```

El manifest debe generarse **después** de la última transformación. Si se recompila u ofusca nuevamente, los bytes cambian y se requiere un manifest nuevo asociado a esa versión.

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
- La ofuscación puede revertirse y no protege secretos incluidos por error.
- El endpoint resume el estado del backend; no vuelve confiable al navegador.
- Variables de instrumentación son señales débiles y pueden ser legítimas.
- El control no reemplaza firma digital, arranque verificado, permisos del sistema o monitoreo.

## 7.11 Evidencias sugeridas para presentación

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

## 7.12 Referencias base

- OWASP Application Security Verification Standard (ASVS).
- OWASP Password Storage Cheat Sheet.
- NIST FIPS PUB 180-4, *Secure Hash Standard*.
