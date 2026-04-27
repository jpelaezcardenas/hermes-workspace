# Commercial Proposal: Tokenized Payment Rails Platform

**Document Title:** Commercial Proposal. Tokenized Payment Rails  
**Client:** Grab Financial  
**Date:** 20 March 2026  
**Version:** 1.0 (Draft)  
**Prepared by:** SettleMint  
**Classification:** Confidential. Grab Financial Evaluation Only  
**Reference:** GRAB-FINANCIAL-RFP-202603  

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

Grab Financial processes millions of transactions daily across Southeast Asia's most diverse and demanding regulatory environment. Adding tokenized payment rail capability to GrabPay's infrastructure is not a peripheral initiative, it is a programme that will affect how settlement works across the Grab ecosystem, how merchant payouts are processed, and how Grab Financial positions itself to participate in the MAS-sponsored Project Guardian ecosystem. The commercial question is which platform delivers that capability under real institutional conditions, at economics that justify the programme investment to Grab Financial's board and CFO.

SettleMint proposes a structured commercial engagement that delivers the DALP platform for Grab Financial's Singapore tokenized payment rails programme. The commercial model is transparent: platform licensing at EUR 420,000 per year for combined production and development environments, implementation services scoped following Phase 1 discovery, and support options that reflect the operational profile of a real-time payment infrastructure operating under MAS supervision.

This proposal presents the investment rationale in three forms: buy versus build (comparing DALP economics against a custom smart contract and compliance infrastructure build), buy versus assemble (comparing DALP against a multi-vendor assembled stack), and operational economics (comparing the run-state cost of DALP-enabled operations against a manual baseline). In all three frames, DALP's economics are favorable, and the advantage is most pronounced when time-to-production is valued honestly, because a delayed programme is a programme that is not yet generating settlement cost savings or positioning Grab Financial for Project Guardian participation.

SettleMint is ready to enter Phase 1 discovery within four weeks of commercial agreement. Production deployment is achievable within 19 weeks of project kickoff under the standard methodology.

---

## 2. Investment Rationale and Value Analysis

### 2.1 The Cost of Manual Settlement Operations

Grab Financial's current settlement operations, whether managed through correspondent networks, manual reconciliation processes, or proprietary settlement code, carry a set of cost and risk characteristics that tokenized settlement infrastructure is designed to reduce. The specific quantification of these costs for Grab Financial's programmes will be completed in Phase 1 discovery; the framework below maps the structural cost drivers to the DALP capabilities that address them.

| Cost Driver | Current State | DALP-Enabled State |
|---|---|---|
| Settlement cycle and float | Settlement delay generates float cost and counterparty risk exposure | T+0 atomic settlement eliminates float; XvP removes principal risk |
| Manual reconciliation | Settlement confirmations reconciled manually against ledger entries; break resolution requires operations team effort | Chain Indexer provides event-by-event reconciliation baseline; manual effort shifts to break resolution only |
| Compliance enforcement | Transfer eligibility checked in application code; rules can drift from regulatory requirements; enforcement requires engineering changes | Compliance modules enforce eligibility at smart contract level; rules configured by compliance officers; no engineering required for rule changes |
| Audit evidence assembly | Evidence for MAS examination assembled manually from multiple system records | Structured audit export covers full event lifecycle automatically; compliance team generates evidence packs on demand |
| New payment product launch | New payment product requires development of settlement logic, compliance rules, and reconciliation integration | New payment product is a configuration change to an existing DALPAsset instrument; compliance modules bound at configuration time |
| Corridor expansion | Adding a new settlement corridor requires development effort | New corridor activates through configuration: new DALPAsset token with appropriate compliance module set |

### 2.2 ROI Framework

