#!/usr/bin/env bash
set -euo pipefail
set -a
source /home/ubuntu/.hermes/profiles/public-gateway/.env >/dev/null 2>&1
set +a
export HERMES_API_URL=http://127.0.0.1:8650
export HERMES_API_TOKEN="$API_SERVER_KEY"
export HOST=127.0.0.1
export PORT=3000
cd /home/ubuntu/Projects/hermes-workspace
exec /usr/local/bin/node server-entry.js
