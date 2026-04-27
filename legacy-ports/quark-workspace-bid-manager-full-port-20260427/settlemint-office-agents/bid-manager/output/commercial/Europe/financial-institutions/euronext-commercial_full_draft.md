# Commercial Proposal: Digital Securities Listing Platform

**Prepared for:** Euronext
**Document Title:** Commercial Proposal: Digital Securities Listing Platform
**RFP Reference:** EURONEXT-RFP-202603
**Submission Date:** March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential

---

## Table of Contents

1. Executive Summary
2. Investment Rationale
3. Licensing Model
4. Deployment Options and Pricing
5. Support and SLA Framework
6. Implementation Investment
7. Total Cost of Ownership
8. Commercial Terms
9. Reference Clients
10. Next Steps

---

## Executive Summary

Euronext's procurement for a Digital Securities Listing Platform represents a structural investment in the next generation of European capital markets infrastructure. As the EU's DLT Pilot Regime matures and MiCA-aligned instruments enter institutional workflows, Euronext faces a specific commercial decision: how to extend its listing governance, participant admission controls, and post-issuance lifecycle operations to digitally native securities without fragmenting its operating model or introducing uncontrolled vendor dependencies.

The commercial question is not whether blockchain technology can produce tokens. It is whether a platform can deliver the full listing governance workflow, from issuer admission through issuance allocation, compliance enforcement, corporate action administration, and regulatory evidence generation, within a cost structure and support model appropriate for a pan-European exchange group operating under MiFID II, DORA, and AFM/DNB oversight.

Three paths exist for Euronext. The first is internal build: assembling the listing governance engine, compliance enforcement layer, identity framework, corporate action automation, and integration infrastructure from scratch. Based on comparable programmes at European market infrastructure operators, this path typically requires EUR 15-25M over 24-36 months and carries significant execution risk, particularly in achieving production-grade compliance enforcement and operational resilience within regulatory timelines. The second is multi-vendor assembly: procuring separate systems for token issuance, compliance, identity, custody orchestration, and lifecycle management. This approach fragments accountability, multiplies integration complexity, and creates SLA gaps at exactly the control boundaries where regulators expect coherent governance. The third is platform adoption: deploying a production-proven platform that provides lifecycle coverage from instrument design through post-issuance servicing within a single governed architecture.

DALP addresses Euronext's requirements through the third path. The platform's ERC-3643 compliance engine enforces investor eligibility at the smart contract layer, not at the application tier where controls can be bypassed. Its 26-role AccessManager taxonomy maps directly to Euronext's issuer, registrar, paying-agent, and operator role segregation requirements. Its durable execution engine ensures that multi-step listing and issuance workflows complete atomically, even through infrastructure failures. And its integration architecture, built around REST APIs, TypeScript SDK, and event webhooks, connects to Euronext's existing settlement, custody, and market data infrastructure without requiring those systems to be rebuilt.

**Recommended commercial profile:**

- **License tier:** Enterprise (multi-market listing governance, multi-environment deployment, premium support)
- **Deployment:** Private cloud within Euronext-controlled EU infrastructure, with full data residency within EU jurisdiction
- **Implementation:** Fixed-price, 28-week delivery including CSD integration and parallel run
- **Support:** Premium (extended hours, DORA-aligned incident response, designated support engineer)

**Indicative 3-year investment:** EUR [CLIENT-SPECIFIC: ~5M-8.5M] total. Internal build estimate: EUR 15-25M+ over 24-36 months.

The commercial structure described in this proposal is designed for procurement, business sponsor, architecture, operations, and legal review. All pricing figures are marked [CLIENT-SPECIFIC] and will be refined through a scoping workshop based on Euronext's specific deployment requirements, integration landscape, and multi-market operating model.

---

## Investment Rationale

### Cost of Current Approach

Euronext's decision to introduce digital securities listing capabilities creates an infrastructure investment requirement regardless of which delivery path is chosen. The relevant question is not whether to invest, but which investment model delivers production capability faster, with lower execution risk, and with more predictable long-term operating economics.

**Internal build estimate: EUR 15-25M+ over 24-36 months.**

The build path for a digital securities listing platform at exchange-grade quality requires engineering investment across multiple capability domains, each of which must satisfy AFM/DNB oversight expectations and MiFID II operational requirements:

