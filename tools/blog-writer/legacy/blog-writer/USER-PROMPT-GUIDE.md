---
title: "USER-PROMPT-GUIDE.md - How to Use BlogWriter"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.650413Z
---

# USER-PROMPT-GUIDE.md - How to Use BlogWriter

## Quick Start

Tag Quark in Slack with your request. Quark will spawn BlogWriter and report back.

---

## Rewrite an Existing Article

```
Rewrite this article for SEO and DALP positioning:
URL: https://www.settlemint.com/insights/[slug]
Deliver to Notion: https://www.notion.so/settlemint/[page]
```

BlogWriter will:
- Fetch the original
- Assess whether the topic angle is ownable for SettleMint
- Rewrite with full SEO structure
- Self-critique and fix
- Push to Notion with internal links and external citations
- Update HubSpot meta title, meta description, and schema markup

---

## Write a New Article

```
Write a new article on [topic] targeting [keyword].
Deliver to Notion: [page ID or URL]
```

---

## Expand an Existing Article

```
Expand article [Notion URL] — it's too short. Add [specific sections or just "whatever is missing"].
Self-critique and deliver the final version.
```

---

## Just Self-Critique and Fix

```
Read article [Notion URL], apply a full self-critique, fix all issues, deliver the best version you can.
```

---

## What BlogWriter Will Always Do

- Keep the article in the 1,800-2,200 word range for competitive topics
- Add or verify the FAQ section (5-7 questions, new angles not body paraphrase)
- Link internal SettleMint pages on first occurrence of key phrases
- Link all statistics to their external sources
- Update meta title and meta description in HubSpot
- Inject FAQPage + Article JSON-LD schema
- Add "Last updated: [Month Year]" at the top
- Run a self-critique before delivery and fix everything found

---

## What BlogWriter Will Never Do

- Speculate about DALP capabilities
- Use em dashes (—)
- Use banned phrases (production-grade, enterprise-grade, pilot to production, etc.)
- Name competitors
- Claim non-EVM blockchain support
- Deliver a first draft without self-critique
- Skip internal links
- Leave statistics without sources
