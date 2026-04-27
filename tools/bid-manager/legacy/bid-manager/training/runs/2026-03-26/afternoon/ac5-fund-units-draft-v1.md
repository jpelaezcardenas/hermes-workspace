# Fund Units: DALP's Full Coverage for Tokenized Investment Funds

---

## Introduction

Investment fund tokenization sits at the intersection of financial complexity and operational precision. Unlike simple equity tokens, fund units carry a lifecycle that extends well beyond issuance and transfer: subscriptions must be processed against committed capital, redemptions must respect notice periods and gate provisions, NAV calculations must synchronize with off-chain fund administrators, and distribution waterfalls must execute accurately across investor classes. A platform that claims to support fund tokenization but addresses only the token layer is solving roughly twenty percent of the problem.

DALP treats fund units as first-class financial instruments within its configuration-driven asset architecture. The Fund asset type provides the structural foundation, while composable token features, compliance modules, and system addons address the operational demands that separate institutional fund management from basic token transfers. This section examines every aspect of DALP's fund unit coverage: from NAV integration and subscription mechanics to distribution execution, transfer restrictions, and fund administrator connectivity.

---

## NAV Integration and Pricing

### The Pricing Challenge for Tokenized Funds

Net Asset Value determines every meaningful operation in a fund's lifecycle: subscriptions price against it, redemptions settle at it, performance reporting derives from it, and regulatory filings reference it. Any digital fund platform must treat NAV not as a decorative data point but as an operational primitive that feeds directly into on-chain logic.

DALP approaches NAV integration through two complementary mechanisms: its data feeds infrastructure and its yield schedule system. Together, these allow fund operators to consume external NAV data, publish it on-chain with full audit trails, and use those values to drive distribution calculations and investor reporting.

### Data Feed Architecture

DALP's data feed system provides signed, on-chain price and NAV channels that fund administrators can update at the frequency their fund structure requires. For daily-priced open-ended funds, NAV feeds can update every business day. For weekly-valued private equity vehicles, a weekly cadence is configured instead. Event-driven NAV updates, triggered by material portfolio events rather than calendar schedules, are supported through the same feed mechanism with manual or API-triggered publication.

Each feed entry is signed by an authorized feed publisher and recorded on-chain, creating an immutable audit trail of every NAV value that has ever been active. This matters for regulatory purposes: when a regulator asks what NAV was used for a specific redemption six months ago, the answer is cryptographically verifiable rather than dependent on a database backup.

Feed staleness detection ensures that operations dependent on NAV, such as subscription pricing or performance reporting, do not silently use outdated values. If a feed has not been updated within its configured freshness window, the platform flags the condition for operational review.

### Pricing Source Connectivity

DALP does not calculate NAV internally. Fund NAV calculation is a specialized domain that involves portfolio valuation, accrued income computation, expense allocation, and accounting reconciliation. These calculations reside with the fund administrator, not with the tokenization platform. DALP's role is to consume the administrator's NAV output and make it operationally available on-chain.

The integration model works through DALP's API surface. A fund administrator exports NAV data from their calculation engine, and the fund operator or an automated integration publishes that value to DALP's feed system. The platform provides the transport, signing, storage, and consumption infrastructure. Pre-built connectors to specific fund administration platforms are not shipped as product features; each integration is configured through the API based on the administrator's data export capabilities.

This boundary is intentional. NAV calculation involves accounting judgments, fair value determinations, and regulatory methodology choices that belong to the fund administrator's domain. DALP enforces the downstream consequences of NAV (pricing subscriptions, calculating distributions, reporting values) without introducing a parallel calculation engine that could diverge from the administrator's authoritative figures.

---

## Subscription and Redemption Mechanics

### Subscription Workflows

Fund unit subscriptions in DALP follow the platform's token issuance pipeline, adapted for fund-specific requirements. When an investor subscribes to a fund, the workflow progresses through identity verification, compliance evaluation, and minting in a deterministic sequence.

The compliance engine evaluates the subscriber against all configured modules before any units are minted. For a typical fund deployment, this means verifying the investor's on-chain identity claims (KYC completion, accreditation status, jurisdictional eligibility), checking against investor count limits, and confirming that the subscription does not breach any configured supply caps. A fund restricted to qualified purchasers under Regulation D, for example, would require an accreditation claim from a trusted issuer before the subscription can proceed.

DALP's token sale addon provides the infrastructure for structured primary offerings. The sale contract supports configurable parameters including minimum subscription amounts, per-investor purchase limits, multi-currency payment acceptance through approved payment tokens, and soft and hard cap mechanics with automatic refund safety. An optional presale phase allows anchor investors to subscribe before the general offering window opens. The five-tab operational console gives fund operators visibility into subscription progress, investor participation, and cap utilization.

