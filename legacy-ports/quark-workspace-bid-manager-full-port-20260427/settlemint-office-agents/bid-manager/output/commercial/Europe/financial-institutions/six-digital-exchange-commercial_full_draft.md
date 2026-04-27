# Commercial Proposal: Digital Asset Exchange Infrastructure Upgrade

**Prepared for:** SIX Digital Exchange (SDX)
**Document Title:** Commercial Proposal. Digital Asset Exchange Infrastructure Upgrade
**RFP Reference:** SDX-RFP-DIGITAL-ASSET-EXCHANGE-INFRASTRUCTURE-UPGRADE-202603
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

This commercial proposal sets out the pricing, licensing, and contractual framework for SettleMint's Digital Asset Lifecycle Platform (DALP) deployment supporting SDX's Digital Asset Exchange Infrastructure Upgrade programme.

SDX's programme is a production infrastructure upgrade for an already-operational, FINMA-regulated DLT trading venue and central securities depository. This context distinguishes SDX's procurement from a greenfield digital asset deployment: the infrastructure must provide FINMA-grade assurance from day one, support a migration path for existing assets and participants without disruption, and satisfy CPMI-IOSCO PFMI principles across all 24 relevant dimensions.

The recommended commercial structure for SDX:
- **DALP Enterprise Platform License:** Annual subscription, all asset classes, all compliance modules, full API, XvP settlement included
- **Implementation Services:** Fixed-price 19-week programme with FINMA notification support
- **Enterprise Support SLA:** 99.99% uptime, 24/7/365, Swiss-timezone named engineer, PFMI evidence package

All pricing figures in this proposal are marked [CLIENT-SPECIFIC]. The structure, terms, and assumptions reflect SettleMint's standard enterprise framework for FINMA-regulated FMI operators.

SDX's infrastructure investment is best understood as enabling cost: the platform license enables SDX to expand its asset class coverage, increase participant capacity, and satisfy FINMA's evolving PFMI expectations, all while reducing the operational complexity and manual exception handling that constrain the current infrastructure.

---

## 2. Licensing Model

### 2.1 Platform License Structure

DALP is licensed as an annual platform subscription. The subscription includes:

| Feature | Included |
|---|---|
| All asset classes (bonds, funds, equities, structured products, repo) | Yes |
| All 18 compliance modules | Yes |
| Full REST API (OpenAPI 3.1) | Yes |
| TypeScript SDK | Yes |
| XvP settlement addon (multi-leg, future-dated) | Yes |
| Feeds System (NAV, reference rates, market data integration) | Yes |
| Unlimited token types and DALPAsset contracts | Yes |
| Unlimited participants | Yes |
| Asset Console (operator and compliance UI) | Yes |
| FINMA observer access portal | Yes |
| Chain Indexer with FINMA reporting export | Yes |
| Standard observability dashboards | Yes |
| Software updates, security patches | Yes |
| Source code escrow (Enterprise) | Included |

**No per-transaction fees.** SDX pays a fixed annual fee regardless of settlement volume, participant count, or asset class diversity. This model aligns platform cost with the value of infrastructure availability, not with the volume of business SDX processes.

### 2.2 License Tiers

| Tier | Availability | Coverage |
|---|---|---|
| Standard | 99.9% | Development, pilot |
| Premium | 99.95% | Production non-systemic |
| Enterprise | 99.99% | FINMA-regulated FMI |

SDX requires the **Enterprise** tier. This is not a commercial upsell; it is a regulatory baseline for a FINMA-regulated DLT trading venue operating under CPMI-IOSCO PFMI Principle 17 (Operational Risk).

### 2.3 Deployment Model

SDX's deployment is **Private Cloud / On-Premises** within SDX-controlled Swiss data centres:
- Zurich primary, Geneva secondary (IBFT 2.0 dual-site)
- All data within Switzerland (nDSG compliance)
- DALP delivered as versioned Helm/Kubernetes packages
- SDX controls infrastructure; SettleMint manages platform
- FINMA examination access preserved (no shared infrastructure)

---

## 3. Recommended Tier

### 3.1 Enterprise Tier Justification for SDX

