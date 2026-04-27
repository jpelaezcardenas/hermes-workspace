# Commercial Proposal: Tokenized Deposits and Trade Finance Platform

**Prepared for:** DBS Bank Ltd
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** DBS-BANK-RFP-202603

*All prices exclude applicable taxes and VAT. Taxes are added separately based on the client's jurisdiction and applicable tax treaties.*

---

## Table of Contents

1. Cover Page
2. Commercial Summary
3. Licensing Model
4. Implementation Services Pricing
5. Environment and Infrastructure Costs
6. Support and Maintenance Fees
7. Total Cost of Ownership Analysis
8. Payment Terms and Milestones
9. Commercial Assumptions Register
10. Exit and Transition Terms
11. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Tokenized Deposits and Trade Finance Platform
**Client:** DBS Bank Ltd, Singapore
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. It is submitted exclusively in response to DBS-BANK-RFP-202603. All prices exclude applicable taxes and VAT.*

---

## 2. Commercial Summary

DBS Bank's tokenized deposits and trade finance programme requires a commercial model that reflects the institution's procurement principles: transparency, scalability, sustainability, and clear separation between one-off and recurring costs. This proposal provides exactly that.

SettleMint's commercial model for this programme is structured around three components: platform licensing (annual, upfront), implementation services (phase-gated, scoped), and support and maintenance (tiered SLA). The model is designed to scale with DBS Bank's programme without requiring renegotiation for each expansion: additional environments, jurisdictions, and product variants are accommodated within the existing commercial framework through environment licensing additions rather than programme restarts.

**Summary of Costs (Year 1):**

| Component | Annual Cost (EUR) |
|-----------|------------------|
| Production License (1 environment) | 300,000 |
| Development License (1 environment) | 120,000 |
| Implementation Services (19-week programme) | [CLIENT-SPECIFIC: scoped in Phase 1] |
| Enterprise Support and Maintenance | [CLIENT-SPECIFIC: scoped per tier] |
| Infrastructure (AWS ap-southeast-1, pass-through) | [Pass-through at cost, not marked up] |
| **Platform License Total (Year 1)** | **420,000** |

*All prices are in EUR, payable annually and upfront. Implementation services and support fees are scoped per engagement and marked [CLIENT-SPECIFIC] pending formal scoping in Phase 1. Infrastructure costs are pass-through at cost.*

**Three-Year Platform License Cost:**

| Year | Production License | Development License | Total |
|------|------------------|--------------------|----|
| Year 1 | 300,000 | 120,000 | 420,000 |
| Year 2 | 300,000 | 120,000 | 420,000 |
| Year 3 | 300,000 | 120,000 | 420,000 |
| **3-Year Total** | **900,000** | **360,000** | **1,260,000** |

This represents the base platform licensing cost. Implementation services, support, and infrastructure are separate. The three-year model assumes a standard two-environment configuration (production and development). Expansion to additional environments or jurisdictions is priced per the environment licensing rates above.

---

## 3. Licensing Model

### 3.1 Platform Licensing Philosophy

SettleMint licenses DALP on an annual, per-environment basis. The licensing model reflects the following principles:

**Environment-based, not transaction-based:** DBS Bank pays for environments, not transaction volumes. There are no per-token, per-transfer, or per-API-call charges on top of the platform license. As DBS Bank's programme scales from initial controlled scope to broader operations, transaction volume growth does not increase the platform license cost.

**Annual upfront:** All license payments are annual and upfront. This aligns SettleMint's incentives with DBS Bank's programme success: SettleMint's revenue is not contingent on transaction volumes or feature usage, which means SettleMint has no commercial incentive to push DBS Bank toward higher-volume operations than are operationally appropriate.

**Configuration, not custom development:** DALP is a configurable platform. New product variants, additional compliance templates, new instrument types, and additional jurisdictional controls are achieved through platform configuration, not custom development engagements. This keeps the total cost of ownership predictable and removes the dependency on vendor professional services for routine programme expansion.

**No hidden commercial traps:** All pricing, including minimum commitments, price-hold periods, and expansion pricing, is stated explicitly in this proposal. There are no volume thresholds that trigger price step-ups, no "freemium" limitations that require paid upgrades for institutional use, and no transaction fees that emerge after initial implementation.

