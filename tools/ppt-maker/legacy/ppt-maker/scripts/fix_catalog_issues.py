#!/usr/bin/env python3
"""Fix visual issues in CATALOG.json:
1. input-output: output box overflows, redistribute all 3 boxes equally
2. timeline-vertical-4 & 5: line x doesn't pass through circle center
3. Agenda-list valign verification
4. Connector/arrow audit
"""

import json
import copy

CATALOG_PATH = "blank-recipes/CATALOG.json"

with open(CATALOG_PATH) as f:
    catalog = json.load(f)

recipes = catalog["recipes"]

# ─────────────────────────────────────────────────────────────────
# FIX 1: input-output — redistribute 3 boxes equally across 12.35"
# ─────────────────────────────────────────────────────────────────
# Content area: x=0.50 to 12.85 (width=12.35")
# Each box: width=3.50", gap between boxes: (12.35 - 3*3.50) / 2 = 0.925"
# Box1: x=0.50,    right=4.00
# Gap1: 0.925"
# Box2: x=4.925,   right=8.425
# Gap2: 0.925"
# Box3: x=9.35,    right=12.85
# Arrows fill the gaps exactly
io = recipes["input-output"]

BOX_W = 3.50
BOX_INNER_OFFSET = 0.15  # inner margin for title/body shapes
BOX_INNER_W = BOX_W - 2 * BOX_INNER_OFFSET  # 3.20

X1 = 0.50
X2 = 4.925
X3 = 9.35
GAP = 0.925

ARROW1_X = X1 + BOX_W     # 4.00
ARROW2_X = X2 + BOX_W     # 8.425
ARROW_H = 0

BOX_Y = 2.0
BOX_H = 3.0
ARROW_Y = BOX_Y + BOX_H / 2  # 3.5

positions = {
    "input-box":    {"x_in": X1,                 "y_in": BOX_Y, "width_in": BOX_W,       "height_in": BOX_H},
    "input-label":  {"x_in": X1,                 "y_in": BOX_Y, "width_in": BOX_W,       "height_in": 0.5},
    "input-title":  {"x_in": X1 + BOX_INNER_OFFSET, "y_in": 2.55, "width_in": BOX_INNER_W, "height_in": 0.5},
    "input-body":   {"x_in": X1 + BOX_INNER_OFFSET, "y_in": 3.10, "width_in": BOX_INNER_W, "height_in": 1.6},
    "arrow1":       {"x_in": ARROW1_X,           "y_in": ARROW_Y, "width_in": GAP,        "height_in": ARROW_H},
    "process-box":  {"x_in": X2,                 "y_in": BOX_Y, "width_in": BOX_W,       "height_in": BOX_H},
    "process-label":{"x_in": X2,                 "y_in": BOX_Y, "width_in": BOX_W,       "height_in": 0.5},
    "process-title":{"x_in": X2 + BOX_INNER_OFFSET, "y_in": 2.55, "width_in": BOX_INNER_W, "height_in": 0.5},
    "process-body": {"x_in": X2 + BOX_INNER_OFFSET, "y_in": 3.10, "width_in": BOX_INNER_W, "height_in": 1.6},
    "arrow2":       {"x_in": ARROW2_X,           "y_in": ARROW_Y, "width_in": GAP,        "height_in": ARROW_H},
    "output-box":   {"x_in": X3,                 "y_in": BOX_Y, "width_in": BOX_W,       "height_in": BOX_H},
    "output-label": {"x_in": X3,                 "y_in": BOX_Y, "width_in": BOX_W,       "height_in": 0.5},
    "output-title": {"x_in": X3 + BOX_INNER_OFFSET, "y_in": 2.55, "width_in": BOX_INNER_W, "height_in": 0.5},
    "output-body":  {"x_in": X3 + BOX_INNER_OFFSET, "y_in": 3.10, "width_in": BOX_INNER_W, "height_in": 1.6},
}

for shape in io["shapes"]:
    role = shape.get("role")
    if role in positions:
        shape["position"].update(positions[role])
        print(f"  input-output/{role}: updated to {positions[role]}")

print("✓ input-output fixed")

