# Alpha 60 - Mini-Storys als Auswahl-Spielrunden

## Ergebnis
- Mini-Story-Karten werden im Auswahl-Spiel nicht mehr aus dem Sequenzpfad herausgefiltert.
- Lehrkraft kann jetzt Wortkarten und Storykarten mischen.
- Kind sieht Storys als ruhige Fokus-Spielrunde mit `Runde X von N`, Mini-Story-Titel, Symbolhilfe, kurzen Sätzen, Fokuswort/Silbenhilfe und genau zwei Antwortkarten.

## Geänderte Dateien
- `src/App.tsx`
- `src/styles.css`

## Geprüfter Testpfad
- Lehrkraft öffnen.
- `Bild und Wort Ball` wählen.
- `Kurze Story Der Ball im Garten` wählen.
- `Bild und Wort Tasse` wählen.
- `Auswahl-Spiel starten`.
- Fokus-Startkarte starten.
- Erwarteter Ablauf wurde extern geprüft:
  - Runde 1 von 3: `Ball`
  - Feedback und `Weiter`
  - Runde 2 von 3: `Der Ball im Garten`
  - Storytext: `Im Garten liegt ein Ball.`, `Ein Kind nimmt den Ball.`, `Er rollt über das Gras.`
  - Antwortkarten: `Ball`, `Bus`
  - Feedback und `Weiter`
  - Runde 3 von 3: `Tasse`
  - Abschlusskarte erscheint.

## Checks
- `npm test -- --run`: bestanden, 161/161 Tests.
- `npm run build`: bestanden.
- Desktop-Smoke auf `http://127.0.0.1:5174/`: bestanden.
- Mobile-Smoke auf schmaler Breite: bestanden.
- Im Fokusmodus war keine alte Tagespfad-/Bibliotheks-/Lehreroberfläche sichtbar.
- Kein horizontaler Overflow im geprüften Desktop- oder Mobile-Viewport.

## Datenschutz und GE-Sicherheit
- Keine Namen, keine Diagnosen, kein Score, kein Timer, kein Ranking.
- Die Storyfrage bleibt eine ruhige Verstehensstütze, kein Leistungstest.
- Es werden nur vorhandene lokale Storydaten und Symbolhilfen genutzt.

## Restrisiken
- Die Storydarstellung ist funktional und deutlich besser integriert, aber noch nicht visuell auf S-Tier-Niveau.
- Die Inhalte sind noch ein kurzer Bestand aus vorhandenen Storydaten; für ein verkaufbares Produkt braucht es später mehr Storyserien, bessere Bild-/Symbolqualität und stärkere Progression nach Entwicklungsstand.

## Nächster sinnvoller Slice
Alpha 61 sollte die Story-Spielrunden attraktiver machen: größere Bildszene, klarere Blickführung, kindlichere Antwortkarten, optionales Vorlesen-/Gebärdenfeld und mehrere Storyserien pro Buchstaben-/Silbenstand.
