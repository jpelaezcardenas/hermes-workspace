---
title: "Commercial Proposal: Digital Securities Marketplace and Lifecycle Administration"
client: "ADX Abu Dhabi Securities Exchange"
date: "2026-03-19"
version: "1.0"
confidentiality: "Restricted. Commercial-Sensitive"
prepared-by: "SettleMint NV"
document-type: "Commercial Proposal"
rfp-reference: "ADX-ABU-DHABI-SECURITIES-EXCHANGE-RFP-DIGITAL-SECURITIES-MARKETPLACE-202603"
---

# Commercial Proposal

## Digital Securities Marketplace and Lifecycle Administration

---

**Document Title:** Commercial Proposal. Digital Securities Marketplace and Lifecycle Administration

**Client:** ADX Abu Dhabi Securities Exchange

**Submission Date:** 2026-03-19

**Version:** 1.0

**Confidentiality:** Restricted. Commercial-Sensitive

**Prepared by:** SettleMint NV

---

> This document contains confidential and proprietary information of SettleMint NV. Distribution or reproduction without prior written consent is prohibited.

---

# Table of Contents

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

# 1. Executive Summary

## 1.1 Commercial Decision Summary

ADX Abu Dhabi Securities Exchange is making a platform infrastructure decision that will shape its digital securities operating model for the next five to ten years. The procurement is not for a point solution or a pilot; it is for a production-grade digital asset lifecycle platform that must integrate with CSD infrastructure, regulatory reporting frameworks, broker connectivity, and market surveillance systems, and operate under the continuous audit and supervisory scrutiny that a national exchange operator must withstand.

The commercial decision has three dimensions. First, build versus platform: the cost of assembling a bespoke digital securities platform in-house or through a collection of specialist vendors is substantially higher than licensing a purpose-built platform. Second, platform selection: not all platforms can operate at institutional scale with the governance, evidence, and operational maturity that ADX requires. Third, implementation realism: the total cost of ownership depends not only on licence fees but on implementation effort, integration complexity, ongoing support, and the cost of operational risk if the platform fails to meet regulatory evidence requirements.

SettleMint recommends the DALP Enterprise tier on a private cloud deployment model within UAE, with Enterprise-level 24/7 support. The total investment over three years is summarized below. Detailed breakdowns follow in subsequent sections.

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|--------------|--------|--------|--------|-------------|
| Platform Licence (Enterprise Tier) | $480,000 | $480,000 | $480,000 | $1,440,000 |
| Implementation Services | $320,000 | - |, | $320,000 |
| Infrastructure (Private Cloud, UAE) | $96,000 | $96,000 | $96,000 | $288,000 |
| Support (Enterprise Tier) | $144,000 | $144,000 | $144,000 | $432,000 |
| Training | $24,000 | - | $12,000 | $36,000 |
| **Total** | **$1,064,000** | **$720,000** | **$732,000** | **$2,516,000** |

> All figures are indicative USD amounts subject to final commercial agreement. Figures assume private cloud deployment, Enterprise support tier, and scope as defined in the accompanying technical proposal. Pricing is valid for 90 days from submission date.

## 1.2 Why Platform Economics Win

Assembling equivalent capability from specialist vendors, token issuance platform, compliance engine, identity management layer, settlement integration layer, audit evidence system, requires not only multiple licence agreements but a permanent integration and governance overhead. SettleMint's production evidence from comparable deployments shows that multi-vendor assembled stacks require two to three times the ongoing integration maintenance effort of a unified platform, in addition to higher initial implementation costs.

DALP provides a unified platform that covers the entire lifecycle from issuance through maturity. The licence includes bond and equity asset types, twelve compliance modules, eleven token features, the complete API surface, observability tooling, and the operational evidence capabilities required for regulated market infrastructure. ADX pays a single licence that covers all of these capabilities; there is no per-transaction fee and no per-compliance-check charge.

## 1.3 Commercial Recommendation

SettleMint recommends:
- **Licence tier:** Enterprise
- **Deployment model:** Private cloud, UAE region (Azure UAE North recommended)
- **Support tier:** Enterprise 24/7
- **Contract structure:** 3-year initial term with annual renewal option
- **Payment model:** Annual licence in advance, implementation milestone-based, support annually in advance

