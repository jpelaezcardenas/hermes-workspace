# M026 Real Claude tmux Dogfood Evidence

Generated: 2026-05-19T12:28:26Z

## Verdict

Pass. Hermes Cockpit's M025/M026 Claude tmux lane was dogfooded with the official interactive Claude Code CLI inside tmux, under explicit operator approval, and then stopped with an external tmux cleanup check.

## What was proven

- Official interactive `claude` was launched inside tmux with `tmux new-session ... 'cd /home/joe/hermes-workspace && claude'`.
- The lane did not use `claude -p`.
- The first-run Claude workspace trust prompt remained visible in tmux capture evidence.
- A read-only prompt was executed and the marker `M026_TMUX_READONLY_SMOKE_READY` was observed.
- The tmux session `claude-m026-tmux-dogfood` was stopped through the adapter.
- External cleanup verification confirmed the tmux session was gone.
- Cockpit display-only session projection now surfaces operation id, capture/send/stop timestamps, safety labels, and marker preview for the tmux lane.
- The read-only `claude-sessions` projection source path now accepts finalized/stopped tmux registry evidence using cached preview text, without trying to capture a dead pane or calling `claude logs`.
- `scripts/hermes-cockpit-refresh-claude-sessions.py` now refreshes source `6 claude-sessions` on demand or bounded interval, while remaining display-only/read-only and delegating projection building to the existing safe adapter.
- Cockpit redacts account/email-like tokens from raw Claude preview text before rendering.
- CI-safe fake-tmux/fake-Claude tests still pass.
- Cockpit Rust tests still pass.
- Cockpit source `6 claude-sessions` has now been dogfooded through both deterministic smoke render and a real tmux TUI session; default-width operator view keeps refresh timestamp/session count, stopped tmux state, marker, and display-only guardrail visible.

## Evidence artifacts

Real dogfood artifacts:

- `target/hermes-cockpit-m026-real-tmux-dogfood/request.json`
- `target/hermes-cockpit-m026-real-tmux-dogfood/start-evidence.json`
- `target/hermes-cockpit-m026-real-tmux-dogfood/start-grant.json`
- `target/hermes-cockpit-m026-real-tmux-dogfood/start-result.json`
- `target/hermes-cockpit-m026-real-tmux-dogfood/capture-01.json` — workspace trust prompt visible
- `target/hermes-cockpit-m026-real-tmux-dogfood/capture-04-after-enter.json` — marker observed
- `target/hermes-cockpit-m026-real-tmux-dogfood/stop-result.json`
- `target/hermes-cockpit-m026-real-tmux-dogfood/summary.json`

Verification pass artifacts:

- `target/hermes-cockpit-m026-verification/verification-summary.json`
- `target/hermes-cockpit-m026-verification/operator-ux-closeout.json`
- `target/hermes-cockpit-m026-verification/tmux-source-closeout.json`
- `target/hermes-cockpit-m026-verification/refresh-runner-closeout.json`
- `target/hermes-cockpit-m026-verification/claude-sessions-refresh-summary.json`
- `target/hermes-cockpit-m026-verification/source6-dogfood-summary.json`
- `target/hermes-cockpit-m026-verification/source6_cockpit_smoke.txt`
- `target/hermes-cockpit-m026-verification/source6-tmux-dogfood-summary.json`
- `target/hermes-cockpit-m026-verification/source6_tmux_capture.txt`
- `target/hermes-cockpit-m026-verification/formal-closeout-review.json` — formal closeout review, `status: pass`
- `target/hermes-cockpit-m026-verification/formal_closeout_regression.stdout`
- `target/hermes-cockpit-m026-verification/formal_closeout_regression.stderr`
- `target/hermes-cockpit-m018/claude-sessions-projection.json` — read-only Cockpit source-6 projection generated from stopped real tmux registry evidence
- `target/hermes-cockpit-m026-verification/python_claude_sessions_projection.stdout`
- `target/hermes-cockpit-m026-verification/claude_sessions_refresh_red.stdout` — expected RED for missing refresh runner
- `target/hermes-cockpit-m026-verification/claude_sessions_refresh_green.stdout` — focused GREEN for on-demand and bounded watch refresh behavior
- `target/hermes-cockpit-m026-verification/real_tmux_operator_ux_red.stdout` — expected RED for missing operator evidence/redaction behavior
- `target/hermes-cockpit-m026-verification/real_tmux_operator_ux_green.stdout` — focused GREEN for operator evidence/redaction behavior
- `target/hermes-cockpit-m026-verification/python_tmux_lifecycle.stdout`
- `target/hermes-cockpit-m026-verification/python_tmux_lifecycle.stderr`
- `target/hermes-cockpit-m026-verification/python_cockpit_discover.stdout`
- `target/hermes-cockpit-m026-verification/python_cockpit_discover.stderr`
- `target/hermes-cockpit-m026-verification/cargo_cockpit_test.stdout`
- `target/hermes-cockpit-m026-verification/cargo_cockpit_test.stderr`

