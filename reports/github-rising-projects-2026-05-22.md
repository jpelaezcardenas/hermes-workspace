# GitHub Rising Projects Tierlist – 2026-05-22

## Kurzfazit
Heute dominiert sehr klar ein Cluster aus **Agent-Skills, Coding-Agent-Kontext, MCP/Browser-DevTools und agent-nativen CLIs**. Das stärkste Rising-Signal bleibt `colbymchenry/codegraph`: hohe absolute Zunahme, weiterhin aktiver Push und direkter Nutzen für Codex-/Hermes-Handoffs. Gleichzeitig ist der Markt sichtbar überhitzt: mehrere Skill-Sammlungen haben enorme Sterne, aber teils unklare Lizenz, geringe technische Tiefe oder starken Overlap mit Hermes. Deshalb: **RepoApply + RiskGate vor jeder Integration**.

Datenlage: GitHub Trending Daily wurde geprüft; GitHub REST API wurde für Repo-Metadaten genutzt. GitHub Trending liefert 24h-Sterne, aber keine vollständige Zeitreihe; 7-Tage-Werte sind heute nur aus Vortagsbericht/qualitativen Trends ableitbar und entsprechend markiert. Externe Launch-Ursachen auf HN/Reddit/Product Hunt/X wurden heute **nicht belastbar verifiziert**.

## S-Tier

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Code Context / Knowledge Graph / Coding-Agent-Infrastruktur
- Kurzbeschreibung: Lokaler, vorindizierter Code-Knowledge-Graph für Claude Code, Codex, Cursor und OpenCode; Ziel: weniger Token, weniger Tool Calls, 100% lokal.
- Sterne gesamt: 14.851; Forks: 824; offene Issues: 114; Lizenz: MIT; erstellt: 2026-01-18; letzter Push: 2026-05-22
- Sterne-Wachstum 24h / 7 Tage: +4.294 laut GitHub Trending Daily; 7d heute nicht belastbar neu erhoben
- Relative Wachstumsrate: ca. 28,9% in 24h – extrem stark
- Warum S-Tier? Bestes Verhältnis aus Momentum, konkretem Entwicklernutzen und Hermes-Fit. Das Problem — lokaler Codekontext für Agenten mit weniger Tokens — ist real und direkt relevant für Codex-Handoffs, Codebase-Reviews und potenziell Lernwerkstatt-/Hermes-Repos.
- Mögliche Risiken: P2 ist weiterhin nicht freigegeben; vorherige P1-Bremse: produktive `picomatch` High-Audit-Warnung und noch kein mittelgroßer Nutzenbeleg. Interaktiver Installer/globales Setup bleibt tabu.
- Empfehlung: **beobachten / CHRIS_ENTSCHEIDET für P2-Sandbox**; nicht produktiv integrieren.

### ChromeDevTools/chrome-devtools-mcp
- Link: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Kategorie: MCP / Browser Automation / Developer Tooling
- Kurzbeschreibung: Chrome DevTools als MCP-Server für Coding Agents, damit Agenten Browser-/DevTools-Funktionen strukturierter nutzen können.
- Sterne gesamt: 40.664; Forks: 2.579; offene Issues: 82; Lizenz: Apache-2.0; erstellt: 2025-09-11; letzter Push: 2026-05-22
- Sterne-Wachstum 24h / 7 Tage: +151 laut GitHub Trending Daily; 7d nicht belastbar neu erhoben
- Relative Wachstumsrate: ca. 0,37% in 24h – relativ moderat, aber bei großer Basis relevant
- Warum S-Tier? Weniger „rising“ im relativen Sinn, aber strategisch sehr wichtig: offizieller/nahezu offizieller DevTools-Kontext, MCP-Fit, klarer Use Case für legitime Frontend-QA und Browser-Debugging. Sehr gute Überschneidung mit Hermes Browser/Computer-Use und React-/Lernwerkstatt-Qualitätsprüfungen.
- Mögliche Risiken: Browser-Automation kann schnell in eingeloggte/sensible Seiten, Cookies oder ToS-Bereiche führen; zusätzlicher MCP-Server erhöht Angriffsfläche.
- Empfehlung: **watch / später gezielte RiskGate-Prüfung**; keine Aktivierung ohne lokale Sicherheitsgrenzen.

## A-Tier

