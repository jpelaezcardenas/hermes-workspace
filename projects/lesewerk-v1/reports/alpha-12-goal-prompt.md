# /goal LeseWerk Alpha 12 - Teacher Area Calmness and Visual Hierarchy

Build Alpha 12 as a focused quality phase for the existing LeseWerk app.

## Mission

Improve the teacher area so it feels calmer, more professional, and easier to scan without adding new product scope.

Alpha 12 must refine the existing Alpha 11 state. It must not add new diagnostics, new data sources, new content packs, dashboards, account systems, exports, cloud sync, scoring, timers, rankings, or automated decisions.

## Starting Point

Read first:

- `reports/product-spec.md`
- `reports/alpha-11-watchdog-review.md`
- `reports/alpha-11-ge-usability-review.md`
- `reports/alpha-11-suggestion-ui-report.md`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Alpha 11 is accepted. Preserve:

- child-facing `Heute lesen` as the calm primary start;
- local anonymous teacher curation;
- Alpha 11 teacher suggestion block;
- manual apply/ignore behavior;
- max-four rule;
- local privacy, no real names, no cloud, no login, no backend, no export;
- no scores, timers, ranking, diagnosis, speed pressure, or shame language.

## Product Goal

The teacher area should feel like a high-quality, quiet planning surface for a GE classroom:

- one clear primary action area;
- one compact suggestion area;
- one clear daily-path curation area;
- supporting observation/print/pilot details visually subordinate;
- less visual competition between cards;
- better mobile/tablet scanning;
- no nested-card feeling;
- no dashboard overload.

The app should feel more polished, not bigger.

## Required Outcome

1. Header updates to `LeseWerk Alpha 12 · lokale Demo`.
2. Teacher area keeps all Alpha 11 functions.
3. Suggestion block remains visible but is less visually dominant.
4. Daily-path curation remains easy to find and use.
5. Observation, pilot protocol, and print preview become quieter secondary sections.
6. Mobile/tablet teacher area reads cleanly without cramped two-column text.
7. The child path remains unchanged except for intended manual teacher actions.
8. No new data model, no new content expansion, no new app mode.
9. Tests and build must pass.
10. Browser check must verify teacher area on desktop and narrow viewport.

## Design Constraints

- Do not create a dashboard.
- Do not add charts, meters, progress bars, scores, levels, or analytics.
- Do not add another large card above the existing teacher content.
- Avoid visual overemphasis of the suggestion; it is support, not a command.
- Keep cards at modest radius and practical spacing.
- Text must not overflow buttons or cards.
- Teacher area should support repeated real use, not marketing-page drama.

## Suggested Slice Chain

### Slice A - Visual hierarchy blueprint

Create `reports/alpha-12-teacher-hierarchy-blueprint.md`.

Define:

- target hierarchy for teacher area;
- which elements are primary, secondary, tertiary;
- desktop/tablet/mobile layout rules;
- exact wording/visual constraints;
- what not to change;
- acceptance criteria.

No code changes in Slice A.

### Slice B - Teacher area CSS and markup refinement

Implement the visual hierarchy with minimal code changes.

Likely files:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-12-teacher-ui-report.md`

Requirements:

- update Alpha 12 header;
- make suggestion block quieter;
- make daily curation clearly primary/actionable;
- make observation, pilot, and print preview secondary;
- improve responsive behavior;
- keep all Alpha 11 behavior intact.

### Slice C - Interaction and accessibility review

Create `reports/alpha-12-interaction-accessibility-review.md`.

Check:

- keyboard focus remains visible;
- apply/ignore/reset controls are understandable;
- buttons fit on narrow screens;
- teacher area is readable on tablet and mobile;
- no child-facing regressions;
- no privacy regression.

Small safe wording/CSS corrections are allowed.

### Slice D - Final watchdog and Alpha 13 recommendation

Create `reports/alpha-12-watchdog-review.md`.

Run:

- `npm test`
- `npm run build`
- browser check desktop and narrow viewport
- forbidden-pattern scan in active product files

Accept only if all checks pass.

Recommend Alpha 13 as either:

- a didactic-depth slice for reading task quality, or
- a small content-review slice for GE suitability,

but not a broad new feature expansion.

## Desired End State

Alpha 12 should make the product feel more mature:

> The teacher can glance at the area, understand the next suggestion, adjust the Tagesweg, and still feel that the child-facing app remains calm and safe.

The change should be felt mainly as better quality, not as more complexity.
