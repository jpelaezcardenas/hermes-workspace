# LeseWerk Alpha 3 – Watchdog Review und Alpha 4 Vorschlag

Stand: 2026-05-16

## Kurzfazit

Alpha 3 ist als lokaler, eigenständiger App-Stand verifiziert. Die Kette aus Support-Qualitätsbrief, lokaler Symbolhilfe, bewusster Vorlesen-Entscheidung und Lehrer-Förderverlauf ist technisch und pädagogisch plausibel umgesetzt.

Entscheidung: **Alpha 3 bestanden. Weiterbauen, aber ohne neue Features in diesem Watchdog.**

## Geprüfte Reports

- `reports/alpha-3-support-quality-brief.md`
- `reports/alpha-3-local-symbol-help-report.md`
- `reports/alpha-3-audio-decision-report.md`
- `reports/alpha-3-teacher-support-history-report.md`
- `reports/alpha-2-watchdog-review.md`

## Technische Verifikation

Ausgeführt im Projektpfad `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: bestanden, 17/17 Tests erfolgreich.
- `npm run build`: erfolgreich (`tsc -b && node scripts/build.mjs`).

## Frischer lokaler Browsercheck

Frischer Build lokal geöffnet über:

```bash
python3 -m http.server 4193 -d dist
```

Geprüfte URL:

```text
http://127.0.0.1:4193/
```

Browser-Konsole:

- keine JavaScript-Fehler;
- keine Console-Warnungen oder Fehlermeldungen beobachtet.

## Kinderpfad: Bildhilfe und Vorlesen/Audio-Entscheidung

Getesteter Pfad:

1. App öffnen.
2. `Profil Grün` wählen.
3. `Bildhilfe` aktivieren.
4. `Vorlesen` aktivieren.
5. Aufgabe `Mond` im Kinderpfad prüfen.
6. `Ich bin fertig` wählen.
7. Feedbackscreen erreichen.
8. `Fertig` wählen.
9. Abschlussscreen erreichen.
10. `Zur Lehrkraft` wählen.

Beobachtet:

- aktive Hilfen zeigen `Bildhilfe`, `Silbenfarben`, `Vorlesen`.
- lokale Bildhilfe erscheint im Kinderpfad als Symbolkarte:
  - sichtbarer Cue: `◐`;
  - Text: `Mond am Himmel`;
  - Markierung: `lokale Symbolhilfe`;
  - Accessibility-Label: `Lokale Symbolhilfe: Mond am Himmel.`
- Vorlesen ist kein Audio-Feature, sondern bewusst ein Lehrkraft-Prompt:
  - `Lehrkraft liest bei Bedarf kurz vor. Danach liest du in Ruhe.`
- Feedback bleibt ruhig und ohne Druck:
  - `Gut gelesen.`
  - `Du hast ruhig gearbeitet. Was möchtest du jetzt?`
- Abschlussscreen ist erreichbar:
  - `Danke fürs Lesen.`
  - `Du hast dir Zeit genommen. Jetzt ist Pause.`

Ergebnis: bestanden.

## Lehrerpfad: Förderverlauf und Reset

Getesteter Pfad nach Kinderinteraktion:

1. In den Lehrerbereich wechseln.
2. Förderverlauf prüfen.
3. Reihenfolge prüfen: Situation -> Hilfe -> Handlung -> Beobachtung -> Nächster Schritt.
4. Lokalen Demo-Stand zurücksetzen.
5. Reset-Zustand prüfen.

Beobachtet vor Reset:

- Bereich: `Förderverlauf`.
- Profil: `Profil Grün`.
- Datenqualität: `eine Beobachtung – nur vorsichtig einordnen`.
- Situation: `Aufgabenweg: a-mond`.
- Hilfe: `Bildhilfe, Silbenfarben, Vorlesen`.
- Handlung: `Aufgabe bearbeitet; Auswahl danach: Fertig.`
- Beobachtung: `Mit visueller Struktur wird der Leseweg ruhiger angebahnt.`
- Nächster Schritt: `Kurze Silbenwörter mit wählbarer Bildhilfe wiederholen.`

Beobachtet nach Reset:

- Profil wieder `Profil Blau`.
- Datenqualität: `noch keine Beobachtung – nur vorbereitende Ansicht`.
- Situation: `Aufgabenweg: noch kein Aufgabenweg gespeichert`.
- Hilfe: `Silbenfarben` als lokaler Default.
- Handlung: `Noch keine Aufgabe bearbeitet.`

Ergebnis: bestanden.

## Datenschutz-, Asset- und Grenzcheck

Geprüft per Browserpfad, Code-/Content-Suche und vorhandenen Tests.

Bestanden:

- keine echten Schülernamen;
- keine personenbezogenen Eingaben;
- kein Login;
- keine Cloud-Funktion;
- keine externen Bild- oder Audiodienste;
- keine API-Keys;
- keine Fotos;
- keine geschützten Symbolsets wie METACOM, Boardmaker, Widgit oder ARASAAC;
- keine externen Bildassets in `src`;
- keine Diagnosen;
- keine Noten;
- kein Ranking;
- kein Score;
- kein Timer;
- keine scham- oder druckvolle Rückmeldung;
- kein Import, keine Dependency und kein Codebezug zu `ge-lernwerkstatt` im geprüften Codebereich.

Hinweis zur Begriffssuche:

- Treffer zu `diagnostic-card` in CSS/Komponenten sind technische Klassennamen aus dem UI-Code, keine sichtbare Diagnose- oder Bewertungslogik.
- Treffer zu `ge-lernwerkstatt` liegen nur in Reports/Planungsdokumenten, nicht im geprüften Codebereich.

## GE-/Unterrichtscheck

Stärken:

- Kinderfluss bleibt kurz, ruhig und handlungsorientiert.
- Bildhilfe ist jetzt mehr als ein Textplatzhalter und bleibt trotzdem lokal/rechtssicher.
- Vorlesen ist bewusst als Lehrkraft-Unterstützung formuliert, nicht als unfertige Audiofunktion.
- Lehrerbereich nutzt beobachtbare Kategorien statt Diagnose- oder Bewertungslogik.
- Reset ist möglich und hält die Demo lokal/anonym.

Schwächen / Rest-Risiken:

- Symbolkarten sind weiterhin Platzhalter, keine geprüfte UK-Symbolbibliothek.
- Kein echter Tablet-/Touch-Gerätetest; geprüft wurde lokaler Browserpfad.
- Aufgabenweg zeigt intern noch `a-mond`; pädagogisch unkritisch, aber für Team-/Lehrkraftlesbarkeit später verbesserbar.
- Beobachtung und nächster Schritt sind noch generisch; eine spätere Slice sollte sie stärker aus konkretem Aufgaben-/Hilfekontext ableiten.
- Kein Unterrichtsmaterialpaket, kein Ausdruck, keine Team-Dokumentation.

## Empfehlung: nächste 3-Slice-Kette Richtung Alpha 4

Alpha 4 sollte nicht als Monster-Goal gestartet werden. Sinnvoll ist eine kleine, überprüfbare Kette mit drei Slices plus Watchdog.

### Alpha 4 Slice A: Lehrerlesbarkeit und Aufgaben-Namen

Ziel:

- Interne Task-IDs wie `a-mond` im Lehrerbereich in lesbare Aufgabenbezeichnungen übersetzen.
- Situation soll für Lehrkräfte schneller verständlich sein, ohne neue personenbezogene Daten.

Akzeptanzkriterien:

- Lehrerbereich zeigt z. B. `Aufgabe: Mond – Bild und Wort` statt nur `a-mond`.
- Tests sichern ab, dass keine echten Namen, Diagnosen, Scores oder Rankings erscheinen.
- Build und Browserpfad bestehen.

### Alpha 4 Slice B: Kontextsensibler nächster Schritt

Ziel:

- Der nächste Schritt soll stärker aus Aufgabe, Hilfe und Wahlverlauf entstehen.
- Beispiel: Bei Bildhilfe + Vorlesen + Fertig wird ein anderer nächster Schritt formuliert als bei Nochmal oder reduzierter Auswahl.

Akzeptanzkriterien:

- Mindestens drei sichere, vorsichtige nächste-Schritt-Varianten.
- Keine Fähigkeitsetiketten, keine Diagnosen, keine Defizit-Sprache.
- Tests für Hilfe-/Choice-Kombinationen.

### Alpha 4 Slice C: Druckbares Team-Kurzprotokoll ohne Exportfunktion

Ziel:

- Eine einfache, lokale, kopierbare Team-Zusammenfassung im Lehrerbereich anzeigen.
- Noch kein Datei-Export, keine Cloud, keine Speicherung über Local State hinaus.

Akzeptanzkriterien:

- Struktur: Situation, genutzte Hilfe, beobachtete Handlung, vorsichtige Beobachtung, nächster Schritt.
- Copy-/Print-freundliche Darstellung ohne personenbezogene Eingabefelder.
- Datenschutztext sichtbar: anonym, lokal, keine Diagnose.
- Browsercheck mit Reset.

### Alpha 4 Watchdog

Nach den drei Slices:

- `npm test`;
- `npm run build`;
- frischen lokalen Build öffnen;
- Kinderpfad mit Bildhilfe/Vorlesen prüfen;
- Lehrerpfad mit lesbarer Situation, kontextsensitivem nächsten Schritt und Team-Kurzprotokoll prüfen;
- Datenschutz-/Asset-/ge-lernwerkstatt-Grenzcheck wiederholen.

## Nächste kleinste Aktion

Starte Alpha 4 mit Slice A:

```text
Implementiere im LeseWerk Alpha 4 Slice A nur die Lehrerlesbarkeit der Aufgaben-Situation: interne Task-IDs im Lehrerbereich in sichere, lesbare Aufgabenbezeichnungen übersetzen. Keine neuen Features, kein Export, keine personenbezogenen Daten. Akzeptanz: Tests, Build, Browserpfad Lehrerbereich nach einer Kinderaufgabe.
```
