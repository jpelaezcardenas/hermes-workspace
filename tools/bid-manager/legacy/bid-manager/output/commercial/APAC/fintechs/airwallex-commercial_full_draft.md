# Commercial Proposal: Cross-Border Tokenized Settlement Platform

**Document Title:** Commercial Proposal. Cross-Border Tokenized Settlement  
**Client:** Airwallex  
**Date:** 20 March 2026  
**Version:** 1.0 (Draft)  
**Prepared by:** SettleMint  
**Classification:** Confidential. Airwallex Evaluation Only  
**Reference:** AIRWALLEX-RFP-202603  

---

## Table of Contents

1. Executive Summary
2. Investment Rationale and Value Analysis
3. Pricing and Licensing
4. Implementation Services
5. Support and Service Levels
6. Commercial Terms and Payment Structure
7. Total Cost of Ownership Analysis
8. Expansion Economics
9. Exit Readiness and Transition Provisions
10. Assumptions Register

---

## 1. Executive Summary

Airwallex has built its payment infrastructure on the principle that financial operations should be programmable, transparent, and globally operable without intermediary friction. The shift toward tokenized cross-border settlement is the next logical expression of that principle, and the commercial question is not whether to invest, but which platform delivers the most defensible economics over the medium term.

SettleMint proposes a structured commercial engagement that provides Airwallex with the DALP platform for cross-border tokenized settlement in Singapore, with clear licensing economics, transparent implementation scoping, and expansion provisions that allow the operating model to grow across additional corridors, legal entities, and products without re-procurement.

The commercial structure covers two licensed environments, production and development, at EUR 420,000 per year in platform licensing, payable annually in advance. Implementation services are scoped following the Phase 1 discovery engagement and priced separately per the implementation methodology detailed in the technical proposal. Support is included within the standard license terms, with enhanced SLA options available for Airwallex's operational requirements.

This proposal presents a buy versus build and buy versus assemble analysis that demonstrates DALP's economic advantage across three dimensions: time to controlled production deployment, total operational cost of the run state, and risk-adjusted cost of the compliance and audit evidence model. The conclusion is consistent across all three: DALP's platform economics compare favorably against the alternative of assembling a comparable capability from point solutions, custom smart contract development, and manual compliance processes.

SettleMint is prepared to engage in a discovery-phase scoping workshop within four weeks of commercial agreement, with production deployment achievable within 19 weeks of project kickoff under the standard implementation methodology.

---

## 2. Investment Rationale and Value Analysis

### 2.1 The Cost of the Status Quo

Cross-border settlement operations at Airwallex's scale involve significant operational overhead in the absence of programmable settlement infrastructure. The cost drivers in the current state include:

| Cost Driver | Current State Characteristics | DALP-Enabled Improvement |
|---|---|---|
| Settlement cycle time | Correspondent banking settlement: T+1 to T+3 depending on corridor | Tokenized settlement: T+0 atomic finality under 3 seconds |
| Manual reconciliation | Daily reconciliation of settlement confirmations against GL entries requires operations staff time and generates break resolution queues | Deterministic event log provides automated reconciliation baseline; breaks surface as exceptions rather than requiring full reconciliation effort |
| Compliance enforcement | Transfer eligibility enforced in application logic, subject to drift and requiring synchronization with compliance rule updates | Transfer rules enforced at smart contract level: rules cannot be bypassed by application layer; updates propagate without re-engineering |
| Audit evidence production | Evidence for MAS examination and internal audit requires manual extraction and assembly from multiple system records | Structured audit export covers the complete event lifecycle with approval chains, compliance evaluation results, and configuration history |
| New corridor activation | Adding a new settlement corridor requires development effort to implement routing, compliance rules, and reconciliation logic | Adding a new currency corridor requires configuration only: new DALPAsset token with appropriate compliance module binding |

### 2.2 ROI Framework

