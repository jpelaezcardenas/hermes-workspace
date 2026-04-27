# Compliance Matrix Rules

## Purpose

A compliance matrix maps every requirement from the RFP/RFI to a status and evidence. It's often the most scrutinized document in a bid, evaluators use it to score compliance before reading narrative sections.

## Standard Column Structure

| Column | Description | Required |
|--------|-------------|----------|
| **Req ID** | The requirement identifier from the RFP (e.g., "3.2.1", "SEC-007") | Yes |
| **Requirement** | Full text of the requirement (quoted from the RFP) | Yes |
| **Category** | Functional grouping (Security, Compliance, Integration, etc.) | Yes |
| **Status** | Compliance status (see values below) | Yes |
| **DALP Capability** | The specific feature or component that addresses this | Yes |
| **Evidence** | Reference to documentation, content section, or deployment | Yes |
| **Notes** | Additional context, caveats, or timeline for roadmap items | Optional |

## Status Values

Use exactly these four values, no variations:

| Status | Definition | When to Use |
|--------|-----------|-------------|
| **Compliant** | DALP fully meets this requirement today | Feature is shipped, documented, and available in the current release |
| **Partial** | DALP partially addresses this requirement | Some aspects are covered, others require configuration, workaround, or are limited in scope. Always explain what's covered and what's not. |
| **Roadmap** | This capability is planned but not yet available | Feature is on the product roadmap. Include expected timeline if confirmed with product team. Never present as current capability. |
| **Not Supported** | DALP does not address this requirement | Be honest. Don't spin it. If there's an alternative approach, mention it in Notes. |

## Rules for Status Assignment

### Compliant
- Must be verifiable in current product documentation or codebase
- Must not require custom development to achieve
- Configuration and setup are acceptable, custom code is not
- If the requirement can be met through DALP's configurable features, it's Compliant

### Partial
- Use when DALP covers the core intent but not every specific detail
- Always specify in Notes: "Covers [X, Y]. Does not cover [Z]."
- If a third-party integration is needed to complete the requirement, it's Partial
- If the requirement is met for some asset types but not all, it's Partial

### Roadmap
- Only use when the feature is confirmed on the product roadmap
- Include timeline: "Expected Q3 2026" or "Under active development"
- If no confirmed timeline exists, use "Not Supported" with a note: "Under consideration"
- Never use Roadmap to soften a Not Supported, that's dishonest

### Not Supported
- Use when DALP genuinely does not and will not address this requirement
- Don't apologize, state it factually
- If there's a valid alternative approach or partner solution, mention it in Notes
- It's better to have 3 honest "Not Supported" items than to stretch Partial across 10

## Evidence Standards

Evidence must be specific and traceable:

| ✅ Good Evidence | ❌ Bad Evidence |
|-----------------|----------------|
| "DALP RBAC module, see content/04-access-control-permissions/" | "Platform supports this" |
| "ERC-3643 smart contract set with configurable transfer rules" | "Compliant with industry standards" |
| "REST API with webhook notifications, see integration docs" | "API available" |
| "Deployed at [anonymized client] processing live transactions since 2024" | "Proven in production" |

## CSV Format

For the canonical CSV file, use this header:

```csv
req_id,requirement,category,status,dalp_capability,evidence,notes
```

- Quote all text fields containing commas
- Use UTF-8 encoding
- One row per requirement, never merge requirements

## Presentation in Markdown

For the narrative compliance matrix (.md), use the requirement-response format:

```markdown
### Requirement [X.Y]: [Title]

> **Requirement:** [Quoted text from RFP]

**Status:** Compliant ✅

**DALP Capability:** [Feature/component name]

**Evidence:** [Specific reference]

**Notes:** [Any additional context]
```

## Common Mistakes to Avoid

1. **Generous compliance**: Marking Partial as Compliant to inflate the score. Evaluators see through this.
2. **Vague evidence**: "The platform supports this" is not evidence. Name the specific feature.
3. **Missing requirements**: Every requirement must have a row. Missing = assumed Not Supported.
4. **Inconsistent statuses**: Same capability marked differently in different rows. Be consistent.
5. **Roadmap as current**: Claiming Compliant for features that are only planned. This is a credibility killer.
