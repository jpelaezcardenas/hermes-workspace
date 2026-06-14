# Alpha 53A – Teacher Review Polish Spec

## Current assessment

Der Block „Review vorhandener Wortfamilien“ ist bereits fachlich auf dem richtigen Kurs: Er bleibt rein lehrkraftbezogen, ist lesend, lokal gedacht und trennt sich klar vom Kinderpfad. Im aktuellen Stand wirkt die Karte aber noch etwas zu nah an einer kleinen Listen-/Werkzeugfläche; sie darf für Alpha 53B ruhiger, klarer und schneller scannbar werden, ohne in ein Dashboard oder eine Diagnoseansicht umzuschlagen.

### Was bereits gut ist
- klare Trennung zur Kinderansicht
- keine automatische Pfadmutation
- keine Speicherung, keine Scores, keine Ranking-Logik
- sprachlich schon deutsch und fachlich zurückhaltend
- zwei vorhandene Wortfamilien als kleine, begrenzte Sichtung

### Was noch poliert werden darf
- die Kopfhierarchie ist noch etwas gleichförmig
- die Review-Zeilen wirken funktional, aber noch nicht ganz „unterrichtsruhig“
- die manuelle Rolle der Lehrkraft könnte visuell noch klarer und freundlicher sein
- die Karte braucht etwas mehr Luft und bessere Lesbarkeit auf engem Bildschirm

## Risiken

1. Zu viel visuelle Veredelung könnte die ruhige Lehrkraftfunktion in Richtung Analyse- oder Verwaltungsoberfläche verschieben.
2. Zusätzliche Texte oder neue Kennzahlen würden den Block sofort schwerer und technischer machen.
3. Eine zu starke Verdichtung der Review-Zeilen könnte die Lesbarkeit auf kleinen Displays verschlechtern.
4. Jede Form von interaktiver Auswahl in diesem Block würde die Grenze zum Kindermodus oder zu einer Steuerungsansicht unnötig verwischen.

## Exakte UI-Copy-Grenzen

Diese Copy darf bleiben, allenfalls minimal geglättet werden:
- Titel: „Review vorhandener Wortfamilien“
- Einleitung: sinngemäß „Vorhandene Wortfamilien sichten, manuell vergleichen und als ruhiger Anschluss vormerken. Der Kinderpfad bleibt unverändert.“
- Zeilenmarker: „nur sichten · manuell“
- Fußhinweis: sinngemäß „Nur Sichtung und Vorbereitung: keine Speicherung, keine automatische Auswahl und kein neuer Kindermodus.“

Diese Copy darf nicht ergänzt werden durch:
- Kennzahlen, Prozentwerte, Scores oder Rangfolgen
- technische Statussprache wie „read-only“ oder „Pipeline“
- Formulierungen mit Diagnose-, Fehler- oder Defizitton
- Aufforderungen zur automatischen Übernahme in den Tagesweg
- neue Untertitel, die den Block wie ein Dashboard wirken lassen

## Alpha 53B – präziser Politurauftrag

Die nächste Version soll nur die bestehende Karte glätten. Erlaubt sind ausschließlich kleine Eingriffe in:
- Abstände und Gruppenbildung
- Zeilenhierarchie
- Schriftgewicht und Lesbarkeit
- ruhige Statusmarken
- Fokus- und Hover-Zustände für Bedienbarkeit
- Responsive Verhalten auf kleinen Bildschirmen

Nicht erlaubt sind:
- neue Inhalte
- neue Wortfamilien
- neue Funktionen
- neue Auswertungen
- automatische Empfehlungen
- Speicherlogik
- Kindermodus-Erweiterungen

## CSS-/Layout-Zielbild

Die Karte soll wie eine ruhige, fachliche Sichtungsfläche wirken, nicht wie ein Analyse-Dashboard.

