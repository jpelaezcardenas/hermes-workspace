# Ergebnis: Beta-3.0 UI-Schnitt

Stand: 2026-05-16

## Ziel

Die lokale GE Lernwerkstatt sollte im ersten sichtbaren Schritt stärker an den Beta-3.0-Qualitätsstandard anschließen: mehr App-Launcher, mehr Schüler:innenstart, weniger reines Lehrkraft-Dashboard.

## Geändert

- `src/main.jsx`
- `src/styles.css`

## Was wurde umgesetzt?

### 1. Neuer Beta-3.0-Startbereich

Das Dashboard startet jetzt mit einem großen kindgerechten App-Launcher:

- grüne Icon-Leiste mit Start, Deutsch, Mathe, Sachunterricht und Spiele;
- Frage `Wer startet?`;
- große runde Farbfelder für Lila, Gelb, Orange, Grün und Blau;
- direkter Einstieg in drei große Spielkacheln:
  - Symbol-Garten;
  - Mengen legen;
  - Alltags-Spiele;
- klar abgesetzter Lehrkraftbereich mit Beobachtung, Auswertung und Kompetenzraster.

### 2. Übungsbibliothek stärker als Spiele-Launcher

Die Übungsbibliothek wurde visuell in Richtung `Spiele für alle` geschoben:

- großes Spielsymbol im Kopfbereich;
- Beta-3.0-Launcher-Benennung;
- größere Spiel-Icons auf den Übungskarten;
- weiterhin Filter, Beobachtungsfragen und Lehrkraft-Informationen.

### 3. Beta-3.0-Bezug

Die Umsetzung orientiert sich an:

- großen Kacheln;
- Farbauswahl;
- ruhigem Natur-/Wiesen-App-Feeling;
- klaren Hauptaktionen;
- Trennung von Schüler:innenstart und Lehrkraftfunktionen;
- keine 1-10-Skala im Schüler:innenbereich.

## Geprüft

- `npm run build` erfolgreich.
- Lokaler Server gestartet: `http://127.0.0.1:5173/`
- Desktop-Browserprüfung:
  - Dashboard lädt.
  - Neuer Beta-3.0-Launcher ist sichtbar.
  - Kachel `Mengen legen` öffnet das Mengen-Spiel.
  - `Stein legen` funktioniert.
  - Auswahl `2` gibt korrektes Feedback.
  - Rückweg zur Übungsbibliothek funktioniert.
  - Übungsbibliothek zeigt neue Launcher-Optik und Spielkarten.

## Bewertung

Vorher wirkte der Start stärker wie eine Lehrkraft-/Diagnostik-App mit angehängten Übungen.

Nach diesem Schnitt wirkt der erste Screen deutlich näher an Beta 3.0:

- mehr Schüler:innenorientierung;
- größere visuelle Ziele;
- stärkeres App-/Spielgefühl;
- bessere Trennung zwischen Spielen und Lehrkraftbereich.

Aktuelle Einschätzung: etwa 7.5/10.

Beta-3.0-Niveau ist näher, aber noch nicht vollständig erreicht.

## Noch offen

1. Der globale Kopfbereich oben ist weiterhin sehr lehrkraftlich (`GE Lernwerkstatt Beobachtungs-App`). Für echtes Beta-3.0-Niveau sollte der Schüler:innenstart perspektivisch noch stärker vor dieser Fachüberschrift stehen oder eine eigene Startansicht bekommen.
2. Die Navigation ist noch textlastiger als die Beta 3.0. Die Icon-Leiste ist ergänzt, aber die alte Button-Navigation bleibt sichtbar.
3. Es fehlen echte lokale Bild-/Symbolassets. Emoji bleiben Platzhalter.
4. Die mobilen CSS-Regeln sind ergänzt, aber ein echter Smartphone-/Tablet-Viewport-Test steht noch aus.
5. Übungsbibliothek und Spielräume sollten als nächster Schnitt weiter vereinheitlicht werden: gleiche Kachellogik, gleiche Spielraum-Header, gleiche Hilfe-/Feedbackzone.

## Nächster bester Schnitt

Eine eigene Schüler:innen-Startansicht als Standard-Start prüfen:

- erster Screen nur `Wer startet?`, Spielkacheln und Audio/Hilfe;
- Lehrkraftbereich über klaren Button erreichbar;
- alte Lehrkraftnavigation erst nach Auswahl sichtbar;
- keine Fachsprache im ersten Schüler:innenkontakt.

