# Content Refresh: Sections 1–2 — Loop 1 Draft
## Date: 2026-03-23 | Exercise: Content Refresh Sections 1–2 | Week 1

---

# Findings from Codebase Review

## Section 1: Configurable Tokens (`content/01-configurable-tokens/main.md`)

### Gaps Identified

1. **Conversion Feature underrepresented** — The current content describes Conversion as a simple "cooperative two-contract design" but misses significant codebase detail from `IConversionTypes.sol`:
   - `ConversionConfig` struct includes: `discountBps`, `capPricePerShareWad`, `conversionWindowStart/End`, `minConversionAmount`, `partialAllowed`, `includeInterestInConversion`, `closeInterestOnConversion`, `debtMethod` (Burn/Lock/MarkConverted)
   - `IConversionInterestProvider` interface enables yield features (like Fixed Treasury Yield) to integrate with conversion — allowing accrued interest to be included in the conversion amount
   - Three `DebtReductionMethod` options: Burn (principal destroyed), Lock (escrowed), MarkConverted (no token movement)
   - Trigger system with pricing details: `roundPricePerShareWad`, `metadataHash`, `expiresAt`
   - All WAD (1e18) precision for financial amounts

2. **TransferApproval compliance module — approval authorities** — The `TransferApprovalComplianceModule` has a `Config.approvalAuthorities` field (array of identity addresses allowed to grant approvals) not mentioned in either content section. This is meaningful for institutional deployments where specific compliance officers or transfer agents are designated.

3. **TimeLock MAX_BATCHES_PER_USER** — The codebase has a `MAX_BATCHES_PER_USER = 500` constant in the TimeLock module. This is an operational boundary institutions should know about.

## Section 2: Configurable Compliance (`content/02-configurable-compliance/main.md`)

### Gaps Identified

1. **TransferApproval approvalAuthorities** — The compliance content doesn't mention that the module supports a list of designated approval authorities (identity-scoped). This is a meaningful institutional feature: only specific compliance officers or licensed intermediaries can grant transfer approvals.

2. **TransferApproval ApprovalRecord** — The struct includes `approverIdentity` tracking, providing audit evidence of which specific authority approved each transfer.

3. **TimeLock MAX_BATCHES_PER_USER = 500** — Operational boundary not documented. For high-frequency token recipients (e.g., an institutional investor receiving many small allocations), this limit matters.

---

# Refreshed Content: Section 1 — Conversion Feature Update

The following is the updated Conversion (Loan-to-Equity) subsection to replace the existing content in Section 2.2 of `content/01-configurable-tokens/main.md`:

---

## Conversion (Loan-to-Equity)

A cooperative two-contract design for convertible instruments with full pricing, interest integration, and debt reduction mechanics. This is implemented as two features that work together across a loan-side token and an equity-side token:

1. **Conversion Feature** (attaches to the loan/debt-side token): Manages conversion configuration, trigger publishing, pricing logic, interest integration, debt reduction, and holder-initiated or forced conversion
2. **Conversion Minter Feature** (attaches to the equity-side token): Receives conversion requests from authorized converters, mints equity tokens at the calculated ratio, and tracks issuance provenance

### Conversion Configuration

The Conversion Feature is initialized with a `ConversionConfig` that defines the full conversion terms at deployment:

| Parameter | Description |
|-----------|-------------|
| `targetToken` | The equity-side token to receive on conversion |
| `conversionMinter` | The ConversionMinterFeature address on the target token (auto-discoverable if omitted) |
| `denominationAsset` | Common denomination for pricing (e.g., USDC, EUROC) — must match across loan, equity, and interest provider |
| `discountBps` | Conversion discount in basis points (e.g., 2000 = 20% discount to round price) |
| `capPricePerShareWad` | Maximum conversion price in WAD (1e18) — protects holders against unfavorable pricing (0 = no cap) |
| `conversionWindowStart` | Earliest timestamp for conversion (0 = anytime) |
| `conversionWindowEnd` | Latest timestamp for conversion (0 = no deadline) |
| `minConversionAmount` | Minimum principal to convert, preventing dust conversions (0 = no minimum) |
| `partialAllowed` | Whether holders can convert a portion of their position rather than all-or-nothing |
| `includeInterestInConversion` | Whether accrued but unclaimed interest is included in the conversion calculation |
| `interestProvider` | Address of the yield feature implementing `IConversionInterestProvider` (auto-discoverable if omitted) |
| `closeInterestOnConversion` | Whether to stop future interest accrual after conversion (recommended: true for extinguished debt) |
| `debtMethod` | How the loan-side principal is handled: **Burn** (tokens destroyed), **Lock** (tokens escrowed), or **MarkConverted** (flagged as converted without token movement) |

