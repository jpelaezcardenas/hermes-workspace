# PROCESS.md: Bid Response Process

This document is the single source of truth for how a bid response moves from RFP intake to final delivery. It covers both the human process and the autonomous agent pipeline.

---

## Overview

The bid-manager system has three agents:

| Agent | Role | Trigger |
|-------|------|---------|
| **bid-manager** | Produces proposal/RFI/questionnaire responses | RFP/RFI/questionnaire document received |
| **rfp-forge** | Generates synthetic RFPs for training | Manual trigger from bid-manager setup |
| **bid-checker** | Reviews and scores proposal output quality | Manual trigger or post-generation hook |

---

## End-to-End Flow

```
RFP/RFI received → Intake & Triage → Requirements Analysis → Gap Assessment
    → Response Drafting (autonomous pipeline) → Review → Production → Submission
    → Post-Submission (clarifications, presentation, win/loss analysis)
```

---

## Phase 1: Intake & Triage (Human)

1. RFP/RFI document received from client or procurement portal
2. Assess: strategic fit, client profile, competition, timeline feasibility
3. Decision: Go / No-Go / Clarify
4. If Go: assign bid manager, note deadline and format requirements

See `setup/bid-process.md` for detailed triage criteria and timeline planning.

---

## Phase 2: Requirements Analysis (Human + Agent)

1. Parse all mandatory and desirable requirements
2. Map each requirement to DALP capabilities using confidence tags:
   - 🟢 Native | 🟡 Partial | 🔴 Gap | ⚪ N/A
3. Document evidence for each capability claim
4. Identify clarification questions
5. Develop win strategy (3-5 key differentiators)

---

## Phase 3: Autonomous Response Pipeline (Agent)

This is the bid-manager agent's autonomous pipeline. Full technical details: `workflow/processing-pipeline.md`.

### Step 1: Input Detection & Ingestion
- **Input**: DOCX, XLSX, CSV, or PDF attached to a Slack message matching trigger keywords
- **Action**: Create input folder (`input/{username}_{title-slug}_{YYYYMMDD-HHMM}/`), convert to working format
- **Converters**: `scripts/docx_to_markdown.py`, `scripts/xlsx_to_csv.py`
- **Output**: Input folder with original + converted files

### Step 2: Analysis & Classification
- **Action**: Classify document type (Technical Proposal / Commercial Proposal / RFI / Questionnaire)
- **Action**: Extract client name, scope, deadline, key requirements, evaluation criteria
- **Output**: `_classification.md` in input folder, skeleton selection

### Step 3: Mandatory Pre-Reads
Before writing any content, read in order:
1. `feedback/lessons.md`
2. `setup/core-positioning.md`
3. `setup/writing-style.md`
4. `setup/ip-protection.md`
5. `setup/mermaid-diagram-standards.md`
6. `setup/screenshot-registry.md`: read the keyword→screenshot mapping and select screenshots before drafting
7. The matching skeleton from `skeletons/`

### Step 4: Diagram Planning
- Identify sections that benefit from Mermaid diagrams
- Plan diagrams per `setup/mermaid-diagram-standards.md` rules
- Architecture, compliance workflows, timelines, and token lifecycles are good candidates

### Step 5: Content Assembly
**For Proposals & RFI Responses:**
1. Load matching skeleton, follow its structure exactly
2. Insert reusable blocks from `reusable/` where `[REUSABLE BLOCK: slug]` tags appear
3. Write client-specific sections using DALP knowledge sources (see `AGENTS.md` → Knowledge Sources)
4. Apply confidence tags: 🟢 Native | 🟡 Partial | 🔴 Gap | ⚪ N/A
5. Apply formatting rules from `setup/word-compatible-markdown.md`
6. **Embed screenshots inline**: before drafting, assign screenshots to the sections where those capabilities are first introduced. As you write each major section, insert the relevant screenshot from `setup/screenshot-registry.md` immediately after the paragraph that describes that capability. Minimums by variant: full 12, medium 8, compact 6. Spread screenshots across relevant sections, not one screenshot dump. Always include a `*Figure X: ...*` caption on the next line. See `setup/screenshot-registry.md` for section mapping, file paths, and embed syntax.

**For Questionnaires:**
1. Parse questions from CSV
2. Search `content/` for relevant answers
3. Write concise, accurate answers with confidence tags
4. Format as structured CSV

### Step 6: Output Generation
- Create output folder: `output/{username}_{title-slug}_{YYYYMMDD-HHMM}/`
- **Proposals**: Save markdown → convert to DOCX via `scripts/markdown_to_docx.py` using `templates/MASTER_TEMPLATE_LOCKED.docx`
- **Questionnaires**: Save CSV → convert to XLSX via `scripts/csv_to_xlsx.py` using locked template
- Both converters validate output against their locked templates before returning success
- **A response is not complete until the office artifact (.docx or .xlsx) exists and passes validation**

### Step 7: Mandatory Validation Gates
Before delivery, run `scripts/validate_proposal.py <file.md> <variant>`. The script enforces all of the following. **Validation MUST pass before DOCX conversion.**

