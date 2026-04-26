#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

COMPOSE=/usr/local/bin/docker-compose
if [[ ! -x "$COMPOSE" ]]; then
  COMPOSE="$(command -v docker-compose || true)"
fi
if [[ -z "$COMPOSE" ]]; then
  echo "docker-compose not found. On this machine /usr/local/bin/docker-compose is expected." >&2
  exit 1
fi

./scripts/dom-sync-hermes-runtime-to-docker.sh
"$COMPOSE" pull
"$COMPOSE" up -d hermes-agent hermes-dashboard
# The first boot can spend a while normalizing ownership/syncing bundled skills
# against the copied runtime. Wait for the two backend services before starting UI.
for url in http://127.0.0.1:8642/health http://127.0.0.1:9119/api/status; do
  ok=0
  for _ in $(seq 1 60); do
    if python3 - "$url" <<'PY' >/dev/null 2>&1
import sys, urllib.request
urllib.request.urlopen(sys.argv[1], timeout=5).read()
PY
    then
      ok=1
      break
    fi
    sleep 5
  done
  if [[ "$ok" != 1 ]]; then
    echo "Timed out waiting for $url" >&2
    "$COMPOSE" ps >&2 || true
    exit 1
  fi
done
"$COMPOSE" up -d hermes-workspace
./scripts/dom-verify-hermes-workspace.sh
