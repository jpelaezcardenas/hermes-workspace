#!/usr/bin/env python3
"""
inject_shapes.py — Post-processor for blank slides with recipes.

Usage:
    python3 scripts/inject_shapes.py output/deck.pptx configs/deck.json

Reads the config JSON, finds slides using slide-004-blank.pptx that have a
'recipe' field, determines their slide index in the built PPTX, loads the
recipe from RECIPES.json, and injects shapes via officecli.
"""

import json
import re
import subprocess
import sys
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RECIPES_PATH = ROOT / "blank-recipes" / "RECIPES.json"
BLANK_BANK_FILE = "slide-004-blank.pptx"

print("WARNING: inject_shapes.py only supports 6 legacy recipes. Use inject_from_catalog.py (110 recipes) instead.", file=sys.stderr)

# Conversion helpers
CM_PER_INCH = 2.54


# ─────────────────────────────────────────────────────────────────────────────
# Text sanitisation — config JSON uses markdown-style bullets and bold markers
# that render as literal characters in PowerPoint shapes. This converts them
# to presentation-safe equivalents before injection.
# ─────────────────────────────────────────────────────────────────────────────

def _sanitize_text(text: str) -> str:
    """Clean markdown artefacts from config text before injecting into shapes.

    • Lines starting with ``* `` or ``- `` → proper bullet ``• ``
    • ``**bold**`` markers → stripped (shapes don't support inline bold)
    """
    if not isinstance(text, str):
        return text
    # Strip **bold** markers (non-greedy, handles multiple per line)
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
    # Convert markdown bullet prefixes to proper bullet character
    lines = text.split('\n')
    out = []
    for line in lines:
        if line.startswith('* '):
            line = '• ' + line[2:]
        elif line.startswith('- '):
            line = '• ' + line[2:]
        out.append(line)
    return '\n'.join(out)


# ─────────────────────────────────────────────────────────────────────────────
# Content-area clamping — ensures shapes never exceed the designated content
# region of a slide, preventing overflow on left/right/bottom edges.
# ─────────────────────────────────────────────────────────────────────────────

def _clamp_to_content_area(x: float, y: float, w: float, h: float,
                           ca: dict) -> tuple:
    """Return (x, y, w, h) clamped to fit within *ca* (content_area dict).

    *ca* must have keys ``x_in``, ``y_in``, ``width_in``, ``height_in``.
    If a shape would exceed the boundary it is shifted inward and/or shrunk.
    """
    ca_x = ca["x_in"]
    ca_y = ca["y_in"]
    ca_r = ca_x + ca["width_in"]
    ca_b = ca_y + ca["height_in"]

    # Clamp left edge
    if x < ca_x:
        w -= (ca_x - x)
        x = ca_x
    # Clamp top edge
    if y < ca_y:
        h -= (ca_y - y)
        y = ca_y
    # Clamp right edge
    if x + w > ca_r:
        w = ca_r - x
    # Clamp bottom edge
    if y + h > ca_b:
        h = ca_b - y
    # Ensure minimum dimensions
    w = max(w, 0.1)
    h = max(h, 0.1)
    return (x, y, w, h)


def in_to_cm(inches: float) -> str:
    return f"{round(inches * CM_PER_INCH, 4)}cm"


# Global batch command collector
_batch_commands = []
_current_pptx = None


def officecli_add(pptx_path: str, slide_idx: int, shape_type: str, props: dict) -> bool:
    """Collect an add command for batch execution.

    Text values are automatically sanitised via ``_sanitize_text`` so callers
    don't need to remember to clean markdown artefacts.
    """
    global _current_pptx
    _current_pptx = pptx_path
    # Auto-sanitise any text property
    if "text" in props:
        props = dict(props)  # shallow copy to avoid mutating caller's dict
        props["text"] = _sanitize_text(props["text"])
    _batch_commands.append({
        "command": "add",
        "parent": f"/slide[{slide_idx}]",
        "type": shape_type,
        "props": {k: str(v) for k, v in props.items()}
    })
    return True


