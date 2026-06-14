# Alpha 67E - Lesereisen Visual Polish und Roadmap

Status: abgeschlossen und nachgeprueft am 2026-05-20.

## Ergebnis

Alpha 67E verbessert die sichtbare Qualitaet der Sektion `Heute passende Lesereisen` und legt eine konservative Roadmap fuer die naechsten Lesereisen-Slices an. Die App wurde nicht mit neuen Spielmechaniken ueberladen; der Fokus lag auf besserer Orientierung, hochwertigerer Darstellung und sauberer Vorausplanung.

## Umgesetzt

- Lehrkraft-UI in `src/App.tsx` veredelt:
  - Reisename klarer
  - grosser Wortanker fuer `Mama` und `Sofa`
  - bekannte Einheiten kompakter
  - fuenf Schritte als ruhigere Chips
  - Startbutton in eigener Aktionszone
- Styling in `src/styles.css` erweitert:
  - `.mini-journey-card-topline`
  - `.mini-journey-card-kicker`
  - `.mini-journey-word-anchor`
  - `.mini-journey-known-units`
  - `.mini-journey-step-chips`
  - `.mini-journey-card-action`
  - mobile Regeln gegen gequetschte Karten und Ueberlauf
- Roadmap angelegt:
  - `reports/alpha-67-lesereisen-roadmap.md`

## Geplante Erweiterungen

Die Roadmap priorisiert acht konservative Slices:

1. `67F Tasse-Reise` erst nach stabiler Auswahl
2. bildhafte Symbolanker fuer Reise-Karten
3. adaptive Wiederholung ohne Speicherung
4. lokale Lehrkraftnotiz statt Diagnostik-Schnittstelle
5. Mini-Geschichten systematischer ausbauen
6. Hilfen sichtbar steuerbar machen
7. Review-Modus fuer Lehrkraft
8. Export/Print nur lokal und spaeter

Jede Erweiterung enthaelt Nutzen, Risiko, kleinsten sicheren Slice und Akzeptanzkriterien.

## Verifikation

- `npm test -- --run`: 181/181 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Desktop oder Mobile.
- Kindmodus bleibt frei von Roadmap- und Selector-Text.

## Browser-Smoke Details

Gepruefter Ablauf:

1. Lehrkraftbereich oeffnen.
2. `Sofa-Pfad` aktivieren.
3. Sektion `Heute passende Lesereisen` pruefen.
4. Wortanker sichtbar:
   - `Mama`
   - `Sofa`
5. Zehn Step-Chips sichtbar: fuenf pro Reise.
6. Zwei Startbuttons sichtbar und antippbar.
7. `Sofa-Mini-Reise starten` waehlen.
8. Sofa-Reise durchlaufen:
   - Bild: `Schau das Sofa an.`
   - Silbe: `Lies: So - fa.`
   - Wort: `Lege oder waehle Sofa.`
   - Satz: `Lies: Das Sofa ist da.`
   - Mini-Geschichte: `Das Sofa ist da. Was passt?`
9. Abschlusskarte erscheint:
   - `Die Sofa-Mini-Reise ist fertig.`

Screenshots:

- `reports/smoke/alpha67e-desktop-selector.png`
- `reports/smoke/alpha67e-desktop-finish.png`
- `reports/smoke/alpha67e-mobile-selector.png`
- `reports/smoke/alpha67e-mobile-finish.png`

## Bewertung

Das ist ein guter Schritt, weil die Lesereisen jetzt mehr nach einem kontrollierten Produktmodul wirken: klare Karten, sichtbare Wortanker, ruhige Schrittfolge und eine konkrete Roadmap. Der naechste technische Schritt sollte nicht blind mehr Inhalt sein, sondern ein bewusster Slice aus der Roadmap. Am sinnvollsten ist entweder `67F Tasse-Reise`, wenn die Auswahl weiter wachsen soll, oder zuerst `bildhafte Symbolanker`, wenn die visuelle Qualitaet noch staerker in Richtung kindgerechtes App-Gefuehl gehen soll.
