---
name: hermes-ui
description: Build or revise Hermes Workspace UI using the shared DESIGN.md visual system, existing theme variables, and operational workspace patterns.
---

# Hermes UI

Use this skill whenever creating or changing Hermes Workspace screens, components, dashboards, settings, chat surfaces, memory views, job views, or agent orchestration UI.

## Source of Truth

Read `/Users/asherweisberger/hermes-workspace/DESIGN.md` before making UI decisions. Treat it as the visual contract for colors, typography, spacing, shape, density, component behavior, and motion.

Also inspect nearby existing components and `/Users/asherweisberger/hermes-workspace/src/styles.css` before adding new styles. Prefer the existing theme variables:

- `--theme-bg`
- `--theme-sidebar`
- `--theme-panel`
- `--theme-card`
- `--theme-card2`
- `--theme-border`
- `--theme-border-subtle`
- `--theme-text`
- `--theme-muted`
- `--theme-accent`
- `--theme-accent-subtle`
- `--theme-accent-border`

## UI Direction

Hermes should feel like an operational command center with an editorial finish. Build dense, calm, highly scannable interfaces for repeated use. Favor panes, frames, rows, tabs, toolbars, drawers, and stable lists over decorative marketing composition.

Use the established utility vocabulary where it fits:

- `.micro-label` for compact uppercase section labels.
- `.editorial-display` for rare display moments.
- `.numeral-display` for hero metrics.
- `.frame`, `.frame-panel`, and `.frame-elevated` for framed surfaces.
- `.editorial-rule` and `.editorial-rule-double` for major dividers.

## Rules

- Use existing theme variables instead of hardcoded colors unless adding a true design token.
- Keep cards at 6-8px radius in normal app surfaces.
- Use real elevation only for floating UI such as modals, popovers, command palettes, and toasts.
- Keep text readable and stable across mobile and desktop.
- Preserve layout dimensions during loading, streaming, hover, selection, and empty states.
- Use icons for tool actions when an icon exists, with accessible labels or tooltips.
- Do not add decorative gradient blobs, abstract orbs, nested cards, or one-off accent palettes.
- Do not turn app screens into landing pages.

## Verification

Before finishing a UI change, check:

- The screen still works in both Hermes Nous dark and light variants.
- Text does not overlap or overflow its controls.
- The layout remains stable during loading, empty, selected, and streaming states.
- The change reuses existing component patterns where reasonable.
