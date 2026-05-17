# Hermes Multi-Agent Control Plane MVP Implementation Plan

> **For Hermes:** Use `protocol-driven-orchestrator`, `agent-team-operating-manual`, `best-of-n-planning`, `test-driven-development`, and `review-gate` when executing this plan. Implement slice-by-slice with tests first where practical.

**Goal:** Turn Hermes Workspace into a local personal multi-agent control plane for Hermes Agent workers: board → isolated worktree → live run → approvals → diff/review → validation → GitHub PR.

**Current repo:** `/home/rab/ai-workspace/apps/hermes-workspace`

**Primary runtime:** Hermes Agent only. No Claude/Codex/OpenCode runtimes in MVP.

**Primary UI:** Web UI first, packaged through existing Electron shell scripts after core web flow is stable.

**User model:** Single-user local app for Ярослав; no team/multi-tenant auth in MVP.

---

## 1. Context and constraints

### 1.1 Existing repo facts

`hermes-workspace` already contains useful surfaces:

- Electron scripts in `package.json`:
  - `electron:dev`
  - `electron:build`
  - `electron:build:mac`
  - `electron:build:win`
- Existing route/API area:
  - `src/routes/api/conductor-spawn.ts`
  - `src/routes/api/projects.ts`
  - `src/routes/api/swarm-*`
  - `src/routes/api/workspace.ts`
  - `src/routes/api/start-agent.ts`
  - `src/routes/api/sessions/*`
- Existing UI areas:
  - `src/screens/gateway/conductor.tsx`
  - `src/screens/gateway/components/task-board.tsx`
  - `src/screens/gateway/components/kanban-board.tsx`
  - `src/screens/gateway/components/approvals-panel.tsx`
  - `src/screens/gateway/components/approvals-page.tsx`
  - `src/screens/gateway/components/mission-event-log.tsx`
  - `src/screens/gateway/components/agent-output-panel.tsx`
  - `src/screens/swarm2/*`
  - `src/screens/tasks/*`
- Existing stores/helpers:
  - `src/lib/workspace-agents.ts`
  - `src/lib/workspace-checkpoints.ts`
  - `src/server/project-registry.ts`
  - `src/server/tool-artifacts-store.ts`

### 1.2 Dirty state warning

There are already uncommitted changes in this repo. Before implementing, preserve them.

Current observed dirty state includes:

```text
M src/routes/api/-conductor-spawn.test.ts
M src/routes/api/conductor-spawn.ts
M src/routes/api/projects.ts
M src/routes/conductor.tsx
M src/screens/gateway/conductor-launch-intent.test.ts
M src/screens/gateway/conductor-launch-intent.ts
M src/screens/gateway/conductor.tsx
M src/screens/gateway/hooks/use-conductor-gateway.test.ts
M src/screens/gateway/hooks/use-conductor-gateway.ts
M src/screens/projects/projects-screen.tsx
M src/server/project-registry.test.ts
M src/server/project-registry.ts
?? src/screens/gateway/conductor-preflight-summary.test.ts
?? src/screens/gateway/conductor-preflight-summary.ts
?? src/screens/gateway/conductor-trace-hydration.test.ts
?? src/screens/gateway/conductor-trace-hydration.ts
?? src/screens/gateway/hooks/mission-history.test.ts
?? src/screens/gateway/hooks/mission-history.ts
?? src/screens/projects/project-mission-trace.test.ts
?? src/screens/projects/project-mission-trace.ts
```

Execution rule:

1. Do not overwrite this work.
2. Before coding, create a checkpoint branch or patch.
3. Keep multi-agent MVP commits separate from existing conductor/project work.

### 1.3 Hermes Agent dirty state dependency

`hermes-agent` also has relevant uncommitted sandbox/project-context work:

```text
M gateway/platforms/base.py
M gateway/platforms/telegram.py
M gateway/run.py
M gateway/session_context.py
M tools/delegate_tool.py
M tools/file_tools.py
M tools/terminal_tool.py
?? gateway/project_context.py
?? tests/gateway/test_project_sandbox_context.py
?? tests/tools/test_project_sandbox.py
?? tools/project_sandbox.py
```

This appears relevant for project sandbox/workdir safety. Do not assume it is merged. Treat it as either:

- a dependency to stabilize before worker isolation; or
- a parallel branch to preserve and integrate later.

---

## 2. References to borrow from

### 2.1 Emdash

Borrow:

- desktop-first agentic development environment feel;
- multiple isolated worktrees;
- remote/dev workflow patterns;
- MCP/tools settings UX;
- port isolation concept via env var.

Do not copy:

- multi-provider complexity in MVP.

### 2.2 Vibe Kanban / AI Agent Board

Borrow:

- Kanban board for agent tasks;
- task detail drawer/page;
- task groups later;
- parallelism slider later;
- diff review + inline comments later.

MVP starts with simple task cards and task detail.

### 2.3 Composio Agent Orchestrator

Borrow later:

- CI failure reaction loop;
- review-comment routing;
- PR lifecycle automation.

MVP only needs `commit → push → gh pr create`.

### 2.4 OpenCastle

Borrow:

- Team Lead Orchestrator vocabulary;
- specialist roles;
- work packets;
- quality gates;
- deterministic task graph.

MVP implements the data model and manual flow first; autonomous decomposition can come after the first end-to-end path works.

### 2.5 Claude Squad

Borrow:

- simple task/worktree lifecycle;
- local terminal/process control;
- review-before-merge mindset.

---

## 3. MVP scope

### 3.1 In scope

1. Local Agent Board in Hermes Workspace.
2. Hermes Agent worker runtime only.
3. One git worktree + branch per coding task.
4. Live events/logs for each run.
5. Basic approval queue for risky operations.
6. Diff view for task worktree.
7. Validation command runner.
8. GitHub PR creation via `gh`.
9. Web UI flow.
10. Electron smoke after web flow is stable.
11. Single-user local storage.

### 3.2 Out of scope for MVP

- Claude/Codex/OpenCode providers.
- Multi-user/team auth.
- Full autonomous conflict resolver.
- Full CI/review-comment reaction loop.
- Auto-merge.
- Remote SSH.
- Advanced inline diff comments.
- Marketplace/provider registry.
- Perfect unified tool-guardrail integration if it delays MVP.

---

## 4. Product flow

### 4.1 Happy path

```text
User opens /conductor or /agents board
→ creates task with project + description + agent profile
→ task appears in Backlog/Ready
→ user clicks Start
→ system creates worktree + branch
→ system launches Hermes Agent worker inside worktree
→ events stream into task detail
→ worker finishes or requests approval
→ system collects changed files and diff
→ user runs validation commands
→ user approves result
→ system commits, pushes branch, creates GitHub PR
→ task moves Done
→ result summary/artifacts persist
```

### 4.2 First implementation slice

```text
Create Task → Create Worktree → Show Task on Board
```

No worker yet. This validates:

- storage;
- project selection;
- task model;
- git branch/worktree creation;
- UI board.

### 4.3 Second implementation slice

```text
Start Hermes Worker → Stream Events → Complete Task
```

### 4.4 Third implementation slice

```text
Diff → Validation → Commit/Push/PR
```

### 4.5 Fourth implementation slice

```text
Approval Queue
```

---

## 5. Data model

Use TypeScript domain types in a new module first. Persist to JSON file or SQLite based on existing repo patterns after audit. Because the repo already uses local JSON stores such as `.runtime/tool-artifacts`, MVP can start with file-backed JSON under `.runtime/multi-agent/` and migrate later if needed.

Recommended MVP path:

```text
.runtime/multi-agent/state.json
.runtime/multi-agent/events/*.jsonl
.runtime/multi-agent/artifacts/<task-id>/...
```

### 5.1 Project

```ts
export type MultiAgentProject = {
  id: string
  name: string
  repoPath: string
  defaultBranch: string
  worktreeRoot: string
  githubRemote?: string | null
  graphifyGraphPath?: string | null
  obsidianPath?: string | null
  validation?: {
    lint?: string | null
    typecheck?: string | null
    test?: string | null
    build?: string | null
  }
  createdAt: string
  updatedAt: string
}
```

Notes:

- `repoPath` should come from existing `project-registry.ts` where possible.
- `worktreeRoot` default:
  - `<repoPath>/.hermes-worktrees`
- `defaultBranch` should be detected by:
  - `git symbolic-ref refs/remotes/origin/HEAD`
  - fallback `main`
  - fallback current branch.

### 5.2 Agent profile

```ts
export type MultiAgentProfile = {
  id: string
  name: string
  role:
    | 'orchestrator'
    | 'frontend-engineer'
    | 'backend-engineer'
    | 'qa-validator'
    | 'reviewer'
    | 'docs-writer'
  runtime: 'hermes-agent'
  model?: string | null
  skills: string[]
  enabledToolsets?: string[]
  permissionPolicy: 'safe-default' | 'ask-risky' | 'read-only'
  createdAt: string
  updatedAt: string
}
```

MVP default profiles:

```text
orchestrator
frontend-engineer
backend-engineer
qa-validator
reviewer
docs-writer
```

All profiles use Hermes Agent. Differences are prompt/work packet and allowed toolsets.

### 5.3 Task

```ts
export type MultiAgentTaskStatus =
  | 'backlog'
  | 'ready'
  | 'running'
  | 'needs_approval'
  | 'review'
  | 'blocked'
  | 'done'
  | 'failed'
  | 'cancelled'

export type MultiAgentTask = {
  id: string
  projectId: string
  title: string
  description: string
  status: MultiAgentTaskStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigneeProfileId: string
  parentIds: string[]
  childIds: string[]
  workPacket: string
  acceptanceCriteria: string[]
  branchName?: string | null
  worktreePath?: string | null
  latestRunId?: string | null
  createdAt: string
  updatedAt: string
}
```

