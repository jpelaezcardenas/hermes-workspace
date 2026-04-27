# Content Refresh: Section 2 (Configurable Compliance) — Loop 1 Draft

## Improvements Identified from Codebase Review (2026-03-30)

### 1. TokenSupplyLimit — Issuer-Wide Cross-Token Caps (Global Flag)

**Current content gap:** The content describes TokenSupplyLimit with three modes (lifetime, fixed-period, rolling-period) and base-price conversion, but does not mention the `global` configuration flag or the cross-token tracking capability.

**Corrected description for Section 7.9:**

**Global supply tracking.** The TokenSupplyLimit module includes a `global` configuration flag. When enabled, minted supply is tracked across all tokens using the same module instance for a given issuer, not just the individual token. This addresses regulatory regimes where issuance caps apply at the issuer level rather than per instrument. A MiCA-regulated stablecoin issuer subject to a EUR 8M aggregate cap across all issued instruments can enforce that cap through a single global-mode TokenSupplyLimit module. Base-price conversion normalizes different token denominations to a consistent EUR-equivalent value at 18-decimal precision, so tokens priced at different base values contribute proportionally to the aggregate cap.

This is architecturally significant because issuer-level caps cannot be reliably enforced at the individual token level without cross-token state coordination. DALP handles this through the compliance module layer, avoiding the complexity of custom cross-contract accounting that most tokenization platforms would require for the same regulatory obligation.

### 2. TokenSupplyLimit — Base Currency Decimal Normalization

**Current content gap:** The content mentions "base-price conversion" but does not explain the normalization mechanism.

**Addition to Section 7.9:**

When `useBasePrice` is enabled, all base currency amounts are normalized to 18-decimal precision (`BASE_CURRENCY_DECIMALS = 18`). This standardization prevents precision loss when comparing supply across tokens with different decimal configurations. The `maxSupply` parameter must also be expressed in 18-decimal base currency units: a EUR 8M cap becomes `8,000,000 × 10^18`. Base price conversion happens at issuance time and the converted value is stored permanently; subsequent price changes do not retroactively alter the recorded supply contribution. This means the cap tracks the value at issuance, not the current market value of outstanding tokens.

### 3. TokenSupplyLimit — Rolling Window Implementation Detail

**Current content gap:** The content mentions "rolling-period cap" without explaining the implementation bounds.

**Addition:**

The rolling window implementation uses a fixed circular buffer capped at 730 entries (two years of daily tracking). This prevents unbounded storage growth while supporting rolling periods up to two years in length. Daily supply amounts are stored at position `(day % 730)` in the buffer, and the module sums the relevant window when evaluating whether a new mint would exceed the cap.

### 4. Collateral Compliance Module — Extra Trusted Issuers Detail

**Existing content is accurate.** The current description correctly notes that the CollateralComplianceModule supports "extra trusted issuers beyond the global registry." No change needed, but confirming codebase alignment.

### 5. Prose Quality Improvements

**Module Quick Reference table context.** The existing table at the start of Section 7 is strong but the "Proposal context" paragraph could be more specific about which regulatory frameworks map to which module combinations. Currently it says "A European bond might use modules 1 + 4 + 8 + 9 + 11." More useful to evaluators: "A MiCA-compliant European bond typically combines IdentityVerification (KYC + AML), CountryAllowList (EU-27), TimeLock (minimum holding period), TokenSupplyLimit (EUR-denominated issuance cap with base-price conversion), and InvestorCount (holder threshold), with the TokenSupplyLimit optionally configured in global mode to track issuer-wide aggregate issuance."

**Section 9 (KYC Workflows).** The description of Transaction Fee Accounting's `setFeeExemption` does not appear in Section 2 content (it's a token feature, not a compliance module), but the concept of per-identity or per-address exemptions is relevant to the broader compliance narrative. No change needed in Section 2 for this.

---

## Full Rewritten Sub-Section

### 7.9 Token Supply Limit (Rewritten)

Enforces minting limits using one of three modes:
- **Lifetime cap**: Total amount that can ever be minted across the entire token lifetime
- **Fixed-period cap**: Maximum minting within a defined calendar period that resets at each interval boundary
- **Rolling-period cap**: Maximum minting within a sliding time window that continuously advances

The rolling window implementation uses a fixed circular buffer of 730 entries (two years of daily tracking), preventing unbounded storage growth while supporting rolling periods of any length up to two years. Daily mint amounts are accumulated at position `(day % 730)` in the buffer, and the module sums the relevant window when evaluating whether a proposed mint would exceed the cap.

**Base-price conversion.** For monetary cap enforcement, the module supports optional base-price conversion that transforms token quantities into currency-equivalent values. When `useBasePrice` is enabled, all amounts are normalized to 18-decimal precision, and the `maxSupply` parameter is expressed in base currency units (e.g., `8,000,000 × 10^18` for a EUR 8M cap). The conversion uses on-chain price claims from the asset's identity, and the converted value is recorded permanently at issuance time. Subsequent price fluctuations do not retroactively alter the recorded supply contribution, meaning the cap tracks value at issuance, not current market value.

**Issuer-wide (global) tracking.** The `global` configuration flag extends supply tracking across all tokens using the same module instance for a given issuer. This is essential for regulatory regimes where issuance caps apply at the issuer level rather than per instrument. A MiCA-regulated stablecoin issuer subject to a EUR 8M aggregate issuance cap can enforce that limit through a single global-mode module, with base-price conversion normalizing contributions from tokens with different denominations. Cross-token cap enforcement through the compliance module layer avoids the custom cross-contract accounting that most tokenization platforms would require for the same obligation.

**When to use**: MiCA issuance caps (EUR-denominated, potentially issuer-wide), Reg CF dollar limits, crowdfunding program caps, rolling fundraising windows, any regime where total issuance is constrained by amount or value.
