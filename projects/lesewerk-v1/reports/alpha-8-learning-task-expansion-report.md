# LeseWerk Alpha 8 – Learning Task Expansion Report

Stand: 2026-05-17

## Kurzdiagnose

Alpha 8 Slice C erweitert den Lernaufgaben-Pack kontrolliert von 24 auf 48 Aufgaben. Die bestehende Aufgaben-Architektur bleibt unverändert: `makeTask(...)`, die drei vorhandenen Niveaus A/B/C, lokale Symbolhilfen, Silbenfarben, Vorlesen als Lehrkraft-Hinweis, textbasierte Gebärden-Hinweise, reduzierte Auswahl und Wiederholung bleiben das Modell.

## Umsetzung

Geänderte Dateien:

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-8-learning-task-expansion-report.md`

Ergänzt wurden 24 neue Lernaufgaben, verteilt nach der Alpha-8-Zielstruktur:

- 8 neue Aufgaben in Level A: Bild und Wort
- 8 neue Aufgaben in Level B: Silben lesen / Silben verbinden
- 8 neue Aufgaben in Level C: Wort lesen / erste satzähnliche Prompts

## Verteilung

Aktueller Lernaufgaben-Bestand:

- Gesamt: 48 Aufgaben
- Level A: 16 Aufgaben
- Level B: 16 Aufgaben
- Level C: 16 Aufgaben

Damit erfüllt der Pack die Zielverteilung aus dem Blueprint: 16 / 16 / 16 über A, B und C.

## Neue Aufgabenfelder

### Level A – Bild und Wort

Neue alltags- und schulnahe Wörter:

- Licht
- Regen
- Wind
- Blume
- Tasche
- Fenster
- Tür
- Buch

### Level B – Silben lesen

Neue Silbenaufgaben:

- Ta - sche
- Ta - fel
- Schu - le
- Blu - me
- Re - gen
- Fens - ter
- Tas - se
- Son - ne

### Level C – Wort lesen und erste satzähnliche Prompts

Neue Wort-/Bild-Aufgaben mit kurzen, konkreten Leseimpulsen:

- Licht
- Regen
- Wind
- Blume
- Buch
- Heft
- Tisch
- Hof

Beispiele für die satzähnlichen Prompts:

- `Lies: Das ist Licht.`
- `Lies: Regen am Fenster.`
- `Lies: Das Buch ist da.`
- `Lies: Im Hof.`

## Qualitätsentscheidungen

Die neuen Aufgaben folgen den Alpha-8-Regeln:

- kurze deutsche Prompts;
- konkrete Wörter aus Alltag, Schule, Raum und Wetter;
- keine neuen UI- oder Backend-Konzepte;
- gleiche drei bestehenden Aufgabentypen;
- lokale `Bildplatzhalter:` statt externer oder geschützter Bildassets;
- Symbolhilfe bleibt lokal über `local-symbol-card`;
- Gebärden-Hinweise bleiben rein textbasiert;
- alle Aufgaben behalten die bestehenden Support-Metadaten;
- keine echten Namen, Diagnosen, Noten, Punkte, Rankings, Timer oder Drucksprache.

## Tests

Die Tests wurden gestärkt für:

- exakte Alpha-8-Aufgabenanzahl: 48;
- exakte Level-Verteilung: A/B/C = 16/16/16;
- Progression über Bild-Wort, Silbenlesen, Wortlesen und erste satzähnliche Prompts;
- vollständige lokale Symbolhilfe-Metadaten;
- keine externen oder geschützten Assets;
- eindeutige Antwortoptionen mit Zielwort;
- kurze Prompts;
- keine Druck-, Score-, Ranking-, Diagnose- oder Defizitsprache.

## Verifikation

Ausgeführt:

- `npm test`
- `npm run build`

Ergebnis:

- `npm test`: 38 Tests bestanden, 0 Tests fehlgeschlagen
- `npm run build`: erfolgreich

## Rest-Risiken

- Browser-Flow wurde in dieser Slice nicht visuell neu geprüft, weil keine UI-Logik geändert wurde.
- Die Content-Qualität wurde gegen Blueprint-Regeln und Tests geprüft; eine zusätzliche fachliche Human-Review der neuen Wortauswahl kann sinnvoll sein, ist bei bestandenen Tests und Build aber kein technischer Blocker.
