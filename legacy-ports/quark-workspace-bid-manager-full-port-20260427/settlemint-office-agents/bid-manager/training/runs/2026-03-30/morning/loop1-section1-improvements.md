# Content Refresh: Section 1 (Configurable Tokens) — Loop 1 Draft

## Improvements Identified from Codebase Review (2026-03-30)

### 1. Transaction Fee — Per-Operation Rate Granularity

**Current content gap:** The content describes Transaction Fee with a single `feeBps` parameter. The actual implementation supports three independent fee rates for different operations.

**Corrected description:**

The Transaction Fee feature supports **three independent fee rates**, each configurable separately:

| Parameter | Description |
|-----------|-------------|
| `mintFeeBps` | Fee rate in basis points applied on mint operations |
| `burnFeeBps` | Fee rate in basis points applied on burn operations |
| `transferFeeBps` | Fee rate in basis points applied on transfer operations |
| `feeRecipient` | Treasury address receiving deducted fees |

This granularity allows institutions to set different fee structures for different operations. A platform might charge 0% on minting (to encourage participation), 1.5% on burns (to discourage early exit), and 2.5% on secondary market transfers (to capture trading revenue). Each rate is independently configurable and updateable through `setFeeRates()` by the governance role.

**Rate immutability:** Once the governance role calls `freezeFeeRates()`, all three rates become permanently locked. This is a one-way operation designed for instruments where regulatory or contractual obligations require fee certainty after issuance. The `isFrozen()` query confirms whether rates can still be modified.

### 2. Transaction Fee Accounting — Fee Exemptions and Reconciliation Cycle

**Current content gap:** The content describes Transaction Fee Accounting as a pure tracking feature but misses two significant capabilities: per-account fee exemptions and the formal reconciliation lifecycle.

**Corrected description:**

Transaction Fee Accounting tracks fees per transaction for off-chain reconciliation without collecting them on-chain. Like the Transaction Fee feature, it supports three independent rate configurations (mint, burn, transfer) and adds two operational capabilities:

**Fee exemptions.** The governance role can exempt specific accounts from fee tracking via `setFeeExemption(account, exempt)`. Exempted accounts do not generate `FeeAccrued` events, keeping the fee ledger clean for accounts like treasury addresses, system contracts, or fee-exempt institutional participants. Exemption status is queryable via `isFeeExempt(account)`.

**Reconciliation cycle.** Accrued fees accumulate on-chain as a running total queryable via `getTotalAccruedFees()`. At the end of an accounting period, the governance role calls `reconcileFees()`, which resets the accrued counter and emits a `FeesReconciled` event with the reconciled amount and period-end timestamp. This creates a clean on-chain marker for each accounting period, simplifying integration with off-chain billing and regulatory reporting systems. The reconciliation does not move tokens; it closes the accounting period for fee-tracking purposes.

**Per-operation fee types.** Each `FeeAccrued` event carries a `FeeType` enum (MINT, BURN, TRANSFER, REDEEM) identifying the operation that generated the fee. This per-operation granularity means external indexing systems can categorize fees by operation type for more precise financial reporting: minting fees from primary issuance, transfer fees from secondary trading, burn fees from redemptions, and redemption-specific fees.

**Rate immutability.** Like the Transaction Fee feature, rates can be permanently frozen via `freezeFeeRates()`.

### 3. AUM Fee — Rate Freeze Capability

**Current content gap:** The content does not mention the `freezeFeeRate()` capability.

**Addition:** The governance role can permanently freeze the AUM fee rate by calling `freezeFeeRate()`. Once frozen, the fee rate cannot be modified. This is important for fund structures where the management fee is contractually fixed at launch and investors need assurance that the rate will not be changed unilaterally after they have committed capital.

### 4. External Transaction Fee — Freeze and Configuration Queries

**Current content gap:** Missing freeze capability documentation.

**Addition:** The External Transaction Fee feature includes `freezeFees()` for permanent rate immutability and `isFrozen()` for status queries, matching the freeze pattern across all fee-type features. Once frozen, fee amounts, the fee token address, and the fee recipient cannot be modified.

### 5. TokenSupplyLimit — Issuer-Wide Cross-Token Caps

**This improvement belongs in Section 2 (Compliance) but is noted here for completeness as it was discovered during the joint codebase review.**

The TokenSupplyLimit module supports a `global` configuration flag. When enabled, the module tracks minted supply across all tokens bound to the same issuer identity, not just the individual token. This addresses regulatory regimes where issuance caps apply at the issuer level rather than the instrument level. For example, a MiCA-regulated issuer subject to a EUR 8M cap across all issued instruments can enforce that cap through a single global-mode TokenSupplyLimit module, with base-price conversion normalizing different token denominations to a consistent EUR-equivalent figure at 18-decimal precision.

