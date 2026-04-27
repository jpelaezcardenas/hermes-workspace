# Commercial Proposal: Tokenized Securities Issuance and Settlement Platform

| Field | Value |
|---|---|
| Proposal title | Commercial Proposal. Tokenized Securities Issuance and Settlement Platform |
| Client | Standard Bank (South Africa) |
| Submitted by | SettleMint NV |
| Date | March 2026 |
| Version | v1.0 |
| Confidentiality | Restricted |
| RFP Reference | STANDARD-BANK-RFP-TOKENIZED-SECURITIES-202603 |

---

## Executive Summary

Standard Bank requires a platform and delivery partner capable of bringing a tokenized securities issuance and settlement platform to production with the discipline, transparency, and governance expected of Africa's largest bank by assets, operating under South African Reserve Bank (SARB), Financial Sector Conduct Authority (FSCA), and Johannesburg Stock Exchange (JSE) regulatory oversight. This commercial proposal presents SettleMint's licensing, implementation, and support model for the Digital Asset Lifecycle Platform (DALP), structured to provide predictable costs, transparent assumptions, and a clear total cost of ownership across a three-year horizon.

**Commercial recommendation:**

- **License tier:** Enterprise (Tier 2), supporting multiple securities types, environments, and custody provider integrations
- **Deployment model:** Dedicated cloud, South Africa-resident infrastructure
- **Implementation:** 19-week phase-gated delivery with five formal gate reviews
- **Support tier:** Premium, 16×5 coverage, 2-hour P1 response, dedicated support engineer
- **Estimated three-year TCO:** [CLIENT-SPECIFIC, to be finalized during commercial discussions]

The DALP licensing model uses predictable annual subscription pricing with no per-transaction, per-token, per-user, or per-settlement fees. Standard Bank can scale issuance volume, securities types, and investor distribution without incurring incremental platform costs. Settlement operations, corporate actions, and compliance checks, which occur at high frequency in securities markets, carry zero marginal licensing cost.

---

## Licensing Model

### Platform Licensing Philosophy

DALP uses a **platform licensing model**. Key principles:

| Principle | What It Means for Standard Bank |
|---|---|
| No per-transaction fees | Every compliance check, settlement, corporate action, and transfer is included. No cost anxiety as volumes grow. |
| No per-token fees | Additional securities types (bonds, equities, funds) carry no incremental license cost. |
| No per-user fees for investors | Growing the investor base across South Africa and pan-African markets is a business outcome, not a cost driver. |
| Predictable annual subscription | Budget certainty for multi-year planning. |
| Full platform capabilities included | All lifecycle pillars, compliance modules, API surface, and observability tools. |

### What the License Includes

The Enterprise license provides access to:

- All five lifecycle pillars: Issuance, Compliance, Custody Integration, Settlement, and Servicing
- All seven asset classes (bonds, equities, funds, stablecoins, deposits, real estate, precious metals) plus Configurable Token
- All 18 compliance module types, no per-module licensing
- Full API surface: REST API v2, GraphQL, webhooks, TypeScript SDK, CLI (301 commands)
- Addon capabilities: XvP settlement, vault management, token sales, airdrop, yield schedules
- Observability stack: Grafana dashboards, metrics, logs, traces, automated alerting
- Platform updates and security patches during the license term

### Recommended Tier: Enterprise (Tier 2)

| Dimension | Enterprise Configuration for Standard Bank |
|---|---|
| Environments | Development + UAT/Staging + DR + Production |
| Networks | Permissioned Hyperledger Besu (recommended) |
| Custody | DFNS or Fireblocks integration (decision during Phase 1) |
| Support | Premium tier (16×5, 2-hour P1 response) |
| Asset classes | Bonds, equities, with expansion to funds and deposits via DALPAsset templates |

**Annual license fee:** [CLIENT-SPECIFIC]

---

## Implementation Pricing

### Pricing Structure

Implementation is priced as a fixed-fee engagement across the five delivery phases:

| Phase | Duration | Scope | Pricing Basis |
|---|---|---|---|
| Phase 1: Discovery & Requirements | 2 weeks | Requirements, regulatory mapping, architecture design | Fixed fee |
| Phase 2: Foundation & Setup | 3 weeks | Environment provisioning, network, identity framework | Fixed fee |
| Phase 3: Configuration & Compliance | 4 weeks | Securities configuration, compliance modules, JSE/Strate workflows | Fixed fee |
| Phase 4: Integration & Testing | 4 weeks | System integration, security/UAT/performance testing | Fixed fee |
| Phase 5: Go-Live & Hypercare | 6 weeks | Production deployment, knowledge transfer, hypercare | Fixed fee |
| **Total** | **19 weeks** | | **[CLIENT-SPECIFIC]** |

### Implementation Team

| Role | Allocation | Responsibility |
|---|---|---|
| Delivery Lead | Full-time (19 weeks) | Programme management, gate reviews, stakeholder alignment |
| Solution Architect | Full-time (Weeks 1–13), on-call (14–19) | Architecture design, integration patterns, technical decisions |
| Platform Engineer | Full-time (Weeks 3–17) | Environment setup, configuration, deployment |
| Integration Engineer | Full-time (Weeks 6–13) | Enterprise system integration, JSE/Strate connectivity |
| QA Engineer | Full-time (Weeks 10–15) | Test planning, execution, defect management |

