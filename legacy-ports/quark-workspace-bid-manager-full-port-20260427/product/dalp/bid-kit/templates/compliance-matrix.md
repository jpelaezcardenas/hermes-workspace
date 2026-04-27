# Compliance / Requirements Traceability Matrix Template

## Instructions for the Agent

This template produces a requirements compliance matrix mapping RFP requirements to DALP capabilities. Apply `rules/ip-protection.md` to all content. Apply `rules/word-compatible-markdown.md` formatting.

**Critical rule: Keep tables small.** Do NOT create one giant table with 50+ rows. Break requirements into category-level tables with 6 to 8 rows each. Place a descriptive heading between each table. This renders properly in Word and is easier for evaluators to read.

No numbered headings. No em dashes or en dashes. No AI-tell markers.

---

## Document Format

```
# Requirements Compliance Matrix

**RFP Reference:** {RFP Title and Number}
**Respondent:** SettleMint
**Date:** {YYYY-MM-DD}
```

---

## Compliance Status Key

| Status | Meaning |
| --- | --- |
| **FC** | Fully Compliant: met by current platform capabilities |
| **PC** | Partially Compliant: substantially met, minor configuration needed |
| **CC** | Compliant via Configuration: met through platform settings, no custom development |
| **CI** | Compliant via Integration: met through integration with supported third-party services |
| **RM** | Roadmap: capability on the product roadmap with defined timeline |
| **NA** | Not Applicable: requirement does not apply to the proposed solution |

---

## Matrix Format (Per Category)

Each requirement category gets its own table under an H2 heading:

```
## {Requirement Category}

| Req ID | Requirement | Status | DALP Capability | Notes |
| --- | --- | --- | --- | --- |
| {ID} | {Requirement text} | {FC/PC/CC/CI/RM/NA} | {Brief capability} | {Conditions or timeline} |
```

**Maximum 8 rows per table.** If a category has more than 8 requirements, split into sub-categories with H3 headings.

---

## Standard Requirement Categories

When the RFP does not provide a structured requirements list, organize using these H2 categories:

### Functional Requirements
- Asset issuance and lifecycle management
- Multi-asset support (specify asset types)
- Investor onboarding and KYC/AML
- Corporate actions (dividends, coupons, voting, redemptions)
- Settlement (DvP, atomic finality)
- Custody and treasury management

### Compliance and Regulatory
- Regulatory framework support (list specific regulations)
- Transfer-path compliance enforcement
- Identity verification and credential management
- Audit trail and regulatory reporting

### Security
- Multi-signature governance and RBAC
- Key management and HSM support
- Network security and monitoring
- Business continuity and disaster recovery

### Technical and Architecture
- API and integration capabilities
- Scalability and performance
- Blockchain network support
- Observability and monitoring

### Deployment and Operations
- Deployment model options
- Data residency and sovereignty
- Enterprise identity integration (SSO, MFA)
- Maintenance and upgrade procedures

### Implementation and Commercial
- Implementation timeline and methodology
- Training and knowledge transfer
- Support levels and SLAs
- Licensing model

---

## Summary Table

Include a summary at the top of the matrix after the status key:

```
## Compliance Summary

| Category | Total | FC | PC | CC | CI | RM |
| --- | --- | --- | --- | --- | --- | --- |
| Functional | {n} | {n} | {n} | {n} | {n} | {n} |
| Compliance | {n} | {n} | {n} | {n} | {n} | {n} |
| Security | {n} | {n} | {n} | {n} | {n} | {n} |
| Technical | {n} | {n} | {n} | {n} | {n} | {n} |
| Deployment | {n} | {n} | {n} | {n} | {n} | {n} |
| Commercial | {n} | {n} | {n} | {n} | {n} | {n} |
```

Note: Summary table has 6 data rows (within the 8-row limit). NA column omitted from summary for brevity.

---

## Quality Checklist

- [ ] Every RFP requirement has a corresponding row
- [ ] Status codes are honest (do not claim FC for partial capabilities)
- [ ] Notes column explains conditions, timelines, or dependencies for PC/CC/CI/RM items
- [ ] No individual table exceeds 8 rows
- [ ] No IP violations in capability descriptions
- [ ] No em dashes or en dashes
- [ ] No numbered headings
- [ ] Roadmap items include expected timeline where available
