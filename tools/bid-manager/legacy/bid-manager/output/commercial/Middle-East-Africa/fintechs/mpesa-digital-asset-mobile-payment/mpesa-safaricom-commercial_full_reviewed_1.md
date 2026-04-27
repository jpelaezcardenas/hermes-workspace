# Commercial Proposal: Digital Asset Mobile Payment Overlays for Stored-Value Networks

**Prepared for:** M-Pesa Safaricom (Kenya)
**Prepared by:** SettleMint NV
**Date:** March 2026
**Version:** v1.0
**Reference:** M-PESA-SAFARICOM-RFP-DIGITAL-ASSET-MOBILE-PAYMENT-202603
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

M-Pesa Safaricom is not making a speculative infrastructure investment. It is making a risk-mitigation and efficiency investment in settlement infrastructure that sits underneath existing, nationally important payment operations. The procurement decision is whether the proposed platform can satisfy CBK regulatory requirements, Safaricom operational standards, and consumer protection obligations while delivering material settlement efficiency improvements.

The commercial question requires clarity on three dimensions. First: what does the platform cost across its full lifecycle (license, implementation, support, infrastructure)? Second: what evidence can be provided that the investment will be maintained at national infrastructure standards? Third: is the commercial structure compatible with Safaricom's procurement governance and CBK oversight requirements?

This proposal addresses all three with transparency.

### Recommended Structure

| Component | Recommendation | Annual Cost |
|---|---|---|
| Platform license | Enterprise tier | $260,000/year |
| Additional environments (2) | UAT + DR | $50,000/year |
| Premium support (24/7) | National infrastructure requirement | $85,000/year |
| **Annual recurring** | | **$395,000/year** |
| Implementation | Full programme with CBK gates | $420,000 (one-time) |
| **Year 1 total** | | **$815,000** |
| **3-year TCO (base)** | | **$1,595,000** |

The M-Pesa implementation is priced at the higher end of the range because it includes Kenya-based on-premises deployment (Safaricom data centres), HSM integration, a CBK regulatory engagement component in Phase 1, and an extended implementation timeline reflecting the CBK approval gates required before any corridor goes live.

### Commercial Logic

M-Pesa's business case for this programme rests on three pillars:

**Settlement efficiency:** Atomic corridor settlement replaces correspondent banking message reconciliation. Each settlement cycle that currently requires 24-48 hours of correspondent confirmation and manual reconciliation becomes a sub-minute on-chain event. At M-Pesa Global's transaction volume, this translates to significant float reduction and operational overhead savings.

**CBK regulatory defensibility:** CBK's evolving digital payment framework is likely to require more granular settlement evidence from mobile money operators. Platform investment now positions M-Pesa to produce this evidence on demand rather than through manual reconstruction.

**Cross-border expansion support:** M-Pesa Global operates in multiple corridors with different correspondent banking costs and settlement quality. Tokenized corridor settlement provides a standardised, auditable settlement layer for new corridor launches, reducing the per-corridor integration overhead.

---

## Investment Summary

| Factor | Detail |
|---|---|
| Platform | DALP Enterprise Tier |
| Deployment | Safaricom data centres (Kenya, on-premises) |
| Initial overlays | KE-TZ and KE-DRC corridors, merchant settlement |
| Phase 2 | Additional corridors, treasury liquidity management |
| Environments | Production + UAT + DR + Dev + Test (5 total) |
| Support | Premium (24/7/365) |
| Implementation | 54 weeks to first corridor production (including CBK gates) |
| Year 1 total | $815,000 |
| 3-year TCO | ~$1,595,000 base |

---

## Licensing and Subscription Model

### Philosophy

DALP's platform-based licensing does not charge per settlement, per corridor, or per entity. M-Pesa pays for platform access across all three overlays (cross-border, merchant, treasury) without incremental charges as settlement volume grows.

### What Is Included

