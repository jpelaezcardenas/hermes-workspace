---
title: "Commercial Proposal: Digital Asset Custody Pilot Platform"
client: "ICBC"
reference: "ICBC-RFP-202603"
date: "March 2026"
version: "v1.0 DRAFT"
classification: "Confidential"
prepared_by: "SettleMint"
---

# Commercial Proposal: Digital Asset Custody Pilot Platform

**Prepared for:** Industrial and Commercial Bank of China (ICBC)
**Reference:** ICBC-RFP-202603
**Date:** March 2026
**Version:** v1.0
**Classification:** Strictly Confidential. Invited Bidders Only
**Prepared by:** SettleMint NV

---

## Table of Contents

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

## 1. Executive Summary

ICBC's digital asset custody pilot is not just a technology procurement. It is the establishment of an institutional capability that will be scrutinised by CSRC, PBOC, and the broader market as evidence of what regulated digital asset custody in China can look like. The commercial decision is therefore not just about cost. It is about which platform gives ICBC the control, evidence quality, and operational maturity that institutional custody demands.

SettleMint recommends DALP under an Enterprise License with on-premises deployment within ICBC's data centres. The commercial structure:

- **Annual platform license:** CNY [VARIABLE] for Enterprise Tier, covering full custody lifecycle capability including the Custodian extension, compliance module system, key management, observability, and API access.
- **Implementation services:** CNY [VARIABLE] across 38 weeks, covering all phases from discovery through hypercare.
- **Enterprise support:** 24/7 P1 coverage, named TAM and CSM, monthly engineering review.

**Commercial decision snapshot:**

| Factor | DALP | Build In-House | Custody Software Assembly |
|--------|------|----------------|--------------------------|
| Time to production custody capability | 9-10 months | 24-36 months | 15-20 months |
| Custodian extension (force transfer, freeze, recovery) | Native | Custom engineering required | Depends on components |
| CSRC-compliant audit evidence | Automated, built-in | Custom engineering | Fragmented |
| Regulatory alignment (PBOC/CSRC/CAC) | Configurable deployment | Design burden entirely on ICBC | Integration burden |
| Scalability to additional custody programmes | Configuration only | Engineering cycles | Re-procurement |

## 2. Investment Rationale

### 2.1 Cost of Current Approach

ICBC's current digital asset custody capability (where it exists) relies on manual position tracking, email-based approval chains, and reconciliation processes that scale poorly. The hidden costs include:

- Dedicated reconciliation and operations FTE who manually verify custody positions against source systems
- Compliance evidence assembly that requires manual review of multiple systems when CSRC or internal audit request documentation
- Key management processes that depend on individual expertise rather than systematic HSM-enforced policies
- Absence of a reusable custody architecture means every new digital asset programme requires a new design cycle

### 2.2 Why DALP Changes the Economics

DALP eliminates the manual reconciliation burden by maintaining a Chain-Indexer-backed position ledger that reconciles continuously. Compliance evidence is generated automatically as a by-product of operations. Custodian operations (freeze, forced transfer, recovery) are platform capabilities rather than custom engineering projects. New custody programmes launch through configuration rather than fresh engineering cycles.

### 2.3 ROI Framework

| Value Driver | Conservative | Expected | Upside |
|-------------|-------------|---------|--------|
| Custodian operations automation | 40% FTE reduction | 55% FTE reduction | 70% FTE reduction |
| Compliance evidence cost reduction | 45% | 60% | 75% |
| Speed to additional custody programmes | 3 months faster | 5 months faster | 7 months faster |
| CSRC audit response time | 30% faster | 50% faster | 70% faster |

All estimates are indicative; validation is required during discovery.

## 3. Licensing Model

### 3.1 Philosophy

Platform-based licensing: fixed annual fee for the full DALP capability set. No per-custody-operation fees. No per-asset-class fees. ICBC's custody volumes and programme expansion do not trigger additional license costs within the agreed scope.

### 3.2 What's Included