def flush_batch() -> bool:
    """Execute all collected commands in a single officecli batch call."""
    global _batch_commands, _current_pptx
    if not _batch_commands or not _current_pptx:
        return True

    total = len(_batch_commands)
    print(f"  [batch] Flushing {total} shape commands via officecli batch...")

    batch_json = json.dumps(_batch_commands)
    cmd = ["officecli", "batch", _current_pptx, "--commands", batch_json]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        print(f"  [ERROR] officecli batch failed: {result.stderr[:500]}", file=sys.stderr)
        _batch_commands = []
        return False

    print(f"  [batch] {total} shapes injected successfully.")
    _batch_commands = []
    return True


def load_recipes() -> dict:
    with open(RECIPES_PATH) as f:
        return json.load(f)


def load_config(config_path: str) -> list:
    with open(config_path) as f:
        data = json.load(f)
    if isinstance(data, list):
        return data
    return data.get("slides", data)


def get_recipe_slides(slides: list) -> list:
    """Return list of (slide_1based_index, slide_config) for blank recipe slides."""
    results = []
    for idx, slide in enumerate(slides, start=1):
        if slide.get("bank_file") == BLANK_BANK_FILE and slide.get("recipe"):
            results.append((idx, slide))
    return results


# ─────────────────────────────────────────────────────────────────────────────
# Recipe renderers
# ─────────────────────────────────────────────────────────────────────────────

def render_architecture_stack(pptx_path: str, slide_idx: int, cfg: dict, recipe: dict):
    """Render stacked horizontal layer boxes."""
    layout = recipe["layout"]
    ld = layout["layer_defaults"]
    colors = layout["layer_colors"]
    title_cfg = layout["title_box"]
    body_cfg = layout["body_box"]

    # Use preset from layer_defaults if available
    bar_preset = ld.get("preset", "roundRect")

    layer_num = 0
    for i in range(1, 6):
        title_key = f"layer{i}_title"
        body_key = f"layer{i}_body"
        if title_key not in cfg:
            continue

        color = colors[layer_num % len(colors)]
        y_in = ld["start_y_in"] + layer_num * (ld["height_in"] + ld["gap_in"])
        x_in = ld["x_in"]
        w_in = ld["width_in"]
        h_in = ld["height_in"]

        # Background bar
        print(f"    Layer {i}: background bar at y={y_in:.2f}\"")
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": bar_preset,
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_in),
            "width": in_to_cm(w_in),
            "height": in_to_cm(h_in),
            "fill": color["fill"],
            "line": color["fill"],
        })

        # Title label (left side of bar)
        title_x = x_in + title_cfg["x_offset_in"]
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(title_x),
            "y": in_to_cm(y_in),
            "width": in_to_cm(title_cfg["width_in"]),
            "height": in_to_cm(h_in),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": cfg[title_key],
            "font": "Figtree",
            "size": title_cfg["font_size"],
            "bold": "true",
            "color": color["title_color"],
        })

        # Body text (right side of bar)
        if body_key in cfg:
            body_x = x_in + body_cfg["x_offset_in"]
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(body_x),
                "y": in_to_cm(y_in),
                "width": in_to_cm(body_cfg["width_in"]),
                "height": in_to_cm(h_in),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[body_key],
                "font": "Figtree",
                "size": body_cfg["font_size"],
                "bold": "false",
                "color": color["body_color"],
            })

        layer_num += 1