| Capability Domain | Estimated FTE | Duration | Estimated Cost |
|---|---|---|---|
| Listing governance engine (admission, approval workflows, disclosure management) | 6-8 FTE | 18-24 months | EUR 3-5M |
| ERC-3643 compliance enforcement layer | 4-6 FTE | 15-18 months | EUR 2-4M |
| Identity and participant onboarding framework | 3-5 FTE | 12-15 months | EUR 1.5-3M |
| Corporate action automation (coupons, redemptions, distributions) | 3-4 FTE | 12 months | EUR 1.5-2.5M |
| Role-based access control and operator governance | 2-3 FTE | 9-12 months | EUR 1-2M |
| Integration framework (CSD, settlement, market data, reporting) | 4-6 FTE | 15-18 months | EUR 2.5-4M |
| Observability, resilience, and DR architecture | 3-4 FTE | 12-15 months | EUR 1.5-2.5M |
| DORA/MiFID II/MiCA compliance documentation | 2-3 FTE | 9-12 months | EUR 1-1.5M |

These estimates reflect the engineering investment only. They do not include procurement overhead for selecting and managing custody providers, identity service providers, and infrastructure vendors. They do not include the cost of smart contract security audits, which typically run EUR 200,000-500,000 per engagement for custom contract development. And they do not include the operational risk of building compliance enforcement from scratch, where a design error discovered after production launch creates regulatory exposure that cannot be retroactively corrected.

The critical build risk for Euronext is not cost alone. It is the combination of timeline pressure (the DLT Pilot Regime is operational, MiCA-aligned instruments are entering the market) and the operational maturity gap between a newly built system and one with production deployment history across regulated institutions. Euronext cannot afford to discover compliance enforcement gaps, workflow edge cases, or resilience weaknesses through production incidents at a regulated exchange.

**Multi-vendor assembly risk:** The alternative to internal build is assembling capabilities from multiple specialized vendors. This approach creates three structural problems. First, integration complexity: each vendor interface requires separate design, testing, and ongoing maintenance, and the total integration cost typically exceeds the cost of any individual component. Second, accountability fragmentation: when a compliance enforcement failure occurs at the boundary between an identity provider, a token issuance platform, and a custody orchestration layer, incident resolution requires coordination across three vendor support contracts with different SLAs, escalation paths, and root-cause investigation processes. Third, governance opacity: AFM and DNB expect Euronext to demonstrate coherent control over its digital securities operations. A multi-vendor architecture makes that demonstration materially harder because control evidence must be assembled from separate systems with different audit trail formats, retention policies, and access models.

### Why DALP Changes the Economics

DALP collapses the multi-vendor, multi-integration complexity into a single governed platform layer. The economic impact is measurable across three dimensions.

**Capability consolidation.** DALP provides listing governance, compliance enforcement, identity management, corporate action automation, role-based access control, and integration infrastructure within a single platform. For Euronext, this means one vendor contract, one integration architecture, one audit trail format, and one support escalation path for the entire digital securities lifecycle. The procurement, integration, and ongoing vendor management cost of assembling these capabilities separately typically exceeds the platform license cost by a factor of three to five over a five-year horizon.

**Time-to-production.** DALP's 28-week implementation timeline for Euronext compares to 24-36 months for an internal build programme. That 12-18 month acceleration has direct commercial value: earlier market entry for digital securities listing services, faster response to issuer demand for MiCA-aligned instruments, and reduced risk of being outpaced by competing European venues.

**Operational cost profile.** After go-live, DALP's annual operating cost is the platform license plus infrastructure plus support. There is no internal engineering team maintaining custom smart contracts, no separate compliance module vendor to manage, no identity provider integration to debug independently. The operational simplification reduces the ongoing cost of running the digital securities listing capability by an estimated 50-70% compared to a multi-vendor operating model.

### ROI Framework

Euronext's return on the DALP investment operates across four value dimensions:

| Value Driver | Mechanism | Estimated Impact |
|---|---|---|
| Build cost avoidance | Platform replaces 24-36 months of custom engineering | EUR 15-25M avoided over 3 years |
| Time-to-market acceleration | 28 weeks vs. 24-36 months to production | 12-18 months earlier revenue from digital securities listing fees |
| Operational efficiency | Single platform replaces multi-vendor operating model | 50-70% reduction in ongoing digital securities operations cost |
| Compliance risk reduction | Production-proven compliance enforcement vs. untested build | Material reduction in regulatory exposure from compliance gaps |
| Multi-market reuse | Same platform configuration serves multiple Euronext markets | Marginal cost per additional market significantly lower than initial deployment |
| Revenue enablement | Fractional issuance support expands issuer base | New issuer segments accessible through lower minimum issuance thresholds |

**Payback analysis.** Based on the recommended Enterprise tier, the total DALP investment over three years is approximately EUR [CLIENT-SPECIFIC: ~5M-8.5M]. Compared to the internal build estimate of EUR 15-25M+, the platform path generates a cost avoidance of EUR 10-17M+ over the same period. When the value of 12-18 months earlier market entry is included, the total economic benefit exceeds the DALP investment within the first 12-18 months of operation.

