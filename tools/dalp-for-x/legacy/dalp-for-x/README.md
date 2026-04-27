---
title: "dalp-for-x"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.652371Z
---

# dalp-for-x

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

## 🔴 NO EMOJI IN OUTPUT DOCUMENTS (Gyan directive, 2026-04-03)
Emoji characters are COMPLETELY FORBIDDEN in any client-facing output (DOCX, PPTX, PDF, HTML pages).
This includes: confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji.
Replace with text equivalents: "Fully Supported" / "Partially Supported" / "Gap" / "N/A".
Internal skeleton instructions may reference emoji for readability, but output MUST strip them.

Audience-positioning pages for SettleMint DALP. Creates and maintains `/for/*` site pages in HubSpot targeting specific regions, asset classes, sectors, and regulations. Each page answers: "What does DALP do for us specifically?"

## What It Does

- Researches each target audience (regulations, key players, market context)
- Writes audience-first copy — starts with the audience's world, not DALP's features
- Generates structured 6-section pages following a locked framework
- PATCHes or POSTs HubSpot site pages via the CMS API
- Supports both full backfill (all targets) and targeted single-page creation/updates
- All pages live in HubSpot portal **8639589** (EU1) at `https://www.settlemint.com/for/[slug]`

## URL Pattern

```
/for/[slug]

Examples:
  /for/japan          → DALP for Japan (regional)
  /for/bonds          → DALP for Bonds (asset class)
  /for/banks          → DALP for Banks (sector)
  /for/mifid-ii       → DALP for MiFID II (regulation)
  /for/tokenization   → DALP for Tokenization (use case)
```

## How to Trigger

### Create a single new page
```
create dalp-for-japan page
create dalp-for-singapore page
```

### Update a single page
```
update for/japan
regenerate dalp-for-bonds page
```

### Update multiple pages
```
update for/bonds and for/singapore
regenerate pages for japan and uae
```

### Backfill all pages
```
backfill all dalp-for-x pages
```
Processes the full queue in `setup/BACKFILL-QUEUE.md`. Starts with existing DRAFTs, then creates new pages for targets that don't have a page yet.

## Source Material

The agent draws from four sources, in order:

1. **DALP narrative** (`/Users/quark/.openclaw/workspace/notion/dalp-narrative.md`) — canonical positioning and messaging
2. **Capability mapping** (`/Users/quark/Public/quark/workspace/product/dalp/capability-mapping/`) — verified capability records with code-backed evidence
3. **RFI question bank** (`/Users/quark/Public/quark/workspace/product/dalp/bid-kit/sections/rfi-question-bank.md`) — confidence-flagged answers to institutional procurement questions
4. **External research** — web research on the target audience: applicable regulations, key institutions, market context, what buyers care about

## Where Things Live

| What | Where |
|------|-------|
| HubSpot portal | 8639589 (EU1) |
| Page URL pattern | `https://www.settlemint.com/for/[slug]` |
| Target registry | `setup/TARGET-REGISTRY.md` |
| Backfill queue | `setup/BACKFILL-QUEUE.md` |
| Workflow rules | `setup/RULES.md` |
| Build lessons | `feedback/lessons.md` |

## DALP Composability (For Use Case Positioning)

> Canonical source: `product/dalp/composability.md` and `shared/content/composability.md`

Composability is central to "DALP for X" positioning. It explains how one platform serves any use case without custom development. One contract type (DALPAsset) represents any financial instrument by combining runtime-pluggable token features and compliance modules.

### How to Use Composability Per Audience Type

**Regional pages** (e.g., /for/japan, /for/singapore): Lead with the relevant regulatory template. DALP ships 7 pre-seeded templates: MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding. Explain how compliance modules enforce jurisdiction-specific rules on-chain.

**Asset class pages** (e.g., /for/bonds, /for/real-estate): Lead with the relevant asset preset and its default features. Bond = Fixed Treasury Yield + Maturity Redemption + Historical Balances. Equity = Voting Power + Historical Balances. Fund = AUM Fee + Voting Power + Historical Balances. Then explain that these are starting points, not limits.

**Sector pages** (e.g., /for/banks, /for/asset-managers): Lead with composability as operational flexibility. Banks need multiple instrument types from one platform. 11 token features and 12 compliance modules cover fees, governance, lifecycle, identity, geographic restrictions, transfer controls. Post-deployment reconfiguration means no redeployment for changes.

**Regulation pages** (e.g., /for/mifid-ii, /for/mica): Lead with the RPN compliance expression engine and specific module combinations. Show how DALP enforces regulatory requirements on-chain: country lists, investor counts, holding periods, KYC/AML verification, supply caps.

### Token Features (11)

Fees and Charges (4): Transaction Fee, Transaction Fee Accounting, External Transaction Fee, AUM Fee. Governance and Snapshots (3): Historical Balances, Voting Power, Permit. Lifecycle and Yield (2): Maturity Redemption, Fixed Treasury Yield. Transformation (2): Conversion, Conversion Minter.

### Compliance Modules (12)

Geographic Restrictions (2): Country Allow List, Country Block List. Identity Access Control (3): Identity Allow List, Identity Block List, Address Block List. Claim-Based Verification (1): SMART Identity Verification. Supply and Investor Limits (3): Token Supply Limit, Investor Count, Capped. Time-Based Rules (1): Time Lock. Transfer Controls (2): Transfer Approval, Collateral.

## Dependencies

- `HUBSPOT_ACCESS_TOKEN` env var must be set (it is, in the OpenClaw gateway config)
- DALP narrative: `/Users/quark/.openclaw/workspace/notion/dalp-narrative.md`
- SOUL.md banned phrases: `/Users/quark/Public/quark/workspace/SOUL.md`
- Capability mapping: `/Users/quark/Public/quark/workspace/product/dalp/capability-mapping/`

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
