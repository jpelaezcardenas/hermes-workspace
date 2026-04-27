# Exercise Library

## Mock RFI Scenarios

Thirteen scenario briefs. For each exercise, Bid Manager first generates a realistic RFI document from the brief, then writes a full DALP-based response.

---

### MR-1: Central Bank CBDC Retail Platform

A central bank in an emerging market economy is exploring the issuance of a sovereign digital currency for retail payments. The bank operates within a regulatory sandbox framework and seeks a technology platform capable of minting, distributing, and managing a retail CBDC. Requirements include integration with existing national payment infrastructure, tiered KYC/AML for financial inclusion (unbanked populations), offline payment capability considerations, programmable money features (conditional transfers, expiry), and multi-stakeholder governance involving commercial banks as distribution intermediaries. The RFI should probe scalability to tens of millions of wallets, disaster recovery, and compliance with BIS and IMF digital currency guidelines.

### MR-2: Stock Exchange Post-Trade Modernization

A mid-tier national stock exchange is replacing its legacy central securities depository and clearing infrastructure with a modern post-trade platform. The exchange processes listed equities and seeks T+0 (instant) settlement to reduce counterparty risk and free up collateral. The RFI should cover integration with existing order matching engines, corporate action processing (dividends, rights issues, stock splits), participant onboarding for brokers and custodians, regulatory reporting to the national securities regulator, and migration strategy for existing dematerialized holdings. Uptime requirements are 99.99% with proven failover mechanisms.

### MR-3: Central Securities Depository Digital Twin

A national CSD wants to create a digital twin of its existing instrument registry on a distributed ledger while maintaining the current book-entry system as the legal record. The hybrid model requires real-time synchronization between on-chain and off-chain records, support for all current instrument types (equities, government bonds, corporate bonds, money market instruments), and a phased migration path toward the on-chain record becoming authoritative. The RFI should address reconciliation mechanisms, regulatory acceptance of dual-record systems, participant connectivity (SWIFT/ISO 20022), and the governance model for the shared ledger infrastructure.

### MR-4: Commodity Tokenization

A commodities trading house and a bullion vault operator want to jointly launch gold-backed digital tokens. The platform must support both allocated gold (specific bars assigned to token holders) and unallocated gold (pooled claim), with on-chain representation of warehouse receipts. Requirements include integration with LBMA good delivery standards, real-time NAV feeds from precious metals pricing sources, physical redemption workflows, secondary market trading, and compliance with commodity trading regulations across multiple jurisdictions. The RFI should cover collateral verification, audit trails, and custody integration with existing vault infrastructure.

### MR-5: Real Estate Tokenization

A sovereign wealth fund seeks to tokenize a portfolio of commercial real estate assets (office towers, logistics hubs, retail centers) across three jurisdictions. The platform must support fractional ownership with a REIT-like structure, automated rental yield distribution to token holders, secondary market liquidity, and compliance with local property ownership regulations (including foreign ownership restrictions). The RFI should address property valuation feed integration, tenant management data flows, regulatory frameworks (RERA in UAE, ADGM regulations, and one European jurisdiction), tax withholding automation, and governance rights for token holders (voting on major dispositions).

### MR-6: Private Equity Fund Tokenization

A private equity fund manager wants to digitize LP (limited partner) interests in a growth equity fund. The platform must handle the full fund lifecycle: subscription (capital commitments), capital calls (drawdowns with notice periods), NAV reporting, distribution waterfalls (return of capital, preferred return, carried interest), and secondary transfers of LP interests (with GP consent workflows). The RFI should probe compliance with securities regulations for accredited/qualified investors, transfer restrictions (lock-up periods, ROFR), reporting integration with fund administrators, and audit trail requirements for regulatory examinations.

### MR-7: Islamic Finance Sukuk