---

# 2. Investment Rationale

## 2.1 Cost of Current Approach

ADX is at the early stage of its digital securities marketplace capability. The relevant cost of the current approach is therefore the cost of not having this capability, plus the build cost if ADX were to attempt to assemble it independently.

**Cost of delayed market position:** The UAE capital markets ecosystem is moving. ADGM has established its digital asset regulatory framework. SCA is advancing tokenization guidance. Competitor exchanges in the Gulf region are investing in digital securities infrastructure. Each quarter of delay represents lost first-mover positioning and potential issuer relationships.

**Build cost estimate:** Assembling a comparable capability through internal development would require:
- Smart contract development team (5-6 engineers, 18-24 months): $900,000-$1,200,000
- Compliance module development and legal review: $200,000-$350,000
- Identity management layer: $150,000-$250,000
- API development and documentation: $200,000-$300,000
- Integration architecture (CSD, AML, surveillance): $300,000-$450,000
- Security audit and penetration testing: $100,000-$200,000
- Estimated total build cost: $1,850,000-$2,750,000 before production infrastructure and ongoing maintenance

**Ongoing maintenance cost:** An internally built platform requires a permanent maintenance team (3-4 engineers) plus periodic security audit and compliance update costs. Estimated annual maintenance: $600,000-$900,000.

**Multi-vendor assembly alternative:** Licensing separate platforms for token issuance, compliance, identity, and settlement integration would require: integration architecture management (ongoing), multiple vendor relationships, contract management overhead, and an integration maintenance team. Estimated additional integration overhead vs unified platform: $200,000-$400,000 per year.

## 2.2 Why DALP Changes Economics

DALP's platform economics change the investment profile in three ways:

**Capability bundling:** All lifecycle capabilities, issuance, compliance, identity, settlement, servicing, audit evidence, are included in the platform licence. There is no separate charge for compliance module usage, identity claim verification, or settlement instruction generation.

**Reuse across instruments and asset classes:** Once the platform is deployed and integrated, adding new instrument types (new bond series, equity instruments, future asset classes) has marginal additional cost. The compliance framework, integration architecture, and operational infrastructure are reused.

**Operational efficiency:** DALP's native operations tooling, exception queues, reconciliation dashboards, audit evidence export, replaces manual operational processes that would otherwise require dedicated headcount. Based on comparable production deployments at regulated financial institutions (including exchange-operator and bank deployments in Europe and Asia), operations teams handling similar volumes achieve 40-60% reduction in manual exception processing time compared to non-platform approaches. This figure reflects the automation of compliance check routing, exception queue management, and audit evidence assembly, activities that are otherwise manual in assembled or custom-built stacks.

## 2.3 ROI Framework

| Value Driver | Baseline (Without Platform) | DALP-Enabled | Estimated Annual Impact |
|-------------|--------------------------|-------------|------------------------|
| Build cost avoidance | $2.0M+ internal build | Platform licence | $600,000+ year 1 avoidance |
| Maintenance efficiency | 3-4 FTE maintenance team | Included in licence | $400,000-$600,000 annual avoidance |
| Operations efficiency | Manual exception processing | Automated workflows | $150,000-$250,000 annual savings |
| Revenue enablement | No digital securities capability | Live marketplace | New issuer revenue (ADX-specific) |
| Regulatory risk reduction | Manual evidence assembly | Automated audit packs | Audit cost reduction + risk premium |

> Payback period: Based on build-cost avoidance alone, the platform investment is recovered within the first 18 months. Operational efficiency gains continue to compound through the platform lifetime.

---

# 3. Licensing Model

## 3.1 Philosophy

DALP is licensed as a platform, not as a transaction service. The economic principle is that ADX should not face escalating costs as the digital securities marketplace grows in volume, participant count, or instrument breadth. Per-transaction or per-compliance-check pricing would create a cost model that penalizes success and makes financial planning difficult for a market operator.

