# Alpha 16 Slice B – Praxis-Pilotkarte Implementation

Datum: 2026-05-17
Status: Implementiert, Tests und Build bestanden, Review erforderlich

## Kurzfazit

Die Praxis-Pilotkarte wurde im Lehrerbereich direkt unter dem 2-Karten-Pilotmodus ergänzt. Sie bleibt kompakt, lokal, anonym und nicht-diagnostisch und enthält genau die drei geforderten Prompts.

## Geänderte Dateien

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-16-practice-card-implementation-report.md`

## Umsetzung

Ergänzt wurde:

- eine neue Karte `Praxis-Pilotkarte` direkt nach dem Block `2-Karten-Pilotmodus`;
- ein kurzer Hinweis: nur Sichtbares festhalten, keine Namen, keine Diagnose, keine Speicherung;
- drei einfache lokale Textfelder ohne React-State, ohne Export, ohne Datei, ohne Upload und ohne automatische Speicherung;
- responsive Styles: drei Spalten auf breitem Bildschirm, zwei Spalten unter 1100 px, eine Spalte auf schmalem Viewport;
- ein fokussierter Inhalts-/Sicherheitstest für die Alpha-16-Karte.

Die drei Prompts lauten exakt:

- `Start gelungen?`
- `Welche Hilfe wurde genutzt?`
- `Nächster kleinster Schritt?`

## Verifikation

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 68 bestanden, 0 fehlgeschlagen, 0 TODO
- `npm run build`: erfolgreich

Browserprüfung nach Build:

- Lokaler Server: `http://127.0.0.1:53217/`
- Desktop-Check: Lehrerbereich geöffnet; Praxis-Pilotkarte sichtbar; drei Prompts sichtbar; keine Browser-Console-Fehler.
- Narrow-Check: per 390-px-Iframe im Browser geprüft; Praxis-Pilotkarte sichtbar; Promptgrid berechnet auf eine Spalte (`256px`); kein horizontaler Overflow (`scrollWidth: 386`, `frameWidth: 386`).

Hinweis: Port `4173` war bereits belegt, deshalb wurde für die Browserprüfung `53217` genutzt.

## Datenschutz- und GE-Check

- Keine echten Namen oder Klassenlisten ergänzt.
- Keine Diagnose-, Score-, Timer-, Ranking- oder Bewertungslogik ergänzt.
- Keine neue Speicherung, kein Export, kein Download, kein PDF, kein Upload, keine Cloud, kein Login, keine Datenbank.
- Die Textfelder sind nur lokale Browser-Eingaben ohne App-State und ohne Persistenz.

## Rest-Risiken

- Kein echter iPad-/Touch-Test mit realem Gerät im Klassenraum.
- Die Textfelder werden im Browser angezeigt, aber nicht gespeichert; das ist absichtlich so und sollte im Review bestätigt werden.
- Codeänderung braucht gemäß Kanban-Vorgabe menschliches Review, bevor die Aufgabe abgeschlossen wird.
