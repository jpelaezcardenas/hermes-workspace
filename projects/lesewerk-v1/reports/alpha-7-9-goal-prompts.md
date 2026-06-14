# LeseWerk Next Goal Prompts

Recommended order:

1. Alpha 7: content depth and mini-story quality.
2. Alpha 8: classroom pilot mode and teacher protocol.
3. Alpha 9: sellable product polish and visual refinement.

Do not run all three at the same time. Start with Alpha 7, review the result, then continue.

---

## Goal Prompt 1: LeseWerk Alpha 7 - Content Depth and Mini-Story Quality

```text
/goal LeseWerk Alpha 7 - build the first genuinely useful content expansion for the German reading app

Project path:
/Users/zondrius/hermes-workspace/projects/lesewerk-v1

Current baseline:
Alpha 6 is accepted as a verified local alpha. Tests pass, build passes, child path works, teacher view works, local print preview works, reset works, and the final watchdog report is available at:
reports/alpha-6-watchdog-review.md

Read first:
- reports/product-spec.md
- reports/alpha-6-watchdog-review.md
- reports/alpha-6-didaktik-product-review.md
- reports/alpha-6-tablet-pilot-report.md
- reports/alpha-6-teacher-planning-report.md
- src/App.tsx
- src/lesewerk-content.mjs
- src/styles.css
- tests/lesewerk-content.test.mjs

Language:
Use English internally for planning and engineering precision.
All product UI, child-facing text, teacher text, reading material, reports for school use, and exercises must be in German.

Main objective:
Turn LeseWerk from a strong prototype into a more genuinely useful reading-learning app by expanding the quality and quantity of German reading content without bloating the interface.

Concrete end product:
At the end of Alpha 7, the local app must contain a stronger, coherent content layer:
1. at least 12 high-quality German mini-stories total;
2. each mini-story must have:
   - a short title;
   - 2-4 very short sentences;
   - simple or easy German appropriate for early readers and GE contexts;
   - one local image/symbol placeholder description, not a protected asset;
   - one clear comprehension question;
   - exactly two answer options in reduced-choice mode;
   - one supportive feedback sentence;
   - one next-step recommendation for the teacher area;
   - one optional text-only gesture hint if meaningful;
3. at least 36 comprehension answer options across the story set must be meaningful, not filler;
4. at least 3 story clusters must exist:
   - everyday objects and actions;
   - school/classroom routines;
   - simple social/emotional situations;
5. story texts must avoid:
   - shame, grades, pressure, speed, ranking, scores;
   - medical/psychological diagnosis language;
   - abstract vocabulary that is too hard for early readers;
   - protected brands/assets;
6. keep the child UI calm and app-like;
7. teacher view should summarize story evidence without becoming diagnostic.

Quality bar:
This is not just adding more text. The content must feel carefully written, didactically controlled, useful for classroom practice, and suitable as the beginning of a sellable German reading app.

Worker strategy:
Use at most 3 workers total.
Recommended roles:
- schule: content quality, German reading didactics, GE fit, easy/simple German.
- coder: implementation, tests, build, app verification.
- neva: orchestration, integration review, final report, next goal decision.

Task slicing:
Do not create many speculative tasks. Create only a short chain:

Slice A - Content blueprint
Owner: schule
Create reports/alpha-7-content-blueprint.md.
Define the 3 story clusters, quality rubric, vocabulary limits, sentence-length rules, and examples of good/bad wording.
Do not edit app code in this slice.

Slice B - Story pack implementation
Owner: coder
Implement the story expansion in src/lesewerk-content.mjs.
Update tests in tests/lesewerk-content.test.mjs to verify:
- at least 12 stories;
- all stories have title, sentences, placeholder image/symbol description, comprehension prompt, 2 meaningful answer options, feedback, next step;
- no forbidden wording patterns;
- reduced-choice story behavior still works.
Only touch app UI if necessary for the story pack to render cleanly.

Slice C - Story UX and teacher review
Owner: schule or neva
Review the actual app flow with the expanded story pack.
Write reports/alpha-7-story-quality-review.md.
Check whether the stories are child-friendly, GE-appropriate, and visually calm in the current UI.

Slice D - Final watchdog
Owner: neva
Run:
- npm test
- npm run build
- fresh local browser check
Test:
- one word task;
- one story from each cluster;
- one reduced-choice story;
- teacher view after story answer;
- reset;
- local print preview.
Write reports/alpha-7-watchdog-review.md.

Strict boundaries:
- Do not modify /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt.
- Do not copy from Lernwerkstatt V3.
- Do not use protected symbol sets or METACOM assets.
- Do not add login, cloud, backend, real student names, diagnoses, grades, scores, rankings, timers, or shame feedback.
- No push, no commit.
- Keep all data local and anonymous.

Blocked-prevention rules:
- If iteration budget gets low, stop feature work and write the report/handoff first.
- Do not block for review-required if tests, build, report, and browser check pass.
- Block only for a real acceptance failure.
- If a browser check is uncertain, write exactly what was checked and the smallest next verification step.

Acceptance criteria:
- reports/alpha-7-content-blueprint.md exists.
- story content expanded to at least 12 high-quality mini-stories.
- tests verify content quantity and quality rules.
- npm test passes.
- npm run build passes.
- browser check confirms the story path and teacher evidence still work.
- reports/alpha-7-story-quality-review.md exists.
- reports/alpha-7-watchdog-review.md exists.
- final Kanban handoff explains changed files, verification, remaining risks, and the recommended Alpha 8 direction.
```

