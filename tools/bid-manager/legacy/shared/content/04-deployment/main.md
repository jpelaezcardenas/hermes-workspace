# Section 4: Deployment and Infrastructure

## Executive Summary

DALP supports flexible deployment models designed to meet the infrastructure, data residency, security, and regulatory requirements of regulated institutions. The platform can be deployed as a managed SaaS service, in a private cloud environment, on-premises within the client's own data centre, or as a hybrid configuration combining multiple models.

All deployment models deliver the same platform capabilities: the same lifecycle modules, compliance engine, settlement protocols, observability stack, and API surface. The choice of deployment model is driven by institutional requirements around data sovereignty, security posture, regulatory constraints, existing infrastructure investments, and operational preferences.

This section covers deployment models, infrastructure requirements, blockchain network deployment, and DevOps practices for DALP environments.

---

## 1. Deployment Models

### 1.1 Model Comparison

| Capability | Managed SaaS | Private Cloud | On-Premises | Hybrid |
|---|---|---|---|---|
| Infrastructure management | SettleMint-managed | Client-managed or co-managed | Client-managed | Split by component |
| Data residency | Configurable by region | Full control | Full control | Component-level control |
| Network connectivity | Internet / VPN | Client VPN / private link | Air-gapped capable | Mixed |
| Update management | Automated by SettleMint | Coordinated releases | Client-controlled | Component-specific |
| Scaling | Auto-scaling | Client-provisioned | Client-provisioned | Component-specific |
| Time to deploy | Fastest | Moderate | Longest | Moderate |
| Operational overhead | Lowest | Moderate | Highest | Moderate |

### 1.2 Managed SaaS

SettleMint operates and manages the full DALP platform on dedicated cloud infrastructure, providing the fastest path to production with the lowest operational overhead. The client accesses DALP through standard APIs, the DALP dApp (web interface), SDK, and CLI without managing underlying infrastructure.

Key characteristics:

- Fully managed by SettleMint, including infrastructure provisioning, monitoring, patching, and updates
- Dedicated tenant environment, not multi-tenant shared infrastructure; each client operates in an isolated environment
- Configurable data residency aligned with regional requirements (EU, MENA, APAC)
- Automated scaling to handle transaction volume and user growth
- SettleMint-managed observability with Grafana dashboards, alerting, and incident response
- Continuous platform updates deployed by SettleMint with coordinated change windows

Client-side prerequisites are minimal: standard HTTPS connectivity from client applications and systems, API integration points defined for core banking, custody, and identity provider systems, and a technical contact for integration coordination.

Best suited for institutions seeking the fastest time to production, organisations without dedicated blockchain infrastructure teams, initial production deployments where minimising operational overhead is a priority, and institutions comfortable with cloud-hosted infrastructure under SettleMint operational management.

### 1.3 Private Cloud

DALP is deployed within the client's own cloud environment (AWS, Azure, GCP, or other cloud providers) and managed by the client's operations team, with SettleMint providing deployment artefacts, configuration guidance, and ongoing platform support. This model gives institutions full control over their cloud infrastructure while benefiting from DALP's Helm-based deployment automation.

Key characteristics:

- Client-owned cloud infrastructure with full control over network configuration, security policies, and access management
- Helm chart deployment with comprehensive configuration options for all platform components
- Client-managed operations including scaling, monitoring, patching, and backup
- SettleMint support for platform-level issues, upgrade guidance, and configuration best practices
- Data residency fully controlled by the client's cloud region selection
- Integration with existing cloud services (managed databases, secret managers, object storage, monitoring)

Best suited for institutions with existing cloud infrastructure and Kubernetes expertise, organisations with specific cloud provider requirements or existing enterprise agreements, regulated environments requiring full infrastructure control with cloud flexibility, and institutions with dedicated DevOps/SRE teams.

### 1.4 On-Premises

DALP is deployed within the client's own data centre infrastructure, providing maximum control over the entire technology stack. This model is typically required by institutions with strict data sovereignty requirements, air-gap mandates, or regulatory constraints that preclude cloud deployment.

Key characteristics:

- Full infrastructure control over hardware, network, storage, and compute entirely within the client's data centre
- Air-gap capable for environments requiring complete network isolation from the public internet
- Helm/Kubernetes deployment on client-provisioned Kubernetes clusters
- Client-managed operations for the full stack including infrastructure, platform, and application layers
- SettleMint support via secure channels with optional on-site deployment assistance during initial setup
- Private blockchain network deployment for environments requiring permissioned-only operation

Best suited for sovereign entities and government programmes with strict data sovereignty mandates, financial institutions with air-gap or data-centre-only security policies, organisations with existing on-premises Kubernetes infrastructure, and environments where regulatory requirements prohibit cloud deployment.

### 1.5 Hybrid

DALP components are deployed across multiple environments, combining cloud and on-premises infrastructure to meet specific requirements per component. For example, the application layer may run in a private cloud while blockchain nodes and key management operate on-premises, or the primary environment may be on-premises with a managed SaaS disaster recovery site.

Key characteristics:

- Component-level deployment flexibility where different DALP services can run in different environments
- Optimised for regulatory fit, allowing sensitive components (key management, identity data) to remain on-premises while less sensitive components take advantage of cloud scalability
- Cross-environment connectivity requiring secure networking between deployment locations
- Mixed operational model with responsibilities split between SettleMint and the client based on component location

Common hybrid patterns:

| Pattern | Description |
|---|---|
| Cloud app + on-prem keys | DALP application and API layer in cloud; HSM/key management and custody integration on-premises |
| On-prem primary + cloud DR | Production environment on-premises; disaster recovery and failover in managed cloud |
| Regional split | Different DALP instances in different regions to meet data residency requirements per jurisdiction |
| Phased migration | Initial on-premises deployment with planned migration to cloud as organisational policies evolve |

Best suited for large institutions with complex regulatory requirements spanning multiple jurisdictions, organisations migrating from on-premises to cloud infrastructure, environments requiring separation of sensitive and non-sensitive workloads, and multi-entity programmes where different participants have different infrastructure requirements.

---

## 2. Infrastructure Requirements

### 2.1 Managed SaaS Requirements

Client-side requirements are minimal for managed SaaS deployments:

- Standard HTTPS connectivity from client applications and systems to the managed environment (internet or VPN)
- API integration points defined for core banking, custody, and identity provider systems
- Agreed data residency requirements and regulatory jurisdiction
- A client-side technical contact for integration coordination

All infrastructure provisioning, monitoring, and operations are handled by SettleMint.

### 2.2 Private Cloud Requirements

Private cloud deployments require the client to provision and manage the following infrastructure.

**Kubernetes Cluster**

| Requirement | Minimum | Recommended | Notes |
|---|---|---|---|
| Kubernetes version | 1.27+ | 1.29+ | Standard CNI required |
| OpenShift version | 4.14+ | 4.16+ | OCP or OKD supported |
| Node count | 3 | 6+ | Multi-AZ distribution required |
| Node size (compute) | 4 vCPU / 16 GB RAM per node | 8 vCPU / 32 GB RAM per node | Scales with workload |

DALP supports deployment on both standard Kubernetes distributions and Red Hat OpenShift. The Helm charts automatically detect the platform and configure appropriate resources (Ingress on Kubernetes, Routes on OpenShift). Nodes must be distributed across a minimum of three availability zones for production workloads.

**Managed PostgreSQL**

| Provider | Service | Minimum Sizing |
|---|---|---|
| AWS | RDS PostgreSQL | 4 vCPU / 16 GB RAM (db.r6g.large) |
| Azure | Azure Database for PostgreSQL Flexible Server | 4 vCPU / 16 GB RAM (Standard_D4ds_v5) |
| GCP | Cloud SQL for PostgreSQL | 4 vCPU / 16 GB RAM (db-custom-4-16384) |

PostgreSQL 17.x is required (tested on 17.5), with multi-AZ or zone-redundant HA, point-in-time recovery enabled with 7-day retention, SSL/TLS, and extensions including pg_trgm, btree_gist, pg_stat_statements, and postgres_fdw. Three databases are required: one for the dApp, one for Blockscout (explorer), and one for TheGraph.

**Managed Redis**

