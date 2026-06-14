# LeseWerk Alpha 4 – Story-UI und Tablet-Polish

Stand: 2026-05-16

## Kurzfazit

Slice C hat den Story-Modus visuell beruhigt und die Story-Fläche klarer gegliedert. Der Lesetext steht jetzt vor den Hilfen, die Hilfen sitzen in einer eigenen Reihe unter dem Text, und Frage plus Antwortauswahl sind als eigener Verständnisblock gruppiert.

Ich habe keine neuen Inhalte, keine externen Assets, keine Speicherung und keine personenbezogenen Daten ergänzt.

## Geänderte Dateien

- `src/App.tsx`
  - Alpha-Hinweis im Kopf von Alpha 3 auf Alpha 4 aktualisiert.
  - Demo-Header zeigt im Story-Modus `Story lesen` und `Lies die Story` statt des Wortübungslabels.
  - Story-Hilfen werden nach dem Lesetext in einer eigenen `story-support-row` gebündelt.
  - Verständnisfrage und Antwortbuttons sind in `story-question` zusammengefasst.

- `src/styles.css`
  - Story-Karte mit ruhigerer Innenstruktur, Trennlinie unter Titelblock und großzügigerem Lesetext versehen.
  - Story-Text größer, luftiger und mit stabiler Zeilenhöhe gestaltet.
  - Symbolhilfe und Silbenstütze in einer getrennten Hilfezeile angeordnet, damit sie nicht vor oder über dem Lesetext konkurrieren.
  - Antwortbereich bleibt groß, zweispaltig auf Desktop und fällt über bestehende Media Queries auf eine Spalte zurück.

## Erfüllung der Anforderungen

1. Visuelle Hierarchie verbessert:
   - Titel und Zielhinweis stehen oben.
   - Lesetext ist der erste große Inhalt im Story-Artikel.
   - Hilfen folgen darunter als sekundäre Unterstützung.
   - Verständnisfrage und Antworten bilden einen eigenen Abschlussblock.

2. Tablet-/Touch-Freundlichkeit:
   - Große bestehende Buttons bleiben erhalten.
   - Story-Hilfezeile nutzt `auto-fit` mit Mindestbreiten, damit Symbolhilfe und Silbenstütze umbrechen können.
   - Bestehende Breakpoints bei 920px und 640px bleiben aktiv.

3. Ruhige Lesefläche:
   - Keine neuen Gradients, Orbs, Marketing-Hero-Elemente oder dekorativen Assets.
   - Lesetext bleibt in einer weißen, kontrastreichen Karte.

4. Symbolhilfe und Silbenstütze:
   - Hilfen sind nicht mehr vor dem Text platziert.
   - Im Browsercheck mit `Bildhilfe`, `Silbenfarben` und `Weniger Auswahl` gab es keine sichtbaren Überlappungen.

5. Kinderfluss und Lehrerpfad:
   - Modusumschaltung `Wort üben` / `Story lesen` bleibt erhalten.
   - Lehrkraftbereich und Beobachtungslogik wurden nicht verändert.

## Verifikation

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 22/22 Tests bestanden.
- `npm run build`: erfolgreich.

Browsercheck:

- Lokaler Build über `python3 -m http.server 4195 -d dist` geöffnet.
- Story-Modus geöffnet.
- Sichtprüfung Desktop-Breite: Story-Titel, Lesetext, Hilfezeile, Verständnisfrage und Antwortbuttons sind klar getrennt; keine sichtbaren Überlappungen.
- Sichtprüfung mit aktivierter `Bildhilfe`, `Silbenfarben` und `Weniger Auswahl`: Hilfezeile liegt unter dem Lesetext; zwei Antwortbuttons bleiben groß und lesbar.
- Browser-Konsole: keine JavaScript-Fehler beobachtet.

## Datenschutz und fachliche Grenzen

- Keine echten Schülernamen.
- Keine Diagnosen, Noten, Rankings, Scores oder Timer.
- Keine externen Bild-, Symbol- oder Audiodienste.
- Symbolhilfe bleibt eine lokale, rechtssichere Platzhalterhilfe.

## Rest-Risiken

- Kein echter Tablet-Gerätetest; geprüft wurde lokal im Browser und per CSS-/Layout-Sichtprüfung.
- Die obere Profil- und Startfläche nimmt weiterhin viel vertikalen Raum ein. Das war nicht Teil dieses Slice und sollte ggf. später als eigener Startfluss-Slice bearbeitet werden.
- Story-Inhalte selbst wurden nicht didaktisch erweitert; Slice C war bewusst nur UI-/Layout-Polish.
