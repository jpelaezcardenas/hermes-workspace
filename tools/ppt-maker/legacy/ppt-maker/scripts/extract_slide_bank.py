#!/usr/bin/env python3
"""
Comprehensive slide bank rebuild script.
- Extracts 22 supported slides from Master Template 2026.pptx
- Skips removed subtitle/column-title layouts
- Generates fully enriched info JSONs
- Cleans up old/duplicate files
"""

import os
import sys
import zipfile
import re
import json
import tempfile
import shutil
from datetime import datetime, timezone

TEMPLATE_PATH = "templates/Master Template 2026.pptx"
OUTPUT_DIR = "slide-bank"
REMOVED_LAYOUTS = {
    "Two Column with column title",
    "Three Column with Title",
}

LEGACY_SLIDE_NUMBERS = {
    "Cover Slide": 1,
    "Agenda": 2,
    "Section Separator": 3,
    "Blank": 4,
    "Single Column": 5,
    "Table": 6,
    "Table with Text": 7,
    "Chart with Text": 8,
    "Two column": 10,
    "Three Column": 12,
    "Text 2x2": 13,
    "Text 2x3": 14,
    "Screenshot Right": 15,
    "Screenshot Left": 16,
    "Picture Left Equal": 17,
    "Picture Right Equal": 18,
    "Picture Left Wide": 19,
    "Picture Right Wide": 20,
    "Picture Left One Third": 21,
    "Picture Right One Third": 22,
    "Picture Full Width": 23,
    "Thank You": 24,
}

