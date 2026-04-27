# Commercial Proposal: Tokenized Securities Platform

**Prepared for:** Kasikornbank PCL
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** KASIKORNBANK-RFP-202603

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

**Document Title:** Commercial Proposal: Tokenized Securities Platform
**Client:** Kasikornbank PCL, Bangkok, Thailand
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. It is submitted exclusively in response to KASIKORNBANK-RFP-202603. All prices exclude applicable taxes and VAT.*

---

## 2. Commercial Summary

Kasikornbank's tokenized securities programme requires a commercial model that provides transparency on all cost components, clear separation of one-off and recurring costs, and commercial predictability as the programme scales from initial controlled deployment to multi-asset, multi-investor operations. This proposal delivers precisely that.

SettleMint's commercial model is structured around three components: platform licensing (annual, upfront); implementation services (phase-gated, scoped per engagement); and support and maintenance (tiered SLA). The platform licensing model is environment-based, not transaction-based. Kasikornbank's licensing cost does not increase as transaction volumes grow within the licensed environments. As the programme expands to additional asset classes, investor categories, or geographic entities, commercial scaling occurs through additional environment licensing rather than programme renegotiation.

**Summary of Platform Licensing Costs (Year 1):**

*All prices exclude applicable taxes and VAT.*

| Component | Annual Cost (EUR) |
|---|---|
| Production License (1 environment) | 300,000 |
| Development License (1 environment) | 120,000 |
| Implementation Services (19-week programme) | [CLIENT-SPECIFIC: scoped in Phase 1] |
| Premium Support and Maintenance | [CLIENT-SPECIFIC: scoped per tier] |
| Infrastructure (AWS ap-southeast-1, pass-through at cost) | [Pass-through, not marked up] |
| **Platform License Total (Year 1)** | **420,000** |

*Implementation services, support fees, and infrastructure costs are separate from the platform license and are scoped per engagement. Infrastructure costs are passed through at cost without SettleMint markup.*

**Three-Year Platform License Summary:**

| Year | Production License (EUR) | Development License (EUR) | Total (EUR) |
|---|---|---|---|
| Year 1 | 300,000 | 120,000 | 420,000 |
| Year 2 | 300,000 | 120,000 | 420,000 |
| Year 3 | 300,000 | 120,000 | 420,000 |
| **3-Year Total** | **900,000** | **360,000** | **1,260,000** |

*All prices exclude applicable taxes and VAT. All platform licenses are payable annually and upfront. The three-year figures represent the platform licensing cost only; implementation services, support, and infrastructure are separate.*

---

## 3. Licensing Model

### 3.1 Platform Licensing Philosophy

SettleMint licenses DALP on an annual, per-environment basis. The licensing model reflects four principles that are directly relevant to Kasikornbank's procurement objectives.

**Environment-based, not transaction-based:** Kasikornbank pays for environments, not transaction volumes. There are no per-token, per-transfer, per-investor, or per-API-call charges on top of the platform license. As Kasikornbank's tokenized securities programme scales from initial controlled scope across bonds, equities, and fund units to broader operations, transaction volume growth does not increase the platform license cost.

**All asset classes, one license:** Within a licensed environment, Kasikornbank can deploy and operate tokens across all DALP asset classes, bonds, equities, funds, stablecoins, deposits, real estate, precious metals, and configurable tokens, without incremental license fees per asset class. The platform license covers the full DALP capability set, not a modular subset.

**Predictable multi-year cost:** The platform license rate does not increase based on assets under management, investor count, or secondary market volume. Kasikornbank's multi-year total cost of ownership for the platform license component is deterministic and auditable, the figures in this proposal are the figures Kasikornbank will pay.

**Commercial scalability through additional environments:** Programme expansion into additional legal entities, jurisdictions, or segregated environments is accommodated through additional environment licenses at the same per-environment rate. There is no renegotiation premium for programme success.

### 3.2 License Types

