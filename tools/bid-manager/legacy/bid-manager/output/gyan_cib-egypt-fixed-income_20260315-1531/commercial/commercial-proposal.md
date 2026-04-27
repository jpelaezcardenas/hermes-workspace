# Commercial Proposal: Tokenized Fixed Income Servicing and Distribution Platform

| Field | Value |
|---|---|
| Proposal title | Commercial Proposal: Tokenized Fixed Income Servicing and Distribution Platform |
| Client | Commercial International Bank (Egypt) |
| Submitted by | SettleMint NV |
| Date | March 2026 |
| Version | v1.0 |
| Confidentiality | Restricted |
| RFP Reference | COMMERCIAL-INTERNATIONAL-BANK-RFP-TOKENIZED-FIXED-INCOME-EGYPT-202603 |

---

# Executive Summary

Commercial International Bank requires a platform and delivery partner capable of bringing tokenized fixed income servicing and distribution to production with the discipline, transparency, and governance expected of a core regulated system operating under CBE and FRA oversight. This commercial proposal presents SettleMint's licensing, implementation, and support model for the Digital Asset Lifecycle Platform (DALP), structured to provide predictable costs, transparent assumptions, and a clear total cost of ownership across a three-to-five-year horizon.

**Commercial recommendation:**

- **License tier:** Enterprise (Tier 2), supporting multiple bond types, environments, and custody provider integrations
- **Deployment model:** Dedicated cloud, Egypt-resident infrastructure
- **Implementation:** 19-week phase-gated delivery with five formal gate reviews
- **Support tier:** Premium, 16x5 coverage, 2-hour P1 response, dedicated support engineer
- **Estimated three-year TCO:** To be finalized during commercial discussions based on validated scope

The DALP licensing model uses predictable annual subscription pricing with no per-transaction, per-token, per-user, or per-asset fees. This means CIB can scale issuance volume, bond product range, and investor base without incurring incremental platform costs. Coupon distributions, compliance checks, and settlement operations, which occur at high frequency in production fixed income operations, carry zero marginal licensing cost.

| Current Approach | DALP Approach |
|---|---|
| Multiple point solutions assembled | Single lifecycle platform |
| Per-transaction or per-token pricing | Flat annual subscription |
| 18 to 24 months custom development | 19-week production deployment |
| Multi-vendor coordination overhead | Single accountable platform partner |

---

# Investment Rationale

## Cost of Current Approach

Financial institutions approaching tokenized fixed income through internal development or multi-vendor assembly face substantial hidden costs that go beyond software licensing. CIB's evaluation should consider the full operational burden of each alternative path.

**Internal build** requires assembling blockchain expertise, financial domain knowledge, compliance engineering, and operational tooling from scratch. Industry experience shows 18 to 24 months of custom development before a first production deployment, with ongoing maintenance requiring a dedicated engineering team of 5 to 8 specialists. The coordination cost of managing separate issuance, compliance, custody, settlement, and servicing components creates organizational overhead that compounds over time.

**Multi-vendor assembly** reduces development time but introduces its own costs. Each vendor integration requires separate API work, data mapping, error handling, and operational monitoring. SLA gaps between vendors create unowned responsibilities. When a compliance check fails during settlement, determining which vendor's system caused the failure and who is accountable for resolution becomes an operational burden. Nightly reconciliation between separate systems adds permanent operational cost.

**Pilot that cannot scale** is perhaps the most common cost pattern. An institution invests in a proof-of-concept that works in a controlled setting but lacks the lifecycle management, compliance depth, and operational tooling to scale into production. The result is a sunken investment plus the need to start over with a production-grade platform.

## Why DALP Changes Economics

DALP changes the economic equation by consolidating the full fixed income lifecycle into a single platform with a single governance model, security posture, and operating framework. The economic impact operates across four dimensions.

**Eliminated integration tax.** Instead of integrating separate issuance, compliance, custody, settlement, and servicing components, CIB operates one platform. Each integration point that is eliminated removes API maintenance, error reconciliation, and vendor coordination cost.

**Included lifecycle capabilities.** Coupon calculation, maturity processing, compliance enforcement, and audit trail generation are built into the platform. These capabilities would each require separate procurement, integration, and maintenance in an assembled approach.

