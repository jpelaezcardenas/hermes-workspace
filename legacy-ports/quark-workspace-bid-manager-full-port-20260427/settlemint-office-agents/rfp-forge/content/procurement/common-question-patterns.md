# Common Buyer-Side Question Patterns

Use these patterns when drafting procurement questions so vendor responses are comparable, evidence-backed, and easy to score.

## 1. Production Reference Pattern
- **REQ-REF-01:** The Respondent shall provide at least three (3) reference implementations in regulated financial services or public-sector market infrastructure that have been live in production for a minimum of twelve (12) months. For each reference, the Respondent shall state jurisdiction, use case, production go-live date, scope delivered, and whether the deployment included regulated issuance, servicing, transfer controls, custody integration, or settlement workflows.
- **Response type:** Evidence with narrative.

## 2. Integration Responsibility Pattern
- **REQ-INT-01:** The Respondent shall describe the target-state integration model across identity, core systems, custody, payment rails, and reporting environments, and shall identify which interfaces are standard, configurable, or custom. The Respondent shall provide assumptions, buyer dependencies, and indicative delivery ownership for each integration domain.
- **Response type:** Narrative with attachment.

## 3. Migration and Exit Pattern
- **REQ-MIG-01:** The Respondent shall describe its transition-in and transition-out approach, including data migration, cutover planning, rollback safeguards, knowledge transfer, and data-export obligations at contract exit.
- **Response type:** Narrative with evidence.

## 4. Regulatory Compliance Evidence Pattern
- **REQ-REG-01:** The Respondent shall provide a compliance matrix mapping its platform capabilities to the regulatory requirements applicable in [INSERT JURISDICTION], including MiCA, FATF Travel Rule, and local custody regulations. For each regulatory requirement, the Respondent shall state whether compliance is native, configurable, or requires custom development, and shall provide evidence of certification, audit report, or legal opinion where applicable.
- **Response type:** Matrix with evidence attachments.

- **REQ-REG-02:** The Respondent shall describe its approach to regulatory change management, including processes for monitoring regulatory developments, assessing impact on platform capabilities, and delivering compliance updates within mandated timelines. The Respondent shall provide historical evidence of regulatory update delivery for at least two (2) jurisdictions.
- **Response type:** Narrative with timeline and evidence.

## 5. Security and Access Control Pattern
- **REQ-SEC-01:** The Respondent shall describe its multi-layered security architecture, including network security, application security, data encryption at rest and in transit, identity and access management, and security monitoring. The Respondent shall provide evidence of relevant certifications (SOC 2 Type II, ISO 27001) and penetration testing reports conducted within the last twelve (12) months.
- **Response type:** Narrative with supporting certifications.

- **REQ-SEC-02:** The Respondent shall describe its approach to role-based access control (RBAC) and segregation of duties (SoD), including how it supports client-defined permission models, enforces dual-approval workflows for high-value transactions, and maintains audit trails of all access and actions.
- **Response type:** Narrative with technical diagram.

## 6. Service Level Agreement (SLA) Pattern
- **REQ-SLA-01:** The Respondent shall state its standard service level commitments for platform availability, transaction processing throughput, latency for issuance and transfer operations, and incident response times. The Respondent shall describe its measurement methodology, reporting frequency, and remediation procedures for SLA breaches, including service credits or termination rights.
- **Response type:** Detailed SLA schedule with metrics.

- **REQ-SLA-02:** The Respondent shall describe its disaster recovery (DR) and business continuity planning (BCP) capabilities, including Recovery Time Objective (RTO), Recovery Point Objective (RPO), failover procedures, tested DR exercises, and multiple geographically distributed data center options.
- **Response type:** Narrative with DR/BCP documentation.

## 7. Data Management and Privacy Pattern
- **REQ-DAT-01:** The Respondent shall describe its data architecture, including how client data is segregated, where data is stored geographically, and how data retention and deletion policies are enforced. The Respondent shall state its approach to data portability and export in standard formats.
- **Response type:** Technical narrative with data flow diagram.

- **REQ-DAT-02:** The Respondent shall describe its approach to personal data protection and privacy compliance, including data minimization, consent management, data subject rights fulfillment, and breach notification procedures. The Respondent shall confirm alignment with [INSERT: GDPR/PDPA/Privacy Act].
- **Response type:** Narrative with compliance mapping.

