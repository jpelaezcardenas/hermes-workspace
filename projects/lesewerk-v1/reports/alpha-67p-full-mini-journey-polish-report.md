# Alpha 67P Full Mini-Journey Premium Spielraum Polish

Date: 2026-05-21
Status: Done after Codex review

## Goal

Alpha 67P should make the full mini-journey child focus scene clearer and more game-like before adding new word families.

The slice focused on orientation, not content expansion:

- current word is visible
- current station is visible
- next action is visible
- progress through the mini journey is visible
- surrounding steps are quieter than the current step
- no score, timer, diagnosis, ranking, cloud, storage, upload, export, external assets, or protected images

## Result

Implemented.

The full mini-journey now includes a child-facing orientation card and a calm local path motif.

The child sees:

- `Aktuelles Wort`
- `Jetzt: ...`
- station progress such as `1 von 5`
- `Dein nächster Schritt: Drück Weiter/Fertig, wenn du bereit bist.`

The journey also has a `mini-journey-spielraum-path` with small local path stones. The current station remains visually dominant; the other stations are quieter.

## Changed Files

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verification

Automated checks:

- `npm test -- --run`: passed, 197/197 tests
- `npm run build`: passed

Codex smoke checks:

- Desktop viewport `1440x950`: passed
- Mobile viewport `390x844`: passed
- Flow checked:
  - Lehrkraft
  - `Mama-Mini-Reise starten`
  - `Mini-Reise starten`
  - station 1 visible with orientation card, path motif, current station focus, quiet context stations
  - `Weiter`
  - station 2 visible
- No horizontal overflow in checked desktop/mobile viewports
- No pressure, diagnosis, score, timer, ranking, cloud, upload, export, or storage wording in the checked child scene

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67p-desktop-station1.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67p-desktop-station2.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67p-mobile-station1.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67p-mobile-station2.png`

## Quality Assessment

This is a meaningful product-quality step. The mini journey now feels less like a sequence of cards and more like a small guided reading space.

It is still intentionally calm and restrained. That is appropriate for the GE target group, but the next larger quality jump should add controlled content depth and more variation in tasks, not more UI decoration.

## Next Sequence

1. Alpha 67Q: first controlled new word family.
2. Alpha 67R: teacher learning-path editor.
3. Alpha 67S: content scaling rubric for word, syllable, sentence, and story packs.

