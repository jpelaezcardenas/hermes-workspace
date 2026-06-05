# AI Stock Radar Shadow Backtest Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a free 30-day shadow backtest loop that records daily AI Stock Radar signals and later evaluates them for calibration quality.

**Architecture:** A focused `ai-stock-radar-shadow-backtest.mjs` module owns ledger reads/writes, snapshot capture, outcome assessment, summary rendering, and report writing. The daily free signal engine calls it after writing the watchlist; weekly calibration reads the ledger summary and renders one additional section.

**Tech Stack:** Node.js ESM, Vitest, JSON ledger under `projects/ai-stock-radar/`, Markdown reports under `reports/ai-stock-radar/`.

---

### Task 1: Shadow Backtest Module

**Files:**
- Create: `scripts/ai-stock-radar-shadow-backtest.mjs`
- Test: `scripts/ai-stock-radar-shadow-backtest.test.mjs`

- [ ] Write failing tests for snapshot creation, duplicate prevention, outcome assessment, report safety, and file writing.
- [ ] Run `node node_modules/vitest/vitest.mjs run scripts/ai-stock-radar-shadow-backtest.test.mjs` and confirm failure because the module does not exist.
- [ ] Implement the module with `captureShadowSnapshots`, `assessShadowOutcomes`, `summarizeShadowBacktest`, `renderShadowBacktestReport`, and `writeShadowBacktestRun`.
- [ ] Run the test again and confirm pass.

### Task 2: Daily Integration

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add failing assertions that daily runs write `shadow-backtest-ledger.json` and `ai-stock-shadow-backtest-YYYY-MM-DD.md`.
- [ ] Run the daily test and confirm failure.
- [ ] Call `writeShadowBacktestRun` after watchlist, false-positive memory, dossiers, and CEO audit are written.
- [ ] Run the daily test and confirm pass.

### Task 3: Weekly Integration

**Files:**
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`

- [ ] Add failing assertions for `## Shadow Backtest Summary`.
- [ ] Run the weekly test and confirm failure.
- [ ] Render a weekly summary from the shadow ledger when available.
- [ ] Run the weekly test and confirm pass.

### Task 4: Hermes Operating Instructions

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify external skill copies under `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md` and `/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md`

- [ ] Add Shadow Backtest files, report sections, and safety rules to the daily prompt.
- [ ] Add Shadow Backtest summary requirements to the weekly prompt.
- [ ] Mirror the instructions into the Hermes skill and Neva profile.
- [ ] Verify both skill copies match.

### Task 5: Verification and Release

**Files:**
- Generated: `projects/ai-stock-radar/shadow-backtest-ledger.json`
- Generated: `reports/ai-stock-radar/ai-stock-shadow-backtest-YYYY-MM-DD.md`

- [ ] Run all AI Stock Radar tests.
- [ ] Run the daily engine and weekly calibration.
- [ ] Update Hermes cron prompts.
- [ ] Commit and fast-forward merge into main.