### anthropics/claude-plugins-official
- Link: https://github.com/anthropics/claude-plugins-official
- Kategorie: Claude Code Plugins / Agent Tooling
- Kurzbeschreibung: Anthropic-gepflegtes Verzeichnis hochwertiger Claude-Code-Plugins.
- Sterne gesamt: 23.249; Forks: 2.678; offene Issues: 685; Lizenz: nicht angegeben; erstellt: 2025-11-20; letzter Push: 2026-05-22
- Sterne-Wachstum 24h / 7 Tage: +682 laut GitHub Trending Daily; 7d nicht belastbar neu erhoben
- Relative Wachstumsrate: ca. 2,9% in 24h
- Warum A-Tier? Sehr starkes Ökosystem-Signal: Plugins/Skills werden zur Standardform für Agentenarbeit. Relevant als Markt- und Methodiksignal für Hermes, aber nicht automatisch installierbar.
- Mögliche Risiken: Lizenz nicht klar; viele Issues; Claude-spezifischer Fokus; Overlap mit Hermes Skills/Tools.
- Empfehlung: **concept-only / beobachten**; nur Prinzipien und Qualitätskriterien ableiten.

### HKUDS/CLI-Anything
- Link: https://github.com/HKUDS/CLI-Anything
- Kategorie: Agent-native CLI / Developer Tools
- Kurzbeschreibung: CLI-Hub mit Anspruch, Software agentenfähig über CLI-Strukturen bedienbar zu machen.
- Sterne gesamt: 39.364; Forks: 3.728; offene Issues: 60; Lizenz: Apache-2.0; erstellt: 2026-03-08; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: +656 laut GitHub Trending Daily; 7d nicht belastbar neu erhoben
- Relative Wachstumsrate: ca. 1,7% in 24h
- Warum A-Tier? Strategisch passend zu Runbooks, Tool-Kapselung, sicheren CLIs und agentenlesbaren Schnittstellen. Thema passt zu Hermes, aber Nutzen muss gegen vorhandene Tools/MCP/Skills geprüft werden.
- Mögliche Risiken: Claim „ALL Software“ ist überbreit; möglicher Overlap/Overengineering; unklare praktische Vorteile gegenüber Hermes-Tooling.
- Empfehlung: **watch / source-check später**; höchstens Dummy-CLI-Sandbox mit öffentlichen Daten.

### dotnet/skills
- Link: https://github.com/dotnet/skills
- Kategorie: .NET/C# Agent Skills
- Kurzbeschreibung: Skills zur Unterstützung von AI-Coding-Agents in .NET- und C#-Projekten.
- Sterne gesamt: 2.330; Forks: 189; offene Issues: 88; Lizenz: MIT; erstellt: 2026-02-03; letzter Push: 2026-05-22
- Sterne-Wachstum 24h / 7 Tage: +129 laut GitHub Trending Daily; 7d nicht belastbar neu erhoben
- Relative Wachstumsrate: ca. 5,5% in 24h – stark für die Größe
- Warum A-Tier? Kleiner als die großen Skill-Repos, aber mit starkem relativem Wachstum und klarem Domänenfokus. Gute Referenz dafür, wie domänenspezifische Hermes-Skills aussehen könnten.
- Mögliche Risiken: Für Chris aktuell nur indirekter Nutzen, solange keine .NET-Projekte im Kern stehen; Issue-Zahl relativ hoch.
- Empfehlung: **concept-only**; als Skill-Design-Vorbild beobachten.

### teng-lin/notebooklm-py
- Link: https://github.com/teng-lin/notebooklm-py
- Kategorie: Research Automation / Unofficial API / Agentic NotebookLM
- Kurzbeschreibung: Inoffizielle Python-API und CLI für Google NotebookLM mit Agenten-Anbindung.
- Sterne gesamt: 14.505; Forks: 2.005; offene Issues: 15; Lizenz: MIT; erstellt: 2026-01-07; letzter Push: 2026-05-22
- Sterne-Wachstum 24h / 7 Tage: +186 laut GitHub Trending Daily; 7d nicht belastbar neu erhoben
- Relative Wachstumsrate: ca. 1,3% in 24h
- Warum A-Tier? Relevantes Research-/RAG-Signal, besonders für VdS-/Quellenarbeit. Niedrige Issue-Zahl und aktueller Push sind positiv.
- Mögliche Risiken: Unofficial API gegen Google-Dienst; mögliche ToS-/Stabilitäts- und Account-Risiken; nicht mit privaten Dokumenten oder Schüler-/Verbandsdaten testen.
- Empfehlung: **watch / RiskGate**; keine Integration ohne ToS- und Datenschutzprüfung.

## B-Tier