The annual platform licence covers:
- All asset types (bonds, equities, funds, deposits, stablecoins, real estate, precious metals)
- All compliance modules (twelve module types)
- All token features (eleven feature types)
- Complete API access (OpenAPI 3.1, TypeScript SDK, webhooks)
- Operations dashboards and audit evidence tools
- Observability tooling (metrics, logging, tracing)
- Platform updates and security patches

## 3.2 What's Included in Platform Licence

| Capability Family | Included Items |
|------------------|---------------|
| Asset types | Bond, Equity, Fund, Deposit, Stablecoin, Real Estate, Precious Metal |
| Compliance modules | Identity verification, country allow/block lists, investor count limit, time lock, transfer approval, supply cap, collateral requirement |
| Token features | Historical balances, voting power, permit, AUM fee, maturity redemption, fixed treasury yield, transaction fee variants, conversion |
| Addons | XvP Settlement, Yield/Distribution, Airdrop (push, merkle-drop, vesting), Vault, Token Sale |
| API access | OpenAPI 3.1 gateway, TypeScript SDK, webhook event streaming |
| Operations | Asset Console, Operations Dashboard, Admin Portal |
| Observability | Prometheus metrics, OpenTelemetry tracing, structured logging |
| Updates | All platform updates within licence tier |

## 3.3 What Varies by Engagement

| Dimension | Variable | Scope for ADX |
|-----------|---------|--------------|
| Deployment model | Managed SaaS vs Private Cloud vs On-Premises | Private Cloud. UAE region |
| Environment count | Dev/Test/UAT/Production included; additional environments extra | 4 environments standard |
| Blockchain network | Network setup and node infrastructure | Hyperledger Besu, 4 validators |
| Custody integration | Tier 2 included; Tier 3 (client HSM) scoped separately | To be confirmed in Phase 1 |
| Support tier | Standard / Premium / Enterprise | Enterprise recommended |
| Implementation | Phase-gated professional services | 18-week plan, see Section 6 |
| Training | Core tracks included; extended training scoped separately | 4 tracks included |

## 3.4 Platform Tiers

| Feature | Foundation | Enterprise (Recommended) | Sovereign |
|---------|-----------|--------------------------|-----------|
| Asset types | All | All | All |
| Environments | 2 (Test + Production) | 4 (Dev/Test/UAT/Production) | Unlimited |
| Multi-entity support | Single entity | Multiple entities | Full multi-entity/jurisdiction |
| HSM/Custody options | Cloud KMS | Managed HSM or Client HSM | Full client-controlled custody |
| SLA | 99.5% | 99.9% | 99.95% |
| Support | Standard | Enterprise 24/7 | Dedicated team |
| Regulatory template library | Standard | Full | Full + custom |
| Annual licence (indicative) | $240,000 | $480,000 | $720,000+ |

**Recommended tier for ADX:** Enterprise. Rationale: ADX requires four segregated environments, multi-entity support for different instrument types and investor classes, production 99.9% SLA, and 24/7 support coverage appropriate for market infrastructure. The Sovereign tier would be appropriate if ADX expands to multi-jurisdiction deployment or requires dedicated team arrangements.

---

# 4. Deployment Options and Pricing

## 4.1 Model Overview

| Model | Infra Ownership | Data Residency | Time-to-Deploy | Indicative Infra Cost (Annual) |
|-------|----------------|----------------|----------------|-------------------------------|
| Managed SaaS | SettleMint | SettleMint regions | 1-2 weeks | Included in licence |
| Private Cloud (Recommended) | Client cloud account | Client-specified region | 4-6 weeks | $80,000-$120,000 |
| On-Premises | ADX datacentre | ADX full control | 8-12 weeks | ADX-borne hardware cost |
| Hybrid | Mixed | Configurable | 6-8 weeks | $60,000-$100,000 (cloud component) |

## 4.2 Recommended: Private Cloud: UAE Region

For ADX's digital securities marketplace, private cloud deployment within UAE is recommended. Infrastructure is provisioned within ADX's own cloud account (Azure or AWS), ensuring:
- All data remains within UAE territorial boundaries (CBUAE/ADGM compliance)
- ADX controls cloud account credentials and access policies
- SettleMint manages the platform software layer; ADX owns the infrastructure layer
- Full audit access to infrastructure logs and security events

