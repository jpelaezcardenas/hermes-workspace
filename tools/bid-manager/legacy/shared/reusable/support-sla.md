# Support & Service Level Agreement

## Overview

SettleMint provides structured, tiered support for all DALP production deployments. Our support framework is designed for regulated institutions where uptime, compliance enforcement, and operational continuity are non-negotiable — reflecting the same standards we maintain across our bank-grade and sovereign-scale deployments.

Support is delivered by engineers with deep expertise in DALP's architecture, blockchain infrastructure, compliance modules, and integration patterns. Every support interaction is logged, tracked, and auditable — consistent with the governance expectations of regulated environments.

---

## Support Tiers

SettleMint offers three support tiers, each designed for a different operational profile. Tier selection is typically aligned with the criticality of the deployment, transaction volumes, and the client's internal support capabilities.

### Standard Support

Designed for initial production deployments and lower-criticality environments where the client maintains internal operational capability and requires SettleMint as a second-line escalation resource.

| Attribute | Detail |
|---|---|
| **Coverage Hours** | Business hours (09:00–18:00 CET, Monday–Friday, excluding public holidays) |
| **Support Channels** | Email, support portal |
| **Named Contacts** | Up to 3 authorized support contacts |
| **Uptime SLA** | 99.9% monthly (managed infrastructure) |
| **Incident Management** | SettleMint-managed ticketing with SLA tracking |
| **Platform Updates** | Quarterly release cycle with release notes and migration guides |
| **Proactive Monitoring** | Platform health monitoring with alerting on critical thresholds |
| **Account Management** | Quarterly business review |

### Premium Support

Designed for business-critical deployments where faster response times, extended coverage, and a closer working relationship with SettleMint's engineering team are required.

| Attribute | Detail |
|---|---|
| **Coverage Hours** | Extended hours (07:00–22:00 CET, Monday–Friday; on-call for P1 on weekends) |
| **Support Channels** | Email, support portal, dedicated Slack channel, phone escalation |
| **Named Contacts** | Up to 8 authorized support contacts |
| **Uptime SLA** | 99.95% monthly (managed infrastructure) |
| **Incident Management** | Priority queue with dedicated triage |
| **Platform Updates** | Monthly release cycle with early access to release candidates |
| **Proactive Monitoring** | Enhanced monitoring with proactive alerting and anomaly detection |
| **Designated Support Engineer** | Named engineer familiar with the client's deployment and configuration |
| **Account Management** | Monthly business review with technical deep-dive |

### Enterprise Support

Designed for mission-critical, high-volume deployments — including sovereign-scale programs, multi-asset platforms, and environments where any downtime or compliance disruption carries material regulatory or financial impact.

| Attribute | Detail |
|---|---|
| **Coverage Hours** | 24/7/365 |
| **Support Channels** | Email, support portal, dedicated Slack channel, phone, video escalation |
| **Named Contacts** | Unlimited authorized support contacts |
| **Uptime SLA** | 99.99% monthly (managed infrastructure) |
| **Incident Management** | Dedicated incident manager for P1/P2 incidents; war-room escalation for P1 |
| **Platform Updates** | Continuous delivery with staged rollouts; early access and preview environments |
| **Proactive Monitoring** | Full-stack observability with SettleMint-managed alerting, capacity planning, and trend analysis |
| **Designated Support Team** | Named support team with deep familiarity of the client's deployment, integrations, and workflows |
| **Solution Architect Access** | Quarterly architecture reviews and optimization recommendations |
| **Account Management** | Bi-weekly operational review; named Customer Success Manager |

---

## Severity Levels & Response Targets

All incidents are classified according to a four-level severity model. Severity is assessed based on business impact, scope of affected users, and availability of workarounds.

### Severity Definitions

| Severity | Classification | Description | Examples |
|---|---|---|---|
| **P1 — Critical** | Production down | Complete platform unavailability, data loss or corruption, compliance enforcement failure allowing non-compliant transfers, or settlement failure affecting live transactions | DALP dApp or DAPI unresponsive; compliance module bypass; atomic DvP failure in production; Key Guardian signing failure |
| **P2 — High** | Major impact | Significant degradation of core functionality affecting multiple users or critical workflows, with no acceptable workaround | Settlement delays exceeding SLA; identity verification failures blocking investor onboarding; observability stack down (no monitoring); major integration failure |
| **P3 — Medium** | Workaround available | Functional issue affecting a subset of users or non-critical workflows, where a reasonable workaround exists | Reporting delay; non-critical API endpoint degradation; dashboard rendering issues; batch processing delay with manual alternative |
| **P4 — Low** | Minor / cosmetic | Minor issue with no material impact on operations, compliance, or user experience | UI cosmetic defect; documentation error; minor logging inconsistency; feature enhancement request |

### Response Time Targets

Response time is measured from the moment the incident is acknowledged by SettleMint's support team after being reported through an authorized support channel.

| Severity | Standard | Premium | Enterprise |
|---|---|---|---|
| **P1 — Critical** | 4 hours | 1 hour | 15 minutes |
| **P2 — High** | 8 hours | 4 hours | 1 hour |
| **P3 — Medium** | 2 business days | 1 business day | 4 hours |
| **P4 — Low** | 5 business days | 3 business days | 1 business day |

### Resolution Targets

Resolution targets represent the time to restore service or provide a viable workaround. Permanent root-cause fixes may follow under a separate remediation timeline, communicated as part of the incident post-mortem.