### 6. Prose Quality Improvements

Several areas of the existing content could benefit from tighter prose:

**Section 2.2 — Transaction Fee description.** The current description says "A per-transaction fee deducted from the transfer amount." This undersells the capability. The feature supports per-operation fee differentiation (mint/burn/transfer), making it more nuanced than a flat per-transaction fee.

**Section 2.2 — Transaction Fee Accounting description.** The current description says "Tracks fees per transaction for off-chain reconciliation without collecting them on-chain." This is accurate but should mention the fee exemption and reconciliation lifecycle as first-class operational capabilities, not afterthoughts.

**Feature table in "Composable by Design" section.** The Fees & Charges row currently describes "Revenue mechanics — management fees, per-trade fees, cross-currency fees, fee audit trails." This should mention per-operation rate differentiation and fee exemptions as part of the audit trail capability.

---

## Full Rewritten Sub-Sections

### Transaction Fee (Rewritten)

**Transaction Fee**

A per-operation fee feature that deducts a percentage from every mint, burn, or transfer. This feature supports `supportsRewriting = true`, meaning the actual amount received by the recipient is reduced by the configured fee percentage for that operation type.

| Parameter | Description |
|-----------|-------------|
| `mintFeeBps` | Fee rate in basis points applied to mint operations (e.g., 100 = 1%) |
| `burnFeeBps` | Fee rate in basis points applied to burn operations |
| `transferFeeBps` | Fee rate in basis points applied to transfer operations |
| `feeRecipient` | Treasury address receiving deducted fees |

The three-rate model allows institutions to calibrate fee incentives per operation. A platform might charge zero on minting to encourage issuance participation while collecting 2.5% on secondary market transfers as a revenue model. Each rate is independently configurable and updateable through `setFeeRates()`, which requires the `GOVERNANCE_ROLE`.

*Rate immutability*: The governance role can call `freezeFeeRates()` to permanently lock all three rates. This is a one-way operation. Once frozen, `isFrozen()` returns true and no further rate changes are possible. This matters for instruments where fee certainty is contractually required or where investors need assurance against unilateral fee increases.

*Technical detail*: Because `supportsRewriting = true`, the Transaction Fee modifies the actual amount transferred. If a user sends 1,000 tokens with a 2.5% transfer fee (250 bps), the recipient receives 975 tokens and the treasury receives 25 tokens. Features configured after Transaction Fee in the ordering will see the post-fee amount.

*Use cases*: Platform revenue collection on every trade, liquidity pool contributions, regulatory levy enforcement, exchange fee modeling with differentiated rates for primary issuance vs secondary trading.

### Transaction Fee Accounting (Rewritten)

**Transaction Fee Accounting**

Tracks fees per transaction for off-chain reconciliation without collecting them on-chain. This is a pure accounting feature with three operational capabilities: granular per-operation fee tracking, per-account fee exemptions, and a formal reconciliation lifecycle.

Like Transaction Fee, the feature supports three independent rate configurations (mint, burn, transfer) but does not deduct or move tokens. Every qualifying operation emits a `FeeAccrued` event carrying the operation type (MINT, BURN, TRANSFER, or REDEEM), the operation amount, the applicable fee rate, and the calculated fee. External indexing systems can categorize fees by operation type for financial reporting: minting fees from primary issuance, transfer fees from secondary trading, and burn/redemption fees from position exits.

**Fee exemptions.** The governance role can mark specific accounts as fee-exempt via `setFeeExemption(account, exempt)`. Exempted accounts do not generate fee-tracking events, keeping the fee ledger accurate for accounts that should not be subject to fee accounting (treasury addresses, system contracts, institutional participants with negotiated fee waivers). Exemption status is queryable through `isFeeExempt(account)`.

**Reconciliation cycle.** Accrued fees accumulate on-chain as a running total queryable via `getTotalAccruedFees()`. The governance role calls `reconcileFees()` at accounting period boundaries, which resets the running total and emits a `FeesReconciled` event with the reconciled amount and period-end timestamp. This creates a clean on-chain marker for each accounting period. The reconciliation is an accounting operation, not a token transfer; it closes the tracking period so external systems can finalize their billing or regulatory reports.

**Rate immutability.** As with all fee features, `freezeFeeRates()` permanently locks the configured rates.

*Use cases*: Regulatory reporting where fee transparency is required but on-chain collection is not desired, off-chain billing systems that invoice based on on-chain activity records, compliance audit trails where fee calculations must be documented without affecting token balances, and platforms with periodic off-chain settlement where the on-chain record serves as the fee ledger.
