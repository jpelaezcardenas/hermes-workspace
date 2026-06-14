# Productklarheit v1 – 09 Alpha73 A4 Wortkarten Print Template

## Geändert
- `src/App.tsx`
- `src/styles.css`

## Was umgesetzt wurde
- Der Alpha73-Materialkorb rendert jetzt eine eigene Druckkarten-Ansicht mit stabilen Klassen (`materialkorb-print-*`).
- Jede Karte zeigt jetzt:
  - Wort
  - Silbentrennung
  - kurzer Domain-/Bereichshinweis
  - ruhige Lehrerstütze / Support-Hinweis
  - Grapheme-Hinweis
- Die Druck-Header-/Bedienelemente bleiben am Bildschirm sichtbar, werden aber im Druck über `.no-print` ausgeblendet.
- Für den Druck wurden A4-Portrait-Regeln ergänzt:
  - `@page` mit A4 portrait und Rand
  - Kartenraster mit 2 Spalten
  - schneidfreundliche Karten mit Seitenumbruchschutz
  - schwarze bzw. sehr reduzierte Druckfarben
- Der vorhandene App-Rahmen bleibt erhalten; `#root` ist weiterhin im Projekt-HTML vorhanden.

## Verifikation
- `npm test -- --run` ✅
- `npm run build` ✅
- Sichtprüfung per Source-Check:
  - `index.html` enthält `#root`
  - die Print-Regeln verstecken nicht mehr die ganze App, sondern gezielt nur die Nicht-Druck-Elemente

## Verhalten
- Der Materialkorb wirkt im Druck jetzt eher wie ein klassischer Kartenbogen als wie eine einfache Liste.
- Die Karten bleiben GE-freundlich: groß, ruhig, ohne Timer-/Score-Sprache und ohne unnötige visuelle Last.

## Risiken / offene Punkte
- Keine echte Browser-Print-Vorschau im laufenden UI visuell geprüft; das Layout ist aber syntaktisch gebaut und die Druckregeln sind konsistent.
- Bei sehr vielen ausgewählten Wörtern kann das Raster mehrere Seiten erzeugen; das ist gewollt, sollte aber bei Bedarf noch feinjustiert werden.
- Falls einzelne Wortobjekte ungewöhnliche Werte liefern, könnten fehlende Silbenfelder oder Sonderzeichen noch eine kleine Nachjustierung brauchen.
