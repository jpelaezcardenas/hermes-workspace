# Alpha 67G - Kind-Fokusraum als Spielszene

Status: abgeschlossen und nachgeprueft am 2026-05-20.

## Ergebnis

Alpha 67G verbessert den Kind-Fokusraum der Mini-Reisen. Die Reise wirkt nun weniger wie eine reine Textkarte und mehr wie ein ruhiger Lernspielraum: grosser Silbenanker, klare Szene und ein Etappenband mit hervorgehobenem aktuellem Schritt.

## Umgesetzt

- Kind-Fokuskomponente in `src/App.tsx` erweitert:
  - `.mini-journey-play-scene`
  - `.mini-journey-scene-panel`
  - `.mini-journey-focus-symbol`
  - `.mini-journey-stage-track`
  - `.mini-journey-stage-focus`
- Der grosse Fokusanker nutzt vorhandene Daten:
  - Mama: `Ma` / `ma`
  - Sofa: `So` / `fa`
- Die fuenf Stationen bleiben:
  - Bild
  - Silbe
  - Wort
  - Satz
  - Mini-Geschichte
- Die aktuelle Station wird visuell hervorgehoben.
- Prompt, Erfolgstext und Buttons bleiben ruhig und vertraut.

## Nicht veraendert

- Keine neuen Inhalte.
- Keine externen Assets.
- Keine Speicherung.
- Keine Punkte, Timer, Rankings, Noten oder Diagnosesprache.
- Lehrkraftauswahl bleibt im Wesentlichen unveraendert.

## Verifikation

- `npm test -- --run`: 183/183 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Desktop oder Mobile.

## Browser-Smoke Details

Gepruefter Ablauf:

1. Lehrkraftbereich oeffnen.
2. `Sofa-Pfad` aktivieren.
3. `Sofa-Mini-Reise starten` waehlen.
4. `Mini-Reise starten` im Fokusmodus waehlen.
5. Station 1 zeigt:
   - neue Spielszene
   - grosser Silbenanker `So` / `fa`
   - aktueller Schritt `Bild`
   - fuenf Etappen im Track
6. Reise vollstaendig durchlaufen:
   - Bild: `Schau das Sofa an.`
   - Silbe: `Lies: So - fa.`
   - Wort: `Lege oder waehle Sofa.`
   - Satz: `Lies: Das Sofa ist da.`
   - Mini-Geschichte: `Das Sofa ist da. Was passt?`
7. Abschlusskarte erscheint:
   - `Die Sofa-Mini-Reise ist fertig.`

Screenshots:

- `reports/smoke/alpha67g-desktop-play-scene.png`
- `reports/smoke/alpha67g-desktop-finish.png`
- `reports/smoke/alpha67g-mobile-play-scene.png`
- `reports/smoke/alpha67g-mobile-finish.png`

## Bewertung

Das ist ein wichtiger Produktqualitaets-Schritt: Die Mini-Reise fuehlt sich nun eher wie ein eigener Lernspielraum an. Besonders stark ist, dass der Fortschritt nicht ueber Punkte oder Zeitdruck sichtbar wird, sondern ueber die Etappe und den grossen Silbenanker. Das passt gut zum GE-Ziel: Orientierung, Wiedererkennung und ruhiger Fokus.

Naechster sinnvoller Schritt: Entweder `Tasse-Mini-Reise` als dritter kontrollierter Inhaltsslice oder eine kleine Hilfe-Variante im Fokusraum, z. B. `Nochmal mit mehr Hilfe`, ohne Speicherung und ohne Bewertung.
