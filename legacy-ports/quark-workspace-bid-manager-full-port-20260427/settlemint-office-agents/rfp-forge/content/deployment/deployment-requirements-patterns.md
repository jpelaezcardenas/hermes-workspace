# Deployment and Hosting Requirements Patterns — Buyer-Side

Reusable buyer-side requirement blocks for evaluating the deployment, hosting, and environment management capabilities of a digital asset platform. Each pattern provides a verbatim requirement paragraph, scoring guidance, and evidence requests suitable for inclusion in RFP, RFI, or ITT documents.

---

## 1. Deployment Model Flexibility and Hosting Options

### Requirement

The Vendor shall describe all supported deployment models for the platform, including cloud-hosted (SaaS/managed), self-hosted on-premises, self-hosted in a private cloud (e.g. AWS, Azure, GCP), and hybrid configurations. For each deployment model, the Vendor shall specify: the minimum infrastructure requirements (compute, memory, storage, network), the deployment tooling provided (container images, Helm charts, infrastructure-as-code templates, or equivalent), the boundary of Vendor vs. Buyer operational responsibility, and any feature or capability differences between deployment models. The Vendor shall confirm whether the Buyer retains full control of encryption keys, data storage, and network egress in self-hosted configurations.

### Scoring Guidance

| Score | Criteria |
|-------|----------|
| **Strong (4-5)** | Multiple deployment models supported with documented infrastructure specifications per model; container-native deployment with Helm charts or equivalent IaC tooling; clear RACI for Vendor vs. Buyer operations per model; no material feature disparity between models; encryption key sovereignty confirmed for self-hosted |
| **Adequate (3)** | At least two deployment models supported; general infrastructure guidance provided; some deployment tooling available; operational responsibility described at a high level |
| **Weak (1-2)** | Single deployment model only (SaaS-only or on-prem-only); no standardised deployment tooling; infrastructure requirements vague or undocumented; unclear operational responsibility boundaries |

### Evidence Requests

- Deployment architecture diagram for each supported model showing component placement, network boundaries, and external dependencies
- Infrastructure sizing guide with minimum and recommended specifications per deployment scale
- Sample Helm chart, Terraform module, or equivalent IaC artifact demonstrating deployment automation
- RACI matrix for operational responsibility across Vendor and Buyer for each deployment model

---

## 2. Environment Management and Promotion Pipeline

### Requirement

The Vendor shall describe the platform's support for multiple isolated environments (development, staging/UAT, production) and the mechanisms for promoting configuration, smart contracts, and application changes between environments. The Vendor shall specify whether environment provisioning is automated, whether environments are structurally identical (same components, same configuration schema), and what safeguards prevent unvalidated changes from reaching production. The Vendor shall describe how environment-specific parameters (network endpoints, signing keys, compliance rule sets) are managed without modifying promoted artifacts.

### Scoring Guidance

| Score | Criteria |
|-------|----------|
| **Strong (4-5)** | Automated environment provisioning with infrastructure-as-code; structurally identical environments with environment-specific configuration injection; formal promotion pipeline with approval gates between stages; immutable artifact promotion (same build artifact moves between environments); environment parity verification tooling |
| **Adequate (3)** | Multiple environments supported; manual but documented promotion process; environment configuration separated from application code; some approval controls before production deployment |
| **Weak (1-2)** | Single environment or manual environment setup with no standardisation; no formal promotion process; configuration embedded in application artifacts; no approval gates before production changes |

### Evidence Requests

- Environment topology diagram showing the standard environment chain and promotion flow
- Documentation of the promotion pipeline including approval gates, rollback procedures, and audit trail
- Evidence of environment parity controls (configuration drift detection, structural comparison tooling)

---

## 3. High Availability, Disaster Recovery, and Business Continuity

### Requirement

The Vendor shall describe the platform's high availability architecture, including redundancy mechanisms, failover procedures, and recovery capabilities. The Vendor shall specify: the target Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for each deployment model; whether active-active or active-passive redundancy is supported; the backup strategy for on-chain state, off-chain data, configuration, and cryptographic key material; the tested failover and recovery procedures with evidence of DR testing frequency and results. For blockchain-specific components, the Vendor shall describe how node redundancy, chain state recovery, and transaction replay are handled following a partial or full infrastructure failure.