## Verification commands

Focused GREEN and regression commands passed with exit code 0; the RED command failed first as expected and is recorded separately.

```bash
cargo test --manifest-path prototypes/hermes-cockpit/Cargo.toml claude_sessions_render_real_tmux_evidence_without_account_identity -- --nocapture  # RED, expected fail before implementation
cargo test --manifest-path prototypes/hermes-cockpit/Cargo.toml claude_sessions_render_real_tmux_evidence_without_account_identity -- --nocapture  # GREEN
python3 -m unittest tests.hermes_cockpit.test_claude_sessions_projection.ClaudeSessionsProjectionTests.test_cli_projects_stopped_tmux_session_from_cached_preview_without_tmux_capture -v  # RED then GREEN for stopped tmux projection source behavior
python3 -m unittest tests.hermes_cockpit.test_claude_sessions_refresh.ClaudeSessionsRefreshTests.test_refresh_replaces_stale_projection_with_redacted_read_only_source_6 -v  # RED, expected fail before refresh runner existed
python3 -m unittest tests.hermes_cockpit.test_claude_sessions_refresh -v  # GREEN for on-demand and bounded watch refresh
python3 -m unittest tests.hermes_cockpit.test_claude_sessions_projection -v
python3 scripts/hermes-cockpit-refresh-claude-sessions.py --registry target/hermes-cockpit-m026-real-tmux-dogfood/registry.json --output target/hermes-cockpit-m018/claude-sessions-projection.json --summary target/hermes-cockpit-m026-verification/claude-sessions-refresh-summary.json --max-preview-chars 320
cargo test --manifest-path prototypes/hermes-cockpit/Cargo.toml claude_sessions_default_smoke_width_keeps_refresh_marker_and_display_only_visible -- --nocapture  # RED then GREEN for default-width source-6 operator visibility
bash scripts/start-hermes-cockpit.sh --source claude-sessions --smoke
# tmux dogfood: tmux new-session -d -s hermes-cockpit-source6-dogfood -x 160 -y 44 'cd /home/joe/hermes-workspace && bash scripts/start-hermes-cockpit.sh --source claude-sessions'
python3 scripts/hermes-cockpit-claude-sessions.py --registry target/hermes-cockpit-m026-real-tmux-dogfood/registry.json --output target/hermes-cockpit-m018/claude-sessions-projection.json --max-preview-chars 320
cargo fmt --manifest-path prototypes/hermes-cockpit/Cargo.toml -- --check
cargo check --manifest-path prototypes/hermes-cockpit/Cargo.toml
cargo test --manifest-path prototypes/hermes-cockpit/Cargo.toml
python3 -m unittest tests.hermes_cockpit.test_claude_tmux_lifecycle -v
python3 -m unittest discover tests/hermes_cockpit -v
```

## Adapter field note

`start-result.json` contains `real_claude_used: false` even though the real official interactive `claude` binary was launched inside tmux. Treat that field as a conservative fake-testable adapter non-claim, not as the authoritative proof source. The authoritative real-run evidence is the start command, tmux capture showing Claude Code UI/trust prompt, marker capture, and external tmux cleanup verification.

## Non-claims

- No production readiness is claimed.
- No write-capable Claude authority was granted.
- No TUI-triggered lifecycle execution was added.
- No commit or push was performed.
- No secrets, credentials, or account identifiers are intentionally preserved in this note.
- Sensitive/account-like identifiers from raw Claude UI captures were redacted in preserved JSON evidence and are redacted before Cockpit render.

## Recommended next step

Formal M026 closeout review is complete and passing. Next work should be a separate approved slice/PR-prep lane: reconcile the repo being behind origin, review the untracked/dirty tree boundaries, and only then package changes. Defer write-capable Claude authority until an isolated worktree lane has explicit approval and its own RED/GREEN proof.
