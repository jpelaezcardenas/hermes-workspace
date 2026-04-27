# Solving the Complexity of Doing It Right

Tokenization technology is increasingly accessible. Running a pilot, minting a token, or demonstrating a proof of concept on a blockchain testnet can be accomplished in days. Financial institutions worldwide have done exactly that, producing hundreds of innovation lab demos, sandbox experiments, and press-worthy pilots.

The hard part is not tokenization. The hard part is doing it right.

Digital asset operations that hold up under regulatory scrutiny require identity frameworks that satisfy multiple regulators. They require compliance controls that enforce eligibility before execution, not after review. They require governance models where risk committees, compliance officers, and operations teams each have precisely scoped authority. They require auditability that can withstand regulatory examination years after the fact. They require support for multiple asset classes, jurisdictions, and blockchain networks, all operating under a single coherent control plane.

This is the complexity that most institutions underestimate, and it is the complexity that separates a successful pilot from a production program managing real assets on real balance sheets.

DALP, the Digital Asset Lifecycle Platform, exists to solve this complexity. Built by SettleMint over nearly a decade of production deployments with regulated banks, market infrastructure providers, and sovereign entities, DALP provides the infrastructure institutions need to design, launch, and operate digital assets at production scale, with the governance, compliance, and reliability that regulated environments demand.

DALP is a platform, not a consulting engagement. Institutions configure and operate it themselves, using the same software that powers production deployments across Europe, the Middle East, and Asia Pacific. There is no custom development required to launch a tokenized bond, issue fractional real estate tokens, or enforce multi-jurisdictional compliance. The platform ships with the smart contracts, compliance modules, identity infrastructure, and operational tooling required for production, ready from day one.

![DALP provides a secure login experience with support for passwordless passkey authentication (WebAuthn) alongside traditional email/password credentials.](../../shared/brand/dalp-screenshots/01 - Login/Login.png)

This document provides a detailed technical walkthrough of the DALP platform: its architecture, capabilities, and operational model. It is written for technology committees, solution architects, compliance officers, and operations leaders who need to evaluate whether DALP can meet the demands of institutional digital asset programs.

---

# Platform Overview

## The Command Center

DALP presents a unified operational dashboard that serves as the command center for all digital asset activities. From a single interface, operators manage portfolio valuation, identity verification, compliance monitoring, settlement workflows, and system administration.

The dashboard surfaces the information that matters most to institutional operators: total portfolio valuation, assets under management, pending actions requiring attention, and a live feed of blockchain activity. This is not a reporting tool that refreshes overnight; it reflects on-chain state in real time.

![The DALP Administration Dashboard provides a real-time command center: portfolio valuation, AUM tracking, pending action alerts, and a live blockchain activity feed, all in one view.](../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard 1.png)

The dashboard organizes management capabilities into distinct modules. Portfolio and asset management sit alongside identity management and compliance verification, reflecting the reality that these functions are inseparable in regulated digital asset operations. A compliance verification pending action appears on the same screen as portfolio performance, because in production, they are part of the same operational workflow.

