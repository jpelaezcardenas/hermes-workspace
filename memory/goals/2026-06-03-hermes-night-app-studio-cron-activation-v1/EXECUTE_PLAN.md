# Execute Plan: Hermes Night App Studio Cron Activation v1

## 1. Inspect Draft

Read:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/JOB_PROMPT_DRAFT.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/VALIDATION.md`

Decision:

- The old draft blocked cron install before approval.
- Chris approved activation on 2026-06-03.
- Activation is now allowed.

## 2. Inspect Existing Cron

Check:

- current job count;
- duplicate `NIGHT_APP_STUDIO_*` jobs;
- delivery styles;
- model/provider overrides;
- next scheduled jobs.

Decision:

- No existing Night App Studio job was present.
- Existing jobs use null model/provider overrides.
- Use null model/provider for Night App Studio too.

## 3. Backup

Create:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260603-before-night-app-studio-cron-v1`

## 4. Create Target Folders

Ensure:

- `/Users/zondrius/hermes-workspace/reports/night-app-studio/`
- `/Users/zondrius/hermes-workspace/projects/night-lab/`

## 5. Install Jobs

Add two jobs to:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Jobs:

```text
NIGHT_APP_STUDIO_BUILD_DAILY
ID: 95ae6578d2e5
Schedule: 30 1 * * *
Next run: 2026-06-04T01:30:00+02:00
Deliver: local
```

```text
NIGHT_APP_STUDIO_BRIEFING_DAILY
ID: 11b81d909d71
Schedule: 0 8 * * *
Next run: 2026-06-04T08:00:00+02:00
Deliver: telegram
```

## 6. Validate

Check:

- JSON parse;
- total job count;
- Hermes cron list;
- Hermes cron status;
- no duplicate Night App jobs;
- model/provider null;
- workdir correct;
- first run sequence correct;
- backup exists.

## 7. Update Documentation

Mark the original draft files as superseded by this activation so Hermes memory does not contradict the live cron state.

## 8. Report Back

Tell Chris:

- jobs are active;
- first real Telegram briefing is 2026-06-04 at 08:00;
- no 2026-06-03 briefing is expected because there was no 01:30 build before activation.
