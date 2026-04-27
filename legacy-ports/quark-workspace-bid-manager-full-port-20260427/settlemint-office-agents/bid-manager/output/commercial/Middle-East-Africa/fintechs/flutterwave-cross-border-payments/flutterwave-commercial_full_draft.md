# Commercial Proposal: Tokenized Cross-Border Payments Orchestration

**Prepared for:** Flutterwave (Nigeria / Pan-Africa)
**Prepared by:** SettleMint NV
**Date:** March 2026
**Version:** v1.0
**Reference:** FLUTTERWAVE-RFP-TOKENIZED-CROSS-BORDER-PAYMENTS-202603
**Classification:** SettleMint Confidential

---

## Table of Contents

- Executive Summary
- Investment Summary
- Licensing and Subscription Model
- Implementation Investment
- Support and Operational Costs
- Total Cost of Ownership Analysis
- Payment Terms and Commercial Structure
- Value Realisation and ROI Analysis
- Commercial Assumptions and Dependencies
- Contractual Framework Overview
- Appendix A: Detailed Pricing Schedule
- Appendix B: Implementation Milestone and Payment Schedule

---

## Executive Summary

### The Commercial Decision

Flutterwave operates payment infrastructure across thirty-plus African markets and global corridors. The company's growth trajectory demands that settlement, compliance, and reconciliation operations scale without proportionally scaling the manual overhead currently required for corridor management, exception handling, and regulatory evidence production. The tokenized cross-border payments programme addresses this directly: by placing a programmable, auditable settlement layer underneath fiat flows, Flutterwave can automate compliance enforcement, reduce settlement latency, and produce regulatory evidence on demand.

The commercial question is not whether tokenized settlement infrastructure is strategically necessary. It is which approach delivers that capability with the lowest total cost, the least implementation risk, and the strongest operational defensibility. This proposal presents SettleMint's DALP platform as the answer, and quantifies why the platform approach costs substantially less than assembling equivalent capability from separate components or building it internally.

### Recommended Commercial Structure

SettleMint recommends the following commercial structure for Flutterwave's initial production programme:

| Component | Recommendation | Annual Cost |
|---|---|---|
| Platform license | Enterprise tier | $240,000/year |
| Implementation services | Full-programme delivery | $380,000 (one-time) |
| Production environment | Included in Enterprise tier | - |
| Additional environments (UAT, DR) | 2 x additional environments | $50,000/year |
| Support | Premium (24/7) | $85,000/year |
| **Annual recurring (Year 1 onwards)** | | **$375,000/year** |
| **Year 1 total (including implementation)** | | **$755,000** |
| **3-year TCO** | | **$1,130,000** |

This structure covers the complete production deployment: all environments, full integration support, 24/7 premium support appropriate for a live payment platform, and the implementation programme that takes Flutterwave from initial deployment through production launch across priority corridors.

### Why Platform Procurement Is Lower Risk Than Build or Assembly

Flutterwave has three realistic options for this capability:

**Option 1: Build internally.** Developing equivalent functionality requires smart contract engineering, compliance module design, key management infrastructure, API development, operations tooling, and security audit. A conservative estimate for a team of eight engineers over eighteen months is $1.8-2.4 million in development cost alone, before ongoing maintenance. The platform would reach feature parity with DALP approximately two years after internal build start. Regulatory evidence maturity (ISO 27001, SOC 2 Type II) would require additional investment.

**Option 2: Assemble from multiple vendors.** Combining a tokenization vendor, a compliance screening vendor, a custody vendor, and an integration vendor creates four separate SLAs, four separate incident escalation paths, four separate contract negotiations, and four separate integration maintenance obligations. Operational fragmentation is the primary failure mode for assembled stacks in regulated environments.

**Option 3: DALP platform.** One platform, one contract, one support relationship. Compliance enforcement is structural, not assembled. The API surface is unified. The audit trail is single-source. Implementation timeline is twenty-four weeks to first corridor production launch.

DALP is the lower-risk, lower-cost path to production capability.

### Executive Summary: Business Context