### 3.2 License Tier Structure

DALP licensing is organized into three tiers based on deployment scope, support level, and programme complexity. The platform license rate (EUR 25,000/month production, EUR 10,000/month development) is consistent across all tiers. What varies by tier is the scope of environments included, the support level, the implementation scope, and custom SLA terms.

**Foundation Tier:** Suitable for initial controlled deployments with a limited asset class scope, single jurisdiction, and standard support. Typically includes one production and one development environment.

**Enterprise Tier:** Suitable for multi-asset, multi-jurisdiction programmes with premium support and extended SLA commitments. May include staging environments and extended implementation scope.

**Sovereign Tier:** Designed for national-scale programmes and sovereign entities. Includes custom SLA terms, dedicated infrastructure options, and extended support coverage. Not applicable to this procurement.

For DBS Bank's tokenized deposits and trade finance programme, SettleMint recommends the **Enterprise Tier**, reflecting the multi-asset scope (tokenized deposits and trade finance instruments), Singapore regulatory complexity, and mission-critical operational requirements. The Enterprise Tier is supported by the Enterprise Support package (24/7/365, 99.99% uptime SLA) described in Section 6.

### 3.3 Environment Licensing

| Environment Type | Monthly Rate | Annual Rate (Upfront) |
|-----------------|-------------|----------------------|
| Production | EUR 25,000/month | EUR 300,000/year |
| Development | EUR 10,000/month | EUR 120,000/year |
| Staging (optional) | EUR 10,000/month | EUR 120,000/year |

**Standard configuration for DBS Bank:** Production (1) + Development (1) = EUR 420,000/year upfront.

**Expansion pricing:** Each additional environment (production, development, or staging) is licensed at the applicable environment rate. Expansion from one production environment to two production environments (for example, to support a second legal entity or jurisdiction) adds EUR 300,000/year. This is a straightforward commercial expansion, not a programme restart.

*Note: All prices exclude applicable taxes and VAT. Taxes are added separately based on the client's jurisdiction and applicable tax treaties.*

---

## 4. Implementation Services Pricing

### 4.1 Implementation Services Philosophy

SettleMint prices implementation services separately from platform licensing. This separation is deliberate: it creates transparency in the total cost of ownership, ensures that DBS Bank pays for implementation work actually performed rather than a bundled fee that obscures the components, and provides a clear basis for scoping changes.

Implementation services for this programme are **[CLIENT-SPECIFIC]** and will be formally scoped during Phase 1 Discovery. The indicative ranges below are based on SettleMint's experience with comparable APAC bank deployments (OCBC Bank, Standard Chartered, Maybank Project Photon) and the 19-week programme structure described in the technical proposal.

### 4.2 Day Rate Structure

SettleMint's implementation services are priced on the following day rate structure for Singapore-based engagements:

| Role | Day Rate (EUR) |
|------|---------------|
| Delivery Lead | [CLIENT-SPECIFIC] |
| Solution Architect | [CLIENT-SPECIFIC] |
| Platform Engineer | [CLIENT-SPECIFIC] |
| Integration Engineer | [CLIENT-SPECIFIC] |
| QA / Test Lead | [CLIENT-SPECIFIC] |
| Security Engineer | [CLIENT-SPECIFIC] |
| Support Engineer | [CLIENT-SPECIFIC] |

*Day rates are provided in the detailed commercial annex submitted to the DBS Bank procurement team under separate cover. Rates reflect Singapore market pricing and include standard expenses for on-site work within Singapore.*

### Indicative Implementation Investment Range

Based on SettleMint's experience delivering comparable programmes at APAC banks (OCBC Bank Singapore, Standard Chartered APAC, Maybank Project Photon), the indicative implementation services investment for DBS Bank's 19-week programme is:

| Scenario | Indicative Range (EUR) | Notes |
|----------|----------------------|-------|
| Standard scope (deposits + trade finance, single jurisdiction) | 350,000 - 500,000 | Based on 62-70 person-weeks of SettleMint effort at APAC market rates |
| Extended scope (+ TradeTrust integration, + Project Guardian connectivity) | 500,000 - 750,000 | Includes optional work packages from Section 4.4 |