### 5.4 Run

```ts
export type MultiAgentRun = {
  id: string
  taskId: string
  profileId: string
  status: 'queued' | 'starting' | 'running' | 'waiting_approval' | 'completed' | 'failed' | 'cancelled'
  pid?: number | null
  sessionId?: string | null
  startedAt?: string | null
  finishedAt?: string | null
  tokenIn?: number | null
  tokenOut?: number | null
  costUsd?: number | null
  summary?: string | null
  error?: string | null
}
```

### 5.5 Event

```ts
export type MultiAgentEvent = {
  id: string
  taskId: string
  runId?: string | null
  type:
    | 'task.created'
    | 'worktree.created'
    | 'run.started'
    | 'run.log'
    | 'run.tool_call'
    | 'approval.requested'
    | 'approval.resolved'
    | 'validation.started'
    | 'validation.completed'
    | 'diff.updated'
    | 'pr.created'
    | 'task.completed'
    | 'task.failed'
  message: string
  payload?: unknown
  createdAt: string
}
```

### 5.6 Approval

```ts
export type MultiAgentApproval = {
  id: string
  taskId: string
  runId?: string | null
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  actionType:
    | 'git.push'
    | 'github.pr_create'
    | 'file.delete'
    | 'shell.risky'
    | 'external.message'
    | 'deploy'
    | 'secret_or_env'
  title: string
  description: string
  payload: unknown
  status: 'pending' | 'approved' | 'denied' | 'expired'
  createdAt: string
  resolvedAt?: string | null
}
```

### 5.7 Validation

```ts
export type MultiAgentValidation = {
  id: string
  taskId: string
  type: 'lint' | 'typecheck' | 'test' | 'build' | 'custom'
  command: string
  status: 'queued' | 'running' | 'passed' | 'failed' | 'cancelled'
  exitCode?: number | null
  outputSummary?: string | null
  outputArtifactId?: string | null
  startedAt?: string | null
  finishedAt?: string | null
}
```

### 5.8 Artifact

```ts
export type MultiAgentArtifact = {
  id: string
  taskId: string
  type: 'diff' | 'log' | 'pr' | 'screenshot' | 'report' | 'validation-output'
  pathOrUrl: string
  title: string
  metadata?: Record<string, unknown>
  createdAt: string
}
```

---

## 6. Backend modules

Create new modules under `src/server/multi-agent/`.

```text
src/server/multi-agent/types.ts
src/server/multi-agent/store.ts
src/server/multi-agent/events.ts
src/server/multi-agent/project-resolver.ts
src/server/multi-agent/worktree-manager.ts
src/server/multi-agent/hermes-worker-runtime.ts
src/server/multi-agent/diff-manager.ts
src/server/multi-agent/validation-runner.ts
src/server/multi-agent/github-pr-manager.ts
src/server/multi-agent/approval-store.ts
```

### 6.1 `types.ts`

Contains all domain types.

### 6.2 `store.ts`

Responsibilities:

- load/save `.runtime/multi-agent/state.json`;
- CRUD projects/tasks/profiles/runs/approvals/validations/artifacts;
- atomic-ish writes via temp file + rename;
- no large logs inside state file.

Test cases:

- creates empty state if missing;
- preserves malformed state by writing `.corrupt-<timestamp>.json` and returning empty state;
- creates task;
- updates task status;
- appends run/artifact/approval.

### 6.3 `events.ts`

Responsibilities:

- append JSONL event files under `.runtime/multi-agent/events/<task-id>.jsonl`;
- read events by task;
- summarize latest event for cards.

Test cases:

- append/read events in order;
- rejects invalid task IDs/path traversal;
- handles missing event file.

### 6.4 `project-resolver.ts`

Responsibilities:

- integrate with existing `src/server/project-registry.ts`;
- validate `repoPath` exists;
- verify git repo;
- detect default branch;
- detect GitHub remote;
- derive worktree root.

Test cases:

- detects git repo;
- rejects non-existent path;
- detects default branch fallback;
- derives `.hermes-worktrees`.

### 6.5 `worktree-manager.ts`

Responsibilities:

- create branch and worktree;
- ensure branch name safe;
- inspect worktree status;
- remove worktree only with explicit call;
- prevent path traversal;
- never delete repo root.

Core functions:

```ts
createTaskWorktree(project, task): Promise<{ branchName: string; worktreePath: string }>
getWorktreeStatus(worktreePath): Promise<WorktreeStatus>
removeTaskWorktree(worktreePath, branchName, options): Promise<void>
```

Implementation detail:

```bash
git -C <repo> fetch --all --prune
git -C <repo> worktree add <worktreePath> -b <branchName> <baseRef>
```

Branch format:

```text
hermes/task-<task-id>-<slug>
```

Worktree path:

```text
<repo>/.hermes-worktrees/task-<task-id>-<slug>
```

Test cases with temp git repo:

- creates worktree;
- branch exists;
- worktree path under expected root;
- duplicate creation is idempotent or returns useful error;
- refuses unsafe branch slug;
- refuses removal outside worktree root.

### 6.6 `hermes-worker-runtime.ts`

Responsibilities:

- launch Hermes Agent worker in the task worktree;
- inject env vars;
- stream stdout/stderr into events;
- handle cancel;
- mark run completed/failed.

MVP command strategy:

1. First try a stable Hermes CLI non-interactive entrypoint if available.
2. If not available, add a tiny wrapper script later in `hermes-agent`.

Proposed env:

```text
HERMES_TASK_ID=<task-id>
HERMES_RUN_ID=<run-id>
HERMES_PROJECT_PATH=<repoPath>
HERMES_WORKTREE_PATH=<worktreePath>
HERMES_TASK_PORT=<allocated-port>
HERMES_WORKER_PROFILE=<profile-id>
```

Work packet prompt template:

```markdown
You are a Hermes Agent worker running under Hermes Workspace Multi-Agent Control Plane.

Role: <profile role>
Task: <title>
Project: <project name>
Worktree: <worktree path>

Work packet:
<workPacket>

Acceptance criteria:
- ...

Rules:
- Work only inside the worktree unless explicitly approved.
- Do not push, deploy, send external messages, or edit secrets without approval.
- Run relevant validation if practical.
- End with structured result: summary, files changed, validation, risks, blockers.
```

Test cases:

- builds prompt correctly;
- emits `run.started` and `run.log` events;
- handles process exit 0;
- handles process exit non-zero;
- cancel kills child process.

### 6.7 `diff-manager.ts`

Responsibilities:

- list changed files;
- produce unified diff;
- stage/unstage if needed;
- create diff artifact.

Commands:

```bash
git -C <worktree> status --porcelain
git -C <worktree> diff --stat
git -C <worktree> diff -- <path>
```

Test cases:

- no changes;
- modified file diff;
- untracked file appears;
- path filter safe.

### 6.8 `validation-runner.ts`

Responsibilities:

- run project validation commands in worktree;
- stream output to artifact;
- store pass/fail.

Validation source:

- project config if set;
- detected package manager shortcuts later.

MVP commands:

```text
lint
typecheck
test
build
custom
```

Test cases:

- command pass;
- command fail;
- timeout;
- output artifact saved.

### 6.9 `github-pr-manager.ts`

Responsibilities:

- verify `gh` exists;
- verify `gh auth status`;
- commit staged/all task changes;
- push branch;
- create PR;
- store PR artifact.

Commands:

```bash
git -C <worktree> add -A
git -C <worktree> commit -m <message>
git -C <worktree> push -u origin <branch>
gh pr create --repo <owner/repo> --title <title> --body <body> --head <branch> --base <base>
```

Approval requirement:

- `git push` and `gh pr create` require approval unless user globally configures allow for local-only repo.

Test cases:

- missing gh returns setup error;
- unauthenticated gh returns setup error;
- dry-run PR body generation;
- command construction does not shell-inject branch/title.

### 6.10 `approval-store.ts`

Responsibilities:

- create approval;
- resolve approval;
- list pending approvals;
- attach approvals to task/run.

MVP may not fully pause/resume the Hermes worker for all tool calls. It must at least gate built-in workspace actions:

- push branch;
- create PR;
- remove worktree;
- run custom shell validation if marked risky.

---

## 7. API routes

Create routes under `src/routes/api/ma/`.

```text
src/routes/api/ma/projects.ts
src/routes/api/ma/profiles.ts
src/routes/api/ma/tasks.ts
src/routes/api/ma/tasks/$taskId.ts
src/routes/api/ma/tasks/$taskId/start.ts
src/routes/api/ma/tasks/$taskId/events.ts
src/routes/api/ma/tasks/$taskId/diff.ts
src/routes/api/ma/tasks/$taskId/validate.ts
src/routes/api/ma/tasks/$taskId/commit.ts
src/routes/api/ma/tasks/$taskId/pr.ts
src/routes/api/ma/approvals.ts
src/routes/api/ma/approvals/$approvalId.resolve.ts
```

If TanStack file route syntax makes `$taskId` paths awkward, follow the existing project route conventions.

### 7.1 `GET /api/ma/projects`

Returns configured/detected projects.

### 7.2 `GET /api/ma/profiles`

Returns default Hermes Agent profiles.

### 7.3 `GET /api/ma/tasks`

Query params:

```text
project_id?
status?
```

### 7.4 `POST /api/ma/tasks`

Input:

```json
{
  "projectId": "...",
  "title": "...",
  "description": "...",
  "assigneeProfileId": "backend-engineer",
  "priority": "medium",
  "acceptanceCriteria": ["..."],
  "workPacket": "..."
}
```

Behavior:

- validates project;
- creates task in `backlog` or `ready`;
- emits `task.created`.

### 7.5 `POST /api/ma/tasks/:taskId/start`