Flutterwave's real operational cost drivers for cross-border settlement today include manual reconciliation labour across corridors, compliance evidence assembly for regulatory requests, prefunding idle float management, and incident response when settlement fails across correspondent banking chains. DALP addresses all four by placing programmable logic at the settlement layer that automates reconciliation event generation, maintains tamper-evident compliance records, enables precision prefunding through tokenized position management, and provides deterministic incident replay through durable execution.

The ROI case is driven primarily by operational efficiency (reduced reconciliation and compliance labour) and risk reduction (faster regulatory evidence production, reduced compliance incident exposure). Revenue enablement through new corridor activation and improved settlement SLAs to merchants provides upside that is real but harder to quantify in the proposal stage.

---

## Investment Summary

| Decision Factor | Detail |
|---|---|
| Platform | DALP Enterprise Tier |
| Deployment model | Private cloud (Flutterwave-managed) |
| Initial corridors | Up to 10 priority corridors at launch |
| Environment count | Production + UAT + DR + Dev + Test (5 total) |
| Support tier | Premium (24/7/365) |
| Implementation duration | 24 weeks to first corridor production |
| Year 1 total investment | $755,000 |
| 3-year TCO | $1,130,000 |
| Break-even (vs build) | Year 1 |
| Key contractual terms | Annual subscription, milestone-based implementation payments |

---

## Licensing and Subscription Model

### Philosophy

DALP licensing is platform-based. Flutterwave pays for access to the complete platform lifecycle capability, not for each transaction, each corridor, or each compliance check. This model is deliberately chosen for payment infrastructure operators: as transaction volumes grow, as new corridors are added, and as compliance requirements evolve, the platform cost does not scale linearly with business growth. Operational costs scale; the platform subscription does not.

This model contrasts with point solutions that charge per API call, per transaction, or per compliance check - models that create perverse incentives to reduce compliance thoroughness and create unpredictable cost scaling as volumes grow.

### What Is Included in the Enterprise Tier

| Capability Category | Included |
|---|---|
| All DALP smart contract types (StableCoin, Deposit, Bond, Equity, Fund, RealEstate, PreciousMetal) | Yes |
| All compliance modules (identity verification, country lists, address lists, time locks, transfer approval, collateral) | Yes |
| All token features (yield, fee variants, permit, voting, historical balances) | Yes |
| All addons (XvP Settlement, Vault, Airdrop, Token Sale, Yield) | Yes |
| Asset Console web application | Yes |
| REST API (OpenAPI 3.1) | Yes |
| TypeScript SDK (@settlemint/dalp-sdk) | Yes |
| Webhooks and SSE event streams | Yes |
| Chain Indexer (queryable on-chain event projection) | Yes |
| RBAC (26-role taxonomy, on-chain authoritative) | Yes |
| Observability stack (Prometheus, Grafana, structured logging) | Yes |
| Platform updates and security patches | Yes |
| Production environment | Yes (1 included) |

### What Varies by Engagement

| Variable Dimension | Flutterwave Selection | Cost |
|---|---|---|
| Additional environments | UAT + DR (2 additional) | $25,000/year each |
| Deployment model | Private cloud (Flutterwave-managed) | Infrastructure costs are Flutterwave-borne |
| Blockchain network | Private Hyperledger Besu (Flutterwave-managed) | Infrastructure costs are Flutterwave-borne |
| Custody tier | HSM for treasury wallets | Included in Enterprise tier; MPC custody (DFNS/Fireblocks) requires separate custody contract |
| Support tier | Premium | $85,000/year |
| Implementation services | Full programme | $380,000 (one-time) |

### Platform Tier Comparison

| Feature | Foundation | Enterprise | Sovereign |
|---|---|---|---|
| Asset types | All | All | All |
| Compliance modules | All | All | All |
| Environments included | 1 | 1 | 3 |
| Multi-region HA | No | Yes | Yes |
| Dedicated deployment | No | Yes | Yes |
| Annual license | $180,000 | $240,000 | $280,000 |
| **Recommended for Flutterwave** | | **Yes** | |

