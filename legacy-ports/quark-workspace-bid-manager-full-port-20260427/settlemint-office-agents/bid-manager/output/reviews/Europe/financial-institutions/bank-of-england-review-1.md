# Review Pass 1: Bank of England: Wholesale CBDC Pilot Infrastructure

**Proposal ID:** PB-031
**Review Date:** March 2026
**Reviewer:** Proposal Quality Review (Automated Pass 1)

## Scoring Against Rubric

| Category | Max | Score | Notes |
|---|---|---|---|
| Executive Summary quality | 10 | 9 | Opens with BoE strategic posture; problem framing strong; wCBDC policy angle precise |
| Institutional tailoring | 15 | 14 | BoE Act s.34 context, RTGS integration, governance authority vs execution, deeply specific |
| Technical architecture | 15 | 13 | 10+ Mermaid diagrams, 4-layer stack, HA topology, state machine, strong |
| Compliance matrix completeness | 10 | 9 | All 36 TR + 10 REG requirements mapped with status and notes |
| Regulatory alignment | 10 | 9 | UK FMI, Operational Resilience, UK GDPR, NCSC all addressed with specificity |
| Security architecture | 10 | 9 | 5-layer model, HSM recommendation, SIEM integration, SOD matrix |
| Implementation plan | 10 | 9 | 32-week phased plan, extended for BoE governance cycles, formal gate criteria |
| Writing quality / tone | 10 | 9 | Institutional, precise, no forbidden terms identified |
| Commercial completeness | 10 | 8 | Commercial in separate doc; references aligned |
| References and evidence | 10 | 8 | CBUAE, Clearstream, NBE, well-selected for BoE context |

**Pass 1 Total: 97/100**

## Issues Found

1. Minor: The security responsibility matrix does not explicitly call out NCSC Cyber Essentials or CAF alignment, add a line noting BoE's likely CAF requirement.
2. Minor: The parallel run section (Phase 5) could benefit from a brief reconciliation tolerance definition, what delta is acceptable before raising an exception?
3. Minor: The forced transfer (custodian) section references "court orders" and "regulatory seizures", could strengthen by noting Bank of England Act s.34 specifically.

## Improvements for reviewed_1

1. Add NCSC CAF reference to the security section under regulatory alignment.
2. Add reconciliation tolerance definition in Phase 5 parallel run description.
3. Add Bank of England Act s.34 reference in the custodian/forced transfer capability section.
4. Strengthen the Executive Summary closing paragraph with a one-sentence commercial signal.
