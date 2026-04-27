---
title: "Scoring Rubric — PPTX Reviewer"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.659544Z
---

# Scoring Rubric — PPTX Reviewer

This is the **canonical scoring rubric** for PPTX Reviewer.
All reviews should use this rubric.

Score each dimension from **1 to 5**.

General calibration:
- **1** = serious failure
- **2** = below standard
- **3** = acceptable
- **4** = strong
- **5** = excellent

A `3` is fine. A `5` is rare.
When torn between two scores, use the lower one unless the higher score is clearly deserved.

Total possible score: **/50**

Verdict thresholds:
- **40 to 50** → Approve
- **30 to 39** → Revise
- **Below 30** → Rebuild

---

## Score Cap Triggers

These hard rules override subjective judgment. If any trigger fires, cap the affected dimension at the listed maximum — even if the rest of the dimension feels stronger.

### Brand Compliance (Dimension 1)
| Trigger | Cap |
|---|---|
| ≥3 slides use a non-Figtree font | **2** |
| Any slide uses a color not in the SettleMint palette (excluding photos/screenshots) | **3** |
| Logo is stretched, cropped, or recolored | **2** |
| Page numbers missing on >25% of content slides | **3** |

### Text Quality (Dimension 3)
| Trigger | Cap |
|---|---|
| Any slide exceeds 120 words of body text | **3** |
| ≥3 slides exceed 80 words of body text | **3** |
| AI-tell phrases appear ≥3 times ("leverage", "streamline", "empower", "cutting-edge", "seamless") | **3** |
| Any title is a single generic noun/phrase with no verb or claim ("Overview", "Features", "Benefits") | **3** |

### Content Accuracy (Dimension 4)
| Trigger | Cap |
|---|---|
| Any unverifiable DALP capability claim | **2** |
| Any [TODO], [TBD], or placeholder text visible | **2** |
| Use of "fully compliant" or "any chain" without qualification | **2** |
| Mermaid diagram rendered as image without native rebuild | **3** |

### Completeness (Dimension 8)
| Trigger | Cap |
|---|---|
| Missing cover or closing slide | **1** |
| ≥2 unused/empty template slides remain | **2** |
| Any slide with visible placeholder text from the template | **2** |

### Editability (Dimension 9)
| Trigger | Cap |
|---|---|
| ≥2 slides where primary text content is a screenshot or flattened image | **2** |
| Key diagram has no editable text elements | **3** |

### Slide Selection / Layout Fit (Dimension 2)
| Trigger | Cap |
|---|---|
| Fewer than 5 distinct slide layouts used in a deck of 15+ slides | **3** |
| ≥3 consecutive slides use the same layout (excluding divider runs) | **3** |
| Content crammed into a single-column text layout when a comparison, card, or icon layout was clearly better suited | **3** |

### Visual Balance (Dimension 5)
| Trigger | Cap |
|---|---|
| ≥2 slides with element overlap (bounding boxes of text, shapes, or images intersect) | **2** |
| Any content slide uses a dark or branded background that is not a cover, close, or intentional divider | **3** |
| ≥3 slides where content fills less than 30% of the slide area (excessive whitespace / sparse) | **3** |

### Narrative Flow / Narrative Clarity (Dimension 6)
| Trigger | Cap |
|---|---|
| No problem-framing slide appears before the solution slide | **2** |
| Closing slide is a generic "Thank you" with no CTA, next step, or summary | **3** |
| ≥2 slides that repeat the same point without adding new evidence or perspective | **3** |

### Audience Fit (Dimension 7)
| Trigger | Cap |
|---|---|
| Executive-targeted deck contains code snippets, raw API payloads, or CLI output | **2** |
| Technical-audience deck lacks any architecture, integration, or data-flow detail | **3** |
| Any slide implies consulting or custom development services | **2** |

### Message Hierarchy (Dimension 10)
| Trigger | Cap |
|---|---|
| ≥3 slides where the title is a topic label with no claim or takeaway ("Architecture", "Timeline", "Team") | **3** |
| Any slide has ≥3 competing focal points with equal visual weight and no clear reading path | **3** |
| Key proof point or differentiator is buried in sub-bullets rather than surfaced in the headline or primary callout | **3** |

