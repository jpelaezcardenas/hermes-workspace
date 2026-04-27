# Evaluation Criteria for RFP Requirements

## Purpose

This document defines the confidence tagging system for assessing RFP requirements against DALP capabilities. Use these tags consistently across all bid responses.

## Confidence Tagging System

| Tag | Name | Meaning | Response Approach |
| --- | --- | --- | --- |
| 🟢 | **Native** | Fully supported by DALP out-of-the-box, no configuration needed | Confident compliance claim with brief explanation |
| 🟡 | **Partial/Workaround** | Substantially supported with configuration, workaround, or alternative approach | Explain the approach and any limitations |
| 🔴 | **Gap** | Not currently supported by DALP | Acknowledge gap, propose alternative, or note as out of scope |
| ⚪ | **N/A** | Requirement does not apply to platform scope | Brief explanation of why |

## Detailed Tag Definitions

### 🟢 Native Compliance

**Criteria**: The requirement is met by DALP without any configuration or customization.

**Examples**:
- EVM-compatible smart contract execution
- REST API availability
- Role-based access control
- Audit logging
- Multi-asset support

**Response Format**:
> "Yes, DALP fully supports [requirement]. The platform provides [mechanism] as a native capability."

### 🟡 Partial/Workaround Compliance

**Subcategories**:

**Configuration (CC)**: Met through platform settings, no development required
- Custom compliance rules
- Asset-specific parameters
- Workflow configurations
- Branding/white-label settings

**Integration (CI)**: Met through integration with supported third-party services
- Custody via Fireblocks or DFNS
- Identity via external KYC provider
- Payments via banking integration
- Monitoring via SIEM integration

**Alternative Approach**: Requirement interpreted differently but functional need met
- Different technical approach achieving same outcome
- Alternative workflow with equivalent result

**Response Format**:
> "DALP meets this requirement through [configuration/integration/workaround]. [Brief explanation of approach]. [Any limitations or conditions]."

### 🔴 Gap

**Types of Gaps**:

**Product Gap**: On roadmap but not yet available
- Note expected timeline if known
- Do not promise specific dates unless approved

**Architectural Gap**: Outside platform design scope
- Explain why not supported
- Suggest alternative approaches if possible

**Partner Gap**: Requires third party not currently integrated
- Note if integration is possible
- Suggest client-selected alternative

**Response Format**:
> "This specific requirement is not supported by DALP [reason/scope]. [Alternative approach if applicable]. [Timeline if on roadmap]."

### ⚪ Not Applicable

**Common N/A Cases**:
- Hardware procurement (DALP is software)
- Custom development services (platform only)
- Consulting-only engagements
- Requirements for proprietary technology not in DALP's scope

**Response Format**:
> "This requirement is not applicable to DALP as a digital asset lifecycle platform. [Brief explanation]."

## Scoring and Weighting

### Compliance Percentage Calculation

```
Total Score = (Native × 1.0) + (Partial × 0.7) + (Integration × 0.8) + (Config × 0.9)
Compliance % = Total Score / Total Requirements (excluding N/A)
```

### Mandatory vs Desirable

**Mandatory Requirements**:
- Must achieve 🟢 or 🟡 status to proceed
- 🔴 gaps may disqualify or require exception approval
- Document mitigation strategies for any gaps

**Desirable Requirements**:
- 🟢 and 🟡 strengthen the bid
- 🔴 gaps acceptable if explained
- Focus win themes on strong compliance areas

## Assessment Process

### Step 1: Requirement Extraction

1. List all requirements from RFP
2. Categorize by type (functional, technical, commercial, etc.)
3. Identify mandatory vs desirable
4. Note any interdependencies

### Step 2: Capability Mapping

For each requirement:
1. Review DALP documentation
2. Check capability mapping files
3. Verify with product experts if uncertain
4. Assign confidence tag
5. Document evidence

### Step 3: Gap Planning

For each 🔴 or 🟡 item:
1. Understand the underlying business need
2. Identify alternative approaches
3. Assess configuration options
4. Determine integration possibilities
5. Develop response strategy

### Step 4: Response Alignment

Ensure the written response:
- Accurately reflects the confidence tag
- Provides appropriate detail for the tag
- Does not oversell partial capabilities
- Explains workarounds clearly

## Common Requirement Categories

### Functional Requirements

| Requirement Type | Typical Assessment |
| --- | --- |
| Asset issuance | 🟢 Native |
| Multi-asset support | 🟢 Native (7 asset classes) |
| Compliance enforcement | 🟢 Native (ex-ante) |
| DvP settlement | 🟢 Native |
| Corporate actions | 🟢 Native |
| Investor onboarding | 🟡 Configuration |
| KYC/AML integration | 🟡 Integration |
| Reporting dashboards | 🟢 Native |

### Technical Requirements

| Requirement Type | Typical Assessment |
| --- | --- |
| EVM compatibility | 🟢 Native |
| API access | 🟢 Native (REST, GraphQL) |
| SSO integration | 🟡 Integration |
| On-prem deployment | 🟢 Native |
| Cloud deployment | 🟢 Native |
| HSM support | 🟡 Integration |
| SIEM integration | 🟡 Integration |

### Compliance Requirements

| Requirement Type | Typical Assessment |
| --- | --- |
| ERC-3643 support | 🟢 Native |
| Audit trails | 🟢 Native |
| Role-based access | 🟢 Native |
| MiCA alignment | 🟢 Native (template-based) |
| MAS alignment | 🟢 Native (template-based) |
| Specific regulatory report | 🟡 Configuration |

## Documentation Requirements

### For Each Requirement Assessment

**Required**:
- Confidence tag
- Brief capability statement
- Evidence reference (doc, code location, or expert verification)

**For Partial/Workaround**:
- Explanation of approach
- Any limitations
- Configuration/integration requirements

**For Gap**:
- Reason for gap
- Alternative approaches
- Roadmap status if applicable

### Audit Trail

Maintain records of:
- Who assessed each requirement
- Date of assessment
- DALP version referenced
- Expert consultations
- Changes to assessment over time

## Quality Checklist

- [ ] All mandatory requirements assessed
- [ ] Confidence tags applied consistently
- [ ] No overstatement of capabilities
- [ ] Workarounds explained clearly
- [ ] Gaps acknowledged with alternatives
- [ ] Assessment reviewed by product expert
- [ ] Compliance matrix matches narrative