The ROI model should be validated through a joint scoping workshop where Euronext's specific cost assumptions, volume projections, and multi-market deployment timeline are confirmed. SettleMint provides a structured ROI calculator template for this purpose.

---

## Licensing Model

### Philosophy

DALP uses a platform licensing model, not a per-transaction or per-listing fee structure. This distinction matters for Euronext's operating economics.

A listing platform that charges per issuance event, per compliance check, or per corporate action creates a cost structure that penalizes exactly the behavior Euronext wants to encourage: high-volume, high-governance digital securities operations. Every compliance verification, every coupon distribution, every investor eligibility check generates a platform event. If each event carries a fee, the cost of operating the platform grows linearly with operational discipline, creating a perverse incentive to minimize governance actions.

The annual platform subscription covers all listing operations, compliance events, corporate actions, identity verifications, and audit records generated during the license term. Euronext can scale issuance volume, add new instrument types, onboard additional issuers and participants, and increase the frequency of compliance checks without incurring incremental licensing costs. The economic model aligns with Euronext's institutional interest in maximizing the use of governance controls, not minimizing them.

### What the License Includes

A DALP platform license provides access to:

**Full lifecycle capabilities.** All five core lifecycle pillars (Issuance, Compliance, Settlement integration, Custody integration, Servicing) plus the three platform foundations (Identity and Access Management, Integration and Interoperability, Observability and Operations). These capabilities are not modules that require separate licensing; they are integral components of the platform.

**All asset classes.** Bonds, equities, funds, stablecoins, deposits, real estate, and precious metals, plus the Configurable Token for custom instrument types. Euronext can support digital securities across any asset class without additional license fees.

**All compliance module types.** All 18 compliance module types, from country restrictions and investor accreditation to supply limits, holding periods, and transfer approval workflows. These modules are configured per instrument, not licensed per module.

**Full API surface.** REST API (OpenAPI 3.1), TypeScript SDK, GraphQL (via subgraph), event webhooks, and CLI. All integration points are included in the platform license.

**Addon capabilities.** Vault management, XvP/DvP settlement, primary offerings (DAIO), airdrop distribution, fixed yield schedules, and data feeds.

**Observability stack.** Pre-built Grafana dashboards, three-pillar observability (metrics, logs, traces), and automated alerting.

**Platform updates.** All releases, security patches, and new capabilities during the license term.

### What Varies by Engagement

| Dimension | How It Is Scoped |
|---|---|
| Deployment model | Private cloud (Euronext-managed), on-premises (Kubernetes/Helm), or hybrid |
| Environment count | Number of environments (development, staging, UAT, production) |
| Network configuration | Private permissioned EVM (Hyperledger Besu), public EVM, or multi-network |
| Custody integration | Local Key Guardian, Fireblocks, DFNS, or multi-provider |
| Support tier | Standard, Premium, or Enterprise |
| Implementation services | Discovery, deployment, integration, training, and hypercare |

### Platform Tiers

| Capability | Foundation | Enterprise (Recommended) | Sovereign |
|---|---|---|---|
| Core lifecycle pillars | All 5 | All 5 | All 5 |
| Asset classes | All 7 + Configurable | All 7 + Configurable | All 7 + Configurable |
| Compliance modules | All 18 types | All 18 types | All 18 types + custom |
| Production environments | 1 | Multiple | Unlimited |
| Non-production environments | 1 | Multiple | Unlimited |
| Network support | Single | Multi-network | Multi-network, multi-region |
| Custody integration | 1 provider | Multi-provider | Full flexibility + custom |
| API access | Full | Full | Full + priority features |
| Observability | Standard | Enhanced + custom dashboards | Custom + dedicated |
| Support tier | Standard | Premium | Enterprise |
| Solution architect | Shared | Dedicated onboarding | Dedicated ongoing |
| Multi-market extension | Not included | Configurable per market | Included |
| Annual license (indicative) | EUR [CLIENT-SPECIFIC: ~400K-600K] | EUR [CLIENT-SPECIFIC: ~800K-1.2M] | EUR [CLIENT-SPECIFIC: ~1.5M-2.5M] |

**Recommended: Enterprise.** Euronext's multi-market operating model, requirement for multiple environments (development, staging, UAT, production across markets), and the need for Premium support with DORA-aligned incident response justify the Enterprise tier. The multi-market extension capability within Enterprise allows Euronext to deploy digital securities listing across additional Euronext markets (Paris, Brussels, Lisbon, Dublin, Oslo, Milan) without requiring a new license tier negotiation.