Redis 8.x is required (tested on 8.4.0) with cluster mode disabled, multi-AZ or zone redundancy, TLS encryption, AUTH password, and persistence enabled. Minimum 6 GB cache capacity.

**Object Storage**

S3-compatible object storage (AWS S3, Azure Blob Storage, GCP Cloud Storage) with versioning enabled and lifecycle policies configured. Buckets required for application storage, and optionally for Velero backups, PostgreSQL WAL/backups, and observability data.

**Networking**

- Outbound access to harbor.settlemint.com (port 443) for container image pulls
- Outbound access to managed service endpoints (PostgreSQL, Redis, object storage, observability)
- SMTP provider access (port 587 or 465) if transactional email is enabled
- LoadBalancer service type available for ingress
- HTTPS for all external routes; HTTP allowed only for redirects
- Service mesh injection (Istio, Linkerd) is not supported

**DNS and TLS**

All routes require DNS resolution and TLS certificates. SettleMint supports Let's Encrypt via Traefik ACME solver, pre-provisioned certificates as Kubernetes TLS secrets, or cert-manager with a private CA. Minimum RSA 2048 or ECDSA P-256.

### 2.3 On-Premises Requirements

On-premises deployments carry the same Kubernetes and database requirements as private cloud, with the following differences:

**Compute**: Bare metal or virtualised servers providing minimum 16 vCPUs and 64 GB RAM for a baseline deployment. Production-scale deployments require capacity planning based on expected transaction volume, user count, and asset class breadth.

**Self-Hosted Services**: When managed cloud services are not available, DALP can run PostgreSQL (via CloudNativePG operator), Redis, object storage (via RustFS, an S3-compatible storage layer), and the full observability stack inside the cluster. This requires additional capacity and operational ownership from the client team.

**Air-Gap Considerations**: For air-gapped environments, container images must be mirrored to a private registry accessible from the cluster. SettleMint provides all images through harbor.settlemint.com, which can be pulled and mirrored during scheduled connectivity windows.

**Container Registry**: A private registry is required for DALP container images. SettleMint provides Harbor registry credentials, and the client can mirror images into their own registry.

**Secrets Management**: HashiCorp Vault or HSM (Hardware Security Module) for production key management. DALP also supports CyberArk Conjur for enterprise/HSM secrets management across all Helm subcharts, encrypted database storage, and standard environment variable resolution.

**Storage**: High-performance storage for PostgreSQL (SSD recommended), plus object storage with backup and recovery procedures. Production networks typically run four Besu validators and two Besu RPC nodes, increasing storage requirements. Baseline PVC sizing starts at approximately 62 GB for a four-validator configuration, with backup retention sizing scaling to approximately 2 TB per RustFS replica.

### 2.4 Hybrid Requirements

Hybrid deployments combine the prerequisites from the applicable deployment models for each component, plus:

- Secure cross-environment networking (VPN, private link, dedicated connectivity)
- Unified monitoring strategy spanning environments
- Change management procedures covering cross-environment deployments and updates

---

## 3. Blockchain Network Deployment

### 3.1 Network Compatibility

DALP operates on any blockchain that implements the Ethereum JSON-RPC specification. No application changes are required when switching networks. Configuration handles consensus differences, gas models, and confirmation requirements through environment variables.

### 3.2 Supported Public Networks

**Layer 1 Mainnets**

| Network | Gas Model | Block Time | Notes |
|---|---|---|---|
| Ethereum | EIP-1559 (base + priority fee) | ~12 seconds | Primary target, full feature support |
| Polygon PoS | EIP-1559 variant | ~2 seconds | Lower gas costs, faster finality |
| Avalanche C-Chain | EIP-1559 | ~2 seconds | Sub-second finality with 3-block confirmation |
| BNB Smart Chain | Legacy gas pricing | ~3 seconds | Higher throughput |
| XDC Network | Enterprise-grade | Variable | Hybrid blockchain |
| Gnosis Chain | EIP-1559 | ~5 seconds | Community-owned |

**Layer 2 Rollups**