These caps are floors, not ceilings — if additional issues exist in the dimension, score lower than the cap.

---

## Cross-Dimension Correlation Constraints

Certain dimensions are logically linked. When one scores very low, the correlated dimension cannot score very high. These constraints prevent incoherent scorecards (e.g., "perfect audience fit" alongside "no narrative flow").

| If this dimension scores… | Then this dimension is capped at… | Rationale |
|---|---|---|
| Narrative Flow (6) ≤ 2 | Audience Fit (7) ≤ 3 | A deck with broken story structure cannot truly serve its audience, even if individual slides match audience depth. |
| Text Quality (3) ≤ 2 | Message Hierarchy (10) ≤ 3 | Wordy, jargon-heavy, or passive text undermines hierarchy regardless of visual layout. If the words are bad, the message cannot land. |
| Brand Compliance (1) ≤ 2 | Visual Balance (5) ≤ 3 | Off-brand fonts, colors, or broken template elements create visual noise that degrades perceived balance. |
| Content Accuracy (4) ≤ 2 | Audience Fit (7) ≤ 3 | Inaccurate or unverifiable claims make the deck unsafe for any audience. Fit is irrelevant when credibility is compromised. |
| Completeness (8) ≤ 2 | Editability (9) ≤ 3 | An unfinished deck with placeholders and leftover template slides is not meaningfully editable, even if individual elements are native. |
| Slide Selection (2) ≤ 2 | Visual Balance (5) ≤ 3 | Wrong layouts force content into shapes that break spacing and density. Layout misfit is a root cause of visual imbalance. |
| Message Hierarchy (10) ≤ 2 | Narrative Flow (6) ≤ 3 | If individual slides lack clear takeaways, the deck-level story cannot flow, because there is nothing to connect. |

**Application rule:** Check these constraints after initial scoring. If a constraint fires, lower the capped dimension and note the correlation in your slide-level comments. Constraints stack: if multiple constraints cap the same dimension, use the lowest cap.

---

## Verdict Override Rules

These rules override the standard threshold bands (40+ Approve, 30-39 Revise, <30 Rebuild) when specific conditions are met, regardless of total score.

### Hard-Block Overrides (cannot Approve)
| Condition | Forced verdict | Rationale |
|---|---|---|
| Any Hard Failure from AGENTS.md detected (non-Figtree fonts, baked text in images, placeholder text, missing cover/close, etc.) | **Cannot Approve** — Revise minimum | Hard failures represent client-visible defects that cannot ship. |
| Either sub-score below 12/25 | **Cannot Approve** — Revise minimum | A deck that scores well technically but fails on messaging (or vice versa) is not presentation-ready. |
| Content Accuracy (4) scores 1 | **Rebuild** regardless of total | Factually unsafe decks cannot be revised into safety; they need structural rework. |
| ≥3 dimensions score 1 | **Rebuild** regardless of total | Three serious failures indicate systemic problems, not isolated fixes. |

### Upgrade Barriers (cannot score higher than Revise)
| Condition | Maximum verdict | Rationale |
|---|---|---|
| Any dimension scores 1 | **Revise** maximum | A single serious failure means the deck is not ready, even if the total crosses 40. |
| ≥4 dimensions score 2 or below | **Revise** maximum | Widespread below-standard performance indicates the deck needs meaningful work even if no single area is a hard failure. |
| Narrative Flow (6) and Message Hierarchy (10) both score ≤ 2 | **Revise** maximum | A deck that lacks both story and slide-level clarity cannot be approved regardless of production quality. |

**Application rule:** Check all override conditions after computing the total and sub-scores. If any condition fires, adjust the verdict and explain which override triggered in the verdict section of the review.

---

## Sub-Scores: Technical/Visual vs. Content/Messaging

In addition to the total /50 score, every review must report two sub-scores to distinguish production quality from content quality.

