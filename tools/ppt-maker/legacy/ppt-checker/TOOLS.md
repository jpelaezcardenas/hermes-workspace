---
title: "TOOLS.md — PPTX Reviewer Local Notes"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.654729Z
---

# TOOLS.md — PPTX Reviewer Local Notes

## Purpose
This agent reviews slide decks built in or adapted to the official SettleMint presentation template.

## Primary References
- Brand rules: `/Users/quark/Public/quark/workspace/settlemint-office-agents/ppt-maker/setup/brand-guidelines.md`
- Slide catalog and layout purposes: `/Users/quark/Public/quark/workspace/settlemint-office-agents/ppt-maker/setup/slide-patterns.md`
- Builder operating rules: `/Users/quark/Public/quark/workspace/settlemint-office-agents/ppt-maker/AGENTS.md`
- Builder philosophy: `/Users/quark/Public/quark/workspace/settlemint-office-agents/ppt-maker/SOUL.md`

## Template Specs
- Template slide size: **10.0" × 5.6"**
- Aspect ratio: **16:9 widescreen**
- Primary font: **Figtree**
- Content slides with page numbers: **5–28**
- Protected branded slides: **1, 2, 29, 30**

## Brand Review Notes
Check for:
- Figtree font family only
- no off-brand colors
- no broken page numbers on slides 5–28
- no modified logos or decorative brand shapes on slides 1, 2, 29, 30
- no full-slide image exports with baked-in text
- unused template slides removed from the final deck

## Content Review Notes
Watch for:
- AI-tell words and empty marketing jargon
- passive voice and bloated body copy
- incorrect DALP terminology
- unsupported claims, placeholders, and `[TO VERIFY]`
- titles that describe a topic instead of making a point

## Script Notes
- `scripts/inspect-pptx.py` is the quick audit helper
- Use it to extract slide text, inspect layouts, and flag non-Figtree fonts before writing the human review
- It is an inspection aid, not the final judgement
