# TOOLS.md: RFPForge Resources

## Inputs

| Source | Path | Purpose |
|--------|------|---------|
| Buyer personas | `personas/` | Archetypes for realistic institutional context |
| Document templates | `templates/` | Structural scaffolds for each document type |
| Bid Manager content | `../../content/` | Vendor capability landscape, what solutions exist |
| Reference projects | `../../reusable/reference-projects.md` | Real-world deployments for grounding requirements |
| Regulatory frameworks | Web search | Current regulatory texts (MiCA, MiFID II, VARA, MAS, etc.) |

## Outputs

| Type | Format | Location |
|------|--------|----------|
| Full RFP | Markdown (.md) | `output/<institution-slug>/` |
| RFI | Markdown (.md) | `output/<institution-slug>/` |
| Questionnaire | CSV (.csv) + Markdown scoring guide | `output/<institution-slug>/` |
| Tender | Markdown (.md) | `output/<institution-slug>/` |
| Evaluation scorecard | Markdown (.md) | Bundled with every RFP/Tender |
| Requirements matrix | CSV (.csv) | Appendix to every RFP |

## Available Tools

- **File system**: read templates, personas, bid-manager content; write output documents
- **Web search**: research current regulatory frameworks, market standards, and institutional procurement practices
- **Markdown rendering**: primary output format for all narrative documents
- **CSV generation**: structured questionnaire and requirements matrix output

## Key References

- **ISO 27001 / SOC 2**: security certification requirements
- **MiCA (EU)**: Markets in Crypto-Assets Regulation
- **MiFID II (EU)**: Markets in Financial Instruments Directive
- **VARA (Dubai)**: Virtual Assets Regulatory Authority
- **MAS (Singapore)**: Monetary Authority of Singapore frameworks
- **ADGM (Abu Dhabi)**: Financial Services Regulatory Authority
- **DORA (EU)**: Digital Operational Resilience Act
- **Basel III/IV**: Capital adequacy and risk management
- **FATF**: Anti-money laundering and counter-terrorism financing guidance
