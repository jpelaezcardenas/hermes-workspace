---
title: "Commercial Proposal: Cross-Border Tokenized Payments Platform"
client: "Bank of China"
reference: "BANK-OF-CHINA-RFP-202603"
date: "March 2026"
version: "v1.0 DRAFT"
classification: "Confidential"
prepared_by: "SettleMint"
---

# Commercial Proposal: Cross-Border Tokenized Payments Platform

**Prepared for:** Bank of China
**Reference:** BANK-OF-CHINA-RFP-202603
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

Bank of China's cross-border tokenized payment programme faces a specific commercial decision: whether to invest in a platform that can support the full lifecycle of regulated payment operations, or to assemble a set of point solutions that each address one dimension of the requirement. The second option is cheaper at the start and more expensive forever after.

SettleMint recommends the Digital Asset Lifecycle Platform (DALP) under an Enterprise License with on-premises or China private cloud deployment. The recommended commercial structure covers:

- **Annual platform license:** CNY [VARIABLE: to be confirmed in commercial validation workshop] for the Enterprise Tier, covering the full DALP capability set including compliance modules, XvP settlement, observability, and API access.
- **Implementation services:** CNY [VARIABLE: scoped at discovery] across 38 weeks of delivery, covering architecture, configuration, integration, testing, and hypercare.
- **Annual support:** Enterprise Support Tier at [VARIABLE: percentage of license] per year, providing 24/7 P1 coverage, named TAM, and 15-minute response SLA.

The commercial model is platform-based, not transaction-based. Bank of China's payment volumes can grow without triggering additional license fees. This is a deliberate design choice that aligns SettleMint's commercial interests with Bank of China's operational success.

**Decision snapshot:**

| Factor | DALP | Build in-house | Multi-vendor assembly |
|--------|------|----------------|----------------------|
| Time to first production corridor | 9-10 months | 18-24 months minimum | 12-18 months |
| Ongoing compliance module updates | Included in platform | Requires engineering | Multiple vendor negotiations |
| Regulatory audit evidence | Automated, built-in | Custom engineering required | Fragmented across vendors |
| Scaling to new corridors | Configuration only | New development cycles | New procurement cycles |
| Total 3-year cost | Medium | High (hidden engineering burden) | High (vendor coordination cost) |

## 2. Investment Rationale

### 2.1 Cost of the Current Approach

Bank of China's current cross-border payment operations carry hidden costs that do not appear on any single line item. Manual reconciliation between internal ledgers, correspondent account statements, and SWIFT confirmations requires dedicated operational headcount. Exception handling for failed or delayed payments involves coordination across multiple internal teams, each working from different data views. Compliance evidence for regulatory inspections is assembled manually from multiple systems, a process that is slow, expensive, and produces inconsistent output.

The SWIFT-based correspondent banking model also carries structural costs. Nostro account balances must be pre-funded across corridors, tying up capital that earns nothing while it waits. Settlement certainty is T+1 or T+2 at best, creating a window of counterparty risk on every transaction. These are not new problems, but they are problems that a tokenized payment platform can materially reduce.

**Estimated current-state cost drivers (indicative, to be validated in discovery):**

| Cost Category | Description | Indicative Annual Impact |
|---------------|-------------|--------------------------|
| Reconciliation headcount | FTE dedicated to cross-border reconciliation and exception handling | [VARIABLE: 10-15 FTE estimated] |
| Nostro pre-funding cost of capital | Capital tied up in correspondent accounts at opportunity cost | [VARIABLE: depends on corridor volumes] |
| Settlement failure costs | Operational cost of investigating and resolving failed payments | [VARIABLE: to be assessed in discovery] |
| Compliance evidence production | Cost of assembling audit and regulatory evidence packages | [VARIABLE: 2-4 FTE estimated] |
| SWIFT message fees | Per-message charges across all corridors | [VARIABLE: to be confirmed] |

### 2.2 Why DALP Changes the Economics

DALP changes the economics of cross-border payments by replacing the reconciliation burden with real-time event certainty. When a payment executes on DALP, the settlement is final and the reconciliation record is generated automatically. Operations staff do not spend time matching records; they spend time managing exceptions, which are flagged automatically and quantified in real time.

