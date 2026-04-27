#!/usr/bin/env bash
set -euo pipefail
ROOT="/root/hermes-workspace/tools/comparison-webmaster"
PYTHON_BIN="${PYTHON_BIN:-/root/.hermes/hermes-agent/venv/bin/python3}"
"$PYTHON_BIN" "$ROOT/scripts/comparison_webmaster.py" golden --content "/root/.hermes/skills/domain/hubspot-competitor-pages/assets/content/tokeny.json"