**PFMI Principle 17:** CPMI-IOSCO PFMI requires FMIs to maintain operational risk frameworks commensurate with the systemic importance of their functions. A 99.99% SLA with 24/7/365 support, tested DR procedures, and quarterly PFMI evidence packages is the minimum appropriate posture for a regulated Swiss FMI.

**FINMA expectations:** FINMA Circular 2023/1 on operational risks and resilience requires supervised entities to maintain service levels that reflect their systemic importance. For SDX as a DLT trading venue and CSD, this translates to enterprise-grade support coverage and documented recovery capabilities.

**DLT Act obligations:** The DLT Act requires a licensed DLT trading venue to maintain operational continuity. Platform unavailability during trading hours is a notifiable event under FMIA. Enterprise SLA's zero planned maintenance during trading hours commitment is a regulatory requirement, not a preference.

### 3.2 Enterprise SLA Detail

| Parameter | Enterprise Commitment |
|---|---|
| Annual uptime | 99.99% |
| P1 acknowledgement | 15 minutes |
| P1 resolution target | 4 hours |
| P2 acknowledgement | 2 hours |
| P3 acknowledgement | 8 business hours |
| Support hours | 24/7/365 |
| Named engineer | Yes - Swiss-timezone coverage |
| Dedicated Slack channel | Yes |
| War-room P1 escalation | Yes - SettleMint CTO |
| Planned maintenance | Pre-agreed, zero during Swiss trading hours |
| Quarterly PFMI service review | Yes |
| Annual DR test participation | Yes |
| FINMA evidence package (annual) | Yes |

---

## 4. Implementation Services Pricing

### 4.1 Fixed-Price Implementation

| Phase | Duration | Description | Price |
|---|---|---|---|
| Phase 1: Discovery | 2 weeks | Requirements validation, FINMA pre-notification support, architecture design | [CLIENT-SPECIFIC] |
| Phase 2: Foundation | 3 weeks | Swiss infrastructure provisioning, Besu Zurich/Geneva, HSM setup | [CLIENT-SPECIFIC] |
| Phase 3: Configuration | 4 weeks | Asset templates (5 classes), Swiss compliance modules, participant RBAC, XvP config | [CLIENT-SPECIFIC] |
| Phase 4: Integration and Testing | 4 weeks | SIX Group integration, FINMA reporting, UAT, load testing, pen testing | [CLIENT-SPECIFIC] |
| Phase 5: Go-Live and Hypercare | 6 weeks | Migration support, phased go-live, FINMA post-implementation notification | [CLIENT-SPECIFIC] |
| **Total** | **19 weeks** | **Fixed-price, milestone-gated** | **[CLIENT-SPECIFIC]** |

### 4.2 FINMA Notification Support

SDX's infrastructure upgrade triggers FINMA notification obligations. SettleMint includes the following FINMA-related deliverables within the implementation fixed price:

- Phase 1: FINMA pre-notification pack (architecture overview, PFMI gap assessment, security baseline)
- Phase 4: FINMA evidence package for go-live review (SOC 2, ISO 27001, penetration test summary, DR test results, settlement performance evidence)
- Phase 5: FINMA post-implementation notification documentation

This is included in the implementation fee, not charged separately.

### 4.3 Payment Schedule

| Milestone | Trigger | Proportion |
|---|---|---|
| Contract signature | Programme start | 25% |
| Foundation sign-off | Swiss infrastructure live | 20% |
| Configuration sign-off | Compliance officer and legal review | 20% |
| UAT sign-off | Acceptance testing complete | 20% |
| Go-Live certificate | Production live, FINMA notification submitted | 15% |

### 4.4 Migration Services

The asset migration from SDX's current infrastructure to DALP is included within Phase 5. The parallel operation period and phased migration of existing assets are within scope:

- Parallel operation technical setup (API compatibility layer, dual-write capability): included
- Asset migration tooling (token-for-token exchange mechanism): included
- Participant migration documentation and support: included
- FINMA notification for migrated assets: included

Excluded from scope: SDX's internal costs for participant communication, legal documentation of migrated securities under DLT Act, and regulatory fees.

---

## 5. Support Tier

### 5.1 Enterprise Support Pricing