### Client Effort Assumptions

| Activity | Estimated Client Effort | When |
|---|---|---|
| Stakeholder interviews | 20 person-days | Weeks 1–2 |
| SARB/FSCA regulatory alignment | 10 person-days | Weeks 6–9 |
| Core banking and JSE API provisioning | 15 person-days | Weeks 3–9 |
| UAT execution | 20 person-days | Weeks 10–13 |
| Operations readiness | 10 person-days | Weeks 14–19 |
| **Total estimated client effort** | **75 person-days** | |

---

## Support Pricing

### Recommended: Premium Support

| Aspect | Premium Support for Standard Bank |
|---|---|
| Coverage hours | 16×5 (Monday–Friday, SAST-aligned) |
| P1 response time | 2 hours |
| P2 response time | 4 hours |
| P3 response time | 1 business day |
| P4 response time | 3 business days |
| Dedicated support engineer | Yes |
| Quarterly business reviews | Yes |
| Platform health checks | Monthly |
| Emergency patches | Included |
| **Annual support fee** | **[CLIENT-SPECIFIC]** |

### Support Escalation Model

| Severity | Definition | Response | Resolution Target |
|---|---|---|---|
| P1: Critical | Production down, no workaround | 2 hours | 4 hours |
| P2: High | Major feature impaired, workaround exists | 4 hours | 8 hours |
| P3: Medium | Non-critical issue, limited impact | 1 business day | 5 business days |
| P4: Low | Enhancement request, cosmetic issue | 3 business days | Next release |

---

## Total Cost of Ownership

### Three-Year TCO Components

| Cost Component | Year 1 | Year 2 | Year 3 | Three-Year Total |
|---|---|---|---|---|
| Platform license (Enterprise) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation services | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Premium support | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Infrastructure (cloud hosting) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| **Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

### What Is Not Included (Exclusions)

| Exclusion | Responsibility | Notes |
|---|---|---|
| Cloud infrastructure costs | Standard Bank | South Africa-resident infrastructure provisioning |
| Core banking integration development | Standard Bank | API readiness on client side |
| JSE/Strate connectivity fees | Standard Bank | Market infrastructure agreements |
| Custody provider fees | Direct with provider | DFNS or Fireblocks subscription |
| Regulatory filing fees | Standard Bank | SARB/FSCA fees |
| Pan-African market extensions | Additional scope | Per-market extension priced separately |

### Scaling Economics

DALP's platform licensing means Standard Bank's costs do not scale with:
- Number of securities issued
- Number of investors onboarded across South Africa and pan-African markets
- Volume of settlements processed
- Number of compliance checks executed
- Number of corporate actions (coupon payments, dividends, stock splits, voting)

This is critical for a securities platform where settlement, corporate action, and compliance volumes grow with market adoption. A per-transaction pricing model would create misaligned incentives as Standard Bank scales.

---

## Contractual Framework

### Contract Components

| Component | Scope |
|---|---|
| Platform License Agreement | Annual subscription, renewal terms, update entitlements |
| Implementation Services Agreement | Fixed scope, milestones, acceptance criteria, change control |
| Support Services Agreement | SLA commitments, escalation procedures, coverage hours |
| Data Processing Agreement | Data handling, residency (South Africa), retention, deletion |
| Confidentiality Agreement | Mutual NDA covering proposal and engagement materials |

### Key Commercial Terms

- **Payment terms:** Milestone-based for implementation; annual in advance for license and support
- **Contract term:** Initial three-year term with annual renewal option
- **Price escalation:** Capped at [CLIENT-SPECIFIC]% annually after initial term
- **Exit support:** 90-day transition assistance, data export in standard formats, documentation handover
- **Audit rights:** Standard Bank retains the right to audit SettleMint's security controls, data handling, and service delivery annually
- **Subcontracting:** Any subcontractors disclosed in advance; Standard Bank retains approval rights
- **Change control:** Formal change request process for scope modifications with impact assessment before approval

### Financial Stability

SettleMint NV is incorporated in Belgium, operating since 2016. Key financial stability indicators:

- 10 years of continuous operation
- Series A funded by leading European and Middle Eastern investors
- Active production engagements across Europe, Middle East, and Asia-Pacific
- No material litigation, sanctions exposure, or regulatory constraints affecting delivery capability
- Multi-year contracts with sovereign and tier-1 bank clients providing revenue stability

---

## Commercial Decision Summary

| Decision Factor | SettleMint DALP Position |
|---|---|
| Pricing predictability | Platform licensing with zero per-transaction/per-token fees |
| Securities market capability | Multi-asset bonds and equities with corporate action automation |
| Africa presence | Standard Chartered Bank reference across Africa; Saudi RER sovereign-scale deployment |
| Implementation risk | Fixed-fee, phase-gated, 19-week proven methodology |
| Scaling economics | Costs flat as securities, investors, and settlement volumes grow |
| Support maturity | ISO 27001 and SOC 2 Type II certified operations |
| Contractual clarity | Transparent pricing, defined assumptions, exit support included |
