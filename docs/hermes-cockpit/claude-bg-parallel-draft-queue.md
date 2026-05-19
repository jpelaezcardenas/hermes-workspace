# Claude BG Parallel Draft Queue

## Purpose

M021 adds a delegation planning layer for Claude BG lifecycle work. It drafts multiple M019-compatible launch request files from one workflow plan and emits a M020-compatible `claude_lifecycle_requests` projection so Cockpit can show parallel lanes before any worker is launched.

This is a draft/request layer only.

## Operator loop

```text
workflow plan -> draft helper -> request JSON files + lifecycle projection -> Cockpit review -> manual M019 prepare/grant/apply later
```

No Claude invocation happens during drafting.

## Plan schema

A plan JSON should contain:

- `workflow_id`: stable id for the delegation bundle.
- `registry_path`: registry that later M019 launch applies should append to.
- `output_root`: directory for generated request files and projection.
- `defaults`: shared `host`, `repo_path`, `permission_mode`, and optional `worktree_root`.
- `lanes`: array of parallel workflow lanes.

Each lane should include:

- `lane_id`: stable lane id such as `wf1_docs`.
- `display_name`: operator-facing name.
- `delegation_role`: e.g. `docs-scout`, `implementation`, `reviewer`, `verifier`.
- `priority`: e.g. `high`, `normal`, `low`.
- `task`: prompt/task text for the future Claude BG launch.
- `depends_on`: array of lane ids.
- optional `permission_mode`, overriding defaults.
- optional `worktree_path`, required for write-capable modes.

## Outputs

For each lane, the helper writes:

```text
<output_root>/requests/<lane_id>-launch-request.json
```

Each request file uses the M019 prepare-launch shape:

- `operation_id`
- `display_name`
- `task`
- `host`
- `repo_path`
- `worktree_path`
- `permission_mode`

The helper also writes a projection file such as:

```text
<output_root>/claude-lifecycle-projection.json
```

Each `claude_lifecycle_requests` row should include M020 fields plus delegation metadata:

- `lane_id`
- `delegation_role`
- `priority`
- `depends_on`
- `next_cli_command`
- `safety_labels`

The next CLI command should point to M019 prepare-launch, not apply-launch.

## Required TUI metadata

Cockpit should render:

- lane id
- delegation role
- priority
- dependencies
- action/status
- operation id
- request/evidence/grant/result paths
- next CLI command

Required labels remain:

- `REQUEST ONLY`
- `DISPLAY ONLY`
- `CLI required`
- `No TUI apply`
- `Migi verifies; GSD is truth`

## No-go conditions

The helper must reject:

- duplicate `lane_id`
- unknown dependencies
- `claude -p` in task text
- secret-like task text such as `token=...`, `api_key=...`, `password=...`, or `secret=...`
- write-capable modes without `worktree_path`
- output/projection paths outside `output_root`
- missing `host`, `repo_path`, or `permission_mode`

## Non-claims

- No Claude invocation.
- No TUI apply/launch/stop/attach.
- No hidden `claude -p` default.
- No auto-commit or push.
- No GSD/Kanban/Hermes source-of-truth mutation.
- Not production-ready.
