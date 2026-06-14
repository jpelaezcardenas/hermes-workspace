# Alpha 19 - Final Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Kurzfazit

Alpha 19 wurde von Hermes weitgehend umgesetzt. Hermes erreichte erneut das Iterationslimit kurz vor dem sauberen Kanban-Abschluss. Codex hat deshalb die Abschlusskontrolle übernommen.

Entscheidung: `Accepted / nicht blockiert`

## Geprüfte Änderung

Alpha 19 ergänzt eine interaktive Schrittkarte für die zweisilbige Lesekette `Mama`.

Die Karte führt durch:

1. `Wort ansehen` - Mama
2. `Silben lesen` - Ma / ma
3. `Wort bauen` - Mama
4. `Satz lesen` - Mama ist da.
5. `Mini-Geschichte` - Mama ist da. / Mama winkt. / Wir lesen ruhig.
6. `Pause` - Fertig. Jetzt ist Pause.

Die Karte hat die ruhigen Aktionen:

- `Weiter`
- `Nochmal ruhig`

## Tests

Ausgeführt:

- `npm test`

Ergebnis:

- 72 Tests bestanden
- 0 fehlgeschlagen

## Build

Ausgeführt:

- `npm run build`

Ergebnis:

- `tsc -b` bestanden
- `node scripts/build.mjs` bestanden

## Safety-Scan

Geprüft in `src` auf:

- Netzwerk: `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`
- Export/Upload/Login: `new Blob`, `createObjectURL`, `download=`, `upload`, `Login`, `Passwort`, `E-Mail`, `Telefon`, `Datenbank`
- XSS/Injection: `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`
- Storage: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`
- Druck-/Bewertungssprache: Score, Timer, Ranking, Diagnose, falsch, Fehler, Zeitdruck, Prozent

Ergebnis:

- Keine neuen Netzwerk-, Upload-, Export-, Login-, Datenbank- oder XSS-Treffer in `src`.
- Bekannte bestehende Storage-Treffer bleiben auf das anonyme Demo-Profil begrenzt:
  - `src/App.tsx:48`
  - `src/App.tsx:93`
  - `src/App.tsx:258`
- Keine neue Score-/Timer-/Ranking-/Diagnose-/Fehlerlogik in der Mama-Schrittkarte.

## Browsercheck

Server eindeutig gestartet auf:

- `http://127.0.0.1:53223/`

Desktop:

- Titel: `LeseWerk V1`
- Mama-Schrittkarte sichtbar
- `Weiter` sichtbar
- `Nochmal ruhig` sichtbar
- `Ma` und `ma` sichtbar getrennt
- kein horizontaler Overflow
- Hinweis: ein harmloser 404-Favicon-Request, keine App-Fehlfunktion

390px Narrow:

- Mama-Schrittkarte sichtbar
- `Weiter` sichtbar
- `Nochmal ruhig` sichtbar
- Button ca. 284px breit und 64px hoch
- `scrollWidth=390`, `clientWidth=390`
- kein horizontaler Overflow
- keine Browserfehler

## Schrittprüfung

Die Karte wurde im Browser Schritt für Schritt geklickt.

Ergebnis:

- Schritt 1: `Wort ansehen` zeigt `Mama`
- Schritt 2: `Silben lesen` zeigt `Ma` und `ma`
- Schritt 3: `Wort bauen` zeigt `Mama`
- Schritt 4: `Satz lesen` zeigt `Mama ist da.`
- Schritt 5: `Mini-Geschichte` zeigt drei ruhige Sätze
- Schritt 6: `Pause` zeigt `Fertig. Jetzt ist Pause.`

## Bewertung

Alpha 19 ist ein echter Qualitätssprung gegenüber Alpha 18, weil die Lesekette nicht mehr nur sichtbar, sondern erstmals schrittweise bedienbar ist. Didaktisch ist `Mama` stärker als `Ball`, weil die Silben `Ma` und `ma` getrennt gelesen werden können.

Die Umsetzung bleibt eng, lokal und GE-passend. Sie vermeidet Bewertung, Tempo, Score, Login, Cloud und Schülerdaten.

## Verbleibende Risiken

- Die Schrittkarte ist bisher nur für eine einzige Kette `Mama` umgesetzt.
- Noch kein realer Tablet-Test im Unterricht.
- Die Karte ist didaktisch gut als Prototyp, aber noch kein vollständiges Lesecurriculum.
- Spätere Erweiterung auf weitere Wörter muss streng kuratiert werden, sonst wird die App wieder unübersichtlich.

## Nächste Empfehlung

`Alpha 20 - Tablet-Praxischeck der Mama-Schrittkarte`

Scope:

- Keine neuen Wörter.
- Kein neues Curriculum.
- Nur die Mama-Schrittkarte auf Tablet/390px mit echtem Blick auf Bedienbarkeit, Textgröße, Touchfläche und Pausenmoment prüfen.
- Danach genau einen kleinen UI-Fix ableiten.
