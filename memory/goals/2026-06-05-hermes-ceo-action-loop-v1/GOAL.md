# Goal: Hermes CEO Action Loop v1

Status: executed-active
Date: 2026-06-05
Owner: Chris / Hermes CEO / Neva / Codex

Status note 2026-06-08:
The core CEO action loop is active in the live Hermes cron prompts: Business Idea Firework now classifies follow-up readiness, Codex Handoff Scout can route safe local winners, AI Stock Radar has a delta section, and Hermes Control produces one CEO move. On 2026-06-08 the stock side was sharpened further with No-Progress Compression Mode.

## Objective

Turn strong Hermes daily signals into one sharper next action without creating noise, duplicate jobs, unsafe automation or token waste.

This is a CEO-layer fix for the current Hermes job system. The goal is not to add more output. The goal is to make existing outputs more decisive.

## CEO Diagnosis

Hermes is producing useful signals, but some of them still stop too early:

- `BUSINESS_IDEA_FIREWORK_DAILY` finds good small ideas, but the winner can remain only a report line.
- `AI_STOCK_RADAR_DAILY` correctly stays Yellow, but repeats the same blocker and candidates without always saying what changed since yesterday.
- `HERMES_CONTROL_DAILY` collects many signals, but should more aggressively compress the day into one CEO move.
- `CODEX_HANDOFF_SCOUT_DAILY` can create handoffs, but does not yet explicitly treat business-idea winners as candidates when they are small, local and safe.

The 2026-06-05 example:

- Business winner: `Fuenferfeld-Kurzkarte fuer neue Erwachsene`.
- Safe next action: reduce an existing Fuenferfeld station to one clear 1-page adult quick card.
- Stock radar: useful Yellow research, but no action because price/volume confirmation is unavailable.

CEO judgment:

```text
Today, the value is in execution of the small school/product slice, not in more stock analysis or broader ideation.
```

## Target Outcome

After this goal is executed, Hermes should:

- classify every Business Idea winner by follow-up type;
- create a copyable mini-execute prompt for small Green winners;
- allow `CODEX_HANDOFF_SCOUT_DAILY` to route such winners into exactly one Codex handoff when safe;
- force Stock Radar to say what is new versus the previous run;
- stop repeating unchanged stock blockers as if they are new insight;
- make Hermes Control choose one CEO action for the day;
- keep all risky, financial, external, publishing, account, paid-provider and student-sensitive actions out of automation.

## Fix Scope

### Fix 1: Business Winner Follow-Up Class

Add a required section to `BUSINESS_IDEA_FIREWORK_DAILY`:

```text
## Follow-Up Classification
- Type: CODEX_HANDOFF_READY / HUMAN_TEST_ONLY / REVIEW_ONLY / IDEA_ONLY
- Why:
- Safe for Codex: yes/no
- Mini execute prompt:
- Handoff risk:
```

Rules:

- `CODEX_HANDOFF_READY` only when the action is local, one-file or one-report sized, non-sensitive, no external send, no publish, no purchase, no install, no commit/push, no real student data.
- `HUMAN_TEST_ONLY` when the task must happen in class, with another person, or in the real world.
- `REVIEW_ONLY` when the idea needs human judgment before work.
- `IDEA_ONLY` when it is interesting but not actionable now.

### Fix 2: Handoff Scout Reads Business Winners

Update `CODEX_HANDOFF_SCOUT_DAILY` so it also reads:

- `/Users/zondrius/hermes-workspace/reports/business-ideas/`

It may create one handoff for a Business Idea winner only if:

- latest report says `Type: CODEX_HANDOFF_READY`;
- `SOFORT_MACHEN` is one concrete local artifact;
- no similar open handoff exists;
- there are fewer than 3 open inbox handoffs;
- the task does not require Chris approval first.

Example candidate:

```text
Fuenferfeld-Kurzkarte fuer neue Erwachsene
```

Expected handoff type:

```text
Create a 1-page markdown quick card from existing Fuenferfeld material.
```

### Fix 3: Stock Radar Delta Section

Add a required section to `AI_STOCK_RADAR_DAILY`:

```text
## Neu Gegenueber Gestern
- New candidate:
- Upgraded:
- Downgraded:
- Same blocker:
- Removed / archived:
- CEO interpretation:
```

Rules:

- If GMEX, NBIS or DUKR are unchanged, say `unchanged`.
- If `free_price_data_unavailable` is still the blocker, say it once and do not inflate the report.
- No stock may be promoted from watch to deep dive without new evidence.
- No trading action is ever `SOFORT_MACHEN`.

### Fix 4: Hermes Control CEO One Move

Add a required section to `HERMES_CONTROL_DAILY`:

```text
## CEO One Move
If Chris has only 20 minutes today:
- Do:
- Why:
- Source:
- Do not:
```

Rules:

- exactly one action;
- prefer concrete Green education/product/material action over Yellow research repetition;
- never choose trades, paid provider setup, external publishing, broad app builds, installs, commits, pushes or sensitive-data work as the one move;
- if no action is genuinely useful, say `nichts`.

## Files

Planned files to create:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/JOB_PROMPT_PATCHES.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/VALIDATION.md`

Live file to modify only during execution:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Required backup during execution:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260605-before-hermes-ceo-action-loop-v1`

Reference reports:

- `/Users/zondrius/hermes-workspace/reports/business-ideas/business-idea-firework-2026-06-05.md`
- `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-05.md`
- latest `/Users/zondrius/hermes-workspace/reports/hermes-control/`
- latest `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/`

## Out of Scope

- No new cronjob.
- No schedule change.
- No model upgrade.
- No GPT-5.5.
- No paid provider setup.
- No stock trading, broker access, paper-to-real escalation or buy/sell/hold wording.
- No external sends, publishing, accounts or purchases.
- No automatic commit or push.
- No edits to GE apps, LeseWerk, Nayyal or source application code.
- No automatic archival/deletion of handoffs.
- No student, parent, diagnosis, health, photo or private school data.

## Acceptance

This goal is complete when:

- exactly four target cron prompts are updated: Business Idea Firework, AI Stock Radar, Hermes Control and Codex Handoff Scout;
- no non-prompt fields change;
- schedules remain unchanged;
- delivery channels remain unchanged;
- model/provider/base_url remain `null`;
- JSON parses successfully;
- a backup exists;
- Business reports are forced to include follow-up classification;
- Stock reports are forced to include a yesterday-delta section;
- Control reports are forced to include CEO One Move;
- Handoff Scout is allowed to route safe Business winners, but only under strict queue and safety gates;
- no unrelated files are modified.

## CEO Priority

If only one fix can be implemented, prioritize:

```text
Business winner -> Follow-Up Classification -> Handoff Scout eligibility
```

Reason:

This is the shortest route from useful Hermes signal to concrete progress.
