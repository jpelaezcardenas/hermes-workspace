#!/usr/bin/env python3
"""
slide_intelligence.py — Slide selection scoring and deck composition validation.
"""

import json
import os
from typing import Dict, List, Optional, Tuple

SLIDE_BANK_DIR = "slide-bank"

# Module-level registry cache: slide_id (e.g. "001") -> info dict
_REGISTRY_CACHE: Dict[str, Dict] = {}
_REGISTRY_LOADED = False
_REGISTRY_META: Optional[Dict] = None


def _load_registry() -> None:
    """Load REGISTRY.json into module-level cache (called once)."""
    global _REGISTRY_LOADED, _REGISTRY_META
    if _REGISTRY_LOADED:
        return
    registry_path = os.path.join(SLIDE_BANK_DIR, "REGISTRY.json")
    if os.path.exists(registry_path):
        with open(registry_path, encoding="utf-8") as f:
            data = json.load(f)
        _REGISTRY_META = data
        for slide in data.get("slides", []):
            num = slide.get("slide_number")
            if num is not None:
                _REGISTRY_CACHE[f"{num:03d}"] = slide
    _REGISTRY_LOADED = True


def get_registry() -> Optional[Dict]:
    """Return the full registry dict (version, slides, metadata), or None if unavailable."""
    _load_registry()
    return _REGISTRY_META


# Content type → preferred slide IDs (ordered by preference)
CONTENT_TYPE_MAPPING = {
    "cover": ["001"],
    "agenda": ["002"],
    "section": ["003"],
    "blank_custom": ["004"],
    "narrative_single": ["005"],
    "table_only": ["006"],
    "table_with_text": ["007"],
    "chart": ["008"],
    "two_col_labeled": ["010"],
    "two_col": ["010"],
    "three_col_labeled": ["012"],
    "three_col": ["012"],
    "four_grid": ["013"],
    "six_grid": ["014"],
    "screenshot_right": ["015"],
    "screenshot_left": ["016"],
    "image_left_equal": ["017"],
    "image_right_equal": ["018"],
    "image_left_wide": ["019"],
    "image_right_wide": ["020"],
    "image_left_third": ["021"],
    "image_right_third": ["022"],
    "full_bleed": ["023"],
    "thank_you": ["024"],
}

# Slide category groupings
SLIDE_CATEGORIES = {
    "structural": ["001", "002", "003", "004", "024"],
    "text": ["005", "010", "012"],
    "data": ["006", "007", "008"],
    "grid": ["013", "014"],
    "image": ["015", "016", "017", "018", "019", "020", "021", "022", "023"],
}


def load_slide_info(slide_id: str) -> Optional[Dict]:
    """Load the info JSON for a slide.

    Fast path: reads from REGISTRY.json (single file, cached in memory).
    Fallback: scans individual .info.json files if REGISTRY.json doesn't exist.
    """
    key = slide_id.zfill(3)

    # Fast path: use registry cache
    _load_registry()
    if _REGISTRY_CACHE:
        return _REGISTRY_CACHE.get(key)

    # Fallback: scan individual .info.json files (backwards compat)
    if not os.path.isdir(SLIDE_BANK_DIR):
        return None
    for fname in os.listdir(SLIDE_BANK_DIR):
        if fname.endswith(".info.json") and f"-{key}-" in fname:
            with open(os.path.join(SLIDE_BANK_DIR, fname)) as f:
                return json.load(f)
    return None


def _image_slots(info: Dict) -> List[Dict]:
    return list(info.get("image_slot_policy") or [])


def _layout_accepts_asset_kind(info: Dict, asset_kind: str) -> bool:
    slots = _image_slots(info)
    if not slots:
        return not asset_kind
    for slot in slots:
        allowed = slot.get("allowed_asset_kinds") or []
        if asset_kind in allowed:
            return True
    return False


def _layout_prefers_asset_kind(info: Dict, asset_kind: str) -> bool:
    for slot in _image_slots(info):
        preferred = slot.get("preferred_asset_kinds") or []
        if asset_kind in preferred:
            return True
    return False


