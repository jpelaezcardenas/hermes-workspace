# Hermes Mission Chain CEO - 2026-06-13

## Kurzfazit
Yellow. Eine Mission ist gerechtfertigt, aber nur als Hermes-System-/Handoff-Hygiene-Kette: erst offene Codex-Arbeit klaeren, keine neue App und keine Produktisierung ohne Proof.

## Candidate Scan
1. **Hermes Handoff Hygiene & Proof Gate**
   - Fit: hoch; Daily Decision Inbox und Control Tower nennen heute ausdruecklich die offene Codex-Handoff-Pruefung als kleinsten sicheren Hebel.
   - Proof: lokale Belege zeigen `codex-inbox=1`, `codex-outbox=11`, Archive vorhanden; offener Handoff `codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`.
   - Risk: niedrig bis mittel; keine Loeschung, kein Commit, kein Push, aber Archiv-/Schliessentscheidung bleibt bei Chris.
   - Expected output: klare Review-/Archiv-Kandidatenkarte, spaeter ggf. genau ein kleiner Codex-Handoff durch den Scout.
2. **GE-Lernwerkstatt / Spielraum V2**
   - Fit: fachlich hoch; mehrere GE-Spielraum-Signale und Teacher-Nextday-Karten liegen vor.
   - Proof: kein echter Eintrag unter `Proof Ledger -> Real Entries`; Night App Studio stoppt deshalb bereits auf REVIEW_ONLY.
   - Risk: mittel; V2/Expansion ohne Unterrichtsproof wuerde Ideenstau vergroessern.
   - Expected output: aktuell nur Proof-Test, keine Mission Chain fuer Ausbau.
3. **Nayyal Public/Research/Private Hub**
   - Fit: mittel bis hoch; wiederholte Maps liegen vor.
   - Proof: lokale Map-Berichte vorhanden, aber Public-Sichtbarkeit/Route-Freigabe braucht Chris-Entscheidung.
   - Risk: mittel; oeffentliche Sichtbarkeit, private Bereiche, Account-/Projektgrenzen.
   - Expected output: vorerst Entscheidungsvorlage, keine Umsetzungskette.

## Selected Mission
- Status: MISSION_SELECTED
- Name: Hermes Handoff Hygiene & Proof Gate Chain
- Why now: Der aktuelle Control Tower und die Daily Decision Inbox nennen Handoff-Hygiene als beste kleine Aktion; gleichzeitig blockiert die offene Codex-Inbox neue saubere Routing-Entscheidungen.
- Proof basis: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-13.md`, `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-13.md`, `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`, `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`.
- Risk: Keine fachliche Schuelerbewertung; kein Datenschutzinhalt ausser allgemeiner GE-Kontext. Risiko entsteht nur, wenn automatisch archiviert, geloescht oder ein neuer Handoff erzeugt wird.
- What this must not become: Keine Massenbereinigung, kein Loeschen, kein neues App-Building, kein weiteres UK-/GE-Produkt ohne Proof, kein automatischer Commit/Push.

## Spec
- Goal: Aus der aktuellen offenen Codex-Handoff-Lage eine pruefbare, kleine Systemhygiene-Kette machen, die Doppelarbeit verhindert und nur sichere naechste Schritte erlaubt.
- User: Chris als Hermes-Orchestrator-Nutzer; indirekt Neva/Codex-Scout/Janitor als lokale Workflow-Komponenten.
- Output: Eine Review-Karte fuer den offenen Handoff, danach optional ein Scout-freigegebener Slice; am Ende ein belegbarer Status `offen`, `reviewed`, `archiv-kandidat` oder `blockiert`.
- Non-goals: Keine Bearbeitung des UK-Startkarten-Inhalts, keine Archivierung ohne Chris, keine Loeschung, keine neue Lernwerkstatt-App, keine externen Aktionen.
- Constraints: Nur lokale Dateien; keine echten Namen, Diagnosen, Fotos, Familien- oder Schuldaten; keine Deploys, Commits, Pushes, Installationen oder Mails.

## Slices
1. **Offenen Handoff gegen Outbox pruefen**
   - Files or target area: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`, `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`, `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-06-13.md`.
   - Acceptance Criteria: Es gibt eine kurze lokale Review-Notiz, ob ein passendes Codex-Ergebnis existiert oder nicht; keine Dateien werden verschoben oder geloescht.
   - QA check: Dateinamen, Auftragstitel und ggf. Quellenreferenz werden abgeglichen; bei unsicherem Match bleibt Status `offen`.
   - Proof check: Review-Notiz nennt die geprueften Dateien und den Grund fuer `archiv-kandidat` oder `offen`.
   - Not to do: Kein Archivieren, kein Loeschen, kein neues Handoff schreiben.
2. **Janitor-Regel schaerfen**
   - Files or target area: Handoff-Janitor-Berichte und ggf. zugehoerige lokale Konfiguration nur nach separater Freigabe.
   - Acceptance Criteria: Eine Regelkarte beschreibt, wann automatisch nur markiert, aber nicht archiviert wird.
   - QA check: Regel vermeidet False Positives bei aehnlichen GE-Handoffs.
   - Proof check: Beispiel mit dem aktuellen UK-Startkarten-Handoff.
   - Not to do: Keine Cron-Aenderung ohne eigenen Codex-/Chris-Entscheid.
