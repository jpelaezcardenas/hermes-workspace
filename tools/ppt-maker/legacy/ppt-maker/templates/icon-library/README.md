---
title: "Icon Library — PPTX Builder"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.702928Z
---

# Icon Library — PPTX Builder

## Overview

A curated library of **70 icons** from [Lucide](https://lucide.dev) (MIT License), rendered in **7 brand color variants** as 512×512 transparent PNGs.

**Total assets:** 70 SVGs + 490 PNGs

## Categories

| Category | Count | Icons |
|----------|-------|-------|
| Business | 15 | building-2, briefcase, wallet, credit-card, banknote, coins, receipt, trending-up, trending-down, pie-chart, bar-chart-3, landmark, calculator, dollar-sign, percent |
| Technology | 15 | shield-check, lock, server, cloud, database, cpu, circuit-board, code-2, terminal, globe, network, wifi, key, fingerprint, scan |
| Blockchain | 10 | blocks, link-2, hexagon, layers, git-branch, workflow, repeat, arrow-left-right, check-circle, zap |
| Compliance | 10 | scale, clipboard-check, file-check, badge-check, gavel, book-open, stamp, scroll, list-checks, shield |
| Process | 10 | settings, cog, refresh-cw, play-circle, timer, clock, rocket, target, flag, send |
| People | 10 | users, user-check, message-square, mail, phone, headphones, presentation, award, star, heart |

## Color Variants

Each icon is available in these brand colors:

| Color | Hex | Directory |
|-------|-----|-----------|
| Blue | `#0000FF` | `png/blue/` |
| White | `#FFFFFF` | `png/white/` |
| Black | `#111111` | `png/black/` |
| Green | `#187848` | `png/green/` |
| Purple | `#8848C8` | `png/purple/` |
| Orange | `#C05030` | `png/orange/` |
| Steel | `#1E4868` | `png/steel/` |

## Directory Structure

```
icon-library/
├── INDEX.json          # Machine-readable index with names, tags, categories
├── README.md           # This file
├── svg/                # Source SVGs (Lucide, MIT License)
│   ├── building-2.svg
│   ├── briefcase.svg
│   └── ...
└── png/                # Rendered 512×512 transparent PNGs
    ├── blue/
    ├── white/
    ├── black/
    ├── green/
    ├── purple/
    ├── orange/
    └── steel/
```

## Usage in Presentations

### Finding Icons

1. **By category:** Browse `INDEX.json` → filter by `category`
2. **By tag:** Search `INDEX.json` → `tags` array for semantic matches
3. **By name:** Direct path: `png/{color}/{icon-name}.png`

### Recommended Usage

- **Slide backgrounds:** Use `white` or `steel` variants on dark backgrounds
- **Accent icons:** Use `blue`, `green`, or `purple` for brand-aligned accents
- **High contrast:** Use `black` on light backgrounds, `white` on dark
- **Size:** Icons are 512×512 — scale down as needed; they're sharp at any size

### Example Path

```
png/blue/shield-check.png    → Blue security icon
png/steel/database.png       → Steel database icon
png/white/rocket.png         → White rocket icon (for dark slides)
```

## License

Icons sourced from [Lucide Icons](https://lucide.dev) under the [MIT License](https://github.com/lucide-icons/lucide/blob/main/LICENSE).
