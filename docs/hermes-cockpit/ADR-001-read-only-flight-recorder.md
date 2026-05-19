# ADR-001: Hermes Cockpit as a Read-Only Flight Recorder

**Status:** Accepted for M006 MVP planning
**Date:** 2026-05-17
**Decision record:** D016
**Requirements:** R009, R010, R011

## Context

The Ratatui pitch proposes a multi-window terminal hub for watching Hermes Agent swarm activity. The useful product is not the panel layout by itself; it is an operational truth surface for Hermes and GSD work that answers:

- What card or task is active?
- Which agent or run produced an event?
- What artifact exists?
- Which claims are verified, unverified, rejected, or awaiting approval?
- What can Joe, Migi, or Pi safely trust next?

Joe's existing operating model already makes GSD and Hermes Kanban the durable task truth. Discord is coordination. Hermes on Pi coordinates. A new UI must not become a competing board.

## Decision

Hermes Cockpit will enter the stack as a **read-only Kanban-native flight recorder** for M006.

The MVP will:

1. Treat GSD or Hermes Kanban card IDs as canonical task identifiers.
2. Read or replay append-only events rather than directly controlling task state.
3. Correlate card IDs, run IDs, agent IDs, artifact URIs, evidence URIs, trust status, and approval state.
4. Render state in Ratatui only after the event/projection model is defined.
5. Defer write-back automation to a later milestone unless M006 dogfood explicitly justifies it.

## Source-of-Truth Rule

GSD and Hermes Kanban own durable task state. Cockpit mirrors, filters, warns, and replays. It does not decide that work is done, mutate board lanes, or approve artifacts during the MVP.

## Trust and Approval Rule

Cockpit must distinguish:

- Agent-generated claim
- Existence checked
- Relevance verified
- Artifact produced
- Human approved
- Rejected or superseded

Migi or Pi approval is represented as explicit event state, not inferred from an agent summary.

## Consequences

### Positive

- Prevents source-of-truth drift.
- Makes hallucination and evidence gaps visible.
- Keeps the Ratatui prototype testable from sample data.
- Allows replay and audits before live adapters exist.

### Tradeoffs

- The MVP will feel less automated at first.
- Some status updates must be manual events or Kanban comments until adapters are implemented.
- A live Hermes log watcher is deferred until the event schema proves useful.

## Deferred

- Direct board write-back from Cockpit.
- Discord bot control flow.
- Production Hermes log ingestion.
- Multi-user permission model.
- Full memory browser.

## Verification

This ADR satisfies S01/T01 when:

```bash
test -s docs/hermes-cockpit/ADR-001-read-only-flight-recorder.md \
  && grep -q "read-only" docs/hermes-cockpit/ADR-001-read-only-flight-recorder.md \
  && grep -q "D016" docs/hermes-cockpit/ADR-001-read-only-flight-recorder.md
```
