#!/usr/bin/env python3
"""Normalize Word Writer onto the shared DOCX default template.

Edits the shared default template safely through python-docx/lxml-backed element
operations instead of manual zip repacking:
- remove the top-right header image/logo anchor only
- remove the confidentiality page body block only
- keep the rest of the template unchanged
"""

from pathlib import Path

from docx import Document
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[1]
SHARED_TEMPLATE = ROOT.parent / "shared" / "default-templates" / "word.docx"


def _iter_anchors(part_element):
    for paragraph in part_element.paragraphs:
        for run in paragraph.runs:
            for drawing in run._element.findall(qn("w:drawing")):
                for anchor in drawing.findall(qn("wp:anchor")):
                    yield anchor


def _remove_right_header_logo(doc: Document) -> int:
    removed = 0
    for section in doc.sections:
        header = section.header
        candidates = []
        for anchor in _iter_anchors(header):
            blips = anchor.findall('.//' + qn('a:blip'))
            if not blips:
                continue
            pos = anchor.find(qn('wp:positionH'))
            pos_offset = 0
            if pos is not None:
                off = pos.find(qn('wp:posOffset'))
                if off is not None and off.text:
                    pos_offset = int(off.text)
            candidates.append((pos_offset, anchor))
        if not candidates:
            continue
        # Right-most image anchor is the one with the highest horizontal offset.
        _, anchor = max(candidates, key=lambda item: item[0])
        drawing = anchor.getparent()
        drawing.getparent().remove(drawing)
        removed += 1
    return removed


def _element_text(elem) -> str:
    texts = elem.findall('.//' + qn('w:t'))
    return ''.join(t.text or '' for t in texts).strip()


def _remove_confidentiality_page(doc: Document) -> int:
    body = doc.element.body
    elements = list(body)
    start = None
    end = None

    for idx, elem in enumerate(elements):
        tag = elem.tag.split('}')[-1]
        if tag == 'p' and _element_text(elem) == 'Confidentiality Statement':
            start = idx
            break

    if start is None:
        return 0

    for idx in range(start + 1, len(elements)):
        tag = elements[idx].tag.split('}')[-1]
        if tag == 'sdt':
            end = idx
            break

    if end is None:
        return 0

    removed = 0
    for elem in elements[start:end]:
        body.remove(elem)
        removed += 1
    return removed


def main() -> None:
    doc = Document(str(SHARED_TEMPLATE))
    header_removed = _remove_right_header_logo(doc)
    page_removed = _remove_confidentiality_page(doc)
    doc.save(str(SHARED_TEMPLATE))
    print(f"updated {SHARED_TEMPLATE}")
    print(f"header_right_logo_removed={header_removed}")
    print(f"confidentiality_elements_removed={page_removed}")


if __name__ == "__main__":
    main()
