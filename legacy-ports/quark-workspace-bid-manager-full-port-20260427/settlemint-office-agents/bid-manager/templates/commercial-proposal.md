# Commercial Proposal

## SettleMint Digital Asset Lifecycle Platform (DALP)

**[VARIABLE: Client Name]**

**[VARIABLE: Date]**

**Confidential**

This document contains commercially sensitive information prepared exclusively for [VARIABLE: Client Name]. It may not be reproduced, distributed, or disclosed to third parties without the prior written consent of SettleMint NV.

---

# Executive Summary

`[VARIABLE: tailored per client. Rewrite this section entirely for each proposal. The guidance below shows what to cover and the tone to strike.]`

`[GUIDANCE: Open with one paragraph acknowledging the client's strategic context, the market pressure they face, and the specific opportunity they are pursuing. Reference the asset class, geography, or regulatory environment relevant to this deal. Do not use generic "digital transformation" language. Be specific about the client's stated objectives from the scoping workshop or RFP.]`

The investment case for DALP rests on a straightforward observation: the cost and risk of assembling tokenization capabilities from multiple vendors, internal build efforts, and point solutions consistently exceeds the cost of adopting a single platform purpose-built for the full digital asset lifecycle. For [VARIABLE: Client Name], this calculus is sharpened by [VARIABLE: 1-2 sentences on client-specific urgency, e.g. regulatory deadlines, competitive pressure, board-level commitments, existing pilot that must scale].

SettleMint's DALP platform delivers the complete infrastructure required to issue, manage, settle, and service digital assets under regulation. It covers all five lifecycle pillars (issuance, compliance, custody integration, settlement, and servicing) alongside three platform foundations (identity and access management, integration and interoperability, observability and operations). The platform supports seven asset classes out of the box and ships with 12 compliance module types, enabling institutions to move from scoping to production in weeks rather than the 12 to 24 months typical of internal builds.

This proposal presents a commercial framework for [VARIABLE: Client Name]'s adoption of DALP, covering licensing, deployment, implementation, support, and total cost of ownership. All pricing figures marked [CLIENT-SPECIFIC] will be finalized during commercial discussions based on deployment scope, asset class requirements, integration complexity, and support level.

`[GUIDANCE: Close with 1-2 sentences on the expected outcome, e.g. "We expect this engagement to deliver [Client Name]'s first production tokenized bond issuance within Q3 2026, with a platform foundation capable of supporting subsequent asset classes without re-platforming."]`

---

# Investment Rationale

`[VARIABLE: tailored per client context. This section builds the business case. Adapt the framework below to the client's current operating model, pain points, and strategic priorities.]`

## The Cost of the Current Approach

`[GUIDANCE: Describe the client's current state based on discovery findings. Typical patterns include:]`

Most institutions approaching tokenization that meets regulatory requirements today face one of three starting positions, each carrying distinct cost and risk profiles.

**The internal build path.** Some institutions attempt to build tokenization capabilities in-house. This approach typically requires assembling smart contract engineering, compliance rule engines, custody orchestration, settlement coordination, observability tooling, and API integration layers from scratch. Based on SettleMint's experience across dozens of institutional engagements, internal builds for a single asset class routinely consume 12 to 24 months of engineering effort and require ongoing maintenance investment that grows with each additional asset class or jurisdiction. The hidden cost is not just engineering time; it is the opportunity cost of delayed market entry and the compounding technical debt from building on foundations not designed for regulated asset lifecycle management.

**The multi-vendor assembly path.** Other institutions attempt to assemble capabilities from multiple specialized vendors: one for token issuance, another for compliance checks, a third for custody integration, a fourth for settlement, and additional tools for monitoring, audit trails, and reporting. This approach distributes the operating model across vendor boundaries, creating SLA gaps at integration seams, duplicated onboarding and procurement cycles, inconsistent audit trails, and cross-vendor incident resolution complexity. Each vendor relationship adds procurement overhead, contract management burden, and integration maintenance cost that scales with the number of connection points.

**The pilot-that-cannot-scale path.** A third pattern involves institutions that have completed a proof of concept or pilot using lightweight tooling, developer frameworks, or innovation lab infrastructure that was never designed for operation under regulation under regulation. The gap between pilot and production is not incremental; it typically requires rebuilding compliance enforcement, identity management, custody integration, and operational monitoring from the ground up.

`[GUIDANCE: Identify which pattern matches the client and quantify where possible. Use the client's own data from the scoping workshop.]`

## Why DALP Changes the Economics

DALP collapses the cost structure of all three paths by delivering a single platform that covers the full digital asset lifecycle with capabilities from day one.

| Cost Driver | Assembled Approach | DALP Approach |
|---|---|---|
| Token issuance and lifecycle management | Custom development or specialized vendor | Included: 7 asset class templates, configurable token |
| Compliance enforcement | Separate rule engine or manual review | Included: 12 compliance module types, ex-ante enforcement |
| Custody integration | Point-to-point integrations per provider | Included: bring-your-own-custodian model (Fireblocks, DFNS, local) |
| Settlement coordination | Custom orchestration or manual processes | Included: atomic DvP/XvP settlement |
| Observability and operations | Separate monitoring stack build | Included: Grafana dashboards, three-pillar observability |
| API and integration layer | Custom API development per system | Included: REST, oRPC, GraphQL, webhooks, SDK, CLI |
| Ongoing maintenance and upgrades | Internal team or multiple vendor contracts | Included: platform updates, security patches, contract upgrades |

The result is a materially lower total cost of ownership, faster time to production, and a platform that becomes more valuable over time as additional asset classes, jurisdictions, and business lines are added without re-platforming.

## ROI Framework

