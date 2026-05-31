# Stock Risk Commander Implementation Plan - 2026-05-31

## Objective

Implement a daily research-only commander that merges AI Stock Radar and Institutional Sell Pressure Radar results into one compact report with maximum three safe review actions.

## Steps

1. Write RED tests for:
   - job schedule alignment at 10:00 after 09:35 and 09:50 stock jobs;
   - candidate merge by ticker;
   - risk overrides dominating positive idea-grade signals;
   - maximum three safe actions;
   - required report sections;
   - forbidden trading language safety.

2. Implement `scripts/stock-risk-commander.mjs`.
   - Load AI watchlist.
   - Load institutional holder ledger and memory.
   - Recompute institutional signal per ticker using existing sell-radar functions.
   - Compute commander assessment.
   - Render compact Markdown report.

3. Add project files.
   - `projects/stock-risk-commander/prompts/daily.md`
   - optional memory file if useful.

4. Add Hermes skill copies.
   - `/Users/zondrius/.hermes/skills/finance/stock-risk-commander/SKILL.md`
   - `/Users/zondrius/.hermes/profiles/neva/skills/finance/stock-risk-commander/SKILL.md`

5. Run verification.
   - New tests.
   - Existing AI Stock Radar tests.
   - Institutional Sell Radar tests.
   - Safety scan.
   - Production dry run for current date.

6. Commit, merge, and create cron.
   - Name: `STOCK_RISK_COMMANDER_DAILY`
   - Schedule: `0 10 * * 1-5`
   - Delivery: telegram.
   - Workdir: `/Users/zondrius/hermes-workspace`.
   - Skills: stock-risk-commander, ai-stock-radar, institutional-sell-radar, hermes-agent-operating-system, hermes-decision-inbox.

## Acceptance Criteria

- Report exists under `reports/stock-risk-commander/`.
- Report contains all required sections.
- Commander outputs at most three safe actions.
- Risk overrides dominate positive hype.
- No forbidden trade language appears in prompt, report, or skill.
- Cron runs after both daily stock radars.

