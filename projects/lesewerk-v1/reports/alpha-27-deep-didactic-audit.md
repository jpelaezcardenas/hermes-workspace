# Alpha 27 Deep Didactic Audit

## Kurzfazit
LeseWerk Alpha 27B erweitert den lokalen Prototypen um eine Entwicklungslandkarte für Lesen und erste Schreibanschlüsse. Die unteren Zugänge werden ausdrücklich als Lesen verstanden: Bild, lokales Symbol, Geste und Ganzwort sind keine Vorstufe mit Defizitlogik, sondern ein eigener präliteral-symbolischer und logographischer Zugang.

## Didaktische Grundlage
- Lesen wird mehrdimensional modelliert: symbolischer Zugang, logographischer Zugang, Graphemwissen, Silbenlesen, Wortlesen, Satzlesen, Mini-Geschichte und Schreibbrücke.
- Phonologische Bewusstheit wird getrennt: weit (Rhythmus, Reim, Silbe) und eng (Anlaut, Lautfolge, Synthese).
- Schreiben wird nicht als Druckaufgabe ergänzt, sondern als optionale Brücke: Nachfahren, Anfang wählen, Silbe legen, Wort kopieren oder Satzrahmen.
- Die Angaben bleiben lokale Planungsunterstützung. Sie ersetzen keine Förderdiagnostik und behaupten keine Kompetenzstufe.

## Code-Umsetzung
- `developmentMapDimensions` beschreibt die lokalen Dimensionen.
- `getTaskDevelopmentProfile(taskId)` erzeugt für jede aktuell profilierte Aufgabe ein vollständiges Entwicklungsprofil.
- `getDevelopmentCoverageSummary()` fasst lokale Abdeckung, Leseschichten, phonologische Schwerpunkte und Schreibbrücken zusammen.
- `getWritingBridgeForTask(taskId)` liefert eine optionale, lokale und nicht bewertende Schreibbrücke.

## GE-Plausibilität
Stark ist die klare Weglogik Bild → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke. Die App bleibt ruhig, nutzt kurze Labels und hält Lehrkraftinformationen vom Kinderpfad getrennt. Grenzen bleiben: lokale Symbolkarten sind nur Platzhalter; die Passung muss in der realen Klasse weiter beobachtet werden.

## Risiken
- Einige Wörter mit abstrakterem oder visuell schwierigem Konzept brauchen bessere lokale oder lizenzierte Bildstützen.
- Komplexe Grapheme wie sch, ch, au und st bleiben lehrkraftgeführt zu prüfen.
- Die Entwicklungslandkarte darf nicht als Test oder Einstufung missverstanden werden.

## Nächste kleinste Aktion
Nach Browserprüfung: eine einzige Leseleiter-Interaktion mit einem Kind oder Testpiloten simulieren und prüfen, ob Bild/Silbe/Wort/Satz ohne Erklärung gefunden werden.
