# Commercial Proposal: Tokenized Deposits and Trade Finance Liquidity Rails

| Field | Value |
|---|---|
| Proposal title | Commercial Proposal. Tokenized Deposits and Trade Finance Liquidity Rails |
| Client | Emirates NBD |
| Submitted by | SettleMint NV |
| Date | March 2026 |
| Version | v1.0 |
| Confidentiality | Restricted |
| RFP Reference | EMIRATES-NBD-RFP-TOKENIZED-DEPOSITS-TRADE-FINANCE-202603 |

---

## Executive Summary

Emirates NBD requires a platform and delivery partner capable of bringing tokenized deposits and trade finance liquidity rails to production with the discipline, transparency, and governance expected of a core regulated system. This commercial proposal presents SettleMint's licensing, implementation, and support model for the Digital Asset Lifecycle Platform (DALP), structured to provide predictable costs, transparent assumptions, and a clear total cost of ownership across a three-year horizon.

**Commercial recommendation:**

- **License tier:** Enterprise (Tier 2), supporting multiple asset classes, environments, and custody provider integrations
- **Deployment model:** Dedicated cloud, UAE-resident infrastructure (AWS Bahrain or Azure UAE North)
- **Implementation:** 19-week phase-gated delivery with five formal gate reviews
- **Support tier:** Premium, 16×5 coverage (Sunday–Thursday UAE alignment), 2-hour P1 response, dedicated support engineer
- **Estimated three-year TCO:** [CLIENT-SPECIFIC, to be finalized during commercial discussions]

The DALP licensing model is fundamentally different from transaction-based pricing: Emirates NBD pays a predictable annual subscription with no per-transaction, per-token, per-user, or per-asset fees. This means the bank can scale deposit volumes, trade finance counterparties, product range, and investor base without incurring incremental platform costs. Compliance checks, settlement operations, and trade workflow events, which occur at high frequency in production, carry zero marginal licensing cost.

**Decision snapshot:**

| Dimension | Recommendation |
|---|---|
| Client objective | Production-grade tokenized deposits + trade finance rails |
| Recommended model | Enterprise license + dedicated cloud + Premium support |
| Implementation timeline | 19 weeks (first production asset at Week 13) |
| Commercial headline | Predictable subscription; no per-transaction fees; scale without cost anxiety |

---

## Investment Rationale

### Cost of Current Approach

Emirates NBD's current trade finance and deposit infrastructure involves multiple disconnected systems, manual reconciliation processes, multi-day settlement cycles, and custody intermediary costs. The hidden costs include:

| Cost Driver | Current State | Impact |
|---|---|---|
| Settlement delay | T+2 to T+5 for trade finance | Counterparty risk, capital lock-up |
| Manual reconciliation | Core banking ↔ trade finance ↔ treasury | 15–25 person-days per month (estimate) |
| Custody intermediaries | Multiple custody layers for cross-border | Fee accumulation, operational complexity |
| Compliance duplication | Separate compliance checks per system | Audit friction, inconsistent evidence |
| Integration maintenance | Point-to-point integrations | Fragile, expensive to modify |
| Multi-vendor coordination | Separate vendors for different capabilities | SLA gaps, unowned responsibilities |

### Why DALP Changes Economics

DALP collapses multiple lifecycle capabilities into a single governed platform, changing the economic profile:

| Cost Driver | DALP Impact | Mechanism |
|---|---|---|
| Settlement delay | T+0 (atomic, under 3 seconds) | XvP settlement addon |
| Manual reconciliation | Reduced to exception handling | API-driven bidirectional sync |
| Custody intermediaries | Bring-your-own; single integration | Key Guardian + DFNS/Fireblocks |
| Compliance duplication | Single compliance engine for all assets | On-chain, ex-ante enforcement |
| Integration maintenance | Unified API surface (REST, SDK, CLI) | One integration surface, not many |
| Multi-vendor coordination | Single platform vendor | One SLA, one support contact |

### ROI Framework

