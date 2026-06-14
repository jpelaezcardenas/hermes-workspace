# Alpha 43B – Kindersprache und Supports schärfen

## Kurzfazit
Alpha 43B setzt genau eine kleine Content-/Support-Änderung um: Die Kinderseite bekommt eine kurze, einheitliche Mikrocopy-Schicht für Einstieg, Hilfe und Schreibbrücke. Es wurden keine neuen Aufgaben, Inhalte, Assets, Speicher-/Cloudfunktionen oder Bewertungsmechaniken ergänzt.

## Geänderte Dateien
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-43b-content-support-implementation-report.md`

## Umgesetzte Änderung
Die längeren erklärenden Kindertexte wurden an drei Stellen durch kurze Handlungsimpulse ergänzt bzw. ersetzt:

1. Einstieg im Kinderpfad:
   - neu: `Schau. Klatsch. Lies.`
   - Ziel: sofortige Orientierung statt langer Schritt-Liste.

2. Hilfe-Schicht:
   - alt: `Tippe eine Hilfe an. Deine Hilfen bleiben sichtbar.`
   - neu: `Nimm Hilfe, wenn du magst.`
   - Ziel: Hilfe als Erlaubnis und Entlastung formulieren.

3. Schreibbrücke:
   - neu: `Lege oder spure das Wort.`
   - Ziel: die optionale Schreibbrücke als kleine Handlung statt als zweiter Unterrichtsblock ankündigen.

Die bestehende Lehrkraftvorschau, manuelle Steuerung, Tagespfad-Logik und vorhandene Aufgaben-/Storyinhalte wurden nicht verändert.

## TDD-Evidence
1. RED:
   - Test ergänzt: `Alpha 43B child path uses one short support-language layer instead of long explanations`
   - Befehl: `npm test -- --test-name-pattern "Alpha 43B child path"`
   - Ergebnis: erwarteter Fehlschlag, weil `Schau. Klatsch. Lies.` noch nicht im Kinderpfad vorhanden war und alte Langtexte noch existierten.

2. GREEN:
   - Minimaländerung in `src/App.tsx` umgesetzt.
   - Befehl: `npm test -- --test-name-pattern "Alpha 43B child path"`
   - Ergebnis: 144/144 Tests bestanden, inklusive Alpha-43B-Test.

3. Regression:
   - Befehl: `npm test`
   - Ergebnis: 144/144 Tests bestanden.

## Build
- Befehl: `npm run build`
- Ergebnis: bestanden (`tsc -b && node scripts/build.mjs`, Exit Code 0).
- Dist-Bundle enthält die neue Mikrocopy (`Schau. Klatsch. Lies.` wurde im gebauten `dist/assets/app.js` gefunden).

## Browser-/Smoke-Check
- Lokaler Smoke wurde über `http://127.0.0.1:5173/?v=alpha43b` geöffnet.
- Sichtprüfung: App lädt ohne Blank Screen; Browser-Check meldete kein horizontales Overflow im sichtbaren Desktop-Shell.
- Einschränkung: Auf Port 5173 lief bereits ein anderer lokaler Node-Server; der sichtbare Browser-Shell zeigte nicht zuverlässig den konkret geänderten Alpha-43B-Kinderpfad. Deshalb ist die konkrete Alpha-43B-Mikrocopy primär über Test + Build + Dist-Suche verifiziert.
- Der von mir gestartete Python-Preview-Prozess wurde beendet. Ein bereits vorher laufender Node-Prozess auf Port 5173 blieb unangetastet.
- Ein echter Mobile-Viewport-Smoke konnte mit den verfügbaren Browser-Werkzeugen nicht sauber umgestellt werden; mobile Sicherheit ist hier durch unverändertes Layout und bestehende Alpha-42B/Responsive-Tests nur indirekt abgesichert.
- Codex-Review-Smoke nach der Korrektur: `dist` wurde auf Port 4376 gestartet und mit Desktop 1280x900 sowie Mobile 390x844 geprüft. Sichtbar waren `Schau. Klatsch. Lies.`, `Nimm Hilfe, wenn du magst.` nach Öffnen der Hilfe und `Lege oder spure das Wort.`; kein horizontaler Overflow, keine JS-Fehler und keine relevanten HTTP-Fehler. Der Port-4376-Server wurde gestoppt.

## Datenschutz- und GE-Sicherheitscheck
- Keine echten Schüler-, Eltern- oder Kollegiumsdaten.
- Keine Diagnosen, Scores, Timer, Ranking, Login, Cloud, Export, Upload oder Speicherung ergänzt.
- Keine externen/protected Symbolassets ergänzt.
- Sprache bleibt ressourcenorientiert und kindnah.
- Die Hilfeformulierung vermeidet Druck und Pflichtsprache.

## Pädagogische Begründung
Die Änderung folgt Alpha 43A: weniger Erklärung, mehr direkte Orientierung. Für GE-Lernende mit kurzer Leseausdauer sind drei kurze Handlungswörter bzw. ein kurzer Hilfesatz leichter zu erfassen als eine vollständige Prozessbeschreibung.

## Verbleibende Grenzen
- Codex-Review-Korrektur nach dem Hermes-Tool-Limit: Die kurze Zeile `Schau. Klatsch. Lies.` wurde in den Tagespfad-Header verschoben, damit sie nicht als eigenes Grid-Element die Kinderpfad-Aufteilung verschiebt. Der Alpha-43B-Test wurde entsprechend erweitert und erneut grün verifiziert.
- Die alte ausführliche Einstiegszeile oberhalb des Kinderpfads ist im Quelltext noch vorhanden, aber der getestete aktive Kinderpfad bekommt nun zusätzlich die kurze Header-Zeile. Ein späterer Slice sollte prüfen, ob die äußere Einstiegszeile ganz entfernt oder fachlich für andere Shell-Zustände gebraucht wird.
- Die Schreibbrücke nutzt weiterhin den bestehenden Kartentitel und bestehende Bridge-Daten; Alpha 43B ändert bewusst nur die kleine Kinder-Hinweiszeile.
- Browser-Sichtprüfung der konkreten Alpha-43B-Stelle sollte wiederholt werden, sobald kein alter lokaler Server den Port 5173 belegt oder ein anderer Port genutzt wird.

## Nächster kleinster Schritt
Alpha 43C sollte nicht mehr Text hinzufügen, sondern die verbliebene doppelte Einstiegsinformation prüfen: Braucht die Seite noch die lange Zeile `Bild anschauen, Silbe klatschen...`, oder kann sie zugunsten der kurzen Kinderzeile entfernt werden?
