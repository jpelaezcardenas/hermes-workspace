# AI Stock Radar Live Discovery Design

Date: 2026-05-30
Status: implementing
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

Phase 3 moves `AI_STOCK_RADAR` from seed-first scoring to free live discovery. The daily run should try public live sources first, normalize them into the same evidence contract used by Phase 2, and fall back to `free-source-seeds.json` only when live discovery is unavailable or produces no AI-relevant candidates.

The implementation remains read-only and conservative. It does not use broker access, paid APIs, trade alerts, or certainty language. It also does not infer price momentum from incomplete data.

## Official Source Basis

- SEC EDGAR APIs on `data.sec.gov` provide JSON submissions and XBRL company data without authentication or API keys.
- SEC submissions are available at `https://data.sec.gov/submissions/CIK##########.json` using a 10-digit CIK with leading zeroes.
- SEC data APIs are updated throughout the day and bulk files are republished nightly.
- Nasdaq Trader symbol directory files include `nasdaqlisted.txt` and `otherlisted.txt`; their field definitions include symbol, security name, exchange/listing metadata, ETF/test flags, and file creation timestamps.

## Design

### Components

- `scripts/ai-stock-radar-live-discovery.mjs`
  - Fetches and parses Nasdaq symbol-directory files.
  - Fetches SEC company tickers and selected SEC submissions.
  - Infers AI relevance from public company/security names, seed overlays, and recent filing context.
  - Converts live records into Phase 2 evidence records.
  - Returns structured source status and fallback reasons.

- `scripts/ai-stock-radar-live-discovery.test.mjs`
  - Uses fixtures and injected fetchers, not network calls.
  - Covers Nasdaq parsing, SEC ticker normalization, SEC submissions mapping, AI relevance inference, fallback behavior, and safety boundaries.

- `scripts/ai-stock-radar-free-signal-engine.mjs`
  - Gains a `discoveryMode` option: `live`, `seed`, or `auto`.
  - In `auto`, it tries live discovery first and falls back to seeds if needed.

### Live Discovery Flow

1. Fetch Nasdaq-listed and other-listed symbol directory text.
2. Parse common stocks and ADR-like listed equities; exclude ETFs, test issues, funds, warrants, units, and obvious non-operating securities.
3. Fetch SEC company ticker mapping.
4. Join Nasdaq symbols with SEC CIKs by ticker.
5. Select AI-relevant candidates using:
   - Company/security name keyword matches.
   - Seed overlay themes for known AI names.
   - Recent SEC filing forms from submissions JSON.
6. Fetch submissions only for a capped candidate set to respect free-source load.
7. Produce normalized evidence records with source URLs and data-quality markers.
8. If live discovery fails, report the failure and use seed records as fallback.

## Safety And Limits

- Default live submission fetch cap: 25 tickers per run.
- Default live candidate output cap: 20 records.
- SEC requests must include a clear User-Agent.
- Live discovery failure is a data-quality condition, not a silent success.
- `market_momentum` remains capped because live discovery still does not provide reliable free price data.
- `SOFORT_MACHEN` remains `nichts`.

## Acceptance Criteria

- Tests cover live parsing and fallback without internet access.
- A CLI run can generate a daily report in `auto` mode.
- The report states whether live discovery or seed fallback was used.
- The daily prompt tells Neva to run live discovery in auto mode.
- Existing cron schedules and IDs remain unchanged.
