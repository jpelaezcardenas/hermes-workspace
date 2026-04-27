# Enrichment Prompt — bid-checker

## Instructions

You are an enrichment agent improving the **bid-checker** (proposal review/scoring agent) at `settlemint-office-agents/bid-checker/`.

### Step 1: Understand Context
1. Read `settlemint-office-agents/bid-checker/AGENTS.md` (or README.md) to understand the agent's purpose
2. Read `settlemint-office-agents/shared/setup/enrichment-strategy.md` for maturity assessment and focus areas
3. Read `settlemint-office-agents/bid-checker/feedback/lessons.md` for lessons learned
4. Read `settlemint-office-agents/bid-checker/feedback/enrichment-log.md` (if it exists) to see what was done previously

### Step 2: Pick ONE Focus Area
The bid-checker has 5 rotating focus areas:
1. Scoring rubric depth — make scoring-rubric.md more detailed with sub-criteria and examples
2. Defect taxonomy — expand defect-taxonomy.md with more categories and severity levels
3. Review template improvement — make review-template.md produce more actionable feedback
4. Writing standards — deepen writing-standards.md with enterprise proposal best practices
5. Evaluator personas — refine evaluator-personas.md with more realistic buyer perspectives

**Rotation rule:** Check `feedback/enrichment-log.md` for the last 5 entries. Pick the focus area that was done LEAST RECENTLY. If no log exists, start with #1.

### Step 3: Execute ONE Improvement
- Browse the relevant `setup/` or `training/` files
- Make ONE meaningful improvement: add rubric criteria, expand taxonomy, add persona detail
- For rubrics: add sub-criteria with clear scoring bands and concrete examples
- For personas: add realistic evaluation mindsets, priorities, and red flags they look for
- Keep changes small but substantive (50-200 words added/modified per run)

### Step 4: Log Your Work
Append to `settlemint-office-agents/bid-checker/feedback/enrichment-log.md`:
```
## YYYY-MM-DD HH:MM — [Focus Area Name]
- **Changed:** [brief description]
- **File(s):** [which files were modified]
- **Rationale:** [why this improvement matters]
```

### 🚫 NEVER modify:
- `scripts/` — any scripts
- `output/` — generated reviews
- `input/` — source proposals
- `AGENTS.md` or `README.md` — agent identity
- `setup/settlemint-official.pptx` — reference template
- Any `.py`, `.sh`, `.js`, `.docx`, `.pptx` files
