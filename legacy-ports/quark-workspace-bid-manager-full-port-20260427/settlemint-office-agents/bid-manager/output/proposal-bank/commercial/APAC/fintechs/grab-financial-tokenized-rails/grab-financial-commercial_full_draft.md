# Commercial Proposal: Tokenized Payment Rails Platform

**Prepared for:** Grab Financial Group
**Prepared by:** SettleMint
**Document Reference:** GRAB-FINANCIAL-RFP-202603-CP-001
**Date:** 21 March 2026
**Version:** 1.0 (Draft)
**Classification:** Confidential. Grab Financial Invited Bidders Only

---

*This proposal and its contents are proprietary to SettleMint and are provided solely for evaluation purposes in response to the above-referenced procurement. Distribution outside the Grab Financial evaluation committee is prohibited without written consent from SettleMint.*

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

Grab Financial Group is procuring a tokenized payment rails infrastructure that supports MAS PSA compliance, integrates with existing GrabPay and merchant settlement infrastructure, and scales across Southeast Asia corridors without requiring a re-platform at each new market. This commercial proposal sets out the total investment required to deploy, operate, and expand DALP for that programme under the GRAB-FINANCIAL-RFP-202603 procurement.

The recommended commercial configuration is:
- **License:** DALP Enterprise License. Production + Development environments
- **Annual License Fee:** €420,000 per year (upfront)
- **Implementation Services:** [CLIENT-SPECIFIC, to be scoped in commercial validation]
- **Support:** Enterprise Support (24/7/365, included in licensing package)
- **Infrastructure:** Pass-through at cost (Managed SaaS, Singapore primary)

For Grab Financial, the commercial case for DALP rests on three points. First, the platform provides the complete compliance and governance infrastructure required for MAS PSA-compliant payment token operations. Building equivalent institutional-grade compliance controls from scratch is a multi-year engineering programme, not a feature sprint. Second, DALP scales across Southeast Asia corridors through configuration. Each new corridor requires deploying a new asset contract and configuring compliance modules, not re-implementing the platform. Third, the cost profile step-changes materially from Year 1 (implementation-heavy) to Year 2+ (license plus infrastructure only), creating a favorable long-run economics profile against alternatives.

All prices exclude applicable taxes and VAT. Annual, upfront payment terms apply to all license fees.

---

## Recommended Commercial Configuration

| Component | Selection | Rationale |
|---|---|---|
| License Type | Enterprise License | Full feature set, Production + Development, Enterprise Support |
| Deployment Model | Managed SaaS (Singapore primary) | MAS TRM aligned; fastest time to production; lowest operational overhead |
| Environments | Production (1) + Development (1) | Supports live payment rail operations and parallel integration/testing |
| Support Tier | Enterprise | 24/7/365; named team; 99.99% SLA; critical for payment infrastructure |
| Implementation | [CLIENT-SPECIFIC] | Scoped per engagement; 19-week standard |
| Infrastructure | AWS ap-southeast-1 pass-through | Not marked up by SettleMint |

---

## License and Subscription Fees

### Annual License Structure

| License Component | Monthly Equivalent | Annual Fee (Upfront) |
|---|---|---|
| Production License | €25,000 | €300,000 |
| Development License | €10,000 | €120,000 |
| **Total License Fee** | **€35,000** | **€420,000** |

All prices exclude applicable taxes and VAT. Annual, upfront. No monthly payment option.

### License Inclusions

| Included Component | Description |
|---|---|
| Full DALP Platform | Token lifecycle, compliance engine, identity registry, XvP settlement, observability, API |
| All Corridors (Configuration-Based) | No per-corridor license fee; additional corridors through configuration |
| Software Updates | Continuous platform releases; coordinated change windows |
| Platform Documentation | Full technical documentation, runbooks, integration guides |
| Enterprise Support | 24/7/365; named team; CSM (detailed in Support section) |
| Security Certifications | ISO 27001 and SOC 2 Type II annual certifications |

### License Exclusions

| Excluded Component | Notes |
|---|---|
| Cloud Infrastructure | Pass-through at AWS cost; not marked up |
| Implementation Services | Separately scoped per engagement |
| Custody Provider Fees | Fireblocks or DFNS direct client contracts |
| Third-party KYC/eKYC Provider | Claim issuance fees are direct client-to-provider |
| Custom Compliance Modules | Rules outside the 18-module standard catalog require additional scoping |
| Additional Production Environments | Additional production environments are priced per Production License rate |

---

## Implementation Services