*These are indicative ranges for planning purposes only. The formal implementation services fee is scoped and fixed during Phase 1 Discovery, with the SOW signed before Phase 2 commences. The indicative ranges above include SettleMint team time, travel and expenses for on-site work in Singapore, and standard software tooling. They do not include DBS Bank internal team costs, third-party vendor fees (Fireblocks, KYC providers), or AWS infrastructure.*

### 4.3 Phase Breakdown and Indicative Effort

The 19-week implementation programme is structured across six phases. Indicative effort estimates by phase are based on comparable APAC bank engagements. Actual scope is confirmed during Phase 1.

| Phase | Duration | SettleMint Effort (person-weeks, indicative) | Delivery Model |
|-------|----------|---------------------------------------------|----------------|
| Phase 1: Discovery and Requirements | 3 weeks | 8-12 | Fixed-price milestone |
| Phase 2: Configuration and Setup | 4 weeks | 12-16 | Fixed-price milestone |
| Phase 3: Integration Development | 4 weeks | 16-24 | Time and materials with cap |
| Phase 4: Testing and UAT | 3 weeks | 12-18 | Fixed-price milestone |
| Phase 5: Go-Live | 1 week | 6-8 | Fixed-price milestone |
| Phase 6: Hypercare | 4 weeks | 8-12 | Fixed-price milestone |
| **Total** | **19 weeks** | **62-90 person-weeks** | Mixed |

**Fixed-price milestones:** Phases 1, 2, 4, 5, and 6 are structured as fixed-price milestones with defined deliverables and acceptance criteria. DBS Bank pays the milestone amount upon acceptance of deliverables, regardless of actual SettleMint effort. This protects DBS Bank against implementation overruns on well-defined phases.

**Time and materials with cap:** Phase 3 (Integration Development) is priced on a time-and-materials basis with a negotiated ceiling. The T&M model is appropriate for integration work where scope is validated through the Phase 1 integration assessment, but actual complexity depends on DBS Bank's system landscape. The ceiling provides cost protection while allowing appropriate flexibility.

### 4.4 Optional Implementation Scope

The following work packages are available as optional additions to the standard programme scope, priced separately:

| Optional Work Package | Description | Pricing |
|----------------------|-------------|---------|
| TradeTrust Deep Integration | Full TradeTrust document verification workflow integration, including eBL support and MLETR compliance | [CLIENT-SPECIFIC] |
| Project Guardian Interoperability | Integration with Project Guardian network and cross-network XvP settlement testing | [CLIENT-SPECIFIC] |
| Additional Instrument Types | Configuration of instrument types beyond tokenized deposits and trade finance (e.g., tokenized bonds, equities) | [CLIENT-SPECIFIC] |
| Advanced Reporting Pack | Custom management information reporting, regulatory reporting templates, data warehouse integration | [CLIENT-SPECIFIC] |
| Additional Jurisdiction Configuration | Compliance templates and configuration for jurisdictions beyond Singapore | [CLIENT-SPECIFIC] |

*These packages are not included in the base implementation scope and require separate commercial agreement.*

---

## 5. Environment and Infrastructure Costs

### 5.1 Cloud Infrastructure: Pass-Through at Cost

SettleMint does not mark up infrastructure costs. AWS ap-southeast-1 infrastructure costs are passed through to DBS Bank at actual AWS pricing, billed directly by AWS to DBS Bank or invoiced by SettleMint without markup.

The platform license fee covers the DALP platform software, configuration, and operational support. Infrastructure is a separate cost category that DBS Bank controls and optimizes independently.

**Indicative AWS ap-southeast-1 annual infrastructure cost for standard DALP deployment:**

| Infrastructure Component | AWS Service | Indicative Annual Cost (USD) |
|-------------------------|-------------|------------------------------|
| Kubernetes cluster (EKS) | EKS + EC2 (3x m5.xlarge nodes, per environment) | 15,000-25,000 |
| Managed PostgreSQL (Aurora) | Aurora PostgreSQL (Multi-AZ) | 8,000-15,000 |
| Object storage | S3 with versioning | 500-2,000 |
| Key management | AWS KMS | 1,000-3,000 |
| HSM (if required) | AWS CloudHSM | 15,000-20,000 |
| Network (load balancer, data transfer) | ALB, VPC, PrivateLink | 3,000-8,000 |
| Monitoring and logging | CloudWatch, additional storage | 2,000-5,000 |
| **Total indicative (production environment)** | | **44,500-78,000/year** |

