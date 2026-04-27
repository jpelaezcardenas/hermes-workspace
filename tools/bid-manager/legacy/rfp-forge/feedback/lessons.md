# Lessons Learned

This file captures lessons from generated buyer-side procurement documents and research-backed best practices.

Read this file before every generation run. Add short, high-signal lessons after review of any generated RFP, RFI, or tender.

## How to Use This File

1. Read before every generation run
2. Apply relevant lessons during document creation
3. Add new lessons after document review or feedback
4. Mark lessons as superseded if later experience contradicts them

## Template

### Date
- Institution:
- Document type:
- Source of feedback:
- Lesson:
- Action for future generations:

---

## Baseline Best Practices (from research synthesis, 2026-03-14)

### Requirement Engineering

1. **Every requirement must be testable.** If an evaluator cannot unambiguously determine compliance from the vendor's response, the requirement is poorly written. Rewrite before including.

2. **Keep requirements atomic.** One requirement per statement. "The platform shall support issuance AND settlement AND custody" is three requirements, not one. Split them.

3. **Cap mandatory requirements at ~60%.** When everything is "Must Have", evaluation loses differentiation power. Reserve Must for genuinely disqualifying gaps; use Should and Could for quality differentiation.

4. **Quantify where possible.** "The system shall handle high volumes" is unscorable. "The system shall process a minimum of 10,000 transactions per hour" is testable.

5. **Avoid vague adjectives.** "Robust", "scalable", "user-friendly", "comprehensive", "state-of-the-art" — these add no evaluation value unless quantified with measurable criteria.

6. **Use RFC 2119 / MoSCoW consistently.** Shall/Must = mandatory pass/fail. Should = important, scored. May/Could = desirable, bonus points. Won't = explicitly excluded. Never mix these arbitrarily.

### Evaluation Design

7. **Always publish evaluation methodology.** Undisclosed criteria are the #1 vendor complaint and create legal risk. Publish weightings, scoring rubric, and gate structure in the document itself.

8. **Use multi-gate evaluation.** Minimum: Administrative Compliance (Pass/Fail) → Qualification (Pass/Fail) → Scored Evaluation (Weighted). This prevents wasting evaluator time on unqualified bidders.

9. **Define what each score means.** A bare "score 0-5" is subjective. Define: 5 = exceeds with evidence, 4 = fully meets, 3 = adequately meets, 2 = partially meets, 1 = minimally addresses, 0 = not addressed.

10. **Consider two-envelope systems.** Evaluate technical proposals before opening commercial proposals. This prevents price from biasing technical assessment — critical for complex technology procurement.

11. **Evaluation weighting IS procurement strategy.** If you weight price at 60%, you'll get cheap but potentially weak solutions. If you weight technical at 60%, you'll get better solutions at higher cost. Design weightings intentionally based on institutional priorities.

12. **Include evaluation panel guidance.** Specify that the panel should include procurement, technical, compliance, and business stakeholders. Single-evaluator decisions are procurement risk.

### Procurement Mechanics

13. **Set realistic timelines.** Minimum 3-4 weeks for simple RFPs, 4-6 weeks for complex RFPs, 6-12 weeks for public sector tenders. The average US public procurement cycle is 57 days. Don't compress artificially.

14. **Always include a Q&A window.** Clarification periods are not optional for credible procurement. Typically 1-2 weeks after issuance, with all Q&A shared with all bidders for fairness.

15. **Include conflict-of-interest provisions.** Both vendor declarations (no COI with the buyer) and evaluator declarations (no personal interest in any vendor). This is compliance practice, not optional good practice.

16. **Specify communications protocol.** Single point of contact, no lobbying, all communications in writing. Violations should be grounds for disqualification.

17. **Include reservation of rights.** The buyer reserves the right to cancel, modify, or re-issue the procurement at any time. Standard institutional protection.

18. **Response templates create comparability.** Require vendors to use structured response templates. Without them, comparing 5+ vendor responses becomes subjective and inconsistent.

### Document Quality

19. **Don't copy-paste old RFPs without updating.** Every procurement has unique institutional context, jurisdiction, and scope. Reusing old documents creates contradictory requirements and irrelevant sections.

20. **Include a glossary.** Define all technical terms, abbreviations, and institutional terminology. Different vendors may interpret "custody" or "settlement" differently without clear definitions.

21. **Keep documents proportionate.** A 200-page ITT for a $500K project is disproportionate. A 15-page RFI for a $50M platform procurement is insufficient. Match document depth to procurement value and complexity.

22. **Distinguish scope clearly.** What's in scope, what's out of scope, and what's in scope for future phases. Ambiguous scope is the #1 cause of procurement disputes post-award.

23. **Include transition requirements.** For replacement procurements, specify transition-in requirements (data migration, parallel running, knowledge transfer) and transition-out requirements (data portability, exit assistance).

### Vendor Experience

24. **Design for quality responses, not maximum responses.** Well-structured qualification gates filter out unqualified vendors early, saving both buyer and vendor effort. A procurement that attracts 3-5 excellent responses beats one that attracts 20 mediocre ones.

25. **Don't make vendors guess the response format.** Explicitly specify how responses should be structured, what page/word limits apply, what evidence should be attached, and what format (DOCX, PDF, XLSX for pricing) is required.

26. **Pricing templates must enable comparison.** Provide a mandatory pricing workbook that all vendors must complete. Free-form pricing submissions are impossible to compare fairly.

### Public Sector Specific

27. **Know the applicable procurement regulations.** EU Directive 2014/24/EU, UK Procurement Act 2023, World Bank Procurement Framework, and national procurement laws have specific procedural requirements. Non-compliance can invalidate the entire procurement.

28. **Advertising and standstill periods are mandatory in public sector.** OJEU notices (EU), SAM.gov (US), national gazette (various). Standstill periods before contract award allow unsuccessful bidders to challenge.

29. **Sustainability and social value criteria are increasingly required.** EU and World Bank procurement increasingly mandates environmental and social evaluation criteria. Include where applicable.

---

## Generation Lessons

### 2026-03-14
- Institution: N/A (baseline establishment)
- Document type: N/A
- Source of feedback: Research synthesis from 10 research rounds
- Lesson: Agent overhaul from responder to generator completed. Baseline best practices established from institutional procurement research covering RFP/ITT/RFI creation, financial services procurement, evaluation methodology, requirement engineering, and public sector standards.
- Action for future generations: Apply all baseline best practices. Add specific lessons after each document generation run.
