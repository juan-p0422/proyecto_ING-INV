# 08. Checksum e integridad

## Objetivo

Un checksum permite detectar cambios en archivos entregados. EduRoom utiliza SHA-256 para producir un manifiesto reproducible; el hash demuestra igualdad de contenido, pero no demuestra autoría por sí solo.

## Generación

En Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/checksum.ps1
```

En Linux o macOS:

```bash
sh scripts/checksum.sh
```

Los scripts excluyen `.git`, `node_modules`, `dist` y el propio manifiesto. El resultado se escribe en `docs/checksums.sha256`.

## Verificación

| Plataforma | Procedimiento |
|---|---|
| PowerShell | Recalcular con `Get-FileHash -Algorithm SHA256` y comparar |
| GNU/Linux | Ejecutar `sha256sum --check docs/checksums.sha256` desde la raíz |

## Uso académico

Antes de entregar, registrar commit, fecha UTC, versión de herramientas y hash del archivo comprimido final. Si se firma el manifiesto con una clave institucional, conservar la clave privada fuera del repositorio.

> **Espacio de evidencia EV-08-01:** fragmento del manifiesto y resultado de verificación exitosa.

## Limitaciones

Un atacante capaz de sustituir tanto archivos como manifiesto puede producir hashes nuevos. Para autenticidad se requiere firma digital o un canal confiable donde publicar el hash esperado.