Behavior:

- if no worktree, create worktree;
- create run;
- launch Hermes worker;
- task status `running`;
- emits `worktree.created`, `run.started`.

For first slice, implement only worktree creation and status transition; runtime can return `501 not implemented` until slice 2.

### 7.6 `GET /api/ma/tasks/:taskId/events`

Returns events. For live updates, start with polling; add SSE/WebSocket later if existing infra is easy.

### 7.7 `GET /api/ma/tasks/:taskId/diff`

Returns:

```json
{
  "changedFiles": [...],
  "stat": "...",
  "diff": "..."
}
```

### 7.8 `POST /api/ma/tasks/:taskId/validate`

Input:

```json
{ "type": "test" }
```

or

```json
{ "type": "custom", "command": "pnpm test" }
```

### 7.9 `POST /api/ma/tasks/:taskId/commit`

Requires approval if policy says so.

Input:

```json
{ "message": "feat: ..." }
```

### 7.10 `POST /api/ma/tasks/:taskId/pr`

Requires approval.

Input:

```json
{ "title": "...", "body": "...", "base": "main" }
```

### 7.11 `GET /api/ma/approvals`

Returns pending approvals.

### 7.12 `POST /api/ma/approvals/:approvalId/resolve`

Input:

```json
{ "decision": "approved" }
```

or

```json
{ "decision": "denied", "reason": "..." }
```

---

## 8. UI implementation

### 8.1 Route choice

Prefer extending existing conductor area instead of creating a separate product concept.

Recommended route:

```text
/conductor
```

Add a tab or primary mode:

```text
Agent Board
```

If existing conductor code is too entangled, create a temporary route:

```text
/agents
```

and link it from conductor later.

### 8.2 Components

Create or adapt:

```text
src/screens/gateway/components/multi-agent-board.tsx
src/screens/gateway/components/multi-agent-task-card.tsx
src/screens/gateway/components/multi-agent-task-detail.tsx
src/screens/gateway/components/multi-agent-create-task-dialog.tsx
src/screens/gateway/components/multi-agent-approvals-panel.tsx
src/screens/gateway/components/multi-agent-diff-view.tsx
src/screens/gateway/components/multi-agent-validation-panel.tsx
src/screens/gateway/components/multi-agent-pr-panel.tsx
```

Reuse existing components where possible:

- `task-board.tsx`
- `kanban-board.tsx`
- `approvals-panel.tsx`
- `approvals-page.tsx`
- `mission-event-log.tsx`
- `agent-output-panel.tsx`
- `task-card.tsx`

### 8.3 Board columns

```text
Backlog
Ready
Running
Needs Approval
Review
Blocked
Done
Failed
```

Column mapping:

```ts
const COLUMNS = [
  ['backlog', 'Backlog'],
  ['ready', 'Ready'],
  ['running', 'Running'],
  ['needs_approval', 'Needs Approval'],
  ['review', 'Review'],
  ['blocked', 'Blocked'],
  ['done', 'Done'],
  ['failed', 'Failed'],
]
```

### 8.4 Task card contents

Show:

- title;
- project;
- profile;
- status;
- branch name;
- latest event summary;
- approval count;
- changed files count;
- validation status.

### 8.5 Task detail tabs

```text
Overview
Work Packet
Events / Live Log
Approvals
Diff
Validation
PR
Artifacts
```

### 8.6 Create task dialog

Fields:

- project select;
- title;
- description;
- profile;
- priority;
- acceptance criteria textarea;
- work packet textarea;
- checkbox: create worktree immediately.

---

## 9. Worker prompt contracts

### 9.1 Work packet template

```markdown
### Work Packet
Role: <profile role>
Goal: <task title>
Context:
<task description>

Project:
- Name: <project name>
- Repo: <repo path>
- Worktree: <worktree path>
- Branch: <branch>

Constraints:
- Work only inside the task worktree.
- Do not push, create PRs, deploy, send external messages, or edit secrets without approval.
- Keep changes scoped to the task.
- Prefer TDD when practical.

Acceptance criteria:
- ...

Expected output:
- Summary
- Files changed
- Tests/validation run
- Risks/blockers
```

### 9.2 Worker result contract

Worker final answer must include:

```markdown
### Specialist Result
Role:
Summary:
Files changed:
Validation:
Risks:
Blockers:
Recommended next action:
```

`hermes-worker-runtime.ts` should parse this lightly later. MVP can store it as raw summary.

---

## 10. Approval policy

### 10.1 MVP gated actions

Always require approval:

- `git push`
- `gh pr create`
- worktree removal
- deploy commands
- env/secrets file edits detected in diff

Ask/flag:

- delete files;
- custom shell validation command;
- large diff over threshold.

Allowed without approval:

- create task;
- create local worktree;
- local diff read;
- local validation commands from project settings;
- local commit after explicit UI click.

### 10.2 Approval UI behavior

Approval card shows:

- task title;
- action;
- risk;
- command/payload preview;
- approve;
- deny;
- reason.

---

## 11. GitHub PR flow

### 11.1 Preflight checks

Before PR:

1. `git status --porcelain` has changes or commits ahead.
2. `gh --version` works.
3. `gh auth status` works.
4. remote GitHub repo detected.
5. validation status displayed; failed validation requires override.

### 11.2 PR body template

```markdown
## Summary
<task summary>

## Task
- Task ID: <id>
- Agent profile: <profile>
- Worktree: <path>

## Validation
- lint: pass/fail/not run
- typecheck: pass/fail/not run
- test: pass/fail/not run
- build: pass/fail/not run

## Risks / Notes
<risks>
```

---

## 12. Tests

### 12.1 Unit tests

Add tests near modules:

```text
src/server/multi-agent/store.test.ts
src/server/multi-agent/events.test.ts
src/server/multi-agent/project-resolver.test.ts
src/server/multi-agent/worktree-manager.test.ts
src/server/multi-agent/diff-manager.test.ts
src/server/multi-agent/validation-runner.test.ts
src/server/multi-agent/github-pr-manager.test.ts
src/server/multi-agent/approval-store.test.ts
```

### 12.2 Route tests

```text
src/routes/api/ma/-tasks.test.ts
src/routes/api/ma/-worktree-start.test.ts
src/routes/api/ma/-approvals.test.ts
src/routes/api/ma/-diff.test.ts
src/routes/api/ma/-validation.test.ts
```

Follow existing API route test patterns.

### 12.3 UI tests

```text
src/screens/gateway/components/multi-agent-board.test.tsx
src/screens/gateway/components/multi-agent-task-detail.test.tsx
src/screens/gateway/components/multi-agent-create-task-dialog.test.tsx
```

Minimum assertions:

- renders columns;
- renders task in correct column;
- create dialog validates required fields;
- task detail shows tabs;
- approvals panel shows pending approval.

### 12.4 Integration smoke

Manual smoke after implementation:

```bash
pnpm test -- src/server/multi-agent
pnpm test -- src/routes/api/ma
pnpm build
pnpm electron:dev
```

---

## 13. Step-by-step implementation tasks

## Task 0: Preserve current state

**Objective:** Avoid losing current user modifications.

**Steps:**

1. Run:
   ```bash
   git status --short
   git diff --stat
   ```
2. Create branch:
   ```bash
   git switch -c feature/multi-agent-control-plane-mvp
   ```
   If branch already exists, use it.
3. Save current dirty diff as patch before touching code:
   ```bash
   mkdir -p .runtime/patches
   git diff > .runtime/patches/pre-multi-agent-mvp.diff
   git status --short > .runtime/patches/pre-multi-agent-mvp.status.txt
   ```
4. Do not commit unrelated existing changes unless user explicitly approves.

**Validation:** Patch/status files exist.

---

## Task 1: Add domain types

**Objective:** Add multi-agent domain types without behavior.

**Files:**

- Create: `src/server/multi-agent/types.ts`

**Steps:**

1. Add types from Section 5.
2. Export all types.
3. Run typecheck/build if available.

**Validation:**

```bash
pnpm build
```

Expected: either pass or fail only on pre-existing unrelated issues; document result.

---

## Task 2: Add file-backed store

**Objective:** Persist tasks/profiles/runs/approvals/artifacts in `.runtime/multi-agent/state.json`.

**Files:**

- Create: `src/server/multi-agent/store.ts`
- Create: `src/server/multi-agent/store.test.ts`

**Implementation requirements:**

- `loadState()`
- `saveState(state)`
- `createTask(input)`
- `updateTask(id, patch)`
- `listTasks(filter?)`
- `createRun(input)`
- `updateRun(id, patch)`
- `createApproval(input)`
- `resolveApproval(id, decision)`
- `createArtifact(input)`

**Tests:**

- creates empty state if missing;
- writes and reads task;
- updates task status;
- resolves approval;
- handles malformed JSON safely.

**Validation:**

```bash
pnpm test -- src/server/multi-agent/store.test.ts
```

---

## Task 3: Add event log

**Objective:** Append/read task events as JSONL.

**Files:**

- Create: `src/server/multi-agent/events.ts`
- Create: `src/server/multi-agent/events.test.ts`

**Implementation requirements:**

- `appendTaskEvent(event)`
- `listTaskEvents(taskId)`
- `getLatestTaskEvent(taskId)`
- safe task ID filename handling.

**Validation:**

```bash
pnpm test -- src/server/multi-agent/events.test.ts
```

---

## Task 4: Add project resolver

**Objective:** Resolve existing workspace projects into multi-agent projects.

**Files:**

- Create: `src/server/multi-agent/project-resolver.ts`
- Create: `src/server/multi-agent/project-resolver.test.ts`
- Possibly modify: `src/server/project-registry.ts` only if needed.

**Implementation requirements:**

