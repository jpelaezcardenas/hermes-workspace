# Bid Manager

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

SettleMint's bid management system for RFP, RFI, RFQ, and proposal responses.

## Folder Structure

```
bid-manager/
├── autoresearch-bid-manager/ → Disabled autoresearch skill (research during bid processing)
├── content/        → DALP deep-dive knowledge sections
├── feedback/       → Learning loop: log, lessons, protocol
├── input/          → Drop RFX source documents here
├── output/         → Generated responses (md/csv = mother formats)
├── pandoc-templates/ → Legacy pandoc templates (not used in canonical pipeline)
├── proposal-bank/  → Archive of completed proposals (read-only reference)
├── reusable/       → Pre-written content blocks for skeleton insertion
├── scripts/        → File conversion utilities (DOCX↔MD, XLSX↔CSV)
├── setup/          → Bid manager skills, rules, and configuration
├── skills/         → Sub-skills configuration (bid-checker, autoresearch)
├── skeletons/      → Structural skeletons for each output type
├── templates/      → Document structures and ready-to-use section content
├── training/       → Training run outputs and validation data
├── workflow/       → Autonomous processing: detection, pipeline, naming
└── README.md       → This file
```

## How It Works

### Intake
1. Drop the RFX document(s) into `input/`
2. Name them: `{client-slug}_{document-type}_{YYYY-MM-DD}.{ext}`

### Processing
3. Requirements are extracted and categorized
4. Each requirement is assessed against DALP capabilities
5. Confidence tags assigned: 🟢 Native | 🟡 Partial | 🔴 Gap | ⚪ N/A
6. Win themes selected based on client profile

### Output
7. Response generated using templates from `templates/`
8. Writing follows rules in `setup/`
9. Mother formats (.md, .csv) saved to `output/`
10. Derived formats (.docx, .pdf, .xlsx) generated on demand
11. Canonical runtime outputs live only under `settlemint-office-agents/bid-manager/output/`
12. `proposal-bank/` is archive-only, not a runtime generation destination
13. If an upstream source file sits outside `bid-manager/output/`, move or regenerate it into the canonical output tree before creating derivative office files
14. Do not route normal bid artifacts into nested generic folders such as `quark-unsorted-output/`; use `bid-manager/output/` directly

## Key Principles

## 🔴 NO EMOJI IN OUTPUT DOCUMENTS (Gyan directive, 2026-04-03)
Emoji characters are COMPLETELY FORBIDDEN in any client-facing output (DOCX, PPTX, PDF, HTML pages).
This includes: confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji.
Replace with text equivalents: "Fully Supported" / "Partially Supported" / "Gap" / "N/A".
Internal skeleton instructions may reference emoji for readability, but output MUST strip them.

## 🔴 DOCX CONVERSION MUST USE scripts/markdown_to_docx.py (Gyan directive, 2026-04-03)
**NEVER convert markdown to DOCX using inline/ad-hoc python-docx code.** ALWAYS use:
```
python3 scripts/markdown_to_docx.py input.md output.docx
```
This script handles: mermaid diagram rendering (via mmdc/Puppeteer with 3 retries), emoji stripping, Figtree font, master template styling, cover page placeholders, TOC generation, URL-decoded markdown image path resolution, and image embedding. Skipping it means no diagrams, no proper formatting, and broken output.

If the script fails, fix the script. Do not work around it with inline conversion.

## 🔴 MANDATORY DIAGRAMS AND VALIDATION (Gyan directive, 2026-04-03)
Every technical proposal MUST include mermaid diagrams and screenshots. This is not optional.

**Diagram manifest:** `setup/diagram-manifest.md` defines which sections MUST have diagrams.
**Screenshot manifest:** `setup/screenshot-manifest.md` defines which DALP UI screenshots to include.
**Minimum counts:** full=15, medium=10, compact=5 mermaid blocks in the markdown.

**Validation step (mandatory before DOCX conversion):**
```
python3 scripts/validate_proposal.py output/proposal.md full
```
This checks: mermaid block count, emoji presence, mandatory section diagrams. Must PASS before proceeding to DOCX.

A proposal without rendered diagrams in the DOCX is INCOMPLETE. Do not deliver it.

- **Markdown and CSV are the mother formats.** All edits happen here. Derived formats are generated, never edited directly.
- **Honesty over optimism.** Never claim a capability that doesn't exist. Use confidence tags accurately.
- **IP protection.** No source code, no internal architecture details, no confidential client names. See `setup/ip-protection.md`.
- **Platform, not consulting.** SettleMint sells DALP. Responses focus on platform capabilities, not custom development services.
- **Templates are living documents.** They receive continuous upgrades as DALP evolves and as win/loss feedback comes in.

## Autonomous Pipeline

The bid-manager can operate as a fully autonomous pipeline, triggered by keyword detection in Slack messages:

1. **Detection**: Recognizes RFP/RFI/questionnaire triggers (`workflow/detection-keywords.md`)
2. **Ingestion**: Copies files, converts formats (DOCX→MD via markitdown, XLSX→CSV via openpyxl)
3. **Classification**: Identifies document type, client, scope, deadline
4. **Assembly**: Loads skeleton, inserts reusable blocks, writes custom content from DALP sources
5. **Output**: Generates both markdown + DOCX (proposals) or CSV + locked-template XLSX (questionnaires)
6. **Feedback**: Logs the bid, asks for corrections, updates lessons for next time

See `workflow/processing-pipeline.md` for the full flow and `scripts/README.md` for conversion utility usage.

### Conversion Scripts

| Script | What it does | Engine |
|--------|-------------|--------|
| `scripts/docx_to_markdown.py` | DOCX → Markdown | markitdown |
| `scripts/markdown_to_docx.py` | Markdown → DOCX | python-docx |
| `scripts/xlsx_to_csv.py` | XLSX → CSV (or MD) | openpyxl / markitdown |
| `scripts/csv_to_xlsx.py` | CSV → approved questionnaire XLSX | locked template clone + validation |

