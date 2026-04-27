# Commercial Proposal
# Digital Bond Platform For Wholesale And Treasury Issuance
## FirstRand
## Submission Date: 15 March 2026
## Version: 1.0
## Confidentiality: SettleMint Confidential

---

# Commercial Executive Summary
This commercial proposal is structured around one premise: FirstRand needs predictable platform economics, controlled implementation scope, and a support model that matches regulated operations. DALP is licensed as a platform rather than a per-transaction toll gate. That means growth in issuance volume, investor participation, or settlement activity does not automatically create punitive licensing surprises.

# Commercial Assumptions
- Pricing remains subject to final commercial validation and contracting.
- Implementation scope is based on the RFP for digital bond platform for wholesale and treasury issuance and the delivery workstreams described in the technical proposal.
- Third-party infrastructure, custody-provider fees, cloud consumption, and partner tooling are treated separately from DALP platform licensing unless explicitly bundled.
- Any item that requires bespoke build rather than platform configuration or standard integration should be identified and governed separately.

# Licensing Model
# Section 7: Commercial Proposal

## Executive Summary

This section presents SettleMint's commercial framework for the Digital Asset Lifecycle Platform (DALP). The complexity of doing tokenization right at production scale, identity frameworks, compliance controls, governance, auditability, multi-asset lifecycle support, is precisely what DALP's commercial model is designed to address. Our licensing model is designed for regulated institutions that need predictable, transparent pricing aligned with the operational realities of digital asset programs, not per-transaction toll gates that penalize growth.

DALP is licensed as a platform, not billed per transaction or per token operation. This means institutions can scale issuance volume, transaction throughput, and asset classes without incurring incremental licensing costs for each operation. The model supports cloud-managed, on-premises, and hybrid deployments with tiered support packages matched to institutional requirements.

All pricing figures in this section are marked **[CLIENT-SPECIFIC]** and will be tailored during commercial discussions based on deployment scope, asset classes, integration requirements, and support level.

---

## 7.1 Licensing Model Overview

### 7.1.1 Platform Licensing Philosophy

DALP uses a **platform licensing model**: not a per-transaction or per-asset fee structure. This distinction is fundamental to how SettleMint serves regulated institutions:

- **No per-transaction fees**: Institutions are not charged per mint, transfer, settlement, or compliance check. This removes the perverse incentive to minimize platform usage and allows teams to iterate, test, and scale without cost anxiety.
- **No per-token fees**: Creating additional asset types, bonds, deposits, equities, stablecoins, real estate tokens, does not incur incremental licensing costs.
- **No per-user fees for end-investors**: The licensing model does not impose costs per onboarded investor or participant. Investor growth is a business outcome, not a cost driver.
- **Predictable annual costs**: Licensing is structured as an annual subscription, giving institutions budget predictability and avoiding the variable-cost surprises common in transaction-based pricing models.

This approach reflects SettleMint's belief that platform adoption should accelerate usage, not constrain it. Regulated institutions need to run compliance checks on every transfer, issue claims against every identity, and settle every transaction atomically, charging per operation would work against the platform's own design principles.

### 7.1.2 What the License Includes

A DALP platform license provides access to:

- **Full platform capabilities**: All five core lifecycle pillars. Issuance, Compliance, Custody integration, Settlement, and Servicing, plus the three platform foundations (Identity & Access Management, Integration & Interoperability, Observability & Operations).
- **All seven asset classes**: Bonds, equities, funds, stablecoins, deposits, real estate, and precious metals, plus the Configurable Token for custom asset types.
- **All 18 compliance module types**: From country restrictions and investor accreditation to supply limits, holding periods, and collateral backing, without per-module licensing.
- **Full API surface**: REST API (v2), oRPC, GraphQL (via subgraph), event webhooks, SDK (@settlemint/dalp-sdk), and CLI (301 commands across 26 command groups).
- **Addon capabilities**: Vault management, XvP/DvP settlement, token sales/primary offerings, airdrop distribution, fixed yield schedules, and data feeds.
- **Observability stack**: Pre-built Grafana dashboards, three-pillar observability (metrics via VictoriaMetrics, logs via Loki, traces via Tempo), and automated alerting.
- **Platform updates**: Access to all platform releases, security patches, and new capabilities during the license term.

### 7.1.3 What Varies by Engagement