### Engagement Model

SettleMint provides fixed-scope implementation services quoted per engagement following commercial validation. The standard 19-week programme for Grab Financial covers:

| Phase | Duration | Key Activities |
|---|---|---|
| Discovery and Requirements | 2 weeks | Business requirements, PSA compliance matrix, multi-corridor architecture design |
| Foundation and Setup | 3 weeks | Environment provisioning, identity framework, custody integration, GrabPay API baseline |
| Configuration and Compliance | 4 weeks | Payment token contracts, corridor compliance modules, XvP settlement addon |
| Integration and Testing | 4 weeks | GrabPay wallet integration, merchant settlement, GL/treasury; SIT/UAT/performance/DR |
| Go-Live and Hypercare | 6 weeks | Production deployment, training, runbooks, hypercare |

Implementation fees are marked **[CLIENT-SPECIFIC]** and confirmed through a 2-hour commercial scoping call.

### Implementation Governance

| Role | SettleMint | Grab Financial |
|---|---|---|
| Project Management | SettleMint PM | Grab Financial PM |
| Solution Architecture | SettleMint Solution Architect | Grab Financial Tech Lead |
| Integration Engineering | SettleMint Integration Engineer | GrabPay Engineering Contact |
| Compliance / Regulatory | SettleMint Compliance Specialist | Grab Financial Compliance Lead |

---

## Support and Maintenance

### Enterprise Support (Included in License)

| Attribute | Enterprise Detail |
|---|---|
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response | < 15 minutes |
| P1 Resolution | < 4 hours |
| Channels | Portal, email, Slack, phone, video |
| Named Support Team | Yes. APAC-aligned engineers |
| Customer Success Manager | Named CSM |
| Platform Updates | Continuous delivery; staged rollouts |

### P1 Escalation: Payment Infrastructure

For payment infrastructure, SettleMint defines P1 as any condition causing material disruption to settlement operations:

| P1 Trigger | Example |
|---|---|
| Settlement finality failure | XvP contract unreachable; settlement events not confirmed |
| Compliance module unavailable | Transfer validation failures due to compliance engine errors |
| API / DAPI unresponsive | GrabPay wallet unable to initiate payment token transfers |
| Key Guardian failure | Signing failures preventing all blockchain writes |

P1 incidents trigger a war-room response: named incident manager, direct engineering escalation, and continuous status communication to Grab Financial's operations team.

---

## Total Cost of Ownership

### Year 1 and Year 2+ Investment Summary

| Component | Year 1 | Year 2+ (Annual) | Notes |
|---|---|---|---|
| DALP Enterprise License | €420,000 | €420,000 | Fixed; upfront per year |
| Implementation Services | [CLIENT-SPECIFIC] | - | One-time |
| Cloud Infrastructure | [PASS-THROUGH] | [PASS-THROUGH] | AWS cost |
| Custody Provider | [DIRECT CONTRACT] | [DIRECT CONTRACT] | Fireblocks/DFNS |

**Year 1 vs Year 2+ Cost Profile:**

Year 1 is implementation-heavy: the total cost includes license, one-time implementation, and infrastructure. From Year 2, the cost profile simplifies to €420,000/year (license) plus infrastructure pass-through. This step-change is significant: Year 2+ total platform cost is typically 30-50% lower than Year 1 once implementation is complete, depending on the implementation scope confirmed during commercial validation.

This cost profile step-change has a strategic implication: the earlier Grab Financial reaches production, the sooner the economics shift to the favorable Year 2+ profile. Delayed go-live extends the Year 1 cost period without the operational benefits of the live platform.

| Year | License | Implementation | Infrastructure | Approximate Total |
|---|---|---|---|---|
| Year 1 | €420,000 | [CLIENT-SPECIFIC] | [PASS-THROUGH] | €420,000 + impl + infra |
| Year 2 | €420,000 | - | [PASS-THROUGH] | €420,000 + infra |
| Year 3 | €420,000 | - | [PASS-THROUGH] | €420,000 + infra |
| Year 4 | €420,000 | - | [PASS-THROUGH] | €420,000 + infra |
| Year 5 | €420,000 | - | [PASS-THROUGH] | €420,000 + infra |

### TCO Comparison: DALP vs Build-In-House