A development bank in a GCC country wants to issue Sharia-compliant sukuk (Islamic bond instruments) on a digital platform. The structure must support multiple sukuk types: ijara (lease-based), murabaha (cost-plus financing), and wakala (agency-based). Requirements include profit-sharing distribution mechanics (not interest), asset-backing verification (underlying real assets must be identified and tracked), Sharia board approval workflows, and compliance with AAOIFI standards. The RFI should address periodic distribution calculations, maturity and early dissolution mechanics, secondary market trading with Sharia-compliant transfer rules, and integration with Islamic banking core systems.

### MR-8: Cross-Border Remittance Settlement

A consortium of licensed money transfer operators across a multi-country corridor (e.g., GCC to South Asia) wants to build a shared settlement layer for cross-border remittances. The platform must support multi-currency settlement (at minimum 5 fiat currencies), real-time FX rate integration, pre-funded liquidity pool management, and regulatory compliance across all corridor jurisdictions (AML/CFT, sanctions screening, transaction reporting). The RFI should cover settlement finality guarantees, participant credit risk management, reconciliation with existing banking rails (nostro/vostro replacement), throughput requirements (millions of transactions per month), and integration with national payment switches at both ends of the corridor.

### MR-9: Central Bank CBDC Pilot

**Difficulty: Easy** | **Asset Class: Stablecoin** | **Compliance Modules: Country restrictions, transfer limits, capped supply**

**Issuing Entity:** Bank Sentral Nusantara (BSN) -- the central bank of a Southeast Asian economy with 85 million population. BSN operates a regulatory sandbox for digital payment innovation and has published a three-year Digital Currency Roadmap. The bank wants to pilot a wholesale CBDC among 12 commercial bank participants before evaluating retail expansion.

**Key Requirements:**
1. Issue a sovereign-backed digital currency token pegged 1:1 to the national fiat currency, with minting and burning controlled exclusively by BSN
2. Support a two-tier distribution model where BSN mints to licensed commercial banks, and commercial banks distribute to end users in a future retail phase
3. Enforce programmable transfer limits per participant tier (wholesale banks: unlimited; retail in future phase: daily cap of 5,000 currency units)
4. Provide real-time supply monitoring dashboard showing total minted, burned, and circulating supply across all participants
5. Support conditional transfers with expiry (stimulus payments that must be spent within 90 days or are reclaimed)
6. Integrate with BSN's existing RTGS system via ISO 20022 messaging for interbank settlement reconciliation
7. Deploy on a permissioned network operated by BSN with nodes hosted at three geographically separated national data centers
8. Provide complete audit trail of every mint, burn, and transfer event accessible to BSN supervisory staff
9. Support participant onboarding with tiered identity verification (commercial banks: full KYC with institutional due diligence; future retail: simplified KYC for financial inclusion)
10. Demonstrate transaction throughput of at least 1,000 TPS sustained during pilot load testing
11. Provide disaster recovery with RPO under 5 minutes and RTO under 30 minutes
12. All data must reside within national borders with zero cross-border data transmission

**DALP Capabilities Being Tested:**
- Stablecoin asset class with controlled minting/burning
- Compliance modules (country restrictions, capped transfers, supply caps)
- Identity and KYC tiering
- Permissioned network deployment
- Audit trail and observability

**Tricky Requirements (Honesty Tests):**
- **Programmable expiry on transfers** -- DALP does not have a native time-expiry-and-reclaim mechanism for individual transfers. The platform supports time-based compliance rules and lifecycle states, but automatic reclaim of expired balances requires custom smart contract logic or a scheduled operational workflow. The response must be honest about this being a customization, not an out-of-the-box feature.
- **Offline payment capability** -- the scenario brief mentions future retail considerations. DALP is an on-chain platform and has no native offline transaction capability. If probed, the response must clearly state this is outside platform scope.
- **1,000 TPS sustained** -- throughput depends heavily on the underlying blockchain network configuration, not just DALP. The response should explain what DALP controls vs what is network-dependent.

---