## DALP Composability Reference

> Canonical source: `product/dalp/composability.md` and `shared/content/composability.md`

DALP's composability is a core differentiator in every bid. One contract type (DALPAsset) can represent any financial instrument by combining runtime-pluggable token features and compliance modules. There are no fixed token types. Features and compliance rules are building blocks that can be mixed, matched, added, and removed at any time, even after deployment.

### Token Features (11 across 4 categories)

**Fees and Charges (4):** Transaction Fee, Transaction Fee Accounting, External Transaction Fee, AUM Fee

**Governance and Snapshots (3):** Historical Balances, Voting Power, Permit (EIP-2612)

**Lifecycle and Yield (2):** Maturity Redemption, Fixed Treasury Yield

**Transformation (2):** Conversion, Conversion Minter

Each feature implements the `ISMARTFeature` interface with 6 lifecycle hooks. Up to 32 features per token. Features are replaced atomically via `setFeatures()`.

### Compliance Modules (12 across 6 categories)

**Geographic Restrictions (2):** Country Allow List, Country Block List

**Identity Access Control (3):** Identity Allow List, Identity Block List, Address Block List

**Claim-Based Verification (1):** SMART Identity Verification (RPN expression engine supporting KYC, AML, ACCREDITED, CONTRACT, JURISDICTION with AND/OR/NOT operators)

**Supply and Investor Limits (3):** Token Supply Limit, Investor Count, Capped

**Time-Based Rules (1):** Time Lock (FIFO holding period enforcement)

**Transfer Controls (2):** Transfer Approval, Collateral

Compliance uses a two-tier architecture: per-token modules and system-wide global modules. Every module must pass; a single veto blocks the transfer.

### 7 Regulatory Templates (Pre-Seeded)

MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding. Templates are starting points; organizations create custom templates via the platform UI.

### 7 Asset Presets

Bond, Equity, Fund, StableCoin, Deposit, Real Estate, Precious Metal. These are starting points. Users can add/remove features and compliance modules, or create entirely new asset types with any free-form `assetTypeName`.

### Key Differentiator

Unlike competitors who compile features into fixed contract types at deployment, DALP uses runtime-pluggable features and compliance modules. Under GOVERNANCE_ROLE, live tokens can be reconfigured: add/remove features, change compliance rules, adjust parameters. No redeployment or migration needed. A token can evolve from a simple bearer instrument to a fully governed, fee-bearing, yield-generating asset while live.

### Positioning Language

Use: "One contract, any instrument." "Features are building blocks, not fixed packages." "Evolve without redeploying." "Compliance as code." "Starting points, not limits."

## RFP Forge Sub-Agent

The `setup/agents/rfp-forge/` directory contains the **RFP Forge** agent configuration. RFP Forge generates realistic procurement documents (RFPs, RFIs, tenders, questionnaires) from the buyer's perspective. It simulates demand from six pre-built buyer personas (tier-1 bank, regional bank, sovereign wealth fund, exchange/CSD, central bank, fintech) across various jurisdictions.

RFP Forge is part of a three-agent training loop:
1. **RFP Forge** generates a realistic RFP
2. **Bid Manager** drafts the proposal response
3. **Bid Checker** critiques and scores the response

This loop drives continuous improvement of proposal quality without requiring real procurement documents.

## Quick Start

1. Read `setup/README.md` for rules and configuration
2. Read `templates/README.md` for available templates
3. Drop an RFX into `input/`
4. Generate a response using the appropriate template
5. Save output to `output/` with proper naming convention


# Bid Manager Content Index

> **Purpose**: Fast-lookup reference for every DALP capability, topic, and RFP question pattern across the bid-manager workspace. Find any content location in under 10 seconds.
>
> **Last built**: 2026-03-13 | **Total word count**: ~80,265

---

## 1. Master Content Map

### Content Sections

| File | Words | Updated | Summary |
|---|---|---|---|
| `content/00-about-dalp/` | - | 2026-03-13 | DALP platform overview, value proposition, positioning, key differentiators |
| `content/01-company-profile/` | - | 2026-03-13 | SettleMint company background, history, team, regulatory readiness, partnerships |
| `content/01-configurable-tokens/main.md` | 9,524 | 2026-03-13 | Token architecture, 7 asset classes + configurable token, 15 token features, asset designer, lifecycle management, per-asset RBAC, deployment architecture |
| `content/02-architecture/` | - | 2026-03-13 | Platform architecture, component design, infrastructure patterns |
| `content/02-configurable-compliance/main.md` | 8,944 | 2026-03-13 | ERC-3643/T-REX framework, two-layer policy model, three-tier compliance hierarchy, OnchainID, claim topics, trusted issuers, 12 compliance module catalog, RPN expressions |
| `content/03-asset-lifecycle/` | - | 2026-03-13 | Asset lifecycle management: issuance, servicing, settlement, redemption |
| `content/03-integrations/main.md` | 7,223 | 2026-03-13 | DAPI architecture, REST/oRPC APIs, TypeScript SDK, CLI (301 commands), chain indexer, blockchain connectivity, custody integration (DFNS/Fireblocks), KYC/AML, payment rails, ISO 20022 |
| `content/04-access-control-permissions/main.md` | 8,577 | 2026-03-13 | Dual-layer authorization, 26-role RBAC model, multi-tenancy, authentication (Better Auth, passkeys, API keys), wallet verification/MFA, Key Guardian, audit trails, maker-checker, CLI admin |
| `content/04-deployment/` | - | 2026-03-13 | Deployment models, infrastructure requirements, Kubernetes/OpenShift, cloud and on-prem options |
| `content/05-security/` | - | 2026-03-13 | Security architecture, encryption, penetration testing, vulnerability management |
| `content/05-verification-claims-feeds/main.md` | 7,072 | 2026-03-13 | OnchainID identity lifecycle, claim topics system, trusted issuers registry (3-tier), KYC review workflow, 12 compliance modules detail, data feeds architecture, price/NAV/corporate action feeds, oracle patterns |
| `content/06-implementation/` | - | 2026-03-13 | Implementation methodology, project phases, delivery approach, timelines |
| `content/06-technical-proposal/main.md` | 8,064 | 2026-03-13 | Platform architecture (7 core components), deployment models (SaaS/cloud/on-prem), Kubernetes/OpenShift, security architecture, HA/DR, performance, observability, Helm deployment, error handling |
| `content/07-commercial-proposal/main.md` | 4,634 | 2026-03-13 | Platform licensing model, 3 tier structure (Foundation/Enterprise/Sovereign), implementation pricing, support tiers, cost structures, ROI framework |
| `content/07-references/` | - | 2026-03-13 | Reference projects, case studies, client testimonials |
| `content/07-support-sla/` | - | 2026-03-13 | Support model, SLA tiers, severity definitions, uptime commitments |
| `content/08-competitive-positioning/` | - | 2026-03-13 | Competitive landscape, differentiation, win themes vs specific competitors |
| `content/08-rfi-response-bank/main.md` | 9,127 | 2026-03-13 | 61 pre-written RFP/RFI Q&A responses across 6 categories: company background, platform/tech, security/compliance, integration, support/ops, implementation/delivery |

