# DALP Screenshot Registry

**Source:** `settlemint-office-agents/shared/brand/dalp-screenshots/`
**Format:** Use `.png` files (preferred for proposals). `.jpg` available as fallback.
**Usage:** Select minimum screenshots by variant: full 12, medium 8, compact 6. Prefer variety across feature areas, distribute screenshots across relevant sections, and always use each screenshot with a descriptive caption.

---

## Selection Logic

Match screenshots to **the section where the described capability is first introduced**. Place the screenshot immediately after the paragraph that describes it, never at the end of a section as filler.

Priority order for selection:
1. **Relevance**, does this screenshot show exactly what we're discussing in this section?
2. **Variety**, don't put 3 screenshots from the same folder; spread across feature areas
3. **Asset class**, if the RFP targets a specific asset class (bonds, real estate, etc.), prefer screenshots from that folder
4. **Complexity**, prefer screenshots that show meaningful UI (workflows, config, data) over simple listing views

Minimums by variant: full 12, medium 8, compact 6. For short RFI narrative responses that are deliberately shorter than the compact skeleton, minimum 6. Distribution rule: spread screenshots across the sections where the capability is first introduced. Caption every screenshot with a `*Figure X: ...*` line immediately after the image.

---

## Screenshot Inventory by Category

### 01: Login / Authentication
| File | What It Shows | Good For |
|------|--------------|----------|
| `01 - Login/Login.png` | DALP login screen | Multi-tenancy, auth, access control intro |

### 02: Dashboard / Overview
| File | What It Shows | Good For |
|------|--------------|----------|
| `02 - Dashboard/Dashboard 1.png` | Main dashboard overview | Platform overview, executive summary |
| `02 - Dashboard/Dashboard 2.png` | Dashboard variant | Portfolio overview, asset summary |
| `02 - Dashboard/Dashboard 3.png` | Dashboard with assets | Asset management overview |
| `02 - Dashboard/Dashboard 4.png` | Dashboard with map | Geographic/global distribution |
| `02 - Dashboard/Dashboard - Map and Statistics.png` | Map + stats panel | Global investor base, geographic reach |
| `02 - Dashboard/Dashboard - Map and Statistics 2.png` | Map + stats variant | Global operations, multi-jurisdiction |

### 04: Asset Designer / Configuration
| File | What It Shows | Good For |
|------|--------------|----------|
| `04 - Asset Designer/Asset Designer.png` | Asset Designer wizard start | Asset creation intro, no-code config |
| `04 - Asset Designer/Asset Designer - Step 3 - Real Estate Info.png` | Asset info step (real estate) | Asset template configuration |
| `04 - Asset Designer/Asset Designer - Step 4 - Instrument Details.png` | Instrument details | Token parameter config |
| `04 - Asset Designer/Asset Designer - Step 4 - Instrument Details Form.png` | Instrument details form | Field-level customization |
| `04 - Asset Designer/Asset Designer - Step 5 - Pricing and Valuation.png` | Pricing setup | Valuation, NAV, pricing config |
| `04 - Asset Designer/Asset Designer - Step 6 - Compliance Modules.png` | Compliance module selection | Compliance framework, modular approach |
| `04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions Config.png` | Permissions configuration | RBAC, permission model |
| `04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions List.png` | Permissions list view | Access control list |
| `04 - Asset Designer/Asset Designer Compliance.png` | Compliance overview in designer | Compliance-by-design |
| `04 - Asset Designer/Asset Designer Compliance Country Allowlist.png` | Country allowlist config | KYC/AML, investor restriction, geo-gating |
| `04 - Asset Designer/Asset Designer Compliance Expression.png` | Compliance expression builder | Custom compliance logic |
| `04 - Asset Designer/Asset Designer Compliance Identity.png` | Identity compliance module | KYC integration, identity verification |
| `04 - Asset Designer/Asset Designer Permissions.png` | Permissions in designer | Role-based access |
| `04 - Asset Designer/Asset Designer Review and Deploy 1.png` | Deploy review screen | Deployment workflow, one-click deploy |
| `04 - Asset Designer/Asset Designer Review and Deploy 2.png` | Deploy confirmation | Smart contract deployment |
| `04 - Asset Designer/Asset Designer Supply Limit.png` | Supply limit config | Issuance controls, supply cap |
| `04 - Asset Designer/Asset Insights.png` | Asset analytics view | Analytics, reporting |
| `04 - Asset Designer/Portfolio Insights.png` | Portfolio analytics | Portfolio-level reporting |
| `04 - Asset Designer/Portfolio Insights 2.png` | Portfolio analytics variant | Investor portfolio view |
| `04 - Asset Designer/My Assets.png` | Asset listing (my assets) | Asset management overview |
| `04 - Asset Designer/Design Bond 1.png` – `Design Bond 5.png` | Bond design wizard steps | Bond issuance workflow (prefer for bond RFPs) |