*These are indicative estimates based on standard deployment configurations. Actual costs depend on transaction volumes, storage growth, data transfer patterns, and specific AWS pricing at contract time. DBS Bank's existing AWS agreements and reserved instance commitments may significantly reduce these costs.*

### 5.2 On-Premises Infrastructure

If DBS Bank elects on-premises deployment, infrastructure costs are borne entirely by DBS Bank. SettleMint provides infrastructure sizing guidance as part of the Phase 1 architecture design. Standard on-premises requirements are detailed in the technical proposal (Section 12).

There is no markup or surcharge for on-premises deployment; the platform license rate is the same regardless of deployment model.

### 5.3 Third-Party Pass-Through Costs

The following third-party costs may apply depending on DBS Bank's architecture choices:

| Third-Party Service | Purpose | Cost Model |
|--------------------|---------|------------|
| Fireblocks | MPC-CMP institutional custody | Fireblocks enterprise pricing (client agreement with Fireblocks directly) |
| DFNS | Alternative MPC custody | DFNS enterprise pricing (client agreement with DFNS directly) |
| KYC/AML data providers | Identity claim issuance and verification | Provider pricing (client agreement directly) |
| Blockchain network fees | Transaction gas fees (if on public EVM network) | Network-dependent; minimal for private/consortium networks |

SettleMint does not act as reseller for these third-party services. DBS Bank contracts directly with each provider and manages those commercial relationships independently. SettleMint's integration work with these providers is covered within the implementation services scope.

---

## 6. Support and Maintenance Fees

### 6.1 Support Tier Recommendation

SettleMint recommends the **Enterprise Support** tier for DBS Bank's programme. This recommendation reflects the mission-critical nature of a tokenized deposits and trade finance platform operating under MAS regulatory oversight, with direct financial impact and regulatory reporting obligations.

### 6.2 Enterprise Support Fee Structure

Enterprise Support is priced as an annual fee separate from the platform license. The fee reflects the 24/7/365 coverage, dedicated support team, 99.99% uptime SLA commitment, and the Solution Architect access included in the Enterprise tier.

**Enterprise Support Annual Fee:** [CLIENT-SPECIFIC, scoped per engagement based on programme complexity, number of environments, and supported transaction volumes]

*The Enterprise Support fee for this engagement will be provided in the detailed commercial annex. Standard Enterprise Support fees for comparable APAC bank deployments range from EUR 80,000 to EUR 150,000 per year, depending on programme scope. The final fee for DBS Bank's programme will be scoped after Phase 1 architecture design confirms programme complexity.*

### 6.3 Support SLA Commitments

| Metric | Enterprise Commitment |
|--------|----------------------|
| Uptime SLA | 99.99% monthly (approximately 4.3 minutes maximum downtime) |
| P1 Critical Response | 15 minutes |
| P1 Critical Resolution | 2 hours |
| P2 High Response | 1 hour |
| P2 High Resolution | 4 hours |
| Coverage | 24/7/365 |
| Named Support Team | Dedicated team with DBS Bank deployment familiarity |

### 6.4 SLA Credits

Service credits apply for uptime SLA breaches:

| Uptime Achieved | Credit |
|-----------------|--------|
| Below SLA but ≥ 99.0% | 10% of monthly support fees |
| Below 99.0% but ≥ 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

Credits are applied to the following month's invoice and represent the sole and exclusive remedy for SLA breaches. Credits must be requested within 30 days of the relevant reporting period.

### 6.5 Platform Updates Included in Support

Enterprise Support includes:
- Continuous delivery with staged rollouts and preview environments
- DBS Bank approval gate before production deployment
- Zero-downtime deployments where architecturally supported
- Security patches applied on accelerated timeline regardless of release cadence
- Compliance module updates coordinated with DBS Bank's compliance team with regulatory impact assessment
- Access to all DALP feature releases within the contracted license period

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO Model