| Value Driver | DALP Mechanism | Quantification Approach |
|---|---|---|
| Settlement efficiency | T+0 atomic finality replaces correspondent or batch settlement | Quantified against Grab Financial's current settlement cycle cost and float exposure per corridor, [CLIENT-SPECIFIC after workshop] |
| Operations productivity | Automated reconciliation baseline reduces manual effort by estimated 40-60% for covered settlement volume | Estimated based on comparable deployment productivity gains, [CLIENT-SPECIFIC after workshop] |
| Compliance efficiency | Evidence generation and compliance module management reduce compliance team effort for audit preparation | Estimated 30-50% reduction in audit preparation hours, [CLIENT-SPECIFIC after workshop] |
| Product velocity | New payment product and corridor activation in weeks instead of months | Revenue acceleration from faster product launch; estimated engineering cost avoidance, [CLIENT-SPECIFIC after workshop] |
| Risk reduction | Smart contract enforcement removes application-layer compliance bypass risk | Quantified as risk-adjusted expected cost of compliance incident, [CLIENT-SPECIFIC after workshop] |
| Project Guardian positioning | Open API and ERC-3643 standard token architecture enables Project Guardian ecosystem integration | Strategic value: access to MAS-sponsored cross-institutional settlement network |

### 2.3 Buy versus Build Analysis

| Dimension | Build Approach | DALP Platform |
|---|---|---|
| Time to controlled production | 18-36 months for regulated payment infrastructure with institutional controls | 19 weeks under standard implementation methodology |
| Smart contract development and audit | USD 200,000-500,000 per contract suite; annual re-audit on material changes | Included in DALP platform; audited before deployment |
| Security certifications | ISO 27001 and SOC 2 Type II: 12-18 months and USD 150,000-300,000 | Included: SettleMint holds both certifications |
| Compliance module development | Custom development for each MAS requirement and product variant; ongoing maintenance | Pre-built module library; configurable without code changes |
| Operational tooling | Custom observability, case management, and audit export | Included in platform: Grafana stack, Asset Console, structured audit export |
| Ongoing platform maintenance | Dedicated Grab Financial engineering team required | Covered by SettleMint under license |

The total cost of building and operating a comparable tokenized payment rail platform over five years is estimated at EUR 5-10 million for a Grab Financial-scale deployment, before factoring in regulatory timeline risk and execution quality uncertainty. DALP's five-year TCO is a fraction of that range.

### 2.4 Buy versus Assemble Analysis

| Component | Assembled Approach Cost | Notes |
|---|---|---|
| Smart contract development and audit | EUR 300,000-600,000 | Custom contracts for each payment instrument |
| Custody integration | EUR 50,000-150,000 | Established vendors; integration complexity |
| Compliance engine licensing | EUR 100,000-300,000/year | Ongoing; separate vendor relationship |
| Reconciliation and reporting tooling | EUR 100,000-300,000 | Custom development or BI licensing |
| Integration development | EUR 300,000-600,000 | Binding point solutions together |
| Ongoing maintenance and vendor management | EUR 400,000-800,000/year | Multiple vendor relationships; no single accountability point |

The assembled approach costs EUR 1.5-2.5 million in year one and EUR 500,000-1.1 million annually thereafter. DALP's EUR 420,000/year in licensing with transparent implementation services is lower cost and lower risk, with a single accountable vendor for the platform layer.

---

## 3. Pricing and Licensing

### 3.1 Platform License Pricing

| Environment | Monthly Equivalent | Annual Fee (Upfront) |
|---|---|---|
| Production License | EUR 25,000/month | EUR 300,000/year |
| Development License | EUR 10,000/month | EUR 120,000/year |
| **Combined (Production + Development)** | **EUR 35,000/month** | **EUR 420,000/year** |

All prices exclude applicable taxes and VAT. Taxes are added separately based on Grab Financial's jurisdiction and applicable tax treaties.

Payment terms: Annual, upfront.

### 3.2 License Scope

The production and development licenses include:

- Full DALP platform access including all core modules: asset lifecycle, compliance engine, identity registry, workflow orchestration, key management integration, chain indexer, and observability stack
- All currently released asset types including StableCoin and Deposit (the primary types for GrabPay payment rails), plus Bond, Equity, Fund, Real Estate, Precious Metal, and configurable DALPAsset
- All currently released compliance modules covering identity verification, country restrictions, address block list, investor limits, time lock, transfer approval, and collateral requirement
- All currently released addons including XvP Settlement (atomic DvP, essential for merchant settlement), Vault (multi-sig treasury), Token Sale, Fixed Yield, and Airdrop
- Platform updates and security patches during the license period
- OpenAPI documentation, TypeScript SDK, and CLI tooling access
- Standard support tier

