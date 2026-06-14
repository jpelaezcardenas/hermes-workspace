# LeseWerk Alpha 2 – Content Implementation Report

Stand: 2026-05-16

## Kurzdiagnose

Alpha 1 hatte einen funktionierenden Kinder-Lernkreislauf, aber der Aufgabenpool war noch ein Alpha-Platzhalter mit 18 Aufgaben und unscharfer Trennung zwischen bildnaher Wortzuordnung, Silbenarbeit und Wortlesen. Alpha 2 schärft diese Lernlogik nach, ohne neue Datenflüsse, externe Assets oder Cloud-Funktionen einzuführen.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-2-content-implementation-report.md`

Konkrete Änderungen:

1. Aufgabenpool auf 24 sichere Aufgaben erweitert.
   - Level A intern: 8 bild- und wortnahe Zuordnungsaufgaben.
   - Level B intern: 8 klare Silbenaufgaben mit Silbentrennung.
   - Level C intern: 8 Wort-/Bild-Wort-Aufgaben mit kleinen Unterscheidungen.

2. Placeholder-Typen fachlich geglättet.
   - A nutzt `image-word-match`.
   - B nutzt `syllable-blend`.
   - C nutzt `word-picture-match`.

3. Kindtexte gekürzt und beruhigt.
   - Prompts bleiben kurz.
   - Keine Punkte, Noten, Rankings, Diagnosen, Timer oder Fehlerdruck in den geprüften Inhaltsdaten.

4. Interne Level bleiben in der App intern.
   - Die Kinderansicht zeigt nicht mehr `Leseweg A/B/C`.
   - Stattdessen zeigt sie kindnahe Labels: `Bild und Wort`, `Silben lesen`, `Wort lesen`.

5. Support-Logik bleibt stabil.
   - Bildhilfe, Silbenfarben, Vorlesen, Gebärden-Hinweis, Weniger Auswahl und Nochmal bleiben an allen Tasks vorhanden.
   - Reduzierte Auswahl zeigt weiterhin nur zwei sichtbare Aufgabenkarten und hält die aktive Aufgabe vorn.

## TDD / Teständerungen

Die Tests wurden zuerst auf Alpha-2-Erwartungen angepasst und vor der Implementierung ausgeführt. Der erste Lauf schlug erwartungsgemäß fehl, weil der alte Stand nur 18 Aufgaben enthielt und die Level-Typen noch nicht der neuen didaktischen Struktur entsprachen.

Ergänzte/aktualisierte Prüfungen:

- 24 Aufgaben insgesamt.
- Verteilung A/B/C = 8/8/8.
- didaktische Typen pro interner Stufe.
- Support-Metadaten an allen Aufgaben.
- reduzierte Auswahl.
- kindnahe Student-Labels ohne sichtbare Levelbuchstaben.
- keine Noten-/Ranking-/Diagnose-/Timer-/Fehlerdruck-Wörter in den geprüften Inhaltsdaten und sichtbaren App-Texten.

## Verifikation

Ausgeführt im Projektordner `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: erfolgreich, 11/11 Tests bestanden.
- `npm run build`: erfolgreich.

## Datenschutz und GE-Check

Bestanden im geänderten Codebereich:

- keine echten Schülernamen;
- keine Diagnosen;
- keine Noten oder Rankings;
- kein Timer/Score;
- keine Cloud-/Login-Funktion;
- keine geschützten externen Bilder oder Assets;
- lokale, anonyme Demo-Logik bleibt erhalten.

## Rest-Risiken

- Bildhilfen sind weiterhin Textplatzhalter, keine geprüften Symbol- oder Bildassets.
- Vorlesen bleibt ein Platzhalter, keine echte Audioausgabe.
- Keine Browser-/Tablet-Sichtprüfung in diesem Slice; geprüft wurden Tests und Build.
- Aufgabenqualität ist Alpha-2-tauglich, aber noch kein vollständiges Unterrichtsmaterialpaket.

## Nächster sinnvoller Schritt

Alpha 2 Slice C sollte eine visuelle/UX-Prüfung im Browser durchführen: Kinderpfad öffnen, Weniger-Auswahl-Flow testen, Feedbackschleife prüfen, schmale Breite ansehen und sicherstellen, dass die neuen 24 Aufgaben nicht zu viel Reizlast erzeugen.
