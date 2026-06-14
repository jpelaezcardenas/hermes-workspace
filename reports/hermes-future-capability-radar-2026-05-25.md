# Hermes Future Capability Radar — 2026-05-25

STATE: DONE
PROFILE/ROLES_USED: neva integration; research lens for repo metadata/source quality; coder lens for sandbox feasibility; memory lens for durable MemoryCheck; reviewer lens for RiskGate.
SKILLS_USED: hermes-agent-operating-system, github-rising-integration, codex-handoff, kanban-worker.

## 1. Kurzfazit

Die wichtigste Zukunftsspur aus dem GitHub-Rising-Report ist nicht „mehr Tools installieren“, sondern: bessere lokale Code-Kontextkarten, strengere Memory-Hygiene, wiederverwendbare Skills, Cockpit-Sichtbarkeit und sicherere Research-Workflows.

Konkrete Entscheidung: `Lum1104/Understand-Anything` bleibt der einzige echte `test-now` Kandidat, aber nur als RiskGate- und Sandbox-Kette mit öffentlichem Toy-Repo. Alles andere bleibt `watch`, `concept-only` oder `block`.

Keine Installation, keine produktive Integration, keine privaten Repos, keine Tokens, keine Browser-Cookies, keine Schülerdaten.

## 2. Quellen und Kontext

Gelesene lokale Quellen:
- `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-25.md`
- `/Users/zondrius/.hermes/memory/integrations/github-rising-2026-05-25-capability-radar.md`
- `/Users/zondrius/.hermes/memory/integrations/agent-tool-radar-riskgate-2026-05-22.md`
- `/Users/zondrius/.hermes/profiles/neva/memory/workflows/daily-github-scout.md`
- `/Users/zondrius/.hermes/profiles/neva/memory/workflows/hermes-agent-operating-system.md`

Online re-verifiziert über GitHub API am 2026-05-25 im Kanban-Run:
- `Lum1104/Understand-Anything`: MIT, 30.665 Stars, 2.540 Forks, 46 offene Issues, letzter Push 2026-05-24, nicht archiviert.
- `colbymchenry/codegraph`: MIT, 24.730 Stars, 1.362 Forks, 169 offene Issues, letzter Push 2026-05-24, nicht archiviert.
- `Imbad0202/academic-research-skills`: Lizenz `NOASSERTION`, 21.410 Stars, 1.819 Forks, 21 offene Issues, letzter Push 2026-05-24.
- `rohitg00/ai-engineering-from-scratch`: MIT, 18.301 Stars, 3.117 Forks, 41 offene Issues, letzter Push 2026-05-25.
- `anthropics/claude-plugins-official`: keine erkannte Lizenz, 27.736 Stars, 2.950 Forks, 705 offene Issues, letzter Push 2026-05-25.
- `tinyhumansai/openhuman`: GPL-3.0, 27.747 Stars, 2.566 Forks, 127 offene Issues, letzter Push 2026-05-25.
- `mukul975/Anthropic-Cybersecurity-Skills`: Apache-2.0, 9.120 Stars, 1.128 Forks, 17 offene Issues, letzter Push 2026-05-13.
- `multica-ai/multica`: Lizenz `NOASSERTION`, 33.014 Stars, 3.957 Forks, 747 offene Issues, letzter Push 2026-05-25.
- `rohitg00/agentmemory`: Apache-2.0, 17.794 Stars, 1.456 Forks, 187 offene Issues, letzter Push 2026-05-25.
- `ChromeDevTools/chrome-devtools-mcp`: Apache-2.0, 41.709 Stars, 2.650 Forks, 87 offene Issues, letzter Push 2026-05-24.
- `CloakHQ/CloakBrowser`: MIT, aber Stealth-/Anti-Bot-Claim; 20.927 Stars, 1.652 Forks, 90 offene Issues.
- `Alishahryar1/free-claude-code`: MIT, aber Account-/Credential-/ToS-Risiko; 29.626 Stars, 4.451 Forks, 163 offene Issues.

