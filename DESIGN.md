---
version: alpha
name: Hermes Workspace
description: "Command-center UI for Hermes Agent: agent orchestration, chat, files, memory, skills, terminal, jobs, and operations."
colors:
  primary: "#041C1C"
  primary-surface: "#06282A"
  primary-card: "#082F31"
  primary-card-raised: "#0A3638"
  primary-text: "#FFE6CB"
  primary-muted: "#A99582"
  accent: "#FFAC02"
  accent-secondary: "#FFE6CB"
  success: "#8FFF89"
  warning: "#FFAC02"
  danger: "#FB2C36"
  light-background: "#F8FAF8"
  light-panel: "#F4F7F5"
  light-card: "#FBFDFB"
  light-text: "#16315F"
  light-muted: "#53687D"
  light-accent: "#2557B7"
  classic-accent: "#B98A44"
  slate-accent: "#7EB8F6"
typography:
  display:
    fontFamily: "EB Garamond"
    fontSize: 3rem
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: 0px
  h1:
    fontFamily: "Inter"
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0px
  h2:
    fontFamily: "Inter"
    fontSize: 1.25rem
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: 0px
  body:
    fontFamily: "Inter"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0px
  label:
    fontFamily: "Inter"
    fontSize: 0.6875rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.2em
  code:
    fontFamily: "JetBrains Mono"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
rounded:
  none: 0px
  sm: 4px
  card: 6px
  panel: 8px
  dialog: 10px
  pill: 9999px
components:
  frame:
    backgroundColor: "{colors.primary-card}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  frame-panel:
    backgroundColor: "{colors.primary-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.panel}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.primary-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.primary-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  raised-frame:
    backgroundColor: "{colors.primary-card-raised}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.panel}"
    padding: "{spacing.md}"
  muted-label:
    backgroundColor: "{colors.primary-surface}"
    textColor: "{colors.primary-muted}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  accent-quiet:
    backgroundColor: "{colors.primary-surface}"
    textColor: "{colors.accent-secondary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  status-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.sm}"
  status-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.sm}"
  status-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.sm}"
  light-shell:
    backgroundColor: "{colors.light-background}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  light-frame:
    backgroundColor: "{colors.light-card}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  light-panel:
    backgroundColor: "{colors.light-panel}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.panel}"
    padding: "{spacing.lg}"
  light-muted-label:
    backgroundColor: "{colors.light-card}"
    textColor: "{colors.light-muted}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  light-button-primary:
    backgroundColor: "{colors.light-accent}"
    textColor: "{colors.light-card}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  classic-button-primary:
    backgroundColor: "{colors.classic-accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  slate-button-primary:
    backgroundColor: "{colors.slate-accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
---

## Overview

Hermes Workspace should feel like an operational command center with an editorial museum-catalog finish: calm, precise, legible, and capable. The product is for people who spend time inside agent workflows, so the interface should reward repeated use rather than perform like a marketing page.

The default visual identity is Hermes Nous: deep teal architecture, warm cream text, and an amber action accent. Secondary themes are allowed, but new UI should use the same underlying grammar: restrained surfaces, compact hierarchy, thin rules, and deliberate accent use.

## Colors

Use the Hermes Nous palette as the primary brand language.

- Deep Teal Foundation (#041C1C): page background and deepest shell chrome.
- Teal Panel (#06282A): sidebars, persistent panels, chat surfaces, and composer areas.
- Teal Card (#082F31): standard cards and framed content.
- Raised Teal (#0A3638): selected rows, nested surfaces, and slightly elevated cards.
- Warm Cream (#FFE6CB): primary text in dark mode and the signature Hermes color.
- Amber Signal (#FFAC02): primary actions, focus rings, active states, and important live activity.
- Cobalt Light Accent (#2557B7): primary accent for light themes, where amber should be reserved for warning or brand moments.

Semantic color use:

- Success is reserved for completed work, healthy services, and verified states.
- Warning is reserved for attention-needed states, not decorative emphasis.
- Danger is reserved for destructive actions, failed checks, auth failures, and irreversible operations.

Avoid rainbow dashboards. Hermes can show complex system state without every panel getting its own accent family.

## Typography

Inter is the product typeface. It carries the dense operational UI: chat, tables, forms, nav, controls, and settings. Use normal letter spacing for readable text.

EB Garamond is a rare display accent. Use it for splash screens, empty states, large editorial metrics, and moments where Hermes needs a little ceremony. Do not use it inside dense panels, tables, buttons, or sidebars.

JetBrains Mono is for code, terminal output, paths, command names, model IDs, tokens, and literal values.

Micro-labels are uppercase, small, and widely tracked. They should label operational groups, metrics, sections, and status clusters. They should not become body copy.

## Layout

Hermes is a workspace, not a landing page. Prefer dense but calm layouts built from full-height regions, split panes, drawers, tabs, and toolbars.

Use stable dimensions for repeated operational surfaces: chat panes, kanban columns, session rows, terminal panels, KPI cards, and file lists. Hover, loading, streaming, and selected states should not resize the layout.

Whitespace should create scannability, not decoration. Use tighter spacing inside panels and more breathing room only between major regions.

On mobile, preserve the same information architecture with stacked panels, drawers, and reachable controls. Do not simplify away core workflows.

## Elevation & Depth

Depth is architectural, not glossy. Standard surfaces should use 1px borders and very soft shadows. In light themes, prefer inset highlights and borders over heavy drop shadows.

Use real elevation only for modals, popovers, toasts, command palettes, active drags, and other floating UI. Avoid stacked cards inside cards.

Streaming and live-agent states may use glow, but keep it subtle and tied to activity. Glow is not a background decoration.

## Shapes

Default cards are square-ish: 6px for compact cards, 8px for panels, 10px for dialogs. Pills are for badges, segmented selections, compact status indicators, and avatar-like affordances.

Avoid large, soft SaaS rounding unless a specific mobile control or floating overlay needs it. Hermes should feel precise and built, not bubbly.

## Components

Buttons are compact and explicit. Primary buttons use the theme accent and should be reserved for the main action in a region. Secondary buttons are framed and quiet. Icon buttons should use familiar icons with tooltips when the action is not obvious.

Cards and panels are functional containers. Use `.frame`, `.frame-panel`, and `.frame-elevated` patterns where possible. Cards should not be decorative wrappers around whole page sections.

Inputs and composers should feel steady and durable: framed surfaces, clear focus ring, readable placeholder text, and stable height during streaming or upload states.

Tables, lists, queues, and kanban boards should prioritize scan speed. Use concise labels, aligned metadata, monospaced identifiers where useful, and calm selected states.

Status badges should combine color, label, and sometimes icon. Do not rely on color alone.

## Do's and Don'ts

Do:

- Reuse existing theme CSS variables before adding new colors.
- Use Inter for functional UI and EB Garamond sparingly for editorial display.
- Keep panels compact, aligned, and predictable.
- Use thin borders, restrained shadows, and subtle activity glow.
- Make complex agent state easy to scan.

Don't:

- Build marketing-style hero sections inside the app shell.
- Add decorative gradient blobs, abstract orbs, or unrelated illustrations.
- Introduce a new accent color for each feature.
- Nest cards inside cards.
- Let text, buttons, counters, or badges resize their parent layout on hover or loading.
