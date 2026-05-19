# Claude BG Lifecycle Request Surface

## Purpose

M020 adds a Ratatui Cockpit surface for Claude BG lifecycle request/evidence state. It is a display/request surface only: the TUI shows what the operator should inspect or run, but it does not launch, stop, attach, or apply anything.

This builds on M019's manual CLI runner:

```bash
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch ...
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py grant-launch ...
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py apply-launch ...
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-stop ...
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py grant-stop ...
python3 scripts/hermes-cockpit-claude-bg-lifecycle.py apply-stop ...
```

## Projection field

The TUI reads a new projection field:

```text
claude_lifecycle_requests
```

Each row should include:

- `id`: stable request id for display.
- `operation_id`: M019 lifecycle operation id.
- `action`: `launch` or `stop`.
- `status`: e.g. `drafted`, `dry_run_passed`, `approval_pending`, `granted`, `applied`, `blocked`.
- `display_name`: operator-facing name.
- `session_id`: optional, required for stop rows after a session exists.
- `registry_path`: target M018/M019 registry path.
- `request_path`: optional launch request file.
- `evidence_path`: dry-run evidence path.
- `grant_path`: approval grant path.
- `result_path`: apply result path.
- `next_cli_command`: the exact external CLI command the operator should run next.
- `updated_at`: projection/update timestamp.
- `safety_labels`: optional labels such as `fake-only`, `manual`, `no-tui-apply`.

## Required TUI labels

The surface must visibly include:

- `Claude lifecycle`
- `REQUEST ONLY`
- `DISPLAY ONLY`
- `CLI required`
- `No TUI apply`
- `Migi verifies; GSD is truth`

Rows should show action, status, operation id, request/session id, evidence/grant/result basenames, registry path, and next CLI command.

## Source key

M020 uses a new projection source:

```text
7 claude-lifecycle -> target/hermes-cockpit-m020/claude-lifecycle-projection.json
```

When adding this source, update Rust catalog/key handling/help text, `docs/hermes-cockpit/projection-sources.json`, POSIX launcher, PowerShell launcher, and static tests together.

## Safety rules

- No TUI-triggered launch, stop, attach, or apply.
- No real Claude invocation in automated tests.
- No hidden `claude -p` default path.
- No auto-commit or push.
- No GSD/Kanban/Hermes mutation from this surface.
- The TUI may show CLI guidance but actual apply remains outside the TUI through the M019 runner.

## Non-claims

M020 does not make the Claude lifecycle lane production-ready, does not embed a PTY, does not add tmux control, and does not authorize direct TUI lifecycle execution.
