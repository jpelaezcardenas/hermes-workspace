# AI Stock Radar Paper Portfolio And Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a research-only Entry/Exit Readiness and Paper Portfolio layer for Hermes AI Stock Radar.

**Architecture:** A new `ai-stock-radar-paper-portfolio.mjs` module owns readiness classification, paper portfolio state, simulated position lifecycle, summaries, and report rendering. The daily free signal engine calls it after CEO Control and Shadow Backtest; weekly calibration reads the portfolio summary.

**Tech Stack:** Node.js ESM, Vitest, JSON state in `projects/ai-stock-radar/`, Markdown reports in `reports/ai-stock-radar/`.

---

### Task 1: Readiness And Paper Portfolio Module

**Files:**
- Create: `scripts/ai-stock-radar-paper-portfolio.mjs`
- Test: `scripts/ai-stock-radar-paper-portfolio.test.mjs`

- [ ] Write failing tests for entry readiness labels, paper entry creation, duplicate prevention, exit-risk review, report safety, and file writing.
- [ ] Run `node node_modules/vitest/vitest.mjs run scripts/ai-stock-radar-paper-portfolio.test.mjs` and confirm failure because the module does not exist.
- [ ] Implement `classifyEntryReadiness`, `classifyExitRisk`, `updatePaperPortfolio`, `summarizePaperPortfolio`, `renderPaperPortfolioReport`, and `writePaperPortfolioRun`.
- [ ] Run the module test and confirm pass.

### Task 2: Daily Integration

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add failing assertions that daily runs write `paper-portfolio.json` and `ai-stock-paper-portfolio-YYYY-MM-DD.md`.
- [ ] Add assertions that watchlist candidates carry `entry_readiness`.
- [ ] Call `writePaperPortfolioRun` after watchlist and Shadow Backtest generation.
- [ ] Run the daily test and confirm pass.

### Task 3: Weekly And Audit Integration

**Files:**
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`
- Modify: `scripts/ai-stock-radar-ceo-control.mjs`
- Modify: `scripts/ai-stock-radar-ceo-control.test.mjs`

- [ ] Add failing assertions for `## Paper Portfolio Summary`.
- [ ] Add failing audit checks for paper module and artifacts.
- [ ] Render weekly paper summary from portfolio JSON.
- [ ] Extend CEO audit checks.
- [ ] Run targeted tests and confirm pass.

### Task 4: Hermes Operating Instructions

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
- Copy to: `/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md`

- [ ] Add Paper Portfolio files, sections, and safety rules.
- [ ] Mirror instructions into Hermes skill and Neva profile.
- [ ] Verify the skill copies match.

### Task 5: Verification And Release

**Files:**
- Generated: `projects/ai-stock-radar/paper-portfolio.json`
- Generated: `reports/ai-stock-radar/ai-stock-paper-portfolio-YYYY-MM-DD.md`

- [ ] Run all AI Stock Radar tests.
- [ ] Run daily and weekly production commands.
- [ ] Update Hermes cron prompts.
- [ ] Commit, fast-forward merge into main, and verify main.
