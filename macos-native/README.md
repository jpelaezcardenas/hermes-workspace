# Hermes Workspace Native macOS App

This folder contains a small native Swift/AppKit shell for Hermes Workspace. It opens the local Hermes Workspace UI in a `WKWebView`, includes native toolbar controls, and nudges the installed Hermes launch agents so the gateway, dashboard, console, and workspace are available.

## Build

```bash
./macos-native/Scripts/build-macos-app.sh
```

Or from the repo root:

```bash
pnpm native:mac
```

To cross-build for a specific Mac architecture:

```bash
ARCH=arm64 pnpm native:mac
ARCH=x86_64 pnpm native:mac
```

The build script creates:

```text
macos-native/build/Hermes Workspace.app
```

## Run

```bash
open "macos-native/build/Hermes Workspace.app"
```

The app expects the existing local services:

- Workspace UI: `http://127.0.0.1:3000`
- Local console: `http://127.0.0.1:5128`
- Hermes gateway: `http://127.0.0.1:8642`
- Hermes dashboard: `http://127.0.0.1:9119`

If the launch agents are installed, the app asks `launchctl` to kickstart them on launch and when the toolbar Start button is pressed.

If Swift reports that the SDK is not supported by the compiler, repair or update the local Xcode Command Line Tools and rerun the build. The script prints the `swiftc` and SDK paths it is using so the selected toolchain is visible.