### 06: Bonds
| File | What It Shows | Good For |
|------|--------------|----------|
| `06 - Bonds/Bonds Listing.png` | Bond listing view | Bond management, multi-bond operations |
| `06 - Bonds/Bonds Detail 1.png` | Bond detail, overview | Bond lifecycle, investor view |
| `06 - Bonds/Bonds Detail 2.png` | Bond detail, coupon/events | Coupon payments, corporate actions |
| `06 - Bonds/Bonds Detail 3.png` | Bond detail, compliance | Bond compliance status |
| `06 - Bonds/Bonds Detail 4.png` | Bond detail, activity | Bond transaction history |

### 07: Equity
| File | What It Shows | Good For |
|------|--------------|----------|
| `07 - Equity/Equity Listing.png` | Equity asset list | Equity tokenization, share management |
| `07 - Equity/Equity Detail 1.png` | Equity detail view | Share registry, cap table |

### 08: Funds
| File | What It Shows | Good For |
|------|--------------|----------|
| `08 - Funds/Funds Listing.png` | Fund listing | Fund tokenization, multi-fund management |
| `08 - Funds/Fund Detail 1.png` | Fund detail, overview | NAV, subscription/redemption |
| `08 - Funds/Fund Detail 2.png` | Fund detail, investors | Investor registry, distribution |

### 09: Deposits
| File | What It Shows | Good For |
|------|--------------|----------|
| `09 - Deposits/Deposits Listing.png` | Deposits listing | Tokenized deposits, bank money use cases |

### 10: Stablecoins
| File | What It Shows | Good For |
|------|--------------|----------|
| `10 - Stablecoins/Stablecoins.png` | Stablecoin listing | Stablecoin / CBDC / e-money use cases |
| `10 - Stablecoins/Stablecoin Detail 1.png` | Stablecoin detail | Stablecoin lifecycle, reserve management |

### 11: Precious Metals
| File | What It Shows | Good For |
|------|--------------|----------|
| `11 - Precious Metals/Precious Metals Listing.png` | Precious metals list | Commodity tokenization |
| `11 - Precious Metals/Precious Metal 1.png` | Precious metal detail | Gold/silver token lifecycle |

### 12: Real Estate
| File | What It Shows | Good For |
|------|--------------|----------|
| `12 - Real Estate/Real Estate Listing.png` | Real estate portfolio list | Real estate tokenization, multi-property |
| `12 - Real Estate/Real Estate Assets - Listing.png` | Asset listing (RE) | Portfolio overview |
| `12 - Real Estate/Real Estate 1.png` | Real estate overview | RE use case intro |
| `12 - Real Estate/Real Estate - Doha Business Towers - Asset Details.png` | Live asset detail | Institutional RE asset example |
| `12 - Real Estate/Real Estate - Doha Business Towers - Create Data Feed.png` | Data feed config | Oracle / external data integration |
| `12 - Real Estate/Real Estate - Doha Business Towers - Events.png` | Event history | Corporate actions, distributions |
| `12 - Real Estate/Real Estate - Doha Business Towers - Mint Tokens.png` | Token minting | Issuance workflow |
| `12 - Real Estate/Real Estate - Doha Business Towers - Mint Tokens Confirm.png` | Mint confirmation | Blockchain issuance confirmation |
| `12 - Real Estate/Real Estate - Doha Business Towers - Verifications.png` | KYC verifications | Investor verification, compliance status |

