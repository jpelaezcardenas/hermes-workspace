# LeseWerk Alpha 5 – Story-Paket-Erweiterung

Stand: 2026-05-16

## Ziel

Slice C erweitert den bestehenden Story-Pfad qualitätsgesichert von 5 auf 12 Mini-Storys. Die Erweiterung bleibt lokal, anonym, schulisch anschlussfähig und ohne Bewertungs-, Diagnose- oder Zeitdrucksprache.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
  - Story-Metadaten um `cluster` erweitert;
  - reduzierte Antwortdaten um eine explizite `answer`-Referenz abgesichert;
  - lokale Symbol-Cues für neue Fokuswörter ergänzt;
  - Story-Pool auf 12 kurze deutsche Mini-Storys erweitert.

- `tests/lesewerk-content.test.mjs`
  - Story-Anzahl auf 12–18 abgesichert;
  - Pflichtmetadaten und Cluster geprüft;
  - Antwortvalidität für Zwei-Auswahl geprüft;
  - Datenschutz-/Asset-Grenzen und sichere Sprache geprüft;
  - generische Füllinhalte und leere Inhalte abgesichert.

## Story-Cluster

Der Story-Pool deckt jetzt vier klare Cluster ab:

1. Alltag/Ort
   - Die Tasse auf dem Tisch
   - Das Brot auf dem Teller
   - Die Blume im Beet
   - Am Tisch ist Licht

2. Handlung/Figur
   - Der Ball im Garten
   - Die Maus läuft schnell

3. Wetter/Sachtext
   - Die Sonne macht Licht
   - Der Hut im Wind
   - Regen am Fenster

4. Schule/Teilhabe
   - In der Schule ist Pause
   - Der Bus kommt
   - Das Buch im Kreis

## Qualitätsgrenzen

Die neuen Texte folgen den Alpha-5-Regeln:

- 2–4 kurze Sätze pro Story;
- genau ein Fokuswort oder ein enges Fokusmuster;
- eindeutige Verständnisfrage;
- Zwei-Auswahl mit expliziter Antwort;
- lokaler Symbolhinweis ohne externe Assets;
- unterstützende Rückmeldung ohne Scham- oder Fehlerfokus;
- nächster kleiner Schritt für Anschlussförderung;
- keine realen Schülerdaten, keine Diagnosen, keine Noten, keine Rankings, kein Timer.

## TDD-Verlauf

RED:

```bash
npm test -- --test-name-pattern "story paths expose a quality-controlled"
```

Erwartet fehlgeschlagen, weil der Story-Pool noch 5 statt mindestens 12 Storys enthielt.

GREEN / Verifikation:

```bash
npm test -- --test-name-pattern "story paths"
npm test
npm run build
```

Ergebnis:

- `npm test -- --test-name-pattern "story paths"`: 28/28 Tests bestanden;
- `npm test`: 28/28 Tests bestanden;
- `npm run build`: erfolgreich;
- `dist/reports/alpha-5-story-expansion-report.md` wurde durch den Build erzeugt.

## Rest-Risiken

- Kein frischer Browser-/Tablet-Klickpfad in diesem Slice; der Slice betrifft Content und Content-Tests.
- Die Storys sind bewusst kurz gehalten. Eine spätere UX-Prüfung sollte kontrollieren, ob die Auswahl mit 12 Storys in der Oberfläche weiterhin ruhig wirkt.
