---
title: "Eval Guide"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.920372Z
---

# Eval Guide

How to write eval criteria that actually improve your skills instead of giving you false confidence.

## Core Principle

Every eval must be a yes/no question. Not a scale. Not a vibe check. Binary.

**Why:** Scales compound variability. If you have 4 evals scored 1-7, your total score has massive variance across runs. Binary evals give you a reliable signal.

---

## Good vs Bad Evals

### Writing Evals

**Bad evals:**
- "Is the writing good?" (too vague — what's "good"?)
- "Rate the engagement potential 1-10" (scale = unreliable)
- "Does it sound like a human?" (subjective, inconsistent scoring)

**Good evals:**
- "Does the output contain zero phrases from this banned list: [game-changer, here's the kicker, the best part, level up]?" (binary, specific)
- "Does the opening sentence reference a specific time, place, or sensory detail?" (binary, checkable)
- "Is the output between 150-400 words?" (binary, measurable)
- "Does it end with a specific CTA that tells the reader exactly what to do next?" (binary, structural)

### Visual/Media Evals

**Bad evals:**
- "Does it look professional?" (subjective)
- "Rate the visual quality 1-5" (scale)
- "Is the layout good?" (vague)

**Good evals:**
- "Is all text in the image legible with no truncated or overlapping words?" (binary, specific)
- "Does the color palette use only soft/pastel tones with no neon, bright red, or high-saturation colors?" (binary, checkable)
- "Is the layout linear — flowing either left-to-right or top-to-bottom with no scattered elements?" (binary, structural)
- "Is the image free of numbered steps, ordinals, or sequential numbering?" (binary, specific)

### Code Evals

**Bad evals:**
- "Is the code clean?" (subjective)
- "Does it follow best practices?" (vague, which best practices?)

**Good evals:**
- "Does the code run without errors?" (binary, testable — actually execute it)
- "Does the output contain zero TODO or placeholder comments?" (binary, greppable)
- "Are all function and variable names descriptive (no single-letter names except loop counters)?" (binary, checkable)
- "Does the code include error handling for all external calls (API, file I/O, network)?" (binary, structural)

### Document Evals

**Bad evals:**
- "Is it comprehensive?" (compared to what?)
- "Does it address the client's needs?" (too open-ended)

**Good evals:**
- "Does the document contain all required sections: [list them]?" (binary, structural)
- "Is every claim backed by a specific number, date, or source?" (binary, checkable)
- "Is the document under [X] pages/words?" (binary, measurable)
- "Does the executive summary fit in one paragraph of 3 sentences or fewer?" (binary, countable)

---

## Common Pitfalls

### Too Many Evals

More than 6 evals and the skill starts gaming them — it optimizes for passing the test instead of producing good output. Like a student who memorizes answers without understanding the material.

**Fix:** Pick the 3-6 checks that matter most. If everything passes those, the output is probably good.

### Arbitrary Structural Constraints

"Must contain exactly 3 bullet points" or "Must use the word 'because' at least twice" — these create skills that technically pass but produce weird, stilted output.

**Fix:** Evals should check for qualities you care about, not arbitrary structural constraints.

### Overlapping Evals

If eval 1 is "Is the text grammatically correct?" and eval 4 is "Are there any spelling errors?" — these overlap. A grammar fail often includes spelling. You're double-counting.

**Fix:** Each eval should test something distinct.

### Subjective Qualities

"Would a human find this engaging?" — an agent can't reliably answer this. It'll say "yes" almost every time.

**Fix:** Translate subjective qualities into observable signals. "Engaging" might mean: "Does the first sentence contain a specific claim, story, or question (not a generic statement)?"

---

## Eval Template

Copy this for each eval:

```
EVAL [N]: [Short name]
Question: [Yes/no question]
Pass: [What "yes" looks like — one sentence, specific]
Fail: [What triggers "no" — one sentence, specific]
```

### Example

```
EVAL 1: Text legibility
Question: Is all text in the output fully legible with no truncated, overlapping, or cut-off words?
Pass: Every word is complete and readable without squinting or guessing
Fail: Any word is partially hidden, overlapping another element, or cut off at the edge
```

---

## Validation Checklist

Before finalizing an eval, ask:

- Could two different agents score the same output and agree? If not, the eval is too subjective. Rewrite it.
- Could a skill game this eval without actually improving? If yes, the eval is too narrow. Broaden it.
- Does this eval test something the user actually cares about? If not, drop it. Every eval that doesn't matter dilutes the signal from evals that do.
