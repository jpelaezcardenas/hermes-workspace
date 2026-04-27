---
title: "PPT Maker Training Exercises"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.703279Z
---

# PPT Maker Training Exercises

## Purpose
Concrete plan-evaluation exercises for self-assessment against the scorecard rubric. Each exercise presents a deck plan with intentional defects. The builder should identify what's wrong and how to fix it before building.

---

## Exercise 1: The Feature Dump (Executive Audience)

**Brief:** "Build a 14-slide executive pitch for a Tier-1 European bank evaluating DALP for bond tokenization."

**Submitted plan:**
```
1. Cover
2. Single Column — "About SettleMint"
3. Single Column — "DALP Platform Overview"
4. Single Column — "Bond Tokenization Features"
5. Single Column — "Compliance Features"
6. Single Column — "Custody Features"
7. Single Column — "Integration Features"
8. Table — "Feature Comparison"
9. Screenshot Right — "Dashboard View"
10. Screenshot Right — "Bond Issuance Screen"
11. Screenshot Right — "Compliance Module"
12. Three Column — "Case Studies"
13. Single Column — "Next Steps"
14. Thank You
```

**Defects to identify (check against scorecard):**

| Dimension | Score | Issue |
|-----------|-------|-------|
| Narrative Arc | 2 | No problem framing. Jumps straight to company intro. No section separators. Reader gets "here's what we do" not "here's what you need." |
| Slide Type Variety | 2 | 5 of 14 slides are Single Column. 3 consecutive screenshots. Only 4 layout types total. |
| Title Quality | 1 | Every title is a topic label: "About", "Overview", "Features". Zero assertion-style takeaways. |
| Audience Calibration | 2 | Executive audience but plan reads like a feature walkthrough. Executives need outcomes, proof, and risk reduction, not feature lists. |
| Structural Compliance | 2 | No section separators between sections. No appendix for Mermaid diagrams. |

**Corrected plan (target: 42+/50):**
```
1. Cover
2. Single Column — "European Bond Markets Need Operational Infrastructure, Not More Pilots"
3. Agenda
4. Section Separator — The Problem
5. Two Column — "Manual Bond Operations Cost Tier-1 Banks €5-15M/Year in Reconciliation Alone"
6. Section Separator — The Solution
7. Three Column — "DALP Covers Issuance, Servicing, and Settlement in One Platform"
8. Screenshot Right — "Maker-Checker Workflow Eliminates Manual Bond Settlement Steps"
9. Text 2x2 — "Four Capabilities That Replace Point Solutions"
10. Section Separator — The Proof
11. Three Column — "Commerzbank, Mizuho, and KBC Run Bond Operations on DALP"
12. Table with Text — "Compliance Coverage Across 4+ Regulatory Jurisdictions"
13. Single Column — "Proposed 8-Week Deployment Timeline"
14. Thank You
15–20. Appendix: 6 Mermaid diagrams (bond lifecycle, settlement flow, compliance checks, custody architecture, integration topology, deployment model)
```

---

## Exercise 2: The Jargon Storm (Sales Audience)

**Brief:** "12-slide sales deck for a relationship manager presenting DALP to a Middle East sovereign wealth fund exploring tokenized real estate."

**Submitted plan:**
```
1. Cover
2. Section Separator — Introduction
3. Three Column — "DALP's Enterprise-Grade Architecture Handles Complex Token Lifecycles"
4. Text 2x3 — "Six Core Platform Modules"
5. Section Separator — Technical Architecture
6. Two Column — "EVM-Compatible Smart Contracts with RBAC/ABAC and HSM Integration"
7. Screenshot Left — "GraphQL API Explorer"
8. Table — "Infrastructure Component Matrix"
9. Section Separator — Deployment
10. Single Column — "From Pilot to Production in Weeks"
11. Three Column — "ADI-Finstreet, Standard Chartered, OCBC"
12. Thank You
```

**Defects to identify:**