Excluded from license: custody provider fees (procured directly by Grab Financial), cloud infrastructure costs (Grab Financial-managed), AML/CFT screening engine fees, and blockchain network infrastructure costs.

### 3.3 Environment Scope

| License | Purpose | Users | Volume |
|---|---|---|---|
| Production | Live GrabPay tokenized settlement operations in Singapore | Unlimited named users within licensed organization | Unlimited within platform capacity |
| Development | Integration development, configuration testing, UAT, staging | Unlimited named users | Unlimited (test network) |

Additional production environments, for example, for Thailand or Indonesia expansion, are priced at EUR 300,000/year per additional production environment.

---

## 4. Implementation Services

Implementation services are scoped following Phase 1 discovery. Indicative ranges are provided below as commercial reference points.

### 4.1 Indicative Implementation Budget Range

| Programme Scope | Indicative Range |
|---|---|
| Standard (2 payment instruments, 1 legal entity, 4 enterprise integrations: wallet engine, merchant settlement, KYC, AML) | EUR 300,000-450,000 [CLIENT-SPECIFIC] |
| Extended (4+ instruments, 2+ legal entities, 6+ integrations, custom observability dashboards) | EUR 480,000-680,000 [CLIENT-SPECIFIC] |

Implementation invoicing structure: 40% at project kickoff, 30% at Phase 3 completion, 30% at go-live sign-off.

### 4.2 Standard Implementation Deliverables

| Deliverable | Standard | Optional |
|---|---|---|
| Target-state architecture | ✅ | - |
| Integration design specifications | ✅ | - |
| Security design document | ✅ | - |
| Role and permission matrix | ✅ | - |
| Compliance configuration register | ✅ | - |
| Control mapping (MAS PSA, TRM, AML/CFT) | ✅ | - |
| SIT evidence pack | ✅ | - |
| Performance test report | ✅ | - |
| UAT sign-off documentation | ✅ | - |
| Cutover runbook and rehearsal evidence | ✅ | - |
| Operational runbooks (10 core scenarios) | ✅ | - |
| Training programme | ✅ | - |
| Extended runbook library (30+ scenarios) | - | ✅ |
| Custom Grafana dashboards beyond standard | - | ✅ |
| Post-go-live configuration advisory | - | ✅ |

### 4.3 SettleMint Implementation Team

| Role | Allocation | Responsibility |
|---|---|---|
| Programme Manager | 0.5 FTE | Governance, RAID, status reporting |
| Solution Architect | 1.0 FTE | Architecture, integration design, phase gates |
| Integration Engineer | 1.0 FTE | Wallet engine, merchant settlement, KYC, AML integrations |
| Blockchain Engineer | 0.5 FTE | Token configuration, network setup, custody integration |
| QA Engineer | 0.5 FTE | Test strategy, SIT coordination, performance testing |
| Compliance Specialist | 0.25 FTE | Module configuration, MAS compliance mapping |

---

## 5. Support and Service Levels

### 5.1 Standard Support (Included)

| Parameter | Standard |
|---|---|
| Coverage | Business hours, Monday-Friday, 09:00-18:00 CET |
| P1 Critical response | 4 hours |
| P2 High response | 8 hours |
| P3 Medium response | 24 hours |
| P4 Low response | 48 hours |
| Channels | Email, support portal |
| Platform uptime SLA | 99.5% for managed components |
| Security patches | 24-48 hours |
| Feature updates | Quarterly release cycle |

### 5.2 Enhanced Support (Recommended: Priced Separately)

| Parameter | Enhanced |
|---|---|
| Coverage | 24x7x365 |
| P1 Critical response | 15 minutes |
| P2 High response | 1 hour |
| Named Support Engineer | Dedicated SettleMint engineer with Grab Financial deployment knowledge |
| Quarterly Architecture Review | Included, reviews platform configuration against Grab Financial's evolving product roadmap |
| Pricing | [CLIENT-SPECIFIC, scoped per engagement] |

