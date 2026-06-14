# LeseWerk Alpha 5 – Adaptive Platzierung Report

Stand: 2026-05-16

## Ziel

Slice B implementiert eine vorsichtige adaptive Platzierung für den bestehenden lokalen LeseWerk-Stand. Die Logik bewertet nicht, sondern schlägt nach beobachtbaren Signalen einen nächsten kleinen Leseweg für heute vor.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
  - neue Funktion `getAdaptivePlacementSummary(...)`;
  - vorsichtige Routing-Logik für:
    - Bild und Wort;
    - Silben lesen;
    - Story verstehen;
    - reduzierte Auswahl und Wiederholung;
  - beobachtete Signale aus Hilfen, Story-Evidence, Wiederholungswahl und reduzierter Auswahl;
  - einheitliche Datenqualitätsformulierung ohne Bewertungslogik.

- `src/App.tsx`
  - adaptive Zusammenfassung in die App eingebunden;
  - kurze Kinderempfehlung erst nach mindestens einer Beobachtung;
  - Lehrerbereich erweitert um Vorschlag, Einordnung, Begründung und nächsten kleinen Schritt.

- `src/styles.css`
  - kleine, ruhige Darstellung für die Kinderempfehlung ergänzt.

- `tests/lesewerk-content.test.mjs`
  - Tests für Routing zu Bild und Wort, Silben lesen, Story verstehen sowie reduzierte Auswahl/Wiederholung;
  - Test für sichere, vorschlagsbasierte Sprache;
  - Absicherung gegen Score-, Diagnose-, Noten-, Ranking- und ähnliche Bewertungssprache.

## Pädagogische und sprachliche Grenzen

Die sichtbare Empfehlung bleibt bewusst vorsichtig:

- beginnt mit `Heute passt vermutlich ...`;
- nutzt keine Noten, Scores, Rankings oder Diagnosebegriffe;
- beschreibt beobachtbare Signale statt Eigenschaften der lernenden Person;
- nennt Unsicherheit und Datenqualität;
- gibt immer nur einen kleinen nächsten Schritt.

## Lehrerbereich

Der Lehrerbereich zeigt jetzt:

1. beobachtete Signale;
2. vorgeschlagenen Pfad;
3. Unsicherheit / Datenqualität;
4. nächsten kleinen Schritt.

Damit ist die Entscheidung nachvollziehbar, aber nicht endgültig oder diagnostisch formuliert.

## Kinderansicht

Die Kinderansicht zeigt nur nach einer vorhandenen Beobachtung eine kurze, ruhige Empfehlung. Sie bleibt nicht-evaluativ und enthält keine Einstufungssprache.

## TDD-Verlauf

RED:

```bash
npm test -- tests/lesewerk-content.test.mjs
```

Erwartet fehlgeschlagen, weil `getAdaptivePlacementSummary` noch nicht exportiert war.

GREEN / Verifikation:

```bash
npm test -- tests/lesewerk-content.test.mjs
npm test
npm run build
```

Ergebnis:

- `npm test -- tests/lesewerk-content.test.mjs`: 27/27 Tests bestanden;
- `npm test`: 27/27 Tests bestanden;
- `npm run build`: erfolgreich.

## Rest-Risiken

- Kein frischer Browser-/Tablet-Klickpfad in diesem Slice ausgeführt; die technische Verifikation erfolgte über Tests und Build.
- Die Platzierung ist bewusst einfache pädagogische Vorschlagslogik. Eine spätere UX-Prüfung sollte kontrollieren, ob die Lehrertexte im echten Bildschirmfluss nicht zu lang wirken.