| Value Driver | Baseline (Current) | DALP-Enabled Impact | Method | Owner |
|---|---|---|---|---|
| Settlement efficiency | T+2 to T+5 | T+0 deterministic | Atomic DvP | Joint |
| Reconciliation cost | 15–25 person-days/month | 3–5 person-days/month | API automation | Emirates NBD |
| Custody cost reduction | Multiple intermediary fees | Single provider fee | BYOC model | Emirates NBD |
| Time-to-market (new products) | 6–12 months per product | 2–4 weeks (configuration) | DALPAsset | SettleMint |
| Compliance audit cost | Manual evidence gathering | Automated extraction | GraphQL + templates | Joint |
| Reference benchmark | Commerzbank: EUR 7M/year savings | Scale-adjusted for Emirates NBD | Proven model | - |

**Assumptions requiring workshop validation:**
- Current reconciliation effort (person-days per month)
- Custody intermediary cost baseline
- Trade finance volume projections
- Deposit product launch timeline

---

## Licensing Model

### Platform Licensing Philosophy

| Principle | What It Means for Emirates NBD |
|---|---|
| No per-transaction fees | Every compliance check, transfer, settlement, and trade event is included |
| No per-token fees | Additional product types carry no incremental license cost |
| No per-user fees | Growing counterparty networks and investor base is a business outcome, not a cost driver |
| Predictable annual subscription | Budget certainty for multi-year planning |
| Full platform capabilities included | All lifecycle pillars, compliance modules, API surface, observability tools |

### What the License Includes

The Enterprise license provides access to:

- All five lifecycle pillars: Issuance, Compliance, Custody Integration, Settlement, and Servicing
- All seven asset classes (bonds, equities, funds, stablecoins, deposits, real estate, precious metals) plus Configurable Token
- All 18 compliance module types, no per-module licensing
- Full API surface: REST API v2, GraphQL, webhooks, TypeScript SDK, CLI (301 commands)
- Addon capabilities: XvP settlement, vault management, token sales, airdrop, yield schedules
- Observability stack: Grafana dashboards, metrics, logs, traces, automated alerting
- Platform updates and security patches during the license term

### Recommended Tier: Enterprise (Tier 2)

| Dimension | Enterprise Configuration for Emirates NBD |
|---|---|
| Environments | Development + UAT/Staging + DR + Production |
| Networks | Permissioned Hyperledger Besu (IBFT 2.0) |
| Custody | DFNS or Fireblocks (decision during Phase 1) |
| Support | Premium tier (16×5, 2-hour P1 response) |
| Asset classes | Tokenized deposits, trade finance instruments, settlement tokens |

**Annual license fee:** [CLIENT-SPECIFIC]

---

## Implementation Pricing

### Pricing Structure

Implementation is priced as a fixed-fee engagement across five delivery phases:

| Phase | Duration | Scope | Pricing Basis |
|---|---|---|---|
| Phase 1: Discovery & Requirements | 2 weeks | Requirements, regulatory mapping, architecture design | Fixed fee |
| Phase 2: Foundation & Setup | 3 weeks | Environment provisioning, network, identity framework | Fixed fee |
| Phase 3: Configuration & Compliance | 4 weeks | Deposit + trade finance config, compliance modules | Fixed fee |
| Phase 4: Integration & Testing | 4 weeks | Core banking, trade finance, SWIFT, security/UAT | Fixed fee |
| Phase 5: Go-Live & Hypercare | 6 weeks | Production deployment, knowledge transfer, hypercare | Fixed fee |
| **Total** | **19 weeks** | | **[CLIENT-SPECIFIC]** |

### Implementation Team

| Role | Allocation | Responsibility |
|---|---|---|
| Delivery Lead | Full-time (19 weeks) | Programme management, gate reviews, stakeholder alignment |
| Solution Architect | Full-time (Weeks 1–13), on-call (14–19) | Architecture design, integration patterns |
| Platform Engineer | Full-time (Weeks 3–17) | Environment setup, configuration, deployment |
| Integration Engineer | Full-time (Weeks 6–13) | Enterprise system integration, API development |
| QA Engineer | Full-time (Weeks 10–15) | Test planning, execution, defect management |

### Client Effort Assumptions

| Activity | Estimated Client Effort | When |
|---|---|---|
| Stakeholder interviews | 20 person-days | Weeks 1–2 |
| Core banking API provisioning | 15 person-days | Weeks 3–9 |
| Trade finance system access | 10 person-days | Weeks 6–9 |
| UAT execution | 20 person-days | Weeks 10–13 |
| Operations readiness | 10 person-days | Weeks 14–19 |
| **Total estimated client effort** | **75 person-days** | |

---

## Support Pricing

