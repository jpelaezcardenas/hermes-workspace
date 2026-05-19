# M012 Artifact Inventory
## Purpose
Classify Hermes Cockpit operational-control-plane files before adding new runners or UI controls.
## Source files
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

## Checked fixtures
- `tests/fixtures/hermes_cockpit/automation-ops/dispatch-ops.jsonl`
- `tests/fixtures/hermes_cockpit/automation-ops/watcher-ops.jsonl`
- `tests/fixtures/hermes_cockpit/automation-ops/writeback-ops.jsonl`
- `tests/fixtures/hermes_cockpit/hermes-source-sample.jsonl`

## Required generated fixtures
- `target/hermes-cockpit-m010/hermes-projection.json`
- `docs/hermes-cockpit/live-kanban-projection.json`
- `docs/hermes-cockpit/projection-example.json`

## Generated smoke artifacts
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

## Cache artifacts
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

## Windows local artifacts
- `D:/projects/hermes-workspace-m011-win target/windows-* smoke files`
- `C:/Users/joe25/AppData/Local/hermes/kanban/boards/hermes-cockpit-m011-win-sandbox/kanban.db`
- `Windows mirror should be regenerated from source/fixtures, not committed back wholesale`

## Unrelated repo noise examples
- ` M src/server/gateway-capabilities.ts`
- `?? .serena/`
- `?? docs/affine-joe-os-v1/`
- `?? docs/joe-os-v1-affine-infra-evidence.md`
- `?? docs/joe-os-v1-affine-infrastructure.md`
- `?? docs/joe-os-v1-affine-live-verification.md`
- `?? docs/joe-os-v1-affine-mcp-read-search-results.md`
- `?? docs/joe-os-v1-affine-publication-capability.md`
- `?? docs/joe-os-v1-affine-publication-results.md`
- `?? docs/joe-os-v1-affine-runbooks.md`
- `?? docs/joe-os-v1-affine-scratch-restore-evidence.md`
- `?? docs/joe-os-v1-affine-write-decision.md`
- `?? docs/joe-os-v1-affine-write-path-investigation.md`
- `?? docs/joe-os-v1-affine-write-test-results.md`
- `?? docs/joe-os-v1-backup-evidence.md`
- `?? docs/joe-os-v1-component-ops-inventory.md`
- `?? docs/joe-os-v1-discord-decision-promotion.md`
- `?? docs/joe-os-v1-discord-review-checklist.md`
- `?? docs/joe-os-v1-discord-task-promotion.md`
- `?? docs/joe-os-v1-discord-workflow.md`
- `?? docs/joe-os-v1-dogfood-log.md`
- `?? docs/joe-os-v1-dogfood-readiness.md`
- `?? docs/joe-os-v1-end-to-end-validation.md`
- `?? docs/joe-os-v1-final-release-evidence.md`
- `?? docs/joe-os-v1-gsd-scratch-restore-evidence.md`
- `?? docs/joe-os-v1-health-alert-coverage.md`
- `?? docs/joe-os-v1-hindsight-provider-audit.md`
- `?? docs/joe-os-v1-incident-runbook.md`
- `?? docs/joe-os-v1-launch-blockers.md`
- `?? docs/joe-os-v1-launch-decision.md`

## Rules
- `do_not_commit_generated_smoke_artifacts_by_default`: `True`
- `preserve_required_m010_render_fixture_for_rust_tests`: `True`
- `use_windows_local_mirror_not_unc_for_windows_tests`: `True`
- `use_sys_executable_for_python_subprocess_tests`: `True`
- `operation_jsonl_readers_tolerate_utf8_bom`: `True`

## Notes
- Windows/GPC verification should use a local mirror such as `D:\projects\hermes-workspace-m011-win`, not the UNC path.
- Tux runs on Windows/WSL; Pi-only service paths belong to Migi/Pi.
- Generated `target/hermes-cockpit-m011/*` smoke evidence is useful for audit but should not be bulk-committed as source.
