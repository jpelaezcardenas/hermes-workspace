---
title: "Slide Design Rules"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.659782Z
---

# Slide Design Rules

Use this file as the visual quality reference when scoring slide balance, readability, and composition.
These are practical review rules, not abstract design theory.
If a slide breaks several rules at once, score it down even if no single issue looks catastrophic.

## 1. Core Principle
- Every slide should communicate one clear point fast.
- The slide should feel intentional, not merely populated.
- Good slides create clarity through restraint.
- If a slide feels cramped, it IS cramped.

## 2. Text Density Thresholds
- Green density: fewer than 60 words total on the slide.
- Yellow density: 60 to 100 words total; acceptable only if hierarchy and spacing are strong.
- Red density: more than 100 words total; usually too dense for presentation use.
- Titles should ideally be 3 to 8 words.
- Titles should not exceed 12 words unless there is a very strong reason.
- Titles should make a point, not merely label a topic.
- Body text should be scannable at a glance.
- Bullet points should be no more than 15 words each.
- Bullet groups should contain no more than 6 bullets.
- If a slide needs more than 6 bullets, it probably needs grouping, splitting, or redesign.
- Multi-paragraph slides are almost always a red flag.
- Dense explanatory text belongs in speaker notes, not on the canvas.

## 3. Whitespace Rules
- Text content should stay at least 0.5 inches from all slide edges.
- Respect the template margins even when a layout feels spacious.
- Sections should have clear visual separation from each other.
- Cards, boxes, or panels should not touch each other.
- Cards, boxes, or panels should not touch slide edges.
- Visual breathing room is part of the message, not wasted space.
- Slides should breathe without feeling empty.
- If every available area is filled, the slide is overworked.
- Uneven whitespace is acceptable only when it reinforces hierarchy.
- Crowding near the bottom or corners is especially bad because it makes the slide feel unstable.

## 4. Visual Hierarchy
- Hierarchy should read clearly as title → subtitle → body → caption.
- The size progression between these levels should be obvious, not subtle.
- The title should dominate the first scan.
- There should be one focal point per slide.
- Supporting elements should not compete with the main message.
- Emphasis should be created with size, weight, spacing, and position before using extra color.
- If multiple elements shout for attention, hierarchy is broken.
- Captions, labels, and secondary notes should feel secondary.
- Icons and images should be sized in proportion to their importance.
- Large visuals need a reason; small visuals should still be legible.

## 5. Alignment Standards
- Pick a clear alignment logic per slide and stick to it.
- Left-aligned systems are usually safer than mixed alignment.
- Center alignment is acceptable for simple headline slides, but should not drift into body content without reason.
- Within a single slide, do not mix left, centered, and floating text casually.
- Multi-column layouts must be evenly spaced.
- Gutters between columns should look deliberate and consistent.
- Text baselines should align across columns where comparable content appears.
- Similar cards should share the same top edge, width logic, and spacing rhythm.
- Objects should snap to grid rather than appearing manually nudged.
- Near-alignment is misalignment; if it looks off, count it as off.

## 6. Image Usage
- Images should support the message, not merely decorate the slide.
- Decorative filler visuals weaken serious business slides.
- Do not use stretched, squashed, distorted, or visibly pixelated images.
- Avoid generic stock-photo clichés like handshakes, puzzle pieces, and lightbulbs.
- Screenshots should be high resolution and cropped to the relevant area.
- Screenshots should highlight what matters instead of forcing the audience to hunt for it.
- If an image adds no information, it is clutter.
- Visual style should feel consistent across the deck; random image treatments create noise.
- Charts, diagrams, and UI captures should be readable at presentation distance.

## 7. Common Anti-Patterns To Flag
- The wall of text: too much copy, weak hierarchy, no scanning path.
- The empty slide: obvious placeholder content or a slide that was never truly filled.
- The kitchen sink: three or more competing messages jammed onto one slide.
- The infographic dump: a dense diagram dropped in with no explanation or framing.
- The bullet marathon: 10 or more bullets with no grouping or prioritization.
- The font zoo: three or more different fonts on one slide.
- The color explosion: random colors that do not belong to the template system.
- The edge cram: text, charts, or cards pushed too close to borders.
- The fake balance slide: symmetrical layout but wildly uneven content weight.
- The oversized visual slide: an image dominates the canvas without earning that dominance.