---

## Deployment Options and Pricing

### Recommended: Private Cloud (EU Region)

Euronext manages DALP deployment on Euronext-controlled cloud infrastructure within EU jurisdiction. This model provides full data residency control, alignment with DORA ICT third-party risk requirements, and integration into Euronext's existing network and security architecture.

The private cloud model uses Hyperledger Besu with IBFT 2.0 consensus on a four-node validator network, deployed within Euronext's cloud tenancy. All data, including blockchain state, application databases, identity records, and audit logs, remains within EU data centers under Euronext's operational control. SettleMint provides Helm charts, deployment automation, and ongoing platform support; Euronext retains infrastructure ownership and operational authority.

### Model Comparison

| Criterion | Private Cloud (Recommended) | On-Premises | Managed SaaS |
|---|---|---|---|
| Data residency | Euronext-controlled EU cloud | Euronext data centers | SettleMint-managed EU cloud |
| Infrastructure ownership | Euronext | Euronext | SettleMint |
| Deployment speed | 4-6 weeks | 6-10 weeks | 2-4 weeks |
| Operational overhead | Moderate (Kubernetes team required) | Higher (full infrastructure management) | Lower (SettleMint-managed) |
| Regulatory control | Full (Euronext controls all infrastructure) | Full | Shared (contractual controls) |
| Scalability | Cloud-native scaling | Capacity planning required | Elastic |
| AFM/DNB audit access | Direct infrastructure access | Direct infrastructure access | Contractual access provisions |
| DORA ICT risk alignment | Strongest (Euronext controls third-party ICT risk) | Strongest | Requires additional contractual provisions |

### Infrastructure Cost (Euronext-borne, Indicative)

| Component | Monthly Estimate |
|---|---|
| Kubernetes cluster (3-AZ, EU region) | EUR 3,500-7,000 |
| PostgreSQL Multi-AZ | EUR 1,500-3,500 |
| Besu validator nodes (4) | EUR 2,000-4,000 |
| Redis, object storage, networking | EUR 1,200-2,500 |
| DR site (secondary EU region) | EUR 2,500-4,500 |
| Observability stack (VictoriaMetrics, Loki, Tempo, Grafana) | EUR 800-1,500 |
| **Total infrastructure** | **EUR 11,500-23,000/month** |

Infrastructure costs are pass-through based on Euronext's cloud provider pricing. SettleMint does not mark up infrastructure costs. The estimates above assume a production-grade deployment with high availability, disaster recovery, and full observability. Actual costs depend on Euronext's cloud provider agreement and specific infrastructure sizing requirements.

### Cost Drivers

| Factor | Cost Impact | Explanation |
|---|---|---|
| Multi-market deployment | Upward | Additional environments and network configuration per market |
| HSM integration | Upward | Hardware security module provisioning and management |
| Complex CSD integration | Upward | Multiple CSD interfaces with different protocols |
| Extended parallel run | Upward | Longer parallel operation with legacy systems |
| Multi-year commitment | Downward | License pricing consideration for 3+ year terms |
| Cloud-managed deployment | Downward | Reduced infrastructure management overhead |
| Standardized integration patterns | Downward | Use of pre-built integration adapters reduces custom work |

---

## Support and SLA Framework

### Premium Support (Recommended)

| Capability | Standard | Premium (Recommended) | Enterprise |
|---|---|---|---|
| Coverage hours | 09:00-18:00 CET M-F | 07:00-22:00 CET M-F; P1 on-call weekends | 24/7/365 |
| P1 response | 4 hours | 1 hour | 15 minutes |
| P1 resolution target | 8 hours | 4 hours | 2 hours |
| P2 response | 8 hours | 4 hours | 1 hour |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Support channels | Portal, email | Portal, email, dedicated Slack/Teams, phone | All channels + video escalation |
| Designated engineer | Shared | Named engineer | Named team |
| Business reviews | Quarterly | Monthly | Bi-weekly |
| Platform updates | Quarterly releases | Monthly releases + early access | Continuous delivery + preview |
| DORA incident alignment | Standard | Enhanced (4-hour P1 notification) | Full (regulatory timeline alignment) |

### Severity Definitions

| Level | Definition | Response | Resolution Target |
|---|---|---|---|
| P1 Critical | Production down; listing operations blocked; compliance enforcement unavailable | 1 hour | 4 hours |
| P2 High | Major function impaired; listing operations continue with workaround | 4 hours | 24 hours |
| P3 Medium | Minor functionality impacted; workaround available | 8 hours | 5 business days |
| P4 Low | Cosmetic issues, documentation requests, feature inquiries | Next business day | 10 business days |

