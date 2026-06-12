# Hermes Workspace Agent Contract

This workspace uses semantic Hermes swarm workers, not numbered-only lanes. The source of truth for routing is `swarm.yaml`; each worker also has a matching profile under `~/.hermes/profiles/<worker-id>/`, a role skill `<worker-id>-core`, and a wrapper in `~/.local/bin/`.

## Shared MemPalace + specialized council install

The named peer agents are Hermes, Faust, Socrates, Kiki, and Juju. Their filesystem wiring lives under `agents/<agent>/`, their Hermes profiles live under `~/.hermes/profiles/<profile>/`, and their MemPalace wings live under `~/.mempalace/palaces/<agent>/wings/<agent>/`.

- `/agent council` is represented by the enabled Hermes skill `agent-council`.
- Faust is wired as the AGI-in-progress meta-operator and learning steward.
- MemPalace filesystem wings are present. The `mempalace` CLI and `mempalace-mcp` are installed in WSL, and default plus per-profile MCP servers are configured with explicit palace paths.
- Serialize MemPalace writes. Do not run parallel write/mining operations against the same palace.

## Current semantic roster

| Worker | Wrapper | Tools | Skills | MCP | Plugins |
|---|---|---|---|---|---|
| `agent-hermes` | `agent-hermes:council` | terminal, file, session_search, skills, memory, delegation | agent-council, hermes-agent | mempalace-hermes | none |
| `faust` | `faust:council` | terminal, file, session_search, skills, memory, delegation | agent-council, faust-core, cavekit-methodology, cavekit-validation-first, cavekit-revision, cavekit-design-system, caveman-compress, plugin-creator | mempalace-faust | none |
| `kiki` | `kiki:council` | terminal, file, session_search, skills, memory, delegation | agent-council, ai-coding-agents | mempalace-kiki | none |
| `juju` | `juju:council` | terminal, file, session_search, skills, memory, delegation | agent-council, ai-coding-agents | mempalace-juju | none |
| `socrates` | `socrates:council` | terminal, file, session_search, skills, memory, delegation | agent-council, ai-coding-agents | mempalace-socrates | none |
| `orchestrator` | `orchestrator:plan` | todo, kanban, delegation, terminal, file, gbrain, session_search, cronjob, skills, clarify, web | orchestrator-core, gstack-for-hermes, gbrain, kanban-orchestrator, subagent-driven-development, writing-plans, requesting-code-review, workspace-dispatch | gbrain | none |
| `km-agent` | `km:health` | gbrain, file, terminal, session_search, skills, todo, cronjob, web | km-agent-core, gbrain, obsidian-markdown, obsidian-cli, obsidian-bases, json-canvas, gstack-for-hermes | gbrain | none |
| `builder` | `builder:task` | terminal, file, browser, web, gbrain, session_search, skills, todo | builder-core, gstack-for-hermes, test-driven-development, systematic-debugging, github-pr-workflow, requesting-code-review, codebase-inspection | gbrain | none |
| `reviewer` | `reviewer:gate` | terminal, file, web, gbrain, session_search, skills | reviewer-core, requesting-code-review, github-code-review, systematic-debugging, gstack-for-hermes, gbrain, codebase-inspection | gbrain | none |
| `qa` | `qa:smoke` | browser, terminal, file, vision, gbrain, session_search, skills, web | qa-core, browser-harness-power-use, dogfood, gstack-for-hermes | gbrain | none |
| `researcher` | `researcher:quick` | gbrain, web, browser, terminal, file, vision, session_search, skills, todo | researcher-core, gbrain, autoresearch, browser-harness-power-use, gstack-for-hermes, researcher-quick, researcher-autoresearch, arxiv, youtube-content, polymarket | gbrain | none |
| `ops-watch` | `ops:health` | terminal, cronjob, file, gbrain, skills, session_search, web | ops-watch-core, gbrain, hermes-agent, systematic-debugging, webhook-subscriptions | gbrain | none |
| `maintainer` | `maintainer:check` | terminal, file, web, browser, gbrain, session_search, skills | maintainer-core, github-repo-management, github-pr-workflow, github-issues, github-code-review, gbrain, gstack-for-hermes, hermes-agent | gbrain | none |
| `strategist` | `strategist:review` | gbrain, web, session_search, file, skills, todo, clarify | strategist-core, gstack-for-hermes, gbrain, writing-plans, polymarket | gbrain | none |
| `inbox-triage` | `inbox:triage` | gbrain, web, file, session_search, todo, skills, terminal | inbox-triage-core, gbrain, obsidian-markdown, gstack-for-hermes, defuddle, youtube-content | gbrain | none |

## Operating rules

- Keep `swarm.yaml`, profile `config.yaml`, profile core skills, and wrappers aligned when changing a worker.
- Prefer GBrain-first lookup for context-sensitive RAZSOC/Hermes/workflow decisions.
- Builder implements; Reviewer gates; QA verifies behavior; Orchestrator routes and enforces greenlight.
- Do not enable optional Hermes plugins globally unless the task explicitly needs them; record plugin/toolset alignment in `swarm.yaml` first.
