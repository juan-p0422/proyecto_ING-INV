param([string]$Output = "docs/checksums.sha256")
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $root $Output
$files = Get-ChildItem $root -Recurse -File | Where-Object {
  $privateEnvironmentFile = $_.Name -eq '.env' -or ($_.Name -like '.env.*' -and $_.Name -ne '.env.example')
  ($_.FullName -notmatch '[\\/](node_modules|dist|\.git)[\\/]' -and
    $_.FullName -ne $destination -and
    -not $privateEnvironmentFile)
} | Sort-Object FullName
$lines = foreach ($file in $files) {
  $relative = $file.FullName.Substring($root.Length + 1).Replace('\', '/')
  $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $file.FullName).Hash.ToLowerInvariant()
  "$hash  $relative"
}
Set-Content -LiteralPath $destination -Value $lines -Encoding utf8
Write-Host "Manifiesto creado en $destination"
