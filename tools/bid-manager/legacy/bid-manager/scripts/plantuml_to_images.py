#!/usr/bin/env python3
"""Extract PlantUML diagrams from markdown and render them to SVG and PNG.

Uses a local PlantUML jar for rendering and syntax validation.
Produces SVG (preferred for Word) and 300 DPI PNG (fallback).

Usage:
    python3 scripts/plantuml_to_images.py input.md [output_dir]

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

Environment:
    PLANTUML_JAR    Override PlantUML jar path
"""

from __future__ import annotations

import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

PLANTUML_JAR = os.environ.get("PLANTUML_JAR", "/Users/quark/tools/plantuml.jar")
DEFAULT_DPI = 300
GRAPHVIZ_DOT = "/opt/homebrew/bin/dot"

BRAND_SKINPARAM_BLOCK = """skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam HyperlinkColor #0000FF
skinparam Shadowing false
skinparam RoundCorner 15
skinparam Padding 10
skinparam ArrowColor #000099
skinparam ArrowThickness 1.5
skinparam LineColor #000099
skinparam NoteBackgroundColor #F5F0B0
skinparam NoteBorderColor #BCA820
skinparam NoteFontColor #102848
skinparam PackageBorderColor #000099
skinparam PackageFontColor #000099
skinparam PackageBackgroundColor #D8E8F0
skinparam RectangleBackgroundColor #D8E8F0
skinparam RectangleBorderColor #000099
skinparam RectangleFontColor #000099
skinparam CardBackgroundColor #C0E0F0
skinparam CardBorderColor #284878
skinparam CardFontColor #284878
skinparam NodeBackgroundColor #C0F0C0
skinparam NodeBorderColor #187848
skinparam NodeFontColor #187848
skinparam ComponentBackgroundColor #C8A8E8
skinparam ComponentBorderColor #482068
skinparam ComponentFontColor #482068
skinparam InterfaceBackgroundColor #F2B8A0
skinparam InterfaceBorderColor #C05030
skinparam InterfaceFontColor #C05030
skinparam ArtifactBackgroundColor #B8D8E0
skinparam ArtifactBorderColor #1E4868
skinparam ArtifactFontColor #1E4868
skinparam CloudBackgroundColor #C0E0F0
skinparam CloudBorderColor #284878
skinparam CloudFontColor #284878
skinparam DatabaseBackgroundColor #B0C0D8
skinparam DatabaseBorderColor #183060
skinparam DatabaseFontColor #183060
skinparam QueueBackgroundColor #F5F0B0
skinparam QueueBorderColor #BCA820
skinparam QueueFontColor #102848
skinparam UsecaseBackgroundColor #F2B8A0
skinparam UsecaseBorderColor #C05030
skinparam UsecaseFontColor #C05030
skinparam ClassBackgroundColor #D8E8F0
skinparam ClassBorderColor #000099
skinparam ClassFontColor #000099
skinparam ClassAttributeFontColor #000000
skinparam ClassStereotypeFontColor #506878
skinparam ObjectBackgroundColor #C0F0C0
skinparam ObjectBorderColor #187848
skinparam ObjectFontColor #187848
skinparam ActivityBackgroundColor #D8E8F0
skinparam ActivityBorderColor #000099
skinparam ActivityFontColor #000099
skinparam ActivityDiamondBackgroundColor #F5F0B0
skinparam ActivityDiamondBorderColor #BCA820
skinparam ActivityDiamondFontColor #102848
skinparam SequenceLifeLineBorderColor #506878
skinparam SequenceLifeLineBackgroundColor #F2F2F2
skinparam SequenceParticipantBackgroundColor #D8E8F0
skinparam SequenceParticipantBorderColor #000099
skinparam SequenceParticipantFontColor #000099
skinparam SequenceActorBackgroundColor #F2B8A0
skinparam SequenceActorBorderColor #C05030
skinparam SequenceActorFontColor #C05030
skinparam SequenceArrowColor #000099
skinparam SequenceGroupBorderColor #284878
skinparam SequenceGroupBackgroundColor #C0E0F0
skinparam SequenceGroupHeaderFontColor #284878
skinparam SequenceBoxBorderColor #506878
skinparam SequenceBoxBackgroundColor #F2F2F2
skinparam PartitionBackgroundColor #C0E0F0
skinparam PartitionBorderColor #284878
skinparam PartitionFontColor #284878
skinparam LegendBackgroundColor #F2F2F2
skinparam LegendBorderColor #8898A8
skinparam LegendFontColor #000000
skinparam TitleFontName Figtree
skinparam TitleFontColor #000099
skinparam TitleFontSize 18
skinparam TitleBorderThickness 0
skinparam CaptionFontName Figtree
skinparam CaptionFontColor #506878"""


