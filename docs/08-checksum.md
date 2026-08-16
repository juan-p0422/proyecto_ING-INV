# 08. Checksum e integridad

## 8.1 Definición

Un **checksum** o suma de comprobación es un valor de tamaño fijo calculado a partir de una secuencia de datos. Se utiliza para detectar si el contenido cambió durante almacenamiento, transferencia o entrega. La misma entrada y el mismo algoritmo producen el mismo resultado; una modificación, incluso pequeña, debería producir un valor diferente cuando se emplea un algoritmo apropiado.

En sentido amplio, un hash puede funcionar como checksum. Sin embargo, no todos los checksums tienen propiedades criptográficas. EduRoom utiliza SHA-256 porque es adecuado para comprobar integridad de archivos y está ampliamente disponible.

## 8.2 Checksum, hash criptográfico y firma digital

| Mecanismo | Propósito principal | Usa clave | Protege frente a sustitución del valor | Ejemplo |
|---|---|---|---|---|
| Checksum simple | Detectar errores accidentales | No | No | CRC32 |
| Hash criptográfico | Representar datos con resistencia a preimagen y colisiones | No | No, si el atacante cambia archivo y hash | SHA-256 |
| Firma digital | Probar integridad y vincularla con una clave privada | Sí, par pública/privada | Sí, si la clave pública se obtiene de forma confiable | Ed25519, RSA-PSS |

Un hash SHA-256 idéntico aporta evidencia fuerte de que dos archivos contienen los mismos bytes. No demuestra quién creó el archivo ni cuándo. Una firma digital agrega autenticidad y, según la gestión de claves y el contexto, puede contribuir al no repudio.

## 8.3 Cálculo conceptual de SHA-256

SHA-256 pertenece a la familia SHA-2 y produce una salida de 256 bits, normalmente representada como 64 caracteres hexadecimales. De forma conceptual, su cálculo comprende:

1. Convertir el mensaje en una secuencia de bits.
2. Añadir relleno y la longitud para formar bloques de 512 bits.
3. Inicializar ocho palabras de estado de 32 bits.
4. Expandir cada bloque y procesarlo durante 64 rondas con operaciones lógicas, rotaciones, sumas módulo \(2^{32}\) y constantes definidas por el estándar.
5. Acumular el estado de cada bloque.
6. Concatenar las ocho palabras finales para obtener 256 bits.

No se implementará el algoritmo manualmente: el proyecto usa las implementaciones mantenidas por el sistema operativo (`Get-FileHash` o `sha256sum`) para reducir errores. SHA-256 no cifra el archivo y su resultado no permite recuperar el contenido original.

## 8.4 Aplicación en EduRoom

El repositorio utiliza dos manifestaciones complementarias de SHA-256:

- `scripts/checksum.ps1` para Windows PowerShell.
- `scripts/checksum.sh` para Linux y macOS.
- `docs/checksums.sha256` como manifiesto de integridad generado.
- `scripts/generate-checksum.js` para artefactos compilados.
- `scripts/verify-integrity.js` para comparación automatizada.
- `integrity-manifest.json` como manifest JSON consumido por el backend.

`docs/checksums.sha256` documenta la entrega de fuentes y excluye artefactos regenerables. `integrity-manifest.json` protege específicamente `backend/dist/**/*.js` y `frontend/dist/**/*.{js,css,html}`. Ambos excluyen `.git`, `node_modules` y temporales. Los scripts de fuentes también excluyen `.env` y variantes privadas como `.env.local`, pero conservan los archivos públicos `.env.example`.

No son el mismo manifiesto:

| Manifiesto | Productor | Alcance | Consumidor |
|---|---|---|---|
| `docs/checksums.sha256` | `scripts/checksum.ps1` o `scripts/checksum.sh` | Fuentes y documentos entregables, excluyendo secretos y artefactos regenerables | Revisión académica con SHA-256 |
| `integrity-manifest.json` | `scripts/generate-checksum.js` | Artefactos compilados de backend y frontend | Verificador CLI y verificador de arranque |

El manifest JSON inspeccionado contiene 22 entradas: 19 archivos `.js` del backend y 3 archivos del frontend —un `.js`, un `.css` y `index.html`—. El script CLI verifica las 22. El módulo de arranque filtra solo las 19 entradas JavaScript de `backend/dist`; por eso el endpoint no prueba la integridad runtime del frontend.