### 14: Compliance & Policy Templates
| File | What It Shows | Good For |
|------|--------------|----------|
| `14 - Compliance and Policy Templates/Policy Templates - List.png` | Policy template library | Reusable compliance templates |
| `14 - Compliance and Policy Templates/Compliance Policy Templates.png` | Compliance template overview | Compliance framework |
| `14 - Compliance and Policy Templates/Policy Templates - Create From Scratch.png` | Create new policy | Custom compliance rules |
| `14 - Compliance and Policy Templates/Policy Template - Expression Builder.png` | Visual expression builder | No-code compliance logic |
| `14 - Compliance and Policy Templates/Policy Template - Investor Count Config.png` | Investor count limit | Rule config, supply-side compliance |
| `14 - Compliance and Policy Templates/Policy Template - Investor Count Disable Dialog.png` | Disable rule dialog | Governance, admin control |
| `14 - Compliance and Policy Templates/Policy Template - Supply Cap Detail.png` | Supply cap policy | Issuance governance |
| `14 - Compliance and Policy Templates/Policy Template - Token Supply Limit Config.png` | Supply limit config | Token supply management |
| `14 - Compliance and Policy Templates/Compliance Policy Detail 1.png` | Policy detail, overview | Compliance lifecycle |
| `14 - Compliance and Policy Templates/Compliance Policy Detail 2.png` | Policy detail, rules | Compliance rule enforcement |
| `14 - Compliance and Policy Templates/Instrument Templates - List and Create.png` | Instrument templates | Reusable issuance templates |
| `14 - Compliance and Policy Templates/Instrument Template - Add Metadata Field.png` | Metadata config | Custom data model |
| `14 - Compliance and Policy Templates/Instrument Template - Metadata Field City Config.png` | City field config | Geo-specific metadata |
| `14 - Compliance and Policy Templates/Instrument Template - Qatar Real Estate - Metadata Schema.png` | Qatar RE metadata | Jurisdiction-specific config |
| `14 - Compliance and Policy Templates/Policy Template - Qatar Real Estate Token - Overview.png` | Qatar RE policy | Live jurisdiction example |

### 15: Identity & Verification
| File | What It Shows | Good For |
|------|--------------|----------|
| `15 - Identity and Verification/Onchain Identity.png` | On-chain identity record | DID, identity registry, ERC-3643 |
| `15 - Identity and Verification/Verification Topics.png` | Verification topic list | KYC categories, credential types |
| `15 - Identity and Verification/User.png` | User profile / identity | User management, identity binding |

### 16: XVP (Delivery vs Payment / Settlement)
| File | What It Shows | Good For |
|------|--------------|----------|
| `16 - XVP Settlement/XVP Setup 1.png` – `XVP Setup 4.png` | XVP setup wizard | DvP setup, atomic settlement workflow |
| `16 - XVP Settlement/XVP Details 1.png` | XVP detail, overview | Settlement status, trade detail |
| `16 - XVP Settlement/XVP Details 2.png` | XVP detail, parties | Multi-party settlement |
| `16 - XVP Settlement/XvP API Light.png` | XVP API view | API-driven settlement, integration |

### 19: Settings & Admin
| File | What It Shows | Good For |
|------|--------------|----------|
| `19 - Settings and Admin/API Keys.png` | API key management | API integration, developer access |
| `19 - Settings and Admin/Actions.png` | Action audit log | Audit trail, operational governance |
| `19 - Settings and Admin/Activity Log.png` | Platform activity log | Auditability, compliance logging |
| `19 - Settings and Admin/Activity.png` | Activity overview | Platform operations |
| `19 - Settings and Admin/Addons.png` | Add-ons marketplace | Modular extensions, system add-ons |
| `19 - Settings and Admin/Theme 1.png` | White-label theming | Branding, white-label capability |
| `19 - Settings and Admin/Theme 2.png` | Theme configuration | Custom branding |
| `19 - Settings and Admin/Tokenize Deposit 1.png` | Tokenize deposit flow | Deposit tokenization action |

