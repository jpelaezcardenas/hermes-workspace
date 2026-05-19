# Hermes Cockpit Parallel Execution Plan

**Status:** Active guidance for M006
**Date:** 2026-05-17

## Goal

Speed up M006 without creating file conflicts, source-of-truth drift, or unreviewed worker output.

## Principle

Parallelize by artifact ownership, not by enthusiasm. Each lane owns different files and has machine-checkable verification. GSD remains canonical; Kanban trial cards remain in triage unless Joe explicitly asks to dispatch board workers.

## Safe Parallel Lanes

### Lane A — Evidence / Reference Verification

**Can run now.**

Owns:

- `docs/hermes-cockpit/reference-verification.md`

Inputs:

- `docs/hermes-cockpit/source-pitch-message.txt`
- cloned or remotely inspected GitHub repos

Checks:

```bash
test -s docs/hermes-cockpit/reference-verification.md \
  && grep -q "joeynyc/hermes-hud" docs/hermes-cockpit/reference-verification.md \
  && grep -q "m0at/hermes-lite" docs/hermes-cockpit/reference-verification.md \
  && grep -qi "verified" docs/hermes-cockpit/reference-verification.md
```

### Lane B — Event Spine / Projection

**Can run now because ADR-001 exists.**

Owns:

- `docs/hermes-cockpit/event-schema.md`
- `docs/hermes-cockpit/sample-google-pitch-run.ndjson`
- `scripts/hermes-cockpit-project.py`
- `docs/hermes-cockpit/projection-example.json`

Inputs:

- `docs/hermes-cockpit/ADR-001-read-only-flight-recorder.md`
- `docs/hermes-cockpit/brainstorm-brief.md`

Checks:

```bash
test -s docs/hermes-cockpit/event-schema.md \
  && grep -q "task_id" docs/hermes-cockpit/event-schema.md \
  && grep -q "run_id" docs/hermes-cockpit/event-schema.md \
  && grep -q "trust" docs/hermes-cockpit/event-schema.md

python3 -m json.tool docs/hermes-cockpit/projection-example.json >/dev/null
```

### Lane C — Static Ratatui Skeleton

**Can start after Lane B defines enough projection shape, but the crate skeleton can start now with placeholder data.**

Owns:

- `prototypes/hermes-cockpit/Cargo.toml`
- `prototypes/hermes-cockpit/src/main.rs`
- `prototypes/hermes-cockpit/README.md`
- `docs/hermes-cockpit/tui-verification.md`

Checks:

```bash
test -f prototypes/hermes-cockpit/Cargo.toml \
  && test -f prototypes/hermes-cockpit/src/main.rs \
  && grep -q "ratatui" prototypes/hermes-cockpit/Cargo.toml

cd prototypes/hermes-cockpit && cargo check
```

### Lane D — Integration / GSD Closure

**Runs after lanes A-C produce artifacts.**

Owns:

- GSD task/slice completion summaries
- Kanban comments linking artifacts back to cards
- `docs/hermes-cockpit/dogfood-checklist.md`
- `docs/hermes-cockpit/go-pivot-kill.md`

Checks:

```bash
hermes kanban --board hermes-cockpit-trial show t_0bae8655 | grep -q "M006"
test -s docs/hermes-cockpit/go-pivot-kill.md
```

## Recommended Dispatch Shape

Immediate parallel wave:

1. **Worker 1:** Lane A reference verification.
2. **Worker 2:** Lane B event schema, sample events, projection script.
3. **Migi:** Review outputs, complete GSD tasks, then decide whether Lane C can start.

Second wave:

1. **Worker 1:** Lane C Ratatui skeleton and rendering.
2. **Worker 2 or Migi:** TUI PTY verification doc and dogfood checklist.
3. **Migi:** Final GSD closure and go/pivot/kill recommendation.

## Collision Rules

- No two workers edit the same file.
- No worker moves Kanban cards out of triage unless Joe explicitly asks.
- Workers may create artifacts, but Migi verifies before marking GSD tasks complete.
- Claims from worker summaries are not accepted without file/readback or command evidence.

## Why This Speeds Things Up

The critical path becomes:

```text
ADR done
  ├─ Lane A reference verification
  └─ Lane B event spine/projection
        └─ Lane C Ratatui skeleton/rendering
              └─ Lane D dogfood + decision
```

This lets evidence verification and event modeling happen simultaneously while preserving a clean merge/review boundary.
