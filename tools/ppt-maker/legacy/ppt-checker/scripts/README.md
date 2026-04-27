---
title: "PPTX Reviewer Scripts"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.657605Z
---

# PPTX Reviewer Scripts

## inspect-pptx.py

Run a structural audit against a generated deck:

```bash
python3 ppt-checker/scripts/inspect-pptx.py path/to/deck.pptx > report.json
```

The report includes:
- slide count
- non-Figtree font detection
- dark/blue background detection
- text density by slide
- shape counts
- image presence
