# Post-Mortem Protocol

## Purpose
After every review cycle (training or live), automatically propagate learnings across all three agents. This is what turns "three agents running" into "a system that gets smarter."

## Trigger
Run after every completed review cycle (Bid Checker has scored a Bid Manager response).

## Steps

### Step 1: Extract Lessons from Review
Read the Bid Checker's output. For each dimension scored below 4/5:
- Extract the specific criticism
- Extract the suggested fix
- Categorize: writing quality | technical accuracy | structure | coverage | honesty | IP | differentiation | client focus | visuals

### Step 2: Update Bid Manager Lessons
Append extracted lessons to `feedback/lessons.md` with:
- Date
- Source (training exercise or live bid)
- Dimension
- Finding
- Fix applied (or fix needed)

### Step 3: Update Content Sections (if applicable)
If the review found factual errors or missing DALP capabilities in specific content sections:
- Identify which `content/XX-*/main.md` file needs updating
- Log the needed update in `feedback/content-updates-queue.md`
- If it's a simple factual correction, apply it directly

### Step 4: Update RFP Forge Difficulty (training mode only)
Read the Bid Checker's score. Feed back to RFP Forge:
- If score > 42/50: Next exercise should increase difficulty (more edge cases, stricter requirements, trick questions)
- If score 35-42: Maintain current difficulty but shift to weak dimensions
- If score < 35: Reduce difficulty but focus on the specific weak areas

Track difficulty progression in `training/difficulty-log.md`.

### Step 5: Update Win Themes (if pattern emerges)
If 3+ reviews in a row flag the same dimension as weak:
- Flag it in `feedback/win-loss-tracker.md` under patterns
- Consider updating `setup/win-themes.md` if the weakness is in competitive differentiation

### Step 6: Update Scenario Diversity Log
Log which RFP Forge scenario was used (persona, geography, asset class, document type) in `training/scenario-log.md` to prevent repetition.

## Automation
The afternoon training cron should execute this protocol after each review loop. The sequence is:
1. RFP Forge generates an RFP
2. Bid Manager writes a response
3. Bid Checker scores it
4. **This post-mortem runs** (Steps 1-6)
5. Bid Manager rewrites based on feedback
6. Bid Checker re-scores
7. **Post-mortem runs again** (captures improvement delta)

## Files Updated by Post-Mortem
- `feedback/lessons.md`: new lessons appended
- `feedback/content-updates-queue.md`: factual corrections needed
- `feedback/win-loss-tracker.md`: pattern updates (every 5 cycles)
- `training/difficulty-log.md`: difficulty progression
- `training/scenario-log.md`: diversity tracking
- `training/scorecard.md`: score recorded
