# Hermes Cockpit Live-Card Dogfood Decision

**Date:** 2026-05-17T15:36:44Z
**Milestone / Slice:** M008/S04
**Board:** `hermes-cockpit-trial`
**Decision:** **GO — continue to a next scoped read-only live Hermes event ingestion milestone.**

## Decision Summary

Hermes Cockpit has enough evidence to continue toward live Hermes event ingestion, but only as a **read-only ingestion/projection milestone**. It is **not** ready for production use, live worker dispatch, Kanban/GSD write-back, or launch claims.

The correct next move is a narrow follow-up milestone that ingests real Hermes runtime events into the Cockpit projection model while preserving GSD/Hermes Kanban as source of truth.

## Why GO

S04 dogfood used fresh live board data rather than only the checked-in fixture.

Evidence from `target/hermes-cockpit-m008-s04/dogfood-summary.json`:

- Live board cards before dogfood: `5`
- Live board cards after dogfood: `5`
- Stable task/status/assignee/title signature matched: `true`
- Projection source mode: `read-only`
- Projection board: `hermes-cockpit-trial`
- Projection card count: `5`
- Projection event count: `5`
- Active runs rendered: `5`
- Warnings rendered: `0`
- Required approvals rendered: `0`
- Cockpit Rust gates passed:
  - `cargo fmt --check`
  - `cargo check`
  - `cargo test`
- Strict smoke markers all passed:
  - `HERMES COCKPIT`
  - `GSD / Kanban Cards`
  - `source: read-only hermes-cockpit-trial`
  - `kanban_card_observed`
  - `Observed triage Kanban card`
  - `Read-only demo: no GSD/Kanban/Hermes state is mutated.`

This proves the live-card read-only path is coherent enough for the next integration layer.

## Why Not Production Ready

The current Cockpit is still a prototype projection surface.

Remaining gaps:

1. **No live Hermes event stream ingestion yet.**
   Current events are synthesized from `hermes kanban --board hermes-cockpit-trial list --json`.

2. **No rich card-body/comment parsing.**
   Artifacts, approvals, trust states, and evidence links are not extracted from Kanban comments or task bodies yet.

3. **No worker dispatch.**
   Live dispatch would spawn workers and mutate project state; it still requires explicit Joe approval.

4. **No Kanban/GSD write-back.**
   Cockpit remains read-only and must not move cards, add comments, assign workers, or complete tasks.

5. **Serena visibility remains split.**
   The active Cockpit workspace is Pi-local at `/home/joe/hermes-workspace`; Serena sees projects through `\\TOWER\The Goods\Serena-Projects` as `/workspace/project`. Keep using GSD/file/shell here unless the repo is intentionally mirrored.

## Non-claims

This decision does **not** claim:

- production readiness;
- launch readiness;
- write-back automation safety;
- live worker dispatch safety;
- complete artifact/trust/approval extraction;
- complete Hermes event spine integration;
- that Cockpit is now the source of truth.

GSD/Hermes Kanban remains the task-state source of truth.

## Next recommendation

Create the next milestone as a **read-only live Hermes event ingestion spike**.

Suggested scope:

1. Define a minimal Hermes event source contract:
   - session/run ID;
   - agent ID;
   - card/task ID when available;
   - event type;
   - timestamp;
   - trust/evidence state;
   - artifact URI when available.
2. Build a read-only event collector that can consume one safe source:
   - Hermes telemetry/log events, or
   - GSD/Hermes Kanban comments/body metadata, or
   - a replayable local event fixture generated from real Hermes output.
3. Extend the projection format without adding write-back.
4. Render mixed Kanban-card plus Hermes-event data in Cockpit.
5. Add TestBackend and strict smoke coverage before dogfooding.
6. Keep dispatch/write-back behind explicit Joe approval and out of the next milestone unless separately authorized.

## Decision Matrix

| Option | Verdict | Rationale |
|---|---:|---|
| Continue read-only live event ingestion | **GO** | The live-card projection/render path is stable and read-only; next risk is event source integration. |
| More UI polish first | Pivot later | Useful, but less valuable than proving real event ingestion now. |
| Enable write-back / dispatch | **NO-GO** | Would mutate state and spawn workers; requires explicit Joe approval and a separate safety milestone. |
| Stop Cockpit work | Kill rejected | Current evidence shows the concept is useful and safe enough to continue in read-only mode. |

## Evidence Artifacts

- `target/hermes-cockpit-m008-s04/dogfood-summary.json`
- `target/hermes-cockpit-m008-s04/live-projection.json`
- `target/hermes-cockpit-m008-s04/smoke-output.txt`
- `.gsd/milestones/M008/slices/S03/S03-SUMMARY.md`
- `.gsd/milestones/M008/slices/S04/tasks/T01-SUMMARY.md`