### Technical/Visual Sub-Score (/25)
Sum of these 5 dimensions:
1. **Brand Compliance** (dimension 1)
2. **Visual Balance** (dimension 5)
3. **Completeness** (dimension 8)
4. **Editability** (dimension 9)
5. **Slide Selection / Layout Fit** (dimension 2)

This sub-score reflects: font correctness, color compliance, element spacing, text overflow, element overlap, logo integrity, image quality, density, alignment, template discipline, and production readiness.

### Content/Messaging Sub-Score (/25)
Sum of these 5 dimensions:
1. **Text Quality** (dimension 3)
2. **Content Accuracy / Product Accuracy** (dimension 4)
3. **Narrative Flow / Narrative Clarity** (dimension 6)
4. **Audience Fit** (dimension 7)
5. **Message Hierarchy** (dimension 10)

This sub-score reflects: copy quality, claim accuracy, DALP terminology, story structure, audience targeting, tone, and messaging discipline.

### Reporting Format
In the Score Card section of every review, include:
```
**Technical/Visual Sub-Score: [X/25]**
**Content/Messaging Sub-Score: [X/25]**
**Total: [X/50]**
```

### Sub-Score Interpretation
- A deck can be technically polished but messaging-weak (high visual, low content) — this means the production is good but the story needs work.
- A deck can have strong messaging but poor production quality (low visual, high content) — this means the ideas are right but the execution needs cleanup.
- Both sub-scores matter. Neither can compensate for a serious failure in the other.
- If either sub-score is below **12/25**, the deck should not be approved regardless of the other sub-score.

---

## 1. Brand Compliance
Checks font, colors, logo treatment, template integrity, protected branding elements, and page numbering.

### 1 — Serious failure
- Multiple non-Figtree fonts appear across the deck
- Off-brand colors are introduced freely
- Protected brand shapes or logos are modified, deleted, or moved carelessly
- Page numbers are broken or removed where they should exist
- The deck no longer feels like the SettleMint template

### 2 — Below standard
- One or more clear font or color violations appear
- Protected elements are mostly intact but inconsistently handled
- Page numbering or slide-size integrity has issues
- The brand system is visibly weakened even if not fully broken

### 3 — Acceptable
- Mostly compliant with minor issues
- Figtree is used consistently or there is only one small exception
- Colors are mostly within template logic
- Protected slides are respected
- Page numbering is present where expected with minor imperfections

### 4 — Strong
- Fully on-brand with only trivial cleanup needed
- Figtree preserved throughout
- Colors align with template usage
- Protected slides remain intact
- Page numbering and slide dimensions are correct

### 5 — Excellent
- Flawless template discipline
- Brand integrity is preserved end-to-end without drift
- Typography, color, numbering, and protected brand elements are all handled exactly right
- The deck looks like it came straight from a disciplined internal design team

---

## 2. Slide Selection / Layout Fit
Checks whether the chosen layouts fit the content type, use the template intelligently, and create enough variety without chaos.

### 1 — Serious failure
- Layout choices actively fight the content
- Repetitive use of the wrong slide type creates confusion or boredom
- Content is crammed into unsuitable layouts
- Slide-pattern logic appears ignored

### 2 — Below standard
- Several slides use suboptimal layouts
- The deck feels template-driven rather than message-driven
- Layout variety is weak or awkward
- Stronger slide options were clearly available but not used

### 3 — Acceptable
- Most slides use workable layouts
- There is some variety, though not always purposeful
- A few slides would land better in different template patterns
- The deck is functional but not especially well-composed

### 4 — Strong
- Layout choices fit the content well across most of the deck
- Variety supports the narrative instead of distracting from it
- The author clearly understands the slide catalog
- Only minor optimizations remain

### 5 — Excellent
- Slide selection is consistently sharp and intentional
- Each layout feels chosen for the message, not just filled because it was available
- Variety, rhythm, and content fit are all strong
- The deck gets more persuasive because of the layout choices

---

## 3. Text Quality
Checks conciseness, hierarchy, active voice, clarity, and absence of AI-tell words or filler.

### 1 — Serious failure
- Slides are packed with dense text or awkward blocks
- AI-tell words and empty jargon dominate
- Titles are generic and body copy is hard to scan
- Hierarchy is weak or absent

