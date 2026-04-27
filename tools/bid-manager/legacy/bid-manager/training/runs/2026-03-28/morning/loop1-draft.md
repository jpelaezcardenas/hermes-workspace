# Structured Products on DALP

# Asset Class Deep-Dive: Structured Products

Structured products represent one of the most operationally demanding asset classes in capital markets. A single securitization involves multiple tranches with distinct risk profiles, payment priority waterfalls that must execute in strict sequential order, collateral pools that require continuous monitoring, and trigger mechanisms that can redirect cash flows or accelerate maturity based on portfolio performance metrics. Most tokenization platforms either cannot model this complexity at all, or require months of custom smart contract engineering for each deal. DALP addresses structured products through its composable token architecture, where each tranche is a separately configured DALPAsset with its own compliance posture, and the inter-tranche relationships are managed through a combination of token features, compliance modules, and operational add-ons.

---

## Multi-Tranche Token Architecture

### Tranche Representation

In a traditional securitization, the capital structure is divided into tranches with different seniority levels, each carrying distinct risk and return characteristics. DALP represents each tranche as an independent DALPAsset token contract, deployed through the Asset Factory with tranche-specific configuration. This design is deliberate: treating tranches as separate tokens rather than partitions within a single contract provides the isolation that structured finance requires.

A typical three-tranche structure might include a senior tranche (rated AAA/AA, lowest yield, first claim on cash flows), a mezzanine tranche (rated BBB/BB, moderate yield, subordinated to senior), and an equity tranche (unrated, highest yield, absorbs first losses). Each of these deploys as its own DALPAsset with configuration tailored to its position in the capital structure.

| Tranche | DALPAsset Configuration | Key Features | Compliance Modules |
|---------|------------------------|--------------|-------------------|
| Senior (Class A) | Bond preset, capped supply matching senior allocation | Fixed Treasury Yield, Maturity Redemption, Historical Balances | Identity Verification (KYC+AML), Country Allow List, Investor Count, Capped |
| Mezzanine (Class B) | Bond preset, smaller cap, higher yield rate | Fixed Treasury Yield, Maturity Redemption, Historical Balances | Identity Verification (KYC+AML+Professional), Country Allow List, Transfer Approval, Capped |
| Equity (Class C) | Fund preset with AUM Fee, no maturity redemption | AUM Fee, Historical Balances, Voting Power | Identity Verification (Accredited), Identity Allow List, TimeLock (24-month lock-up), Capped |

This separation provides three critical properties. First, each tranche has its own compliance posture. A senior tranche available to institutional investors across the EU operates under different transfer restrictions than an equity tranche limited to accredited investors with a two-year lock-up. Second, each tranche has independent supply management. The senior tranche supply is capped at the senior allocation without any possibility of the mezzanine or equity issuance interfering with that cap. Third, each tranche maintains its own audit trail, investor registry, and corporate action history, simplifying regulatory reporting and investor communication.

### Inter-Tranche Relationships

The relationship between tranches is where structured products become genuinely complex. In a cash flow waterfall, senior tranches receive payment first, mezzanine tranches receive payment only after senior obligations are met, and equity tranches absorb residual cash flows (or losses). DALP does not ship a native "waterfall engine" that automatically orchestrates multi-tranche payment priority. This is an honest capability boundary that matters.

What DALP provides is the infrastructure to execute waterfall distributions once the payment amounts are determined:

**Fixed Yield Schedules per tranche.** Each tranche's Fixed Treasury Yield feature is configured with its own yield rate, payment interval, and treasury address. The senior tranche might pay 4.5% annually on a quarterly basis from a dedicated senior treasury. The mezzanine tranche pays 7.0% from a mezzanine treasury. The equity tranche receives residual distributions through its AUM fee mechanism or direct minting operations.

**Treasury coordination.** The waterfall calculation itself, determining how much flows to each tranche's treasury based on collateral pool performance, is an off-chain computation. DALP provides the execution layer: once the servicer or calculation agent determines that EUR 2.3M is due to the senior treasury, EUR 1.1M to the mezzanine treasury, and EUR 0.4M to the equity treasury, those amounts are funded into the respective treasuries, and holders claim their pro-rata entitlements through the pull-based distribution mechanism.