- `resolveProject(input)`
- `isGitRepo(path)`
- `detectDefaultBranch(repoPath)`
- `detectGithubRemote(repoPath)`
- `defaultWorktreeRoot(repoPath)`

**Validation:**

```bash
pnpm test -- src/server/multi-agent/project-resolver.test.ts
```

---

## Task 5: Add worktree manager

**Objective:** Create isolated git worktrees for tasks.

**Files:**

- Create: `src/server/multi-agent/worktree-manager.ts`
- Create: `src/server/multi-agent/worktree-manager.test.ts`

**Implementation requirements:**

- safe branch names;
- safe worktree paths;
- temp git repo tests;
- idempotent helpful errors.

**Core function:**

```ts
createTaskWorktree(project, task): Promise<{ branchName: string; worktreePath: string }>
```

**Validation:**

```bash
pnpm test -- src/server/multi-agent/worktree-manager.test.ts
```

---

## Task 6: Add initial API routes for tasks/projects/profiles

**Objective:** Expose project/profile/task APIs.

**Files:**

- Create: `src/routes/api/ma/projects.ts`
- Create: `src/routes/api/ma/profiles.ts`
- Create: `src/routes/api/ma/tasks.ts`
- Create tests following existing route conventions.

**Endpoints:**

- `GET /api/ma/projects`
- `GET /api/ma/profiles`
- `GET /api/ma/tasks`
- `POST /api/ma/tasks`

**Validation:**

```bash
pnpm test -- src/routes/api/ma
```

---

## Task 7: Add start task route with worktree creation only

**Objective:** Implement first slice: task → worktree → board-ready status.

**Files:**

- Create: `src/routes/api/ma/tasks/$taskId.start.ts` or repo-conventional equivalent.
- Modify store/events as needed.

**Behavior:**

- loads task;
- resolves project;
- creates worktree;
- stores branch/worktree path;
- emits event;
- status transitions to `ready` or `running_stub` depending UI needs.

For this task, do **not** launch Hermes worker yet.

**Validation:**

- route test creates a temp git repo and verifies worktree path.

---

## Task 8: Add Agent Board UI basic

**Objective:** Render tasks by status and allow task creation/start.

**Files:**

- Create: `src/screens/gateway/components/multi-agent-board.tsx`
- Create: `src/screens/gateway/components/multi-agent-task-card.tsx`
- Create: `src/screens/gateway/components/multi-agent-create-task-dialog.tsx`
- Modify: `src/screens/gateway/conductor.tsx` or add a tab/section.

**UI behavior:**

- fetch profiles/projects/tasks;
- create task;
- start task;
- show branch/worktree after start.

**Validation:**

```bash
pnpm test -- src/screens/gateway/components/multi-agent-board.test.tsx
pnpm build
```

---

## Task 9: Add Hermes worker runtime

**Objective:** Launch Hermes Agent worker process in task worktree.

**Files:**

- Create: `src/server/multi-agent/hermes-worker-runtime.ts`
- Create: `src/server/multi-agent/hermes-worker-runtime.test.ts`
- Modify start route to launch worker.

**Implementation note:**

First inspect available Hermes CLI non-interactive options. If no clean option exists, create an internal wrapper later. For MVP plan execution, do not block earlier slices on perfect worker runtime.

**Validation:**

- unit test with fake command;
- manual test with real Hermes only after API works.

---

## Task 10: Add event polling / live log panel

**Objective:** Show worker events/logs in task detail.

**Files:**

- Create: `src/screens/gateway/components/multi-agent-task-detail.tsx`
- Create: `src/screens/gateway/components/multi-agent-event-log.tsx`
- Create route: `GET /api/ma/tasks/:taskId/events`

**MVP:** Poll every 1–2 seconds. SSE/WebSocket later.

---

## Task 11: Add diff manager and UI

**Objective:** Show changed files and unified diff for worktree.

**Files:**

- Create: `src/server/multi-agent/diff-manager.ts`
- Create route: `GET /api/ma/tasks/:taskId/diff`
- Create: `src/screens/gateway/components/multi-agent-diff-view.tsx`

**Validation:**

- temp git repo test;
- UI renders no-change and changed states.

---

## Task 12: Add validation runner

**Objective:** Run configured validation commands in task worktree.

**Files:**

- Create: `src/server/multi-agent/validation-runner.ts`
- Create route: `POST /api/ma/tasks/:taskId/validate`
- Create: `src/screens/gateway/components/multi-agent-validation-panel.tsx`

**MVP commands:**

- lint;
- typecheck;
- test;
- build;
- custom.

**Validation:**

- pass/fail command tests;
- output artifact saved.

---

## Task 13: Add approval store and UI

**Objective:** Basic unified approvals for workspace actions.

**Files:**

- Create: `src/server/multi-agent/approval-store.ts` if not folded into `store.ts`.
- Create routes:
  - `GET /api/ma/approvals`
  - `POST /api/ma/approvals/:approvalId/resolve`