### DORA Alignment

SettleMint's support model aligns with DORA requirements applicable to Euronext:

- P1 incident notification to Euronext within contractual timeline (target: 4 hours) for downstream regulatory notification
- Third-party ICT risk documentation and evidence available on request
- Business continuity evidence for SettleMint's own operations
- Contractual provisions for AFM/DNB supervisory access and audit rights
- Support for Euronext's resilience testing programme, including scenario-based testing of platform recovery
- Regular vulnerability disclosure and remediation tracking

### Escalation Path

| Level | Trigger | SettleMint Contact | Target Response |
|---|---|---|---|
| Level 1 | Initial ticket | Designated support engineer | Per severity SLA |
| Level 2 | SLA breach risk or complexity escalation | Engineering lead | 30 minutes |
| Level 3 | P1 exceeding resolution target | VP Engineering | 15 minutes |
| Level 4 | Systemic issue or regulatory impact | CTO | Immediate |

### Maintenance Windows

Planned maintenance is scheduled during low-activity periods with minimum 5 business days advance notice. Emergency security patches follow an expedited notification process (minimum 4 hours notice for critical vulnerabilities). All maintenance activities are documented, and evidence of successful completion is provided to Euronext's operations team.

---

## Implementation Investment

### Methodology

DALP implementation for Euronext follows a structured, phase-gated delivery methodology. Each phase concludes with a formal gate review requiring sign-off from both SettleMint and Euronext stakeholders. Progression requires documented acceptance of deliverables against defined criteria.

The 28-week timeline extends the standard 19-week DALP implementation to accommodate Euronext's specific requirements: multi-market governance approval cycles, CSD integration complexity, enhanced parallel run requirements, and the formal operational readiness evidence that AFM/DNB oversight expectations demand.

### Phase Summary

| Phase | Duration | Objective | Key Deliverables | Investment |
|---|---|---|---|---|
| 1. Discovery and Architecture | 3 weeks | Align DALP to Euronext's listing governance, integration landscape, and regulatory context | Solution architecture, integration specification, compliance mapping, project plan | EUR [CLIENT-SPECIFIC: ~150K-240K] |
| 2. Foundation and Deployment | 4 weeks | Deploy DALP infrastructure and configure environments | Deployed environments (dev, staging, UAT, production), Besu network, custody integration, IAM setup | EUR [CLIENT-SPECIFIC: ~180K-320K] |
| 3. Configuration and Compliance | 5 weeks | Configure listing governance, compliance modules, asset templates, and operational workflows | Configured compliance policies, asset templates, role assignments, approval workflows, listing rules | EUR [CLIENT-SPECIFIC: ~250K-400K] |
| 4. Integration and Testing | 9 weeks | Connect to Euronext systems and validate end-to-end workflows | CSD integration, market data interfaces, settlement connectivity, regulatory reporting, full test execution | EUR [CLIENT-SPECIFIC: ~380K-600K] |
| 5. Production and Parallel Run | 4 weeks | Launch production with controlled rollout and parallel operation | Production deployment, parallel run with reconciliation, operational acceptance | EUR [CLIENT-SPECIFIC: ~170K-260K] |
| 6. Hypercare | 3 weeks | Stabilize production operations and complete knowledge transfer | Hypercare support, runbook delivery, training completion, support transition | EUR [CLIENT-SPECIFIC: ~100K-180K] |
| **Total** | **28 weeks** | | | **EUR [CLIENT-SPECIFIC: ~1.2M-2.0M]** |

### Phase Detail

**Phase 1: Discovery and Architecture (Weeks 1-3).** Structured workshops with Euronext's business, technology, compliance, risk, and operations stakeholders. Current-state assessment of existing listing infrastructure, CSD connectivity, market data systems, and regulatory reporting pipelines. Regulatory mapping against MiFID II, DORA, MiCA, GDPR, and AMLD requirements. Architecture design covering deployment topology, network selection, custody model, and integration patterns for each Euronext market in scope.

**Phase 2: Foundation and Deployment (Weeks 4-7).** Infrastructure provisioning on Euronext's cloud platform. Hyperledger Besu network deployment with IBFT 2.0 consensus. Environment setup across development, staging, UAT, and production. Initial custody integration and key management configuration. Identity and access management framework deployment with Euronext's directory integration. Observability stack activation.

**Phase 3: Configuration and Compliance (Weeks 8-12).** Listing governance workflow configuration: issuer admission, disclosure capture, approval chains, instrument activation controls. Compliance module deployment: investor category restrictions, jurisdiction controls, transfer approval requirements, holding period enforcement. Asset template configuration for initial instrument types. Role assignment and operator permission structure aligned to Euronext's operational model.