| Value Driver | Mechanism | Quantification Basis |
|---|---|---|
| Settlement efficiency | T+0 finality reduces overnight float cost and correspondent banking fees | Quantified against Airwallex's current corridor settlement costs, [CLIENT-SPECIFIC after workshop] |
| Operations staffing | Automated reconciliation reduces manual reconciliation and break resolution effort | Estimated 40-60% reduction in manual reconciliation time for covered settlement volume, [CLIENT-SPECIFIC after workshop] |
| Compliance audit preparation | Automated evidence generation eliminates ad-hoc evidence assembly for MAS and internal audit | Estimated 30-50% reduction in compliance team hours for audit preparation cycles, [CLIENT-SPECIFIC after workshop] |
| Corridor expansion | New corridor activation from months to weeks through configuration | Accelerated revenue from new markets; reduced engineering headcount for corridor expansion |
| Risk reduction | Programmatic compliance enforcement at smart contract level eliminates manual control bypass risk | Reduction in compliance incident probability; quantified as risk-adjusted expected cost, [CLIENT-SPECIFIC after workshop] |

The specific quantification of these value drivers against Airwallex's current operating costs will be completed during the Phase 1 discovery workshop, using Airwallex's actual cost data for the most relevant settlement corridors and compliance processes.

### 2.3 Buy versus Build Analysis

| Dimension | Build Approach | DALP Platform |
|---|---|---|
| Time to controlled production | 18-36 months for regulated-grade smart contract platform with institutional controls | 19 weeks to production under standard implementation methodology |
| Smart contract audit costs | USD 200,000-500,000 per contract suite; annual re-audit on changes | Included in SettleMint's platform; audited before production deployment |
| Security certifications | ISO 27001 and SOC 2 Type II: 12-18 months and USD 150,000-300,000 | Included: SettleMint holds both certifications |
| Compliance module development | Custom development for each regulatory jurisdiction; ongoing maintenance as rules change | Pre-built module library covering MAS, MiCA, FCA, JFSA, and other frameworks; configurable without code changes |
| Operational tooling | Custom observability, case management, and audit export development | Included: Grafana stack, Asset Console, structured audit export |
| Ongoing maintenance | Dedicated engineering team for platform maintenance, security patching, and regulatory updates | Covered by SettleMint under license; Airwallex engineering team not required for platform maintenance |

The total cost of building and operating a comparable regulated digital asset settlement platform from scratch over a five-year horizon is estimated at EUR 4-8 million, excluding regulatory risk from build quality and timeline uncertainty. DALP's five-year total cost of ownership, including licensing, implementation, and support, is substantially lower and eliminates the execution risk of a custom build programme.

### 2.4 Buy versus Assemble Analysis

An alternative to DALP is assembling a settlement capability from point solutions: a custody provider for key management, a smart contract development firm for token contracts, a compliance engine vendor for transfer rules, and custom integration work to bind them together. This approach has the following cost and risk profile:

| Component | Typical Cost | Risk Profile |
|---|---|---|
| Smart contract development and audit | EUR 300,000-600,000 | High: custom code, custom audit, no reusability |
| Custody integration | EUR 50,000-150,000 | Medium: established vendors, integration complexity |
| Compliance engine licensing | EUR 100,000-300,000 per year | Medium: ongoing licensing, integration maintenance |
| Custom integration development | EUR 200,000-500,000 | High: bespoke, no vendor support |
| Reconciliation and reporting tooling | EUR 100,000-300,000 | Medium: custom development or BI platform licensing |
| Ongoing maintenance | EUR 300,000-800,000 per year | High: multiple vendor relationships, no single throat to choke |

Total assembled approach: EUR 1-2 million in year one, EUR 500,000-1 million in ongoing costs. Against this profile, DALP's EUR 420,000 per year in licensing with transparent implementation costs represents a more defensible economic model, and eliminates the integration coordination burden of managing five or more vendor relationships.

---

## 3. Pricing and Licensing

### 3.1 Platform License Pricing

| Environment | Monthly Equivalent | Annual Fee (Upfront) |
|---|---|---|
| Production License | EUR 25,000/month | EUR 300,000/year |
| Development License | EUR 10,000/month | EUR 120,000/year |
| **Combined (Production + Development)** | **EUR 35,000/month** | **EUR 420,000/year** |

All prices exclude applicable taxes and VAT. Taxes are added separately based on Airwallex's jurisdiction and applicable tax treaties.

Payment terms: Annual, upfront.

### 3.2 License Scope

The production and development licenses cover:

