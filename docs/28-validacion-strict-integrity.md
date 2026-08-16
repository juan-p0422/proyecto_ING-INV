# 28. Validación de checksum y `STRICT_INTEGRITY`

**Proyecto:** EduRoom  
**Fecha de auditoría:** 16-08-2026 (`America/Mexico_City`)  
**Deploy observado:** <https://eduroom-znb0.onrender.com>  
**Endpoint:** <https://eduroom-znb0.onrender.com/api/security/integrity>

## 28.1 Objetivo y veredicto

El objetivo académico es comprobar los artefactos protegidos antes de que el servidor abra el puerto. EduRoom cumple mediante tres controles complementarios:

1. el pipeline genera `integrity-manifest.json` después del build final;
2. el verificador CLI detiene la release ante archivos modificados, faltantes o nuevos;
3. `backend/src/server.ts` ejecuta `verifyRuntimeIntegrity` antes de `app.listen`.

**Veredicto:** **Cumple con demostración local estricta y verificación productiva no bloqueante.** El deploy público observado reporta `verified` y cero discrepancias sobre 19 archivos. El candidato local verifica 22 artefactos de backend y frontend con `strict=true`. `render.yaml` configura `STRICT_INTEGRITY=true`, pero no se atribuye esa configuración a la URL pública hasta redesplegar y correlacionar el commit.

## 28.2 Estado real observado en Render

Consulta de solo lectura realizada el 16-08-2026 a las 01:33 (`UTC-06:00`):

```http
GET /api/security/integrity
HTTP 200
```

```json
{
  "status": "verified",
  "checkedAt": "2026-08-16T07:22:30.662Z",
  "filesChecked": 19,
  "modifiedFilesCount": 0
}
```

El healthcheck respondió también HTTP 200 con `status=ok` y `environment=production`. `checkedAt` corresponde al arranque, no al instante de consulta.

El endpoint no publica el valor de `STRICT_INTEGRITY`, el commit ni los scopes. El conteo de 19 coincide con el despliegue anterior documentado como no bloqueante y centrado en el backend; por sí solo no acredita que el candidato de 22 artefactos o `STRICT_INTEGRITY=true` ya esté desplegado.

## 28.3 Flujo antes de ejecutar

```text
build backend + frontend ofuscado
→ generar manifest sobre los bytes finales
→ verificar manifest en el pipeline
→ aplicar migraciones al iniciar
→ verificar nuevamente los artefactos de runtime
→ abrir el puerto solo si la política lo permite
```

En `server.ts`, `verifyRuntimeIntegrity(...)` se ejecuta antes de `app.listen(...)`. Por tanto, la comparación ocurre antes de aceptar tráfico de aplicación.

## 28.4 Diferencia entre modo bloqueante y no bloqueante

| Resultado | `STRICT_INTEGRITY=false` | `STRICT_INTEGRITY=true` |
|---|---|---|
| Manifest y archivos coinciden | Registra `verified` y arranca | Registra `verified` y arranca |
| Archivo modificado, faltante o nuevo | Registra `warning` y arranca | Registra el fallo y no abre el puerto |
| Manifest ausente | Registra `unavailable` y arranca | No abre el puerto |
| Manifest inválido | Registra `warning` y arranca | No abre el puerto |

El modo no bloqueante sí detecta y reporta; su diferencia es la respuesta operativa al fallo. Puede ser apropiado cuando la disponibilidad y el rollback todavía no están ensayados. El modo estricto ofrece una garantía de arranque más fuerte, pero un error de empaquetado puede impedir el servicio.

## 28.5 Alcance del manifest candidato

El `integrity-manifest.json` inspeccionado contiene 22 entradas:

| Scope | Extensiones | Entradas | Contenido |
|---|---|---:|---|
| `backend/dist` | `.js` | 19 | Servidor, rutas, middleware, seguridad y seed compilados |
| `frontend/dist` | `.js`, `.css`, `.html` | 3 | Bundle JavaScript, estilos e `index.html` |

El verificador también detecta archivos nuevos que coincidan con las extensiones dentro de esos scopes.

### Archivos no protegidos por el manifest runtime

- fuentes TypeScript/TSX y documentación;
- `render.yaml`, Dockerfiles y scripts de build;
- esquema y migraciones Prisma originales;
- `node_modules`, binarios nativos y runtime de Node.js;
- archivos `.env`, variables de Render y secretos;
- base de datos y registros persistidos;
- imágenes y demás evidencias;
- archivos creados después del arranque;
- el propio manifest frente a sustitución coordinada.

