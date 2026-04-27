# Compliance Modules

## Suggested Slide Title
Compliance-by-Design, Enforced Before Execution

## Suggested Layout
- Primary: Slide 10, module breakdown
- Alternate: Slide 25, icon-led feature list

## Key Talking Points
- DALP enforces compliance ex-ante so blocked transfers fail before execution
- Identity is anchored through OnchainID and reusable verified claims
- Policies can model jurisdiction, eligibility, holding periods, supply limits, and transfer conditions
- Compliance stays configurable without rewriting the whole platform
- 12 composable compliance modules across 6 categories, all runtime-pluggable
- Two-tier compliance architecture: per-token configuration plus system-wide global modules
- RPN (Reverse Polish Notation) expression engine for arbitrary eligibility logic
- 7 pre-seeded regulatory compliance templates (MiCA EU, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA, Japan FSA, Reg CF)
- Per-token configuration with post-deployment reconfiguration under GOVERNANCE_ROLE

## The 12 Compliance Modules

| # | Module | Category | What It Does |
|---|--------|----------|--------------|
| 1 | SMART Identity Verification | Eligibility | Evaluates RPN logical expressions over identity claims (KYC, AML, ACCREDITED, CONTRACT, JURISDICTION with AND/OR/NOT operators) |
| 2 | Identity Allow List | Eligibility | Only explicitly allowed identities can receive tokens |
| 3 | Identity Block List | Eligibility | Blocks specific identities from receiving tokens |
| 4 | Country Allow List | Restriction | Only wallets from specified countries can hold the asset |
| 5 | Country Block List | Restriction | Wallets from blocked countries cannot hold the asset |
| 6 | Address Block List | Restriction | Blocks specific wallet addresses (no identity resolution needed) |
| 7 | Transfer Approval | Transfer Control | Requires pre-authorization before transfers, with configurable expiry |
| 8 | Time Lock | Time-Based | Minimum holding period enforcement using FIFO batch tracking |
| 9 | Token Supply Limit | Issuance & Supply | Rolling-window issuance cap (e.g., MiCA 8M EUR over 365 days) |
| 10 | Capped | Issuance & Supply | Hard maximum supply cap |
| 11 | Investor Count | Issuance & Supply | Maximum number of unique holders |
| 12 | Collateral | Settlement & Collateral | Enforces on-chain collateral ratio for minting via ERC-735 identity claims |

## RPN Expression Examples

| Regulation | Expression | Meaning |
|------------|-----------|---------|
| MiCA EU | `[KYC, AML, AND]` | Both KYC and AML required |
| Reg D 506(b) | `[ACCREDITED, KYC, AML, AND, OR]` | Accredited OR (KYC AND AML) |
| Reg D 506(c) | `[ACCREDITED]` | Only accredited investors |
| Japan FSA | `[CONTRACT, KYC, AML, AND, OR]` | QII (corporate) or (KYC AND AML) |

## Two-Tier Compliance Architecture
- **Per-Token Compliance**: Each token has its own compliance configuration. Modules can be added, removed, and reconfigured under GOVERNANCE_ROLE.
- **System Compliance**: Global modules that apply to ALL tokens. Bypass list for operational exemptions.
- **Sequential evaluation**: Every module must pass. Single veto blocks the transfer.

## Supporting Proof Points
- 12 concrete compliance module type IDs verified against codebase contracts
- ERC-3643 / T-REX is the regulated-token standard DALP implements
- Multi-jurisdiction positioning references EU MiCA, Singapore MAS, UK FCA, and Japan FSA
- Sources: `notion/dalp-narrative.md`, `product/dalp/capability-mapping/compliance-and-identity.md`, `product/dalp/composability.md`
