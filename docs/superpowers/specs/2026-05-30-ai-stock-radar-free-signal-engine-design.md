# AI Stock Radar Free Signal Engine Design

Date: 2026-05-30
Status: approved by direction, implementing
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

Phase 2 turns `AI_STOCK_RADAR` from a dry-run report shell into a free-source signal engine. It still avoids broker access, trade execution, paid APIs, and certainty language. The engine uses public evidence first: SEC filing metadata and XBRL facts where available, Nasdaq symbol-directory data for listed-stock eligibility, and FINRA public datasets as optional risk context.

The first implementation stays deterministic and testable. Live fetching is optional and isolated behind connector functions, while the scoring engine accepts normalized evidence records. This lets Hermes run daily even when one free source is slow, blocked, or unavailable.

## Official Source Constraints

- SEC EDGAR APIs on `data.sec.gov` provide JSON submissions and XBRL data without authentication or API keys. SEC also publishes nightly bulk ZIP files for efficient large downloads.
- SEC automated access must use a clear User-Agent and respect fair access behavior.
- Nasdaq Trader symbol-directory files define Nasdaq-listed and other exchange-listed securities. They are suitable for listed-universe checks, not investment ranking by themselves.
- FINRA Data API exposes metadata and data endpoints for public market datasets. Some endpoints are public, while some request patterns require authorization; missing FINRA access must be reported as a data gap, not silently treated as negative evidence.

Reference pages checked on 2026-05-30:

- `https://www.sec.gov/search-filings/edgar-application-programming-interfaces`
- `https://www.sec.gov/about/developer-resources`
- `https://www.nasdaqtrader.com/trader.aspx?id=symboldirdefs`
- `https://developer.finra.org/docs`

## Design

### Components

- `scripts/ai-stock-radar-free-signal-engine.mjs`
  - Normalizes public-source evidence into candidate objects.
  - Scores candidates with the Phase 1 score contract.
  - Applies free-source data-quality gates.
  - Renders a daily report that names which public sources were available.

- `scripts/ai-stock-radar-free-signal-engine.test.mjs`
  - Covers source normalization, score calculation, data-quality rules, report safety, and no-paid-provider behavior.

- `projects/ai-stock-radar/free-source-seeds.json`
  - Conservative seed universe for Phase 2. This is not a recommendation list. It exists so the daily free-source job can run deterministically before live universe discovery is broadened.

- `projects/ai-stock-radar/prompts/daily.md`
  - Updated so Neva runs the free signal engine first and only uses paid-provider language as a blocked future option.

### Data Flow

1. Load the seed universe and current watchlist.
2. Collect normalized evidence records from available public sources.
3. Reject OTC-only, penny-stock-like, or unlisted records unless explicitly allowed later.
4. Score each candidate:
   - AI relevance: public AI exposure from filing text, company description, or seed theme.
   - Catalyst: recent filing forms, hard event labels, contract/product/regulatory evidence.
   - Market momentum: remains capped without free reliable price data.
   - Earliness: penalizes overheated/hype flags and already-late signals.
   - Fundamental quality: only uses public XBRL/SEC fact availability when present.
   - Signal breadth: rewards independent source types.
5. Classify candidates using Phase 1 categories.
6. Write report and update watchlist without any trade action.

### Safety Rules

- No candidate can become `Deep Dive` without `A` or `B` data quality.
- Without reliable free market-price data, `market_momentum` is capped at 8.
- Missing FINRA or market data produces `Signal: Yellow`.
- `SOFORT_MACHEN` remains `nichts`; candidate review belongs in `BEOBACHTEN`.
- The report must not include trade commands, certainty language, or claims that a stock will move.

## Phase 2 Acceptance Criteria

- Tests pass for the free signal engine and Phase 1 dry-run safety.
- A deterministic free-source daily report can be generated without API keys.
- The report includes at least one candidate when seed evidence is available.
- The watchlist schema remains compatible with Phase 1.
- The daily prompt tells Hermes to use public sources first and to report data gaps.
- Existing cron job IDs and schedules remain unchanged.