def score_layout(
    slide_id: str,
    content: Dict,
    used_layouts: List[str],
    prev_layout: Optional[str] = None,
) -> int:
    """
    Score a layout for a given content block.

    content dict keys:
      - type: str (one of CONTENT_TYPE_MAPPING keys)
      - word_count: int
      - column_count: int (if multi-column)
      - has_image: bool
      - has_table: bool
      - has_diagram: bool
    """
    score = 0
    info = load_slide_info(slide_id)
    if not info:
        return -10

    # +3: content type matches primary use
    preferred = CONTENT_TYPE_MAPPING.get(content.get("type", ""), [])
    if slide_id in preferred:
        pos = preferred.index(slide_id)
        score += 3 - pos  # first choice +3, second +2, third +1

    # +2: content has image and layout supports image
    if content.get("has_image") and info.get("has_image_area"):
        score += 2

    asset_kind = content.get("image_asset_kind") or content.get("asset_kind")
    if asset_kind:
        if _layout_accepts_asset_kind(info, asset_kind):
            score += 3
            if _layout_prefers_asset_kind(info, asset_kind):
                score += 2
        else:
            score -= 6

    # +2: content volume within 20% of max
    max_words = info.get("total_word_count", 0)
    if max_words > 0:
        word_count = content.get("word_count", 0)
        if word_count > 0 and abs(word_count - max_words) / max_words < 0.2:
            score += 2

    # +1: layout not used yet
    if slide_id not in used_layouts:
        score += 1

    # +1: different category from last slide
    if prev_layout:
        prev_cat = next((k for k, v in SLIDE_CATEGORIES.items() if prev_layout in v), None)
        curr_cat = next((k for k, v in SLIDE_CATEGORIES.items() if slide_id in v), None)
        if prev_cat != curr_cat:
            score += 1

    # -2: would leave >40% empty
    max_words = info.get("total_word_count", 0)
    if max_words > 0:
        word_count = content.get("word_count", 0)
        if word_count < max_words * 0.6:
            score -= 2

    # -2: same as previous slide
    if prev_layout == slide_id:
        score -= 2

    # -3: used 3+ times already
    if used_layouts.count(slide_id) >= 3:
        score -= 3

    return score


def select_layout(
    content: Dict,
    used_layouts: List[str],
    prev_layout: Optional[str] = None,
    candidates: Optional[List[str]] = None,
) -> str:
    """Select the best layout for a content block."""
    if candidates is None:
        # Exclude structural slides from general selection
        allowed = [
            k for k in CONTENT_TYPE_MAPPING
            if k not in ("cover", "agenda", "section", "thank_you")
        ]
        # Get all slide IDs
        candidate_ids = []
        for ids in [CONTENT_TYPE_MAPPING[k] for k in allowed]:
            candidate_ids.extend(ids)
        candidate_ids = list(set(candidate_ids))
    else:
        candidate_ids = candidates

    scores = {sid: score_layout(sid, content, used_layouts, prev_layout) for sid in candidate_ids}
    best = max(scores, key=scores.get)
    return best


def validate_deck_composition(slide_plan: List[Dict]) -> Tuple[bool, List[str]]:
    """
    Validate a deck plan meets mandatory composition rules.
    Returns (is_valid, list_of_violations).
    """
    violations = []

    layout_ids = [s.get("slide_id", "") for s in slide_plan]

    # 2+ sections
    section_count = layout_ids.count("003")
    if section_count < 2:
        violations.append(f"Only {section_count} section separator(s). Need ≥2.")

    # 5+ different types (excluding structural)
    content_layouts = [l for l in layout_ids if l not in ("001", "002", "003", "024")]
    unique_types = set(content_layouts)
    if len(unique_types) < 5:
        violations.append(f"Only {len(unique_types)} unique slide types. Need ≥5.")

    # 1+ table slide
    table_slides = [l for l in layout_ids if l in ("006", "007")]
    if not table_slides:
        violations.append("No table slide (006 or 007). Add at least one.")

    # 2+ image slides
    image_slides = [l for l in layout_ids if l in ("015", "016", "017", "018", "019", "020", "021", "022", "023")]
    if len(image_slides) < 2:
        violations.append(f"Only {len(image_slides)} image slide(s). Need ≥2.")

    thank_you_idx = next((i for i, layout in enumerate(layout_ids) if layout == "024"), None)
    if thank_you_idx is None:
        violations.append("Deck must include Thank You (024) before any appendix slides.")
    else:
        main_diagrams = [s for s in slide_plan[:thank_you_idx] if s.get("has_diagram")]
        if main_diagrams:
            violations.append("Main slides must not use Mermaid diagrams; reserve diagrams for the appendix after Thank You.")
        appendix_diagrams = [s for s in slide_plan[thank_you_idx + 1:] if s.get("has_diagram")]
        if appendix_diagrams and len(appendix_diagrams) < 4:
            violations.append(f"Only {len(appendix_diagrams)} appendix diagram slide(s). Need ≥4 when using appendix diagrams.")
        if len(appendix_diagrams) > 10:
            violations.append(f"Appendix has {len(appendix_diagrams)} diagram slide(s). Max 10.")

    # No layout used 3+ times (except 005)
    for layout in set(content_layouts):
        count = content_layouts.count(layout)
        if layout != "005" and count >= 4:
            violations.append(f"Slide type {layout} used {count} times. Max 3.")

    # Starts with 001, includes 024 before any appendix
    if layout_ids and layout_ids[0] != "001":
        violations.append("First slide must be Cover (001).")
    if thank_you_idx is not None and any(s.get("type") == "appendix" for s in slide_plan[:thank_you_idx]):
        violations.append("Appendix slides must come after Thank You (024).")

    return len(violations) == 0, violations