# Mapping: template layout name -> canonical 36-layout name + metadata
LAYOUT_MAPPING = {
    "Cover Slide": {
        "canonical": "Title - Standard",
        "slug": "title-standard",
        "category": "opening",
        "description": "Opening/cover slide with a large title and subtitle area. Branded background with SettleMint logo. Always the first slide of any deck.",
        "usage": "Use as the very first slide of every presentation. Enter the deck title and subtitle (date, event name, presenter).",
        "potential_usage": "Can also be used as a re-opening slide after a major break or change in speaker.",
        "content_capacity": "light",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["background image", "logo", "footer"],
        "selection_tags": ["cover", "executive", "investor", "sales", "product-overview", "technical-deep-dive"],
    },
    "Agenda": {
        "canonical": "Agenda / TOC",
        "slug": "agenda-toc",
        "category": "opening",
        "description": "Table of contents or meeting agenda slide with a full-width body area for listing sections or agenda items.",
        "usage": "Use after the cover slide to preview the structure of the presentation. List 3–6 agenda items or sections.",
        "potential_usage": "Can appear at the start of each major section as a 'where we are' recap slide.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["agenda", "executive", "sales", "product-overview"],
    },
    "Section Separator": {
        "canonical": "Section Divider - Bold",
        "slug": "section-divider-bold",
        "category": "opening",
        "description": "Major section break slide with a bold branded background. Marks the start of a new major section in the deck.",
        "usage": "Place between major sections (e.g., before 'Problem', 'Solution', 'Pricing'). Title = section name, body = optional short description.",
        "potential_usage": "Can also be used as a chapter divider in long workshop or training decks.",
        "content_capacity": "light",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["background image", "logo", "footer"],
        "selection_tags": ["section-break", "executive", "sales", "product-overview", "technical-deep-dive"],
    },
    "Blank": {
        "canonical": "1-Column Content",
        "slug": "1-column-content",
        "category": "content",
        "description": "Blank content slide with footer only. Fully flexible canvas for custom layouts or single-column narrative content.",
        "usage": "Use when no pre-built layout fits your content. Works for narrative text, single-image placements, or custom diagrams.",
        "potential_usage": "Can host a single large image, a diagram, or serve as a transition slide.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["text-content", "narrative"],
    },
    "Single Column": {
        "canonical": "1-Column Content",
        "slug": "1-column-content",
        "category": "content",
        "description": "Standard single-column content slide with a title and full-width body area. The default workhorse slide for any narrative, bullet list, or short paragraph content.",
        "usage": "Use for any single-topic slide: explaining a concept, listing features, presenting a narrative. Title states the takeaway; body carries 3–6 bullets or 2–3 short paragraphs.",
        "potential_usage": "Works for introductory explanations, product overviews, how-it-works sections, and policy/compliance summaries.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["text-content", "bullets", "narrative", "executive", "sales", "product-overview"],
    },
    "Table": {
        "canonical": "Table - Simple",
        "slug": "table-simple",
        "category": "data",
        "description": "Full-width table layout for structured data presentation. No supplementary text area — the table is the focus.",
        "usage": "Use for feature matrices, pricing tiers, specification tables, or any structured data with rows and columns. Max 6 rows × 5 columns.",
        "potential_usage": "Works for technical comparison tables, API endpoint references, or compliance requirement lists.",
        "content_capacity": "heavy",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": True,
        "column_count": 1,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["table", "comparison", "matrix", "technical-deep-dive", "product-overview"],
    },
    "Table with Text": {
        "canonical": "Table - Comparison",
        "slug": "table-comparison",
        "category": "data",
        "description": "Table layout with accompanying text area for adding context or narrative alongside the data. Ideal for feature comparison tables.",
        "usage": "Use when a table needs interpretation — place the table and use the text area for callouts, caveats, or the key insight.",
        "potential_usage": "Works for vendor comparison, feature-by-tier tables with explanatory notes, or compliance matrices with commentary.",
        "content_capacity": "heavy",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": True,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["table", "comparison", "matrix", "technical-deep-dive", "sales"],
    },
    "Chart with Text": {
        "canonical": "Chart Left + Text",
        "slug": "chart-left-text",
        "category": "data",
        "description": "Split layout with a chart on one side and explanatory text on the other. The data visualization is paired with narrative context.",
        "usage": "Use when a chart needs interpretation. Place the chart and use the text area to state the insight in 2–4 bullets. Always lead with the 'so what'.",
        "potential_usage": "Works for market size charts, growth trend visualizations, adoption curves, or any data that tells a story.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": True,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["chart", "data-visualization", "executive", "investor", "sales"],
    },
    "Two column": {
        "canonical": "2-Column Wide-Narrow",
        "slug": "2-column-wide-narrow",
        "category": "content",
        "description": "Two-column layout with equal columns but without separate column headers. Flexible dual-column layout for side-by-side content.",
        "usage": "Use for two parallel content areas where no column titles are needed. Works for split narratives, dual lists, or paired content blocks.",
        "potential_usage": "Good for quick two-topic summaries, left-right content pairing, or supplementary detail alongside main content.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["two-column", "text-content", "product-overview", "sales"],
    },
    "Three Column": {
        "canonical": "3-Column Content",
        "slug": "3-column-content",
        "category": "content",
        "description": "Three equal-width columns without a separate slide title — the columns carry all content. Maximizes content area for three parallel topics.",
        "usage": "Use when you have three parallel content areas and want to maximize real estate. Suitable for feature comparisons, step-by-step breakdowns, or three key messages.",
        "potential_usage": "Works for three-tier architecture overviews, three-pillar strategy frames, or three product highlights.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 3,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["three-column", "multi-column", "text-content", "product-overview", "technical-deep-dive"],
    },
    "Text 2x2": {
        "canonical": "Icon Grid - 4 Column",
        "slug": "icon-grid-4-column",
        "category": "content",
        "description": "2×2 grid of four equal text blocks arranged in two rows and two columns. Each block can contain a heading and body text.",
        "usage": "Use for four key points, four product features, four customer benefits, or a 2×2 matrix framework (e.g., effort/impact, risk/reward).",
        "potential_usage": "Works for four pillars, four platform components, four use cases, or a 2×2 strategic framing.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["multi-column", "icons", "features", "product-overview", "executive"],
    },
    "Text 2x3": {
        "canonical": "Icon Grid - 3 Column",
        "slug": "icon-grid-3-column",
        "category": "content",
        "description": "2×3 grid of six equal text blocks arranged in two rows and three columns. Maximizes content density for feature-rich slides.",
        "usage": "Use for six key features, six integration partners, six compliance standards, or any collection of six parallel items.",
        "potential_usage": "Works for feature grids, capability overviews, six-step summaries, or a comprehensive capability matrix.",
        "content_capacity": "medium",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 3,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["three-column", "multi-column", "icons", "features", "product-overview"],
    },
    "Screenshot Right": {
        "canonical": "Text Left + Image Right",
        "slug": "text-left-image-right",
        "category": "visual",
        "description": "Left side carries title and text content; right side holds a browser-frame screenshot slot. The text leads and the visual supports.",
        "usage": "Use this when the visual is a DALP/browser screenshot. Stock art and diagrams can still fit here, but DALP screenshots belong here rather than in generic picture layouts.",
        "potential_usage": "Works for product feature demos, UI walkthroughs, browser-based proof points, or diagrams shown inside the browser frame.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "screenshot", "two-column", "product-overview", "technical-deep-dive", "sales"],
        "image_slot_policy": [{
            "placeholder_idx": 12,
            "placeholder_kind": "browser_frame",
            "allowed_asset_kinds": ["dalp_screenshot", "diagram", "generic_image"],
            "preferred_asset_kinds": ["dalp_screenshot"],
            "fit_mode_by_asset_kind": {"dalp_screenshot": "contain", "diagram": "contain", "generic_image": "cover"},
            "background_by_asset_kind": {"dalp_screenshot": "white", "diagram": "transparent", "generic_image": "transparent"},
            "round_corners": True,
            "corner_radius_px": 8,
            "aspect_ratio_class": "screenshot-browser-frame"
        }],
    },
    "Screenshot Left": {
        "canonical": "Image Left + Text Right",
        "slug": "image-left-text-right",
        "category": "visual",
        "description": "Left side holds a browser-frame screenshot slot; right side carries title and text content. The visual leads and the text explains.",
        "usage": "Use this when the visual is a DALP/browser screenshot. Stock art and diagrams can still fit here, but DALP screenshots belong here rather than in generic picture layouts.",
        "potential_usage": "Works for UI-first presentations, visual-led product stories, browser screenshots, or diagrams shown inside the browser frame.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "screenshot", "two-column", "product-overview", "technical-deep-dive", "sales"],
        "image_slot_policy": [{
            "placeholder_idx": 12,
            "placeholder_kind": "browser_frame",
            "allowed_asset_kinds": ["dalp_screenshot", "diagram", "generic_image"],
            "preferred_asset_kinds": ["dalp_screenshot"],
            "fit_mode_by_asset_kind": {"dalp_screenshot": "contain", "diagram": "contain", "generic_image": "cover"},
            "background_by_asset_kind": {"dalp_screenshot": "white", "diagram": "transparent", "generic_image": "transparent"},
            "round_corners": True,
            "corner_radius_px": 8,
            "aspect_ratio_class": "screenshot-browser-frame"
        }],
    },
    "Picture Left Equal": {
        "canonical": "Image Left + Text Right",
        "slug": "image-left-text-right",
        "category": "visual",
        "description": "Equal split with image/photo on the left and text content on the right. The visual and text carry equal visual weight.",
        "usage": "Use for team introductions with photos, customer stories with client photos, or any visual-text pairing where both sides are equally important.",
        "potential_usage": "Works for people-centric slides, location/facility shots with descriptions, or event/conference imagery with context.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "two-column", "team", "people", "sales"],
    },
    "Picture Right Equal": {
        "canonical": "Text Left + Image Right",
        "slug": "text-left-image-right",
        "category": "visual",
        "description": "Equal split with text content on the left and image/photo on the right. The visual and text carry equal visual weight.",
        "usage": "Use for team introductions with photos, product images with descriptions, or any visual-text pairing where both sides are equally important.",
        "potential_usage": "Works for customer case study photos, product lifestyle imagery, or any content that benefits from a strong visual alongside the narrative.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "two-column", "team", "people", "sales"],
    },
    "Picture Left Wide": {
        "canonical": "Image Left + Text Right",
        "slug": "image-left-text-right",
        "category": "visual",
        "description": "Wide image panel on the left (larger than text area) with text content on the right. The image is dominant.",
        "usage": "Use when the visual is the primary communication element — large product screenshots, architectural diagrams, or impactful photography that needs to breathe.",
        "potential_usage": "Works for full-product-view screenshots, dramatic imagery, or any case where the visual should dominate the narrative.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "two-column", "product-overview", "sales"],
    },
    "Picture Right Wide": {
        "canonical": "Text Left + Image Right",
        "slug": "text-left-image-right",
        "category": "visual",
        "description": "Text content on the left with a wide image panel on the right (larger than text area). The image is dominant.",
        "usage": "Use when the visual is the primary communication element on the right side — large screenshots, product UIs, or impactful imagery that sets the mood.",
        "potential_usage": "Works for product showcase slides, dramatic visual statements, or any content where the right-side image dominates.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "two-column", "product-overview", "sales"],
    },
    "Picture Left One Third": {
        "canonical": "Image Left + Text Right",
        "slug": "image-left-text-right",
        "category": "visual",
        "description": "Narrow one-third image panel on the left with a wide text area on the right. The image is a supporting accent.",
        "usage": "Use when you want a visual accent alongside substantial text — a small product image, logo, or illustration that supports but doesn't dominate the content.",
        "potential_usage": "Works for partner/integration logos with descriptions, small illustrative images with long narrative, or icon-sized visuals with text.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "two-column", "narrative", "product-overview"],
    },
    "Picture Right One Third": {
        "canonical": "Text Left + Image Right",
        "slug": "text-left-image-right",
        "category": "visual",
        "description": "Wide text area on the left with a narrow one-third image panel on the right. The text is dominant with a visual accent.",
        "usage": "Use when you want a visual accent that supports substantial text — place a small product image, icon, or illustration on the right without overwhelming the content.",
        "potential_usage": "Works for narrative-heavy slides that benefit from a subtle visual reference, or for logo/brand accent alongside text.",
        "content_capacity": "medium",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 2,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "two-column", "narrative", "product-overview"],
    },
    "Picture Full Width": {
        "canonical": "Full Visual - Bleed",
        "slug": "full-visual-bleed",
        "category": "visual",
        "description": "Full-bleed image or visual that occupies the entire slide with minimal text overlay. Maximum visual impact.",
        "usage": "Use for hero statements, dramatic section openers, full-product screenshots, or any moment where the image should do all the talking.",
        "potential_usage": "Works for opening a section with a powerful visual, showing a city/event backdrop, or making an emotional impact before a key message.",
        "content_capacity": "light",
        "has_image_area": True,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["footer", "slide number"],
        "selection_tags": ["image", "full-bleed", "executive", "sales", "investor"],
    },
    "Thank You": {
        "canonical": "Closing - Thank You",
        "slug": "closing-thank-you",
        "category": "closing",
        "description": "Branded closing/thank you slide with CTA area. Matches the cover in branding. Always the last slide of any deck.",
        "usage": "Use as the final slide. Include a call to action, contact information, or next steps. Title = 'Thank You' or equivalent.",
        "potential_usage": "Can also be used as a Q&A invitation slide or a 'contact us' closing slide in sales contexts.",
        "content_capacity": "light",
        "has_image_area": False,
        "has_icon_area": False,
        "has_chart_area": False,
        "has_table_area": False,
        "column_count": 1,
        "do_not_modify": ["background image", "logo", "footer"],
        "selection_tags": ["closing", "executive", "sales", "investor", "product-overview"],
    },
}

