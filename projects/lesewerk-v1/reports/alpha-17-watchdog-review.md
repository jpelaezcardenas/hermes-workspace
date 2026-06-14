# Alpha 17 Slice D – Final Watchdog Review

Datum: 2026-05-17
Status: Accepted / nicht blockiert

## Kurzfazit

Alpha 17 ist abgeschlossen. Der Speicherfrei-Hinweis wurde direkt an der Praxis-Pilotkarte ergänzt, der reale Tablet-Pilot-Abgleich liegt als Checkliste vor, und Hermes hat eine kritische Anschluss-Empfehlung formuliert.

Der finale Watchdog musste von Codex abgeschlossen werden, weil Hermes beim Narrow-Check am Iterationslimit hängenblieb. Codex hat temporäre Check-Dateien entfernt, Tests und Build erneut ausgeführt, einen echten 390px-Browsercheck per Playwright gemacht und den Datenschutz-/Safety-Scan wiederholt.

## Geänderte Dateien

- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-17-goal-prompt.md`
- `reports/alpha-17-no-storage-hint-report.md`
- `reports/alpha-17-real-tablet-pilot-checklist.md`
- `reports/alpha-17-hermes-next-phase-recommendation.md`
- `reports/alpha-17-watchdog-review.md`

## Was Alpha 17 ergänzt hat

An der Praxis-Pilotkarte steht nun sichtbar:

`Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.`

Außerdem wurde ein fokussierter Test ergänzt:

- `Alpha 17 practice card shows the exact no-storage hint`

Hermes hat zusätzlich erstellt:

- `reports/alpha-17-real-tablet-pilot-checklist.md`
- `reports/alpha-17-hermes-next-phase-recommendation.md`

## Tests

Ausgeführt:

```bash
npm test
```

Ergebnis:

- 69 Tests bestanden
- 0 fehlgeschlagen
- 0 TODO

Bewertung: Pass.

## Build

Ausgeführt:

```bash
npm run build
```

Ergebnis:

- `tsc -b` erfolgreich
- `node scripts/build.mjs` erfolgreich

Bewertung: Pass.

## Source-Level Privacy-/Content-Safety-Scan

Geprüft in `src`:

- Netzwerkzugriffe: `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`
- Export/Upload/Login: `new Blob`, `createObjectURL`, `download=`, `upload`, `Login`, `Passwort`, `E-Mail`, `Telefon`, `Datenbank`
- XSS-/Injection-Risiken: `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`
- Storage: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`
- stale Alpha-12-Sprache

Ergebnis:

- Netzwerk: 0 Treffer
- Export/Upload/Login: 0 Treffer
- XSS/Injection: 0 Treffer
- stale Alpha 12: 0 Treffer
- Storage: 3 Treffer, alle bestehendes `localStorage` für anonymes Demo-Profil

Bewertung: Pass with note.

Notiz:

`localStorage` wird weiterhin nur für die anonyme Profilwahl verwendet. Die Praxisnotizen werden nicht gespeichert.

## Browserchecks

Lokaler statischer Server:

```text
http://127.0.0.1:53219/
```

Desktop-Viewport:

- Praxis-Pilotkarte sichtbar
- Speicherfrei-Hinweis sichtbar
- 2-Karten-Pilot startet sichtbar
- kein horizontaler Overflow
- keine Browserfehler

Narrow-Viewport 390px:

- Praxis-Pilotkarte sichtbar
- Speicherfrei-Hinweis sichtbar
- 2-Karten-Pilot startet sichtbar
- `scrollWidth=390`, `clientWidth=390`
- kein horizontaler Overflow
- keine Browserfehler

Bewertung: Pass.

## Temporäre Dateien

Hermes hatte während eines unvollständigen Narrow-Checks temporär erzeugt:

- `tmp-narrow-check.html`
- `dist/narrow-check.html`

Codex hat beide Dateien entfernt. Danach wurden Tests und Build erneut erfolgreich ausgeführt.

## Hermes Anschluss-Empfehlung

Hermes empfiehlt als nächsten Schritt:

`Alpha 18 – Realer 2-Karten-Tablet-Pilot und Beobachtungsabgleich`

Top 3 laut Hermes:

1. Realer Pilot-Test mit kleinem Beobachtungsabgleich
2. Gezielt UI-/Touch-Polish aus dem Pilot ableiten
3. Barriere-/Zugänglichkeits- und Unterstützungsoptionen minimal prüfen

Explizit nicht empfohlen:

- neue Inhalte / Content Depth
- Speicherung, Export, PDF, Klassenlisten
- breites UI-Redesign
- Gamification, Scores, Timer, Rankings
- Cloud, Login, Upload, Datenbank, echte Schülerprofile

## Entscheidung

Accepted / nicht blockiert.

Begründung:

- Tests bestehen.
- Build besteht.
- Desktop- und Narrow-Browsercheck bestehen.
- Source-Scan findet keine neue Speicher-, Netzwerk-, Export-, Upload-, Login- oder XSS-Logik.
- Der neue Hinweis stärkt die Datenschutz- und Praxislinie.
- Die Tablet-Pilot-Checkliste und Hermes-Anschluss-Empfehlung sind erstellt.

## Verbleibende Risiken

- Es gab noch keinen echten physischen iPad-/Tablet-Test im Klassenraum.
- Es gab keinen Test mit realem Kind und realer Unterrichtsdynamik.
- Die Praxisnotizen sind bewusst flüchtig; Lehrkräfte müssen diesen Punkt verstehen.
- Keine externe Datenschutz-, Lizenz- oder Barrierefreiheitsprüfung.

## Alpha 18 Empfehlung

Alpha 18 sollte nicht weiterbauen, sondern echte Evidenz erzeugen:

`Alpha 18 – Realer 2-Karten-Tablet-Pilot und Beobachtungsabgleich`

Scope:

- Einen echten 10–15-Minuten-Pilot mit Tablet vorbereiten.
- Maximal 1–2 anonymisierte Durchläufe.
- Nur prüfen:
  - Start auffindbar?
  - Touch-Ziele passend?
  - Lesbarkeit aus Kindposition passend?
  - 2-Karten-Rahmen ruhig genug?
  - Speicherfrei-Hinweis verständlich?
- Danach einen Report schreiben:
  - `reports/alpha-18-real-pilot-observation-report.md`
- Aus dem Report genau einen nächsten technischen Fix ableiten.

Nicht tun:

- keine Speicherung,
- kein Export/PDF,
- keine Schülerverwaltung,
- keine neuen Inhalte,
- kein Redesign,
- keine Diagnostik.