**Phase 4: Integration and Testing (Weeks 13-21).** CSD interface integration for settlement connectivity. Market data publication interface. Regulatory reporting data extraction and format mapping. End-to-end testing across listing, issuance, compliance, transfer, corporate action, and reporting workflows. Performance testing under representative and stress load profiles. Security testing including penetration testing with remediation. UAT with Euronext business stakeholders.

**Phase 5: Production and Parallel Run (Weeks 22-25).** Production cutover with rollback plan. Parallel run with existing listing processes to validate operational consistency. Reconciliation reporting between DALP and legacy systems. Operational acceptance testing.

**Phase 6: Hypercare (Weeks 26-28).** Dedicated hypercare team with 2-hour P1 response. Performance optimization based on production telemetry. Runbook delivery and validation. Training completion for all operational roles. Formal transition to BAU support.

### Accelerators

Several factors reduce implementation timeline and cost for Euronext:

- **Pre-built compliance templates:** MiCA, MiFID II, and Prospectus Regulation compliance module configurations available as starting templates
- **Asset class templates:** Seven pre-configured asset class templates with production-proven lifecycle logic
- **Reference architectures:** Documented deployment patterns for exchange and market infrastructure operators
- **SDK and CLI:** 301 CLI commands and TypeScript SDK enable rapid integration development
- **Sandbox environments:** Pre-configured development environments for integration testing

### Euronext Dependencies

| Dependency | Required By | Impact If Delayed |
|---|---|---|
| Cloud infrastructure provisioning | Phase 2 start | 1:1 delay to deployment |
| CSD integration specifications and test access | Phase 4 start | Integration timeline extends |
| Regulatory and compliance sign-off on configuration | Phase 3 completion | Cannot proceed to testing |
| UAT stakeholder availability | Phase 4 (weeks 18-21) | Acceptance gate delayed |
| Production go-live authorization | Phase 5 start | Production deployment delayed |
| Security review and penetration test scheduling | Phase 4 (weeks 15-18) | Testing completion delayed |

---

## Total Cost of Ownership

### TCO Framework

The total cost of ownership for Euronext's digital securities listing capability must be evaluated against the realistic cost of alternatives, not just the DALP license fee in isolation. The correct comparison is DALP's total cost versus the total cost of assembling and operating equivalent capabilities through internal build or multi-vendor procurement.

DALP's TCO includes four cost categories: platform license, implementation services, ongoing support and maintenance, and infrastructure. All four are transparent, predictable, and scoped at engagement outset.

### Three-Year Model

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform license (Enterprise) | EUR [CLIENT-SPECIFIC: ~1.0M] | EUR [CLIENT-SPECIFIC: ~1.0M] | EUR [CLIENT-SPECIFIC: ~1.0M] | EUR [CLIENT-SPECIFIC: ~3.0M] |
| Implementation services | EUR [CLIENT-SPECIFIC: ~1.6M] | 0 | 0 | EUR [CLIENT-SPECIFIC: ~1.6M] |
| Support and maintenance (Premium) | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~900K] |
| Infrastructure (Euronext-borne) | EUR [CLIENT-SPECIFIC: ~200K] | EUR [CLIENT-SPECIFIC: ~250K] | EUR [CLIENT-SPECIFIC: ~250K] | EUR [CLIENT-SPECIFIC: ~700K] |
| **Annual Total** | **EUR [CLIENT-SPECIFIC: ~3.1M]** | **EUR [CLIENT-SPECIFIC: ~1.55M]** | **EUR [CLIENT-SPECIFIC: ~1.55M]** | **EUR [CLIENT-SPECIFIC: ~6.2M]** |

Year 1 includes the one-time implementation investment. Years 2 and 3 reflect steady-state operating costs: license renewal, support, and infrastructure. No additional implementation cost is assumed unless Euronext extends to additional markets or asset classes.

### Five-Year Model

