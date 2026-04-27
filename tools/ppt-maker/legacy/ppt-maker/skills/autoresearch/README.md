---
title: "Autoresearch for ppt-maker"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.700173Z
---

# Autoresearch for ppt-maker

This folder contains the autoresearch skill for autonomous self-optimization.

## Quick Start

When you want to optimize yourself, trigger with:

> "optimize this skill" / "improve yourself" / "run autoresearch"

## Before Running

You'll need to confirm with the user:

1. **Target skill**: Already set to this agent's SKILL.md
2. **Test inputs**: 3-5 diverse scenarios to test (user provides)
3. **Eval criteria**: 3-6 binary yes/no checks (user provides, or use defaults)
4. **Runs per experiment**: Default 5 (user can adjust)
5. **Budget cap**: Optional max experiments

## How It Works

1. Creates a baseline by running your current SKILL.md with test inputs
2. Scores outputs against binary evals
3. Makes ONE targeted mutation to fix failures
4. Re-runs and scores again
5. Keeps improvements, discards regressions
6. Repeats until 95%+ pass rate or user stops

## Output Location

Results go to: `autoresearch-[skill-name]/` in the agent's root folder

Files:
- `dashboard.html` - Live browser dashboard (auto-refreshes)
- `results.tsv` - Score log
- `changelog.md` - Mutation history
- `SKILL.md.baseline` - Original before optimization

## Example Trigger

User: "Optimize yourself using these test cases: [list]"

You: "I'll run autoresearch. Please confirm: (1) Test inputs: [list], (2) Eval criteria: [propose or ask], (3) Runs per experiment: 5?"

Once confirmed: Begin baseline run.
