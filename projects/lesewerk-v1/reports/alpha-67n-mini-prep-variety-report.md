# Alpha 67N Mini-Prep Variety Report

Date: 2026-05-21
Status: Done after Codex review

## Goal

Alpha 67N should make the existing preparation flow less repetitive without expanding the app too broadly.

The slice was intentionally narrow:

- do not force a new word anchor
- keep Sofa and Tasse as the safe current anchors
- add two tiny child-facing variation patterns
- keep the scene local, pressure-free, short, and suitable for GE learners
- preserve manual teacher control

## Result

Implemented.

No new word anchor was forced. This is the right decision for this slice because the current app is still more in need of stable, high-quality interaction patterns than broad vocabulary expansion.

Two variation patterns were added to the micro-prep steps:

- `listen-point`: examples such as `Hör: s. Zeig auf s.`
- `eye-trace`: examples such as `Fahr mit den Augen um o.`

This makes the preparation feel more like a tiny guided activity instead of a static list. The child still sees only one current action at a time.

## Changed Files

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/lesewerk-content.mjs`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verification

Automated checks:

- `npm test -- --run`: passed, 195/195 tests
- `npm run build`: passed

Codex smoke checks:

- Desktop Sofa preparation: `Nochmal` stays on current step; `Weiter` advances from `Hör: s. Zeig auf s.` to `Fahr mit den Augen um o.`
- Desktop Tasse preparation: advances from `Hör: tas. Zeig auf tas.` to `Fahr mit den Augen: se.`
- Mobile Sofa preparation: same checks passed
- Mobile Tasse preparation: same checks passed
- No horizontal overflow detected
- No pressure, scoring, timer, ranking, diagnosis, cloud, upload, or export wording in the checked child scene

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67n-desktop-sofa-step2-eye-trace.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67n-desktop-tasse-step2-eye-trace.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67n-mobile-sofa-step2-eye-trace.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67n-mobile-tasse-step2-eye-trace.png`

## Quality Assessment

This is a good micro-improvement. It does not transform the app alone, but it improves a crucial pattern: every future word can now use richer preparation actions without adding assessment pressure.

The app still needs broader content, more attractive play surfaces, and a clearer long-term learning arc. But Alpha 67N strengthens the foundation in a way that is reusable and safe.

## Recommended Next Slice

Alpha 67O should not add a huge word pack yet. The better next move is:

- turn the two variation patterns into visibly distinct child micro-moments
- add one gentle visual cue for each variation
- keep all symbols local CSS/HTML
- verify one complete Sofa and one complete Tasse preparation on mobile

