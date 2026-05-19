# Hermes Cockpit Dogfood Checklist

**Milestone:** M006
**Slice:** S04
**Date:** 2026-05-17
**Question:** Can Joe/Migi identify active work, artifacts, trust status, blockers, and approval needs within 60 seconds from the Cockpit artifacts and trial board?

## Evidence Inputs

- GSD roadmap: `.gsd/milestones/M006/M006-ROADMAP.md`
- S01 evidence: `docs/hermes-cockpit/ADR-001-read-only-flight-recorder.md`, `docs/hermes-cockpit/reference-verification.md`, `docs/hermes-cockpit/parallel-execution-plan.md`
- S02 evidence: `docs/hermes-cockpit/event-schema.md`, `docs/hermes-cockpit/sample-google-pitch-run.ndjson`, `scripts/hermes-cockpit-project.py`, `docs/hermes-cockpit/projection-example.json`
- S03 evidence: `prototypes/hermes-cockpit/src/main.rs`, `prototypes/hermes-cockpit/README.md`, `docs/hermes-cockpit/tui-verification.md`
- Kanban board: `hermes-cockpit-trial`

## 60-Second Operator Questions

| Question | Evidence Surface | Result | Notes |
|---|---|---:|---|
| What is active? | `hermes kanban --board hermes-cockpit-trial list`; Cockpit card panel | Pass | Trial cards remain visible and mapped to M006 comments; GSD milestone status shows S01-S03 complete, S04 pending. |
| What changed? | GSD S01-S03 summaries; Cockpit replay/event stream | Pass | Event spine, reference verification, and static Ratatui demo were produced and linked. |
| What artifact exists? | Cockpit artifacts panel; `docs/hermes-cockpit/*`; `prototypes/hermes-cockpit/*` | Pass | Brief, ADR, reference table, schema, NDJSON sample, projection JSON, script, and Ratatui prototype exist. |
| What is trustworthy? | Reference verification table; trust warning panel | Pass | `hermes-hud` existence/relevance is scoped; Ratatui claim rejected. `hermes-lite` is relevant inspiration, not production Cockpit proof. |
| What is blocked? | GSD status and Kanban comments | Pass | No current technical blocker. Production/live adapter work remains intentionally deferred. |
| What needs approval? | Approval events and go/pivot/kill artifact | Pass with condition | M006 can proceed as a prototype/dogfood success, but production integration needs explicit future approval. |

## Verification Commands Run

```bash
cd prototypes/hermes-cockpit
cargo check
cargo run -- --smoke ../../docs/hermes-cockpit/projection-example.json \
  | grep -E 'HERMES COCKPIT|GSD / Kanban Cards|Trust / Approval Warnings'
```

Result: passed; output included expected Cockpit title and panel labels.

## Dogfood Friction

- Serena could not activate `/home/joe/hermes-workspace` directly. The usable Serena mount was `/workspace/project`, which currently exposes `eos-ratatui-client`; that was still useful for inspecting Joe's existing Ratatui TestBackend smoke-test pattern.
- PTY capture via `script` did not reliably expose alternate-screen text in this environment, so the deterministic TestBackend smoke mode is the reliable automated render proof.
- Warning summaries need one polish pass; one warning rendered as fallback text because the projection warning shape and UI expected field differed.

## Dogfood Result

**Pass for MVP continuation.** The Cockpit concept materially improved coordination by forcing explicit source-of-truth boundaries, evidence status, event replay, and approval state before live adapters. The result is not production ready, but it is strong enough for a next milestone focused on live adapter proof or UI polish.