- Create/modify:
  - `src/screens/gateway/components/multi-agent-approvals-panel.tsx`

**MVP gated actions:**

- push;
- PR create;
- worktree removal;
- risky custom shell command.

---

## Task 14: Add GitHub PR manager

**Objective:** Commit, push, and create GitHub PR from task worktree.

**Files:**

- Create: `src/server/multi-agent/github-pr-manager.ts`
- Create route: `POST /api/ma/tasks/:taskId/pr`
- Create: `src/screens/gateway/components/multi-agent-pr-panel.tsx`

**Preflight:**

- `gh --version`;
- `gh auth status`;
- GitHub remote exists;
- branch exists;
- validation status visible.

**Approval:**

- route creates approval if not approved;
- after approval, executes push/PR.

---

## Task 15: Add memory hooks MVP

**Objective:** Persist useful task result context.

**MVP behavior:**

- task final summary stored in task/run;
- optional button: “Save summary to Obsidian”.

**Files:**

- Create: `src/server/multi-agent/memory-sync.ts`
- Create route: `POST /api/ma/tasks/:taskId/save-summary`

**Obsidian path default:**

```text
~/ai-workspace/knowledge/obsidian-vault/Hermes/Multi-Agent Runs/
```

Do not auto-write too much. Keep notes concise.

---

## Task 16: Electron smoke

**Objective:** Ensure desktop shell still opens after web flow.

**Commands:**

```bash
pnpm build
pnpm electron:dev
```

If Electron issues are unrelated to MVP, document and keep web UI working.

---

## Task 17: Documentation

**Objective:** Document usage and architecture.

**Files:**

- Create: `docs/multi-agent-mvp.md`
- Update: `docs/troubleshooting.md` if needed.

Include:

- how to start workspace;
- how to create task;
- worktree layout;
- PR requirements;
- approval behavior;
- known limitations.

---

## 14. Execution order summary

```text
0. Preserve current state
1. Domain types
2. Store
3. Events
4. Project resolver
5. Worktree manager
6. Projects/profiles/tasks API
7. Start task route creates worktree
8. Board UI basic
9. Hermes worker runtime
10. Task detail + event log
11. Diff manager + UI
12. Validation runner + UI
13. Approval queue
14. GitHub PR manager + UI
15. Memory hooks
16. Electron smoke
17. Docs
```

---

## 15. Definition of Done

MVP is complete when:

- [ ] User can create a task in Hermes Workspace.
- [ ] Task appears on Agent Board.
- [ ] Starting task creates isolated git worktree and branch.
- [ ] Hermes Agent worker can run in that worktree.
- [ ] Task detail shows run events/logs.
- [ ] Task detail shows changed files/diff.
- [ ] User can run validation commands.
- [ ] User can approve push/PR creation.
- [ ] System can create GitHub PR via `gh`.
- [ ] Task stores final summary/artifacts.
- [ ] Web build passes or known unrelated failures are documented.
- [ ] Electron dev shell opens or known unrelated issue is documented.
- [ ] Docs explain the flow.

---

## 16. Key risks and mitigations

### Risk: Hermes Agent has no stable worker CLI

Mitigation:

- Make `hermes-worker-runtime.ts` command configurable.
- Use fake command in tests.
- Add thin Hermes Agent wrapper later if needed.

### Risk: Approval bridge into Hermes tools is complex

Mitigation:

- MVP gates workspace actions first: push, PR, delete, risky custom command.
- Worker-level tool approval integration can be Phase 2.

### Risk: Current dirty state conflicts

Mitigation:

- Patch/checkpoint first.
- Use small commits/slices.
- Avoid editing existing conductor files until board integration task.

### Risk: Worktree cleanup is dangerous

Mitigation:

- Never auto-delete worktrees in MVP.
- Cleanup requires explicit approval.
- Path containment tests required.

### Risk: PR flow depends on GitHub auth

Mitigation:

- Preflight `gh auth status`.
- Show actionable setup error.

### Risk: Electron distracts from core flow

Mitigation:

- Web UI is source of truth.
- Electron only smoke-tested after core flow.

---

## 17. Post-MVP roadmap

After MVP:

1. Task groups and parallelism slider.
2. Orchestrator-generated task graph with user approval.
3. CI failure reaction loop.
4. GitHub review-comment reaction loop.
5. Inline diff comments → fix tasks.
6. Full Hermes tool approval bridge.
7. Graphify update button after code changes.
8. Obsidian automatic decision logging.
9. Remote SSH workers.
10. Additional runtimes only if needed.

---

## 18. Approval request

Recommended approved MVP:

```text
Hermes Workspace Multi-Agent Control Plane MVP
= web-first Agent Board
+ Hermes Agent workers only
+ worktree isolation
+ live logs/events
+ diff and validation
+ basic unified approvals
+ GitHub PR creation
+ Electron shell smoke
```

If approved, start with Task 0 and Task 1. Do not begin implementation until current dirty state is preserved.