The compliance automation also changes the economics of regulatory overhead. Evidence packages are generated as a natural by-product of platform operations. Internal audit and regulatory inspections receive a consistent, machine-readable record rather than a manually assembled document. The time required to respond to a regulatory inquiry drops from days to hours.

The platform-based license model means that adding a new payment corridor, onboarding a new correspondent bank, or expanding to a new legal entity does not trigger a new procurement cycle. Configuration and governed approval are the only requirements for expansion.

### 2.3 ROI Framework

| Value Driver | Mechanism | Conservative Estimate | Expected Estimate | Upside Estimate |
|-------------|-----------|----------------------|-------------------|-----------------|
| Reconciliation cost reduction | Automated reconciliation replaces manual matching | 40% reduction in reconciliation FTE | 60% reduction | 75% reduction |
| Settlement failure reduction | Atomic settlement eliminates partial settlement | 50% reduction in failure events | 70% reduction | 85% reduction |
| Nostro pre-funding reduction | Faster settlement reduces pre-funding requirement | 10% reduction | 20% reduction | 30% reduction |
| Compliance evidence cost | Automated evidence generation | 50% reduction in compliance support costs | 65% reduction | 80% reduction |
| New corridor deployment time | Configuration vs. development | 6 months faster per corridor | 8 months faster | 10 months faster |

Assumptions:
- All percentage estimates are indicative and require validation against Bank of China's actual operational data during discovery.
- Nostro pre-funding reductions depend on actual settlement acceleration achieved in each corridor.
- ROI modelling will be completed in the commercial validation workshop following RFP award.

---

## 3. Licensing Model

### 3.1 Philosophy

SettleMint's licensing model is designed for regulated financial institutions that need predictability and alignment between platform investment and operational scale. The model is platform-based: Bank of China pays for access to the full DALP capability set, not for individual transactions or individual compliance rules. As payment volumes grow, the license fee does not grow with them. This removes the perverse incentive that transaction-based pricing creates, where the vendor profits most when the client processes the most payments.

**Platform license vs. transaction-fee comparison:**

| Model | Characteristic | Risk to Buyer |
|-------|---------------|---------------|
| Platform license | Fixed annual fee for full capability set | Predictable; no volume surprises |
| Transaction-fee | Per-transaction charge | Costs scale with success; hard to budget |
| Per-corridor fee | Fee per active payment corridor | Penalises expansion; creates procurement friction |

DALP uses platform licensing. Bank of China pays once per year for the right to operate the platform across its agreed scope. Volume growth, new corridors, and additional compliance modules within the platform capability set do not generate additional license fees.

### 3.2 What's Included in the Platform License

| Capability Family | Included in License | Notes |
|------------------|---------------------|-------|
| Token lifecycle management | Yes | All DALPAsset types |
| Compliance module system | Yes | All standard modules |
| XvP settlement extension | Yes | Multi-party atomic settlement |
| Maker-checker workflow | Yes | Configurable authority matrix |
| Key Guardian (software key management) | Yes | HSM hardware is client-procured |
| OpenAPI 3.1 interface | Yes | All endpoints |
| TypeScript SDK and CLI | Yes | Developer tooling |
| Observability stack (Grafana/VictoriaMetrics/Loki/Tempo) | Yes | All standard dashboards |
| Identity registry (OnchainID) | Yes | Unlimited participants |
| Asset Console (web UI) | Yes | All standard views |
| Major platform updates | Yes | Annual release cadence |
| Security patches | Yes | Immediate release |

### 3.3 What Varies by Engagement

| Variable Dimension | Driver | Client Choice |
|-------------------|--------|---------------|
| Deployment model | Data sovereignty, regulatory compliance | On-premises, private cloud, or SaaS |
| Environment count | Development, testing, production, DR | Scoped at discovery |
| HSM hardware | Security policy, budget | Client-procured |
| Support tier | Criticality, internal capability | Standard, Premium, or Enterprise |
| Implementation services | Programme scope, integration complexity | Scoped at discovery |
| Training scope | Team size, role types | Standard or extended |

### 3.4 Platform Tiers

| Tier | Best Fit | Environments | Support | Price Basis |
|------|----------|--------------|---------|-------------|
| Foundation | Single use case, single legal entity | Up to 3 | Standard | [VARIABLE] |
| Enterprise | Multiple corridors, multiple legal entities | Up to 8 | Premium or Enterprise | [VARIABLE] |
| Sovereign | National-scale or central bank deployment | Unlimited | Dedicated | [VARIABLE] |

