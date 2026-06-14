# S-Tier Mini-Reise Playing Stage Slice - 2026-05-31

## Ziel

Die Mini-Reise sollte im laufenden Kindermodus weniger wie eine Arbeitsseite und mehr wie ein klares Spiel wirken. Ein Kind soll nicht zwischen vielen Lehrkraft-Informationen, Statuskarten und Zusatzbuttons suchen muessen, sondern jeweils genau eine sichtbare Handlung erkennen.

## Umsetzung

- Der laufende Mini-Reise-Modus blendet Orientierungskarte, Stufenleiste, lange Lehrkrafttexte und Nebenerklaerungen aus.
- Die Bild-Ebene zeigt jetzt eine grosse zentrale Symbol-Buehne mit dem aktuellen Wort.
- Die Wort-Ebene zeigt das Zielwort als grosse ruhige Lesebuehne.
- Die Bedienung ist im Kindermodus auf den zentralen Weiter-Schritt reduziert.
- Der kleine Lehrkraft-Ausstieg bleibt im oberen Bereich erhalten, dominiert aber nicht mehr die Kinderhandlung.

## Qualitaetspruefung

- Testlauf: `npm test -- --run`
- Ergebnis: 245 von 245 Tests erfolgreich.
- Build: `npm run build`
- Ergebnis: erfolgreicher Produktions-Build.
- Visuelle Pruefung: mobiler Viewport 390 x 844, Mini-Reise gestartet, Spielmodus kontrolliert.
- Screenshot: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/s-tier-mini-reise-playing-final-2026-05-31.png`

## Bewertung

Der Slice ist ein klarer Fortschritt fuer App-Feeling: Die Mini-Reise hat im laufenden Zustand nun eine echte Spielbuehne statt einer vollgepackten Lernseite. Der naechste Hebel ist die gleiche Reduktion und Magie fuer die Lese-Mission sowie anschliessend eine qualitative Erweiterung der Satz- und Geschichtenebenen.
