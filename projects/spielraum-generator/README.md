# Spielraum Generator MVP – Silben-Garten

Lokaler, eigenständiger HTML-Prototyp für einen generierten Lernspielraum im Bereich frühes Lesen/Silben.

## Schnell öffnen

1. Terminal öffnen.
2. In den Projektordner wechseln:
   `cd /Users/zondrius/hermes-workspace/projects/spielraum-generator`
3. Generierte Datei öffnen:
   `open dist/index.html`

Alternativ mit lokalem Server:

```bash
cd /Users/zondrius/hermes-workspace/projects/spielraum-generator
python3 -m http.server 5177 -d dist
```

Dann im Browser öffnen:
`http://localhost:5177/`

## Neu generieren

```bash
cd /Users/zondrius/hermes-workspace/projects/spielraum-generator
npm run build
npm run smoke
```

## Wichtige Dateien

- Generator-Eingabe: `data/silben-garten.goal.json`
- Generator: `src/generate.js`
- Spiel-Ausgabe: `dist/index.html`
- Prüfskript: `scripts/smoke-check.js`
- Qualitätsbericht: `reports/spielraum-generator-mvp-report.md`
- Wiederverwendbares Muster: `memory/spielraum-generator-quality-pattern.md`

## Pädagogische und Datenschutz-Grenzen

- Keine echten Schülerdaten.
- Keine Diagnosen, Noten, Ranglisten, Zeitdruck oder Leistungsdruck im Kindmodus.
- Illustrationen sind lokal per HTML/CSS/SVG-ähnlichen Formen umgesetzt, keine externen geschützten Assets.
- Lehrkraft-Hinweise sind sekundär über eine kleine Schaltfläche erreichbar und dominieren nicht den Spielmodus.
