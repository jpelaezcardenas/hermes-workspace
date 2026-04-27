# RFP Type Detection: Canonical Reference

> **Purpose**: This is the single source of truth for how the bid-manager identifies what type of response is needed when an RFP, RFI, or procurement document is received.

---

## Type Classification

### Type 1: Questionnaire / RFI

**Detection Signals:**
- Structured questions (numbered lists, tabular Q&A format)
- "Please answer the following", "complete the attached questionnaire"
- Q&A format with columns for vendor responses
- Spreadsheet attachment (.xlsx, .csv) with columns like: Question, Answer, Evidence, Status
- Labels: "RFI", "Request for Information", "vendor questionnaire", "due diligence questionnaire", "security questionnaire"
- Known frameworks: CAIQ, SIG, VSA, HECVAT
- Multiple tabs organized by domain (Security, Privacy, Compliance, Technical)
- No pricing or commercial terms requested (distinguishes from RFP)

**Output:** Excel questionnaire via `scripts/csv_to_xlsx.py` using locked template at `skeletons/5_questionnaire/excel/settlemint-questionnaire-template.xlsx`

**Skeleton:** `skeletons/3_rfi/` (for narrative RFI) or `skeletons/5_questionnaire/` (for tabular Q&A)

---

### Type 2: Technical Proposal / RFP

**Detection Signals:**
- Labels: "Request for Proposal", "RFP", "ITT", "Invitation to Tender", "tender"
- Asks for architecture, approach, methodology, or solution design
- Asks for company profile + technical response as a free-form document
- Contains evaluation criteria with scoring/weighting
- Includes sections on: scope of work, functional requirements, non-functional requirements, submission instructions
- Requests a narrative document (not a questionnaire)
- Contains mandatory vs. desirable requirement tags
- Mentions "technical evaluation" as a scoring category

**Output:** Technical proposal DOCX via `scripts/markdown_to_docx.py` using `templates/MASTER_TEMPLATE_LOCKED.docx`

**Skeleton:** `skeletons/1_technical/`: select compact/medium/full based on page target and requirement density

---

### Type 3: Commercial Proposal

**Detection Signals:**
- Explicit request for pricing, commercials, cost breakdown
- Labels: "commercial proposal", "quotation", "quote", "pricing schedule", "commercial offer", "financial proposal"
- Asks for licensing fees, implementation costs, support costs, TCO
- Asks for payment terms, contract duration, renewal terms
- "Commercial evaluation" listed as a separate scoring category
- Contains a pricing schedule or cost template to fill in

**Output:** Commercial proposal DOCX via `scripts/markdown_to_docx.py`

**Skeleton:** `skeletons/2_commercial/`: select compact/medium/full based on scope

**Pricing source:** `setup/commercial-pricing.md` (LOCKED, see that file for non-negotiable baseline figures)

---

### Type 4: Mixed / Multi-Output

**Detection Signals:**
- RFP that asks for pricing in a separate section or separate envelope
- "Submit technical and commercial proposals in separate volumes"
- Questionnaire that also requests a narrative proposal alongside
- Document contains both structured Q&A sections AND free-form response sections
- Multiple evaluation tracks (technical score + commercial score + questionnaire compliance)
- ITT with both a narrative response requirement and a pricing schedule attachment

**Output:** Multiple documents from parallel agents, one per required output type

**Spawning:** Each output type gets its own sub-agent running in parallel. See `setup/intake-confirmation.md` for the confirmation flow before spawning.

---

### Type 5: Executive Summary / Pitch

**Detection Signals:**
- Short engagement: "brief overview", "executive summary", "one-pager"
- "Deck", "pitch", "presentation" (note: deck/presentation routes to ppt-maker, not bid-manager)
- Wants 2–4 pages maximum
- "High-level overview for the board"
- "Summary for the steering committee"
- No detailed requirements matrix or evaluation criteria

**Output:** Executive summary DOCX (2–4 pages) via `scripts/markdown_to_docx.py`

**Skeleton:** Use `skeletons/1_technical/markdown/technical-compact.md` as the structural base, heavily trimmed

**Note:** If the request is explicitly for a slide deck or presentation, route to **ppt-maker**, not bid-manager.

---

## Detection Rules (Priority Order)

1. **Document structure first**: Is it a list of questions? A spec document? A pricing template? Structure is the strongest signal.
2. **Explicit labels**: Look for RFP, RFI, ITT, RFQ, EOI, tender, quotation. These are high-confidence classifiers.
3. **Output format instructions**: Did the requester specify what they want? "Fill in the Excel", "submit a proposal document", "provide a quotation". Follow explicit instructions.
4. **Content analysis**: What does the document ask for? Architecture → Type 2. Pricing → Type 3. Answers to questions → Type 1.
5. **Multi-type detection**: A single document can trigger multiple types simultaneously. If it asks for both a technical proposal AND a separate commercial envelope AND has a questionnaire attachment, that's Type 4 (mixed) spawning three parallel agents.
6. **When unclear → ask**: Do not assume. Present what you detected and ask the requester to confirm before proceeding. See `setup/intake-confirmation.md`.

---

## Type-to-Skeleton Mapping

| Detected Type | Primary Skeleton | Output Format | Agent |
|---|---|---|---|
| Questionnaire/RFI (tabular) | `skeletons/5_questionnaire/` | XLSX | bid-manager (questionnaire track) |
| Questionnaire/RFI (narrative) | `skeletons/3_rfi/` | DOCX | bid-manager (proposal track) |
| Technical Proposal / RFP | `skeletons/1_technical/` | DOCX | bid-manager (proposal track) |
| Commercial Proposal | `skeletons/2_commercial/` | DOCX | bid-manager (commercial track) |
| Joint Response | `skeletons/4_joint-response/` | DOCX | bid-manager (proposal track) |
| Mixed / Multi-Output | Multiple skeletons | Multiple formats | Parallel sub-agents |
| Executive Summary | `skeletons/1_technical/` (compact) | DOCX | bid-manager (proposal track) |

---

## Size Selection (compact / medium / full)

Within each skeleton type, select the size variant based on:

| Signal | Size |
|---|---|
| Page limit specified ≤ 15 pages | compact |
| Page limit 15–40 pages or no limit with moderate requirements | medium |
| Page limit > 40 pages, or 80+ requirements, or sovereign/strategic tier | full |
| "Brief", "summary", "overview", "one-pager" | compact |
| Formal tender with evaluation criteria and scoring | medium or full |
