# Technical Proposal
## Standard Chartered Digital Asset Custody Platform

**Document Reference:** SCB-TECH-202603-001
**Version:** 1.0
**Date:** March 2026
**Classification:** Confidential

---

## Executive Summary

SettleMint presents this technical proposal for Standard Chartered's Digital Asset Custody Platform procurement. DALP provides institutional-grade custody capabilities with multi-jurisdictional support aligned to Standard Chartered's international banking group requirements.

Our proposal addresses Standard Chartered's specific context: a leading international bank with operations across 50+ countries, requiring custody segregation across client asset classes, legal entities, and risk frameworks under UK FCA/PRA, MAS, HKMA, and DORA.

---

# Section 1: Company Credentials

## 1.1 Relevant Experience

SettleMint has direct relevant experience:

**Standard Chartered. Digital Virtual Exchange**
- Multi-asset securities platform
- Institutional-grade compliance
- Cross-border custody model
- Multi-region deployment

This existing relationship demonstrates our capability to deliver at Standard Chartered's scale and governance requirements.

**Additional References:**
- Commerzbank: ETP issuance (Germany)
- KBC Securities: Fund tokenization (Belgium)
- Saudi Arabia RER: Sovereign real estate platform

## 1.2 Certifications

| Certification | Status |
|---|---|
| ISO 27001 | Certified |
| SOC 2 Type II | Certified |
| Penetration Testing | Active |

---

# Section 2: Custody Platform Architecture

## 2.1 Four-Layer Stack

| Layer | Components |
|---|---|
| Application | Custody Console, dashboards |
| API | REST API, webhooks |
| Middleware | Key Guardian, Signer, Chain Indexer |
| Smart Contract | ERC-3643, custody-specific modules |

## 2.2 Custody-Specific Capabilities

| Capability | Description |
|---|---|
| **Omnibus Holding** | Segregated client positions |
| **Segregated Wallets** | Per-client wallet isolation |
| **Multi-Sig Support** | Maker-checker workflows |
| **Asset Recovery** | Deterministic recovery procedures |
| **Slippage Control** | Price impact protection |
| **Custodian Integration** | Fireblocks/DFNS native |

---

# Section 3: Functional Capabilities

## 3.1 End-to-End Custody Lifecycle

| Phase | DALP Support |
|---|---|
| Onboarding | Client onboarding with KYC |
| Deposit | Address generation, deposit tracking |
| Custody | Secure holding, position management |
| Transfer | Withdrawal processing with compliance |
| Settlement | DvP/XvP support |
| Reporting | Position statements, transactions |
| Recovery | Wallet recovery procedures |

## 3.2 Multi-Entity Governance

For Standard Chartered's global model:

| Feature | Description |
|---|---|
| **Legal Entity Isolation** | Per-entity compliance |
| **Regional Controls** | Jurisdiction-specific rules |
| **Cross-Border Transfers** | Inter-entity rules |
| **Unified Reporting** | Consolidated + entity views |

---

# Section 4: Regulatory Alignment

## 4.1 Jurisdictional Support

| Regulator | DALP Support |
|---|---|
| UK FCA/PRA | Configurable compliance modules |
| MAS (Singapore) | Pre-built Singapore templates |
| HKMA (Hong Kong) | Pre-built Hong Kong templates |
| DORA | Resilience, incident classification |
| GDPR | Data residency, access controls |

## 4.2 Multi-Jurisdiction Deployment

| Region | Option |
|---|---|
| UK | AWS eu-west-2 (London) |
| Singapore | AWS ap-southeast-1 |
| Hong Kong | AWS ap-east-1 |
| UAE | AWS me-south-1 |

---

# Section 5: Security

## 5.1 Defense-in-Depth

| Layer | Control |
|---|---|
| Authentication | Passkeys, LDAP, OAuth |
| Authorization | 26 roles across 4 layers |
| Key Management | HSM, MPC (Fireblocks/DFNS) |
| Wallet Verification | PIN, TOTP, backup codes |
| Compliance | ERC-3643 on-chain enforcement |

## 5.2 Custody-Specific Security

- **Key Guardian**: Multi-tier key storage
- **Signer Abstraction**: Unified custody integration
- **Transaction Policies**: Amount limits, velocity limits
- **Recovery Workflows**: Deterministic, auditable

---

# Section 6: Integration

## 6.1 API-First

| System | Integration |
|---|---|
| Core Banking | REST API |
| Treasury | Webhooks |
| Payments | ISO 20022 ready |
| KYC/AML | Identity API |
| Reporting | Exportable feeds |

## 6.2 Custody Connectors

| Provider | Status |
|---|---|
| Fireblocks | Native |
| DFNS | Native |
| Custom | SDK available |

---

# Section 7: Deployment

## 7.1 Options

| Model | Description |
|---|---|
| Managed SaaS | SettleMint operated |
| Private Cloud | In client cloud |
| On-Premises | Within SCB data centers |

## 7.2 Recommended

Multi-region deployment for Standard Chartered:
- Primary: AWS eu-west-2 (London)
- Secondary: AWS ap-southeast-1 (Singapore)

---

# Section 8: Implementation

## 8.1 Timeline

| Phase | Duration |
|---|---|
| 1. Discovery | 2 weeks |
| 2. Foundation | 3 weeks |
| 3. Configuration | 4 weeks |
| 4. Integration | 4 weeks |
| 5. Go-Live | 6 weeks |
| **Total** | **19 weeks** |

---

# Section 9: Support

## 9.1 Enterprise Support

For global custody operations, we recommend **Enterprise Support**:

| Capability | Enterprise |
|---|---|
| Coverage | 24/7/365 |
| P1 Response | 15 minutes |
| Uptime | 99.99% |
| Named Team | Yes |
| **Monthly** | **€28,000** |

---

# Section 10: Compliance

## 10.1 Requirements

| Req | Status |
|---|---|
| TR-01 Lifecycle | Comply |
| TR-02 APIs | Comply |
| TR-03 RBAC | Comply |
| TR-04 Configurable | Comply |
| TR-05 Audit | Comply |
| TR-06 Deployment | Comply |
| SR-01 ISO 27001 | Comply |
| SR-02 Encryption | Comply |
| SR-05 Data residency | Comply |

---

# Section 11: Conclusion

## 11.1 Why DALP for Standard Chartered

| Requirement | DALP Response |
|---|---|
| Existing relationship | Digital Virtual Exchange reference |
| Global custody | Multi-entity, multi-region |
| Regulatory | FCA, MAS, HKMA, DORA |
| Security | MPC custody, HSM |

## 11.2 Commitment

- 19-week implementation
- Multi-region deployment
- Enterprise 24/7 support

---

**Submitted by:**
SettleMint NV
March 2026

*Confidential, Standard Chartered evaluation only.*
