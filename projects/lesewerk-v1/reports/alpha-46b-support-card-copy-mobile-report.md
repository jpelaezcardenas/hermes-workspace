# Alpha 46B – Hilfekarte knapper und mobiler

## Ergebnis
- Die Hilfekarte im Kinderpfad nutzt jetzt die kürzere Copy: `Hilfe ist freiwillig.`
- Die Hilfe bleibt weiterhin manuell, optional und im bestehenden `details`-Bereich `Hilfe wählen`.
- Es wurden keine neuen Hilfen, Inhalte, Icons, Assets, Speicherungen, Diagnosen, Scores, Timer, Rankings, Logins, Exporte, Uploads oder Cloud-Funktionen ergänzt.

## Geänderte Dateien
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-46b-support-card-copy-mobile-report.md`

## Rationale
Alpha 46A empfahl als kleinste sichere Verbesserung, die mobile Hilfekarten-Copy von `Hilfen sind freiwillig. Nimm Hilfe, wenn du magst.` auf `Hilfe ist freiwillig.` zu kürzen. Das reduziert Leselast und Scan-Aufwand, ohne Verhalten oder Struktur zu ändern.

## TDD
1. Test zuerst angepasst: Der bestehende Support-Test erwartet jetzt `Hilfe ist freiwillig.` und verbietet die alte längere Zusatzformulierung `Nimm Hilfe, wenn du magst`.
2. RED geprüft: `npm test -- --test-name-pattern "Alpha 45B"` schlug erwartungsgemäß fehl, weil die App noch die alte längere Copy enthielt.
3. GREEN umgesetzt: Nur die Copy in `src/App.tsx` wurde gekürzt.
4. Bestehender Alpha-43B-Test wurde anschließend auf dieselbe neue kurze Support-Sprache aktualisiert, damit die ältere Guard nicht die bewusst gekürzte Copy zurückfordert.

## Tests und Build
- `npm test -- --test-name-pattern "Alpha 45B"`: erst RED mit 1 erwarteten Fehler, danach der Alpha-45B-Test grün; dabei zeigte ein älterer Alpha-43B-Guard noch auf die alte Copy.
- `npm test`: bestanden, 146/146 Tests grün.
- `npm run build`: bestanden.

## Smoke
- Desktop-Browser-Smoke über `http://localhost:4173/`: Supportkarte geöffnet; Text enthält `Hilfe ist freiwillig.`; alte Zusatzformulierung ist nicht sichtbar; keine unsafe Wörter wie Score, Ranking, Diagnose, Timer, Cloud, Login, Upload oder Export in der Supportkarte.
- Mobile-Smoke: Playwright wäre verfügbar, aber der lokale Playwright-Browser fehlt (`npx playwright install` wäre nötig). Keine Installation durchgeführt, weil das nicht Teil der Aufgabe war. Eine echte mobile Browserausführung war deshalb in diesem Run nicht möglich.
- Ergänzende mobile Plausibilität: Es wurde keine Struktur oder Breite verändert; nur ein Satz wurde gekürzt, wodurch die mobile Leselast sinkt.

## Codex Review 2026-05-19
- `npm test`: bestanden, 146/146 Tests grün.
- `npm run build`: bestanden.
- Unabhängiger Browser-Smoke mit Chrome/Playwright über `http://127.0.0.1:4379/`: Desktop `1280x900` und Mobile `390x844` bestanden.
- In beiden Viewports wurde die Supportkarte geöffnet; `Hilfe ist freiwillig.` ist sichtbar, die alten Formulierungen `Nimm Hilfe, wenn du magst` und `Hilfen sind freiwillig` sind nicht mehr sichtbar.
- Kein horizontaler Overflow, keine JavaScript-Fehler, keine relevanten HTTP-Fehler. Der temporäre Preview-Server wurde danach beendet.

## Safety
- Keine personenbezogenen Daten.
- Keine Diagnostik- oder Leistungsbewertung.
- Keine automatische Hilfe, keine neue Speicherung, kein Export, kein Upload.
- Unterstützungsverhalten bleibt optional und manuell.

## Grenzen
- Die zuerst von Hermes versuchte mobile Playwright-Ausführung scheiterte an einem lokalen Modulpfad. Codex hat die mobile Prüfung anschließend mit dem Hermes-Playwright-Modul und Chrome erfolgreich nachgeholt.
- Kein CSS-Refactor durchgeführt, weil die geforderte Alpha-46B-Verfeinerung ausdrücklich klein bleiben sollte und Alpha 46A primär die Copy-Kürzung empfohlen hatte.
