# Alpha 48B – Aktuellen Leseschritt klarer markieren

## Ergebnis
- Implementiert wurde genau die kleinste sichere Empfehlung aus `reports/alpha-48a-reading-logic-audit.md`: Im Kinder-Tagespfad zeigt die bestehende Leseleiter nun zusätzlich zum aktuellen Schritt auch den nächsten Schritt in kurzer Form.
- Es wurden keine neuen Lerninhalte, keine neue Route, keine neue Auswahl und keine neue Speicherung eingeführt.

## Geänderte Dateien
- `src/App.tsx`
  - `GuidedReadingPath` berechnet jetzt `nextStep` aus der bestehenden `chain.steps`-Reihenfolge.
  - Die Statuszeile bleibt ruhig und zeigt: `Jetzt lesen: {currentStep.label}` und `Danach: {nextStep.label}`.
  - Die bestehende Schrittleiste markiert den aktuellen Schritt wie bisher und den unmittelbar nächsten Schritt zusätzlich mit `child-progress-pill next`.
- `src/styles.css`
  - Kleine visuelle Ergänzungen für `.child-progress-next` und `.child-progress-pill.next`.
  - Die nächste Stufe ist bewusst zurückhaltender als der aktuelle Schritt gestaltet.
- `tests/lesewerk-content.test.mjs`
  - Neuer fokussierter Alpha-48B-Test für aktuellen/nächsten Schritt, unveränderte Reihenfolge und Sicherheitswörter.

## TDD
- RED: Zuerst wurde der Test `Alpha 48B child path marks current and next reading step without changing the route` ergänzt.
- Der Test schlug erwartungsgemäß fehl, weil `nextStep`, `Danach: ...` und `.child-progress-pill.next` noch nicht existierten.
- GREEN: Danach wurden nur die minimalen App-/CSS-Änderungen umgesetzt.
- Anschließend wurde ein älterer Alpha-41B-Test kompatibel gehalten, indem die vorhandene Formulierung `Jetzt lesen:` erhalten blieb.

## Tests und Build
- `npm test -- --test-name-pattern="Alpha 48B"`
  - RED-Lauf: erwarteter Fehlschlag beim neuen Alpha-48B-Test.
  - Nach Implementierung: Alpha-48B bestand.
- `npm test`
  - Ergebnis: 148/148 Tests bestanden.
- `npm run build`
  - Ergebnis: erfolgreich (`tsc -b && node scripts/build.mjs`).

## Smoke-Test
- Lokaler Dist-Server gestartet mit:
  - `python3 -m http.server 5174 -d dist --bind 127.0.0.1`
- Browser geöffnet unter:
  - `http://127.0.0.1:5174/`
- Desktop-Smoke bestätigt:
  - App lädt ohne Blank Screen.
  - Kinderpfad ist sichtbar.
  - Leseleiter zeigt `Jetzt lesen: Bild` und `Danach: Silbe`.
  - Reihenfolge bleibt `Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbrücke`.
- Hinweis: Ein erster Versuch mit `npm run dev -- --host 127.0.0.1` scheiterte, weil das bestehende Script intern `python3 -m http.server` nutzt und `--host` dort kein gültiges Argument ist. Danach wurde der sichere lokale Dist-Server direkt genutzt.
- Server wurde nach dem Smoke-Test beendet (`kill 25325`).

## Sicherheitscheck
- Keine echten Schülerdaten, Namen, Fotos, Diagnosen oder Familieninformationen.
- Keine Score-, Timer-, Ranking-, Prozent-, Punkte- oder Diagnoseelemente.
- Keine Cloud-, Login-, Upload-, Export- oder Fetch-Funktion.
- Keine neuen externen/protected Assets.
- Keine automatische Übertragung aus der Lehrkraftsicht.
- Keine Änderung an `getChildOrientationSteps`, `getProgressionPathForProfile` oder der Tagespfad-Route.

## Rest-Risiko
- Mobile wurde nicht per echter Viewport-Umstellung geprüft, weil das verfügbare Browser-Tool hier keine explizite Resize-Funktion bereitstellt. Die bestehende mobile CSS-Regel für `.child-progress-strip` blieb unverändert und wird weiterhin durch vorhandene Tests abgedeckt.
- Die neue nächste-Stufe-Markierung ist visuell absichtlich dezent; falls sie im realen Tablet-Einsatz zu schwach wirkt, wäre der nächste kleinste Schritt nur eine leichte Kontrastanpassung, keine neue Funktion.

## Codex Review 2026-05-19
- `npm test`: bestanden, 148/148 Tests grün.
- `npm run build`: bestanden.
- Unabhängiger Browser-Smoke mit Chrome/Playwright über `http://127.0.0.1:4381/`: Desktop `1280x900` und Mobile `390x844` bestanden.
- Beide Viewports zeigen `Jetzt lesen: Bild` und `Danach: Silbe`; die aktuelle Stufe ist `Bild`, die nächste Stufe ist `Silbe`.
- ARIA bleibt passend: `Aktueller Leseschritt 1 von 6: Bild`.
- Kein horizontaler Overflow, keine JavaScript-Fehler, keine relevanten HTTP-Fehler, keine unsafe Wörter zu Score, Ranking, Diagnose, Timer, Cloud, Login, Upload oder Export.
- Der temporäre Preview-Server wurde nach der Prüfung beendet.
