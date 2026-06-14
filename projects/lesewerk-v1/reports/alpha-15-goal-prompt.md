# /goal LeseWerk Alpha 15 - Zwei-Karten-Pilotmodus für GE-Erstnutzung

Build Alpha 15 as a focused first-use reduction phase for the existing LeseWerk app.

## Mission

Create a primary `2-Karten-Pilotmodus` that lets a teacher start a very small, calm, local reading trial for one student in the GE context.

Alpha 15 must reduce first-use complexity. It must not add a broad diagnostic system, a new content pack, cloud features, student management, login, export, or protected assets.

## Starting Point

Read first:

- `reports/alpha-14-watchdog-review.md`
- `reports/alpha-14-gap-audit-and-pilot-blueprint.md`
- `reports/alpha-14-pilot-readiness-report.md`
- `reports/alpha-14-ge-pilot-readiness-review.md`
- `reports/product-spec.md`
- `src/App.tsx`
- `src/styles.css`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

Preserve:

- anonymous demo profiles only;
- local-only state;
- no real student names;
- no diagnosis, scoring, ranking, timers, speed pressure, grades, or shame language;
- no protected assets and no external images;
- existing full library as secondary/optional;
- existing teacher curation and adaptive suggestions unless a tiny adjustment is required;
- all Alpha 14 pilot-readiness language and privacy boundaries.

## Product Goal

The app should offer a clearer first classroom trial:

- Teacher can press/start a clearly named 2-card pilot path.
- Child flow becomes calmer during the pilot: profile, one helpful support setting, exactly two cards, then finish.
- Full library and larger paths stay secondary so the pilot does not become overwhelming.
- Teacher sees that this is a local reading moment, not a test or diagnosis.
- Implementation remains small, testable, and reversible.

## Required Outcome

1. Create a short blueprint before coding.
2. Implement a primary 2-card pilot mode or equivalent first-use flow.
3. Keep full library and existing features available but visually secondary during the pilot.
4. Ensure the pilot uses existing tasks/stories only.
5. Make the pilot end calmly after two cards.
6. Avoid any scoring, diagnosis, timer, automatic level, or real data collection.
7. Add/adjust focused tests.
8. Run `npm test` and `npm run build`.
9. Run browser checks for desktop and narrow width if possible.
10. Final watchdog must decide accepted/blocked and recommend Alpha 16.

## Strict Out of Scope

- No new large content library.
- No automatic diagnostics.
- No score/progress percentage/ranking/timer.
- No login, cloud, export, database, class list, or student management.
- No external images or protected symbol systems.
- No broad redesign.
- No marketing page.
- No push/commit/deploy.

## Suggested Slice Chain

### Slice A - 2-card pilot mode blueprint

Assignee suggestion: `neva` or `schule`.

Create:

- `reports/alpha-15-two-card-pilot-blueprint.md`

No code changes.

The blueprint must decide:

- where the 2-card pilot starts;
- which two existing cards are safest as the default;
- what support setting should be preselected or emphasized;
- how the child flow ends after two cards;
- how the full library remains secondary;
- what tests must protect the behavior.

### Slice B - Implement 2-card pilot mode

Assignee suggestion: `coder`.

Likely files:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-15-two-card-pilot-implementation-report.md`

Expected implementation:

- Add a clear teacher action such as `Pilot starten: nur 2 Karten`.
- Start or select a path with exactly two existing cards.
- Keep child path calm and avoid expanding the UI.
- End after two pilot cards with a calm finish state or clear teacher return.
- Ensure copy stays local, anonymous, non-diagnostic and GE-friendly.
- Add focused tests for exactly-two-card pilot behavior and protected boundaries.

### Slice C - GE first-use review

Assignee suggestion: `schule`.

Create:

- `reports/alpha-15-ge-first-use-review.md`

Review:

- Does the 2-card pilot reduce GE first-use complexity?
- Does it remain child-friendly and teacher-led?
- Is the language simple and respectful?
- Does it avoid diagnostic or pressure signals?
- Is the full library secondary enough?

Decision: `Accept`, `Accept with minor notes`, or `Block`.

### Slice D - Final watchdog and Alpha 16 recommendation

Assignee suggestion: `neva`.

Create:

- `reports/alpha-15-watchdog-review.md`

Run:

- `npm test`
- `npm run build`
- source-level privacy/content-safety scan
- browser check after build
- if feasible: desktop and narrow width check

The final report must include:

- exact checks run;
- pass/fail;
- what changed;
- remaining risks;
- accepted/blocked decision;
- one precise Alpha 16 recommendation.

## Desired End State

Alpha 15 should make LeseWerk easier to try with one GE student for the first time.

The best result is not more complexity. The best result is a calmer first path: teacher starts a tiny pilot, child reads exactly two cards with support, the app ends without pressure, and the teacher can observe locally and carefully.
