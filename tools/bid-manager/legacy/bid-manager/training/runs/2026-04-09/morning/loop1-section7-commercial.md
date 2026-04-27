# Section 7: Commercial Proposal

## Executive Summary

This section presents SettleMint's commercial framework for the Digital Asset Lifecycle Platform (DALP). The complexity of doing tokenization right at production scale, identity frameworks, compliance controls, governance, auditability, multi-asset lifecycle support, is precisely what DALP's commercial model is designed to address. Our licensing model is designed for regulated institutions that need predictable, transparent pricing aligned with the operational realities of digital asset programs, not per-transaction toll gates that penalize growth.

DALP is licensed as a platform, not billed per transaction or per token operation. This means institutions can scale issuance volume, transaction throughput, and asset classes without incurring incremental licensing costs for each operation. The model supports cloud-managed, on-premises, and hybrid deployments with tiered support packages matched to institutional requirements.

All pricing figures in this section are marked **[CLIENT-SPECIFIC]** and will be tailored during commercial discussions based on deployment scope, asset classes, integration requirements, and support level.

---

## 7.1 Licensing Model Overview

### 7.1.1 Platform Licensing Philosophy

Institutions evaluating digital asset platforms face a pricing paradox: the very operations that make tokenization valuable, compliance checks on every transfer, identity verification for every participant, atomic settlement for every transaction, become cost drivers under transaction-based pricing models. The more an institution uses the platform as intended, the more it pays.

DALP's licensing model eliminates this tension. The platform is licensed as an annual subscription covering the full capability set, not metered by transactions, tokens, or onboarded investors. For your operations team, this means compliance checks run without cost anxiety. For your product team, new asset classes deploy without incremental licensing. For your business development team, investor growth is a business outcome, not a billing event.

The practical implications matter for budget planning. Annual costs are predictable because they are fixed to the licensing tier, not variable with operational volume. Institutions scaling from a single bond program to multi-asset operations across jurisdictions do not face step-function cost increases as transaction volumes grow. And teams iterating on compliance configurations, testing settlement workflows, or running UAT cycles do not accumulate metered charges for platform operations that are, by design, meant to be exercised frequently.

This approach reflects a structural belief: platform adoption should accelerate usage, not constrain it. Charging per operation would work against DALP's own design principles, where every transfer routes through compliance, every identity resolves through the registry, and every settlement executes atomically.

This approach reflects a structural alignment between SettleMint's incentives and institutional outcomes. A per-operation pricing model would work against DALP's own architecture, where every transfer routes through compliance, every identity resolves through the registry, and every settlement executes atomically. Charging for each of these operations would create an economic disincentive to use the platform as designed.

### 7.1.2 What the License Includes

A DALP platform license provides access to:

- **Full platform capabilities**: All five core lifecycle pillars. Issuance, Compliance, Custody integration, Settlement, and Servicing, plus the three platform foundations (Identity & Access Management, Integration & Interoperability, Observability & Operations).
- **All seven asset classes**: Bonds, equities, funds, stablecoins, deposits, real estate, and precious metals, plus the Configurable Token for custom asset types.
- **All 12 compliance module types**: From country restrictions and investor accreditation to supply limits, holding periods, and collateral backing, without per-module licensing.
- **Full API surface**: REST API (v2), type-safe RPC, GraphQL (via subgraph), event webhooks, SDK, and CLI (301 commands across 26 command groups).
- **Addon capabilities**: Vault management, XvP/DvP settlement, token sales/primary offerings, airdrop distribution, fixed yield schedules, and data feeds.
- **Observability stack**: Pre-built dashboards, three-pillar observability (metrics, logs, and distributed traces), and automated alerting.
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

**Designed for**: Institutions scaling across multiple asset classes, jurisdictions, or business lines with demanding operational and regulatory requirements.

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
- Configured compliance policies and asset templates
- Custody integration validation
- Observability and monitoring active

**Typical investment**: [CLIENT-SPECIFIC]

#### Phase 3: Integration & Testing (4–8 weeks)

**Objective**: Connect DALP to existing institutional systems and validate end-to-end workflows.

