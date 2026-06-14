# Goal: Hermes Night App Studio v1

Owner: Chris / Neva / Codex
Status: activated via cron on 2026-06-03
Date: 2026-06-02

## Objective

Create a safe overnight app-studio workflow for Hermes.

Hermes should prepare one useful app chance overnight and, only when the score is strong, build one tiny isolated local prototype. Chris receives a concise Telegram briefing at 08:00.

## Why

Chris wants Hermes to become more creative and productive overnight, but without wasting tokens or filling the workspace with random half-built apps.

Night App Studio v1 therefore uses a strict score gate and a sandbox:

- idea generation is cheap;
- code is built only when justified;
- no existing app is touched;
- no deploy, commit, push, external service or real student data is allowed;
- morning output is decision-ready.

## First Direction

Start with:

```text
Lehrer-Morgenkarte GE
```

Reason:

- directly useful for school;
- fits existing Teacher Nextday and Lernwerkstatt context;
- can be tested tomorrow;
- small enough for a local prototype;
- low risk when no student data is used.

## Scope

Allowed:

- design job prompts;
- create local reports;
- create isolated night-lab prototype folders after approval/manual pilot;
- produce Telegram briefing format;
- use existing Hermes roles and Codex routing.

Not allowed in v1 before approval:

- no cron install before prompt review; approved by Chris and activated on 2026-06-03;
- no changes to active apps or `src/**`;
- no `.hermes` config change;
- no external APIs;
- no deploy;
- no commit/push;
- no real student, parent, diagnostic or private data;
- no GPT-5.5 without explicit approval.

## Target Files

- `/Users/zondrius/hermes-workspace/docs/superpowers/specs/2026-06-02-hermes-night-app-studio-v1-design.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-02-hermes-night-app-studio-v1/JOB_PROMPT_DRAFT.md`
- `/Users/zondrius/hermes-workspace/reports/night-app-studio/`
- `/Users/zondrius/hermes-workspace/projects/night-lab/`

## Acceptance

- There is a clear design and execute plan.
- There is a job prompt draft for build and 08:00 briefing.
- Cron activation is documented in `/Users/zondrius/hermes-workspace/memory/goals/2026-06-03-hermes-night-app-studio-cron-activation-v1/`.
- The first manual pilot can be run without changing existing apps.
- Chris can approve, tighten or reject before automation.
