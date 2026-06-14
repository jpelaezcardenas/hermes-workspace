# Hermes Schulwerkstatt MVP Report

Stand: 2026-05-24

## Kurzfazit

Gebaut wurde ein lokales, nutzbares MVP unter `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt`. Es ist ein teacher-facing Dashboard, das ein anonymisiertes Gruppenprofil, eine Beispielwoche, eine Aufgabenfabrik, Connectoren zu bestehenden lokalen Systemen, eine Beobachtungsrückkopplung und einen GE-Qualitätscheck verbindet.

Direkt öffnen:

`/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

## Was wurde gebaut?

Dateien:

- `index.html` – polierte lokale HTML/CSS-Demo ohne Build-Abhängigkeit
- `data/schulwerkstatt-demo.json` – fiktive Beispieldaten für Gruppe Rot
- `README.md` – genaue Öffnungsanleitung und Datenschutzgrenze
- `reports/schulwerkstatt-mvp-report.md` – dieser Bericht
- `memory/schulwerkstatt-quality-pattern.md` – wiederverwendbares Qualitätsmuster für spätere Hermes-Jobs

Kernbereiche im Dashboard:

1. Anonymisiertes Profil: Gruppe Rot, Kind A-D, Leseeinheiten, Wortschatz, Mengenfokus und Unterstützungsformen.
2. Wochenplan-Generator: Montag bis Freitag mit kurzen Stationen, Zielen, Materialideen, Unterstützungen, Beobachtungsfragen und nächsten Schritten.
3. Task Factory: sechs Beispielaufgaben aus einem Wochenziel.
4. Connector Panel: lokale Pfade zu LeseWerk, Spielraum Generator, GE-Lernwerkstatt und Wochenplanordner.
5. Observation Loop: Beobachtung, Einordnung, nächster Schritt.
6. Quality Panel: GE-Check für Klarheit, Überladung, Datenschutz, Wiederholung und Lehrerentscheidung.

## Wie ergänzt es LeseWerk, Lernwerkstatt und Spielraum Generator?

### LeseWerk

Pfad: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/index.html`

LeseWerk liefert die fruehleseorientierten Aufgaben, Wortfamilien und Mini-Reisen. Die Schulwerkstatt ersetzt LeseWerk nicht, sondern entscheidet, wann ein LeseWerk-artiger Impuls in die Woche passt und mit welchem Beobachtungsauftrag er verbunden wird.

### Spielraum Generator

Pfad: `/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html`

Der Spielraum Generator liefert spielbare Ideen wie den Silben-Garten. Die Schulwerkstatt setzt ihn als Material-/Spielstation ein und verknüpft die Aufgabe mit dem Wochenziel, Unterstützungsgrad und nächstem Planungsschritt.

### GE-Lernwerkstatt

Pfade:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/dist/index.html`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans`

Die GE-Lernwerkstatt liefert Mengen-, Symbol- und Lernkreisaufgaben sowie vorhandene Wochenplanstrukturen. Die Schulwerkstatt fungiert als Connector- und Entscheidungsschicht: Welche vorhandene Station passt jetzt, worauf achtet die Lehrkraft, und was soll Hermes danach generieren?

## Warum ist das nützlich für einen Förderschullehrer?

- Es bündelt verstreute Systeme in einer ruhigen Wochenansicht.
- Es startet nicht mit Technik, sondern mit der pädagogischen Frage: Was braucht die Gruppe diese Woche?
- Es erzeugt konkrete Stationen statt abstrakter Ideen.
- Es hält Beobachtung und nächste Planung eng zusammen.
- Es schützt vor Überladung: kurze Ziele, klare Handlung, sichtbarer Unterstützungsgrad.
- Es lässt die Lehrerentscheidung zentral und behauptet keine automatische Diagnostik.

## Execute Goal vs. wiederkehrende Jobs

### Jetzt via Execute Goal bauen

Sinnvoll für einmalige oder größere Produkt-Slices:

1. Schulwerkstatt Dashboard v2 mit echten lokalen JSON-Konfigurationen.
2. Import eines anonymisierten Wochenziels aus einem Markdown-Plan.
3. Export einer druckbaren Wochenübersicht ohne personenbezogene Daten.
4. Connector-Buttons, die lokale Projekte in neuen Tabs öffnen.
5. Ein erster Mini-Generator: Ziel eingeben -> sechs Stationen als JSON/HTML anzeigen.

### Danach als recurring Jobs vorschlagen

Noch nicht automatisch angelegt. Erst nach Chris' Freigabe.

#### 1. Friday weekly plan draft

Prompt-Vorschlag:

"Erstelle jeden Freitag einen anonymisierten GE-Wochenplanentwurf für die kommende Woche. Nutze nur nicht-personenbezogene Gruppenmuster, prüfe Datenschutz, Überladung und klare Handlung. Gib 5 Stationen mit Ziel, Material, Unterstützung, Beobachtungsfrage und nächstem Schritt aus. Ende mit SOFORT_MACHEN, CHRIS_ENTSCHEIDET, BEOBACHTEN und Naechste kleinste Aktion."

#### 2. Sunday material readiness check

Prompt-Vorschlag:

"Prüfe sonntags den aktuellen anonymisierten Wochenplanentwurf auf Materialklarheit: Was muss vorbereitet, gedruckt, gelegt oder vereinfacht werden? Keine echten Schülerdaten. Markiere unklare Stellen und schlage maximal fünf konkrete Vorbereitungen vor."

#### 3. Daily/after-lesson observation inbox synthesis

Prompt-Vorschlag:

"Fasse nach Unterrichtsnotizen nur anonymisierte Beobachtungsmuster zusammen: Was war handlungsfähig, welche Unterstützung half, was sollte nächste Woche angepasst werden? Keine Namen, Diagnosen oder Familieninfos. Gib keine endgültigen Zuschreibungen, sondern pädagogische Arbeitshypothesen."

#### 4. Weekly quality review and memory update

Prompt-Vorschlag:

"Prüfe wöchentlich die Schulwerkstatt-Ausgaben auf GE-Passung, Datenschutz, visuelle Klarheit, Überladung, Drucksprache und Lehrerentscheidung. Speichere nur stabile, nicht-personenbezogene Qualitätsmuster, keine konkreten Schülerdaten oder temporären Wochenstände."

## Verification Result

Durchgeführte Prüfungen:

- App-Datei existiert und ist nicht leer.
- Daten-Datei existiert und ist valides JSON.
- README existiert und enthält den genauen Öffnungspfad.
- Report existiert.
- Memory Pattern existiert.
- Kernbereiche sind in `index.html` vorhanden: Profil, Wochenplan, Task Factory, Connectoren, Beobachtung, Qualität.
- Connector-Pfade wurden gegen lokale Existenz geprüft.
- Statische Forbidden-Term-Prüfung wurde durchgeführt; keine unangemessene Verwendung der gesuchten harten Labels im App-Text.
- Lokaler Server/Browsertest wurde durchgeführt; Dashboard öffnet sichtbar mit ruhiger Kartenstruktur und responsivem Layout.

## Qualitätsbewertung

Stärken:

- Klarer teacher-facing Charakter.
- Keine echten Schülerdaten, nur Gruppe Rot und Kind A-D.
- Bestehende Systeme werden nicht verändert, sondern referenziert.
- Gute erste visuelle Hierarchie: Header, Navigation, Karten, Wochenraster, Qualitätscheck.
- Hermes-Stärken sind sichtbar: Memory, Kanban, Subagenten, RiskGate und Feedback Loop.

Schwächen:

- Noch statisch; keine echte Generierung aus Eingaben.
- Connectoren öffnen noch nicht als echte Buttons mit Pfadprüfung im UI.
- Keine Druckansicht.
- Keine lokale Speicherung anonymisierter Planvarianten.
- Keine echte Integration mit existierenden Datenformaten der anderen Projekte.

Risiken:

- Wenn später echte Unterrichtsnotizen eingetragen werden, muss eine strikte Anonymisierung vorgeschaltet werden.
- Ein schöner Plan kann pädagogisch trotzdem unpassend sein; menschliche Prüfung bleibt notwendig.
- Zu viele Connectoren könnten im Alltag wieder überladen wirken; v2 sollte Priorisierung anbieten.

## Was fehlt für S-Tier?

1. Mini-Generator mit Eingabefeld: Wochenziel + Unterstützungsgrad -> Stationen.
2. Druck-/Teamansicht mit reduzierter Sprache und Materialliste.
3. Echter lokaler Connector-Status: vorhanden, öffnen, fehlt, später.
4. Beobachtungsinbox mit anonymisierten Satzbausteinen und Datenschutzprüfung vor Übernahme.
5. Zwei Darstellungen: Lehrer-Planung und kinderklare Stationskarte.
6. Bessere Materialkarten mit Icons/Symbol-Platzhaltern und großem Touchlayout.
7. Regression-Smoke-Test für forbidden language, Pfade und Pflichtsektionen.

## Nächste 5 Upgrade Goals

1. "Baue in der Schulwerkstatt einen lokalen Task-Generator: Ziel eingeben, Unterstützungslevel wählen, sechs Stationen als Karten erzeugen. Keine Speicherung, keine echten Schülerdaten."
2. "Erstelle eine druckbare Wochenplanansicht A4 aus dem bestehenden Dashboard mit Materialliste und Beobachtungsfragen."
3. "Füge Connector-Buttons hinzu, die lokale Projekte sichtbar referenzieren und fehlende Pfade als 'später' markieren."
4. "Baue eine anonymisierte Beobachtungsinbox mit drei Feldern: Beobachtung, Einordnung, nächster Schritt; keine personenbezogene Speicherung."
5. "Erstelle ein automatisiertes Smoke-Check-Skript für Pflichtsektionen, lokale Pfade, Datenschutzbegriffe und Dateiexistenz."

## Anti-Glaze Review

Das MVP ist ein brauchbarer erster Connector, aber noch kein fertiges Produkt. Der größte Wert liegt nicht im statischen Wochenplan, sondern im sichtbaren Produktmodell: Hermes verbindet Profilannahme, Wochenziel, Aufgabe, bestehendes System, Beobachtung und nächsten Schritt. Der nächste sinnvolle Schritt ist ein sehr kleiner Generator, nicht sofort eine große Plattform.