### Reusable Blocks

| File | Words | Updated | Summary |
|---|---|---|---|
| `reusable/about-settlemint.md` | 1,665 | 2026-03-13 | Company overview, mission, history, regulatory readiness, client verticals, team, partnerships, three pillars (Technology, Track Record, Team) |
| `reusable/about-dalp.md` | 2,192 | 2026-03-13 | Platform overview, value proposition, 5 lifecycle pillars, 3 platform foundations, supported standards, 8 asset classes, differentiators vs custom dev, architecture highlights, competitive positioning |
| `reusable/deployment-options.md` | 1,580 | 2026-03-13 | 4 deployment models (Managed SaaS, Private Cloud, On-Premises, Hybrid) with comparison table, prerequisites, infrastructure requirements, blockchain network support |
| `reusable/implementation-plan.md` | 2,925 | 2026-03-13 | 6-phase methodology (Discovery → Configuration → Integration → Testing → Go-Live → Hypercare), 15-19 week timeline, deliverables per phase, resource requirements, risk mitigation, governance |
| `reusable/support-sla.md` | 1,832 | 2026-03-13 | 3 support tiers (Standard/Premium/Enterprise), severity levels P1-P4, response/resolution targets, uptime SLAs (99.9%-99.99%), service credits, escalation procedures, maintenance windows |
| `reusable/training.md` | 1,486 | 2026-03-13 | 3 training tracks (Administrator, Developer, End-User), delivery methods, documentation package, knowledge transfer methodology, ongoing learning resources |
| `reusable/reference-projects.md` | 1,568 | 2026-03-13 | 14 named reference projects with use case, challenge, solution, outcome for each (OCBC, KBC, Standard Chartered, RBI, Sony Bank, SBI, IsDB x2, Mizuho, Maybank, ADI, Commerzbank, Saudi RER) |

### Setup / Configuration Files

| File | Words | Updated | Summary |
|---|---|---|---|
| `setup/writing-style.md` | ~1,800 | 2026-03-13 | Writing voice, formatting constraints, sentence patterns, persuasion structure, length calibration, mixed evaluator committees, diagram requirements, DOCX rules, deep framework references |
| `setup/word-compatible-markdown.md` | 752 | 2026-03-13 | Markdown formatting rules for Word/pandoc conversion: headings, tables, lists, diagrams, page breaks |
| `setup/ip-protection.md` | 799 | 2026-03-13 | Allow/deny lists for bid content: never include source code, internal names, third-party product names; safe to include capabilities, standards, high-level architecture |
| `setup/win-themes.md` | 1,116 | 2026-03-13 | 6 win themes: Complexity of Doing It Right (primary), Platform Not Consulting, EVM-Native, Enterprise Controls, T-REX Compliance, Rapid Deployment, Full Lifecycle; theme combination matrix |
| `setup/core-positioning.md` | 257 | 2026-03-13 | Central positioning message: "Tokenization is accessible, institutional-grade implementation is not." Usage guidance for exec summaries and intros |

---

## 2. Topic Index

**Access control / RBAC** → content/04 §1 Authorization Architecture | content/04 §2 Full RBAC Model (26 roles, 4 layers) | content/04 §3 Platform vs Token Permissions | content/01 §6 Per-Asset RBAC | content/06 §6.4.4 Role-Based Access Control | content/08 §Q3.6 Access Control | reusable/about-dalp §Identity and Access Management

**Account abstraction (ERC-4337)** → content/03 §6.7 Account Abstraction | reusable/about-dalp §Supported Standards

**Airdrop distribution** → content/01 §7.4 Distribution Mechanisms | reusable/about-dalp §Servicing

**API surface (REST, typed SDK, oRPC)** → content/03 §1 DAPI | content/03 §2 TypeScript SDK | content/03 §1.3 OpenAPI | content/08 §Q2.7 API and SDK | reusable/about-dalp §Integration and Interoperability

**Asset classes: Bonds** → content/01 §3.1 Asset Classes | content/01 §4.1 DALPAsset Presets | content/08 §Q2.2 Asset Classes | reusable/about-dalp §Issuance | reusable/reference-projects §KBC Securities, §Mizuho, §Commerzbank

**Asset classes: Configurable Token** → content/01 §2 Token Features | content/01 §4.3 Custom Configurations | content/08 §Q2.2 | reusable/about-dalp §Issuance

