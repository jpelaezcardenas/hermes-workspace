# Request for Information

## Real Estate Portfolio Tokenization Platform

**Issued by:** Al Watan Sovereign Wealth Fund  
**RFI Reference:** AW-RFI-2026-017  
**Date of Issue:** 15 March 2026  
**Response Deadline:** 31 March 2026  
**Confidentiality:** This document is confidential and intended solely for invited respondents.

---

## Background and Context

Al Watan Sovereign Wealth Fund ("Al Watan" or "the Fund") is a sovereign wealth fund established under the laws of the United Arab Emirates, with assets under management exceeding USD 85 billion across real estate, infrastructure, public equities, and fixed income. The Fund's real estate portfolio comprises 42 commercial properties across three jurisdictions: the UAE, the United Kingdom, and Luxembourg, with a combined portfolio valuation of approximately USD 6.2 billion.

Al Watan's Board of Directors has approved a strategic initiative to explore blockchain-based tokenization of a selected subset of this real estate portfolio. The initiative aims to improve capital efficiency, broaden the investor base through fractional ownership structures, automate operational processes such as rental yield distribution, and enhance transparency for both internal governance and external regulatory reporting.

The selected portfolio for the initial programme comprises nine assets across three jurisdictions:

| Property | Jurisdiction | Type | Estimated Value (USD) |
| --- | --- | --- | --- |
| Al Reem Tower | Abu Dhabi, UAE | Grade A Office | 320,000,000 |
| Dubai Marina Plaza | Dubai, UAE | Mixed Use (Retail/Office) | 275,000,000 |
| Jebel Ali Logistics Hub | Dubai, UAE | Industrial/Logistics | 180,000,000 |
| Canary Wharf Exchange | London, UK | Grade A Office | 410,000,000 |
| Manchester Distribution Centre | Manchester, UK | Logistics | 145,000,000 |
| Birmingham Retail Quarter | Birmingham, UK | Retail/Leisure | 195,000,000 |
| Kirchberg Office Park | Luxembourg City, LUX | Grade A Office | 280,000,000 |
| Cloche d'Or Logistics | Luxembourg City, LUX | Logistics | 120,000,000 |
| Gasperich Data Centre | Luxembourg, LUX | Data Centre | 165,000,000 |

Each property is held through a dedicated Special Purpose Vehicle (SPV). The tokenization programme must preserve this SPV structure, with tokens representing fractional ownership interests in the relevant SPV rather than direct claims on the underlying real property.

## Objectives

The Fund seeks a technology platform capable of supporting the following objectives:

1. Tokenization of fractional ownership interests in real estate SPVs across three regulatory jurisdictions (UAE/ADGM, UK/FCA, Luxembourg/CSSF)
2. Automated distribution of rental income to token holders on a quarterly basis, net of property management fees, maintenance reserves, and applicable withholding taxes
3. Secondary market transfer capability with compliance enforcement, including foreign ownership restrictions under UAE RERA regulations and investor eligibility under MiFID II for the European assets
4. Investor onboarding with jurisdiction-appropriate KYC/AML verification, supporting both institutional investors (minimum USD 500,000) and qualified retail investors (minimum USD 50,000 in UAE only)
5. Real-time portfolio reporting for the Fund's governance committee, including per-property occupancy data, yield performance, NAV movements, and investor registry status
6. Integration with the Fund's existing property management systems, fund administration platforms, and banking infrastructure
7. Governance mechanisms enabling token holder voting on material decisions (property dispositions exceeding USD 50 million, major capital expenditure, and change of property manager)
8. Full lifecycle support from initial tokenization through ongoing operations to eventual property disposition and token retirement

## Functional Requirements

Respondents should address each of the following requirement areas in their response. Where a requirement falls outside the platform's current capabilities, respondents should state this clearly and describe any planned roadmap items or recommended third-party integrations.

### FR-1: Asset Structuring and Issuance

1.1 Describe how the platform represents tokenized fractional ownership in an SPV structure, including the mapping between physical properties, SPVs, and on-chain tokens.

1.2 Explain the platform's support for configurable token parameters: denomination currency, minimum investment thresholds, maximum holder limits, and fractional unit precision.

