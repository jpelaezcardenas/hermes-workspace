# Commercial Proposal: Wholesale CBDC Pilot Infrastructure

**Prepared for:** Bank of England
**Document Title:** Commercial Proposal. Wholesale CBDC Pilot Infrastructure
**RFP Reference:** BANKOFENGLAND-RFP-202603
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

## 1. Executive Summary

The Bank of England requires a production-grade digital asset platform capable of supporting wholesale CBDC pilot infrastructure under FMI governance, UK Operational Resilience regime requirements, and the governance authority model of a central bank operating systemic payment infrastructure. The procurement document makes clear this is not a research experiment; it is a controlled assessment of production-grade capability.

The commercial decision facing the Bank is whether to build, assemble from multiple vendors, or adopt a governed platform. Building bespoke wholesale CBDC infrastructure carries a minimum 24-36 month timeline and requires sustained engineering investment in areas where the Bank has no competitive advantage: EVM-compatible smart contract development, on-chain compliance enforcement, durable transaction orchestration, and institutional key management. Multi-vendor assembly introduces coordination complexity that runs directly counter to the Bank's stated desire to avoid manual breaks and opaque dependencies.

DALP provides the governed execution layer the Bank needs, already operating in production at central banks, market infrastructure operators, and regulated institutions across multiple jurisdictions. The commercial model is transparent: platform license, structured implementation at fixed price by phase, and support tier aligned to the systemic importance of the programme.