**Reuse across asset classes.** When CIB expands beyond bonds to equities, funds, or deposits, the same platform, compliance engine, and governance model applies. The marginal cost of adding a new asset class is configuration, not new procurement.

**Predictable cost profile.** The annual subscription model means CIB can plan technology budgets without volume-driven cost surprises. A bond programme that scales from 10 to 10,000 investors or from 5 to 50 issuances incurs no additional platform licensing cost.

## ROI Framework

| ROI Driver | Baseline (Without DALP) | DALP-Enabled Impact | Method |
|---|---|---|---|
| Time-to-market | 18 to 24 months (build) | 19 weeks to production | Phase-gated delivery with pre-built templates |
| Settlement efficiency | T+2 with reconciliation | T+0 with deterministic finality | Atomic DvP settlement |
| Compliance operations | Manual review per transfer | Automated ex-ante enforcement | 18 compliance module types |
| Operational headcount | 5 to 8 specialists (build) | 2 to 3 platform operators | Pre-built servicing automation |
| Multi-vendor coordination | 3+ vendor relationships | Single platform partner | Lifecycle coverage in one platform |
| Audit preparation | Manual evidence assembly | Structured, exportable audit trails | 534 error codes, compliance records |

**Payback logic:** The primary payback driver is the difference between the cost of building or assembling equivalent capability versus the DALP subscription and implementation investment. Secondary payback comes from reduced operational headcount, eliminated reconciliation effort, and faster time-to-revenue from the fixed income programme.

---

# Licensing Model

## Philosophy

DALP uses a platform licensing model designed for regulated institutions. The core principle is predictability: CIB pays a fixed annual subscription that includes the full platform capability set regardless of usage volume. There are no per-transaction fees, no per-token fees, no per-user fees, and no per-asset fees.

This model is designed specifically for regulated financial institutions where transaction-based pricing creates cost anxiety that inhibits operational scaling. When every compliance check, coupon distribution, and settlement operation carries a marginal cost, institutions are incentivized to reduce the frequency of controls rather than increase them. DALP's flat subscription removes this misalignment.

| Pricing Model | Platform License (DALP) | Transaction-Based |
|---|---|---|
| Cost predictability | Fixed annual fee | Variable, volume-dependent |
| Scaling incentive | Scale freely | Each transaction adds cost |
| Compliance frequency | No cost per check | Cost per compliance check |
| Budget planning | Predictable | Requires volume forecasting |

## What Is Included

The DALP license includes the complete platform capability set:

| Category | Included |
|---|---|
| Lifecycle Pillars | Issuance, compliance, custody orchestration, settlement, servicing |
| Asset Classes | All 7 pre-built templates plus configurable token |
| Compliance Modules | All 18 module types |
| APIs | REST, GraphQL, webhooks, oRPC |
| SDK and CLI | Full typed SDK and 301 CLI commands |
| Observability | Grafana dashboards, metrics, logs, traces |
| Platform Updates | Included in subscription |
| Standards | ERC-3643, OnchainID, ISO 20022 integration |

## What Varies

Engagement-specific dimensions that affect the commercial scope:

| Dimension | Variable | CIB Recommendation |
|---|---|---|
| Deployment model | SaaS, dedicated cloud, on-premises, hybrid | Dedicated cloud (Egypt-resident) |
| Environment count | Dev, staging, UAT, DR, production | 5 environments |
| Network setup | Public EVM, permissioned private | Permissioned private |
| Custody integration | Fireblocks, DFNS, HSM | To be determined in Discovery |
| Support tier | Standard, Premium, Enterprise | Premium |
| Implementation services | 19-week standard, extended, accelerated | 19-week standard |

## Platform Tiers

| Feature | Foundation | Enterprise (Recommended) | Sovereign |
|---|---|---|---|
| **Fit** | Focused first production use case | Scaling across environments and integrations | National-scale control requirements |
| Asset classes | Up to 2 | All 7 + configurable | All + custom |
| Environments | Dev + production | Dev + staging + UAT + DR + production | Unlimited |
| Custody integration | 1 provider | Multiple providers | Full HSM + multi-provider |
| Compliance modules | Core set | Full 18 types | Full + custom extensions |
| API access | REST, webhooks | Full API surface | Full + dedicated API gateway |
| Support | Standard | Premium | Enterprise (24/7) |
| Account management | Quarterly review | Monthly review + SA access | Continuous + dedicated team |

