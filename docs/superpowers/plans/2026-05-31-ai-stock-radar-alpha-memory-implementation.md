# AI Stock Radar Alpha Memory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a research-only Alpha Memory learning layer covering hypothesis memory, contradiction detection, and catalyst timelines.

**Architecture:** A new `scripts/ai-stock-radar-alpha-memory.mjs` module owns candidate learning labels, state updates, summaries, and report rendering. The daily engine attaches `alpha_memory` after Thesis Intelligence and writes memory state plus a companion report before CEO audit; weekly calibration summarizes attached fields and state outcomes.

**Tech Stack:** Node.js ESM, Vitest, Markdown reports, local JSON state, no paid provider or broker integration.

---

### Task 1: Alpha Memory Module

**Files:**
- Create: `scripts/ai-stock-radar-alpha-memory.mjs`
- Test: `scripts/ai-stock-radar-alpha-memory.test.mjs`

- [ ] Write RED tests for `buildAlphaMemorySignal`, `applyAlphaMemorySignal`, `updateAlphaMemoryState`, `summarizeAlphaMemory`, `renderAlphaMemoryReport`, and `writeAlphaMemoryRun`.
- [ ] Verify RED failure because the module does not exist.
- [ ] Implement contradiction detection from Thesis Intelligence, Evidence Firewall, Advanced Signals, price context, quality notes, and risk flags.
- [ ] Implement catalyst timeline event building and timing labels.
- [ ] Implement snapshot creation, duplicate prevention, due assessment, and safe report rendering.
- [ ] Verify module tests pass.

### Task 2: Daily Engine Integration

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add RED assertions that daily reports include `## Alpha Memory`, watchlist candidates include `alpha_memory`, and memory/report artifacts exist.
- [ ] Verify RED failure.
- [ ] Import and apply Alpha Memory after Thesis Intelligence.
- [ ] Render daily Alpha Memory lines.
- [ ] Write `alpha-memory.json` and companion report before CEO audit.
- [ ] Verify daily integration tests pass.

### Task 3: Weekly Calibration Integration

**Files:**
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`

- [ ] Add RED assertions for `## Alpha Memory Summary`.
- [ ] Verify RED failure.
- [ ] Import `summarizeAlphaMemory`.
- [ ] Load `alpha-memory.json` and summarize hypothesis labels, contradiction severity, catalyst timing, and memory outcomes.
- [ ] Verify weekly tests pass.

### Task 4: CEO Audit Integration

**Files:**
- Modify: `scripts/ai-stock-radar-ceo-control.mjs`
- Modify: `scripts/ai-stock-radar-ceo-control.test.mjs`

- [ ] Add RED assertions for alpha prompt sections, report sections, module check, artifact check, memory file check, and watchlist `alpha_memory` field.
- [ ] Verify RED failure.
- [ ] Extend audit checks for Alpha Memory module and artifacts.
- [ ] Extend candidate field requirements.
- [ ] Verify CEO audit tests pass.

### Task 5: Prompts, Skill, Production, Cron

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
- Modify generated reports and watchlist state.

- [ ] Add Alpha Memory files, sections, labels, and safety rules to prompts and skill.
- [ ] Run full AI radar tests.
- [ ] Run daily, weekly, and CEO audit for `2026-05-31`.
- [ ] Scan reports, prompts, and skill for prohibited direct-trading language.
- [ ] Commit, merge to main, and update existing daily/weekly Hermes cron prompts.