**Production License: EUR 300,000 per year (EUR 25,000 per month equivalent)**

The Production License covers Kasikornbank's live tokenized securities environment, the environment processing real investor transactions, managing actual token positions, and operating under Bank of Thailand and SEC Thailand regulatory obligations. The Production License includes:

- Full DALP platform capability: all asset classes, compliance modules, settlement functionality, custody integrations, observability stack, and API access
- Production-grade operational support from SettleMint (separate from support tier fees)
- Platform updates on the Enterprise support cadence (continuous delivery with staged rollouts) or Premium support cadence (monthly releases) depending on support tier selection
- License to operate DALP software in the Production environment without per-transaction or per-asset restrictions

**Development License: EUR 120,000 per year (EUR 10,000 per month equivalent)**

The Development License covers Kasikornbank's non-production environments, development, testing, staging, and pre-production environments. It includes full DALP capability for development, configuration, integration testing, UAT, and pre-production validation. The Development License is not for live investor transactions; it is for building, testing, and validating the environment before promoting changes to Production.

*All prices exclude applicable taxes and VAT.*

### 3.3 Licensing Assumptions

- One Production environment and one Development environment are included in the Year 1 baseline.
- A Staging / Pre-Production environment, if operated as a production-equivalent environment (live data, regulatory reporting testing), is licensed as a Production environment. If used exclusively for testing and development, it is licensed as a Development environment.
- Expansion to additional Production environments (e.g., a separate legal entity environment, a separate jurisdiction environment) is priced at EUR 300,000 per additional Production environment per year.
- Platform licenses are payable annually and upfront. There is no monthly payment option.
- The license term is 12 months from the first payment date, with automatic renewal unless notice is given per the contract terms.

---

## 4. Implementation Services Pricing

### 4.1 Implementation Services Model

Implementation services for Kasikornbank's tokenized securities programme are scoped per engagement following the Phase 1 Discovery process. The final implementation services price is confirmed after Phase 1, based on the validated scope of work, integration complexity, number of asset classes in initial scope, and Kasikornbank's infrastructure readiness.

Implementation services are priced as a fixed-fee engagement for the defined 19-week (15-week core + 4-week hypercare) implementation programme, covering all SettleMint resources across the six implementation phases. The fixed-fee model provides Kasikornbank with cost certainty and eliminates time-and-materials overrun risk.

**Implementation Services: [CLIENT-SPECIFIC, scoped in Phase 1]**

The implementation services price reflects the following resource commitments from SettleMint:

- **Delivery Lead** (full engagement): Programme governance, client interface, escalation management
- **Solution Architect with Thailand / APAC specialisation** (full engagement): Architecture design, integration architecture, compliance mapping for Bank of Thailand and SEC Thailand
- **Platform Engineer** (Phases 2–5): Environment provisioning, DALP configuration, deployment
- **Integration Engineer** (Phases 3–4): Core banking integration, BAHTNET payment rail integration, KYC/AML integration, regulatory reporting connectivity
- **QA / Test Lead** (Phases 3–4): Test strategy, SIT execution, performance testing, UAT facilitation
- **Compliance Specialist** (Phases 1–2, 4): SEC Thailand and PDPA Thailand compliance mapping, compliance module configuration
- **Support Engineer** (Phases 5–6): Go-live support, hypercare operations, knowledge transfer

### 4.2 Implementation Scope Assumptions

The following assumptions underpin the implementation services scope. Material deviations discovered in Phase 1 are managed through the formal change control process.

- Initial scope covers three asset classes: bonds (government and corporate), equities (listed and unlisted), and mutual fund units
- Integration with one core banking system for investor account data and GL posting
- Integration with BAHTNET for THB settlement leg via ISO 20022
- Integration with one KYC/AML platform for claim issuance and pre-transfer screening
- Integration with Kasikornbank's existing regulatory reporting system for SEC Thailand and Bank of Thailand reporting data
- SIEM integration for security event forwarding
- One data warehouse / BI integration for management reporting

