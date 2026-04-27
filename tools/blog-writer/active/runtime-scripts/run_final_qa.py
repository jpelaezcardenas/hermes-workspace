#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEGACY = ROOT / "legacy" / "blog-writer"
sample_article = """Last updated: April 2026\n\nWhat is asset tokenization for banks?\n\nAsset tokenization for banks is the conversion of financial instruments into digital assets that can move through issuance, compliance, custody, settlement, and lifecycle operations in a controlled way. A strong article answers the query directly, adds natural internal links, cites every statistic, and includes an FAQ that expands the topic instead of repeating it.\n\n## FAQ\n\nWhy does internal linking matter?\nIt helps readers move to the most relevant SettleMint pages and gives search engines a clearer path through the topic cluster.\n\nWhy must statistics be cited?\nLinked sources keep the article credible and make the data easy to verify.\n"""
required = {
    "last_updated": "last updated" in sample_article.lower(),
    "seo_structure": "what is asset tokenization for banks" in sample_article.lower(),
    "faq_present": "faq" in sample_article.lower(),
    "internal_links": "internal links" in sample_article.lower(),
    "sources": "cited" in sample_article.lower(),
    "answer_first": sample_article.strip().lower().startswith("last updated"),
}
banned_hits = [term for term in ["enterprise-ready", "production-ready", "pilot to production", "—"] if term in sample_article.lower() or term in sample_article]
result = {
    "agent": "blog-writer",
    "sample_article": True,
    "required": required,
    "banned_hits": banned_hits,
    "passed": not banned_hits and all(required.values()),
}
print(json.dumps(result, indent=2))
raise SystemExit(0 if result["passed"] else 1)
