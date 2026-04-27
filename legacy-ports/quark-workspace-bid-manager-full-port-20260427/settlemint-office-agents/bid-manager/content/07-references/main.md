# Reference Projects

## Overview

SettleMint has delivered digital asset infrastructure across 14 engagements spanning banking, sovereign institutions, capital market infrastructure, insurance, and real estate. These projects cover bond tokenization, equity tokenization, real estate fractionalization, FX settlement, CBDC infrastructure, stablecoin issuance, trade finance, and exchange-traded products. The table below summarizes the full portfolio; detailed case studies for the most broadly applicable references follow.

The portfolio is not only broad, it is current. Recent references show DALP moving from proofs of concept into production-oriented programs across multiple regions: Saudi RER processing live transactions from January 2026, Maybank's Project Photon advancing cross-border FX settlement in 2025-2026, and ADI-Finstreet demonstrating institutional equity issuance on ADI mainnet in 2025. That matters in bids because evaluators increasingly ask whether tokenization platforms are still stuck in lab environments. SettleMint can point to live or late-stage institutional programs across sovereign, banking, and market-infrastructure contexts, not just early innovation pilots.

A second pattern now matters just as much: institutional buyers want evidence that tokenization can coexist with incumbent market infrastructure instead of requiring a wholesale replacement program. The reference set gives proposal writers that proof across several 2025-2026 programs. Commerzbank shows hybrid issuance and settlement linked to Boerse Stuttgart, Maybank shows cross-border FX settlement anchored in banking workflows, Mizuho shows standard platform capabilities being evaluated for production planning, and Saudi RER shows DALP operating as infrastructure underneath a multi-party ecosystem. Together, these references let SettleMint answer the current buyer question directly: DALP is not only for innovation labs, it is designed to integrate into regulated operating environments.

A third pattern has become more visible in 2025-2026 procurement cycles: evaluators increasingly want proof that the same platform can support different institutional operating models, not just different asset classes. The reference set now supports that argument clearly. Sony Bank covers compliant digital cash and identity-linked issuance, Maybank covers programmable FX settlement between banking counterparties, Commerzbank covers hybrid listed-product infrastructure, and Saudi RER covers registry-led asset digitization under government supervision. For proposal writers, that matters because it reframes DALP from a single-use-case tokenization tool into lifecycle infrastructure that can serve issuance, settlement, servicing, and registry-style operating environments within one platform model.

## Summary of All Reference Projects

| # | Client | Region | Asset Class | Year | Scope |
|---|--------|--------|-------------|------|-------|
| 1 | OCBC Bank | Southeast Asia (Singapore) | Securities, bonds, SPVs, real estate tokens | 2023-2024 | Security token engine for securitization, tokenization, and fractionalization of off-chain assets targeting HNWIs |
| 2 | KBC Securities (Bolero Crowdfunding) | Europe (Belgium) | Equity, SME loans | 2022-2023 | Smart contract backend for crowdfunding issuance, lifecycle, corporate actions, and redemption with fiat-backed stable token |
| 3 | KBC Insurance | Europe (Belgium) | Insurance-linked NFTs | 2022-2023 | NFT-based digital product passports for insured asset valuation and claims processing |
| 4 | Standard Chartered Bank | Asia, Africa, Middle East | Securities (shares, bonds, currencies) | 2023-2024 | Digital Virtual Exchange with fractional tokenization, instant settlement, and elimination of custody intermediaries |
| 5 | Reserve Bank of India -- Innovation Hub | South Asia (India) | Trade finance (letters of credit) | 2023-2024 | Multi-bank, multi-node, multi-cloud blockchain for fraud-proof trade finance workflows |
| 6 | Sony Bank (Sony Group) | East Asia (Japan) | Stablecoins, digital identity | 2024 | Stablecoin issuance and management with integrated KYC-enabled digital identity; custom ERC standard |
| 7 | State Bank of India | South Asia (India) | CBDC (e-Rupee) | 2024-present | CBDC infrastructure for secure, scalable digital currency; pilot completed, production deployment underway |
| 8 | Islamic Development Bank -- Subsidy Distribution | Multi-region (57 countries) | Subsidy tokens | 2023-2024 | Sharia-compliant blockchain-based subsidy distribution; peer-to-peer fund delivery for 1.7 billion people |
| 9 | Mizuho Bank | East Asia (Japan, Singapore) | Bonds, trade finance | 2025 | Bond tokenization PoC with emphasis on standard platform capabilities; production planning stage |
| 10 | Islamic Development Bank -- Market Stabilization | Multi-region | Collateral assets (Islamic finance) | 2023-2024 | Automated market stabilization using algorithms, predictive modelling, and smart contracts; 30-50% volatility reduction |
| 11 | Maybank (Project Photon) | Southeast Asia (Malaysia) | FX tokens (MYRT) | 2025-2026 | FX tokenization and cross-border settlement via Exchange-versus-Payment (XvP); atomic cross-currency swaps |
| 12 | ADI -- Finstreet | Middle East (Abu Dhabi) | Equity tokens | 2025 | Tokenized equity issuance on ADI mainnet with corporate actions, on-chain voting, institutional custody integration |
| 13 | Commerzbank | Europe (Germany) | Exchange-traded products (ETPs) | 2024-2025 | Hybrid on/off-chain ETP issuance; Boerse Stuttgart listing; settlement under 10 seconds; projected savings of EUR 7M/year |
| 14 | Saudi Arabia RER (Real Estate Registry) | Middle East (Saudi Arabia) | Real estate | 2024-present | Country-scale blockchain for real estate registration, fractionalization, and digital marketplace under REGA/Vision 2030 |

