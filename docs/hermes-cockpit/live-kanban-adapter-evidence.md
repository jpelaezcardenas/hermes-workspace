# Live Kanban Adapter Non-Mutation Evidence

**Milestone:** M008
**Slice/Task:** S02/T02
**Date:** 2026-05-17
**Board:** `hermes-cockpit-trial`

## Purpose

Prove that `scripts/hermes-cockpit-kanban-project.py` is a **non-mutating**, read-only adapter. The adapter may read live Kanban state and write a local projection JSON file, but it must not move cards, change status, assign workers, comment, complete, block, or otherwise mutate the board.

## Commands

```bash
mkdir -p /tmp/hermes-cockpit-m008
BEFORE=/tmp/hermes-cockpit-m008/kanban-before.json
AFTER=/tmp/hermes-cockpit-m008/kanban-after.json
PROJ=/tmp/hermes-cockpit-m008/kanban-projection.json

hermes kanban --board hermes-cockpit-trial list --json > "$BEFORE"
python3 scripts/hermes-cockpit-kanban-project.py \
  --board hermes-cockpit-trial \
  --output "$PROJ"
hermes kanban --board hermes-cockpit-trial list --json > "$AFTER"
```

Then a Python comparison checked the stable board signature:

```python
def signature(rows):
    return sorted((r.get('id'), r.get('status'), r.get('assignee'), r.get('title')) for r in rows)

assert signature(before) == signature(after)
assert projection["source"]["mode"] == "read-only"
```

## Result

```json
{
  "before_count": 5,
  "after_count": 5,
  "same_task_status_assignee_title": true,
  "projection_card_count": 5,
  "projection_mode": "read-only",
  "projection_board": "hermes-cockpit-trial",
  "projection_keys": [
    "active_runs",
    "approvals",
    "artifacts",
    "cards",
    "completed_runs",
    "event_count",
    "generated_at",
    "projection_version",
    "replay",
    "schema_version",
    "source",
    "source_file",
    "warnings"
  ]
}
```

## Evidence Conclusion

The adapter is **non-mutating** for this run:

- Before and after board task counts matched.
- Before and after task ID/status/assignee/title signatures matched.
- Projection output reported `source.mode = "read-only"`.
- Projection JSON included the expected Cockpit projection keys.

## Limitations

This proves the adapter did not mutate the board through the tested command path. It does not yet prove future code paths remain safe; keep TDD/regression coverage around read-only command behavior before adding features.
