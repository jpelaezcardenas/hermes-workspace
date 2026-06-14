# /goal LeseWerk Alpha 13 - Reading Task Quality and GE Content Review

Build Alpha 13 as a focused didactic quality phase for the existing LeseWerk app.

## Mission

Improve the quality of the existing reading tasks and story cards for students in the GE context.

Alpha 13 must not expand the app broadly. It should review and refine the existing content so it becomes more consistent, more didactically deliberate, easier to use in a GE classroom, and closer to a sellable/pilot-quality reading product.

## Starting Point

Read first:

- `reports/product-spec.md`
- `reports/alpha-12-watchdog-review.md`
- `reports/alpha-12-teacher-ui-report.md`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `src/App.tsx`

Preserve:

- 48 learning tasks across Level A/B/C;
- 24 story paths across the three existing clusters;
- local symbol placeholders only;
- text-only gesture hints only;
- no protected assets, no METACOM copying, no external image URLs;
- no real student data;
- no scoring, ranking, timer, speed pressure, diagnosis, or shame language;
- Alpha 12 UI hierarchy and Alpha 11 teacher suggestion behavior.

## Product Goal

The content should feel more intentional:

- Level A should focus on concrete picture-word matching with highly familiar words and clear distractors.
- Level B should focus on syllable reading with clean blue-red syllable structure and low cognitive load.
- Level C should focus on very short phrase/sentence-like reading with picture support and meaningful distractors.
- Stories should use short everyday situations, one clear focus word, one clear comprehension question, and one safe next step.
- Feedback should be calm and supportive, not evaluative or overly praising.
- Gesture hints should remain practical, text-only, and easy for a teacher to demonstrate.

## Required Outcome

1. Create a didactic audit of current tasks and stories.
2. Identify the smallest high-value set of content refinements.
3. Apply only targeted improvements to existing content.
4. Strengthen tests for content quality where useful.
5. Keep counts stable unless there is a documented reason.
6. Keep all privacy and no-protected-asset constraints.
7. Do not introduce a new UI feature.
8. Do not create broad content generation.
9. Final watchdog must pass tests, build, and content-safety scan.

## Didactic Review Criteria

Review existing content for:

- GE suitability;
- concrete Alltag / Schule / soziale Situationen;
- word familiarity;
- distractor quality;
- short readable prompts;
- clear syllable separation;
- one target skill per task/story;
- no abstract metaphors;
- no moralizing;
- no performance labels;
- no hidden pressure;
- no protected asset references;
- no fake licensed symbol language;
- gesture hints that are demonstrable with hands/body;
- story questions that can be answered from the text.

## Suggested Slice Chain

### Slice A - Didactic audit

Create `reports/alpha-13-content-audit.md`.

No code changes.

The audit must:

- review Level A/B/C task quality;
- review story quality by cluster;
- identify the 8-12 highest-value small fixes;
- name files/functions to touch;
- classify each fix as wording, distractor, syllable, feedback, next-step, or gesture-hint.

### Slice B - Content quality tests

Implement tests that protect the audit criteria.

Likely file:

- `tests/lesewerk-content.test.mjs`
- `reports/alpha-13-content-test-report.md`

Tests should cover:

- Level A prompts stay short and concrete;
- Level B syllable tasks have consistent syllable arrays and no excessive options;
- Level C prompts remain short phrase/sentence prompts;
- story questions are answerable by the reduced-choice answer appearing in text or focus context;
- feedback and next steps remain calm and non-diagnostic;
- gesture hints stay text-only and demonstrable.

### Slice C - Targeted content refinements

Implement only the high-value fixes from Slice A.

Likely files:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-13-content-refinement-report.md`

Allowed changes:

- improve prompts;
- improve distractor choices;
- improve syllable arrays;
- improve supportive feedback;
- improve next-step wording;
- improve gesture hints if needed;
- keep content counts stable.

Not allowed:

- new UI;
- new data model unless extremely small and justified;
- broad content expansion;
- external assets;
- protected symbol references;
- real names.

### Slice D - GE content review

Create `reports/alpha-13-ge-content-review.md`.

Review:

- Is the content more GE-suitable?
- Are tasks concrete enough?
- Are story questions answerable?
- Are feedback and next steps useful for teachers?
- Are supports respectful and non-diagnostic?

Decision: `Accept`, `Accept with minor notes`, or `Block`.

### Slice E - Final watchdog and Alpha 14 recommendation

Create `reports/alpha-13-watchdog-review.md`.

Run:

- `npm test`
- `npm run build`
- source-level content-safety scan
- quick browser check that the app still opens and child/teacher flows are not broken

Recommend Alpha 14 as a narrow next step:

- either a small diagnostics-onboarding quality slice;
- or a first sellable/pilot-readiness checklist;
- not a broad feature expansion.

## Desired End State

Alpha 13 should make the app feel more professionally didactic.

The visible product may not look dramatically different, but the underlying content should become more reliable, more GE-appropriate, and better protected by tests.
