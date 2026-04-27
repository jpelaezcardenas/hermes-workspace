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
| P1 incident not acknowledged within response target | Immediate escalation to Support Engineering Manager |
| P1 incident not resolved within resolution target | Escalation to VP Engineering and client notification |
| P2 incident exceeding 2x resolution target | Escalation to Support Engineering Manager |
| Recurring P1/P2 incidents (3+ in 30 days) | Root Cause Review with Solution Architect; client briefing |

### Client-Initiated Escalation

Clients may escalate at any time through the following path:

| Level | Contact | Scope |
|---|---|---|
| **Level 1** | Designated Support Engineer (or support team for Enterprise) | Technical investigation and resolution |
| **Level 2** | Support Engineering Manager | Unresolved incidents, resource allocation, SLA concerns |
| **Level 3** | VP Engineering / Head of Customer Success | Persistent issues, service quality concerns, contractual matters |
| **Level 4** | SettleMint Executive Management | Material service failures, strategic concerns |

Escalation contact details are provided in the client's support onboarding package and kept current in the support portal.

---

## Incident Management Process

1. **Report.** Client reports the incident through an authorized support channel with a description, severity assessment, impact scope, and any relevant logs or screenshots.
2. **Acknowledge.** SettleMint acknowledges receipt and confirms or adjusts severity classification within the applicable response time target.
3. **Triage and Diagnose.** Support engineer investigates, requests additional information if needed, and identifies root cause or workaround.
4. **Resolve / Workaround.** Service restored or workaround provided within the resolution target. Client notified of status and next steps.
5. **Post-Mortem (P1/P2).** Root cause analysis produced within 5 business days of resolution. Includes timeline, root cause, remediation actions, and preventive measures. Shared with client and reviewed in the next business review.
6. **Close.** Incident closed after client confirmation. All incidents retained in the support portal for audit and trend analysis.

---

## Maintenance Windows and Change Management

### Scheduled Maintenance

| Parameter | Detail |
|---|---|
| **Standard window** | Saturdays 02:00--06:00 CET (or client-agreed alternative) |
| **Notification period** | Minimum 5 business days for standard maintenance; 10 business days for major upgrades |
| **Emergency maintenance** | May be executed outside standard windows for critical security patches or compliance-impacting fixes, with maximum practical advance notice |
| **Communication** | Email to authorized support contacts and status page update |

### Change Management Framework

All changes to the production environment follow a structured change management process:

- **Standard changes**: Pre-approved, low-risk changes (e.g., configuration adjustments, minor patches) executed during maintenance windows with advance notification.
- **Normal changes**: Reviewed and approved through a change advisory process involving SettleMint and client stakeholders. Includes impact assessment, rollback plan, and test validation on staging before production deployment.
- **Emergency changes**: Reserved for critical security or compliance fixes. Executed with shortened approval and maximum practical notice. Full documentation and post-change review follow within 2 business days.

All changes are logged with timestamp, scope, executor, and outcome for audit purposes.

---

## Platform Update Process

### Release Cadence

| Tier | Release Cadence | Update Model |
|---|---|---|
| **Standard** | Quarterly | Scheduled update during maintenance window; release notes and migration guide provided in advance |
| **Premium** | Monthly | Staged rollout (staging then production); early access to release candidates; dedicated update coordination |
| **Enterprise** | Continuous delivery | Staged rollout with preview environments; client approval gate before production deployment; zero-downtime deployment where architecturally supported |

### DALP Release Process

Each DALP release follows a controlled delivery pipeline:

1. **Release candidate**: New version published to staging/preview environment for client validation.
2. **Release notes**: Detailed changelog covering new features, changed behaviors, resolved issues, and any breaking changes with migration instructions.
3. **Migration guide**: Step-by-step instructions for configuration changes, data migrations, or integration adjustments required by the release.
4. **Staged rollout**: Staging environment updated first; production deployment follows after client validation and sign-off (Enterprise tier) or after the defined validation period (Standard/Premium tiers).
5. **Post-deployment verification**: Automated health checks and manual validation confirm successful deployment.
6. **Rollback capability**: Every release includes a documented rollback procedure. Rollback can be initiated within the maintenance window if critical issues are detected.

### Smart Contract Upgrades

DALP's smart contracts use the UUPS (Universal Upgradeable Proxy Standard) pattern, allowing contract logic to be upgraded without changing contract addresses or disrupting existing on-chain state.

**Upgrade process:**

1. **Impact assessment**: SettleMint's engineering team evaluates the upgrade scope, identifies affected compliance modules and token behaviors, and documents any changes to contract interfaces.
2. **Staging validation**: Upgraded contracts are deployed to the staging environment for functional, compliance, and integration testing against the client's specific configuration.
3. **Client review**: Upgrade scope, test results, and any interface changes are presented to the client's technical and compliance stakeholders for review and approval.
4. **Production deployment**: Upgrade executed during the agreed maintenance window via the UUPS proxy mechanism. Contract addresses remain unchanged; existing balances, approvals, and compliance state are preserved.
5. **Post-upgrade verification**: Automated and manual checks confirm contract state integrity, compliance module functionality, and integration continuity.

