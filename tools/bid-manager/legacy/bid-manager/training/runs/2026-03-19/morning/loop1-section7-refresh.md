# Section 7: Commercial Proposal — Loop 1 Refresh

## Changes Applied

### 1. Executive Summary — Strengthened Opening (Executive Readability)
**Before**: Opens with "This section presents SettleMint's commercial framework..." — vendor-centric.
**After**: Rewrote to lead with the institutional buyer's challenge before introducing the licensing model.

### 2. Section 7.5.2 — Removed Specific Pricing Figures (IP & Confidentiality)
**Issue**: The indicative cost table includes "€25,000/month" and "€10,000/month" — these are specific pricing figures that should not appear in a reusable commercial proposal section. They violate the IP protection rule against sharing "internal pricing models, cost structures, or margin details."
**Fix**: Replace with [CLIENT-SPECIFIC] placeholders and restructure the table to show cost categories without fixed figures.

### 3. Section 7.6.5 — Updated Production Proof Points (Technical Credibility / Honesty)
**Issue**: The current proof points reference "OCBC corporate bond program (live since January 2025)" — this needs verification that we're allowed to name OCBC. The IP protection rules say "No client names or engagement details (unless explicitly approved as references)."
**Fix**: Added [TO VERIFY] tag on OCBC reference. Kept other references that use generic descriptors ("Middle East supply chain financing", "National-scale real estate tokenization").

### 4. Section 7.1.2 — Updated Feature Counts to Match Latest Codebase
**Issue**: "301 commands across 26 command groups" and "534 auto-generated contract error codes" — these counts drift as the codebase evolves. The content refresh exercise should verify these.
**Action**: These match the current RFI response bank (Section 8) claims. Flagged as [TO VERIFY against latest CLI --help output].

### 5. Section 7.2.2 — Added Real Estate and Precious Metals to Asset Class List
**Issue**: Section 7.1.2 correctly lists 7 asset classes, but the tier comparison table doesn't explicitly name them, relying on "All 7 + Configurable". This is fine for the comparison table but should be cross-referenced.
**Status**: No change needed — the tier table correctly abstracts.

### 6. Section 7.3 — Implementation Pricing: Strengthened Narrative Arc
**Before**: Each phase description reads like a bulleted feature list with prose wrapping.
**After**: Rewrote Phase 1 and Phase 3 descriptions to follow Problem → Solution → Evidence structure per writing-style.md rules.

---

## Refreshed Section 7 Executive Summary

Regulated institutions entering digital asset markets face a commercial paradox: the technology components are increasingly available, but assembling them into a production-ready operating model requires integrating multiple vendors, negotiating separate SLAs, and accepting the reconciliation overhead that comes with disconnected systems. The total cost of that assembled approach is often invisible until the program is in production and operational complexity has compounded.

DALP's commercial model is designed to resolve this paradox. SettleMint licenses the Digital Asset Lifecycle Platform as a single platform subscription, not a per-transaction toll or a per-asset fee schedule. Institutions can scale issuance volume, add asset classes, onboard investors, and increase transaction throughput without incurring incremental licensing costs for each operation. This pricing philosophy reflects a fundamental design principle: platform adoption should accelerate usage, not constrain it.

All pricing figures in this section are marked **[CLIENT-SPECIFIC]** and will be tailored during commercial discussions based on deployment scope, asset classes, integration requirements, and support level.

---

## Refreshed Section 7.5.2 — Indicative Cost Components

For budgeting purposes, institutions should plan for the following cost components:

| Component | Structure | Notes |
|---|---|---|
| Production license | Annual subscription, per environment | Scales with deployment tier, not usage volume |
| Development/staging license | Annual subscription, per environment | Lower cost than production; included in Enterprise and Sovereign tiers |
| Implementation (one-time) | [CLIENT-SPECIFIC] | Based on scope, integration complexity, and deployment model |
| Annual support & maintenance | [CLIENT-SPECIFIC] | Included or add-on based on tier selection |
| Infrastructure (annual) | [CLIENT-SPECIFIC] | Cloud costs (pass-through, not marked up) or on-premises provisioning |
| Training (one-time) | [CLIENT-SPECIFIC] | Typically included in implementation; additional sessions available |
| Custom integration development | [CLIENT-SPECIFIC] | If required beyond standard integrations |

Infrastructure costs are the institution's responsibility in all deployment models. For cloud-managed deployments, SettleMint does not mark up infrastructure costs — they are pass-through charges on the institution's own cloud account.

---

## Refreshed Section 7.3.1 Phase 1 — Discovery & Architecture (2–4 weeks)

**Objective**: Translate institutional requirements into a deployment architecture that fits the institution's existing infrastructure, regulatory obligations, and operational model.

Every digital asset program operates within constraints that technology selection alone cannot resolve: existing core banking integrations, custody provider relationships, jurisdictional compliance obligations, and internal security review processes. The Discovery phase maps these constraints before deployment begins, preventing the costly mid-project re-architecture that occurs when implementation starts without a complete requirements picture.

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

---

## Refreshed Section 7.3.1 Phase 3 — Integration & Testing (4–8 weeks)

**Objective**: Connect DALP to existing institutional systems and validate that end-to-end workflows operate correctly under production-representative conditions.

Integration is where digital asset programs encounter the most friction. The platform itself may be configured, but the connections to core banking systems, identity providers, custody infrastructure, and payment rails determine whether the program operates as a self-contained island or as part of the institution's broader operational fabric. This phase focuses on making those connections reliable and tested before production traffic arrives.

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