**Asset classes: Deposits** → content/01 §3.1 | content/01 §4.1 | content/08 §Q2.2 | reusable/about-dalp §Issuance | reusable/reference-projects §Maybank

**Asset classes: Equities** → content/01 §3.1 | content/01 §4.1 | content/08 §Q2.2 | reusable/about-dalp §Issuance | reusable/reference-projects §ADI Finstreet, §Standard Chartered

**Asset classes: Funds** → content/01 §3.1 | content/01 §4.1 | content/08 §Q2.2 | reusable/about-dalp §Issuance

**Asset classes: Precious Metals** → content/01 §3.1 | content/01 §4.1 | content/08 §Q2.2 | reusable/about-dalp §Issuance

**Asset classes: Real Estate** → content/01 §3.1 | content/01 §4.1 | content/08 §Q2.2 | reusable/about-dalp §Issuance | reusable/reference-projects §Saudi RER

**Asset classes: Stablecoins** → content/01 §3.1 | content/01 §4.1 | content/08 §Q2.2 | reusable/about-dalp §Issuance | reusable/reference-projects §Sony Bank, §Maybank

**Atomic settlement / DvP / XvP** → content/01 §7.3 Cross-Token Settlement | content/06 §6.1.2 Blockchain Layer (addon contracts) | content/08 §Q2.5 Settlement | reusable/about-dalp §Settlement | reusable/reference-projects §Maybank (XvP)

**Audit trails** → content/04 §8 Audit Trail Architecture | content/04 §8.1-8.8 (event sourcing, on-chain events, compliance evidence, transaction history) | content/06 §6.7.6 Analytics Views | content/08 §Q3.5 Audit Trail | reusable/about-dalp §Observability and Operations

**AUM fees (token feature)** → content/01 §2.2 Token Features: Fees & Charges (AUMFee) | reusable/about-dalp §Servicing

**Authentication (Better Auth, passkeys, API keys, SSO)** → content/04 §5 Authentication Architecture | content/04 §5.1-5.7 | content/06 §6.4.3 Authentication Architecture | content/08 §Q3.1 Authentication/Authorization

**Blockchain support (EVM networks)** → content/03 §5 Blockchain Network Connectivity | content/03 §5.2 Supported Network Categories | content/06 §6.3 Network Architecture | content/08 §Q2.6 Networks | reusable/about-dalp §Supported Standards | reusable/deployment-options §Blockchain Network Support

**CLI commands** → content/03 §3 CLI (301 commands, 26 groups) | content/04 §12 CLI Administration Surface | content/06 §6.8.6 CLI Operations | content/08 §Q2.7 API/SDK | reusable/about-dalp §Integration and Interoperability

**Collateral management** → content/02 §7 Compliance Modules (Collateral ratio, collateral backing) | content/05 §5.4.4 (settlement and collateral modules) | content/01 §2.2 Token Features: Lifecycle & Yield (CollateralManagement)

**Compliance module: Address Block List** → content/02 §7.6 Address Block List

**Compliance module: Collateral Backing Verification** → content/02 §7 (settlement/collateral category) | content/05 §5.4.4

**Compliance module: Collateral Ratio Requirements** → content/02 §7 (settlement/collateral category) | content/05 §5.4.4

**Compliance module: Conditional Transfer Controls** → content/05 §5.4.4 (restriction modules)

**Compliance module: Country Allow List** → content/02 §7.4 Country Allow List | content/05 §5.4.4

**Compliance module: Country Block List** → content/02 §7.5 Country Block List | content/05 §5.4.4

**Compliance module: Holding Period / TimeLock** → content/02 §7.8 TimeLock | content/05 §5.4.2 Exemption Expressions | content/05 §5.4.4

**Compliance module: Identity Allow List** → content/02 §7.2 Identity Allow List | content/05 §5.4.4

**Compliance module: Identity Block List** → content/02 §7.3 Identity Block List | content/05 §5.4.4

**Compliance module: Identity Verification (SMARTIdentityVerification)** → content/02 §7.1 | content/05 §5.4.1 (RPN expression system) | content/05 §5.4.4

**Compliance module: Investor Count Limits** → content/02 §7 (issuance/supply) | content/05 §5.4.4

**Compliance module: Supply Cap Enforcement** → content/02 §7 (issuance/supply) | content/05 §5.4.4

**Compliance module: Time-Windowed Transfer Restrictions** → content/05 §5.4.4 (time-based modules)

**Compliance module: Transaction Frequency Controls** → content/05 §5.4.4 (transfer control modules)

**Compliance module: Transfer Amount Limits** → content/05 §5.4.4 (transfer control modules)

**Compliance module: Transfer Approval** → content/02 §7.7 Transfer Approval | content/05 §5.4.2 Exemption Expressions | content/05 §5.4.4

**Compliance pre-check / simulation** → content/05 §5.4.5 Compliance Pre-Check via Simulation | content/02 §6.1 Claim Verification

**Corporate actions** → content/01 §3.4 Corporate Actions | content/08 §Q2.13 Corporate Actions | reusable/about-dalp §Servicing | reusable/reference-projects §KBC Securities, §ADI Finstreet

**Custody integration: DFNS** → content/03 §6.3 DFNS Integration | content/06 §6.1.2 Signer Service | content/08 §Q4.2 Custody Providers

**Custody integration: Fireblocks** → content/03 §6.4 Fireblocks Integration | content/06 §6.1.2 Signer Service | content/08 §Q4.2 Custody Providers | reusable/reference-projects §ADI Finstreet

**Custody integration: general / BYOC model** → content/03 §6.1 Bring-Your-Own-Custodian | content/03 §6.5 Unified Signer Abstraction | reusable/about-dalp §Custody

**Data feeds / oracles** → content/05 §5.5 Data Feeds Architecture | content/05 §5.6 Price/NAV/Corporate Action Feeds | content/05 §5.7 Oracle Patterns | content/01 §7.5 Data Feed Integration | content/08 §Q2.16 Data Feeds

