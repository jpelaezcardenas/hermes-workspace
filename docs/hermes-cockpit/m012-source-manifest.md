# M012 Source Manifest and Ignore Boundaries

Generated: `2026-05-17T22:04:19Z`

## Purpose

Define the safe source set for Hermes Cockpit operational-control-plane work so generated smoke artifacts, cache files, Windows-local mirror files, and unrelated repo families do not contaminate M012 packaging.

## Decision

Leave `.gitignore` unchanged for this task. The repo already has broad ignores for `target/`, `__pycache__/`, Cargo targets, `.cache`, runtime folders, and local agent artifacts. Because `.gitignore` is already modified by prior work and the repository contains many unrelated untracked Joe OS/AFFiNE artifacts, changing broad ignore rules here would be riskier than documenting an explicit Cockpit source manifest.

## Source files to keep visible

- `docs/hermes-cockpit/writeback-dispatch-watchers-contract.md`
- `docs/hermes-cockpit/live-hermes-ingestion-contract.md`
- `docs/hermes-cockpit/live-hermes-source-inventory.md`
- `scripts/hermes-cockpit-writeback.py`
- `scripts/hermes-cockpit-dispatch.py`
- `scripts/hermes-cockpit-watch.py`
- `scripts/hermes-cockpit-hermes-events.py`
- `scripts/hermes-cockpit-kanban-project.py`
- `scripts/hermes-cockpit-project.py`
- `prototypes/hermes-cockpit/Cargo.toml`
- `prototypes/hermes-cockpit/Cargo.lock`
- `prototypes/hermes-cockpit/src/main.rs`
- `prototypes/hermes-cockpit/README.md`
- `tests/hermes_cockpit/test_dispatch_adapter.py`
- `tests/hermes_cockpit/test_hermes_event_projection.py`
- `tests/hermes_cockpit/test_hermes_events_adapter.py`
- `tests/hermes_cockpit/test_kanban_project.py`
- `tests/hermes_cockpit/test_watcher_adapter.py`
- `tests/hermes_cockpit/test_writeback_adapter.py`

## Checked test fixtures to keep visible

- `tests/fixtures/hermes_cockpit/automation-ops/dispatch-ops.jsonl`
- `tests/fixtures/hermes_cockpit/automation-ops/watcher-ops.jsonl`
- `tests/fixtures/hermes_cockpit/automation-ops/writeback-ops.jsonl`
- `tests/fixtures/hermes_cockpit/hermes-source-sample.jsonl`

## Required generated fixtures

These are not ordinary source, but current tests/builds require them. They must be generated or copied into local mirrors before verification. If they become long-term test inputs, prefer moving them into `tests/fixtures/hermes_cockpit/` or `docs/hermes-cockpit/` in a future cleanup rather than force-adding broad `target/` paths.

- `target/hermes-cockpit-m010/hermes-projection.json`
- `docs/hermes-cockpit/live-kanban-projection.json`
- `docs/hermes-cockpit/projection-example.json`

## Generated smoke artifacts — do not stage by default

These are audit/evidence outputs. They are useful for GSD summaries and local inspection, but should not be bulk-staged as source. If a summary artifact is needed for review, add the smallest generated summary explicitly and explain why.

- `target/hermes-cockpit-m011/dispatch-apply-events.ndjson`
- `target/hermes-cockpit-m011/dispatch-dry-run-events.ndjson`
- `target/hermes-cockpit-m011/dispatch-dry-run-evidence.json`
- `target/hermes-cockpit-m011/dispatch-events.ndjson`
- `target/hermes-cockpit-m011/dispatch-evidence.json`
- `target/hermes-cockpit-m011/dispatch-live-apply-operation.jsonl`
- `target/hermes-cockpit-m011/dispatch-live-dry-operation.jsonl`
- `target/hermes-cockpit-m011/dispatch-projection.json`
- `target/hermes-cockpit-m011/dispatch-smoke-summary.json`
- `target/hermes-cockpit-m011/s02-t01-red.stderr`
- `target/hermes-cockpit-m011/s02-t01-red.stdout`
- `target/hermes-cockpit-m011/s03-t01-red.stderr`
- `target/hermes-cockpit-m011/s03-t01-red.stdout`
- `target/hermes-cockpit-m011/s04-t01-red.stderr`
- `target/hermes-cockpit-m011/s04-t01-red.stdout`
- `target/hermes-cockpit-m011/source-contract-summary.json`
- `target/hermes-cockpit-m011/watcher-baseline-events.ndjson`
- `target/hermes-cockpit-m011/watcher-baseline-evidence.json`
- `target/hermes-cockpit-m011/watcher-baseline.stdout`
- `target/hermes-cockpit-m011/watcher-change.stdout`
- `target/hermes-cockpit-m011/watcher-events.ndjson`
- `target/hermes-cockpit-m011/watcher-evidence.json`
- `target/hermes-cockpit-m011/watcher-initial-no-change-events.ndjson`
- `target/hermes-cockpit-m011/watcher-initial-no-change-evidence.json`
- `target/hermes-cockpit-m011/watcher-initial-no-change.stdout`
- `target/hermes-cockpit-m011/watcher-no-change-events.ndjson`
- `target/hermes-cockpit-m011/watcher-no-change-evidence.json`
- `target/hermes-cockpit-m011/watcher-no-change.stdout`
- `target/hermes-cockpit-m011/watcher-projection.json`
- `target/hermes-cockpit-m011/watcher-remove-state-events.ndjson`
- `target/hermes-cockpit-m011/watcher-remove-state-evidence.json`
- `target/hermes-cockpit-m011/watcher-remove-state.stdout`
- `target/hermes-cockpit-m011/watcher-smoke-summary.json`
- `target/hermes-cockpit-m011/watcher-source.jsonl`
- `target/hermes-cockpit-m011/writeback-apply-events.ndjson`
- `target/hermes-cockpit-m011/writeback-dry-run-events.ndjson`
- `target/hermes-cockpit-m011/writeback-dry-run-evidence.json`
- `target/hermes-cockpit-m011/writeback-events.ndjson`
- `target/hermes-cockpit-m011/writeback-evidence.json`
- `target/hermes-cockpit-m011/writeback-live-apply-operation.jsonl`
- `target/hermes-cockpit-m011/writeback-live-dry-operation.jsonl`
- `target/hermes-cockpit-m011/writeback-projection.json`
- `target/hermes-cockpit-m011/writeback-smoke-after-apply.json`
- `target/hermes-cockpit-m011/writeback-smoke-after-dry-run.json`
- `target/hermes-cockpit-m011/writeback-smoke-before.json`
- `target/hermes-cockpit-m011/writeback-smoke-card.json`
- `target/hermes-cockpit-m011/writeback-smoke-summary.json`

