# Alpha 20 - Small UI Fix Report

Datum: 2026-05-18
Status: umgesetzt

## Anlass

Der Tablet-Praxischeck hat keinen inhaltlichen Fehler gefunden, aber eine kleine Orientierungs-Schwäche: Auf 390px steht vor der eigentlichen interaktiven `Schrittkarte Mama` zuerst die allgemeine Übersicht `Leseweg`. Für die Lehrkraft ist diese Übersicht sinnvoll, für das Kind kann sie aber mit dem aktuellen Handlungsauftrag konkurrieren.

## Umgesetzter kleinster Fix

Geändert wurde nur die Reihenfolge im Kinder-Lesebereich:

- Vorher: `GuidedReadingPath` vor `MamaStepCard`
- Nachher: `MamaStepCard` vor `GuidedReadingPath`

Datei:

- `src/App.tsx`

## Warum diese Änderung klein genug ist

- Keine neuen Wörter.
- Keine neue Aufgabe.
- Keine neue Story.
- Keine Änderung an Datenmodell, Storage, Export, Login, Cloud oder Profilen.
- Keine neue Bewertung, kein Score, kein Timer, keine Diagnose.
- Die Alpha-18-Orientierung bleibt erhalten, nur nach der aktuellen Schrittkarte.
- Die Alpha-19-Mama-Karte bleibt interaktiv und unverändert in Inhalt und Steuerung.

## Erwarteter Nutzen

Das Kind sieht im Lesebereich zuerst den aktuellen Schritt (`Wort ansehen`, danach `Silben lesen` usw.). Die Übersicht bleibt darunter als Lehrkraft-/Orientierungshilfe verfügbar, konkurriert aber weniger mit dem aktuellen Schritt.