---

## Goal Prompt 2: LeseWerk Alpha 8 - Classroom Pilot Mode and Teacher Protocol

```text
/goal LeseWerk Alpha 8 - create a real classroom pilot mode without collecting personal data

Project path:
/Users/zondrius/hermes-workspace/projects/lesewerk-v1

Prerequisite:
Run this only after Alpha 7 has passed or clearly document why Alpha 8 is starting without Alpha 7 completion.

Read first:
- reports/product-spec.md
- reports/alpha-6-watchdog-review.md
- reports/alpha-7-watchdog-review.md if present
- src/App.tsx
- src/lesewerk-content.mjs
- src/styles.css
- tests/lesewerk-content.test.mjs

Main objective:
Create a practical teacher pilot layer so the app can be tested in a real classroom or individual support setting without storing personal student data.

Concrete end product:
At the end of Alpha 8, LeseWerk must include a simple pilot workflow for teachers:
1. a teacher-facing pilot checklist;
2. a local anonymous session note view;
3. a printable pilot observation card;
4. a clearer separation between child action and teacher interpretation;
5. a visible statement that no real student names should be entered;
6. a reset/new-session flow that is obvious and safe;
7. a report explaining exactly how a teacher would test the app for 10-15 minutes with one child.

Important:
This must not become a diagnostic product. It is a classroom observation support, not a diagnosis, grade, score, or medical assessment.

Worker strategy:
Use at most 3 workers total:
- schule: classroom protocol and GE fit.
- coder: implementation, local print/pilot view, tests.
- neva: final watchdog and risk review.

Task slicing:

Slice A - Pilot protocol design
Owner: schule
Create reports/alpha-8-pilot-protocol.md.
It must include:
- 10-15 minute classroom use flow;
- what the teacher observes;
- what should not be recorded;
- how to use anonymous profiles;
- how to interpret supports cautiously;
- stop criteria for children;
- teacher language examples.

Slice B - App pilot layer
Owner: coder
Add a compact teacher pilot section to the app.
It should include:
- session purpose;
- anonymous profile reminder;
- observed support summary;
- local-only print card;
- reset/new-session button clarity;
- no real input field for names.
Update tests for privacy and pilot wording.

Slice C - Classroom usability review
Owner: schule
Review the flow from a teacher perspective:
- Is it usable during class?
- Is it too text-heavy?
- Is it clear what to do next?
- Is it safe for GE contexts?
Write reports/alpha-8-classroom-review.md.

Slice D - Final watchdog
Owner: neva
Run tests, build, and browser check.
Write reports/alpha-8-watchdog-review.md.

Strict boundaries:
- No real names, no login, no cloud, no backend.
- No diagnosis, grades, scores, rankings, timer pressure, shame wording.
- No protected assets.
- No push, no commit.
- Do not modify ge-lernwerkstatt.

Blocked-prevention rules:
- If work is done and verification passes, complete the task.
- Block only for real acceptance failure.
- Write handoff/report before tool budget is exhausted.

Acceptance criteria:
- pilot protocol report exists;
- teacher pilot section exists and is usable;
- print card remains local and anonymous;
- tests verify privacy wording and forbidden patterns;
- npm test passes;
- npm run build passes;
- browser check confirms child path, teacher pilot view, reset, and print preview;
- final report recommends whether Alpha 9 should focus on UI polish or content quantity.
```