Indicative annual infrastructure cost: $96,000. Basis: 4 Besu validator nodes (Azure Standard_D4s_v3), 2 application tier instances (Standard_D8s_v3), PostgreSQL Flexible Server (General Purpose, 8 vCores), Redis Cache (Standard C2), Azure Key Vault, Azure Monitor, and object storage, all in UAE North region. DR standby infrastructure (reduced spec, secondary region) is included in this estimate. Actual cost varies with transaction volume, additional environments beyond four, and redundancy tier selection.

## 4.3 Cost Structure

| Cost Category | Type | Year 1 | Year 2 | Year 3 | Notes |
|--------------|------|--------|--------|--------|-------|
| Platform Licence (Enterprise) | Recurring | $480,000 | $480,000 | $480,000 | Annual, in advance |
| Implementation Services | One-time | $320,000 | - |, | Milestone-based |
| Infrastructure (Private Cloud) | Recurring | $96,000 | $96,000 | $96,000 | ADX cloud account |
| Enterprise Support | Recurring | $144,000 | $144,000 | $144,000 | Annual, in advance |
| Training (Core + Refresh) | One-time / periodic | $24,000 | - | $12,000 | Core tracks Year 1 |
| **Total** | | **$1,064,000** | **$720,000** | **$732,000** | |

## 4.4 Cost Drivers

| Driver | Cost Impact | Notes |
|--------|-----------|-------|
| Additional environments beyond 4 | +$20,000-$40,000/environment/year | UAT and staging environments |
| HSM commissioning (Tier 3, ADX-owned HSM) | +$30,000-$60,000 one-time | Key ceremony and integration |
| Custom AML provider integration (non-standard API) | +$20,000-$50,000 one-time | Standard REST integration included |
| FIX protocol adapter for broker connectivity | +$25,000-$50,000 one-time | Standard OpenAPI included |
| Multi-year discount (3-year committed term) | -10% on platform licence fees only (not support or infrastructure) | Commitment required at contract signing |
| Sovereign tier upgrade | +$240,000/year vs Enterprise | If multi-jurisdiction expansion required |

---

# 5. Support and SLA Framework

## 5.1 Support Tiers

| Feature | Standard | Premium | Enterprise (Recommended) |
|---------|---------|---------|--------------------------|
| Coverage | Business hours (09-17 CET) | Extended (07-22 CET) | 24/7/365 |
| P1 initial response | 4 hours | 2 hours | 1 hour |
| P1 resolution target | 8 hours | 4 hours | 4 hours or workaround |
| Channels | Email + portal | Email + portal + phone | All + dedicated Slack |
| Named CSM | No | No | Yes |
| Named technical lead | No | No | Yes |
| Monthly service review | No | Quarterly | Monthly |
| Annual licence (indicative) | $72,000 | $108,000 | $144,000 |

**Recommendation for ADX:** Enterprise Support. A digital securities marketplace is market infrastructure. P1 incidents, platform unavailable, settlement processing blocked, require 1-hour initial response with dedicated technical ownership. Named CSM and technical lead provide continuity across the engagement, including during incident response.

## 5.2 Severity Levels

| Severity | Definition | Examples |
|----------|-----------|---------|
| P1: Critical | Production platform unavailable or settlement processing blocked | Platform down, database unreachable, settlement queue frozen |
| P2: High | Major functionality impaired; operational workaround available | Compliance check delays, reporting unavailable, API latency spike |
| P3: Medium | Non-critical functionality affected; no operational impact | UI performance degradation, non-critical alert, integration latency |
| P4: Low | Minor issues; informational; feature requests | Documentation request, enhancement suggestion, cosmetic issue |

## 5.3 Uptime SLA

| Environment | Uptime Target | Max Monthly Downtime | Measurement |
|-------------|--------------|---------------------|-------------|
| Production | 99.9% | 43 minutes/month | Calendar month, excluding approved maintenance windows |
| UAT | 99.5% | 3.6 hours/month | Calendar month |
| Test/Dev | Best effort | - |, |

Service credits are available for production SLA breaches below 99.9%, structured as:
- 99.5%-99.9%: 10% monthly support fee credit
- 99.0%-99.5%: 25% monthly support fee credit
- Below 99.0%: 50% monthly support fee credit

