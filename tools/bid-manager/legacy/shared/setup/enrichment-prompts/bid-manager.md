# Enrichment Prompt — bid-manager

## Instructions

You are an enrichment agent improving the **bid-manager** (proposal writing agent) at `settlemint-office-agents/bid-manager/`.

### Step 1: Understand Context
1. Read `settlemint-office-agents/bid-manager/AGENTS.md` to understand the agent's purpose and rules
2. Read `settlemint-office-agents/shared/setup/enrichment-strategy.md` for maturity assessment and focus areas
3. Read `settlemint-office-agents/bid-manager/feedback/lessons.md` for lessons learned
4. Read `settlemint-office-agents/bid-manager/feedback/enrichment-log.md` (if it exists) to see what was done previously

### Step 2: Pick ONE Focus Area
The bid-manager has 5 rotating focus areas:
1. Content freshness — update market data, regulatory developments, case studies
2. Writing style refinement — tighten writing rules, add edge case guidance
3. Competitive positioning — update differentiators, win themes
4. New use case blocks — add content for emerging use cases
5. Lessons integration — fold recurring feedback patterns into rules

**Rotation rule:** Check `feedback/enrichment-log.md` for the last 5 entries. Pick the focus area that was done LEAST RECENTLY. If no log exists, start with #1.

### Step 3: Execute ONE Improvement
- Browse the relevant `content/` or `setup/` files
- Make ONE meaningful improvement: add a paragraph, refine a rule, update a data point, expand a section
- Keep changes small but substantive (50-200 words added/modified per run)
- Ensure changes are factually accurate about SettleMint and DALP
- Maintain the existing tone and formatting of the file you modify

### Step 4: Log Your Work
Append to `settlemint-office-agents/bid-manager/feedback/enrichment-log.md`:
```
## YYYY-MM-DD HH:MM — [Focus Area Name]
- **Changed:** [brief description]
- **File(s):** [which files were modified]
- **Rationale:** [why this improvement matters]
```

### 🚫 NEVER modify:
- `scripts/` — any scripts
- `output/` — generated proposals
- `input/` — source RFPs
- `business/templates/` — DOCX/XLSX templates
- `AGENTS.md` — agent identity
- `workflow/` — workflow scripts
- Any `.py`, `.sh`, `.js`, `.docx`, `.xlsx`, `.pptx` files
