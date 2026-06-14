# Alpha 66C - Wortpost Vorher/Nachher-Vorschau

## Ergebnis

Alpha 66C ist umgesetzt. Die Wortpost-Profilsteuerung zeigt jetzt vor dem Start, was ein Preset fachlich verändert: aktuelle Stufe, neue Stufe, kurzer Grund und erwartete Post-Karten. Damit wird die Steuerung aus Alpha 66B deutlich verständlicher, ohne den Kindmodus zu belasten.

## Geändert

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Umgesetzt

- Neuer Helper `getWortpostPresetPreview(currentProfile, preset, tasks)`.
- Der Helper nutzt vorhandene Logik:
  - `createLocalDidacticProfile(...)`
  - `getWortpostDevelopmentStage(...)`
  - `getProfileSafeWortpostPath(...)`
- Vorschau liefert:
  - aktuelle Stufe
  - neue Stufe
  - Wechseltext, z. B. `Silbenbrücke → Wortaufbau`
  - kurzen Grund
  - erwartete Wortpost-Karten
  - nächsten kleinen Schritt
  - `localOnly: true`
  - `persistent: false`
- Lehrkraft-Wortpostkarte zeigt jetzt pro Preset eine ruhige Vorher/Nachher-Karte.
- Kindmodus wurde nicht um Preset- oder Lehrkrafttexte erweitert.
- Responsive CSS verhindert horizontalen Overflow.

## Verifikation

- `npm test -- --run`: 171/171 Tests bestanden.
- `npm run build`: bestanden.
- Desktop-Smoke über `http://127.0.0.1:5192/`:
  - Vorher/Nachher-Vorschau sichtbar.
  - `Sofa-Pfad` wechselt `Silbenbrücke → Wortaufbau`.
  - `Satz bereit` wechselt zu `Satzbrücke`.
  - Wortpost startet im Kindmodus.
  - Kindmodus enthält keine Preset-/Lehrkrafttexte.
  - Kein horizontaler Overflow.
- Mobile-Smoke 390px:
  - 3 Vorschaukarten sichtbar.
  - `Satz bereit` reagiert korrekt.
  - Kein horizontaler Overflow.
- Screenshots:
  - `reports/smoke/alpha66c-wortpost-desktop.png`
  - `reports/smoke/alpha66c-wortpost-mobile.png`

## Qualitätseinschätzung

Das ist ein guter Produkt-Schritt: Die App wird für Lehrkräfte nachvollziehbarer. Die Presets sind nicht mehr nur Buttons, sondern didaktische Entscheidungen mit sichtbarer Auswirkung. Das senkt die Gefahr, dass man etwas anklickt, ohne zu verstehen, was sich für das Kind ändert.

## Restlücken

- Die Vorschaukarten sind funktional klar, aber noch nicht maximal elegant. Ein späterer Design-Slice könnte sie visuell stärker als ruhige Entscheidungsleiste gestalten.
- Es gibt noch keine direkte Materialmengen-Vorschau pro Graphem/Silbe, sondern nur die drei aktuellen Wortpost-Karten.

## Nächster sinnvoller Slice

Alpha 67 sollte die inhaltliche Tiefe ausbauen: Wortfamilien und Materialpakete nach bekannten Graphemen/Silben. Ziel: Wenn z. B. `m, a, s, o, f` bekannt sind, erzeugt die App automatisch passende Pakete von Bild über Silbe und Wort bis Satz.