**Recommended commercial profile:**
- License tier: Sovereign (given the systemic nature of the programme and the Bank's governance requirements)
- Deployment model: Private Cloud (Bank-managed UK region) with on-premises upgrade path
- Implementation: Fixed-price, 32-week phased delivery
- Support tier: Enterprise (24/7, dedicated SRE, 99.99% uptime SLA)

**Commercial headline:** Total 3-year investment (license, implementation, support, infrastructure) in the range [CLIENT-SPECIFIC: indicative EUR 2.5M–4.5M depending on scope validation]. This compares to an estimated build cost of EUR 6-12M+ for equivalent capability developed in-house, without the benefit of production-proven architecture, existing compliance modules, or institutional custody integrations.

*All specific pricing figures in this document are indicative and will be finalized through commercial discussion following scope validation.*

---

## 2. Investment Rationale

### 2.1 Cost of Current Approach

The Bank of England currently has no production wholesale CBDC infrastructure. The relevant cost comparison is therefore build versus buy, with a secondary comparison to multi-vendor assembly.

**Build-from-scratch path:**

A realistic in-house build programme for equivalent capability would require:

| Capability Area | Engineering Effort | Timeline |
|---|---|---|
| EVM-compatible smart contract development (ERC-3643 compliance engine, asset contracts, identity) | 4-6 FTE engineers, 12 months | 12+ months |
| Durable transaction orchestration layer | 3-4 FTE platform engineers, 9 months | 9-12 months |
| Institutional key management and HSM integration | 2-3 FTE security engineers, 6 months | 6-9 months |
| Observability and operational tooling | 2 FTE DevOps engineers, 6 months | 6 months |
| Integration framework (API, webhooks, RTGS) | 3 FTE integration engineers, 9 months | 9 months |
| Testing, security assurance, and pilot | 2-3 FTE QA/security, 6 months | 6 months |

**Estimated build cost:** EUR 6-12M+ including staff costs, infrastructure, security auditing, and 2 years of engineering time. This estimate assumes the Bank could recruit the required specialized skills at market rates, which is a significant operational assumption.

**Hidden costs of build approach:**
- Permanent engineering dependency: the built platform requires ongoing maintenance, security patching, and feature development. No exit path.
- No production validation: built platform is unproven at institutional scale. The Bank bears all pilot and production readiness risk.
- No regulatory precedent: existing DALP deployments at comparable institutions provide the Bank with reference architecture evidence that a clean-sheet build cannot offer.
- Compliance module development: DALP ships 18 production-ready compliance modules. Building equivalent capability from scratch requires sustained regulatory and technical investment.

**Multi-vendor assembly path:**

Assembling token issuance, compliance enforcement, custody, settlement, and reporting from separate vendors introduces:
- Multiple contract negotiations and vendor onboarding cycles
- Cross-vendor incident resolution complexity
- Inconsistent audit trails and reporting semantics
- Architectural drift as independent components evolve at different rates
- 3-4x the integration engineering effort compared to a single platform

The Bank's procurement document explicitly identifies avoiding "opaque dependencies" and "manual breaks" as programme objectives. Multi-vendor assembly is structurally opposed to those objectives.

### 2.2 Why DALP Changes Economics

DALP collapses the multi-component assembly into a single governed platform. The commercial implications are:

| Cost Driver | Without DALP | With DALP |
|---|---|---|
| Compliance module development | 12+ months, high cost | Included in platform license |
| Custody integration | Separate contract, integration build | Included: DFNS, Fireblocks, HSM |
| Settlement coordination | Custom XvP build or separate vendor | Included: XvP addon |
| Observability stack | Separate build or tool procurement | Included: VictoriaMetrics, Loki, Grafana |
| Audit trail architecture | Custom build | Included: on-chain events + structured logs |
| API development | Custom REST API build | Included: OpenAPI 3.1 + TypeScript SDK |

The platform license is not just a software subscription. It is access to 7 years of production-hardened capabilities that would take 2-3 years to replicate internally.

### 2.3 ROI Framework

| Value Driver | Mechanism | Quantification Basis |
|---|---|---|
| Engineering cost avoidance | Platform replaces 18+ months of custom build | EUR 6-12M avoided engineering cost |
| Time-to-pilot | 32-week delivery vs 36+ month build | 2+ years faster pilot initiation |
| Compliance risk reduction | Ex-ante enforcement at smart contract layer | Regulatory penalty exposure reduced |
| Operational efficiency | Automated settlement, audit trail, monitoring | Ongoing operational cost reduction |
| Reuse across programs | Platform reusable for future BoE digital asset initiatives | Marginal cost per additional program much lower |

**Payback logic:** The differential between DALP 3-year TCO (indicative EUR 2.5-4.5M) and the build alternative (EUR 6-12M+) represents a direct cost avoidance of EUR 3-8M over the first 3 years, before accounting for operational efficiency and speed-to-pilot benefits.

---

## 3. Licensing Model

### 3.1 Philosophy

DALP uses a platform licensing model, not a per-transaction or per-token fee structure. The Bank's wCBDC pilot will execute compliance checks on every transfer, query participant eligibility on every onboarding, and generate audit evidence for every state transition. A per-operation pricing model would penalize precisely the behaviors the platform is designed to enable.

The annual platform subscription includes all core lifecycle capabilities, compliance modules, settlement addons, API surface, observability stack, and platform updates. The Bank's cost is predictable regardless of transaction volume growth during the pilot.

**Platform license vs. transaction fee model:**

| Dimension | DALP Platform License | Transaction-Fee Model |
|---|---|---|
| Compliance check cost | Included | Per check |
| Transfer cost | Included | Per transfer |
| Audit trail generation | Included | Per event |
| Scaling economics | Fixed cost regardless of volume | Increasing cost with volume |
| Budget predictability | High | Low |
| Pilot-to-production scaling risk | None | Significant |

### 3.2 What's Included

A DALP Sovereign tier license for the Bank of England programme includes:

- All five lifecycle pillars: Issuance, Compliance, Custody integration, Settlement, Servicing
- All compliance module types (18 types) including identity verification, jurisdiction restrictions, transfer approval workflows, supply caps, and timelock restrictions
- DALPAsset Configurable for wCBDC instrument design
- XvP addon for atomic settlement coordination
- Full API surface: REST API (OpenAPI 3.1), TypeScript SDK, webhooks
- Key Guardian with HSM integration support
- Observability stack: VictoriaMetrics, Loki, Tempo, Grafana with pre-built dashboards
- All platform updates, security patches, and compliance module updates during license term
- Hyperledger Besu private network deployment support
- Dedicated solution architect for Sovereign tier

### 3.3 What Varies by Engagement

| Variable Dimension | Bank of England Scope |
|---|---|
| Deployment model | Private Cloud (Bank-managed UK region) |
| Environment count | Development + Staging + Production (3 environments) |
| Network | Permissioned Hyperledger Besu (private) |
| Custody integration | HSM-backed Key Guardian; optional DFNS/Fireblocks |
| Support tier | Enterprise (24/7, dedicated SRE) |
| Implementation | Fixed-price 32-week delivery |

### 3.4 Platform Tiers

| Capability | Foundation | Enterprise | Sovereign (Recommended) |
|---|---|---|---|
| Core lifecycle pillars | All 5 | All 5 | All 5 |
| Compliance modules | All 18 | All 18 | All 18 + custom module support |
| Production environments | 1 | Multiple | Unlimited |
| Non-production environments | 1 | Multiple | Unlimited |
| Network support | Single | Multi-network | Multi-network, multi-region |
| Custody integration | 1 provider | Multi-provider | Full flexibility + custom |
| Support tier | Standard | Premium | Enterprise |
| Dedicated Solution Architect | Shared | Onboarding only | Ongoing dedicated |
| Custom SLA | Standard | Negotiated | Fully custom |
| Governance controls depth | Standard | Enhanced | Maximum, designed for FMI |
| Annual license fee (indicative) | EUR [CLIENT-SPECIFIC: ~300K-500K/year] | EUR [CLIENT-SPECIFIC: ~600K-900K/year] | EUR [CLIENT-SPECIFIC: ~1.2M-2M/year] |

**Recommended tier: Sovereign.** The Bank of England's requirements for FMI-grade governance controls, UK Operational Resilience obligations, central bank governance authority preservation, and dedicated strategic engagement align with the Sovereign tier. The Foundation and Enterprise tiers are appropriate for commercial banks and market operators without the Bank's specific systemic governance requirements.

---

## 4. Deployment Options and Pricing

### 4.1 Model Overview

| Model | BoE Suitability | Key Advantage | Key Constraint |
|---|---|---|---|
| Managed SaaS | Not recommended | Fastest deployment | Data residency not guaranteed within UK |
| Private Cloud (Bank-managed) | Recommended | Full UK data residency, Bank infrastructure control | Requires Bank Kubernetes/cloud capability |
| On-Premises | Option | Maximum control, air-gap capable | Longest timeline, highest operational overhead |
| Hybrid | Possible | Flexibility per component | Increased integration complexity |

### 4.2 Recommended: Private Cloud (Bank-Managed UK Region)

The Bank manages DALP on its own cloud subscription (AWS UK Region or Azure UK South). SettleMint provides Helm charts, deployment documentation, and implementation support. The Bank retains full infrastructure control.

**Cost structure:**

| Cost Category | Scope | Frequency |
|---|---|---|
| Platform license (Sovereign) | Full lifecycle capabilities | Annual |
| Cloud infrastructure | Kubernetes (EKS/AKS), PostgreSQL, Redis, object storage, HSM | Monthly (Bank-borne) |
| Implementation services | 32-week fixed-price delivery | One-time |
| Enterprise support | 24/7 dedicated SRE | Annual |
| HSM | FIPS 140-2 Level 3 hardware | One-time (Bank-borne) or lease |

**Infrastructure cost estimate (Bank-borne, indicative):**

| Component | Monthly Estimate (indicative) |
|---|---|
| Kubernetes cluster (EKS 3-AZ) | EUR 3,000-6,000 |
| PostgreSQL RDS Multi-AZ | EUR 1,500-3,000 |
| Besu validator nodes (4 EC2) | EUR 2,000-4,000 |
| Redis ElastiCache | EUR 500-1,000 |
| Object storage | EUR 200-500 |
| Load balancer, networking, egress | EUR 500-1,000 |
| **Total infrastructure (indicative)** | **EUR 7,700-15,500/month** |

Note: Infrastructure costs are borne by the Bank and are pass-through. SettleMint does not mark up cloud infrastructure costs.

### 4.3 Cost Drivers

Factors that increase total cost:
- On-premises deployment (higher implementation complexity, longer timeline)
- HSM on-premises rather than cloud-managed KMS
- Additional environment count beyond 3
- Multi-region DR site (hot-warm architecture)
- Custom compliance module development
- Extended implementation timeline due to Bank governance review cycles

Factors that reduce total cost:
- Bank-provided Kubernetes infrastructure (reduces implementation scope)
- Multi-year license commitment (discount applicable)
- Bank self-managed cloud infrastructure (no SettleMint infrastructure management)

---

## 5. Support and SLA Framework

### 5.1 Tiers

| Capability | Standard | Premium | Enterprise (Recommended) |
|---|---|---|---|
| Coverage | 09:00-18:00 CET Mon-Fri | 07:00-22:00 CET Mon-Fri | 24/7/365 |
| P1 Response | 4 hours | 1 hour | 15 minutes |
| P1 Resolution Target | 8 hours | 4 hours | 2 hours |
| Channels | Email, Portal | + Slack, Phone | + Video, dedicated escalation |
| Dedicated SRE | Shared | Designated at onboarding | Named dedicated SRE |
| Platform Updates | Quarterly | Monthly | Continuous staged |
| Business Reviews | Quarterly | Monthly | Bi-weekly |
| Architecture Reviews | None | None | Quarterly with Solution Architect |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Annual fee (indicative) | EUR [CLIENT-SPECIFIC: ~80K-120K] | EUR [CLIENT-SPECIFIC: ~150K-250K] | EUR [CLIENT-SPECIFIC: ~300K-500K] |

**Recommended tier: Enterprise.** The Bank of England's Operational Resilience obligations, the systemic importance of wCBDC infrastructure, and the Bank's requirement for evidence-based support model make Enterprise Support the only appropriate choice.

### 5.2 Severity Levels

| Level | Definition | Response | Resolution Target |
|---|---|---|---|
| P1 Critical | Production down; wCBDC transfers blocked; compliance engine unavailable | 15 minutes | 2 hours |
| P2 High | Major function impaired; no critical path blocked; workaround available | 1 hour | 4 hours |
| P3 Medium | Non-critical function impaired; workaround available | 4 hours | 2 business days |
| P4 Low | General inquiry; documentation; feature request | 1 business day | Next release cycle |

### 5.3 Uptime SLA

| Tier | Monthly Uptime Target | Maximum Downtime |
|---|---|---|
| Enterprise | 99.99% | 4.38 minutes/month |
| Premium | 99.95% | 21.9 minutes/month |
| Standard | 99.9% | 43.8 minutes/month |

Measurement basis: Availability of the DALP API layer as measured from the ingress endpoint. Excludes planned maintenance windows with minimum 2-week advance notice.

Service credit mechanics: Downtime below the SLA target in any calendar month entitles the Bank to service credits per the agreed credit schedule (details subject to contract negotiation).

### 5.4 Escalation

L1 (triage, initial response) → L2 (platform engineering, fix development) → L3 (engineering leadership, architectural review) → Executive escalation (systemic incidents).

For P1 incidents: dedicated incident channel open within 15 minutes; status updates every 30 minutes; L3 escalation if no resolution path within 30 minutes; executive escalation if no resolution within 2 hours.

BoE incident notification: P1 incidents notified to designated Bank contacts within 4 hours per DORA-aligned procedures.

### 5.5 Maintenance

Planned maintenance: Pre-agreed windows (typically Saturday 02:00-06:00 UTC). Minimum 2-week advance notice. Changes deployed to staging and Bank-approved before production.

Security patches: Critical vulnerabilities within 24 hours. High vulnerabilities within 72 hours. Staged through staging environment before production.

Release cadence (Enterprise): Continuous staged rollout with Bank sign-off gate before production deployment.

---

## 6. Implementation Investment

### 6.1 Methodology

The 32-week implementation follows a phase-gated model. Each phase has fixed-price scoping, defined deliverables, and formal acceptance gates. Implementation cost is not open-ended; it is bounded by phase scope agreements. Scope changes outside the agreed phase scope are handled through change control with agreed impact assessment.

### 6.2 Phase Summary

| Phase | Duration | Key Deliverables | Investment (indicative) |
|---|---|---|---|
| Phase 1: Discovery and Requirements | 3 weeks | BRD, Regulatory Matrix, Architecture Document, RACI | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Phase 2: Foundation and Setup | 5 weeks | Provisioned environments (dev/staging/prod), Besu network, Key management, Observability | EUR [CLIENT-SPECIFIC: ~200K-350K] |
| Phase 3: Configuration and Compliance | 7 weeks | wCBDC contract config, Compliance modules, Integration designs, Governance procedures | EUR [CLIENT-SPECIFIC: ~250K-400K] |
| Phase 4: Integration and Testing | 9 weeks | RTGS integration, SIEM integration, Test reports (functional/security/perf/DR), UAT sign-off | EUR [CLIENT-SPECIFIC: ~350K-550K] |
| Phase 5: Production Deployment and Parallel Run | 5 weeks | Production deployment, Parallel run reconciliation reports | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Phase 6: Hypercare and Transition | 3 weeks | Hypercare report, Documentation, Training certificates, Support transition | EUR [CLIENT-SPECIFIC: ~100K-200K] |
| **Total Implementation** | **32 weeks** | | **EUR [CLIENT-SPECIFIC: ~1.2M-2.0M]** |

*All figures are indicative planning ranges. Firm pricing is provided following Phase 1 scope validation.*

### 6.3 Implementation Pricing Summary Table

| Phase | Duration | Fixed/T&M | Investment Range |
|---|---|---|---|
| Discovery and Requirements | 3 weeks | Fixed | EUR [CLIENT-SPECIFIC] |
| Foundation and Setup | 5 weeks | Fixed | EUR [CLIENT-SPECIFIC] |
| Configuration and Compliance | 7 weeks | Fixed | EUR [CLIENT-SPECIFIC] |
| Integration and Testing | 9 weeks | Fixed | EUR [CLIENT-SPECIFIC] |
| Production and Parallel Run | 5 weeks | Fixed | EUR [CLIENT-SPECIFIC] |
| Hypercare and Transition | 3 weeks | Fixed | EUR [CLIENT-SPECIFIC] |
| **Total** | **32 weeks** | **Fixed price by phase** | **EUR [CLIENT-SPECIFIC]** |

### 6.4 Accelerators

| Accelerator | Impact |
|---|---|
| Hyperledger Besu deployment patterns | Pre-built Besu configuration templates reduce network setup time |
| ERC-3643 compliance module library | 18 pre-built modules; no custom compliance code required for standard policy constraints |
| RTGS integration pattern library | ISO 20022 messaging patterns for RTGS integration reduce interface design time |
| DALP observability stack | Pre-built Grafana dashboards; no custom monitoring development |
| Sovereign deployment reference architecture | Pre-defined governance model for central bank authority separation |

### 6.5 Risks to Implementation Budget

| Risk | Budget Impact | Mitigation |
|---|---|---|
| Extended Bank governance approval cycles | +5-15% to Phase 1 and 3 | Buffer built into phase duration estimates |
| HSM procurement delay | +2-4 weeks Phase 2 | Early procurement initiation; cloud KMS fallback |
| Unanticipated RTGS interface complexity | +10-20% to Phase 4 | Interface workshop in Phase 1; change control |
| Additional compliance requirements discovered in Phase 3 | +5-10% to Phase 3 | Change control with impact assessment |

### 6.6 Training Investment

Training is included within the implementation investment as part of Phase 6. Additional training for new staff joining after go-live is available at EUR [CLIENT-SPECIFIC: ~5K-15K per additional cohort].

| Training Track | Duration | Audience | Included |
|---|---|---|---|
| Administrator Track | 3-4 days | Platform admins, DevOps | Yes. Phase 6 |
| Developer Track | 4-5 days | Integration developers, architects | Yes. Phase 6 |
| End-User / Operations Track | 2 days | Operations, compliance staff | Yes. Phase 6 |
| Additional cohort training | Variable | New joiners, role changes | Optional add-on |

---

## 7. Total Cost of Ownership

### 7.1 TCO Framework

The correct comparison for the Bank's investment decision is not DALP annual license cost versus a single alternative software subscription. The correct comparison is the total cost of operating the wCBDC infrastructure over a multi-year period, including implementation, licensing, support, infrastructure, and ongoing maintenance, against the equivalent cost of building and operating bespoke infrastructure.

Categories included in the TCO model:
- Platform license (annual, recurring)
- Implementation services (one-time, front-loaded)
- Enterprise support (annual, recurring)
- Bank-borne infrastructure (annual, recurring)
- Training (one-time, with ongoing for new joiners)

Categories excluded (not borne by SettleMint or not applicable):
- Bank internal governance and legal costs
- Regulator engagement costs
- Bank staff costs for programme management

### 7.2 Three-Year TCO Model (DALP)

| Year | Platform License | Implementation | Enterprise Support | Infrastructure (Bank) | Total |
|---|---|---|---|---|---|
| Year 1 | EUR [CLIENT-SPECIFIC: ~1.5M] | EUR [CLIENT-SPECIFIC: ~1.5M] | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~150K] | EUR [CLIENT-SPECIFIC: ~3.5M] |
| Year 2 | EUR [CLIENT-SPECIFIC: ~1.5M] | EUR 0 | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~180K] | EUR [CLIENT-SPECIFIC: ~2.1M] |
| Year 3 | EUR [CLIENT-SPECIFIC: ~1.5M] | EUR 0 | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~180K] | EUR [CLIENT-SPECIFIC: ~2.1M] |
| **3-Year Total** | | | | | **EUR [CLIENT-SPECIFIC: ~7.7M]** |