### MR-10: Multi-Jurisdictional Fund Tokenization

**Difficulty: Medium** | **Asset Class: Fund** | **Compliance Modules: Country restrictions, accredited investor verification, transfer limits, lock-up periods**

**Issuing Entity:** Meridian Capital Partners -- a Luxembourg-domiciled fund manager with EUR 4.2 billion AUM across growth equity and venture strategies. Meridian holds AIFM authorization under the EU AIFMD and is licensed by the Monetary Authority of Singapore (MAS) as a Registered Fund Management Company. They want to tokenize LP interests in a new EUR 500 million technology growth fund with distribution to qualified investors in the EU (under MiCA and AIFMD) and Singapore (under MAS Securities and Futures Act).

**Key Requirements:**
1. Represent LP interests as digital fund units with configurable denomination (EUR 100,000 minimum subscription) and support for fractional units down to 0.01
2. Enforce dual-jurisdiction compliance: EU investors must satisfy MiCA/AIFMD qualified investor requirements; Singapore investors must satisfy MAS accredited investor criteria
3. Implement capital call workflows where the GP issues drawdown notices, LP commitments are tracked on-platform, and unfunded commitments are visible in real-time
4. Automate distribution waterfall calculations: return of capital, 8% preferred return hurdle, 80/20 GP/LP carry split above hurdle, with catch-up provision
5. Enforce transfer restrictions: 3-year lock-up from subscription date, GP consent required for all secondary transfers, right of first refusal (ROFR) for existing LPs with 30-day exercise window
6. Generate regulatory reports compliant with AIFMD Annex IV reporting and MAS Form 1/1A requirements
7. Integrate with Meridian's fund administrator (Apex Group) for NAV reconciliation on a weekly basis
8. Support investor onboarding with document collection (proof of accreditation, tax residency certificates, W-8BEN/W-9 forms) and approval workflows
9. Provide a secure investor portal showing commitment status, capital call history, distribution history, and current NAV per unit
10. Maintain separate investor registries per jurisdiction to satisfy data residency requirements (EU data in EU, Singapore data in Singapore)
11. Support secondary market transfers with automated compliance re-verification of the buyer before transfer completion
12. Provide API integration with Meridian's existing CRM (Salesforce) and portfolio management system (eFront)
13. Demonstrate SOC 2 Type II certification and GDPR compliance documentation

**DALP Capabilities Being Tested:**
- Fund asset class with subscription/redemption mechanics
- Multi-jurisdiction compliance module configuration
- Transfer restriction enforcement (lock-ups, ROFR, consent workflows)
- Identity verification and KYC with document handling
- Distribution and claims delivery
- API surface and integration capability

**Tricky Requirements (Honesty Tests):**
- **Distribution waterfall calculation (preferred return, carry, catch-up)** -- DALP's distribution system handles entitlement recording and claim fulfillment, but the actual waterfall math (hurdle rates, catch-up provisions, GP carry calculations) is complex fund-specific logic. DALP can execute distributions once amounts are determined, but the waterfall calculation engine itself is not a built-in feature. The response should position DALP as the distribution execution layer, not the waterfall calculator.
- **AIFMD Annex IV and MAS Form 1/1A regulatory reporting** -- DALP provides audit trails and data exports but does not generate jurisdiction-specific regulatory filing documents. The response must acknowledge that DALP provides the underlying data, but report formatting and filing is outside platform scope.
- **Separate data residency per jurisdiction** -- DALP supports deployment in specific cloud regions, but maintaining split data residency within a single deployment (EU investor data in EU, SG investor data in Singapore) requires architectural decisions about multi-deployment topology. This is not a simple configuration toggle.
- **Salesforce and eFront integration** -- DALP has API surfaces for integration, but pre-built connectors for specific CRM/portfolio management systems are not shipped. The response should describe API-based integration capability without implying native connectors exist.

---

### MR-11: Sovereign Bond Digitization

