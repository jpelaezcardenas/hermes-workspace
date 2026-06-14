# Productklarheit v1 - 14 Materialkorb Mini-Assistent

## Kurzfassung
Im Alpha-73 Materialkorb gibt es jetzt einen ruhigen Mini-Assistenten mit deterministischer Empfehlung und Button „Empfehlung anwenden“. Die Empfehlung nutzt nur vorhandene Item-Metadaten (u. a. `isAdvanced`, `complexUnits`, `syllablesText`, `domain`) und bleibt innerhalb von `Alpha73MaterialkorbView` plus CSS.

## Umsetzung
- Neue Hilfsfunktion `getMaterialkorbRecommendation(items)` in `src/App.tsx`.
- Mini-Assistent panel in `Alpha73MaterialkorbView` ergänzt.
- Button „Empfehlung anwenden“ setzt das passende bestehende Preset.
- Keine Auto-Änderung ohne Klick.
- Bestehende Presets und der Kartentyp-Block bleiben erhalten.
- CSS für den kompakten Assistenten in `src/styles.css` ergänzt.

## Entscheidung / Logik
- Viele komplexe bzw. advanced Karten -> `GE sehr leicht` / Mini-Förderreihe.
- Viel Silbenmaterial, wenig Komplexität -> `Silbenfokus`.
- Überwiegend einfache Karten -> `Einfach`.
- Sonst eher `Satzaufbau` als nächster Sprachschritt.

## Verifikation
- `npm test -- --run` ✅ 239/239
- `npm run build` ✅
- Source-Check auf Empfehlung/Presets/print-only/materialkorb-controls/Mini-Förderreihe durchgeführt ✅

## Hinweise
- Layout blieb kompakt; keine breite Umgestaltung.
- Keine externen APIs, kein Netzwerk, keine Datenpersistenz.

## Codex-Nachprüfung 2026-05-31
- Korrektur ergänzt: Der manuelle Kartentyp-Block wurde nach dem Mini-Assistenten-Einbau wieder sichtbar in `Alpha73MaterialkorbView` eingesetzt.
- Grund: Build und Tests waren grün, aber die manuelle Auswahl Wortkarte/Silbenkarte/Satzstarterkarte/Mini-Förderreihe wäre sonst im UI nicht mehr erreichbar gewesen.
- Danach erneut Tests, Build und Source-Check geprüft.
