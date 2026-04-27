# Mermaid Diagram Standards

## Purpose
This document defines mandatory rules for creating, styling, rendering, and placing Mermaid diagrams in bid manager proposals. Every diagram must follow these standards to ensure brand consistency, readability, and proper rendering in Word documents.

---

## Design Rules

### Node Styling
- **Rounded corners on all boxes/nodes.** Use `classDef` with `rx:8,ry:8` or Mermaid's `:::rounded` syntax where supported. Stadium-shaped nodes (`([text])`) and rounded rectangles are preferred over sharp-cornered boxes.
- **No default unstyled nodes.** Every node must have an explicit class applied.

### SettleMint Brand Colors

See `setup/brand-colors.md` for the canonical brand color palette, WCAG contrast pairs, and diagram fill pairings.

**Quick reference for Mermaid diagrams** (subset of the canonical palette):

| Role | Fill (Background) | Text/Border | Usage |
|------|-------------------|-------------|-------|
| Primary | `#D8E8F0` (light steel) | `#000099` (dark navy) | Main process steps, default nodes |
| Secondary | `#F2B8A0` (light orange) | `#C05030` (dark orange) | Decision points, conditional paths |
| Tertiary | `#C0F0C0` (light green) | `#187848` (dark green) | Success states, outputs, completions |
| Accent | `#C8A8E8` (light purple) | `#482068` (dark purple) | External systems, integrations |
| Neutral | `#B8D8E0` (light steel) | `#1E4868` (dark steel) | Support nodes, references, notes |
| Highlight | `#F5F0B0` (light yellow) | `#BCA820` (dark yellow) | Warnings, attention items |
| Background | `#FFFFFF` (white) | - | Diagram background, always white |

#### Color Contrast Rules
- All text must be dark on light backgrounds, **never** light text on light backgrounds
- Minimum contrast ratio: 4.5:1 (WCAG AA standard)
- Border colors should match or be slightly darker than text colors
- Line/arrow colors: `#000099` (dark navy) for primary flows, `#506878` (steel) for secondary

### Mermaid Theme Configuration
Use this exact config when rendering diagrams via `mmdc`:

```json
{
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#E8EAF6",
    "primaryTextColor": "#000099",
    "primaryBorderColor": "#000099",
    "lineColor": "#000099",
    "secondaryColor": "#FFF3E0",
    "tertiaryColor": "#E8F5E9",
    "background": "#FFFFFF",
    "fontFamily": "Figtree, Calibri, sans-serif",
    "fontSize": "14px"
  }
}
```

---

## Sizing Rules

### A4 Page Constraints
- Maximum content width: **~160mm** (approximately 6.3 inches)
- Maximum content height: **~230mm** (between header and footer, approximately 9 inches)
- Diagrams MUST fit within these boundaries, auto-resize if larger

### Orientation
- **Portrait-oriented diagrams preferred** for workflows and flowcharts (tall > wide)
  - Use `graph TD` (top-down) or `graph TB` (top-bottom), NOT `graph LR` (left-right) unless the flow is inherently horizontal
- Landscape diagrams that become thin horizontal strips are hard to read and waste vertical space
- Exception: timeline diagrams or simple 3-4 step horizontal flows

### Node Count Limits
- **Maximum 12-15 nodes per diagram** for flowcharts and process diagrams
- **Maximum 8-10 nodes per level** for hierarchy/org-chart diagrams
- If a process has more steps, split into multiple diagrams with clear "continued" labeling
- Each diagram must be legible when rendered at the maximum A4 content width

### Rendering Specifications
- Output format: **PNG at 3× scale** (216 DPI effective) for crisp rendering in Word
- Insert at **max width 6.0 inches** (Inches(6.0) in python-docx)
- If the rendered image aspect ratio would exceed the page height, scale proportionally to fit

---

## Placement Rules in Word

### Positioning
- All diagrams MUST be **centered horizontally**: never left-aligned, never right-aligned
- Diagrams must fit **within page boundaries**: between header and footer, within left/right margins
- **NO diagram should be cut off** on the right side or bottom

### Sizing Validation
Before inserting a diagram into DOCX:
1. Check rendered image dimensions against page content area
2. If width exceeds content width (6.0 inches): scale down proportionally
3. If height exceeds available content height (~9 inches): scale down proportionally
4. Maintain aspect ratio during all scaling operations
5. After scaling, verify the diagram is still legible (text readable, nodes distinguishable)

### Validation Checks (enforced in markdown_to_docx.py)
- [ ] Image width ≤ 6.0 inches after insertion
- [ ] Image centered (WD_ALIGN_PARAGRAPH.CENTER)
- [ ] No image extends beyond right margin
- [ ] No image extends below footer area
- [ ] Aspect ratio preserved during resize

---

## Planning Rules

### When to Include Diagrams
- **Architecture diagrams**: When describing DALP's platform layers, deployment topology, or integration points
- **Process flows**: For implementation timelines, compliance workflows, asset lifecycle stages
- **Decision trees**: For compliance rule evaluation, eligibility checks
- **Token lifecycle**: For showing the stages from creation through maturity/redemption
- **Comparison flows**: When showing how DALP's approach differs from traditional methods

### When NOT to Include Diagrams
- Do not add diagrams to purely narrative sections (e.g., company overview prose)
- Do not add diagrams that merely restate what a table already shows
- Do not add diagrams to sections shorter than 2 paragraphs, there is not enough context

### Quantity Guidelines
| Proposal Length | Recommended Diagram Count |
|----------------|--------------------------|
| Short (5-10 pages) | 1-2 diagrams |
| Medium (10-20 pages) | 3-5 diagrams |
| Long (20-40 pages) | 5-8 diagrams |
| Very long (40+ pages) | 8-12 diagrams max |

- Every diagram must add value to the section it appears in
- Each diagram should be preceded by a sentence or paragraph that sets context for what the diagram shows
- Each diagram should be followed by a brief reference or interpretation if the diagram is complex

### Diagram Authoring Checklist
Before writing a Mermaid diagram:
1. ☐ Does this section benefit from a visual?
2. ☐ Would a table or list communicate this better?
3. ☐ Is there enough surrounding text to contextualize the diagram?
4. ☐ Will the diagram fit on one A4 page (≤15 nodes, portrait orientation)?
5. ☐ Are the colors from the approved palette?
6. ☐ Is the text in each node concise (max ~30 characters per node)?
