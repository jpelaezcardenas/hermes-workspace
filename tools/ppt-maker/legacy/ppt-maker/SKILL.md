---
title: "PPT Maker Skill"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.663645Z
---

# PPT Maker Skill

Generate professional SettleMint PowerPoint presentations from a brief or topic.

## Quick Start

1. Receive the brief (topic, audience, slide count)
2. Read `AGENTS.md` for the canonical flow
3. Plan the structure (Cover → sections → Thank You)
4. **Read `CONTENT_GUIDELINES.md` for text limits** ⚠️
5. Run `scripts/build_from_config.py` with the plan
6. Output saved to `output/[project].pptx`

## ⚠️ CRITICAL: Text Box Limits

**Before creating ANY content, read `CONTENT_GUIDELINES.md`.**

All content MUST respect these limits:

| Element | Max Chars |
|---------|-----------|
| Title | 60 |
| Body Single | 1,400 |
| Two-Col each | 500 |
| 2x2 cells | 250 |
| Section subtitle | 50 |

**Never produce content that exceeds these limits.**

## Key Files

| File | Purpose |
|------|---------|
| `templates/Master Template 2026.pptx` | Base template — never modify directly |
| `slide-bank/` | 24 extracted slide types (PPTX + info JSON) |
| `templates/design-system.json` | Colors, typography, spacing — single source of truth |
| `scripts/build_from_config.py` | THE build script |
| `scripts/diagrams/engine.py` | Renders Mermaid/PlantUML → SVG → embeds into slide |
| `image-bank/` | HD stock photos (abstract, business, city, fintech, technology) |
| `templates/dalp-screenshots/` | DALP platform UI screenshots (186 files, 16 sections) |
| `content/` | DALP content: architecture, use cases, case studies, compliance |

## Rules

- **ALWAYS respect text box limits** - see `CONTENT_GUIDELINES.md`
- Font: Figtree. Always.
- Cover first (slide-001). Thank You last (slide-024). Section separators between sections.
- Fill the full content area — never leave placeholders half-empty.
- Never touch header, footer, slide number, or background on branded slides.
- Diagrams auto-embed via `scripts/diagrams/engine.py` — no manual export step.
- **All appendix diagram slides must include a text explanation below the diagram.** Use the `body` field to describe what the diagram shows. The builder rejects diagram-only appendix slides.
- **Parallel Mermaid rendering:** The builder pre-renders all Mermaid diagrams in parallel (up to 4 concurrent workers via `ThreadPoolExecutor`) before slide assembly. This is automatic and transparent. Falls back to sequential rendering if parallel fails.