While the platform license is comprehensive, several dimensions are scoped per engagement:

| Dimension | How It's Scoped |
|---|---|
| Deployment model | Cloud-managed, on-premises (Helm/Kubernetes), or hybrid |
| Environment count | Number of environments (development, staging, production) |
| Network configuration | Public EVM, private/permissioned EVM, or multi-network |
| Custody integration | Local key management, Fireblocks, DFNS, or multi-provider |
| Support tier | Standard, Premium, or Enterprise (see Section 7.4) |
| Implementation services | Discovery, deployment, integration, training (see Section 7.3) |

---

## 7.2 Tier Structure

### 7.2.1 Platform Tiers

DALP licensing is structured into tiers based on deployment complexity and institutional requirements, not usage volume. Each tier includes the full platform capability set.

#### Tier 1: Foundation

**Designed for**: Institutions launching their first production digital asset program with a focused use case.

- Single production environment + one non-production environment (staging/development)
- Single EVM network (public or private)
- Single custody provider integration (local Key Guardian or one external provider)
- Standard support package
- Up to [CLIENT-SPECIFIC] concurrent asset types in production
- Standard observability stack

**Typical use case**: A bank launching a tokenized bond program, or a market infrastructure provider piloting tokenized deposits.

**Annual license fee**: [CLIENT-SPECIFIC]

#### Tier 2: Enterprise

**Designed for**: Institutions scaling across multiple asset classes, jurisdictions, or business lines with enterprise-grade requirements.

- Multiple environments (development, staging, UAT, production)
- Multi-network support (public + private EVM networks)
- Multi-custody provider integration (Fireblocks + DFNS, or DFNS + local)
- Premium support package
- Unlimited asset types in production
- Enhanced observability with custom dashboard configuration
- Dedicated integration support during initial onboarding
- Priority access to new platform capabilities

**Typical use case**: A tier-1 bank operating bonds, deposits, and stablecoins across multiple jurisdictions, or a CSD enabling tokenized instruments for multiple issuers.

**Annual license fee**: [CLIENT-SPECIFIC]

#### Tier 3: Sovereign / Strategic

**Designed for**: National-scale programs, sovereign entities, or strategic deployments requiring maximum operational control and dedicated engagement.

- Unlimited environments with full isolation
- Multi-network, multi-region deployment
- Full custody provider flexibility with custom integration support
- Enterprise support with dedicated SRE engagement
- Custom compliance module development support
- Dedicated solution architect
- Custom SLA terms
- Early access to roadmap features
- Strategic advisory engagement

**Typical use case**: A national real estate tokenization program, a central bank digital asset initiative, or a global financial institution deploying DALP as core infrastructure across regions.

**Annual license fee**: [CLIENT-SPECIFIC]

### 7.2.2 Tier Comparison

| Capability | Foundation | Enterprise | Sovereign/Strategic |
|---|---|---|---|
| Core lifecycle pillars | All 5 | All 5 | All 5 |
| Asset classes | All 7 + Configurable | All 7 + Configurable | All 7 + Configurable |
| Compliance modules | All 18 types | All 18 types | All 18 types + custom |
| Production environments | 1 | Multiple | Unlimited |
| Non-production environments | 1 | Multiple | Unlimited |
| Network support | Single | Multi-network | Multi-network, multi-region |
| Custody integration | 1 provider | Multi-provider | Full flexibility + custom |
| API access | Full | Full | Full + priority features |
| Observability | Standard | Enhanced | Custom + dedicated |
| Support tier | Standard | Premium | Enterprise |
| Solution architect | Shared | Dedicated onboarding | Dedicated ongoing |
| Custom SLA | Standard SLA | Negotiated SLA | Fully custom |

---

## 7.3 Implementation Pricing Framework

### 7.3.1 Implementation Phases

DALP implementations follow a structured delivery methodology designed to minimize risk and accelerate time-to-production. Implementation services are priced separately from the annual platform license.

#### Phase 1: Discovery & Architecture (2–4 weeks)

**Objective**: Align DALP deployment to institutional requirements, existing infrastructure, and regulatory context.

**Activities**:
- Use case definition and asset class selection
- Integration landscape mapping (core banking, custody providers, payment rails, identity providers)
- Compliance requirements analysis and jurisdictional template selection
- Network architecture design (public/private EVM, multi-chain strategy)
- Deployment model selection (cloud-managed, on-premises Helm/Kubernetes, hybrid)
- Security architecture review and alignment with institutional security policies
- Project plan and milestone definition

