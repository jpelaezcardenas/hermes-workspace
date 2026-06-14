# Alpha 27 Implementation Report

## Geänderte Artefakte
- `src/lesewerk-content.mjs`: Entwicklungslandkarte, vollständige Entwicklungsprofile für die 28 profilierten Aufgaben, Coverage-Summary, Symbol-Readiness und optionale Schreibbrücke ergänzt.
- `src/App.tsx`: Kinderpfad um Leseleiter „Heute lesen wir so“ und optionale Schreibbrücke erweitert.
- `src/styles.css`: responsive Leseleiter- und Schreibbrücken-Stile ergänzt.
- `tests/lesewerk-content.test.mjs`: Alpha-27-Tests für Entwicklungsprofil, Asset-Sicherheit, Leseleiter und Schreibbrücke ergänzt.
- `reports/alpha-27-*.md`: Didaktik-, Symbol-, Implementations- und Watchdog-Berichte erstellt.

## Fachliche Entscheidungen
- Entwicklungsprofile werden abgeleitet statt manuell in jedes Requirement zu schreiben. Dadurch bleiben alle 28 aktuell profilierten Aufgaben vollständig erfasst.
- Die Schreibbrücke ist optional, lokal und nicht bewertend. Sie speichert nichts und erweitert die App nicht zu einem Schreibtest.
- Der Leseleiter nutzt kurze Kinderlabels: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbrücke.
- Geschützte Symbolsysteme werden nur als Nicht-Ziel und Lizenzthema im Bericht erwähnt, nicht im Content als Assetreferenz.

## Datenschutz und Sicherheit
Keine echten Schülerdaten, keine Namen, keine Klassenlisten, kein Login, kein Backend, keine Cloud, keine Uploads, keine Downloads, keine Analytics. Die App bleibt eine lokale Demo mit anonymen Profilfarben.

## Noch offen
Die Browser-Sichtprüfung muss zeigen, ob die neue Leseleiter auf schmalen Geräten nicht zu eng wirkt. Falls nicht ausreichend, ist die kleinste nächste UI-Slice: Leseleiter auf Mobile als horizontale Scrollleiste oder zwei Zeilen mit noch kürzeren Labels.
