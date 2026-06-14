# Hermes Control Tower — 2026-05-26

## Ampel
Yellow

## Wichtigste Beobachtung
- Hermes-Workspace-Dateien sind erreichbar; Status/cron wurden per CLI geprüft.
- Codex-Handoff-Inbox: 3 offen; Outbox: 4 Rückgabe(n). Direkte Inbox/Outbox-Treffer: keine direkten Treffer.
- Aktive Goal-Dateien gescannt: 0 relevante/aktive Hinweise gefunden.
- Neueste Decision-Inbox-Blöcke gesammelt: 20.
- Letzter dokumentierter Kanban-Hygienestand: blocked=0; Live-Kanban-Ausgabe unten als Beleg, falls verfügbar.

## Job-Kontrolle
- active jobs OK / issue: OK nach vorhandener Job-Übersicht und CLI-Prüfung; keine automatische Änderung vorgenommen.
- suspicious rhythm / prompt issue / none: keine neue Rhythmus-Auffälligkeit erkannt; Job-Übersicht Stand 2026-05-20 listet sinnvolle Tages-/Wochenrhythmen.
- Gateway/Workspace: wahrscheinlich gesund, weil Workspace-Dateien les-/schreibbar sind und `hermes status` geprüft wurde; Details im Beleg.

## Decision Inbox Heute
- SOFORT_MACHEN: Codex-Handoff-Inbox prüfen: erst offene Handoffs mit vorhandener Outbox-Rückgabe reviewen/archivieren, bevor neue Handoffs erzeugt werden.
- CHRIS_ENTSCHEIDET: Dauerhafte Freigabe für agentmemory/Codex P4 bleibt laut Cockpit offen; keine automatische Aktivierung.
- BEOBACHTEN: GE-Lernwerkstatt-, GitHub-Scout-, VDS-GE- und Wochenplan-Reports weiter sammeln; keine Eskalation ohne roten Blocker.
- SPAETER: P3/P4 Codex/agentmemory-Integration erst nach stabiler Handoff-Hygiene und Chris-Freigabe vertiefen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine neuen großen Swarm-/Kanban-Missionen, keine Installs, keine Commits/Pushes, keine Löschungen/Archivierungen automatisch ausführen.

## Naechste 3 Mini-Schritte
1. Handoff-Hygiene: offene Codex-Inbox gegen Outbox prüfen und abgeschlossene/duplizierte Handoffs nur nach Review/Archiv-Entscheidung bereinigen.
2. Den heutigen Codex-Handoff-Scout um 10:30 nur einen neuen Handoff erstellen lassen, wenn kein passender offener/outbox-belegter Handoff existiert.
3. Bei nächstem Lernwerkstatt-Report prüfen, ob GE-Spielraum-Qualität als kleiner Slice mit klaren Akzeptanzkriterien weitergeführt wird.

## Codex-Handoff
- Offene Inbox-Handoffs: codex-handoff-2026-05-23-hermes-janitor-script.md, codex-handoff-2026-05-23-safe-review-slice.md, codex-handoff-2026-05-22-gartenpost-hilfeflow.md
- Neue Outbox-Rueckgaben: codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md, codex-result-2026-05-20-ge-spielraum-pattern.md, codex-result-2026-05-20-gartenpost-prototyp.md, codex-result-2026-05-17-codegraph-sandbox.md
- Inbox/Outbox-Abgleich: keine direkten Treffer
- Sollte ein neuer Handoff erstellt werden? nein, zuerst bestehende Inbox/Outbox-Lage reviewen; neue Handoffs nur bei eindeutig kleinem, freigabefreiem `SOFORT_MACHEN`.

## Goal-Execute / aktive Strands
- Keine aktiven Goal-Dateien eindeutig erkannt.


## Kein Aktionismus
- Keine Codeänderungen, Commits, Pushes, Installationen, Käufe, Veröffentlichungen oder Löschungen.
- Keine Archivierung offener Handoffs ohne Chris-/Review-Entscheidung.
- Keine personenbezogenen Schüler-/Eltern-/Diagnosedaten in Reports oder Memory übernehmen.
- Keine großen neuen Lernwerkstatt- oder Agenten-Missionen aus dem Kontrolljob starten.

