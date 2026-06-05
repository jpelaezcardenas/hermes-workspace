# Execute Plan: Hermes Teacher Nextday Korrektur v1

## 1. Inspect Current Output

Read the generated report:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-02.md`

Decision:

- keep the basic GE direction;
- correct the shape from broad three-topic plan to one concrete morning card.

## 2. Inspect Local Anchors

Use local files as practical anchors:

- Montagskarte GE
- GE App Konzept
- Classroom-Ready Pilotpaket `Fuenferfeld legen`
- existing Teacher Nextday reports

Decision:

- choose `Fuenferfeld 1-3` as tomorrow's core;
- use `mehr`, `nochmal`, `fertig` as communication layer;
- keep material cleanup as optional ending.

## 3. Protect Current Cron State

Create a local backup before editing:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260602-before-teacher-nextday-korrektur-v1`

## 4. Correct Today's Report

Rewrite the report as:

- `Lehrer-Morgenkarte GE - 2026-06-02`
- exact date reference for Wednesday, 2026-06-03;
- one core decision;
- top 3 goals;
- A/B/C morning blocks with A as required, B as layer, C optional;
- max 7 table materials;
- differentiation;
- one observation question;
- stop and cut-down rule;
- Hermes source links;
- Decision Inbox.

## 5. Tighten Cron Prompt

Update `TEACHER_NEXTDAY_DAILY` in:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Prompt requirements:

- read local GE sources first;
- choose one core block;
- avoid generic parallel topics;
- max 7 materials;
- no sensitive personal data;
- no external downloads or new cronjobs;
- no costly model escalation;
- preserve Decision Inbox shape.

## 6. Validate

Check:

- JSON validity;
- job still enabled;
- schedule unchanged at `45 20 * * *`;
- next run unchanged for 2026-06-03 evening;
- report contains the corrected structure;
- no unrelated files intentionally changed.

## 7. Report Back

Explain in simple language:

- what was corrected;
- what this means for the next cron output;
- what remains open.