Hinweis: Stars sind nur ein Signal. Lizenz, Risiko, Fit und Sandbox-Beweis wiegen höher.

## 3. Tiered Decision Table

| Kandidat | Entscheidung | Nutzen für Chris/Hermes | Hauptgrund | Nächste Aktion |
|---|---|---|---|---|
| `Lum1104/Understand-Anything` | test-now | Code-Kontext für Codex/Hermes-Handoffs, Lernwerkstatt-Codeverständnis, Review-Navigation | MIT, hoher Fit, klarer Use Case | Nur RiskGate-Bericht, danach public Toy-Repo-Sandbox, falls sicher |
| `colbymchenry/codegraph` | watch / Chris entscheidet P2 | Schon bekannter Code-Kontext-Kandidat | P1 existiert, aber P2 wegen `picomatch` High Audit Warning nicht freigegeben | Keine weitere P2 ohne Chris-Freigabe |
| `ChromeDevTools/chrome-devtools-mcp` | watch | Offizielle DevTools-MCP-Idee für lokale Browser-Debugging-Fälle | Browser-/Cookie-/Login-Oberfläche | Später nur localhost, separater Chrome-Profile, keine Logins |
| `rohitg00/agentmemory` | watch | Memory-Architektur-Signal | frühere Telemetrie/externer First-Run/Auto-Capture-Risiken | keine Migration, nur Prinzipien beobachten |
| `Imbad0202/academic-research-skills` | concept-only/watch | Research-/VdS-Schreib- und Review-Schleifen | Lizenz unklar, Claude-spezifisch | Prinzipien extrahieren, kein Copy-Paste |
| `tinyhumansai/openhuman` | concept-only | LocalAI/private Memory/Markdown-Knowledge-Ideen | GPL-3.0, Privacy-Oberfläche | Architekturideen, keine Integration |
| `mukul975/Anthropic-Cybersecurity-Skills` | concept-only/watch | Safety-/Review-Checklisten als Strukturvorbild | Security-Automation-Risiko | Taxonomie lesen, keine operative Security-Ausführung |
| `multica-ai/multica` | concept-only/watch | Agent-Cockpit, Blocked-Task-Monitoring, Skill-Aufbau | unklare Lizenz, 747 Issues, Overlap | Designideen intern in Hermes, keine Plattformmigration |
| `stablyai/orca` | concept-only/watch | parallele Agentenflotten/IDE-Cockpit-Idee | Datenschutzmodell und Nutzen unklar | nur beobachten |
| `rohitg00/ai-engineering-from-scratch` | watch/später | EdTech/Startup/AI-Engineering-Lernpfad | eher Bildung als Tooling | optionales Lern-Runbook, wenn Chris will |
| `anthropics/claude-plugins-official` | concept-only | Plugin-Ökosystem-Signal | keine erkannte Lizenz, viele Issues, Claude-spezifisch | Standards beobachten, nicht umschwenken |
| `CloakHQ/CloakBrowser` | block | kein legitimer Hermes-Bedarf | Stealth/Anti-Bot/Captcha-Bypass/ToS | nicht integrieren, nicht testen |
| `Alishahryar1/free-claude-code` | block | kein legitimer Hermes-Bedarf | Account-/Credential-/ToS-Risiko | nicht nutzen |

## 4. RiskGate für test-now/watch Kandidaten