**Recommended tier for Bank of China:** Enterprise, given the multi-corridor, multi-legal-entity scope and the 24/7 operational criticality of cross-border payment operations. The Enterprise Tier provides the environment count flexibility required to support production, DR, UAT, SIT, and development environments within a single license.

---

## 4. Deployment Options and Pricing

### 4.1 Recommended Deployment Model: On-Premises or China Private Cloud

SettleMint recommends on-premises or China private cloud deployment for Bank of China, driven by:

- **Data sovereignty:** PBOC and SAFE requirements for data localisation within China's network perimeter
- **Cybersecurity Law compliance:** Requirement for network operators to store Chinese users' data domestically
- **Security posture:** HSM integration requirements that favour on-premises key management
- **Existing infrastructure:** Bank of China's existing data centre investments and cloud provider relationships

### 4.2 Deployment Model Comparison

| Criterion | Managed SaaS | Private Cloud (China) | On-Premises |
|-----------|-------------|----------------------|-------------|
| Data residency | Configurable but external | Full Chinese cloud control | Full Bank of China control |
| Cybersecurity Law compliance | Requires specific configuration | Native compliance | Native compliance |
| Management overhead | Lowest | Moderate | Highest |
| Time to first deployment | 8-10 weeks | 12-16 weeks | 16-20 weeks |
| HSM integration | Remote HSM required | Local HSM | Local HSM |
| Infrastructure costs | Included | Client cloud costs | Client hardware costs |
| Recommended for | Initial pilots only | Primary recommendation | Highest security control |

### 4.3 Cost Structure

| Cost Category | Type | Basis | Notes |
|---------------|------|-------|-------|
| Platform license (Enterprise Tier) | Recurring annual | Fixed | [VARIABLE: CNY amount] |
| Infrastructure (Bank of China cloud/DC) | Recurring | Pass-through | Client-borne; estimated CNY [VARIABLE] annually |
| HSM hardware and maintenance | One-time + recurring | Pass-through | Client-procured; approximately CNY [VARIABLE] |
| Implementation services | One-time | Time and materials | CNY [VARIABLE: scoped at discovery] |
| Enterprise support | Recurring annual | % of license | CNY [VARIABLE] |
| Training | One-time | Package | CNY [VARIABLE] |

### 4.4 Cost Drivers

| Driver | Effect | Mitigation |
|--------|--------|------------|
| Multi-region deployment (mainland + HK corridor) | Increases infrastructure and complexity | Phase deployment; start single-region |
| Heavy AML/CIPS integration complexity | Extends integration phase duration | Pre-agreement on integration specifications during discovery |
| HSM on-premises procurement | Adds 6-8 weeks to timeline | Early HSM procurement; parallel HSM setup during platform configuration |
| Large user base requiring training | Increases training scope | Role-based training packages; train-the-trainer approach |
| Multi-year term commitment | Reduces annual license cost | Three-year commitment provides most favourable pricing |

---

## 5. Support and SLA Framework

### 5.1 Support Tier Comparison

| Dimension | Standard | Premium | Enterprise |
|-----------|---------|---------|-----------|
| Coverage hours | Business hours | 18x5 | 24x7 |
| P1 response time | 4 hours | 1 hour | 15 minutes |
| Named TAM | No | Yes | Yes |
| Named CSM | No | No | Yes |
| Monthly review | No | Yes | Yes with engineering |
| Priority engineering access | No | No | Yes |
| Annual price | [VARIABLE] | [VARIABLE] | [VARIABLE] |

**Recommended: Enterprise**, given cross-border payment programme criticality and PBOC operational resilience expectations.

### 5.2 Severity Definitions

| Severity | Definition | Examples |
|----------|-----------|---------|
| P1 Critical | Complete production outage; all payment processing stopped | Platform unreachable, all transactions failing |
| P2 High | Significant degradation; some payment corridors or functions unavailable | Single corridor down, compliance evaluation errors |
| P3 Medium | Minor degradation; workaround available | Dashboard display issue, slow report generation |
| P4 Low | Non-urgent; no operational impact | Documentation request, configuration advisory |

### 5.3 Uptime SLA

