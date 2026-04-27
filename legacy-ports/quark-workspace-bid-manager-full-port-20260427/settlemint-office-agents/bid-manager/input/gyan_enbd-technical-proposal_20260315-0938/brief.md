# ENBD Technical Proposal: Input Brief

## Request
- **Requested by:** Gyan (VP Sales)
- **Date:** 2026-03-15
- **Type:** Technical Proposal (unsolicited, no RFP document)
- **Target pages:** 40 (use technical-medium skeleton, target ~15,000 words)
- **Output:** Markdown + DOCX

## Client: Emirates NBD

### Company Profile
- **Name:** Emirates NBD
- **Sector:** Banking & Financial Services
- **HQ:** Dubai, UAE
- **Assets:** ~AED 900B+ ($245B+), largest banking group in MENAT region
- **Ownership:** Investment Corporation of Dubai (majority)
- **Regulatory:** UAE Central Bank + DFSA (DIFC branch) + VARA

### Digital Asset Maturity: CLM Level 4 (Scaling)
- **January 2026:** Issued MENA's first AED 1 billion ($272M) digital bond on Nasdaq Dubai via Euroclear's D-FMI, 3-year fixed-rate Digitally Native Notes
- **February 2026:** Classified Bitcoin as "digital gold" in official 2026 market outlook; considering 1% Bitcoin allocation (~$100k fair value)
- **September 2025:** Participating in Swift's blockchain-based ledger infrastructure trials for cross-border payment tokenization
- **August 2024-Present:** Leading Partior implementation (J.P. Morgan-BNY Mellon-DBS initiative for DVP settlement)
- **December 2024:** Invested in Zodia Custody through Innovation Fund
- **Digital Asset Lab:** Active since May 2023, council members include PwC, Fireblocks, Chainalysis, Chainlink
- **Stake Investment:** Led $31M Series B in UAE real estate tokenization platform
- **Property Tokenization:** Dubai resale market tokenization with digital tokens

### Key Contacts
- **Wasif Iqbal Shaikh**: Digital Innovation Senior Manager, Digital Asset Lab Lead
- **Yazad Khandhadia**: (meeting attendee, no title confirmed)
- **Chitra Janak**: (meeting attendee, TBS)
- **Saud Al Dhawyani**: (from LinkedIn, role unconfirmed)

### RFI Workshop Context (March 3, 2026)
Emirates NBD is evaluating vendors for their digital assets program across three categories:
1. **Custody**: institutional custody infrastructure
2. **Tokenization**: multi-asset tokenization platform
3. **Stablecoin**: stablecoin issuance and management

### Their Probable Pain Points
- Issued digital bond on Euroclear D-FMI but need own platform for scale/multi-asset
- Need robust compliance engine as they expand beyond bonds to other RWAs
- Exploring stablecoin, need infrastructure for issuance, compliance, custody
- Custody integration gap, "bring-your-own-custodian" model important
- Multiple point solutions (Euroclear, Fireblocks, Chainalysis, Chainlink) need unification

### Competitive Landscape
| Competitor | Threat Level | Notes |
|------------|--------------|-------|
| Euroclear D-FMI | High | Already using for digital bonds |
| Fireblocks | Medium | Custody/infrastructure partner, in DAL council |
| ConsenSys | Medium | Enterprise Ethereum, not lifecycle platform |
| R3 (Corda) | Medium | Enterprise DLT, not tokenization-focused |
| Tokeny | Low-Medium | Issuer platform, less comprehensive than DALP |
| Chainalysis | N/A | Compliance provider, in DAL council, complementary not competing |

### DALP Fit Analysis (8/10)
1. **Full Lifecycle Platform**: consolidates their point solutions
2. **Compliance Engine**: 18 modules, ERC-3643, OnchainID for investor verification
3. **Servicing Automation**: coupon payments, maturity handling for digital bonds
4. **Multi-Network Flexibility**: permissioned + public networks
5. **Custody Orchestration**: bring-your-own-custodian fits their Zodia/Fireblocks relationships

### Known DALP Gaps for ENBD (be honest about these)
See workaround docs at `../../product/dalp/workarounds/enbd/`: 28 documented gaps:
- 4 addressable (reframe as architecture choices)
- 9 partial workarounds
- 15 genuine gaps (wallet orchestration, exchange connectivity, KYT/KYW, travel rule, regulatory reporting, risk framework, book-building, reserve management, redemption workflows, merchant distribution)

**Key rule:** For genuine gaps, position honestly as "architecture boundary" or "partner ecosystem", never claim DALP does something it doesn't.

## Proposal Focus Areas

### Primary (align to their RFI categories)
1. **Tokenization Platform**: multi-asset lifecycle (bonds, equity, funds, real estate, stablecoins)
2. **Compliance & Regulatory**: UAE alignment (VARA, CBUAE, DFSA), ERC-3643, 18 modules
3. **Custody Orchestration**: bring-your-own-custodian model with Fireblocks/Zodia integration
4. **Stablecoin Infrastructure**: issuance, compliance, minting/burning (acknowledge gaps honestly)

### Secondary
5. **Architecture & Security**: enterprise-grade, sovereign deployment, HSM, private networks
6. **Implementation Approach**: phased delivery model
7. **SettleMint Track Record**: 7+ years in production, regulated institution deployments

## Tone
- Institutional, precise, evidence-led
- Acknowledge their sophistication, they've already issued a $272M digital bond
- Don't educate them on blockchain basics
- Position DALP as the lifecycle unification layer for their existing ecosystem
- "Complexity of Doing It Right" positioning

## DALP Screenshots
Include relevant screenshots from `../shared/brand/dalp-screenshots/CATALOG.md`: particularly:
- Dashboard / Asset overview
- Asset Designer (bond configuration)
- Compliance module configuration
- Monitoring / Operations views

## Cover Page Details
- **Title:** Technical Proposal. Digital Asset Lifecycle Platform for Emirates NBD
- **Subtitle:** Unified Tokenization, Compliance, and Custody Orchestration
- **Client:** Emirates NBD
- **Contact:** Gyan Sharma, VP of Sales, SettleMint
- **Email:** gyan@settlemint.com
- **Phone:** +32 2 123 4567
- **Date:** March 15, 2026