## 8. Review Heuristics
- Ask what the audience notices in the first 3 seconds; if the answer is unclear, the slide is weak.
- Ask whether the main point survives if the presenter says nothing for 5 seconds.
- If a slide needs verbal rescue to make sense, the design is not doing enough.
- If the slide feels simultaneously busy and vague, it fails both density and hierarchy.
- Strong slides feel easy because the hard editing already happened.

## 9. Content Density Assessment

### Optimal Ranges
- **Under-populated slide:** < 10 words (excluding title), no meaningful visual content. Likely a placeholder or missed slide.
- **Ideal density:** 20–60 words total. Room for hierarchy, whitespace, and clear focal point.
- **Acceptable density:** 60–100 words, but only if hierarchy and spacing are strong.
- **Over-populated slide:** > 100 words. Needs splitting or severe editing.
- **Document-on-a-slide:** > 150 words. This is not a presentation slide — it's a page masquerading as one.

### Element Count Guidelines
- Maximum recommended shapes/objects per slide: **15** (including text boxes, images, shapes, icons).
- If a slide has more than 15 distinct elements, check whether it's doing too many jobs.
- Slides with 20+ elements are almost certainly over-designed or under-edited.

### Density + Hierarchy Interaction
- High density with strong hierarchy can work (data-heavy slides, comparison grids).
- High density with weak hierarchy always fails.
- Low density with no visual content is as much a problem as high density.

## 10. Color Contrast Quick Reference

### Minimum Contrast Ratios (WCAG AA)
- Normal text (< 18pt): **4.5:1**
- Large text (≥ 18pt or ≥ 14pt bold): **3:1**
- Non-text elements (icons, chart elements): **3:1**

### Common Failures to Watch For
- Light gray text (#A0A0A0 or lighter) on white — fails for body text.
- Brand blue text on dark blue backgrounds — may fail AA.
- Yellow or lime text on white backgrounds — always fails.
- Text on photographic backgrounds without overlay.
- Chart data labels on colored chart segments.
- Placeholder/watermark text that users mistake for real content.

### Quick Contrast Check Method
- If you can't comfortably read the text at arm's length, it probably fails.
- If squinting is required, it definitely fails.
- Gray text below `#787878` on white will fail for small body text.

## 11. Cross-Slide Consistency Checklist

Check these properties across ALL slides in the deck:

| Property | Must Be Consistent? | Tolerance |
|---|---|---|
| Title font size | Yes | ±2pt |
| Title position (X, Y) | Yes | ±0.05" |
| Body text font size | Yes | ±1pt |
| Body text color | Yes | Exact match |
| Card background color | Yes | Exact match |
| Card border style | Yes | Same weight, color, radius |
| Gutter width (multi-column) | Yes | ±0.05" |
| Content margin from edges | Yes | ±0.10" |
| Icon style (line/filled/color) | Yes | Same style family |
| Page number position | Yes | ±0.05" |
| Page number font/size/color | Yes | Exact match |
| Accent line style | Yes | Same weight, length, color |

### Consistency Scoring
- 0–2 inconsistencies: Normal (minor cleanup)
- 3–5 inconsistencies: Below standard (revision needed)
- 6+ inconsistencies: Serious quality issue (possible Franken-deck)

## 12. Image Quality Quick Reference

| Check | Pass | Fail |
|---|---|---|
| Resolution at display size | ≥ 150 DPI | < 100 DPI or visibly pixelated |
| Aspect ratio preserved | Width:height matches original | Visibly stretched or squashed |
| Compression artifacts | Not visible at normal viewing | Blocking, banding, or noise visible |
| Watermarks | None present | Any stock watermark visible |
| Style consistency | Same visual style across deck | Mixed photo/illustration/icon styles |
| Relevance | Image supports slide message | Decorative filler with no connection to content |
| Cropping | Shows relevant content | Awkward crop, cut-off faces, missing context |
