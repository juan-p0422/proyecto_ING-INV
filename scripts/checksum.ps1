param([string]$Output = "docs/checksums.sha256")
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $root $Output
$files = Get-ChildItem $root -Recurse -File | Where-Object {
  $_.FullName -notmatch '[\\/](node_modules|dist|\.git)[\\/]' -and $_.FullName -ne $destination
} | Sort-Object FullName
$lines = foreach ($file in $files) {
  $relative = $file.FullName.Substring($root.Length + 1).Replace('\', '/')
  $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $file.FullName).Hash.ToLowerInvariant()
  "$hash  $relative"
}
Set-Content -LiteralPath $destination -Value $lines -Encoding utf8
Write-Host "Manifiesto creado en $destination"