| Network | Type | Settlement | Notes |
|---|---|---|---|
| Arbitrum One | Optimistic rollup | Ethereum L1 | 7-day challenge period for withdrawals |
| Optimism | Optimistic rollup | Ethereum L1 | Bedrock architecture |
| Base | Optimistic rollup | Ethereum L1 | Coinbase-incubated, OP Stack |
| zkSync Era | ZK rollup | Ethereum L1 | Validity proofs, different gas accounting |
| Polygon zkEVM | ZK rollup | Ethereum L1 | EVM-equivalent ZK proofs |
| Linea | ZK rollup | Ethereum L1 | ConsenSys zkEVM with type 2 equivalence |
| Scroll | ZK rollup | Ethereum L1 | Community-driven zkEVM |

**Specialized and Appchains**

| Network | Description |
|---|---|
| ADI Chain | UAE-based ZK Stack chain for institutional finance and regulated stablecoins |
| Immutable zkEVM | Gaming-focused Polygon zkEVM |
| Worldchain | World ID verified OP Stack chain |

### 3.3 Private and Consortium Networks

DALP supports private EVM deployments for institutions requiring permissioned-only operation:

| Client | Use Case |
|---|---|
| Hyperledger Besu | Enterprise features with IBFT 2.0/QBFT consensus, permissioning, privacy groups |
| Go-Ethereum (Geth) | Reference implementation, private PoA (Clique) or PoS configurations |
| Nethermind | .NET-based client with enterprise plugins |
| Erigon | Archive-optimised client for analytics-heavy workloads |
| SettleMint networks | Managed private networks with genesis-allocated DALP contracts (predeployed infrastructure) |

For SettleMint-managed private networks, DALP contracts are pre-deployed at genesis, skipping the contract deployment phase and allowing implementations to begin directly at platform configuration. Production private network topologies typically use four validator nodes and two RPC nodes with IBFT 2.0 or QBFT consensus.

### 3.4 Multi-Chain Operation

DALP supports simultaneous operation across multiple blockchain networks with a consistent governance model. Key architectural implications:

- Identity isolation: each chain has its own identity registry. An investor's OnchainID is chain-specific.
- Compliance isolation: compliance module configurations are per-chain, per-token.
- Indexer per chain: one ChainIndexer Restate Virtual Object per chain ID.
- Custody per chain: Fireblocks and DFNS support multi-chain asset wallets through the same vault/wallet.
- Configuration-driven: network switching requires only environment-variable changes, no code modifications.

Network-specific configuration parameters include block confirmation count (1 for private networks to 12+ for Ethereum mainnet), gas price strategy (legacy, EIP-1559, or custom), RPC batch limits (varies by provider), and chain ID for multi-chain identity registry separation.

### 3.5 Network Selection Considerations

| Factor | Public Network | Private Network |
|---|---|---|
| Transaction costs | Gas fees per transaction (varies by network congestion) | Configurable or zero gas cost |
| Throughput | Network-dependent (subject to shared capacity) | Dedicated capacity, configurable block size and gas limits |
| Privacy | Transparent (all transactions visible on public explorer) | Restricted visibility to network participants |
| Finality | Network-dependent (seconds to minutes) | Configurable (sub-second possible with appropriate consensus) |
| Regulatory posture | Shared infrastructure, public record | Full control over data visibility and participant access |
| Operational control | No control over network parameters | Full control over consensus, gas, block time, and participants |

---

## 4. Platform Components and Deployment Architecture

### 4.1 Core Application Components

A DALP deployment consists of the following application components, all delivered as containerised workloads managed through Helm charts:

| Component | Role |
|---|---|
| DALP dApp | Web-based user interface for operators, issuers, and compliance officers |
| DAPI (Unified API) | REST API and RPC endpoint for programmatic access |
| Execution Engine (Restate) | Durable workflow orchestration for transaction lifecycle, indexing, and settlement |
| Key Guardian / Transaction Signer | Key management and signing operations across custody backends |
| Chain Indexer | Blockchain event processing and domain model construction |
| Chain Gateway | Multi-node RPC load balancing, failover, and health monitoring |
| Feeds System | On-chain data feed registry and price/NAV data management |
| Blockscout | Blockchain explorer for transaction visibility |
| Graph Node | Subgraph hosting for complex cross-entity queries (on deprecation path) |

### 4.2 Supporting Infrastructure

