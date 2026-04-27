# Section 1: Configurable Tokens: Verification Notes

## Verified Claims (Source Evidence)

### DALPAsset Architecture
- ✅ DALPAsset is the unified token contract, verified via `dalp-asset.mdx` architecture doc
- ✅ Uses UUPS proxy pattern, confirmed in `deployment-architecture.mdx`
- ✅ Implements ERC-3643/SMART Protocol, confirmed across multiple docs
- ✅ ISMARTFeature interface with 6 lifecycle hooks, verified via `token-features/index.mdx`
- ✅ Features execute in configured array order, confirmed in token-features index
- ✅ `supportsRewriting()` for amount modification, confirmed in token-features index
- ✅ Asset Factory for deployment, confirmed in `dalp-asset-factory-architecture.md` capability mapping

### Token Features Catalog
- ✅ AUM Fee, inflationary, mints to fee recipient, verified in `aum-fee.mdx` docs
- ✅ Transaction Fee, supports rewriting, verified in `transaction-fee.mdx` 
- ✅ Transaction Fee Accounting, no on-chain collection, verified in token-features index
- ✅ External Transaction Fee, separate ERC-20 fee, verified in token-features index
- ✅ Voting Power. ERC20Votes, compatible with Governor, verified in `voting-power.mdx`
- ✅ Historical Balances, checkpoint system, prerequisite for Fixed Treasury Yield, verified
- ✅ Permit (EIP-2612), gasless approvals, no hooks, verified in token-features index
- ✅ Maturity Redemption, blocks transfers post-maturity, verified in token-features index
- ✅ Fixed Treasury Yield, pull-based, requires Historical Balances, verified in token-features index
- ✅ Conversion (two-contract design), verified in `conversion.mdx`

### Feature Ordering
- ✅ Recommended ordering table with positions, directly from token-features/index.mdx

### Token Feature Access Control
- ✅ GOVERNANCE_ROLE for config changes, verified in token-features index
- ✅ CUSTODIAN_ROLE for operational actions, verified in token-features index

### Legacy Types
- ✅ 7 legacy types (Bond, Equity, Fund, StableCoin, Deposit, RealEstate, PreciousMetal), verified in `legacy-types.mdx` and `instrument-profiles.mdx`
- ✅ Legacy types have compile-time embedded capabilities, verified in instrument-profiles.mdx
- ✅ Legacy-equivalent presets for DALPAsset, verified in instrument-profiles.mdx
- ✅ Bond preset: Fixed Treasury Yield + Maturity Redemption + Historical Balances, verified
- ✅ Equity preset: Voting Power + Historical Balances, verified
- ✅ Fund preset: AUM Fee + Voting Power + Historical Balances, verified
- ✅ RealEstate and PreciousMetal: no burn, verified in instrument-profiles.mdx

### Per-Asset RBAC
- ✅ 7 per-asset roles (admin, governance, supplyManagement, custodian, emergency, saleAdmin, fundsManager), verified in `authorization.mdx`
- ✅ Role responsibilities match what's documented, verified against authorization.mdx

### Token Lifecycle
- ✅ Ex-ante compliance enforcement, verified in compliance index and narrative
- ✅ All modules must pass for transfer (fail-closed), verified in compliance/index.mdx
- ✅ Identity resolution for every transfer, verified in identity-compliance.mdx
- ✅ Forced transfers bypass compliance, mentioned in authorization.mdx (custodian role)
- ✅ Pause/unpause by emergency role, verified in authorization.mdx
- ✅ Freeze/unfreeze by custodian role, verified in authorization.mdx

### XvP Settlement
- ✅ Atomic DvP/XvP settlement, verified in `xvp-settlement.mdx` capability docs
- ✅ All legs subject to compliance, confirmed in narrative

### Data Feeds
- ✅ Feed aggregation system exists, verified in `feeds.md` capability mapping
- ✅ EIP-712 signing for feed submission, verified in feeds capability mapping
- ✅ Price/NAV feeds support, verified in feeds capability mapping
- ✅ TokenSupplyLimit with base-price conversion, verified in supply-investor-limits.mdx

### Deployment Architecture
- ✅ Durable workflow orchestration via Restate, verified in operations-and-reliability.md and services-architecture.md
- ✅ SystemDeploymentWorkflow with explicit phases, verified in operations capability mapping

### Multi-Chain
- ✅ EVM-compatible chain support, confirmed in narrative and architecture docs
- ✅ Nonce management, gas estimation abstracted, verified in services-architecture.md

## Items Requiring Verification

- [TO VERIFY] Specific gas optimization numbers or transaction cost comparisons
- [TO VERIFY] Exact number of security audits completed on DALPAsset and features
- [TO VERIFY] Whether ERC-1400 partition-like behavior through compliance is actively used or theoretical
- [TO VERIFY] Exact timeline claims for "hours to days" deployment, this is the narrative claim but actual deployment time depends on custody setup, identity provider integration, etc.
- [TO VERIFY] Whether all token features are GA or still behind feature flags, the token-features index says "In development: Token features are behind a feature flag and under active development"
- [TO VERIFY] Integer overflow protection claim, assumed from Solidity 0.8+ but not explicitly verified in the codebase
- [TO VERIFY] Reentrancy protection specifics, assumed from best practices but not verified at code level

## Key Caveats
- Token features are documented as "behind a feature flag and under active development" (token-features/index.mdx). The content presents them as available capabilities. This should be disclosed to the bid checker.
- The "3-7 months" traditional timeline is an industry estimate, not specific competitor data.
- The "hours to days" DALP timeline is from narrative positioning, not from specific deployment measurements.
