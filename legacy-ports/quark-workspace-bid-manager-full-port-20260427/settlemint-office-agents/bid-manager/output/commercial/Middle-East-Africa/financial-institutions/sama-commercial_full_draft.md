---
title: "Commercial Proposal: Digital Riyal Pilot Orchestration and Control Framework"
client: "SAMA Saudi Central Bank"
date: "2026-03-19"
version: "1.0"
confidentiality: "Restricted. Commercial-Sensitive"
prepared-by: "SettleMint NV"
document-type: "Commercial Proposal"
rfp-reference: "SAMA-SAUDI-CENTRAL-BANK-RFP-DIGITAL-RIYAL-PILOT-202603"
---

# Commercial Proposal

## Digital Riyal Pilot Orchestration and Control Framework

---

**Document Title:** Commercial Proposal. Digital Riyal Pilot Orchestration and Control Framework

**Client:** SAMA Saudi Central Bank (Saudi Arabian Monetary Authority)

**Submission Date:** 2026-03-19

**Version:** 1.0

**Confidentiality:** Restricted. Commercial-Sensitive

**Prepared by:** SettleMint NV

---

> This document contains confidential and proprietary information of SettleMint NV. Distribution or reproduction without prior written consent is prohibited.

---

# Table of Contents

1. Executive Summary
2. Investment Rationale
3. Licensing Model
4. Deployment Options and Pricing
5. Support and SLA Framework
6. Implementation Investment
7. Commercial Terms
8. Total Cost of Ownership
9. Reference Clients
10. Next Steps

---

# 1. Executive Summary

## 1.1 Commercial Decision Summary

SAMA's Digital Riyal pilot is a strategic national infrastructure programme, not a technology procurement in the conventional sense. The commercial decision involves three considerations unique to sovereign central bank programmes:

**Sovereign control:** The platform supplier must not be part of the critical path for any SAMA operational decision. All monetary policy controls, participant management decisions, and signing key material must remain exclusively under SAMA authority. SettleMint's commercial model and technology architecture are designed for this: SAMA holds all keys, SAMA controls all access, and SettleMint provides platform software and delivery support rather than operational control.

**Examination-grade evidence:** SAMA's investment in a Digital Riyal platform must produce evidence sufficient for SAMA board reporting, SAMA internal audit, and potential BIS or international engagement. The commercial agreement must include evidence-production obligations, not just uptime SLAs.

**KSA data sovereignty:** The full investment, infrastructure, operational data, key material, must reside within Saudi Arabia's territorial boundaries. This affects infrastructure cost structure and deployment timeline.

SettleMint recommends DALP Sovereign tier for SAMA's Digital Riyal pilot, with CBDC-enhanced SLA, KSA-region private cloud, and SAMA-controlled HSM for key custody.

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|--------------|--------|--------|--------|-------------|
| Platform Licence (Sovereign Tier) | $720,000 | $720,000 | $720,000 | $2,160,000 |
| Implementation Services | $480,000 | - |, | $480,000 |
| Infrastructure (KSA Private Cloud) | $144,000 | $144,000 | $144,000 | $432,000 |
| CBDC-Enhanced Support (24/7) | $216,000 | $216,000 | $216,000 | $648,000 |
| Training | $36,000 | - | $18,000 | $54,000 |
| HSM Commissioning (one-time) | $60,000 | - |, | $60,000 |
| **Total** | **$1,656,000** | **$1,080,000** | **$1,098,000** | **$3,834,000** |

> Indicative USD amounts. Infrastructure estimated for AWS me-south-1 or Azure KSA region. Sovereign tier pricing reflects SAMA's dedicated instance, unlimited environments, and full client-controlled custody model. HSM commissioning reflects SAMA key ceremony support and HSM integration costs.

## 1.2 Commercial Recommendation

- **Licence tier:** Sovereign, the only tier appropriate for a national central bank CBDC programme
- **Deployment model:** KSA-region private cloud (AWS Riyadh or Azure KSA)
- **Key custody:** Tier 3. SAMA-controlled KSA HSM (SAMA holds all keys)
- **Support:** CBDC-Enhanced 24/7 (P1: 30-minute response; 99.95% uptime)
- **Contract structure:** 3-year initial term with sovereign terms
- **Evidence obligations:** SAMA examination evidence production included as standard

---

# 2. Investment Rationale

## 2.1 Strategic Value vs Cost-of-Inaction

