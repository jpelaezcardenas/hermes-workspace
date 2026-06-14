# Alpha 23 - Profil-sichere Antwortoptionen Implementierungsreport

Datum: 2026-05-18
Status: Implementiert und lokal verifiziert

## Kurzfazit

Alpha 23 ergänzt eine reine lokale Hilfsfunktion `getProfileSafeTaskOptions(taskId, profile, options?)`. Sie beantwortet für vorhandene Aufgaben und lokale Leseprofile, welche Antwortoptionen heute sicher sichtbar bleiben können.

Keine UI, keine neuen Screens, keine neuen Aufgabeninhalte, keine Speicherung, keine echten Lernprofile und keine Bewertungssprache wurden ergänzt.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-23-safe-options-implementation-report.md`
- `reports/alpha-23-watchdog-review.md`

## Neue Funktion

`getProfileSafeTaskOptions(taskId, profile, options?)` gibt eine strukturierte lokale Entscheidung zurück:

```js
{
  taskId,
  targetWord,
  mode: 'full-choice' | 'reduced-choice' | 'teacher-led' | 'blocked',
  visibleOptions: [...],
  hiddenOptions: [...],
  missing: [...],
  warnings: [...],
  reason: '...'
}
```

## Verhalten

- Unbekannte Task-ID: `blocked`, keine sichtbaren Optionen.
- Blockiertes Zielwort: `blocked`, keine sichtbaren Optionen.
- Alle Optionswörter passen zum Profil: `full-choice`, alle Originaloptionen bleiben sichtbar.
- Zielwort passt, aber Distraktoren enthalten unbekannte Grapheme: nur sichere Optionen bleiben sichtbar.
- Wenn weniger als `minimumChoices` sichere Optionen bleiben, wird `teacher-led` zurückgegeben.
- Standard für `minimumChoices` ist 2.
- Das Zielwort muss in den sichtbaren Optionen enthalten sein.
- Es werden keine künstlichen Distraktoren erfunden.
- `taskRequirementProfiles` wird nicht mutiert.

## Beispiele aus den Tests

- `profileMA` + `b-ma-ma`: sichtbar `Mama`, verborgen `Momo`, `Mimi`, Modus `teacher-led`.
- `profileMASOF` + `b-so-fa`: sichtbar `Sofa`, verborgen `Sonne`, `Salat`, niemals `full-choice`.
- `profileLAM` + `b-la-ma`: sichtbar `Lama`, verborgen `Sofa`, `Rose`, niemals `full-choice`.
- Profil mit M/A/O/I für `b-ma-ma`: `full-choice` mit `Mama`, `Momo`, `Mimi`.
- Unbekannte Task-ID: sicher `blocked`.

## Technische Entscheidung

Eine kleine interne Funktion `graphemesForWord(word)` zerlegt die aktuellen einfachen deutschen Wörter konservativ in lokale Kleinbuchstaben. Umlaute und ß bleiben als Zeichen erhalten. Für Alpha 23 reicht diese einfache Ebene; komplexere Mehrgraphen wie `sch` werden noch nicht als eigener Graphem-Cluster modelliert.

## Verifikation

Ausgeführt:

- `npm test -- --test-name-pattern="Alpha 23"` → 85/85 Tests bestanden
- `npm test` → 85/85 Tests bestanden
- `npm run build` → bestanden
- fokussierter Safety-Scan der neuen Logik in `src/lesewerk-content.mjs` → keine Treffer für Storage, Export, Login, Cloud, Upload, Netzwerk oder Bewertungs-/Druckbegriffe

Hinweis: Der Testdatei-Scan enthält erwartbare Treffer, weil bestehende und neue Tests genau diese verbotenen Wörter als Regex-Prüfung absichern. Das ist kein Produktcode-Treffer.

## Datenschutz- und GE-Check

Bestanden:

- keine echten Schülerdaten
- keine Namen, Diagnosen, Familieninfos oder Klassenlisten
- keine Speicherung, kein Login, keine Cloud, kein Export
- keine Scores, Noten, Rankings, Timer, Prozentwerte oder Drucksprache in der neuen Ausgabe
- Ergebnis bleibt eine lokale Hilfsentscheidung für pädagogische Vorauswahl, keine automatische Diagnose

## Offene Grenze

Alpha 23 arbeitet nur mit den in Alpha 22 getaggten Aufgaben `b-ma-ma`, `b-so-fa` und `b-la-ma`. Satzbausteine, Storytexte, weitere Level-B-Aufgaben und echte Graphemcluster sind noch nicht in diesem Profilfilter modelliert.

## Kleinster nächster Schritt

Vor UI-Integration: Eine kleine Alpha-24-Scheibe sollte die Hilfsfunktion in einer rein lehrkraftgeführten Vorschau oder in einem weiteren Logiktest vorbereiten, ohne echte Profile zu speichern und ohne neue Schülerdaten einzuführen.
