# Alpha 63 - Wortpost Premium HTML Spielraum

## Ergebnis

Wortpost wurde zu einem deutlich spielartigeren HTML-Spielraum erweitert. Die Runde bleibt ruhig und GE-tauglich, wirkt aber weniger wie eine Formularansicht: große Wortkarte, Postweg, Lesegarten, Ziel-Postfaecher, Leseweg-Stufen und direkt sichtbare Hilfeschalter.

## Umgesetzt

- Interaktive Hilfe-Buttons im Kindermodus:
  - Silben zeigen
  - Weniger Auswahl
  - Vormachen
- Sichtbare Zustandsveraenderung nach Hilfeauswahl:
  - aktiver Button
  - sichtbarer Hinweis wie `Heute sichtbar: Vormachen-Hilfe.`
  - passende fachliche Unterstuetzung wird aktiviert
- Mini-Leseweg im Spielraum:
  - Bild / Symbol
  - Silbe
  - Wort
- Lehrkraft-Record erweitert:
  - dokumentiert jetzt die sichtbar aktivierte Hilfe
  - bleibt lokal, ruhig und ohne Bewertungssprache
- CSS erweitert fuer:
  - touchfreundliche Hilfe-Buttons
  - aktive Hilfezustaende
  - Premium-Spielraum-Anmutung ohne neue Assets oder externe Abhaengigkeiten

## Geaenderte Dateien

- `src/App.tsx`
- `src/styles.css`

## Pruefung

- `npm test -- --run`: bestanden, 161/161 Tests gruen.
- `npm run build`: bestanden.
- Desktop-Smoke auf `http://127.0.0.1:5174/`: bestanden.
  - Lehrkraft -> Wortpost testen -> Wortpost starten
  - Fokusmodus sichtbar
  - alte Panels im Fokusmodus nicht sichtbar
  - Leseweg Bild/Silbe/Wort sichtbar
  - 3 Hilfe-Buttons sichtbar
  - kein horizontaler Overflow
  - Vormachen-Hilfe aktivierbar
  - Ball-Postfach antippbar
  - Feedback sichtbar
  - Zurueck zur Lehrkraft zeigt Record mit Vormachen-Hilfe
- Mobile-Smoke 390x844: bestanden.
  - keine horizontale Ueberbreite
  - Fokusmodus bleibt klar
  - Hilfe-Buttons und zwei Zielpostfaecher sichtbar
  - Lehrkraft-Record zeigt Hilfe korrekt
- Alpha-60-Regression: bestanden.
  - Auswahl-Spiel mit Ball -> Story -> Tasse startet weiter korrekt
  - Ball-Runde kann beendet werden
  - danach erscheint die Story `Der Ball im Garten`

## Einschaetzung

Der Slice ist ein guter Premium-Schritt: Die App fuehlt sich im Wortpost-Modus klarer wie ein eigenstaendiges Lernspiel an. Besonders stark ist, dass Hilfe nicht nur im Hintergrund wirkt, sondern fuer Kind und Lehrkraft sichtbar wird.

Noch nicht S-Tier ist die Menge und Tiefe: Es ist bisher ein einzelner Wortpost-Spielraum, noch kein komplettes Spielsystem mit mehreren Levelraeumen, Figurenreaktionen, Wiederholschleifen, Belohnungsritualen und Inhaltsprogression. Das waere der naechste grosse Hebel.

## Naechster sinnvoller Slice

Alpha 64 sollte aus Wortpost ein kleines Spielsystem machen:

- 3 bis 5 Wortpost-Runden als kurzer Spielpfad
- kindgerechte Abschlussanimation oder Sammelbild ohne Punkte
- mehr Woerter aus bekannten Buchstaben
- bessere Unterscheidung zwischen Symbol -> Silbe -> Wort -> Satz
- Lehrkraft kann vor dem Start einstellen, welche Hilfen sichtbar sind
- kurze Review-Pruefung: Wirkt es wie ein echtes Spiel und bleibt es trotzdem ruhig genug fuer GE?