- Full DALP platform access for the licensed environment, including all core modules (asset lifecycle, compliance engine, identity registry, workflow orchestration, key management integration, chain indexer, observability stack)
- All currently released asset types (Bond, Equity, Fund, Deposit, StableCoin, Real Estate, Precious Metal, DALPAsset configurable)
- All currently released compliance modules (identity verification, country restrictions, address block list, investor limits, time lock, transfer approval, collateral requirement)
- All currently released addons (XvP Settlement, Vault, Token Sale, Fixed Yield, Airdrop)
- Platform updates and security patches during the license period
- Access to OpenAPI documentation, TypeScript SDK, and CLI tooling
- Standard support tier (see Section 5)

The license does not cover: third-party custody provider fees (DFNS or Fireblocks), cloud infrastructure costs (Airwallex-managed), AML/CFT screening engine fees (Airwallex-managed), and blockchain network infrastructure costs if using a public network.

### 3.3 Environment Scope

| License | Purpose | Users | Transaction Volume |
|---|---|---|---|
| Production | Live settlement operations for Airwallex Singapore cross-border programme | Unlimited named users within licensed organization | Unlimited within platform capacity |
| Development | Integration development, testing, UAT, and staging | Unlimited named users within licensed organization | Unlimited (test network) |

Additional environments (for example, a second production region or a separate UAT environment) are priced per the applicable license type.

---

## 4. Implementation Services

Implementation services for the 19-week programme are scoped and priced following the Phase 1 discovery engagement. Standard programme structure and indicative commercial parameters are set out below.

### 4.1 Indicative Implementation Budget Range

| Programme Scope | Indicative Range | Notes |
|---|---|---|
| Standard implementation (2 settlement instruments, 1 legal entity, 3 enterprise integrations) | EUR 280,000-420,000 | [CLIENT-SPECIFIC, scoped in Phase 1 discovery] |
| Extended implementation (4+ instruments, 2+ legal entities, 5+ integrations, custom reporting) | EUR 450,000-650,000 | [CLIENT-SPECIFIC, scoped in Phase 1 discovery] |

Implementation is invoiced in three tranches: 40% at project kickoff, 30% at Phase 3 completion (configuration and compliance), and 30% at go-live sign-off.

### 4.2 Standard Implementation Deliverables

All deliverables listed as standard are included in the implementation services scope:

| Deliverable | Standard | Optional |
|---|---|---|
| Target-state architecture document | ✅ | - |
| Integration design specifications | ✅ | - |
| Security design document | ✅ | - |
| Role and permission matrix | ✅ | - |
| Compliance configuration register | ✅ | - |
| Control mapping document (MAS TRM, PSA) | ✅ | - |
| SIT test evidence pack | ✅ | - |
| Performance test report | ✅ | - |
| UAT sign-off documentation | ✅ | - |
| Cutover runbook and rehearsal evidence | ✅ | - |
| Operational runbooks (10 core scenarios) | ✅ | - |
| Training programme (operations, compliance, administration) | ✅ | - |
| Extended runbook library (30+ scenarios) | - | ✅ |
| Custom Grafana dashboard development | - | ✅ |
| Ongoing configuration advisory (post-go-live) | - | ✅ |

### 4.3 SettleMint Implementation Team

| Role | Allocation | Responsibility |
|---|---|---|
| Programme Manager | 0.5 FTE | Governance, status reporting, RAID management |
| Solution Architect | 1.0 FTE | Target architecture, integration design, phase gate reviews |
| Integration Engineer | 1.0 FTE | Enterprise integration implementation (GL, treasury, KYC, AML) |
| Blockchain Engineer | 0.5 FTE | Smart contract configuration, network setup, custody integration |
| QA Engineer | 0.5 FTE | Test strategy, SIT coordination, UAT support |
| Compliance Specialist | 0.25 FTE | Compliance module configuration, regulatory mapping |

---

## 5. Support and Service Levels

### 5.1 Standard Support (Included)

| Parameter | Standard |
|---|---|
| Coverage | Business hours, Monday-Friday, 09:00-18:00 CET |
| Response. P1 Critical | 4 hours |
| Response. P2 High | 8 hours |
| Response. P3 Medium | 24 hours |
| Response. P4 Low | 48 hours |
| Channels | Email, support portal |
| Platform uptime SLA | 99.5% for managed components |
| Patch delivery | Security patches: 24-48 hours; feature updates: quarterly |