### 20: Monitoring
| File | What It Shows | Good For |
|------|--------------|----------|
| `20 - Monitoring/Blockchain Monitoring.png` | Blockchain health dashboard | Operational resilience, node monitoring |
| `20 - Monitoring/API Monitoring - Overview.png` | API health overview | Platform observability, SLA monitoring |
| `20 - Monitoring/API Monitoring - Request Log.png` | API request log | Debugging, audit, request tracing |

### 21: Insights / Analytics
| File | What It Shows | Good For |
|------|--------------|----------|
| `21 - Insights/Insights - Asset Overview.png` | Insights analytics dashboard | Reporting, data-driven operations |

---

## Keyword → Screenshot Mapping (Quick Reference)

### Proposal Skeleton Section Map

| Proposal Section Pattern | Recommended Screenshot Files | Notes |
|---|---|---|
| Executive summary / opening context | `02 - Dashboard/Dashboard 1.png`; `02 - Dashboard/Dashboard - Map and Statistics.png` | Use only one overview screenshot here, then move proof into later sections |
| Platform overview / about DALP | `04 - Asset Designer/Asset Designer.png`; `21 - Insights/Insights - Asset Overview.png` | Establish breadth and platform reality early |
| Asset creation / issuance | `04 - Asset Designer/Asset Designer.png`; `04 - Asset Designer/Asset Designer - Step 4 - Instrument Details.png`; `04 - Asset Designer/Asset Designer Review and Deploy 1.png` | Use where issuance workflow is first explained |
| Compliance / policy controls | `04 - Asset Designer/Asset Designer - Step 6 - Compliance Modules.png`; `14 - Compliance and Policy Templates/Compliance Policy Templates.png`; `14 - Compliance and Policy Templates/Policy Template - Expression Builder.png` | Strong default for most proposals |
| Identity / eligibility / KYC | `15 - Identity and Verification/Onchain Identity.png`; `15 - Identity and Verification/Verification Topics.png`; `04 - Asset Designer/Asset Designer Compliance Identity.png` | Good for ERC-3643, investor onboarding, trusted issuer controls |
| Permissions / governance / audit | `04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions Config.png`; `19 - Settings and Admin/Activity Log.png` | Use in governance and control sections |
| Settlement / DvP / XvP | `16 - XVP Settlement/XVP Setup 1.png`; `16 - XVP Settlement/XVP Details 1.png`; `16 - XVP Settlement/XvP API Light.png` | Keep settlement proof inside settlement sections |
| Operations / monitoring / support | `20 - Monitoring/Blockchain Monitoring.png`; `20 - Monitoring/API Monitoring - Overview.png`; `19 - Settings and Admin/Activity.png` | Use in deployment, operations, SLA, support, resilience |
| Asset-class-specific sections | Bonds: `06 - Bonds/Bonds Detail 2.png`; Equity: `07 - Equity/Equity Detail 1.png`; Funds: `08 - Funds/Fund Detail 1.png`; Deposits: `09 - Deposits/Deposits Listing.png`; Stablecoins: `10 - Stablecoins/Stablecoin Detail 1.png`; Precious Metals: `11 - Precious Metals/Precious Metal 1.png`; Real Estate: `12 - Real Estate/Real Estate - Doha Business Towers - Asset Details.png` | Lead with the buyer's asset class before generic dashboards |
| Integration / API / extensibility | `19 - Settings and Admin/API Keys.png`; `16 - XVP Settlement/XvP API Light.png`; `19 - Settings and Admin/Addons.png` | Only use where APIs or extensibility are genuinely in scope |
| Branding / white-label | `19 - Settings and Admin/Theme 1.png`; `19 - Settings and Admin/Theme 2.png` | Keep to branding sections only |


