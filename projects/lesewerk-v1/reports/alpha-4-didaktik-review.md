# LeseWerk Alpha 4 – Didaktik-Review und Feinjustierung

Stand: 2026-05-16

## Kurzfazit

Alpha 4 ist fachlich als erster Story-Modus tragfähig. Die fünf Mini-Lesegeschichten sind kurz, deutsch, alltagsnah, ohne Baby-Sprache und mit klaren Verständnisfragen umgesetzt. Die App bleibt unterstützungsorientiert: keine Noten, keine Diagnosen, kein Zeitdruck, keine Rankings.

Entscheidung: **Slice D bestanden. Keine Codeänderung nötig.**  
Der Block entstand durch einen Hermes-Worker-Absturz/Auth-Fehler, nicht durch einen didaktischen Fehler.

## Geprüfte Grundlage

Geprüft wurden:

- `reports/alpha-4-story-didaktik-blueprint.md`
- `reports/alpha-4-story-implementation-report.md`
- `reports/alpha-4-story-ui-polish-report.md`
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`

## Didaktische Bewertung

### 1. Deutsche Lesedidaktik und GE-Passung

Bestanden.

Die Storys sind als Mini-Lesegeschichten passend für einen frühen Förderstand:

- kurze Hauptsätze;
- klare Alltagssituationen;
- ein begrenzter Fokus pro Story;
- wenige Figuren und Gegenstände;
- Verständnisfrage direkt aus dem Text beantwortbar;
- unterstützende Rückmeldung statt Bewertung.

Die Texte wirken nicht wie generische Fülltexte. Sie sind einfach, aber nicht lächerlich oder babyhaft.

### 2. Einfache Sprache

Bestanden mit kleinen späteren Verbesserungsoptionen.

Gute Beispiele:

- `Im Garten liegt ein Ball.`
- `Die Tasse steht auf dem Tisch.`
- `Die Sonne macht Licht.`
- `Es ist Pause.`

Die Sätze sind überwiegend direkt und konkret. Für Alpha 5 könnte man einzelne Texte noch stärker rhythmisch staffeln, etwa durch eine feste Struktur:

- Satz 1: Ort/Situation
- Satz 2: Handlung
- Satz 3: Verständnisanker

Das ist aber keine Blockade für Alpha 4.

### 3. Silbenfarben

Bestanden.

Die Silbenstütze wird sparsam als Zielwort-Hilfe eingesetzt und nicht über den gesamten Storytext gelegt. Das ist didaktisch sinnvoll: Silbenfarben bleiben eine Stütze, nicht der Hauptinhalt.

Positiv:

- `Tas` / `se`
- `Son` / `ne`
- `Pau` / `se`

Unkritisch:

- Einsilbige Wörter wie `Ball` oder `Maus` brauchen keine echte Silbentrennung, können aber als Fokuswort visuell hervorgehoben bleiben.

### 4. Verständnisfragen

Bestanden.

Die Fragen sind aus den Storys beantwortbar und keine Ratespiele:

- `Was liegt im Garten?` -> Ball
- `Wo steht die Tasse?` -> Tisch
- `Was macht die Sonne?` -> Licht
- `Wer läuft schnell?` -> Maus
- `Wann gehen Kinder auf den Hof?` -> Pause

Die reduzierte Zwei-Auswahl unterstützt Teilhabe. Sie macht die Aufgabe nicht bedeutungslos, weil die Antwort weiterhin aus dem gelesenen Text abgeleitet werden muss.

### 5. Feedback und Kinderschutz

Bestanden.

Die Rückmeldungen sind ruhig und nicht beschämend:

- `Du hast den Ort gut gefunden.`
- `Du hast den Satz gut verstanden.`
- `Du hast genau gelesen.`
- `Du hast den Alltagstext gut gelesen.`

Keine problematischen Muster gefunden:

- keine Notensprache;
- kein Fehler-/Schamfokus;
- kein Ranking;
- kein Timer;
- keine Diagnose.

### 6. Lehrer-Evidenz

Bestanden als Alpha-4-Niveau.

Die Lehrkraft erhält jetzt sinnvolle Story-Evidenz:

- Storytitel;
- genutzte Hilfen;
- Antwort;
- Beobachtung zum Story-Verstehen;
- nächster kleiner Schritt.

Wichtig: Das ist weiterhin eine pädagogische Beobachtung, keine Diagnostik. Die Formulierungen bleiben vorsichtig genug.

## Sicherheits- und Asset-Check

Bestanden.

Keine Hinweise auf:

- externe Bild-URLs;
- geschützte Symbolsets;
- echte Schülerdaten;
- Login;
- Cloud-Funktion;
- Audio-/TTS-Cloud;
- METACOM-/Boardmaker-/Widgit-/ARASAAC-Nutzung.

Die Symbolhilfen bleiben lokale Platzhalter.

## Verifikation

Von Codex ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 22/22 Tests bestanden.
- `npm run build`: erfolgreich.

## Top-Verbesserungen für Alpha 5

1. Story-Umfang ausbauen, aber qualitätsgesichert: 12 bis 18 Storys in klaren Schwierigkeitsclustern statt viele Platzhalter.
2. Diagnostischen Einstieg verbessern: nicht nur Aufgaben/Storys anbieten, sondern aus ersten Antworten einen vorsichtigen Vorschlag für den nächsten Leseweg ableiten.
3. Lehreransicht lesbarer machen: technische IDs endgültig vermeiden, Story-/Aufgabennamen und Zielskill klarer darstellen.
4. UK-/Gebärden-Hinweise strukturieren: `Schau mal meine Haende an` als konkreten, passenden Hinweis pro Story/Schlüsselwort statt generischem Toggle.
5. Tablet-Test ernsthaft nachholen: echte kleine Breite, Touch-Ziele, Zeilenumbrüche und vertikale Höhe prüfen.

## Entscheidung

Alpha 4 Slice D ist fachlich bestanden. Der nächste Schritt ist der Alpha-4-Watchdog mit frischem Browsercheck, Datenschutzprüfung und Alpha-5-Vorschlag.