**Deployment models (SaaS, dedicated, on-premises, hybrid)** → content/06 §6.2 Infrastructure | reusable/deployment-options (all 4 models) | content/07 §7.1.3 What Varies | content/08 §Q6.2 Infrastructure Requirements

**Digital twin model** → content/01 §1.1 DALPAsset Foundation (asset as on-chain digital twin) | reusable/about-dalp §Platform Overview

**Durable execution / Restate** → content/06 §6.1.2 Execution Engine | content/03 §1.5 Transaction Queue | content/08 §Q2.9 Transaction Processing | reusable/about-dalp §Architecture Highlights

**Error handling (534 error codes)** → content/06 §6.8.8 Error Handling | content/03 §1.6 Retry Strategy | content/08 §Q2.9 Transaction Processing | reusable/about-dalp §Observability and Operations

**Feeds (Chainlink Aggregator Adapter)** → content/05 §5.5.2 Chainlink Aggregator Adapter | content/05 §5.7.2 Adapter Pattern

**Feeds (Issuer-Signed Scalar)** → content/05 §5.5.2 Issuer-Signed Scalar Feed | content/05 §5.7.1 Inbound Oracle Pattern

**FeedsDirectory** → content/05 §5.5.1 The FeedsDirectory | content/05 §5.5.3 Feed Trust Model

**Identity / OnchainID** → content/02 §4 Identity Registry and OnchainID | content/05 §5.1 Identity Verification with OnchainID | content/04 §3.4 Trusted-Issuer-Aware Authorization | content/08 §Q3.3 Identity/KYC | reusable/about-dalp §Identity and Access Management

**Identity recovery** → content/05 §5.1.2 Identity Lifecycle (recovery) | content/04 §11 Identity Recovery and Administrative Intervention

**Implementation phases** → reusable/implementation-plan (6 phases, 15-19 weeks) | content/07 §7.3 Implementation Pricing | content/08 §Q6.1 Implementation Methodology

**Indexer (PostgreSQL-based)** → content/03 §4 Blockchain Event Indexing | content/06 §6.1.2 Indexer | content/08 §Q2.8 Data Storage/Indexing

**Key management / Key Guardian** → content/04 §7 Key Management and Key Guardian | content/04 §7.2 Storage Hierarchy | content/06 §6.4.5 Encryption and Key Management | content/08 §Q2.14 Wallet/Key Management | reusable/about-dalp §Custody

**KYC/KYB review workflow** → content/05 §5.4.3 KYC Review and Compliance Workflow | content/03 §7 KYC/AML Integration | content/08 §Q3.3 Identity/KYC

**Licensing / pricing** → content/07 §7.1 Licensing Model (platform, not per-transaction) | content/07 §7.2 Tier Structure (Foundation/Enterprise/Sovereign) | content/07 §7.5 Cost Structures | content/08 §Q1.4 Financial Stability

**Maker-checker / multi-sig** → content/04 §10 Segregation of Duties and Maker-Checker | content/04 §10.4 Custody-Layer Maker-Checker | content/06 §6.4.7 Two-Layer Transaction Policy | reusable/about-dalp §Custody

**Monitoring / observability** → content/06 §6.7 Monitoring and Observability (3-pillar: metrics, logs, traces) | content/06 §6.7.2-6.7.7 (tracing, dashboards, blockchain health, alerts, analytics views, CLI monitoring) | content/03 §4.3 Indexer Health | content/08 §Q5.3 Monitoring | reusable/about-dalp §Observability and Operations

**Multi-tenancy** → content/04 §4 Multi-Tenancy and Organization Isolation | content/04 §4.1-4.8 | content/08 §Q2.11 Multi-Tenancy | reusable/about-dalp §Identity and Access Management

**Nonce management** → content/06 §6.1.2 Nonce Manager | content/03 §1.5 Transaction Queue

**Payment rails / ISO 20022** → content/03 §8 Payment Rails and ISO 20022 | content/08 §Q4.3 Payment Rail Integration | reusable/about-dalp §Settlement

**Performance and scalability** → content/06 §6.6 Performance and Scalability | content/08 §Q2.15 Scalability

**Reference project: ADI Finstreet** → reusable/reference-projects §ADI Finstreet (tokenized equity, Abu Dhabi, DFNS/Fireblocks, ERC20Votes)

**Reference project: Commerzbank** → reusable/reference-projects §Commerzbank (hybrid ETP, Boerse Stuttgart, €7M savings)

**Reference project: IsDB (market stabilization)** → reusable/reference-projects §IsDB Market Stabilization (Sharia-compliant, 30-50% volatility reduction)

**Reference project: IsDB (subsidy distribution)** → reusable/reference-projects §IsDB Subsidy Distribution (57 countries, 1.7B people, P2P distribution)

**Reference project: KBC Insurance** → reusable/reference-projects §KBC Insurance (NFT product passports, claims)

**Reference project: KBC Securities / Bolero** → reusable/reference-projects §KBC Securities (equity crowdfunding, SME loans, corporate actions)

**Reference project: Maybank (Project Photon)** → reusable/reference-projects §Maybank (FX tokenization, XvP, MYRT token, cross-border settlement)

**Reference project: Mizuho Bank** → reusable/reference-projects §Mizuho Bank (bond tokenization, trade finance, PoC completed)

**Reference project: OCBC Bank** → reusable/reference-projects §OCBC (security token engine, HNWI/HENRY, order book)

**Reference project: RBI Innovation Hub** → reusable/reference-projects §RBI (multi-bank LC trade finance, multi-node multi-cloud)

**Reference project: Saudi RER** → reusable/reference-projects §Saudi RER (country-scale real estate, fractionalization, Vision 2030)

