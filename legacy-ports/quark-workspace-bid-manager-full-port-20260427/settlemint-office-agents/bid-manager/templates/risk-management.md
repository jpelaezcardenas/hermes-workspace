# Risk Management

> **Target length:** 2–3 pages
> **When to use:** RFP sections on risk management, risk mitigation, contingency planning, or project risks.
> **DALP sources:** Implementation experience, standard project risk categories

---

## 1. Risk Management Approach

[Brief description of SettleMint's approach to risk management throughout the engagement. Emphasize proactive identification, continuous monitoring, and transparent communication.]

**Principles:**
- Risks are identified early and managed collaboratively with the client
- All risks have an assigned owner and mitigation plan
- Risk register is reviewed at every project status meeting
- Escalation is fast and transparent, no surprises

---

## 2. Risk Assessment Matrix

### Probability Definitions

| Level | Label | Definition |
|-------|-------|------------|
| 5 | Very High | >80% likelihood of occurrence |
| 4 | High | 60–80% likelihood |
| 3 | Medium | 40–60% likelihood |
| 2 | Low | 20–40% likelihood |
| 1 | Very Low | <20% likelihood |

### Impact Definitions

| Level | Label | Schedule Impact | Cost Impact | Quality Impact |
|-------|-------|-----------------|-------------|----------------|
| 5 | Critical | >4 weeks delay | >30% budget overrun | Major deliverable unacceptable |
| 4 | Major | 2–4 weeks delay | 15–30% overrun | Significant rework required |
| 3 | Moderate | 1–2 weeks delay | 5–15% overrun | Deliverable requires revision |
| 2 | Minor | <1 week delay | <5% overrun | Minor corrections needed |
| 1 | Negligible | No delay | No cost impact | Cosmetic only |

### Risk Score Matrix

|  | **Impact 1** | **Impact 2** | **Impact 3** | **Impact 4** | **Impact 5** |
|--|:---:|:---:|:---:|:---:|:---:|
| **Prob 5** | 5 | 10 | 15 | 🟠 20 | 🔴 25 |
| **Prob 4** | 4 | 8 | 12 | 🟠 16 | 🔴 20 |
| **Prob 3** | 3 | 6 | 9 | 12 | 🟠 15 |
| **Prob 2** | 2 | 4 | 6 | 8 | 10 |
| **Prob 1** | 1 | 2 | 3 | 4 | 5 |

**Risk Appetite:**
- 🔴 **15–25 (High):** Immediate escalation to steering committee. Active mitigation required before proceeding.
- 🟠 **8–14 (Medium):** Mitigation plan in place, monitored weekly. Escalate if score increases.
- **1–7 (Low):** Monitor at regular intervals. Accept with standard controls.

---

## 3. Risk Register

### Implementation Risks

| ID | Risk | Prob | Impact | Score | Owner | Mitigation | Contingency |
|----|------|:----:|:------:|:-----:|-------|------------|-------------|
| R-01 | **Client resource availability**: Key client stakeholders unavailable during critical project phases | [3] | [4] | [12] | [Client PM] | [Agree dedicated resource commitment upfront; identify backup personnel; schedule critical workshops early] | [Adjust timeline; SettleMint covers additional discovery with extended Q&A] |
| R-02 | **Integration complexity**: Client's existing systems have undocumented APIs or limited integration capability | [3] | [3] | [9] | [SettleMint Tech Lead] | [Early API discovery in Phase 1; request API documentation and sandbox access during kickoff; build integration POC first] | [Reduce integration scope for go-live; phase remaining integrations post-launch] |
| R-03 | **Scope creep**: Requirements expand beyond original RFP scope during implementation | [4] | [3] | [12] | [SettleMint PM] | [Baselined requirements doc signed in Phase 1; formal change request process; impact assessment before any scope addition] | [Defer non-critical additions to Phase 2; adjust timeline and budget via change order] |
| R-04 | **Data quality**: Legacy data unsuitable for migration without significant cleansing | [3] | [3] | [9] | [Joint] | [Early data profiling in Phase 1; data quality assessment before migration planning; client provides cleansed data] | [Reduce migration scope; manual data entry for critical records; parallel run with legacy] |
| R-05 | **Regulatory change**: New regulations require changes to solution design mid-project | [2] | [4] | [8] | [Joint] | [Monitor regulatory landscape; build configurable compliance rules rather than hard-coded; maintain buffer in timeline] | [Prioritize regulatory requirements; defer non-regulatory features; fast-track compliance changes] |

### Technical Risks

| ID | Risk | Prob | Impact | Score | Owner | Mitigation | Contingency |
|----|------|:----:|:------:|:-----:|-------|------------|-------------|
| R-06 | **Blockchain network performance**: Transaction throughput insufficient for client's volume requirements | [2] | [3] | [6] | [SettleMint Tech Lead] | [Performance testing early in Phase 2; select appropriate network and consensus for throughput needs; benchmark against stated volumes] | [Network tuning; L2 solution; batch processing for non-time-sensitive transactions] |
| R-07 | **Security vulnerability**: Critical vulnerability discovered in platform or dependencies | [2] | [5] | [10] | [SettleMint Security] | [Continuous dependency scanning; pre-go-live penetration test; security-by-design architecture; rapid patch process] | [Emergency patch deployment; temporary compensating controls; incident response activation] |
| R-08 | **Key personnel departure**: Critical team member leaves during project | [2] | [3] | [6] | [Joint] | [Knowledge sharing across team; documentation of all decisions; no single points of failure in project team] | [SettleMint provides replacement with handover period; knowledge base enables rapid onboarding] |

### Operational Risks

| ID | Risk | Prob | Impact | Score | Owner | Mitigation | Contingency |
|----|------|:----:|:------:|:-----:|-------|------------|-------------|
| R-09 | **Go-live readiness**: Client organization not ready for production launch at planned date | [3] | [3] | [9] | [Client PM] | [Readiness checklist shared early; parallel change management workstream; regular readiness assessments] | [Phased go-live (limited user group first); extended hypercare period; defer full rollout] |
| R-10 | **User adoption**: End users resist new platform or fail to adopt effectively | [2] | [3] | [6] | [Client] | [Training program per `templates/training-support.md`; change management communication; user champion program; intuitive DALP UI] | [Additional training sessions; enhanced documentation; dedicated support for first 90 days] |

> **Guidance:** This is a starting template. Add client-specific risks identified during RFP analysis. Remove risks that clearly don't apply. Every risk must have both a mitigation (proactive) and contingency (reactive) plan.

---

## 4. Risk Monitoring & Reporting

| Activity | Frequency | Responsible |
|----------|-----------|-------------|
| Risk register review | Weekly (project status meeting) | SettleMint PM |
| Risk score reassessment | Bi-weekly | Joint PM team |
| New risk identification | Ongoing, any team member can raise | All |
| Steering committee risk report | Monthly | SettleMint PM |
| Post-phase risk retrospective | At each phase gate | Joint |

### Escalation Triggers

- Any risk score increases to 15+ → Immediate steering committee notification
- Any risk materializes (becomes an issue) → Issue logged, root cause analysis initiated
- Two or more medium risks in same area → Pattern review, systemic mitigation assessment

---

> **Final checklist:**
> - [ ] Review RFP for client-specific risk concerns, add any they've highlighted
> - [ ] Adjust probability/impact scores to be realistic for this engagement
> - [ ] Assign specific owners (role-based is fine for proposal stage)
> - [ ] Ensure mitigation plans are actionable, not vague
> - [ ] Cross-reference with `templates/implementation-plan.md` for timeline risks
> - [ ] Remove any risks that clearly don't apply to this engagement
