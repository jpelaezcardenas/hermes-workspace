# Alpha 26C - Coverage Inspector Report

Status: Accepted / implemented
Date: 2026-05-18

## Outcome

Alpha 26C adds a compact teacher-facing coverage inspector to the existing anonymous demo profile preview. It makes the Alpha 26B requirement coverage visible without adding a real learner profile workflow.

The new helper `getTaskRequirementCoverageSummary(profile, options)` summarizes:

- total locally tagged task requirements
- Level A / B / C coverage
- task type counts
- number of requirements marked `requiresTeacherReview`
- complex units present in the metadata
- selected demo profile fit counts
- short sample lists for review-needed and blocked task ids

## Current Coverage Snapshot

- Total profiled tasks: 28
- Level A: 15
- Level B: 13
- Level C: 0
- With teacher review marker: 15
- Complex units currently present: au, ch, sch, st

For the `M+A` demo profile:

- Visible in demo profile: 1
- Reduced choice: 1
- Teacher-led: 0
- Full choice: 0
- Today omitted: 27

For the `M+A+S+O+F` demo profile:

- Visible in demo profile: 2
- Reduced choice: 2
- Teacher-led: 0
- Full choice: 0
- Today omitted: 26

## UI

The teacher view now includes:

- Heading: `Coverage-Check: Was ist schon getaggt?`
- Total tagged tasks
- Level A / B / C counts
- teacher review count
- complex units
- visible / reduced / teacher-led / omitted counts for the selected demo profile
- short samples for review-needed and omitted task ids

The inspector is placed inside the existing teacher preview area and does not change the child path automatically.

## Safety Boundaries

No real student data, class lists, login, upload, export, cloud workflow, scoring, grade, percentage, timer, diagnosis, ranking or stored profile editor was added.

This remains a local structuring helper for teachers, not a diagnostic statement.

## Verification

- `npm test`: passed, 104 / 104 tests
- `npm run build`: passed
- Focused helper check: passed for `profileMA` and `profileMASOF`

## Notes

The Hermes run briefly became idle after an early test failure, but the intended code changes were present and verified afterwards. The task was reclaimed so the board could be closed cleanly after independent verification.