| Topic in Proposal | Recommended Screenshots |
|-------------------|------------------------|
| Platform overview / introduction | `02 - Dashboard/Dashboard 1.png` + one asset-class specific |
| Asset creation / issuance | `04 - Asset Designer/Asset Designer.png` + `Asset Designer - Step 6 - Compliance Modules.png` |
| Compliance / KYC / AML | `04 - Asset Designer/Asset Designer Compliance Country Allowlist.png` + `11 - Compliance.../Policy Template - Expression Builder.png` |
| Bond use case | `06 - Bonds/Bonds Detail 2.png` (coupon) + `04 - Asset Designer/Design Bond 1.png` |
| Fund use case | `08 - Funds/Fund Detail 1.png` + `08 - Funds/Fund Detail 2.png` |
| Real estate use case | `12 - Real Estate/Real Estate - Doha Business Towers - Asset Details.png` + `Verifications.png` |
| Stablecoin / CBDC | `10 - Stablecoins/Stablecoins.png` + `09 - Deposits/Deposits Listing.png` |
| Identity / verification | `15 - Identity and Verification/Onchain Identity.png` + `Verification Topics.png` |
| Settlement / DvP | `16 - XVP Settlement/XVP Setup 1.png` + `XVP Details 1.png` |
| Governance / audit | `19 - Settings and Admin/Activity Log.png` + `Actions.png` |
| Monitoring / resilience | `20 - Monitoring/Blockchain Monitoring.png` + `API Monitoring - Overview.png` |
| White-label / branding | `19 - Settings and Admin/Theme 1.png` + `Theme 2.png` |
| API / developer access | `19 - Settings and Admin/API Keys.png` + `16 - XVP Settlement/XvP API Light.png` |
| Analytics / reporting | `21 - Insights/Insights - Asset Overview.png` + `04 - Asset Designer/Portfolio Insights.png` |

---

## Markdown Embed Syntax (for proposals)

```markdown
![DALP Asset Designer, Compliance Module Configuration](../../../shared/brand/dalp-screenshots/04 - Asset Designer/Asset Designer - Step 6 - Compliance Modules.png)
*Figure X: DALP Asset Designer, compliance modules are selected during asset creation, enforcing transfer restrictions before deployment.*
```

Use relative paths from the output folder. Always include a `*Figure X: ...*` caption on the line immediately after.

Numbering: figures are numbered sequentially per document (Figure 1, Figure 2, ...).

---

## New Batch, 2026-03-24 (Gyan)

**Location:** `settlemint-office-agents/shared/brand/dalp-screenshots/new-2026-03-24/`
**Format:** `.jpg` (lossless quality=100) and `.png` source available
**Added:** 2026-03-24

---

### Actions (5 screens)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Actions/0.jpg` | Actions list view | Workflow approvals, pending actions |
| `Actions/1.jpg` | Action flow step 1 | Multi-step action workflows |
| `Actions/2.jpg` | Action flow step 2 | Maker-checker, approval chains |
| `Actions/3.jpg` | Action flow step 3 | Governance, operational controls |
| `Actions/4.jpg` | Action flow step 4 | Action completion, audit trail |

### Activity (1 screen)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Activity/Recent Activities.jpg` | Recent activities feed | Audit trail, activity log, compliance monitoring |

### Addons, Exchange XvP (7 screens)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Addons/Exchange XvP/0 XvP .jpg` | XvP addon overview | DvP settlement, atomic exchange intro |
| `Addons/Exchange XvP/Asset flow step 1.jpg` | XvP flow, initiate | XvP initiation, counterparty setup |
| `Addons/Exchange XvP/Asset flow step 2.jpg` | XvP flow, configure | Asset leg configuration |
| `Addons/Exchange XvP/Asset flow step 3.1.jpg` | XvP flow, review | Settlement review, pre-execution check |
| `Addons/Exchange XvP/Asset flow step final .jpg` | XvP flow, completed | Atomic settlement completion, finality |
| `Addons/Exchange XvP/Created Flow.jpg` | Created XvP flow | Settlement workflow management |
| `Addons/Exchange XvP/Created Flow2 .jpg` | Created XvP flow (variant) | Multi-leg settlement, concurrent flows |

### Addons, Yield (1 screen)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Addons/Yield/Income yield.jpg` | Yield/income dashboard | Income distribution, coupon management, yield tracking |