SAMA's Digital Riyal pilot is a Vision 2030 financial sector development programme. The strategic value is not purely economic, it encompasses:

**National financial sovereignty:** A Digital Riyal pilot capability positions Saudi Arabia in the leading cohort of central banks with operational CBDC infrastructure. This has implications for G20 financial policy engagement, BIS relationships, and cross-border CBDC interoperability negotiations.

**Financial sector modernization:** A successful Digital Riyal pilot creates the foundation for broader digitalization of Saudi Arabia's financial infrastructure, including potential retail CBDC, cross-border settlement with GCC partners, and domestic payment system evolution.

**Regulatory capacity building:** Operating a wholesale CBDC programme builds SAMA's institutional capacity for digital currency governance, which has value independent of the technology platform.

**Cost of delay:** Each quarter of delay in establishing CBDC operational capability extends the gap with comparable central banks (UAE, Bahrain, Singapore, UK, EU) who are advancing their programmes.

## 2.2 Why DALP Changes CBDC Economics

The alternative to a production-grade platform for SAMA's Digital Riyal pilot is bespoke central bank development, a path that has historically been expensive, slow, and operationally risky for central banks without prior CBDC technology teams.

**Bespoke CBDC development costs for a central bank:** Core blockchain and CBDC smart contract development: $2,000,000-$3,500,000. Security architecture and HSM integration: $500,000-$800,000. Participant management system: $300,000-$500,000. Settlement and reconciliation infrastructure: $400,000-$700,000. Compliance and audit evidence systems: $300,000-$500,000. Estimated minimum bespoke build: $3,500,000-$6,000,000 for initial pilot capability, before ongoing maintenance.

**Platform advantage:** DALP provides all of this as a configured platform. SAMA pays for platform licence and implementation services, not for development of capabilities that SettleMint has already built and validated in production.

**Project Aber continuity:** DALP runs on Hyperledger Besu with IBFT 2.0 consensus, the same technical stack used in Project Aber. This is not an incidental alignment; it means SAMA's technical team has existing institutional knowledge of the underlying infrastructure that reduces adoption risk and implementation timeline.

## 2.3 ROI Framework

| Value Driver | Baseline (Bespoke Build) | DALP Platform | Estimated Advantage |
|-------------|------------------------|--------------|---------------------|
| Initial capability | $3.5M-$6M build cost | $1.2M implementation + licence | $2.3M-$4.8M Year 1 advantage |
| Ongoing maintenance | $1.0M-$1.5M/year (specialist team) | $720K/year licence | $280K-$780K annual |
| Time-to-pilot | 24-36 months | 20 weeks | 18+ months earlier capability |
| Examination readiness | Must build | Native platform | $200K-$400K evidence system avoided |

---

# 3. Licensing Model

## 3.1 SAMA Licensing Philosophy

SAMA's Digital Riyal pilot is a sovereign infrastructure programme. The licence structure must reflect:
- No transaction-based fees. SAMA cannot have escalating costs as Digital Riyal adoption grows
- No shared infrastructure. SAMA's deployment is completely isolated from other SettleMint clients
- No supplier access to operational controls. SAMA holds all keys, SAMA approves all access

DALP's platform licence model is explicitly designed for this: a fixed annual fee covering all capabilities, all environments, and all participants, with no per-transaction or per-participant charge.

## 3.2 Sovereign Tier: What's Included

| Capability | Included |
|-----------|---------|
| All CBDC token types (digital currency, stablecoin) | ✓ |
| Unlimited environments | ✓ |
| SAMA-controlled key custody (Tier 3) | ✓ |
| Participant management (unlimited licensed FIs) | ✓ |
| All compliance modules (including CBDC-specific) | ✓ |
| Policy instrument delivery (Yield, Airdrop) | ✓ |
| XvP Settlement addon | ✓ |
| Real-time SAMA monitoring dashboard | ✓ |
| Examination evidence export | ✓ |
| SARIE integration adapter | ✓ |
| Arabic language operational support | ✓ |
| BIS-compatible reporting output | ✓ |
| All platform updates for licence term | ✓ |

## 3.3 Platform Tiers

| Feature | Enterprise | Sovereign (Recommended for SAMA) |
|---------|-----------|----------------------------------|
| Environments | 4 | Unlimited |
| Tenant isolation | Dedicated software | Fully isolated instance |
| Key custody | Managed HSM or Client HSM | Client HSM, sovereign control mandatory |
| Supply control | Standard | CBDC minting controls |
| SAMA-specific dashboard | No | Yes, real-time monitoring |
| BIS evidence output | No | Yes |
| SLA | 99.9% | 99.95% |
| P1 response | 1 hour | 30 minutes |
| Annual licence | $480,000 | $720,000 |

