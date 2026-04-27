# Translation Guide

## Supported Languages

| Language | Script | Layout | Register | Status |
|---|---|---|---|---|
| Arabic | Arabic script | RTL (right-to-left) | فصحى (Modern Standard Arabic) | Production |
| Japanese | CJK | LTR | です/ます (formal polite) | Production |
| Hindi | Devanagari | LTR | Formal institutional | Production |

## Translation Rules

### All Languages
- Technical terms stay in English: DALP, SettleMint, ERC-3643, T-REX, EVM, OnchainID, UUPS, API, SDK, CLI, REST, webhook, DvP, KYC, AML, SaaS, MiCA, RBAC, HSM, FIPS, ISO, Kubernetes, PostgreSQL, Redis, Helm
- Mermaid diagram blocks preserved verbatim in English (rendering requires English labels)
- Table structures preserved; headers may be translated but technical values stay English
- No heading numbers (Word auto-generates them from template)
- All markdown formatting preserved exactly (bold, lists, tables, horizontal rules)
- [CUSTOMIZE] and [CLIENT NAME] placeholders kept as-is
- Product names never translated: DALP, SMART Protocol, DALPAsset, Asset Console, DAPI

### Arabic Specific
- Use Modern Standard Arabic (فصحى), not dialectal
- RTL post-processing required after DOCX generation (see RTL Pipeline below)
- Cover page text in Arabic; title/subtitle translated
- Word count validation unreliable for Arabic (connected script)

### Japanese Specific
- Use です/ます (desu/masu) polite form throughout
- Word count validation unreliable (no spaces between words; use line count instead)
- Document titles and formal deliverable names may stay in English where they are proper nouns
- Phase names (Phase 1, Phase 2) kept in English for Gantt chart consistency

### Hindi Specific
- Use formal Devanagari script
- Formal verb forms appropriate for institutional documentation
- Technical abbreviations stay in English
- Mermaid Gantt section titles may be translated but task labels stay English for rendering

## Chunking Strategy

Large documents must be split for translation reliability. Maximum ~2,000 words per chunk.

### Recommended Split Points
Split at H1 heading boundaries. For the standard 20-page proposal:

| Chunk | Sections | Approx Words |
|---|---|---|
| A | Executive Summary + Company Profile | 1,800 |
| B1 | Platform Architecture (principles through Layer 2) | 1,760 |
| B1b | Platform Architecture (Layers 3-4 + Networks) | 936 |
| B2 | Asset Lifecycle Management | 2,230 |
| C | Compliance Architecture + Integration Architecture | 3,343 |
| D1 | Security Architecture + Deployment Architecture | 3,125 |
| D2 | Implementation Methodology + References | 1,349 |

If C or D1 timeout, split further at the second H1 boundary within each.

### Translation Agent Template

Each chunk uses this task pattern:
```
Read `/tmp/prop-{chunk}.md` and write a formal {LANGUAGE} translation to `/tmp/{lang}-{chunk}.md`.
Start writing IMMEDIATELY. Keep all markdown formatting, mermaid blocks, tables, and technical terms in English.
No heading numbers. Professional formal {REGISTER}.
```

Timeout: 240-300 seconds per chunk. Chunks over 2,500 words may need 300s.

## Assembly Pipeline

1. Split source markdown at H1 boundaries into chunks
2. Spawn parallel translation agents (max 5 concurrent)
3. Verify each output file exists and starts with target language text
4. Concatenate chunks in order: `cat {lang}-a.md {lang}-b1.md ... > proposal-{lang}-full.md`
5. Convert to DOCX: `python3 scripts/markdown_to_docx.py` with `--cover-json` (cover fields in target language)
6. For Arabic only: apply RTL post-processing (see below)

## RTL Pipeline (Arabic)

After DOCX generation, apply RTL formatting via python-docx:

```python
from docx import Document
from docx.oxml.ns import qn
from lxml import etree

doc = Document("proposal-arabic.docx")

for para in doc.paragraphs:
    pPr = para._element.find(qn('w:pPr'))
    if pPr is None:
        pPr = etree.SubElement(para._element, qn('w:pPr'))
    if pPr.find(qn('w:bidi')) is None:
        etree.SubElement(pPr, qn('w:bidi'))
    for run in para.runs:
        rPr = run._element.find(qn('w:rPr'))
        if rPr is None:
            rPr = etree.SubElement(run._element, qn('w:rPr'))
        if rPr.find(qn('w:rtl')) is None:
            etree.SubElement(rPr, qn('w:rtl'))

# Also apply to table cells
for table in doc.tables:
    for row in table.rows:
        for cell in row.cells:
            for para in cell.paragraphs:
                pPr = para._element.find(qn('w:pPr'))
                if pPr is None:
                    pPr = etree.SubElement(para._element, qn('w:pPr'))
                if pPr.find(qn('w:bidi')) is None:
                    etree.SubElement(pPr, qn('w:bidi'))
                for run in para.runs:
                    rPr = run._element.find(qn('w:rPr'))
                    if rPr is None:
                        rPr = etree.SubElement(run._element, qn('w:rPr'))
                    if rPr.find(qn('w:rtl')) is None:
                        etree.SubElement(rPr, qn('w:rtl'))

doc.save("proposal-arabic.docx")
```

Key XML elements:
- `w:bidi` on paragraph properties: sets paragraph direction to RTL
- `w:rtl` on run properties: marks run text as right-to-left

## Dependencies

- `python-docx` (installed): DOCX generation and RTL post-processing
- `lxml` (installed via python-docx): XML manipulation for RTL elements
- No external translation APIs: translations performed by LLM agents directly
