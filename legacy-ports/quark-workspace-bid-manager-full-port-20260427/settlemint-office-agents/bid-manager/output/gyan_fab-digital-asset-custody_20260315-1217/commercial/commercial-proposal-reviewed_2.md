# Commercial Proposal: Digital Asset Custody for Institutional and Private Banking Distribution

| Field | Value |
|---|---|
| Proposal title | Commercial Proposal. Digital Asset Custody for Institutional and Private Banking Distribution |
| Client | First Abu Dhabi Bank |
| Submitted by | SettleMint NV |
| Date | March 2026 |
| Version | v1.0 |
| Confidentiality | Restricted |
| RFP Reference | FIRST-ABU-DHABI-BANK-RFP-DIGITAL-ASSET-CUSTODY-202603 |

---

## Executive Summary

First Abu Dhabi Bank requires a custody orchestration platform and delivery partner capable of bringing institutional-grade digital asset custody to production with the discipline, transparency, and governance expected of a core regulated system. This commercial proposal presents SettleMint's licensing, implementation, and support model for the Digital Asset Lifecycle Platform (DALP), structured to provide predictable costs, transparent assumptions, and a clear total cost of ownership across a three-year horizon.

**Commercial recommendation:**

- **License tier:** Enterprise (Tier 2), supporting multiple asset classes, environments, and custody provider integrations
- **Deployment model:** Dedicated cloud, UAE-resident infrastructure
- **Implementation:** 19-week phase-gated delivery with five formal gate reviews
- **Support tier:** Premium, 16x5 coverage, 2-hour P1 response, dedicated support engineer
- **Estimated three-year TCO:** [CLIENT-SPECIFIC, to be finalized during commercial discussions]

The DALP licensing model charges a predictable annual subscription with no per-transaction, per-token, per-user, or per-asset fees. FAB can scale custody operations, asset classes, and client base without incremental platform costs.

---

## Investment Rationale

### Cost of Current Approach

Building institutional digital asset custody from scratch requires assembling separate solutions for key management, compliance checking, identity verification, settlement, servicing, and operational monitoring. This fragmented approach creates coordination overhead (every change requires cross-vendor coordination), extended timelines (18-24 months of custom development), compliance gaps (compliance treated as an afterthought), operational risk (no unified registry, no atomic operations), and skills dependency (teams must maintain deep blockchain expertise).

### Why DALP Changes Economics

DALP consolidates the full custody lifecycle into a single platform. The compliance engine, custody orchestration, settlement, and monitoring are included from day one. Adding new asset classes does not require new vendor procurement. Adding new investors does not increase platform costs. This changes the cost profile from a fragmented, variable-cost model to a predictable, platform-based model.

### ROI Framework

| ROI Driver | Mechanism | Estimated Impact |
|---|---|---|
| Custody intermediary reduction | On-chain ownership eliminates intermediary custody fees | [CLIENT-SPECIFIC] |
| Settlement cycle reduction | Atomic DvP eliminates T+2 settlement delay | [CLIENT-SPECIFIC] |
| Operational efficiency | Automated servicing, compliance, and reporting | [CLIENT-SPECIFIC] |
| New revenue streams | Private banking digital asset products | [CLIENT-SPECIFIC] |
| Risk reduction | Atomic settlement eliminates counterparty risk | [CLIENT-SPECIFIC] |

---

## Licensing Model

### Platform Licensing Philosophy

| Principle | What It Means for FAB |
|---|---|
| No per-transaction fees | Every custody operation, compliance check, and transfer is included |
| No per-token fees | Additional asset classes carry no incremental license cost |
| No per-user fees | Growing the client base is a business outcome, not a cost driver |
| Predictable annual subscription | Budget certainty for multi-year planning |
| Full platform capabilities | All lifecycle pillars, compliance modules, API surface, observability |

### Recommended Tier: Enterprise (Tier 2)

| Dimension | Enterprise Configuration for FAB |
|---|---|
| Environments | Development + UAT/Staging + DR + Production |
| Networks | Permissioned Hyperledger Besu (recommended) |
| Custody | DFNS or Fireblocks integration |
| Support | Premium tier (16x5, 2-hour P1 response) |
| Asset classes | Multi-asset custody: bonds, equities, funds, deposits, configurable |

**Annual license fee:** [CLIENT-SPECIFIC]

---

## Deployment Options and Pricing

### Recommended: Dedicated Cloud, UAE-Resident

| Option | Management | Data Residency | Speed | Overhead |
|---|---|---|---|---|
| Managed SaaS | SettleMint | Shared | Fastest | Lowest |
| **Dedicated Cloud** | **FAB + SettleMint** | **UAE-resident** | **Fast** | **Moderate** |
| On-Premises | FAB | FAB DC | Slowest | Highest |
| Hybrid | Shared | Mixed | Moderate | Moderate |

