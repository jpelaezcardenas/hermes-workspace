---
title: "Slide Bank — Master Template 2026"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.700830Z
---

# Slide Bank — Master Template 2026

One slide per supported layout, extracted from `Master Template 2026.pptx`.

## Overview

The slide bank contains **22 supported layouts** organized by purpose:

| Category | Slides | Purpose |
|----------|--------|---------|
| **Opening** | 001–002 | Cover and agenda |
| **Structure** | 003–004 | Section dividers, blank |
| **Content** | 005–014 *(excluding removed 009 and 011)* | Text, columns, grids |
| **Data** | 006–008 | Tables and charts |
| **Image** | 015–023 | Text + image combinations |
| **Closing** | 024 | Thank you / Q&A |

## Directory

| ID | File | Layout Name | Category | Usage |
|---|---|---|---|---|
| 001 | `slide-001-cover-slide.pptx` | Cover Slide | opening | Opening title slide; use for deck title and subtitle. |
| 002 | `slide-002-agenda.pptx` | Agenda | opening | Session or section agenda with bullet points and optional icons. |
| 003 | `slide-003-section-separator.pptx` | Section Separator | structure | Part divider with section title and short description. |
| 004 | `slide-004-blank.pptx` | Blank | structure | Minimal slide with optional title; good for full-bleed content. |
| 005 | `slide-005-single-column.pptx` | Single Column | content | Single main text area; use for paragraphs or bullet lists. |
| 006 | `slide-006-table.pptx` | Table | data | Table with title and optional description. |
| 007 | `slide-007-table-with-text.pptx` | Table with Text | data | Table plus explanatory text. |
| 008 | `slide-008-chart-with-text.pptx` | Chart with Text | data | Chart or graph with caption. |
| 010 | `slide-010-two-column.pptx` | Two Column | content | Side-by-side content blocks. |
| 012 | `slide-012-three-column.pptx` | Three Column | content | Three equal columns. |
| 013 | `slide-013-text-2x2.pptx` | Text 2x2 | content | Four content quadrants (2×2 grid). |
| 014 | `slide-014-text-2x3.pptx` | Text 2x3 | content | Six content cells (2×3 grid). |
| 015 | `slide-015-screenshot-right.pptx` | Screenshot Right | image | Body text left, image or screenshot right. |
| 016 | `slide-016-screenshot-left.pptx` | Screenshot Left | image | Image left, body text right. |
| 017 | `slide-017-picture-left-equal.pptx` | Picture Left Equal | image | Picture and text in equal-width columns. |
| 018 | `slide-018-picture-right-equal.pptx` | Picture Right Equal | image | Text and picture in equal-width columns. |
| 019 | `slide-019-picture-left-wide.pptx` | Picture Left Wide | image | Wide picture left, narrow text right. |
| 020 | `slide-020-picture-right-wide.pptx` | Picture Right Wide | image | Narrow text left, wide picture right. |
| 021 | `slide-021-picture-left-one-third.pptx` | Picture Left One Third | image | Picture takes ~⅓ width left. |
| 022 | `slide-022-picture-right-one-third.pptx` | Picture Right One Third | image | Picture takes ~⅓ width right. |
| 023 | `slide-023-picture-full-width.pptx` | Picture Full Width | image | Full-width image with title and caption. |
| 024 | `slide-024-thank-you.pptx` | Thank You | closing | Closing slide. |

## Removed layouts

The following legacy layouts were intentionally removed and must not be used in new decks:

- `slide-009-two-column-with-column-title.pptx`
- `slide-011-three-column-with-title.pptx`

Use `slide-010-two-column.pptx` and `slide-012-three-column.pptx` instead.

> **Note:** Slide numbers 009 and 011 are intentionally skipped (deprecated layouts). The bank contains 22 active slides with non-contiguous numbering.

## Regenerating

Run from the `ppt-maker` folder:

```bash
python3 scripts/extract_slide_bank.py
```

Outputs:
- `slide-bank/slide-NNN-name.pptx`
- `slide-bank/slide-NNN-name.info.json`
- `slide-bank/REGISTRY.json`

`REGISTRY.json` is the authoritative source for supported-slide metadata.
