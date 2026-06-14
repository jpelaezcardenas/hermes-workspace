# LeseWerk Alpha 9 – Daily-Path-Implementierungsbericht

Status: implementiert und lokal geprüft
Datum: 2026-05-17

## Ziel

Alpha 9 sollte den Kinderpfad beruhigen: Die gewachsene Alpha-8-Bibliothek mit 48 Wort-/Silbenaufgaben und 24 Mini-Stories bleibt verfügbar, wird aber nicht mehr als erste sichtbare Auswahlfläche gezeigt.

## Umsetzung

Geänderte Dateien:

- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-9-daily-path-implementation-report.md`

Konkrete Änderungen:

1. Header auf `LeseWerk Alpha 9 · lokale Demo` aktualisiert.
2. Kinderpfad um eine sichtbare Fläche `Heute lesen` ergänzt.
3. Standard-Tagesweg auf vier Karten begrenzt:
   - erstes Wort,
   - zweites Wort,
   - kurze Story,
   - ruhige Wiederholung.
4. Die volle Wörter-/Story-Bibliothek bleibt über `Alle Wörter und Geschichten öffnen` erreichbar, ist aber nicht die erste sichtbare Auswahlfläche.
5. Neue Helper-Funktion `getDailyReadingPath()` ergänzt, damit die Tagesauswahl testbar und unabhängig von der UI prüfbar ist.
6. Styles für Tagesweg-Karten und sekundäre Bibliotheksfläche ergänzt, inklusive responsiver Reduktion auf zwei bzw. eine Spalte.

## Datenschutz- und GE-Sicherheitsgrenze

Die Änderung bleibt lokal und anonym. Es wurden keine neuen Backends, Logins, Cloud-Funktionen, Uploads, personenbezogenen Felder, Diagnosesprache, Scores, Timer oder Rankings ergänzt.

Die Tagespfad-Sprache bleibt kindnah und ruhig:

- `Heute lesen`
- `Vier ruhige Karten`
- `Nochmal in Ruhe`

## Automatisierte Prüfung

`npm test`:

- Ergebnis: bestanden
- Umfang: 41/41 Tests bestanden
- Neue Tests prüfen:
  - Tagesweg enthält genau vier Einträge,
  - Mischung aus Wort, Wort, Story und Wiederholung,
  - Alpha-9-Header und `Heute lesen`-Wording,
  - volle Bibliothek bleibt sekundär erreichbar,
  - keine verbotene Diagnose-/Score-/Timer-/Ranking-Sprache im Tagesweg.

`npm run build`:

- Ergebnis: bestanden
- Build-Pipeline: `tsc -b && node scripts/build.mjs`

## Browser-Spot-Check

Lokaler Build geöffnet unter:

- `http://127.0.0.1:4389/?alpha9-daily-path=1`

Geprüft:

1. Header zeigt `LeseWerk Alpha 9 · lokale Demo`.
2. Kinderpfad zeigt `Heute lesen` mit vier Tageskarten.
3. Standardansicht zeigt nicht die vollständige 48/24-Bibliothek als offene Buttonliste.
4. Story-Karte aus dem Tagesweg öffnet den Story-Fluss `Der Ball im Garten`.
5. Story-Antwort führt in den ruhigen Feedbackzustand `Gut gelesen.` mit den bekannten Folgeoptionen.
6. Browser-Konsole zeigte keine JavaScript-Fehler.

## Stärken

- Der sichtbare Start ist deutlich kleiner und ruhiger.
- Wort- und Story-Fluss bleiben erhalten.
- Die Änderung nutzt bestehende App-Struktur und vermeidet ein neues Navigationssystem.
- Die Bibliothek wird nicht entfernt, nur sekundär gestellt.

## Schwächen / Grenzen

- Die Tagesauswahl ist aktuell fest kuratiert aus den ersten vorhandenen Aufgaben und der ersten Story.
- Es gibt noch keine Lehrkraft-Vorauswahl für andere Tagespfade.
- Der Tagesweg ist funktional, aber noch kein vollständiger Pilotplaner.

## Risiken

- Bei späterer Erweiterung sollte die Tagesauswahl nicht wieder zu einer großen offenen Bibliothek anwachsen.
- Wenn Lehrkräfte eine andere Kuratierung brauchen, sollte das als eigener kleiner Slice umgesetzt werden, nicht als komplexes Planungssystem in diesem Slice.

## Nächster sinnvoller Schritt

Ein kleiner Alpha-9-Folgeslice könnte eine einfache, lokale Lehrkraft-Vorauswahl für den Tagesweg ergänzen: maximal vier Karten auswählen, ohne Speicherung personenbezogener Daten und ohne neue Navigation.