The Enterprise tier is recommended for Flutterwave because it provides the dedicated deployment model required for CBN data residency compliance, multi-AZ high availability appropriate for a production payment platform, and the environment count flexibility needed for UAT, DR, and development environments alongside production.

---

## Implementation Investment

### Implementation Methodology

SettleMint delivers DALP implementations through a six-phase programme with formal acceptance gates. The programme is fixed-price within defined scope, with clear client responsibility items that could affect timeline if not delivered on schedule. Phase-gate structure prevents scope drift and ensures that compliance configuration decisions, integration specifications, and security requirements are resolved before build activities commit to a specific implementation path.

### Implementation Phase Summary

| Phase | Duration | Objective | Investment |
|---|---|---|---|
| Discovery and Requirements | 5 weeks | Scope finalisation, architecture, integration design, compliance configuration design | $55,000 |
| Foundation and Setup | 5 weeks | Environment provisioning, base platform, identity framework | $60,000 |
| Configuration and Compliance | 7 weeks | Corridor token deployment, compliance modules, KYC integration | $75,000 |
| Integration | 7 weeks | AML, treasury, ledger, payment acceptance, SIEM integrations | $85,000 |
| Testing and UAT | 8 weeks | Full testing programme, security test, UAT | $65,000 |
| Go-Live and Hypercare | 12 weeks | Production launch, phased corridor rollout, hypercare | $40,000 |
| **Total** | **44 weeks** | | **$380,000** |

### Implementation Accelerators

The following factors reduce implementation duration and risk for Flutterwave:

- Pre-built compliance module templates for CBN, Bank of Ghana, and Bank of Tanzania jurisdiction requirements
- Reference corridor token configurations from prior payment infrastructure deployments
- TypeScript SDK enabling Flutterwave's engineering team to accelerate integration development in parallel with SettleMint
- Asset Console providing immediate operational visibility without requiring custom UI development
- Pre-built Grafana dashboards for payment infrastructure monitoring

### Implementation Risk Factors

The following factors could extend timeline or increase implementation effort:

- Complex legacy system integration requirements not captured in discovery
- On-premises infrastructure requirements replacing managed cloud (adds 3-5 weeks)
- HSM procurement and installation timeline if hardware-backed key management is selected
- Regulatory approval requirements in specific corridors that require advance notification
- Bank-partner readiness for new settlement instruction formats

### Training

The implementation programme includes structured training for three audience groups:

| Audience | Content | Format | Duration |
|---|---|---|---|
| Platform administrators | System configuration, environment management, key management | Guided workshop | 2 days |
| Operations and treasury teams | Asset Console, corridor token management, settlement workflows | Hands-on workshop | 2 days |
| Integration engineers | API, SDK, webhook integration patterns, event stream consumption | Technical workshop | 2 days |
| Compliance officers | Compliance module management, audit log access, evidence extraction | Guided workshop | 1 day |

Documentation deliverables include admin runbooks, operator procedures, integration guides, and evidence extraction procedures for regulatory requests.

---

## Support and Operational Costs

### Support Tier Recommendation

For a production payment infrastructure platform, SettleMint recommends Premium support (24/7/365 coverage). Cross-border payments operate across time zones with African, European, and American corridor partners. P1 incidents on a payment platform are not bounded by Brussels business hours.

### Support Tier Comparison

| Feature | Standard | Premium |
|---|---|---|
| Annual cost | $45,000 | $85,000 |
| Coverage | Business hours (Mon-Fri, 8am-6pm CET) | 24/7/365 |
| Support channels | Portal, email | Portal, email, dedicated Slack, phone |
| P1 response | 4 hours | 1 hour |
| P2 response | 8 hours | 4 hours |
| Named support lead | No | Yes |
| Quarterly service reviews | No | Yes |
| Production incident support | Standard queue | Priority queue with escalation |

### Severity and Response Matrix

