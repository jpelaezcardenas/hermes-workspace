#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SESSION_NAME="${SESSION_NAME:-hermes-workspace}"
HERMES_BIN_DIR="${HERMES_BIN_DIR:-$HOME/.hermes/hermes-agent/venv/bin}"
NODE_BIN_DIR="${NODE_BIN_DIR:-$HOME/.hermes/node/bin}"
COMMON_PATH="$HERMES_BIN_DIR:$NODE_BIN_DIR:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

if ! command -v tmux >/dev/null 2>&1; then
  echo "[tmux] tmux is not installed. Install tmux and retry." >&2
  exit 1
fi

if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env"
  set +a
fi

if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  echo "[tmux] session '$SESSION_NAME' already exists."
  echo "[tmux] attach with: tmux attach -t $SESSION_NAME"
  exit 0
fi

tmux new-session -d -s "$SESSION_NAME" -c "$ROOT" -n gateway \
  "export PATH='$COMMON_PATH'; hermes gateway run --replace"

tmux new-window -t "$SESSION_NAME" -n dashboard -c "$ROOT" \
  "export PATH='$COMMON_PATH'; hermes dashboard --host 127.0.0.1 --port 9119 --no-open"

tmux new-window -t "$SESSION_NAME" -n workspace -c "$ROOT" \
  "export PATH='$COMMON_PATH'; pnpm dev"

echo "[tmux] started session '$SESSION_NAME' with windows: gateway, dashboard, workspace"
echo "[tmux] attach: tmux attach -t $SESSION_NAME"
echo "[tmux] list windows: tmux list-windows -t $SESSION_NAME"