def extract_plantuml_blocks(markdown_text: str) -> list[tuple[int, str]]:
    """Extract all PlantUML code blocks from markdown.

    Returns list of (block_index, plantuml_code) tuples.
    """
    pattern = r"```plantuml\s*\n(.*?)```"
    blocks = []
    for i, match in enumerate(re.finditer(pattern, markdown_text, re.DOTALL | re.IGNORECASE)):
        blocks.append((i + 1, match.group(1).strip()))
    return blocks


def has_brand_skinparams(code: str) -> bool:
    """Return True when the diagram already defines brand-relevant skinparams."""
    checks = [
        r"(?im)^\s*skinparam\s+DefaultFontName\s+Figtree\b",
        r"(?im)^\s*skinparam\s+RoundCorner\s+15\b",
        r"(?im)^\s*skinparam\s+DefaultFontColor\s+#000099\b",
    ]
    return any(re.search(pattern, code) for pattern in checks)


def ensure_wrapped(code: str) -> str:
    """Ensure code has @startuml / @enduml wrappers."""
    stripped = code.strip()
    if stripped.lower().startswith("@startuml") and stripped.lower().endswith("@enduml"):
        return stripped
    return f"@startuml\n{stripped}\n@enduml"


def inject_brand_skinparams(code: str) -> str:
    """Inject the SettleMint skinparam block when absent."""
    wrapped = ensure_wrapped(code)
    if has_brand_skinparams(wrapped):
        return wrapped
    return wrapped.replace("@startuml", f"@startuml\n{BRAND_SKINPARAM_BLOCK}", 1)


def _java_cmd() -> list[str]:
    return ["java", "-jar", PLANTUML_JAR]


def validate_environment() -> tuple[bool, str]:
    """Check that required local tooling is available."""
    if not Path(PLANTUML_JAR).exists():
        return False, f"PlantUML jar not found at '{PLANTUML_JAR}'"
    if shutil.which("java") is None:
        return False, "Java not found in PATH"
    return True, ""


def validate_plantuml_syntax(code: str, block_num: int) -> tuple[bool, str]:
    """Validate PlantUML syntax using PlantUML's checkonly mode."""
    wrapped = inject_brand_skinparams(code)
    with tempfile.NamedTemporaryFile(mode="w", suffix=".puml", delete=False, encoding="utf-8") as f:
        f.write(wrapped)
        f.flush()
        source_path = Path(f.name)

    try:
        env = os.environ.copy()
        if Path(GRAPHVIZ_DOT).exists():
            env.setdefault("GRAPHVIZ_DOT", GRAPHVIZ_DOT)
        cmd = _java_cmd() + ["-checkonly", str(source_path)]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30, env=env)
        if result.returncode == 0:
            return True, ""
        error = (result.stderr.strip() or result.stdout.strip() or "Unknown PlantUML validation error")
        return False, f"Diagram {block_num}: {error}"
    except subprocess.TimeoutExpired:
        return False, f"Diagram {block_num}: Validation timed out (30s)"
    finally:
        source_path.unlink(missing_ok=True)


