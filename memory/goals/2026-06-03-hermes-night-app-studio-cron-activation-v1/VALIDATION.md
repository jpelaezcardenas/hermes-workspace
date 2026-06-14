# Validation: Hermes Night App Studio Cron Activation v1

Date: 2026-06-03
Status: passed

## Installed Jobs

```text
NIGHT_APP_STUDIO_BUILD_DAILY
ID: 95ae6578d2e5
Enabled: true
State: scheduled
Schedule: 30 1 * * *
Next run: 2026-06-04T01:30:00+02:00
Delivery: local
Model override: null
Provider override: null
Workdir: /Users/zondrius/hermes-workspace
```

```text
NIGHT_APP_STUDIO_BRIEFING_DAILY
ID: 11b81d909d71
Enabled: true
State: scheduled
Schedule: 0 8 * * *
Next run: 2026-06-04T08:00:00+02:00
Delivery: telegram
Model override: null
Provider override: null
Workdir: /Users/zondrius/hermes-workspace
```

## Validation Checks

Passed:

- `jobs.json` parses as JSON.
- Hermes now has 21 active jobs.
- There are exactly two `NIGHT_APP_STUDIO_*` jobs.
- No duplicate Night App Studio jobs were found before installation.
- Gateway is running.
- Backup exists:
  `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260603-before-night-app-studio-cron-v1`
- Target folders exist:
  `/Users/zondrius/hermes-workspace/reports/night-app-studio/`
  `/Users/zondrius/hermes-workspace/projects/night-lab/`
- Build job delivery is `local`, so the night build itself should not spam Telegram.
- Briefing job delivery is `telegram`.
- Model and provider overrides are `null`, so no GPT-5.5 or special paid route is forced.

## First Real Run

The first valid cycle is:

```text
2026-06-04 01:30 CEST - build
2026-06-04 08:00 CEST - Telegram briefing
```

No 2026-06-03 08:00 Night App Studio briefing is expected, because there was no 2026-06-03 01:30 build before activation.

## Safety

Passed:

- No existing app folder was edited by activation.
- No prototype was created during activation.
- No deploy, commit, push or install was run.
- No real student or private data was added.
- No active app code was changed.

## Remaining Open

After the first 2026-06-04 cycle, inspect:

- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-04.md`
- Telegram briefing quality at 08:00.

If output is too broad or noisy, tighten score gates before the second night.
