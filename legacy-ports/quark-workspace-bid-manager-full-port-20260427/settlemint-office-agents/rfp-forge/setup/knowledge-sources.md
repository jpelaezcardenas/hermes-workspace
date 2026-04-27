# Knowledge Sources

Use these sources to make generated procurement documents realistic, institution-specific, and commercially credible.

The goal is not to praise a vendor. The goal is to understand what a serious buyer would demand from the market when sourcing a digital asset platform.

## 1. Target Account Dossiers — `../product/dalp/target-accounts/dossiers/`

**Primary source — always read first.**

Use target account dossiers to understand:
- institution type (bank, regulator, sovereign entity, development bank, asset manager)
- geography, jurisdiction, and applicable procurement regulations
- digital asset maturity and CLM level
- public initiatives and strategic signals
- likely procurement posture (exploratory, competitive, mandate-driven)
- technology sophistication and existing infrastructure
- operational priorities and risk tolerance
- whether public sector procurement rules apply

This dossier drives the tone, structure, sophistication, and evaluation methodology of the generated document.

## 2. DALP Capability Mapping — `../product/dalp/capability-mapping/`

**Use to understand which requirement domains are relevant in digital asset platform procurement.**

This source helps RFPForge craft realistic requirement sets across:
- issuance and origination
- lifecycle servicing and corporate actions
- compliance controls and regulatory reporting
- settlement and post-trade processing
- custody-related workflows
- reporting, analytics, and dashboards
- integration and interoperability
- deployment models and infrastructure
- security, key management, and access governance

**Use it to shape the question set and requirement domains.** It tells you what a buyer should be asking about — not how a vendor would answer.

## 3. Competitor Dossiers — `../product/dalp/competitors/`

**Use to understand the vendor landscape buyers are likely evaluating.**

This source informs realistic procurement focus areas:
- interoperability expectations (what should the buyer demand?)
- deployment flexibility (cloud, on-premise, hybrid — what should be required?)
- control model expectations (tenant-managed vs vendor-managed)
- implementation complexity (what timeline and resource expectations are realistic?)
- regulatory alignment (what certifications and compliance capabilities should be minimum qualification?)
- operating model expectations (SaaS, PaaS, managed service — what should the buyer specify?)

**Do not turn the procurement document into a comparison sheet.** Use this source to understand what differentiating requirements would surface quality vendors and filter out weaker ones.

## 4. Regulatory Research — `../research/`

**Use to ground the document in the correct regulatory context.**

Jurisdictional research should inform:
- which regulatory bodies to reference (VARA, DFSA, MAS, MiCA, FCA, etc.)
- specific compliance requirements to include as mandatory qualification criteria
- licensing and authorization requirements for vendors operating in the jurisdiction
- data residency and sovereignty requirements
- reporting obligations that the platform must support

**Never add regulatory references for decoration.** Every cited regulation must be genuinely relevant to the institution, jurisdiction, and procurement scope.

## 5. Real Financial Services Procurement Patterns

**Use established procurement patterns to make the output believable and defensible.**

The following patterns are drawn from real institutional procurement and should be reflected in generated documents where appropriate:

### Procurement Mechanics
- Confidentiality notices and NDA requirements
- Staged procurement timelines with defined milestones
- Bidder clarification windows with Q&A protocols
- Communications protocols and contact restrictions
- Response validity periods (90-180 days)
- Reservation of rights and non-commitment language

### Qualification and Compliance
- Mandatory qualification criteria with pass/fail gates
- Financial standing thresholds (minimum revenue, audited statements)
- Required certifications (ISO 27001, SOC 2 Type II)
- Reference client requirements (minimum count, relevance criteria)
- Debarment and sanctions screening
- Conflict-of-interest declarations (both vendor and evaluator)

### Evaluation
- Weighted scoring methodology with published rubric
- Multi-gate evaluation (administrative → qualification → scored)
- Two-envelope systems (technical evaluated before commercial)
- MEAT (Most Economically Advantageous Tender) assessment
- Evaluation panel composition guidance
- Demonstration and proof-of-concept requirements

### Commercial
- Mandatory pricing templates for comparability
- Total cost of ownership frameworks
- SLA frameworks with service credits
- Payment milestones tied to deliverables
- Price escalation mechanisms for multi-year contracts

### Legal and Contractual
- Draft contract terms or term sheets
- IP ownership and licensing provisions
- Data ownership and portability requirements
- Transition-in and transition-out provisions
- Liquidated damages frameworks
- Force majeure provisions
- Dispute resolution mechanisms

## 6. Public Sector Procurement Standards

**Use when the institution operates under formal public procurement regulations.**

| Framework | When to Apply | Key Requirements |
|---|---|---|
| EU Directive 2014/24/EU | EU member state institutions | OJEU notice, standstill period, MEAT assessment, procedure types |
| UK Procurement Act 2023 | UK public sector post-Brexit | Transparency, proportionality, equal treatment |
| World Bank Procurement Framework | Development bank-funded projects | Standard procurement documents, QCBS, specific evaluation methods |
| GCC Government Procurement | Gulf state sovereign entities | National procurement portals, local content requirements |
| US FAR/DFAR | US federal agencies | SAM.gov registration, FAR compliance, small business set-asides |

## Practical Rules

1. **If the dossier doesn't support an assumption, stay generic.** Specificity is useful only when it remains credible.
2. **Never write requirements that assume a specific vendor's architecture.** Requirements describe outcomes, not implementations.
3. **Calibrate depth to CLM level.** A CLM 2 institution shouldn't receive a 120-page ITT. A CLM 5 institution shouldn't receive a 15-page RFI.
4. **Use sources to inform the buyer's questions, not the vendor's answers.** The procurement document defines what must be proven, not how to prove it.
5. **Cross-reference capability mapping with competitor intelligence.** Where all vendors can do something easily, making it a "Must" is appropriate. Where vendors differ significantly, making it a scored "Should" with detailed response requirements surfaces differentiation.