## Cache/build artifacts — never stage

- `scripts/__pycache__/hermes-cockpit-dispatch.cpython-313.pyc`
- `scripts/__pycache__/hermes-cockpit-hermes-events.cpython-313.pyc`
- `scripts/__pycache__/hermes-cockpit-kanban-project.cpython-313.pyc`
- `scripts/__pycache__/hermes-cockpit-project.cpython-313.pyc`
- `scripts/__pycache__/hermes-cockpit-watch.cpython-313.pyc`
- `scripts/__pycache__/hermes-cockpit-writeback.cpython-313.pyc`
- `tests/hermes_cockpit/__pycache__/test_dispatch_adapter.cpython-313.pyc`
- `tests/hermes_cockpit/__pycache__/test_hermes_event_projection.cpython-313.pyc`
- `tests/hermes_cockpit/__pycache__/test_hermes_events_adapter.cpython-313.pyc`
- `tests/hermes_cockpit/__pycache__/test_kanban_project.cpython-313.pyc`
- `tests/hermes_cockpit/__pycache__/test_watcher_adapter.cpython-313.pyc`
- `tests/hermes_cockpit/__pycache__/test_writeback_adapter.cpython-313.pyc`
- `prototypes/hermes-cockpit/target/`

## Windows mirror artifacts — never copy back wholesale

Windows/GPC verification uses a local mirror, currently `D:\projects\hermes-workspace-m011-win`. Treat it as disposable/rebuildable. Windows-local smoke outputs and Windows Hermes Kanban DB state are not canonical project source.

- `D:/projects/hermes-workspace-m011-win target/windows-* smoke files`
- `C:/Users/joe25/AppData/Local/hermes/kanban/boards/hermes-cockpit-m011-win-sandbox/kanban.db`
- `Windows mirror should be regenerated from source/fixtures, not committed back wholesale`

## Safe commit/stage checklist for Cockpit M010-M012

If Joe asks to package or commit Cockpit work, stage only these categories unless explicitly approved otherwise:

1. Cockpit docs under `docs/hermes-cockpit/` that describe contracts, inventory, runbooks, decisions, or UAT.
2. Cockpit source scripts under `scripts/hermes-cockpit-*.py` plus future `scripts/hermes-cockpit-*.sh` / `.ps1` runners.
3. Cockpit Python tests under `tests/hermes_cockpit/`.
4. Cockpit checked fixtures under `tests/fixtures/hermes_cockpit/`.
5. Ratatui prototype source under `prototypes/hermes-cockpit/`, excluding its `target/` build cache.
6. GSD milestone artifacts only if Joe wants GSD state/versioned summaries included.
7. Required render fixtures only by explicit path or after moving them out of ignored `target/`.

Do **not** stage unrelated families observed in the inventory such as `docs/joe-os-*`, `docs/affine-joe-os-v1/`, `.serena/`, or `src/server/gateway-capabilities.ts` as part of M012.

## Windows mirror sync allowlist

The Windows runner should sync only these source/fixture roots from the canonical UNC/share into the local mirror:

- `scripts/hermes-cockpit-*`
- `tests/hermes_cockpit/`
- `tests/fixtures/hermes_cockpit/`
- `prototypes/hermes-cockpit/`
- `docs/hermes-cockpit/`
- `target/hermes-cockpit-m010/hermes-projection.json`
- `target/hermes-cockpit-m011/*-smoke-summary.json`

## Verification commands

Pi/Linux:

```bash
cd /home/joe/hermes-workspace
python3 -m unittest discover tests/hermes_cockpit -v
cd prototypes/hermes-cockpit
cargo fmt --check
cargo check
cargo test
```

Windows/GPC local mirror:

```powershell
cd D:\projects\hermes-workspace-m011-win
python -m unittest discover tests/hermes_cockpit -v
cd prototypes\hermes-cockpit
cargo fmt --check
cargo check
cargo test
```

## Safety non-claims

- This manifest does not make Cockpit production-ready.
- This manifest does not approve broad write-back or worker dispatch.
- This manifest does not make the Windows mirror canonical.
- This manifest does not authorize staging unrelated repo artifacts.
