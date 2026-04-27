# Training & Support Program

> **Target length:** 2–3 pages
> **When to use:** RFP sections on training, knowledge transfer, capacity building, or ongoing support.
> **DALP sources:** `reusable/training.md` (standard training overview), `reusable/support-sla.md`

---

## 1. Training Philosophy

[Brief statement on SettleMint's approach to training. Emphasize self-sufficiency, the goal is for the client team to operate DALP independently. Training is not a one-time event but a structured program that builds competence progressively.]

> **Key message:** We succeed when your team doesn't need us for day-to-day operations. Every training track is designed to get your people self-sufficient on DALP within [X weeks] of go-live.

---

## 2. Training Tracks

### Track 1: Platform Administrator Training

| Attribute | Details |
|-----------|---------|
| **Audience** | [IT administrators, platform operators, DevOps engineers] |
| **Prerequisite** | [Basic understanding of web applications, cloud infrastructure concepts] |
| **Duration** | [2 days] |
| **Delivery** | [On-site / Remote, instructor-led with hands-on labs] |
| **Max Participants** | [8 per session] |

**Curriculum:**

| Module | Duration | Topics |
|--------|----------|--------|
| Platform Overview | [2h] | [DALP architecture, components, deployment topology, environment overview] |
| User & Role Management | [2h] | [Creating users, assigning roles, configuring permissions, SSO/IdP integration] |
| Platform Configuration | [3h] | [System settings, branding, workflow configuration, notification setup] |
| Monitoring & Operations | [3h] | [Dashboard overview, health monitoring, log analysis, alerting, common troubleshooting] |
| Backup & Recovery | [2h] | [Backup procedures, restore process, DR procedures, runbook walkthrough] |
| Security Operations | [2h] | [Access reviews, audit log review, key management basics, incident escalation] |
| Hands-On Lab | [2h] | [End-to-end exercise: configure a new asset class, set up users, monitor operations] |

---

### Track 2: Business Operator Training

| Attribute | Details |
|-----------|---------|
| **Audience** | [Business users, operations team, compliance officers, asset managers] |
| **Prerequisite** | [Domain knowledge of the asset class being managed; no technical background required] |
| **Duration** | [1.5 days] |
| **Delivery** | [On-site / Remote, instructor-led with guided exercises] |
| **Max Participants** | [12 per session] |

**Curriculum:**

| Module | Duration | Topics |
|--------|----------|--------|
| DALP for Business Users | [1.5h] | [Platform overview from business perspective, navigation, key concepts] |
| Asset Lifecycle Management | [3h] | [Creating assets, issuance workflows, lifecycle events (dividends, redemptions, transfers), status management] |
| Compliance & Reporting | [2h] | [Compliance checks, KYC/AML workflows, regulatory reporting, audit trail access] |
| Investor/Client Management | [1.5h] | [Investor onboarding, portfolio views, communication tools, document management] |
| Hands-On Exercises | [2h] | [Guided scenarios: issue an asset, process a lifecycle event, generate a compliance report] |

---

### Track 3: Developer/Integration Training

| Attribute | Details |
|-----------|---------|
| **Audience** | [Software developers, integration engineers, technical architects] |
| **Prerequisite** | [Software development experience, API familiarity, basic blockchain concepts helpful] |
| **Duration** | [2 days] |
| **Delivery** | [On-site / Remote, instructor-led with coding exercises] |
| **Max Participants** | [6 per session] |

**Curriculum:**

| Module | Duration | Topics |
|--------|----------|--------|
| DALP Technical Deep-Dive | [2h] | [Architecture walkthrough, data model, API design, smart contract layer] |
| API Integration | [3h] | [REST API reference, GraphQL queries, authentication, pagination, error handling, rate limits] |
| Webhook & Event Integration | [2h] | [Event types, webhook configuration, payload structure, retry logic, idempotency] |
| Smart Contract Interaction | [3h] | [Contract ABIs, transaction submission, event listening, chain-specific considerations] |
| Custom Extension Development | [2h] | [Extension points, plugin architecture, custom workflow steps, testing] |
| Integration Lab | [4h] | [Build a working integration: connect DALP to a mock external system, handle events, process transactions] |

---

### Track 4: Executive Briefing

| Attribute | Details |
|-----------|---------|
| **Audience** | [C-suite, senior management, steering committee members] |
| **Prerequisite** | [None] |
| **Duration** | [2 hours] |
| **Delivery** | [On-site / Remote, presentation with live demo] |
| **Max Participants** | [No limit] |

**Content:**
- Platform capabilities and strategic value
- Live demonstration of key workflows
- Reporting and oversight dashboards
- Roadmap overview and future capabilities
- Q&A

---

## 3. Training Delivery Schedule

| Phase | Training | Timing | Notes |
|-------|----------|--------|-------|
| **Pre-Go-Live** | Executive Briefing | [Week 12, during UAT phase] | Sets expectations for go-live |
| **Pre-Go-Live** | Platform Administrator Training | [Week 13] | Must complete before go-live |
| **Go-Live Week** | Business Operator Training | [Week 14] | Hands-on with production system |
| **Post-Go-Live** | Developer/Integration Training | [Week 15–16] | After core platform stable |
| **Ongoing** | Refresher / New User Training | [Quarterly or as needed] | Optional add-on |

---

## 4. Training Materials Provided

| Material | Format | Access |
|----------|--------|--------|
| **Training Slide Decks** | PDF / PPTX | Provided to client for internal reuse |
| **Hands-On Lab Guides** | PDF / Markdown | Step-by-step exercise instructions |
| **Video Recordings** | MP4 / Streaming link | Recordings of training sessions (if client consents) |
| **Platform Documentation** | Online / PDF | Full DALP documentation portal access |
| **Quick Reference Cards** | PDF (1-page) | Per-role cheat sheets for common tasks |
| **API Reference** | Online (Swagger/OpenAPI) | Interactive API documentation |
| **Operations Runbook** | PDF / Markdown | Troubleshooting guides, escalation procedures |

> **Guidance:** All materials remain available to the client post-engagement. Materials are updated with each platform release and accessible via the documentation portal.

---

## 5. Ongoing Support & Enablement

### Support Structure

[Reference `templates/sla-framework.md` for detailed support SLAs. Summarize the key support elements here:]

| Element | Details |
|---------|---------|
| **Support Portal** | [24/7 ticket submission, knowledge base, status page] |
| **Documentation Portal** | [Continuously updated platform documentation, release notes, guides] |
| **Release Communication** | [Pre-release notes 2 weeks before updates; post-release changelog and migration guides] |
| **Quarterly Business Reviews** | [Performance review, roadmap preview, optimization recommendations] |
| **Customer Success Manager** | [Enterprise tier, named CSM for ongoing optimization and advocacy] |

### Knowledge Transfer Approach

- **Shadowing:** During implementation, client team members shadow SettleMint engineers
- **Pair Configuration:** Client admins perform configuration alongside SettleMint during Phase 2
- **Documentation Review:** All project documentation reviewed and handed over before closure
- **Dry Runs:** Client team performs critical operations (e.g., asset issuance, DR recovery) independently before go-live, with SettleMint observing

---

## 6. Training Customization

[Statement that training content can be customized to the client's specific:]
- Asset classes and workflows configured on their DALP instance
- Regulatory and compliance requirements specific to their jurisdiction
- Integration architecture and connected systems
- Internal processes and operational procedures

> **Guidance:** Use the client's own DALP instance for training exercises wherever possible, training on real workflows is far more effective than generic scenarios.

---

> **Final checklist:**
> - [ ] Adjust training tracks to match the client's team composition
> - [ ] Confirm delivery method preference (on-site vs. remote)
> - [ ] Verify timing fits within implementation schedule (`templates/implementation-plan.md`)
> - [ ] Include training costs in commercial proposal (`templates/commercial-proposal.md`)
> - [ ] Note any language requirements for training delivery
> - [ ] Confirm recording consent if sessions will be recorded