SettleMint recommends **Enterprise (Tier 2)** for CIB's fixed income programme, providing the multi-environment support, full compliance module set, and Premium support tier appropriate for a business-critical production deployment.

---

# Deployment Options and Pricing

## Model Overview

All deployment models deliver the same DALP platform capabilities. The choice is driven by CIB's requirements for data residency, operational ownership, security posture, and time-to-deploy.

## Comparison

| Criterion | Managed SaaS | Dedicated Cloud (Recommended) | On-Premises | Hybrid |
|---|---|---|---|---|
| Infrastructure management | SettleMint | SettleMint (dedicated) | CIB | Split |
| Data residency | Regional | Egypt-resident | Full CIB control | Component-level |
| Time-to-deploy | 4 to 6 weeks | 6 to 8 weeks | 12 to 16 weeks | 8 to 12 weeks |
| Operational overhead | Lowest | Low | Highest | Moderate |
| Security posture | SettleMint model | Dedicated, CIB-reviewed | CIB model | Mixed |

## Cost Structure

| Category | Type | Description |
|---|---|---|
| Platform license | Recurring (annual) | DALP Enterprise tier subscription |
| Implementation services | One-time | 19-week delivery programme |
| Infrastructure | Recurring (annual) | Cloud hosting, compute, storage, network |
| Support | Recurring (annual) | Premium support tier |
| Training | One-time | 3-track training programme |
| Custody integration | One-time + recurring | Custody provider fees (pass-through) |

## Cost Drivers

| Increases Cost | Decreases Cost |
|---|---|
| On-premises deployment | Managed cloud deployment |
| Multiple custody providers | Single custody provider |
| HSM key management | Cloud secret manager |
| Complex legacy integration | Modern API-based systems |
| Multi-region deployment | Single-region deployment |
| Custom compliance extensions | Standard compliance modules |
| Accelerated timeline | Standard 19-week timeline |
| Multi-year commitment discount | Single-year commitment |

---

# Support and SLA Framework

## Tiers

SettleMint recommends **Premium Support** for CIB's fixed income programme. Premium provides the extended coverage hours, dedicated support engineer, and 2-hour P1 response time appropriate for a business-critical deployment operating under CBE regulatory oversight.

| Attribute | Standard | Premium (Recommended) | Enterprise |
|---|---|---|---|
| Coverage | Business hours CET | 07:00 to 22:00 CET + P1 weekends | 24/7/365 |
| Channels | Email, portal | Email, portal, Slack, phone | All + video |
| Named contacts | 3 | 8 | Unlimited |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Designated engineer | No | Yes | Dedicated team |
| Release cycle | Quarterly | Monthly | Continuous |
| Account review | Quarterly | Monthly + technical deep-dive | Continuous |

## Severity Levels

| Severity | Definition | Premium Response | Premium Resolution Target |
|---|---|---|---|
| P1 Critical | Production down or major function unavailable | 2 hours | 4 hours |
| P2 High | Significant business impact, partial workaround | 4 hours | 8 hours |
| P3 Medium | Non-critical impairment | 8 business hours | 3 business days |
| P4 Low | Minor issue, workaround available | 2 business days | Next release |

## Uptime SLA

Premium support includes a 99.95% monthly uptime target for managed infrastructure, translating to a maximum of approximately 22 minutes of unplanned downtime per month. Uptime is measured against the platform's API availability and core lifecycle functions.

## Escalation

Escalation follows a structured path: assigned support engineer, support team lead, engineering management, executive management. Automatic escalation triggers activate if response or resolution targets are at risk. CIB can initiate manual escalation at any time through the dedicated Slack channel or phone.

## Maintenance

Scheduled maintenance windows are coordinated with CIB's change management process with minimum 72-hour advance notification. Monthly release cycles under Premium support include release notes, migration guides, and staged rollout. Critical security patches are deployed outside the standard cycle with 24-hour priority notification.