**Activities**:
- Core banking system integration (via REST API v2 or SDK)
- Payment rail connectivity (ISO 20022 integration for SWIFT/SEPA/RTGS where applicable)
- Identity provider integration for investor onboarding
- Custom webhook configuration for event-driven workflows
- End-to-end testing across issuance, compliance, transfer, settlement, and servicing workflows
- Performance testing under target transaction volumes
- Security testing and penetration testing support
- User acceptance testing with business stakeholders
- Operator training and documentation

**Deliverables**:
- Validated integrations with external systems
- End-to-end test results and performance benchmarks
- Security assessment results
- Trained operator team
- Operational runbook

**Typical investment**: [CLIENT-SPECIFIC]

#### Phase 4: Go-Live & Stabilization (2–4 weeks)

**Objective**: Launch production operations with controlled rollout and stabilization support.

**Activities**:
- Production cutover with rollback plan
- Live monitoring and incident response during stabilization period
- Performance optimization based on production telemetry
- Operator support and knowledge transfer
- Post-launch review and optimization recommendations

**Deliverables**:
- Production platform operational
- Stabilization report
- Handover to BAU support

**Typical investment**: [CLIENT-SPECIFIC]

### 7.3.2 Implementation Pricing Summary

| Phase | Duration | Investment |
|---|---|---|
| Discovery & Architecture | 2–4 weeks | [CLIENT-SPECIFIC] |
| Platform Deployment & Configuration | 4–8 weeks | [CLIENT-SPECIFIC] |
| Integration & Testing | 4–8 weeks | [CLIENT-SPECIFIC] |
| Go-Live & Stabilization | 2–4 weeks | [CLIENT-SPECIFIC] |
| **Total implementation** | **12–24 weeks** | **[CLIENT-SPECIFIC]** |

Implementation timelines vary based on:
- Deployment complexity (cloud-managed is fastest; on-premises with HSM integration takes longer)
- Integration scope (number and complexity of external system integrations)
- Compliance requirements (number of jurisdictions and custom policy needs)
- Institutional change management processes (security review, vendor onboarding, procurement)

### 7.3.3 Accelerators

SettleMint offers several accelerators that reduce implementation timelines and costs:

- **Pre-built asset templates**: Seven asset classes ship with audited contract templates, compliance configurations, and lifecycle logic, reducing custom development.
- **Jurisdictional compliance templates**: Pre-configured compliance module sets for MiCA (EU), Reg D/S/CF (US), MAS (Singapore), FCA (UK), and JFSA (Japan) regulatory frameworks.
- **Reference architectures**: Documented deployment patterns for common institutional configurations.
- **CLI operational surface (301 commands across 26 groups)**: Your integration team can validate workflows from the command line before writing a single line of integration code. The DALP CLI covers system administration, token lifecycle, identity and KYC, compliance configuration, monitoring, and all addon domains. During implementation, end-to-end test scenarios are scripted and repeatable from day one, and integration readiness does not depend on completing custom API client development first.
- **SDK with zero-dependency contract error handling**: The DALP SDK (@settlemint/dalp-sdk) publishes a contract error mirror covering all 534 platform error codes with structured metadata (severity, audience, retryable flag, suggested action). Integration code stays lightweight and error diagnostics work in any TypeScript environment, reducing the time from "transaction failed" to "understood why and know what to do" during integration testing.
- **Sandbox environments**: Pre-configured development environments for integration testing before production deployment.

---

## 7.4 Support & Maintenance Model

### 7.4.1 Support Tiers

All DALP licenses include ongoing support and maintenance. Three support tiers are available:

#### Standard Support

- **Availability**: Business hours (8:00–18:00 CET, Monday–Friday)
- **Response times**:
  - Critical (P1: production down): [CLIENT-SPECIFIC] hours
  - High (P2: major feature impaired): [CLIENT-SPECIFIC] hours
  - Medium (P3: minor feature impaired): [CLIENT-SPECIFIC] business days
  - Low (P4: general inquiry): [CLIENT-SPECIFIC] business days
- **Channels**: Dedicated support portal, email
- **Platform updates**: All releases, patches, and security updates
- **Included with**: Foundation tier

#### Premium Support

- **Availability**: Extended hours (6:00–22:00 CET, Monday–Friday) with emergency weekend coverage
- **Response times**:
  - Critical (P1): [CLIENT-SPECIFIC] hours
  - High (P2): [CLIENT-SPECIFIC] hours
  - Medium (P3): [CLIENT-SPECIFIC] business days
  - Low (P4): [CLIENT-SPECIFIC] business days
