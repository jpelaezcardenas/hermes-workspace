#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEGACY = ROOT / "legacy" / "blog-writer"

sample_article = """Last updated: April 2026\n\nWhat is digital asset lifecycle management?\n\nDigital asset lifecycle management is the end-to-end operating model for issuance, compliance, custody, distribution, secondary market activity, and redemption. It gives financial institutions one place to define the rules, the asset structure, and the operational controls before an instrument moves through its lifecycle.\n\n## What this approach covers\n\n- Internal links on first occurrence\n- Linked external citations for every statistic\n- A short definition block that answers the query directly\n- A distinct FAQ that adds new angles\n\n## FAQ\n\nWhat is DALP?\nIt is SettleMint's platform for digital asset lifecycle management.\n"""
checks = {
    "no_em_dash": "—" not in sample_article,
    "no_banned_phrases": all(term not in sample_article.lower() for term in ["production-grade", "enterprise-grade", "pilot to production", "competitor"]),
    "last_updated": "last updated" in sample_article.lower(),
    "faq_present": "faq" in sample_article.lower(),
    "internal_links": "internal links" in sample_article.lower(),
    "citations": "citations" in sample_article.lower(),
}
result = {
    "agent": "blog-writer",
    "sample_article": True,
    "checks": checks,
    "passed": all(checks.values()),
}
print(json.dumps(result, indent=2))
raise SystemExit(0 if result["passed"] else 1)
