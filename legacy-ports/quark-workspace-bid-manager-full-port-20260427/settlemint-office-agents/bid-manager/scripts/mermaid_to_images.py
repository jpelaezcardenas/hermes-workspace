#!/usr/bin/env python3
"""Extract Mermaid diagrams from markdown and convert to SVG and PNG.

Uses @mermaid-js/mermaid-cli (mmdc) for rendering.
Produces SVG (preferred for Word) and 300 DPI PNG (fallback).

Usage:
    python3 scripts/mermaid_to_images.py input.md [output_dir]

Outputs:
    output_dir/diagram-001.svg
    output_dir/diagram-001.png
    output_dir/diagram-002.svg
    output_dir/diagram-002.png
    ...

Options:
    --svg-only      Only produce SVG files
    --png-only      Only produce PNG files
    --dpi N         PNG resolution (default: 300)
    --check         Syntax check only, no rendering
"""

import json
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path


MMDC_PATH = os.environ.get("MMDC_PATH", "mmdc")
PUPPETEER_CONFIG = str(Path(__file__).resolve().parent / "puppeteer-config.json")
DEFAULT_DPI = 216
DEFAULT_SCALE = 3  # mmdc scale factor (scale=3 at 72dpi base = ~216dpi; scale=4 crashes on macOS)

# Mermaid theme config for SettleMint bid documents
MERMAID_CONFIG = {
    "theme": "base",
    "themeVariables": {
        "primaryColor": "#E8EAF6",
        "primaryTextColor": "#000099",
        "primaryBorderColor": "#000099",
        "lineColor": "#000099",
        "secondaryColor": "#FFF3E0",
        "tertiaryColor": "#E8F5E9",
        "background": "#FFFFFF",
        "fontFamily": "Figtree, sans-serif"
    },
    "flowchart": {
        "htmlLabels": False,
        "padding": 50,
        "nodeSpacing": 70,
        "rankSpacing": 70,
        "useMaxWidth": False,
        "wrappingWidth": 300
    },
    "sequence": {
        "useMaxWidth": False
    }
}


def extract_mermaid_blocks(markdown_text: str) -> list[tuple[int, str]]:
    """Extract all mermaid code blocks from markdown.
    
    Returns list of (block_index, mermaid_code) tuples.
    """
    pattern = r"```mermaid\s*\n(.*?)```"
    blocks = []
    for i, match in enumerate(re.finditer(pattern, markdown_text, re.DOTALL)):
        blocks.append((i + 1, match.group(1).strip()))
    return blocks


