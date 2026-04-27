---
title: "Quality Bar"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.918695Z
---

# Quality Bar

## Quality score
Use this as an internal bar before delivery. Each level includes specific indicators to check against.

### 5 - Ship confidently
- **Opening:** First paragraph answers "what is this and why should I care" within 2–3 sentences
- **Structure:** Section order matches reader priority (most important first, supporting detail after)
- **Sentence quality:** No sentence exceeds 30 words without good reason; no passive constructions where active is clearer
- **Tables and figures:** Every table has a purpose the surrounding prose cannot serve better; every figure has a caption that states the takeaway, not just the label
- **Formatting in Word:** Heading hierarchy is consistent (no skipped levels), page breaks fall at logical boundaries, no orphaned headings at page bottom
- **Self-containment:** A reader unfamiliar with the request context can follow the document without supplementary explanation
- **No defect patterns:** Zero matches against common-defect-patterns.md

### 4 - Good, minor polish possible
- Meets all criteria for 5, except one or two of these minor issues remain:
  - A single section runs slightly long without adding proportional value
  - One table could be tighter (e.g., a column that repeats identical values)
  - A transition between sections is abrupt but not confusing
  - A caption or heading could be more specific but is not misleading
- Nothing in the document would make the reader question the author's competence

### 3 - Usable but not proud of it
- The document answers the request but at least one of these is true:
  - Opening buries the point below context or methodology
  - One section is noticeably heavier than the value it delivers (padding detected)
  - A table exists that would be clearer as two sentences of prose, or vice versa
  - Hedging language appears more than twice without adding genuine nuance
  - The document would benefit from a structural reorder that was not done

### 2 - Needs another pass
- Avoid delivery. At least one of these is true:
  - The reader must re-read the opening to understand the document's purpose
  - Two or more sections duplicate content or contradict each other
  - Formatting issues are visible without close reading (broken heading levels, missing table borders, orphaned content)
  - The document uses filler phrases that add no information ("it is important to note," "as previously mentioned")
  - Key claims lack evidence, sourcing, or qualification

### 1 - Not ready
- Wrong document type for the request
- Logical flow is incoherent (sections do not build on each other)
- Visible conversion defects (raw markdown syntax, broken tables, missing images)
- Document contradicts known facts or includes unverified DALP claims

## Minimum bar
External-facing documents should clear **4/5**.
Internal working notes can clear **3/5** if explicitly time-boxed or draft-status.

## Hard fail conditions
Do not deliver if any of these are true:
- the wrong document type was chosen
- the DOCX was not reviewed in Word after conversion
- the document contains unsupported claims or unapproved sensitive detail
- the TOC behavior is wrong for the selected mode
- first-page orientation is weak enough that the reader will not know what they are looking at
