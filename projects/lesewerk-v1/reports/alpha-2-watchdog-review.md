# LeseWerk Alpha 2 - Watchdog Review

Stand: 2026-05-16

## Kurzfazit

LeseWerk Alpha 2 ist als lokaler, eigenständiger App-Stand verifiziert. Die Alpha-2-Kette hat funktioniert: Didaktikbrief, Content-/Lernlogik-Slice, visueller Qualitäts-Slice und Watchdog wurden ausgeführt. Einige Worker liefen erneut ins Iterationslimit, aber die Ergebnisse waren verwertbar und wurden jeweils durch Codex nachverifiziert und abgeschlossen.

Entscheidung: **Alpha 2 ist bestanden. Weiterbauen.**

## Geprüfte Reports

- `reports/alpha-2-didaktik-task-quality.md`
- `reports/alpha-2-content-implementation-report.md`
- `reports/alpha-2-visual-quality-report.md`
- `reports/alpha-1-learning-loop-report.md`

## Technische Verifikation

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: erfolgreich, 12/12 Tests bestanden.
- `npm run build`: erfolgreich.

## Lokaler Browsercheck

Frischer lokaler Build geöffnet unter:

```text
http://127.0.0.1:4186/
```

## Kinderpfad

Getesteter Pfad:

1. App öffnen.
2. `Profil Grün` wählen.
3. `Bildhilfe` aktivieren.
4. Aufgabe abschließen.
5. Feedbackscreen erreichen.
6. `Weiter` wählen.
7. zweite Aufgabe abschließen.
8. `Fertig` wählen.
9. Abschluss erreichen.
10. `Zur Lehrkraft` wählen.

Ergebnis: bestanden.

## Lehrerpfad

Geprüft:

- anonymes Profil sichtbar;
- Aufgabenweg sichtbar;
- genutzte Hilfen sichtbar;
- neutrale Beobachtung sichtbar;
- grobe vorsichtige Einordnung sichtbar;
- Datenqualität sichtbar;
- nächster kleiner Lernschritt sichtbar;
- Reset-Button sichtbar und ausführbar.

Nach Reset:

- Profil steht wieder auf anonymem Standardprofil;
- Aufgabenweg zeigt `noch kein Aufgabenweg gespeichert`;
- Datenqualität zeigt `wenige Beobachtungen – nur vorsichtig einordnen`.

Ergebnis: bestanden.

## Datenschutz- und Grenzcheck

Bestanden:

- keine echten Schülernamen;
- keine Diagnosen;
- keine Noten;
- keine Rankings;
- kein Timer;
- kein Score;
- kein Login;
- keine Cloud;
- keine geschützten Assets;
- keine gespeicherten Zugangsdaten;
- kein Import oder Codebezug zu `ge-lernwerkstatt` im geprüften Bereich.

## Ergebnis der Alpha-2-Kette

Alpha 2 hat gegenüber Alpha 1 verbessert:

1. Didaktische Aufgabenqualität:
   - klarere Level-A/B/C-Logik;
   - mehr GE-/Unterstützungsbezug;
   - bessere Sprachregeln.

2. Content- und Lernlogik:
   - Aufgabenpool auf 24 Tasks erweitert;
   - interne Level bleiben kindneutral;
   - Support-Metadaten stabil;
   - Tests auf 11 und später 12 erweitert.

3. Visuelle Qualität:
   - ruhigerer Kopfbereich;
   - klarerer Lesefokus;
   - größere Touchziele;
   - Tablet-Breakpoint;
   - Feedback- und Abschlusskarten optisch verbessert.

4. Watchdog:
   - Tests, Build, Kinderpfad, Lehrerpfad und Grenzen verifiziert.

## Bekannte Restschwächen

- Bildhilfe ist weiterhin ein Textplatzhalter.
- Vorlesen ist weiterhin ein Platzhalter.
- Es gibt noch keine echten lokalen Symbol-/Bildassets.
- Tabletprüfung ist plausibilisiert, aber kein echter Geräte-Praxistest.
- Lehrerbereich ist brauchbar, aber noch kein echter Förderverlaufsbereich.
- Aufgaben sind Alpha-tauglich, aber noch kein vollständiges Unterrichtsmaterialpaket.

## Nächste empfohlene 3-Slice-Kette

### Alpha 3 Slice A: Lokale Bild-/Symbolhilfen

Ziel:
- sichere, lokale, nicht-personenbezogene Bild-/Symbolplatzhalter gestalten;
- keine geschützten Assets;
- keine externen Dienste;
- Bildhilfe soll kindseitig mehr leisten als Text.

### Alpha 3 Slice B: Vorlesen/Audio-Entscheidung

Ziel:
- klären, ob Vorlesen als Lehrkraft-Hinweis bleibt oder eine lokale Web-Speech-Demo sinnvoll ist;
- Datenschutz und Bedienbarkeit prüfen;
- keine Cloud-Audiofunktion.

### Alpha 3 Slice C: Lehrer-Förderverlauf

Ziel:
- Lehrerbereich stärker strukturieren nach:
  - Situation;
  - Hilfe;
  - Handlung;
  - Beobachtung;
  - nächster Schritt;
- keine Diagnose;
- keine echten Schülerdaten;
- keine Exportfunktion vor Datenschutzprüfung.

## Empfehlung

Der nächste Schritt sollte Alpha 3 nicht als Monster-Goal starten, sondern wieder als Long-Run Chain:

`Mission -> Bildhilfe-Slice -> Audio-Entscheidung-Slice -> Lehrer-Förderverlauf-Slice -> Watchdog`