def validate_mermaid_syntax(code: str, block_num: int) -> tuple[bool, str]:
    """Validate Mermaid syntax by attempting a parse with mmdc.
    
    Returns (is_valid, error_message).
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".mmd", delete=False) as f:
        f.write(code)
        f.flush()
        mmd_path = f.name

    check_out = tempfile.mktemp(suffix=".svg")
    try:
        cmd = [MMDC_PATH, "-i", mmd_path, "-o", check_out, "--outputFormat", "svg"]
        if os.path.exists(PUPPETEER_CONFIG):
            cmd.extend(["--puppeteerConfigFile", PUPPETEER_CONFIG])
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0:
            return True, ""
        error = result.stderr.strip() or result.stdout.strip()
        return False, f"Diagram {block_num}: {error}"
    except subprocess.TimeoutExpired:
        return False, f"Diagram {block_num}: Render timed out (30s)"
    except FileNotFoundError:
        return False, f"mmdc not found at '{MMDC_PATH}'. Install: npm install -g @mermaid-js/mermaid-cli"
    finally:
        os.unlink(mmd_path)
        if os.path.exists(check_out):
            os.unlink(check_out)


def render_diagram(
    code: str,
    block_num: int,
    output_dir: Path,
    svg: bool = True,
    png: bool = True,
    scale: int = DEFAULT_SCALE
) -> list[str]:
    """Render a Mermaid diagram to SVG and/or PNG.
    
    Returns list of created file paths.
    """
    # Write mermaid code to temp file
    with tempfile.NamedTemporaryFile(mode="w", suffix=".mmd", delete=False) as f:
        f.write(code)
        f.flush()
        mmd_path = f.name

    # Write config to temp file
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(MERMAID_CONFIG, f)
        f.flush()
        config_path = f.name

    created = []
    prefix = f"diagram-{block_num:03d}"

    try:
        if svg:
            svg_path = output_dir / f"{prefix}.svg"
            cmd = [MMDC_PATH, "-i", mmd_path, "-o", str(svg_path),
                   "--outputFormat", "svg",
                   "--configFile", config_path,
                   "--backgroundColor", "white"]
            if os.path.exists(PUPPETEER_CONFIG):
                cmd.extend(["--puppeteerConfigFile", PUPPETEER_CONFIG])
            result = subprocess.run(
                cmd,
                capture_output=True, text=True, timeout=60
            )
            if result.returncode == 0 and svg_path.exists():
                created.append(str(svg_path))
                print(f"  SVG: {svg_path.name}")
            else:
                print(f"  SVG FAILED for diagram {block_num}: {result.stderr.strip()}")

        if png:
            png_path = output_dir / f"{prefix}.png"
            cmd = [MMDC_PATH, "-i", mmd_path, "-o", str(png_path),
                   "--outputFormat", "png",
                   "--scale", str(scale),
                   "--configFile", config_path,
                   "--backgroundColor", "white"]
            if os.path.exists(PUPPETEER_CONFIG):
                cmd.extend(["--puppeteerConfigFile", PUPPETEER_CONFIG])
            result = subprocess.run(
                cmd,
                capture_output=True, text=True, timeout=60
            )
            if result.returncode == 0 and png_path.exists():
                created.append(str(png_path))
                print(f"  PNG: {png_path.name} (scale={scale}x)")
            else:
                print(f"  PNG FAILED for diagram {block_num}: {result.stderr.strip()}")

    finally:
        os.unlink(mmd_path)
        os.unlink(config_path)

    return created


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Convert Mermaid diagrams in markdown to SVG/PNG")
    parser.add_argument("input", help="Input markdown file")
    parser.add_argument("output_dir", nargs="?", help="Output directory (default: same as input)")
    parser.add_argument("--svg-only", action="store_true", help="Only produce SVG")
    parser.add_argument("--png-only", action="store_true", help="Only produce PNG")
    parser.add_argument("--dpi", type=int, default=DEFAULT_DPI, help=f"Target PNG DPI (default: {DEFAULT_DPI})")
    parser.add_argument("--check", action="store_true", help="Syntax check only, no rendering")
    args = parser.parse_args()

    src = Path(args.input)
    if not src.exists():
        print(f"Error: {src} not found")
        sys.exit(1)

    markdown_text = src.read_text(encoding="utf-8")
    blocks = extract_mermaid_blocks(markdown_text)

    if not blocks:
        print(f"No mermaid blocks found in {src.name}")
        sys.exit(0)

    print(f"Found {len(blocks)} Mermaid diagram(s) in {src.name}")

    # Syntax check mode
    if args.check:
        errors = []
        for num, code in blocks:
            valid, error = validate_mermaid_syntax(code, num)
            status = "OK" if valid else "FAIL"
            print(f"  Diagram {num}: {status}")
            if not valid:
                errors.append(error)
                print(f"    {error}")
            time.sleep(0.5)  # avoid Chrome launch race conditions
        if errors:
            print(f"\n{len(errors)} syntax error(s) found")
            sys.exit(1)
        else:
            print(f"\nAll {len(blocks)} diagrams passed syntax check")
            sys.exit(0)

    # Determine output directory
    if args.output_dir:
        out_dir = Path(args.output_dir)
    else:
        out_dir = src.parent / "diagrams"
    out_dir.mkdir(parents=True, exist_ok=True)

    # Determine formats
    do_svg = not args.png_only
    do_png = not args.svg_only

    # Calculate scale factor for target DPI (mmdc default is 72 DPI)
    scale = max(1, round(args.dpi / 72))

    # Render all diagrams
    total_files = 0
    errors = 0
    for num, code in blocks:
        print(f"\nDiagram {num}:")
        if num > 1:
            time.sleep(1)  # allow Chrome process cleanup between renders

        # Validate first
        valid, error = validate_mermaid_syntax(code, num)
        if not valid:
            print(f"  SYNTAX ERROR: {error}")
            errors += 1
            continue

        created = render_diagram(code, num, out_dir, svg=do_svg, png=do_png, scale=scale)
        total_files += len(created)

    print(f"\nDone: {total_files} files created in {out_dir}/")
    if errors:
        print(f"Warning: {errors} diagram(s) had syntax errors and were skipped")
        sys.exit(1)


if __name__ == "__main__":
    main()
