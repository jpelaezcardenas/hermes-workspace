# Stock Risk Commander Design - 2026-05-31

## Goal

Build a daily research-only commander that combines the AI Stock Radar and Institutional Sell Pressure Radar into one compact morning overview.

It should answer:

- Which candidates deserve research attention today?
- Which candidates are risky because institutional, filing, thesis, dilution, or price/volume signals conflict?
- Which items should be ignored because they are noise?
- What are the top 1-3 safe research actions?

It must not provide trade instructions.

## Schedule Alignment

Existing jobs:

- `AI_STOCK_RADAR_DAILY`: weekdays 09:35 Europe/Berlin.
- `INSTITUTIONAL_SELL_PRESSURE_DAILY`: weekdays 09:50 Europe/Berlin.
- `AI_STOCK_DEEPDIVE_WEEKLY`: Sundays 16:30 Europe/Berlin.

New job:

- `STOCK_RISK_COMMANDER_DAILY`: weekdays 10:00 Europe/Berlin.

Reason: it runs after the two daily stock radars and before the general Hermes control block, so Chris gets one consolidated stock-risk readout.

## Inputs

- `projects/ai-stock-radar/watchlist.json`
- `projects/institutional-sell-radar/holder-ledger.json`
- `projects/institutional-sell-radar/sell-pressure-memory.json`
- latest AI stock report under `reports/ai-stock-radar/`
- latest institutional sell-pressure report under `reports/institutional-sell-radar/`

## Output

Daily report:

`reports/stock-risk-commander/stock-risk-commander-YYYY-MM-DD.md`

Required sections:

- `# Stock Risk Commander - YYYY-MM-DD`
- `## Kurzfazit`
- `## Job Alignment`
- `## Combined Risk Board`
- `## Top Research Attention`
- `## Risk Overrides`
- `## Institutional Pressure Overlay`
- `## Noise / Ignore`
- `## Data Gaps`
- `## Max 3 Safe Actions`
- `## Decision Inbox`

## Scoring

Each candidate receives `commander_assessment`:

- `risk_posture`: `CLEAN_WATCH`, `RESEARCH_ATTENTION`, `RISK_REVIEW`, `IGNORE_NOISE`
- `commander_action`: `COMMANDER_MONITOR`, `COMMANDER_RESEARCH_REVIEW`, `COMMANDER_RISK_REVIEW`, `COMMANDER_IGNORE`
- `combined_score`: 0-100
- `attention_reasons`
- `risk_overrides`
- `data_gaps`

Positive research attention comes from:

- higher AI idea grade
- CEO focus/monitor lane
- Evidence Firewall pass
- clean Alpha Memory posture

Risk overrides come from:

- Evidence Firewall reject/caution
- CEO reject/manual_review
- Alpha Memory `RISK_PATTERN` or `CONTRADICTION_REVIEW`
- Thesis `BROKEN_THESIS`
- Institutional `WARNING` or `CRITICAL_REVIEW`
- severe issuer risks such as dilution, delisting, weak cash runway, offering, going concern, warrants

Risk overrides always dominate positive research signals.

## Safety

- No broker access.
- No automatic trades.
- No buy, sell, short, derivatives, leverage, margin, or real-money workflow.
- No price targets.
- No certainty language.
- All actions are research workflow labels only.
- `Max 3 Safe Actions` may contain only verification, review, archive-review, or data-quality actions.

