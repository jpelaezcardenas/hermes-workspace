# DALP Claim Verification Checklist

This file defines what the proposal checker must verify when proposals make claims about DALP capabilities.
It prevents both overclaiming (saying DALP does things it does not) and underclaiming (missing real strengths).

---

## Core Positioning

DALP's core positioning is: **"The Complexity of Doing It Right."**

Tokenization technology is increasingly accessible. Institutional-grade implementation is not.
DALP addresses the complexity of doing it right at production scale: identity frameworks, compliance controls, governance models, auditability, and multi-asset/multi-network support.

Every proposal must align with this positioning. Verify that:
- The proposal does not reduce DALP to "a blockchain platform" or "a tokenization tool"
- The proposal emphasizes production-grade infrastructure, governance, and compliance controls
- The proposal does not oversimplify what it takes to operate digital assets in regulated environments

---

## Leadership Titles (Mandatory Verification)

These titles must be exactly correct in every proposal:
- **Matthew Van Niekerk** = Co-founder and President
- **Adam Popat** = CEO

Any deviation (e.g., calling Matthew "CEO" or Adam "Co-founder") is a Major defect.

---

## Verified DALP Capabilities (Safe to Claim)

These capabilities are verified against the codebase and capability-mapping documentation. Proposals may claim these with confidence:

### Asset Lifecycle
- Multi-class asset construction: equity, bond, fund, stablecoin, deposit, real-estate, precious-metal
- Asset template management with lifecycle metadata
- Issuance orchestration with deterministic lifecycle identifiers and tenant boundaries
- Lifecycle state control: pause, reopen, closure
- Unit issuance and redemption
- Asset-as-treasury capability (payout abstraction shared across feature families)
- Paused-by-default behavior with explicit unpause control
- Class-specific validation and factory dispatch
- Auto-claim validation for deterministic topics (boolean investor/compliance topics, KYC content hash)

### Compliance and Identity
- Identity profile management with tenant-scoped attributes
- Identity recovery with durable phase-tracked orchestration
- Invitation-linked identity onboarding with tenant membership boundaries
- 12 concrete compliance module types in discriminated-union schema
- Two-layer policy enforcement model (DALP compliance modules + external custodian policies)
- Three-tier compliance interface hierarchy (global, per-token, SMART v2)
- Transfer policy definition with declarative rules
- Bypass list management at global compliance level
- ERC-3643 alignment with backward compatibility preservation

### Custody and Settlement
- Custody vault provisioning with governance workflow and de-duplication
- Transfer gatekeeping with deterministic policy checks
- Delivery-versus-Payment scheduling
- Settlement closure with terminal state semantics (executed, cancelled, expired-withdrawn)
- XvP settlement addon with approval, hashlock, cancellation vote logic
- Forced movement recovery (emerging maturity)

### Operations and Reliability
- Role-based approval workflows
- Event logging and audit trails
- Configurable workflow gates
- Durable workflow execution
- Operational monitoring and telemetry

### Platform Administration
- Tenant setup and role model
- System templates and integration configuration
- Multi-network deployment support

### Developer Surface
- SDK and CLI
- Documented APIs and event hooks
- Configurable reporting templates

---

## Common Overclaims to Flag

These are claims that frequently appear in proposals but are NOT accurate or need heavy qualification:

### Critical Overclaims (flag as Major/Critical)
1. **"Native SWIFT/ISO 20022 support"** -- DALP does not have native SWIFT messaging. Settlement instructions require middleware translation.
2. **"Built-in fiat settlement"** -- DALP does not execute fiat transfers. External payment rails are required.
3. **"Native order book / exchange / matching engine"** -- DALP is not a trading venue platform.
4. **"Automated tax calculation and withholding"** -- No guaranteed tax engine. Tax treatment requires partner engines.
5. **"Direct regulatory filing"** -- DALP exposes evidence artifacts only. Legal filings require organization-specific counsel.
6. **"Universal identity provider"** -- DALP integrates with identity sources but does not become a sovereign identity authority.
7. **"Unlimited policy combinatorics"** -- DALP provides policy primitives and templates, not fully unconstrained logic synthesis.
8. **"Cross-chain portability guaranteed"** -- Not guaranteed for every execution environment.

