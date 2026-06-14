# Tablet-/Mobilreview Symbol-Garten und Mengen legen

Datum: 2026-05-21

## Auftrag

Enger Review der bestehenden GE-Lernwerkstatt-Kinderspielraeume:

- Symbol-Garten
- Mengen legen

Geprueft gegen:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md`

## Kleine Fixes

Hermes hat zwei sinnvolle, eng begrenzte UI-Fixes umgesetzt:

- Symbol-Garten wird nun wie Mengen legen als Kinderspielraum behandelt.
- Im Symbol-Garten werden technischer App-Header und lange Hauptnavigation ausgeblendet.
- Symbol-Garten hat jetzt eine sichtbare Support-Bar:
  - Hilfe
  - Nochmal
  - Pause
  - Zurueck

Geaenderte Datei:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`

## Verifikation

- `npm run build`: erfolgreich.
- Tablet-Smoke bei 768 x 1024:
  - Start -> Symbol-Garten: kein technischer Header, keine lange Navigation, Support-Bar sichtbar, kein horizontaler Overflow.
  - Symbol-Garten: Karte -> Garten legt korrekt ab, Feedback `Passt. Gut gelegt.`
  - Start -> Mengen legen -> zwei Steine -> `2`: Feedback `Passt. Die Menge ist gelegt.`
  - Mengen legen: kein technischer Header, keine lange Navigation, kein horizontaler Overflow.
- Mobile-Smoke bei 390 x 844:
  - gleiche Pfade erfolgreich.
  - kein horizontaler Overflow.

## Screenshots

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/smoke/ge-symbol-garten-tablet-verified.png`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/smoke/ge-symbol-garten-mobile-verified.png`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/smoke/ge-mengen-legen-tablet-verified.png`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/smoke/ge-mengen-legen-mobile-verified.png`

## Bewertung

Gruen fuer diesen Review. Der wichtigste Befund war, dass Symbol-Garten noch nicht konsequent wie ein Kinderspielraum isoliert war. Das ist jetzt behoben. Mengen legen bleibt nach dem Fix stabil.

Resthinweis: Die Lehrkraft-Lernspur im Symbol-Garten ist noch vorhanden und koennte spaeter in einen sekundären Drawer verschoben werden. Das war groesser als der erlaubte kleine Review-Slice und wurde bewusst nicht umgebaut.
