# Execute Plan: Hermes Night App Studio v1

Status: activated via cron on 2026-06-03

## Architecture

Night App Studio v1 uses two logical jobs:

1. `NIGHT_APP_STUDIO_BUILD_DAILY`
   - proposed time: 01:30 Europe/Berlin;
   - creates candidates, scores them, optionally builds one isolated prototype;
   - writes a report to `reports/night-app-studio/`;
   - should not send the main Telegram briefing.

2. `NIGHT_APP_STUDIO_BRIEFING_DAILY`
   - proposed time: 08:00 Europe/Berlin;
   - reads the latest night report;
   - sends the short Telegram briefing;
   - does not build code.

If Hermes cron cannot suppress delivery for the build job cleanly, v1 should use one manual pilot first and only install the 08:00 briefing after the build workflow is proven.

## Files

Create or use:

- `/Users/zondrius/hermes-workspace/reports/night-app-studio/`
- `/Users/zondrius/hermes-workspace/projects/night-lab/`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/JOB_PROMPT_DRAFT.md`

Do not touch:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/**`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/**`
- `/Users/zondrius/hermes-workspace/src/**`
- `/Users/zondrius/.hermes/**`
- `/Users/zondrius/hermes-workspace/handoff/**`

## Step 1: Prompt Review

Write job prompt drafts for:

- build phase;
- 08:00 briefing phase.

Review for:

- score gate;
- no sensitive data;
- no external APIs;
- no existing-app edits;
- no uncontrolled token use;
- clear Telegram message.

## Step 2: Manual Pilot

Run one manual pilot for:

```text
Lehrer-Morgenkarte GE
```

Expected output:

- a night report;
- either one small local prototype or concept-only stop;
- no active app changes;
- no commit/push/deploy.

## Step 3: Morning Review

Chris reviews:

- Was it useful?
- Was the Telegram-style summary short enough?
- Was the prototype worth keeping?
- Was token/cost behavior acceptable?

## Step 4: Install Cron Only If Approved

If Chris approves:

- back up `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`;
- install build and briefing jobs or the smallest equivalent safe setup;
- verify `hermes cron list`;
- run one no-build dry run if available;
- write installation report.

## Activation Note

Chris approved cron activation on 2026-06-03.

Active jobs:

- `NIGHT_APP_STUDIO_BUILD_DAILY` at 01:30, delivery `local`
- `NIGHT_APP_STUDIO_BRIEFING_DAILY` at 08:00, delivery `telegram`

Activation details:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-03-hermes-night-app-studio-cron-activation-v1/`

## Draft Validation

The original draft passed if:

- docs and prompt drafts exist;
- cron installation waits for Chris approval;
- no active Hermes/app files changed;
- PDF overview exists;
- next action is clear.

Current activation validation lives in:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-03-hermes-night-app-studio-cron-activation-v1/VALIDATION.md`