| Severity | Definition | Response (Premium) | Resolution Target |
|---|---|---|---|
| P1 - Critical | Production outage, data loss risk, security incident affecting live corridors | 1 hour | 4 hours |
| P2 - High | Significant functional degradation, compliance workflow blocked, settlement delayed | 4 hours | 24 hours |
| P3 - Medium | Non-critical issue, workaround available, individual user or corridor affected | 8 hours | 72 hours |
| P4 - Low | Enhancement request, documentation query, non-urgent configuration question | Next business day | Roadmap consideration |

### Maintenance Windows

Scheduled maintenance windows: maximum 4 hours per quarter, minimum 72-hour advance notice. Emergency security patches applied without scheduled window where the threat requires immediate action, with concurrent notification to Flutterwave's operations team. Platform updates follow a quarterly release cadence for major updates and monthly for security patches.

---

## Total Cost of Ownership Analysis

### TCO Framework

The correct TCO comparison for Flutterwave is not DALP subscription cost versus zero. It is DALP versus the realistic alternatives: internal build or multi-vendor assembly. The comparison must include all cost categories: software, implementation, ongoing engineering, operational overhead, compliance maintenance, and the cost of incidents that a less mature platform would produce more frequently.

### 3-Year TCO: DALP

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform license (Enterprise) | $240,000 | $228,000 | $228,000 | $696,000 |
| Additional environments (2) | $50,000 | $50,000 | $50,000 | $150,000 |
| Premium support | $85,000 | $85,000 | $85,000 | $255,000 |
| Implementation (one-time) | $380,000 | - | - | $380,000 |
| Training (additional post-launch) | - | $15,000 | $15,000 | $30,000 |
| **Total** | **$755,000** | **$378,000** | **$378,000** | **$1,511,000** |

*Note: Year 2 and Year 3 platform license reflects 5% multi-year commitment discount applied at contract signature. Infrastructure costs (Kubernetes, PostgreSQL, blockchain nodes) are Flutterwave-borne as private cloud deployment. Estimated at $60,000-80,000/year for production-grade multi-AZ configuration.*

**Adjusted 3-year TCO including infrastructure: approximately $1,690,000-$1,750,000**

### 3-Year TCO: Internal Build (Conservative Estimate)

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Engineering team (8 FTEs at $120k loaded cost) | $960,000 | $960,000 | $960,000 | $2,880,000 |
| Security audit and certification (ISO 27001 + SOC 2) | $200,000 | $50,000 | $50,000 | $300,000 |
| Infrastructure | $80,000 | $80,000 | $80,000 | $240,000 |
| Third-party components (custody, identity, compliance data) | $150,000 | $150,000 | $150,000 | $450,000 |
| **Total** | **$1,390,000** | **$1,240,000** | **$1,240,000** | **$3,870,000** |

*Note: Internal build also delays time-to-production by 18-24 months, meaning Flutterwave would be operating without the tokenized settlement layer for an additional two years of operational overhead.*

### Comparative Analysis

| Metric | DALP | Internal Build | Multi-Vendor Assembly |
|---|---|---|---|
| 3-year total cost | ~$1.7M | ~$3.9M | ~$2.8M (estimated) |
| Time to first production corridor | 24 weeks | 18-24 months | 12-18 months (estimated) |
| Compliance certifications | ISO 27001, SOC 2 Type II (existing) | Must be built and certified | Shared responsibility gaps |
| Operational fragmentation | Single platform | Single but requires maintenance | High (4+ vendor SLAs) |
| Audit trail quality | On-chain, immutable, single source | Depends on build quality | Cross-vendor reconciliation required |
| Regulatory evidence production | API-accessible, on-demand | Depends on build quality | Complex multi-system export |

DALP delivers equivalent functionality at approximately 44% of the 3-year cost of internal build, with production capability available in 6 months rather than 18-24 months.

---

## Payment Terms and Commercial Structure

### Payment Schedule: Platform License

Platform license is invoiced annually in advance, with the first annual invoice issued upon contract execution. For multi-year agreements, a 5% discount applies to years 2 and 3 if committed at contract signature.

### Payment Schedule: Implementation

Implementation payments are milestone-based, aligned to phase gate completion and acceptance sign-off:

| Milestone | Payment | Timing |
|---|---|---|
| Contract execution | 25% ($95,000) | Upon signature |
| Phase 2 gate (environments ready) | 20% ($76,000) | Upon gate sign-off |
| Phase 4 gate (integrations complete) | 30% ($114,000) | Upon gate sign-off |
| Phase 6 gate (production go-live) | 25% ($95,000) | Upon production launch |

### Payment Terms

Net 30 days from invoice date. Invoices are issued in USD. Wire transfer or bank transfer preferred. Late payment interest at 1.5% per month on overdue balances after 45-day grace period.

### Contract Duration

Initial term: 3 years from production go-live date. Renewal: automatic annual renewal unless either party provides 90-day written notice before renewal date. Early termination for convenience: 6-month notice, no refund of prepaid subscription fees. Early termination for cause (material breach uncured after 30-day notice): immediate with pro-rata refund of prepaid fees.

---

## Value Realisation and ROI Analysis

### Value Driver Framework

| Value Driver | Mechanism | Estimated Annual Benefit |
|---|---|---|
| Reconciliation labour reduction | Automated on-chain event feeds eliminate manual matching for on-chain settlement legs | $150,000-$300,000 |
| Compliance evidence assembly | On-demand API export replaces manual reconstruction for regulatory requests | $50,000-$100,000 |
| Settlement failure rate reduction | Durable execution and atomic settlement reduce failed settlement incidents | $80,000-$200,000 |
| Corridor expansion enablement | New corridors deployable in days, not months | Revenue upside (unquantified at proposal stage) |
| Prefunding optimisation | Precise position visibility enables reduced idle float | $100,000-$500,000 (depends on float volumes) |

**Conservative annual benefit estimate: $380,000-$600,000**

At a 3-year TCO of approximately $1.7 million and conservative annual benefit of $380,000, the payback period is approximately 4.5 years on full-programme costs. Under the expected benefit scenario ($600,000/year), payback is approximately 2.8 years. The ROI case strengthens materially if prefunding optimisation benefits are significant (which is highly institution-specific and requires a workshop to quantify).

### Sensitivity Table

| Scenario | Annual Benefit | 3-Year Net | Payback Period |
|---|---|---|---|
| Conservative | $380,000 | -$560,000 | 4.5 years |
| Expected | $600,000 | +$100,000 | 2.8 years |
| Upside | $900,000 | +$1,000,000 | 1.9 years |

The ROI model can be refined in a value workshop using Flutterwave's actual reconciliation team costs, corridor failure rates, and regulatory evidence request frequency.

---

## Commercial Assumptions and Dependencies

The following assumptions underpin this commercial proposal. Material changes to any assumption may require commercial renegotiation:

- Deployment on Flutterwave-managed private cloud (AWS, Azure, or GCP). On-premises or customer data centre deployment increases implementation cost by $40,000-$80,000.
- Up to 10 production corridors in the initial programme. Additional corridors beyond 10 require an expansion change order, estimated at $15,000-$25,000 per additional corridor group.
- Flutterwave provides dedicated integration engineers during Phases 3 and 4. External integration support can be provided at $1,500/day additional cost.
- Existing KYC/AML provider supports the trusted issuer API pattern for publishing identity claims. Custom KYC provider integration adds $20,000-$40,000 to implementation cost.
- CBN and partner-country regulatory approvals are Flutterwave's responsibility. Unexpected regulatory approval delays may extend implementation timeline without affecting fixed-price implementation commitment.
- Infrastructure provisioning is Flutterwave's responsibility. SettleMint provides specifications and support for infrastructure setup.

---

## Contractual Framework Overview

### Agreement Structure

The commercial relationship is structured through two primary agreements:

| Agreement | Scope | Duration |
|---|---|---|
| Master Subscription Agreement (MSA) | Platform license, IP ownership, data handling, confidentiality, liability, governing law | 3-year initial term |
| Statement of Work (SoW) | Implementation services scope, deliverables, milestones, acceptance criteria, resource model | Fixed-price, milestone-gated |

Support terms are included in the MSA as an addendum, with the selected support tier specified at contract execution.

### Intellectual Property

