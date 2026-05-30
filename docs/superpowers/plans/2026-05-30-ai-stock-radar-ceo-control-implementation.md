# AI Stock Radar CEO Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add CEO-level risk-profile control, source-confidence ledgers, false-positive memory, and integration audit to the AI stock radar.

**Architecture:** Create one focused module, `scripts/ai-stock-radar-ceo-control.mjs`, plus a default `projects/ai-stock-radar/risk-profile.json`. Integrate the module into daily and weekly radar runs without changing the no-trading safety contract.

**Tech Stack:** Node.js ESM, Vitest, Markdown reports, JSON watchlist/memory/profile files.

---

### Task 1: RED Tests

**Files:**
- Create: `scripts/ai-stock-radar-ceo-control.test.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`

- [ ] Add tests for source-confidence ledger, risk-profile fit, false-positive memory, and integration audit.
- [ ] Add daily report expectations for `CEO Control` and `Source Confidence Ledger`.
- [ ] Add weekly report expectations for `CEO Control Summary` and `False Positive Memory`.
- [ ] Run tests and verify they fail before implementation.

### Task 2: CEO Control Module

**Files:**
- Create: `scripts/ai-stock-radar-ceo-control.mjs`
- Create: `projects/ai-stock-radar/risk-profile.json`

- [ ] Implement default conservative research profile loading.
- [ ] Implement `buildSourceConfidenceLedger(candidate)`.
- [ ] Implement `evaluateRiskProfileFit(candidate, profile)`.
- [ ] Implement `applyCeoControl(candidate, profile)`.
- [ ] Implement `buildFalsePositiveMemory(candidates)`.
- [ ] Implement `buildIntegrationAudit({ root })` and `writeIntegrationAudit({ root, date })`.
- [ ] Run CEO-control tests.

### Task 3: Daily And Weekly Integration

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`

- [ ] Load risk profile during daily run.
- [ ] Attach `ceo_control` and `source_confidence` to each candidate.
- [ ] Write `false-positive-memory.json`.
- [ ] Write daily CEO audit report.
- [ ] Render daily CEO sections.
- [ ] Render weekly CEO and false-positive memory sections.
- [ ] Run all AI radar tests.

### Task 4: Prompts, Skill, Cron

**Files:**
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
- Copy: `/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md`

- [ ] Add CEO Control requirements to daily and weekly prompts.
- [ ] Add risk-profile, source-ledger, false-positive memory, and audit rules to the Hermes skill.
- [ ] Update cron prompts after merge.

### Task 5: Verification And Commit

**Files:**
- Generated: `projects/ai-stock-radar/watchlist.json`
- Generated: `projects/ai-stock-radar/false-positive-memory.json`
- Generated: `reports/ai-stock-radar/ai-stock-radar-2026-05-30.md`
- Generated: `reports/ai-stock-radar/ai-stock-deepdive-2026-05-31.md`
- Generated: `reports/ai-stock-radar/ai-stock-radar-ceo-audit-2026-05-30.md`

- [ ] Run all AI radar tests.
- [ ] Generate daily, weekly, and CEO audit reports.
- [ ] Verify JSON validity, no forbidden trading language, `SOFORT_MACHEN: nichts`, and no worktree paths.
- [ ] Commit only AI radar files.
