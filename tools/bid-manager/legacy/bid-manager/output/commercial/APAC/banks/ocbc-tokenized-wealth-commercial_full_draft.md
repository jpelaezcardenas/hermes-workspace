# Commercial Proposal: Tokenized Wealth Products Platform

**Prepared for:** OCBC Bank Ltd
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** OCBC-RFP-202603

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

**Document Title:** Commercial Proposal: Tokenized Wealth Products Platform
**Client:** OCBC Bank Ltd, Singapore
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. Submitted exclusively in response to OCBC-RFP-202603. All prices exclude applicable taxes and VAT.*

---

## 2. Commercial Summary

OCBC Bank's expanded tokenized wealth products programme represents a natural evolution of the existing SettleMint deployment rather than a new procurement. The commercial model reflects this: OCBC Bank does not need to re-purchase the infrastructure that is already operating in production. The commercial proposal covers the incremental investment required to expand the platform's scope to the full tokenized wealth products programme.

The commercial structure consists of:
1. **Platform license continuation:** The existing production and development environment licenses continue at their current terms
2. **Additional environments (if required):** Staging environment for wealth product expansion
3. **Expansion implementation services:** Scoped for a 16-week expansion programme (shorter than a new deployment)
4. **Support tier extension:** Covering the expanded wealth product scope under the same or upgraded support tier

**Year 1 Platform License Cost (including existing environments):**

| Environment | Annual Fee (EUR) |
|-------------|-----------------|
| Production License (existing + expanded scope) | 300,000 |
| Development License (existing + expanded scope) | 120,000 |
| Staging License (new, recommended for expansion) | 120,000 |
| **Total Year 1 Platform License** | **540,000** |

*Note: If OCBC Bank's existing license already covers a staging environment, the total remains EUR 420,000 for the two existing environments. The staging environment addition is optional. All prices exclude applicable taxes and VAT. Payment is annual, upfront.*

**Three-Year Platform License Summary:**

| Year | Production | Development | Staging (optional) | Total |
|------|-----------|------------|-------------------|-------|
| Year 1 | 300,000 | 120,000 | 120,000 | 540,000 |
| Year 2 | 300,000 | 120,000 | 120,000 | 540,000 |
| Year 3 | 300,000 | 120,000 | 120,000 | 540,000 |
| **3-Year Total** | **900,000** | **360,000** | **360,000** | **1,620,000** |

*(Without staging: EUR 1,260,000 over 3 years, same as standard two-environment configuration)*

---

## 3. Licensing Model

### 3.1 Continuity Pricing Principle

OCBC Bank's existing DALP deployment is licensed at the standard platform rates. The expanded tokenized wealth products programme does not require purchasing new platform software; it requires expanding the configuration and integration scope of the existing licensed platform. This is how DALP's licensing model is designed to work: the platform license covers the use of the platform across all configured product types, not a per-product or per-asset class license.

This means OCBC Bank does not pay an additional license fee to add fund products, equity-linked products, or structured notes to the existing deployment. The existing production license covers the expanded product scope. The only incremental licensing cost is for additional environments (staging, additional production environments for new legal entities) if required.

### 3.2 Standard License Rates

| Environment | Monthly Equivalent | Annual Fee (Upfront) |
|-------------|------------------|---------------------|
| Production | EUR 25,000/month | EUR 300,000/year |
| Development | EUR 10,000/month | EUR 120,000/year |
| Staging | EUR 10,000/month | EUR 120,000/year |

*All prices exclude applicable taxes and VAT. Annual, upfront payment required.*

### 3.3 Expansion Scenarios

| Scenario | Incremental Annual License Cost (EUR) |
|----------|--------------------------------------|
| Expand existing 2-environment deployment (no new environments) | 0 (included in existing license) |
| Add staging environment for expansion validation | 120,000/year |
| Add second production environment (new legal entity or jurisdiction) | 300,000/year |
| Full Singapore + regional wealth hub deployment (3 production + 2 development) | 900,000 + 240,000 = 1,140,000/year |

For OCBC Bank's initial expanded wealth products scope (Singapore-only, existing legal entity), the incremental environment cost is the optional staging environment at EUR 120,000/year if not already in the existing contract.

---

## 4. Implementation Services Pricing

### 4.1 Expansion Implementation Investment

The 16-week expansion implementation is materially shorter and less costly than a new deployment because:
- Infrastructure provisioning, network setup, and security review are already complete
- Key management and custody configuration are operational
- Core integration patterns with OCBC Bank's systems are established
- Operations and compliance teams are already trained on the platform
- Vendor onboarding and risk assessment are complete

