#!/usr/bin/env python3
"""Audit a PPTX for readability, fonts, slide counts, empties, and basic style signals."""
from __future__ import annotations

import argparse
import json
import posixpath
import re
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except Exception:  # pragma: no cover - reviewer should still run without Pillow extras
    Image = None

A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main'
P_NS = 'http://schemas.openxmlformats.org/presentationml/2006/main'
R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
PR_NS = 'http://schemas.openxmlformats.org/package/2006/relationships'
C_NS = 'http://schemas.openxmlformats.org/drawingml/2006/chart'
DGM_NS = 'http://schemas.openxmlformats.org/drawingml/2006/diagram'
NS = {'a': A_NS, 'p': P_NS, 'r': R_NS, 'pr': PR_NS, 'c': C_NS, 'dgm': DGM_NS}
BRAND_FONT = 'Figtree'
WHITE_BRIGHTNESS_THRESHOLD = 600
EXPECTED_SLIDE_WIDTH = 9144000
EXPECTED_SLIDE_HEIGHT = 5143500
PLACEHOLDER_PATTERNS = [
    r'\[TODO\]',
    r'\[TBD\]',
    r'\[INSERT\]',
    r'\[PLACEHOLDER\]',
    r'Lorem ipsum',
    r'\bXXX\b',
    r'\[TO VERIFY\]',
    r'\[CLIENT NAME\]',
    r'\[DATE\]',
]
PLACEHOLDER_REGEXES = [re.compile(pattern, re.IGNORECASE) for pattern in PLACEHOLDER_PATTERNS]

SCHEME_FALLBACKS = {
    'lt1': 'FFFFFF',
    'dk1': '000000',
    'lt2': 'EEEEEE',
    'dk2': '595959',
}


def normalize_space(text: str) -> str:
    return re.sub(r'\s+', ' ', text or '').strip()


def count_words(items: list[str]) -> int:
    return sum(len(re.findall(r"\b\w+[\w'-]*\b", item)) for item in items)


def extract_fonts(root):
    fonts = []
    for latin in root.findall('.//a:rPr/a:latin', NS):
        face = (latin.get('typeface') or '').strip()
        if face:
            fonts.append(face)
    for latin in root.findall('.//a:defRPr/a:latin', NS):
        face = (latin.get('typeface') or '').strip()
        if face:
            fonts.append(face)
    return sorted(set(fonts))


def parse_relationships(zf: zipfile.ZipFile, xml_path: str) -> dict[str, str]:
    folder = posixpath.dirname(xml_path)
    rels_path = f"{folder}/_rels/{posixpath.basename(xml_path)}.rels"
    if rels_path not in zf.namelist():
        return {}
    rels_root = ET.fromstring(zf.read(rels_path))
    rels: dict[str, str] = {}
    for rel in rels_root.findall('pr:Relationship', NS):
        rel_id = rel.get('Id')
        target = rel.get('Target')
        if not rel_id or not target:
            continue
        rels[rel_id] = posixpath.normpath(posixpath.join(folder, target))
    return rels


def parse_theme_colors(zf: zipfile.ZipFile) -> dict[str, str]:
    theme_path = 'ppt/theme/theme1.xml'
    colors = dict(SCHEME_FALLBACKS)
    if theme_path not in zf.namelist():
        return colors
    root = ET.fromstring(zf.read(theme_path))
    for name in ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink']:
        node = root.find(f'.//a:clrScheme/a:{name}', NS)
        if node is None:
            continue
        srgb = node.find('a:srgbClr', NS)
        if srgb is not None and srgb.get('val'):
            colors[name] = srgb.get('val').upper()
            continue
        sysclr = node.find('a:sysClr', NS)
        if sysclr is not None and sysclr.get('lastClr'):
            colors[name] = sysclr.get('lastClr').upper()
    return colors


def get_slide_dimensions(zf: zipfile.ZipFile) -> dict:
    presentation_path = 'ppt/presentation.xml'
    dimensions = {
        'cx': None,
        'cy': None,
        'expected_cx': EXPECTED_SLIDE_WIDTH,
        'expected_cy': EXPECTED_SLIDE_HEIGHT,
        'matches_expected': False,
    }
    if presentation_path not in zf.namelist():
        return dimensions
    root = ET.fromstring(zf.read(presentation_path))
    size = root.find('.//p:sldSz', NS)
    if size is None:
        return dimensions
    try:
        dimensions['cx'] = int(size.get('cx')) if size.get('cx') else None
        dimensions['cy'] = int(size.get('cy')) if size.get('cy') else None
    except (TypeError, ValueError):
        return dimensions
    dimensions['matches_expected'] = (
        dimensions['cx'] == EXPECTED_SLIDE_WIDTH and dimensions['cy'] == EXPECTED_SLIDE_HEIGHT
    )
    return dimensions


