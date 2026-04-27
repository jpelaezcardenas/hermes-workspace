# PPTX Design Specification — SettleMint

> Single source of truth for all presentation design rules.
> All agents building or reviewing PPTX files MUST follow this spec.

## Slide Dimensions
- **Format**: 16:9 widescreen
- **Size**: 13.333" × 7.5" (12,192,000 × 6,858,000 EMU)

---

## Grid & Spacing

### Page Margins (outer padding from slide edge)
- **All sides**: 0.4" (365,760 EMU) — symmetric, no exceptions

### Header Zone
- **Height**: 0.5" (from y=0.15" to y=0.65")
- **Top-left**: Slide title, left-aligned at x=0.4"
- **Top-right**: SettleMint logo, right-aligned (right edge at 12.933")
- **Logo height**: Match title text row height (~0.35")
- **Logo**: Proportionally scaled from 2082×473px original

### Footer Zone
- **Height**: 0.35" (from y=7.0" to y=7.35")
- **Bottom-left**: "SettleMint Confidential" at x=0.4", font 8pt, color #A8AAB0
- **Bottom-right**: Slide number, right-aligned at x=12.933", font 8pt, color #A8AAB0

### Content Area
- **Top**: y = 0.75" (below header)
- **Bottom**: y = 6.9" (above footer)
- **Left**: x = 0.4"
- **Right**: x = 12.933"
- **Usable width**: 12.533"
- **Usable height**: 6.15"

### Gutters (between columns)
- **Standard gutter**: 0.25" (228,600 EMU)
- **Tight gutter**: 0.15" (for 4+ column layouts)

---

## Text Box & Shape Rules

### Internal Margins (padding inside text boxes)
- **All sides**: 0 (zero) — no internal margin on any text box or shape
- This is critical: python-pptx defaults to ~0.05" internal padding. Override:
  ```python
  from pptx.util import Emu
  text_frame.margin_left = Emu(0)
  text_frame.margin_right = Emu(0)
  text_frame.margin_top = Emu(0)
  text_frame.margin_bottom = Emu(0)
  ```

### Shape Defaults
- **Border**: None by default (no outline)
- **Fill**: None by default (transparent) unless specified
- **Shadows**: None by default

---

## Image Treatment

### Border Radius
- **Standard**: 8px (76,200 EMU) — applies to ALL images
- Implementation in python-pptx (XML-level):
  ```xml
  <a:prstGeom prst="roundRect">
    <a:avLst>
      <a:gd name="adj" fmla="val 5000"/>  <!-- ~8px equivalent -->
    </a:avLst>
  </a:prstGeom>
  ```
- For python-pptx, set shape geometry to 'Rounded Rectangle' with adjustment

### Image Sizing
- **Aspect ratio**: Always preserve — never stretch
- **Fit mode**: Cover (crop to fill area) preferred over contain
- **Resolution**: Minimum 1920×1080 for full-width images, 960×720 for half-width

### Image Sources
- Stock images: `shared/stock-images/` (categorized by topic)
- Screenshots: Avoid in templates — use actual stock photos

---

## Typography

### Font Family
- **Primary**: Figtree (all text, all weights)
- **Fallback**: Calibri (if Figtree not installed)
- **Monospace** (code blocks): JetBrains Mono → Consolas fallback

### Font Sizes
| Element | Size | Weight | Line Spacing |
|---------|------|--------|-------------|
| Cover title | 40pt | Bold | 1.1× |
| Section divider title | 44pt | Bold | 1.1× |
| Slide title (header) | 18pt | Bold | 1.0× |
| Subtitle | 16pt | Regular | 1.2× |
| Body text | 14pt | Regular | 1.3× |
| Bullet text | 13pt | Regular | 1.3× |
| Sub-bullet | 12pt | Regular | 1.3× |
| Caption | 10pt | Regular | 1.2× |
| Stat number | 48pt | Bold | 1.0× |
| Stat label | 12pt | Regular | 1.2× |
| Footer text | 8pt | Regular | 1.0× |
| Code/mono | 11pt | Regular | 1.2× |

### Paragraph Spacing
- **Space before**: 0pt (controlled by layout, not paragraph)
- **Space after**: 6pt (between paragraphs)
- **Bullet space after**: 4pt

### Text Alignment
- **Titles**: Left-aligned (never centered on content slides)
- **Cover/section/closing titles**: Centered or left per layout
- **Body**: Left-aligned
- **Stats/numbers**: Center-aligned
- **Footer**: Left (confidential) / Right (page number)

---

## Color System

### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | #0000FF | Headings, links, primary accents |
| Secondary Blue | #1A5BDC | Secondary headings, hover states |
| Accent Blue | #4A90E8 | Charts, highlights, icons |
| Dark Navy | #0A1A50 | Dark backgrounds only (Title-Dark layout) |
| Light Blue | #D0EAFA | Background tints, table headers |
| Text Dark | #0E1E38 | All body text on white backgrounds |
| Text Light | #FFFFFF | All text on dark/gradient backgrounds |
| Background | #FFFFFF | Default slide background |

### Supporting Colors (for charts, tables, data viz)
| Name | Hex | Usage |
|------|-----|-------|
| Green | #62D6A0 | Positive, success, pros |
| Red/Orange | #CC7E52 | Warning, cons, attention |
| Purple | #7B3DC0 | Tertiary data series |
| Steel | #506888 | Neutral, borders, muted text |
| Light Gray | #A8AAB0 | Footer text, subtle elements |

### Color Rules
- **Max 3 colors** per slide (excluding text black/white)
- **Charts**: Use accent palette in order: Primary → Accent → Green → Purple → Orange
- **Table headers**: Light Blue (#D0EAFA) background, Dark text
- **Alternating rows**: White / #F5F8FA
- **Links**: Primary Blue, no underline

---

## Logo Usage

### Placement
- **Position**: Top-right of every slide (inside header zone)
- **Height**: Same as title text row (~0.35")
- **Right edge**: 0.4" from slide right edge

### Variants
| Background | Logo File |
|-----------|-----------|
| White/light | `shared/brand/settlemint-logo-dark.png` |
| Dark/navy | `shared/brand/settlemint-logo-light.png` |
| Gradient backgrounds | `shared/brand/settlemint-logo-dark.png` (the gradients are light enough) |

### Logo Sizing
- Original: 2082×473px (aspect ratio ~4.4:1)
- At 0.35" height → width = ~1.54"
- Never distort, always maintain aspect ratio

---

## Background Images

### Branded Backgrounds (in `shared/brand/`)
| File | Usage | Description |
|------|-------|-------------|
| `bg-cover.png` | Title/Cover slides | Blue→green diagonal gradient, clean |
| `bg-section.png` | Section divider slides | Blue→teal gradient with geometric hexagon overlay |
| `bg-thankyou.png` | Closing/Thank You slides | Green→blue reversed gradient (mirrors cover) |

### Background Rules
- Background images: always full-bleed (cover entire slide)
- Text on gradient backgrounds: always WHITE
- No background images on content slides (white background only)

---

## Slide-Specific Rules

### Cover Slide
- Background: `bg-cover.png`
- Title: 40pt, bold, white, left-aligned (left 60% of slide)
- Subtitle: 20pt, regular, white, below title
- Logo: dark version, top-right

### Section Divider
- Background: `bg-section.png`
- Section title: 36pt, bold, white, left side
- Section subtitle: 18pt, regular, white, below title
- Logo: dark version, top-right

### Content Slides
- Background: white
- Title: 18pt, bold, #0E1E38, top-left (header zone)
- Logo: dark version, top-right
- Footer: SettleMint Confidential (left) + slide number (right)

### Closing Slide
- Background: `bg-thankyou.png`
- "Thank You" or CTA: 40pt, bold, white, centered
- Contact info: 18pt, regular, white, below
- Logo: dark version, top-right

---

## Chart & Table Defaults

### Charts
- **Title**: 14pt, bold, above chart
- **Axis labels**: 10pt, #506888
- **Data labels**: 10pt, bold
- **Grid lines**: #E8E8E8, 0.5pt
- **Legend**: 10pt, below or right of chart
- **Color sequence**: Primary → Accent → Green → Purple → Orange

### Tables
- **Header row**: Light Blue (#D0EAFA) background, 12pt bold text
- **Body rows**: 12pt regular, alternating white/#F5F8FA
- **Borders**: 0.5pt #E8E8E8, horizontal only (no vertical)
- **Cell padding**: 4pt all sides
- **No outer border** — clean/modern look

---

## Do's and Don'ts

### Do
- ✅ Use consistent 0.4" margins
- ✅ Zero internal margins on all text boxes
- ✅ 8px border radius on all images
- ✅ Figtree font everywhere
- ✅ Left-align body text
- ✅ Use stock photos from shared library
- ✅ Keep to 3 colors max per slide
- ✅ Use the branded backgrounds for Cover/Section/Closing only

### Don't
- ❌ Center body text
- ❌ Use more than 2 font sizes per slide (title + body)
- ❌ Add shadows to shapes
- ❌ Use borders/outlines on text boxes
- ❌ Stretch images (always maintain aspect ratio)
- ❌ Use screenshots as placeholder content
- ❌ Put gradient backgrounds on content slides
- ❌ Use non-brand colors for data visualization
