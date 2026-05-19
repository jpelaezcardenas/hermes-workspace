#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/macos/ScriptEditor"

if [[ ! -d "$APP_DIR" ]]; then
  echo "Native Script Editor not found at $APP_DIR" >&2
  exit 1
fi

echo "Launching Native Script Editor from Hermes Workspace..."
echo "App: $APP_DIR"
echo "Default AI backend: http://127.0.0.1:8081/v1"
echo

cd "$APP_DIR"
if ! swift run ScriptEditorApp; then
  echo
  echo "Native Script Editor could not launch because Swift failed before app code compiled." >&2
  echo "If you see a PackageDescription or SDK/compiler mismatch above, install/select full Xcode:" >&2
  echo "  sudo xcode-select -s /Applications/Xcode.app/Contents/Developer" >&2
  echo "Then rerun from Hermes Workspace:" >&2
  echo "  pnpm script-editor:mac" >&2
  exit 1
fi