`[GUIDANCE: Select the most relevant value drivers from the tables below based on the client's use case. Not all will apply to every engagement. Quantify where the client has provided baseline data.]`

### Operational Efficiency Gains

| Value Driver | Typical Impact | How DALP Delivers |
|---|---|---|
| Settlement time reduction | 60 to 80% reduction (T+0/T+1 vs T+2/T+3) | Atomic DvP/XvP settlement eliminates counterparty risk and reconciliation cycles |
| Manual compliance review reduction | 40 to 60% reduction | Ex-ante compliance enforcement via 18 module types automates eligibility checks before execution |
| Corporate action automation | 60 to 80% cost reduction | Programmatic coupon payments, yield distribution, dividend processing, and maturity handling |
| Reconciliation elimination | Near-complete | Unified on-chain registry provides a single source of truth |

### Revenue Enablement

| Value Driver | Typical Impact | How DALP Delivers |
|---|---|---|
| Investor base expansion | 3 to 5x increase in participation | Fractionalization enables lower minimums |
| New asset class launch speed | 60 to 80% faster | Pre-built templates and compliance modules reduce time-to-market from months to weeks |
| Cross-border market access | New markets accessible | Jurisdictional compliance templates (MiCA, Reg D/S, MAS, FCA, JFSA) |

### Cost Avoidance

| Value Driver | Typical Impact | How DALP Delivers |
|---|---|---|
| Build vs. buy savings | 12 to 24 months of development avoided | Capabilities that would require significant engineering to build in-house |
| Multi-vendor integration costs | Eliminated | Single platform replaces separate issuance, compliance, custody, and settlement solutions |
| Ongoing maintenance burden | Reduced by 50 to 70% | Platform updates, security patches, and smart contract upgrades managed by SettleMint |

`[GUIDANCE: Include a client-specific ROI calculation here if baseline data is available from the scoping workshop. Use the four-step framework: (1) quantify current costs, (2) estimate DALP-enabled savings, (3) quantify revenue uplift, (4) calculate net ROI. Typical payback periods range from 12 to 18 months for institutions with significant manual operations or multi-vendor stacks.]`

---

# Licensing Model

`[FIXED]`

## Platform Licensing Philosophy

DALP uses a platform licensing model, not a per-transaction or per-asset fee structure. This distinction is fundamental to how SettleMint serves regulated institutions.

There are no per-transaction fees. Institutions are not charged per mint, transfer, settlement, or compliance check. This removes the perverse incentive to minimize platform usage and allows teams to iterate, test, and scale without cost anxiety. There are no per-token fees. Creating additional asset types does not incur incremental licensing costs. There are no per-user fees for end-investors. Investor growth is a business outcome, not a cost driver.

Licensing is structured as an annual subscription, giving institutions budget predictability and avoiding the variable-cost surprises common in transaction-based pricing models. This approach reflects SettleMint's belief that platform adoption should accelerate usage, not constrain it. Regulated institutions need to run compliance checks on every transfer, issue claims against every identity, and settle every transaction atomically. Charging per operation would work against the platform's own design principles.

## What the License Includes

A DALP platform license provides access to the full platform capability set:

**Lifecycle pillars.** All five core pillars: issuance, compliance, custody integration, settlement, and servicing, plus the three platform foundations (identity and access management, integration and interoperability, observability and operations).

**Asset classes.** All seven asset classes (bonds, equities, funds, stablecoins, deposits, real estate, and precious metals) plus the Configurable Token for custom asset types.

**Compliance modules.** All 12 compliance module types, from country restrictions and investor accreditation to supply limits, holding periods, and collateral backing.

**Full API surface.** REST API (v2), oRPC, GraphQL (via subgraph), event webhooks, SDK (@settlemint/dalp-sdk), and CLI (301 commands across 26 command groups).

**Addon capabilities.** Vault management, XvP/DvP settlement, token sales and primary offerings, airdrop distribution, fixed yield schedules, and data feeds.

**Observability stack.** Pre-built Grafana dashboards, three-pillar observability (metrics via VictoriaMetrics, logs via Loki, traces via Tempo), and automated alerting.

**Platform updates.** Access to all platform releases, security patches, and new capabilities during the license term.

## What Varies by Engagement

While the platform license is broad in scope, several dimensions are scoped per engagement:

| Dimension | How It Is Scoped |
|---|---|
| Deployment model | Cloud-managed, on-premises (Helm/Kubernetes), or hybrid |
| Environment count | Number of environments (development, staging, production) |
| Network configuration | Public EVM, private/permissioned EVM, or multi-network |
| Custody integration | Local key management, Fireblocks, DFNS, or multi-provider |
| Support tier | Standard, Premium, or Enterprise |
| Implementation services | Discovery, deployment, integration, training |

## Platform Tiers

DALP licensing is structured into three tiers based on deployment complexity and institutional requirements, not usage volume. Each tier includes the full platform capability set.

### Foundation Tier

Designed for institutions launching their first production digital asset program with a focused use case. This tier includes a single production environment plus one non-production environment, a single EVM network (public or private), a single custody provider integration, and the Standard support package. It suits a bank launching a tokenized bond program or a market infrastructure provider piloting tokenized deposits.

### Enterprise Tier

Designed for institutions scaling across multiple asset classes, jurisdictions, or business lines. This tier includes multiple environments (development, staging, UAT, production), multi-network support, multi-custody provider integration, the Premium support package, unlimited asset types in production, enhanced observability with custom dashboard configuration, and priority access to new platform capabilities. It suits a tier-1 bank operating bonds, deposits, and stablecoins across multiple jurisdictions, or a CSD enabling tokenized instruments for multiple issuers.

### Sovereign / Strategic Tier

