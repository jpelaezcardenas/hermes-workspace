# Templates Index

> Document structure scaffolds with section outlines and placeholders. Fill these in for each specific proposal. MASTER_TEMPLATE_LOCKED.docx is the canonical Word template.

17 reusable document templates for different proposal types. Each template provides a structured starting point, fill in client-specific details, pull from `reusable/` blocks, and consult `content/` for DALP knowledge.

## Template Reference

| Template | Description | Target Pages | Use When |
|----------|-------------|-------------|----------|
| `executive-summary.md` | Executive summary for any proposal | 2-3 | Every proposal |
| `company-profile.md` | SettleMint company overview | 3-4 | Every proposal |
| `technical-architecture.md` | Platform architecture, infra, security, HA/DR | 5-6 | Technical proposals, RFPs |
| `security-response.md` | Security posture, encryption, compliance certs | 4-5 | RFPs with security sections |
| `implementation-plan.md` | Phase-by-phase delivery plan with timeline | 4-5 | Technical proposals, RFPs |
| `sla-framework.md` | Support tiers, SLAs, severity definitions | 3-4 | All proposals with support sections |
| `case-studies.md` | Case study presentation template | 3-4 | RFPs, RFIs requesting references |
| `compliance-matrix.md` | Requirement compliance matrix | Varies | RFPs, questionnaires |
| `commercial-proposal.md` | Pricing, licensing, commercial terms | 5-6 | Commercial proposals |
| `full-rfp-response.md` | Master template assembling all sections | 50-80 | Full RFP responses |
| `rfi-response.md` | Complete RFI response template | 15-25 | RFI responses |
| `cover-letter.md` | Professional cover letter | 1 | Every submission |
| `risk-management.md` | Risk register and mitigation | 2-3 | RFPs requiring risk sections |
| `training-support.md` | Training program and ongoing support | 2-3 | RFPs requiring training sections |
| `technical-proposal-part1.md` | Technical proposal first half (platform, architecture) | 15-25 | Large technical proposals (split for manageability) |
| `technical-proposal-part2.md` | Technical proposal second half (implementation, operations) | 15-25 | Large technical proposals (split for manageability) |
| `uml-diagram-library.md` | Reusable UML/Mermaid diagram templates | Varies | When proposals need architecture/flow diagrams |

## Usage Notes

- **Every proposal** should include: `cover-letter.md`, `executive-summary.md`, `company-profile.md`
- **Full RFP responses** use `full-rfp-response.md` as the master template, which orchestrates the other templates into a cohesive document
- **RFI responses** use `rfi-response.md`, lighter than a full RFP but still comprehensive
- **Target Pages** are guidelines, not hard limits, adjust to match the RFP's page constraints
- Templates reference `[REUSABLE BLOCK: slug]` tags, pull content from `reusable/` when you see these
- Always check `setup/word-compatible-markdown.md` for structural rules before assembling