### 2 — Below standard
- Too many slides are wordy or passive
- Several titles do not make a point
- AI-sounding phrasing appears repeatedly
- Copy can be understood, but it does not feel sharp or presentation-ready

### 3 — Acceptable
- Text is mostly clear, though some slides run long
- Titles and body copy generally function
- A few filler phrases or clumsy sections remain
- The deck is readable but not especially crisp

### 4 — Strong
- Concise, active, and easy to scan
- Titles do real framing work
- Hierarchy is clear and consistent
- Very little filler remains

### 5 — Excellent
- Text is disciplined, punchy, and presentation-native
- Titles are benefit-led and memorable
- Body copy is sparse but informative
- Every text block earns its space

---

## 4. Content Accuracy / Product Accuracy
Checks factual correctness, DALP terminology, claim discipline, and absence of speculation or placeholders.

### 1 — Serious failure
- The deck contains wrong or misleading DALP claims
- Speculation is presented as fact
- Terminology is wrong in ways that damage credibility
- Placeholder or unverified content remains visible

### 2 — Below standard
- One or more claims look unsupported or loosely phrased
- DALP terminology is inconsistent
- Confidence outruns evidence in several places
- The deck needs fact-checking before it is safe to present

### 3 — Acceptable
- Core content appears broadly correct
- Minor terminology or precision issues remain
- A few claims need tightening or verification
- No major inaccuracies are evident, but confidence could improve

### 4 — Strong
- Claims are careful, credible, and appropriately framed
- DALP terminology is handled well
- No obvious speculation or placeholder text remains
- The deck feels safe to present from a factual standpoint

### 5 — Excellent
- Content is precise, disciplined, and clearly grounded in real capability
- Terminology is consistently institutional and correct
- Claims are persuasive without overshooting reality
- Accuracy strengthens trust throughout the deck

---

## 5. Visual Balance
Checks whitespace, density, alignment, composition, and whether slides feel cluttered or empty.

### 1 — Serious failure
- Multiple slides are visibly overcrowded or visually broken
- Whitespace is ignored
- Alignment and spacing are inconsistent
- The deck feels stressful to look at

### 2 — Below standard
- Several slides are too dense, too sparse, or poorly balanced
- Visual weight is uneven
- Spacing issues distract from the message
- Cleanup is clearly needed before presentation

### 3 — Acceptable
- Most slides are visually workable
- Some density or spacing issues remain
- Visual balance is not polished, but it does not seriously block understanding

### 4 — Strong
- Slides feel composed and readable
- Whitespace is used well
- Density is controlled on most slides
- Visual weight generally supports the message

### 5 — Excellent
- The deck has strong rhythm, restraint, and spatial discipline
- Slides breathe without feeling empty
- Focal points are obvious
- Visual composition consistently sharpens comprehension

---

## 6. Narrative Flow / Narrative Clarity
Checks slide order, story logic, transitions, and whether the deck builds a coherent argument.

### 1 — Serious failure
- The deck lacks a clear story
- Slides feel random, repetitive, or disconnected
- The audience would struggle to understand why the deck is ordered this way

### 2 — Below standard
- There is a rough structure, but transitions are weak
- Some sections feel out of order or redundant
- The deck does not build momentum well

### 3 — Acceptable
- The overall structure is understandable
- The story mostly holds together
- Some transitions or section choices feel clunky or generic

### 4 — Strong
- The deck moves logically from opening to close
- Sections connect well
- The pacing is controlled and intentional
- The story supports the audience's decision-making process

### 5 — Excellent
- The narrative is tight, persuasive, and easy to follow
- Every slide advances the argument
- The structure creates momentum and clarity
- The close feels earned, not tacked on

---

## 7. Audience Fit
Checks whether the depth, framing, terminology, and level of detail match the intended audience.

### 1 — Serious failure
- The deck is pitched at the wrong level entirely
- Executives get technical clutter or specialists get empty slogans
- The deck would confuse or alienate its audience

### 2 — Below standard
- Audience fit is inconsistent
- Some slides are too shallow, others too detailed
- The presenter would need heavy verbal correction to make it land

