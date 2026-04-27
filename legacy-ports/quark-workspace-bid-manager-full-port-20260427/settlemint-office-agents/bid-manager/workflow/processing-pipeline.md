# Processing Pipeline

End-to-end autonomous pipeline for bid-manager work. From the moment a trigger is detected to the final output delivered in Slack.

---

## Step 1: Input Detection & Ingestion

**Trigger:** Message matches patterns in `workflow/detection-keywords.md`.

**Actions:**
1. Identify the attached file type: `.docx`, `.xlsx`, `.csv`, `.pdf`
2. Extract metadata from message: who sent it, client name (if mentioned), any deadline
3. Create input folder: `input/{username}_{rfp-title-slug}_{YYYYMMDD-HHMM}/`
   - Naming convention: see `workflow/folder-naming.md`
4. Copy original file to input folder
5. Convert to working format:
   - **DOCX** → Markdown via `scripts/docx_to_markdown.py` (uses markitdown)
   - **XLSX** → CSV via `scripts/xlsx_to_csv.py` (uses openpyxl for structured data)
   - **PDF** → Markdown via markitdown CLI directly: `/Users/quark/Library/Python/3.14/bin/markitdown input.pdf`
   - **CSV** → kept as-is (already in working format)
6. Store both original and converted files in the input folder

**Output of this step:** Input folder with original + converted files, ready for analysis.

---

## Step 2: Analysis & Classification

**Actions:**
1. Read the converted input (markdown or CSV)
2. Classify the document type:

| Type | Signals | Skeleton |
|------|---------|----------|
| **Technical Proposal** | Scope of work, technical requirements, architecture questions | `skeletons/1_technical/` (markdown/ and docx/ variants inside) |
| **Commercial Proposal** | Pricing, commercials, SLAs, payment terms | `skeletons/2_commercial/` |
| **RFI Response** | Information-gathering questions, no pricing | `skeletons/3_rfi/` |
| **Questionnaire** | Tabular Q&A, security/compliance domains | `skeletons/5_questionnaire/` |

3. Extract key metadata:
   - **Client name**: from document header, filename, or message context
   - **Project scope**: summarize in 1-2 sentences
   - **Deadline**: if mentioned in document or message
   - **Key requirements**: top 5-10 requirements that will shape the response
   - **Evaluation criteria**: how the response will be scored (if available)

4. Write a `_classification.md` file in the input folder with all extracted metadata

---

## Step 2.5: Diagram Planning (Mandatory)

**Before writing any content, plan which sections benefit from Mermaid diagrams.**

**Actions:**
1. Review the document skeleton/structure and identify sections where a visual would add value
2. Consult `setup/mermaid-diagram-standards.md` for allowed diagram types, color palette, and quantity guidelines
3. For each planned diagram:
   - Document what the diagram will show
   - Confirm it maps to a section with sufficient surrounding text
   - Confirm the node count stays within limits (≤15 nodes per diagram)
   - Choose portrait orientation (top-down) unless the flow is inherently horizontal
4. Record the diagram plan before proceeding to content assembly

**Rules:**
- Every diagram must add value, no decorative diagrams
- Quantity must match proposal length (see standards doc)
- Architecture, compliance workflows, timelines, and token lifecycles are good candidates
- Company overview prose and short sections are NOT good candidates

---

## Step 3: Content Assembly

**Prerequisite reads (mandatory, in order):**
1. `feedback/lessons.md`: accumulated learning from past bids
2. `setup/core-positioning.md`: primary theme and positioning (if exists)
3. `setup/writing-style.md`: tone and voice rules
4. `setup/ip-protection.md`: what can and cannot be shared
5. `setup/mermaid-diagram-standards.md`: diagram design and placement rules
6. The matching skeleton from `skeletons/`

**Actions:**

### For Proposals & RFI Responses:
1. Load the matching skeleton, follow its structure exactly
2. Insert reusable blocks where indicated. Two annotation formats are accepted:
   - `[REUSABLE BLOCK: slug]` tags (legacy format)
   - `[Source: reusable/filename.md]` annotations (current preferred format)
   Pull content from `reusable/` in both cases.
3. For client-specific sections:
   - Research DALP capabilities in `content/`, DALP docs (`~/dalp/kit/dapp/content/docs/`), and codebase (`~/dalp/`)
   - Write custom content tailored to the client's specific requirements
   - Apply confidence tags: 🟢 Native | 🟡 Partial | 🔴 Gap | ⚪ N/A
