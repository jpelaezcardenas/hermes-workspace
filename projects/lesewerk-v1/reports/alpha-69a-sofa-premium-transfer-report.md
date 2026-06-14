# Alpha 69A - Sofa Premium Mini-Reise kontrolliert übertragen

Datum: 2026-05-21

## Ergebnis

Status: grün.

Sofa nutzt jetzt denselben geprüften Premium-Fünf-Schritt-Weg wie Mama:

1. Bild
2. Silben
3. Wort
4. Satz
5. Mini-Geschichte

Hermes begann den Slice, wählte aber zwischenzeitlich eine zu schwere Satz-/Geschichtenformulierung (`Mama sitzt auf dem Sofa`). Das wurde bewusst zurückgenommen, weil sie für den kontrollierten Sofa-Pfad unnötig viele neue Wörter und Grapheme einführt. Der sichere Stand bleibt:

- Satz: `Lies: Das Sofa ist da.`
- Mini-Geschichte: `Das Sofa ist da. Was passt?`
- Verstehenskarte: `Das Sofa ist da`

## Änderung

Es wurde ein fokussierter Test ergänzt, der Sofa als Premium-Mini-Reise absichert:

- fünf Stationen bleiben vollständig erhalten
- alle Stationen bleiben auf `Sofa` verankert
- Satz und Mini-Geschichte bleiben einfach und druckfrei
- der finale Pfadschritt bleibt `Mini-Geschichte`
- der Cue bleibt `Zeig, was passt.`

## Verifikation

- `npm test -- --run`: 204/204 bestanden
- `npm run build`: erfolgreich
- Desktop-Smoke Sofa: bestanden
- Mobile-Smoke Sofa 390px: bestanden
- kein horizontaler Überlauf
- keine Druck-/Score-/Diagnose-Wörter

## Screenshot-Belege

Desktop:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-desktop-01-bild.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-desktop-02-silben.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-desktop-03-wort.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-desktop-04-satz.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-desktop-05-verstehen.png`

Mobile:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-mobile-01-bild.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-mobile-02-silben.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-mobile-03-wort.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-mobile-04-satz.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-mobile-05-verstehen.png`

JSON-Ergebnis:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69a-sofa-smoke-results.json`

## Qualitätsbewertung

Sofa ist jetzt als zweite Wortfamilie visuell und strukturell auf Mama-Niveau abgesichert. Der wichtigste Qualitätspunkt war nicht mehr visuelle Größe, sondern didaktische Schärfe: keine unnötig komplexen Zusatzwörter in einem frühen, geführten Pfad.

## Nächster sinnvoller Slice

Alpha 69B: Tasse kontrolliert auf denselben Premium-Fünf-Schritt-Weg prüfen und nur dann minimal angleichen. Dabei besonders auf `Tas-se`, Artikel/Wortlänge und mobile Satzdarstellung achten.