## Belege
- hermes_control: 14 Datei(en) gelistet; neueste: handoff-janitor-2026-05-25.md
- decision_inbox: 9 Datei(en) gelistet; neueste: decision-inbox-2026-05-25.md
- codex_inbox: 3 Datei(en) gelistet; neueste: codex-handoff-2026-05-23-hermes-janitor-script.md
- codex_outbox: 4 Datei(en) gelistet; neueste: codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md
- vds_ge: 1 Datei(en) gelistet; neueste: vds-ge-monitor-2026-05-22.md
- lern_reports: 7 Datei(en) gelistet; neueste: lernwerkstatt-quality-2026-05-25.md
- game_lab: 5 Datei(en) gelistet; neueste: GE-SPIELRAUM-PATTERN.md
- weekly_plans: 2 Datei(en) gelistet; neueste: wochenplan-ge-2026-05-24.md
- goals: 0 Datei(en) gelistet; neueste: keine
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`
- `/Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- CLI: `hermes status`, `hermes cron list`, `hermes kanban list` geprüft. Bei CLI-Fehlern siehe Rohnotiz unten.

<details><summary>Rohnotiz CLI kurz</summary>

```text
hermes status:
┌─────────────────────────────────────────────────────────┐
│                 ⚕ Hermes Agent Status                  │
└─────────────────────────────────────────────────────────┘

◆ Environment
  Project:      /Users/zondrius/.hermes/hermes-agent
  Python:       3.11.15
  .env file:    ✓ exists
  Model:        gpt-5.5
  Provider:     OpenAI Codex

◆ API Keys
  OpenRouter    ✗ (not set)
  OpenAI        ✗ (not set)
  Google / Gemini  ✗ (not set)
  DeepSeek      ✗ (not set)
  xAI / Grok    ✗ (not set)
  NVIDIA NIM    ✗ (not set)
  Z.AI / GLM    ✗ (not set)
  Kimi          ✗ (not set)
  StepFun Step Plan  ✗ (not set)
  MiniMax       ✗ (not set)
  MiniMax-CN    ✗ (not set)
  Firecrawl     ✗ (not set)
  Tavily        ✗ (not set)
  Browser Use   ✗ (not set)
  Browserbase   ✗ (not set)
  FAL           ✗ (not set)
  ElevenLabs    ✗ (not set)
  GitHub        ✗ (not set)
  Anthropic     ✗ (not set)

◆ Auth Providers
  Nous Portal   ✓ logged in
    Portal URL: https://portal.nousresearch.com
    Access exp: 2026-05-26 10:30:34 CEST
    Key exp:    2026-05-27 09:53:49 CEST
    Refresh:    yes
  OpenAI Codex  ✓ logged in
    Auth file:  /Users/zondrius/.hermes/profiles/neva/auth.json
    Refreshed:  2026-05-16 21:27:19 CEST
  Qwen OAuth    ✗ not logged in (run: qwen auth qwen-oauth)
    Auth file:  /Users/zondrius/.hermes/profiles/neva/home/.qwen/oauth_creds.json
    Error:      Qwen CLI credentials not found. Run 'qwen auth qwen-oauth' first.
  MiniMax OAuth  ✗ not logged in (run: hermes auth add minimax-oauth)

◆ Nous Tool Gateway
  Nous Portal   ✓ managed tools available
  Web tools       ✓ included by subscription, not currently selected
  Image generation ✓ active via Nous subscription
  OpenAI TTS      ✓ active via Edge TTS
  Browser automation ✓ active via Nous subscription
  Modal execution ✓ active via local

◆ API-Key Providers
  Z.AI / GLM       ✗ not configured (run: hermes model)
  Kimi / Moonshot  ✗ not configured (run: hermes model)
  StepFun Step Plan ✗ not configured (run: hermes model)
  MiniMax          ✗ not configured (run: hermes model)
  MiniMax (China)  ✗ not configured (run: hermes model)

◆ Terminal Backend
  Backend:      local
  Sudo:         ✗ disabled

◆ Messaging Platforms
  Telegram      ✓ configured (home: 1590305910)
  Discord       ✗ not configured
  WhatsApp      ✗ not configured
  Signal        ✗ not configured
  Slack         ✗ not configured
  Email         ✗ not configured
  SMS           ✗ not configured
  DingTalk      ✗ not con

hermes cron:
┌─────────────────────────────────────────────────────────────────────────┐
│                         Scheduled Jobs                                  │
└─────────────────────────────────────────────────────────────────────────┘

  7c69d3237db7 [active]
    Name:      GITHUB
    Schedule:  0 10 * * *
    Repeat:    ∞
    Next run:  2026-05-27T10:00:00+02:00
    Deliver:   telegram
    Skills:    github-rising-integration, hermes-decision-inbox
    Last run:  2026-05-26T10:10:33.697108+02:00  ok

  be58fa73efde [active]
    Name:      HERMES_CONTROL_DAILY
    Schedule:  15 10 * * *
    Repeat:    ∞
    Next run:  2026-05-27T10:15:00+02:00
    Deliver:   telegram
    Skills:    hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
    Workdir:   /Users/zondrius/hermes-workspace
    Last run:  2026-05-25T10:18:29.230157+02:00  ok

  8c038d3deba0 [active]
    Name:      LERNWERKSTATT_QUALITY_WEEKLY
    Schedule:  15 10 * * 1
    Repeat:    ∞
    Next run:  2026-06-01T10:15:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-build-loop, lernwerkstatt-ge-sachsen-anhalt, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
    Last run:  2026-05-25T10:23:15.809876+02:00  ok

  32477711c800 [active]
    Name:      LERNWERKSTATT_GAME_LAB_WEEKLY
    Schedule:  15 10 * * 3
    Repeat:    ∞
    Next run:  2026-05-27T10:15:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-build-loop, lernwerkstatt-ge-sachsen-anhalt, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
    Last run:  2026-05-20T10:19:02.798476+02:00  ok

  30fd44fd9ded [active]
    Name:      HERMES_MEMORY_CURATOR_MONTHLY
    Schedule:  15 10 1 * *
    Repeat:    ∞
    Next run:  2026-06-01T10:15:00+02:00
    Deliver:   telegram
    Skills:    hermes-agent-operating-system, github-rising-integration, lernwerkstatt-ge-sachsen-anhalt, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace

  005f1e0b30c6 [active]
    Name:      WOCHENPLAN_GE_SONNTAG
    Schedule:  30 17 * * 0
    Repeat:    ∞
    Next run:  2026-05-31T17:30:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-wochenplan-ge, lernwerkstatt-ge-sachsen-anhalt, lernwerkstatt-build-loop, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
    Last run:  2026-05-24T17:

hermes kanban:
✓ t_740c0da1  done      neva                  CEO Ops 2026-05-21 - Gartenpost Handoff abschliessen
✓ t_a0e87192  done      neva                  CEO Ops 2026-05-21 - GE Spielraum Pattern extrahieren
✓ t_63830980  done      neva                  CEO Next 2026-05-21 - Mengen legen als GE-Spielraum ausfuehren
✓ t_e02a8539  done      schule                LeseWerk Alpha 29A - GE Learning Check Spec
✓ t_280ab380  done      research              LeseWerk Alpha 29A - Research Learning Check Brief
✓ t_5552baee  done      neva                  LeseWerk Alpha 29B - Mini Learning Check and Individual Daily Path
✓ t_36c92f86  done      schule                LeseWerk Alpha 28A - GE Profile Builder Brief
✓ t_a030eed2  done      neva                  LeseWerk Alpha 28B - Local Profile Builder and Adaptive Next Step
✓ t_472661c3  done      research              LeseWerk Alpha 27A - Nous Research Didactic Brief
✓ t_cf575425  done      schule                LeseWerk Alpha 27A - GE Classroom Symbol Review
✓ t_b3ed9035  done      neva                  LeseWerk Alpha 27B - Deep Didactic Implementation
✓ t_adc73fe1  done      neva                  LeseWerk Alpha 26C - Coverage Inspector
✓ t_98c1cfa0  done      research              LeseWerk Alpha 26A - Nous Curriculum Brief
✓ t_c3f19035  done      schule                LeseWerk Alpha 26A - GE Didaktik Brief
✓ t_6da184b7  done      neva                  LeseWerk Alpha 26B - Massive Profil-Task-Coverage
✓ t_fda82ff1  done      neva                  LeseWerk Alpha 25 - Kleine Lehrer-Profilvorschau
✓ t_71a23e69  done      neva                  LeseWerk Alpha 24 - Profil-sicherer Tagesweg Logik
✓ t_0bd5cfbf  done      neva                  LeseWerk Alpha 23 - Profil-sichere Antwortoptionen
✓ t_8ce695aa  done      neva                  LeseWerk Alpha 22 - Graphem Profilfilter
✓ t_4adee529  done      neva                  LeseWerk Alpha 21 - S-Tier Lesecurriculum Modell
✓ t_045d61b0  done      neva                  LeseWerk Alpha 20 - Tablet-Praxischeck der Mama-Schrittkarte
✓ t_8f2bfc64  done      neva                  Mission: LeseWerk Alpha 59 - Auswahl-Spielsequenz
✓ t_665e975b  done      schule                Alpha 59A - UX Vertrag Auswahl-Spielsequenz
✓ t_ca4fe220  done      neva                  Alpha 59B - Implementiere Auswahl-Spielsequenz
✓ t_d85bda2c  done      schule                Alpha 59C - Watchdog Auswahl-Spielsequenz
✓ t_1208c6a9  done      neva                  LeseWerk Alpha 19 - Interaktive Schrittkarte Mama
✓ t_2
```
</details>