Designed for national-scale programs, sovereign entities, or strategic deployments requiring maximum operational control. This tier includes unlimited environments with full isolation, multi-network and multi-region deployment, full custody provider flexibility with custom integration support, Enterprise support with dedicated SRE engagement, custom compliance module development support, a dedicated solution architect, custom SLA terms, and early access to roadmap features. It suits a national real estate tokenization program, a central bank digital asset initiative, or a global institution deploying DALP as core infrastructure across regions.

### Tier Comparison

| Capability | Foundation | Enterprise | Sovereign / Strategic |
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

# Deployment Options and Pricing

`[FIXED base structure, VARIABLE specific pricing quotes]`

## Deployment Model Overview

DALP supports flexible deployment to meet institutional requirements around data sovereignty, security posture, regulatory constraints, and operational preferences. All deployment models deliver the same platform capabilities: the same lifecycle modules, compliance engine, settlement protocols, observability stack, and API surface. The choice of model is driven by the institution's infrastructure reality, not by platform limitations.

## Deployment Model Comparison

| Capability | Managed SaaS | Private Cloud | On-Premises | Hybrid |
|---|---|---|---|---|
| Infrastructure management | SettleMint-managed | Client-managed or co-managed | Client-managed | Split by component |
| Data residency | Configurable by region | Full control | Full control | Component-level control |
| Network connectivity | Internet / VPN | Client VPN / private link | Air-gap capable | Mixed |
| Update management | Automated by SettleMint | Coordinated releases | Client-controlled | Component-specific |
| Scaling | Auto-scaling | Client-provisioned | Client-provisioned | Component-specific |
| Time-to-deploy | Fastest | Moderate | Longest | Moderate |
| Operational overhead | Lowest | Moderate | Highest | Moderate |

### Managed SaaS

SettleMint operates and manages the full DALP platform on dedicated cloud infrastructure, providing the fastest path to production with the lowest operational overhead. Each client operates in a dedicated, isolated environment; this is not multi-tenant shared infrastructure. Data residency is configurable and aligned with regional requirements (EU, MENA, APAC). The client accesses DALP through standard APIs, the web interface, SDK, and CLI without managing underlying infrastructure.

This model suits institutions seeking the fastest time-to-production, organizations without dedicated blockchain infrastructure teams, and initial production deployments where minimizing operational overhead is a priority.

### Private Cloud

DALP is deployed within the client's own cloud environment (AWS, Azure, GCP) and managed by the client's operations team, with SettleMint providing Helm charts, configuration guidance, and ongoing platform support. This model gives institutions full control over their cloud infrastructure while benefiting from DALP's deployment automation.

Prerequisites include a Kubernetes cluster (v1.25+), PostgreSQL (v15+), object storage, secrets management, and an operations team with Kubernetes administration experience. Baseline compute requirements are 16+ vCPUs and 64+ GB RAM for production workloads, varying with transaction volume and asset class count.

This model suits institutions with existing cloud infrastructure and Kubernetes expertise, regulated environments requiring full infrastructure control, and organizations with dedicated DevOps or SRE teams.

### On-Premises

DALP is deployed within the client's own data centre, providing maximum control over the entire technology stack. This model supports air-gapped environments requiring complete network isolation. Deployment follows the same Helm/Kubernetes pattern, with SettleMint providing container images, configuration documentation, and optional on-site deployment assistance.

Prerequisites include client-provisioned Kubernetes (bare metal or virtualized), self-managed PostgreSQL with high-availability configuration, a private container registry, HSM or HashiCorp Vault for production key management, and an operations team with Kubernetes, database administration, and security operations experience.

This model suits sovereign entities with strict data sovereignty mandates, institutions with air-gap or data-centre-only security policies, and environments where regulatory requirements prohibit cloud deployment.

### Hybrid

DALP components are deployed across multiple environments to meet specific requirements per component. Common patterns include running the application layer in a private cloud while blockchain nodes and key management operate on-premises, operating the primary environment on-premises with a managed SaaS disaster recovery site, and splitting deployments across regions to meet data residency requirements per jurisdiction.

This model suits large institutions with complex regulatory requirements spanning multiple jurisdictions and organizations migrating from on-premises to cloud infrastructure.

## Cost Structure by Deployment Model

`[VARIABLE: Insert client-specific pricing. The structure below shows cost categories.]`

| Cost Category | Managed SaaS | Private Cloud / On-Premises |
|---|---|---|
| Production license | €25,000/month (€300,000/year, annual upfront) | €25,000/month (€300,000/year, annual upfront) |
| Development license | €10,000/month (€120,000/year, annual upfront) | €10,000/month (€120,000/year, annual upfront) |
| Infrastructure | SettleMint-managed or pass-through cloud costs | Client-managed |
| Implementation services (one-time) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Support and maintenance (annual) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |

All prices exclude applicable taxes and VAT, which are added separately based on the client's jurisdiction. Platform license fees are invoiced annually in advance.

Infrastructure costs for cloud-managed deployments are pass-through and not marked up by SettleMint. For on-premises deployments, infrastructure costs are borne entirely by the client. SettleMint provides detailed infrastructure sizing guidance based on expected workload characteristics.

## What Drives Cost Up or Down

Several factors influence where a specific engagement falls within the pricing range for each tier:

**Factors that increase cost:** Multiple production environments, multi-region deployment, on-premises with HSM integration (longer implementation), complex multi-system integrations, custom compliance module requirements, higher support tiers, and multi-year phased rollouts across business lines.

**Factors that reduce cost:** Cloud-managed deployment (faster implementation), single production environment, limited integration scope, use of pre-built asset templates and compliance configurations without customization, and multi-year licensing commitments.

