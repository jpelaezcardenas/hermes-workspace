# Alpha 19 - Mama Schrittkarte Implementation Report

Datum: 2026-05-18
Status: Implementiert

## Kurzfazit

Alpha 19 ergänzt im bestehenden Kinderbereich eine interaktive Schrittkarte für die zweisilbige Lesekette `Mama`. Die Karte zeigt immer genau einen aktuellen Schritt und zwei ruhige Lehrkraft-/Kind-Aktionen: `Weiter` und `Nochmal ruhig`.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Umgesetzt

- `getGuidedReadingChain(...)` nutzt jetzt die vorhandene Aufgabe `b-ma-ma`.
- Die Kette arbeitet mit `Mama`, den Silben `Ma` und `ma`, Satz `Mama ist da.` und einer kurzen Mini-Geschichte:
  - `Mama ist da.`
  - `Mama winkt.`
  - `Wir lesen ruhig.`
- Im Kinderbereich liegt unter dem sichtbaren Alpha-18-Lesepfad eine neue `Schrittkarte Mama`.
- Die Schrittfolge ist:
  1. `Wort ansehen`
  2. `Silben lesen`
  3. `Wort bauen`
  4. `Satz lesen`
  5. `Mini-Geschichte`
  6. `Pause`
- `Ma` und `ma` bleiben getrennt sichtbar und nutzen die vorhandenen alternierenden Silbenfarben blau/rot.
- Die Karte ist teacher-led, ohne Bewertung, Score, Timer, Prozent, Ranking oder Korrektheitslogik.

## Tests

Ausgeführt:

- `npm test`

Ergebnis:

- 72 Tests bestanden
- 0 fehlgeschlagen

Neue/angepasste Schutztests:

- Mama-Kette nutzt `b-ma-ma`, `Ma`/`ma` und alternierende Farben.
- App-Quelltext/CSS enthalten die interaktive Mama-Schrittkarte mit `Weiter` und `Nochmal ruhig`.
- Mama-Schrittkartenbereich führt keine Druck-/Score-/Diagnose-/Timer-/Ranking-Sprache ein.

## Build

Ausgeführt:

- `npm run build`

Ergebnis:

- `tsc -b` bestanden
- `node scripts/build.mjs` bestanden

## Safety-Scan

Geprüft in `src` auf Netzwerk, Upload, Export, Login, Datenbank, Storage-Erweiterung und XSS-riskante Muster.

Ergebnis:

- Keine neuen Treffer für Netzwerk, Upload, Export, Login, Datenbank oder XSS-riskante Muster.
- Bekannte bestehende Storage-Treffer bleiben unverändert auf das anonyme Demo-Profil begrenzt:
  - `src/App.tsx:48`
  - `src/App.tsx:93`
  - `src/App.tsx:258`

## Browsercheck

Lokaler Server:

- `http://127.0.0.1:53222/`

Desktop:

- Titel: `LeseWerk V1`
- Mama-Schrittkarte sichtbar
- `Weiter` und `Nochmal ruhig` sichtbar
- Schrittfolge per `Weiter` bis `Pause` erreichbar
- `scrollWidth=1280`, `clientWidth=1280`
- kein horizontaler Overflow

390px Narrow-Check:

- per 390px-Iframe im Browser geprüft
- Mama-Schrittkarte sichtbar
- `bodyScroll=390`, `docScroll=390`, `frameClient=390`
- kein horizontaler Overflow
- Buttonhöhen je 64px, Buttonbreiten je 284px

## Bewertung

Die neue Karte macht Alpha 18 didaktisch überzeugender, weil jetzt eine echte zweisilbige Progression sichtbar und bedienbar ist. Sie ersetzt keinen Unterricht und keine Diagnostik, sondern unterstützt einen ruhigen, lehrkraftgeführten Lesemoment.

## Grenzen

- Noch kein echter iPad-/Klassenraumtest.
- Die Schrittkarte ist zunächst auf `Mama` begrenzt, nicht als generisches Curriculum für alle Wörter ausgebaut.
- Die Mini-Geschichte ist bewusst sehr kurz; weitere Geschichten sollten später systematisch geprüft werden.

## Nächster kleinster Schritt

Im nächsten Alpha-Schritt nicht sofort mehr Wörter bauen, sondern die Mama-Schrittkarte einmal als Unterrichtsfluss prüfen: Start, Leseposition, Touchgröße, Lehrkraftsprache und Abbruch/Pause im realen Tablet-Setting.