## 5.4 Escalation Path

Level 1: Support Portal / Dedicated Slack (automated triage, initial acknowledgment)
→ Level 2: SettleMint L2 Engineering (technical diagnosis, workaround identification)
→ Level 3: SettleMint Senior Engineering / Platform Lead (complex issue resolution)
→ Level 4: SettleMint CTO / Executive escalation (P1 extended duration, regulatory implications)

Client-initiated escalation to named CSM is available at any point for P1/P2 incidents.

## 5.5 Maintenance Policy

| Activity | Frequency | Notice Period | Window |
|----------|-----------|--------------|--------|
| Scheduled maintenance | Monthly | 7 calendar days | Agreed low-traffic window |
| Minor updates (patches) | As needed | 48 hours | Agreed maintenance window |
| Major version releases | Annually (minimum) | 12 months advance notice | Coordinated rollout |
| Emergency security patches | As needed | Best effort (24h target) | Immediate deployment |

---

# 6. Implementation Investment

## 6.1 Methodology

Implementation follows SettleMint's phase-gated methodology across six phases over 18 weeks. Each phase has defined deliverables, acceptance criteria, and a formal gate review before the next phase begins. Implementation pricing is milestone-based: each milestone invoice is triggered by ADX's written acceptance of the phase gate.

## 6.2 Phase Summary and Pricing

| Phase | Duration | Key Deliverables | Investment |
|-------|---------|-----------------|-----------|
| Phase 1: Discovery | 2 weeks | Requirements baseline, delivery plan, RAID register | $32,000 |
| Phase 2: Foundation | 3 weeks | 4 environments provisioned and validated, security baseline | $48,000 |
| Phase 3: Configuration | 4 weeks | Instrument types configured, compliance modules bound, governance workflows active | $80,000 |
| Phase 4: Integration | 4 weeks | CSD, AML, broker, surveillance integrations tested and validated | $96,000 |
| Phase 5: Go-Live | 3 weeks | UAT completed, production go-live, initial operations confirmed | $48,000 |
| Phase 6: Hypercare | 2 weeks | Stabilized operations, knowledge transfer completed, support transitioned | $16,000 |
| **Total Implementation** | **18 weeks** | | **$320,000** |

## 6.3 Payment Schedule

| Milestone | Trigger | Amount |
|-----------|---------|--------|
| Contract signature + programme kickoff | Contract execution | $64,000 (20%) |
| Phase 1 gate sign-off | ADX acceptance of requirements baseline | $48,000 (15%) |
| Phase 3 gate sign-off | ADX compliance team approval of compliance configuration | $96,000 (30%) |
| Phase 4 gate sign-off | ADX technology team acceptance of integration test evidence | $64,000 (20%) |
| Phase 6 completion | ADX acceptance of operational readiness certificate | $48,000 (15%) |

## 6.4 Accelerators and Risks

| Factor | Effect | Notes |
|--------|--------|-------|
| Pre-built ISO 20022 CSD adapter | Accelerates Phase 4 | Available if CSD uses standard message formats |
| Existing ADX IAM/SAML setup | Accelerates Phase 2 | Standard AD federation is pre-built |
| ADX-selected AML provider with REST API | Accelerates Phase 3 | Provider-agnostic integration pattern |
| Non-standard CSD interface | Extends Phase 4 | Custom adapter development: +$30,000-$60,000 |
| On-premises HSM commissioning | Extends Phase 2 | Key ceremony scheduling adds 2-3 weeks |
| ADX regulatory pre-engagement delay | Extends Phase 5 | ADX responsibility; SettleMint provides evidence packs |
| Integration scope wider than estimated | Extends Phase 4 | Discovery workshop maps actual scope in Phase 1 |

## 6.5 Training

Core training tracks are included in the implementation investment:

| Track | Audience | Duration | Delivery |
|-------|---------|---------|---------|
| Platform Administration | IT operations, platform admins | 2 days | On-site workshop |
| Developer/Integration | Integration engineers | 3 days | Technical workshop + lab |
| Operations | Business operations, compliance officers | 2 days | Workflow exercises |
| Compliance Management | Compliance team | 1 day | Configuration walkthrough |

