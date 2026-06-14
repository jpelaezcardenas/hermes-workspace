# Alpha 22 - Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Entscheidung

`Accepted / nicht blockiert`

Alpha 22 erfüllt den engen Implementierungsauftrag: Es wurde ein lokales, statisches Graphem-/TaskRequirement-Modell mit purem Profilfilter ergänzt. Die Implementierung bleibt ohne neue UI, ohne neue Screens, ohne neue Inhalte, ohne neue Speicherung und ohne echte personenbezogene Daten.

## Geprüfter Scope

Gefordert war klein und testbar:

- Anforderungen für `b-ma-ma`, `b-so-fa`, `b-la-ma`
- mindestens drei lokale Beispielprofile
- pure Funktion zur Frage: „Ist diese bestehende Aufgabe heute für dieses lokale Profil erlaubt?”
- Tests für Zielgrapheme, Zielsyllaben, Lesestufe und Options-/Distraktorgrapheme
- Reports und Verifikation

Nicht umgesetzt, wie gefordert:

- keine Teacher-UI
- keine neue App-Seite
- keine neuen Wörter/Aufgaben/Stories
- keine Speicherung echter Profile
- keine Cloud, kein Login, kein Export

## Source- und Änderungscheck

Gelesen wurden vor der Umsetzung:

- `reports/alpha-21-watchdog-review.md`
- `reports/alpha-21-leseprofil-curriculum-model.md`
- `reports/alpha-21-current-content-gap-analysis.md`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

Geändert/erstellt wurden:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-22-profile-filter-implementation-report.md`
- `reports/alpha-22-watchdog-review.md`

## Funktionaler Check

Die neue Funktion `getTaskProfileFit(...)` unterscheidet:

- `blocked`: Zielgrapheme, Zielsyllaben, TaskRequirements oder Lesestufe fehlen.
- `teacher-led` / `reduced-choice`: Ziel passt, aber Antwortoptionen enthalten noch nicht freigegebene Grapheme.
- `full-choice`: Ziel, Silben, Lesestufe und Optionen passen.

Die zentrale Alpha-21-Erkenntnis ist umgesetzt: Distraktoren/Optionen werden eigenständig geprüft und können volle Auswahl verhindern.

## Testcheck

Ausgeführt:

- `npm test`

Ergebnis:

- 79 Tests bestanden
- 0 fehlgeschlagen

Neue Alpha-22-Testabdeckung:

- `profileMA` + `b-ma-ma`: Ziel passt, aber nur lehrkraftgeführt/reduziert wegen O/I in `Momo`/`Mimi`.
- `profileMA` + `b-so-fa`/`b-la-ma`: blockiert wegen fehlender Zielgrapheme.
- `profileMASOF` + `b-so-fa`: Ziel passt, aber volle Auswahl wegen N/E/L/T in Optionen nicht erlaubt.
- `profileLAM` + `b-la-ma`: Ziel passt, aber volle Auswahl wegen S/O/F/R/E in Optionen nicht erlaubt.
- unbekannte Task-ID: sicher blockiert.
- Filterausgaben: keine Diagnose-/Score-/Ranking-/Timer-/Drucksprache.

## Buildcheck

Ausgeführt:

- `npm run build`

Ergebnis:

- Build bestanden

## Safety Scan

Ausgeführt:

- Scan in `src/lesewerk-content.mjs` auf Storage, Export, Login, Cloud, Netzwerk, XSS-nahe Muster und Bewertungs-/Druckbegriffe.

Ergebnis:

- Keine Treffer in `src/lesewerk-content.mjs`.

Hinweis zum Gesamtscan `src/`:

- Es gibt bereits bestehende Treffer in `src/App.tsx` für lokale Demo-Storage-Nutzung und Datenschutztexte.
- Alpha 22 hat `src/App.tsx` nicht geändert und keine neue Storage-/Export-/Login-/Cloud-/Netzwerklogik ergänzt.

## Datenschutz- und GE-Prüfung

Bestanden:

- keine echten Schülerdaten
- keine Namen, Diagnosen, Familieninfos oder Klassenlisten
- keine Bewertungen, Scores, Timer, Ranking, Noten oder Prozentwerte
- keine Persistenz der neuen Beispielprofile
- keine automatische pädagogische Entscheidung
- Erklärungssprache bleibt: „passt heute”, „reduziert/lehrkraftgeführt”, „noch nicht im Profil”

## Risiken / Grenzen

- Das Modell ist noch bewusst klein und deckt nur drei Aufgaben ab.
- `profileMA`, `profileMASOF` und `profileLAM` sind nur lokale Fixtures, keine UI- oder Speicherentscheidung.
- Satzbausteine wie `ist da` und Storytexte sind noch nicht in den Filter einbezogen.
- Für echte reduzierte Auswahl müsste später noch geprüft werden, welche konkreten Optionskarten sichtbar bleiben dürfen.

## Kleinster nächster Fix, falls später blockiert

Nicht blockiert. Kleinster sinnvoller nächster Schritt:

- Alpha 23: eine separate pure Funktion für profilpassende reduzierte Optionen ergänzen, z. B. `getProfileSafeTaskOptions(taskId, profile)`, bevor eine UI-Anbindung erfolgt.

## Endentscheidung

`Accepted / nicht blockiert`
