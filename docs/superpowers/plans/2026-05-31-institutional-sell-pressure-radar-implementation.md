# Institutional Sell Pressure Radar Implementation Plan - 2026-05-31

## Objective

Implement a free, research-only daily radar that monitors public institutional sell-pressure signals for US-listed companies, starting with the AI Stock Radar watchlist and focusing on large global institutions visible in SEC filings.

## Steps

1. Create RED tests for the sell-pressure model.
   - Score 13F reductions with latency caps.
   - Escalate 13D/G and Form 4 sell clusters.
   - Keep short-volume-only context as non-trade research information.
   - Render all required report sections.
   - Reject forbidden trade/certainty language.

2. Implement `scripts/institutional-sell-radar.mjs`.
   - Load AI Stock Radar watchlist.
   - Load optional sell-radar watchlist, holder ledger, and memory.
   - Normalize filing observations.
   - Compute sell-pressure signals.
   - Write state and Markdown report.

3. Add project state files.
   - `projects/institutional-sell-radar/watchlist.json`
   - `projects/institutional-sell-radar/holder-ledger.json`
   - `projects/institutional-sell-radar/sell-pressure-memory.json`
   - `projects/institutional-sell-radar/prompts/daily.md`

4. Add Hermes skill copies.
   - `/Users/zondrius/.hermes/skills/finance/institutional-sell-radar/SKILL.md`
   - `/Users/zondrius/.hermes/profiles/neva/skills/finance/institutional-sell-radar/SKILL.md`

5. Run local verification.
   - Focused sell-radar tests.
   - Existing AI stock radar tests.
   - Safety scan for forbidden trading language.
   - Production dry run for current date.

6. Merge to main and create/update cron.
   - Create `INSTITUTIONAL_SELL_PRESSURE_DAILY`.
   - Schedule: `50 9 * * 1-5`.
   - Workdir: `/Users/zondrius/hermes-workspace`.
   - Delivery: `telegram`.
   - Skills: `institutional-sell-radar`, `ai-stock-radar`, `hermes-agent-operating-system`, `hermes-decision-inbox`.

7. Verify cron prompt.
   - Confirm prompt contains existing-stock-job alignment and safety constraints.
   - Confirm next run appears after `AI_STOCK_RADAR_DAILY`.

## Acceptance Criteria

- Daily report exists and contains every required section.
- State files are written without broker/trade fields.
- 13F-only signals are capped below urgent review.
- 13D/G and Form 4 clusters can escalate to `WARNING` or `CRITICAL_REVIEW`.
- Existing AI stock radar test suite still passes.
- Cron job runs in the same morning block as the AI stock radar.

