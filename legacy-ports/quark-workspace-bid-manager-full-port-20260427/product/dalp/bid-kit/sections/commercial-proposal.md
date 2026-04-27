# Commercial Proposal

This section sets out the commercial framework for the proposed DALP engagement. It is intended to support formal evaluation, contracting, and budget planning without disclosing confidential pricing, internal cost structure, or non-public commercial terms. Where this proposal references commercial schedules, those schedules should be completed in the final order form, service schedule, or contract annexes.

SettleMint offers DALP as a platform subscription and deployment-supported product engagement. The proposal is structured around product licensing, deployment model, implementation method, support coverage, and lifecycle governance. It is not based on custom software development or open-ended consulting.

---

## Commercial approach

Institutions evaluating digital asset infrastructure usually face the same problem: the complexity of doing it right — meeting regulatory, governance, and operational requirements across the full asset lifecycle — makes cost, accountability, and risk difficult to control. SettleMint addresses that problem by offering DALP as a unified digital asset lifecycle platform with a clear commercial structure.

The commercial model in this proposal is built on five principles:

- product licensing over bespoke development
- deployment flexibility aligned to regulatory and operating needs
- phased implementation with defined handoff points
- support and service commitments matched to deployment criticality
- transparent commercial schedules with clear inclusions, exclusions, and assumptions

This structure gives the client a contract model that can pass procurement review, support internal budgeting, and scale from initial deployment to production operations without changing commercial logic mid-program.

---

## Why SettleMint

SettleMint's commercial value is tied to one core fact: DALP is designed as lifecycle infrastructure, not as a narrow issuance tool and not as a collection of loosely connected point products. That matters commercially because assembling digital asset infrastructure from multiple point solutions creates duplicated licensing, duplicated integration effort, duplicated vendor management, and unclear operational accountability.

DALP consolidates issuance, compliance, custody orchestration, settlement, servicing, auditability, and operations into one platform with one governance model and one operating framework. The result is a simpler procurement footprint, fewer interfaces to own, faster path to operational readiness, and lower long-term coordination cost.

From a buyer's perspective, the SettleMint proposition is straightforward:

- one platform for the full digital asset lifecycle
- one commercial framework across asset classes, workflows, and environments
- one support model for the DALP product scope
- deployment options that fit SaaS, dedicated cloud, or self-hosted requirements
- productized implementation and handoff rather than indefinite custom-build dependence

This is the commercial advantage of a platform approach. It reduces operational complexity, shortens time to value, and maintains a single accountable vendor throughout the full program lifecycle.

---

## Licensing model overview

DALP is licensed as a subscription platform for the client's internal business use during the agreed subscription term. The licensing approach should be reflected in the final order form and associated service schedules.

### Licensing principles

The licensing structure should follow these principles:

- limited, non-exclusive, non-transferable, non-sublicensable right to access and use DALP during the subscription term
- use restricted to the client's internal business operations and approved affiliates or authorized users where expressly agreed
- no transfer of SettleMint intellectual property in the platform, platform documentation, or platform tooling
- client ownership of client data and client-developed smart contracts, subject to SettleMint ownership of platform templates, modules, libraries, and tooling incorporated into the platform environment
- platform usage governed by documented license restrictions, acceptable use obligations, and security obligations

### Licensing scope structure

The final commercial schedule should define licensing scope using a combination of the following dimensions, as applicable to the bid:

| Licensing dimension | Placeholder structure | Notes |
| --- | --- | --- |
| Platform edition | `[Edition / package name]` | Defines included modules and enterprise entitlements |
| Deployment model | `[Managed SaaS / dedicated cloud / self-hosted]` | Drives hosting, support boundary, and responsibility split |
| Environment scope | `[Production / non-production / sandbox]` | Should specify how many environments are included |
| Organizational scope | `[Legal entity / business unit / consortium scope]` | Needed for procurement and access governance |
| User scope | `[Named users / role bands / tenant scope]` | Must align with the security and operating model |
| Asset or use-case scope | `[Initial asset classes / workflow modules]` | Useful for phased adoption without changing platform logic |
| Optional capabilities | `[Add-on modules]` | For advanced functions where commercially separated |