**Historical Balances for record dates.** Each tranche's Historical Balances feature provides the point-in-time ownership snapshots needed to calculate individual holder entitlements on each payment date. Because the feature creates checkpoints on every transfer, mint, and burn operation, the record-date balance is always deterministic and auditable.

This architecture means DALP handles the tranche-level token mechanics, compliance enforcement, and distribution execution natively. The waterfall priority logic, which involves reading collateral pool performance data, applying coverage tests, and determining tranche-level allocations, sits in the servicer's operational workflow and feeds results into DALP's treasury and distribution infrastructure. This is the correct architectural boundary for a platform product, because waterfall logic is deal-specific and varies significantly between CLOs, RMBS, CMBS, ABS, and bespoke securitizations.

---

## Waterfall Distribution Mechanics

### Payment Priority Logic

A structured product waterfall defines the order in which available cash flows are distributed to different claim holders. The typical priority, from highest to lowest, is: trustee and servicer fees, senior tranche interest, senior tranche principal (if amortizing), mezzanine tranche interest, mezzanine tranche principal, and finally equity residual distributions.

DALP supports this through a sequenced operational workflow rather than a single automated smart contract:

**Step 1: Collateral pool cash flow determination.** The servicer calculates total available distributable amount from the collateral pool's cash inflows (principal and interest payments from underlying assets, recovery proceeds, prepayment receipts) minus operating expenses (trustee fees, servicer fees, legal costs).

**Step 2: Coverage test evaluation.** Before distributions proceed, the servicer evaluates overcollateralization (OC) tests and interest coverage (IC) tests. These tests compare the collateral pool's current value or income against the outstanding liabilities of each tranche. If a coverage test fails, the waterfall may redirect cash flows. For example, if the senior OC ratio falls below 120%, mezzanine interest payments may be diverted to accelerate senior principal repayment.

**Step 3: Tranche-level allocation.** Based on the waterfall rules and coverage test results, the servicer determines the exact amount due to each tranche's treasury for the current distribution period.

**Step 4: Treasury funding.** The servicer funds each tranche's treasury with the allocated amount, using DALP's standard ERC-20 transfer mechanisms. Because the treasury can be the DALPAsset contract itself (using the asset-as-treasury capability) or a separate vault, the funding operation is a straightforward token transfer subject to all configured compliance rules.

**Step 5: Holder claims.** Individual tranche holders claim their pro-rata distribution through the Fixed Treasury Yield feature's pull-based mechanism. The yield calculation uses Historical Balance snapshots from the relevant record date to determine each holder's proportional entitlement.

This five-step process preserves the deal's payment priority while using DALP's native token infrastructure for the actual distribution execution. The waterfall logic remains with the servicer, where it belongs, because that logic varies by deal type, jurisdiction, and investor documentation. DALP's role is to provide the deterministic, compliant, and auditable execution layer.

### Overcollateralization and Interest Coverage Tests

OC and IC tests are the structural safeguards that protect senior tranches from losses in the underlying collateral pool. These tests are calculated off-chain by the servicer or calculation agent, but the results drive on-chain actions within DALP:

**OC Test.** The overcollateralization ratio compares the aggregate principal balance of the collateral pool to the outstanding principal of the relevant tranche (and all tranches senior to it). A senior OC test of 120% means the collateral pool must be worth at least 120% of the senior tranche's outstanding principal. If this test fails, the waterfall diverts cash flows from subordinated tranches toward senior principal reduction.

**IC Test.** The interest coverage ratio compares the collateral pool's interest income to the interest obligations of the relevant tranche and all senior tranches. An IC test of 1.5x means the pool must generate at least 1.5 times the interest due on the senior tranche. If this test fails, excess spread that would normally flow to equity is redirected to cover senior interest shortfalls.

