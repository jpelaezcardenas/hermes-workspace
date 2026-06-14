# Productklarheit v1 - 13 Materialkorb Presets

Datum: 2026-05-31
Projekt: /Users/zondrius/hermes-workspace/projects/lesewerk-v1

## Ergebnis
Der Alpha-73A Materialkorb hat jetzt eine ruhige Preset-Reihe oberhalb der vorhandenen Kartentyp-Steuerung:
- Einfach
- Silbenfokus
- Satzaufbau
- GE sehr leicht

Die Presets konfigurieren bestehende Zustände über `cardMode` und `showSymbolField`, ohne ein zweites Steuerungssystem einzuführen. Die manuellen Kontrollen für Kartentyp und Bildfeld bleiben erhalten und können nach dem Preset weiterhin direkt verändert werden.

## Umsetzung
Geändert wurden:
- `src/App.tsx`
  - Preset-Buttons in `Alpha73MaterialkorbView` ergänzt
  - Hilfetext für das aktive Preset ergänzt
  - Preset-Logik so umgesetzt, dass nur vorhandene Zustände gesetzt werden
- `src/styles.css`
  - Styling für die neue Preset-Button-Reihe ergänzt

## Verifikation
- `npm test -- --run` → 239/239 bestanden
- `npm run build` → erfolgreich
- Source-Check durchgeführt für:
  - Preset-Labels
  - `setCardMode`
  - `setShowSymbolField`
  - `print-only`
  - `materialkorb-controls`
  - `Mini-Förderreihe`

## Hinweise
- Das vorhandene Print-Verhalten blieb erhalten.
- Die neue GE-Variante nutzt bewusst die bereits vorhandene Mini-Förderreihe als ruhige, niedrige Einstiegsversion.
- Es wurden keine externen Assets oder netzwerkabhängigen Änderungen eingeführt.
