# Alpha 24 - Profil-sicherer Tagesweg Implementierungsreport

Datum: 2026-05-18
Status: Implementiert und lokal verifiziert

## Kurzfazit

Alpha 24 ergänzt eine reine lokale Hilfsfunktion `getProfileSafeDailyPath(profile, options?)`. Sie verbindet das Alpha-22-Profilmodell mit den Alpha-23-sicheren Antwortoptionen und erzeugt daraus einen kleinen Tagesweg aus bestehenden, bereits getaggten Aufgaben.

Es wurden keine UI, keine neuen Screens, keine neuen Lerninhalte, keine Speicherung, kein Login, keine Cloud-Funktion und keine echten Schülerdaten ergänzt.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-24-profile-safe-daily-path-report.md`
- `reports/alpha-24-watchdog-review.md`

## Neue Funktion

`getProfileSafeDailyPath(profile, options?)` gibt lokal zurück:

```js
{
  profileId,
  maxCards,
  cards: [
    {
      taskId,
      word,
      mode,
      visibleOptions,
      hiddenOptions,
      reason,
      warnings
    }
  ],
  blockedTaskIds,
  summary
}
```

## Verhalten

- Standard `maxCards`: `maxDailyPathCards` = 4.
- Es werden nur Aufgaben aus `taskRequirementProfiles` betrachtet.
- Für jede Aufgabe wird `getProfileSafeTaskOptions(...)` genutzt.
- `blocked`-Aufgaben erscheinen nicht in `cards`, sondern in `blockedTaskIds`.
- `teacher-led`, `reduced-choice` und `full-choice` bleiben als Modus erhalten.
- Die Auswahl bevorzugt sichere eigenständige Karten vor unterstützten Karten: `full-choice`, dann `reduced-choice`, dann `teacher-led`.
- Bei gleicher Sicherheit bleibt die bestehende Content-Reihenfolge maßgeblich.
- Nach der Auswahl wird der ausgegebene Tagesweg wieder in Content-Reihenfolge sortiert, damit der Weg ruhig und erwartbar bleibt.
- Die Funktion kopiert Options- und Warnungsarrays und mutiert keine Taskdaten.
- `options.maxCards` und `options.minimumChoices` werden unterstützt.
- Wenn keine Karte passt, bleibt `cards` leer und die Zusammenfassung ist ruhig formuliert.

## Beispiele aus den Tests

- `profileMA`: `b-ma-ma` erscheint als `teacher-led`; `b-so-fa` und `b-la-ma` sind blockiert.
- `profileMASOF` mit `minimumChoices: 1`: `b-ma-ma` und `b-so-fa` erscheinen als `reduced-choice`; `b-la-ma` ist blockiert, weil L fehlt. Hinweis: Das vorhandene Profil enthält M/A/S/O/F, aber kein I; deshalb ist `b-ma-ma` nicht `full-choice`.
- `profileLAM` wird exakt wie vorhanden genutzt: Es enthält L/A/M. Dadurch passen `b-ma-ma` und `b-la-ma`; `b-so-fa` ist blockiert.
- Ein vollständiges Mama-Optionsprofil mit M/A/O/I erzeugt `b-ma-ma` als `full-choice`.
- `options.maxCards: 1` gibt genau eine passende Karte zurück.
- Ein leeres oder unbekanntes Profil gibt keine sichtbaren unsicheren Karten aus.

## Verifikation

Ausgeführt:

- `npm test -- --test-name-pattern="Alpha 24"` → 92/92 Tests bestanden
- `npm test` → 92/92 Tests bestanden
- `npm run build` → bestanden
- fokussierter Safety-Scan der neuen Logik in `src/lesewerk-content.mjs` → keine Treffer für Storage, Login, Cloud, Upload, Netzwerk oder Bewertungs-/Druckbegriffe; der einzige Treffer `export` ist die notwendige Funktionsdeklaration.

## Datenschutz- und GE-Check

Bestanden:

- keine echten Schülerdaten
- keine Namen, Diagnosen, Familieninfos oder Klassenlisten
- keine Speicherung lokaler Profile
- keine automatische pädagogische Entscheidung
- keine Noten, Scores, Rankings, Prozentwerte, Timer oder Drucksprache
- Sprache bleibt vorsichtig: „passt heute”, „gemeinsam lesen”, „reduzierte Auswahl”

## Offene Grenze

Alpha 24 arbeitet bewusst nur mit den drei in Alpha 22 getaggten Aufgaben `b-ma-ma`, `b-so-fa` und `b-la-ma`. Satzbausteine, Storytexte, weitere Level-B-Aufgaben und ein vollständigeres Graphemcluster-Modell bleiben spätere, separate Scheiben.

## Kleinster nächster Schritt

Vor sichtbarer UI sollte höchstens eine kleine Teacher-Vorschau-Scheibe entstehen, die diesen Tagesweg aus anonymen lokalen Demo-Profilen anzeigt. Auch diese nächste Scheibe sollte ohne Speicherung, ohne echte Profile und ohne automatische Entscheidung bleiben.