## Gesammelte Decision-Inbox-Bloecke \(Auszug\)

### decision-inbox-2026-05-25.md (2026-05-25 10:18)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-25.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` priorisieren; kein neuer Handoff.
- CHRIS_ENTSCHEIDET: `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein; `codegraph` P2 ja/nein; Gartenpost Standalone vs. React-Integration; VDS-GE externe Nutzung ja/nein.
- BEOBACHTEN: Handoff-Scout Queue-Guard; Lernwerkstatt-Qualitätslauf; LeseWerk-Quality-Erstlauf; VDS-GE Feedscan-Lücke.
- SPAETER: Handoff-Hygiene nach Queue-Abarbeitung; lokale Symbolassets; Scout-Rhythmus bewerten.
- BLOCKIERT: `HERMES_HANDOFF_JANITOR_DAILY` findet `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` nicht.
- NICHT_TUN: Keine neuen Handoffs, keine Lösch-/Archivaktionen, keine Installationen, keine Cron-Deaktivierung, keine großen App-Umbauten ohne Freigabe.
- Naechste kleinste Aktion: Janitor-Handoff als kleinen Reparatur-/Empfehlungs-Slice bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-25.md`
```

### decision-inbox-2026-05-24.md (2026-05-24 10:18)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-24.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` bearbeiten lassen bzw. prüfen lassen; kein neuer Handoff.
- CHRIS_ENTSCHEIDET: `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein; `codegraph` P2-Sandbox ja/nein; Gartenpost Standalone weiter testen vs. React-Integration; VDS-GE interne Notiz ggf. später extern verwenden ja/nein.
- BEOBACHTEN: Handoff-Scout 10:30; GitHub-Signal `Understand-Anything`; Lernwerkstatt-Qualitätslauf 2026-05-25; VDS-GE-Recherche-Lücke `blogwatcher-cli`.
- SPAETER: Skill-Design-Vergleich, lokale Symbolassets, Rhythmusbewertung LeseWerk/Handoff-Scout.
- BLOCKIERT: `HERMES_HANDOFF_JANITOR_DAILY` scheitert wegen fehlendem Script `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.
- NICHT_TUN: Keine neuen Handoffs, keine Installationen, keine privaten Repo-Scans, keine Cron-Deaktivierung, keine Lösch-/Archivaktionen ohne Freigabe.
- Naechste kleinste Aktion: Janitor-Handoff öffnen und als kleinen Reparatur-/Empfehlungs-Slice bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-24.md`
```