| Capability | Included |
|---|---|
| All contract types | Yes |
| XvP Settlement addon | Yes |
| All compliance modules | Yes |
| Vault multi-sig treasury | Yes |
| Asset Console | Yes |
| REST API and TypeScript SDK | Yes |
| Webhooks and SSE | Yes |
| Chain Indexer with CBK read-only access | Yes |
| Observability stack | Yes |
| Platform updates and security patches | Yes |
| One production environment | Yes |

### What Varies

| Variable | Selection | Cost |
|---|---|---|
| Additional environments (UAT + DR) | 2 | $25,000/year each |
| Deployment | On-premises Safaricom DCs | Infrastructure is Safaricom-borne |
| Key management | HSM tier (FIPS 140-2 Level 3) | Included in Enterprise; HSM hardware is Safaricom-procured |
| Support | Premium | $85,000/year |

### Platform Tier

Enterprise tier at $260,000/year is recommended, reflecting the national infrastructure security and operational requirements. This is positioned at the higher end of the $180,000-$280,000 range to reflect the HSM integration, CBK engagement support included in implementation, and on-premises deployment complexity.

---

## Implementation Investment

### Phase Summary

| Phase | Duration | Objective | Investment |
|---|---|---|---|
| Discovery and CBK Engagement | 7 weeks | Architecture design, CBK regulatory briefing, Data Protection Act mapping | $65,000 |
| Foundation and HSM Setup | 7 weeks | On-premises infrastructure, HSM, private blockchain | $75,000 |
| Configuration and CBK Review Gate | 6 weeks | Corridor tokens, CBK read-only access, CBK review | $65,000 |
| Integration | 6 weeks | Settlement engine, AML, ledger | $80,000 |
| Testing and CBK Comfort Gate | 8 weeks | Full testing, CBK evidence walkthrough, UAT | $90,000 |
| Go-Live and Hypercare | 20 weeks | Pilot corridor, rollout, merchant settlement, hypercare | $45,000 |
| **Total** | **54 weeks** | | **$420,000** |

The extended timeline and higher implementation cost compared to other institutions reflects:

- CBK regulatory engagement requires structured briefings and written comfort before production go-live
- On-premises deployment in Safaricom data centres has longer infrastructure setup than cloud deployment
- HSM procurement and installation adds 3-4 weeks versus cloud KMS deployment
- Multiple CBK gate reviews (Phase 3 and Phase 5) add formal approval steps with defined evidence requirements

### Training

| Audience | Content | Duration |
|---|---|---|
| Platform administrators | System and infrastructure management | 2 days |
| Treasury operations | Corridor settlement, exception handling, approval workflows | 2 days |
| Integration engineers | API integration, SDK, webhook patterns | 2 days |
| Compliance / CBK liaison | Compliance module management, CBK evidence API access | 1 day |
| Safaricom audit team | Audit log access, evidence export procedures | 1 day |

---

## Support and Operational Costs

### Support Recommendation

For national payment infrastructure with CBK oversight, Premium support (24/7) is required. There is no appropriate alternative.

| Feature | Premium |
|---|---|
| Annual cost | $85,000 |
| Coverage | 24/7/365 |
| P1 response | 1 hour |
| P2 response | 4 hours |
| Named support lead | Yes |
| Quarterly CBK evidence pack reviews | Included in Premium |

### Severity Matrix

| Severity | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Settlement layer failure (consumer fallback activated) | 1 hour | 4 hours |
| P2 | Settlement delayed, corridor operations blocked | 4 hours | 24 hours |
| P3 | Non-critical, no consumer or CBK impact | 8 hours | 72 hours |
| P4 | Enhancement, documentation | Next business day | Roadmap |

---

## Total Cost of Ownership Analysis

### 3-Year TCO: DALP

| Cost Category | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|
| Platform license | $260,000 | $247,000 | $247,000 | $754,000 |
| Additional environments (2) | $50,000 | $50,000 | $50,000 | $150,000 |
| Premium support | $85,000 | $85,000 | $85,000 | $255,000 |
| Implementation (one-time) | $420,000 | - | - | $420,000 |
| Post-launch enablement | - | $20,000 | $20,000 | $40,000 |
| **Subtotal** | **$815,000** | **$402,000** | **$402,000** | **$1,619,000** |