---

# Support and SLA Framework

`[FIXED]`

## Support Tiers

All DALP licenses include ongoing support and maintenance. SettleMint offers three support tiers, each designed for a different operational profile. Tier selection is typically aligned with the criticality of the deployment, transaction volumes, and the client's internal support capabilities.

### Standard Support

Designed for initial production deployments and lower-criticality environments where the client maintains internal operational capability and requires SettleMint as a second-line escalation resource.

| Attribute | Detail |
|---|---|
| Coverage hours | Business hours (09:00 to 18:00 CET, Monday to Friday, excluding public holidays) |
| Support channels | Email, support portal |
| Named contacts | Up to 3 authorized support contacts |
| Uptime SLA | 99.9% monthly (managed infrastructure) |
| Platform updates | Quarterly release cycle with release notes and migration guides |
| Proactive monitoring | Platform health monitoring with alerting on critical thresholds |
| Account management | Quarterly business review |

### Premium Support

Designed for business-critical deployments where faster response times, extended coverage, and a closer working relationship with SettleMint's engineering team are required.

| Attribute | Detail |
|---|---|
| Coverage hours | Extended hours (07:00 to 22:00 CET, Monday to Friday; on-call for P1 on weekends) |
| Support channels | Email, support portal, dedicated Slack channel, phone escalation |
| Named contacts | Up to 8 authorized support contacts |
| Uptime SLA | 99.95% monthly (managed infrastructure) |
| Platform updates | Monthly release cycle with early access to release candidates |
| Proactive monitoring | Enhanced monitoring with proactive alerting and anomaly detection |
| Designated support engineer | Named engineer familiar with the client's deployment and configuration |
| Account management | Monthly business review with technical deep-dive |

### Enterprise Support

Designed for mission-critical, high-volume deployments, including sovereign-scale programs, multi-asset platforms, and environments where any downtime or compliance disruption carries material regulatory or financial impact.

| Attribute | Detail |
|---|---|
| Coverage hours | 24/7/365 |
| Support channels | Email, support portal, dedicated Slack channel, phone, video escalation |
| Named contacts | Unlimited authorized support contacts |
| Uptime SLA | 99.99% monthly (managed infrastructure) |
| Platform updates | Continuous delivery with staged rollouts; early access and preview environments |
| Proactive monitoring | Full-stack observability with SettleMint-managed alerting, capacity planning, and trend analysis |
| Designated support team | Named support team with deep familiarity of the client's deployment, integrations, and workflows |
| Solution architect access | Quarterly architecture reviews and optimization recommendations |
| Account management | Bi-weekly operational review; named Customer Success Manager |

## Severity Levels and Response Targets

All incidents are classified according to a four-level severity model based on business impact, scope of affected users, and availability of workarounds.

### Severity Definitions

| Severity | Classification | Description |
|---|---|---|
| P1 | Critical: Production down | Complete platform unavailability, data loss or corruption, compliance enforcement failure allowing non-compliant transfers, or settlement failure affecting live transactions |
| P2 | High: Major impact | Significant degradation of core functionality affecting multiple users or critical workflows, with no acceptable workaround |
| P3 | Medium: Workaround available | Functional issue affecting a subset of users or non-critical workflows, where a reasonable workaround exists |
| P4 | Low: Minor / cosmetic | Minor issue with no material impact on operations, compliance, or user experience |

### Response Time Targets

| Severity | Standard | Premium | Enterprise |
|---|---|---|---|
| P1: Critical | 4 hours | 1 hour | 15 minutes |
| P2: High | 8 hours | 4 hours | 1 hour |
| P3: Medium | 2 business days | 1 business day | 4 hours |
| P4: Low | 5 business days | 3 business days | 1 business day |

### Resolution Targets

Resolution targets represent the time to restore service or provide a viable workaround. Permanent root-cause fixes may follow under a separate remediation timeline communicated as part of the incident post-mortem.

| Severity | Standard | Premium | Enterprise |
|---|---|---|---|
| P1: Critical | 8 hours | 4 hours | 2 hours |
| P2: High | 24 hours | 8 hours | 4 hours |
| P3: Medium | 5 business days | 3 business days | 2 business days |
| P4: Low | 10 business days | 5 business days | 3 business days |

## Uptime SLA

Uptime is calculated as a monthly percentage based on total minutes in the calendar month, excluding pre-approved maintenance windows.

| Tier | Uptime Target | Maximum Monthly Downtime |
|---|---|---|
| Standard | 99.9% | Approximately 43 minutes |
| Premium | 99.95% | Approximately 22 minutes |
| Enterprise | 99.99% | Approximately 4.3 minutes |

Uptime is measured via synthetic monitoring against DALP's core services from multiple geographic locations. Monthly uptime reports are provided as part of the regular business review cycle.

### Service Credits

If SettleMint fails to meet the contracted uptime SLA in a given calendar month, service credits are applied to the following month's invoice:

| Uptime Achieved | Service Credit |
|---|---|
| Below SLA target but at or above 99.0% | 10% of monthly support fees |
| Below 99.0% but at or above 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

Service credits are the client's sole and exclusive remedy for SLA breaches and are capped at 50% of monthly support fees. Credits must be requested within 30 days of the relevant reporting period.

## Maintenance and Updates

All support tiers include platform updates (releases with new capabilities, performance improvements, and security patches), prioritized security fixes with expedited release cycles for critical vulnerabilities, UUPS proxy-based smart contract upgrades managed through the platform's upgrade framework, ongoing dependency management for third-party libraries and blockchain client compatibility, and continuously maintained product documentation.