DALP platform IP (smart contracts, middleware, API, SDK, Asset Console) remains SettleMint's property. Flutterwave retains full ownership of: all client data, all on-chain token state and transaction history, all configuration and policy designs created during implementation, and all custom integration code written by Flutterwave's engineers using the DALP SDK. SettleMint does not retain any right to Flutterwave's operational data, transaction data, or business configuration.

### Liability

Liability cap: 12 months of subscription fees paid in the preceding 12 months. Exclusions: gross negligence, wilful misconduct, IP indemnification claims, data breach caused by SettleMint's failure to maintain security standards. Mutual exclusion of consequential damages.

### Data Handling

SettleMint acts as data processor for any personal data processed on Flutterwave's behalf within the platform. Data Processing Agreement (DPA) is a standard schedule to the MSA. Data residency is configurable and aligns to Flutterwave's NDPC Act 2023 and CBN obligations. SettleMint does not access Flutterwave's production data without Flutterwave's explicit authorisation except as required to provide support services.

### Source Code Escrow

Source code escrow is available upon request as a negotiable addendum to the MSA. Escrow release triggers include SettleMint insolvency, material breach uncured after 60 days, and product discontinuation. Escrow is a separate commercial arrangement with the designated escrow provider.

---

## Appendix A: Detailed Pricing Schedule

### Annual Recurring Costs

| Line Item | Unit | Quantity | Unit Price | Annual Total |
|---|---|---|---|---|
| DALP Enterprise Tier License | Platform | 1 | $240,000 | $240,000 |
| Additional Environment (UAT) | Environment/year | 1 | $25,000 | $25,000 |
| Additional Environment (DR) | Environment/year | 1 | $25,000 | $25,000 |
| Premium Support | Tier/year | 1 | $85,000 | $85,000 |
| **Total Annual Recurring** | | | | **$375,000** |

### One-Time Implementation Costs

| Phase | Description | Fixed Price |
|---|---|---|
| Phase 1 | Discovery and Requirements | $55,000 |
| Phase 2 | Foundation and Setup | $60,000 |
| Phase 3 | Configuration and Compliance | $75,000 |
| Phase 4 | Integration | $85,000 |
| Phase 5 | Testing and UAT | $65,000 |
| Phase 6 | Go-Live and Hypercare | $40,000 |
| **Total Implementation** | | **$380,000** |

### Multi-Year Discount Schedule

| Commitment | Year 1 License | Year 2+ License | Saving vs Annual |
|---|---|---|---|
| Annual | $240,000 | $240,000 | Baseline |
| 3-year commitment | $240,000 | $228,000 | 5% on years 2-3 |
| 5-year commitment | $240,000 | $216,000 | 10% on years 2-5 |

---

## Appendix B: Implementation Milestone and Payment Schedule

| Milestone | Deliverable | Payment % | Payment Amount | Target Date |
|---|---|---|---|---|
| Contract execution | Signed MSA and SoW | 25% | $95,000 | Week 0 |
| Phase 1 gate | Discovery documentation, architecture sign-off | - | - | Week 5 |
| Phase 2 gate | Environments operational, base platform validated | 20% | $76,000 | Week 10 |
| Phase 3 gate | Corridor tokens deployed, compliance configured | - | - | Week 17 |
| Phase 4 gate | All integrations complete and tested | 30% | $114,000 | Week 24 |
| Phase 5 gate | Testing complete, UAT signed off | - | - | Week 32 |
| Phase 6 gate | Production go-live, first corridor live | 25% | $95,000 | Week 44 |
| **Total** | | **100%** | **$380,000** | |

Gate sign-off requires written acceptance from Flutterwave's designated approval authority (Programme Sponsor or delegate). If a gate review identifies material defects in SettleMint deliverables, the remediation period is included within the fixed price. If a gate is delayed due to Flutterwave dependencies (data, approvals, infrastructure, regulatory), the timeline extends proportionally without affecting the fixed-price commitment for SettleMint-accountable scope.

---

*This document is classified SettleMint Confidential. Distribution is restricted to authorised Flutterwave procurement personnel.*