def render_process_flow(pptx_path: str, slide_idx: int, cfg: dict, recipe: dict):
    """Render step boxes with arrow connectors between them."""
    layout = recipe["layout"]
    ca = layout["content_area"]
    conn_cfg = layout["connector"]

    # Count steps
    step_count = 0
    for i in range(1, 6):
        if f"step{i}_title" in cfg:
            step_count = i

    if step_count < 3:
        step_count = 3

    step_key = str(min(step_count, 5))
    if step_key not in layout["step_configs"]:
        step_key = "4"
    sc = layout["step_configs"][step_key]

    box_w = sc["box_width_in"]
    box_h = sc["box_height_in"]
    gap = sc["gap_in"]
    conn_w = sc["connector_width_in"]
    y_top = ca["y_in"]

    # Calculate x positions — clamp total width to content area
    total_w = step_count * box_w + (step_count - 1) * (gap + conn_w)
    if total_w > ca["width_in"]:
        # Shrink boxes proportionally to fit
        avail = ca["width_in"] - (step_count - 1) * (gap + conn_w)
        box_w = max(avail / step_count, 0.5)
        total_w = step_count * box_w + (step_count - 1) * (gap + conn_w)
    x_start = ca["x_in"] + (ca["width_in"] - total_w) / 2

    # v2.0: number_circle (was number_box), title_box, body_box unchanged
    num_cfg = layout["number_circle"]
    title_cfg = layout["title_box"]
    body_cfg = layout["body_box"]
    box_style = layout["box_style"]
    conn_y_in = y_top + conn_cfg["y_center_offset_in"]

    # v2.0: box_style uses "preset" (was "corner_radius") and "border" (was "border_color")
    box_preset = box_style["preset"]
    box_border = box_style["border"]

    # number_circle diameter (v2 uses diameter_in instead of height_in)
    num_diameter = num_cfg["diameter_in"]
    num_text_color = num_cfg["text_color"]  # v2: text_color (was color)
    num_preset = num_cfg.get("preset", "ellipse")

    for i in range(1, step_count + 1):
        step_num_key = f"step{i}_number"
        step_title_key = f"step{i}_title"
        step_body_key = f"step{i}_body"

        if step_title_key not in cfg:
            continue

        x_in = x_start + (i - 1) * (box_w + gap + conn_w)

        # Step background box
        print(f"    Step {i}: box at x={x_in:.2f}\"")
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": box_preset,
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_top),
            "width": in_to_cm(box_w),
            "height": in_to_cm(box_h),
            "fill": box_style["fill"],
            "line": box_border,
        })

        # Step number circle (centered horizontally in box)
        num_text = cfg.get(step_num_key, str(i))
        circle_x = x_in + (box_w - num_diameter) / 2
        circle_y = y_top + num_cfg["y_offset_in"]
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": num_preset,
            "x": in_to_cm(circle_x),
            "y": in_to_cm(circle_y),
            "width": in_to_cm(num_diameter),
            "height": in_to_cm(num_diameter),
            "fill": num_cfg["fill"],
            "line": num_cfg["fill"],
        })
        # Number text overlay on circle
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(circle_x),
            "y": in_to_cm(circle_y),
            "width": in_to_cm(num_diameter),
            "height": in_to_cm(num_diameter),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": num_text,
            "font": "Figtree",
            "size": num_cfg["font_size"],
            "bold": "true",
            "color": num_text_color,
            "align": "center",
        })

        # Step title
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(x_in + 0.1),
            "y": in_to_cm(y_top + title_cfg["y_offset_in"]),
            "width": in_to_cm(box_w - 0.2),
            "height": in_to_cm(title_cfg["height_in"]),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": cfg[step_title_key],
            "font": "Figtree",
            "size": title_cfg["font_size"],
            "bold": "true",
            "color": title_cfg["color"],
            "align": "center",
        })

        # Step body
        if step_body_key in cfg:
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(x_in + 0.15),
                "y": in_to_cm(y_top + body_cfg["y_offset_in"]),
                "width": in_to_cm(box_w - 0.3),
                "height": in_to_cm(body_cfg["height_in"]),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[step_body_key],
                "font": "Figtree",
                "size": body_cfg["font_size"],
                "bold": "false",
                "color": body_cfg["color"],
                "align": "center",
            })

        # Arrow connector (between this step and the next)
        if i < step_count:
            conn_x = x_in + box_w + gap * 0.1
            print(f"    Connector {i}→{i+1} at x={conn_x:.2f}\"")
            officecli_add(pptx_path, slide_idx, "connector", {
                "preset": "straight",
                "x": in_to_cm(conn_x),
                "y": in_to_cm(conn_y_in),
                "width": in_to_cm(conn_w + gap * 0.8),
                "height": "0cm",
                "line": conn_cfg["line_color"],
                "tailEnd": conn_cfg["tail_end"],
            })


