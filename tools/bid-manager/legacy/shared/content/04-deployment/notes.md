# Verification Notes -- 04 Deployment

## Source Grounding

### Verified Against Source Material

| Claim | Source | Status |
|-------|--------|--------|
| Deployment models: SaaS, dedicated cloud, on-prem, hybrid | dalp-narrative.md; self-hosting/index.mdx | Verified |
| Kubernetes 1.27+ / OpenShift 4.14+ requirements | self-hosting/prerequisites.mdx | Verified |
| Multi-AZ 3-zone minimum for production | self-hosting/prerequisites.mdx | Verified |
| Node sizing: min 4 vCPU / 16 GB, recommended 8 vCPU / 32 GB | self-hosting/prerequisites.mdx | Verified |
| PostgreSQL 17.x (tested on 17.5) requirement | self-hosting/prerequisites.mdx | Verified |
| Required PostgreSQL extensions: pg_trgm, btree_gist, pg_stat_statements, postgres_fdw | self-hosting/prerequisites.mdx | Verified |
| Three databases required (dapp, blockscout, thegraph) | self-hosting/prerequisites.mdx | Verified |
| Redis 8.x (tested on 8.4.0), cluster mode disabled | self-hosting/prerequisites.mdx | Verified |
| harbor.settlemint.com as single image source | self-hosting/prerequisites.mdx | Verified |
| CRDs: Traefik, CloudNativePG, Velero, VolumeSnapshot | self-hosting/prerequisites.mdx | Verified |
| OpenShift restricted-v2 SCC compatible, non-root containers | self-hosting/prerequisites.mdx | Verified |
| Service mesh injection not supported | self-hosting/prerequisites.mdx | Verified |
| Managed vs self-hosted configuration matrix | self-hosting/prerequisites.mdx | Verified |
| Helm chart auto-detects Kubernetes vs OpenShift | self-hosting/prerequisites.mdx, index.mdx | Verified |
| CyberArk Conjur secrets management | secrets-management.md (capability mapping) | Verified |
| Self-hosted fallback: CloudNativePG, Redis, RustFS, obs stack | self-hosting/prerequisites.mdx | Verified |
| PVC sizing: 62 GB baseline (4 validators), ~2 TB backup retention | self-hosting/prerequisites.mdx | Verified |
| 21 pre-built Grafana dashboards | observability-architecture.md (capability mapping) | Verified |
| OTLP receivers on 4317 (gRPC) and 4318 (HTTP) | observability-architecture.md (capability mapping) | Verified |
| Observability: Grafana, VictoriaMetrics, Loki, Tempo, Alloy | observability-architecture.md (capability mapping) | Verified |
| Supported public networks (Ethereum, Polygon, Avalanche, BNB, L2s) | integrations/supported-networks.mdx | Verified |
| Private networks: Besu, Geth, Nethermind, Erigon | integrations/supported-networks.mdx; 03-integrations/main.md | Verified |
| SettleMint managed networks with genesis-allocated contracts | integrations/supported-networks.mdx | Verified |
| Multi-chain: identity/compliance/indexer isolation per chain | integrations/supported-networks.mdx | Verified |
| Responsibility matrix for self-hosted deployments | self-hosting/index.mdx | Verified |
| CLI: 301 commands, device-code auth, Keychain storage | platform-administration.md (capability mapping) | Verified |
| Environment pricing: dev EUR 10K, prod EUR 25K per month | 06-implementation/main.md | Verified |
| Support tiers: Standard 8x5, Premium 12x7, Enterprise 24x7 | 06-implementation/main.md | Verified |
| Release cadence per support tier | 06-implementation/main.md | Verified |
| Three standard environments (dev, staging, production) | 06-implementation/main.md | Verified |

### Items Not Code-Verified

| Claim | Source | Status |
|-------|--------|--------|
| Air-gap support via image mirroring | Inferred from prerequisites (harbor.settlemint.com + private registry mention) | Architectural inference, not explicitly documented as "air-gap certified" |
| GitOps (ArgoCD, Flux) compatibility | Standard Helm chart practice; not explicitly documented in DALP docs | Reasonable inference from Helm-based deployment model |
| CI/CD pipeline tool compatibility (Jenkins, GitLab CI, etc.) | Standard Helm chart practice | Reasonable inference |

### Gaps

- No explicit air-gap deployment guide found in DALP docs (prerequisites mention image mirroring but not a full air-gap runbook)
- Terraform/Pulumi modules for DALP infrastructure provisioning not found (mentioned as compatible with standard IaC, not that SettleMint provides modules)
- Detailed HA failover procedures referenced but content in self-hosting/high-availability/ not fully reviewed

## Confidence Level

**Overall: High** -- deployment models, infrastructure requirements, network support, and DevOps practices are all grounded in DALP product documentation (self-hosting prerequisites, supported networks, observability architecture) and existing bid-manager content (implementation methodology, integration architecture). Pricing and support tier details verified against implementation section content.
