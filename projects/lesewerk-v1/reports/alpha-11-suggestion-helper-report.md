# Alpha 11 – Suggestion Helper Report

Datum: 2026-05-17
Status: Slice B umgesetzt

## Ziel

Slice B ergänzt nur die testbare Daten-/Helper-Schicht für vorsichtige Lehrkraft-Vorschläge zum nächsten Tagesweg. Es wurden keine UI-Dateien verändert.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-11-suggestion-helper-report.md`

## Implementierung

Neu ist `getTeacherDailyPathSuggestion(...)` in `src/lesewerk-content.mjs`.

Der Helper nutzt ausschließlich vorhandene lokale Signale:

- Support-State (`repeat`, `reduceChoices`, `imageHelp`, `syllableColors`)
- bestehende anonyme `observation`
- vorhandene Aufgaben und Stories
- bestehende Tagesweg-Kuratierungsoptionen
- bestehende adaptive Platzierungslogik als Grundlage

Das Ergebnisobjekt enthält:

- `title`
- `label`
- `suggestion`
- `reason`
- `alternative`
- `nextSmallStep`
- `selectedChoiceIds`
- `suggestedCardIds`
- `currentChoiceIds`
- `observedSignals`
- `dataQuality`
- `teacherExplanation`

## Sicherheitsgrenzen

Die Vorschlagslogik bleibt:

- lokal
- anonym
- vorsichtig formuliert
- manuell nutzbar für spätere UI-Slices
- ohne automatische Änderung des Kinderpfads
- ohne neue Inhalte
- ohne Diagnose-, Score-, Ranking-, Tempo- oder Fähigkeitslabel

Wenn die Daten dünn sind, wird bewusst ein sicherer Starter gewählt: `Bild und Wort` mit visueller Stütze.

## Testabdeckung

Neu ergänzt wurden fokussierte Tests für:

1. Thin-Data-Fallback auf sicheren Starter.
2. Support-basierte Wiederholung mit reduzierter Auswahl.
3. Story-Evidence-Vorschlag.
4. Max-vier-Begrenzung für aktuelle und vorgeschlagene Karten.
5. Verbotene Wortfelder: Diagnose, Score, Ranking, Tempo, Fähigkeit, Level/Stufe, Drucksprache.

## Verifikation

Ausgeführt:

- `npm test`

Ergebnis:

- 52 Tests ausgeführt
- 52 bestanden
- 0 fehlgeschlagen

## Hinweise für Slice C

Für die spätere UI kann `selectedChoiceIds` genutzt werden, wenn der Vorschlag direkt auf vorhandene Tagesweg-Kuratierungsoptionen zeigt. Für Vorschläge außerhalb der aktuellen Kuratierungsoptionen, insbesondere `Silben lesen`, stehen `suggestedCardIds` als äquivalente Karten-IDs bereit.

Die spätere UI muss weiterhin manuell bleiben: Vorschläge dürfen nicht automatisch übernommen werden.
