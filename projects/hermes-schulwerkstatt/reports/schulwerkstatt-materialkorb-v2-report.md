# Schulwerkstatt v6 · Materialkorb und Druckkarten v2 Report

## Kurzfazit

Die Schulwerkstatt wurde von v5 auf v6 erweitert. Der Slice bleibt lokal, ohne neue Dependencies, ohne Upload und ohne echte Schülerdaten. Die Aufgabenkarten haben jetzt einen Materialkorb, einen Team-Check und eine druckfreundlichere Kartenlogik mit dezenten Trenn-/Schneidelinien.

## Geänderte Dateien

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/README.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-materialkorb-v2-report.md`

## Umgesetzte Punkte

### 1. Materialkorb

- Neuer Materialkorb im Bereich `Aufgabenkarten v2`.
- Quelle ist die aktuelle Kartenauswahl:
  - Modus `alle gefilterten Karten`: Materialkorb aus allen aktuell gefilterten Karten.
  - Modus `nur empfohlene Karten`: Materialkorb aus den zwei Förderkompass-Empfehlungen.
- Materialien werden zeilenweise entdoppelt. Zusammengesetzte Materialstrings werden bewusst nicht aggressiv zerlegt, damit keine falschen Materialteile entstehen.
- Browser-Checkboxen sind abhackbar, aber werden nicht gespeichert.

### 2. Druckkarten v2

- Aufgabenkarten behalten die bestehende Kind-Seite / Lehrer-Seite.
- Dezente gestrichelte Linien und Kartenrahmen wurden ergänzt, damit einzelne Karten im Druck klarer wirken.
- Druck-CSS bleibt A4-orientiert.
- Der Rohtext aus dem Beobachtungsfeld wird weiterhin nicht gedruckt.

### 3. Team-Check

- Neuer kurzer Team-Check im Aufgabenkartenbereich:
  - `Passt`
  - `Zu viel`
  - `Nächster kleiner Schritt`
- Bewusst ohne Noten, Punkte, Timer, Ranking oder Leistungsbewertung.

### 4. Export

- Export enthält jetzt zusätzlich:
  - Kartenmodus
  - ausgewählte Karten
  - Materialkorb
  - Team-Check-Hinweise
- Datenschutz-Hinweis bleibt enthalten.

### 5. Dokumentation

- README auf v6 aktualisiert.
- Dieser Report wurde neu erstellt.

## Verification

### JS-Syntaxprüfung

Befehl:

```bash
node --check reports/_tmp-index-script.js
```

Ergebnis: bestanden, keine Syntaxfehler.

### JSON-Prüfung

Befehl:

```bash
python3 -m json.tool data/schulwerkstatt-demo.json >/dev/null && echo valid
```

Ergebnis: `valid`.

### HTTP-Preview

Preview:

```text
http://127.0.0.1:8788/
```

HTTP-Check:

```text
HTTP/1.0 200 OK
```

Browser-Titel:

```text
Hermes Schulwerkstatt v6 · Förderkompass + Aufgabenbank + Materialkorb
```

### Duplicate-ID-Check

Ergebnis: keine doppelten HTML-IDs gefunden.

### Anzahl Aufgaben in `taskBank`

Ergebnis: 24 Aufgaben.

### Standardkarten

Browser-Check in Standardansicht:

- Aufgabenbank-Karten: 24
- Druckkarten: 24
- Materialkorb-Einträge: 24
- Export enthält `## Materialkorb`: ja

### Empfohlene Karten nach Förderkompass

Browser-Schritte:

1. Seite auf `http://127.0.0.1:8788/` geöffnet.
2. `Empfehlung erzeugen` geklickt.
3. `Nur empfohlene Karten anzeigen` geklickt.

Ergebnis:

- Druckkarten: 2
- Materialkorb-Einträge: 2
- Status: `2 empfohlene Karten für den Druck ausgewählt.`
- Export enthält Modus `nur empfohlene Karten`: ja

### Materialkorb existiert

Ergebnis: Materialkorb ist sichtbar und wird dynamisch aus der Kartenauswahl aktualisiert.

### Print / Overflow

- Print-CSS enthält A4-Regel, Kartenraster und dezente Trenn-/Schneidelinien.
- Browser-Check Desktop: `scrollWidth <= clientWidth`, kein horizontaler Overflow sichtbar.
- Mobile-Regeln sind vorhanden: Hauptgrids, Kartengrid und Toolkit fallen auf eine Spalte zurück.

## Datenschutz- und GE-Check

- Keine echten Namen, Diagnosen, Geburtsdaten oder privaten Details ergänzt.
- Kind-Modus bleibt bewertungsfrei.
- Keine Noten, Punkte, Rankings oder Timer.
- Export enthält weiterhin Datenschutz-Hinweis.
- Rohbeobachtungen aus dem Eingabefeld werden nicht in die Druckzusammenfassung übernommen.

## Offene Hinweise

- Materialentdopplung ist bewusst konservativ: komplette Materialzeilen werden entdoppelt, nicht in Einzelwörter zerlegt.
- Ein echter Papierausdruck wurde nicht physisch geprüft; geprüft wurde die Browser-/Print-CSS-Struktur.
- Vor Unterrichtseinsatz weiterhin menschlich prüfen, ob Materialmenge und Kartenanzahl zur konkreten Lerngruppe passen.
