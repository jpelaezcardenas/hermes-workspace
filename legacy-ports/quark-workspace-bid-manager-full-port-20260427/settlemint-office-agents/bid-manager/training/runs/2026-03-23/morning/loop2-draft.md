# Content Refresh: Sections 1–2 — Loop 2 Draft (Rewrite)
## Date: 2026-03-23 | Exercise: Content Refresh Sections 1–2 | Week 1

---

# Section 1 Update: Conversion Feature — Rewritten for Proposal Readiness

## Conversion (Loan-to-Equity)

Convertible instruments — convertible notes, convertible bonds, and contingent convertible securities (CoCos) — are among the most operationally complex structures in capital markets. The conversion event itself requires synchronized actions across two distinct securities: the loan-side instrument must be reduced or retired, and the equity-side instrument must be minted at a price calculated from agreed terms that may include discounts, valuation caps, and accrued interest. Most tokenization platforms either cannot model this at all, or require months of custom Solidity development, a dedicated security audit, and ongoing contract maintenance for each convertible issuance. DALP replaces that custom engineering with a configurable, pre-audited conversion system that handles the full lifecycle — from trigger publication through atomic execution to dual-sided provenance tracking — without writing a single line of custom code.

### How It Works

DALP implements conversion as a cooperative two-contract design. A **Conversion Feature** attaches to the loan-side token and manages the conversion terms, pricing logic, and debt reduction. A **Conversion Minter Feature** attaches to the equity-side token and handles the authorized minting of new equity at the calculated ratio. When a conversion event occurs, both features execute atomically in a single transaction — the loan-side position is reduced and the equity tokens are minted in one indivisible operation. There is never a state where the debt has been extinguished but the equity has not been issued, or vice versa.

The conversion terms are defined at deployment through a comprehensive configuration that covers every parameter institutions need for real-world convertible structures:

**Pricing and economics.** The configuration specifies a discount rate (in basis points — e.g., 2000 for a 20% discount) and an optional valuation cap price. When a conversion trigger fires, the effective conversion price is calculated as the lower of the discounted round price and the cap price. This is the standard convertible note pricing model used across venture and institutional debt markets: a €5M convertible note with a 20% discount at a €50M equity round converts at €8.00 per share (€10.00 × 0.80), yielding 625,000 equity tokens. If the note also carries a €30M valuation cap and the cap price is €6.00 per share, the holder converts at €6.00 instead — receiving 833,333 tokens. The holder always gets the more favorable price, which is how convertible instruments protect early investors against dilution.

**Interest integration.** For instruments that accrue yield — a convertible bond paying 5% annual coupon, for example — DALP's conversion system integrates directly with the Fixed Treasury Yield feature through a dedicated interface. When conversion occurs with interest integration enabled, the system queries accrued but unclaimed interest, adds it to the principal for conversion calculation purposes, and marks the interest as consumed. This prevents the holder from converting their principal to equity and then separately claiming the interest through the normal yield path — a double-dip that would be economically incorrect and a compliance failure. After conversion, accrual stops for the converted position. This three-way coordination between the loan token, the equity token, and the yield feature is precisely the kind of cross-contract orchestration that makes convertible instruments difficult to build from scratch — and precisely what DALP handles through configuration.

**Debt reduction flexibility.** Different legal structures require different treatment of the loan-side tokens upon conversion. DALP supports three methods: **burn** (tokens are permanently destroyed — clean and final, appropriate when the debt is fully extinguished), **lock** (tokens are escrowed in the contract — appropriate when the conversion might be reversible or the locked tokens serve as an audit record of the original debt), and **mark-converted** (positions are flagged as converted without token movement — appropriate for accounting structures where the token record must persist but the position is economically neutralized). The choice is a legal and accounting decision, not a technical limitation.

**Conversion windows and controls.** The configuration defines when conversion can occur (start and end timestamps), whether partial conversion is permitted, and the minimum conversion amount to prevent dust positions. These controls map directly to the term sheet provisions that govern real convertible instruments — a convertible bond that is callable only after year 3 with a 60-day notice window translates to a conversion window with the appropriate start timestamp.

### Triggers: Who Decides When Conversion Happens

Conversion events in institutional markets are not spontaneous — they are governed by specific triggers defined in the instrument's offering documents. DALP's governance role publishes conversion triggers that define the terms for each conversion event. Each trigger carries a unique identifier (e.g., "Series-B-Close" or "QFR-7"), the equity round price that serves as the basis for conversion pricing, an optional expiry date, and a metadata hash linking to off-chain documentation for audit purposes. Triggers can be disabled by governance after publication, providing operational control over conversion eligibility.

This trigger-based model supports the full range of institutional conversion scenarios: a qualified financing round that triggers optional conversion for noteholders, a mandatory conversion event for contingent convertible bonds when a regulatory capital trigger is breached, or a governance-initiated conversion during a restructuring.

### Forced Conversion

The custodian role can execute mandatory conversion of specific holder positions — essential for contingent convertible bonds (CoCos) where regulatory capital triggers require automatic debt-to-equity conversion, or for mandatory conversion events specified in the instrument's terms. Forced conversion follows the same atomic execution path as voluntary conversion, with the same pricing, interest integration, and provenance tracking. The `ForcedConversion` event provides the audit trail distinguishing mandatory from voluntary conversions.