### Cost Structure

| Category | Type | Responsibility |
|---|---|---|
| Platform license | Recurring (annual) | SettleMint |
| Implementation services | One-time (milestone-based) | SettleMint |
| Premium support | Recurring (annual) | SettleMint |
| Cloud infrastructure | Recurring (monthly) | FAB |
| Custody provider fees | Recurring | FAB (direct with DFNS/Fireblocks) |

---

## Support and SLA Framework

### Recommended: Premium Support

| Aspect | Premium |
|---|---|
| Coverage | 16x5 |
| P1 response | 2 hours |
| P2 response | 4 hours |
| Dedicated engineer | Yes |
| Business reviews | Quarterly |
| Annual fee | [CLIENT-SPECIFIC] |

### Severity Matrix

| Severity | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Production down | 2 hours | 4 hours |
| P2 | Major impairment | 4 hours | 8 hours |
| P3 | Non-critical | 1 business day | 5 business days |
| P4 | Enhancement | 3 business days | Next release |

---

## Implementation Investment

### Pricing Summary

| Phase | Duration | Scope | Pricing |
|---|---|---|---|
| Discovery & Requirements | 2 weeks | Requirements, regulatory mapping, architecture | Fixed fee |
| Foundation & Setup | 3 weeks | Environments, network, identity, custody integration | Fixed fee |
| Configuration & Compliance | 4 weeks | Asset config, compliance, workflows | Fixed fee |
| Integration & Testing | 4 weeks | Enterprise integration, security/UAT/performance | Fixed fee |
| Go-Live & Hypercare | 6 weeks | Deployment, knowledge transfer, hypercare | Fixed fee |
| **Total** | **19 weeks** | | **[CLIENT-SPECIFIC]** |

### Client Effort Assumptions

| Activity | Effort | When |
|---|---|---|
| Stakeholder interviews | 20 person-days | Weeks 1-2 |
| Custody policy workshops | 15 person-days | Weeks 3-5 |
| Core banking API provisioning | 15 person-days | Weeks 3-9 |
| UAT execution | 20 person-days | Weeks 10-13 |
| Operations readiness | 10 person-days | Weeks 14-19 |
| **Total** | **80 person-days** | |

---

## Total Cost of Ownership

### Three-Year TCO

| Component | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|
| Platform license | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Premium support | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Infrastructure | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| **Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

### Exclusions

| Exclusion | Responsibility |
|---|---|
| Cloud infrastructure costs | FAB |
| Custody provider fees (DFNS/Fireblocks) | FAB (direct) |
| Core banking integration development | FAB |
| Regulatory filing fees | FAB |
| Custom reporting dashboards beyond standard | Additional scope |

---

## Commercial Terms

### Contract Components

| Component | Scope |
|---|---|
| Platform License Agreement | Annual subscription, renewal, updates |
| Implementation Services Agreement | Fixed scope, milestones, acceptance, change control |
| Support Services Agreement | SLA commitments, escalation, coverage |
| Data Processing Agreement | Data handling, UAE residency, retention |
| Confidentiality Agreement | Mutual NDA |

### Key Terms

- **Payment:** Milestone-based (implementation); annual in advance (license, support)
- **Term:** Initial three-year with annual renewal option
- **Price escalation:** Capped at [CLIENT-SPECIFIC]% annually
- **Exit support:** 90-day transition, data export, documentation handover
- **Audit rights:** Annual audit of security, data handling, and service delivery
- **Subcontracting:** Advance disclosure, FAB approval rights

---

## Reference Clients

| Client | Geography | Use Case | Scale | Relevance |
|---|---|---|---|---|
| Standard Chartered | Asia, Africa, ME | Digital Virtual Exchange | Institutional | Multi-region custody |
| ADI Finstreet | Abu Dhabi | Equity Tokenization | Enterprise | UAE custody, DFNS |
| OCBC Bank | Singapore | Security Token Engine | Enterprise | HNWI distribution |
| Commerzbank | Germany | Exchange-Traded Products | Exchange-grade | <10s settlement |
| Saudi Arabia RER | KSA | Real Estate Registry | Sovereign | Country-scale |

---

## Next Steps

| Step | Owner | Target | Output |
|---|---|---|---|
| Commercial discussion | Joint | Week 1 | Validated pricing |
| Scoping workshop | Joint | Week 2 | Refined scope |
| Custody provider selection | FAB | Week 3 | DFNS or Fireblocks decision |
| Contract execution | Joint | Week 4 | Signed agreements |
| Phase 1 kickoff | Joint | Week 5 | Mobilization |
