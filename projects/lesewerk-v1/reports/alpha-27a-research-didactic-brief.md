# Alpha 27A - Research Brief: German Didactic Model for GE

Date: 2026-05-18
Status: Research Completed

## Executive Summary
Alpha 27A defines a deeper didactic framework for LeseWerk, moving from a shallow linear scale to a multidimensional developmental model. It integrates präliteral, logographic, and alphabetic stages with a split phonological awareness model (wide vs. narrow) and reinforces the synergy between reading and writing.

## 1. Limitations of the current `readingStage` model
The current 1–10 model suggests a linear progression that rarely matches the heterogeneous learning paths in "Förderschwerpunkt GE". It lacks:
- Distinction between visual recognition (logographic) and decoding (alphabetic).
- Awareness of pre-literate symbolic reading.
- Integration of writing/motor activities as a support for reading.

## 2. Local Developmental Dimensions for GE

### 2.1 The Literacy Path
Instead of tracking clinical "levels", LeseWerk maps content to these dimensions:
- **Präliteral-Symbolic:** Recognition of situational symbols, icons, and gestures. (Active in Alpha 3/5).
- **Logographic:** Recognition of "Whole Words" as pictures (e.g., names, signal words).
- **Alphabetic:** Grapheme-phoneme mapping and blending (Synthetisierendes Lesen).
- **Orthographic:** Recognizing recurring patterns (Syllables, -en, -er) and complex units (sch, ch).
- **Integrative:** Understanding meaning in sentence contexts and short stories (Active in Alpha 26).

### 2.2 Phonological Awareness (PA)
PA must be split into two distinct tiers for classroom planning:
- **Wide Awareness (Global):** Syllable klatschen, rhyming, prosody. (Current focus).
- **Narrow Awareness (Analytic):** Identifying beginning sounds (Anlaut), phoneme synthesis, and segmentation. (Target for Alpha 27B).

## 3. Synthesis of Reading and Writing
Writing supports reading by slowing down the process and forcing attention to detail. Alpha 27B should introduce:
- **Tracing (Nachspuren):** Visual-motor anchoring of letter shapes.
- **Letter Selection (Buchstabenauswahl):** Building words from a limited set of tokens.
- **Syllable Building (Silbenbau):** Combining 2-3 syllables to match a target word.
- **Sentence Frames:** Completing "X ist da" with a selected word card.

## 4. Metadata Proposal for Implementation
The `taskRequirementProfiles` should be enriched with:
- `didacticDimension`: `symbolic` | `logographic` | `alphabetic` | `orthographic` | `integrative`
- `paLevel`: `wide` | `narrow` | `none`
- `interactionType`: `choose` | `build` | `trace`
- `sentenceFrame`: string (optional)

## 5. Teacher-Facing vs. Learner-Facing
- **Teacher-only:** Didactic dimensions, PA levels, review markers, and "Next Step" reasoning.
- **Learner-facing:** The content itself (images, syllables), supportive feedback, and the "Today's Path" icons.

## 6. Guards & Non-Goals
- **No deficit language:** Replace "Wrong" with "Try again with help".
- **No diagnostics:** The app provides task-fit, not a psychological profile.
- **No scores:** KMK 2022 emphasizes activity over testing.

## Next Implementation Steps (Alpha 27B)
1. **Metadata Alpha-Update:** Tag existing 28 tasks with `didacticDimension`.
2. **New Task Types:** Introduce "Anlaut-Hören" (Narrow PA) for A, M, S.
3. **Word Builder Prototype:** A simple UI where 2 syllables must be put in the correct order.
4. **Sentence Support:** Enhance story questions with a "Sentence Frame" response (e.g., clicking "Ball" completes "Dort ist der Ball.").

---
*Anchors: LehrplanPLUS GE (Bayern), KMK Primarbereich 2022, Phonological Awareness Research (Hacker/Hasselhorn).*
