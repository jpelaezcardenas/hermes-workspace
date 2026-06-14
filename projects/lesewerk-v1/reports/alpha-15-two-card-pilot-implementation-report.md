# Alpha 15 Slice B – Zwei-Karten-Pilotmodus Implementation

Datum: 2026-05-17
Status: Von Hermes umgesetzt, von Codex nachgeprüft und freigegeben

## Kurzfazit

Der 2-Karten-Pilotmodus ist implementiert und funktioniert in der Browserprüfung. Die Blockade entstand durch das Hermes-Iterationslimit, nicht durch einen bestätigten App-Fehler. Codex hat den offenen UI-Punkt gezielt nachgeprüft, eine kleine semantische Bereinigung vorgenommen und danach Tests, Build und Browserablauf erfolgreich verifiziert.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-15-two-card-pilot-implementation-report.md`

## Umsetzung

Ergänzt wurde:

- `getTwoCardPilotPath(...)` mit genau zwei bestehenden Aufgaben:
  - `a-ball`
  - `a-tasse`
- `getTwoCardPilotSupport(...)` mit ruhigen Start-Hilfen:
  - Bildhilfe
  - Silbenfarben
  - Weniger Auswahl
- ein eigener `pilotMode` mit `pilotCardIndex`;
- Start im Lehrerbereich über `Pilot starten: nur 2 Karten`;
- Kinderpfad mit `Heute nur zwei Karten`, `Pilotkarte 1 von 2` und `Pilotkarte 2 von 2`;
- Pilot-Feedback nach Karte 1 mit `Weiter zur zweiten Karte`;
- ruhiger Abschluss nach Karte 2 mit `Du hast zwei Karten in Ruhe gelesen. Jetzt ist Pause.`;
- sekundäre Vollbibliothek im Pilot: nicht primär geöffnet, nur als Hinweis;
- fokussierte Tests für Pfad, Hilfen, UI-Texte und Sicherheitsgrenzen.

## Codex-Nachkorrektur

Hermes hatte im Start des Pilotmodus zusätzlich `selectedDailyPathIds` auf zwei Kuratierungs-IDs gesetzt. Da der Pilotmodus bereits einen eigenen Pfad nutzt, war das semantisch unnötig und konnte die normale Tagesweg-Kuratierung mit dem Pilotmodus vermischen.

Codex hat diese Zeile entfernt. Der Pilot läuft jetzt klar als eigener 2-Karten-Pfad und lässt die normale Tagesweg-Auswahl unberührt.

## Verifikation

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 67 bestanden, 0 fehlgeschlagen, 0 TODO
- `npm run build`: erfolgreich

Browserprüfung über lokalen statischen Server:

```text
http://127.0.0.1:53215/
```

Geprüfter Ablauf:

1. App öffnen.
2. In den Lehrerbereich wechseln.
3. `Pilot starten: nur 2 Karten` klicken.
4. Kinderpfad zeigt `Heute nur zwei Karten`, `Pilotkarte 1 von 2`, `Ball` und `Tasse`.
5. `Ich bin fertig` führt zu `Weiter zur zweiten Karte`.
6. Zweite Karte zeigt `Pilotkarte 2 von 2` und `Tasse`.
7. Zweites `Ich bin fertig` führt zum Abschluss mit `Du hast zwei Karten in Ruhe gelesen. Jetzt ist Pause.`

Zusätzlich geprüft:

- Desktop-Viewport: Start des 2-Karten-Pilots sichtbar und korrekt.
- Narrow/Mobile-Viewport: Start des 2-Karten-Pilots sichtbar und korrekt.

Hinweis: Eine harmlose 404-Meldung für eine Nebenressource trat einmal im Browsercheck auf. Es gab keinen App-Abbruch und keine JavaScript-Fehler im geprüften Flow.

## Entscheidung

Slice B ist akzeptiert.

Der ursprüngliche Blocker `Iteration budget exhausted` ist nach Codex-Prüfung erledigt. Die Umsetzung kann an die GE-First-Use-Review-Slice weitergegeben werden.

## Rest-Risiken

- Kein echter iPad-/Touch-Test im Klassenzimmer.
- Kein Test mit einem realen Kind.
- Der Pilotmodus ist bewusst sehr klein; Wiederholen innerhalb des Pilots bleibt auf `Pilot noch einmal starten` nach Abschluss begrenzt.
- Die App bleibt ein lokaler Demo-Stand, keine Produkt- oder Diagnosefreigabe.
