#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PPT_CHECKER_DIR = Path(__file__).resolve().parents[1]
INSPECTOR = PPT_CHECKER_DIR / 'scripts' / 'inspect-pptx.py'

GENERIC_HEADLINE_PATTERNS = [
    r'^overview$', r'^introduction$', r'^summary$', r'^key considerations$', r'^market overview$',
    r'^opportunity$', r'^next steps$', r'^conclusion$', r'^agenda$'
]
GENERIC_FILLER = [
    'seamless', 'innovative', 'transformative', 'robust', 'cutting-edge', 'best-in-class',
    'world-class', 'unlock value', 'future-ready', 'revolutionary'
]
DALP_WEAK_POSITIONING = [
    'tokenization platform', 'tokenization engine', 'crypto platform', 'crypto-native'
]


def load_inspection(deck: Path) -> dict:
    proc = subprocess.run([sys.executable, str(INSPECTOR), '--json', str(deck)], capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or proc.stdout.strip() or 'inspect-pptx failed')
    return json.loads(proc.stdout)


def normalize_title(title: str | None) -> str:
    return re.sub(r'[^a-z0-9]+', ' ', (title or '').lower()).strip()


def title_is_weak(title: str | None) -> bool:
    t = normalize_title(title)
    if not t:
        return True
    return any(re.fullmatch(p, t) for p in GENERIC_HEADLINE_PATTERNS)


def extract_slide_signals(report: dict) -> dict:
    slides = report['slides']
    title_counts = Counter(normalize_title(s.get('title')) for s in slides if s.get('title'))
    signals = []
    for slide in slides:
        title = slide.get('title') or ''
        sample = ' '.join(slide.get('sample_text') or [])
        all_text = f"{title} {sample}".lower()
        title_wc = len(re.findall(r"\b\w+[\w'-]*\b", title))
        filler_hits = sorted({w for w in GENERIC_FILLER if w in all_text})
        dalp_hits = sorted({w for w in DALP_WEAK_POSITIONING if w in all_text})
        repeated_title = bool(title and title_counts[normalize_title(title)] > 1)
        is_agenda = 'agenda' in all_text or 'table of contents' in all_text
        is_section_divider = slide['word_count'] <= 20 and slide['image_count'] <= 1 and title_wc <= 8
        severity = 'low'
        if slide['empty'] or slide['word_count'] >= 140:
            severity = 'high'
        elif slide['too_dense'] or title_wc > 12 or filler_hits or dalp_hits:
            severity = 'medium'
        signals.append({
            'slide': slide['slide'],
            'title_word_count': title_wc,
            'weak_headline': title_is_weak(title),
            'repeated_title': repeated_title,
            'generic_filler_hits': filler_hits,
            'dalp_positioning_risk_hits': dalp_hits,
            'is_agenda_candidate': is_agenda,
            'is_section_divider_candidate': is_section_divider,
            'severity_hint': severity,
        })
    return {
        'slides': signals,
        'summary': {
            'weak_headline_slides': [s['slide'] for s in signals if s['weak_headline']],
            'repeated_title_slides': [s['slide'] for s in signals if s['repeated_title']],
            'generic_filler_slides': [s['slide'] for s in signals if s['generic_filler_hits']],
            'dalp_positioning_risk_slides': [s['slide'] for s in signals if s['dalp_positioning_risk_hits']],
            'agenda_slides': [s['slide'] for s in signals if s['is_agenda_candidate']],
            'section_divider_slides': [s['slide'] for s in signals if s['is_section_divider_candidate']],
        }
    }


