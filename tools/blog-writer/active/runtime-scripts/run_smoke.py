#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEGACY = ROOT / "legacy" / "blog-writer"

files = [LEGACY / "README.md", LEGACY / "SOUL.md", LEGACY / "AGENTS.md", LEGACY / "USER-PROMPT-GUIDE.md"]
result = {
    "agent": "blog-writer",
    "checked_files": [{"path": str(p), "exists": p.exists(), "size": p.stat().st_size if p.exists() else None} for p in files],
    "legacy_root": str(LEGACY),
    "passed": all(p.exists() for p in files),
}
print(json.dumps(result, indent=2))
raise SystemExit(0 if result["passed"] else 1)
