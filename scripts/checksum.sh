#!/usr/bin/env sh
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
OUTPUT="$ROOT/docs/checksums.sha256"
cd "$ROOT"
find . -type f ! -path './.git/*' ! -path '*/node_modules/*' ! -path '*/dist/*' ! -path './docs/checksums.sha256' \
  ! -name '.env' \( ! -name '.env.*' -o -name '.env.example' \) -print0 \
  | sort -z | xargs -0 sha256sum > "$OUTPUT"
echo "Manifiesto creado en $OUTPUT"
