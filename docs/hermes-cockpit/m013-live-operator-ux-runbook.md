# M013 Hermes Cockpit Live Operator UX Runbook

This runbook is for day-to-day read-only watching. It does not add mutation controls, live worker dispatch, durable watcher installation, or approved write buttons.

## Sources

| Key | Name | Projection |
| --- | --- | --- |
| `1` | `cards` | `docs/hermes-cockpit/live-kanban-projection.json` |
| `2` | `events` | `target/hermes-cockpit-m010/hermes-projection.json` |
| `3` | `control` | `target/hermes-cockpit-m012/control-plane-projection.json` |
| `4` | `watchers` | `target/hermes-cockpit-m013/watcher-projection.json` |

Inside the TUI, press `1` through `4` to switch sources. Press `r` for manual reload, `?` for help, and `q` or `Esc` to quit.

## Pi launch

From the Hermes workspace:

```bash
cd /home/joe/hermes-workspace
bash scripts/start-hermes-cockpit.sh --source control
```

Smoke a source without opening the interactive TUI:

```bash
bash scripts/start-hermes-cockpit.sh --source watchers --smoke \
  > target/hermes-cockpit-m013/pi-watchers-smoke.txt
```

List known sources:

```bash
bash scripts/start-hermes-cockpit.sh --list-sources
```

Note: the current shared filesystem may not preserve executable mode for `.sh` files, so `bash scripts/start-hermes-cockpit.sh ...` is the reliable invocation. The script still has a normal bash shebang.

## Windows/GPC launch

From the Windows mirror:

```powershell
cd D:\projects\hermes-workspace-m011-win
.\scripts\start-hermes-cockpit.ps1 -Source control
```

Smoke a source:

```powershell
.\scripts\start-hermes-cockpit.ps1 -Source watchers -Smoke `
  > .\target\hermes-cockpit-m013\windows-watchers-smoke.txt
```

List known sources:

```powershell
.\scripts\start-hermes-cockpit.ps1 -ListSources
```

## Verification evidence

- Pi launcher smoke summary: `target/hermes-cockpit-m013/s04-t03-pi-launch-results.json`
- Windows launcher smoke summary: `target/hermes-cockpit-m013/s04-t03-windows-launch-results.json`
- Full source-switch smoke: `target/hermes-cockpit-m013/source-switch-smoke-summary.json`
- Full Pi verifier: `target/hermes-cockpit-m013/s04-t03-pi-verify.stdout`
- Windows/GPC verifier summary: `target/hermes-cockpit-m012/windows-verify-summary.json`

## Non-claims

- No Cockpit launcher mutates GSD, Kanban, Hermes state, or watcher state.
- No durable watcher is installed by M013.
- No public agent loop or live worker dispatch is enabled by these scripts.
- Approved write/action buttons remain future work after the read-only operator UX is stable.