Las fuentes y documentos tienen un segundo inventario, `docs/checksums.sha256`, pensado para revisión académica y no consumido por el arranque.

## 28.6 Validación local estricta

Comandos ejecutados:

```bash
npm run render:build
npm run verify:integrity
node -e "require('./backend/dist/src/security/checksum.js').verifyRuntimeIntegrity({strict:true,manifestPath:'integrity-manifest.json'}).then(console.log)"
npm --prefix backend test -- checksum.test.ts
```

Resultados:

| Prueba | Resultado |
|---|---|
| Build y manifest | 22 artefactos generados y verificados |
| Verificación CLI | 22/22, código 0 |
| Arranque lógico con `strict=true` | `verified`, 22 archivos, cero discrepancias |
| Pruebas de checksum | 2/2 aprobadas |
| Alcance frontend | Incluido; la prueba detecta una alteración del artefacto frontend |

La activación estricta es técnicamente coherente en el candidato porque el mismo pipeline genera el manifest después de la última transformación y lo verifica antes de promoverlo. `render.yaml` ya declara `STRICT_INTEGRITY=true`. La comprobación pública requiere todavía un redespliegue verificable.

## 28.7 Demostración de fallo controlado

El script [`tests/integrity-demo.js`](../tests/integrity-demo.js) trabaja exclusivamente en un directorio creado mediante `os.tmpdir()`:

```bash
npm run integrity:demo
```

Procedimiento:

1. crea un archivo temporal controlado;
2. calcula su SHA-256 esperado;
3. verifica coincidencia inicial;
4. modifica únicamente el archivo temporal;
5. detecta que el hash real ya no coincide;
6. elimina el directorio temporal en `finally`.

Resultado observado: verificación inicial correcta, modificación detectada y limpieza completada. No se alteraron `backend/dist`, `frontend/dist`, el manifest productivo ni evidencias.

## 28.8 Estado de `docs/checksums.sha256`

La auditoría previa a la actualización encontró 171 entradas válidas, cero faltantes y 14 hashes desactualizados debido a cambios legítimos aún no congelados. Al cierre de esta tarea se regeneró el manifiesto académico con 211 entradas:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/checksum.ps1
```

Después se repitió la comparación completa sin archivos faltantes ni hashes discrepantes. Regenerar no demuestra por sí solo integridad histórica: declara un nuevo estado de referencia que debe asociarse al commit final. Cualquier cambio posterior exige una nueva regeneración antes de la entrega.

## 28.9 Checksum, hash criptográfico y firma digital

| Concepto | Qué aporta | Clave | Limitación principal |
|---|---|---|---|
| Checksum | Comparación para detectar cambios o errores | No necesariamente | Puede usar algoritmos sin resistencia criptográfica |
| Hash criptográfico SHA-256 | Huella resistente a preimagen y colisiones prácticas | No | Un atacante puede sustituir archivo y hash conjuntamente |
| Firma digital | Integridad y autenticidad vinculadas a una clave privada | Sí | Depende de proteger la clave y confiar en la clave pública |

EduRoom usa SHA-256 como checksum criptográfico. No firma `integrity-manifest.json`; por ello no prueba autoría, fecha cierta ni impide una sustitución coordinada.

## 28.10 Limitaciones y operación segura

- Un estado `verified` solo cubre los paths y bytes declarados.
- No demuestra ausencia de vulnerabilidades o comportamiento malicioso.
- No protege datos de la base ni secretos de entorno.
- La comprobación de arranque no es monitoreo continuo.
- El endpoint es un resumen informativo, no una atestación remota firmada.
- `STRICT_INTEGRITY=true` puede causar indisponibilidad ante un empaquetado incompleto.
- Debe existir rollback al último artefacto y manifest coherentes.
- La firma digital del manifest elevaría autenticidad, pero no reemplaza controles de despliegue y acceso.

## 28.11 Criterio de cierre productivo

Para atribuir el modo estricto al deploy público deben existir, para el mismo commit:

1. log de `npm run render:build` con manifest 22/22;
2. log de arranque con 22 artefactos verificados;
3. endpoint `verified`, cero discrepancias y conteo completo;
4. healthcheck HTTP 200;
5. evidencia `RND-02-successful-deploy.png`, `RND-05-logs-startup.png` y `SEC-01-integrity-verified.png`.

Hasta entonces, la formulación correcta es: **detección productiva verificada en modo no bloqueante y modo estricto demostrado localmente sobre el candidato de backend/frontend**.
