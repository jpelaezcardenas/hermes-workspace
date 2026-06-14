# Hermes Stop Doing - 2026-06-14

## Kurzfazit
Yellow: Diese Woche gibt es keinen Grund für neue V2s oder zusätzliche Handoffs. Der sinnvolle Schutz ist: erst Proof Ledger prüfen, dann höchstens eine kleine Proof-Aktion; Fuenferfeld bleibt geparkt.

## Opportunity Kill Board
- Item: Ungeprüfte V2-/Prototyp-Erweiterungen
  - Why it repeats or distracts: Mehrere Reports/Hinweise kreisen um Proof, V2, Night-App- oder Prototyp-Logik; ohne echte Nutzung erzeugt das Folgearbeit.
  - Decision: PROOF_FIRST
  - Kill condition: Keine V2, kein Handoff, keine Produktisierung, solange kein tested_useful oder TEST_CARD-Ergebnis im Proof Ledger steht.
  - What to do instead: Genau einen 10-Minuten-Test mit echtem Nutzurteil durchführen oder Idee parken.
- Item: Neue Codex-Handoffs ohne Abgleich
  - Why it repeats or distracts: Es gibt Handoff-Inbox/Outbox-Aktivität; zusätzliche Handoffs riskieren Doppelarbeit und unfertige Ketten.
  - Decision: PARK
  - Kill condition: Kein neuer Handoff, wenn ein ähnlicher offener Inbox/Outbox-Punkt existiert oder Chris noch nicht entschieden hat.
  - What to do instead: Erst vorhandene Handoffs prüfen und maximal einen schließen/entscheiden.
- Item: Investment-/AI-Stock-Radar als Aktionsdruck
  - Why it repeats or distracts: Mehrere Investment-Radar-Quellen können Signale aufblasen; das schützt nicht automatisch vor Hype.
  - Decision: KEEP
  - Kill condition: Nur als Lern-/Beobachtungsradar behalten; keine Kauf-, Verkaufs- oder Depotaktion aus Hermes-Reports ableiten.
  - What to do instead: These/Risiko notieren, aber reale Finanzentscheidung separat und menschlich treffen.
- Item: Business-/Nayyal-Ideen ohne Zahlungs- oder Nutzerproof
  - Why it repeats or distracts: Business-Ideen wiederholen sich schnell als Konzepte, bevor ein echtes Problem validiert ist.
  - Decision: PROOF_FIRST
  - Kill condition: Jede Idee stirbt oder parkt, wenn kein konkreter Nutzer, Schmerz und nächster Test benannt ist.
  - What to do instead: Eine einzige Interviewfrage/Testkarte formulieren statt MVP/V2 bauen.
- Item: Fuenferfeld-Rückkehr
  - Why it repeats or distracts: Fuenferfeld ist explizit geparkt; erneutes Aufgreifen wäre Systemrauschen.
  - Decision: STOP
  - Kill condition: Bleibt gestoppt/geparkt bis Chris es ausdrücklich entparkt.
  - What to do instead: Nicht bearbeiten, nicht als neues Projekt/Handoff anlegen.

## Stop / Keep / Proof / Park
- STOP: Fuenferfeld-Rückkehr
- KEEP: Investment-/AI-Stock-Radar als Aktionsdruck
- PROOF_FIRST: Ungeprüfte V2-/Prototyp-Erweiterungen; Business-/Nayyal-Ideen ohne Zahlungs- oder Nutzerproof
- PARK: Neue Codex-Handoffs ohne Abgleich

## Duplicate / Noise Scan
- Duplicate jobs or handoffs: Keine harte Dublette automatisch bestätigt; Risiko besteht bei neuen Handoffs ohne Inbox/Outbox-Abgleich.
- Repeated themes: Night App Studio / Prototypen, Investment/AI Stock Hype, Nayyal/Business-Ideen, Codex-Handoffs, Fuenferfeld, Proof fehlt
- Unproven V2s: Proof-Hinweise vorhanden: Proof Ledger vorhanden; Hinweise auf Status: untested=3, tested_useful=1, tested_not_useful=1, parked=2
- Old blocked ideas returning: Fuenferfeld bleibt geparkt; alte BLOCKIERT-Themen nicht unverändert neu starten.

## Befehlskarte
- Chris 5-Minuten-Befehl: Öffne das Proof Ledger und markiere genau eine offene Idee als `tested_useful`, `tested_not_useful` oder `parked`; wenn kein echter Test passiert ist, nichts als nützlich zählen.
- Proof-Befehl: Wähle eine untested Idee und teste sie 10 Minuten im realen Ablauf; Ergebnis danach knapp ins Proof Ledger eintragen.
- Hermes-Pruefbefehl: Vor jedem neuen Handoff erst `handoff/codex-inbox` und `handoff/codex-outbox` auf ähnliche offene Punkte prüfen.
- Stop-/Park-Befehl: Alles mit V2/Expansion/Produktisierung ohne Proof wird geparkt, nicht gebaut.
- Nicht-ausfuehren: Keine Deletes, Archives, Commits, Pushes, Deploys, Käufe, Investmentaktionen, Job-Stops oder Fuenferfeld-Reaktivierung.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Proof Ledger 5 Minuten prüfen und genau eine untested Idee entweder testen oder parken.
- CHRIS_ENTSCHEIDET: Ob eine geparkte Idee wieder aktiv werden darf; besonders Fuenferfeld bleibt ohne ausdrückliche Entscheidung geparkt.
- BEOBACHTEN: Investment-/AI-Stock-Radar nur als Lernsignal, nicht als Handlungsauslöser.
- SPAETER: Business-/Nayyal-Ideen erst nach Nutzer-/Zahlungsproof vertiefen.
- BLOCKIERT: Keine echten Nutzungsfeedbacks im Proof Ledger bedeuten: keine V2, keine Expansion, kein neuer Handoff.
- NICHT_TUN: Keine neuen Prototypenfamilien oder Codex-Handoffs erzeugen, solange ähnliche offene Punkte existieren oder Proof fehlt.
- Naechste kleinste Aktion: Proof Ledger öffnen und einen Status korrigieren/ergänzen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/stop-doing/stop-doing-2026-06-14.md
