# Hermes Control Tower — 2026-05-20

STATE: completed-read-only
PROFILE/ROLES_USED: neva (Control Tower), hermes-decision-inbox, codex-handoff routing
SKILLS_USED: hermes-agent-operating-system; hermes-decision-inbox; codex-handoff
FILES_CHANGED: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-20.md; /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-20.md
SOURCES_OR_CONTEXT: lokale Statusbefehle und gelesene Report-/Handoff-Dateien

## Ampel
Yellow

## Wichtigste Beobachtung
- Hermes-Status wurde per `hermes status` geprüft; keine destruktiven Aktionen ausgeführt.
- Cron-Liste wurde geprüft: Befehl erfolgreich, keine offensichtliche CLI-Fehlermeldung.
- Codex-Handoff: 1 offene Inbox-Datei(en), 1 Outbox-Datei(en) gefunden.
- Kanban/Task-Signale mit Blocked/Running/Ready/Triage gefunden; als Beobachtung bzw. Chris-Entscheidung triagieren.
- 9 Decision-Inbox-Block/Blöcke aus aktuellen Dateien gefunden und verdichtet.

## Job-Kontrolle
- active jobs OK / issue: OK, soweit per CLI-Ausgabe erkennbar.
- suspicious rhythm / prompt issue / none: none aus den gelesenen Ausschnitten; detaillierte Cron-Rhythmen nur soweit `hermes cron list` sie ausgab.

## Decision Inbox Heute
- SOFORT_MACHEN: Ein offenes Codex-Handoff kurz sichten und entscheiden: ausführen lassen, archivieren oder zurückstellen.
- CHRIS_ENTSCHEIDET: 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren.
- BEOBACHTEN: GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich.
- SPAETER: Lernwerkstatt-/Workspace-Verbesserungen nur als kleine Slices, nicht als neue Großmission.
- BLOCKIERT: nichts
- NICHT_TUN: Keine neuen Langläufer, keine automatischen Codex-Ausführungen, keine Commits/Pushes/Deletes/Installs aus diesem Kontrolljob.

## Naechste 3 Mini-Schritte
1. Neueste Codex-Inbox-Datei öffnen: /Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-18-lernwerkstatt-mengen-spielraum.md
2. Bei offenen/returned Codex-Dateien: je eine Datei als erledigen / nachbessern / archivieren markieren — nicht automatisch ausführen.
3. Wenn Cron/Status unklar bleibt: kleinen separaten Diagnose-Handoff formulieren statt Gateway/Jobs direkt umzubauen.

## Codex-Handoff
- Offene Inbox-Handoffs: 1
  - /Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-18-lernwerkstatt-mengen-spielraum.md
- Neue Outbox-Rueckgaben: 1
  - /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-17-codegraph-sandbox.md
- Sollte ein neuer Handoff erstellt werden? nein — Control-Tower ist read-only; vorhandene Handoffs/Outbox erst sichten.

## Kein Aktionismus
- Keine Lernwerkstatt-Großmission automatisch starten.
- Keine GitHub-Scout-Funde produktiv integrieren ohne Sandbox-Beleg.
- Keine sensiblen Schüler-/Verbandsdaten in Handoffs übernehmen.
- Keine Cron-Änderungen aus dem Control-Tower heraus.

## Belege
- Befehl: hermes status
- Befehl: hermes cron list
- Befehl: hermes kanban list
- /Users/zondrius/Documents/New project 6/hermes-jobs-overview.md
- /Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md
- /Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-19.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-18.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-17.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-16.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-19.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-17.md
- /Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-18-lernwerkstatt-mengen-spielraum.md
- /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-17-codegraph-sandbox.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-mengen-legen-2026-05-16.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/beta3-schuelerstart-2026-05-16.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-05-17.md

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Ein offenes Codex-Handoff kurz sichten und entscheiden: ausführen lassen, archivieren oder zurückstellen.
- CHRIS_ENTSCHEIDET: 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren.
- BEOBACHTEN: GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich.
- SPAETER: Lernwerkstatt-/Workspace-Verbesserungen als spätere kleine Slices.
- BLOCKIERT: nichts
- NICHT_TUN: Keine automatischen Ausführungen, Commits, Pushes, Deletes, Installs oder neue Langläufer.
- Naechste kleinste Aktion: Neueste Codex-Inbox-Datei öffnen: /Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-18-lernwerkstatt-mengen-spielraum.md
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-20.md


