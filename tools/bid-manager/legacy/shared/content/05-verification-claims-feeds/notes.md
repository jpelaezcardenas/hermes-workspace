# Section 5: Verification, Claims, and Feeds — Verification Notes

## Verified Claims (grounded in source material)

### OnchainID and Identity
- ✅ ERC-734/ERC-735 based OnchainID — confirmed in DALP narrative and compliance-and-identity.md
- ✅ Identity Factory deploys identity contracts — confirmed in compliance-and-identity.md (DALPGlobalTrustedIssuersRegistry evidence)
- ✅ Self-service vs admin-initiated identity registration — confirmed in platform-administration.md (Participant Invitation evidence)
- ✅ Identity recovery workflow phases (creating-wallet → deploying-identity → recovering-identity → revoking-sessions → recovering-tokens) — confirmed in compliance-and-identity.md
- ✅ `SYSTEM_PERMISSIONS.identityRecover` permission gate — confirmed in compliance-and-identity.md
- ✅ Contract identity via IContractWithIdentity — confirmed in compliance-and-identity.md (Smart Account Infrastructure)
- ✅ DALP_WALLET_TOPIC = keccak256("dalpWallet") — confirmed in compliance-and-identity.md (ERC-4337 evidence)
- ✅ DALPClaimAuthorization shared library — confirmed in compliance-and-identity.md

### Claims System
- ✅ Standard claim topics (KYC, AML, ACCREDITED, CONTRACT, JURISDICTION) — confirmed in identity-verification.mdx product docs
- ✅ Auto-claim validation: boolean topics only accept literal "true" — confirmed in compliance-and-identity.md and claim-fulfillment-architecture.md
- ✅ KYC claim value must match contentHash from approved KYC profile — confirmed in compliance-and-identity.md
- ✅ Class-specific claims during asset creation (classification, location, pricing, identifier) — confirmed in asset-lifecycle.md (issue-token-claims.ts evidence)
- ✅ Terminal failure on partial claim issuance — confirmed in asset-lifecycle.md
- ✅ Topic Scheme Registry for managing claim vocabulary — confirmed in analytics-and-reporting.md (v_topic_scheme_stats view)

### Trusted Issuers Registry
- ✅ Three-tier resolution: subject-scoped → system-scoped → global — confirmed in compliance-and-identity.md (PR #6168)
- ✅ DALPGlobalTrustedIssuersRegistry deployed as global singleton — confirmed in compliance-and-identity.md
- ✅ DIRECTORY_ADMIN_ROLE for global registry — confirmed in compliance-and-identity.md
- ✅ DALPTrustedIssuersMetaRegistryImplementationV2 cascading lookup — confirmed in compliance-and-identity.md
- ✅ Feature-flagged as directoryVNext (disabled by default in production) — confirmed in compliance-and-identity.md
- ✅ Issuer removal invalidates existing claims — confirmed in identity-verification.mdx

### Identity Verification Module
- ✅ RPN expression system with TOPIC, AND, OR, NOT operators — confirmed in identity-verification.mdx
- ✅ Regulatory expression examples (MiCA, Reg D 506(b), 506(c), Japan FSA) — confirmed in identity-verification.mdx
- ✅ Both sender and recipient must hold valid claims — confirmed in identity-verification.mdx
- ✅ Claims checked for expiry — confirmed in identity-verification.mdx
- ✅ Exemption expressions used by TimeLock, TransferApproval, InvestorCount — confirmed in identity-verification.mdx

### KYC Workflow
- ✅ Three review outcomes: approve, reject, request-update — confirmed in compliance-and-identity.md
- ✅ Reject requires minimum 10-character reason — confirmed in compliance-and-identity.md
- ✅ Request-update creates action request with requiredFields and optional dueAt — confirmed in compliance-and-identity.md
- ✅ Fulfillment cross-checks pending requests — confirmed in compliance-and-identity.md
- ✅ 18 compliance module types — confirmed in DALP narrative

### Feeds Architecture
- ✅ FeedsDirectory central registry with (subject, topic) pair — confirmed in feeds-system.mdx and feeds overview.mdx
- ✅ Schema hash pinning — confirmed in feeds-system.mdx
- ✅ Issuer-signed scalar feed via factory pattern — confirmed in feeds-system.mdx and feeds.md
- ✅ Three history modes: LATEST_ONLY, BOUNDED, FULL — confirmed in feeds overview.mdx
- ✅ EIP-712 typed data signatures for updates — confirmed in feeds overview.mdx
- ✅ Drift allowance and positive-value requirement — confirmed in feeds-system.mdx
- ✅ Chainlink AggregatorV3Interface adapter — confirmed in feeds-system.mdx
- ✅ Adapter address stability through directory resolution — confirmed in feeds-system.mdx
- ✅ Feed trust model: Feeds Manager for global, GOVERNANCE for token-specific — confirmed in feeds-system.mdx
- ✅ Failure modes (stale, removed, invalid signature, drift exceeded) — confirmed in feeds-system.mdx
- ✅ V2 feed mutations support async processing (Prefer: respond-async, HTTP 202) — confirmed in feeds.md
- ✅ Feed submit uses specialized Restate path, not generic queue — confirmed in feeds.md
- ✅ Exchange rates from open.er-api.com — confirmed in platform-administration.md
- ✅ Manual operator overrides (provider: "manual") — confirmed in platform-administration.md
- ✅ Feed-based price indexing with fiat value views — confirmed in indexer-v2.md (PR #6125)
- ✅ Feed events indexed by chain indexer — confirmed in feeds-system.mdx and indexer-v2.md

## Items Needing Verification
- [TO VERIFY] Exact number of custom claim topics currently registered in production deployments
- [TO VERIFY] Specific feed data freshness latency in production (sub-5-second claim is from indexer, not feeds specifically)
- [TO VERIFY] Whether NAV feeds are actively used in production fund deployments vs being available as capability
- [TO VERIFY] Specific external oracle providers beyond Chainlink that have been integrated