**SAMA must use Sovereign tier.** The Enterprise tier does not include the sovereignty controls, isolated instance architecture, or CBDC-specific monitoring required for a national central bank deployment.

---

# 4. Deployment Options and Pricing

## 4.1 KSA-Region Private Cloud: Only Viable Option

For SAMA's Digital Riyal pilot, only KSA-region private cloud deployment is acceptable. Managed SaaS would place SAMA's CBDC data outside KSA territory. On-premises is feasible but adds 10-16 weeks to implementation and significantly increases SAMA's IT infrastructure burden.

**Recommended:** AWS Middle East. Riyadh (me-south-1) or Azure KSA region. Both are accredited for financial services in KSA and provide the security posture required for SAMA's Cyber Security Framework compliance.

Indicative annual infrastructure cost: $144,000. Basis: AWS me-south-1 infrastructure, 4 Besu validator nodes (r6g.2xlarge for CBDC workload), 2 application instances (m6g.4xlarge), RDS for PostgreSQL (db.r6g.2xlarge, multi-AZ), ElastiCache Redis, Secrets Manager (KMS), WAF + Shield Advanced, CloudWatch, and S3 for log/backup storage, both primary and DR availability zones in KSA.

## 4.2 Cost Structure

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|----------|--------|--------|--------|-------------|
| Sovereign Licence | $720,000 | $720,000 | $720,000 | $2,160,000 |
| Implementation | $480,000 | - |, | $480,000 |
| Infrastructure (KSA) | $144,000 | $144,000 | $144,000 | $432,000 |
| CBDC-Enhanced Support | $216,000 | $216,000 | $216,000 | $648,000 |
| Training | $36,000 | - | $18,000 | $54,000 |
| HSM Commissioning | $60,000 | - |, | $60,000 |
| **Total** | **$1,656,000** | **$1,080,000** | **$1,098,000** | **$3,834,000** |

## 4.3 Cost Drivers

| Driver | Impact | Notes |
|--------|--------|-------|
| HSM type (Thales Luna vs alternative) | $40,000-$80,000 one-time | FIPS 140-2 Level 3 certification required |
| Additional participant bank integration support | $20,000-$40,000/bank | If extensive custom integration required |
| BIS-specific reporting format development | $25,000-$50,000 | If non-standard format required |
| Expanded pilot to retail CBDC scope | Licence tier review | Requires separate commercial discussion |
| Cross-border GCC CBDC interoperability | Scope extension | Addendum to programme if required |
| 3-year committed discount | -10% on licence | $216,000 saving |

---

# 5. Support and SLA Framework

## 5.1 CBDC-Enhanced Support Tier

SAMA's Digital Riyal pilot requires support obligations beyond standard Enterprise tier:

| Feature | Enterprise | CBDC-Enhanced (Recommended) |
|---------|-----------|------------------------------|
| Coverage | 24/7 | 24/7 with SAMA-dedicated channel |
| P1 initial response | 1 hour | 30 minutes |
| P1 resolution target | 4 hours | 2 hours |
| Production uptime SLA | 99.9% | 99.95% |
| DR testing | Quarterly | Monthly |
| Named technical lead | Yes | Yes. CBDC specialist |
| Communication channel | Slack | Encrypted SAMA-dedicated channel |
| Arabic support | On request | Standard |
| Annual cost | $144,000 | $216,000 |

## 5.2 Severity Definitions for CBDC

| Level | SAMA-Specific Definition |
|-------|-------------------------|
| P1: Critical | Digital Riyal transfers failing, SAMA minting unavailable, HSM unreachable, settlement queue frozen |
| P2: High | SARIE reconciliation failure, participant portal down, monitoring dashboard unavailable |
| P3: Medium | Non-critical reporting delay, non-essential API latency |
| P4: Low | Documentation, enhancement request |

## 5.3 Uptime SLA

| Environment | Target | Max Monthly Downtime | Measurement |
|-------------|--------|---------------------|-------------|
| Production (CBDC) | 99.95% | 21.9 min/month | Calendar month |
| UAT/Testing | 99.5% | 3.6 hours | Calendar month |

## 5.4 Evidence and Examination Support

