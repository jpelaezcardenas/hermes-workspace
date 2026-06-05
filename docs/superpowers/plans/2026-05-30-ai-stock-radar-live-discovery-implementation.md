# AI Stock Radar Live Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add free live discovery to `AI_STOCK_RADAR` using Nasdaq symbol-directory files and SEC company/submission JSON, with seed fallback.

**Architecture:** Add a focused live-discovery module that normalizes public-source records into Phase 2 evidence. Keep scoring and report generation in the existing free signal engine, but add `auto` mode so daily jobs prefer live data and degrade safely to seeds.

**Tech Stack:** Node.js ESM, Vitest, built-in `fetch`, Markdown reports, JSON state.

---

## Task 1: RED Tests For Live Discovery

**Files:**
- Create: `scripts/ai-stock-radar-live-discovery.test.mjs`

- [ ] Test Nasdaq `nasdaqlisted.txt` parsing and exclusion of ETFs/test issues.
- [ ] Test Nasdaq `otherlisted.txt` parsing and exchange normalization.
- [ ] Test SEC company ticker normalization with padded CIKs.
- [ ] Test AI relevance inference from company names and seed overlays.
- [ ] Test SEC submissions mapping into recent filing forms.
- [ ] Test fallback result when fetches fail.
- [ ] Run tests and verify they fail because the module does not exist.

## Task 2: Implement Live Discovery Module

**Files:**
- Create: `scripts/ai-stock-radar-live-discovery.mjs`
- Test: `scripts/ai-stock-radar-live-discovery.test.mjs`

- [ ] Implement parsing helpers.
- [ ] Implement fetch helpers with SEC User-Agent.
- [ ] Implement record joining and AI relevance inference.
- [ ] Implement `discoverLiveEvidence`.
- [ ] Run live-discovery tests until green.
- [ ] Commit the module and tests.

## Task 3: Integrate Auto Mode Into Free Signal Engine

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`

- [ ] Add tests for `discoveryMode: "auto"` using injected discovery.
- [ ] Implement auto/live/seed mode selection.
- [ ] Add report wording for live discovery vs seed fallback.
- [ ] Preserve Phase 2 tests.
- [ ] Run all AI radar tests.
- [ ] Commit integration.

## Task 4: Update Prompt And Skill

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify local skill copies under `/Users/zondrius/.hermes/.../ai-stock-radar/SKILL.md`

- [ ] Update daily prompt to run `AI_STOCK_RADAR_DISCOVERY_MODE=auto`.
- [ ] Add live discovery source rules to the skill.
- [ ] Sync global and Neva skill copies.
- [ ] Update Hermes cron prompt for job `230fd5468b64`.

## Task 5: Final Verification

**Files:** read only unless verification exposes a bug.

- [ ] Run all AI radar Vitest files.
- [ ] Validate JSON.
- [ ] Generate report in auto mode.
- [ ] Check report safety and production paths.
- [ ] Check cron job IDs/schedules unchanged.
- [ ] Merge to main and commit/amend only AI radar files.
