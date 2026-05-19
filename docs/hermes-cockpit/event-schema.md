# Hermes Cockpit Flight Recorder Event Schema

**Status:** Lane B draft for M006
**Scope:** Read-only Hermes Cockpit / Flight Recorder event spine and projection contract
**Inputs:** `ADR-001-read-only-flight-recorder.md`, `brainstorm-brief.md`

## Purpose

Hermes Cockpit is a read-only, Kanban-native flight recorder. It records append-only observations about GSD/Hermes cards, runs, agents, artifacts, trust state, and approvals, then derives UI state by replaying those events. The event spine must not mutate Kanban lanes, decide that work is done, or infer human approval from agent summaries.

## Event store format

M006 uses NDJSON: one complete JSON object per line, ordered by append time. Projection is deterministic: replaying the same file must produce the same card, run, artifact, warning, and approval summary.

Every event should include all top-level fields below. Optional correlation fields use `null` when not applicable so adapters and projections can rely on stable keys.

## Canonical event object

```json
{
  "id": "evt_google_pitch_001",
  "ts": "2026-05-17T01:30:00Z",
  "schema_version": "hermes-cockpit.event.v1",
  "source": "hermes",
  "event_type": "run_started",
  "actor": "migi-orchestrator",
  "task_id": "t_5e3f0adf",
  "run_id": "run_google_pitch_eval_001",
  "agent_id": "agent_researcher_01",
  "artifact_uri": null,
  "evidence_uri": null,
  "trust": {
    "status": "unknown",
    "evidence_state": "claim_only",
    "confidence": 0.0,
    "reason": "Run has started but produced no evidence yet."
  },
  "payload": {
    "board": "hermes-cockpit-trial",
    "card_title": "Dogfood one Kanban-backed pitch evaluation run",
    "run_goal": "Evaluate the Google pitch and expose claims, artifacts, and approvals."
  },
  "replay": {
    "stream": "google-pitch-demo",
    "sequence": 1,
    "visible": true,
    "checkpoint": true,
    "summary": "Started Google pitch evaluation run.",
    "caused_by": null
  }
}
```

## Top-level fields

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | yes | Stable event identifier. Must be unique within the event store. |
| `ts` | RFC3339 string | yes | Event timestamp in UTC when possible. |
| `schema_version` | string | yes | Schema marker. M006 uses `hermes-cockpit.event.v1`. |
| `source` | enum string | yes | Origin adapter: `gsd`, `hermes`, `manual`, `filesystem`, `discord`, or `projection`. |
| `event_type` | enum string | yes | Event semantic type. See event type table below. |
| `actor` | string | yes | Entity that caused or reported the event: agent id, Joe, Migi, Pi, or `system`. |
| `task_id` | string or null | yes | Canonical GSD/Hermes Kanban card id. GSD/Kanban remains source of truth. |
| `run_id` | string or null | yes | Hermes/sub-agent run correlation id. |
| `agent_id` | string or null | yes | Worker, reviewer, orchestrator, or adapter id when known. |
| `artifact_uri` | string or null | yes | URI for produced or referenced artifact, e.g. `file://docs/...`. |
| `evidence_uri` | string or null | yes | URI for evidence supporting or challenging the event, e.g. file path with line anchor, log URI, or run transcript URI. |
| `trust` | object | yes | Trust/verification status for the event claim or artifact. |
| `payload` | object | yes | Event-specific data. Must be JSON-serializable and should avoid secrets. |
| `replay` | object | yes | Replay metadata used to rebuild the timeline and scrub UI state. |

## Source enum

- `gsd`: event observed from GSD artifacts or task plans.
- `hermes`: event observed from Hermes Agent, sub-agent, or dispatcher output.
- `manual`: explicit human/Migi/Pi operator note.
- `filesystem`: local artifact existence or file watcher observation.
- `discord`: future Discord/thread adapter observation.
- `projection`: synthetic projection/checkpoint event, if later needed.

## Event types

