---
title: "Frozen workflow prompt example"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.704394Z
---

# Frozen workflow prompt example

Use this prompt with the PPT maker agent when you want the current protected workflow.

```text
Build a SettleMint presentation as a PPTX only.

Topic:
DALP for tokenized precious metals in the Middle East

Audience:
Senior banking, exchange, and custody executives

Target length:
11–13 slides total before appendix, plus appendix

Narrative goal:
Show why DALP is credible for gold and precious-metals programs, how the operating model works, and what deployment path looks like.

Frozen workflow rules to follow:
- Use the current frozen slide-bank workflow only: pick extracted slide-bank slides and fill them. Do not draw approximate slides from scratch.
- Do not use Mermaid diagrams on any main slide.
- Include a Thank You slide first, then an Appendix section after it.
- In the appendix, generate 4–10 Mermaid diagrams that are genuinely useful for this subject.
- Generate them new for this presentation. Do not reuse generic templates, prior deck diagrams, or cached outputs.
- Appendix Mermaid diagrams may vary in aspect ratio if needed; fit them cleanly into the placeholder.
- Fill textboxes properly. Avoid half-empty text areas. If a slide has a textbox above a table, that textbox must be filled.
- Final deliverable is PPTX only. Do not return a markdown outline as the final output.

Main-deck structure:
1. Cover
2. Agenda
3. Section separator — Market case
4. Single-column narrative — why precious metals are live now
5. Screenshot-right — DALP configuration or dashboard evidence
6. Table-with-text — compare DALP capabilities vs operational needs for gold programs
7. Section separator — Operating model
8. Two-column or three-column — issuance, servicing, controls
9. Screenshot-left — compliance or permissions evidence
10. Section separator — Commercial close
11. Single-column — why SettleMint / next-step takeaway
12. Thank You
13. Appendix section
14+. 4–10 appendix Mermaid diagram slides

Content emphasis:
- Be concrete, commercial, and credible.
- Use DALP screenshots only on screenshot layouts.
- Use the appendix diagrams to explain lifecycle, compliance flow, custody/settlement interactions, deployment path, and data/control model.
- Keep titles tight and ensure body copy uses the available space well.

Output filename:
output/2026-03-20-dalp-precious-metals-frozen-workflow-example.pptx
```
