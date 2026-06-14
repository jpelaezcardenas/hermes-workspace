# Alpha 67J - Mini-Reisen Bereitschaft

Status: abgeschlossen am 2026-05-20

## Ergebnis

Die Lehrkraftansicht zeigt jetzt eine kompakte Bereitschaftsuebersicht fuer die Mini-Reisen:

- Mama
- Sofa
- Tasse

Jede Reise bekommt einen ruhigen Status:

- `bereit`
- `braucht Einheiten`
- `noch nicht zeigen`

Die Begruendung wird aus den vorhandenen bekannten Graphemen, Silben und der Satzbereitschaft abgeleitet. Der Kindermodus bleibt unveraendert und bekommt diese Lehrkraftuebersicht nicht angezeigt.

## Umsetzung

- Neuer Helper `getMiniJourneyReadinessOverview(profile, tasks)`.
- Die Uebersicht nutzt die bestehende Mini-Reisen- und Materialpaket-Logik als Quelle.
- Keine parallele neue Diagnose- oder Bewertungslogik.
- Lehrkraftbereich zeigt eine kleine Karte pro Mini-Reise.
- Fehlende Einheiten werden knapp benannt, zum Beispiel Grapheme, Silben oder Satzbereitschaft.
- CSS fuer ruhige Statuskarten ergaenzt.

## Verifikation

- `npm test -- --run`: 189/189 Tests gruen.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Lehrkraftuebersicht oder Kind-Fokus.
- Kind-Fokus enthaelt keine Begriffe aus der Bereitschaftsuebersicht.

## Browser-Smoke

Gepruefter Ablauf:

1. App oeffnen.
2. Lehrkraftbereich oeffnen.
3. `Mini-Reisen Bereitschaft` ist sichtbar.
4. Startprofil zeigt Mama bereit, Sofa braucht Einheiten, Tasse noch nicht zeigen.
5. `Sofa-Pfad` aktualisiert Sofa auf bereit.
6. `Satz bereit` macht Mama, Sofa und Tasse bereit.
7. Tasse-Mini-Reise startet.
8. Kind-Fokus zeigt keine Lehrkraftuebersicht.

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67j-desktop-readiness-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67j-desktop-readiness-all-ready.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67j-desktop-child-clean.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67j-mobile-readiness-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67j-mobile-readiness-all-ready.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67j-mobile-child-clean.png`

## Bewertung

Das ist ein starker Strukturgewinn. Die App wird dadurch nicht nur groesser, sondern besser steuerbar: Die Lehrkraft sieht sofort, warum eine Mini-Reise passt oder noch nicht passt. Fuer den GE-Kontext ist das wichtig, weil der Kindermodus ruhig bleibt und die didaktische Entscheidung im Erwachsenenbereich liegt.

Naechster sinnvoller Schritt: aus dieser Uebersicht heraus eine kleine `naechster kleinster Schritt`-Empfehlung bauen, zum Beispiel: `erst tas und se sichern`, bevor Tasse gezeigt wird.
