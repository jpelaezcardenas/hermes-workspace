# Alpha 26B - Massive Task Coverage Report

Datum: 2026-05-18
Status: Implementiert, lokal geprüft

## Kurzfazit

Alpha 26B erweitert die profil-sichere LeseWerk-Task-Abdeckung von 3 auf 28 bestehende Lernaufgaben. Die Logik bleibt lokal, deterministisch und nicht-diagnostisch. Die Lehrer-Profilvorschau zeigt durch die breitere Coverage mehr passende Tagesweg-Kandidaten, begrenzt aber weiterhin den kleinen Leseweg und fasst blockierte Aufgaben kompakt zusammen.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-26b-massive-task-coverage-report.md`
- `reports/alpha-26b-watchdog-review.md`

## Abdeckung

Jetzt profiliert: 28 bestehende Aufgaben.

Gained coverage:

- Level A / Bild-Wort: 15 Aufgaben
  - `a-ball`, `a-bus`, `a-hut`, `a-tasse`, `a-sonne`, `a-haus`, `a-maus`, `a-licht`, `a-regen`, `a-wind`, `a-blume`, `a-tasche`, `a-fenster`, `a-tuer`, `a-buch`
- Level B / Silben lesen: 13 Aufgaben
  - `b-ma-ma`, `b-so-fa`, `b-la-ma`, `b-li-mo`, `b-to-ma-te`, `b-ba-na-ne`, `b-ro-se`, `b-na-se`, `b-ta-sche`, `b-ta-fel`, `b-schu-le`, `b-blu-me`, `b-re-gen`

Nicht neu profiliert:

- Level C bleibt bewusst unprofiliert, weil dort Satz-/Kurzsatz-Prompts zusätzliche Grapheme in Prompt und Kontext enthalten. Das sollte separat und konservativ erfolgen.
- Einige spätere Level-B-Aufgaben wie `b-fens-ter`, `b-tas-se`, `b-son-ne` bleiben für eine nächste Scheibe, weil die aktuelle Zielmenge bereits über 24 liegt und komplexe Auslaute/Optionen sauberer geprüft werden sollten.

## Metadata-Erweiterung

Jeder neue Requirement-Eintrag enthält weiterhin:

- `taskId`
- `targetWord`
- `targetGraphemes`
- `targetSyllables`
- `syllablePattern`
- `minReadingStage`
- `optionWords`
- `optionGraphemes`
- `qualityStatus`
- `controlledUseNote`

Zusätzlich ergänzt:

- `wordPattern`
- `complexUnits`
- `requiresTeacherReview`
- `graphemeNotes`

## Komplexe Einheiten / Review-needed

Konservativ explizit markiert:

- `sch`
- `ch`
- `au`
- `st`

Review-needed Aufgaben:

- `a-ball`
- `a-haus`
- `a-maus`
- `a-licht`
- `a-blume`
- `a-tasche`
- `a-fenster`
- `a-tuer`
- `a-buch`
- `b-to-ma-te`
- `b-na-se`
- `b-ta-sche`
- `b-ta-fel`
- `b-schu-le`
- `b-blu-me`

Hinweis: `sch/ch/au/st` werden nicht als einfache Einzelbuchstaben versteckt, sondern als komplexe Einheiten in `complexUnits` geführt und mit `requiresTeacherReview: true` markiert. `ei/eu/ie/sp` sind im jetzt profilierten Zielset nicht zentral enthalten; sie bleiben für spätere Coverage vorsichtig zu behandeln.

## Logikänderungen

- `taskRequirementProfiles` wurde massiv erweitert.
- Die interne Graphemzerlegung für Antwortoptionen erkennt jetzt konservativ komplexe Einheiten wie `sch`, `ch`, `au`, `ei`, `eu`, `ie`, `st`, `sp`.
- Die Alpha-22- bis Alpha-25-Funktionen bleiben erhalten:
  - `getTaskProfileFit`
  - `getProfileSafeTaskOptions`
  - `getProfileSafeDailyPath`
- Die Lehrer-Profilvorschau bleibt die Alpha-25-Vorschau, zeigt aber mehr Profilwirkung durch die neue Datenbasis. Die Liste blockierter Aufgaben wird im UI kompakt auf sechs IDs plus Restzahl gekürzt.

## Tests

Neu/angepasst wurden Tests für:

- mindestens 24 Requirement-Profile
- alle Requirements verweisen auf existierende Task-IDs
- `optionWords` entsprechen den bestehenden Task-Optionen
- konservative `optionGraphemes` decken alle Optionswörter ab
- profil-sicherer Tagesweg gewinnt breitere Auswahl
- sehr frühe Profile sehen keine unsicheren komplexen Wörter
- komplexe Einheiten sind review-markiert
- Output-Sprache bleibt frei von Diagnose-, Score-, Ranking- und Drucksprache

## Verification

- `npm test`: bestanden, 101/101 Tests
- `npm run build`: bestanden
- Forbidden-scan: keine neuen Cloud-/Export-/Login-/Upload-/Download-/Scoring-/Diagnose-Funktionen in den geänderten Content-/Style-Dateien; vorhandene App-Texte enthalten bewusst Datenschutz-Hinweise wie „keine Cloud“ und „keine Diagnose“.
- Browsercheck: lokaler Preview unter `http://127.0.0.1:4173/` geöffnet; Lehrkraft-Ansicht und Profil-Vorschau sichtbar; blockierte Aufgaben werden kompakt angezeigt, z. B. „und 21 weitere“.

## Datenschutz / GE-Sicherheit

- Keine echten Schülerdaten, Namen, Diagnosen, Klassenlisten oder Profile ergänzt.
- Keine Speicherung neuer Profile.
- Keine Netzwerkaufrufe, Logins, Uploads, Exporte oder Downloads ergänzt.
- Keine Bewertung, kein Ranking, keine Prozent-/Score-Logik, kein Timer.
- Die Logik bleibt eine lokale Strukturierungshilfe, keine diagnostische Aussage.

## Risiken / Grenzen

- Die Graphem- und Silbenanforderungen sind fachlich konservative lokale Metadaten, keine validierte Diagnostik.
- Level-C-Aufgaben benötigen gesonderte Prüfung, weil Satz-Prompts zusätzliche Grapheme einführen.
- Komplexe Einheiten sind markiert, aber noch nicht didaktisch fein abgestuft.
- Die Beispielprofile sind weiterhin Demo-Profile und keine echten Lernprofile.

## Nächster kleinster Schritt

Alpha 26C: Einen kleinen „Requirement Coverage Inspector“ nur für Lehrkräfte bauen oder als Test-/Report-Helper ergänzen: pro Aufgabe Zielwort, fehlende Zielgrapheme, fehlende Optionsgrapheme, `complexUnits` und `requiresTeacherReview` kompakt sichtbar machen, ohne Profil-Editor und ohne Speicherung.
