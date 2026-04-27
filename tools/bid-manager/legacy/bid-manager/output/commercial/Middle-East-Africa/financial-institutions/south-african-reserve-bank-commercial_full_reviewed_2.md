---
title: "Commercial Proposal: Project Khokha-Aligned CBDC and Tokenized Settlement Support"
client: "South African Reserve Bank"
date: "2026-03-19"
version: "1.0"
confidentiality: "Restricted. Commercial-Sensitive"
prepared-by: "SettleMint NV"
document-type: "Commercial Proposal"
rfp-reference: "SOUTH-AFRICAN-RESERVE-BANK-RFP-PROJECT-KHOKHA-CBDC-202603"
---

# Commercial Proposal

## Project Khokha-Aligned CBDC and Tokenized Settlement Support

---

**Document Title:** Commercial Proposal. Project Khokha-Aligned CBDC and Tokenized Settlement Support

**Client:** South African Reserve Bank (SARB)

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

SARB's Project Khokha-aligned CBDC programme builds on years of research and proof-of-concept work. The commercial decision is about moving from research to production infrastructure. The question is not whether CBDC is technically feasible. Project Khokha I and II answered that, but which platform provides the production-grade governance, SAMOS/Strate integration, and South African data sovereignty posture needed for SARB to operate a live CBDC programme responsibly.

SettleMint recommends DALP Sovereign tier with CBDC-enhanced 24/7 support, South Africa-region private cloud, and SARB-controlled HSM.

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|--------------|--------|--------|--------|-------------|
| Platform Licence (Sovereign) | $720,000 | $720,000 | $720,000 | $2,160,000 |
| Implementation Services | $460,000 | - |, | $460,000 |
| Infrastructure (ZA Private Cloud) | $120,000 | $120,000 | $120,000 | $360,000 |
| CBDC-Enhanced Support | $216,000 | $216,000 | $216,000 | $648,000 |
| Training | $36,000 | - | $18,000 | $54,000 |
| HSM Commissioning | $55,000 | - |, | $55,000 |
| **Total** | **$1,607,000** | **$1,056,000** | **$1,074,000** | **$3,737,000** |

> Indicative USD amounts. Infrastructure estimated for AWS af-south-1 Cape Town or Azure South Africa North Johannesburg. ZAR-denominated pricing available at contract exchange rate.

## 1.2 Why Platform over Bespoke

SARB's existing investment in Project Khokha created institutional knowledge of Hyperledger Besu and IBFT 2.0. DALP runs on the same stack. The investment in a platform licence builds on this foundation rather than abandoning it.

**Bespoke continuation cost:** Extending Project Khokha's proof-of-concept to a production-capable platform with SAMOS/Strate integration, governance controls, and operations tooling would require: 6-8 senior engineers for 18-24 months ($1.5M-$2.5M), external security and regulatory review ($400K-$600K), integration architecture build ($500K-$800K). Total: $2.4M-$3.9M before ongoing maintenance.

**DALP advantage:** DALP provides the production layer that converts Khokha's research foundation into an operational platform. SARB pays for configuration and integration, not for rebuilding capabilities that already exist in production.

---

# 2. Investment Rationale

## 2.1 Project Khokha to Production: The Investment Bridge

| Phase | Description | Cost Implication |
|-------|-------------|-----------------|
| Project Khokha I (2018) | Wholesale CBDC PoC on Besu | Research investment (sunk) |
| Project Khokha II (2021) | DvP securities settlement PoC | Research investment (sunk) |
| Project Khokha III (DALP) | Production-capable platform | This procurement |
| Future: Broader CBDC | Retail CBDC, cross-border | Platform expansion (included) |

DALP's Sovereign tier includes the capability to expand from wholesale CBDC pilot to broader retail or cross-border scope without platform replacement. The Sovereign licence covers unlimited environments, all asset types, and all participant scales.

## 2.2 ROI Framework

| Value Driver | Without Platform | DALP | Advantage |
|-------------|-----------------|------|-----------|
| Time to production | 24+ months bespoke | 20 weeks | 18+ months earlier |
| Build cost | $2.4M-$3.9M | $460K implementation | $2M-$3.4M Year 1 |
| SAMOS integration | Custom development | Pre-built ISO 20022 | $200K-$400K saving |
| Strate integration | Custom development | Pre-built patterns | $150K-$300K saving |
| Annual maintenance | $800K-$1.2M team | Included in licence | Ongoing saving |
| BIS/G20 evidence | Must build | Native platform | $100K-$200K saving |

---

# 3. Licensing Model

## 3.1 Sovereign Tier: NPS Infrastructure

