# Screenshot Manifest for Proposals

> **Directive (Gyan, 2026-04-03):** Every technical proposal MUST include DALP platform screenshots to demonstrate the product is real, operational, and visually polished. Screenshots are selected from the shared library and placed after the text they illustrate.

---

## Screenshot Library Location

**Primary source:** `shared/brand/dalp-screenshots/`
**Registry:** `setup/screenshot-registry.md` (full inventory with file names and descriptions)
**Catalog:** `shared/brand/dalp-screenshots/CATALOG.md`

---

## Minimum Screenshot Counts by Variant

| Variant | Minimum Screenshots | Target Range |
|---------|-------------------|--------------|
| **Full** (TITAN) | 12 | 12-18 |
| **Medium** (FALCON) | 8 | 8-12 |
| **Compact** (SENTINEL) | 6 | 6-8 |

---

## Section-to-Screenshot Mapping

### Executive Summary
- **Dashboard overview** (`02 - Dashboard/Dashboard 1.png` or `Dashboard - Map and Statistics.png`)
- Shows: operational platform with live data, geographic reach

### About DALP / Platform Overview
- **Dashboard** (`02 - Dashboard/Dashboard 1.png`)
- **Asset Designer** (`04 - Asset Designer/Asset Designer.png`)
- Shows: configuration interface, no-code asset setup

### Proposed Solution > Issuance and Asset Configuration
- **Asset Designer wizard steps** (`04 - Asset Designer/Asset Designer - Step 3` through `Step 7`)
- **Design Bond steps** (for bond-specific RFPs: `04 - Asset Designer/Design Bond 1-5.png`)
- Shows: step-by-step asset creation, field-level configuration

### Proposed Solution > Compliance Enforcement
- **Compliance Policy Templates** (`14 - Compliance and Policy Templates/`)
- **Compliance modules in Asset Designer** (`04 - Asset Designer/Asset Designer Compliance*.png`)
- Shows: modular compliance, country allowlists, expression builder

### Proposed Solution > Identity and Eligibility
- **Identity & Verification** (`15 - Identity and Verification/`)
- Shows: KYC onboarding, claim verification, identity management

### Proposed Solution > Settlement
- **XVP Settlement** (`16 - XVP Settlement/`)
- Shows: DvP/XvP settlement interface, transaction execution

### Proposed Solution > Lifecycle Servicing
- **Bond detail views** (`06 - Bonds/Bonds Detail 1-4.png`)
- **Asset Operations** (`05 - Asset Operations/` if available)
- Shows: coupon events, corporate actions, transaction history

### Security > Access Control
- **Asset Permissions** (`04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions Config.png`)
- Shows: RBAC configuration, permission model

### Deployment / Operations
- **Monitoring** (`20 - Monitoring/`)
- Shows: operational dashboards, health monitoring

### Support & SLA
- **Monitoring dashboards** (`20 - Monitoring/`)
- Shows: observability, alert management

---

## Asset-Class-Specific Screenshot Selection

When the RFP targets a specific asset class, prioritize screenshots from that category:

| Asset Class | Primary Screenshot Folder | Secondary |
|---|---|---|
| Bonds | `06 - Bonds/`, `04 - Asset Designer/Design Bond*.png` | Dashboard |
| Equity | `07 - Equity/` | Asset Designer |
| Funds | `08 - Funds/` | Dashboard |
| Deposits | `09 - Deposits/` | Asset Designer |
| Stablecoins | `10 - Stablecoins/` | Compliance |
| Precious Metals | `11 - Precious Metals/` | Asset Designer |
| Real Estate | `12 - Real Estate/` | Asset Designer, Dashboard Map |

---

## Screenshots Not Yet Captured (Gaps)

The following UI areas would strengthen proposals but do not currently have screenshots in the library:

| Missing Screenshot | Where It Would Go | Priority |
|---|---|---|
| Data Feeds / Oracle configuration | Data Flow / Privacy Architecture section | P2 |
| Audit log / event trail view | Security > Auditability section | P1 |
| Multi-tenancy / organization switcher | Architecture > Multi-Tenancy section | P2 |
| Webhook / integration configuration | Integration section | P2 |
| CLI terminal output example | Developer integration section | P3 |

These should be captured from a staging environment when available.

---

## Placement Rules

1. Place screenshots AFTER the paragraph that describes the capability shown
2. Never use screenshots as section filler at the end of a section
3. Every screenshot must have a descriptive caption in the form `*Figure X: ...*` on the next line
4. Distribute screenshots across the sections where capabilities are introduced. Do not cluster the minimum screenshot count in one section
5. Prefer variety across feature areas. Default spread target: at least 4 categories for full proposals, 3 for medium, 2 for compact. Minimum count floors are 12 for full, 8 for medium, and 6 for compact proposals
6. For asset-class-specific proposals, lead with screenshots of that asset class
7. Plan screenshot placement before prose drafting, not during cleanup