def render_stat_callouts(pptx_path: str, slide_idx: int, cfg: dict, recipe: dict):
    """Render large stat number cards."""
    layout = recipe["layout"]
    ca = layout["content_area"]

    # Count stats
    stat_count = 0
    for i in range(1, 5):
        if f"stat{i}_number" in cfg:
            stat_count = i

    stat_key = str(min(max(stat_count, 2), 4))
    # v2.0: card_configs (was stat_configs)
    sc = layout["card_configs"][stat_key]
    card_w = sc["card_width_in"]
    gap = sc["gap_in"]
    # v2.0: card_height_in at layout level (was card_style.height_in)
    card_h = layout["card_height_in"]
    y_in = ca["y_in"]

    total_w = stat_count * card_w + (stat_count - 1) * gap
    if total_w > ca["width_in"]:
        avail = ca["width_in"] - (stat_count - 1) * gap
        card_w = max(avail / stat_count, 0.5)
        total_w = stat_count * card_w + (stat_count - 1) * gap
    x_start = ca["x_in"] + (ca["width_in"] - total_w) / 2

    # v2.0: number_text, label_text, body_text (were number_box, label_box, body_box)
    num_cfg = layout["number_text"]
    label_cfg = layout["label_text"]
    body_cfg = layout["body_text"]
    card_style = layout["card_style"]

    # v2.0: card_style uses "border" (was no border_color, line used fill)
    card_border = card_style.get("border", card_style["fill"])

    # v2.0: number_text has font_size_large / font_size_small
    num_font_size = num_cfg.get("font_size_large", 48) if stat_count <= 3 else num_cfg.get("font_size_small", 36)

    for i in range(1, stat_count + 1):
        num_key = f"stat{i}_number"
        label_key = f"stat{i}_label"
        body_key = f"stat{i}_body"

        if num_key not in cfg:
            continue

        x_in = x_start + (i - 1) * (card_w + gap)

        # Card background
        print(f"    Stat {i}: card at x={x_in:.2f}\"")
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": card_style["preset"],
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_in),
            "width": in_to_cm(card_w),
            "height": in_to_cm(card_h),
            "fill": card_style["fill"],
            "line": card_border,
        })

        # Large number (v2: no top bar accent, number starts at y_offset_in from card top)
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_in + num_cfg["y_offset_in"]),
            "width": in_to_cm(card_w),
            "height": in_to_cm(num_cfg["height_in"]),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": cfg[num_key],
            "font": "Figtree",
            "size": num_font_size,
            "bold": "true",
            "color": num_cfg["color"],
            "align": num_cfg["align"],
        })

        # Label
        if label_key in cfg:
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(x_in),
                "y": in_to_cm(y_in + label_cfg["y_offset_in"]),
                "width": in_to_cm(card_w),
                "height": in_to_cm(label_cfg["height_in"]),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[label_key],
                "font": "Figtree",
                "size": label_cfg["font_size"],
                "bold": "true",
                "color": label_cfg["color"],
                "align": label_cfg["align"],
            })

        # Body description
        if body_key in cfg:
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(x_in + 0.15),
                "y": in_to_cm(y_in + body_cfg["y_offset_in"]),
                "width": in_to_cm(card_w - 0.3),
                "height": in_to_cm(body_cfg["height_in"]),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[body_key],
                "font": "Figtree",
                "size": body_cfg["font_size"],
                "bold": "false",
                "color": body_cfg["color"],
                "align": body_cfg["align"],
            })