*Year 2-3 license at 5% multi-year discount. Infrastructure (Safaricom DCs, HSM, Kubernetes) is Safaricom-borne, estimated $120,000-$150,000/year for on-premises production-grade with HSM.*

**3-year TCO including infrastructure: approximately $1,980,000-$2,070,000**

Note: The 3-year base software cost ($1,619,000) is slightly above the generic $1,400,000 ceiling. This reflects M-Pesa's national infrastructure profile and includes CBK engagement support in implementation pricing. The full TCO including Safaricom-borne infrastructure represents the complete economic picture.

### Comparative Analysis

| Metric | DALP | Internal Build | Multi-Vendor |
|---|---|---|---|
| 3-year software cost | ~$1.6M | ~$4-5M (national infra complexity) | ~$3M |
| Time to CBK-approved production | 54 weeks | 30-40 months | 24-36 months |
| CBK evidence architecture | Built-in, API-accessible | Must be designed and audited | Cross-vendor gap risk |
| Consumer protection segregation | Structural, verifiable | Must be proven | Not guaranteed |

---

## Payment Terms and Commercial Structure

### Platform License

Annual, invoiced in advance. Year 2-3 at 5% multi-year discount with commitment at signature.

### Implementation Payment Schedule

| Milestone | Payment | Amount | Target |
|---|---|---|---|
| Contract execution | 20% | $84,000 | Week 0 |
| Phase 1 gate (CBK engagement completed, architecture approved) | 15% | $63,000 | Week 7 |
| Phase 3 gate (CBK review of deployed layer completed) | 25% | $105,000 | Week 20 |
| Phase 5 gate (CBK written comfort, UAT complete) | 25% | $105,000 | Week 34 |
| Phase 6 gate (first corridor production) | 15% | $63,000 | Week 54 |
| **Total** | **100%** | **$420,000** | |

The implementation payment schedule reflects the CBK gate structure: larger milestone payments are tied to CBK approval events to ensure Safaricom is not making full payment before regulatory comfort is achieved.

### Contract Duration

3-year initial term from Phase 6 production go-live. Renewal: 90-day written notice. Duration clock starts at go-live, not at contract signature, reflecting the extended implementation timeline.

---

## Value Realisation and ROI Analysis

### Value Drivers

| Driver | Mechanism | Annual Benefit |
|---|---|---|
| Correspondent banking float reduction | Faster corridor settlement frees float capital | $500,000-$2,000,000+ |
| Settlement operations efficiency | Automated atomic settlement reduces operations overhead | $200,000-$400,000 |
| CBK regulatory evidence | On-demand evidence reduces compliance assembly overhead | $100,000-$200,000 |
| Cross-border corridor expansion | Lower per-corridor setup enables faster expansion | Revenue upside |
| Merchant settlement efficiency | Programmable funding cycles reduce merchant float complaints | Merchant NPS and retention value |

**Conservative annual benefit: $800,000-$2,600,000**

The dominant value driver for M-Pesa is float reduction. M-Pesa Global holds correspondent banking float positions across multiple corridors. Each day of correspondent settlement delay represents idle capital. If atomic tokenized settlement reduces average settlement time from 2 days to same-day across major corridors, the float reduction at M-Pesa Global's transaction volumes is material. Exact figures require a treasury workshop with M-Pesa's finance team to model.

### Payback Analysis

| Scenario | Annual Benefit | 3-Year Net | Payback |
|---|---|---|---|
| Conservative (float only, 5 corridors) | $800,000 | +$780,000 | 2.5 years |
| Expected (10 corridors + operations) | $1,500,000 | +$2,880,000 | 1.3 years |
| Upside (full corridor + merchant) | $2,600,000 | +$6,180,000 | 0.7 years |

