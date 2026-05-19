# M011 Contract — Gated Write Back, Worker Dispatch, and Watchers

## Purpose

M011 intentionally expands Hermes Cockpit beyond M010 read-only ingestion into **gated automation**. This contract is the boundary: write-back, worker dispatch, and watchers may work only through explicit typed operations, dry-run previews, audit evidence, and stop/rollback procedures.

M011 does **not** make Cockpit production-ready. It proves bounded automation under dogfood conditions.

## Non-claims and hard boundaries

- **No production-readiness claim.** M011 proves gated dogfood only.
- **No implicit write-back from transcript prose.** Assistant/user/tool text is never parsed directly into mutations.
- **No direct GSD/Kanban database edits.** Mutations must go through documented adapters/CLIs with audit evidence.
- **No live worker dispatch without dry-run preview.** Dispatch requires spawnability checks and allowlisted profiles.
- **No durable watcher without stop/remove documentation.** Watchers must have watermark dedup and quiet no-change behavior.
- **No public-channel agent loops.** Watcher/dispatch output must be concise and Joe-directed; no recursive agent handoff chatter.
- **No raw secrets or raw transcript dumps.** M010 privacy exclusions carry forward.

## Operation envelope

All mutating or durable operations use `hermes-cockpit.operation.v1` JSON lines. One line is one requested operation.

Required fields:

```json
{
  "schema_version": "hermes-cockpit.operation.v1",
  "operation_id": "op_m011_example_001",
  "operation_type": "writeback.task_comment",
  "mode": "dry-run",
  "actor": "Migi",
  "source": "cockpit",
  "target": {
    "system": "gsd",
    "id": "M011/S02/T-smoke"
  },
  "payload": {},
  "requested_at": "2026-05-17T20:15:00Z",
  "approval": {
    "required": true,
    "status": "not_requested"
  }
}
```

Field rules:

| Field | Rule |
|---|---|
| `schema_version` | Must equal `hermes-cockpit.operation.v1`. |
| `operation_id` | Stable, unique, slug-safe. Used for audit correlation. |
| `operation_type` | Must be one of the allowlisted operation types below. |
| `mode` | Must be `dry-run` or `apply`; `apply` is invalid without a prior matching dry-run evidence record. |
| `actor` | Human/agent that requested the operation; does not prove approval. |
| `source` | `cockpit`, `watcher`, or `operator`; no arbitrary source names. |
| `target` | Explicit system + ID; no fuzzy matching from prose. |
| `payload` | Type-specific bounded payload. Raw transcript text and raw tool args are forbidden. |
| `approval` | Records whether human approval is required, requested, granted, denied, or not needed. |

## Allowed operation types

### Write-back operations

| Operation type | Description | Apply target | Rollback/remediation |
|---|---|---|---|
| `writeback.task_comment` | Add a bounded audit/comment note to a selected GSD/Kanban task. | One explicit task/card ID. | Add a compensating comment noting reversal; never delete history automatically. |
| `writeback.task_status` | Move one selected sandbox/test task between allowlisted statuses. | One explicit sandbox/test task/card ID. | Move back to prior status with evidence. |
| `writeback.task_metadata` | Set one allowlisted metadata field such as `cockpit_reviewed=true`. | One explicit sandbox/test task/card ID. | Restore prior value or add compensating metadata note. |

Initial M011 live smoke should prefer `writeback.task_comment` because it is low risk and auditable.

### Worker dispatch operations

| Operation type | Description | Apply target | Cleanup/stop |
|---|---|---|---|
| `dispatch.worker_dry_run` | Show exactly what would spawn and why. | One explicit task + profile. | N/A, mutates nothing. |
| `dispatch.worker_start` | Spawn one bounded worker through an allowlisted profile/path. | One explicit task + profile. | Capture process/session ID and stop command. |
| `dispatch.worker_stop` | Stop a specific worker/session if still running. | One explicit worker/process/session ID. | Evidence must show stopped/not-running state. |

Dispatch constraints:

- Profiles must be allowlisted before apply.
- Dry-run must check spawnability before apply.
- Worker output is captured as bounded summary/evidence, not raw full logs.
- Worker completion is not GSD task completion unless a separate approved write-back operation records it.
- Windows/GPC Claude/GSD workers must use non-interactive-safe commands (`claude -p`, `claude --bg`, logs/stop/attach, GSD JSON commands) rather than assuming non-interactive TUI features.

### Watcher operations

| Operation type | Description | Apply target | Stop/remove |
|---|---|---|---|
| `watcher.baseline` | Initialize watermark from current source without replaying old items. | One named watcher. | `watcher.remove` deletes/preserves state according to payload. |
| `watcher.poll_once` | Poll source once and emit only new items. | One named watcher. | N/A for one-shot; state updated by watermark. |
| `watcher.start` | Start a bounded recurring watcher job. | One named watcher + schedule. | Must include pause/remove command. |
| `watcher.pause` | Pause recurring watcher. | One watcher/job ID. | Evidence must show disabled state. |
| `watcher.remove` | Remove recurring watcher and optionally state. | One watcher/job ID. | Evidence must show job removed or disabled. |

Watcher constraints:

- First run baselines and emits nothing unless explicitly marked as `replay_allowed=false` and `prime_latest_count` is approved.
- No-change run must print nothing / emit no user-facing notification.
- Change run emits one concise update per new item or a bounded summary.
- Watermark state must be named, bounded, and stored under target evidence/state directories.
- Watcher output must not mention or ping other agents unless Joe explicitly requests coordination.

## Forbidden operations

These are rejected in both dry-run and apply modes:

- Mutating arbitrary GSD/Kanban rows from transcript prose.
- Completing a GSD task because an assistant response ended.
- Starting broad autonomous dispatch over all ready tasks.
- Spawning non-allowlisted profiles or unknown workers.
- Starting durable watchers without a stop/remove path.
- Writing generated evidence into live Hermes runtime directories.
- Writing output/evidence over the source input or over each other.
- Emitting raw session transcript bodies, raw tool arguments, raw tool result JSON, `.env`, config secrets, or raw SQLite message contents.
- Posting recursive agent handoffs or public-channel loops.

## Dry-run and approval flow

Every write-back, dispatch, or watcher-start operation follows this state machine:

1. `requested` — operation JSON accepted for schema validation.
2. `dry_run_passed` or `rejected` — adapter validates target, allowlist, payload, and non-mutation behavior.
3. `approval_required` or `approval_not_required` — high-risk operations require Joe approval.
4. `approved` or `denied` — only explicit approval can move a gated operation to apply.
5. `applied`, `blocked`, or `failed` — apply attempt result.
6. `verified` — before/after and smoke evidence checked.
7. `rollback_recorded` or `stop_recorded` where applicable.

A dry-run preview must include:

```json
{
  "operation_id": "op_m011_example_001",
  "would_mutate": true,
  "target_resolved": true,
  "target_summary": "M011/S02/T-smoke comment append",
  "approval_required": true,
  "apply_command": "not executable from preview",
  "rollback_note": "Add compensating comment or restore previous status.",
  "rejection_reasons": []
}
```

## Evidence schema

All adapters write evidence JSON using `hermes-cockpit.automation-evidence.v1`:

```json
{
  "schema_version": "hermes-cockpit.automation-evidence.v1",
  "operation_id": "op_m011_example_001",
  "operation_type": "writeback.task_comment",
  "mode": "dry-run",
  "status": "dry_run_passed",
  "read_only_dry_run": true,
  "target": {"system": "gsd", "id": "M011/S02/T-smoke"},
  "before": {"signature": "..."},
  "after": {"signature": "..."},
  "source_mutated": false,
  "target_mutated": false,
  "redaction_count": 0,
  "dropped_count": 0,
  "rollback_note": "...",
  "stop_or_remove_command": null,
  "events_emitted": []
}
```

Required evidence fields:

- `schema_version`
- `operation_id`
- `operation_type`
- `mode`
- `status`
- `target`
- `before`
- `after`
- `source_mutated`
- `target_mutated`
- `redaction_count`
- `dropped_count`
- `rollback_note` or `stop_or_remove_command` where applicable
- `events_emitted`

## Cockpit event mapping

Automation operations produce `hermes-cockpit.event.v1` rows using new event types:

| Event type | Meaning |
|---|---|
| `writeback_requested` | Valid typed write-back operation observed. |
| `writeback_rejected` | Operation rejected before mutation. |
| `writeback_dry_run_passed` | Dry-run preview passed and mutated nothing. |
| `writeback_applied` | Approved bounded mutation applied. |
| `writeback_verified` | Before/after and rollback evidence recorded. |
| `dispatch_requested` | Valid dispatch operation observed. |
| `dispatch_rejected` | Dispatch rejected before spawning. |
| `dispatch_started` | One bounded worker spawned. |
| `dispatch_completed` | Worker ended and output summary captured. |
| `dispatch_stopped` | Worker/session stopped or confirmed not running. |
| `watcher_baselined` | Watcher watermark initialized silently. |
| `watcher_change_observed` | Watcher detected new bounded item(s). |
| `watcher_no_change` | Internal event only; should not notify Joe by default. |
| `watcher_removed` | Watcher paused/removed with evidence. |

Trust defaults:

- Dry-run events are `trust.status=unverified` until evidence validates target signatures.
- Applied write-back events are `trust.status=verified` only when before/after evidence and rollback notes exist.
- Dispatch completion is not task completion.
- Watcher observed changes are observations, not approvals.

## Rollback and stop requirements

Write-back rollback evidence must include one of:

- prior value + restore instruction,
- compensating comment/note instruction,
- explicit statement that operation is append-only and cannot be deleted automatically.

Worker dispatch stop evidence must include:

- process/session/job ID if available,
- stop command or status query command,
- final stopped/not-running proof.

Watcher stop/remove evidence must include:

- watcher/job ID,
- pause/remove command,
- watermark state path,
- whether state was preserved or removed,
- verification that no future scheduled tick remains active.

## M011 first-live-smoke recommendation

Preferred first live smoke sequence:

1. Dry-run `writeback.task_comment` against a sandbox/test task/card.
2. Apply the comment only after dry-run evidence passes.
3. Project `writeback_*` events into Cockpit.
4. Dispatch one bounded worker to produce a harmless summary artifact; do not auto-complete the task.
5. Baseline a file-backed watcher, add one synthetic safe item, poll once, verify one output, poll again, verify silence.
6. Record final dogfood summary and decision.

## Requirement coverage

- R013: gated write-back with dry-run, allowlisted targets, before/after signatures, audit evidence, rollback/remediation.
- R014: bounded worker dispatch with spawnability dry-run, profile allowlist, output capture, stop/cleanup, no public agent-loop behavior.
- R015: watcher watermark deduplication, silent no-change behavior, bounded output, loop prevention, and pause/remove procedures.

## Acceptance rule

M011 can close only when write-back, dispatch, and watcher evidence all pass. If any lane is unsafe, the milestone must close with a PIVOT/KILL decision for that lane rather than silently leaving it half-working.