**Difficulty: Hard** | **Asset Class: Bond** | **Compliance Modules: Country restrictions, accredited investor verification, transfer limits, time-based rules**

**Issuing Entity:** Republic of Valdoria, Ministry of Finance, Debt Management Office (DMO) -- a mid-income European country (population 9.5 million, GDP EUR 78 billion) that has been issuing conventional bonds through its national CSD for 25 years. The DMO wants to pilot a EUR 2 billion 10-year sovereign bond issuance on a digital platform, with the digital record serving as the authoritative registry (not a mirror of the CSD). This is the first sovereign issuer in the region to attempt a fully digital bond issuance, and the DMO expects intense scrutiny from the national securities regulator (Valdoria Financial Authority, "VFA"), the European Central Bank, and the national court of audit.

**Key Requirements:**
1. Support the full bond lifecycle: primary issuance via Dutch auction, semi-annual coupon payments (fixed rate), maturity redemption at par, and optional early redemption (callable at par after year 5 with 60-day notice)
2. Serve as the authoritative legal registry of bond ownership -- the platform record must be the definitive register, not a copy of an external CSD record
3. Integrate with Euroclear and Clearstream for cross-border settlement when non-domestic investors purchase bonds on secondary markets
4. Support delivery-versus-payment settlement with the TARGET2 payment system for the EUR cash leg
5. Process coupon payments to 50,000+ bondholders within a 4-hour settlement window on each semi-annual payment date
6. Enforce investor eligibility: EU institutional investors (no restrictions), EU retail investors (minimum EUR 1,000 denomination, prospectus delivery confirmation required), non-EU investors (subject to country-specific restrictions and withholding tax rules)
7. Generate CSDR-compliant settlement reporting and MiFID II transaction reporting for all secondary market transfers
8. Provide real-time connectivity to primary dealer systems (6 designated market makers) via FIX protocol for secondary market activity
9. Support corporate actions: coupon payment, partial early redemption (pro-rata across holders), maturity redemption, and potential debt restructuring (consent solicitation with bondholder voting)
10. Implement bondholder voting for consent solicitation events with quorum requirements (66.67% of outstanding principal) and supermajority approval (75%)
11. Maintain 99.99% uptime with zero data loss, including during sovereign crisis scenarios where market activity may spike 10x normal volumes
12. Provide a complete chain of custody audit trail that satisfies the national court of audit's digital evidence standards
13. All platform operations must be auditable by the VFA in real-time via a dedicated supervisory node or read-only regulatory access
14. Support future issuances of inflation-linked bonds (CPI-indexed coupon adjustment) and green bonds (use-of-proceeds tracking)

**DALP Capabilities Being Tested:**
- Bond asset class with full lifecycle (issuance, coupon, maturity, callable redemption)
- XvP settlement coordination
- Compliance module configuration for multi-tier investor eligibility
- Distribution scheduling and claims delivery at scale (50,000+ holders)
- Voting power feature (for bondholder consent solicitation)
- Audit trail and regulatory access
- High availability and disaster recovery

**Tricky Requirements (Honesty Tests):**
- **Dutch auction for primary issuance** -- DALP has a token sale/primary offering addon, but it does not include a Dutch auction mechanism. The token sale supports fixed-price offerings with optional presale pricing. A Dutch auction would require custom development or integration with an external auction platform. The response must not claim native auction capability.
- **Euroclear/Clearstream integration** -- DALP supports ISO 20022 messaging and has integration capabilities, but pre-built connectivity to Euroclear or Clearstream settlement systems does not exist as a shipped product feature. This would be an integration project. Be transparent about effort required.
- **FIX protocol connectivity** -- DALP does not natively speak FIX protocol. Integration with primary dealer trading systems would require a middleware layer. The response should acknowledge this gap clearly.
- **Bondholder voting with quorum and supermajority** -- DALP has a voting power feature (ERC-5805) at the smart contract level, but it ships no governance/proposal system, no quorum enforcement, and no DAPI routes for vote management. The contract infrastructure exists, but the full voting workflow is not a production-ready product feature. The response must accurately represent what is shipped vs what requires additional development.
- **Inflation-linked bond (CPI-indexed coupons)** -- DALP supports fixed and floating coupon bonds, but dynamic CPI-indexed coupon adjustment based on external inflation data feeds is not a built-in bond feature. This would require custom smart contract logic and price feed integration. Be honest about the gap.