- **Channels**: Dedicated support portal, email, dedicated Slack/Teams channel
- **Platform updates**: All releases, patches, and security updates with upgrade assistance
- **Quarterly business reviews**: Platform health review, usage analysis, optimization recommendations
- **Included with**: Enterprise tier

#### Enterprise Support

- **Availability**: 24/7 with dedicated on-call SRE for critical issues
- **Response times**:
  - Critical (P1): [CLIENT-SPECIFIC] minutes
  - High (P2): [CLIENT-SPECIFIC] hours
  - Medium (P3): [CLIENT-SPECIFIC] business days
  - Low (P4): [CLIENT-SPECIFIC] business days
- **Channels**: Dedicated support portal, email, dedicated Slack/Teams channel, direct escalation path
- **Dedicated SRE engagement**: Named SRE resource with deep knowledge of the client's deployment
- **Platform updates**: Managed upgrades with pre-tested deployment in staging environments
- **Monthly business reviews**: Platform health, performance, capacity planning, and roadmap alignment
- **Custom runbook development**: Operational procedures tailored to the client's environment
- **Included with**: Sovereign/Strategic tier

### 7.4.2 Maintenance Scope

All support tiers include:

- **Platform updates**: Regular releases with new capabilities, performance improvements, and security patches
- **Security patches**: Prioritized security fixes with expedited release cycles for critical vulnerabilities
- **Smart contract upgrades**: UUPS proxy-based contract upgrades managed through the platform's upgrade framework
- **Dependency management**: Ongoing management of third-party dependencies, blockchain client compatibility, and protocol updates
- **Indexer upgrades without maintenance windows**: When platform updates change how on-chain data is indexed, DALP's indexer automatically initiates zero-downtime reindexing. A new deployment schema is provisioned, historical blocks are reprocessed in the background, and read traffic continues from the existing schema until the rebuild completes. The schema swap is atomic, applications experience no interruption and no stale data.
- **Documentation updates**: Continuously maintained product documentation via Fumadocs

### 7.4.3 What Is Excluded from Standard Maintenance

The following activities are available as additional services, not included in standard maintenance:

- Custom compliance module development
- New integration development (beyond supported custody providers and standard APIs)
- Custom smart contract development [TO VERIFY, confirm whether any contract customization is offered]
- Data migration from legacy systems
- Performance optimization for non-standard configurations
- Custom training beyond initial implementation training

---

## 7.5 Typical Cost Structures

### 7.5.1 Cost Structure by Deployment Model

DALP cost structures vary based on deployment model, tier, and institutional requirements. The following provides indicative cost categories, actual figures are [CLIENT-SPECIFIC].

#### Cloud-Managed Deployment

| Cost Category | Scope | Frequency |
|---|---|---|
| Platform license | Per tier | Annual |
| Cloud infrastructure | Kubernetes, databases, blockchain nodes, observability | Monthly |
| Implementation services | Discovery through go-live | One-time |
| Support & maintenance | Per support tier | Annual |

**Infrastructure note**: Cloud-managed deployments run on institutional cloud accounts (AWS, GCP, Azure) or SettleMint-managed cloud environments, depending on data residency and governance requirements. Infrastructure costs are pass-through and not marked up by SettleMint.

#### On-Premises Deployment

| Cost Category | Scope | Frequency |
|---|---|---|
| Platform license | Per tier | Annual |
| Infrastructure provisioning | Client-owned Kubernetes (standard distributions or Red Hat OpenShift) | Client-managed |
| Implementation services | Discovery through go-live (typically longer for on-prem) | One-time |
| Support & maintenance | Per support tier | Annual |

**Infrastructure note**: On-premises deployments require client-provisioned Kubernetes infrastructure meeting DALP's minimum specifications. SettleMint provides detailed infrastructure requirements and Helm charts for deployment. Infrastructure costs are borne by the client.

#### Hybrid Deployment

Hybrid deployments combine cloud and on-premises components, for example, non-production environments in cloud with production on-premises. Pricing follows the higher-complexity deployment model with adjustments for the split architecture.

### 7.5.2 Indicative Cost Components

For budgeting purposes, institutions should plan for the following cost components:

| Component | Typical Range | Notes |
|---|---|---|
| Production license | €25,000/month (€300,000/year, annual upfront) | Per production environment |
| Development license | €10,000/month (€120,000/year, annual upfront) | Per development/staging environment |
| Implementation (one-time) | [CLIENT-SPECIFIC] | Based on scope and complexity |
| Annual support & maintenance | [CLIENT-SPECIFIC] | Included or add-on based on tier |
| Infrastructure (annual) | [CLIENT-SPECIFIC] | Cloud costs or on-prem provisioning |
| Training (one-time) | [CLIENT-SPECIFIC] | Included in implementation or add-on |
| Custom integration development | [CLIENT-SPECIFIC] | If required beyond standard integrations |

All prices exclude applicable taxes and VAT, which are added separately based on the client's jurisdiction and applicable tax treaties. Platform license fees are invoiced annually in advance. No monthly payment option is available. For locked pricing reference, see `setup/commercial-pricing.md`.

### 7.5.3 Typical Deployment Archetypes

The following archetypes illustrate how DALP cost structures typically vary by deployment pattern. These are not quotes; they are planning frameworks for internal budgeting.

#### Archetype A: Single-Use-Case Institutional Launch

**Profile**: One regulated use case, one production environment, one custody provider, and a limited initial user base.

**Typical examples**:
- First tokenized bond issuance program
- Initial tokenized deposit or treasury pilot
- Controlled innovation program within one business line

**Commercial profile**:
- Foundation-tier annual platform license
- Standard support
- Focused implementation scope with limited integration points
- Lower infrastructure footprint, especially in cloud-managed deployment

**Primary cost drivers**:
- Initial integration with core systems and identity/KYC providers
- Compliance template configuration for the selected jurisdiction
- Security review and UAT effort driven by the institution's internal governance process

**Primary ROI drivers**:
- Faster time-to-market for the first production use case
- Avoided internal build cost for tokenization infrastructure
- Reduced operational overhead in issuance and settlement workflows

#### Archetype B: Multi-Asset Enterprise Program

**Profile**: One institution scaling across multiple asset classes, multiple environments, and multiple internal stakeholders.

**Typical examples**:
- Bank expanding from bonds into deposits and funds
- Custodian or market infrastructure provider supporting multiple issuers
- Institution operating across more than one jurisdiction or business unit

**Commercial profile**:
- Enterprise-tier annual platform license
- Premium support
- Broader implementation scope including multiple integrations and environment promotion workflows
- Expanded observability and platform administration requirements

**Primary cost drivers**:
- Multi-environment release management and operational controls
- Additional custody-provider and payment-rail integration scope
- More complex access control, onboarding, and reporting requirements

**Primary ROI drivers**:
- Reuse of one platform, one integration model, and one compliance operating model across multiple programs
- Consolidation of previously distributed vendor and tooling spend into a single platform
- Faster launch of subsequent asset classes after the first implementation

#### Archetype C: Sovereign or National-Scale Deployment

**Profile**: National infrastructure, strategic market program, or highly regulated multi-entity environment requiring dedicated operational support and stricter governance.

**Typical examples**:
- National real estate tokenization infrastructure
- Sovereign-backed digital asset platform
- Multi-entity financial market program with regional or national significance

**Commercial profile**:
- Sovereign/Strategic-tier annual platform license
- Enterprise support with dedicated engagement model
- Extended implementation phase due to governance, security, and stakeholder alignment
- Potentially multi-region infrastructure with stronger business continuity requirements

**Primary cost drivers**:
- Stakeholder coordination across ministries, regulators, market operators, and technology teams
- High assurance requirements for security, resilience, and auditability
- More demanding non-functional requirements and production acceptance criteria

**Primary ROI drivers**:
- Infrastructure reuse across multiple public-sector or market participants
- Avoided cost and risk of building bespoke national infrastructure from scratch
- Strategic control over deployment, governance, and regulatory operating model

### 7.5.4 Total Cost of Ownership Considerations

The most common pricing comparison mistake in digital asset platform evaluation is treating DALP as a line item against another software subscription. That comparison misses the real cost question: what does it cost to assemble, integrate, and operate separate vendors for each lifecycle stage, and what does that assembled model cost over three to five years?