| Year | License | Implementation | Support | Infrastructure | Total |
|---|---|---|---|---|---|
| Year 1 | EUR [CLIENT-SPECIFIC: ~1.0M] | EUR [CLIENT-SPECIFIC: ~1.6M] | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~200K] | EUR [CLIENT-SPECIFIC: ~3.1M] |
| Year 2 | EUR [CLIENT-SPECIFIC: ~1.0M] | 0 | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~250K] | EUR [CLIENT-SPECIFIC: ~1.55M] |
| Year 3 | EUR [CLIENT-SPECIFIC: ~1.0M] | 0 | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~250K] | EUR [CLIENT-SPECIFIC: ~1.55M] |
| Year 4 | EUR [CLIENT-SPECIFIC: ~1.0M] | 0 | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~280K] | EUR [CLIENT-SPECIFIC: ~1.58M] |
| Year 5 | EUR [CLIENT-SPECIFIC: ~1.0M] | 0 | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~280K] | EUR [CLIENT-SPECIFIC: ~1.58M] |
| **5-Year Total** | **EUR [CLIENT-SPECIFIC: ~5.0M]** | **EUR [CLIENT-SPECIFIC: ~1.6M]** | **EUR [CLIENT-SPECIFIC: ~1.5M]** | **EUR [CLIENT-SPECIFIC: ~1.26M]** | **EUR [CLIENT-SPECIFIC: ~9.36M]** |

Years 4 and 5 reflect stable operating costs with modest infrastructure growth to accommodate increased issuance volume and additional instrument types. If Euronext extends digital securities listing to additional markets during this period, the marginal cost per additional market is significantly lower than the initial deployment because the platform, compliance configuration, and integration patterns are reusable.

### Comparative Analysis: DALP vs. Build vs. Multi-Vendor

| Criterion | DALP (Enterprise) | Internal Build | Multi-Vendor Assembly |
|---|---|---|---|
| 3-year total cost | EUR ~6.2M | EUR 15-25M+ | EUR 10-18M+ |
| 5-year total cost | EUR ~9.4M | EUR 20-35M+ | EUR 16-28M+ |
| Time to production | 28 weeks | 24-36 months | 18-30 months |
| Compliance enforcement maturity at launch | Production-proven (ERC-3643) | Untested | Varies by vendor |
| Integration complexity | Single platform, one API surface | Custom-built | 3-5 vendor interfaces |
| Vendor accountability | Single vendor | Internal teams | Fragmented across vendors |
| Multi-market extension cost | Marginal (configuration) | Near-full rebuild per market | Vendor re-negotiation per market |
| Ongoing engineering requirement | Minimal (SettleMint-managed updates) | 4-8 FTE permanent team | 2-4 FTE + vendor coordination |
| AFM/DNB audit evidence | Unified audit trail | Must be assembled | Must be assembled across vendors |

The internal build path carries the highest total cost and longest timeline, but its primary risk is not financial. It is operational: the probability of delivering production-grade compliance enforcement, operational resilience, and multi-market governance within a timeline that matches regulatory and competitive pressure is significantly lower than the platform path. The multi-vendor path is faster than full build but introduces governance complexity that grows over time as vendor roadmaps diverge and integration interfaces require maintenance.

---

## Commercial Terms

### Contract Structure

| Component | Type | Term |
|---|---|---|
| Platform License Agreement | Annual subscription | 3-year initial term with renewal option |
| Implementation Services Agreement | Fixed-price | Milestone-based delivery per phase |
| Support and Maintenance Agreement | Annual | Co-terminus with platform license |
| Multi-Market Extension Addendum | Per-market scope | As activated per Euronext market |

### Payment Schedule

**Implementation services:** Milestone-based payments aligned to phase gate acceptance.

| Milestone | Payment | Trigger |
|---|---|---|
| Contract signature | 20% | Signed agreement |
| Phase 1 completion (Discovery) | 15% | Architecture document accepted |
| Phase 2 completion (Foundation) | 15% | Environments deployed and validated |
| Phase 3 completion (Configuration) | 15% | Compliance and listing configuration accepted |
| Phase 4 completion (Integration and Testing) | 20% | UAT signed off |
| Phase 5 completion (Production) | 10% | Production go-live and parallel run acceptance |
| Phase 6 completion (Hypercare) | 5% | Support transition completed |

**Platform license:** Annual in advance, invoiced at contract signature for Year 1 and on each anniversary thereafter.

**Support and maintenance:** Annual in advance, co-terminus with platform license.

### Duration and Renewal

The initial license term is three years from contract signature. Renewal is available at the then-current pricing with minimum 90 days advance notice. Multi-year renewal commitments receive preferential pricing consideration.

### Multi-Market Extension

The Enterprise tier includes a pre-negotiated extension path for additional Euronext markets. Each market extension is scoped and priced as an addendum covering environment provisioning, market-specific compliance configuration, CSD integration, and testing. Extension pricing reflects the reduced marginal effort of deploying to an additional market on an established platform.

### Intellectual Property and Data

**Platform IP:** DALP platform intellectual property, including source code, smart contracts, and architectural designs, remains the property of SettleMint NV.

**Client data:** All listing records, participant data, compliance records, transaction history, and operational data belong to Euronext. SettleMint has no ownership claim on any data processed through the platform.

