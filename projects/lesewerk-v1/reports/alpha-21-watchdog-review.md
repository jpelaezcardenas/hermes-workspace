# Alpha 21 - Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Kurzfazit

Alpha 21 wurde als Spezifikations-/Curriculum-Alpha abgeschlossen. Es wurden keine App-Funktionen, keine neuen Woerter, keine neuen Aufgaben, keine Stories und keine UI-Implementierung hinzugefuegt. Erstellt wurden nur die geforderten Reports zum zukuenftigen Leseprofil-, Curriculum- und Aufgabenfilter-Modell.

Entscheidung: `Accepted / nicht blockiert`

## Erstellte Dateien

- `reports/alpha-21-leseprofil-curriculum-model.md`
- `reports/alpha-21-current-content-gap-analysis.md`
- `reports/alpha-21-watchdog-review.md`

## Source Read Check

Gelesen/geprueft wurden:

- `reports/alpha-20-watchdog-review.md`
- `reports/alpha-20-tablet-practice-review.md`
- `reports/alpha-19-watchdog-review.md`
- `reports/alpha-19-mama-step-card-report.md`
- `reports/alpha-18-word-inventory-report.md`
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`

Zusaetzlich per lokalem Node-Import aus `src/lesewerk-content.mjs` geprueft:

- 48 Lernaufgaben vorhanden.
- 24 Mini-Geschichten vorhanden.
- Aufgabentypen: `image-word-match`, `syllable-blend`, `word-picture-match`.
- Level: A, B, C.
- Guided Reading Chain nutzt `b-ma-ma`, Wort `Mama`, Silben `Ma`/`ma`, Satz `Mama ist da.`, Mini-Geschichte und Pause.

## No-Code-Change Check

Ausgefuehrt:

- `git -C /Users/zondrius/hermes-workspace/projects/lesewerk-v1 diff -- src tests`

Ergebnis:

- Keine Diff-Ausgabe fuer `src` und `tests`.
- Es wurden keine Code- oder Testdateien in diesem Alpha veraendert.

Hinweis:

- `git status --short -- reports src tests` zeigt in dieser lokalen Workspace-Struktur `?? reports/`, `?? src/`, `?? tests/`, weil das Projekt im uebergeordneten Arbeitsbaum offenbar als ungetrackter Ordner liegt. Der aussagekraeftige Code-Check fuer diese Alpha ist deshalb der leere Diff gegen `src`/`tests` plus die Tatsache, dass nur Reportdateien geschrieben wurden.

## Tests

Ausgefuehrt:

- `npm test`

Ergebnis:

- 72 Tests bestanden.
- 0 fehlgeschlagen.

## Safety Check

Geprueft gegen die Alpha-21-Constraints:

- Keine neuen Woerter in der App.
- Keine neuen Tasks in der App.
- Keine neuen Stories in der App.
- Keine breite UI-Implementierung.
- Keine Speicherung von Leseprofilen.
- Kein Export, Login, Upload, Cloud, Datenbank oder Klassenliste.
- Keine realen Schuelerdaten, Namen, Diagnosen oder Familieninfos.
- Keine Scores, Timer, Rankings, Noten, Prozentwerte oder Diagnose-Labels.
- Keine externen/protected Images oder METACOM-Assets.

Ergebnis:

- Nicht blockiert. Die Arbeit bleibt report-only und local/anonym kompatibel.

## Inhaltliche Qualitaetspruefung

Der Hauptreport beantwortet die Kernfrage: Wie soll LeseWerk wissen, was ein Kind lesen kann, welche Aufgabe als naechstes passt und wie S-Tier-Qualitaet gesichert wird?

Enthalten sind:

- ein 0-6 internes Graphemstatusmodell mit einfacher 3-Zonen-Lehrkraftsteuerung;
- 10 nicht-klassenbasierte Entwicklungsstufen fuer GE-Kontext;
- Aufgaben-Typen-Matrix mit Anforderungen, Textmenge, Optionen, Hilfen und Stop/Simplify-Regeln;
- deutsche GE-Qualitaetsregeln;
- 5 konkrete Beispielprofile mit erlaubten und verbotenen Aufgaben;
- Datenmodell-Vorschlag fuer Grapheme, Profile, Task-Anforderungen, Metadaten, Reviewstatus und Hilfen;
- einfaches UI-Konzept fuer spaetere Teacher Controls;
- Roadmap Alpha 22-24.

Die Gap-Analyse benennt konkret:

- welche aktuellen Inhalte als erste Kandidaten taugen: Mama, Lama, Sofa, Limo, Bus/Hut/Ball als spaetere Ganzwortkandidaten;
- warum Level A/B/C fuer Profilsteuerung nicht reichen;
- warum Distraktoren eigene Graphem-Anforderungen brauchen;
- warum Satzbausteine wie `ist da` separat freigegeben werden muessen;
- dass die aktuelle Mama-Karte strukturell passt, aber nicht vollstaendig graphemrein fuer M+A ist.

## Risiken / Grenzen

- Dies ist ein Spezifikationsstand, noch keine implementierte Filterlogik.
- Keine echte Unterrichtserprobung mit Kindern; die Einschaetzung bleibt fachlich-konzeptionell.
- Die 0-6-Skala ist intern sinnvoll, muss aber in der UI unbedingt als einfache Tagesauswahl erscheinen, damit kein Diagnosegefuehl entsteht.
- Spaetere Implementierung muss besonders auf Distraktoren achten: unbekannte Zeichen in falschen Antwortoptionen koennen ein Profil genauso brechen wie unbekannte Zeichen im Zielwort.

## Naechster kleinster Schritt

Alpha 22 sollte klein bleiben:

- ein statisches Datenmodell fuer Grapheme/TaskRequirements anlegen;
- 3 Beispielprofile ohne Speicherung definieren;
- nur bestehende Aufgaben `b-ma-ma`, `b-so-fa`, `b-la-ma` testweise taggen;
- reine Tests fuer `isTaskAllowedForProfile(...)` schreiben;
- keine breite UI und keine Content-Erweiterung.

## Endentscheidung

`Accepted / nicht blockiert`

Alpha 21 liefert ein praezises, umsetzbares Kontrollsystem fuer zukuenftige Leseaufgaben und bleibt innerhalb der Datenschutz-, GE- und Scope-Grenzen.