Additional training sessions (e.g., refresher training in Year 2, new staff onboarding) are available at $4,000-$8,000 per session day.

---

# 7. Commercial Terms

## 7.1 Contract Structure

The commercial relationship between SettleMint and ADX Abu Dhabi Securities Exchange is structured across three agreements:

| Agreement | Scope | Term |
|-----------|-------|------|
| Platform Licence Agreement | DALP software licence, permitted use, IP rights, data handling | 3 years, renewable |
| Professional Services Order | Implementation services, training, milestone schedule | Fixed term (18 weeks) |
| Support Services Agreement | Enterprise support tier, SLA, service credits | Co-terminates with licence |

All three agreements are subject to an overarching Master Agreement covering confidentiality, liability, dispute resolution, and data processing terms.

## 7.2 Payment Schedule

| Payment | Amount | Trigger | Notes |
|---------|--------|---------|-------|
| Year 1 Platform Licence | $480,000 | Contract execution | Annual, in advance |
| Year 1 Support | $144,000 | Contract execution | Annual, in advance |
| Implementation Milestones | $320,000 total | Per milestone acceptance | See Section 6.3 |
| Infrastructure | $96,000 | ADX cloud account billing | Monthly to cloud provider |
| Year 2 Licence + Support | $624,000 | Year 2 anniversary | Annual renewal |
| Year 3 Licence + Support | $624,000 | Year 3 anniversary | Annual renewal |

## 7.3 Duration

| Term | Detail |
|------|--------|
| Initial licence term | 3 years from contract execution date |
| Licence activation | Commences at contract execution (not at go-live) |
| Multi-year commitment option | 3-year upfront commitment: 10% discount on licence fees |
| Optional extension | Annual renewal at agreed pricing after initial term |

## 7.4 Renewal

Licence renewal terms are communicated no later than 6 months before term expiry. Pricing for renewal is based on the then-current list price unless a multi-year commitment or other pre-agreed terms apply. Early renewal (more than 3 months before expiry) may qualify for a 5% loyalty discount.

## 7.5 Termination

| Type | Conditions |
|------|-----------|
| For cause | Material breach of contract terms, not remedied within 30-day cure period |
| For insolvency | Insolvency or bankruptcy of either party |
| For convenience | Not available during initial term without termination fee |
| Termination fee (convenience) | 25% of remaining licence fees for the unexpired initial term |

Post-termination: ADX retains access to all data export tools for 90 days after termination to enable migration. SettleMint provides data export assistance as a billable service if required beyond standard platform export capability.

## 7.6 Intellectual Property

| Item | Ownership |
|------|-----------|
| DALP platform software | SettleMint NV |
| Client configuration data | ADX Abu Dhabi Securities Exchange |
| ADX's business data and records | ADX Abu Dhabi Securities Exchange |
| Integration code developed by SettleMint | SettleMint NV (licence granted to ADX) |
| Customizations developed specifically for ADX (if any) | As agreed per statement of work |

## 7.7 Liability

Liability cap: SettleMint's total aggregate liability under the agreement is capped at 12 months of licence fees paid. Exclusions from cap: death/personal injury, fraud, wilful misconduct, and data protection obligations under applicable law.

## 7.8 Confidentiality

Mutual confidentiality obligations apply for the term of the agreement and for 3 years thereafter. Standard exceptions apply: publicly available information, information independently developed, information required to be disclosed by law or regulatory order.

## 7.9 Escrow

SettleMint can arrange source code escrow with a mutually agreed escrow agent. Release conditions typically include: SettleMint insolvency, cessation of business, or material failure to maintain the platform for 90+ days. Escrow arrangement costs are borne by ADX. SettleMint will provide escrow deposit and update procedures.

---

# 8. Total Cost of Ownership

## 8.1 TCO Framework

The TCO comparison for ADX evaluates three scenarios over a five-year horizon: (1) DALP platform licence, (2) internal build, and (3) multi-vendor assembly. The comparison includes all relevant cost categories: software, infrastructure, implementation, personnel, ongoing maintenance, integration, and compliance/audit support.

