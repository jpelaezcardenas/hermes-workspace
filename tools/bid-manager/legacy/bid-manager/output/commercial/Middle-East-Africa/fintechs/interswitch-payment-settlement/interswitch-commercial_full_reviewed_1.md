# Commercial Proposal: Tokenized Payment Settlement and Reconciliation Network

**Prepared for:** Interswitch (Nigeria)
**Prepared by:** SettleMint NV
**Date:** March 2026
**Version:** v1.0
**Reference:** INTERSWITCH-RFP-TOKENIZED-PAYMENT-SETTLEMENT-202603
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

### The Commercial Context

Interswitch operates payment switching and settlement infrastructure that processes billions of naira in daily settlement flows across Nigeria's banking ecosystem. The company's role as a central payment infrastructure operator means that any platform investment must deliver against operational imperatives, not innovation experiments: settlement reliability, regulatory defensibility under CBN oversight, and reconciliation quality that participant banks and merchants can trust.

The tokenized payment settlement programme is a focused infrastructure investment. It places a programmable, auditable settlement layer underneath existing switching flows to reduce reconciliation overhead, automate compliance evidence generation, and deliver settlement finality that is tamper-evident rather than message-based. The commercial case rests on operational efficiency gains and risk reduction, not on speculative technology adoption.

### Recommended Commercial Structure

| Component | Recommendation | Annual Cost |
|---|---|---|
| Platform license | Enterprise tier | $240,000/year |
| Additional environments (UAT + DR) | 2 x environments | $50,000/year |
| Premium support (24/7) | Settlement infrastructure requirement | $85,000/year |
| **Annual recurring** | | **$375,000/year** |
| Implementation services | Full programme delivery | $360,000 (one-time) |
| **Year 1 total** | | **$735,000** |
| **3-year TCO (base platform, excluding infra)** | | **$1,455,000** |

The Year 2 and Year 3 license reflects a 5% multi-year commitment discount applied at contract signature.

### Commercial Logic

For Interswitch, the primary commercial justification for DALP is operational cost avoidance rather than net-new revenue. The settlement reconciliation process currently requires significant manual labour across Interswitch's treasury and operations teams: matching settlement cycle records against participant bank statements, resolving timing mismatches, assembling evidence for CBN regulatory requests, and managing exception queues when settlement fails. DALP automates the evidence generation side of this process and provides deterministic identifiers that reconciliation systems can match without manual intervention.

A conservative estimate of three reconciliation analysts at N15 million loaded cost each (approximately $18,000 USD per analyst at current exchange rates) represents approximately $54,000 in annual labour cost. At scale, with higher analyst costs and broader scope, the operational efficiency value is clearer in the executive sponsorship conversation than in a simple cost model.

The more compelling value driver for Interswitch is risk reduction: CBN supervisory requests that currently require days of log correlation can be fulfilled from the Chain Indexer API in minutes. Settlement disputes with participant banks can be resolved against an immutable on-chain record rather than competing internal ledger claims. These risk reduction benefits are harder to quantify but are the primary driver of procurement urgency.

---

## Investment Summary

| Decision Factor | Detail |
|---|---|
| Platform | DALP Enterprise Tier |
| Deployment model | On-premises (Interswitch data centres) or private cloud |
| Participant scope | All CBN-licensed participant banks in settlement network |
| Environments | Production + UAT + DR + Dev + Test (5 total) |
| Support tier | Premium (24/7/365) |
| Implementation duration | 20 weeks to first pilot settlement cycle |
| Year 1 total | $735,000 |
| 3-year TCO (base) | $1,455,000 |
| Key commercial terms | Annual subscription, milestone-based implementation |

---

## Licensing and Subscription Model

### Philosophy

DALP licensing charges for platform access, not for settlement volume. As Interswitch processes more settlement cycles, adds more participant banks, and expands to new settlement use cases, the platform subscription does not increase. This model is appropriate for infrastructure operators who need cost predictability as volumes grow.

### What Is Included

| Category | Included |
|---|---|
| All asset contract types (StableCoin, Deposit, Bond and others) | Yes |
| All compliance modules | Yes |
| XvP Settlement addon (atomic multi-party settlement) | Yes |
| All token features | Yes |
| Vault multi-sig treasury addon | Yes |
| Asset Console operations UI | Yes |
| REST API (OpenAPI 3.1) and TypeScript SDK | Yes |
| Webhooks and SSE event streams | Yes |
| Chain Indexer (queryable event projection) | Yes |
| Observability stack | Yes |
| Platform updates and security patches | Yes |
| One production environment | Yes |

### What Varies

| Variable | Selection | Cost |
|---|---|---|
| Additional environments | UAT + DR = 2 additional | $25,000/year each |
| Deployment | On-premises or private cloud | Infrastructure costs are Interswitch-borne |
| Blockchain network | Private Hyperledger Besu | Interswitch-operated; infrastructure costs are Interswitch-borne |
| Key management | HSM tier for treasury | HSM hardware is Interswitch-procured |
| Support | Premium | $85,000/year |

### Platform Tier Comparison