The following TCO model covers the three-year period from programme commencement. Implementation services are assumed for Year 1 only (the initial programme delivery). Support and infrastructure costs recur annually.

| Cost Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|--------------|-------------|-------------|-------------|-------------------|
| Platform License (Production) | 300,000 | 300,000 | 300,000 | 900,000 |
| Platform License (Development) | 120,000 | 120,000 | 120,000 | 360,000 |
| Implementation Services | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Enterprise Support | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Infrastructure (AWS, indicative) | ~60,000 | ~65,000 | ~70,000 | ~195,000 |
| **Platform License Subtotal** | **420,000** | **420,000** | **420,000** | **1,260,000** |

*Implementation services and support fees are marked [CLIENT-SPECIFIC] pending Phase 1 scoping. Infrastructure costs are indicative based on standard AWS ap-southeast-1 pricing for the described configuration.*

### 7.2 Build vs. Buy: Custom Development Cost Comparison

The alternative to procuring DALP is custom development of a comparable tokenized deposits and trade finance platform. SettleMint's experience across comparable institutional implementations provides a realistic estimate of custom development costs:

| Cost Component | Custom Development (3-Year Estimate, EUR) | DALP (3-Year Estimate, EUR) |
|---------------|------------------------------------------|----------------------------|
| Blockchain/smart contract development and audit | 800,000-1,500,000 | Included in license |
| Compliance engine development | 400,000-800,000 | Included in license |
| Settlement infrastructure | 300,000-600,000 | Included in license |
| Identity and access management | 200,000-400,000 | Included in license |
| Observability and operations tooling | 150,000-300,000 | Included in license |
| API development and documentation | 200,000-400,000 | Included in license |
| Security audits and penetration testing | 150,000-300,000 | Included in license |
| Ongoing maintenance and updates | 400,000-800,000/year | Included in license |
| **Total 3-Year Custom Development Cost** | **2,200,000-5,100,000** | **1,260,000 + services** |

*Custom development estimates based on market rates for senior blockchain engineers in Singapore (SGD 150,000-250,000/year), security audit firm rates (USD 200,000-500,000 per engagement), and integration development effort. These estimates assume DBS Bank builds a solution with comparable compliance depth, settlement functionality, and operational tooling to DALP. A narrower-scope custom build would cost less but deliver less.*

The build-vs-buy comparison understates DALP's advantage because it does not capture: the 12-18 month time premium for custom development versus DALP's 15-19 week implementation timeline; the regulatory risk of untested compliance architecture versus DALP's MAS-validated production deployments; the operational risk of bespoke tooling versus DALP's production-proven observability and DR capabilities; and the ongoing maintenance burden of proprietary code versus DALP's platform updates included in the license.

### 7.3 ROI Indicators

Based on comparable APAC bank deployments, SettleMint can identify the following categories of quantifiable return for DBS Bank's programme. Specific figures are institution-specific and would be developed during Phase 1 business case validation:

**Settlement efficiency:** Moving from T+2 clearing cycles to T+0 atomic DvP settlement eliminates the intraday funding requirement associated with settlement exposure. For DBS Bank's trade finance volumes, this represents meaningful reduction in intraday liquidity costs. Comparable deployments at APAC banks have demonstrated 60-80% reduction in settlement-related operational overhead.

**Reconciliation cost reduction:** Replacing manual spreadsheet reconciliation with automated event-driven reconciliation eliminates significant operations staff time. DALP's on-chain-as-source-of-truth architecture produces deterministic reconciliation output without the manual break investigation that characterizes legacy operations. Commerzbank's comparable deployment identified EUR 7 million in annual savings from operational automation.

**Compliance operations efficiency:** DALP's ex-ante compliance enforcement eliminates the post-trade compliance review cycle associated with legacy approaches. Automated compliance checks with full audit trails reduce compliance team workload for routine transfer review, freeing capacity for higher-value exception management.

**Time to market for new products:** DALP's configurable token architecture means that adding a new trade finance instrument type or a new jurisdiction takes weeks of configuration work, not months of custom development. This accelerates DBS Bank's ability to respond to market opportunities and regulatory developments without programme-level restarts.