# Slides that couldn't be perfectly matched (note for report)
IMPERFECT_MATCHES = {
    "Blank": "No direct 'blank' canonical layout — mapped to '1-Column Content' as closest functional equivalent",
    "Text 2x2": "No direct canonical match — 2x2 grid mapped to 'Icon Grid - 4 Column' (closest 4-item grid layout)",
    "Text 2x3": "No direct canonical match — 2x3 grid mapped to 'Icon Grid - 3 Column' (closest multi-cell grid layout)",
    "Two column": "Mapped to '2-Column Wide-Narrow'; actual template layout is equal-width without subtitle/column-title placeholders",
    "Picture Left Equal": "Multiple picture layouts mapped to same canonical — actual template distinguishes equal/wide/one-third variants",
    "Picture Right Equal": "Multiple picture layouts mapped to same canonical — actual template distinguishes equal/wide/one-third variants",
    "Picture Left Wide": "Multiple picture layouts mapped to same canonical — actual template distinguishes equal/wide/one-third variants",
    "Picture Right Wide": "Multiple picture layouts mapped to same canonical — actual template distinguishes equal/wide/one-third variants",
    "Picture Left One Third": "Multiple picture layouts mapped to same canonical — actual template distinguishes equal/wide/one-third variants",
    "Picture Right One Third": "Multiple picture layouts mapped to same canonical — actual template distinguishes equal/wide/one-third variants",
}