---

### MR-12: Real Estate Fractional Ownership Platform

**Difficulty: Medium** | **Asset Class: Real Estate** | **Compliance Modules: Country restrictions, accredited investor verification, transfer limits, capped holders**

**Issuing Entity:** Brickstone Digital Assets -- a Dubai-based PropTech firm licensed by the Dubai Virtual Assets Regulatory Authority (VARA) and registered with the Abu Dhabi Global Market (ADGM). Brickstone wants to launch a platform enabling fractional ownership of Grade A commercial properties across the UAE, starting with three assets: a Dubai Marina office tower (AED 450 million), a DIFC retail complex (AED 280 million), and a Jebel Ali logistics warehouse (AED 180 million). Each property is held in a dedicated SPV. Target investors include UAE residents (retail, minimum AED 5,000) and international qualified investors.

**Key Requirements:**
1. Tokenize each property as a separate real-estate asset with fractional units representing proportional ownership in the SPV, linked to the title deed registered with the Dubai Land Department
2. Support both UAE resident retail investors (minimum AED 5,000 investment, simplified KYC) and international qualified investors (minimum AED 100,000, enhanced due diligence with source-of-funds verification)
3. Automate quarterly rental yield distribution to all token holders, with deductions for property management fees (8%), maintenance reserves (5%), and applicable VAT
4. Integrate with three independent property valuation firms for quarterly mark-to-market NAV updates, with a mechanism to flag and resolve valuation discrepancies exceeding 10%
5. Provide a secondary market mechanism where token holders can list their tokens for sale with price limits, and buyers can browse and purchase available listings
6. Enforce RERA (Real Estate Regulatory Authority) compliance including foreign ownership restrictions for specific property types and geographic zones
7. Implement a governance mechanism allowing token holders to vote on major decisions: property disposition (sale of underlying asset), major capital expenditure above AED 500,000, and change of property manager
8. Support AML/CFT compliance aligned with UAE Central Bank guidelines and FATF recommendations, including ongoing transaction monitoring and suspicious transaction reporting
9. Generate investor statements (quarterly and annual) showing holdings, yield received, capital gains/losses, and current NAV
10. Provide a mobile-responsive investor portal with real-time property performance data, occupancy rates, and tenant information (anonymized)
11. Support eventual exit/liquidation: when an underlying property is sold, distribute sale proceeds pro-rata to token holders and retire the tokens
12. Integrate with UAE national identity systems (Emirates ID verification) for resident investor onboarding

**DALP Capabilities Being Tested:**
- Real-estate asset class with SPV structure representation
- KYC/identity verification with tiered investor categories
- Distribution scheduling for rental yields
- Compliance modules for transfer restrictions and holder caps
- Token lifecycle (issuance, distribution, eventual redemption/burn on property sale)
- Document management for property-related artifacts

