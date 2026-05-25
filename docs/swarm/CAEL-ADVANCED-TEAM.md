# Cael Advanced Agent Team

Cael should stay on the fast lane for conversation, routing, inbox triage, and low-risk health checks. Premium models are reserved for bounded specialist work with a clear proof contract.

## Runtime Model

Google documents `gemini-3.5-flash` as the stable Gemini 3.5 Flash model code. Its supported inputs are text, image, video, audio, and PDF, with text output; image generation is not supported by this model, so image generation remains routed through the active ChatGPT/Codex image backend.

| Lane | Worker | Model | Use |
| --- | --- | --- | --- |
| Router | `orchestrator` / Cael Router | GPT-5.3 Spark | Fast daily driver, intent routing, task decomposition, greenlight enforcement. |
| Triage | `inbox-triage` | GPT-5.3 Spark | Low-cost capture, discard, task routing, and reading queue sorting. |
| Ops | `ops-watch` | GPT-5.3 Spark | Health checks, local diagnostics, first-pass incident triage. |
| Build | `builder` | GPT-5.5 | Focused implementation with tests and integration proof. |
| Review | `reviewer` | Claude Opus 4.7 | Independent logic, security, and merge-readiness gate. |
| QA | `qa` | GPT-5.5 | Browser, CLI, workflow, and user-visible smoke verification. |
| Research | `researcher` | Gemini 3.1 Pro Preview | Current external research, source trails, options analysis. |
| Multimodal | `multimodal` | Gemini 3.5 Flash | Screenshots, visual reasoning, image/PDF analysis, design critique, and prompt briefs for image generation. |
| Memory | `km-agent` | GPT-5.5 | Second-brain curation, durable handoffs, drift audits. |
| Strategy | `strategist` | GPT-5.5 | Bets, kill criteria, operating plans, prioritization. |
| Maintenance | `maintainer` | GPT-5.5 | Dependency, upstream, patch hygiene, release follow-through. |

## Routing Rules

- Cael Router handles the first pass unless the task is already clearly specialist-owned.
- Spark lanes can execute low-risk, reversible diagnostics and classification.
- Builder changes code only from a scoped acceptance contract.
- Reviewer is independent of Builder and should gate merge/readiness claims.
- QA provides concrete behavior proof for web, desktop, PWA, CLI, and workflow changes.
- Multimodal handles visual inputs and generates structured briefs for the active ChatGPT/Codex image-generation backend.
- Researcher must preserve source trails and uncertainty; KM Agent decides what becomes durable memory.

## Greenlight Gates

Final user review is required for destructive actions, credential changes, external sends, production deploys, irreversible decisions, merges, pushes, source-of-record changes, and broad publish actions.

## BigMac Sync

`swarm.yaml` is the source of truth. Apply it to BigMac runtime profiles and wrappers with:

```bash
node /Users/cderamos/StorageRuntime/hermes-workspace-cael/scripts/sync-swarm-runtime.mjs
```

The script creates `~/.hermes/profiles/<worker-id>/config.yaml`, profile identity files, and wrapper commands under `~/.local/bin/`.