Smart contract upgrades are coordinated with the client's compliance team when the upgrade affects compliance module behavior, investor eligibility rules, or transfer restriction logic.

### Update Categories

- **Security patches**: Applied on an accelerated timeline regardless of release cadence. Critical security patches may be applied as emergency maintenance.
- **Compliance module updates**: Coordinated with the client's compliance team; include regulatory impact assessment.
- **Feature releases**: Delivered per release cadence with documentation, migration guides, and changelog.
- **Infrastructure updates**: Coordinated with client DevOps/infrastructure teams where the client manages deployment infrastructure.

---

## Training Program

SettleMint delivers a structured training program as part of every DALP implementation, ensuring that the client's teams are equipped to operate, extend, and govern the platform independently. Training is organized into three role-based tracks, each tailored to the depth and focus that role requires.

### Administrator Track

**Audience**: Platform administrators, DevOps engineers, infrastructure leads, and compliance officers responsible for managing and governing the DALP deployment.

**Duration**: 3--4 days (instructor-led) + self-paced reference materials

| Module | Topics Covered |
|---|---|
| **Platform Architecture** | DALP component overview (dApp, DAPI, indexer, signer service, observability stack); deployment topology; network architecture; data flow |
| **Environment Management** | Environment provisioning and configuration; infrastructure health checks; resource management; scaling considerations |
| **User and Access Management** | RBAC configuration across DALP's 5 defined roles; user provisioning and deprovisioning; role assignment workflows; access audit procedures |
| **Compliance Module Administration** | Configuration and management of DALP's 12 compliance module types; country restrictions, investor eligibility rules, holding periods, supply limits; jurisdictional template management; compliance rule testing |
| **Identity Management** | OnchainID administration; Identity Registry management; claim issuance and revocation workflows; KYC/KYB provider integration management |
| **Key Management and Custody** | Key Guardian administration; storage backend management; maker-checker workflow configuration; multi-signature quorum policies; emergency pause procedures; key rotation |
| **Monitoring and Observability** | Grafana dashboard navigation (operations, transactions, compliance, security); alert configuration; VictoriaMetrics metrics, Loki log queries, Tempo trace analysis; incident identification and initial triage |
| **Backup and Recovery** | Backup procedures; disaster recovery runbook execution; durable execution recovery (Restate); failover testing |
| **Platform Updates** | Update process and procedures; staging validation; rollback procedures; release note interpretation |

### Developer Track

**Audience**: Software engineers, integration developers, and technical architects responsible for building integrations, extending DALP functionality, and maintaining connected systems.

**Duration**: 4--5 days (instructor-led) + self-paced labs and documentation

| Module | Topics Covered |
|---|---|
| **DALP API Deep Dive** | oRPC endpoint reference; REST and GraphQL API patterns; authentication and authorization; rate limiting; error handling and retry strategies; API versioning |
| **Integration Patterns** | Core banking integration patterns; custody provider connector development (Fireblocks, DFNS); identity provider integration; payment rail connectivity (ISO 20022); reference data feed integration |
| **Event-Driven Architecture** | Webhook configuration and management; event types and payload schemas; webhook security (signatures, TLS); retry and dead-letter handling; building event-driven workflows |
| **Smart Contract Interaction** | DALP asset contract architecture; ERC-3643 token standard; compliance module interaction; reading on-chain state; transaction construction and submission via DAPI |
| **Subgraph and Indexer Queries** | Indexed data model; GraphQL query patterns for transaction history, asset state, compliance events, and investor data; pagination and filtering; performance considerations |
| **Custom Workflow Development** | Extending DALP workflows; custom corporate action logic; building automated lifecycle triggers; durable execution patterns (Restate) |
| **Testing and Validation** | API testing strategies; integration test frameworks; staging environment usage; compliance rule testing; performance testing approaches |
| **Security Practices** | Secure API usage; credential management; audit logging for custom integrations; secure webhook consumption |

### End-User Track

**Audience**: Business users, operations staff, compliance officers, and relationship managers who interact with DALP through the dApp interface for day-to-day asset operations.

**Duration**: 2 days (instructor-led) + self-paced reference guides

| Module | Topics Covered |
|---|---|
| **Platform Navigation** | DALP dApp interface orientation; dashboard overview; navigation patterns; user profile and settings |
| **Asset Operations** | Asset issuance workflows; transfer initiation and approval; batch operations; asset lifecycle event management (corporate actions, redemptions, maturity processing) |
| **Compliance Workflows** | Investor onboarding and verification; compliance check interpretation; managing compliance exceptions; viewing compliance status and audit history |
| **Settlement Operations** | DvP and XvP settlement workflows; settlement status monitoring; exception handling; settlement confirmation and reporting |
| **Custody Operations** | Transaction signing workflows (maker-checker); custody status monitoring; freeze and recovery procedures |
| **Reporting and Audit** | Operational dashboards; transaction reporting; compliance reporting; audit trail navigation; export capabilities |
| **Common Scenarios and Troubleshooting** | Handling rejected transfers; resolving compliance blocks; managing investor eligibility updates; escalation procedures |

