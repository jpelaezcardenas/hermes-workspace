#!/bin/sh
set -eu

: "${HERMES_DASHBOARD_URL:=http://hermes-dashboard:9119}"

i=0
while [ "$i" -lt 60 ]; do
  if curl -fsS "${HERMES_DASHBOARD_URL%/}/api/status" >/dev/null 2>&1; then
    break
  fi
  i=$((i + 1))
  sleep 2
done

if [ "$i" -ge 60 ]; then
  echo "Timed out waiting for Hermes dashboard status" >&2
  exit 1
fi

exec node --max-old-space-size=2048 server-entry.js
