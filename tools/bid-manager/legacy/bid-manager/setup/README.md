# Bid Manager Setup Files

## Overview

This folder contains the rules, guidelines, and configuration files for creating professional bid responses for SettleMint/DALP opportunities.

## File Reference

| File | Purpose | When to Use |
| --- | --- | --- |
| `writing-style.md` | Voice, tone, and language rules for all bid content | Every time you write or edit bid content |
| `ip-protection.md` | What to include/exclude to protect intellectual property | Before finalizing any bid document |
| `word-compatible-markdown.md` | Word-compatible markdown, mother format guidelines, and conversion rules | When creating or formatting documents |
| `bid-process.md` | End-to-end bid management process | Planning and managing bid responses |
| `evaluation-criteria.md` | Confidence tagging system for capability assessment | Assessing RFP requirements against DALP |
| `compliance-matrix-rules.md` | Rules for requirements traceability matrices | Building compliance matrices |
| `win-themes.md` | Reusable differentiators and key messages | Developing win strategy and writing responses |

## Quick Start

### For a New Bid Response

1. **Intake**: Read `bid-process.md` Phase 1-2
2. **Assess**: Use `evaluation-criteria.md` to tag requirements
3. **Plan**: Review `win-themes.md` for differentiators
4. **Write**: Follow `writing-style.md` rules
5. **Verify**: Check against `ip-protection.md`
6. **Format**: Apply `word-compatible-markdown.md` standards
7. **Matrix**: Build per `compliance-matrix-rules.md`

### For Compliance Matrix

1. Extract requirements from RFP
2. Assess each with confidence tags (🟢 🟡 🔴 ⚪)
3. Document in CSV format first (mother format)
4. Generate markdown table for narrative
5. Keep matrix synchronized with response text

### For Section Writing

**Always**:
- Lead with the answer
- Support with mechanism
- Close with differentiator
- Use active voice
- Cite specific standards (ERC-3643, etc.)

**Never**:
- Use numbered headings (Word handles this)
- Include em dashes or en dashes
- Use AI-tell markers ("robust", "seamless", "leverage")
- Claim roadmap items as current capabilities
- Include proprietary implementation details

## Key Principles

### Platform Only

SettleMint sells a **platform**, not consulting or custom development. All responses should emphasize:
- Configuration, not customization
- Proven capabilities, not bespoke builds
- Knowledge transfer, not dependency

### Evidence-Based Claims

Every capability claim should have:
- Specific mechanism or standard
- Quantified outcome where possible
- Reference to production proof

### Honest Assessment

Use confidence tags honestly:
- 🟢 Native: Claim confidently
- 🟡 Partial: Explain the approach
- 🔴 Gap: Acknowledge and propose alternative
- ⚪ N/A: Explain why

Never oversell partial capabilities or claim roadmap items as available.

## Cross-References

### Templates

Section templates are in `../templates/`:
- Executive summary
- Technical architecture
- Compliance and security
- Implementation methodology
- And more...

### Input/Output

- RFX documents: `../input/`
- Generated responses: `../output/`
- Both use README.md for workflow guidance

## Version Control

These setup files should be treated as canonical standards:
- Updates require review
- Changes should be communicated to bid team
- Historical bids may reference prior versions

## Support

For questions about:
- **Technical capabilities**: Consult DALP documentation or product team
- **Commercial terms**: Consult sales leadership
- **Legal/risk**: Consult legal/compliance team
- **Process**: Refer to `bid-process.md`