*Year 1 is front-loaded due to one-time implementation cost. Years 2-3 reflect steady-state operating cost.*

### 7.3 Five-Year TCO Model (DALP)

| Year | Platform License | Implementation | Support | Infrastructure | Total |
|---|---|---|---|---|---|
| Year 1 | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Year 2 | [CLIENT-SPECIFIC] | 0 | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Year 3 | [CLIENT-SPECIFIC] | 0 | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Year 4 | [CLIENT-SPECIFIC] | 0 | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC + expansion] | [CLIENT-SPECIFIC] |
| Year 5 | [CLIENT-SPECIFIC] | 0 | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC + expansion] | [CLIENT-SPECIFIC] |
| **5-Year Total** | | | | | **EUR [CLIENT-SPECIFIC: ~12-15M]** |

*Year 4-5 assumes potential expansion to additional wCBDC programs or digital instrument types on the same platform. Marginal cost of expansion is significantly lower than Year 1 due to platform reuse.*

### 7.4 Comparative Analysis: DALP vs. Build vs. Multi-Vendor

| Criterion | DALP | Build In-House | Multi-Vendor Assembly |
|---|---|---|---|
| 3-year total cost | EUR [CLIENT-SPECIFIC: ~7.7M] | EUR 15-25M+ | EUR 10-18M+ |
| Time to pilot | 32 weeks | 24-36 months | 18-30 months |
| Production validation | 7+ years of production track record | None at launch | Component-level only |
| Compliance module coverage | 18 modules, production-proven | Custom-built | Fragmented across vendors |
| Audit trail quality | Immutable on-chain + structured off-chain | Design-dependent | Inconsistent across vendors |
| Integration with Bank systems | Documented API, ISO 20022 | Custom-built | Multiple integration points |
| Exit portability | Documented exit support; Helm charts portable | None | Data trapped across vendors |
| Ongoing maintenance burden | SettleMint-managed (included in license) | Permanent Bank engineering obligation | Per-vendor maintenance contracts |
| Regulatory evidence | Production deployments at comparable FMIs | None available | Component-level only |

