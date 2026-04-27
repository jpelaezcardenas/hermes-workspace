# Tokenized Asset Brokerage Platform Upgrade
## Commercial Proposal for Bitpanda GmbH
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Bitpanda GmbH, Vienna, Austria
**Document reference:** SM-COMM-BITPANDA-2026-001
**Classification:** Strictly Confidential
**Version:** 1.0
**Date:** March 2026

---

## Table of Contents

1. Executive Summary
2. Investment Rationale
3. Licensing Model
4. Deployment Options and Pricing
5. Support and SLA Framework
6. Implementation Investment
7. Commercial Terms
8. Total Cost of Ownership
9. Reference Clients
10. Next Steps

---

## Executive Summary

Bitpanda's tokenized asset brokerage platform upgrade is a strategic programme that will define Bitpanda's competitive position in the European retail investment market for the next decade. The question is not whether to build this capability, but how to build it in a way that delivers production-ready tokenized equity and ETF brokerage within 2026, satisfies MiCA CASP compliance requirements, and operates at the scale of 4 million retail investors without requiring a dedicated blockchain engineering team.

SettleMint's DALP platform addresses this challenge through a production-tested tokenization infrastructure that includes ERC-3643 regulated token implementation, OnchainID investor eligibility verification, fractional asset lifecycle automation, and institutional custody integration with Fireblocks and DFNS. The platform license model provides access to this full capability set for EUR 280,000 per year (Enterprise tier), with a one-time implementation investment of EUR 380,000 to EUR 420,000 for the 15 to 19 week Phase 1 programme.

The investment case is compelling. Custom development of equivalent capability for a 4 million investor retail brokerage would require EUR 4 to 6 million in engineering investment over 18 to 24 months, plus ongoing engineering team cost of EUR 1 to 2 million per year. DALP delivers the same production capability in 4 months at a total Year 1 investment of approximately EUR 680,000, with ongoing operating costs of EUR 520,000 per year (platform license plus Enterprise support plus infrastructure).

Three directly relevant reference deployments demonstrate DALP's production credibility for Bitpanda's programme: KBC Securities Bolero Crowdfunding (European regulated equity brokerage), Standard Chartered Digital Virtual Exchange (fractional tokenization at institutional scale), and ADI Finstreet (tokenized equity with corporate actions and institutional custody).

### Investment Summary

| Investment Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 400,000 | - | - | EUR 400,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (Private Cloud, EU) | EUR 45,000 | EUR 50,000 | EUR 55,000 | EUR 150,000 |
| Custody (DFNS/Fireblocks, estimated) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| **Total** | **EUR 895,000** | **EUR 505,000** | **EUR 543,000** | **EUR 1,943,000** |

---

## Investment Rationale

### The Cost of Building from Scratch

The alternative to DALP for Bitpanda's tokenized brokerage programme is custom development. The cost components of custom development are:

ERC-3643 smart contract engineering: implementing ERC-3643 correctly at institutional scale requires senior smart contract engineers with specific expertise in the standard. Market rate for this skill set in Europe is EUR 180,000 to EUR 280,000 fully loaded per engineer per year. Minimum team: 3 engineers for 18 to 24 months. Cost: EUR 800,000 to EUR 1,680,000.

OnchainID identity system: integrating OnchainID at the scale of 4 million investors requires additional engineering for identity claim management, batch registration, and eligibility verification. Additional 2 engineers for 12 months. Cost: EUR 360,000 to EUR 560,000.

Custody integration: implementing Fireblocks and DFNS integrations correctly for institutional-grade brokerage operations. Additional 1 engineer for 6 months plus custody provider integration fees. Cost: EUR 90,000 to EUR 140,000.

Compliance module development: implementing the compliance rule engine for 10 to 18 module types. Additional 1 engineer for 12 months. Cost: EUR 180,000 to EUR 280,000.

Infrastructure: observability stack, indexer, API layer, deployment tooling. 2 engineers for 12 months. Cost: EUR 360,000 to EUR 560,000.

Security audit: smart contract security audit by a recognized firm. EUR 80,000 to EUR 150,000.

**Total custom development estimate: EUR 1,870,000 to EUR 3,370,000 (one-time) + EUR 1,200,000 to EUR 2,000,000 per year ongoing engineering team.**

This compares to DALP's EUR 400,000 implementation and EUR 280,000 per year platform license. The savings are substantial, and the DALP timeline (15 to 19 weeks) is dramatically faster than the custom development alternative (18 to 24 months).

### The Opportunity Cost of Delayed Launch

Every month Bitpanda delays production tokenized brokerage is a month that competitors can move into the market. The European tokenized securities market is at an early stage, and first-mover positioning for MiCA CASP-licensed tokenized equity brokerage has lasting competitive value.

At Bitpanda's existing user growth rate, each additional month before tokenized brokerage launch represents retail investors who choose alternative platforms that offer tokenized investment products. The customer acquisition cost to recapture these investors later is higher than retaining them through an expanded product offering.

DALP's 15 to 19 week production timeline creates an opportunity for Bitpanda to launch tokenized brokerage within Q4 2026, ahead of most European competitors who are still at exploration or pilot stage.

### Revenue Creation Through Tokenized Brokerage

DALP enables Bitpanda to generate new revenue through tokenized instrument trading:

Brokerage spread on tokenized equity trades: at Bitpanda's current retail trading model, spread revenue on tokenized equity trades can mirror the spread applied to crypto trading. For a 4 million user base with even 5 percent adoption of tokenized equity products at EUR 1,000 average position size, Bitpanda manages EUR 200 million in tokenized equity AUM with associated brokerage revenue.

Management fees for tokenized ETF instruments: the AUM fee feature enables Bitpanda to collect management fees from tokenized ETF positions, creating recurring revenue from the AUM under management.

Corporate action service fees: Bitpanda can charge corporate action administration fees for dividend processing and corporate event handling, creating incremental revenue from each lifecycle event.

Premium features for professional investors: professional investor access to higher-value instruments, lower fees, and enhanced reporting creates a premium tier product differentiation.

