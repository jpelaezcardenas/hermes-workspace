# Alpha 24 - Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Entscheidung

`Accepted / nicht blockiert`

Alpha 24 erfüllt den engen Implementierungsauftrag: Es wurde eine lokale Logikbrücke von Leseprofil und vorhandenen Aufgaben zu einem kleinen profil-sicheren Tagesweg ergänzt. Die Umsetzung bleibt logic-only und nutzt die bestehenden Alpha-22-/Alpha-23-Funktionen.

## Geprüfter Scope

Gefordert war klein und testbar:

- pure Hilfsfunktion `getProfileSafeDailyPath(profile, options?)`
- Wiederverwendung von `taskRequirementProfiles`
- Wiederverwendung von `getProfileSafeTaskOptions(...)`
- maximal vier Tageswegkarten als Standard
- blockierte Aufgaben nicht im Tagesweg anzeigen
- Modi `teacher-led`, `reduced-choice`, `full-choice` erhalten
- einfache deterministische Ordnung mit Vorrang für sicherere Auswahlformen
- Tests für `profileMA`, `profileMASOF`, `profileLAM`, volles Mama-Optionsprofil, `maxCards`, leeres Profil und Sprachsicherheit

Nicht umgesetzt, wie gefordert:

- keine UI
- keine neuen Screens
- keine neuen Aufgaben, Wörter oder Geschichten
- keine Speicherung echter oder lokaler Profile
- keine Cloud, kein Login, kein Export
- keine Bewertung, kein Ranking, kein Timer

## Source- und Änderungscheck

Gelesen wurden vor der Umsetzung:

- `reports/alpha-22-watchdog-review.md`
- `reports/alpha-23-watchdog-review.md`
- `reports/alpha-23-safe-options-implementation-report.md`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

Geändert/erstellt wurden:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-24-profile-safe-daily-path-report.md`
- `reports/alpha-24-watchdog-review.md`

## Funktionaler Check

Die neue Funktion `getProfileSafeDailyPath(...)`:

- betrachtet nur Aufgaben mit vorhandenen `taskRequirementProfiles`
- ruft pro Aufgabe `getProfileSafeTaskOptions(...)` auf
- sammelt blockierte Aufgaben separat in `blockedTaskIds`
- gibt nur nicht-blockierte Karten im Tagesweg aus
- kopiert sichtbare/versteckte Optionen und Warnungen, statt Taskdaten zu mutieren
- berücksichtigt `options.maxCards` und `options.minimumChoices`
- nutzt eine kleine Rangfolge: `full-choice`, dann `reduced-choice`, dann `teacher-led`
- hält bei gleicher Rangfolge die bestehende Content-Reihenfolge ein
- gibt bei leerem Profil keine unsicheren sichtbaren Karten aus

Wichtige dokumentierte Profilentscheidung:

- `profileMASOF` enthält M/A/S/O/F, aber kein I. Deshalb ist `b-ma-ma` im Tagesweg mit `minimumChoices: 1` `reduced-choice` und nicht `full-choice`, weil `Mimi` I enthält.
- `profileLAM` enthält L/A/M und wird exakt so verwendet. Dadurch passen `b-ma-ma` und `b-la-ma`; `b-so-fa` bleibt blockiert.

## Testcheck

Ausgeführt:

- `npm test -- --test-name-pattern="Alpha 24"`
- `npm test`

Ergebnis:

- 92 Tests bestanden
- 0 fehlgeschlagen

Neue Alpha-24-Testabdeckung:

- `profileMA` + Tagesweg: `b-ma-ma` als `teacher-led`, `b-so-fa` und `b-la-ma` blockiert.
- `profileMASOF`: `b-ma-ma` und `b-so-fa` im Tagesweg, Modi erhalten, `b-la-ma` blockiert.
- `profileLAM`: vorhandenes Profil exakt genutzt, `b-ma-ma` und `b-la-ma` passend, `b-so-fa` blockiert.
- vollständiges Mama-Optionsprofil: `b-ma-ma` als `full-choice`.
- `options.maxCards: 1`: genau eine passende Karte.
- leeres Profil: keine sichtbaren unsicheren Karten und ruhige Zusammenfassung.
- Ausgabe enthält keine Diagnose-, Score-, Ranking-, Timer-, Noten-, Prozent-, Druck- oder Defizitsprache.

## Buildcheck

Ausgeführt:

- `npm run build`

Ergebnis:

- Build bestanden

## Safety Scan

Ausgeführt:

- fokussierter Scan der neu ergänzten Logik in `src/lesewerk-content.mjs`

Ergebnis:

- Keine Treffer für Storage, Login, Cloud, Upload, Netzwerk oder Bewertungs-/Druckbegriffe in der neuen Logik.
- Der einzige Scan-Treffer `export` ist die notwendige Funktionsdeklaration und kein Export-/Download-Feature.

## Datenschutz- und GE-Prüfung

Bestanden:

- keine echten Schüler-, Eltern- oder Klassendaten
- keine Namen, Diagnosen, Familieninfos oder identifizierbaren Kombinationen
- keine Speicherung lokaler Profile
- keine automatische pädagogische Entscheidung
- keine Noten, Scores, Ranking, Prozentwerte oder Timer
- vorsichtige pädagogische Sprache: Tagesweg passt heute, reduzierte Auswahl, gemeinsam lesen

## Risiken / Grenzen

- Das Profilmodell deckt weiterhin nur drei frühe Level-B-Aufgaben ab.
- Die Graphemzerlegung ist bewusst konservativ und noch kein vollständiges Graphemcluster-Modell.
- Satzbausteine, Storytexte und weitere Aufgaben sind noch nicht in den Profilfilter einbezogen.
- Es gibt noch keine sichtbare Teacher-Vorschau; das ist für Alpha 24 bewusst richtig.

## Kleinster nächster Fix, falls später blockiert

Nicht blockiert. Kleinster sinnvoller nächster Schritt:

- Eine sehr kleine Teacher-Vorschau vorbereiten, die `getProfileSafeDailyPath(...)` mit anonymen lokalen Demo-Profilen sichtbar macht, ohne Speicherung und ohne echte Schülerdaten.

## Endentscheidung

`Accepted / nicht blockiert`