Scheduled maintenance runs during a standard window (Saturdays 02:00 to 06:00 CET or a client-agreed alternative), with minimum 5 business days notice for standard maintenance and 10 business days for major upgrades. Emergency maintenance for critical security patches may occur outside standard windows with maximum practical advance notice.

| Tier | Release Cadence | Update Model |
|---|---|---|
| Standard | Quarterly | Scheduled update during maintenance window |
| Premium | Monthly | Staged rollout (staging then production); early access to release candidates |
| Enterprise | Continuous delivery | Staged rollout with preview environments; client approval gate before production |

## Escalation Procedures

Automatic escalation triggers are built into the support process. A P1 incident not acknowledged within the response target escalates immediately to the Support Engineering Manager. A P1 incident not resolved within the resolution target escalates to the VP Engineering with client notification. Recurring P1 or P2 incidents (three or more in 30 days) trigger a root cause review with the Solution Architect and a client briefing.

Clients may also escalate at any time through a defined four-level path: (1) Designated Support Engineer, (2) Support Engineering Manager, (3) VP Engineering / Head of Customer Success, (4) SettleMint Executive Management.

---

# Implementation Investment

`[VARIABLE: scoped per project. Adapt phase durations, activities, and investment amounts based on the scoping workshop output.]`

## Implementation Methodology

SettleMint follows a structured, phase-gated implementation methodology refined through years of production implementations with regulated banks, market infrastructure providers, and sovereign entities. The standard implementation timeline spans 15 to 19 weeks from kickoff to production go-live, followed by a 4-week hypercare period. Timelines are adjusted based on scope complexity, integration requirements, and client readiness.

Each phase concludes with a formal gate review. Progression to the next phase requires sign-off on defined deliverables and acceptance criteria from both SettleMint and the client organization.

## Phase 1: Discovery and Requirements (Weeks 1 to 3)

This phase establishes a validated understanding of the client's business objectives, technical landscape, regulatory environment, and operational requirements.

Activities include stakeholder interviews across business, technology, compliance, and operations teams; assessment of the current systems landscape (core banking, custody, compliance, identity management, reporting); regulatory and compliance mapping against DALP's 12 compliance module types; asset class and lifecycle scoping; target architecture design covering deployment topology, network selection, custody integration, and external system connectivity; and implementation risk assessment.

Deliverables: Business Requirements Document with acceptance criteria, Regulatory and Compliance Matrix mapping requirements to DALP modules, Target Architecture Document, Implementation Roadmap with milestones and resource requirements, and a RACI Matrix.

**Typical investment:** [CLIENT-SPECIFIC]

## Phase 2: Configuration and Setup (Weeks 4 to 7)

This phase provisions the DALP environment, configures asset types and compliance modules, establishes the identity and access framework, and prepares the integration layer.

Activities include infrastructure provisioning (Kubernetes cluster, database, blockchain nodes, observability stack); network configuration and genesis setup for private networks; token and asset template configuration; compliance module setup across applicable jurisdictions and investor categories; identity and access framework configuration (OnchainID, RBAC, claim-based verification workflows); key management setup with appropriate storage backends (encrypted database, cloud secret manager, HSM, or third-party custody); and detailed integration design (API patterns, data mapping, webhook configuration).

Deliverables: Provisioned development, staging, and production environments; Asset Configuration Documentation; Compliance Module Configuration; Identity and Access Design; Integration Design Document; and Environment Validation Report.

**Typical investment:** [CLIENT-SPECIFIC]

## Phase 3: Integration (Weeks 8 to 11)

This phase connects DALP to the client's existing systems, delivering end-to-end operational workflows.

Activities include API integration using DALP's oRPC, REST, GraphQL endpoints with authentication, rate limiting, and error handling; custody connector setup through DALP's bring-your-own-custodian model; identity and KYC provider integration with DALP's OnchainID framework; core banking and payment rail integration (ISO 20022 for SWIFT, SEPA, RTGS where applicable); data feed integration for NAV calculations, pricing, and reference data; reporting and audit integration with data exports to regulatory reporting and SIEM platforms; and end-to-end workflow orchestration across DALP and connected systems.

Deliverables: Integrated system landscape with all connectors operational; API Integration Documentation; End-to-End Workflow Documentation; Integration Test Results; and draft Operational Runbook.

**Typical investment:** [CLIENT-SPECIFIC]

## Phase 4: Testing and User Acceptance (Weeks 12 to 14)

This phase validates that the complete deployment meets all functional, security, performance, and compliance requirements.

Activities include functional testing across all configured asset types, lifecycle events, compliance rules, and settlement logic; security assessment including penetration testing, vulnerability scanning, access control validation, and smart contract security review; performance testing under target transaction volumes with benchmarking against SLA targets; compliance validation confirming ex-ante checks block non-compliant transfers and audit trails capture all required evidence; structured user acceptance testing with designated client stakeholders; and disaster recovery testing including backup, failover, and recovery procedures.

Deliverables: Test Plan and Test Cases; Functional Test Report; Security Assessment Report; Performance Test Report; UAT Sign-Off; and Go-Live Readiness Assessment.

**Typical investment:** [CLIENT-SPECIFIC]

## Phase 5: Go-Live (Week 15)

This phase executes a controlled production deployment with minimal risk.

Activities include production deployment following the runbook; data migration and integrity validation; smoke-test execution confirming platform health, integration connectivity, and compliance enforcement; managed cutover from legacy systems or parallel-run processes; and dedicated on-site or remote support during the go-live window.

Deliverables: Production Deployment Confirmation; Migration Validation Report; Go-Live Communication; and Incident Response Procedures.

**Typical investment:** [CLIENT-SPECIFIC]

## Phase 6: Hypercare and Optimization (Weeks 16 to 19)

