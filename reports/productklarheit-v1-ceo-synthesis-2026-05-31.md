# Productklarheit v1 - CEO QA Synthese 2026-05-31

## 1. Statusbericht (Klartext)
Die v1-Slices "Schulwerkstatt" und "LeseWerk" wurden erfolgreich integriert. Das System verfügt nun über ein zentrales Cockpit mit klar definierten Modul-Rollen und einem fachlich fundierten Lehrerbereich im LeseWerk (Alpha-73A Alltagswortschatz). Die pädagogische Ausrichtung wurde konsequent auf GE-Bedarfe (Geistige Entwicklung) optimiert: Keine Noten, kein Zeitdruck, Fokus auf "Arbeitshypothesen". Technisch ist das System stabil, aber zustandslos (keine Datenbank).

## 2. Schulwerkstatt: Was ist neu?
- **Workflow-Strip:** Ein 3-Schritte-Guide ("Fokus -> Start -> Sichern") führt Lehrkräfte in 30 Sekunden zur Action.
- **Product-Map:** Klare Trennung der vier Säulen (Schulwerkstatt, LeseWerk, GE-Lernwerkstatt, Spielraum) direkt auf dem Startbildschirm.
- **GE-Wording:** Umstellung von Bewertungssprache auf prozessorientierte Begriffe (z. B. "Pädagogische Arbeitshypothese").

## 3. LeseWerk: Was ist neu?
- **Alpha-73A Inventory:** Der 16-Wort-Alltagswortschatz ist nun für Lehrkräfte gezielt filterbar (Schule, Essen, Körper, Alltag).
- **Didaktische Transparenz:** Komplexe Grapheme (sch, pf, st) werden explizit markiert, um Überforderung bei Schülern präventiv zu vermeiden.
- **Vorschau-Modus:** "Wort sichten" erlaubt den direkten Sprung in die Schüleransicht für gezielte Vorführung oder Auswahl.

## 4. Quality Rating (1-10)
| Metrik | Rating | Begründung |
| :--- | :---: | :--- |
| **Übersichtlichkeit** | 9 | Modul-Map und 3-Schritte-Guide schaffen sofort Klarheit. |
| **GE-Tauglichkeit** | 10 | Konsequente Vermeidung von Scores/Druck; Fokus auf Arbeitshypothesen. |
| **Teacher Usefulness** | 8 | Filterbarer Alltagswortschatz spart Vorbereitungszeit; DB fehlt für History. |
| **Child Safety** | 9 | Keine Stigmatisierung; klare Fehlerkultur ("versuchen" statt "falsch"). |
| **Stability** | 9 | Rein UI-basiert, keine externen Abhängigkeiten, Tests sind grün (239/239). |

## 5. Top 5 Next Execute-Goals
1. **URL-Deep-Linking (Safe):** Übergabe des Schüler-Farbprofils (z. B. `?profile=gelb`) vom Cockpit an LeseWerk zur nahtlosen Modul-Iteration.
2. **Material-Korb Integration (High Leverage):** Export-Funktion für die Alpha-73A Wortkarten direkt aus der Schulwerkstatt.
3. **Observation-Bridge:** Einfache "Sichern"-Funktion, die Beobachtungen aus LeseWerk als Text-Snippet für das GE-Cockpit bereitstellt (Copy-Paste-Safe).
4. **Spielraum-Generator Update:** Übertragung des Alpha-73A Wortschatzes in die Aufgabenmaschine für Mengen- und Wahrnehmungsübungen.
5. **Mini-Local-Storage:** Persistenz der Lehrer-Auswahl (z. B. aktiver Wortschatz-Filter) für die Dauer der Browsersitzung.

## 6. Anti-Blocking Rule Set für Hermes Tasks
Um zukünftige Blockaden oder überladene Tasks zu vermeiden, gelten ab sofort folgende Regeln:
- **Max Scope:** Ein Task darf maximal 2 Dateien oder 1 logische Funktion ändern.
- **No Forced Unknowns:** Keine Tasks starten, die Hardware-Mapping oder externe API-Auth (z. B. Codex-Auth) benötigen, wenn kein lokaler Fallback existiert.
- **One Slice at a Time:** Erst UI-Spec, dann Code-Slice, dann QA-Synthese. Keine "Do-it-all" Tasks.
- **Mandatory Report:** Jede Code-Änderung schließt zwingend mit einem standardisierten `/reports/` Markdown-File ab.
- **Independent Verification:** Tests (`npm test`) müssen nach jedem Slice grün sein; manuelle QA-Checks werden im Report dokumentiert.

---
*Erstellt von schule-Agent im Auftrag von CEO Chris.*