---

# Implementation Investment

## Methodology

SettleMint follows a 19-week phase-gated implementation methodology with formal gate reviews between each phase. The methodology has been refined through production implementations at regulated banks, sovereign entities, and market infrastructure providers. Phase gates reduce delivery risk by requiring sign-off on defined deliverables before proceeding.

## Phase Summary

| Phase | Weeks | Objective |
|---|---|---|
| Discovery and Requirements | 1 to 3 | Validate requirements, design architecture, map regulatory landscape |
| Foundation and Setup | 4 to 7 | Provision environments, configure assets and compliance modules |
| Configuration and Compliance | 8 to 11 | Complete integrations, validate compliance enforcement end-to-end |
| Integration and Testing | 12 to 15 | Functional, NFR, security, DR testing, UAT, and training |
| Go-Live | 16 to 17 | Production cutover with controlled transition |
| Hypercare | 18 to 21 | Intensive monitoring, optimization, operational handover |

## Pricing Summary

| Component | Basis | Timing |
|---|---|---|
| Discovery and Requirements | Fixed fee | Milestone: Gate 1 approval |
| Foundation and Setup | Fixed fee | Milestone: Gate 2 approval |
| Configuration and Compliance | Fixed fee | Milestone: Gate 3 approval |
| Integration and Testing | Fixed fee | Milestone: Gate 4 approval |
| Go-Live | Fixed fee | Milestone: Gate 5 approval |
| Hypercare | Fixed fee | Completion of 4-week period |

All implementation fees are milestone-based, payable upon completion and acceptance of each phase's deliverables. Specific pricing to be finalized during commercial discussions based on validated scope from the Discovery phase.

## Accelerators and Risks

| Accelerators | Risk Factors |
|---|---|
| Pre-built bond templates reduce configuration time | On-premises deployment extends timeline by 4 to 8 weeks |
| Standard compliance module templates for CBE/FRA alignment | Complex legacy core banking integration may add 2 to 4 weeks |
| ISO 20022 payment rail integration patterns | HSM custody setup requires additional lead time |
| Reference architecture from similar deployments | Regulatory approval dependencies outside SettleMint control |
| SDK and CLI for rapid integration development | Limited CIB resource availability extends Discovery |

## Training

| Audience | Focus | Duration |
|---|---|---|
| Platform administrators | Configuration, monitoring, compliance management | 3 days |
| Integration developers | API, SDK, CLI, webhook patterns | 2 days |
| Business operations | Bond lifecycle, servicing oversight, reporting | 2 days |

---

# Commercial Terms

## Contract Structure

The commercial engagement comprises three primary agreements: the DALP Platform License Agreement (annual subscription), the Implementation Services Agreement (project delivery), and the Support Services Agreement (ongoing operational support). Each agreement can be co-terminated or renewed independently, providing CIB with flexibility in managing the commercial relationship.

## Payment Schedule

| Component | Cadence | Trigger |
|---|---|---|
| Platform license | Annual | Contract execution |
| Implementation services | Milestone-based | Phase gate acceptance |
| Support services | Annual (or quarterly) | Go-live |
| Infrastructure | Monthly or annual | Environment provisioning |

## Duration

The recommended initial license term is 3 years, with the license term commencing upon contract execution. Multi-year commitments provide pricing advantages and align with the strategic nature of CIB's fixed income programme. The implementation timeline is separate from the license term; platform access begins during implementation to support configuration and testing.

## Renewal

Renewal follows a 90-day notice process before term expiration. Renewal pricing is based on the then-current rate card with applicable loyalty adjustments. Early renewal discussions are welcomed to provide CIB with planning certainty.

## Termination

Either party may terminate for material breach with a 30-day cure period. SettleMint provides 90 days of data export support following termination, ensuring CIB retains access to all platform data in standard formats. Post-termination transition support is available as a separately priced service if required.

## Intellectual Property

DALP platform intellectual property remains the property of SettleMint NV. CIB retains full ownership of all data processed through the platform, including investor records, transaction history, compliance evidence, and operational data. Configuration work (bond templates, compliance module settings, integration mappings) created during implementation is jointly usable. Any custom integrations built by CIB using the SDK and APIs are CIB's property.