def hex_to_rgb(value: str | None) -> tuple[int, int, int] | None:
    if not value:
        return None
    cleaned = value.strip().lstrip('#').upper()
    if len(cleaned) == 3:
        cleaned = ''.join(ch * 2 for ch in cleaned)
    if not re.fullmatch(r'[0-9A-F]{6}', cleaned):
        return None
    return tuple(int(cleaned[i:i + 2], 16) for i in (0, 2, 4))


def classify_rgb(rgb: tuple[int, int, int]) -> tuple[str, int]:
    brightness = sum(rgb)
    return ('white/light' if brightness > WHITE_BRIGHTNESS_THRESHOLD else 'dark/brand', brightness)


def resolve_color(fill_node, theme_colors: dict[str, str]) -> str | None:
    if fill_node is None:
        return None
    srgb = fill_node.find('a:srgbClr', NS)
    if srgb is not None and srgb.get('val'):
        return srgb.get('val').upper()
    scheme = fill_node.find('a:schemeClr', NS)
    if scheme is not None and scheme.get('val'):
        return theme_colors.get(scheme.get('val'), SCHEME_FALLBACKS.get(scheme.get('val')))
    return None


def average_image_rgb(zf: zipfile.ZipFile, image_path: str) -> tuple[int, int, int] | None:
    if Image is None or image_path not in zf.namelist():
        return None
    try:
        with Image.open(BytesIO(zf.read(image_path))) as img:
            img = img.convert('RGB')
            img.thumbnail((32, 32))
            histogram = img.histogram()
            if not histogram:
                return None
            pixel_count = img.size[0] * img.size[1]
            if pixel_count <= 0:
                return None
            channels = [histogram[i * 256:(i + 1) * 256] for i in range(3)]
            averages = []
            for channel in channels:
                averages.append(sum(value * count for value, count in enumerate(channel)) // pixel_count)
            return tuple(averages)
    except Exception:
        return None


def describe_background_source(source_path: str | None, root, rels: dict[str, str], theme_colors: dict[str, str], zf: zipfile.ZipFile):
    bg = root.find('./p:cSld/p:bg', NS)
    if bg is None:
        return None

    solid_fill = bg.find('.//a:solidFill', NS)
    color_hex = resolve_color(solid_fill, theme_colors)
    rgb = hex_to_rgb(color_hex)
    if rgb:
        kind, brightness = classify_rgb(rgb)
        return {
            'source': source_path,
            'type': 'solidFill',
            'color': f'#{color_hex}',
            'rgb': list(rgb),
            'brightness': brightness,
            'classification': kind,
        }

    blip = bg.find('.//a:blip', NS)
    if blip is not None:
        rel_id = blip.get(f'{{{R_NS}}}embed')
        image_path = rels.get(rel_id) if rel_id else None
        rgb = average_image_rgb(zf, image_path) if image_path else None
        if rgb:
            kind, brightness = classify_rgb(rgb)
            return {
                'source': source_path,
                'type': 'blipFill',
                'image': image_path,
                'rgb': list(rgb),
                'brightness': brightness,
                'classification': kind,
            }
        return {
            'source': source_path,
            'type': 'blipFill',
            'image': image_path,
            'classification': 'brand/image background',
        }

    return {
        'source': source_path,
        'type': 'background-present',
        'classification': 'unknown',
    }


def resolve_slide_background(zf: zipfile.ZipFile, slide_path: str, theme_colors: dict[str, str]):
    slide_root = ET.fromstring(zf.read(slide_path))
    slide_rels = parse_relationships(zf, slide_path)

    direct_bg = describe_background_source(slide_path, slide_root, slide_rels, theme_colors, zf)
    if direct_bg:
        return direct_bg

    layout_path = next((target for target in slide_rels.values() if target.endswith('/slideLayout') or '/slideLayouts/' in target), None)
    master_path = None

    if layout_path and layout_path in zf.namelist():
        layout_root = ET.fromstring(zf.read(layout_path))
        layout_rels = parse_relationships(zf, layout_path)
        layout_bg = describe_background_source(layout_path, layout_root, layout_rels, theme_colors, zf)
        master_path = next((target for target in layout_rels.values() if target.endswith('/slideMaster') or '/slideMasters/' in target), None)
        if layout_bg:
            return layout_bg

    if master_path and master_path in zf.namelist():
        master_root = ET.fromstring(zf.read(master_path))
        master_bg = describe_background_source(master_path, master_root, parse_relationships(zf, master_path), theme_colors, zf)
        if master_bg:
            return master_bg

    return {
        'source': slide_path,
        'type': 'none-found',
        'classification': 'unknown',
    }


def extract_shape_text(shape_node) -> str:
    texts = [normalize_space(node.text or '') for node in shape_node.findall('.//a:t', NS)]
    texts = [text for text in texts if text]
    return normalize_space(' '.join(texts))


def extract_slide_title(root) -> str | None:
    for shape in root.findall('.//p:sp', NS):
        placeholder = shape.find('.//p:nvSpPr/p:nvPr/p:ph', NS)
        if placeholder is None:
            continue
        placeholder_type = (placeholder.get('type') or '').strip()
        if placeholder_type not in {'title', 'ctrTitle'}:
            continue
        title = extract_shape_text(shape)
        if title:
            return title
    return None


def extract_notes_text(zf: zipfile.ZipFile, slide_path: str) -> str:
    slide_rels = parse_relationships(zf, slide_path)
    notes_path = next((target for target in slide_rels.values() if '/notesSlides/' in target), None)
    if not notes_path or notes_path not in zf.namelist():
        return ''
    try:
        notes_root = ET.fromstring(zf.read(notes_path))
    except ET.ParseError:
        return ''
    texts = [normalize_space(t.text or '') for t in notes_root.findall('.//a:t', NS)]
    texts = [text for text in texts if text]
    return normalize_space(' '.join(texts))


def find_placeholder_matches(text: str) -> list[str]:
    matches = []
    for regex in PLACEHOLDER_REGEXES:
        found = regex.findall(text)
        if found:
            matches.extend(found if isinstance(found, list) else [found])
    cleaned = []
    for item in matches:
        normalized = normalize_space(item)
        if normalized and normalized not in cleaned:
            cleaned.append(normalized)
    return cleaned


def inspect_pptx(path: Path):
    report = {
        'file': str(path),
        'slide_count': 0,
        'slides': [],
        'issues': [],
        'presentation': {},
        'duplicate_text_blocks': [],
        'summary': {
            'slides_with_images': 0,
            'slides_over_100_words': 0,
            'empty_slides': 0,
            'slides_with_non_figtree_fonts': 0,
            'slides_with_dark_or_blue_bg': 0,
            'dark_or_blue_content_slides': 0,
            'dark_or_blue_cover_or_closing_slides': 0,
            'total_word_count': 0,
            'avg_words_per_slide': 0,
            'slides_with_tables': 0,
            'slides_with_charts': 0,
            'slides_with_placeholders': 0,
            'slides_with_notes': 0,
        },
    }

    duplicate_candidates: dict[str, list[int]] = defaultdict(list)

    with zipfile.ZipFile(path, 'r') as zf:
        theme_colors = parse_theme_colors(zf)
        slide_dimensions = get_slide_dimensions(zf)
        report['presentation'] = {'slide_dimensions': slide_dimensions}
        if not slide_dimensions.get('matches_expected'):
            report['issues'].append(
                'Deck aspect ratio differs from expected 16:9 '
                f"({slide_dimensions.get('cx')} x {slide_dimensions.get('cy')} vs "
                f"{EXPECTED_SLIDE_WIDTH} x {EXPECTED_SLIDE_HEIGHT} EMU)."
            )

        slide_names = sorted(
            [name for name in zf.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', name)],
            key=lambda n: int(re.search(r'(\d+)', n).group(1)),
        )
        report['slide_count'] = len(slide_names)

        if report['slide_count'] < 5:
            report['issues'].append(f'Deck is too short: {report["slide_count"]} slides (<5).')
        if report['slide_count'] > 40:
            report['issues'].append(f'Deck is too long: {report["slide_count"]} slides (>40).')

        for idx, name in enumerate(slide_names):
            slide_no = int(re.search(r'(\d+)', name).group(1))
            root = ET.fromstring(zf.read(name))

            texts = [normalize_space(t.text) for t in root.findall('.//a:t', NS) if normalize_space(t.text or '')]
            full_text = normalize_space(' '.join(texts))
            word_count = count_words(texts)
            char_count = sum(len(t) for t in texts)
            images = len(root.findall('.//p:pic', NS))
            shapes = len(root.findall('.//p:sp', NS))
            tables = len(root.findall('.//a:tbl', NS))
            charts = len(root.findall('.//c:chart', NS))
            smartart = len(root.findall('.//dgm:*', NS))
            fonts = extract_fonts(root)
            non_figtree = [font for font in fonts if BRAND_FONT.lower() not in font.lower()]
            empty = len(texts) == 0
            dense = word_count > 100
            title = extract_slide_title(root)
            notes_text = extract_notes_text(zf, name)
            placeholder_matches = find_placeholder_matches(full_text)
            has_placeholders = bool(placeholder_matches)

            for shape in root.findall('.//p:sp', NS):
                block_text = extract_shape_text(shape)
                if count_words([block_text]) > 10:
                    duplicate_candidates[block_text].append(slide_no)

            bg = resolve_slide_background(zf, name, theme_colors)
            dark_or_blue = bg.get('classification') in {'dark/brand', 'brand/image background'}
            is_cover_or_closing = idx == 0 or idx == len(slide_names) - 1

            report['summary']['total_word_count'] += word_count
            if images:
                report['summary']['slides_with_images'] += 1
            if dense:
                report['summary']['slides_over_100_words'] += 1
            if empty:
                report['summary']['empty_slides'] += 1
            if non_figtree:
                report['summary']['slides_with_non_figtree_fonts'] += 1
            if tables:
                report['summary']['slides_with_tables'] += 1
            if charts:
                report['summary']['slides_with_charts'] += 1
            if has_placeholders:
                report['summary']['slides_with_placeholders'] += 1
            if notes_text:
                report['summary']['slides_with_notes'] += 1
            if dark_or_blue:
                report['summary']['slides_with_dark_or_blue_bg'] += 1
                if is_cover_or_closing:
                    report['summary']['dark_or_blue_cover_or_closing_slides'] += 1
                else:
                    report['summary']['dark_or_blue_content_slides'] += 1

            slide_issues = []
            if dense:
                slide_issues.append(f'too dense ({word_count} words)')
            if empty:
                slide_issues.append('empty slide')
            if non_figtree:
                slide_issues.append('non-Figtree fonts: ' + ', '.join(non_figtree))
            if dark_or_blue and not is_cover_or_closing:
                bg_label = bg.get('color') or bg.get('image') or bg.get('type')
                slide_issues.append(f'dark/brand background on content slide ({bg_label})')
            if has_placeholders:
                slide_issues.append('placeholder text detected: ' + ', '.join(placeholder_matches))
            if charts:
                slide_issues.append(f'contains {charts} chart(s)')
            if smartart:
                slide_issues.append(f'contains {smartart} SmartArt/diagram node(s)')

            report['slides'].append({
                'slide': slide_no,
                'title': title,
                'text_count': len(texts),
                'word_count': word_count,
                'char_count': char_count,
                'shape_count': shapes,
                'image_count': images,
                'table_count': tables,
                'chart_count': charts,
                'smartart_count': smartart,
                'fonts': fonts,
                'non_figtree_fonts': non_figtree,
                'dark_or_blue_detected': dark_or_blue,
                'background': bg,
                'is_cover_or_closing': is_cover_or_closing,
                'empty': empty,
                'too_dense': dense,
                'placeholder_matches': placeholder_matches,
                'notes_text': notes_text,
                'duplicate_text_blocks': [],
                'issues': slide_issues,
                'sample_text': texts[:6],
            })

    if report['slide_count']:
        report['summary']['avg_words_per_slide'] = round(
            report['summary']['total_word_count'] / report['slide_count'], 2
        )

    slide_lookup = {slide['slide']: slide for slide in report['slides']}
    for text_block, slides in duplicate_candidates.items():
        unique_slides = sorted(set(slides))
        if len(unique_slides) < 2:
            continue
        duplicate_entry = {
            'text': text_block,
            'slides': unique_slides,
            'word_count': count_words([text_block]),
        }
        report['duplicate_text_blocks'].append(duplicate_entry)
        for slide_no in unique_slides:
            slide_lookup[slide_no]['duplicate_text_blocks'].append(duplicate_entry)

    if report['duplicate_text_blocks']:
        report['issues'].append(
            f"Duplicate text blocks detected across slides: {len(report['duplicate_text_blocks'])}"
        )
        for slide in report['slides']:
            if slide['duplicate_text_blocks']:
                other_slides = sorted({
                    seen_slide
                    for item in slide['duplicate_text_blocks']
                    for seen_slide in item['slides']
                    if seen_slide != slide['slide']
                })
                slide['issues'].append(
                    'duplicate text block repeated on slides: ' + ', '.join(str(num) for num in other_slides)
                )

    report['duplicate_text_blocks'].sort(key=lambda item: (item['slides'], item['text']))
    return report


def render_text_report(report: dict) -> str:
    lines = []
    lines.append(f"PPTX review summary: {report['file']}")
    lines.append(f"Slide count: {report['slide_count']}")
    slide_dimensions = report.get('presentation', {}).get('slide_dimensions', {})
    if slide_dimensions:
        lines.append(
            'Slide size: '
            f"{slide_dimensions.get('cx')} x {slide_dimensions.get('cy')} EMU "
            f"({'OK' if slide_dimensions.get('matches_expected') else 'expected 9144000 x 5143500'})"
        )
    lines.append('')
    lines.append('Headline checks')
    lines.append(f"- Total word count: {report['summary']['total_word_count']}")
    lines.append(f"- Avg words per slide: {report['summary']['avg_words_per_slide']}")
    lines.append(f"- Dense slides (>100 words): {report['summary']['slides_over_100_words']}")
    lines.append(f"- Empty slides: {report['summary']['empty_slides']}")
    lines.append(f"- Slides with non-Figtree fonts: {report['summary']['slides_with_non_figtree_fonts']}")
    lines.append(f"- Slides with dark/blue backgrounds detected: {report['summary']['slides_with_dark_or_blue_bg']}")
    lines.append(f"- Dark/blue content slides flagged: {report['summary']['dark_or_blue_content_slides']}")
    lines.append(f"- Dark/blue cover/closing slides allowed: {report['summary']['dark_or_blue_cover_or_closing_slides']}")
    lines.append(f"- Slides with images: {report['summary']['slides_with_images']}")
    lines.append(f"- Slides with tables: {report['summary']['slides_with_tables']}")
    lines.append(f"- Slides with charts: {report['summary']['slides_with_charts']}")
    lines.append(f"- Slides with placeholders: {report['summary']['slides_with_placeholders']}")
    lines.append(f"- Slides with notes: {report['summary']['slides_with_notes']}")
    if report['issues']:
        lines.append('')
        lines.append('Deck-level flags')
        for issue in report['issues']:
            lines.append(f'- {issue}')

    if report.get('duplicate_text_blocks'):
        lines.append('')
        lines.append('Duplicate text blocks')
        for item in report['duplicate_text_blocks']:
            sample = item['text'][:140] + ('…' if len(item['text']) > 140 else '')
            lines.append(f"- Slides {', '.join(str(s) for s in item['slides'])}: {sample}")

    flagged = [slide for slide in report['slides'] if slide['issues']]
    if flagged:
        lines.append('')
        lines.append('Slide-level flags')
        for slide in flagged:
            lines.append(f"- Slide {slide['slide']}: " + '; '.join(slide['issues']))

    lines.append('')
    lines.append('Per-slide snapshot')
    for slide in report['slides']:
        sample = ' | '.join(slide['sample_text'][:3]) or '[no text]'
        font_label = ', '.join(slide['fonts']) if slide['fonts'] else '[no explicit font runs found]'
        bg = slide.get('background', {})
        bg_label = bg.get('classification', 'unknown')
        if bg.get('color'):
            bg_label += f" {bg['color']}"
        elif bg.get('image'):
            bg_label += f" ({bg['image']})"
        title_label = slide.get('title') or '[no detected title]'
        placeholder_label = ', '.join(slide['placeholder_matches']) if slide['placeholder_matches'] else 'none'
        notes_label = 'yes' if slide.get('notes_text') else 'no'
        lines.append(
            f"- Slide {slide['slide']}: title={title_label}, {slide['word_count']} words, {slide['char_count']} chars, "
            f"{slide['image_count']} images, {slide['table_count']} tables, {slide['chart_count']} charts, "
            f"{slide['smartart_count']} SmartArt nodes, notes={notes_label}, placeholders={placeholder_label}, "
            f"bg={bg_label}, fonts={font_label}, sample={sample}"
        )
        if slide.get('notes_text'):
            notes_preview = slide['notes_text'][:160] + ('…' if len(slide['notes_text']) > 160 else '')
            lines.append(f"  notes: {notes_preview}")
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='Inspect a PPTX and output a human-readable audit report.')
    parser.add_argument('pptx', help='Path to PPTX file')
    parser.add_argument('--json', action='store_true', help='Also emit JSON instead of the formatted summary')
    args = parser.parse_args()
    report = inspect_pptx(Path(args.pptx))
    if args.json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print(render_text_report(report))


if __name__ == '__main__':
    main()
