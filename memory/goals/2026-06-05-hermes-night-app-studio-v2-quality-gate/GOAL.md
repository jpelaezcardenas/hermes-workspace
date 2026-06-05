# Goal: Hermes Night App Studio v2 Quality Gate

Status: planned
Date: 2026-06-05
Owner: Chris / Neva / Codex

## Objective

Upgrade `NIGHT_APP_STUDIO_BUILD_DAILY` and `NIGHT_APP_STUDIO_BRIEFING_DAILY` from a safe but too-brave prototype generator into a stricter overnight product loop that builds fewer, better, visibly checked app slices.

## Why

The first two real Night App Studio runs produced usable local prototypes, but the results do not yet feel strong enough.

Observed issues:

- 2026-06-04 and 2026-06-05 both selected the same app family: `Lehrer-Morgenkarte GE`.
- Both reports were `Green` even though no screenshot or visual check was confirmed.
- Scores of 9/10 and 10/10 were too generous for unproven pilots.
- The job currently rewards safety and smallness more than actual morning usefulness.
- The morning briefing reports the result, but does not sharply decide whether the app is worth keeping, improving or discarding.

The v2 goal is not more output. The goal is better taste, stronger proof and less token waste.

## Target Outcome

After v2, Night App Studio should:

- avoid repeating the same app family unless there is real feedback or a clear V2 improvement task;
- build only when a candidate has a distinct use case and a strong reason to exist;
- cap scores when proof is missing;
- require a visible proof check for built prototypes whenever feasible;
- distinguish `new build`, `improve yesterday`, `review/archive`, and `stop` modes;
- send a morning briefing that is decision-ready in plain German;
- keep all output isolated to `projects/night-lab` and `reports/night-app-studio`;
- never touch existing production apps, Nayyal, Hermes config beyond the approved cron prompt update, handoff files or active project work.

## Quality Rules

### Repeat Brake

The build job must read the latest 3 Night App Studio reports before selecting a winner.

It must not choose the same app family again unless one of these is true:

- Chris gave explicit feedback that asks for this family;
- yesterday's app has a concrete V2 improvement target;
- the new idea is not a clone but a clearly different workflow with a new user action.

If the same family would otherwise win again, the job must switch to `IMPROVE_LAST`, `REVIEW_ONLY` or `STOP`.

### Proof Gate

A built prototype may receive at most:

- `7/10` if no screenshot or visual check is present;
- `7/10` if the output is only a form or text generator with no stronger app feeling;
- `6/10` if the app does not demonstrate a complete 60-second user flow;
- `5/10` if it duplicates an existing idea without a clear improvement.

The report must say plainly which cap was applied.

### Better Score Model

Use this 10-point score:

- real tomorrow usefulness: 0-2;
- distinctness from recent outputs: 0-2;
- 60-second clarity: 0-2;
- visible prototype proof: 0-2;
- product learning potential: 0-2.

Risk and cost are hard gates, not score boosters. A safe idea is allowed; safety alone does not make it excellent.

### Build Modes

Each night must choose exactly one mode:

- `BUILD_NEW`: build one new tiny prototype;
- `IMPROVE_LAST`: improve yesterday's prototype in a new dated folder only;
- `REVIEW_ONLY`: write a critical review and no code;
- `STOP`: no build because the candidate quality is too weak.

`BUILD_NEW` and `IMPROVE_LAST` may only happen when the proof and repeat gates allow it.

## Preferred Next App Directions

For the next real v2 cycle, prefer one of these over another plain `Lehrer-Morgenkarte GE` clone:

1. `Hermes Morning Cockpit Slice`
   - Shows what Hermes produced overnight.
   - Gives Chris one morning decision: keep, improve, discard.
   - Later could connect to Nayyal/Hermes presentation, but not in this goal.

2. `GE-Spielraum-Slice`
   - Child-facing mini interaction rather than teacher form.
   - Must feel like a tiny learning room, not a worksheet generator.

3. `Materialkorb-Kartenmacher`
   - Turns one teaching idea into clean printable cards.
   - Stronger practical value than another text suggestion.

4. `Vertretungsstunden-Assistent`
   - Creates one 15-minute low-prep structure.
   - No names, no diagnoses, no cloud, no accounts.

## Files

Planned files to create:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/JOB_PROMPT_DRAFT.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/VALIDATION.md`

Planned live file to modify only during execution:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

Required backup during execution:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260605-before-night-app-studio-v2-quality-gate`

Reference files:

- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-04.md`
- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-05.md`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-04-lehrer-morgenkarte-ge/index.html`
- `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-05-lehrer-morgenkarte-ge/index.html`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-03-hermes-night-app-studio-cron-activation-v1/`

## Model and Cost Rules

- Keep `model`, `provider` and `base_url` as `null` in the cron job unless Chris explicitly asks otherwise.
- Do not use GPT-5.5.
- Do not request expensive escalation.
- Do not install packages.
- Do not start long retry loops.
- Build at most one prototype or one improvement per night.
- Prefer local files and existing Hermes context.

## Conflict Rules

This goal must not:

- create duplicate `NIGHT_APP_STUDIO_*` jobs;
- alter schedules unless explicitly required;
- touch Nayyal, `src/**`, `projects/ge-lernwerkstatt`, `projects/lesewerk-v1`, handoff files, or active Hermes config outside the approved cron prompt update;
- overwrite existing night-lab prototypes;
- edit any file produced by another active task unless that file is the approved cron config and a backup exists first;
- commit or push unless Chris asks after validation.

## Out of Scope

- No new app platform.
- No public deployment.
- No Nayyal integration in this v2 change.
- No Telegram transport rewrite.
- No database.
- No accounts.
- No sensitive student, parent, diagnosis, health, finance-private or family data.
- No automatic deletion of previous prototypes.

## Acceptance

The goal is complete when:

- the live cron file has exactly one `NIGHT_APP_STUDIO_BUILD_DAILY` and one `NIGHT_APP_STUDIO_BRIEFING_DAILY`;
- both prompts contain the v2 quality rules;
- schedules remain `30 1 * * *` and `0 8 * * *`;
- delivery remains `local` for build and `telegram` for briefing;
- model/provider/base_url remain `null`;
- JSON parses successfully;
- a backup exists;
- the next Night App Studio report is forced to include mode, repeat check, score caps, proof status and one clear morning decision;
- no unrelated project files are changed.