Institutions that build tokenization capabilities from component vendors typically engage separate providers for token issuance contracts, compliance rule enforcement, identity and credentialing orchestration, custody integration, settlement coordination, observability, and API integration. Each vendor relationship carries direct costs (licensing, support, professional services) and indirect costs that compound over time: five procurement cycles instead of one, cross-vendor incident resolution where three providers blame each other at 2 a.m., duplicate integration work where each system speaks a different API dialect, inconsistent audit trails that force manual reconciliation before regulatory examinations, and release coordination across independently evolving components that nobody owns end to end.

The indexing layer illustrates the pattern concretely. Many platforms depend on external indexing infrastructure, hosted Graph Protocol nodes, third-party data aggregation services, or cloud-specific indexing products, to make on-chain data queryable. Each introduces ongoing subscription costs, query rate limits, provider-specific SLAs, and operational dependencies outside the institution's control. DALP eliminates this dependency category entirely: the platform's owned indexer runs within the same Kubernetes deployment, processes all on-chain events into PostgreSQL read models, and performs zero-downtime reindexing when schema changes occur. No external service subscriptions, no query metering, no provider outage risk propagating into the data layer. For institutions subject to DORA's ICT third-party risk requirements or similar regulatory expectations around infrastructure control, owning the indexing layer is both a cost advantage and a governance advantage.

These indirect costs are often invisible during initial vendor selection because they emerge gradually. The first integration works. The second requires workarounds. By the fourth, the integration layer has become a maintenance burden that absorbs engineering time originally budgeted for business logic.

DALP's commercial model collapses this complexity into a single governed platform layer. One contract, one security review, one integration project, one support relationship, one consistent audit trail. For most institutions, the TCO argument is strongest when DALP replaces or avoids the need to assemble multiple partial systems, not when it is compared against a single-purpose issuance tool.

---

## 7.6 ROI Framework

### 7.6.1 Value Drivers

DALP delivers measurable ROI across several dimensions. The following framework helps institutions quantify the business case for DALP adoption.

#### Operational Efficiency Gains

| Value Driver | Mechanism | What Your Institution Gains |
|---|---|---|
| Settlement cycle elimination | Atomic DvP/XvP settles both legs simultaneously or reverts both. No counterparty risk window exists during settlement. | T+0 finality replaces T+2 clearing. Collateral previously locked during settlement cycles becomes available for redeployment. Your operations team stops reconciling asset and cash ledgers because there is one ledger, not two systems to synchronize. |
| Compliance automation | 18 module types enforce eligibility before execution. Your compliance officers configure rules through the platform; no smart contract code changes required. | Manual review queues shrink because non-compliant transfers never execute, so there is nothing to catch after the fact. Your compliance team shifts from transaction-by-transaction review to policy configuration and exception monitoring. |
| Corporate action processing | Coupon payments, yield distributions, and maturity redemptions execute programmatically. Token holders claim distributions directly through smart contracts. | Your operations team stops exporting holder lists to spreadsheets, calculating pro-rata payments, generating wire instructions, and reconciling which payments cleared. The platform handles calculation, execution, and evidence in one operation. |
| Reconciliation reduction | For fully on-chain programs (both asset and cash legs on-chain), the single registry eliminates parallel-ledger reconciliation entirely. For hybrid programs where off-chain cash systems persist, reconciliation scope narrows to the cash interface boundary rather than spanning the full ownership chain. | Nightly batch reconciliation between CSD records, transfer agent databases, and internal ledgers shrinks dramatically. Audit preparation shifts from compiling reports across multiple systems to querying one platform for the on-chain scope, with a defined boundary for off-chain integration points. |

#### Revenue Enablement

| Value Driver | Typical Impact | How DALP Delivers |
|---|---|---|
| Investor base expansion | 3–5x increase in participation | Fractionalization enables lower minimums ($10K–$100 vs traditional $100K+) |
| New asset class launch speed | 60–80% faster | Pre-built templates, compliance modules, and reference architectures reduce time-to-market from months to weeks |
| Cross-border market access | New markets accessible | Jurisdictional compliance templates (MiCA, Reg D/S, MAS, FCA, JFSA) enable multi-jurisdiction operations |
| 24/7 market access | Extended trading hours | On-chain settlement operates continuously, not limited to market hours |

#### Risk Reduction