Para una entrega académica se generan después de compilar, probar y congelar la versión. Se registran además el commit, la fecha UTC y las versiones de las herramientas.

### Manifest JSON del build

El manifest registra versión de formato, algoritmo, fecha, alcances y una lista ordenada con ruta relativa, SHA-256 y tamaño. No contiene secretos. Debe conservarse junto con exactamente los artefactos que representa.

```bash
npm run build:obfuscated
npm run integrity:generate
npm run integrity:verify
```

El verificador informa tres grupos: **modificados**, **faltantes** y **nuevos**. Cualquier grupo no vacío produce código de salida `1`, de modo que una canalización puede detener la publicación.

## 8.5 Generación paso a paso

### Windows

1. Abrir PowerShell en la raíz del repositorio.
2. Confirmar que no existen secretos o evidencias sensibles dentro del conjunto entregable.
3. Ejecutar:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/checksum.ps1
```

4. Comprobar que se creó `docs/checksums.sha256` y que cada línea contiene un hash y una ruta relativa.
5. Conservar el manifiesto junto con la versión entregada.

### Linux o macOS

1. Abrir una terminal en la raíz del repositorio.
2. Ejecutar:

```bash
sh scripts/checksum.sh
```

3. Revisar `docs/checksums.sha256` y conservarlo con la entrega.

## 8.6 Verificación paso a paso

### Verificación automatizada del build

Desde la raíz:

```bash
npm run integrity:verify
```

El resultado válido muestra el número total de archivos coincidentes. Si falla, no debe regenerarse el manifest hasta confirmar que el cambio es autorizado. En producción, el backend repite la comparación de sus archivos JavaScript antes de escuchar conexiones.

Con `STRICT_INTEGRITY=false`, una discrepancia se registra y el servicio continúa con estado `warning`; si falta el manifest, informa `unavailable`. Con `STRICT_INTEGRITY=true`, una discrepancia, un manifest inválido o su ausencia impiden el arranque. De este modo, el modo estricto nunca ejecuta la aplicación sin una comprobación satisfactoria.

| Caso al arrancar | `STRICT_INTEGRITY=false` | `STRICT_INTEGRITY=true` |
|---|---|---|
| Manifest válido y backend coincidente | Arranca; estado `verified` | Arranca; estado `verified` |
| Archivo backend modificado, faltante o nuevo | Registra advertencia; arranca con `warning` | Registra el fallo y no abre el puerto |
| Manifest ausente | Arranca con `unavailable` | No abre el puerto |
| JSON o formato inválido | Registra advertencia; arranca con `warning` | No abre el puerto |

El verificador CLI es deliberadamente más estricto: ante cualquier archivo modificado, faltante o nuevo en cualquiera de los scopes termina con código `1`, independientemente de `STRICT_INTEGRITY`.

### Verificación completa en GNU/Linux

Desde la raíz del repositorio:

```bash
sha256sum --check docs/checksums.sha256
```

Cada entrada debe mostrar `OK`. Una entrada `FAILED`, un archivo ausente o uno adicional requiere investigar la causa y no debe ocultarse regenerando el manifiesto sin registrar el cambio.

### Verificación en PowerShell

Para comprobar un archivo específico, se recalcula el valor y se compara con la entrada correspondiente:

```powershell
$esperado = (Select-String -LiteralPath docs/checksums.sha256 -Pattern '  README.md$').Line.Split(' ')[0]
$obtenido = (Get-FileHash -Algorithm SHA256 -LiteralPath README.md).Hash.ToLowerInvariant()
$esperado -eq $obtenido
```

El resultado esperado es `True`. Para una auditoría completa se repite la comparación para todas las líneas o se utiliza un script institucional de verificación. Después se comprueba que no existan archivos entregables fuera del manifiesto.

## 8.7 Prueba controlada de detección

Sobre una copia temporal de la entrega, puede modificarse un archivo de prueba y recalcular su hash. El valor debe cambiar. La copia se descarta después; no se modifica evidencia original ni se presenta el manifiesto regenerado como si correspondiera a la entrega anterior.

> **Espacio de evidencia EV-08-01:** ejecución de generación, número de archivos y primeras líneas anonimizadas del manifiesto.

> **Espacio de evidencia EV-08-02:** verificación exitosa de la entrega congelada.

> **Espacio de evidencia EV-08-03:** prueba controlada en una copia donde una modificación produzca fallo de integridad.

> **Espacio de evidencia EV-08-04:** respuesta resumida de `GET /api/security/integrity`, sin hashes ni rutas internas.

> **Espacio de evidencia EV-08-05:** comparación de arranque estricto y no estricto sobre una copia temporal.

## 8.8 Comandos mínimos reproducibles

Desde la raíz:

```bash
# Build normal: útil para validar compilación, pero no aplica ofuscación.
npm run build

