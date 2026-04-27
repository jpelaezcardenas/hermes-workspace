# Training & Knowledge Transfer Program

## Overview

SettleMint delivers a structured training program as part of every DALP implementation, ensuring that the client's teams — administrators, developers, and end users — are equipped to operate, extend, and govern the platform independently. Training is designed around three role-based tracks, each tailored to the depth and focus that role requires.

Knowledge transfer begins during the implementation (Phases 2–4) and is formally completed during the Hypercare phase (Phase 6). The goal is not just competency but operational independence: by the end of hypercare, the client's team should be able to manage day-to-day operations, handle common scenarios, troubleshoot issues, and know when and how to escalate to SettleMint support.

---

## Training Tracks

### Administrator Track

**Audience**: Platform administrators, DevOps engineers, infrastructure leads, and compliance officers responsible for managing and governing the DALP deployment.

**Duration**: 3–4 days (instructor-led) + self-paced reference materials

| Module | Topics Covered |
|---|---|
| **Platform Architecture** | DALP component overview (dApp, DAPI, indexer, signer service, observability stack); deployment topology; network architecture; data flow |
| **Environment Management** | Environment provisioning and configuration; infrastructure health checks; resource management; scaling considerations |
| **User & Access Management** | RBAC configuration across DALP's 5 defined roles; user provisioning and deprovisioning; role assignment workflows; access audit procedures |
| **Compliance Module Administration** | Configuration and management of DALP's 18 compliance module types; adding/modifying country restrictions, investor eligibility rules, holding periods, supply limits; jurisdictional template management; compliance rule testing |
| **Identity Management** | OnchainID administration; Identity Registry management; claim issuance and revocation workflows; KYC/KYB provider integration management |
| **Key Management & Custody** | Key Guardian administration; storage backend management; maker-checker workflow configuration; multi-signature quorum policies; emergency pause procedures; key rotation |
| **Monitoring & Observability** | Grafana dashboard navigation (operations, transactions, compliance, security); alert configuration and management; VictoriaMetrics metrics, Loki log queries, Tempo trace analysis; incident identification and initial triage |
| **Backup & Recovery** | Backup procedures; disaster recovery runbook execution; durable execution recovery (Restate); failover testing |
| **Platform Updates** | Update process and procedures; staging validation; rollback procedures; release note interpretation |

### Developer Track

**Audience**: Software engineers, integration developers, and technical architects responsible for building integrations, extending DALP functionality, and maintaining connected systems.

**Duration**: 4–5 days (instructor-led) + self-paced labs and documentation

| Module | Topics Covered |
|---|---|
| **DALP API Deep Dive** | oRPC endpoint reference; REST and GraphQL API patterns; authentication and authorization; rate limiting; error handling and retry strategies; API versioning |
| **Integration Patterns** | Core banking integration patterns; custody provider connector development (Fireblocks, DFNS); identity provider integration; payment rail connectivity (ISO 20022); reference data feed integration |
| **Event-Driven Architecture** | Webhook configuration and management; event types and payload schemas; webhook security (signatures, TLS); retry and dead-letter handling; building event-driven workflows |
| **Smart Contract Interaction** | DALP asset contract architecture; ERC-3643 token standard; compliance module interaction; reading on-chain state; transaction construction and submission via DAPI |
| **Subgraph & Indexer Queries** | Indexed data model; GraphQL query patterns for transaction history, asset state, compliance events, and investor data; pagination and filtering; performance considerations |
| **Custom Workflow Development** | Extending DALP workflows; custom corporate action logic; building automated lifecycle triggers; durable execution patterns (Restate) |
| **Testing & Validation** | API testing strategies; integration test frameworks; staging environment usage; compliance rule testing; performance testing approaches |
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
| **Reporting & Audit** | Operational dashboards; transaction reporting; compliance reporting; audit trail navigation; export capabilities |
| **Common Scenarios & Troubleshooting** | Handling rejected transfers; resolving compliance blocks; managing investor eligibility updates; escalation procedures |

---

## Delivery Methods

### Instructor-Led Training (ILT)

- Delivered by SettleMint Solution Architects and Senior Engineers with hands-on DALP expertise
- Conducted on-site at the client's premises or via video conference, depending on preference and logistics
- Interactive format with live demonstrations on the client's configured DALP environment (staging)
- Includes hands-on exercises and scenario-based labs using real workflows from the client's implementation
- Sessions recorded (with client permission) for future reference and onboarding of new team members

