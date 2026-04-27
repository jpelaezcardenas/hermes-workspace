# Security Requirements Patterns — Digital Asset Platform RFPs

Buyer-side security requirement blocks for institutional RFPs evaluating digital asset platforms. Use these patterns verbatim or adapt to match an institution's existing security procurement language.

---

## 1. Identity and Access Management (IAM)

**Requirement block:**
> The vendor must provide enterprise-grade identity and access management with role-based access control (RBAC) at minimum, and attribute-based access control (ABAC) where granular permission scoping is required. The platform must support integration with enterprise identity providers (IdPs) via SAML 2.0 and/or OpenID Connect. Multi-factor authentication (MFA) must be enforced for all administrative functions. Privileged access must be separately controlled, logged, and subject to periodic access reviews. The vendor must provide documentation of its access provisioning, deprovisioning, and periodic review process.

**Scoring guidance:**
- Strong response: RBAC + ABAC, named IdP integrations (e.g., Entra ID, Okta), MFA on all roles, privileged access management tooling, documented review cadence
- Adequate: RBAC, SAML support, MFA available, basic audit logs
- Weak: Role control limited to admin/user, no IdP integration, MFA optional

**Evidence to request:** IAM architecture diagram, access control policy documentation, last access review report (redacted), MFA enforcement policy.

---

## 2. Cryptographic Key Management

**Requirement block:**
> The vendor must describe its cryptographic key management architecture, including key generation, storage, rotation, and destruction procedures. For digital asset platforms, key management must address both platform credentials and, where applicable, cryptographic keys used for on-chain signing or custody operations. Hardware Security Modules (HSMs) or equivalent FIPS 140-2 Level 3 or higher certified controls must be in use for key storage where the platform controls signing. The vendor must document its key ceremony process and separation of duties for key custodians.

**Scoring guidance:**
- Strong response: HSM-backed storage, FIPS 140-2 Level 3 certification, key ceremony documentation, multi-party authorization for sensitive key operations, annual key rotation
- Adequate: HSM use described, rotation policy exists, some access controls on keys
- Weak: Software key storage, no rotation policy, no separation of duties

**Evidence to request:** Key management policy, HSM certification evidence, key ceremony procedure (redacted), custody architecture diagram.

---

## 3. Data Encryption

**Requirement block:**
> The vendor must encrypt all data in transit using TLS 1.2 or higher, with TLS 1.3 preferred. All data at rest must be encrypted using AES-256 or equivalent. The vendor must describe its encryption key management for data-at-rest encryption, including separation between data encryption keys (DEKs) and key encryption keys (KEKs). Database-level, field-level, or application-level encryption capabilities must be described where the institution requires targeted protection of sensitive fields (e.g., PII, transaction amounts, wallet identifiers).

**Scoring guidance:**
- Strong response: TLS 1.3 in transit, AES-256 at rest, DEK/KEK separation, field-level encryption available, customer-managed encryption key (CMEK) option
- Adequate: TLS 1.2+ in transit, AES-256 at rest, vendor-managed keys
- Weak: TLS version not specified, at-rest encryption not confirmed, no key hierarchy

**Evidence to request:** Encryption architecture document, TLS configuration evidence, key hierarchy description.

---

## 4. Penetration Testing and Vulnerability Management

**Requirement block:**
> The vendor must conduct annual external penetration testing by an independent, qualified third party. Results must be shared with the institution under NDA. Critical and high-severity vulnerabilities must have documented remediation timelines not exceeding 30 days (critical) and 90 days (high). The vendor must maintain a vulnerability disclosure program and a defined patch management process with SLA commitments for emergency patches. Continuous vulnerability scanning must be in place for production infrastructure.

**Scoring guidance:**
- Strong response: Annual third-party pen test with results shared, CVE tracking with named SLAs, bug bounty or VDP program, continuous scanning tooling named (e.g., Tenable, Qualys, Snyk), emergency patch SLA ≤24h
- Adequate: Annual pen test, remediation policy exists, critical patches within 30 days
- Weak: No third-party pen test, no formal SLA for vulnerabilities, patch process undocumented

**Evidence to request:** Most recent pen test executive summary (redacted), vulnerability management policy, patch SLA documentation, VDP/bug bounty program details.

---

## 5. Audit Logging and Monitoring

**Requirement block:**
> The vendor must maintain comprehensive audit logs for all platform events including user authentication, permission changes, data access, configuration changes, and API calls. Logs must be immutable, tamper-evident, and retained for a minimum of 12 months online and 7 years in cold storage (or per the institution's regulatory obligation). The vendor must provide the institution with access to relevant audit logs on request within 48 hours. A Security Information and Event Management (SIEM) system or equivalent must be operational for real-time threat detection and alerting.

**Scoring guidance:**
- Strong response: Immutable log storage (e.g., write-once), SIEM named and operational, customer log access via API or export, retention matches regulatory requirements, real-time alerting on anomalous events
- Adequate: Logs retained 12+ months, SIEM in use, customer log access on request
- Weak: Log retention undocumented, no SIEM, logs not accessible to institution

**Evidence to request:** Log retention policy, SIEM tooling and alert configuration overview, sample log export (redacted), incident detection procedures.

---

## Usage Notes

- These patterns are written as buyer-side requirements. They are designed to be inserted into an RFP or security questionnaire targeting digital asset platform vendors including SettleMint DALP.
- Adapt evidence requests to the institution's due diligence framework and any applicable regulatory examination expectations (e.g., OCC, ECB, MAS technology risk guidelines).
- For SettleMint-specific capability mapping against these requirements, cross-reference `content/compliance/jurisdiction-compliance-requirements.md` and the DALP product documentation.