---

## 8. Payment Terms and Milestones

### 8.1 Platform License Payment

| Payment | Amount | Timing |
|---------|--------|--------|
| Year 1 Platform License | EUR 420,000 (production + development) | Due within 30 days of contract execution |
| Year 2 Platform License | EUR 420,000 | Due on the first anniversary of go-live date |
| Year 3 Platform License | EUR 420,000 | Due on the second anniversary of go-live date |

*All license payments are annual and upfront. No monthly payment option is available.*

### 8.2 Implementation Services Payment Milestones

Implementation services are invoiced against phase milestones upon DBS Bank's acceptance of defined deliverables. Indicative milestone structure:

| Milestone | Trigger | Indicative Percentage of Implementation Fee |
|-----------|---------|---------------------------------------------|
| Contract Execution | Contract signed and kickoff confirmed | 20% |
| Phase 1 Completion | BRD and Architecture Document accepted | 15% |
| Phase 2 Completion | Provisioned environments and configuration accepted | 15% |
| Phase 3 Completion | Integration testing evidence accepted | 20% |
| Phase 4 Completion | UAT sign-off and go-live readiness accepted | 15% |
| Phase 5 + Phase 6 Completion | Production go-live and hypercare completion | 15% |

*Exact milestone percentages and payment triggers are confirmed during Phase 1 and documented in the Statement of Work. DBS Bank's payment obligation on each milestone is conditional on formal acceptance of the milestone deliverables within 10 business days of delivery.*

### 8.3 Support Fee Payment

Enterprise Support fees are invoiced annually in advance, aligned with the platform license anniversary dates. The first support invoice is issued at contract execution, covering the first 12 months of support from the programme commencement date.

### 8.4 Infrastructure

AWS infrastructure costs are invoiced monthly based on actual AWS consumption, passed through at cost without markup. SettleMint can facilitate direct DBS Bank billing through AWS Marketplace or invoice directly based on AWS cost reports at DBS Bank's preference.

### 8.5 Payment Currency and Bank Details

All SettleMint invoices are denominated in EUR unless otherwise agreed. DBS Bank's payment obligations are in EUR regardless of currency fluctuations within the contract period. Payment instructions are provided on each invoice. Standard payment terms are net 30 days from invoice date.

---

## 9. Commercial Assumptions Register

### 9.1 Material Exclusions

The following items are explicitly excluded from the platform license and standard implementation scope. Each exclusion represents a distinct cost item that requires separate commercial agreement:

| Exclusion | Description |
|-----------|-------------|
| Third-party custody fees | Fireblocks, DFNS, or other MPC custody provider fees are not included in the DALP license. DBS Bank contracts directly with the custody provider. |
| KYC/AML data provider fees | Fees for external identity verification, KYC/AML screening, or sanctions database access are not included. DBS Bank manages these relationships. |
| AWS infrastructure costs | Cloud infrastructure is pass-through at cost, not bundled in the platform license. |
| Regulatory filing and legal fees | Any legal, compliance, or regulatory engagement required to structure the tokenized deposit instruments is outside SettleMint's scope. |
| DBS Bank internal costs | DBS Bank team time, internal IT costs, and internal change management costs are not included. |
| Optional work packages | TradeTrust deep integration, Project Guardian interoperability, additional instrument types, and advanced reporting packs require separate commercial agreement (Section 4.4). |
| Custom smart contract development | Any smart contract development beyond DALPAsset configuration (e.g., novel contract types not supported by the configurable token architecture) is outside scope and requires separate agreement. |
| Training beyond knowledge transfer | Structured training programmes beyond the Phase 6 knowledge transfer are available as a separate engagement. |
| Post-hypercare change requests | After the hypercare period, changes to platform configuration, integration patterns, or compliance templates are managed through the standard change request process under the support agreement. |

### 9.2 Minimum Commitments

| Commitment | Term |
|-----------|------|
| Minimum contract term | 3 years (1 production environment + 1 development environment) |
| Minimum annual platform license | EUR 420,000/year (production + development) |
| Minimum support tier | Standard Support (Enterprise Support recommended) |
| Payment schedule | Annual, upfront (no monthly or quarterly options) |

