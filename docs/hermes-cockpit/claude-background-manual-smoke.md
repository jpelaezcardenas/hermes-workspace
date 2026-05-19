# Claude Background Manual Smoke Runbook

## Purpose

This runbook verifies the M016 Claude background lane against a real official Claude Code background session **only when Joe or the operator explicitly approves spending/using a live Claude Code session**.

Automated M016 verification uses fake Claude fixtures. This runbook is for the later human/operator check.

## Safety posture

- This is **not** a production-readiness claim.
- This is **not** a hidden `claude -p` or Agent SDK path.
- Do not use `claude -p` for this smoke.
- Do not commit, push, or mutate GSD/Kanban/Hermes source-of-truth from the Claude session.
- Prefer a clean throwaway worktree for write-capable tests.
- Use a harmless read-only prompt first.
- Migi remains verifier; GSD remains execution truth.
- Record session ID, command, repo/worktree, permission mode, start time, logs, stop/attach evidence, and verification commands.

## Prerequisites

1. Confirm the host has official Claude Code CLI available:

   ```bash
   claude --version
   ```

2. Confirm repo path and worktree policy:

   ```bash
   pwd
   git status --short
   ```

3. If testing write-capable behavior, create/use an isolated worktree first. Do not test writes directly in the canonical repo unless Joe explicitly approves.

## Read-only background smoke

Run from the repo/worktree being supervised:

```bash
claude --bg "Read-only smoke: summarize the project name and current directory in one sentence. Do not edit files, do not run commands, do not commit, and do not push."
```

Capture the returned session ID exactly as printed by Claude Code:

```bash
SESSION_ID="<paste-session-id>"
```

Check logs:

```bash
claude logs "$SESSION_ID"
```

Expected evidence:

- The session ID is visible.
- Logs are retrievable with `claude logs <session_id>`.
- The task remains harmless/read-only.
- Any prompt/trust/permission question is visible and not blindly answered.

## Stop smoke

If the session is still running, stop it explicitly:

```bash
claude stop "$SESSION_ID"
```

Then verify logs/status again:

```bash
claude logs "$SESSION_ID"
```

Expected evidence:

- Stop command returns cleanly or reports already stopped.
- Logs remain inspectable.

## Attach guidance smoke

The cockpit should show this exact manual attach guidance for the selected session:

```bash
claude attach "$SESSION_ID"
```

For M016, attach is guidance only. Do not require embedded attach inside the Ratatui UI. Do not send follow-up prompts from the TUI in this milestone.

## Projection evidence to capture

A future live projection row should include at least:

```json
{
  "id": "<session-id>",
  "display_name": "Claude smoke",
  "kind": "ClaudeBackground",
  "status": "running|waiting|done|stopped|errored",
  "host": "<host>",
  "repo_path": "<repo>",
  "worktree_path": "<worktree-or-null>",
  "permission_mode": "read_only|accept_edits|bypass_permissions",
  "command": "claude --bg ...",
  "started_at": "<utc timestamp>",
  "last_output_preview": "<short redacted log preview>",
  "log_path": "<optional local artifact path>"
}
```

## Pass criteria

- `claude --bg` starts a real official background session.
- `claude logs <session_id>` returns inspectable logs.
- `claude stop <session_id>` stops or cleanly reports stopped.
- `claude attach <session_id>` is shown as manual guidance.
- No `claude -p` is used.
- No auto-commit, push, GSD/Kanban/Hermes mutation, or Discord agent-ping loop occurs.
- Migi records external verification separately from Claude's self-report.

## Fail/stop criteria

Stop and do not proceed if:

- Claude asks for trust/permissions and the prompt is not visible to Joe/Migi.
- The session attempts writes outside the approved worktree.
- The session attempts commit/push without explicit approval.
- Logs contain secrets or credentials; redact before storing evidence.
- The CLI behavior differs from the expected `--bg`, `logs`, `stop`, or `attach` interface.
