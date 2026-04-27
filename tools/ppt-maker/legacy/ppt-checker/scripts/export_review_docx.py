#!/usr/bin/env python3
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

from lxml import etree as LET

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
NS = {'w': W_NS}

ROOT = Path(__file__).resolve().parents[2]
BID_MANAGER = ROOT / 'bid-manager'
CONVERTER = BID_MANAGER / 'scripts' / 'markdown_to_docx.py'
TEMPLATE = BID_MANAGER / 'templates' / 'MASTER_TEMPLATE_LOCKED.docx'


def strip_cover_and_confidentiality(src_docx: Path, dst_docx: Path) -> None:
    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        with zipfile.ZipFile(src_docx, 'r') as zf:
            zf.extractall(tmp)
        doc_xml = tmp / 'word' / 'document.xml'
        parser = LET.XMLParser(remove_blank_text=False)
        tree = LET.parse(str(doc_xml), parser)
        root = tree.getroot()
        body = root.find('w:body', namespaces=NS)
        children = list(body)

        page_breaks_seen = 0
        keep_from = 0
        for idx, child in enumerate(children):
            if child.tag == f'{{{W_NS}}}p':
                for br in child.findall('.//w:br', namespaces=NS):
                    if br.attrib.get(f'{{{W_NS}}}type') == 'page':
                        page_breaks_seen += 1
                        if page_breaks_seen == 2:
                            keep_from = idx + 1
                            break
            if page_breaks_seen >= 2:
                break

        sect = children[-1] if children and children[-1].tag == f'{{{W_NS}}}sectPr' else None
        for child in list(body):
            body.remove(child)
        for child in children[keep_from:]:
            if child is sect:
                continue
            body.append(child)
        if sect is not None:
            body.append(sect)
        tree.write(str(doc_xml), encoding='utf-8', xml_declaration=True, standalone=False)

        with zipfile.ZipFile(dst_docx, 'w', zipfile.ZIP_DEFLATED) as out:
            for path in sorted(tmp.rglob('*')):
                if path.is_file():
                    out.write(path, path.relative_to(tmp))


def main() -> int:
    parser = argparse.ArgumentParser(description='Export PPT review markdown to DOCX with cover/confidentiality pages removed.')
    parser.add_argument('input_md')
    parser.add_argument('output_docx')
    args = parser.parse_args()

    input_md = Path(args.input_md)
    output_docx = Path(args.output_docx)
    output_docx.parent.mkdir(parents=True, exist_ok=True)

    interim_dir = BID_MANAGER / 'output' / '_tmp-ppt-checker-docx'
    interim_dir.mkdir(parents=True, exist_ok=True)
    interim = interim_dir / (output_docx.stem + '.interim.docx')
    proc = subprocess.run([sys.executable, str(CONVERTER), str(input_md), str(interim)], capture_output=True, text=True)
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr or proc.stdout)
        return proc.returncode
    strip_cover_and_confidentiality(interim, output_docx)
    if interim.exists():
        interim.unlink()
    print(output_docx)
    print(f'base_template={TEMPLATE}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