In addition to standard support, SettleMint's CBDC-Enhanced tier includes:

- **Monthly SAMA service review:** Named CSM presents platform health metrics, security event summary, and evidence availability confirmation
- **Examination support:** When SAMA is subject to BIS, SAMA Board, or internal audit examination, SettleMint provides structured evidence packs within 5 business days of request
- **Incident post-mortem sharing:** All P1 post-mortems shared with SAMA within 5 business days, in SAMA-approved format

---

# 6. Implementation Investment

## 6.1 CBDC Implementation Methodology

SAMA's Digital Riyal pilot requires a more structured implementation governance than commercial exchange deployments. The additional Phase 2b (SAMA IT Governance Review) is a formal gate, no production configuration work begins before SAMA's security and IT governance teams have approved the architecture, access model, and key management design.

## 6.2 Phase Pricing

| Phase | Duration | Investment | Key Gate |
|-------|---------|-----------|---------|
| Phase 1. Discovery | 2 weeks | $48,000 | SAMA Programme Director sign-off |
| Phase 2. Foundation + HSM | 3 weeks | $72,000 | SAMA IS: infrastructure sign-off |
| Phase 2b. Security Review | 2 weeks | $24,000 (support) | SAMA CIO/CISO approval |
| Phase 3. CBDC Configuration | 4 weeks | $120,000 | SAMA Compliance/Monetary Policy |
| Phase 4. Integration | 3 weeks | $96,000 | SAMA Technology sign-off |
| Phase 5. Pilot Testing | 3 weeks | $72,000 | SAMA Programme Director |
| Phase 6. Production + Hypercare | 3 weeks | $48,000 | Operational readiness |
| **Total** | **20 weeks** | **$480,000** | |

## 6.3 Payment Schedule

| Milestone | Amount | Trigger |
|-----------|--------|---------|
| Contract execution | $144,000 (30%) | Contract signed |
| Phase 1 + 2 gate sign-off | $96,000 (20%) | Infrastructure approved |
| Phase 2b gate (CISO approval) | $48,000 (10%) | IT governance gate passed |
| Phase 3 gate sign-off | $120,000 (25%) | CBDC configuration approved |
| Phase 6 completion | $72,000 (15%) | Operational readiness signed off |

## 6.4 HSM Commissioning

HSM commissioning ($60,000 one-time) covers:
- SAMA HSM procurement support (advisory on FIPS 140-2 Level 3 certified HSM selection)
- HSM API integration with DALP Key Guardian
- Key ceremony process design and SAMA team facilitation
- HSM backup and recovery procedure development
- Key ceremony documentation for SAMA audit records

SettleMint does not supply the HSM hardware itself; SAMA procures through their approved hardware vendor. Commissioning covers integration and ceremony support only.

## 6.5 Training

| Track | Audience | Duration | Cost |
|-------|---------|---------|------|
| SAMA Operator (Supply Control, Participant Mgmt) | SAMA ops team | 3 days | Included |
| SAMA Compliance | Compliance officers | 2 days | Included |
| SAMA Technology | IT/integration team | 3 days | Included |
| Participant Bank Technical | Licensed FI IT teams | 1 day | Included |
| Arabic documentation package | All tracks | - | Included |

---

# 7. Commercial Terms

## 7.1 Contract Structure

SAMA's commercial engagement uses a sovereign-appropriate contract structure:

| Agreement | Scope |
|-----------|-------|
| Sovereign Platform Licence | DALP software licence with sovereignty terms, IP boundaries, key custody rights, data handling |
| Professional Services Order | Implementation, HSM commissioning, training |
| Sovereign Support Agreement | CBDC-enhanced support, evidence obligations, examination support |
| Data Processing Agreement | KSA data handling, PDPL compliance, SAMA data sovereignty |

## 7.2 Sovereign-Specific Terms

| Term | Position |
|------|---------|
| Key custody | SAMA holds all signing keys in SAMA-controlled HSM; SettleMint has no key access |
| SettleMint system access | Requires SAMA-issued credentials; all sessions logged; no unilateral access |
| Audit rights | SAMA (and its auditors) have full audit access to all platform configurations, logs, and evidence |
| Data location | All production data in KSA territory; confirmed in data processing agreement |
| Platform updates | All updates require SAMA approval before production deployment |
| Subcontractor disclosure | All cloud infrastructure and third-party dependencies disclosed; SAMA approval required for changes |
| Continuity obligation | If SettleMint is unable to continue support, escrow release enables SAMA to maintain operations |