---

## Training Delivery Methods

### Instructor-Led Training

- Delivered by SettleMint Solution Architects and Senior Engineers with hands-on DALP expertise
- Conducted on-site at the client's premises or via video conference
- Interactive format with live demonstrations on the client's configured DALP environment (staging)
- Includes hands-on exercises and scenario-based labs using real workflows from the client's implementation
- Sessions recorded (with client permission) for future reference and onboarding of new team members

### Self-Paced Learning

- Access to DALP's comprehensive documentation suite
- Step-by-step lab exercises aligned with each training track, executable on the client's staging environment
- Video recordings of instructor-led sessions (where available)
- Quick-reference cards for common operations, troubleshooting procedures, and escalation paths

---

## Knowledge Transfer Methodology

Knowledge transfer is not a single event. It is woven into the implementation lifecycle and formalized during hypercare.

### Phase-Integrated Transfer

| Phase | Knowledge Transfer Activities |
|---|---|
| **Phase 2: Configuration** | Administrators shadow SettleMint engineers during environment setup and configuration; developers participate in integration design sessions |
| **Phase 3: Integration** | Developers co-develop integration components alongside SettleMint engineers; operations teams review workflow designs |
| **Phase 4: Testing** | All tracks participate in UAT; administrators learn monitoring and triage through test execution; developers validate integration behavior |
| **Phase 5: Hypercare** | Formal training delivery across all three tracks; operational readiness validation; shadowed incident response |

### Hypercare Knowledge Transfer Schedule

During the 4-week hypercare period, training is delivered in a structured sequence:

- **Week 1**: Administrator Track -- platform operations, monitoring, compliance administration
- **Week 2**: Developer Track -- API integration, webhook management, troubleshooting
- **Week 3**: End-User Track -- dApp operations, compliance workflows, reporting
- **Week 4**: Cross-track review, scenario-based exercises, operational readiness assessment, Q&A

### Operational Readiness Assessment

At the conclusion of knowledge transfer, SettleMint conducts a formal operational readiness assessment:

- Verification that each role can independently execute their core responsibilities
- Scenario-based evaluation covering standard operations, common exceptions, and escalation procedures
- Identification of remaining gaps with a remediation plan
- Formal sign-off by designated client stakeholders

---

## Documentation Package

Every implementation includes a complete documentation package tailored to the client's specific deployment:

| Document | Description |
|---|---|
| **Architecture Guide** | Client-specific deployment architecture, component topology, network design, and integration map |
| **Administrator Guide** | Platform configuration, user management, compliance module administration, monitoring, and update procedures |
| **Developer Guide (API Reference)** | API reference (oRPC, REST, GraphQL), integration patterns, webhook configuration, subgraph queries, and extension development |
| **User Guide** | Step-by-step procedures for all dApp operations: asset management, compliance, settlement, and reporting |
| **Operational Runbooks** | Procedure-driven guides for incident response, backup/recovery, failover, and common troubleshooting scenarios |
| **Compliance Module Reference** | Detailed reference for all configured compliance modules: rules, parameters, jurisdictional mappings, and testing procedures |

Documentation is maintained alongside the platform. Major releases include updated documentation reflecting new features, changed behaviors, and revised procedures.

---

## Ongoing Learning and Support Resources

Beyond initial training, SettleMint provides ongoing resources as the platform evolves:

- **Documentation Portal**: Continuously updated platform documentation, release notes, and migration guides accessible to all authorized users.
- **Release Training**: Targeted training materials accompanying major platform releases, covering new features, changed behaviors, and updated procedures.
- **Knowledge Base**: Searchable repository of common questions, troubleshooting guides, and best practices maintained by SettleMint's support team.
- **Community and Webinars**: Access to SettleMint's customer community and periodic webinars on platform capabilities, best practices, and industry developments.
- **Refresher Training**: Available on request for new team members or when expanding to new asset classes or modules. Scoped and quoted based on requirements.
- **Office Hours** (Premium/Enterprise tiers): Periodic open sessions with SettleMint engineers for questions, guidance, and ad-hoc knowledge sharing.

---

## Continuous Improvement

- **Monthly incident review** (Premium/Enterprise): Analysis of incident trends, recurring issues, and resolution effectiveness.
- **Quarterly service review** (all tiers): SLA performance, platform health trends, upcoming releases, and optimization recommendations.
- **Annual architecture review** (Enterprise): Assessment of deployment architecture against evolving requirements, new DALP capabilities, and infrastructure optimization opportunities.

---

## Training Customization

All training is customized to the client's specific deployment: asset classes, compliance configuration, integration landscape, and operational workflows. Generic platform training is supplemented with:

- Client-specific scenario walkthroughs using real configurations
- Role-specific emphasis based on the client's team structure and operational model
- Industry-specific compliance and regulatory context
- Integration-specific modules for the client's connected systems (core banking, custody, identity providers)

Training scope and schedule are confirmed during Phase 1 (Discovery and Requirements) and detailed in the Implementation Roadmap.
