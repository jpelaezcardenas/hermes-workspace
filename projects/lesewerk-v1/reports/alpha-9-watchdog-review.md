# LeseWerk Alpha 9 – Watchdog Review

Datum: 2026-05-17
Status: Accepted
Prüfmodus: finaler Neva-Watchdog nach Slice D

## Kurzfazit

Alpha 9 wird angenommen. Tests, Build, frischer lokaler Browser-Check und Datenschutz-/Forbidden-Pattern-Prüfung der aktiven Produktdateien sind bestanden. Der Daily Path reduziert die sichtbare Kinder-Auswahl auf vier ruhige Karten, während Lehrkraft-Pilot, anonyme Beobachtungskarte, Reset und lokale Druckvorschau vorhanden bleiben.

## Gelesene Grundlagen

- `reports/product-spec.md`
- `reports/alpha-9-pilot-daily-path-blueprint.md`
- `reports/alpha-9-daily-path-implementation-report.md`
- `reports/alpha-9-teacher-pilot-implementation-report.md`
- `reports/alpha-9-ge-usability-review.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Automatisierte Prüfung

### `npm test`

Ergebnis: bestanden.

- 42 Tests ausgeführt
- 42 bestanden
- 0 fehlgeschlagen

### `npm run build`

Ergebnis: bestanden.

- Pipeline: `tsc -b && node scripts/build.mjs`
- keine Build-Fehler

## Frischer Browser-Check

Lokaler Server:

- `python3 -m http.server 4397 -d dist`
- URL: `http://127.0.0.1:4397/?alpha9-watchdog=1`

Geprüft:

1. Alpha-9-Header sichtbar: `LeseWerk Alpha 9 · lokale Demo`.
2. Kinderpfad sichtbar, Bereich `Heute lesen` vorhanden.
3. Standardansicht zeigt eine kleine Tagesauswahl mit vier Karten:
   - `Erstes Wort – Mond`
   - `Noch ein Wort – Ball`
   - `Kurze Story – Der Ball im Garten`
   - `Nochmal in Ruhe – Mond`
4. Volle Bibliothek ist nicht als offene Standard-Überlast sichtbar, sondern hinter `Alle Wörter und Geschichten öffnen` sekundär erreichbar.
5. Wort-/Silbenaufgabe sichtbar und bedienbar: `Mond` mit Silbenfarben und Button `Ich bin fertig`.
6. Story-Fluss geprüft: `Der Ball im Garten`; Antwort `Ball` führt zum Feedbackzustand `Gut gelesen.` und zur nächsten Auswahl.
7. Lehrkraftansicht geprüft: `10–15-Minuten-Pilot` mit vier kompakten Schritten sichtbar.
8. Lokale anonyme Beobachtungskarte sichtbar: Profilfarbe, sichtbare Beobachtung, genutzte Hilfe, nächster kleiner Schritt.
9. Reset sichtbar und klickbar: `Lokalen Demo-Stand zurücksetzen`.
10. Lokale Druckvorschau sichtbar mit Datenschutztext: bleibt im Browser, keine echten Namen, keine diagnostische Einordnung, keine Fotos, keine Cloud, keine Datei, keine Online-Übertragung, keine automatische Speicherung.
11. Browser-Konsole: keine JavaScript-Fehler oder Warnungen im Check.

## Forbidden-Pattern-Check

Aktive Produktdateien geprüft:

- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`

Gesucht wurde nach Mustern zu:

- echten Namen
- Diagnosen / medizinischer Sprache
- Noten, Scores, Ranking
- Timer / Zeitdruck
- Login, Cloud, Backend, Upload, Auth
- Beschämungs- oder Fehlerwortschatz

Ergebnis:

- Keine gefährlichen Treffer in `src/lesewerk-content.mjs`.
- Keine echte produktive Schülerdaten- oder Bewertungslogik gefunden.
- Treffer in `src/App.tsx` zu `diagnostische Einordnung` und `Cloud` stehen ausschließlich in negierender Datenschutzsprache (`keine diagnostische Einordnung`, `keine Cloud`) und sind erwünscht.
- Treffer in `src/styles.css` zu `max` sind CSS-Eigenschaften (`max-width`, Media Queries), keine Namen.
- Treffer `Math.max` in `src/App.tsx` ist Code, kein Personenname.

Bewertung: bestanden.

## GE-/Datenschutz-Qualitätscheck

Stärken:

- Kinderpfad beginnt ruhig und überschaubar.
- Tagesauswahl ist klein genug für einen ersten GE-Unterrichtspilot.
- Rückmeldung bleibt wertschätzend und druckarm.
- Lehrkraftbereich bleibt kompakt statt dashboardartig.
- Beobachtung bleibt lokal, anonym und ohne echte Schülerdaten.
- Druckvorschau formuliert Datenschutzgrenzen sichtbar.

Grenzen:

- Tagesweg ist fest kuratiert, noch nicht durch die Lehrkraft auswählbar.
- Beobachtungskarte ist bewusst read-only; sie ersetzt keine pädagogische Dokumentation.
- Browserprüfung war ein manueller Spot-Check, kein vollständiger Cross-Device-Test.

## Entscheidung

Accepted.

Alpha 9 erfüllt die Slice-Ziele:

- Daily Path sichtbar und klein.
- Volle Bibliothek nicht als Default-Überlast sichtbar.
- Wort-/Silbenaufgabe und Story-Feedback funktionieren.
- Lehrkraft-Pilot, anonyme Beobachtungskarte, Reset und lokale Druckvorschau sind vorhanden.
- Tests und Build bestehen.
- Datenschutz- und Forbidden-Pattern-Prüfung ergibt keine Blocker.

## Empfehlung für Alpha 10

Alpha 10 sollte klein bleiben und nicht die Content-Bibliothek weiter ausbauen.

Empfohlener nächster Slice:

`Alpha 10: Lokale Lehrkraft-Kuratierung des Tageswegs`

Akzeptanzkriterien:

1. Lehrkraft kann lokal maximal vier Tageskarten auswählen.
2. Auswahl bleibt anonym und ohne Schülernamen.
3. Keine Cloud, kein Login, kein Export, keine dauerhafte sensible Speicherung.
4. Kinderpfad zeigt weiterhin nur die ausgewählten vier Karten.
5. Falls keine Auswahl getroffen wurde, bleibt der sichere Alpha-9-Standardpfad aktiv.
6. Tests prüfen maximale Kartenzahl, Fallback und Datenschutzsprache.
7. Browser-Check prüft: Auswahl im Lehrkraftbereich, Rückkehr in Kinderpfad, kleine sichtbare Tagesauswahl.

Nicht-Ziel für Alpha 10:

- keine breite Inhaltsausweitung,
- kein Planungsdashboard,
- keine Klassenverwaltung,
- keine personenbezogenen Profile.
