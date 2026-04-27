# Research Synthesis — RFP Forge Deep Overhaul

Date: 2026-03-14

## Research Rounds Completed

### Round 1: Best Practices for Writing Institutional RFPs

**Key findings:**
- Cross-functional RFP teams are essential: finance, legal, compliance, IT/security, and end-user business units should all contribute before issuance
- The "10-section banking RFP" structure is widely adopted: Executive Summary → Organizational Context → Scope & Requirements → Compliance/Security → Pricing → Vendor Qualifications → Timeline → Evaluation → Submission → Appendices
- Requirement phrasing should use SHALL/MUST/SHOULD/MAY hierarchy aligned with RFC 2119 and procurement norms
- Evaluation criteria and weightings MUST be published in the RFP itself — undisclosed criteria create legal risk and vendor complaints
- A Q&A / clarification window is considered mandatory practice to ensure fairness and reduce ambiguity
- "Most Economically Advantageous Tender" (MEAT) is the EU standard for evaluation — not just lowest price

**Sources:** inventive.ai Banking RFP Guide, Responsive.io ITT guide, Tendify ITT guide, LexisNexis ITT drafting guidance

### Round 2: Financial Services Procurement Document Standards

**Key findings:**
- Banking RFPs commonly require: SOC 2 Type II, ISO 27001, BSA/AML compliance, GDPR/CCPA, NYDFS Cybersecurity Regulation
- Banks use pre-qualification questionnaires (PQQs) / Selection Questionnaires (SQs) to filter vendors before the full ITT stage
- SBI India's CBDC RFP (191 pages) is an exemplar of bank-grade procurement: covers Invitation to Bid, Disclaimer, Definitions, Scope of Work, Eligibility Criteria, EMD, Bid Preparation, Evaluation, Conflict of Interest, Code of Integrity, Liquidated Damages, Force Majeure
- Central Bank of India's CBDC RFP (113 pages) follows: Bid Details → Deliverables & SLAs → Technical Evaluation → NDA → Eligibility → Undertaking
- FintechRFPs.com templates show banks require separate Technical and Financial bid envelopes
- Treasury management RFPs (UCO Bank, 376 pages) demonstrate the scale of serious procurement documents

**Sources:** SBI CBDC RFP, Central Bank of India CBDC RFP, fintechrfps.com, UCO Bank CIGTMS RFP

### Round 3: Digital Asset / Blockchain Platform RFPs

**Key findings:**
- Real blockchain RFPs from banks cover: blockchain technology fundamentals section, multi-lingual support, liaison with existing vendors, solution architecture, current vs proposed workflows
- PSB Alliance (India) blockchain RFP: 122 pages covering eligibility criteria, scope summary, technical consultancy, proposed solution architecture, detailed scope of work
- BIS Innovation Hub (Project Pyxtrial): RFQ for stablecoin data reporting infrastructure — demonstrates how central banks procure blockchain-adjacent technology
- Bank of Israel RFI: Excellent example of a central bank RFI for banking system modernization — includes detailed component requirements (Core Banking, Developer Portal, API specifications, reference architectures)
- Digital asset RFPs uniquely require: consensus mechanism specifications, smart contract audit requirements, key management and custody workflows, regulatory reporting automation, cross-chain interoperability

**Sources:** MPBCDC Blockchain RFP, PSB Alliance Blockchain RFP, BIS Innovation Hub Pyxtrial RFQ, Bank of Israel RFI

### Round 4: Tender Document Creation Best Practices

**Key findings:**
- ITTs use multi-gate evaluation: Gate A (Administrative Compliance) → Gate B (Economic/Financial Standing) → Gate C (Capability Assessment) → Gate D (Technical + Pricing Evaluation)
- UK Procurement Act 2023 now governs public procurement — replaces EU-era regulations post-Brexit
- Pass/fail gates MUST be clearly defined upfront — "A 'No' response to any question where the supplier fails to provide satisfactory evidence = Fail"
- Average procurement cycle: 57 days from posting to award (US public sector, 2025 data)
- ITT vs RFP distinction: ITTs are prescriptive (buyer knows exactly what they need), RFPs allow creative solutions
- Crown Commercial Service recommends reading all tender documents at least twice before responding — this means as the CREATOR, documents must be unambiguous on first read
- Over-promising in tenders creates contractual obligations — this means requirements must be precise enough that vendors can commit honestly