For a real-time payment infrastructure with MAS regulatory obligations and continuous GrabPay settlement activity, Enhanced Support is the appropriate tier. MAS TRM Guidelines require financial institutions to demonstrate incident response capability for critical payment systems. The 15-minute P1 response time from SettleMint, combined with Grab Financial's internal escalation procedures, meets this requirement.

### 5.3 Training Programme

| Programme | Audience | Format | Duration |
|---|---|---|---|
| Operations Training | Settlement operations team | Instructor-led, hands-on in the Asset Console | 2 days |
| Compliance Administration | Compliance and risk teams | Instructor-led, scenario-based | 1 day |
| System Administration | Technology and DevOps | Technical instructor-led | 2 days |
| Platform Overview | Executive sponsors | Briefing format | 3 hours |
| Runbook Validation Tabletop | Operations and compliance combined | Tabletop exercise | 1 day |

Training materials are formatted for internal re-delivery, which is important for Grab Financial's organization where staff rotation is expected over a multi-year programme.

---

## 6. Commercial Terms and Payment Structure

### 6.1 Payment Schedule

| Payment | Timing | Amount |
|---|---|---|
| Year 1. Platform License | At contract signature | EUR 420,000 |
| Implementation Tranche 1 (40%) | At project kickoff | [CLIENT-SPECIFIC] |
| Implementation Tranche 2 (30%) | At Phase 3 completion (configuration sign-off) | [CLIENT-SPECIFIC] |
| Implementation Tranche 3 (30%) | At go-live sign-off | [CLIENT-SPECIFIC] |
| Year 2 onwards. Platform License | Annually in advance, on anniversary | EUR 420,000/year |

### 6.2 Contract Parameters

| Parameter | Value |
|---|---|
| Minimum license term | 1 year |
| Price hold | 12 months from contract signature |
| License currency | EUR |
| Tax treatment | All prices exclude applicable taxes and VAT |
| Renewal | Automatic annual renewal; 90 days written notice to non-renew |
| Indexation | CPI-based after year 2; maximum 5% annual cap |
| Governing law | To be agreed during commercial negotiation; Belgian law default |

### 6.3 Intellectual Property

Platform software, smart contracts, compliance modules, and addons remain SettleMint's intellectual property. The license grants Grab Financial the right to use the platform for its licensed payment operations during the license period. Configuration assets, integration code, operational runbooks, and documentation produced during implementation are Grab Financial's intellectual property.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Five-Year TCO Framework

| Cost Component | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|---|---|
| Platform License (Production + Development) | EUR 420,000 | EUR 420,000 | EUR 429,000* | EUR 429,000* | EUR 429,000* | EUR 2,127,000 |
| Implementation Services | [CLIENT-SPECIFIC] | - |, | - |, | [CLIENT-SPECIFIC] |
| Enhanced Support (optional) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (Grab-managed) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Custody Provider (direct contract) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |

*Indicative; subject to CPI indexation terms.

### 7.2 Comparative Position