Before delivery, verify:
1. **Cover page**: All fields populated (client name, title, date, contact details)
2. **Table of Contents**: Present after cover page, native Word field
3. **Template signature**: Generated DOCX preserves required template parts
4. **DALP screenshots**: Minimum screenshot count enforced per variant (full: 12, medium: 8, compact: 6). Screenshots must have captions, be embedded inline per section, be spread across relevant sections, and show variety across feature areas. See `setup/screenshot-registry.md`. Validation will FAIL if the minimum, caption coverage, section spread, or category-variety checks are not met.
5. **Sequence diagrams**: Minimum Mermaid sequence diagram count enforced per variant (full: 8, medium: 6, compact: 4). Only blocks starting with `sequenceDiagram` count. See `setup/diagram-manifest.md` for recommended topics. Validation will FAIL if the minimum is not met.
6. **Questionnaire workbook**: Sheet names, headers, and structure match template (questionnaires only)
7. **Diagram quality**: All Mermaid blocks rendered, centered, within A4 bounds, on-brand colors

### Step 8: Delivery & Feedback
1. Share files (markdown + DOCX, or CSV + XLSX) in Slack thread
2. Log the bid in `feedback/feedback-log.md`
3. Prompt for feedback
4. When corrections arrive: apply, re-generate, extract lessons to `feedback/lessons.md`
5. When outcome known (won/lost): update feedback log, promote insights to `setup/win-themes.md`

---

## Phase 4: Review & Refinement (Human)

1. **Technical review**: Solution architects verify accuracy
2. **Commercial review**: Sales/legal/finance verify pricing and terms
3. **Editorial review**: Writing style, formatting, completeness
4. **Legal/compliance review**: Regulatory claims, IP, binding commitments

See `setup/bid-process.md` for detailed review criteria.

---

## Phase 5: Production & Submission (Human)

1. Finalize markdown sources
2. Generate final DOCX via `scripts/markdown_to_docx.py`
3. Compile all required attachments
4. Submit per client instructions (portal, email, physical)
5. Archive to `proposal-bank/` (curated exemplars only)

---

## Phase 6: Post-Submission (Human)

1. Respond to client clarifications
2. Prepare oral presentation if required
3. Track win/loss outcome
4. Conduct post-mortem analysis
5. Feed lessons back into the system

See `setup/bid-process.md` for detailed post-submission procedures.

---

## Parallel Output Generation

When the intake confirmation flow (see `setup/intake-confirmation.md`) identifies multiple required outputs from a single RFP, the bid-manager spawns parallel sub-agents rather than generating outputs sequentially.

### Available Output Agents

| Agent Track | Handles | Output Format | Skeleton Source |
|---|---|---|---|
| **Technical proposal agent** | RFP / ITT / narrative technical response | DOCX | `skeletons/1_technical/` |
| **Commercial agent** | Pricing / commercial proposal / cost breakdown | DOCX | `skeletons/2_commercial/` |
| **Questionnaire agent** | RFI / tabular Q&A / vendor questionnaire | XLSX | `skeletons/5_questionnaire/` |
| **RFI narrative agent** | Narrative RFI response (non-tabular) | DOCX | `skeletons/3_rfi/` |
| **Joint response agent** | Joint/consortium response | DOCX | `skeletons/4_joint-response/` |
| **Executive summary agent** | Short-form 2–4 page overview | DOCX | `skeletons/1_technical/` (compact) |

### Spawning Rules

1. **Never run outputs sequentially** when multiple are required, spawn all in parallel
2. Each agent is independent and produces its own complete output
3. Each agent receives:
   - The full RFP/RFI document as input
   - Its specific skeleton template
   - The detection summary from the intake confirmation
   - All mandatory pre-reads (lessons, positioning, style guides, IP protection)
4. Results from all parallel agents are collected and delivered together in the Slack thread
5. If one agent fails, the others continue, report partial results and retry the failed track

### Coordination

- The bid-manager acts as orchestrator: it spawns agents, monitors progress, and collects results
- Each agent writes to the same output folder: `output/{username}_{title-slug}_{YYYYMMDD-HHMM}/`
- File naming distinguishes output type: `technical-proposal.md`, `commercial-proposal.md`, `questionnaire-response.csv`, etc.
- The bid-manager posts progress updates to the Slack thread as each agent completes
- Final delivery message includes all generated files with brief descriptions

### Example: Mixed RFP (Type 4)

```
Input: RFP with technical requirements + separate commercial envelope + questionnaire attachment

Detection (confirmed by requester):
✅ Technical Proposal (Sections 1-6: methodology, architecture, implementation)
✅ Commercial Proposal (Section 7: separate pricing schedule)
✅ Questionnaire (Attachment B: 120-question security questionnaire)

Spawned agents (parallel):
→ Technical proposal agent → technical-proposal.md + .docx
→ Commercial agent → commercial-proposal.md + .docx
→ Questionnaire agent → questionnaire-response.csv + .xlsx

All three run simultaneously. Delivered together when all complete.
```

---

## Agent Interaction Model

```
bid-manager (autonomous)
    ↓ produces draft
bid-checker (review)
    ↓ scores and flags issues
bid-manager (revision)
    ↓ applies corrections
Human reviewer (final approval)
    ↓ approves or requests changes
Delivery
```

**rfp-forge** is used only for training: it generates synthetic RFPs that bid-manager practices on. It does not participate in the live bid pipeline.
