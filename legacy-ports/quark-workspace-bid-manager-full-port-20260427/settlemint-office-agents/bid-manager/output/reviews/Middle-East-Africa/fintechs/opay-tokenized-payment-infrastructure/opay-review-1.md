# Review Pass 1: OPay Technical and Commercial Proposals

**Reviewer:** Bid Manager (automated quality review)
**Date:** 2026-03-19
**Review ID:** PB-058-R1
**Files reviewed:**
- opay-technical_full_draft.md (879 lines, 10 mermaid diagrams)
- opay-commercial_full_draft.md (348 lines)

---

## Overall Score: 82/100

---

## Strengths

1. **Framing discipline.** The executive summary immediately positions DALP as a permissioned, invisible settlement layer, not a consumer-facing digital asset product. This directly addresses the RFP's repeated emphasis that this is not a speculative innovation exercise.

2. **Three-phase alignment.** The phased deployment (treasury, merchant, partner bank) maps precisely to OPay's operational priorities and allows value validation at each stage. The RFP explicitly asks for phased scalability.

3. **Evaluation criteria coverage.** The proposal addresses the top-weighted evaluation criteria: use-case fit (24%) through settlement-specific architecture, API/integration (18%) through documented REST API and webhook integration patterns, compliance/controls (18%) through CBN mapping and on-chain enforcement, and settlement/treasury (15%) through atomic XvP settlement.

4. **Diagram quality.** 10 mermaid diagrams covering architecture, lifecycle, compliance, settlement, integration, data flow, security, deployment, and implementation timeline. One diagram (deployment topology, diagram 9) failed to render during DOCX conversion and needs syntax correction.

5. **Requirement response matrix.** All 12 technical requirements (REQ-01 through REQ-19) and all 6 regulatory requirements (RC-01 through RC-06) are explicitly addressed with status and evidence references.

6. **Commercial transparency.** Pricing is broken down by tier, phase, and workstream. Three-year TCO analysis covers both Foundation and Enterprise tiers. ROI framework provides conservative and optimistic estimates with identified efficiency areas.

7. **Nigerian regulatory awareness.** CBN, SEC Nigeria, NDPC, and AML/ML Act 2022 are explicitly mapped to platform controls. Data residency in Nigeria is addressed through deployment options.

---

## Issues Identified

### Technical Proposal

1. **Diagram 9 render failure.** The deployment architecture diagram (mermaid block 9) failed to render during DOCX conversion. The syntax needs correction for the subgraph structure. Impact: one fewer visual in the DOCX output.

2. **Operational governance depth.** The RFP (Section 8.6) asks for detailed operational governance including daily, weekly, and monthly governance routines. The proposal covers RBAC and maker-checker but does not describe operational cadences (exception review, entitlement recertification, reconciliation sign-off, threshold monitoring).

3. **Data migration treatment.** The RFP (Section 8.17) asks about migration approach, back-book treatment, and parallel run requirements. The proposal mentions parallel running in Phase 1 but does not address whether historical settlement records would be migrated or referenced.

4. **Post-go-live change management.** The RFP (Section 8.9) asks how new product attributes, participant types, and rule changes are introduced after go-live. The proposal covers implementation phases but is thin on post-production change control: release notes, regression testing, approval boards, and rollback disciplines.

5. **Third-party dependency register.** REQ-05 asks for disclosure of all third-party dependencies and operational responsibilities. The proposal mentions Besu, PostgreSQL, Restate, and Grafana/Prometheus in passing but does not provide a formal dependency register with version, license, support responsibility, and substitution options.

### Commercial Proposal

6. **Volume scaling assumptions.** The commercial proposal states that licensing is not volume-based, but does not explicitly address what happens if settlement volumes require infrastructure scaling beyond the estimated $120,000/year. The RFP asks about scaling economics.

7. **Consortium or partner bank cost sharing.** The proposal does not address whether partner banks participating in Phase 3 would share any costs or require separate licensing.

8. **Staff augmentation clarity.** The "OPay internal team effort (estimated at 2 to 3 FTEs across all phases)" needs more detail on which roles (business analyst, integration developer, testing coordinator, compliance officer).

---

## Changes to Apply for reviewed_1

1. Fix deployment architecture diagram syntax for clean DOCX rendering
2. Add operational governance section with daily/weekly/monthly cadences
3. Add data migration and parallel run treatment section
4. Expand post-go-live change management with release, regression, and rollback processes
5. Add formal third-party dependency register table
6. Clarify infrastructure scaling economics in commercial proposal
7. Add note on partner bank cost sharing model for Phase 3
8. Specify OPay internal team role requirements by phase

---

## Recommendation

The draft is strong on strategic framing, technical architecture, and commercial transparency. The gaps are primarily in operational detail that the RFP's appendix sections (8.6 through 8.9) specifically demand. Pass 1 fixes should focus on operational governance depth and dependency transparency. Pass 2 should validate that all 10+ diagrams render successfully and that the requirement matrix is fully traceable.