SettleMint estimates the expansion implementation at approximately 40-60 person-weeks of SettleMint effort, compared to 62-90 person-weeks for a new deployment.

### 4.2 Indicative Implementation Investment

| Implementation Scenario | Indicative Range (EUR) |
|------------------------|----------------------|
| Core expansion: FAA compliance configuration + fund/bond product extension + integration extensions | 200,000 - 320,000 |
| Full expansion: Core + Project Guardian interoperability + advanced reporting | 320,000 - 500,000 |

*These are indicative ranges for planning purposes. The formal scoped fee is confirmed during Phase 1 and documented in a Statement of Work. Rates reflect Singapore market pricing.*

### 4.3 Phase Cost Distribution

| Phase | Duration | Indicative Effort | Pricing Model |
|-------|----------|------------------|---------------|
| Phase 1: Scope Confirmation | 2 weeks | 4-6 person-weeks | Fixed milestone |
| Phase 2: Product Configuration | 3 weeks | 8-12 person-weeks | Fixed milestone |
| Phase 3: Integration Extension | 4 weeks | 12-18 person-weeks | T&M with cap |
| Phase 4: Testing and UAT | 3 weeks | 8-12 person-weeks | Fixed milestone |
| Phase 5: Go-Live | 1 week | 4-6 person-weeks | Fixed milestone |
| Phase 6: Hypercare | 3 weeks | 4-6 person-weeks | Fixed milestone |

### 4.4 Optional Scope Items

| Optional Item | Description | Indicative Cost (EUR) |
|--------------|-------------|----------------------|
| Project Guardian Deep Integration | Full cross-network settlement testing and MAS DAIH alignment | 80,000 - 150,000 |
| Advanced FAA Reporting Pack | Custom regulatory reporting templates for FAA compliance evidence | 40,000 - 80,000 |
| Additional Instrument Types | Configuration of instrument types beyond current scope (e.g., derivatives-linked products, insurance-linked securities) | 30,000 - 60,000 per type |
| Investor Portal White-Labeling | Full OCBC brand application to investor-facing interface | 20,000 - 40,000 |

---

## 5. Environment and Infrastructure Costs

### 5.1 Infrastructure Continuity

OCBC Bank's existing infrastructure for the current deployment continues operating. Infrastructure costs for the existing environments remain unchanged. Incremental infrastructure costs for the expanded programme are limited to:

**Capacity increases:** Additional Kubernetes node capacity, database storage, and compute to support increased asset count and transaction volume. These costs are AWS pass-through at actual pricing.

**Staging environment infrastructure:** If the staging environment is added, infrastructure costs for the staging cluster are approximately USD 25,000-40,000/year at AWS Singapore pricing, passed through at cost without markup.

**Project Guardian connectivity:** If Project Guardian requires a new network node, the infrastructure cost for the additional EVM node is approximately USD 5,000-15,000/year depending on network configuration.

### 5.2 Third-Party Pass-Through Costs

| Third-Party | Cost | Arrangement |
|-------------|------|-------------|
| Fireblocks | Extension of existing Fireblocks agreement to new product TAP policies | Direct client agreement with Fireblocks; no SettleMint markup |
| AWS (additional capacity) | Pass-through at cost | OCBC Bank's existing AWS agreement or direct billing |
| NAV providers | Integration with OCBC Bank's existing NAV calculation providers | No additional SettleMint cost; integration work is within implementation scope |
| Project Guardian network membership | If applicable | Direct engagement with MAS/network operator |

---

## 6. Support and Maintenance Fees

### 6.1 Support Scope Extension

OCBC Bank's existing support arrangement covers the current deployment. The expanded wealth products programme is added to the support scope under the same tier or an upgraded tier. No separate support contract is required; the existing contract is amended to reflect the expanded configuration.

### 6.2 Enterprise Support (Recommended)

| Attribute | Enterprise |
|-----------|-----------|
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |
| Named Team | Familiar with OCBC Bank's full deployment |
| Quarterly Architecture Review | Covers expanded wealth product scope |

Enterprise Support annual fee for the expanded programme (inclusive of new product scope): **[CLIENT-SPECIFIC, aligned with existing OCBC Bank support contract terms and expanded scope adjustment]**

*Indicative: Enterprise Support for a multi-product wealth platform with FAA compliance obligations and Project Guardian connectivity is typically EUR 100,000-160,000/year. Actual fee negotiated as an amendment to the existing support arrangement.*

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO Model (Expansion Programme)