def render_diagram(
    code: str,
    block_num: int,
    output_dir: Path,
    svg: bool = True,
    png: bool = True,
    dpi: int = DEFAULT_DPI,
) -> list[str]:
    """Render a PlantUML diagram to SVG and/or PNG.

    Returns list of created file paths.
    """
    wrapped = inject_brand_skinparams(code)
    prefix = f"diagram-{block_num:03d}"
    source_path = output_dir / f"{prefix}.puml"
    source_path.write_text(wrapped, encoding="utf-8")
    created: list[str] = []

    env = os.environ.copy()
    if Path(GRAPHVIZ_DOT).exists():
        env.setdefault("GRAPHVIZ_DOT", GRAPHVIZ_DOT)

    try:
        if svg:
            cmd = _java_cmd() + ["-tsvg", str(source_path), "-o", str(output_dir)]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60, env=env)
            svg_path = output_dir / f"{prefix}.svg"
            if result.returncode == 0 and svg_path.exists():
                created.append(str(svg_path))
                print(f"  SVG: {svg_path.name}")
            else:
                print(f"  SVG FAILED for diagram {block_num}: {(result.stderr or result.stdout).strip()}")

        if png:
            cmd = _java_cmd() + [f"-Sdpi={dpi}", "-tpng", str(source_path), "-o", str(output_dir)]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60, env=env)
            png_path = output_dir / f"{prefix}.png"
            if result.returncode == 0 and png_path.exists():
                created.append(str(png_path))
                print(f"  PNG: {png_path.name} ({dpi} DPI)")
            else:
                print(f"  PNG FAILED for diagram {block_num}: {(result.stderr or result.stdout).strip()}")
    finally:
        source_path.unlink(missing_ok=True)

    return created


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Convert PlantUML diagrams in markdown to SVG/PNG")
    parser.add_argument("input", help="Input markdown file")
    parser.add_argument("output_dir", nargs="?", help="Output directory (default: same as input)")
    parser.add_argument("--svg-only", action="store_true", help="Only produce SVG")
    parser.add_argument("--png-only", action="store_true", help="Only produce PNG")
    parser.add_argument("--dpi", type=int, default=DEFAULT_DPI, help=f"Target PNG DPI (default: {DEFAULT_DPI})")
    parser.add_argument("--check", action="store_true", help="Syntax check only, no rendering")
    args = parser.parse_args()

    env_ok, env_error = validate_environment()
    if not env_ok:
        print(f"Error: {env_error}")
        sys.exit(1)

    src = Path(args.input)
    if not src.exists():
        print(f"Error: {src} not found")
        sys.exit(1)

    markdown_text = src.read_text(encoding="utf-8")
    blocks = extract_plantuml_blocks(markdown_text)

    if not blocks:
        print(f"No plantuml blocks found in {src.name}")
        sys.exit(0)

    print(f"Found {len(blocks)} PlantUML diagram(s) in {src.name}")

    if args.check:
        errors = []
        for num, code in blocks:
            valid, error = validate_plantuml_syntax(code, num)
            status = "OK" if valid else "FAIL"
            print(f"  Diagram {num}: {status}")
            if not valid:
                errors.append(error)
                print(f"    {error}")
        if errors:
            print(f"\n{len(errors)} syntax error(s) found")
            sys.exit(1)
        print(f"\nAll {len(blocks)} diagrams passed syntax check")
        sys.exit(0)

    out_dir = Path(args.output_dir) if args.output_dir else src.parent / "diagrams"
    out_dir.mkdir(parents=True, exist_ok=True)

    do_svg = not args.png_only
    do_png = not args.svg_only

    total_files = 0
    errors = 0
    for num, code in blocks:
        print(f"\nDiagram {num}:")
        valid, error = validate_plantuml_syntax(code, num)
        if not valid:
            print(f"  SYNTAX ERROR: {error}")
            errors += 1
            continue
        created = render_diagram(code, num, out_dir, svg=do_svg, png=do_png, dpi=args.dpi)
        total_files += len(created)

    print(f"\nDone: {total_files} files created in {out_dir}/")
    if errors:
        print(f"Warning: {errors} diagram(s) had syntax errors and were skipped")
        sys.exit(1)


if __name__ == "__main__":
    main()