### Scoring Guidance

| Score | Criteria |
|-------|----------|
| **Strong (4-5)** | Documented RTO/RPO targets with evidence of achievement in DR tests; active-active or automatic failover for critical components; comprehensive backup strategy covering on-chain state, off-chain databases, key material, and configuration; DR tested at least annually with documented results; blockchain node redundancy with automatic peer recovery |
| **Adequate (3)** | RTO/RPO targets stated but limited DR test evidence; active-passive failover with manual intervention; backup procedures documented for most components; some DR testing performed |
| **Weak (1-2)** | No stated RTO/RPO; single points of failure in architecture; backup strategy incomplete or undocumented; no evidence of DR testing; no blockchain-specific recovery procedures |

### Evidence Requests

- Business continuity and disaster recovery plan covering all platform components
- DR test report from the most recent test cycle, including test scope, results, and remediation actions
- Backup architecture diagram showing backup scope, frequency, retention, and restoration procedures
- RTO/RPO commitment matrix by component and deployment model

---

## 4. Observability, Monitoring, and Operational Alerting

### Requirement

The Vendor shall describe the platform's observability stack, including metrics collection, log aggregation, distributed tracing, and alerting capabilities. The Vendor shall specify: which metrics are collected and exposed (infrastructure, application, blockchain node, and transaction-level); whether the Buyer can integrate platform telemetry into existing monitoring infrastructure (e.g. via Prometheus endpoints, syslog forwarding, SIEM integration); the pre-built dashboards and alerting rules provided out of the box; and the alert notification channels supported (email, webhook, PagerDuty, ServiceNow, or equivalent). The Vendor shall confirm whether the Buyer has full access to raw telemetry data in self-hosted deployments.

### Scoring Guidance

| Score | Criteria |
|-------|----------|
| **Strong (4-5)** | Full-stack observability covering infrastructure, application, and blockchain layers; metrics, logs, and traces collected with correlation capabilities; open-standard telemetry export (Prometheus, OpenTelemetry, syslog); pre-built dashboards for key operational scenarios; configurable alerting with multiple notification channels; raw telemetry access confirmed for self-hosted |
| **Adequate (3)** | Metrics and logs collected for core components; some dashboard capabilities; alerting available but limited notification channels; partial integration with external monitoring tools |
| **Weak (1-2)** | Basic health checks only; no structured log aggregation or distributed tracing; no integration with external monitoring systems; no pre-built dashboards; alerting limited to email or absent |

### Evidence Requests

- Observability architecture diagram showing telemetry collection, storage, and visualisation components
- List of pre-built dashboards and alerting rules with descriptions of monitored conditions
- Documentation of telemetry export interfaces (Prometheus endpoints, OpenTelemetry collectors, syslog configuration)
- Sample dashboard screenshots demonstrating operational visibility across infrastructure and blockchain layers

---

## 5. Network Connectivity, Boundary Control, and Environment Isolation

### Requirement

The Vendor shall describe the network connectivity patterns supported for platform deployment, including private connectivity options between the Buyer environment and any Vendor-managed components, segmentation of application, data, and blockchain-node tiers, and the controls used to isolate development, test, and production environments. The Vendor shall specify support for private endpoints, VPN or dedicated connectivity, ingress and egress restrictions, IP allow-listing, east-west traffic controls, and administrative access path segregation. The Vendor shall also describe how non-production environments are prevented from accessing production keys, production data, or live transaction-processing paths.

### Scoring Guidance

| Score | Criteria |
|-------|----------|
| **Strong (4-5)** | Supports private connectivity and segmented network zones by tier; enforces separate administrative access paths; documents ingress, egress, and east-west controls; prevents non-production access to production secrets, data, and transaction paths through technical controls |
| **Adequate (3)** | Standard network segmentation and some private connectivity options available; production and non-production environments separated at a high level; administrative access controls present but not fully segregated |
| **Weak (1-2)** | Public internet exposure required for critical paths; weak or undocumented environment isolation; no clear segregation of administrative access, secrets, or production data |

### Evidence Requests

- Network topology diagram showing trust boundaries, private connectivity options, and administrative access routes
- Firewall or security-group policy summary covering ingress, egress, and east-west restrictions
- Environment isolation design note showing how production keys, data, and transaction paths are separated from non-production