This phase provides intensive post-go-live support, performance optimization, and knowledge transfer to ensure the client's operational teams are self-sufficient.

Activities include dedicated platform monitoring with proactive issue identification; performance optimization based on production metrics (query performance, indexing efficiency, gas optimization, resource utilization); priority issue resolution with accelerated response times; structured knowledge transfer covering platform administration, monitoring, troubleshooting, compliance module management, and operational workflows; operational readiness validation; and managed transition to the contracted support tier.

Deliverables: Hypercare Summary Report; Optimized Configuration documentation; Complete Documentation Package (architecture, runbooks, API guides, troubleshooting guides, compliance module reference); Knowledge Transfer Completion Certificate; and Support Transition Plan.

**Typical investment:** [CLIENT-SPECIFIC]

## Implementation Pricing Summary

| Phase | Duration | Investment |
|---|---|---|
| Discovery and Requirements | Weeks 1 to 3 | [CLIENT-SPECIFIC] |
| Configuration and Setup | Weeks 4 to 7 | [CLIENT-SPECIFIC] |
| Integration | Weeks 8 to 11 | [CLIENT-SPECIFIC] |
| Testing and User Acceptance | Weeks 12 to 14 | [CLIENT-SPECIFIC] |
| Go-Live | Week 15 | [CLIENT-SPECIFIC] |
| Hypercare and Optimization | Weeks 16 to 19 | [CLIENT-SPECIFIC] |
| **Total implementation** | **15 to 19 weeks** | **[CLIENT-SPECIFIC]** |

## What Accelerates Delivery

Several built-in accelerators reduce implementation timelines and costs. DALP ships with audited contract templates for seven asset classes, reducing custom development. Pre-configured compliance templates exist for MiCA (EU), Reg D/S/CF (US), MAS (Singapore), FCA (UK), and JFSA (Japan) regulatory frameworks. Documented reference architectures cover common institutional deployment patterns. The SDK and CLI (301 commands) enable rapid integration development and operational automation. Sandbox environments allow integration testing before production deployment.

## What Extends Timelines

Implementation timelines extend when the deployment model involves on-premises infrastructure with HSM integration, when integration scope includes many external systems with complex data models, when multiple jurisdictions require custom compliance policy development, and when institutional change management processes (security review, vendor onboarding, procurement) are lengthy.

## Training

`[VARIABLE: Scope training based on the client's team structure.]`

Training is included as part of the implementation engagement and covers platform administration and configuration, compliance module management and policy updates, monitoring, alerting, and troubleshooting, API integration patterns and SDK usage, and operational procedures (runbook walkthroughs, incident response).

Additional training sessions beyond the initial implementation scope can be arranged at [CLIENT-SPECIFIC] per day.

---

# Commercial Terms

`[FIXED]`

## Contract Structure

A typical DALP engagement is governed by the following agreements:

| Component | Term | Notes |
|---|---|---|
| Platform License Agreement | Annual, renewable | Multi-year commitments with preferential terms available |
| Implementation Services Agreement | Fixed-price or time-and-materials | Based on defined scope; fixed-price preferred for clearly scoped engagements |
| Support and Maintenance Agreement | Annual, co-terminus with license | Included or add-on based on tier |
| Custom Development (if applicable) | Statement of Work | Scoped and priced separately from the platform license |

## Payment Schedule

**Platform license fees** are invoiced annually in advance or quarterly, depending on the agreed payment structure. Multi-year agreements may include alternative payment schedules aligned with the client's procurement cycles.

**Implementation services** are invoiced on a milestone basis, with payment triggers tied to deliverable acceptance at each phase gate. A typical structure allocates a portion at kickoff, portions at each major phase completion, and the balance at production go-live acceptance.

**Support and maintenance fees** are invoiced annually in advance, co-terminus with the platform license.

## Contract Duration

The initial license term is 12 months from the platform go-live date (or the date of license activation, whichever occurs first). Multi-year agreements of 24 or 36 months are available and typically carry pricing benefits.

## Renewal Terms

License renewals are priced at the then-current list price, with renewal pricing communicated at least 90 days before the end of the current term. Multi-year commitment renewals receive pricing consideration reflecting the longer commitment. Early renewal commitments made more than 120 days before term end may qualify for additional preferential terms.

## Termination

Either party may terminate the agreement for material breach that remains uncured for 30 days following written notice. The client may terminate for convenience with [CLIENT-SPECIFIC] days written notice, subject to payment of fees for the remainder of the then-current annual term.

Upon termination, SettleMint provides a data export period of [CLIENT-SPECIFIC] days during which the client may extract all data, configurations, and assets. SettleMint will assist with an orderly transition and will not restrict data access during this period.

## Intellectual Property

The DALP platform, including all source code, documentation, and related intellectual property, remains the exclusive property of SettleMint NV. The license grants the client a non-exclusive, non-transferable right to use the platform during the license term for the agreed scope.

Any custom integrations, configurations, or extensions developed by the client using DALP's published APIs and SDKs remain the client's intellectual property. Custom development performed by SettleMint under a Statement of Work follows the IP ownership terms specified in that Statement of Work, which are negotiated per engagement.

Client data processed through the platform remains the exclusive property of the client at all times.

## Liability

SettleMint's aggregate liability under the agreement is capped at the total fees paid by the client during the 12-month period immediately preceding the event giving rise to the claim. Neither party is liable for indirect, consequential, incidental, or punitive damages, including lost profits or lost data, except in cases of gross negligence or willful misconduct.

Both parties maintain appropriate professional indemnity and cyber liability insurance coverage for the duration of the engagement.

## Confidentiality