### Platform, not custom development

This proposal is based on DALP as a product platform. It does not assume a custom-built solution owned by the client, nor does it assume bespoke feature delivery as part of baseline license fees. Where client-specific integration, migration, or configuration work is needed, that work should be captured as a defined implementation service, onboarding package, or separate statement of work.

That distinction matters. It protects both parties from an ambiguous commercial model where product subscription and project services become blurred. DALP is the product foundation. Any non-standard services should be contracted separately, scoped explicitly, and governed through change control.

### Intellectual property treatment

The commercial structure should preserve the following IP boundaries:

- SettleMint retains ownership of DALP, associated software, documentation, and platform technology
- the client retains ownership of its data, policies, configurations, and business content
- smart contracts developed and deployed by the client using the platform remain the client's property, while embedded platform tooling and reusable platform components remain owned by SettleMint or its licensors
- feedback, enhancement requests, and recommendations may be used by SettleMint to improve the platform in line with final contract language

### License restrictions structure

The final contract should include standard restrictions covering, at minimum:

- reverse engineering and derivative platform creation
- resale, sublicensing, or unauthorized third-party access
- use to build a competing service
- unlawful or non-compliant use
- interference with platform integrity, availability, or security
- automated extraction outside published interfaces and agreed rate limits

---

## Deployment options and commercial implications

DALP supports multiple deployment models. The right commercial structure depends on the client's regulatory posture, data residency obligations, operational maturity, and internal platform ownership model.

### Managed SaaS

In a managed SaaS model, SettleMint operates DALP as a managed service and the client consumes the platform under subscription terms.

This model is typically the fastest path to value because infrastructure ownership, platform operation, and baseline service management sit primarily with SettleMint. It is often appropriate where the client wants rapid rollout, limited infrastructure burden, and a cleaner operational model.

Commercial implications usually include:

- subscription fee covering platform access and managed service entitlement
- defined production and non-production environment scope
- SettleMint responsibility for platform hosting, platform availability, upgrades, and core operational management within the agreed service boundary
- client responsibility for business configuration, user administration, and external dependencies under its control
- service levels tied directly to the managed platform scope

This model generally reduces internal infrastructure cost and shortens implementation time, but it also requires clear agreement on tenant separation, data residency, maintenance windows, and integration connectivity.

### Dedicated cloud

In a dedicated cloud model, DALP is deployed in a client-dedicated environment, usually to meet isolation, governance, residency, or institutional control requirements without moving to full self-hosting.

This model suits institutions that need stronger environmental segregation, tighter network control, or cloud account governance while still expecting SettleMint to manage the DALP application layer.

Commercial implications usually include:

- platform subscription fee
- dedicated environment or dedicated tenant surcharge structure
- cloud infrastructure and managed service cost treatment, either bundled or client-provided depending on the bid
- clearer allocation of network, security, and connectivity responsibilities
- support and SLA structure that distinguishes platform incidents from client-cloud incidents

This model often gives the best balance between control and operational simplicity. It is usually preferred when a pure multi-tenant SaaS model is not acceptable but the client does not want to own the full Kubernetes and platform engineering burden.

### Self-hosted or on-premises

In a self-hosted or on-premises model, DALP runs in the client's own Kubernetes or OpenShift environment. SettleMint provides tested Helm charts, container images, installation support, and post-deployment setup for the DALP platform scope, while the client retains operational control of the target environment.

This model is suited to clients with strict data sovereignty rules, internal infrastructure mandates, or established platform engineering teams.

Commercial implications usually include:

- platform subscription fee for self-hosted entitlement
- implementation and deployment support package
- optional higher support tier because infrastructure diagnosis requires a defined joint operating model
- explicit responsibility matrix for Kubernetes, managed services, DNS, TLS, observability hosting, backup configuration, and cloud accounts
- client ownership of infrastructure cost, cluster operations, and managed service provision

The DALP documentation is explicit that self-hosting requires experienced Kubernetes or OpenShift operators. That operational burden should be reflected in the commercial discussion, not hidden. A self-hosted model gives maximum control, but it also increases client-side run cost, staffing requirements, and change coordination effort.

