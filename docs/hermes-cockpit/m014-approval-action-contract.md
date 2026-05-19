# M014 Approval Action Contract

Schema: `hermes-cockpit.approval-action.v1`

## Purpose

M014 introduces the first Cockpit approval-gated action pilot while preserving the safety boundary established by M013. This contract is intentionally narrower than the M011/M012 writeback, dispatch, and watcher lanes.

## Allowed pilot operation

Only one operation is supported for the first pilot:

```text
cockpit.audit_note_append
```

The operation may dry-run an append-only audit note under:

```text
target/hermes-cockpit-m014/
```

The initial S01 contract/validator **does not implement apply**. Apply remains blocked until WF3 adds exact dry-run evidence, approval, payload, and target matching.

## Required envelope fields

- `schema_version`: exactly `hermes-cockpit.approval-action.v1`
- `contract_id`: `m014.s01.approval-action.v1`
- `operation_id`: stable single operation id
- `operation_type`: exactly `cockpit.audit_note_append`
- `mode`: `dry-run` or `apply`
- `requested_at`: UTC ISO timestamp
- `actor`: requester identity; not approval proof
- `source`: `cockpit`, `operator`, or bounded forum handoff
- `target`: explicit artifact target with `system`, `id`, `path`, and `scope`
- `payload`: bounded note payload, no raw transcript/tool bodies
- `payload_hash`: SHA-256 over canonical redacted payload
- `bounds`: target root, byte/char caps, append-only policy, and max operation count
- `dry_run`: evidence/signature details after dry-run
- `approval`: required approval record; raw tokens are forbidden
- `apply_guard`: reserved for WF3 matching fields
- `audit`: evidence/result paths, non-claims, and compensation note
- `no_go`: machine-readable hard-stop reasons

## No-go boundaries

The validator rejects:

- `writeback.task_comment`, `dispatch.worker_start`, `watcher.start`, and unknown verbs;
- GSD, Kanban, or Hermes mutation;
- direct DB edits and `.gsd/gsd.db` targets;
- `.hermes` runtime paths;
- path traversal, absolute paths, glob/broad targets, and target roots outside `target/hermes-cockpit-m014/`;
- secret-like payloads;
- payload hash mismatches;
- apply mode during S01.

## Dry-run semantics

Dry-run writes evidence only. It must not change the pilot target file.

Dry-run evidence records:

- `status = dry_run_passed`
- target before signature
- expected append byte count
- expected row hash
- payload hash
- non-claims
- `source_mutated = false`
- `target_mutated = false`

## Non-claims

M014/S01 does **not** claim:

- production readiness;
- source-of-truth updates;
- GSD/Kanban/Hermes mutation;
- worker dispatch;
- watcher installation;
- broad Cockpit write/apply authority.
