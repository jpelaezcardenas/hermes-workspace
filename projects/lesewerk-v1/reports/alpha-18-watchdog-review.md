# Alpha 18 - Final Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Kurzfazit

Hermes hat Alpha 18 wegen Iterationslimit blockiert, aber die eigentliche Implementierung war brauchbar. Codex hat die fehlende Abschlusskontrolle übernommen: Tests, Build, Safety-Scan, Desktop-Browsercheck und 390px-Browsercheck wurden nachgeholt.

Entscheidung: `Accepted / nicht blockiert`

## Geprüfte Änderung

Alpha 18 ergänzt einen sichtbaren geführten Leseweg:

`Start -> Wort -> Silben -> Satz -> Mini-Geschichte -> Pause`

Die App zeigt nun:

- `Wir gehen einen Leseweg.`
- `Lesepfad starten`
- `Wort zu Satz zu Geschichte`
- eine Beispielkette mit `Ball`, Satz und Mini-Geschichte.

## Tests

Ausgeführt:

- `npm test`

Ergebnis:

- 71 Tests bestanden
- 0 fehlgeschlagen

## Build

Ausgeführt:

- `npm run build`

Ergebnis:

- `tsc -b` bestanden
- `node scripts/build.mjs` bestanden

## Safety-Scan

Geprüft in `src`:

- Netzwerk: `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`
- Export/Upload/Login: `new Blob`, `createObjectURL`, `download=`, `upload`, `Login`, `Passwort`, `E-Mail`, `Telefon`, `Datenbank`
- XSS/Injection: `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`
- Storage: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`

Ergebnis:

- Keine neuen Netzwerk-, Upload-, Export-, Login-, Datenbank- oder XSS-Treffer in `src`.
- Storage-Treffer weiterhin nur bestehendes `localStorage` für die anonyme Profilwahl:
  - `src/App.tsx:48`
  - `src/App.tsx:92`
  - `src/App.tsx:256`

Bewertung: Pass with known note.

## Browsercheck

Server eindeutig gestartet auf:

- `http://127.0.0.1:53221/`

Desktop:

- Titel: `LeseWerk V1`
- `Lesepfad starten` sichtbar
- Pfadtext sichtbar
- Beispielkette sichtbar
- `scrollWidth=1280`, `clientWidth=1280`
- kein horizontaler Overflow
- Hinweis: ein harmloser 404-Favicon-Request, keine App-Fehlfunktion

390px Narrow:

- Titel: `LeseWerk V1`
- `Lesepfad starten` sichtbar
- Pfadtext sichtbar
- Beispielkette sichtbar
- Button ca. 320px breit und 64px hoch
- `scrollWidth=390`, `clientWidth=390`
- kein horizontaler Overflow
- keine Browserfehler

## Bewertung

Alpha 18 löst das Kernproblem nicht vollständig, aber deutlich: Der Weg von Wort zu Silbe zu Satz zu Geschichte ist jetzt sichtbar. Das Kind bekommt mehr Orientierung, und die Lehrkraft erkennt den didaktischen Ablauf schneller.

## Verbleibende Risiken

- Die Kette ist aktuell exemplarisch und nicht für alle Wörter interaktiv durchdekliniert.
- Das Beispiel `Ball` ist didaktisch leicht, aber für Silbentrennung weniger stark als zweisilbige Wörter.
- Noch kein realer iPad-/Tablet-Test im Klassenraum.
- Noch keine vollständige Lehrerübersicht des Wortbestands in der Oberfläche.

## Nächste Empfehlung

`Alpha 19 - Interaktive Schrittkarte fuer eine zweisilbige Lesekette`

Ziel:

- Eine einzige zweisilbige Kette, z. B. `Mama`, `Sofa`, `Lama` oder `Limo`, wirklich interaktiv als Schrittkarte umsetzen.
- Keine neuen Speicher-, Export-, Login-, Cloud- oder Bewertungsfunktionen.
- Danach erneut Test, Build, Safety-Scan und 390px-Browsercheck.
