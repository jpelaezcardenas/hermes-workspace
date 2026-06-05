# Validation: Hermes Teacher Nextday Korrektur v1

Date: 2026-06-02
Status: passed

## What Changed

1. The generated report for 2026-06-02 was corrected into a narrow `Lehrer-Morgenkarte GE`.
2. `TEACHER_NEXTDAY_DAILY` was tightened in the active Neva cron configuration.
3. A backup of the previous cron configuration was created.

## Corrected Report

File:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-02.md`

Checks:

- Uses one core activity: `Fuenferfeld 1-3`.
- Uses UK as a communication layer: `mehr`, `nochmal`, `fertig`.
- Keeps material service optional.
- Limits table preparation to 7 items.
- Includes one observation question.
- Includes a stop and cut-down rule.
- Includes local Hermes source references.
- Ends with a Decision Inbox block.

## Cron Configuration

File:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Backup:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260602-before-teacher-nextday-korrektur-v1`

Validation result:

```text
json-ok
```

Job state after edit:

```text
Job: TEACHER_NEXTDAY_DAILY
ID: 8e7d2ce452dc
Enabled: true
State: scheduled
Schedule: 45 20 * * *
Next run: 2026-06-03T20:45:00+02:00
Last status: ok
Delivery: telegram
Model override: null
Provider override: null
Total jobs: 19
```

## Safety

Passed:

- No new cronjob installed.
- No schedule change.
- No model change.
- No GPT-5.5 or expensive model route added.
- No student names, diagnoses, photos, scores or private data introduced.
- No external downloads or app changes.
- Existing Hermes work remains untouched except the intended cron prompt and report.

## Remaining Open

The next real proof is the cron run on 2026-06-03 at 20:45. Expected output: a tighter Lehrer-Morgenkarte instead of a broad three-topic plan.
