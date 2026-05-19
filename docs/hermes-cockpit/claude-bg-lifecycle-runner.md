# Claude BG Lifecycle Runner

## Purpose

M019 adds a manual, evidence-gated CLI runner for official Claude Code background sessions. It connects the M018 read-only `claude-sessions` projection to an operator-approved lifecycle loop:

```text
prepare evidence -> grant approval -> apply official Claude command -> update registry -> Cockpit projects state
```

This is not a hidden Claude API wrapper. The supported launch command is the official Claude Code background path:

```bash
claude --bg "task"
```

The supported stop command is:

```bash
claude stop <session_id>
```

`claude -p` remains fallback-only for bounded one-shots and is not a default or dependency of this runner.

## Supported actions

- `prepare-launch`: validate launch request and write dry-run evidence without invoking Claude.
- `grant-launch`: write an approval grant bound to the dry-run evidence hash, operation id, and expiry.
- `apply-launch`: re-check the grant and evidence, invoke `claude --bg <task>` through an argv list, parse the returned background session id, and append a registry entry compatible with M018.
- `prepare-stop`: validate a known session and write dry-run evidence without invoking Claude.
- `grant-stop`: write an approval grant bound to stop dry-run evidence.
- `apply-stop`: re-check the grant and evidence, invoke `claude stop <session_id>` through an argv list, and mark the registry session stopped.

## Evidence and approval binding

Apply is allowed only when all of these match:

- operation id
- action (`launch` or `stop`)
- registry path
- target session id for stop operations
- dry-run evidence hash
- grant status `granted`
- grant creation time after the dry-run evidence exists
- grant not expired
- grant not previously consumed

Every apply writes an apply result and marks the grant consumed so replay attempts fail.

## Registry compatibility

The runner writes the M018 registry schema:

```text
hermes-cockpit.claude-session-registry.v1
```

Each launched session entry includes:

- `id`
- `display_name`
- `kind: ClaudeBackground`
- `status`
- `host`
- `repo_path`
- `worktree_path`
- `permission_mode`
- `command`
- `started_at`
- optional `log_path`

Write-capable sessions (`accept_edits` or `bypass_permissions`) require explicit `worktree_path` metadata. Read-only sessions may omit it.

## Safety rules

- Fake Claude only in automated tests.
- No real Claude quota/session use unless an operator runs the optional manual smoke.
- No default `claude -p` path.
- No Agent SDK or stream-json wrapper laundering.
- No silent commit or push.
- No TUI-triggered lifecycle controls in M019.
- No GSD/Kanban/Hermes source-of-truth mutation by the runner.
- Migi remains verifier/source-of-truth updater; GSD remains execution truth.

## No-go conditions

The runner must reject:

- `claude -p` or programmatic print mode as the launch command.
- unsupported action names.
- missing or invalid dry-run evidence.
- missing, denied, expired, stale, or replayed grants.
- registry/output path collisions.
- write-capable sessions without worktree metadata.
- stop requests for unknown sessions.
- broad source-of-truth mutation claims.
- task text containing obvious token/password/api_key/secret material.

## Phasing

1. S01: contract and RED tests.
2. S02: gated launch and registry append.
3. S03: gated stop and no-go behavior.
4. S04: integrated fake lifecycle smoke, projection smoke, and closeout.

## Non-claims

M019 does not add production readiness, live TUI control, hidden print-mode automation, auto-commit/push, or undocumented Claude session discovery.
