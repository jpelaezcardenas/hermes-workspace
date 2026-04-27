# Commercial Proposal: Digital Asset Exchange and Regulated Post-Trade Controls

**Document Title:** Commercial Proposal for Digital Asset Exchange and Regulated Post-Trade Controls  
**Client:** Rain (Bahrain)  
**Reference:** RAIN-RFP-DIGITAL-ASSET-EXCHANGE-202603  
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
7. Total Cost of Ownership Analysis
8. ROI Framework
9. Payment Terms and Conditions
10. Contract Structure

---

## Executive Summary

Rain requires a production-grade platform for digital asset exchange and regulated post-trade controls that can withstand CBB regulatory scrutiny and operational scale. The commercial decision reduces to this: build or buy, and if buy, which platform delivers the best economics across the three to five year horizon that matters for a regulated exchange investment.

Build is the wrong choice for Rain at this stage. The internal engineering cost to replicate DALP's compliance enforcement, DvP settlement engine, custody integration layer, and audit trail infrastructure is substantial, and the regulatory risk of getting any one of those components wrong is existential for Rain's CBB license. The CBB expects production-proven infrastructure, not bespoke engineering still being de-risked through operation.

SettleMint's DALP platform removes that execution risk. The platform is already deployed in regulated exchange environments. The compliance modules are audited and configurable. The integration patterns are documented and tested. Rain's team focuses on the exchange business, not on building and maintaining the infrastructure that the business runs on.

The recommended commercial model for Rain is the **Enterprise License tier**, covering the production environment for exchange operations and a development environment for testing and staging. Implementation services cover the 24-week deployment programme described in the technical proposal. Enterprise-tier support provides 24/5 coverage with a 2-hour critical response SLA.

| Component | Annual Cost |
|-----------|------------|
| Production License | €300,000/year |
| Development License | €120,000/year |
| Implementation Services | [CLIENT-SPECIFIC - scoped at contract] |
| Enterprise Support | [CLIENT-SPECIFIC - included in license or add-on] |
| **Total Platform License** | **€420,000/year** |

All prices exclude applicable taxes and VAT. Payment terms are annual, upfront.

For Rain's five-year horizon, the platform cost represents a fraction of the alternative: internal engineering, multiple point-solution vendors, integration maintenance, and the ongoing regulatory risk of a fragmented control environment.

---

## Commercial Decision Framework

### Build vs. Buy Analysis

| Factor | Internal Build | Multi-Vendor Assembly | DALP Single Platform |
|--------|---------------|----------------------|---------------------|
| Time to market | 18-36 months | 12-24 months | 6 months |
| Compliance risk | High (unproven) | High (integration gaps) | Low (production-proven) |
| Integration complexity | Very high | High | Low (documented APIs) |
| Regulatory audit posture | Unproven | Fragmented | Single control plane |
| Ongoing engineering cost | High (team required) | Medium (integration maintenance) | Low (platform managed) |
| CBB examination readiness | Unknown | Partial | Full audit trail |
| 5-year TCO | €3.5M+ | €2.5M+ | €2.1M (license + impl) |

*TCO estimates are directional. Detailed build cost modelling is available on request.*

### Why Platform Economics Favour DALP

Rain's regulatory license creates an unusual cost dynamic: non-compliance is not just operationally expensive, it is potentially license-threatening. The cost comparison therefore cannot be purely about engineering labor; it must factor in regulatory risk, implementation speed, and the CBB's expectations for platform maturity.

DALP addresses all three. The platform's compliance modules are pre-audited and in production. The deployment timeline is predictable because SettleMint has executed the same implementation pattern in multiple regulated jurisdictions. And the CBB's examination team will find a single, documented control environment rather than a patchwork of integrated tools each requiring separate explanation.

---

## Licensing Model

### License Tiers

DALP licensing is structured to match the operational model of the deploying institution. For Rain, the relevant tiers are:

**Foundation Tier:** Single production environment, standard support, limited implementation scope. Appropriate for institutions starting with a single asset class or limited user volume. Not recommended for Rain given the exchange scope and CBB requirements.

**Enterprise Tier:** Production and development environments, 24/5 support, dedicated technical account manager, standard implementation programme. Recommended for Rain's initial deployment phase.

**Sovereign Tier:** Multiple environments, 24/7 support, custom SLA terms, dedicated implementation team, priority product roadmap access. Appropriate if Rain's exchange volume or regulatory obligations escalate significantly.

### Environment Model

| Environment | Purpose | License Type |
|------------|---------|--------------|
| Production | Live exchange operations | Production License: €300,000/year |
| Development/Staging | Integration testing, compliance validation, new feature testing | Development License: €120,000/year |

