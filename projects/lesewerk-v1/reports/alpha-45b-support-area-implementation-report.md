# Alpha 45B – Hilfebereich ruhiger trennen

## Ergebnis

Der Hilfebereich im Kinderpfad wurde in zwei ruhigere Ebenen getrennt:

- `support-status-row`: zeigt aktive Hilfen und ggf. die Empfehlung als Statusbereich.
- `support-choice-card`: zeigt die manuelle Hilfeauswahl als eigene Karte.

Die Hilfen bleiben freiwillig und manuell. Es wurden keine neuen Hilfen, Inhalte, Workflows oder Automatiken ergänzt.

## Geänderte Dateien

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-45b-support-area-implementation-report.md`

## TDD-Nachweis

1. RED: Der Test `Alpha 45B separates optional support status from the main child reading action` wurde zuerst ergänzt und schlug erwartbar fehl, weil `support-status-row` und `support-choice-card` noch nicht existierten.
2. GREEN: `src/App.tsx` und `src/styles.css` wurden minimal angepasst.
3. Verifikation: Der Alpha-45B-Test, der volle Testlauf und der Build liefen danach erfolgreich.

## Verifikation

- `npm test`: 146/146 bestanden
- `npm run build`: bestanden
- Desktop-Smoke auf Port 4378: `support-status-row` und `support-choice-card` sichtbar, freiwilliger Hilfetext sichtbar, kein horizontaler Overflow, keine JS-/relevanten HTTP-Fehler
- Mobile-Smoke 390x844 auf Port 4378: gleiche Prüfung bestanden
- Preview-Server wurde gestoppt

## Safety

- Keine echten Lernendendaten
- Keine Diagnose-, Score-, Timer-, Ranking- oder Bewertungslogik
- Kein Login, keine Cloud, kein Upload, kein Export
- Keine externen oder geschützten Assets
- Keine automatische Übertragung aus der Lehrkraftvorschau

## Bewertung

Die Änderung verbessert die Lesbarkeit des Hilfebereichs, ohne fachliche Logik zu verändern. Für GE-Lernende ist die Trennung hilfreich, weil Status und Auswahl nicht mehr als ein einziger dichter Block wirken.

## Grenze

Die Hilfen bleiben textbasiert. Ein späterer Slice könnte prüfen, ob die Hilfebegriffe noch knapper oder stärker ikonisch gestützt werden sollten, ohne geschützte Symbolassets zu verwenden.