| Feature | Foundation | Enterprise | Sovereign |
|---|---|---|---|
| Environments included | 1 | 1 | 3 |
| Dedicated deployment | No | Yes | Yes |
| Multi-region HA | No | Yes | Yes |
| Annual license | $180,000 | $240,000 | $280,000 |
| **Recommended for Interswitch** | | **Yes** | |

---

## Implementation Investment

### Implementation Phases

| Phase | Duration | Objective | Investment |
|---|---|---|---|
| Discovery and Requirements | 5 weeks | Architecture design, CBN ring-fencing design, integration landscape | $50,000 |
| Foundation and Setup | 5 weeks | Infrastructure, blockchain network, base platform | $60,000 |
| Configuration | 6 weeks | Settlement tokens, compliance modules, participant onboarding | $70,000 |
| Integration | 6 weeks | Settlement engine, reconciliation feeds, AML, SIEM | $80,000 |
| Testing and UAT | 8 weeks | Full testing programme, settlement cycle simulation, UAT | $65,000 |
| Go-Live and Hypercare | 8 weeks | Pilot cycle, production launch, hypercare | $35,000 |
| **Total** | **38 weeks** | | **$360,000** |

### Accelerators

- Pre-built settlement position token templates for Nigerian payment infrastructure
- Reference IBFT 2.0 blockchain configuration for on-premises deployment
- TypeScript SDK enabling Interswitch engineering team to build settlement engine integration in parallel
- Pre-built CBN ring-fencing compliance module configuration (country allow list + identity registry)

### Risks to Timeline

- On-premises infrastructure procurement and installation adds 3-5 weeks if HSM hardware not already available
- CBN regulatory engagement or approval process if required before production launch
- Participant bank readiness and onboarding data quality (identity documentation for all participant banks)
- Settlement engine integration complexity if existing settlement engine has non-standard API contract

### Training

| Audience | Content | Duration |
|---|---|---|
| Platform administrators | System configuration, environment management, blockchain node management | 2 days |
| Settlement operations | Settlement cycle management, exception handling, approval workflows | 2 days |
| Integration engineers | API integration, webhook consumption, Chain Indexer queries | 2 days |
| Compliance team | Compliance module management, block list operations, audit log access | 1 day |

---

## Support and Operational Costs

### Support Recommendation

Premium support is required for a production settlement infrastructure platform. Settlement cycle failures require immediate response, and the 24/7 coverage of Premium support is not discretionary for a core payment infrastructure operator.

### Support Tier Comparison

| Feature | Standard | Premium |
|---|---|---|
| Annual cost | $45,000 | $85,000 |
| Coverage | Business hours | 24/7/365 |
| P1 response | 4 hours | 1 hour |
| P2 response | 8 hours | 4 hours |
| Named support lead | No | Yes |
| Quarterly service reviews | No | Yes |

### Severity Matrix

| Severity | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Settlement cycle failure, production outage | 1 hour | 4 hours |
| P2 | Settlement delayed, compliance workflow blocked | 4 hours | 24 hours |
| P3 | Non-critical issue, workaround available | 8 hours | 72 hours |
| P4 | Enhancement, documentation | Next business day | Roadmap |

---

## Total Cost of Ownership Analysis

### 3-Year TCO: DALP

| Cost Category | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|
| Platform license | $240,000 | $228,000 | $228,000 | $696,000 |
| Additional environments (2) | $50,000 | $50,000 | $50,000 | $150,000 |
| Premium support | $85,000 | $85,000 | $85,000 | $255,000 |
| Implementation (one-time) | $360,000 | - | - | $360,000 |
| Post-launch training | - | $12,000 | $12,000 | $24,000 |
| **Subtotal** | **$735,000** | **$375,000** | **$375,000** | **$1,485,000** |

*Year 2-3 license reflects 5% multi-year discount. Infrastructure (blockchain nodes, Kubernetes, HSM) are Interswitch-borne. Estimated at $80,000-120,000/year for on-premises production grade.*

**3-year TCO including infrastructure: approximately $1,725,000-$1,845,000**

### Comparative Analysis

| Metric | DALP | Internal Build | Multi-Vendor Assembly |
|---|---|---|---|
| 3-year base cost | ~$1.5M | ~$3.5-4M | ~$2.5M (estimated) |
| Time to first pilot settlement | 20 weeks | 18-24 months | 12-18 months |
| CBN regulatory defensibility | ISO 27001 + SOC 2 Type II | Build cost + separate audit | Gap analysis required |
| Settlement atomicity | Native (XvP) | Must be built | Depends on vendor combination |
| Audit trail quality | Immutable on-chain | Build quality dependent | Multi-vendor correlation |

---

## Payment Terms and Commercial Structure

### Platform License

Annual subscription, invoiced in advance. Year 1 from contract execution. Years 2-3 at 5% discount if committed at contract signature.

### Implementation Payment Schedule

| Milestone | Payment | Amount |
|---|---|---|
| Contract execution | 25% | $90,000 |
| Phase 2 gate (infrastructure ready) | 20% | $72,000 |
| Phase 4 gate (integrations complete) | 30% | $108,000 |
| Phase 6 gate (production go-live) | 25% | $90,000 |
| **Total** | **100%** | **$360,000** |

