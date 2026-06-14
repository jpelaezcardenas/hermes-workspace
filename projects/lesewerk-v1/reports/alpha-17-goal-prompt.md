# /goal LeseWerk Alpha 17 - Speicherfrei-Hinweis und realer Touch-Pilot-Abgleich

Build Alpha 17 as a very small practice-safety phase for the existing LeseWerk app.

## Mission

Make the Alpha 16 Praxis-Pilotkarte clearer for real classroom use by adding a short no-storage hint, then prepare a concrete real-tablet pilot check. Finally, ask Hermes to recommend the best next phase after Alpha 17 based on the current product state.

Alpha 17 must stay small. Do not create storage, export, PDF, cloud, login, student management, scoring, diagnosis, or new content.

## Starting Point

Read first:

- `reports/alpha-16-watchdog-review.md`
- `reports/alpha-16-ge-touch-practice-review.md`
- `reports/alpha-16-practice-card-implementation-report.md`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Preserve:

- Alpha 15 2-card pilot mode;
- Alpha 16 practice card with exactly three prompts;
- local/anonymized workflow;
- no real names;
- no diagnosis, scoring, ranking, timer, grades, percentage, or shame language;
- no cloud, export, upload, login, database, class list, or student management;
- no protected/external assets;
- no broad redesign.

## Required Outcome

1. Add a short visible hint directly on or below the Praxis-Pilotkarte:
   - `Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.`
2. Add a focused test that protects this no-storage hint.
3. Create a one-page real-tablet pilot checklist report.
4. Run `npm test` and `npm run build`.
5. Run desktop and narrow browser checks.
6. Ask Hermes to decide what should follow after Alpha 17 and produce a short ranked recommendation.
7. Final watchdog must decide accepted/blocked.

## Strict Out of Scope

- No saving the notes.
- No export, download, PDF generation, upload, cloud, login, database, or class list.
- No real student names.
- No diagnostic labels, score, timer, ranking, grade, percentage, or competence scale.
- No new learning content.
- No broad redesign.
- No push/commit/deploy.

## Suggested Slice Chain

### Slice A - No-storage hint implementation

Assignee suggestion: `coder`.

Likely files:

- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-17-no-storage-hint-report.md`

Implement:

- Add the exact hint:
  - `Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.`
- Place it visually close to the Praxis-Pilotkarte.
- Add a test for the exact phrase.
- Confirm no new storage/export/cloud code is added.
- Run `npm test` and `npm run build`.

### Slice B - Real tablet pilot checklist

Assignee suggestion: `schule`.

Create:

- `reports/alpha-17-real-tablet-pilot-checklist.md`

No code changes.

The checklist must be practical for Chris and include:

- device readiness;
- touch target usability;
- readability from child position;
- whether the 2-card pilot start is easy to find;
- whether the child sees only the needed information;
- whether practice notes being unsaved is understandable;
- what to observe during a real 10-15 minute GE pilot;
- stop criteria;
- what not to record.

### Slice C - Hermes next-phase recommendation

Assignee suggestion: `neva`.

Create:

- `reports/alpha-17-hermes-next-phase-recommendation.md`

Ask Hermes to be critical and rank the best next phase options after Alpha 17. It must answer:

- What would Hermes attach next?
- Should the app now move toward real pilot testing, UI polish, content depth, accessibility, or teacher workflow?
- What is the highest-impact next slice with the lowest risk?
- What should explicitly not be done yet?

Required format:

- Top 3 options ranked.
- One recommended option.
- Reasons.
- Risks.
- Suggested Alpha 18 title and scope.

### Slice D - Final watchdog

Assignee suggestion: `neva`.

Create:

- `reports/alpha-17-watchdog-review.md`

Run:

- `npm test`
- `npm run build`
- source-level privacy/content-safety scan
- desktop browser check
- narrow browser check

Decision:

- `Accepted / nicht blockiert`
- or `Blocked` with exact reason.

## Desired End State

Alpha 17 should make the practice card honest and safer in real use: teachers know notes are not stored, the real tablet pilot is ready to run, and Hermes has given a clear next-step recommendation instead of blindly expanding the app.