For capital commitment structures common in private equity and venture funds, DALP records committed amounts through the token sale mechanism and tracks funded versus unfunded portions. Capital calls, where the general partner draws down a portion of committed capital, are processed as sequential minting events against each investor's commitment. The platform tracks the relationship between commitment and funded capital, providing the operational data that capital call notices and investor statements require.

### Redemption Processing

Redemption is the inverse of subscription: an investor surrenders fund units in exchange for the underlying value, typically cash or a payment token. DALP handles the token-side mechanics of redemption through its burn infrastructure, where units are permanently removed from circulation and total supply decreases accordingly.

For open-ended funds with regular redemption windows, the operational model involves the fund operator processing redemption requests at NAV, verifying the investor holds sufficient unfrozen units, executing the burn, and distributing the redemption proceeds through the payment token. The compliance engine validates that the redemption does not violate any configured restrictions, such as minimum holding periods enforced through the TimeLock compliance module.

Gate provisions, which limit the total redemptions processable in a single period to protect remaining investors from forced liquidation, are managed at the operational layer. The fund operator determines whether a gate threshold has been reached and queues excess redemption requests for the next processing window. DALP does not include a native gate queue management system; the platform provides the burn mechanics and balance tracking, while the gate logic and queue prioritization sit with the fund administrator's operational processes.

Notice periods for redemptions are enforced through the Transfer Approval compliance module, which requires explicit operational approval before a transfer or burn executes. An investor's redemption request triggers the approval workflow, and the fund operator grants approval only after the notice period has elapsed and NAV has been determined. The configurable expiry window on approvals ensures that stale redemption requests do not execute at outdated NAV values.

### Subscription and Redemption at Scale

Both subscription and redemption support batch operations. Up to 100 investors can be processed in a single API call for minting or burning, with compliance checks applied individually to each investor in the batch. If any single investor fails a compliance check, the entire batch is rejected, maintaining the fail-closed guarantee. For larger fund events involving thousands of investors, operators process sequential batches through the API.

---

## Distribution and Dividend Mechanics

### Income and Capital Distributions

Fund distributions represent one of the most operationally demanding aspects of fund management: calculating each investor's entitlement, deducting fees and expenses, scheduling the payment, and executing it across potentially thousands of holders. DALP addresses this through two complementary mechanisms that serve different distribution models.

**Yield Schedule Addon.** The Yield Schedule system automates the distribution of returns to token holders. It captures a snapshot of balances at a defined record date, calculates pro-rata entitlements based on each holder's proportional ownership, and executes distribution in a designated payment token. The schedule supports three cadence models: one-time distributions for event-driven payouts like capital returns, recurring distributions on fixed intervals for regular income payments, and custom schedules for funds with irregular distribution timing. The distribution can be denominated in the fund's own token or in a separate payment token such as a stablecoin, accommodating both reinvestment and cash distribution models.

**Fixed Treasury Yield Feature.** For funds with a defined yield rate, the Fixed Treasury Yield token feature provides a pull-based claiming mechanism. The issuer funds a treasury, and holders claim their accrued yield at configured intervals. The system uses Historical Balance snapshots to determine each holder's proportional share at each accrual period. This model avoids the gas cost challenges of iterating over thousands of holders by shifting the claiming action to investors, while ensuring that unclaimed yield remains available until collected.

### Distribution Calculation Boundaries

DALP executes distributions once entitlement amounts are determined, but the actual calculation of what each investor receives, particularly in complex waterfall structures, sits outside the platform's native scope. Fund distribution waterfalls involving preferred return hurdles, general partner carried interest, catch-up provisions, and clawback calculations are fund-specific accounting logic. The fund administrator or a dedicated waterfall calculation engine determines the net distribution per investor, and DALP executes the resulting payments through its distribution infrastructure.

This boundary exists for good reason. Waterfall calculations involve legal interpretation of partnership agreements, accounting judgments about realized versus unrealized gains, and multi-period tracking of preferred return accruals. Embedding that logic in a tokenization platform would create a parallel accounting system that could diverge from the fund administrator's authoritative calculations. DALP provides the execution and audit layer; the calculation layer remains with the professionals who own that domain.

### Fee Collection

