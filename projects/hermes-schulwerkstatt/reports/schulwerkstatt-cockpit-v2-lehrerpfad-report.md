# Schulwerkstatt Cockpit v2 - Gefuehrter Lehrerpfad

Datum: 2026-05-26

## State

CEO-Handoff abgeschlossen. Der Hermes-Task `t_02f86300` ist wegen eines Codex-OAuth-Refresh-Problems im Profil `coder` gecrasht. Die Umsetzung wurde danach direkt im Projekt abgeschlossen und geprueft.

## Ergebnis

Das Schulwerkstatt Cockpit hat jetzt einen gefuehrten Lehrerpfad direkt im oberen App-Cockpit.

Neue Elemente:

- Bereich `Gefuehrter Lehrerpfad`
- vier Fokus-Buttons:
  - Lesen
  - Mathe / Mengen
  - Wahrnehmung / Alltag
  - Kommunikation / UK
- dynamische Empfehlungskarte mit:
  - empfohlenem Modul
  - Startaktion
  - Beobachtungsfrage
  - naechstem kleinen Schritt
  - konkretem Aktionsbutton
- Rueckkehrkarte `Nach dem Modul` mit Links zu Beobachtung und Foerderkompass

## Geaenderte Datei

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

## Gepruefte lokale Links

Alle Linkziele antworten lokal mit Status `200`:

- `/index.html`
- `/lesewerk-v1/dist/index.html`
- `/ge-lernwerkstatt/dist/index.html`
- `/spielraum-generator/dist/index.html`

## Browser-Smoke

Geprueft:

- Desktop: 1366px Breite
- Mobil: 390px Breite

Ergebnis:

- keine horizontale Ueberbreite
- Lehrerpfad sichtbar
- genau 4 Fokus-Buttons
- Rueckkehrkarte sichtbar
- Beobachtungslink sichtbar
- Foerderkompass-Link sichtbar
- 7 App-Kacheln bleiben sichtbar
- Fokuswechsel aktualisiert Titel, Modul, Aktionsbutton und Link

Fokus-Ergebnisse:

- Lesen -> LeseWerk -> `./lesewerk-v1/dist/index.html`
- Mathe / Mengen -> Lernwerkstatt -> `./ge-lernwerkstatt/dist/index.html`
- Wahrnehmung / Alltag -> Aufgabenbank -> `#aufgabenbank`
- Kommunikation / UK -> Foerderkompass -> `#foerderkompass`

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-cockpit-v2-mobile-390.png`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-cockpit-v2-desktop.png`

## Risiko / Hinweis

Der Browser meldete nur `favicon.ico` als 404. Das betrifft kein App-Feature.

Das Hermes-Profil `coder` braucht spaeter eine frische OpenAI-Codex-Authentifizierung oder fuer Folgetasks voruebergehend ein anderes Profil.

## Naechster Slice

Cockpit v3 sollte die Connector-Registry strukturieren:

- Name
- URL
- lokal/online
- Lehrkraftmodus/Kindermodus
- Passwort-Hinweis
- geprueft am
- Status: bereit / pruefen / offen

Danach kann die Schulwerkstatt noch staerker wie eine zentrale Lehrer-App funktionieren.
