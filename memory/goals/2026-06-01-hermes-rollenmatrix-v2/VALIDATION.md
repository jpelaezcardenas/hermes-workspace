# Validation - Hermes Rollenmatrix v2

Date: 2026-06-01
Status: superseded-by-nous-cutover

## Post-Validation Update

After this policy-only validation was written, Chris approved the urgent Nous-to-Codex cutover because the Nous subscription ends on 2026-06-06. The current active model defaults are now tracked in:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-nous-to-codex-cutover/VALIDATION.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/nous-to-codex-cutover-2026-06-01.md`

## Source Files Read

- `/Users/zondrius/Documents/New project 6/hermes-agent-bestandsaudit.md`
- `/Users/zondrius/Documents/New project 6/hermes-agent-operating-system.md`
- `/Users/zondrius/hermes-workspace/docs/swarm/ROLES.md`
- `/Users/zondrius/hermes-workspace/docs/swarm/SKILLS.md`
- `/Users/zondrius/hermes-workspace/src/screens/swarm2/swarm2-screen.tsx`
- `/Users/zondrius/hermes-workspace/src/server/swarm-model-resolver.ts`
- `/Users/zondrius/.hermes/profiles/coder/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/finance/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/ideas/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/lernwerkstatt/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/memory/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/neva/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/research/config.yaml` first six lines only
- `/Users/zondrius/.hermes/profiles/schule/config.yaml` first six lines only
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/VALIDATION.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-layer-2026-06-01.md`

## Current Work Conflict Notes

- The Hermes Workspace has active dirty code related to Execution Layer and other project work.
- This goal did not touch any existing `src/**` files.
- `handoff/codex-inbox` was empty during this setup check.
- Execution Layer report says Codex Inbox is empty and next work is decision cleanup for `codegraph` P2 and agentmemory/Codex P4.
- Rollenmatrix v2 therefore stays policy-only and does not create a new handoff.

## Original Model Defaults Observed Before Cutover

| Profile | Default | Provider |
|---|---|---|
| `coder` | `google/gemini-3-flash-preview` | `nous` |
| `finance` | `moonshotai/kimi-k2.6` | `nous` |
| `ideas` | `google/gemini-3-flash-preview` | `nous` |
| `lernwerkstatt` | `google/gemini-3-flash-preview` | `nous` |
| `memory` | `gpt-5.4-mini` | `openai-codex` |
| `neva` | `gpt-5.4-mini` | `openai-codex` |
| `research` | `google/gemini-3-flash-preview` | `nous` |
| `schule` | `google/gemini-3-flash-preview` | `nous` |

## Swarm Preset Defaults Observed

| Preset | Default |
|---|---|
| Orchestrator | GPT-5.4 |
| Builder | GPT-5.5 |
| Reviewer | GPT-5.4 |
| Triage | GPT-5.5 |
| Lab | GPT-5.4 |
| Sage | GPT-5.5 |
| Scribe | GPT-5.5 |
| Foundation | GPT-5.4 |
| QA | GPT-5.4 |
| Mirror Integrations | GPT-5.4 |

## Checks

- New goal folder created: yes
- `GOAL.md` created: yes
- `EXECUTE_PLAN.md` created: yes
- `ROLE_MATRIX_V2.md` created: yes
- `MODEL_ROUTING_POLICY.md` created: yes
- Hermes Control report created: yes
- Existing profile configs changed: no
- Existing SOUL files changed: no
- Existing Swarm source changed: no
- Handoff files changed: no
- Cron changed: no
- External service called: no
- API keys or secrets read beyond config headings: no
- GPT-5.5 made default everywhere: no
- GPT-5.5 restricted to premium/high-value cases: yes

## Risk Review

| Risk | Mitigation |
|---|---|
| Accidental model cost increase | No config changed; policy restricts GPT-5.5 |
| Conflict with Execution Layer work | No `src/**` or route files touched |
| Too many new roles | Roles are modes, not new profiles |
| Builder reviews own work | Matrix requires independent Reviewer/QA gate |
| `memory` becomes too broad | New RiskGate mode is explicit; profile split only after repeated need |

## Recommended Next Step

Use the Rollenmatrix v2 as a routing rule for one real upcoming decision. Do not change profile configs yet.

Preferred test case:

```text
Naechste Produkt-/GE-/Code-Entscheidung durch Neva routen:
Productklarheit PM oder Paedagogische QA oder Builder/Reviewer/RiskGate bewusst waehlen,
Modell-Tier nennen, Ergebnis dokumentieren.
```

Only after that should Chris decide whether SOUL text or model defaults should be changed.