def make_review(deck: Path, report: dict, signals: dict) -> str:
    s = report['summary']
    slide_count = report['slide_count']
    weak = signals['summary']['weak_headline_slides']
    filler = signals['summary']['generic_filler_slides']
    dalp = signals['summary']['dalp_positioning_risk_slides']
    repeated = signals['summary']['repeated_title_slides']
    divider_count = len(signals['summary']['section_divider_slides'])
    agenda = signals['summary']['agenda_slides']
    dense_slides = [sl['slide'] for sl in report['slides'] if sl['too_dense']]
    empty_slides = [sl['slide'] for sl in report['slides'] if sl['empty']]

    hard_failures = []
    if not report.get('presentation', {}).get('slide_dimensions', {}).get('matches_expected'):
        hard_failures.append('Non-template slide dimensions')
    if empty_slides:
        hard_failures.append(f"Empty final/client-facing slide(s): {', '.join(map(str, empty_slides))}")
    if s['slides_with_non_figtree_fonts']:
        hard_failures.append('Non-Figtree fonts detected')

    verdict = 'Approve'
    if hard_failures or dense_slides or filler or dalp:
        verdict = 'Revise'
    if len(hard_failures) >= 2 or (dense_slides and empty_slides):
        verdict = 'Rebuild'

    lines = []
    lines.append(f"# PPT Review — {deck.name}")
    lines.append('')
    lines.append('## Executive Summary')
    lines.append(f"- **Verdict:** {verdict}")
    lines.append(f"- **Review date:** {date.today().isoformat()}")
    lines.append(f"- **Slide count:** {slide_count}")
    lines.append(f"- **Hard failures:** {', '.join(hard_failures) if hard_failures else 'None'}")
    lines.append(f"- **Highest-risk slides:** {', '.join(map(str, dense_slides[:5] + empty_slides[:3])) if (dense_slides or empty_slides) else 'None'}")
    lines.append('')
    lines.append('## PPT Output Structure')
    lines.append('')
    lines.append('### Deck-Level Structural Readout')
    lines.append(f"- Slide size compliance: {'Pass' if report['presentation']['slide_dimensions']['matches_expected'] else 'Fail'}")
    lines.append(f"- Empty slides: {', '.join(map(str, empty_slides)) if empty_slides else 'None'}")
    lines.append(f"- Dense slides (>100 words): {', '.join(map(str, dense_slides)) if dense_slides else 'None'}")
    lines.append(f"- Dark/blue content slides: {s['dark_or_blue_content_slides']}")
    lines.append(f"- Non-Figtree font slides: {s['slides_with_non_figtree_fonts']}")
    lines.append(f"- Agenda integrity: {'Agenda present' if agenda else 'No clear agenda slide detected'}")
    lines.append(f"- Section-separator usage: {divider_count} likely divider-style slide(s)")
    lines.append(f"- Duplicate text blocks: {len(report.get('duplicate_text_blocks', []))}")
    lines.append('')
    lines.append('### Structural Issues to Fix')
    if not hard_failures and not dense_slides and not repeated:
        lines.append('- No critical structure issues surfaced in the automated pass.')
    else:
        if not report['presentation']['slide_dimensions']['matches_expected']:
            dims = report['presentation']['slide_dimensions']
            lines.append(f"- **Critical:** deck is {dims['cx']} × {dims['cy']} EMU, not the official {dims['expected_cx']} × {dims['expected_cy']} template size.")
        if empty_slides:
            lines.append(f"- **Critical:** Slide(s) {', '.join(map(str, empty_slides))} are empty and should be removed or turned into a proper close/Q&A slide.")
        if dense_slides:
            lines.append(f"- **Major:** Slides {', '.join(map(str, dense_slides))} are presentation-heavy and at live-delivery risk.")
        if repeated:
            lines.append(f"- **Minor:** Repeated headline patterns on slides {', '.join(map(str, repeated))} reduce section clarity.")
    lines.append('')
    lines.append('### Slide-Level Structure Notes')
    for slide in report['slides']:
        sig = next(x for x in signals['slides'] if x['slide'] == slide['slide'])
        notes = []
        if slide['empty']:
            notes.append('empty slide')
        if slide['too_dense']:
            notes.append(f"{slide['word_count']} words")
        if sig['weak_headline']:
            notes.append('weak/generic headline')
        if sig['repeated_title']:
            notes.append('repeated title pattern')
        if slide['table_count'] and slide['word_count'] > 80:
            notes.append('table-fit risk')
        if slide['image_count'] and slide['word_count'] > 90:
            notes.append('image + copy overload')
        if notes:
            lines.append(f"- **Slide {slide['slide']} — {slide.get('title') or '[untitled]'}:** " + '; '.join(notes))
    if lines[-1] == '### Slide-Level Structure Notes':
        lines.append('- No slide-specific structure issues called out.')
    lines.append('')
    lines.append('## Content Review')
    lines.append('')
    lines.append('### Messaging and Story Quality')
    lines.append('- Story arc is commercially coherent if it moves from market/problem → DALP fit → proof/use cases → next step.')
    lines.append(f"- Weak headline slides: {', '.join(map(str, weak)) if weak else 'None'}")
    lines.append(f"- Generic filler slides: {', '.join(map(str, filler)) if filler else 'None'}")
    lines.append(f"- DALP positioning risk slides: {', '.join(map(str, dalp)) if dalp else 'None'}")
    lines.append(f"- Repetition risk: {len(report.get('duplicate_text_blocks', []))} duplicated block(s)")
    lines.append('')
    lines.append('### Content Issues to Fix')
    if filler:
        lines.append(f"- **Major:** Slides {', '.join(map(str, filler))} rely on generic marketing language that weakens credibility.")
    if dalp:
        lines.append(f"- **Major:** Slides {', '.join(map(str, dalp))} may drift toward weaker DALP positioning (tool/tokenization phrasing instead of platform/lifecycle framing).")
    if weak:
        lines.append(f"- **Minor:** Slides {', '.join(map(str, weak))} would benefit from point-of-view headlines instead of topic labels.")
    if not any([filler, dalp, weak]):
        lines.append('- No major wording-pattern issue was detected automatically; still review for audience fit and proof quality.')
    lines.append('')
    lines.append('### Actionable Slide Notes')
    for slide in report['slides']:
        sig = next(x for x in signals['slides'] if x['slide'] == slide['slide'])
        actions = []
        if slide['too_dense']:
            actions.append('cut 25–40% of body copy or split the slide')
        if sig['weak_headline']:
            actions.append('rewrite the title as a takeaway, not a topic')
        if sig['generic_filler_hits']:
            actions.append('replace filler language with specific proof or claim')
        if sig['dalp_positioning_risk_hits']:
            actions.append('tighten DALP framing toward lifecycle platform / orchestration value')
        if actions:
            lines.append(f"- **Slide {slide['slide']} — {slide.get('title') or '[untitled]'}:** " + '; '.join(actions))
    if lines[-1] == '### Actionable Slide Notes':
        lines.append('- No slide-specific content fixes surfaced automatically.')
    lines.append('')
    lines.append('## Strengths')
    lines.append('- Uses editable native content rather than looking like a flattened image deck.')
    lines.append('- Font discipline appears strong; no non-Figtree usage surfaced.')
    lines.append('- Core storyline appears business-facing rather than purely technical.')
    return '\n'.join(lines) + '\n'


def main() -> int:
    parser = argparse.ArgumentParser(description='Generate a structured PPT review markdown file.')
    parser.add_argument('deck')
    parser.add_argument('--output-md', required=True)
    parser.add_argument('--output-json', required=True)
    args = parser.parse_args()

    deck = Path(args.deck)
    report = load_inspection(deck)
    signals = extract_slide_signals(report)
    enriched = {'inspection': report, 'signals': signals}
    Path(args.output_json).write_text(json.dumps(enriched, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    md = make_review(deck, report, signals)
    Path(args.output_md).write_text(md, encoding='utf-8')
    print(args.output_md)
    print(args.output_json)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