**Tricky Requirements (Honesty Tests):**
- **Secondary market with order book / listing mechanism** -- DALP is not a trading venue and does not include a native order book, matching engine, or marketplace listing system. Secondary transfers are supported (peer-to-peer with compliance checks), but the "browse and purchase" marketplace experience requires an external exchange or OTC platform integrated with DALP. The response must be clear about this boundary.
- **Property valuation feed integration with discrepancy resolution** -- DALP supports data feeds and has a feeds module, but automated multi-source valuation comparison with discrepancy flagging is not a shipped feature. The platform can consume external NAV feeds, but the reconciliation logic across three independent valuers is custom workflow territory.
- **Emirates ID verification integration** -- DALP integrates with identity verification providers but does not have a pre-built connector to the UAE national identity system (ICP/Emirates ID). This would be an integration with a local eKYC provider. Be transparent that this is partner-dependent.
- **Automated tax/VAT deduction from distributions** -- DALP has no native tax calculation engine. Distribution amounts can be configured net of deductions, but the tax/VAT calculation itself is outside platform scope.
- **Governance voting on property decisions** -- same limitation as MR-11: voting power infrastructure exists at smart contract level, but no full governance product (proposal creation, quorum tracking, vote tallying UI) is shipped.

---

### MR-13: Precious Metals Tokenization with Physical Redemption

**Difficulty: Expert** | **Asset Class: Precious Metal** | **Compliance Modules: Collateral verification, country restrictions, transfer limits, accredited investor verification**

**Issuing Entity:** Aurum Vault International (AVI) -- a joint venture between a Swiss precious metals refinery (LBMA-accredited Good Delivery refiner) and a Singapore-based digital assets firm licensed by MAS. AVI operates secure vault facilities in Zurich, Singapore, and Dubai, holding allocated gold, silver, and platinum. They want to launch a tokenized precious metals platform where each token represents a claim on specific physical metal held in their vaults. The platform must support both institutional investors trading large positions and retail investors buying fractional ounces, across Swiss (FINMA), Singapore (MAS), and UAE (VARA/DMCC) regulatory frameworks.

**Key Requirements:**
1. Issue tokens representing allocated precious metals (gold, silver, platinum) where each token is backed by specific, individually identified bars or lots stored in designated vaults, with bar serial numbers, assay certificates, and LBMA Good Delivery status recorded on-platform
2. Support both allocated (specific bars assigned to token holder) and unallocated (pooled claim on vault inventory) token structures, with clear on-chain differentiation and the ability for investors to convert from unallocated to allocated upon reaching minimum bar weight thresholds
3. Implement real-time collateral verification: the total token supply for each metal must never exceed the verified physical inventory. Integrate with vault management systems for daily inventory reconciliation with automated alerts if token supply exceeds 98% of verified physical holdings
4. Provide physical redemption workflows: token holders above minimum thresholds (1 kg gold, 100 oz silver, 50 oz platinum) can initiate physical delivery requests, which trigger a multi-step process -- compliance verification, logistics coordination, insurance confirmation, token burn upon confirmed delivery
5. Integrate live precious metals pricing from at least two independent sources (LBMA Gold Price, Comex, Reuters) with staleness detection (alert if price feed is older than 15 minutes during market hours) and automatic circuit breakers that pause trading if price feeds diverge by more than 2%
6. Enforce three-jurisdiction compliance simultaneously: FINMA regulations for Swiss-vaulted metals, MAS regulations for Singapore-vaulted metals, VARA/DMCC rules for Dubai-vaulted metals -- including jurisdiction-specific investor eligibility, reporting obligations, and AML requirements
7. Support vault-to-vault transfers (re-allocation of physical backing between Zurich, Singapore, and Dubai) with corresponding on-chain record updates and compliance re-evaluation
8. Provide proof-of-reserve attestation workflows: quarterly third-party auditor verification with on-chain publication of attestation results, accessible to all token holders
9. Integrate with AVI's existing vault management system (custom ERP) via API for inventory synchronization, and with their insurance broker's platform for real-time coverage verification
10. Support institutional block trades (minimum 100 oz gold equivalent) with negotiated pricing and T+0 settlement, alongside retail fractional purchases (minimum 0.01 oz gold equivalent)
11. Generate regulatory reports for all three jurisdictions: Swiss precious metals dealer reporting, MAS commodity trading reports, and DMCC trade reporting
12. Implement custody chain-of-custody tracking from refinery receipt through vault storage to eventual physical delivery or token burn, with tamper-evident audit trail
13. Support metal lending/borrowing: institutional clients can lend their allocated metal positions to approved counterparties for a fee, with on-chain collateral pledging and automatic recall triggers if collateral coverage drops below 105%
14. Provide insurance integration: every token position must be linked to verifiable insurance coverage, with automatic alerts to operations if coverage lapses or is insufficient for current vault holdings

