---
title: "AGENTS.md — dalp-for-x"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.652123Z
---

# AGENTS.md — dalp-for-x

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

## Purpose

This agent creates and maintains `/for/*` pages in HubSpot (portal 8639589, EU1). Each page is an audience-positioning page for SettleMint DALP. Unlike comparison pages, these pages speak directly to a specific audience — a region, asset class, sector, or regulatory context — and answer the question: "What does DALP do for us specifically?"

The agent writes, patches, and creates HubSpot site pages using the `One - Competitors Comparison` template.

---

## Modes

### BACKFILL mode
Process all targets in the backfill queue. For each target in `setup/BACKFILL-QUEUE.md`:
1. Check if a page already exists (from `setup/TARGET-REGISTRY.md`)
2. If page exists and is DRAFT with incomplete content → UPDATE it
3. If page does not exist → CREATE a new one
4. Continue through the full queue

Trigger phrase: `"backfill all dalp-for-x pages"`

### UPDATE mode
Update one or more named targets. The operator specifies which target(s) to update.

Trigger phrases:
- `"update for/japan"` — update a single page by slug
- `"regenerate dalp-for-japan page"` — regenerate by target name
- `"update for/bonds and for/singapore"` — update multiple pages
- `"create dalp-for-[target] page"` — create a new page for a target

---

## Startup Sequence

Every session begins with these steps in order:

1. **Read SOUL.md** — load banned phrases, tone rules, and positioning guardrails
   - File: `/Users/quark/Public/quark/workspace/SOUL.md`
   - Key section: "🔴 Positioning Language No-Go List" — do not use any banned phrases

2. **Load DALP narrative** — read canonical messaging (first 300 lines)
   - File: `/Users/quark/.openclaw/workspace/notion/dalp-narrative.md`

3. **Load DALP capability mapping** — read relevant files for the target being processed
   - Path: `/Users/quark/Public/quark/workspace/product/dalp/capability-mapping/`
   - Priority files: `compliance-and-identity.md`, `custody-settlement.md`, `asset-lifecycle.md`, `observability-architecture.md`, `deployment-topology-architecture.md`

4. **Read RFI question bank** — load confidence-flagged capability answers
   - File: `/Users/quark/Public/quark/workspace/product/dalp/bid-kit/sections/rfi-question-bank.md`

5. **Research the target** — web research on the target audience:
   - Regulatory framework (what regulations apply to this audience)
   - Key institutions or players
   - Operational challenges and market context
   - What institutional buyers in this audience care about in procurement

6. **Check for relevant RFP inputs** (optional for high-priority targets)
   - Path: `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/input/`
   - Real RFPs may reveal specific buyer priorities per region/sector

7. **Read RULES.md** — load the locked workflow rules
   - File: `/Users/quark/Public/quark/workspace/settlemint-office-agents/dalp-for-x/setup/RULES.md`

8. **Fetch current page from HubSpot** — if page exists, GET the current `layoutSections` before writing
   - This avoids clobbering in-progress edits

9. **Write copy** — generate all 6 sections per the copy framework in RULES.md

10. **PATCH (or POST) page** — write the full `layoutSections` object in a single API call

11. **Update TARGET-REGISTRY.md** — record the HubSpot page ID and status

---

## Auth

- Token: `HUBSPOT_ACCESS_TOKEN` env var (set in OpenClaw gateway config)
- Portal: 8639589 (EU1)
- Never use a hardcoded token — always use the env var

---

## Sub-Agent Model

Use GPT 5.4 for copy generation by default.
Use Gemini 2.5 Pro as the fallback for writing-heavy regeneration work.
Use Codex only for constrained structural or mechanical tasks.
Do not treat Sonnet as the active default path.

---

## Change Control

Per the WORKSPACE-CONTRACT, changes to this agent's setup files, workflow, or templates require explicit approval from Gyan (URGPRND7Z).

## GPT 5.4 Prompt Defaults
- Return exactly the requested page copy and patch payloads, nothing extra.
- Prefer concise, audience-specific, evidence-based copy over filler.
- Resolve prerequisite capability lookup, target research, and current-page retrieval before writing.
- If the request is clear and the next step is reversible and low-risk, proceed.
- Ask only when a missing choice materially changes the page or an action has external side effects.
- Define what "done" means before finalizing: page content written, payload ready, and target registry state updated.

---

## File Locations

| File | Purpose |
|------|---------|
| `setup/RULES.md` | Locked workflow: API patterns, widget names, copy framework |
| `setup/TARGET-REGISTRY.md` | All targets with HubSpot page IDs, status, and notes |
| `setup/BACKFILL-QUEUE.md` | Ordered queue for backfill runs |
| `setup/SETUP-INDEX.md` | Index of all setup files |
| `feedback/lessons.md` | Lessons from past builds |
| `output/` | Generated page JSON payloads (for audit/review) |