def render_comparison_columns(pptx_path: str, slide_idx: int, cfg: dict, recipe: dict):
    """Render two side-by-side comparison columns."""
    layout = recipe["layout"]
    ca = layout["content_area"]
    col_w = layout["column_width_in"]
    # v2.0: gap_in (was column_gap_in)
    gap = layout["gap_in"]
    # Clamp column widths if two columns + gap exceed content area
    total_cols_w = 2 * col_w + gap
    if total_cols_w > ca["width_in"]:
        col_w = (ca["width_in"] - gap) / 2
    y_in = ca["y_in"]
    x_left = ca["x_in"]
    x_right = ca["x_in"] + col_w + gap

    # v2.0: header_bar and body_area (was header_box, body_box, left_column, right_column)
    header_cfg = layout["header_bar"]
    body_cfg = layout["body_area"]

    # Parse margin from body_area (e.g. "0.15in" → 0.15)
    margin_str = body_cfg.get("margin", "0.15in")
    margin = float(margin_str.replace("in", ""))

    for side, x_in, title_key, body_key in [
        ("left",  x_left,  "left_title",  "left_body"),
        ("right", x_right, "right_title", "right_body"),
    ]:
        if title_key not in cfg:
            continue

        print(f"    Column '{side}' at x={x_in:.2f}\"")

        # Header bar background
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": header_cfg.get("preset", "rect"),
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_in),
            "width": in_to_cm(col_w),
            "height": in_to_cm(header_cfg["height_in"]),
            "fill": header_cfg["fill"],
            "line": header_cfg["fill"],
        })

        # Header text overlay
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_in),
            "width": in_to_cm(col_w),
            "height": in_to_cm(header_cfg["height_in"]),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": cfg[title_key],
            "font": "Figtree",
            "size": header_cfg["font_size"],
            "bold": "true",
            "color": header_cfg["text_color"],
            "align": header_cfg["align"],
        })

        # Body area background
        body_y = y_in + body_cfg["y_offset_in"]
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": body_cfg.get("preset", "rect"),
            "x": in_to_cm(x_in),
            "y": in_to_cm(body_y),
            "width": in_to_cm(col_w),
            "height": in_to_cm(body_cfg["height_in"]),
            "fill": body_cfg["fill"],
            "line": body_cfg.get("border", body_cfg["fill"]),
        })

        # Body text overlay
        if body_key in cfg:
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(x_in + margin),
                "y": in_to_cm(body_y + margin),
                "width": in_to_cm(col_w - 2 * margin),
                "height": in_to_cm(body_cfg["height_in"] - 2 * margin),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[body_key],
                "font": "Figtree",
                "size": body_cfg["font_size"],
                "bold": "false",
                "color": body_cfg["text_color"],
                "align": body_cfg["align"],
            })


def render_timeline_horizontal(pptx_path: str, slide_idx: int, cfg: dict, recipe: dict):
    """Render horizontal timeline with milestones."""
    layout = recipe["layout"]

    # v2.0: line properties directly in layout (was timeline_line sub-object)
    tl_y = layout["timeline_y_in"]
    line_color = layout["line_color"]
    line_x_start = layout["line_x_start_in"]
    line_x_end = layout["line_x_end_in"]

    # v2.0: marker properties directly in layout (was circle_marker sub-object)
    marker_d = layout["marker_diameter_in"]
    marker_fill = layout["marker_fill"]

    # v2.0: date_text, title_text, body_text (were date_box, title_box, body_box)
    date_cfg = layout["date_text"]
    title_cfg = layout["title_text"]
    body_cfg = layout["body_text"]

    # Count milestones
    ms_count = 0
    for i in range(1, 6):
        if f"milestone{i}_title" in cfg:
            ms_count = i

    if ms_count < 2:
        ms_count = 2

    ms_key = str(min(ms_count, 5))
    if ms_key not in layout["milestone_configs"]:
        ms_key = "4"
    mc = layout["milestone_configs"][ms_key]
    spacing = mc["spacing_in"]

    # v2.0: calculate x_start by centering milestones on the timeline line
    line_center = (line_x_start + line_x_end) / 2
    total_span = (ms_count - 1) * spacing
    # Clamp spacing if milestones would exceed line bounds
    line_width = line_x_end - line_x_start
    if total_span > line_width and ms_count > 1:
        spacing = line_width / (ms_count - 1)
        total_span = (ms_count - 1) * spacing
    x_start = line_center - total_span / 2

    # Horizontal timeline line
    print(f"    Timeline line from x={line_x_start}\" to x={line_x_end}\"")
    officecli_add(pptx_path, slide_idx, "connector", {
        "preset": "straight",
        "x": in_to_cm(line_x_start),
        "y": in_to_cm(tl_y),
        "width": in_to_cm(line_x_end - line_x_start),
        "height": "0cm",
        "line": line_color,
    })

    for i in range(1, ms_count + 1):
        date_key = f"milestone{i}_date"
        title_key = f"milestone{i}_title"
        body_key = f"milestone{i}_body"

        if title_key not in cfg:
            continue

        cx_in = x_start + (i - 1) * spacing
        marker_r = marker_d / 2

        print(f"    Milestone {i}: marker at x={cx_in:.2f}\"")

        # Circle marker (centered on timeline line)
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "ellipse",
            "x": in_to_cm(cx_in - marker_r),
            "y": in_to_cm(tl_y - marker_r),
            "width": in_to_cm(marker_d),
            "height": in_to_cm(marker_d),
            "fill": marker_fill,
            "line": marker_fill,
        })

        # Date label — y is offset relative to timeline_y_in (negative = above)
        if date_key in cfg:
            date_w = date_cfg["width_in"]
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(cx_in - date_w / 2),
                "y": in_to_cm(tl_y + date_cfg["y_offset_in"]),
                "width": in_to_cm(date_w),
                "height": in_to_cm(date_cfg["height_in"]),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[date_key],
                "font": "Figtree",
                "size": date_cfg["font_size"],
                "bold": "true",
                "color": date_cfg["color"],
                "align": date_cfg["align"],
            })

        # Title (below line, y offset from timeline_y_in)
        title_w = title_cfg["width_in"]
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(cx_in - title_w / 2),
            "y": in_to_cm(tl_y + title_cfg["y_offset_in"]),
            "width": in_to_cm(title_w),
            "height": in_to_cm(title_cfg["height_in"]),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": cfg[title_key],
            "font": "Figtree",
            "size": title_cfg["font_size"],
            "bold": "true",
            "color": title_cfg["color"],
            "align": title_cfg["align"],
        })

        # Body (below title, y offset from timeline_y_in)
        if body_key in cfg:
            body_w = body_cfg["width_in"]
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(cx_in - body_w / 2),
                "y": in_to_cm(tl_y + body_cfg["y_offset_in"]),
                "width": in_to_cm(body_w),
                "height": in_to_cm(body_cfg["height_in"]),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[body_key],
                "font": "Figtree",
                "size": body_cfg["font_size"],
                "bold": "false",
                "color": body_cfg["color"],
                "align": body_cfg["align"],
            })


