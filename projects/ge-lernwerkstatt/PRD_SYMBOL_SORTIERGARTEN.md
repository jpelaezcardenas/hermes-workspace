# PRD: Symbol-Sortiergarten (kleines GE-Lernwerkstatt-Spiel)

## 1. Context
- Bestehende lokale App: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt`.
- Relevante Regeln gelesen: Hermes Operating Kernel, Anti-Glaze-Regel, Production-AI-Checkliste, Personal Research Engine Workflow, Senior-PM-/PRD-Flow.
- Bestehender Schüler:innenmodus Beta enthält bereits stationsartige Übungsspiele ohne Speicherung. Der neue Prototyp soll daran anschließen und nicht die Lehrkraft-Beobachtungslogik umbauen.

## 2. Users / Audience
- Schüler:innen im Förderschwerpunkt Geistige Entwicklung, Klassen 1–4, mit sehr heterogenen Voraussetzungen.
- Lehrkraft nutzt den Prototyp zur kurzen Beobachtung: Beteiligung, Hilfeform, nächster Schritt.
- Datenschutz: nur Rollen/Farben/Platzhalter, keine echten Namen, Diagnosen, Fotos oder privaten Rohdaten.

## 3. Problem
- Viele digitale Lernspiele sind zu schnell, zu bunt, punktelastig oder normierend.
- Für GE braucht es eine ruhige, wiederholbare Zuordnungsaufgabe mit großen Touch-Zielen, Wahl von Hilfe/Pause und beobachtbarer Lernspur ohne Leistungsranking.

## 4. Target Outcome
- Ein kleiner lokal eingebauter Prototyp trainiert Symbolverständnis und visuelle Zuordnung.
- Drei Niveaus: A grundlegend, B erweitert, C herausfordernd.
- Keine Punkte, kein Zeitlimit, keine 1–10-Skala im Schüler:innenmodus.
- Lehrkraft sieht eine einfache, nicht gespeicherte Notiz-/Beobachtungsbox mit Hilfeform und nächstem Schritt.

## 5. Non-Goals
- Kein vollständiges Spielsystem, kein Account, kein Backend, kein Cloud-Sync.
- Keine automatische Förderdiagnostik, kein Scoring, kein Ranking, keine Normwerte.
- Keine neuen Abhängigkeiten, keine Veröffentlichung, kein Commit/Push/PR.
- Keine Verarbeitung echter Schülerdaten.

## 6. Privacy and Safety
- Gelesen: nur lokale Quelltexte und lokale Regeldateien.
- Geschrieben: App-Code/CSS und Projektdokumentation.
- Spielstatus bleibt im React-State, nicht im LocalStorage.
- Lehrkraftnotiz ist nur eine lokale UI-Anzeige mit neutralen Auswahlwerten, nicht dauerhaft gespeichert.
- Human decision point: Chris entscheidet vor produktiver Nutzung im Unterricht.

## 7. Success Criteria
- Spiel ist über die Navigation erreichbar und zerstört bestehende Views nicht.
- Niveaus A/B/C verändern Aufgabe sichtbar und verständlich.
- Touch-Ziele sind groß, kontrastarm/ruhig und responsiv.
- Rückmeldung ist positiv, aber nicht wertend: „passt“, „nochmal“, „Hilfe ist okay“.
- Build läuft, Browser-Check zeigt keine offensichtlichen Überlappungen oder JS-Fehler.

## 8. Acceptance Criteria
- Given die App ist lokal gestartet, when Chris „Symbol-Sortiergarten“ öffnet, then erscheint ein ruhiger Spielbereich mit Niveauwahl A/B/C.
- Given ein Kind tippt ein Symbol an, when es in den Zielgarten gelegt wird, then gibt es eine klare visuelle Rückmeldung ohne Punkte/Zeitdruck.
- Given Aufgabe ist vollständig, when alle passenden Karten liegen, then erscheint ein Abschluss mit „nochmal“, „Pause“ und nächstem kleinen Schritt.
- Given Lehrkraft schaut auf die Lernspur, then sind Hilfeform, Niveau und Beobachtungsfrage sichtbar, ohne personenbezogene Daten.
- Given ein kleiner Bildschirm, then sind Karten einspaltig/zweispaltig nutzbar und nicht überlappend.

## 9. Risks and Open Questions
- Risiko: Zu abstrakte Symbolzuordnung für basale Lernende. Gegenmaßnahme: Niveau A nur zwei sehr konkrete Kategorien und große Karten.
- Risiko: Visuelle Überlastung. Gegenmaßnahme: wenige Karten, ruhige Farben, keine Animationserzwingung.
- Risiko: Lehrkraftnotiz wird als Diagnose missverstanden. Gegenmaßnahme: klare Formulierung „nicht gespeichert, keine Bewertung“.
- Risiko: Bestehender Code ist monolithisch. Gegenmaßnahme: kleine additive Komponente statt Umbau.
- Offene Frage: Echte Unterrichtstauglichkeit muss Chris später mit anonymisierten Situationen prüfen.

## 10. Build Order
1. Neue Datenstruktur und Komponente für Symbol-Sortiergarten ergänzen.
2. Navigation und View minimal ergänzen.
3. CSS nur für neue Klassen ergänzen, bestehende Styles nicht anfassen.
4. Ergebnisdokumentation aktualisieren.
5. Build, Browser, PII-/Secret-Scan prüfen.

## 11. Agent Roles / Kanban Plan
- Neva: Kontext lesen, PRD erstellen, Integration prüfen, Abschlussbericht.
- schule: PRD kritisch auf GE-Eignung, Datenschutz, didaktische Passung prüfen.
- coder: kleinsten Prototyp lokal bauen und testen.
- memory: am Ende prüfen, ob dauerhafte Speicherung sinnvoll ist.

## 12. Test Plan
- `npm run build`.
- Lokaler Browser-Check über Vite/Preview: Navigation, Spielstart, Niveauwechsel, Kartenklicks, Abschluss, responsive Sichtprüfung.
- Konsolencheck auf JS-Fehler.
- Textscan auf Namen/Diagnosen/Secrets und problematische 1–10-Skala im Schüler:innenmodus.

## 13. Output Files / Handoff
- Erwartet: `src/main.jsx`, `src/styles.css`, `PRD_SYMBOL_SORTIERGARTEN.md`, `ERGEBNIS_SYMBOL_SORTIERGARTEN.md`.
- Handoff enthält geänderte Dateien, Tests, Restrisiken und lokale Öffnungsanleitung.

## Critical Review
- Strengths: kleiner, lokaler, rückbaubarer Slice; klare Datenschutzgrenzen; drei Niveaus; keine Bewertungsskala im Schüler:innenmodus.
- Weaknesses: bisher nur Konzept/Prototyp, keine echte Erprobung mit Material, möglicherweise für einige Kinder noch zu symbolisch.
- Missing evidence: keine empirische Prüfung, keine Kollegiums-/Schüler:innen-Rückmeldung, keine Tabletprüfung auf echter Hardware.
- Privacy/safety risks: UI-Notizen dürfen nicht zu echten personenbezogenen Beobachtungsdaten werden; daher nicht speichern.
- Biggest quality lever: reale Materialkarten/Objekte parallel anbieten und Lehrkraftbeobachtung mit Farbkürzeln getrennt dokumentieren.
- Smallest safe next step: Prototyp additiv bauen, lokal prüfen, dann Chris visuell entscheiden lassen.
