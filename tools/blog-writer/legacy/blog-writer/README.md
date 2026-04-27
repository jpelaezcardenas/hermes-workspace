---
title: "BlogWriter"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.649978Z
---

# BlogWriter

SettleMint's dedicated blog article writing and rewriting agent.

## What It Does

Writes and rewrites blog articles, insights pieces, and long-form content for SettleMint's website. Covers the full SEO workflow: content structure, keyword targeting, internal linking, external citations, meta fields, and schema markup — with a mandatory self-critique pass before every delivery.

## Files

- `SOUL.md` — Identity, SEO methodology, DALP knowledge, workflow, all rules
- `AGENTS.md` — Agent operating instructions, checklists, API patterns
- `USER-PROMPT-GUIDE.md` — How to request work

## Key Rules (Non-Negotiable)

- No emoji in output — ever. Emoji characters are completely forbidden in any client-facing output. Replace with text equivalents.
- No em dashes (—) — ever
- No banned phrases — ever
- No DALP speculation — verify against approved material only
- EVM-only — never claim non-EVM network support
- Self-critique is mandatory — never deliver a first draft
- Internal links are mandatory — every article
- External citations need sources — every statistic

## Trigger via Quark

Tag Quark in `#fab-quark-articles-review` or any relevant channel with your article request. See `USER-PROMPT-GUIDE.md` for prompt formats.

## DALP Composability Reference

> Canonical source: `product/dalp/composability.md` and `shared/content/composability.md`

When writing technical blog posts about DALP's token architecture, compliance framework, or competitive positioning, use these verified facts. Never speculate beyond what is documented here.

### Core Concept

One contract type (DALPAsset) represents any financial instrument by combining runtime-pluggable token features and compliance modules. No fixed token types. Features and compliance rules are building blocks that can be mixed, matched, added, and removed at any time, even after deployment.

### Token Features (11 across 4 categories)

**Fees and Charges (4):** Transaction Fee (BPS-based, deducted per transfer), Transaction Fee Accounting (off-chain reconciliation tracking), External Transaction Fee (fixed fee in a separate ERC-20), AUM Fee (time-based management fee, inflationary minting)

**Governance and Snapshots (3):** Historical Balances (point-in-time queries via checkpoints), Voting Power (delegated governance, compatible with Governor contracts), Permit (EIP-2612 gasless approvals)

**Lifecycle and Yield (2):** Maturity Redemption (bond maturity lifecycle, blocks post-maturity transfers), Fixed Treasury Yield (fixed-rate yield at intervals, pull-based claiming)

**Transformation (2):** Conversion (convertible instrument, loan-side burn), Conversion Minter (companion equity-side mint)

### Compliance Modules (12 across 6 categories)

**Geographic Restrictions (2):** Country Allow List, Country Block List

**Identity Access Control (3):** Identity Allow List, Identity Block List, Address Block List

**Claim-Based Verification (1):** SMART Identity Verification with RPN expression engine (supports KYC, AML, ACCREDITED, CONTRACT, JURISDICTION with AND/OR/NOT operators)

**Supply and Investor Limits (3):** Token Supply Limit (rolling-window issuance cap), Investor Count (max unique holders), Capped (hard supply cap)

**Time-Based Rules (1):** Time Lock (FIFO holding period enforcement)

**Transfer Controls (2):** Transfer Approval (pre-authorization with configurable expiry), Collateral (on-chain collateral ratio enforcement)

### 7 Regulatory Templates

MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding.

### 7 Asset Presets

Bond, Equity, Fund, StableCoin, Deposit, Real Estate, Precious Metal. These are starting points; any free-form asset type name is supported.

### Key Differentiator for Blog Positioning

Runtime-pluggable, not compiled-in. Post-deployment reconfiguration under GOVERNANCE_ROLE without redeployment. One configurable contract vs. competitors' fixed specialized contract types.

## Built

Created March 2026 based on the rewrite process developed with Fab for the SettleMint insights section.

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
