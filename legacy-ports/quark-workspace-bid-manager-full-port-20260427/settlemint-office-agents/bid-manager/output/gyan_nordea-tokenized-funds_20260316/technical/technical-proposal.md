# Technical Proposal
## Nordea Tokenized Funds Platform

**Document Reference:** NORDEA-TECH-202603-001
**Version:** 1.0
**Date:** March 2026
**Classification:** Confidential

---

## Executive Summary

SettleMint welcomes the opportunity to respond to Nordea's Request for Proposal for a Tokenized Funds Platform. This technical proposal presents the Digital Asset Lifecycle Platform (DALP) as the foundation for Nordea's institutional-grade tokenized fund issuance, servicing, settlement, reporting, and control workflows.

Our response is anchored in Nordea's specific context: the largest Nordic financial services group with a measured, risk-conscious approach to digital assets, operating across multiple legal entities in Sweden, Denmark, Finland, and Norway under Nordic supervisory expectations, MiCA, MiFID II, UCITS, AIFMD, and DORA. We have designed this proposal to address Nordea's explicit requirements for production operating capability, cross-border controls, multi-entity governance, and integration with existing treasury, payments, and custody infrastructure.

DALP is a production-grade platform with proven deployment experience in European regulated banking. The platform provides end-to-end lifecycle management for tokenized funds, with compliance enforcement at the smart contract layer, configurable governance controls, and full auditability for regulatory supervision.

---

# Section 1: Company Overview and Credentials

## 1.1 About SettleMint

SettleMint is the Digital Asset Lifecycle Platform company, founded in 2016 and headquartered in Leuven, Belgium. We exist to bridge the gap between digital asset ambitions and production-grade execution for regulated financial institutions, market infrastructure providers, and sovereign entities.

**Production Credentials:**
- 10 years of continuous operation in enterprise blockchain infrastructure
- 7+ years of production deployments at regulated banks in Europe and Asia
- 14+ reference projects across banking, sovereign institutions, and capital markets
- ISO 27001 and SOC 2 Type II certified

## 1.2 Relevant Reference Projects

**Commerzbank. Hybrid ETP Issuance (Germany)**
One of Germany's largest banks engaged SettleMint to modernize exchange-traded product (ETP) issuance through a hybrid on-chain/off-chain model integrated with Boerse Stuttgart. This reference demonstrates DALP's capability in the EU regulatory environment with established market infrastructure integration, directly relevant to Nordea's fund distribution model.

**KBC Securities. Equity and Fund Tokenization (Belgium)**
Smart contract backend for crowdfunding issuance, lifecycle management, corporate actions, and redemption with fiat-backed stable tokens. Demonstrates fund-like instrument handling including investor onboarding, eligibility verification, and lifecycle events.

**Standard Chartered Bank. Digital Virtual Exchange**
Multi-asset securities platform supporting shares, bonds, and currencies with institutional-grade compliance and multi-region deployment. Relevant for demonstrating cross-border operational capability.

## 1.3 Certifications

| Certification | Status |
|---|---|
| ISO 27001 | Certified |
| SOC 2 Type II | Certified |
| Regular Penetration Testing | Active |
| Smart Contract Audits | Active |

---

# Section 2: Platform Architecture

## 2.1 Architectural Overview

DALP is built as a four-layer stack with distinct responsibility boundaries:

| Layer | Role | Components |
|---|---|---|
| Application | User interfaces | Asset Console, dashboards |
| API | Programmatic access | REST API, TypeScript SDK |
| Middleware | Workflow orchestration | Execution Engine, Key Guardian, Chain Indexer |
| Smart Contract | On-chain enforcement | SMART Protocol, DALPAsset, compliance modules |

## 2.2 Smart Contract Layer: Fund-Specific Capabilities

### ERC-3643/SMART Protocol Foundation

All DALP contracts implement ERC-3643, the standard for regulated security tokens:

- **Modular Compliance Engine**: Every transfer evaluated against configurable rules before execution
- **OnchainID Identity**: Investor identity verified on-chain at execution time
- **Transfer Restrictions**: Jurisdiction, investor limits, holding periods enforced at protocol level

### DALPAsset for Funds

DALPAsset provides fund-specific capabilities:

| Capability | Description |
|---|---|
| **Share Class Support** | Multiple token classes within single fund |
| **NAV Tracking** | On-chain NAV calculation and verification |
| **Subscription/Redemption** | Automated processing with compliance gates |
| **Distribution** | Yield and dividend distribution automation |
| **Custody Integration** | Support for omnibus and segregated holding models |

### Configurable Compliance for Nordic Requirements

Pre-built compliance templates include:
- UCITS eligibility rules
- AIFMD investor limits
- MiFID II transaction reporting
- Nordic country restrictions
- Custom expression builder for jurisdiction-specific rules

---

# Section 3: Functional Capabilities for Tokenized Funds

## 3.1 End-to-End Fund Lifecycle

| Lifecycle Phase | DALP Capability |
|---|---|
| **Product Setup** | Asset Designer for fund parameters (ISIN, share classes, NAV frequency) |
| **Investor Onboarding** | OnchainID identity with KYC/AML integration points |
| **Subscription** | Token minting with eligibility verification, payment confirmation |
| **Trading/Transfer** | Atomic settlement, compliance enforcement at execution |
| **NAV Update** | Automated NAV calculation, price feed integration |
| **Distribution** | Automated yield/dividend distribution |
| **Redemption** | Automated burn with compliance verification |
| **Reporting** | Real-time position tracking, regulatory reports |

## 3.2 Fund-Specific Features

**Subscription/Redemption Processing:**
- Configurable subscription windows
- Minimum/maximum investment limits
- NAV-based pricing at execution
- Automated reconciliation with payment rails

**Yield Distribution:**
- Scheduled distribution triggers
- Multiple share class support
- Reinvestment options
- Tax reporting integration ready

**Investor Eligibility:**
- Accredited investor verification
- Country-based restrictions
- Investor count limits (UCITS/AIFMD compliant)
- Continuous compliance verification

## 3.3 Multi-Entity Governance

For Nordea's cross-border model:

- **Legal Entity Isolation**: Separate compliance configurations per entity
- **Cross-Border Transfers**: Inter-entity transfer rules with regulatory checks
- **Currency Handling**: Multi-denomination support for SEK, DKK, EUR, NOK
- **Reporting**: Entity-specific and consolidated reporting

---

# Section 4: Integration Architecture

## 4.1 API-First Integration

DALP exposes all capabilities through documented APIs:

| Method | Use Case |
|---|---|
| REST API (OpenAPI 3.1) | System integration |
| TypeScript SDK | Application development |
| Webhooks | Event-driven notifications |
| Enterprise messaging | Corporate actions, settlement |

**Integration Points for Nordea:**

| System | Integration Pattern |
|---|---|
| Core Banking | REST API with event updates |
| Treasury | Payment confirmation webhooks |
| Custody | Fireblocks/DFNS connector |
| Payments | ISO 20022 ready (SWIFT, SEPA) |
| KYC/Sanctions | Identity verification API |
| Reporting | Exportable data feeds |

## 4.2 Reconciliation Model

DALP maintains clear golden-source boundaries:

| Data Domain | Authoritative Source |
|---|---|
| Token Holdings | DALP on-chain |
| Investor Records | Nordea systems |
| Cash Positions | Treasury/Payment systems |
| Accounting | Nordea finance systems |

The platform provides real-time position feeds and event streams for continuous reconciliation.

---

# Section 5: Security Architecture

## 5.1 Defense-in-Depth

| Layer | Control |
|---|---|
| Authentication | Better Auth (passkeys, LDAP, OAuth) |
| Authorization | 26 roles across 4 layers |
| Wallet Verification | PIN, TOTP, backup codes |
| Compliance | ERC-3643 on-chain enforcement |
| Custody | Fireblocks/DFNS MPC |

## 5.2 Key Management

| Tier | Protection | Use Case |
|---|---|---|
| Encrypted Database | Application-level | Development |
| Cloud KMS | Platform-managed | Standard production |
| HSM | FIPS 140-2 Level 3 | Regulated services |
| MPC Custody | Institutional | Highest security |

## 5.3 Audit Trails

Comprehensive logging covers:
- Authentication events
- Authorization decisions
- Configuration changes
- Administrative actions
- Wallet verification
- Compliance events

Audit logs retained per regulatory requirements, exportable for supervisor review.

---

# Section 6: Deployment and Operations

## 6.1 Deployment Options

| Model | Description |
|---|---|
| Managed SaaS | SettleMint operated |
| Private Cloud | In Nordea's cloud (AWS eu-north-1 for Nordic) |
| On-Premises | Within Nordea data centers |
| Hybrid | Component flexibility |

