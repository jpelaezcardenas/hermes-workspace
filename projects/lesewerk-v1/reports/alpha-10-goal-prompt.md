# /goal LeseWerk Alpha 10 – Local Teacher Curation Of The Daily Reading Path

Build Alpha 10 for LeseWerk as a small, high-quality continuation of the accepted Alpha 9 product state.

## Mission

Make the Alpha 9 daily reading path locally teacher-curatable while preserving the calm GE classroom experience, privacy boundaries, and child-facing simplicity.

Alpha 10 must not become a dashboard, class management system, content expansion, account system, or documentation platform. It should solve one precise product problem: the teacher can choose up to four cards for today's child-facing reading path, and the child still only sees a small calm `Heute lesen` path.

## Starting Point

Read first:

- `reports/product-spec.md`
- `reports/alpha-9-watchdog-review.md`
- `reports/alpha-9-ge-usability-review.md`
- `reports/alpha-9-daily-path-implementation-report.md`
- `reports/alpha-9-teacher-pilot-implementation-report.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Alpha 9 is accepted. Do not undo its structure. Preserve:

- `LeseWerk Alpha 9` calm daily path idea, updated to Alpha 10 once implemented.
- `Heute lesen` as the child-facing starting area.
- Four visible cards by default.
- Full library hidden behind a secondary disclosure.
- Local-only, anonymous, privacy-safe teacher area.
- 10-15 minute pilot protocol.
- Anonymous observation card.
- Reset and local print preview.

## Product Goal

The teacher area should gain a compact local section for choosing today's path. The teacher can select a maximum of four cards from existing tasks/stories. The child area then shows only those selected cards in `Heute lesen`.

If the teacher selects nothing, the app must keep the safe Alpha 9 default daily path.

If the teacher selects fewer than four cards, the child path may show only those selected cards or may fill with safe defaults, but the behavior must be explicit, tested, and calm.

## Required Behavior

1. Header updates to `LeseWerk Alpha 10 · lokale Demo`.
2. Teacher area includes a compact section named close to `Tagesweg wählen` or `Heute vorbereiten`.
3. Teacher can select no more than four daily cards.
4. Available selectable items use existing content only:
   - word/syllable tasks from `getLearningTasks()`;
   - stories from `getStoryPaths()`;
   - optional repeat card if it is represented safely.
5. Child `Heute lesen` shows the curated cards when at least one card is selected.
6. Child `Heute lesen` falls back to Alpha 9 default path when no cards are selected.
7. Full library remains secondary, not visible by default.
8. Selection is local and anonymous. No real names, no class lists, no login, no cloud, no export, no backend, no upload.
9. Do not add scores, grades, ranking, timers, speed pressure, shame wording, or diagnostic labels.
10. Reset must clear the local curation and restore the safe default path.
11. Teacher print preview and observation card must remain privacy-safe.

## Design Constraints

- Keep the UI calm and compact.
- Do not make a large dashboard.
- Do not add drag-and-drop.
- Do not add accounts or persistent student profiles.
- Do not broaden content volume in Alpha 10.
- Prefer small helpers in `src/lesewerk-content.mjs` over ad hoc UI logic when useful.
- Add tests before or alongside implementation.
- Keep the existing Alpha 9 behavior as fallback.

## Suggested Slice Chain

### Slice A – Blueprint

Create `reports/alpha-10-curation-blueprint.md`.

Clarify:

- exact curation behavior;
- max-four rule;
- fallback rule;
- privacy rule;
- teacher UI shape;
- child UI result;
- acceptance criteria.

No code changes in Slice A.

### Slice B – Implement Local Curation

Implement the smallest working version.

Likely files:

- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-10-curation-implementation-report.md`

Must verify:

- `npm test`
- `npm run build`
- browser spot-check if possible

### Slice C – GE Usability Review

Create `reports/alpha-10-ge-usability-review.md`.

Review:

- Does curation help without overwhelming the teacher?
- Does child path still feel calm?
- Is max-four rule clear?
- Is privacy preserved?
- Does the app avoid dashboard feeling?

Decision must be `Accept`, `Accept with minor notes`, or `Block`.

### Slice D – Final Watchdog

Create `reports/alpha-10-watchdog-review.md`.

Run:

- `npm test`
- `npm run build`
- fresh browser check on a new local port
- forbidden-pattern scan in active product files

Accept only if all checks pass.

## Desired End State

Alpha 10 should feel like the first truly classroom-controllable version of the reading app:

- child sees a tiny, calm, prepared reading path;
- teacher can prepare today's path in under one minute;
- no data risk is introduced;
- no dashboard complexity is introduced;
- GE classroom usability improves directly;
- Alpha 11 can later focus on adaptive suggestions, not basic path control.
