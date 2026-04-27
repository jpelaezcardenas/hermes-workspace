# Commercial Proposal: Digital Asset Marketplace Platform

**Prepared for:** London Stock Exchange Group (LSEG)
**Document Title:** Commercial Proposal. Digital Asset Marketplace Platform
**RFP Reference:** LSEG-RFP-DIGITAL-ASSET-MARKETPLACE-PLATFORM-202603
**Submission Date:** March 2026
**Version:** 1.0
**Classification:** SettleMint Confidential

**Prepared by:** SettleMint NV
**Primary Contact:** Digital Assets Programme. SettleMint Enterprise

---

## Table of Contents

1. Executive Summary
2. Licensing Model
3. Recommended Tier
4. Implementation Services Pricing
5. Support Tier
6. Environment Costs
7. Three-Year TCO Analysis
8. ROI Analysis
9. Payment Terms
10. Optional Items
11. Third-Party Costs
12. Commercial Assumptions Register
13. Contractual Baseline

---

## 1. Executive Summary

This commercial proposal sets out the pricing, licensing, and contractual framework for SettleMint's Digital Asset Lifecycle Platform (DALP) deployment in support of LSEG's Digital Asset Marketplace Platform programme under the UK Digital Securities Sandbox.

LSEG's programme represents a foundational infrastructure investment rather than a discretionary technology upgrade. The platform will underpin a regulated marketplace for tokenized securities, operating under the FCA's DSS framework and subject to the Bank of England's Operational Resilience rules. The commercial structure reflects this reality: DALP is offered as a platform license with predictable annual costs, not per-transaction pricing that creates margin uncertainty at scale.

The recommended structure for LSEG comprises:
- **DALP Enterprise Platform License:** Annual subscription covering all asset classes, all 18 compliance modules, full API access, and unlimited participants
- **Implementation Services:** Fixed-price 19-week delivery programme, phased and milestone-gated
- **Enterprise Support SLA:** 99.99% uptime, 24/7/365 coverage, named engineer, war-room P1 escalation

All pricing figures in this proposal are marked [CLIENT-SPECIFIC] and will be confirmed in the formal commercial submission following completion of the technical evaluation phase. The structure, terms, and assumptions set out here reflect SettleMint's standard enterprise engagement model for Tier 1 FMI operators.

**Three-year total cost of ownership** is structured to provide LSEG with full cost predictability: implementation services are fixed-price; platform licensing and support fees are fixed for the initial contract term; infrastructure costs are scoped based on confirmed deployment architecture.

---

## 2. Licensing Model

### 2.1 Platform License Structure

DALP is licensed as an annual platform subscription. The subscription model provides:

| Feature | Included |
|---|---|
| All asset classes (equities, bonds, funds, structured products) | Yes |
| All 18 compliance modules | Yes |
| Full REST API (OpenAPI 3.1) | Yes |
| TypeScript SDK | Yes |
| Unlimited token types and asset contracts | Yes |
| Unlimited participants (with applicable KYC/AML costs on LSEG) |  Yes |
| Asset Console (operator UI) | Yes |
| Chain Indexer and event streaming | Yes |
| XvP settlement addon | Yes |
| Feeds System | Yes |
| Standard observability dashboards | Yes |
| Software updates and security patches | Yes |

**No per-transaction fees.** LSEG pays a fixed annual license fee regardless of transaction volume, settlement count, or number of active participants. This eliminates commercial uncertainty as the platform scales.

### 2.2 License Tiers

| Tier | Target | Uptime SLA |
|---|---|---|
| Standard | Pilot/development | 99.9% |
| Premium | Production FMI | 99.95% |
| Enterprise | Systemically important FMI | 99.99% |

SettleMint recommends the **Enterprise** license tier for LSEG, consistent with LSEG's FMI status and Operational Resilience obligations.

### 2.3 Deployment Model

LSEG's deployment is **Private Cloud (On-Premises compatible)** within LSEG-controlled UK data centres. The platform is delivered as a Helm/Kubernetes deployment package with:

