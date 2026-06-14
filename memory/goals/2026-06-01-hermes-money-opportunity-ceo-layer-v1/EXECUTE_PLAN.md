# Hermes Money & Opportunity CEO Layer v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a source-backed CEO report that combines Chris' money, Boersen-Research, business ideas, and school-to-product signals into one weekly decision layer.

**Architecture:** This is a local markdown-first layer. It reads existing Hermes reports, synthesizes them into one report, and does not introduce a new engine, cronjob, API, UI, agent, integration, or provider.

**Tech Stack:** Markdown files, existing Hermes Workspace reports, existing Decision Inbox convention.

---

## Scope Decision

This plan implements the first manual v1 run only. If two manual reports prove useful, a later goal can decide whether to automate or integrate the layer into Hermes Control.

## File Map

Create:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/GOAL.md`
  - Defines the CEO-layer purpose, scope, sources, output, gates and success criteria.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/EXECUTE_PLAN.md`
  - Gives the exact manual execution process for this v1 run.

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/CEO_MONITORING.md`
  - Holds CEO gates and post-report review questions.

- `/Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md`
  - The first CEO synthesis report.

Do not modify:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/hermes-workspace/scripts/**`
- `/Users/zondrius/hermes-workspace/src/**`
- `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/**`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/**`
- `/Users/zondrius/hermes-workspace/handoff/**`

## Task 1: Confirm Source Set

- [x] **Step 1: Confirm there is no existing Money & Opportunity goal**

Run a file search for money/opportunity/business goal folders and reports.

Expected result:

```text
No existing money-opportunity CEO goal or report is found.
```

- [x] **Step 2: Read stock research sources**

Read:

```text
/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-01.md
/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-ceo-audit-2026-06-01.md
/Users/zondrius/hermes-workspace/reports/stock-risk-commander/stock-risk-commander-2026-06-01.md
/Users/zondrius/hermes-workspace/reports/institutional-sell-radar/institutional-sell-radar-2026-06-01.md
```

Expected source facts:

```text
Stock content is research-only.
AI Stock Radar is Yellow because price/volume confirmation is unavailable.
Stock Risk Commander has 0 Research Attention and 20 Risk Review candidates.
Institutional Sell Pressure has no WARNING or CRITICAL_REVIEW signals.
CEO Audit status is pass.
```

- [x] **Step 3: Read school/product/execution sources**

Read:

```text
/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md
/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-classroom-ready-pilotpaket-v1-2026-06-01.md
/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-classroom-ready-pilotpaket-ceo-decision-2026-06-01.md
/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-layer-2026-06-01.md
/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-01.md
```

Expected source facts:

```text
Productklarheit v1 has strong GE/product evidence and lists Material-Korb, Observation-Bridge and related product slices.
Classroom-Ready Pilotpaket chooses Fuenferfeld legen and is marked einsetzen.
Execution Layer chooses Fuenferfeld-Tisch-Smoke as the next smallest slice.
Hermes Control warns against new big missions, new cronjobs and installs.
```

## Task 2: Create Goal Files

- [x] **Step 1: Create goal directory**

Create:

```text
/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/
```

- [x] **Step 2: Write `GOAL.md`**

Include:

```text
Purpose, source list, in-scope, out-of-scope, output path, report format, CEO scoring, success criteria, abort criteria, and copyable /goal prompt.
```

- [x] **Step 3: Write `EXECUTE_PLAN.md`**

Include:

```text
File map, exact source set, manual v1 tasks, verification commands, and no-modify boundaries.
```

- [x] **Step 4: Write `CEO_MONITORING.md`**

Include:

```text
Gate 1 Scope, Gate 2 Money Safety, Gate 3 Research Boundary, Gate 4 School Data Safety, Gate 5 Decision Quality, and post-report review questions.
```

## Task 3: Create First CEO Report

- [x] **Step 1: Write report header and CEO summary**

File:

```text
/Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md
```

Required summary:

```text
Best next money/opportunity move is not a trade. It is a small school-to-product 7-day test built from existing GE evidence.
```

- [x] **Step 2: Write Money Signals**

Use only source-backed signals:

```text
No personal finance dataset was inspected.
Real-money actions stay in CHRIS_ENTSCHEIDET.
The practical money signal is to test product potential with no spend.
```

- [x] **Step 3: Write Stock / Boersen Risk Review**

Use:

```text
AI Stock Radar: Yellow, research-only, free_price_data_unavailable.
Stock Risk Commander: 0 Research Attention, 20 Risk Review.
Institutional Sell Pressure: no WARNING or CRITICAL_REVIEW.
CEO Audit: pass.
```

- [x] **Step 4: Write Business Ideas Ranking**

Rank at most three:

```text
1. GE-Materialkorb / Fuenferfeld Pilotpaket
2. Observation-Bridge copy-paste helper
3. Alpha-73A LeseWerk Material cards
```

- [x] **Step 5: Write Schule-zu-Produkt Pipeline**

Connect:

```text
Productklarheit v1 -> Classroom-Ready Pilotpaket -> 7-day school-to-product smoke -> later product decision.
```

- [x] **Step 6: Write exactly one 7-day test**

Use:

```text
Create a one-page GE-Minikiste Fuenferfeld test card from the existing pilotpaket and use it once, then decide whether it is a material product candidate.
```

- [x] **Step 7: Write Decision Inbox**

Enforce:

```text
SOFORT_MACHEN has at most one safe action.
CHRIS_ENTSCHEIDET contains money/publishing/tool/provider decisions.
NICHT_TUN blocks trades, provider setup, new cronjobs, overbuilding and student data.
```

## Task 4: Verify Artifacts

- [x] **Step 1: Verify required files exist**

Run:

```text
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/GOAL.md
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/EXECUTE_PLAN.md
test -f /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/CEO_MONITORING.md
test -f /Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md
```

Expected: every command exits 0.

- [x] **Step 2: Verify report sections**

Run:

```text
rg -n "## CEO Kurzfazit|## Money Signals|## Stock / Boersen Risk Review|## Business Ideas Ranking|## Schule-zu-Produkt Pipeline|## Top 3 Opportunities|## 7-Tage-Test|## Nicht Tun|## Quellen / Belege|## Decision Inbox" /Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md
```

Expected: all ten required section headings appear.

- [x] **Step 3: Verify safety gates**

Run:

```text
rg -n "Keine Trades|Keine Kauf|research-only|kein Broker|kein neuer Cronjob|keine Codeaenderungen|keine echten Schueler" /Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/GOAL.md /Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md
```

Expected: all hard safety boundaries are present.

- [x] **Step 4: Verify opportunity and test limits**

Run:

```text
rg -n "Opportunity [1-3]|Exactly one|Genau ein|7-Tage-Test|Naechste kleinste Aktion" /Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md
```

Expected: three or fewer opportunities, exactly one 7-day test, exactly one next smallest action.

## Manual Completion Gate

The v1 run is complete only if the verification commands pass and no report section violates the out-of-scope boundaries.