def render_icon_text_grid(pptx_path: str, slide_idx: int, cfg: dict, recipe: dict):
    """Render 2x2 or 2x3 grid of titled text blocks."""
    layout = recipe["layout"]
    ca = layout["content_area"]

    # Count items
    item_count = 0
    for i in range(1, 7):
        if f"item{i}_title" in cfg:
            item_count = i

    if item_count < 2:
        item_count = 2

    gc_key = str(min(item_count, 6))
    gc = layout["grid_configs"][gc_key]
    cols = gc["cols"]
    cell_w = gc["cell_width_in"]
    cell_h = gc["cell_height_in"]
    # v2.0: h_gap_in and v_gap_in (were col_gap_in / row_gap_in)
    col_gap = gc["h_gap_in"]
    row_gap = gc["v_gap_in"]

    # v2.0: card_style (was cell_style), title_text/body_text (were title_box/body_box)
    card_style = layout["card_style"]
    title_cfg = layout["title_text"]
    body_cfg = layout["body_text"]

    # v2.0: card_style uses "border" (was border_color)
    card_border = card_style.get("border", card_style["fill"])

    # Use smaller font for denser grids
    body_font_size = body_cfg.get("font_size_small", body_cfg["font_size"]) if item_count > 4 else body_cfg["font_size"]

    for i in range(1, item_count + 1):
        title_key = f"item{i}_title"
        body_key = f"item{i}_body"

        if title_key not in cfg:
            continue

        row = (i - 1) // cols
        col = (i - 1) % cols
        x_in = ca["x_in"] + col * (cell_w + col_gap)
        y_in = ca["y_in"] + row * (cell_h + row_gap)
        # Clamp cell to content area
        x_in, y_in, cw_eff, ch_eff = _clamp_to_content_area(
            x_in, y_in, cell_w, cell_h, ca)

        print(f"    Grid item {i} at ({col},{row}): x={x_in:.2f}\", y={y_in:.2f}\"")

        # Card background (use clamped dimensions)
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": card_style["preset"],
            "x": in_to_cm(x_in),
            "y": in_to_cm(y_in),
            "width": in_to_cm(cw_eff),
            "height": in_to_cm(ch_eff),
            "fill": card_style["fill"],
            "line": card_border,
        })

        # Title
        pad = title_cfg["x_padding_in"]
        officecli_add(pptx_path, slide_idx, "shape", {
            "preset": "rect",
            "x": in_to_cm(x_in + pad),
            "y": in_to_cm(y_in + title_cfg["y_offset_in"]),
            "width": in_to_cm(cw_eff - 2 * pad),
            "height": in_to_cm(title_cfg["height_in"]),
            "fill": "none",
            "line": "none",
            "autoFit": "shape",
            "text": cfg[title_key],
            "font": "Figtree",
            "size": title_cfg["font_size"],
            "bold": "true",
            "color": title_cfg["color"],
            "align": title_cfg["align"],
        })

        # Body text (v2.0: no divider line; body follows directly after title)
        if body_key in cfg:
            body_pad = body_cfg["x_padding_in"]
            body_y_offset = body_cfg["y_offset_in"]
            body_height = ch_eff - body_y_offset - 0.15
            officecli_add(pptx_path, slide_idx, "shape", {
                "preset": "rect",
                "x": in_to_cm(x_in + body_pad),
                "y": in_to_cm(y_in + body_y_offset),
                "width": in_to_cm(cw_eff - 2 * body_pad),
                "height": in_to_cm(body_height),
                "fill": "none",
                "line": "none",
                "autoFit": "shape",
            "text": cfg[body_key],
                "font": "Figtree",
                "size": body_font_size,
                "bold": "false",
                "color": body_cfg["color"],
                "align": body_cfg["align"],
            })