def default_image_slot_policy(layout_name, placeholders):
    image_placeholders = [ph for ph in placeholders if ph.get("type") in {"PICTURE", "CLIPART"}]
    if not image_placeholders:
        return []

    primary = image_placeholders[0]
    template_name = (layout_name or "").lower()
    ratio_class = "wide"
    if "equal" in template_name:
        ratio_class = "equal"
    elif "one third" in template_name:
        ratio_class = "one-third"
    elif "full width" in template_name:
        ratio_class = "full-width"

    if "screenshot" in template_name:
        return [{
            "placeholder_idx": primary.get("idx"),
            "placeholder_kind": "browser_frame",
            "allowed_asset_kinds": ["dalp_screenshot", "diagram", "generic_image"],
            "preferred_asset_kinds": ["dalp_screenshot"],
            "fit_mode_by_asset_kind": {"dalp_screenshot": "contain", "diagram": "contain", "generic_image": "cover"},
            "background_by_asset_kind": {"dalp_screenshot": "white", "diagram": "transparent", "generic_image": "transparent"},
            "round_corners": True,
            "corner_radius_px": 8,
            "aspect_ratio_class": "screenshot-browser-frame",
        }]

    return [{
        "placeholder_idx": primary.get("idx"),
        "placeholder_kind": "generic_image",
        "allowed_asset_kinds": ["generic_image", "diagram"],
        "preferred_asset_kinds": ["generic_image", "diagram"],
        "fit_mode_by_asset_kind": {"generic_image": "cover", "diagram": "contain"},
        "background_by_asset_kind": {"generic_image": "transparent", "diagram": "transparent"},
        "round_corners": True,
        "corner_radius_px": 8,
        "aspect_ratio_class": ratio_class,
    }]


def sanitize_slug(name):
    """Convert layout name to safe filename slug."""
    name = name.lower()
    name = re.sub(r'[^a-z0-9]+', '-', name)
    return name.strip('-')

