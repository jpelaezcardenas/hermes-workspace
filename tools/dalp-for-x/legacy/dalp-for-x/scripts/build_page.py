#!/usr/bin/env python3
"""
HubSpot DALP For-X Page Builder
================================
Builds and publishes "DALP for [Audience/Market]" pages on HubSpot.
All pages are automatically attached to the "For X Pages" campaign
(ID: d6429a6a-2590-4ac3-8f26-e005487c6b86).

Usage:
  python3 build_page.py --page-id 383121354994 --content content/banks.json
  python3 build_page.py --create --slug for/insurance --content content/insurance.json

Template: Marketplace/One_Elements child-theme/templates/One - Competitors Comparison.html
Template ID: 382464945387

Sections: 1, 2, 3, 4, 5, 6, 7
"""

import os, sys, json, argparse, re
import urllib.request, urllib.error

TOKEN = os.environ.get("HUBSPOT_ACCESS_TOKEN", "")
PORTAL = "8639589"
BASE_URL = "https://api.hubapi.com"
TEMPLATE_PATH = "Marketplace/One_Elements child-theme/templates/One - Competitors Comparison.html"
CAMPAIGN_ID = "d6429a6a-2590-4ac3-8f26-e005487c6b86"  # For X Pages campaign

# Module IDs (verified from live portal)
MOD_EYEBROW      = 374272770289
MOD_RICHTEXT     = 1155639
MOD_BUTTONS      = 362517245155
MOD_LIST_ITEMS   = 362517245149
MOD_CARDS_GRID   = 376294640884
MOD_ACCORDION    = 61991970375
MOD_DIVIDER      = 362496925910

TICK_ICON = {
    "alt": "checkmark",
    "height": 30,
    "loading": "disabled",
    "size_type": "exact",
    "src": "https://8639589.fs1.hubspotusercontent-eu1.net/hubfs/8639589/Icons/Tick_icon_blue.png",
    "width": 30
}

def api(method, path, body=None):
    url = BASE_URL + path
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    })
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        err = json.loads(e.read())
        print(f"API ERROR {e.code}: {err.get('message','')}")
        sys.exit(1)

def widget(name, label, mod_id, params, w=12, x=0):
    return {
        "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
        "label": label, "name": name,
        "params": {"css_class": "dnd-module", "module_id": mod_id, "schema_version": 2, **params},
        "rowMetaData": [], "rows": [],
        "type": "custom_widget", "w": w, "x": x
    }

def col(name, w, x, widget_list):
    """widget_list: list of widgets. Each widget gets its own row, always keyed '0'."""
    rows = [{"0": wgt} for wgt in widget_list]
    return {
        "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
        "name": name,
        "params": {"css_class": "dnd-column"},
        "rowMetaData": [{"cssClass": "dnd-row"}],
        "rows": rows,
        "type": "cell", "w": w, "x": x
    }

def section(name, row_meta, cols_dict):
    """cols_dict: {str(x): col_object} — keys MUST equal column x values"""
    return {
        "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
        "label": name, "name": name, "params": {},
        "rowMetaData": row_meta,
        "rows": [cols_dict]
    }

def padding_meta(bg=None, top_d=80, bot_d=80, top_m=80, bot_m=64):
    styles = {
        "breakpointStyles": {
            "default": {"padding": {"bottom": {"units": "px", "value": bot_d}, "top": {"units": "px", "value": top_d}}},
            "mobile":  {"padding": {"bottom": {"units": "px", "value": bot_m},  "top": {"units": "px", "value": top_m}}}
        }
    }
    if bg:
        styles["backgroundColor"] = bg
    return [{"cssClass": "dnd-section", "styles": styles}]

def build_list_item(text):
    return {
        "text": f'<p style="font-weight: 500;">{text}</p>',
        "icon": TICK_ICON,
        "icon_color": {"color": "#2253FF", "opacity": 100},
        "icon_field": {"name": "check", "type": "SOLID", "unicode": "f00c"},
        "icon_size": 20,
        "type_icon": "image"
    }

def mk_button_item(text, href, cls="btn-primary-dark"):
    return {
        "button_text": text,
        "link_field": {"url": {"href": href}, "no_follow": False, "open_in_new_tab": False},
        "class_button": cls,
        "enable_icon": "right_icon",
        "icon_field": {"name": "arrow-right", "type": "REGULAR", "unicode": "f061"},
        "icon_color": {"color": "#FFFFFF", "opacity": 100},
        "icon_color_hover": {"color": "#FFFFFF", "opacity": 100},
        "icon_size_button": 12,
        "display_options": {"enable_on_desktop": True, "enable_on_mobile": True, "enable_on_tablet": True}
    }

