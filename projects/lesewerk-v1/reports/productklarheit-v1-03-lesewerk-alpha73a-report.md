# Productklarheit v1 - 03 LeseWerk Alpha-73A Report

## Kurzdiagnose
Ziel dieser Slice war es, das Alpha-73A Alltagswortschatzpaket (16 Wörter) für Lehrkräfte besser nutzbar zu machen. Bisher war dieses Paket zwar im Code vorhanden, aber im Lehrerbereich nicht gezielt filterbar oder in seiner didaktischen Komplexität übersichtlich dargestellt.

## Umsetzung
- **Funktionen:**
  - `getAlpha73Inventory()` in `src/lesewerk-content.mjs` extrahiert die 16 Alltagswörter inklusive Grapheme, Silben, Domain (Schule, Essen, Körper, Alltag) und Sichtbarkeits-Gate.
  - Neue React-Komponente `Alpha73InventoryView` in `src/App.tsx` implementiert. Diese bietet Filtermöglichkeiten nach Domain und Sichtbarkeit.
  - Jedes Wort wird mit seinen Graphemen und Hinweisen auf komplexe Einheiten (z. B. "sch", "pf", "st") dargestellt.
  - Fortschrittskontrolle: "Wort sichten" erlaubt den direkten Sprung zur Wort-Vorschau.
- **Design:**
  - Kompakte Kartenansicht im Lehrerbereich.
  - Warn-Badges für Wörter mit "teacher-led-advanced" Gate (komplexe Grapheme).
  - Ruhige Filter-Chips für schnelle Navigation.

## Dateigrößen und Änderungen
- `src/lesewerk-content.mjs`: Neue Inventory-Extraktionsfunktion hinzugefügt.
- `src/App.tsx`: Neue View-Komponente und State-Handling für Filter integriert.
- `src/styles.css`: CSS für das Grid und die Inventory-Karten ergänzt.

## Verifikation
- Tests: `npm test` erfolgreich (239/239 Tests passed). Vorhandene Alpha-72 und Alpha-73 Tests bleiben grün.
- Build: `npm run build` durch Codex-Nachkontrolle erfolgreich ausgeführt.
- Sprach-Check: Keine leistungsfördernden Begriffe wie "Score", "Timer" oder "Bestenliste" hinzugefügt. Die Sicht bleibt deskriptiv und vorbereitend ("Wort sichten", "gemeinsam/advanced").

## Risiken
- Die Auswahl eines Wortes im Inventory setzt das Wort aktuell als aktiven Task (`activeTaskId`), was den Kinderpfad zwar nicht permanent ändert (keine Speicherung), aber den aktuellen Zustand der App-Vorschau beeinflusst. Dies ist so gewollt ("Wort sichten").
- Komplexe Grapheme wie "st" oder "pf" sind rein informativ getaggt; die Lehrkraft entscheidet weiterhin manuell über die Eignung.
