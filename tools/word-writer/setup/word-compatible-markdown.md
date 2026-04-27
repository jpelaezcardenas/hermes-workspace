---
title: "Word-Compatible Markdown"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.919748Z
---

# Word-Compatible Markdown

## Mandatory
- Unnumbered headings only
- `#` through `####` only
- `**bold**` only
- `*italic*` only
- simple pipe tables only
- `---` only when you truly want a page break in full documents
- Mermaid fenced blocks are allowed
- standard image syntax is allowed

## Avoid
- HTML
- MDX/JSX
- frontmatter
- oversized code blocks
- nested formatting gymnastics
- giant tables
- manual numbering in headings

## Practical guidance
- Keep each heading meaningful.
- Prefer short paragraphs.
- Split dense material into sections.
- If a table becomes hard to scan, break it into two tables.
- Keep image references relative to the markdown file when possible.
- Write captions as normal paragraphs, not custom HTML.
