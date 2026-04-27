# Section 5: Verification, Claims, and Data Feeds

## Executive Summary

Regulated digital asset operations only work when identity, compliance, and reference data are governed as one control system. If investor credentials cannot be trusted, if eligibility rules are enforced inconsistently, or if valuation data cannot be audited, the institution inherits operational and regulatory risk that cannot be repaired after execution.

DALP addresses this by combining three capabilities into one verifiable control layer. OnchainID provides reusable on-chain identities anchored by signed claims. The compliance layer evaluates those claims before transfers execute, using configurable module logic rather than contract rewrites. The feed layer supplies signed pricing, NAV, and related reference data so valuation-sensitive controls and servicing workflows operate from an auditable source of truth.

For compliance teams, this means eligibility is enforced before execution rather than reviewed after the fact. For operations teams, it means one control surface for identity status, rule administration, and feed health. For auditors, it means a traceable record of who was verified, which rule was applied, and which reference data informed the decision.

## Identity Verification with OnchainID

DALP uses OnchainID as its native identity layer for regulated asset operations. Each participant, whether an individual, institution, or platform-managed account, is associated with an on-chain identity contract that stores verifiable claims issued by trusted authorities. These claims can represent KYC completion, AML clearance, investor classification, jurisdictional eligibility, or other programme-specific attestations.

This model gives institutions a durable identity foundation that is reusable across assets. An investor who has already been verified does not need to restart the process for every new instrument, provided the relevant claims remain valid. Because claims are signed, attributed to a trusted issuer, and revocable or expirable, compliance teams retain ongoing control rather than treating onboarding as a one-time event.

The operational value is straightforward. Identity becomes a reusable compliance asset instead of a fragmented onboarding record. That reduces repetitive checks, improves consistency across programmes, and makes status changes, such as expired KYC or changed eligibility, immediately actionable.

## Claims as the Unit of Trust

Claims are the atomic proof objects that the platform uses to make eligibility decisions. Each claim contains a topic, the issuer identity, signed data, and optional expiry. Standard topics cover common regulatory needs such as KYC, AML, accreditation, jurisdiction, and contract identity. Institutions can also define custom topics for local or product-specific requirements.

This gives DALP a clean separation between verification and enforcement. External identity or compliance providers perform the underlying checks. DALP records the resulting attestation in a verifiable format and enforces its use consistently before each transfer. The platform is therefore not positioned as the verifier of record for KYC or AML screening; it is the enforcement and audit layer that consumes those attestations.

That boundary matters in practice. Institutions can change or add verification providers without redesigning the asset logic, while still keeping all downstream transfer controls tied to a common trust model.

## Trusted Issuer Governance

Trust in claims depends on trust in the issuers that create them. DALP manages this through a layered trusted-issuer model that supports platform-wide, tenant-level, and subject-specific authorization. This allows an institution to trust some issuers across the whole environment while restricting others to a specific asset, investor group, or operational context.

The result is tighter governance without administrative sprawl. A group-level KYC provider can be recognized broadly, while a specialist local verifier can be limited to the programme where it is relevant. If an issuer is removed from the trust set, dependent claims stop supporting compliant transfers. This creates a direct and auditable relationship between governance decisions and transfer outcomes.

## Compliance Enforcement

Identity claims become operationally meaningful when the compliance layer evaluates them before execution. DALP supports configurable compliance modules that can be combined to enforce investor eligibility, jurisdiction restrictions, amount controls, supply constraints, time-based rules, and collateral conditions. These modules compose into a fail-closed decision model: a transfer proceeds only when all configured checks pass.

This is one of DALP's strongest institutional characteristics. Compliance officers can adapt the rule set through configuration rather than rewriting smart contract logic. That reduces change risk, shortens policy update cycles, and keeps the enforcement layer aligned with evolving regulatory requirements.

The platform also supports pre-execution simulation so users can see why a transfer would fail before it is submitted. Final enforcement still occurs on-chain at execution time. In operational terms, that means fewer failed submissions and stronger assurance that no application-layer shortcut can produce a non-compliant transfer.

## Data Feeds and Reference Data

Identity and rule enforcement solve only part of the control problem. Many regulated workflows also depend on trusted external data such as prices, exchange rates, NAV values, and corporate action inputs. DALP provides a feed framework that registers, governs, and serves this data through an auditable directory model.

Institutions can use the feed layer for issuer-signed values, for integrations with external pricing sources, and for downstream workflows that depend on current reference data. Common examples include NAV-driven fund servicing, price-aware transfer controls, collateral monitoring, and valuation-aware reporting.

The important point is that DALP does not present itself as an oracle network. It provides the framework for consuming, governing, and exposing trusted feed data inside the platform's compliance and lifecycle workflows. Where external data providers are required, the dependency is explicit.

## Operational Outcome

Taken together, identity, claims, compliance modules, and governed feeds create one institutional trust model. Verified status is reusable, rule enforcement is ex-ante, feed inputs are auditable, and failures default to blocking rather than silent exception handling.

That architecture reduces a common source of programme risk in digital asset initiatives: fragmented control logic spread across onboarding tools, back-office workflows, and smart contracts. DALP consolidates those controls into a single, configurable framework that can evolve with the institution's products, jurisdictions, and operating model.