The payback analysis depends critically on M-Pesa Global corridor volumes and current float costs. A value workshop with Safaricom treasury would provide the precise float cost baseline needed for a refined model. The available evidence suggests this programme has one of the strongest potential ROI profiles in SettleMint's portfolio if float reduction is the primary metric.

---

## Commercial Assumptions and Dependencies

- Safaricom provides on-premises Kubernetes infrastructure within Kenya-based data centres. SettleMint provides specifications and implementation support.
- HSM hardware procurement by Safaricom; SettleMint provides specifications. HSM installation adds approximately 4 weeks to Phase 2.
- CBK Phase 1 engagement assumes Safaricom initiates the regulatory conversation. SettleMint provides technical documentation and evidence packs for CBK review. CBK approval timeline is outside SettleMint's control.
- Implementation timeline assumes CBK Phase 3 review takes maximum 3 weeks and Phase 5 comfort takes maximum 4 weeks. Extended CBK review timelines extend the implementation without affecting fixed-price commitment.
- Phase 2 (additional corridors, treasury liquidity) is a separate expansion scope estimated at $100,000-$150,000 additional implementation.
- Safaricom provides dedicated integration engineers during Phases 3 and 4.

---

## Contractual Framework Overview

### Agreement Structure

Master Subscription Agreement (platform license, IP, data handling, CBK audit access provisions, confidentiality, liability) and Statement of Work (implementation scope, CBK gates, milestones, acceptance criteria).

### Intellectual Property

DALP platform IP: SettleMint's. All Safaricom data, settlement records, and on-chain token state: Safaricom's. CBK read-only API key management: Safaricom's operational responsibility.

### Liability

Cap: 12 months of preceding subscription fees. Exceptions: gross negligence, wilful misconduct, data breach from SettleMint failure. Consumer protection indemnification: SettleMint's consumer data boundary architecture is verifiable through code review; Safaricom maintains consumer protection responsibility.

### Data Handling

Data Processing Agreement (DPA) included as MSA schedule. All data processed in Kenya-based Safaricom infrastructure. SettleMint acts as data processor; Safaricom is data controller. Kenya Data Protection Act 2019 compliance is designed into the deployment architecture.

---

## Appendix A: Detailed Pricing Schedule

### Annual Recurring

| Line Item | Unit | Qty | Unit Price | Annual Total |
|---|---|---|---|---|
| DALP Enterprise License | Platform/year | 1 | $260,000 | $260,000 |
| Additional Environment (UAT) | Env/year | 1 | $25,000 | $25,000 |
| Additional Environment (DR) | Env/year | 1 | $25,000 | $25,000 |
| Premium Support | Tier/year | 1 | $85,000 | $85,000 |
| **Total Annual Recurring** | | | | **$395,000** |

### Implementation

| Phase | Description | Price |
|---|---|---|
| Phase 1 | Discovery and CBK Engagement | $65,000 |
| Phase 2 | Foundation and HSM Setup | $75,000 |
| Phase 3 | Configuration and CBK Review | $65,000 |
| Phase 4 | Integration | $80,000 |
| Phase 5 | Testing and CBK Comfort | $90,000 |
| Phase 6 | Go-Live and Hypercare | $45,000 |
| **Total** | | **$420,000** |

---

## Appendix B: Implementation Milestone and Payment Schedule

| Milestone | Deliverable | Payment | Amount | Target |
|---|---|---|---|---|
| Contract execution | Signed MSA + SoW + DPA | 20% | $84,000 | Week 0 |
| Phase 1 gate | CBK briefing complete, architecture approved | 15% | $63,000 | Week 7 |
| Phase 3 gate | CBK review of deployed layer complete | 25% | $105,000 | Week 20 |
| Phase 5 gate | CBK written comfort, UAT signed off | 25% | $105,000 | Week 34 |
| Phase 6 gate | First corridor production-live | 15% | $63,000 | Week 54 |
| **Total** | | **100%** | **$420,000** | |

---

*This document is classified SettleMint Confidential. Distribution is restricted to authorised M-Pesa Safaricom procurement personnel.*
