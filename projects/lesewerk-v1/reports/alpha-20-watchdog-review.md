# Alpha 20 - Final Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Kurzfazit

Alpha 20 ist abgeschlossen. Der Tablet-Praxischeck hat eine kleine Orientierungs-Schwäche gefunden: Die allgemeine Leseweg-Übersicht stand vor der konkreten `Schrittkarte Mama`. Als kleinster UI-Fix wurde nur die Reihenfolge im Lesebereich geändert, sodass die interaktive Mama-Schrittkarte zuerst erscheint und die Übersicht darunter erhalten bleibt.

Entscheidung: `Accepted / nicht blockiert`

## Geprüfte Änderung

Geändert:

- `src/App.tsx`

Inhalt der Änderung:

- `MamaStepCard` steht jetzt vor `GuidedReadingPath` im Kinder-Lesebereich.
- Keine Inhalte der Mama-Karte wurden erweitert.
- Keine neuen Wörter, Stories, Profile, Speicher-, Export-, Login-, Cloud- oder Bewertungsfunktionen.

Neu erstellt:

- `reports/alpha-20-tablet-practice-review.md`
- `reports/alpha-20-small-ui-fix-report.md`
- `reports/alpha-20-watchdog-review.md`

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

- Netzwerk/Übertragung: `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`
- Export/Upload/Login/Datenbank: `new Blob`, `createObjectURL`, `download=`, `upload`, `Login`, `Passwort`, `E-Mail`, `Telefon`, `Datenbank`
- XSS-riskante Muster: `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`
- Storage-Erweiterung: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`
- Druck-/Bewertungssprache: `score`, `timer`, `ranking`, `diagnose`, `falsch`, `fehler`, `zeitdruck`, `prozent`

Ergebnis:

- Keine neuen Netzwerk-, Upload-, Export-, Login-, Datenbank- oder XSS-Treffer in `src`.
- Nur die bekannten bestehenden `localStorage`-Treffer bleiben vorhanden:
  - `src/App.tsx:48`
  - `src/App.tsx:93`
  - `src/App.tsx:258`
- Keine neue Score-/Timer-/Ranking-/Diagnose-/Fehlerlogik in der Mama-Schrittkarte.

## Browsercheck Desktop

Lokaler Server:

- `http://127.0.0.1:53224/`

Geprüft:

- Titel: `LeseWerk V1`
- `Schrittkarte Mama` sichtbar
- Reihenfolge im Lesebereich: zuerst `mama-step-card`, danach `guided-path-panel`
- `Weiter` sichtbar: ca. 281px breit, 64px hoch
- `Nochmal ruhig` sichtbar: ca. 281px breit, 64px hoch
- kein horizontaler Overflow: `scrollWidth=1280`, `clientWidth=1280`

## 390px Browsercheck

Per 390px-Iframe im Browser geprüft.

Ergebnis:

- `frameClient=390`
- `bodyScroll=390`
- `docScroll=390`
- `client=390`
- kein horizontaler Overflow
- Reihenfolge im Lesebereich: zuerst `mama-step-card`, danach `guided-path-panel`
- `Weiter`: ca. 284px breit, 64px hoch
- `Nochmal ruhig`: ca. 284px breit, 64px hoch

Hinweis: Die Karte liegt auf der Gesamtseite nach Profil- und Hilfebereich weiterhin nicht ganz oben. Innerhalb des eigentlichen Lesebereichs ist sie durch den Fix aber jetzt der erste konkrete Handlungsblock.

## Schrittprüfung Mama-Karte

Die Mama-Karte wurde im Browser per `Nochmal ruhig` auf Schritt 1 zurückgesetzt und danach per `Weiter` bis Schritt 6 geklickt.

Ergebnis:

1. `Wort ansehen` - `Mama`
2. `Silben lesen` - `Ma` / `ma`
3. `Wort bauen` - `Mama Mama`
4. `Satz lesen` - `Mama ist da.`
5. `Mini-Geschichte` - `Mama ist da.`, `Mama winkt.`, `Wir lesen ruhig.`
6. `Pause` - `Fertig. Jetzt ist Pause.`

Die Karte erreicht den Pausenschritt zuverlässig. `Weiter` ist im Pausenschritt deaktiviert; `Nochmal ruhig` bleibt verfügbar.

## Bewertung gegen Alpha-20-Fragen

1. Mama-Schrittkarte nach Öffnen des Kinderpfads auffindbar?
   - Ja, nach dem Fix im Lesebereich klarer: die aktuelle Schrittkarte steht vor der Übersicht.

2. `Weiter` und `Nochmal ruhig` bei 390px groß genug?
   - Ja, ca. 284px x 64px, untereinander und gut antippbar.

3. Sieht das Kind einen aktuellen Schritt statt zu viel Konkurrenz?
   - Innerhalb der Karte ja. Durch die neue Reihenfolge konkurriert die Übersicht weniger stark.

4. Sind `Ma` und `ma` getrennt genug?
   - Ja, getrennte Silbenelemente mit blauer/roter Farbe und Abstand.

5. Ist Pause/Fertig ruhig und offensichtlich?
   - Ja, `Fertig. Jetzt ist Pause.` ist klar; `Weiter` wird deaktiviert.

6. Gab es einen kleinen sinnvollen UI-Fix?
   - Ja: Reihenfolge getauscht, keine inhaltliche Erweiterung.

## Risiken / Grenzen

- Kein echter Unterrichts- oder iPad-Test mit Kindposition wurde durchgeführt; es ist ein technischer und fachlicher Simulationscheck.
- Die Seite enthält weiterhin weitere Kinderpfad-Elemente. Alpha 20 hat bewusst nicht breit umgebaut.
- Die Schrittkarte ist weiterhin nur für `Mama` umgesetzt. Das ist für diese Phase beabsichtigt.

## Endentscheidung

`Accepted / nicht blockiert`

Die Änderung ist klein, testbar und verbessert die Tablet-Orientierung ohne Produktmodell, Inhalte oder Datenschutzprofil zu erweitern.