| Capability | Included |
|-----------|---------|
| Full custody lifecycle (issuance, transfer, servicing, redemption) | Yes |
| Custodian extension (force transfer, freeze, recovery, batch) | Yes |
| Compliance module system (all standard modules) | Yes |
| Key Guardian (software; HSM hardware client-procured) | Yes |
| OpenAPI 3.1 and TypeScript SDK | Yes |
| Full observability stack | Yes |
| Identity registry (OnchainID) | Yes |
| Asset Console with custody operations UI | Yes |
| Platform updates and security patches | Yes |

### 3.3 Platform Tiers

| Tier | Fit | Recommended |
|------|-----|-------------|
| Foundation | Single custody programme, single legal entity | No |
| Enterprise | Multiple custody programmes, multiple asset classes | Yes |
| Sovereign | National-scale, central bank or regulatory authority | Consider for future expansion |

**Recommended for ICBC:** Enterprise Tier. The pilot scope likely covers multiple asset classes and will expand to additional custody programmes. Enterprise Tier provides the environment count and multi-programme flexibility required without triggering re-procurement at each expansion.

## 4. Deployment Options and Pricing

### 4.1 Recommended: On-Premises within ICBC Data Centres

Given CAC data localisation requirements and PBOC oversight expectations, on-premises deployment within ICBC's data centres is the appropriate model. Private cloud within a Chinese cloud provider is an alternative if ICBC's infrastructure strategy favours cloud.

### 4.2 Cost Structure

| Category | Type | Notes |
|----------|------|-------|
| Platform license (Enterprise) | Recurring annual | CNY [VARIABLE] |
| Infrastructure (ICBC data centre) | Recurring | Client-borne; CNY [VARIABLE] estimated |
| HSM hardware (Thales Luna or nCipher) | One-time + maintenance | Client-procured; CNY [VARIABLE] |
| Implementation services | One-time | CNY [VARIABLE: scoped at discovery] |
| Enterprise support | Recurring annual | CNY [VARIABLE] |
| Training | One-time | CNY [VARIABLE] |

### 4.3 Cost Drivers

| Driver | Effect |
|--------|--------|
| On-premises HSM setup and configuration | 6-8 week lead time; plan procurement at contract signature |
| Multiple custody programme scope in pilot | Wider configuration scope; potentially longer Phase 2 |
| CSRC reporting format complexity | May add 2-3 weeks to integration phase if non-standard formats required |
| Large ICBC operations team requiring training | Increases training investment; train-the-trainer approach recommended |

## 5. Support and SLA Framework

### 5.1 Enterprise Support Tier

24/7 P1 coverage. P1 response: 15 minutes. P2 response: 1 hour. Named TAM and CSM. Monthly operational review with SettleMint engineering. 99.9% monthly uptime SLA. Service credit mechanics as per MSA.

### 5.2 Severity Definitions

| Severity | Definition |
|----------|-----------|
| P1 Critical | Complete platform outage; all custody operations stopped |
| P2 High | Partial outage; specific asset classes or custody operations unavailable |
| P3 Medium | Degraded performance; workaround available |
| P4 Low | Non-urgent; advisory or documentation request |

## 6. Implementation Investment

### 6.1 Phase Summary

| Phase | Duration | Gate Criteria |
|-------|----------|--------------|
| 1. Discovery | 6 weeks | Custody model and compliance mapping signed off |
| 2. Configuration | 8 weeks | Custody operations demonstrable in SIT |
| 3. Integration | 8 weeks | GL reconciliation and CSRC data validated |
| 4. Testing | 8 weeks | UAT signed off; security review passed; DR tested |
| 5. Go-Live | 2 weeks | Steering committee approval |
| 6. Hypercare | 6 weeks | KPI targets met 10 consecutive days |

### 6.2 Pricing Summary

| Phase | Indicative Investment (CNY) |
|-------|----------------------------|
| Discovery | [VARIABLE] |
| Configuration | [VARIABLE] |
| Integration | [VARIABLE] |
| Testing | [VARIABLE] |
| Go-Live | [VARIABLE] |
| Hypercare | [VARIABLE] |
| **Total** | **[VARIABLE]** |