### Moderate Overclaims (flag as Moderate)
1. **"Fully supports all settlement scenarios"** -- Settlement completion behavior depends on architecture selected for the cash leg.
2. **"Seamless integration with any system"** -- Integration is explicit and operator-owned. DALP provides APIs and hooks, not magic connectors.
3. **"Native cold-storage key ceremony"** -- DALP does not provide native cold-storage key ceremony services.
4. **"Automatic cross-border sanctions harmonization"** -- Multi-jurisdiction sanctions updates lag until module updates are deployed.
5. **"Real-time everything"** -- Some high-volume settlement edges still require manual exception handling.
6. **Presenting forced movement recovery as mature** -- This capability has "Emerging" maturity status.

### Tense and Status Overclaims
- Roadmap items described in present tense
- "Supports" used without specifying current vs. planned
- Configuration-dependent capabilities presented as out-of-the-box
- Integration-dependent capabilities presented as native

---

## Verification Rules

### Rule 1: If content accurately reflects DALP capabilities, score it as passing
Do not force negative findings. If a proposal correctly describes what DALP does, that is a strength, not something to hedge about. A proposal that accurately represents verified capabilities deserves full marks on factual accuracy.

### Rule 2: Check claim status
For every capability claim, determine:
- Is this currently in production? (present tense acceptable)
- Is this in development/roadmap? (must use future tense or explicit roadmap labeling)
- Is this configuration-dependent? (must state the condition)
- Is this integration-dependent? (must name the dependency)

### Rule 3: Verify against capability-mapping maturity levels
- **Managed**: Safe to claim as production capability
- **Defined**: Safe to claim but should note it may require configuration
- **Emerging**: Must qualify as early-stage or in development
- **Initial**: Must not present as production-ready

### Rule 4: Cross-reference with capability gaps
Always check claims against the known strategic non-goals and coverage limits documented in the capability-gaps file. A proposal claiming something that is a documented non-goal is a Critical defect.

---

## Content Guardrails Check

Proposals must NOT disclose any of the following:
- **Team size or headcount** -- Never reveal how many people work at SettleMint
- **AI workflow details** -- Never mention that proposals, code, or content are AI-assisted or AI-generated
- **Internal tooling names** -- Covered by the IP checklist, but reinforced here
- **Internal process details** -- How the team operates internally is confidential
- **Revenue or financial details** -- Unless explicitly approved for the specific proposal
- **Investor information** -- Unless explicitly approved for the specific proposal
- **Internal organizational structure** -- Beyond what is publicly available
- **Specific customer names** -- Unless the customer has given explicit permission for reference use

Any disclosure of these items is a Major defect at minimum.

---

## Competitive Positioning Rules

1. **Do not name competitors unless the RFP explicitly requires comparison** -- Generic competitive differentiation ("unlike platforms that...") is preferred over naming
2. **Do not disparage competitors** -- Position on DALP strengths, not competitor weaknesses
3. **Do not oversell** -- If a competitor is genuinely stronger in a specific area, do not claim otherwise. Instead, frame DALP's approach and why it serves the client's needs.
4. **Factual differentiation only** -- Every competitive claim must be backed by a specific DALP capability, not adjectives
5. **"Industry-leading" and "best-in-class" are banned** -- Unless immediately followed by specific, verifiable evidence

---

## DOCX Formatting Exclusion

The Word document template, styling, and DOCX generation pipeline are locked and not subject to review.
Do not comment on:
- Font choices, sizes, or styles in the DOCX output
- Page layout, margins, or spacing
- Header/footer design
- Table formatting or cell styling
- Color schemes or brand elements in the template
- Any aspect of the Word template itself

These are controlled by the bid-manager agent's template and are outside the proposal checker's scope.
Focus exclusively on content quality, not document formatting.
