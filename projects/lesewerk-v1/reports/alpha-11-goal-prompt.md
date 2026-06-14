# /goal LeseWerk Alpha 11 – Small Adaptive Teacher Suggestions

Build Alpha 11 for LeseWerk as a small, high-quality continuation of the accepted Alpha 10 product state.

## Mission

Make the existing anonymous observation signals more useful for the teacher by showing a small, cautious adaptive suggestion block in the teacher area.

Alpha 11 must not become automatic diagnosis, scoring, tracking, analytics, class management, export, cloud sync, or a broad content expansion. The suggestion must be manual, local, explainable, and easy to ignore.

## Starting Point

Read first:

- `reports/product-spec.md`
- `reports/alpha-10-watchdog-review.md`
- `reports/alpha-10-ge-usability-review.md`
- `reports/alpha-10-curation-implementation-report.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Alpha 10 is accepted. Preserve:

- local teacher curation of up to four daily cards;
- fallback to the safe Alpha-9 default path;
- `Heute lesen` as the calm child-facing start;
- local, anonymous, privacy-safe teacher area;
- no real names, no cloud, no login, no export, no backend;
- no scores, timers, rankings, diagnoses, or pressure language.

## Product Goal

The teacher should see a compact suggestion block such as:

- `Vorschlag für den nächsten Tagesweg`
- `Warum dieser Vorschlag?`
- `Alternative`
- `In Tagesweg übernehmen`
- `Ignorieren`

The suggestion should use only existing local signals:

- current anonymous profile;
- selected supports;
- existing observation data;
- existing adaptive placement summary;
- existing tasks and stories.

The teacher remains in control. Nothing is automatically applied.

## Required Behavior

1. Header updates to `LeseWerk Alpha 11 · lokale Demo`.
2. Teacher area includes one compact suggestion block.
3. Suggestion is based on existing local/anonymized observation signals.
4. Suggestion contains a short reason in teacher-friendly language.
5. Suggestion contains a small alternative.
6. Teacher can manually apply the suggested path to the local daily path selection.
7. Teacher can ignore the suggestion without changing the child path.
8. Child path only changes after manual apply.
9. Selection still respects max four cards.
10. Reset clears the applied suggestion and restores the safe fallback.
11. No new content expansion.
12. No persistent sensitive data.
13. No diagnosis, scoring, ranking, timer, speed pressure, export, login, cloud, backend, upload, auth, or automatic decision.

## Design Constraints

- Keep it small and calm.
- Prefer a single suggestion card, not a dashboard.
- The suggestion must be explainable in one or two sentences.
- Use existing tasks/stories only.
- If there is not enough observation data, show a safe starter suggestion.
- Never present the suggestion as a truth, diagnosis, ability label, or performance rating.
- The teacher can accept or ignore. The child does not see the suggestion logic.

## Suggested Slice Chain

### Slice A – Blueprint

Create `reports/alpha-11-adaptive-suggestion-blueprint.md`.

Clarify:

- exact suggestion logic;
- safe fallback when observation data is thin;
- teacher wording;
- apply/ignore behavior;
- privacy boundary;
- acceptance criteria.

No code changes in Slice A.

### Slice B – Suggestion Data Helpers

Implement only the testable data/helper layer.

Likely files:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-11-suggestion-helper-report.md`

Expected helper shape:

- getTeacherDailyPathSuggestion(...)
- suggestion path ids or card ids;
- reason text;
- alternative text;
- safety/privacy wording.

No UI changes in Slice B.

### Slice C – Teacher UI And Manual Apply

Implement the UI block and manual apply/ignore flow.

Likely files:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-11-suggestion-ui-report.md`

Expected behavior:

- teacher sees suggestion block;
- apply sets the local daily path selection;
- ignore does not change the child path;
- max-four rule is preserved;
- reset clears applied suggestion.

### Slice D – GE Usability Review

Create `reports/alpha-11-ge-usability-review.md`.

Review:

- Does the suggestion help without becoming diagnostic?
- Is manual control obvious?
- Does teacher area remain calm enough?
- Is privacy preserved?
- Is wording respectful and non-evaluative?

Decision: `Accept`, `Accept with minor notes`, or `Block`.

### Slice E – Final Watchdog

Create `reports/alpha-11-watchdog-review.md`.

Run:

- `npm test`
- `npm run build`
- fresh local browser check
- forbidden-pattern scan in active product files

Accept only if all checks pass.

## Desired End State

Alpha 11 should make the teacher area feel smarter without making the app more invasive.

The app should say, in effect:

> Based on what is visible in this local demo, this small next path may fit. You can use it or ignore it.

The teacher stays in charge. The child still sees only a calm daily reading path.
