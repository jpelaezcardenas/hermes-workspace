# Hermes Night App Studio v1 Design

Date: 2026-06-02
Status: design approved in principle, cron not installed
Owner: Chris / Neva / Codex

## Purpose

Hermes should create useful new app chances overnight without wasting tokens or cluttering the workspace.

The v1 target is a middle path:

- generate and score ideas cheaply;
- build code only when one idea is strong enough;
- build at most one isolated local prototype per night;
- send Chris a concise Telegram briefing at 08:00;
- never touch existing apps, private data, deploys, commits or external accounts in the night run.

## Product Shape

Night App Studio has two phases.

1. Night Build Phase
   - Proposed time: 01:30 Europe/Berlin.
   - Creates up to 5 app candidates from existing Hermes sources.
   - Scores them.
   - If no candidate passes, writes a concept-only report.
   - If one candidate passes, builds one tiny local prototype.

2. Morning Briefing Phase
   - Proposed time: 08:00 Europe/Berlin.
   - Reads the night report.
   - Sends a short Telegram message.
   - Does not build further.

## Allowed App Direction v1

Start with school and learning-workshop apps because they are concrete, testable and already fit Chris' local context.

First pilot direction:

```text
Lehrer-Morgenkarte GE
```

Expected first prototype:

- one local app screen;
- choices for area, time, level and material;
- output with 3 practical mini activities;
- no student names, no diagnoses, no data export;
- local-only HTML/app prototype.

Other allowed candidate families:

- Stationenkarten-Mixer;
- Materialkorb-Builder;
- Lernbeobachtungs-Kompass without names;
- Lese-/Lautgebaerden mini helper;
- VDS-GE source or argument card helper.

## Score Gate

An idea may be built only if it passes all hard gates and reaches at least 8/10.

Hard gates:

- no sensitive student, parent, diagnostic, health or private data;
- no external APIs, tokens, accounts, scraping or publishing;
- no install unless it is already part of the local project and explicitly safe;
- no edits to existing project apps;
- no commit, push or deploy;
- no GPT-5.5 unless Chris explicitly approves;
- scope fits one tiny prototype.

Score fields:

- tomorrow usefulness: 0-2;
- build simplicity: 0-2;
- Chris fit: 0-2;
- learning/product potential: 0-2;
- risk/cost cleanliness: 0-2.

Decision:

- 8-10: build one tiny prototype;
- 6-7: concept-only report;
- 0-5: stop and report why.

## Output Contract

Every night creates exactly one report:

`/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-YYYY-MM-DD.md`

If code is built, it goes only here:

`/Users/zondrius/hermes-workspace/projects/night-lab/YYYY-MM-DD-<slug>/`

Expected files for a built prototype:

- `index.html` or minimal local app files;
- optional screenshot if safe and easy;
- `README.md` with purpose and test steps;
- night report with verdict.

Morning Telegram must include:

- status: `GEBAUT`, `NUR KONZEPT` or `GESTOPPT`;
- app name;
- why this was selected;
- where files are;
- score;
- what Chris should do next: keep, improve, throw away or review.

## Model and Cost Rules

Default:

- ideas / scoring: `gpt-5.4-mini`;
- build: `coder` / `gpt-5.4`;
- review / GE fit: `schule` if needed;
- risk/memory: `memory` as gatekeeper.

Reserved:

- GPT-5.5 only with explicit Chris approval for a valuable build or hard triage.

Budget:

- one candidate set;
- one winner max;
- one build attempt max;
- no long retry loops;
- stop before 06:30.

## Safety Rules

Night App Studio must not:

- modify `projects/ge-lernwerkstatt`, `projects/lesewerk-v1`, `src/**` or active Hermes config;
- create or archive Codex handoffs automatically;
- install tools;
- use real student examples;
- send anything except the 08:00 summary;
- make product, finance or legal claims as final truth.

## Success Criteria

v1 is useful if after three mornings:

- at least one prototype is worth keeping or improving;
- Telegram summaries are short and decision-ready;
- no workspace clutter outside `projects/night-lab` and `reports/night-app-studio`;
- token/cost behavior feels acceptable;
- Chris can say keep / improve / throw away in under 2 minutes.

## First Implementation Recommendation

Do not install the cron immediately.

Next step:

1. Create execute-goal package and job prompt draft.
2. Run one manual pilot for `Lehrer-Morgenkarte GE`.
3. If the morning output is useful, install the two-job cron:
   - build at 01:30;
   - Telegram briefing at 08:00.

