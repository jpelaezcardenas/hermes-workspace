# Training Schedule

## Week 1

| Day | 10:00 Exercise | 14:00 Exercise |
|-----|---------------|----------------|
| Mon | Content refresh: sections 1–2 (2 loops) | Mock RFI: CBDC. MR-1 (3 loops) |
| Tue | Content refresh: sections 3–4 (2 loops) | Asset class: equities. AC-1 (3 loops) |
| Wed | Content refresh: sections 5–6 (2 loops) | Mock RFI: exchange post-trade. MR-2 (3 loops) |
| Thu | Content refresh: sections 7–8 (2 loops) | Asset class: fixed income. AC-2 (3 loops) |
| Fri | IP stress test (2 loops) | Mock RFI: real estate tokenization. MR-5 (3 loops) |
| Sat | Asset class: commodities. AC-4 (3 loops) | Weekly calibration + lessons review |
| Sun | Git push all improvements | Rest |

## Week 2

Rotates to Mock RFIs 4–6, Asset classes 3–5.

| Day | 10:00 Exercise | 14:00 Exercise |
|-----|---------------|----------------|
| Mon | Content refresh: sections 1–2 (2 loops) | Mock RFI: commodity tokenization. MR-4 (3 loops) |
| Tue | Content refresh: sections 3–4 (2 loops) | Asset class: real estate. AC-3 (3 loops) |
| Wed | Content refresh: sections 5–6 (2 loops) | Mock RFI: PE fund tokenization. MR-6 (3 loops) |
| Thu | Content refresh: sections 7–8 (2 loops) | Asset class: fund units. AC-5 (3 loops) |
| Fri | IP stress test (2 loops) | Mock RFI: CSD digital twin. MR-3 (3 loops) |
| Sat | Asset class: structured products. AC-6 (3 loops) | Weekly calibration + lessons review |
| Sun | Git push all improvements | Rest |

## Week 3

Rotates to Mock RFIs 7–8, Asset classes 6–7.

| Day | 10:00 Exercise | 14:00 Exercise |
|-----|---------------|----------------|
| Mon | Content refresh: sections 1–2 (2 loops) | Mock RFI: Islamic finance sukuk. MR-7 (3 loops) |
| Tue | Content refresh: sections 3–4 (2 loops) | Asset class: structured products. AC-6 (3 loops) |
| Wed | Content refresh: sections 5–6 (2 loops) | Mock RFI: cross-border remittance. MR-8 (3 loops) |
| Thu | Content refresh: sections 7–8 (2 loops) | Asset class: carbon credits / ESG. AC-7 (3 loops) |
| Fri | IP stress test (2 loops) | Catch-up: lowest-scoring exercise from weeks 1–3 (3 loops) |
| Sat | Full scorecard review + trend analysis | Weekly calibration + lessons review |
| Sun | Git push all improvements | Rest |

## Week 4

Full rotation restart with updated content. All exercises repeat using improved baseline content from weeks 1–3.

| Day | 10:00 Exercise | 14:00 Exercise |
|-----|---------------|----------------|
| Mon | Content refresh: sections 1–2 (2 loops) | Mock RFI: CBDC. MR-1 (3 loops) |
| Tue | Content refresh: sections 3–4 (2 loops) | Asset class: equities. AC-1 (3 loops) |
| Wed | Content refresh: sections 5–6 (2 loops) | Mock RFI: exchange post-trade. MR-2 (3 loops) |
| Thu | Content refresh: sections 7–8 (2 loops) | Asset class: fixed income. AC-2 (3 loops) |
| Fri | IP stress test (2 loops) | Mock RFI: real estate tokenization. MR-5 (3 loops) |
| Sat | Month-end review: compare Week 1 vs Week 4 scores | Recalibrate exercise library based on learnings |
| Sun | Git push all improvements | Rest |

## Loop Rules

- **Morning exercises (10:00)**: 2 review loops (write → review → rewrite → final review)
- **Afternoon exercises (14:00)**: 3 review loops (write → review → rewrite → re-review → optional 3rd pass if Loop 2 score < 40)
- **IP stress test**: Bid Manager writes claims about DALP capabilities; Bid Checker verifies each against codebase. Any unverifiable claim is flagged and removed.

## Output

All exercise output goes to:

```
training/runs/YYYY-MM-DD/
```

Scores are logged in `training/scorecard.md` after each exercise completes.
