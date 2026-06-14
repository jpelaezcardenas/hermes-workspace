# Alpha 47B – Hilfeblock visuell beruhigen

## Kurzfazit
Alpha 47B setzt exakt den kleinsten sicheren Schritt aus Alpha 47A um: Die geöffnete Supportkarte wird nur per CSS kompakter. Verhalten, Support-Auswahl, Inhalte und Sicherheitsgrenzen bleiben unverändert.

## Geänderte Dateien
- `tests/lesewerk-content.test.mjs`
  - Neuer fokussierter TDD-Test: `Alpha 47B keeps optional help manual while compacting only the open support card`.
  - Prüft, dass der Hilfebereich weiterhin ein manuelles `details`-Element bleibt, `Hilfe ist freiwillig.` sichtbar bleibt und keine unsafe Wörter oder neue Funktionalität im Supportbereich auftauchen.
  - Prüft die neuen CSS-Invarianten für die geöffnete Karte.
- `src/styles.css`
  - Neue rein visuelle Regeln für `.support-choice-card[open]`:
    - `padding: 12px 14px;`
    - Hinweistext-Margin `2px 0 10px;`
    - `.support-grid` im geöffneten Zustand mit `margin-top: 10px;`

## TDD-Ergebnis
1. RED: Neuer Alpha-47B-Test wurde vor der Implementierung ergänzt und lief zunächst fehl, weil `.support-choice-card[open]` noch keine kompakteren CSS-Regeln hatte.
2. GREEN: Minimaler CSS-Block ergänzt; danach bestand der fokussierte Test.

## Verifikation
- `npm test -- --test-name-pattern="Alpha 47B"`
  - Ergebnis: 147/147 Tests bestanden.
  - Hinweis: Der Node-Test-Runner führte trotz Pattern die gesamte Datei aus; der neue Alpha-47B-Test bestand.
- `npm test`
  - Ergebnis: 147/147 Tests bestanden.
- `npm run build`
  - Ergebnis: erfolgreich (`tsc -b && node scripts/build.mjs`).

## Browser-/Smoke-Check
- Lokaler Server auf Port 5174 gestartet: `python3 -m http.server 5174 -d dist --bind 127.0.0.1`.
- Desktop-Browser-Check über `http://127.0.0.1:5174/`:
  - Seitentitel: `LeseWerk V1`.
  - Hilfebereich gefunden.
  - `details.support-choice-card` manuell geöffnet.
  - Sichtbar/DOM geprüft:
    - Summary: `Hilfe wählen`
    - Hinweis: `Hilfe ist freiwillig.`
    - Padding geöffnet: `12px 14px`
    - Abstand zur Support-Grid: `10px`
    - Support-Buttons bleiben mindestens 64px hoch.
    - Kein unsafe Text zu Score, Ranking, Punkten, Diagnose, Timer, Cloud, Login, Upload oder Export im geprüften DOM.
- Mobile-Smoke mit Playwright konnte nicht abgeschlossen werden:
  - Befehl: temporäres Playwright-Script mit Viewport 390x844.
  - Fehler: Playwright-Browser fehlt lokal: `Executable doesn't exist ... chromium_headless_shell...` mit Hinweis `npx playwright install`.
  - Es wurden keine Installationen nachgezogen, weil das über den kleinen Alpha-47B-Scope hinausgeht.
  - Mobile-Ersatzprüfung: CSS/DOM-Invarianten und Viewport-Meta (`width=device-width, initial-scale=1.0`) wurden browserseitig geprüft; echter Mobile-Screenshot bleibt offen.

## Safety-Check
- Keine neuen Inhalte, Aufgaben, Symbole oder Lernpakete ergänzt.
- Keine automatische Support-Auswahl ergänzt.
- Keine Änderung an `setSupport`, Tagesweg-Übernahme, Speicherung, Export, Upload, Login oder Cloud-Funktionen.
- Keine realen Lernenden-, Schüler-, Eltern- oder Diagnosedaten verarbeitet.
- Keine Scores, Timer, Rankings, Noten, Prozentwerte oder Diagnosen eingeführt.
- Keine externen oder geschützten Assets eingeführt.

## Grenzen / Restunsicherheit
- Die Änderung ist bewusst klein und visuell. Sie macht den geöffneten Supportblock kompakter, ersetzt aber keinen echten Tablet-/Kinder-Test.
- Ein echter mobiler Playwright-Smoke ist erst möglich, wenn der lokale Playwright-Browser installiert ist oder ein vorhandener Browserpfad konfiguriert wird.
- Zu starke Verdichtung wurde vermieden: Button-Höhen bleiben unverändert; nur Innenabstand und vertikale Abstände der geöffneten Karte wurden reduziert.

## Codex Review 2026-05-19
- `npm test`: bestanden, 147/147 Tests grün.
- `npm run build`: bestanden.
- Unabhängiger Browser-Smoke mit Chrome/Playwright über `http://127.0.0.1:4380/`: Desktop `1280x900` und Mobile `390x844` bestanden.
- Geöffnete Supportkarte zeigt `Hilfe ist freiwillig.`, nutzt `padding: 12px 14px`, Absatz-Margin `2px 0px 10px`, Support-Grid-Abstand `10px`.
- Support-Buttons bleiben in beiden Viewports groß genug bedienbar; kein horizontaler Overflow, keine JavaScript-Fehler, keine relevanten HTTP-Fehler.
- Der temporäre Preview-Server wurde nach der Prüfung beendet.

## Nächster sinnvoller Schritt
Codex/Reviewer sollte die kleine CSS-Änderung visuell gegenprüfen, besonders auf einem schmalen echten Browserfenster oder Tablet. Wenn die Karte dort weiterhin gut lesbar ist, kann Alpha 47B als abgeschlossen gelten.