### 3 — Acceptable
- The intended audience is mostly served
- A few slides are mismatched in depth or framing
- The deck is usable, but not sharply tailored

### 4 — Strong
- Depth and framing fit the target audience well
- Technical detail is present where useful and absent where distracting
- The deck shows clear audience awareness

### 5 — Excellent
- The deck is unmistakably designed for its audience
- It gives exactly the right depth, language, and emphasis
- Executive, technical, or mixed audiences would each feel properly respected

---

## 8. Completeness
Checks whether the deck is finished, populated, structurally complete, and free of leftovers.

### 1 — Serious failure
- Opening or closing is missing
- Multiple placeholders or empty fields remain
- Unused template slides are still present
- The deck is visibly unfinished

### 2 — Below standard
- Most of the deck is populated, but clear remnants remain
- A few placeholders, unfinished slides, or incomplete fields are visible
- The deck would not survive close inspection

### 3 — Acceptable
- The deck is mostly complete
- Minor cleanup remains
- A few fields, transitions, or template remnants still need attention

### 4 — Strong
- The deck is complete and presentation-ready with only trivial cleanup needed
- Start and end slides are present
- Unused slides are removed
- No obvious leftovers remain

### 5 — Excellent
- The deck is fully complete, polished, and clean
- Every slide is intentional and populated appropriately
- No placeholders, leftovers, or structural gaps remain
- It feels delivery-ready, not draft-ready

---

## 9. Editability
Checks whether the file is built for real PowerPoint use with native text, shapes, charts, and manageable structure rather than flattened or fragile slide content.

### 1 — Serious failure
- Important content is flattened into screenshots or full-slide images
- Text cannot be edited without rebuilding slides from scratch
- Groups, masks, or pasted graphics make routine changes impractical
- The deck is effectively design output, not a usable PPTX working file

### 2 — Below standard
- Several slides contain editable-looking elements that are actually hard to modify
- Key labels, tables, or diagrams are embedded in images or broken into awkward fragments
- Making normal client edits would be slow and error-prone
- The file is technically editable, but not operationally usable

### 3 — Acceptable
- Most slide content is natively editable
- Some elements are still awkwardly grouped, over-layered, or harder than they should be to update
- Routine copy and layout changes are possible with moderate cleanup
- The file is usable, though not especially clean for handoff

### 4 — Strong
- Text, shapes, and core visuals are built natively in PowerPoint
- Grouping and structure are sensible
- Normal edits can be made quickly without breaking the slide
- Only minor cleanup would improve handoff quality

### 5 — Excellent
- The deck is built like a professional working PPTX, not a static artifact
- Text, charts, diagrams, and callouts are all natively editable where they should be
- Structure is clean, predictable, and easy for another operator to modify confidently
- The file is handoff-ready for real team reuse and iteration

---

## 10. Message Hierarchy
Checks whether each slide has a clear takeaway, strong headline logic, and supporting content arranged in the right order of emphasis.

### 1 — Serious failure
- Slides do not make a clear point
- Headlines are vague, generic, or missing
- Supporting content competes for attention without a dominant message
- The audience would struggle to know what matters first on each slide

### 2 — Below standard
- Some slides have a point, but it is weakly framed
- Headlines label topics rather than making meaning
- Important supporting details are buried or visually equal to minor ones
- The reader has to work too hard to find the intended takeaway

### 3 — Acceptable
- Most slides have an identifiable main message
- Headline and body structure usually align, though some slides feel flat or overly list-like
- Priority is generally understandable, but not especially sharp
- The deck communicates, even if some slides lack strong emphasis

### 4 — Strong
- Each slide has a clear takeaway and a logical reading path
- Headlines frame the meaning, not just the subject
- Supporting points reinforce the main message in sensible order
- Visual and verbal emphasis usually match what matters most

### 5 — Excellent
- Every slide lands one clear idea with precision
- Headlines are decisive, informative, and strategically framed
- Supporting content is sequenced so the audience absorbs the right message almost instantly
- Hierarchy makes the deck easier to present, easier to scan, and more persuasive overall