Platform licensing over five years runs at approximately EUR 2.1 million. Against the assembled alternative (estimated EUR 3-6 million over five years) or the build alternative (estimated EUR 5-10 million for Grab Financial's scale), DALP's TCO profile is materially lower. The advantage is amplified when Grab Financial's opportunity cost of delayed production deployment is included: 19 weeks to production versus 18-36 months for a build programme means approximately 12-30 months of additional revenue and operational savings available under the DALP approach.

---

## 8. Expansion Economics

### 8.1 Within-License Expansion

The production license covers Grab Financial's Singapore tokenized payment rails operations without per-transaction fees or participant count limits. The following expansions are covered within the existing license:

| Expansion | License Impact | Implementation Effort |
|---|---|---|
| Additional payment instrument type (e.g., GrabLend credit token) | No additional cost | Configuration only: 2-4 weeks |
| Additional merchant category with different compliance rules | No additional cost | Configuration only: 1-2 weeks |
| Transaction volume growth within Singapore | No volume-linked fees | Infrastructure scaling within Grab Financial's cloud |
| Additional settlement corridor within Singapore | No additional cost | Configuration only: 1-2 weeks |

### 8.2 Multi-Jurisdiction Expansion

Expansion to additional jurisdictions requiring separate production deployments (Thailand, Indonesia, Malaysia) are priced at EUR 300,000/year per additional production license and EUR 120,000/year per additional development license.

Multi-jurisdiction agreement structures that provide volume pricing across multiple production environments are available subject to written approval from SettleMint commercial leadership. Multi-year commitments may also qualify for structure discussions at SettleMint's discretion.

### 8.3 Project Guardian Ecosystem Expansion

DALP's open API architecture and ERC-3643 standard token infrastructure support integration with Project Guardian ecosystem participants using compatible infrastructure. Expansion into Project Guardian multi-institutional settlement scenarios would leverage the existing platform configuration with additional integration work scoped per the specific ecosystem connectivity requirements. No platform re-licensing is required for this expansion.

---

## 9. Exit Readiness and Transition Provisions

SettleMint includes the following exit provisions as standard commercial commitments:

**Data Exportability.** All token state, transaction records, audit logs, identity data, and compliance configuration are exportable in JSON and CSV formats at any time during the license period and for 12 months following license termination. Export functionality is accessible through DAPI without SettleMint engineering involvement.

**Smart Contract Independence.** DALPAsset smart contracts deployed on Grab Financial's infrastructure maintain their on-chain state independently of the DALP application layer. Token balances, compliance configurations, and identity data remain on-chain and readable regardless of whether the DALP platform is operational.

**Configuration Documentation.** Full configuration documentation, compliance module parameters, workflow definitions, role assignments, integration specifications, is maintained throughout the program and updated on each change. Configuration documentation belongs to Grab Financial and is transferable to an alternative service provider.

**Transition Assistance.** Following license termination, SettleMint provides up to 90 days of transition assistance at standard professional services rates. Transition assistance covers configuration review, data export support, and integration handover coordination.

**Knowledge Transfer Design.** Implementation runbooks, architecture documentation, and training materials are designed for internal maintainability and re-delivery by Grab Financial's teams without SettleMint involvement. This design principle is enforced throughout implementation, not added as a closing checklist item.

---

## 10. Assumptions Register

| Assumption | Impact if Different | Resolution Path |
|---|---|---|
| Grab Financial operates under MAS PSA licensing in Singapore | Compliance module configuration may differ | Confirm in Phase 1 legal and compliance review |
| Initial scope covers GrabPay SGD wallet token and GrabMerchant settlement token | Implementation scope and cost adjust accordingly | Finalize in Phase 1 discovery |
| Grab Financial has an existing KYC platform with API integration capability | Alternative claim issuance patterns available | Confirm in Phase 1 |
| Singapore Kubernetes environment available for Phase 2 start | Phase 2 timeline shifts if not available | Confirm at contract signature |
| Custody provider selection (DFNS or Fireblocks) within 4 weeks of contract signature | Phase 2 delay if not available | Parallel-track custody selection with commercial negotiation |
| All prices in EUR; Grab Financial invoicing in EUR | Currency conversion if billing required in SGD or USD | Confirm billing currency at contract signature |
| Enhanced Support is the appropriate tier for production payment infrastructure | Standard Support applies if selected; different SLA terms | Confirm support tier during commercial negotiation |
| Implementation commences within 8 weeks of contract signature | Timeline shifts accordingly | Agree kickoff date at contract signature |
| Grab Financial's AML/CFT engine supports outbound webhook for real-time screening | Alternative integration patterns (batch or synchronous API call) available | Confirm in Phase 1 integration scoping |

---

*Document classification: Confidential. Grab Financial Evaluation Only. Not for distribution.*  
*All prices exclude applicable taxes and VAT.*  
*Annual, upfront payment terms apply to all license fees.*  
*SettleMint BV. Registered in Belgium. All rights reserved.*