**Deliverables**:
- Solution architecture document
- Integration specification
- Deployment architecture and infrastructure requirements
- Project plan with milestones and resource allocation

**Typical investment**: [CLIENT-SPECIFIC]

#### Phase 2: Platform Deployment & Configuration (4–8 weeks)

**Objective**: Deploy DALP infrastructure and configure the platform for the target use case.

**Activities**:
- Infrastructure provisioning (Kubernetes cluster, database, blockchain nodes, observability stack)
- DALP platform deployment using Helm charts
- Network configuration and genesis setup (for private networks)
- Custody provider integration and key management configuration
- Compliance module configuration and policy template deployment
- Asset type template configuration
- Identity and access management setup (roles, organizations, invitation flows)
- Observability dashboard configuration and alerting rules
- Non-production environment deployment for testing

**Deliverables**:
- Deployed and configured DALP platform across target environments
- Configured compliance

# Recommended Commercial Structure for FirstRand
## Platform scope
We recommend an enterprise platform structure covering production and non-production environments, full API and SDK access, core lifecycle capabilities, compliance modules, and operational observability. For a bank evaluating digital bond platform for wholesale and treasury issuance, this avoids false economies where a narrow pilot price is later undermined by upgrade friction.

## Suggested package
| Component | Recommended treatment | Comment |
|---|---|---|
| Production platform licence | Enterprise tier | supports regulated live use and controlled scaling |
| Non-production environments | included as scoped environments | required for release discipline and UAT |
| Implementation services | fixed-scope phased delivery with change control | reduces commercial ambiguity |
| Support | Premium or Enterprise | depends on operating hours and approval intensity |
| Custody integration enablement | included in implementation scope | provider fees separate |
| Reporting and observability setup | included in implementation scope | aligns operations and audit requirements |

# Implementation Cost Framework
## Work packages
| Work package | Duration | Cost treatment |
|---|---|---|
| Discovery and architecture | 2-4 weeks | fixed fee |
| Platform deployment and configuration | 4-8 weeks | fixed fee subject to assumptions |
| Integration and testing | 4-8 weeks | fixed fee with agreed integration perimeter |
| Go-live and hypercare | 2-4 weeks | fixed fee |
| Optional expansion wave | post go-live | separate option |

## Cost drivers specific to this RFP
The main commercial drivers are expected to be integration perimeter, deployment model, custody approval model, number of environments, reporting obligations, and the amount of client-side governance and testing effort required to reach production acceptance. The bank should expect the delivery cost curve to move more with complexity and stakeholder coordination than with raw transaction volume.

# Support and Service Model
# Section 7: Support, SLA, and Training

## Support Model Overview

SettleMint provides structured, tiered support for all DALP production deployments. The support framework is built for regulated institutions where uptime, compliance enforcement, and operational continuity are non-negotiable. Support is delivered by engineers with deep expertise in DALP's architecture, blockchain infrastructure, compliance modules, and integration patterns. Every support interaction is logged, tracked, and auditable.

---

## Support Tiers

### Standard Support

Designed for initial production deployments and lower-criticality environments where the client maintains internal operational capability and uses SettleMint as a second-line escalation resource.

| Attribute | Detail |
|---|---|
| **Coverage Hours** | Business hours (09:00--18:00 CET, Monday--Friday, excluding public holidays) |
| **Support Channels** | Email, support portal |
| **Named Contacts** | Up to 3 authorized support contacts |
| **Uptime SLA** | 99.9% monthly (managed infrastructure) |
| **Incident Management** | SettleMint-managed ticketing with SLA tracking |
| **Platform Updates** | Quarterly release cycle with release notes and migration guides |
| **Proactive Monitoring** | Platform health monitoring with alerting on critical thresholds |
| **Account Management** | Quarterly business review |

### Premium Support

Designed for business-critical deployments requiring faster response times, extended coverage, and a closer working relationship with SettleMint's engineering team.

