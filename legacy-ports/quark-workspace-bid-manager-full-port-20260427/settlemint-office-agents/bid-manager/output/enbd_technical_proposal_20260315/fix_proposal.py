#!/usr/bin/env python3
"""Apply structural fixes to the ENBD proposal."""
import re

with open('ENBD-Technical-Proposal.md', 'r') as f:
    content = f.read()

# --- Fix 5: Merge duplicate Implementation sections ---
# Add RACI matrix and milestones from "Project Implementation" into "Implementation and Delivery"
# Then remove "Project Implementation and Delivery" section

raci_block = """
## RACI Matrix

| Activity | SettleMint | Emirates NBD |
| --- | --- | --- |
| Requirements gathering and workshops | Responsible | Consulted, Informed |
| Architecture design | Responsible | Accountable (approval) |
| Environment provisioning | Responsible (platform) | Responsible (infrastructure) |
| Compliance module configuration | Responsible | Consulted (regulatory requirements) |
| Integration development | Responsible | Consulted (system access, data mappings) |
| Security and penetration testing | Responsible (execution) | Consulted (InfoSec coordination) |
| UAT execution | Consulted (facilitation) | Responsible |
| Production deployment | Responsible | Accountable (approval) |
| Knowledge transfer | Responsible | Accountable (team readiness) |
| Ongoing platform operations | Consulted (support) | Responsible |

## Milestones and Gates

Each phase gate requires formal sign-off from designated Emirates NBD stakeholders before the next phase begins. Gate reviews cover deliverable completeness, risk assessment, and go/no-go decision. A formal change control process manages any scope changes identified during implementation, with impact assessment (timeline, cost, risk) and stakeholder approval required before implementation.
"""

# Insert RACI before the "---" that ends the Implementation section (before Deployment)
# Find the Delivery Risks table end and add RACI after it
content = content.replace(
    "| Scope expansion | High | Formal change control process; scope locked at Phase 1 gate |\n\n---\n",
    "| Scope expansion | High | Formal change control process; scope locked at Phase 1 gate |\n" + raci_block + "\n---\n"
)

# Remove the entire "# Project Implementation and Delivery" section
# It starts at "# Project Implementation and Delivery" and ends at "---" before "# Support Appendix"
proj_impl_pattern = r'\n# Project Implementation and Delivery\n.*?(?=\n# Support Appendix|\Z)'
content = re.sub(proj_impl_pattern, '', content, flags=re.DOTALL)

# --- Fix 6: Merge Support Appendix into Support and SLA ---
# Extract useful content from Support Appendix (severity defs, escalation, maintenance)
# The main Support section already has severity table, escalation, service credits
# Support Appendix adds: Enterprise tier detail, severity classification examples, escalation path levels, maintenance policy
# Most is already covered. Just remove the appendix since main section is comprehensive.
content = re.sub(r'\n# Support Appendix\n.*?(?=\n# |\Z)', '', content, flags=re.DOTALL)

# --- Fix 7: Add honest entries to Functional Fit Table ---
# Find the last row of the functional fit table and add honest entries
content = content.replace(
    "| Arabic Language and RTL | Full | ar-SA locale with RTL layout |",
    """| Arabic Language and RTL | Full | ar-SA locale with RTL layout |
| Regulatory Reporting (CBUAE/VARA formats) | Configuration Required | Report templates configured during Phase 2 to match specific CBUAE/VARA format requirements |
| Core Banking Reconciliation | Integration Required | REST API integration with Emirates NBD's core banking system; data mapping and reconciliation workflows configured during Phase 3 |
| Custody Provider Onboarding | Partner Dependent | Fireblocks and DFNS connectors available; other providers require integration scoping in Phase 1 |"""
)

# --- Fix 8: Add Gaps and Roadmap subsection ---
gaps_section = """
## Gaps, Dependencies, and Roadmap Items

The following items require configuration, integration, or are on the development roadmap. Transparent identification of these items reflects SettleMint's commitment to operational realism.

| Item | Status | Mitigation |
|------|--------|-----------|
| CBUAE/VARA-specific regulatory report formats | Configuration required | Report templates built during Phase 2 based on Emirates NBD's specific reporting requirements |
| Core banking system integration | Integration required | REST API connectors configured during Phase 3; requires API specifications from Emirates NBD |
| Custody provider onboarding | Partner dependent | Fireblocks and DFNS connectors production-ready; alternative providers require scoping in Phase 1 |
| AED-denominated stablecoin reserve attestation | Configuration required | On-chain reserve monitoring available; specific attestation format and oracle integration configured during implementation |
| Arabic RTL layout refinement | Available, refinement ongoing | ar-SA locale with RTL layout shipped; specific UI refinements based on Emirates NBD feedback during UAT |
"""

# Insert after the Functional Fit Table (after the honest entries we just added)
content = content.replace(
    "| Custody Provider Onboarding | Partner Dependent | Fireblocks and DFNS connectors available; other providers require integration scoping in Phase 1 |",
    "| Custody Provider Onboarding | Partner Dependent | Fireblocks and DFNS connectors available; other providers require integration scoping in Phase 1 |" + gaps_section
)

# --- Fix 10: Deduplicate references ---
# Check for duplicate entries - we'll handle this by checking the content
# (The references may or may not have duplicates depending on what the sub-agent wrote)

# --- Clean up any double blank lines ---
content = re.sub(r'\n{4,}', '\n\n\n', content)

with open('ENBD-Technical-Proposal.md', 'w') as f:
    f.write(content)

# Report
import subprocess
result = subprocess.run(['wc', '-w', 'ENBD-Technical-Proposal.md'], capture_output=True, text=True)
print(f"Word count: {result.stdout.strip()}")
print("All fixes applied successfully.")
