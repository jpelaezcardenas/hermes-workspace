# Enrichment Strategy — SettleMint Office Agents

> This document guides automated enrichment crons. Each run picks ONE focus area, makes a small meaningful improvement, and logs what was done.

## Agent Maturity Assessment

| Dimension | bid-manager | rfp-forge | ppt-maker | ppt-checker | bid-checker | press-manager |
|---|---|---|---|---|---|---|
| Content depth | 5 | 3 | 4 | 2 | 2 | 2 |
| Writing quality standards | 5 | 3 | 3 | 2 | 3 | 3 |
| Setup completeness | 5 | 4 | 4 | 3 | 4 | 3 |
| Feedback loop maturity | 4 | 2 | 3 | 2 | 2 | 1 |
| Training examples | 4 | 2 | 4 | 2 | 1 | 1 |
| **Overall** | **4.6** | **2.8** | **3.6** | **2.2** | **2.4** | **2.0** |

## Enrichment Priority Matrix

### bid-manager (Maturity: HIGH — 4.6/5)
Most mature agent. Focus on freshness and refinement, not structure.

**Focus areas (rotate through these):**
1. **Content freshness** — Update market data, regulatory developments, case study details in content/ files
2. **Writing style refinement** — Review and tighten writing rules, add nuanced guidance for edge cases
3. **Competitive positioning** — Update competitor references, differentiation language, win themes
4. **New use case blocks** — Add content blocks for emerging use cases (CBDCs, green bonds, private credit, RWA)
5. **Lessons integration** — Review feedback/lessons.md and fold recurring patterns into setup/ or content/ rules

### rfp-forge (Maturity: MEDIUM — 2.8/5)
Has structure but lacks content depth. Needs to approach bid-manager's richness.

**Focus areas (rotate through these):**
1. **Content section depth** — Expand content/ files with richer, more detailed response blocks
2. **Response pattern library** — Add reusable response patterns for common RFP question types
3. **Compliance matrix enrichment** — Deepen compliance/regulatory content for different jurisdictions
4. **Writing quality** — Strengthen writing-style.md with more specific guidance and examples
5. **Skeleton improvements** — Refine skeleton structures and scoring rubrics

### ppt-maker (Maturity: MEDIUM-HIGH — 3.6/5)
Rich skeleton catalog but content narratives could be stronger.

**Focus areas (rotate through these):**
1. **Content narrative blocks** — Add/improve narrative content in content-banks/ for different presentation contexts
2. **Slide content quality** — Improve the substance of content within slide types (stats, comparisons, case studies)
3. **Data bank updates** — Refresh platform-stats.json, case-studies.json, competitive-positioning.json with current data
4. **Training refinement** — Improve golden examples and scoring criteria
5. **Writing guidance** — Strengthen content writing rules for slide text (conciseness, impact, data-driven messaging)

### ppt-checker (Maturity: LOW — 2.2/5)
Reviewer agent that needs much deeper scoring criteria and feedback patterns.

**Focus areas (rotate through these):**
1. **Scoring rubric refinement** — Make scoring-rubric.md and review-rubric.md more granular and actionable
2. **Check criteria expansion** — Add more specific checks to content-standards.md and brand-checklist.md
3. **Feedback pattern library** — Build a library of constructive feedback templates for common issues
4. **Anti-pattern catalog** — Expand anti-patterns.md with more real-world defect examples
5. **Training examples** — Improve example reviews (weak vs strong) with more nuanced cases

### bid-checker (Maturity: LOW — 2.4/5)
Reviewer agent that needs deeper quality criteria and review patterns.

**Focus areas (rotate through these):**
1. **Scoring rubric depth** — Make scoring-rubric.md more detailed with sub-criteria and examples
2. **Defect taxonomy** — Expand defect-taxonomy.md with more categories and severity levels
3. **Review template improvement** — Make review-template.md produce more actionable feedback
4. **Writing standards** — Deepen writing-standards.md with enterprise proposal best practices
5. **Evaluator personas** — Refine evaluator-personas.md with more realistic buyer perspectives

### press-manager (Maturity: LOW — 2.0/5)
Least mature. Needs foundational content depth and media knowledge.

**Focus areas (rotate through these):**
1. **DALP content depth** — Add domain knowledge content for translating technical capabilities into media narratives
2. **Writing patterns** — Expand sentence-framing.md and quote-architecture.md with more patterns
3. **Publication knowledge** — Add guidance for different publication types (trade press, mainstream, fintech)
4. **Interview scenarios** — Expand interview-psychology.md with more scenario-based guidance
5. **Quality standards** — Strengthen quality-standards-press.md with journalistic best practices

## Guardrails — What Enrichment May and May NOT Touch

### ✅ ALLOWED (improve freely)
- `content/` — domain knowledge, content blocks, data banks
- `setup/` — rules, style guides, rubrics, checklists, standards
- `training/` — examples, scorecards, golden examples
- `feedback/` — lessons, logs, improvement records
- `content-banks/` — stats, case studies, competitive data (JSON or MD)

### 🚫 NEVER TOUCH
- `scripts/` — any Python, shell, or build scripts
- `output/` — generated deliverables
- `input/` — source materials
- `business/templates/` — DOCX, PPTX, XLSX templates
- `pandoc-templates/` — document conversion templates
- `*.py`, `*.sh`, `*.js` files anywhere
- `requirements.txt`, `package.json`, or any dependency files
- `AGENTS.md` — agent identity files (these define the agent's core behavior)
- Any file that controls document generation format or structure

### 📝 Enrichment Logging
Every enrichment run MUST append to the agent's feedback directory:
- File: `feedback/enrichment-log.md`
- Format: `## YYYY-MM-DD HH:MM — [Focus Area]\n- What was changed\n- Which file(s) modified\n- Why this improvement matters`
