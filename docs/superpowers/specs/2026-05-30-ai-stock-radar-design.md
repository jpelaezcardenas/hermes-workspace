# AI_STOCK_RADAR Design

Date: 2026-05-30
Status: approved design, ready for implementation planning
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

`AI_STOCK_RADAR` is a read-only Hermes integration for finding, explaining, and tracking public-market AI stock candidates before they become obvious mainstream hype. It is not a trading bot and must not present market predictions as certainty. Its job is to create a daily radar report, maintain a structured watchlist, generate research dossiers for high-signal candidates, and feed one concise, safe next action into the Hermes Decision Inbox.

The integration follows Hermes' existing pattern: recurring jobs write Markdown reports, project state lives under `projects/`, and the daily control flow remains visible through `reports/decision-inbox/`.

## Goals

- Scan AI-related public equities on a daily cadence.
- Detect early candidates using multiple independent signals, not price movement alone.
- Maintain explicit categories: `Early Watch`, `Breakout Watch`, `Deep Dive`, `Overheated`, and `Avoid`.
- Generate short research dossiers for candidates that cross clear trigger rules.
- Make score changes, category changes, new risks, and data gaps visible.
- Write a Decision Inbox block with exactly one small safe next action.
- Preserve human approval gates for API costs, provider choices, broker access, purchases, options, leverage, and anything resembling investment advice.

## Non-Goals

- No automatic trading.
- No broker connection.
- No options, leverage, margin, or short-term trade execution.
- No language such as "buy now", "sure winner", or "will explode".
- No penny-stock, pump, Discord, or meme-signal workflow in the MVP.
- No paid data provider is selected automatically.
- No UI is required in the first phase.

## Hermes Placement

### Files And Directories

- Reports: `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/`
- Watchlist state: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`
- Dossiers: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/`
- Spec: `/Users/zondrius/hermes-workspace/docs/superpowers/specs/2026-05-30-ai-stock-radar-design.md`
- Existing Decision Inbox output: `/Users/zondrius/hermes-workspace/reports/decision-inbox/`

### Hermes Roles

- `finance`: market structure, stock candidates, scoring, valuation and financial risk.
- `research`: source quality, filings, news, public data provenance, data gaps.
- `ideas`: thesis clarity, catalyst quality, product/market narrative, hype risk.
- `neva`: integration, RiskGate, Decision Inbox, and final conservative wording.

`neva` remains the integrator. Finance can propose candidates, but Neva must keep the daily result cautious, auditable, and non-actionistic.

## Daily Job

Name: `AI_STOCK_RADAR_DAILY`

Recommended cadence: Monday to Friday at `09:35 Europe/Berlin`.

Cron expression for the Hermes profile schedule: `35 9 * * 1-5`

Purpose: Create a daily AI stock radar from the previous US trading day, overnight public information, current watchlist state, and configured public data sources.

Output:

- `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-YYYY-MM-DD.md`
- Updated `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`
- Up to 3 updated or new dossier files when dossier triggers fire.
- A Decision Inbox block at the end of the report.

Daily report shape:

```md
# AI Stock Radar - YYYY-MM-DD

## Kurzfazit
## Marktumfeld
## Top Kandidaten Heute
## Neue Auffaelligkeiten
## Watchlist Aenderungen
## Deep-Dive Kandidaten
## Overheated / Avoid
## Datenqualitaet Und Luecken
## Naechste Aktion

## Decision Inbox
- Signal: Green / Yellow / Red
- SOFORT_MACHEN:
- CHRIS_ENTSCHEIDET:
- BEOBACHTEN:
- SPAETER:
- BLOCKIERT:
- NICHT_TUN:
- Naechste kleinste Aktion:
- Beleg / Datei:
```

Daily rules:

- `SOFORT_MACHEN` contains at most one small safe action.
- `CHRIS_ENTSCHEIDET` contains API keys, paid providers, new data integrations, broker access, real purchases, options, leverage, and alerting that could be read as trade advice.
- `NICHT_TUN` explicitly blocks automatic trades and hype chasing.
- If data is missing, the report says so directly instead of estimating.
- If current market data is unavailable, the report is still written with `Signal: Yellow` and a clear data-quality note.

## Weekly Job

Name: `AI_STOCK_DEEPDIVE_WEEKLY`

Recommended cadence: Sunday at `16:30 Europe/Berlin`.

Cron expression for the Hermes profile schedule: `30 16 * * 0`

Purpose: Clean the watchlist, review the strongest candidates, document false positives, and improve dossier quality.

Weekly tasks:

- Review the top 3 to 5 watchlist candidates.
- Confirm, downgrade, or remove stale candidates.
- Check whether each `Deep Dive` still has a clear thesis and current catalyst.
- Record false positives and why the signal failed.
- Recommend at most one scoring adjustment, with evidence.
- Keep the watchlist from becoming a candidate graveyard.

Weekly output:

- `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-deepdive-YYYY-MM-DD.md`
- Updated `watchlist.json`
- Updated dossiers for candidates whose thesis materially changed.
- Decision Inbox block.

## Skill Contract

The new Hermes skill `ai-stock-radar` should force this order:

1. Load current watchlist.
2. Check configured data source availability.
3. Gather market, filing, news, and AI-sector context.
4. Score candidates.
5. Apply RiskGate and data-quality gates.
6. Update categories.
7. Create or refresh dossiers only when trigger rules fire.
8. Write daily or weekly report.
9. End with the Decision Inbox block.
10. Explicitly name tempting actions that should not be taken automatically.

The skill must require source transparency. A candidate can stay on the watchlist with weak data, but cannot become `Deep Dive` from weak data alone.

## Data Sources

The MVP is provider-neutral. It should begin with clean, public or explicitly approved sources and avoid fragile scraping.

Baseline public sources:

- SEC EDGAR APIs and bulk data for filings, company facts, and submissions.
- Nasdaq symbol directory for public symbol universe checks.
- FINRA public data where useful, interpreted cautiously.

Optional market/news providers, only after `CHRIS_ENTSCHEIDET`:

- Alpha Vantage.
- Massive/Polygon.
- Another approved provider with documented terms, costs, and rate limits.

Source rules:

- SEC access must use a compliant User-Agent and fair request rate.
- Paid or key-based providers are not silently enabled.
- A signal from an unreliable source can be mentioned but cannot drive promotion.
- Data source failures are reportable state, not hidden implementation details.

Reference pages for implementation planning:

- SEC EDGAR APIs: `https://www.sec.gov/search-filings/edgar-application-programming-interfaces`
- SEC Developer Resources: `https://www.sec.gov/about/developer-resources`
- Nasdaq Symbol Directory: `https://www.nasdaqtrader.com/trader.aspx?id=symbollookup`
- FINRA Data: `https://www.finra.org/finra-data`
- FINRA Developer Center: `https://developer.finra.org/docs`
- Alpha Vantage documentation: `https://www.alphavantage.co/documentation/`
- Massive/Polygon stock API documentation: `https://massive.com/docs/rest/stocks/overview`

## Candidate Universe

The initial universe should be US-listed equities and ADRs connected to AI themes:

- Semiconductors and AI accelerators.
- Datacenter infrastructure.
- Cloud and enterprise AI software.
- Robotics and automation.
- Cybersecurity with AI product exposure.
- AI healthcare and drug discovery.
- Energy, grid, and cooling companies connected to AI infrastructure.
- Data platforms, model infrastructure, and developer tooling companies where public-equity exposure exists.

The universe should exclude:

- Illiquid penny stocks in the MVP.
- OTC-only names unless explicitly approved later.
- Names whose AI exposure is only marketing language.
- Social-media pump candidates without public-company substance.

## Scoring

Maximum score: 100.

- `AI relevance` 0-20: AI is core to the business, not a loose buzzword.
- `Catalyst` 0-20: contract, earnings, guidance, launch, large customer, chip/datacenter link, regulatory or infrastructure tailwind.
- `Market momentum` 0-20: relative strength, volume change, sector rotation, price action near important levels.
- `Earliness` 0-15: signal is not already fully played out or parabolic.
- `Fundamental quality` 0-15: revenue growth, margins, cash, debt, dilution, business durability.
- `Signal breadth` 0-10: multiple independent source types confirm the thesis.

The daily report must show the reason for each high score. A score without explanation is invalid.

## Categories

- `Early Watch`: score is usually 55 or higher; interesting, but not enough evidence for a deep dive.
- `Breakout Watch`: score is usually 70 or higher; multiple signals are aligning.
- `Deep Dive`: score is 75 or higher, has data quality `A` or `B`, and has a clear current thesis or catalyst. Other dossier triggers may create or refresh a dossier, but they do not automatically assign `Deep Dive` when data quality is weak.
- `Overheated`: momentum is strong, but the move looks late, parabolic, or detached from new evidence.
- `Avoid`: weak substance, poor data, extreme dilution, meme/pump behavior, unclear AI exposure, or unacceptable risk.

Category changes must be written explicitly:

- New candidate.
- Score increased materially.
- Score decreased materially.
- New catalyst.
- New risk.
- `Early Watch` to `Breakout Watch`.
- `Breakout Watch` to `Deep Dive`.
- Any category to `Overheated` or `Avoid`.

## Dossier Triggers

Create or refresh a dossier when at least one of these is true:

- Score is 75 or higher with data quality `A` or `B`.
- Score increased by 15 or more since the previous run.
- A new hard catalyst appears.
- Price, volume, and news all become unusual at the same time.
- A watchlist candidate changes category into `Deep Dive`, `Overheated`, or `Avoid`.

Do not create more than 3 dossiers in a daily run. If more triggers fire, rank by data quality, catalyst strength, and freshness.

Dossier creation is not the same as promotion. A candidate with data quality `C` or `D` may receive a cautionary dossier, for example after becoming `Overheated` or `Avoid`, but it cannot be promoted to `Deep Dive`.

Dossier shape:

```md
# TICKER - Company - YYYY-MM-DD

## Thesis
## Why AI-Relevant
## Catalyst
## Evidence
## Score Breakdown
## Risks
## What Would Prove This Wrong
## Data Quality
## Next Review Trigger
## Sources
```

