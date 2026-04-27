# Integration Requirements Patterns — Buyer-Side

> Reusable buyer-side requirement blocks for digital asset platform RFPs.
> Use these to draft scorable integration and interface requirements.
> Cross-reference: `content/security/security-requirements-patterns.md` for API authentication/access controls.

---

## Pattern 1: Core Banking and Ledger Integration

**Purpose:** Assess how the platform connects to the institution's existing core banking system or general ledger to ensure consistent financial record-keeping.

**Requirement paragraph:**
> The platform must provide documented integration patterns for connecting to core banking systems (e.g., Temenos, Finastra, Oracle FLEXCUBE, FIS) and general ledger systems. At minimum, this must include: bidirectional transaction reconciliation with configurable field mapping; event-driven notification of asset state changes (issuance, transfer, maturity, redemption) via message queue or webhook; and a documented recovery procedure for reconciliation breaks. Vendors must specify whether integration is achieved via a pre-built connector, custom API, or middleware layer, and provide reference evidence from a production deployment.

**Scoring guidance:**
- **Strong:** Pre-built connectors for 2+ named core banking systems; live production reference; automated reconciliation with break alerting
- **Adequate:** Generic REST/event API with documented integration guide; one integration reference; manual reconciliation option
- **Weak:** Custom development required for each integration; no production references; no documented reconciliation approach

**Evidence to request:** Integration architecture diagram; reconciliation process documentation; reference from a live deployment with a named core banking system.

---

## Pattern 2: Custody System Integration

**Purpose:** Assess whether the platform can connect to third-party custody solutions for key storage and signing without requiring the custodian to replace its own systems.

**Requirement paragraph:**
> The platform must support integration with external custodians and Hardware Security Module (HSM) providers via standard interfaces. Required integration modes include: (a) remote signing — transaction signing request/response via custodian API without private key exposure outside the HSM boundary; (b) custody-agnostic key management — ability to use at least two named custodians (e.g., Fireblocks, Metaco/Ripple Custody, Copper, BitGo) without platform lock-in; and (c) multi-custodian support — ability to route different asset classes or portfolios to different custodians from a single platform deployment. Vendors must document API authentication, signing workflow, and fallback procedure for custodian unavailability.

**Scoring guidance:**
- **Strong:** Certified integrations with 3+ named custodians; custody-agnostic architecture confirmed; fallback/DR documented
- **Adequate:** Integration with 1-2 custodians; architecture supports additional custodians with documented API; basic fallback described
- **Weak:** Single custodian only; custodian change requires platform reconfiguration; no fallback documented

**Evidence to request:** Custody integration technical brief; list of certified custodian partners; signing workflow diagram; DR procedure for custodian outage.

---

## Pattern 3: Payment Rail and Settlement Integration

**Purpose:** Assess how the platform connects to traditional payment infrastructure (SWIFT, SEPA, TARGET2, Fedwire) and emerging digital settlement networks.

**Requirement paragraph:**
> The platform must support integration with institutional payment and settlement infrastructure. For fiat legs of tokenized asset transactions, the platform must either provide a native payment gateway connection or expose a standardised API for connection to SWIFT (ISO 20022 messaging), SEPA/TARGET2, and/or domestic RTGS networks relevant to the institution's operating jurisdictions. For digital settlement, the platform must document its approach to atomic delivery-versus-payment (DvP) or payment-versus-payment (PvP) settlement, including support for central bank digital currency (CBDC) settlement rails where operationally available. Vendors must specify settlement finality guarantees and failure handling for each supported payment rail.

**Scoring guidance:**
- **Strong:** Native ISO 20022 support; DvP architecture documented; CBDC integration roadmap with deployed pilots; settlement finality defined per rail
- **Adequate:** API for payment rail integration; DvP described architecturally; fiat settlement achievable with documented connector; finality defined
- **Weak:** Manual payment instruction export only; no DvP capability; finality undefined or network-dependent without institutional controls

**Evidence to request:** Payment integration architecture document; DvP settlement design; ISO 20022 message mapping table; reference from a production settlement deployment.

---

## Pattern 4: Regulatory Reporting and Compliance System Integration

**Purpose:** Assess whether the platform can feed required transaction and position data to regulatory reporting systems automatically.

**Requirement paragraph:**
> The platform must provide structured data export or real-time integration capabilities for regulatory reporting obligations. This includes: (a) configurable transaction reporting feeds compatible with TR/trade repository reporting (EMIR, DTCC, SFTR as applicable); (b) position and asset register exports in machine-readable formats (JSON, ISO 20022, CSV) for reconciliation with compliance systems; (c) event webhooks or message queue feeds for AML/KYC screening systems, enabling pre-issuance participant checks and ongoing monitoring triggers; and (d) audit log export for SIEM/SOC integration. Vendors must specify data latency (real-time vs. batch), retention at source, and permissioned access controls for compliance teams.

**Scoring guidance:**
- **Strong:** Real-time webhooks for AML screening; named TR compatibility confirmed; SIEM integration deployed in a regulated production environment
- **Adequate:** Batch export with configurable schedule; AML integration via API; compliance data access with RBAC controls
- **Weak:** Manual data export only; no AML integration pattern; SIEM integration not addressed

**Evidence to request:** Regulatory reporting integration guide; AML/KYC system integration architecture; sample audit log export format; reference from a regulated institution in production.
