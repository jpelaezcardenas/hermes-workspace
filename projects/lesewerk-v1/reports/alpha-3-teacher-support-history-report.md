# LeseWerk Alpha 3 – Lehrerbereich Förderverlauf

Stand: 2026-05-16

## Kurzdiagnose

Der Lehrerbereich war vor dieser Slice eine allgemeine neutrale Beobachtungsübersicht. Für Alpha 3 wurde daraus eine strukturierte Förderverlaufsansicht mit der fachlich gewünschten Reihenfolge:

1. Situation
2. Hilfe
3. Handlung
4. Beobachtung
5. Nächster Schritt

Die Ansicht bleibt anonym, lokal und bewertungsfrei. Es wurde kein Export ergänzt.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
  - `getTeacherSummary()` liefert jetzt zusätzlich `supportHistory` mit den Feldern `situation`, `help`, `action`, `observation`, `nextStep`.
  - Datenqualität unterscheidet nun klarer zwischen:
    - noch keiner Beobachtung,
    - einer Beobachtung,
    - wiederholten Beobachtungen.
  - Bildhilfe, Silbenfarben, Vorlesen und Nochmal werden in der Hilfe-Zeile sichtbar, wenn sie gewählt oder beobachtet wurden.
  - Formulierungen bleiben vorsichtig: keine Diagnose, keine Notenlogik, kein Ranking, kein Score, kein Zeitdruck.

- `src/App.tsx`
  - Lehrerbereich von „Neutrale Beobachtung“ auf „Förderverlauf“ umgestellt.
  - Sichtbare Kartenstruktur nach Profil, Datenqualität, Situation, Hilfe, Handlung, Beobachtung, Nächster Schritt geordnet.
  - Kein Export, keine Persistenz und keine personenbezogenen Eingaben ergänzt.

- `tests/lesewerk-content.test.mjs`
  - RED/GREEN-Tests für die Förderverlaufsstruktur ergänzt.
  - Tests sichern ab, dass Bildhilfe/Vorlesen in der Hilfe-Zeile sichtbar sind.
  - Tests sichern wiederholte Beobachtungen und privacy-sichere Sprache ab.

## TDD-Nachweis

Zuerst ergänzt und rot ausgeführt:

```bash
npm test -- --test-name-pattern="teacher summary"
```

Erwartetes RED-Ergebnis:

- `supportHistory` fehlte noch.
- Datenqualität enthielt noch „mehrere Beobachtungen“ statt der expliziten Formulierung „wiederholte Beobachtungen“.

Nach der minimalen Umsetzung wurde derselbe Test grün.

## Verifikation

Ausgeführt:

```bash
npm test -- --test-name-pattern="teacher summary"
npm test
npm run build
```

Ergebnis:

- gezielter GREEN-Test: 17/17 Tests bestanden.
- vollständiger Testlauf: 17/17 Tests bestanden.
- Build: erfolgreich.

## Browsercheck

Lokale Preview über:

```bash
python3 -m http.server 4192 -d dist
```

Geprüfter Pfad:

1. App unter `http://127.0.0.1:4192/` geöffnet.
2. `Bildhilfe` und `Vorlesen` aktiviert.
3. Aufgabe `Mond` abgeschlossen.
4. In den Lehrerbereich gewechselt.

Beobachtet:

- Lehrerbereich zeigt `Förderverlauf`.
- Struktur sichtbar: Profil, Datenqualität, Situation, Hilfe, Handlung, Beobachtung, Nächster Schritt.
- Hilfe-Zeile zeigt `Bildhilfe, Silbenfarben, Vorlesen`.
- Datenqualität zeigt `eine Beobachtung – nur vorsichtig einordnen`.
- Nächster Schritt zeigt `Kurze Silbenwörter mit wählbarer Bildhilfe wiederholen.`
- Browser-Konsole: keine JavaScript-Fehler.

Hinweis: Der vorhandene Port `4173` war belegt und lieferte keine Antwort. Für den Check wurde deshalb ein separater lokaler Port `4192` verwendet und danach beendet.

## Datenschutz- und GE-Check

Bestanden:

- keine echten Schülernamen;
- keine personenbezogenen Eingaben;
- keine Cloud-Funktion;
- kein Export;
- keine Diagnosen;
- keine Noten, Rankings, Scores oder Timer;
- Beobachtung bleibt vorsichtig und ressourcenorientiert.

## Rest-Risiken

- Der Aufgabenweg zeigt weiterhin technische Task-IDs wie `a-mond`. Das ist anonym und stabil, könnte in einer späteren UX-Slice aber in lesbare Aufgabennamen übersetzt werden.
- Kein echter Tablet-Gerätetest, nur Build und lokaler Browserpfad.
