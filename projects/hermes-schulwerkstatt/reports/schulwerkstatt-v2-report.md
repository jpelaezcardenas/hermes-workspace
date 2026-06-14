# Schulwerkstatt v2 – Bericht

## Kurzfazit

Die Hermes Schulwerkstatt wurde zur v2 ausgebaut: Sie ist jetzt stärker lehrer-facing, ruhiger strukturiert und unterstützt den Ablauf Profil → Ziel → Wochenplan → Aufgabe → Beobachtung → nächste Woche. Die Umsetzung bleibt lokal, fiktiv/anonymisiert und verändert keine verbundenen Projekte.

## Geänderte Dateien

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/README.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-v2-report.md`

## Produktänderungen

### 1. Interaktiver Wochenziel-Generator

- Zielauswahl für Lesen, Mengen und Kommunikation.
- Freitextfeld für eigenes Wochenziel.
- Unterstützungsfokus auswählbar: basal, konkret-handelnd, unterstützt oder symbolisch.
- JavaScript erzeugt daraus einen 5-Tage-Plan mit Stationen.
- Jede Station enthält Ziel, Material, Unterstützung, Beobachtungsfrage und nächsten Schritt.

### 2. Connectoren

Referenzierte lokale Systeme:

- LeseWerk: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/index.html`
- GE-Lernwerkstatt: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/dist/index.html`
- Spielraum Generator: `/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html`
- Weekly Plans: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans`

Die Oberfläche zeigt Statuslabels und absolute Pfade. Falls Browser-Sicherheitsregeln lokale Links blockieren, bleibt der Pfad sichtbar und kann manuell geöffnet werden.

### 3. Druckansicht

- A4-Print-CSS ergänzt.
- Materialliste und Beobachtungsfragen sind in einer reduzierten Drucksektion sichtbar.
- Dekorative Elemente und Navigation werden beim Drucken ausgeblendet.

### 4. Lehrerführung und Design

- Stärkere visuelle Hierarchie mit ruhigen Karten, klaren Überschriften und weniger Unruhe.
- Nächste Handlung steht oben als Navigationsfluss.
- Sprache ist beobachtend, unterstützend und nicht diagnostisch endgültig.

### 5. Quality/Safety Panel

Enthält explizite Prüfpunkte:

- keine echten Namen oder Diagnosen,
- Beobachtung statt Defizitlabel,
- eine klare Handlung je Station,
- Material konkret und erreichbar,
- keine Rankings, Noten oder Timer,
- Überladung aktiv prüfen,
- Lehrerentscheidung bleibt zentral,
- kein automatisches Speichern.

## Verification

Durchgeführt am lokalen Projektpfad `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt`.

- Dateien vorhanden und nicht leer: bestanden.
- `data/schulwerkstatt-demo.json` per Python `json.load` geprüft: bestanden.
- Verbundene Referenzpfade existieren: LeseWerk, LeseWerk dist, GE-Lernwerkstatt dist, weekly-plans, Spielraum Generator: bestanden.
- Lokaler HTTP-Server gestartet. Port `8787` war bereits belegt, daher Verifikation über `python3 -m http.server 8877`: bestanden.
- `index.html` über `http://localhost:8877/` im Browser geladen und per `urllib` abgerufen: bestanden.
- Hauptsektionen sichtbar: Header, Arbeitsfluss, Profil, Zielgenerator, Wochenplan, Aufgabenwerkstatt, Connectoren, Beobachtung, Quality/Safety Panel, Druckansicht: bestanden.
- Generator-Interaktion geprüft: Zielwechsel, eigenes Ziel und Unterstützungsfokus aktualisieren die sichtbare Planung: bestanden.
- Narrow-Mobile-Check: responsive CSS für `max-width: 660px` geprüft; Browser-DOM zeigte keine horizontale Überbreite in der verfügbaren Viewport-Prüfung. Ein echter Geräte-/Tablet-Test bleibt für v3 sinnvoll.
- Bestehende verbundene Projekte wurden nicht editiert; sie wurden nur auf Existenz geprüft und in `index.html` verlinkt/referenziert.

## GE- und Datenschutzprüfung

Stärken:

- Nur fiktive Gruppe Rot und Kind A-D.
- Keine Diagnosen, echten Namen, Familieninformationen oder Leistungsrankings.
- Stationen sind handlungsnah, materialbezogen und beobachtbar.
- Unterstützung wird als Kontext/Hilfe formuliert, nicht als Defizit.
- Menschliche Lehrerentscheidung wird ausdrücklich benannt.

Risiken:

- Bei echter Nutzung könnten Lehrkräfte versehentlich personenbezogene Daten in das Freitextfeld schreiben. Die Demo speichert zwar nichts, aber Ausdruck/Screenshot/Kopieren bleibt ein Datenschutzrisiko.
- Connector-Links können lokal je nach Browsermodus anders reagieren. Deshalb sind manuelle Pfade nötig.
- Die Stationen sind fachlich plausible Beispiele, aber keine individualisierte Förderplanung.

## Offen / nicht umgesetzt

- Kein persistenter Export, bewusst aus Datenschutzgründen.
- Keine automatische Prüfung, ob Connector-Links aus dem Browser tatsächlich geöffnet werden dürfen.
- Keine echte Integration mit Wochenplan-Dateien; nur sicherer Verweis.
- Keine Barrierefreiheitsprüfung mit Screenreader.

## Nächster bester v3-Schritt

Ein lokaler Markdown-/Text-Export der aktuellen Wochenplanung wäre der sinnvollste kleine v3-Schritt. Er sollte keine automatische Speicherung auslösen, sondern nur eine kopierbare, anonymisierte Textfassung erzeugen mit Warnhinweis: Vor Übernahme in echte Dokumentation prüfen und anonymisieren.
