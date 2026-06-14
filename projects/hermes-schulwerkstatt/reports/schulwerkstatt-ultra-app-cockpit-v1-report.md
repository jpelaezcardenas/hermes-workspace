# Schulwerkstatt Ultra App-Cockpit v1 Report

Datum: 2026-05-26

## Ergebnis

Die Schulwerkstatt hat jetzt einen neuen Startbereich als Lehrer-App-Cockpit. Der Einstieg wirkt nicht mehr nur wie eine lange Arbeitsseite, sondern wie ein lokales Schulwerkstatt OS: oben planen, dann gezielt ein Modul öffnen, anschließend Beobachtung und nächsten Schritt sichern.

## Umgesetzt

- Neuer Seitentitel: `Schulwerkstatt Cockpit · Hermes Schulwerkstatt`.
- Neuer Cockpit-Startbereich am Seitenanfang.
- Vier-Schritt-Workflow:
  1. Profil prüfen
  2. Modul öffnen
  3. Aufgabe starten
  4. Beobachtung sichern
- App-Kacheln für:
  - LeseWerk
  - Lernwerkstatt
  - Spielraum
  - Förderkompass
  - Aufgabenbank
  - Wochenplan
  - Nayyal-Welten
- Neue Connector-Zentrale mit lokalen Brücken und einer sicheren Nayyal-V3-Referenz.
- Alte lokale Links zu LeseWerk, Lernwerkstatt und Spielraum wurden von `../...` auf die erreichbaren lokalen Brücken `./...` umgestellt.

## Geprüfte lokale Links

Alle folgenden Ziele antworten lokal mit Status `200`:

- `/index.html`
- `/lesewerk-v1/dist/index.html`
- `/ge-lernwerkstatt/dist/index.html`
- `/spielraum-generator/dist/index.html`

## Nayyal-Verknüpfung

Gesetzt wurde nur der sichere bekannte Referenzlink:

- `https://www.nayyal.com/lw3/?key=2kaxp98`

Garten, Lehrerseite und Fußball wurden bewusst nicht verlinkt, weil in diesem Slice keine eindeutig bestätigten Ziel-URLs gefunden wurden. Sie sind im Cockpit als offen markiert, damit keine falschen Links entstehen.

## Browser-Smoke

Geprüft:

- Desktop: 1366px Breite
- Mobil: 390px Breite

Ergebnis:

- Cockpit sichtbar
- 7 App-Kacheln sichtbar
- 8 Connector-Kacheln sichtbar
- Primäraktion sichtbar
- Keine horizontale Überbreite
- Nayyal-Referenz sichtbar

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-ultra-cockpit-desktop.png`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-ultra-cockpit-mobile-390.png`

## Qualitätseinschätzung

Das ist ein sinnvoller erster Ultra-Slice. Die Schulwerkstatt wirkt am Einstieg deutlich stärker wie eine Lehrer-App. Besonders wichtig: Die bestehenden tiefen Funktionen wurden nicht entfernt, sondern bekommen einen klareren Start- und Entscheidungsrahmen.

Noch nicht perfekt ist die Gesamtführung nach dem Klick: Das Cockpit öffnet jetzt Ziele und Bereiche, aber es merkt sich noch nicht aktiv, welchen Workflow die Lehrkraft gewählt hat. Das wäre der nächste große Qualitätsschritt.

## Nächster Slice

Empfehlung für v2:

1. Einen echten Workflow-State einbauen: `Heute vorbereiten`, `Kindermodus öffnen`, `Beobachtung sichern`.
2. Die App-Kacheln stärker nach Situation filtern: Lesen, Mathe, Wahrnehmung, Kommunikation.
3. Eine sichere Nayyal-Connector-Verwaltung bauen: URL, Zweck, Modus, Status, Passwort-Hinweis, geprüft am.
4. Optional: Rückkehrkarte nach Modulstart, damit die Lehrkraft danach direkt Beobachtung und nächsten Schritt sichern kann.