def build_sections(c):
    """Build all 5 sections from content dict `c`."""

    # ── SECTION 1: Hero ──────────────────────────────────────────────────────
    s1_eyebrow = widget("widget_tokeny_hero_eyebrow", "Eyebrow Heading", MOD_EYEBROW, {
        "eyebrow_text": c["hero"]["eyebrow"],
        "eyebrow_color": {"color": "#000017", "opacity": 100},
        "heading_text": c["hero"]["h1"],
        "heading_color": {"color": "#000000", "opacity": 100}
    })
    s1_richtext = widget("widget_tokeny_hero_richtext", "Rich Text", MOD_RICHTEXT, {
        "html": f'<p style="color: #4C4C4C;">{c["hero"]["intro"]}</p>'
    })
    s1_button = widget("widget_tokeny_hero_button", "One - Buttons", MOD_BUTTONS, {
        "settings": {"button_align_desktop": "left", "button_align_mobile": "left"},
        "button": [mk_button_item(c["hero"]["cta_text"], c["hero"]["cta_href"], "btn-primary-dark")]
    })
    sec1 = section("section-1",
        padding_meta(top_d=80, bot_d=48, top_m=48, bot_m=40),
        {"0": col("section-1-col", 12, 0, [s1_eyebrow, s1_richtext, s1_button])}
    )

    # ── SECTION 2: Comparison Table ──────────────────────────────────────────
    s2_eyebrow = widget("widget_tokeny_table_heading", "Eyebrow Heading", MOD_EYEBROW, {
        "eyebrow_text": c["table"]["eyebrow"],
        "eyebrow_color": {"color": "#4c4c4c", "opacity": 100},
        "heading_text": c["table"]["heading"],
        "heading_color": {"color": "#000000", "opacity": 100}
    })
    s2_table = widget("widget_tokeny_table_richtext", "Rich Text", MOD_RICHTEXT, {
        "html": c["table"]["html"]
    })
    sec2 = section("section-2",
        padding_meta(),
        {"0": col("section-2-col", 12, 0, [s2_eyebrow, s2_table])}
    )

    # ── SECTION 3: Why Choose DALP (light grey #F7F8F8) ─────────────────────
    s3_eyebrow = widget("widget_tokeny_reasons_heading", "Eyebrow Heading", MOD_EYEBROW, {
        "eyebrow_text": c["reasons"]["eyebrow"],
        "eyebrow_color": {"color": "#4c4c4c", "opacity": 100},
        "heading_text": c["reasons"]["heading"],
        "heading_color": {"color": "#000017", "opacity": 100}
    })
    s3_intro = widget("widget_tokeny_reasons_intro", "Rich Text", MOD_RICHTEXT, {
        "html": f'<p style="color: #4c4c4c;">{c["reasons"]["intro"]}</p>'
    })
    s3_cards = widget("widget_tokeny_reasons_cards", "One - Cards - Grid", MOD_CARDS_GRID, {
        "full_width": True,
        "spacing": {"padding_bottom": 0, "padding_left": 0, "padding_right": 0, "padding_top": 0},
        "style": {
            "background_color": {"color": "#FFFFFF", "opacity": 0},
            "number_color": {"color": "#000017"},
            "description_color": {"color": "#4C4C4C"}
        },
        "items": [{"number_text": card["title"], "description": f"<p>{card['body']}</p>",
                   "cta_text": "", "cta_link": {"no_follow": False, "open_in_new_tab": False, "url": {"href": ""}}}
                  for card in c["reasons"]["cards"]]
    })
    sec3 = section("section-3",
        padding_meta(bg={"r": 247, "g": 248, "b": 248, "a": 1}),
        {"0": col("section-3-col", 12, 0, [s3_eyebrow, s3_intro, s3_cards])}
    )

    # ── SECTION 4: Key Differentiators (two columns) ─────────────────────────
    s4_eyebrow = widget("widget_tokeny_diff_heading", "Eyebrow Heading", MOD_EYEBROW, {
        "eyebrow_text": c["differentiators"]["eyebrow"],
        "eyebrow_color": {"color": "#4c4c4c", "opacity": 100},
        "heading_text": c["differentiators"]["heading"],
        "heading_color": {"color": "#000017", "opacity": 100}
    })
    s4_list = widget("widget_tokeny_diff_list", "One - List Items", MOD_LIST_ITEMS, {
        "items": [build_list_item(item) for item in c["differentiators"]["items"]]
    })
    sec4 = section("section-4",
        padding_meta(),
        {
            "0": col("section-4-col-left",  5, 0, [s4_eyebrow]),
            "6": col("section-4-col-right", 6, 6, [s4_list])
        }
    )

    # ── SECTION 6: CTA (navy, 150px padding) ─────────────────────────────────
    s6_h2 = widget("widget_tokeny_ctah2_heading", "Rich Text", MOD_RICHTEXT, {
        "html": f'<h2 style="margin-bottom: 24px; color: #ffffff;">{c["cta"]["h2"]}</h2>'
    })
    s6_text = widget("widget_tokeny_ctah2_subtext", "Rich Text", MOD_RICHTEXT, {
        "html": f'<p style="color: #e0e0e0;">{c["cta"]["body"]}</p>'
    })
    s6_button = widget("widget_tokeny_ctah2_buttons", "One - Buttons", MOD_BUTTONS, {
        "settings": {"button_align_desktop": "left", "button_align_mobile": "left"},
        "button": [mk_button_item(c["cta"]["button_text"], c["cta"]["button_href"], "btn-secondary-dark")]
    })
    sec6 = section("section-6",
        padding_meta(bg={"r": 0, "g": 0, "b": 72, "a": 1}, top_d=150, bot_d=150, top_m=88, bot_m=80),
        {
            "0": col("section-6-col-left",  8, 0, [s6_h2, s6_text]),
            "8": col("section-6-col-right", 4, 8, [s6_button])
        }
    )

    # ── SECTION 5: Divider ───────────────────────────────────────────────────
    s5_divider = widget("widget_tokeny_divider", "One - Divider", MOD_DIVIDER, {})
    sec5 = section("section-5",
        padding_meta(top_d=1, bot_d=1, top_m=0, bot_m=0),
        {"0": col("section-5-col", 12, 0, [s5_divider])}
    )

    # ── SECTION 6: FAQ ────────────────────────────────────────────────────────
    s6_eyebrow = widget("widget_tokeny_faq_heading", "Eyebrow Heading", MOD_EYEBROW, {
        "eyebrow_text": c["faq"].get("eyebrow", ""),
        "eyebrow_color": {"color": "#4c4c4c", "opacity": 100},
        "heading_text": c["faq"].get("heading", "Frequently Asked Questions"),
        "heading_color": {"color": "#000000", "opacity": 100}
    })
    s6_accordion = widget("widget_tokeny_faq_accordion", "Accordion Toggle", MOD_ACCORDION, {
        "accordions": [{"title": item["q"], "content": f"<p>{item['a']}</p>", "open_by_default": False}
                       for item in c["faq"]["items"]]
    })
    sec6 = section("section-6",
        padding_meta(top_d=80, bot_d=80, top_m=64, bot_m=64),
        {"0": col("section-6-col", 12, 0, [s6_eyebrow, s6_accordion])}
    )

    # ── SECTION 7: CTA (navy, 80px) ──────────────────────────────────────────
    s7_h2 = widget("widget_tokeny_ctah2_heading", "Rich Text", MOD_RICHTEXT, {
        "html": f'<h2 style="margin-bottom: 24px; color: #ffffff;">{c["cta"]["h2"]}</h2>'
    })
    s7_text = widget("widget_tokeny_ctah2_subtext", "Rich Text", MOD_RICHTEXT, {
        "html": f'<p style="color: #e0e0e0;">{c["cta"]["body"]}</p>'
    })
    s7_button = widget("widget_tokeny_ctah2_buttons", "One - Buttons", MOD_BUTTONS, {
        "settings": {"button_align_desktop": "left", "button_align_mobile": "left"},
        "button": [mk_button_item(c["cta"]["button_text"], c["cta"]["button_href"], "btn-secondary-dark")]
    })
    sec7 = section("section-7",
        padding_meta(bg={"r": 0, "g": 0, "b": 72, "a": 1}, top_d=80, bot_d=80, top_m=64, bot_m=64),
        {
            "0": col("section-7-col-left",  8, 0, [s7_h2, s7_text]),
            "8": col("section-7-col-right", 4, 8, [s7_button])
        }
    )

    return {
        "section-1": sec1,
        "section-2": sec2,
        "section-3": sec3,
        "section-4": sec4,
        "section-5": sec5,
        "section-6": sec6,
        "section-7": sec7,
    }