SARB's programme is National Payments System (NPS) infrastructure. The Sovereign tier is appropriate:
- Fully isolated instance (no shared infrastructure with other SettleMint clients)
- SARB-controlled key custody (Tier 3. SARB holds all keys)
- Unlimited environments
- CBDC-specific minting controls and monitoring
- SAMOS and Strate integration adapters included
- PA/FSCA evidence export capability included
- Cybercrimes Act cybersecurity controls documented

Annual licence: $720,000 (Sovereign tier). Multi-year committed discount: -10% ($216,000 total saving).

## 3.2 Tier Comparison

| Feature | Enterprise | Sovereign (Recommended) |
|---------|-----------|------------------------|
| Instance isolation | Dedicated software | Fully isolated instance |
| SAMOS integration | Not included | Included |
| Strate integration | Not included | Included |
| CBDC minting controls | Standard | NPS-grade |
| PA/FSCA evidence tags | No | Yes |
| SLA | 99.9% | 99.95% |
| P1 response | 1 hour | 30 minutes |
| Annual cost | $480,000 | $720,000 |

---

# 4. Deployment Options and Pricing

## 4.1 South Africa Cloud Region: Recommended

AWS af-south-1 (Cape Town) or Azure South Africa North (Johannesburg) provide:
- South African data residency (POPIA compliance)
- Sub-20ms latency to Johannesburg financial district
- Financial services security certification
- ZAR-denominated infrastructure billing option

Indicative annual infrastructure: $120,000. Basis: AWS af-south-1, 4 Besu validators (r6g.2xlarge), 2 application instances (m6g.4xlarge), RDS PostgreSQL (db.r6g.2xlarge multi-AZ), ElastiCache, KMS, WAF + Shield, CloudWatch, S3, both primary (Cape Town) and DR (ZA secondary zone).

## 4.2 Cost Structure

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|----------|--------|--------|--------|-------------|
| Sovereign Licence | $720,000 | $720,000 | $720,000 | $2,160,000 |
| Implementation | $460,000 | - |, | $460,000 |
| Infrastructure (ZA) | $120,000 | $120,000 | $120,000 | $360,000 |
| CBDC-Enhanced Support | $216,000 | $216,000 | $216,000 | $648,000 |
| Training | $36,000 | - | $18,000 | $54,000 |
| HSM Commissioning | $55,000 | - |, | $55,000 |
| **Total** | **$1,607,000** | **$1,056,000** | **$1,074,000** | **$3,737,000** |

## 4.3 Cost Drivers

| Driver | Impact |
|--------|--------|
| Non-standard SAMOS message format | +$25,000-$50,000 |
| Tessera privacy extension integration | +$30,000-$60,000 |
| Additional bank participant integrations | +$15,000-$30,000/bank |
| Cross-border CBDC interoperability (future) | Scope addendum |
| 3-year committed discount | -$216,000 on licence |
| ZAR-denominated pricing | At contract date exchange rate |

---

# 5. Support and SLA Framework

| Feature | CBDC-Enhanced |
|---------|--------------|
| Coverage | 24/7/365 |
| P1 response | 30 minutes |
| P1 resolution | 2 hours |
| Production uptime | 99.95% |
| DR test | Monthly (SARB-witnessed) |
| PA/FSCA examination support | Evidence packs within 5 business days |
| Named contacts | CSM + CBDC technical lead |
| Annual cost | $216,000 |

## 5.1 P1 Definitions for NPS Infrastructure

| P1 Category | Examples |
|------------|---------|
| CBDC P1 | ZAR CBDC transfers failing, SARB minting unavailable, HSM unreachable |
| Settlement P1 | DvP instruction processing blocked, SAMOS connectivity lost |
| Platform P1 | Platform unreachable, database connection failure |

## 5.2 Uptime SLA with Service Credits

| SLA Band | Credit |
|----------|--------|
| 99.9%-99.95% | 10% monthly support credit |
| 99.5%-99.9% | 25% credit |
| Below 99.5% | 50% credit |

---

# 6. Implementation Investment

## 6.1 Phase Pricing

| Phase | Duration | Investment |
|-------|---------|-----------|
| Phase 1. Discovery | 2 weeks | $46,000 |
| Phase 2. Foundation + HSM | 3 weeks | $69,000 |
| Phase 2b. SARB Security Review | 2 weeks | $23,000 |
| Phase 3. CBDC + DvP Config | 4 weeks | $115,000 |
| Phase 4. SAMOS + Strate + Integration | 3 weeks | $92,000 |
| Phase 5. Pilot Testing | 3 weeks | $69,000 |
| Phase 6. Production + Hypercare | 3 weeks | $46,000 |
| **Total** | **20 weeks** | **$460,000** |

## 6.2 Payment Schedule

| Milestone | Amount |
|-----------|--------|
| Contract execution (Licence Y1 + Support Y1) | $936,000 |
| Phase 1 gate | $69,000 (15%) |
| Phase 2b gate (CISO approval) | $46,000 (10%) |
| Phase 3 gate | $115,000 (25%) |
| Phase 6 completion | $230,000 (50% remaining) |