### MiCA CASP Compliance Value

Bitpanda's existing MiCA CASP license creates a regulatory moat that competitors without CASP authorization cannot easily replicate. Building a production tokenized brokerage on DALP reinforces this moat by demonstrating operational CASP compliance at scale, not merely holding the license.

DALP's compliance architecture provides the evidence trail that distinguishes Bitpanda's MiCA CASP operations from competitors who might obtain a CASP license but cannot demonstrate the operational compliance that regulators will increasingly scrutinize.

---

## Licensing Model

### Platform Tiers

| Tier | Annual License | Key Features |
|---|---|---|
| Foundation | EUR 80,000 | Development/staging; encrypted database key storage; standard support; quarterly releases |
| Enterprise | EUR 280,000 | Production brokerage; cloud KMS/HSM key storage; Enterprise support; continuous releases; Fireblocks/DFNS integration |
| Sovereign | EUR 480,000 | Maximum security; on-premises; HSM mandatory; dedicated support; custom release coordination |

**Recommendation: Enterprise tier** for Bitpanda's production tokenized brokerage infrastructure.

### What Is Included

All platform tiers include: complete DALP platform (Asset Console, DAPI, Execution Engine, Key Guardian, Chain Indexer, Chain Gateway, Feeds System, Observability Stack). All seven asset class templates (Equity, Fund, Bond, Deposit, Stablecoin, Real Estate, Precious Metal) plus Configurable Token. All 18 compliance module types. XvP Settlement contracts. OnchainID identity system. REST API (OpenAPI 3.1), TypeScript SDK, CLI, event webhooks. Multi-chain EVM support. Helm deployment tooling. Release updates per contracted cadence. Standard compliance module updates for regulatory changes.

### Multi-Environment Pricing for Bitpanda

| Environment | Tier | Annual |
|---|---|---|
| Production (Austria EU region) | Enterprise | EUR 280,000 |
| Staging (production-equivalent, testnet) | Foundation | EUR 40,000 |
| Development (local testnet, relaxed compliance) | Foundation | EUR 20,000 |
| **Total multi-environment** | | **EUR 340,000/year** |

---

## Deployment Options and Pricing

### Recommended: Private Cloud (EU Data Residency)

For Bitpanda's Austrian regulatory context and GDPR data residency obligations, Private Cloud deployment in Bitpanda's AWS eu-central-1 or Azure West Europe is recommended. This provides full infrastructure control with EU data residency.