| Value Driver | Typical Impact | How DALP Delivers |
|---|---|---|
| Compliance violation prevention | Eliminated at execution layer | Ex-ante enforcement prevents non-compliant transfers from executing, no immutable on-chain evidence of violations |
| Counterparty risk elimination | Eliminated for on-chain legs | Atomic settlement ensures both legs complete or both revert |
| Platform simplification | Single platform vs assembling 3–5 separate tools | Full lifecycle coverage reduces integration risk, SLA complexity, and incident accountability gaps |
| Audit burden reduction | Significant reduction | Immutable audit trails, structured event history, and compliance evidence built into every operation |

#### Cost Avoidance

| Value Driver | Typical Impact | How DALP Delivers |
|---|---|---|
| Build vs. buy savings | 12–24 months of development avoided | DALP provides capabilities that would require significant engineering investment to build in-house |
| Multi-vendor integration costs | Eliminated | Single platform replaces separate issuance, compliance, custody orchestration, and settlement solutions |
| Ongoing maintenance burden | Reduced by 50–70% | Platform updates, security patches, and smart contract upgrades managed by SettleMint |

### 7.6.2 ROI Calculation Framework

Institutions can estimate DALP ROI using the following framework:

**Step 1: Quantify Current Costs**
- Annual cost of manual compliance review processes
- Settlement operations team costs (reconciliation, exception handling)
- Corporate actions processing costs (coupon calculations, distributions)
- Multi-vendor licensing and integration maintenance costs
- Internal development team costs for blockchain/tokenization initiatives

**Step 2: Estimate DALP-Enabled Savings**
- Apply efficiency percentages from Section 7.6.1 to current costs
- Account for platform simplification savings
- Factor in reduced integration maintenance

**Step 3: Quantify Revenue Uplift**
- Estimate new investor participation from fractionalization
- Estimate time-to-market acceleration for new products
- Quantify value of expanded market access

**Step 4: Calculate Net ROI**
- Total savings + revenue uplift − DALP total cost of ownership
- Typical payback period: [CLIENT-SPECIFIC], but institutions with significant manual operations or multi-vendor stacks typically see positive ROI within [CLIENT-SPECIFIC]

### 7.6.3 ROI Measurement Categories

To make ROI discussions concrete, SettleMint recommends that clients baseline current-state costs across six measurable categories:

1. **Program launch costs**
   - Internal engineering effort to stand up tokenization capabilities
   - Architecture and security review effort
   - Time spent coordinating external vendors

2. **Operational processing costs**
   - Manual compliance review and exception handling
   - Settlement reconciliation and break investigation
   - Corporate action administration

3. **Infrastructure and vendor costs**
   - Current spend on multiple point solutions
   - Cloud and node infrastructure across separate environments
   - Support contracts across multiple providers

4. **Risk and control costs**
   - Audit preparation effort
   - Incident response coordination effort
   - Cost of control gaps caused by disconnected systems

5. **Revenue enablement benefits**
   - Faster launch of new instruments or jurisdictions
   - Expanded investor reach through fractionalization or improved accessibility
   - Increased operational capacity without linear headcount growth

6. **Strategic option value**
   - Ability to launch additional asset classes on the same platform
   - Ability to support multiple business lines without re-platforming
   - Reduced dependency on custom internal engineering for every new digital asset initiative

This structure helps avoid a common procurement mistake: evaluating DALP only as a software line item instead of as the enabling infrastructure for a broader operating model.

### 7.6.4 Illustrative ROI Logic by Deployment Type

#### Bank launching a first regulated asset program

A bank launching its first production tokenization program typically realizes value first through **faster launch and lower implementation risk** rather than immediate large-scale cost elimination. In that scenario, the ROI case is usually built on:

- Avoided internal build effort across issuance, compliance, settlement, and operational tooling
- Faster readiness for production compared with custom development
- Reduced need to procure and integrate multiple specialized vendors
- Stronger control posture from day one through built-in auditability and ex-ante compliance

The right commercial lens here is often **cost avoidance plus speed-to-market**.

#### Institution scaling from one use case to multiple programs

Once an institution expands from one digital asset program to multiple products or business lines, the ROI logic shifts. The value is no longer only in launching faster, it is in **reusing the same platform, policies, and operating model**.