![The DALP Dashboard integrates identity management and compliance verification directly into the operator's daily workflow, with real-time pending alerts for KYC/AML verification actions.](../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard 2.png)

The platform tracks the scale of the identity and verification ecosystem alongside asset management. Active identities, trusted issuers, and verification counts provide instant visibility into the compliance infrastructure's health.

![DALP's identity engine manages 39 on-chain identities across 4 trusted issuers, with 384 active compliance verifications, providing the regulatory backbone for all asset transfers.](../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard 3.png)

For institutions operating across multiple jurisdictions, the geographic distribution view maps where tokenized assets are held and traded globally. This is not a decorative visualization; it connects directly to the compliance engine's jurisdiction-based controls, providing operators with instant visibility into their geographic exposure.

![DALP's geographic jurisdiction map provides instant visibility into where tokenized assets are held and traded globally, supporting multi-jurisdiction regulatory compliance and cross-border asset distribution.](../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard 4.png)

## Portfolio Intelligence

Beyond the operational dashboard, DALP provides dedicated portfolio analytics that break down asset composition across multiple dimensions. Operators can view total portfolio value, pending launches, and asset distribution by instrument type, by supply count, and by asset class, all updated in real time from on-chain data.

![DALP manages $13.17 billion in tokenized assets across 71 instruments, spanning bonds, equities, funds, stablecoins, deposits, real estate, and precious metals, visualized in real-time with interactive analytics.](../../shared/brand/dalp-screenshots/02 - Dashboard/Asset Insights.png)

The portfolio view provides individual users with a consolidated view of their own holdings across all asset classes, including balance, available amount, and frozen token tracking per asset.

![DALP's 'My Assets' view provides investors with a consolidated portfolio dashboard across 7 instruments spanning real estate, equities, bonds, and cash equivalents, with live balance and availability tracking.](../../shared/brand/dalp-screenshots/02 - Dashboard/My Assets.png)

Multi-dimensional analytics break down the portfolio by instrument, by supply count, and by asset class, giving managers a complete view of their tokenized portfolio composition from different analytical perspectives.

![DALP's Insights module provides multi-dimensional portfolio analytics, breaking down assets by instrument type, supply count, and asset class, giving managers a complete view of their tokenized portfolio composition.](../../shared/brand/dalp-screenshots/02 - Dashboard/Portfolio Insights.png)

![DALP's portfolio insights dashboard delivers real-time visibility into asset composition, supply distribution, and class-level value allocation across all managed tokenized assets.](../../shared/brand/dalp-screenshots/02 - Dashboard/Portfolio Insights 2.png)

---

# The Asset Designer

## Configuration, Not Custom Development

The traditional approach to tokenizing a financial instrument requires specialized Solidity development, security audits costing $200,000 to $500,000 per engagement, and deployment cycles measured in months. For an institution offering bonds, equities, funds, and structured products, this means four separate development tracks, each with its own codebase, audit, and maintenance burden.

DALP replaces this with a configuration-driven model. At the core of the platform is DALPAsset, a unified, audited token contract built on the ERC-3643 (T-REX) standard. Rather than writing custom smart contracts for each financial instrument, operators configure DALPAsset through a guided wizard that captures the full specification of the instrument: asset class, token parameters, compliance rules, governance structure, and deployment settings. The resulting token inherits the same security guarantees as bespoke development because every component has been independently audited.

The Asset Designer guides issuers through this process with a step-by-step wizard supporting all major asset classes.

![The DALP Asset Designer guides issuers through tokenization with a step-by-step wizard supporting all major asset classes: Fixed Income, Flexible Income, Cash Equivalents, and Real World Assets.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer.png)

## From Parameters to Deployment

The wizard adapts to each asset class, presenting the specific parameters, compliance options, and features relevant to that instrument type. For a bond, the wizard captures maturity date, ISIN, face value, and denomination asset. For real estate, it captures GPS coordinates, property classification, building specifications, and fractional ownership parameters.

Each step validates inputs in real time. Asset name and symbol availability are checked against all existing deployments. ISIN format is validated against the ISO 6166 standard. Jurisdiction is assigned at creation time, binding the token to its regulatory context from the outset.

![DALP validates asset name, symbol, and decimal configuration in real-time, while assigning the token to the correct legal jurisdiction from the outset.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Design Bond 2.png)

For fixed-income instruments, the wizard captures bond-specific parameters including ISIN and maturity date, ensuring compliance with financial instrument identification standards.

![DALP captures bond-specific parameters including ISIN and maturity date during asset creation, ensuring compliance with financial instrument standards from day one.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Design Bond 3.png)

## Economic Configuration

The pricing and valuation step links the tokenized instrument to its economic model. For bonds, this includes configuring the maximum token supply and linking to an on-chain denomination asset that will serve as the settlement currency for DvP operations.

![During asset creation, issuers configure the bond's maximum token supply and link it to an on-chain denomination asset, establishing the DvP settlement currency before deployment.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Design Bond 4.png)

The denomination asset link is a critical architectural decision. By connecting a tokenized bond to a specific on-chain deposit token at creation time, DALP establishes the settlement relationship before the first token is ever minted. This means atomic DvP settlement is not an afterthought; it is configured into the instrument from the start.

![DALP bonds are denominated in on-chain institutional assets, here Deutsche Bank Euro Deposit tokens, establishing face value of 1,000 DEED per bond and enabling atomic DvP settlement at maturity.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Design Bond 5.png)

## Compliance Module Selection

Step 6 of the wizard is where the Asset Designer addresses the core complexity of doing tokenization right: regulatory compliance. Rather than requiring institutions to write custom compliance logic, DALP ships a pre-built compliance library covering major global regulatory frameworks, selectable with a single click.

![DALP ships with a pre-built compliance library covering all major global regulatory frameworks, MiCA EU, MAS Singapore, Japan FSA, SEC Reg CF, Reg D 506(b), selectable with a single click during asset creation.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 6 - Compliance Modules.png)

For institutions that need advanced compliance configuration, the wizard provides an expression builder where compliance teams can construct investor eligibility rules using boolean logic. A simple expression like "KYC AND Asset classification" creates an investor eligibility gate. Complex institutional expressions can chain nine or more conditions, combining KYC, AML, accredited investor status, collateral verification, prospectus filing, and issuer reporting into a single enforced eligibility rule.

![DALP's expression builder allows compliance rules to be constructed visually using boolean logic, here KYC AND Asset classification creates an investor eligibility gate that can be customized per regulatory requirement.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Compliance Identity.png)

![DALP's expression builder supports sophisticated multi-condition compliance rules, combining KYC, AML, accredited investor status, collateral verification, prospectus filing, and issuer reporting into a single enforced eligibility gate.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Compliance Expression.png)

The compliance templates also include jurisdiction-specific controls. For MiCA EU compliance, the country allowlist is automatically populated with all 27 EU member states, and supply limits enforce MiCA's 8,000,000 EUR rolling annual supply cap.

![DALP's country allowlist control restricts asset trading to approved jurisdictions, here all 27 EU member states are automatically configured when applying the MiCA EU Standard compliance template.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Compliance Country Allowlist.png)

![DALP implements MiCA's 8,000,000 EUR rolling annual supply cap as a configurable compliance control, automatically enforced on-chain with base price conversion and a 365-day rolling window.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Supply Limit.png)

![DALP's compliance library covers global regulatory frameworks out of the box, enabling asset issuers to select and apply regulatory controls without compliance expertise.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Compliance.png)

## Governance and Permissions

Before deployment, the Asset Designer establishes the governance structure for the new token. DALP's per-asset role model defines seven distinct roles: Default Admin, Governance, Supply Management, Custodian, Emergency, Sale Admin, and Funds Manager. Each role is scoped to the specific asset, meaning that holding Governance authority on one token grants no power over any other.

The wizard allows operators to assign these roles across multiple parties, establishing institutional-grade separation of duties before the token is ever deployed.

![DALP's permission system assigns specific administrative roles to each party, Custodian, Governance, Emergency, Supply Manager, and more, establishing institutional-grade access control at asset creation.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions Config.png)

![DALP supports multi-party governance from day one, the asset creator, custodian, and operations team each receive precisely scoped roles, establishing institutional governance before the token is ever deployed.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions List.png)

![Before deployment, DALP's permission step establishes a full 5-party governance structure, administrator, issuer, governance committee, emergency responder, and fund manager, each assigned precisely scoped roles by blockchain wallet address.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Permissions.png)

## Review and Deploy

The wizard culminates in a review step that presents the complete configuration: general information, instrument-specific details, compliance modules, and initial permissions. The operator can verify every parameter before committing the token to the blockchain with a single click.

![The DALP wizard culminates in a complete review step, confirming all parameters (name, symbol, ISIN, jurisdiction, compliance modules) before the bond is deployed to the blockchain with a single click.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Review and Deploy 1.png)

![Before blockchain deployment, DALP presents a complete pre-flight review, listing all active compliance modules and every authorized administrator with their assigned roles and wallet addresses.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer Review and Deploy 2.png)

Behind the scenes, deployment executes through a durable workflow orchestrated by Restate, DALP's execution engine. The factory deploys a UUPS proxy contract, initializes the compliance engine, binds the token to the Identity Registry, issues class-aware claims, configures features in the specified order, and assigns initial roles. The workflow is idempotent: if any step fails, deployment resumes from the last successful step without creating orphaned contracts. Tokens deploy in a paused state by default, giving the compliance team time to verify the configuration before going live.

---

# Supported Asset Classes

DALP supports seven asset types organized into four classes, each with purpose-built lifecycle logic, metadata schemas, and compliance configurations.

## Fixed Income: Bonds

Bonds in DALP are not simplified token wrappers around a balance. They are fully modeled fixed-income instruments with maturity dates, coupon schedules, denomination assets, ISIN identifiers, and automated yield distribution.

The bond listing view shows a diversified portfolio across multiple currencies and bond types, from floating rate notes to green bonds, each deployed as a smart contract with full lifecycle status tracking.

![DALP manages a diversified bond portfolio across multiple currencies and bond types, from floating rate notes to green bonds, each deployed as smart contracts on-chain with full lifecycle status tracking.](../../shared/brand/dalp-screenshots/06 - Bonds/Bonds Listing.png)

Each bond carries rich lifecycle data: maturity date, redemption coverage, holder count, denomination asset holdings, and cross-currency pricing. The Municipal Bond Tokyo, for example, is priced in AED but denominated in Mizuho Yen Deposit tokens, demonstrating DALP's capacity for sophisticated cross-currency settlement.

![DALP's bond detail view provides complete lifecycle visibility, maturity dates, redemption coverage (100%), denomination asset holdings, holder distribution, and cross-currency pricing, all on-chain and auditable.](../../shared/brand/dalp-screenshots/06 - Bonds/Bonds Detail 1.png)

Yield distribution is automated through on-chain yield schedules. The platform deploys a separate yield schedule smart contract for each bond, configuring payment intervals, yield rates, and denomination asset reserves. A five-year annual schedule is fully deployed on-chain, with pre-funded denomination reserves for future distributions.

![DALP automates bond coupon distribution via on-chain yield schedules, the Municipal Bond Tokyo's 5-year annual schedule is fully deployed on-chain, with a 500,000 MIZY denomination reserve pre-funded for future distributions.](../../shared/brand/dalp-screenshots/06 - Bonds/Bonds Detail 2.png)

Every action on a bond is logged immutably on-chain. The events tab shows a chronological record of yield schedule setup, transfers, and checkpoint updates. The checkpoint mechanism, part of the ERC-3643/T-REX compliance standard, automatically creates compliance snapshots with each transfer.

![Every action on a DALP bond is logged immutably on-chain, from yield schedule setup to token transfers, with automatic checkpoint recording creating a complete, tamper-proof compliance audit trail.](../../shared/brand/dalp-screenshots/06 - Bonds/Bonds Detail 3.png)

![Tokenized bonds in DALP come with built-in access control, supply limits, safe custody, redemption, and automated yield distribution, all configured through the guided wizard.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Design Bond 1.png)

## Flexible Income: Equities

DALP supports full equity tokenization across common, preferred, and voting share classes. Equities use zero decimals by default, representing whole shares in the standard equity convention.

![DALP supports full equity tokenization across common, preferred, and voting share classes, with 10 equities shown here, each representing 1.1M shares priced in EUR or USD on-chain.](../../shared/brand/dalp-screenshots/07 - Equity/Equity Listing.png)

A distinguishing feature of DALP's equity tokens is integrated collateral management. Each equity asset tracks collateral coverage ratios, remaining minting capacity, and collateral expiry dates. The Pacific Equity Common, for example, maintains 151.52% collateral coverage, providing over-collateralized investor protection with automatic minting capacity calculation.

![DALP equity tokens are backed by on-chain collateral, Pacific Equity Common maintains 151.52% collateral coverage with automatic minting capacity calculation, ensuring investors are protected against under-collateralization.](../../shared/brand/dalp-screenshots/07 - Equity/Equity Detail 1.png)

## Flexible Income: Funds

Fund tokens carry fund-specific metadata beyond standard token parameters: investment category, fund class, and management fee parameters. The platform supports the full fund landscape, from sustainable impact funds to venture capital and emerging market strategies, with 18-decimal precision enabling fractional unit ownership.

![DALP enables tokenization of the full fund landscape, from sustainable impact funds to venture capital and emerging market strategies, with 18-decimal precision enabling fractional unit ownership.](../../shared/brand/dalp-screenshots/08 - Funds/Funds Listing.png)

![DALP fund tokens carry fund-specific metadata, including investment category, fund class, and management fee parameters, providing a complete digital representation of the fund structure on-chain.](../../shared/brand/dalp-screenshots/08 - Funds/Fund Detail 1.png)

Fund tokens demonstrate the depth of DALP's on-chain verification model. Every fund carries cryptographically attested verifications: base price, asset issuer identity, contract identity, and asset classification are all verifiable claims issued by authorized parties via the OnchainID standard.

![Every DALP asset carries cryptographically attested on-chain verifications, base price, issuer identity, contract identity, and asset classification are all verifiable claims issued by authorized parties via the ONCHAINID standard.](../../shared/brand/dalp-screenshots/08 - Funds/Fund Detail 2.png)

## Cash Equivalents: Deposits

DALP enables financial institutions to tokenize bank deposits on-chain. Deposit tokens represent claims on bank deposits, functioning as the settlement currency for DvP operations across the platform. The Deutsche Bank Euro Deposit, for example, serves as the denomination asset for bond pricing and XvP settlement.

![DALP enables financial institutions to tokenize bank deposits on-chain, UBS Swiss Deposits, DBS Singapore Deposits, and currency-specific deposits (Saudi Riyal, Emirates Dirham) are managed alongside other digital assets in a unified platform.](../../shared/brand/dalp-screenshots/09 - Deposits/Deposits Listing.png)

![DALP's deposit management includes institutional-grade tokenized bank deposits, the Deutsche Bank Euro Deposit (DEED) functions as an on-chain settlement currency, used across bonds and XvP settlements throughout the platform.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Tokenize Deposit 1.png)

## Cash Equivalents: Stablecoins

The stablecoin module manages the full spectrum of stable-value instruments, from global standards like USDC and USDT to regional currencies and platform-native stablecoins. Each stablecoin stores the peg currency relationship on-chain, ensuring transparent monetary policy for digital fiat instruments.

![DALP manages the full stablecoin spectrum, from global standards (USDC, USDT, EURS) to regional currencies (AED, SGD, CAD, JPY) and platform-native stablecoins, all in one unified cash management interface.](../../shared/brand/dalp-screenshots/10 - Stablecoins/Stablecoins.png)

![DALP's stablecoin module stores the peg currency relationship on-chain, the Singapore Dollar Coin (SGDC) is explicitly configured as a 1:1 SGD peg, ensuring transparent monetary policy for digital fiat instruments.](../../shared/brand/dalp-screenshots/10 - Stablecoins/Stablecoin Detail 1.png)

## Real World Assets: Precious Metals

DALP tokenizes precious metals with physical custody traceability. Tokens are linked to real-world vault locations and named custodians, enabling 18-decimal fractional ownership of gold, silver, platinum, and palladium.

![DALP tokenizes precious metals with real-world custody traceability, from Brinks Gold Tokens (London vaults) to Loomis Silver Tokens, enabling 18-decimal fractional ownership of gold, silver, platinum, and palladium.](../../shared/brand/dalp-screenshots/11 - Precious Metals/Precious Metals Listing.png)

Each precious metal token carries physical custody metadata, explicitly linking the digital token to its storage location and custodian.

![DALP precious metal tokens carry physical custody metadata, the Brinks Gold Token is explicitly linked to London vault storage and a named custodian, creating a verifiable on-chain record of physical gold custody.](../../shared/brand/dalp-screenshots/11 - Precious Metals/Precious Metal 1.png)

## Real World Assets: Real Estate

Real estate tokenization in DALP demonstrates the platform's capacity for rich metadata capture. Properties are tokenized with GPS coordinates, property classification, administrative area codes, building specifications, and unique real estate numbers. The Asset Designer captures these during creation, linking the digital token to verifiable physical attributes.

![DALP's real estate tokenization wizard configures the Doha Business Towers asset (DBT) with 4-decimal fractional ownership precision under Qatar jurisdiction, ready for regulatory deployment.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 3 - Real Estate Info.png)

![DALP captures detailed real estate metadata during tokenization, including GPS coordinates, property classification, administrative area codes, and a real estate number (REN), linking the digital token to its physical asset.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 4 - Instrument Details.png)

![The DALP real estate tokenization schema captures physical asset specifications, building year, total area (100,000 m²), and unit count (500), ensuring the digital token is fully tethered to verifiable physical attributes.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 4 - Instrument Details Form.png)

Fractional real estate investment is configured through the pricing and valuation step, where a $100,000,000 property is divided into 1,000,000 tokens at $100 each, with automatic total valuation calculation.

![DALP enables fractional real estate investment: a $100,000,000 property is divided into 1,000,000 tokens at $100 each, automatically calculated, making institutional-grade assets accessible to a broader investor base.](../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 5 - Pricing and Valuation.png)

The platform manages globally distributed real estate portfolios across multiple cities, currencies, and jurisdictions.

![DALP manages a globally distributed real estate portfolio, from Bangkok to Brussels, with each property tokenized as individual smart contracts supporting multi-currency pricing and jurisdiction-specific compliance.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate Listing.png)

![DALP's real estate platform supports diverse commercial property portfolios, from Manhattan office towers to Tokyo luxury hotels, with multi-currency pricing (EUR, USD, GBP, JPY, SGD) and full compliance controls.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate Assets - Listing.png)

Individual real estate assets carry the complete property record on-chain, including property type, use classification, district code, and area ID.

![The Brussels Central Apartments DALP asset captures the full property record on-chain: 500 tokens representing a $250M Brussels residential property, with property type, use classification, district code, and area ID.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate 1.png)

The Doha Business Towers asset demonstrates the full depth of DALP's real estate metadata: GPS-mapped location, Real Estate Number, physical area, building year, unit count, and embedded map visualization, all linked to a $100M on-chain asset.

![DALP's Doha Business Towers tokenization demonstrates institutional-grade RWA depth: GPS-mapped location, Real Estate Number (REN), 100,000 m² physical area, building year, unit count, and 4-decimal fractional tokens, all linked to a $100M on-chain asset.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate - Doha Business Towers - Asset Details.png)

---

# Compliance and Regulatory Infrastructure

## Ex-Ante Enforcement: Compliance Before Execution

The most critical architectural decision in DALP's compliance model is where enforcement happens: before execution, not after. Every token transfer, every minting operation, and every investor onboarding passes through a deterministic policy evaluation engine that validates eligibility, identity claims, and jurisdictional constraints at the smart contract layer. If a transfer would violate any configured rule, it reverts atomically. There is never a state where non-compliant tokens exist in an unauthorized wallet.

This ex-ante enforcement model is built on the ERC-3643 (T-REX) standard, an open Ethereum standard designed specifically for regulated securities markets. ERC-3643 mandates four critical additions to standard token contracts: an Identity Registry where every holder must have a verified on-chain identity, a Compliance Engine that evaluates modular rules before each transfer, Trusted Issuers who are the only entities authorized to attest to identity claims, and Transfer Restrictions that go beyond simple balance checks.

DALP implements ERC-3643 through the SMART Protocol (SettleMint Asset Regulatory Technology), a production-hardened framework that adds upgradeable compliance modules, multi-jurisdictional regulatory templates, and richer claim-expression logic than most standard implementations.

## The Compliance Library

DALP ships with pre-built compliance templates covering all major global regulatory frameworks. These are not abstract configurations; they are deployable compliance stacks that institutions can select, customize, and put into operation.

![DALP ships with a pre-built compliance library covering all major global regulatory frameworks, Japan FSA, MAS Singapore, MiCA EU, SEC Reg CF, SEC Reg D 506(b)/(c), and UK FCA, eliminating the need to build compliance from scratch.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Compliance Policy Templates.png)

Each template specifies the exact combination of compliance controls required by its regulatory framework. The MAS Singapore template, for example, enforces four controls simultaneously: SMART identity verification, country allowlisting, investor count limits, and time-locked holding periods, precisely aligned to MAS digital asset regulations.

![DALP's MAS Singapore - Capital Markets template enforces 4 controls simultaneously: SMART identity verification, country allowlisting, investor count limits, and time-locked holding periods, precisely aligned to MAS digital asset regulations.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Compliance Policy Detail 1.png)

The MiCA EU Standard template enforces the full MiCA compliance stack: SMART identity verification, EU country restrictions, and an 8,000,000 EUR per 12-month rolling window supply cap.

![DALP's MiCA EU Standard template enforces the full MiCA compliance stack: SMART identity verification, EU country restrictions, and an 8,000,000 EUR per 12-month rolling window supply cap, meeting MiCA Article 23 requirements out of the box.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Compliance Policy Detail 2.png)

## Custom Compliance Templates

Beyond the pre-built library, organizations can create their own compliance templates for jurisdiction-specific or institution-specific requirements. Creating a new template requires only a name, jurisdiction, and description. Custom templates coexist alongside the DALP Library, identified by an "Organisation" badge for clear source differentiation.

![Beyond the DALP pre-built library, organizations can create custom compliance templates, here a Qatar Real Estate Token template with jurisdiction-specific controls is being developed alongside global regulatory frameworks.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Templates - List.png)

![Creating a new compliance template in DALP requires just a name, jurisdiction, and description, the Qatar Real Estate Token template is created in seconds, ready for custom compliance controls to be added.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Templates - Create From Scratch.png)

## Twelve Compliance Controls

DALP's compliance library offers 12 configurable controls organized across seven categories: Eligibility, Restrictions, Transfer Controls, Issuance and Supply, Time-Based Rules, and Settlement and Collateral. These controls represent the enforceable rule primitives that institutions combine to match their regulatory requirements.

![DALP's compliance library offers 12 configurable controls across 7 categories, eligibility, restrictions, transfer controls, issuance and supply, time-based rules, and settlement and collateral, ready to be combined into custom regulatory templates.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Template - Qatar Real Estate Token - Overview.png)

Each control has a detailed enforcement description, classification tags, and a clear enable/disable workflow with audit logging. Disabling a control requires explicit confirmation, and the change is permanently logged for regulatory traceability.

![DALP's supply cap control enforces a hard maximum on token supply at the smart contract level, preventing any minting beyond the regulatory limit and supporting compliance with issuance restrictions.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Template - Supply Cap Detail.png)

![Compliance control changes in DALP require explicit confirmation and are permanently logged, disabling the Investor Count control triggers an audit-recorded action, ensuring regulatory change management is always traceable.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Template - Investor Count Disable Dialog.png)

Controls are configured with jurisdiction-specific parameters. The investor count control, for example, supports both global limits and per-country limits, enabling precise regulatory compliance per jurisdiction.

![DALP's investor count control allows jurisdiction-specific limits, here Qatar is configured with a maximum of 1,000,000 investors while maintaining no global cap, enabling precise regulatory compliance per country.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Template - Investor Count Config.png)

Supply limit controls support sophisticated time-windowed caps with rolling window enforcement, base price conversion for currency-denominated regulatory limits, and asset-level or issuer-wide scoping.

![DALP's token supply limit control supports sophisticated time-windowed caps, a 10,000,000 token limit per 30-day rolling window can be configured per-asset or issuer-wide, with optional base price conversion for EUR-denominated regulatory limits.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Template - Token Supply Limit Config.png)

The expression builder enables compliance teams to construct investor eligibility rules using visual boolean logic, with real-time validation ensuring that every expression is syntactically and logically complete before deployment.

![DALP's visual expression builder enables compliance teams to construct investor eligibility rules using simple boolean logic, here 'Accredited investor AND KYC' creates a gated compliance requirement with real-time validation.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Policy Template - Expression Builder.png)

## Instrument Templates

Complementing policy templates, DALP provides instrument templates that define the metadata schemas and feature requirements for each asset type. Organizations can create custom instrument templates from the DALP Library base, selecting from available features like Historical Balances, Voting Power, AUM Fee, Maturity Redemption, and Transaction Fee.

![DALP's instrument template library provides pre-configured starting points for all asset types, with instrument-specific features like Maturity Redemption for bonds and Voting Power for funds, customizable to create organization-specific variants.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Instrument Templates - List and Create.png)

Instrument templates include fully customizable metadata schemas. Each field is configured with type (string, number, enum), mutability (immutable or restricted-mutable), and required status, enabling any real-world asset data model.

![DALP's instrument template engine supports fully customizable metadata schemas, each field configured with type (string, number, enum), mutability (immutable/restricted-mutable), and required status, enabling any real-world asset data model.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Instrument Template - Add Metadata Field.png)

The metadata schema combines immutable fields with restricted-mutable fields, ensuring core asset classification is locked while operational details remain updatable by authorized parties.

![Qatar Real Estate Token's metadata schema combines immutable fields (property type, use) with restricted-mutable fields (city, coordinates, district), ensuring core property classification is locked while operational details remain updatable.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Instrument Template - Qatar Real Estate - Metadata Schema.png)

![DALP's metadata schema allows field-level configuration, the 'city' field is marked as restricted-mutable (updateable by authorized parties) and optional, providing the right balance of flexibility and data control for real estate operations.](../../shared/brand/dalp-screenshots/14 - Compliance and Policy Templates/Instrument Template - Metadata Field City Config.png)

---

# Identity and Verification

## OnchainID: The Trust Anchor

Every participant in DALP, whether an individual investor, an institutional entity, or a smart contract, is represented by an on-chain identity contract based on the OnchainID protocol (ERC-734/ERC-735 standards). This is not a self-sovereign identity wallet in the consumer sense; it is a platform-managed identity contract that serves as the trust anchor for all compliance decisions.

The critical design property is that claims are issued by trusted third parties, not self-asserted. A wallet holder cannot declare themselves accredited or KYC-verified. A registered trusted issuer must attest to that fact by writing a signed claim to the holder's OnchainID contract. This mirrors how financial services actually work: eligibility is determined by regulated intermediaries, not by the investor themselves.

Every DALP user has an on-chain identity contract with a QR code, registration status, country code, and active compliance verifications stored immutably.

![Every DALP user has an on-chain identity contract, a cryptographic identity deployed on the blockchain with a QR code, registration status, country code, and active compliance verifications (AML, KYC) stored immutably.](../../shared/brand/dalp-screenshots/15 - Identity and Verification/Onchain Identity.png)

## User and Participant Management

DALP maintains a participant directory where each user has both a blockchain wallet (EOA) and a dedicated on-chain identity contract. Role types, including Investor and Trusted Issuer, govern which compliance capabilities each participant can exercise.

![DALP maintains a full participant directory, each user has both a blockchain wallet (EOA) and a dedicated on-chain identity contract, with role types (Investor, Trusted issuer) governing compliance capabilities.](../../shared/brand/dalp-screenshots/15 - Identity and Verification/User.png)

## Verification Topics and Trusted Issuers

The verification topic registry defines the claim types available for on-chain identity attestation. DALP ships with standard compliance topics (AML, Accredited Investor, Asset Classification) alongside platform-extensible custom topics for domain-specific use cases. System topics are immutable; custom topics can be created by organizations.

![DALP's verification topic registry defines the claim types available for on-chain identity attestation, combining standard compliance topics (AML, Accredited investor, Asset classification) with platform-extensible custom topics for domain-specific use cases.](../../shared/brand/dalp-screenshots/15 - Identity and Verification/Verification Topics.png)

The verification system extends to asset-level attestations. Each real estate asset, for example, carries eight distinct on-chain verifications covering GPS coordinates, property classification, physical specifications, price, and unique identifier, all cryptographically attested by authorized issuers.

![DALP creates a complete on-chain attestation record for every real estate asset, GPS coordinates, property classification, physical specifications, price, and unique identifier are all cryptographically attested by authorized issuers via ONCHAINID.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate - Doha Business Towers - Verifications.png)

Issuer verification workflows allow issuers to attach regulatory license attestations directly to asset contracts on-chain, verifying issuer licensing credentials through the SMART identity verification system.

![DALP's compliance engine allows issuers to attach regulatory license attestations directly to bond contracts on-chain, verifying issuer licensing credentials through the SMART identity verification system.](../../shared/brand/dalp-screenshots/06 - Bonds/Bonds Detail 4.png)

## Claims and Continuous Compliance

Claims are checked at execution time, not only at onboarding. This means expired claims fail, revoked claims fail, and claims from issuers that lost trust fail. An investor who was eligible yesterday may not be eligible today. This continuous compliance model is exactly what regulated institutions need: eligibility is a live condition, not a one-time checkbox.

The three-tier trusted issuer resolution model provides hierarchical trust: subject-scoped (most specific), system-scoped (mid-level), and global (broadest). Resolution follows a "most specific wins" model, allowing institutions to maintain a general trust framework while accommodating specific exceptions.

---

# Settlement and Corporate Actions

## Atomic DvP with XvP Settlement

Institutions require settlement finality without counterparty risk, something traditional T+2 clearing cycles cannot deliver. DALP's atomic Delivery-versus-Payment (DvP) settlement ensures that asset and cash transfer simultaneously or both revert, achieving true T+0 finality.

The XvP (Exchange vs Payment) settlement module extends this to multi-party, multi-asset atomic settlement. The XvP wizard configures settlement in three steps: define asset flows, configure settlement parameters, and review before execution.

![DALP's XvP (Exchange vs Payment) settlement wizard configures atomic multi-leg transactions, Step 1 defines the first leg: Quinn Walker sends Deutsche Bank Euro Deposit tokens to Emma Chen in a local on-chain transfer.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XVP Setup 1.png)

Settlement configuration includes expiry dates, auto-execute flags, and HTLC (Hash Time-Locked Contract) security for cross-chain settlement. The hashlock/secret mechanism ensures that cross-chain atomic execution is secured by blockchain cryptography.

![DALP's XvP settlement uses HTLC (Hash Time-Locked Contract) security, a hashlock configures the cross-chain atomic execution, while auto-execute and expiry date parameters control settlement lifecycle management.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XVP Setup 2.png)

The review step shows the complete settlement structure. A two-leg XvP atomically links a local transfer of 100,000 Deutsche Bank Euro Deposit tokens with a cross-chain transfer of 500 tokens, all or nothing.

![DALP's XvP settlement atomically links two legs: Quinn Walker sends 100,000 Deutsche Bank Euro Deposit tokens to Emma Chen (local chain), while Emma Chen simultaneously delivers 500 cross-chain tokens to Hans Mueller, all or nothing, fully atomic.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XVP Setup 3.png)

The settlement review confirms the HTLC hashlock and parameters. Once created, the settlement is secured by blockchain cryptography and can only execute when the pre-image secret is revealed by the counterparty.

![The XvP settlement review confirms the HTLC hashlock and settlement parameters, once created, the settlement is secured by blockchain cryptography and can only execute when the pre-image secret is revealed by the counterparty.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XVP Setup 4.png)

## Settlement Lifecycle Management

After creation, settlements enter a Pending state, tracked through a multi-party approval workflow. DALP displays the approval status, hashlock, and settlement parameters, surfacing cross-chain execution warnings for secure settlement management.

![After creation, an HTLC XvP settlement enters Pending state, DALP tracks approvals from each counterparty (Quinn Walker's approval awaited), displays the hashlock, and surfaces cross-chain execution warnings for secure settlement management.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XVP Details 1.png)

For multi-party settlements, DALP tracks approval progress across all counterparties and surfaces expiry warnings, ensuring all parties can monitor settlement progress and respond before deadlines.

![DALP's XvP settlement management tracks multi-party approvals, surfaces expiry warnings, and displays bilateral asset flows, ensuring all parties can monitor settlement progress and respond before deadlines.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XVP Details 2.png)

## Programmatic Settlement Access

The XvP settlement module is fully API-accessible, enabling integration with existing trading systems, order management systems, and settlement workflows.

![DALP's XvP settlement is fully API-accessible, the REST API documentation exposes all settlement operations programmatically, enabling direct integration with existing trading systems, OMS, and settlement workflows.](../../shared/brand/dalp-screenshots/16 - XVP Settlement/XvP API Light.png)

## Corporate Actions

DALP automates corporate actions through a combination of token features and operational workflows. Bond coupon payments use the Fixed Treasury Yield feature with pull-based distribution: holders or custodians claim their accrued yield, avoiding the gas cost and operational complexity of push-based distribution to thousands of holders.

The Actions queue tracks all scheduled on-chain operations. Upcoming yield claims span the full lifecycle of each bond, automating coupon payments without manual intervention.

![DALP's Actions queue tracks all scheduled on-chain operations, shown here, five annual yield claim actions for Sovereign Bond 2029 span the bond's full 5-year lifecycle, automating coupon payments without manual intervention.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Actions.png)

## Asset Servicing Operations

Token minting, the primary issuance operation, is executed through the asset detail page with recipient selection, amount input, and a two-step confirmation process.

![DALP's token minting workflow allows asset administrators to create and assign new tokens directly from the asset detail page, with recipient selection, amount input, and a two-step confirmation process.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate - Doha Business Towers - Mint Tokens.png)

![Once a recipient is selected and amount confirmed, DALP's minting form activates the Continue button, guiding the administrator to a confirmation step before tokens are issued on-chain.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate - Doha Business Towers - Mint Tokens Confirm.png)

On-chain data feeds per asset enable real estate tokens to receive live price updates, valuation changes, or custom data streams through a built-in feed registry.

![DALP supports on-chain data feeds per asset, enabling real estate tokens to receive live price updates, valuation changes, or custom data streams through a built-in feed registry.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate - Doha Business Towers - Create Data Feed.png)

Every operation on a real estate token is permanently recorded on-chain with timestamps and sender addresses, providing an immutable audit trail.

![Every operation on a DALP real estate token, minting, transfers, compliance changes, is permanently recorded on-chain with timestamps and sender addresses, providing an immutable audit trail.](../../shared/brand/dalp-screenshots/12 - Real Estate/Real Estate - Doha Business Towers - Events.png)

---

# Monitoring and Operations

## API Monitoring

DALP includes built-in API monitoring without requiring third-party tooling. The monitoring dashboard tracks total requests, error rates (broken down by 4xx and 5xx categories), and response time percentiles, all with live data freshness indicators.

![DALP's built-in API monitoring: 694 requests tracked over 24 hours with a 1.2% error rate, live response time percentiles, and a real-time traffic chart, providing full operational observability without third-party tooling.](../../shared/brand/dalp-screenshots/20 - Monitoring/API Monitoring - Overview.png)

Individual request inspection provides deep API observability: every request is inspectable with full headers, caller identity, IP address, and response details, enabling rapid troubleshooting and security audit of all platform API access.

![DALP's request log provides deep API observability, every request is inspectable with full headers, caller identity, IP address, and response details, enabling rapid troubleshooting and security audit of all platform API access.](../../shared/brand/dalp-screenshots/20 - Monitoring/API Monitoring - Request Log.png)

## Blockchain Monitoring

The blockchain monitoring dashboard provides real-time health tracking of the chain RPC node and the indexer, with 24-hour historical health trends. Monitoring refresh rates of 10 seconds and hysteresis-based health classification (requiring three consecutive samples before status changes) ensure that transient issues do not generate false alerts.

![DALP's blockchain monitoring provides real-time health tracking of both the chain RPC node (Block #18,173, head age 17s) and the indexer (0 blocks behind), with 24-hour historical health trends ensuring proactive infrastructure management.](../../shared/brand/dalp-screenshots/20 - Monitoring/Blockchain Monitoring.png)

## Activity Logs and Audit Trail

DALP maintains a complete, color-coded on-chain audit trail. Every action, from identity verification and role grants to asset creation, compliance events, and transfers, is permanently recorded with timestamps, transaction hashes, and gas costs. Event categories are color-coded (Identity, Access Control, Assets, System, Transfers) for rapid visual scanning during compliance audits.

![DALP's activity log provides a complete, color-coded on-chain audit trail, every action (identity verification, role grant, asset creation, compliance event) is permanently recorded with timestamps, transaction hashes, and gas costs.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Activity Log.png)

The real-time activity feed captures every blockchain transaction, including XvP settlement creation, identity verification, compliance events, and token transfers, with live gas costs and block numbers providing full on-chain transparency.

![DALP's real-time activity feed captures every blockchain transaction, from XvP settlement creation to identity verification and token transfers, with live gas costs and block numbers providing full on-chain transparency.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Activity.png)

---

# Platform Administration

## API Key Management

DALP issues named API keys with strict security practices. Keys are displayed only once at creation time and cannot be retrieved again, following the principle that secrets should have a single point of exposure.

![DALP issues named API keys with strict single-exposure security controls, keys are displayed once at creation and cannot be retrieved again, ensuring secure programmatic access to all platform capabilities.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/API Keys.png)

API keys follow the principle of least privilege. Each integration receives only the permissions it requires. Read-only keys are restricted to GET/HEAD/OPTIONS methods; read-write keys can execute mutations. Keys are rate-limited to 10,000 requests per 60-second window per key.

## Modular Addon Architecture

DALP's addon system extends core tokenization capabilities through smart contract-deployed modules. Available addons include gasless permits, fixed yield schedules, maturity redemption, transaction fee accounting, and settlement modules. Each addon is deployed as a smart contract and can be toggled without platform redeployment.

![DALP's modular addon architecture extends core tokenization capabilities, from gasless permits and fixed yield schedules to maturity redemption and transaction fee accounting, each deployed as smart contracts and toggleable without redeployment.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Addons.png)

## White-Label Branding

DALP supports full white-label branding. Institutions can upload custom logos for light and dark modes, configure color palette tokens, and preview real UI components in real time. The branding extends to every touchpoint: favicons, Apple touch icons, and the login page are all fully customizable.

![DALP supports full white-label branding, upload custom logos for light/dark modes, configure color palette tokens, and preview real UI components in real-time, enabling any financial institution to brand the platform as their own.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Theme 1.png)

![DALP's branding extends to every touchpoint, favicons, Apple touch icons, and the login page are all fully customizable, ensuring investors and issuers see a consistent, institution-branded experience from first login.](../../shared/brand/dalp-screenshots/19 - Settings and Admin/Theme 2.png)

---

# Analytics and Insights

## Asset-Level Analytics

DALP provides asset-level analytics that combine geographic mapping with token metrics. For real estate assets, the analytics view shows property location on a map alongside 30-day token supply history, mint/burn activity, transaction volume, and wallet distribution charts.

![DALP provides detailed asset-level analytics including geographic mapping, 30-day supply history, mint/burn activity, transaction volume, and wallet distribution, all in a single unified dashboard.](../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard - Map and Statistics.png)

![DALP's asset analytics dashboard combines precise geolocation with detailed token metrics, from minting history to holder distribution, for full asset lifecycle visibility.](../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard - Map and Statistics 2.png)

## Portfolio-Level Insights

The Insights dashboard aggregates analytics across all managed assets, providing a portfolio-level view of total value, pending launches, and multi-dimensional asset distribution.

![DALP's Asset Insights dashboard provides a real-time portfolio overview across all 64 managed assets, $142.6M total value, distributed across 7 instrument types, with multi-dimensional analytics breaking down composition by instrument, supply, and asset class.](../../shared/brand/dalp-screenshots/21 - Insights/Insights - Asset Overview.png)

---

# Architecture and Security

## Four-Layer Architecture

DALP is built as a four-layer stack with distinct responsibility boundaries at each level:

**Application Layer**: The DALP dApp, a full decentralized application built with React, provides the operational interface for asset lifecycle management, compliance workflows, portfolio views, system monitoring, and the Asset Designer wizard. The application supports internationalization with four locales (en-US, de-DE, ar-SA, ja-JP) including right-to-left layout support, and uses arbitrary-precision arithmetic for all financial calculations.

**API Layer**: The Unified API exposes all platform capabilities through a type-safe interface with OpenAPI 3.1 specifications. A dual-endpoint architecture separates browser sessions (/api/rpc) from programmatic access (/api/v2), creating a hardened security boundary. The public TypeScript SDK (@settlemint/dalp-sdk) provides the recommended programmatic integration surface.

**Middleware Layer**: The Execution Engine (Restate) provides durable workflow orchestration with persistent state and exactly-once semantics. Key Guardian manages cryptographic key storage with HSM and cloud KMS integration. The Transaction Signer handles EIP-1559 gas pricing and meta-transactions. The Chain Indexer processes blockchain events into a queryable state projection.

**Smart Contract Layer**: All contracts are built on the SMART Protocol (ERC-3643) with the five-layer on-chain architecture: SMART Protocol foundation, Global infrastructure, System-level identity and compliance, Asset contracts (DALPAsset and legacy types), and Addon contracts for settlement, distribution, and treasury operations.

## EVM-Native Design

DALP targets exclusively EVM-compatible blockchains. This is a deliberate architectural decision driven by the EVM ecosystem's maturity in tooling, audited contract libraries, and institutional adoption. ERC-3643 (the compliance standard), ERC-20, ERC-734/735 (OnchainID), and ERC-2771 (meta-transactions) are all EVM-native standards that would require fundamental rewrites on non-EVM chains.

The platform operates on any blockchain that implements the Ethereum JSON-RPC specification, including Layer 1 mainnets (Ethereum, Polygon, Avalanche, BNB Smart Chain), Layer 2 rollups (Arbitrum, Optimism, Base, zkSync Era, Polygon zkEVM), and private/consortium networks (Hyperledger Besu with IBFT 2.0 or QBFT, Go-Ethereum with private PoA). No application code changes are required when switching networks.

## Defense-in-Depth Security

Security is enforced at every layer independently, so no single-layer failure grants unauthorized access:

**Layer 1: Authentication.** Better Auth with support for email/password, passkeys (WebAuthn), LDAP/Active Directory, OAuth 2.0/OIDC, and SAML 2.0. Sessions use HTTP-only cookies with SameSite protection and 7-day expiry with 24-hour refresh windows.

**Layer 2: Authorization.** A dual-layer permission model where off-chain platform roles (managed by Better Auth) and on-chain roles (managed by the AccessManager contract) must both pass for any blockchain write operation. 26 distinct roles across four layers enforce granular separation of duties.

**Layer 3: Wallet Verification.** Step-up authentication for all blockchain write operations via PIN, TOTP, or backup codes. Even with a valid session, no on-chain transaction executes without wallet verification.

**Layer 4: Compliance Enforcement.** ERC-3643 compliance modules validate every transfer against identity, jurisdiction, and policy rules at the smart contract level.

**Layer 5: Custody Policy.** External custody providers (Fireblocks, DFNS) impose additional approval gates for custody-backed signing flows.

## Certifications

SettleMint maintains ISO 27001 and SOC 2 Type II certifications, confirming that security controls are independently audited and continuously maintained. The platform undergoes regular penetration testing, security assessments by independent third parties, and smart contract security audits by specialized blockchain security firms.

---

# Integration and API

## API-First Design

DALP is designed as an API-first platform. Every capability available through the web interface is accessible programmatically through the Unified API. This includes asset lifecycle operations, compliance management, identity administration, settlement workflows, monitoring, and system administration.

The API provides three integration methods:

**REST API (OpenAPI 3.1)**: The primary integration surface for system-to-system connectivity. Interactive exploration is available through Swagger UI at the /api endpoint. API keys follow the "sm_atk_" prefix format and are rate-limited to 10,000 requests per 60-second window.

**TypeScript SDK (@settlemint/dalp-sdk)**: The recommended integration path for TypeScript/Node.js applications. The SDK provides a typed client factory with automatic serialization of blockchain value types, supporting all API namespaces.

**Event Webhooks**: Event-driven notifications for transaction confirmations, compliance state changes, and asset lifecycle events. Webhooks enable real-time integration with core banking systems, custody platforms, and reporting infrastructure.

DALP also supports meta-transactions through ERC-2771 integration, allowing callers to submit signed transaction payloads without holding native tokens for gas. A configured relayer service sponsors transaction costs, enabling gasless workflows for investors and automated systems.

---

# Deployment Model

## Flexible Infrastructure Options

DALP supports four deployment models, each delivering the same platform capabilities: the same lifecycle modules, compliance engine, settlement protocols, observability stack, and API surface. The choice of model is driven by institutional requirements around data sovereignty, security posture, and regulatory constraints.

**Managed SaaS**: SettleMint operates the full platform on dedicated cloud infrastructure. Fastest path to production with lowest operational overhead. Dedicated tenant environments (not multi-tenant shared infrastructure) with configurable data residency by region.

**Private Cloud**: DALP deployed within the client's own cloud environment (AWS, Azure, GCP) using Helm charts. Full infrastructure control with SettleMint platform support.

**On-Premises**: Full deployment within the client's data center. Air-gap capable for environments requiring complete network isolation. Required by sovereign entities and institutions with strict data sovereignty mandates.

**Hybrid**: Component-level deployment flexibility. The application layer may run in private cloud while blockchain nodes and key management operate on-premises, or the primary environment may be on-premises with a managed SaaS disaster recovery site.

All models support Kubernetes and OpenShift. Backup and disaster recovery configurations respect the same data residency boundaries as primary data. An institution in Abu Dhabi can run DALP entirely within UAE infrastructure, an EU bank can ensure all data stays within EU borders, and a Singapore-based fund can deploy within MAS-compliant infrastructure, all using the same platform version with no feature differences.

---

# Implementation Approach

## Structured Delivery Methodology

SettleMint follows a structured, phase-gated implementation methodology refined through production deployments with regulated banks, market infrastructure providers, and sovereign entities. The standard implementation spans 19 weeks from kickoff to the end of hypercare, organized into five delivery phases:

**Phase 1: Discovery and Requirements (Weeks 1-2)**: Stakeholder interviews, current-state assessment, regulatory and compliance mapping, asset class scoping, and architecture design. Deliverables include a validated Business Requirements Document, Regulatory and Compliance Matrix mapped to DALP modules, Target Architecture Document, and Implementation Roadmap.

**Phase 2: Foundation and Setup (Weeks 3-5)**: Environment provisioning, network setup, and identity framework deployment. Functional platform environments ready for configuration.

**Phase 3: Configuration and Compliance (Weeks 6-9)**: Asset types, compliance modules, feeds, and operational workflows configured to match business and regulatory requirements.

**Phase 4: Integration and Testing (Weeks 10-13)**: System integration with core banking, custody, and identity providers. Functional, security, performance, and user acceptance testing. Formal go-live readiness assessment.

**Phase 5: Go-Live and Hypercare (Weeks 14-19)**: Production deployment (2 weeks) followed by intensive post-go-live support (4 weeks) with knowledge transfer and support transition.

Each phase concludes with a formal gate review. Progression requires sign-off on defined deliverables and acceptance criteria from both SettleMint and the client organization.

---

# Why DALP

## Solving the Complexity of Doing It Right

The challenge that DALP addresses is not a technology gap. It is a complexity gap. Financial institutions do not fail at tokenization because they cannot deploy a smart contract. They fail because the gap between a working demo and a program that satisfies regulators, risk committees, compliance officers, and operations teams is wider than most organizations anticipate.

DALP closes that gap through six reinforcing capabilities:

**Configuration, not custom development.** Seven asset types, twelve compliance modules, eleven token features, and pre-built regulatory templates for MiCA, MAS, Japan FSA, SEC Reg CF, Reg D 506(b)/(c), and UK FCA. Institutions configure deployable instruments in hours, not months. Every component is pre-audited; composing audited modules does not require re-auditing the composition.

**Compliance enforced before execution, not after review.** The ERC-3643/T-REX standard with DALP's SMART Protocol ensures that every transfer is validated against identity claims, jurisdictional constraints, and policy rules at the smart contract layer. Non-compliant states cannot exist on-chain. This is what regulators actually expect: deterministic enforcement, not advisory flags.

**Full lifecycle management, not just issuance.** DALP covers the entire digital asset lifecycle: design, issuance, distribution, trading, corporate actions (coupon payments, dividends, redemptions), compliance monitoring, and retirement. Most tokenization platforms stop at issuance; the operational work of managing assets through their lifecycle is where most institutional effort concentrates.

**Atomic settlement without counterparty risk.** DvP and XvP settlement ensures both legs of a transaction complete together or both revert. Cross-chain settlement is secured by HTLC cryptography. There is never a state where one party has delivered but not received payment.

**Governance and security built for regulation.** 26 roles across four layers enforce separation of duties. Five independent security layers (authentication, authorization, wallet verification, compliance enforcement, custody policy) provide defense-in-depth. ISO 27001 and SOC 2 Type II certified operations. Deployment flexibility across managed SaaS, private cloud, on-premises, and hybrid configurations, your infrastructure, your data, your branding.

**Platform, not consulting.** DALP is a configurable software platform. Institutions operate it themselves, building internal capability rather than dependency on external developers. Predictable licensing costs replace open-ended consulting fees. Faster time-to-value because the platform is pre-built, not built-to-order.

This is what it takes to do tokenization right: not just the technology to create digital assets, but the infrastructure to operate them at production scale, under regulation, with the governance and auditability that institutional environments demand.

DALP provides that infrastructure, ready from day one.