---

## Detailed Case Studies

The following five references represent the broadest range of capabilities and are most frequently relevant across different bid contexts.

### Case Study 1: Saudi Arabia RER -- Country-Scale Real Estate Tokenization

**Client context and challenge.** The Real Estate General Authority (REGA) of the Kingdom of Saudi Arabia set out to build a national-scale blockchain infrastructure for property registration, fractionalization, and a regulated digital marketplace. The initiative sits at the center of Vision 2030's digital transformation agenda. Saudi Arabia's property market required a system where the blockchain ledger functions as the conclusive record of property rights -- a "registry-as-truth" model. The challenge combined technical complexity (integration with national identity via Yakeen, payment rails via Sadad, escrow systems, and the existing core registry) with institutional complexity (multiple PropTechs, banks, and government agencies operating against a single ledger). No country had attempted this at national scale before.

**Solution architecture with DALP.** SettleMint serves as the delivery partner for the end-to-end solution. DALP powers the blockchain and tokenization layer, handling asset contract deployment, compliance enforcement, and lifecycle management for tokenized property. The architecture exposes a unified RER API Gateway that PropTechs, banks, and developers consume. Marketplace services handle listing, due diligence, identity verification, fee payment, and escrow. Orchestration and integration modules connect DALP to RER's core registry, billing system, escrow engine, case worker tooling, and government systems. Four PropTechs (Sahl, Madek, Ghanem, Jozo) are live in production, processing real transactions as of January 2026. Infrastructure includes tested backup and restore procedures for production continuity.

**Key outcomes and metrics.** First country in the world to deploy a national-scale property blockchain. Live production transactions since January 2026. Fractional ownership of commercial real estate operational. Smart contracts automate ownership transfers and tax compliance. REGA is launching a second edition of the tokenization program with applications open until April 2026 [TO VERIFY]. The project has been presented at the Cityscape exhibition (November 2025) and the Real Estate Future Forum (January 2026).

**Relevance across bid types.** This reference is directly relevant for real estate tokenization bids, sovereign/government digital transformation projects, and any engagement requiring integration with national identity and payment infrastructure. It demonstrates DALP's ability to operate at country scale, work within a regulated government framework, and support multiple third-party participants through a single API gateway. For bank-oriented bids, the PropTech integration model shows how financial institutions can plug into DALP-powered infrastructure.

---

### Case Study 2: Standard Chartered Bank -- Digital Virtual Exchange

**Client context and challenge.** Standard Chartered Bank sought to improve trading efficiency for institutional investors across high-growth regions in Asia, Africa, and the Middle East. The existing settlement process involved multiple custody intermediaries, created counterparty risk, and resulted in settlement delays that impacted liquidity. The bank needed a solution that could handle fractional tokenization of securities (shares, bonds, and currencies) while recording ownership changes instantly and immutably.

**Solution architecture with DALP.** SettleMint collaborated with Standard Chartered to build a blockchain-based Digital Virtual Exchange. The platform uses DALP's asset contract framework to tokenize securities and enable fractional ownership. Ownership transfers are recorded on-chain, eliminating the need for separate custody intermediaries and producing an immutable audit trail. The architecture supports institutional-grade access controls, compliance enforcement, and integration with Standard Chartered's existing systems across multiple jurisdictions.

