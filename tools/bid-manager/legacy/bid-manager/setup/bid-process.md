# Bid Management Process

> **Scope**: This document describes the **human-side** bid management process: triage decisions, review cycles, stakeholder coordination, and submission logistics. For the **autonomous agent pipeline** (detection → ingestion → assembly → output), see `PROCESS.md` at the bid-manager root or `workflow/processing-pipeline.md` for technical details.

## Overview

This document defines the end-to-end human process for managing RFX (RFP/RFI/RFQ) opportunities from intake through submission.

## Phase 1: Intake and Triage

### 1.1 Document Receipt

**Trigger**: RFX document received from client or procurement portal

**Actions**:
1. Save document to `/input/` folder with naming convention: `{client}-{type}-{date}.{ext}`
2. Log opportunity in tracking system
3. Assign bid manager/owner
4. Note submission deadline and format requirements

**Outputs**:
- Document stored in input folder
- Opportunity logged
- Initial deadline assessment

### 1.2 Initial Triage

**Objective**: Determine whether to pursue the opportunity

**Assessment Criteria**:
- Strategic fit with SettleMint focus areas
- Client profile (tier, sector, geography)
- Competition likelihood
- Timeline feasibility
- Resource availability

**Decision Points**:
- **Go**: Proceed to analysis phase
- **No-Go**: Decline with courtesy response
- **Clarify**: Request additional information before deciding

**Time Allocation**: 30 minutes to 2 hours

## Phase 2: Requirements Analysis

### 2.1 Document Parsing

**Objective**: Extract and structure all requirements from the RFX

**Actions**:
1. Identify all mandatory requirements
2. Identify all desirable requirements
3. Note evaluation criteria and weightings
4. Extract submission format requirements
5. Document clarification questions

**Tools**:
- Requirements checklist
- Compliance matrix template
- Gap assessment worksheet

### 2.2 Capability Mapping

**Objective**: Map each requirement to DALP capabilities

**Process**:
1. For each requirement, assess DALP fit using confidence tags:
   - 🟢 Native: Fully supported by DALP out-of-the-box
   - 🟡 Partial/Workaround: Supported with configuration or workaround
   - 🔴 Gap: Not currently supported
   - ⚪ N/A: Does not apply to platform scope

2. Document evidence for each capability claim
3. Identify configuration or integration needs
4. Flag requirements requiring clarification

**Outputs**:
- Completed compliance matrix
- Gap analysis report
- Clarification questions list

**Time Allocation**: 4 to 8 hours depending on complexity

## Phase 3: Gap Assessment and Strategy

### 3.1 Gap Analysis

**Objective**: Identify and plan for capability gaps

**Gap Categories**:
- **Configuration gap**: Can be addressed through platform settings
- **Integration gap**: Requires third-party integration
- **Product gap**: Capability not yet available
- **Scope gap**: Outside platform scope (may require partner)

**Response Options**:
- Address through configuration
- Propose integration approach
- Note as future roadmap item (with timeline if known)
- Position as out of scope with explanation
- Partner with third party

### 3.2 Win Strategy Development

**Objective**: Define the compelling reason for client to select SettleMint

**Elements**:
1. **Win Themes**: 3 to 5 key messages that differentiate SettleMint
2. **Value Proposition**: Quantified benefits for this specific client
3. **Proof Points**: References, case studies, metrics relevant to this sector
4. **Risk Mitigation**: How SettleMint reduces client risk

**Alignment Check**:
- Do win themes address client priorities?
- Is the value proposition specific and credible?
- Are proof points relevant and recent?

## Phase 4: Response Drafting

### 4.1 Content Planning

**Objective**: Structure the response document

**Deliverables to Plan**:
- Executive summary
- Technical proposal
- Compliance matrix
- Commercial proposal
- Appendices (case studies, certifications, etc.)

**Assignment**:
- Assign sections to subject matter experts
- Set internal deadlines (allow time for review)
- Identify sections requiring legal/compliance review

### 4.2 Drafting

**Writing Standards** (per `/setup/writing-style.md`):
- Lead with the answer
- Support with mechanism
- Close with differentiator
- No AI-tell markers
- Active voice
- Specific, not vague

**Quality Checklist per Section**:
- [ ] Addresses all requirements in scope
- [ ] Follows writing style rules
- [ ] No IP violations
- [ ] Proper formatting (no numbered headings)
- [ ] Evidence-based claims
- [ ] Appropriate length for content type

