# M015 Approval Queue and Evidence Ledger Contract

Schema: `hermes-cockpit.approval-queue.v1`
Contract: `m015.s01.approval-queue.v1`

## Purpose

M015/S01 defines a reviewable approval queue and evidence ledger contract for one bounded operation only:

```text
cockpit.audit_note_append
```

The operation is artifact-only and may target only paths under:

```text
target/hermes-cockpit-m015/
```

This slice proves the contract shape and validator only. It does not implement Cockpit TUI apply, GSD/Kanban/Hermes mutation, worker dispatch, durable watchers, cron scheduling, Discord delivery, direct database edits, or production readiness.

## Required records

### Queue entry

A queue entry records the proposed action before any apply path exists. Required concepts:

- `schema_version = hermes-cockpit.approval-queue.v1`
- `contract_id = m015.s01.approval-queue.v1`
- `queue_id`, `operation_id`, and `operation_type`
- `state` from the explicit M015 queue state set (`drafted`, `dry_run_required`, `dry_run_passed`, `approval_pending`, `approved`, `denied`, `rejected`, `apply_blocked`, `applied`, `verified`, `compensation_recorded`)
- requester `actor` and `source`; actor identity is not approval proof
- explicit artifact `target` with `system`, `id`, `path`, `root`, and `scope`
- bounded redacted `payload` and canonical `payload_hash`
- `bounds` proving `target_root`, byte/char caps, append-only policy, `max_operation_count = 1`, and `artifact_only = true`
- `dry_run` reference with evidence path/hash/expiry after a successful dry run
- `approval` status, initially pending unless a separate manual approval grant exists
- `apply_guard` exact-match fields for later S03 manual runner use
- `audit` non-claims and ledger path
- machine-readable `no_go` reasons when rejected

### Dry-run evidence

A dry-run evidence record is hash-bound by `evidence_hash` and must include:

- the same schema, contract, queue, operation, and target basics as the queue entry;
- `status = dry_run_passed`;
- `created_at` and `expires_at` for stale evidence checks;
- the exact `payload_hash`;
- `target_signature_before` and expected append-only delta;
- `source_mutated = false` and `target_mutated = false`;
- redaction/drop counts and safety non-claims.

### Approval grant

A manual approval grant is separate from actor identity. It must include:

- `status = granted`;
- an approval-authoritative `decider`;
- `decided_at`, `expires_at`, and optional `revoked_at`;
- exact `dry_run_evidence_hash`, `payload_hash`, target, and `target_signature_before` matches.

The grant is invalid if it predates dry-run evidence, is expired, is revoked, or is not bound to the exact dry-run evidence hash.

### Ledger row

A ledger row records approval queue history without applying the operation. The S01 success fixture uses `event_type = approval_granted` and must include:

- same schema, contract, queue, operation, target, payload hash, and target signature basics;
- `dry_run_evidence_hash`;
- approval id/status references;
- `source_mutated = false`, `target_mutated = false`, and `direct_db_edit = false`;
- `row_hash` over the canonical row with `row_hash` removed.

### No-go record

A no-go record preserves rejected proposals with machine-readable reasons. It is hash-bound by `record_hash` and must include:

- `status = rejected`;
- one or more `rejection_reasons`;
- one or more machine-readable `no_go` keys;
- `source_mutated = false`, `target_mutated = false`, and `direct_db_edit = false`;
- the same safety non-claims as accepted records.

## Hard rejection rules

The validator rejects:

- unsupported operations such as `writeback.task_comment`, `dispatch.worker_start`, `watcher.start`, or unknown verbs;
- path traversal, absolute paths, glob/broad selectors, and unsafe roots outside `target/hermes-cockpit-m015/`;
- secret-like payload or approval content;
- broad mutation, including non-append-only actions or `max_operation_count` other than `1`;
- direct GSD targets (`.gsd`, `gsd.db`, or target system `gsd`);
- direct Kanban targets (target system `kanban`);
- direct Hermes targets (`.hermes` or target system `hermes`);
- stale dry-run evidence or expired approvals;
- mismatched evidence/payload/target basics across queue entry, dry-run evidence, approval grant, and ledger row;
- ledger/no-go hash mismatches.

## Safety non-claims

Every accepted fixture and no-go record carries these non-claims:

- no GSD/Kanban/Hermes mutation;
- no direct DB edit;
- no worker dispatch;
- no watcher install and no durable watcher;
- no cron schedule;
- no Discord call;
- artifact-only under `target/hermes-cockpit-m015/`;
- no production readiness claim.

S01 is contract and evidence only. Later slices may render this queue or add a manual runner, but S01 does not grant TUI apply authority and does not mutate source-of-truth systems.