### Self-Paced Learning

- Access to DALP's comprehensive documentation suite — architecture guides, developer guides, user guides, API reference, and operational runbooks
- Step-by-step lab exercises aligned with each training track, executable on the client's staging environment
- Video recordings of instructor-led sessions (where available)
- Quick-reference cards for common operations, troubleshooting procedures, and escalation paths

### Documentation Package

Every implementation includes a complete documentation package tailored to the client's specific deployment:

| Document | Description |
|---|---|
| **Architecture Guide** | Client-specific deployment architecture, component topology, network design, and integration map |
| **Administrator Guide** | Platform configuration, user management, compliance module administration, monitoring, and update procedures |
| **Developer Guide** | API reference, integration patterns, webhook configuration, subgraph queries, and extension development |
| **User Guide** | Step-by-step procedures for all dApp operations — asset management, compliance, settlement, and reporting |
| **Operational Runbooks** | Procedure-driven guides for incident response, backup/recovery, failover, and common troubleshooting scenarios |
| **Compliance Module Reference** | Detailed reference for all configured compliance modules — rules, parameters, jurisdictional mappings, and testing procedures |

---

## Knowledge Transfer Methodology

Knowledge transfer is not a single event — it is woven into the implementation lifecycle and formalized during hypercare.

### Phase-Integrated Transfer

| Phase | Knowledge Transfer Activities |
|---|---|
| **Phase 2: Configuration** | Administrators shadow SettleMint engineers during environment setup and configuration; developers participate in integration design sessions |
| **Phase 3: Integration** | Developers co-develop integration components alongside SettleMint engineers; operations teams review workflow designs |
| **Phase 4: Testing** | All tracks participate in UAT; administrators learn monitoring and triage through test execution; developers validate integration behavior |
| **Phase 6: Hypercare** | Formal training delivery across all three tracks; operational readiness validation; shadowed incident response |

### Hypercare Knowledge Transfer Schedule

During the 4-week hypercare period, training is delivered in a structured sequence:

- **Week 1**: Administrator Track — platform operations, monitoring, compliance administration
- **Week 2**: Developer Track — API integration, webhook management, troubleshooting
- **Week 3**: End-User Track — dApp operations, compliance workflows, reporting
- **Week 4**: Cross-track review, scenario-based exercises, operational readiness assessment, Q&A

### Operational Readiness Assessment

At the conclusion of knowledge transfer, SettleMint conducts a formal operational readiness assessment:

- Verification that each role can independently execute their core responsibilities
- Scenario-based evaluation covering standard operations, common exceptions, and escalation procedures
- Identification of any remaining gaps with a remediation plan
- Formal sign-off by designated client stakeholders

---

## Ongoing Learning & Support Resources

Beyond the initial training program, SettleMint provides ongoing resources to support the client's team as the platform evolves:

- **DALP Documentation Portal**: Continuously updated platform documentation, release notes, and migration guides — accessible to all authorized users
- **Release Training**: Targeted training materials accompanying major platform releases, covering new features, changed behaviors, and updated procedures
- **Knowledge Base**: Searchable repository of common questions, troubleshooting guides, and best practices — maintained by SettleMint's support team and updated based on real support interactions
- **Community & Webinars**: Access to SettleMint's customer community and periodic webinars on platform capabilities, best practices, and industry developments
- **Refresher Training**: Available on request for new team members or when expanding to new asset classes or modules — scoped and quoted based on requirements
- **Office Hours** (Premium/Enterprise tiers): Periodic open sessions with SettleMint engineers for questions, guidance, and ad-hoc knowledge sharing

---

## Training Customization

All training is customized to the client's specific deployment — asset classes, compliance configuration, integration landscape, and operational workflows. Generic platform training is supplemented with:

- Client-specific scenario walkthroughs using real configurations
- Role-specific emphasis based on the client's team structure and operational model
- Industry-specific compliance and regulatory context
- Integration-specific modules for the client's connected systems (core banking, custody, identity providers)

Training scope and schedule are confirmed during Phase 1 (Discovery & Requirements) and detailed in the Implementation Roadmap.