**DALP Capabilities Being Tested:**
- Precious-metal asset class with collateral backing
- Collateral verification module and proof-of-reserve workflows
- Multi-jurisdiction compliance configuration
- Distribution and claims (for metal lending yields)
- Identity/KYC across three regulatory frameworks
- Lifecycle management (issuance, transfer, redemption/burn)
- Data feeds integration for pricing
- Audit trail and documentation store

**Tricky Requirements (Honesty Tests):**
- **Allocated vs unallocated with conversion mechanics** -- DALP supports collateral backing and the precious-metal asset class, but the distinction between allocated (specific bar assignment per holder) and unallocated (pooled claim) with on-demand conversion is not a built-in product feature. DALP can track collateral at the asset level, but individual bar-to-holder mapping with conversion thresholds requires custom data structures and workflows. The response must be honest about the gap between platform-level collateral tracking and bar-level allocation.
- **Physical redemption with logistics coordination** -- DALP can handle the token-side of redemption (compliance check, burn), but logistics coordination (shipping, insurance confirmation, delivery tracking) is entirely outside platform scope. The response should describe DALP's role in the redemption workflow without implying it manages physical logistics.
- **Metal lending/borrowing with automatic recall triggers** -- DALP has no native lending/borrowing module. Collateral pledging, lending term management, yield calculation, and automatic recall triggers based on coverage ratios are not shipped features. This would require significant custom development or integration with a lending protocol. Be completely transparent about this being outside current capability.
- **Circuit breakers on price feed divergence** -- DALP's feeds module can consume external price data, but automated circuit breakers that pause platform operations based on price feed divergence logic are not a built-in feature. Feed staleness detection exists, but the automated response (pause trading) requires custom orchestration.
- **Vault management ERP integration and insurance broker platform integration** -- DALP has API surfaces for integration, but pre-built connectors to custom vault ERPs or insurance platforms do not exist. Every external system integration is a project, not a configuration step. The response must avoid implying plug-and-play connectivity.
- **Real-time inventory reconciliation with 98% threshold alerts** -- DALP tracks collateral at the asset level and supports attestation workflows, but continuous real-time reconciliation against an external vault management system with automated threshold alerting is custom workflow territory, not a shipped monitoring feature.

---

## Asset Class Deep-Dives

Seven asset classes. For each exercise, Bid Manager writes comprehensive DALP coverage addressing every listed aspect.

---

### AC-1: Equities

- **Share tokens**: Token standard selection, share class representation (common, preferred, multi-class), par value encoding
- **Corporate actions**: Dividend distribution (cash and stock), stock splits, reverse splits, share buybacks, rights issues, bonus shares, how DALP automates each
- **Fractional ownership**: Sub-share precision, minimum transferable units, aggregation/disaggregation
- **Compliance**: Accredited investor verification, jurisdictional transfer restrictions, max holder limits, forced transfers (court orders), insider trading lock-ups
- **Settlement**: DvP mechanics, T+0 vs configurable settlement windows, integration with cash leg (stablecoin or fiat rails)

### AC-2: Fixed Income

- **Bond lifecycle**: Issuance (primary distribution, book-building), coupon payment schedules (fixed, floating, zero-coupon), maturity redemption, early redemption (callable/puttable), amortizing structures
- **Sukuk variant**: Sharia-compliant structures (ijara, murabaha, wakala), profit-sharing vs interest, AAOIFI compliance, Sharia board workflow
- **Credit events**: Default handling, restructuring, cross-default triggers, recovery distribution
- **Trustee roles**: On-chain trustee functions, covenant monitoring, bondholder meeting/voting, communication workflows

