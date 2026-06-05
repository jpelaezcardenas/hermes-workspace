# AI Stock Radar Advanced Signal Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a research-only Advanced Signal Stack for Hermes AI Stock Radar covering SEC catalyst decoding, customer proof, relative strength, liquidity, ownership hooks, thesis invalidation, catalyst calendar, and explainable Banger Score.

**Architecture:** A new `scripts/ai-stock-radar-advanced-signals.mjs` module owns all advanced signal logic, summaries, and report rendering. The daily free-source engine attaches `advanced_signals` after Entry Readiness and writes a companion report before CEO audit; weekly calibration summarizes advanced labels from the watchlist.

**Tech Stack:** Node.js ESM, Vitest, Markdown reports, local JSON state under `projects/ai-stock-radar`, no paid provider or broker integration.

---

### Task 1: Advanced Signal Module

**Files:**
- Create: `scripts/ai-stock-radar-advanced-signals.mjs`
- Test: `scripts/ai-stock-radar-advanced-signals.test.mjs`

- [ ] Write RED tests for `buildAdvancedSignals`, `applyAdvancedSignals`, `summarizeAdvancedSignals`, `renderAdvancedSignalsReport`, and `writeAdvancedSignalsRun`.
- [ ] Verify RED failure because the module does not exist.
- [ ] Implement component scorers for SEC catalyst, customer proof, relative strength, liquidity, ownership, thesis invalidation, and catalyst calendar.
- [ ] Implement hard risk gate overrides to `RISK_TRAP`.
- [ ] Implement safe report rendering and summary counts.
- [ ] Verify the new module tests pass.

### Task 2: Daily Engine Integration

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add RED assertions that daily reports include `## Advanced Signal Stack`, watchlist candidates include `advanced_signals`, and the companion report exists.
- [ ] Verify RED failure.
- [ ] Import `applyAdvancedSignals`, `loadAdvancedSignalContext`, and `writeAdvancedSignalsRun`.
- [ ] Attach advanced signals after Entry Readiness.
- [ ] Render a concise Advanced Signal Stack section in the daily report.
- [ ] Write the companion advanced report before CEO audit.
- [ ] Verify daily engine tests pass.

### Task 3: Weekly Calibration Integration

**Files:**
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`

- [ ] Add RED assertions for `## Advanced Signal Summary`.
- [ ] Verify RED failure.
- [ ] Import `summarizeAdvancedSignals`.
- [ ] Add weekly formatting for banger label counts and top review queue.
- [ ] Verify weekly tests pass.

### Task 4: CEO Audit Integration

**Files:**
- Modify: `scripts/ai-stock-radar-ceo-control.mjs`
- Modify: `scripts/ai-stock-radar-ceo-control.test.mjs`

- [ ] Add RED assertions for advanced prompt sections, report sections, module checks, companion artifact checks, and watchlist `advanced_signals` fields.
- [ ] Verify RED failure.
- [ ] Extend audit checks for the advanced signal module and artifacts.
- [ ] Extend candidate field requirements.
- [ ] Verify CEO audit tests pass.

### Task 5: Prompts And Skill

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`

- [ ] Add Advanced Signal Stack files, report sections, allowed labels, and safety rules to the daily prompt.
- [ ] Add Advanced Signal Summary tasks and safety rules to the weekly prompt.
- [ ] Update the Hermes finance skill so recurring jobs understand the new research-only layer.
- [ ] Verify CEO audit detects the new sections.

### Task 6: Production Run, Cron, And Verification

**Files:**
- Modify generated daily/weekly reports and AI radar JSON state.

- [ ] Run the full AI radar test matrix.
- [ ] Run daily AI radar for `2026-05-31`.
- [ ] Run weekly calibration for `2026-05-31`.
- [ ] Run CEO audit for `2026-05-31`.
- [ ] Scan reports and prompts for prohibited trading language.
- [ ] Commit the feature branch.
- [ ] Merge fast-forward into main.
- [ ] Update the existing Hermes daily and weekly cron prompts with the new prompt text.
- [ ] Verify cron jobs contain Advanced Signal Stack / Advanced Signal Summary.