| Severity | Standard | Premium | Enterprise |
|---|---|---|---|
| **P1 — Critical** | 8 hours | 4 hours | 2 hours |
| **P2 — High** | 24 hours | 8 hours | 4 hours |
| **P3 — Medium** | 5 business days | 3 business days | 2 business days |
| **P4 — Low** | 10 business days | 5 business days | 3 business days |

---

## Uptime SLA

Uptime is calculated as a monthly percentage based on total minutes in the calendar month, excluding pre-approved maintenance windows.

| Tier | Uptime Target | Maximum Monthly Downtime |
|---|---|---|
| **Standard** | 99.9% | ~43 minutes |
| **Premium** | 99.95% | ~22 minutes |
| **Enterprise** | 99.99% | ~4.3 minutes |

### Measurement & Reporting

- Uptime is measured via synthetic monitoring against DALP's core services (DAPI, dApp, signer service, indexer) from multiple geographic locations.
- Monthly uptime reports are provided to the client as part of the regular business review cycle.
- Planned maintenance windows are excluded from uptime calculations when communicated within the required notice period.

### Service Credits

In the event that SettleMint fails to meet the contracted uptime SLA in a given calendar month, service credits are applied to the following month's invoice:

| Uptime Achieved | Service Credit |
|---|---|
| Below SLA target but ≥ 99.0% | 10% of monthly support fees |
| Below 99.0% but ≥ 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

Service credits are the client's sole and exclusive remedy for SLA breaches and are capped at 50% of monthly support fees. Credits must be requested within 30 days of the relevant reporting period.

---

## Escalation Procedures

### Automatic Escalation

| Trigger | Action |
|---|---|
| P1 incident not acknowledged within response target | Immediate escalation to Support Engineering Manager |
| P1 incident not resolved within resolution target | Escalation to VP Engineering and client notification |
| P2 incident exceeding 2× resolution target | Escalation to Support Engineering Manager |
| Recurring P1/P2 incidents (3+ in 30 days) | Trigger Root Cause Review with Solution Architect; client briefing |

### Client-Initiated Escalation

Clients may escalate at any time through the following path:

1. **Level 1**: Designated Support Engineer (or support team for Enterprise)
2. **Level 2**: Support Engineering Manager
3. **Level 3**: VP Engineering / Head of Customer Success
4. **Level 4**: SettleMint Executive Management

Escalation contact details are provided in the client's support onboarding package and updated in the support portal.

---

## Maintenance Windows & Update Policy

### Scheduled Maintenance

- **Standard window**: Saturdays 02:00–06:00 CET (or client-agreed alternative)
- **Notification period**: Minimum 5 business days for standard maintenance; 10 business days for major upgrades
- **Emergency maintenance**: May be executed outside standard windows for critical security patches or compliance-impacting fixes, with maximum practical advance notice
- **Maintenance communication**: Via email to authorized support contacts and status page update

### Platform Update Policy

| Tier | Release Cadence | Update Model |
|---|---|---|
| **Standard** | Quarterly | Scheduled update during maintenance window; release notes and migration guide provided in advance |
| **Premium** | Monthly | Staged rollout (staging → production); early access to release candidates; dedicated update coordination |
| **Enterprise** | Continuous delivery | Staged rollout with preview environments; client approval gate before production deployment; zero-downtime deployment where architecturally supported |

### Update Categories

- **Security patches**: Applied on accelerated timeline regardless of release cadence. Critical security patches may be applied as emergency maintenance.
- **Compliance module updates**: Coordinated with the client's compliance team; include regulatory impact assessment.
- **Feature releases**: Delivered per release cadence with documentation, migration guides, and changelog.
- **Infrastructure updates**: Coordinated with client DevOps/infrastructure teams where client manages deployment infrastructure.

---

## Support Channels & Access

| Channel | Standard | Premium | Enterprise |
|---|---|---|---|
| **Support Portal** | ✓ | ✓ | ✓ |
| **Email** | ✓ | ✓ | ✓ |
| **Dedicated Slack Channel** | — | ✓ | ✓ |
| **Phone Escalation** | — | ✓ (P1/P2) | ✓ (all severities) |
| **Video Escalation** | — | — | ✓ |
| **Designated Engineer** | — | Named individual | Named team |
| **Customer Success Manager** | — | — | Named CSM |

### Support Portal Capabilities

- Incident creation, tracking, and history
- SLA tracking and reporting
- Knowledge base access (platform documentation, runbooks, FAQs)
- Release notes and update schedules
- Uptime dashboards and historical availability data

---

## Incident Management Process

1. **Report**: Client reports incident through authorized support channel with description, severity assessment, impact scope, and any relevant logs or screenshots.
2. **Acknowledge**: SettleMint acknowledges receipt and confirms or adjusts severity classification within the applicable response time target.
3. **Triage & Diagnose**: Support engineer investigates, requests additional information if needed, and identifies root cause or workaround.
4. **Resolve / Workaround**: Service restored or workaround provided within resolution target. Client notified of status and next steps.
5. **Post-Mortem** (P1/P2): Root cause analysis produced within 5 business days of resolution. Includes timeline, root cause, remediation actions, and preventive measures. Shared with client and reviewed in the next business review.
6. **Close**: Incident closed after client confirmation. All incidents retained in the support portal for audit and trend analysis.

---

## Continuous Improvement

- **Monthly incident review** (Premium/Enterprise): Analysis of incident trends, recurring issues, and resolution effectiveness.
- **Quarterly service review** (all tiers): SLA performance, platform health trends, upcoming releases, and optimization recommendations.
- **Annual architecture review** (Enterprise): Assessment of deployment architecture against evolving requirements, new DALP capabilities, and infrastructure optimization opportunities.
