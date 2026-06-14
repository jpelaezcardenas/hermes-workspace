# Alpha 57A – Tiny Child Practice Loop Spec

## Ergebnis in einem Satz
Der kleinste sinnvolle Praxisloop für den Kinderpfad ist ein sanfter „Nochmal“-Rücksprung auf denselben vorhandenen Leseschritt nach einer ersten Bearbeitung, ausgelöst über bereits existierende Abschluss-/Feedback-Wege, ohne neue Inhalte, ohne Zählung und ohne neuen Modus.

## Ausgangslage
- Der Kinderpfad ist im aktuellen Stand laut Alpha 56C ausreichend klar.
- Im Code gibt es bereits einen ruhigen Wechsel zwischen Aufgabe, Feedback und Abschluss.
- Es existiert bereits ein Wiederholungs-Impuls im System: `Nochmal` setzt `repeat: true` und führt zurück in den Aufgabenmodus.
- Damit ist kein neuer Lernpfad nötig, sondern nur ein sehr kleiner Nutzungsloop auf vorhandener Struktur.

## Empfohlener Loop

### Empfehlung
Ein optionaler, kurzer Wiederholungsloop nach einem abgeschlossenen Schritt:
1. Lernende Person bearbeitet einen vorhandenen Leseschritt.
2. Nach „Ich bin fertig“ oder nach dem ruhigen Feedback erscheint eine sehr kleine Wahl:
   - „Nochmal“
   - „Weiter“
   - „Fertig“
3. Wenn „Nochmal“ gewählt wird, bleibt die gleiche Aufgabe sichtbar oder wird derselbe Schritt mit gesetzter Wiederholungshilfe erneut angeboten.
4. Der Loop endet sofort, sobald „Weiter“ oder „Fertig“ gewählt wird.

### Warum dieser Loop passt
- Er nutzt vorhandene Sprache und vorhandene Zustände.
- Er erweitert nicht den Inhalt, sondern nur die Nutzung.
- Er ist ruhig, kurz und verständlich.
- Er unterstützt Wiederholung ohne Leistungsdruck.
- Er bleibt optional und blockiert den normalen Ablauf nicht.

## Exakte kindgerechte Kopie

### Button-/Wahltexte
- „Nochmal“
- „Weiter“
- „Fertig“

### Kurzer Begleitsatz
- „Du kannst es noch einmal lesen.“
- „Du darfst weitergehen.“
- „Du bist fertig.“

### Was nicht dazu kommen soll
- Keine längeren Erklärtexte.
- Keine Symbole mit Bewertung.
- Keine Hinweise wie „zu schwer“ oder „falsch“.
- Kein Fortschrittsbalken, keine Punkte, keine Sterne.

## UI-Grenzen
- Der Loop darf nur im bestehenden Kinderpfad erscheinen.
- Er darf nur nach einer bereits abgeschlossenen Aufgabe / einem abgeschlossenen Leseschritt angeboten werden.
- Maximal drei klare Wahlmöglichkeiten.
- Kein neuer Hauptmodus.
- Kein zusätzlicher Inhaltsspeicher.
- Kein automatischer Loop, der die Lernende Person festhält.
- Der bisherige Lehrerblick und die Lehrerreview-Funktion bleiben unverändert.

## Rejected alternatives

### 1. Neuer Übungsmodus
Abgelehnt, weil das eine neue Komplexitätsebene erzeugen würde und dem Ziel „klein, ruhig, optional“ widerspricht.

### 2. Mehrere Wiederholungsstufen oder Level
Abgelehnt, weil Levellogik schnell wie Bewertung wirkt und den Fokus von der eigentlichen Lesehandlung wegzieht.

### 3. Timer / Countdown
Abgelehnt, weil Zeitdruck nicht zur ruhigen GE-Nutzung passt.

### 4. Punktesystem / Erfolgsscore
Abgelehnt, weil es in Richtung Leistungsmessung kippt und kein pädagogischer Gewinn für diesen Schritt sichtbar ist.

### 5. Neue Inhalte oder zusätzliche Karten
Abgelehnt, weil Alpha 57A ausdrücklich keine Content-Erweiterung soll.

## Sicherheit und pädagogische Leitplanken
- Keine Diagnosebegriffe.
- Keine Defizitsprache.
- Keine verdeckte Bewertung.
- Keine Speicherung personenbezogener Daten.
- Kein Zwang zur Wiederholung.
- Kein Abbruchfehler, wenn „Nochmal“ nicht genutzt wird.
- Der Loop soll beruhigen, nicht stimulieren.

## Einordnung für Alpha 57B
### Empfehlung für Alpha 57B: Code-Implementierung, aber nur als Mini-Patch
Alpha 57B sollte nicht noch einmal eine neue Planung schreiben, sondern den Loop als kleinen Code-Patch umsetzen, wenn der Spec so bestätigt wird.

### Scope für Alpha 57B
- Bestehende Feedback-/Abschlusslogik im Kinderpfad prüfen.
- Den vorhandenen „Nochmal“-Pfad sichtbar und eindeutig nutzbar machen, falls er im UI noch nicht klar genug erscheint.
- Nur vorhandene Texte und vorhandene Zustände verwenden.
- Nur kleine, ruhige UI-Ergänzung, keine neue Navigation.
- Anschließend Smoke-Checks im Kinderpfad.

### Nicht in Alpha 57B
- Kein Content-Pack.
- Keine neuen Lehrerfunktionen.
- Kein neuer Datenspeicher.
- Keine komplexen Verzweigungen.
- Keine zusätzliche Auswertung.

## Acceptance Criteria
- Nach einem abgeschlossenen Leseschritt gibt es eine kleine, ruhige Wiederholungsoption.
- „Nochmal“ führt ohne Umweg zurück in denselben lesebezogenen Ablauf bzw. setzt die Wiederholungshilfe.
- „Weiter“ und „Fertig“ funktionieren weiterhin wie vorgesehen.
- Der normale Kinderpfad bleibt kurz, klar und überladenfrei.
- Der Lehrerbereich bleibt unverändert.

## Tests und Smoke Checks

### Fachliche Smoke Checks
- Kinderpfad öffnen und einen vorhandenen Leseschritt starten.
- Einen Schritt abschließen.
- Prüfen, ob die kleine Wiederholungswahl sichtbar und verständlich ist.
- „Nochmal“ wählen und prüfen, ob derselbe ruhige Schritt wieder aufgerufen wird.
- „Weiter“ wählen und prüfen, ob der Ablauf normal fortgesetzt wird.
- „Fertig“ wählen und prüfen, ob der Abschluss weiterhin ruhig endet.

### Technische Checks
- Bestehende Tests weiterlaufen lassen, besonders UI-/Flow-Tests für den Kinderpfad.
- Prüfen, dass keine neue Komplexität im Lehrerbereich auftaucht.
- Prüfen, dass kein neuer Speicher-/Export-/Login-Pfad entstanden ist.

## Was ausdrücklich nicht hinzugefügt werden darf
- Score, Punkte, Ranking, Prozent, Level, Diagnose.
- Neue Lerninhalte.
- Zeitdruck oder Countdown.
- Zusätzliche Modalitäten oder komplexe Umschaltungen.
- Cloud, Login, Upload, Export.
- Personenbezogene Daten.

## Fazit
Der sinnvollste nächste Schritt ist kein neuer Lerninhalt, sondern ein minimaler Wiederholungsloop auf Basis der vorhandenen „Nochmal“-Logik. Das ist klein genug für GE-Praxis, klar genug für Kinder und sicher genug für den aktuellen Stand des Projekts.