def suggest_diagram_positions(slide_plan: List[Dict]) -> List[int]:
    """Suggest which slide indices should have Mermaid diagrams."""
    diagram_positions = []

    for i, slide in enumerate(slide_plan):
        slide_id = slide.get("slide_id", "")
        content_type = slide.get("type", "")

        # Good candidates for diagrams
        if slide_id == "004":  # blank slide
            diagram_positions.append(i)
        elif content_type in ("process", "architecture", "timeline", "flow"):
            diagram_positions.append(i)
        elif slide_id in ("015", "016", "017", "018", "019", "020"):  # picture slides
            diagram_positions.append(i)

    # Ensure at least 2
    if len(diagram_positions) < 2:
        # Add to single-column slides that discuss process/workflow
        for i, slide in enumerate(slide_plan):
            if slide.get("slide_id") == "005" and i not in diagram_positions:
                diagram_positions.append(i)
                if len(diagram_positions) >= 2:
                    break

    return diagram_positions[:4]  # max 4 diagrams per deck


def get_agenda_icon(section_title: str) -> str:
    """Pick the best Lucide icon SVG filename for an agenda section title."""
    title_lower = section_title.lower()

    icon_rules = [
        # Finance
        (["gold", "precious", "metal", "price", "value", "market", "billion", "trillion"], "coins"),
        (["revenue", "profit", "growth", "return", "yield", "fund"], "trending-up"),
        (["payment", "transfer", "settlement", "transaction"], "credit-card"),
        (["wallet", "custody", "vault", "asset"], "wallet"),
        # Technical
        (["platform", "architecture", "system", "infrastructure", "api", "integration"], "cpu"),
        (["blockchain", "network", "node", "chain"], "network"),
        (["database", "data", "storage"], "database"),
        (["code", "developer", "technical", "build", "deploy"], "code"),
        (["cloud", "saas", "hosted"], "cloud"),
        # Compliance
        (["compliance", "regulation", "regulatory", "legal", "law"], "shield-check"),
        (["security", "secure", "trust"], "shield"),
        (["identity", "kyc", "aml", "verification", "audit"], "file-check"),
        (["access", "permission", "role"], "lock"),
        # Business
        (["company", "team", "people", "organization", "enterprise"], "users"),
        (["customer", "client", "partner"], "user-check"),
        (["product", "feature", "capability", "solution"], "box"),
        (["strategy", "plan", "roadmap", "timeline"], "target"),
        (["business", "commercial", "sales", "opportunity"], "briefcase"),
        (["global", "international", "world", "geographic"], "globe"),
        # Process
        (["process", "workflow", "flow", "steps", "how"], "layers"),
        (["start", "begin", "get started", "onboard", "launch"], "rocket"),
        (["lifecycle", "cycle", "phase"], "refresh-cw"),
        (["time", "schedule", "calendar", "quarter"], "clock"),
        # Analytics
        (["analytics", "insight", "dashboard", "report", "metric", "kpi"], "bar-chart"),
        (["chart", "graph", "visual", "distribution"], "pie-chart"),
        # Impact
        (["impact", "result", "outcome", "benefit", "advantage", "why"], "zap"),
        (["award", "achievement", "excellence", "best"], "award"),
        (["innovation", "future", "next", "new"], "hexagon"),
    ]

    for keywords, icon in icon_rules:
        if any(kw in title_lower for kw in keywords):
            return f"icon-library/lucide/{icon}.svg"

    # Default
    return "icon-library/lucide/circle.svg"
