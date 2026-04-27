# Difficulty Log

## Purpose
Track RFP Forge difficulty level per training exercise. Post-mortem adjusts difficulty based on Bid Manager performance.

## Difficulty Levels
- **Easy:** Straightforward requirements, single asset class, familiar geography, generous timeline
- **Medium:** Multi-asset, specific integration requirements, regulatory complexity, realistic timeline
- **Hard:** Edge cases, trick questions, multi-jurisdictional, tight timeline, unusual asset classes
- **Expert:** Adversarial requirements designed to expose specific weak spots, conflicting regulatory demands, unrealistic but plausible constraints

## Log

| Date | Exercise | Persona | Difficulty | BM Score | Next Difficulty | Reason |
|------|----------|---------|------------|----------|-----------------|--------|
| (starts with training crons) | | | | | | |

## Progression Rules
- Start at Medium
- Score > 42/50 → increase difficulty
- Score 35-42 → maintain, shift focus to weak dimensions
- Score < 35 → decrease difficulty, focus on fundamentals
- After 3 consecutive "Hard" scores > 40 → unlock Expert