# ─────────────────────────────────────────────────────────────────
# FIX 2: timeline-vertical-4 — line x must pass through circle center
# ─────────────────────────────────────────────────────────────────
# Repeat: start_x=0.5, item_width=12.35, center_v=true
# Marker: offset_x=2.25, width=0.5  → center_x = 0.5 + 2.25 + 0.25 = 3.00
# Current line x = 2.5 → wrong

tv4 = recipes["timeline-vertical-4"]
for shape in tv4["shapes"]:
    if shape.get("type") == "connector" and shape.get("role") == "line":
        old_x = shape["position"]["x_in"]
        # Find circle center from repeat group
        for s in tv4["shapes"]:
            if "shapes_per_item" in s:
                for sp in s["shapes_per_item"]:
                    if sp.get("role") == "marker" and sp.get("preset") == "ellipse":
                        repeat = s["repeat"]
                        start_x = repeat["start_x_in"]
                        offset_x = sp["offset_x_in"]
                        radius = sp["width_in"] / 2
                        center_x = start_x + offset_x + radius
                        shape["position"]["x_in"] = center_x
                        print(f"  timeline-vertical-4/line: x {old_x} → {center_x} (circle center)")
                        break
print("✓ timeline-vertical-4 fixed")

# ─────────────────────────────────────────────────────────────────
# FIX 3: timeline-vertical-5 — line x must pass through circle center
# ─────────────────────────────────────────────────────────────────
# Repeat: start_x=0.5
# Marker: offset_x=2.28, width=0.45 → center_x = 0.5 + 2.28 + 0.225 = 3.005
# Current line x = 2.5 → wrong

tv5 = recipes["timeline-vertical-5"]
for shape in tv5["shapes"]:
    if shape.get("type") == "connector" and shape.get("role") == "line":
        old_x = shape["position"]["x_in"]
        for s in tv5["shapes"]:
            if "shapes_per_item" in s:
                for sp in s["shapes_per_item"]:
                    if sp.get("role") == "marker" and sp.get("preset") == "ellipse":
                        repeat = s["repeat"]
                        start_x = repeat["start_x_in"]
                        offset_x = sp["offset_x_in"]
                        radius = sp["width_in"] / 2
                        center_x = round(start_x + offset_x + radius, 3)
                        shape["position"]["x_in"] = center_x
                        print(f"  timeline-vertical-5/line: x {old_x} → {center_x} (circle center)")
                        break
print("✓ timeline-vertical-5 fixed")

# ─────────────────────────────────────────────────────────────────
# FIX 4: timeline-horizontal — verify line y passes through marker center
# ─────────────────────────────────────────────────────────────────
# start_y=3.35, marker offset_y=0, marker height=0.30 → center = 3.35 + 0 + 0.15 = 3.50
# Line y = 3.50 ✓ — already correct, just log

th = recipes["timeline-horizontal"]
for shape in th["shapes"]:
    if shape.get("type") == "connector" and shape.get("role") == "timeline-line":
        line_y = shape["position"]["y_in"]
        # Compute expected center
        for s in th["shapes"]:
            if "shapes_per_item" in s:
                repeat = s["repeat"]
                for sp in s["shapes_per_item"]:
                    if sp.get("role") == "marker":
                        expected_y = repeat["start_y_in"] + sp.get("offset_y_in", 0) + sp["height_in"] / 2
                        if abs(line_y - expected_y) > 0.001:
                            old_y = line_y
                            shape["position"]["y_in"] = round(expected_y, 3)
                            print(f"  timeline-horizontal/line: y {old_y} → {expected_y}")
                        else:
                            print(f"  timeline-horizontal/line: y={line_y} already correct (marker center={expected_y}) ✓")
                        break
print("✓ timeline-horizontal checked")