The build-in-house comparison is particularly stark: even the optimistic EUR 15M 3-year build estimate assumes the Bank can recruit and retain specialized EVM, distributed systems, and institutional security engineering talent at competitive rates, and that the first-generation system performs reliably in pilot conditions. Neither assumption is certain.

---

## 8. Commercial Terms

### 8.1 Contract Structure

| Agreement | Scope | Term |
|---|---|---|
| Platform License Agreement | DALP Sovereign tier license; all included capabilities | Annual, renewable; initial term 3 years recommended |
| Implementation Services Agreement | Fixed-price phased delivery; 32 weeks | One-time; milestone-based payment |
| Enterprise Support Agreement | 24/7 support; dedicated SRE; uptime SLA | Annual, co-terminus with license |
| Source Code Escrow (optional) | DALP source code access on defined trigger events | Separate negotiation; available on request |

### 8.2 Payment Schedule

| Milestone | Payment Trigger | Amount |
|---|---|---|
| Contract execution | Contract signing | EUR [CLIENT-SPECIFIC: ~20% of implementation] |
| Phase 1 completion | Gate 1 sign-off | EUR [CLIENT-SPECIFIC: ~15% of implementation] |
| Phase 2 completion | Gate 2 sign-off | EUR [CLIENT-SPECIFIC: ~15% of implementation] |
| Phase 3 completion | Gate 3 sign-off | EUR [CLIENT-SPECIFIC: ~20% of implementation] |
| Phase 4 completion | Gate 4 sign-off | EUR [CLIENT-SPECIFIC: ~20% of implementation] |
| Go-Live acceptance | Phase 5 gate sign-off | EUR [CLIENT-SPECIFIC: ~10% of implementation] |
| Platform license | Annual in advance | EUR [CLIENT-SPECIFIC] per year |
| Enterprise support | Annual in advance | EUR [CLIENT-SPECIFIC] per year |

