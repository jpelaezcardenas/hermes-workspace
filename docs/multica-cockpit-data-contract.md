# Multica Cockpit — Phase 0 Data Contract

Discovery notes for **PAK-62** (parent: PAK-61, "Multica cockpit for Hermes
Workspace — control tower"). This documents the Multica CLI JSON shapes and the
Hermes Workspace integration points required before any `/multica` UI or backend
work begins.

All CLI shapes below were confirmed on Kevin's Mac Mini (`M4s-Mac-mini`,
`multica` CLI `v0.3.6`, daemon `running`, server `https://api.multica.ai`) on
2026-05-22. No daemon/service restart was performed.

---

## 1. Allowlisted CLI commands and JSON shapes

The backend adapter shells out to these read-only commands only. Every command
supports `--output json`. Identifiers must be validated before interpolation
(see §4).

### `multica daemon status --output json`

```jsonc
{
  "active_task_count": 1,
  "agents": ["claude", "codex", "hermes"],   // available providers
  "cli_version": "0.3.6",
  "daemon_id": "019e2242-...",
  "device_name": "M4s-Mac-mini",
  "pid": 79347,
  "server_url": "https://api.multica.ai",
  "status": "running",                        // running | (other when down)
  "uptime": "13m32s",
  "workspaces": [
    { "id": "<workspace-uuid>", "runtimes": ["<runtime-uuid>", ...] }
  ]
}
```
Drives the top-area **daemon status** chip. When the CLI exits non-zero or the
process is absent, surface `status: "offline"` (synthesized by the adapter, not
the CLI).

### `multica runtime list --output json`
Array of runtimes:
```jsonc
{
  "id": "<runtime-uuid>",
  "name": "Claude (kevs-macbook-m5pro)",
  "provider": "claude",                       // claude | codex | hermes
  "status": "online",                         // online | offline
  "runtime_mode": "local",
  "device_info": "kevs-macbook-m5pro · 2.1.147 (Claude Code)",
  "last_seen_at": "2026-05-22T10:55:15Z",     // staleness signal
  "owner_id": "<member-uuid>",
  "workspace_id": "<workspace-uuid>"
}
```
Drives **runtime/agent status**. `last_seen_at` vs now = the staleness hint.

### `multica agent list --output json`
Array of agents. High-signal fields for the UI (the full object is large —
`instructions` alone is multi-KB, so the adapter must project, never forward
verbatim):
```jsonc
{
  "id": "<agent-uuid>",
  "name": "Software Engineer (M5P)",
  "description": "Writes code, grilling before code, ...",
  "model": "claude-opus-4-7",
  "runtime_id": "<runtime-uuid>",
  "runtime_mode": "local",
  "max_concurrent_tasks": 6,
  "skills": [{ "id": "...", "name": "diagnose", "description": "..." }],
  "avatar_url": "https://static.multica.ai/.../*.png",
  "archived_at": null
}
```
**Role inference** (parent issue UX) is derived from `name`/`description` —
Multica has no structured `role` field. Map by name prefix:
`Software Engineer → Engineer`, `Code Reviewer → Reviewer`,
`Architect → Architect`, `Researcher → Researcher`,
`Coordinator → Coordinator`, else raw `name`.

### `multica project list --output json`
Array of projects. **This is the source of truth for project progress** — no
fabrication needed:
```jsonc
{
  "id": "<project-uuid>",
  "title": "Hermes Workspace Multica Cockpit",
  "description": "...",
  "status": "planned",                        // planned | (others)
  "issue_count": 8,                           // total issues
  "done_count": 0,                            // completed issues
  "icon": "💬",
  "priority": "none",
  "lead_id": "<uuid|null>",
  "lead_type": "agent | member | null",
  "resource_count": 1,
  "workspace_id": "<workspace-uuid>"
}
```
**Project progress rule (confirmed buildable):**
`progress = done_count / max(issue_count_excluding_cancelled, 1)`.
`done_count` and `issue_count` come straight from this payload. Cancelled-issue
exclusion requires per-issue status (next command) if `issue_count` includes
cancelled — verify during Phase 1 against a project that has cancelled issues.