A dedicated staging environment that mirrors production configuration is essential for Rain's operational model. CBB compliance updates, compliance module changes, and integration patches must be tested in a controlled environment before production deployment. The development license covers this requirement.

---

## Pricing Structure

### Platform License Fees

| License | Monthly Equivalent | Annual Fee (upfront) |
|---------|-------------------|----------------------|
| Production License | €25,000/month | €300,000/year |
| Development License | €10,000/month | €120,000/year |
| **Combined (Recommended)** | **€35,000/month** | **€420,000/year** |

**All prices exclude applicable taxes and VAT.** Taxes are applied separately based on Rain's jurisdiction and applicable tax treaties between Bahrain and Belgium.

**Payment terms:** Annual, upfront. No monthly payment option is available.

### Infrastructure Costs

DALP platform licensing covers the application layer. Infrastructure costs depend on Rain's deployment model:

| Deployment Model | Infrastructure Responsibility | Cost Treatment |
|-----------------|------------------------------|----------------|
| Cloud-managed (SettleMint-hosted) | SettleMint | Pass-through at cost, not marked up |
| Cloud self-hosted (Rain-managed cloud) | Rain | Rain bears cost directly |
| On-premises | Rain | Rain bears cost entirely |

For Rain's exchange operations, cloud-managed deployment is recommended for Phase 1 to minimize operational overhead during the critical launch period. Rain can migrate to self-hosted cloud or on-premises as the operational team matures.

### Custody Provider Costs

Fireblocks or DFNS integration costs are not included in the DALP license fee. These are direct commercial relationships between Rain and the custody provider. SettleMint facilitates the integration but does not intermediate the commercial relationship.

---

## Implementation Costs

Implementation services cover the 24-week programme described in the technical proposal. The programme includes:

- Platform deployment and configuration (Phases 1-2)
- KYC/AML and payment integration (Phase 2)
- Settlement validation and reconciliation testing (Phase 3)
- Security review, go-live preparation, and hypercare (Phase 4)