### Recommended: Premium Support

| Aspect | Premium Support for Emirates NBD |
|---|---|
| Coverage hours | 16×5 (Sunday–Thursday for UAE alignment) |
| P1 response time | 2 hours |
| P2 response time | 4 hours |
| P3 response time | 1 business day |
| P4 response time | 3 business days |
| Dedicated support engineer | Yes |
| Support channels | Email, portal, dedicated Slack/Teams channel, phone escalation |
| Named contacts | Up to 8 authorized |
| Uptime SLA | 99.95% monthly |
| Platform updates | Monthly release cycle with early access |
| Proactive monitoring | Enhanced with anomaly detection |
| Account management | Monthly business review with technical deep-dive |

**Annual support fee:** [CLIENT-SPECIFIC]

### Support Tier Comparison

| Attribute | Standard | Premium (Recommended) | Enterprise |
|---|---|---|---|
| Coverage | Business hours | 16×5 + P1 on-call | 24/7/365 |
| P1 response | 4 hours | 2 hours | 30 minutes |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Dedicated engineer | No | Yes | Dedicated team |
| Update cycle | Quarterly | Monthly | Continuous |

---

## Total Cost of Ownership

### Three-Year TCO Structure

| Cost Component | Year 1 | Year 2 | Year 3 | Three-Year Total |
|---|---|---|---|---|
| Platform license (Enterprise) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation (one-time) | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Support (Premium) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Infrastructure (cloud) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| **Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

**What is NOT included in the estimate:**
- Emirates NBD internal resource costs (75 person-days estimated)
- Third-party custody provider fees (DFNS or Fireblocks, separate commercial agreement)
- Cloud infrastructure costs beyond SettleMint-managed components
- Legal and regulatory advisory costs
- Any bespoke development beyond platform configuration

### TCO vs. Build Decision

| Dimension | Build Internally | DALP Platform |
|---|---|---|
| Time to production | 12–24 months | 19 weeks |
| Engineering team required | 8–15 FTEs | 0 FTEs (platform managed) |
| Smart contract audit cost | $200K–$500K per asset class | Included (pre-audited) |
| Compliance module development | Custom per regulation | 18 modules included |
| Ongoing maintenance | 4–6 FTEs | Included in support |
| Multi-asset scalability | Rebuild per asset type | Configuration change |

---

## Payment Terms

### Standard Payment Schedule

| Milestone | Payment | Trigger |
|---|---|---|
| Contract signature | 30% of Year 1 total | Executed agreement |
| Gate 2 completion (environments ready) | 20% of Year 1 total | Gate 2 sign-off |
| Gate 4 completion (UAT passed) | 30% of Year 1 total | Gate 4 sign-off |
| Go-live | 20% of Year 1 total | Production deployment |
| Annual renewal | Annual fee | Anniversary date |

### Commercial Assumptions

| Assumption | Detail |
|---|---|
| Currency | USD |
| Payment terms | Net 30 from invoice date |
| Contract term | 3 years (annual renewal thereafter) |
| Price escalation | Fixed for Year 1; CPI-indexed for Years 2–3 (capped at 5%) |
| Early termination | 90-day notice; remaining annual license prorated |

---

## Value Summary

| Value Dimension | Quantified Impact |
|---|---|
| Settlement speed | T+2/T+5 → T+0 (under 3 seconds) |
| Time-to-market | 6–12 months → 19 weeks (first product) |
| Reconciliation effort | 60–80% reduction (estimate) |
| Compliance audit prep | Days → hours (automated extraction) |
| Product expansion cost | Custom development → configuration change |
| Reference benchmark | Commerzbank: EUR 7M/year projected savings |

---

## Detailed Commercial Analysis

### Buy vs. Build Analysis

Emirates NBD faces a fundamental decision: build tokenized deposit and trade finance infrastructure internally, assemble it from multiple point-solution vendors, or adopt a unified platform like DALP. This section provides a structured analysis of each approach.

**Option 1: Internal Build**

Building internally would require Emirates NBD to assemble a team of blockchain engineers, smart contract developers, compliance system designers, and infrastructure operators. Based on comparable institutional projects:

