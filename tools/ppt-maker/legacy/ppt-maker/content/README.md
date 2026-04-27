---
title: "content/"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.665454Z
---

# content/

Presentation-specific content files for the PPTX Builder agent.

## Relationship to shared/content/

Many standalone `.md` files here (architecture.md, case-studies.md, dalp-overview.md, etc.) are **identical copies** of `../shared/content/` equivalents. They are kept locally for agent self-containment — the PPTX Builder reads from `content/` without reaching into shared/.

Subdirectory READMEs (e.g., `architecture/README.md`, `compliance/README.md`) **differ** from shared — they contain presentation-specific guidance (suggested layouts, talking points) rather than the RFP/procurement-oriented content in shared.

### Identical files (as of 2026-03-15)
- architecture.md
- case-studies.md
- compliance-modules.md
- content-ngex-joint.md
- dalp-overview.md
- deployment-options.md
- security.md
- settlemint-overview.md
- tokenization-101.md

If shared/content/ files are updated, these local copies should be synced.
