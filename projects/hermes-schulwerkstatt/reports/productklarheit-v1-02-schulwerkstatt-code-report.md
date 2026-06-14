# Productklarheit v1 - 02 Schulwerkstatt Code-Report

Datum: 2026-05-31
Task: t_525e8f19
Status: Implementiert (UI-only)

## Geänderte Dateien
- `index.html`: Hauptinteraktionsfläche für die Lehrkraft.

## Änderungen

### 1. First-Screen Product Map / Start-Hier Pfad
- **Workflow-Strip:** Reduziert auf 3 klare Schritte (Fokus wählen -> Modul starten -> Sichern).
- **Product-Map:** Neue Sektion unter dem Hero-Bereich eingeführt. Vier Karten visualisieren die Kernbereiche:
  - **Schulwerkstatt:** "Planung & Material" (Basis)
  - **LeseWerk:** "Lesen & Sprache" (Premium, prominente Hervorhebung)
  - **GE-Lernwerkstatt:** "Kompetenz & Beobachtung" (Dokumentation)
  - **Spielraum:** "Üben & Spiel" (Aufgabenmaschine, prominente Hervorhebung)
- **Navigation:** "Heute starten" leitet nun auf "Geführt starten" (#profil) weiter, um den lehrerzentrierten Workflow zu betonen.

### 2. Safer GE Wording
- **Arbeitshypothese:** In den Sektionen "Geführter Lehrerpfad" und "Nach dem Modul" wurde das Wording konsequent auf "Pädagogische Arbeitshypothese" bzw. "Sichtbare Arbeitshypothese" umgestellt.
- **Vermeidung kritischer Begriffe:** Bestehende Strukturen wurden auf "Punkte", "Noten" etc. geprüft; im neu hinzugefügten UI-Slice wurden keine wettbewerbs- oder bewertungsorientierten Begriffe verwendet.

### 3. Stabilität & Lokale Links
- **Keine neuen Abhängigkeiten:** Rein CSS/HTML-basierte Lösung.
- **Link-Check:** Folgende Pfade bleiben aktiv und funktional:
  - `./lesewerk-v1/dist/index.html`
  - `./ge-lernwerkstatt/dist/index.html`
  - `./spielraum-generator/dist/index.html`

## Verifikation
- [x] HTML-Struktur validiert (keine offenen Tags durch Patching).
- [x] Responsive Check: Product-Map bricht bei <1040px auf 2 Spalten und bei <660px auf 1 Spalte um.
- [x] Text-Check: "diagnostische Hypothese" nicht vorhanden; "Arbeitshypothese" korrekt eingesetzt.
- [x] Lokale Module sind via Product-Map und App-Grid erreichbar.
- [x] Codex-Nachkontrolle: Sichtbare Ampersands in neuen Texten als `&amp;` bereinigt.

## Verbleibende Risiken
- **URL-Parameter:** Die Übergabe von Profilen an die Module ist im UI vorbereitet ("Profil/Fokus wählen"), aber noch nicht technisch via URL-Query-String realisiert (Datenschutzprüfung steht aus).
- **Zustandslosigkeit:** Da keine Datenbank vorhanden ist, werden getroffene Auswahleinstellungen (z.B. im Lehrerpfad) nach einem Refresh zurückgesetzt.