---

## Goal Prompt 3: LeseWerk Alpha 9 - Sellable Product Polish and Visual Quality

```text
/goal LeseWerk Alpha 9 - raise LeseWerk toward a sellable app-quality interface

Project path:
/Users/zondrius/hermes-workspace/projects/lesewerk-v1

Prerequisite:
Run this after Alpha 7 content expansion and Alpha 8 pilot mode, unless the current Alpha reports clearly justify doing UI polish first.

Main objective:
Improve the visual and interaction quality so LeseWerk feels less like a prototype and more like a real, high-value educational app.

Concrete end product:
At the end of Alpha 9, the app should feel calmer, more beautiful, more consistent, and more touch-friendly without losing its GE suitability.

Focus areas:
1. child-first visual rhythm;
2. clearer story cards;
3. warmer but not childish color system;
4. better spacing and hierarchy on tablet;
5. teacher area less text-heavy;
6. visual distinction between child mode and teacher mode;
7. improved reduced-choice state;
8. local symbol/image placeholder design that looks intentional;
9. no marketing landing page;
10. no decorative clutter.

Reference:
Use Lernwerkstatt V3 only as a quality benchmark for app feeling and calm structure, not as source code or copied layout.

Worker strategy:
Use at most 3 workers:
- neva: product-quality director and task routing.
- coder: CSS/UI implementation, responsive checks, tests/build.
- schule: GE suitability and text clarity review.

Task slicing:

Slice A - Visual audit
Owner: neva
Create reports/alpha-9-visual-audit.md.
Assess:
- child path;
- story path;
- teacher path;
- print preview;
- tablet viewport;
- mobile-ish narrow viewport;
- visual overload;
- text density;
- touch target quality.

Slice B - Design polish implementation
Owner: coder
Improve only the existing app surfaces.
Do not add broad new product features.
Allowed areas:
- src/styles.css
- src/App.tsx only if small structural changes are needed for layout clarity
- tests only if source checks need updates
Keep the UI child-friendly, calm, and functional.

Slice C - GE/didactic polish review
Owner: schule
Review whether the polished UI still supports:
- slow reading;
- clear help selection;
- easy/simple German;
- reduced cognitive load;
- no pressure;
- teacher interpretation without diagnosis.
Write reports/alpha-9-ge-polish-review.md.

Slice D - Final visual watchdog
Owner: neva
Run:
- npm test
- npm run build
- browser checks at desktop/tablet/narrow viewport if possible
Check:
- text does not overlap;
- buttons are large enough;
- focus states still visible;
- story mode works;
- teacher mode works;
- reset works;
- local print preview remains safe.
Write reports/alpha-9-watchdog-review.md.

Strict boundaries:
- No new backend, login, cloud, accounts, push, or commit.
- No protected assets.
- No ge-lernwerkstatt modifications.
- No copying Lernwerkstatt V3.
- No decorative visual noise.
- No landing page.

Blocked-prevention rules:
- Do not block because more polish is imaginable.
- Complete if the defined checks pass.
- Block only for concrete visual breakage, failed tests/build, unsafe wording, or privacy violation.

Acceptance criteria:
- visual audit exists;
- UI polish is implemented;
- tests and build pass;
- browser checks are documented;
- teacher area is less text-heavy or a clear report explains why it remains as is;
- final report gives a concrete Alpha 10 recommendation.
```

---

## My Recommended Immediate Next Step

Use only Goal Prompt 1 first. Alpha 7 is the highest-leverage next move because Alpha 6 already proved the app loop. The weakest remaining product gap is content depth, not more infrastructure.