| Component | Annual Cost |
|---|---|
| Enterprise platform license (all features, all asset classes) | [CLIENT-SPECIFIC] |
| Enterprise support SLA (24/7, named engineer, war-room P1) | Included |
| FINMA evidence package (annual) | Included |
| Source code escrow | Included |
| Quarterly PFMI service review | Included |

### 5.2 Hypercare

The 6-week hypercare period within Phase 5 is included in the implementation fee:
- 24/7 named engineer monitoring
- Daily calls with SDX operations team
- FINMA observer portal validation
- Immediate response to production issues
- Transition to standard Enterprise SLA at end of hypercare

Extension rate: [CLIENT-SPECIFIC] per additional week if SDX requires extended stabilisation.

---

## 6. Environment Costs

### 6.1 SDX Infrastructure Sizing

SDX provides and operates the infrastructure. The following specification supports the Enterprise deployment:

| Environment | Location | Nodes | Spec |
|---|---|---|---|
| Production Primary | Zurich | 2 app + 2 Besu validators + 1 DB primary | 8 vCPU / 32GB RAM |
| Production Secondary | Geneva | 1 app + 2 Besu validators + 1 DB replica | 8 vCPU / 32GB RAM |
| Staging | Zurich | 1 app + 2 Besu + 1 DB | 4 vCPU / 16GB RAM |
| Development | Zurich | 1 app + 1 Besu + 1 DB | 4 vCPU / 8GB RAM |
| HSM Primary | Zurich | 1 FIPS 140-2 Level 3 appliance | Hardware |
| HSM Secondary | Geneva | 1 FIPS 140-2 Level 3 appliance | Hardware |

### 6.2 Software Dependencies (Open Source)

| Software | License | Notes |
|---|---|---|
| Kubernetes | Apache 2.0 | SDX operates |
| Hyperledger Besu | Apache 2.0 | Open source blockchain client |
| PostgreSQL | PostgreSQL License | Open source database |
| Grafana, VictoriaMetrics, Loki, Tempo | Apache 2.0 / AGPLv3 | SettleMint-configured |

---

## 7. Three-Year TCO Analysis

### 7.1 TCO Summary

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Enterprise) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation Services (one-time, inc. FINMA support) | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Infrastructure (SDX responsibility, est.) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| HSM hardware procurement (one-time) | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Third-party smart contract audit | [CLIENT-SPECIFIC] | - | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| **Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

### 7.2 TCO Assumptions

- Platform license fees fixed for initial 3-year term
- Implementation services one-time Year 1 cost, fixed price
- Infrastructure costs are SDX estimates based on sizing in Section 6.1
- HSM hardware one-time procurement in Year 1
- Smart contract audit Year 1 (pre-production) and Year 3 (major upgrade cycle)
- Annual escalation cap for Year 4+: [CLIENT-SPECIFIC]%
- Migration services included in implementation fee; no separate migration line item

### 7.3 Current Infrastructure Comparison

SDX's current infrastructure carries ongoing operational costs. A like-for-like TCO comparison should include:
- Current infrastructure maintenance and licensing costs
- Manual operational overhead for processes DALP automates
- Cost of current compliance exceptions and manual overrides
- Regulatory fine exposure from current compliance limitations

SettleMint will work with SDX's finance team during Discovery to produce a comparative analysis against the current state cost base.

---

## 8. ROI Analysis

### 8.1 Value Drivers

**Operational efficiency:**
- Automated compliance enforcement at the smart contract layer eliminates manual pre-settlement eligibility checks
- Automated corporate action processing reduces operations team requirements for coupon distributions, redemptions, and fund subscriptions
- T+0 DvP removes the settlement risk capital requirements for bilateral exposures
- FINMA evidence package automation reduces regulatory reporting preparation time

**Revenue expansion:**
- Five asset classes supported from single platform: bonds, funds, equities, structured products, repo
- New participant categories enabled by improved onboarding and entitlement architecture
- International issuer access through improved API integration and participant portal
- REPO and collateral market expansion via multi-leg XvP settlement

**Risk reduction:**
- On-chain compliance enforcement reduces non-compliant settlement risk (FINMA enforcement risk)
- PFMI Principle 4 credit risk eliminated through XvP atomicity
- Operational resilience improvement: 99.99% SLA vs current infrastructure availability
- Audit trail quality improvement supports FINMA PFMI assessments with reduced manual preparation

