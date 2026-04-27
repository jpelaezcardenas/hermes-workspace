# DALP Composability: One Contract, Any Instrument

## Core Concept

DALP's composability means one contract type (DALPAsset) can represent any financial instrument by combining runtime-pluggable token features and compliance modules. There are no fixed token types. Features and compliance rules are building blocks that can be mixed, matched, added, and removed at any time, even after deployment.

This is DALP's key architectural differentiator: true composability where institutions pick, combine, and reconfigure token features and compliance rules without custom smart contract development or redeployment.

---

## Three-Layer Architecture

```
┌─────────────────────────────────────────────────┐
│                   DALPAsset                      │
│  (SMARTConfigurable + ERC-3643 + ERC-20)        │
│                                                  │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Token         │  │ Compliance               │ │
│  │ Features      │  │ Modules                  │ │
│  │ (pluggable)   │  │ (pluggable)              │ │
│  │               │  │                          │ │
│  │ 11 features   │  │ 12 modules in            │ │
│  │ Up to 32      │  │ 6 categories             │ │
│  │ per token     │  │                          │ │
│  └──────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

1. **DALPAsset**: Single configurable contract replacing 7 legacy specialized types. Built on SMART Protocol (ERC-3643). Supports any `assetTypeName` as a free-form string. Not limited to presets.
2. **Token Features**: Runtime-pluggable extensions via `ISMARTFeature` interface. 11 features across 4 categories. Up to 32 per token.
3. **Compliance Modules**: Modular on-chain transfer rules via `ISMARTComplianceModule`. 12 modules across 6 categories. Per-token configuration.

---

## Token Features (11)

### Fees & Charges (4)

| Feature | What It Does | Rewriting? |
|---------|-------------|-----------|
| **Transaction Fee** | BPS fee deducted from every transfer/mint/burn. Fee goes to configured collector. | Yes (splits transfer amount) |
| **Transaction Fee Accounting** | Tracks fees per transaction for off-chain reconciliation. No on-chain collection. | No |
| **External Transaction Fee** | Fixed fee in a separate ERC-20 (e.g., USDC) charged on every operation. | No |
| **AUM Fee** | Time-based management fee as % of AUM. Inflationary: mints new tokens to fee recipient. | No |

### Governance & Snapshots (3)

| Feature | What It Does |
|---------|-------------|
| **Historical Balances** | Point-in-time balance and supply queries via checkpoints. Required by Fixed Treasury Yield. |
| **Voting Power** | Delegated governance voting (ERC-5805) with historical tracking. Compatible with Governor contracts. |
| **Permit** | EIP-2612 gasless approvals. Sign off-chain, submit on-chain. |

### Lifecycle & Yield (2)

| Feature | What It Does |
|---------|-------------|
| **Maturity Redemption** | Bond maturity lifecycle. Blocks transfers post-maturity. Holders redeem for denomination asset (e.g., USDC). |
| **Fixed Treasury Yield** | Fixed-rate yield at intervals from treasury. Pull-based (holders claim). Requires Historical Balances. |

### Transformation (2)

| Feature | What It Does |
|---------|-------------|
| **Conversion** | Convertible instrument (loan-side). Triggers burn of loan tokens on conversion. |
| **Conversion Minter** | Companion to Conversion (equity-side). Mints equity tokens when conversion triggers. |

### How Features Work

- Each feature implements `ISMARTFeature` with 6 lifecycle hooks: `canUpdate`, `onTransferred`, `onMinted`, `onBurned`, `onRedeemed`, `onAttached`
- Features with `supportsRewriting() = true` can modify transfer amounts in-flight (e.g., deduct fees)
- `setFeatures()` takes an ordered array; execution order = array position
- Max 32 features per token (gas-optimized)
- Atomic replacement via `setFeatures()` replaces the entire feature set at once
- Each feature has a factory registered in the System Addon Registry for CREATE2 deployment

### Feature Ordering (Recommended)

| Position | Category | Features |
|----------|----------|----------|
| First | Transfer restriction | Maturity Redemption, Conversion (loan-side) |
| After restrictions | Fee collection | AUM Fee, Transaction Fee, Transaction Fee Accounting |
| After fee collection | External fee hooks | External Transaction Fee |
| Last | Analytics & governance | Historical Balances, Voting Power |
| Order irrelevant | No-hook utilities | Permit, Conversion Minter |

---

## Compliance Modules (12)

### Geographic Restrictions (2)

| Module | What It Does |
|--------|-------------|
| **Country Allow List** | Only wallets from specified countries can hold the asset |
| **Country Block List** | Wallets from blocked countries cannot hold the asset |

### Identity Access Control (3)

| Module | What It Does |
|--------|-------------|
| **Identity Allow List** | Only explicitly allowed identities can receive tokens |
| **Identity Block List** | Block specific identities from receiving tokens |
| **Address Block List** | Block specific wallet addresses (no identity resolution needed) |

### Claim-Based Verification (1)

| Module | What It Does |
|--------|-------------|
| **SMART Identity Verification** | Evaluates RPN (Reverse Polish Notation) logical expressions over identity claims. Supports KYC, AML, ACCREDITED, CONTRACT, JURISDICTION with AND/OR/NOT operators. The most expressive module. |

**RPN Expression Examples:**
| Regulation | Expression | Meaning |
|------------|-----------|---------|
| MiCA EU | `[KYC, AML, AND]` | Both KYC and AML required |
| Reg D 506(b) | `[ACCREDITED, KYC, AML, AND, OR]` | Accredited OR (KYC AND AML) |
| Reg D 506(c) | `[ACCREDITED]` | Only accredited investors |
| Japan FSA | `[CONTRACT, KYC, AML, AND, OR]` | QII (corporate) or (KYC AND AML) |

### Supply & Investor Limits (3)

| Module | What It Does |
|--------|-------------|
| **Token Supply Limit** | Rolling-window issuance cap (e.g., MiCA 8M EUR over 365 days) |
| **Investor Count** | Maximum number of unique holders |
| **Capped** | Hard maximum supply cap |

### Time-Based Rules (1)

| Module | What It Does |
|--------|-------------|
| **Time Lock** | Minimum holding period enforcement using FIFO batch tracking |

### Transfer Controls (2)

| Module | What It Does |
|--------|-------------|
| **Transfer Approval** | Requires pre-authorization before transfers. Configurable expiry. |
| **Collateral** | Enforces on-chain collateral ratio for minting. Verified via ERC-735 identity claims. |

### Two-Tier Compliance Architecture

- **Per-Token Compliance**: Each token has its own compliance configuration. Modules can be added, removed, and reconfigured under GOVERNANCE_ROLE.
- **System Compliance**: Global modules that apply to ALL tokens. Bypass list for operational exemptions.
- **Sequential evaluation**: Every module must pass. Single veto blocks the transfer.

---

## 7 Regulatory Compliance Templates (Pre-Seeded)

| Template | Jurisdiction | Key Constraints |
|----------|-------------|-----------------|
| **MiCA EU Standard** | EU (27 countries) | KYC + AML required, 8M EUR cap in 365-day rolling window |
| **Reg D 506(b)** | USA | Max 2,000 investors, Accredited OR (KYC + AML) |
| **Reg D 506(c)** | USA | All purchasers accredited, 24h transfer approval expiry |
| **MAS Singapore** | Singapore | Max 50 investors, 180-day holding period |
| **UK FCA Securities** | UK | Max 150 investors |
| **Japan FSA Crypto** | Japan | 7-day transfer approval expiry |
| **Reg CF Crowdfunding** | USA | $5M cap in 365-day rolling window |

Templates are starting points. Organizations create custom templates via the platform UI.

---

## 7 Out-of-the-Box Asset Presets

| Preset | Default Features | Default Compliance |
|--------|-----------------|-------------------|
| **Bond** | Fixed Treasury Yield + Maturity Redemption + Historical Balances | Capped + jurisdiction-specific |
| **Equity** | Voting Power + Historical Balances | Jurisdiction-specific |
| **Fund** | AUM Fee + Voting Power + Historical Balances | Jurisdiction-specific |
| **StableCoin** | Historical Balances | Collateral + jurisdiction-specific |
| **Deposit** | Historical Balances | Jurisdiction-specific |
| **Real Estate** | Historical Balances | Capped + jurisdiction-specific |
| **Precious Metal** | Historical Balances | Jurisdiction-specific |

**These are starting points, not limits.** Users can add/remove features, add/remove compliance modules, and create entirely novel asset types with any `assetTypeName` string.

---

## Creating ANY Token from Scratch

The DALPAsset factory accepts:
- `assetTypeName`: Free-form string (not limited to the 7 presets). Create "carbon-credit", "invoice", "loyalty-point", anything.
- `features[]`: Any combination of the 11 token features with configuration
- `complianceModules[]`: Any combination of the 12 compliance modules with parameters
- `metadata[]`: Key-value pairs for on-chain metadata

Organizations can also:
- Define custom asset classes beyond the 4 system classes
- Create custom asset type templates with required features and metadata schemas
- Create custom compliance templates combining any modules with custom parameters
- Extend the platform with custom ISMARTFeature implementations (deploy + register in addon registry)
- Extend with custom AbstractComplianceModule implementations

---

## Post-Deployment Flexibility

Under GOVERNANCE_ROLE, live tokens can be reconfigured:
- Add/remove token features via `setFeatures()`
- Add/remove compliance modules
- Reconfigure module parameters (country lists, investor limits, approval expiry, etc.)
- Change fee rates, schedules, treasury addresses
- No redeployment needed

This means a token can evolve: start as a simple bearer instrument, then add fee features, enable governance voting, or change compliance rules, all while live.

---

## Key Differentiators vs. Competitors

| Aspect | Typical Competitors | DALP |
|--------|-------------------|------|
| Token types | Fixed set of specialized contracts | One configurable contract for any instrument |
| Features | Compiled in at deployment | Runtime-pluggable, add/remove post-deployment |
| Compliance | Hardcoded or limited modules | 12 composable modules + RPN expression engine |
| Post-deployment | Requires redeployment or migration | Reconfigure features and compliance without redeployment |
| Asset types | Predefined (bonds, equity, etc.) | Free-form: create any instrument type |
| Regulatory templates | Manual configuration | 7 jurisdiction templates out of the box |
| Custom compliance | Limited or vendor-dependent | Organizations create custom templates via UI |

---

## Positioning Language

Use "composability" when describing this capability. Key phrases:
- "One contract, any instrument"
- "Features are building blocks, not fixed packages"
- "Evolve without redeploying"
- "Compliance as code"
- "Starting points, not limits"
- "True composability: pick, combine, and reconfigure token features and compliance rules"

---

## Source
Canonical reference: `product/dalp/composability.md`