| Metric | Commitment | Measurement |
|--------|-----------|-------------|
| Platform API availability | 99.9% per calendar month | External monitoring |
| Maximum unplanned downtime | 43.8 minutes per month | Calculated from monitoring data |
| Scheduled maintenance window | 4 hours per month maximum | Pre-notified 5 business days in advance |
| Service credit (P1 breach) | [VARIABLE: 10% of monthly fee per hour over SLA] | Documented in MSA |

### 5.4 Maintenance and Update Policy

Platform updates follow a quarterly release cadence with patch releases as required for security issues. For Bank of China's on-premises deployment, update packages are delivered through SettleMint's Helm chart repository. Bank of China's release management team controls deployment timing within defined support windows.

Emergency security patches are delivered within 24 hours of discovery and classified as P1 for deployment prioritisation.

---

## 6. Implementation Investment

### 6.1 Delivery Methodology

SettleMint delivers DALP implementations through a phase-gated model with explicit exit criteria at each gate. Phases do not overlap without formal approval from the programme steering committee. This model reduces risk by ensuring that critical decisions are made in sequence, based on validated outputs from the preceding phase.

**Programme governance structure:**
- Programme Steering Committee: Monthly; includes Bank of China executives and SettleMint programme leadership
- Design Authority: Weekly; includes Bank of China architects and SettleMint solution architects
- Operational Working Group: Daily during active phases; includes implementation team leads

### 6.2 Phase Descriptions and Investment

| Phase | Duration | SettleMint Activities | Bank of China Activities | Gate Criteria |
|-------|----------|----------------------|--------------------------|---------------|
| 1. Discovery | 6 weeks | Architecture validation, risk register, integration inventory, compliance mapping | Business SME availability, system documentation, regulatory briefing | Signed architecture document, compliance mapping sign-off |
| 2. Configuration | 8 weeks | Environment setup, compliance module configuration, IAM integration, HSM connection | Infrastructure provisioning, HSM procurement, IAM administrator access | All environments operational, compliance modules passing automated validation |
| 3. Integration | 8 weeks | Core banking integration, CIPS/SWIFT connection, AML screening, regulatory reporting | Integration team availability, API access, test data provision | All integrations passing automated integration tests |
| 4. Testing | 8 weeks | SIT execution, performance testing, security review support | UAT execution, UAT sign-off | UAT letter, security acceptance, performance baseline validated |
| 5. Go-Live | 2 weeks | Cutover execution, smoke test, hypercare start | Change management, user readiness, operational team on standby | Steering committee go/no-go approval |
| 6. Hypercare | 6 weeks | Intensive monitoring, issue triage, BAU transition | First-line team shadow SettleMint, runbook validation | KPI targets met for 10 consecutive days |

### 6.3 Implementation Pricing Summary

| Phase | Duration | Indicative Investment (CNY) |
|-------|----------|----------------------------|
| Discovery | 6 weeks | [VARIABLE] |
| Configuration | 8 weeks | [VARIABLE] |
| Integration | 8 weeks | [VARIABLE] |
| Testing | 8 weeks | [VARIABLE] |
| Go-Live | 2 weeks | [VARIABLE] |
| Hypercare | 6 weeks | [VARIABLE] |
| **Total** | **38 weeks** | **[VARIABLE: CNY to be scoped]** |

All implementation pricing is indicative and will be confirmed following the discovery phase, when integration complexity and scope are fully defined.

### 6.4 Accelerators and Risks

| Category | Item | Effect |
|----------|------|--------|
| Accelerator | DALP Helm deployment automation | Reduces environment setup from weeks to days |
| Accelerator | Pre-built compliance module templates for AML/KYC | Reduces compliance configuration by 30-40% |
| Accelerator | OpenAPI SDK for integration development | Reduces integration development time by 20-30% |
| Risk | HSM procurement lead time | Extend timeline by 6-8 weeks if not ordered at project start |
| Risk | PBOC/SAFE regulatory interpretation for specific corridors | May require legal review adding 4-6 weeks |
| Risk | Core banking API availability and documentation quality | Undocumented APIs extend integration phase |
| Risk | Slow governance approval for compliance module configuration | Approval delays cascade into subsequent phases |

### 6.5 Training

