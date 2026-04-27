# Writing Style

RFPForge writes from the buyer side.

The output must read like a formal procurement document issued by a regulated financial institution, not like a vendor response and not like marketing copy.

## Core Writing Rules

### 1. Use formal procurement language

Write in a structured, institutional style suitable for procurement, compliance, legal, architecture, and business review teams.

Prefer:
- `The Vendor shall...`
- `The proposed solution must...`
- `The Respondent should provide...`
- `Bidders are required to...`
- `The Authority reserves the right to...`
- `Proposals that fail to demonstrate...`

Avoid conversational language, promotional phrasing, and startup shorthand.

### 2. State requirements using priority language

Use requirement verbs consistently, aligned with both MoSCoW and RFC 2119:

| Priority | Procurement verb | MoSCoW | Evaluation impact |
|---|---|---|---|
| Mandatory | shall / must | Must Have | Pass/fail — non-compliance is disqualifying |
| Important | should | Should Have | Scored — absence reduces score significantly |
| Desirable | may / could | Could Have | Scored — presence adds value but absence is not penalized |
| Excluded | will not / is excluded | Won't Have | Clarification — explicitly out of scope |

Where formal requirement statements are used, prefer `shall` for mandatory procurement language.

**Rules for priority assignment:**
- No more than 60% of requirements should be mandatory (Must) — if everything is mandatory, nothing is
- At least 20% should be desirable (Could) to allow vendor differentiation
- Explicitly mark out-of-scope items to prevent vendor over-engineering

### 3. Write testable, scoreable requirements

Every requirement must pass the **testability test**: can an evaluator unambiguously determine whether a vendor's response satisfies this requirement?

**The SMART requirement framework for procurement:**
- **S**pecific — one requirement per statement, no compound asks
- **M**easurable — quantified where possible (response times, uptime percentages, capacity thresholds)
- **A**chievable — within the scope of what the market can reasonably deliver
- **R**elevant — directly tied to institutional objectives and evaluation criteria
- **T**ime-bound — where applicable, include implementation timeline expectations

**INCOSE-aligned attributes for good requirements:**
1. Unambiguous — only one interpretation possible
2. Complete — no missing information needed to evaluate
3. Consistent — no contradiction with other requirements
4. Feasible — technically and commercially achievable
5. Testable — clear acceptance criterion
6. Traceable — linked to institutional objective or business need
7. Atomic — one requirement per statement
8. Necessary — genuinely required, not padding
9. Prioritized — Must/Should/Could explicitly assigned
10. Verifiable — vendor can demonstrate compliance

**Good requirement:**
```
FR-014: The platform shall support configurable transfer restrictions based on 
jurisdiction, investor classification, and holding period rules. The Respondent 
shall describe the configuration mechanism and provide evidence of deployment 
in a regulated environment.
Priority: Must
Response format: Narrative with supporting evidence
```

**Bad requirement:**
```
The solution should be robust, scalable, and user-friendly with comprehensive 
digital asset management capabilities.
```
Why it fails: compound (three qualities), vague ("robust", "scalable", "user-friendly"), no acceptance criterion, unscorable.

**More good vs bad examples:**

| Bad (unscorable) | Good (scoreable) |
|---|---|
| "The system should handle high volumes" | "The platform shall process a minimum of 10,000 transactions per hour with sub-second confirmation latency under normal operating conditions" |
| "The solution must be secure" | "The platform shall implement encryption at rest (AES-256 minimum) and in transit (TLS 1.2+), with key management compliant with FIPS 140-2 Level 2 or equivalent" |
| "The vendor should have relevant experience" | "The Respondent shall provide at least three (3) reference implementations for regulated financial institutions with digital asset operations in production for a minimum of twelve (12) months" |
| "Integration should be straightforward" | "The platform shall provide documented RESTful APIs for integration with core banking systems, with API documentation conforming to OpenAPI Specification 3.0+" |
| "The system should comply with regulations" | "The platform shall support regulatory reporting aligned with [specific regulation], including automated generation of [specific report type] in [specific format]" |

### 4. Design evaluation criteria with scoring rubrics

Procurement documents must define how bidders will be assessed. Undisclosed criteria create legal risk and vendor complaints.

**Standard evaluation structure:**