| Attribute | Detail |
|---|---|
| **Coverage Hours** | Extended hours (07:00--22:00 CET, Monday--Friday; on-call for P1 on weekends) |
| **Support Channels** | Email, support portal, dedicated Slack or Microsoft Teams channel, phone escalation |
| **Named Contacts** | Up to 8 authorized support contacts |
| **Uptime SLA** | 99.95% monthly (managed infrastructure) |
| **Incident Management** | Priority queue with dedicated triage |
| **Platform Updates** | Monthly release cycle with early access to release candidates |
| **Proactive Monitoring** | Enhanced monitoring with proactive alerting and anomaly detection |
| **Designated Support Engineer** | Named engineer familiar with the client's deployment and configuration |
| **Account Management** | Monthly business review with technical deep-dive |

### Enterprise Support

Designed for mission-critical, high-volume deployments including sovereign-scale programs, multi-asset platforms, and environments where any downtime or compliance disruption carries material regulatory or financial impact.

| Attribute | Detail |
|---|---|
| **Coverage Hours** | 24/7/365 |
| **Support Channels** | Email, support portal, dedicated Slack or Microsoft Teams channel, phone, video escalation |
| **Named Contacts** | Unlimited authorized support contacts |
| **Uptime SLA** | 99.99% monthly (managed infrastructure) |
| **Incident Management** | Dedicated incident manager for P1/P2 incidents; war-room escalation for P1 |
| **Platform Updates** | Continuous delivery with staged rollouts; early access and preview environments |
| **Proactive Monitoring** | Full-stack observability with SettleMint-managed alerting, capacity planning, and trend analysis |
| **Designated Support Team** | Named support team with deep familiarity of the client's deployment, integrations, and workflows |
| **Solution Architect Access** | Quarterly architecture reviews and optimization recommendations |
| **Account Management** | Bi-weekly operational review; named Customer Success Manager |

---

## Support Channels

| Channel | Standard | Premium | Enterprise |
|---|---|---|---|
| **Support Portal** | Yes | Yes | Yes |
| **Email** | Yes | Yes | Yes |
| **Dedicated Slack/Teams Channel** | -- | Yes | Yes |
| **Phone Escalation** | -- | Yes (P1/P2) | Yes (all severities) |
| **Video Escalation** | -- | -- | Yes |
| **Designated Engineer** | -- | Named individual | Named team |
| **Customer Success Manager** | -- | -- | Named CSM |

### Support Portal Capabilities

The support portal serves as the central interface for all support interactions:

- Incident creation, tracking, and full history
- SLA tracking with real-time status visibility
- Knowledge base access (platform documentation, runbooks, FAQs)
- Release notes and scheduled update timelines
- Uptime dashboards and historical availability data

### Dedicated Communication Channels

For Premium and Enterprise tiers, SettleMint provisions a dedicated Slack or Microsoft Teams channel (per client preference) connecting the client's team directly with their designated support engineer or support team. This channel is monitored during coverage hours and is the fastest path for non-emergency questions, coordination, and real-time troubleshooting.

---

## Severity Levels and Response Targets

### Severity Definitions

All incidents are classified according to a four-level severity model. Severity is assessed based on business impact, scope of affected users, and availability of workarounds.

| Severity | Classification | Description | Examples |
|---|---|---|---|
| **P1 -- Critical** | Production down | Complete platform unavailability, data loss or corruption, compliance enforcement failure allowing non-compliant transfers, or settlement failure affecting live transactions | DALP dApp or DAPI unresponsive; compliance module bypass; atomic DvP failure in production; Key Guardian signing failure |
| **P2 -- High** | Major impact | Significant degradation of core functionality affecting multiple users or critical workflows, with no acceptable workaround | Settlement delays exceeding SLA; identity verification failures blocking investor onboarding; observability stack down; major integration failure |
| **P3 -- Medium** | Workaround available | Functional issue affecting a subset of users or non-critical workflows, where a reasonable workaround exists | Reporting delay; non-critical API endpoint degradation; dashboard rendering issues; batch processing delay with manual alternative |
| **P4 -- Low** | Minor / cosmetic | Minor issue with no material impact on operations, compliance, or user experience | UI cosmetic defect; documentation error; minor logging inconsistency; feature enhancement request |

### Response Time Targets

Response time is measured from the moment the incident is acknowledged by SettleMint's support team after being reported through an authorized support channel.

| Severity | Standard | Premium | Enterprise |
|---|---|---|---|
| **P1 -- Critical** | 4 hours | 1 hour | 15 minutes |
| **P2 -- High** | 8 hours | 4 hours | 1 hour |
| **P3 -- Medium** | 2 business days | 1 business day | 4 hours |
| **P4 -- Low** | 5 business days | 3 business days | 1 business day |

