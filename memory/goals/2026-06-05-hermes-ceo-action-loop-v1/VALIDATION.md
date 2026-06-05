# Validation: Hermes CEO Action Loop v1

Status: executed
Date: 2026-06-05

## Planning Package Created

Created:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/VALIDATION.md`

## Backup

Created and JSON-validated before live edit:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260605-before-hermes-ceo-action-loop-v1`

## Live Jobs Patched

Patched only the `prompt` field for:

```text
BUSINESS_IDEA_FIREWORK_DAILY
Schedule: 30 9 * * *
Deliver: telegram
Enabled: true
Model/provider/base_url: null / null / null
Next run: 2026-06-06T09:30:00+02:00
```

```text
CODEX_HANDOFF_SCOUT_DAILY
Schedule: 30 10 * * *
Deliver: telegram
Enabled: true
Model/provider/base_url: null / null / null
Next run: 2026-06-06T10:30:00+02:00
```

```text
AI_STOCK_RADAR_DAILY
Schedule: 35 9 * * 1-5
Deliver: telegram
Enabled: true
Model/provider/base_url: null / null / null
Next run: 2026-06-08T09:35:00+02:00
```

```text
HERMES_CONTROL_DAILY
Schedule: 15 10 * * *
Deliver: telegram
Enabled: true
Model/provider/base_url: null / null / null
Next run: 2026-06-06T10:15:00+02:00
```

## Prompt Rules Confirmed

`BUSINESS_IDEA_FIREWORK_DAILY` now contains:

- `Follow-Up Classification`
- `CODEX_HANDOFF_READY`
- `HUMAN_TEST_ONLY`
- `REVIEW_ONLY`
- `IDEA_ONLY`
- `Mini execute prompt`
- `Safe for Codex`

`CODEX_HANDOFF_SCOUT_DAILY` now contains:

- `Business Idea winner routing`
- `/Users/zondrius/hermes-workspace/reports/business-ideas/`
- `Type: CODEX_HANDOFF_READY`
- `fewer than 3 open inbox handoffs`
- `no similar open handoff`

`AI_STOCK_RADAR_DAILY` now contains:

- `Neu Gegenueber Gestern`
- `New candidate`
- `Upgraded`
- `Downgraded`
- `Same blocker`
- `free_price_data_unavailable`
- `No trading action is ever SOFORT_MACHEN`

`HERMES_CONTROL_DAILY` now contains:

- `CEO One Move`
- `If Chris has only 20 minutes today`
- `prefer concrete Green education/product/material action`
- `never choose trades`
- `exactly one action`

## Validation Checks

Passed:

- live cron JSON parses;
- backup cron JSON parses;
- exactly one target job of each name exists;
- no duplicate IDs detected;
- all four target jobs remain enabled;
- schedules unchanged;
- delivery channels unchanged;
- `model`, `provider` and `base_url` remain `null`;
- non-prompt fields unchanged for all four target jobs;
- prompt keyword validation passed.

## Files Intentionally Changed

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/VALIDATION.md`

## Files Intentionally Not Touched

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/`
- `/Users/zondrius/hermes-workspace/projects/night-lab/`
- Nayyal files
- handoff inbox/outbox files
- stock data files
- source app files

## Expected Behavior

From the next run:

- Business Ideas must classify the winner as `CODEX_HANDOFF_READY`, `HUMAN_TEST_ONLY`, `REVIEW_ONLY` or `IDEA_ONLY`.
- Handoff Scout may route a safe Business winner into exactly one Codex handoff if all gates pass.
- Stock Radar must state what is new versus yesterday and must not treat repeated blockers as new insight.
- Hermes Control must include one `CEO One Move` for Chris' day.

## CEO Decision

Hermes now has a sharper signal-to-action loop without adding a new cronjob, changing schedules, using GPT-5.5, enabling paid providers, enabling trades or touching active app projects.