## 7.3 Duration and Payment

| Term | Detail |
|------|--------|
| Initial licence term | 3 years from contract execution |
| Licence activation | From contract execution |
| Payment currency | USD or SAR equivalent |
| Multi-year discount | 10% on licence fees for 3-year upfront commitment |
| Renewal | Annual renewal option at agreed pricing |

## 7.4 Liability

For sovereign programmes, liability terms are subject to negotiation. SettleMint's default liability cap of 12 months of licence fees will be discussed with SAMA's legal team. Standard exclusions apply for indirect/consequential losses.

## 7.5 Escrow

Source code escrow is strongly recommended for sovereign CBDC infrastructure. SettleMint provides escrow with a mutually agreed escrow agent (NCC Group or equivalent). Release conditions: SettleMint insolvency, cessation of CBDC platform support for 90+ days. Escrow costs borne by SAMA.

---

# 8. Total Cost of Ownership

## 8.1 TCO vs Bespoke CBDC Development

| Category | DALP Sovereign | Bespoke CBDC Build | Multi-Vendor Assembly |
|----------|---------------|-------------------|----------------------|
| Year 1 | $1,656,000 | $4,500,000-$6,500,000 | $3,000,000-$4,500,000 |
| Year 2 | $1,080,000 | $1,500,000-$2,000,000 | $1,500,000-$2,000,000 |
| Year 3 | $1,098,000 | $1,500,000-$2,000,000 | $1,500,000-$2,000,000 |
| **3-Year Total** | **$3,834,000** | **$7,500,000-$10,500,000** | **$6,000,000-$8,500,000** |
| Time to first pilot | 20 weeks | 24-36 months | 18-30 months |
| Examination readiness | Native | Must build | Requires integration |
| Project Aber alignment | Yes (same stack) | Design from scratch | Uncertain |
| Sovereignty controls | Full | Depends on design | Uncertain |

## 8.2 Five-Year Projection

| Year | DALP | Bespoke |
|------|------|---------|
| 1 | $1,656,000 | $5,000,000 |
| 2 | $1,080,000 | $1,700,000 |
| 3 | $1,098,000 | $1,700,000 |
| 4 | $1,098,000 | $1,800,000 |
| 5 | $1,098,000 | $1,900,000 |
| **5-Year** | **$6,030,000** | **$12,100,000** |

5-year DALP advantage: $6,070,000 vs bespoke build; $4,400,000+ vs multi-vendor assembly.

---

# 9. Reference Clients

| Client | Use Case | Relevance to SAMA |
|--------|---------|------------------|
| Central Bank of UAE | Digital Dirham CBDC infrastructure | Gulf central bank CBDC deployment; UAE data sovereignty; Project Aber technical continuity |
| Project Aber (SAMA-CBUAE-BIS) | Wholesale interbank CBDC pilot | Same technical stack (Besu/IBFT); same regulatory context |
| Al Rajhi Bank | Sharia-compliant tokenized products (KSA) | KSA regulatory environment; Islamic finance compliance |
| Saudi National Bank | Fixed income digital assets (KSA) | KSA deployment experience; SAMA regulatory alignment |
| BIS Innovation Hub (research) | CBDC research engagement | BIS-level evidence and reporting standards |

---

# 10. Next Steps

| Step | Owner | Timing |
|------|-------|--------|
| SAMA Programme evaluation | SAMA Innovation/IT | Week 1-3 |
| Technical presentation to SAMA Architecture | SettleMint | Week 2-3 |
| SAMA Security review session | SettleMint + SAMA IS | Week 3-4 |
| HSM vendor selection discussion | SAMA IT + SettleMint | Week 3-4 |
| SARIE integration specification workshop | Both + SARIE team | Week 4 |
| Sovereign contract terms discussion | SAMA Legal + SettleMint | Week 4-5 |
| Commercial agreement finalization | Both | Week 5-7 |
| Programme kickoff | Both | Within 2 weeks of contract |

SettleMint is prepared for SAMA IT governance review sessions, security architecture walkthroughs, and SAMA board-level briefings as appropriate to the procurement process.

---

*End of Commercial Proposal. SAMA Saudi Central Bank*

*Document Version: 1.0 | Date: 2026-03-19 | Classification: Restricted. Commercial-Sensitive*

*SettleMint NV | Rue Montoyer 39, 1000 Brussels, Belgium | www.settlemint.com*
