# TOOLS.md — Bid Checker

## Purpose
This file lists the knowledge sources and local references the Bid Checker should use when evaluating proposals.

## Core Local Files
- `SOUL.md` — reviewer identity, evaluator mindset, trust/doubt patterns, ambiguity radar, and defect-severity model
- `setup/SETUP-INDEX.md` — navigation index for all setup knowledge sources
- `setup/scoring-rubric.md` — primary scoring criteria for the 10 dimensions
- `setup/ip-checklist.md` — confidentiality and internal-term audit checklist
- `setup/review-template.md` — required structure for review outputs
- `setup/writing-standards.md` — writing-quality framework, paragraph architecture, density rules, format-choice rules, and quantitative benchmarks
- `setup/reading-psychology.md` — how evaluators actually scan, triage, remember, and compare proposals
- `setup/persuasion-framework.md` — argument quality, evidence logic, trust formation, and persuasion patterns
- `setup/structure-patterns.md` — hierarchy, heading quality, TOC logic, sequencing, and information architecture
- `setup/evaluator-personas.md` — five evaluator archetypes and their scoring sensitivities
- `setup/defect-taxonomy.md` — defect naming, severity logic, detection patterns, and fix patterns
- `feedback/lessons.md` — accumulated lessons from prior reviews
- `training/scorecard.md` — historical scoring log and trend calibration

## Upstream Bid Content Sources
Use these to verify whether a proposal is aligned with how SettleMint bid responses are supposed to be written:
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/content/`
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/templates/`
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/reusable/`
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/best-practices/`

## Upstream Bid Manager Setup References
Use as reference only, especially when reviewing bid-manager output:
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/setup/ip-protection.md`
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/setup/writing-style.md`
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/setup/writing-style-dalp.md`
- `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/setup/word-compatible-markdown.md`

## DALP Product Knowledge Sources
Use these when checking whether proposal claims are credible, precise, and aligned with real DALP capabilities:
- `/Users/quark/Public/quark/workspace/product/dalp/capability-mapping/` — fastest structured source for “can DALP do X?”
- `/Users/quark/.openclaw/workspace/notion/dalp-narrative.md` — canonical positioning and messaging baseline
- `~/dalp/kit/dapp/content/docs/` — detailed product documentation, architecture, developer and user guides
- `~/dalp/` — codebase ground truth when capability claims need hard verification

## Comparative and Context Sources
- `/Users/quark/Public/quark/workspace/product/dalp/competitors/` — competitor dossiers for differentiation checks
- original RFP/RFI documents in `input/` — primary source for client evaluation criteria and coverage expectations
- proposal drafts in `input/` — documents under review
- generated review reports in `output/` — prior outputs for consistency checks

## How to Use These Sources
- Start with `SOUL.md` and `setup/SETUP-INDEX.md` to orient the review mindset and available frameworks
- Use `setup/reading-psychology.md` during skim and readability assessment
- Use `setup/persuasion-framework.md` when testing whether major claims are actually supported
- Use `setup/structure-patterns.md` to judge hierarchy, TOC quality, section order, and visual retrieval
- Use `setup/evaluator-personas.md` to pressure-test the proposal through multiple committee lenses
- Use `setup/defect-taxonomy.md` to name defects, estimate severity, and choose the right fix pattern
- Use `setup/writing-standards.md` for sentence-, paragraph-, and format-level writing judgement
- Use `feedback/lessons.md` and `training/scorecard.md` to keep scoring calibrated over time

## Usage Notes
- Prefer fewer, higher-signal sources over broad unfocused reading
- When the original RFP exists, treat it as the primary scoring lens
- When reviewing DALP capability claims, verify against capability mapping or DALP docs before accepting the claim as credible
- When reviewing bid-manager output, check both proposal quality and compliance with bid-manager's IP and writing rules
- If a claim sounds polished but not proven, move from writing judgement to persuasion, defect, and persona checks rather than giving credit for tone alone
