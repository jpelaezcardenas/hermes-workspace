# SLA Framework

> **Target length:** 3–4 pages
> **When to use:** RFP sections on service levels, support commitments, uptime guarantees, or operational support.
> **DALP sources:** `reusable/support-sla.md` (standard support tiers), operational documentation

---

## 1. Service Level Overview

[Brief introduction to SettleMint's SLA framework for the DALP platform. Emphasize commitment to reliability and responsive support for mission-critical digital asset infrastructure.]

> **Guidance:** Pull standard support positioning from `reusable/support-sla.md`. Tailor tier selection and specific targets to match client requirements and commercial terms.

---

## 2. SLA Tiers

| Tier | Name | Availability Target | Support Hours | Best For |
|------|------|---------------------|---------------|----------|
| **Tier 1** | Standard | 99.5% | Business hours (Mon–Fri, 09:00–18:00 CET) | Non-production, development environments |
| **Tier 2** | Professional | 99.9% | Extended hours (Mon–Fri, 07:00–22:00 CET) | Production environments, standard workloads |
| **Tier 3** | Enterprise | 99.95% | 24/7/365 | Mission-critical production, regulated environments |

> **Guidance:** Select the tier that matches the client's requirements and commercial agreement. Availability is measured monthly. Planned maintenance windows are excluded from availability calculations.

### Availability Calculation

```
Monthly Availability % = ((Total Minutes − Unplanned Downtime Minutes) / Total Minutes) × 100
```

- **Total Minutes:** Calendar minutes in the measurement month
- **Unplanned Downtime:** Minutes where core platform functionality is unavailable due to SettleMint-attributable issues
- **Exclusions:** Planned maintenance (with 5 business days notice), client-caused outages, force majeure, third-party service outages beyond SettleMint's control

---

## 3. Incident Severity Definitions

| Severity | Name | Definition | Examples |
|----------|------|------------|----------|
| **SEV-1** | Critical | Platform is completely unavailable or a core business function is non-operational with no workaround. Data integrity may be at risk. | Total platform outage; blockchain transaction processing halted; security breach detected; data loss event |
| **SEV-2** | High | Major functionality is significantly degraded or unavailable. Business impact is high but a partial workaround exists. | Key workflow broken (e.g., asset issuance); severe performance degradation (>5x normal response time); integration failure with critical system |
| **SEV-3** | Medium | Non-critical functionality is impaired. Business impact is moderate and a reasonable workaround exists. | Minor feature malfunction; reporting delays; non-critical integration issue; UI rendering problems |
| **SEV-4** | Low | Minor issue or cosmetic defect. Minimal business impact. Includes feature requests and general inquiries. | Cosmetic UI issue; documentation error; enhancement request; general "how-to" question |

---

## 4. Response & Resolution Targets

### Tier 1: Standard

| Severity | Initial Response | Status Update | Target Resolution |
|----------|-----------------|---------------|-------------------|
| SEV-1 | 4 business hours | Every 4 hours | 2 business days |
| SEV-2 | 8 business hours | Daily | 5 business days |
| SEV-3 | 2 business days | Weekly | 10 business days |
| SEV-4 | 5 business days | As needed | Best effort |

### Tier 2: Professional

| Severity | Initial Response | Status Update | Target Resolution |
|----------|-----------------|---------------|-------------------|
| SEV-1 | 1 hour | Every 2 hours | 8 hours |
| SEV-2 | 4 hours | Every 4 hours | 2 business days |
| SEV-3 | 1 business day | Twice weekly | 5 business days |
| SEV-4 | 2 business days | Weekly | 10 business days |

### Tier 3: Enterprise

| Severity | Initial Response | Status Update | Target Resolution |
|----------|-----------------|---------------|-------------------|
| SEV-1 | 15 minutes | Every 30 minutes | 4 hours |
| SEV-2 | 1 hour | Every 2 hours | 8 hours |
| SEV-3 | 4 hours | Daily | 3 business days |
| SEV-4 | 1 business day | Weekly | 5 business days |

> **Guidance:** Resolution targets are goals, not guarantees, some issues may require vendor patches or client-side changes. The commitment is to continuous progress and transparent communication.

---

## 5. Support Channels

| Channel | Availability | Best For |
|---------|-------------|----------|
| **Support Portal** | 24/7 (ticket submission) | All severity levels, primary channel for tracking and accountability |
| **Email** | 24/7 (submission); response per SLA tier | Non-urgent issues, detailed problem descriptions |
| **Phone / Video** | Per SLA tier support hours | SEV-1 and SEV-2 escalations, complex troubleshooting |
| **Dedicated Slack Channel** | Enterprise tier only | Real-time collaboration, quick questions, status updates |

### Escalation Path

| Level | Escalation To | Triggered By |
|-------|--------------|-------------|
| **Level 1** | Support Engineer | Initial ticket, triage, known issues, configuration guidance |
| **Level 2** | Senior Engineer / Platform Specialist | Unresolved after initial investigation, requires deeper platform knowledge |
| **Level 3** | Engineering Team / Architect | Requires code-level investigation, potential bug fix, or architecture change |
| **Management** | SettleMint Engagement Lead → VP Engineering → CTO | SLA breach, client escalation, business-critical impact |

---

## 6. Planned Maintenance

| Parameter | Commitment |
|-----------|------------|
| **Maintenance Window** | [Sundays 02:00–06:00 CET, or as agreed with client] |
| **Advance Notice** | Minimum 5 business days for standard maintenance; 10 business days for major upgrades |
| **Emergency Maintenance** | Permitted with 4-hour notice for critical security patches; client notified immediately |
| **Expected Frequency** | Monthly for platform updates; quarterly for major version upgrades |
| **Impact Communication** | Pre-maintenance: scope, expected duration, impact assessment. Post-maintenance: completion confirmation, any issues noted |

---

## 7. Service Credits (Penalties)

### Availability-Based Credits

| Monthly Availability | Service Credit (% of monthly fee) |
|---------------------|------------------------------------|
| ≥ SLA Target | No credit |
| SLA Target − 0.5% to SLA Target | 5% |
| SLA Target − 1.0% to SLA Target − 0.5% | 10% |
| SLA Target − 2.0% to SLA Target − 1.0% | 20% |
| Below SLA Target − 2.0% | 30% (cap) |

### Credit Process

1. Client submits credit request within 30 days of the affected month
2. SettleMint validates against monitoring data within 10 business days
3. Approved credits applied to next invoice
4. Maximum credit per month: 30% of monthly platform fee
5. Credits are the sole and exclusive remedy for SLA failures

> **Guidance:** Adjust credit percentages based on commercial negotiation. The 30% cap is standard, resist attempts to increase beyond this. Service credits are NOT applicable during free trial or POC periods.

---

## 8. Reporting

### Monthly SLA Report

Delivered within 10 business days of month-end. Contains:

| Section | Contents |
|---------|----------|
| **Availability Summary** | Actual uptime %, SLA target, variance, trend (3-month) |
| **Incident Summary** | Count by severity, MTTR, open/closed, root cause categories |
| **Response Time Performance** | % of tickets meeting response SLA, by severity |
| **Resolution Time Performance** | % of tickets meeting resolution SLA, by severity |
| **Planned Maintenance Log** | Maintenance events, duration, impact |
| **Improvement Actions** | Ongoing and planned improvements, corrective actions from incidents |

### Quarterly Business Review

- Review SLA performance trends
- Discuss upcoming platform roadmap and its impact on the client
- Address any open issues or improvement requests
- Plan for upcoming changes (scaling, new integrations, etc.)

---

## 9. Exclusions

The following are excluded from SLA calculations:

- Planned maintenance performed within agreed windows with proper notice
- Outages caused by client actions (misconfiguration, unauthorized changes)
- Third-party service outages beyond SettleMint's reasonable control
- Force majeure events
- Client's failure to implement recommended updates or security patches
- Connectivity issues between client's network and the platform
- Periods where client restricts SettleMint's access to perform maintenance or support

---

> **Final checklist:**
> - [ ] Select the appropriate SLA tier for this engagement
> - [ ] Adjust response/resolution times if client has specific requirements
> - [ ] Confirm maintenance window alignment with client's business hours
> - [ ] Negotiate service credit percentages with commercial team before submitting
> - [ ] Verify support hours match the selected tier
> - [ ] Cross-reference with `templates/commercial-proposal.md` for pricing alignment
