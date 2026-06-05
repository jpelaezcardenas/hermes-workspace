# AI Stock Radar Quality Calibration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add quality filters, filing catalyst labels, watchlist aging, and weekly calibration to reduce false positives in `AI_STOCK_RADAR`.

**Architecture:** Add one reusable quality-rules module, call it from live discovery and free scoring, then add a weekly calibration generator that reads the current watchlist and writes an auditable Markdown report.

**Tech Stack:** Node.js ESM, Vitest, JSON watchlist state, Markdown reports.

---

## Task 1: Quality Rules RED Tests

**Files:**
- Create: `scripts/ai-stock-radar-quality-rules.test.mjs`

- [ ] Test that name-only AI evidence is flagged and penalized.
- [ ] Test that seed/hard-catalyst evidence avoids the name-only penalty.
- [ ] Test security-structure risk labels for warrants, units, rights, funds, and preferred shares.
- [ ] Test filing labels for offering, going-concern, reverse split, and merger terms.
- [ ] Test watchlist aging and false-positive bucket assignment.
- [ ] Run tests and verify RED.

## Task 2: Implement Quality Rules

**Files:**
- Create: `scripts/ai-stock-radar-quality-rules.mjs`

- [ ] Implement evidence risk evaluation.
- [ ] Implement filing catalyst/risk label extraction.
- [ ] Implement score penalty helper.
- [ ] Implement watchlist aging helper.
- [ ] Run quality tests until green.

## Task 3: Integrate Daily Quality Filters

**Files:**
- Modify: `scripts/ai-stock-radar-live-discovery.mjs`
- Modify: `scripts/ai-stock-radar-live-discovery.test.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add tests proving name-only live candidates cannot become Breakout Watch.
- [ ] Add tests proving hard catalyst/seed overlay can still rank.
- [ ] Apply quality penalties and add `quality_notes`, `age_days`, and `status`.
- [ ] Run all radar tests.

## Task 4: Weekly Calibration Generator

**Files:**
- Create: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Create: `scripts/ai-stock-radar-weekly-calibration.test.mjs`

- [ ] Read watchlist and classify keep/downgrade/archive/false-positive buckets.
- [ ] Render a weekly report with Decision Inbox.
- [ ] Keep `SOFORT_MACHEN: nichts`.
- [ ] Run weekly tests.

## Task 5: Prompts, Skill, Verification

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify local Hermes skill copies.

- [ ] Update daily prompt to mention quality filters and no Breakout from name-only evidence.
- [ ] Update weekly prompt to run calibration and document false positives.
- [ ] Update cron prompts for daily and weekly jobs.
- [ ] Generate fresh daily and weekly reports.
- [ ] Run all tests and safety checks.