Both parties agree to treat all non-public information exchanged under the agreement as confidential. Confidentiality obligations survive termination by a period of 3 years. Standard exceptions apply for information that becomes publicly available through no fault of the receiving party, is independently developed, or is required to be disclosed by law or regulation.

## Source Code Escrow

SettleMint offers source code escrow arrangements for institutions requiring business continuity assurance. Escrow terms, release conditions, and the identity of the escrow agent are negotiated per engagement and documented in a separate escrow agreement.

---

# Total Cost of Ownership

`[VARIABLE: calculated per deal. Use the framework below and populate with client-specific figures from the scoping workshop and commercial discussions.]`

## TCO Framework

When institutions evaluate DALP, the right comparison is not DALP's annual license cost versus another software subscription. The more accurate comparison is DALP's total cost of ownership versus the cost of assembling and operating separate tools and vendors for each lifecycle stage.

That assembled approach typically involves separate vendors or internal build efforts for token issuance and lifecycle management, compliance rule enforcement, identity and credentialing orchestration, custody integration and transaction policy control, settlement coordination, observability, audit, and reporting, and API integration and workflow orchestration. Beyond direct licensing costs, this approach introduces multiple vendor contracts and procurement cycles, cross-vendor incident resolution complexity, duplicated integration work, inconsistent audit trails and reporting, release coordination across independently evolving components, and architectural drift as point solutions expand unevenly.

## Three-Year TCO Model

`[GUIDANCE: Populate the table below with client-specific figures. The structure shows all cost categories that should be included for an accurate comparison.]`

| Cost Component | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform license | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation services | [CLIENT-SPECIFIC] | - | - | [CLIENT-SPECIFIC] |
| Support and maintenance | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Infrastructure (cloud or on-premises) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Training | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | - | [CLIENT-SPECIFIC] |
| Custom integration development | [CLIENT-SPECIFIC] | - | - | [CLIENT-SPECIFIC] |
| **DALP Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

## Five-Year TCO Model

`[GUIDANCE: Extend the three-year model with years 4 and 5. Include any anticipated scope expansion, additional asset classes, or tier upgrades.]`

| Cost Component | Years 1 to 3 Total | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|
| Platform license | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Implementation and expansion | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Support and maintenance | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Infrastructure | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Training and enablement | [CLIENT-SPECIFIC] | - | - | [CLIENT-SPECIFIC] |
| **DALP Total** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** | **[CLIENT-SPECIFIC]** |

## Comparative TCO: DALP vs. Alternatives

`[GUIDANCE: Build this comparison using data gathered during the scoping workshop. The two most common alternatives are (a) building in-house and (b) assembling multiple specialized vendors.]`

### DALP vs. Build In-House

| Dimension | Build In-House | DALP |
|---|---|---|
| Time to first production deployment | 12 to 24 months | 15 to 19 weeks |
| Engineering team required | 6 to 12 full-time engineers (smart contracts, backend, security, DevOps) | Client integration team + SettleMint delivery team (implementation phase only) |
| Ongoing maintenance team | 3 to 5 full-time engineers permanently | Covered by SettleMint support and maintenance |
| Compliance module development | Custom build per jurisdiction | 18 module types included; jurisdictional templates pre-configured |
| Smart contract audit costs | External audits per release ($50K to $150K per audit cycle) | Covered by SettleMint security and audit processes |
| Multi-asset class expansion | Incremental build effort per asset class | All 7 asset classes included from day one |
| Regulatory adaptation | Custom engineering per regulatory change | Platform updates cover regulatory adaptations |

Building in-house creates a permanent internal infrastructure liability. The engineering team required to build the initial capability must be retained to maintain, secure, and evolve it. For most institutions, DALP's subscription model converts this capital-intensive, unpredictable cost structure into a predictable operating expense.

### DALP vs. Multi-Vendor Assembly

| Dimension | Multi-Vendor Assembly | DALP |
|---|---|---|
| Number of vendor relationships | 3 to 5+ vendors (issuance, compliance, custody, settlement, monitoring) | 1 vendor relationship |
| Integration points to maintain | 8 to 15 cross-vendor integration points | Single integrated platform |
| SLA accountability | Split across vendors; gaps at integration seams | Single SLA with SettleMint |
| Audit trail consistency | Distributed across vendor systems | Unified audit trail across all lifecycle operations |
| Incident resolution | Multi-party coordination for cross-system issues | Single escalation path |
| Release coordination | Independent vendor release cycles to coordinate | Single platform release cycle |
| Procurement overhead | Multiple contracts, renewals, vendor risk assessments | Single procurement cycle |

The multi-vendor approach creates hidden costs that compound over time: integration maintenance, cross-vendor incident coordination, audit trail reconciliation, and the organizational overhead of managing multiple vendor relationships. DALP eliminates these costs by delivering the full lifecycle in a single governed platform layer.

---

# Reference Clients

`[FIXED]`

## Production Track Record

SettleMint's DALP platform and its predecessor technology have been deployed in production across regulated financial institutions, sovereign entities, and market infrastructure providers spanning Europe, the Middle East, and Asia-Pacific. The table below summarizes all named reference deployments.