## Liability

Liability is capped at the annual license and support fees paid by CIB in the 12 months preceding the claim. Exclusions apply to consequential damages, lost profits, and force majeure events. The specific liability framework is subject to final contract negotiation.

## Confidentiality

Mutual confidentiality obligations apply for a period of 3 years following disclosure. Standard exceptions apply for publicly available information, independently developed information, and legally compelled disclosures. Both parties agree to protect each other's confidential information with the same degree of care applied to their own.

## Escrow

Source code escrow can be arranged through an independent third-party escrow agent if CIB requires continuity assurance. Escrow release conditions, including vendor insolvency, material breach, or discontinuation of the product, are negotiated separately. Escrow is an optional mechanism available upon request.

---

# Total Cost of Ownership

## TCO Framework

A meaningful TCO comparison for CIB's fixed income programme must account for more than software licensing. The total cost of operating a tokenized fixed income platform includes platform costs, infrastructure, implementation, ongoing support and maintenance, internal operational resources, integration maintenance, compliance operations, and audit preparation. DALP's value becomes apparent when these categories are compared across three alternatives: DALP deployment, internal build, and multi-vendor assembly.

## 3-Year Model

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform license | Annual fee | Annual fee | Annual fee | 3x annual fee |
| Implementation | Full programme | None | None | One-time |
| Infrastructure | Annual hosting | Annual hosting | Annual hosting | 3x annual |
| Support (Premium) | Annual fee | Annual fee | Annual fee | 3x annual |
| Training | Initial programme | Refresher | Refresher | Initial + 2x refresher |
| CIB internal resources | 2 to 3 operators | 2 to 3 operators | 2 to 3 operators | Ongoing |

Note: Specific pricing to be determined following scope validation during the Discovery phase.

## 5-Year Model

Years 4 and 5 reflect steady-state operations with the potential for programme expansion. If CIB adds additional asset classes (equities, funds, deposits) in years 3 to 5, the incremental cost is limited to configuration and integration services; the platform license covers all asset classes. Multi-year license commitments provide pricing advantages that reduce the effective annual cost.

## Comparative Analysis

| Dimension | DALP | Internal Build | Multi-Vendor Assembly |
|---|---|---|---|
| Time to production | 19 weeks | 18 to 24 months | 9 to 12 months |
| Ongoing engineering | Platform operator (2 to 3) | Full team (5 to 8) | Integration team (3 to 5) |
| Compliance maintenance | Included (18 modules) | Custom development | Per-vendor compliance |
| Settlement capability | Atomic DvP, T+0 | Custom development required | Integration dependent |
| Lifecycle servicing | Automated coupons, maturity | Custom development required | Partial, multi-vendor |
| Multi-asset expansion | Configuration only | New development per asset | New integration per asset |
| Vendor coordination | Single partner | Internal teams | 3+ vendor relationships |
| Audit evidence | Structured, exportable | Custom reporting | Multi-system assembly |

The cumulative cost advantage of DALP compounds over time. In year 1, the implementation investment is partially offset by avoiding 18+ months of internal development. By year 3, the elimination of multi-vendor coordination, custom compliance maintenance, and dedicated engineering teams creates significant cost separation. By year 5, with programme expansion across additional asset classes, the platform licensing model delivers further savings as each new asset class requires configuration rather than new procurement.

---

# Customer References

## Track Record

| Client | Geography | Use Case | Deployment Scale | Relevance |
|---|---|---|---|---|
| Commerzbank | Germany | ETP issuance, settlement | Production | Fixed income, settlement under 10s |
| OCBC Bank | Singapore | Security token engine | Production | Tier-1 bank, multi-asset |
| Standard Chartered | Asia, Africa, ME | Digital exchange | Production | Institutional trading, MEA presence |
| IsDB | 57 countries | Subsidy distribution | Production | Multi-jurisdictional governance |
| Saudi RER | KSA | Real estate tokenization | Production | National-scale, enterprise integration |
| Sony Bank | Japan | Stablecoin with identity | Production | Identity-integrated finance |
| Mizuho Bank | Japan | Bond tokenization | PoC to production | Fixed income capability |
| Maybank | Malaysia | FX tokenization, XvP | Production | Atomic settlement |

