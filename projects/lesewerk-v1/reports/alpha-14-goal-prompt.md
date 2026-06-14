# /goal LeseWerk Alpha 14 - Pilot-Readiness, Versionsklarheit und Selbst-Gap-Analyse

Build Alpha 14 as a focused pilot-readiness phase for the existing LeseWerk app.

## Mission

Prepare LeseWerk for a first small local classroom pilot in the GE context.

Alpha 14 must not be a broad feature expansion. It should make the app clearer, safer, and more usable for a real 10-15 minute classroom trial. Hermes must also critically inspect what is still missing instead of simply confirming success.

## Starting Point

Read first:

- `reports/product-spec.md`
- `reports/alpha-13-watchdog-review.md`
- `reports/alpha-13-content-audit.md`
- `reports/alpha-13-content-refinement-report.md`
- `reports/alpha-13-ge-content-review.md`
- `src/App.tsx`
- `src/styles.css`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

Preserve:

- 48 learning tasks across Level A/B/C;
- 24 story paths across the existing clusters;
- local symbol placeholders only;
- text-only gesture hints only;
- anonymous demo profiles only;
- no protected assets, no METACOM copying, no external image URLs;
- no real student data;
- no scoring, ranking, timer, speed pressure, diagnosis, or shame language;
- local-only teacher observation language;
- Alpha 11 adaptive suggestion behavior;
- Alpha 12 teacher hierarchy and calm visual structure;
- Alpha 13 content quality refinements.

## Product Goal

The app should feel ready for a cautious first pilot:

- A teacher can understand what to do before, during, and after a 10-15 minute reading trial.
- The visible product/version wording is not stale or misleading.
- Privacy and non-diagnostic boundaries are clear without making the app feel like a legal document.
- The child path remains calm, playful, and reading-focused.
- The teacher path gives practical guidance, not a broad manual.
- Hermes identifies what is still missing for a real classroom pilot and for later sellable quality.

## Required Outcome

1. Create a self-critical gap audit before implementation.
2. Resolve visible version/product language, especially stale Alpha text.
3. Sharpen or add a compact pilot-readiness checklist for teachers.
4. Add or refine a short teacher onboarding block for a 10-15 minute local pilot.
5. Keep the app local, anonymous, asset-safe, and non-diagnostic.
6. Strengthen tests only where they protect pilot-readiness and version clarity.
7. Run `npm test` and `npm run build`.
8. Run a quick browser check after build.
9. Write a final watchdog report with an Alpha 15 recommendation.

## Strict Out of Scope

- No new large content pack.
- No broad diagnostics system.
- No scoring, score history, ranking, timers, speed pressure, grades, or automatic levels.
- No login, cloud, export, upload, database, student management, or real names.
- No protected symbols, METACOM copies, external image URLs, photos, or licensed asset claims.
- No marketing page.
- No broad redesign.
- No push, commit, or deployment unless explicitly requested later.

## Required Self-Gap Audit

Before coding, create `reports/alpha-14-gap-audit-and-pilot-blueprint.md`.

Be critical and precise. Do not just praise the app. Identify what is still missing for:

- a first 10-15 minute GE classroom pilot;
- teacher clarity;
- child usability;
- privacy and local-only safety;
- didactic quality;
- sellable-quality maturity later.

Classify findings as:

- `Must before pilot`;
- `Should before wider use`;
- `Later / not now`.

Then name the smallest implementation slice that should be done in Alpha 14.

## Suggested Slice Chain

### Slice A - Self-gap audit and pilot blueprint

Assignee suggestion: `neva` or `schule`.

Create:

- `reports/alpha-14-gap-audit-and-pilot-blueprint.md`

No code changes.

The report must:

- inspect the current app and reports;
- identify missing pilot-readiness pieces;
- classify gaps as `Must before pilot`, `Should before wider use`, and `Later / not now`;
- decide the smallest safe Alpha 14 implementation scope;
- explicitly mention anything that should remain out of scope to prevent another blocked oversized task.

### Slice B - Pilot-readiness UI and version clarity

Assignee suggestion: `coder`.

Likely files:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-14-pilot-readiness-report.md`

Implement only the smallest high-value changes from Slice A.

Expected improvements:

- replace stale visible `Alpha 12` wording with current or neutral pilot-demo language;
- ensure the first screen and teacher area do not make misleading maturity claims;
- sharpen or add a compact pilot checklist:
  - device prepared;
  - anonymous profile selected;
  - supports visible;
  - two cards read;
  - observation local and factual;
  - session ends without diagnosis;
- add or refine a short teacher onboarding block:
  - what to observe;
  - what not to store;
  - how to end after 10-15 minutes;
  - how to interpret the result cautiously.

Keep the child path calm. Avoid too much visible instruction for children.

### Slice C - GE/privacy pilot-readiness review

Assignee suggestion: `schule`.

Create:

- `reports/alpha-14-ge-pilot-readiness-review.md`

Review:

- Does the pilot guidance fit GE practice?
- Is the language respectful, simple, and non-diagnostic?
- Does the app avoid real student data?
- Does the teacher guidance make the first trial easier without becoming too long?
- Does anything risk pressure, shame, scoring, or false diagnostic certainty?

Decision: `Accept`, `Accept with minor notes`, or `Block`.

### Slice D - Final watchdog and Alpha 15 recommendation

Assignee suggestion: `neva`.

Create:

- `reports/alpha-14-watchdog-review.md`

Run:

- `npm test`
- `npm run build`
- source-level privacy/content-safety scan
- quick browser check after build

The final report must include:

- pass/fail status;
- exact checks run;
- what changed;
- remaining risks;
- whether Alpha 14 is accepted;
- one precise Alpha 15 recommendation.

## Desired End State

Alpha 14 should make LeseWerk feel more pilot-ready without pretending to be finished.

The app should communicate: this is a local, anonymous pilot demo for a short reading situation in the GE context. It should guide the teacher through a careful first use, protect children from pressure, and give Hermes a clear map of what still needs to be built next.
