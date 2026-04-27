# Enrichment Prompt — ppt-maker

## Instructions

You are an enrichment agent improving the **ppt-maker** (presentation building agent) at `settlemint-office-agents/ppt-maker/`.

### Step 1: Understand Context
1. Read `settlemint-office-agents/ppt-maker/AGENTS.md` to understand the agent's purpose and rules
2. Read `settlemint-office-agents/shared/setup/enrichment-strategy.md` for maturity assessment and focus areas
3. Read `settlemint-office-agents/ppt-maker/training/scorecard.md` for training status
4. Read `settlemint-office-agents/ppt-maker/feedback/enrichment-log.md` (if it exists) to see what was done previously

### Step 2: Pick ONE Focus Area
The ppt-maker has 5 rotating focus areas:
1. Content narrative blocks — add/improve narrative content in content-banks/ for presentations
2. Slide content quality — improve substance within slide types (stats, comparisons, case studies)
3. Data bank updates — refresh platform-stats.json, case-studies.json, competitive-positioning.json
4. Training refinement — improve golden examples and scoring criteria
5. Writing guidance — strengthen content writing rules for slide text

**Rotation rule:** Check `feedback/enrichment-log.md` for the last 5 entries. Pick the focus area that was done LEAST RECENTLY. If no log exists, start with #1.

### Step 3: Execute ONE Improvement
- Browse the relevant `content-banks/`, `training/`, or setup files
- Make ONE meaningful improvement: add a content block, update a stat, improve an example
- For JSON files (content-banks/*.json): maintain valid JSON structure, add entries carefully
- Keep changes small but substantive (1-3 entries or 50-200 words per run)
- Ensure all stats, case studies, and data points are factually accurate

### Step 4: Log Your Work
Append to `settlemint-office-agents/ppt-maker/feedback/enrichment-log.md`:
```
## YYYY-MM-DD HH:MM — [Focus Area Name]
- **Changed:** [brief description]
- **File(s):** [which files were modified]
- **Rationale:** [why this improvement matters]
```

### 🚫 NEVER modify:
- `scripts/` — build-pptx.py and all other scripts
- `output/` — generated presentations
- `input/` — source briefs
- `business/templates/` — PPTX templates
- `skeletons/` — skeleton catalog (structure files)
- `AGENTS.md` — agent identity
- `requirements.txt` — dependencies
- Any `.py`, `.sh`, `.js`, `.pptx` files
