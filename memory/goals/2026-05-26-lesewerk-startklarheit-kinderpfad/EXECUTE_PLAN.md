# Execute Plan - LeseWerk Startklarheit Kinderpfad

> CEO-Plan: klein, pruefbar, kein neuer Inhalt. Ziel ist ein ruhigerer erster Kinderblick, nicht mehr Feature-Menge.

## File Map

Moeglich zu aendern:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- fokussierte Tests unter `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/`

Neu zu schreiben:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-startklarheit-kinderpfad-2026-05-26.md`
- Screenshots in `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/`

Nicht aendern:

- keine neuen Dependencies;
- kein `package.json`, ausser ein zwingender Testscript-Fix waere noetig;
- keine Inhalte/Wortfamilien ausbauen;
- keine Hermes-Cronjobs.

## Task 1: Baseline verstehen

- [ ] Read:
  - `reports/lesewerk-quality-2026-05-26.md`
  - `reports/lesewerk-mobile-smoke-2026-05-26.md`
  - `src/App.tsx`
  - `src/styles.css`
- [ ] Identify the current child path order:
  - Profilwahl
  - Tagespfad
  - Leseleiter
  - Schrittkarte
  - Fokusspiel/Wortpost
- [ ] Record what currently appears above the first actionable focus game at 390px.

## Task 2: Small UI decision

- [ ] Choose the smallest change that improves start clarity.
- [ ] Preferred direction:
  - make current focus action more prominent earlier;
  - compress or visually quiet secondary orientation;
  - keep teacher controls out of the child first view;
  - avoid removing useful learning structure.
- [ ] Do not invent a new mode.

## Task 3: Implement one slice

- [ ] Update only the necessary UI/CSS.
- [ ] Keep child controls large and stable.
- [ ] Preserve current tests and behaviour.
- [ ] Add or update focused tests only if the change alters expected copy/structure.

## Task 4: Verify

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run a 390px browser smoke:
  - no horizontal overflow;
  - child path visible;
  - first main action clear;
  - `Wortpost starten` path still works;
  - complete `Mama` Wortpost round;
  - `Nochmal`, `Weiter`, `Zur Lehrkraft` visible after completion.
- [ ] Safety scan visible child path:
  - no points;
  - no timer;
  - no ranking;
  - no `falsch` as dominant feedback;
  - no grades/diagnosis.

## Task 5: Report

- [ ] Write:
  - what changed;
  - files changed;
  - tests/build result;
  - mobile-smoke result;
  - screenshots;
  - residual risks;
  - next smallest action.

## Acceptance Gate

The slice is successful only if it improves first-view clarity without breaking the already-proven Wortpost 390px round.