### rohitg00/ai-engineering-from-scratch
- Link: https://github.com/rohitg00/ai-engineering-from-scratch
- Kategorie: AI Engineering Education
- Sterne gesamt: 11.092; Wachstum 24h: +1.333; Relative 24h-Rate: ca. 12,0%; Lizenz: MIT; letzter Push: 2026-05-21
- Einschätzung: Starkes Bildungssignal und relativ hohes Momentum. Für Hermes eher Lern-/Referenzmaterial als Tool-Integration.

### can1357/oh-my-pi
- Link: https://github.com/can1357/oh-my-pi
- Kategorie: Terminal Coding Agent
- Sterne gesamt: 6.030; Wachstum 24h: +500; Relative 24h-Rate: ca. 8,3%; Lizenz: MIT; letzter Push: 2026-05-22
- Einschätzung: Technisch interessant wegen hash-anchored edits, LSP, Browser und Subagents. Für Hermes aber hoher Overlap mit Codex/Hermes-Tools; beobachten statt ersetzen.

### antoinezambelli/forge
- Link: https://github.com/antoinezambelli/forge
- Kategorie: Self-hosted LLM Tool Calling / Agent Framework
- Sterne gesamt: 1.586; Wachstum 24h: +398; Relative 24h-Rate: ca. 25,1%; Lizenz: MIT; letzter Push: 2026-05-22
- Einschätzung: Sehr starkes relatives Momentum und kleine Basis. Noch unklar, ob es substanziell genug ist und ob es Hermes-Funktionen wirklich ergänzt. Gute Early-Watchlist-Kandidatur.

### Lum1104/Understand-Anything
- Link: https://github.com/Lum1104/Understand-Anything
- Kategorie: Code Knowledge Graph / Code Understanding
- Sterne gesamt: 17.112; Wachstum 24h: +666; Relative 24h-Rate: ca. 3,9%; Lizenz: MIT; letzter Push: 2026-05-22
- Einschätzung: Ähnliches Feld wie codegraph, mit stärkerem Fokus auf „Graphs that teach“. Interessant, aber derzeit nachrangig gegenüber bereits P1-geprüftem codegraph.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research-Agent Skills / Schreib- und Review-Workflow
- Sterne gesamt: 18.599; Wachstum 24h: +2.579; Relative 24h-Rate: ca. 13,9%; Lizenz: NOASSERTION/unklar; letzter Push: 2026-05-22
- Einschätzung: Sehr starkes Momentum und hoher Fit für VdS/Research. Wegen unklarer Lizenz und ungeprüfter Skill-Qualität heute nicht S/A für Integration, sondern source-check / concept-only.

## C-Tier

### multica-ai/andrej-karpathy-skills
- Link: https://github.com/multica-ai/andrej-karpathy-skills
- Begründung: +2.614/24h bei 144.275 Sternen ist sichtbar, aber relativ nur ca. 1,8%; zudem kein klarer Code-/Tool-Substanzbeleg, Lizenz nicht angegeben, letzter Push 2026-04-20. Als Methodiksignal okay, als Rising-Projekt überbewertet.

### obra/superpowers
- Link: https://github.com/obra/superpowers
- Begründung: +1.576/24h bei 202.082 Sternen ist absolut hoch, relativ aber nur ca. 0,8%. Methodisch interessant, für Hermes bereits concept-only eingeordnet. Keine Wholesale-Übernahme.

### rmyndharis/OpenWA
- Link: https://github.com/rmyndharis/OpenWA
- Begründung: Self-hosted WhatsApp API Gateway ist praktisch verlockend, aber für Hermes/Schule/VdS wegen Account-, Datenschutz- und möglichem ToS-Risiko nicht integrationsnah.

### msitarzewski/agency-agents
- Link: https://github.com/msitarzewski/agency-agents
- Begründung: Sehr viele Sterne, aber eher Agenten-/Prompt-Sammlung mit großem Hype-Anteil und unklarem direkten Nutzen. Overlap mit vorhandenen Hermes-Profilen und Skills.

## Early Watchlist
- antoinezambelli/forge – https://github.com/antoinezambelli/forge  
  Warum interessant: Kleine Basis, +398/24h, MIT, aktiver Push; Thema Self-hosted Tool Calling passt zu LocalAI/Agenten-Workflows.  
  A/S-Bedingung: klare Dokumentation, einfache Sandbox, echter Vorteil gegenüber Hermes Tools/MCP ohne neue Privacy-Fläche.

- can1357/oh-my-pi – https://github.com/can1357/oh-my-pi  
  Warum interessant: Terminal-Agent mit LSP, browser, subagents und hash-anchored edits; starkes relatives Wachstum.  
  A/S-Bedingung: belastbarer Vorteil gegenüber Codex/Hermes in einem öffentlichen Throwaway-Repo.

