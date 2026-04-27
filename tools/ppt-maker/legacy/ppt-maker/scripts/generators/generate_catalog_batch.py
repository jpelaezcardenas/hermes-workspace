#!/usr/bin/env python3
"""
Generate recipe batches and add them to CATALOG.json.
Each recipe is a declarative list of shapes with positions.

Usage: python3 scripts/generate_catalog_batch.py <batch_number>
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = ROOT / "blank-recipes" / "CATALOG.json"

# ─── Design system constants ───
C = {
    "title": "0000FF", "body": "000000", "accent1": "000099",
    "accent1_tint": "3333BB", "accent3": "0000ED", "gray": "E8E8E8",
    "white": "FFFFFF", "green": "037352", "orange": "E47C48",
    "gold": "DBB70F", "purple": "904EFF"
}
FONT = "Figtree"
# Content area: x=0.50 to 12.85, y=1.35 to 6.60
CX, CY, CW, CH = 0.50, 1.35, 12.35, 5.25


def text_style(color="000000", size=11, bold=False, align="left", valign="top"):
    return {"fill": "none", "line": "none", "color": color, "font": FONT,
            "font_size": size, "bold": bold, "align": align, "valign": valign, "autoFit": "shape"}


def card_style(fill="FFFFFF", border="E8E8E8"):
    return {"fill": fill, "line": border}


def bar_style(fill="000099"):
    return {"fill": fill, "line": fill}


def repeat_h(prefix, max_count, item_w, item_h, h_gap=0.20, center_h=True, center_v=False, start_y=CY):
    return {"prefix": prefix, "max_count": max_count, "direction": "horizontal",
            "start_x_in": CX, "start_y_in": start_y,
            "item_width_in": item_w, "item_height_in": item_h,
            "h_gap_in": h_gap, "v_gap_in": 0,
            "available_width_in": CW, "available_height_in": CH,
            "center_h": center_h, "center_v": center_v}


def repeat_v(prefix, max_count, item_w, item_h, v_gap=0.10, center_v=True):
    return {"prefix": prefix, "max_count": max_count, "direction": "vertical",
            "start_x_in": CX, "start_y_in": CY,
            "item_width_in": item_w, "item_height_in": item_h,
            "h_gap_in": 0, "v_gap_in": v_gap,
            "available_width_in": CW, "available_height_in": CH,
            "center_h": False, "center_v": center_v}


def repeat_grid(prefix, max_count, item_w, item_h, cols, h_gap=0.20, v_gap=0.40):
    return {"prefix": prefix, "max_count": max_count, "direction": "grid",
            "start_x_in": CX, "start_y_in": CY,
            "item_width_in": item_w, "item_height_in": item_h,
            "h_gap_in": h_gap, "v_gap_in": v_gap, "cols": cols,
            "available_width_in": CW, "available_height_in": CH,
            "center_h": True, "center_v": True}


def static(role, preset, x, y, w, h, style, content=None):
    s = {"type": "shape", "role": role, "preset": preset,
         "position": {"x_in": x, "y_in": y, "width_in": w, "height_in": h},
         "style": style}
    if content:
        s["content"] = content
    return s


def connector(role, x, y, w, h=0, style=None):
    if style is None:
        style = {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}
    return {"type": "connector", "role": role, "preset": "straight",
            "position": {"x_in": x, "y_in": y, "width_in": w, "height_in": h},
            "style": style}


def sub(role, preset, ox, oy, w, h, style, content=None):
    s = {"role": role, "preset": preset, "offset_x_in": ox, "offset_y_in": oy,
         "width_in": w, "height_in": h, "style": style}
    if content:
        s["content"] = content
    return s


# ─── Batch definitions ───

def batch2():
    """Data & Numbers + Process extras"""
    return {
        "metric-dashboard": {
            "category": "data-numbers",
            "description": "2x2 grid of metric cards with large numbers",
            "shapes": [{"repeat": repeat_grid("metric", 4, 5.88, 2.30, 2, 0.59, 0.40),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 5.88, 2.30, card_style()),
                    sub("number", "rect", 0.15, 0.15, 5.58, 0.90, text_style(C["accent1"], 36, True, "center", "center"), "{prefix}{i}_number"),
                    sub("label", "rect", 0.15, 1.10, 5.58, 0.40, text_style(C["accent1"], 12, True, "center", "center"), "{prefix}{i}_label"),
                    sub("body", "rect", 0.15, 1.55, 5.58, 0.60, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "kpi-row-4": {
            "category": "data-numbers",
            "description": "Four KPIs in a horizontal row",
            "shapes": [{"repeat": repeat_h("kpi", 4, 2.79, 4.50, 0.20, True, True),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 2.79, 4.50, card_style()),
                    sub("number", "rect", 0, 0.30, 2.79, 1.00, text_style(C["accent1"], 36, True, "center", "center"), "{prefix}{i}_number"),
                    sub("label", "rect", 0, 1.40, 2.79, 0.50, text_style(C["accent1"], 12, True, "center", "center"), "{prefix}{i}_label"),
                    sub("body", "rect", 0.10, 2.00, 2.59, 2.20, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "funnel-4": {
            "category": "data-numbers",
            "description": "Four-stage funnel with progressively narrower bars",
            "shapes": [
                static("bar1", "roundRect", 0.50, 1.50, 12.35, 1.05, bar_style(C["accent1"]), "stage1_text"),
                static("bar2", "roundRect", 1.50, 2.75, 10.35, 1.05, bar_style(C["accent1_tint"]), "stage2_text"),
                static("bar3", "roundRect", 2.50, 4.00, 8.35, 1.05, bar_style(C["accent3"]), "stage3_text"),
                static("bar4", "roundRect", 3.50, 5.25, 6.35, 1.05, bar_style(C["purple"]), "stage4_text"),
            ]
        },
        "donut-stats-3": {
            "category": "data-numbers",
            "description": "Three circular stat indicators with numbers",
            "shapes": [{"repeat": repeat_h("stat", 3, 3.78, 4.50, 0.20, True, True),
                "shapes_per_item": [
                    sub("outer-circle", "ellipse", 0.89, 0.10, 2.00, 2.00, {"fill": C["accent1"], "line": C["accent1"]}),
                    sub("inner-circle", "ellipse", 1.19, 0.40, 1.40, 1.40, {"fill": C["white"], "line": C["white"]}),
                    sub("number", "rect", 0.89, 0.10, 2.00, 2.00, text_style(C["accent1"], 32, True, "center", "center"), "{prefix}{i}_number"),
                    sub("label", "rect", 0, 2.30, 3.78, 0.50, text_style(C["accent1"], 13, True, "center", "center"), "{prefix}{i}_label"),
                    sub("body", "rect", 0.15, 2.90, 3.48, 1.30, text_style(C["body"], 11, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "data-highlight-2": {
            "category": "data-numbers",
            "description": "Two large data points side by side",
            "shapes": [{"repeat": repeat_h("data", 2, 5.88, 4.80, 0.59, True, True),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 5.88, 4.80, card_style()),
                    sub("number", "rect", 0, 0.30, 5.88, 1.50, text_style(C["accent1"], 56, True, "center", "center"), "{prefix}{i}_number"),
                    sub("label", "rect", 0, 1.90, 5.88, 0.50, text_style(C["accent1"], 14, True, "center", "center"), "{prefix}{i}_label"),
                    sub("body", "rect", 0.30, 2.50, 5.28, 2.00, text_style(C["body"], 12, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "process-5": {
            "category": "process",
            "description": "Five-step horizontal process flow",
            "shapes": [{"repeat": repeat_h("step", 5, 2.10, 3.50, 0.15, True),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 2.10, 3.50, card_style(C["gray"], C["gray"])),
                    sub("circle", "ellipse", 0.80, 0.15, 0.50, 0.50, bar_style(C["accent1"])),
                    sub("number", "rect", 0.80, 0.15, 0.50, 0.50, text_style(C["white"], 18, True, "center", "center"), "{prefix}{i}_number"),
                    sub("title", "rect", 0.05, 0.80, 2.00, 0.45, text_style(C["accent1"], 12, True, "center"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.10, 1.30, 1.90, 1.90, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ],
                "connectors_between_items": {
                    "preset": "straight", "offset_from_item_right_in": 0.02,
                    "y_center_in": 1.75,
                    "style": {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}
                }
            }]
        },
        "chevron-flow-4": {
            "category": "process",
            "description": "Four chevron steps in a row",
            "shapes": [{"repeat": repeat_h("step", 4, 2.90, 1.80, 0.15, True, True),
                "shapes_per_item": [
                    sub("chevron", "roundRect", 0, 0, 2.90, 1.80, {"fill": C["accent1"], "line": C["accent1"]}),
                    sub("title", "rect", 0.10, 0.15, 2.70, 0.55, text_style(C["white"], 13, True, "center", "center"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.10, 0.75, 2.70, 0.90, text_style(C["white"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ],
                "connectors_between_items": {
                    "preset": "straight", "offset_from_item_right_in": 0.02,
                    "y_center_in": 0.90,
                    "style": {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}
                }
            }]
        },
        "chevron-flow-5": {
            "category": "process",
            "description": "Five chevron steps in a row",
            "shapes": [{"repeat": repeat_h("step", 5, 2.20, 1.80, 0.12, True, True),
                "shapes_per_item": [
                    sub("chevron", "roundRect", 0, 0, 2.20, 1.80, {"fill": C["accent1"], "line": C["accent1"]}),
                    sub("title", "rect", 0.08, 0.15, 2.04, 0.55, text_style(C["white"], 12, True, "center", "center"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.08, 0.75, 2.04, 0.90, text_style(C["white"], 9, False, "center", "top"), "{prefix}{i}_body"),
                ],
                "connectors_between_items": {
                    "preset": "straight", "offset_from_item_right_in": 0.01,
                    "y_center_in": 0.90,
                    "style": {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}
                }
            }]
        },
        "swimlane-2": {
            "category": "process",
            "description": "Two parallel process lanes",
            "shapes": [
                static("lane1-header", "rect", 0.50, 1.35, 2.50, 2.40, bar_style(C["accent1"]), "lane1_title"),
                static("lane2-header", "rect", 0.50, 3.95, 2.50, 2.40, bar_style(C["accent1_tint"]), "lane2_title"),
                {"repeat": {"prefix": "lane1_step", "max_count": 3, "direction": "horizontal",
                    "start_x_in": 3.20, "start_y_in": 1.35,
                    "item_width_in": 3.00, "item_height_in": 2.40,
                    "h_gap_in": 0.15, "v_gap_in": 0,
                    "available_width_in": 9.65, "available_height_in": 2.40,
                    "center_h": True, "center_v": False},
                    "shapes_per_item": [
                        sub("card", "roundRect", 0, 0, 3.00, 2.40, card_style()),
                        sub("title", "rect", 0.10, 0.10, 2.80, 0.45, text_style(C["accent1"], 12, True, "center"), "{prefix}{i}_title"),
                        sub("body", "rect", 0.10, 0.60, 2.80, 1.60, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                    ]
                },
                {"repeat": {"prefix": "lane2_step", "max_count": 3, "direction": "horizontal",
                    "start_x_in": 3.20, "start_y_in": 3.95,
                    "item_width_in": 3.00, "item_height_in": 2.40,
                    "h_gap_in": 0.15, "v_gap_in": 0,
                    "available_width_in": 9.65, "available_height_in": 2.40,
                    "center_h": True, "center_v": False},
                    "shapes_per_item": [
                        sub("card", "roundRect", 0, 0, 3.00, 2.40, card_style()),
                        sub("title", "rect", 0.10, 0.10, 2.80, 0.45, text_style(C["accent1_tint"], 12, True, "center"), "{prefix}{i}_title"),
                        sub("body", "rect", 0.10, 0.60, 2.80, 1.60, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                    ]
                },
            ]
        },
        "input-output": {
            "category": "process",
            "description": "Input > Process > Output flow",
            "shapes": [
                static("input-box", "roundRect", 0.50, 2.00, 3.50, 3.00, card_style(C["gray"], C["gray"]), None),
                static("input-label", "rect", 0.50, 2.00, 3.50, 0.50, text_style(C["accent1"], 10, True, "center", "center"), "input_label"),
                static("input-title", "rect", 0.65, 2.55, 3.20, 0.50, text_style(C["accent1"], 14, True, "center", "center"), "input_title"),
                static("input-body", "rect", 0.65, 3.10, 3.20, 1.60, text_style(C["body"], 11, False, "center", "top"), "input_body"),
                connector("arrow1", 4.20, 3.50, 1.30, 0),
                static("process-box", "roundRect", 5.70, 2.00, 3.50, 3.00, {"fill": C["accent1"], "line": C["accent1"]}, None),
                static("process-label", "rect", 5.70, 2.00, 3.50, 0.50, text_style(C["white"], 10, True, "center", "center"), "process_label"),
                static("process-title", "rect", 5.85, 2.55, 3.20, 0.50, text_style(C["white"], 14, True, "center", "center"), "process_title"),
                static("process-body", "rect", 5.85, 3.10, 3.20, 1.60, text_style(C["white"], 11, False, "center", "top"), "process_body"),
                connector("arrow2", 9.40, 3.50, 1.30, 0),
                static("output-box", "roundRect", 10.90, 2.00, 3.50, 3.00, card_style(C["gray"], C["gray"]), None),
                static("output-label", "rect", 10.90, 2.00, 3.50, 0.50, text_style(C["green"], 10, True, "center", "center"), "output_label"),
                static("output-title", "rect", 11.05, 2.55, 3.20, 0.50, text_style(C["green"], 14, True, "center", "center"), "output_title"),
                static("output-body", "rect", 11.05, 3.10, 3.20, 1.60, text_style(C["body"], 11, False, "center", "top"), "output_body"),
            ]
        },
        "phased-rollout-3": {
            "category": "process",
            "description": "Three phases with sub-items",
            "shapes": [{"repeat": repeat_h("phase", 3, 3.78, 4.80, 0.20, True),
                "shapes_per_item": [
                    sub("header", "rect", 0, 0, 3.78, 0.55, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 14, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "{prefix}{i}_title"),
                    sub("card", "rect", 0, 0.55, 3.78, 4.25, card_style()),
                    sub("body", "rect", 0.15, 0.70, 3.48, 3.90, text_style(C["body"], 11, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "circular-process-4": {
            "category": "process",
            "description": "Four steps arranged in a cycle with arrows",
            "shapes": [
                static("top", "roundRect", 4.67, 1.35, 4.00, 1.20, {"fill": C["accent1"], "line": C["accent1"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step1_text"),
                static("right", "roundRect", 8.85, 3.15, 4.00, 1.20, {"fill": C["accent1_tint"], "line": C["accent1_tint"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step2_text"),
                static("bottom", "roundRect", 4.67, 5.00, 4.00, 1.20, {"fill": C["accent1"], "line": C["accent1"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step3_text"),
                static("left", "roundRect", 0.50, 3.15, 4.00, 1.20, {"fill": C["accent1_tint"], "line": C["accent1_tint"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step4_text"),
                connector("arrow-top-right", 8.70, 2.00, 0.80, 1.15, {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}),
                connector("arrow-right-bottom", 9.50, 4.35, -0.80, 1.15, {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}),
                connector("arrow-bottom-left", 4.65, 5.60, -0.80, -1.15, {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}),
                connector("arrow-left-top", 3.80, 3.15, 0.80, -1.15, {"line": C["accent3"], "lineWidth": "2pt", "tailEnd": "triangle"}),
            ]
        },
        "numbered-checklist-8": {
            "category": "process",
            "description": "Eight numbered checklist items in two columns",
            "shapes": [{"repeat": repeat_grid("item", 8, 5.88, 1.10, 2, 0.59, 0.15),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 5.88, 1.10, card_style()),
                    sub("circle", "ellipse", 0.10, 0.20, 0.45, 0.45, bar_style(C["accent1"])),
                    sub("number", "rect", 0.10, 0.20, 0.45, 0.45, text_style(C["white"], 14, True, "center", "center"), "{prefix}{i}_number"),
                    sub("title", "rect", 0.70, 0.05, 5.00, 0.40, text_style(C["accent1"], 11, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.70, 0.45, 5.00, 0.55, text_style(C["body"], 9, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
    }


def batch3():
    """Comparison + Structure"""
    return {
        "comparison-3col": {
            "category": "comparison",
            "description": "Three-column comparison",
            "shapes": [
                static("h1", "rect", 0.50, 1.35, 3.78, 0.55, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "col1_title"),
                static("b1", "rect", 0.50, 1.95, 3.78, 4.55, {**card_style(), "color": C["body"], "font": FONT, "font_size": 11, "align": "left", "valign": "top", "autoFit": "shape"}, "col1_body"),
                static("h2", "rect", 4.48, 1.35, 3.78, 0.55, {**bar_style(C["accent1_tint"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "col2_title"),
                static("b2", "rect", 4.48, 1.95, 3.78, 4.55, {**card_style(), "color": C["body"], "font": FONT, "font_size": 11, "align": "left", "valign": "top", "autoFit": "shape"}, "col2_body"),
                static("h3", "rect", 8.46, 1.35, 3.78, 0.55, {**bar_style(C["accent3"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "col3_title"),
                static("b3", "rect", 8.46, 1.95, 3.78, 4.55, {**card_style(), "color": C["body"], "font": FONT, "font_size": 11, "align": "left", "valign": "top", "autoFit": "shape"}, "col3_body"),
            ]
        },
        "tier-comparison-3": {
            "category": "comparison",
            "description": "Three tiers (Basic/Standard/Premium style)",
            "shapes": [{"repeat": repeat_h("tier", 3, 3.78, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("header", "rect", 0, 0, 3.78, 0.65, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 14, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "{prefix}{i}_name"),
                    sub("price", "rect", 0, 0.65, 3.78, 0.80, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 24, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "{prefix}{i}_price"),
                    sub("body", "rect", 0, 1.45, 3.78, 3.55, {**card_style(), "color": C["body"], "font": FONT, "font_size": 10, "align": "left", "valign": "top", "autoFit": "shape"}, "{prefix}{i}_features"),
                ]}]
        },
        "feature-matrix-4x4": {
            "category": "comparison",
            "description": "Four features vs four options header grid",
            "shapes": [{"repeat": repeat_grid("cell", 16, 2.79, 1.10, 4, 0.20, 0.15),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 2.79, 1.10, card_style()),
                    sub("text", "rect", 0.10, 0.05, 2.59, 0.95, text_style(C["body"], 10, False, "center", "center"), "{prefix}{i}_text"),
                ]}]
        },
        "vs-split": {
            "category": "comparison",
            "description": "Full slide split with VS divider",
            "shapes": [
                static("left-bg", "rect", 0.50, 1.35, 5.50, 5.25, card_style(C["gray"], C["gray"])),
                static("left-title", "rect", 0.65, 1.50, 5.20, 0.55, text_style(C["accent1"], 16, True, "center", "center"), "left_title"),
                static("left-body", "rect", 0.65, 2.20, 5.20, 4.10, text_style(C["body"], 11, False, "left", "top"), "left_body"),
                static("vs-circle", "ellipse", 5.97, 3.35, 1.40, 1.40, bar_style(C["accent1"])),
                static("vs-text", "rect", 5.97, 3.35, 1.40, 1.40, text_style(C["white"], 24, True, "center", "center"), "vs_text"),
                static("right-bg", "rect", 7.33, 1.35, 5.50, 5.25, card_style(C["gray"], C["gray"])),
                static("right-title", "rect", 7.48, 1.50, 5.20, 0.55, text_style(C["accent1"], 16, True, "center", "center"), "right_title"),
                static("right-body", "rect", 7.48, 2.20, 5.20, 4.10, text_style(C["body"], 11, False, "left", "top"), "right_body"),
            ]
        },
        "spectrum-scale-5": {
            "category": "comparison",
            "description": "Five-point spectrum scale",
            "shapes": [
                connector("scale-line", 0.70, 3.50, 11.93, 0, {"line": C["gray"], "lineWidth": "4pt"}),
                {"repeat": repeat_h("point", 5, 2.00, 3.50, 0.40, True, True),
                "shapes_per_item": [
                    sub("marker", "ellipse", 0.75, 1.50, 0.50, 0.50, bar_style(C["accent1"])),
                    sub("label", "rect", 0, 0, 2.00, 1.30, text_style(C["accent1"], 12, True, "center", "bottom"), "{prefix}{i}_label"),
                    sub("body", "rect", 0, 2.20, 2.00, 1.30, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ]}
            ]
        },
        "pyramid-4": {
            "category": "structure",
            "description": "Four-level pyramid",
            "shapes": [
                static("l1", "roundRect", 0.50, 5.10, 12.35, 1.00, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level1_text"),
                static("l2", "roundRect", 1.80, 3.90, 9.73, 1.00, {**bar_style(C["accent1_tint"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level2_text"),
                static("l3", "roundRect", 3.10, 2.70, 7.13, 1.00, {**bar_style(C["accent3"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level3_text"),
                static("l4", "roundRect", 4.40, 1.50, 4.53, 1.00, {**bar_style(C["purple"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level4_text"),
            ]
        },
        "hub-spoke-4": {
            "category": "structure",
            "description": "Central hub with four spokes",
            "shapes": [
                static("hub", "ellipse", 5.17, 2.65, 3.00, 2.20, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 14, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "hub_text"),
                static("spoke1", "roundRect", 4.67, 1.35, 4.00, 0.90, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke1_text"),
                static("spoke2", "roundRect", 9.00, 3.30, 3.80, 0.90, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke2_text"),
                static("spoke3", "roundRect", 4.67, 5.25, 4.00, 0.90, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke3_text"),
                static("spoke4", "roundRect", 0.50, 3.30, 3.80, 0.90, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke4_text"),
            ]
        },
        "hub-spoke-6": {
            "category": "structure",
            "description": "Central hub with six surrounding nodes",
            "shapes": [
                static("hub", "ellipse", 4.67, 2.25, 4.00, 3.00, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 14, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "hub_text"),
                static("s1", "roundRect", 4.67, 1.35, 4.00, 0.70, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 10, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke1_text"),
                static("s2", "roundRect", 9.30, 1.80, 3.50, 0.70, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 10, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke2_text"),
                static("s3", "roundRect", 9.30, 5.00, 3.50, 0.70, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 10, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke3_text"),
                static("s4", "roundRect", 4.67, 5.55, 4.00, 0.70, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 10, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke4_text"),
                static("s5", "roundRect", 0.50, 5.00, 3.50, 0.70, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 10, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke5_text"),
                static("s6", "roundRect", 0.50, 1.80, 3.50, 0.70, {**card_style(), "color": C["accent1"], "font": FONT, "font_size": 10, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "spoke6_text"),
            ]
        },
        "modular-blocks-6": {
            "category": "structure",
            "description": "Six modular capability blocks in 2x3 grid",
            "shapes": [{"repeat": repeat_grid("block", 6, 3.78, 2.30, 3, 0.20, 0.40),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 3.78, 2.30, {"fill": C["accent1"], "line": C["accent1"]}),
                    sub("title", "rect", 0.15, 0.15, 3.48, 0.50, text_style(C["white"], 13, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.70, 3.48, 1.35, text_style(C["white"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "ecosystem-3x2": {
            "category": "structure",
            "description": "3x2 ecosystem component grid",
            "shapes": [{"repeat": repeat_grid("comp", 6, 3.78, 2.30, 3, 0.20, 0.40),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 3.78, 2.30, card_style()),
                    sub("title", "rect", 0.15, 0.15, 3.48, 0.45, text_style(C["accent1"], 13, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.65, 3.48, 1.40, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "onion-3": {
            "category": "structure",
            "description": "Three concentric rectangular layers",
            "shapes": [
                static("outer", "roundRect", 0.50, 1.35, 12.35, 5.25, {"fill": C["accent1"], "line": C["accent1"]}),
                static("outer-label", "rect", 0.65, 1.45, 4.00, 0.40, text_style(C["white"], 12, True, "left"), "outer_title"),
                static("middle", "roundRect", 1.80, 2.10, 9.73, 4.00, {"fill": C["accent1_tint"], "line": C["accent1_tint"]}),
                static("middle-label", "rect", 1.95, 2.20, 4.00, 0.40, text_style(C["white"], 12, True, "left"), "middle_title"),
                static("inner", "roundRect", 3.10, 2.80, 7.13, 2.80, {"fill": C["white"], "line": C["gray"]}),
                static("inner-label", "rect", 3.25, 2.90, 6.83, 0.40, text_style(C["accent1"], 12, True, "left"), "inner_title"),
                static("inner-body", "rect", 3.25, 3.40, 6.83, 1.90, text_style(C["body"], 11, False, "left", "top"), "inner_body"),
            ]
        },
        "dependency-chain-4": {
            "category": "structure",
            "description": "Four linked dependency blocks",
            "shapes": [{"repeat": repeat_v("dep", 4, 12.35, 1.05, 0.20, True),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 12.35, 1.05, card_style()),
                    sub("title", "rect", 0.15, 0, 3.00, 1.05, text_style(C["accent1"], 13, True, "left", "center"), "{prefix}{i}_title"),
                    sub("body", "rect", 3.30, 0, 8.80, 1.05, text_style(C["body"], 11, False, "left", "center"), "{prefix}{i}_body"),
                ]}]
        },
    }


def batch4():
    """Timeline + Grid extras"""
    return {
        "timeline-h-5": {
            "category": "timeline",
            "description": "Horizontal timeline with 5 milestones",
            "shapes": [
                connector("line", 0.70, 3.50, 11.93, 0, {"line": C["accent3"], "lineWidth": "2pt"}),
                {"repeat": {"prefix": "milestone", "max_count": 5, "direction": "horizontal",
                    "start_x_in": 0.70, "start_y_in": 3.35,
                    "item_width_in": 2.00, "item_height_in": 0.30,
                    "h_gap_in": 0.38, "v_gap_in": 0,
                    "available_width_in": 11.93, "available_height_in": 0.30,
                    "center_h": True, "center_v": False},
                    "shapes_per_item": [
                        sub("marker", "ellipse", 0.85, 0, 0.30, 0.30, bar_style(C["accent1"])),
                        sub("date", "rect", 0, -0.55, 2.00, 0.40, text_style(C["accent1"], 10, True, "center"), "{prefix}{i}_date"),
                        sub("title", "rect", 0, 0.45, 2.00, 0.35, text_style(C["accent1"], 12, True, "center"), "{prefix}{i}_title"),
                        sub("body", "rect", 0, 0.85, 2.00, 1.20, text_style(C["body"], 9, False, "center", "top"), "{prefix}{i}_body"),
                    ]
                }
            ]
        },
        "timeline-vertical-4": {
            "category": "timeline",
            "description": "Vertical timeline with 4 milestones",
            "shapes": [
                connector("line", 2.50, 1.50, 0, 4.80, {"line": C["accent3"], "lineWidth": "2pt"}),
                {"repeat": repeat_v("milestone", 4, 12.35, 1.05, 0.20, True),
                    "shapes_per_item": [
                        sub("marker", "ellipse", 2.25, 0.30, 0.50, 0.50, bar_style(C["accent1"])),
                        sub("date", "rect", 0.15, 0, 2.00, 1.05, text_style(C["accent1"], 11, True, "right", "center"), "{prefix}{i}_date"),
                        sub("title", "rect", 3.00, 0, 3.00, 1.05, text_style(C["accent1"], 13, True, "left", "center"), "{prefix}{i}_title"),
                        sub("body", "rect", 6.10, 0, 5.90, 1.05, text_style(C["body"], 11, False, "left", "center"), "{prefix}{i}_body"),
                    ]
                }
            ]
        },
        "timeline-vertical-5": {
            "category": "timeline",
            "description": "Vertical timeline with 5 milestones",
            "shapes": [
                connector("line", 2.50, 1.50, 0, 4.80, {"line": C["accent3"], "lineWidth": "2pt"}),
                {"repeat": repeat_v("milestone", 5, 12.35, 0.85, 0.15, True),
                    "shapes_per_item": [
                        sub("marker", "ellipse", 2.28, 0.20, 0.45, 0.45, bar_style(C["accent1"])),
                        sub("date", "rect", 0.15, 0, 2.00, 0.85, text_style(C["accent1"], 10, True, "right", "center"), "{prefix}{i}_date"),
                        sub("title", "rect", 3.00, 0, 3.00, 0.85, text_style(C["accent1"], 12, True, "left", "center"), "{prefix}{i}_title"),
                        sub("body", "rect", 6.10, 0, 5.90, 0.85, text_style(C["body"], 10, False, "left", "center"), "{prefix}{i}_body"),
                    ]
                }
            ]
        },
        "quarterly-roadmap-4": {
            "category": "timeline",
            "description": "Four quarters roadmap with items",
            "shapes": [{"repeat": repeat_h("q", 4, 2.79, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("header", "rect", 0, 0, 2.79, 0.55, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 13, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "{prefix}{i}_label"),
                    sub("card", "rect", 0, 0.55, 2.79, 4.45, card_style()),
                    sub("body", "rect", 0.10, 0.65, 2.59, 4.20, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_items"),
                ]}]
        },
        "phase-gate-3": {
            "category": "timeline",
            "description": "Three phase gates with deliverables",
            "shapes": [{"repeat": repeat_h("phase", 3, 3.78, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("gate-marker", "rect", 0, 0, 3.78, 0.06, bar_style(C["accent1"])),
                    sub("card", "rect", 0, 0.06, 3.78, 4.94, card_style()),
                    sub("title", "rect", 0.15, 0.20, 3.48, 0.50, text_style(C["accent1"], 14, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.80, 3.48, 4.00, text_style(C["body"], 11, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "phase-gate-4": {
            "category": "timeline",
            "description": "Four phase gates",
            "shapes": [{"repeat": repeat_h("phase", 4, 2.79, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("gate-marker", "rect", 0, 0, 2.79, 0.06, bar_style(C["accent1"])),
                    sub("card", "rect", 0, 0.06, 2.79, 4.94, card_style()),
                    sub("title", "rect", 0.10, 0.20, 2.59, 0.45, text_style(C["accent1"], 13, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.10, 0.75, 2.59, 4.00, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "journey-5": {
            "category": "timeline",
            "description": "Five-stage journey map",
            "shapes": [
                connector("journey-line", 0.70, 2.20, 11.93, 0, {"line": C["accent3"], "lineWidth": "3pt"}),
                {"repeat": repeat_h("stage", 5, 2.10, 4.00, 0.15, True, False, 1.60),
                "shapes_per_item": [
                    sub("marker", "ellipse", 0.80, 0.45, 0.50, 0.50, bar_style(C["accent1"])),
                    sub("number", "rect", 0.80, 0.45, 0.50, 0.50, text_style(C["white"], 16, True, "center", "center"), "{prefix}{i}_number"),
                    sub("title", "rect", 0, 0, 2.10, 0.40, text_style(C["accent1"], 11, True, "center", "bottom"), "{prefix}{i}_title"),
                    sub("card", "roundRect", 0, 1.20, 2.10, 2.60, card_style()),
                    sub("body", "rect", 0.10, 1.30, 1.90, 2.40, text_style(C["body"], 9, False, "center", "top"), "{prefix}{i}_body"),
                ]}
            ]
        },
        "maturity-model-5": {
            "category": "timeline",
            "description": "Five-level maturity model (ascending steps)",
            "shapes": [
                static("l1", "roundRect", 0.50, 5.20, 2.27, 1.00, {**bar_style(C["gray"]), "color": C["body"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level1_text"),
                static("l2", "roundRect", 2.97, 4.10, 2.27, 2.10, {**bar_style(C["gray"]), "color": C["body"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level2_text"),
                static("l3", "roundRect", 5.44, 3.00, 2.27, 3.20, {**bar_style(C["accent1_tint"]), "color": C["white"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level3_text"),
                static("l4", "roundRect", 7.91, 1.90, 2.27, 4.30, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level4_text"),
                static("l5", "roundRect", 10.38, 1.35, 2.47, 4.85, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 11, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "level5_text"),
            ]
        },
        "grid-3x1": {
            "category": "grid-cards",
            "description": "Three horizontal cards",
            "shapes": [{"repeat": repeat_h("card", 3, 3.78, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("bg", "roundRect", 0, 0, 3.78, 5.00, card_style()),
                    sub("title", "rect", 0.15, 0.15, 3.48, 0.50, text_style(C["accent1"], 14, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.70, 3.48, 4.10, text_style(C["body"], 11, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "grid-4x1": {
            "category": "grid-cards",
            "description": "Four horizontal cards",
            "shapes": [{"repeat": repeat_h("card", 4, 2.79, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("bg", "roundRect", 0, 0, 2.79, 5.00, card_style()),
                    sub("title", "rect", 0.10, 0.15, 2.59, 0.45, text_style(C["accent1"], 13, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.10, 0.65, 2.59, 4.15, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "feature-cards-4": {
            "category": "grid-cards",
            "description": "Four feature cards with accent headers",
            "shapes": [{"repeat": repeat_h("feat", 4, 2.79, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("header", "rect", 0, 0, 2.79, 0.50, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "{prefix}{i}_title"),
                    sub("card", "rect", 0, 0.50, 2.79, 4.50, card_style()),
                    sub("body", "rect", 0.10, 0.60, 2.59, 4.20, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "benefit-grid-3": {
            "category": "grid-cards",
            "description": "Three benefit cards with icons-style headers",
            "shapes": [{"repeat": repeat_h("benefit", 3, 3.78, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("accent", "rect", 0, 0, 3.78, 0.06, bar_style(C["accent1"])),
                    sub("card", "roundRect", 0, 0.06, 3.78, 4.94, card_style()),
                    sub("title", "rect", 0.15, 0.25, 3.48, 0.50, text_style(C["accent1"], 14, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.80, 3.48, 3.95, text_style(C["body"], 11, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "profile-cards-3": {
            "category": "grid-cards",
            "description": "Three person/role profile cards",
            "shapes": [{"repeat": repeat_h("person", 3, 3.78, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 3.78, 5.00, card_style()),
                    sub("avatar", "ellipse", 1.19, 0.20, 1.40, 1.40, bar_style(C["accent1"])),
                    sub("initials", "rect", 1.19, 0.20, 1.40, 1.40, text_style(C["white"], 24, True, "center", "center"), "{prefix}{i}_initials"),
                    sub("name", "rect", 0.15, 1.80, 3.48, 0.45, text_style(C["accent1"], 14, True, "center"), "{prefix}{i}_name"),
                    sub("role", "rect", 0.15, 2.25, 3.48, 0.35, text_style(C["body"], 11, False, "center"), "{prefix}{i}_role"),
                    sub("body", "rect", 0.15, 2.75, 3.48, 2.00, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "profile-cards-4": {
            "category": "grid-cards",
            "description": "Four person/role profile cards",
            "shapes": [{"repeat": repeat_h("person", 4, 2.79, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 2.79, 5.00, card_style()),
                    sub("avatar", "ellipse", 0.70, 0.20, 1.40, 1.40, bar_style(C["accent1"])),
                    sub("initials", "rect", 0.70, 0.20, 1.40, 1.40, text_style(C["white"], 22, True, "center", "center"), "{prefix}{i}_initials"),
                    sub("name", "rect", 0.10, 1.80, 2.59, 0.40, text_style(C["accent1"], 13, True, "center"), "{prefix}{i}_name"),
                    sub("role", "rect", 0.10, 2.20, 2.59, 0.30, text_style(C["body"], 10, False, "center"), "{prefix}{i}_role"),
                    sub("body", "rect", 0.10, 2.65, 2.59, 2.10, text_style(C["body"], 9, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "checklist-2col": {
            "category": "grid-cards",
            "description": "Two-column checklist",
            "shapes": [{"repeat": repeat_grid("check", 10, 5.88, 0.85, 2, 0.59, 0.10),
                "shapes_per_item": [
                    sub("card", "rect", 0, 0, 5.88, 0.85, card_style()),
                    sub("marker", "ellipse", 0.10, 0.20, 0.40, 0.40, bar_style(C["green"])),
                    sub("check", "rect", 0.10, 0.20, 0.40, 0.40, text_style(C["white"], 14, True, "center", "center"), "{prefix}{i}_mark"),
                    sub("text", "rect", 0.65, 0, 5.08, 0.85, text_style(C["body"], 11, False, "left", "center"), "{prefix}{i}_text"),
                ]}]
        },
        "priority-quadrant": {
            "category": "grid-cards",
            "description": "2x2 priority/impact quadrant with axis labels",
            "shapes": [
                connector("h-axis", 0.50, 3.97, 12.35, 0, {"line": C["gray"], "lineWidth": "1pt"}),
                connector("v-axis", 6.67, 1.35, 0, 5.25, {"line": C["gray"], "lineWidth": "1pt"}),
                static("x-label-right", "rect", 10.85, 6.30, 2.00, 0.30, text_style(C["accent1"], 9, True, "right"), "x_high_label"),
                static("x-label-left", "rect", 0.50, 6.30, 2.00, 0.30, text_style(C["accent1"], 9, True, "left"), "x_low_label"),
                static("y-label-top", "rect", 0.50, 1.35, 2.00, 0.30, text_style(C["accent1"], 9, True, "left"), "y_high_label"),
                static("y-label-bottom", "rect", 0.50, 6.00, 2.00, 0.30, text_style(C["accent1"], 9, True, "left"), "y_low_label"),
                {"repeat": repeat_grid("q", 4, 5.88, 2.43, 2, 0.59, 0.40),
                "shapes_per_item": [
                    sub("title", "rect", 0.15, 0.10, 5.58, 0.40, text_style(C["accent1"], 12, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.55, 5.58, 1.75, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}
            ]
        },
    }


def batch5():
    """Text & Narrative + Visual & Emphasis extras"""
    return {
        "key-message": {
            "category": "text-narrative",
            "description": "Single key message centered with large font",
            "shapes": [
                static("message", "rect", 1.50, 1.80, 10.33, 3.50, text_style(C["accent1"], 28, True, "center", "center"), "message_text"),
            ]
        },
        "two-point-contrast": {
            "category": "text-narrative",
            "description": "Two contrasting statements side by side",
            "shapes": [
                static("left-text", "rect", 0.50, 1.50, 5.50, 4.80, text_style(C["accent1"], 16, False, "center", "center"), "point1_text"),
                connector("divider", 6.47, 1.50, 0, 4.80, {"line": C["gray"], "lineWidth": "2pt"}),
                static("right-text", "rect", 7.33, 1.50, 5.50, 4.80, text_style(C["accent1_tint"], 16, False, "center", "center"), "point2_text"),
            ]
        },
        "agenda-list-5": {
            "category": "text-narrative",
            "description": "Five agenda items",
            "shapes": [{"repeat": repeat_v("agenda", 5, 10.00, 0.85, 0.15, True),
                "shapes_per_item": [
                    sub("number", "ellipse", 0, 0.175, 0.50, 0.50, bar_style(C["accent1"])),
                    sub("num-text", "rect", 0, 0.175, 0.50, 0.50, text_style(C["white"], 16, True, "center", "center"), "{prefix}{i}_number"),
                    sub("title", "rect", 0.70, 0, 9.30, 0.85, text_style(C["body"], 14, False, "left", "center"), "{prefix}{i}_text"),
                ]}]
        },
        "agenda-list-7": {
            "category": "text-narrative",
            "description": "Seven agenda items",
            "shapes": [{"repeat": repeat_v("agenda", 7, 10.00, 0.65, 0.10, True),
                "shapes_per_item": [
                    sub("number", "ellipse", 0, 0.10, 0.45, 0.45, bar_style(C["accent1"])),
                    sub("num-text", "rect", 0, 0.10, 0.45, 0.45, text_style(C["white"], 14, True, "center", "center"), "{prefix}{i}_number"),
                    sub("title", "rect", 0.65, 0, 9.35, 0.65, text_style(C["body"], 13, False, "left", "center"), "{prefix}{i}_text"),
                ]}]
        },
        "faq-pairs-3": {
            "category": "text-narrative",
            "description": "Three Q&A pairs",
            "shapes": [{"repeat": repeat_v("faq", 3, 12.35, 1.55, 0.15, True),
                "shapes_per_item": [
                    sub("q", "rect", 0.15, 0.05, 11.80, 0.55, text_style(C["accent1"], 13, True, "left", "center"), "{prefix}{i}_question"),
                    sub("divider", "rect", 0.15, 0.60, 11.80, 0.02, bar_style(C["gray"])),
                    sub("a", "rect", 0.15, 0.70, 11.80, 0.80, text_style(C["body"], 11, False, "left", "top"), "{prefix}{i}_answer"),
                ]}]
        },
        "highlight-box": {
            "category": "text-narrative",
            "description": "Highlighted text box with accent border",
            "shapes": [
                static("accent-bar", "rect", 1.50, 1.80, 0.10, 3.50, bar_style(C["accent1"])),
                static("box", "roundRect", 1.80, 1.80, 10.50, 3.50, card_style()),
                static("title", "rect", 2.00, 1.95, 10.10, 0.55, text_style(C["accent1"], 16, True, "left"), "highlight_title"),
                static("body", "rect", 2.00, 2.60, 10.10, 2.50, text_style(C["body"], 12, False, "left", "top"), "highlight_body"),
            ]
        },
        "executive-summary": {
            "category": "text-narrative",
            "description": "Title and three summary paragraphs",
            "shapes": [
                static("p1", "rect", 0.65, 1.50, 12.00, 1.50, text_style(C["body"], 12, False, "left", "top"), "para1_text"),
                static("p2", "rect", 0.65, 3.10, 12.00, 1.50, text_style(C["body"], 12, False, "left", "top"), "para2_text"),
                static("p3", "rect", 0.65, 4.70, 12.00, 1.50, text_style(C["body"], 12, False, "left", "top"), "para3_text"),
            ]
        },
        "pullquote-attribution": {
            "category": "text-narrative",
            "description": "Quote with name and role",
            "shapes": [
                static("quote-mark", "rect", 1.00, 1.50, 1.00, 1.00, text_style(C["accent1"], 60, True, "left", "top"), "quote_mark"),
                static("quote", "rect", 2.20, 2.00, 9.00, 2.50, text_style(C["body"], 18, False, "left", "center"), "quote_text"),
                static("line", "rect", 2.20, 4.70, 3.00, 0.03, bar_style(C["accent1"])),
                static("name", "rect", 2.20, 4.85, 5.00, 0.40, text_style(C["accent1"], 13, True, "left"), "author_name"),
                static("role", "rect", 2.20, 5.25, 5.00, 0.35, text_style(C["body"], 11, False, "left"), "author_role"),
            ]
        },
        "four-quadrants-labeled": {
            "category": "visual-emphasis",
            "description": "2x2 quadrant with colored backgrounds and labels",
            "shapes": [
                static("q1", "rect", 0.50, 1.35, 5.88, 2.43, {"fill": C["accent1"], "line": C["accent1"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "q1_text"),
                static("q2", "rect", 6.97, 1.35, 5.88, 2.43, {"fill": C["accent1_tint"], "line": C["accent1_tint"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "q2_text"),
                static("q3", "rect", 0.50, 4.18, 5.88, 2.43, {"fill": C["accent3"], "line": C["accent3"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "q3_text"),
                static("q4", "rect", 6.97, 4.18, 5.88, 2.43, {"fill": C["purple"], "line": C["purple"], "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "q4_text"),
            ]
        },
        "step-ladder-4": {
            "category": "visual-emphasis",
            "description": "Four ascending steps",
            "shapes": [
                static("s1", "roundRect", 0.50, 4.85, 2.79, 1.35, {**card_style(C["gray"], C["gray"]), "color": C["body"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step1_text"),
                static("s2", "roundRect", 3.49, 3.50, 2.79, 2.70, {**card_style(C["gray"], C["gray"]), "color": C["body"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step2_text"),
                static("s3", "roundRect", 6.48, 2.15, 2.79, 4.05, {**bar_style(C["accent1_tint"]), "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step3_text"),
                static("s4", "roundRect", 9.47, 1.35, 3.38, 4.85, {**bar_style(C["accent1"]), "color": C["white"], "font": FONT, "font_size": 12, "bold": True, "align": "center", "valign": "center", "autoFit": "shape"}, "step4_text"),
            ]
        },
        "bridge-diagram": {
            "category": "visual-emphasis",
            "description": "Bridge from current state to future state",
            "shapes": [
                static("current", "roundRect", 0.50, 2.00, 4.00, 3.50, card_style(C["gray"], C["gray"])),
                static("current-label", "rect", 0.50, 2.00, 4.00, 0.45, text_style(C["orange"], 10, True, "center", "center"), "current_label"),
                static("current-title", "rect", 0.65, 2.50, 3.70, 0.50, text_style(C["body"], 14, True, "center"), "current_title"),
                static("current-body", "rect", 0.65, 3.10, 3.70, 2.10, text_style(C["body"], 11, False, "left", "top"), "current_body"),
                static("bridge", "roundRect", 5.00, 3.00, 3.33, 1.50, bar_style(C["accent1"])),
                static("bridge-text", "rect", 5.00, 3.00, 3.33, 1.50, text_style(C["white"], 13, True, "center", "center"), "bridge_text"),
                connector("arrow-left", 4.55, 3.75, 0.40, 0),
                connector("arrow-right", 8.38, 3.75, 0.40, 0),
                static("future", "roundRect", 8.83, 2.00, 4.00, 3.50, card_style(C["gray"], C["gray"])),
                static("future-label", "rect", 8.83, 2.00, 4.00, 0.45, text_style(C["green"], 10, True, "center", "center"), "future_label"),
                static("future-title", "rect", 8.98, 2.50, 3.70, 0.50, text_style(C["body"], 14, True, "center"), "future_title"),
                static("future-body", "rect", 8.98, 3.10, 3.70, 2.10, text_style(C["body"], 11, False, "left", "top"), "future_body"),
            ]
        },
        "icon-highlight-3": {
            "category": "visual-emphasis",
            "description": "Three highlighted blocks with accent top border",
            "shapes": [{"repeat": repeat_h("item", 3, 3.78, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("accent", "rect", 0, 0, 3.78, 0.08, bar_style(C["accent1"])),
                    sub("card", "rect", 0, 0.08, 3.78, 4.92, card_style()),
                    sub("title", "rect", 0.15, 0.30, 3.48, 0.55, text_style(C["accent1"], 16, True, "center"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.95, 3.48, 3.80, text_style(C["body"], 11, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "icon-highlight-4": {
            "category": "visual-emphasis",
            "description": "Four highlighted blocks with accent top border",
            "shapes": [{"repeat": repeat_h("item", 4, 2.79, 5.00, 0.20, True),
                "shapes_per_item": [
                    sub("accent", "rect", 0, 0, 2.79, 0.08, bar_style(C["accent1"])),
                    sub("card", "rect", 0, 0.08, 2.79, 4.92, card_style()),
                    sub("title", "rect", 0.10, 0.30, 2.59, 0.50, text_style(C["accent1"], 14, True, "center"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.10, 0.90, 2.59, 3.85, text_style(C["body"], 10, False, "center", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "banner-cta": {
            "category": "visual-emphasis",
            "description": "Call-to-action banner centered on slide",
            "shapes": [
                static("banner", "roundRect", 1.00, 2.50, 11.33, 2.50, bar_style(C["accent1"])),
                static("headline", "rect", 1.50, 2.60, 10.33, 1.00, text_style(C["white"], 24, True, "center", "center"), "cta_headline"),
                static("subtext", "rect", 1.50, 3.70, 10.33, 0.80, text_style(C["white"], 14, False, "center", "center"), "cta_subtext"),
            ]
        },
        "logo-grid-6": {
            "category": "grid-cards",
            "description": "Six logo/partner placeholder slots",
            "shapes": [{"repeat": repeat_grid("logo", 6, 3.78, 2.30, 3, 0.20, 0.40),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 3.78, 2.30, card_style()),
                    sub("name", "rect", 0, 0, 3.78, 2.30, text_style(C["accent1"], 16, True, "center", "center"), "{prefix}{i}_name"),
                ]}]
        },
        "risk-matrix-3x3": {
            "category": "grid-cards",
            "description": "3x3 risk/priority matrix with color coding",
            "shapes": [{"repeat": repeat_grid("cell", 9, 3.78, 1.55, 3, 0.20, 0.20),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 3.78, 1.55, card_style()),
                    sub("text", "rect", 0.10, 0.05, 3.58, 1.45, text_style(C["body"], 10, False, "center", "center"), "{prefix}{i}_text"),
                ]}]
        },
        "capability-matrix-3x3": {
            "category": "grid-cards",
            "description": "3x3 capability grid with titles",
            "shapes": [{"repeat": repeat_grid("cap", 9, 3.78, 1.55, 3, 0.20, 0.20),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 3.78, 1.55, card_style()),
                    sub("title", "rect", 0.10, 0.08, 3.58, 0.40, text_style(C["accent1"], 11, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.10, 0.50, 3.58, 0.95, text_style(C["body"], 9, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
        "stakeholder-map-4": {
            "category": "grid-cards",
            "description": "Four stakeholder group cards",
            "shapes": [{"repeat": repeat_grid("group", 4, 5.88, 2.30, 2, 0.59, 0.40),
                "shapes_per_item": [
                    sub("card", "roundRect", 0, 0, 5.88, 2.30, card_style()),
                    sub("title", "rect", 0.15, 0.15, 5.58, 0.45, text_style(C["accent1"], 13, True, "left"), "{prefix}{i}_title"),
                    sub("body", "rect", 0.15, 0.65, 5.58, 1.40, text_style(C["body"], 10, False, "left", "top"), "{prefix}{i}_body"),
                ]}]
        },
    }


# ─── Main ───

def load_catalog():
    with open(CATALOG_PATH) as f:
        return json.load(f)

def save_catalog(cat):
    with open(CATALOG_PATH, "w") as f:
        json.dump(cat, f, indent=2)

BATCHES = {
    2: batch2,
    3: batch3,
    4: batch4,
    5: batch5,
}

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 generate_catalog_batch.py <batch_number|all>")
        print("Batches: 2, 3, 4, 5, or 'all'")
        sys.exit(1)

    cat = load_catalog()
    recipes = cat.get("recipes", cat)

    if sys.argv[1] == "all":
        batch_nums = sorted(BATCHES.keys())
    else:
        batch_nums = [int(sys.argv[1])]

    for bn in batch_nums:
        if bn not in BATCHES:
            print(f"Unknown batch: {bn}")
            continue
        new_recipes = BATCHES[bn]()
        before = len(recipes)
        recipes.update(new_recipes)
        after = len(recipes)
        print(f"Batch {bn}: added {after - before} recipes (total: {after})")

    if "recipes" in cat:
        cat["recipes"] = recipes
    else:
        cat = recipes

    save_catalog(cat)
    print(f"\nSaved CATALOG.json with {len(recipes)} recipes total.")

if __name__ == "__main__":
    main()
