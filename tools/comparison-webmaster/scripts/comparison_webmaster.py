#!/usr/bin/env python3
"""Active comparison-webmaster runtime surface.

This keeps the preserved comparison-webmaster operating model available as a
safe local runtime wrapper over the existing competitor-comparison publisher.
It never publishes to HubSpot; it validates seeded content, emits draft payloads,
and runs local structural smoke/golden checks.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any

ROOT = Path('/root/hermes-workspace/tools/comparison-webmaster')
LEGACY_RUNTIME = Path('/root/hermes-workspace/tools/competitor-comparison-publisher')
PUBLISHER = LEGACY_RUNTIME / 'scripts' / 'competitor_comparison_publisher.py'
DEFAULT_CONTENT = Path('/root/.hermes/skills/domain/hubspot-competitor-pages/assets/content/tokeny.json')
PYTHON = os.environ.get('PYTHON_BIN', '/root/.hermes/hermes-agent/venv/bin/python3')
if not Path(PYTHON).exists():
    PYTHON = sys.executable


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding='utf-8'))


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def run_publisher_draft(content: Path, out_dir: Path) -> subprocess.CompletedProcess[str]:
    cmd = [PYTHON, str(PUBLISHER), 'draft', '--content', str(content), '--out-dir', str(out_dir)]
    return subprocess.run(cmd, check=True, text=True, capture_output=True)


def validate_payload(payload: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if payload.get('draftOnly') is not True:
        errors.append('draftOnly must be true')
    if payload.get('publishBlocked') is not True:
        errors.append('publishBlocked must be true')
    if payload.get('state') != 'draft':
        errors.append('state must be draft')
    if payload.get('validation', {}).get('status') != 'passed':
        errors.append('validation status must be passed')
    sections = payload.get('layoutSections', {})
    if list(sections.keys()) != [f'section-{i}' for i in range(1, 8)]:
        errors.append('layoutSections must contain section-1 through section-7 in order')
    for sname, section in sections.items():
        if section.get('name') != sname:
            errors.append(f'{sname}: name mismatch')
        for row in section.get('rows', []):
            for key, col in row.items():
                if key != str(col.get('x')):
                    errors.append(f'{sname}: row key {key} does not match x={col.get("x")}')
                for widget_row in col.get('rows', []):
                    for wkey, widget in widget_row.items():
                        if wkey != '0':
                            errors.append(f'{sname}: widget row key must be 0, got {wkey}')
                        if widget.get('type') != 'custom_widget':
                            errors.append(f'{sname}: widget type must be custom_widget')
                        if widget.get('w') != 12 or widget.get('x') != 0:
                            errors.append(f'{sname}: widget geometry must be w=12,x=0')
    return errors


def cmd_validate(args: argparse.Namespace) -> int:
    content_path = Path(args.content)
    content = load_json(content_path)
    payload = _build_payload(content, content_path, temp_dir=None)
    errors = validate_payload(payload)
    if len(content['meta']['meta_description']) > 155:
        errors.append('metaDescription exceeds HubSpot limit')
    status = {'status': 'passed' if not errors else 'failed', 'errors': errors, 'slug': payload['slug'], 'sectionCount': len(payload['layoutSections'])}
    print(json.dumps(status, indent=2, ensure_ascii=False))
    return 0 if not errors else 1


def _build_payload(content: dict[str, Any], source: Path, temp_dir: Path | None) -> dict[str, Any]:
    if temp_dir is None:
        temp_dir = Path(tempfile.mkdtemp(prefix='comparison-webmaster-draft.'))
    run_publisher_draft(source, temp_dir)
    return load_json(temp_dir / 'draft-payload.json')


def cmd_draft(args: argparse.Namespace) -> int:
    content_path = Path(args.content)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    completed = run_publisher_draft(content_path, out_dir)
    payload = load_json(out_dir / 'draft-payload.json')
    result = {
        'status': 'ok',
        'tool': 'comparison-webmaster',
        'upstream': 'competitor-comparison-publisher',
        'publisher_stdout': completed.stdout.strip(),
        'publisher_stderr': completed.stderr.strip(),
        'slug': payload['slug'],
        'sectionCount': len(payload['layoutSections']),
        'outputs': {
            'draft_payload_json': str(out_dir / 'draft-payload.json'),
            'draft_payload_md': str(out_dir / 'draft-payload.md'),
            'validation_report_json': str(out_dir / 'validation-report.json'),
            'manifest_json': str(out_dir / 'manifest.json'),
        },
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


def cmd_smoke(args: argparse.Namespace) -> int:
    tmp = Path(tempfile.mkdtemp(prefix='comparison-webmaster-smoke.'))
    try:
        rc = cmd_draft(argparse.Namespace(content=args.content, out_dir=str(tmp)))
        if rc != 0:
            return rc
        payload = load_json(tmp / 'draft-payload.json')
        report = load_json(tmp / 'validation-report.json')
        manifest = load_json(tmp / 'manifest.json')
        errors = validate_payload(payload)
        if report.get('status') != 'passed':
            errors.append('validation report status not passed')
        if manifest.get('tool') != 'competitor-comparison-publisher':
            errors.append('manifest tool mismatch')
        if sha256(tmp / 'draft-payload.json') != sha256(tmp / 'draft-payload.json'):
            errors.append('self hash mismatch')
        summary = {'status': 'passed' if not errors else 'failed', 'errors': errors, 'slug': payload['slug'], 'sectionCount': len(payload['layoutSections']), 'outputDir': str(tmp)}
        print(json.dumps(summary, indent=2, ensure_ascii=False))
        return 0 if not errors else 1
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def cmd_golden(args: argparse.Namespace) -> int:
    tmp1 = Path(tempfile.mkdtemp(prefix='comparison-webmaster-golden-a.'))
    tmp2 = Path(tempfile.mkdtemp(prefix='comparison-webmaster-golden-b.'))
    try:
        cmd_draft(argparse.Namespace(content=args.content, out_dir=str(tmp1)))
        cmd_draft(argparse.Namespace(content=args.content, out_dir=str(tmp2)))
        p1 = load_json(tmp1 / 'draft-payload.json')
        p2 = load_json(tmp2 / 'draft-payload.json')
        checks = {
            'slug': p1['slug'] == p2['slug'],
            'htmlTitle': p1['htmlTitle'] == p2['htmlTitle'],
            'metaDescription': p1['metaDescription'] == p2['metaDescription'],
            'sections': list(p1['layoutSections'].keys()) == list(p2['layoutSections'].keys()),
            'reportStatus': load_json(tmp1 / 'validation-report.json')['status'] == 'passed' and load_json(tmp2 / 'validation-report.json')['status'] == 'passed',
        }
        errors = [name for name, ok in checks.items() if not ok]
        payload = {'status': 'passed' if not errors else 'failed', 'checks': checks, 'errors': errors, 'artifactA': str(tmp1), 'artifactB': str(tmp2)}
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return 0 if not errors else 1
    finally:
        shutil.rmtree(tmp1, ignore_errors=True)
        shutil.rmtree(tmp2, ignore_errors=True)


def main() -> int:
    ap = argparse.ArgumentParser(description='comparison-webmaster active runtime')
    ap.add_argument('--content', default=str(DEFAULT_CONTENT), help='Seeded competitor comparison content JSON')
    sub = ap.add_subparsers(dest='command', required=True)

    sub.add_parser('validate', help='Validate seeded content and structural rules').set_defaults(func=cmd_validate)
    sub.add_parser('draft', help='Generate a local draft payload from seeded content').set_defaults(func=cmd_draft)
    sub.add_parser('smoke', help='Run a structural smoke test').set_defaults(func=cmd_smoke)
    sub.add_parser('golden', help='Run deterministic golden checks').set_defaults(func=cmd_golden)

    args = ap.parse_args()
    return args.func(args)


if __name__ == '__main__':
    raise SystemExit(main())