### 5.2 Enhanced Support (Optional: Priced Separately)

| Parameter | Enhanced |
|---|---|
| Coverage | 24x7x365 |
| Response. P1 Critical | 15 minutes |
| Response. P2 High | 1 hour |
| Named Support Engineer | Dedicated SettleMint engineer familiar with Airwallex deployment |
| Monthly Architecture Review | Included |
| Pricing | [CLIENT-SPECIFIC, priced on engagement scope] |

Given Airwallex's operational profile, a global payments business with Singapore regulatory obligations and continuous cross-border settlement activity. SettleMint recommends Enhanced Support for the production environment. The 15-minute P1 response time ensures that settlement halts and critical compliance events receive immediate engineering attention, which aligns with MAS Technology Risk Management Guidelines on incident response obligations.

### 5.3 Knowledge Transfer and Training

Training is included within implementation services and covers:

| Programme | Audience | Format | Duration |
|---|---|---|---|
| Operations Training | Settlement operations team | Instructor-led, hands-on | 2 days |
| Compliance Administration | Compliance and risk teams | Instructor-led, hands-on | 1 day |
| System Administration | Technology and DevOps teams | Instructor-led, technical | 2 days |
| Platform Overview | Executive sponsors, programme management | Briefing | 3 hours |
| Runbook Validation | Operations team | Tabletop exercise | 1 day |

Training materials are provided in a format suitable for internal re-delivery as staff rotate.

---

## 6. Commercial Terms and Payment Structure

### 6.1 Payment Schedule

| Payment | Timing | Amount |
|---|---|---|
| Year 1. Platform License | At contract signature | EUR 420,000 |
| Implementation Tranche 1 (40%) | At project kickoff | [CLIENT-SPECIFIC] |
| Implementation Tranche 2 (30%) | At Phase 3 completion | [CLIENT-SPECIFIC] |
| Implementation Tranche 3 (30%) | At go-live sign-off | [CLIENT-SPECIFIC] |
| Year 2 onwards. Platform License | Annually in advance, on anniversary date | EUR 420,000 per year |

### 6.2 Contract Parameters

| Parameter | Value |
|---|---|
| Minimum license term | 1 year |
| Price hold period | 12 months from contract signature |
| License currency | EUR |
| Tax treatment | All prices exclude applicable taxes and VAT |
| Renewal | Automatic annual renewal with 90 days written notice for non-renewal |
| Indexation | CPI-based adjustment after year 2, capped at 5% per year |

### 6.3 Intellectual Property

The DALP platform software, smart contracts, compliance modules, and addons are and remain the intellectual property of SettleMint BV. The license grants Airwallex the right to use the platform for its licensed purposes during the license period.

Configuration files, integration code, operational runbooks, and documentation produced during implementation are Airwallex's intellectual property. SettleMint retains no rights over Airwallex-specific configuration or integration assets.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Five-Year TCO Model

| Cost Component | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|---|---|
| Platform License (Production + Development) | EUR 420,000 | EUR 420,000 | EUR 429,000* | EUR 429,000* | EUR 429,000* | EUR 2,127,000 |
| Implementation Services | [CLIENT-SPECIFIC] | - |, | - |, | [CLIENT-SPECIFIC] |
| Enhanced Support (optional) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (Airwallex-managed) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Custody Provider Fees | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |

*Indicative, subject to CPI indexation terms agreed at contract signature.

### 7.2 Comparative TCO Position

DALP's five-year platform licensing cost of EUR 2.1 million represents the primary fixed cost component. Against the alternative of assembling an equivalent regulated settlement capability from point solutions (estimated EUR 3-5 million over five years in licensing, integration, and maintenance costs) or building from scratch (estimated EUR 4-8 million over five years), DALP's TCO position is materially favorable.

The economic advantage is most pronounced when the value of accelerated time-to-production is factored in: 19 weeks under DALP versus 18-36 months for a comparable custom build. For Airwallex, the opportunity cost of delayed cross-border settlement programme delivery is measured against the revenues and operational savings achievable once the programme is operational.

---

## 8. Expansion Economics

### 8.1 Within-License Expansion

