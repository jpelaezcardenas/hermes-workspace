# Alpha 37B - Lehrkraftfluss präzisieren

## Kurzfazit
Alpha 37B wurde umgesetzt und nach dem Hermes-Iterationslimit von Codex abgeschlossen. Die Lehrkraftlogik trennt jetzt klarer zwischen Serien-Vormerkung und Tagesweg-Aktivierung. Der Kinderpfad bleibt unverändert, bis die Lehrkraft den Tagesweg bewusst übernimmt.

## Geänderte Dateien
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-37b-implementation-report.md`

## Umsetzung
- Serienpanel von `wählen/markieren` auf `vormerken` umgestellt.
- Serienstatus lautet jetzt `Vorgemerkt – noch nicht im Tagesweg`.
- Serienhinweis erklärt direkt: Vormerkung schreibt nicht in den Tagesweg.
- Tagesweg-Button lautet jetzt `Tagesweg übernehmen und aktivieren`.
- Statusmeldungen unterscheiden klar zwischen Vorschlag, Übernahme und Verwerfen.
- Sichtbare Lehrkraftsprache wurde an zwei Stellen von `Diagnose` auf `Zuschreibung` bzw. `Einordnung` geglättet.
- Mobile-Feinschliff: Serienkarten haben auf kleinen Viewports weniger Innenabstand; lange Vormerk-Buttons umbrechen sauber und nutzen die volle Kartenbreite.

## Verifikation
- `npm test`: bestanden, 138/138.
- `npm run build`: bestanden.
- Desktop-Smoke mit Chrome 1280x900: bestanden.
- Mobile-Smoke mit Chrome 390x844: bestanden.
- Serienpanel: 4 Serien sichtbar.
- Vormerken: Status sichtbar.
- Kinderpfad: keine Serien-/Lehrkraftlogik im Kinderbereich sichtbar.
- Layout: keine horizontale Überbreite.
- Browser: keine JS-Fehler, keine relevanten HTTP-Fehler.
- Sichtbare Safety-Wörter: kein `Diagnose`, `Score`, `Ranking`, `Punkte`, `Prozent` im geprüften App-Body.

## Hinweise
Der einzige HTTP-404 im lokalen Server war `favicon.ico`; für die App-Funktion nicht relevant. Lokaler Prüfserver wurde nach der Kontrolle beendet.

## Nächster Schritt
Alpha 37C sollte als Watchdog prüfen, ob die neue Sprache im Lehrkraftfluss wirklich intuitiver wirkt und ob die Mobile-Ansicht der Serienkarten ausreichend ruhig bleibt.
