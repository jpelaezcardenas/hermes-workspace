# Alpha 67C - Sofa-Familie Mini-Lernreise

Status: abgeschlossen und nachgeprueft am 2026-05-20.

## Ergebnis

Alpha 67C uebertraegt das in Alpha 67B entstandene Mini-Lernreise-Pattern auf eine zweite Wortfamilie. Neben Mama gibt es jetzt auch eine Sofa-Mini-Reise. Damit ist das Pattern nicht mehr nur ein Einzelbeispiel, sondern ein wiederholbarer Bauplan fuer weitere ruhige Lesereisen.

Die Sofa-Reise fuehrt durch fuenf Stationen:

1. Bild
2. Silbe
3. Wort
4. Satz
5. Mini-Geschichte

## Umgesetzt

- Generalisierter Journey-Helper in `src/lesewerk-content.mjs`:
  - `getPlayableWordFamilyJourney(...)`
  - `getWordFamilyMiniJourney(...)`
  - `getMamaFamilyMiniJourney(...)`
  - `getSofaFamilyMiniJourney(...)`
- Lehrkraft-UI:
  - `Mama-Mini-Reise starten` bleibt erhalten.
  - `Sofa-Mini-Reise starten` erscheint nur in der Sofa-Familie-Karte, also nur wenn das Sofa-Paket durch bekannte Einheiten verfuegbar ist.
- Kind-Fokusmodus:
  - dynamischer Reisetitel fuer Mama oder Sofa
  - Sofa-spezifische Texte und Silben
  - ruhige Abschlusskarte: `Die Sofa-Mini-Reise ist fertig.`

## Sofa-Stationen

- Bild: `Schau das Sofa an.`
- Silbe: `Lies: So - fa.`
- Wort: `Lege oder waehle Sofa.`
- Satz: `Lies: Das Sofa ist da.`
- Mini-Geschichte: `Das Sofa ist da. Was passt?`

## Verifikation

- `npm test -- --run`: 178/178 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Desktop oder Mobile.

## Browser-Smoke Details

Gepruefter Ablauf:

1. Lehrkraftbereich oeffnen.
2. Preset `Sofa-Pfad` aktivieren.
3. `Sofa-Mini-Reise starten` waehlen.
4. Startkarte `Mini-Reise starten` bestaetigen.
5. Stationen durchlaufen:
   - Bild
   - Silbe
   - Wort
   - Satz
   - Mini-Geschichte
6. Abschlusskarte erscheint:
   - `Die Sofa-Mini-Reise ist fertig.`

Screenshots:

- `reports/smoke/alpha67c-desktop-start-card.png`
- `reports/smoke/alpha67c-desktop-finish.png`
- `reports/smoke/alpha67c-mobile-start-card.png`
- `reports/smoke/alpha67c-mobile-finish.png`

## Bewertung

Das Ergebnis ist ein sinnvoller naechster Qualitaetsschritt. Die App bekommt nicht einfach mehr Stoff, sondern ein wiederverwendbares didaktisches Format: bekannte Einheiten freischalten, Materialpaket anzeigen, daraus eine kurze kindgerechte Reise starten. Fuer GE ist das stark, weil die Progression explizit, klein und wiederholbar bleibt.

Naechster sinnvoller Schritt: Alpha 67D sollte dieses Pattern nicht sofort auf alle Woerter ausrollen, sondern eine Auswahl-/Startoberflaeche fuer verfuegbare Mini-Reisen verbessern. Ziel: Kinder und Lehrkraefte sehen noch klarer, welche Reise heute passt, ohne dass die App wieder unuebersichtlich wird.