**Infrastructure consolidation:**
- Single platform replacing multiple asset-class-specific infrastructure components
- Reduced total infrastructure footprint as asset class diversity increases on DALP
- Simplified participant onboarding across all asset classes through unified API

### 8.2 Indicative ROI Illustration

The following uses assumed figures (clearly labelled as indicative) to illustrate ROI calculation methodology. SDX-specific numbers will be validated during Discovery.

**Indicative assumptions:**
- Operational cost saving from automation (compliance checks, corporate actions): CHF 1.8M p.a.
- Settlement risk capital release (bilateral DvP exposure, CHF 200M average, 8% capital charge): CHF 16M released; CHF 1.6M p.a. cost of capital at 10%
- New asset class revenue (structured products, repo on DALP): CHF 2.0M p.a. from Year 2
- FINMA reporting cost reduction (automated evidence package): CHF 0.3M p.a.
- Year 1 total value: CHF 3.7M gross (net of implementation cost: [CLIENT-SPECIFIC])
- Year 2 total value: CHF 5.7M gross (revenue from new asset classes, full year)
- Year 3 total value: CHF 6.5M gross (scale)
- 3-year gross value: CHF 15.9M

Against a 3-year TCO of [CLIENT-SPECIFIC], this indicative illustration demonstrates a strong return, with payback expected in Year 1 from operational efficiency and capital release alone.

---

## 9. Payment Terms

### 9.1 Standard Terms

- **Currency:** CHF (Swiss Francs) preferred; EUR available
- **Payment terms:** Net 30 days from invoice date
- **Invoice timing:** At each milestone trigger for implementation; 60 days before renewal for annual license
- **Late payment:** Swiss OR Art. 102 default interest at applicable rate
- **VAT:** Swiss VAT applicable at standard rate where applicable

### 9.2 Multi-Year Discount

| Prepayment Term | Discount |
|---|---|
| Annual (standard) | None |
| 2-year prepayment | [CLIENT-SPECIFIC]% |
| 3-year prepayment | [CLIENT-SPECIFIC]% |

### 9.3 Annual Renewal

Annual platform license invoiced 60 days before renewal date, due 30 days before renewal. Non-renewal requires 90 days written notice.

---

## 10. Optional Items

| Item | Description | Pricing |
|---|---|---|
| Additional training workshops | Beyond standard programme | Per-day: [CLIENT-SPECIFIC] |
| German-language training | Training delivered in German | Per-day premium: [CLIENT-SPECIFIC] |
| Additional smart contract audit | For major configuration changes beyond Year 1 | Pass-through + [CLIENT-SPECIFIC]% |
| FINMA examination support | SettleMint participation in FINMA on-site examination | Per-day: [CLIENT-SPECIFIC] |
| PFMI self-assessment facilitation | Workshop to develop SDX's PFMI self-assessment with DALP evidence | Fixed: [CLIENT-SPECIFIC] |
| Implementation extension | Beyond 19-week baseline | Per-week: [CLIENT-SPECIFIC] |
| Additional named engineer | Second dedicated engineer | Annual add-on: [CLIENT-SPECIFIC] |
| Custom FINMA reporting templates | Bespoke reporting formats beyond standard Chain Indexer exports | Per-template: [CLIENT-SPECIFIC] |

---

## 11. Third-Party Costs

| Category | Notes |
|---|---|
| HSM hardware | SDX procures; SettleMint specifies (FIPS 140-2 Level 3); one-time cost |
| Swiss data centre hosting | SDX's existing Zurich/Geneva facilities |
| Smart contract audit firm | Swiss-qualified firm; pass-through at cost |
| FINMA legal fees | SDX's legal counsel for DLT Act notification |
| Penetration testing firm | SDX selects; SettleMint provides test environment |
| KYC/AML system | SDX's existing AMLA-compliant system; API integration in scope |
| SIX Group integration development | Any SIX-side API development for DALP integration |

---

## 12. Commercial Assumptions Register