### AC-3: Real Estate

- **Property tokenization**: Property-to-token mapping (1:1 or fractional), SPV structure representation, title deed linkage
- **Rental yield distribution**: Automated distribution calculation, gross-to-net (fees, maintenance reserves, taxes), distribution frequency configuration
- **Fractional transfer**: Secondary market mechanics, minimum holding requirements, pre-emption rights
- **Valuation feeds**: Integration with property appraisal providers, NAV update frequency, mark-to-market vs book value
- **Regulatory**: RERA (UAE) compliance, ADGM regulations, European frameworks (MiFID II for tokenized securities), foreign ownership restrictions

### AC-4: Commodities

- **Backing verification**: Collateral module configuration, proof-of-reserve mechanisms, attestation workflows, audit integration
- **Storage/custody integration**: Warehouse receipt digitization, vault operator APIs, custodian connectivity, chain-of-custody tracking
- **Delivery vs cash settlement**: Physical delivery workflows (allocation, logistics triggers), cash settlement against price feeds, mixed models
- **NAV feeds**: Precious metals pricing sources (LBMA, Comex), update frequency, staleness checks, circuit breaker thresholds

### AC-5: Fund Units

- **NAV integration**: Fund administrator connectivity, NAV calculation frequency (daily, weekly, event-driven), pricing sources
- **Subscription/redemption**: Capital call automation, redemption windows, queue management (gate provisions), notice periods
- **Dividend distribution**: Income vs capital gains, reinvestment options, distribution calculation and execution
- **Transfer restrictions**: Lock-up periods, qualified purchaser checks, ROFR (right of first refusal), GP consent workflows
- **Fund admin integration**: Reporting feeds, investor registry synchronization, regulatory filing data, audit trail

### AC-6: Structured Products

- **Multi-tranche tokens**: Senior/mezzanine/equity tranche representation, tranche-specific token contracts, inter-tranche relationships
- **Waterfall distributions**: Payment priority logic, overcollateralization tests, interest coverage tests, trigger events
- **Collateral management**: Collateral pool representation, substitution rules, concentration limits, eligibility criteria
- **Risk parameters**: LTV (loan-to-value) monitoring, delinquency tracking, prepayment modeling, stress test triggers

### AC-7: Carbon Credits / ESG

- **Retirement mechanics**: Permanent retirement (burn) vs temporary holding, retirement certificate generation, double-counting prevention
- **Registry integration**: Verra (VCS), Gold Standard, ACR connectivity, registry-of-record synchronization
- **Vintage tracking**: Issuance year, project vintage, serial number mapping, vintage-based pricing differentiation
- **Verification claims**: Third-party verifier attestations, methodology references, additionality claims, SDG alignment tagging

---

## Content Refresh Rotation

Eight content sections mapped to their DALP codebase source directories. During content refresh exercises, Bid Manager reads the latest code and rewrites the corresponding bid content to reflect current capabilities.

| # | Content Section | Source Directory |
|---|----------------|-----------------|
| 1 | Configurable Tokens | `~/dalp/kit/contracts/contracts/smart/token/` |
| 2 | Configurable Compliance | `~/dalp/kit/contracts/contracts/smart/compliance/` |
| 3 | Integrations | `~/dalp/kit/dapp/content/docs/architecture/integrations/` |
| 4 | Access Control & Permissions | `~/dalp/kit/dapp/content/docs/architecture/security/` |
| 5 | Verification, Claims & Feeds | `~/dalp/kit/contracts/contracts/smart/identity/` |
| 6 | Technical Proposal | `~/dalp/kit/dapp/content/docs/architecture/` |
| 7 | Commercial Proposal | `~/dalp/kit/dapp/content/docs/executive-overview/` |
| 8 | RFI Response Bank | All of the above + `~/dalp/kit/dapp/content/docs/developer-guides/` |
