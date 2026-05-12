#!/usr/bin/env bash
# register-launchd.sh — install/refresh the com.hermes.workspace LaunchAgent
#
# Usage:
#   bash scripts/register-launchd.sh            # from repo root
#   bash scripts/register-launchd.sh --unload   # stop + remove plist
#
# What it does:
#   1. Detects node binary path
#   2. Reads PORT + HERMES_API_TOKEN from .env (falls back to defaults)
#   3. Writes ~/Library/LaunchAgents/com.hermes.workspace.plist
#      pointing at server-entry.js (NOT dist/server/server.js)
#   4. Loads (or reloads) the service via launchctl
#
# Re-runnable: safe to call multiple times.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLIST_LABEL="com.hermes.workspace"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_LABEL}.plist"
ENTRY_POINT="$ROOT/server-entry.js"
LOG_OUT="/tmp/hermes-workspace.out.log"
LOG_ERR="/tmp/hermes-workspace.err.log"

# ─── helpers ──────────────────────────────────────────────────────────────

green()  { printf "\033[32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[33m%s\033[0m\n" "$*"; }
red()    { printf "\033[31m%s\033[0m\n" "$*"; }

# ─── --unload shortcut ────────────────────────────────────────────────────

if [[ "${1:-}" == "--unload" ]]; then
  launchctl unload "$PLIST_PATH" 2>/dev/null && yellow "  Unloaded $PLIST_LABEL" || true
  rm -f "$PLIST_PATH"
  green "Removed $PLIST_PATH"
  exit 0
fi

# ─── detect node ──────────────────────────────────────────────────────────

NODE_BIN="$(command -v node 2>/dev/null || true)"
if [[ -z "$NODE_BIN" ]]; then
  red "node not found on PATH. Install Node 22+ and retry."
  exit 1
fi

# ─── load .env values ─────────────────────────────────────────────────────

ENV_FILE="$ROOT/.env"
PORT="4000"
HERMES_API_URL="http://127.0.0.1:8642"
HERMES_API_TOKEN=""

if [[ -f "$ENV_FILE" ]]; then
  while IFS='=' read -r key value; do
    # Strip comments and blank lines
    [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
    key="${key%%[[:space:]]*}"
    value="${value%%[[:space:]]*}"
    case "$key" in
      PORT)            PORT="$value" ;;
      HERMES_API_URL)  HERMES_API_URL="$value" ;;
      HERMES_API_TOKEN) HERMES_API_TOKEN="$value" ;;
    esac
  done < "$ENV_FILE"
fi

# ─── verify entry point ───────────────────────────────────────────────────

if [[ ! -f "$ENTRY_POINT" ]]; then
  red "server-entry.js not found at $ENTRY_POINT"
  red "Run 'pnpm install' from $ROOT first."
  exit 1
fi

# ─── write plist ──────────────────────────────────────────────────────────

mkdir -p "$(dirname "$PLIST_PATH")"

# Build EnvironmentVariables block — only include token entries if values are set
ENV_TOKEN_BLOCK=""
if [[ -n "$HERMES_API_TOKEN" ]]; then
  ENV_TOKEN_BLOCK="
      <key>HERMES_API_TOKEN</key>
      <string>${HERMES_API_TOKEN}</string>
      <key>CLAUDE_API_TOKEN</key>
      <string>${HERMES_API_TOKEN}</string>
      <key>CLAUDE_API_URL</key>
      <string>${HERMES_API_URL}</string>"
fi

cat > "$PLIST_PATH" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>${PLIST_LABEL}</string>
    <key>ProgramArguments</key>
    <array>
      <string>${NODE_BIN}</string>
      <string>${ENTRY_POINT}</string>
    </array>
    <key>WorkingDirectory</key>
    <string>${ROOT}</string>
    <key>EnvironmentVariables</key>
    <dict>
      <key>PORT</key>
      <string>${PORT}</string>
      <key>HERMES_API_URL</key>
      <string>${HERMES_API_URL}</string>${ENV_TOKEN_BLOCK}
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <dict>
      <key>SuccessfulExit</key>
      <false/>
    </dict>
    <key>ThrottleInterval</key>
    <integer>5</integer>
    <key>StandardOutPath</key>
    <string>${LOG_OUT}</string>
    <key>StandardErrorPath</key>
    <string>${LOG_ERR}</string>
  </dict>
</plist>
PLIST

green "  Wrote $PLIST_PATH"

# ─── (re)load ─────────────────────────────────────────────────────────────

# Unload silently if already loaded
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"
green "  Loaded $PLIST_LABEL (port $PORT)"
green ""
green "Hermes Workspace launchd service registered."
green "Logs: $LOG_OUT  /  $LOG_ERR"
