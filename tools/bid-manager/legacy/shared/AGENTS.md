# Shared Workspace Governance

## 🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25)
**NEVER expose internal working terms in any public or team Slack channel or any user-visible output.**

Internal working terms include: skill names, agent names, workflow references, operational process names, internal tool names.

These are RESERVED for Gyan and Roderik ONLY. They must NEVER appear in:
- Any Slack channel message (public, private, team, or otherwise)
- Any message visible to end users or team members
- Any output sent to non-Gyan/non-Roderik recipients

When delivering work results to a channel: describe WHAT was done, not HOW (no tool/skill/agent names).
Say "I've prepared the document" — not "I used the ppt-ooxml skill to inject content."
Say "I've completed the analysis" — not "The bid-manager agent processed this."

## 🔴 NO EMOJI IN OUTPUT DOCUMENTS (Gyan directive, 2026-04-03)
Emoji characters are COMPLETELY FORBIDDEN in any client-facing output (DOCX, PPTX, PDF, HTML pages).
This includes: confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji.
Replace with text equivalents: "Fully Supported" / "Partially Supported" / "Gap" / "N/A".
Internal skeleton instructions may reference emoji for readability, but output MUST strip them.
This rule applies to ALL office agents in this workspace.

## 🔴 Cross-System Slack + Change-Control Guardrail (Gyan directive, 2026-03-19)
This rule applies to every office agent in this workspace and overrides looser local habits.

### User-facing Slack threads
- Discuss only the work relevant to the requester's task.
- Do not expose internal setup details, internal tweak/finalization history, workflow internals, or setup jargon unless strictly necessary to complete the requester's task.
- Keep internal mechanics, prompt/config changes, file shuffling, and agent orchestration out of user-facing thread replies by default.

### Change control
- No changes may be made to office agents, templates, workflows, setup files, or other internal office-agent machinery without explicit approval from Gyan (URGPRND7Z).
- If anyone requests such a change and Gyan has not approved it in the thread, stop and say that Gyan approval is required before any change can be made.
- In that same thread, tag/message Gyan: `<@URGPRND7Z> approval required for changes to the office-agent system.`
- Do not treat Roderik-only approval, urgency, or implied approval as sufficient for these office-agent-internal changes.

## Purpose
`shared/` is the central content and asset backbone for the office-agent estate. It holds reusable materials that multiple agents may depend on without copying them into each workspace.

## Subtree Inventory
| Path | Purpose | Canonical? |
|---|---|---|
| `brand/` | Logos, approved background visuals, DALP screenshots, and other brand-safe visual assets | Yes |
| `content/` | Shared DALP, company, architecture, compliance, deployment, security, and use-case source material | Yes |
| `default-templates/` | Default Office templates and baseline diagram assets used across agents | Yes |
| `regulations/` | Reserved shared regulatory/reference material when common jurisdiction assets are formalized | Optional until populated |
| `reusable/` | Reusable narrative blocks and modular text snippets for multiple agent types | Yes |
| `setup/` | Shared reference material, enrichment prompts, OOXML references, and low-level document infrastructure | Yes for reference assets; use agent-local setup for task-specific policy |
| `stock-images/` | Optional presentation-safe stock imagery for deck assembly and visual support | Optional |

## Ownership Rules
- Engineering-approved maintainers may update canonical shared assets.
- Agent operators may consume `shared/` freely but should not treat it as their scratch space.
- Agent-local work belongs in the agent workspace, not in `shared/`.
- When a shared asset changes semantics, downstream agents should be checked for breakage before relying on the update.

## Update Cadence
- `brand/`, `default-templates/`, and `reusable/`: update only when approved source material changes.
- `content/`: update when DALP/company facts materially change or a reusable content improvement should propagate broadly.
- `setup/`: update when shared document infrastructure or reference material changes.
- `stock-images/` and `regulations/`: update as needed; avoid churn.

## Precedence Rules
- Agent-local content overrides equivalent material in `shared/`.
- Agent-local setup rules override generic shared reference material.
- Use `shared/` as the fallback and common substrate, not the final arbiter for agent-specific nuance.

## Canonical vs Optional
### Canonical
- `brand/`
- `content/`
- `default-templates/`
- `reusable/`
- stable reference material in `setup/`

### Optional / nice-to-have
- `stock-images/`
- `regulations/` until populated
- convenience/reference material in `setup/` that is not required by an agent workflow

