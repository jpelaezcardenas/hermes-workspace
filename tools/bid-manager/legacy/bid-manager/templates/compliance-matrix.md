# Compliance Matrix

> **Target length:** Varies (depends on number of RFP requirements)
> **When to use:** Any RFP/RFI that provides a numbered list of requirements and expects a point-by-point compliance response.
> **DALP sources:** Capability-mapping files, product documentation, architecture docs
> **Format note:** This is typically delivered as a spreadsheet/table. The markdown version serves as a draft; export to Excel/CSV for final submission if required.

---

## 1. Compliance Status Definitions

Use these status codes consistently throughout the matrix:

| Status | Code | Definition | Color |
|--------|------|------------|-------|
| **Fully Compliant** | ✅ FC | DALP meets the requirement out-of-the-box with standard platform capabilities. No customization required. | Green |
| **Partially Compliant** | 🟡 PC | DALP meets the core intent of the requirement but may need minor configuration, an integration, or a workaround. Explain the gap and approach in Notes. | Yellow |
| **Compliant with Customization** | 🔧 CC | DALP can meet the requirement through configuration, custom workflow setup, or supported extension mechanisms. Not out-of-the-box but achievable within the platform. | Blue |
| **Compliant via Integration** | 🔗 CI | Requirement is met through integration with a third-party service or client system. DALP provides the integration point. | Blue |
| **Roadmap** | 🗓️ RM | Capability is on the DALP product roadmap with an expected delivery date. State the expected timeline. | Orange |
| **Not Compliant** | ❌ NC | DALP does not currently meet this requirement and it is not on the near-term roadmap. | Red |
| **Not Applicable** | ➖ N/A | Requirement does not apply to the proposed solution scope. Explain why. | Grey |

> **Critical rule:** NEVER mark a requirement as FC or PC unless it is verified against actual DALP capabilities. When in doubt, mark as PC with a note explaining what needs verification. Overstating compliance is worse than understating it.

---

## 2. Formatting Rules

1. **Req ID**: Use the client's requirement numbering exactly as provided in the RFP
2. **Requirement Description**: Quote or closely paraphrase the client's language. Do not editorialize.
3. **Compliance Status**: Use one of the defined codes above
4. **DALP Capability**: Name the specific DALP feature, module, or component that addresses the requirement
5. **Evidence / Reference**: Point to documentation, architecture section, or demo that proves compliance
6. **Notes**: Explain any caveats, assumptions, approach for partial compliance, or additional context
7. **Keep it honest**: If the answer is NC, say so. Clients respect honesty; they do not respect discovering gaps post-award.

---

## 3. Compliance Matrix

### Section: [RFP Section Name: e.g., "Functional Requirements"]

| Req ID | Requirement Description | Status | DALP Capability | Evidence / Reference | Notes |
|--------|------------------------|--------|-----------------|---------------------|-------|
| [FR-001] | [Paste or paraphrase the requirement text from the RFP] | [✅ FC] | [e.g., Asset Issuance Module, supports ERC-20, ERC-721, ERC-1400 token standards] | [e.g., Architecture docs §3.2; Demo scenario A1] | [Any caveats or additional context] |
| [FR-002] | [Requirement text] | [🟡 PC] | [DALP capability] | [Reference] | [e.g., "Supports the core workflow. Custom reporting format would require configuration during implementation."] |
| [FR-003] | [Requirement text] | [🔗 CI] | [Integration capability] | [Reference] | [e.g., "KYC verification handled via API integration with client's existing provider (Onfido, Jumio, etc.)"] |
| [FR-004] | [Requirement text] | [❌ NC] | [-] | [-] | [e.g., "DALP does not currently support X. Alternative approach: Y."] |
| [FR-005] | [Requirement text] | [🗓️ RM] | [Planned capability] | [Roadmap reference] | [e.g., "Expected in Q3 2026 release. Interim workaround: Z."] |

### Section: [RFP Section Name: e.g., "Technical Requirements"]

| Req ID | Requirement Description | Status | DALP Capability | Evidence / Reference | Notes |
|--------|------------------------|--------|-----------------|---------------------|-------|
| [TR-001] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |
| [TR-002] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |
| [TR-003] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |

### Section: [RFP Section Name: e.g., "Security Requirements"]

| Req ID | Requirement Description | Status | DALP Capability | Evidence / Reference | Notes |
|--------|------------------------|--------|-----------------|---------------------|-------|
| [SR-001] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |
| [SR-002] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |

### Section: [RFP Section Name: e.g., "Operational Requirements"]

| Req ID | Requirement Description | Status | DALP Capability | Evidence / Reference | Notes |
|--------|------------------------|--------|-----------------|---------------------|-------|
| [OR-001] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |
| [OR-002] | [Requirement text] | [Status] | [Capability] | [Reference] | [Notes] |

---

## 4. Compliance Summary

| Section | Total Reqs | ✅ FC | 🟡 PC | 🔧 CC | 🔗 CI | 🗓️ RM | ❌ NC | ➖ N/A |
|---------|-----------|-------|-------|-------|-------|--------|-------|--------|
| Functional | [n] | [n] | [n] | [n] | [n] | [n] | [n] | [n] |
| Technical | [n] | [n] | [n] | [n] | [n] | [n] | [n] | [n] |
| Security | [n] | [n] | [n] | [n] | [n] | [n] | [n] | [n] |
| Operational | [n] | [n] | [n] | [n] | [n] | [n] | [n] | [n] |
| **Total** | **[n]** | **[n]** | **[n]** | **[n]** | **[n]** | **[n]** | **[n]** | **[n]** |
| **% of Total** | **100%** | **[%]** | **[%]** | **[%]** | **[%]** | **[%]** | **[%]** | **[%]** |

> **Guidance:** Aim for >80% FC+PC combined. If below that threshold, discuss with the bid team whether to proceed or no-bid. A matrix with too many NC entries signals poor fit.

---

## 5. Process for Completing the Matrix

1. **Extract requirements**: Copy all numbered requirements from the RFP into the Req ID and Description columns
2. **Categorize**: Group by section (functional, technical, security, operational, or the client's own categories)
3. **Assess each requirement**: Check DALP capability-mapping docs and product documentation
4. **Verify uncertain items**: Anything you're not sure about → check the codebase at `~/dalp` or mark as PC with a verification note
5. **Review with technical team**: Have a DALP engineer validate all FC and PC claims
6. **Review with commercial team**: Ensure CC and CI items are reflected in effort/pricing
7. **Final review**: Bid manager validates consistency, completeness, and honesty

---

> **Final checklist:**
> - [ ] All RFP requirements are captured (none missed)
> - [ ] Status codes used consistently per definitions above
> - [ ] Every PC, CC, CI, and RM has an explanatory note
> - [ ] Every NC has an alternative approach or honest acknowledgment
> - [ ] Summary statistics are accurate and up to date
> - [ ] Technical team has validated all compliance claims
> - [ ] No capability has been overstated, verify against actual DALP code/docs
> - [ ] Export to Excel/CSV if the RFP requires that format
