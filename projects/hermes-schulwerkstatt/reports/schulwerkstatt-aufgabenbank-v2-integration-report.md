# Schulwerkstatt v7B · Aufgabenbank v2 Integration und Qualitätsfilter

Datum: 2026-05-25

## Ergebnis

Die Aufgabenbank v2 wurde in `index.html` integriert. Die Schulwerkstatt ist jetzt lokal als v7 gekennzeichnet und nutzt genau 48 Beispielaufgaben: 12 Lesen, 12 Mengen, 12 Kommunikation/UK und 12 Wahrnehmung/Alltag.

## Geänderte Dateien

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/README.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-aufgabenbank-v2-integration-report.md`

## Umsetzung

- `taskBank` aus `data/aufgabenbank-v2-content-draft.json` ersetzt.
- UI-Texte von Aufgabenbank v1 auf Aufgabenbank v2 aktualisiert.
- Hinweis ergänzt: „Inhalte sind Beispielaufgaben und müssen lehrkraftseitig geprüft werden.“
- Materialkorb, Team-Check, Förderkompass-Empfehlungen, Druckkarten und Export beibehalten.
- README auf v7 und Aufgabenbank v2 aktualisiert.

## Verifikation

### Statische Checks

- `python3 -m json.tool data/schulwerkstatt-demo.json` bestanden.
- `python3 -m json.tool data/aufgabenbank-v2-content-draft.json` bestanden.
- Embedded JavaScript aus `index.html` extrahiert und mit `node --check /tmp/schulwerkstatt-v7-script.js` geprüft: bestanden.
- `taskBank` aus HTML extrahiert und gezählt:
  - Gesamt: 48 Aufgaben
  - Lesen: 12
  - Mengen: 12
  - Kommunikation/UK: 12
  - Wahrnehmung/Alltag: 12
  - Doppelte IDs: 0

### Browser-Preview

Lokaler Server:

`http://127.0.0.1:8788/`

Browserprüfung:

- Seitentitel: `Hermes Schulwerkstatt v7 · Förderkompass + Aufgabenbank v2 + Materialkorb`
- Header: `Lokaler Lehrer-Arbeitsplatz · v7`
- Standardmodus zeigt 48 Aufgabenkarten in der Aufgabenbank.
- Standardmodus zeigt 48 Druckkarten und einen Materialkorb aus der gefilterten Auswahl.
- Filterprüfung:
  - Bereich Lesen: 12 Karten
  - Lesen + basal: 2 Karten
  - Lesen + basal + 3 Minuten: 2 Karten
  - Reset auf alle Filter: 48 Karten
- Förderkompass erzeugt Empfehlungen.
- Klick auf „Nur empfohlene Karten anzeigen“ zeigt 2 Karten.
- Materialkorb im Empfehlungsmodus zeigt 2 Materialzeilen.
- Export enthält Kartenmodus, Materialkorb und Team-Check.
- Desktop-Overflow: kein horizontaler Overflow festgestellt.
- Schmale Breite geprüft bei 390 px:
  - Standardmodus: 48 Aufgabenbank-Karten, 48 Druckkarten, 48 Materialzeilen.
  - Empfehlungsmodus: 2 Druckkarten, 2 Materialzeilen.
  - Kein horizontaler Overflow.
- Mobile-Prüfscreenshot gespeichert: `reports/schulwerkstatt-v7-mobile-check.png`.

## Datenschutz- und GE-Check

- Keine echten Schülernamen, Diagnosen, Geburtsdaten oder Familieninformationen ergänzt.
- Aufgaben bleiben Beispielaufgaben und werden explizit als lehrkraftseitig zu prüfen markiert.
- Keine Speicherung, keine Cloud, keine automatische Förderentscheidung.
- Sprache bleibt pädagogisch vorsichtig: Beobachtung, Arbeitshypothese, nächster kleiner Schritt.

## Offene Punkte / Risiken

- Die 48 Aufgaben sind inhaltlich plausibel und anonymisiert, aber noch keine lehrkraftseitig erprobte S-Tier-Auswahl.
- Die schmale Browserbreite wurde nachträglich geprüft; eine echte Tablet-/Unterrichtsgeräte-Prüfung bleibt vor Einsatz sinnvoll.
- Einzelne Aufgaben können nach Praxistest Materialvereinfachung oder Symbolersatz brauchen.

## Nächster sinnvoller Schritt

Eine kurze menschliche Qualitätsrunde mit 6–8 repräsentativen Aufgaben: je Bereich zwei Aufgaben auswählen, im Team prüfen und markieren, welche Aufgaben sofort nutzbar sind, welche vereinfacht werden müssen und welche in v8 ersetzt werden sollten.
