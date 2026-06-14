# GE Lernwerkstatt Beobachtungs-App

Lokale Browser-App für ressourcenorientierte Beobachtung in einer GE-Lernwerkstatt. Die App arbeitet pseudonym, ohne Cloud und ohne Backend. Neu ist ein flexibles Kompetenzraster mit pädagogischer Einschätzung von 1–10, Hilfegrad, Transferstatus, Verlauf, Druck und Export.

## Start

```bash
cd /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
npm install
npm run start
```

Danach im Browser öffnen:

http://127.0.0.1:5173

Falls der Port belegt ist, zeigt Vite im Terminal eine alternative lokale Adresse an.

## Build

```bash
npm run build
npm run preview
```

## Neue Hauptfunktion: Kompetenzraster

Die App enthält jetzt eine eigene Seite „Kompetenzraster“. Dort können Lernbereiche ausgewählt, Kompetenzen gesichtet, Beispielindikatoren gelesen und passende Beobachtungsfragen genutzt werden.

Angelegte Lernbereiche:

1. Mathematik / Pränumerik
2. Deutsch / Kommunikation
3. Sachunterricht / Weltverstehen
4. Wahrnehmung
5. Motorik
6. Lebenspraxis
7. Sozial-emotionale Entwicklung
8. Unterstützte Kommunikation
9. Arbeitsverhalten / Lernhaltung
10. Selbstständigkeit / Orientierung im Schulalltag

Jeder Bereich enthält Kompetenzbeispiele, basale/unterstützte/erweiterte Indikatoren und Beobachtungsfragen.

## Skala 1–10

Die Skala ist eine pädagogische Einschätzung. Sie ist ausdrücklich:

- keine Note
- keine Diagnose
- kein normierter Testwert
- keine automatische Bewertung

Leitfrage:

„Wie sicher, selbstständig und übertragbar zeigt sich diese Kompetenz aktuell unter den beobachteten Bedingungen?“

Skalenlogik:

1. zeigt die Kompetenz aktuell noch nicht beobachtbar
2. reagiert kurz oder unspezifisch auf Angebot
3. zeigt erste Aufmerksamkeit oder Beteiligung mit viel Unterstützung
4. beteiligt sich mit klarer Struktur und direkter Hilfe
5. zeigt die Kompetenz in vertrauter Situation mit Unterstützung
6. zeigt die Kompetenz wiederholt mit geringer Hilfe
7. zeigt die Kompetenz in vertrauter Situation weitgehend selbstständig
8. überträgt die Kompetenz auf ähnliche Materialien oder Situationen
9. zeigt die Kompetenz flexibel in mehreren Situationen
10. nutzt die Kompetenz sicher, selbstständig und alltagsbezogen

## Funktionen

- Dashboard mit heutigen Beobachtungen, zuletzt eingeschätzten Lernbereichen, offenen Transferprüfungen und vorsichtigen Entwicklungshinweisen
- Neue Beobachtungen mit Lernbereich, Kompetenz, 1–10-Einschätzung, Sicherheit, Hilfegrad und Transfer erfassen
- Bestehende Beobachtungen bearbeiten und löschen
- Kompetenzraster-Seite mit zehn GE-Lernbereichen, Kompetenzen, Skala, Indikatoren und Beobachtungsfragen
- Filter nach Kürzel/Farbe, Lernbereich, Station und Freitext
- Auswertung mit Skalenbedeutung, Hilfegrad, Transferstatus, nächster Stufe, nächster Beobachtungsfrage und Förderplan-Formulierung
- Verlaufsansicht pro Kürzel/Farbe, Lernbereich und Kompetenz
- Durchschnitt nur als vorsichtige Orientierung, nicht als Leistungswert
- Status der Veränderung: stabil, unsicher, zunehmend oder noch zu wenig Daten
- Teamgespräch-Vorlage mit Leitfragen zu Beobachtung, Hilfeform und nächstem Schritt
- Nächste-Woche-Planung mit kleinen, überprüfbaren Handlungsschritten
- Druckansichten für Beobachtungsbogen, Materialkarten und Teamvorlage
- JSON-Backup exportieren und importieren
- Markdown-Export per Kopieren oder Download
- Druckansicht mit Kompetenzdaten, Hilfegrad, Transfer und nächster Beobachtungsfrage
- Druckbarer Beobachtungsbogen mit Kompetenzraster-Feldern
- Eigene Stationen lokal ergänzen

## Backup und Import

1. In „Auswertung / Export“ „JSON-Backup“ wählen.
2. Die Datei `ge-lernwerkstatt-backup-YYYY-MM-DD.json` sicher speichern.
3. Sie enthält pädagogische Beobachtungen und 1–10-Einschätzungen; diese Daten sind sensibel.
4. Für Wiederherstellung „JSON importieren“ wählen.
5. Der Import fügt Beobachtungen hinzu und ersetzt vorhandene Daten nicht automatisch.

## Datenschutz und Grenzen

- Keine Cloud, kein Login, kein Backend.
- Speicherung nur lokal im Browser-LocalStorage des Geräts.
- Nur Kürzel/Farben verwenden, keine echten Namen.
- Keine Diagnosen, Geburtsdaten, Adressen, Familieninformationen oder medizinischen Informationen eintragen.
- Einschätzungen 1–10 sind sensible pädagogische Daten.
- Die Skala nie isoliert betrachten: Kontext, Hilfeform, Transfer, Tagesform und Beobachtungsgrundlage gehören immer dazu.
- Keine Schüler-Rankings, keine Ampel „bestanden/nicht bestanden“, keine Regelschulnormen.
- Die App unterstützt pädagogische Strukturierung. Sie ersetzt keine Förderdiagnostik und keine professionelle Teamentscheidung.

## Wichtige Dateien

- `src/main.jsx` – App-Logik, Datenmodell, Kompetenzraster, Views, Export/Import
- `src/styles.css` – Layout, Druckansicht, responsive Darstellung
- `APP_KONZEPT.md` – pädagogisches und technisches Konzept
- `ERGEBNIS.md` – Zusammenfassung der aktuellen Verbesserung

## Agentenarbeit und Endabnahme MVP 6

Beteiligte Kanban-Aufgaben:

- `t_000eeba3` (coder): UI/UX, Formularstruktur, Bedienbarkeit und Build-/Browser-Check. Ergebnis wurde übernommen: ruhiger Header, klarere Navigation, gruppiertes Beobachtungsformular, Empty States.
- `t_bca9db34` (lernwerkstatt): Fachauftrag zu GE-Passung, Kompetenzraster und Beobachtungssprache. Der formale Handoff enthielt keinen Ergebnistext; die Endabnahme hat die geforderten Punkte deshalb direkt geprüft und ergänzt.
- `t_0e92e6e5` (schule): Fachauftrag zu Schulalltag, Förderplanung, Druck/Export. Der formale Handoff enthielt keinen Ergebnistext; die Endabnahme hat die Alltagstauglichkeit, Druckhinweise und Dokumentation direkt geprüft.
- `t_b6e15e04` (neva): Integration, Dokumentation, Build, Fach- und Datenschutz-Endabnahme.

## Offene nächste Verbesserungen

- echte Tablet-/Schullaptop-Prüfung in mehreren Viewports durchführen
- Drucklayout im Kollegium mit 1–2 echten, anonymisierten Beispielsituationen testen
- Kompetenzlisten je Lerngruppe fachlich kürzen oder erweitern
- optional: kleine Import-Vorschau vor dem Einspielen eines JSON-Backups ergänzen
- optional: kompakter Team-Export mit nur 5–7 Kernfeldern für kurze Besprechungen
