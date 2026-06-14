# UK-/Gebaerden-/Bildanker-System v1 - Implementation Report

Datum: 2026-05-27

## Ergebnis

Das UK-/Gebaerden-/Bildanker-System v1 wurde als sichtbarer Slice in die Schulwerkstatt eingebaut. Der Lese-Förderkreis zeigt jetzt je nach Support-Modus konkrete Antwortwege wie zeigen, auswählen, Gebärdenhinweis, Bildanker, Gegenstand und „Schau-mal-meine-Hände-an“.

Der Kindmodus spiegelt den Support-Modus zusätzlich in einer Support-Spur, sodass die Unterstützung nicht nur im Lehrertext, sondern auch im kindnahen Bereich sichtbar bleibt.

## Geänderte Datei

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

## Was neu sichtbar ist

### Im Lehrerbereich

- Abschnitt „Antwortwege nach Support-Modus“ mit drei konkreten Antwortwegen pro Support-Modus.
- Sichtbarer Support-Text mit Unterstützung + Belastbarkeit.
- Support-abhängige Texte für Bildanker, Gegenstand, Auswählen, Gebärdenhinweis und Handmodellierung.

### Im Kindmodus

- Neue Support-Spur unter der Kindreiseroute.
- Kindmodus übernimmt die Support-Logik und bleibt dadurch nicht nur eine generische Vorschau.

## Abgedeckte Antwortwege

Die aktuelle Umsetzung bildet die geforderten Wege sichtbar ab:

- zeigen
- auswählen
- Gebärdenhinweis
- Bildanker
- Gegenstand
- „Schau-mal-meine-Hände-an“

## Verifikation

Browser-Smoke im lokalen Server unter `http://127.0.0.1:8788/`:

- `readingSupportSummary` zeigt abhängig vom Support-Modus eine passende Textspur.
- `readingSupportPaths` rendert 3 sichtbare Antwortweg-Karten.
- `childSupportNote` zeigt denselben Support-Modus im Kindbereich.
- Umschalten auf `uk` hat die Inhalte im Browser sichtbar geändert.

## Datenschutz / Sicherheit

- Keine externen Bildassets verwendet.
- Keine echten Schülerdaten verarbeitet.
- Keine Diagnose- oder Ranking-Logik eingeführt.
- Die Antwortwege bleiben pädagogische Hilfen, keine automatische Förderentscheidung.

## Stärken

- Die Unterstützung ist nicht nur ein Label, sondern verändert die sichtbare Aufgabenlogik.
- Der Support-Modus ist im Lehrer- und Kindbereich nachvollziehbar.
- Die Umsetzung bleibt lokal, ruhig und GE-freundlich.

## Schwächen

- Die Antwortwege sind noch als textuelle Karten dargestellt, nicht als voll ausdifferenziertes Interaktionssystem.
- Die Kindansicht reagiert noch nicht tief auf jeden einzelnen Supportweg, sondern zeigt vor allem die Support-Spur und die Auswahltexte.

## Risiken

- Wenn später zu viele Antwortwege gleichzeitig angeboten werden, kann die Oberfläche wieder unruhig werden.
- Für echte Unterrichtspraxis muss noch geprüft werden, ob die Begriffe in dieser Form für das Team sofort verständlich sind.

## Nächster bester Slice

Eine sinnvolle Fortsetzung wäre v2 mit stärkerer Verknüpfung zwischen Support-Modus und konkreter Kindinteraktion, zum Beispiel:

1. pro Support-Modus nur 1 primärer und 1 sekundärer Antwortweg,
2. sichtbare Materialbrücke im Kindmodus,
3. kurze Team-Hinweise für wann welcher Supportweg sinnvoll ist.