### `multica project get <id> --output json`
Single project, same shape as a `project list` element (confirm field parity in
Phase 1; not re-dumped here).

### `multica issue list --project <id> --output json --limit N`
Paginated. **Note the envelope** — unlike the others this is an object, not a
bare array:
```jsonc
{
  "has_more": true,
  "issues": [ { /* issue object, see issue get */ } ]
}
```
Pagination beyond `--limit` was not exercised in discovery; assume a cursor/
offset flag exists and confirm via `multica issue list --help` in Phase 1 if the
board needs more than the first page.

### `multica issue get <identifier|uuid> --output json`
```jsonc
{
  "id": "<issue-uuid>",
  "identifier": "PAK-62",                     // routable key
  "number": 62,
  "title": "...",
  "description": "...",                       // markdown
  "status": "in_review",                      // todo|in_progress|in_review|done|blocked|backlog|cancelled
  "priority": "high",
  "assignee_id": "<uuid|null>",
  "assignee_type": "agent | member | null",
  "parent_issue_id": "<uuid|null>",
  "project_id": "<uuid>",
  "labels": [],
  "metadata": {},                             // KV scratchpad
  "created_at": "...", "updated_at": "...",
  "workspace_id": "<uuid>"
}
```
Drives issue cards (status, title, priority, assignee) and the detail drawer.
`updated_at` = "latest activity" timestamp on cards. Board columns map directly
to `status`.

### `multica issue runs <identifier|uuid> --output json`
Array of executions, newest first. **This is the freshness / failure signal** —
no fake issue-level percentage required:
```jsonc
{
  "id": "<task-uuid>",
  "issue_id": "<issue-uuid>",
  "agent_id": "<agent-uuid>",
  "runtime_id": "<runtime-uuid>",
  "kind": "comment",                          // what triggered the run
  "status": "running",                        // running | failed | (completed)
  "attempt": 1, "max_attempts": 2,
  "error": null,                              // populated on failure
  "failure_reason": "agent_error",            // present only on failure
  "result": null,
  "trigger_comment_id": "<comment-uuid>",
  "trigger_summary": "try again, its authenticated now",
  "created_at": "...", "dispatched_at": "...",
  "started_at": "...", "completed_at": "...|null",
  "work_dir": "/Users/.../workdir"
}
```
Drawer "latest runs" + **stale/failure hints**: a run with `status:"failed"` and
`error`/`failure_reason` set is a failure hint; a long-`running` run with no
`completed_at` past a threshold is a stale hint.

### `multica issue run-messages <task-id> --output json`
Array of messages for one execution (`--since <seq>` for incremental polling;
`--issue <id>` to scope a short task-id prefix):
```jsonc
{
  "seq": 1,
  "task_id": "<task-uuid>",
  "issue_id": "<issue-uuid>",
  "type": "text",
  "content": "Failed to authenticate. API Error: 401 ..."
}
```
Drawer "latest messages/output snapshot". Poll with `--since` to stream.

---

## 2. Backend → CLI mapping (recommended endpoints)

Reuse the endpoint names from PAK-61. Each is a thin read-only adapter over one
CLI command:

| Endpoint                                  | CLI source                                              |
|-------------------------------------------|---------------------------------------------------------|
| `GET /api/multica/status`                 | `daemon status` (+ `runtime list`, `agent list`)        |
| `GET /api/multica/projects`               | `project list`                                          |
| `GET /api/multica/projects/:id/issues`    | `issue list --project :id --limit N`                    |
| `GET /api/multica/issues/:id`             | `issue get :id`                                         |
| `GET /api/multica/issues/:id/runs`        | `issue runs :id`                                        |
| `GET /api/multica/runs/:id/messages`      | `issue run-messages :id [--since]`                      |
| `POST /api/multica/ask-hermes`            | (no Multica CLI; routes into Workspace chat bridge)     |

