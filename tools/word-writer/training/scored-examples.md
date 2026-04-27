---
title: "Scored Training Examples"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.922701Z
---

# Scored Training Examples

> Calibration material for the word-writer agent. Each example shows the same brief answered at two quality levels, with scoring rationale tied to quality-bar.md and common-defect-patterns.md.

---

## Example 1: Executive Memo — DALP Deployment Options

### Brief
Write a one-page executive memo for a bank CTO summarizing DALP deployment options (SaaS, dedicated cloud, self-hosted) with a recommendation.

---

### Score 5 — Ship Confidently

**To:** CTO, [Bank Name]
**From:** SettleMint Solutions Architecture
**Date:** [Date]
**Subject:** DALP Deployment Model Recommendation

#### Summary

DALP supports three deployment models. For your regulatory environment and team capacity, we recommend dedicated cloud.

#### Deployment Models

| Model | Infrastructure | Data Residency | Ops Responsibility | Time to Live |
|---|---|---|---|---|
| SaaS (multi-tenant) | SettleMint-managed | Shared EU region | SettleMint | Days |
| Dedicated Cloud | Isolated tenant, your cloud account | Your chosen region | Shared (SettleMint + your ops) | 2-4 weeks |
| Self-Hosted | Your data centre or private cloud | Full control | Your team | 4-8 weeks |

#### Recommendation

Dedicated cloud gives you single-tenant isolation and data residency in your jurisdiction without requiring your team to operate Kubernetes infrastructure. SettleMint handles platform upgrades and monitoring; your team retains control of network policies and access.

Self-hosted is viable if your security policy prohibits any third-party access to the cluster. That adds 4-6 weeks to initial deployment and requires a team comfortable with Helm-based lifecycle management.

SaaS is fastest for evaluation but unlikely to satisfy your compliance team for production workloads.

#### Next Step

Confirm your data residency requirements and we will scope the dedicated cloud deployment.

---

**Why this scores 5:**
- Opens with the recommendation, not the background
- Table is scannable and adds information the prose does not repeat
- Each option gets an honest, specific assessment (no overselling)
- Ends with a concrete next step, not a vague "let us know"
- No warm-up paragraphs, no hedge language, no em dashes
- Appropriate length for the audience (CTO will read in 2 minutes)

---

### Score 2 — Needs Another Pass

**Subject:** Overview of SettleMint DALP Deployment Options for Your Consideration

#### Introduction

SettleMint is pleased to present this overview of deployment options for DALP, our Digital Asset Lifecycle Platform. DALP is a comprehensive platform that enables financial institutions to issue, manage, and service digital assets across the full lifecycle. We believe there is a deployment model that will fit your organization's unique needs and requirements.

#### About DALP

DALP provides a complete solution for digital asset operations, including asset issuance, lifecycle management, compliance monitoring, and integration with existing systems. The platform supports multiple blockchain protocols and offers a range of capabilities designed to help institutions move forward with their digital asset strategies.

#### Deployment Options

There are three main deployment options available:

**Option 1: SaaS**
The SaaS option is our multi-tenant cloud offering. It is the fastest way to get started with DALP. Infrastructure is managed by SettleMint. This option provides a shared environment with robust security controls.

**Option 2: Dedicated Cloud**
The dedicated cloud option provides a single-tenant environment. This gives you more control over your data. SettleMint manages the infrastructure while you maintain oversight. This is a good middle ground between SaaS and self-hosted.

**Option 3: Self-Hosted**
The self-hosted option gives you full control. You deploy DALP in your own data centre or private cloud. Your team manages the infrastructure. This provides maximum control over data residency and security.

#### Conclusion

Each deployment model has its own advantages. We would be happy to discuss which option best aligns with your organization's requirements. Please do not hesitate to reach out to schedule a follow-up conversation.

---

**Why this scores 2:**
- "Pleased to present" warm-up wastes the CTO's time (defect: long warm-up paragraph)
- "About DALP" section is irrelevant to the brief; the reader already knows the product (defect: repetition with no added value)
- No table, so the reader must mentally extract and compare across prose paragraphs
- "Good middle ground" and "maximum control" are vague, non-committal (defect: consultant fog)
- No actual recommendation despite the brief asking for one
- Conclusion says "reach out" instead of proposing a concrete next step
- "Designed to help institutions move forward" is banned positioning language
- Title is bloated ("for Your Consideration" adds nothing)

---

## Example 2: Status Update — Opening Paragraph Only