## 8. Operational Resilience Pattern
- **REQ-RES-01:** The Respondent shall describe its approach to operational resilience, including change management processes, incident management lifecycle, problem management, and capacity planning. The Respondent shall provide evidence of operational maturity through industry frameworks such as ISO 22301 or equivalent.
- **Response type:** Narrative with supporting documentation.

- **REQ-RES-02:** The Respondent shall describe its approach to key management and cryptographic operations, including key generation, storage, rotation, backup, and recovery procedures. The Respondent shall state whether it supports client-managed keys (CMK), hardware security module (HSM) integration, and multi-signature threshold schemes.
- **Response type:** Technical narrative with key lifecycle diagram.

## 9. Pricing and Commercial Pattern
- **REQ-COM-01:** The Respondent shall provide a detailed pricing model covering all applicable fee categories, including platform licensing, transaction-based fees, integration services, customization, support tiers, and any variable costs. The Respondent shall state pricing assumptions, currency, billing frequency, and any volume discount structures.
- **Response type:** Pricing schedule with narrative explanation.

- **REQ-COM-02:** The Respondent shall describe its commercial model for regulatory updates, including whether compliance updates are included in standard support, charged separately, or delivered through version upgrades. The Respondent shall state its commitment to maintaining regulatory compliance support for supported jurisdictions.
- **Response type:** Commercial narrative with terms.

## 10. Asset Lifecycle and Governance Pattern
- **REQ-ALG-01:** The Respondent shall describe how new digital asset products, token configurations, workflow rules, and smart-contract parameter changes are governed across design, approval, testing, deployment, and rollback. The Respondent shall identify which controls are configurable by the Institution, which require vendor intervention, and which changes require dual approval, segregation of duties, or formal release sign-off.
- **Response type:** Narrative with governance workflow diagram.

- **REQ-ALG-02:** The Respondent shall describe how it evidences asset lifecycle control in production, including version history, approval records, environment segregation, release traceability, and post-deployment auditability. The Respondent shall provide a sample change record or equivalent evidence demonstrating how a material product or rules change would be reviewed and reconstructed for internal audit or regulator inspection.
- **Response type:** Evidence-backed narrative with sample artifact.

## 11. Vendor Financial Stability and Continuity Pattern
- **REQ-VFS-01:** The Respondent shall provide evidence of financial standing sufficient to sustain platform operations and contractual obligations throughout the contract term. Evidence shall include audited financial statements for the most recent two (2) financial years, or equivalent investor-backed funding documentation for pre-revenue or venture-funded entities. The Respondent shall state its runway, funding stage, and any known material changes to its corporate structure, ownership, or capitalisation anticipated within the contract period.
- **Response type:** Evidence with narrative.

- **REQ-VFS-02:** The Respondent shall describe its source code and data escrow arrangements, including the escrow agent, release conditions, update frequency, and the Institution's rights to access escrowed materials in the event of vendor insolvency, material breach, or cessation of supported operations. Where escrow is not in place, the Respondent shall propose equivalent continuity safeguards.
- **Response type:** Narrative with draft escrow terms or equivalent.

- **REQ-VFS-03:** The Respondent shall identify all critical third-party suppliers, cloud infrastructure providers, and open-source dependencies underpinning platform operations. For each, the Respondent shall assess concentration risk, state whether alternatives exist, and describe the impact on the Institution if that dependency were to fail or be discontinued.
- **Response type:** Dependency register with risk assessment.

## 12. AI and Automation Transparency Pattern
- **REQ-AIT-01:** Where the platform incorporates AI-driven decision support, automated workflow orchestration, or machine-learning-based risk or compliance functions, the Respondent shall describe the purpose and scope of each such function, the data inputs used, the explainability mechanisms available to the Institution, and any human-in-the-loop controls that prevent fully automated execution of regulated actions.
- **Response type:** Technical narrative per AI/automation function.

- **REQ-AIT-02:** The Respondent shall describe how AI-assisted or automated functions are validated before deployment, monitored in production, and governed for model drift, bias, or unintended outputs. The Respondent shall state the Institution's ability to audit, override, disable, or roll back any AI or automation function affecting asset issuance, transfer, settlement, or compliance reporting.
- **Response type:** Governance narrative with control matrix.

- **REQ-AIT-03:** The Respondent shall confirm whether any AI or automated processing involves personal data or generates decisions that materially affect individuals, and if so, shall describe how it meets applicable automated decision-making restrictions under [INSERT: GDPR Art. 22 / PDPA / equivalent]. The Respondent shall provide a data protection impact assessment (DPIA) summary or equivalent documentation for any high-risk AI processing.
- **Response type:** Compliance narrative with DPIA or equivalent evidence.

