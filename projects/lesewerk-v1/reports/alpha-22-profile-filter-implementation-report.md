# Alpha 22 - Profilfilter Implementierungsreport

Datum: 2026-05-18
Status: Implementiert und lokal verifiziert

## Kurzfazit

Alpha 22 ergänzt ein kleines, statisches und rein lokales Graphem-/Aufgabenanforderungsmodell für die vorhandenen Aufgaben `b-ma-ma`, `b-so-fa` und `b-la-ma`. Zusätzlich gibt es drei Beispielprofile und die pure Funktion `getTaskProfileFit(taskId, profile, options?)` mit Alias `isTaskAllowedForProfile`.

Keine UI, keine neuen Screens, keine neuen Aufgabeninhalte und keine Speicherung echter Profile wurden ergänzt.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-22-profile-filter-implementation-report.md`
- `reports/alpha-22-watchdog-review.md`

## Neues Datenmodell

Exportiert aus `src/lesewerk-content.mjs`:

- `readingProfileExamples`
  - `profileMA`: M/A und Silbe Ma/ma
  - `profileMASOF`: M/A/S/O/F und Silben Ma, So, fa
  - `profileLAM`: L/A/M und Silben La, ma
- `taskRequirementProfiles`
  - `b-ma-ma`
  - `b-so-fa`
  - `b-la-ma`

Pro Aufgabe werden u. a. erfasst:

- Zielwort
- Zielgrapheme
- Zielsyllaben
- Silbenmuster
- minimale Lesestufe
- Optionswörter
- Options-/Distraktorgrapheme
- Qualitätsstatus
- kontrollierter Nutzungshinweis

Wichtig: Die Options-/Distraktorgrapheme sind bewusst getrennt vom Zielwort modelliert. Dadurch wird die Alpha-21-Einsicht abgebildet: Eine Aufgabe kann durch Distraktoren ungeeignet werden, obwohl das Zielwort selbst passt.

## Neue Funktion

`getTaskProfileFit(taskId, profile, options?)` gibt zurück:

```js
{
  allowed: true | false,
  mode: 'full-choice' | 'reduced-choice' | 'teacher-led' | 'blocked',
  missing: [...],
  warnings: [...],
  reason: '...'
}
```

Verhalten:

- Unbekannte Task-ID: sicher blockiert.
- Fehlende Zielgrapheme, Zielsyllaben oder zu niedrige Lesestufe: blockiert.
- Ziel passt, aber Optionsgrapheme fehlen: erlaubt nur reduziert oder lehrkraftgeführt, mit Warnung.
- Ziel, Silben, Stufe und Optionen passen: `full-choice`.

## Fachliche Entscheidungen

- Alle drei Startprofile sind lokale Fixtures, keine gespeicherten Lernprofile.
- Grapheme werden intern klein normalisiert, damit M/m und A/a als frühe Graphemfamilien geprüft werden können.
- Für `profileMA` ist `b-ma-ma` nicht voll auswählbar, weil `Momo` und `Mimi` O/I einführen.
- Für `profileMASOF` passt `b-so-fa` als Ziel, aber nicht als volle Auswahl wegen Sonne/Salat mit N/E/L/T.
- Für `profileLAM` passt `b-la-ma` als Ziel, aber nicht als volle Auswahl wegen Sofa/Rose mit S/O/F/R/E.

## Tests

Ergänzt wurden fokussierte Alpha-22-Tests für:

- Anforderungsmodell für Mama/Sofa/Lama
- `profileMA` + `b-ma-ma` nur reduziert/lehrkraftgeführt
- `profileMA` blockiert Sofa und Lama wegen fehlender Zielgrapheme
- `profileMASOF` erlaubt Sofa-Ziel, warnt aber wegen Distraktoren
- `profileLAM` erlaubt Lama-Ziel, warnt aber wegen Distraktoren
- unbekannte Task-ID blockiert sicher
- Ausgaben enthalten keine Bewertungs-/Diagnose-/Score-Sprache

## Verifikation

Ausgeführt:

- `npm test` → 79/79 Tests bestanden
- `npm run build` → bestanden
- Source-Safety-Scan `src/lesewerk-content.mjs` → keine Treffer für Storage, Export, Login, Cloud, Netzwerk oder Bewertungs-/Druckmuster

Gesamtscan `src/` zeigte bestehende Treffer in `src/App.tsx` für lokale Demo-Storage-/Datenschutzhinweise. Diese wurden in Alpha 22 nicht verändert; Alpha 22 selbst hat keine neue Storage-/Export-/Login-/Cloud-/Netzwerklogik hinzugefügt.

## Datenschutz- und GE-Check

- Keine echten Schüler-, Eltern- oder Klassendaten.
- Keine Namen, Diagnosen, Noten, Scores, Ranking, Timer oder Prozentwerte.
- Keine Speicherung der neuen Beispielprofile.
- Keine neue UI und keine automatische Auswahl für echte Kinder.
- Sprache bleibt als Aufgabenpassung formuliert, nicht als Fähigkeitsetikett.

## Offene Grenze

Das Modell deckt bewusst nur drei bestehende Tasks ab. Für spätere Alphas müssen Satzbausteine, Storytexte, Ganzwörter und weitere Aufgaben separat getaggt werden.

## Kleinster nächster Schritt

Alpha 23 sollte entweder:

1. die bestehende Tagesweg-Auswahl intern mit dem Profilfilter verbinden, weiterhin ohne echte Speicherung; oder
2. zuerst weitere TaskRequirements für `b-li-mo` und ausgewählte sichere Level-A-Aufgaben ergänzen.

Vor UI-Integration sollte ein separater Test prüfen, dass reduzierte Optionen wirklich nur profilpassende Karten zeigen.
