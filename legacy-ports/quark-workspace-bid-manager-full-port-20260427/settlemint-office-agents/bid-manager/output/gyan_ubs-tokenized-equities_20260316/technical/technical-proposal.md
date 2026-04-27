# Technical Proposal
## UBS Tokenized Equities Trading Platform

**Document Reference:** UBS-TECH-202603-001
**Version:** 1.0
**Date:** March 2026
**Classification:** Confidential

---

## Executive Summary

SettleMint presents this technical proposal for UBS's Tokenized Equities Trading Platform procurement. DALP provides institutional-grade capabilities for tokenized equity issuance, secondary trading, and lifecycle servicing under Swiss market infrastructure discipline.

Our proposal addresses UBS's specific context: a leading Swiss universal bank requiring tokenized equity capabilities for Swiss-booked and cross-border wealth management distribution under Swiss DLT Act, FINMA, FMIA, and MiFID II requirements.

---

# Section 1: Company Credentials

## 1.1 Production Experience

SettleMint brings directly relevant experience:

**KBC Securities. Equity Tokenization (Belgium)**
- Smart contract backend for equity issuance
- Lifecycle management, corporate actions
- Distribution through regulated channels

**Standard Chartered. Digital Virtual Exchange**
- Multi-asset securities trading
- Institutional compliance
- Cross-border distribution

**Commerzbank. ETP Issuance (Germany)**
- Bond issuance platform
- Market infrastructure integration

## 1.2 Certifications

| Certification | Status |
|---|---|
| ISO 27001 | Certified |
| SOC 2 Type II | Certified |
| Penetration Testing | Active |

---

# Section 2: Platform Architecture

## 2.1 Four-Layer Stack

| Layer | Components |
|---|---|
| Application | Trading Console, dashboards |
| API | REST API, webhooks |
| Middleware | Execution Engine, Signer, Indexer |
| Smart Contract | ERC-3643, equity modules |

## 2.2 Equity-Specific Capabilities

| Capability | Description |
|---|---|
| **Share Tokens** | Equity representation on-chain |
| **Corporate Actions** | Dividends, splits, mergers |
| **Voting Rights** | On-chain governance |
| **Secondary Trading** | Order matching ready |
| **Custody Integration** | Fireblocks/DFNS |
| **Dividend Processing** | Automated distribution |

---

# Section 3: Functional Capabilities

## 3.1 End-to-End Equity Lifecycle

| Phase | DALP Support |
|---|---|
| Issuance | Token creation with share details |
| Investor Onboarding | KYC/AML integration |
| Trading | Order execution, settlement |
| Corporate Actions | Dividends, splits, votes |
| Reporting | Positions, transactions |
| Archival | Immutable on-chain record |

## 3.2 Trading Capabilities

| Feature | Description |
|---|---|
| Order Management | Configurable order types |
| Matching | Integration ready |
| Settlement | T+0, T+1, T+2 |
| Position Tracking | Real-time updates |
| Trade Reconciliation | Automated |

---

# Section 4: Regulatory Alignment

## 4.1 Swiss Compliance

| Regulation | DALP Support |
|---|---|
| **Swiss DLT Act** | DLT-friendly compliance |
| **FINMA** | Outsourcing, operational risk |
| **FMIA** | Market infrastructure rules |
| **MiFID II** | Cross-border distribution |
| **DORA** | Resilience, incidents |
| **GDPR** | Data residency |

## 4.2 Data Residency

| Option | Region |
|---|---|
| Switzerland | AWS eu-central-2 (Zurich) |
| EU | AWS eu-central-1 (Frankfurt) |
| UK | AWS eu-west-2 (London) |

---

# Section 5: Security

## 5.1 Defense-in-Depth

| Layer | Control |
|---|---|
| Authentication | Passkeys, LDAP, OAuth |
| Authorization | 26 roles |
| Key Management | HSM, MPC |
| Wallet Verification | PIN, TOTP |
| Compliance | ERC-3643 on-chain |

## 5.2 Trading-Specific Security

- Transaction signing policies
- Amount limits per role
- Velocity limits
- Audit trails for every trade
- Segregation of duties

---

# Section 6: Integration

## 6.1 API-First

| System | Integration |
|---|---|
| Core Banking | REST API |
| Trading Systems | Webhooks |
| Custody | Fireblocks/DFNS |
| Payments | ISO 20022 |
| KYC/AML | Identity API |
| Reporting | Exportable |

## 6.2 Market Connectivity

- Order execution APIs
- Market data feeds
- Settlement interfaces
- Regulatory reporting

---

# Section 7: Deployment

## 7.1 Options

| Model | Description |
|---|---|
| Managed SaaS | SettleMint operated |
| Private Cloud | Swiss data residency |
| On-Premises | Within UBS |

**Recommended**: Private cloud with Swiss data residency (AWS eu-central-2 Zurich).

---

# Section 8: Implementation

## 8.1 Timeline

| Phase | Duration |
|---|---|
| Discovery | 2 weeks |
| Foundation | 3 weeks |
| Configuration | 4 weeks |
| Integration | 4 weeks |
| Go-Live | 6 weeks |
| **Total** | **19 weeks** |

---

# Section 9: Support

## 9.1 Recommended: Enterprise

Given UBS's scale, we recommend Enterprise Support:

| Capability | Enterprise |
|---|---|
| Coverage | 24/7/365 |
| P1 Response | 15 minutes |
| Uptime | 99.99% |
| Monthly | €28,000 |

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

## 11.1 Why DALP for UBS

| Requirement | DALP Response |
|---|---|
| Swiss compliance | DLT Act, FINMA support |
| Equity trading | Full lifecycle, corporate actions |
| Data residency | Zurich option |
| Trading security | Segregation, limits |

## 11.2 Commitment

- 19-week implementation
- Swiss data residency
- Enterprise 24/7 support

---

**Submitted by:**
SettleMint NV
March 2026

*Confidential, UBS evaluation only.*
