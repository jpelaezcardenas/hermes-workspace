#!/usr/bin/env python3
"""Test the shared Excel branding module."""

from __future__ import annotations

import sys
from pathlib import Path

# Ensure this script can find excel_brand in the same directory
sys.path.insert(0, str(Path(__file__).resolve().parent))

from excel_brand import (
    create_branded_workbook,
    format_entire_sheet,
    LOGO_PATH,
)

OUTPUT_PATH = Path(__file__).resolve().parent / "test_branded_output.xlsx"

HEADERS = ["ID", "Category", "Question", "Response", "Status"]
SAMPLE_DATA = [
    [i, f"Category {chr(64 + (i % 5) + 1)}", f"Sample question number {i} with some longer text to test wrapping behavior",
     f"This is a detailed response for question {i}. It may span multiple lines.", "Complete" if i % 3 else "Pending"]
    for i in range(1, 11)
]


def main() -> None:
    wb = create_branded_workbook(title="Test Report", subtitle="Quality Assurance", sheets=["Data"])
    ws = wb["Data"]

    # Write headers
    for col, header in enumerate(HEADERS, start=1):
        ws.cell(row=1, column=col, value=header)

    # Write data
    for row_idx, row_data in enumerate(SAMPLE_DATA, start=2):
        for col_idx, value in enumerate(row_data, start=1):
            ws.cell(row=row_idx, column=col_idx, value=value)

    # Apply full branding
    format_entire_sheet(ws, header_row=1, data_start_row=2)

    wb.save(OUTPUT_PATH)

    # Verification summary
    print("=" * 60)
    print("Excel Brand Test — Verification Summary")
    print("=" * 60)
    print(f"Output:       {OUTPUT_PATH}")
    print(f"Logo exists:  {LOGO_PATH.exists()} ({LOGO_PATH})")
    print(f"Sheets:       {wb.sheetnames}")
    print(f"Data sheet:   {ws.max_column} columns × {ws.max_row} rows")
    print(f"Freeze panes: {ws.freeze_panes}")
    print(f"Auto-filter:  {ws.auto_filter.ref}")
    print(f"Header font:  {ws.cell(row=1, column=1).font.name} {ws.cell(row=1, column=1).font.size}pt")
    print(f"Data font:    {ws.cell(row=2, column=1).font.name} {ws.cell(row=2, column=1).font.size}pt")
    print(f"Header fill:  {ws.cell(row=1, column=1).fill.start_color.rgb}")
    print(f"Alt row fill: {ws.cell(row=3, column=1).fill.start_color.rgb}")
    print("=" * 60)
    print("✅ Test passed — branded workbook saved successfully.")


if __name__ == "__main__":
    main()
