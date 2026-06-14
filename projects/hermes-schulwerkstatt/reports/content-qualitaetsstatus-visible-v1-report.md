# Content-Qualitätsstatus sichtbar v1 — Report

## Ziel
Die Lese-Bibliothekskarten zeigen nun direkt im UI einen sichtbaren Qualitätsstatus mit kurzer, ruhiger Rückmeldung.

## Umsetzung
- In `index.html` wurde eine strukturierte Qualitätslogik ergänzt (`readingQualityMap`, `readingQualityByWord`, `getReadingQuality`).
- Jede Bibliothekskarte zeigt jetzt:
  - Statusbadge: `PASS`, `ATTENTION` oder `PROBLEM`
  - kurzen Hinweis in einer ruhigen Hinweisbox
  - visuelle Statusunterscheidung über dezente Farbvarianten
- Zusätzlich gibt es einen Qualitäts-Schnellscan im Bibliotheksbereich.
- Ein neuer Filter `Qualität` erlaubt das gezielte Anzeigen von PASS / ATTENTION / PROBLEM.

## Problem- und Attention-Karten
- PROBLEM: `zeigen`, `sehen`
- ATTENTION: `Nudel`, `Karte`, `Pause`, `Hase`, `gehen`, `laufen`, `malen`, `winken`, `legen`

## Browser-Smoke
- Lokaler Browser-Smoke über `http://127.0.0.1:8008/index.html` durchgeführt.
- Verifiziert:
  - `#libraryQualityFilter` ist vorhanden
  - 12 Karten werden initial gerendert
  - Statusbadges und Hinweisboxen erscheinen
  - Qualitätsfilter auf `problem` reduziert die Anzeige auf die zwei Problemkarten
- Keine JavaScript-Fehler im Smoke sichtbar.

## Hinweise
- Keine medizinische oder diagnostische Sprache verwendet.
- Keine Rankings, Noten oder Timer ergänzt.
- Mobile-Engpass nur grob mitgedacht; das vorhandene responsive Grid bleibt bestehen und sollte bei einem separaten Mobile-Smoke noch einmal geprüft werden.