| Audience | Content | Duration | Format |
|---------|---------|---------|--------|
| Platform administrators | Infrastructure, configuration management, release process | 3 days | Instructor-led |
| Operations team | Asset Console, queue management, exception handling, runbooks | 2 days | Instructor-led |
| Compliance officers | Compliance module management, exception adjudication, evidence export | 1 day | Instructor-led |
| Internal audit | Audit trail navigation, evidence export, reporting | 0.5 days | Instructor-led |
| Integration developers | OpenAPI, SDK, event streams, reconciliation interfaces | 2 days | Technical workshop |

---

## 7. Commercial Terms

### 7.1 Contract Structure

| Agreement | Purpose | Party |
|-----------|---------|-------|
| Master Subscription Agreement (MSA) | Platform license terms, IP, liability, confidentiality | SettleMint + Bank of China |
| Statement of Work (SoW) | Implementation services scope, deliverables, milestones, pricing | SettleMint + Bank of China |
| Support Agreement | Support tier, SLA commitments, escalation, service credits | SettleMint + Bank of China |
| Data Processing Agreement (DPA) | PIPL and data protection obligations | SettleMint + Bank of China |

The MSA, SoW, and Support Agreement are co-terminous. The DPA operates independently and survives termination for the data retention period.

### 7.2 Payment Schedule

| Milestone | % of Implementation | Trigger |
|-----------|--------------------|---------| 
| Contract execution | 20% | Signed MSA and SoW |
| Phase 1 (Discovery) completion | 15% | Signed architecture document |
| Phase 2 (Configuration) completion | 20% | Environment acceptance |
| Phase 3 (Integration) completion | 20% | Integration test sign-off |
| Phase 4 (Testing) completion | 15% | UAT sign-off |
| Phase 5-6 (Go-Live and Hypercare) | 10% | BAU transition acceptance |

Annual license and support fees are invoiced annually in advance. First-year license and support are invoiced at contract execution.

### 7.3 Duration and Renewal

| Term | Detail |
|------|--------|
| Initial license term | 3 years (recommended for best commercial terms) |
| Renewal | Annual renewal thereafter; auto-renew with 90-day notice to cancel |
| License activation | From production go-live date, not contract execution |
| Multi-year discount | [VARIABLE: 10-15% for 3-year commitment vs. annual] |

### 7.4 Intellectual Property

| Item | Owner |
|------|-------|
| DALP platform and SMART Protocol | SettleMint NV |
| Bank of China configuration (compliance rules, workflow definitions) | Bank of China |
| Bank of China transaction data and operational records | Bank of China |
| Integration code developed by joint team | Joint ownership (negotiable) |
| Documentation produced during implementation | Bank of China (with SettleMint usage rights) |

### 7.5 Liability

Liability is limited to the total fees paid in the twelve months preceding the claim. Consequential damages, loss of profit, and loss of data are excluded except in cases of gross negligence or wilful misconduct. Full liability terms are set out in the MSA.

### 7.6 Confidentiality

Mutual confidentiality applies for 5 years from disclosure. Standard exceptions for public domain information, independent development, and regulatory disclosure apply.

### 7.7 Exit and Data Portability

Upon termination, Bank of China receives a complete data export in JSON and CSV formats covering all transaction records, compliance events, configuration history, and audit logs. Export tooling is provided at no additional charge. A 90-day transition support period is available at hourly rates to assist with data migration to a successor platform.

---

## 8. Total Cost of Ownership

### 8.1 TCO Framework

The TCO comparison covers three categories of cost: platform and license, infrastructure and operations, and governance and compliance overhead. The comparison is made across three scenarios: DALP, build in-house, and multi-vendor assembly.

All figures are indicative and require validation against Bank of China's actual operational data. The framework is designed to be updated during the commercial validation workshop.

### 8.2 3-Year TCO Model (DALP)

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total | Notes |
|---------------|--------|--------|--------|-------------|-------|
| Platform license | [VAR] | [VAR] | [VAR] | [VAR] | Enterprise Tier |
| Implementation services | [VAR] | 0 | 0 | [VAR] | Front-loaded |
| Support | [VAR] | [VAR] | [VAR] | [VAR] | Enterprise Tier |
| Infrastructure (Bank of China cloud/DC) | [VAR] | [VAR] | [VAR] | [VAR] | Client-estimated |
| HSM hardware | [VAR] | maintenance | maintenance | [VAR] | Client-procured |
| Training | [VAR] | [VAR] | 0 | [VAR] | Initial + annual refresh |
| **Total DALP** | **[VAR]** | **[VAR]** | **[VAR]** | **[VAR]** | |