| Cost Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|--------------|-------------|-------------|-------------|-------------------|
| Platform License (existing Production + Development) | 420,000 | 420,000 | 420,000 | 1,260,000 |
| Staging License (optional) | 120,000 | 120,000 | 120,000 | 360,000 |
| Expansion Implementation | 200,000-320,000 | - |, | 200,000-320,000 |
| Enterprise Support (extension) | 100,000-160,000 | 100,000-160,000 | 100,000-160,000 | 300,000-480,000 |
| Infrastructure (incremental, AWS) | ~50,000 | ~55,000 | ~60,000 | ~165,000 |
| **3-Year Total Range** | | | | **2,285,000-2,585,000** |

*This represents the total cost of expanding the existing OCBC Bank deployment to the full tokenized wealth products scope. The existing platform license (EUR 420,000/year) is included as it is the continuation cost already committed.*

### 7.2 Incremental Investment vs. Alternative Approaches

The incremental investment for the expanded programme (EUR 200,000-320,000 implementation + staging environment) should be compared against two alternatives:

**Alternative 1: New platform from a competing vendor**
A new vendor would require: full vendor onboarding and risk assessment (6-12 months); new implementation from scratch (EUR 500,000-800,000); security review and penetration testing (new); MAS compliance validation (new, no existing Singapore reference); operations team retraining; parallel operation of two systems during transition. Total incremental cost: EUR 1,500,000-3,000,000+ over 3 years including opportunity cost of delayed product launch.

**Alternative 2: Custom development on existing platform**
Custom development of FAA compliance controls, fund product templates, and wealth management integration on a custom blockchain platform: EUR 600,000-1,200,000 for initial development; EUR 200,000-400,000/year ongoing maintenance; no pre-audited smart contract library; no MAS compliance templates; no operational tooling. 18-24 month development timeline versus 16 weeks for DALP expansion.

**DALP expansion advantage:** The incremental cost of expanding the existing OCBC Bank DALP deployment is materially lower than either alternative because the foundational infrastructure, compliance architecture, regulatory validation, and operational capability are already in place. OCBC Bank is paying for expansion, not replacement.

### 7.3 ROI Indicators for Wealth Products Expansion

**Time to market:** 16-week expansion timeline versus 18-24 months for alternative approaches. For OCBC Bank's wealth product distribution strategy, each quarter of delay represents lost AUM and revenue opportunity. The accelerated timeline is a direct commercial benefit.

**FAA compliance automation:** Automated FAA suitability enforcement through DALP's compliance modules eliminates the manual suitability check process for each transfer. For an institution managing thousands of wealth product investors across multiple product categories, automated suitability enforcement reduces compliance operations cost materially.

**Corporate actions automation:** Automated fund distribution, coupon payments, and maturity redemptions eliminate the manual corporate actions processing that creates operational overhead and error risk in traditional wealth product management. For OCBC Bank's expanding product catalogue, automation scales without proportional staffing increases.

**Project Guardian participation:** OCBC Bank's participation in Project Guardian positions the institution for the next phase of Singapore's digital capital markets development. The DALP platform's ERC-3643 implementation and XvP settlement capability provide the technical foundation for Project Guardian interoperability without additional platform investment.

---

## 8. Payment Terms and Milestones

### 8.1 Platform License

Platform license payments follow the existing OCBC Bank contract terms. The expanded scope (additional product types) does not trigger additional license payments; the existing license covers the expanded configuration. If a staging environment is added, the staging license is invoiced as an amendment to the existing contract, annual and upfront.

### 8.2 Expansion Implementation Milestones

| Milestone | Trigger | Indicative % of Implementation Fee |
|-----------|---------|-------------------------------------|
| Scope Confirmation | Phase 1 deliverables accepted | 20% |
| Configuration Complete | Phase 2 staging environment accepted | 25% |
| Integration Extension Complete | Phase 3 integration tests accepted | 25% |
| UAT Sign-Off | Phase 4 UAT completion | 20% |
| Go-Live + Hypercare Complete | Phase 5+6 completion | 10% |

### 8.3 Support Fee

Existing support fees continue on current payment schedule. Expanded scope support fee (if applicable) is invoiced as an amendment at the next renewal date or immediately for Enterprise tier upgrade.

---

## 9. Commercial Assumptions Register

### 9.1 Material Exclusions

| Exclusion | Description |
|-----------|-------------|
| Existing deployment license | Existing OCBC Bank license fees are not included in this proposal; they continue under the existing contract |
| Third-party custody costs | Fireblocks extension costs are not included; OCBC Bank manages directly with Fireblocks |
| NAV provider costs | OCBC Bank's existing NAV provider relationships are not affected; integration work is within implementation scope |
| Project Guardian network membership | Any MAS or network operator fees for Project Guardian participation are outside SettleMint's scope |
| DBS Bank regulatory filing | Legal, compliance, and regulatory engagement costs for new product classification are outside scope |