### Commercial comparison summary

| Deployment model | Typical buyer priority | SettleMint commercial scope | Client commercial scope |
| --- | --- | --- | --- |
| Managed SaaS | Speed, simplicity, lower ops burden | Platform, hosting, operations within SLA boundary | Business operations, integrations, client dependencies |
| Dedicated cloud | Isolation, control, institutional governance | Platform plus dedicated environment management as agreed | Cloud governance, connectivity, client-owned dependencies as agreed |
| Self-hosted / on-premises | Sovereignty, internal control, regulatory ownership | Platform license, installation support, product support | Infrastructure, cluster operations, managed services, operational staffing |

### Deployment-specific assumptions to capture

The proposal should include a deployment assumptions schedule covering:

- target environment model
- required environments and separation rules
- data residency location or hosting perimeter
- availability target and recovery expectations
- external dependency model, including custody, identity, payment, and network services
- maintenance window rules
- responsibility split for monitoring, backups, and incident response

---

## Implementation approach and phasing

The commercial model assumes a standard implementation method for DALP, tailored through configuration and controlled integration, not through uncontrolled custom development.

### Standard implementation philosophy

Institutions do not need an improvised delivery model for regulated digital asset infrastructure. They need a repeatable method that gets the platform live, proves controls, and transfers ownership cleanly to the target operating teams.

SettleMint's implementation framework should therefore be structured around standard phases, standard deliverables, and standard acceptance criteria.

### Proposed implementation phases

| Phase | Objective | Typical commercial treatment |
| --- | --- | --- |
| Mobilization and solution confirmation | Confirm scope, dependencies, target deployment model, governance, and success criteria | Fixed onboarding package or defined implementation milestone |
| Environment and platform deployment | Stand up environments, validate prerequisites, deploy core DALP services | Milestone-based implementation fee |
| Platform configuration and integration | Configure organizational structure, policies, workflows, and agreed interfaces | Milestone-based implementation fee |
| Asset and process enablement | Configure initial asset classes, compliance settings, and operational workflows | Milestone-based implementation fee |
| Validation and readiness | Execute functional, security, and operational validation; confirm handoff readiness | Milestone-based implementation fee |
| Go-live and hypercare | Controlled production cutover and early-life support | Time-bound go-live support package |

### Phase detail

#### Mobilization and solution confirmation

This phase aligns the project around the agreed deployment model, in-scope capabilities, business assumptions, and acceptance criteria. Commercially, this phase prevents ambiguity before significant deployment or integration effort begins.

Typical outputs include:

- agreed delivery governance and reporting cadence
- final scope baseline
- dependency and responsibility matrix
- environment and access checklist
- implementation plan and cutover principles

#### Environment and platform deployment

For managed deployments, this phase covers environment provisioning and DALP baseline configuration. For self-hosted deployments, it covers pre-installation verification, chart deployment, and SettleMint-owned post-deployment setup such as contract deployment, subgraph configuration, and platform wiring.

DALP documentation indicates a typical self-hosted installation path of roughly 2 to 4 business days once prerequisites are complete. That supports a milestone-based commercial structure rather than open-ended time and materials for standard deployments.

#### Platform configuration and integration

This phase covers tenant setup, access configuration, business workflow enablement, and agreed interfaces to surrounding systems. The commercial model should separate standard platform configuration from non-standard integration complexity.

A practical structure is:

- standard onboarding included in base implementation package
- defined integration work packages for each external system category
- separate treatment for custom adapters, if any are approved

#### Asset and process enablement

This phase prepares the first production use case. It focuses on making the first asset type and first operational process work end to end under controlled governance.

Commercially, the purpose is to reach an auditable first live operating capability, not to configure every future use case before value is realized.

#### Validation and readiness

This phase confirms technical, operational, and governance readiness. It should include validation of availability monitoring, auditability, backup posture, access controls, and agreed production support handoff.

#### Go-live and hypercare

A time-bound hypercare period should follow first production activation. This period gives operations teams a defined escalation path while usage patterns stabilize and early operational issues are resolved quickly.