4. For competitive positioning sections:
   - Reference competitor dossiers in `product/dalp/competitors/`
   - Reference `setup/` for buyer psychology and positioning
5. Apply formatting rules from `setup/word-compatible-markdown.md`

### For Questionnaires:
1. Parse the question list from the CSV/converted input
2. For each question:
   - Search `content/` sections for relevant DALP knowledge
   - Check previous questionnaire responses in `output/` for similar questions
   - Write a concise, accurate answer
   - Tag confidence level
3. Compile answers in structured CSV format: `Question Number, Question, Answer, Confidence, Evidence/Reference`

---

## Step 4: Output Generation

**Actions:**

### For Proposals & RFI Responses:
1. Create output folder: `output/{username}_{rfp-title-slug}_{YYYYMMDD-HHMM}/`
2. Canonical runtime outputs live only under `settlemint-office-agents/bid-manager/output/`. `proposal-bank/` is archive-only and is never a live generation destination. If an upstream source file is outside the output tree, move or regenerate it into the canonical output folder before derivatives are produced.
3. Save the final markdown file (canonical/mother format)
3. **Diagram rendering**: Convert markdown → DOCX via `scripts/markdown_to_docx.py`
   - All Mermaid code blocks are auto-detected and rendered to PNG via `mmdc`
   - Each diagram is auto-sized to fit within the A4 content area (max 6.0" wide, 9.0" tall)
   - Diagrams are centered horizontally in the document
   - TOC is auto-inserted as a native Word field after the cover page
   - Empty page prevention runs automatically before save
4. Both files saved in output folder
5. **Validation gate (mandatory):** the `.docx` must exist and `scripts/markdown_to_docx.py` must exit successfully after locked-template validation. If DOCX generation or validation fails, the task is not complete and must not be delivered as markdown only.
6. **Share BOTH files** (`.md` and `.docx`) in the Slack response message

### For Questionnaires:
1. Create output folder: `output/{username}_{rfp-title-slug}_{YYYYMMDD-HHMM}/`
2. Canonical runtime outputs live only under `settlemint-office-agents/bid-manager/output/`. `proposal-bank/` is archive-only and is never a live generation destination. If an upstream source file is outside the output tree, move or regenerate it into the canonical output folder before derivatives are produced.
3. Save the answers CSV (canonical/mother format)
3. Convert CSV → XLSX via `scripts/csv_to_xlsx.py`
   - This is a **template-first** path. It must clone `skeletons/5_questionnaire/excel/settlemint-questionnaire-template.xlsx`, populate only the `Response` sheet rows, and never create a questionnaire workbook from scratch.
4. Both files saved in output folder
5. **Validation gate (mandatory):** the `.xlsx` must exist and `scripts/csv_to_xlsx.py` must exit successfully after locked-template contract validation. If XLSX generation or validation fails, the task is not complete and must not be delivered as CSV only.
6. **Share the `.xlsx` file** in the Slack response message (plus `.csv` for reference)

### Slack Response Format:
```
📋 **{Document Type}: {Client Name}**

Classified as: {type} | {N} sections | {confidence summary}

Key highlights:
- {highlight 1}
- {highlight 2}
- {highlight 3}

⚠️ Items needing human review:
- {gap or uncertainty 1}
- {gap or uncertainty 2}

📎 Files attached: {list of output files}

Let me know if anything needs adjustment, corrections feed back into the system for next time.
```

---

## Step 5: Feedback Loop

**Immediately after delivery:**
1. Log the bid in `feedback/feedback-log.md`:
   ```
   ## {YYYY-MM-DD}: {Client Name}: {Document Type}
   - **Requester:** {username}
   - **Input:** {input folder path}
   - **Output:** {output folder path}
   - **Classification:** {type}
   - **Confidence:** {overall}
   - **Status:** Delivered, awaiting feedback
   ```

2. Prompt the user: *"Let me know if anything needs adjustment, corrections feed back into the system for next time."*

**When corrections arrive:**
1. Apply corrections to the output files
2. Re-generate DOCX/XLSX from corrected source
3. Log correction in `feedback/feedback-log.md` (update the entry)
4. Extract lesson and append to `feedback/lessons.md`
5. If correction relates to a DALP capability: update the relevant `content/` file
6. If correction relates to writing style: update `setup/writing-style.md` or `setup/tone-examples.md`

