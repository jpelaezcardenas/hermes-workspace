# Alpha 26C - Watchdog Review

Status: Accepted / not blocked
Date: 2026-05-18

## Decision

Accepted.

Alpha 26C meets the stated goal: teachers can now see how much of the reading task library is already profiled, which units require closer review, and how the currently selected anonymous demo profile maps onto the available tasks.

## What Was Checked

- Helper exists: `getTaskRequirementCoverageSummary`
- App imports and uses the helper
- Teacher UI contains the heading `Coverage-Check: Was ist schon getaggt?`
- Coverage values are deterministic for the current demo profiles
- Output avoids diagnostic, scoring, ranking, timer and grade wording
- UI remains teacher-facing and optional
- Child path is not automatically changed

## Verification Results

- `npm test`: passed, 104 / 104 tests
- `npm run build`: passed

Observed summary:

- total requirements: 28
- Level A: 15
- Level B: 13
- Level C: 0
- teacher review count: 15
- complex units: au, ch, sch, st

## Residual Risk

The inspector is useful, but still mostly a transparency tool. The next quality step should not be more metadata alone; it should connect coverage to a clearer teacher workflow:

1. Show what the next safe expansion would be for a selected demo profile.
2. Mark whether a new task is ready for child use, teacher-led use, or still only planned.
3. Add a review view that explains why a task is omitted in plain teacher language.

## Board Note

The Hermes worker first became idle after an early red test and produced no reliable closing report. The run was reclaimed, verified independently, and should be completed as accepted.