- Full source-available deployment configuration
- LSEG-controlled infrastructure (no data leaves LSEG's environment)
- SettleMint-managed software updates delivered as versioned container images
- LSEG retains infrastructure control; SettleMint provides platform support

---

## 3. Recommended Tier

### 3.1 Enterprise Tier Justification

LSEG qualifies for and requires the Enterprise tier on all dimensions:

**Regulatory obligation:** The FCA Operational Resilience rules require LSEG to demonstrate impact tolerance mapping and recovery time objectives for all Important Business Services. A sub-99.99% platform SLA is incompatible with LSEG's regulatory commitments.

**Market hours:** LSEG operates regulated markets with defined trading hours. Platform unavailability during trading hours constitutes a notifiable operational incident under DSS and FCA reporting requirements. Enterprise SLA's zero planned maintenance during trading hours provision is mandatory.

**Systemic importance:** As a Recognised Investment Exchange, LSEG's marketplace infrastructure is systemically significant. The Enterprise war-room P1 escalation model, with direct CTO access, reflects the seriousness with which SettleMint treats availability obligations for FMI operators.

**Dedicated resourcing:** LSEG's platform complexity, including multi-asset support, DSS regulatory requirements, and integration with multiple LSEG systems, requires a named engineer with deep institutional knowledge of the specific deployment. This is only available under Enterprise.

### 3.2 Enterprise SLA Summary

| Parameter | Enterprise Commitment |
|---|---|
| Annual uptime | 99.99% |
| P1 acknowledgement | 15 minutes |
| P1 resolution target | 4 hours |
| P2 acknowledgement | 2 hours |
| P3 acknowledgement | 8 business hours |
| Support hours | 24/7/365 |
| Planned maintenance | Pre-agreed windows only, zero during trading hours |
| Dedicated Slack channel | Yes |
| Named engineer | Yes |
| P1 escalation | War-room with SettleMint CTO |
| Quarterly service reviews | Yes |
| Annual DR test participation | Yes |

---

## 4. Implementation Services Pricing

### 4.1 Fixed-Price Implementation

SettleMint delivers implementation as a fixed-price engagement. LSEG is protected against cost overruns arising from platform complexity or SettleMint resource estimates.

| Phase | Duration | Description | Price |
|---|---|---|---|
| Phase 1: Discovery | 2 weeks | Requirements validation, architecture design, integration planning | [CLIENT-SPECIFIC] |
| Phase 2: Foundation | 3 weeks | Infrastructure provisioning, Besu network deployment, core platform deployment | [CLIENT-SPECIFIC] |
| Phase 3: Configuration | 4 weeks | Asset templates, compliance modules, participant workflows, market models | [CLIENT-SPECIFIC] |
| Phase 4: Integration and Testing | 4 weeks | API integrations, surveillance, UAT, load testing, penetration testing | [CLIENT-SPECIFIC] |
| Phase 5: Go-Live and Hypercare | 6 weeks | DSS registration support, phased onboarding, hypercare monitoring | [CLIENT-SPECIFIC] |
| **Total Implementation** | **19 weeks** | **Fixed-price, milestone-gated** | **[CLIENT-SPECIFIC]** |

### 4.2 Payment Schedule (Implementation)

Implementation fees are milestone-gated:

| Milestone | Payment Trigger | Proportion |
|---|---|---|
| Contract signature | Programme commencement | 25% |
| Foundation sign-off | Infrastructure and network live | 20% |
| Configuration sign-off | Compliance officer review passed | 20% |
| UAT sign-off | Acceptance testing complete | 20% |
| Go-Live certificate | Production platform operational | 15% |

### 4.3 Change Request Process

Scope changes during implementation are managed via formal change requests:
- Minor changes (parameter adjustments, additional compliance module configuration): absorbed within existing phase budget
- Material changes (new integration scope, additional asset classes beyond initial configuration, extended testing): priced via change request, approved by both parties before execution
- Programme suspension and restart: re-mobilisation fee applies, quantum to be agreed

### 4.4 Travel and Expenses

Reasonable travel and accommodation expenses for on-site work at LSEG premises are invoiced at cost, with LSEG approval for individual items above [CLIENT-SPECIFIC] threshold. Remote-first delivery model minimises on-site requirements; on-site presence is planned for Discovery workshops, Go-Live, and quarterly reviews.

---

## 5. Support Tier

### 5.1 Enterprise Support Pricing

Enterprise support is priced as an annual fee, included within the Enterprise platform license bundle.

| Component | Annual Cost |
|---|---|
| Enterprise platform license (all features) | [CLIENT-SPECIFIC] |
| Enterprise support SLA | Included in platform license |
| Named engineer (dedicated to LSEG) | Included in platform license |
| Quarterly service reviews | Included |
| Annual DR test participation | Included |

Enterprise support commences at Go-Live and is priced for the initial 3-year term. Support renewal pricing is fixed for the initial term with a capped escalation mechanism thereafter.

### 5.2 Hypercare Period

The 6-week hypercare period within Phase 5 is included in the implementation fixed price. Hypercare provides:

- 24/7 named engineer monitoring during hypercare window
- Immediate response to any production issues
- Daily status calls with LSEG operations team
- Transition briefing to post-hypercare support model at week 6

Hypercare can be extended beyond 6 weeks at a weekly extension rate of [CLIENT-SPECIFIC] if LSEG requires additional stabilisation time before transitioning to standard Enterprise SLA.

---

## 6. Environment Costs

### 6.1 Infrastructure Sizing (Indicative)

The following environment configuration is recommended for LSEG's marketplace platform. Infrastructure costs are LSEG's responsibility as the platform is deployed within LSEG-controlled data centres.

| Environment | Purpose | Nodes | Specification |
|---|---|---|---|
| Production Primary | Live trading | 2 app + 2 Besu validators + 1 DB primary | 8 vCPU / 32GB RAM per node |
| Production Secondary | HA failover | 1 app + 2 Besu validators + 1 DB replica | 8 vCPU / 32GB RAM per node |
| Staging | Pre-production testing | 1 app + 2 Besu validators + 1 DB | 4 vCPU / 16GB RAM per node |
| Development | Development and integration | 1 app + 1 Besu node + 1 DB | 4 vCPU / 8GB RAM per node |
| HSM | Key management (Production) | 1 primary + 1 secondary | Hardware appliance |

### 6.2 Software Dependencies

The following third-party software is required and is LSEG's responsibility unless otherwise agreed:

| Component | Software | License |
|---|---|---|
| Container orchestration | Kubernetes | Open source (LSEG operates) |
| Blockchain client | Hyperledger Besu | Apache 2.0 (open source) |
| Database | PostgreSQL | Open source |
| Observability | Grafana, VictoriaMetrics, Loki, Tempo | Open source (SettleMint-configured) |
| Load balancer | NGINX or HAProxy | Open source |

---

## 7. Three-Year TCO Analysis

### 7.1 TCO Summary

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Enterprise) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation Services (one-time) | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Infrastructure (LSEG responsibility, est.) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Third-party audit (smart contract) | [CLIENT-SPECIFIC] | - | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Optional training and workshops | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| **Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