### Understand-Anything — RiskGate: Orange vor Ausführung, Yellow für reine Source-Review
- Erlaubt jetzt: README, Lizenz, package/dependency/network review, lokale Berichtserstellung.
- Nicht erlaubt ohne neue Freigabe: Installation, Ausführung fremden Codes, privates Repo, globale Installationsskripte, Zugriff auf `~/.claude*`, Tokens, Browserprofile, produktive Hermes-/Lernwerkstatt-Verzeichnisse.
- Sandbox-Grenze: Public Toy-Repo in disposable Folder; kein Login; Netzwerkaufrufe protokollieren; keine Schreibrechte außerhalb Sandbox.
- Erfolgskriterium: erzeugt eine Codekarte, die Codex-Handoffs nachweisbar besser macht als heutige Dateiliste/CodeGraph-Notiz; weniger Suchaufwand, klarere Symbol-/Flow-Fragen, kein Sicherheitsnachteil.
- Stop-Kriterium: unklare Lizenzänderung, Install-Skript schreibt global, fordert Tokens/OAuth, startet fremde Services unkontrolliert, sendet Code extern, Nutzen bleibt nur visuell.

### codegraph — RiskGate: Orange
- Bekanntes Risiko: produktives `picomatch` High Audit Warning aus P1-Kontext; P2 nicht genehmigt.
- Erlaubt: vorhandene Berichte lesen, Watchlist aktualisieren.
- Nicht erlaubt: P2 auf mittelgroßem Repo, private Repo-Indexierung, global installer, Änderungen an `~/.claude*` ohne Chris.
- Erfolgskriterium für spätere P2: deutlich bessere Hermes/Codex-Handoffs in öffentlichem mittelgroßem Repo, dokumentierte Audit-Abwägung.

### ChromeDevTools MCP — RiskGate: Orange
- Risiko: Browser-Cookies, eingeloggte Seiten, private lokale Apps, DevTools kann viel preisgeben.
- Erlaubt später: nur localhost Demo-App, separates Browserprofil, keine Accounts.
- Nutzen: Browser-Debugging für Lernwerkstatt/LeseWerk, wenn bestehende Browser-Tools nicht reichen.

### agentmemory — RiskGate: Orange
- Risiko: automatische Memory-Erfassung, externe First-Run-Verbindungen, Wildcard-Websocket aus früherer Beobachtung.
- Erlaubt: Architektur-Prinzipien vergleichen.
- Nicht erlaubt: Migration, Autocapture, produktive Memory-Ersetzung.

### academic-research-skills — RiskGate: Yellow/Orange
- Risiko: unklare Lizenz, fremde Skill-Texte, Qualitätsillusion.
- Erlaubt: öffentliche Struktur lesen, eigene Prinzipien formulieren.
- Nicht erlaubt: Skill-Dateien kopieren oder paraphrasieren, ohne eigene Prüfung und klare Lizenz.

### openhuman — RiskGate: Orange/Red für Integration
- Risiko: GPL-3.0, personenbezogene Wissensbasis, breite Memory-/LocalAI-Oberfläche.
- Erlaubt: Architekturideen zur Privacy und Markdown-Wissenskompression.
- Nicht erlaubt: Codeintegration, Migration, echte Daten.

### multica/orca — RiskGate: Yellow/Orange
- Risiko: Plattformmigration, unklare Lizenz/Datenschutz, Overengineering.
- Erlaubt: UI-/Cockpit-Ideen in Hermes übertragen.
- Nicht erlaubt: Plattformwechsel oder Account-Anbindung.

## 5. MemoryCheck

Schon vorhanden und weiterhin korrekt:
- `/Users/zondrius/.hermes/memory/integrations/github-rising-2026-05-25-capability-radar.md`
- `/Users/zondrius/.hermes/memory/integrations/agent-tool-radar-riskgate-2026-05-22.md`
- `/Users/zondrius/.hermes/profiles/neva/memory/workflows/daily-github-scout.md`

Nicht zusätzlich in Langzeit-Memory speichern:
- konkrete Star-Zahlen, Fork-Zahlen und Issue-Zahlen; diese altern schnell.
- vollständige Report-Inhalte.
- Kanban-Task-IDs als Memory-Regel.

