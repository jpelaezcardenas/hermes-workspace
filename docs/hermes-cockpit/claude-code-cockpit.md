# Claude Code Cockpit Control Lane

## Purpose

Hermes Cockpit should grow from a read-only projection/review surface into a supervised operator cockpit for real worker sessions. The Claude lane must manage official Claude Code sessions directly — background, tmux-backed interactive, and eventually embedded PTY — instead of making the subagent GUI depend on hidden `claude -p` or Agent SDK automation.

This is important for the June 2026 Claude usage-policy posture: Migi should supervise visible Claude Code sessions with explicit session state, operator controls, and verifier evidence, not launder headless programmatic calls through wrappers.

## Current codebase inspection

- **Main Ratatui entrypoint:** `prototypes/hermes-cockpit/src/main.rs`.
  - `main()` parses `--smoke <projection> [width] [height]` or starts the Crossterm/Ratatui app over a projection path.
  - `run_app()` reloads the selected projection from disk and renders every loop.
  - `handle_key()` currently supports quit, card selection, trust filter, reload, help, no-op approval key, and numeric source switching.
- **Launchers:**
  - POSIX: `scripts/start-hermes-cockpit.sh`
  - Windows: `scripts/start-hermes-cockpit.ps1`
  - Both launch `cargo run --manifest-path prototypes/hermes-cockpit/Cargo.toml` with a projection source.
- **Existing app/session model:**
  - `AppState` is projection-centric: `projection: serde_json::Value`, selected card index, current source name, trust/help flags, and reload state.
  - There is no typed `AgentSession` / `AgentKind` / `SessionStatus` model yet in the Ratatui crate.
  - Current worker/session-like content is inferred from projection JSON fields such as `active_runs`, `completed_runs`, control-plane data, watcher projection, and approval queue data.
- **Existing terminal/log panel code:**
  - No embedded terminal/PTY exists yet.
  - `render_event_stream()` and `render_runs()` render projection-derived logs/runs as static Ratatui lists/paragraphs.
  - Approval queue renderers are display-only: queue, ledger, no-go, and safety panels.
- **Existing process-spawning path:**
  - The Ratatui crate itself does not spawn worker processes today.
  - Existing process/spawn behavior lives in surrounding scripts and tests, not as a Rust backend adapter in `prototypes/hermes-cockpit`.
- **Test framework:**
  - Rust unit/render tests live inline in `prototypes/hermes-cockpit/src/main.rs` and use Ratatui `TestBackend` render assertions.
  - Python tests live under `tests/hermes_cockpit/` for projection builders, launchers, approval queue/action behavior, Windows smoke wrappers, and control/watchers.
- **Project docs/GSD location:**
  - Cockpit docs are under `docs/hermes-cockpit/`.
  - GSD milestone artifacts are under `.gsd/milestones/`.
- **Immediate local mismatch to remember:**
  - `PROJECTION_SOURCES` in `main.rs` includes an approval queue source on key `5`, but `handle_key()` and the launcher/catalog docs still advertise/handle only keys `1..4`. A future cockpit-control milestone should reconcile this while adding the Claude lane.

## Product shape

The target is a Claude/subagent cockpit with panes for:

1. **Agent roster** — active Claude/Hermes/Codex workers, status, mode, and host.
2. **Session detail** — session ID, host, repo path, worktree path, permission mode, command, and start time.
3. **Terminal/log pane** — MVP tails `claude logs <session_id>` or tmux capture; later a true PTY renderer.
4. **Prompt composer** — MVP shows attach/manual command or sends tmux keys; later routes text directly into embedded PTY.
5. **Safety panel** — stop/kill controls, changed-file summary, read-only/write-capable labels, and verifier-required state.
6. **Verification panel** — project-approved checks run outside Claude with command, exit code, and short output.

Migi remains orchestrator/verifier. GSD remains execution truth. Claude sessions can implement/review, but they do not self-certify completion.

## Supported session modes

### `Claude BG`

Official Claude Code background mode.

Supported command shape:

```bash
claude --bg "task"
claude logs <session_id>
claude stop <session_id>
claude attach <session_id>
```

MVP behavior:

- Start one background Claude task.
- Record the returned session ID.
- Show it in the agent roster as `Claude BG`.
- Tail latest logs in the detail/log pane.
- Stop maps to `claude stop <session_id>`.
- Attach displays the exact manual attach command if full attach is not embedded yet.
- Default path must not call `claude -p`.

### `Claude tmux`

Interactive Claude CLI managed by tmux.

Supported command shape:

```bash
tmux new-session -d -s claude-task-1 'cd /path/to/repo && claude'
tmux capture-pane -t claude-task-1 -p
tmux send-keys -t claude-task-1 'task prompt' Enter
tmux kill-session -t claude-task-1
```

MVP behavior:

- Start Claude in a named tmux session.
- Send an initial task only after the session is visible and trusted.
- Capture output into the Ratatui log pane.
- Send follow-up text via `tmux send-keys`.
- Stop/kill session safely.
- First-run trust/permission prompts must be visible, not blindly answered.

### `Claude PTY`

Future embedded interactive terminal.

Candidate Rust pieces:

- `portable-pty` for child PTY process management.
- `vt100`, `tui-term`, or equivalent for terminal parsing/rendering.
- `tokio` tasks/channels for read/write plumbing.
- Resize propagation from Ratatui pane to child PTY.

UX rule: add a terminal focus mode. When focused, keys go to Claude except a reserved escape chord such as `Ctrl+G` to return control to the cockpit.

### `Claude print`

Fallback only: `claude -p`.

Rules:

- Visibly label as `Claude print` / `programmatic fallback`.
- Require explicit turn/budget caps, e.g. `--max-turns`.
- Prefer structured output capture where possible.
- Do not present wrappers around `claude -p`, Agent SDK, or stream-json automation as compliant substitutes for interactive/background Claude Code sessions.

## Data model direction

Names may change to match the codebase, but the first typed model should separate worker identity, transport mode, status, permissions, and evidence.

```rust
enum AgentKind {
    ClaudeBackground,
    ClaudeTmux,
    ClaudePty,
    ClaudePrint,
    Hermes,
    Codex,
}

enum SessionStatus {
    Idle,
    Starting,
    Running,
    WaitingForInput,
    Done,
    Error,
    Stopped,
}

enum PermissionMode {
    ReadOnly,
    AcceptEdits,
    BypassPermissions,
}

struct AgentSession {
    id: String,
    display_name: String,
    kind: AgentKind,
    status: SessionStatus,
    host: String,
    repo_path: PathBuf,
    worktree_path: Option<PathBuf>,
    permission_mode: PermissionMode,
    command: String,
    started_at: DateTime<Utc>,
    last_output_preview: String,
    log_path: Option<PathBuf>,
}
```

Implementation note: the current Ratatui app is a single-file prototype using `serde_json::Value`. The safest first code slice is to add model/adapter modules or clearly delimited sections with unit tests before replacing projection-driven render paths.

## Safety rules

1. **Interactive-first.** Default Claude worker modes are `claude`, `claude --bg`, tmux, or PTY. Do not default to `claude -p`.
2. **Visible session state.** Every session shows mode, host, repo, worktree, command shape, status, and whether it can write.
3. **Worktree isolation.** Write-capable Claude sessions run in isolated worktrees by default.
4. **No silent commit/push.** Claude workers must not auto-commit or push unless Joe explicitly enables that lane.
5. **Migi verifies.** Migi/Pi coordinates and verifies; Claude/Windows/GPC can implement or review; GSD remains execution truth.
6. **Budget/turn caps for fallback print mode.** Any `claude -p` fallback must be explicitly capped and visibly labeled as programmatic.
7. **No wrapper laundering.** Do not claim a wrapper avoids policy changes if it uses Agent SDK, `claude -p`, or non-interactive stream-json under the hood.
8. **Discord loop prevention.** Do not ping other agents from public channel replies. Prefer Joe-mediated DM, shared handoff files, or a bridge.
9. **Review vs apply separation.** Preserve the M015 lesson: display/review surfaces do not silently mutate GSD/Kanban/Hermes source-of-truth state.
10. **Verifier-required closeout.** A worker session can be `done`, but cockpit should mark work as verifier-required until Migi runs approved checks.

## Phased implementation plan

### Phase 1 — background Claude session MVP

Scope:

- Add a backend adapter for official `claude --bg` session lifecycle.
- Add command-construction tests and fake-`claude` integration smoke.
- Add a projection or in-memory model that can render a fake/recorded Claude background session.
- Render `Claude BG`, session ID, status, repo, permission mode, latest log preview, attach command, and stop affordance.

Acceptance:

- Launch one background Claude task through the adapter in a fake-`claude` test.
- View latest logs from the fake session.
- Stop the fake session.
- Render smoke shows `Claude BG`, `Verifier required`, and read/write labels.
- Default path contains no `claude -p` call.

### Phase 2 — tmux-backed interactive sessions

Scope:

- Add a tmux adapter for real interactive Claude CLI sessions.
- Capture pane output into the log pane.
- Send initial/follow-up text via `tmux send-keys` only after visible session creation.
- Stop/kill tmux sessions safely.

Acceptance:

- Fake or guarded integration proves command construction for `new-session`, `capture-pane`, `send-keys`, and `kill-session`.
- Manual real-terminal smoke can start Claude in tmux, send harmless prompt, capture output, and stop.
- First-run trust/permission prompts are surfaced, not auto-accepted.

### Phase 3 — embedded PTY terminal

Scope:

- Investigate and add PTY dependencies.
- Add terminal focus mode with reserved escape chord.
- Render Claude interactive CLI inside Ratatui.
- Route keyboard input safely when focused.
- Propagate resize.

Acceptance:

- Claude interactive CLI renders inside Ratatui.
- User can type into Claude.
- Resize works.
- `Ctrl+G` or chosen escape chord reliably leaves terminal focus.
- UI does not deadlock key handling.

## Verification plan

Use TUI-safe tests rather than only piping stdin to the app.

1. Unit test session parsing and status mapping.
2. Unit test command construction for Claude BG and tmux adapters.
3. Ratatui `TestBackend` render smoke:
   - roster shows fake Claude session;
   - detail pane shows mode/status/repo;
   - safety labels show `Read-only`, `Write-capable`, `Needs input`, and `Verifier required` where applicable.
4. Fake `claude` executable integration smoke:
   - verify `--bg`, `logs`, `stop`, and `attach` command paths without spending Claude quota.
5. Manual PTY/tmux smoke in a real terminal:
   - launch one harmless Claude/tmux session;
   - send a harmless prompt;
   - verify logs render;
   - stop/kill safely.
6. Migi closeout:
   - run Rust tests;
   - run relevant Python launcher/projection tests;
   - collect concise evidence artifact under the milestone target directory;
   - update GSD only after verification.

## Immediate next slice recommendation

Create the next GSD milestone around a **safe Claude BG adapter and renderable session model**, not embedded PTY.

Recommended first implementation slice:

1. Add typed session/adapter model and fake-`claude` command-construction tests.
2. Add a render smoke for one fake `Claude BG` session with verifier/safety labels.
3. Add a small JSON fixture/projection or in-memory path for the Ratatui app to display Claude session state.
4. Keep any real Claude execution behind manual/operator action until fake adapter tests are green.
