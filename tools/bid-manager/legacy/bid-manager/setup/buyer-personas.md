# Buyer Personas for Enterprise Blockchain/DLT Platform Procurement

> Detailed profiles of the key stakeholders involved in evaluating and procuring SettleMint's DALP platform. Understand what each persona cares about, how they evaluate, and what wins them over.

---

## Table of Contents

1. [The Enterprise Buying Committee](#1-the-enterprise-buying-committee)
2. [Chief Technology Officer (CTO)](#2-chief-technology-officer-cto)
3. [Head of Digital Assets / Digital Innovation](#3-head-of-digital-assets--digital-innovation)
4. [Chief Compliance Officer (CCO)](#4-chief-compliance-officer-cco)
5. [Head of Operations / COO](#5-head-of-operations--coo)
6. [Procurement / Vendor Management](#6-procurement--vendor-management)
7. [Chief Information Security Officer (CISO)](#7-chief-information-security-officer-ciso)
8. [Treasury / Capital Markets Head](#8-treasury--capital-markets-head)
9. [Buying Committee Dynamics](#9-buying-committee-dynamics)
10. [Persona-Based Response Tailoring](#10-persona-based-response-tailoring)

---

## 1. The Enterprise Buying Committee

### How Enterprise Procurement Decisions Are Made

Enterprise blockchain/DLT platform purchases are never made by a single person. Research shows that the average enterprise technology purchase involves 6-10 decision-makers, with complex financial services purchases often involving 10-15+ stakeholders.

### The Decision-Making Structure

```
┌─────────────────────────────────────────┐
│         ECONOMIC BUYER                   │
│  (CFO / COO / Board-level sponsor)       │
│  Final budget approval                   │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───┴───────┐    ┌────────┴──────┐
│ TECHNICAL │    │ BUSINESS      │
│ EVALUATORS│    │ EVALUATORS    │
│ CTO       │    │ Digital Assets│
│ CISO      │    │ Treasury/CM   │
│ Architects│    │ Operations    │
└───────────┘    └───────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
       ┌──────┴──────┐    ┌────────┴────────┐
       │ GATEKEEPERS  │    │ INFLUENCERS     │
       │ Procurement  │    │ Compliance (CCO)│
       │ Legal        │    │ Risk Management │
       │ Vendor Mgmt  │    │ External Counsel│
       └──────────────┘    └─────────────────┘
```

### Influence Mapping

| Persona | Influence Type | Veto Power | When They Engage |
|---|---|---|---|
| CTO | Technical authority | Yes, can kill on technical grounds | RFI through contract |
| Digital Assets Head | Project champion / sponsor | Soft veto (can de-prioritize) | Pre-RFI through deployment |
| CCO | Compliance gate | Yes, hard veto on compliance/regulatory | RFI through contract |
| COO | Operational impact assessment | Soft veto | RFP through contract |
| Procurement | Process gate | Yes, procedural veto | RFP through contract |
| CISO | Security gate | Yes, hard veto on security | RFP through POC |
| Treasury/CM Head | Business case owner | Soft veto | Business case through deployment |

---

## 2. Chief Technology Officer (CTO)

### Profile

**Title variations:** CTO, VP Engineering, Head of Technology, Group CTO, Chief Digital Officer (sometimes)

**Demographics (enterprise financial services):**
- Typically 40-55 years old
- 15-25 years in financial services technology
- Background in core banking systems, enterprise architecture, or capital markets technology
- May or may not have blockchain-specific experience

**Role in procurement:** Technical authority. Evaluates architecture, scalability, integration complexity, and long-term technology fit. Often the de facto decision-maker for technology vendor selection, with the economic buyer (CFO/COO) typically following their recommendation.

### What the CTO Cares About

**Primary concerns (ranked by typical priority):**

1. **Architecture quality and future-proofing**
   - "Will this still be the right choice in 5 years?"
   - "How does this integrate with our existing technology landscape?"
   - "What happens when blockchain standards evolve?"

2. **Vendor lock-in risk**
   - "Can we switch vendors without rewriting everything?"
   - "Are we building on open standards or proprietary technology?"
   - "Who owns the smart contracts and configurations we build?"

3. **Team capability and developer experience**
   - "Can my existing team work with this, or do I need to hire blockchain specialists?"
   - "What's the learning curve for my developers?"
   - "Quality and completeness of documentation and APIs"

4. **Scalability and performance**
   - "Will this handle our projected transaction volumes?"
   - "What are the performance limits and how do we scale beyond them?"
   - "What's the demonstrated performance in production, not just benchmarks?"

5. **Total cost of ownership**
   - "What's the 5-year TCO including internal resources?"
   - "How does this compare to building in-house?"
   - "What are the hidden costs (infrastructure, training, integration)?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Technical architecture | Clean architecture, API-first, microservices, EVM compatibility | Architecture diagrams, API documentation, technology stack details |
| Integration capability | REST/GraphQL APIs, ISO 20022, SWIFT, core banking connectors | Integration case studies, API specs, middleware documentation |
| Developer experience | SDK quality, documentation, testing tools, CLI tooling | Sandbox access, developer docs, GitHub/code examples |
| Scalability | Horizontal scaling, performance benchmarks, throughput limits | Load test results, production metrics, capacity planning |
| Open standards | ERC-3643, EVM compatibility, ISO standards, no proprietary lock-in | Standards compliance mapping, code portability evidence |

### Pain Points

- Pressure to innovate while maintaining stability of existing systems
- Difficulty hiring and retaining blockchain developers (scarce talent pool)
- Previous bad experiences with blockchain POCs that never made it to production
- Board/C-suite expectations that "blockchain" delivers ROI quickly
- Vendor promises that turn out to be vaporware

### Objections to Expect

| Objection | Underlying Concern | Winning Response |
|---|---|---|
| "We could build this ourselves" | Control, IP ownership, team capability | TCO comparison (5-10x cost of custom build), time-to-market (12 weeks vs. 18 months), ongoing maintenance burden |
| "Blockchain technology is immature" | Technology risk, career risk | Production references, live deployment metrics, enterprise customer names |
| "How do I know you'll still be around in 5 years?" | Vendor viability, lock-in | Funding/revenue metrics, customer base, open standards (code portability), escrow options |
| "My team doesn't know blockchain" | Adoption risk, training cost | Developer tools, documentation quality, training program, Solidity is familiar to JS/TS developers |
| "We tried this before and it failed" | Past burnt fingers | Differentiate platform from previous POC approach. "POCs fail because they're built from scratch. Platforms succeed because they're pre-built and configurable." |

### What Winning Proposals Emphasize for CTOs

- Clean, well-documented architecture diagrams
- Live demo or sandbox access (let them kick the tires)
- Detailed API documentation and developer guides
- Production performance data (not theoretical benchmarks)
- Clear migration/exit path (no lock-in narrative)
- Specific integration architecture for their existing systems

### Communication Preferences

- Prefers technical depth over marketing slides
- Wants to see code, APIs, and architecture, not just promises
- Responds to data and evidence, not sales pressure
- Appreciates directness and honesty about limitations
- Engages deeply in technical evaluations and POC stages

---

## 3. Head of Digital Assets / Digital Innovation

### Profile

**Title variations:** Head of Digital Assets, VP Digital Innovation, Director of Blockchain/DLT, Head of Tokenization, Digital Transformation Lead, Head of New Ventures

**Demographics:**
- Typically 35-50 years old
- 10-20 years in financial services, often with a strategy or product background
- May have moved into this role from capital markets, asset management, or fintech
- Usually the most blockchain-literate person in the organization

**Role in procurement:** Project champion and internal sponsor. They identified the opportunity, built the business case, and are staking their career on making it work. They selected the use case (bond tokenization, fund distribution, etc.) and are accountable for delivering results.

### What the Digital Assets Head Cares About

**Primary concerns:**

1. **Speed to production**
   - "I need to show results before the board loses patience"
   - "How fast can we get a live transaction?"
   - "What's the realistic timeline from contract to first issuance?"

2. **Business case validation**
   - "Will this help me prove ROI to justify continued investment?"
   - "What metrics should I track to demonstrate success?"
   - "What did other clients achieve in quantifiable terms?"

3. **Use case coverage**
   - "Can the platform support our immediate use case AND our 2-3 year roadmap?"
   - "We want to start with bonds but expand to funds, real estate, deposits..."
   - "How easily can we add new asset classes?"

4. **Internal adoption and buy-in**
   - "Can I get the CTO, CISO, and compliance on board?"
   - "Will the technology team resist or embrace this?"
   - "How do I manage the change management internally?"

5. **Market positioning**
   - "Will this help us compete with [competitor bank] who already launched tokenized products?"
   - "How do we position ourselves as innovative without taking unnecessary risk?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Time-to-market | Implementation speed, pre-built modules, configuration vs. development | Reference timelines from comparable deployments |
| Multi-asset capability | Platform support for multiple asset classes without re-implementation | Capability mapping across asset classes |
| Vendor partnership | Responsive team, strategic alignment, thought leadership | Named team contacts, joint roadmap discussions |
| Market credibility | Named clients, conference presence, analyst recognition | Client logos, analyst reports, media coverage |
| Competitive advantage | Unique capabilities they can market to their clients | Specific differentiators and go-to-market support |

### Pain Points

- Internal political resistance ("we don't need blockchain")
- Budget competition with other digital transformation initiatives
- Pressure to demonstrate ROI within 12-18 months
- Difficulty translating technical capabilities into business outcomes
- Finding vendors who understand both technology AND financial services

### Objections to Expect

| Objection | Response |
|---|---|
| "We're not ready for production yet, just exploring" | "That's exactly when to engage with a platform. DALP offers a sandbox environment for exploration that transitions seamlessly to production. You don't have to rebuild when you're ready." |
| "Our use case is unique" | "Every financial institution believes their use case is unique. In practice, 80% of requirements are standard. DALP's 7 pre-built asset class modules cover the standard, while configuration handles the unique 20%." |
| "We need to see more case studies first" | Offer specific reference calls. "We can arrange a call with [similar institution] who deployed [similar use case]." |

### Communication Preferences

- Wants a strategic partner, not just a technology vendor
- Values quick response times and proactive communication
- Needs help building internal business cases (ROI models, benchmark data)
- Engages deeply from pre-RFI through deployment
- Appreciates co-creation approaches (joint roadmap, advisory board membership)

---

## 4. Chief Compliance Officer (CCO)

### Profile

**Title variations:** CCO, Head of Regulatory Affairs, Head of Compliance, Chief Regulatory Officer, Director of Compliance

**Demographics:**
- Typically 45-55 years old
- 20+ years in financial services compliance or regulatory roles
- Legal or accounting background common
- Often cautious by nature and role mandate, their job is to prevent problems

**Role in procurement:** Compliance gatekeeper. Has hard veto power. If the CCO is not satisfied that the platform meets regulatory requirements, the deal does not happen. Period.

### What the CCO Cares About

**Primary concerns:**

1. **Regulatory compliance certainty**
   - "Does this platform comply with [specific regulation]? Show me exactly how."
   - "How does compliance update when regulations change?"
   - "Can I demonstrate compliance to regulators using this platform?"

2. **Audit trail and evidence**
   - "If the regulator asks to see every transaction for the past 3 years, can I produce it?"
   - "Are audit logs immutable and court-admissible?"
   - "What regulatory reporting does the platform generate automatically?"

3. **KYC/KYB/AML integration**
   - "How does the platform ensure only verified investors participate?"
   - "How do sanctions screening and transaction monitoring work?"
   - "What happens when a flagged transaction occurs?"

4. **Data protection and privacy**
   - "Where is data stored? Does it cross borders?"
   - "GDPR compliance? Right to erasure on an immutable ledger?"
   - "What personal data is stored on-chain vs. off-chain?"

5. **Regulatory communication**
   - "Can I give regulators a supervisory dashboard?"
   - "How do we handle regulatory sandbox requirements?"
   - "What's the regulator's view of this technology?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Regulatory mapping | Framework-by-framework compliance proof | Compliance matrices for MiCAR, DORA, FATF, local regulations |
| Audit capability | Immutable logs, exportable evidence, regulatory dashboards | Audit log examples, regulatory report samples |
| Identity standards | KYC/KYB integration, accredited investor verification | ERC-3643 documentation, KYC provider partnerships |
| Data governance | On-chain/off-chain data model, data residency, GDPR | Data architecture documentation, DPIAs |
| Change management | How platform adapts when regulations change | Regulatory update process, release cadence |

### Pain Points

- New technology creates new regulatory risks they don't fully understand yet
- Regulators themselves are still developing frameworks for tokenized assets
- Fear of personal liability if compliance failures occur on their watch
- Lack of industry precedent for many blockchain use cases
- Pressure from innovation teams to "move faster" than compliance comfort allows

### Objections to Expect

| Objection | Response |
|---|---|
| "The regulatory framework isn't settled yet" | "DALP is designed for regulatory adaptability. Compliance rules are configured, not coded. When MiCAR requirements evolve, compliance controls update through configuration, no code changes, no re-deployment." |
| "Blockchain is inherently incompatible with GDPR" | "DALP's architecture separates personal data (stored off-chain with standard data protection controls) from transaction data (on-chain, pseudonymized). The ERC-3643 identity standard enables compliance without storing PII on-chain." |
| "How can I trust immutable records?" | "That's actually the advantage, immutable records provide court-admissible evidence with cryptographic proof of integrity. Unlike traditional databases, audit logs cannot be retroactively modified." |
| "Our regulators haven't approved this" | "We've worked with regulators across jurisdictions, including through regulatory sandboxes. We can provide documentation and frameworks for your regulatory engagement, and offer to participate in regulator briefings." |

### What Winning Proposals Emphasize for CCOs

- Specific regulation-by-regulation compliance matrices (not vague "we're compliant" statements)
- Sample regulatory reports and audit exports
- Data architecture diagrams showing on-chain vs. off-chain data flows
- Compliance configuration examples (how rules are set, how they adapt)
- Regulatory engagement track record (which regulators have reviewed the platform)
- Named compliance-focused references

### Communication Preferences

- Extremely detail-oriented, generalizations are red flags
- Prefers written documentation over verbal assurances
- Wants to review specific regulatory frameworks, not broad compliance claims
- Engages legal counsel for verification of compliance claims
- Conservative communication style, no hype, no buzzwords, just facts

---

## 5. Head of Operations / COO

### Profile

**Title variations:** COO, Head of Operations, VP Operations, Chief Operating Officer, Head of Securities Operations, Head of Post-Trade

**Demographics:**
- Typically 45-55 years old
- 20+ years in operations, often in securities processing, settlement, or custody
- Deep knowledge of current operational workflows and their inefficiencies
- Pragmatic, process-oriented mindset

**Role in procurement:** Operational impact assessor. Evaluates how the new platform will affect existing operations, what changes are required, and what risks exist during transition.

### What the COO Cares About

**Primary concerns:**

1. **Operational disruption risk**
   - "How does this integrate without disrupting existing processes?"
   - "What's the migration path from current systems?"
   - "What happens to operational workflows during the transition?"

2. **Process efficiency gains**
   - "What operational costs will this reduce?"
   - "Which manual processes does this automate?"
   - "What's the FTE impact (positive or negative)?"

3. **Integration with existing infrastructure**
   - "How does this connect to our core banking system, SWIFT, custody, CSD?"
   - "Do we need to change our operating model?"
   - "What interfaces and message formats are supported?"

4. **Reliability and resilience**
   - "What's the uptime SLA?"
   - "What happens when the system goes down?"
   - "Disaster recovery, business continuity, failover?"

5. **Staff readiness**
   - "How much retraining does my team need?"
   - "Can existing staff operate this, or do we need new hires?"
   - "What does the day-to-day operational model look like?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Integration architecture | Connectivity with existing systems | Integration diagrams, API specs, middleware documentation |
| Operational efficiency | Automation of manual processes, STP rates | Before/after process comparisons, FTE impact models |
| Reliability/SLA | Uptime, performance, failover | SLA commitments, incident history, RTO/RPO |
| Change management | Migration approach, parallel running, rollback plan | Implementation methodology, risk mitigation plans |
| Operational model | Day-to-day usage, monitoring, exception handling | Operational runbook samples, dashboard screenshots |

### Pain Points

- Any new technology that adds complexity to already complex operations
- Integration with legacy systems that are difficult and expensive to modify
- Staff resistance to new tools and processes
- Regulatory requirement to maintain service continuity during transitions
- Operational risk from deploying immature technology into production workflows

### Objections to Expect

| Objection | Response |
|---|---|
| "This will disrupt our operations" | "DALP is designed for parallel deployment, it runs alongside existing systems during transition. Operations migrate one asset class at a time, with full rollback capability." |
| "We can't retrain the whole team" | "DALP's operational interface is designed for financial services professionals, not blockchain specialists. Training typically takes 2-3 days. The platform abstracts blockchain complexity behind familiar operational workflows." |
| "Our legacy systems can't integrate easily" | "DALP includes pre-built connectors for ISO 20022, SWIFT MT/MX, and standard API interfaces. We've integrated with core banking systems from SAP, Temenos, Finastra, and Oracle." |

### Communication Preferences

- Process-oriented, wants to see workflows, not just features
- Risk-averse, needs confidence in rollback and resilience
- Responds well to operational metrics and efficiency data
- Prefers structured implementation plans with clear milestones
- Engages most actively during POC and implementation planning phases

---

## 6. Procurement / Vendor Management

### Profile

**Title variations:** Head of Procurement, Vendor Manager, Strategic Sourcing Manager, Third-Party Risk Manager, Supplier Management

**Demographics:**
- Typically 35-50 years old
- Background in procurement, supply chain, or vendor management
- Financial services procurement experience (understands regulated vendor requirements)
- Process-driven, compliance-focused

**Role in procurement:** Process gatekeeper. Ensures the procurement follows institutional policies, manages the commercial negotiation, and assesses vendor risk. Has procedural veto power, if you don't comply with their process, you're disqualified regardless of technical merit.

### What Procurement Cares About

**Primary concerns:**

1. **Commercial terms and pricing**
   - "Is the pricing competitive and predictable?"
   - "What are the total costs including hidden fees?"
   - "Are the commercial terms negotiable?"

2. **Vendor risk management**
   - "What happens if this vendor goes bankrupt?"
   - "What's the financial stability of this vendor?"
   - "Are there concentration risk concerns?"
   - "What's the exit strategy?"

3. **Contract terms and SLAs**
   - "Are the SLAs measurable and enforceable?"
   - "What are the penalty clauses for non-performance?"
   - "What's the contract term and renewal process?"

4. **Compliance with procurement policies**
   - "Does this vendor meet our third-party risk management requirements?"
   - "Can they provide all required certifications and documentation?"
   - "Do they meet our ESG and diversity requirements?"

5. **Contractual protections**
   - "IP ownership, who owns what we build on the platform?"
   - "Source code escrow?"
   - "Data portability and exit assistance?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Pricing structure | Clarity, predictability, competitiveness | Detailed pricing breakdown, TCO model |
| Vendor stability | Financial health, customer base, funding | Financial statements, auditor letters, investor backing |
| Contract terms | Fair terms, balanced risk allocation | Draft contract, SLA framework, penalty structures |
| Third-party risk | Certifications, insurance, BCP/DR | SOC 2 report, insurance certificates, BCP documentation |
| Exit provisions | Data portability, migration assistance, code access | Exit clause detail, escrow arrangements, data export capabilities |

### Pain Points

- Blockchain vendors often don't have the financial track record of established enterprise software vendors
- Novel technology makes it difficult to benchmark pricing
- Limited precedent for blockchain platform contracts (legal complexity)
- Pressure to reduce vendor costs while business demands premium solutions
- Third-party risk frameworks may not have specific categories for blockchain/DLT platforms

### Objections to Expect

| Objection | Response |
|---|---|
| "You're too small / not established enough" | "SettleMint has operated since 2016, serving Tier 1 banks and central banks across 6 continents. We can provide financial statements, investor backing details, and client references for due diligence." |
| "Your pricing is higher than competitors" | "We recommend comparing on 3-year TCO, not license cost. Custom development alternatives cost 5-10x more. We're happy to build a detailed TCO comparison with your team." |
| "We need source code escrow" | "We support source code escrow arrangements and can work with your preferred escrow provider." |
| "What if you get acquired?" | "Our contracts include assignment protections and continuity commitments. We also support code escrow for business continuity." |

### Communication Preferences

- Formal, process-driven communication
- Expects timely, complete responses to all commercial queries
- Values transparency in pricing and terms
- Engages through formal procurement channels (not side conversations)
- Responds well to clear, structured documentation

---

## 7. Chief Information Security Officer (CISO)

### Profile

**Title variations:** CISO, Head of IT Security, VP Information Security, Chief Security Officer, Head of Cybersecurity

**Demographics:**
- Typically 40-55 years old
- 15-25 years in IT security, often with a background in network security, application security, or security governance
- Certifications: CISSP, CISM, or similar
- Deep skepticism of new technology, their job is to find what can go wrong

**Role in procurement:** Security gatekeeper. Has hard veto power. The CISO evaluates the security posture of the platform and the vendor's security practices. If the CISO finds unacceptable security risks, the deal does not proceed.

### What the CISO Cares About

**Primary concerns:**

1. **Platform security posture**
   - "Has this been penetration tested? By whom? How recently?"
   - "What are the known vulnerabilities and how are they managed?"
   - "What's the security development lifecycle for the platform?"

2. **Smart contract security**
   - "How are smart contracts audited?"
   - "What happens if a vulnerability is found in a deployed contract?"
   - "Upgradability vs. immutability trade-offs?"

3. **Key management and cryptography**
   - "How are private keys generated, stored, and managed?"
   - "HSM integration? Which HSMs are supported?"
   - "Key ceremony procedures? Multi-signature requirements?"

4. **Data protection**
   - "What data is encrypted at rest and in transit?"
   - "Encryption standards used?"
   - "Who has access to what data?"

5. **Vendor security practices**
   - "What certifications do you hold (SOC 2, ISO 27001)?"
   - "Background checks on employees with access to client data?"
   - "Incident response procedures?"

6. **Network security (blockchain-specific)**
   - "How are validator/node compromises detected and handled?"
   - "What's the attack surface of the network?"
   - "51% attack protection for permissioned networks?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Security certifications | SOC 2 Type II, ISO 27001, CSA STAR | Current certification reports |
| Penetration testing | Frequency, scope, remediation process | Recent pen test executive summary |
| Smart contract security | Audit process, formal verification, upgradeability | Audit reports, security methodology documentation |
| Key management | HSM support, key lifecycle, ceremony procedures | Key management architecture document |
| Incident response | Detection, response, communication procedures | IR plan, SLA for security incident notification |
| Access controls | RBAC, MFA, privileged access management | Access control architecture, audit log examples |

### Pain Points

- Blockchain technology introduces new attack vectors they may not fully understand
- Smart contract vulnerabilities are a novel security domain
- Key management is critical, loss or compromise of keys can mean loss of assets
- Regulatory expectations for security in DLT environments are still evolving
- Limited security benchmarks/frameworks specifically for enterprise blockchain platforms

### Objections to Expect

| Objection | Response |
|---|---|
| "Blockchain is inherently insecure" | "Permissioned blockchain networks used in enterprise deployments have a fundamentally different security profile from public chains. DALP's network architecture provides known validators, permissioned access, and layered security controls designed for regulated environments." |
| "Smart contracts are unauditable" | "DALP's smart contracts undergo third-party security audits by recognized firms. Contracts use proven patterns (OpenZeppelin-based) with formal verification support. All contracts are upgradeable via proxy patterns with multi-sig governance." |
| "Key management is too risky" | "DALP supports HSM-based key management (Thales Luna, AWS CloudHSM) with configurable key ceremony procedures, multi-signature requirements, and automated key rotation." |
| "We need to pen test it ourselves" | "Absolutely, we encourage and support client-conducted penetration testing of DALP deployments. We provide a dedicated testing environment and support your team throughout the process." |

### Communication Preferences

- Highly technical, expects detailed security documentation
- Skeptical by default, prove it, don't promise it
- Wants to see reports, not hear claims (SOC 2 report > "we're SOC 2 certified")
- Engages deeply during security assessment and POC phases
- Appreciates transparency about known limitations and compensating controls

---

## 8. Treasury / Capital Markets Head

### Profile

**Title variations:** Head of Treasury, Head of Capital Markets, VP Fixed Income, Head of Securities Services, MD Digital Markets

**Demographics:**
- Typically 40-55 years old
- 15-25 years in capital markets, treasury, or securities services
- Deep understanding of financial instruments, market microstructure, and trading operations
- Business-outcome focused, technology is a means, not an end

**Role in procurement:** Business case owner. This person identified the business opportunity (new revenue, cost reduction, competitive positioning) and needs the technology to deliver it. They care about what the platform enables for their business, not how it works technically.

### What the Treasury/CM Head Cares About

**Primary concerns:**

1. **Business outcomes and ROI**
   - "What new products can I launch?"
   - "What revenue opportunity does this create?"
   - "What costs will this reduce (settlement, custody, operations)?"

2. **Market competitiveness**
   - "What are my competitors doing with tokenized assets?"
   - "If I don't move now, what do I lose?"
   - "Can I be first-to-market in my segment?"

3. **Client impact**
   - "What does this mean for my institutional/retail clients?"
   - "How do I explain tokenized products to clients?"
   - "What client onboarding is required?"

4. **Product capabilities**
   - "Which asset classes can I tokenize?"
   - "What's the settlement model (T+0, atomic DvP)?"
   - "How does secondary market liquidity work?"

5. **Regulatory positioning**
   - "Is this ahead of or behind the regulatory curve?"
   - "How do I position this with regulators as innovation, not risk?"
   - "What are peer institutions doing?"

### Key Decision Criteria

| Criterion | What They Evaluate | Evidence They Want |
|---|---|---|
| Revenue opportunity | New products, market access, client reach | ROI models, revenue projections from comparable deployments |
| Asset class breadth | Number and depth of supported asset classes | Asset class capability mapping, product roadmap |
| Settlement capabilities | T+0, DvP, atomic settlement, programmable settlement | Settlement architecture, production performance data |
| Market connectivity | Exchange connectivity, liquidity venues, distribution | Integration partnerships, market access documentation |
| Competitive intelligence | What peers have achieved | Anonymized case studies, market analysis |

### Pain Points

- Pressure to demonstrate innovation while managing business-as-usual
- Revenue targets that require new product lines
- Difficulty quantifying ROI for blockchain/DLT investments
- Competitor anxiety, "what if they tokenize first?"
- Balancing innovation speed with risk management

### Objections to Expect

| Objection | Response |
|---|---|
| "There's no market demand for tokenized assets yet" | "The tokenized assets market grew from $2B to $16B+ in 2024-2025 (WEF data). Early movers like OCBC, JPMorgan, and Citi are establishing infrastructure now for the wave of institutional adoption. The question isn't whether the market will develop, but whether you'll be ready when it does." |
| "Our clients aren't asking for this" | "Clients rarely ask for infrastructure, they ask for better products. Faster settlement, lower minimums, 24/7 trading, automated compliance. Tokenization enables all of these." |
| "The ROI is uncertain" | "We can build a detailed ROI model based on your specific asset class, volume projections, and operational costs. From comparable deployments: 60-80% settlement time reduction, 40-60% operational cost reduction, and new revenue from expanded investor access." |

### Communication Preferences

- Business-outcome focused, lead with revenue and cost impact, not technology
- Comfortable with financial modeling and quantitative analysis
- Wants competitive intelligence and market context
- Engages most actively in business case development and strategic discussions
- Less interested in technical deep-dives, more in "what can I do with this?"

---

## 9. Buying Committee Dynamics

### Decision-Making Patterns

#### The Champion Model (Most Common)

One stakeholder (usually the Digital Assets Head) champions the initiative. They need to bring the rest of the committee along. Your job is to arm the champion with materials for each audience:

| Audience | Material to Provide the Champion |
|---|---|
| CTO | Technical architecture deep-dive, sandbox access, API docs |
| CCO | Regulatory compliance matrix, sample audit reports |
| CISO | Security assessment package, pen test summaries, SOC 2 |
| COO | Operational impact analysis, integration architecture |
| Procurement | Financial statements, reference list, draft commercial terms |
| Treasury Head | ROI model, competitive analysis, case studies |
| Board/ExCo | 2-page executive brief, headline metrics from comparable deployments |

#### The Committee Model (Common in Large Banks)

No single champion. A committee evaluates collectively. Each member scores their domain independently, and scores are aggregated.

**Strategy:** Ensure your response addresses every persona's concerns. A technically excellent proposal that ignores compliance will score high in one domain and zero in another, losing on aggregate.

#### The CISO/CCO Veto Pattern

In financial services, it's common for the CTO and business stakeholders to be enthusiastic, but the CISO or CCO exercises their veto. This kills more blockchain deals than any other factor.

**Strategy:** Proactively address security and compliance from the first touchpoint. Don't wait for the CISO/CCO to raise concerns, provide comprehensive security and compliance documentation in the initial response.

### Influence Timing

| Phase | Most Influential Personas |
|---|---|
| Pre-RFI / Business case | Treasury/CM Head, Digital Assets Head |
| RFI evaluation | Digital Assets Head, CTO |
| RFP evaluation | CTO, CCO, CISO, Procurement |
| Shortlist / Presentation | CTO, Digital Assets Head, COO |
| POC / Pilot | CTO, CISO, Operations team |
| Negotiation | Procurement, Legal, CFO |
| Contract award | Economic buyer (CFO/COO/Board), all vetoes cleared |

---

## 10. Persona-Based Response Tailoring

### Section Mapping

When writing RFP/RFI responses, know which persona will read which section:

| Response Section | Primary Reader(s) | Secondary Reader(s) |
|---|---|---|
| Executive Summary | All (especially economic buyer) | Board, executive committee |
| Technical Architecture | CTO | CISO, Digital Assets Head |
| Security | CISO | CTO, CCO |
| Compliance & Regulatory | CCO | Legal, Digital Assets Head |
| Implementation Plan | COO | CTO, Digital Assets Head |
| Integration | CTO, COO | CISO |
| Commercial Proposal | Procurement | CFO, COO |
| Case Studies | Digital Assets Head | CTO, Treasury Head |
| Team & Support | Procurement, COO | CTO |

### Tone and Language Adjustments

| Persona | Tone | Language | Emphasis |
|---|---|---|---|
| CTO | Technical, direct | Architecture terms, standards | How it works |
| Digital Assets Head | Strategic, collaborative | Business outcomes, market terms | What it enables |
| CCO | Formal, precise | Regulatory frameworks, legal terms | How it complies |
| COO | Practical, process-oriented | Operations terms, workflows | How it integrates |
| Procurement | Formal, complete | Commercial terms, risk language | What it costs and what protections exist |
| CISO | Technical, evidence-based | Security standards, attack vectors | How it's secured |
| Treasury Head | Business-focused, quantitative | Financial terms, ROI metrics | What revenue/savings it generates |

---

## Cross-References

- **→ [Customer Profiles](./customer-profiles.md)**: Persona priorities vary by customer segment
- **→ [RFP Response Best Practices](./rfp-response-best-practices.md)**: How to structure responses for different evaluators
- **→ [Proposal Stages Guide](./proposal-stages-guide.md)**: Which personas engage at each stage
- **→ [Competitive Positioning in Bids](./competitive-positioning-in-bids.md)**: How different personas respond to competitive positioning

---

*Last updated: March 2026*
*Owner: SettleMint Bid Team*
