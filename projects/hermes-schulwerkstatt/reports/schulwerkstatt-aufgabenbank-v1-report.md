# Schulwerkstatt v4 · Aufgabenbank v1 Report

## Changed files

- `index.html`
- `README.md`
- `reports/schulwerkstatt-aufgabenbank-v1-report.md`

## Verification

- Standalone-HTML bleibt eine Datei ohne Build-Step und ohne externe Requests.
- Embedded-JS wurde statisch aus `index.html` extrahiert und mit `node --check` geprüft.
- Aufgabenbank-Daten enthalten 24 Mini-Aufgaben: 6 Lesen, 6 Mengen, 6 Kommunikation/UK, 6 Wahrnehmung/Alltag.
- Jede Aufgabe enthält Titel, einfache Kinderaktion, Lehrerziel, Material, Unterstützungsniveau, Dauer, Beobachtungsfrage, Überladungsschutz und Connector.
- Lokaler HTTP-Server wurde für Browserprüfung genutzt: `http://127.0.0.1:8791/` (`8787` war bereits belegt).
- Browserprüfung: Aufgabenbank rendert 24 Karten, Filter „Lesen“ reduziert sichtbar auf 6 Karten, Förderkompass erzeugt zwei empfohlene Aufgaben, Export enthält empfohlene Aufgaben, Druckzusammenfassung enthält Aufgaben und keine Rohbeobachtung.
- Overflow-Prüfung im Browser: `documentElement.scrollWidth > clientWidth` war `false`. Narrow-CSS ist enthalten; eine echte Device-Emulation wurde nicht zusätzlich gestartet.

## Strengths

- Der Förderkompass wird konkreter, ohne eine automatische Förderentscheidung zu simulieren.
- Aufgaben sind kurz, materialnah und passen zu GE-Alltag: basal, konkret-handelnd, unterstützt und symbolisch.
- Empfehlungen bleiben lokale Vorschläge; die Oberfläche markiert Fallbacks mit „passend prüfen“.
- Datenschutzgrenze bleibt sichtbar: keine echten Namen, Diagnosen, Scores oder automatische Speicherung.

## Limitations

- Die Aufgabenbank ist kuratiertes Demo-Material, noch keine echte schulinterne Materialsammlung.
- UK-Symbole sind nur als lokale Karten/Symbole benannt; keine validierte Symbolsammlung ist eingebunden.
- Der Ranking-Algorithmus ist bewusst einfach: Bereich + Unterstützungsniveau + kurze Dauer bei Ermüdung.
- Keine Persistenz: gute Empfehlungen müssen manuell kopiert oder gedruckt werden.

## Next step

Aufgabenbank v2 sollte aus den 24 Aufgaben druckbare Einzelkarten machen: Vorderseite Kinderauftrag + Material, Rückseite Lehrerziel + Beobachtungsfrage + Überladungsschutz.