### 8.3 Duration

Initial term: 3 years from license activation (recommended; shorter terms available with adjusted pricing).

License activation: Triggered by Phase 5 production go-live or agreed long-stop date, whichever is earlier.

Implementation timeline: 32 weeks from kickoff. Long-stop date for Phase 5 completion: 40 weeks from kickoff (subject to agreed change control for scope changes).

### 8.4 Renewal

License renewals: 90 days notice before expiry. Renewal pricing at [CLIENT-SPECIFIC: indicatively at most CPI-indexed current rate]. Multi-year renewal commitments carry preferential pricing.

Early renewal: Available from 6 months before expiry with [CLIENT-SPECIFIC] incentive.

### 8.5 Termination

For cause: Either party may terminate for material breach unremedied within 30 days of written notice.

For convenience: Bank may terminate with 90 days notice after the initial 12 months of the license term, subject to [CLIENT-SPECIFIC: fair wind-down provisions].

Upon termination: SettleMint provides 90 days of transition assistance. Bank receives full data export, configuration documentation, and audit log export. Blockchain state on the Bank's private Besu network remains accessible to the Bank independently of SettleMint.

### 8.6 Intellectual Property

DALP platform IP: Owned by SettleMint. The Bank receives a license to use the platform, not ownership of platform code.

