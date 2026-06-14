# Alpha 67F - Bildhafte Symbolanker fuer Lesereisen

Status: abgeschlossen und nachgeprueft am 2026-05-20.

## Ergebnis

Alpha 67F macht die Lesereisen-Karten bildhafter, ohne externe Assets oder geschuetzte Symbolsysteme zu verwenden. Die Karten fuer Mama und Sofa enthalten jetzt lokale HTML/CSS-Symbolanker mit Silbenplaettchen und einfachen Formen.

## Umgesetzt

- Lehrkraft-UI in `src/App.tsx`:
  - neuer Bereich `.mini-journey-symbol-anchor`
  - anchor-spezifische Klassen:
    - `.mini-journey-symbol-anchor--mama`
    - `.mini-journey-symbol-anchor--sofa`
  - Silbenplaettchen:
    - Mama: `Ma` / `ma`
    - Sofa: `So` / `fa`
  - lokale CSS-Formen:
    - Mama: Haus-/Herzanker
    - Sofa: Sitz-/Kissenanker
- Styling in `src/styles.css`:
  - `.mini-journey-symbol-anchor`
  - `.mini-journey-symbol-tile`
  - `.mini-journey-symbol`
  - `.mini-journey-mama-house`
  - `.mini-journey-mama-heart`
  - `.mini-journey-sofa-back`
  - `.mini-journey-sofa-seat`
  - `.mini-journey-sofa-cushion`
- Tests in `tests/lesewerk-content.test.mjs`:
  - lokaler Symbolanker vorhanden
  - Mama/Sofa-Silben im Source verdrahtet
  - keine externen Asset-/Storage-/fetch-Begriffe
  - Kindmodus bleibt frei von Selector/Roadmap/Dashboard/Score/Timer/Diagnose

## Verifikation

- `npm test -- --run`: 182/182 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Desktop oder Mobile.

## Browser-Smoke Details

Gepruefter Ablauf:

1. Lehrkraftbereich oeffnen.
2. `Sofa-Pfad` aktivieren.
3. `Heute passende Lesereisen` pruefen.
4. Zwei Symbolanker sichtbar:
   - `Ma` / `ma`
   - `So` / `fa`
5. Mama- und Sofa-Formanker sichtbar.
6. `Sofa-Mini-Reise starten` waehlen.
7. `Mini-Reise starten` im Fokusmodus waehlen.
8. Sofa-Reise durchlaufen:
   - Bild: `Schau das Sofa an.`
   - Silbe: `Lies: So - fa.`
   - Wort: `Lege oder waehle Sofa.`
   - Satz: `Lies: Das Sofa ist da.`
   - Mini-Geschichte: `Das Sofa ist da. Was passt?`
9. Abschlusskarte erscheint:
   - `Die Sofa-Mini-Reise ist fertig.`

Screenshots:

- `reports/smoke/alpha67f-desktop-symbol-selector.png`
- `reports/smoke/alpha67f-desktop-finish.png`
- `reports/smoke/alpha67f-mobile-symbol-selector.png`
- `reports/smoke/alpha67f-mobile-finish.png`

## Hinweis zur Hermes-Auffaelligkeit

Hermes meldete beim eigenen Smoke, dass der Button `Mini-Reise starten` nicht sichtbar weiterging. Die gezielte Codex-Nachpruefung zeigte: Der Button funktioniert. Die App wechselt korrekt in Station 1 der Sofa-Reise. Es handelt sich daher um ein Smoke-/Toolproblem, nicht um einen App-Bug.

## Bewertung

Das Ergebnis ist ein sichtbarer Qualitaetssprung. Die Reisekarten wirken jetzt weniger wie reine Verwaltungskarten und mehr wie kleine Lernspiel-Einstiege. Besonders gut: Die Loesung bleibt lokal, lizenzsicher und skalierbar. Der naechste starke Schritt waere entweder die Tasse-Reise als dritter Datenanker oder eine weitere visuelle Veredelung direkt im Kind-Fokusmodus.