### Acceptance structure

Each phase should have explicit entry and exit criteria. The commercial schedule should tie milestone acceptance to objective deliverables rather than informal satisfaction. Typical acceptance points include:

- prerequisites verified
- environment operational
- agreed integrations validated
- agreed test scenarios passed
- support contacts and escalation paths confirmed
- production handoff package delivered

---

## Training and knowledge transfer

A successful DALP deployment requires more than technical installation. It requires the client's operations, compliance, platform, and administrative teams to understand how to run the platform safely.

### Training objectives

The training and knowledge transfer package should equip the client to:

- administer the DALP environment within the agreed operating model
- operate day-to-day business workflows confidently
- manage users, roles, and approvals
- interpret operational dashboards, alerts, and audit records
- engage support efficiently with the right evidence and escalation path
- own post-go-live continuity within the boundaries of the chosen deployment model

### Training framework

The commercial section should structure training into role-based workstreams.

| Audience | Focus area | Typical output |
| --- | --- | --- |
| Platform administrators | Environment overview, access model, configuration controls | Admin enablement sessions and runbook familiarization |
| Operations teams | Asset workflows, approvals, settlement monitoring, exception handling | Operational process walkthroughs |
| Compliance teams | Identity, policy controls, audit visibility, approval evidence | Compliance workflow sessions |
| Support or service desk teams | Incident triage, evidence gathering, escalation preparation | Support readiness guide |
| Technical integration teams | APIs, events, environment conventions, testing approach | Technical handoff workshop |

### Knowledge transfer assets

Knowledge transfer should include a controlled handoff pack such as:

- solution overview and environment inventory
- endpoint inventory and access references
- role and responsibility matrix
- runbook references
- support model and escalation guide
- upgrade and maintenance governance overview

### Delivery approach

A practical structure is:

- training preparation and agenda confirmation
- live workshops by role group
- recorded or repeatable enablement materials where permitted
- post-training Q and A window
- formal handoff confirmation

Commercially, training should be treated as a defined package with named sessions, target audiences, and expected outputs. That keeps enablement measurable and avoids the common failure mode where knowledge transfer is assumed but never actually completed.

---

## Support tiers and SLA framework

Support coverage should be aligned to business criticality, deployment model, and operating hours. The final contract should define service tiers, incident classes, response targets, communication rules, and exclusions.

DALP's operational posture and supporting documentation demonstrate a platform designed for continuous operation, with audit trails, transaction durability, observability, and defined support ownership boundaries. The commercial schedule should translate that technical posture into a support framework the client can govern.

### Support model principles

The support structure should:

- distinguish platform support from infrastructure support
- distinguish incident response from feature requests and advisory work
- define severity clearly and align it to business impact
- define first-response and update obligations separately
- define service hours and optional extended coverage
- define client obligations for triage, evidence, and authorized contacts

### Example support tier structure

| Tier | Intended use | Typical coverage shape |
| --- | --- | --- |
| Standard | Non-critical or business-hours operations | Business-hours support, defined response targets |
| Extended | Production environments with broader operational window | Extended-hours support, faster response, stronger governance cadence |
| Premium / mission-critical | High-value production environments | Priority response, tighter targets, named governance, enhanced escalation |

### Example severity model

| Severity | Example definition | Response target placeholder | Update cadence placeholder |
| --- | --- | --- | --- |
| Severity 1 | Production service unavailable or critical business function blocked with no workaround | `[S1 response]` | `[S1 update cadence]` |
| Severity 2 | Major degradation affecting important functions with limited workaround | `[S2 response]` | `[S2 update cadence]` |
| Severity 3 | Moderate issue with workaround available or limited user impact | `[S3 response]` | `[S3 update cadence]` |
| Severity 4 | Low-impact issue, information request, or cosmetic defect | `[S4 response]` | `[S4 update cadence]` |

### Availability target structure

For managed deployments, availability commitments should be stated against the agreed production service boundary and measurement window.

A typical structure is:

- production service availability target: `[Availability target %]`
- measurement period: `[Monthly / quarterly]`
- excluded downtime: agreed maintenance windows, emergency security actions, client-caused outages, upstream blockchain failures, force majeure, and excluded third-party dependency failures
- service credit regime: if offered, described in a dedicated SLA annex

The DALP executive overview cites 99.9% availability as the expected production posture for enterprise operations. That is a credible basis for framing a managed-service target, but the contract should still define precisely what is being measured and excluded.

### Escalation framework

The support framework should include:

- designated client support contacts
- service desk or support intake path
- escalation path for unresolved incidents
- executive escalation path for critical events
- post-incident review threshold and timeline

### Support boundary by deployment model

| Topic | Managed SaaS | Dedicated cloud | Self-hosted / on-premises |
| --- | --- | --- | --- |
| DALP application support | SettleMint | SettleMint | SettleMint |
| Hosting platform operations | SettleMint | As agreed | Client |
| Kubernetes / OpenShift operations | SettleMint or not applicable | As agreed | Client |
| Managed database / Redis / object storage operations | SettleMint or as bundled | Shared or client-owned depending on model | Client |
| Client network, SSO, and enterprise dependencies | Client | Client | Client |
| Blockchain network availability outside DALP control | Excluded third-party dependency | Excluded third-party dependency | Excluded third-party dependency |

This boundary is essential. DALP product support is not the same as operating every external dependency in the client's architecture.

---

## Warranty and maintenance terms structure

The final contract should distinguish between product warranty, routine maintenance, and paid enhancement work.

### Warranty framework

The DALP terms state that during the subscription term, the platform will perform materially in accordance with the applicable documentation. The proposed commercial structure should mirror that position.

A standard warranty clause should therefore include:

- warranty that DALP will perform materially in accordance with the applicable documentation during the subscription term
- remedies limited to repair, replacement, or other contractually agreed remedy for the affected non-conforming feature, and where applicable a pro-rata fee remedy aligned to final terms
- exclusions for misuse, unauthorized modification, unsupported environments, third-party failures, or client-controlled infrastructure issues

### Important boundary conditions

The warranty structure should explicitly acknowledge that SettleMint does not control the underlying blockchain networks on which digital assets are deployed. Availability, security, congestion, forks, or finality issues at blockchain-network level sit outside the DALP product warranty boundary.

That is not a weakness in the commercial model. It is the right institutional framing. The platform can guarantee its own controls, workflows, and documented behavior; it cannot guarantee the behavior of external networks beyond its control.

### Maintenance framework

Routine maintenance terms should define:

- standard product updates and security patches
- maintenance release categories
- planned maintenance windows and notice periods
- client responsibilities for testing in self-hosted deployments
- version support policy and upgrade eligibility

For managed deployments, SettleMint should own routine platform maintenance within agreed windows. For self-hosted deployments, SettleMint should provide chart updates, migration guidance, and product remediation within support scope, while the client owns execution in its infrastructure unless otherwise agreed.

### Maintenance categories

| Maintenance category | Typical scope | Commercial treatment |
| --- | --- | --- |
| Corrective maintenance | Defect correction and service restoration | Included in support for covered issues |
| Adaptive maintenance | Compatibility updates for supported environments | Included subject to version policy |
| Preventive maintenance | Security patching and resilience improvements | Included within supported versions |
| Enhancement work | New scope, new features, non-standard changes | Separate roadmap or statement of work |

---

## Change management approach

Commercial stability depends on controlled change. Digital asset programs often fail commercially when scope expands informally across integration, policy, reporting, and operational requests without any decision framework.

### Change control principles

The proposal should adopt a formal change process that:

- preserves the integrity of the baseline scope
- distinguishes product configuration from new delivery scope
- allows changes to timeline, cost, or dependency ownership to be assessed before approval
- prevents support channels from becoming a back door for unpaid project scope

### Change request categories

| Change type | Typical example | Treatment |
| --- | --- | --- |
| Configuration refinement | Minor adjustment within agreed scope | Managed within implementation governance where feasible |
| Scope extension | New integration, new workflow, additional environments | Formal change request |
| Commercial change | Additional users, entities, modules, or support tier | Contract amendment or order-form change |
| Regulatory or mandatory control change | Required policy or legal update impacting configuration | Assessed under agreed governance and priority rules |