---

## 3. Hermes Workspace integration points (confirmed in repo)

- **Routing**: file-based via TanStack Start under `src/routes/api/*.ts`.
  A route exports `Route = createFileRoute('/api/<path>')({ server: { handlers: { GET: async ({ request }) => ... } } })`.
  New cockpit routes live at `src/routes/api/multica/*.ts` (mirror existing
  nested dirs like `src/routes/api/dashboard/`, `claude-proxy/`).
- **Auth boundary (the seam to reuse)**: `requireLocalOrAuth(request)` from
  `src/server/auth-middleware.ts`. Returns `true` for loopback requests when no
  password is set, otherwise requires a valid session cookie token. Read-only
  pattern (copy `src/routes/api/ping.ts`): call it first, return
  `Response.json({...}, { status: 401 })` on `false`. Sessions are cookie tokens
  (`claude-auth`, HttpOnly/SameSite=Strict, 30-day TTL) persisted to
  `~/.hermes/workspace-sessions.json`. **No new auth is built — the cockpit
  inherits Workspace auth, satisfying the PAK-61 security requirement.**
- **CLI-bridge precedent**: `src/server/mcp-cli-bridge.ts` already spawns an
  external CLI safely — `spawn()` with a **detached process group** (SIGKILL the
  tree on timeout), **ANSI stripping**, and a hard timeout (60s). The Multica
  adapter is a new deep module of the same shape:
  `spawn('multica', [...args, '--output', 'json'])` → parse JSON → project to the
  UI type. Two adapters (hermes + multica) make this a real seam, not a
  hypothetical one.
- **Chat/context bridge (for Ask-Elsa, Phase 5)**: existing chat plumbing lives
  in `src/server/chat-backends.ts`, `chat-event-bus.ts`, `chat-mode.ts`, and the
  `src/routes/api/chat/` + `send-stream.ts` routes. The `ask-hermes` endpoint
  feeds structured issue context into this existing bridge rather than a new
  channel.

---

## 4. Security / HITL boundary (decided)

- **Remote access**: Workspace already gates non-loopback exposure in
  `server-entry.js` — binding `HOST=0.0.0.0` *requires* `HERMES_PASSWORD` or the
  server refuses to start. Remote access path (LAN/Tailscale/reverse proxy) is an
  operator deployment choice layered on top; the cockpit does not change it. The
  app is reachable remotely once Workspace itself is, behind Workspace auth.
- **Identifier validation**: project/issue/run IDs are UUIDs or `TEAM-N` keys.
  Validate against `^[0-9a-f-]{36}$` (UUID) or `^[A-Z]+-[0-9]+$` (key) before
  passing to the CLI. Never interpolate raw user strings into argv.
- **Read-only first**: all six GET endpoints are read-only. No `comment`,
  `assign`, `rerun`, `status`, or `cancel-task` is exposed in MVP.
- **No arbitrary shell**: the adapter has a fixed argv allowlist (the commands in
  §1 only). No passthrough of caller-supplied subcommands.
- **No secrets in responses**: `agent list` `instructions`/`custom_env` and any
  token-bearing fields are projected out before reaching the browser.
- **No daemon/service restart**: confirmed — discovery touched no lifecycle
  commands.

---

## 5. Known limitations / open items for Phase 1

- No structured `role` field on agents — role is inferred from `name` (§1).
- `issue list` cancelled-issue handling vs `project.issue_count` needs one
  empirical check against a project containing cancelled issues to finalize the
  progress denominator.
- `issue list` pagination flags beyond `--limit` not exercised; confirm if the
  board needs >1 page.
- `project get` field parity with `project list` assumed, not byte-verified.
