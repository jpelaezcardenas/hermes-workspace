---
title: "DALP Technical Due Diligence Questionnaire — Response Pack"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.912416Z
---

# DALP Technical Due Diligence Questionnaire — Response Pack
Prepared for [Prospect Institution] — 2026-03-23

## Purpose

This questionnaire response pack addresses the technical due diligence questions submitted by the prospect's IT governance team regarding SettleMint's Digital Asset Lifecycle Platform (DALP). Responses are organized to mirror the original questionnaire structure.

## Instructions

Each response is provided inline beneath the original question. Where a question requires supporting evidence, references to documentation or platform screenshots are noted in the Appendix.

## Section 1: Architecture & Infrastructure

### Q1.1: Describe the platform's deployment model and supported hosting options.

**Response:**

DALP supports three deployment models: SettleMint-managed SaaS (multi-tenant or dedicated), self-hosted on-premises, and hybrid configurations. Self-hosted deployments run on Kubernetes (any CNCF-conformant cluster) and include Helm charts, operational runbooks, and infrastructure-as-code templates. All models provide identical feature parity.

### Q1.2: How does the platform handle high availability and disaster recovery?

**Response:**

DALP's HA architecture uses active-active database replication, automatic failover for all stateful services, and configurable backup schedules with point-in-time recovery. RPO and RTO targets are documented per deployment tier. Disaster recovery procedures include cross-region replication options and tested recovery runbooks.

## Section 2: Security & Compliance

### Q2.1: What access control mechanisms does the platform support?

**Response:**

DALP implements role-based access control (RBAC) and attribute-based access control (ABAC) with configurable policies. Authentication supports SSO via SAML 2.0 and OIDC, MFA enforcement, and integration with enterprise identity providers. All access decisions are audit-logged with immutable retention.

### Q2.2: How are cryptographic keys managed?

**Response:**

Private keys are managed through HSM-compatible key management with support for AWS CloudHSM, Azure Dedicated HSM, and on-premises HSM appliances via PKCS#11. Key ceremonies follow documented procedures with multi-party authorization. Key material never exists in plaintext outside the HSM boundary.

## Attestation / Sign-Off

| Field | Value |
|---|---|
| Completed by | [SettleMint Solutions Architect] |
| Role / Title | Solutions Architect |
| Date | 2026-03-23 |
| Signature | |

## Appendix

- A1: DALP Architecture Reference Diagram (see product documentation)
- A2: Security & Compliance Whitepaper
- A3: Deployment Options Comparison Matrix
