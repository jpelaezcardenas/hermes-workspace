# Institutional Sell Pressure Radar Design - 2026-05-31

## Goal

Build a free, research-only Hermes radar that warns Chris when public filings suggest institutional sell pressure around US-listed equities, with special focus on the existing AI Stock Radar watchlist and large institutional firms worldwide.

The radar must not create trading instructions. It only creates review labels, evidence summaries, gaps, and Decision Inbox items.

## Current Stock Job Alignment

Existing stock jobs:

- `AI_STOCK_RADAR_DAILY`: weekdays at 09:35 Europe/Berlin.
- `AI_STOCK_DEEPDIVE_WEEKLY`: Sundays at 16:30 Europe/Berlin.

New job:

- `INSTITUTIONAL_SELL_PRESSURE_DAILY`: weekdays at 09:50 Europe/Berlin.

Reason: it runs in the same morning block as the AI Stock Radar but after the AI watchlist refresh, so the sell-pressure report can reuse the latest tickers and remain easy to scan.

## Scope

Phase 1 monitors:

- US-listed companies from `projects/ai-stock-radar/watchlist.json`.
- Optional extra US tickers in `projects/institutional-sell-radar/watchlist.json`.
- Large global institutional managers and beneficial owners when they appear in public SEC filings.

It does not attempt full-market coverage yet. Full-market 13F coverage is a later expansion because it requires larger filing ingestion, CUSIP mapping, amendment de-duplication, and compute budgeting.

## Public Sources

Approved free sources:

- SEC EDGAR Submissions API and filing documents.
- SEC `13F-HR` / `13F-HR/A` for quarterly institutional holdings.
- SEC `SC 13D`, `SC 13D/A`, `SC 13G`, `SC 13G/A` for beneficial ownership changes.
- SEC `4` for insider and 10 percent holder activity.
- SEC `N-PORT` structured data as slower fund-holding context.
- FINRA daily short-sale volume and twice-monthly short interest as pressure context.
- Existing free Stooq price/volume sensor when available.

## Important Data Limits

- 13F is delayed quarterly data and can be filed up to 45 days after quarter end.
- 13F does not cover all securities and does not reveal intraday selling.
- 13D/13G is more timely for 5 percent beneficial owners, but it is threshold-based.
- Form 4 is timely for insiders and 10 percent holders, not all institutions.
- FINRA daily short-sale volume is not the same as short interest or institutional selling.
- Missing or delayed data must reduce confidence.

## Data Model

`projects/institutional-sell-radar/watchlist.json`

- `version`
- `updated_at`
- `focus`
- `extra_tickers`
- `source_limits`

`projects/institutional-sell-radar/holder-ledger.json`

- immutable observations by ticker/date/source/form/accession/holder
- previous/current share counts when known
- parsed filing labels
- confidence and latency labels

`projects/institutional-sell-radar/sell-pressure-memory.json`

- alert history
- false-positive notes
- repeated issuer risk patterns
- review outcomes

## Candidate Signal

Each ticker receives `institutional_sell_pressure`:

- `risk_level`: `INFO`, `WATCH`, `WARNING`, or `CRITICAL_REVIEW`
- `review_action`: `SELL_PRESSURE_MONITOR`, `SELL_PRESSURE_REVIEW`, `SELL_PRESSURE_ESCALATE`, or `SELL_PRESSURE_ARCHIVE_REVIEW`
- `score`: 0-100
- `evidence`: 13F, 13D/G, Form 4, FINRA, price/volume, risk filing context
- `source_latency`: `near_real_time`, `short_delay`, `quarterly_delayed`, `mixed`, or `unavailable`
- `data_quality`: `A`, `B`, `C`, or `D`
- `reasons`
- `gaps`

## Scoring

Base scoring:

- large top-holder reduction: +30
- multiple holder reductions: +20
- beneficial ownership reduction or 13D/G amendment: +25
- Form 4 sale by 10 percent holder or director/officer cluster: +15
- short pressure context: +10
- negative price/volume confirmation: +10
- dilution, delisting, going concern, weak cash runway, or offering risk: +15

Caps and gates:

- 13F-only alerts are capped at `WATCH` unless confirmed by a fresher signal.
- Missing price/volume context caps data quality at `B`.
- Missing filing documents caps data quality at `C`.
- Short-volume-only alerts stay `INFO`.

## Alert Rules

- `INFO`: score below 35 or only context signals.
- `WATCH`: score 35-59, delayed or partial sell-pressure evidence.
- `WARNING`: score 60-79 with at least two independent signal families.
- `CRITICAL_REVIEW`: score 80+ with beneficial-owner/insider/fresh filing evidence plus risk or price/volume confirmation.

Labels are research workflow labels only. They never mean sell, short, hedge, options, leverage, price targets, or broker action.

## Report

Daily report path:

`reports/institutional-sell-radar/institutional-sell-radar-YYYY-MM-DD.md`

Required sections:

- `# Institutional Sell Pressure Radar - YYYY-MM-DD`
- `## Kurzfazit`
- `## Existing Stock Job Alignment`
- `## New Warnings`
- `## Top Sell Pressure`
- `## 13F Ownership Changes`
- `## 13D/13G Alerts`
- `## Insider / 10 Percent Holder Activity`
- `## Short Pressure Context`
- `## Price/Volume Confirmation`
- `## False Positive Checks`
- `## Datenqualitaet Und Luecken`
- `## Decision Inbox`

## Safety

- No broker access.
- No automatic trades.
- No options, leverage, margin, shorting workflow, or real-money workflow.
- No certainty language.
- Every alert must state data latency and source limits.
- `CRITICAL_REVIEW` means urgent human research review, not an action to sell.

