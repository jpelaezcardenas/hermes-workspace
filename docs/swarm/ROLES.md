# Swarm Role Presets

The canonical Swarm roster uses semantic Hermes worker IDs from `swarm.yaml`. Role presets are routing aids, not a reason to spawn every role. Pick the closest semantic worker, tune the mission, then start durable work only when profile state, dependencies, retries, logs, audit trail, or cross-turn execution matter.

Canonical project specs live at:

```text
/swarm-specs/projects/<semantic-worker-id>.md
```

## Preset summary

| Worker ID | Role intent | Use when |
| --- | --- | --- |
| `orchestrator` | Mission decomposition, routing, greenlight gates | Work needs durable coordination, dependency management, or escalation. |
| `km-agent` | RAZSOC/GBrain/source-of-truth stewardship | Docs, knowledge graph, Obsidian, drift, or handoff quality matter. |
| `builder` | Scoped implementation with tests and small diffs | Product code or repo changes need to ship. |
| `reviewer` | Independent quality/security/regression gate | Merge readiness, adversarial review, or risk assessment is needed. |
| `qa` | Browser/manual/test/workflow verification | Smoke checks, expected-vs-actual validation, screenshots, or console checks matter. |
| `researcher` | Bounded research and discovery | Web/source research, synthesis, or evidence gathering is needed. |
| `ops-watch` | Local runtime health and reliability | Gateway, Workspace, cron, MCP, ports, logs, processes, or service health matter. |
| `maintainer` | Upstream/dependency/release hygiene | Patches, releases, dependency drift, or workaround hygiene matter. |
| `strategist` | Wedges, kill criteria, tradeoffs | Planning, bets, sequencing, or decision review is needed. |
| `inbox-triage` | Inbound classification/capture/routing | Issues, PRs, messages, or incoming material need routing. |

## Role routing discipline

Use durable Swarm/Kanban/Profile dispatch only when named profile state, dependencies, retries, logs, audit trail, or cross-turn execution matter. Keep short generic checks on `delegate_task`/synchronous subagents and let the root operator handle small verified work directly.

Split only genuinely independent lanes, link real dependencies, checkpoint after batches/blockers, and use one deliberate expensive review gate by default unless deeper review is explicitly approved. If a worker stalls, inspect, reclaim/retry, reassign, narrow, or block with evidence; do not silently absorb the role into the parent context.

## Worker contracts

### `orchestrator`

Specialty: control-plane state, dispatch, drift detection, escalation.

Use for multi-worker missions, SwarmBrief framing, checkpoint interpretation, dependency routing, greenlight gates, and stalled-worker recovery.

Good checkpoint:

```text
STATE: HANDOFF
RESULT: Routed docs release to km-agent and review gate to reviewer after docs checkpoint.
NEXT_ACTION: Wait for km-agent NEEDS_REVIEW checkpoint, then dispatch reviewer merge-readiness review.
```

### `km-agent`

Specialty: RAZSOC, GBrain, Obsidian/source-of-truth, docs, skills hygiene, memory curation.

Use for README/docs trees, runbooks, handoffs, skill documentation, graph/source drift checks, and knowledge integrity.

### `builder`

Specialty: implementation, bug fixes, integrations, focused refactors.

Use for narrow code diffs with tests/build proof. Builder should ship small slices, not opportunistic rewrites.

### `reviewer`

Specialty: independent code/security/regression review and merge readiness.

Reviewer verdicts should be one of:

- APPROVED
- CHANGES_REQUESTED
- BLOCKED

### `qa`

Specialty: regression QA, render verification, browser/manual/test workflow checks.

QA should say exactly what was checked, exactly what failed, and exactly how to reproduce it.

### `researcher`

Specialty: bounded research, discovery, citations, market/model scans, experiment notes.

Researcher drafts evidence and options; humans approve public posting or strategic commitments.

### `ops-watch`

Specialty: local runtime health, gateway/MCP/cron/process/log checks, repair playbook updates.

Ops-watch keeps the runtime floor stable and boring.

### `maintainer`

Specialty: upstream sync, dependency hygiene, releases, local patches, workaround cleanup.

Use when the main risk is drift against external sources or package/release health.

### `strategist`

Specialty: operating plans, wedges, bets, kill criteria, tradeoff reviews.

Use when sequencing and decision quality matter more than immediate execution.

### `inbox-triage`

Specialty: issues/PRs/messages classification, capture, discard, research, or route.

Inbox-triage should never silently merge, close, or publish. It prepares the work and asks for the gate.

## Custom workers

Use a custom worker only when none of the semantic workers fit. Document:

- standing mission
- profile name
- wrapper name
- toolsets/plugin toolsets
- greenlight boundaries
- checkpoint contract

If the custom role becomes durable, add it to `swarm.yaml`, profile config, wrapper, and `docs/swarm/ALIGNMENT_HEALTH.md` invariants together.
