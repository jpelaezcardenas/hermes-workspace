# Deployment Options

## Overview

DALP supports flexible deployment models to meet the infrastructure, data residency, security, and regulatory requirements of regulated institutions. The platform can be deployed as a managed SaaS service, in a private cloud environment, on-premises within the client's data centre, or as a hybrid configuration combining multiple models.

All deployment models deliver the same platform capabilities: the same lifecycle modules, compliance engine, settlement protocols, observability stack, and API surface. The choice of deployment model is driven by institutional requirements around data sovereignty, security posture, regulatory constraints, existing infrastructure investments, and operational preferences.

## Deployment Model Comparison

| Capability | Managed SaaS | Private Cloud | On-Premises | Hybrid |
|---|---|---|---|---|
| **Infrastructure Management** | SettleMint-managed | Client-managed or co-managed | Client-managed | Split by component |
| **Data Residency** | Configurable by region | Full control | Full control | Component-level control |
| **Network Connectivity** | Internet / VPN | Client VPN / private link | Air-gapped capable | Mixed |
| **Update Management** | Automated by SettleMint | Coordinated releases | Client-controlled | Component-specific |
| **Scaling** | Auto-scaling | Client-provisioned | Client-provisioned | Component-specific |
| **Time-to-Deploy** | Fastest | Moderate | Longest | Moderate |
| **Operational Overhead** | Lowest | Moderate | Highest | Moderate |

---

## Option 1: Managed SaaS / Managed Cloud

### Description

SettleMint operates and manages the full DALP platform on dedicated cloud infrastructure, providing the fastest path to production with the lowest operational overhead. The client accesses DALP through standard APIs, the DALP dApp (web interface), SDK, and CLI without managing underlying infrastructure.

### Key Characteristics

- **Fully managed** by SettleMint, including infrastructure provisioning, monitoring, patching, and updates
- **Dedicated tenant environment**, not multi-tenant shared infrastructure; each client operates in an isolated environment
- **Configurable data residency** aligned with regional requirements (EU, MENA, APAC)
- **Automated scaling** to handle transaction volume and user growth
- **SettleMint-managed observability** with Grafana dashboards, alerting, and incident response
- **Continuous platform updates** deployed by SettleMint with coordinated change windows

### Prerequisites

- Network connectivity from client systems to the managed environment (internet or VPN)
- API integration points defined for core banking, custody, and identity provider systems
- Client-side technical contact for integration coordination
- Agreed-upon data residency requirements and regulatory jurisdiction

### Infrastructure Requirements

- **Client-side**: Minimal. Standard HTTPS connectivity from client applications and systems
- **SettleMint-side**: Cloud infrastructure provisioned and managed by SettleMint in the agreed region

### Best Suited For

- Institutions seeking the fastest time-to-production
- Organisations without dedicated blockchain infrastructure teams
- Initial production deployments where minimising operational overhead is a priority
- Institutions comfortable with cloud-hosted infrastructure under SettleMint operational management

---

## Option 2: Private Cloud

### Description

DALP is deployed within the client's own cloud environment (AWS, Azure, GCP, or other cloud providers) and managed by the client's operations team, with SettleMint providing deployment artefacts, configuration guidance, and ongoing platform support. This model gives institutions full control over their cloud infrastructure while benefiting from DALP's Helm-based deployment automation.

### Key Characteristics

- **Client-owned cloud infrastructure** with full control over network configuration, security policies, and access management
- **Helm chart deployment** with comprehensive configuration options for all platform components
- **Client-managed operations** including scaling, monitoring, patching, and backup
- **SettleMint support** for platform-level issues, upgrade guidance, and configuration best practices
- **Data residency** fully controlled by the client's cloud region selection
- **Integration with existing cloud services** (managed databases, secret managers, object storage, monitoring)

### Prerequisites

- **Kubernetes cluster** (v1.25+) with sufficient capacity for DALP workloads
- **PostgreSQL database** (v15+), managed cloud database service recommended
- **Object storage**: AWS S3, GCP Cloud Storage, Azure Blob Storage, or S3-compatible service
- **Secrets management**: cloud-native secret manager (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault) or HSM integration
- **DNS and TLS** certificate management
- **Outbound connectivity** for blockchain network access (public chains) and optional SettleMint support channels
- **Operations team** with Kubernetes administration experience

### Infrastructure Requirements

- **Compute**: Kubernetes cluster with minimum 8 vCPUs and 32 GB RAM for a baseline deployment; production workloads typically require 16+ vCPUs and 64+ GB RAM depending on transaction volume and asset class count
- **Storage**: PostgreSQL with sufficient IOPS for indexer and transaction processing; object storage for document management and asset artefacts
- **Network**: Ingress controller, internal service mesh or network policies, blockchain node connectivity
- **Monitoring**: Grafana, Prometheus/VictoriaMetrics, Loki, and Tempo (provided as DALP observability Helm chart) or integration with existing monitoring stack

### Best Suited For

- Institutions with existing cloud infrastructure and Kubernetes expertise
- Organisations with specific cloud provider requirements or existing enterprise agreements
- Regulated environments requiring full infrastructure control with cloud flexibility
- Institutions with dedicated DevOps/SRE teams

