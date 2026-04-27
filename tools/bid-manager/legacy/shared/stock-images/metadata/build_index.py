from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
META = ROOT / "metadata"

asset_sources = {
    "abstract-01.jpg": "https://www.pexels.com/photo/1616403/",
    "abstract-02.jpg": "https://www.pexels.com/photo/1103970/",
    "abstract-03.jpg": "https://www.pexels.com/photo/7130557/",
    "architecture-01.jpg": "https://www.pexels.com/photo/1029614/",
    "architecture-02.jpg": "https://www.pexels.com/photo/532568/",
    "architecture-03.jpg": "https://www.pexels.com/photo/534174/",
    "blockchain-01.jpg": "https://www.pexels.com/photo/9588213/",
    "blockchain-02.jpg": "https://www.pexels.com/photo/7887800/",
    "blockchain-03.jpg": "https://www.pexels.com/photo/5980739/",
    "business-01.jpg": "https://www.pexels.com/photo/3184291/",
    "business-02.jpg": "https://www.pexels.com/photo/1181304/",
    "business-03.jpg": "https://www.pexels.com/photo/1181396/",
    "finance-01.jpg": "https://www.pexels.com/photo/4910951/",
    "finance-02.jpg": "https://www.pexels.com/photo/12935051/",
    "finance-03.jpg": "https://www.pexels.com/photo/7621140/",
    "teamwork-01.jpg": "https://www.pexels.com/photo/5256819/",
    "teamwork-02.jpg": "https://www.pexels.com/photo/8636591/",
    "teamwork-03.jpg": "https://www.pexels.com/photo/5257005/",
    "tech-01.jpg": "https://www.pexels.com/photo/4597280/",
    "tech-02.jpg": "https://www.pexels.com/photo/1181354/",
    "tech-03.jpg": "https://www.pexels.com/photo/5480781/",
    "digital-assets-04.jpg": "https://www.pexels.com/photo/man-in-white-dress-shirt-sitting-in-front-of-computer-monitor-7567593/",
    "digital-assets-05.jpg": "https://www.pexels.com/photo/marketing-man-laptop-technology-7567533/",
    "digital-assets-06.jpg": "https://www.pexels.com/photo/man-taking-notes-with-stock-market-data-on-screen-36633860/",
    "software-04.jpg": "https://www.pexels.com/photo/woman-sitting-in-front-of-computer-in-office-3861967/",
    "software-05.jpg": "https://www.pexels.com/photo/close-up-photo-of-person-typing-on-laptop-1181675/",
    "software-06.jpg": "https://www.pexels.com/photo/photo-of-a-laptop-screen-7439127/",
    "compliance-04.jpg": "https://www.pexels.com/photo/man-and-women-sitting-at-table-checking-on-business-papers-7654117/",
    "compliance-05.jpg": "https://www.pexels.com/photo/women-in-meeting-at-office-7654488/",
    "compliance-06.jpg": "https://www.pexels.com/photo/fashion-people-woman-desk-6538575/",
    "custody-01.jpg": "https://www.pexels.com/photo/a-person-holding-a-silver-and-black-door-lever-7522609/",
    "custody-02.jpg": "https://www.pexels.com/photo/server-racks-on-data-center-4508751/",
    "custody-03.jpg": "https://www.pexels.com/photo/engineer-holding-laptop-1181316/",
    "settlement-01.jpg": "https://www.pexels.com/photo/a-person-in-white-shirt-pressing-on-payment-terminal-5239867/",
    "settlement-02.jpg": "https://www.pexels.com/photo/a-person-holding-payment-terminal-5239874/",
    "settlement-03.jpg": "https://www.pexels.com/photo/a-person-holding-a-bank-card-6627897/",
    "fintech-01.jpg": "https://www.pexels.com/photo/graphs-and-charts-on-the-monitors-5833747/",
    "fintech-02.jpg": "https://www.pexels.com/photo/person-using-macbook-pro-on-white-table-5834212/",
    "fintech-03.jpg": "https://www.pexels.com/photo/person-writing-on-a-white-paper-5834208/",
}

generated_ids = {
    "compliance/compliance-01.jpg",
    "compliance/compliance-02.jpg",
    "compliance/compliance-03.jpg",
    "dalp/dalp-01.jpg",
    "dalp/dalp-02.jpg",
    "dalp/dalp-03.jpg",
    "digital-assets/digital-assets-01.jpg",
    "digital-assets/digital-assets-02.jpg",
    "digital-assets/digital-assets-03.jpg",
    "software/software-01.jpg",
    "software/software-02.jpg",
    "software/software-03.jpg",
    "tokenization/tokenization-01.jpg",
    "tokenization/tokenization-02.jpg",
    "tokenization/tokenization-03.jpg",
}

asset_titles = {
    "digital-assets-04.jpg": "Adult man analyzing cryptocurrency data on a computer screen in an office setting",
    "digital-assets-05.jpg": "Young professional analyzing financial charts at a modern office desk with a laptop",
    "digital-assets-06.jpg": "Analyst taking notes with stock-market data on screen",
    "software-04.jpg": "Back view of a female software engineer working at a multi-monitor setup",
    "software-05.jpg": "Developer writing code on a laptop in front of multiple monitors",
    "software-06.jpg": "Laptop screen showing project management software interface",
    "compliance-04.jpg": "Diverse team collaborating with laptops and documents in a modern office",
    "compliance-05.jpg": "Professional women discussing documents in a modern office",
    "compliance-06.jpg": "Two professionals reviewing documents in a modern office setting",
    "custody-01.jpg": "Fingerprint access on a digital security door lock",
    "custody-02.jpg": "Modern data center corridor with server racks and equipment",
    "custody-03.jpg": "Professional using a laptop in a mirrored data-center environment",
    "settlement-01.jpg": "Cashless payment via terminal on a desk",
    "settlement-02.jpg": "Card terminal next to a laptop and notebook",
    "settlement-03.jpg": "Contactless payment with a bank card over a payment terminal",
    "fintech-01.jpg": "Multi-monitor trading desk with charts and analytics",
    "fintech-02.jpg": "Desk setup with laptop displaying a stock chart and technology gadgets",
    "fintech-03.jpg": "Business analyst writing beside laptop and smartphone with trend graphs",
}

