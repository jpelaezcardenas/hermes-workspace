# Alpha 14 Slice B – Pilot-Readiness UI and Version Clarity

Datum: 2026-05-17
Status: Slice B umgesetzt und lokal verifiziert

## Ziel

Diese Slice setzt nur die kleinsten high-value Änderungen aus `reports/alpha-14-gap-audit-and-pilot-blueprint.md` um: sichtbare Versionsklarheit, kurze Lehrkraft-Orientierung, geschärfte Pilot-Checkliste und schmale Tests für diese Grenzen. Es wurden keine neuen Aufgaben, Stories, Diagnosefunktionen, Datenflüsse, Cloud-/Exportfunktionen, Logins oder geschützten Assets ergänzt.

## Geänderte Bereiche

### 1. Sichtbare Versionssprache

Der Hero nennt nicht mehr den alten sichtbaren Stand `LeseWerk Alpha 12 · lokale Demo`, sondern neutral:

- `LeseWerk · lokaler Pilot-Demo-Stand`

Damit bleibt der Stand aktuell, ohne Pilotbereitschaft, Validierung oder Verkaufsreife zu behaupten.

### 2. Kurzes Lehrkraft-Onboarding

Im Lehrkraftbereich wurde ein kompakter Block `Kurzer lokaler Lesemoment` ergänzt. Er klärt vor dem Tagesweg:

- Ziel: 10–15 Minuten lokales Lesen;
- Beobachtung: nur sichtbare Signale wie Hilfe, Wiederholung, reduzierte Auswahl, Storyantwort, Stopp oder ruhiges Weitergehen;
- Datenschutzgrenze: keine echten Namen, Fotos oder Klassenlisten speichern;
- Ende/Interpretation: nach zwei Karten bewusst enden und nur einen nächsten pädagogischen Schritt ableiten.

### 3. Geschärfte Pilot-Checkliste

Der vorhandene `10–15-Minuten-Pilot` wurde präziser und handlungsnäher formuliert:

1. Gerät lokal bereit, anonymes Farbprofil wählen, eine Hilfe sichtbar lassen.
2. Zwei Karten lesen und bei Bedarf darauf begrenzen.
3. Sachlich nur beobachtbare Signale festhalten.
4. Nach 10–15 Minuten ohne diagnostische Einordnung enden.

### 4. Tests für Alpha-14-Grenzen

Die Source-Tests wurden angepasst und ergänzt:

- stale `LeseWerk Alpha 12` im App-Header wird abgefangen;
- neue Pilot-Demo-Sprache wird erwartet;
- die Pilot-Checkliste erwartet Gerät, zwei Karten, sachliches Festhalten und Ende ohne Diagnose;
- das neue Onboarding muss lokale, anonyme, nicht-reifebehauptende Pilotgrenzen enthalten.

## Tests und Build

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 64 bestanden, 0 fehlgeschlagen, 0 TODO
- `npm run build`: erfolgreich

## Browsercheck

Ausgeführt nach Build über lokalen statischen Server:

```bash
python3 -m http.server 5179 --bind 127.0.0.1 -d dist
```

Geprüft:

- Startseite lädt ohne Browser-Konsole-Fehler.
- Hero zeigt `LESEWERK · LOKALER PILOT-DEMO-STAND`.
- Kinderpfad bleibt ruhig mit anonymen Profilen, Hilfen, Tagesweg und Lesekarte.
- Lehrkraftbereich zeigt das neue Onboarding, Tagesweg-Auswahl, Vorschlag, Pilot-Checkliste, Beobachtungskarte und lokale Druckvorschau.
- Eine Lesekarte wurde bis zur Feedback-Ansicht geführt; anschließend wurde `Fertig` bis zum Abschluss getestet.

Hinweis: Port `4173` war bereits durch einen anderen lokalen Python-Prozess belegt und antwortete leer. Für den Browsercheck wurde deshalb der freie Port `5179` genutzt.

## Bewertung

Die Änderung ist absichtlich klein und erhöht vor allem Klarheit vor dem ersten lokalen Pilot. Der Kinderpfad wurde nicht erweitert; die neue Orientierung liegt im Lehrkraftbereich. Die Sprache bleibt lokal, anonym und vorsichtig und vermeidet Reife-, Diagnose-, Cloud- oder Exportversprechen.

## Rest-Risiken / Alpha 15

- Kein echter Tablet-/iPad-Klassenraumtest wurde durchgeführt.
- Die App kann nicht technisch verhindern, dass außerhalb der App echte Namen handschriftlich oder mündlich ergänzt werden; die UI weist nur sichtbar darauf hin.
- Für Alpha 15 wäre der kleinste sinnvolle nächste Schritt eine GE-/Datenschutz-Pilot-Readiness-Review der geschärften Sprache vor einem realen 10–15-Minuten-Test.
