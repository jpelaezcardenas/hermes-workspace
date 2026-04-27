# Review Pass 1: Eurex: Tokenized Derivatives Clearing

**Proposal ID:** PB-034
**Review Date:** March 2026
**Reviewer:** Proposal Quality Review (Pass 1)

## Scoring Against Rubric

| Category | Max | Score | Notes |
|---|---|---|---|
| Executive Summary quality | 10 | 9 | Opens with CCP clearing guarantee; EMIR obligations; default management urgency framing strong |
| Institutional tailoring | 15 | 14 | PRISMA integration explicitly designed; EMIR account segregation; CUSTODIAN default model specific |
| Technical architecture | 15 | 13 | 11 Mermaid diagrams; clearing lifecycle state machine; margin enforcement sequence; default management workflow |
| Compliance matrix completeness | 10 | 9 | All 46 TR + 10 REG requirements mapped; TR-009 Partial (netting) correctly identified |
| Regulatory alignment | 10 | 9 | EMIR, DORA, NIS2, GDPR, AMLD all addressed with CCP-specific context |
| Security architecture | 10 | 9 | CUSTODIAN dual-control detailed; EMIR/DORA alignment table; 5-layer model |
| Implementation plan | 10 | 9 | 32-week plan; default management test programme (tabletop, technical, dress rehearsal) specified |
| Writing quality / tone | 10 | 9 | No forbidden terms; institutional CCP tone throughout; no em dashes after cleanup |
| Commercial completeness | 10 | 9 | Sovereign tier motivated; default management test programme as contractual deliverable; TCO vs. build |
| References and evidence | 10 | 9 | Clearstream, BoE, Euroclear, JSE well-matched for CCP context |

**Pass 1 Total: 99/110 (90%)**

## Issues Found

1. **Minor:** The margin enforcement section (Section 6.4) describes the PRISMA integration boundary clearly but does not specify the communication protocol between PRISMA and DALP. Adding a note on the API mechanism (REST + webhook) would strengthen the technical credibility with Eurex's engineering team.

2. **Minor:** Section 7.8 Data Architecture mentions "durable workflow engine" but an earlier version mentioned "Restate/PostgreSQL" in this context. Confirm no internal tool names remain. Verified clean after fix - no further action needed.

3. **Minor:** The default management dress rehearsal is described as "1 day full simulation" in the commercial proposal but not given a specific duration in the technical proposal. Align the two documents.

4. **Minor:** The compliance matrix TR-003 (initial/variation/intraday margin) is marked Full but the description would benefit from explicitly noting that DALP does not perform margin calculation - PRISMA does. This distinction is important for EMIR evaluators.

## Improvements for reviewed_1

1. Add PRISMA communication protocol (REST API + webhook) to Section 6.4 margin enforcement narrative.
2. Align default management dress rehearsal description between technical and commercial proposals.
3. Strengthen TR-003 compliance matrix note to explicitly state PRISMA as margin calculation authority and DALP as enforcement layer.
4. Add a sentence in Section 1.3 noting that DALP does not perform risk/margin calculation - all risk model governance remains with Eurex's PRISMA.