1.3 Describe the issuance workflow from SPV setup through token minting, including any approval gates, compliance pre-checks, and audit trail generation.

### FR-2: Multi-Jurisdictional Compliance

2.1 Describe the platform's compliance architecture and how it enforces transfer restrictions based on investor jurisdiction, eligibility status, and asset-specific rules.

2.2 Explain how the platform supports simultaneous compliance with UAE RERA/ADGM regulations, UK FCA requirements, and Luxembourg CSSF rules for the same programme.

2.3 Describe how compliance rules can be updated post-deployment as regulations evolve, without requiring token redeployment or operational disruption.

2.4 Explain the platform's approach to foreign ownership restrictions, particularly for UAE properties where RERA mandates specific restrictions based on property location and investor nationality.

### FR-3: Investor Onboarding and Identity

3.1 Describe the investor onboarding process, including identity verification, document collection, and approval workflows.

3.2 Explain how the platform supports tiered investor categories (institutional vs. qualified retail) with different eligibility requirements per jurisdiction.

3.3 Describe how investor identities are managed on-chain and how identity credentials can be reused across multiple assets in the programme.

### FR-4: Income Distribution

4.1 Describe the platform's mechanism for distributing rental income to token holders, including the calculation of net distributable amounts (gross rental income less management fees, maintenance reserves, and withholding taxes).

4.2 Explain how distribution schedules are configured and executed, including the handling of ex-distribution dates, record dates, and payment processing.

4.3 Describe how the platform handles distribution in multiple currencies (AED for UAE properties, GBP for UK properties, EUR for Luxembourg properties) and any FX conversion capabilities.

### FR-5: Secondary Market and Transfers

5.1 Describe the platform's approach to secondary market transfers, including any built-in marketplace functionality or integration with external trading venues.

5.2 Explain how compliance is re-verified for each secondary market transfer, including buyer eligibility, jurisdictional restrictions, and holder limit checks.

5.3 Describe how transfer restrictions such as lock-up periods, right of first refusal, and minimum holding requirements are enforced.

### FR-6: Governance

6.1 Describe any governance or voting capabilities that enable token holder participation in material decisions.

6.2 Explain how quorum requirements and approval thresholds can be configured per decision type.

6.3 Describe the notification and communication workflow for governance events.

### FR-7: Reporting and Audit

7.1 Describe the platform's reporting capabilities, including investor registry reports, transaction history, distribution records, and compliance audit trails.

7.2 Explain how the platform supports regulatory reporting requirements across the three jurisdictions.

7.3 Describe the audit trail architecture and how it supports both internal governance review and external regulatory examination.

### FR-8: Integration

8.1 Describe the platform's API surface and integration capabilities for connecting with existing property management systems, fund administration platforms, and banking infrastructure.

8.2 Explain the platform's approach to data feeds, including property valuation updates, occupancy data, and external pricing information.

8.3 Describe deployment options and how data residency requirements are addressed across the three jurisdictions.

### FR-9: Security and Key Management

9.1 Describe the platform's security architecture, including authentication, authorization, and encryption approach.

9.2 Explain the key management model and custody integration options.

9.3 Describe disaster recovery capabilities, including RPO and RTO targets.

## Evaluation Criteria

Responses will be evaluated against the following criteria:

| Criterion | Weight |
| --- | --- |
| Platform capability and functional coverage | 30% |
| Multi-jurisdictional compliance capability | 20% |
| Integration and interoperability | 15% |
| Security, resilience, and operational maturity | 15% |
| Implementation approach and timeline | 10% |
| Company credentials and reference projects | 10% |

## Response Format

Respondents should structure their response to address each functional requirement area in sequence. Responses should be clear about what is natively supported, what requires configuration, what requires integration with third-party systems, and what is outside current platform scope.

Total response length should not exceed 60 pages excluding appendices.

## Contact

All queries regarding this RFI should be directed to:

**Procurement Office**  
Al Watan Sovereign Wealth Fund  
ADGM, Al Maryah Island  
Abu Dhabi, United Arab Emirates  
procurement@alwatan-swf.ae