DALP's token feature system includes several fee mechanisms relevant to fund operations. The AUM Fee feature calculates and collects management fees based on assets under management, applying a configured rate to the fund's NAV or total supply at regular intervals. Transaction fees can be configured to collect charges on secondary transfers, generating revenue for the fund operator on every peer-to-peer trade. External transaction fees route fee collection to a separate address, useful when the fee collector is a different entity from the token issuer.

Fee features execute through the token's hook system, collecting fees automatically as part of the transfer, mint, or burn lifecycle. This means fee collection is atomic with the underlying operation: if a transfer completes, the fee is collected; if the transfer reverts, no fee is charged. There is no scenario where fees are collected on a failed operation or where an operation succeeds without the configured fee being applied.

---

## Transfer Restrictions and Secondary Market Controls

### Lock-up Period Enforcement

Private fund structures routinely impose lock-up periods during which investors cannot transfer their units. DALP enforces these restrictions through the TimeLock compliance module, which tracks holding periods at the individual investor level using FIFO (first-in, first-out) batch accounting.

When an investor receives fund units, the TimeLock module records the acquisition timestamp for that batch. Subsequent transfer attempts check whether the oldest held units have cleared the configured lock-up duration. If the holding period has not elapsed, the transfer reverts at the smart contract level. This enforcement is absolute: no application-layer workaround can bypass the on-chain restriction. The module supports exemption expressions for qualified investor classes who may be excluded from lock-up requirements under specific regulatory frameworks.

### Qualified Purchaser Verification

Compliance modules for identity verification require that every fund unit holder possesses specific claims from trusted issuers. For a fund restricted to accredited or qualified investors, the compliance configuration demands an accreditation claim topic that must be present and unexpired on the investor's OnchainID. The RPN expression engine allows complex eligibility rules: a fund might require both KYC completion AND accredited investor status, or KYC completion AND either accredited investor OR qualified institutional buyer status. These expressions are configured at deployment time and can be updated through governed administrative operations without redeploying the token contract.

### Right of First Refusal and GP Consent

Many fund agreements grant existing investors or the general partner a right of first refusal (ROFR) on secondary transfers, and require general partner consent before any LP interest changes hands. DALP supports these requirements through the Transfer Approval compliance module, which requires explicit approval before any transfer executes.

When an investor initiates a secondary transfer, the compliance engine blocks execution pending approval. The fund operator (acting as GP or their delegate) reviews the transfer, evaluates whether ROFR has been offered and declined by existing investors, and grants or denies approval through the platform's API or UI. Approvals carry a configurable expiry window, ensuring that stale approvals from months-old transfer attempts do not execute unexpectedly. The one-time-use flag on approvals ensures that each approved transfer can execute exactly once.

The ROFR notification and exercise process itself, informing existing investors of the proposed transfer, collecting their responses within the contractual exercise window, and applying the ROFR priority, is an operational workflow that sits outside DALP's native feature set. DALP provides the enforcement gate (blocking the transfer until approved) and the audit trail (recording who approved, when, and the transfer details), while the communication and decision workflow operates through the fund's existing investor relations processes.

### Investor Count Limits

Certain fund structures impose caps on the number of investors, often driven by regulatory thresholds. Under Regulation D in the United States, for example, funds may limit holders to maintain exemptions from public offering registration requirements. DALP's Investor Count compliance module enforces these limits at the smart contract level, with support for both a global holder cap and per-country sub-limits. Every transfer that would bring the holder count above the configured threshold is rejected before execution.

---

## Fund Administrator Integration

### The Integration Model

Fund administration is a specialized function that includes NAV calculation, investor registry maintenance, regulatory filing preparation, capital call management, and distribution computation. These responsibilities belong to professional fund administrators, and DALP's architecture reflects that division of labor.

DALP exposes an extensive API surface that fund administrators can consume for data synchronization. The API provides read access to the on-chain investor registry (current holders, balances, transaction history), token lifecycle events (mints, burns, transfers, distributions), and compliance status (identity claims, module evaluations). Write operations allow administrators to publish NAV updates through the feed system, trigger distributions through the yield schedule, and update compliance parameters as investor circumstances change.

The integration is bidirectional. DALP provides the on-chain source of truth for token ownership and transaction history, while the fund administrator provides the authoritative NAV, accounting data, and regulatory filing content. The two systems synchronize through the API, with each maintaining authority over its respective domain.

### Reporting and Audit Capabilities

DALP's analytics infrastructure provides over 18 specialized database views that deliver structured data for fund reporting. These views cover token balances, transaction history, compliance events, identity claims, fee collection, and distribution records. Fund administrators can query these views through standard database connectivity, feeding DALP data directly into their reporting engines without custom extraction logic.

