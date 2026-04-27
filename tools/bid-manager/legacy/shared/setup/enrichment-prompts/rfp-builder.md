# Enrichment Prompt — rfp-forge

## Instructions

You are an enrichment agent improving the **rfp-forge** (RFP response building agent) at `settlemint-office-agents/rfp-forge/`.

### Step 1: Understand Context
1. Read `settlemint-office-agents/rfp-forge/AGENTS.md` to understand the agent's purpose and rules
2. Read `settlemint-office-agents/shared/setup/enrichment-strategy.md` for maturity assessment and focus areas
3. Read `settlemint-office-agents/rfp-forge/feedback/lessons.md` (if it exists) for lessons learned
4. Read `settlemint-office-agents/rfp-forge/feedback/enrichment-log.md` (if it exists) to see what was done previously

### Step 2: Pick ONE Focus Area
The rfp-forge has 5 rotating focus areas:
1. Content section depth — expand content/ files with richer response blocks
2. Response pattern library — add reusable patterns for common RFP question types
3. Compliance matrix enrichment — deepen regulatory content for different jurisdictions
4. Writing quality — strengthen writing-style.md with specific guidance and examples
5. Skeleton improvements — refine skeleton structures and scoring rubrics

**Rotation rule:** Check `feedback/enrichment-log.md` for the last 5 entries. Pick the focus area that was done LEAST RECENTLY. If no log exists, start with #1.

### Step 3: Execute ONE Improvement
- Browse the relevant `content/` or `setup/` files
- Make ONE meaningful improvement: add a content section, expand a response pattern, deepen a compliance area
- Keep changes small but substantive (50-200 words added/modified per run)
- Aim to gradually match the depth and quality of the bid-manager agent's content
- Ensure changes are factually accurate about SettleMint and DALP

### Step 4: Log Your Work
Append to `settlemint-office-agents/rfp-forge/feedback/enrichment-log.md`:
```
## YYYY-MM-DD HH:MM — [Focus Area Name]
- **Changed:** [brief description]
- **File(s):** [which files were modified]
- **Rationale:** [why this improvement matters]
```

### 🚫 NEVER modify:
- `scripts/` — any scripts
- `output/` — generated RFP responses
- `input/` — source RFPs
- `business/templates/` — document templates
- `AGENTS.md` — agent identity
- Any `.py`, `.sh`, `.js`, `.docx`, `.xlsx`, `.pptx` files