| Category | DALP (5 years) | Build In-House | Notes |
|---|---|---|---|
| Platform License | €2,100,000 | - | DALP Year 1-5 license |
| Initial Build | [CLIENT-SPECIFIC] | €4,000,000, €10,000,000 | Smart contracts, compliance, governance, API |
| Compliance Maintenance | Included | €600,000+/year | Regulatory change adaptation per corridor |
| Security Certifications | Included | €250,000+/year | ISO 27001, SOC 2, pen testing |
| 24/7 Operations | Included (Enterprise) | €500,000+/year | Blockchain infrastructure ops team |
| 5-Year Total (excl. infra) | €2,100,000 + impl | €12,000,000, €22,000,000 | Conservative in-house estimate |

The in-house figure does not include the cost of a compliance failure, regulatory enforcement action under PSA, operational write-down, or reputational damage from a failed cross-border settlement. For a MAS-licensed payment services provider, these are the dominant risk costs, and they are the category DALP's institutional-grade compliance architecture is designed to prevent.

### ROI Framework

| ROI Category | Mechanism | Estimated Magnitude |
|---|---|---|
| Regulatory compliance cost avoidance | On-chain compliance prevents PSA enforcement action from non-compliant transfers | High. PSA enforcement carries material fines and potential licence conditions |
| Reconciliation labor savings | Real-time chain indexer replaces manual cross-corridor reconciliation | Medium, depends on current reconciliation team size |
| Time to market | 19-week deployment vs multi-year in-house build | High, multi-corridor payment settlement revenue 2-3 years earlier |
| Corridor expansion economics | New corridors via configuration, not re-implementation | Medium, each new corridor adds revenue without corresponding engineering cost |
| Operational scalability | Platform scales with payment volume without additional platform engineering | Medium-High, favorable unit economics at scale |

---

## Payment Terms and Conditions

### Payment Schedule

| Component | Timing |
|---|---|
| Annual License Fee (Year 1) | Due upon contract execution (upfront) |
| Implementation Services | Milestone-based billing per Phase completion gate |
| Annual License Renewal | Upfront at each anniversary |

### Conditions

- All fees invoiced in EUR
- Payment due within 30 days of invoice date
- All fees exclude applicable taxes and VAT
- No monthly installment option for license fees
- License activation contingent on receipt of Year 1 payment

### Governing Law

| Term | Detail |
|---|---|
| Governing Law | Singapore |
| Dispute Resolution | Singapore International Arbitration Centre (SIAC) |
| Jurisdiction | Singapore courts |
| Force Majeure | Standard provisions in MSA |
| Change of Control | Notification obligations and consent rights per MSA |

---

## Commercial Assumptions and Exclusions

### Assumptions

| Assumption | Detail |
|---|---|
| Deployment model | Managed SaaS, Singapore primary (AWS ap-southeast-1) |
| Environments | 1 Production + 1 Development |
| Initial corridors | SGD primary; additional corridors through configuration (no additional license cost) |
| Integration scope | GrabPay wallet, merchant settlement, GL, treasury, KYC provider, observability |
| Support tier | Enterprise (24/7/365) |
| Timeline | Standard 19-week implementation |
| Regulatory scope | MAS PSA / TRM (Singapore primary) |

### Exclusions

| Excluded Item | Notes |
|---|---|
| Custom compliance modules | Modules outside the 18-module catalog require additional scoping |
| Custom smart contract development | All contracts are standard DALP; no custom code |
| Third-party fees | Custody, KYC/eKYC, sanctions screening, direct client contracts |
| Cloud infrastructure | Pass-through at AWS cost |
| Legal and regulatory advisory | Technical documentation provided; legal advice is client responsibility |
| Additional production environments | Each additional production environment priced at €300,000/year |

---

## Proposal Validity and Next Steps

### Validity

This commercial proposal is valid for 60 days (until 20 May 2026). License pricing is fixed at the rates stated. Implementation fees subject to formal scoping confirmation.

### Recommended Next Steps

| Step | Owner | Timeline |
|---|---|---|
| 1. Evaluation questions and clarifications | Grab Financial to SettleMint | Within 2 weeks |
| 2. Reference calls (under NDA) | SettleMint to arrange | Upon request |
| 3. Commercial scoping call | Joint | Week 3-4 |
| 4. Technical deep-dive / GrabPay integration review | Joint | Week 3-4 |
| 5. Legal review of Master Services Agreement | Both | Week 4-6 |
| 6. Contract execution and Year 1 payment | Both | Upon agreement |
| 7. Implementation kickoff | Joint | Following contract execution |

---

*SettleMint | Confidential | Version 1.0 | 21 March 2026*
*All prices exclude applicable taxes and VAT. Annual, upfront payment terms apply to all license fees.*
