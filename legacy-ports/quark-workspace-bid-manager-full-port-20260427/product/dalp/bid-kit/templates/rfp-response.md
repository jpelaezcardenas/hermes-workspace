# RFP/RFI Response Template

## Instructions for the Agent

This template governs the format of individual RFP/RFI question responses. Load and apply `rules/writing-style.md`, `rules/ip-protection.md`, and `rules/word-compatible-markdown.md` for every answer. Remember: no em dashes, no en dashes, no numbered headings, no AI-tell markers. Write as a senior blockchain solution architect.

## Single Question Format

```
### Q{number}: {Original question text}

**Response:**

{Direct answer in 1 to 2 sentences. Lead with "Yes," "No," or the key fact.}

{Supporting detail in 2 to 5 sentences. Mechanism, standards referenced, or architectural approach. Use specific terms: ERC-3643, OnchainID, SMART Protocol, DvP. No vague claims.}

{Differentiating statement if applicable. What makes DALP's approach distinct from typical solutions. Keep it factual.}

{Standard or regulation reference if the question relates to compliance: "This aligns with [standard/regulation] requirements for [specific obligation]."}
```

## Batch Response Format (Multiple Questions)

When answering a set of RFP questions, produce a single document:

```
# RFP Response for {Client Name / RFP Title}

**Respondent:** SettleMint
**Date:** {YYYY-MM-DD}
**Document Reference:** {RFP reference number if provided}

---

## {Section Title from RFP}

### Q{number}: {Original question text}

**Response:**

{Answer following single question format above.}

---

## {Next Section Title}

### Q{number}: {Next question}

...
```

Note: Section headings are unnumbered. Word generates numbers automatically from H1/H2/H3 hierarchy.

## Answer Length Guidelines

| Question Type | Target Length |
| --- | --- |
| Yes/No capability questions | 2 to 4 sentences |
| "Describe how" questions | 4 to 8 sentences (about half a page) |
| "Explain your approach" questions | 8 to 15 sentences (about one page) |
| Architecture or security deep dives | 1 to 2 pages with H3 subsections |

## Reference Mapping

Use this to determine which reference docs to load for each question type:

| Question Category | Primary Reference | Secondary Reference |
| --- | --- | --- |
| Platform overview / capabilities | product-overview.md | differentiators.md |
| Asset types / use cases | asset-classes.md | use-cases-projects.md |
| Compliance / regulatory | compliance-security.md | asset-classes.md |
| Security / custody / key management | compliance-security.md | architecture-public.md |
| Architecture / scalability | architecture-public.md | integration-deployment.md |
| Integration / APIs / deployment | integration-deployment.md | architecture-public.md |
| Company background / experience | company-profile.md | use-cases-projects.md |
| Market positioning / differentiators | differentiators.md | market-context.md |
| Implementation / timeline | integration-deployment.md | company-profile.md |
| Past projects / references | use-cases-projects.md | company-profile.md |

## Quality Checklist (Per Answer)

Before finalizing each answer:

- [ ] First sentence directly answers the question
- [ ] Specific mechanisms or standards are cited (not vague claims)
- [ ] Reads like a senior architect explaining, not a marketing brochure
- [ ] No IP violations per `rules/ip-protection.md`
- [ ] No em dashes or en dashes
- [ ] No AI-tell markers (no "certainly," "robust," "leverage," "seamless," etc.)
- [ ] Length is appropriate for the question type
- [ ] Markdown has no numbered headings (Word auto-numbers)
