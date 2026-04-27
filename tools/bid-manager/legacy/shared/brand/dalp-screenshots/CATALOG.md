# DALP Screenshot Catalog

**Last updated:** 2026-03-25
**Total screenshots:** ~297 (PNG) + ~298 (JPG) = ~595 files
**Purpose:** Production proposal system reference — visual evidence of DALP capabilities

> **⚠️ Structure Change (2026-03-25):** Major reorganization. All folders renumbered and new sections added.
> See Rename Log at the bottom for the full change history.
> All folders use `png/` and `jpg/` subfolders.
> PNG files are in `<category>/png/`, JPG files in `<category>/jpg/`.
> When referencing images in slide configs, use the `jpg/` subfolder paths.

---

## Quick Reference Index

| Screenshot | Best For |
|---|---|
| `04 - Asset Designer/jpg/Asset Designer - Step 6 - Compliance Modules.jpg` | Global compliance framework selection |
| `04 - Asset Designer/jpg/Asset Designer - Step 5 - Pricing and Valuation.jpg` | Fractional ownership / $100M property at $100/token |
| `04 - Asset Designer/jpg/Asset Designer Compliance Expression.jpg` | Complex compliance rules (institutional) |
| `14 - Compliance and Policy Templates/jpg/Compliance Policy Templates.jpg` | Full global regulatory coverage at a glance |
| `14 - Compliance and Policy Templates/jpg/Compliance Policy Detail 2.jpg` | MiCA EU Standard specific compliance |
| `14 - Compliance and Policy Templates/jpg/Compliance Policy Detail 1.jpg` | MAS Singapore Capital Markets compliance |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Verifications.jpg` | On-chain attestation / provenance depth |
| `16 - XVP Settlement/jpg/XVP Setup 3.jpg` | Cross-chain atomic settlement |
| `02 - Dashboard/jpg/Dashboard 1.jpg` | Platform command center / first impressions |
| `04 - Asset Designer/jpg/Asset Insights.jpg` | $13B+ AUM at scale |
| `02 - Dashboard/jpg/Dashboard 3.jpg` | Identity/compliance engine scale |
| `06 - Bonds/jpg/Bonds Detail 2.jpg` | Automated yield/coupon distribution |
| `07 - Equity/jpg/Equity Detail 1.jpg` | Collateral management |
| `15 - Identity and Verification/jpg/Verification Topics.jpg` | Identity infrastructure depth |
| `19 - Settings and Admin/jpg/Addons.jpg` | Modular platform architecture |
| `19 - Settings and Admin/jpg/Theme 1.jpg` | White-labeling capability |
| `20 - Monitoring/jpg/API Monitoring - Overview.jpg` | Enterprise-grade operations |
| `20 - Monitoring/jpg/Blockchain Monitoring.jpg` | Infrastructure reliability |
| `04 - Asset Designer/Bond Tokenisation/jpg/` | Full bond tokenisation wizard (20 steps) |
| `05 - Asset Operations/Forced Transfer/jpg/` | Forced transfer workflow (6 steps) |
| `17 - Addons/Exchange XvP/jpg/` | XvP addon flow (7 screens) |

---

## 01 - Login

### Login.png

- **Description:** The DALP platform sign-in page. A centered card with the SettleMint logo and branding, featuring Email field (required, with blue focus outline active), Password field (with eye icon for visibility toggle), a full-width blue "Login" button, and an alternative "Passkey" authentication button. A "Don't have an account? Sign up" link is present. The background is a blue-green-teal diagonal gradient. The SettleMint logo (3D cube icon + wordmark) appears in the top-left. A TanStack framework badge is visible in the bottom-right corner.
- **Key features visible:**
  - Passkey (passwordless) authentication option alongside traditional email/password
  - Clean secure authentication UI with branded gradient background
  - Sign-up flow entry point
- **Proposal sections:** Platform Overview, Security & Access Control, Technical Architecture
- **Usage guide:** Use at the very beginning of any product walkthrough section to establish the platform entry point. Demonstrates multi-factor authentication options (including passkeys) as a security story. Good for sections covering security and onboarding.
- **Caption:** "DALP provides a secure login experience with support for passwordless passkey authentication alongside traditional email/password credentials."

---

## 02 - Dashboard

**New files added (2026-03-25):** Dashboard 01.jpg, Dashboard 02.jpg, Dashboard 03.jpg (from batch2)

### Dashboard 1.png

- **Description:** The main Administration dashboard, upper portion. Shows the top navigation bar with SettleMint logo, search bar (⌘K), and System Admin profile. The left sidebar is fully expanded showing: Dashboard (active), Actions (badge: 1), Activity, My assets (My assets, Insights), Asset management (Asset designer, Fixed income→Bonds, Flexible income→Funds/Equities, Cash equivalent→Stablecoins/Deposits, Real world asset). Main content shows: (1) Alert banner "1 pending actions require your attention", (2) Portfolio Summary card — $276,130,000.00 total, 7 assets, +100.0%/7d, (3) Asset Manager card — AUM 13.2B USD, donut chart, 70 active assets. Right panel shows Latest Activity feed with tabs (All activity, My actions, System events) and recent blockchain events (XvP Settlement Created, Identity verified, Country updated, Identity stored).
- **Key features visible:**
  - Real-time portfolio valuation ($276M displayed)
  - AUM tracking (13.2B USD platform-wide)
  - Pending action notifications with inline alert
  - Multi-category asset management hierarchy in sidebar
  - Live blockchain activity feed with event categorization
  - Donut chart for asset distribution visualization
- **Proposal sections:** Platform Overview, Portfolio Management, Dashboard & Analytics
- **Usage guide:** Use as the hero "first impressions" screenshot showing the platform's command-center feel. Ideal for executive summaries and platform overview sections. Demonstrates breadth of asset types managed from a single interface and real-time monitoring capabilities.
- **Caption:** "The DALP Administration Dashboard provides a real-time command center: portfolio valuation, AUM tracking, pending action alerts, and a live blockchain activity feed — all in one view."

### Dashboard 2.png

- **Description:** Same dashboard scrolled down slightly to reveal additional management modules. Portfolio card ($276,130,000.00) and Asset Manager card (AUM 13.2B, 70 active) remain visible. Two new cards come into view: Identity Manager card (badge: "1 pending verification", description: "Manage participant identities and registrations") and Verification Policy Manager card ("Oversee trusted verification issuers and policy activity"). Activity feed now shows additional entries: Verification added, Contract identity created.
- **Key features visible:**
  - Identity manager module with pending verification indicator
  - Verification policy manager integration
  - Modular dashboard card layout showing different management domains
- **Proposal sections:** Identity & Compliance, KYC/AML Management, Platform Overview
- **Usage guide:** Use to show the identity management layer within the main dashboard — good for compliance-heavy proposals or when identity/KYC is a key requirement. Demonstrates that compliance is not an afterthought but a first-class dashboard module.
- **Caption:** "The DALP Dashboard integrates identity management and compliance verification directly into the operator's daily workflow, with real-time pending alerts for KYC/AML verification actions."

### Dashboard 3.png

- **Description:** Dashboard scrolled further to reveal identity and verification statistics. Shows: Identity Manager card fully visible — 39 active identities, +100.0%/7d, "39 active · 1 pending verification". Verification Policy Manager card — 4 active issuers, +4 added (7d). Verification Issuer card — 384 active verifications, +384 issued (7d), 0 revoked, vertical bar chart. Next Steps card with "Getting started" guide link. Partial world map ("Assets by jurisdiction") visible at bottom. Activity feed now shows Compliance and Transfers events (Transfer completed entries).
- **Key features visible:**
  - 39 managed on-chain identities
  - 4 trusted issuers in the verification ecosystem
  - 384 active verifications issued
  - Geographic asset distribution map preview
  - Compliance and transfer event categories in activity feed
- **Proposal sections:** Identity & KYC, Compliance Infrastructure, Scale & Capacity
- **Usage guide:** Use to demonstrate the scale of the identity/compliance engine. The 384 verifications and 4 trusted issuers numbers help convey a production-ready system. Ideal for RFPs requiring KYC/AML compliance evidence.
- **Caption:** "DALP's identity engine manages 39 on-chain identities across 4 trusted issuers, with 384 active compliance verifications — providing the regulatory backbone for all asset transfers."

### Dashboard 4.png

- **Description:** Bottom section of the dashboard showing the "Assets by jurisdiction" choropleth world map. Countries are shaded in varying intensities of blue based on asset concentration (darker = more assets). Darkest shading visible in Middle East and parts of Africa/Asia. Map is rendered with Leaflet/OpenStreetMap. Also shows the bottom of the Verification Issuer card (384 active verifications, "View identity insights" button) and Next Steps card with "Getting started" link and "View all guides" button.
- **Key features visible:**
  - Interactive world map showing geographic distribution of tokenized assets
  - Country-level asset concentration heat map
  - Self-serve documentation / getting started resources
- **Proposal sections:** Geographic Reach, Multi-Jurisdiction Support, Global Compliance
- **Usage guide:** Use in proposals requiring multi-jurisdiction coverage or global market access. The heat map visually proves that DALP manages assets across multiple countries with compliance differentiated by jurisdiction. Strong visual for Middle East / cross-border asset issuance proposals.
- **Caption:** "DALP's geographic jurisdiction map provides instant visibility into where tokenized assets are held and traded globally, supporting multi-jurisdiction regulatory compliance and cross-border asset distribution."

### Dashboard - Map and Statistics.png

- **Description:** Asset detail analytics view combining a geographic map and four statistical charts. Map shows the Doha, Qatar area (Arabic street labels visible) with a blue location pin marker and pink/red administrative boundary highlights. OpenStreetMap tiles. Below the map, four statistics cards: (1) Token supply history (line chart, 0–1M, Feb 10–Mar 12, spike to ~1M around Mar 10-12); (2) Supply changes (bar chart, minted/burned, same period, ~1M minted); (3) Transaction volume (line chart); (4) Wallet distribution (horizontal bar chart, showing concentration). User is Ada Admin (admin@settlemint.com).
- **Key features visible:**
  - Property-level geographic mapping with precise location pin
  - 30-day token supply history tracking
  - Minting/burning activity visualization (supply changes)
  - Transaction volume tracking
  - Wallet distribution / ownership concentration analysis
- **Proposal sections:** Analytics & Reporting, Asset Monitoring, Investor Analytics
- **Usage guide:** Use for analytics/reporting sections or when demonstrating the depth of data available per asset. The map + stats combination is especially powerful for real estate tokenization proposals.
- **Caption:** "DALP provides comprehensive asset-level analytics including geographic mapping, 30-day supply history, mint/burn activity, transaction volume, and wallet distribution — all in a single unified dashboard."

### Dashboard - Map and Statistics 2.png

- **Description:** Nearly identical to "Dashboard - Map and Statistics.png" — same Doha/Qatar area map with blue location pin, same four statistical charts with the same data patterns. Minor difference: the sidebar shows a slightly different scroll position.
- **Key features visible:** Same as Dashboard - Map and Statistics.png
- **Proposal sections:** Analytics & Reporting, Asset Monitoring
- **Usage guide:** Use as an alternative to "Dashboard - Map and Statistics.png" when a slightly different sidebar state is desired. Functionally equivalent for proposal use.
- **Caption:** "DALP's asset analytics dashboard combines precise geolocation with comprehensive token metrics — from minting history to holder distribution — for full asset lifecycle visibility."

### Dashboard 01.jpg / Dashboard 02.jpg / Dashboard 03.jpg

- **Description:** Three new dashboard screenshots from the 2026-03-25 batch. Full-screen dashboard views showing updated UI with current data.
- **Proposal sections:** Platform Overview, Dashboard & Analytics
- **Usage guide:** Use for the most current dashboard screenshots in proposals. These supersede earlier dashboard screenshots for visual freshness.
- **Caption:** "DALP's administration dashboard provides real-time visibility across all platform operations."

---

## 03 - My Assets

**New section (2026-03-25).** Files moved from old `03 - Asset Designer` plus new files from batch2.

### My Assets.jpg

- **Description:** "My Assets" page showing the current user's personal asset portfolio as a table. Three summary cards at top: Total value = $276,130,000.00 (+100.0%/7d), Total assets = 7 (1 fund $1M, 1 bond $10K, 1 stablecoin $10K, 1 deposit $110K, 1 precious metal $20M, 1 equity $5M, 1 real estate $250M), Asset classes = 4 (Flexible income 2, Fixed income 1, Cash equivalent 2, Real world asset 2). Table showing 3 visible assets: Brussels Central Apartments (BCAPT), Tether (USDT), Proof-of-Deposit (partially visible). Columns: Contract Address, Symbol, Balance, Available, Frozen, Total Supply, Actions.
- **Key features visible:**
  - Personal asset portfolio view filtered to current user's holdings
  - Balance, available, frozen token tracking per asset
  - 7 assets across 4 asset classes = $276M+ total
  - Mixed asset types (real estate, stablecoin, deposit) in single view
- **Proposal sections:** Investor Portfolio, Asset Ownership, Self-Service Portfolio View
- **Usage guide:** Use to show the investor/user perspective — how an asset holder views their own tokenized portfolio. Demonstrates the self-service nature of DALP and that investors see their holdings across all asset classes in one place.
- **Caption:** "DALP's 'My Assets' view provides investors with a consolidated portfolio dashboard — $276M across 7 instruments spanning real estate, equities, bonds, and cash equivalents — with live balance and availability tracking."

### Portfolio Insights.jpg

- **Description:** Asset Insights page showing a portfolio analytics view. Three metrics visible at top: Total value, Pending launches, Total assets. Below: Three donut charts — Asset value distribution (by instrument), Asset supply (by count per type), Asset class distribution (by value). The left sidebar shows the full Asset management navigation tree, with "Insights" highlighted as the active page.
- **Key features visible:**
  - Portfolio-level insights with donut chart visualizations
  - Multi-dimensional breakdown: by instrument, by supply count, by asset class
  - Insights as a dedicated navigation item in Asset management
- **Proposal sections:** Portfolio Analytics, Reporting, Business Intelligence
- **Usage guide:** Use for analytics and reporting sections. The three-chart layout provides a complete picture of portfolio composition from different angles (value, count, class).
- **Caption:** "DALP's Insights module provides multi-dimensional portfolio analytics — breaking down assets by instrument type, supply count, and asset class — giving managers a complete view of their tokenized portfolio composition."

### Portfolio Insights 2.jpg

- **Description:** Alternative/secondary view of Portfolio Insights, showing similar donut chart layout but potentially from a different user or account state. Shows the same three-chart pattern (asset value distribution, asset supply, asset class distribution) with the Insights navigation item active.
- **Key features visible:**
  - Same insights visualization pattern as Portfolio Insights.jpg
  - Alternative account perspective on portfolio distribution
- **Proposal sections:** Portfolio Analytics, Reporting
- **Usage guide:** Use as a backup for Portfolio Insights.jpg or when showing multiple user perspectives on portfolio analytics.
- **Caption:** "DALP's portfolio insights dashboard delivers real-time visibility into asset composition, supply distribution, and class-level value allocation across all managed tokenized assets."

---

## 04 - Asset Designer

**Reorganized (2026-03-25).** All old Asset Designer files moved here from `03 - Asset Designer`. New wizard subfolders added with complete step-by-step tokenisation flows for all 7 asset types. Asset Insights moved to `21 - Insights`, My Assets files moved to `03 - My Assets`.

### Flat files (legacy)

#### Asset Designer Overview.jpg *(new)*
- **Description:** Main asset designer overview screen showing the starting point for asset creation. Gives a high-level view of the wizard entry point.
- **Proposal sections:** Asset Creation, Platform Capabilities
- **Caption:** "DALP's Asset Designer is the starting point for tokenizing any asset class."

#### Asset Designer.jpg
- **Description:** Step 1 of 7 in the Asset Designer wizard — "Choose asset class." A large two-column modal overlays the main dashboard. Left dark-gradient panel shows wizard progress: Step 1 / 7, "Choose asset type" section active with sub-steps "Select asset class" (active, green dot) and "Choose your asset type" (upcoming). Right panel shows 4 asset class selection cards in a 2×2 grid: (1) Fixed Income — includes Bond; (2) Flexible Income — includes Fund, Equity; (3) Cash Equivalent — includes Stablecoin, Deposit; (4) Real World Asset — includes Precious metal, Real estate. "Next" button at bottom-right.
- **Key features visible:** Guided 7-step asset creation wizard; all 7 asset types in one view
- **Proposal sections:** Asset Creation, Supported Asset Types, Platform Capabilities
- **Usage guide:** Use at the top of any "how to create assets" section. This single screenshot communicates the full breadth of DALP's supported asset types.
- **Caption:** "The DALP Asset Designer guides issuers through tokenization with a step-by-step wizard supporting all major asset classes: Fixed Income, Flexible Income, Cash Equivalents, and Real World Assets."

#### Design Bond 1–5.jpg
*(Bond tokenisation wizard steps from the original catalog — see Bond Tokenisation subfolder for the complete 20-step new set)*

- **Design Bond 1.jpg** — Step 2 of 8 — "Choose your asset type" for Fixed Income. Bond card selected with capability checklist: Access control, Supply limit, Safe custody, Cash out, Earn returns.
- **Design Bond 2.jpg** — Step 3 of 8 — "Bond information" form. Name = "Gold Bond", Symbol = "GOLBON", Decimals = 18, Jurisdiction = France. Green validation message.
- **Design Bond 3.jpg** — Step 4 of 8 — "Instrument specific details." Maturity date = March 1st, 2026, ISIN = "US0378331005" (12/12 characters).
- **Design Bond 4.jpg** — Step 5 of 8 — "Pricing & valuation" (initial state). Maximum limit = 100,000 GOLBON. Denomination asset = not yet selected.
- **Design Bond 5.jpg** — Step 5 of 8 — "Pricing & valuation" (completed). Denomination asset = Deutsche Bank Euro Deposit, Face value = 1,000 DEED.

#### Asset Designer - Step 3 - Real Estate Info.jpg through Asset Designer - Step 7 - Asset Permissions List.jpg
*(Real estate tokenisation wizard steps from the original catalog — see Real Estate Tokenisation subfolder for the complete 21-step new set)*

- **Asset Designer - Step 3 - Real Estate Info.jpg** — Step 3/8 — Real estate asset information. Name = "Doha Business Towers" (DBT), Decimals = 4, Jurisdiction = Qatar.
- **Asset Designer - Step 4 - Instrument Details.jpg** — Step 4/8 — GPS coordinates, property type, city, district code.
- **Asset Designer - Step 4 - Instrument Details Form.jpg** — Step 4/8 — Property area = 100,000 m², Building year = 2015, Number of units = 500.
- **Asset Designer - Step 5 - Pricing and Valuation.jpg** — Step 5/8 — 1,000,000 tokens at $100 each = $100M property valuation.
- **Asset Designer - Step 6 - Compliance Modules.jpg** — Step 6/8 — Compliance template selection. MiCA EU Standard selected.
- **Asset Designer - Step 7 - Asset Permissions Config.jpg** — Step 7/8 — Add permission panel. Anna Schmidt as Custodian.
- **Asset Designer - Step 7 - Asset Permissions List.jpg** — Step 7/8 — Three-party governance: Ada Admin, Anna Schmidt, Yuki Tanaka.

#### Asset Designer Compliance files
- **Asset Designer Compliance.jpg** — Step 6/11 compliance template selection with Advanced configuration toggle ON.
- **Asset Designer Compliance Identity.jpg** — Step 7/11 — SMART identity verification expression builder. KYC AND Asset classification.
- **Asset Designer Compliance Expression.jpg** — Step 7/11 — Complex 9-condition compliance expression: KYC, AML, Qualified institutional investor, Accredited investor, NOT Asset location, Collateral, Prospectus filed, Issuer reporting compliant.
- **Asset Designer Compliance Country Allowlist.jpg** — Step 8/11 — All 27 EU member states pre-populated for MiCA.
- **Asset Designer Supply Limit.jpg** — Step 9/11 — MiCA EU rolling annual supply cap: 8,000,000 tokens / 365 days.
- **Asset Designer Permissions.jpg** — Step 10/11 — 5-party governance: System Admin, Asset Issuer, Emma Chen, Hans Mueller, Quinn Walker.
- **Asset Designer Review and Deploy 1.jpg** — Step 11/11 — Review screen: Gold Bond (GOLBON), ISIN, Jurisdiction France.
- **Asset Designer Review and Deploy 2.jpg** — Step 11/11 (scrolled) — Compliance modules + 5-party permission roster.

### Bond Tokenisation/ *(new — 20 steps)*

Complete Bond Tokenisation wizard. 20 steps covering:
- Steps 01–05: Asset class selection, instrument type, bond information (name/symbol/decimals/jurisdiction), instrument details (ISIN/maturity), pricing and valuation
- Steps 06–18: Compliance modules, supply cap, collateral requirement, time lock, block addresses, transfer approval, country blocklist, identity blocklist, investor count, identity allowlist, token supply limit, SMART identity verification, country allowlist
- Steps 19–20: Asset permissions, review and deploy

**Count:** 20 screenshots × 2 formats = 40 files

### Equity Tokenisation/ *(new — 20 steps)*

Complete Equity Tokenisation wizard. 20 steps covering:
- Steps 01–05: Asset class selection, instrument type, equity information, instrument details, pricing
- Steps 06–20: Compliance modules, supply cap, investor count, identity allowlist, block addresses, identity blocklist, collateral requirement, time lock, token supply limit, transfer approval, country blocklist, identity verification, country allowlist, asset permissions, review and deploy

**Count:** 20 screenshots × 2 formats = 40 files

### Fund Tokenisation/ *(new — 21 steps)*

Complete Fund Tokenisation wizard. 21 steps covering:
- Steps 01–06: Asset class selection, instrument type, fund information, instrument details, pricing, compliance modules
- Steps 07–19: Supply cap, investor count, identity allowlist, token supply limit, transfer approval, country blocklist, identity blocklist, collateral requirement, time lock, block addresses, SMART identity verification, country allowlist, asset permissions
- Final step: Review and deploy

**Count:** 21 screenshots × 2 formats = 42 files (note: step 18 has two variants — "18 Step Country Allowlist" and "18 Step  Country Allowlist" — both preserved)

### Deposit Tokenisation/ *(new — 19 steps)*

Complete Deposit Tokenisation wizard. 19 steps covering:
- Steps 01–05: Asset class selection, instrument type, deposit information, pricing and valuation, compliance modules
- Steps 06–19: Blocked addresses, identity blocklist, collateral requirement, time lock, token supply limit, transfer approval, and further compliance steps

**Count:** 19 screenshots × 2 formats = 38 files

### Stablecoin Tokenisation/ *(new — 20 steps)*

Complete Stablecoin Tokenisation wizard. 20 steps covering:
- Steps 01–06: Asset class selection, instrument type, stablecoin information, instrument details, pricing, compliance modules
- Steps 07–20: Supply cap, investor count, identity allowlist, token supply limit, transfer approval, time lock, block addresses, country blocklist, identity blocklist, collateral requirement, SMART identity verification, country allowlist, asset permissions, review and deploy

**Count:** 20 screenshots × 2 formats = 40 files

### Precious Metal Tokenisation/ *(new — 8 steps)*

Precious Metal Tokenisation wizard. 8 numbered steps (Steps 01–08).

**Count:** 8 screenshots × 2 formats = 16 files

### Real Estate Tokenisation/ *(new — 21 steps)*

Complete Real Estate Tokenisation wizard. 21 steps covering:
- Steps 01–06: Asset class selection, instrument type, real estate information, instrument details, pricing and valuation, compliance modules
- Steps 07–11: Supply cap, investor count, identity allowlist, identity blocklist, token supply limit
- Steps 12–20: Further compliance and configuration steps
- Step 21: Final review and deploy

**Count:** 21 screenshots × 2 formats = 42 files

---

## 05 - Asset Operations

**New section (2026-03-25).** Step-by-step flows for all major asset operations.

### Forced Transfer/ *(6 steps)*

Step 1.jpg through Step 6.jpg — Screenshots of the complete forced transfer workflow. Used for regulatory/compliance forced transfer of tokens between addresses.

**Count:** 6 × 2 = 12 files

### Freeze/ *(5 steps)*

Step 0.jpg through Step 4.jpg — Screenshots of the account/token freeze workflow. Step 0 shows pre-freeze state.

**Count:** 5 × 2 = 10 files

### Mint Tokens/ *(4 steps)*

Step 1.jpg through Step 4.jpg — Screenshots of the mint tokens workflow from within an asset detail page.

**Count:** 4 × 2 = 8 files

### Transfer Tokens/ *(7 steps)*

Step 1.jpg through Step 7.jpg — Screenshots of the transfer tokens workflow. Most detailed operation flow.

**Count:** 7 × 2 = 14 files

### Unfreeze/ *(5 steps)*

Step 0.jpg through Step 4.jpg — Screenshots of the unfreeze workflow. Mirrors the Freeze workflow in reverse.

**Count:** 5 × 2 = 10 files

---

## 06 - Bonds

**Renumbered from 04 - Bonds (2026-03-25). New file added: Tokenised Bond.jpg**

### Tokenised Bond.jpg *(new)*
- **Description:** The bonds listing/overview screen showing tokenised bonds in the new UI. Single-screen reference for the bonds category.
- **Proposal sections:** Bond Portfolio Management, Fixed Income
- **Caption:** "DALP manages tokenised bonds as on-chain smart contracts with full lifecycle status tracking."

### Bonds Listing.jpg
- **Description:** Main Bonds listing page showing all tokenized bonds. Table with 10 bonds across multiple currencies (EUR, MYR, CAD, CHF, SAR, AED, SGD, JPY, GBP). Bond types: Gold Bond (paused), Floating Rate Note, Zero Coupon, Convertible Bond, High Yield, Municipal, Treasury, Infrastructure, Green Bond, Corporate Bond.
- **Key features visible:** Multi-currency bond portfolio (9 currencies), Paused/Active status badges, diverse bond types
- **Proposal sections:** Bond Portfolio Management, Multi-Currency Support, Fixed Income
- **Caption:** "DALP manages a diversified bond portfolio across multiple currencies and bond types — each deployed as smart contracts on-chain with full lifecycle status tracking."

### Bonds Detail 1–4.jpg
- **Bonds Detail 1.jpg** — Municipal Bond Tokyo (MUBTOK) — Asset Details tab. Full bond lifecycle data: maturity date (Feb 19, 2031), 100% redemption coverage, 10-tab interface.
- **Bonds Detail 2.jpg** — Municipal Bond Tokyo — Yield tab. 5-year annual yield schedule (2026–2031), 500,000 MIZY denomination reserve.
- **Bonds Detail 3.jpg** — Municipal Bond Tokyo — Events tab. On-chain audit trail: Yield Schedule Set, Transfer Completed, Checkpoint Updated events.
- **Bonds Detail 4.jpg** — Municipal Bond Tokyo — Compliance tab with "Issue verification" panel open. issuerLicensed verification topic, two-step workflow.

---

## 07 - Equity

**Renumbered from 05 - Equity (2026-03-25). New file added: Tokenised Equity.jpg**

### Tokenised Equity.jpg *(new)*
- **Description:** The equity listing/overview screen showing tokenised equities in the new UI.
- **Proposal sections:** Equity Tokenization, Capital Markets
- **Caption:** "DALP tokenises equity across common, preferred, and voting share classes as on-chain smart contracts."

### Equity Listing.jpg
- **Description:** Equities listing page showing 10 equities across three share types (Common, Preferred, Voting) in EUR/USD. All 0 decimals (whole shares), 1,100,000 supply each.
- **Key features visible:** Three equity types: Common, Preferred, Voting; multi-currency; consistent 1.1M supply
- **Proposal sections:** Equity Tokenization, Capital Markets, Flexible Income
- **Caption:** "DALP supports full equity tokenization across common, preferred, and voting share classes with 10 equities shown across EUR and USD pricing."

### Equity Detail 1.jpg
- **Description:** Pacific Equity Common (PECOM) — Asset Details. 151.52% collateral coverage, $770M market cap, minting capacity tracking.
- **Key features visible:** Collateral management, coverage ratio (151.52%), minting capacity, total market cap
- **Proposal sections:** Equity Tokenization, Collateralization, Investor Protection
- **Caption:** "DALP equity tokens are backed by on-chain collateral — Pacific Equity Common maintains 151.52% collateral coverage with automatic minting capacity calculation."

---

## 08 - Funds

**Renumbered from 06 - Funds (2026-03-25). New file added: Tokenised Fund.jpg**

### Tokenised Fund.jpg *(new)*
- **Description:** The funds listing/overview screen showing tokenised funds in the new UI.
- **Proposal sections:** Fund Tokenization, Alternative Investments
- **Caption:** "DALP tokenises the full spectrum of investment funds with 18-decimal precision for fractional unit ownership."

### Funds Listing.jpg
- **Description:** Funds listing page. 10 funds: Sustainable Impact, Multi-Strategy, Venture Capital, Private Equity, Market Neutral, Income Focused, Emerging Markets, Asia Pacific Growth, European Equity Hedge, Global Diversified Fund. All 18 decimals, 1,000,000 units, EUR/USD pricing.
- **Key features visible:** Diverse fund strategies (VC, PE, hedge, emerging markets), 18 decimals for fractional ownership
- **Proposal sections:** Fund Tokenization, Flexible Income, Alternative Investments
- **Caption:** "DALP enables tokenization of the full fund landscape — from sustainable impact funds to venture capital — with 18-decimal precision enabling fractional unit ownership."

### Fund Detail 1.jpg
- **Description:** Sustainable Impact Fund (SIF) — Asset Details. Category = Emerging Markets, Class = Sector-Specific, Management fee, $550M total AUM.
- **Key features visible:** Fund-specific metadata (category, class, management fee), $550M AUM
- **Caption:** "DALP fund tokens carry fund-specific metadata — investment category, fund class, and management fee parameters — providing a complete digital representation of the fund structure on-chain."

### Fund Detail 2.jpg
- **Description:** Sustainable Impact Fund — Verifications tab. Four on-chain verifications: base price, asset issuer, contract identity, asset classification (EMERGING_MARKETS/SECTOR_SPECIFIC). All Active, ONCHAINID-based.
- **Key features visible:** ONCHAINID verification system, four verification types, three distinct issuers
- **Caption:** "Every DALP asset carries cryptographically attested on-chain verifications — base price, issuer identity, contract identity, and asset classification are all verifiable claims via the ONCHAINID standard."

---

## 09 - Deposits

**Renumbered from 07 - Deposits (2026-03-25). New file added: Tokenised Deposit.jpg**

### Tokenised Deposit.jpg *(new)*
- **Description:** The deposits listing/overview screen showing tokenised deposits in the new UI. Corrected from source filename "Tokenised Depoit" (typo fixed).
- **Proposal sections:** Tokenized Deposits, Banking Integration
- **Caption:** "DALP manages tokenised bank deposits as on-chain smart contracts for institutional cash management."

### Deposits Listing.jpg
- **Description:** Deposits listing page. 10 deposits (4 visible): UBS Swiss Deposit (UBSD), Saudi Riyal Deposit (SRAD), Emirates Dirham Deposit (EMAD), DBS Singapore Deposit (DBSS). All 18 decimals, 50,100,000 supply.
- **Key features visible:** Real-world bank tokenized deposits (UBS, DBS), multi-currency
- **Proposal sections:** Tokenized Deposits, Bank Integration, Cash Management
- **Caption:** "DALP enables financial institutions to tokenize bank deposits on-chain — UBS Swiss Deposits, DBS Singapore Deposits, and currency-specific deposits managed in a unified platform."

---

## 10 - Stablecoins

**Renumbered from 08 - Stablecoins (2026-03-25). New file added: Tokenised Stablecoin.jpg**

### Tokenised Stablecoin.jpg *(new)*
- **Description:** The stablecoins listing/overview screen showing tokenised stablecoins in the new UI.
- **Proposal sections:** Stablecoins, Multi-Currency Support
- **Caption:** "DALP manages the full stablecoin spectrum from global standards to custom institutional stablecoins."

### Stablecoins.jpg
- **Description:** Stablecoins listing page. 10 stablecoins: SettleMint Dollar, UAE Dirham Coin, Singapore Dollar Coin, MaxCap Dollar, QCAD, JPYC, STASIS EURO (EURS), Euro Coin (EUROC), USD Coin (USDC), Tether (USDT). All 18 decimals, 1:1 fiat pegs.
- **Key features visible:** Multi-currency stablecoin support (USD, AED, SGD, CAD, JPY, EUR), real-world references (USDC, USDT)
- **Proposal sections:** Stablecoins, Cash Equivalent Management, Multi-Currency Support
- **Caption:** "DALP manages the full stablecoin spectrum — from global standards (USDC, USDT, EURS) to regional currencies (AED, SGD, CAD, JPY) and platform-native stablecoins — all in one unified cash management interface."

### Stablecoin Detail 1.jpg
- **Description:** Singapore Dollar Coin (SGDC) — Asset Details. Stablecoin-specific metadata: Peg currency = SGD. 1:1 SGD peg, 1,000,000 SGD total float.
- **Key features visible:** Stablecoin-specific peg currency field, 1:1 SGD peg
- **Caption:** "DALP's stablecoin module stores the peg currency relationship on-chain — the Singapore Dollar Coin (SGDC) is explicitly configured as a 1:1 SGD peg."

---

## 11 - Precious Metals

**Renumbered from 09 - Precious Metals (2026-03-25). New file added: Tokenised Metals.jpg**

### Tokenised Metals.jpg *(new)*
- **Description:** The precious metals listing/overview screen showing tokenised metals in the new UI.
- **Proposal sections:** Precious Metals Tokenization, RWA
- **Caption:** "DALP tokenises precious metals with real-world custody traceability."

### Precious Metals Listing.jpg
- **Description:** Precious metals listing page. 10 metals: Tokyo Silver Vault, New York Gold Vault, Dubai Precious Metals, Singapore Gold Token, Zurich Silver Pool, London Gold Pool, Bullion Palladium Token, Vault Platinum Token, Loomis Silver Token, Brinks Gold Token. Named after real vaulting locations and custodians.
- **Key features visible:** Four metal types (Gold, Silver, Palladium, Platinum), real custodians (Brinks, Loomis), real vault locations
- **Proposal sections:** Precious Metals Tokenization, RWA, Commodity Tokenization
- **Caption:** "DALP tokenizes precious metals with real-world custody traceability — from Brinks Gold Tokens (London vaults) to Loomis Silver Tokens — enabling 18-decimal fractional ownership."

### Precious Metal 1.jpg
- **Description:** Brinks Gold Token (BGT) — Asset Details. Metal type, Storage location = London, Custodian = gold. $2B total market value.
- **Key features visible:** Precious metal-specific metadata (storage location, custodian), physical asset traceability
- **Caption:** "DALP precious metal tokens carry physical custody metadata — the Brinks Gold Token is explicitly linked to London vault storage, creating a verifiable on-chain record of physical gold custody."

---

## 12 - Real Estate

**Renumbered from 10 - Real Estate (2026-03-25).**

### Real Estate Listing.jpg
- **Description:** Real estate listing (System Admin view). 10 properties across Bangkok, Berlin, Paris, Amsterdam, Dubai, Singapore, Tokyo, New York, Munich, Brussels. EUR/USD pricing, 0 decimals.
- **Key features visible:** 10 global cities, multi-currency, diverse supply
- **Proposal sections:** Real Estate Tokenization, Global Portfolio, Multi-Jurisdiction RWA
- **Caption:** "DALP manages a globally distributed real estate portfolio — from Bangkok to Brussels — with each property tokenized as individual smart contracts."

### Real Estate Assets - Listing.jpg
- **Description:** Real estate listing (Ada Admin view, different portfolio). Munich, Manhattan, Brussels, London, Tokyo, Amsterdam, Dubai, Riyadh, Frankfurt, Singapore. 5 currencies: EUR, USD, GBP, JPY, SGD. Diverse property types.
- **Caption:** "DALP's real estate platform supports diverse commercial property portfolios — from Manhattan office towers to Tokyo luxury hotels — with multi-currency pricing."

### Real Estate 1.jpg
- **Description:** Brussels Central Apartments (BCAPT) — Asset Details. Property type = Apartment, use = Residential, City = Brussels, District D1. $250M total value.
- **Caption:** "The Brussels Central Apartments DALP asset captures the full property record on-chain — 500 tokens representing a $250M Brussels residential property."

### Real Estate - Doha Business Towers - Asset Details.jpg
- **Description:** Doha Business Towers (DBT) — Asset Details. REN = REN123456789876, GPS = 25.286106/51.534817, Property area = 100,000 m², Building year = 2015, 500 units. 1,000,000 tokens at $100 = $100M. Embedded map showing property location.
- **Caption:** "DALP's Doha Business Towers tokenization demonstrates institutional-grade RWA depth: GPS-mapped location, REN, 100,000 m² physical area, and 4-decimal fractional tokens."

### Real Estate - Doha Business Towers - Create Data Feed.jpg
- **Description:** "Create data feed" modal over Doha Business Towers page. Asset-scoped feed, Numeric (Scalar) format selected. Two-step creation workflow.
- **Caption:** "DALP supports on-chain data feeds per asset — enabling real estate tokens to receive live price updates or valuation changes through a built-in feed registry."

### Real Estate - Doha Business Towers - Events.jpg
- **Description:** Doha Business Towers — Events tab showing on-chain event log for this real estate asset.
- **Caption:** "Every operation on a DALP real estate token is permanently recorded on-chain with timestamps and sender addresses."

### Real Estate - Doha Business Towers - Mint Tokens.jpg
- **Description:** "Mint tokens" side panel (initial state). Recipient not yet selected. Amount = 500 DBT. No minting limit.
- **Caption:** "DALP's token minting workflow allows asset administrators to create and assign new tokens directly from the asset detail page."

### Real Estate - Doha Business Towers - Mint Tokens Confirm.jpg
- **Description:** "Mint tokens" side panel (completed). Recipient = Ada Admin. Amount = 5,000 DBT. Continue button active.
- **Caption:** "Once a recipient is selected and amount confirmed, DALP's minting form activates the Continue button — guiding the administrator to a confirmation step."

### Real Estate - Doha Business Towers - Verifications.jpg
- **Description:** Doha Business Towers — Verifications tab. 8 active on-chain verifications: asset classification, GPS coordinates, asset location, contract identity, base price, asset issuer, physical details (year/units/area), unique identifier (REN).
- **Key features visible:** 8 distinct on-chain verifications, GPS coordinates, all physical and financial attributes
- **Proposal sections:** On-Chain Attestations, RWA Provenance, ONCHAINID
- **Caption:** "DALP creates a complete on-chain attestation record for every real estate asset — GPS coordinates, classification, physical specs, and unique identifier are all cryptographically attested."

---

## 13 - External Tokens

**New section (2026-03-25).**

### External Tokens 1.jpg / External Tokens 2.jpg
- **Description:** Two screenshots of the External Tokens section in DALP's asset management. Shows external token management capabilities for tokens not natively issued on DALP.
- **Proposal sections:** External Tokens, Token Integration, Multi-Asset Management
- **Usage guide:** Use when proposals involve managing external tokens or cross-chain assets alongside DALP-native tokens.
- **Caption:** "DALP's External Tokens section allows management of third-party and cross-chain token contracts alongside natively issued assets."

---

## 14 - Compliance and Policy Templates

**Renumbered from 11 - Compliance and Policy Templates (2026-03-25). New files added: Instrument Templates - Page/Creating 1/Creating 2/Creating from Existing/New/Detail; Policy Templates - Page/Creating 1/Creating 2.**

### New files (2026-03-25)

#### Instrument Templates - Page.jpg
- **Description:** Instrument Templates listing page — the main overview of all available instrument templates.
- **Caption:** "DALP's instrument template library provides pre-configured starting points for all asset types."

#### Instrument Templates - Creating 1.jpg / Instrument Templates - Creating 2.jpg
- **Description:** Two-step instrument template creation workflow screenshots.
- **Caption:** "Creating a custom instrument template in DALP is a guided step-by-step process."

#### Instrument Templates - Creating from Existing.jpg
- **Description:** "Create from Existing" workflow for instrument templates, showing how to base a new template on an existing one.
- **Caption:** "DALP supports creating instrument templates from existing ones, reducing configuration effort for similar asset types."

#### Instrument Templates - New.jpg
- **Description:** New template creation form showing template fields and options.
- **Caption:** "New instrument templates in DALP can be customized with specific metadata schemas and feature requirements."

#### Instrument Templates - Detail.jpg
- **Description:** Instrument template detail view (Template 2) showing the full template configuration.
- **Caption:** "DALP instrument template details show the complete schema, features, and configuration for each asset type template."

#### Policy Templates - Page.jpg
- **Description:** Policy templates listing page overview.
- **Caption:** "DALP's policy template library provides pre-built compliance frameworks for all major global regulatory regimes."

#### Policy Templates - Creating 1.jpg / Policy Templates - Creating 2.jpg
- **Description:** Two screenshots from the policy template creation flow.
- **Caption:** "Creating custom compliance policy templates in DALP is guided through a structured wizard."

### Existing files (preserved from prior catalog)

#### Compliance Policy Templates.jpg
- **Description:** Policy templates library (System Admin view). 7 DALP Library cards: Japan FSA - Crypto Assets (3 controls), MAS Singapore - Capital Markets (4 controls), MiCA EU Standard (3 controls), Reg CF - Crowdfunding (3 controls), Reg D 506(b) (3 controls), Reg D 506(c) (3 controls), UK FCA - Securities (partial). All Published, DALP Library.
- **Caption:** "DALP ships with a pre-built compliance library covering all major global regulatory frameworks — Japan FSA, MAS Singapore, MiCA EU, SEC Reg CF, Reg D 506(b)/(c), and UK FCA."

#### Compliance Policy Detail 1.jpg
- **Description:** MAS Singapore - Capital Markets policy detail. 4 controls: SMART identity verification, Country allowlist, Investor count, Time lock. Matches MAS holding period requirements.
- **Caption:** "DALP's MAS Singapore - Capital Markets template enforces 4 controls simultaneously — precisely aligned to MAS digital asset regulations."

#### Compliance Policy Detail 2.jpg
- **Description:** MiCA EU Standard policy detail. 3 controls: SMART identity verification, Country allowlist, Token supply limit (8M EUR/12-month rolling window).
- **Caption:** "DALP's MiCA EU Standard template enforces the full MiCA compliance stack including the 8,000,000 EUR per 12-month rolling window supply cap."

#### Policy Templates - List.jpg
- **Description:** Policy templates library (Ada Admin view) with an 8th custom card visible: Qatar Real Estate Token (Draft, 5 controls). Shows custom organization templates alongside DALP Library templates.
- **Caption:** "Beyond the DALP pre-built library, organizations can create custom compliance templates for jurisdiction-specific requirements."

#### Policy Templates - Create From Scratch.jpg
- **Description:** "From scratch" template creation modal. Template Name = "Qatar Real Estate Token", Jurisdictions = Qatar, Description field.
- **Caption:** "Creating a new compliance template in DALP requires just a name, jurisdiction, and description."

#### Policy Template - Qatar Real Estate Token - Overview.jpg
- **Description:** Qatar Real Estate Token template detail (newly created). 0 active controls, 12 available controls grid. Full 7-category control taxonomy visible.
- **Caption:** "DALP's compliance library offers 12 configurable controls across 7 categories — ready to be combined into custom regulatory templates."

#### Policy Template - Expression Builder.jpg
- **Description:** Expression builder side panel open. Expression: Accredited investor [AND] KYC. Green validation. AND/OR operator buttons.
- **Caption:** "DALP's visual expression builder enables compliance teams to construct investor eligibility rules using simple boolean logic."

#### Policy Template - Investor Count Config.jpg
- **Description:** Investor count control configuration. Qatar = 1,000,000 investors. "0 = no global limit" helper text.
- **Caption:** "DALP's investor count control allows jurisdiction-specific limits — Qatar configured with a maximum of 1,000,000 investors."

#### Policy Template - Investor Count Disable Dialog.jpg
- **Description:** Investor count control active (1 active control). Disable control confirmation dialog: "This change is logged." Red-bordered warning.
- **Caption:** "Compliance control changes in DALP require explicit confirmation and are permanently logged — ensuring regulatory change management is always traceable."

#### Policy Template - Supply Cap Detail.jpg
- **Description:** Supply cap control detail panel (not yet enabled). Three-point enforcement explanation. "Enable" CTA button.
- **Caption:** "DALP's supply cap control enforces a hard maximum on token supply at the smart contract level."

#### Policy Template - Token Supply Limit Config.jpg
- **Description:** Token supply limit configuration. Maximum = 10,000,000, Period = 30 days, Rolling window checked.
- **Caption:** "DALP's token supply limit control supports sophisticated time-windowed caps — configurable per-asset or issuer-wide."

#### Instrument Templates - List and Create.jpg
- **Description:** Instrument templates list with "Create instrument template" panel open. 5 existing templates (Bond, Deposit, Fund, Precious Metal, StableCoin). Right panel: Source = "Real Estate (DALP Library)", Name = "Qatar Real Estate Token".
- **Caption:** "DALP's instrument template library provides pre-configured starting points — with instrument-specific features like Maturity Redemption for bonds and Voting Power for funds."

#### Instrument Template - Add Metadata Field.jpg
- **Description:** Metadata schema table (10 fields) with "Add metadata field" panel open. Field types: string, number, enum. Mutability: restricted-mutable, immutable. Required toggle ON.
- **Caption:** "DALP's instrument template engine supports fully customizable metadata schemas with type safety and mutability controls."

#### Instrument Template - Metadata Field City Config.jpg
- **Description:** Qatar Real Estate Token template — city field configuration. String type, Restricted Mutable, Required = OFF.
- **Caption:** "DALP's metadata schema allows field-level configuration — the 'city' field is marked as restricted-mutable, providing the right balance of flexibility and data control."

#### Instrument Template - Qatar Real Estate - Metadata Schema.jpg
- **Description:** Full metadata schema view. 6 rows: city (string, restricted-mutable), latitude/longitude (number, restricted-mutable), propertyUse (enum, immutable), buildingYear/districtCode (number/string, restricted-mutable).
- **Caption:** "Qatar Real Estate Token's metadata schema combines immutable fields (property type) with restricted-mutable fields (city, coordinates) — ensuring core classification is locked while operational details remain updatable."

---

## 15 - Identity and Verification

**Renumbered from 12 - Identity and Verification (2026-03-25). New files added: Verification Topics 1/2, Trusted Issuers 1/2, Data Feeds 1/2.**

### New files (2026-03-25)

#### Verification Topics 1.jpg / Verification Topics 2.jpg
- **Description:** Two screenshots of the Verification Topics configuration page in Platform Settings. Shows the full list of available verification topics for on-chain identity attestation, including system topics (locked) and custom topics.
- **Proposal sections:** Identity Infrastructure, Compliance Topics, ONCHAINID Configuration
- **Caption:** "DALP's verification topic registry defines all claim types available for on-chain identity attestation."

#### Trusted Issuers 1.jpg / Trusted Issuers 2.jpg
- **Description:** Two screenshots of the Trusted Issuers management page. Shows the registry of authorized parties that can issue identity claims and compliance attestations.
- **Proposal sections:** Identity Infrastructure, Trust Framework, Compliance
- **Caption:** "DALP's trusted issuer registry controls who can issue identity claims — establishing a permissioned trust framework for all on-chain compliance attestations."

#### Data Feeds 1.jpg / Data Feeds 2.jpg
- **Description:** Two screenshots of the Data Feeds management page. Shows configuration and management of on-chain data feeds for asset price and metadata updates.
- **Proposal sections:** Oracle / Data Feeds, Real-Time Asset Data
- **Caption:** "DALP's data feeds management allows administrators to configure and monitor on-chain feeds delivering real-time data to tokenized assets."

### Existing files (preserved from prior catalog)

#### Onchain Identity.jpg
- **Description:** Onchain identity page for System Admin. QR code + full contract address. Registration status = Registered (Belgium, BE). 2 Active verifications. AML verification issued by System Admin (ONCHAINID).
- **Caption:** "Every DALP user has an on-chain identity contract — a cryptographic identity deployed on the blockchain with a QR code, registration status, and active compliance verifications."

#### User.jpg
- **Description:** Users management page. 11 users shown — all "Registered", most as "Investor" type, one "Trusted issuer" (Asset Issuer). Dual-address model: EOA wallet + ONCHAINID contract per user.
- **Caption:** "DALP maintains a comprehensive participant directory — each user has both a blockchain wallet (EOA) and a dedicated on-chain identity contract."

#### Verification Topics.jpg
- **Description:** Verification Topics & Issuers configuration page. 10 rows shown (page 1 of 3). System topics (lock icon): Accredited investor, AML, Asset classification, etc. Custom topics (editable): assetCoordinates, assetPhysicalDetails.
- **Caption:** "DALP's verification topic registry defines the claim types available for on-chain identity attestation — combining standard compliance topics with platform-extensible custom topics."

---

## 16 - XVP Settlement

**Renumbered from 13 - XVP (2026-03-25).**

### XVP Setup 1.jpg
- **Description:** "Create settlement" wizard — Step 1 of 3, "Asset flows." Local flow: Quinn Walker → Emma Chen, Deutsche Bank Euro Deposit asset.
- **Caption:** "DALP's XvP settlement wizard configures atomic multi-leg transactions — Step 1 defines the first leg with counterparty and asset selection."

### XVP Setup 2.jpg
- **Description:** Step 2 of 3, "Settlement configuration." Name = "XVP Settlement", Expiry = April 1, 2026, Auto-execute = checked, Country = Belgium. HTLC hashlock input.
- **Caption:** "DALP's XvP settlement uses HTLC security — a hashlock configures the cross-chain atomic execution with expiry and auto-execute parameters."

### XVP Setup 3.jpg
- **Description:** Step 3 of 3, "Review." Two flows: Flow 1 (Local) — 100,000 DEED from Quinn Walker to Emma Chen. Flow 2 (External Chain 1) — 500 tokens from Emma Chen to Hans Mueller. "Create settlement" button.
- **Caption:** "DALP's XvP settlement atomically links two legs: 100,000 Deutsche Bank Euro Deposit tokens (local) and 500 cross-chain tokens — all or nothing, fully atomic."

### XVP Setup 4.jpg
- **Description:** Step 3 of 3 (scrolled). Full hashlock (0x75657d...923ce) displayed. Secret hidden. Settlement name, expiry, auto-execute confirmed.
- **Caption:** "The XvP settlement review confirms the HTLC hashlock — once created, the settlement can only execute when the pre-image secret is revealed by the counterparty."

### XVP Details 1.jpg
- **Description:** XVP Settlement detail page (Pending). HTLC badge, Pending status. 0/1 approvals (Quinn Walker pending). Hashlock visible. Cross-chain responsibility warning.
- **Caption:** "After creation, an HTLC XvP settlement enters Pending state — DALP tracks approvals from each counterparty and displays the hashlock for cross-chain verification."

### XVP Details 2.jpg
- **Description:** XvP settlement detail (expires soon). 0/2 approvals: System Admin + Asset Issuer both Pending. Orange warning: "Settlement expires in about 13 hours." Two-leg bilateral exchange via Proof-of-Deposit.
- **Caption:** "DALP's XvP settlement management tracks multi-party approvals, surfaces expiry warnings, and displays bilateral asset flows."

### XvP API Light.jpg
- **Description:** Light-mode REST API documentation view showing the XvP Settlement API endpoints.
- **Caption:** "DALP's XvP settlement is fully API-accessible — enabling seamless integration with existing trading systems and settlement workflows."

---

## 17 - Addons

**New section (2026-03-25).**

### Exchange XvP/

#### XvP Overview.jpg
- **Description:** Overview screen of the Exchange XvP addon. Shows the XvP module as configured/active in the platform.
- **Proposal sections:** XvP Settlement, Addons, Cross-Chain
- **Caption:** "DALP's Exchange XvP addon extends the platform with atomic cross-chain settlement capabilities."

#### Asset Flow Step 1.jpg / Asset Flow Step 2.jpg / Asset Flow Step 3.jpg / Asset Flow Step Final.jpg
- **Description:** Four-step visual walkthrough of the XvP asset flow. Shows the complete flow from initiation through execution.
- **Proposal sections:** XvP Settlement, Atomic Settlement, Cross-Chain
- **Caption:** "The XvP asset flow visualizes the complete cross-chain settlement process from initiation through atomic execution."

#### Created Flow 1.jpg / Created Flow 2.jpg
- **Description:** Two screenshots showing a created/active XvP settlement flow. Demonstrates the result of a completed settlement setup.
- **Proposal sections:** XvP Settlement, Settlement Lifecycle
- **Caption:** "Created XvP flows are tracked in DALP with full visibility into status, counterparties, and asset details."

### Yield/

#### Income Yield.jpg
- **Description:** The Yield addon interface showing income yield management capabilities. Demonstrates how the Yield addon enables automated income distribution for tokenized assets.
- **Proposal sections:** Yield Automation, Bond Coupon, Income Distribution
- **Usage guide:** Use for proposals involving automated yield distribution, bond coupons, or regular income payments on tokenized assets.
- **Caption:** "DALP's Yield addon automates income distribution for tokenized assets — configuring yield schedules, tracking distributions, and managing claim workflows on-chain."

---

## 18 - Contacts

**New section (2026-03-25).**

### Contacts 1.jpg through Contacts 5.jpg
- **Description:** Five screenshots of the Contacts section in DALP. Shows contact management capabilities for counterparties, investors, and institutional participants.
- **Proposal sections:** Contact Management, Participant Directory, Institutional Operations
- **Usage guide:** Use for proposals where contact/counterparty management is a key requirement. Shows DALP's ability to maintain a structured directory of platform participants.
- **Caption:** "DALP's Contacts section provides a structured directory of platform participants — counterparties, investors, and institutional contacts — integrated with the asset management workflows."

---

## 19 - Settings and Admin

**Renumbered from 14 - Settings and Admin (2026-03-25). New files added: Actions Step 1–5, Recent Activities.**

### New files (2026-03-25)

#### Actions Step 1.jpg through Actions Step 5.jpg
- **Description:** Five screenshots of the Actions workflow in DALP's settings/admin section. Shows the step-by-step flow for managing administrative actions on the platform.
- **Proposal sections:** Workflow Management, Admin Operations, Action Queue
- **Caption:** "DALP's Actions module provides a structured workflow for administrative operations — each step guided and tracked on-chain."

#### Recent Activities.jpg
- **Description:** The Recent Activities feed showing the latest platform activity log. Complements the Dashboard activity feed with a dedicated full-page view.
- **Proposal sections:** Audit Trail, Activity Monitoring, Compliance Logging
- **Caption:** "DALP's Recent Activities view provides a comprehensive, filterable log of all platform events for compliance auditing and operational monitoring."

### Existing files (preserved from prior catalog)

#### API Keys.jpg
- **Description:** API Keys management page. API key displayed: `sm_atk_b1CncizmpshVqrGP`. "Please copy your API key — we cannot show it again." One-time display security model.
- **Caption:** "DALP issues named API keys with one-time display security — keys are displayed only once at creation time."

#### Actions.jpg
- **Description:** Actions page — "Upcoming" tab (badge: 5). 5 rows: "Claim yield" for Sovereign Bond 2029, scheduled in 1–5 years. Pending (1), Upcoming (5), Completed (0) tabs.
- **Caption:** "DALP's Actions queue tracks all scheduled on-chain operations — five annual yield claim actions for Sovereign Bond 2029 span the bond's full 5-year lifecycle."

#### Activity Log.jpg
- **Description:** Activity log (Ada Admin view). 12+ on-chain events: Verification added, Role granted/revoked, Stablecoin issued, Asset created. Gasless transactions (0.000000 ETH) on private blockchain. Color-coded categories.
- **Caption:** "DALP's activity log provides a complete, color-coded on-chain audit trail — every action permanently recorded with timestamps, transaction hashes, and gas costs."

#### Activity.jpg
- **Description:** Activity log (System Admin view). Recent events including XvP Settlement Created, Identity verified, Bypass list entry added, Transfer completed. Non-zero gas fees indicating live blockchain. Search capability.
- **Caption:** "DALP's real-time activity feed captures every blockchain transaction — from XvP settlement creation to identity verification and token transfers."

#### Addons.jpg
- **Description:** Addons configuration page. 12+ addon cards in 3-column grid: Permit (gasless approvals), External Transaction Fee, Fixed Yield Schedule (Required for bonds), etc. "Deployed as smart contracts" architecture explanation.
- **Caption:** "DALP's modular addon architecture extends core tokenization capabilities — from gasless permits to fixed yield schedules — each deployed as smart contracts and toggleable without redeployment."

#### API Keys.jpg
*(See above)*

#### Theme 1.jpg
- **Description:** Theme/branding settings — upper section. Logo customization (light/dark variants). Live preview panel showing color palette (primary, accent, success, warning, destructive, muted) and typography.
- **Caption:** "DALP supports full white-label branding — upload custom logos for light/dark modes, configure color palette tokens, and preview real UI components in real-time."

#### Theme 2.jpg
- **Description:** Theme settings scrolled to show favicon configuration (standard, Apple touch, SVG) and login page preview. White-label authentication page customization.
- **Caption:** "DALP's branding extends to every touchpoint — favicons, Apple touch icons, and the login page — ensuring a consistent, institution-branded experience from first login."

#### Tokenize Deposit 1.jpg
- **Description:** Deutsche Bank Euro Deposit — Asset Details tab. Named institutional deposit token used as denomination asset in XvP settlements and bond pricing.
- **Caption:** "DALP's deposit management includes institutional-grade tokenized bank deposits — the Deutsche Bank Euro Deposit (DEED) functions as an on-chain settlement currency."

---

## 20 - Monitoring

**Renumbered from 15 - Monitoring (2026-03-25).**

### API Monitoring - Overview.jpg
- **Description:** API Monitoring dashboard. 694 requests / 24h, Error Rate = 1.2% (4xx: 1.0, 5xx: 0.1), Avg Response Time = 916ms (p95: 296688ms). Stacked area chart "Requests over time" (Last 24h). Live update: "Last update: 35s ago."
- **Caption:** "DALP includes full-stack API monitoring — 694 requests tracked over 24 hours with a 1.2% error rate, live response time percentiles, and a real-time traffic chart."

### API Monitoring - Request Log.jpg
- **Description:** API Monitoring — Request Log tab with specific request detail panel. POST /api/rpc/system/read: Status 200, Caller Ada Admin, IP 162.158.56.164, x-powered-by SettleMint/2.1.7. Request ID visible. Cookie REDACTED.
- **Caption:** "DALP's request log provides deep API observability — every request is inspectable with full headers, caller identity, IP address, and response details."

### Blockchain Monitoring.jpg
- **Description:** Blockchain Monitoring dashboard. Chain RPC — DALP Demo (Healthy, Chain 48972, Block #18,173, Head age 17s). Blockchain Indexer — DALP Demo (Healthy, 0 blocks behind). 24-hour health trend chart. Last update: 10s ago.
- **Caption:** "DALP's blockchain monitoring provides real-time health tracking of both the chain RPC node and the indexer — with 24-hour historical health trends ensuring proactive infrastructure management."

---

## 21 - Insights

**Renumbered from 16 - Insights (2026-03-25). New files added: Insights 1, Insights 2 (from batch2); Asset Insights moved from old 03 - Asset Designer.**

### Asset Insights.jpg
- **Description:** Global Asset Insights dashboard. Total value = $13,171,750,100.00, 71 assets (11 bonds, 10 equities, 10 funds, 10 stablecoins, 10 deposits, 10 real estates, 10 precious metals). Three donut charts: value distribution, supply, asset class distribution. Real World Assets dominate at $7.8B.
- **Key features visible:** $13.17B platform AUM, 71 assets across 7 types, three-dimensional analytics
- **Proposal sections:** Platform Scale, Portfolio Analytics, AUM Reporting
- **Caption:** "DALP manages $13.17 billion in tokenized assets across 71 instruments — spanning bonds, equities, funds, stablecoins, deposits, real estate, and precious metals."

### Insights - Asset Overview.jpg
- **Description:** Asset Insights dashboard (Ada Admin view). Total value = $142,609,500.00, 64 assets (7 types), 2 pending launches. Three donut charts showing Real Estate dominance ($142M). Sidebar shows Addons (Exchange XvP, Income Yield) visible.
- **Key features visible:** $142.6M portfolio, 7 asset types, real-time analytics
- **Caption:** "DALP's Asset Insights dashboard provides a real-time portfolio overview across all 64 managed assets — $142.6M total value with multi-dimensional analytics."

### Insights 1.jpg *(new)*
- **Description:** Insights overview screen (screenshot 1 from 2026-03-25 batch). Shows the assets insights interface with updated data.
- **Proposal sections:** Portfolio Analytics, Asset Overview
- **Caption:** "DALP's insights module delivers real-time multi-dimensional analytics across all managed tokenized assets."

### Insights 2.jpg *(new)*
- **Description:** Insights overview screen (screenshot 2 from 2026-03-25 batch). Alternative view of the insights interface.
- **Proposal sections:** Portfolio Analytics, Asset Overview
- **Caption:** "DALP's asset insights provide comprehensive visibility into portfolio composition, value distribution, and supply metrics."

---

## Rename Log

### 2026-03-24 (Initial catalog)

No files were renamed. All filenames were already sufficiently descriptive based on visual review. The catalog entries use the original filenames throughout.

### 2026-03-25 (Major reorganization)

**Folder renumbering:**
- `03 - Asset Designer` → Split: `03 - My Assets` (My Assets, Portfolio Insights ×2), `04 - Asset Designer` (all other files), `21 - Insights` (Asset Insights)
- `04 - Bonds` → `06 - Bonds`
- `05 - Equity` → `07 - Equity`
- `06 - Funds` → `08 - Funds`
- `07 - Deposits` → `09 - Deposits`
- `08 - Stablecoins` → `10 - Stablecoins`
- `09 - Precious Metals` → `11 - Precious Metals`
- `10 - Real Estate` → `12 - Real Estate`
- `11 - Compliance and Policy Templates` → `14 - Compliance and Policy Templates`
- `12 - Identity and Verification` → `15 - Identity and Verification`
- `13 - XVP` → `16 - XVP Settlement`
- `14 - Settings and Admin` → `19 - Settings and Admin`
- `15 - Monitoring` → `20 - Monitoring`
- `16 - Insights` → `21 - Insights`

**New sections added:**
- `03 - My Assets` (carved out from old 03)
- `05 - Asset Operations` (new — from batch2)
- `13 - External Tokens` (new — from batch2)
- `17 - Addons` (new — from batch2, with Exchange XvP and Yield subfolders)
- `18 - Contacts` (new — from batch2)

**New subfolders in 04 - Asset Designer:**
- `Bond Tokenisation/` (20 steps)
- `Equity Tokenisation/` (20 steps)
- `Fund Tokenisation/` (21 steps)
- `Deposit Tokenisation/` (19 steps)
- `Stablecoin Tokenisation/` (20 steps)
- `Precious Metal Tokenisation/` (8 steps)
- `Real Estate Tokenisation/` (21 steps)

**Staging folders deleted:**
- `new-2026-03-24/` (subset of batch2, deleted)
- `new-2026-03-24-batch2/` (main source, processed and deleted)

**Filename normalizations (trailing spaces stripped):**
- `Dashboard 03 .jpg` → `Dashboard 03.jpg`
- `Portfolio Insights .jpg` → `Portfolio Insights.jpg`
- `Portfolio Insights 2  .jpg` → `Portfolio Insights 2.jpg`
- `00  Asset Designer.jpg` → `Asset Designer Overview.jpg`
- `Tokenised Depoit .jpg` → `Tokenised Deposit.jpg` (typo fixed)
- `0 XvP .jpg` → `XvP Overview.jpg`
- `Asset flow step final .jpg` → `Asset Flow Step Final.jpg`
- `Created Flow2 .jpg` → `Created Flow 2.jpg`
- Various Asset Designer wizard step names (all trailing spaces stripped)
- Various Asset Operations names (step 0 → Step 0, etc.)
- `0 Instrument Templates Page  .jpg` → `Instrument Templates - Page.jpg`
- `Creating Policy Templates 1 .jpg` → `Policy Templates - Creating 1.jpg`
- `Creating Policy Templates 2 .jpg` → `Policy Templates - Creating 2.jpg`

**Source renames from batch2 (descriptive renaming):**
- `Asset Management/9. External Tokens/jpg/1.jpg` → `External Tokens 1.jpg`
- `Asset Management/9. External Tokens/jpg/2.jpg` → `External Tokens 2.jpg`
- `Contacts/jpg/1–5.jpg` → `Contacts 1–5.jpg`
- `Actions/jpg/0–4.jpg` → `Actions Step 1–5.jpg`
- `Asset Management/0. Asset Manager/Forced Transfer/jpg/1–6.jpg` → `Step 1–6.jpg`
- `Asset Management/0. Asset Manager/Freeze/jpg/step 0–4.jpg` → `Step 0–4.jpg`
- `Asset Management/0. Asset Manager/Mint Tokens/jpg/step 1–4.jpg` → `Step 1–4.jpg`
- `Asset Management/0. Asset Manager/Transfer Tokens/jpg/1–7.jpg` → `Step 1–7.jpg`
- `Asset Management/0. Asset Manager/Unfreeze/jpg/step 0.jpg` → `Step 0.jpg`
- `Platform Settings/Verification/jpg/1 Verification Topic.jpg` → `Verification Topics 1.jpg`
- `Platform Settings/Verification/jpg/2 Verification Topic.jpg` → `Verification Topics 2.jpg`
- `Platform Settings/Verification/jpg/3 Trusted issuer.jpg` → `Trusted Issuers 1.jpg`
- `Platform Settings/Verification/jpg/4 Trusted issuer.jpg` → `Trusted Issuers 2.jpg`
- `Platform Settings/Verification/jpg/5 Data Feeds.jpg` → `Data Feeds 1.jpg`
- `Platform Settings/Verification/jpg/6 Data Feeds.jpg` → `Data Feeds 2.jpg`
- `Addons/Exchange XvP/jpg/Asset flow step 1.jpg` → `Asset Flow Step 1.jpg`
- `Addons/Exchange XvP/jpg/Asset flow step 3.1.jpg` → `Asset Flow Step 3.jpg`
- `Addons/Exchange XvP/jpg/Created Flow.jpg` → `Created Flow 1.jpg`
- `Addons/Yield/jpg/Income yield.jpg` → `Income Yield.jpg`

---

## Complete Screenshot Index

> **Coverage:** 297 JPG files. Every file is listed exactly once. Paths are relative to the `dalp-screenshots/` root.

| Path | Short Description |
|---|---|
| `01 - Login/jpg/Login.jpg` | DALP sign-in page with email/password and passwordless passkey option |
| `02 - Dashboard/jpg/Dashboard - Map and Statistics 2.jpg` | Asset analytics: Doha/Qatar map with token supply, mint/burn, volume, and wallet distribution charts (alt view) |
| `02 - Dashboard/jpg/Dashboard - Map and Statistics.jpg` | Asset analytics: Doha/Qatar map with token supply history, supply changes, transaction volume, and wallet distribution |
| `02 - Dashboard/jpg/Dashboard 01.jpg` | Full-screen administration dashboard — current UI (batch 2 version 1) |
| `02 - Dashboard/jpg/Dashboard 02.jpg` | Full-screen administration dashboard — current UI (batch 2 version 2) |
| `02 - Dashboard/jpg/Dashboard 03.jpg` | Full-screen administration dashboard — current UI (batch 2 version 3) |
| `02 - Dashboard/jpg/Dashboard 1.jpg` | Main dashboard upper section: $276M portfolio, 13.2B AUM, pending action alert, live blockchain activity feed |
| `02 - Dashboard/jpg/Dashboard 2.jpg` | Dashboard scrolled: Identity Manager module with pending verification badge and Verification Policy Manager card |
| `02 - Dashboard/jpg/Dashboard 3.jpg` | Dashboard mid-section: 39 identities, 4 trusted issuers, 384 active verifications, partial world map |
| `02 - Dashboard/jpg/Dashboard 4.jpg` | Dashboard bottom: "Assets by jurisdiction" choropleth world map with country-level asset concentration |
| `03 - My Assets/jpg/My Assets.jpg` | Personal asset portfolio view: 7 assets across 4 classes totalling $276M with balance/frozen/available columns |
| `03 - My Assets/jpg/Portfolio Insights 2.jpg` | Portfolio insights dashboard: three donut charts for asset value, supply, and class distribution (alt account) |
| `03 - My Assets/jpg/Portfolio Insights.jpg` | Portfolio insights dashboard: three donut charts breaking down tokenized portfolio by instrument, count, and class |
| `04 - Asset Designer/Bond Tokenisation/jpg/01 Step Bond Tokenisation.jpg` | Bond tokenisation wizard step 1: asset class selection screen |
| `04 - Asset Designer/Bond Tokenisation/jpg/02 Step Bond Choosing Instrument.jpg` | Bond tokenisation step 2: choose Fixed Income instrument type |
| `04 - Asset Designer/Bond Tokenisation/jpg/03 Step Bond Information.jpg` | Bond tokenisation step 3: enter bond name, symbol, decimals, and jurisdiction |
| `04 - Asset Designer/Bond Tokenisation/jpg/04 Step Instrument Details.jpg` | Bond tokenisation step 4: maturity date and ISIN entry |
| `04 - Asset Designer/Bond Tokenisation/jpg/05 Step Bond pricing and valuation.jpg` | Bond tokenisation step 5: pricing configuration — denomination asset, face value, maximum supply |
| `04 - Asset Designer/Bond Tokenisation/jpg/06 Step Complaince Modules.jpg` | Bond tokenisation step 6: compliance module selection from the policy template library |
| `04 - Asset Designer/Bond Tokenisation/jpg/07 Step Supply Cap.jpg` | Bond tokenisation step 7: configure rolling supply cap (max tokens per time window) |
| `04 - Asset Designer/Bond Tokenisation/jpg/08 Step Colleteral Requirement.jpg` | Bond tokenisation step 8: set collateral requirement for the bond |
| `04 - Asset Designer/Bond Tokenisation/jpg/09 Step Time Lock.jpg` | Bond tokenisation step 9: configure time lock on token transfers |
| `04 - Asset Designer/Bond Tokenisation/jpg/10 Step Block Addresses.jpg` | Bond tokenisation step 10: block specific wallet addresses from holding or transferring tokens |
| `04 - Asset Designer/Bond Tokenisation/jpg/11 Step Transfer Approval.jpg` | Bond tokenisation step 11: enable mandatory transfer approval workflow |
| `04 - Asset Designer/Bond Tokenisation/jpg/12 Step Country Blocklist.jpg` | Bond tokenisation step 12: restrict token transfers to/from specific countries |
| `04 - Asset Designer/Bond Tokenisation/jpg/13 Step Identity Blocklist.jpg` | Bond tokenisation step 13: exclude specific on-chain identities from holding tokens |
| `04 - Asset Designer/Bond Tokenisation/jpg/14 Step Investor count.jpg` | Bond tokenisation step 14: set maximum number of investors allowed to hold the bond |
| `04 - Asset Designer/Bond Tokenisation/jpg/15 Step Identity allowlist.jpg` | Bond tokenisation step 15: allowlist specific on-chain identities for token holding |
| `04 - Asset Designer/Bond Tokenisation/jpg/16 Step Token Supply Limit.jpg` | Bond tokenisation step 16: configure absolute token supply ceiling |
| `04 - Asset Designer/Bond Tokenisation/jpg/17 Step Smart Identity Verification.jpg` | Bond tokenisation step 17: SMART identity expression builder for investor eligibility |
| `04 - Asset Designer/Bond Tokenisation/jpg/18 Step Country allowlist.jpg` | Bond tokenisation step 18: configure permitted countries for investor participation |
| `04 - Asset Designer/Bond Tokenisation/jpg/19 Step Asset Permissions.jpg` | Bond tokenisation step 19: assign roles (admin, issuer, custodian) to named participants |
| `04 - Asset Designer/Bond Tokenisation/jpg/20 Step Review and Deploy.jpg` | Bond tokenisation step 20: full configuration review before smart contract deployment |
| `04 - Asset Designer/Deposit Tokenisation/jpg/01 Step Tokenised Deposit.jpg` | Deposit tokenisation wizard step 1: asset class selection |
| `04 - Asset Designer/Deposit Tokenisation/jpg/02 Step Tokenised Deposit.jpg` | Deposit tokenisation step 2: choose Cash Equivalent instrument type |
| `04 - Asset Designer/Deposit Tokenisation/jpg/03 Step Tokenised Deposit Information.jpg` | Deposit tokenisation step 3: deposit name, symbol, decimals, jurisdiction |
| `04 - Asset Designer/Deposit Tokenisation/jpg/04 Tokenised Deposit Pricing and Valuation.jpg` | Deposit tokenisation step 4: configure denomination and pricing |
| `04 - Asset Designer/Deposit Tokenisation/jpg/05 Step Tokenised Deposit Complaince Modules.jpg` | Deposit tokenisation step 5: compliance module selection |
| `04 - Asset Designer/Deposit Tokenisation/jpg/06 Step Blocked Addresses.jpg` | Deposit tokenisation step 6: block specific wallet addresses |
| `04 - Asset Designer/Deposit Tokenisation/jpg/07 Tokenised Deposit Identity Blocklist.jpg` | Deposit tokenisation step 7: identity-level blocklist configuration |
| `04 - Asset Designer/Deposit Tokenisation/jpg/08 Step Collateral Requirement.jpg` | Deposit tokenisation step 8: collateral requirement setup |
| `04 - Asset Designer/Deposit Tokenisation/jpg/09 Step Tokenised Deposits Time Lock.jpg` | Deposit tokenisation step 9: time lock on deposit token transfers |
| `04 - Asset Designer/Deposit Tokenisation/jpg/10 Tokenised Deposits Token Supply Limit.jpg` | Deposit tokenisation step 10: maximum token supply configuration |
| `04 - Asset Designer/Deposit Tokenisation/jpg/11 Step Tokenised Deposit Transfer Approval.jpg` | Deposit tokenisation step 11: transfer approval workflow setup |
| `04 - Asset Designer/Deposit Tokenisation/jpg/12 Step.jpg` | Deposit tokenisation step 12 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/13 Step.jpg` | Deposit tokenisation step 13 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/14 Step.jpg` | Deposit tokenisation step 14 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/15 Step.jpg` | Deposit tokenisation step 15 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/16 Step.jpg` | Deposit tokenisation step 16 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/17 Step.jpg` | Deposit tokenisation step 17 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/18 Step.jpg` | Deposit tokenisation step 18 |
| `04 - Asset Designer/Deposit Tokenisation/jpg/19 Step.jpg` | Deposit tokenisation step 19: final review and deploy for deposit token |
| `04 - Asset Designer/Equity Tokenisation/jpg/01 Step.jpg` | Equity tokenisation wizard step 1: asset class selection |
| `04 - Asset Designer/Equity Tokenisation/jpg/02 Step.jpg` | Equity tokenisation step 2: choose Flexible Income instrument type |
| `04 - Asset Designer/Equity Tokenisation/jpg/03 Step.jpg` | Equity tokenisation step 3: equity name, symbol, decimals, jurisdiction |
| `04 - Asset Designer/Equity Tokenisation/jpg/04 Step.jpg` | Equity tokenisation step 4: instrument-specific details (share class, voting rights) |
| `04 - Asset Designer/Equity Tokenisation/jpg/05 Step Tokenised Equity Pricing.jpg` | Equity tokenisation step 5: pricing and valuation setup |
| `04 - Asset Designer/Equity Tokenisation/jpg/06 Step Tokenised Equtiy Complaince Modules.jpg` | Equity tokenisation step 6: compliance module selection |
| `04 - Asset Designer/Equity Tokenisation/jpg/07 Step Supply cap.jpg` | Equity tokenisation step 7: rolling supply cap configuration |
| `04 - Asset Designer/Equity Tokenisation/jpg/08 Step Investor count.jpg` | Equity tokenisation step 8: maximum investor count limit |
| `04 - Asset Designer/Equity Tokenisation/jpg/09 Step Identity allowlist.jpg` | Equity tokenisation step 9: identity allowlist for approved shareholders |
| `04 - Asset Designer/Equity Tokenisation/jpg/10 Step Block Addresses.jpg` | Equity tokenisation step 10: block specific wallet addresses |
| `04 - Asset Designer/Equity Tokenisation/jpg/11 Step Identity Blocklist.jpg` | Equity tokenisation step 11: identity-level blocklist |
| `04 - Asset Designer/Equity Tokenisation/jpg/12 Step Tokenised Equity Collateral Requirement.jpg` | Equity tokenisation step 12: collateral ratio requirement |
| `04 - Asset Designer/Equity Tokenisation/jpg/13 Step Time Lock.jpg` | Equity tokenisation step 13: transfer time lock |
| `04 - Asset Designer/Equity Tokenisation/jpg/14 Step Token Supply Limit.jpg` | Equity tokenisation step 14: hard maximum token supply ceiling |
| `04 - Asset Designer/Equity Tokenisation/jpg/15 Step Transfer Approval.jpg` | Equity tokenisation step 15: mandatory transfer approval workflow |
| `04 - Asset Designer/Equity Tokenisation/jpg/16 Step Country Blocklist.jpg` | Equity tokenisation step 16: blocked countries configuration |
| `04 - Asset Designer/Equity Tokenisation/jpg/17 Step Identity Verification.jpg` | Equity tokenisation step 17: SMART identity verification expression |
| `04 - Asset Designer/Equity Tokenisation/jpg/18 Step Country allowlist.jpg` | Equity tokenisation step 18: permitted countries for equity holders |
| `04 - Asset Designer/Equity Tokenisation/jpg/19 Step Asset Permission.jpg` | Equity tokenisation step 19: assign governance roles to participants |
| `04 - Asset Designer/Equity Tokenisation/jpg/20 Step Review and Deploy.jpg` | Equity tokenisation step 20: full review before smart contract deployment |
| `04 - Asset Designer/Fund Tokenisation/jpg/01 Step Fund Tokenisation.jpg` | Fund tokenisation wizard step 1: asset class selection |
| `04 - Asset Designer/Fund Tokenisation/jpg/02 Step Fund Tokenisation.jpg` | Fund tokenisation step 2: choose Flexible Income / Fund instrument type |
| `04 - Asset Designer/Fund Tokenisation/jpg/03 Step Fund Information.jpg` | Fund tokenisation step 3: fund name, symbol, decimals, jurisdiction |
| `04 - Asset Designer/Fund Tokenisation/jpg/04 Step Instrument Details.jpg` | Fund tokenisation step 4: fund-specific details (category, class, management fee) |
| `04 - Asset Designer/Fund Tokenisation/jpg/05 Step Pricing & Valuation.jpg` | Fund tokenisation step 5: NAV/pricing and valuation configuration |
| `04 - Asset Designer/Fund Tokenisation/jpg/06 Step.jpg` | Fund tokenisation step 6: compliance module selection |
| `04 - Asset Designer/Fund Tokenisation/jpg/07 Step Supply Cap.jpg` | Fund tokenisation step 7: rolling supply cap |
| `04 - Asset Designer/Fund Tokenisation/jpg/08 Step Investor Count.jpg` | Fund tokenisation step 8: maximum investor count |
| `04 - Asset Designer/Fund Tokenisation/jpg/09 Step Identity Allowlist.jpg` | Fund tokenisation step 9: allowlist approved investors by on-chain identity |
| `04 - Asset Designer/Fund Tokenisation/jpg/10 Step Token Supply Limit.jpg` | Fund tokenisation step 10: absolute token supply ceiling |
| `04 - Asset Designer/Fund Tokenisation/jpg/11 Step Transfer Approval.jpg` | Fund tokenisation step 11: mandatory transfer approval |
| `04 - Asset Designer/Fund Tokenisation/jpg/12 Step Country Blocklist.jpg` | Fund tokenisation step 12: restricted countries |
| `04 - Asset Designer/Fund Tokenisation/jpg/13 Step Fund Tokenisation Identity Blocklist.jpg` | Fund tokenisation step 13: identity-level blocklist |
| `04 - Asset Designer/Fund Tokenisation/jpg/14 Step Fund Tokens Collateral requirement.jpg` | Fund tokenisation step 14: collateral requirement |
| `04 - Asset Designer/Fund Tokenisation/jpg/15 Step Fund Tokenisation Time Lock.jpg` | Fund tokenisation step 15: transfer time lock |
| `04 - Asset Designer/Fund Tokenisation/jpg/16 Step Fund Tokenisation Block Addresses.jpg` | Fund tokenisation step 16: block specific addresses |
| `04 - Asset Designer/Fund Tokenisation/jpg/17 Step Smart Identity Verification.jpg` | Fund tokenisation step 17: SMART identity expression builder |
| `04 - Asset Designer/Fund Tokenisation/jpg/18 Step  Country Allowlist.jpg` | Fund tokenisation step 18: permitted countries (variant A) |
| `04 - Asset Designer/Fund Tokenisation/jpg/18 Step Country Allowlist.jpg` | Fund tokenisation step 18: permitted countries (variant B) |
| `04 - Asset Designer/Fund Tokenisation/jpg/19 Step Asset Permissions.jpg` | Fund tokenisation step 19: governance role assignments |
| `04 - Asset Designer/Fund Tokenisation/jpg/Final Step Review And Deploy.jpg` | Fund tokenisation final step: full configuration review before smart contract deployment |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/01 Step.jpg` | Precious metal tokenisation wizard step 1: asset class selection |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/02 Step.jpg` | Precious metal tokenisation step 2: choose Real World Asset / precious metal type |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/03 Step.jpg` | Precious metal tokenisation step 3: metal name, symbol, decimals, jurisdiction |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/04 Step.jpg` | Precious metal tokenisation step 4: metal-specific details (metal type, storage location, custodian) |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/05 Step.jpg` | Precious metal tokenisation step 5: pricing and valuation |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/06 Step.jpg` | Precious metal tokenisation step 6: compliance modules |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/07 Step.jpg` | Precious metal tokenisation step 7: asset permissions and governance roles |
| `04 - Asset Designer/Precious Metal Tokenisation/jpg/08 Step.jpg` | Precious metal tokenisation step 8: review and deploy |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/01 Step Tokenised Real World Asset.jpg` | Real estate tokenisation wizard step 1: asset class selection (RWA) |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/02 Step Tokenised real Estate.jpg` | Real estate tokenisation step 2: choose Real Estate instrument type |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/03 Step Tokenised Real Estate information.jpg` | Real estate tokenisation step 3: property name, symbol, decimals, jurisdiction |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/04 Step Tokenised Real Estate Instrument Details.jpg` | Real estate tokenisation step 4: GPS coordinates, property type, city, district |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/05 Tokenised Real Estate Pricing and Valuation.jpg` | Real estate tokenisation step 5: token price and total supply (e.g. 1M tokens × $100 = $100M) |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/06 Step Tokenised Real Estate Compliance modules.jpg` | Real estate tokenisation step 6: compliance module selection |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/07 Step Tokenised Real-Estate Supply cap.jpg` | Real estate tokenisation step 7: rolling supply cap |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/08 Step Tokenised Real Estate  Investor Count.jpg` | Real estate tokenisation step 8: maximum investor count |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/09 Step Identity allowlist.jpg` | Real estate tokenisation step 9: identity allowlist |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/10 Step Identity blocklist.jpg` | Real estate tokenisation step 10: identity blocklist |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/11 Step Token Supply Limit.jpg` | Real estate tokenisation step 11: absolute token supply ceiling |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/12 Step.jpg` | Real estate tokenisation step 12 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/13 Step.jpg` | Real estate tokenisation step 13 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/14 Step.jpg` | Real estate tokenisation step 14 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/15 Step.jpg` | Real estate tokenisation step 15 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/16 Step.jpg` | Real estate tokenisation step 16 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/17 Step.jpg` | Real estate tokenisation step 17 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/18 Step.jpg` | Real estate tokenisation step 18 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/19 Step.jpg` | Real estate tokenisation step 19 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/20 Step.jpg` | Real estate tokenisation step 20 |
| `04 - Asset Designer/Real Estate Tokenisation/jpg/21 Final Step.jpg` | Real estate tokenisation final step: full review before smart contract deployment |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/01 Step Stablecoin.jpg` | Stablecoin tokenisation wizard step 1: asset class selection |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/02 Step.jpg` | Stablecoin tokenisation step 2: choose Cash Equivalent / stablecoin instrument |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/03 Step Stablecoin Information.jpg` | Stablecoin tokenisation step 3: name, symbol, decimals, jurisdiction |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/04 Step Instrument Details.jpg` | Stablecoin tokenisation step 4: peg currency and instrument details |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/05 Step Stablecoin Pricing and valuation.jpg` | Stablecoin tokenisation step 5: pricing and valuation |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/06 Step Complaince Modules.jpg` | Stablecoin tokenisation step 6: compliance module selection |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/07 Step Stablecoin Supply Cap.jpg` | Stablecoin tokenisation step 7: rolling supply cap (e.g. MiCA 8M/12-month cap) |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/08 Step Stablecoin Investor Count.jpg` | Stablecoin tokenisation step 8: maximum holder count |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/09 Step Stablecoin Identity allowlist.jpg` | Stablecoin tokenisation step 9: identity allowlist |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/10 Step Stablecoin Token Supply Limit.jpg` | Stablecoin tokenisation step 10: absolute supply ceiling |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/11 Step Stablecoin Transfer Approval.jpg` | Stablecoin tokenisation step 11: mandatory transfer approval |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/12 Step Stablecoin Time lock.jpg` | Stablecoin tokenisation step 12: time lock on transfers |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/13 Step Block Addresses.jpg` | Stablecoin tokenisation step 13: block specific wallet addresses |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/14 Step Country blocklist.jpg` | Stablecoin tokenisation step 14: blocked countries |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/15 Step Identity blocklist.jpg` | Stablecoin tokenisation step 15: identity-level blocklist |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/16 Step  Stablecoin Collateral requirement.jpg` | Stablecoin tokenisation step 16: collateral requirement |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/17 Step Stablecon SMART identity verification.jpg` | Stablecoin tokenisation step 17: SMART identity verification expression |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/18 Step Stablecoin Country allowlist.jpg` | Stablecoin tokenisation step 18: permitted countries |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/19 Step Stablecoin Asset permissions.jpg` | Stablecoin tokenisation step 19: governance role assignments |
| `04 - Asset Designer/Stablecoin Tokenisation/jpg/20 Step Review and Deploy.jpg` | Stablecoin tokenisation step 20: full review before smart contract deployment |
| `04 - Asset Designer/jpg/Asset Designer - Step 3 - Real Estate Info.jpg` | Asset Designer (legacy): step 3 — real estate name "Doha Business Towers", symbol DBT, jurisdiction Qatar |
| `04 - Asset Designer/jpg/Asset Designer - Step 4 - Instrument Details Form.jpg` | Asset Designer (legacy): step 4 — property area 100,000 m², building year 2015, number of units 500 |
| `04 - Asset Designer/jpg/Asset Designer - Step 4 - Instrument Details.jpg` | Asset Designer (legacy): step 4 — GPS coordinates, property type, city, district code |
| `04 - Asset Designer/jpg/Asset Designer - Step 5 - Pricing and Valuation.jpg` | Asset Designer (legacy): step 5 — 1,000,000 tokens at $100 each = $100M property valuation |
| `04 - Asset Designer/jpg/Asset Designer - Step 6 - Compliance Modules.jpg` | Asset Designer (legacy): step 6 — compliance template selection with MiCA EU Standard chosen |
| `04 - Asset Designer/jpg/Asset Designer - Step 7 - Asset Permissions Config.jpg` | Asset Designer (legacy): step 7 — add permission panel, Anna Schmidt assigned as Custodian |
| `04 - Asset Designer/jpg/Asset Designer - Step 7 - Asset Permissions List.jpg` | Asset Designer (legacy): step 7 — three-party governance: Ada Admin, Anna Schmidt, Yuki Tanaka |
| `04 - Asset Designer/jpg/Asset Designer Compliance Country Allowlist.jpg` | Asset Designer compliance step 8: all 27 EU member states pre-populated for MiCA |
| `04 - Asset Designer/jpg/Asset Designer Compliance Expression.jpg` | Asset Designer compliance step 7: complex 9-condition expression (KYC, AML, accredited investor, etc.) |
| `04 - Asset Designer/jpg/Asset Designer Compliance Identity.jpg` | Asset Designer compliance step 7: SMART identity verification — KYC AND Asset classification |
| `04 - Asset Designer/jpg/Asset Designer Compliance.jpg` | Asset Designer compliance step 6: compliance template selection with Advanced configuration toggle ON |
| `04 - Asset Designer/jpg/Asset Designer Overview.jpg` | Asset Designer main overview / entry screen |
| `04 - Asset Designer/jpg/Asset Designer Permissions.jpg` | Asset Designer step 10: 5-party governance — System Admin, Asset Issuer, Emma Chen, Hans Mueller, Quinn Walker |
| `04 - Asset Designer/jpg/Asset Designer Review and Deploy 1.jpg` | Asset Designer step 11 (review): Gold Bond GOLBON, ISIN, Jurisdiction France |
| `04 - Asset Designer/jpg/Asset Designer Review and Deploy 2.jpg` | Asset Designer step 11 (review scrolled): compliance modules + 5-party permission roster |
| `04 - Asset Designer/jpg/Asset Designer Supply Limit.jpg` | Asset Designer step 9: MiCA EU rolling annual supply cap — 8,000,000 tokens / 365 days |
| `04 - Asset Designer/jpg/Asset Designer.jpg` | Asset Designer step 1: asset class selection — Fixed Income, Flexible Income, Cash Equivalent, Real World Asset |
| `04 - Asset Designer/jpg/Design Bond 1.jpg` | Bond design step 2: select Fixed Income / Bond type with capability checklist |
| `04 - Asset Designer/jpg/Design Bond 2.jpg` | Bond design step 3: bond information form — name "Gold Bond", symbol GOLBON, decimals 18, jurisdiction France |
| `04 - Asset Designer/jpg/Design Bond 3.jpg` | Bond design step 4: instrument details — maturity date March 2026, ISIN US0378331005 |
| `04 - Asset Designer/jpg/Design Bond 4.jpg` | Bond design step 5: pricing (initial) — maximum limit 100,000 GOLBON |
| `04 - Asset Designer/jpg/Design Bond 5.jpg` | Bond design step 5: pricing (completed) — denomination asset Deutsche Bank Euro Deposit, face value 1,000 DEED |
| `05 - Asset Operations/Forced Transfer/jpg/Step 1.jpg` | Forced transfer workflow step 1: initiate regulatory forced transfer from asset detail |
| `05 - Asset Operations/Forced Transfer/jpg/Step 2.jpg` | Forced transfer step 2: select source address for forced transfer |
| `05 - Asset Operations/Forced Transfer/jpg/Step 3.jpg` | Forced transfer step 3: select destination address |
| `05 - Asset Operations/Forced Transfer/jpg/Step 4.jpg` | Forced transfer step 4: enter amount to force-transfer |
| `05 - Asset Operations/Forced Transfer/jpg/Step 5.jpg` | Forced transfer step 5: review forced transfer details |
| `05 - Asset Operations/Forced Transfer/jpg/Step 6.jpg` | Forced transfer step 6: confirm and submit forced transfer to blockchain |
| `05 - Asset Operations/Freeze/jpg/Step 0.jpg` | Freeze workflow step 0: pre-freeze state showing unfrozen account |
| `05 - Asset Operations/Freeze/jpg/Step 1.jpg` | Freeze workflow step 1: initiate account/token freeze |
| `05 - Asset Operations/Freeze/jpg/Step 2.jpg` | Freeze workflow step 2: select address to freeze |
| `05 - Asset Operations/Freeze/jpg/Step 3.jpg` | Freeze workflow step 3: review freeze action |
| `05 - Asset Operations/Freeze/jpg/Step 4.jpg` | Freeze workflow step 4: confirm freeze — tokens marked as frozen on-chain |
| `05 - Asset Operations/Mint Tokens/jpg/Step 1.jpg` | Mint tokens workflow step 1: open mint panel from asset detail page |
| `05 - Asset Operations/Mint Tokens/jpg/Step 2.jpg` | Mint tokens step 2: select recipient address |
| `05 - Asset Operations/Mint Tokens/jpg/Step 3.jpg` | Mint tokens step 3: enter amount to mint |
| `05 - Asset Operations/Mint Tokens/jpg/Step 4.jpg` | Mint tokens step 4: confirm and submit minting transaction |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 1.jpg` | Transfer tokens workflow step 1: initiate transfer from asset detail |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 2.jpg` | Transfer tokens step 2: select sender / source address |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 3.jpg` | Transfer tokens step 3: select recipient address |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 4.jpg` | Transfer tokens step 4: enter amount to transfer |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 5.jpg` | Transfer tokens step 5: compliance check / pre-transfer validation |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 6.jpg` | Transfer tokens step 6: review transfer details |
| `05 - Asset Operations/Transfer Tokens/jpg/Step 7.jpg` | Transfer tokens step 7: confirm and broadcast transfer transaction |
| `05 - Asset Operations/Unfreeze/jpg/Step 0.jpg` | Unfreeze workflow step 0: pre-unfreeze state showing frozen account |
| `05 - Asset Operations/Unfreeze/jpg/Step 1.jpg` | Unfreeze workflow step 1: initiate unfreeze action |
| `05 - Asset Operations/Unfreeze/jpg/Step 2.jpg` | Unfreeze workflow step 2: select address to unfreeze |
| `05 - Asset Operations/Unfreeze/jpg/Step 3.jpg` | Unfreeze workflow step 3: review unfreeze action |
| `05 - Asset Operations/Unfreeze/jpg/Step 4.jpg` | Unfreeze workflow step 4: confirm unfreeze — tokens restored to transferable state |
| `06 - Bonds/jpg/Bonds Detail 1.jpg` | Municipal Bond Tokyo (MUBTOK): asset details — maturity Feb 2031, 100% redemption, 10-tab interface |
| `06 - Bonds/jpg/Bonds Detail 2.jpg` | Municipal Bond Tokyo: yield tab — 5-year annual yield schedule 2026–2031, 500,000 MIZY denomination reserve |
| `06 - Bonds/jpg/Bonds Detail 3.jpg` | Municipal Bond Tokyo: events tab — on-chain audit trail: Yield Schedule Set, Transfer Completed, Checkpoint Updated |
| `06 - Bonds/jpg/Bonds Detail 4.jpg` | Municipal Bond Tokyo: compliance tab with "Issue verification" panel — issuerLicensed verification topic |
| `06 - Bonds/jpg/Bonds Listing.jpg` | Bonds listing: 10 bonds across 9 currencies (EUR, MYR, CAD, CHF, SAR, AED, SGD, JPY, GBP) with diverse types |
| `06 - Bonds/jpg/Tokenised Bond.jpg` | Tokenised bonds overview / listing screen (current UI) |
| `07 - Equity/jpg/Equity Detail 1.jpg` | Pacific Equity Common (PECOM): 151.52% collateral coverage, $770M market cap, minting capacity tracking |
| `07 - Equity/jpg/Equity Listing.jpg` | Equities listing: 10 equities in 3 share types (Common, Preferred, Voting) across EUR and USD |
| `07 - Equity/jpg/Tokenised Equity.jpg` | Tokenised equities overview / listing screen (current UI) |
| `08 - Funds/jpg/Fund Detail 1.jpg` | Sustainable Impact Fund (SIF): asset details — category Emerging Markets, management fee, $550M AUM |
| `08 - Funds/jpg/Fund Detail 2.jpg` | Sustainable Impact Fund: verifications tab — 4 active ONCHAINID verifications (base price, issuer, identity, classification) |
| `08 - Funds/jpg/Funds Listing.jpg` | Funds listing: 10 funds including VC, PE, hedge, emerging markets, sustainable — all 18 decimals for fractional ownership |
| `08 - Funds/jpg/Tokenised Fund.jpg` | Tokenised funds overview / listing screen (current UI) |
| `09 - Deposits/jpg/Deposits Listing.jpg` | Deposits listing: UBS Swiss, DBS Singapore, Saudi Riyal, Emirates Dirham deposits — multi-currency |
| `09 - Deposits/jpg/Tokenised Deposit.jpg` | Tokenised deposits overview / listing screen (current UI) |
| `10 - Stablecoins/jpg/Stablecoin Detail 1.jpg` | Singapore Dollar Coin (SGDC): asset details — 1:1 SGD peg, peg currency stored on-chain |
| `10 - Stablecoins/jpg/Stablecoins.jpg` | Stablecoins listing: 10 stablecoins — USDT, USDC, EURS, EUROC plus AED, SGD, CAD, JPY custom stablecoins |
| `10 - Stablecoins/jpg/Tokenised Stablecoin.jpg` | Tokenised stablecoins overview / listing screen (current UI) |
| `11 - Precious Metals/jpg/Precious Metal 1.jpg` | Brinks Gold Token (BGT): asset details — storage London, custodian Brinks, $2B total market value |
| `11 - Precious Metals/jpg/Precious Metals Listing.jpg` | Precious metals listing: 10 tokens across gold, silver, palladium, platinum — Brinks, Loomis, and other custodians |
| `11 - Precious Metals/jpg/Tokenised Metals.jpg` | Tokenised precious metals overview / listing screen (current UI) |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Asset Details.jpg` | Doha Business Towers (DBT): GPS-mapped, 100,000 m², 500 units, 1M tokens × $100 = $100M with embedded map |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Create Data Feed.jpg` | Doha Business Towers: "Create data feed" modal — asset-scoped Numeric/Scalar feed |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Events.jpg` | Doha Business Towers: events tab — permanent on-chain event log |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Mint Tokens Confirm.jpg` | Doha Business Towers: mint tokens panel — recipient Ada Admin, amount 5,000 DBT, Continue active |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Mint Tokens.jpg` | Doha Business Towers: mint tokens panel (initial) — amount 500 DBT, recipient not yet selected |
| `12 - Real Estate/jpg/Real Estate - Doha Business Towers - Verifications.jpg` | Doha Business Towers: 8 on-chain verifications — GPS, classification, location, identity, price, issuer, physical details, REN |
| `12 - Real Estate/jpg/Real Estate 1.jpg` | Brussels Central Apartments (BCAPT): property type Apartment, Residential use, Brussels, $250M total value |
| `12 - Real Estate/jpg/Real Estate Assets - Listing.jpg` | Real estate listing (Ada Admin): 10 properties in EUR, USD, GBP, JPY, SGD — Manhattan, Tokyo, Dubai, Riyadh, etc. |
| `12 - Real Estate/jpg/Real Estate Listing.jpg` | Real estate listing (System Admin): 10 global properties — Bangkok, Berlin, Paris, Dubai, Singapore, Brussels, etc. |
| `13 - External Tokens/jpg/External Tokens 1.jpg` | External tokens management — view 1: managing third-party and cross-chain tokens alongside DALP-native assets |
| `13 - External Tokens/jpg/External Tokens 2.jpg` | External tokens management — view 2: alternative state of external token registry |
| `14 - Compliance and Policy Templates/jpg/Compliance Policy Detail 1.jpg` | MAS Singapore Capital Markets policy: 4 controls — SMART identity, country allowlist, investor count, time lock |
| `14 - Compliance and Policy Templates/jpg/Compliance Policy Detail 2.jpg` | MiCA EU Standard policy: 3 controls — SMART identity, country allowlist, 8M EUR/12-month rolling supply cap |
| `14 - Compliance and Policy Templates/jpg/Compliance Policy Templates.jpg` | Policy templates library: 7 pre-built templates — Japan FSA, MAS Singapore, MiCA EU, Reg CF, Reg D 506(b)/(c), UK FCA |
| `14 - Compliance and Policy Templates/jpg/Instrument Template - Add Metadata Field.jpg` | Instrument template editor: "Add metadata field" panel — string/number/enum types, mutability, required toggle |
| `14 - Compliance and Policy Templates/jpg/Instrument Template - Metadata Field City Config.jpg` | Instrument template: city field configured as string, restricted-mutable, not required |
| `14 - Compliance and Policy Templates/jpg/Instrument Template - Qatar Real Estate - Metadata Schema.jpg` | Qatar Real Estate Token: full 6-field metadata schema — city, coordinates, propertyUse, buildingYear, districtCode |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - Creating 1.jpg` | Instrument template creation wizard step 1 |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - Creating 2.jpg` | Instrument template creation wizard step 2 |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - Creating from Existing.jpg` | "Create from Existing" instrument template flow — base new template on an existing one |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - Detail.jpg` | Instrument template detail view (Template 2): full configuration, features, and schema |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - List and Create.jpg` | Instrument templates list + create panel — 5 existing templates (Bond, Deposit, Fund, Precious Metal, StableCoin) |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - New.jpg` | New instrument template creation form |
| `14 - Compliance and Policy Templates/jpg/Instrument Templates - Page.jpg` | Instrument templates library main overview page |
| `14 - Compliance and Policy Templates/jpg/Policy Template - Expression Builder.jpg` | Compliance expression builder: "Accredited investor AND KYC" with green validation and AND/OR operators |
| `14 - Compliance and Policy Templates/jpg/Policy Template - Investor Count Config.jpg` | Investor count control configuration: Qatar = 1,000,000 maximum investors |
| `14 - Compliance and Policy Templates/jpg/Policy Template - Investor Count Disable Dialog.jpg` | Investor count control active: disable confirmation dialog — "This change is logged" |
| `14 - Compliance and Policy Templates/jpg/Policy Template - Qatar Real Estate Token - Overview.jpg` | Qatar Real Estate Token template: 0 active controls, 12 available controls across 7 categories |
| `14 - Compliance and Policy Templates/jpg/Policy Template - Supply Cap Detail.jpg` | Supply cap control detail panel: explanation of enforcement mechanism, Enable CTA |
| `14 - Compliance and Policy Templates/jpg/Policy Template - Token Supply Limit Config.jpg` | Token supply limit configuration: 10,000,000 maximum, 30-day rolling window |
| `14 - Compliance and Policy Templates/jpg/Policy Templates - Create From Scratch.jpg` | Create compliance template from scratch: name "Qatar Real Estate Token", jurisdiction Qatar |
| `14 - Compliance and Policy Templates/jpg/Policy Templates - Creating 1.jpg` | Policy template creation workflow step 1 |
| `14 - Compliance and Policy Templates/jpg/Policy Templates - Creating 2.jpg` | Policy template creation workflow step 2 |
| `14 - Compliance and Policy Templates/jpg/Policy Templates - List.jpg` | Policy templates list (Ada Admin): 8 templates — 7 DALP Library + 1 custom Qatar Real Estate Token (Draft) |
| `14 - Compliance and Policy Templates/jpg/Policy Templates - Page.jpg` | Policy templates library main overview page |
| `15 - Identity and Verification/jpg/Data Feeds 1.jpg` | Data feeds management page — configure and monitor on-chain feeds (view 1) |
| `15 - Identity and Verification/jpg/Data Feeds 2.jpg` | Data feeds management page — configure and monitor on-chain feeds (view 2) |
| `15 - Identity and Verification/jpg/Onchain Identity.jpg` | On-chain identity page for System Admin: QR code, Belgium registration, 2 active AML verifications |
| `15 - Identity and Verification/jpg/Trusted Issuers 1.jpg` | Trusted issuers registry — authorized parties for issuing identity claims (view 1) |
| `15 - Identity and Verification/jpg/Trusted Issuers 2.jpg` | Trusted issuers registry — authorized parties for issuing identity claims (view 2) |
| `15 - Identity and Verification/jpg/User.jpg` | Users management: 11 users, all Registered, dual-address model (EOA wallet + ONCHAINID contract) |
| `15 - Identity and Verification/jpg/Verification Topics 1.jpg` | Verification topics configuration: full list of claim types for on-chain attestation (view 1) |
| `15 - Identity and Verification/jpg/Verification Topics 2.jpg` | Verification topics configuration: full list of claim types for on-chain attestation (view 2) |
| `15 - Identity and Verification/jpg/Verification Topics.jpg` | Verification Topics & Issuers: 10 topics shown — system topics (locked) and custom topics (editable) |
| `16 - XVP Settlement/jpg/XVP Details 1.jpg` | XvP settlement detail (Pending): 0/1 approvals, HTLC badge, hashlock visible, cross-chain warning |
| `16 - XVP Settlement/jpg/XVP Details 2.jpg` | XvP settlement detail (expiring): 0/2 approvals, bilateral exchange, "expires in ~13 hours" warning |
| `16 - XVP Settlement/jpg/XVP Setup 1.jpg` | XvP settlement wizard step 1: asset flows — Quinn Walker → Emma Chen, Deutsche Bank Euro Deposit |
| `16 - XVP Settlement/jpg/XVP Setup 2.jpg` | XvP settlement step 2: configuration — name, April 2026 expiry, auto-execute, Belgium, HTLC hashlock |
| `16 - XVP Settlement/jpg/XVP Setup 3.jpg` | XvP settlement step 3 (review): two atomic legs — 100,000 DEED (local) + 500 cross-chain tokens |
| `16 - XVP Settlement/jpg/XVP Setup 4.jpg` | XvP settlement step 3 (scrolled): full hashlock revealed, settlement name and auto-execute confirmed |
| `16 - XVP Settlement/jpg/XvP API Light.jpg` | XvP settlement REST API documentation (light mode): available API endpoints |
| `17 - Addons/Exchange XvP/jpg/Asset Flow Step 1.jpg` | Exchange XvP addon: asset flow visual walkthrough step 1 |
| `17 - Addons/Exchange XvP/jpg/Asset Flow Step 2.jpg` | Exchange XvP addon: asset flow visual walkthrough step 2 |
| `17 - Addons/Exchange XvP/jpg/Asset Flow Step 3.jpg` | Exchange XvP addon: asset flow visual walkthrough step 3 |
| `17 - Addons/Exchange XvP/jpg/Asset Flow Step Final.jpg` | Exchange XvP addon: asset flow final state — atomic execution complete |
| `17 - Addons/Exchange XvP/jpg/Created Flow 1.jpg` | Exchange XvP addon: created/active settlement flow with status and counterparty details (view 1) |
| `17 - Addons/Exchange XvP/jpg/Created Flow 2.jpg` | Exchange XvP addon: created/active settlement flow (view 2) |
| `17 - Addons/Exchange XvP/jpg/XvP Overview.jpg` | Exchange XvP addon overview screen — module active in platform |
| `17 - Addons/Yield/jpg/Income Yield.jpg` | Yield addon: income yield management interface for automated distribution on tokenized assets |
| `18 - Contacts/jpg/Contacts 1.jpg` | Contacts section — platform participant directory (view 1) |
| `18 - Contacts/jpg/Contacts 2.jpg` | Contacts section — platform participant directory (view 2) |
| `18 - Contacts/jpg/Contacts 3.jpg` | Contacts section — platform participant directory (view 3) |
| `18 - Contacts/jpg/Contacts 4.jpg` | Contacts section — platform participant directory (view 4) |
| `18 - Contacts/jpg/Contacts 5.jpg` | Contacts section — platform participant directory (view 5) |
| `19 - Settings and Admin/jpg/API Keys.jpg` | API keys management: one-time display of generated key `sm_atk_b1CncizmpshVqrGP` |
| `19 - Settings and Admin/jpg/Actions Step 1.jpg` | Administrative actions workflow step 1 |
| `19 - Settings and Admin/jpg/Actions Step 2.jpg` | Administrative actions workflow step 2 |
| `19 - Settings and Admin/jpg/Actions Step 3.jpg` | Administrative actions workflow step 3 |
| `19 - Settings and Admin/jpg/Actions Step 4.jpg` | Administrative actions workflow step 4 |
| `19 - Settings and Admin/jpg/Actions Step 5.jpg` | Administrative actions workflow step 5 |
| `19 - Settings and Admin/jpg/Actions.jpg` | Actions queue (Upcoming tab): 5 scheduled "Claim yield" actions for Sovereign Bond 2029 over 5 years |
| `19 - Settings and Admin/jpg/Activity Log.jpg` | Activity log (Ada Admin): 12+ on-chain events — verifications, role grants/revocations, stablecoin issuance |
| `19 - Settings and Admin/jpg/Activity.jpg` | Activity log (System Admin): XvP Settlement Created, identity verified, bypass list updated, transfers |
| `19 - Settings and Admin/jpg/Addons.jpg` | Addons configuration: 12+ addon cards — Permit, External Transaction Fee, Fixed Yield Schedule, and more |
| `19 - Settings and Admin/jpg/Recent Activities.jpg` | Recent Activities full-page view: comprehensive filterable log of all platform events |
| `19 - Settings and Admin/jpg/Theme 1.jpg` | Theme/branding settings: logo upload, color palette tokens, live UI preview |
| `19 - Settings and Admin/jpg/Theme 2.jpg` | Theme settings (scrolled): favicon configuration and white-label login page preview |
| `19 - Settings and Admin/jpg/Tokenize Deposit 1.jpg` | Deutsche Bank Euro Deposit (DEED): asset details — institutional tokenized deposit used as settlement currency |
| `20 - Monitoring/jpg/API Monitoring - Overview.jpg` | API monitoring dashboard: 694 requests/24h, 1.2% error rate, 916ms avg response, live traffic chart |
| `20 - Monitoring/jpg/API Monitoring - Request Log.jpg` | API monitoring request log: POST /api/rpc detail — status 200, caller Ada Admin, IP, SettleMint/2.1.7 |
| `20 - Monitoring/jpg/Blockchain Monitoring.jpg` | Blockchain monitoring: chain RPC + indexer health (Healthy), block #18,173, 24h trend, updated 10s ago |
| `21 - Insights/jpg/Asset Insights.jpg` | Global asset insights: $13.17B AUM, 71 assets across 7 types, three donut charts — RWA dominates at $7.8B |
| `21 - Insights/jpg/Insights - Asset Overview.jpg` | Asset insights (Ada Admin): $142.6M portfolio, 64 assets, 7 types, real estate dominant |
| `21 - Insights/jpg/Insights 1.jpg` | Insights overview (batch 2, view 1): updated multi-dimensional asset analytics |
| `21 - Insights/jpg/Insights 2.jpg` | Insights overview (batch 2, view 2): alternative insights dashboard state |
