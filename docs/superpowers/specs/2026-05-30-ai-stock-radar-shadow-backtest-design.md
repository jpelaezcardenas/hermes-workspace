# AI Stock Radar Shadow Backtest Design

## Goal

Add a free, read-only 30-day shadow backtest loop to Hermes' AI Stock Radar. The loop records what the radar believed on each run, waits until a snapshot is old enough, then compares the original research signal with later public context. It is a calibration tool, not investment advice.

## Design

- Daily snapshot ledger: each daily run appends one immutable snapshot per ticker to `projects/ai-stock-radar/shadow-backtest-ledger.json`. The snapshot stores date, due date, ticker, grade, score, category, CEO lane, Evidence Firewall verdict, risk flags, source-confidence summary, and optional Stooq close/date if available.
- Outcome assessment: each daily run reopens due snapshots after 30 calendar days. If both the original and later free Stooq close are available, it records an observed return percentage. If price data is missing, the outcome remains `unavailable` and is counted as a data gap.
- Calibration labels: `constructive` means the later public context did not contradict the original research signal and price context was positive. `risk_confirmed` means the later context confirms a risk gate or materially weak price context. `inconclusive` means mixed or small movement. These labels never become trade instructions.
- Report: each run writes `reports/ai-stock-radar/ai-stock-shadow-backtest-YYYY-MM-DD.md` with summary counts, grade/lane calibration, most common risk patterns, data gaps, and a Decision Inbox.
- Weekly integration: the weekly calibration report includes `## Shadow Backtest Summary` so Hermes can see whether the radar is learning from older signals.

## Safety

- No broker access, orders, price targets, options, leverage, margin, or certainty language.
- Shadow outcomes cannot promote a candidate by themselves.
- Missing free market data must be visible as `unavailable`, not guessed.
- The report may say `review`, `calibrate`, or `archive review`; it must not say buy/sell/enter/exit.

## Acceptance Criteria

- Tests prove snapshots are appended without duplicates.
- Tests prove due snapshots get deterministic outcome labels.
- Tests prove missing price data is treated as unavailable.
- Daily runs write the shadow ledger and report.
- Weekly reports include `Shadow Backtest Summary`.
- Daily/weekly prompts and Hermes skill mention the shadow backtest.