```
## Evaluation Methodology

Proposals will be evaluated using a weighted scoring methodology. The evaluation
will proceed through the following gates:

### Gate 1: Administrative Compliance (Pass/Fail)
- Timely submission
- All mandatory documents provided
- Conformance to submission format requirements
- Signed declarations (NDA, Conflict of Interest, Code of Integrity)

### Gate 2: Financial Standing (Pass/Fail)  
- Minimum annual revenue threshold
- Audited financial statements for [n] years
- Professional indemnity insurance confirmation
- No adverse findings from credit/solvency checks

### Gate 3: Capability Assessment (Pass/Fail)
- Minimum [n] years operating in digital asset / DLT domain
- Minimum [n] reference implementations in regulated financial services
- Required certifications (ISO 27001, SOC 2 Type II, etc.)

### Gate 4: Technical and Commercial Evaluation (Scored)

| Category | Weight | Scoring Criteria |
|---|---|---|
| Functional fit | 35% | Completeness, depth, and quality of functional capability responses |
| Technical architecture and integration | 25% | Architecture quality, integration approach, scalability, resilience |
| Security and compliance | 20% | Security posture, regulatory alignment, audit readiness |
| Implementation approach | 10% | Methodology, timeline, resource plan, risk mitigation |
| Commercial model | 10% | Total cost of ownership, pricing transparency, value for money |
```

**Scoring rubric (include in every scored evaluation):**

| Score | Label | Definition |
|---|---|---|
| 5 | Excellent | Response significantly exceeds requirements with comprehensive evidence and innovation |
| 4 | Good | Response fully meets requirements with strong supporting evidence |
| 3 | Acceptable | Response adequately meets requirements with reasonable evidence |
| 2 | Partial | Response partially meets requirements — gaps or insufficient evidence |
| 1 | Poor | Response minimally addresses the requirement — significant deficiencies |
| 0 | Non-compliant | Requirement not addressed or response is non-compliant |

**Weighting guidance by procurement context:**

| Context | Technical | Commercial | Compliance | Experience | Implementation |
|---|---|---|---|---|---|
| Innovation/pilot | 40% | 15% | 20% | 15% | 10% |
| Greenfield platform | 35% | 15% | 20% | 15% | 15% |
| Replacement/migration | 25% | 15% | 15% | 15% | 30% |
| Regulatory mandate | 20% | 10% | 40% | 20% | 10% |
| Framework agreement | 30% | 25% | 20% | 15% | 10% |

### 5. Use legal and compliance terminology appropriate to jurisdiction

Reflect the institution's jurisdiction and regulatory environment.

Use precise references where relevant:
- **UAE**: VARA, DFSA, ADGM, CBUAE, SCA
- **EU**: MiCA, DORA, GDPR, EBA Guidelines, ECB
- **UK**: FCA, PRA, Bank of England
- **Singapore**: MAS, PSA
- **Hong Kong**: HKMA, SFC
- **Switzerland**: FINMA
- **Saudi Arabia**: SAMA, CMA
- **India**: RBI, SEBI
- **US**: SEC, CFTC, OCC, FinCEN, NYDFS

Do not add regulatory references casually. They must fit the institution and sourcing context.

### 6. Avoid vendor-specific language

The document must remain vendor-agnostic.

Do not mention:
- SettleMint, DALP, or any specific vendor or product
- Named feature brands
- Branded product language
- Capabilities framed as if a specific vendor has already been selected
- Architecture patterns unique to a single vendor

The institution is describing what it seeks from the market, not endorsing a provider.

### 7. Use institutional terminology

Prefer formal sector language:

| Avoid | Prefer |
|---|---|
| crypto | digital assets |
| blockchain | distributed ledger technology (DLT) |
| token minting | issuance |
| burning | redemption |
| wallet | custody wallet, custody account, safekeeping capability |
| smart contract | programmable contract, automated compliance logic |
| DeFi | decentralized financial services (if relevant at all) |
| NFT | non-fungible digital asset |
| gas fees | network transaction costs |
| fork | protocol upgrade, network divergence |
| mainnet / testnet | production network, testing environment |
| whale | significant market participant |
| HODL, moon, etc. | (never use) |

### 8. Include procurement boilerplate

Most credible institutional procurement documents include buyer-side process language:

**Always include:**
- Confidentiality and NDA requirements
- Conflict-of-interest declaration requirements
- Clarification and Q&A protocols (with timeline)
- Submission format requirements (electronic, number of copies, file format)
- Contact restrictions and communications protocol
- Response validity period (typically 90-180 days)
- Reservation of rights language
- Right to cancel, amend, or re-issue
- Data protection and information handling during evaluation

**Include when appropriate:**
- Bid security / Earnest Money Deposit (EMD) requirements
- Code of integrity / anti-corruption declarations
- Debarment and sanctions compliance
- Local content / local supplier requirements
- Insurance requirements (professional indemnity, cyber liability)
- Parent company guarantee requirements
- Sustainability and social value commitments
- Freedom of Information Act (FOIA) implications (public sector)

### 9. Structure for readability and navigation

- Use consistent section numbering (1., 1.1, 1.1.1)
- Use requirement ID prefixes consistently: FR- (Functional), TR- (Technical), CR- (Compliance), SR- (Security), IR- (Implementation), CM- (Commercial)
- Include a table of contents for documents over 15 pages
- Use tables for requirement listings — they are more scannable than prose
- Include a glossary of terms and abbreviations
- Keep individual sections focused — one domain per section
- Use cross-references between related requirements

### 12. Structure commercial and pricing sections for comparability

Commercial requirements are the section most often written poorly in institutional RFPs. Vague pricing asks produce incomparable submissions that cannot be fairly evaluated.

**Specify the pricing model scope explicitly.** The RFP must tell bidders which cost components to include so all responses cover the same scope:

- Licensing or subscription fees (split by module or tier where applicable)
- Implementation and integration professional services (itemised by phase)
- Annual maintenance and support (clearly separated from licensing)
- Training and change management
- Third-party infrastructure, cloud hosting, or network costs
- Ongoing managed service fees if applicable
- Volume or transaction-based charges (specify the usage scenario to price against)

**Require a total cost of ownership (TCO) projection.** Ask bidders to provide a 3-year or 5-year TCO table using a defined usage scenario. This forces comparable projections and exposes cost models that front-load or back-load costs.

**Do not combine pricing and technical responses in the same section.** Commercial responses should be in a separate appendix or envelope to prevent price from influencing the technical evaluation panel.

**Flag price-sensitivity clauses.** Where the institution cannot accept open-ended cost escalation, include a requirement for: price stability periods, volume discount schedules, CPI-linked escalation caps, and exit provisions that do not impose prohibitive switching costs.

**Example pricing requirement:**

```
CM-001: The Respondent shall complete the pricing schedule in Appendix D, 
providing itemised fees for all components listed. Pricing shall be fixed 
for a minimum of 24 months from contract execution. Escalation beyond 
this period shall not exceed the annual rate of change in the EU HICP 
index without prior written agreement.
Priority: Must
Response format: Pricing (Appendix D completion)
```

### 13. Write explicit scope boundaries and exclusion statements

Scope ambiguity is one of the most frequent causes of misaligned vendor proposals, disputed change orders, and evaluation challenges. Every procurement document should contain a dedicated scope section that draws clear boundaries between what is in scope, what is explicitly excluded, and what is deferred.

**In-scope statements** should describe the functional and operational boundary of the procurement in concrete terms. Prefer enumerating capability domains rather than describing intent.

**Good scope statement:**
```
This procurement covers the provision, deployment, and operation of a digital 
asset issuance, custody, and lifecycle management platform. In-scope capabilities 
include: asset issuance across bond, equity, and fund instrument types; custody 
wallet management with multi-signature and maker-checker controls; automated 
lifecycle event processing (coupon, dividend, maturity, redemption); regulatory 
reporting for [jurisdiction]; and integration with the Institution's core banking 
system via documented APIs.
```

**Bad scope statement:**
```
This procurement is for a comprehensive digital asset platform solution.
```
Why it fails: no boundary, no enumeration, invites wildly different interpretations of coverage.

**Exclusion statements** must be affirmative and specific. Use `is excluded from scope` or `does not form part of this procurement` rather than leaving items unmentioned. Unmentioned items create ambiguity about whether they were overlooked or deliberately omitted.

**Required exclusion language patterns:**
- `The following are explicitly excluded from the scope of this procurement: [list]`
- `Respondents should not include [capability] in their proposals. Any unsolicited capability outside the defined scope will not be evaluated or scored.`
- `[Capability area] is under separate procurement and must not be bundled into responses to this document.`

