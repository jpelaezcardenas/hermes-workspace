#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W_NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
WORD_RE = re.compile(r"\b\w+[\w'-]*\b")


def read_markdown(path: Path) -> str:
    return path.read_text(encoding='utf-8', errors='ignore')


def read_docx(path: Path) -> str:
    with zipfile.ZipFile(path) as zf:
        data = zf.read('word/document.xml')
    root = ET.fromstring(data)
    texts = [t.text or '' for t in root.findall('.//w:t', W_NS)]
    return '\n'.join(texts)


def load_text(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in {'.md', '.markdown', '.txt'}:
        return read_markdown(path)
    if suffix == '.docx':
        return read_docx(path)
    raise ValueError(f'Unsupported file type: {suffix}')


def extract_patterns(defect_file: Path) -> list[dict]:
    text = defect_file.read_text(encoding='utf-8', errors='ignore')
    chunks = re.split(r'\n## Pattern \d+: ', text)
    patterns = []
    for chunk in chunks[1:]:
        title, _, body = chunk.partition('\n')
        detection = ''
        fix = ''
        m = re.search(r'\*\*Detection\*\*: (.+)', body)
        if m:
            detection = m.group(1).strip()
        m = re.search(r'\*\*Fix\*\*: (.+)', body)
        if m:
            fix = m.group(1).strip()
        patterns.append({'name': title.strip(), 'detection': detection, 'fix': fix})
    return patterns


def heading_lines(text: str) -> list[str]:
    return [
        line.strip()
        for line in text.splitlines()
        if re.match(r'^(#{1,6}\s+|[A-Z][A-Za-z0-9 /&,-]{2,80}:?$)', line.strip())
    ]


def count_words(text: str) -> int:
    return len(WORD_RE.findall(text))


def main() -> int:
    parser = argparse.ArgumentParser(description='Validate a proposal markdown/DOCX file and emit JSON.')
    parser.add_argument('file', help='Path to .md or .docx proposal')
    parser.add_argument(
        '--defects',
        default=str(Path(__file__).resolve().parents[1] / 'setup' / 'common-defect-patterns.md'),
    )
    args = parser.parse_args()

    path = Path(args.file)
    text = load_text(path)
    normalized = re.sub(r'\s+', ' ', text)
    headings = heading_lines(text)
    word_count = count_words(text)

    structure = {
        'has_executive_summary': bool(re.search(r'executive summary', text, re.I)),
        'heading_count': len(headings),
        'headings': headings[:50],
        'word_count': word_count,
        'has_sections': len(headings) >= 3,
    }

    issues = []
    if not structure['has_executive_summary']:
        issues.append({'severity': 'warning', 'code': 'missing_executive_summary', 'message': 'No executive summary heading detected.'})
    if not structure['has_sections']:
        issues.append({'severity': 'warning', 'code': 'insufficient_structure', 'message': 'Fewer than 3 section-like headings detected.'})
    if word_count < 400:
        issues.append({'severity': 'warning', 'code': 'low_word_count', 'message': 'Proposal may be too thin for a full submission.'})

    pattern_hits = []
    for pattern in extract_patterns(Path(args.defects)):
        name = pattern['name'].lower()
        hit = False
        evidence = []

        if 'leadership title' in name:
            for rx in [r'Matthew Van Niekerk\s*[,\-–:]?\s*CEO', r'Adam Popat\s*[,\-–:]?\s*(Co-founder|President)']:
                m = re.search(rx, text, re.I)
                if m:
                    hit = True
                    evidence.append(m.group(0))
        elif 'blockchain platform' in name:
            for rx in [r'\bgeneric blockchain platform\b', r'\bblockchain platform\b']:
                for m in re.finditer(rx, text, re.I):
                    hit = True
                    evidence.append(m.group(0))
        elif 'overclaiming native capabilities' in name:
            for rx in [r'native SWIFT', r'built-in fiat settlement', r'fully mature forced movement recovery', r'unlimited policy combinatorics']:
                for m in re.finditer(rx, text, re.I):
                    hit = True
                    evidence.append(m.group(0))
        elif 'generic executive summary' in name:
            if structure['has_executive_summary']:
                m = re.search(r'executive summary(.{0,400})', normalized, re.I)
                if m and re.search(r'(founded|company|SettleMint is|platform provides)', m.group(1), re.I):
                    hit = True
                    evidence.append(m.group(1)[:200])
        elif 'internal terminology leaks' in name:
            for rx in [r'\bTheGraph\b', r'\bRestate\b', r'\boRPC\b', r'\bDrizzle\b', r'\bOpenTelemetry\b', r'~/|/Users/|packages?/']:
                for m in re.finditer(rx, text):
                    hit = True
                    evidence.append(m.group(0))
        elif 'team size or internal process disclosure' in name:
            for rx in [r'\b\d+\s+(employees|people|staff|team members?)\b', r'AI-assisted', r'internal workflow']:
                for m in re.finditer(rx, text, re.I):
                    hit = True
                    evidence.append(m.group(0))
        elif 'competitor naming' in name:
            for rx in [r'Fireblocks', r'ConsenSys', r'R3', r'Avaloq', r'Broadridge']:
                for m in re.finditer(rx, text, re.I):
                    hit = True
                    evidence.append(m.group(0))
        elif 'unqualified absolute language' in name:
            matches = re.findall(r'\b(all|fully|always|seamless|guaranteed|complete)\b', text, re.I)
            if len(matches) >= 3:
                hit = True
                evidence.extend(matches[:10])

        if hit:
            pattern_hits.append({'pattern': pattern['name'], 'evidence': evidence[:10], 'fix': pattern['fix']})

    result = {
        'file': str(path),
        'ok': len([i for i in issues if i['severity'] == 'error']) == 0,
        'structure': structure,
        'issues': issues,
        'pattern_hits': pattern_hits,
    }
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write('\n')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
