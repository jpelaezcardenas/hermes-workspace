# Alpha 67D - Mini-Lesereisen Auswahl

Status: abgeschlossen und nachgeprueft am 2026-05-20.

## Ergebnis

Alpha 67D macht die Mini-Lesereisen fuer die Lehrkraft klarer nutzbar. Statt verstreuter Startbuttons gibt es jetzt eine kompakte Uebersicht:

`Heute passende Lesereisen`

Die Uebersicht zeigt nur Reisen, die durch die bekannten Einheiten des aktuellen Profils verfuegbar sind. Dadurch bleibt der Einstieg ruhiger und nachvollziehbarer.

## Umgesetzt

- Neuer Helper in `src/lesewerk-content.mjs`:
  - `getAvailableMiniJourneyCards(profile, tasks, options)`
- Der Helper liefert pro verfuegbarer Reise:
  - `anchorWord`
  - `journeyTitle`
  - `startLabel`
  - `fitReason`
  - `knownUnitsSummary`
  - `stepsPreview`
  - `localOnly: true`
  - `persistent: false`
- Lehrkraft-UI in `src/App.tsx`:
  - neue kompakte Sektion `Heute passende Lesereisen`
  - Startbuttons fuer Mama und Sofa, wenn verfuegbar
  - Startlogik zentralisiert ueber `startWordFamilyMiniJourney(...)`
- Styling in `src/styles.css`:
  - `.mini-journey-selector`
  - `.mini-journey-card-grid`
  - `.mini-journey-selector-card`

## Didaktische Wirkung

Die App zeigt jetzt deutlicher:

- Welche Lesereise heute passt.
- Welche Einheiten vorausgesetzt werden.
- Welche fuenf Schritte das Kind erlebt.
- Welcher Startbutton wirklich relevant ist.

Das reduziert Orientierungslast fuer Lehrkraefte und vermeidet, dass Kinder in eine grosse Material- oder Dashboard-Ansicht geraten.

## Verifikation

- `npm test -- --run`: 180/180 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Desktop oder Mobile.
- Kindmodus bleibt frei von `Heute passende Lesereisen`.

## Browser-Smoke Details

Gepruefter Ablauf:

1. Lehrkraftbereich oeffnen.
2. `Sofa-Pfad` aktivieren.
3. `Heute passende Lesereisen` pruefen.
4. Mama- und Sofa-Reise sind sichtbar.
5. `Sofa-Mini-Reise starten` waehlen.
6. Startkarte bestaetigen.
7. Sofa-Reise durchlaufen:
   - Bild: `Schau das Sofa an.`
   - Silbe: `Lies: So - fa.`
   - Wort: `Lege oder waehle Sofa.`
   - Satz: `Lies: Das Sofa ist da.`
   - Mini-Geschichte: `Das Sofa ist da. Was passt?`
8. Abschlusskarte erscheint:
   - `Die Sofa-Mini-Reise ist fertig.`

Screenshots:

- `reports/smoke/alpha67d-desktop-selector.png`
- `reports/smoke/alpha67d-desktop-finish.png`
- `reports/smoke/alpha67d-mobile-selector.png`
- `reports/smoke/alpha67d-mobile-finish.png`

## Bewertung

Das ist ein wichtiger Strukturgewinn. Die App hat nun nicht nur einzelne Mini-Reisen, sondern eine kleine, adaptive Startlogik fuer verfuegbare Lesereisen. Damit wird das System skalierbarer: Neue Reisen koennen spaeter hinzukommen, ohne dass die Lehrkraftansicht unuebersichtlich wird.

Naechster sinnvoller Schritt: Alpha 67E sollte nicht sofort weitere Reisen bauen, sondern die visuelle Qualitaet der Reise-Karten verbessern: groessere Bild-/Symbolanker, ruhigere Hierarchie, kindgerechtere Vorschau und klarer Unterschied zwischen Lehrkraftplanung und Kindspiel.