def extract_slide_xml(temp_dir, slide_filename):
    """Read slide XML content."""
    slide_path = os.path.join(temp_dir, 'ppt', 'slides', slide_filename)
    if os.path.exists(slide_path):
        with open(slide_path, 'r', encoding='utf-8', errors='replace') as f:
            return f.read().strip()
    return ""

def parse_placeholders(slide_xml):
    """Extract placeholder info from slide XML."""
    placeholders = []
    elements = []
    word_counts = {}
    
    # Find all placeholder shapes
    ph_pattern = r'<p:ph(?:\s+[^/]*)?type="([^"]*)"(?:\s+[^/]*)?/?>|<p:ph(?:\s+[^/]*)?idx="([^"]*)"'
    # Better approach: find nvSpPr sections
    sp_pattern = re.compile(r'<p:sp>(.*?)</p:sp>', re.DOTALL)
    ph_type_pattern = re.compile(r'<p:ph[^>]*type="([^"]*)"')
    ph_idx_pattern = re.compile(r'<p:ph[^>]*idx="([^"]*)"')
    text_pattern = re.compile(r'<a:t>([^<]*)</a:t>')
    
    for sp_match in sp_pattern.finditer(slide_xml):
        sp_content = sp_match.group(1)
        
        # Check if it has a placeholder
        if '<p:ph' not in sp_content:
            continue
        
        type_match = ph_type_pattern.search(sp_content)
        idx_match = ph_idx_pattern.search(sp_content)
        
        ph_type_raw = type_match.group(1) if type_match else "body"
        ph_idx = int(idx_match.group(1)) if idx_match else 0
        
        # Normalize type
        type_map = {
            "title": "TITLE",
            "body": "BODY",
            "subTitle": "SUBTITLE",
            "sldNum": "SLIDE_NUMBER",
            "dt": "DATE",
            "ftr": "FOOTER",
            "pic": "PICTURE",
        }
        ph_type = type_map.get(ph_type_raw, ph_type_raw.upper())
        
        # Get text content
        texts = text_pattern.findall(sp_content)
        all_text = ' '.join(t for t in texts if t.strip())
        wc = len(all_text.split()) if all_text.strip() else 0
        
        key = f"{ph_type}_{ph_idx}"
        
        placeholders.append({"idx": ph_idx, "type": ph_type})
        elements.append({"type": ph_type, "idx": ph_idx, "word_count": wc})
        word_counts[key] = wc
    
    total_wc = sum(word_counts.values())
    return placeholders, elements, word_counts, total_wc

def get_placeholder_metadata(placeholders, layout_name):
    """Generate placeholder_summary, content_suggestions, and fill_hints."""
    mapping_data = LAYOUT_MAPPING.get(layout_name, {})
    canonical = mapping_data.get("canonical", layout_name)
    
    summary = {}
    suggestions = {}
    hints = {}
    
    for ph in placeholders:
        idx = ph["idx"]
        ph_type = ph["type"]
        key = f"{ph_type}_{idx}"
        
        if ph_type == "TITLE":
            summary[key] = "Main slide title — states the key message or topic"
            suggestions[key] = f"Slide title (3–8 words describing {canonical})"
            hints[key] = "~3–10 words"
        elif ph_type == "SUBTITLE":
            summary[key] = "Subtitle — supporting text below the main title"
            suggestions[key] = "Subtitle or tagline (1–2 lines)"
            hints[key] = "~5–20 words"
        elif ph_type == "BODY":
            if idx == 11:
                # Cover slide subtitle
                summary[key] = "Subtitle, date, presenter name, or event description"
                suggestions[key] = "Subtitle text, date, or event name (1–2 lines)"
                hints[key] = "~5–20 words"
            else:
                summary[key] = "Main content area — bullets, paragraphs, or structured content"
                suggestions[key] = "Body content (bullets or paragraphs)"
                hints[key] = "~30–80 words"
        elif ph_type == "PICTURE":
            summary[key] = "Image placeholder — insert a screenshot, photo, or diagram"
            suggestions[key] = "Insert product screenshot, diagram, or photo"
            hints[key] = "Replace with image file"
        elif ph_type == "SLIDE_NUMBER":
            summary[key] = "Auto-generated slide number footer (do not edit)"
            suggestions[key] = "Auto-populated — do not modify"
            hints[key] = "Do not modify"
        elif ph_type == "DATE":
            summary[key] = "Date placeholder (do not edit manually)"
            suggestions[key] = "Auto-populated or leave blank"
            hints[key] = "Do not modify"
        elif ph_type == "FOOTER":
            summary[key] = "Footer text (do not edit)"
            suggestions[key] = "Auto-populated — do not modify"
            hints[key] = "Do not modify"
        else:
            summary[key] = f"Content placeholder ({ph_type})"
            suggestions[key] = "Content for this area"
            hints[key] = "~10–50 words"
    
    return summary, suggestions, hints