### 6.3 Accelerators and Risks

| Type | Item |
|------|------|
| Accelerator | Pre-built custody compliance templates (force transfer, freeze, recovery policies) |
| Accelerator | OnchainID identity claim templates for ICBC KYC integration |
| Risk | HSM procurement and certification lead time |
| Risk | CSRC reporting format specification delay |
| Risk | Slow internal governance approval for compliance module configuration |

### 6.4 Training

| Role | Duration |
|------|---------|
| Platform administrators | 3 days |
| Custody operations team | 2 days |
| Compliance officers | 1 day |
| Internal audit | 0.5 days |
| Integration developers | 2 days |

## 7. Commercial Terms

### 7.1 Contract Structure

MSA (platform license, IP, liability, confidentiality), SoW (implementation scope and pricing), Support Agreement (SLA, escalation, credits), DPA (PIPL and CAC data obligations). All co-terminous. DPA survives termination.

### 7.2 Payment Schedule

| Milestone | % of Implementation |
|-----------|---------------------|
| Contract execution | 20% |
| Discovery completion | 15% |
| Configuration completion | 20% |
| Integration completion | 20% |
| Testing completion | 15% |
| Go-Live and hypercare | 10% |

Annual license and support invoiced annually in advance.

### 7.3 Duration

Initial term: 3 years recommended. License activation from production go-live. Multi-year commitment provides best commercial terms.

### 7.4 IP Ownership

DALP platform and SMART Protocol: SettleMint NV. ICBC custody configuration, transaction data, and operational records: ICBC. Integration code: negotiable. Documentation from implementation: ICBC with SettleMint usage rights.

### 7.5 Exit and Transition

90-day notice for termination. Complete data export in JSON and CSV formats included. 90-day transition support at hourly rates available.

## 8. Total Cost of Ownership

### 8.1 TCO Comparison

| Dimension | DALP | Build In-House | Assembled Solution |
|-----------|------|----------------|-------------------|
| Time to custody capability | 9-10 months | 24-36 months | 15-20 months |
| Ongoing engineering burden | Minimal (config) | Permanent 6-10 FTE | 3-5 FTE integration |
| CSRC audit evidence | Automated | Custom | Fragmented |
| New custody programme cost | Config only | 3-6 months engineering | New procurement |
| 3-year total cost | [VAR] | Higher (engineering + compliance) | Comparable but fragmented |

### 8.2 3-Year DALP TCO Model

| Category | Year 1 | Year 2 | Year 3 | Total |
|----------|--------|--------|--------|-------|
| Platform license | [VAR] | [VAR] | [VAR] | [VAR] |
| Implementation | [VAR] | 0 | 0 | [VAR] |
| Support | [VAR] | [VAR] | [VAR] | [VAR] |
| Infrastructure | [VAR] | [VAR] | [VAR] | [VAR] |
| Training | [VAR] | [VAR] | 0 | [VAR] |
| **Total** | [VAR] | [VAR] | [VAR] | [VAR] |

## 9. Reference Clients

| Client | Region | Use Case | Outcome |
|--------|--------|----------|---------|
| DBS Bank | Singapore | Tokenized deposit custody | T+0 settlement; MAS compliant; 12+ months production |
| OCBC Bank | Singapore | Wealth product custody | MAS compliant; rapid deployment |
| National Bank of Egypt | Egypt | Digital asset custody infrastructure | CBE regulatory approval; on-premises deployment |
| Clearstream | Germany | Tokenized collateral custody | BaFin compliant; market infrastructure deployment |

## 10. Next Steps

| Step | Owner | Target |
|------|-------|--------|
| Proposal review meeting | Bank + SettleMint | Week 1 post-submission |
| Architecture workshop | Technical teams | Week 3 |
| Commercial validation | Procurement + SettleMint | Week 4 |
| Contract red-line | Legal teams | Week 5 |
| Best-and-final submission | SettleMint | Week 6 |
| Contract execution | Both parties | Week 8 |
| Programme mobilisation | Joint team | Week 9 |