**Estimated annual infrastructure cost (Bitpanda's cloud account):**

| Component | Annual Estimate |
|---|---|
| Kubernetes cluster (EKS/AKS, 3x m5.2xlarge, multi-AZ) | EUR 18,000 |
| PostgreSQL managed HA (db.r5.xlarge Multi-AZ) | EUR 12,000 |
| Besu validator nodes (3x t3.xlarge) | EUR 6,000 |
| Object storage (5TB S3 eu-central-1) | EUR 2,000 |
| Secrets manager and KMS | EUR 2,400 |
| Network and data transfer | EUR 4,600 |
| **Total infrastructure** | **EUR 45,000/year** |

### Managed SaaS for Development and Staging

Development and staging environments in SettleMint-managed SaaS provide fastest provisioning with lowest operational overhead. Included in Foundation tier licensing; no additional infrastructure cost to Bitpanda.

---

## Support and SLA Framework

### Enterprise Support (Recommended)

| Attribute | Enterprise Support |
|---|---|
| Annual Fee | EUR 120,000 |
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |
| Designated Team | Named support team |
| CSM | Named Customer Success Manager |
| Reviews | Bi-weekly operational, quarterly architecture |

**P1 examples for Bitpanda:** DALP dApp or DAPI unresponsive preventing investor trading; ERC-3643 compliance bypass allowing non-eligible investor to acquire tokenized security; dividend distribution system failure; Key Guardian signing failure; OMS settlement integration failure.

### Service Credits

| Uptime Achieved | Credit |
|---|---|
| Below 99.99% SLA but above 99.0% | 10% monthly support fees |
| Below 99.0% but above 98.0% | 25% monthly support fees |
| Below 98.0% | 50% monthly support fees |

---

## Implementation Investment

### Phase-by-Phase Fees

| Phase | Description | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | Stakeholder interviews; MiCA CASP regulatory mapping; OMS and custody assessment; architecture design | 3 weeks | EUR 40,000 |
| Phase 2: Configuration | Environment provisioning; equity/fund token configuration; ERC-3643 compliance module setup; OnchainID investor identity framework; RBAC configuration | 4 weeks | EUR 70,000 |
| Phase 3: Integration | OMS settlement integration; KYC/AML claim issuance integration; portfolio management integration; DFNS/Fireblocks custody connector; dividend distribution workflow; corporate action workflow | 4 weeks | EUR 110,000 |
| Phase 4: Testing | Functional testing (equity/fund lifecycle); security testing (penetration test coordination); performance testing (4M investor scale); MiCA CASP compliance validation; UAT | 3 weeks | EUR 85,000 |
| Phase 5: Go-Live | Production deployment; configuration migration; go-live validation; dedicated go-live support | 1 week | EUR 45,000 |
| Phase 6: Hypercare | Intensive monitoring; performance optimization; knowledge transfer; support transition | 4 weeks | EUR 50,000 |
| **Total Implementation** | | **19 weeks** | **EUR 400,000** |

### Implementation Assumptions

Technology readiness: Bitpanda provides OMS API documentation and sandbox access within 1 week of Phase 2 start. KYC/AML provider API available for claim issuance integration. DFNS or Fireblocks enterprise contract in place.

Asset scope: Phase 1 covers equity and fund tokens for Austrian and German markets. Additional instruments and markets in Phase 2 (separate scoping).

Investor migration: initial migration of Bitpanda's existing verified investor base to on-chain OnchainID is included in Phase 3 for investors meeting the data threshold (up to 500,000 investors). Full 4M investor migration is Phase 2 work (separate scoping).

### Change Request Day Rates

| Role | Day Rate |
|---|---|
| Solution Architect | EUR 2,500 |
| Platform Engineer | EUR 2,000 |
| Integration Engineer | EUR 2,000 |
| Security Engineer | EUR 2,200 |

---

## Commercial Terms

### Contract Structure

Master Services Agreement + Platform License Agreement (Enterprise tier, 3-year initial term) + Implementation SOW (6-phase, milestone-based) + Enterprise Support Agreement + GDPR Data Processing Agreement.

### Payment Schedule

| Milestone | Payment | Amount |
|---|---|---|
| Contract execution | License Year 1 (50%) + Phase 1 commencement | EUR 180,000 |
| Phase 1 gate review sign-off | Phase 2 commencement | EUR 70,000 |
| Phase 2 gate review sign-off | Phase 3 commencement | EUR 55,000 |
| Phase 3 gate review sign-off | Phase 4 commencement | EUR 55,000 |
| Phase 4 gate review sign-off | Phase 5 and 6 | EUR 95,000 |
| Production go-live | License Year 1 (50%) | EUR 140,000 |
| Annual renewal Year 2 | License Year 2 + Support Year 2 | EUR 400,000 |
| Annual renewal Year 3 | License Year 3 + Support Year 3 | EUR 428,000 |

### Key Terms

Minimum term: 3 years (recommended). Annual break right at each renewal with 90 days notice. Annual fee escalation: CPI-capped at 5% per year. Multi-year prepayment: 5% discount (3-year), 10% discount (5-year). GDPR-compliant DPA included. Exit assistance: included (3 days technical handover; data export within 90-day post-termination period).

---

## Total Cost of Ownership

### 3-Year TCO Model

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| SettleMint Platform License | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Foundation (Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation (Phase 1) | EUR 400,000 | - | - | EUR 400,000 |
| Phase 2 Implementation (investor migration, additional markets) | - | EUR 120,000 | - | EUR 120,000 |
| **SettleMint Fees Subtotal** | **EUR 860,000** | **EUR 580,000** | **EUR 494,000** | **EUR 1,934,000** |
| Private Cloud Infrastructure | EUR 45,000 | EUR 50,000 | EUR 55,000 | EUR 150,000 |
| Custody (DFNS/Fireblocks) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| Bitpanda Internal (1.5 FTE engineering, 0.5 FTE operations) | EUR 200,000 | EUR 100,000 | EUR 100,000 | EUR 400,000 |
| **Total 3-Year TCO** | **EUR 1,155,000** | **EUR 785,000** | **EUR 709,000** | **EUR 2,649,000** |

### Build vs. Buy 3-Year Comparison

| Category | Custom Build (3yr) | DALP (3yr) | Saving |
|---|---|---|---|
| Development (one-time) | EUR 2,500,000 | EUR 400,000 | EUR 2,100,000 |
| Engineering team (ongoing) | EUR 1,500,000 | EUR 300,000 (internal) | EUR 1,200,000 |
| Platform/infrastructure | EUR 300,000 | EUR 465,000 | -EUR 165,000 |
| Security/compliance | EUR 200,000 | Included in platform | EUR 200,000 |
| **3-Year Total** | **EUR 4,500,000** | **EUR 2,649,000** | **EUR 1,851,000 (41%)** |

DALP delivers 41% cost advantage over custom development over 3 years, with the additional benefit of 15 to 19 weeks to production vs. 18 to 24 months.

### 5-Year TCO Model

| Category | 5-Year Total (DALP) | 5-Year Total (Custom Build) |
|---|---|---|
| Development/Implementation | EUR 520,000 | EUR 2,500,000 |
| Platform/Engineering team | EUR 1,780,000 | EUR 3,000,000 |
| Infrastructure and custody | EUR 675,000 | EUR 600,000 |
| Internal Adyen costs | EUR 600,000 | EUR 1,000,000 |
| **5-Year Total** | **EUR 3,575,000** | **EUR 7,100,000** |

---

## Reference Clients

### KBC Securities Bolero Crowdfunding (Belgium)

Upgraded the brokerage backend of Belgium's leading equity crowdfunding platform using DALP's smart contract lifecycle automation. Replaced manual processes for equity and loan instrument issuance, lifecycle management, corporate actions, and redemption. Outcome: reduced operational costs, regulatory compliance, scalable growth. Commercial context: similar program structure to Bitpanda's proposal with milestone-based implementation and annual platform license. Operated under FSMA supervision, comparable to Bitpanda's FMA and MiCA CASP context.

### ADI Finstreet (Abu Dhabi)

Tokenized equity issuance and management on Abu Dhabi mainnet. Corporate action automation (stock splits, consolidations via ERC20Votes). DFNS institutional custody integration. Deployed in a regulated environment under FSRA oversight. Commercial context: the first Phase deployed in comparable timeline to Bitpanda's proposal. Demonstrated DFNS integration cost and timeline comparable to the estimates in this proposal.

### Standard Chartered Digital Virtual Exchange (Asia/Africa/Middle East)

Fractional tokenization of securities for institutional investors across multiple regulated jurisdictions. Demonstrated DALP's ability to handle fractional asset trading workflows at institutional scale with multi-jurisdiction compliance enforcement. Commercial context: the engagement demonstrated the platform expansion model where initial deployment extends to new asset classes and jurisdictions using the same platform infrastructure.

### Reference Call Availability

Reference calls with KBC Securities Bolero and ADI Finstreet commercial and technical stakeholders available within 5 business days of written shortlist request. Reference call agenda: implementation experience, commercial satisfaction, support quality, platform capability assessment, and programme outcomes.

---

## Next Steps

### Following Submission

**Clarification period (by 03 April 2026):** SettleMint responds to Bitpanda's clarification questions within 2 business days. Bid lead available at bids@settlemint.com.

**Shortlist notification (by 15 May 2026):** on shortlist notification, SettleMint provides within 5 business days: vendor risk assessment artefacts (ISO 27001, SOC 2 Type II, penetration test attestation), architecture walkthrough scheduling, and reference call arrangements.

**Deep-dive sessions (Late May 2026):** proposed agenda:
- Day 1 AM: ERC-3643 and OnchainID technical deep-dive; live demo of equity token lifecycle
- Day 1 PM: MiCA CASP compliance architecture; audit trail demonstration; regulatory evidence review
- Day 2 AM: Implementation programme review; OMS integration design; KYC integration walkthrough
- Day 2 PM: Commercial terms discussion; contract framework; reference call scheduling

**Award recommendation (June 2026):** SettleMint provides binding implementation commitment, milestone-based plan, and contract-ready term sheet within 5 business days of verbal award indication.

**Implementation start (Q3 2026):** Phase 1 kickoff within 10 business days of contract execution. Phase 5 production go-live target: mid-October 2026.

### Primary Contacts

**Bid Lead:** bids@settlemint.com (all clarifications and evaluation engagement)
**Executive Sponsor:** Available on request for escalation and partnership discussions

SettleMint looks forward to supporting Bitpanda's tokenized brokerage programme and building a long-term partnership for MiCA CASP tokenization in European retail investment.

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*

---

## Appendix A: Detailed Investment Rationale

### Quantifying the Tokenized Brokerage Market Opportunity

The European retail investment market represents a significant opportunity for Bitpanda's tokenized brokerage programme. European retail investors collectively hold approximately EUR 10 trillion in savings and investments, with the majority in traditional banking products. The shift toward capital markets investment, accelerated by low deposit rates and increasing financial literacy, creates growing demand for accessible equity and ETF investment products.

Tokenization specifically addresses the accessibility barrier that has historically excluded retail investors from direct equity ownership: minimum investment thresholds. A EUR 1,000 stock that requires EUR 1,000 minimum investment is accessible to a small fraction of Bitpanda's user base. The same stock tokenized with EUR 1 minimum investment is accessible to virtually all 4 million registered users. This fractional access model, proven in crypto markets where Bitpanda already offers fractional Bitcoin and Ethereum, extends to the far larger equity and ETF market.

The addressable tokenized equity and ETF market for Bitpanda within 3 to 5 years is substantial. If 20 percent of Bitpanda's user base (800,000 investors) each hold an average of EUR 500 in tokenized equity and ETF positions, Bitpanda manages EUR 400 million in tokenized securities AUM. At a 0.5 percent annual management fee equivalent, this generates EUR 2 million in annual recurring fee revenue from AUM management alone, before brokerage spread or transaction fee revenue.

The brokerage spread revenue on tokenized equity trading adds further potential. If 20 percent of users make an average of 6 trades per year at an average EUR 200 per trade with a 0.5 percent spread, total annual spread revenue from tokenized equity trading is EUR 48 million. This is directional and depends on actual trading behavior, but it illustrates the revenue scale available to Bitpanda as tokenized equity brokerage matures.

### The Regulatory Moat Value

Bitpanda's MiCA CASP license is a strategic asset that competitors cannot easily replicate. MiCA CASP authorization requires demonstrating compliance with a comprehensive regulatory framework covering organizational requirements, prudential standards, custody obligations, conduct requirements, and ICT risk management. The authorization process takes 6 to 18 months and requires significant internal compliance infrastructure.

By deploying DALP as the technical foundation for MiCA CASP-compliant tokenized brokerage, Bitpanda demonstrates to FMA and to the broader market that its CASP operations are built on production-grade, institutionally validated infrastructure. This operational credibility strengthens Bitpanda's regulatory standing and creates a differentiation narrative that competitors who simply hold a CASP license but have not deployed production-scale tokenized securities cannot match.

The regulatory moat value is difficult to quantify precisely but is strategically significant. In a market where MiCA is creating new regulatory clarity and new investor confidence in digital asset platforms, the ability to demonstrate MiCA CASP compliance in production at scale is a powerful competitive differentiator.

### Platform Economics at Scale

DALP's platform license model creates favorable economics as Bitpanda's tokenized brokerage programme scales. The EUR 280,000 annual Enterprise license covers unlimited asset types (equity, ETF, bond, structured product, stablecoin), unlimited token deployments, unlimited investor onboarding, and unlimited transaction volume within the license tier. As Bitpanda adds more instruments and more investors, the platform license cost stays flat.

This contrasts with the economics of custom development, where each new instrument type, each new compliance requirement, and each new market requires additional engineering investment. At scale, the fixed-cost model of DALP's platform license provides compounding economic advantage compared to the variable-cost model of custom development.

The operational leverage from DALP's automation further improves economics at scale. Dividend distribution for 100 investors and dividend distribution for 100,000 investors require the same DALP configuration; only the batch execution time increases. Corporate action execution for one equity token and corporate action execution for 50 equity tokens require the same workflow; the batch count increases proportionally. The fixed-cost automation enables Bitpanda's brokerage operations team to handle significantly more instruments and investors without proportional headcount growth.

---

## Appendix B: MiCA CASP Financial Implications

### Regulatory Capital and Prudential Requirements

MiCA Article 60-61 establishes minimum capital requirements for CASPs. While the capital requirements themselves are Bitpanda's responsibility, DALP's role as a CASP's technical infrastructure creates regulatory capital implications:

Asset custody under DALP: assets held in DALP-integrated custody (DFNS or Fireblocks MPC) satisfy MiCA's custody segregation requirements. Bitpanda's regulatory capital is calculated against its net own funds, not against client assets held in compliant custody.

ICT risk capital: DORA's requirements for operational resilience may create implicit capital requirements for ICT risk management. DALP's documented HA deployment, incident management, and resilience testing support Bitpanda's capital model by demonstrating that ICT risks are actively managed rather than uncontrolled.

Insurance and liability: Bitpanda's regulatory liability for MiCA CASP operations may be reduced by demonstrating that the technical infrastructure includes appropriate controls (ERC-3643 compliance enforcement, audit trails, custody obligations). SettleMint's ISO 27001 and SOC 2 Type II certifications contribute to Bitpanda's insurance and liability assessment.

### Audit and Examination Cost Savings

MiCA CASP operations require ongoing audit engagement. DALP's compliance evidence architecture reduces audit cost by providing structured, queryable audit trails rather than requiring manual evidence assembly for each audit cycle.

External audit scope reduction: auditors reviewing Bitpanda's MiCA CASP compliance can rely on DALP's SOC 2 Type II report (a recognized audit standard) for technology controls, reducing the scope of custom technology audit work. Industry estimates suggest a 30 to 50 percent reduction in technology audit scope for SOC 2 Type II-covered vendors.

Regulatory examination preparation: FMA examination preparation time is significantly reduced when compliance evidence is available through DALP's structured APIs rather than manual record aggregation. Bitpanda's compliance team can produce examination packages in hours rather than days.

---

## Appendix C: Commercial FAQs

**Q: Is the implementation price guaranteed to be fixed, or can it change?**

The Phase 1 through Phase 6 implementation fees are fixed at EUR 400,000 for the defined scope and assumptions stated in this proposal. Scope changes after Phase 1 gate review are subject to change requests with explicit pricing before implementation. Volume of change requests in comparable implementations suggests 5 to 15 percent of implementation fee in change requests is typical; SettleMint discloses this so Bitpanda can budget appropriately.

**Q: What happens if Bitpanda needs Phase 2 (full 4M investor migration, additional markets)?**

Phase 2 is separately scoped following Phase 1 completion. Phase 2 is estimated at EUR 100,000 to EUR 150,000 depending on the number of additional markets, additional instrument types, and investor migration volume. Phase 2 scope is defined during Phase 1 discovery.

**Q: Are there transaction fees or per-investor fees beyond the platform license?**

No. The Enterprise tier platform license covers unlimited transactions, unlimited investors, and unlimited asset types within the licensing tier. Volume thresholds exist (1,000,000 monthly on-chain transactions, 100,000 active wallets) but are unlikely to be reached in Phase 1 scope. SettleMint provides 60-day advance notice if usage approaches threshold.

**Q: How does the custody pricing work?**

DFNS and Fireblocks custody fees are charged directly by the custody provider, not through SettleMint. SettleMint's implementation includes the custody connector integration and operational support for the custody integration. Bitpanda negotiates custody pricing directly with DFNS or Fireblocks. Estimated custody fees in the TCO model are based on published institutional pricing and should be confirmed with the chosen custody provider.

**Q: What is the exit process and cost?**

Exit assistance is included in standard commercial terms for up to 3 days of technical handover. Data export (complete token positions, transaction history, compliance records, configuration) is provided through DALP's export APIs at no additional charge. Extended transition support beyond 3 days is billed at standard day rates. There is no exit penalty beyond the standard notice period and any outstanding fees.

**Q: How does SettleMint handle Austrian VAT?**

SettleMint NV is a Belgian-registered entity (VAT BE0693.548.997). Services provided to Bitpanda GmbH (Austrian VAT-registered entity) are subject to the EU reverse charge mechanism under Article 196 of the VAT Directive. Bitpanda accounts for VAT under the reverse charge mechanism and SettleMint invoices are VAT-exclusive. Bitpanda's tax advisors should confirm the applicable treatment.

---

## Appendix D: Detailed Volume and Scaling Thresholds

### Included Volume in Enterprise Tier

| Metric | Enterprise Tier Included |
|---|---|
| Active token types | Unlimited |
| Monthly on-chain transactions | Up to 1,000,000 |
| Active investor wallets | Up to 100,000 |
| API requests (monthly) | Up to 50,000,000 |
| Data storage (PostgreSQL indexed) | Up to 500 GB |
| Compliance module types | All 18 types |
| Asset class templates | All 7 plus Configurable Token |
| Multi-chain EVM networks | Unlimited |

### Phase 1 Volume Estimates for Bitpanda

Based on Bitpanda's existing user engagement metrics and the Phase 1 scope (Austrian and German markets, equity and ETF instruments), SettleMint estimates:

- Initial investor migration: 50,000 to 100,000 active investors onboarded in first 3 months
- Monthly on-chain settlements: 200,000 to 400,000 DvP settlement transactions (based on 2-4 trades/month per active investor)
- Active token types: 10 to 30 equity and ETF instruments in Phase 1
- Dividend distributions: 4 events per year per instrument, each processing up to 100,000 investors

All Phase 1 volume estimates are well within the Enterprise tier included volume. Growth toward the 100,000 investor wallet threshold is expected to occur in Phase 2 (full investor migration) rather than Phase 1.

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com | March 2026*

---

## Appendix E: Detailed TCO Scenarios

### Conservative Scenario (Slow Adoption)

Assumptions: Phase 1 instruments limited to 5 equity tokens; 20,000 active investors in Year 1; limited corporate action activity; standard platform usage.

| Category | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| SettleMint fees | EUR 860,000 | EUR 460,000 | EUR 454,000 |
| Infrastructure and custody | EUR 75,000 | EUR 80,000 | EUR 85,000 |
| Internal costs | EUR 150,000 | EUR 75,000 | EUR 75,000 |
| **Scenario Total** | **EUR 1,085,000** | **EUR 615,000** | **EUR 614,000** |
| **Revenue (spread + fees)** | EUR 200,000 | EUR 800,000 | EUR 1,500,000 |
| **Net Operating Cost** | EUR 885,000 | -EUR 185,000 | -EUR 886,000 |

Under even the conservative scenario, the investment becomes net-positive in Year 2 as tokenized brokerage revenue exceeds operating costs.

### Base Scenario (Moderate Adoption)

Assumptions: 30 equity and ETF instruments; 100,000 active investors by Year 2; 4 dividend distributions per year; quarterly corporate actions.

| Category | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| SettleMint fees | EUR 860,000 | EUR 580,000 | EUR 494,000 |
| Infrastructure and custody | EUR 95,000 | EUR 105,000 | EUR 115,000 |
| Internal costs | EUR 200,000 | EUR 100,000 | EUR 100,000 |
| **Scenario Total** | **EUR 1,155,000** | **EUR 785,000** | **EUR 709,000** |
| **Revenue (spread + fees + AUM)** | EUR 500,000 | EUR 2,000,000 | EUR 4,000,000 |
| **Net Operating Cost** | EUR 655,000 | -EUR 1,215,000 | -EUR 3,291,000 |

The base scenario produces strong positive returns from Year 2, with the 3-year cumulative net position strongly positive.

### Optimistic Scenario (Strong Adoption)

Assumptions: 100+ instruments; 500,000+ active investors; multiple dividend distributions and corporate actions per month.

| Category | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| SettleMint fees | EUR 860,000 | EUR 650,000 | EUR 550,000 |
| Infrastructure and custody | EUR 120,000 | EUR 160,000 | EUR 200,000 |
| Internal costs | EUR 250,000 | EUR 150,000 | EUR 150,000 |
| **Scenario Total** | **EUR 1,230,000** | **EUR 960,000** | **EUR 900,000** |
| **Revenue** | EUR 1,500,000 | EUR 6,000,000 | EUR 12,000,000 |
| **Net Operating Cost** | EUR -270,000 | EUR -5,040,000 | EUR -11,100,000 |

Under the optimistic scenario, the investment is net-positive in Year 1 and delivers exceptional returns in Years 2 and 3 as tokenized brokerage scales.

---

## Appendix F: Risk-Adjusted Commercial Analysis

### Commercial Risk Register

| Risk | Likelihood | Impact | Commercial Mitigation |
|---|---|---|---|
| User adoption slower than projected | Medium | Medium | Conservative scenario still produces net-positive returns from Year 2 |
| MiCA implementing acts impose additional compliance costs | Medium | Low-Medium | Standard compliance module updates included in platform license |
| DFNS/Fireblocks pricing increases | Low | Low | Multiple custody providers available; switching is configuration change |
| Platform performance issues at scale | Low | Medium | Performance testing in Phase 4 validates scale; Enterprise SLA with service credits |
| Austrian FMA requires additional controls | Low | Medium | Phase 1 discovery assesses FMA requirements; modular compliance architecture accommodates changes |
| Bitpanda internal adoption slower than planned | Medium | Low | Platform license costs are fixed regardless of adoption; SettleMint's commercial exposure is implementation risk, not adoption risk |

### Scenario Sensitivity Analysis

The commercial investment is robust to the key uncertainties:

Platform license cost sensitivity: if Enterprise license price increases by 10% (EUR 28,000/year), the 3-year TCO increases by EUR 56,000 on a EUR 2.6M base (2.2% sensitivity). Commercial terms cap annual escalation at 5% CPI-based.

Custody cost sensitivity: if DFNS/Fireblocks pricing doubles, custody costs increase by EUR 60,000 over 3 years (2.3% TCO sensitivity). Custody providers are replaceable through DALP's unified signer abstraction.

Infrastructure cost sensitivity: cloud infrastructure costs are the most variable element, subject to Bitpanda's cloud provider pricing and actual transaction volumes. A 50% increase in infrastructure costs (unlikely) adds EUR 75,000 to the 3-year TCO (2.8% sensitivity).

Implementation overrun sensitivity: if implementation encounters a 2-week delay (likely scenario), total implementation cost increases by approximately EUR 40,000 in Bitpanda internal engineering costs (1.5% TCO sensitivity). SettleMint's fixed implementation fee does not increase with timeline delays within Phase scope.

---

## Appendix G: Contract Framework Summary

### Key Contract Provisions

**Platform License:** Non-exclusive, non-transferable license to use DALP within Bitpanda's corporate group. Includes all features at the licensed tier, release updates, and standard compliance module updates. Does not include custom development, consulting, or managed operations.

**Implementation SOW:** Fixed-price delivery programme with milestone-based payment schedule. SettleMint bears the risk of implementation delays caused by SettleMint-side factors. Delays caused by Bitpanda resource unavailability or decision-making delays are handled through timeline change requests without price increase.

**Enterprise Support Agreement:** Service level agreement with defined response and resolution targets. Service credits for SLA breaches as defined in the Support section. Annual renewal aligned with Platform License renewal.

**GDPR Data Processing Agreement:** GDPR-compliant DPA establishing SettleMint as data processor for personal data processed in DALP's identity management system. Bitpanda is the data controller. SettleMint's sub-processors are disclosed and Bitpanda provides advance consent for sub-processor additions. Standard contractual clauses included for any cross-border data transfers.

**Intellectual Property:** Bitpanda retains ownership of all data stored in DALP's systems. DALP platform software is licensed, not transferred. Configuration developed specifically for Bitpanda (custom claim types, webhook configurations) belongs to Bitpanda. No assignment of SettleMint IP.

**Liability:** SettleMint's total liability limited to fees paid in the 12 months preceding any claim. Service credits are the sole remedy for SLA breaches. Consequential damages excluded. Indemnification provisions address IP infringement claims by third parties against Bitpanda's use of the DALP platform.

**Termination:** Either party may terminate for material breach (with 30-day cure period). Bitpanda may terminate for convenience at each annual renewal with 90 days notice. SettleMint may terminate for non-payment (with 30-day cure period). Termination rights include exit assistance obligations on SettleMint's side.

**Governing Law:** Belgian law (SettleMint NV's jurisdiction). Disputes resolved through ICC arbitration (Brussels seat) for international disputes, or Belgian courts as alternative. Austrian law can be accommodated as an alternative governing law subject to SettleMint legal review.

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com | March 2026*

---

## Appendix H: Strategic Context and Partnership Vision

### Bitpanda as a MiCA CASP Market Leader

Bitpanda's MiCA CASP authorization, combined with a production-grade tokenized brokerage infrastructure, positions the company to lead the emerging European regulated tokenized securities market. This leadership position has commercial, regulatory, and strategic value that extends beyond the immediate brokerage revenue.

Commercial value: a recognized MiCA CASP with production tokenized equity and ETF brokerage creates a distribution opportunity for European issuers who want to offer tokenized securities to retail investors. Bitpanda's platform becomes a distribution channel for the tokenized capital markets products that European issuers are increasingly seeking to launch. Revenue from distribution partnerships, listing fees, and co-branded product launches adds to the direct brokerage revenue.

Regulatory value: being a recognized production MiCA CASP with documented operational compliance strengthens Bitpanda's relationships with national regulators across the EEA. As MiCA's implementation continues and national supervisory authorities develop their examination approaches for CASP operations, Bitpanda's early production experience creates institutional knowledge that competitors who wait will not have.

Strategic value: the tokenized securities infrastructure provides Bitpanda with the technical foundation for adjacent product development: tokenized structured products, tokenized fund distribution, tokenized real estate investment, and potentially tokenized CBDC products as European central bank digital currency initiatives progress. Each of these adjacent products uses the same DALP infrastructure, benefiting from the fixed-cost platform model.

### SettleMint's Commitment to the European Tokenized Securities Market

SettleMint has been building regulated tokenization infrastructure in Europe since the early enterprise blockchain era. The KBC Securities Bolero Crowdfunding deployment, the Commerzbank ETP programme, and SettleMint's active engagement with EBA, ESMA, and national regulators position SettleMint as a committed participant in the European tokenized securities ecosystem.

SettleMint's roadmap for DALP's European capabilities includes ongoing MiCA compliance updates as implementing technical standards are published, collaboration with European regulators on tokenized securities standards, and platform development aligned with the European Blockchain Services Infrastructure (EBSI) and other European digital finance initiatives.

By choosing DALP as the technical foundation for its tokenized brokerage programme, Bitpanda gains not just a platform vendor but a partner committed to the same regulatory ecosystem and market development. SettleMint's regulatory engagement supports Bitpanda's compliance function; DALP's platform development aligns with the regulatory direction Bitpanda's CASP compliance requires.

### A Long-Term Partnership Model

SettleMint proposes structuring the Bitpanda relationship as a long-term partnership rather than a transactional vendor engagement. The proposed partnership framework includes:

Annual product roadmap co-design: Bitpanda's product team participates in SettleMint's annual roadmap advisory process, ensuring that DALP's development priorities reflect the needs of European retail tokenized brokerage operations.

Early access programme: Bitpanda receives early access to DALP release candidates before general availability, enabling Bitpanda's engineering team to validate new capabilities against their specific use cases before production deployment.

Reference programme: with Bitpanda's consent, SettleMint references Bitpanda's programme in market communications as a leading European MiCA CASP tokenized brokerage deployment. This visibility benefits both Bitpanda's regulatory credibility and SettleMint's market positioning.

Regulatory engagement support: SettleMint's compliance team supports Bitpanda's FMA engagement on tokenized securities topics, providing technical documentation, platform capability statements, and regulatory interpretation support as needed.

Joint industry participation: SettleMint and Bitpanda co-participate in European tokenized securities industry bodies, working groups, and regulatory consultations, coordinating positions on MiCA implementing acts and technical standards that affect tokenized brokerage operations.

This partnership framework is discussed at the executive level following contract execution and does not affect the commercial terms of the platform license, implementation, or support agreements.

---

## Final Summary

The commercial case for Bitpanda's investment in DALP is straightforward:

EUR 400,000 implementation investment delivers production-grade MiCA CASP-compliant tokenized brokerage infrastructure in 15 to 19 weeks, compared to EUR 2.5 million and 18 to 24 months for custom development.

EUR 280,000 annual platform license provides access to the full DALP capability set, ongoing regulatory compliance updates, and platform development, compared to EUR 1.2 million per year for an equivalent in-house blockchain engineering team.

EUR 120,000 annual Enterprise support provides 24/7/365 coverage with 15-minute P1 response, appropriate for the payment-grade operational requirements of Bitpanda's tokenized brokerage service.

The 3-year net operating position under the base scenario is strongly positive, with investment recovery in Year 2 and material net revenue contribution in Year 3.

Bitpanda's MiCA CASP license, brand equity with 4 million users, and commitment to multi-asset investment create the commercial foundation for a tokenized brokerage programme that DALP makes technically and commercially viable. SettleMint invites Bitpanda to proceed with shortlist evaluation and to experience directly the capability, credibility, and commercial transparency that this proposal describes.

---

*End of Bitpanda Commercial Proposal*
*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com | March 2026*

---

## Appendix I: Assumptions and Dependencies Register

### Implementation Assumptions Summary

| Assumption | Category | Implication if Wrong |
|---|---|---|
| OMS has REST API with documented sandbox | Technology readiness | Message queue integration may require change request (EUR 15,000-25,000 estimate) |
| KYC provider has OpenID Connect-compatible claim API | Technology readiness | Custom integration adapter may require change request |
| Bitpanda uses Fireblocks or DFNS for custody | Technology readiness | Alternative custody provider requires custom signer adapter (scoped in Phase 1) |
| Phase 1 scope: 10-30 instruments, Austrian/German markets | Scope | Additional markets or instruments in Phase 1 require change request |
| Initial investor migration: up to 500,000 investors | Scope | Full 4M migration is Phase 2 (separately scoped at EUR 120,000-150,000) |
| Bitpanda project manager available full-time | Resource | Timeline delays caused by Bitpanda PM unavailability extend implementation |
| MiCA CASP license covers tokenized equity and ETF | Regulatory | Additional regulatory analysis if instruments require separate MiFID II authorization |
| AWS eu-central-1 or Azure West Europe for data residency | Infrastructure | Alternative cloud provider may require infrastructure sizing adjustment |

### Third-Party Dependencies

| Dependency | Provider | Bitpanda's Action |
|---|---|---|
| MPC Custody | DFNS or Fireblocks | Bitpanda negotiates and procures enterprise contract before Phase 2 start |
| Blockchain RPC Endpoints | Multiple providers (Infura, QuickNode, etc.) for public chains; private Besu self-managed | Bitpanda provisions in Phase 2 for private network |
| KYC/AML Provider | Bitpanda's existing provider | Bitpanda provides API credentials and sandbox access |
| Cloud Infrastructure | AWS or Azure | Bitpanda provides cloud account with required permissions for Private Cloud deployment |
| HSM (optional, recommended) | CloudHSM or equivalent | Bitpanda procurement; SettleMint provides configuration guidance |

### Jurisdiction-Specific Constraints

Phase 1 deployment covers Austrian and German markets. Known constraints:

Austria: FMA supervision as both MiCA CASP and possible MiFID II investment firm depending on instrument classification. SettleMint recommends Bitpanda obtains legal opinion on instrument classification for each Phase 1 token before deployment.

Germany: BaFin supervision for German investors. MiCA CASP authorization extends to Germany through EU passporting. German investor country restriction configuration confirmed in Phase 2.

Other EEA markets: expansion to additional EEA markets in Phase 2, following Phase 1 go-live and regulatory confirmation of instrument classification in each additional jurisdiction.

---

*Bitpanda Commercial Proposal - Complete*
*Document Classification: SettleMint Confidential*
*March 2026 | Version 1.0*

---

## Appendix J: Year 1 Commercial Timeline

The following commercial timeline aligns with Bitpanda's procurement calendar and SettleMint's implementation schedule.

| Event | Date | Commercial Implication |
|---|---|---|
| RFP submission deadline | 24 April 2026 | Proposal submitted by this date |
| Shortlist notification | 15 May 2026 | SettleMint provides vendor risk artefacts within 5 business days |
| Deep-dive sessions | Late May 2026 | No commercial cost; included in evaluation engagement |
| Award recommendation | June 2026 | SettleMint provides binding commitment and term sheet within 5 days |
| Contract execution | End June 2026 | First payment milestone triggered: Phase 1 commencement (EUR 180,000) |
| Phase 1 kickoff | Early July 2026 | 3-week discovery phase; Phase 2 payment on gate review sign-off |
| Phase 2 completion | Mid-August 2026 | Phase 3 commencement payment: EUR 55,000 |
| Phase 3 completion | Mid-September 2026 | Phase 4 commencement payment: EUR 55,000 |
| Phase 4 completion | Early October 2026 | Phase 5/6 payment: EUR 95,000 |
| Production go-live | Mid-October 2026 | License Year 1 balance payment: EUR 140,000 |
| Phase 6 hypercare complete | End October 2026 | Transition to Enterprise support; first support year running |
| Annual renewal Year 2 | End June 2027 | Platform License Year 2 (EUR 280,000) + Support Year 2 (EUR 120,000) |

Total Year 1 payments: EUR 525,000 (implementation milestones) + EUR 280,000 (license) + EUR 120,000 (support prepaid at execution) = EUR 925,000. Note: support is invoiced annually in advance from contract execution; the table above shows license payments only split across milestones.

The payment structure aligns cash outflows with implementation progress, ensuring Bitpanda's payment milestones reflect confirmed delivery achievements rather than time-based commitments.

---

*Bitpanda Commercial Proposal - Absolutely Complete*
*Document Classification: SettleMint Confidential*

---

## Appendix K: European Fintech Tokenization Market Context

The European fintech tokenization market is entering a new phase following MiCA's entry into application for crypto-asset services in December 2024 and the regulatory clarity it brings for tokenized digital assets. This market context is directly relevant to the commercial investment case for Bitpanda's tokenized brokerage programme.

### Market Timing

MiCA's CASP authorization framework creates a regulatory-defined window for early movers. CASPs that achieve production-grade tokenized brokerage operations in 2026 have a 12 to 24 month advantage over competitors who wait for the market to mature. This advantage manifests in: established FMA regulatory relationships built on demonstrated compliance rather than regulatory speculation; first-mover brand recognition with retail investors seeking MiCA-compliant tokenized investment products; operational experience at scale that competitors cannot quickly replicate; and distribution partnerships with tokenized security issuers who prioritize platforms with proven infrastructure.

### Competitive Landscape

Bitpanda's tokenized brokerage programme competes with two categories of potential competitors:

Category 1: other European fintechs (Revolut, Trade Republic, Scalable Capital) exploring tokenized securities. None currently have production-scale MiCA CASP-licensed tokenized equity brokerage. Most are in early exploration or pilot phases.

Category 2: traditional brokerages (Flatex, comdirect, Consorsbank) that may extend their existing securities infrastructure to tokenized instruments. These players have regulatory relationships and investor trust but lack the blockchain-native infrastructure and digital-first user experience that Bitpanda has established.

Bitpanda's combination of 4 million digital-native users, MiCA CASP authorization, and DALP-powered production tokenized brokerage infrastructure creates a competitive position that neither category can immediately replicate.

### Commercial Summary

The commercial investment in DALP is both financially sound (positive NPV under all scenarios from Year 2) and strategically essential (first-mover advantage in a market that rewards early movers disproportionately). The risk of acting is bounded by the defined implementation cost and timeline. The risk of not acting is the cost of first-mover advantage lost to competitors who move faster.

SettleMint's recommendation is unambiguous: Bitpanda should invest in DALP-powered tokenized brokerage infrastructure in 2026, leverage its MiCA CASP authorization, and establish the production credentials that will define Bitpanda's market position for the decade ahead.

### The Right Commercial Partner

Commercial partnerships for regulated infrastructure require more than competitive pricing. Bitpanda should evaluate SettleMint as a commercial partner on three dimensions: financial stability and longevity (SettleMint is backed by leading European and Middle Eastern investors, with a decade of institutional deployments providing revenue stability and operational continuity); alignment of interests (SettleMint's platform business model creates alignment with Bitpanda's success: platform license revenue grows as Bitpanda's programme expands, creating mutual incentive for programme success); and accountability (fixed-price implementation with milestone payment, SOC 2 Type II audit of security controls, defined SLAs with service credits, and exit assistance provisions create clear accountability for performance).

Bitpanda's investment in DALP is an investment in a long-term technology partnership with a company that has demonstrated commitment to the European regulated tokenization market over nearly a decade. That track record is the foundation on which this proposal rests.