| Component | Role |
|---|---|
| PostgreSQL | Primary data store for indexed data, user records, transaction state, and analytics views |
| Redis | Session management, caching, and rate limiting |
| Object storage (S3-compatible) | Document storage, asset artefacts, and backup retention |
| Traefik | Ingress controller and TLS termination (Kubernetes); OpenShift Router used on OpenShift |

### 4.3 Observability Stack

DALP ships a full observability stack deployable alongside the platform or integratable with existing enterprise monitoring:

| Component | Role |
|---|---|
| Grafana | Dashboards (21 pre-built dashboard definitions shipped as code) |
| VictoriaMetrics | Time-series metrics (request rates, latency, error rates) |
| Loki | Structured log aggregation with secret filtering |
| Tempo | Distributed tracing with OpenTelemetry |
| Alloy | Kubernetes node/pod discovery, Prometheus remote write, OTLP receivers |

The observability stack exposes OTLP receivers on ports 4317 (gRPC) and 4318 (HTTP) for external trace and metric ingestion. Dashboards support SSO/IAM integration for access control. SIEM integration is supported through structured audit logging and OTLP export.

For managed cloud deployments, the observability stack can be replaced with cloud-native alternatives (AWS CloudWatch + Managed Prometheus + Managed Grafana, Azure Monitor + Managed Grafana, GCP Cloud Monitoring and Logging) by configuring external endpoints in the Helm values.

---

## 5. Environment Strategy

### 5.1 Standard Environment Model

DALP implementations provision three environments:

| Environment | Purpose | Data | Access |
|---|---|---|---|
| Development | Iterative configuration, developer testing, integration prototyping | Synthetic | SettleMint + client development team |
| Staging | Integration testing, UAT, performance testing, pre-production validation | Anonymised production-representative | SettleMint + client full team |
| Production | Live operations | Real | Controlled per RBAC model |

Each environment runs the full DALP stack independently. Configuration is environment-specific through Helm value files, enabling consistent deployment processes across environments while allowing different parameters (network endpoints, database connections, custody credentials, compliance module configurations).

### 5.2 Environment Pricing

| Environment | Monthly Cost |
|---|---|
| Development | EUR 10,000/month |
| Production | EUR 25,000/month |

Development and production environment fees begin when environments are provisioned during the Foundation and Setup phase.

---

## 6. DevOps and Deployment Operations

### 6.1 Helm-Based Deployment

All DALP deployments use Helm charts as the standard packaging and deployment mechanism. SettleMint provides versioned, tested Helm chart packages that include all platform components, supporting infrastructure, and the observability stack.

Helm charts support comprehensive configuration through value files covering:

- All platform component parameters (replica counts, resource limits, feature flags)
- Database and cache connection details (external managed or in-cluster)
- Object storage configuration (managed S3 or in-cluster RustFS)
- Observability configuration (internal stack or external endpoints)
- Ingress and TLS settings (Traefik on Kubernetes, Routes on OpenShift)
- Blockchain network parameters (RPC endpoints, chain ID, gas configuration)
- Custody provider credentials and configuration
- Backup and recovery settings (Velero, CloudNativePG scheduled backups)

### 6.2 Container Image Management

All container images are served through harbor.settlemint.com, which proxies upstream registries. Direct access to ghcr.io or docker.io is not required. For air-gapped or restricted environments, images can be mirrored to a client-operated private registry.

SettleMint provides Harbor registry credentials for image access. Container images are security-scanned before release.

### 6.3 Update and Release Management

Update cadence varies by deployment model and support tier:

| Support Tier | Release Cadence |
|---|---|
| Standard (8x5) | Quarterly |
| Premium (12x7) | Monthly |
| Enterprise (24x7) | Continuous with staged rollout |

For managed SaaS deployments, updates are applied by SettleMint with coordinated change windows. For private cloud and on-premises deployments, SettleMint provides updated Helm charts with migration guides, and the client executes the upgrade through their change control process.

### 6.4 CI/CD Integration

DALP's Helm-based deployment model integrates with standard CI/CD tooling. The deployment artefacts (Helm charts, value files, container image references) are compatible with:

- GitOps workflows (ArgoCD, Flux) for declarative, version-controlled deployments
- Standard CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions, Azure DevOps) for imperative deployment orchestration
- Infrastructure-as-code tools (Terraform, Pulumi) for provisioning the underlying infrastructure that hosts DALP

The DALP CLI (301 typed commands) supports scripting and automation for token deployment, compliance module configuration, batch user creation, identity registration, and other operational tasks within CI/CD pipelines. CLI authentication uses a device-code flow that produces long-lived API keys suitable for automated workflows.

### 6.5 Backup and Disaster Recovery

Backup and recovery capabilities vary by deployment model:

**Managed SaaS**: SettleMint manages all backup and DR procedures, including database point-in-time recovery, object storage versioning, and infrastructure redundancy.

**Private Cloud and On-Premises**: DALP Helm charts include support for:

- Velero for Kubernetes resource backups (scheduled and on-demand)
- CloudNativePG scheduled backups for PostgreSQL (when using the in-cluster operator)
- Managed database PITR for cloud-hosted PostgreSQL
- Object storage versioning and lifecycle policies for document and artefact retention
- RustFS distributed mode with replication for self-hosted object storage redundancy

Backup sizing follows a retention multiplier model. For a production four-validator Besu network with approximately 62 GB of PVC storage, compressed backup retention requires approximately 2 TB per RustFS replica.

### 6.6 High Availability

DALP supports high availability configurations for production deployments:

- Multi-AZ Kubernetes node distribution (minimum three availability zones)
- Pod disruption budgets for controlled rolling updates
- Topology spread constraints for cross-zone scheduling
- Database HA through managed service multi-AZ or CloudNativePG clustering
- Redis HA through managed service zone redundancy or in-cluster replication
- Blockchain node redundancy through multiple validator and RPC node deployment

For on-premises deployments, high availability configurations are documented in the DALP self-hosting architecture guides, covering both Kubernetes and OpenShift platforms.

### 6.7 CRD and Operator Requirements

DALP Helm charts install Custom Resource Definitions (CRDs) for several components. These require cluster-level permissions and security team approval before deployment:

| Component | CRDs | When Required |
|---|---|---|
| Traefik | IngressRoute, Middleware, TLSOption, TLSStore | Always (Kubernetes only; OpenShift uses Routes) |
| CloudNativePG | clusters, poolers, scheduledbackups (postgresql.cnpg.io) | Self-hosted PostgreSQL only |
| Velero | backups, schedules, restores (velero.io) | When Velero backup is enabled |
| VolumeSnapshot | snapshot.storage.k8s.io resources | When snapshot backups are enabled |

Operators are configured for namespace-scoped RBAC, so ClusterRoleBindings are not required unless chart defaults are changed. If an organisation already operates these components, they can be supplied externally as long as they watch the DALP namespace.

On OpenShift, the charts are compatible with the restricted-v2 Security Context Constraint. All containers run as non-root with arbitrary UID assignment.

---

## 7. Deployment Support

For all deployment models, SettleMint provides:

- Deployment documentation including architecture guides, configuration references, and runbooks
- Helm charts with comprehensive value files for all DALP components
- Infrastructure sizing guidance based on expected workload characteristics
- Deployment validation procedures to verify correct installation and configuration
- Ongoing platform support per the agreed support tier and SLA

SettleMint engineers perform the initial installation for private cloud and on-premises deployments, including smart contract deployment, subgraph setup, and post-deployment verification. The client's team assumes operational responsibility after the hypercare period, with SettleMint providing ongoing support through the contracted support tier.

The responsibility matrix for self-hosted deployments:

| Area | SettleMint | Client |
|---|---|---|
| Helm charts | Development, testing, versioning | Deployment, configuration |
| Container images | Building, security scanning | Registry access, pulling |
| Installation | Initial deployment, verification | Infrastructure provisioning |
| Smart contracts | Deployment, verification | Network access |
| Kubernetes / OpenShift | Architecture guidance | Provisioning, maintenance |
| Managed services | Configuration recommendations | Provisioning, credentials |
| Monitoring | Dashboard templates, alert rules | Grafana hosting, alert routing |
| Upgrades | Chart updates, migration guides | Execution, testing |
| Incident response | Application-level response (dependent on SLA) | Infrastructure-level response |