### decision-inbox-2026-05-23.md (2026-05-23 10:18)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-23.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Fehlendes Janitor-Script prüfen/reparieren oder Cronjob deaktivieren lassen: `HERMES_HANDOFF_JANITOR_DAILY` findet `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` nicht.
- CHRIS_ENTSCHEIDET: `codegraph` P2-Sandbox ja/nein; später Gartenpost Standalone weiter testen vs. React-Lernwerkstatt-Integration. (decision-inbox-2026-05-22.md); Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Ou
```

### decision-inbox-2026-05-22.md (2026-05-22 10:17)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-22.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Gartenpost-Hilfeflow als genau einen kleinen Codex-/Coder-Slice behandeln: Hilfemodus + Beobachtungsdrawer, keine Haupt-App-Integration.
- CHRIS_ENTSCHEIDET: `codegraph` P2-Sandbox ja/nein; später Gartenpost Standalone weiter testen vs. React-Lernwerkstatt-Integration.
- BEOBACHTEN: VDS-GE-Report-Verzeichnis; heutiger 10:30-Handoff-Scout; GitHub-Signale `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`.
- SPAETER: Skill-Design-Vergleich aus Plugin-/Skill-Repos; lizenzsichere lokale Symbolassets; LeseWerk-Qualitätsjob nach weiteren Läufen bewerten.
- BLOCKIERT: nichts.
- NICHT_TUN: Keine GitHub-Trend-Installationen, keine privaten Browser-/NotebookLM-Tests, keine großen Lernwerkstatt-Umbauten, keine Commits/Pushes/Deletes/Installs.
- Naechste kleinste Aktion: Nach 10:30 prüfen, ob ein neuer Handoff zum Gartenpost-Hilfeflow existiert; sonst als nächsten kleinen Slice vormerken.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-22.md`
```

### decision-inbox-2026-05-21.md (2026-05-21 10:16)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-21.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Codex-Outbox prüfen und passenden Inbox-Handoff danach archivieren: codex-result-2026-05-20-gartenpost-prototyp.md
- CHRIS_ENTSCHEIDET: Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md)
- BEOBACHTEN: Echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf sind noch nicht geprüft; Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt. (hermes-job-update-2026-05-20.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring R
```