**Implementation cost:** [CLIENT-SPECIFIC - scoped and fixed at contract signature based on confirmed integration scope, Rain's internal team involvement, and deployment model selection]

Implementation cost components include:

| Service | Description |
|---------|-------------|
| Platform architecture and setup | Environment configuration, network setup, smart contract deployment |
| Integration engineering | API integration to Rain's KYC, AML, payment, and reporting systems |
| Compliance module configuration | Module selection, parameter configuration, test case development |
| Settlement validation | DvP test suite execution, reconciliation procedure validation |
| Security review support | Penetration test preparation, security questionnaire completion |
| Go-live and hypercare | Production deployment, first-month monitoring, issue resolution |
| Documentation | Technical runbooks, operational procedures, regulatory evidence templates |

Implementation is time-and-materials within a fixed budget envelope established at contract signature. Scope changes outside the agreed programme are separately priced.

---

## Support and Maintenance

### Enterprise Support Package

Rain's CBB license requires operational resilience that standard business-hours support cannot meet. Enterprise support provides:

| Feature | Enterprise Tier |
|---------|-----------------|
| Availability | 24/5 (weekdays) |
| Critical incident response | 2 hours |
| Standard issue response | 8 hours |
| Technical account manager | Dedicated |
| Platform updates | Included |
| Compliance module updates | Included |
| Security patches | Included (emergency: same business day) |

**Support cost:** [CLIENT-SPECIFIC - included in Enterprise license or separately priced as an add-on depending on contract structure. Confirm at commercial validation stage.]

### Sovereign Support Upgrade

If Rain's operational requirements or CBB obligations require 24/7 support coverage with a 1-hour critical response SLA, the Sovereign support tier is available as an upgrade. This tier is appropriate if Rain's exchange operates during Asian market hours or runs weekend liquidity operations.

---

## Total Cost of Ownership Analysis

### Five-Year TCO Model

| Year | License Fee | Infrastructure (est.) | Support | Total Annual |
|------|-----------|-----------------------|---------|--------------|
| Year 1 | €420,000 | €60,000-€120,000 | [CLIENT-SPECIFIC] | €480,000-€540,000 + impl |
| Year 2 | €420,000 | €60,000-€120,000 | [CLIENT-SPECIFIC] | €480,000-€540,000 |
| Year 3 | €420,000 | €70,000-€130,000 | [CLIENT-SPECIFIC] | €490,000-€550,000 |
| Year 4 | €420,000 | €70,000-€130,000 | [CLIENT-SPECIFIC] | €490,000-€550,000 |
| Year 5 | €420,000 | €80,000-€140,000 | [CLIENT-SPECIFIC] | €500,000-€560,000 |

*Infrastructure costs are directional estimates based on comparable deployments. Actual costs depend on deployment model and transaction volumes.*

### Alternative Comparison

| Approach | Year 1 Cost | Year 5 Cumulative |
|----------|------------|-------------------|
| DALP Platform | €420,000 license + impl + infra | ~€2.1M-€2.5M |
| Multi-vendor assembly | €800,000-€1.2M integration + licensing | ~€3.5M-€4.5M |
| Internal build | €1.5M-€2.5M engineering + infra | ~€5M-€8M |

The multi-vendor scenario consistently underperforms on regulatory audit readiness (no single control plane) and escalates in Year 2+ as integration maintenance costs accumulate. The internal build scenario carries the highest execution risk and is unlikely to meet Rain's CBB license obligations within an acceptable timeline.

---

## ROI Framework

Rain's ROI from DALP derives from three sources: cost avoidance, revenue enablement, and risk reduction.

### Cost Avoidance

- **Engineering avoidance:** Rain avoids 18-36 months of internal platform engineering. At market rates for senior blockchain engineers in the region, this represents €1.5M-€3M avoided.
- **Integration maintenance avoidance:** Multi-vendor integration requires ongoing maintenance. DALP's single-platform model eliminates this overhead.
- **Regulatory remediation avoidance:** A compliance failure on a self-built platform carries remediation costs and potential license suspension risk that dwarf the platform licensing cost.

### Revenue Enablement

- **Faster time to market:** DALP's 24-week implementation timeline versus 18+ months for internal build means Rain captures 12+ months of additional exchange revenue.
- **Expanded asset class coverage:** DALP's configurable token architecture means Rain can add new asset classes (tokenized securities, funds, structured products) through configuration, not development cycles. Each new asset class is an incremental revenue stream.
- **Institutional client acquisition:** DALP's audit trail, compliance documentation, and CBB alignment supports Rain's business development with institutional clients who require documented control frameworks before placing assets.

### Risk Reduction

- **CBB examination readiness:** DALP's single audit trail reduces the time and cost of CBB examination preparation from weeks of manual data assembly to automated evidence production.
- **Incident recovery:** DALP's defined incident response model and 24/7 support option reduces downtime duration and associated revenue loss.
- **Control continuity:** DALP's compliance module architecture allows Rain to adapt to regulatory changes (new CBB guidance, GCC harmonization requirements) through configuration rather than code changes.

---

## Payment Terms and Conditions

### Standard Terms

- **License fee:** Annual, upfront, invoiced 30 days before renewal
- **Implementation fee:** Milestone-based; 30% on contract signature, 40% on Phase 2 completion, 30% on production go-live
- **Support:** Included in license or invoiced annually with license renewal
- **Infrastructure (pass-through):** Invoiced monthly at cost

### Currency

DALP pricing is denominated in EUR. Bahrain operates with USD-pegged currency (BHD). Invoicing in USD is available at the EUR/USD exchange rate on the invoice date. Currency risk management is Rain's responsibility.

### Taxes

All prices exclude applicable taxes and VAT. SettleMint operates from Belgium and applies Belgian VAT regulations. For non-EU buyers like Rain (Bahrain entity), Belgian VAT typically does not apply, but local taxes in Bahrain's jurisdiction apply per Bahrain tax law. Rain's tax advisor should confirm the applicable tax treatment before contract signature.

---

## Contract Structure

### Key Contract Components

| Document | Purpose |
|----------|---------|
| Master Services Agreement | Governing terms, liability, IP ownership, data handling |
| License Order Form | Specific license quantities, environments, and fees |
| Implementation Statement of Work | Scoped programme, deliverables, milestones, and pricing |
| Support Schedule | Support tier, SLA terms, and escalation procedures |
| Data Processing Agreement | GDPR and data handling obligations |

### Key Commercial Protections

**Intellectual property:** Rain retains ownership of all Rain-specific configurations, compliance templates, and operational data. SettleMint retains ownership of the DALP platform code, smart contracts, and underlying infrastructure.

**Data handling:** All Rain operational data remains under Rain's control. SettleMint processes data only to the extent necessary to deliver the contracted services. Full GDPR-equivalent data protection provisions apply regardless of Bahrain's specific data protection law status.

**Liability:** Standard enterprise software liability caps apply. SettleMint's liability is limited to the fees paid in the relevant contract year for platform failures. Rain's liability for misuse or misconfiguration of the platform is Rain's responsibility.

**Exit provisions:** Rain retains full access to its operational data and configuration exports at any time. A structured off-boarding period of 90 days is provided at contract termination, during which SettleMint continues to operate the platform at maintenance-only support levels.

---

*This commercial proposal is submitted in strict confidence by SettleMint in response to RFP reference RAIN-RFP-DIGITAL-ASSET-EXCHANGE-202603. All figures marked [CLIENT-SPECIFIC] require scope validation before finalisation. All prices exclude applicable taxes and VAT. Payment terms are annual, upfront.*
