#!/usr/bin/env python3
"""
inject_from_catalog.py — Universal declarative shape renderer for blank slide recipes.

Reads recipe definitions from CATALOG.json and renders shapes via officecli batch.
Replaces the per-recipe renderer functions in inject_shapes.py.

Usage:
    python3 scripts/inject_from_catalog.py output/deck.pptx configs/deck.json
"""

import json
import subprocess
import sys
import os
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = ROOT / "blank-recipes" / "CATALOG.json"
RECIPES_PATH = ROOT / "blank-recipes" / "RECIPES.json"  # fallback
BLANK_BANK_FILE = "slide-004-blank.pptx"

CM_PER_INCH = 2.54

# ─── Batch command collector ───

_batch_commands = []
_current_pptx = None


def in_to_cm(inches: float) -> str:
    return f"{round(inches * CM_PER_INCH, 4)}cm"


def officecli_add(pptx_path: str, slide_idx: int, shape_type: str, props: dict) -> bool:
    global _current_pptx
    _current_pptx = pptx_path
    _batch_commands.append({
        "command": "add",
        "parent": f"/slide[{slide_idx}]",
        "type": shape_type,
        "props": {k: str(v) for k, v in props.items()}
    })
    return True


def flush_batch() -> bool:
    global _batch_commands, _current_pptx
    if not _batch_commands or not _current_pptx:
        return True

    total = len(_batch_commands)
    print(f"  [batch] Flushing {total} shape commands via officecli batch...")

    batch_json = json.dumps(_batch_commands)
    cmd = ["officecli", "batch", _current_pptx, "--commands", batch_json]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    if result.returncode != 0:
        print(f"  [ERROR] officecli batch failed: {result.stderr[:500]}", file=sys.stderr)
        _batch_commands = []
        return False

    print(f"  [batch] {total} shapes injected successfully.")
    _batch_commands = []
    return True


# ─── Position calculation ───

def _guard_overflow(repeat_config: dict, item_count: int) -> float:
    """Auto-scale item dimensions if total would exceed available space.
    
    Returns the scale factor applied (1.0 = no scaling needed).
    Caller should scale sub-shape widths/heights proportionally when scale != 1.0.
    """
    if item_count <= 0:
        return 1.0

    direction = repeat_config.get("direction", "horizontal")
    cols = repeat_config.get("cols", item_count)

    # --- Horizontal overflow guard ---
    if direction in ("horizontal", "grid"):
        item_w = repeat_config.get("item_width_in", 2.0)
        h_gap = repeat_config.get("h_gap_in", 0.2)
        avail_w = repeat_config.get("available_width_in", 12.35)

        effective_cols = item_count if direction == "horizontal" else min(cols, item_count)
        total_w = effective_cols * item_w + (effective_cols - 1) * h_gap

        if total_w > avail_w and effective_cols > 0:
            new_item_w = (avail_w - (effective_cols - 1) * h_gap) / effective_cols
            if new_item_w < 0.5:
                # Items too narrow even with current gaps; shrink gaps too
                new_item_w = avail_w / (effective_cols + (effective_cols - 1) * 0.1)
                h_gap = new_item_w * 0.1
                repeat_config["h_gap_in"] = round(h_gap, 4)
            h_scale = new_item_w / item_w
            repeat_config["item_width_in"] = round(new_item_w, 4)
            return h_scale

    # --- Vertical overflow guard ---
    if direction == "vertical":
        item_h = repeat_config.get("item_height_in", 2.0)
        v_gap = repeat_config.get("v_gap_in", 0.2)
        avail_h = repeat_config.get("available_height_in", 5.5)
        total_h = item_count * item_h + (item_count - 1) * v_gap
        if total_h > avail_h and item_count > 0:
            new_item_h = (avail_h - (item_count - 1) * v_gap) / item_count
            v_scale = new_item_h / item_h
            repeat_config["item_height_in"] = round(new_item_h, 4)
            return v_scale
    elif direction == "grid":
        item_h = repeat_config.get("item_height_in", 2.0)
        v_gap = repeat_config.get("v_gap_in", 0.2)
        avail_h = repeat_config.get("available_height_in", 5.5)
        rows = math.ceil(item_count / cols)
        total_h = rows * item_h + (rows - 1) * v_gap
        if total_h > avail_h and rows > 0:
            new_item_h = (avail_h - (rows - 1) * v_gap) / rows
            v_scale = new_item_h / item_h
            repeat_config["item_height_in"] = round(new_item_h, 4)
            return v_scale

    return 1.0  # no scaling needed


