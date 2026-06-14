# Schulwerkstatt v3 – Förderkompass v1 Report

## Geänderte Dateien

- `index.html`
  - Neue sichtbare Sektion `Förderkompass v1` nach Beobachtung und vor Quality/Safety.
  - Top-Navigation und Arbeitsfluss um Förderkompass erweitert.
  - Lokale JavaScript-Empfehlungslogik ohne AI/API-Call ergänzt.
  - Markdown/Text-Export für aktuellen Wochenplan + Förderkompass-Ergebnis ergänzt.
  - Druckansicht erweitert: nächster Förderkompass-Schritt wird gedruckt, Rohbeobachtung nicht.
- `README.md`
  - v3/Förderkompass-Funktion, Datenschutzgrenze und nächster sinnvoller Schritt dokumentiert.
- `reports/schulwerkstatt-foerderkompass-v1-report.md`
  - Dieser Bericht.

## Verification

Abschließend geprüft am 2026-05-25:

- `index.html` bleibt standalone und nutzt keine Build-Pipeline.
- JavaScript aus dem eingebetteten `<script>` wurde per Syntaxcheck geprüft: bestanden.
- `data/schulwerkstatt-demo.json` wurde per `json.tool` geprüft: bestanden.
- App öffnet über lokalen HTTP-Server auf `http://127.0.0.1:8788/`: bestanden.
- Förderkompass-Section ist im DOM vorhanden: bestanden.
- Button „Empfehlung erzeugen“ erzeugt sechs Ergebnisfelder: Lernsignal, nächster Schritt, Aufgabe, Support/Material, Überladungswarnung, Connector: bestanden.
- Export enthält Wochenplan, Datenschutz-Hinweis und Förderkompass-Ausgabe: bestanden.
- Druckansicht enthält den nächsten Schritt, aber nicht das Rohbeobachtungsfeld: bestanden.
- Narrow/mobile DOM-Prüfung zeigte keine horizontale Überladung: bestanden.
- Bestehende Projekte LeseWerk, GE-Lernwerkstatt, Spielraum Generator und weekly-plans wurden nicht verändert.

## Stärken

- Der Förderkompass bleibt datensparsam: keine Speicherung, keine Cloud, keine echten Namen nötig.
- Die Sprache ist als Arbeitshypothese formuliert und vermeidet Diagnose- oder Defizitlogik.
- Fokusbereiche Lesen, Mengen, Kommunikation/UK und Wahrnehmung/Alltag sind direkt mit passenden nächsten Schritten verbunden.
- Die Empfehlungen bleiben klein genug für den nächsten Unterrichtstag.
- Connector-Hinweise verknüpfen die Empfehlung mit bestehenden lokalen Systemen, ohne diese zu verändern.

## Grenzen

- v1 nutzt regelbasierte Vorlagen. Das ist sicher und lokal, aber noch nicht fein adaptiv.
- Die freie Beobachtung wird bewusst nicht semantisch ausgewertet, damit keine Scheingenauigkeit entsteht.
- Es gibt noch keine separate Team-Checkliste und keine Materialdruckkarte.
- Clipboard-Kopieren hängt vom Browserkontext ab; Fallback markiert den Text manuell.

## Datenschutz- und GE-Prüfung

- Keine echten Schülerdaten in Beispieltexten.
- Keine Diagnosen, Noten, Rankings oder Scores.
- Beobachtungen werden als pädagogische Arbeitshypothesen formuliert.
- Lehrerentscheidung bleibt ausdrücklich zentral.
- Rohbeobachtungen erscheinen nicht in der Druckansicht.

## Nächste v2-Idee für den Förderkompass

Eine v2 könnte pro Fokusbereich differenziertere Signal-Kombinationen anbieten, z. B. „sicher mit realem Gegenstand, unsicher mit Bild“, „Wartezeit hilft“, „Symbol zu abstrakt“. Daraus könnte eine kleine Team-Checkliste entstehen: Was bleibt gleich? Was wird reduziert? Was wird minimal erweitert?