The production license covers Airwallex's Singapore-domiciled cross-border settlement operations without volume caps or per-transaction fees. Additional settlement corridors, additional currency-denominated instruments, and additional participant legal entities within the same deployment instance are covered within the existing license at no additional cost.

| Expansion Scenario | License Impact | Implementation Impact |
|---|---|---|
| Additional settlement currency (e.g., EUR, GBP) | No additional license cost | Configuration only: 2-4 weeks with SettleMint support |
| Additional legal entity within Singapore | No additional license cost | Configuration only: 2-4 weeks |
| Additional settlement participant types | No additional license cost | Configuration only: 1-2 weeks |
| Transaction volume growth | No volume-linked fees | Platform scales to infrastructure capacity |

### 8.2 Cross-Jurisdiction Expansion

For expansion to additional jurisdiction deployments (e.g., Hong Kong, Australia, UAE) requiring separate production environments per jurisdiction, additional production licenses apply at EUR 300,000 per year per production environment. Development environments for additional jurisdictions are EUR 120,000 per year.

Volume discounts for multi-jurisdiction agreements are available subject to written approval from SettleMint commercial leadership. Multi-year commitment structures that reduce the effective per-environment rate are available under the same approval process.

### 8.3 Platform Capability Expansion

New DALP capabilities released during the license period, including new asset types, compliance modules, addons, and integration connectors, are included in the existing license without additional cost. Major version upgrades that require implementation effort are scoped as change requests, with SettleMint providing effort estimates before commencement.

---

## 9. Exit Readiness and Transition Provisions

SettleMint treats exit readiness as a commercial commitment, not an afterthought. The following provisions are standard within the license agreement:

**Data Exportability.** All token state, transaction records, audit logs, identity data, and configuration are exportable in structured formats (JSON, CSV) at any time during the license period and for 12 months after license termination. Export is available through DAPI without requiring SettleMint engineering involvement.

**Configuration Documentation.** Full configuration documentation, compliance module parameters, approval workflow definitions, role assignments, and integration specifications, is maintained throughout the implementation period and updated on each change. Configuration documentation is Airwallex's property and is transferable to an alternative service provider.

**Smart Contract Independence.** DALPAsset smart contracts deployed on Airwallex's infrastructure are not dependent on SettleMint-operated infrastructure for their on-chain state. Token balances, compliance rules, and identity data remain on-chain and accessible regardless of the DALP application layer status.

**Transition Assistance.** Following license termination, SettleMint provides up to 90 days of transition assistance at standard professional services day rates. Transition assistance covers configuration documentation review, data export support, and integration handover to an alternative service provider or internal team.

**Knowledge Transfer.** Implementation deliverables are designed for internal maintainability. Runbooks, architecture documentation, and training materials are structured for re-delivery by Airwallex's internal team without SettleMint involvement.

---

## 10. Assumptions Register

| Assumption | Impact if Different | Resolution Path |
|---|---|---|
| Airwallex operates in Singapore under MAS licensing | Compliance module configuration would differ | Confirm in Phase 1 discovery |
| Initial deployment covers 2-3 settlement instruments | Implementation scope and cost may increase | Finalize in discovery scoping |
| Airwallex has an existing KYC engine with API integration capability | Alternative claim issuance patterns available; may affect timeline | Confirm in Phase 1 discovery |
| Airwallex's Singapore cloud environment (Kubernetes) is available for Phase 2 start | Phase 2 delay if environment not ready | Confirm environment readiness at contract signature |
| Custody provider (DFNS or Fireblocks) is selected within 4 weeks of contract signature | Phase 2 delay if custody provider not available | Parallel-track custody provider selection with commercial negotiation |
| All prices in EUR; Airwallex invoicing in EUR | Currency conversion applies if Airwallex requires billing in SGD | Confirm billing currency at contract signature |
| Standard support is sufficient for initial programme period | Enhanced support surcharge applies if required | Confirm support tier during commercial negotiation |
| Implementation commences within 8 weeks of contract signature | Implementation timeline shifts accordingly | Agree kickoff date at contract signature |

---

*Document classification: Confidential. Airwallex Evaluation Only. Not for distribution.*  
*All prices exclude applicable taxes and VAT.*  
*Annual, upfront payment terms apply to all license fees.*  
*SettleMint BV. Registered in Belgium. All rights reserved.*
