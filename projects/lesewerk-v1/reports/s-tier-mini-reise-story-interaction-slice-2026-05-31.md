# S-Tier Mini-Reise Story Interaction Slice - 2026-05-31

## Ziel

Die Mini-Geschichte sollte nicht nur wie eine Textkarte aussehen, sondern wie ein echter Spielmoment: zwei grosse Auswahlkarten, eine direkte ruhige Rueckmeldung und ein sichtbarer Abschlussbutton im mobilen Vollbildmodus.

## Umsetzung

- Die beiden Mini-Geschichten-Karten sind echte Buttons mit `aria-pressed`.
- Eine Auswahl markiert die gewaehlte Karte sichtbar.
- Nach der Auswahl erscheint eine kurze Rueckmeldung: "Das passt." oder eine ruhige Wiederwahlhilfe.
- Die mobile Story-Buehne wurde kompakter gemacht, damit der Button "Fertig" im ersten Bildschirm sichtbar bleibt.
- Der zusaetzliche Layer-Badge wird im laufenden Mini-Reise-Spielmodus ausgeblendet, weil der Story-Auftrag bereits klar sichtbar ist.

## Qualitaetspruefung

- Testlauf: `npm test -- --run`
- Ergebnis: 247 von 247 Tests erfolgreich.
- Build: `npm run build`
- Ergebnis: erfolgreicher Produktions-Build.
- Mobile Sichtpruefung: 390 x 844, Mini-Reise bis Mini-Geschichte, Auswahl geklickt.
- Sichtpruefung: Feedback sichtbar, genau eine Karte markiert, "Fertig" im Viewport sichtbar.
- Screenshot: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/s-tier-mini-reise-story-after-choice-final3-2026-05-31.png`

## Bewertung

Dieser Slice macht die letzte Mini-Reise-Ebene deutlich mehr zu einem Spiel. Der naechste groessere Hebel waere, dieselbe Interaktionsqualitaet auf Satzlesen, Lese-Mission und die freien Storykarten zu uebertragen.