| Cost Component | Estimated Cost (3 Years) | Notes |
|---|---|---|
| Engineering team (8–15 FTEs) | $3.2M – $6.0M | Blockchain + compliance + integration specialists |
| Smart contract development | $800K – $1.5M | Custom development for each asset type |
| Security audits | $400K – $1.0M | $200K–$500K per asset class, annual re-audits |
| Infrastructure setup | $200K – $400K | Cloud, blockchain nodes, monitoring |
| Compliance engine | $500K – $800K | Custom compliance rules, identity integration |
| Ongoing maintenance | $1.2M – $2.4M | 4–6 FTEs for platform operations |
| **Total estimate** | **$6.3M – $12.1M** | Before Emirates NBD internal cost allocation |

**Risks of internal build:**
- 12–24 months to first production deployment (vs. 19 weeks with DALP)
- Single-vendor dependency on Emirates NBD's own team (attrition risk)
- No production reference deployments to validate architecture decisions
- Each new asset class requires a fresh development cycle
- Compliance module updates require re-audit with each regulatory change

**Option 2: Multi-Vendor Assembly**

Assembling capabilities from multiple vendors (one for tokenization, one for compliance, one for custody, one for settlement) introduces coordination complexity:

| Challenge | Impact |
|---|---|
| Vendor coordination | 3–5 vendor relationships to manage, with unclear integration responsibility |
| SLA gaps | No single party accountable for end-to-end operation |
| Integration cost | Custom integration between each vendor pair |
| Compliance consistency | Each vendor's compliance approach may conflict |
| Upgrade synchronization | Updates to one vendor may break integrations with others |
| Audit complexity | Multiple audit trails to correlate |

**Option 3: DALP Platform (Recommended)**

DALP provides all five lifecycle capabilities (issuance, compliance, custody integration, settlement, servicing) in a single governed platform:

| Advantage | Quantified Impact |
|---|---|
| Time to production | 19 weeks (vs. 12–24 months internal) |
| Ongoing engineering | 0 FTEs (vs. 4–6 for internal) |
| New asset class cost | Configuration change (vs. $200K+ development + $200K+ audit) |
| Compliance updates | Module reconfiguration (vs. re-development + re-audit) |
| Single SLA | One vendor, one support contact, one accountability chain |
| Proven track record | 14 production deployments at comparable institutions |

### Licensing Economics Deep Dive

DALP's subscription model eliminates the cost anxiety that comes with transaction-based pricing:

**Scenario analysis: Year 1 operations**

| Volume Metric | Low Estimate | Medium Estimate | High Estimate |
|---|---|---|---|
| Deposit tokens created | 20 | 50 | 200 |
| Daily transfers | 100 | 500 | 2,000 |
| Compliance checks (per transfer) | 5 modules | 5 modules | 5 modules |
| Daily compliance events | 500 | 2,500 | 10,000 |
| Monthly yield distributions | 20 | 50 | 200 |
| Annual trade finance workflows | 100 | 500 | 2,000 |

**Under per-transaction pricing (competitor models):**

| Fee Type | Rate | Low Cost | Medium Cost | High Cost |
|---|---|---|---|---|
| Per-transfer fee | $0.50 | $18,250 | $91,250 | $365,000 |
| Per-compliance check | $0.10 | $18,250 | $91,250 | $365,000 |
| Per-yield distribution | $1.00 | $240 | $600 | $2,400 |
| Per-token creation | $100 | $2,000 | $5,000 | $20,000 |
| **Annual variable cost** | | **$38,740** | **$188,100** | **$752,400** |

**Under DALP subscription pricing:**

| Fee Type | Annual Cost | Low Estimate | Medium Estimate | High Estimate |
|---|---|---|---|---|
| Platform license | [CLIENT-SPECIFIC] | Same | Same | Same |
| Variable fees | $0 | $0 | $0 | $0 |
| **Total** | **Fixed** | **Fixed** | **Fixed** | **Fixed** |

The critical insight: as Emirates NBD's volumes grow (which is the success scenario), transaction-based pricing makes success expensive. DALP's subscription model means Emirates NBD's platform costs remain predictable regardless of volume growth.

### Infrastructure Cost Estimates