**Reference project: SBI** → reusable/reference-projects §SBI (CBDC infrastructure, e-Rupee, financial inclusion)

**Reference project: Sony Bank** → reusable/reference-projects §Sony Bank (stablecoin + digital identity, Privado.id, KYC-enabled Web3)

**Reference project: Standard Chartered** → reusable/reference-projects §Standard Chartered (Digital Virtual Exchange, fractional tokenization)

**Regulatory frameworks: FCA (UK)** → content/02 §7.1 (verification expressions) | content/08 §Q3.4 Regulatory Compliance | reusable/about-settlemint §Regulatory Readiness | reusable/about-dalp §Compliance

**Regulatory frameworks: GCC / Sharia-compliant** → reusable/about-settlemint §Regulatory Readiness | reusable/reference-projects §IsDB (x2)

**Regulatory frameworks: JFSA (Japan)** → content/05 §5.4.1 (Japan FSA expression example) | reusable/about-settlemint §Regulatory Readiness | reusable/reference-projects §Sony Bank

**Regulatory frameworks: MAS (Singapore)** → content/08 §Q3.4 | reusable/about-settlemint §Regulatory Readiness | reusable/about-dalp §Compliance

**Regulatory frameworks: MiCA / MiFID II (EU)** → content/05 §5.4.1 (MiCA expression example) | content/08 §Q3.4 | reusable/about-settlemint §Regulatory Readiness | reusable/about-dalp §Compliance | setup/win-themes §Theme 4

**Regulatory frameworks: Reg D / Reg S / Reg CF (US)** → content/05 §5.4.1 (Reg D expressions) | content/08 §Q3.4 | reusable/about-settlemint §Regulatory Readiness | reusable/about-dalp §Compliance

**Regulatory frameworks: VARA (UAE)** → reusable/reference-projects §ADI Finstreet (UAE/GCC context)

**ROI framework** → content/07 §7.6 ROI Framework | content/07 §7.6.1-7.6.4 (value drivers, calculation, measurement, illustrative logic)

**Security architecture** → content/06 §6.4 Security Architecture (defense-in-depth, trust boundaries, encryption) | content/04 §1 Authorization Architecture | content/08 §Q3.1-Q3.10 (all security Q&As) | reusable/about-dalp §Architecture Highlights

**Session management** → content/04 §9 Session Management and API-Key Governance | content/04 §5.3 Session Authentication

**Settlement** → content/01 §7.3 Cross-Token Settlement | content/08 §Q2.5 Settlement | reusable/about-dalp §Settlement | reusable/reference-projects §Maybank, §Commerzbank

**SLA / support tiers** → reusable/support-sla (3 tiers, P1-P4 severities, uptime targets, service credits) | content/07 §7.4 Support & Maintenance Model | content/08 §Q5.1 Support Model

**Smart contracts (ERC-3643 / T-REX)** → content/01 §1 Token Contract Architecture | content/02 §1 T-REX/ERC-3643 Framework | content/06 §6.1.2 Blockchain Layer | content/08 §Q2.10 Smart Contract Standards | reusable/about-dalp §Supported Standards | setup/win-themes §Theme 4

**Token feature: AUMFee** → content/01 §2.2 Fees & Charges

**Token feature: Burnable** → content/01 §2.2 (implied in supply management) | content/01 §2.7 Per-Asset Permission Matrix

**Token feature: CollateralManagement** → content/01 §2.2 Lifecycle & Yield

**Token feature: Conversion** → content/01 §2.2 Transformation

**Token feature: EIP2612Permit** → content/01 §2.2 Governance & Snapshots

**Token feature: FixedTreasuryYield** → content/01 §2.2 Lifecycle & Yield

**Token feature: HistoricalBalances** → content/01 §2.2 Governance & Snapshots

**Token feature: MaturityRedemption** → content/01 §2.2 Lifecycle & Yield

**Token feature: Mintable** → content/01 §2.7 (supplyManagement role)

**Token feature: Pausable** → content/01 §2.7 (emergency role) | content/01 §3.2 Issuance (paused-by-default)

**Token feature: TransactionFee** → content/01 §2.2 Fees & Charges

**Token feature: VotingPower (ERC-5805)** → content/01 §2.2 Governance & Snapshots

**Token sale / primary offering** → content/01 §7.4 Distribution Mechanisms | content/08 §Q2.12 Primary Offerings | reusable/about-dalp §Servicing

**Training program** → reusable/training (3 tracks: Admin, Developer, End-User) | content/08 §Q5.6 Documentation/Training

**Transaction processing (11-state lifecycle)** → content/06 §6.1.2 Transaction Processor | content/03 §1.5 Transaction Queue | content/08 §Q2.9 Transaction Processing | reusable/about-dalp §Observability and Operations

**Trusted issuers** → content/05 §5.3 Trusted Issuers Registry (3-tier: subject, system, global) | content/02 §5.3-5.6 Trusted Issuers | content/04 §3.4 Trusted-Issuer-Aware Authorization

**Upgradeable contracts** → content/01 §8.2 Upgrade Path | content/06 §6.10.5 Smart Contract Upgrade Path | content/08 §Q3.8 Smart Contract Security/Upgrades | reusable/reference-projects §ADI Finstreet

**Vault (custody addon)** → content/03 §6.8 Custody Vault Operations | reusable/about-dalp §Custody

**Wallet infrastructure** → content/04 §7 Key Management / Key Guardian | content/03 §6 Custody Integration | content/06 §6.4.5 Key Guardian | content/08 §Q2.14 Wallet/Key Management

**Wallet verification / MFA / step-up security** → content/04 §6 Wallet Verification, MFA, and Step-Up Security | content/04 §6.1-6.8 | content/06 §6.4.6 Wallet Verification

**Webhook / event-driven architecture** → content/03 §1 DAPI (webhooks) | content/08 §Q4.4 Event-Driven Architecture | reusable/about-dalp §Integration and Interoperability