### Resolution Targets

Resolution targets represent the time to restore service or provide a viable workaround. Permanent root-cause fixes may follow under a separate remediation timeline, communicated as part of the incident post-mortem.

| Severity | Standard | Premium | Enterprise |
|---|---|---|---|
| **P1 -- Critical** | 8 hours | 4 hours | 2 hours |
| **P2 -- High** | 24 hours | 8 hours | 4 hours |
| **P3 -- Medium** | 5 business days | 3 business days | 2 business days |
| **P4 -- Low** | 10 business days | 5 business days | 3 business days |

---

## SLA Definitions and Measurement

### Uptime SLA

Uptime is calculated as a monthly percentage based on total minutes in the calendar month, excluding pre-approved maintenance windows.

| Tier | Uptime Target | Maximum Monthly Downtime |
|---|---|---|
| **Standard** | 99.9% | ~43 minutes |
| **Premium** | 99.95% | ~22 minutes |
| **Enterprise** | 99.99% | ~4.3 minutes |

### Measurement Methodology

- **Synthetic monitoring**: Uptime is measured via synthetic probes against DALP's core services (DAPI, dApp, signer service, indexer) from multiple geographic locations.
- **Reporting cadence**: Monthly uptime reports are provided to the client as part of the regular business review cycle.
- **Exclusions**: Planned maintenance windows communicated within the required notice period are excluded from uptime calculations.
- **Calculation**: Uptime % = ((Total minutes in month - Unplanned downtime minutes) / Total minutes in month) x 100.

### Service Credits

In the event that SettleMint fails to meet the contracted uptime SLA in a given calendar month, service credits are applied to the following month's invoice:

| Uptime Achieved | Service Credit |
|---|---|
| Below SLA target but >= 99.0% | 10% of monthly support fees |
| Below 99.0% but >= 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

Service credits are the client's sole and exclusive remedy for SLA breaches and are capped at 50% of monthly support fees. Credits must be requested within 30 days of the relevant reporting period.

---

## Escalation Matrix

### Automatic Escalation

| Trigger | Action |
|---|---|
| P1 incident no

# Value and ROI Analysis
## Why the economics work
The economic case for DALP is strongest when compared against the real alternative: stitching together separate tooling and vendor contracts for issuance, compliance enforcement, identity orchestration, settlement logic, observability, and reporting. That fragmented model increases integration cost, slows issue resolution, and makes internal ownership murky. A single governed platform reduces that sprawl.

## ROI categories for FirstRand
| Value category | Mechanism |
|---|---|
| Faster programme launch | reusable asset, compliance, and workflow patterns |
| Lower operating friction | less manual reconciliation and exception chasing |
| Better control evidence | integrated audit, status tracking, and monitoring |
| Reuse across future products | same platform extends beyond the initial programme |
| Lower architecture debt | avoids a patchwork of one-off point solutions |

# Commercial Governance
## Payment and acceptance principles
- annual licence fees should be invoiced on a predictable schedule;
- implementation fees should be milestone-based against agreed deliverables;
- change requests should be priced only when scope materially moves beyond the agreed platform and integration perimeter;
- acceptance should follow documented gate reviews rather than informal sign-off.

## Commercial risk controls
| Commercial risk | Control |
|---|---|
| scope creep | written assumptions and change control |
| hidden third-party cost | explicit treatment of custody and infrastructure charges |
| unclear ownership | RACI and operating-model definition in the project plan |
| unsupported roadmap dependency | current capability only in baseline pricing |

# Proposed Next Steps
1. Confirm the target deployment model and support window.
2. Validate integration scope and third-party dependencies.
3. Finalise enterprise licence scope for production and non-production environments.
4. Convert this draft into a priced client-specific order form and statement of work.

# Conclusion
For FirstRand, the right commercial shape is a platform-first agreement with disciplined implementation scope and a support tier aligned to regulated operations. That produces predictable economics, cleaner governance, and a far better chance of reaching production without hidden cost creep.


# Review Improvements Applied
- Clarified cost drivers and governance assumptions.
- Emphasised platform licensing versus transaction-based charging.

- Final pass: strengthened ROI framing and next-step structure.
