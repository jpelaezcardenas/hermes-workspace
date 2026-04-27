#!/usr/bin/env python3
"""Unified markdown diagram renderer for Mermaid and PlantUML.

Scans a markdown file for ```mermaid and ```plantuml blocks, validates them,
renders them with the appropriate renderer, and writes a summary report.

Usage:
    python3 scripts/diagram_renderer.py input.md [output_dir]

Outputs:
    output_dir/diagram-001.svg / .png
    output_dir/diagram-002.svg / .png
    ...

Options:
    --svg-only      Only produce SVG files
    --png-only      Only produce PNG files
    --dpi N         PNG resolution for PlantUML and target DPI for Mermaid
    --check         Syntax check only, no rendering
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import mermaid_to_images
import plantuml_to_images

BLOCK_PATTERN = re.compile(r"```(mermaid|plantuml)\s*\n(.*?)```", re.DOTALL | re.IGNORECASE)


def extract_blocks(markdown_text: str) -> list[tuple[int, str, str]]:
    """Return (index, kind, code) tuples in source order."""
    blocks = []
    for i, match in enumerate(BLOCK_PATTERN.finditer(markdown_text), start=1):
        kind = match.group(1).lower()
        code = match.group(2).strip()
        blocks.append((i, kind, code))
    return blocks


def validate_block(kind: str, code: str, block_num: int) -> tuple[bool, str]:
    if kind == "mermaid":
        return mermaid_to_images.validate_mermaid_syntax(code, block_num)
    if kind == "plantuml":
        return plantuml_to_images.validate_plantuml_syntax(code, block_num)
    return False, f"Diagram {block_num}: Unsupported diagram kind '{kind}'"


def render_block(kind: str, code: str, block_num: int, output_dir: Path, svg: bool, png: bool, dpi: int) -> list[str]:
    if kind == "mermaid":
        scale = max(1, round(dpi / 72))
        return mermaid_to_images.render_diagram(code, block_num, output_dir, svg=svg, png=png, scale=scale)
    if kind == "plantuml":
        return plantuml_to_images.render_diagram(code, block_num, output_dir, svg=svg, png=png, dpi=dpi)
    return []


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Render Mermaid and PlantUML diagrams from markdown")
    parser.add_argument("input", help="Input markdown file")
    parser.add_argument("output_dir", nargs="?", help="Output directory (default: same as input)")
    parser.add_argument("--svg-only", action="store_true", help="Only produce SVG")
    parser.add_argument("--png-only", action="store_true", help="Only produce PNG")
    parser.add_argument("--dpi", type=int, default=300, help="Target PNG DPI / Mermaid scale basis (default: 300)")
    parser.add_argument("--check", action="store_true", help="Syntax check only, no rendering")
    args = parser.parse_args()

    src = Path(args.input)
    if not src.exists():
        print(f"Error: {src} not found")
        sys.exit(1)

    markdown_text = src.read_text(encoding="utf-8")
    blocks = extract_blocks(markdown_text)

    if not blocks:
        print(f"No mermaid or plantuml blocks found in {src.name}")
        sys.exit(0)

    print(f"Found {len(blocks)} diagram(s) in {src.name}")
    for num, kind, _ in blocks:
        print(f"  Diagram {num}: {kind}")

    if args.check:
        errors = []
        counts = {"mermaid": 0, "plantuml": 0}
        for num, kind, code in blocks:
            counts[kind] += 1
            valid, error = validate_block(kind, code, num)
            status = "OK" if valid else "FAIL"
            print(f"  [{kind}] Diagram {num}: {status}")
            if not valid:
                errors.append(error)
                print(f"    {error}")
        print(f"\nSummary: Mermaid={counts['mermaid']}, PlantUML={counts['plantuml']}")
        if errors:
            print(f"Validation failed: {len(errors)} error(s)")
            sys.exit(1)
        print("All diagrams passed syntax check")
        return

    out_dir = Path(args.output_dir) if args.output_dir else src.parent / "diagrams"
    out_dir.mkdir(parents=True, exist_ok=True)

    do_svg = not args.png_only
    do_png = not args.svg_only

    totals = {"mermaid": 0, "plantuml": 0, "files": 0, "errors": 0}
    for num, kind, code in blocks:
        totals[kind] += 1
        print(f"\nRendering diagram {num} [{kind}]:")
        valid, error = validate_block(kind, code, num)
        if not valid:
            print(f"  SYNTAX ERROR: {error}")
            totals["errors"] += 1
            continue
        created = render_block(kind, code, num, out_dir, svg=do_svg, png=do_png, dpi=args.dpi)
        totals["files"] += len(created)

    print("\nSummary report")
    print("--------------")
    print(f"Source file: {src}")
    print(f"Output dir : {out_dir}")
    print(f"Mermaid    : {totals['mermaid']}")
    print(f"PlantUML   : {totals['plantuml']}")
    print(f"Files made : {totals['files']}")
    print(f"Errors     : {totals['errors']}")

    if totals["errors"]:
        sys.exit(1)


if __name__ == "__main__":
    main()