## 13. Implementation Delivery and Professional Services Pattern
- **REQ-IMP-01:** The Respondent shall describe its end-to-end implementation methodology, including project phases, delivery milestones, acceptance criteria for each phase, and the governance model used to manage scope, risk, and change during deployment. The Respondent shall state the typical elapsed time from contract execution to go-live for a deployment of equivalent scope, and shall identify the critical-path dependencies that most frequently affect delivery timelines in regulated financial institution environments.
- **Response type:** Narrative with indicative project plan and milestone schedule.

- **REQ-IMP-02:** The Respondent shall describe its approach to knowledge transfer, user training, and operational handover, including the training curriculum for technical administrators, platform operators, and end users; delivery format (self-service, instructor-led, sandbox environment); and the criteria the Respondent uses to confirm that the Institution's team is operationally self-sufficient at the end of the implementation engagement. The Respondent shall state what ongoing documentation, runbooks, and knowledge base access are included in standard support.
- **Response type:** Narrative with training outline and handover acceptance criteria.

- **REQ-IMP-03:** The Respondent shall describe its post-go-live support model, including support tiers, escalation procedures, named account management, incident severity classification, and access to product engineering for critical issues. The Respondent shall distinguish between support services included in the standard licence and those priced separately. Where a managed service or shared operations model is offered, the Respondent shall describe the operating model, demarcation of responsibilities, and any sub-contracting arrangements with third-party infrastructure or operations providers.
- **Response type:** Narrative with support tiers schedule and responsibility matrix (RACI).

## 14. Scalability and Performance Pattern
- **REQ-SPF-01:** The Respondent shall state the platform's demonstrated transaction processing capacity, including peak throughput (transactions per second), end-to-end latency for issuance, transfer, and settlement operations, and maximum concurrent user load tested. The Respondent shall distinguish between on-chain transaction throughput and off-chain orchestration capacity, and shall specify whether stated performance figures were measured in isolated benchmarks, staging environments, or production deployments under representative institutional load. Where performance is network-dependent, the Respondent shall state tested network configurations and consensus mechanisms.
- **Response type:** Quantitative performance data with test methodology and environment description.

- **REQ-SPF-02:** The Respondent shall describe its approach to horizontal and vertical scaling, including how the platform accommodates growth in asset volume, transaction frequency, user count, and number of managed networks or ledger instances without degradation in response times or availability. The Respondent shall state whether scaling is automatic or requires manual intervention, and shall describe any architectural limits, licensing thresholds, or infrastructure prerequisites that constrain scaling. The Respondent shall provide evidence from at least one (1) production or pre-production deployment where the platform scaled beyond initial capacity parameters.
- **Response type:** Technical narrative with architecture diagram and scaling evidence.

- **REQ-SPF-03:** The Respondent shall describe its performance testing and capacity planning methodology, including how load testing, stress testing, and endurance testing are conducted prior to production deployments; how the Institution can validate performance claims independently; and how ongoing capacity monitoring and alerting are provided in production. The Respondent shall state whether performance test scripts, results, and environment specifications are made available to the Institution for independent verification.
- **Response type:** Narrative with sample test report or methodology document.

## 15. Testing, Validation, and Acceptance Pattern
- **REQ-TVA-01:** The Respondent shall describe its approach to functional testing, integration testing, user acceptance testing, and regression testing for a deployment of equivalent scope. The Respondent shall identify which test stages are led by the Respondent, which require Institution participation, what entry and exit criteria apply to each stage, and how defects are classified, prioritised, and remediated before production approval.
- **Response type:** Narrative with test-stage matrix and defect-management summary.

- **REQ-TVA-02:** The Respondent shall describe the non-production environments, test data controls, and simulation capabilities it provides to support validation of issuance, transfer, servicing, reconciliation, and exception-handling workflows before go-live. The Respondent shall state how production-like data, wallet, identity, and integration scenarios are represented without exposing live credentials or confidential production information.
- **Response type:** Technical narrative with environment overview and sample validation scope.

- **REQ-TVA-03:** The Respondent shall state the acceptance evidence it requires and produces at go-live, including signed test completion records, defect acceptance thresholds, operational-readiness checks, rollback readiness, and business sign-off criteria. The Respondent shall identify any assumptions, buyer-side dependencies, or unresolved defect classes that would prevent the Institution from accepting the solution into production.
- **Response type:** Narrative with sample acceptance checklist or go-live readiness template.