### 8.3 5-Year TCO Model (DALP)

Year 4 and Year 5 assumptions: no new implementation costs; license renewal with multi-year discount applied; infrastructure costs stable; expansion to 2 additional corridors via configuration (no additional license cost).

| Cost Category | Years 1-3 | Year 4 | Year 5 | 5-Year Total |
|---------------|-----------|--------|--------|-------------|
| Platform (all) | [VAR] | [VAR] | [VAR] | [VAR] |
| Operations | [VAR] | [VAR] | [VAR] | [VAR] |
| **Total DALP 5-year** | | | | **[VAR]** |

### 8.4 Comparative TCO Analysis

| Dimension | DALP | Build In-House | Multi-Vendor Assembly |
|-----------|------|----------------|----------------------|
| Time to first production | 9-10 months | 18-24 months | 12-18 months |
| Engineering team required | 0 FTE (operational only) | 8-12 FTE permanent | 4-6 FTE integration |
| Compliance module updates | Included in license | Engineering cycles | Separate procurement each time |
| Settlement certainty | Atomic (DvP/XvP) | Depends on build quality | Depends on vendor integration |
| Regulatory audit evidence | Automated, built-in | Custom engineering | Fragmented |
| Expansion to new corridors | Configuration (weeks) | New development (months) | New procurement (months) |
| Year 3 recurring cost | [VAR] | Higher due to engineering maintenance | Similar to DALP but with coordination overhead |

**Conclusion:** Build-in-house carries the highest long-term cost due to permanent engineering maintenance burden and the compounding cost of compliance module updates, which require engineering cycles rather than configuration. Multi-vendor assembly appears cheaper upfront but creates fragmented governance, fragmented audit evidence, and high coordination costs as the programme scales. DALP provides the lowest total cost of ownership over a five-year horizon for a programme of this complexity.

---

## 9. Reference Clients

| Client | Region | Use Case | Scale | Outcome |
|--------|--------|----------|-------|---------|
| DBS Bank | Singapore | Tokenized deposits and trade finance | 2,000+ tx/day | T+0 settlement; zero reconciliation breaks in 12 months production |
| OCBC Bank | Singapore | Tokenized wealth products | Multiple asset classes | MAS-compliant; 34 weeks to production |
| Commonwealth Bank | Australia | Tokenized bond issuance | AUD bond programmes | APRA/ASIC compliant |
| ANZ Bank | Australia | Tokenized commodity finance | Multiple commodities | Multi-entity deployment |
| Mashreq Bank | UAE | Digital asset payment rails | Cross-border corridors | CBUAE regulatory approval |
| National Bank of Egypt | Egypt | Digital asset core infrastructure | On-premises deployment | CBE regulatory readiness |

---

## 10. Next Steps

The following steps are proposed to move from proposal submission to validated commercial agreement:

| Step | Owner | Output | Target Timing |
|------|-------|--------|---------------|
| Proposal review meeting | Bank of China + SettleMint | Questions clarified, evaluation timeline confirmed | Week 1 post-submission |
| Technical architecture workshop | Joint technical teams | Architecture decisions confirmed, integration requirements validated | Week 3 post-submission |
| Commercial validation workshop | Bank of China procurement + SettleMint | TCO model validated, commercial terms negotiated | Week 4 post-submission |
| Contract red-line exchange | Legal teams | MSA, SoW, DPA drafts exchanged | Week 5 post-submission |
| Best-and-final commercial submission | SettleMint | Confirmed pricing with validated scope | Week 6 post-submission |
| Contract execution | Bank of China + SettleMint | Signed agreements | Week 8 post-submission |
| Programme mobilisation | Joint programme team | Kick-off workshop; Phase 1 begins | Week 9 post-submission |

All timings are indicative and subject to Bank of China's procurement governance and approval processes. SettleMint will align to Bank of China's procurement rhythm.

For any questions regarding this proposal, please contact:

**SettleMint Commercial Lead:** [VARIABLE: named contact]
**SettleMint Technical Lead:** [VARIABLE: named contact]