## Case Study: Commerzbank

**Context:** Commerzbank required a hybrid on/off-chain solution for ETP issuance with integration to Boerse Stuttgart's listing service.

**Challenge:** Near real-time clearing and settlement under institutional regulatory oversight, with demonstrable cost advantages over traditional processes.

**Solution:** SettleMint delivered integrated listing, issuance, and settlement with trades cleared in near real time.

**Outcome:** Settlement in under 10 seconds. Model identified EUR 7M annual savings potential. Reduced counterparty risk through atomic settlement.

**Transferability:** Directly demonstrates fixed income platform capability, settlement speed, and institutional-grade operations in a European banking environment.

## Case Study: Mizuho Bank

**Context:** Mizuho required bond tokenization and trade finance capability using standard platform features, with the goal of enabling internal teams to operate independently.

**Challenge:** Deliver production-ready bond lifecycle capability without requiring ongoing custom development support.

**Solution:** DALP's standard bond templates and platform capabilities, configured for Mizuho's requirements.

**Outcome:** Proof of concept successfully completed in late 2025; currently advancing to production planning.

**Transferability:** Demonstrates DALP's bond-specific capabilities and the platform's ability to support institutional self-sufficiency after implementation.

---

# Project Implementation and Delivery

## Methodology

The 19-week phase-gated implementation follows SettleMint's standard delivery methodology, refined through production deployments at regulated banks and sovereign entities. Each phase concludes with a formal gate review requiring CIB sign-off before proceeding.

## Timeline

| Phase | Duration | Key Output |
|---|---|---|
| Discovery and Requirements | 3 weeks | Validated BRD, architecture, regulatory mapping |
| Foundation and Setup | 4 weeks | Provisioned environments, configured assets and compliance |
| Configuration and Compliance | 4 weeks | Integrated platform, validated lifecycle workflows |
| Integration and Testing | 4 weeks | Test results, security assessment, UAT approval |
| Go-Live | 2 weeks | Production operational, monitoring active |
| Hypercare | 4 weeks | Stabilized operations, completed handover |

## Client Responsibilities

CIB is responsible for designating a project sponsor and project manager, making stakeholders available for Discovery workshops, providing documentation on current systems and regulatory requirements, participating in architecture and gate reviews, provisioning access to integration target systems, and designating participants for training sessions.

---

# Support Appendix

## Support Operations

The Premium support tier assigns a dedicated support engineer to CIB's account. This engineer maintains knowledge of CIB's specific deployment configuration, bond templates, compliance modules, integration architecture, and operational procedures, reducing resolution time and eliminating re-explanation overhead.

Support interactions are logged in a dedicated ticketing system with SLA tracking, escalation triggers, and reporting. CIB receives monthly service reports covering ticket volumes, resolution times, SLA compliance, and platform availability metrics.

## Maintenance Schedule

| Activity | Frequency | Notice |
|---|---|---|
| Platform releases | Monthly | 2 weeks advance |
| Scheduled maintenance | As needed | 72 hours minimum |
| Security patches (critical) | As needed | 24 hours |
| Security patches (non-critical) | Monthly release | Standard cycle |

---

# Next Steps

The following actions move CIB from proposal review to validated commercial agreement:

| Step | Purpose | Owner | Target |
|---|---|---|---|
| Proposal review and shortlisting | Evaluate technical and commercial fit | CIB Procurement | 2 weeks from submission |
| Clarification session | Address technical and commercial questions | Joint | Within 1 week of shortlist |
| Scoping workshop | Validate requirements, refine architecture and pricing | Joint | 1 to 2 days |
| Refined commercial offer | Updated pricing based on validated scope | SettleMint | 1 week after workshop |
| Contract negotiation | Finalize license, implementation, and support terms | Joint (legal and procurement) | 2 to 4 weeks |
| Contract execution and Discovery kickoff | Commence Phase 1 | Joint | Target: Q2 2026 |

SettleMint is prepared to arrange reference calls with existing banking clients to support CIB's evaluation, and to provide a guided platform demonstration tailored to CIB's specific fixed income requirements.