**Key outcomes and metrics.** Settlement times reduced from days to near-instant finality [TO VERIFY]. Custody intermediary costs eliminated for on-chain transactions. Greater transparency for institutional investors through immutable ownership records. Improved liquidity through fractional tokenization, lowering minimum investment thresholds for previously illiquid instruments [TO VERIFY].

**Relevance across bid types.** This is the strongest reference for bank-oriented bids involving securities tokenization and trading infrastructure. It demonstrates multi-asset support (shares, bonds, currencies), institutional-grade compliance, and multi-region deployment. For CSD bids, the elimination of custody intermediaries and instant settlement recording are directly applicable. For fund manager bids, the fractional tokenization model shows how DALP enables broader investor access to institutional products.

---

### Case Study 3: State Bank of India -- CBDC Infrastructure

**Client context and challenge.** The State Bank of India (SBI), India's largest bank, required infrastructure to support the e-Rupee (eR), India's central bank digital currency. The challenge was building a secure, scalable system capable of handling projections of over one billion daily digital transactions [TO VERIFY] while expanding financial access to underserved populations. The infrastructure needed to support both domestic retail payments and cross-border settlement use cases.

**Solution architecture with DALP.** SettleMint provides the CBDC infrastructure layer, with DALP managing token issuance, distribution, and lifecycle operations. The architecture is designed for the transaction volumes and security requirements of a national digital currency. The platform supports integration with existing banking infrastructure and payment rails, enabling a transition path from traditional settlement to blockchain-based settlement without requiring wholesale replacement of existing systems.

**Key outcomes and metrics.** Pilot phase completed successfully. Production deployment is underway [TO VERIFY]. The system targets reduced reliance on physical cash, minimized fraud risks through on-chain transparency, faster and more cost-effective transactions, expanded financial access for underserved populations, and cheaper cross-border payments. SBI's eR is positioned as a bridge from Web2 wallets to Web3 wallets at national scale.

**Relevance across bid types.** This is the primary reference for sovereign bids involving CBDC or digital currency infrastructure. It demonstrates DALP's capacity for national-scale transaction volumes and integration with incumbent banking systems. For bank bids, the SBI relationship validates credibility with large financial institutions. For stablecoin bids, the underlying token issuance and management architecture overlaps significantly with stablecoin use cases, differing mainly in the issuing authority.

---

### Case Study 4: Commerzbank -- Hybrid ETP Issuance

**Client context and challenge.** Commerzbank, one of Germany's largest banks, needed to modernize its exchange-traded product (ETP) issuance process. The existing workflow involved manual coordination between the bank's issuance engine and Boerse Stuttgart's listing service, creating delays, counterparty risk, and operational cost. The bank sought a hybrid on-chain/off-chain model that could integrate with established exchange infrastructure while delivering the settlement speed advantages of blockchain.

**Solution architecture with DALP.** SettleMint implemented a hybrid solution where DALP manages on-chain issuance and settlement while maintaining integration with Boerse Stuttgart's off-chain listing service and Commerzbank's existing issuance engine. Trades are cleared and settled in near real time on-chain. The architecture preserves the regulatory and operational interfaces that institutional participants expect while moving the settlement layer to blockchain for speed and transparency.

**Key outcomes and metrics.** Settlement time reduced to under 10 seconds. Counterparty risk reduced through near-instant finality. Listing inefficiencies cut by automating the issuance-to-listing workflow. The model identified potential annual savings of EUR 7 million [TO VERIFY]. The solution demonstrates that blockchain settlement can coexist with established exchange infrastructure rather than requiring wholesale replacement.

**Relevance across bid types.** This is the strongest reference for European bank bids and any engagement involving capital markets infrastructure. It directly addresses the hybrid on-chain/off-chain concern that most regulated institutions have. For CSD bids, the Boerse Stuttgart integration shows how DALP works alongside existing exchange and clearing infrastructure. For fund manager bids, the ETP use case demonstrates how tokenized products can be listed and traded on regulated venues.

---

### Case Study 5: Islamic Development Bank -- Subsidy Distribution and Market Stabilization

**Client context and challenge.** The Islamic Development Bank (IsDB) faced two distinct challenges across its 57 member countries. First, subsidy distribution relied on inefficient analogue processes with limited transparency, making it difficult to ensure funds reached intended recipients. Second, assets used as collateral for sharia-compliant lending experienced excessive volatility, undermining confidence in Islamic finance products. Both challenges required solutions that fully comply with sharia principles.