### Change process

A practical change process should include:

1. request logging and initial classification
2. impact assessment across scope, timeline, cost, and dependencies
3. commercial treatment proposal
4. approval by authorized parties
5. implementation scheduling
6. closure and baseline update

This is especially important where the initial deployment is phased. It lets the client start with a defined production objective while retaining a clean path to later expansion.

---

## Commercial terms structure

This proposal intentionally omits actual prices and proprietary rate cards. The final commercial package should instead be completed through a pricing schedule built around standard components.

### Suggested pricing schedule structure

| Commercial component | Placeholder |
| --- | --- |
| Platform subscription fee | `[Subscription fee structure]` |
| Deployment model uplift, if any | `[Managed / dedicated / self-hosted adjustment]` |
| Non-production environment fee, if any | `[Environment pricing structure]` |
| Initial implementation package | `[Implementation fee]` |
| Training and knowledge transfer package | `[Training package fee]` |
| Hypercare package | `[Hypercare fee]` |
| Support tier fee | `[Support tier fee]` |
| Optional modules or add-ons | `[Add-on schedule]` |
| Optional integration packages | `[Integration package schedule]` |
| Travel and expenses, if applicable | `[T&E treatment]` |

### Order form structure

The order form or commercial schedule should also specify:

- subscription term and renewal mechanics
- invoicing cadence
- payment terms
- taxes treatment
- authorized entities and affiliates, where applicable
- deployment model and environment list
- support tier and service schedule references
- assumptions and exclusions

### Inclusions and exclusions

Every commercial proposal should include a short schedule of what is included and what is excluded.

Typical inclusions may cover:

- DALP platform entitlement
- standard deployment package
- standard documentation access
- agreed support tier
- defined training sessions

Typical exclusions may cover:

- client infrastructure costs
- third-party software or cloud charges unless bundled
- client-side project management and test resources
- non-standard integration development
- legal, tax, or regulatory advisory work
- unsupported environment troubleshooting outside agreed scope

### Commercial assumptions

To avoid downstream disputes, the proposal should state key assumptions such as:

- timely client provision of environments, credentials, and approvals
- availability of designated client stakeholders for workshops, testing, and acceptance
- use of supported infrastructure and deployment patterns
- no material scope expansion outside the defined use case without change approval

---

## Total cost of ownership considerations

Procurement decisions on digital asset platforms should not be made on subscription price alone. The right economic comparison is total cost of ownership across licensing, deployment, operations, support, vendor management, and change overhead.

### Main TCO drivers

| TCO driver | What to evaluate |
| --- | --- |
| Platform footprint | Number of vendors and contracts required to achieve production scope |
| Integration burden | Number of interfaces to build, test, monitor, and maintain |
| Operational staffing | Platform, DevOps, security, support, and compliance effort required to run the solution |
| Change cost | Effort required to add new asset types, jurisdictions, or workflows |
| Support complexity | Number of parties involved in incident triage and root cause analysis |
| Infrastructure model | Cost difference between SaaS, dedicated cloud, and self-hosted ownership |
| Compliance evidence cost | Effort required to prove control operation, approvals, and auditability |

### How DALP affects TCO

DALP typically improves TCO in five ways:

- fewer vendors to procure and manage
- fewer interfaces to design and support
- lower reconciliation burden because core lifecycle functions operate in one platform
- faster rollout of additional use cases using the same governance and operating model
- lower operational ambiguity during incidents because accountability is clearer

### Deployment model effect on TCO

Managed SaaS generally lowers client-side TCO in infrastructure and operational staffing. Dedicated cloud increases environmental control with a moderate operational premium. Self-hosted often has the highest internal TCO because the client assumes cluster operations, managed service operations, backup discipline, HA design, and a larger share of incident management.

That does not make self-hosting the wrong choice. It simply means the sovereignty benefit should be weighed against the additional run cost.

### TCO evaluation lens for the client

The proposal should encourage the client to compare:

- first-year implementation and enablement cost
- steady-state annual run cost
- staffing model required for each deployment option
- cost of adding one new asset class or business line later
- cost of meeting audit, resilience, and support obligations over time

---

## Value proposition and ROI framework

The commercial case for DALP is strongest when measured against business outcomes, not only technical features.

### Value pillars

The ROI framework should be built around the value DALP creates in four areas.

#### Faster time to market

DALP shortens the path from concept to live operations by providing a tested platform, a standard deployment method, reusable compliance controls, and productized operational tooling. The client avoids the delay and cost of assembling infrastructure from multiple vendors before any business value is delivered.

#### Lower operational risk

DALP's unified lifecycle approach reduces reconciliation gaps, dispersed control ownership, and vendor handoff failures. Durable transaction handling, audit trails, observability, and controlled workflows reduce the cost of operational exceptions and strengthen governance.

#### Lower integration and vendor-management overhead

A single platform commercial model reduces procurement complexity, contract sprawl, and integration maintenance. This is often one of the biggest hidden savings in enterprise tokenization programs.

#### Better scalability of future use cases

Once the platform, operating model, and governance foundation are in place, expansion into additional asset classes, jurisdictions, or business lines becomes cheaper and faster than standing up separate solutions each time.

### Suggested ROI categories

| ROI category | Example measurement approach |
| --- | --- |
| Time-to-launch savings | Reduction in program duration compared with multi-vendor assembly |
| Operational efficiency | Reduction in manual reconciliation, exception handling, and support effort |
| Control efficiency | Reduction in compliance and audit preparation effort |
| Technology consolidation | Reduction in number of systems and contracts required |
| Future expansion efficiency | Lower marginal cost for second and third asset launches |

### ROI narrative for evaluators

The client should assess DALP not only as a software purchase but as operating infrastructure. The relevant return comes from:

- earlier launch of regulated digital asset products
- fewer integration and coordination failures
- lower effort to maintain control evidence and audit readiness
- lower cost to scale beyond the first use case
- reduced dependence on loosely connected point solutions

The strongest commercial argument is usually not that DALP is the cheapest line item in year one. It is that DALP is the cleaner economic model over the life of the program.

---

## Risk allocation and responsibility boundaries

A sound commercial proposal should also make responsibility boundaries explicit.

### SettleMint responsibility areas

Subject to the final deployment model and support tier, SettleMint's responsibility should cover:

- DALP platform entitlement and supported product scope
- standard deployment and platform configuration within agreed scope
- product support and defect remediation within the support boundary
- documentation-aligned operation of the managed platform scope where applicable
- upgrade guidance and supported-version maintenance

### Client responsibility areas

The client's responsibility should cover:

- timely provision of prerequisites, decisions, and authorized stakeholders
- lawful and compliant use of the platform
- user administration and internal governance within the client's organization
- operation of client-controlled infrastructure and services where relevant
- management of external dependencies owned or selected by the client
- legal, regulatory, tax, and business decision accountability

### Third-party dependency boundaries

The commercial structure should explicitly recognize external dependencies such as:

- blockchain network availability and behavior
- external custody platforms
- identity verification providers
- payment rails and banking systems
- client SSO, SIEM, and enterprise network dependencies

These dependencies can be integrated into DALP's operating model, but they are not automatically part of SettleMint's liability or warranty boundary unless expressly included.

---

## Proposed commercial annexes

To make the commercial proposal contract-ready, the final bid should reference the following annexes or schedules:

- order form
- pricing schedule
- deployment model schedule
- statement of work for implementation, if applicable
- support and SLA schedule
- security and data processing schedule
- responsibility matrix
- assumptions and exclusions schedule
- change control procedure

This structure keeps the main proposal readable while giving procurement, legal, and operations teams the detail they need.

---

## Closing statement

The commercial structure proposed for DALP is designed to help the client buy and operate digital asset infrastructure with clarity. It treats DALP as a production platform, not as a speculative project. It gives the client a choice of deployment model, a repeatable implementation path, a defined support framework, and a contract structure that can scale with the program.

That is the point of the proposal. Not to hide complexity, but to organize it into a model that procurement can evaluate, legal can contract, operations can run, and the business can justify.