Client data: All data generated by the Bank's operations on DALP is owned by the Bank. This includes wCBDC transaction records, participant identity records, audit logs, and compliance evidence.

Client configurations: Smart contract configurations, compliance module configurations, and operational procedures developed during implementation are owned by the Bank or jointly by agreement.

Integration adapters: Integration code developed specifically for Bank systems (e.g., RTGS adapter) is owned by the Bank upon delivery and payment.

### 8.7 Liability

Liability cap: SettleMint's aggregate liability under the agreements is capped at [CLIENT-SPECIFIC: typically 12 months of total fees paid in the preceding 12 months].

Excluded from cap: Fraud, wilful misconduct, death/personal injury, IP indemnification obligations.

SettleMint carries professional indemnity insurance and cyber risk insurance at limits appropriate for engagements of this nature. Evidence available during due diligence.

### 8.8 Confidentiality

Mutual confidentiality obligations apply for the term of the agreements plus 5 years post-termination. Standard carve-outs for publicly available information, independent development, and regulatory disclosure obligations.

### 8.9 Escrow

Source code escrow is available through a qualified third-party escrow agent. Trigger events (access conditions) are subject to commercial negotiation but typically include SettleMint insolvency, cessation of DALP development, or material support failure persisting beyond defined cure periods.

The Bank's Besu network and all on-chain state remain accessible to the Bank independently of the escrow arrangement, providing a baseline continuity guarantee that does not depend on escrow trigger invocation.