### Brief
Write the opening section of a weekly DALP integration status update for a project steering committee.

---

### Score 5 Opening

#### Integration Status: Week 12

Core banking adapter testing is complete. Three of four payment rail connectors passed end-to-end validation this week; the SEPA connector has a date-formatting issue in settlement confirmations that we expect resolved by Wednesday.

This week's focus: close the SEPA defect, begin UAT onboarding for the ops team, and finalize the monitoring dashboard configuration.

---

### Score 2 Opening

#### Weekly Status Update

This week the team continued to make good progress on the integration workstream. Several key milestones were achieved and the project remains broadly on track. There are some items that require attention but overall the trajectory is positive. Below we provide a detailed summary of activities and next steps.

---

**Scoring rationale:**
- Score 5: leads with the most important fact (testing complete), names the one blocker with specifics (which connector, what defect, when it resolves), and states the upcoming week's priorities in one sentence.
- Score 2: four sentences of warm-up that say nothing specific. "Good progress," "broadly on track," and "positive trajectory" give the steering committee zero information. The actual status is deferred to "below."

---

## Example 3: Structured Briefing — MiCA Regulation Impact on DALP Clients

### Brief
Write a structured briefing for the SettleMint leadership team on the Markets in Crypto-Assets (MiCA) regulation: what changed, what it means for DALP clients, and what SettleMint should do about it.

---

### Score 5 — Ship Confidently

#### MiCA Regulation: Client Impact Briefing

##### Situation

MiCA's full application (30 June 2024 for stablecoins, 30 December 2024 for remaining provisions) creates licensing, reserve, and reporting obligations for any entity issuing, trading, or custodying crypto-assets in the EU. Several DALP clients operate in or serve EU-regulated markets.

##### Implications for DALP Clients

| Obligation | Who Is Affected | DALP Relevance |
|---|---|---|
| E-money token reserve requirements | Stablecoin issuers | DALP's stablecoin template supports reserve attestation workflows; clients need configurable reserve-proof reporting |
| Asset-referenced token whitepaper filing | Token issuers (bonds, funds, real estate) | DALP's issuance flow includes document generation; whitepaper metadata fields may need extension |
| CASP licensing and transaction monitoring | Exchanges, custodians using DALP | DALP's compliance module supports configurable rule engines; transaction monitoring rules will need MiCA-specific rulesets |
| Record-keeping (5-year retention) | All regulated entities | DALP's audit trail and event store already support long-term retention; confirm client configurations meet the 5-year minimum |

##### What This Means for SettleMint

1. **Short-term (Q1):** Audit existing client configurations for reserve-proof and retention compliance. Publish a MiCA readiness checklist for the customer success team.
2. **Medium-term (Q2-Q3):** Extend the compliance rule engine with pre-built MiCA transaction monitoring rulesets. Add whitepaper metadata fields to the issuance workflow.
3. **No action needed:** DALP's existing RBAC, audit logging, and multi-jurisdiction deployment model already satisfy MiCA's operational resilience and data residency requirements.

##### Recommendation

Prioritize the readiness audit. Most DALP clients are closer to compliance than they expect, but two gaps (reserve reporting granularity and MiCA-specific monitoring rules) need product work before Q3.

---

**Why this scores 5:**
- Situation section is two sentences, not a history of EU crypto regulation
- Table maps obligations to concrete DALP relevance, giving leadership actionable context without re-reading MiCA text
- Implications section distinguishes what needs work from what is already covered ("No action needed" row prevents unnecessary panic)
- Recommendations are time-boxed and specific (Q1 audit, Q2-Q3 product work)
- No hedging, no filler, no "it remains to be seen"
- A leader can read this in 3 minutes and make a resource allocation decision

---

### Score 2 — Needs Another Pass

#### Briefing on the Markets in Crypto-Assets (MiCA) Regulation

##### Background

The Markets in Crypto-Assets Regulation, commonly known as MiCA, is a landmark piece of European Union legislation that establishes a comprehensive regulatory framework for crypto-assets across all 27 EU member states. MiCA was first proposed by the European Commission in September 2020 as part of the Digital Finance Package. After extensive legislative deliberation, it was formally adopted in June 2023 and published in the Official Journal of the European Union. The regulation introduces rules for crypto-asset issuers, crypto-asset service providers (CASPs), and market participants, covering areas such as authorization, disclosure, governance, and consumer protection.

