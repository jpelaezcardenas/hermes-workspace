# Shared Setup — Office Document Knowledge Base

This directory contains shared knowledge, standards, and reference materials used by all office document agents (bid-manager, ppt-maker, rfp-forge, ppt-checker, bid-checker).

## Contents

### ooxml-reference/
OOXML and ECMA-376 reference materials for building and manipulating Office documents:
- `ecma-376/` — ECMA-376 5th edition specification PDFs (Parts 1-4)
- `python-pptx-src/` — python-pptx library source code for reference
- `python-pptx-internals.md` — Internal workings of python-pptx
- `officedev-findings.md` — Analysis of OfficeDev GitHub org (450 repos) and which ones matter
- `word-ooxml-guide.md` — Word-specific OOXML patterns for python-docx
- `excel-ooxml-guide.md` — Excel-specific OOXML patterns for openpyxl

### Key Principle
All agents that generate or inspect Office documents should reference this shared knowledge base rather than maintaining their own copies. The ECMA-376 spec applies equally to .docx, .pptx, and .xlsx — they all share the Open Packaging Convention and core XML structures.
