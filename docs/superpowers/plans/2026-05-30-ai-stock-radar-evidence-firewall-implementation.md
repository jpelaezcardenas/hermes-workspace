# AI Stock Radar Evidence Firewall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Phase 6 Evidence Firewall that reduces false positives with filing-event decoding, SEC companyfacts fundamentals, concrete safe review actions, and stricter S/A promotion gates.

**Architecture:** Add one focused module, `scripts/ai-stock-radar-evidence-firewall.mjs`, and integrate it into live discovery, scoring, grading, daily reports, weekly calibration, prompts, and the Hermes skill. The firewall is additive and fail-soft: missing facts are explicit, never bullish.

**Tech Stack:** Node.js ESM, Vitest, Markdown reports, SEC submissions/companyfacts JSON, Nasdaq symbol directory.

---

### Task 1: RED Tests For Evidence Firewall

**Files:**
- Create: `scripts/ai-stock-radar-evidence-firewall.test.mjs`
- Test command: `node node_modules/vitest/vitest.mjs run scripts/ai-stock-radar-evidence-firewall.test.mjs`

- [ ] Add failing tests for `decodeFilingEvents`, `evaluateFundamentalSnapshot`, `applyEvidenceFirewall`, and `chooseReviewAction`.
- [ ] Verify the test file fails because `scripts/ai-stock-radar-evidence-firewall.mjs` does not exist.

### Task 2: Implement Evidence Firewall Module

**Files:**
- Create: `scripts/ai-stock-radar-evidence-firewall.mjs`
- Test: `scripts/ai-stock-radar-evidence-firewall.test.mjs`

- [ ] Implement filing event decoding for material agreements, earnings/guidance, offerings/warrants, going concern, reverse split, delisting, and shell/SPAC language.
- [ ] Implement SEC companyfacts extraction for revenue growth, cash runway, operating cash flow, and share-count growth.
- [ ] Implement firewall verdicts and score/category caps.
- [ ] Run the firewall tests and verify they pass.

### Task 3: Integrate SEC Companyfacts Into Live Discovery

**Files:**
- Modify: `scripts/ai-stock-radar-live-discovery.mjs`
- Modify: `scripts/ai-stock-radar-live-discovery.test.mjs`

- [ ] Add RED tests that injected companyfacts produce `fundamental_snapshot` and `sec_companyfacts` only when facts are available.
- [ ] Fetch companyfacts through the existing fetcher in live mode with fail-soft behavior.
- [ ] Attach `filing_events`, `fundamental_snapshot`, and firewall output fields to evidence records.
- [ ] Run live-discovery tests and verify they pass.

### Task 4: Integrate Firewall Into Scoring, Grade, Reports

**Files:**
- Modify: `scripts/ai-stock-radar-free-signal-engine.mjs`
- Modify: `scripts/ai-stock-radar-free-signal-engine.test.mjs`
- Modify: `scripts/ai-stock-radar-idea-grade.mjs`
- Modify: `scripts/ai-stock-radar-idea-grade.test.mjs`

- [ ] Add RED tests that reject/caution firewall verdicts block A/S and render an `Evidence Firewall` section.
- [ ] Apply firewall penalties and category caps to candidates.
- [ ] Store `evidence_firewall`, `fundamental_snapshot`, and `review_action` in watchlist candidates.
- [ ] Require `firewall.verdict === "pass"` for S and A, except B/C watch states.
- [ ] Run daily engine and grade tests.

### Task 5: Weekly Calibration, Prompts, Skill

**Files:**
- Modify: `scripts/ai-stock-radar-weekly-calibration.mjs`
- Modify: `scripts/ai-stock-radar-weekly-calibration.test.mjs`
- Modify: `projects/ai-stock-radar/prompts/daily.md`
- Modify: `projects/ai-stock-radar/prompts/weekly.md`
- Modify: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
- Copy: `/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md`

- [ ] Add weekly firewall summary tests.
- [ ] Render firewall verdict counts in weekly calibration.
- [ ] Update prompts and skill to require Evidence Firewall sections and safe review actions.
- [ ] Run prompt/skill text checks for forbidden trading language.

### Task 6: Production Verification And Cron Update

**Files:**
- Generated: `projects/ai-stock-radar/watchlist.json`
- Generated: `reports/ai-stock-radar/ai-stock-radar-2026-05-30.md`
- Generated: `reports/ai-stock-radar/ai-stock-deepdive-2026-05-31.md`
- Generated: `projects/ai-stock-radar/dossiers/*.md`

- [ ] Run all AI radar tests.
- [ ] Run the daily report with `AI_STOCK_RADAR_DISCOVERY_MODE=auto AI_STOCK_RADAR_PRICE_MODE=stooq_optional`.
- [ ] Run weekly calibration.
- [ ] Verify JSON validity, safe language, `SOFORT_MACHEN: nichts`, no worktree paths, and cron prompt updates.
- [ ] Commit only AI radar files.