### Technische Rohsignale (gekürzt)
```text
[hermes status]
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
    Access exp: 2026-05-20 10:25:24 CEST
    Key exp:    2026-05-21 09:11:58 CEST
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
  StepFun Step Plan ✗ not config

[hermes cron list]
┌─────────────────────────────────────────────────────────────────────────┐
│                         Scheduled Jobs                                  │
└─────────────────────────────────────────────────────────────────────────┘

  7c69d3237db7 [active]
    Name:      GITHUB
    Schedule:  0 10 * * *
    Repeat:    ∞
    Next run:  2026-05-21T10:00:00+02:00
    Deliver:   telegram
    Skills:    github-rising-integration, hermes-decision-inbox
    Last run:  2026-05-20T10:04:01.330448+02:00  ok

  be58fa73efde [active]
    Name:      HERMES_CONTROL_DAILY
    Schedule:  15 10 * * *
    Repeat:    ∞
    Next run:  2026-05-21T10:15:00+02:00
    Deliver:   telegram
    Skills:    hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
    Workdir:   /Users/zondrius/hermes-workspace
    Last run:  2026-05-19T10:18:36.940965+02:00  ok

  8c038d3deba0 [active]
    Name:      LERNWERKSTATT_QUALITY_WEEKLY
    Schedule:  15 10 * * 1
    Repeat:    ∞
    Next run:  2026-05-25T10:15:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-build-loop, lernwerkstatt-ge-sachsen-anhalt, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
    Last run:  2026-05-18T10:17:48.497707+02:00  ok

  32477711c800 [active]
    Name:      LERNWERKSTATT_GAME_LAB_WEEKLY
    Schedule:  15 10 * * 3
    Repeat:    ∞
    Next run:  2026-05-27T10:15:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-build-loop, lernwerkstatt-ge-sachsen-anhalt, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt

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
    Next run:  2026-05-24T17:30:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-wochenplan-ge, lernwerkstatt-ge-sachsen-anhalt, lernwerkstatt-build-loop, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
    Last run:  2026-05-17T17:32:41.816869+02:00  ok

  77eff52bace1 [active]
    

[hermes kanban list: relevante Zeilen]
✓ t_bce0cc11  done      schule                Alpha 47A - Hilfeblock Accessibility-Audit
✓ t_26bb0520  done      neva                  Alpha 47B - Hilfeblock visuell beruhigen
✓ t_80baaee1  done      schule                Alpha 47C - Watchdog Hilfeblock und nächste Leselogik
✓ t_72c899bf  done      neva                  Mission: LeseWerk Alpha 6 pilot-ready quality pass
```


