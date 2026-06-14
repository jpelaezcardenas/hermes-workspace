# Hermes Business Idea Firework Daily v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a high-control daily business-idea scout design for Hermes that can later run at 09:30 and send Chris five creative but source-anchored idea directions by Telegram.

**Architecture:** This v1 creates local goal and prompt artifacts, then installs the approved Hermes cron job after Chris' explicit approval. The live job uses existing Hermes Telegram delivery and does not add code, scripts, UI, external services or provider setup.

**Tech Stack:** Markdown goal files, Hermes Workspace reports, Hermes cron conventions, Telegram delivery through existing Hermes job delivery.

---

## Scope Decision

This plan creates the execute-goal package and installs `BUSINESS_IDEA_FIREWORK_DAILY` after prompt approval.

The review gate was deliberate: this job will message Chris every day. Chris approved the prompt with "ok go on perfekt"; installation then proceeded with a backup.

## File Map

Create:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/GOAL.md`
  - Purpose, scope, daily output and /goal prompt.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/QUALITY_SYSTEM.md`
  - Parameters, source tiers, creative lenses, Chris-fit filter, scoring, anti-duplicate logic and learning loops.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/JOB_PROMPT_DRAFT.md`
  - Copyable Hermes cron prompt, schedule target and install boundary.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/EXECUTE_PLAN.md`
  - This implementation plan.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/VALIDATION.md`
  - Verification evidence and completion checklist.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/INSTALLATION.md`
  - Live install record, backup, verification and rollback hint.

Do not modify in this v1 except for the approved cron install:

- `/Users/zondrius/hermes-workspace/scripts/**`
- `/Users/zondrius/hermes-workspace/src/**`
- `/Users/zondrius/hermes-workspace/handoff/**`

## Task 1: Capture Existing Schedule Context

- [x] **Step 1: Inspect current Hermes job times**

Observed:

```text
09:30 is free.
AI_STOCK_RADAR_DAILY runs at 09:35 weekdays.
INSTITUTIONAL_SELL_PRESSURE_DAILY runs at 09:50 weekdays.
STOCK_RISK_COMMANDER_DAILY runs at 10:00 weekdays.
HERMES_CONTROL_DAILY runs at 10:15 daily.
```

Decision:

```text
09:30 is acceptable for the idea scout. Stock sources may be trend/risk context only and cannot drive trading actions.
```

## Task 2: Write Goal Package

- [x] **Step 1: Create goal directory**

Create:

```text
/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/
```

- [x] **Step 2: Write `GOAL.md`**

It must include:

```text
09:30 target, five directions, Telegram format, in-scope, out-of-scope, output path, and /goal prompt.
```

- [x] **Step 3: Write `QUALITY_SYSTEM.md`**

It must include:

```text
Parameter set, source tiers, world-class business lenses, Chris-fit filter, scoring model, anti-duplicate filter, daily/weekly/monthly loops, kill criteria and S-tier quality bar.
```

- [x] **Step 4: Write `JOB_PROMPT_DRAFT.md`**

It must include:

```text
Full Hermes cron prompt, source list, exact five idea directions, scoring fields, Telegram summary format, Decision Inbox and install boundary.
```

## Task 3: Verify Goal Package Before Install

- [x] **Step 1: Verify files exist**

Run:

```text
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/GOAL.md
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/QUALITY_SYSTEM.md
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/JOB_PROMPT_DRAFT.md
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/EXECUTE_PLAN.md
```

Expected: every command exits 0.

- [x] **Step 2: Verify key requirements**

Run:

```text
rg -n "09:30|IDEAS_PER_DAY: 5|WINNERS_PER_DAY: 1|SOFORT_MACHEN_MAX: 1|Schule -> Produkt|AI / Workflow|Community / VDS|Mini-Service|Wildcard|Anti-Duplicate|Daily Loop|Weekly Loop|Monthly Loop" /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1
```

Expected: all central requirements are present.

- [x] **Step 3: Verify safety boundaries**

Run:

```text
rg -n "Keine Trades|No trades|No investment advice|Keine echten Schueler|No real student|No external sends|Keine Shop|No new shop" /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1
```

Expected: no-trade, no-student-data, no-external-send and no-live-install boundaries are present.

- [x] **Step 4: Verify no cron install happened before approval**

Run:

```text
rg -n "BUSINESS_IDEA_FIREWORK_DAILY" /Users/zondrius/.hermes/profiles/neva/cron/jobs.json
```

Expected:

```text
No match.
```

## Task 4: Install Approved Hermes Cron Job

- [x] **Step 1: Create backup before modifying jobs.json**

Backup:

```text
/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260601-2140-before-business-idea-firework
```

- [x] **Step 2: Add Hermes job**

Installed:

```text
name: BUSINESS_IDEA_FIREWORK_DAILY
schedule: 30 9 * * *
deliver: telegram
workdir: /Users/zondrius/hermes-workspace
```

- [x] **Step 3: Verify with Hermes cron list**

Observed:

```text
a2b7ea142ade [active]
Name:      BUSINESS_IDEA_FIREWORK_DAILY
Schedule:  30 9 * * *
Next run:  2026-06-02T09:30:00+02:00
Deliver:   telegram
Skills:    hermes-agent-operating-system, hermes-decision-inbox
Workdir:   /Users/zondrius/hermes-workspace
```

- [x] **Step 4: Record installation**

Installation record:

```text
/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-business-idea-firework-daily-v1/INSTALLATION.md
```
