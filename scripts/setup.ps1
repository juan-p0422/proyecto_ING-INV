$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $root 'backend/.env'))) { Copy-Item (Join-Path $root 'backend/.env.example') (Join-Path $root 'backend/.env') }
if (-not (Test-Path (Join-Path $root 'frontend/.env'))) { Copy-Item (Join-Path $root 'frontend/.env.example') (Join-Path $root 'frontend/.env') }
npm --prefix (Join-Path $root 'backend') install
npm --prefix (Join-Path $root 'frontend') install
Write-Host 'Dependencias instaladas. Inicia PostgreSQL y ejecuta las migraciones antes del modo local.'

