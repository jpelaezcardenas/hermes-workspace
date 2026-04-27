# Bid Checker

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

A standalone review agent for evaluating proposal drafts, RFI responses, and RFP responses before submission.

It behaves like a senior evaluator on a regulated financial institution's procurement committee and produces a structured review report that scores the document, identifies critical weaknesses, checks for IP leaks, tests argument quality, and gives a clear shortlist verdict.

## What this agent does

The Bid Checker:
- reviews proposal drafts end to end
- scores them across 10 dimensions
- checks alignment with the original RFP or RFI when available
- audits for internal IP and confidentiality leaks
- assesses readability, writing quality, and paragraph discipline
- evaluates whether the proposal actually persuades, not just whether content is present
- pressure-tests the document through multiple evaluator personas
- identifies ambiguity around scope, timeline, capability status, and responsibility
- identifies top strengths and highest-impact issues
- provides section-by-section feedback with specific fixes
- tracks score trends across reviews
- captures durable lessons to sharpen future calibration

## Expanded evaluation model

This agent now uses a deeper setup knowledge base for proposal assessment:
- **reading psychology** — how evaluators scan, tire, remember, and compare proposals in real procurement conditions
- **persuasion framework** — how to judge whether claims, evidence, logic, and trust signals actually hold
- **structure patterns** — how to assess hierarchy, TOC quality, heading value, and information architecture
- **evaluator personas** — how technical, business, risk/compliance, procurement, and legal readers notice different defects
- **defect taxonomy** — how to name defects, estimate severity, and choose the right fix pattern
- **writing standards** — how to evaluate clarity, information density, paragraph architecture, voice consistency, and the right use of prose, tables, and diagrams

## Input
Place files in `input/`:
- proposal document to review, ideally in markdown or converted text form
- optionally, the original RFP or RFI document
- optionally, supporting matrices or requirement tables

## Output
The agent writes a structured markdown review report into `output/`.

Typical output includes:
- overall score out of 50
- 10 dimension scores with justifications
- client evaluation criteria alignment section
- top strengths
- top critical issues
- section-by-section feedback
- IP exposure audit
- readability and writing assessment
- argument-quality observations
- ambiguity and overclaiming flags where relevant
- final verdict: Yes / Yes with reservations / No

## Directory structure

```text
bid-checker/
├── AGENTS.md
├── SOUL.md
├── TOOLS.md
├── README.md
├── setup/
│   ├── SETUP-INDEX.md
│   ├── scoring-rubric.md
│   ├── ip-checklist.md
│   ├── review-template.md
│   ├── writing-standards.md
│   ├── reading-psychology.md
│   ├── persuasion-framework.md
│   ├── structure-patterns.md
│   ├── evaluator-personas.md
│   └── defect-taxonomy.md
├── feedback/
│   ├── lessons.md
│   └── improvement-log.md
├── training/
│   └── scorecard.md
├── input/
├── output/
└── scripts/
```

## Startup sequence
Before reviewing anything, read in this order:
1. `SOUL.md`
2. `setup/SETUP-INDEX.md`
3. `setup/scoring-rubric.md`
4. `setup/ip-checklist.md`
5. `setup/review-template.md`
6. `setup/writing-standards.md`
7. `setup/reading-psychology.md`
8. `setup/persuasion-framework.md`
9. `setup/structure-patterns.md`
10. `setup/evaluator-personas.md`
11. `setup/defect-taxonomy.md`
12. `feedback/lessons.md`
13. `training/scorecard.md`

## Review method
The review follows four passes:
1. skim for first impressions, flow, scan visibility, and early trust signals
2. score each of the 10 dimensions
3. run the IP/confidentiality audit
4. review each major section with specific feedback, persona-aware objections, and severity-aware fixes

Then issue a final verdict based on shortlist probability.

## Key standards
- honest scoring, not diplomatic scoring
- evidence over adjectives
- client relevance over generic product copy
- internal-name leakage is a blocker
- **emoji in output is a blocker** — flag any emoji characters found in the document (confidence dots, status indicators, or any other emoji). These must be replaced with text equivalents before submission
- every criticism must have a fix
- content presence is not enough if the argument does not hold
- good prose should reduce evaluator effort, not increase it
- ambiguity around capability or scope must be surfaced, not tolerated

## DALP Composability Validation Reference

> Canonical source: `product/dalp/composability.md` and `shared/content/composability.md`

When reviewing proposals, validate all composability claims against this reference. Misstatements about token features, compliance modules, or composability architecture are critical defects.

### Verified Facts for Validation

**Core architecture:** One contract type (DALPAsset) represents any financial instrument via runtime-pluggable token features and compliance modules. No fixed token types.

**Token features: exactly 11 across 4 categories.**
- Fees and Charges (4): Transaction Fee, Transaction Fee Accounting, External Transaction Fee, AUM Fee
- Governance and Snapshots (3): Historical Balances, Voting Power, Permit (EIP-2612)
- Lifecycle and Yield (2): Maturity Redemption, Fixed Treasury Yield
- Transformation (2): Conversion, Conversion Minter

**Compliance modules: exactly 12 across 6 categories.**
- Geographic Restrictions (2): Country Allow List, Country Block List
- Identity Access Control (3): Identity Allow List, Identity Block List, Address Block List
- Claim-Based Verification (1): SMART Identity Verification (RPN expression engine)
- Supply and Investor Limits (3): Token Supply Limit, Investor Count, Capped
- Time-Based Rules (1): Time Lock
- Transfer Controls (2): Transfer Approval, Collateral

**Regulatory templates: exactly 7.** MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding.

**Asset presets: exactly 7.** Bond, Equity, Fund, StableCoin, Deposit, Real Estate, Precious Metal. Users can create any additional asset type with free-form naming.

### Common Overclaims to Flag

- Claiming more than 11 token features or 12 compliance modules
- Describing features as "compiled in" rather than runtime-pluggable
- Implying redeployment is needed for reconfiguration (it is not, under GOVERNANCE_ROLE)
- Listing asset types as fixed/exhaustive rather than preset starting points
- Overstating regulatory templates beyond the 7 pre-seeded ones
- Using "18 compliance modules" (older count from bid-manager content that included deprecated or planned modules; verified count is 12)

## Relationship to bid-manager
This agent is designed to review output from `bid-manager/`, but it is standalone.
It has its own operating rules, scoring memory, output format, evaluator-psychology model, and quality gates.
It may cross-reference bid-manager setup files for writing and IP standards, but it remains an independent reviewer.

## Maintenance files
- `feedback/lessons.md` — durable lessons that should sharpen future reviews
- `feedback/improvement-log.md` — record of the eight major improvement iterations
- `setup/SETUP-INDEX.md` — quick map of the setup knowledge base

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