Dauerhaft merken sollte Hermes nur diese Regel, die in den bestehenden Dateien bereits steht:
- GitHub-Rising-Signale werden über `test-now`, `watch`, `concept-only`, `block` sortiert.
- `test-now` heißt zuerst RiskGate, nicht Installation.
- Private Hermes-/Lernwerkstatt-/LeseWerk-/VdS-Daten sind für neue Repo-Tests tabu.
- Code-Kontext-Tools müssen gegen bestehenden Hermes/Codex-Handoff-Nutzen beweisen, nicht nur schön aussehen.

Empfehlung: keine neue separate Memory-Datei nötig; der bestehende Capability-Radar ist ausreichend. Dieser Abschlussbericht bleibt als Projekt-/Report-Artefakt.

## 6. Safe Sandbox Plan für Top-Kandidat: Understand-Anything

Phase 0 — SourceReview, keine Ausführung:
1. Repo README, LICENSE, package/manifests, install scripts, examples, config defaults lesen.
2. Prüfen: schreibt es global? braucht es API-Keys? startet es Server? sendet es Code an externe APIs? liest es Home-/IDE-/Claude-Verzeichnisse?
3. Ergebnisdatei: `/Users/zondrius/hermes-workspace/reports/understand-anything-riskgate-2026-05-25.md`.

Phase 1 — Sandbox nur nach bestandenem SourceReview:
1. Arbeitsordner: `/Users/zondrius/hermes-workspace/integration-tests/understand-anything-sandbox-public/`.
2. Testrepo: kleines öffentliches Toy-Repo oder selbst erzeugtes Mini-Repo ohne private Inhalte.
3. Keine globale Installation; bevorzugt temporäre/isolierte Ausführung, falls vom Tool unterstützt.
4. Netzwerk beobachten/dokumentieren.
5. Output erfassen: Graph/Index/Report, keine privaten Daten.

Phase 2 — Nutzenvergleich:
1. Gleiche Toy-Codebase einmal mit bestehendem CodeGraph-/Codebase-Map-Vorgehen beschreiben.
2. Drei Handoff-Fragen testen: „Wo startet der Flow?“, „Welche Dateien beeinflussen X?“, „Welche Änderung wäre minimal?“
3. Erfolg nur, wenn Understand-Anything mindestens eines besser macht: klarere Handoff-Map, bessere Navigation, weniger Toolaufrufe, weniger Fehlannahmen.

Phase 3 — Graduation oder Ablehnung:
- Bei Erfolg: kleines Skill-/Runbook-Kandidat, nicht produktive Integration.
- Bei neutralem Ergebnis: Watchlist, kein weiterer Aufwand.
- Bei Risiko: block/quarantine.

## 7. Future Roadmap für Chris' Systeme

### Lernwerkstatt / LeseWerk Qualität
- Nutzen aus Code-Kontext-Tools: bessere Übersicht über Schülerflow, Übungsdaten, Feedbacklogik, Druckkarten und Auswertung.
- Wichtig: keine echten Schülerdaten indexieren; nur Code und synthetische Demo-Daten.
- Zielbild: vor jeder größeren Lernwerkstatt-Änderung kann Hermes einen kleinen „Flow Map“-Bericht erstellen: Startbutton, Aufgabe, Feedback, Teacher-View, Druck/Export.

### Schulplanung und Förderkompass
- GitHub-Tools sind hier nur indirekt nützlich.
- Besserer Hermes-Fokus: datensparsame lokale Vorlagen, anonymisierte Farbcodes, klare Förderziel-Sprache, keine Diagnose-Automation.
- Kein neues Memory-Tool darf echte Schülerprofile automatisch sammeln.

### Codex/Hermes Code-Handoffs
- Höchster praktischer Nutzen.
- Ziel: Handoffs werden kleiner, dateispezifischer, acceptance-tested und mit Code-Kontext-Map versehen.
- Understand-Anything oder codegraph müssen beweisen, dass sie Handoffs verbessern. Sonst bleibt die bestehende manuelle Struktur ausreichend.

