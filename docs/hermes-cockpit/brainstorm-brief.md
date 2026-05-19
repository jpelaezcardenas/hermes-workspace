# Hermes Cockpit / Flight Recorder — MoA + Brainstorm Brief

## Verdict

Greenlight the core idea as a small **Hermes Cockpit / Flight Recorder** MVP, but do **not** treat the supplied Ratatui mockup as the architecture. The product is not “a prettier terminal dashboard”; it is a **Kanban-native observability layer** for Hermes/GSD work.

One-liner:

> Hermes Cockpit is DevTools for AI agent swarms: a Kanban-native flight recorder that shows what every Hermes agent is doing, what evidence exists, what is blocked, and what needs Migi/Pi approval.

## What is strong

- Agent swarms need observability once work is split across GSD, Discord, local files, Hermes logs, and sub-agent sessions.
- Ratatui is a good local-first MVP surface: fast, keyboard-native, log-friendly, and easier than a full web dashboard.
- The pitch’s panel instinct is directionally right: global health, active runs, live stream, artifacts, memory/skills, and logs.
- It fits Joe’s current architecture if GSD/Kanban remains the work source of truth and Migi/Pi retains final authority.

## What needs correction

- The pitch is UI-first. It needs an event model, source-of-truth rule, artifact correlation, and trust/approval semantics.
- Polling `~/.hermes` alone is brittle. Use an append-only event spine first, then adapters.
- The “skills/memory panel” should avoid fantasy claims. Show grounded facts only: enabled tools, linked artifacts, verification state, approval state, active constraints.
- Trust is missing. The cockpit must show claimed vs verified, artifact-created vs artifact-approved, and human-approved vs agent-generated.
- Correlation is the real product problem: GSD card ID ↔ Hermes run ID ↔ agent ID ↔ artifact path ↔ evidence/trust status.

## Reference sanity check

A quick `git ls-remote` check confirmed these repos currently resolve:

- `joeynyc/hermes-hud` → HEAD resolves.
- `m0at/hermes-lite` → HEAD resolves.
- `NousResearch/hermes-agent` → HEAD resolves.

That only verifies existence. It does **not** verify that the repos are relevant, production-quality, or accurately described by the pitch. A Kanban card was created to inspect/remove any unsupported claims before GSD planning cites them.

## Better MVP architecture

```text
Sources
  ├── GSD / Hermes Kanban board
  ├── Hermes logs/events
  ├── Local artifact filesystem
  ├── Manual trust/approval commands
  └── Discord thread adapter later

Adapters
  ├── Kanban/GSD adapter
  ├── Hermes event/log adapter
  ├── Filesystem watcher
  ├── Manual CLI adapter
  └── Discord adapter later

Event Store
  ├── SQLite or NDJSON
  ├── Append-only
  ├── Timestamped
  └── Replayable

Projection Layer
  ├── Current task/card state
  ├── Active Hermes runs
  ├── Agent status
  ├── Artifacts
  ├── Trust/verification flags
  └── Approval queue

UI
  ├── Ratatui cockpit
  ├── Read-only first
  ├── Keyboard filters/search
  └── Replay mode
```

Minimal event shape:

```rust
Event {
    id: String,
    ts: DateTime,
    source: SourceKind,        // hermes, gsd, manual, filesystem, discord
    event_type: EventType,     // run_started, task_moved, artifact_created, claim_flagged, approval_required
    actor: String,             // agent id, Joe, Migi, Pi, system
    task_id: Option<String>,   // GSD/Kanban card id
    run_id: Option<String>,
    agent_id: Option<String>,
    artifact_uri: Option<String>,
    evidence_uri: Option<String>,
    trust: TrustStatus,        // unknown, unverified, verified, rejected
    payload: Json,
}
```

## Killer demo