That typically produces:
- Lower marginal cost for each new asset program
- Reuse of investor identity and compliance credentials across products
- Reuse of custody, monitoring, and operational tooling
- A simpler audit and risk narrative because controls stay consistent across programs

In this model, DALP becomes more valuable over time because the platform amortizes across more use cases.

#### Market infrastructure or sovereign-scale deployment

For large-scale or strategic deployments, ROI is often broader than straightforward cost savings. The value case usually combines:

- Infrastructure control and sovereignty
- Reduced ecosystem complexity and coordination overhead
- Better interoperability across market participants
- Lower long-term operational risk versus bespoke infrastructure
- Faster onboarding of additional participants once the core platform is established

That is why sovereign and strategic programs often justify platform investment not just as IT spend, but as **market infrastructure enablement**.

### 7.6.5 Production Proof Points

ROI projections are grounded in SettleMint's production deployments across multiple regions and use cases:

**OCBC corporate bond program (live since January 2025, Singapore).** One of Southeast Asia's largest banks launched a tokenized corporate bond program on DALP, fractionalized to SGD 10,000 minimum investment compared to typical SGD 250,000 minimums in traditional bond markets. The deployment demonstrates automated compliance enforcement under MAS regulatory frameworks, programmatic coupon processing, and streamlined settlement operations. The program has operated continuously under institutional SLAs since launch.

**Middle East supply chain financing.** A regional financial institution deployed DALP for tokenized supply chain finance instruments with T+0 settlement, fractional participation from USD 10,000, and automated lifecycle management across the financing cycle. The deployment replaced a multi-vendor integration approach with a single platform covering issuance, compliance, and settlement.

**Saudi RER national real estate program (live since January 2026).** DALP powers the Real Estate Registry's digital infrastructure for processing real property transactions at national scale. This sovereign-level deployment demonstrates platform operation under Saudi Capital Market Authority regulatory requirements and provides direct evidence of institutional and regulatory acceptance for the Gulf region.

**Multi-year bank deployments (Asia and Europe).** SettleMint maintains 7+ years of continuous production operation at regulated banks. These long-lived deployments have matured from initial innovation programs into business-critical infrastructure under IT ownership, directly validating DALP's operational sustainability, upgrade management, and institutional-grade reliability over multi-year horizons.

These are production references, not pilots. Each operates under real regulatory obligations, real investor participation, and real operational accountability.

---

## 7.7 Commercial Terms Summary

### 7.7.1 Contract Structure

A typical DALP engagement includes:

| Component | Term | Notes |
|---|---|---|
| Platform license agreement | Annual, renewable | Multi-year commitments with [CLIENT-SPECIFIC] terms available |
| Implementation services | Fixed-price or T&M | Based on scope; typically fixed-price for defined scope |
| Support & maintenance agreement | Annual, co-terminus with license | Included or add-on based on tier |
| Custom development (if applicable) | Statement of work | Scoped and priced separately |

### 7.7.2 Payment Terms

- Platform license: [CLIENT-SPECIFIC] (typically annual in advance or quarterly)
- Implementation services: [CLIENT-SPECIFIC] (typically milestone-based)
- Support & maintenance: [CLIENT-SPECIFIC] (typically annual in advance)

### 7.7.3 Renewal Terms

- License renewals are priced at [CLIENT-SPECIFIC] of the then-current list price
- Multi-year commitments receive [CLIENT-SPECIFIC] pricing consideration
- Early renewal commitments may qualify for [CLIENT-SPECIFIC] terms

### 7.7.4 Escrow and Continuity

SettleMint offers source code escrow arrangements for institutions requiring business continuity assurance. [TO VERIFY, confirm escrow offering details and partners]

---

## 7.8 Next Steps

To develop a client-specific commercial proposal, SettleMint recommends the following process:

1. **Scoping workshop** (1–2 days): Align on use case priorities, deployment requirements, integration landscape, and compliance context.
2. **Architecture proposal**: Detailed solution architecture document with deployment and integration specifications.
3. **Tailored commercial proposal**: Client-specific pricing across license, implementation, and support based on scoping workshop outputs.
4. **Proof of value** (optional): Time-boxed technical validation in a sandbox environment to demonstrate DALP capabilities against specific requirements.

Contact your SettleMint account team to initiate the scoping process.