### 7.2 TCO Assumptions

- Implementation services are one-time costs incurred in Year 1
- Platform license fees are fixed for the 3-year initial term
- Infrastructure costs are indicative based on the sizing in Section 6.1; actual costs depend on LSEG's data centre unit rates
- Smart contract audit in Year 1 (pre-production), with optional Year 3 re-audit for major upgrades
- No per-transaction fees at any volume level
- Annual license fee escalation for Year 4+ is capped at [CLIENT-SPECIFIC]% above the Year 3 rate

### 7.3 Cost Comparison Basis

SettleMint's platform license model provides cost predictability that per-transaction or per-seat models do not. For an exchange-scale deployment expected to process thousands of transactions per day, per-transaction pricing structures would generate costs that scale with business success rather than with platform costs. The flat license model aligns SettleMint's commercial interests with LSEG's business growth.

---

## 8. ROI Analysis

### 8.1 Value Drivers

The DALP platform generates return for LSEG across four value dimensions:

**Operational efficiency:**
- Automated compliance enforcement eliminates manual pre-settlement compliance checks
- Automated corporate action processing reduces operational headcount requirements
- T+0 DvP settlement eliminates settlement risk capital requirements for the bilateral model
- Real-time audit trail reduces regulatory reporting preparation time

**Revenue enablement:**
- Digital Securities Sandbox participation positions LSEG as a first-mover in UK digital securities
- New asset classes (tokenized bonds, funds, structured products) expand addressable market
- International issuer access via digital asset infrastructure extends LSEG's issuer base
- Platform fee income from digital securities trading adds a new revenue stream

**Risk reduction:**
- On-chain compliance enforcement reduces the risk of non-compliant transfers settling
- Immutable audit trail reduces regulatory investigation risk and potential enforcement costs
- HA deployment with 99.99% SLA reduces the risk of trading-hours outages and associated regulatory notifications

**Competitive positioning:**
- First regulated tokenized securities marketplace in the UK under the DSS framework creates significant first-mover advantage
- Digital asset infrastructure capability reduces dependence on external settlement infrastructure
- Establishes LSEG as the reference venue for digital securities in the UK, attracting issuers and participants

### 8.2 Indicative ROI Framework

