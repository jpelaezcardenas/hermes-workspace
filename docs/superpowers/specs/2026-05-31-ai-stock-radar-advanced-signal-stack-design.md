# AI Stock Radar Advanced Signal Stack Design

## Goal

Add a research-only Advanced Signal Stack to Hermes' AI Stock Radar so daily and weekly runs can separate promising AI-equity research candidates from hype, late moves, dilution traps, and weak evidence. The stack must improve ranking precision without creating real buy, sell, hold, options, leverage, margin, broker, alert, price-target, or certainty workflows.

## Scope

The Advanced Signal Stack adds eight explicit research components to every watchlist candidate:

- SEC Catalyst Decoder Pro
- Contract / Customer Proof Engine
- AI Basket Relative Strength
- Liquidity And Slippage Gate
- Insider / Institutional Context Hooks
- Thesis Invalidation Monitor
- Catalyst Calendar
- Explainable Banger Score

All labels are workflow or research labels only. `BANGER_CANDIDATE_REVIEW` means "highest-priority research review candidate", not a trade instruction.

## Architecture

A new module `scripts/ai-stock-radar-advanced-signals.mjs` owns all advanced component scoring, summary building, and companion report rendering. The daily free-source engine loads optional local context files, attaches `advanced_signals` to candidates after CEO Control and Entry Readiness, writes the main watchlist, writes the companion Advanced Signals report, then runs the CEO audit. Weekly calibration reads the already-attached `advanced_signals` fields and summarizes label counts.

Optional context files are local JSON hooks, not required live providers:

- `projects/ai-stock-radar/ai-basket-context.json` for benchmark return context.
- `projects/ai-stock-radar/ownership-context.json` for insider/institutional context.

Missing optional context must be labelled `unavailable` and must not be treated as bullish.

## Component Rules

SEC Catalyst Decoder Pro classifies filing context from `filing_events`, `evidence_firewall.positive_labels`, `evidence_firewall.risk_flags`, `quality_notes`, and recent filing labels. Material agreements, hard catalysts, major customers, or guidance changes can add positive score. Offerings, warrants, listing risk, going concern, reverse splits, shells, or security-structure risks subtract score and can hard-block promotion.

Contract / Customer Proof Engine distinguishes hard customer or contract evidence from soft customer context. Hard proof requires existing labels such as `material_agreement`, `contract_award`, `major_customer`, or `customer_expansion_watch`. Name-only AI or generic AI exposure does not count.

AI Basket Relative Strength compares the candidate's 20-day return from optional free price context against optional local basket context. Outperformance helps the research score. Underperformance hurts. Missing candidate return or missing basket data is `unavailable`.

Liquidity And Slippage Gate uses optional price/volume fields. Usable liquidity requires available price context and either healthy volume ratio or explicit latest volume. Thin, stretched, or unavailable context lowers confidence and cannot become a trade trigger.

Insider / Institutional Context Hooks read optional ownership context. Supportive context can slightly improve confidence, risk context can penalize, and unavailable context remains neutral.

Thesis Invalidation Monitor checks hard gates before any positive label: Evidence Firewall reject, CEO reject lane, `FAKE_AI_HYPE`, `TOO_RISKY`, severe risk flags, name-only AI, and Avoid/X outcomes. Invalidated theses produce `RISK_TRAP`.

Catalyst Calendar produces review windows from known filing dates or candidate `last_checked`. It does not predict future events. It only tells Hermes when to review the evidence again.

Explainable Banger Score combines component scores into a bounded 0-100 score with reasons. Hard risk gates override the score to `RISK_TRAP`.

## Labels

Allowed `advanced_signals.banger_label` values:

- `BANGER_CANDIDATE_REVIEW`
- `EARLY_BUT_THIN`
- `WAIT`
- `RISK_TRAP`

Allowed `advanced_signals.review_action` values:

- `ADVANCED_REVIEW`
- `ADVANCED_WAIT`
- `ADVANCED_RISK_REVIEW`
- `ADVANCED_ARCHIVE_REVIEW`

## Data Contract

Each candidate receives:

```json
{
  "advanced_signals": {
    "version": 1,
    "banger_score": 0,
    "banger_label": "WAIT",
    "review_action": "ADVANCED_WAIT",
    "components": {
      "sec_catalyst": {},
      "customer_proof": {},
      "relative_strength": {},
      "liquidity": {},
      "ownership": {},
      "thesis_invalidation": {},
      "catalyst_calendar": {}
    },
    "reasons": []
  }
}
```

## Reports

Daily main report gains `## Advanced Signal Stack`.

Daily companion report:

```markdown
# AI Stock Radar Advanced Signals - YYYY-MM-DD
## Banger Score
## Component Summary
## Risk Traps
## Review Queue
## Data Gaps
## Decision Inbox
```

Weekly calibration report gains `## Advanced Signal Summary`.

CEO audit must verify the module, daily prompt, weekly prompt, daily report, weekly report, companion report, and watchlist candidate field.

## Safety Rules

- No real buy, sell, hold, order, broker, options, leverage, margin, stop, target, or certainty language.
- The word `BANGER` is a research-review label only.
- Hard risk gates outrank every positive component.
- Missing optional data is a gap, not a positive input.
- Price/volume and relative strength are confidence context only.
- The stack must make false positives more visible before it raises any candidate's priority.

## Acceptance Criteria

- Every daily watchlist candidate has `advanced_signals`.
- The daily report includes `## Advanced Signal Stack`.
- The companion report is written after every daily run.
- The weekly report includes `## Advanced Signal Summary`.
- CEO audit passes only when advanced module, artifacts, prompts, reports, and watchlist fields are present.
- Tests cover positive research candidates, hard risk traps, name-only AI traps, missing optional context, summaries, reports, and integration.
