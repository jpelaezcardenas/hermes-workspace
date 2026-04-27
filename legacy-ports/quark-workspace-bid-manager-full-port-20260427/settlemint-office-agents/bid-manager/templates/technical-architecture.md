# Technical Architecture

> **Target length:** 5–6 pages
> **When to use:** Every RFP/RFI that asks about system architecture, infrastructure, or technology stack.
> **DALP sources:** `~/dalp/kit/dapp/content/docs/architecture/`, capability-mapping files, `dalp-narrative.md`

---

## 1. Solution Overview

[1–2 paragraph high-level description of the DALP platform as proposed for this engagement. Explain what DALP is, its purpose, and how it addresses the client's stated requirements.]

> **Guidance:** Pull from `reusable/about-dalp.md` and tailor to the client's use case. Lead with the "complexity of doing it right" framing, the challenge is not tokenization technology, it's institutional-grade implementation at production scale. Reference specific asset classes or workflows mentioned in the RFP.

---

## 2. Architecture Principles

The DALP architecture is built on the following core principles:

| Principle | Description |
|-----------|-------------|
| **Modularity** | [Describe component-based architecture, each capability is independently deployable and configurable] |
| **Blockchain-Agnostic** | [Explain multi-chain support. Ethereum, Hyperledger Besu, Polygon, etc.] |
| **Security by Design** | [Reference zero-trust architecture, encryption at rest/in transit, role-based access] |
| **Scalability** | [Horizontal scaling, microservices, event-driven patterns] |
| **Compliance-Ready** | [Built-in audit trails, regulatory reporting, KYC/AML integration points] |
| **Cloud-Native** | [Kubernetes-based deployment, infrastructure-as-code, CI/CD pipelines] |

---

## 3. Logical Architecture

### 3.1 Component Overview

[Include a description of the logical architecture diagram. Reference or embed a diagram showing the main layers and their interactions.]

**Presentation Layer**
- [Web application / portal, describe the DALP UI, admin console, investor/client portals]
- [API gateway. RESTful and GraphQL endpoints for external integrations]

**Application Layer**
- [Core platform services, asset lifecycle management, workflow engine, compliance engine]
- [Smart contract layer, token standards, asset contracts, capability modules]
- [Integration middleware, event bus, message queues, webhook handlers]

**Data Layer**
- [On-chain storage, blockchain ledger for immutable transaction records]
- [Off-chain storage, relational database for metadata, configuration, user data]
- [Document storage, secure file storage for legal documents, prospectuses]

**Infrastructure Layer**
- [Container orchestration. Kubernetes clusters]
- [Blockchain nodes, validator/full nodes for supported networks]
- [Monitoring & observability, logging, metrics, alerting stack]

### 3.2 Component Interaction Diagram

[Describe the data flow between components. Reference specific DALP architecture docs from `docs/architecture/components/`.]

```
[Client Browser/API Consumer]
        │
        ▼
[API Gateway / Load Balancer]
        │
        ▼
[DALP Application Services]
   ├── Asset Management
   ├── Compliance Engine
   ├── Workflow Engine
   └── User Management
        │
   ┌────┴────┐
   ▼         ▼
[Blockchain]  [Database]
 Nodes         Cluster
```

> **Guidance:** Replace ASCII diagram with a proper architecture diagram for the final submission. Use SettleMint brand colors and Figtree font.

---

## 4. Infrastructure Architecture

### 4.1 Deployment Topology

[Describe the proposed deployment model for this client. Reference `reusable/deployment-options.md` for standard options.]

| Component | Technology | Deployment |
|-----------|-----------|------------|
| Application Runtime | [Kubernetes / Docker] | [Cloud provider / region] |
| Blockchain Nodes | [Network type, e.g., Hyperledger Besu] | [Node count, consensus mechanism] |
| Database | [PostgreSQL / managed DB service] | [HA configuration] |
| Object Storage | [S3-compatible / Azure Blob] | [Encryption, retention policy] |
| CDN / Load Balancer | [CloudFront / ALB / nginx] | [Edge locations if relevant] |
| Monitoring | [Prometheus + Grafana / CloudWatch] | [Retention, alerting targets] |

### 4.2 Cloud Infrastructure

[Detail the cloud provider(s), regions, and infrastructure choices. Tailor to client's stated cloud preferences or requirements.]

- **Primary Region:** [e.g., eu-west-1 / Europe West]
- **DR Region:** [e.g., eu-central-1 / Europe Central]
- **Network Architecture:** [VPC design, subnet strategy, security groups]
- **Identity & Access:** [IAM integration, SSO/SAML, service accounts]

### 4.3 Network Architecture

[Describe network segmentation, firewall rules, VPN/private connectivity options, and data flow paths.]

- **Public subnet:** [Load balancers, API gateway]
- **Private subnet:** [Application services, databases]
- **Isolated subnet:** [Blockchain nodes, key management]
- **Connectivity:** [VPN, Direct Connect/ExpressRoute, peering options]

---

## 5. Security Architecture

[High-level security architecture overview. For detailed security response, reference `templates/security-response.md`.]

### 5.1 Security Layers

| Layer | Controls |
|-------|----------|
| **Network** | [Firewall rules, WAF, DDoS protection, network segmentation] |
| **Application** | [Authentication, authorization, input validation, OWASP compliance] |
| **Data** | [Encryption at rest (AES-256), in transit (TLS 1.3), key management (HSM/KMS)] |
| **Blockchain** | [Consensus security, smart contract audits, private key management] |
| **Operational** | [Audit logging, SIEM integration, incident response procedures] |

### 5.2 Identity & Access Management

[Describe RBAC model, authentication mechanisms (SSO, MFA), and integration with client's existing IdP.]

---

## 6. Integration Architecture

### 6.1 API Layer

| API Type | Purpose | Authentication |
|----------|---------|----------------|
| REST API | [Core CRUD operations, external system integration] | [OAuth 2.0 / API key] |
| GraphQL | [Flexible querying for frontend and reporting] | [JWT / session-based] |
| Webhooks | [Event-driven notifications to external systems] | [HMAC signature verification] |
| Blockchain RPC | [Direct chain interaction for advanced use cases] | [Network-level access control] |

### 6.2 External System Integration

[List specific integrations required by the RFP. For each:]

| System | Integration Method | Data Flow | Frequency |
|--------|--------------------|-----------|-----------|
| [Client's core banking system] | [API / message queue / file] | [Direction: inbound/outbound/bidirectional] | [Real-time / batch / scheduled] |
| [KYC/AML provider] | [API] | [Outbound verification requests, inbound results] | [Real-time] |
| [Custody solution] | [API] | [Bidirectional, asset operations and status] | [Real-time] |
| [Reporting/BI system] | [API / data export] | [Outbound, transaction and portfolio data] | [Scheduled / on-demand] |

---

## 7. High Availability & Disaster Recovery

### 7.1 Availability Design

| Component | HA Strategy | RTO | RPO |
|-----------|------------|-----|-----|
| Application Services | [Multi-replica Kubernetes pods, auto-scaling, rolling updates] | [< 5 min] | [0, stateless] |
| Database | [Primary-replica with automated failover] | [< 15 min] | [< 1 min] |
| Blockchain Nodes | [Multi-node consensus, automatic peer recovery] | [< 10 min] | [0, consensus-based] |
| Load Balancer | [Multi-AZ, health checks, automatic rerouting] | [< 1 min] | [N/A] |

### 7.2 Disaster Recovery

- **DR Strategy:** [Active-passive / active-active / pilot light, choose based on client requirements]
- **Backup Schedule:** [Database: continuous replication + daily snapshots; Blockchain: node state + chain data; Config: version-controlled IaC]
- **Recovery Procedures:** [Reference runbooks, automated failover scripts, manual intervention steps]
- **DR Testing:** [Quarterly DR drills, documented test results, lessons learned process]

### 7.3 Backup & Restore

| Data Type | Backup Method | Frequency | Retention | Restore Time |
|-----------|--------------|-----------|-----------|--------------|
| Database | [Automated snapshots + WAL streaming] | [Continuous + daily full] | [30 days] | [< 1 hour] |
| Blockchain State | [Node snapshots + chain replay capability] | [Daily] | [90 days] | [< 4 hours] |
| Configuration | [Git-based IaC, versioned] | [On every change] | [Indefinite] | [< 30 min] |
| Documents/Files | [Object storage with versioning] | [Continuous] | [Per retention policy] | [< 1 hour] |

---

## 8. Scalability & Performance

### 8.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response Time | [< 200ms p95] | [Application monitoring] |
| Transaction Throughput | [X TPS, tailor to client volume] | [Blockchain + application metrics] |
| Concurrent Users | [X, based on client user base] | [Load testing results] |
| Page Load Time | [< 2s] | [Synthetic monitoring] |

### 8.2 Scaling Strategy

- **Horizontal:** [Auto-scaling pods based on CPU/memory/custom metrics]
- **Vertical:** [Node sizing for blockchain and database workloads]
- **Blockchain:** [Network-specific scaling, sidechain, L2, or throughput tuning]

---

## 9. Technology Stack Summary

| Category | Technology | Version/Details |
|----------|-----------|-----------------|
| **Languages** | [TypeScript, Solidity] | [Versions] |
| **Framework** | [Next.js, NestJS] | [Versions] |
| **Blockchain** | [Hyperledger Besu / Ethereum / Polygon] | [Client-specific] |
| **Database** | [PostgreSQL] | [Version, managed service] |
| **Container Runtime** | [Kubernetes] | [Version, managed service] |
| **CI/CD** | [GitHub Actions / GitLab CI] | [Pipeline details] |
| **Monitoring** | [Prometheus, Grafana, Loki] | [Stack details] |
| **Security** | [Vault, KMS, WAF] | [Provider-specific] |

---

## 10. Architecture Decision Records

[Reference key architecture decisions relevant to this proposal. Pull from `docs/architecture/` ADRs as applicable.]

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| [e.g., Hyperledger Besu as primary chain] | [Performance, permissioning, EVM compatibility] | [Fabric, Corda, public Ethereum] |
| [e.g., Kubernetes for orchestration] | [Portability, scaling, ecosystem] | [ECS, Docker Swarm, bare metal] |
| [e.g., PostgreSQL for off-chain data] | [ACID compliance, JSON support, ecosystem] | [MongoDB, CockroachDB] |

---

> **Final checklist:**
> - [ ] Replace all [bracketed placeholders] with client-specific content
> - [ ] Generate or reference proper architecture diagrams (not ASCII)
> - [ ] Verify technology versions are current
> - [ ] Align HA/DR targets with SLA framework (`templates/sla-framework.md`)
> - [ ] Cross-reference with security response (`templates/security-response.md`)
> - [ ] Ensure integration list matches client's stated requirements