All pricing and interest amounts use WAD (1e18) precision to prevent decimal mixing bugs across tokens with different decimal configurations.

### Interest Integration

The Conversion Feature integrates with any yield feature that implements the `IConversionInterestProvider` interface — currently, the Fixed Treasury Yield feature. When `includeInterestInConversion` is enabled:

1. The system queries `quoteAccruedWad()` to determine the holder's accrued but unclaimed interest
2. The accrued interest is added to the principal amount when calculating how many target tokens the holder receives
3. `consumeAccruedWad()` marks the interest as consumed, preventing it from being claimed separately through the normal yield redemption path
4. If `closeInterestOnConversion` is true, `closeAccrual()` stops further interest from accumulating on the converted position

This three-way denomination matching (loan token, equity token, and interest provider all reference the same denomination asset) ensures consistent pricing across the conversion lifecycle.

### Trigger System

The governance role publishes conversion triggers that define when and at what terms conversion can occur:

| Trigger Field | Description |
|---------------|-------------|
| `triggerId` | Unique identifier (e.g., "QFR-7" for a quarterly financing round) |
| `roundPricePerShareWad` | The actual equity round price — the basis for conversion price calculation |
| `denominationAsset` | Must match the conversion config's denomination asset |
| `expiresAt` | When the trigger expires (0 = never) |
| `metadataHash` | Hash of off-chain trigger details for audit linkage |
| `active` | Can be disabled by governance after publication |

The effective conversion price is calculated from the trigger's round price, applying the configured discount and subject to the cap price ceiling. This means a convertible note with a 20% discount and a $10M cap converts at the lower of: (round price × 0.80) or (cap price), protecting holders as the company's valuation increases.

### Conversion Execution

**Holder-initiated conversion**: Token holders can convert their loan tokens to equity tokens within defined windows, subject to the minimum conversion amount and partial-conversion policy. The conversion executes atomically:

1. Validate the trigger is active and not expired
2. Calculate the effective conversion price (discount and cap applied)
3. If interest integration is enabled, query and consume accrued interest
4. Apply the debt reduction method to the principal (burn, lock, or mark)
5. Mint the calculated equity token amount via the ConversionMinterFeature
6. Emit `ConversionInitiated` and `ConversionFinalized` events

**Custodian-initiated (forced) conversion**: The custodian role can force mandatory conversion of all or specific holder positions — essential for mandatory conversion events such as a qualified financing round that triggers automatic debt-to-equity conversion, or contingent convertible bond (CoCo) regulatory triggers.

### Debt Reduction Methods

The three methods provide flexibility for different legal and accounting structures:

- **Burn**: Loan tokens are permanently destroyed. Clean and final — appropriate when the debt instrument is fully extinguished.
- **Lock**: Loan tokens are escrowed in the contract. Appropriate when the conversion might be reversible or when the locked tokens serve as an audit record of the original debt position.
- **MarkConverted**: No token movement — positions are flagged as converted in the contract state. Appropriate for accounting structures where the token record must persist but the position is economically neutralized.

### Provenance Tracking

Both sides of the conversion maintain detailed provenance records:

- **Loan side** (`ConversionRecord`): tracks conversion ID, trigger ID, holder, principal converted, interest converted (WAD), target tokens received, effective price used, timestamp, and status
- **Target side** (`IssuanceRecord`): tracks conversion ID, recipient, amount minted, source loan token, source converter feature, trigger ID, and timestamp

This dual-record architecture provides complete audit trails for regulatory examination — every equity token minted through conversion can be traced back to the specific loan position, trigger, and pricing terms that authorized it.