def create_single_slide_pptx(temp_dir, slide_filename, output_path, slide_rid):
    """Create a PPTX file containing only one slide."""
    
    media_files = []
    media_dir = os.path.join(temp_dir, 'ppt', 'media')
    if os.path.exists(media_dir):
        for f in os.listdir(media_dir):
            media_files.append(f'ppt/media/{f}')
    
    layout_files = []
    layouts_dir = os.path.join(temp_dir, 'ppt', 'slideLayouts')
    if os.path.exists(layouts_dir):
        for f in os.listdir(layouts_dir):
            if f.endswith('.xml') and not f.startswith('_'):
                layout_files.append(f'ppt/slideLayouts/{f}')
        layout_rels_dir = os.path.join(temp_dir, 'ppt', 'slideLayouts', '_rels')
        if os.path.exists(layout_rels_dir):
            for f in os.listdir(layout_rels_dir):
                if f.endswith('.rels'):
                    layout_files.append(f'ppt/slideLayouts/_rels/{f}')
    
    sm_files = []
    sm_dir = os.path.join(temp_dir, 'ppt', 'slideMasters')
    if os.path.exists(sm_dir):
        for f in os.listdir(sm_dir):
            if f.endswith('.xml') and not f.startswith('_'):
                sm_files.append(f'ppt/slideMasters/{f}')
        sm_rels_dir = os.path.join(temp_dir, 'ppt', 'slideMasters', '_rels')
        if os.path.exists(sm_rels_dir):
            for f in os.listdir(sm_rels_dir):
                if f.endswith('.rels'):
                    sm_files.append(f'ppt/slideMasters/_rels/{f}')
    
    theme_files = []
    theme_dir = os.path.join(temp_dir, 'ppt', 'theme')
    if os.path.exists(theme_dir):
        for f in os.listdir(theme_dir):
            if f.endswith('.xml'):
                theme_files.append(f'ppt/theme/{f}')
    
    base_files = [
        '[Content_Types].xml',
        '_rels/.rels',
        'ppt/presentation.xml',
        'ppt/_rels/presentation.xml.rels',
    ]
    
    for extra in ['docProps/core.xml', 'docProps/app.xml']:
        full = os.path.join(temp_dir, extra.replace('/', os.sep))
        if os.path.exists(full):
            base_files.append(extra)
    
    files_to_include = base_files + theme_files + sm_files + layout_files + media_files
    
    files_to_include.append(f'ppt/slides/{slide_filename}')
    slide_rels = f'ppt/slides/_rels/{slide_filename}.rels'
    slide_rels_path = os.path.join(temp_dir, slide_rels.replace('/', os.sep))
    if os.path.exists(slide_rels_path):
        files_to_include.append(slide_rels)
    
    pres_path = os.path.join(temp_dir, 'ppt', 'presentation.xml')
    pres_rels_path = os.path.join(temp_dir, 'ppt', '_rels', 'presentation.xml.rels')
    
    with open(pres_path, 'r') as f:
        pres_content = f.read()
    
    pres_content = re.sub(r'<p:sldIdLst>.*?</p:sldIdLst>', '', pres_content)
    sld_id_list = f'<p:sldIdLst><p:sldId id="256" r:id="{slide_rid}"/></p:sldIdLst>'
    pres_content = pres_content.replace('</p:sldMasterIdLst>', f'</p:sldMasterIdLst>{sld_id_list}')
    
    if 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"' not in pres_content:
        pres_content = pres_content.replace('<p:presentation', '<p:presentation xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"')
    
    with open(pres_path, 'w') as f:
        f.write(pres_content)
    
    # Find theme relationship
    theme_rid = "rId1"
    with open(pres_rels_path, 'r') as f:
        existing_rels = f.read()
    theme_match = re.search(r'Id="(rId\d+)"[^>]*relationships/theme', existing_rels)
    if theme_match:
        theme_rid = theme_match.group(1)
    
    sm_rid = "rId2"
    sm_match = re.search(r'Id="(rId\d+)"[^>]*relationships/slideMaster', existing_rels)
    if sm_match:
        sm_rid = sm_match.group(1)
    
    # Find theme filename
    theme_filename = "theme1.xml"
    theme_match2 = re.search(r'relationships/theme"[^>]*Target="theme/([^"]+)"', existing_rels)
    if theme_match2:
        theme_filename = theme_match2.group(1)
    
    new_rels_content = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="{theme_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/{theme_filename}"/>
  <Relationship Id="{sm_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  <Relationship Id="{slide_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/{slide_filename}"/>
</Relationships>'''
    
    with open(pres_rels_path, 'w') as f:
        f.write(new_rels_content)
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path in files_to_include:
            full_path = os.path.join(temp_dir, file_path.replace('/', os.sep))
            if os.path.exists(full_path):
                zipf.write(full_path, file_path)

def rebuild_slide_bank():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    removed_files = []
    extracted_count = 0
    json_count = 0
    imperfect = []
    
    # STEP 1: Remove old duplicate/artefact files
    old_patterns = [
        'slide-05-1_single-column',
        'slide-24-2_title',
    ]
    for fname in os.listdir(OUTPUT_DIR):
        base = fname.rsplit('.', 1)[0]
        if any(base == pat for pat in old_patterns):
            fpath = os.path.join(OUTPUT_DIR, fname)
            os.remove(fpath)
            removed_files.append(fname)
            print(f"  Removed artefact: {fname}")
    
    # STEP 2: Extract template
    print(f"\nExtracting template...")
    with tempfile.TemporaryDirectory() as temp_dir:
        with zipfile.ZipFile(TEMPLATE_PATH, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        # Read slide order from presentation rels
        pres_rels_path = os.path.join(temp_dir, 'ppt', '_rels', 'presentation.xml.rels')
        with open(pres_rels_path, 'r') as f:
            pres_rels_content = f.read()
        
        # Build rid -> slide_num map
        rid_to_slide = {}
        for rid, num in re.findall(r'<Relationship Id="(rId\d+)" Type="[^"]*relationships/slide" Target="slides/slide(\d+)\.xml"', pres_rels_content):
            rid_to_slide[rid] = int(num)
        
        # Get ordered slide list from presentation.xml
        pres_xml_path = os.path.join(temp_dir, 'ppt', 'presentation.xml')
        with open(pres_xml_path, 'r') as f:
            pres_xml = f.read()
        
        # r:id is used in this template (not r:rid)
        sld_ids = re.findall(r'<p:sldId[^>]* r:id="(rId\d+)"', pres_xml)
        if not sld_ids:
            sld_ids_full = re.findall(r'<p:sldId[^>]* id="(\d+)"[^>]* r:rid="(rId\d+)"', pres_xml)
            sld_ids = [rid for _, rid in sld_ids_full]
        
        # Build ordered slide list
        ordered_slides = []
        if sld_ids:
            for rid in sld_ids:
                if rid in rid_to_slide:
                    ordered_slides.append((rid, rid_to_slide[rid]))
        else:
            # Fall back to sorted order
            for rid, num in sorted(rid_to_slide.items(), key=lambda x: x[1]):
                ordered_slides.append((rid, num))
        
        print(f"  Found {len(ordered_slides)} slides in presentation order")
        
        # Get layout names for each slide
        for idx, (rid, slide_num) in enumerate(ordered_slides, 1):
            slide_filename = f"slide{slide_num}.xml"
            slide_rels_file = os.path.join(temp_dir, 'ppt', 'slides', '_rels', f'{slide_filename}.rels')
            
            layout_name = "Unknown"
            if os.path.exists(slide_rels_file):
                with open(slide_rels_file, 'r') as f:
                    slide_rels_xml = f.read()
                layout_match = re.search(r'Target="\.\./slideLayouts/slideLayout(\d+)\.xml"', slide_rels_xml)
                if layout_match:
                    layout_num = layout_match.group(1)
                    layout_file = os.path.join(temp_dir, 'ppt', 'slideLayouts', f'slideLayout{layout_num}.xml')
                    if os.path.exists(layout_file):
                        with open(layout_file, 'r') as f:
                            layout_xml = f.read()
                        name_match = re.search(r'<p:cSld[^>]*name=["\']([^"\']*)["\']', layout_xml)
                        if name_match:
                            layout_name = name_match.group(1)
            
            if layout_name in REMOVED_LAYOUTS:
                print(f"  [{idx:02d}] slide{slide_num} ({layout_name}) -> skipped (removed layout)")
                continue

            # Determine output filename using stable legacy slide ids
            layout_slug = sanitize_slug(layout_name)
            legacy_slide_number = LEGACY_SLIDE_NUMBERS.get(layout_name, idx)
            output_filename = f"slide-{legacy_slide_number:03d}-{layout_slug}.pptx"
            output_path = os.path.join(OUTPUT_DIR, output_filename)
            
            print(f"  [{idx:02d}] slide{slide_num} ({layout_name}) -> {output_filename}")
            
            # Extract slide XML for info JSON
            slide_xml = extract_slide_xml(temp_dir, slide_filename)
            
            # Parse placeholders
            placeholders, elements, word_counts, total_wc = parse_placeholders(slide_xml)
            
            # Create PPTX
            create_single_slide_pptx(temp_dir, slide_filename, output_path, rid)
            extracted_count += 1
            
            # Build info JSON
            mapping = LAYOUT_MAPPING.get(layout_name, {})
            canonical_name = mapping.get("canonical", layout_name)
            canonical_slug = mapping.get("slug", layout_slug)
            
            if layout_name in IMPERFECT_MATCHES:
                imperfect.append(f"  Slide {idx:02d} '{layout_name}': {IMPERFECT_MATCHES[layout_name]}")
            
            placeholder_summary, content_suggestions, fill_hints = get_placeholder_metadata(placeholders, layout_name)
            
            info = {
                "slide_number": legacy_slide_number,
                "filename": output_filename,
                "layout_name": canonical_name,
                "layout_slug": canonical_slug,
                "template_layout_name": layout_name,
                "template_layout_slug": layout_slug,
                "layout_category": mapping.get("category", "content"),
                "description": mapping.get("description", f"Slide layout: {layout_name}"),
                "usage": mapping.get("usage", ""),
                "potential_usage": mapping.get("potential_usage", ""),
                "content_capacity": mapping.get("content_capacity", "medium"),
                "has_image_area": mapping.get("has_image_area", False),
                "has_icon_area": mapping.get("has_icon_area", False),
                "has_chart_area": mapping.get("has_chart_area", False),
                "has_table_area": mapping.get("has_table_area", False),
                "column_count": mapping.get("column_count", 1),
                "placeholders": placeholders,
                "elements": elements,
                "word_counts": word_counts,
                "total_word_count": total_wc,
                "placeholder_summary": placeholder_summary,
                "content_suggestions": content_suggestions,
                "fill_hints": fill_hints,
                "do_not_modify": mapping.get("do_not_modify", ["footer", "slide number"]),
                "selection_tags": mapping.get("selection_tags", []),
                "image_slot_policy": mapping.get("image_slot_policy", default_image_slot_policy(layout_name, placeholders)),
                "slide_xml": slide_xml,
            }
            
            json_filename = output_filename.replace('.pptx', '.info.json')
            json_path = os.path.join(OUTPUT_DIR, json_filename)
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(info, f, indent=2, ensure_ascii=False)
            json_count += 1
    
    # STEP 3: Remove old non-matching files (from previous extraction run with different names)
    current_basenames = set()
    for fname in os.listdir(OUTPUT_DIR):
        if fname.endswith('.pptx') or fname.endswith('.info.json'):
            base = fname.rsplit('.', 1)[0] if fname.endswith('.json') else fname[:-5]
            # New files follow slide-NN-slug pattern
            if re.match(r'slide-\d{3}-[a-z0-9-]+', fname):
                # Check if it's from the new run (matches an extracted slide)
                current_basenames.add(fname.rsplit('.', 1)[0] if '.' in fname else fname)
    
    # Find orphan files (old names that weren't regenerated)
    new_slugs = set()
    for fname in os.listdir(OUTPUT_DIR):
        if fname.endswith('.pptx') and re.match(r'slide-\d{3}-', fname):
            new_slugs.add(fname[:-5])  # without .pptx
    
    # Check for old files that don't match new slugs
    for fname in list(os.listdir(OUTPUT_DIR)):
        if fname in ['README.md']:
            continue
        if not (fname.endswith('.pptx') or fname.endswith('.info.json')):
            continue
        
        base = fname.rsplit('.info.json', 1)[0] if fname.endswith('.info.json') else fname.rsplit('.pptx', 1)[0]
        
        if base not in new_slugs and base not in removed_files:
            fpath = os.path.join(OUTPUT_DIR, fname)
            os.remove(fpath)
            removed_files.append(fname)
            print(f"  Removed old file: {fname}")
    
    # STEP 4: Build REGISTRY.json (single canonical source)
    print(f"\nBuilding REGISTRY.json...")
    all_info = []
    for fname in os.listdir(OUTPUT_DIR):
        if fname.endswith(".info.json"):
            fpath = os.path.join(OUTPUT_DIR, fname)
            with open(fpath, "r", encoding="utf-8") as f:
                all_info.append(json.load(f))
    all_info.sort(key=lambda x: x.get("slide_number", 0))
    registry = {
        "version": 2,
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "template_source": TEMPLATE_PATH,
        "slide_count": len(all_info),
        "slides": all_info,
    }
    registry_path = os.path.join(OUTPUT_DIR, "REGISTRY.json")
    registry_tmp = registry_path + ".tmp"
    with open(registry_tmp, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)
    os.replace(registry_tmp, registry_path)
    print(f"  Registry written: {registry_path} ({len(all_info)} slides)")

    # SUMMARY
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Slides extracted:    {extracted_count}")
    print(f"Info JSONs created:  {json_count}")
    print(f"Files removed:       {len(removed_files)}")
    if removed_files:
        for f in removed_files:
            print(f"  - {f}")
    
    print(f"\nSlides not perfectly matched to canonical 36 layouts:")
    if imperfect:
        for note in imperfect:
            print(note)
    else:
        print("  None")
    
    print(f"\nDone! Slide bank at: {OUTPUT_DIR}/")

if __name__ == '__main__':
    rebuild_slide_bank()
