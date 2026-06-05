# Validation: Hermes Night App Studio v2 Quality Gate

Status: executed
Date: 2026-06-05

## Backup

Created and JSON-validated before editing:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260605-before-night-app-studio-v2-quality-gate`

## Evidence Reviewed

Reviewed the first two real Night App Studio runs:

- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-04.md`
- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-05.md`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-04-lehrer-morgenkarte-ge/README.md`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-05-lehrer-morgenkarte-ge/README.md`

Observation:

- both runs selected `Lehrer-Morgenkarte GE`;
- both were safe and local;
- both lacked checked screenshot proof;
- scores were too generous for unproven pilots.

## Live Jobs Found

Exactly two Night App Studio jobs exist:

```text
NIGHT_APP_STUDIO_BUILD_DAILY
ID: 95ae6578d2e5
Schedule: 30 1 * * *
Deliver: local
Enabled: true
Model/provider/base_url: null / null / null
Next run: 2026-06-06T01:30:00+02:00
Last status: ok
```

```text
NIGHT_APP_STUDIO_BRIEFING_DAILY
ID: 11b81d909d71
Schedule: 0 8 * * *
Deliver: telegram
Enabled: true
Model/provider/base_url: null / null / null
Next run: 2026-06-06T08:00:00+02:00
Last status: ok
```

## Changes Made

Modified only:

- the `prompt` value of `NIGHT_APP_STUDIO_BUILD_DAILY` in `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`;
- the `prompt` value of `NIGHT_APP_STUDIO_BRIEFING_DAILY` in `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`;
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/JOB_PROMPT_DRAFT.md`;
- this validation file.

No non-prompt fields changed for either live job.

## Build Prompt v2 Confirmed

The live build prompt now includes:

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

Meaning:

- Hermes must read recent Night App Studio history before selecting;
- repeated app families are blocked unless there is feedback or a clear V2 target;
- weak proof caps scores;
- safe-but-generic ideas no longer become 9/10 or 10/10 by default;
- built prototypes must report proof status.

## Briefing Prompt v2 Confirmed

The live briefing prompt now includes:

- `Mode`;
- `Proof`;
- `Repeat check`;
- `Score cap`;
- `BEHALTEN`;
- `VERBESSERN`;
- `WEGWERFEN`;
- `WARTEN`.

Meaning:

- the 08:00 Telegram message should be more honest and decision-ready;
- missing proof must be visible;
- the briefing must not call an unproven result excellent;
- Chris gets one clear morning decision.

## Validation Checks

Passed:

- live cron JSON parses;
- backup cron JSON parses;
- exactly two `NIGHT_APP_STUDIO_*` jobs exist;
- no duplicate Night App Studio jobs found;
- no duplicate job IDs detected;
- schedules unchanged;
- delivery channels unchanged;
- both jobs remain enabled;
- `model`, `provider` and `base_url` remain `null`;
- prompt keyword validation passed;
- no Nayyal files touched;
- no GE-Lernwerkstatt files touched;
- no LeseWerk files touched;
- no existing night-lab prototypes overwritten;
- no handoff files touched.

## Files Intentionally Not Touched

- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-04-lehrer-morgenkarte-ge/`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-05-lehrer-morgenkarte-ge/`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/`
- Nayyal files
- handoff files
- source app files outside the cron config

## Next Expected Behavior

Next build:

- `2026-06-06T01:30:00+02:00`

Next Telegram briefing:

- `2026-06-06T08:00:00+02:00`

Expected improvement:

- Hermes should avoid another plain `Lehrer-Morgenkarte GE` clone;
- Hermes should choose `BUILD_NEW`, `IMPROVE_LAST`, `REVIEW_ONLY` or `STOP`;
- reports should include repeat check, proof status, score caps and a clear morning decision.