**Integration work:** Integration adapters and configurations developed during implementation are delivered to Euronext. CSD integration adapters become Euronext property on acceptance.

**Configurations:** All compliance configurations, asset templates, role definitions, and workflow rules configured for Euronext are Euronext property.

### Liability and Indemnification

Liability is capped at the annual license fee for the year in which the claim arises, with standard exclusions for indirect, consequential, and punitive damages. SettleMint provides professional indemnity insurance and cyber risk insurance appropriate to the engagement scope. Specific liability terms, including any carve-outs for willful misconduct or gross negligence, will be negotiated during contracting.

### Confidentiality

Mutual confidentiality obligations apply for the term of the agreement plus five years. Standard exceptions for publicly available information, independently developed information, and legally compelled disclosure apply. Euronext's regulatory disclosure obligations to AFM, DNB, and other competent authorities are explicitly preserved.

### Source Code Escrow

SettleMint offers source code escrow arrangements through a recognized escrow agent. Release conditions typically include material breach not cured within the specified cure period, insolvency, and cessation of product support. Escrow terms are negotiated separately.

### Exit and Transition Assistance

**Transition period:** 90 days from termination notice.

**Data export:** Full export of all Euronext data in standard formats (JSON, CSV, database dumps). On-chain state on Euronext's Besu network remains accessible to Euronext independently of SettleMint platform access.

**Knowledge transfer:** Documentation of all configurations, integration specifications, and operational procedures.

**Audit record preservation:** All records required for regulatory retention (minimum 5 years for MiFID II record-keeping, 7 years for certain categories) are preserved and accessible through the transition period.

---

## Reference Clients

| Client | Geography | Use Case | Scale | Relevance to Euronext |
|---|---|---|---|---|
| Deutsche Borse | Germany | Regulated digital asset trading venue | Exchange/FMI | Most comparable: regulated exchange; BaFin oversight; MiCA alignment |
| Clearstream | Luxembourg | Tokenized collateral management | International CSD | Post-trade infrastructure; CSDR alignment; XvP settlement |
| Bank of England | UK | Wholesale CBDC pilot infrastructure | Central bank FMI | Settlement architecture; operational resilience; FMI governance |
| Eurex | Germany | Tokenized derivatives clearing | CCP | Clearing and settlement; regulated derivative instruments |
| JSE | South Africa | Digital asset trading and settlement | Exchange/CSD | Exchange-level deployment; DvP settlement; market operations |

**Key case study: Deutsche Borse**

Deutsche Borse's regulated digital asset trading venue is the closest comparable deployment to Euronext's requirements. The programme deployed listing governance, participant admission controls, compliance enforcement, and post-trade integration at exchange-grade operational quality under BaFin regulatory oversight. The platform supports configurable market models, instrument lifecycle management, and real-time surveillance data feeds. Implementation followed a structured phase-gated methodology with parallel run validation against existing systems. Settlement finality and compliance enforcement were the non-negotiable design constraints, mirroring Euronext's requirements directly.

**Key case study: Clearstream**

Clearstream's tokenized collateral programme demonstrates DALP's capability at international CSD scale. The deployment includes XvP atomic settlement, on-chain eligibility enforcement, CSDR/DORA alignment, and real-time position management. The programme validates DALP's ability to operate within the post-trade infrastructure ecosystem that Euronext's digital securities listing platform must integrate with.

---

## Next Steps

| Step | Timing | Purpose | Euronext Participants |
|---|---|---|---|
| Commercial Q and A | Within 2 weeks of proposal | Clarify commercial terms and pricing assumptions | Procurement, Finance |
| Scoping workshop | Weeks 2-3 | Confirm multi-market scope, integration landscape, and deployment requirements | Business, Technology, Operations |
| Architecture deep-dive | Weeks 3-4 | Validate deployment model, CSD integration design, and security architecture | Architecture, Security, Operations |
| AFM/DNB regulatory alignment session | Weeks 3-4 | Review DORA compliance approach and supervisory access model | Compliance, Legal, Risk |
| Technical due diligence | Weeks 4-6 | Platform capability validation against Euronext requirements | Technology, Security, Architecture |
| Firm commercial proposal | Weeks 5-7 | Finalized pricing based on scoping workshop outputs | Procurement, Finance, Legal |
| Multi-market extension discussion | Weeks 6-8 | Scope and timeline for additional Euronext markets | Business, Technology |
| Contract negotiation | Weeks 8-12 | Finalize all agreement terms | Legal, Procurement |

---

*Document Classification: SettleMint Confidential*
*Version 1.0 Draft, March 2026*