| Client | Geography | Use Case |
|---|---|---|
| OCBC Bank | Singapore | Security token engine; securitization, tokenization, and fractionalization of off-chain assets for HNWI/HENRY investment products |
| KBC Securities (Bolero Crowdfunding) | Belgium | Equity crowdfunding and SME loans; smart contract automation of issuance, lifecycle, corporate actions, and redemption |
| KBC Insurance | Belgium | NFTs as digital product passports for insured asset valuation and claims processing |
| Standard Chartered Bank | Asia, Africa, Middle East | Digital Virtual Exchange; fractional tokenization of securities for institutional trading |
| Reserve Bank of India (Innovation Hub) | India | Multi-bank letter of credit trade finance on multi-node, multi-cloud blockchain |
| Sony Bank (Sony Group) | Japan | Stablecoin issuance and management with integrated digital identity; KYC-enabled Web3 banking |
| State Bank of India | India | CBDC infrastructure for secure, scalable digital currency (pilot successful, production in progress) |
| Islamic Development Bank (subsidy distribution) | 57 member countries | Sharia-compliant blockchain-based subsidy distribution; financial inclusion for 1.7 billion people |
| Mizuho Bank | Japan | Bond tokenization and trade finance (PoC completed late 2025, production planning stage) |
| Islamic Development Bank (market stabilization) | Global | Sharia-compliant market stabilization; 30 to 50% volatility reduction through algorithms and smart contracts |
| Maybank (Project Photon) | Malaysia | FX tokenization and cross-border settlement using Exchange-versus-Payment (XvP); MYRT token |
| ADI / Finstreet | UAE | Tokenized equity on Abu Dhabi mainnet with corporate actions, on-chain voting, institutional custody |
| Commerzbank | Germany | Hybrid on/off-chain ETP issuance; Boerse Stuttgart listing; settlement under 10 seconds; potential annual savings of 7 million euros |
| Saudi RER (Real Estate Registry) | Saudi Arabia | Country-scale real estate tokenization; registration, fractionalization, and digital marketplace under Vision 2030 |

## Selected Case Studies

`[GUIDANCE: Select 2-3 case studies most relevant to the prospect's industry, geography, or use case. The three examples below are expanded for reference. Replace or supplement as needed.]`

### OCBC Bank: Institutional Security Token Engine

OCBC Bank, one of Singapore's largest financial institutions, engaged SettleMint to build a security token engine for the securitization, tokenization, and fractionalization of off-chain assets. The target segment was high-net-worth individuals (HNWIs) and high earners not rich yet (HENRYs), with investment products spanning bonds, SPVs, equities, and real estate.

The challenge was to deliver a secure end-user interface for tokenization, wallet management, and cash positions alongside a backend with order book management and APIs to integrate with off-chain securities and cash systems. SettleMint implemented the solution, enhancing liquidity for previously illiquid assets and expanding investment opportunities. The live deployment (since January 2025) demonstrates fractionalization to SGD 10,000 minimum investment, automated compliance, and streamlined settlement operations. OCBC now operates an easy-to-administer and scalable digital asset exchange platform.

### Commerzbank: Exchange-Traded Product Issuance

Commerzbank, one of Germany's leading financial institutions, worked with SettleMint on a hybrid on-chain and off-chain solution for issuing and managing exchange-traded products (ETPs). The solution integrated with Boerse Stuttgart's listing service and Commerzbank's issuance engine, enabling trades to be cleared and settled in near real time.

The deployment reduced counterparty risk, cut listing inefficiencies, and achieved settlement times under 10 seconds. An internal analysis identified potential savings of 7 million euros annually from the operational efficiencies gained. This project demonstrates DALP's applicability in traditional European capital markets infrastructure with demanding regulatory and operational requirements.

### Saudi RER: Country-Scale Real Estate Tokenization

The Saudi Real Estate Registry (RER), operating under the Real Estate General Authority (REGA), selected SettleMint as the delivery partner for a country-scale blockchain infrastructure for real estate registration, fractionalization, and a digital marketplace. This program is central to the Kingdom's digital transformation under Vision 2030.

The solution implements a "registry-as-truth" model where the RER ledger serves as the conclusive record of property rights. The platform covers the full journey from property listing and due diligence through identity verification, fee payment, escrow, and on-chain transfer to the final update of the deed. SettleMint is responsible for the end-to-end solution: marketplace services, API gateway, the blockchain and tokenization layer powered by DALP, and orchestration and integration with RER's core registry, billing, escrow, case worker, and government systems. This is the first country-scale blockchain infrastructure dedicated to real estate registration, fractionalization, and digital marketplace, establishing a single regulated infrastructure for the Kingdom.

---

# Next Steps

`[VARIABLE: Adapt to the stage of the commercial conversation and the client's procurement process.]`

`[GUIDANCE: This section should be concise and action-oriented. Propose concrete next steps with suggested timelines.]`

To advance from this proposal to a finalized commercial agreement, SettleMint recommends the following steps:

**Commercial review session.** A focused working session (half day) to walk through this proposal, clarify pricing parameters, and align on deployment model, tier selection, and support level. We suggest scheduling this within [VARIABLE: timeframe, e.g. "the next two weeks"].

**Scoping workshop.** A structured 1 to 2 day workshop to define the detailed implementation scope, including use case priorities, integration landscape, compliance requirements, and deployment architecture. This workshop produces the inputs needed to finalize all [CLIENT-SPECIFIC] figures in this proposal.

**Tailored commercial offer.** Following the scoping workshop, SettleMint will produce a binding commercial proposal with firm pricing across license, implementation, and support, typically within 5 business days of the workshop.

**Proof of value (optional).** For clients who wish to validate DALP capabilities against specific requirements before committing, SettleMint offers a time-boxed proof of value engagement in a sandbox environment. This can run in parallel with commercial discussions and typically spans 2 to 4 weeks.

**Contract execution.** Finalization and execution of the Platform License Agreement, Implementation Services Agreement, and Support and Maintenance Agreement.

To initiate this process, please contact:

`[VARIABLE: Insert SettleMint account team contact details]`

---

*This document is confidential and intended solely for [VARIABLE: Client Name]. The commercial terms and pricing frameworks described herein are indicative and subject to finalization based on scoping workshop outcomes and mutual agreement. This document does not constitute a binding offer.*