*Current status*: Smart contract implemented with full subgraph indexing. **No DAPI routes exist** — conversion must currently be done via direct smart contract calls. No frontend UI for trigger management or conversion execution. Subgraph handlers process `TriggerPublished`, `TriggerDisabled`, `ConversionInitiated`, `ConversionFinalized`, and `ForcedConversion` events.

*Use cases*: Convertible bonds (debt-to-equity conversion with discount pricing), convertible notes (startup financing with cap and discount), mandatory convertible instruments (triggered by governance events), contingent convertible bonds (CoCos) for banking capital requirements where regulatory triggers force conversion to absorb losses.

---

# Refreshed Content: Section 2 — TransferApproval and TimeLock Updates

The following are the updated subsections for `content/02-configurable-compliance/main.md`:

---

## Transfer Approval (Updated)

Requires explicit pre-authorization before a transfer can execute. Approvals are identity-bound, tuple-specific, and configurable — with designated approval authorities and full audit provenance.

### Approval Authorities

The module supports a configurable list of **approval authorities** — specific identity addresses (OnchainID contracts) authorized to grant transfer approvals for a given token. This maps directly to institutional roles:

- A licensed transfer agent designated by the issuer
- Specific compliance officers within the issuing organization
- Regulated intermediaries authorized to supervise secondary market transfers

Only addresses whose on-chain identity matches a configured approval authority can grant approvals. Unauthorized approval attempts revert with `UnauthorizedApprover`. This prevents approval authority from being inadvertently assumed by any identity with a governance role — the authority list is explicit and auditable.

### Approval Records

Each approval creates an `ApprovalRecord` with full provenance:

| Field | Description |
|-------|-------------|
| `expiry` | Timestamp when the approval expires |
| `used` | Whether this one-time-use approval has been consumed |
| `approverIdentity` | The specific identity (OnchainID) that granted the approval |

The `approverIdentity` field provides audit-grade evidence of which specific authority approved each transfer — essential for regulatory examinations where the question is not just "was the transfer approved?" but "who approved it and were they authorized to do so?"

### Conflict Prevention

The module prevents conflicting approvals: if an unexpired approval from a different authority already exists for the same transfer tuple, the system reverts with `ApprovalAlreadyExists` rather than silently overwriting. This ensures a clear chain of authorization responsibility — one authority, one approval, one consumption.

Approvals are keyed on:
- Sender identity
- Recipient identity
- Amount

They can be:
- **One-time use**: consumed after a single transfer (recommended for regulatory compliance)
- **Expiry-based**: valid only within the configured approval window
- **Exemption-aware**: investors matching specific claim expressions (e.g., qualified institutional investors) can be exempted from the approval requirement

---

## TimeLock — Operational Boundary Note (Updated)

The TimeLock module enforces a **maximum of 500 batches per user per token** (`MAX_BATCHES_PER_USER = 500`). Each incoming transfer creates a new batch entry. For institutional deployments where a single investor might receive many small allocations over time (e.g., periodic distributions, DCA-style purchases, or multiple settlement events), this limit should be factored into operational planning.

When the batch limit is reached, the contract prevents new batch creation. Operational mitigation includes consolidating smaller positions through custodian-mediated transfers or designing allocation workflows that minimize the number of separate incoming transfers per holder.

This limit exists to prevent unbounded array growth, which would create escalating gas costs for transfer operations (since the FIFO walk must traverse the batch array). The 500-batch limit provides a practical balance between operational flexibility and gas predictability.

---

# Summary of Changes

| Content File | Section Updated | Change Description |
|-------------|----------------|-------------------|
| `01-configurable-tokens/main.md` | Section 2.2 — Conversion | Complete rewrite: added ConversionConfig parameters (discount, cap price, interest integration, debt methods, partial conversion), IConversionInterestProvider integration, trigger system detail, debt reduction methods, and provenance tracking |
| `02-configurable-compliance/main.md` | Section 7.7 — Transfer Approval | Added approval authorities, ApprovalRecord with approverIdentity, conflict prevention (ApprovalAlreadyExists) |
| `02-configurable-compliance/main.md` | Section 7.8 — TimeLock | Added MAX_BATCHES_PER_USER = 500 operational boundary and mitigation guidance |