---

## Option 3: On-Premises

### Description

DALP is deployed within the client's own data centre infrastructure, providing maximum control over the entire technology stack. This model is typically required by institutions with strict data sovereignty requirements, air-gap mandates, or regulatory constraints that preclude cloud deployment.

### Key Characteristics

- **Full infrastructure control**: hardware, network, storage, and compute entirely within client's data centre
- **Air-gap capable** for environments requiring complete network isolation from public internet
- **Helm/Kubernetes deployment** on client-provisioned Kubernetes clusters
- **Client-managed operations** for the full stack including infrastructure, platform, and application layers
- **SettleMint support** via secure channels with optional on-site deployment assistance during initial setup
- **Private blockchain network** deployment for environments requiring permissioned-only operation

### Prerequisites

- **Kubernetes cluster** (v1.25+) provisioned on bare metal or virtualised infrastructure
- **PostgreSQL database** (v15+), self-managed with appropriate HA configuration
- **Object storage**: MinIO, RustFS, S3-compatible storage, or local filesystem (with appropriate backup)
- **Secrets management**: HashiCorp Vault or HSM (Hardware Security Module) for production key management
- **Container registry**: private registry for DALP container images
- **DNS, TLS, and ingress** infrastructure
- **Network infrastructure** supporting internal service communication and optional external blockchain connectivity
- **Operations team** with Kubernetes, database administration, and security operations experience

### Infrastructure Requirements

- **Compute**: Bare metal or virtualised servers providing minimum 16 vCPUs and 64 GB RAM for baseline deployment; production-scale deployments require capacity planning based on expected transaction volume, user count, and asset class breadth
- **Storage**: High-performance storage for PostgreSQL (SSD recommended), object storage with backup and recovery procedures
- **Network**: Internal network with service-level isolation, ingress/egress controls, and firewall configuration; blockchain node hosting if operating private networks
- **Monitoring**: Full observability stack (DALP ships Helm charts for Grafana, VictoriaMetrics, Loki, Tempo, and structured alerting) or integration with existing enterprise monitoring (SIEM-ready audit logging)
- **Backup and DR**: Client-managed backup, disaster recovery, and business continuity procedures

### Best Suited For

- Sovereign entities and government programmes with strict data sovereignty mandates
- Financial institutions with air-gap or data-centre-only security policies
- Organisations with existing on-premises Kubernetes infrastructure
- Environments where regulatory requirements prohibit cloud deployment

---

## Option 4: Hybrid

### Description

DALP components are deployed across multiple environments, combining cloud and on-premises infrastructure to meet specific requirements per component. For example, the application layer may run in a private cloud while blockchain nodes and key management operate on-premises, or the primary environment may be on-premises with a managed SaaS disaster recovery site.

### Key Characteristics

- **Component-level deployment flexibility**: different DALP services can run in different environments
- **Optimised for regulatory fit**: sensitive components (key management, identity data) can remain on-premises while less sensitive components leverage cloud scalability
- **Cross-environment connectivity** requiring secure networking between deployment locations
- **Mixed operational model** with responsibilities split between SettleMint and the client based on component location

### Common Hybrid Patterns

| Pattern | Description |
|---|---|
| **Cloud app + on-prem keys** | DALP application and API layer in cloud; HSM/key management and custody integration on-premises |
| **On-prem primary + cloud DR** | Production environment on-premises; disaster recovery and failover in managed cloud |
| **Regional split** | Different DALP instances in different regions to meet data residency requirements per jurisdiction |
| **Phased migration** | Initial on-premises deployment with planned migration to cloud as organisational policies evolve |

### Prerequisites

- All prerequisites from the applicable deployment models for each component
- **Secure cross-environment networking** (VPN, private link, dedicated connectivity)
- **Unified monitoring** strategy spanning environments
- **Change management** procedures covering cross-environment deployments and updates

### Best Suited For

- Large institutions with complex regulatory requirements spanning multiple jurisdictions
- Organisations migrating from on-premises to cloud infrastructure
- Environments requiring separation of sensitive and non-sensitive workloads
- Multi-entity programmes where different participants have different infrastructure requirements

---

## Blockchain Network Support

Regardless of deployment model, DALP supports any EVM-compatible blockchain network, public or private. The choice of network is independent of the deployment model:

- **Public networks**: Ethereum mainnet, Polygon, Avalanche, and other EVM-compatible public chains
- **Private/permissioned networks**: Hyperledger Besu, private Ethereum networks, and other EVM-compatible permissioned chains deployed via SettleMint's Blockchain Transformation Platform (BTP) or independently
- **Multi-chain**: DALP can operate across multiple networks simultaneously with a consistent governance model

## Deployment Support

For all deployment models, SettleMint provides:

- **Deployment documentation** including architecture guides, configuration references, and runbooks
- **Helm charts** with comprehensive value files for all DALP components
- **Infrastructure sizing guidance** based on expected workload characteristics
- **Deployment validation** procedures to verify correct installation and configuration
- **Ongoing platform support** per the agreed support tier and SLA (see Support and SLA section)
