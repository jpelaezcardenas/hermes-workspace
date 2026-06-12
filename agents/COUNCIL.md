# Specialized Agent Council

Invocation skill: `agent-council` (`/agent council`)

| Agent | Profile | Workspace path | MemPalace palace | Wing | Role |
|---|---|---|---|---|---|
| Hermes | `agent-hermes` | `/home/carme/hermes-workspace/agents/hermes` | `/home/carme/.mempalace/palaces/hermes` | `hermes` | Hermes Agent/platform operator and toolchain maintainer |
| Faust | `faust` | `/home/carme/hermes-workspace/agents/faust` | `/home/carme/.mempalace/palaces/faust` | `faust` | AGI-in-progress meta-operator and learning steward |
| Kiki | `kiki` | `/home/carme/hermes-workspace/agents/kiki` | `/home/carme/.mempalace/palaces/kiki` | `kiki` | Creative/product/interface intuition agent |
| Juju | `juju` | `/home/carme/hermes-workspace/agents/juju` | `/home/carme/.mempalace/palaces/juju` | `juju` | Ops/automation/reliability execution agent |
| Socrates | `socrates` | `/home/carme/hermes-workspace/agents/socrates` | `/home/carme/.mempalace/palaces/socrates` | `socrates` | Critical reasoning and decision-quality agent |

Parallel attendance:
- Lightweight attendance uses Hermes `delegate_task` in parallel waves.
- Profile-backed durable attendance uses `hermes --profile <profile> chat -q ...`.
- Controller verifies file/system claims after the council returns.

Known platform note:
- `mempalace` CLI and `mempalace-mcp` are installed in WSL; semantic MemPalace search is available through the configured MCP servers and explicit `--palace` CLI calls.