3. **Decision-Inbox Rueckbindung**
   - Files or target area: `/Users/zondrius/hermes-workspace/reports/decision-inbox/`.
   - Acceptance Criteria: Der naechste Control-Tower kann aus der Review-Notiz erkennen, ob Chris entscheiden muss.
   - QA check: Buckets bleiben exakt `SOFORT_MACHEN`, `CHRIS_ENTSCHEIDET`, `BEOBACHTEN`, `SPAETER`, `BLOCKIERT`, `NICHT_TUN`.
   - Proof check: Belegdatei im Decision-Inbox-Block genannt.
   - Not to do: Keine zweite Tagesaktion erzeugen.
4. **Proof-Gate fuer neue GE-/Night-App-Arbeit respektieren**
   - Files or target area: `proof-ledger.md`, `feedback-log.md`, Night-App-Reports.
   - Acceptance Criteria: Keine V2-/Build-Mission wird gestartet, solange Real Entries leer sind.
   - QA check: Beispiele oberhalb `## Real Entries` werden ignoriert.
   - Proof check: Mission-Bericht nennt Proof-Ledger-Status.
   - Not to do: Keine Wirksamkeitsbehauptung ohne echten Test.

## Slice 1
Slice 1 ist eine reine lokale Review-Aufgabe: Der offene Handoff `codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md` wird gegen die vorhandenen Outbox-Ergebnisse gelesen. Ergebnis ist eine kleine Review-Datei oder ein Berichtseintrag mit: `geprueft`, `passendes Ergebnis gefunden: ja/nein/unsicher`, `Begruendung`, `empfohlener Status`, `Chris-Entscheid benoetigt: ja/nein`. Es werden keine Handoff-Dateien verschoben, archiviert oder geloescht.

## Codex Handoff Drafts
Copyable `/goal` draft fuer Slice 1, falls der Codex Handoff Scout ihn spaeter routet:

```text
/goal Pruefe lokal den offenen Codex-Handoff `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md` gegen die vorhandenen Dateien in `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`. Erstelle nur eine Review-Notiz unter `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-06-13-uk-startkarte-handoff-review.md` mit: gepruefte Dateien, ob ein passendes Ergebnis existiert, empfohlener Status (`offen`, `archiv-kandidat`, `blockiert`), Risiken und naechste kleinste Aktion. Nicht archivieren, nicht loeschen, nicht verschieben, nicht committen, nicht pushen, keine externen Aktionen, keine echten Schuelerdaten. Akzeptanz: Die Notiz nennt den offenen Handoff und begruendet eindeutig, warum er offen bleibt oder Chris zur Archivierung entscheiden sollte.
```

## QA -> Proof
- Local QA: Reread des geschriebenen Mission-Berichts; Plausibilitaetscheck gegen aktuelle lokale Reports und offene Inbox.
- Browser/screenshot needed: no
- Proof-Ledger condition: Keine neue App-/GE-V2-Arbeit, solange unter `## Real Entries` keine echte Nutzungszeile steht.
- V2 permission condition: V2 erst nach echter Proof-Zeile oder ausdruecklicher Chris-Freigabe trotz fehlendem Proof.

## Befehlskarte
- Chris 5-Minuten-Befehl: Offenen Handoff ansehen und entscheiden: `weiter offen lassen` oder `als Archiv-Kandidat freigeben`.
- Codex-Befehl: Den `/goal`-Draft aus `Codex Handoff Drafts` nur nutzen, wenn der Codex Handoff Scout heute/naechste Woche genau diesen einen Slice routen soll.
- Hermes-Pruefbefehl: Naechster Control Tower liest diese Mission Chain plus Handoff-Janitor-Bericht und setzt nur einen Decision-Inbox-Punkt.
- Stop-/Park-Befehl: Wenn unklar bleibt, ob ein Outbox-Ergebnis passt, Status `offen` behalten und keine Bereinigung ausfuehren.
- Nicht-ausfuehren: Keine neue Night App, kein GE-Lernwerkstatt-V2, kein Nayyal-Public-Umbau, keine Archivierung/Loeschung ohne Chris.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Offenen UK-Startkarten-Handoff lokal gegen Outbox pruefen und nur Review-Status notieren.
- CHRIS_ENTSCHEIDET: Ob ein als passend gepruefter Handoff spaeter archiviert/geschlossen werden darf.
- BEOBACHTEN: Proof-Ledger bleibt ohne echte Real-Entry-Zeile; Night-App/GE-Ausbau weiter bremsen.
- SPAETER: Nayyal Public/Research/Private-Umsetzung nach Chris-Freigabe.
- BLOCKIERT: Keine harte Blockade; nur automatische Archivierung ist ohne Entscheidung blockiert.
- NICHT_TUN: Keine neuen Prototypen, keine V2, keine Produktisierung, keine Loeschung, kein Deploy/Commit/Push.
- Naechste kleinste Aktion: Review-Notiz fuer den offenen Handoff erstellen lassen oder selbst in 5 Minuten entscheiden.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/mission-chain/mission-chain-2026-06-13.md`
