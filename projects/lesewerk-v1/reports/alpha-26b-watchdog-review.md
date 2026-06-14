# Alpha 26B - Watchdog Review

Datum: 2026-05-18
Review-Status: Accepted / nicht blockiert

## Ergebnis

Alpha 26B ist angenommen. Die Task-Requirement-Coverage wurde von 3 auf 28 bestehende Aufgaben erweitert. Die Profilfilter-, Optionsfilter- und Tagesweglogik bleiben lokal, deterministisch und nicht-diagnostisch.

## Akzeptanzprüfung

Bestanden:

- Coverage ist sinnvoll erweitert: 28 Requirements statt 3.
- Es wurden nur bestehende `learningTasks` verwendet.
- Level A und Level B gewinnen Coverage.
- `optionWords` entsprechen den bestehenden Task-Optionen.
- `optionGraphemes` decken alle Optionswörter konservativ ab.
- Frühe Profile bleiben geschützt und sehen keine komplexen Wörter ohne passende Grapheme/Silben.
- Komplexe Einheiten werden explizit in `complexUnits` markiert und mit `requiresTeacherReview` abgesichert.
- Teacher Preview bleibt kompakt; blockierte IDs werden gekürzt angezeigt.
- Keine echten Schülerdaten, Diagnosen, Klassenlisten, Logins, Cloud-, Export-, Upload- oder Scoring-Funktionen ergänzt.

## Tests und Build

- `npm test`: bestanden, 101/101 Tests
- `npm run build`: bestanden
- Browsercheck: lokaler Preview geöffnet; Lehrkraft-Ansicht und Profil-Vorschau funktionieren; kompakte Blockiert-Zeile geprüft.

## Sicherheits- und Datenschutzcheck

Keine neuen riskanten Funktionen erkannt:

- keine realen Namen
- keine Schülerdaten
- keine Diagnosebehauptung
- kein Ranking
- kein Score
- kein Timer
- kein Export/Download
- kein Upload
- kein Login
- keine Netzwerklogik

Hinweis: Im bestehenden UI gibt es Datenschutz-Grenzformulierungen wie „keine Cloud“ und „keine Diagnose“. Diese sind bewusst warnende Negativformulierungen, keine neue Funktion.

## Fachliche Plausibilität

Stark:

- Die Erweiterung ist groß genug, damit die Profilvorschau nicht mehr nur Mama/Sofa/Lama kennt.
- Komplexe Grapheme werden nicht still als Einzelbuchstaben vereinfacht.
- Daily Path bleibt begrenzt und dadurch GE-praktisch ruhig.

Noch begrenzt:

- Level C wurde bewusst nicht erweitert, weil Satz-Prompts zusätzliche Grapheme enthalten.
- `requiresTeacherReview` ist ein Schutzmarker, ersetzt aber keine didaktische Feinkalibrierung.
- Die Demo-Profile sind weiterhin nur lokale Beispielprofile.

## Watchdog-Entscheidung

Accepted / nicht blockiert.

## Nächster kleinster Fix / Schritt

Kein blockierender Fix nötig. Nächste kleinste Scheibe: Alpha 26C als Lehrkraft-Inspector für Requirement-Coverage, damit `complexUnits`, fehlende Zielgrapheme und fehlende Optionsgrapheme transparent sichtbar werden, ohne Speicherung und ohne Profil-Editor.