M006 projection must handle at least these event types:

| Event type | Purpose | Expected payload keys |
| --- | --- | --- |
| `run_started` | A Hermes or manual run began for a card. | `board`, `card_title`, `run_goal` |
| `run_completed` | A run reached a terminal state without changing Kanban. | `status`, `outcome` |
| `claim_observed` | A claim was seen in agent output, source pitch, docs, or logs. | `claim_id`, `claim`, `claim_scope` |
| `artifact_created` | A file/report/checkpoint artifact exists. | `artifact_name`, `artifact_kind`, `summary` |
| `trust_flagged` | A claim/artifact has a trust, relevance, or evidence problem. | `claim_id`, `severity`, `summary`, `action` |
| `approval_required` | Human/Migi/Pi approval is needed before trusting or acting on an artifact. | `approval_id`, `approver`, `reason`, `decision_options` |
| `approval_recorded` | Explicit approval/rejection/conditional decision was recorded. | `approval_id`, `decision`, `approved_by`, `conditions` |

Later adapters may add `task_snapshot`, `evidence_checked`, `run_failed`, `artifact_superseded`, or `approval_revoked`, but those are outside the Lane B minimum.

## Trust object

`trust` distinguishes agent claims, evidence checks, artifact creation, human approval, and rejected/superseded facts.

```json
{
  "status": "unverified",
  "evidence_state": "claim_only",
  "confidence": 0.25,
  "reason": "Repository existence was claimed, but relevance has not been inspected."
}
```

### `trust.status`

- `unknown`: no trust conclusion yet.
- `unverified`: visible claim with insufficient proof.
- `verified`: evidence is sufficient for the local decision being made.
- `rejected`: claim/artifact should not be trusted.
- `superseded`: older event was replaced by later evidence.

### `trust.evidence_state`

- `claim_only`: agent/user/source text made a claim.
- `existence_checked`: referenced thing exists, but relevance may still be unknown.
- `relevance_verified`: evidence supports relevance to the task.
- `artifact_produced`: file or other artifact exists at `artifact_uri`.
- `human_approved`: Joe/Migi/Pi explicitly approved or rejected a decision.

## Replay object

Replay metadata keeps the flight recorder scrub-friendly without requiring UI code to parse every payload shape.

| Field | Type | Meaning |
| --- | --- | --- |
| `stream` | string | Timeline stream name, e.g. `google-pitch-demo`. |
| `sequence` | integer | Monotonic order within the stream. |
| `visible` | boolean | Whether to show the event in the default cockpit timeline. |
| `checkpoint` | boolean | Whether this event is a replay checkpoint/key frame. |
| `summary` | string | One-line human-readable event summary. |
| `caused_by` | string or null | Prior event id that caused this event, if known. |

## Projection rules

A projection consumes events in `(replay.sequence, ts, id)` order and derives read-only state:

1. `cards`: keyed by `task_id`; titles come from `payload.card_title` or first observed title. Cards aggregate run ids, artifacts, warning counts, approval counts, and trust counts.
2. `active_runs`: runs with `run_started` and no terminal event.
3. `completed_runs`: runs with `run_completed` or a later terminal event.
4. `artifacts`: entries from `artifact_created` and any event with `artifact_uri`; approval/trust fields are updated by later events with the same URI.
5. `warnings`: `trust_flagged` events plus any future rejected trust event.
6. `approvals`: explicit `approval_required` and `approval_recorded` events. Pending approval is computed by matching `payload.approval_id`.
7. `replay`: ordered summaries only; the projection must not infer card completion or mutate Kanban.

## Safety notes

- Do not store secrets in `payload`, `artifact_uri`, or `evidence_uri`.
- Do not infer approval from a positive agent summary; use `approval_recorded` only.
- Do not infer a card is complete from `run_completed`; card status remains owned by GSD/Hermes Kanban.
- When source claims are only existence-checked, keep `trust.status` at `unverified` unless relevance was actually inspected.
