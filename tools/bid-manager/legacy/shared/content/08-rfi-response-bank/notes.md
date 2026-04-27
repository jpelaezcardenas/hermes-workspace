# Section 8: RFI Response Bank — Verification Notes

## Verified Claims Used Across the Response Bank

### Company / Positioning
- ✅ SettleMint positioned as institutional digital asset lifecycle infrastructure provider — confirmed in dalp-narrative.md
- ✅ DALP category = Digital Asset Lifecycle Platform — confirmed in dalp-narrative.md
- ✅ Primary audiences include banks, market infrastructures, custodians, sovereign entities — confirmed in dalp-narrative.md
- ✅ Seven asset classes supported — confirmed in dalp-narrative.md and asset-lifecycle.md
- ✅ ERC-3643 / T-REX and OnchainID alignment — confirmed in dalp-narrative.md and product docs
- ✅ DALP not a custodian, exchange, KYC provider, or oracle operator — confirmed in dalp-narrative.md scope guardrail

### Platform / Technology
- ✅ Dual-endpoint API architecture — confirmed in platform-administration.md and dapi-middleware-architecture.md
- ✅ Restate durable execution — confirmed across operations-and-reliability.md and other capability files
- ✅ Custom PostgreSQL indexer replacing TheGraph dependency over time — confirmed in indexer-v2.md and analytics-and-reporting.md
- ✅ SDK and CLI surfaces — confirmed in developer-surface.md and platform-administration.md
- ✅ 301 CLI commands / 26 groups — confirmed in platform-administration.md
- ✅ DALPAssetFactory / configurable token path — confirmed in dalp-asset-factory-architecture.md
- ✅ DFNS and Fireblocks signer support — confirmed in operations-and-reliability.md / compliance-and-identity.md

### Security / Compliance
- ✅ Defense-in-depth model with identity, access, transaction, on-chain, custody layers — confirmed in security/index.mdx
- ✅ Wallet verification factors (PIN, TOTP, secret codes) — confirmed in compliance-and-identity.md
- ✅ Trusted issuer multi-tier model — confirmed in compliance-and-identity.md
- ✅ RPN-based identity verification module — confirmed in identity-verification.mdx
- ✅ 18 compliance module types — confirmed in dalp-narrative.md and compliance-and-identity.md
- ✅ Secrets abstraction / Conjur support — confirmed in secrets-management.md

### Integration / Interoperability
- ✅ FeedsDirectory and feed architecture — confirmed in feeds-system.mdx and feeds.md
- ✅ Chainlink-compatible adapter pattern — confirmed in feeds-system.mdx
- ✅ External token registration and exchange-rate ingestion — confirmed in platform-administration.md
- ✅ PostgreSQL analytics views for BI/reporting — confirmed in analytics-and-reporting.md

### Support / Operations
- ✅ Metrics/logs/traces stack — confirmed in observability-architecture.md and analytics-and-reporting.md
- ✅ Packaged dashboards and alerting config — confirmed in observability-architecture.md
- ✅ HA/DR scenario patterns — confirmed in high-availability docs
- ✅ Monitoring automation services — confirmed in operations-and-reliability.md

### Implementation / Delivery
- ✅ Kubernetes/OpenShift prerequisites and managed/self-hosted split — confirmed in prerequisites.mdx
- ✅ Multi-AZ requirement — confirmed in prerequisites.mdx
- ✅ Helm-based deployment and CRD requirements — confirmed in prerequisites.mdx

## Items Marked or Implicitly Requiring Care / Verification
- [TO VERIFY] Specific customer names or production references should only be inserted if approved for the target proposal
- [TO VERIFY] Any statements about formal SLAs, support hours, or named support packages
- [TO VERIFY] Any statement about exact deployment timelines for the target client
- [TO VERIFY] Any statement about current commercial packaging or licensing legal terms
- [TO VERIFY] Any region-specific regulatory coverage claim beyond those explicitly stated in the DALP narrative
- [TO VERIFY] Any claim that implies full native SSO, SIEM, webhook coverage, or non-EVM network support

## Writing Notes
- I kept the responses reusable and avoided quoting unverified commercial figures or unsupported operational promises.
- I avoided direct competitor attacks and stayed within the messaging governance in dalp-narrative.md.
- Where the answer could drift into overclaiming, I framed DALP as infrastructure that supports control and enforcement rather than guaranteeing legal compliance or replacing adjacent providers.
