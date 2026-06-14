# Schulwerkstatt v5 – Aufgabenkarten v1 Report

## Geänderte Dateien

- `index.html`
  - Neuer Bereich `Aufgabenkarten v1` nach der Aufgabenbank.
  - Druckbare Karten aus gefilterter Aufgabenbank oder Förderkompass-Empfehlungen.
  - Steuerung: „Alle gefilterten Karten anzeigen“, „Nur empfohlene Karten anzeigen“, „Drucken“.
  - Export erweitert um aktuell ausgewählte Aufgabenkarten.
  - Print-CSS für klare A4-Karten ergänzt.
- `README.md`
  - v5 und Aufgabenkarten v1 dokumentiert.
- `reports/schulwerkstatt-aufgabenkarten-v1-report.md`
  - Dieser Bericht.

## Verification

- Embedded JavaScript wurde syntaktisch geprüft.
- JSON-Demodaten bleiben valide.
- Lokaler HTTP-Preview wurde geöffnet.
- Bereich `Aufgabenkarten v1` existiert.
- Bei breiten Filtern erscheinen 24 druckbare Karten.
- Nach Förderkompass-Generierung erscheinen im empfohlenen Kartenmodus 2 Karten.
- Drucksteuerung existiert und nutzt nur `window.print()`; keine Speicherung, kein Upload.
- Rohbeobachtungsfeld ist in der Druckansicht weiterhin ausgeblendet.
- Duplicate-ID-Check ohne Befund.
- Preview zeigte keine horizontale Überbreite im aktuellen Browser-Viewport.
- Keine verbundenen Projekte wie LeseWerk, GE-Lernwerkstatt, Spielraum Generator oder weekly-plans wurden geändert.

## Stärken

- Praktisch: Jede Karte trennt Kind-Seite und Lehrer-Seite klar.
- GE-sicher: kurze Handlung, Material, Beobachtungsfrage und Überladungsschutz stehen direkt zusammen.
- Lokal und datensparsam: keine automatische Speicherung, keine echten Schülerdaten, keine Rohbeobachtung im Druck.
- Anschlussfähig: Förderkompass-Empfehlungen können direkt in druckbare Karten wechseln.

## Grenzen

- Noch keine echten Schneidemarken oder Vorder-/Rückseiten-Paginierung.
- Kartenlayout ist bewusst schlicht; Materialbilder/Symbole fehlen.
- Druckqualität hängt weiterhin vom Browser-Druckdialog ab.
- Inhalte bleiben Beispielaufgaben und müssen vor Unterrichtseinsatz fachlich geprüft werden.

## Nächster sinnvoller Schritt

Aufgabenkarten v2: einfache Schneidemarken und eine optionale Materialkorb-Checkliste pro Kartenauswahl ergänzen – ohne Speicherung und ohne echte Schülerdaten.