---

# 7. Commercial Terms

## 7.1 Contract Structure

| Agreement | Scope |
|-----------|-------|
| Sovereign Platform Licence | DALP software, sovereignty terms, key custody rights |
| Professional Services | Implementation, HSM commissioning, training |
| NPS Support Agreement | CBDC-enhanced support, evidence obligations |
| Data Processing Agreement | POPIA compliance, ZA data handling |

## 7.2 SARB-Specific Terms

| Term | Position |
|------|---------|
| Key custody | SARB holds all keys; SettleMint has no key access |
| System access | SARB-issued credentials; all sessions logged |
| Audit rights | SARB and its regulators (PA, FSCA) have full audit access |
| Data location | All data in ZA territory |
| Update approval | All production updates require SARB approval |
| NPS Act compliance | Platform supports SARB's NPS obligations |
| Escrow | Strongly recommended; source code + configuration |

## 7.3 Duration

- **Initial term:** 3 years from contract execution
- **Currency:** USD or ZAR at contract rate
- **Multi-year discount:** 10% on platform licence fees ($216,000 total)

## 7.4 Liability

SARB is a statutory institution. Liability terms are subject to negotiation consistent with applicable South African law and SARB's procurement policy. Default liability cap is 12 months of licence fees. SettleMint is open to liability structures appropriate for NPS critical infrastructure contracts.

---

# 8. Total Cost of Ownership

## 8.1 Three-Year TCO vs Bespoke Build

| Category | DALP Sovereign | Bespoke CBDC Extension | Multi-Vendor |
|----------|---------------|------------------------|-------------|
| Year 1 | $1,607,000 | $3,800,000-$5,500,000 | $2,800,000-$4,000,000 |
| Year 2 | $1,056,000 | $1,200,000-$1,500,000 | $1,400,000-$1,800,000 |
| Year 3 | $1,074,000 | $1,200,000-$1,500,000 | $1,400,000-$1,800,000 |
| **3-Year** | **$3,737,000** | **$6,200,000-$8,500,000** | **$5,600,000-$7,600,000** |
| Time to production | 20 weeks | 24+ months | 18+ months |
| Khokha alignment | Native (same stack) | Design from scratch | Uncertain |
| SAMOS/Strate integration | Included | Custom development | Separate vendor |

## 8.2 Five-Year Projection

| Year | DALP | Bespoke |
|------|------|---------|
| 1 | $1,607,000 | $4,500,000 |
| 2 | $1,056,000 | $1,350,000 |
| 3 | $1,074,000 | $1,400,000 |
| 4 | $1,074,000 | $1,450,000 |
| 5 | $1,074,000 | $1,500,000 |
| **5-Year** | **$5,885,000** | **$10,200,000** |

5-year DALP advantage: $4,315,000 vs bespoke; $3,700,000+ vs multi-vendor.

---

# 9. Reference Clients

| Client | Use Case | SARB Relevance |
|--------|---------|----------------|
| Central Bank of UAE | Digital Dirham CBDC | Central bank CBDC deployment; sovereign control model |
| Project Khokha I/II (SARB) | Wholesale CBDC PoC | Same technical stack (Besu/IBFT 2.0); direct continuity |
| JSE Digital Post-Trade | South African market infrastructure | Local market context; Strate interaction patterns |
| Standard Bank (South Africa context) | Digital assets | South African regulatory environment |
| BIS Innovation Hub | CBDC research | BIS evidence standards; international CBDC engagement |

---

# 10. Next Steps

| Step | Owner | Timing |
|------|-------|--------|
| SARB evaluation period | SARB Innovation/IT | Week 1-3 |
| Technical presentation to SARB Architecture | SettleMint | Week 2-3 |
| SAMOS integration specification workshop | Both + SAMOS team | Week 3-4 |
| Strate integration design session | Both + Strate team | Week 3-4 |
| SARB Security review session | SettleMint + SARB IS | Week 4 |
| HSM vendor selection discussion | SARB IT + SettleMint | Week 4 |
| Sovereign contract discussion | SARB Legal + SettleMint | Week 4-5 |
| Commercial agreement | Both | Week 5-7 |
| Programme kickoff | Both | Within 2 weeks of contract |

SettleMint will provide a Project Khokha technical continuity briefing note for SARB's architecture team on request, demonstrating the specific technical alignment between Project Khokha I/II and DALP's Besu/IBFT 2.0 implementation.

---

*End of Commercial Proposal. South African Reserve Bank*

*Document Version: 1.0 | Date: 2026-03-19 | Classification: Restricted. Commercial-Sensitive*

*SettleMint NV | Rue Montoyer 39, 1000 Brussels, Belgium | www.settlemint.com*