### 9.3 Price Hold Period

Pricing in this proposal is valid for 90 days from the date of submission (until 19 June 2026). After the price hold period, pricing is subject to review based on market conditions, currency movements, and programme scope changes.

Annual license fee increases are capped at the lower of 5% or the EU CPI (HICP) change for the preceding 12 months, beginning from Year 2. This cap provides DBS Bank with cost predictability over the contract term.

### 9.4 Scope Change Process

Material scope changes during implementation are managed through a formal change request process:
1. DBS Bank submits a written change request describing the scope addition or modification
2. SettleMint provides an impact assessment covering timeline, cost, and risk within 5 business days
3. DBS Bank reviews and approves or rejects the change request
4. Approved changes are documented in a Change Order and added to the Statement of Work

Minor changes within the tolerance of the agreed scope are absorbed without formal change requests. SettleMint's Delivery Lead defines tolerance thresholds at programme kickoff.

### 9.5 Currency Assumptions

All prices are in EUR. If DBS Bank requires SGD pricing, SettleMint will provide a SGD equivalent using the EUR/SGD exchange rate prevailing at contract execution, fixed for the contract term or re-fixed annually at DBS Bank's election.

### 9.6 Tax Treatment

All prices exclude Singapore GST, where applicable. SettleMint will apply Singapore GST at the prevailing rate (currently 9%) to invoices for services delivered in Singapore if required by applicable tax law. Tax treatment depends on the contractual structure, entity of supply, and the applicability of double taxation treaties between Singapore and Belgium (SettleMint's country of incorporation).

DBS Bank should engage its tax advisors to confirm the applicable tax treatment before contract execution.

---

## 10. Exit and Transition Terms

### 10.1 Data Portability

DBS Bank retains full ownership of all data generated on its DALP deployment. At any time during the contract term or upon termination, DBS Bank can export:

- All token transaction event logs (in JSON format, indexed by block number and transaction hash)
- All identity and compliance records (in structured JSON format)
- All configuration records (compliance templates, instrument templates, governance configurations)
- All audit and activity logs
- All API keys, webhook configurations, and integration settings
- All operational runbooks and documentation produced during implementation

DALP's API provides bulk export endpoints for all data categories. Export operations do not require SettleMint involvement; DBS Bank can execute exports independently at any time.

On-chain data (token balances, compliance events, identity registry state, audit events) is immutable and accessible directly from the blockchain network without any dependence on SettleMint. If DBS Bank deploys on a private blockchain network operated by SettleMint, the network and all on-chain data are transferred to DBS Bank's operation as part of the transition process.

### 10.2 Transition Assistance

Upon contract termination or non-renewal, SettleMint provides:

| Transition Service | Duration | Description |
|-------------------|----------|-------------|
| Data export assistance | 90 days | SettleMint engineers assist DBS Bank with bulk data exports and format documentation |
| Configuration documentation | Included | Complete documentation of all compliance configurations, integration patterns, and operational runbooks |
| Transition support | 90 days | Technical support during transition to alternative infrastructure or provider |
| Knowledge transfer sessions | Up to 10 sessions | Structured sessions covering all platform configuration, integration patterns, and operational procedures |

Transition assistance is included in the support fee for the final contract year. Additional transition support beyond these terms is available at standard day rates.

### 10.3 Intellectual Property

DBS Bank retains ownership of all custom configurations, institution-specific compliance templates, integration code developed for DBS Bank's systems, and operational documentation specific to DBS Bank's deployment. SettleMint retains ownership of the DALP platform software, core compliance modules, and standard templates.

There are no proprietary restrictions that prevent DBS Bank from engaging an alternative provider to operate a comparable digital asset platform. SettleMint does not claim rights over the smart contract addresses deployed on the blockchain for DBS Bank's programme; these are owned by DBS Bank.

### 10.4 Offboarding Process

If DBS Bank does not renew the contract at the end of the term:
1. SettleMint provides 6 months' notice of non-renewal if SettleMint initiates; DBS Bank provides 3 months' notice if DBS Bank initiates
2. The transition period begins on the notice date
3. Data export assistance and transition support are provided per Section 10.2
4. Platform access continues until the last day of the contracted license period
5. On-chain data and token contracts are not affected by contract termination; they continue to exist on the blockchain network

DBS Bank does not face data hostage scenarios. The platform is designed from the ground up to support institutional autonomy, including at exit.

---

## 11. Value Justification

### 11.1 Strategic Value: Programme Longevity

DBS Bank's RFP explicitly states that it is not procuring a one-off lab implementation. The institution is buying a controlled platform and delivery model that can support phased scale-up across users, products, legal entities, and approved jurisdictions. The commercial model must support this longevity objective.

DALP's per-environment licensing model supports exactly this trajectory. DBS Bank's Year 1 investment establishes the production platform, operational capability, and internal knowledge to operate the programme. Years 2 and 3 are expansion years: the platform license renews at the same rate while DBS Bank's operational team adds new product variants (additional instrument types), new jurisdictions (through compliance template additions), and new counterparty segments (through identity registry expansion), all without requiring procurement re-engagement or platform restarts.

The commercial model is therefore not just transparent; it is strategically appropriate for the institution's stated objectives.

### 11.2 Risk-Adjusted Value: Proven MAS Compliance

The commercial comparison between DALP and custom development understates DALP's advantage when risk is included. A custom-built tokenized deposits platform that has never operated under MAS regulatory scrutiny carries compliance design risk that DALP does not. DALP's MAS Singapore compliance template has been validated through the OCBC Bank production deployment, the same jurisdiction, the same regulator, and comparable instrument complexity.

The risk of a compliance architecture failure discovered during MAS review, internal audit, or a live incident is not purely financial. It carries regulatory, reputational, and operational risk that is difficult to quantify but material to DBS Bank's risk appetite. Procuring DALP with its demonstrated MAS compliance track record reduces this risk in a way that the commercial model alone does not capture.

### 11.3 Operational Value: T+0 Settlement Economics

DBS Bank's current trade finance operations involve T+2 or longer settlement cycles, creating intraday funding requirements associated with settlement exposure. Moving to T+0 atomic DvP settlement through DALP's XvP module directly reduces the intraday liquidity cost associated with this exposure.

For illustration: if DBS Bank's trade finance programme settles USD 500 million per day with an average settlement exposure period of 2 days, the reduction in funding cost at a conservative 3% cost of funding represents approximately USD 8 million per year in freed intraday liquidity. At USD 1 billion per day, this doubles. The actual figure depends on DBS Bank's specific trade finance volumes and funding costs, but the structural economic benefit of T+0 settlement is material at institutional scale.

### 11.4 Commercial Value: No Transaction Fees

DALP's licensing model has no transaction fees. As DBS Bank's tokenized deposits and trade finance programme scales, the platform license cost does not increase with transaction volume. This creates a fundamentally different economic model from transaction-fee-based platforms, where success in scaling the programme translates directly into scaling vendor revenue at the institution's expense.

DALP's economic model aligns SettleMint's interests with DBS Bank's programme success: SettleMint's revenue is determined by the number of environments licensed, which grows as the programme expands to new jurisdictions and legal entities, not as DBS Bank's existing programme processes more transactions. This alignment creates a commercial partnership that scales sustainably over the multi-year programme horizon that DBS Bank has described.

### 11.5 Competitive Positioning: No Re-Platforming Required

A frequent cost in institutional digital asset programmes is the re-platforming cycle: a narrow initial platform that cannot support the programme's growth requires replacement 18-24 months after initial deployment, creating significant unplanned cost and operational disruption.

DALP's configurable architecture is explicitly designed to prevent this. The same platform that handles DBS Bank's initial tokenized deposits programme can expand to trade finance instruments, additional asset classes, additional jurisdictions, and additional counterparty segments through configuration, not re-platforming. The commercial model reflects this: programme expansion is accommodated through environment additions at the published license rate, not through re-procurement.

The three-year TCO model provided in Section 7 shows that DALP's total cost over the programme horizon is materially lower than custom development alternatives, even before accounting for the risk premium and time premium that custom development carries in regulated environments.

---

*End of Commercial Proposal: DBS Bank. Tokenized Deposits and Trade Finance Platform*

*Document version: 1.0 Draft | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT.*
