#!/usr/bin/env python3
"""Convert DOCX to Markdown using Microsoft's markitdown.

Usage:
    python3 scripts/docx_to_markdown.py input.docx [output.md]

If output path is not specified, writes alongside input with .md extension.
"""

import subprocess
import sys
from pathlib import Path

MARKITDOWN = "/Users/quark/Library/Python/3.14/bin/markitdown"


def convert(input_path: str, output_path: str | None = None) -> Path:
    src = Path(input_path)
    if not src.exists():
        raise FileNotFoundError(f"Input file not found: {src}")
    if src.suffix.lower() != ".docx":
        raise ValueError(f"Expected .docx file, got: {src.suffix}")

    dst = Path(output_path) if output_path else src.with_suffix(".md")

    result = subprocess.run(
        [MARKITDOWN, str(src)],
        capture_output=True,
        text=True,
        timeout=120,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"markitdown failed (exit {result.returncode}): {result.stderr.strip()}"
        )

    dst.write_text(result.stdout, encoding="utf-8")
    print(f"✓ Converted {src.name} → {dst.name} ({len(result.stdout):,} chars)")
    return dst


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__.strip())
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
