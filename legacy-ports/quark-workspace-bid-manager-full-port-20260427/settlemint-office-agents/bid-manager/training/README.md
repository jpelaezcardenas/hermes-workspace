# Bid Manager Training System

## Overview

Automated daily training loop where **Bid Manager** writes and **Bid Checker** evaluates. The system runs exercises on a fixed schedule, producing scored output that improves content quality over time through iterative feedback.

## How It Works

Each exercise follows a **write → review → rewrite** loop:

1. **Loop 1**: Bid Manager generates content based on the exercise brief. Bid Checker scores it (0–100) with specific feedback.
2. **Loop 2**: Bid Manager rewrites incorporating all feedback. Bid Checker re-scores.
3. **Loop 3** *(conditional)*: If Loop 2 score is **< 40**, a third pass runs. If score is ≥ 40, the exercise closes after Loop 2.

Each loop produces a versioned output file. The Bid Checker's scoring rubric covers accuracy, completeness, DALP alignment, tone, and actionability.

## Exercise Types

### 1. Content Refresh
Re-read DALP codebase source directories and rewrite bid content sections to reflect current capabilities. Catches drift between what the code does and what proposals claim.

- **Loops**: 2
- **Source**: Mapped codebase directories (see `exercise-library.md`)

### 2. Mock RFI Drill
Generate a realistic RFI from a scenario brief, then write a full response. Tests end-to-end proposal capability under realistic conditions.

- **Loops**: 3
- **Source**: 8 scenario briefs covering CBDC, post-trade, CSD, commodities, real estate, PE funds, sukuk, and cross-border remittance

### 3. Asset Class Deep-Dive
Write comprehensive DALP coverage for a specific asset class, covering tokenization mechanics, lifecycle events, compliance, and integration points.

- **Loops**: 3
- **Source**: 7 asset classes with specific DALP aspects to address

## Output Structure

```
training/
├── README.md              ← this file
├── scorecard.md           ← cumulative score tracking
├── schedule.md            ← daily/weekly schedule
├── exercise-library.md    ← all exercise briefs and source mappings
└── runs/
    └── YYYY-MM-DD/
        ├── exercise-name-v1.md   ← Loop 1 output
        ├── exercise-name-v1-review.md
        ├── exercise-name-v2.md   ← Loop 2 output
        ├── exercise-name-v2-review.md
        └── exercise-name-v3.md   ← Loop 3 (if triggered)
```

## Scoring

All scores are logged in `scorecard.md`. The Bid Checker evaluates on:

| Criterion | Weight |
|-----------|--------|
| Technical accuracy (verified against DALP codebase) | 30% |
| Completeness (all required aspects addressed) | 25% |
| Clarity & tone (professional, no overselling) | 20% |
| Actionability (could be dropped into a real proposal) | 15% |
| DALP differentiation (what makes this platform-specific) | 10% |

## Schedule

See `schedule.md` for the full 4-week rotation. Morning exercises (10:00) are lighter (2 loops). Afternoon exercises (14:00) are intensive (3 loops). Saturdays include a weekly calibration review. Sundays push all improvements to git.

## Key Rules

- **No speculation**: All DALP claims must be verifiable against `~/dalp/` codebase
- **No overselling**: If a capability is roadmapped but not shipped, say so explicitly
- **Platform only**: No consulting or custom dev language. DALP is a platform product
- **Score < 40 = mandatory Loop 3**: Unacceptable quality gets one more chance
- **Every run is logged**: No silent failures, no skipped exercises without a note