| Infrastructure Component | Monthly Cost (Estimate) | Annual Cost |
|---|---|---|
| Kubernetes cluster (3 workers) | $2,500 – $3,500 | $30,000 – $42,000 |
| PostgreSQL (Multi-AZ, production spec) | $1,500 – $2,000 | $18,000 – $24,000 |
| Redis cluster | $500 – $800 | $6,000 – $9,600 |
| Blockchain nodes (4 validators) | $1,200 – $1,800 | $14,400 – $21,600 |
| Object storage | $100 – $300 | $1,200 – $3,600 |
| Load balancer + WAF | $300 – $500 | $3,600 – $6,000 |
| Monitoring (Grafana) | $200 – $400 | $2,400 – $4,800 |
| Network (VPN, data transfer) | $500 – $800 | $6,000 – $9,600 |
| **Total infrastructure** | **$6,800 – $10,100** | **$81,600 – $121,200** |

Infrastructure costs are estimates based on UAE cloud pricing (AWS Bahrain / Azure UAE North) at current rates. Actual costs will be finalized during commercial discussions based on Emirates NBD's specific requirements and existing cloud agreements.

### Contract Structure

**Recommended contract components:**

| Component | Document | Purpose |
|---|---|---|
| Master Services Agreement | MSA | Overarching commercial and legal terms |
| Statement of Work | SOW | Implementation scope, timeline, deliverables |
| License Agreement | LA | Platform licensing terms, usage rights |
| Support Agreement | SA | Support tier, SLAs, escalation procedures |
| Data Processing Agreement | DPA | Data handling, residency, privacy compliance |
| Security Addendum | - | Security obligations, incident notification |

**Key commercial terms:**

| Term | Proposed Position |
|---|---|
| Contract duration | 3 years initial, annual renewal thereafter |
| Price lock | Year 1 fixed; Years 2–3 CPI-indexed (capped at 5% annual increase) |
| Payment currency | USD |
| Payment terms | Net 30 from invoice date |
| Early termination | 90-day written notice; remaining annual license prorated |
| IP ownership | Emirates NBD owns all configuration, data, and integrations built on the platform |
| Platform IP | SettleMint retains ownership of the DALP platform and smart contracts |
| Exit assistance | 90-day transition support period included if Emirates NBD terminates |
| Liability cap | Annual license fee amount (negotiable) |

### Operational Cost Comparison (3-Year View)

| Cost Category | Internal Build | Multi-Vendor | DALP Platform |
|---|---|---|---|
| Engineering / development | $3.2M – $6.0M | $1.5M – $3.0M | $0 |
| Platform / license fees | $0 | $600K – $1.2M | [CLIENT-SPECIFIC] |
| Infrastructure | $300K – $600K | $300K – $600K | $245K – $364K |
| Ongoing maintenance | $1.2M – $2.4M | $800K – $1.5M | [Included in support] |
| Support | $0 (internal) | $200K – $400K | [CLIENT-SPECIFIC] |
| Security audits | $400K – $1.0M | $200K – $500K | [Included] |
| Integration | $300K – $500K | $500K – $800K | [Included in implementation] |
| **3-Year Total** | **$5.4M – $10.5M** | **$4.1M – $8.0M** | **[CLIENT-SPECIFIC]** |
| Time to production | 12–24 months | 9–18 months | 19 weeks |
| Operational risk | High | High | Low (proven) |

### Value Realization Timeline

| Milestone | Timeline | Value Delivered |
|---|---|---|
| Contract signature | Month 0 | Programme initiated |
| Gate 2 (environments ready) | Month 1.5 | Technical foundation validated |
| Gate 3 (products configured) | Month 2.5 | Deposit and trade finance products ready for testing |
| Gate 4 (UAT complete) | Month 3.5 | End-to-end functionality validated |
| Go-live | Month 4 | First production transactions |
| Hypercare complete | Month 5 | Operational handover complete |
| First yield distribution | Month 5–6 | Automated interest processing |
| First trade finance settlement | Month 5–6 | Trade finance workflow in production |
| Quarterly review | Month 8 | Optimization recommendations |
| Additional product launch | Month 9–12 | New deposit type via configuration |
| Year 1 review | Month 12 | ROI assessment and Year 2 planning |

## Next Steps

| Step | Timeline | Owner |
|---|---|---|
| Commercial clarification meeting | Within 2 weeks of submission | Joint |
| Pricing finalization workshop | Week 3 | Joint |
| Reference call with existing client | Upon request | SettleMint |
| Contract negotiation | Weeks 4–6 | Joint (legal teams) |
| Statement of Work finalization | Week 6 | Joint |
| Kickoff | Week 8 (target) | Joint |