| Value Driver | Quantification Basis | Time Horizon |
|---|---|---|
| Operational cost reduction | Headcount equivalent for automated processes | Year 1+ |
| Settlement risk capital release | Basel III SA-CCR capital calculation on bilateral exposures | Year 1 |
| New revenue streams | DSS platform fee income on projected transaction volumes | Year 2+ |
| Regulatory penalty avoidance | Expected value reduction in non-compliance incidents | Ongoing |
| Market share capture | Premium pricing for digital securities vs traditional | Year 2+ |

SettleMint will work with LSEG's finance team during the Discovery phase to quantify these value drivers against LSEG's specific cost base and revenue projections, producing a programme-specific business case.

---

## 9. Payment Terms

### 9.1 Standard Terms

- **Invoice timing:** Invoices issued at each milestone trigger event
- **Payment terms:** Net 30 days from invoice date
- **Currency:** GBP for all UK-domiciled entities
- **Late payment:** Statutory interest per the Late Payment of Commercial Debts (Interest) Act 1998
- **VAT:** UK VAT applicable at the standard rate where applicable; reverse charge mechanism applies for cross-border B2B transactions

### 9.2 Annual License Renewal

- Annual platform license fees are invoiced 60 days before the renewal date
- Payment is due 30 days before the renewal date to ensure service continuity
- LSEG may provide written notice of non-renewal no later than 90 days before the renewal date

### 9.3 Multi-Year Discount

LSEG may elect to pay the platform license fee for multiple years in advance in exchange for a discount:

| Prepayment Term | Discount |
|---|---|
| Annual (standard) | None |
| 2-year prepayment | [CLIENT-SPECIFIC]% |
| 3-year prepayment | [CLIENT-SPECIFIC]% |

---

## 10. Optional Items

### 10.1 Available Optional Additions

| Item | Description | Pricing Basis |
|---|---|---|
| Additional training workshops | Beyond the standard training programme included in implementation | Per-day rate: [CLIENT-SPECIFIC] |
| Smart contract re-audit | Additional third-party security audit for major configuration changes | Pass-through at cost + [CLIENT-SPECIFIC]% |
| Implementation extension | Additional delivery phases beyond the 19-week baseline | Per-week rate: [CLIENT-SPECIFIC] |
| Additional named engineer | Second dedicated engineer for major programmes or peak demand periods | Annual add-on: [CLIENT-SPECIFIC] |
| Custom dashboard development | Bespoke Grafana dashboards beyond the standard pre-built set | Per-dashboard: [CLIENT-SPECIFIC] |
| Regulatory submission support | SettleMint participation in LSEG's FCA or BoE regulatory engagements | Per-day rate: [CLIENT-SPECIFIC] |
| DR test execution support | SettleMint participation in LSEG's full DR test exercises | Per-test: [CLIENT-SPECIFIC] |

### 10.2 Excluded Items

The following are explicitly excluded from DALP platform scope and commercial terms:

- Custom smart contract development (DALP provides configurable standard contracts only)
- Consulting services, technology strategy advice, or advisory engagements
- LSEG internal project management costs
- Third-party software licenses (Kubernetes, PostgreSQL, HSM hardware)
- Data centre costs and connectivity costs
- Legal costs associated with DSS registration

---

## 11. Third-Party Costs

### 11.1 Costs Outside SettleMint Scope

| Category | Estimated Range | Notes |
|---|---|---|
| Smart contract security audit | [CLIENT-SPECIFIC] | Recommended third-party firm; pass-through at cost |
| HSM hardware procurement | [CLIENT-SPECIFIC] | LSEG procures; SettleMint specifies and configures |
| Infrastructure (compute, storage, networking) | [CLIENT-SPECIFIC] p.a. | LSEG's existing data centre or cloud |
| KYC/AML system integration | LSEG cost | Integration API is DALP-provided; KYC system is LSEG's |
| Legal and regulatory fees (DSS registration) | [CLIENT-SPECIFIC] | LSEG's legal counsel; SettleMint provides technical documentation support |
| Penetration testing (third-party) | [CLIENT-SPECIFIC] | LSEG selects testing firm; SettleMint provides test environment |

SettleMint does not mark up third-party costs beyond the pass-through rate specified in the contract.

---

## 12. Commercial Assumptions Register

