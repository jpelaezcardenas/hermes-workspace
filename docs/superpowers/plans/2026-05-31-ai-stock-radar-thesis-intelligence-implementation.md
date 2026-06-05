# AI Stock Radar Thesis Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a research-only Thesis Intelligence layer covering Thesis Graph, Negative Catalyst Detector, and AI Revenue Reality Check.

**Architecture:** A new `scripts/ai-stock-radar-thesis-intelligence.mjs` module owns classification, summaries, and report rendering. The daily engine attaches `thesis_intelligence` after Advanced Signals and writes a companion report before CEO audit; weekly calibration summarizes the attached fields.

**Tech Stack:** Node.js ESM, Vitest, Markdown reports, local JSON watchlist state, no paid provider or broker integration.

---

### Task 1: Thesis Intelligence Module

**Files:**
- Create: `scripts/ai-stock-radar-thesis-intelligence.mjs`
- Test: `scripts/ai-stock-radar-thesis-intelligence.test.mjs`

- [ ] Write RED tests for `buildThesisIntelligence`, `applyThesisIntelligence`, `summarizeThesisIntelligence`, `renderThesisIntelligenceReport`, and `writeThesisIntelligenceRun`.
- [ ] Verify RED failure because the module does not exist.
- [ ] Implement thesis graph construction from thesis, evidence labels, risks, counter-evidence, and gaps.
- [ ] Implement negative catalyst severity from Evidence Firewall risks, CEO lane, Entry Readiness, Advanced Signals, top risks, and quality notes.
- [ ] Implement AI revenue reality labels from themes, filing/customer labels, fundamentals, and name-only risks.
- [ ] Implement safe companion report rendering.
- [ ] Verify module tests pass.

### Task 2: Daily Engine Integration

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add RED assertions that daily reports include `## Thesis Intelligence`, watchlist candidates include `thesis_intelligence`, and companion report exists.
- [ ] Verify RED failure.
- [ ] Import and apply Thesis Intelligence after Advanced Signals.
- [ ] Render daily Thesis Intelligence lines.
- [ ] Write the companion report before CEO audit.
- [ ] Verify daily integration tests pass.

### Task 3: Weekly Calibration Integration

**Files:**
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`

- [ ] Add RED assertions for `## Thesis Intelligence Summary`.
- [ ] Verify RED failure.
- [ ] Import `summarizeThesisIntelligence`.
- [ ] Format thesis verdict counts, negative catalyst severity counts, AI revenue reality counts, and top gaps.
- [ ] Verify weekly tests pass.

### Task 4: CEO Audit Integration

**Files:**
- Modify: `scripts/ai-stock-radar-ceo-control.mjs`
- Modify: `scripts/ai-stock-radar-ceo-control.test.mjs`

- [ ] Add RED assertions for thesis prompt sections, report sections, module checks, companion artifact checks, and watchlist `thesis_intelligence` fields.
- [ ] Verify RED failure.
- [ ] Extend audit checks for thesis intelligence module and artifacts.
- [ ] Extend candidate field requirements.
- [ ] Verify CEO audit tests pass.

### Task 5: Prompts, Skill, Production, Cron

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
- Modify generated reports and watchlist state.

- [ ] Add Thesis Intelligence files, sections, labels, and safety rules to prompts and skill.
- [ ] Run full AI radar tests.
- [ ] Run daily, weekly, and CEO audit for `2026-05-31`.
- [ ] Scan reports, prompts, and skill for prohibited direct-trading language.
- [ ] Commit, merge to main, and update existing daily/weekly Hermes cron prompts.
