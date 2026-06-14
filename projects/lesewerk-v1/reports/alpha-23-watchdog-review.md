# Alpha 23 - Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Entscheidung

`Accepted / nicht blockiert`

Alpha 23 erfüllt den engen Auftrag: Die App erhält eine reine lokale Logikfunktion für profil-sichere Antwortoptionen, ohne UI-Anbindung, ohne neue Screens, ohne Speicherung und ohne echte personenbezogene Daten.

## Geprüfter Scope

Gefordert war:

- pure Hilfsfunktion `getProfileSafeTaskOptions(taskId, profile, options?)`
- Wiederverwendung des Alpha-22-Modells `taskRequirementProfiles`
- Unterscheidung von `blocked`, `teacher-led`, `reduced-choice` und `full-choice`
- sichtbare Optionen enthalten immer das Zielwort, wenn die Aufgabe nicht blockiert ist
- sichtbare Optionen enthalten keine Wörter mit unbekannten Graphemen
- keine erfundenen Distraktoren
- Tests und Reports

Nicht umgesetzt, wie gefordert:

- keine UI
- keine neuen Screens
- keine neuen Aufgabeninhalte
- keine Speicherung echter Profile
- keine Cloud, kein Login, kein Export
- keine Bewertung, kein Ranking, kein Timer

## Source- und Änderungscheck

Gelesen wurden vor der Umsetzung:

- `reports/alpha-22-watchdog-review.md`
- `reports/alpha-22-profile-filter-implementation-report.md`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

Geändert/erstellt wurden:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-23-safe-options-implementation-report.md`
- `reports/alpha-23-watchdog-review.md`

## Funktionaler Check

Die neue Funktion unterscheidet:

- `blocked`: Ziel oder TaskRequirements sind nicht passend; keine sichtbaren Optionen.
- `teacher-led`: Ziel passt, aber es bleiben weniger als die geforderten sicheren Optionen; geeignet für gemeinsames Lesen und Zeigen.
- `reduced-choice`: Ziel passt und mehrere sichere Optionen bleiben; unsichere Distraktoren werden verborgen.
- `full-choice`: Ziel und alle Optionen passen; Originaloptionen bleiben sichtbar.

Die zentrale Alpha-22-Erkenntnis ist jetzt konkret nutzbar: Distraktoren werden nicht nur als Warnung erkannt, sondern als `hiddenOptions` aus der sicheren Tagesauswahl genommen.

## Testcheck

Ausgeführt:

- `npm test -- --test-name-pattern="Alpha 23"`
- `npm test`

Ergebnis:

- 85 Tests bestanden
- 0 fehlgeschlagen

Neue Alpha-23-Testabdeckung:

- `profileMA` + `b-ma-ma`: nur `Mama` sichtbar, `Momo` und `Mimi` verborgen, Modus `teacher-led`.
- `profileMASOF` + `b-so-fa`: `Sofa` sichtbar, `Sonne` und `Salat` verborgen, niemals `full-choice`.
- `profileLAM` + `b-la-ma`: `Lama` sichtbar, `Sofa` und `Rose` verborgen, niemals `full-choice`.
- vollständiges Mama-Optionsprofil: `full-choice` mit allen drei Originaloptionen.
- unbekannte Task-ID und blockiertes Ziel: sicher blockiert, keine sichtbaren Optionen.
- Ausgabe enthält keine Score-, Diagnose-, Ranking-, Timer-, Noten-, Prozent- oder Drucksprache.

## Buildcheck

Ausgeführt:

- `npm run build`

Ergebnis:

- Build bestanden

## Safety Scan

Ausgeführt:

- fokussierter Scan der neu ergänzten Logik in `src/lesewerk-content.mjs`

Ergebnis:

- keine Treffer für Storage, Export, Login, Cloud, Upload, Netzwerk oder Bewertungs-/Druckbegriffe in der neuen Logik

Hinweis:

- Die Testdatei enthält bewusst Regex-Treffer für verbotene Wörter, weil Tests genau diese Begriffe absichern. Das ist kein Produktcode- oder UI-Treffer.

## Datenschutz- und GE-Prüfung

Bestanden:

- keine echten Schüler-, Eltern- oder Klassendaten
- keine Namen, Diagnosen, Familieninfos oder identifizierbaren Kombinationen
- keine Speicherung lokaler Profile
- keine automatische pädagogische Entscheidung
- Sprache bleibt vorsichtig: Aufgabe passt, Auswahl reduziert, gemeinsam lesen und zeigen
- kein Scoring, keine Noten, kein Ranking, keine Prozentwerte, kein Timer

## Risiken / Grenzen

- Das Profilmodell deckt weiterhin nur drei frühe Level-B-Aufgaben ab.
- Die Graphemzerlegung ist bewusst konservativ und noch kein vollständiges deutsches Graphemcluster-Modell.
- Satzbausteine, Storytexte und weitere Optionen sind noch nicht profiliert.
- Die Funktion ist noch nicht in die UI integriert; das ist richtig für Alpha 23, aber der nächste praktische Nutzen entsteht erst in einer separaten, kleinen UI- oder Vorschau-Scheibe.

## Kleinster nächster Fix, falls später blockiert

Nicht blockiert. Kleinster sinnvoller nächster Schritt:

- Alpha 24: Logik-only oder sehr kleine Teacher-Vorschau vorbereiten, die `getProfileSafeTaskOptions(...)` sichtbar macht, ohne echte Profile zu speichern und ohne Schülerdaten einzuführen.

## Endentscheidung

`Accepted / nicht blockiert`
