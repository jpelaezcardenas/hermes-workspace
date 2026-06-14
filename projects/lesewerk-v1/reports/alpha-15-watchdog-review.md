# Alpha 15 Slice D – Final Watchdog Review und Alpha 16 Empfehlung

Datum: 2026-05-17
Status: Accepted / nicht blockiert

## Kurzfazit

Alpha 15 ist als lokaler, teacher-led 2-Karten-Pilot akzeptiert. Der zentrale Zweck wurde erreicht: Die Lehrkraft kann einen kleinen Erstnutzungsmodus starten, das Kind liest genau zwei vorhandene Karten, die Vollbibliothek bleibt sekundär, und der Ablauf endet ruhig ohne Diagnose-, Score-, Timer- oder Leistungslogik.

Der vorherige Blocker war ein Hermes-Iterationslimit, kein bestätigter App-Blocker. Codex hat den offenen UI-Punkt nachgeprüft, eine kleine semantische Bereinigung vorgenommen und den finalen Watchdog abgeschlossen.

## Geprüfte Grundlage

Gelesen und berücksichtigt:

- `reports/alpha-15-goal-prompt.md`
- `reports/alpha-15-two-card-pilot-blueprint.md`
- `reports/alpha-15-two-card-pilot-implementation-report.md`
- `reports/alpha-15-ge-first-use-review.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Was Alpha 15 geändert hat

- Neuer 2-Karten-Pilotpfad über `getTwoCardPilotPath(...)`.
- Defaultkarten:
  - `a-ball`
  - `a-tasse`
- Ruhige Pilot-Hilfen über `getTwoCardPilotSupport(...)`:
  - Bildhilfe
  - Silbenfarben
  - Weniger Auswahl
- Lehrerbereich mit Startkarte `2-Karten-Pilotmodus`.
- Button: `Pilot starten: nur 2 Karten`.
- Kinderpfad im Pilot:
  - `Heute nur zwei Karten`
  - `Pilotkarte 1 von 2`
  - `Pilotkarte 2 von 2`
  - sekundäre Vollbibliothek
  - Abschluss nach genau zwei Karten.
- Tests erweitert auf 67 Tests.

Codex-Nachkorrektur:

- Eine unnötige Vermischung mit `selectedDailyPathIds` wurde entfernt. Der Pilotmodus läuft jetzt als eigener 2-Karten-Pfad und verändert die normale Tagesweg-Kuratierung nicht.

## Automatische Tests

Ausgeführt:

```bash
npm test
```

Ergebnis:

- 67 Tests bestanden
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
- XSS-/Injection-Risiken: `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`
- stale Alpha-12-Sprache
- unsafe Assessment-Sprache wie Score, Punkte, Rangliste, Note, Prozent, IQ, falsch, Fehler
- Storage: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`

Ergebnis:

- Netzwerk: 0 Treffer
- XSS/Injection: 0 Treffer
- stale Alpha 12: 0 Treffer
- unsafe Assessment: 0 Treffer
- Storage: 3 Treffer, alle bewusstes `localStorage` für anonymes Demo-Profil

Bewertung: Pass with note.

Notiz:

`localStorage` bleibt in diesem Stand akzeptabel, weil nur die anonyme Profilwahl gespeichert wird. Es dürfen dort keine echten Namen, Beobachtungsdaten oder diagnostische Informationen ergänzt werden.

## Browsercheck nach Build

Lokaler statischer Server:

```text
http://127.0.0.1:53216/
```

Geprüfter Flow:

1. App öffnen.
2. In den Lehrerbereich wechseln.
3. `Pilot starten: nur 2 Karten` klicken.
4. Kinderpfad zeigt:
   - `Heute nur zwei Karten`
   - `Pilotkarte 1 von 2`
   - `Ball`
   - `Tasse`
5. `Ich bin fertig` nach Karte 1 zeigt `Weiter zur zweiten Karte`.
6. Zweite Karte zeigt `Pilotkarte 2 von 2` und `Tasse`.
7. Zweites `Ich bin fertig` zeigt:
   - `Du hast zwei Karten in Ruhe gelesen. Jetzt ist Pause.`
   - `Pilot noch einmal starten`
   - `Zur Lehrkraft`

Desktop-Viewport:

- Start ok
- Feedback ok
- zweite Karte ok
- Abschluss ok
- keine Browserfehler

Narrow/Mobile-Viewport:

- Start ok
- Feedback ok
- zweite Karte ok
- Abschluss ok
- keine Browserfehler

Bewertung: Pass.

## GE-Review

`reports/alpha-15-ge-first-use-review.md` entschied:

- `Accept with minor notes`

Kernaussage:

- Der 2-Karten-Pilot reduziert Erstnutzungs-Komplexität.
- Der Einstieg ist teacher-led.
- Die Sprache bleibt einfach, respektvoll und nicht druckvoll.
- Die Vollbibliothek ist ausreichend sekundär.

## Entscheidung

Accepted / nicht blockiert.

Begründung:

- Tests bestehen.
- Build besteht.
- Desktop- und Narrow-Browserflow bestehen.
- Source-Scan findet keine Netzwerk-, XSS-, stale Version- oder Assessment-Blocker.
- GE-Review akzeptiert den Flow mit kleinen Praxisnotizen.
- Der 2-Karten-Pilot erfüllt das Alpha-15-Ziel ohne neue Diagnose-, Cloud-, Export-, Login- oder Schülerverwaltungslogik.

## Verbleibende Risiken

- Kein echter iPad-/Touch-Test mit realem Gerät im Klassenraum.
- Kein Test mit einem realen Kind.
- Keine externe Datenschutz-, Lizenz- oder Barrierefreiheitsprüfung.
- `localStorage` darf nicht auf Beobachtungsdaten oder personenbezogene Daten erweitert werden.
- Der Pilotmodus ist absichtlich klein; Wiederholung wird aktuell über `Pilot noch einmal starten` nach Abschluss geführt.

## Präzise Alpha-16-Empfehlung

Alpha 16 sollte kein neues großes Feature starten. Der beste nächste Schritt ist:

`Alpha 16 – Touch-/Praxis-Pilotkarte für Lehrkräfte`

Ziel:

- Eine sehr kompakte app-interne und druckbare Praxis-Checkliste für den echten 10–15-Minuten-Ersteinsatz auf Tablet/iPad.

Inhalt:

- Start gelungen?
- Welche Hilfe wurde sichtbar genutzt?
- Nächster kleinster Schritt?

Grenzen:

- keine Speicherung;
- keine Bewertung;
- keine Diagnose;
- keine echten Namen;
- keine neuen Inhalte;
- kein Export-/Cloud-System.

Warum:

Alpha 15 hat den App-Flow reduziert. Die wichtigste Restlücke ist jetzt nicht mehr App-Breite, sondern sichere Durchführung und Beobachtung im echten GE-Schulalltag.