| Dimension | Score | Issue |
|-----------|-------|-------|
| Positioning Language | 1 | "Enterprise-grade" (slide 3) and "From pilot to production" (slide 10) are banned phrases. |
| Audience Calibration | 2 | Sales deck for a sovereign wealth fund but slides 6-8 are deep technical architecture. SWFs care about asset diversification, regulatory alignment, and proven deployments. |
| Data & Proof Points | 2 | Slide 3 has no stats. Slide 4 lists modules with no proof. Slide 10 makes a claim with no timeline data. |
| Content Density | 3 | Text 2x3 for "Six Core Platform Modules" risks empty cells if the builder can't fill 6 cells with substantive content. Verify against content banks first. |

**Key fixes:**
- Replace "enterprise-grade" with specific capability: "Maker-checker approvals, RBAC, and HSM-compatible custody"
- Replace "From pilot to production" with: "Deploy compliant tokenized real estate operations in 8 weeks"
- Move technical architecture to appendix; replace with outcome-focused slides
- Add real estate-specific framing: tokenized property funds, fractional ownership, rental yield distribution

---

## Exercise 3: The Sparse Appendix (Investor Audience)

**Brief:** "18-slide investor deck for Series B due diligence. Focus on market, product, traction, business model."

**Submitted plan:**
```
1. Cover
2. Agenda
3. Section Separator — Market
4. Single Column — "The $16T Tokenized Asset Opportunity"
5. Two Column — "Traditional vs. Tokenized Asset Infrastructure"
6. Section Separator — Product
7. Three Column — "Issuance, Servicing, Settlement"
8. Text 2x2 — "Platform Differentiators"
9. Screenshot Right — "DALP Dashboard"
10. Screenshot Left — "Compliance Module"
11. Section Separator — Traction
12. Three Column — "3 Named Clients"
13. Table — "Pipeline Summary"
14. Section Separator — Business Model
15. Two Column — "License Revenue + Expansion"
16. Single Column — "Financial Projections"
17. Single Column — "The Ask"
18. Thank You
```

**Defects to identify:**

| Dimension | Score | Issue |
|-----------|-------|-------|
| Structural Compliance | 2 | No Mermaid appendix. An 18-slide investor deck should have 6-8 architecture diagrams for technical due diligence backup. |
| Narrative Arc | 3 | Structure is logical but transitions are weak. Slide 4 makes a market claim, slide 5 does comparison, but no bridge to "here's where SettleMint fits." |
| Visual Integration | 2 | Only 2 screenshots, no diagrams in the main deck. Investor decks benefit from architecture visuals that show product depth. |
| Title Quality | 3 | Mix: "The $16T Tokenized Asset Opportunity" is strong. "Platform Differentiators" and "Pipeline Summary" are labels. |

**Key fixes:**
- Add appendix: 6-8 Mermaid diagrams covering architecture, token lifecycle, settlement flow, deployment models, security model, integration topology
- Add a bridge slide between market and product: "SettleMint Built the Operational Layer This Market Lacks"
- Convert label titles to assertions: "Pipeline Summary" → "28 Active Opportunities Across 4 Continents"
- Add at least one more visual in the main body (architecture overview or competitive positioning chart)

---

## Exercise 4: The Depth Mismatch (Technical Audience)

**Brief:** "16-slide technical deep-dive for a central bank DLT team evaluating DALP for a CBDC retail pilot. Audience: 5 architects, 2 security officers, 1 project lead."

**Submitted plan:**
```
1. Cover
2. Agenda
3. Section Separator — DALP Overview
4. Single Column — "What Is DALP?"
5. Three Column — "Key Benefits for Central Banks"
6. Section Separator — Architecture
7. Two Column — "Cloud-Native Platform"
8. Screenshot Right — "Admin Dashboard"
9. Section Separator — CBDC Capabilities
10. Single Column — "DALP Supports CBDCs"
11. Text 2x2 — "Four CBDC Features"
12. Section Separator — Security
13. Single Column — "Security and Compliance"
14. Three Column — "Three Case Studies"
15. Single Column — "Let's Get Started"
16. Thank You
```