**White-labeling** → content/08 §Q4.9 White-Labeling

---

## 3. RFP Question Quick-Find

| Question Pattern | Content Locations |
|---|---|
| "Do you support [asset class]?" | content/01 §3.1 Asset Classes | content/08 §Q2.2 | reusable/about-dalp §Supported Asset Classes |
| "What compliance standards do you support?" | content/02 §7 Module Catalog | content/05 §5.4.4 (18 modules) | content/08 §Q2.3 | reusable/about-dalp §Compliance |
| "Describe your security architecture" | content/06 §6.4 Security Architecture | content/04 §7 Key Management | content/08 §Q3.1-Q3.10 |
| "What blockchain networks do you support?" | content/03 §5.2 Supported Networks | content/06 §6.3 Network Architecture | content/08 §Q2.6 | reusable/deployment-options §Blockchain Network Support |
| "How do you handle KYC/AML?" | content/05 §5.4.3 KYC Review Workflow | content/03 §7 KYC/AML Integration | content/08 §Q3.3 |
| "Describe your settlement capabilities" | content/08 §Q2.5 | reusable/about-dalp §Settlement | content/01 §7.3 Cross-Token Settlement |
| "What custody providers do you integrate with?" | content/03 §6 Custody Integration (DFNS, Fireblocks) | content/08 §Q4.2 | reusable/about-dalp §Custody |
| "What are your deployment options?" | reusable/deployment-options (4 models) | content/06 §6.2 Infrastructure | content/08 §Q6.2 |
| "Describe your API/SDK" | content/03 §1-3 (DAPI, SDK, CLI) | content/08 §Q2.7 | reusable/about-dalp §Integration and Interoperability |
| "What is your implementation timeline?" | reusable/implementation-plan (15-19 weeks) | content/07 §7.3 Implementation Phases | content/08 §Q6.1 |
| "What SLA do you offer?" | reusable/support-sla (3 tiers, 99.9%-99.99%) | content/07 §7.4 Support Tiers | content/08 §Q5.1 |
| "Describe your RBAC model" | content/04 §2 (26 roles, 4 layers) | content/01 §6 Per-Asset RBAC | content/08 §Q3.6 |
| "How do you handle multi-tenancy?" | content/04 §4 Multi-Tenancy (org isolation) | content/08 §Q2.11 |
| "What is your pricing model?" | content/07 §7.1-7.2 (platform licensing, 3 tiers) | content/07 §7.5 Cost Structures |
| "Describe your company background" | reusable/about-settlemint | content/08 §8.1 (Q1.1-Q1.10) |
| "What audit trail capabilities do you provide?" | content/04 §8 Audit Trail Architecture | content/08 §Q3.5 | reusable/about-dalp §Observability |
| "How do you handle identity verification?" | content/05 §5.1 OnchainID | content/02 §4 Identity Registry | content/08 §Q3.3 |
| "Describe your monitoring/observability" | content/06 §6.7 (3-pillar observability, dashboards) | content/08 §Q5.3 | reusable/about-dalp §Observability and Operations |
| "What training do you provide?" | reusable/training (3 tracks) | content/08 §Q5.6 |
| "What reference clients can you share?" | reusable/reference-projects (14 named projects) | content/08 §Q1.3 Financial Institution Experience |
| "Do you support on-premises deployment?" | reusable/deployment-options §Option 3: On-Premises | content/06 §6.2.1 On-Premises | content/08 §Q3.9 Data Residency |
| "How do you handle token lifecycle/corporate actions?" | content/01 §3 Token Lifecycle | content/01 §3.4 Corporate Actions | content/08 §Q2.4, Q2.13 |
| "Describe your disaster recovery approach" | content/06 §6.5 HA/DR | content/08 §Q5.4 | reusable/support-sla §Maintenance Windows |
| "How do you ensure regulatory compliance across jurisdictions?" | content/02 §7 (module catalog) | content/05 §5.4.1 (RPN expressions per jurisdiction) | content/08 §Q3.4 | reusable/about-settlemint §Regulatory Readiness |
| "What is your approach to smart contract security?" | content/01 §9 Security Model | content/06 §6.10.5 Upgrade Path | content/08 §Q3.8 |
| "How do you handle payment rail integration?" | content/03 §8 Payment Rails / ISO 20022 | content/08 §Q4.3 |
| "Describe your data feed/oracle capabilities" | content/05 §5.5-5.7 (FeedsDirectory, oracle patterns) | content/08 §Q2.16 |
| "What is your ROI/business case?" | content/07 §7.6 ROI Framework | content/07 §7.5.4 TCO Considerations |
| "How do you handle maker-checker/approval workflows?" | content/04 §10 Segregation of Duties | content/04 §10.4 Custody-Layer Maker-Checker | content/06 §6.4.7 |
| "What intellectual property protections do you have?" | content/08 §Q1.7 IP/Technology Ownership | setup/ip-protection (allow/deny lists) |

---

## 4. Reusable Block Reference

| Block | What It Covers | When to Use | Words |
|---|---|---|---|
| `reusable/about-settlemint.md` | Company story, mission, history, regulatory readiness, verticals, team, partnerships, proof points | Every proposal: "About Us" section, company background questions, partner/team questions | 1,665 |
| `reusable/about-dalp.md` | Platform overview, value prop, 5 pillars, 3 foundations, standards, asset classes, differentiators, architecture, competitive positioning | Every proposal: solution overview, platform description, "why DALP" sections | 2,192 |
| `reusable/deployment-options.md` | 4 deployment models with comparison table, prerequisites, infrastructure requirements per model | When RFP asks about deployment, hosting, data residency, or infrastructure requirements | 1,580 |
| `reusable/implementation-plan.md` | 6-phase methodology (Discovery → Hypercare), 15-19 week timeline, deliverables, resources, risks, governance | When RFP asks about implementation approach, timeline, methodology, or project plan | 2,925 |
| `reusable/support-sla.md` | 3 tiers, P1-P4 severity definitions, response/resolution targets, uptime SLAs, service credits, escalation, maintenance windows | When RFP asks about support, SLAs, uptime guarantees, or incident management | 1,832 |
| `reusable/training.md` | 3 training tracks (Admin/Developer/End-User), delivery methods, documentation package, knowledge transfer methodology | When RFP asks about training, knowledge transfer, or documentation | 1,486 |
| `reusable/reference-projects.md` | 14 named projects with summary table + detailed case studies (OCBC, KBC x2, StanChart, RBI, Sony, SBI, IsDB x2, Mizuho, Maybank, ADI, Commerzbank, Saudi RER) | Every proposal: include summary table of all 14, then expand 1-3 most relevant | 1,568 |