## 8.2 Three-Year TCO: DALP Platform

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|----------|--------|--------|--------|-------------|
| Platform Licence | $480,000 | $480,000 | $480,000 | $1,440,000 |
| Implementation | $320,000 | - |, | $320,000 |
| Infrastructure (Private Cloud) | $96,000 | $96,000 | $96,000 | $288,000 |
| Enterprise Support | $144,000 | $144,000 | $144,000 | $432,000 |
| Training | $24,000 | - | $12,000 | $36,000 |
| Internal ADX resources (oversight) | $80,000 | $60,000 | $60,000 | $200,000 |
| **Total** | **$1,144,000** | **$780,000** | **$792,000** | **$2,716,000** |

## 8.3 Three-Year TCO: Internal Build

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|----------|--------|--------|--------|-------------|
| Smart contract development | $600,000 | - |, | $600,000 |
| Compliance and identity layers | $350,000 | - |, | $350,000 |
| API and integration development | $300,000 | - |, | $300,000 |
| Infrastructure | $120,000 | $120,000 | $120,000 | $360,000 |
| Ongoing maintenance team (3 FTE) | - | $600,000 | $650,000 | $1,250,000 |
| Security audit and penetration testing | $100,000 | $80,000 | $80,000 | $260,000 |
| Regulatory compliance updates | $100,000 | $150,000 | $150,000 | $400,000 |
| Integration maintenance | - | $200,000 | $200,000 | $400,000 |
| **Total** | **$1,570,000** | **$1,150,000** | **$1,200,000** | **$3,920,000** |

## 8.4 Three-Year TCO: Multi-Vendor Assembly

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|----------|--------|--------|--------|-------------|
| Token issuance platform licence | $200,000 | $200,000 | $200,000 | $600,000 |
| Compliance platform licence | $150,000 | $150,000 | $150,000 | $450,000 |
| Identity management licence | $100,000 | $100,000 | $100,000 | $300,000 |
| Settlement integration platform | $120,000 | $120,000 | $120,000 | $360,000 |
| Integration architecture build | $400,000 | - |, | $400,000 |
| Integration maintenance team (2 FTE) | - | $400,000 | $420,000 | $820,000 |
| Infrastructure | $100,000 | $100,000 | $100,000 | $300,000 |
| Support (multiple vendors) | $160,000 | $160,000 | $160,000 | $480,000 |
| Audit and evidence coordination | $80,000 | $100,000 | $100,000 | $280,000 |
| **Total** | **$1,310,000** | **$1,330,000** | **$1,350,000** | **$3,990,000** |

## 8.5 Comparative Analysis

| Dimension | DALP Platform | Internal Build | Multi-Vendor |
|-----------|-------------|--------------|-------------|
| 3-year TCO | $2,716,000 | $3,920,000 | $3,990,000 |
| Time to first production | 18 weeks | 18-24 months | 12-18 months |
| Integration maintenance FTE | 0.5 FTE (ADX oversight) | 3 FTE (maintenance) | 2 FTE (integration) |
| Regulatory evidence capability | Native, on-demand | Must be built | Requires coordination |
| Compliance update mechanism | Configuration | Code change + audit | Multiple vendor patches |
| Audit single point of contact | SettleMint | Internal team | Multiple vendor contacts |
| Platform evolution alignment | Included in licence | ADX-borne cost | Depends on all vendors |
| 5-year TCO (estimated) | $4,700,000 | $7,200,000+ | $7,400,000+ |

DALP provides the lowest TCO across all time horizons, with the fastest path to production and the lowest ongoing coordination overhead.

---

# 9. Reference Clients

## 9.1 Reference Track Record

| Client | Geography | Use Case | Deployment Scale | Relevance to ADX |
|--------|-----------|---------|-----------------|-----------------|
| Euronext | Europe | Digital securities listing platform | Pan-European exchange infrastructure | Exchange operator context, listing controls, post-trade integration |
| Central Bank of UAE | UAE | Digital Dirham infrastructure | Sovereign CBDC pilot | UAE regulatory framework, Gulf region deployment, CBUAE alignment |
| Standard Chartered Bank | Multi-region | Digital custody and bond issuance | Institutional-grade production | Custody integration, maker-checker controls, institutional SLA |
| State Bank of India | India | Digital bond issuance | National-scale deployment | Regulatory compliance, corporate action automation, large-scale issuer management |
| Commerzbank | Germany | Tokenized bonds | European institutional deployment | Bond lifecycle management, compliance evidence, CSD integration |