### Asset Manager, Forced Transfer (6 screens)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Asset Management/0. Asset Manager/Forced Transfer/1.jpg`–`6.jpg` | Full forced transfer workflow (6 steps) | Regulatory recovery, court-ordered transfer, compliance enforcement |

### Asset Manager, Freeze / Unfreeze (10 screens)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Asset Management/0. Asset Manager/Freeze/step 0.jpg`–`step 4.jpg` | Full token freeze workflow (5 steps) | AML freeze, regulatory hold, compliance controls |
| `Asset Management/0. Asset Manager/Unfreeze/step 0.jpg`, `Step 1.jpg`–`Step 4.jpg` | Full token unfreeze workflow (5 steps) | Freeze lift, compliance clearance, release process |

### Asset Manager, Mint Tokens (4 screens)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Asset Management/0. Asset Manager/Mint Tokens/step 1.jpg`–`step 4.jpg` | Full token minting workflow (4 steps) | Primary issuance, token creation, supply management |

### Asset Manager, Transfer Tokens (7 screens)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Asset Management/0. Asset Manager/Transfer Tokens/1.jpg`–`7.jpg` | Full token transfer workflow (7 steps) | Secondary market, peer-to-peer transfer, settlement |

### Asset Designer, Bond Tokenisation (20 steps)
Full step-by-step bond issuance wizard. Use these for bond-focused RFPs to show the complete onboarding flow.

| File | What It Shows | Good For |
|------|--------------|----------|
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/01 Step Bond Tokenisation.jpg` | Bond wizard start | Bond issuance overview |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/02 Step Bond Choosing Instrument .jpg` | Instrument selection | Asset template, instrument type selection |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/03 Step Bond Information.jpg` | Bond metadata | Instrument naming, description |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/04 Step Instrument Details .jpg` | Instrument details | ISIN, maturity, coupon parameters |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/05 Step Bond pricing and valuation .jpg` | Pricing & valuation | NAV, pricing model setup |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/06 Step Complaince Modules.jpg` | Compliance module selection | Modular compliance framework |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/07 Step Supply Cap .jpg` | Supply cap config | Issuance limit, supply controls |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/08 Step Colleteral Requirement.jpg` | Collateral requirement | Asset-backed issuance, collateral rules |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/09 Step Time Lock .jpg` | Time lock config | Lock-up periods, vesting, time restrictions |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/10 Step Block Addresses.jpg` | Address blocking | Sanctions screening, address-level controls |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/11 Step Transfer Approval.jpg` | Transfer approval config | Maker-checker for transfers, approval gates |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/12 Step Country Blocklist.jpg` | Country blocklist | Geo-restriction, sanctions compliance |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/13 Step Identity Blocklist.jpg` | Identity blocklist | Identity-level exclusions, KYC enforcement |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/14 Step Investor count.jpg` | Investor count cap | 500-investor rule, private placement controls |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/15 Step Identity allowlist.jpg` | Identity allowlist | Whitelisted investors, permissioned distribution |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/16 Step Token Supply Limit.jpg` | Token supply limit | Hard cap enforcement |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/17 Step Smart Identity Verification.jpg` | Smart identity verification | On-chain KYC/KYB, identity-gated transfers |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/18 Step Country allowlist.jpg` | Country allowlist | Jurisdiction-specific investor access |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/19 Step Asset Permissions.jpg` | Asset permissions | RBAC, role-based access to the asset |
| `Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/20 Step Review and Deploy.jpg` | Review & deploy | Final deployment step, smart contract launch |

### Asset Designer, Equity Tokenisation (6 steps)
| File | What It Shows | Good For |
|------|--------------|----------|
| `Asset Management/1. Asset Designer/02. Flexible Income/Equity/01 Step.jpg`–`04 Step.jpg` | Equity wizard steps 1–4 | Equity tokenisation, share issuance |
| `Asset Management/1. Asset Designer/02. Flexible Income/Equity/05 Step Tokenised Equity Pricing .jpg` | Equity pricing config | Share valuation, NAV setup |
| `Asset Management/1. Asset Designer/02. Flexible Income/Equity/06 Step Tokenised Equtiy Complaince Modules.jpg` | Equity compliance modules | Compliance for equity instruments |

