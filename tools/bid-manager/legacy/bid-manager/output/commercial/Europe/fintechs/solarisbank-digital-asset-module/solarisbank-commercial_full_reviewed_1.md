# Commercial Proposal: BaaS Digital Asset Module for Solarisbank

**Document Title:** Commercial Proposal for BaaS Digital Asset Module  
**Client:** Solarisbank (Germany)  
**Reference:** SOLARISBANK-RFP-BAAS-DIGITAL-ASSET-MODULE-202603  
**Submitted by:** SettleMint  
**Date:** March 2026  
**Version:** 1.0 (Draft)  
**Confidentiality:** Strictly Confidential

---

## Table of Contents

1. Executive Summary
2. Commercial Decision Framework
3. Licensing Model
4. Pricing Structure
5. Implementation Costs
6. Support and Maintenance
7. Total Cost of Ownership
8. ROI Framework
9. Payment Terms
10. Contract Structure

---

## Executive Summary

Solarisbank's B2B clients increasingly demand digital asset capabilities: tokenization, custody, and settlement services integrated into the banking-as-a-service platform. Building these capabilities internally requires specialized engineering, regulatory licensing, and operational expertise that distracts from Solarisbank's core BaaS value proposition.

DALP provides the digital asset module as an integrated component of the existing BaaS infrastructure. The module exposes tokenization, compliance, custody, and settlement through the same API gateway that Solarisbank's B2B clients already use for banking services. No new integration patterns, no separate operational dashboards, no fragmented regulatory story.

| Component | Annual Cost |
|-----------|------------|
| Production License | €300,000/year |
| Development License | €120,000/year |
| Implementation Services | [CLIENT-SPECIFIC] |
| Enterprise Support | [CLIENT-SPECIFIC] |
| **Total Platform License** | **€420,000/year** |

All prices exclude applicable taxes and VAT. Payment terms are annual, upfront.

At Solarisbank's scale, the platform cost represents a rounding error relative to the revenue opportunity from B2B clients paying for digital asset modules as part of their BaaS engagement.

---

## Commercial Decision Framework

### Build vs. Buy

| Factor | Internal Build | DALP Module |
|--------|---------------|-------------|
| Time to market | 18-30 months | 6 months |
| Engineering investment | 12-20 engineers | Existing team + SettleMint |
| BaFin regulatory alignment | New application | Pre-validated compliance modules |
| MiCA preparation | From scratch | Pre-configured |
| Operational overhead | New team | Integrated into existing BaaS ops |
| 5-year TCO | €8M-€15M | €2.1M-€2.8M |

### Revenue Opportunity

B2B clients paying for digital asset modules:

- **Module pricing:** €5,000-€25,000/month per B2B client depending on volume
- **Custody pass-through:** Margin on custody fees
- **Issuance fees:** Fee per token issuance transaction
- **Settlement fees:** Fee per settlement transaction

At 20 active B2B clients using digital asset modules, the annual platform license is recovered within months.

---

## Licensing Model

### License Structure

| Environment | Purpose | Annual Fee |
|------------|---------|-----------|
| Production | Live digital asset operations | €300,000/year |
| Development | Testing, staging, configuration | €120,000/year |
| **Combined** | | **€420,000/year** |

### What the License Includes

- Full DALP platform access
- All 18 compliance module types
- API access (REST, webhooks)
- Platform updates and compliance updates
- Security patches

### Multi-Tenant BaaS Model

The license supports Solarisbank's B2B multi-tenant model:

- Single platform deployment serving multiple B2B clients
- Logical tenant isolation for audit and compliance
- Per-client configuration for compliance rules
- Unified operational view with client-level filtering

---

## Pricing Structure

| License | Monthly Equivalent | Annual Fee (upfront) |
|---------|-------------------|----------------------|
| Production License | €25,000/month | €300,000/year |
| Development License | €10,000/month | €120,000/year |
| **Combined** | **€35,000/month** | **€420,000/year** |

All prices exclude applicable taxes and VAT.

### Infrastructure Costs

| Deployment | Responsibility | Cost |
|------------|---------------|------|
| Cloud-managed (EU) | SettleMint | Pass-through at cost |
| Self-hosted (German cloud) | Solarisbank | Solarisbank cost |
| On-premises | Solarisbank | Solarisbank cost |

German-hosted cloud deployment recommended for BaFin data sovereignty.

---

## Implementation Costs

26-week programme covering platform deployment, API integration with BaaS gateway, custody configuration, BaFin/MiCA compliance module setup, B2B client onboarding flow development, regulatory reporting integration, and go-live.

**Implementation cost:** [CLIENT-SPECIFIC - scoped at contract based on integration complexity]

---

## Support and Maintenance

| Feature | Enterprise Tier |
|---------|-----------------|
| Availability | 24/5 |
| Critical response | 2 hours |
| Dedicated TAM | Yes |
| Platform updates | Included |
| Compliance updates | Included |
| Security patches | Same business day |

---

## Total Cost of Ownership

### Five-Year TCO

| Year | License | Infrastructure (est.) | Total |
|------|---------|----------------------|-------|
| Year 1 | €420,000 | €60,000-€120,000 | €480,000-€540,000 + impl |
| Year 2 | €420,000 | €60,000-€120,000 | €480,000-€540,000 |
| Year 3 | €420,000 | €70,000-€130,000 | €490,000-€550,000 |
| Year 4 | €420,000 | €70,000-€130,000 | €490,000-€550,000 |
| Year 5 | €420,000 | €80,000-€140,000 | €500,000-€560,000 |

---

## ROI Framework

### Direct Revenue

- **B2B client digital asset modules:** At 20 clients × €10,000/month average = €2.4M annual revenue
- **Custody margin:** Additional margin on custody pass-through fees
- **Transaction fees:** Issuance and settlement fee revenue

### Cost Avoidance

- **Engineering:** €4M-€10M avoided over 3 years vs. internal build
- **Regulatory licensing:** Avoided cost of separate digital asset license application
- **Operational efficiency:** Integrated into existing BaaS ops vs. building new team

### Strategic Value

- **Competitive differentiation:** First-mover BaaS with digital asset module in German market
- **Client retention:** Expanded service offering reduces client churn
- **Regulatory readiness:** Pre-validated MiCA compliance ahead of full enforcement

---

## Payment Terms

- **License:** Annual, upfront, invoiced 30 days before renewal
- **Implementation:** 30% on signature, 40% on Phase 2 completion, 30% on go-live
- **Infrastructure:** Monthly at cost (pass-through)
- **Currency:** EUR base

All prices exclude applicable taxes and VAT.

---

## Contract Structure

| Document | Purpose |
|----------|---------|
| Master Services Agreement | Terms, liability, IP |
| License Order Form | Environments, fees |
| Implementation SOW | Programme scope |
| Support Schedule | SLA terms |
| Data Processing Agreement | Data sovereignty, privacy |

**Data sovereignty:** Contract includes German data residency provisions per BaFin requirements.

---

*This commercial proposal is submitted in strict confidence by SettleMint. All prices exclude applicable taxes and VAT.*