DALP's Data Feeds add-on can receive the results of these calculations from the servicer's systems. The feed publishes the current OC and IC ratios on-chain, creating an auditable record of each test result. While DALP does not automatically redirect cash flows based on these ratios (that remains the servicer's operational responsibility), the on-chain record provides the transparency that rating agencies, investors, and regulators require.

### Trigger Events

Structured products include trigger mechanisms that change the payment waterfall when certain conditions are met. Common triggers include:

**Delinquency triggers.** If the percentage of delinquent assets in the collateral pool exceeds a defined threshold (e.g., 60+ day delinquencies exceed 3% of pool balance), the deal may enter early amortization, redirecting all cash flows to senior principal repayment.

**Cumulative loss triggers.** If cumulative realized losses exceed a predefined threshold (e.g., 5% of original pool balance), the equity tranche may be written down and mezzanine protections activated.

**Rating downgrade triggers.** If a credit rating agency downgrades the deal or the originator below a specified level, acceleration provisions may apply.

DALP handles trigger events through a combination of compliance module reconfiguration and operational workflows:

**Pause mechanism for emergency triggers.** If a severe trigger fires (such as an originator default), the Emergency role can pause individual tranche tokens, halting all transfers until the trustee determines the appropriate course of action. This circuit-breaker capability is native to every DALPAsset and requires no custom development.

**Compliance module adjustment for structural triggers.** If a trigger changes the deal's transfer restrictions (for example, converting an amortizing deal to a locked-out structure), the Governance role can add TimeLock modules or modify existing Transfer Approval requirements without redeploying the tranche tokens. This runtime configurability is where DALP's composable compliance architecture provides direct value for structured products.

**Data Feed publication for transparency.** Trigger status, coverage test results, and pool performance metrics can be published through DALP's Data Feeds add-on, providing on-chain transparency to all tranche holders. This creates an immutable record of when triggers were activated and what actions followed.

---

## Collateral Management

### Collateral Pool Representation

The collateral pool underlying a structured product, whether it consists of residential mortgages, auto loans, trade receivables, or corporate loans, is not directly tokenized on DALP in the same way that the tranches are. The individual collateral assets remain in the servicer's loan management system. What DALP provides is the ability to track the aggregate collateral position and enforce collateral adequacy constraints through the CollateralComplianceModule.

The CollateralComplianceModule, when configured on a tranche token, requires that a valid collateral attestation claim exists on the asset's OnchainID identity before minting can proceed. This means:

**Proof-of-reserve for issuance.** Before additional tranche tokens can be minted (for example, during a revolving period or tap issuance), the compliance module verifies that the collateral pool supports the increased issuance. The collateral claim is issued by a trusted auditor or calculation agent, attesting to the current pool balance and its ratio to outstanding tranche liabilities.

**Collateral ratio enforcement.** The module's configurable ratio parameter (expressed in basis points) defines the minimum overcollateralization required. A ratio of 12,000 bps (120%) means the collateral attestation must show pool value at least 120% of the post-mint total supply. If the ratio is insufficient, the mint reverts on-chain, preventing over-issuance.

**Trusted auditor integration.** The CollateralComplianceModule supports extra trusted issuers beyond the global registry, allowing institutions to designate specific reserve attestation providers. This maps directly to the structured products model where independent verification agents provide pool performance reports and collateral valuations.

### Substitution and Eligibility

In revolving securitizations and managed CLOs, the collateral manager has the ability to substitute assets in the pool, subject to eligibility criteria. An asset may be removed if it is repaid, defaulted, or no longer meets the deal's quality constraints, and a new asset may be added if it satisfies the eligibility requirements (minimum credit rating, maximum single-obligor concentration, geographic diversification limits, industry concentration limits).

DALP does not manage the individual collateral assets or enforce substitution eligibility at the smart contract level. This is an honest boundary. Collateral substitution involves complex, deal-specific rules that reference external data (credit ratings, obligor identities, industry classifications) and require servicer judgment. What DALP provides is:

**Post-substitution attestation.** After the collateral manager substitutes an asset, the verification agent publishes an updated collateral attestation claim reflecting the new pool composition. This updated claim feeds into the CollateralComplianceModule for future issuance checks and into the Data Feed for transparency.

**Audit trail of collateral changes.** Every attestation update is recorded on-chain through the claim lifecycle events. The complete history of collateral attestations, from initial pool closing through each substitution, is available as an immutable audit record that trustees, rating agencies, and regulators can verify.

**Concentration limit monitoring (off-chain, reported on-chain).** While the individual concentration calculations happen in the servicer's systems, the results can be published to DALP's Data Feed add-on, providing on-chain visibility into the pool's compliance with eligibility criteria. This does not enforce concentration limits on-chain, but it creates the transparency layer that institutional investors increasingly demand.

---

## Risk Parameter Monitoring

### Loan-to-Value (LTV) Monitoring

For structured products backed by real assets (RMBS, CMBS), loan-to-value ratios are a critical risk indicator. LTV compares the outstanding loan balance to the current property value, and rising LTVs signal deteriorating collateral quality. DALP's Data Feed add-on can receive periodic LTV reports from the servicer or property valuation provider, publishing aggregate pool LTV metrics on-chain.

The practical value is transparency and auditability. When an institutional investor queries the current state of their structured product investment, the on-chain data feed provides verified pool performance metrics without relying on monthly PDF reports or servicer portals. This matters particularly for secondary market pricing, where prospective buyers need current pool metrics to assess fair value.

### Delinquency Tracking

Delinquency data (30-day, 60-day, 90-day+ buckets, cumulative defaults, recovery rates) follows the same pattern: calculated by the servicer, published through Data Feeds, recorded immutably on-chain. The data feed creates a time-series of pool performance that rating agencies, trustees, and investors can access through DALP's API surface.

### Prepayment Modeling

Prepayment behavior directly affects structured product cash flows and tranche returns. High prepayment rates shorten the weighted average life of senior tranches and can reduce yield for mezzanine investors. Low prepayment rates extend duration and increase reinvestment risk. DALP does not perform prepayment modeling. Prepayment analytics are the domain of specialized quantitative tools and servicer systems. What DALP provides is the ability to publish actual prepayment metrics (CPR, SMM, PSA speed) through the Data Feed, giving investors verified, on-chain data points to inform their own prepayment models.

### Stress Test Triggers

Stress testing evaluates how the structured product performs under adverse scenarios: rising default rates, falling recovery rates, interest rate shifts, or combined stress scenarios. The results of stress tests, conducted by the calculation agent or risk management function, can trigger deal actions (accelerated amortization, tranche write-down, coverage test failure).

DALP's role in stress testing is to provide the execution infrastructure for the resulting actions. If a stress test indicates that the equity tranche should be partially written down, the Supply Management role can burn the appropriate amount of equity tranche tokens, reducing the outstanding principal. If the stress test triggers early amortization, the Governance role can add compliance modules that restrict new issuance and redirect cash flows. The stress test logic itself remains with the risk management function, DALP provides the deterministic, auditable mechanisms to execute the decisions that stress tests produce.

---

## Configuration Example: CLO (Collateralized Loan Obligation)

A fund manager structures a EUR 500M CLO backed by a portfolio of senior secured corporate loans, with a four-year reinvestment period and seven-year legal maturity.

### Capital Structure

| Tranche | Size | Rating | Spread | Features |
|---------|------|--------|--------|----------|
| Class A (Senior) | EUR 320M | AAA | E+130bps | Fixed Treasury Yield, Maturity Redemption, Historical Balances |
| Class B (Mezzanine) | EUR 80M | BBB | E+350bps | Fixed Treasury Yield, Maturity Redemption, Historical Balances, Transfer Approval |
| Class C (Junior Mezz) | EUR 50M | BB | E+550bps | Fixed Treasury Yield, Maturity Redemption, Historical Balances, Transfer Approval, TimeLock |
| Equity | EUR 50M | NR | Residual | AUM Fee, Historical Balances, Voting Power, TimeLock (24-month NC period) |

### Compliance Configuration

**Class A (Senior):**
- Identity Verification: `[KYC, AML, AND]`
- Country Allow List: EU 27 + UK + Switzerland
- Investor Count: Global limit 200
- Capped: 320,000 units (EUR 1,000 denomination)
- Collateral: 125% OC ratio (12,500 bps), trusted issuer = independent verification agent

**Equity:**
- Identity Verification: `[KYC, AML, AND, ACCREDITED, AND]`
- Identity Allow List: Named institutional investors only
- TimeLock: 24-month non-call period with FIFO tracking
- Investor Count: Global limit 25
- Voting Power: Governance over reinvestment period decisions

### Operational Workflow

**Quarterly distribution cycle:**
1. Servicer calculates waterfall: collateral pool income minus expenses, allocated per tranche priority
2. Servicer funds each tranche treasury via standard ERC-20 transfers
3. Coverage tests (OC, IC) published via Data Feed
4. Holders claim distributions through Fixed Treasury Yield pull mechanism
5. If coverage test fails: Governance role adjusts cash flow allocation, potentially adding Transfer Approval requirements to subordinated tranches

**Reinvestment period:**
- Collateral manager substitutes assets subject to eligibility criteria
- Verification agent publishes updated collateral attestation after each substitution
- CollateralComplianceModule enforces minimum OC before any new minting during revolving period

**Maturity:**
- At legal maturity (Year 7), Maturity Redemption feature blocks all tranche token transfers
- Holders redeem at par (senior, mezzanine) or at residual value (equity)
- Redemption is atomic: tranche tokens burned, denomination asset transferred from treasury

---

## What DALP Handles Natively vs. What Requires Integration

Structured products demand clarity about capability boundaries. This section maps which elements of a structured product program DALP handles as native platform capability, and which require external systems or integration work.

| Capability | DALP Native | Integration Required |
|-----------|-------------|---------------------|
| Tranche token issuance and lifecycle | Yes, each tranche as a separate DALPAsset | — |
| Tranche-specific compliance and transfer restrictions | Yes, independent compliance modules per tranche | — |
| Investor eligibility enforcement (KYC, accreditation, jurisdiction) | Yes, via Identity Verification and claim-based modules | KYC/AML provider integration for initial verification |
| Per-tranche yield distribution to holders | Yes, via Fixed Treasury Yield with Historical Balances | — |
| Waterfall priority calculation | No | Servicer/calculation agent system |
| OC/IC coverage test calculation | No | Servicer/calculation agent system |
| Coverage test result publication | Yes, via Data Feeds add-on | Feed from servicer's calculation engine |
| Collateral pool-level attestation | Yes, via CollateralComplianceModule | Verification agent provides attestation claims |
| Individual collateral asset management | No | Servicer's loan management system |
| Substitution eligibility enforcement | No | Collateral manager's systems |
| Trigger event monitoring | Partial: Data Feeds for publication, Pause for circuit-breaking | Servicer monitors triggers, notifies DALP |
| Tranche write-down execution | Yes, via burn operations on affected tranche | Calculation agent determines write-down amount |
| Early amortization execution | Yes, via compliance module reconfiguration | Servicer triggers the mode change |
| Investor reporting (holdings, distributions, NAV) | Yes, via API and read model | Formatting for deal-specific report templates |
| Rating agency data provision | Yes, via structured on-chain data and API exports | Formatting to agency-specific requirements |
| Secondary market transfer compliance | Yes, via Transfer Approval and all configured modules | — |
| Audit trail for trustees and regulators | Yes, complete on-chain event history | — |

This boundary is the honest answer to "can DALP run a structured product?" The answer is yes, for the token-level mechanics, compliance enforcement, distribution execution, and transparency layer. The deal-level computation (waterfall math, coverage tests, collateral analytics) is the domain of servicer and calculation agent systems that feed results into DALP's infrastructure. This separation is architecturally sound: deal logic changes with every transaction, while the token infrastructure remains stable.

---

## Why This Matters for Institutional Adoption

Structured products have historically been among the most difficult asset classes to bring on-chain because they demand more than simple tokenization. They require multi-contract coordination, complex payment priority, continuous collateral monitoring, and the ability to modify deal terms (triggers, compliance adjustments) during the life of the transaction.

DALP's composable architecture addresses the parts of this challenge that belong on a platform: configurable tranche tokens with independent compliance postures, auditable distribution mechanics, collateral attestation enforcement, and runtime reconfigurability for deal lifecycle events. The parts that do not belong on a platform, such as waterfall calculations, credit analytics, and collateral substitution decisions, remain with the specialized systems and human judgment where they belong.

The result is a deployment model where each tranche can be configured and launched in days rather than months, compliance rules adapt to the deal's lifecycle without contract redeployment, and the entire structure maintains the transparency and auditability that regulators, rating agencies, and institutional investors require. This is the difference between a demo that shows "bonds on a blockchain" and a production infrastructure that can support the operational complexity of a real securitization program.
