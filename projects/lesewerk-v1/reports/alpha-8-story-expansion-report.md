# LeseWerk Alpha 8 – Story Expansion Report

Stand: 2026-05-17

## Kurzdiagnose

Alpha 8 Slice B erweitert die Mini-Story-Bibliothek kontrolliert von 12 auf 24 Stories. Die bestehende Story-Architektur bleibt unverändert: `makeStory(...)`, die drei bestehenden Cluster, lokale Symbolhilfen, textbasierte Gebärden-Hinweise, reduzierte Zwei-Antwort-Auswahl und Lehrkraft-Next-Steps bleiben das Modell.

## Umsetzung

Geänderte Dateien:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-8-story-expansion-report.md`

Ergänzt wurden 12 neue Mini-Stories, je 4 pro Cluster:

### Alltag – Dinge und Handlungen

Neue Stories:

- `story-lampe-licht` – Die Lampe macht Licht
- `story-fenster-offen` – Das Fenster ist offen
- `story-blume-tisch` – Die Blume am Tisch
- `story-tuer-wind` – Die Tür im Wind

### Schule und Klassenalltag

Neue Stories:

- `story-tasche-tuer` – Die Tasche an der Tür
- `story-tafel-wort` – Das Wort an der Tafel
- `story-kreis-kissen` – Das Kissen im Kreis
- `story-heft-ablegen` – Das Heft wird abgelegt

### Sozial und emotional

Neue Stories:

- `story-kind-fragt` – Ein Kind fragt
- `story-brot-teilen` – Brot wird geteilt
- `story-ruhig-warten` – Ruhig warten
- `story-freude-bauen` – Freude beim Bauen

## Verteilung

Aktueller Story-Bestand:

- Gesamt: 24 Stories
- Alltag – Dinge und Handlungen: 8 Stories
- Schule und Klassenalltag: 8 Stories
- Sozial und emotional: 8 Stories

Damit erfüllt die Bibliothek die Alpha-8-Zielverteilung aus dem Blueprint: 3 × 8 statt unbalanciertem Wachstum.

## Qualitätsentscheidungen

Die neuen Stories folgen den Alpha-8-Regeln:

- kurze Hauptsätze;
- ein klarer Verständnismoment pro Story;
- konkrete Wörter aus Alltag, Schule und sozialem Miteinander;
- genau zwei reduzierte Antwortoptionen;
- kein Füllmaterial;
- keine echten Namen oder personenbezogenen Daten;
- keine geschützten externen Assets;
- keine Diagnose-, Noten-, Ranking-, Score-, Timer- oder Drucksprache.

Für neue Fokuswörter wurden lokale Symbol-Cues und text-only Gebärden-Hinweise ergänzt:

- Fenster
- Tür
- Tafel
- Kreis
- Frage
- Ruhe

## Tests

Die Story-Tests wurden gestärkt:

- Story-Anzahl ist jetzt exakt 24.
- Cluster-Verteilung ist jetzt exakt 8 / 8 / 8.
- Metadata-Vollständigkeit prüft zusätzlich Symbolhilfe-Label und lokalen Alt-Text.
- Bestehende Prüfungen bleiben aktiv für:
  - kurze lesbare Texte;
  - Antwortvalidität;
  - eindeutige IDs und Titel;
  - lokale/protected Asset Safety;
  - text-only gesture hints;
  - verbotene Wortmuster;
  - reduzierte Story-Auswahl;
  - Story-Evidence im Teacher Summary.

## Verifikation

Ausgeführt:

- `npm test -- --test-name-pattern="Alpha 8 pack"` als RED/GREEN-Slice für die neue Alpha-8-Story-Anforderung
- `npm test`
- `npm run build`

Ergebnis:

- `npm test`: 36 Tests bestanden, 0 Tests fehlgeschlagen
- `npm run build`: erfolgreich

## Rest-Risiken

- Browser-Flow wurde in dieser Slice nicht visuell neu geprüft, da keine UI-Logik geändert wurde.
- Die inhaltliche Qualität wurde gegen Blueprint-Regeln und Tests geprüft; eine fachliche Human-Review kann zusätzlich sinnvoll sein, ist laut Task aber kein Blocker bei bestandenen Tests und Build.
