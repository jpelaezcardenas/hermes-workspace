# AI Stock Radar Paper Portfolio And Readiness Design

## Goal

Add a research-only Paper Portfolio and Entry/Exit Readiness layer to Hermes' AI Stock Radar. The layer may simulate paper decisions, but it must not give real buy/sell instructions, price targets, broker actions, options, leverage, margin, or certainty language.

## Design

- Entry Readiness: each candidate receives a read-only decision label: `ENTRY_READY`, `WAIT_FOR_CONFIRMATION`, `TOO_RISKY`, `LATE_MOVE`, or `FAKE_AI_HYPE`.
- Exit Risk: each tracked paper position receives a read-only status: `THESIS_INTACT`, `THESIS_WEAKENING`, `EXIT_RISK_REVIEW`, or `ARCHIVE_REVIEW`.
- Paper Portfolio: Hermes stores simulated positions in `projects/ai-stock-radar/paper-portfolio.json`. A position opens only as `paper_open` when the candidate is entry-ready and has usable free price context. No real money action is implied.
- Paper Actions: allowed labels are `PAPER_ENTRY_REVIEW`, `PAPER_HOLD_REVIEW`, `PAPER_EXIT_REVIEW`, and `PAPER_ARCHIVE_REVIEW`.
- Reporting: daily runs write `reports/ai-stock-radar/ai-stock-paper-portfolio-YYYY-MM-DD.md` with open simulated positions, new paper reviews, exit-risk review, missing data, and a Decision Inbox.
- Weekly integration: weekly calibration includes `## Paper Portfolio Summary` so Hermes can compare paper actions with Shadow Backtest and false-positive memory.

## Entry Rules

`ENTRY_READY` requires:

- idea grade `S` or `A`;
- CEO lane `focus` or `monitor`;
- Evidence Firewall `pass`;
- price/volume status `available` and confirmation `positive`;
- source-confidence facts at least 3 and missing data 0;
- no severe risk flags such as delisting, going concern, reverse split, shell/SPAC, security structure, offering, dilution, cash runway, or name-only AI.

Otherwise:

- `FAKE_AI_HYPE` if name-only AI risk appears;
- `TOO_RISKY` if hard risk gates or reject/caution verdicts appear;
- `LATE_MOVE` if price/volume confirmation is `stretched`;
- `WAIT_FOR_CONFIRMATION` for plausible but incomplete candidates.

## Exit Rules

`EXIT_RISK_REVIEW` or `ARCHIVE_REVIEW` appears when a tracked paper position later receives reject/caution firewall verdicts, hard risk flags, unavailable thesis evidence, or meaningfully weak price context. `THESIS_INTACT` requires the original thesis not to be contradicted and no new hard risk gate.

## Safety

- No real buy/sell/hold recommendations.
- No brokerage, alerts with trade character, options, leverage, margin, or price targets.
- Paper decisions are only model-training and research workflow labels.
- Missing price or source data keeps the paper state conservative.

## Acceptance Criteria

- Tests prove Entry Readiness labels are deterministic.
- Tests prove paper positions open only for eligible candidates with price context.
- Tests prove exit-risk status changes when risk flags emerge.
- Daily runs write the paper portfolio and paper report.
- Weekly reports include Paper Portfolio Summary.
- Prompts, Hermes skill, and CEO audit include the paper layer.
