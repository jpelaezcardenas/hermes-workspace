# Technical Proposal
## Société Générale Digital Bonds Platform (FORGE-like)

**Document Reference:** SG-TECH-202603-001
**Version:** 1.0
**Date:** March 2026
**Classification:** Confidential

---

## Executive Summary

SettleMint presents this technical proposal for Société Générale's Digital Bonds Platform procurement. DALP provides a production-grade platform suitable for institutional digital capital markets operations, building on our proven experience with European regulated banks including Commerzbank in Germany.

Our proposal addresses Société Générale's specific context: a leading French bank with established digital asset operations through SG-FORGE, seeking to industrialize digital bond issuance under French and EU regulatory requirements (AMF, ACPR, MiCA, DORA).

---

# Section 1: Company Credentials

## 1.1 Production Experience

SettleMint brings directly relevant experience:

**Commerzbank. Hybrid ETP Issuance (Germany)**
- One of Germany's largest banks
- Hybrid on-chain/off-chain model integrated with Boerse Stuttgart
- Settlement under 10 seconds
- EUR 7M projected annual savings
- **This is our strongest reference for French bond issuance**

**Additional Relevant References:**
- Standard Chartered: Multi-asset securities platform
- OCBC Bank: Security token engine for securitization
- ADI-Finstreet: Institutional equity issuance

## 1.2 Certifications

| Certification | Status |
|---|---|
| ISO 27001 | Certified |
| SOC 2 Type II | Certified |
| Penetration Testing | Active |
| Smart Contract Audits | Active |

---

# Section 2: Platform Architecture

## 2.1 Four-Layer Stack

| Layer | Components |
|---|---|
| Application | Asset Console, dashboards |
| API | REST API, TypeScript SDK, webhooks |
| Middleware | Execution Engine, Key Guardian, Chain Indexer |
| Smart Contract | ERC-3643/SMART Protocol, DALPAsset |

## 2.2 Bond-Specific Capabilities

DALPAsset provides institutional bond functionality:

| Capability | Description |
|---|---|
| **ISIN Integration** | On-chain ISIN linkage for regulatory reporting |
| **Maturity Management** | Automated redemption at maturity |
| **Coupon Processing** | Scheduled yield distribution |
| **Denomination Assets** | Multi-currency support (EUR, USD, etc.) |
| **Bookbuilding** | Investor allocation tracking |
| **Custody Integration** | Fireblocks/DFNS for institutional custody |

---

# Section 3: Functional Capabilities

## 3.1 End-to-End Bond Lifecycle

| Phase | DALP Support |
|---|---|
| Origination | Asset Designer for bond parameters |
| Investor Onboarding | OnchainID identity with KYC integration |
| Issuance | Minting with compliance gates |
| Servicing | Coupon distribution, corporate actions |
| Transfer | Atomic settlement (DvP) |
| Redemption | Automated burn at maturity |
| Archival | Immutable on-chain record |

## 3.2 French/EU Compliance

| Regulation | DALP Support |
|---|---|
| MiCA | Pre-built compliance modules |
| MiFID II | Transaction reporting |
| AMF Doctrine | Configurable for French requirements |
| DORA | Resilience, incident classification |
| GDPR | Data residency, access controls |

---

# Section 4: Integration

## 4.1 API-First Architecture

| Integration | Method |
|---|---|
| Core Banking | REST API |
| Custody | Fireblocks/DFNS connector |
| Payments | ISO 20022 ready |
| KYC/AML | Identity API |
| Reporting | Exportable data feeds |

## 4.2 Reconciliation

Clear golden-source boundaries:
- Token holdings: DALP on-chain
- Investor records: SG systems
- Cash positions: Treasury

---

# Section 5: Security

## 5.1 Defense-in-Depth

| Layer | Control |
|---|---|
| Authentication | Passkeys, LDAP, OAuth |
| Authorization | 26 roles across 4 layers |
| Wallet Verification | PIN, TOTP, backup codes |
| Compliance | ERC-3643 on-chain |
| Custody | MPC (Fireblocks/DFNS) |

## 5.2 Audit Trails

Full audit logging:
- Authentication events
- Configuration changes
- Compliance decisions
- Administrative actions

---

# Section 6: Deployment

## 6.1 Options

| Model | Description |
|---|---|
| Managed SaaS | SettleMint operated |
| Private Cloud | In client cloud (AWS eu-west-3 Paris available) |
| On-Premises | Within SG data centers |

**Recommended**: Private cloud with French data residency (AWS eu-west-3).

## 6.2 Disaster Recovery

| Scenario | RTO | RPO |
|---|---|---|
| Cloud-native | 2-15 min | Seconds |
| Active-standby | 30-180 min | 5-60 min |

---

# Section 7: Implementation

## 7.1 Timeline

| Phase | Duration |
|---|---|
| 1. Discovery | 2 weeks |
| 2. Foundation | 3 weeks |
| 3. Configuration | 4 weeks |
| 4. Integration | 4 weeks |
| 5. Go-Live | 6 weeks |
| **Total** | **19 weeks** |

## 7.2 Training

Role-specific training:
- Administrator (3-4 days)
- Developer (4-5 days)
- End-User (2 days)

---

# Section 8: Support

## 8.1 Premium Support

| Capability | Premium |
|---|---|
| Coverage | 07:00-22:00 CET |
| P1 Response | 1 hour |
| Uptime | 99.95% |
| Channels | Email, portal, Slack, phone |

---

# Section 9: Compliance Matrix

## 9.1 Requirements

| Req | Status |
|---|---|
| TR-01 End-to-end lifecycle | Comply |
| TR-02 APIs | Comply |
| TR-03 RBAC | Comply |
| TR-04 Configurable | Comply |
| TR-05 Audit trails | Comply |
| TR-06 Deployment | Comply |
| TR-07 Interoperability | Comply |
| TR-08 Dashboards | Comply |
| TR-09 Export | Comply |
| SR-01 ISO 27001 | Comply |
| SR-02 Encryption | Comply |
| SR-03 PAM | Comply |
| SR-04 Penetration | Comply |
| SR-05 Data residency | Comply |
| SR-06 SIEM | Comply |

---

# Section 10: Conclusion

## 10.1 Why DALP for Société Générale

| Requirement | DALP Response |
|---|---|
| FORGE-like platform | Proven Commerzbank ETP reference |
| French/EU compliance | AMF, MiCA, DORA support |
| Industrial scale | 14+ regulated deployments |
| Integration | API-first, ISO 20022 ready |

## 10.2 Commitment

- 19-week implementation
- French data residency option
- Full operational ownership

---

**Submitted by:**
SettleMint NV
March 2026

*Confidential, Société Générale evaluation only.*
