# Hermes Momentum Cockpit - 2026-05-31

Signal: Yellow
Fokus: Offene Codex-Handoffs klaeren, bevor neue Produkt-Slices gestartet werden.

## Heute wirklich tun

1. Action: Momentum-Cockpit-Bericht finalisieren.
   Owner: Hermes/Neva
   Timebox: 20 Minuten
   Source: `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/GOAL.md`
   Done when: Bericht liegt unter `reports/hermes-control/` und nennt genau einen naechsten kleinsten Slice.

2. Action: Offenen Handoff `ge-minikisten-checkliste` bearbeiten oder zur Bearbeitung geben.
   Owner: Codex
   Timebox: 30-45 Minuten
   Source: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
   Done when: Eine Outbox-Rueckgabe existiert oder ein konkreter Blocker steht im Cockpit.

3. Action: Offenen Handoff `ge-spielraum-schmale-viewport` bearbeiten oder sauber blockieren.
   Owner: Codex
   Timebox: 30-45 Minuten
   Source: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
   Done when: Eine Outbox-Rueckgabe existiert oder ein konkreter Blocker steht im Cockpit.

## Wartet auf Chris

- Decision: Archivierung bereits abgeschlossener Handoff-Paare.
  Why Chris: Archivierung ist eine bewusste Ordnungsentscheidung.
  Risk: Low/Medium
  Source: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`

- Decision: `codegraph` P2-Sandbox freigeben oder weiter parken.
  Why Chris: Tool-Integration mit RiskGate.
  Risk: Medium
  Source: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`

- Decision: agentmemory/Codex P4 dauerhaft freigeben oder MCP-only behalten.
  Why Chris: Dauerhafte Memory-/Codex-Policy.
  Risk: Medium
  Source: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`

- Decision: Ob aus dem S-Material ein laengerer Deutsch-Fokus oder nur ein kurzer Einstieg wird.
  Why Chris: Das betrifft Wochenplanung und Unterrichtsfokus.
  Risk: Low
  Source: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/ge-material-scout-2026-05-31.md`

## Codex offen

- Handoff: `codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
  Status: Open, keine passende Outbox-Rueckgabe gefunden.
  Next: Schmalen Viewport pruefen; nur falls noetig minimale Layout-Anpassungen.
  Source: `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`

- Handoff: `codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
  Status: Open, keine passende Outbox-Rueckgabe gefunden.
  Next: Drei Minikisten knapp ausformulieren: Mathe, UK, Lebenspraxis/Post.
  Source: `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-31.md`

## Gewonnen diese Woche

- Win: Productklarheit v1 verbindet Schulwerkstatt und LeseWerk klarer.
  Why it matters: Lehrkraft erkennt Start, Modulrolle und naechsten Schritt schneller; Tests werden in der Synthese mit 239/239 gruen gemeldet.
  Proof: `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`

- Win: GE-Material-Scout verdichtet lokale Quellen zu drei sofort nutzbaren Minikisten.
  Why it matters: Das hilft realer Wochenplanung statt nur neuer Ideen.
  Proof: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/ge-material-scout-2026-05-31.md`

- Win: Handoff-Lage ist sichtbar: Janitor und Handoff-Overview nennen zwei offene Aufgaben und keine Auto-Archivierung.
  Why it matters: Offene Arbeit ist konkret statt diffus.
  Proof: `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-05-31.md`

## Nicht anfassen

- Item: Neues grosses Dashboard/UI fuer Momentum Cockpit.
  Reason: Erst muss das Markdown-Cockpit zweimal nuetzlich sein.

- Item: Neue Cronjobs fuer Momentum Cockpit.
  Reason: V1 ist manuell; Automatisierung erst nach Validierung.

- Item: Neue GitHub-/Tool-Integrationen.
  Reason: `codegraph` P2 und agentmemory/Codex P4 warten auf Chris.

- Item: Neue Produkt-Slices parallel zu offenen Handoffs.
  Reason: Open-loop load zuerst senken.

- Item: Automatische Archivierung.
  Reason: Decision Inbox und Janitor-Regel verlangen Review/Freigabe oder eindeutigen Match.

## Wirkungslogbuch

- Unterrichtswirkung: GE-Minikisten koennen Wochenplan und Materialvorbereitung direkt verbessern.
- Produktwirkung: Productklarheit v1 hat Schulwerkstatt/LeseWerk-Verbindung gestaerkt; neue Produkt-Slices warten.
- Systemwirkung: Momentum Cockpit macht offene Handoffs, Chris-Entscheidungen und Nicht-Tun-Regeln sichtbar.
- Noch nicht bewiesen: Ob ein automatisches Cockpit-Script noetig ist.

## Naechster kleinster Slice

Action: Den offenen Codex-Handoff `ge-minikisten-checkliste` abschliessen oder sauber blockieren.
Why this: Er ist aktuell, lokal, klein, direkt unterrichtsnah und vom Handoff-Scout vom 2026-05-31 als naechste kleinste Aktion erzeugt.
Acceptance: Eine Outbox-Rueckgabe unter `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-31-ge-minikisten-checkliste.md` existiert oder ein expliziter Blocker wird dokumentiert; danach wird dieses Cockpit aktualisiert.
Should become Codex handoff: no, already exists.

## Belege

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-28.md`
- `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/ge-material-scout-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-05-24.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-28.md`