### Erwartete Gestaltungsprinzipien
- etwas mehr Innenabstand in der Karte als in den Zeilen
- klare Trennung zwischen Einleitung und Review-Liste
- Review-Zeilen mit ruhiger, stabiler Blockstruktur
- aufgeräumte Typografie, damit Wort, Kontext und Hinweis leicht unterscheidbar bleiben
- auf kleinen Displays weiterhin ohne horizontales Scrollen

### Konkrete Gestaltungsgrenzen
- die Karte bleibt flächig und sachlich
- keine auffälligen Warnfarben
- keine Badge- oder Chip-Überladung
- keine Diagramme, Balken, Zähler oder Ampelkomplexität
- keine Animationen, die Aufmerksamkeit binden

## Interaktions-Akzeptanzkriterien für Alpha 53B

1. Die Review-Karte bleibt nicht klickbar im Sinne einer Auswahl- oder Bearbeitungsoberfläche; sie dient nur dem Sichten.
2. Fokuszustände müssen für Tastaturbedienung sauber sichtbar sein, aber nicht laut.
3. Die Review-Zeilen dürfen visuell hervorgehoben sein, ohne sich wie Buttons anzufühlen.
4. Die Karte muss auf Desktop und Mobile ruhig lesbar bleiben.
5. Der Kinderpfad bleibt funktional und visuell unverändert.
6. Der Block bleibt frei von jeder Form automatischer Übernahme, Speicherung oder Verzweigung.

## Accessibility-Smoke-Check für Alpha 53B

Beim Gegencheck muss erfüllt sein:
- Überschrift und Einleitung sind klar als Lehrkraftkontext erkennbar
- die Review-Liste ist als Gruppe verständlich
- Wort, Titel, Kettenlabel und Lehrkrafthinweis lassen sich schnell unterscheiden
- Kontrast bleibt im ruhigen Arbeitsmodus ausreichend
- Fokus ist sichtbar, wenn ein Element per Tastatur erreichbar ist
- auf schmalem Screen kein Überlaufen oder unlesbarer Zeilenbruch
- keine unnötigen, sich wiederholenden ARIA-Ansagen
- keine Verwirrung zwischen Sichtung und aktiver Bearbeitung

## Acceptance Criteria für Alpha 53B

Alpha 53B ist erfolgreich, wenn:
- die bestehende Review-Karte visuell ruhiger und klarer wirkt
- die Lesbarkeit der vorhandenen Wortfamilien verbessert ist
- die Lehrkraftrolle sofort verständlich bleibt
- keine neuen Inhalte oder Funktionen hinzugekommen sind
- der Kinderpfad unverändert bleibt
- das Layout ohne horizontales Scrollen sauber funktioniert
- die Karte professionell, aber nicht technisch kalt wirkt

## Acceptance Criteria für Alpha 53C

Alpha 53C soll eine knappe Validierung sein. Sie ist erfolgreich, wenn:
- die polierte Review-Karte in der App optisch und sprachlich ruhig bleibt
- Desktop- und Mobile-Check unauffällig bestehen
- Tastatur- und Fokusprüfung keine Brüche zeigt
- der Block weiterhin nur Sichtung, nicht Steuerung ist
- keine Überladung durch weitere Labels, Icons oder Kennzahlen entstanden ist
- der Kinderpfad weiterhin vollständig getrennt bleibt

## Was ausdrücklich nicht hinzugefügt werden darf

- neue Wortfamilien
- automatisches Sortieren oder Filtern
- Review-Status, Fortschrittsbalken oder Tageszielanzeigen
- Diagnose-, Score-, Level- oder Timer-Elemente
- Upload, Export, Login, Cloud oder Persistenz
- kindgerichtete Interaktion innerhalb der Review-Karte
- externe Symbol- oder Bildassets
- automatische Mutationen des Tageswegs oder Kinderpfads

## Kurzfazit

Für Alpha 53B ist der beste nächste Schritt eine sehr sparsame Politur: ruhiger, klarer, lesbarer, barriereärmer. Der Block ist fachlich klein genug, um bewusst klein zu bleiben. Genau diese Beschränkung ist hier die Qualität.
