# AI Stock Radar Alpha Memory Design

## Goal

Add a research-only learning layer to Hermes' AI Stock Radar. The layer records hypotheses over time, detects contradictions in current candidates, and builds catalyst timelines so Hermes can tell whether a setup is early, late, contradicted, or still worth monitoring.

## Scope

This upgrade implements the next S-tier set:

- Alpha Memory Engine
- Contradiction Detector
- Catalyst Timeline

The layer does not create buy, sell, hold, broker, options, leverage, margin, alert, target-level, or certainty workflows. It creates learning and review labels only.

## Architecture

A new module `scripts/ai-stock-radar-alpha-memory.mjs` owns candidate-level learning labels, contradiction detection, catalyst timeline construction, memory state updates, summaries, and report rendering. The daily free-source engine applies it after Thesis Intelligence, writes `projects/ai-stock-radar/alpha-memory.json`, writes a companion report, then runs CEO audit. Weekly calibration reads attached `alpha_memory` fields and summarizes learning labels, contradiction severities, timeline timing labels, and assessed outcomes.

## Data Contract

Every watchlist candidate receives:

```json
{
  "alpha_memory": {
    "version": 1,
    "hypothesis_label": "TRACK_HYPOTHESIS",
    "memory_action": "ALPHA_TRACK",
    "learning_score": 0,
    "contradiction_detector": {
      "severity": "none",
      "labels": [],
      "reasons": []
    },
    "catalyst_timeline": {
      "timing_label": "watch",
      "events": [],
      "reasons": []
    },
    "reasons": []
  }
}
```

The persistent state file is:

```json
{
  "version": 1,
  "snapshots": [],
  "assessments": []
}
```

## Labels

Allowed `hypothesis_label` values:

- `TRACK_HYPOTHESIS`
- `WATCH_ONLY`
- `CONTRADICTION_REVIEW`
- `RISK_PATTERN`

Allowed `memory_action` values:

- `ALPHA_TRACK`
- `ALPHA_MONITOR`
- `ALPHA_CONTRADICTION_REVIEW`
- `ALPHA_RISK_ARCHIVE`

Allowed contradiction severities:

- `none`
- `watch`
- `serious`
- `critical`

Allowed catalyst timing labels:

- `fresh_catalyst`
- `watch`
- `late_or_risk`
- `stale_or_thin`

Allowed memory assessment outcomes:

- `pending`
- `constructive`
- `risk_confirmed`
- `false_positive`
- `inconclusive`
- `unavailable`

## Rules

Alpha Memory creates one immutable snapshot per ticker and date. It stores idea grade, score, category, thesis verdict, advanced label, price context, risk labels, contradiction severity, and catalyst timing. Existing ticker/date snapshots are not duplicated.

Memory assessments compare due snapshots against the current watchlist after 7, 30, and 90 day horizons. A later broken thesis, risk trap, or critical contradiction confirms risk. Constructive outcomes require positive price context and no critical current risk. Missing comparison data stays `unavailable` or `pending`.

Contradiction Detector searches for conflicts such as:

- AI story but missing AI revenue proof;
- customer or partnership wording without hard filing proof;
- strong positive narrative with offering, warrants, dilution, delisting, or reverse-split risk;
- positive price context with broken thesis or reality risk;
- Banger/confirmed labels contradicted by broken thesis.

Catalyst Timeline builds a compact ordered event list from last checked date, filing catalyst, Evidence Firewall, Advanced Signals, Thesis Intelligence, price/volume context, and risk events. It classifies whether the setup has a fresh catalyst, is only watchable, is late/risky, or is stale/thin.

## Reports

Daily main report gains `## Alpha Memory`.

Daily companion report:

```markdown
# AI Stock Radar Alpha Memory - YYYY-MM-DD
## Hypothesis Memory
## Contradiction Detector
## Catalyst Timeline
## Memory Assessments
## Decision Inbox
```

Weekly calibration report gains `## Alpha Memory Summary`.

CEO audit verifies the module, daily prompt, weekly prompt, daily report, weekly report, companion report, memory file, and watchlist candidate field.

## Safety

- Alpha Memory labels are learning labels only.
- `TRACK_HYPOTHESIS` means "track this research hypothesis", not a real-money action.
- Contradictions override positive research labels for learning priority.
- A constructive memory outcome is calibration evidence, not a recommendation.
- Missing comparison data must remain a gap and must not improve conviction.

## Acceptance Criteria

- Every daily watchlist candidate has `alpha_memory`.
- Daily report includes `## Alpha Memory`.
- Daily run writes `alpha-memory.json` and `ai-stock-alpha-memory-YYYY-MM-DD.md`.
- Weekly report includes `## Alpha Memory Summary`.
- CEO audit fails if module, artifacts, prompts, reports, memory state, or candidate fields are missing.
- Tests cover snapshot creation, no duplicate snapshots, due assessments, contradiction detection, catalyst timelines, summaries, report safety, and integration.
