# IP Protection

RFP responses must protect SettleMint intellectual property while still answering buyer requirements clearly.

## Principle

Answer the requirement. Do not expose internal implementation details that are not necessary for evaluator confidence.

## Never Share Without Explicit Approval

Do **not** include any of the following in a response unless explicit approval has been given:

### Internal names and project identifiers
- internal tool names
- internal codenames
- internal repository names when not public
- internal environment names
- internal customer-specific labels

### Internal file paths and source references
- local machine paths
- repository paths
- package paths
- module paths
- internal script names used for operations
- screenshots revealing filesystem or source layout

### Internal frameworks and implementation details beyond evaluator need
- private framework names
- internal orchestration details
- internal agent or automation names
- internal service topology that is not part of the approved architecture narrative
- low-level implementation patterns that expose proprietary design unnecessarily

### Security-sensitive details
- secrets, tokens, keys, credentials
- exact firewall rules
- exact hostnames or internal URLs
- exploit-mitigating configurations at a level that would weaken security if published
- incident details not already approved for disclosure

### Customer-sensitive information
- client names that are not approved references
- confidential deployment details
- non-public transaction volumes
- non-public architecture diagrams tied to named customers

## Safe to Share When Relevant

The following can usually be shared if accurate and approved by source material:
- platform capabilities
- supported deployment models
- supported standards and interfaces
- governance controls
- compliance mechanisms
- security control categories
- auditability, logging, and policy enforcement concepts
- public certifications or public reference information

## Response Rule

Provide the evaluator with:
1. the capability statement
2. the control or mechanism category
3. the operational implication

Do **not** provide:
1. source code
2. internal paths
3. internal toolchain naming
4. unnecessary internal architecture detail

## Red-Flag Terms to Remove Before Delivery

Check for and remove:
- home directory paths such as `~/...`
- absolute filesystem paths
- repo names that are not public
- script filenames used only for internal processing
- temporary notes such as `[TO VERIFY]`, `[ASK ENG]`, or internal reviewer instructions unless the document is explicitly an internal draft

## IP Checklist Before Sharing

- [ ] No internal file paths
- [ ] No repository/module/package names unless approved for disclosure
- [ ] No customer-confidential names or data
- [ ] No secrets, hostnames, or environment details
- [ ] No internal tool or agent names
- [ ] No roadmap claims without approval
- [ ] No source snippets or implementation details beyond what is needed
- [ ] Output reads like a client-safe document, not an internal working note
