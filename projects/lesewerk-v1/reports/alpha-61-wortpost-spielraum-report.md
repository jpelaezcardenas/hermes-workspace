# Alpha 61 - Wortpost-Spielraum

## Ergebnis
- LeseWerk hat jetzt einen kleinen GE-Spielraum-Slice `Wortpost`.
- Die Lehrkraft kann den Modus ueber `Wortpost testen` starten.
- Das Kind sieht danach einen ruhigen Fokusraum: grosse Wortkarte, sichtbare Hilfen und 2 grosse Symbolziele.
- Antippen reicht; es gibt kein Drag-only, keinen Timer, keine Punkte, kein Ranking und keine Diagnosesprache.

## Geaenderte Dateien
- `src/App.tsx`
- `src/styles.css`

## Gepruefter Wortpost-Pfad
- Lehrkraft oeffnen.
- `Wortpost testen` starten.
- `Wortpost starten` auf der Fokus-Startkarte.
- Runde 1:
  - `Post 1 von 3`
  - Wortkarte `Ball`
  - Hilfen sichtbar: `Weniger Auswahl`, `Silben zeigen`, `Gebaerde / Vormachen`
  - Ziele: `Ball`, `Bus`
  - Ziel `Ball` antippen.
- Feedback:
  - `Die Karte ist angekommen.`
  - `Nochmal`, `Weiter`, `Zur Lehrkraft`
- Weiter:
  - Runde 2 zeigt `Tasse` mit Silben `Tas` / `se`.

## Checks
- `npm test -- --run`: bestanden, 161/161 Tests.
- `npm run build`: bestanden.
- Desktop-Smoke auf `http://127.0.0.1:5174/`: bestanden.
- Mobile-Smoke auf schmaler Breite: bestanden.
- Im Wortpost-Fokusmodus war keine alte Tagespfad-, Bibliotheks- oder Lehreroberflaeche sichtbar.
- Kein horizontaler Overflow im geprueften Desktop- oder Mobile-Viewport.
- Alpha-60-Regression `Ball -> Der Ball im Garten -> Tasse`: bestanden.

## Datenschutz und GE-Sicherheit
- Keine echten Namen, keine Diagnosen, keine Speicherung, kein Cloudzugriff.
- Es werden nur vorhandene lokale Taskdaten und Symbolhilfen genutzt.
- Die Rueckmeldung ist handlungsnah und ruhig: angekommen / noch einmal schauen.

## Bewertung
- Gruen fuer den ersten Spielraum-Slice: Das Gartenpost-Pattern ist in LeseWerk erstmals sichtbar als eigener Lese-Spielraum.
- Noch nicht S-Tier: Die Symboldarstellung ist weiterhin text-/zeichenbasiert. Fuer eine starke Produktwirkung braucht es spaeter bessere Bildszenen, mehr Bewegung, feinere Hilfezustaende und eine kuratierte Progression.

## Naechster sinnvoller Slice
Alpha 62 sollte den Wortpost visuell und didaktisch veredeln:
- kleine Szene statt reiner Symbolkarte;
- deutlicherer Weg `Wortkarte -> Ziel`;
- optionales Modellieren durch Lehrkraft;
- Wortpost-Aufgaben passend zu bekanntem Buchstaben-/Silbenstand;
- Lehrkraft-Beobachtung: Auswahl, Hilfe, Wiederholung, naechster kleiner Schritt.
