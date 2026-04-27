# Content Refresh: Section 2 (Configurable Compliance) — Loop 2 Final

## Changes Applied from Loop 1 Review

1. Rewrote TokenSupplyLimit to lead with regulatory need, not config flag
2. Tightened sentences to max 35 words
3. Added institutional framing for global tracking
4. Improved the Module Quick Reference proposal context paragraph

---

## Drop-In Replacement: Section 7.9 Token Supply Limit

Enforces minting limits using one of three modes:
- **Lifetime cap**: Total amount that can ever be minted
- **Fixed-period cap**: Maximum minting within a defined calendar period, resetting at each interval boundary
- **Rolling-period cap**: Maximum minting within a sliding time window that continuously advances

Regulatory frameworks rarely impose simple unit caps. MiCA caps issuance in EUR terms. Reg CF limits offerings in USD within 12-month windows. Some regimes apply caps at the issuer level, not the instrument level. DALP's TokenSupplyLimit module addresses all three dimensions: it converts between token units and currency values, supports both fixed and rolling time windows, and can track issuance across multiple tokens for a single issuer.

**Base-price conversion.** When `useBasePrice` is enabled, the module transforms token quantities into currency-equivalent values using on-chain price claims from the asset's identity. All amounts normalize to 18-decimal precision, and the `maxSupply` parameter is expressed in base currency units (e.g., `8,000,000 × 10^18` for EUR 8M). Conversion happens at issuance time and the result is stored permanently. Subsequent price fluctuations do not retroactively alter the recorded supply contribution. The cap tracks value at issuance, not current market value.

**Rolling window mechanics.** The rolling window uses a fixed circular buffer of 730 entries (two years of daily tracking). This prevents unbounded storage growth while supporting any rolling period up to two years. Daily mint amounts accumulate at position `(day % 730)` in the buffer. When evaluating a proposed mint, the module sums the relevant window to determine remaining capacity.

**Issuer-wide (global) tracking.** Some regulatory caps apply at the entity level, not the instrument level. A stablecoin issuer operating under MiCA may issue multiple EUR-backed tokens, each structured differently, but the EUR 8M threshold applies to aggregate issuance across all instruments. The `global` configuration flag extends supply tracking across all tokens using the same module instance for that issuer. Base-price conversion normalizes contributions from tokens with different denominations into a single aggregate figure.

This cross-token enforcement operates at the compliance module layer, which means no custom cross-contract accounting is needed. Most tokenization platforms cannot enforce issuer-level caps without bespoke development. DALP handles it through a configuration parameter on an existing, audited module.

**When to use**: MiCA issuance caps (EUR-denominated, issuer-wide or per-token), Reg CF dollar limits, crowdfunding program caps, rolling fundraising windows, any regime where issuance is constrained by amount, value, or time period.

---

## Drop-In Replacement: Module Quick Reference Proposal Context Paragraph

Replace the existing "Proposal context" paragraph below the Module Quick Reference table:

**Proposal context**: In a typical regulated issuance, an institution selects a combination of these modules to match their regulatory requirements. A MiCA-compliant European bond typically combines IdentityVerification (KYC + AML expression), CountryAllowList (EU-27 member state codes), TimeLock (minimum holding period), TokenSupplyLimit (EUR-denominated cap with base-price conversion, optionally in global mode for issuer-wide tracking), and InvestorCount (holder threshold). A GCC stablecoin deployment might use IdentityVerification, CountryAllowList (UAE, Saudi Arabia, Bahrain), CappedComplianceModule, and CollateralComplianceModule (100% or overcollateralized backing). A Singapore private placement might combine IdentityVerification (QII or KYC+AML), IdentityAllowList (named investors), TimeLock (180-day MAS hold period), InvestorCount, and TransferApproval (compliance officer consent). The modules compose through sequential AND evaluation: every active module must pass for a transfer to succeed.

---

## No Other Changes to Section 2

The remaining Section 2 content (Identity Registry, Claim Topics, Trusted Issuers, KYC Workflows, Regulatory Mappings, Audit Trail) was reviewed against the codebase. No material gaps found. The existing content accurately reflects:

- 12 compliance module types (all 16 .sol files in compliance/ accounted for, including abstract bases)
- Three-tier interface hierarchy (IDALPGlobalCompliance → IDALPTokenCompliance → ISMARTComplianceV2)
- RPN expression evaluation for Identity Verification
- FIFO batch tracking for TimeLock (500-batch limit documented)
- Collateral ratio enforcement with extra trusted issuers
- Transfer Approval with designated authorities, provenance, and consumption tracking
- KYC lifecycle with approve/reject/request-update outcomes