### Payment Terms

Net 30 days from invoice. USD denomination. Late payment interest at 1.5% per month after 45-day grace period.

### Contract Duration

3-year initial term from production go-live. Automatic annual renewal unless 90-day notice. Early termination for cause: immediate with pro-rata refund. Early termination for convenience: 6-month notice, no refund of prepaid fees.

---

## Value Realisation and ROI Analysis

### Value Drivers

| Driver | Mechanism | Estimated Annual Benefit |
|---|---|---|
| Reconciliation automation | On-chain event feeds replace manual statement matching | $80,000-$200,000 |
| Regulatory evidence | On-demand API export replaces manual log correlation | $40,000-$100,000 |
| Settlement dispute resolution | Immutable record resolves participant disputes faster | $30,000-$80,000 |
| Settlement failure rate reduction | Durable execution reduces failed cycles | $50,000-$150,000 |
| Participant bank onboarding | Identity reuse reduces per-bank integration overhead | $20,000-$60,000 |

**Conservative annual benefit: $220,000-$590,000**

### Payback Analysis

| Scenario | Annual Benefit | 3-Year Net | Payback |
|---|---|---|---|
| Conservative | $220,000 | -$825,000 | Beyond 3 years |
| Expected | $400,000 | -$285,000 | 3.7 years |
| Upside | $590,000 | +$285,000 | 2.5 years |

The ROI case for Interswitch is primarily risk reduction and regulatory defensibility, which are difficult to quantify precisely at proposal stage. A value workshop using Interswitch's actual reconciliation team costs, CBN supervisory request frequency, and settlement dispute rates would provide a more precise payback model.

---

## Commercial Assumptions and Dependencies

- Deployment on Interswitch-managed infrastructure (on-premises or private cloud). Cloud-managed deployment reduces implementation cost by approximately $30,000.
- Interswitch provides 2 dedicated integration engineers during Phases 3 and 4. External integration support available at $1,500/day.
- CBN engagement and any required regulatory notification or approval is Interswitch's responsibility. Unexpected regulatory delays extend timeline without affecting fixed-price implementation.
- HSM hardware procurement is Interswitch's responsibility. SettleMint provides specifications and integration support.
- Participant bank identity documentation is available and accurate. Data quality issues extend Phase 3 onboarding timeline.
- Settlement engine has documented API or can expose settlement instructions in structured format. Non-standard settlement engine integration may increase Phase 4 effort.

---

## Contractual Framework Overview

### Agreement Structure

Two agreements: Master Subscription Agreement (platform license, IP ownership, data handling, liability, confidentiality) and Statement of Work (implementation scope, deliverables, milestones, acceptance criteria).

### Intellectual Property

DALP platform IP remains SettleMint's. All Interswitch data, settlement records, on-chain token state, and custom integration code remain Interswitch's.

### Liability

Cap: 12 months of preceding subscription fees. Mutual exclusion of consequential damages. Exceptions: gross negligence, wilful misconduct, data breach from SettleMint failure.

### Data Handling

SettleMint acts as data processor under a Data Processing Agreement (DPA). All data residency requirements under NDPC Act 2023 are configurable. SettleMint does not access production data without explicit Interswitch authorisation.

---

## Appendix A: Detailed Pricing Schedule

### Annual Recurring

| Line Item | Unit | Qty | Unit Price | Annual Total |
|---|---|---|---|---|
| DALP Enterprise License | Platform/year | 1 | $240,000 | $240,000 |
| Additional Environment (UAT) | Env/year | 1 | $25,000 | $25,000 |
| Additional Environment (DR) | Env/year | 1 | $25,000 | $25,000 |
| Premium Support | Tier/year | 1 | $85,000 | $85,000 |
| **Total Annual Recurring** | | | | **$375,000** |

### Implementation (One-Time)

| Phase | Description | Price |
|---|---|---|
| Phase 1 | Discovery and Requirements | $50,000 |
| Phase 2 | Foundation and Setup | $60,000 |
| Phase 3 | Configuration | $70,000 |
| Phase 4 | Integration | $80,000 |
| Phase 5 | Testing and UAT | $65,000 |
| Phase 6 | Go-Live and Hypercare | $35,000 |
| **Total** | | **$360,000** |

---

## Appendix B: Implementation Milestone and Payment Schedule

| Milestone | Deliverable | Payment | Amount | Target |
|---|---|---|---|---|
| Contract execution | Signed MSA + SoW | 25% | $90,000 | Week 0 |
| Phase 2 gate | Infrastructure and platform operational | 20% | $72,000 | Week 10 |
| Phase 4 gate | All integrations complete and tested | 30% | $108,000 | Week 22 |
| Phase 6 gate | Production go-live achieved | 25% | $90,000 | Week 38 |
| **Total** | | **100%** | **$360,000** | |

---

*This document is classified SettleMint Confidential. Distribution is restricted to authorised Interswitch procurement personnel.*