**Deferred-scope items** should be identified separately from exclusions. Where the institution intends to procure a capability in a later phase, state this explicitly so vendors can indicate future readiness without including it in current pricing or evaluation.

```
The following capabilities are not in scope for this procurement phase but may 
form part of a subsequent phase. Respondents may indicate readiness for these 
capabilities in Section [X] but must not include them in the pricing schedule:
- Secondary market trading support
- Cross-chain interoperability
- Retail investor onboarding
```

**Anti-patterns to avoid:**
- Omitting scope boundaries entirely and relying on the requirements section to imply scope
- Using open-ended language such as "including but not limited to" without a bounded list
- Excluding items only in footnotes or appendices where vendors may miss them
- Conflating deferred items with excluded items, which signals unclear procurement planning

### 14. State dependencies, assumptions, and buyer-provided inputs explicitly

Institutional procurements often fail when the document assumes vendor delivery can proceed without clarifying what the institution itself must provide. Where implementation timing, integration scope, migration effort, or compliance readiness depends on buyer-side actions, state those dependencies explicitly.

Use requirement language that distinguishes:
- **Vendor obligations**: what the Respondent must deliver
- **Institution obligations**: access, SMEs, environments, approvals, data extracts, policy decisions
- **Joint dependencies**: items requiring coordinated planning or shared sign-off

**Example:**
```
IR-009: The Respondent shall provide an implementation plan that identifies all
required Institution inputs, including named SME participation, access to
integration environments, sample data availability, approval checkpoints, and
decision dependencies that could affect delivery timeline or acceptance.
Priority: Should
Response format: Narrative with implementation plan attachment
```

**Anti-patterns to avoid:** assuming immediate access to production-like environments, hiding buyer-side prerequisites in narrative prose, or presenting delivery timelines that ignore internal approval and data-readiness dependencies.

## Tone

- formal
- precise
- risk-aware
- compliance-conscious
- structured
- non-promotional
- authoritative without being aggressive
- demanding without being unreasonable

## Requirement Block Structure

Each requirement in a table should include:

| Field | Description |
|---|---|
| **Req ID** | Unique identifier (e.g., FR-012) |
| **Requirement** | The requirement statement using shall/should/may |
| **Priority** | Must / Should / Could / Won't |
| **Response Type** | How the bidder should respond |
| **Evaluation Notes** | Guidance for evaluators (optional, may be in separate evaluation guide) |

### Response Type Options
- **Comply/Non-comply** — binary compliance statement
- **Comply with narrative** — compliance statement plus explanation of approach
- **Narrative** — detailed description of capability and approach
- **Evidence** — documented proof (certifications, audit reports, reference letters)
- **Demonstration** — live or recorded demonstration during evaluation
- **Pricing** — line-item cost breakdown
- **Attachment** — separate document (architecture diagrams, project plans, etc.)

### 10. Match response type to the claim being evaluated

Do not ask for the same response style everywhere. The response type should match what the evaluator needs to verify.

- Use **Comply/Non-comply** for binary legal, policy, or certification gates.
- Use **Narrative** when the institution needs explanation of operating model, governance, or implementation approach.
- Use **Evidence** when a bidder is claiming prior delivery, certification, audit readiness, or production usage.
- Use **Demonstration** for workflow execution, usability, configuration control, or operational admin tasks that must be observed.
- Use **Pricing** only in dedicated commercial sections or appendices to preserve comparability.

**Example:** do not ask for a narrative response to “Does the bidder hold ISO 27001 certification?” Ask for compliance plus attached certificate. Conversely, do not ask for binary compliance to “Describe the proposed migration governance model.” That requires narrative detail and named responsibilities.

### 11. Request evidence in a comparable and proportionate way

When evidence is requested, specify what artifact is acceptable, how recent it must be, and whether redaction is permitted. Evidence requests should help evaluators compare bidders, not trigger oversized document dumps or confidential disclosures that cannot be reviewed consistently.

Prefer formulations such as: “The Respondent shall attach the most recent SOC 2 Type II report summary or equivalent assurance document, issued within the past 18 months. Confidential sections may be redacted provided the scope, opinion, control domains, and remediation status remain visible.”

Avoid vague asks such as “provide all security documentation” or “attach relevant evidence.” These create uneven submissions and weaken evaluation defensibility.
