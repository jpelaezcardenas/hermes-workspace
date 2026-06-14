# Alpha 41A – Orientierung und Leseprogression Audit

## Kurzfazit

Der aktuelle Stand ist fachlich ruhig und GE-passend, aber die Orientierung ist noch nicht überall gleich sichtbar. Die Leseprogression ist vorhanden, wird im Kinderpfad aber teilweise eher mitgedacht als klar geführt. Für Alpha 41 sollte deshalb nicht mehr Inhalt entstehen, sondern ein einzelner, gut sichtbarer Orientierungsschritt.

## Audit: Orientierung

### Kinderorientierung

Stärken:
- Der Kinderpfad startet ruhig und ohne Druck.
- Die Reihenfolge Bild → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke ist im Material bereits angelegt.
- Der Browser-Stand zeigt eine klare Tagespfad-Orientierung mit kurzer Schrittanzeige und kindgerechter Leseleiter.

Schwächen:
- Die Progression ist für das Kind nicht an jeder Stelle sofort visuell greifbar.
- Der erste Blick zeigt mehrere Ebenen gleichzeitig: Tagespfad, Leseleiter, Profilwahl, Hilfen und Lehrkraftbezug.
- Der Einstieg ist ruhig, aber noch nicht eindeutig genug als „Hier geht es los, dann geht es so weiter“.

### Lehrerorientierung

Stärken:
- Lehrerbereich, Lernstart-Check, Profilvorschau und Tagesweg sind klar getrennt.
- Die Planungslogik bleibt lokal, anonym und ohne automatische Übernahme aus der Lehrkraftvorschau.
- Der Lehrerbereich bietet ausreichend Orientierung für Planung und Beobachtung.

Schwächen:
- Die Lehrkraft muss die didaktische Reihenfolge an mehreren Stellen zusammensetzen.
- Die Progression ist in Texten und Hilfen vorhanden, aber nicht als ein einziges, leicht überblickbares Orientierungsobjekt verdichtet.

## Audit: Didaktische Progression

### Wo die Progression sichtbar ist

- `getChildOrientationSteps()` bildet die Abfolge Bild/Symbol → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke ab.
- `getGuidedReadingChain()` macht die Lernfolge in der Praxis konkret, z. B. mit „Bild“, „Silbe“, „Wort“, „Satz“, „Mini-Geschichte“, „Schreibbrücke“.
- Die Leseleiter im Kinderpfad zeigt die Reihenfolge ebenfalls an.
- Der Browser-Check bestätigt, dass diese Struktur im aktuellen Build sichtbar ist.

### Wo die Progression abgeschwächt wird

- Die Progression steckt an mehreren Stellen in Text, Hilfen und Karten, statt an einer zentralen Stelle verdichtet zu sein.
- Der Tagespfad arbeitet mit Karten und Storys, aber der Übergang vom Bild zum Satz ist nicht als „eine Linie“ sofort erkennbar.
- Die Reihenfolge ist fachlich korrekt, aber visuell noch etwas verteilt.

## Alpha 40B im Progressionskontext

Die vier Alpha-40B-Wörter (`Ich`, `Da`, `Ja`, `Nein`) sind pädagogisch sinnvoll, aber eher als kleiner Kommunikationsbaustein als als Teil des Default-Kinderpfads.

Einordnung:
- Sie passen gut als kurze, frühe Auswahlwörter.
- Sie sind sinnvoll für unterstützte Kommunikation und erste sichere Auswahlhandlungen.
- Sie sollten nicht den Standardpfad überladen oder die Leseprogression vom Bild/Silbe/Wort/Satz/Mini-Geschichte ablenken.

Fazit dazu:
- Ja, die Wörter sind nützlich.
- Nein, sie sollten nicht die sichtbare Grundlogik des Kinderpfads bestimmen.
- Am besten bleiben sie profilgebunden und ergänzend.

## Konkrete Stelle, an der die App die Progression noch versteckt

1. Die Reihenfolge ist vorhanden, aber nicht stark genug als eine einzige visuelle Orientierungslinie verdichtet.
2. Der Kinderpfad zeigt mehrere Orientierungshilfen parallel, statt einen klaren „Start → nächster Schritt → Ende“-Bogen.
3. Die Alpha-40B-Wörter sind fachlich korrekt eingebunden, aber als eigener Mini-Baustein neben der Hauptprogression, nicht als sichtbarer Teil davon.

## Mini-Audit der aktuellen Logik

Getestet und geprüft:
- `npm test` → erfolgreich
- `npm run build` → erfolgreich
- Browser-Sicht auf `dist` → App lädt, Kinderpfad und Lehrerbereich sind sichtbar, keine JS-Fehler im groben Check

Beobachtung aus dem Lauf:
- Die Leseleiter ist bereits da und benennbar.
- Der Kinderpfad bleibt ruhig und kurz.
- Die Progression wirkt didaktisch tragfähig, aber noch etwas verteilt im UI.

## Was ich nicht ändern würde

- Keine zusätzliche Wortmenge.
- Kein automatisches Umschalten aus der Lehreransicht in den Kinderpfad.
- Keine Scores, Timer, Ranking- oder Drucklogik.
- Keine weiteren Vergleichs- oder Auswahlreihen, die den Kinderstart unruhiger machen.

## Alpha 41B Empfehlung: genau ein umsetzbarer Schritt

Ein einziger, sinnvoller Schritt wäre:

Eine feste, gut sichtbare Progressionsleiste im Kinderpfad, die immer die gleiche Reihenfolge zeigt: Bild → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke.

Warum genau dieser Schritt:
- Er macht die bestehende Progression sichtbarer, ohne neue Inhalte einzuführen.
- Er hilft sowohl Kindern als auch Lehrkräften bei der Orientierung.
- Er passt zur ruhigen, kurzen Grundlogik des aktuellen Stands.
- Er verändert den Default-Pfad nicht inhaltlich, sondern nur in der Klarheit.

## Schlussbewertung

Der Stand ist fachlich grün, aber die Orientierung kann noch klarer werden. Alpha 41 sollte nicht mehr lesen lassen, sondern besser sichtbar machen, wohin das Lesen führt.
