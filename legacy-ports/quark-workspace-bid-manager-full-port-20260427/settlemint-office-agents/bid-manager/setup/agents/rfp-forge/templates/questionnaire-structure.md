# Questionnaire / Requirements Matrix Template

Use this template for structured capability assessments. The questionnaire enables apples-to-apples vendor comparison through standardized response formats and scoring.

---

## CSV Format Specification

### Column Structure

```csv
Req_ID,Category,Sub_Category,Requirement,Priority,Response_Type,Vendor_Response,Evidence_Reference,Score_Weight,Evaluator_Score,Evaluator_Notes
```

### Column Definitions

| Column | Type | Description |
|--------|------|-------------|
| `Req_ID` | String | Unique identifier (format: `[CAT]-[NNN]`, e.g., `SEC-012`) |
| `Category` | String | Top-level requirement domain |
| `Sub_Category` | String | Second-level grouping within category |
| `Requirement` | String | Specific, testable requirement statement |
| `Priority` | Enum | `Mandatory` / `Desirable` / `Nice-to-Have` |
| `Response_Type` | Enum | Expected response format (see below) |
| `Vendor_Response` | String | Vendor's answer (left blank for vendor to complete) |
| `Evidence_Reference` | String | Vendor provides reference to supporting evidence (documentation, demo, certification) |
| `Score_Weight` | Float | Weight within category (0.0–1.0, weights within each category sum to 1.0) |
| `Evaluator_Score` | Integer | Evaluator assigns score (0–5 scale, left blank) |
| `Evaluator_Notes` | String | Evaluator commentary (left blank) |

### Response Type Values

| Value | Description | Scoring |
|-------|-------------|---------|
| `Yes/No` | Binary capability question | Yes = 5, No = 0 |
| `Yes/Partial/No` | Graduated capability | Yes = 5, Partial = 3, No = 0 |
| `Yes/Roadmap/No` | Includes planned capability | Yes = 5, Roadmap = 2, No = 0 |
| `Narrative` | Free-text response required | Scored 0–5 by evaluator |
| `Numeric` | Specific metric or value | Scored against threshold by evaluator |
| `Evidence` | Certification, report, or document required | Provided = 5, Not provided = 0 |

## Standard Categories

### Category Organization

```
1. PLATFORM. Core platform capabilities
2. ASSET. Asset-specific functionality
3. INTEG. Integration and interoperability
4. SEC. Security and access control
5. COMP. Compliance and regulatory
6. OPS. Operations and support
7. PERF. Performance and scalability
8. COMM. Commercial and licensing
9. VENDOR. Vendor profile and viability
```

### Category Weights (adjust per RFP)

| Category | Default Weight | Description |
|----------|---------------|-------------|
| PLATFORM | 15% | Core platform capabilities |
| ASSET | 20% | Asset lifecycle and domain functionality |
| INTEG | 10% | Integration with existing infrastructure |
| SEC | 15% | Security, key management, access control |
| COMP | 15% | Regulatory compliance, reporting, audit |
| OPS | 5% | Monitoring, support, operational excellence |
| PERF | 5% | Performance benchmarks, scalability |
| COMM | 10% | Pricing, licensing, TCO |
| VENDOR | 5% | Company stability, references, team |

## Example Requirements by Category

### PLATFORM: Core Platform

```csv
PLAT-001,PLATFORM,Architecture,The platform supports multi-tenant deployment with logical data isolation between tenants,Mandatory,Yes/No,,,,
PLAT-002,PLATFORM,Architecture,The platform can be deployed in private cloud (AWS/Azure/GCP) within the client's own tenancy,Mandatory,Yes/Partial/No,,,,
PLAT-003,PLATFORM,Architecture,The platform provides a web-based administration console for platform management,Desirable,Yes/No,,,,
PLAT-004,PLATFORM,Deployment,The vendor provides infrastructure-as-code templates for automated deployment,Desirable,Yes/Roadmap/No,,,,
```

### SEC: Security

```csv
SEC-001,SEC,Certification,The vendor holds ISO 27001 certification, provide certificate,Mandatory,Evidence,,,,
SEC-002,SEC,Certification,The vendor has completed SOC 2 Type II audit within the last 12 months, provide report,Mandatory,Evidence,,,,
SEC-003,SEC,Key Management,Private keys are stored in FIPS 140-2 Level 3 (or higher) certified HSMs,Mandatory,Yes/No,,,,
SEC-004,SEC,Access Control,The platform supports role-based access control with configurable permission sets,Mandatory,Yes/Partial/No,,,,
SEC-005,SEC,Encryption,All data at rest is encrypted using AES-256 or equivalent,Mandatory,Yes/No,,,,
```

### COMP: Compliance

```csv
COMP-001,COMP,Regulatory,The platform supports generation of regulatory reports for [specific framework],Mandatory,Yes/Partial/No,,,,
COMP-002,COMP,AML,The platform integrates with third-party AML/sanctions screening providers,Mandatory,Yes/No,,,,
COMP-003,COMP,Audit,The platform maintains immutable audit logs for all user actions and system events,Mandatory,Yes/No,,,,
COMP-004,COMP,Data Protection,The vendor can confirm data residency within [specified geography],Mandatory,Narrative,,,,
```

## Scoring Methodology

### Individual Requirement Scoring

```
Requirement Score = Evaluator_Score × Score_Weight
```

### Category Scoring

```
Category Score = Σ (Requirement Scores within category)
Normalized Category Score = Category Score / Max Possible Category Score × 100
```

### Overall Scoring

```
Overall Score = Σ (Normalized Category Score × Category Weight)
```

### Mandatory Requirement Handling

- Any `Mandatory` requirement scored `0` = automatic disqualification
- Disqualification triggers review by evaluation panel chair before finalization
- Vendor may be given one opportunity to clarify before disqualification is confirmed

## Companion Documents

Every questionnaire ships with:

1. **Scoring Methodology Guide** (this document, adapted), explains to vendors how they will be scored
2. **Response Instructions**: tells vendors how to fill in the CSV (do not modify columns, provide evidence references, etc.)
3. **Blank Evaluation Scorecard**: for internal evaluator use, pre-populated with weights and formulas
