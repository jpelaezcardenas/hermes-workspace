# Commercial Proposal: Tokenized Payment Infrastructure For Wallet And Merchant Ecosystems

**Prepared for:** OPay (Nigeria)
**Prepared by:** SettleMint NV
**Date:** March 2026
**Version:** v1.0
**Reference:** OPAY-RFP-TOKENIZED-PAYMENT-INFRASTRUCTURE-202603
**Classification:** Strictly Confidential

---

## Table of Contents

- Executive Summary
- Investment Rationale
- Pricing Structure
- Implementation Cost Schedule
- Support and SLA Costs
- Three-Year TCO Analysis
- ROI Framework
- Payment Terms
- Commercial Terms and SLAs

---

# Executive Summary

## Commercial Context

OPay's settlement infrastructure processes millions of daily payment transactions across wallet operations, merchant acquiring, and banking partner relationships. The current settlement architecture relies on batch reconciliation processes that generate operational cost through manual exception handling, settlement float, and multi-system investigation when breaks occur. These costs scale with transaction volume and partner count, creating a structural efficiency constraint as OPay's business grows.

This commercial proposal presents the investment required to deploy DALP as a tokenized settlement infrastructure layer beneath OPay's existing payment operations. The deployment follows a three-phase approach: internal treasury settlement (Phase 1), merchant settlement network (Phase 2), and partner bank connectivity (Phase 3), spanning 36 weeks from mobilisation to full production.

## Recommended Commercial Model

SettleMint recommends a platform licensing model combined with phased implementation services and Enterprise-tier support. This structure provides:

- **Predictable annual costs.** DALP is licensed as a platform, not billed per transaction. Settlement volume growth does not trigger incremental licensing charges. This is critical for a payment infrastructure provider where transaction volumes scale rapidly.
- **Phased implementation investment.** Implementation fees are structured by phase, allowing OPay to validate value delivery at each stage before committing to subsequent phases.
- **Production-grade support.** Enterprise support with 24/7 coverage and 15-minute P1 response times, appropriate for nationally significant payment infrastructure.

## Headline TCO

The three-year total cost of ownership for the recommended deployment is between $1,296,000 and $2,040,000, depending on tier selection, deployment model, and support level. This range reflects the difference between a Foundation-tier deployment for Phase 1 treasury settlement and an Enterprise-tier deployment supporting all three phases at full scale.

| Component | Three-Year Range |
|---|---|
| Platform license | $540,000 to $840,000 |
| Implementation (Phases 1 to 3) | $320,000 to $480,000 |
| Annual support | $216,000 to $360,000 |
| Infrastructure (OPay-managed) | $220,000 to $360,000 |
| **Total** | **$1,296,000 to $2,040,000** |

Infrastructure costs are estimated for OPay's budgeting purposes. Actual infrastructure costs depend on OPay's deployment model choice (self-hosted vs. dedicated cloud) and existing infrastructure capacity.

---

# Investment Rationale

## Cost of the Current Approach

OPay's current settlement operations incur costs that are partially visible in operational budgets and partially hidden in process inefficiency:

**Visible costs.** Manual reconciliation effort across banking partners (estimated at 15 to 25 full-time equivalent staff hours per day for a platform of OPay's scale), exception investigation and resolution (average 2 to 4 hours per break across multiple systems), and audit preparation costs (quarterly audit evidence compilation from distributed systems).

**Hidden costs.** Settlement float (the cost of capital tied up during batch settlement cycles, typically 24 to 48 hours for banking partner settlement), opportunity cost of delayed merchant settlement (merchants waiting for periodic settlement cycles rather than receiving near-real-time funding), and regulatory risk exposure (the cost of incomplete evidence trails when CBN requests settlement records that span multiple systems).

**Scaling costs.** Every new banking partner adds a bilateral reconciliation point. Every increase in merchant network size multiplies settlement volume without reducing per-transaction reconciliation effort. The current architecture's cost scales linearly or worse with business growth.

## Why DALP Changes the Economics

DALP's platform model changes the cost structure in three ways:

**Reconciliation automation.** Atomic settlement with on-chain evidence eliminates the manual matching that drives current reconciliation costs. Settlement records are authoritative from the moment of execution, not reconstructed after the fact from distributed system logs.

**Settlement cycle compression.** Atomic settlement replaces batch processing. Treasury positions settle in seconds rather than hours or days. Merchant funding can shift from periodic batch settlement to near-real-time settlement as operations mature. The capital freed from settlement float represents a direct financial benefit.

**Marginal cost reduction.** The platform licensing model means that adding new banking partners, expanding the merchant network, or increasing settlement volumes does not increase DALP licensing costs. The marginal cost of the next million settlements is infrastructure compute, not software fees.

---

# Pricing Structure

## Platform License

DALP platform licensing is structured into tiers based on deployment complexity and institutional requirements, not transaction volume.

| Component | Foundation Tier | Enterprise Tier |
|---|---|---|
| **Annual platform license** | **$180,000/year** | **$280,000/year** |
| Production environments | 1 | Multiple (production + DR) |
| Non-production environments | 1 (dev/staging) | 3 (dev, test/staging, UAT) |
| Blockchain network | Single permissioned Besu | Multi-network (production + DR) |
| Custody integration | Key Guardian (local) | Key Guardian + external HSM integration |
| Asset types | All (no per-type fees) | All (no per-type fees) |
| Compliance modules | All 12 module types | All 12 module types |
| API access | Full API surface | Full API surface + dedicated rate limits |
| SDK and CLI | Included | Included |
| Platform updates | Included | Included + priority access to new releases |

**Inclusions (both tiers):**
- All seven asset class factories
- All 12 compliance module types
- XvP Settlement, Vault, and all addon capabilities
- Full observability stack (Grafana, Prometheus, alerting)
- TypeScript SDK and CLI access
- OpenAPI 3.1 specifications and documentation

**Exclusions:**
- Infrastructure costs (compute, storage, network; OPay-managed)
- Implementation services (priced separately below)
- Support services (priced separately below)
- Custom smart contract development (if required; quoted separately)
- Third-party custody provider fees (Fireblocks, DFNS; contracted directly)

**Recommendation for OPay:** Enterprise Tier ($280,000/year) to support the full multi-environment topology (dev, test, UAT, DR, production) and multi-network configuration required for payment infrastructure of this criticality.

## Implementation Fee

Implementation services are structured by phase, allowing OPay to validate each phase before committing to the next.

| Phase | Scope | Duration | Fee Range |
|---|---|---|---|
| Phase 1: Internal Treasury Settlement | WS-01 through WS-05 for treasury operations | 12 weeks | $120,000 to $180,000 |
| Phase 2: Merchant Settlement Network | WS-02 through WS-05 for merchant operations | 12 weeks | $110,000 to $160,000 |
| Phase 3: Partner Bank Connectivity | WS-02 through WS-05 for bank reconciliation | 12 weeks | $90,000 to $140,000 |
| **Total Implementation** | **All three phases** | **36 weeks** | **$320,000 to $480,000** |

Implementation fees include: SettleMint delivery team (solution architect, integration engineer, project manager), configuration and deployment, integration support, testing support, training and knowledge transfer, documentation and runbook development.

Implementation fees exclude: OPay's internal team effort (estimated at 2 to 3 FTEs across all phases), infrastructure provisioning (OPay-managed), third-party system changes required for integration, and regulatory engagement (OPay-led with SettleMint technical support).

## Annual Support

| Support Tier | Coverage | P1 Response | Annual Fee |
|---|---|---|---|
| Standard | Business hours (CET) | 4 hours | $72,000/year |
| Premium | Extended (06:00 to 22:00 CET) | 1 hour | $96,000/year |
| Enterprise | 24/7/365 | 15 minutes | $120,000/year |

**Recommendation for OPay:** Enterprise support ($120,000/year) with 24/7/365 coverage and 15-minute P1 response. For nationally significant payment infrastructure, business-hours-only support creates unacceptable risk exposure during off-hours settlement processing.

---

# Implementation Cost Schedule

## By Phase and Workstream

| Workstream | Phase 1 | Phase 2 | Phase 3 | Total |
|---|---|---|---|---|
| WS-01: Mobilisation and Governance | $25,000 to $35,000 | Included in Phase 1 | Included in Phase 1 | $25,000 to $35,000 |
| WS-02: Business and Product Configuration | $30,000 to $45,000 | $35,000 to $50,000 | $25,000 to $35,000 | $90,000 to $130,000 |
| WS-03: Integration and Controls | $35,000 to $55,000 | $40,000 to $55,000 | $35,000 to $55,000 | $110,000 to $165,000 |
| WS-04: Testing and Readiness | $20,000 to $30,000 | $25,000 to $35,000 | $20,000 to $35,000 | $65,000 to $100,000 |
| WS-05: Operational Transition | $10,000 to $15,000 | $10,000 to $20,000 | $10,000 to $15,000 | $30,000 to $50,000 |
| **Phase Total** | **$120,000 to $180,000** | **$110,000 to $160,000** | **$90,000 to $140,000** | **$320,000 to $480,000** |

Fee ranges reflect scope variability based on integration complexity, number of banking partners in Phase 1, merchant cohort size in Phase 2, and partner bank API readiness in Phase 3. Exact fees are confirmed during the Phase 1 discovery process and documented in the statement of work for each subsequent phase.

## SettleMint Delivery Team Composition

| Role | Allocation | Phases |
|---|---|---|
| Solution Architect | Full-time during active configuration; part-time during testing | All phases |
| Integration Engineer | Full-time during integration sprints | All phases |
| Project Manager | Part-time across all phases | All phases |
| Blockchain Engineer | As-needed for network configuration and optimization | Phase 1 setup |
| Quality Assurance Engineer | Full-time during testing phases | All phases |

---

# Support and SLA Costs

## Enterprise Support Package (Recommended)

The Enterprise support package at $120,000/year includes:

- **24/7/365 coverage** with 15-minute P1 response time
- **Two named support engineers** familiar with OPay's deployment configuration
- **Quarterly business reviews** covering platform health, usage patterns, and optimization recommendations
- **Annual architecture review** assessing deployment topology, performance, and upgrade readiness
- **White-glove platform upgrade support** for coordinated upgrades with zero-downtime deployment
- **Priority escalation path** to SettleMint engineering for P1/P2 incidents
- **Monthly operational reports** covering availability metrics, incident summaries, and SLA compliance

## SLA Financial Commitments

| Metric | Target | Service Credit |
|---|---|---|
| Platform availability | 99.9% monthly | 10% of monthly support fee for each 0.1% below target |
| P1 response time | 15 minutes | 5% of monthly support fee per breach (capped at 25%) |
| Planned maintenance | Max 4 hours/month | Excess maintenance credited against next month |

Service credits are the exclusive remedy for SLA breaches. Credits are calculated monthly and applied to the following quarter's invoice.

---

# Three-Year TCO Analysis

## Foundation Tier Deployment

| Cost Category | Year 1 | Year 2 | Year 3 | Three-Year Total |
|---|---|---|---|---|
| Platform license | $180,000 | $180,000 | $180,000 | $540,000 |
| Implementation (Phase 1) | $150,000 | $0 | $0 | $150,000 |
| Implementation (Phases 2 and 3) | $0 | $170,000 | $0 | $170,000 |
| Support (Standard) | $72,000 | $72,000 | $72,000 | $216,000 |
| Infrastructure (estimated) | $75,000 | $75,000 | $75,000 | $225,000 |
| **Annual Total** | **$477,000** | **$497,000** | **$327,000** | **$1,301,000** |

## Enterprise Tier Deployment (Recommended)

| Cost Category | Year 1 | Year 2 | Year 3 | Three-Year Total |
|---|---|---|---|---|
| Platform license | $280,000 | $280,000 | $280,000 | $840,000 |
| Implementation (Phase 1) | $180,000 | $0 | $0 | $180,000 |
| Implementation (Phases 2 and 3) | $0 | $300,000 | $0 | $300,000 |
| Support (Enterprise) | $120,000 | $120,000 | $120,000 | $360,000 |
| Infrastructure (estimated) | $120,000 | $120,000 | $120,000 | $360,000 |
| **Annual Total** | **$700,000** | **$820,000** | **$520,000** | **$2,040,000** |

**Notes:**
- Year 1 includes Phase 1 implementation. Year 2 includes Phases 2 and 3 implementation. Year 3 is platform operation and support only.
- Infrastructure estimates assume a Kubernetes-based deployment in Nigeria with 3 Besu validator nodes, PostgreSQL database, and observability stack. Actual costs depend on OPay's infrastructure choices.
- License fees are subject to annual CPI adjustment capped at 5%.
- Implementation fees for Phases 2 and 3 are confirmed during Phase 1 discovery and documented in separate statements of work.

---

# ROI Framework

## Efficiency Gains

| Efficiency Area | Current State | Target State (Year 2) | Estimated Annual Saving |
|---|---|---|---|
| Reconciliation staff effort | 15 to 25 FTE-hours/day manual matching | 2 to 4 FTE-hours/day exception handling only | $150,000 to $300,000 |
| Exception investigation | 2 to 4 hours per break (multi-system) | 15 to 30 minutes per break (single audit trail) | $80,000 to $150,000 |
| Audit preparation | 3 to 5 weeks per quarterly audit cycle | 2 to 3 days (automated evidence extraction) | $60,000 to $100,000 |

## Settlement Cost Reduction

| Settlement Area | Current Cost Driver | DALP Impact | Estimated Annual Saving |
|---|---|---|---|
| Settlement float (treasury) | 24 to 48 hour batch settlement cycles | Near-real-time atomic settlement | $200,000 to $500,000 (capital cost) |
| Merchant settlement timing | Periodic batch funding cycles | Configurable settlement windows (intraday possible) | $100,000 to $250,000 (merchant retention value) |
| Failed settlement correction | Manual multi-system correction | Atomic settlement (no partial failures) | $50,000 to $100,000 |

## Audit Cost Savings

| Audit Area | Current Cost | Target Cost | Estimated Annual Saving |
|---|---|---|---|
| External audit (settlement evidence) | $150,000 to $200,000/year | $80,000 to $120,000/year | $70,000 to $80,000 |
| Regulatory reporting preparation | $100,000 to $150,000/year | $30,000 to $50,000/year | $70,000 to $100,000 |

## Total Estimated Annual ROI (Year 2 onwards)

| Category | Conservative | Optimistic |
|---|---|---|
| Efficiency gains | $290,000 | $550,000 |
| Settlement cost reduction | $350,000 | $850,000 |
| Audit cost savings | $140,000 | $180,000 |
| **Total annual benefit** | **$780,000** | **$1,580,000** |
| Annual platform cost (Enterprise) | $520,000 | $520,000 |
| **Net annual benefit** | **$260,000** | **$1,060,000** |

At the conservative estimate, the platform investment achieves positive ROI within Year 2 of operation. At the optimistic estimate, the annual return exceeds the total annual platform cost by more than two times.

---

# Payment Terms

## Milestone-Based Structure

Payment is structured on a milestone basis with 30% upfront commitment and 70% tied to delivery gates:

| Milestone | Timing | Percentage | Amount (Enterprise) |
|---|---|---|---|
| Contract signature | Contract execution | 30% of Year 1 | $210,000 |
| Phase 1 deployment complete | End of Week 12 | 25% of implementation | $45,000 |
| Phase 1 go-live acceptance | 2 weeks post go-live | 15% of implementation | $27,000 |
| Phase 2 deployment complete | End of Week 24 | 15% of implementation | $45,000 |
| Phase 3 go-live acceptance | End of Week 36 | 15% of implementation | $63,000 |

## Invoicing Schedule

- **Platform license:** Invoiced annually in advance. First year invoiced at contract signature.
- **Implementation fees:** Invoiced at milestone achievement, payable within 30 days.
- **Support fees:** Invoiced quarterly in advance, starting from Phase 1 go-live.
- **Currency:** All pricing in USD. Invoices payable in USD or equivalent NGN at the CBN official rate on the invoice date.

## Phase Gate Conditions

Each phase milestone is subject to defined acceptance criteria documented in the statement of work. Acceptance is granted when:

1. All deliverables specified in the milestone are submitted
2. Functional testing confirms settlement operations execute correctly
3. Security testing confirms no critical or high-severity vulnerabilities
4. Operational documentation (runbooks, integration specifications) is delivered
5. OPay's project team signs the milestone acceptance certificate

If acceptance is withheld due to SettleMint's failure to meet documented acceptance criteria, SettleMint shall remediate at no additional cost within an agreed rectification period.

---

# Commercial Terms and SLAs

## Key Contractual Positions

| Area | Position |
|---|---|
| Contract term | 3 years initial term with annual renewal thereafter |
| Termination for convenience | 6 months written notice after initial term |
| Termination for cause | 30 days cure period for material breach |
| IP ownership | OPay owns all configuration, data, and integration artifacts. SettleMint retains ownership of the DALP platform and underlying IP. |
| Data ownership | OPay owns all data processed by the platform. SettleMint has no rights to OPay's data beyond platform operation. |
| Data portability | SettleMint provides data export in standard formats (JSON, CSV) upon contract termination. Export includes all settlement records, configuration, and audit logs. |
| Exit support | 6-month transition assistance period included in the contract, covering data migration support, knowledge transfer, and parallel operation during transition to a successor platform. |
| Liability cap | 12 months of fees paid under the contract |
| Insurance | SettleMint maintains professional indemnity and cyber liability insurance |
| Audit rights | OPay has the right to audit SettleMint's security controls, data handling, and service delivery, subject to reasonable notice and scope agreement |
| Subcontracting | SettleMint will not subcontract material delivery obligations without OPay's prior written consent |
| Change control | Scope changes managed through a formal change request process with impact assessment, pricing, and OPay approval before execution |
| Dispute resolution | Escalation to senior management, then mediation, then arbitration under ICC rules |

## SLA Summary

| Metric | Commitment |
|---|---|
| Platform availability | 99.9% monthly |
| P1 incident response | 15 minutes (Enterprise) |
| P1 incident resolution | 4 hours |
| P2 incident response | 1 hour (Enterprise) |
| P2 incident resolution | 8 hours |
| Planned maintenance | Maximum 4 hours/month, 72-hour advance notice |
| Platform upgrade support | Coordinated with zero-downtime deployment target |
| Data export on termination | Within 30 days of termination notice |

## Financial Stability

SettleMint NV is a privately held company headquartered in Leuven, Belgium. The company has been operational since 2016 and serves regulated financial institutions across Europe, the Middle East, Africa, and Asia-Pacific. SettleMint maintains:

- Sufficient capitalization to support multi-year delivery commitments
- No material litigation or regulatory actions that would affect delivery capability
- Professional indemnity insurance and cyber liability coverage
- A diversified client base across multiple geographies and financial sectors
- No single-vendor dependency for core platform delivery (all critical components are developed and maintained in-house)

SettleMint can provide additional financial stability documentation (recent audited accounts, funding history, insurance certificates) under NDA during the due diligence process.