## Watchlist Schema

`watchlist.json` should use a top-level object with metadata and candidate entries:

```json
{
  "version": 1,
  "updated_at": "2026-05-30",
  "provider_status": {
    "market_data": "not_configured",
    "filings": "available",
    "news": "not_configured"
  },
  "candidates": [
    {
      "ticker": "NVDA",
      "company": "NVIDIA Corp",
      "category": "Breakout Watch",
      "score": 82,
      "previous_score": 74,
      "data_quality": "B",
      "ai_relevance": 20,
      "catalyst": 18,
      "market_momentum": 17,
      "earliness": 10,
      "fundamental_quality": 12,
      "signal_breadth": 5,
      "thesis": "Short thesis in one sentence.",
      "top_risks": ["valuation", "overheated"],
      "last_checked": "2026-05-30",
      "next_action": "Refresh deep dive.",
      "sources": ["SEC", "approved-market-data-provider", "company-news"]
    }
  ]
}
```

Valid `data_quality` values:

- `A`: multiple independent, fresh, plausible sources.
- `B`: usable with some gaps.
- `C`: thin, stale, or single-source.
- `D`: not suitable for decisions.

Only `A` or `B` can trigger `Deep Dive`.

## Error Handling

- Market data unavailable: write report with `Signal: Yellow`; do not invent price or volume values.
- API limit reached: write the failure under `Datenqualitaet Und Luecken`; use `BLOCKIERT` only when the next run cannot proceed without user/provider action.
- Watchlist JSON invalid: do not overwrite it blindly; write a repair note and preserve the broken file for inspection.
- Conflicting data: mark `Datenkonflikt`; do not promote candidate from conflicted evidence.
- Source quality weak: keep signal as context only; do not use it for promotion.
- Dossier quota exceeded: report skipped dossier candidates in priority order.

## Decision Inbox Rules

Every report must end with:

```md
## Decision Inbox
- Signal: Green / Yellow / Red
- SOFORT_MACHEN: at most one small, safe, high-value next action; use `nichts` if none.
- CHRIS_ENTSCHEIDET: any human decision needed before action.
- BEOBACHTEN: useful signals to watch without acting now.
- SPAETER: useful but not this week.
- BLOCKIERT: real blockers only, with missing input or failing dependency.
- NICHT_TUN: tempting but noisy, risky, premature, or off-goal action to avoid.
- Naechste kleinste Aktion: one concrete next step or `keine`.
- Beleg / Datei: the main output file or source checked.
```

Finance-specific Decision Inbox constraints:

- `SOFORT_MACHEN` cannot be a trade.
- `CHRIS_ENTSCHEIDET` must include any paid data provider, API key, broker setup, real-money action, leverage, or options workflow.
- `NICHT_TUN` must explicitly warn against automatic trades and hype chasing.
- If the system has weak data, the Decision Inbox should say that directly.

## Rollout

Phase 1: Report-only

- Create skill, directories, report contract, watchlist schema, and dry-run daily report.
- No paid provider.
- No UI.
- No trading language.

Phase 2: Data provider stabilization

- Choose and configure a market/news provider only after `CHRIS_ENTSCHEIDET`.
- Document cost, limits, terms, and fallback behavior.
- Keep SEC/Nasdaq/FINRA as public baseline sources.

Phase 3: Dossier quality

- Improve thesis templates, risk language, source summaries, and competitor context.
- Track false positives and stale candidates.

Phase 4: Hermes Cockpit UI

- Add watchlist and dossier browsing to the Hermes UI only after report-only output is useful.
- UI shows scores, score deltas, category history, and data-quality badges.

Phase 5: Backtesting

- Add historical scoring and false-positive analysis.
- Stronger signal language remains forbidden until backtesting has evidence.

## Verification Plan

Before the implementation is considered complete:

- Validate that `watchlist.json` parses as JSON.
- Run a dry report with no market-data provider configured and confirm it writes a Yellow report instead of failing silently.
- Confirm a report contains all required sections.
- Confirm the Decision Inbox contains exactly one `SOFORT_MACHEN` item or `nichts`.
- Confirm `Deep Dive` cannot be assigned with data quality `C` or `D`.
- Confirm no report uses forbidden certainty or buy/sell language.
- Confirm at most 3 dossiers are created in one daily run.
- Confirm existing Hermes reports and unrelated workspace files are not modified.

Two-week operational success criteria:

- Daily reports appear on trading days.
- Watchlist does not grow without pruning.
- Every `Deep Dive` has thesis, catalyst, risks, and sources.
- `Overheated` and `Avoid` candidates are visible, not hidden.
- False positives are documented in weekly reviews.
- Data gaps are explicit and actionable.

## Implementation Planning Notes

The first implementation plan should be narrow:

1. Create `ai-stock-radar` skill text.
2. Create directories and empty initial `watchlist.json`.
3. Add a read-only report generator or Hermes job prompt.
4. Add a dry-run daily report using provider status, source placeholders, and no paid APIs.
5. Add validation checks for watchlist JSON and report structure.
6. Add job definitions only after a dry run proves report output.

Broker integration, alerting, UI, paid providers, and backtesting are later phases.