**Solution architecture with DALP.** For subsidy distribution, SettleMint built a blockchain-based system that digitizes the entire delivery chain and enables direct peer-to-peer distribution of funds. Administrative and legal processes are automated through smart contracts. For market stabilization, DALP powers an automated system using advanced algorithms, predictive modelling, and smart contracts to regulate collateral asset volatility without human intervention. Both solutions operate within a sharia-compliant framework, with DALP's configurable compliance modules enforcing the relevant rules at the contract level.

**Key outcomes and metrics.** Subsidy distribution: improved financial inclusion for 1.7 billion people across 57 member countries; greater efficiency through elimination of redundancies; full control and visibility over subsidy spending. Market stabilization: reduced market volatility by 30-50% [TO VERIFY]; greater stability and reliability for Islamic finance products; strengthened trust in sharia-compliant lending mechanisms.

**Relevance across bid types.** This dual reference is uniquely valuable for sovereign bids, particularly those involving government-to-citizen payment distribution or financial inclusion mandates. For bank bids in Islamic finance jurisdictions, the sharia-compliance framework demonstrates DALP's configurability for specific regulatory regimes. The market stabilization component is relevant for any bid involving automated risk management or collateral management. The multi-country scope (57 nations) also makes this reference compelling for international organizations and development banks evaluating infrastructure for cross-border deployments.

---

## Reference Selection Guide

The table below maps common bid types to the most relevant references. Select 3-5 references from the recommended list based on the specific prospect's geography, asset class, and use case.

| Bid Type | Primary References | Why These References |
|----------|-------------------|---------------------|
| **Bank (commercial/retail)** | Standard Chartered Bank, Commerzbank, OCBC Bank, Maybank, State Bank of India | Covers securities tokenization, ETP issuance, security token engines, FX settlement, and CBDC. Spans Asia, Europe, and Middle East. |
| **Sovereign / Government** | Saudi RER, State Bank of India, IsDB (both projects), Reserve Bank of India | National-scale deployments, CBDC, government-to-citizen distribution, and integration with national identity and payment systems. |
| **CSD / Market Infrastructure** | Commerzbank, Standard Chartered Bank, ADI-Finstreet, Mizuho Bank | Exchange integration (Boerse Stuttgart), custody elimination, regulated equity on dedicated networks, and bond tokenization with standard platform capabilities. |
| **Fund Manager / Asset Manager** | OCBC Bank, Standard Chartered Bank, KBC Securities, Commerzbank | Security token engine for HNWIs, fractional tokenization, crowdfunding/loan issuance lifecycle, and ETP listing on regulated venues. |
| **Real Estate** | Saudi RER, OCBC Bank, KBC Securities | Country-scale property registration and fractionalization, off-chain asset tokenization, and SPV-based real estate tokens. |
| **Stablecoin / Digital Currency** | Sony Bank, State Bank of India, Maybank, KBC Securities | Stablecoin issuance with integrated digital identity, CBDC infrastructure, FX tokenization (MYRT), and fiat-backed stable token for on-chain transactions. |
| **Islamic Finance** | IsDB (Subsidy Distribution), IsDB (Market Stabilization), Saudi RER | Sharia-compliant subsidy delivery, automated market stabilization for collateral, and Saudi government partnership under Vision 2030. |
| **Trade Finance** | Reserve Bank of India, Mizuho Bank, Maybank | Multi-bank letter of credit infrastructure, bond tokenization with trade finance overlay, and cross-border XvP settlement. |

---

## Usage Notes for Proposal Writers

1. **Always include the full summary table** (all 14 references) in every proposal to demonstrate breadth of experience.
2. **Expand 2-3 references** into detailed paragraphs based on the prospect's profile. Use the Reference Selection Guide to pick the most relevant ones.
3. **Confidentiality matters.** Saudi RER is publicly announced. Most other references can be named but should not include metrics or details beyond what appears in this document without client approval.
4. **Use [TO VERIFY] markers** for any metric you want to include that is not confirmed in this document. Verify with the delivery team before finalizing the proposal.
5. **Tailor the narrative.** When expanding a case study for a specific bid, emphasize the aspects most relevant to the prospect. A bank prospect cares about integration with existing systems; a sovereign prospect cares about national scale and regulatory alignment; a CSD cares about exchange infrastructure integration.
