# Commercial Proposal: Cross-Border Tokenized Settlement Platform

**Prepared for:** Airwallex
**Prepared by:** SettleMint
**Document Reference:** AIRWALLEX-RFP-202603-CP-001
**Date:** 21 March 2026
**Version:** 1.1 (Reviewed 1)
**Classification:** Confidential. Airwallex Invited Bidders Only

---

*This proposal and its contents are proprietary to SettleMint and are provided solely for evaluation purposes in response to the above-referenced procurement. Distribution outside the Airwallex evaluation committee is prohibited without written consent from SettleMint.*

---

## Table of Contents

1. Executive Summary
2. Recommended Commercial Configuration
3. License and Subscription Fees
4. Implementation Services
5. Support and Maintenance
6. Total Cost of Ownership
7. Investment Rationale and ROI Analysis
8. Payment Terms and Conditions
9. Commercial Assumptions and Exclusions
10. Proposal Validity and Next Steps

---

## Executive Summary

Airwallex is procuring a cross-border tokenized settlement infrastructure that can move from controlled programme to business-as-usual operations without a re-platform. This commercial proposal sets out the total investment required to deploy, operate, and scale DALP for that programme under the AIRWALLEX-RFP-202603 procurement.

The recommended commercial configuration is:
- **License:** DALP Enterprise License. Production + Development environments
- **Annual License Fee:** €420,000 per year (upfront)
- **Implementation Services:** [CLIENT-SPECIFIC, to be scoped in commercial validation]
- **Support:** Enterprise Support (24/7/365, included in licensing package)
- **Infrastructure:** Pass-through at cost (Managed SaaS, Singapore region)

The total first-year investment (license + estimated implementation) positions DALP as the lower-risk commercial path against building equivalent infrastructure in-house or assembling point solutions. The critical commercial fact: Airwallex's digital asset settlement programme requires compliance enforcement, governance infrastructure, observability tooling, and API connectivity that a smart contract library cannot provide. DALP provides all of this as a licensed platform. Building equivalent institutional-grade controls from scratch would require multi-year engineering investment and ongoing maintenance overhead.

For a fintech operating at Airwallex's scale and regulatory exposure, the cost of a settlement compliance failure, regulatory action, operational write-down, or reputational damage from a failed cross-border transfer, exceeds the total DALP investment within a single incident. DALP's institutional-grade controls are insurance against that cost, not a luxury.

All prices exclude applicable taxes and VAT.

---

## Recommended Commercial Configuration

| Component | Selection | Rationale |
|---|---|---|
| License Type | Enterprise License | Covers production + development environments, full feature set, Enterprise Support |
| Deployment Model | Managed SaaS | Singapore data residency, MAS TRM compliance, fastest time to production |
| Environments | Production (1) + Development (1) | Supports live operations and parallel integration testing |
| Support Tier | Enterprise | 24/7/365 coverage; named support team; 99.99% SLA |
| Implementation | [CLIENT-SPECIFIC] | Scoped during commercial validation; estimated 19-week engagement |
| Infrastructure | Cloud pass-through | AWS ap-southeast-1; costs passed at cost, not marked up |

---

## License and Subscription Fees

### Annual License Structure

| License Component | Monthly Equivalent | Annual Fee (Upfront) |
|---|---|---|
| Production License | €25,000 | €300,000 |
| Development License | €10,000 | €120,000 |
| **Total License Fee** | **€35,000** | **€420,000** |

All prices exclude applicable taxes and VAT. Annual payment upfront; no monthly payment option.

### License Inclusions

The DALP Enterprise License includes:

| Included Component | Description |
|---|---|
| Full DALP Platform | All modules: token lifecycle, compliance engine, identity registry, XvP settlement, observability, API |
| Software Updates | Continuous platform releases with coordinated change windows |
| Platform Documentation | Full technical documentation, runbooks, integration guides |
| Standard Support Portal | Ticketing, SLA tracking, knowledge base |
| Enterprise Support | 24/7/365 coverage, named team, CSM (see Support section) |
| Security Certifications | ISO 27001 and SOC 2 Type II annual certifications |

### License Exclusions

The following are not included in the license fee:

| Excluded Component | Notes |
|---|---|
| Cloud Infrastructure | Pass-through at AWS cost; not marked up by SettleMint |
| Implementation Services | Separately scoped per engagement (see below) |
| Custody Provider Fees | Fireblocks or DFNS fees are direct client-to-provider contracts |
| Third-party KYC/KYB Provider | Identity claim issuance fees are client-to-provider direct |
| Custom Compliance Modules | Rules outside the 18-module standard catalog require separate scoping |

---

## Implementation Services

### Engagement Model

SettleMint provides fixed-scope implementation services on a time-and-materials basis, quoted per engagement following commercial validation and requirements confirmation. For the Airwallex cross-border tokenized settlement programme, the standard 19-week implementation spans:

| Phase | Duration | Key Activities |
|---|---|---|
| Discovery and Requirements | 2 weeks | Business requirements, MAS compliance matrix, architecture design |
| Foundation and Setup | 3 weeks | Environment provisioning, identity framework, custody integration |
| Configuration and Compliance | 4 weeks | Compliance modules, XvP addon, workflow configuration |
| Integration and Testing | 4 weeks | GL/treasury integration, payment rail connectivity, SIT/UAT/performance/DR |
| Go-Live and Hypercare | 6 weeks | Production deployment, training, knowledge transfer |

Implementation fees are marked **[CLIENT-SPECIFIC]** until formally scoped. Indicative planning ranges (not quotes):

| Scope Factor | Impact on Fee |
|---|---|
| Number of integration touchpoints | Higher integration complexity (GL, treasury, multiple payment rails) increases Phase 4 scope |
| Number of asset/instrument types | Simple cross-border settlement: 1 token type; more asset types increase Phase 3 scope |
| On-premises vs Managed SaaS | On-premises adds infrastructure provisioning effort to Phase 2 |
| Regulatory complexity | Additional MAS documentation requirements may extend Phase 1 |

SettleMint will provide a firm implementation fee following a 2-hour commercial scoping call.

### Implementation Governance

| Role | Responsibility |
|---|---|
| SettleMint Project Manager | Delivery management, gate reviews, risk tracking |
| SettleMint Solution Architect | Technical design, integration architecture, compliance module configuration |
| SettleMint Integration Engineer | API integration, SDK setup, observability configuration |
| Airwallex Project Manager | Stakeholder alignment, environment access, UAT sign-off |
| Airwallex Technical Lead | Integration ownership, system connectivity, testing |
| Airwallex Compliance Lead | Compliance matrix review, regulatory sign-off |

---

## Support and Maintenance

### Enterprise Support (Included in License)

| Attribute | Enterprise Support Detail |
|---|---|
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Incident Response | < 15 minutes |
| P1 Incident Resolution | < 4 hours |
| Channels | Portal, email, dedicated Slack, phone, video |
| Named Support Team | Yes |
| Customer Success Manager | Named CSM |
| Platform Updates | Continuous delivery; staged rollouts |
| Architecture Reviews | Quarterly |

Enterprise Support is included in the DALP Enterprise License fee. No additional charge.

### Maintenance and Update Model

| Activity | Cadence | Responsibility |
|---|---|---|
| Platform security patches | As required (critical: < 24h) | SettleMint (Managed SaaS) |
| Platform minor updates | Monthly | SettleMint (coordinated with Airwallex) |
| Platform major releases | Quarterly | SettleMint (planned change window) |
| Blockchain node maintenance | As required | SettleMint (Managed SaaS) |
| Compliance module library updates | As new modules release | Client-activated through configuration |

---

## Total Cost of Ownership

### Year 1 Investment (Indicative)

| Component | Year 1 Cost |
|---|---|
| DALP Enterprise License (Production + Development) | €420,000 |
| Implementation Services | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (AWS ap-southeast-1, estimated) | [PASS-THROUGH AT COST] |
| Custody Provider (Fireblocks/DFNS, estimated) | [DIRECT CLIENT CONTRACT] |
| **Total Platform + License (Year 1)** | **€420,000 + implementation** |

### Year 2+ Annual Investment

| Component | Annual Cost |
|---|---|
| DALP Enterprise License | €420,000/year |
| Cloud Infrastructure | [PASS-THROUGH AT COST] |
| No implementation fee (maintenance only) | - |
| **Total Annual Platform Cost (Year 2+)** | **€420,000 + infrastructure** |

The Year 1 cost is implementation-heavy. From Year 2, total cost of ownership drops significantly as implementation is a one-time investment. This step-change in cost profile is a material commercial consideration: Year 1 total (license + implementation + infrastructure) will be materially higher than Year 2+. Year 2+ annual cost settles at €420,000 (license) plus infrastructure pass-through. The reduction from Year 1 to Year 2+ represents the point at which DALP's cost profile becomes decisively favorable against any in-house alternative, where engineering and compliance maintenance costs compound year-on-year.

**Year 1 vs Year 2+ Cost Profile Summary:**

| Year | License | Implementation | Infrastructure | Approximate Total |
|---|---|---|---|---|
| Year 1 | €420,000 | [CLIENT-SPECIFIC] | [PASS-THROUGH] | €420,000 + impl + infra |
| Year 2+ | €420,000 | - | [PASS-THROUGH] | €420,000 + infra |

The step-change from Year 1 to Year 2+ is the primary argument for earliest possible production deployment: every month of delayed go-live delays the transition to the lower steady-state cost profile.

### TCO Comparison: DALP vs Build-In-House

