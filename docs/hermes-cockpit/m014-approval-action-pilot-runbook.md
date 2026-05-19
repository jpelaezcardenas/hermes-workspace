# M014 Approval Action Pilot Verification Runbook

This runbook prepares the M014/S04 verification lane for the approval-action pilot. It is runner/runbook prep only: it does not claim final closeout, does not perform GSD updates, and does not post to Discord.

## Scope

- Pilot operation: `cockpit.audit_note_append`.
- Contract: `docs/hermes-cockpit/m014-approval-action-contract.md`.
- Runner: `scripts/hermes-cockpit-approval-action.py`.
- Fixture: `tests/fixtures/hermes_cockpit/approval-action/approval-pilot-ops.jsonl`.
- Test module: `tests/hermes_cockpit/test_approval_contract.py`.
- The pilot is bounded to an artifact-only target under `target/hermes-cockpit-m014/`.

## Safety rules

- dry-run writes evidence only; it must not mutate `target/hermes-cockpit-m014/pilot-audit-log.jsonl`.
- Apply remains blocked unless WF3 evidence/approval matching is present and exact: schema, operation, payload hash, dry-run evidence hash, target signature, and approval must match.
- The S04 runner/runbook lane records expected closeout gates; it does not require S02/S03 final evidence during static prep.
- This lane does not claim production readiness.
- This lane does not mutate GSD, Kanban, or Hermes source-of-truth state.
- This lane does not dispatch workers, install watchers, schedule cron, edit `.gsd/gsd.db`, or write `.hermes` runtime state.

## Pi verification commands

From the Pi/Hermes workspace:

```bash
cd /home/joe/hermes-workspace
mkdir -p target/hermes-cockpit-m014/approval-action-evidence

python3 -m unittest tests.hermes_cockpit.test_approval_contract -v \
  > target/hermes-cockpit-m014/pi-approval-contract.stdout \
  2> target/hermes-cockpit-m014/pi-approval-contract.stderr

python3 scripts/hermes-cockpit-approval-action.py --dry-run \
  --operations tests/fixtures/hermes_cockpit/approval-action/approval-pilot-ops.jsonl \
  --repo-root /home/joe/hermes-workspace \
  --evidence-dir target/hermes-cockpit-m014/approval-action-evidence \
  --output target/hermes-cockpit-m014/approval-action-dry-run-summary.json \
  > target/hermes-cockpit-m014/pi-approval-action-dry-run.stdout \
  2> target/hermes-cockpit-m014/pi-approval-action-dry-run.stderr

bash scripts/hermes-cockpit-verify.sh \
  > target/hermes-cockpit-m014/pi-verify.stdout \
  2> target/hermes-cockpit-m014/pi-verify.stderr
```

Pi outputs to review:

- `target/hermes-cockpit-m014/approval-action-evidence/` — dry-run evidence records.
- `target/hermes-cockpit-m014/approval-action-dry-run-summary.json` — compact approval-action dry-run summary.
- `target/hermes-cockpit-m014/pi-verify.stdout` and `target/hermes-cockpit-m014/pi-verify.stderr` — full verifier capture for later closeout review.

## Windows/GPC verification commands

From the Windows/GPC mirror:

```powershell
cd D:\projects\hermes-workspace-m011-win
mkdir .\target\hermes-cockpit-m014 -Force

powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\hermes-cockpit-windows-smoke.ps1 `
  -SourceRoot "\\TOWER\The Goods\Serena-Projects\hermes-workspace" `
  -MirrorRoot D:\projects\hermes-workspace-m011-win `
  > .\target\hermes-cockpit-m014\windows-verify.stdout `
  2> .\target\hermes-cockpit-m014\windows-verify.stderr
```

Windows outputs to review:

- `target\hermes-cockpit-m014\windows-verify-summary.json` — M014-scoped Windows verification summary.
- `target\hermes-cockpit-m014\windows-verify.stdout` and `target\hermes-cockpit-m014\windows-verify.stderr` — runner capture if redirected as above.
- `target\hermes-cockpit-m012\windows-verify-summary.json` — compatibility pointer for existing M012/M013 consumers; M014 closeout should use the M014 path above.

## Expected closeout gates

These expected closeout gates may be missing while S02/S03 are still running. Missing files are blockers for final closeout, not blockers for this static runner/runbook prep lane.

- `target/hermes-cockpit-m014/approval-surface-smoke-summary.json` — S02 operator/TUI approval-surface smoke summary.
- `target/hermes-cockpit-m014/safe-executor-pilot-smoke-summary.json` — S03 safe executor pilot smoke summary.
- `target/hermes-cockpit-m014/approval-action-evidence/op_m014_audit_note_001-dry-run.json` — dry-run evidence produced from the approval-action fixture.
- `target/hermes-cockpit-m014/apply-blocked-smoke-summary.json` — negative apply-blocked evidence if real apply is deferred.

## Non-claims

- This runbook does not claim final M014 closeout.
- This runbook does not claim production readiness.
- This runbook does not grant broad Cockpit write/apply authority.
- This runbook does not mutate GSD, Kanban, or Hermes.
- This runbook does not make Windows/GPC canonical; Pi remains the canonical Hermes workspace/runtime authority.
- This runbook does not authorize direct database edits, worker dispatch, watcher installation, public loops, cron schedules, or `.hermes` runtime writes.