For investor statements, the platform provides the underlying data: holdings at any point in time (through Historical Balance snapshots), distribution history, transaction records, and current NAV. The formatting and delivery of investor statements, quarterly letters, and annual reports is the fund administrator's responsibility, using DALP data as the source.

Regulatory filing data, including investor registers, transaction reports, and compliance attestations, is accessible through the same analytics views. DALP does not generate jurisdiction-specific regulatory filing documents (such as AIFMD Annex IV reports or SEC Form D amendments), but it provides the structured data that these filings require. The fund administrator or compliance team formats and submits the filings using their standard regulatory reporting tools.

### System Connectivity Considerations

DALP provides RESTful API endpoints and supports webhook notifications for event-driven integration. Pre-built connectors to specific fund administration platforms, portfolio management systems, or CRM tools are not shipped as product features. Each integration is built through the API based on the counterparty system's data exchange capabilities.

For institutions that require real-time event notification, DALP supports server-sent events (SSE) streaming, allowing fund administrators to receive transaction and lifecycle events as they occur rather than polling for changes. This is particularly valuable during high-activity periods such as subscription closings, distribution dates, or capital call deadlines.

---

## Fund Lifecycle: From Launch to Liquidation

### Fund Token Configuration

Setting up a fund token in DALP begins in the Asset Designer, where the operator selects the Fund asset type and configures the instrument's parameters. The configuration process involves selecting token features (AUM fees, historical balances, yield capabilities, voting power if governance rights are required), binding compliance modules (identity verification, country restrictions, investor count limits, lock-up periods, transfer approval), and setting initial parameters (supply cap, denomination currency, fee rates).

The Fund asset type deploys through the Asset Factory as a DALPAsset token with fund-specific validation rules. Once deployed, the token starts in a paused state. The compliance team verifies the configuration, the operations team sets up distribution schedules and fee parameters, and the fund is unpaused to begin accepting subscriptions.

### Ongoing Fund Operations

Day-to-day fund operations flow through DALP's operational surface. The Supply Management role processes subscriptions (minting), redemptions (burning), and secondary transfers. The Governance role manages compliance parameter updates, such as adjusting investor count limits or modifying country restrictions as the fund's regulatory footprint evolves. The Custodian role handles exceptional situations: freezing assets under investigation, executing forced transfers for regulatory compliance, and managing wallet recovery.

Distribution events follow a structured workflow. The fund administrator calculates entitlements, the operator configures the distribution in DALP's yield schedule, and the system executes payments to all eligible holders based on their balance at the snapshot date. Each distribution is recorded on-chain, providing the immutable record that audit and regulatory processes require.

### Fund Liquidation and Wind-down

When a fund reaches its termination date or the general partner initiates wind-down, DALP supports the orderly retirement of fund units. The operator processes final distributions through the yield schedule or direct transfer, then burns remaining units to retire the token supply. The platform's pause mechanism can freeze all operations during the wind-down period, ensuring no unauthorized transfers occur while final distributions are being processed.

For funds using the Maturity Redemption feature, the process is more structured. After the configured maturity date, all transfers are blocked automatically. Holders redeem their units for the denomination asset at the configured face value through an atomic burn-and-pay mechanism. The treasury must be funded with sufficient denomination assets before redemptions begin.

---

## Capability Boundaries and Honest Assessment

DALP provides substantial coverage for the operational mechanics of tokenized fund units, but several aspects of fund management sit outside the platform's native feature set. Transparency about these boundaries is essential for institutions evaluating the platform.

**What DALP handles natively:** Token issuance and retirement, compliance-checked transfers with lock-up enforcement, identity verification and qualified investor gating, distribution execution through yield schedules, AUM and transaction fee collection, on-chain audit trails, historical balance tracking, batch operations for large investor bases, and XvP settlement for fund unit exchanges.

**What requires integration or operational processes:** NAV calculation (fund administrator domain), waterfall distribution calculations (fund-specific accounting logic), gate provision queue management (operational workflow), ROFR notification and exercise processes (investor relations workflow), regulatory filing document generation (compliance team tooling), and investor statement formatting and delivery (fund administrator reporting).

**What requires custom development:** Governance voting systems with quorum enforcement and proposal management (ERC-5805 voting power infrastructure exists at the contract level, but no governance product with proposal creation, vote tallying, or quorum tracking is shipped), and capital call automation with contractual notice period enforcement.

This division reflects DALP's architectural philosophy: own the on-chain compliance and lifecycle mechanics, integrate with specialists for domain-specific calculations, and be transparent about where the platform's responsibility ends and the institution's operational processes begin.