# ─────────────────────────────────────────────────────────────────────────────
# Dispatch table
# ─────────────────────────────────────────────────────────────────────────────

RECIPE_RENDERERS = {
    "architecture-stack": render_architecture_stack,
    "process-flow": render_process_flow,
    "stat-callouts": render_stat_callouts,
    "comparison-columns": render_comparison_columns,
    "timeline-horizontal": render_timeline_horizontal,
    "icon-text-grid": render_icon_text_grid,
}


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 inject_shapes.py <output.pptx> <config.json>", file=sys.stderr)
        sys.exit(1)

    pptx_path = sys.argv[1]
    config_path = sys.argv[2]

    if not os.path.exists(pptx_path):
        print(f"ERROR: PPTX not found: {pptx_path}", file=sys.stderr)
        sys.exit(1)
    if not os.path.exists(config_path):
        print(f"ERROR: Config not found: {config_path}", file=sys.stderr)
        sys.exit(1)
    if not os.path.exists(RECIPES_PATH):
        print(f"ERROR: RECIPES.json not found: {RECIPES_PATH}", file=sys.stderr)
        sys.exit(1)

    print(f"[inject_shapes] Loading config: {config_path}")
    slides = load_config(config_path)
    recipes = load_recipes()

    recipe_slides = get_recipe_slides(slides)
    if not recipe_slides:
        print("[inject_shapes] No blank recipe slides found. Nothing to do.")
        return

    print(f"[inject_shapes] Found {len(recipe_slides)} blank recipe slide(s) to process.")

    for slide_idx, slide_cfg in recipe_slides:
        recipe_name = slide_cfg["recipe"]
        slide_title = slide_cfg.get("title", f"Slide {slide_idx}")

        print(f"\n[inject_shapes] Slide {slide_idx}: '{slide_title}' → recipe '{recipe_name}'")

        if recipe_name not in recipes:
            print(f"  [WARN] Unknown recipe '{recipe_name}'. Skipping.", file=sys.stderr)
            continue

        if recipe_name not in RECIPE_RENDERERS:
            print(f"  [WARN] No renderer for recipe '{recipe_name}'. Skipping.", file=sys.stderr)
            continue

        recipe = recipes[recipe_name]

        # Validate required fields
        missing = [f for f in recipe.get("required_fields", []) if f not in slide_cfg]
        if missing:
            print(f"  [WARN] Missing required fields for '{recipe_name}': {missing}", file=sys.stderr)

        renderer = RECIPE_RENDERERS[recipe_name]
        renderer(pptx_path, slide_idx, slide_cfg, recipe)

    # Flush all collected commands in one batch
    if not flush_batch():
        print("[inject_shapes] ERROR: Batch injection failed.", file=sys.stderr)
        sys.exit(1)

    print(f"\n[inject_shapes] Done. Enhanced: {pptx_path}")


if __name__ == "__main__":
    main()