- dotnet/skills – https://github.com/dotnet/skills  
  Warum interessant: Domänenspezifische Skill-Struktur mit starkem relativen Wachstum.  
  A/S-Bedingung: übertragbare Skill-Muster für Hermes ohne .NET-Spezialballast.

- teng-lin/notebooklm-py – https://github.com/teng-lin/notebooklm-py  
  Warum interessant: Research-Automation und NotebookLM-Programmierbarkeit.  
  A/S-Bedingung: ToS-/Datenschutzlage klar, public-data-only Sandbox möglich.

## Top 5 Des Tages
1. `colbymchenry/codegraph` – stärkstes Gesamtpaket aus Momentum, Local-First-Codekontext und Hermes-Fit.
2. `ChromeDevTools/chrome-devtools-mcp` – strategisch wichtig für legitime Browser-/Frontend-QA über MCP.
3. `anthropics/claude-plugins-official` – starkes Ökosystemsignal für Plugin-/Skill-Standardisierung.
4. `HKUDS/CLI-Anything` – interessantes Signal für agent-native CLI-Designs, aber mit Overengineering-Risiko.
5. `antoinezambelli/forge` – kleiner, früher Kandidat mit starkem relativen Wachstum im LocalAI/Tool-Calling-Feld.

## Veränderung gegenüber gestern
- Neue/hochgezogene Aufsteiger: `ChromeDevTools/chrome-devtools-mcp`, `anthropics/claude-plugins-official`, `dotnet/skills`, `antoinezambelli/forge`, `notebooklm-py`.
- Wiederkehrende Projekte: `codegraph`, `CLI-Anything`, `academic-research-skills`, `oh-my-pi`, `superpowers`, `andrej-karpathy-skills`, `OpenWA`.
- Absteiger/niedriger priorisiert: `academic-research-skills` bleibt stark, wird wegen Lizenz/Skill-Qualität aber auf concept-only/source-check begrenzt. `superpowers` und `andrej-karpathy-skills` bleiben eher Methodiksignal als Integrationskandidat.
- Nachlassendes/unklares Momentum: `react-doctor` ist heute nicht im geprüften Daily-Topset sichtbar, bleibt aber als bereits vorbereiteter Hermes-Quality-Gate-Skill praktisch relevant.

## Hermes-Integrationsentscheidung

### RepoApply / RiskGate – colbymchenry/codegraph
- Entscheidung: **watch / CHRIS_ENTSCHEIDET vor P2-Sandbox**
- Nutzen für Hermes/Codex/Lernwerkstatt: lokaler Codekontext, Impact-Analyse, weniger Token und bessere Handoffs für Codex; potenziell hilfreich für größere React-/Lernwerkstatt-Repos.
- Überschneidung: Hermes `search_files`, Codebase-Inspection, Codex-Handoffs, vorhandene lokale Dateitools.
- Wichtigstes Risiko: bekannte P1-Bremse (`picomatch` High Audit Warning), interaktiver Installer/globaler Eingriff, noch fehlender mittelgroßer Nutzenbeleg.
- Kleinster sicherer Sandbox-Test: öffentliches mittelgroßes Repo in disposable dir; kein Installer, keine globalen Config-Änderungen, keine privaten Repos.
- Graduation: Cockpit-Aufgabe oder Runbook; erst nach bestandenem P2. Kein MemoryCheck jetzt.

### RepoApply / RiskGate – ChromeDevTools/chrome-devtools-mcp
- Entscheidung: **watch / concept-only bis Sicherheitsgrenzen definiert sind**
- Nutzen: MCP-basierte Browser-/DevTools-QA für Frontend-Debugging, React-Doctor-Ergänzung, ggf. Lernwerkstatt-Testläufe.
- Überschneidung: Hermes Browser-Automation, Computer-Use, bestehende MCP-/Tool-Struktur.
- Wichtigstes Risiko: Browser-Sessions können Cookies, Logins, private Seiten und Schüler-/VdS-Daten berühren; MCP-Server erweitert lokale Angriffsfläche.
- Kleinster sicherer Sandbox-Test: nur lokale statische Demo-App, eigener Chrome-Testprofilordner, kein Login, localhost-only, Netzwerkzugriffe dokumentieren.
- Graduation: mögliches Runbook/Skill nur nach RiskGate; aktuell keine Integration.