### Eingesammelte Decision-Inbox-Blöcke (gekürzt)
#### overview
## Decision Inbox Standard
    23|
    24|Alle aktiven wiederkehrenden Jobs nutzen seit 2026-05-16 den Skill `hermes-decision-inbox`.
    25|
    26|Jeder Job soll am Ende diesen Entscheidungsblock liefern:
    27|
    28|```markdown
    29|## Decision Inbox
    30|- Signal: Green / Yellow / Red
    31|- SOFORT_MACHEN:
    32|- CHRIS_ENTSCHEIDET:
    33|- BEOBACHTEN:
    34|- SPAETER:
    35|- BLOCKIERT:
    36|- NICHT_TUN:
    37|- Naechste kleinste Aktion:
    38|- Beleg / Datei:
    39|```
    40|
    41|Kontrollregel:
    42|- `SOFORT_MACHEN` enthaelt hoechstens eine kleine Aktion.
    43|- `CHRIS_ENTSCHEIDET` enthaelt alles mit Risiko, externem Versand, Installation, Kauf, Veroeffentlichung, Commit/Push, Loeschen oder sensiblen Daten.
    44|- `HERMES_CONTROL_DAILY` sammelt diese Bloecke taeglich und schreibt die Tagesuebersicht nach `/Users/zondrius/hermes-workspace/reports/decision-inbox/`.
    45|
    46|## Codex-Handoff
    47|
    48|Hermes kann konkrete Aufgaben an Codex uebergeben, aber nur ueber die feste Vorlage:
    49|
    50|`/Users/zondrius/hermes-workspace/handoff/CODEX_HANDOFF_TEMPLATE.md`
    51|
    52|Ordner:
    53|
    54|| Ordner | Zweck |
    55||---|---|
    56|| `/Users/zondrius/hermes-workspace/handoff/codex-inbox/` | Aufgaben fuer Codex |
    57|| `/Users/zondrius/hermes-workspace/handoff/codex-outbox/` | Rueckgaben von Codex |
    58|| `/Users/zondrius/hermes-workspace/handoff/archive/` | erledigte Uebergaben |
    59|| `/Users/zondrius/hermes-workspace/handoff/examples/` | Beispiele, keine offenen Aufgaben |
    60|
    61|Skill:
    62|`cod

#### /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-19.md
## Decision Inbox Heute
    25|- SOFORT_MACHEN: Offenen Codex-Handoff `lernwerkstatt-mengen-spielraum` nicht doppeln; nach 10:30 prüfen, ob der Scout/Outbox eine Rückgabe erzeugt oder weiter wartet.
    26|- CHRIS_ENTSCHEIDET: Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden.
    27|- BEOBACHTEN: Laufender LeseWerk-Task `t_783a3a3c` und Folge-Task `t_daf91551`; offenen Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Signale `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`.
    28|- SPAETER: `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nächster Hermes-Orchestrierungsüberarbeitung mappen; VDS-GE-Report-Verzeichnis nach dem Freitaglauf erneut prüfen.
    29|- BLOCKIERT: nichts.
    30|- NICHT_TUN: Keine Skill-Repos wholesale kopieren; `CloakBrowser` nicht integrieren; keine Trading-/Finance-Agenten produktiv oder mit Echtgeld verbinden; kein Codegraph-Rollout; keine Installs, Commits, Pushes, Deployments, Löschungen oder Veröffentlichung; keine neuen Monsterprompts.
    31|
    32|## Naechste 3 Mini-Schritte
    33|1. Nach dem heutigen `CODEX_HANDOFF_SCOUT_DAILY`-Lauf prüfen, ob zum offenen Lernwerkstatt-Handoff eine neue Outbox-Rückgabe vorliegt; falls nicht, den Handoff nur weiter beobachten, nicht doppeln.
    34|2. Den laufenden Kanba