### 9.2 Minimum Commitments (Expansion)

| Commitment | Term |
|-----------|------|
| Expansion implementation minimum commitment | Phase 1 scope confirmation (EUR ~40,000-60,000) |
| Platform license continuation | Per existing OCBC Bank contract terms |
| Support scope extension | Annual, aligned with existing contract renewal |

### 9.3 Price Hold

Expansion implementation pricing is valid for 90 days from proposal submission (until 19 June 2026). Platform license rates are per existing OCBC Bank contract terms with the standard annual cap on increases (lower of 5% or EU HICP for the preceding 12 months).

---

## 10. Exit and Transition Terms

### 10.1 Data Portability (Continuity from Existing Arrangement)

Exit and transition terms for the existing OCBC Bank deployment are documented in the current contract. The expanded wealth products programme adds no new constraints on data portability:

- All new wealth product token event logs are exportable via the same API mechanisms as existing product events
- New instrument templates and compliance configurations are exported as structured JSON
- All new FAA suitability claim records and disclosure acknowledgment records are included in the event log export

### 10.2 Intellectual Property

OCBC Bank's custom instrument templates for new wealth product types, FAA-specific compliance configurations, and OCBC-specific integration patterns are owned by OCBC Bank. SettleMint retains ownership of the DALP platform software and standard compliance module library.

### 10.3 Platform Continuity

On-chain data for new wealth product tokens is immutable and accessible from the blockchain network independent of the SettleMint contract. OCBC Bank's existing token contracts and the new wealth product token contracts are all owned and operated under OCBC Bank's governance roles. Contract termination with SettleMint does not affect the on-chain tokens or OCBC Bank's governance authority over them.

---

## 11. Value Justification

### 11.1 The Expansion Premium is Minimal; The Alternative Cost is Substantial

OCBC Bank's existing DALP deployment represents a significant investment in platform infrastructure, regulatory validation, operational capability, and team knowledge. The incremental investment to expand this foundation to the full tokenized wealth products scope is a fraction of the cost of starting over with an alternative platform.

SettleMint's commercial proposal reflects this reality. The expansion implementation investment (EUR 200,000-320,000) is deliberately scoped to be materially lower than a new deployment because the foundation is already built. OCBC Bank is not paying to build a Singapore-compliant tokenized wealth platform from scratch; it is paying to extend one that is already operating.

### 11.2 Operational Continuity Value

OCBC Bank's operations team already knows DALP. OCBC Bank's compliance team has already validated the MAS compliance architecture. OCBC Bank's technology team has already integrated DALP with the core banking, order book, and wallet infrastructure. This organizational knowledge is a real asset that has real commercial value.

Switching to a competing platform would require rebuilding this knowledge from zero: new vendor onboarding (6-12 months under MAS outsourcing guidelines), new operations team training, new compliance team validation of a new architecture, and new technology team integration work. The switching cost is the sum of all the knowledge already invested in the existing deployment, plus the cost of the new implementation.

SettleMint's expanded programme preserves this investment and builds on it. The commercial model reflects this by pricing the expansion at the incremental cost rather than the replacement cost.

### 11.3 FAA Compliance Automation: Operational Leverage

OCBC Bank's existing deployment manages investor eligibility for the current security token engine scope. The expanded programme adds FAA suitability management across a broader investor population and more complex product eligibility rules. Without automation, this would require proportional increases in compliance operations staffing.

DALP's FAA suitability compliance modules, expression builder, and automated enforcement mean that the compliance team configures eligibility rules once and the platform enforces them automatically across all transfers. Adding a new product category with specific suitability requirements takes a compliance officer hours to configure and test, not weeks of manual process design. This operational leverage is the mechanism through which OCBC Bank's expanded wealth products programme can scale without linear cost increases.

### 11.4 Project Guardian Positioning

Singapore's Project Guardian initiative is shaping the future of institutional digital markets in the region. OCBC Bank's participation in Project Guardian positions the institution as an infrastructure-ready participant in the next phase of Singapore's digital capital markets development. DALP's ERC-3643 standard implementation and XvP settlement capability provide this positioning without requiring additional platform investment.

The commercial value of Project Guardian participation is not captured in the cost model above; it is captured in the strategic positioning advantage that OCBC Bank gains by being an early, infrastructure-ready participant in MAS's flagship digital markets initiative.

---

*End of Commercial Proposal: OCBC Bank. Tokenized Wealth Products Platform*

*Document version: 1.0 Draft | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT.*
