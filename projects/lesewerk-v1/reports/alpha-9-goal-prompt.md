# LeseWerk Alpha 9 Goal Prompt

```text
/goal LeseWerk Alpha 9 - GE classroom pilot mode and calm daily reading path

Project path:
/Users/zondrius/hermes-workspace/projects/lesewerk-v1

Baseline:
Alpha 8 is accepted. The app now contains 24 mini-stories and 48 learning tasks. Tests and build pass. The main risk is no longer content quantity. The main risk is that the child path can show too much content at once for students in the GE context.

Read first:
- reports/product-spec.md
- reports/alpha-8-watchdog-review.md
- reports/alpha-8-content-quality-review.md
- reports/alpha-7-watchdog-review.md
- src/App.tsx
- src/lesewerk-content.mjs
- src/styles.css
- tests/lesewerk-content.test.mjs

Main objective:
Turn the expanded content library into a calmer, classroom-ready reading experience for students in the GE context. Alpha 9 should not primarily add more content. It should make the existing 24 stories and 48 tasks usable through a small daily path and a teacher pilot protocol.

Concrete end product:
At the end of Alpha 9, the app should support a 10-15 minute classroom pilot:
1. a child-facing daily reading path with only a few visible cards at a time;
2. a teacher-facing pilot protocol explaining how to use the app without real student data;
3. a local anonymous observation card for the session;
4. a clearer distinction between "today's path" and the larger content library;
5. a visible Alpha 9 product header;
6. tests and build passing;
7. a final watchdog report with Alpha 10 recommendation.

GE learning experience principles:
- show fewer choices, not more;
- use repetition with small variation;
- make supports visible and selectable;
- keep tasks short and concrete;
- avoid hidden scoring;
- avoid diagnosis language;
- avoid speed pressure;
- keep teacher interpretation cautious and support-oriented;
- preserve local-only, anonymous, no-login operation.

Design target:
The child should not feel like they are browsing a library. The child should feel: "Today I have a small reading path I can manage."

Suggested daily path:
- 2 word/syllable cards;
- 1 picture-word or sentence-like card;
- 1 mini-story;
- optional repeat;
- teacher summary after one or more actions.

Teacher pilot protocol must define:
- 10-15 minute use flow;
- when to stop;
- what to observe;
- how to choose supports;
- how to use anonymous color profiles;
- what must not be recorded;
- how to interpret "next step" cautiously;
- how to reset after the session;
- privacy boundaries.

Worker strategy:
Use at most 3 profiles:
- schule: GE reading didactics, pilot protocol, classroom review;
- coder: implementation, tests, build, browser verification;
- neva: orchestration, final watchdog, next goal recommendation.

Strict boundaries:
- no real student names;
- no diagnosis;
- no grades, scores, rankings, timers, speed pressure, shame wording;
- no login, cloud, backend, upload, account, auth;
- no protected assets or METACOM assets;
- no copy from Lernwerkstatt V3;
- no modification of /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt;
- no commit, no push.

Task slicing:

Slice A - Pilot and daily-path blueprint
Owner: schule
Create reports/alpha-9-pilot-daily-path-blueprint.md.
Decide exactly how a 10-15 minute GE classroom pilot should work and how a calm daily path should select/show only a few cards.
Do not edit app code.

Slice B - Daily path implementation
Owner: coder
Implement the daily path in the existing app. Keep the implementation narrow.
Expected result:
- child path shows a "Heute lesen" or equivalent daily path surface;
- only a small curated set is visible by default;
- user can still access story/word flow without being overwhelmed;
- header says Alpha 9;
- no new backend or new content mass.
Add tests for daily path source checks and safe wording.
Run npm test and npm run build.
Write reports/alpha-9-daily-path-implementation-report.md.

Slice C - Teacher pilot and observation card
Owner: coder
Add a teacher-facing pilot protocol / local anonymous observation card if it can be done cleanly in the current teacher area.
Expected result:
- teacher sees a practical 10-15 minute pilot flow;
- local anonymous observation summary;
- privacy language remains strong;
- reset remains obvious.
Add/update tests if visible wording or privacy invariants change.
Run npm test and npm run build.
Write reports/alpha-9-teacher-pilot-implementation-report.md.

Slice D - GE usability review
Owner: schule
Review the daily path and teacher pilot from a GE classroom perspective.
Check:
- choice load;
- language simplicity;
- repeatability;
- support use;
- teacher practicality;
- whether any part still feels like a dashboard instead of a calm reading app.
Write reports/alpha-9-ge-usability-review.md with Accept / Accept with minor notes / Block.

Slice E - Final watchdog
Owner: neva
Run:
- npm test;
- npm run build;
- fresh local browser check.
Browser-check:
- child daily path;
- one word/syllable task;
- one story answer to feedback;
- teacher pilot view;
- local observation card;
- reset;
- local print preview/privacy wording.
Check forbidden patterns in active product files.
Write reports/alpha-9-watchdog-review.md.
Recommend Alpha 10.

Blocked prevention:
- If tests/build/browser pass, complete.
- Block only for concrete acceptance failure.
- If browser tooling is flaky, use a fresh local port and document exact checks.
- If iteration budget gets low, write the report/handoff before continuing.

Acceptance criteria:
- reports/alpha-9-pilot-daily-path-blueprint.md exists.
- daily path exists and reduces visible choice load.
- teacher pilot protocol / observation card exists.
- Alpha 9 header is visible.
- npm test passes.
- npm run build passes.
- browser check verifies child path, story feedback, teacher pilot, reset, local privacy.
- reports/alpha-9-watchdog-review.md accepts or blocks with exact smallest-safe-fix.
```

