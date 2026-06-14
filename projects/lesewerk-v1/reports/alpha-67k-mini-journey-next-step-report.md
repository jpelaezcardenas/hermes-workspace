# Alpha 67K - Mini-Reisen naechster kleiner Schritt

Status: abgeschlossen am 2026-05-20

## Ergebnis

Die Lehrkraft-Bereitschaftsuebersicht zeigt jetzt nicht nur den Status der Mini-Reisen, sondern auch einen konkreten naechsten kleinen Schritt.

Beispiele:

- Mama bereit: `Naechster kleiner Schritt: Reise ruhig gemeinsam anbieten.`
- Sofa braucht Einheiten: `Naechster kleiner Schritt: erst s, o, f oder so/fa gemeinsam sichern.`
- Tasse noch nicht zeigen: `Naechster kleiner Schritt: erst tas/se und einen kurzen Satz gemeinsam vorbereiten.`

Damit wird aus der Statusanzeige eine direkte Unterrichtshilfe.

## Umsetzung

- `getMiniJourneyReadinessOverview(...)` liefert jetzt `nextSmallStep`.
- Die Empfehlung wird aus der bestehenden Mini-Reisen-/Materialpaket-Logik abgeleitet.
- Keine neue Diagnose- oder Bewertungslogik.
- Die Empfehlung erscheint nur im Lehrkraftbereich der Mini-Reisen-Bereitschaft.
- Kind-Fokus bleibt unveraendert und enthaelt keine Bereitschafts- oder Gating-Texte.

## Verifikation

- `npm test -- --run`: 190/190 Tests gruen.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow in Lehrkraftuebersicht oder Kind-Fokus.
- `Naechster kleiner Schritt`, `braucht Einheiten`, `noch nicht zeigen` und `Mini-Reisen-Gating` erscheinen nicht im Kind-Fokus.

## Browser-Smoke

Gepruefter Ablauf:

1. App oeffnen.
2. Lehrkraftbereich oeffnen.
3. `Mini-Reisen Bereitschaft` sichtbar.
4. Empfehlungen fuer Mama, Sofa und Tasse sichtbar.
5. Preset `Satz bereit` aktualisiert die Empfehlungen.
6. Tasse-Mini-Reise starten.
7. Kind-Fokus bleibt frei von Lehrkraft-Status und Empfehlungen.

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67k-desktop-readiness-next-step-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67k-desktop-readiness-next-step-all-ready.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67k-desktop-child-clean.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67k-mobile-readiness-next-step-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67k-mobile-readiness-next-step-all-ready.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67k-mobile-child-clean.png`

## Bewertung

Das ist ein wichtiger Schritt Richtung echte Unterrichtstauglichkeit. Die Lehrkraft sieht nicht nur, ob etwas bereit ist, sondern bekommt sofort eine kleine, machbare Vorbereitungshandlung. Das passt gut zum GE-Kontext, weil es kleinschrittig bleibt und den Kindermodus nicht belastet.

Naechster sinnvoller Schritt: aus diesen Mini-Schritten kleine vorbereitende Micro-Uebungen bauen, die noch vor der eigentlichen Mini-Reise angeboten werden koennen.