---

## 5. Cross-Reference Matrix

This matrix shows which content sections share significant topical overlap. Use it to know what to pull together when covering a topic comprehensively.

| Topic Cluster | Primary Source | Also Covered In |
|---|---|---|
| **Token architecture & asset classes** | content/01 | content/08 §Q2.2, Q2.4 · reusable/about-dalp §Issuance · content/06 §6.1.2 Blockchain Layer |
| **Compliance framework (modules, enforcement)** | content/02 | content/05 §5.4 · content/08 §Q2.3, Q3.4 · reusable/about-dalp §Compliance · setup/win-themes §Theme 4 |
| **Identity / OnchainID / claims** | content/05 §5.1-5.3 | content/02 §4-6 · content/04 §3.4 · content/08 §Q3.3 · reusable/about-dalp §Identity and Access Management |
| **Access control / RBAC** | content/04 §1-3, §10 | content/01 §6 · content/06 §6.4.4 · content/08 §Q3.6 |
| **Multi-tenancy / org isolation** | content/04 §4 | content/08 §Q2.11 · content/06 §6.4.2 Trust Boundaries |
| **Authentication & session security** | content/04 §5-6 | content/06 §6.4.3, §6.4.6 · content/08 §Q3.1 |
| **Key management / custody** | content/04 §7 + content/03 §6 | content/06 §6.4.5 · content/08 §Q2.14, Q4.2 · reusable/about-dalp §Custody |
| **Audit trails** | content/04 §8 | content/06 §6.7.6 · content/08 §Q3.5 |
| **API / SDK / CLI** | content/03 §1-3 | content/04 §12 · content/06 §6.8.6-6.8.7 · content/08 §Q2.7 · reusable/about-dalp §Integration |
| **Blockchain indexer / data pipeline** | content/03 §4 | content/06 §6.1.2 Indexer · content/08 §Q2.8 |
| **Blockchain networks** | content/03 §5 | content/06 §6.3 · content/08 §Q2.6 · reusable/deployment-options |
| **Data feeds / oracles** | content/05 §5.5-5.10 | content/01 §7.5 · content/08 §Q2.16 |
| **Settlement (DvP/XvP)** | content/01 §7.3 | content/06 §6.1.2 · content/08 §Q2.5 · reusable/about-dalp §Settlement · reusable/reference-projects §Maybank |
| **Deployment infrastructure** | content/06 §6.2 | reusable/deployment-options · content/08 §Q6.2 · content/07 §7.1.3 |
| **Security architecture** | content/06 §6.4 | content/04 (all) · content/08 §Q3.1-Q3.10 |
| **HA / DR / performance** | content/06 §6.5-6.6 | content/08 §Q5.4, Q2.15 · reusable/support-sla |
| **Observability / monitoring** | content/06 §6.7 | content/03 §4.3 · content/08 §Q5.3, Q5.7 · reusable/about-dalp §Observability |
| **Licensing & pricing** | content/07 §7.1-7.2 | content/07 §7.5 · content/08 §Q1.4 |
| **Implementation methodology** | reusable/implementation-plan | content/07 §7.3 · content/08 §Q6.1-Q6.11 |
| **Support / SLA** | reusable/support-sla | content/07 §7.4 · content/08 §Q5.1, Q5.5 |
| **Training** | reusable/training | content/08 §Q5.6, Q6.6 |
| **Company background** | reusable/about-settlemint | content/08 §8.1 (Q1.1-Q1.10) |
| **Reference projects** | reusable/reference-projects | content/08 §Q1.3 · reusable/about-settlemint §Proof Points |
| **KYC/KYB workflow** | content/05 §5.4.3 | content/03 §7 · content/08 §Q3.3 |
| **Maker-checker / SoD** | content/04 §10 | content/06 §6.4.7 · reusable/about-dalp §Custody |
| **Transaction lifecycle (11-state)** | content/06 §6.1.2 Transaction Processor | content/03 §1.5 · content/08 §Q2.9 |
| **Error handling (534 codes)** | content/06 §6.8.8 | content/03 §1.6 · reusable/about-dalp §Observability |
| **Competitive positioning** | reusable/about-dalp §Competitive Positioning | setup/win-themes · setup/core-positioning |

---

## Setup Files Quick Reference

| File | Purpose | When to Consult |
|---|---|---|
| `setup/core-positioning.md` | Primary messaging theme: "Complexity of doing it right" | Before writing any executive summary or introduction |
| `setup/win-themes.md` | 6 strategic differentiators with usage guidance and theme combinations | When deciding which angles to emphasize in a specific bid |
| `setup/writing-style.md` | Voice, formatting rules, sentence patterns, length calibration, committee writing, DOCX rules | Before writing any bid content (mandatory compliance) |
| `setup/word-compatible-markdown.md` | Markdown-to-Word formatting rules (headings, tables, diagrams) | Before outputting any final document |
| `setup/ip-protection.md` | What to include/exclude to protect IP | Before finalizing any bid document (mandatory review checklist) |

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
