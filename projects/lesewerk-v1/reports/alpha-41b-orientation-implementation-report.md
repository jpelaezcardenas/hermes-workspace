# Alpha 41B – Kinderpfad Orientierung sichtbar verbessern

## Kurzfazit

Alpha 41B setzt genau eine kindseitige Orientierungsverbesserung um: eine kompakte Fortschrittsleiste im Kinderpfad. Sie zeigt dauerhaft den Weg Bild → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke und markiert den aktuellen Leseschritt mit „Jetzt lesen: …“.

## Geänderte Dateien

- `src/App.tsx`
  - `GuidedReadingPath` erhält eine neue `child-progress-strip` direkt unter der Leseleiter-Überschrift.
  - Die Leiste zeigt alle sechs Leseschritte als ruhige Pillen und nennt den aktuellen Schritt per ARIA-Label und sichtbarem Kurztext.
- `src/styles.css`
  - Neue Styles für `child-progress-strip` und `child-progress-pill`.
  - Mobile/tablet-freundliche horizontale Scrollbarkeit unter 760px, damit die Leiste kompakt bleibt und nicht quetscht.
- `tests/lesewerk-content.test.mjs`
  - Neuer TDD-Test: `Alpha 41B child path adds one compact current-step progression strip`.

## UX-Rationale

- Die bestehende Leseprogression war fachlich vorhanden, aber visuell verteilt.
- Die neue Leiste bündelt die Reihenfolge an einer sofort sichtbaren Stelle.
- Die Form bleibt bewusst klein: keine neuen Inhalte, keine zusätzliche Wortmenge, keine neue Auswahlentscheidung.
- Der Text bleibt kindnah und handlungsorientiert: „Mein Leseweg“ und „Jetzt lesen: Bild/Silbe/...“.
- Die vorhandene ausführlichere Leseleiter bleibt erhalten; die neue Leiste ist nur der schnelle Orientierungspunkt.

## Datenschutz und Sicherheitscheck

- Keine echten Lernenden-/Personendaten.
- Keine Namen, Diagnosen, Bewertungen, Punkte, Ranking, Timer oder Leistungsdruck.
- Keine externen Assets, geschützten Symbolbilder, Cloud-, Login-, Upload- oder Export-Funktionen.
- Kein automatischer Transfer aus Lehrkraftvorschau in den Kinderpfad.

## TDD und Tests

TDD-Zyklus:
1. Test für die neue Alpha-41B-Orientierungsleiste ergänzt.
2. Test gezielt laufen lassen: zunächst rot, weil `child-progress-strip` noch fehlte.
3. Minimale Implementierung in App und CSS ergänzt.
4. Test gezielt erneut laufen lassen: grün.

Verifikation:
- `npm test -- --test-name-pattern "Alpha 41B"` → bestanden, 142/142 im gefilterten Lauf berichtet, Alpha-41B-Test grün.
- `npm test` → bestanden, 142/142.
- `npm run build` → bestanden.

## Browser-Smoke

Desktop-Smoke:
- Lokaler Server: `python3 -m http.server 5174 --bind 127.0.0.1 --directory dist`
- URL: `http://127.0.0.1:5174/`
- Ergebnis: App lädt, Kinderpfad sichtbar, neue Leiste sichtbar mit „Mein Leseweg“, Bild/Silbe/Wort/Satz/Mini-Geschichte/Schreibbrücke und „Jetzt lesen: Bild“.
- Browser-Konsole: keine JS-Fehler.

Mobile-Smoke:
- Ein echter Browser-Viewport-Wechsel war mit dem verfügbaren Browser-Tool nicht zuverlässig möglich (`window.resizeTo` änderte die Viewportbreite nicht).
- Ersatzprüfung: CSS-Test deckt mobile Orientierung ab (`@media (max-width: 760px)` mit `overflow-x: auto` für `.child-progress-strip`).
- Offenes Limit: visuelle Endprüfung auf echtem Tablet/Handy oder per Browser-Tool mit Viewport-Steuerung nachholen, wenn verfügbar.

## Remaining Limits

- Die Leiste ist bewusst textbasiert. Es wurden keine Symbolassets ergänzt.
- Auf sehr schmalen Geräten soll die Leiste horizontal scrollen; das ist sicherer als zu kleine Schrift, braucht aber noch echte Device-Sichtprüfung.
- Die Änderung verbessert Orientierung, ersetzt aber keine pädagogische Begleitung durch die Lehrkraft.