1. Joe opens the **Hermes Cockpit Trial** board.
2. A card exists: “Evaluate Google pitch.”
3. Agents/reviewers attach events to that card.
4. Cockpit shows card status, active runs, generated artifacts, unverified claims, and approval needs.
5. A reference claim is flagged as unverified until checked.
6. Migi/Pi approval is recorded explicitly.
7. Joe scrubs replay mode to see how the conclusion was reached.

Promise:

> Within 60 seconds, Joe can see what the swarm is doing, what changed, what is trustworthy, and what requires a human decision.

## GSD-ready decomposition

### Milestone 0 — Sanity check and scope

- Verify/remove claimed GitHub references.
- Identify real Hermes telemetry/log/event sources.
- Decide source of truth: GSD/Kanban card ID.
- Write one-page ADR.
- Define read-only MVP.

### Milestone 1 — Event spine

- Create NDJSON or SQLite event store.
- Define event schema.
- Create manual append command.
- Build projection generator for tasks, runs, artifacts, and trust flags.

### Milestone 2 — Static Ratatui cockpit

- Render sample state from sample events.
- Show cards, live/recent events, active runs, artifacts, trust/approval warnings, logs.
- Add basic keyboard controls.
- Verify with PTY smoke test or screenshot.

### Milestone 3 — Kanban import

- Read one real board/card.
- Map cards to `task_id`.
- Display title/status/owner/labels.
- Keep read-only.

### Milestone 4 — Hermes adapter

- Decide how a Hermes run is tagged to a card.
- Watch/ingest logs or events.
- Parse run started/completed, tool call, artifact created, error/blocker.
- Attach events to `task_id`.

### Milestone 5 — Trust and approval overlay

- Add statuses: unknown, unverified, verified, rejected.
- Add approval states: none, approval required, approved by Migi/Pi, rejected.
- Highlight risky claims and approval-needed artifacts.

### Milestone 6 — Dogfood run

- Track one real card.
- Produce one artifact.
- Flag one trust issue.
- Record Migi/Pi approval state.
- End with go/pivot/kill recommendation.

## Kanban trial created

Board: `hermes-cockpit-trial`

Cards created in `triage` so the dispatcher will not accidentally run workers yet:

- `t_0bae8655` — ADR: define Hermes Cockpit MVP and source of truth
- `t_98e01599` — Verify or remove untrusted repo/reference claims
- `t_ab5b3c2f` — Define event schema plus sample Google-pitch run
- `t_9f7b47b1` — Build static Ratatui cockpit from sample events
- `t_5e3f0adf` — Dogfood one Kanban-backed pitch evaluation run

Useful commands:

```bash
hermes kanban boards switch hermes-cockpit-trial
hermes kanban --board hermes-cockpit-trial list
hermes kanban --board hermes-cockpit-trial show t_0bae8655
```

## High-leverage differentiators

### 1. Replay timeline / swarm flight recorder

Make replay mode part of the MVP, not a future flourish:

```text
T+00:00  GSD card moved to In Progress
T+00:08  researcher started
T+00:31  repo reference found
T+00:45  critic flagged repo as unverified
T+01:12  synthesizer created pitch_synthesis.md
T+01:50  Pi approval requested
T+02:20  Pi approved final artifact
```

This helps debug failed runs, reconstruct decisions, improve prompts, and prove what actually happened.

### 2. Trust/verification overlay

Make hallucination risk visible instead of hidden:

```text
⚠ Unverified repo claim: joeynyc/hermes-hud
   Source: agent output
   Evidence: existence checked; relevance unchecked
   Action: inspect before citing
```

Badges:

- ✅ Verified
- ⚠ Unverified
- ❌ Rejected
- 🧑 Needs Migi/Pi approval
- 🔒 Human-approved

## Recommended next move

Do not build all integrations yet. Pull only the first three cards:

1. ADR: MVP architecture and source of truth
2. Verify/remove untrusted repo/reference claims
3. Define event schema plus sample Google-pitch run

If those three produce an artifact that feels useful, proceed to the static Ratatui demo. If they feel ornamental, kill/pivot before writing adapters.