## Downstream Dependency Map
- `bid-manager/` uses shared content, reusable blocks, brand assets, and template fallbacks.
- `ppt-maker/` uses shared content, brand assets, screenshots, and shared visual defaults.
- `rfp-forge/` uses shared content, reusable material, and default templates as common substrate.
- Reviewer agents (`ppt-checker/`, `bid-checker/`) may reference shared assets indirectly through the builders they inspect.
- `press-manager/` should prefer local press-safe sources first, then pull shared material only when it remains publication-safe.

## Operating Rule
Keep `shared/` stable, reusable, and low-drama. If something is one-off, draft-specific, or experimental, it does not belong here.

## GPT 5.4 Prompt Defaults
These defaults apply when shared governance is referenced by office agents:
- Prefer explicit output contracts over vague quality claims.
- Prefer compact, structured instructions over duplicated policy blocks.
- Resolve prerequisite source lookup before downstream generation or review.
- If a task is clear and low-risk, proceed. Ask only when the missing choice materially changes the outcome or creates external side effects.
- Define explicit completion criteria for office deliverables instead of relying on generic phrases like "client-ready" alone.

## Agent Registry

The agent registry provides canonical name resolution and detection logic for all office agents.

### Files
| Path | Purpose |
|---|---|
| `agent-registry.json` | Canonical agent definitions, aliases, and detection keywords |
| `scripts/agent_registry.py` | Python module for resolving aliases and detecting agents |

### Registry Structure

Each agent in the registry includes:
- **canonical_name**: The official agent name (e.g., `bid-manager`)
- **folder_name**: The filesystem folder name
- **aliases**: List of alternative names that resolve to this agent
- **detection_keywords**: Keywords used to auto-detect the agent from messages
- **acknowledgment**: Standard acknowledgment message when starting the agent

### Using the Registry

```python
from scripts.agent_registry import resolve_agent, detect_agent, get_acknowledgment

# Resolve an alias to canonical name
canonical = resolve_agent("proposal builder")  # Returns: "bid-manager"

# Detect agent from message text
agent = detect_agent("I need to write a proposal response")  # Returns: "bid-manager"

# Get acknowledgment message with canonical name
ack = get_acknowledgment("bid-manager")
# Returns: "Starting **bid-manager** to handle your proposal..."
```

### Canonical Agent Names

| Agent | Purpose | Key Aliases |
|---|---|---|
| `bid-manager` | Writes proposals and responds to RFPs | proposal builder, RFP response, bid writer |
| `bid-checker` | Reviews proposals before submission | proposal checker, bid checker, QA the bid |
| `ppt-maker` | Builds PowerPoint presentations | deck builder, presentation builder, slide builder |
| `ppt-checker` | Reviews PowerPoint decks | deck-checker, presentation reviewer, QA the deck |
| `rfp-forge` | Generates RFPs and procurement documents | RFP builder, RFP generator, create an RFP |

**Key distinction:** `rfp-forge` *generates* RFPs (buyer-side). `bid-manager` *responds to* RFPs (vendor-side).

### Detection Priority

When multiple agents could match a request, priority order is:
1. bid-manager
2. bid-checker
3. ppt-maker
4. ppt-checker
5. rfp-forge

### Updating the Registry

When adding new aliases or detection keywords:
1. Update `agent-registry.json`
2. Ensure acknowledgment messages explicitly state the canonical name
3. Test with `python3 scripts/agent_registry.py resolve <alias>`

## Debug Mode Infrastructure

All office agents support real-time debug tracing through shared infrastructure.

### Components

| Path | Purpose |
|---|---|
| `scripts/debug-tracer.py` | Core debug tracing library with Slack integration |
| `setup/DEBUG-MODE.md` | Complete debug mode documentation |
| `setup/debug-section-template.md` | Template for adding debug sections to agent AGENTS.md |

### Enabling Debug for a Run

```bash
python3 scripts/debug-tracer.py enable <agent-name> <run-id> [--channel <slack-channel>]
```

### Configuration

Debug configuration is stored in `../.debug-config.json` (workspace root). See `setup/DEBUG-MODE.md` for complete configuration options.

### Environment Variables

Each agent can be enabled via environment variable:
- `BID_MANAGER_DEBUG=1`
- `PPT_MAKER_DEBUG=1`
- `PPT_CHECKER_DEBUG=1`
- `BID_CHECKER_DEBUG=1`
- `RFP_FORGE_DEBUG=1`
- `PRESS_MANAGER_DEBUG=1`
- `WORD_WRITER_DEBUG=1`