**Tools**:
- Section templates from `/templates/`
- Capability reference docs
- Previous bid examples (where relevant)

### 4.3 Compliance Matrix Completion

**Process**:
1. Transfer requirements from analysis phase
2. Update status based on final response content
3. Ensure traceability (every requirement addressed somewhere)
4. Add notes for partial compliance items

**Format**: CSV as mother format, markdown for presentation

## Phase 5: Review and Refinement

### 5.1 Technical Review

**Reviewers**: Solution architects, product experts

**Focus**:
- Technical accuracy of claims
- Capability alignment
- Architecture descriptions
- Integration approaches

### 5.2 Commercial Review

**Reviewers**: Sales, legal, finance

**Focus**:
- Pricing accuracy and approval
- Terms and conditions
- Risk allocation
- Commercial assumptions

### 5.3 Editorial Review

**Reviewers**: Bid manager, technical writer

**Focus**:
- Writing style consistency
- Formatting compliance
- Completeness against requirements
- Flow and readability

### 5.4 Legal/Compliance Review

**Reviewers**: Legal, compliance officers (as needed)

**Focus**:
- Regulatory claims
- IP protection compliance
- Confidentiality markings
- Binding commitments

## Phase 6: Production and Submission

### 6.1 Document Production

**Process**:
1. Finalize markdown sources
2. Generate Word derivatives using `scripts/markdown_to_docx.py`
3. Apply corporate templates and formatting
4. Generate final compliance matrix
5. Compile all required attachments

**Quality Checks**:
- [ ] All sections complete
- [ ] Table of contents generated
- [ ] Page numbering correct
- [ ] Cross-references working
- [ ] Confidentiality markings applied
- [ ] Signatures and approvals obtained

### 6.2 Submission

**Pre-submission Checklist**:
- [ ] Submission format confirmed (portal, email, physical)
- [ ] Deadline confirmed with timezone
- [ ] All mandatory documents included
- [ ] File naming meets client requirements
- [ ] File sizes within limits
- [ ] Submission account/access confirmed

**Submission**:
- Submit per client instructions
- Obtain delivery confirmation
- Save submission receipt/confirmation

## Phase 7: Post-Submission

### 7.1 Clarifications

**Objective**: Respond to client questions during evaluation

**Process**:
1. Track all clarification requests
2. Coordinate internal response drafting
3. Maintain consistency with original submission
4. Submit within deadline

### 7.2 Presentation/Oral Proposal (if required)

**Preparation**:
- Develop presentation materials
- Assign presenters
- Conduct dry runs
- Prepare for Q&A

### 7.3 Win/Loss Analysis

**Objective**: Learn from outcome

**If Won**:
- Document win factors
- Transition to delivery team
- Archive bid for future reference

**If Lost**:
- Request debrief/feedback
- Document loss factors
- Update bid library with lessons learned

## Timeline Planning

| Phase | Typical Duration | Notes |
| --- | --- | --- |
| Intake and Triage | 1 to 2 days | Quick decision point |
| Requirements Analysis | 2 to 5 days | Depends on RFX length |
| Gap Assessment | 1 to 3 days | May run parallel with analysis |
| Response Drafting | 5 to 15 days | Major time investment |
| Review and Refinement | 3 to 7 days | Multiple review cycles |
| Production | 1 to 3 days | Final formatting and assembly |
| **Total (typical)** | **15 to 30 days** | Varies by complexity |

**Rush Process** (1 to 2 weeks):
- Condense drafting to 3 to 5 days
- Parallel review tracks
- Reduced scope/focus on win themes
- Executive approval for shortcuts

## Tools and Templates

**Location**: `/setup/` and `/templates/`

- Writing style guide
- IP protection rules
- Formatting rules
- Evaluation criteria with confidence tags
- Compliance matrix rules
- Section templates
- Win themes reference

## Roles and Responsibilities

| Role | Responsibilities |
| --- | --- |
| Bid Manager | Overall coordination, timeline, quality |
| Solution Architect | Technical content, architecture descriptions |
| Sales Lead | Commercial terms, client relationship, win strategy |
| Product Expert | Capability verification, roadmap items |
| Legal/Compliance | Risk review, regulatory claims |
| Executive Sponsor | Final approval, exception decisions |