**Defects to identify:**

| Dimension | Score | Issue |
|-----------|-------|-------|
| Audience Calibration | 1 | Technical architects and security officers need protocol specifics, API patterns, deployment topology, and security model details. "What Is DALP?" and "Key Benefits" are executive framing for a technical audience. |
| Content Density | 2 | Slide 10 ("DALP Supports CBDCs") is a vague one-liner. Slide 13 ("Security and Compliance") tries to cover the entire security model in a single column. Both will be severely under-filled or hand-wavy. |
| Data & Proof Points | 2 | No stats anywhere. No API counts, no protocol specifications, no throughput numbers. Technical audiences evaluate with data, not claims. |
| Structural Compliance | 2 | No Mermaid appendix. A technical deep-dive for architects without architecture diagrams is incomplete by definition. |
| Visual Integration | 2 | One screenshot, no diagrams in the main body. Architecture evaluators need topology views, flow diagrams, and integration schematics. |
| Title Quality | 2 | "What Is DALP?", "Cloud-Native Platform", "Security and Compliance" are all topic labels. Technical audiences respect precision: name the protocol, the pattern, the standard. |

**Corrected plan (target: 42+/50):**
```
1. Cover
2. Agenda
3. Section Separator — Architecture
4. Two Column — "DALP Runs on Kubernetes with Isolated Namespaces per Asset Class"
5. Screenshot Right — "Deployment Topology: 4 Models from Shared Cloud to Air-Gapped On-Prem"
6. Text 2x2 — "REST, GraphQL, gRPC, and ISO 20022: Four Integration Protocols"
7. Section Separator — CBDC Token Lifecycle
8. Three Column — "Mint, Transfer, and Burn with Configurable Policy Hooks at Each Stage"
9. Screenshot Left — "Token Lifecycle State Machine with Maker-Checker Gates"
10. Section Separator — Security Model
11. Two Column — "RBAC Access Control with HSM-Compatible Key Management"
12. Table with Text — "18 Compliance Modules Mapped to CBDC Regulatory Requirements"
13. Section Separator — Proof in Production
14. Three Column — "Commerzbank, KBC, and Mizuho Operate Regulated Tokens on DALP"
15. Single Column — "Proposed Technical Evaluation: 4-Week Sandbox Deployment"
16. Thank You
17–24. Appendix: 8 Mermaid diagrams (platform component topology, CBDC token lifecycle flow, settlement state machine, HSM key hierarchy, RBAC policy resolution, API gateway routing, observability stack, deployment pipeline)
```

**Key learning:** Technical audiences need depth where executive audiences need outcomes. Every slide should contain a specific protocol, standard, number, or architectural pattern. Vague capability claims ("Supports CBDCs", "Cloud-Native") are red flags in a technical review.

## Capability Safety Check

Before approving a training plan, scan for claims that look plausible but are not verified in the current DALP content banks.

- **Access control:** use `RBAC`, not `RBAC/ABAC`, unless a verified source explicitly says otherwise.
- **Proof points:** named institutions should match `case-studies.json`, with the correct region and use case.
- **Stats:** pull hero numbers from `platform-stats.json`, not memory or guesswork.
- **Audience examples:** technical plans need protocols, security controls, and architecture views, not executive-language benefit slides.

If an exercise teaches the wrong capability, it trains the builder to make the same mistake in live decks. Fix the example first, then score the plan.

---

## How to Use These Exercises

1. **Before building a real deck:** Review the exercise matching your audience type
2. **After planning:** Score your plan against the same defect-check pattern used above
3. **Self-check:** For each slide in your plan, ask:
   - Is the title an assertion or a label?
   - Does this slide type match the content amount?
   - Would the target audience care about this slide?
   - Does any text contain banned positioning phrases?
4. **Fix before building:** Rework the plan until no scorecard dimension scores below 3