### RepoApply / RiskGate – anthropics/claude-plugins-official
- Entscheidung: **concept-only**
- Nutzen: Qualitäts- und Strukturmuster für Hermes Skills, Plugin-Kataloge und Agenten-Workflows.
- Überschneidung: Hermes Skills, Profile, Tool-Routing, Codex-/Claude-Handoffs.
- Wichtigstes Risiko: Lizenz fehlt; Claude-spezifisch; Gefahr, fremde Plugin-Patterns unkritisch zu übernehmen.
- Kleinster sicherer Sandbox-Test: statische Prüfung von 2–3 Plugin-Beispielen; keine Installation.
- Graduation: eventuell Skill-Authoring-Prinzipien; kein direkter RepoApply.

### RepoApply / RiskGate – HKUDS/CLI-Anything
- Entscheidung: **watch**
- Nutzen: Ideen für agentenlesbare CLI-Wrapper, Runbooks und sichere Tool-Kapselung.
- Überschneidung: Hermes Tools, Gateway, MCP, Skills und Terminal-Workflows.
- Wichtigstes Risiko: Overengineering; unklare Vorteile; möglicher Ersatzdrang für funktionierende Hermes-Bausteine.
- Kleinster sicherer Sandbox-Test: später Dummy-CLI mit synthetischen Daten; keine Credentials.
- Graduation: höchstens Runbook/Prinzipien, keine produktive Integration.

### RepoApply / RiskGate – dotnet/skills
- Entscheidung: **concept-only**
- Nutzen: Vorlage für domänenspezifische Skill-Struktur; relevant für bessere Hermes-Skill-Standards.
- Überschneidung: bestehende Hermes-Skills und Skill-Authoring-Regeln.
- Wichtigstes Risiko: Für Chris wenig direkter Nutzwert ohne .NET-Projekt; Domain-Spezifik kann ablenken.
- Kleinster sicherer Sandbox-Test: README-/Strukturvergleich; keine Installation.
- Graduation: möglicher Skill-Authoring-Hinweis, falls Muster besser sind.

### RepoApply / RiskGate – teng-lin/notebooklm-py
- Entscheidung: **watch / RiskGate erforderlich**
- Nutzen: Research-Workflow-Automation für öffentliche Quellen; potenziell VdS-/Wissenschaftsrecherche.
- Überschneidung: Hermes Web-Tools, Research-Skills, Obsidian, Session Search.
- Wichtigstes Risiko: inoffizielle Google-API, Account-/ToS-/Datenschutzrisiko; private Dokumente wären tabu.
- Kleinster sicherer Sandbox-Test: nur öffentliche Demoquellen und Wegwerf-/Testaccount, falls Chris explizit zustimmt; vorher ToS prüfen.
- Graduation: keine Integration jetzt; höchstens Watchlist.

## Integration Result
- Projects reviewed: 15
- Test-now: keines ohne Chris-Entscheidung
- Watch: `codegraph`, `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`
- Block: keine neue Block-Entscheidung; bestehende Block-Regel für Stealth-/Anti-Bot-/ToS-riskante Browser bleibt gültig
- Files changed: `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-22.md`
- Hermes benefit: klare Priorisierung auf lokalen Codekontext, sichere Browser-QA und bessere Skill-/CLI-Prinzipien statt Hype-Installation
- Remaining risks: GitHub-Trending-Zahlen ohne volle Zeitreihe; keine verifizierten externen Launch-Ursachen; mehrere Repos mit unklarer Lizenz/ToS- oder Privacy-Fläche
- Next action: Nur nach Chris-Freigabe: `codegraph` P2-Sandbox auf öffentlichem mittelgroßem Repo vorbereiten

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob `codegraph` P2-Sandbox auf einem öffentlichen mittelgroßen Repo vorbereitet werden soll; keine privaten Hermes-/Lernwerkstatt-Repos, kein globaler Installer.
- BEOBACHTEN: `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi` als relevante Signale für MCP, agent-native CLI, LocalAI und Browser-QA.
- SPAETER: Skill-Design-Prinzipien aus `anthropics/claude-plugins-official` und `dotnet/skills` statisch vergleichen.
- BLOCKIERT: keine echten Blocker; 7-Tage-Zeitreihe und externe Launch-Ursachen heute nicht belastbar verfügbar.
- NICHT_TUN: Keine direkte Installation, kein Plugin-/Skill-Wholesale-Import, kein NotebookLM-/Browser-Test mit privaten Daten, Cookies, echten Accounts oder Schüler-/VdS-Inhalten.
- Naechste kleinste Aktion: Chris entscheidet über `codegraph` P2-Sandbox oder keine Aktion.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-22.md`; Quellen: GitHub Trending Daily und GitHub REST API.