# AI Stock Radar Free Signal Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Phase 2 of `AI_STOCK_RADAR` with free public-source scoring, deterministic seed evidence, safe report rendering, and updated Hermes prompts.

**Architecture:** Keep Phase 1 intact and add a separate free signal engine. The new engine consumes normalized evidence records, applies public-source gates, reuses the Phase 1 candidate contract, and writes a daily report plus watchlist update without paid providers or broker access.

**Tech Stack:** Node.js ESM, Vitest, JSON seed state, Markdown reports, Hermes prompt files.

---

## Task 1: Add Free Source Seed Universe

**Files:**
- Create: `projects/ai-stock-radar/free-source-seeds.json`

- [ ] Add a deterministic seed file with public-equity AI themes, source types, and conservative risk flags.
- [ ] Validate the JSON with `python3 -m json.tool`.
- [ ] Commit the seed file.

## Task 2: Write RED Tests For Free Signal Engine

**Files:**
- Create: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Test that public evidence becomes Phase-1-compatible candidates.
- [ ] Test that no paid provider or API key is required.
- [ ] Test that market momentum is capped without reliable free price data.
- [ ] Test that weak source breadth blocks `Deep Dive`.
- [ ] Test that the daily report includes data gaps and safe Decision Inbox wording.
- [ ] Run the new test and verify it fails because the engine does not exist yet.

## Task 3: Implement Free Signal Engine

**Files:**
- Create: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Implement seed loading, evidence normalization, scoring, category selection, report rendering, and file writes.
- [ ] Reuse Phase 1 validation helpers from `scripts/ai-stock-radar-dry-run.mjs`.
- [ ] Run free-engine and dry-run tests until both pass.
- [ ] Generate a deterministic report for `2026-05-30`.
- [ ] Commit the engine and report.

## Task 4: Update Hermes Daily Prompt

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`

- [ ] Tell Neva to run the free signal engine before manual research.
- [ ] Keep paid providers and broker access under `CHRIS_ENTSCHEIDET`.
- [ ] Keep data gaps explicit and `SOFORT_MACHEN` non-trading.
- [ ] Verify existing cron IDs remain unchanged.
- [ ] Commit the prompt update.

## Task 5: Final Verification

**Files:**
- Read only after implementation.

- [ ] Run both Vitest files.
- [ ] Validate JSON files.
- [ ] Run the free signal engine CLI.
- [ ] Check generated report for Decision Inbox and forbidden language.
- [ ] Check git diff contains only AI stock radar files.
- [ ] Commit final changes if any remain.
