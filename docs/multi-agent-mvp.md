# Hermes Multi-Agent Control Plane MVP

Hermes Multi-Agent Control Plane is a local, single-user workflow for running Hermes Agent workers against isolated git worktrees from the Hermes Workspace UI.

The MVP flow is:

```text
Configure project → Create task → Start isolated worktree + worker → Watch events/diff → Run validation → Approve PR action → Create GitHub PR → Save final summary
```

## Scope

This MVP is intentionally local-first:

- one local user;
- Hermes Agent runtime only;
- web UI first, Electron shell smoke-tested separately;
- file-backed local state under `.runtime/multi-agent/` by default;
- explicit approvals for risky/external actions.

Out of scope for this MVP: team accounts, multi-tenant auth, remote worker fleets, automatic deploys, and non-Hermes runtimes such as Claude/Codex/OpenCode workers.

## Start the workspace

1. Install dependencies if needed:

   ```bash
   pnpm install
   ```

2. Configure at least one git project for the Agent Board.

   Single-project setup:

   ```bash
   export HERMES_MA_PROJECT_PATH=/absolute/path/to/git/repo
   ```

   Multi-project setup:

   ```bash
   export HERMES_MA_PROJECTS_JSON='[
     {
       "id": "workspace",
       "name": "Hermes Workspace",
       "repoPath": "/absolute/path/to/git/repo",
       "defaultBranch": "main",
       "validation": {
         "test": "pnpm test",
         "build": "pnpm build"
       }
     }
   ]'
   ```

   Project paths must exist and must be git repositories. If `worktreeRoot` is omitted, the default is:

   ```text
   <repoPath>/.hermes-worktrees/
   ```

3. Start Hermes Workspace:

   ```bash
   pnpm dev
   ```

4. Open the workspace in the browser and go to the Conductor / Agent Board area. The board loads projects from `GET /api/ma/projects`, profiles from `GET /api/ma/profiles`, and tasks from `GET /api/ma/tasks`.

### Useful environment variables

| Variable | Purpose |
|---|---|
| `HERMES_MA_PROJECT_PATH` | Configure one local git project. |
| `HERMES_MA_PROJECTS_JSON` | Configure multiple projects and validation commands. |
| `HERMES_MA_STATE_FILE` | Override the local state file path. Defaults to `.runtime/multi-agent/state.json`. |
| `HERMES_MA_EVENT_LOG` | Override the task event JSONL log path. |
| `HERMES_MA_WORKER_COMMAND` | Test/development override for worker command. Default runtime uses Hermes Agent. |
| `HERMES_MA_WORKER_ARGS_JSON` | Test/development override for worker args as a JSON string array. |
| `HERMES_MA_OBSIDIAN_RUNS_DIR` | Override where final summaries are saved as Markdown notes. |
| `HERMES_MA_GH_MOCK=1` | Test-only mock for GitHub PR route. Do not use for real PR creation. |

## Create a task

1. Click **Create task** on the Agent Board.
2. Choose a configured project and worker profile.
3. Fill in:
   - title;
   - priority;
   - description;
   - work packet;
   - acceptance criteria, one per line.
4. Submit the form.

The UI posts to `POST /api/ma/tasks`. The task is stored in local state and appears in the board column matching its status.

Task fields that matter operationally:

- `projectId` — must match a configured project;
- `assigneeProfileId` — selects the worker profile;
- `workPacket` — primary instructions passed to the worker;
- `acceptanceCriteria` — checklist used for review/validation;
- `branchName` and `worktreePath` — filled after start;
- `latestRunId` and `finalSummary` — filled by worker/memory hooks.

## Start a task and worktree layout

Click **Start** on a task card. The start route:

```text
POST /api/ma/tasks/:taskId/start
```

performs this sequence:

1. resolves the configured project;
2. creates an isolated git worktree if the task does not already have one;
3. creates a run record;
4. launches a Hermes Agent worker for the task;
5. appends task events to the event log.

Default branch name format:

```text
hermes/task-<task-id>-<slugified-task-title>
```

Default worktree path format:

```text
<project.worktreeRoot>/task-<task-id>-<slugified-task-title>/
```

Example:

```text
repoPath:      /home/me/projects/app
worktreeRoot: /home/me/projects/app/.hermes-worktrees
branch:       hermes/task-task-abc123-add-validation-ui
worktree:     /home/me/projects/app/.hermes-worktrees/task-task-abc123-add-validation-ui
```

Safety behavior:

- the worktree path must stay inside `project.worktreeRoot`;
- the repository root is never used as the task worktree;
- an existing path that is not the registered worktree for the branch returns a conflict;
- worktree removal is not an automatic MVP action and should require explicit approval when added.

## Events, diff, and validation

The task detail panel shows:

- **Events / Live Log** from `GET /api/ma/tasks/:taskId/events`;
- **Diff** from `GET /api/ma/tasks/:taskId/diff`;
- **Validation** history from `GET /api/ma/tasks/:taskId/validate`.

Validation is started from the task detail panel:

```text
POST /api/ma/tasks/:taskId/validate
```

Supported validation types:

- `lint`
- `typecheck`
- `test`
- `build`
- `custom` — intentionally approval-gated/rejected in the MVP unless approval support is extended.

Validation commands are resolved from the selected project's `validation` config. Example:

```json
{
  "validation": {
    "lint": "pnpm lint",
    "test": "pnpm exec vitest run src/server/multi-agent/store.test.ts",
    "build": "pnpm build"
  }
}
```

Non-zero validation command exits are represented as `validation.status: "failed"`; they are not treated as HTTP transport failures. Full validation output is written under `.runtime/multi-agent/artifacts/validation-output/`, and the validation record stores an output artifact id.

## Approval behavior

The MVP uses an explicit approval queue for risky actions. Approval records are listed by:

```text
GET /api/ma/approvals
```

and resolved by:

```text
POST /api/ma/approvals/:approvalId/resolve
```

with:

```json
{ "decision": "approved" }
```

or:

```json
{ "decision": "denied" }
```

Always require approval for:

- `git push`;
- `gh pr create`;
- worktree removal;
- deploy commands;
- edits to environment files or secrets detected in diff.

Allowed without approval in the MVP:

- creating a task;
- creating a local git worktree;
- reading local diff;
- running configured validation commands from project settings;
- local commit after an explicit UI action, when implemented.

The current PR flow creates a `github.pr_create` approval before pushing or calling `gh pr create`.

## GitHub PR requirements

The PR panel calls:

```text
POST /api/ma/tasks/:taskId/pr
```

Before a PR can be created, the preflight checks require:

1. the task has `worktreePath` and `branchName`;
2. the `gh` CLI is installed (`gh --version`);
3. `gh auth status` succeeds;
4. the worktree has an `origin` remote;
5. the current worktree branch matches the task branch;
6. at least one validation for the task has `status: "passed"`;
7. a `github.pr_create` approval has been approved.

When approved, the route runs:

```bash
git push -u origin <task.branchName>
gh pr create --title <title> --body <body> --base <baseBranch> --head <task.branchName>
```

The created PR URL is saved as a `github-pr` artifact and the task moves to `review`.

## Memory hooks and final summaries

Task summaries can be saved through:

```text
POST /api/ma/tasks/:taskId/save-summary
```

The summary is persisted in both:

- latest run: `run.summary`;
- task: `task.finalSummary`.

If `saveToObsidian: true` is sent, the server writes a Markdown note. Default path:

```text
~/ai-workspace/knowledge/obsidian-vault/Hermes/Multi-Agent Runs/
```

Override it with:

```bash
export HERMES_MA_OBSIDIAN_RUNS_DIR=/absolute/path/to/Obsidian/Multi-Agent\ Runs
```

Notes include task/run metadata, summary, work packet, and acceptance criteria. Do not store credentials, API keys, or secrets in summaries.

## Local state and artifacts

Default state layout:

```text
.runtime/multi-agent/
  state.json
  events.jsonl
  artifacts/
    validation-output/
      <validation-id>.log
```

The state file stores projects, profiles, tasks, runs, approvals, validations, and artifact metadata. Large command output should stay in artifact files instead of `state.json`.

## Electron smoke

The web flow is primary for the MVP. Electron shell smoke is available to ensure the desktop wrapper can still open after web changes:

```bash
pnpm build
pnpm electron:bundle-server
pnpm smoke:electron
```

`pnpm smoke:electron` sets `HERMES_ELECTRON_SMOKE=1`, loads the local production shell, and exits after the app shell loads.

If Electron fails with `Electron failed to install correctly`, repair the local binary:

```bash
node node_modules/.pnpm/electron@40.9.3/node_modules/electron/install.js
pnpm exec electron --version
```

## Known limitations

- Single-user local app; no team accounts or multi-tenant auth.
- Hermes Agent is the only worker runtime in the MVP.
- The app uses file-backed local state, not a database.
- Approval coverage is focused on push/PR/custom risky actions; deeper policy automation is future work.
- Worktree cleanup is intentionally not automatic.
- Validation command safety depends on project configuration; avoid placing destructive commands in configured validation slots.
- PR creation depends on local `git`, `gh`, remotes, and authentication.
- Final summaries are manually saved; the MVP does not auto-write every run to Obsidian.
- Browser web UI is the primary supported surface; Electron is smoke-tested but not the primary implementation surface.

## Quick verification checklist

Use this checklist when validating the MVP locally:

```bash
# Build web app and generated routes
pnpm build

# Multi-agent targeted tests, if changing code
pnpm exec vitest run src/server/multi-agent/*.test.ts src/routes/api/ma/*.test.ts --pool forks --no-file-parallelism

# Electron shell smoke, if touching desktop wrapper
pnpm electron:bundle-server
pnpm smoke:electron
```

Manual flow:

1. Start `pnpm dev` with `HERMES_MA_PROJECT_PATH` or `HERMES_MA_PROJECTS_JSON` set.
2. Create a task from the Agent Board.
3. Start the task and confirm branch/worktree appear in task detail.
4. Watch events and diff update.
5. Run at least one configured validation.
6. Request PR creation and approve the generated approval.
7. Create the PR and confirm the PR artifact appears.
8. Save a final summary, optionally to Obsidian.
