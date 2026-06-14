# Alpha 67B - Mama-Familie Mini-Lernreise

Status: abgeschlossen und nachgeprüft am 2026-05-20.

## Ergebnis

Alpha 67B macht aus dem Mama-Materialpaket eine spielbare Mini-Lernreise im Kindmodus. Die Reise führt ruhig durch fünf Stationen:

1. Bild
2. Silbe
3. Wort
4. Satz
5. Mini-Geschichte

Die Stationen sind kurz, lokal, nicht persistent und ohne Drucksprache. Es gibt keine Punkte, keinen Timer, kein Ranking, keine Noten und keine automatische Diagnose.

## Umgesetzt

- Neuer Content-Helper in `src/lesewerk-content.mjs`:
  - `getPlayableWordFamilyJourney(...)`
  - `getMamaFamilyMiniJourney(...)`
- Lehrkraft-Start in der Mama-Familie-Karte:
  - `Mama-Mini-Reise starten`
- Neuer Kind-Fokusmodus:
  - Startkarte `Mama-Mini-Reise`
  - Stationen mit `Nochmal`, `Weiter` und `Zur Lehrkraft`
  - letzte Station mit `Fertig`
  - ruhige Abschlusskarte
- Styling fuer Desktop und mobile Breite in `src/styles.css`.

## Verifikation

- `npm test -- --run`: 176/176 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Desktop oder Mobile.

## Browser-Smoke Details

Gepruefter Ablauf:

1. Lehrkraftbereich oeffnen.
2. `Mama-Mini-Reise starten` waehlen.
3. Startkarte `Mini-Reise starten` bestaetigen.
4. Stationen durchlaufen:
   - Bild: `Schau das Bild an.`
   - Silbe: `Lies: Ma - ma.`
   - Wort: `Lege oder waehle Mama.`
   - Satz: `Lies: Mama ist da.`
   - Mini-Geschichte: `Mama ist da. Was passt?`
5. Abschlusskarte erscheint:
   - `Die Mama-Mini-Reise ist fertig.`

Screenshots:

- `reports/smoke/alpha67b-desktop-start-card.png`
- `reports/smoke/alpha67b-desktop-finish.png`
- `reports/smoke/alpha67b-mobile-start-card.png`
- `reports/smoke/alpha67b-mobile-finish.png`

## Bewertung

Dieser Slice ist ein guter Premium-Musterbaustein: Er zeigt erstmals nicht nur Materialplanung fuer die Lehrkraft, sondern einen echten kleinen Lernweg fuer Kinder. Besonders wertvoll ist die klare Progression Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte. Genau dieses Muster kann danach auf Sofa, Tasse und weitere sichere Wortfamilien uebertragen werden.

Naechster sinnvoller Schritt: Alpha 67C sollte das Muster auf eine zweite Wortfamilie uebertragen und dabei die UI noch staerker bildhaft machen, ohne die Kindansicht wieder zu ueberladen.