**Sources:** T Levels ITT Evaluation Methodology, Tendify EU, RFP.quest, Supply2Gov, Thornton & Lowe

### Round 5: RFI Creation Patterns

**Key findings:**
- RFIs are NOT solicitations — they are market research tools that should explicitly state "this is not a commitment to procure"
- Good RFIs are approachable: vendors should want to respond, not feel burdened
- RFI structure should be lighter than RFP: Company Overview, Platform Capabilities, Regulatory Alignment, Deployment Options, References, Pricing Model
- Government RFIs (US federal) explicitly state they don't lead to contract awards
- RFIs should gather: functional coverage, architectural maturity, integration patterns, operational readiness
- Bank of Israel RFI is exemplary: includes detailed technical table with components and requirements (Core Banking, Developer Portal, API specs, Reference Architectures from Tier-1/2 banks)
- Multi-stage procurement: RFI → shortlist → RFP → BAFOs (Best and Final Offers) is common in large financial services procurements

**Sources:** Bank of Israel RFI, inventive.ai RFI guide, ISM RFP/RFI/RFQ comparison, Mastering Procurement RFI guide

### Round 6: Evaluation Methodology Design

**Key findings:**
- Weighted scoring matrices are the gold standard: assign percentage weights to categories, then score each within 0-5 or 0-10 scale
- Common banking RFP weighting: Technical & Functional Fit 40%, Pricing 25%, Security & Compliance 20%, Vendor Viability 15%
- Alternative weighting for tenders: Technical 60%, Commercial 25%, Experience 15%
- MoSCoW (Must/Should/Could/Won't) applies to requirement PRIORITIZATION, not to scoring
- Scoring rubrics should define what each score level means (e.g., 5 = "Exceeds requirements with evidence", 3 = "Meets requirements", 1 = "Partially meets", 0 = "Does not address")
- Evaluation panels should include independent subject matter experts, not just the procurement team
- Two-envelope system: Technical envelope evaluated first (pass/fail + scored), then financial envelope opened only for technically qualified bidders
- MEAT (Most Economically Advantageous Tender) requires publishing evaluation methodology in advance

**Sources:** SpecLens RFP Evaluation Matrix, Wicely Supplier Evaluation Framework, inventive.ai evaluation criteria, T Levels ITT methodology

### Round 7: Procurement Compliance Requirements

**Key findings:**
- Canada's Contracting Policy Notice 2025-3 establishes comprehensive conflict-of-interest mitigation frameworks
- Confidentiality clauses should cover: bidder information protection, NDA requirements pre-submission, data handling during evaluation, post-award information restrictions
- Evaluator conflict-of-interest declarations are standard practice — evaluators must sign statements confirming no personal interest in vendors
- FAR (Federal Acquisition Regulation) Part 5603 covers: improper business practices, personal conflicts of interest, organizational conflicts of interest (OCI)
- Three types of OCI: unequal access to information, biased ground rules, impaired objectivity
- Standard procurement compliance elements: EMD/bid security, bid validity periods, code of integrity declarations, debarment checks, anti-corruption certifications
- Liquidated damages clauses, force majeure provisions, and termination-for-default clauses are standard in bank procurement

**Sources:** Canada Contracting Policy Notice 2025-3, FAR Part 5603, Idaho State University COI template, New York State Procurement Guidelines

### Round 8: Public Sector Procurement Standards

**Key findings:**
- **EU Directive 2014/24/EU**: Harmonized rules for public procurement across EU member states — thresholds, procedures (open, restricted, competitive dialogue, innovation partnership), mandatory e-procurement
- **World Bank Procurement Framework** (5th Edition, September 2023): Establishes standards for investment project financing — emphasizes value for money, economy, integrity, fit for purpose, efficiency, transparency, fairness
- **GCC Post-COVID Procurement Transformation** (Arthur D. Little): GCC governments modernizing procurement with digital platforms, sustainability requirements, and enhanced transparency
- EU procurement allows: open procedure, restricted procedure, competitive procedure with negotiation, competitive dialogue, innovation partnership, design contest
- World Bank procurement categories: goods, works, non-consulting services, consulting services — each with distinct methods
- Public sector RFPs must comply with advertising requirements (OJEU notices for EU, SAM.gov for US federal)
- Sustainable procurement (environmental, social criteria) increasingly mandated in EU and World Bank procurement

**Sources:** EU Directive 2014/24/EU, World Bank Procurement Framework, Arthur D. Little GCC report, EU Internal Market procurement page

### Round 9: Requirements Engineering for Procurement

**Key findings:**
- SMART requirements: Specific, Measurable, Achievable, Relevant, Time-bound
- INCOSE (International Council on Systems Engineering) defines 42 rules for writing excellent requirements
- Ten attributes of testable requirements: unambiguous, complete, consistent, feasible, testable, traceable, correct, necessary, prioritized, verifiable
- Requirements should be atomic (one requirement per statement), not compound
- Avoid: passive voice, vague adjectives ("user-friendly", "robust", "scalable"), undefined terms, negative requirements where positive can work
- Each requirement should have a clear acceptance criterion — if you can't test it, you can't score it
- Requirements should be independent — changing one should not require changing others
- Use "the system shall" not "the system should be able to" — direct, unambiguous phrasing

**Sources:** INCOSE Requirements Quality guide, Ten Attributes of Testable Requirements, SMART Requirements methodology

### Round 10: Common RFP Mistakes and Anti-Patterns

**Key findings:**
- **Vague requirements**: "The solution should be scalable" — no acceptance criterion, impossible to score
- **Copy-paste syndrome**: Reusing old RFPs without updating for current context — leads to irrelevant or contradictory requirements
- **Unrealistic timelines**: Not allowing enough time for vendor response (minimum 3-4 weeks for complex RFPs, 6+ weeks for major procurements)
- **Undisclosed evaluation criteria**: Vendors can't tailor responses, leads to complaints and challenges
- **Overly complex documents**: 500+ page RFPs that bury important requirements in noise
- **Missing response templates**: Forcing vendors to guess at response format makes comparison impossible
- **No Q&A period**: Prevents vendors from clarifying ambiguities, leads to inconsistent interpretations
- **Conflating mandatory and desirable**: When everything is "must have", nothing is — vendors can't prioritize
- **Ignoring vendor feedback from previous procurements**: Repeating the same mistakes
- **Scope creep during procurement**: Changing requirements after issuance without formal amendment
- **Single evaluator bias**: No panel, no independent review — procurement decisions made by one person
- **Price-only evaluation**: Ignoring total cost of ownership, implementation risk, and vendor viability

**Sources:** inventive.ai Common RFP Mistakes, Sparkrock 7 Common RFP Mistakes, SpecLens RFP Red Flags, various procurement guides

## Key Cross-Cutting Themes

1. **Multi-gate evaluation** is universal in serious procurement: administrative → financial standing → capability → technical+commercial
2. **Requirement testability** is the single most important quality factor — if you can't score it, don't include it
3. **Published evaluation methodology** is not optional for credible procurement — it's a legal and fairness requirement
4. **Two-envelope systems** (technical first, then financial) prevent price from overwhelming quality assessment
5. **Cross-functional authorship** is critical — procurement alone can't write good technical RFPs
6. **Vendor experience matters** — well-structured RFPs attract better vendors and better responses
7. **Multi-stage procurement** (RFI→shortlist→RFP→BAFOs) is the norm for complex technology procurements
8. **Sustainability and social value** are increasingly required evaluation criteria, especially in EU and World Bank procurement
9. **Digital platforms** for procurement management are becoming standard (GEM in India, OJEU/TED in EU, SAM.gov in US)
10. **Conflict of interest management** is a compliance requirement, not optional good practice