### Provenance and Audit Trail

Both sides of every conversion maintain detailed records. The loan side tracks the conversion ID, trigger ID, holder, principal converted, interest converted, target tokens received, effective price used, and timestamp. The equity side independently tracks the same conversion ID, recipient, amount minted, source loan token, source converter feature, and trigger ID. This dual-record architecture means every equity token minted through conversion can be traced back to the specific loan position, trigger, pricing terms, and authorization that produced it — the level of provenance that regulated securities examinations require.

### What This Means Compared to Custom Development

Without DALP, building a convertible instrument with discount pricing, cap price protection, interest integration, and configurable debt reduction requires:

- Custom smart contract development for the conversion logic (4–8 weeks)
- A separate security audit for the custom contracts ($200–500K, 4–12 weeks)
- Integration testing between the loan and equity token contracts (2–4 weeks)
- Ongoing maintenance for every term variation

With DALP, the same instrument is configured through parameters at deployment time — discount rate, cap price, interest integration toggle, debt method selection — and deployed through the Asset Factory in hours. The conversion contracts are pre-audited. The interest integration, pricing logic, and provenance tracking are included. The only development effort is configuring the terms that match the instrument's offering documents.

*Current status*: Smart contract implemented with full subgraph indexing. DAPI mutation routes for conversion operations are not yet shipped — conversion currently requires direct smart contract calls. No frontend UI for trigger management or conversion execution. These are product roadmap items; the underlying contract infrastructure is production-ready.

---

# Section 2 Update: Transfer Approval and TimeLock — Rewritten

## Transfer Approval: Designated Authorities and Audit Provenance

In regulated securities markets, the question is not just whether a transfer was approved — it is who approved it and whether they had the authority to do so. DALP's Transfer Approval module addresses this institutional requirement through a configurable system of designated approval authorities with full provenance tracking.

### Designated Approval Authorities

The module supports a configurable list of **approval authorities** — specific on-chain identities (OnchainID contracts) authorized to grant transfer approvals for a given token. This maps directly to regulated roles in securities markets:

- A licensed transfer agent designated by the issuer
- Specific compliance officers within the issuing organization
- Regulated intermediaries authorized to supervise secondary market transfers under the applicable securities framework

Only addresses whose on-chain identity matches a configured approval authority can grant approvals. Any attempt by an unauthorized identity reverts immediately. This is a meaningful distinction from platforms where any administrator can approve transfers — DALP enforces that the approval authority is as controlled and auditable as the transfer itself.

### Audit-Grade Approval Records

Each approval creates a record that captures not just the approval itself but its full provenance: the expiry timestamp, whether the approval has been consumed (for one-time-use configurations), and critically, the specific identity of the authority that granted it. When a regulator examines a transfer during a supervisory review, the on-chain record provides a complete chain: which authority approved the transfer, when the approval was granted, when it expires, and whether it has been consumed. This is the level of evidential detail that regulated transfer-agent workflows require.

### Conflict Prevention

The module prevents conflicting approvals from different authorities for the same transfer. If an unexpired approval from one authority already exists, a second authority cannot overwrite it — the system reverts rather than silently replacing the authorization. This ensures a clean chain of responsibility: one authority, one approval, one consumption. For institutions accustomed to the discipline of transfer-agent controls, this conflict prevention model is a natural fit.

Approvals remain identity-bound (following the investor across wallet changes), tuple-specific (sender identity, recipient identity, amount), configurable as one-time use with expiry, and subject to exemption expressions that allow qualified institutional investors or other specified classes to bypass the approval requirement when regulations permit.

---

## TimeLock: Operational Boundary for Batch Tracking

The TimeLock module's FIFO batch tracking creates a new record for every incoming transfer to a holder's wallet. To prevent unbounded array growth — which would cause escalating gas costs as the FIFO walk traverses increasingly large arrays — the module enforces a maximum of **500 batches per user per token**.

For most institutional deployments, 500 batches is more than sufficient. A quarterly distribution recipient accumulates 4 batches per year; after 100 years, they would use 400 of the 500 slots. However, for scenarios where a single investor receives many small, frequent allocations — automated DCA purchases, high-frequency OTC settlement, or granular airdrop distributions — the limit requires operational awareness.

When the batch limit is approached, institutions can mitigate by consolidating smaller positions through custodian-mediated transfers (which create a single new batch for the consolidated amount while consuming older batches through the outgoing transfer) or by designing allocation workflows that minimize the number of separate incoming transfers per holder.

This limit exists as an explicit engineering trade-off between operational flexibility and gas predictability. It is documented here because institutional deployments should not discover operational boundaries during production operations.

---

# Summary of Changes

| Content File | Section Updated | Change Type |
|-------------|----------------|-------------|
| `01-configurable-tokens/main.md` | Section 2.2 — Conversion | Full rewrite: client-centric framing, worked pricing example, interest integration narrative, debt reduction explained in business terms, competitive positioning vs custom development |
| `02-configurable-compliance/main.md` | Section 7.7 — Transfer Approval | Rewrite: approval authorities with institutional role mapping, audit-grade provenance, conflict prevention, regulatory examination framing |
| `02-configurable-compliance/main.md` | Section 7.8 — TimeLock | Addition: MAX_BATCHES_PER_USER = 500 operational boundary with mitigation guidance and practical context |
