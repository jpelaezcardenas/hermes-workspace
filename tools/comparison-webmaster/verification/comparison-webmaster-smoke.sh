#!/usr/bin/env bash
set -euo pipefail
ROOT="/root/hermes-workspace/tools/comparison-webmaster"
PYTHON_BIN="${PYTHON_BIN:-/root/.hermes/hermes-agent/venv/bin/python3}"
OUT_DIR="$(mktemp -d /tmp/comparison-webmaster-smoke.XXXXXX)"
trap 'rm -rf "$OUT_DIR"' EXIT
"$PYTHON_BIN" "$ROOT/scripts/comparison_webmaster.py" smoke --content "/root/.hermes/skills/domain/hubspot-competitor-pages/assets/content/tokeny.json" >/tmp/comparison-webmaster-smoke.stdout
