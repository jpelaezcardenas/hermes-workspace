# Alpha 12 - Teacher UI Hierarchy Report

Datum: 2026-05-17
Status: Slice B umgesetzt und lokal geprüft

## Ziel

Alpha 12 verfeinert die visuelle Hierarchie im Lehrkraftbereich, ohne Alpha-11-Verhalten oder Datenmodell zu erweitern.

## Geänderte Dateien

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-12-teacher-ui-report.md`

## Umsetzung

- Header auf `LeseWerk Alpha 12 · lokale Demo` aktualisiert.
- Im Lehrkraftbereich steht `Tagesweg wählen` jetzt zuerst und nutzt die zusätzliche Klasse `teacher-primary-card`.
- Der bestehende Vorschlagsblock bleibt vollständig erhalten, steht aber nach der Tagesweg-Curation und nutzt `teacher-secondary-card` mit ruhigerer Fläche, schwächerem Rahmen und kompakterer Überschrift.
- Pilot-Protokoll, Beobachtungskarte und lokale Druckvorschau nutzen `teacher-tertiary-card` und treten optisch zurück.
- Tablet-/Mobile-CSS ergänzt: Lehrkraftbereich bekommt schmalere Innenabstände, Vorschlagsaktionen werden unter 760px einspaltig, Primary/Tertiary-Flächen werden unter 640px kompakter.

## Bewusst nicht geändert

- Keine neuen Features.
- Keine neuen Datenquellen oder Inhalte.
- Keine automatische Übernahme des Vorschlags.
- Keine Änderung an Max-four-Regel, Reset, Ignorieren oder lokaler/anonymer Arbeitsweise.
- Kinderpfad bleibt funktional unverändert; nur die Alpha-Kennung wurde aktualisiert.

## Verifikation

Ausgeführt:

- `npm test`
- `npm run build`
- Browser-Check Desktop über lokale `dist`-Version auf Port 4273

Ergebnis:

- `npm test`: 56/56 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Check Desktop: Alpha-12-Kennung sichtbar; Lehrkraftbereich zeigt Tagesweg-Curation vor Vorschlag; Vorschlagsblock wirkt sekundär; keine sichtbaren Textüberläufe im Desktop-Viewport.

Hinweis: Narrow-Viewport-Verhalten wurde in diesem Slice per fokussiertem CSS-Source-Test für 760px/640px-Marker abgesichert. Die verfügbare Browser-Session ließ sich nicht auf einen schmalen Viewport umstellen.

## Entscheidung

Accept for Slice C: Interaktion, Fokusführung und tatsächlicher Narrow-Viewport sollten dort noch einmal gezielt geprüft werden.
