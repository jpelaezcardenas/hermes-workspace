# Goal: Hermes Night App Studio Cron Activation v1

Status: executed
Date: 2026-06-03
Owner: Chris / Neva / Codex

## Objective

Activate Hermes Night App Studio v1 as a real Hermes cron workflow without creating noise, uncontrolled token use or unsafe file changes.

## Decision

Chris approved moving from draft to activation on 2026-06-03.

Night App Studio now uses two active jobs:

1. `NIGHT_APP_STUDIO_BUILD_DAILY`
   - time: 01:30 Europe/Berlin;
   - delivery: local;
   - writes one night report;
   - may create one isolated prototype only if score is at least 8/10.

2. `NIGHT_APP_STUDIO_BRIEFING_DAILY`
   - time: 08:00 Europe/Berlin;
   - delivery: telegram;
   - reads the newest night report;
   - sends a concise morning briefing.

## First Real Cycle

The first clean cycle starts on 2026-06-04:

- Build: 2026-06-04 01:30 CEST
- Telegram briefing: 2026-06-04 08:00 CEST

Reason:
Installing the 08:00 briefing on 2026-06-03 before any overnight build would create a noisy empty briefing. Therefore the first briefing was intentionally scheduled after the first real build.

## Safety Rules

- No real student, parent, diagnosis, health, finance-private or family data.
- No external APIs, accounts, scraping, browser logins or cloud services.
- No deploy, commit, push or publishing.
- No installs or package manager changes.
- No edits to existing apps, `src/**`, handoff files, active Hermes config or cron files from inside the job.
- No GPT-5.5, no model switching, no expensive escalation.
- Build only in `/Users/zondrius/hermes-workspace/projects/night-lab/`.
- Reports only in `/Users/zondrius/hermes-workspace/reports/night-app-studio/`.

## Acceptance

- Jobs are installed exactly once.
- Hermes JSON is valid.
- Hermes Gateway sees 21 active jobs.
- Build job is local/still.
- Briefing job sends Telegram.
- Model/provider overrides stay null.
- Backup exists.
- Old draft docs point to this activation.