#### /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-18.md
## Decision Inbox Heute
    25|- SOFORT_MACHEN: Drei Materialtabletts aus dem Wochenplan vorbereiten: S-Kiste, Mengen-5-Tablett, UK-Alltagskarten.
    26|- CHRIS_ENTSCHEIDET: Ob `codegraph` nach bestandenem P1 in einem mittelgroßen, nicht-sensiblen Demo-/Throwaway-Repo getestet werden soll. Keine echten Hermes-, Lernwerkstatt- oder privaten Projekte indexieren ohne Freigabe.
    27|- BEOBACHTEN: Montags-Kollision/Parallelität von Control Tower und Lernwerkstatt-Quality; heutiger Quality-Report, falls er nach diesem Kontrolllauf erzeugt wird.
    28|- SPAETER: VDS-GE-Report-Verzeichnis nach dem Freitaglauf prüfen; echte lokale Symbol-/Bildassets für die Lernwerkstatt später planen.
    29|- BLOCKIERT: nichts.
    30|- NICHT_TUN: Kein automatischer Codegraph-Rollout, kein globaler Installer, keine produktive MCP-Konfiguration, keine Prozess-Kills, keine neuen Monsterprompts, keine Commits/Pushes, keine Installationen, keine Memory-Änderungen aus diesem Kontrolljob.
    31|
    32|## Naechste 3 Mini-Schritte
    33|1. Drei Materialtabletts für Montag vorbereiten: S-Kiste, Mengen-5-Tablett, UK-Alltagskarten.
    34|2. Nach dem heutigen 10:15-Lauf prüfen, ob `LERNWERKSTATT_QUALITY_WEEKLY` einen neuen Bericht erzeugt hat und ob er einen konkreten kleinen Fix empfiehlt.
    35|3. Codegraph-Entscheidung offenlassen: nur wenn Chris zustimmt, P2 in einem nicht-sensiblen Demo-/Throwaway-Repo testen.
    36|
    37|## Codex-Handoff
    38|- Offene Inbox-Handoffs: keine Dateien in `/Users/zondrius/hermes-workspace/handoff/codex-inbox/` gefunden.
    39|- Neue Outbox-Rueckgaben: `/Users/

#### /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-17.md
## Decision Inbox Heute
    25|- SOFORT_MACHEN: Heute kein neuer Codex-Handoff; zunächst die laufende Alpha-7-Slice-Bearbeitung beobachten und nicht parallel mit neuem Handoff stören.
    26|- CHRIS_ENTSCHEIDET: Ob alte lokale Server-/Codex-Prozesse später gezielt aufgeräumt werden dürfen. Das ist potentiell destruktiv für offene Arbeitsstände und braucht Freigabe.
    27|- BEOBACHTEN: Alpha-7-Kette (`t_dd02e220` → `t_69e046ba` → `t_d3c4d27f`) und ob daraus ein sauberer Abschlussbericht entsteht.
    28|- SPAETER: Prüfen, ob die leeren Report-Verzeichnisse `reports/vds-ge/` und `weekly-plans/` nach den nächsten planmäßigen Läufen sinnvoll befüllt werden.
    29|- BLOCKIERT: nichts.
    30|- NICHT_TUN: Keine automatischen Prozess-Kills, keine neuen großen Lernwerkstatt-Monsterprompts, keine Commits/Pushes, keine Installationen, keine Speicher-/Memory-Änderungen aus diesem Kontrolljob.
    31|
    32|## Naechste 3 Mini-Schritte
    33|1. Nach Abschluss von `t_dd02e220` nur prüfen, ob `t_69e046ba` sauber startet bzw. ob ein Ergebnisbericht zur Alpha-7-Story-Erweiterung vorhanden ist.
    34|2. Beim nächsten Control-Lauf kontrollieren, ob `CODEX_HANDOFF_SCOUT_DAILY` um 10:30 wirklich keinen unnötigen Handoff erzeugt hat.
    35|3. Wenn die alten Serverprozesse weiter auffällig bleiben: separaten, freigabepflichtigen Hygiene-Vorschlag für Chris formulieren, aber nichts automatisch beenden.
    36|
    37|## Codex-Handoff
    38|- Offene Inbox-Handoffs: keine Dateien in `/Users/zondrius/hermes-workspace/handoff/codex-inbox/` gefunden.
    39|- Neue Outbox-Rueckgaben: keine Dateie

#### /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-19.md
## Decision Inbox
    45|- Signal: Yellow
    46|- SOFORT_MACHEN: Nach dem heutigen `CODEX_HANDOFF_SCOUT_DAILY`-Lauf prüfen, ob zum offenen Lernwerkstatt-Handoff eine neue Outbox-Rückgabe vorliegt; keinen zweiten Handoff erstellen.
    47|- CHRIS_ENTSCHEIDET: Ob `millionco/react-doctor` lokal in einer Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden.
    48|- BEOBACHTEN: Frischer laufender LeseWerk-Task `t_783a3a3c`; offener Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Watchlist aus dem heutigen Scout.
    49|- SPAETER: `supertonic` nur bei lokaler-TTS-Priorität; `12-factor-agents` später mappen; VDS-GE nach Freitaglauf prüfen.
    50|- BLOCKIERT: nichts.
    51|- NICHT_TUN: Kein Codegraph-/React-Doctor-/Agentmemory-Rollout, keine Wholesale-Skill-Imports, kein CloakBrowser, keine Trading-Agenten, keine Installs/Commits/Pushes/Deployments/Löschungen/Veröffentlichungen.
    52|- Naechste kleinste Aktion: Heute nach 10:30 Outbox/Scout-Bericht prüfen und den offenen `Mengen legen`-Handoff nur dann weiterverfolgen, wenn eine neue Rückgabe vorliegt.
    53|- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-19.md`
    54|

