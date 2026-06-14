# /goal LeseWerk Alpha 16 - Touch-/Praxis-Pilotkarte für Lehrkräfte

Build Alpha 16 as a focused classroom-practice phase for the existing LeseWerk app.

## Mission

Create a compact teacher-facing practice card for the real 10-15 minute first-use pilot on tablet/iPad or desktop.

Alpha 16 must support the teacher after the 2-card pilot without creating a diagnostic system, data storage, export workflow, cloud feature, login, student management, score, grade, or protected asset dependency.

## Starting Point

Read first:

- `reports/alpha-15-watchdog-review.md`
- `reports/alpha-15-two-card-pilot-implementation-report.md`
- `reports/alpha-15-ge-first-use-review.md`
- `reports/alpha-16-goal-prompt.md`
- `reports/product-spec.md`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Preserve:

- Alpha 15 2-card pilot mode;
- anonymous profiles only;
- local-only state;
- no real names;
- no diagnosis, scoring, ranking, timer, grades, percentage, or shame language;
- no cloud, export, upload, login, database, class list, or student management;
- no protected symbols or external images;
- no broad redesign.

## Product Goal

The app should help a teacher run the first pilot more safely in real GE practice:

- before the pilot: know the 3 things to observe;
- during the pilot: keep attention on the child and the two-card flow;
- after the pilot: use a short, non-diagnostic practice card to decide the next smallest step;
- on tablet/narrow screens: the practice card should remain readable and touch-friendly.

## Required Outcome

1. Create a short Alpha 16 blueprint before coding.
2. Add or refine a compact practice card in the teacher area.
3. The practice card must contain exactly three observation prompts:
   - `Start gelungen?`
   - `Welche Hilfe wurde genutzt?`
   - `Nächster kleinster Schritt?`
4. The practice card must be non-diagnostic and local/anonymized.
5. It may be app-internal and browser-print-friendly, but must not create export, file, upload, cloud, database, or saved observation records.
6. It should connect naturally to the Alpha 15 2-card pilot.
7. Add focused tests.
8. Run `npm test` and `npm run build`.
9. Run browser checks for desktop and narrow width.
10. Final watchdog must decide accepted/blocked and recommend Alpha 17.

## Strict Out of Scope

- No new content library.
- No new diagnostics system.
- No scoring, rubric, scale, timer, or percentage.
- No saved observation database.
- No export/download/PDF generation.
- No login, cloud, upload, sync, class list, or student profile system.
- No real names.
- No protected/external assets.
- No broad redesign.
- No commit/push/deploy.

## Suggested Slice Chain

### Slice A - Practice card blueprint

Assignee suggestion: `schule` or `neva`.

Create:

- `reports/alpha-16-practice-card-blueprint.md`

No code changes.

The blueprint must decide:

- where the practice card belongs in the teacher area;
- how it connects to the 2-card pilot;
- exact wording for the three prompts;
- how to make the card print-friendly without export/file logic;
- what tests protect privacy, simplicity, and GE suitability.

### Slice B - Implement practice card

Assignee suggestion: `coder`.

Likely files:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-16-practice-card-implementation-report.md`

Expected implementation:

- Add a compact teacher practice card near the 2-card pilot start or observation area.
- Include exactly these three prompts:
  - `Start gelungen?`
  - `Welche Hilfe wurde genutzt?`
  - `Nächster kleinster Schritt?`
- Use simple, respectful, non-diagnostic wording.
- Keep it app-internal and optionally print-friendly through existing browser print behavior.
- Do not add data storage or export logic.
- Add focused tests.
- Run tests and build.

### Slice C - GE/touch practice review

Assignee suggestion: `schule`.

Create:

- `reports/alpha-16-ge-touch-practice-review.md`

Review:

- Does the card support real classroom use?
- Is it usable after the two-card pilot?
- Does it remain simple enough for GE practice?
- Is the wording non-diagnostic?
- Is it tablet/narrow-screen plausible?
- Does it avoid saving/exporting personal data?

Decision: `Accept`, `Accept with minor notes`, or `Block`.

### Slice D - Final watchdog and Alpha 17 recommendation

Assignee suggestion: `neva`.

Create:

- `reports/alpha-16-watchdog-review.md`

Run:

- `npm test`
- `npm run build`
- source-level privacy/content-safety scan
- browser check after build
- desktop and narrow-width check

The report must include:

- exact checks;
- pass/fail;
- changed files;
- remaining risks;
- accepted/blocked decision;
- one precise Alpha 17 recommendation.

## Desired End State

Alpha 16 should make LeseWerk more usable in a real first GE classroom pilot without making the app bigger or more data-heavy.

The ideal result is a teacher-facing practice card that says: we observed only what happened, we did not diagnose, we did not save personal data, and we know the next smallest reading support step.
