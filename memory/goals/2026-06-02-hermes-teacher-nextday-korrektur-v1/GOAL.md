# Goal: Hermes Teacher Nextday Korrektur v1

Status: executed
Date: 2026-06-02
Owner: Chris / Neva / Codex

## Objective

Improve `TEACHER_NEXTDAY_DAILY` so the daily GE teacher output becomes a concrete Lehrer-Morgenkarte instead of a broad generic plan.

## Why

The 2026-06-02 cron output was usable, but still too generic. It named three possible areas with equal weight, used a slightly too strong goal formulation, and did not anchor itself enough in the existing GE-Lernwerkstatt, Montagskarte and Classroom-Ready material.

## Target Outcome

The job should now:

- choose exactly one core activity for tomorrow;
- treat communication as a layer, not a second full topic;
- keep the third block optional;
- reduce the table material to at most 7 concrete items;
- use local Hermes sources before writing;
- avoid student names, diagnoses, scores and broad digital expansion;
- produce a clear Decision Inbox block.

## Files

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260602-before-teacher-nextday-korrektur-v1`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-02.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-teacher-nextday-korrektur-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-teacher-nextday-korrektur-v1/VALIDATION.md`

## Out of Scope

- No new cronjob.
- No schedule change.
- No model upgrade.
- No app build.
- No commit/push in this goal.
- No changes to existing student-facing apps.

## Acceptance

- Today's report is corrected into a concrete Lehrer-Morgenkarte GE.
- The active cron prompt is tightened for future runs.
- The cron JSON remains valid.
- The job remains enabled and scheduled.
- The change does not touch unrelated Hermes work.
