# Hermes Cockpit Go / Pivot / Kill Recommendation

**Milestone:** M006
**Date:** 2026-05-17
**Recommendation:** **GO, with scoped next step**

## Decision

Proceed with Hermes Cockpit as a **read-only Flight Recorder / observability surface**, not as a writable control plane.

The next milestone should be narrow: either polish the static demo into a cleaner operator artifact or connect exactly one live adapter in read-only mode. Do not build full write-back, Discord control, memory browser, or production swarm orchestration yet.

## Why GO

M006 proved the highest-risk conceptual pieces:

1. **Source-of-truth boundary is clear.** GSD/Hermes Kanban owns task state; Cockpit mirrors and replays.
2. **Reference claims can be made safer.** The pitch's repo claims were verified and corrected rather than blindly accepted.
3. **Event-first architecture works.** NDJSON events projected into cards, runs, artifacts, warnings, approvals, and replay state.
4. **Ratatui demo is viable.** The static demo compiles and renders from projection JSON.
5. **Trust and approval are visible.** They are data-model fields and UI panels, not afterthoughts.
6. **Parallel execution worked.** Reference verification and event-spine design ran concurrently without file conflicts.
7. **Serena added value.** Even though it could not activate the Hermes workspace mount directly, it exposed a reusable Ratatui TestBackend smoke-test pattern from Joe's EOS project.

## What is not production ready

This is **not production ready** and should not be described as a live Hermes swarm dashboard yet.

Not ready:

- No live Hermes log/event adapter.
- No live GSD/Kanban API import beyond comments and existing CLI checks.
- No write-back control plane.
- No formal Rust unit test module yet.
- No packaged binary or install command.
- No terminal screenshot/asciinema artifact yet.
- Some warning payloads need UI field-shape polish.

## Recommended next milestone options

### Option A — UI polish and test hardening

Best if Joe wants a convincing demo artifact quickly.

Scope:

- Add a formal Rust test using `TestBackend`.
- Fix warning summary extraction.
- Add better card titles from projection payloads.
- Add screenshot/asciinema proof.
- Improve visual theme toward “swarm cockpit / flight recorder.”

### Option B — One live read-only adapter

Best if Joe wants operational usefulness next.

Scope:

- Read Hermes Kanban board state through CLI or DB/API in read-only mode.
- Map one real card into projection JSON.
- Keep all mutations disabled.
- Show live card status in Cockpit.

### Option C — Kill/pause

Only choose if Joe decides this overlaps too much with Hermes Dashboard or existing Kanban UI.

Kill criteria:

- If the static Cockpit does not help Joe answer active work / artifact / trust / approval questions faster than existing tools.
- If maintaining a Rust TUI would distract from GSD/Hermes core improvements.

## Recommended path

**Choose Option B after one small Option A polish pass.**

Immediate next tasks:

1. Fix warning summary and card title rendering.
2. Add a Rust `TestBackend` unit test.
3. Add one read-only Kanban board import/projection adapter.
4. Re-run the 60-second dogfood checklist with one live card.

## Final call

**GO** for the next scoped prototype milestone.
**Do not** claim production readiness.
**Do not** add write-back automation until a live read-only adapter passes dogfood.
