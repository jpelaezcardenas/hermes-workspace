# M012 Windows/GPC Verification Runbook

## Purpose

This runbook verifies Hermes Cockpit operational-control-plane source from a **local Windows/GPC mirror** instead of executing Python/Cargo directly from the UNC share. It supports M012/S01/T04 and writes a compact summary to `target\hermes-cockpit-m012\windows-verify-summary.json`.

## Canonical source and local mirror

Canonical source on the share:

```powershell
\\TOWER\The Goods\Serena-Projects\hermes-workspace
```

Supported Windows mirror:

```powershell
D:\projects\hermes-workspace-m011-win
```

Do not treat the Windows mirror as canonical. It is disposable/rebuildable and should not be copied back wholesale.

## One-command verification

From Windows/GPC PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File D:\projects\hermes-workspace-m011-win\scripts\hermes-cockpit-windows-smoke.ps1 `
  -SourceRoot "\\TOWER\The Goods\Serena-Projects\hermes-workspace" `
  -MirrorRoot D:\projects\hermes-workspace-m011-win
```

If the mirror already contains the current source and you want to skip sync:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File D:\projects\hermes-workspace-m011-win\scripts\hermes-cockpit-windows-smoke.ps1 `
  -MirrorRoot D:\projects\hermes-workspace-m011-win `
  -SkipSync
```

## What the runner syncs

The runner syncs only the allowlisted Cockpit source and fixtures:

- `scripts\hermes-cockpit-*`
- `tests\hermes_cockpit\`
- `tests\fixtures\hermes_cockpit\`
- `prototypes\hermes-cockpit\` excluding its `target` build cache
- `docs\hermes-cockpit\`
- required Rust render fixture `target\hermes-cockpit-m010\hermes-projection.json`

It does **not** mirror unrelated repo families, Windows-local smoke state, or generated target directories wholesale.

## Gates run from the mirror

The runner executes these commands from the local mirror:

```powershell
cd D:\projects\hermes-workspace-m011-win
python -m unittest discover tests/hermes_cockpit -v

cd prototypes\hermes-cockpit
cargo fmt --check
cargo check
cargo test
```

By default it sets `CARGO_TARGET_DIR` to `%TEMP%\hermes-cockpit-target` if the environment has not already set one. This keeps heavy Rust build output off the share and out of the project mirror.

## Output artifacts

Mirror-local outputs:

- `D:\projects\hermes-workspace-m011-win\target\hermes-cockpit-m012\windows-verify-summary.json`
- `D:\projects\hermes-workspace-m011-win\target\hermes-cockpit-m012\windows-verify-python.log`
- `D:\projects\hermes-workspace-m011-win\target\hermes-cockpit-m012\windows-verify-cargo-fmt.log`
- `D:\projects\hermes-workspace-m011-win\target\hermes-cockpit-m012\windows-verify-cargo-check.log`
- `D:\projects\hermes-workspace-m011-win\target\hermes-cockpit-m012\windows-verify-cargo-test.log`

When the UNC source is writable, the compact summary is also copied back to:

```powershell
\\TOWER\The Goods\Serena-Projects\hermes-workspace\target\hermes-cockpit-m012\windows-verify-summary.json
```

## Boundary notes

- Tux runs on Windows/WSL. Do not translate Tux work to Pi service paths.
- Pi-only service paths belong to Migi/Pi, not Tux.
- Migi remains the final authority for Pi-hosted Hermes state and persona memory.
- Windows/GPC is a bounded worker and verification lane.
- Windows/GPC can run non-interactive worker commands such as `claude -p`, `claude --bg`, `claude logs`, and `gsd --version` when later M012 slices explicitly approve worker dispatch.
- The full `claude agents` TUI/list should be used from an interactive terminal, not non-interactive SSH.

Relevant PLUR references from Joe's handoff: `ENG-2026-0515-010`, `ENG-2026-0513-018`, and `ENG-2026-0515-006`.

## Interpreting Robocopy output

Robocopy exit codes `0` through `7` are treated as success. `*EXTRA File` lines in the mirror are acceptable when they are generated smoke artifacts or local Windows evidence. They do not indicate verification failure unless Robocopy reports `FAILED` rows or the runner exits non-zero.

## Non-claims

This is not production readiness. It proves reproducible bounded Windows/GPC verification for the Cockpit source and tests. It does not approve broad write-back, broad worker dispatch, recurring watchers, public Discord loops, or task-completion write-back from worker output.