| ID | Assumption | Impact if Incorrect |
|---|---|---|
| CA-001 | SDX provides Swiss data centres meeting the specification in Section 6.1 | Infrastructure rework required |
| CA-002 | Existing SDX participant data is in a format compatible with OnchainID bulk import | Additional data transformation work required |
| CA-003 | FINMA pre-notification does not trigger a halt to the implementation timeline | Schedule impact; SettleMint cannot control FINMA processing time |
| CA-004 | SDX provides FINMA liaison contact for joint technical consultation | FINMA alignment is based on published rules only if no liaison available |
| CA-005 | Smart contract audit findings are low/medium severity | Critical findings extend timeline; remediation within SettleMint scope |
| CA-006 | SIX Group provides documented API specifications for payment and data services | Integration design cannot proceed without API documentation |
| CA-007 | Existing SDX asset population for migration is defined at project start | Migration scope change after start requires change request |
| CA-008 | DLT Act and FMIA do not undergo material amendment during the 19-week delivery | Compliance module reconfiguration required if material amendment occurs |
| CA-009 | HSM hardware is procured and available by Week 3 (Foundation phase) | Foundation phase delay if HSM procurement is delayed |
| CA-010 | IBFT 2.0 consensus is acceptable to SDX's current Hyperledger-based participants | Participant-side integration changes may be required if consensus model differs |

---

## 13. Contractual Baseline

### 13.1 Contract Structure

- **Master Services Agreement:** Liability, IP, confidentiality, data protection, Swiss governing law
- **Platform License Schedule:** DALP use rights, permitted use, IP ownership
- **Statement of Work:** 19-week scope, deliverables, milestones, payment schedule, acceptance criteria
- **Support Services Schedule:** Enterprise SLA terms, FINMA evidence package obligations, maintenance windows
- **Data Processing Agreement:** nDSG-compliant data processing terms, Swiss data residency, sub-processor list

### 13.2 Key Commercial Terms

| Term | SettleMint Position |
|---|---|
| Governing law | Swiss law (OR) |
| Dispute resolution | Escalation, then mediation (Swiss Centre for Commercial Mediation), then arbitration (Swiss Rules) |
| Liability cap | Annual license fee (12 months) for direct losses |
| Consequential loss | Excluded by both parties |
| IP ownership | Platform IP: SettleMint. SDX data and configurations: SDX |
| Source code escrow | Included in Enterprise; release: insolvency or material breach unremedied |
| Audit rights | SDX may review SOC 2 and ISO 27001 evidence annually; FINMA examination access preserved |
| Termination for convenience | 90 days written notice after initial term |
| Termination for cause | Material breach unremedied 30 days; immediate for insolvency |

### 13.3 nDSG Data Processing

SDX is data controller for participant personal data. SettleMint is data processor. Key terms:
- Processing restricted to purposes in DPA
- All processing within Switzerland
- Sub-processors listed; 30-day notification of changes
- Breach notification: SettleMint to SDX within 48 hours; SDX to FDPIC within 72 hours
- Data return or deletion within 30 days of contract termination

### 13.4 FINMA Access Obligations

SettleMint acknowledges that FINMA has the right to examine SDX's systems, including DALP components, in the course of its supervisory activities. SettleMint's obligations under the contract:
- Provide all documentation requested by FINMA through SDX within 10 business days
- Cooperate with FINMA on-site examinations at SDX facilities, with reasonable notice
- Maintain the FINMA observer portal access for the duration of the contract
- Notify SDX of any material security event affecting DALP within 48 hours

### 13.5 Acceptance Criteria Framework

Phase gate acceptance follows the same structure as SettleMint's standard enterprise engagement:
1. SettleMint submits deliverable with evidence package
2. SDX reviews against acceptance criteria (10 business days)
3. SDX accepts or raises written defects
4. Defects resolved and resubmitted within 10 business days
5. Deemed acceptance if SDX does not respond within 20 business days

FINMA-specific gate: Phase 3 (Configuration sign-off) requires written confirmation from SDX's compliance officer that the compliance module configuration satisfies SDX's FMIA and DLT Act compliance obligations before the gate is passed.

---

*This document is classified SettleMint Confidential. Distribution is restricted to authorised SIX Digital Exchange personnel involved in the Digital Asset Exchange Infrastructure Upgrade procurement.*