def calculate_positions(repeat_cfg: dict, count: int) -> list:
    """Calculate (x, y) positions for repeated items based on direction and centering."""
    direction = repeat_cfg.get("direction", "horizontal")
    start_x = repeat_cfg.get("start_x_in", 0.50)
    start_y = repeat_cfg.get("start_y_in", 1.35)
    item_w = repeat_cfg.get("item_width_in", 3.0)
    item_h = repeat_cfg.get("item_height_in", 2.0)
    h_gap = repeat_cfg.get("h_gap_in", 0.20)
    v_gap = repeat_cfg.get("v_gap_in", 0.40)
    cols = repeat_cfg.get("cols", count)
    avail_w = repeat_cfg.get("available_width_in", 12.35)
    avail_h = repeat_cfg.get("available_height_in", 5.25)
    center_h = repeat_cfg.get("center_h", True)
    center_v = repeat_cfg.get("center_v", False)

    positions = []

    if direction == "horizontal":
        total_w = count * item_w + (count - 1) * h_gap
        x_start = start_x + (avail_w - total_w) / 2 if center_h else start_x
        y_start = start_y + (avail_h - item_h) / 2 if center_v else start_y
        for i in range(count):
            positions.append((x_start + i * (item_w + h_gap), y_start))

    elif direction == "vertical":
        total_h = count * item_h + (count - 1) * v_gap
        x_start = start_x + (avail_w - item_w) / 2 if center_h else start_x
        y_start = start_y + (avail_h - total_h) / 2 if center_v else start_y
        for i in range(count):
            positions.append((x_start, y_start + i * (item_h + v_gap)))

    elif direction == "grid":
        rows_count = math.ceil(count / cols)
        total_w = cols * item_w + (cols - 1) * h_gap
        total_h = rows_count * item_h + (rows_count - 1) * v_gap
        x_start = start_x + (avail_w - total_w) / 2 if center_h else start_x
        y_start = start_y + (avail_h - total_h) / 2 if center_v else start_y
        for i in range(count):
            row = i // cols
            col = i % cols
            positions.append((
                x_start + col * (item_w + h_gap),
                y_start + row * (item_h + v_gap)
            ))

    return positions


def count_items(config: dict, prefix: str) -> int:
    """Count how many {prefix}1_*, {prefix}2_*, ... exist in config."""
    count = 0
    for i in range(1, 20):
        # Check for any field with this prefix and index
        found = False
        for key in config:
            if key.startswith(f"{prefix}{i}_") or key == f"{prefix}{i}":
                found = True
                break
        if found:
            count = i
        else:
            break
    return count


# ─── Shape rendering ───

def _sanitize_text(text: str) -> str:
    """Clean text for PowerPoint rendering.
    
    - Replace '* ' bullet markers at line start with '• '
    - Strip single emphasis *text* patterns (leave text, remove asterisks)
    - Strip bold **text** markers (leave text, remove double asterisks)
    """
    if not text:
        return text
    import re
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        # Replace bullet markers at line start: '* ', '- '
        if line.lstrip().startswith('* '):
            indent = len(line) - len(line.lstrip())
            line = ' ' * indent + '• ' + line.lstrip()[2:]
        elif line.lstrip().startswith('- '):
            indent = len(line) - len(line.lstrip())
            line = ' ' * indent + '• ' + line.lstrip()[2:]
        cleaned.append(line)
    result = '\n'.join(cleaned)
    # Strip bold markers **text** -> text
    result = re.sub(r'\*\*([^*]+)\*\*', r'\1', result)
    # Strip single emphasis *text* -> text (but not bullet •)
    result = re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)', r'\1', result)
    return result


