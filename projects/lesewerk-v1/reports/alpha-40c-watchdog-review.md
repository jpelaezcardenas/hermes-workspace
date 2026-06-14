# Alpha 40C Watchdog Review

## Ampel

Grün mit kleinem Hinweis: Die Alpha-40B-Erweiterung bleibt fachlich ruhig, fruehlese-tauglich und GE-passend. Ich sehe keinen Blocker; fuer Alpha 41 sollte der Fokus eher auf Klarheit der Reihenfolge und weiterer Ruhe im Kinderpfad liegen, nicht auf mehr Material.

## Kurzbeurteilung

Die neuen/ergänzten Leseangebote bleiben inhaltlich klein und passend begrenzt:

- kurze, bekannte Wörter
- bekannte Grapheme/Silben statt offener Wortmenge
- ruhige, klare Bild-Wort-Verknüpfung
- keine automatische Überladung des Kinderpfads
- keine Diagnose-, Score-, Timer-, Ranking-, Cloud-, Login- oder Exportlogik

Didaktisch wirkt die Erweiterung stimmig fuer fruehe Leseanlaesse im GE-Kontext: wenig Ablenkung, klare Wiederholung, gut beobachtbare Auswahlhandlungen.

## Belege

Pruefung vom aktuellen Stand:

- `npm test` → 141/141 bestanden
- `npm run build` → erfolgreich
- Live-Browser-Check im Desktop-Layout → App laedt, Kinderpfad und Lehrkraftbereich sind sichtbar, keine JS-Fehler, kein offensichtlicher horizontaler Overflow
- Responsive CSS-Pruefung → mehrere Breakpoints sind vorhanden, u. a. `@media (max-width: 1100px)`, `760px`, `640px`, `430px`; die Layouts brechen dort auf eine einspaltige oder reduzierte Struktur um

Zusatzbeobachtung zum Inhalt:

- Alpha-40B bietet nur vier neue, kommunikativ sinnvolle Woerter (`Ich`, `Da`, `Ja`, `Nein`)
- die Aufgaben bleiben profilgebunden
- der Standard-Tagespfad bleibt ruhig und kurz
- bekannte Safety-Regeln bleiben im Code und in den Tests sichtbar

## Restlücken

Keine fachliche Luecke, die einen Blocker rechtfertigt. Wenn Alpha 41 folgt, wuerde ich nur noch schauen auf:

- noch klarere visuelle Trennung zwischen Tagespfad und Lehrerbereich
- moeglichst kurze erste Orientierung im Kinderpfad
- eventuell noch bessere Lesbarkeit der neuen Kommunikationsworte in sehr kleinen Displays

## Alpha-41 Empfehlung

Alpha 41 sollte keine weitere inhaltliche Erweiterung der Wortmenge sein. Sinnvoller waere:

1. Orientierung im Kinderpfad weiter vereinfachen
2. Reihenfolge Bild → Silbe → Wort → Satz → Mini-Geschichte noch deutlicher machen
3. die neue Alpha-40B-Menge in ruhigen Wiederholungsformaten stabilisieren
4. nur dann neue Inhalte ergaenzen, wenn sie fachlich wirklich einen neuen Lernschritt bringen

## Fazit

Alpha 40C ist aus Watchdog-Sicht grün: fachlich passend, sicher begrenzt, ruhig genug fuer den GE-Start und ohne neue Risiko-Signale.