| ID | Assumption | Impact if Incorrect |
|---|---|---|
| CA-001 | LSEG will provide UK data centre infrastructure meeting the specifications in Section 6.1 | Infrastructure rework cost and schedule impact |
| CA-002 | LSEG's KYC/AML system exposes a documented REST API for integration | Integration phase extension and additional cost |
| CA-003 | LSEG will provide dedicated subject-matter experts during the Configuration and Integration phases | Phase extension if availability is insufficient |
| CA-004 | DSS regulatory parameters are stable during the Configuration phase | Change request required if DSS rules change materially during delivery |
| CA-005 | Smart contract audit findings are limited to low/medium severity | Critical findings will extend the go-live timeline; cost of remediation is within SettleMint's scope |
| CA-006 | LSEG's market surveillance system supports webhook-based event consumption | Integration approach change required if surveillance system requires different integration model |
| CA-007 | LSEG's initial asset class scope is limited to [x] classes as discussed in pre-proposal engagement | Additional asset classes require additional configuration days at day-rate |
| CA-008 | Production deployment is within the UK jurisdiction | Data residency configuration may require adjustment for non-UK deployment |
| CA-009 | LSEG will provide FCA and BoE contacts for technical consultation on DSS alignment | If regulatory consultation is not available, SettleMint's DSS alignment is based on published rules only |
| CA-010 | SettleMint's named engineer will have remote access to the production environment under agreed security conditions | On-site support required if remote access is not permitted; travel costs apply |

---

## 13. Contractual Baseline

### 13.1 Standard Contract Structure

SettleMint's enterprise engagement is governed by the following contract structure:

- **Master Services Agreement (MSA):** Overarching terms covering liability, intellectual property, confidentiality, data protection, and dispute resolution
- **Platform License Schedule:** Specific terms for DALP platform use, including permitted use, prohibited use, and intellectual property ownership
- **Statement of Work (SOW):** Implementation scope, deliverables, milestones, payment schedule, and acceptance criteria
- **Support Services Schedule:** Enterprise SLA terms, escalation procedures, maintenance windows, and reporting obligations
- **Data Processing Agreement (DPA):** UK GDPR-compliant data processing terms, including processing purposes, data subject rights, and sub-processor list

### 13.2 Key Commercial Terms

| Term | SettleMint Standard Position |
|---|---|
| Liability cap | Annual license fee (12 months) for direct losses |
| Consequential loss | Excluded by both parties |
| Intellectual property | DALP platform IP remains with SettleMint; LSEG-specific configurations and data belong to LSEG |
| Source code escrow | Available at [CLIENT-SPECIFIC] per annum; release conditions: insolvency or material breach by SettleMint |
| Audit rights | LSEG may audit SettleMint's SOC 2 and ISO 27001 evidence annually; on-site audit by agreement |
| Termination for convenience | 90 days written notice after initial term; no refund of prepaid annual fees |
| Termination for cause | Material breach unremedied for 30 days; immediate for insolvency |
| Governing law | English law |
| Dispute resolution | Escalation to senior management, then mediation, then arbitration (ICC rules) |

### 13.3 Data Protection

LSEG acts as data controller for all participant personal data processed through DALP. SettleMint acts as data processor under the DPA. Key provisions:

- Processing is restricted to the purposes defined in the DPA
- Sub-processors are listed in the DPA with LSEG notification rights for changes
- Data breach notification within 48 hours of SettleMint becoming aware
- Data deletion or return upon contract termination within 30 days
- UK GDPR standard contractual clauses apply for any cross-border transfers

### 13.4 Intellectual Property

LSEG retains full ownership of:
- All LSEG data processed through DALP
- All LSEG-specific smart contract configurations and parameters
- All integration code developed by LSEG or third parties to connect LSEG systems to DALP

SettleMint retains full ownership of:
- The DALP platform codebase and all standard smart contract implementations
- The SMART Protocol and compliance module libraries
- The Execution Engine, Key Guardian, Chain Indexer, and Chain Gateway components
- All documentation, training materials, and runbooks produced by SettleMint

### 13.5 Acceptance Criteria Framework

Each implementation phase milestone is accepted against documented acceptance criteria agreed during the Discovery phase. The acceptance process is:

1. SettleMint submits deliverable with evidence package
2. LSEG reviews against acceptance criteria (10 business days)
3. LSEG accepts or raises written defects
4. Defects resolved and re-submitted within 10 business days
5. Acceptance withheld only for material non-conformance with agreed criteria
6. Deemed acceptance if LSEG does not respond within 20 business days

---

*This document is classified SettleMint Confidential. Distribution is restricted to authorised LSEG personnel involved in the Digital Asset Marketplace Platform procurement.*
