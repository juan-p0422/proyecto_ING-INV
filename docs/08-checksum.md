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

El repositorio incorpora:

- `scripts/checksum.ps1` para Windows PowerShell.
- `scripts/checksum.sh` para Linux y macOS.
- `docs/checksums.sha256` como manifiesto de integridad generado.

Los scripts recorren los archivos del proyecto, ordenan sus rutas y excluyen `.git`, `node_modules`, `dist` y el propio manifiesto. Para una entrega académica se generará el manifiesto después de compilar, probar y congelar la versión. Se registrarán además el commit, la fecha UTC y las versiones de las herramientas.

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

## 8.8 Limitaciones

- Si un tercero sustituye tanto los archivos como el manifiesto, puede calcular hashes coherentes nuevos.
- SHA-256 no aporta confidencialidad, identidad del autor, fecha cierta ni control de acceso.
- El hash depende de los bytes exactos; cambios de codificación o finales de línea producen otro resultado aunque el texto se vea igual.
- Los archivos excluidos no quedan cubiertos por el manifiesto.
- Un manifiesto válido no demuestra que el software sea seguro o correcto.

Para elevar la confianza, el manifiesto puede firmarse digitalmente y su clave pública o huella debe distribuirse por un canal independiente y confiable. Las evidencias originales también requieren controles de acceso, respaldo y cadena de custodia.

## 8.9 Referencias base

- NIST FIPS PUB 180-4, *Secure Hash Standard (SHS)*.
- IETF RFC 6234, algoritmos SHA y HMAC-SHA.
- NIST FIPS PUB 186-5, *Digital Signature Standard (DSS)*.

