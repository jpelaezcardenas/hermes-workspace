# M019 Claude BG Lifecycle Manual Smoke

This runbook is optional and operator-approved only. Automated tests and CI must continue to use fake Claude binaries.

## Preconditions

- Operator explicitly approves spending a real Claude Code background session.
- `claude` CLI is installed and authenticated on the selected host.
- Repo path is correct for the target host.
- Write-capable sessions use an isolated worktree and do not auto-commit or push.
- Migi remains verifier/source-of-truth updater; GSD remains execution truth.

## Non-claims

- No production readiness claim.
- No TUI-triggered lifecycle controls.
- No hidden `claude -p` path.
- No Agent SDK or stream-json wrapper laundering.
- No auto-commit or push.
- No GSD/Kanban/Hermes mutation by the runner.

## Prepare a read-only launch request

```bash
mkdir -p target/hermes-cockpit-m019/manual
cat > target/hermes-cockpit-m019/manual/launch-request.json <<'JSON'
{
  "operation_id": "manual-claude-bg-smoke",
  "display_name": "Manual Claude BG smoke",
  "task": "Say hello, inspect no files, and exit when done.",
  "host": "pi-or-gpc",
  "repo_path": "/home/joe/hermes-workspace",
  "worktree_path": null,
  "permission_mode": "read_only"
}
JSON
```

## Dry-run and grant

```bash
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch \
  --request target/hermes-cockpit-m019/manual/launch-request.json \
  --registry target/hermes-cockpit-m019/manual/registry.json \
  --evidence target/hermes-cockpit-m019/manual/launch-dry-run.json

python3 scripts/hermes-cockpit-claude-bg-lifecycle.py grant-launch \
  --evidence target/hermes-cockpit-m019/manual/launch-dry-run.json \
  --grant target/hermes-cockpit-m019/manual/launch-grant.json \
  --decider joe \
  --ttl-seconds 300
```

Inspect the dry-run evidence before apply. If it is not acceptable, stop here.

## Apply launch with real Claude

Only after operator approval:

```bash
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py apply-launch \
  --evidence target/hermes-cockpit-m019/manual/launch-dry-run.json \
  --grant target/hermes-cockpit-m019/manual/launch-grant.json \
  --registry target/hermes-cockpit-m019/manual/registry.json \
  --result target/hermes-cockpit-m019/manual/launch-result.json \
  --claude-bin claude
```

Then project logs for Cockpit review:

```bash
python3 scripts/hermes-cockpit-claude-sessions.py \
  --registry target/hermes-cockpit-m019/manual/registry.json \
  --output target/hermes-cockpit-m019/manual/projection.json \
  --claude-bin claude \
  --max-preview-chars 240
```

## Stop session

Extract the session id from `launch-result.json`, then:

```bash
SESSION_ID=bg_replace_me

python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-stop \
  --session-id "$SESSION_ID" \
  --registry target/hermes-cockpit-m019/manual/registry.json \
  --evidence target/hermes-cockpit-m019/manual/stop-dry-run.json

python3 scripts/hermes-cockpit-claude-bg-lifecycle.py grant-stop \
  --evidence target/hermes-cockpit-m019/manual/stop-dry-run.json \
  --grant target/hermes-cockpit-m019/manual/stop-grant.json \
  --decider joe \
  --ttl-seconds 300

python3 scripts/hermes-cockpit-claude-bg-lifecycle.py apply-stop \
  --evidence target/hermes-cockpit-m019/manual/stop-dry-run.json \
  --grant target/hermes-cockpit-m019/manual/stop-grant.json \
  --registry target/hermes-cockpit-m019/manual/registry.json \
  --result target/hermes-cockpit-m019/manual/stop-result.json \
  --claude-bin claude
```

## Evidence to preserve

- launch request
- launch dry-run evidence
- launch grant
- launch result
- registry
- projection
- stop dry-run evidence
- stop grant
- stop result

If anything fails, preserve stderr and do not mark the GSD task complete without verifier review.
