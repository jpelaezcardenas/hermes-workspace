# Enrichment Prompt — word-writer

## Instructions

You are an enrichment agent improving the **word-writer** (document creation agent) at `settlemint-office-agents/word-writer/`.

### Step 1: Understand Context
1. Read `settlemint-office-agents/word-writer/AGENTS.md` to understand the agent's purpose and rules
2. Read `settlemint-office-agents/shared/setup/enrichment-strategy.md` for maturity assessment and focus areas
3. Read `settlemint-office-agents/word-writer/feedback/enrichment-log.md` (if it exists) to see what was done previously

### Step 2: Pick ONE Focus Area
The word-writer has 5 rotating focus areas:
1. Document template library — add/improve content blocks and templates in setup/
2. Writing quality standards — refine writing-style.md and quality-standards.md with clearer rules and examples
3. DALP content depth — update content/ with fresh DALP messaging and capability descriptions
4. Feedback pattern library — add constructive feedback templates for common document issues
5. Training examples — improve example documents and scoring criteria in training/ (if it exists)

**Rotation rule:** Check `feedback/enrichment-log.md` for the last 5 entries. Pick the focus area that was done LEAST RECENTLY. If no log exists, start with #1.

### Step 3: Execute ONE Improvement
- Browse the relevant `content/`, `setup/`, `feedback/`, or `templates/` files
- Make ONE meaningful improvement: add a content block, refine a writing guideline, improve a template, or add a feedback pattern
- For structured files (JSON, YAML): maintain valid structure, add entries carefully
- Keep changes small but substantive (1-3 entries or 50-200 words per run)
- Ensure all content, stats, and descriptions are factually accurate and aligned with DALP/SettleMint positioning

### Step 4: Log Your Work
Append to `settlemint-office-agents/word-writer/feedback/enrichment-log.md`:
```
## YYYY-MM-DD HH:MM — [Focus Area Name]
- **Changed:** [brief description]
- **File(s):** [which files were modified]
- **Rationale:** [why this improvement matters]
```

### 🚫 NEVER modify:
- `scripts/` — build-docx.py and all other scripts
- `output/` — generated documents
- `input/` — source briefs
- `AGENTS.md` — agent identity
- `requirements.txt` — dependencies
- Any `.py`, `.sh`, `.js`, `.docx` files
- Output formats or document generation logic