def build_shape_props(shape_def: dict, abs_x: float, abs_y: float, text: str = None) -> dict:
    """Build officecli props dict from a shape definition."""
    style = shape_def.get("style", {})
    props = {
        "preset": shape_def.get("preset", "rect"),
        "x": in_to_cm(abs_x),
        "y": in_to_cm(abs_y),
        "width": in_to_cm(shape_def.get("width_in", shape_def.get("position", {}).get("width_in", 1.0))),
        "height": in_to_cm(shape_def.get("height_in", shape_def.get("position", {}).get("height_in", 1.0))),
    }

    # Style properties
    if "fill" in style:
        props["fill"] = style["fill"]
    if "line" in style:
        props["line"] = style["line"]

    # Text properties
    if text:
        props["autoFit"] = style.get("autoFit", "shape")
        props["text"] = _sanitize_text(text)
        props["font"] = style.get("font", "Figtree")
        props["size"] = style.get("font_size", 11)
        if style.get("bold"):
            props["bold"] = "true"
        else:
            props["bold"] = "false"
        if "color" in style:
            props["color"] = style["color"]
        if "align" in style:
            props["align"] = style["align"]
        if "valign" in style:
            props["valign"] = style["valign"]

    return props


def build_connector_props(conn_def: dict, x: float, y: float, width: float) -> dict:
    """Build props for a connector between items."""
    style = conn_def.get("style", {})
    props = {
        "preset": conn_def.get("preset", "straight"),
        "x": in_to_cm(x),
        "y": in_to_cm(y),
        "width": in_to_cm(width),
        "height": "0cm",
    }
    if "line" in style:
        props["line"] = style["line"]
    if "lineWidth" in style:
        props["lineWidth"] = style["lineWidth"]
    if "tailEnd" in style:
        props["tailEnd"] = style["tailEnd"]
    if "headEnd" in style:
        props["headEnd"] = style["headEnd"]
    if "flipH" in style:
        props["flipH"] = style["flipH"]
    if "flipV" in style:
        props["flipV"] = style["flipV"]
    return props


def render_recipe(pptx_path: str, slide_idx: int, config: dict, recipe: dict):
    """Universal renderer: processes the shapes array from a recipe definition."""
    shapes = recipe.get("shapes", [])
    shape_count = 0

    for shape_def in shapes:
        if "repeat" in shape_def:
            # Repeated element group
            repeat = shape_def["repeat"]
            prefix = repeat["prefix"]
            max_count = repeat.get("max_count", 10)
            item_count = min(count_items(config, prefix), max_count)

            if item_count == 0:
                continue

            # Guard against overflow: auto-scale if items exceed available space
            scale = _guard_overflow(repeat, item_count)
            if scale != 1.0:
                print(f"  [guard] Auto-scaled {prefix} items by {scale:.3f} to prevent overflow")
                # Scale sub-shape widths/heights proportionally
                for sub in shape_def.get("shapes_per_item", []):
                    if scale < 1.0:
                        old_w = sub.get("width_in", 0)
                        old_h = sub.get("height_in", 0)
                        if old_w:
                            sub["width_in"] = round(old_w * scale, 4)
                        if old_h:
                            sub["height_in"] = round(old_h * scale, 4)
                        # Scale offsets too
                        if "offset_x_in" in sub and sub["offset_x_in"] != 0:
                            sub["offset_x_in"] = round(sub["offset_x_in"] * scale, 4)
                        if "offset_y_in" in sub and sub["offset_y_in"] != 0:
                            sub["offset_y_in"] = round(sub["offset_y_in"] * scale, 4)

            positions = calculate_positions(repeat, item_count)

            for idx, (base_x, base_y) in enumerate(positions):
                i = idx + 1  # 1-based index for field names

                # Render each sub-shape for this item
                for sub in shape_def.get("shapes_per_item", []):
                    offset_x = sub.get("offset_x_in", 0)
                    offset_y = sub.get("offset_y_in", 0)
                    abs_x = base_x + offset_x
                    abs_y = base_y + offset_y

                    # Resolve content field
                    text = None
                    if "content" in sub:
                        field = sub["content"].replace("{prefix}", prefix).replace("{i}", str(i))
                        text = config.get(field)
                        if text is None and sub.get("role") in ("background", "card", "accent", "circle"):
                            text = None  # backgrounds don't need text
                        elif text is None and sub.get("required", False):
                            continue  # skip required text shapes with no content

                    sub_type = sub.get("type", "shape")
                    props = build_shape_props(sub, abs_x, abs_y, text)
                    officecli_add(pptx_path, slide_idx, sub_type, props)
                    shape_count += 1

                # Connectors between items
                if "connectors_between_items" in shape_def and i < item_count:
                    conn = shape_def["connectors_between_items"]
                    item_w = repeat.get("item_width_in", 2.0)
                    h_gap = repeat.get("h_gap_in", 0.2)
                    conn_x = base_x + item_w + conn.get("offset_from_item_right_in", 0.05)
                    conn_y = base_y + conn.get("y_center_in", repeat.get("item_height_in", 2.0) / 2)
                    conn_w = h_gap - 2 * conn.get("offset_from_item_right_in", 0.05)
                    props = build_connector_props(conn, conn_x, conn_y, max(conn_w, 0.1))
                    officecli_add(pptx_path, slide_idx, "connector", props)
                    shape_count += 1

        else:
            # Static shape
            pos = shape_def.get("position", {})
            abs_x = pos.get("x_in", 0.5)
            abs_y = pos.get("y_in", 1.35)

            text = None
            if "content" in shape_def:
                text = config.get(shape_def["content"])

            shape_def_with_dims = dict(shape_def)
            shape_def_with_dims["width_in"] = pos.get("width_in", 1.0)
            shape_def_with_dims["height_in"] = pos.get("height_in", 1.0)

            s_type = shape_def.get("type", "shape")
            props = build_shape_props(shape_def_with_dims, abs_x, abs_y, text)
            officecli_add(pptx_path, slide_idx, s_type, props)
            shape_count += 1

    return shape_count