**When outcome is known (won/lost):**
1. Update `feedback/feedback-log.md` with outcome
2. Analyze what worked / didn't work
3. Promote high-signal insights to `setup/win-themes.md`

---

## Step 5.5: Diagram and Document Quality Check (Mandatory)

**After DOCX generation, verify diagram quality and document structure.**

### Diagram Quality Checks
- [ ] All Mermaid blocks rendered successfully (no "[Diagram X, render failed]" placeholders)
- [ ] All diagrams are centered horizontally (not left-aligned)
- [ ] No diagram is cut off on the right side or bottom of the page
- [ ] All diagrams fit within the A4 content area (≤6.0" wide, ≤9.0" tall)
- [ ] Diagram colors match the SettleMint brand palette (see `setup/mermaid-diagram-standards.md`)
- [ ] Each diagram has contextual text before it (not orphaned)

### Table of Contents Check
- [ ] TOC is present immediately after the cover page
- [ ] TOC is a native Word field (not manual text), updatable via right-click → "Update Field"
- [ ] TOC references heading levels 1-4

### Empty Page Check
- [ ] No blank pages between sections
- [ ] No consecutive page breaks creating empty space
- [ ] No orphaned section breaks at the end of the document

**If any check fails, fix before proceeding to delivery.**

---

## Step 6: Mandatory Output Validation (Final Gate)

**These three checks are non-negotiable. No proposal leaves the pipeline without passing all three.**

### 6.1 Cover Page Validation
- Verify ALL cover page fields are populated with actual values (not placeholders)
- Required fields: client name, proposal title, submission date, SettleMint branding, contact details
- Use `--cover-json` with `markdown_to_docx.py` to populate programmatically
- If any field is missing or contains bracket placeholders → **STOP and fix before delivery**

### 6.2 Table of Contents Validation
- Verify TOC is present immediately after the cover page
- TOC is auto-inserted by `markdown_to_docx.py`: confirm it rendered correctly
- TOC should reference heading levels 1-4
- Remind user to right-click → Update Field in Word after any manual edits

### 6.2.1 Locked Template Signature Validation
- `scripts/markdown_to_docx.py` now validates the generated DOCX against the locked template signature before returning success
- If the generated DOCX does not preserve the required template parts (`styles.xml`, `numbering.xml`, `settings.xml`, `theme1.xml`) → **STOP and fix before delivery**
- Manual fallback DOCX creation outside the canonical template pipeline is not an acceptable substitute

### 6.3 DALP Screenshots Validation
- Verify at least 3 relevant DALP screenshots are included in the proposal
- Screenshots must come from `../shared/brand/dalp-screenshots/CATALOG.md`
- Each screenshot must have a descriptive caption
- Screenshots must be placed after the text they illustrate, not before
- For asset-class-specific proposals: lead with screenshots of that asset class

### 6.4 Questionnaire Workbook Validation
- `scripts/csv_to_xlsx.py` now validates the generated workbook against the locked approved questionnaire template before returning success
- The workbook must preserve the exact sheet names and order: `Cover`, `Response`, `Evidence Index`, `Glossary`
- The `Response` sheet headers must match the approved header order exactly, and the workbook must retain the template's freeze panes, filters, merged ranges, styles, and status validation range
- Non-response sheets are locked: if `Cover`, `Evidence Index`, or `Glossary` differ from the approved template, validation fails
- If workbook validation fails → **STOP and fix before delivery**

**If any of the three checks fail, the proposal is not ready for delivery. Fix before proceeding to Step 5 (Feedback Loop).**

---

## Pipeline Diagram

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  DETECTION   │────→│  INGESTION   │────→│  CLASSIFICATION  │
│  Keywords +  │     │  Copy file   │     │  Type + metadata │
│  file signal │     │  Convert fmt │     │  Select skeleton │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                    ┌──────────────┐     ┌─────────▼────────┐
                    │   OUTPUT     │←────│    ASSEMBLY       │
                    │  MD → DOCX   │     │  Skeleton + blocks│
                    │  CSV → XLSX  │     │  + custom content │
                    │  Share Slack  │     │  + DALP research  │
                    └──────┬───────┘     └──────────────────┘
                           │
                    ┌──────▼───────┐
                    │  FEEDBACK    │
                    │  Log + learn │
                    │  Update base │
                    └──────────────┘
```
