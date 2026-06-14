# Alpha 67Q First Controlled Word Family Report

Date: 2026-05-21
Status: Done after Codex review

## Goal

Alpha 67Q should add exactly one controlled new word family after the UI quality work from Alpha 67M-67P.

The important rule was: no broad content expansion. The app should gain one meaningful, gated, didactically plausible word family only if it fits the existing grapheme and syllable progression.

## Decision

Selected family: `Lama`.

Reason:

- concrete and imageable
- short German word
- already represented in the existing task base
- compatible with `l`, `a`, `m`, `la`, `ma`
- close enough to existing Mama/Sofa work to extend without changing the whole system
- can be represented locally without external or protected image assets

## Result

Implemented and reviewed.

The Lama family is now available only behind `l/la` gating. Profiles without the required graphemes and syllables do not see it as a ready mini journey.

Added or updated:

- Lama material family definition
- Lama mini-journey text set
- Lama micro-prep sequence
- generic `getWordFamilyMiniJourney`
- mini-journey availability/readiness support for all defined journey families
- Lama UI wiring in the mini-journey selector
- local CSS/HTML Lama symbol anchor

Important correction during review:

The first Hermes pass briefly risked replacing `Tasse` journey copy with `Lama`. This was caught and corrected. `Mama`, `Sofa`, and `Tasse` remain intact.

## Changed Files

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/lesewerk-content.mjs`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verification

Automated checks:

- `npm test -- --run`: passed, 199/199 tests
- `npm run build`: passed

Codex smoke check:

- Opened app on a local built server.
- Entered teacher area.
- Set `l` and `la` as known units.
- Confirmed `Lama-Mini-Reise starten` appears.
- Confirmed local Lama symbol anchor appears.
- Started Lama mini journey.
- Confirmed first child station shows `Schau das Lama an.`
- Confirmed no horizontal overflow.
- Confirmed no pressure, diagnosis, score, timer, ranking, cloud, upload, export, or storage wording in the checked child scene.

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67q-lama-card.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67q-lama-station1.png`

## Quality Assessment

This is a strong controlled content step. It expands the app beyond Mama/Sofa/Tasse without turning the system into a loose word dump.

The next risk is scale: every new word family should pass the same gate:

- concrete and meaningful
- known graphemes/syllables
- one full mini journey
- one micro-prep sequence
- local-only support
- child-safe wording
- tests and smoke

## Next Sequence

1. Alpha 67R: teacher learning-path editor.
2. Alpha 67S: content scaling rubric for word, syllable, sentence, and story packs.
3. Alpha 67T: first mini-story quality expansion.