# ─── Loading ───

def load_catalog() -> dict:
    """Load recipe catalog. Falls back to RECIPES.json if CATALOG.json not found."""
    if CATALOG_PATH.exists():
        with open(CATALOG_PATH) as f:
            data = json.load(f)
        return data.get("recipes", data)
    elif RECIPES_PATH.exists():
        print("[inject] CATALOG.json not found, falling back to RECIPES.json")
        with open(RECIPES_PATH) as f:
            return json.load(f)
    else:
        print("[ERROR] No catalog or recipes file found.", file=sys.stderr)
        sys.exit(1)


def load_config(config_path: str) -> list:
    with open(config_path) as f:
        data = json.load(f)
    if isinstance(data, list):
        return data
    return data.get("slides", data)


def get_recipe_slides(slides: list) -> list:
    results = []
    for idx, slide in enumerate(slides, start=1):
        if slide.get("bank_file") == BLANK_BANK_FILE and slide.get("recipe"):
            results.append((idx, slide))
    return results


# ─── Main ───

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 inject_from_catalog.py <output.pptx> <config.json>", file=sys.stderr)
        sys.exit(1)

    pptx_path = sys.argv[1]
    config_path = sys.argv[2]

    if not os.path.exists(pptx_path):
        print(f"ERROR: PPTX not found: {pptx_path}", file=sys.stderr)
        sys.exit(1)
    if not os.path.exists(config_path):
        print(f"ERROR: Config not found: {config_path}", file=sys.stderr)
        sys.exit(1)

    print(f"[inject] Loading config: {config_path}")
    slides = load_config(config_path)
    catalog = load_catalog()

    recipe_slides = get_recipe_slides(slides)
    if not recipe_slides:
        print("[inject] No blank recipe slides found. Nothing to do.")
        return

    print(f"[inject] Found {len(recipe_slides)} blank recipe slide(s) to process.")
    total_shapes = 0

    for slide_idx, slide_cfg in recipe_slides:
        recipe_name = slide_cfg["recipe"]
        slide_title = slide_cfg.get("title", f"Slide {slide_idx}")

        print(f"\n[inject] Slide {slide_idx}: '{slide_title}' -> recipe '{recipe_name}'")

        if recipe_name not in catalog:
            print(f"  [WARN] Unknown recipe '{recipe_name}'. Skipping.", file=sys.stderr)
            continue

        recipe = catalog[recipe_name]
        count = render_recipe(pptx_path, slide_idx, slide_cfg, recipe)
        total_shapes += count
        print(f"  -> {count} shapes queued")

    if not flush_batch():
        print("[inject] ERROR: Batch injection failed.", file=sys.stderr)
        sys.exit(1)

    print(f"\n[inject] Done. {total_shapes} shapes injected into {pptx_path}")


if __name__ == "__main__":
    main()
