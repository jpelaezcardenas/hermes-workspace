# AI Stock Radar S-Tier Grading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional free price/volume confirmation and S/A/B/C/X idea grading to `AI_STOCK_RADAR`.

**Architecture:** Add two focused modules: one price/volume sensor and one idea-grade engine. Integrate both into the existing daily report and weekly calibration without changing the no-trading safety contract.

**Tech Stack:** Node.js ESM, Vitest, Markdown reports, JSON watchlist state, optional Stooq CSV fetch.

---

## Task 1: RED Tests

- [ ] Add `scripts/ai-stock-radar-price-volume.test.mjs`.
- [ ] Add `scripts/ai-stock-radar-idea-grade.test.mjs`.
- [ ] Add daily engine tests for price provider injection and grade rendering.
- [ ] Verify tests fail for missing modules/features.

## Task 2: Implement Modules

- [ ] Add `scripts/ai-stock-radar-price-volume.mjs`.
- [ ] Add `scripts/ai-stock-radar-idea-grade.mjs`.
- [ ] Pass module tests.

## Task 3: Integrate Daily And Weekly Reports

- [ ] Enrich candidates with optional price/volume.
- [ ] Add `idea_grade` and grade reasons to watchlist records.
- [ ] Render grade and price/volume sections.
- [ ] Update weekly calibration to summarize grades.

## Task 4: Prompts, Skill, Cron

- [ ] Update daily/weekly prompts.
- [ ] Update Hermes skill.
- [ ] Update cron prompts.

## Task 5: Verification

- [ ] Run all AI radar tests.
- [ ] Generate daily and weekly reports.
- [ ] Verify safety language and paths.
- [ ] Commit only AI radar files.