# Build destinado a la entrega educativa.
npm run build:obfuscated

# Generar el manifest después de la última transformación.
node scripts/generate-checksum.js

# Comparar artefactos actuales con el manifest congelado.
node scripts/verify-integrity.js

# Consultar el resumen del despliegue.
curl https://eduroom-znb0.onrender.com/api/security/integrity
```

Orden recomendado para una release:

```bash
npm run build:obfuscated
node scripts/generate-checksum.js
node scripts/verify-integrity.js
```

`npm run build` vuelve a crear el JavaScript normal. Si el manifest se generó después de ofuscar, ejecutar luego el build normal debe provocar una discrepancia; no es un falso positivo, sino una diferencia real de bytes.

## 8.9 Resultado de la auditoría

| Prueba | Resultado | Interpretación |
|---|---|---|
| `npm run build` | Aprobada | Backend y frontend compilaron |
| Verificación contra manifest ofuscado después del build normal | Falló con 1 archivo modificado | Secuencia incorrecta detectada correctamente |
| `npm run build:obfuscated` | Aprobada; 1 JS transformado | El build educativo es reproducible con la semilla actual |
| Verificación posterior | Aprobada; 22/22 archivos | Manifest y artefactos coincidieron |
| Sustitución controlada en copia temporal | Falló; código de salida `1` | Detectó el archivo modificado |
| Endpoint de Render, 15-08-2026 | `verified`; 19 archivos; 0 discrepancias | El backend desplegado coincidió con sus entradas del manifest |

El campo `checkedAt` del endpoint corresponde a la comprobación de arranque, no necesariamente al instante de cada petición. El estado no está firmado y no identifica el commit desplegado.

## 8.10 Limitaciones

- Si un tercero sustituye tanto los archivos como el manifiesto, puede calcular hashes coherentes nuevos.
- SHA-256 no aporta confidencialidad, identidad del autor, fecha cierta ni control de acceso.
- El hash depende de los bytes exactos; cambios de codificación o finales de línea producen otro resultado aunque el texto se vea igual.
- Los archivos excluidos no quedan cubiertos por el manifiesto.
- Un manifiesto válido no demuestra que el software sea seguro o correcto.
- La verificación al iniciar no detecta por sí sola cambios realizados después del arranque.
- El endpoint actual verifica solo el backend; una discrepancia exclusiva del frontend requiere el CLI o una ampliación del módulo runtime.
- El pipeline de Render usa `npm run build` y `STRICT_INTEGRITY=false`; no regenera el manifest ni bloquea por defecto.
- El estado público evita hashes completos, pero sigue siendo una señal informativa y no una prueba remota firmada.

Para elevar la confianza, el manifiesto puede firmarse digitalmente y su clave pública o huella debe distribuirse por un canal independiente y confiable. Las evidencias originales también requieren controles de acceso, respaldo y cadena de custodia.

## 8.11 Recomendaciones

1. Ejecutar `npm run release:educational` en CI y adjuntar el manifest a la misma release.
2. Verificar también los artefactos del frontend antes de publicar o ampliar el runtime con un alcance explícito.
3. Activar `STRICT_INTEGRITY=true` únicamente después de probar recuperación y ubicación del manifest en Render.
4. Firmar el manifest y publicar la huella de la clave por un canal independiente.
5. Añadir al endpoint un identificador no sensible de versión o commit para correlacionar evidencia.

## 8.12 Referencias base

- NIST FIPS PUB 180-4, *Secure Hash Standard (SHS)*.
- IETF RFC 6234, algoritmos SHA y HMAC-SHA.
- NIST FIPS PUB 186-5, *Digital Signature Standard (DSS)*.