### 4.3 Out-of-Scope Items

The following items are outside the standard implementation services scope and are priced separately if required:

- Custom smart contract development beyond DALP's standard configurable architecture
- Integration with systems not identified above (additional integrations priced per integration)
- Advisory services related to SEC Thailand license applications or Bank of Thailand regulatory submissions (a legal/compliance advisory function, not a technology function)
- KBTG blockchain network integration (assessed in Phase 1 for coexistence design; integration development priced if applicable)
- Multi-jurisdiction expansion beyond Thailand (separate implementation scope)
- Investor-facing mobile application development (DALP provides the back-end and operator console; investor-facing channel development is Kasikornbank's scope)

---

## 5. Environment and Infrastructure Costs

### 5.1 Cloud Infrastructure (Pass-Through)

Where DALP is deployed in SettleMint-managed cloud infrastructure (AWS ap-southeast-1), cloud costs are passed through to Kasikornbank at cost without SettleMint markup. The following estimates are indicative based on comparable deployments; actual costs are confirmed during architecture design in Phase 1.

| Infrastructure Component | Monthly Estimate (USD) | Annual Estimate (USD) | Notes |
|---|---|---|---|
| Compute (EKS, EC2 for application tier) | 3,500–5,500 | 42,000–66,000 | Multi-AZ, right-sized per workload |
| Database (RDS PostgreSQL, multi-AZ) | 800–1,500 | 9,600–18,000 | Includes automated backups and point-in-time recovery |
| Object Storage (S3) | 100–300 | 1,200–3,600 | Documents, exports, log archival |
| Observability stack (managed) | 400–700 | 4,800–8,400 | VictoriaMetrics, Loki, Tempo, Grafana |
| Data transfer and networking | 200–500 | 2,400–6,000 | Includes Direct Connect or VPN connectivity |
| **Total Estimated Cloud (USD)** | **5,000–8,500** | **60,000–102,000** | Indicative; confirmed in Phase 1 |

*Infrastructure costs are in USD (AWS billing currency). All infrastructure costs exclude applicable taxes and VAT. These are pass-through costs, not SettleMint revenue.*

### 5.2 On-Premises Infrastructure (Kasikornbank-Borne)

Where Kasikornbank elects on-premises deployment (or a hybrid model), all infrastructure costs are borne directly by Kasikornbank. SettleMint provides infrastructure sizing specifications and deployment runbooks; Kasikornbank's IT infrastructure team procures and manages the hardware, software licences, and data centre costs. Key infrastructure requirements:

- Kubernetes cluster: minimum 8 worker nodes (production), 4 worker nodes (development); equivalent to approximately 128 vCPU and 512GB RAM across the production cluster
- HSM appliance: Thales Luna SA 7 or equivalent (FIPS 140-2 Level 3); typically EUR 40,000–80,000 capital cost per appliance with annual maintenance
- PostgreSQL database: enterprise-grade installation with streaming replication; dedicated server hardware or VMware allocation
- Network bandwidth: minimum 1Gbps to blockchain node(s); 10Gbps recommended for production

### 5.3 Blockchain Node Infrastructure

DALP requires connectivity to an EVM-compatible blockchain network. For Kasikornbank's tokenized securities programme, two network options are available:

**Option A: Private Besu Network (Recommended for Thailand Regulatory Context)**
Kasikornbank operates a private Hyperledger Besu network with SettleMint's support. This provides: full control over network governance, complete data residency within Thailand or designated cloud region, and no dependency on public network gas costs or congestion. Infrastructure cost is included in the cloud or on-premises scope above.

**Option B: Public EVM Network**
For instruments requiring public chain accessibility (e.g., secondary market trading on public exchanges), DALP can deploy on public EVM networks. Gas costs are pass-through and variable based on transaction volumes; these are not included in the platform license.

---

## 6. Support and Maintenance Fees

### 6.1 Support Tier Recommendation

SettleMint recommends **Premium Support** for Kasikornbank's tokenized securities programme in Year 1, with an upgrade option to Enterprise Support as the programme matures and transaction volumes grow.

**Premium Support: [CLIENT-SPECIFIC, scoped per engagement]**

Premium Support provides:
- Coverage hours: 07:00–22:00 CET, Monday–Friday; on-call for P1 on weekends
- Dedicated Slack channel for real-time support communication
- Named support engineer with deep familiarity of Kasikornbank's DALP deployment
- P1 (Critical) response: 1 hour; resolution target: 4 hours
- P2 (High) response: 4 hours; resolution target: 8 hours
- P3 (Medium) response: 1 business day; resolution target: 3 business days
- Monthly release cadence with early access to release candidates
- Monthly technical business review
- 99.95% monthly uptime SLA (approximately 22 minutes maximum monthly downtime)
- Service credits for SLA breach (10–50% of monthly support fees based on downtime)

Support fees are scoped as [CLIENT-SPECIFIC] because they depend on the complexity of the deployment, the number of environments covered, and the support tier selected. The commercial proposal submitted at contract stage will include the confirmed support fee.

### 6.2 Support Escalation Path

Kasikornbank's authorised support contacts escalate through the following path:
1. Named Support Engineer (Kasikornbank-dedicated)
2. Support Engineering Manager
3. VP Engineering / Head of Customer Success
4. SettleMint Executive Management

Escalation contact details are provided in the client support onboarding package.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO Model

The following TCO model provides Kasikornbank with a full picture of the programme cost across three years, distinguishing platform licensing (fixed), infrastructure (variable pass-through), and illustrative ranges for implementation and support (client-specific). All figures exclude taxes and VAT.

| Cost Component | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|---|---|---|---|---|
| Production License | 300,000 | 300,000 | 300,000 | 900,000 |
| Development License | 120,000 | 120,000 | 120,000 | 360,000 |
| Implementation Services | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Premium Support | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (USD, indicative) | 60,000–102,000 | 65,000–110,000 | 70,000–120,000 | 195,000–332,000 |
| **Platform License Subtotal** | **420,000** | **420,000** | **420,000** | **1,260,000** |

*All prices exclude applicable taxes and VAT. Infrastructure costs are in USD (indicative range); currency conversion applies based on prevailing rates. Implementation services are one-time costs in Year 1; support is annual and recurring.*

### 7.2 Five-Year TCO Model

| Cost Component | Years 1–5 Total (EUR) |
|---|---|
| Production License (5 years) | 1,500,000 |
| Development License (5 years) | 600,000 |
| Implementation Services (one-time, Year 1) | [CLIENT-SPECIFIC] |
| Premium Support (5 years) | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (indicative, 5 years) | 330,000–580,000 |
| **Platform License 5-Year Total** | **2,100,000** |

*All prices exclude applicable taxes and VAT.*

### 7.3 Cost Certainty Analysis

**What is fixed:**
- Platform license: EUR 420,000/year for the two-environment baseline. This cost is locked at the annual invoice and does not fluctuate with transaction volume, investor count, or asset under management. Kasikornbank's CFO can model this cost with certainty over the contract horizon.

**What is variable (and why):**
- Cloud infrastructure: passes through at cost; varies with transaction volumes, storage growth, and data transfer patterns. The indicative ranges above are based on comparable deployments; actual costs are monitored monthly with the observability stack and reported to Kasikornbank.
- Support fees: annual, based on agreed support tier; predictable once tier is confirmed at contract stage.
- Implementation services: one-time, confirmed after Phase 1 scoping. After Year 1, no recurring implementation fees unless Kasikornbank commissions expansion work.

**What does not exist:**
- Per-transaction fees
- Per-investor fees
- Per-asset-class module fees
- Volume-based license increases
- Success-fee or AUM-based pricing

### 7.4 Expansion Cost Model

As Kasikornbank's tokenized securities programme expands, the incremental commercial model is:

| Expansion Scenario | Commercial Treatment |
|---|---|
| Additional asset class on existing environment | No additional license fee (included in current environment license) |
| Additional investor onboarding on existing environment | No additional license fee |
| New production environment (e.g., separate entity) | EUR 300,000/year per additional production environment |
| New development environment | EUR 120,000/year per additional development environment |
| Multi-jurisdiction expansion (new legal entity) | New environment license + implementation services for the expansion scope |
| Integration with additional enterprise system | Implementation services for integration scope only; no license change |

---

## 8. Payment Terms and Milestones

### 8.1 Platform License Payment

**Annual, upfront.** Platform license invoices are issued annually at the start of each contract year and are payable within 30 days of invoice date. There is no monthly payment option.

- Year 1: Invoice issued at contract execution; payable within 30 days
- Year 2: Invoice issued at the 12-month anniversary; payable within 30 days
- Year 3: Invoice issued at the 24-month anniversary; payable within 30 days

**Currency:** All platform license fees are denominated in EUR. Kasikornbank's finance team is responsible for THB/EUR conversion at the prevailing rate at time of payment. Currency risk is Kasikornbank's.

### 8.2 Implementation Services Payment

Implementation services payment schedule is milestone-based, structured to align with value delivery:

| Milestone | Payment | Trigger |
|---|---|---|
| Contract execution | 30% | Signed commercial agreement |
| Phase 1 gate completion | 20% | Delivery of validated architecture document and compliance matrix |
| Phase 3 gate completion | 30% | Delivery of integrated system landscape with all connectors operational |
| Phase 5 go-live | 20% | Production deployment confirmation and go-live validation |

*The implementation services price is confirmed in Phase 1. The milestone percentages above apply to the agreed fixed-fee total.*

### 8.3 Support Fees Payment

Annual support fees are invoiced annually upfront, concurrent with the platform license invoice.

### 8.4 Infrastructure Costs

Cloud infrastructure costs are invoiced monthly in arrears based on actual AWS billing, passed through at cost with supporting AWS cost allocation report attached to each invoice. Infrastructure invoicing begins from the date environments are provisioned (typically mid-Phase 2).

---

## 9. Commercial Assumptions Register

The following assumptions underpin the commercial model in this proposal. Material deviations from these assumptions at contract stage or during implementation are managed through the formal change control process.

| Assumption ID | Assumption | Impact if Incorrect |
|---|---|---|
| CA-001 | Initial scope: two environments (Production + Development) | Third environment requires additional environment license |
| CA-002 | Contract minimum term: 36 months (3 years) from first invoice date | Shorter term may affect pricing structure |
| CA-003 | Platform license fees denominated in EUR; exchange rate risk borne by Kasikornbank | No impact on SettleMint invoice; Kasikornbank's treasury manages FX |
| CA-004 | All prices exclude Thai VAT, withholding tax, and any applicable local taxes | Kasikornbank's tax function to confirm applicable taxes and withholding obligations |
| CA-005 | Cloud infrastructure costs are pass-through at AWS ap-southeast-1 rates | On-premises deployment means zero infrastructure pass-through; hardware costs borne by Kasikornbank |
| CA-006 | Implementation services price is confirmed after Phase 1 scope validation | Scope changes discovered in Phase 1 are assessed and priced before Phase 2 commencement |
| CA-007 | BAHTNET connectivity exists within Kasikornbank's infrastructure | New BAHTNET connectivity procurement would extend integration timeline and scope |
| CA-008 | Kasikornbank provides dedicated project manager and key technical resources per RACI | Resource shortfalls delay timeline; timeline extension does not increase fixed-fee implementation price unless scope changes |
| CA-009 | SEC Thailand license status for Kasikornbank's digital token activities is confirmed before go-live | Regulatory uncertainty does not affect implementation timeline; go-live is Kasikornbank's regulatory determination |
| CA-010 | Third-party custody provider (Fireblocks or DFNS) is procured by Kasikornbank if applicable | SettleMint does not procure custody services on Kasikornbank's behalf; custody costs are Kasikornbank-direct |
| CA-011 | Platform license fees are not contingent on transaction volumes, AUM, or regulatory approval | License is payable regardless of transaction volume achieved post-go-live |
| CA-012 | Price hold period: EUR prices are locked for the initial 3-year term; Year 4 and 5 pricing subject to CPI-adjusted review with 6 months' notice | Renewal pricing discussion begins 6 months before end of contract term |

---

## 10. Exit and Transition Terms

### 10.1 Data Portability

Kasikornbank retains full ownership of all data created within the DALP platform. On request (or upon contract termination), SettleMint provides:

- Complete export of all on-chain event data in machine-readable structured format (JSON/CSV) covering all tokenized securities transactions, compliance events, and audit records for the contract period
- Export of all off-chain platform data: investor registry, configuration records, compliance module settings, access logs, and operational records
- Documentation package: architecture records, integration specifications, compliance module configurations, operational runbooks, and knowledge transfer materials
- Smart contract ABI documentation and deployment records sufficient for Kasikornbank to verify on-chain positions independently

Data export can be initiated at any time during the contract term (self-service through the platform's export API) or as a managed export process upon termination with a 30-day processing period for full historical export.

### 10.2 Transition Support

Upon contract termination or transition to an alternative platform, SettleMint provides a minimum of 90 days of transition support from the date of termination notice. Transition support includes:

- Read-only platform access for data extraction and verification
- Support for migration of active token positions (where contractually practical)
- Documentation assistance for regulatory continuity
- Knowledge transfer to the incoming platform provider or Kasikornbank's internal team

Extended transition support beyond 90 days is available at SettleMint's standard support rates, subject to resource availability.

### 10.3 Intellectual Property

DALP software is licensed, not sold. Kasikornbank's right to use DALP terminates with the license contract. Kasikornbank retains perpetual rights to:

- All data generated within DALP during the contract term
- All configuration records, documentation, and runbooks produced during implementation
- All custom integrations and connectors developed as part of the implementation services engagement
- All smart contract deployment records and on-chain transaction history

SettleMint retains ownership of the DALP platform software, SMART Protocol implementation, and all underlying intellectual property. Institution-specific configurations are separable from the core platform and are documented in the configuration archive provided to Kasikornbank.

### 10.4 Smart Contract Continuity

Smart contracts deployed on the blockchain during the DALP deployment remain on-chain after contract termination. Kasikornbank retains access to the deployed contracts through publicly available blockchain infrastructure regardless of the SettleMint commercial relationship. The governance keys controlling smart contract upgrades and compliance module changes are held by Kasikornbank under the bring-your-own-custody model, ensuring that Kasikornbank is never locked out of its own on-chain token infrastructure.

---

## 11. Value Justification

### 11.1 Build vs. Buy Analysis

The fundamental commercial question for Kasikornbank's tokenized securities programme is whether to build a custom platform or license DALP. The following analysis is based on comparable institutional deployments and industry benchmarks.

**Custom Development Approach. Estimated Costs:**

| Component | Estimated Cost (EUR) | Timeline |
|---|---|---|
| Core tokenization platform (smart contracts, API, console) | 2,500,000–4,000,000 | 18–24 months |
| Compliance engine (SEC Thailand, BoT requirements) | 800,000–1,500,000 | 6–12 months |
| Custody integration (HSM, Fireblocks/DFNS) | 400,000–700,000 | 3–6 months |
| Settlement module (DvP/XvP) | 500,000–900,000 | 4–8 months |
| Observability and operations tooling | 300,000–600,000 | 3–6 months |
| Security audit and penetration testing | 200,000–400,000 | 2–4 months |
| Smart contract audit | 150,000–300,000 | 2–3 months |
| Integration with core banking, BAHTNET, KYC | 600,000–1,200,000 | 6–9 months |
| **Total Custom Build (Estimated)** | **5,450,000–9,600,000** | **24–36 months** |
| **Annual Maintenance (20% of build cost)** | **1,090,000–1,920,000/year** | Ongoing |

**DALP, 3-Year Total Cost of Ownership (Platform License):**

| Component | 3-Year Cost (EUR) |
|---|---|
| Platform Licenses (Production + Development) | 1,260,000 |
| Implementation Services | [CLIENT-SPECIFIC, materially lower than custom build] |
| Support (3 years at Premium tier) | [CLIENT-SPECIFIC] |
| Infrastructure (3 years) | ~180,000–300,000 |
| **Estimated 3-Year TCO with DALP** | **~1,800,000–2,000,000** (platform + infra, before implementation and support) |

**Build vs. Buy Conclusion:** Custom development of a comparable capability set to DALP would require EUR 5.5–9.6M in initial capital expenditure and 24–36 months of development before go-live, versus 19 weeks to production with DALP at a fraction of the capital outlay. The three-year total cost of DALP (including implementation and support) remains materially below the initial capital cost of a custom-built alternative, without the execution risk, operational sustainability risk, or regulatory compliance risk of an internal build.

### 11.2 Time-to-Value

DALP's 19-week implementation timeline to production go-live versus 24–36 months for custom development represents an 18–24 month market advantage. For Kasikornbank's tokenized securities programme, this translates to:

- Revenue from tokenized bond issuances beginning in Year 1 rather than Year 3
- First-mover advantage in SEC Thailand's emerging digital securities market during the critical early-adoption window
- Risk of regulatory or market window closing reduced by faster deployment
- Competitive positioning against other Thai banks pursuing similar programmes

### 11.3 Operational Cost Avoidance

DALP's automated servicing capabilities eliminate or reduce manual operational costs that would otherwise be required for a tokenized securities programme at scale:

**Coupon Automation:** Automated coupon calculation and distribution for tokenized bonds eliminates manual spreadsheet reconciliation for each coupon date. At scale (50+ bond issues), this represents approximately 2–4 FTE-days per quarter in avoided manual processing.

**KYC Continuity Enforcement:** Automated KYC expiry tracking and transfer blocking eliminates manual eligibility checks before each secondary market transaction. At scale, this eliminates a significant compliance operations overhead.

**Reconciliation Automation:** Real-time position registry with automated nightly reconciliation reduces the overnight GL reconciliation team effort by an estimated 60–70% compared to manual tokenized securities reconciliation processes.

**Reporting Automation:** Event-driven regulatory data export eliminates manual SEC Thailand reporting data assembly, estimated at 3–5 days per reporting period at scale.

### 11.4 Risk Cost Avoided

**Compliance Enforcement Failure:** A single compliance violation, allowing a non-eligible investor to receive restricted securities, can result in SEC Thailand enforcement action, potential license suspension, and reputational damage. DALP's ex-ante compliance enforcement at the smart contract layer eliminates this risk category. The cost of a single regulatory enforcement action (legal fees, remediation, potential penalties) would typically exceed the three-year DALP platform license cost.

**Settlement Failure:** Without atomic DvP settlement, failed settlements require manual unwinding of positions, a process that can consume significant operational resource and create counterparty disputes. DALP's atomic settlement design means settlement failures revert cleanly without manual intervention, eliminating a category of operational risk that manual or application-layer settlement approaches cannot address.

**Key Compromise:** A cryptographic key compromise in a custom-built platform without institutional-grade custody integration would be a catastrophic event requiring complete reconstruction of the key management infrastructure. DALP's Key Guardian with HSM and institutional custody integration (Fireblocks/DFNS) provides the security architecture that limits this risk to a manageable category.

---

*All prices in this proposal exclude applicable taxes and VAT. Platform licenses are payable annually and upfront. Implementation services and support fees are [CLIENT-SPECIFIC] and are confirmed following Phase 1 scoping. This proposal is valid for 90 days from the date above.*