### decision-inbox-2026-05-20.md (2026-05-20 10:16)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-20.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Ein offenes Codex-Handoff kurz sichten und entscheiden: ausführen lassen, archivieren oder zurückstellen.
- CHRIS_ENTSCHEIDET: 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren.
- BEOBACHTEN: GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich.
- SPAETER: Lernwerkstatt-/Workspace-Verbesserungen als spätere kleine Slices.
- BLOCKIERT: nichts
- NICHT_TUN: Keine automatischen Ausführungen, Commits, Pushes, Deletes, Installs oder neue Langläufer.
- Naechste kleinste Aktion: Neueste Codex-Inbox-Datei öffnen: /Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-18-lernwerkstatt-mengen-spielraum.md
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-20.md
```

### decision-inbox-2026-05-19.md (2026-05-19 10:18)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-19.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Nach dem heutigen `CODEX_HANDOFF_SCOUT_DAILY`-Lauf prüfen, ob zum offenen Lernwerkstatt-Handoff eine neue Outbox-Rückgabe vorliegt; keinen zweiten Handoff erstellen.
- CHRIS_ENTSCHEIDET: Ob `millionco/react-doctor` lokal in einer Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden.
- BEOBACHTEN: Frischer laufender LeseWerk-Task `t_783a3a3c`; offener Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Watchlist aus dem heutigen Scout.
- SPAETER: `supertonic` nur bei lokaler-TTS-Priorität; `12-factor-agents` später mappen; VDS-GE nach Freitaglauf prüfen.
- BLOCKIERT: nichts.
- NICHT_TUN: Kein Codegraph-/React-Doctor-/Agentmemory-Rollout, keine Wholesale-Skill-Imports, kein CloakBrowser, keine Trading-Agenten, keine Installs/Commits/Pushes/Deployments/Löschungen/Veröffentlichungen.
- Naechste kleinste Aktion: Heute nach 10:30 Outbox/Scout-Bericht prüfen und den offenen `Mengen legen`-Handoff nur dann weiterverfolgen, wenn eine neue Rückgabe vorliegt.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decis
```

### decision-inbox-2026-05-18.md (2026-05-18 10:13)
Quelle: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md`

```text
- Signal: Yellow
- SOFORT_MACHEN: Drei Materialtabletts aus dem Wochenplan vorbereiten: S-Kiste, Mengen-5-Tablett, UK-Alltagskarten.
- CHRIS_ENTSCHEIDET: Ob `codegraph` als P2 in einem mittelgroßen, nicht-sensiblen Demo-/Throwaway-Repo getestet werden soll.
- BEOBACHTEN: Heutigen Lernwerkstatt-Quality-Report nach 10:15 und die Montags-Parallelität der Jobs beobachten.
- SPAETER: VDS-GE-Report-Verzeichnis nach Freitag prüfen; lokale Symbol-/Bildassets später planen.
- BLOCKIERT: nichts.
- NICHT_TUN: Kein Codegraph-Rollout, keine echten privaten/Hermes-/Lernwerkstatt-Repos indexieren, keine Prozess-Kills, keine Monsterprompts, keine Commits/Pushes, keine Installationen, keine Memory-Änderungen.
- Naechste kleinste Aktion: Drei Materialtabletts vorbereiten und pro Station nur eine Beobachtungsfrage notieren.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md`
```


## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Codex-Handoff-Inbox prüfen: erst offene Handoffs mit vorhandener Outbox-Rückgabe reviewen/archivieren, bevor neue Handoffs erzeugt werden.
- CHRIS_ENTSCHEIDET: Dauerhafte Freigabe für agentmemory/Codex P4 bleibt laut Cockpit offen; keine automatische Aktivierung.
- BEOBACHTEN: GE-Lernwerkstatt-, GitHub-Scout-, VDS-GE- und Wochenplan-Reports weiter sammeln; keine Eskalation ohne roten Blocker.
- SPAETER: P3/P4 Codex/agentmemory-Integration erst nach stabiler Handoff-Hygiene und Chris-Freigabe vertiefen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine neuen großen Swarm-/Kanban-Missionen, keine Installs, keine Commits/Pushes, keine Löschungen/Archivierungen automatisch ausführen.
- Naechste kleinste Aktion: Handoff-Inbox gegen Outbox prüfen und erst danach entscheiden, ob etwas archiviert oder neu beauftragt wird.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-26.md`