# ─────────────────────────────────────────────────────────────────
# FIX 5: timeline-h-5 — same check
# ─────────────────────────────────────────────────────────────────
th5 = recipes["timeline-h-5"]
for shape in th5["shapes"]:
    if shape.get("type") == "connector" and shape.get("role") == "line":
        line_y = shape["position"]["y_in"]
        for s in th5["shapes"]:
            if "shapes_per_item" in s:
                repeat = s["repeat"]
                for sp in s["shapes_per_item"]:
                    if sp.get("role") == "marker":
                        expected_y = repeat["start_y_in"] + sp.get("offset_y_in", 0) + sp["height_in"] / 2
                        if abs(line_y - expected_y) > 0.001:
                            old_y = line_y
                            shape["position"]["y_in"] = round(expected_y, 3)
                            print(f"  timeline-h-5/line: y {old_y} → {expected_y}")
                        else:
                            print(f"  timeline-h-5/line: y={line_y} already correct (marker center={expected_y}) ✓")
                        break
print("✓ timeline-h-5 checked")

# ─────────────────────────────────────────────────────────────────
# FIX 6: Ensure agenda-list-5 and agenda-list-7 title shapes have valign center
# ─────────────────────────────────────────────────────────────────
for recipe_name in ["agenda-list-5", "agenda-list-7"]:
    recipe = recipes[recipe_name]
    for s in recipe["shapes"]:
        if "shapes_per_item" in s:
            for sp in s["shapes_per_item"]:
                if sp.get("role") == "title":
                    current = sp.get("style", {}).get("valign")
                    if current != "center":
                        sp["style"]["valign"] = "center"
                        print(f"  {recipe_name}/title: valign '{current}' → 'center'")
                    else:
                        print(f"  {recipe_name}/title: valign=center already ✓")
print("✓ agenda-list valign checked")

# ─────────────────────────────────────────────────────────────────
# FIX 7: Global ellipse audit — ensure all timeline/small circle markers
# have equal width and height (only for small circles, not intentional ovals)
# ─────────────────────────────────────────────────────────────────
OVAL_INTENTIONAL = {"hub-spoke-4", "hub-spoke-6", "venn-2", "venn-3", "concentric-3", "score-card"}

def fix_circles_in_shapes(shapes, recipe_name, context):
    for s in shapes:
        if isinstance(s, dict):
            if s.get("preset") == "ellipse":
                w = s.get("width_in")
                h = s.get("height_in")
                if w is not None and h is not None and w != h and recipe_name not in OVAL_INTENTIONAL:
                    # For small markers (< 1"), force square by taking the min
                    if w < 1.0 and h < 1.0:
                        sq = min(w, h)
                        s["width_in"] = sq
                        s["height_in"] = sq
                        print(f"  {recipe_name}/{context}: ellipse {w}x{h} → {sq}x{sq}")
            # Recurse into shapes_per_item
            if "shapes_per_item" in s:
                fix_circles_in_shapes(s["shapes_per_item"], recipe_name, context + "/item")
            if "shapes" in s:
                fix_circles_in_shapes(s["shapes"], recipe_name, context + "/shapes")

for name, recipe in recipes.items():
    if name not in OVAL_INTENTIONAL:
        fix_circles_in_shapes(recipe.get("shapes", []), name, "shape")

print("✓ Global ellipse audit complete")

# ─────────────────────────────────────────────────────────────────
# FIX 8: Connector/arrow audit — check for negative dimensions
# ─────────────────────────────────────────────────────────────────
def audit_connectors(shapes, recipe_name):
    for s in shapes:
        if isinstance(s, dict):
            if s.get("type") == "connector":
                pos = s.get("position", {})
                w = pos.get("width_in", 0)
                h = pos.get("height_in", 0)
                if w < 0 or h < 0:
                    print(f"  WARNING {recipe_name}/{s.get('role')}: negative dimension w={w} h={h}")
            if "shapes_per_item" in s:
                audit_connectors(s["shapes_per_item"], recipe_name)
            if "shapes" in s:
                audit_connectors(s["shapes"], recipe_name)

for name, recipe in recipes.items():
    audit_connectors(recipe.get("shapes", []), name)

print("✓ Connector audit complete (any warnings shown above)")

# ─────────────────────────────────────────────────────────────────
# Write fixed catalog
# ─────────────────────────────────────────────────────────────────
with open(CATALOG_PATH, "w") as f:
    json.dump(catalog, f, indent=2)
    f.write("\n")

print("\n✅ CATALOG.json updated successfully")
