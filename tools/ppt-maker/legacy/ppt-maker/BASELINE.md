---
title: "PPT Maker Current Baseline"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.662310Z
---

# PPT Maker Current Baseline

Status: **FROZEN**  
Freeze date: **2026-03-19**

This file freezes the current working PPT maker setup as it exists in the repo today. If another doc conflicts with this file, this file wins until Gyan or Roderik explicitly approves a new freeze.

## Frozen canonical artifact set

### 1) Mother template
- `settlemint-office-agents/ppt-maker/templates/Master Template 2026.pptx`

### 2) Slide bank contract
- `settlemint-office-agents/ppt-maker/slide-bank/REGISTRY.json`
- `settlemint-office-agents/ppt-maker/slide-bank/*.info.json`

Current frozen slide-bank state:
- registry version: `2`
- generated at: `2026-03-19T20:12:26Z`
- supported slide count: `22`

### 3) Canonical builder path
- `settlemint-office-agents/ppt-maker/scripts/build_from_config.py`

### 4) Canonical workflow docs
- `settlemint-office-agents/ppt-maker/README.md`
- `settlemint-office-agents/ppt-maker/WORKFLOW.md`
- `settlemint-office-agents/ppt-maker/workflow/COMPLETE_WORKFLOW.md`
- `settlemint-office-agents/ppt-maker/scripts/README.md`

## What is frozen

### Frozen generation flow
```text
Master Template 2026.pptx
  -> extract_slide_bank.py
  -> slide-bank/*.pptx + *.info.json + REGISTRY.json
  -> build_from_config.py
  -> output/*.pptx
```

### Frozen builder behavior
The current builder is not a loose content generator. It is a **fail-closed slide-bank composer** with these enforced behaviors:

- starts from the frozen mother template
- copies each requested bank slide to a unique temp file
- injects text with placeholder-aware mapping
- merges slides back by copying slide XML into the master container
- post-processes icons and images after merge
- writes a fit report JSON beside successful output
- fails when content violates hard rules instead of silently producing a bad deck

### Hard rules frozen in the current setup
- `slide-024-thank-you.pptx` must remain empty; title/body text on the thank-you slide is treated as a build error
- image placement obeys `image_slot_policy` from the slide bank
- DALP screenshots are only allowed on the browser-frame screenshot layouts (`slide-015` / `slide-016`) unless the policy explicitly says otherwise
- generic image layouts (`slide-017` to `slide-023`) reject DALP screenshots and only accept generic images and/or diagrams according to policy
- title and mini-title fields are validated before merge
- fit validation is part of the build path, not an optional afterthought

## Known current-state observations

These are part of the freeze because they describe how the system behaves today, not how older docs claimed it behaved:

- older references to `scripts/build_from_layout_config.py`, `build.sh`, and `validate_production_build.py` are stale; those files are not present in this repo state
- the current live builder is `scripts/build_from_config.py`
- the slide bank currently documents **22** supported layouts, not 24
- the current repo contains successful generated artifacts under `ppt-maker/output/`, plus fit reports and verification files from 2026-03-19
- the builder intentionally rejects invalid configs rather than repairing them silently

## Freeze rules

- Do not modify `templates/Master Template 2026.pptx` directly.
- Do not change slide-bank metadata, image-slot policy, or placeholder behavior without updating the workflow docs together.
- Do not reintroduce stale builder references in docs.
- Treat a build-time validation failure as a spec violation, not a cosmetic nuisance.
- Any future freeze must update this file and produce a new dated workflow/baseline note.