category_tags = {
    "abstract": ["abstract", "background", "safe", "data-viz"],
    "architecture": ["city", "infrastructure", "enterprise", "built-environment"],
    "blockchain": ["blockchain", "web3", "network", "digital-ledger"],
    "business": ["executive", "meeting", "enterprise", "presentation"],
    "compliance": ["compliance", "policy", "kyc", "controls"],
    "custody": ["custody", "security", "infrastructure", "protection"],
    "dalp": ["dalp", "platform", "lifecycle", "orchestration"],
    "digital-assets": ["digital-assets", "wallets", "token-holders", "markets"],
    "finance": ["finance", "markets", "capital", "investors"],
    "fintech": ["fintech", "trading", "analytics", "market-data"],
    "settlement": ["settlement", "payments", "transactions", "cashless"],
    "software": ["software", "engineering", "integration", "api"],
    "teamwork": ["team", "collaboration", "delivery", "operations"],
    "technology": ["software", "cloud", "dashboard", "engineering"],
    "tokenization": ["tokenization", "issuance", "fractionalization", "settlement"],
}

usage = {
    "abstract": ["cover backgrounds", "section dividers", "data-heavy slides"],
    "architecture": ["infrastructure context", "regional market slides", "real-world asset framing"],
    "blockchain": ["network architecture", "tokenization intro", "ecosystem overview"],
    "business": ["exec summary", "stakeholder slides", "governance positioning"],
    "compliance": ["compliance section covers", "policy operations", "regulatory governance"],
    "custody": ["custody architecture", "security posture", "safe-keeping narratives"],
    "dalp": ["DALP narrative", "lifecycle slides", "platform orchestration"],
    "digital-assets": ["asset servicing", "wallet flows", "market structure"],
    "finance": ["capital markets", "issuance economics", "investor-facing slides"],
    "fintech": ["trading ops", "market infrastructure", "analytics-led storytelling"],
    "settlement": ["payment rails", "transaction flows", "cash movement and settlement"],
    "software": ["API/integration sections", "engineering credibility", "implementation slides"],
    "teamwork": ["delivery model", "operating model", "customer success"],
    "technology": ["platform architecture", "developer workflows", "operations"],
    "tokenization": ["issuance flow", "fractional ownership", "settlement lifecycle"],
}

summary = {
    "library": "SettleMint shared stock images",
    "root": str(ROOT.relative_to(ROOT.parents[3])),
    "formats": ["jpg"],
    "license": {
        "legacy": "Pexels license",
        "generated": "Workspace-generated SettleMint-safe abstract illustrations",
        "photo_batch": "Pexels license (curated enterprise/fintech photography)",
    },
}

assets = []
for path in sorted(ROOT.glob("*/*.jpg")):
    if path.parent.name in {"metadata", "scripts"}:
        continue
    asset_id = f"{path.parent.name}/{path.name}"
    generated = asset_id in generated_ids
    with Image.open(path) as img:
        width, height = img.size
    assets.append(
        {
            "id": asset_id,
            "category": path.parent.name,
            "filename": path.name,
            "path": str(path.relative_to(ROOT)),
            "width": width,
            "height": height,
            "orientation": "landscape" if width >= height else "portrait",
            "style": "illustration" if generated else "photo",
            "source": "generated-in-workspace" if generated else asset_sources.get(path.name),
            "license": "internal-generated" if generated else "pexels",
            "title": asset_titles.get(path.name),
            "tags": category_tags.get(path.parent.name, []),
            "recommended_usage": usage.get(path.parent.name, []),
        }
    )

categories = []
for category in sorted({a["category"] for a in assets}):
    category_assets = [a for a in assets if a["category"] == category]
    generated_count = sum(1 for a in category_assets if a["license"] == "internal-generated")
    photo_count = sum(1 for a in category_assets if a["license"] == "pexels")
    categories.append(
        {
            "name": category,
            "count": len(category_assets),
            "tags": category_tags.get(category, []),
            "recommended_usage": usage.get(category, []),
            "generated_assets": generated_count,
            "photo_assets": photo_count,
            "mixed": generated_count > 0 and photo_count > 0,
            "styles": sorted({a["style"] for a in category_assets}),
        }
    )

index = {
    "summary": summary,
    "counts": {
        "assets": len(assets),
        "categories": len(categories),
        "generated_assets": sum(1 for a in assets if a["license"] == "internal-generated"),
        "pexels_photo_assets": sum(1 for a in assets if a["license"] == "pexels"),
    },
    "categories": categories,
    "assets": assets,
}

META.mkdir(parents=True, exist_ok=True)
(META / "index.json").write_text(json.dumps(index, indent=2) + "\n")
(META / "categories.json").write_text(json.dumps(categories, indent=2) + "\n")
print(f"Wrote {META / 'index.json'}")
print(f"Wrote {META / 'categories.json'}")