| Cost Category | DALP (5 years) | Build In-House (estimated) | Notes |
|---|---|---|---|
| Platform License | €2,100,000 | - | DALP Year 1-5 |
| Implementation | [CLIENT-SPECIFIC] | €3,000,000, €8,000,000 | Engineering team, smart contract dev, compliance build |
| Compliance module maintenance | Included | €500,000+/year | Ongoing regulatory change adaptation |
| Security certifications | Included | €200,000+/year | ISO 27001, SOC 2, pen testing |
| Support and operations | Included (Enterprise) | €400,000+/year | 24/7 blockchain infrastructure ops |
| Total (5 years, excluding infra) | €2,100,000 + impl | €8,000,000, €15,000,000 | Conservative in-house estimate |

The build-in-house estimate does not include regulatory compliance failure costs, which represent the highest-risk cost category for a fintech operating under PSA licensing and MAS TRM requirements.

### ROI Framework

For Airwallex, the quantifiable return on DALP investment comes from four categories:

| ROI Category | Mechanism | Magnitude |
|---|---|---|
| Settlement failure cost avoidance | Compliance enforcement prevents regulatory action from non-compliant transfers | High. PSA enforcement actions carry material fines |
| Reconciliation labor savings | Real-time chain indexer replaces manual reconciliation cycles | Medium, depends on current reconciliation headcount |
| Time to market | 19-week deployment vs multi-year in-house build | High, enables revenue-generating cross-border settlement 2-3 years earlier |
| Operational scalability | Platform scales without additional engineering investment | Medium-High, cross-border settlement volume growth is linear cost, not stepped |

---

## Payment Terms and Conditions

### Payment Schedule

| Component | Payment Timing |
|---|---|
| Annual License Fee (Year 1) | Due upon contract execution (upfront) |
| Implementation Services | Milestone-based billing per Phase completion |
| Annual License Renewal | Upfront at each anniversary date |

### Payment Conditions

- All fees are invoiced in EUR
- Payment due within 30 days of invoice date
- All fees exclude applicable taxes and VAT; taxes added based on applicable jurisdiction
- No monthly installment option for license fees
- License activation contingent on receipt of Year 1 payment

### Governing Law and Dispute Resolution

| Term | Detail |
|---|---|
| Governing Law | Singapore (for APAC-region clients) or Belgium (as applicable) |
| Dispute Resolution | Singapore International Arbitration Centre (SIAC) rules |
| Jurisdiction | Singapore courts have non-exclusive jurisdiction |
| Force Majeure | Standard force majeure provisions apply (detailed in MSA) |

---

## Commercial Assumptions and Exclusions

### Assumptions

All commercial figures in this proposal are based on the following assumptions. Material changes to assumptions will require revised commercial terms.

| Assumption | Detail |
|---|---|
| Deployment model | Managed SaaS, Singapore data residency |
| Environments | 1 Production + 1 Development |
| Asset types | Tokenized cross-border settlement instruments (stablecoin/deposit type) |
| Integration scope | GL, treasury, payment rails, KYC provider, observability (standard scope) |
| Support tier | Enterprise (24/7/365) |
| Timeline | Standard 19-week implementation |
| Regulatory scope | MAS PSA / TRM compliance (Singapore primary); cross-border corridors to be scoped |

### Exclusions

| Excluded Item | Notes |
|---|---|
| Custom compliance modules | Modules outside the 18-module standard catalog require additional scoping |
| Custom smart contract development | Platform is delivered as-configured; no custom contract code |
| Third-party provider fees | Custody (Fireblocks/DFNS), KYC/KYB, sanctions screening, all direct client contracts |
| Cloud infrastructure costs | Passed through at AWS cost; not marked up |
| Legal and regulatory advisory | SettleMint provides technical compliance documentation; legal advice is client responsibility |
| Multi-jurisdiction expansion beyond Singapore | Additional jurisdictions may require additional compliance module configuration (scoped separately) |

---

## Proposal Validity and Next Steps

### Proposal Validity

This commercial proposal is valid for 60 days from the date above (until 20 May 2026). License pricing is fixed at the rates stated. Implementation fees remain subject to formal scoping confirmation.

### Recommended Next Steps

| Step | Owner | Timeline |
|---|---|---|
| 1. Evaluation questions and clarifications | Airwallex to SettleMint | Within 2 weeks of receipt |
| 2. Reference client calls (under NDA) | SettleMint to arrange | Upon request |
| 3. Commercial scoping call (implementation fee confirmation) | Joint | Week 3-4 |
| 4. Technical deep-dive / architecture review | Joint | Week 3-4 |
| 5. Legal review of Master Services Agreement | Both legal teams | Week 4-6 |
| 6. Contract execution and Year 1 license payment | Both | Upon agreement |
| 7. Implementation kickoff | Joint | Following contract execution |

### SettleMint Commercial Contact

For all commercial queries related to this proposal, please contact SettleMint's Singapore-region commercial team. Contact details provided under separate cover.

---

*SettleMint | Confidential | Version 1.0 | 21 March 2026*
*All prices exclude applicable taxes and VAT. Annual, upfront payment terms apply to all license fees.*