def validate(sections):
    errors = []
    expected = {"section-1", "section-2", "section-3", "section-4", "section-5", "section-6", "section-7"}
    if set(sections.keys()) != expected:
        errors.append(f"Wrong sections: {set(sections.keys())} (expected {expected})")

    def check_section_row(row_dict, path):
        """The top-level row of a section maps column x → column. Keys must equal column x values."""
        for key, v in row_dict.items():
            if isinstance(v, dict) and v.get("params", {}).get("css_class") == "dnd-column":
                col_x = v.get("x", 0)
                if key != str(col_x):
                    errors.append(f"Section row at {path}: col x={col_x} has key '{key}' (must be '{col_x}')")
                # Check widget rows inside the column — each must have exactly key '0'
                for wrow in v.get("rows", []):
                    if isinstance(wrow, dict):
                        for wkey, wval in wrow.items():
                            if isinstance(wval, dict) and wval.get("type") == "custom_widget":
                                if wkey != "0":
                                    errors.append(f"Widget row at {path} col x={col_x}: widget key '{wkey}' must be '0'")

    def check_widgets(obj, path="", in_section_row=False):
        if isinstance(obj, dict):
            if obj.get("type") == "custom_widget":
                w, x = obj.get("w"), obj.get("x")
                if w != 12 or x != 0:
                    errors.append(f"Widget {obj.get('name','?')} at {path}: w={w} x={x} (must be 12/0)")
            # Section-level rows (direct children of section.rows[]) map col_x → col
            if obj.get("label") in ["section-1","section-2","section-3","section-4","section-6"] or \
               obj.get("name","").startswith("section-"):
                for row in obj.get("rows", []):
                    if isinstance(row, dict):
                        check_section_row(row, f"{path}.rows")
            for k, v in obj.items():
                check_widgets(v, f"{path}.{k}")
        elif isinstance(obj, list):
            for i, v in enumerate(obj):
                check_widgets(v, f"{path}[{i}]")

    for sname, sec in sections.items():
        check_widgets(sec, sname)

    # Check backgrounds
    s3_bg = sections["section-3"]["rowMetaData"][0]["styles"].get("backgroundColor", {})
    if s3_bg.get("r") != 247:
        errors.append(f"section-3 wrong bg: {s3_bg}")
    s7_bg = sections["section-7"]["rowMetaData"][0]["styles"].get("backgroundColor", {})
    if s7_bg.get("b") != 72:
        errors.append(f"section-7 wrong bg: {s7_bg}")

    return errors

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--page-id", help="HubSpot page ID to update")
    parser.add_argument("--create", action="store_true", help="Create new page")
    parser.add_argument("--slug", help="Slug for new page (e.g. compare/polymath)")
    parser.add_argument("--content", required=True, help="Path to content JSON file")
    parser.add_argument("--dry-run", action="store_true", help="Print sections without patching")
    args = parser.parse_args()

    if not TOKEN:
        print("ERROR: HUBSPOT_ACCESS_TOKEN not set")
        sys.exit(1)

    with open(args.content) as f:
        content = json.load(f)

    print(f"Building sections for: {content.get('meta', {}).get('title', 'unknown')}")
    sections = build_sections(content)

    print("Validating...")
    errors = validate(sections)
    if errors:
        print("VALIDATION FAILED:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    print("Validation passed.")

    if args.dry_run:
        print(json.dumps({"layoutSections": sections}, indent=2)[:2000])
        print("(dry run — not patching)")
        return

    body = {
        "layoutSections": sections,
        "htmlTitle": content["meta"]["html_title"],
        "metaDescription": content["meta"]["meta_description"],
        "linkRelCanonicalUrl": content["meta"]["canonical_url"],
        "campaign": CAMPAIGN_ID,
    }

    if len(body["metaDescription"]) > 155:
        print(f"WARNING: metaDescription is {len(body['metaDescription'])} chars (max 155)")

    if args.create:
        body["name"] = content["meta"]["name"]
        body["slug"] = args.slug or content["meta"]["slug"]
        body["templatePath"] = TEMPLATE_PATH
        result = api("POST", "/cms/v3/pages/site-pages", body)
        page_id = result["id"]
        print(f"CREATED page ID: {page_id}")
    else:
        page_id = args.page_id
        result = api("PATCH", f"/cms/v3/pages/site-pages/{page_id}", body)
        print(f"UPDATED page ID: {page_id}")

    print(f"State: {result.get('state')}")
    print(f"Updated: {result.get('updatedAt')}")
    print(f"Sections: {list(result.get('layoutSections', {}).keys())}")
    print(f"Editor: https://app-eu1.hubspot.com/pages/{PORTAL}/editor/{page_id}")

if __name__ == "__main__":
    main()
