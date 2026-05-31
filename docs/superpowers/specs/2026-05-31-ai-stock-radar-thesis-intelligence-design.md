# AI Stock Radar Thesis Intelligence Design

## Goal

Add a research-only Thesis Intelligence layer to Hermes' AI Stock Radar. The layer must make candidate theses harder to fool by building an explicit thesis graph, detecting negative catalysts, and checking whether AI exposure has any revenue reality behind it.

## Scope

This upgrade implements the CEO top three:

- Thesis Graph
- Negative Catalyst Detector
- AI Revenue Reality Check

The layer does not create buy, sell, hold, broker, options, leverage, margin, alert, target-level, or certainty workflows. It is a quality-control layer before candidate conviction.

## Architecture

A new module `scripts/ai-stock-radar-thesis-intelligence.mjs` owns thesis intelligence classification, summaries, and report rendering. The daily free-source engine applies it after Advanced Signals, writes a companion report, then runs the CEO audit. Weekly calibration reads the attached `thesis_intelligence` fields and summarizes verdicts, negative catalysts, and AI revenue reality labels.

## Data Contract

Every watchlist candidate receives:

```json
{
  "thesis_intelligence": {
    "version": 1,
    "thesis_verdict": "WATCH_THESIS",
    "research_action": "THESIS_MONITOR",
    "confidence_score": 0,
    "graph": {
      "thesis": [],
      "evidence": [],
      "risks": [],
      "counter_evidence": [],
      "gaps": []
    },
    "negative_catalysts": {
      "severity": "none",
      "labels": [],
      "reasons": []
    },
    "ai_revenue_reality": {
      "label": "unknown",
      "score": 0,
      "reasons": []
    },
    "reasons": []
  }
}
```

## Labels

Allowed `thesis_verdict` values:

- `THESIS_CONFIRMED_REVIEW`
- `WATCH_THESIS`
- `WEAK_THESIS`
- `BROKEN_THESIS`

Allowed `research_action` values:

- `THESIS_DEEPEN_REVIEW`
- `THESIS_MONITOR`
- `THESIS_RISK_REVIEW`
- `THESIS_ARCHIVE_REVIEW`

Allowed `negative_catalysts.severity` values:

- `none`
- `watch`
- `serious`
- `critical`

Allowed `ai_revenue_reality.label` values:

- `verified_ai_revenue`
- `product_core_no_revenue_split`
- `ai_context_only`
- `marketing_only`
- `unknown`
- `reality_risk`

## Rules

The Thesis Graph must separate:

- thesis claims;
- evidence;
- risks;
- counter-evidence;
- gaps.

Negative Catalyst Detector must identify and rank dilution, warrants, offering activity, weak cash runway, going concern, reverse split, delisting, shell/SPAC, security-structure, revenue decline, and name-only AI risks before any positive thesis upgrade.

AI Revenue Reality Check must not treat AI wording as business reality. It can only label `verified_ai_revenue` when available public facts indicate AI revenue, AI segment support, material agreement, or hard customer context. Otherwise it must distinguish product-core context from marketing-only or unknown context.

## Reports

Daily main report gains `## Thesis Intelligence`.

Daily companion report:

```markdown
# AI Stock Radar Thesis Intelligence - YYYY-MM-DD
## Thesis Verdicts
## Negative Catalysts
## AI Revenue Reality
## Thesis Graph Gaps
## Decision Inbox
```

Weekly calibration report gains `## Thesis Intelligence Summary`.

CEO audit verifies the module, daily prompt, weekly prompt, daily report, weekly report, companion report, and watchlist candidate fields.

## Safety

- Thesis verdicts are research quality labels only.
- `THESIS_CONFIRMED_REVIEW` means the thesis deserves deeper human review, not any real-money action.
- Negative catalysts override positive thesis labels.
- Missing revenue proof is a gap, not a bullish assumption.
- Name-only AI is always a reality risk.

## Acceptance Criteria

- Every daily watchlist candidate has `thesis_intelligence`.
- Daily report includes `## Thesis Intelligence`.
- Companion thesis report is written after every daily run.
- Weekly report includes `## Thesis Intelligence Summary`.
- CEO audit fails if thesis module, artifacts, prompts, reports, or watchlist fields are missing.
- Tests cover confirmed theses, broken theses, negative catalyst severity, AI revenue reality labels, summaries, report safety, and integration.