## 9.2 Expanded Case Studies

### Euronext: Digital Securities Listing Platform

**Context:** Euronext, as Europe's largest pan-national exchange group, sought to establish a digital securities listing infrastructure that could coexist with existing exchange operations, CSD infrastructure, and regulatory reporting obligations.

**Challenge:** The primary challenge was not technology capability but operational integration: the digital securities platform had to produce audit evidence, surveillance data, and post-trade records in formats compatible with existing exchange infrastructure. It could not create a parallel operational stack that compliance and operations teams could not supervise.

**DALP solution:** DALP was deployed as the control plane for digital securities administration, with integration to Euronext's CSD connectivity, surveillance infrastructure (Nasdaq SMARTS), and regulatory reporting stack. Compliance modules enforced investor eligibility rules aligned with MiFID II requirements. The XvP settlement addon generated settlement instructions in ISO 20022 format for direct CSD delivery.

**Outcome and transferability:** The deployment established a production-grade digital securities capability that operates under Euronext's existing governance, audit, and surveillance frameworks without creating a separate compliance silo. ADX faces a structurally similar challenge: the digital securities marketplace must integrate into exchange operations, not operate alongside them.

### Central Bank of UAE: Digital Dirham Infrastructure

**Context:** CBUAE's Digital Dirham programme required a blockchain infrastructure platform that could operate within UAE data sovereignty constraints, integrate with the Central Bank's existing systems, and produce evidence suitable for BIS oversight and domestic supervisory review.

**Challenge:** UAE data residency requirements, Arabic language operational requirements, and alignment with CBUAE's operational security standards created a more demanding deployment context than standard SaaS deployment.

**DALP solution:** Private cloud deployment in UAE Azure North region, full data residency compliance, Arabic-language operational documentation, and integration with CBUAE's IAM infrastructure and reporting stack.

**Outcome and transferability:** Demonstrated in-region UAE deployment capability, CBUAE regulatory alignment, and Arabic operational support. ADX operates in the same regulatory environment and benefits from SettleMint's established UAE operational experience.

---

# 10. Next Steps

## 10.1 Proposed Engagement Path

| Step | Purpose | Owner | Target Timing |
|------|---------|-------|--------------|
| Commercial response acknowledgment | ADX confirms receipt and evaluation timeline | ADX Procurement | Within 5 business days of submission |
| Clarification questions | ADX raises technical or commercial questions; SettleMint responds | Both | Within evaluation window |
| Technical presentation | SettleMint presents technical proposal to ADX architecture and compliance teams | SettleMint | 2-3 weeks post-submission |
| Commercial workshop | Joint review of pricing assumptions, scope confirmation, and contract structure | Both | 3-4 weeks post-submission |
| Reference engagement | ADX contacts SettleMint's reference clients for independent validation | ADX | Concurrent with commercial workshop |
| Best-and-final offer | SettleMint submits revised commercial terms if required after workshop | Both | 4-5 weeks post-submission |
| Contract negotiation | Legal and procurement teams finalize agreement | Both | 5-7 weeks post-submission |
| Programme kickoff | Phase 1 begins following contract signature | Both | Within 2 weeks of contract execution |

## 10.2 SettleMint Contacts

**Commercial contact:** For all commercial, contract, and procurement queries.

**Technical/delivery contact:** For all technical, architecture, and implementation queries.

> SettleMint is ready to participate in clarification sessions, demonstrations, reference calls, or security review meetings at ADX's request within the evaluation period. Named contacts and direct communication channels will be provided on request.

---

*End of Commercial Proposal. ADX Abu Dhabi Securities Exchange*

*Document Version: 1.0 | Date: 2026-03-19 | Classification: Restricted. Commercial-Sensitive*

*SettleMint NV | Rue Montoyer 39, 1000 Brussels, Belgium | www.settlemint.com*
