#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

LABEL="${LAUNCHD_LABEL:-com.cderamos.cael-workspace}"
PORT="${PORT:-3077}"
PLIST="${PLIST:-$HOME/Library/LaunchAgents/$LABEL.plist}"
HEALTH_URL="${HEALTH_URL:-http://100.97.216.111:$PORT/cael-home}"

if [[ ! -f "$PLIST" ]]; then
  echo "[launchd] plist not found: $PLIST" >&2
  exit 1
fi

stop_pid() {
  local pid="$1"
  if [[ -z "$pid" ]] || ! kill -0 "$pid" 2>/dev/null; then
    return 0
  fi
  kill "$pid" 2>/dev/null || true
  for _ in {1..40}; do
    if ! kill -0 "$pid" 2>/dev/null; then
      return 0
    fi
    sleep 0.25
  done
  kill -9 "$pid" 2>/dev/null || true
}

echo "[launchd] stopping $LABEL and clearing orphan listeners on :$PORT"
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || launchctl unload "$PLIST" 2>/dev/null || true

for pid in $(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true); do
  stop_pid "$pid"
done

echo "[launchd] starting $LABEL from $PLIST"
launchctl enable "gui/$(id -u)/$LABEL" 2>/dev/null || true

bootstrapped=0
already_loaded=0
for _ in {1..20}; do
  if launchctl print "gui/$(id -u)/$LABEL" >/dev/null 2>&1; then
    bootstrapped=1
    already_loaded=1
    break
  fi
  if launchctl bootstrap "gui/$(id -u)" "$PLIST" 2>/dev/null; then
    bootstrapped=1
    break
  fi
  sleep 0.5
done

if [[ "$bootstrapped" != "1" ]]; then
  launchctl load -w "$PLIST"
fi

if [[ "$already_loaded" == "1" ]]; then
  launchctl kickstart -k "gui/$(id -u)/$LABEL" 2>/dev/null || true
fi

for _ in {1..60}; do
  if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
    echo "[launchd] ready: $HEALTH_URL"
    lsof -nP -sTCP:LISTEN -iTCP:"$PORT" || true
    exit 0
  fi
  sleep 0.5
done

echo "[launchd] timed out waiting for :$PORT" >&2
launchctl print "gui/$(id -u)/$LABEL" 2>/dev/null || true
exit 1
