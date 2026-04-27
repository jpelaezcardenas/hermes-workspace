---
title: "Technical Visual Checks"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.660019Z
---

# Technical Visual Checks

> This file defines the comprehensive technical/visual inspection criteria for PPTX reviews.
> These checks are **separate from content/messaging** — they focus on production quality,
> layout correctness, and visual integrity.
>
> Reference: brand-design-system.md from ppt-maker for exact specifications.

---

## 1. Text Overflow & Overlap Detection

### What to Check
- **Text overflowing textboxes:** Text that extends beyond the visible boundary of its container.
  - Look for text that is clipped at the bottom or right edge of a textbox.
  - Look for text that wraps into an area too small to display the last line(s).
  - Check auto-fit settings: "Shrink text on overflow" can mask problems by making text unreadably small.
  - If auto-shrink reduces text below 10pt, flag it as a functional overflow.
- **Text overlapping other elements:** A text box whose rendered content visually collides with another shape, image, or text box.
  - Compare bounding boxes of all text elements against all other elements on the same slide.
  - Account for text that extends beyond the visible textbox boundary (no auto-fit, no shrink).
  - Pay special attention to long titles that may run into logos, page numbers, or edge elements.
- **Text cut off at slide edges:** Text positioned so close to the slide boundary that projection or export crops it.
  - All text must remain within safe margins (minimum 0.5" from all slide edges at reference scale).

### Severity
- Text visibly cut off or overlapping: **Hard Fail**
- Text auto-shrunk below 10pt to fit: **Major**
- Text within 0.25" of slide edge but not clipped: **Minor**

### How to Detect (Inspector Guidance)
- For each text frame: compare text bounding box (position + size) against all other shapes on the slide.
- Check if `autofit` is set to `shrink` and whether the resulting font size drops below minimum thresholds.
- Flag any text frame where the total text height (line count × line height) exceeds the frame height.

---

## 2. Element Overlap Detection

### What to Check
- **Shape-on-shape overlap:** Two shapes, images, or text boxes that visually overlap when they shouldn't.
  - Intentional overlap (e.g., a badge on a card, a label on a diagram) is acceptable if deliberate.
  - Unintentional overlap (e.g., two cards overlapping due to positioning error) is a defect.
- **Image-on-text overlap:** An image that covers or partially obscures text content.
- **Z-order problems:** An element that should be in front is behind another, or vice versa.
- **Grouping collisions:** Elements within a group that overlap each other in ways that break readability.

### Detection Criteria
- For every pair of elements on a slide, compute bounding box intersection.
- If two non-background elements overlap by more than 5% of the smaller element's area, flag it.
- Exceptions: elements explicitly grouped together, decorative accent lines, intentional layered design.
- Cards, content boxes, and data panels should NEVER overlap each other.

### Severity
- Content-bearing elements overlapping and obscuring information: **Hard Fail**
- Decorative elements overlapping content: **Major**
- Minor edge overlap between non-critical elements: **Minor**

---

## 3. Font Correctness

### Brand Font Requirement
- **Figtree is the sole permitted typeface** for all SettleMint presentations.
- Acceptable weights: Regular, SemiBold, Bold, ExtraBold.
- No other font families are permitted in any editable text element.

### What to Check
- Every text run in every text frame on every slide.
- Font family must be exactly "Figtree" (case-sensitive match).
- Flag ANY occurrence of: Arial, Calibri, Aptos, Helvetica, Montserrat, Times New Roman, Segoe UI, Roboto, Open Sans, or any other non-Figtree font.
- Check table cells — these often inherit default fonts when pasted from external sources.
- Check chart labels and axis text if charts are present.
- Check text within grouped objects.
- Check master slide and layout inheritance — a slide may display Figtree but inherit a non-Figtree default.

### Common Font Contamination Sources
- Copy-paste from Word, Excel, or web browsers.
- Chart objects that default to Calibri or Arial.
- Table cells that reset to template defaults if the template wasn't properly configured.
- Imported diagrams or shapes from other presentations.

### Severity
- Any non-Figtree font in visible content: **Hard Fail**
- Non-Figtree font in hidden/inherited elements: **Major** (will surface when edited)

---

## 4. Font Sizing Validation

### Size Ranges by Element Type

| Element Type | Minimum (pt) | Recommended (pt) | Maximum (pt) | Weight |
|---|---|---|---|---|
| Cover Title | 30 | 36 | 44 | Bold |
| Slide Title | 20 | 24 | 30 | Bold |
| Card/Section Heading | 14 | 16 | 20 | Bold |
| Sub-heading / Feature Name | 12 | 14 | 16 | Bold |
| Body Text | 11 | 12 | 14 | Regular |
| Body Small / Supporting | 10 | 11 | 12 | Regular |
| Caption / Footnote / Page Number | 8 | 9 | 10 | Regular |

### What to Check
- Title text must be visually dominant — always larger than body text on the same slide.
- Body text must never drop below 11pt on content slides.
- Captions and footnotes must never drop below 8pt.
- If auto-shrink reduces any text below these minimums, flag it.
- Font sizes should be consistent across slides of the same type:
  - All slide titles should use the same size (typically 24pt).
  - All body text should use the same size throughout the deck.
  - All captions should use the same size throughout the deck.
- Flag any slide where more than 4 different font sizes appear (indicates messy hierarchy).
- Flag any title that is smaller than or equal to the body text size on the same slide.

### Severity
- Text below absolute minimums (body <11pt, caption <8pt): **Major**
- Inconsistent title sizes across slides (>2pt variation): **Major**
- More than 4 font sizes on a single slide: **Minor**
- Title not visually dominant over body text: **Major**

---

## 5. Element Spacing Validation

### Margin Requirements (at 13.333" × 7.5" template scale)

| Zone | Minimum |
|---|---|
| Left margin (content from slide edge) | 0.93" |
| Right margin (content from slide edge) | 0.93" |
| Top margin (content zone start) | 1.47" (below title zone) |
| Bottom margin (above footer zone) | 0.50" above footer |

### Spacing Between Elements

| Relationship | Minimum Gap |
|---|---|
| Card to card (horizontal) | 0.33" |
| Card to card (vertical) | 0.33" |
| Card to slide edge | 0.93" |
| Text block to text block | 0.20" |
| Image to text | 0.25" |
| Title to first content element | 0.33" |
| Last content element to footer zone | 0.27" |
| Logo clear space (all sides) | 0.25" |

### Gutter Consistency
- In multi-column layouts, all gutters (spaces between columns) must be equal width.
- Tolerance: gutters should not vary by more than 0.05" from each other.
- In card grids, horizontal and vertical gaps should be equal (0.33" per brand system).

### What to Check
- No content element should be closer than 0.50" from any slide edge (absolute minimum).
- Cards, panels, and content boxes must not touch each other or slide edges.
- Consistent spacing patterns within a slide (if three cards have equal gaps, the fourth must match).
- Vertical spacing rhythm: elements should step down the slide at consistent intervals.
- Elements should not crowd the bottom of the slide — this creates visual instability.

### Severity
- Content touching or overlapping slide edges: **Hard Fail**
- Content within 0.25" of slide edge: **Major**
- Inconsistent gutters in multi-column/card layouts (>0.05" variance): **Major**
- Spacing slightly off but not causing readability issues: **Minor**

---

## 6. Header & Footer Verification

### Header Elements
- Slide titles must appear in the designated title zone (Y: 0.47"–1.13" at scaled coordinates).
- Title zone may include an accent line (1.5pt, brand blue, ~1.6" wide at scaled size).
- Cover slides (1, 2) and closing slides (29, 30) have their own header treatment — do not apply content slide rules to these.

### Footer Elements
- **Page numbers** must appear on content slides (5–28 in the 30-slide catalog).
- Page number position: footer zone (Y: 6.73"–7.00" at scaled coordinates).
- Page number font: Figtree, 9pt, text light color (#A0A0A0).
- Page numbers should be sequential and match actual slide position.
- No page numbers on cover slides (1, 2) or closing slides (29, 30).
- Section divider slides (slide 4 type) typically do not have page numbers.

### What to Check
- Every content slide has a page number in the correct position.
- Page numbers are not duplicated, misaligned, or overlapping other content.
- Page numbers use the correct font, size, and color.
- Header/title zone is consistently positioned across all content slides.
- No footer content collides with body content above it.
- The accent line (if present) is correctly positioned and colored.

### Severity
- Missing page numbers on content slides: **Major**
- Page numbers wrong (non-sequential, wrong font, wrong position): **Major**
- Page numbers present on cover/closing slides where they shouldn't be: **Minor**
- Footer elements overlapping body content: **Major**

---

## 7. Title Placement Consistency

### Expected Title Position
- Title zone: Y 0.47" to 1.13" (at 13.333" × 7.5" scale).
- Left edge of title: aligned with left content margin (0.93").
- Title should be left-aligned on content slides (center alignment acceptable for cover/divider slides only).

### What to Check
- All content slide titles should share the same Y position (tolerance: ±0.05").
- All content slide titles should share the same X position (tolerance: ±0.05").
- Title width should be consistent — titles should not randomly change width across slides.
- Title font size should be consistent (24pt Bold per brand system, tolerance: ±2pt).
- Slides of the same type should have identical title positioning.
- Section divider slides may have different title positioning (centered, larger) — this is acceptable.

### Common Problems
- Title drifts up or down by a few pixels across slides — noticeable when flipping through rapidly.
- Title on one slide is left-aligned while another is center-aligned (without layout justification).
- Title textbox is wider on some slides than others, causing text to reflow differently.

### Severity
- Title position varies by >0.10" across content slides: **Major**
- Title alignment inconsistency (left vs center on similar slides): **Major**
- Title position varies by 0.05"–0.10": **Minor**
- Title positioned outside the title zone entirely: **Hard Fail**

---

## 8. Logo Verification

### SettleMint Logo Requirements
- The logo must maintain its original aspect ratio at all times.
- The logo must not be stretched, squashed, rotated, skewed, cropped, or partially hidden.
- The logo must not be recolored, opacity-reduced, outlined, shadowed, or stylized.
- The logo should appear in its designated template position (typically on cover and closing slides).

### Position & Size Checks
- Logo should appear in approved template positions only.
- Logo must have minimum clear space of 0.25" on all sides.
- Logo must not collide with titles, edges, page numbers, or other graphics.
- Logo must not touch slide edges.
- If the logo appears on content slides (e.g., corner watermark), it must be consistently positioned across all such slides.

### Quality Checks
- Logo should not appear pixelated or blurry (check resolution relative to display size).
- Logo should not have visible compression artifacts.
- If the logo is an embedded image (not a vector), minimum resolution should be 150 DPI at display size.
- Logo aspect ratio must be preserved — compare width/height ratio against the known original ratio.

### Severity
- Logo distorted (stretched, squashed, skewed): **Hard Fail**
- Logo recolored or stylized: **Hard Fail**
- Logo overlapping other elements: **Major**
- Logo missing from slides where template requires it: **Major**
- Logo positioned inconsistently across slides: **Minor**
- Logo slightly pixelated but recognizable: **Minor**

---

## 9. Content Density Assessment

### Word Count Thresholds Per Slide
| Rating | Word Count | Assessment |
|---|---|---|
| 🟢 Green | < 60 words | Optimal density |
| 🟡 Yellow | 60–100 words | Acceptable if hierarchy and spacing are strong |
| 🔴 Red | > 100 words | Too dense for presentation use |

### Additional Density Checks
- **Title length:** 3–8 words ideal, maximum 12 words.
- **Bullet count:** Maximum 6 bullets per group.
- **Bullet length:** Maximum 15 words per bullet, ideally under 12.
- **Paragraphs on slides:** Multi-paragraph blocks are almost always a red flag.
- **Character density:** If total character count exceeds 500 on a single slide, flag it.
- **Empty slides:** Slides with fewer than 10 words (excluding title) may be under-populated unless they are visual/image slides.
- **Speaker notes vs. canvas:** If content is dense, check whether it belongs in speaker notes instead.

### Severity
- More than 100 words on a slide with poor hierarchy: **Major**
- More than 100 words but with clear hierarchy/spacing: **Minor**
- Slide with < 10 words and no visual content: **Minor** (possible placeholder)
- More than 150 words on any slide: **Hard Fail** (this is a document, not a slide)

---

## 10. Color Contrast Verification

### WCAG AA Compliance for Presentations
- All text must be readable against its background.
- Minimum contrast ratio: **4.5:1** for body text (< 18pt).
- Minimum contrast ratio: **3:1** for large text (≥ 18pt or ≥ 14pt bold).

### Approved Contrast Pairs (Dark on Light)
| Foreground | Background | Passes |
|---|---|---|
| `#0000FF` (Blue) | `#FFFFFF` (White) | ✅ AA |
| `#111111` (Dark) | `#FFFFFF` (White) | ✅ AAA |
| `#111111` (Dark) | `#FAFAFA` (Card bg) | ✅ AAA |
| `#787878` (Gray) | `#FFFFFF` (White) | ✅ AA |
| `#787878` (Gray) | `#F7F7F7` (Light bg) | ✅ AA (marginal) |

### Approved Contrast Pairs (Light on Dark)
| Foreground | Background | Passes |
|---|---|---|
| `#FFFFFF` (White) | `#0000FF` (Blue) | ✅ AA |
| `#FFFFFF` (White) | `#111111` (Dark) | ✅ AAA |
| `#FFFFFF` (White) | `#1E4868` (Navy) | ✅ AA |

### What to Flag
- Light gray text on white background (especially `#A0A0A0` on `#FFFFFF` — fails AA for small text).
- Colored text on colored backgrounds without verified contrast ratio.
- Text on photographic backgrounds without overlay or text shadow to ensure readability.
- Chart labels or data values with insufficient contrast against chart element colors.
- Text overlaid on gradient backgrounds where contrast varies across the text span.

### Severity
- Body text failing WCAG AA contrast ratio: **Major**
- Large text (titles) failing WCAG AA contrast ratio: **Major**
- Caption/footnote text with marginal contrast: **Minor**
- Text on photographs without readability treatment: **Major**

---

## 11. Consistency Across Slides

### What to Check for Consistency
- **Font consistency:** Same font sizes for same element types across all slides.
  - All slide titles should be the same size and weight.
  - All body text should be the same size and weight.
  - All captions should be the same size and weight.
- **Color consistency:** Same colors used for same semantic purposes throughout.
  - If brand blue is used for emphasis on slide 5, it should be used the same way on slide 15.
  - Accent colors should not randomly change meaning between slides.
- **Spacing consistency:** Same margins, gutters, and padding used throughout.
  - If 3-column layouts use 0.33" gutters on one slide, all 3-column layouts should match.
  - Card padding should be uniform across all card-based slides.
- **Alignment consistency:** Same alignment patterns for similar content types.
  - If titles are left-aligned on slide 5, they should be left-aligned on slide 15.
  - Body text alignment should be uniform throughout.
- **Visual treatment consistency:** Same styling for similar elements.
  - Cards should look the same (border, shadow, radius, background) on every slide that uses them.
  - Icons should be the same style (line weight, color, size) throughout.
  - Numbered items should use the same numbering style everywhere.

### Inconsistency Threshold
- Any visual property that varies across 3+ slides of the same type without clear purpose = flag it.
- A single slide breaking the pattern of the rest of the deck = flag it.

### Severity
- Font/size inconsistency across slides: **Major**
- Color usage inconsistency (same element, different colors): **Major**
- Spacing inconsistency in similar layouts: **Minor**
- One-off style deviation on a single slide: **Minor**

---

## 12. Image Quality Checks

### Resolution Requirements
- Images should not appear pixelated or blurry at their display size.
- Minimum effective resolution: **150 DPI** at the rendered size on the slide.
- For full-width images (spanning the slide): minimum source width of **1920px**.
- For half-width images: minimum source width of **960px**.
- For thumbnails/icons: minimum source size of **128px**.

### Distortion Checks
- Images must maintain their original aspect ratio.
- Check for horizontal or vertical stretching (compare image source aspect ratio to display aspect ratio).
- Tolerance: aspect ratio should not deviate by more than **2%** from original.

### Cropping Quality
- Images should be cropped to show the relevant content, not random portions.
- Faces in photos should not be cut off at awkward points (forehead, chin).
- Product screenshots should show complete, relevant UI sections.
- Cropping should not remove important context or labels.

### General Image Quality
- No visible compression artifacts (JPEG blocking, color banding).
- No watermarks from stock photo services.
- No images with embedded text that contradicts or duplicates slide text.
- Consistent image style throughout the deck (photo style, illustration style, icon style should be cohesive).

### Severity
- Visibly pixelated image in prominent position: **Major**
- Image stretched/distorted: **Major**
- Stock photo watermark visible: **Hard Fail**
- Awkward or nonsensical crop: **Minor**
- Inconsistent image styles across the deck: **Minor**
- Low-res image used as small thumbnail (barely noticeable): **Minor**

---

## Technical Visual Score

When scoring the technical/visual quality of a deck, use these checks alongside the existing scoring rubric dimensions. The technical visual checks primarily feed into:

- **Brand Compliance** (dimension 1): font correctness, logo verification, color usage
- **Visual Balance** (dimension 5): spacing, density, element overlap, alignment
- **Completeness** (dimension 8): placeholder detection, missing elements
- **Editability** (dimension 9): text overflow, auto-shrink issues

A deck can score well on content/messaging but poorly on technical visual quality, or vice versa. Both matter for the final verdict.
