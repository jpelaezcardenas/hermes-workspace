# Execute Plan: Hermes Night App Studio v2 Quality Gate

## 1. Inspect Current State

Read the active cron file:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Confirm:

- `NIGHT_APP_STUDIO_BUILD_DAILY` exists exactly once;
- `NIGHT_APP_STUDIO_BRIEFING_DAILY` exists exactly once;
- build schedule is `30 1 * * *`;
- briefing schedule is `0 8 * * *`;
- build delivery is `local`;
- briefing delivery is `telegram`;
- `model`, `provider` and `base_url` are `null`;
- both jobs are enabled;
- both jobs have successful recent runs.

If duplicates exist, stop and report before editing.

## 2. Inspect Evidence From First Two Runs

Read:

- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-04.md`
- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-05.md`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-04-lehrer-morgenkarte-ge/README.md`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-05-lehrer-morgenkarte-ge/README.md`

Decision:

- keep Night App Studio active;
- do not remove existing prototypes;
- tighten scoring and repetition behavior;
- do not build another plain `Lehrer-Morgenkarte GE` clone unless Chris gives real feedback or a V2 target.

## 3. Backup Cron Config

Create:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260605-before-night-app-studio-v2-quality-gate`

Verify the backup exists and is valid JSON before editing the live file.

## 4. Update Build Job Prompt

Modify only the `prompt` value for `NIGHT_APP_STUDIO_BUILD_DAILY` inside:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Keep all these fields unchanged:

- `id`;
- `name`;
- `schedule`;
- `schedule_display`;
- `deliver`;
- `workdir`;
- `skills`;
- `skill`;
- `model`;
- `provider`;
- `base_url`;
- `enabled`.

Use the v2 build prompt from:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/JOB_PROMPT_DRAFT.md`

Critical prompt changes:

- read the last 3 Night App Studio reports;
- choose one mode: `BUILD_NEW`, `IMPROVE_LAST`, `REVIEW_ONLY`, or `STOP`;
- apply repeat brake;
- apply score caps;
- require proof status in the report;
- prefer stronger next directions over another Morgenkarte clone;
- write no more than one report and one isolated prototype folder.

## 5. Update Briefing Job Prompt

Modify only the `prompt` value for `NIGHT_APP_STUDIO_BRIEFING_DAILY` inside:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Keep all non-prompt fields unchanged.

Use the v2 briefing prompt from:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/JOB_PROMPT_DRAFT.md`

Critical prompt changes:

- include mode;
- include proof status;
- include repeat check result;
- include score cap if applied;
- give one plain decision: `BEHALTEN`, `VERBESSERN`, `WEGWERFEN`, `WARTEN`;
- keep Telegram short and non-technical.

## 6. Validate Cron File

Run a JSON parse check for:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Expected:

- valid JSON;
- exactly two `NIGHT_APP_STUDIO_*` jobs;
- both enabled;
- schedules unchanged;
- deliveries unchanged;
- model/provider/base_url unchanged as `null`;
- no duplicate IDs.

If JSON parsing fails, restore from backup immediately.

## 7. Validate Prompt Content

Check the live build prompt contains:

- `BUILD_NEW`;
- `IMPROVE_LAST`;
- `REVIEW_ONLY`;
- `STOP`;
- `Repeat brake`;
- `score cap`;
- `visible proof`;
- `last 3 Night App Studio reports`;
- `No GPT-5.5`;
- `Do not overwrite existing prototypes`.

Check the live briefing prompt contains:

- `Mode`;
- `Proof`;
- `Repeat check`;
- `Score cap`;
- `BEHALTEN`;
- `VERBESSERN`;
- `WEGWERFEN`;
- `WARTEN`.

## 8. Create Validation Report

Write:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/VALIDATION.md`

Include:

- backup path;
- exact jobs found;
- schedule verification;
- model/provider verification;
- duplicate check;
- prompt keyword check;
- files intentionally changed;
- files intentionally not touched;
- next expected run: `2026-06-06T01:30:00+02:00` for build and `2026-06-06T08:00:00+02:00` for briefing, unless the active cron state says otherwise at execution time.

## 9. Report Back

Explain in simple German:

- v2 keeps Night App Studio active;
- v2 makes it more selective;
- v2 blocks same-family repetition without feedback;
- v2 forces proof status and honest scoring;
- v2 does not touch Nayyal or existing app projects;
- v2 does not use GPT-5.5;
- next morning output should be more critical and more useful.

## 10. Commit and Push Only If Asked

Do not commit or push as part of this execution unless Chris explicitly asks after validation.

If Chris asks for commit/push:

- include only this goal folder and the intended cron config update;
- do not add unrelated dirty workspace files;
- use a clear commit message such as `chore: tighten night app studio quality gate`.
