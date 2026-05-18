#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
APP_NAME="Hermes Workspace"
BUILD_DIR="$ROOT_DIR/macos-native/build"
APP_DIR="$BUILD_DIR/$APP_NAME.app"
CONTENTS_DIR="$APP_DIR/Contents"
MACOS_DIR="$CONTENTS_DIR/MacOS"
RESOURCES_DIR="$CONTENTS_DIR/Resources"
ARCH="${ARCH:-$(uname -m)}"

mkdir -p "$MACOS_DIR" "$RESOURCES_DIR"

SWIFTC="$(/usr/bin/xcrun --find swiftc 2>/dev/null || command -v swiftc)"
SDK_PATH="$(/usr/bin/xcrun --show-sdk-path 2>/dev/null || true)"

echo "Using swiftc: $SWIFTC"
if [[ -n "$SDK_PATH" ]]; then
  echo "Using SDK: $SDK_PATH"
fi
echo "Target architecture: $ARCH"

"$SWIFTC" \
  -O \
  -target "$ARCH-apple-macos13.0" \
  -framework AppKit \
  -framework WebKit \
  "$ROOT_DIR/macos-native/Sources/HermesWorkspaceApp/main.swift" \
  -o "$MACOS_DIR/$APP_NAME"

cp "$ROOT_DIR/macos-native/Info.plist" "$CONTENTS_DIR/Info.plist"

if [[ -f "$ROOT_DIR/assets/icon.png" ]]; then
  cp "$ROOT_DIR/assets/icon.png" "$RESOURCES_DIR/icon.png"
fi

codesign --force --sign - "$APP_DIR" >/dev/null

echo "$APP_DIR"