---

## 9. Reference Clients

### 9.1 Track Record

| Client | Geography | Use Case | Deployment Scale | Outcome / Relevance |
|---|---|---|---|---|
| Central Bank of UAE | UAE | Digital Dirham CBDC infrastructure | National scale, central bank governance | Direct CBDC governance model; BoE governance requirements directly comparable |
| Clearstream | Luxembourg | Tokenized collateral management | International CSD scale | FMI integration, post-trade architecture, CSDR/DORA compliance |
| OCBC Bank | Singapore | Tokenized corporate bonds | Production, multi-asset | Production bond lifecycle under MAS; 7+ years continuous |
| National Bank of Egypt | Egypt | Digital asset core infrastructure | National banking scale | Sovereign-scale deployment, central bank oversight |
| FirstRand | South Africa | Digital bond platform | Wholesale banking scale | Wholesale institutional bond platform |
| Standard Bank | South Africa | Tokenized securities | Multi-product | Multi-asset regulated securities platform |
| Deutsche Bank | Germany | Digital bonds issuance | Tier-1 bank scale | EU regulatory framework, MiCA/MiFID II alignment |
| BNP Paribas | France | Tokenized funds | Large-scale fund distribution | Multi-jurisdiction fund tokenization |

### 9.2 Case Studies

