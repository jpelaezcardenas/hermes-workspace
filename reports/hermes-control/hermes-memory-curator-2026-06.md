## Kurzfazit
Hermes hat in den letzten Reports vor allem drei stabile Dinge gelernt: kleine, akzeptanzgepruefte Lernwerkstatt-Slices funktionieren besser als grosse Sammelauftraege; offene Handoffs und Chris-Entscheidungen muessen sichtbar gehalten werden, sonst staut sich die Arbeit; und die GE-/Datenschutzgrenzen sind inzwischen gut genug verankert, sollten aber weiterhin kurz und hartnäckig wiederholt werden.

## Was Hermes gelernt hat
- Lernwerkstatt-Arbeit wird deutlich robuster, wenn sie in kleine, sichtbare Slices zerlegt wird: erst Kontextpruefung, dann genau eine Veraenderung, dann Browser-/Build-/Schmalbreiten-Check, dann kurzer Ergebnisreport.
- Der GE-Spielraum-/Pattern-Ansatz hat sich als nutzbar erwiesen: eigener Kinderaum, grosse Touchziele, wenig Auswahl, klare Hilfe, getrennte Lehrkraftlogik.
- Lokal belegt + datensparsam + keine externen Quellen ohne Not ist ein tragfaehiger Standard fuer GE- und Materialarbeit.
- Die Decision-Inbox-Struktur hilft, offene Arbeit nicht in diffuse Wichtigkeit abgleiten zu lassen.

## Wiederholte Probleme
- Zu grosse oder zu breite Aufgaben loesen Wiederholungen desselben Grundfehlers aus: zu viel auf einmal, dann Budget-/Iterationsstopp, dann nur halbfertige Verifikation.
- Offene Codex-/Handoff-Paare bleiben sonst haengen, wenn kein klares Archiv-/Outbox-Signal vorliegt.
- Einige Krisen sind keine technischen Blocker, sondern Priorisierungs- und Entscheidungsblockaden (z. B. Tool-Freigaben oder offene Produktentscheidungen).
- Bei Lernwerkstatt-Aufgaben droht immer wieder, dass neue Features zu frueh begonnen werden, bevor Start, Kindermodus und schmale Breite sauber geprueft sind.

## Gute Muster
- Acceptance-gated slices statt Grossauftrag.
- Decision-Inbox mit klaren Buckets und genau einem naechsten kleinen Schritt.
- Lokale Quellenverdichtung statt externe Materialsuche ohne Beleg.
- GE-typische Trennung: Kindermodus / Lehrkraftmodus / Datenschutz.
- Kurze, reportbare Verifikation statt nur textlicher Abschluss.

## Vorgeschlagene Memory-Aenderungen
1. Datei: `/Users/zondrius/.hermes/profiles/neva/memories/MEMORY.md`

   Exact text to add unter `## Durable Hermes Lessons`:
   - `For broad Lernwerkstatt or GE-app goals, always finish one acceptance-gated slice before starting the next; the minimum proof is build/open + one changed interaction + a short result file.`
   - `Open Codex handoff pairs should be treated as workflow debt: inspect inbox/outbox evidence first, then archive or split, but do not start new large features until the open-loop is visible.`

2. Datei: `/Users/zondrius/.hermes/memories/MEMORY.md`

   Exact text to add unter `## Durable Rules`:
   - `Prefer small verifiable slices for Lernwerkstatt work; do not let broad goals skip browser/build proof.`

## Vorgeschlagene Skill-Aenderungen
1. Datei: `/Users/zondrius/.hermes/skills/education/lernwerkstatt-build-loop/SKILL.md`

   Exact text to add in `## Core Rules` oder direkt nach Punkt 8:
   - `If an open Codex handoff or unresolved result exists for the same Lernwerkstatt thread, resolve that evidence first before starting a new feature slice.`

2. Datei: `/Users/zondrius/.hermes/skills/education/lernwerkstatt-build-loop/SKILL.md`

   Exact text to add in `## Standard Loop` after `### 5. Verify`:
   - `After verify, write one compact result note and one next-slice prompt before moving on; do not silently chain into the next feature.`

## Loeschen / Nicht speichern
- Keine Rohberichte, Task-IDs, Prompt-Dumps oder session-spezifische Iterationsreste.
- Keine persoenlichen oder schuelerbezogenen Details.
- Keine neuen harten Regeln zu einzelnen Projektnamen, wenn das Muster bereits allgemein gilt.
- Keine doppelte Speicherung derselben GE-/Datenschutzregeln, wenn sie bereits in den Skills sauber stehen.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Einen der vorgeschlagenen kurzen Memory-Saetze pruefen und bei Bedarf in die passende Memory-Datei uebernehmen.
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Ob die Acceptance-gated Slice-Logik die Iteration-budget-Stops weiter senkt.
- SPAETER: Falls sich das Muster erneut bestaetigt, die Lernwerkstatt-Build-Loop-Regel in einen kurzen Arbeitsstandard verdichten.
- BLOCKIERT: nichts
- NICHT_TUN: Keine grossen Umschreibungen der Memory-Dateien, keine Speicherungen von Rohlogs oder personenbezogenen Daten.
- Naechste kleinste Aktion: Die vorgeschlagenen Aenderungssaetze gegen die bestehenden Memory-/Skill-Dateien spiegeln.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-memory-curator-2026-06.md