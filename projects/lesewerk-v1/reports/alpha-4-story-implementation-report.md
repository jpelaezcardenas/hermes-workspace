# LeseWerk Alpha 4 – Story-Modus und Inhaltspaket

Stand: 2026-05-16

## Kurzfazit

Alpha 4 Slice B hat den ersten echten Story-Modus in LeseWerk ergänzt. Die App enthält jetzt neben dem bestehenden Wort- und Silbenpfad einen eigenen Kinderpfad `Story lesen` mit fünf kurzen deutschen Mini-Lesegeschichten, Verständnisfrage, lokaler Symbolhilfe, reduzierbarer Auswahl und Lehrer-Evidenz.

Der bestehende Wort-/Aufgabenloop bleibt erhalten.

## Umgesetzte Story-Pfade

Implementiert wurden fünf Storys aus dem Didaktik-Blueprint:

1. `Der Ball im Garten`
2. `Mia sucht die Tasse`
3. `Die Sonne macht Licht`
4. `Lisa und die Maus`
5. `In der Schule ist Pause`

Jede Story enthält:

- Titel;
- kurzen Lesetext;
- Zielskill;
- lokale Symbolhilfe;
- Verständnisfrage;
- Zwei-Auswahl für reduzierte Auswahl;
- ruhiges Feedback;
- nächsten kleinen Lernschritt;
- sparsame Silbenstütze für Zielwörter.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
  - Story-Datenmodell und fünf Story-Pfade ergänzt.
  - `getStoryPaths()` ergänzt.
  - `getReducedStoryChoices()` ergänzt.
  - `recordLearningAction()` um Story-Evidenz erweitert.
  - `getTeacherSummary()` zeigt Story-Situation, Antwort und nächsten Schritt.

- `src/App.tsx`
  - Umschaltung `Wort üben` / `Story lesen` ergänzt.
  - Story-Auswahl und Story-Karte ergänzt.
  - Verständnisantworten werden in die Lernbeobachtung übernommen.
  - Lehrerbereich nutzt Story-Evidenz, ohne personenbezogene Daten zu verlangen.

- `src/styles.css`
  - Story-Karte, Story-Text, Antwortauswahl und Modus-Umschaltung gestaltet.
  - Tablet-freundliche Einspalten-Anpassung für Story-Antworten ergänzt.

- `tests/lesewerk-content.test.mjs`
  - Tests für Story-Anzahl, Metadaten, lokale Symbolhilfe und Datenschutz ergänzt.
  - Tests für reduzierte Story-Auswahl und Lehrer-Evidenz ergänzt.
  - Test ergänzt, dass Story-Modus den bestehenden Aufgabenloop nicht ersetzt.

## Verifikation

Von Hermes/Coder ausgeführt:

```bash
npm test -- tests/lesewerk-content.test.mjs
npm test
npm run build
```

Von Codex erneut geprüft:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 22/22 Tests bestanden.
- `npm run build`: erfolgreich.

## Browsercheck

Hermes/Coder öffnete den frischen lokalen Build über:

```bash
python3 -m http.server 4194 -d dist
```

Geprüft wurde:

- App öffnet lokal;
- Story-Modus ist erreichbar;
- `Der Ball im Garten` wird angezeigt;
- Antwort `Ball` führt zu ruhigem Feedback;
- Lehrerbereich zeigt Story-Evidenz, unter anderem `Story: Der Ball im Garten` und `Story gelesen; Antwort: Ball.`;
- Browser-Konsole ohne JavaScript-Fehler.

Der temporäre Server wurde danach beendet.

## Datenschutz und fachliche Grenzen

Bestanden:

- keine echten Schülerdaten;
- keine Logins;
- keine Cloud-Funktion;
- keine externen Bilddateien;
- keine geschützten Symbolsets;
- keine Diagnosen;
- keine Noten, Scores, Rankings oder Timer;
- keine Verbindung zur alten `ge-lernwerkstatt`.

## Rest-Risiken und Folgepunkte

- Kein echter Tablet-Gerätetest, nur lokaler Browserpfad und responsive Tests.
- Story-UI braucht in Slice C noch visuelle Feinarbeit: Fokus, Abstände, aktive Story, Feedback und Lehrerwechsel.
- Die Story-Menge ist bewusst klein: fünf hochwertige Pfade statt großer Platzhaltermenge. Mehr Umfang sollte erst nach Didaktik-Review und UI-Polish folgen.
- Lehrer-Evidenz ist sinnvoller geworden, aber noch kein vollständiger Förderplan.

## Entscheidung

Slice B ist nach Codex-Review akzeptiert. Der Block entstand durch Iterationslimit nach bereits erfolgreicher Umsetzung, nicht durch einen fachlichen oder technischen Fehler.