**Central Bank of UAE. Digital Dirham:**

The Central Bank of UAE required infrastructure that preserved central bank policy authority while enabling governed digital currency operations. DALP was deployed on a permissioned network within CBUAE infrastructure. The GOVERNANCE_ROLE was assigned to CBUAE wallet addresses, ensuring that no configuration change could occur without central bank authorization. The programme demonstrated the exact governance authority model the Bank of England requires: central bank retains policy authority; platform provides governed, auditable execution.

**Clearstream. Tokenized Collateral:**

Clearstream required a platform that could integrate with existing custody infrastructure, valuation services, and settlement systems while providing on-chain compliance enforcement and full CSDR/DORA-aligned auditability. DALP's XvP addon provided atomic settlement coordination. The integration architecture demonstrated DALP's capability to operate within existing FMI control estates without wholesale replacement. This directly parallels the Bank's requirement for integration with RTGS and supervisory reporting systems.

**National Bank of Egypt:**

National-scale deployment with multi-product support, central bank oversight requirements, and evidence retention for supervisory access. The programme demonstrated operational resilience at sovereign scale and the ability to satisfy central bank audit and governance requirements. Relevant to the Bank's need for a platform that survives institutional oversight scrutiny.

---

## 10. Next Steps

SettleMint recommends the following path from this commercial proposal to contract execution:

| Step | Purpose | Output | Indicative Timing | Owner |
|---|---|---|---|---|
| Commercial and technical Q&A | Address clarification questions from Bank evaluation team | Written responses to all questions | Within 2 weeks of proposal submission | SettleMint |
| Scoping workshop (1-2 days) | Validate deployment scope, integration requirements, governance model | Refined scope basis for firm pricing | Week 3-4 post-proposal | Joint |
| Due diligence session | Security review, reference calls, certification review | SettleMint due diligence package | Week 4-6 post-proposal | Joint |
| Firm commercial proposal | Client-specific pricing based on validated scope | Fixed-price implementation quote, confirmed license and support fees | Week 5-7 post-proposal | SettleMint |
| Proof of Concept (optional) | Sandbox demonstration of wCBDC governance model and compliance enforcement | Technical confidence for Bank architecture review | 3-4 weeks concurrent with firm proposal | Joint |
| Contract negotiation | Legal review of License, Implementation, and Support agreements | Executed agreements | Week 8-12 post-proposal | Joint |
| Programme kickoff | Phase 1 initiation | Delivery plan confirmed | Week 1 post-contract | Joint |

**Contact:** To proceed to the next step or to submit clarification questions, contact the SettleMint Digital Assets Programme team at the details provided in the accompanying cover communication.

---

*Document Classification: SettleMint Confidential*
*Version 1.0 Draft. March 2026*
*For Bank of England evaluation purposes only*
*All pricing figures marked [CLIENT-SPECIFIC] are indicative planning ranges and subject to commercial discussion and scope validation*
