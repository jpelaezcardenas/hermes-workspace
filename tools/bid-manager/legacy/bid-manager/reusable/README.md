# Reusable Content Blocks

> Pre-written content blocks ready to paste directly into proposals. These are polished, proposal-ready text extracted from content/.

This directory contains reusable building blocks for DALP bid responses. These files are not standalone submission documents. They are source modules meant to be pulled into templates in `../templates/` and then tailored to the specific client, sector, and procurement context.

## How to Use These Blocks

- Use reusable blocks to avoid rewriting standard company/product content from scratch
- Treat them as a starting point, not final prose
- Always adapt them to the client's terminology, priorities, and evaluation criteria
- Keep them aligned with the latest DALP narrative and verified platform capabilities

> **Rule of thumb:** If the content is broadly true across many bids, it belongs here. If it is specific to one client or procurement, it belongs in a bid-specific template or response file.

---

## Reusable Block Index

| Slug | File | Purpose | Typical Use | Target Length |
|------|------|---------|-------------|---------------|
| `about-settlemint` | `about-settlemint.md` | Standard corporate overview of SettleMint - who we are, what we do, positioning, credibility | Company overview sections, RFI intros, executive summary support | 1-2 pages |
| `about-dalp` | `about-dalp.md` | Core description of DALP (Digital Asset Lifecycle Platform), what it does, major capability areas, positioning | Solution overview sections, product background, executive summary support | 2-3 pages |
| `deployment-options` | `deployment-options.md` | Standard explanation of cloud, on-premise, and hybrid deployment models with pros/cons | Technical architecture, infrastructure, hosting model sections | 2-3 pages |
| `implementation-plan` | `implementation-plan.md` | Standard implementation methodology and high-level phased delivery approach | Project approach sections, implementation overviews, summary timelines | 2-3 pages |
| `support-sla` | `support-sla.md` | Standard support model, support tiers, escalation logic, service management positioning | SLA and support sections, operations responses, commercial support descriptions | 2-3 pages |
| `training` | `training.md` | Standard enablement and training approach - user onboarding, administrator training, knowledge transfer | Training, change enablement, handover, adoption sections | 1-2 pages |
| `reference-projects` | `reference-projects.md` | 14 named reference projects with use case, challenge, solution, outcome | Every proposal: include summary table of all 14, then expand 1-3 most relevant to client context | 2-3 pages |

---

## Which Template Uses Which Block?

| Reusable Block | Common Destination Templates |
|----------------|------------------------------|
| `about-settlemint` | `../templates/company-profile.md`, `../templates/rfi-response.md`, `../templates/full-rfp-response.md` |
| `about-dalp` | `../templates/executive-summary.md`, `../templates/rfi-response.md`, `../templates/full-rfp-response.md` |
| `deployment-options` | `../templates/technical-architecture.md`, `../templates/rfi-response.md`, `../templates/full-rfp-response.md` |
| `implementation-plan` | `../templates/implementation-plan.md`, `../templates/full-rfp-response.md` |
| `support-sla` | `../templates/sla-framework.md`, `../templates/training-support.md`, `../templates/full-rfp-response.md`, `../templates/commercial-proposal.md` |
| `training` | `../templates/training-support.md`, `../templates/implementation-plan.md`, `../templates/full-rfp-response.md` |
| `reference-projects` | `../templates/case-studies.md`, `../templates/company-profile.md`, `../templates/full-rfp-response.md` |

---

## Content Maintenance Rules

### Keep these blocks:
- evergreen
- factual
- platform-aligned
- reusable across multiple bids

### Do not put these here:
- client names
- client-specific requirements
- custom pricing
- unverified roadmap claims
- one-off legal/commercial concessions
- bid-specific competitive messaging

---

## Editing Guidance by Block

### `about-settlemint`
Use for:
- company history
- market positioning
- credibility markers
- global presence
- high-level client profile references

Update when:
- company narrative changes
- major certifications are added
- corporate structure changes
- strategic positioning changes

### `about-dalp`
Use for:
- platform overview
- capability summary
- asset lifecycle narrative
- differentiation of DALP vs. narrow tokenization tools

Update when:
- new major capabilities are released
- messaging shifts in the canonical DALP narrative
- supported deployment models or product scope changes

### `deployment-options`
Use for:
- hosting model selection
- cloud/on-prem/hybrid trade-offs
- infrastructure flexibility positioning

Update when:
- supported deployment models change
- platform architecture materially changes
- a new reference deployment becomes standard

### `implementation-plan`
Use for:
- standard phase descriptions
- delivery methodology summary
- timeline framing

Update when:
- the standard delivery model changes
- new quality gates are introduced
- onboarding or rollout approach changes materially

### `support-sla`
Use for:
- support tier language
- operating model summary
- escalation/support positioning

Update when:
- support hours change
- SLA structure changes
- support tooling/process changes materially

### `training`
Use for:
- training philosophy
- standard learning tracks
- handover approach

Update when:
- training formats change
- documentation model changes
- customer enablement process evolves

### `reference-projects`
Use for:
- case study summaries
- proof of production deployment
- industry-specific credibility
- named client references

Update when:
- new reference projects are signed off for external use
- project outcomes are updated
- new asset class deployments go live

---

## Quick Selection Guide

If the client asks… use…

- **"Tell us about your company"** → `about-settlemint`
- **"Describe your platform / solution"** → `about-dalp`
- **"What deployment models do you support?"** → `deployment-options`
- **"How would implementation work?"** → `implementation-plan`
- **"What support and SLAs do you provide?"** → `support-sla`
- **"How do you train and onboard our team?"** → `training`
- **"What reference clients can you share?"** → `reference-projects`

---

## Final Reminder

These blocks save time, but lazy reuse kills bids. Pull the block, tailor it, tighten it, and make it fit the client. Generic copy is how good platform vendors lose to worse competitors with better bid discipline.
