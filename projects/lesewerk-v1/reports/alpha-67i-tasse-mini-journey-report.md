# Alpha 67I - Tasse-Mini-Reise

Status: abgeschlossen am 2026-05-20

## Ergebnis

Die Lese-App hat jetzt eine dritte kleine Mini-Reise: `Tasse-Mini-Reise`.

Sie folgt dem geprueften Muster:

1. Bild
2. Silbe
3. Wort
4. Satz
5. Mini-Geschichte

Kindtexte:

- `Schau die Tasse an.`
- `Lies: Tas - se.`
- `Lege oder waehle Tasse.`
- `Lies: Die Tasse ist da.`
- `Die Tasse ist da. Was passt?`

Die Reise bleibt lokal, druckfrei und ohne Bewertung, Timer, Diagnose oder Speicherung.

## Umsetzung

- `getTasseFamilyMiniJourney(...)` ergaenzt.
- `getAvailableMiniJourneyCards(...)` kann jetzt bei passendem Profil `Mama`, `Sofa` und `Tasse` anzeigen.
- Profil-Gating bleibt erhalten: Tasse erscheint erst, wenn die bekannten Einheiten passen.
- App-Selector zeigt eine eigene `Tasse-Mini-Reise starten`-Karte.
- Kind-Fokus zeigt fuer Tasse die Silben `Tas / se`.
- `Nochmal mit Hilfe` funktioniert auch fuer Tasse und setzt beim Weitergehen zurueck.
- Neues CSS-Symbol fuer Tasse ohne externe Assets oder geschuetzte Bildsysteme.

## Verifikation

- `npm test -- --run`: 187/187 Tests gruen.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow im Hilfezustand oder auf der Abschlusskarte.

## Browser-Smoke

Gepruefter Ablauf:

1. Lehrkraft oeffnen.
2. Preset `Satz bereit` waehlen.
3. Tasse-Karte erscheint.
4. `Tasse-Mini-Reise starten`.
5. Startscreen oeffnen.
6. `Nochmal mit Hilfe` aktiviert lokale Hilfe.
7. `Weiter` setzt Hilfe zurueck.
8. Stationen laufen: Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte.
9. `Fertig` zeigt Abschlusskarte.

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67i-desktop-tasse-help.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67i-desktop-tasse-finish.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67i-mobile-tasse-help.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67i-mobile-tasse-finish.png`

## Bewertung

Das ist ein guter Ausbau, weil die App nicht nur optisch besser wird, sondern mehr echte, gefuehrte Lernsubstanz bekommt. Besonders wichtig: Die Erweiterung nutzt das vorhandene gepruefte Muster und erfindet keine neue Parallelstruktur.

Naechster sinnvoller Schritt: die drei Mini-Reisen als kleines Lehrkraft-Set sichtbar zusammenfassen, zum Beispiel mit Status `bereit`, `braucht mehr bekannte Einheiten`, `noch nicht zeigen`. Danach kann man gezielt weitere Wortfamilien hinzufuegen, ohne dass der Kindermodus wieder ueberladen wirkt.
