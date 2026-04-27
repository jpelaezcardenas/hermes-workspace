# Win/Loss Tracker

## How to Use
When a bid outcome is known (won, lost, shortlisted-not-selected, no-response), log it here with structured metadata. The Bid Manager must read this file during startup to learn from outcomes.

## Outcome Log

| Date | Client | Document Type | Outcome | Reviewer Score | Key Factor | Lesson |
|------|--------|--------------|---------|---------------|------------|--------|
| (template row) | (client name) | RFP/RFI/Questionnaire | Won/Lost/Shortlisted/No-Response | XX/50 | What made the difference | What to do differently |

## Win Pattern Analysis
(Updated after every 5 outcomes)

### What wins:
- (patterns extracted from Won outcomes)

### What loses:
- (patterns extracted from Lost outcomes)

### Score Correlation
- Average score of Won bids: --
- Average score of Lost bids: --
- Minimum score that has Won: --

## Standing Instructions
1. When Gyan or Roderik reports an outcome, log it immediately
2. After every 5th outcome, re-analyze win/loss patterns
3. Update `setup/win-themes.md` if patterns shift
4. Flag if Won bids score below 35/50 (calibration issue) or Lost bids score above 40/50 (rubric misalignment)
