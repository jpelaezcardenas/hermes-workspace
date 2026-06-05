# Execute Plan: Hermes CEO Action Loop v1

## 1. Inspect Current Cron State

Read:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Confirm exactly one of each target job:

- `BUSINESS_IDEA_FIREWORK_DAILY`
- `AI_STOCK_RADAR_DAILY`
- `HERMES_CONTROL_DAILY`
- `CODEX_HANDOFF_SCOUT_DAILY`

Confirm for each:

- enabled is `true`;
- schedule unchanged from current live state;
- delivery unchanged from current live state;
- `model`, `provider`, `base_url` are `null`;
- last status is not a repeated failure.

If duplicates exist, stop before editing.

## 2. Inspect Evidence

Read:

- `/Users/zondrius/hermes-workspace/reports/business-ideas/business-idea-firework-2026-06-05.md`
- `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-05.md`
- latest report in `/Users/zondrius/hermes-workspace/reports/hermes-control/`
- latest report in `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`

CEO decision:

- Keep all four jobs.
- Do not add a new job.
- Tighten routing and reporting only.

## 3. Backup Cron Config

Create:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260605-before-hermes-ceo-action-loop-v1`

Verify:

- backup exists;
- backup parses as JSON.

## 4. Patch Business Idea Prompt

Modify only the `prompt` field of `BUSINESS_IDEA_FIREWORK_DAILY`.

Append the Business patch from:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`

Required live prompt phrases:

- `Follow-Up Classification`
- `CODEX_HANDOFF_READY`
- `HUMAN_TEST_ONLY`
- `REVIEW_ONLY`
- `IDEA_ONLY`
- `Mini execute prompt`
- `Safe for Codex`

Do not change schedule, delivery, model/provider/base_url, ID, workdir or enabled state.

## 5. Patch Handoff Scout Prompt

Modify only the `prompt` field of `CODEX_HANDOFF_SCOUT_DAILY`.

Append the Handoff Scout patch from:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`

Required live prompt phrases:

- `Business Idea winner routing`
- `/Users/zondrius/hermes-workspace/reports/business-ideas/`
- `Type: CODEX_HANDOFF_READY`
- `fewer than 3 open inbox handoffs`
- `no similar open handoff`

Do not change non-prompt fields.

## 6. Patch Stock Radar Prompt

Modify only the `prompt` field of `AI_STOCK_RADAR_DAILY`.

Append the Stock patch from:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`

Required live prompt phrases:

- `Neu Gegenueber Gestern`
- `New candidate`
- `Upgraded`
- `Downgraded`
- `Same blocker`
- `free_price_data_unavailable`
- `No trading action is ever SOFORT_MACHEN`

Do not change non-prompt fields.

## 7. Patch Hermes Control Prompt

Modify only the `prompt` field of `HERMES_CONTROL_DAILY`.

Append the Control patch from:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`

Required live prompt phrases:

- `CEO One Move`
- `If Chris has only 20 minutes today`
- `prefer concrete Green education/product/material action`
- `never choose trades`
- `exactly one action`

Do not change non-prompt fields.

## 8. Validate Live Cron JSON

Parse:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Expected:

- valid JSON;
- exactly one of each target job;
- no duplicate IDs;
- schedules unchanged;
- delivery unchanged;
- model/provider/base_url unchanged as `null`;
- all target prompt keyword checks pass.

If validation fails:

- restore from backup immediately;
- report the failure.

## 9. Write Validation Report

Write:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/VALIDATION.md`

Include:

- backup path;
- exact jobs patched;
- schedule/delivery/model verification;
- prompt keyword verification;
- files intentionally changed;
- files intentionally not touched;
- next expected runs.

## 10. Report Back

Explain in simple German:

- Hermes now has a clearer CEO action loop;
- Business winners can become safe Codex handoff candidates;
- Stock reports must say what changed since yesterday;
- Control must choose one daily CEO move;
- no new job, no 5.5, no paid providers, no trading, no external actions.

## 11. Commit and Push Only If Asked

Do not commit or push unless Chris asks after validation.

If asked:

- stage only this goal folder and any intended tracked repo files;
- do not stage unrelated dirty workspace files;
- note that `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json` is outside the git repo and cannot be included in the normal Hermes Workspace commit unless separately versioned.
