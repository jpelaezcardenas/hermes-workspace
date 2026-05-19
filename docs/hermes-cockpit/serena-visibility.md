# Hermes Cockpit Serena Visibility

**Milestone:** M008
**Date:** 2026-05-17
**Purpose:** Record what Serena can currently see before the next Cockpit adapter milestone.

## Mapping

Joe clarified that Serena's project folder through Windows is:

```text
\\TOWER\The Goods\Serena-Projects
```

Inside Serena MCP this appears as:

```text
/workspace/project
```

## Current Serena listing

Serena `list_dir` for `/workspace/project` currently shows:

```json
{"dirs": ["eos-ratatui-client", ".serena"], "files": []}
```

## Visibility result

`/home/joe/hermes-workspace` and the current Cockpit prototype under:

```text
/home/joe/hermes-workspace/prototypes/hermes-cockpit
```

are **not currently visible inside Serena's project root**.

This means Serena can still be useful for analogous code/pattern inspection in projects that are already under `\\TOWER\The Goods\Serena-Projects` — for example the EOS Ratatui `TestBackend` pattern — but it cannot semantically inspect or edit the current Cockpit prototype until the project is made visible there.

## Next action

Do not create a shadow copy or mutate a second tree automatically.

Recommended safe options:

1. **Preferred for semantic code work:** place or mirror the Cockpit workspace/prototype under `\\TOWER\The Goods\Serena-Projects` so Serena MCP can activate it from `/workspace/project`.
2. **Preferred for Pi-local continuity:** keep code in `/home/joe/hermes-workspace` and use GSD/file/shell tools for edits, while using Serena only for visible reference projects.
3. **Before any copy/mirror:** decide which tree is canonical to avoid split-brain edits.

For M008, continue with GSD/file/shell for `/home/joe/hermes-workspace` unless Joe explicitly asks to move or mirror this workspace into Serena's Windows project folder.
