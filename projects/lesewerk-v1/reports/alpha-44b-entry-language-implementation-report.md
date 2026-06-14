# Alpha 44B – Kinderansicht Einstieg entdoppeln

## Ergebnis
- Die Kinderansicht zeigt im Einstieg nur noch die kurze kindnahe Zeile: `Schau. Klatsch. Lies.`
- Der vorherige lange Einstiegssatz oberhalb des Kinderpfads wurde entfernt: `Bild anschauen, Silbe klatschen, Wort lesen, Satz lesen, Mini-Geschichte, Schreibbrücke. Der Tagespfad startet unten.`
- Es wurden keine neuen Inhalte, Screens, Workflows, Speicherung, Diagnostik, Bewertung, Timer, Ranking, Cloud-, Login-, Export- oder Upload-Funktionen ergänzt.

## Geänderte Dateien
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-44b-entry-language-implementation-report.md`

## TDD-Nachweis
1. RED: Neuer fokussierter Test ergänzt:
   - `Alpha 44B child entry keeps only the short start message before the child path`
   - Erstlauf: `npm test -- --test-name-pattern "Alpha 44B"`
   - Erwarteter Fehlschlag: Der Test fand noch `guided-entry-note` und den langen Einstiegssatz im Kinderpfad.
2. GREEN: In `src/App.tsx` wurde nur der redundante `<p className="guided-entry-note" ...>`-Block entfernt.
3. Bestehende Tests mit veraltetem Erwartungswert wurden auf die verbleibende kurze Einstiegssprache aktualisiert.

## Tests und Build
- `npm test`: bestanden, 145/145 Tests grün.
- `npm run build`: bestanden.

## Smoke-Test
- Desktop-Smoke über lokalen Dist-Server `http://127.0.0.1:4388/`:
  - Seite lädt mit Titel `LeseWerk V1`.
  - Kinderpfad sichtbar.
  - `Schau. Klatsch. Lies.` sichtbar.
  - Der alte lange Einstiegssatz mit `Der Tagespfad startet unten` ist nicht sichtbar.
  - `Tagespfad starten` wurde angeklickt; Hilfen und Schrittkarte bleiben bedienbar.
  - Kein horizontaler Overflow im geprüften Desktop-Viewport.
  - Browser-Konsole: keine JS-Fehler nach Smoke-Prüfung.
- Mobile-Smoke: Ein separater Chrome-Headless-Screenshot mit 390x844 war in diesem Lauf nicht zuverlässig möglich, weil Chrome headless im Tool-Timeout hängen blieb. Layout-Code wurde nicht verändert; die visuelle Änderung entfernt nur einen Textblock. Der mobile Rest bleibt durch bestehende Tests und unveränderte CSS-Regeln abgesichert, aber kein vollständiger mobiler Browser-Smoke wurde erfolgreich abgeschlossen.
- Codex-Review-Smoke nach Hermes-Block: `dist` wurde auf Port 4377 gestartet und mit Playwright in Desktop 1280x900 sowie Mobile 390x844 geprüft. Beide Viewports zeigen `Schau. Klatsch. Lies.`, die alte Langzeile ist nicht mehr sichtbar, es gibt keinen horizontalen Overflow und keine JS-/relevanten HTTP-Fehler. Der Port-4377-Server wurde gestoppt.

## Sicherheits- und Datenschutzcheck
- Keine Echtdaten, Namen, Diagnosen, Förderplandaten oder Eltern-/Familiendaten verarbeitet.
- Keine externen Assets oder Netzwerkfunktionen ergänzt.
- Keine Bewertungssprache, Punkte, Timer, Ranking oder diagnostische Aussage ergänzt.
- Lehrkraft-/Manual-Bereiche wurden nicht verändert.

## Rationale
Alpha 44A hatte festgestellt, dass im Kinderblick zwei Einstiegsebenen direkt übereinander standen. Für GE-Kinder ist die kurze Handlungssequenz klarer und weniger kognitiv belastend. Deshalb wurde nicht umformuliert oder ergänzt, sondern die alte lange Zeile entfernt und die kurze Zeile im Tagespfad-Header beibehalten.

## Verbleibende Grenzen
- Die alte CSS-Klasse `.guided-entry-note` existiert noch in `src/styles.css`, wird aber durch den Kinderpfad nicht mehr genutzt. Sie wurde bewusst nicht entfernt, um den Änderungsscope klein zu halten.
- Mobile-Smoke konnte in diesem Toollauf nicht vollständig per Browser-Screenshot verifiziert werden.
