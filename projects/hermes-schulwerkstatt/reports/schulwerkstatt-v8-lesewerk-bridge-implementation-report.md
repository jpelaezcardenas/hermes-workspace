# Schulwerkstatt v8 - LeseWerk Bridge Implementation Report

Datum: 2026-05-26

## Ergebnis

Die Schulwerkstatt hat jetzt eine kleine, sichere LeseWerk-Brücke. Aufgaben mit `connector: "LeseWerk"` zeigen einen dezenten lokalen Hinweis mit Button zu `../lesewerk-v1/index.html`.

Wichtig: Die Brücke behauptet keine automatische Diagnose und keine automatische Aufgabenwahl. Sie bleibt lehrkraftseitig: LeseWerk öffnen, passenden Einstieg dort prüfen.

## Geänderte Datei

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

## Umgesetzt

- Neue lokale Brücken-Darstellung für LeseWerk-Aufgaben:
  - `hasLeseWerkBridge(task)`
  - `leseWerkBridge(task, compact)`
  - `leseWerkPrintBridge(task)`
- Dezente CSS-Klasse:
  - `.lesewerk-bridge`
- Aufgabenbank-Karten:
  - LeseWerk-Aufgaben zeigen einen lokalen Übergabehinweis und Button.
- Druckkarten:
  - Kind-Seite bleibt unverändert kurz.
  - Lehrer-Seite nennt die LeseWerk-Brücke als lokalen Prüfhinweis.
- `lesen-6` wurde passend zum Vernetzungsplan von `Wochenplan` auf `LeseWerk` gesetzt, weil diese Aufgabe direkt Bild/Gegenstand/Wortkarte verbindet.

## Verifikation

Statische Prüfung:

- Aufgaben gesamt: 48
- Lesen: 12
- Mengen: 12
- Kommunikation/UK: 12
- Wahrnehmung/Alltag: 12
- `Sofort nutzbar`-Kurationen: 10
- LeseWerk-Connector-Aufgaben: 11

Mobile Browser-Smoke mit Chrome, 390px:

- sichtbare Aufgabenbank-Karten: 48
- sichtbare `Sofort nutzbar`-Badges: 10
- sichtbare LeseWerk-Brücken: 11
- alle LeseWerk-Brücken zeigen auf `../lesewerk-v1/index.html`
- horizontales Overflow: nein
- `scrollWidth`: 390
- `clientWidth`: 390

## Nicht umgesetzt

- Keine Änderung an LeseWerk selbst.
- Keine gemeinsame Datenbank.
- Keine Speicherung.
- Keine Schülerdaten.
- Keine Scores oder Diagnosezahlen.
- Keine externen Assets oder Abhängigkeiten.
- Keine automatische Lese-Diagnostik.

## Bewertung

Dieser Slice ist fachlich sinnvoll und risikoarm. Die Schulwerkstatt bleibt Lehrer-Zentrale, aber Leseaufgaben bekommen jetzt einen klaren lokalen Übergabepunkt. Das stärkt die Verbindung zwischen Wochenplanung und Lese-App, ohne die Oberfläche zu verschmelzen oder Kinder mit Zusatzlogik zu belasten.

## Nächste Empfehlung

Der nächste hochwertige Schritt wäre kein weiterer Link, sondern ein kleiner Lese-Anker:

1. Drei Alltagswörter aus der Schulwerkstatt wählen: z.B. `Tasse`, `Mama`, `Ball`.
2. In LeseWerk prüfen, ob diese Wörter als Silbe/Wort/Satz/Mini-Geschichte sauber und kindgerecht vorkommen.
3. Danach einen einzigen `Lese-Anker` in der Schulwerkstatt ergänzen: `Wort -> passende LeseWerk-Reise`.

Das sollte wieder als kleiner Slice passieren, nicht als große App-Fusion.