### Research/VdS Workflows
- `academic-research-skills` ist interessant, aber nur als Konzeptquelle.
- Besser: eigener VdS-Research-Loop mit Quellenqualität, Primärquellen, Gegenargumenten, politischer Anschlussfähigkeit, menschlicher Freigabe.
- Keine fremden Skilltexte übernehmen.

### Memory Hygiene
- Zukunftsrichtung: weniger Auto-Capture, mehr bewusste Graduation.
- Memory speichert stabile Regeln, nicht Projektstände.
- Session Search und Reports bleiben für Verlauf; Skills für wiederholbare Verfahren.

### Agent Cockpit / Blocked-Task Monitoring
- multica/orca zeigen, dass Cockpit-Sichtbarkeit wertvoll ist.
- Hermes sollte nicht migrieren, sondern intern besser werden: echte laufende Worker vs. stale runtime, blocked/review-required sichtbar, Decision-Inbox-Buckets einheitlich.
- Nächster sinnvoller Schritt wäre ein kleiner Cockpit-Review-Task, nicht Plattformwechsel.

## 8. Kanban Proposal — kleine Tasks

Bestehender Child-Task:
1. `Understand-Anything RiskGate Sandbox Plan` → research → Bericht ohne Installation. Das ist der richtige direkte nächste Schritt.

Zusätzliche kleine Folgeaufgaben empfohlen:
2. `Academic Research Skills Concept Review for VdS` → research → nur Prinzipien extrahieren, keine Skilltexte kopieren.
3. `Hermes Agent Cockpit Inspiration Review` → neva oder coder → multica/orca nur als UX-/Workflow-Inspiration für blocked/review-required visibility.
4. `Code Context Tool Comparison Rubric` → coder → Kriterien erstellen, wie Understand-Anything vs. codegraph Handoffs messbar verglichen werden.
5. `Memory Hygiene Check for GitHub Scout` → memory → prüfen, ob Daily Scout nur stabile Regeln speichert und keine kurzlebigen Metadaten.

Aufgabenschnitt:
- je Task ein Outputfile,
- keine Installation ohne separate Freigabe,
- keine privaten Daten,
- Akzeptanzkriterien in unter 10 Minuten prüfbar.

## 9. Entscheidungsempfehlung

SOFORT_MACHEN:
- Den vorhandenen Child-Task `Understand-Anything RiskGate Sandbox Plan` ausführen lassen. Noch kein Sandbox-Run, nur Source-/Risiko-Bericht.

CHRIS_ENTSCHEIDET:
- Ob später eine echte Understand-Anything-Sandbox nach bestandenem RiskGate laufen darf.
- Ob `codegraph` P2 trotz bekanntem Audit-Hinweis weiterverfolgt wird.

BEOBACHTEN:
- `ChromeDevTools/chrome-devtools-mcp`, `agentmemory`, `academic-research-skills`, `openhuman`, `multica`, `orca`, `ai-engineering-from-scratch`.

NICHT_TUN:
- CloakBrowser, free-claude-code, Wholesale-Copy fremder Skills, private Repo-Indexierung, Memory-Migration, globale Installationen aus Trendberichten.

## 10. Qualitätscheck

- Datenschutz: keine Schüler-, Eltern-, Verbands- oder privaten Repo-Daten verarbeitet; nur öffentliche Repo-Metadaten und lokale Reports.
- Quellenlage: lokale GitHub-Rising-Berichte plus GitHub API-Metadaten re-verifiziert.
- Praktikabilität: nächster Schritt ist klein und bereits als Kanban-Child vorhanden.
- Risiko: Installation und Ausführung externer Repos bleiben ausdrücklich ausgeschlossen.
- Umsetzbarkeit: Aufgaben sind klein genug, um Iteration-Budget-Fehler zu vermeiden.
