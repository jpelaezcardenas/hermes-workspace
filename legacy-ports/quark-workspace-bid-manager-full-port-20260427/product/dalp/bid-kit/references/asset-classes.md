# Supported Asset Classes

## The Multi-Asset Advantage

One of the hardest parts of doing tokenization right is supporting multiple asset types without building separate infrastructure for each one. Most platforms handle one or two asset classes well, then require months of custom development for each additional type. DALP ships seven asset classes as production-ready templates sharing the same lifecycle engine: DvP settlement, vault custody, yield automation, and SMART Protocol compliance.

## Corporate Bonds

Fixed or floating rate instruments with maturity dates, coupon payment schedules, redemption mechanics, and collateral tracking. The platform calculates interest entitlements on payment dates automatically. Settlement via DvP eliminates counterparty risk. Compliance modules enforce accredited investor verification and transfer restrictions.

**Lifecycle**: Issuance via DvP, holding period in vault, automated coupon calculation, on-demand claim distribution, atomic redemption at maturity. Result: roughly 90% reduction in operational overhead and zero reconciliation errors.

## Equities

Common or preferred shares with voting rights, dividend distributions, cap table management, and shareholder governance. Voting power derives automatically from token holdings at snapshot blocks, tallied on-chain without manual spreadsheets. Compliance modules enforce securities laws and shareholder rights.

## Funds (Investment Units)

Open-ended or closed-end fund structures with NAV tracking, management fee calculation, performance monitoring, subscription processing, and redemption workflows. GP/LP distribution waterfalls are calculated on-chain with preferred return and carried interest rules. The platform automates fund administration tasks that traditionally take days. Result: real-time cap table visibility and significant reduction in administrative burden.

## Stablecoins

Fiat-pegged tokens with reserve management, peg maintenance, minting controls tied to actual deposits, and burning for redemptions. On-chain reserve proofs and real-time attestation replace periodic audits. Continuous yield distribution from treasury operations to token holders.

## Deposit Certificates

Time-locked deposit certificates with collateral verification, maturity tracking, and daily interest accrual. Smart contract logic enforces maturity dates and early withdrawal penalties. Customer self-service portals eliminate the majority of support tickets. Compliance modules handle deposit limits and customer verification.

## Real Estate

Fractionalized property ownership via tokenization. Rental income is deposited to a yield vault and distributed pro-rata to token holders. Mid-period transfers are accounted for automatically. Exit via DvP when the property sells. Compliance modules handle securities laws, tax withholding (FIRPTA where applicable), and jurisdiction-specific rules.

## Precious Metals

Custody-verified fractional ownership of allocated bars. On-chain attestations include bar numbers, weights, purity grades, and vault locations. Secondary trading happens without physical movement. Redemption options include physical delivery or cash settlement at spot prices. Compliance modules cover commodity regulations and custody verification.

## Cross-Cutting Capabilities

Every asset type benefits from shared infrastructure:

- **SMART Protocol compliance**: Transfer-time eligibility validation across all assets, enforced at the protocol level.
- **Real-time cap tables**: Ownership updates instantly as tokens transfer. No month-end reconciliation.
- **Unified observability**: A single operational dashboard spans all asset types with integrated metrics, logs, and tracing.
- **Immutable audit trails**: On-chain records with cryptographic proofs for every compliance decision and corporate action.
- **Instant settlement**: Atomic finality eliminates traditional T+2 and T+5 clearing cycles.
- **API-first access**: Every lifecycle operation is available through typed REST APIs with webhook event subscriptions.

## Cost Comparison

Fragmented approach: 6 to 9 months of integration engineering per asset type, 40+ hours of monthly reconciliation per asset. DALP: 4 to 8 weeks for the first asset, 2 to 4 weeks for each additional type, zero reconciliation.