#### /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md
## Decision Inbox
    19|- Signal: Yellow
    20|- SOFORT_MACHEN: Drei Materialtabletts aus dem Wochenplan vorbereiten: S-Kiste, Mengen-5-Tablett, UK-Alltagskarten.
    21|- CHRIS_ENTSCHEIDET: Ob `codegraph` als P2 in einem mittelgroßen, nicht-sensiblen Demo-/Throwaway-Repo getestet werden soll.
    22|- BEOBACHTEN: Heutigen Lernwerkstatt-Quality-Report nach 10:15 und die Montags-Parallelität der Jobs beobachten.
    23|- SPAETER: VDS-GE-Report-Verzeichnis nach Freitag prüfen; lokale Symbol-/Bildassets später planen.
    24|- BLOCKIERT: nichts.
    25|- NICHT_TUN: Kein Codegraph-Rollout, keine echten privaten/Hermes-/Lernwerkstatt-Repos indexieren, keine Prozess-Kills, keine Monsterprompts, keine Commits/Pushes, keine Installationen, keine Memory-Änderungen.
    26|- Naechste kleinste Aktion: Drei Materialtabletts vorbereiten und pro Station nur eine Beobachtungsfrage notieren.
    27|- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md`
    28|

#### /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-17.md
## Decision Inbox
    37|- Signal: Yellow
    38|- SOFORT_MACHEN: Laufende Alpha-7-Slice nicht stören; nach Abschluss nur Ergebnisbericht/Weiterlauf prüfen.
    39|- CHRIS_ENTSCHEIDET: Freigabe nötig, falls alte lokale Server-/Codex-Prozesse gezielt beendet oder aufgeräumt werden sollen.
    40|- BEOBACHTEN: Alpha-7-Kanban-Kette und heutiger Codex-Handoff-Scout-Lauf um 10:30.
    41|- SPAETER: Nach nächsten Wochenläufen prüfen, ob VDS-GE- und Wochenplan-Reports sinnvoll befüllt sind.
    42|- BLOCKIERT: nichts.
    43|- NICHT_TUN: Keine Prozess-Kills, keine neuen Monsterprompts, keine Commits/Pushes, keine Installationen, keine Memory-Änderungen aus diesem Job.
    44|- Naechste kleinste Aktion: Nach Abschluss von `t_dd02e220` prüfen, ob ein Ergebnisbericht vorhanden ist und `t_69e046ba` sauber weiterläuft.
    45|- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-17.md`
    46|

#### /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md
## Decision Inbox
    73|- Signal: Yellow
    74|- SOFORT_MACHEN: Folgeprompt für den engen Slice „Mengen legen als isolierter Beta-3.0-Spielraum“ ausführen lassen.
    75|- CHRIS_ENTSCHEIDET: Ob lokale lizenzsichere Symbol-/Bildassets später geplant oder zunächst weiter mit Platzhaltern gearbeitet wird.
    76|- BEOBACHTEN: Ob die lange Lehrkraftnavigation in weiteren Spielräumen ebenfalls den Kinderfluss stört.
    77|- SPAETER: Einheitliches lokales Symbol-/Asset-Konzept und Produkt-/Eduki-Prüfung erst nach einem wirklich starken Referenzspielraum.
    78|- BLOCKIERT: nicht geprueft: echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf.
    79|- NICHT_TUN: Kein weiteres neues Spiel hinzufügen, bevor ein vorhandener Spielraum Beta-3.0-nah fertig und geprüft ist.
    80|- Naechste kleinste Aktion: Den Folgeprompt als separaten Codex-/Coder-Slice starten, nicht als großen Gesamtumbau.
    81|- Beleg / Datei: /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md
    82|
