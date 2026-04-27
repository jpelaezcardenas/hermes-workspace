# Section 6: Technical Proposal: Verification Notes

## Verified Claims (grounded in source material)

### Architecture
- ✅ Dual-endpoint architecture (/api/rpc and /api/v2), confirmed in dapi-middleware-architecture.md and platform-administration.md
- ✅ API keys blocked on RPC endpoint, confirmed in dapi-middleware-architecture.md (PR #6242)
- ✅ Middleware chain: session → auth → orgRoleSync → system → token → wallet verification → transaction queue, confirmed in dapi-middleware-architecture.md
- ✅ oRPC-based API, confirmed in DALP narrative (approved terminology)
- ✅ Restate durable execution engine, confirmed in multiple capability mapping files
- ✅ ERC-3643/T-REX standard, confirmed in DALP narrative
- ✅ DALPAsset unified factory, confirmed in dalp-asset-factory-architecture.md
- ✅ Up to 32 pluggable features per token, confirmed in DALP narrative
- ✅ Three-tier compliance hierarchy (Global → Token → SMART V2), confirmed in compliance-and-identity.md (PR #6270)
- ✅ Transaction processor keyed by {fromAddress}.{chainId}, confirmed in operations-and-reliability.md
- ✅ Nonce manager with self-healing, confirmed in operations-and-reliability.md
- ✅ 534 auto-generated error codes, confirmed in developer-surface.md

### Deployment
- ✅ Kubernetes 1.27+ / OpenShift 4.14+ support, confirmed in prerequisites.mdx
- ✅ 3 nodes minimum, 6+ recommended, confirmed in prerequisites.mdx
- ✅ 4 vCPU / 16 GB RAM minimum per node, confirmed in prerequisites.mdx
- ✅ PostgreSQL 17.x (tested 17.5), confirmed in prerequisites.mdx
- ✅ Redis 8.x (tested 8.4.0), cluster mode disabled, confirmed in prerequisites.mdx
- ✅ Required extensions: pg_trgm, btree_gist, pg_stat_statements, postgres_fdw, confirmed in prerequisites.mdx
- ✅ Three databases required (blockscout, thegraph, dapp), confirmed in prerequisites.mdx
- ✅ AWS/Azure/GCP managed service options, confirmed in prerequisites.mdx
- ✅ RustFS for self-hosted object storage, confirmed in prerequisites.mdx
- ✅ CloudNativePG operator for self-hosted PostgreSQL, confirmed in prerequisites.mdx
- ✅ harbor.settlemint.com for container images, confirmed in prerequisites.mdx
- ✅ Service mesh not supported, confirmed in prerequisites.mdx
- ✅ OpenShift restricted-v2 SCC compatible, all containers non-root, confirmed in prerequisites.mdx

### HA/DR
- ✅ Five HA scenarios (cloud-native, hot-warm, hot-cold, hot-hot consortium, hot-hot public), confirmed in high-availability index.mdx
- ✅ RTO/RPO targets, confirmed in high-availability index.mdx
- ✅ Cloud-native recommended, confirmed in high-availability index.mdx
- ✅ Multi-AZ required (minimum 3 zones), confirmed in prerequisites.mdx

### Security
- ✅ Defense-in-depth with 5 layers, confirmed in security/index.mdx
- ✅ Three trust boundaries (platform, execution, chain), confirmed in security/index.mdx
- ✅ Wallet verification: PINCODE, OTP, SECRET_CODES, confirmed in compliance-and-identity.md
- ✅ PASSKEY not yet supported, confirmed in compliance-and-identity.md
- ✅ API key sessions bypass wallet verification, confirmed in compliance-and-identity.md
- ✅ Better Auth for session management, confirmed in platform-administration.md
- ✅ Device-code CLI login, confirmed in platform-administration.md
- ✅ macOS Keychain credential storage, confirmed in platform-administration.md

### Monitoring
- ✅ VictoriaMetrics, Loki, Tempo stack, confirmed in analytics-and-reporting.md and DALP narrative
- ✅ Pre-built Grafana dashboards, confirmed in analytics-and-reporting.md
- ✅ 18 PostgreSQL analytics views, confirmed in analytics-and-reporting.md
- ✅ 3-sample hysteresis for health status, confirmed in operations-and-reliability.md
- ✅ CLI monitoring with streaming, confirmed in platform-administration.md

### Indexer
- ✅ Custom PostgreSQL indexer (V2), confirmed in indexer-v2.md
- ✅ Zero-downtime reindexing with schema isolation, confirmed in indexer-v2.md
- ✅ Reorg detection and rollback, confirmed in indexer-v2.md
- ✅ Genesis directory discovery, confirmed in indexer-v2.md
- ✅ <5s event latency, confirmed in analytics-and-reporting.md

### Developer Surface
- ✅ 301 CLI commands across 26 groups, confirmed in developer-surface.md
- ✅ DALP SDK on npm, confirmed in developer-surface.md
- ✅ DFNS and Fireblocks signer integrations, confirmed in compliance-and-identity.md

## Items Needing Verification
- [TO VERIFY] Conjur HSM/vault integration specifics, referenced in secrets-management.md but specifics on current Conjur version support need confirmation
- [TO VERIFY] Exact RBAC role definitions (the "5 defined roles"), referenced in DALP narrative but specific role names not enumerated in sources read
- [TO VERIFY] HashiCorp Vault support status, secrets-management.md mentions Conjur but not HashiCorp Vault specifically
- [TO VERIFY] Specific TPS/throughput benchmarks for production deployments
- [TO VERIFY] SIEM integration specifics. DALP narrative says "SIEM-ready" but not native SIEM connectors
- [TO VERIFY] SSO/SAML/OIDC specifics, noted as "deployment-specific" in approved terminology
