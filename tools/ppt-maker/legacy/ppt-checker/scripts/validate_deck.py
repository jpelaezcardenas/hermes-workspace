#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path


def run_inspector(deck: Path, inspector: Path) -> dict:
    proc = subprocess.run([sys.executable, str(inspector), '--json', str(deck)], capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or proc.stdout.strip() or 'inspect-pptx.py failed')
    return json.loads(proc.stdout)


def extract_rules(text: str) -> dict:
    rules = {}
    body_range = re.search(r'body text on normal content slides is typically in the \*\*(\d+)–(\d+) pt\*\*', text)
    if body_range:
        rules['body_pt_range'] = [int(body_range.group(1)), int(body_range.group(2))]
    title_range = re.search(r'titles are typically in the \*\*(\d+)–(\d+) pt\*\*', text)
    if title_range:
        rules['title_pt_range'] = [int(title_range.group(1)), int(title_range.group(2))]
    rules['brand_font'] = 'Figtree' if 'Figtree' in text else None
    return rules


def as_list(value):
    if value is None:
        return []
    return value if isinstance(value, list) else [value]


def main() -> int:
    parser = argparse.ArgumentParser(description='Validate a PPTX deck and emit JSON.')
    parser.add_argument('deck', help='Path to PPTX file')
    parser.add_argument('--inspector', default=str(Path(__file__).resolve().parent / 'inspect-pptx.py'))
    parser.add_argument('--brand-checklist', default=str(Path(__file__).resolve().parents[1] / 'setup' / 'brand-checklist.md'))
    args = parser.parse_args()

    deck = Path(args.deck)
    inspector = Path(args.inspector)
    checklist_text = Path(args.brand_checklist).read_text(encoding='utf-8', errors='ignore')
    rules = extract_rules(checklist_text)
    report = run_inspector(deck, inspector)

    findings = []
    slide_count = report.get('slide_count') or report.get('summary', {}).get('slide_count')
    if slide_count is None:
        slide_count = len(report.get('slides', []))
    if slide_count and slide_count > 30:
        findings.append({'severity': 'warning', 'code': 'high_slide_count', 'message': f'Deck has {slide_count} slides; template review baseline expects 30 or fewer for the checker.'})

    non_brand_fonts = []
    for key in ['non_brand_fonts', 'fonts_non_brand', 'font_violations']:
        non_brand_fonts.extend(as_list(report.get(key)))
    if not non_brand_fonts:
        for slide in report.get('slides', []):
            fonts = slide.get('fonts') or []
            non_brand_fonts.extend([f for f in fonts if rules.get('brand_font') and f != rules['brand_font']])
    if non_brand_fonts:
        findings.append({'severity': 'error', 'code': 'non_brand_fonts', 'message': 'Non-Figtree fonts detected.', 'details': sorted(set(non_brand_fonts))})

    logo_present = report.get('logo_present')
    if logo_present is None:
        logos = []
        for slide in report.get('slides', []):
            if slide.get('logo_present') is not None:
                logos.append(bool(slide.get('logo_present')))
        if logos:
            logo_present = any(logos)
    if logo_present is False:
        findings.append({'severity': 'error', 'code': 'missing_logo', 'message': 'No SettleMint logo detected in the deck.'})

    inconsistent_fonts = False
    slide_fonts = []
    for slide in report.get('slides', []):
        fonts = tuple(sorted(set(slide.get('fonts') or [])))
        if fonts:
            slide_fonts.append(fonts)
    if slide_fonts:
        inconsistent_fonts = len(set(slide_fonts)) > 1
    if inconsistent_fonts:
        findings.append({'severity': 'warning', 'code': 'font_inconsistency', 'message': 'Font usage varies across slides.'})

    result = {
        'file': str(deck),
        'ok': not any(f['severity'] == 'error' for f in findings),
        'rules': rules,
        'summary': {
            'slide_count': slide_count,
            'logo_present': logo_present,
            'font_sets_observed': [list(fs) for fs in sorted(set(slide_fonts))],
        },
        'findings': findings,
        'inspection': report,
    }
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write('\n')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
