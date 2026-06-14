# LeseWerk Alpha 4 – Watchdog Review und Alpha 5 Vorschlag

Stand: 2026-05-16

## Kurzfazit

Alpha 4 ist als lokaler App-Stand bestanden. Der neue Story-Modus ist vorhanden, fachlich plausibel, technisch stabil und bleibt innerhalb der Datenschutz- und Asset-Grenzen.

Entscheidung: **Alpha 4 bestanden. Weiterbauen.**  
Der abschließende Hermes-Watchdog stoppte durch Iterationslimit nach erfolgreicher Prüfung; Codex hat Tests, Build und Abschlussbericht ergänzt.

## Geprüfte Reports

- `reports/alpha-4-story-didaktik-blueprint.md`
- `reports/alpha-4-story-implementation-report.md`
- `reports/alpha-4-story-ui-polish-report.md`
- `reports/alpha-4-didaktik-review.md`
- `reports/alpha-3-watchdog-review.md`

## Technische Verifikation

Von Neva ausgeführt:

```bash
npm test
npm run build
```

Von Codex erneut ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 22/22 Tests bestanden.
- `npm run build`: erfolgreich.

## Frischer Browsercheck

Neva öffnete einen frischen lokalen Build:

```text
http://127.0.0.1:4196/
```

Geprüfter Kinderpfad:

1. Profil Grün gewählt.
2. Story-Modus aktiviert.
3. Bildhilfe aktiviert.
4. Weniger Auswahl aktiviert.
5. Silbenfarben aktiv gelassen.
6. Story `Der Ball im Garten` geöffnet.
7. Lokale Symbolhilfe sichtbar: `Ball auf Gras`, `lokale Symbolhilfe`.
8. Silbenstütze sichtbar: `Ball`.
9. Verständnisfrage sichtbar: `Was liegt im Garten?`
10. Antwortoptionen sichtbar: `Ball` / `Bus`.
11. Antwort `Ball` führte zur Feedbackphase.
12. Ruhiges Feedback sichtbar: `Gut gelesen.` und `Du hast ruhig gearbeitet. Was möchtest du jetzt?`
13. Storyfeedback sichtbar: `Du hast die wichtige Sache erkannt.`

Browser-Konsole:

- keine JavaScript-Fehler beobachtet.

## Lehrerpfad

Nach der Storyantwort zeigte der Lehrerbereich:

- Profil: `Profil Grün`
- Datenqualität: `eine Beobachtung – nur vorsichtig einordnen`
- Situation: `Story: Der Ball im Garten`
- Hilfe: `Bildhilfe, Silbenfarben, Weniger Auswahl`
- Handlung: `Story gelesen; Antwort: Ball.`
- Beobachtung: `Story-Verstehen wurde mit kurzer Auswahlhilfe beobachtet.`
- Nächster Schritt: `Gleiche Satzstruktur mit einem anderen Gegenstand wiederholen.`
- Hinweis: anonym, lokal, bewertungsfrei und ressourcenorientiert

Reset wurde geprüft:

- Nach Reset wieder `Profil Blau`.
- Datenqualität: `noch keine Beobachtung – nur vorbereitende Ansicht`.
- Situation: `Aufgabenweg: noch kein Aufgabenweg gespeichert`.
- Handlung: `Noch keine Aufgabe bearbeitet.`

## Sicherheits- und Datenschutzprüfung

Bestanden:

- keine echten Schülerdaten;
- keine personenbezogenen Eingaben;
- kein Login;
- keine Cloud-Funktion;
- keine externen Bild-, Symbol- oder Audiodienste;
- keine geschützten Symbolsets wie METACOM, Boardmaker, Widgit oder ARASAAC;
- keine Diagnosen;
- keine Noten;
- keine Rankings;
- keine Scores;
- kein Timer;
- keine scham- oder druckvolle Rückmeldung;
- keine `ge-lernwerkstatt`-Dependency im `package.json`.

Hinweis: Suchtreffer wie `diagnostic-card`, `Name` in technischen Kontexten oder Testbegriffe sind keine sichtbare problematische Produktlogik.

## Kleine Risiken

- Kein echter Tablet-Gerätetest, nur lokaler Browser-/Responsive-Kontext.
- Der `Fertig`-Klick wirkte im Browser-Automationstest einmal nicht sichtbar; per direkter DOM-Auslösung wurde die Feedbackauswahl bestätigt. Das ist kein harter Blocker, sollte aber bei manueller Sichtprüfung erneut getestet werden.
- Die Symbolhilfen sind weiterhin lokale Platzhalter, keine fachlich geprüfte UK-Symbolbibliothek.
- Der Storyumfang ist mit fünf Geschichten sinnvoll klein, aber noch nicht pilotreich.

## Alpha-5-Vorschlag

### Slice A: Diagnostischer Einstieg und adaptive Platzierung

Ziel:
Aus den ersten 2–3 Aufgaben/Storyantworten soll die App vorsichtig einen passenden nächsten Leseweg vorschlagen.

Akzeptanzkriterien:

- kein Score, keine Note, keine Diagnose;
- Formulierung als Vorschlag: `Heute passt vermutlich ...`;
- Pfade: Wort/Bild, Silbe/Wort, Story/Verstehen;
- Lehrerbereich zeigt, warum der Vorschlag entstanden ist;
- Tests sichern ab, dass keine Bewertungslogik entsteht.

### Slice B: Storyumfang qualitätsgesichert ausbauen

Ziel:
Story-Paket von 5 auf 12–18 gute Mini-Lesegeschichten erweitern.

Akzeptanzkriterien:

- klare Schwierigkeitscluster;
- jede Story mit Zielskill, Text, Verständnisfrage, Symbolhilfe, reduzierter Auswahl, Feedback, nächstem Schritt;
- keine generischen Fülltexte;
- deutsche einfache Sprache;
- Datenschutz-/Asset-Tests erweitert.

### Slice C: UK-/Gebärden-Unterstützung konkretisieren

Ziel:
`Schau mal meine Haende an` soll nicht nur ein generischer Toggle sein, sondern pro Story/Schlüsselwort einen konkreteren Hinweis bekommen.

Akzeptanzkriterien:

- keine geschützten Gebärdenbilder;
- nur textbasierte, sichere Hinweise;
- klare Trennung: Gebärden-Hinweis unterstützt, ersetzt aber nicht Lesen;
- Lehrerbereich dokumentiert, wenn der Hinweis genutzt wurde.

### Slice D: Manuelle Pilot-Sichtprüfung und Tablet-Check

Ziel:
Die App auf einem kleinen Viewport und im realistischen Kinderfluss prüfen.

Akzeptanzkriterien:

- Storypfad komplett manuell durchgeklickt;
- `Fertig`, `Nochmal`, `Leichter`, `Weiter`, `Zur Lehrkraft`, Reset geprüft;
- keine Überlappungen;
- Bericht mit Screens/Beobachtungen oder klaren Notizen.

### Slice E: Alpha-5-Watchdog

Ziel:
Tests, Build, Datenschutz, Browserpfade und fachliche Grenzen erneut prüfen.

Entscheidung:
Alpha 5 erst akzeptieren, wenn Diagnose-/Adaptionslogik nicht in Bewertungssprache kippt.

## Entscheidung

Alpha 4 kann als abgeschlossener Zwischenstand gelten. Der nächste sinnvolle Schritt ist Alpha 5 mit vorsichtiger adaptiver Platzierung, mehr Storyqualität und konkreteren UK-/Gebärden-Hinweisen.