**Recommended**: Private cloud on AWS eu-north-1 (Stockholm) for Nordic data residency.

## 6.2 Environment Topology

| Environment | Purpose |
|---|---|
| Development | Configuration, prototyping |
| Staging | Integration testing, UAT |
| Pre-production | Pre-go-live validation |
| Production | Live operations |

## 6.3 Disaster Recovery

| Scenario | RTO | RPO |
|---|---|---|
| Cloud-native | 2-15 min | Seconds |
| Active-standby | 30-180 min | 5-60 min |

---

# Section 7: Regulatory Alignment

## 7.1 Nordic/EU Regulatory Support

| Regulation | DALP Support |
|---|---|
| **MiCA** | Pre-built compliance modules |
| **MiFID II** | Transaction reporting, best execution |
| **UCITS** | Investor limits, eligibility rules |
| **AIFMD** | Investor verification, reporting |
| **DORA** | Resilience testing, incident classification |
| **GDPR** | Data residency, access controls |

## 7.2 Nordic Supervisor Alignment

- Data residency options (eu-north-1 Stockholm)
- Cross-border servicing controls
- Nordic language support ready
- Export-ready for Finansinspektionen

---

# Section 8: Implementation Approach

## 8.1 Implementation Timeline

| Phase | Duration | Focus |
|---|---|---|
| 1. Discovery | 2 weeks | Requirements, regulatory mapping |
| 2. Foundation | 3 weeks | Environment, identity setup |
| 3. Configuration | 4 weeks | Fund types, compliance |
| 4. Integration | 4 weeks | System integration, testing |
| 5. Go-Live | 6 weeks | Production, hypercare |

**Total: 19 weeks**

## 8.2 Resource Requirements

**SettleMint**: Delivery Lead, Solution Architect, Platform Engineers, QA Lead
**Nordea**: Project Manager, Technical Lead, Compliance/Risk, Operations

---

# Section 9: Support and SLA

## 9.1 Support Tiers

| Capability | Premium (Recommended) |
|---|---|
| Coverage | 07:00-22:00 CET, + P1 weekends |
| P1 Response | 1 hour |
| P1 Resolution | 4 hours |
| Uptime | 99.95% |
| Channels | Email, portal, Slack, phone |

## 9.2 Maintenance

- Standard window: Saturdays 02:00-06:00 CET
- Notice: 5 business days (10 for major upgrades)
- Emergency maintenance with maximum notice

---

# Section 10: Requirement Compliance Matrix

## 10.1 Technical Requirements

| Req ID | Requirement | Status |
|---|---|---|
| TR-01 | End-to-end lifecycle management | Comply |
| TR-02 | Documented APIs | Comply |
| TR-03 | RBAC, dual control, approval workflows | Comply |
| TR-04 | Configurable templates | Comply |
| TR-05 | Immutable audit trails | Comply |
| TR-06 | Resilient deployment | Comply |
| TR-07 | External interoperability | Comply |
| TR-08 | Configurable dashboards | Comply |
| TR-09 | Data export, regulator-ready | Comply |
| TR-10 | Analytics/simulation | Partially Comply |

## 10.2 Security Requirements

| Req ID | Requirement | Status |
|---|---|---|
| SR-01 | ISO 27001 | Comply |
| SR-02 | Encryption | Comply |
| SR-03 | Privileged access | Comply |
| SR-04 | Penetration testing | Comply |
| SR-05 | Data residency | Comply |
| SR-06 | SIEM integration | Comply |

---

# Section 11: Conclusion

## 11.1 Summary of Fit

DALP meets Nordea's requirements:

| Nordea Requirement | DALP Response |
|---|---|
| Fund tokenization | Full fund lifecycle support |
| Nordic/EU compliance | UCITS, AIFMD, MiCA, MiFID II templates |
| Cross-border controls | Multi-entity, multi-currency support |
| Integration | API-first, ISO 20022 ready |
| Production-ready | 14+ deployments at regulated banks |

## 11.2 Commitment

SettleMint commits to:
- 19-week implementation timeline
- Transparent commercial model
- Full operational ownership for Nordea teams
- Nordic data residency (AWS eu-north-1)

---

**Submitted by:**
SettleMint NV
March 2026

*Confidential, Nordea evaluation only.*