MiCA categorizes crypto-assets into three types: asset-referenced tokens (ARTs), e-money tokens (EMTs), and other crypto-assets that do not fall into either category. Each category has specific requirements regarding issuance, reserves, redemption rights, and ongoing obligations.

##### Overview of Key Provisions

MiCA introduces several important provisions that are relevant to the digital asset industry:

1. **Licensing requirements:** CASPs operating in the EU must obtain authorization from their national competent authority.
2. **Whitepaper obligations:** Issuers of crypto-assets must publish a crypto-asset whitepaper containing specified information.
3. **Reserve requirements:** Issuers of ARTs and EMTs must maintain adequate reserves.
4. **Consumer protection:** Various provisions protect holders of crypto-assets.
5. **Market abuse rules:** MiCA establishes rules against insider dealing and market manipulation.
6. **Transition periods:** Existing operators may benefit from grandfathering provisions.

##### Potential Impact

This regulation could potentially have implications for some of our clients who operate in the European market. It is worth noting that some aspects of DALP may already address certain requirements, while other areas may benefit from further development. We would recommend conducting a thorough assessment to determine the full scope of impact.

##### Next Steps

We suggest scheduling a follow-up meeting to discuss this topic in more depth and determine appropriate actions going forward.

---

**Why this scores 2:**
- Background is a Wikipedia summary of MiCA's legislative history. The leadership team knows what MiCA is; they need to know what to do about it (defect: long warm-up paragraph)
- "Overview of Key Provisions" lists six generic MiCA features without connecting any of them to DALP or SettleMint's clients (defect: no interpretation around the data)
- "Potential Impact" section uses five hedges in three sentences: "could potentially," "some of our clients," "it is worth noting," "certain requirements," "may benefit" (defect: consultant fog, AI markers)
- No table, no timeline, no prioritization. A leader reading this cannot make any decision.
- "Schedule a follow-up meeting" is not a recommendation. It defers the entire purpose of the briefing.
- Title includes the full regulation name in parentheses, which the reader already knows (defect: title bloat)

---

## Example 4: Questionnaire / Response Pack — Data Residency and Deployment Control

### Brief
Answer this due-diligence question for a prospective financial institution: "How does DALP support data residency and deployment control requirements?" Keep the answer concise, factual, and suitable for a questionnaire response pack.

---

### Score 5 — Ship Confidently

**Question:** How does DALP support data residency and deployment control requirements?

**Answer:** DALP supports multiple deployment models, including SettleMint-managed SaaS, dedicated single-tenant cloud deployments, and self-hosted deployments in the client's own environment. This allows clients to choose the level of infrastructure control and data-location control that fits their policy and regulatory requirements.

For clients with stricter residency or isolation needs, DALP can be deployed in a dedicated environment within the client's chosen cloud region, or self-hosted in the client's own cloud or data centre. In those models, the client retains control over infrastructure boundaries, network policies, and hosting location.

The right answer depends on the client's operating model. SaaS is typically appropriate for faster evaluation or lower-control scenarios. Dedicated cloud and self-hosted models are the better fit when jurisdictional control, tenant isolation, or internal infrastructure governance requirements are material.

---

**Why this scores 5:**
- Answers the exact question in the first sentence, without product history or scene-setting
- Distinguishes deployment models clearly and maps them to the control/residency requirement
- Uses bounded language, no unsupported guarantees about "all jurisdictions" or automatic compliance
- Keeps the prose concise enough for a questionnaire pack while still giving decision-useful detail
- Ends with a practical interpretation that helps the reader understand when each model fits

---

### Score 2 — Needs Another Pass

**Question:** How does DALP support data residency and deployment control requirements?

**Answer:** SettleMint understands that data residency and deployment control are very important considerations for financial institutions operating in today's complex regulatory landscape. DALP is a highly flexible platform that is designed to support a wide range of deployment preferences and business needs.

We offer different deployment approaches that can help clients align with their internal policies and regulatory expectations. Depending on the circumstances, clients may be able to select an option that provides the right balance of control, security, and operational efficiency. Our team would be happy to discuss the available models and determine the most suitable path forward.

---

**Why this scores 2:**
- Spends half the answer acknowledging the importance of the topic instead of answering it (defect: long warm-up paragraph)
- Never names the actual deployment models, so the reader learns nothing concrete
- "Highly flexible," "wide range," and "right balance" are vague filler phrases (defect: consultant fog)
- Defers the answer to a future discussion instead of giving a usable questionnaire response
- Sounds polished on the surface, but it is empty under inspection, which is exactly how due-diligence answers lose trust
