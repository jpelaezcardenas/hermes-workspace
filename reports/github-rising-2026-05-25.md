# GitHub Rising Projects Tierlist – 2026-05-25

## Kurzfazit
Heute dominiert klar das Thema **Agentic Coding + Code-Knowledge-Graphs + Skills/Plugin-Ökosysteme**. Auffällig ist die sehr starke relative Dynamik junger Repos wie `Understand-Anything`, `codegraph`, `ai-engineering-from-scratch` und `academic-research-skills`. Gleichzeitig ist Hype-Risiko hoch: Mehrere Projekte adressieren Claude-/Agenten-Workflows mit ähnlichen Claims, teils ohne klare Lizenz oder mit Privacy-/ToS-Risiken.

Datenbasis: GitHub Trending daily/weekly via Web-Extrakt, GitHub API Repo-Metadaten am 2026-05-25. 24h-/7d-Zahlen sind GitHub-Trending-Anzeigen bzw. Extraktwerte, keine vollständige GitHub-Historie.

## S-Tier

### Lum1104/Understand-Anything
- Link: https://github.com/Lum1104/Understand-Anything
- Kategorie: Developer Tools / Code Knowledge Graph / AI Agent Context
- Kurzbeschreibung: Interaktive, durchsuchbare Wissensgraphen für Codebases; kompatibel mit Claude Code, Codex, Cursor, Copilot, Gemini CLI.
- Sterne gesamt: 28.136; Forks: 2.373; offene Issues: 36; erstellt: 2026-03-15; letzter Push: 2026-05-24; Lizenz: MIT.
- Sterne-Wachstum 24h / 7 Tage: +3.999 / +9.102.
- Relative Wachstumsrate: ca. 14,2% täglich; ca. 32,4% wöchentlich.
- Warum S-Tier? Sehr starkes absolutes und relatives Wachstum, klarer Use Case, passt direkt zum Trend „LLMs brauchen bessere Code-Kontextkarten“. MIT und geringe Issue-Zahl wirken positiv.
- Mögliche Risiken: Nutzen gegenüber bestehendem `codegraph`/CodeGraph-Skill muss praktisch bewiesen werden; visuelle Graphen können mehr beeindrucken als tatsächlich helfen.
- Empfehlung: **test-now** als Sandbox-Vergleich gegen `codegraph`, nur mit öffentlichem Toy-Repo.

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Developer Tools / Local Code Graph / Agent Context
- Kurzbeschreibung: Lokaler pre-indexed code knowledge graph für Claude Code, Codex, Cursor, OpenCode und Hermes Agent.
- Sterne gesamt: 23.469; Forks: 1.288; offene Issues: 153; erstellt: 2026-01-18; letzter Push: 2026-05-24; Lizenz: MIT.
- Sterne-Wachstum 24h / 7 Tage: +3.003 / +18.136.
- Relative Wachstumsrate: ca. 12,8% täglich; ca. 77,3% wöchentlich.
- Warum S-Tier? Extremes wöchentliches Momentum und direkter Hermes-Fit: lokaler Codekontext, weniger Tokens, besserer Handoff an Codex/Hermes.
- Mögliche Risiken: Bereits P1-getestet; P2 weiter nicht freigegeben wegen produktivem `picomatch` High Audit Warning und fehlendem mittelgroßem Nutzenbeweis.
- Empfehlung: **beobachten / P2 nur nach Chris-Entscheid**.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research Skills / Academic Agent Workflows
- Kurzbeschreibung: Skillset für Claude Code entlang research → write → review → revise → finalize.
- Sterne gesamt: 20.987; Forks: 1.782; offene Issues: 20; erstellt: 2026-02-26; letzter Push: 2026-05-24; Lizenz: NOASSERTION/Other.
- Sterne-Wachstum 24h / 7 Tage: 24h nicht verlässlich extrahiert / +11.401.
- Relative Wachstumsrate: wöchentlich ca. 54,3%.
- Warum S-Tier? Sehr starkes relatives Wachstum und klarer Fit für VdS-/wissenschaftliche Rechercheabläufe. Niedrige offene Issue-Zahl und frischer Push positiv.
- Mögliche Risiken: Lizenz unklar; direkte Übernahme von Skills wäre riskant. Qualität und Quellenstandards müssen geprüft werden.
- Empfehlung: **concept-only/watch**; nur Prinzipien extrahieren, keine direkte Integration.

## A-Tier

### rohitg00/ai-engineering-from-scratch
- Link: https://github.com/rohitg00/ai-engineering-from-scratch
- Kategorie: AI Engineering Education / Build Guides
- Kurzbeschreibung: Lern- und Build-Ressource für AI-Engineering-Projekte.
- Sterne gesamt: 17.212; Forks: 2.979; offene Issues: 28; erstellt: 2026-03-18; letzter Push: 2026-05-23; Lizenz: MIT.
- Sterne-Wachstum 24h / 7 Tage: +1.853 / +6.944.
- Relative Wachstumsrate: ca. 10,8% täglich; ca. 40,3% wöchentlich.
- Warum A-Tier? Starkes Momentum, hoher Lernwert, gut für MVP-/Startup-/EdTech-Kompetenzaufbau.
- Risiken: Eher Educational Content als direktes Tool; Qualität einzelner Beispiele nicht geprüft.
- Empfehlung: **watch / punktuell anschauen**.

### anthropics/claude-plugins-official
- Link: https://github.com/anthropics/claude-plugins-official
- Kategorie: Agent Plugins / Claude Code Ecosystem
- Kurzbeschreibung: Offiziell verwaltetes Verzeichnis für Claude-Code-Plugins.
- Sterne gesamt: 27.539; Forks: 2.932; offene Issues: 702; erstellt: 2025-11-20; letzter Push: 2026-05-24; Lizenz: keine erkannt.
- Sterne-Wachstum 24h / 7 Tage: +1.173 / nicht verlässlich extrahiert.
- Relative Wachstumsrate: ca. 4,3% täglich.
- Warum A-Tier? Offizieller Ökosystem-Signalgeber; relevant für Skill-/Plugin-Standards.
- Risiken: Lizenz unklar, viele Issues, Claude-spezifisch; Hermes darf nicht blind auf ein fremdes Plugin-Ökosystem umschwenken.
- Empfehlung: **watch/concept-only**.

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: Local AI / Personal AI / Memory
- Kurzbeschreibung: „Personal AI super intelligence“, privat und lokal positioniert.
- Sterne gesamt: 27.447; Forks: 2.541; offene Issues: 120; erstellt: 2026-02-18; letzter Push: 2026-05-25; Lizenz: GPL-3.0.
- Sterne-Wachstum 24h / 7 Tage: 24h nicht verlässlich extrahiert / +15.194.
- Relative Wachstumsrate: wöchentlich ca. 55,4%.
- Warum A-Tier? Sehr starkes LocalAI-/Memory-Signal; strategisch passend für private Wissenssysteme.
- Risiken: GPL-3.0, breite Claims, hohe Privacy-Oberfläche, direkte Integration ungeeignet.
- Empfehlung: **concept-only**.

### mukul975/Anthropic-Cybersecurity-Skills
- Link: https://github.com/mukul975/Anthropic-Cybersecurity-Skills
- Kategorie: Security Skills / Agent Skills
- Kurzbeschreibung: 754 strukturierte Cybersecurity-Skills, Framework-Mapping u.a. MITRE ATT&CK, NIST.
- Sterne gesamt: 8.665; Forks: 1.080; offene Issues: 16; erstellt: 2026-02-25; letzter Push: 2026-05-13; Lizenz: Apache-2.0.
- Sterne-Wachstum 24h / 7 Tage: +930 / nicht verlässlich extrahiert.
- Relative Wachstumsrate: ca. 10,7% täglich.
- Warum A-Tier? Sehr starkes relatives Tagesmomentum; Security-Skill-Strukturen könnten Hermes-Qualitätssicherung inspirieren.
- Risiken: Security-Automation kann riskant werden; Inhalte nicht qualitätsgeprüft; letzter Push nicht ganz aktuell.
- Empfehlung: **concept-only/watch**, keine operative Security-Automation.

### multica-ai/multica
- Link: https://github.com/multica-ai/multica
- Kategorie: Managed Agents / Agent Orchestration
- Kurzbeschreibung: Plattform, um Coding Agents Aufgaben zuzuweisen, Fortschritt zu tracken und Skills aufzubauen.
- Sterne gesamt: 32.780; Forks: 3.927; offene Issues: 734; erstellt: 2026-01-13; letzter Push: 2026-05-25; Lizenz: NOASSERTION/Other.
- Sterne-Wachstum 24h / 7 Tage: +585 / nicht verlässlich extrahiert.
- Relative Wachstumsrate: ca. 1,8% täglich.
- Warum A-Tier? Strategisch relevant für Swarm-/Agent-Cockpit-Ideen.
- Risiken: Hohe Issue-Zahl, unklare Lizenz, starker Overlap mit Hermes-Orchestrierung/Kanban/Subagents.
- Empfehlung: **watch/concept-only**.

## B-Tier

### rohitg00/agentmemory
- Link: https://github.com/rohitg00/agentmemory
- Kategorie: Agent Memory
- Sterne gesamt: 17.562; 7 Tage: +6.391; relative Woche: ca. 36,4%.
- Begründung: Weiter starkes Memory-Signal, aber frühere Sandbox zeigte Telemetrie-/externen First-Run-/Wildcard-Websocket-/Auto-Capture-Risiken. Entscheidung bleibt **watch**, keine Migration.

### obra/superpowers
- Link: https://github.com/obra/superpowers
- Kategorie: Agentic Skills / Methodology
- Sterne gesamt: 205.490; 7 Tage: +10.171; relative Woche: ca. 4,9%.
- Begründung: Reif und groß, methodisch interessant, aber wegen Größe weniger „rising“. Als Prinzipienquelle nützlich, nicht als Copy-Paste-Integration.

### earendil-works/pi
- Link: https://github.com/earendil-works/pi
- Kategorie: AI Agent Toolkit
- Sterne gesamt: 54.199; 24h: +456; relative Tag: ca. 0,8%.
- Begründung: Breiter Agent-Toolkit-Ansatz, aber vermutlich hoher Overlap mit Hermes und komplexe Integrationsfläche.

### ChromeDevTools/chrome-devtools-mcp
- Link: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Kategorie: MCP / Browser DevTools
- Sterne gesamt: 41.608; 24h: +261; relative Tag: ca. 0,6%.
- Begründung: Offiziell und substanzstark, aber für Hermes bereits Browser-Automation vorhanden; eher später prüfen, wenn konkreter Browser-Debugging-Bedarf besteht.

## C-Tier

- `multica-ai/andrej-karpathy-skills` – sehr hohe absolute Sterne (+2.551 heute), aber 153k Gesamtsterne, keine erkannte Lizenz und eher einzelnes Prompt-/CLAUDE.md-Artefakt; als Prinzipienquelle, nicht als Integration.
- `CloakHQ/CloakBrowser` – Momentum hoch, aber Stealth-/Anti-Bot-/Captcha-Bypass-Positionierung erzeugt Compliance- und Plattform-ToS-Risiko. Bleibt blockiert.
- `Alishahryar1/free-claude-code` – +553 heute, aber Claim „Claude Code kostenlos“ ist credential-/ToS-/Account-Risiko; nicht für Hermes geeignet.
- `D4Vinci/Scrapling` – Web-Scraping-Momentum, aber Browser-/Scraping-Risiken; nur legitim und bedarfsgesteuert prüfen.
- `666ghj/MiroFish` – „predict anything“ klingt nach Hype; Substanz nicht geprüft.

## Early Watchlist

- `can1357/oh-my-pi` – https://github.com/can1357/oh-my-pi  
  Interessant wegen hash-anchored edits, LSP, Tool-Harness und Terminal-Agent-Patterns. A/S-Tier nur, wenn Sandbox zeigt, dass Edit-Sicherheit oder Tool-Design Hermes/Codex konkret verbessert.
- `stablyai/orca` – https://github.com/stablyai/orca  
  Interessant als IDE für parallele Agentenflotten. A/S-Tier nur bei klarem lokalen Datenschutzmodell und Nutzen gegenüber Hermes-Subagents/Kanban.
- `cursor/plugins` – https://github.com/cursor/plugins  
  Kleinere wöchentliche Zahl (+303), aber strategisch relevant als offizieller Plugin-Standard. A-Tier nur, wenn daraus stabile interoperable Skill-/Plugin-Ideen entstehen.
- `supertone-inc/supertonic` – On-device TTS; interessant für LocalAI/Barrierefreiheit, aber heute nicht tief geprüft.
- `HKUDS/CLI-Anything` – starkes Agent-native-CLI-Signal; bleibt Watch, weil breite Plattformclaims und potenzieller Overlap.

## Top 5 Des Tages
1. `Lum1104/Understand-Anything` – bestes neues Sandbox-Signal für Hermes-Codekontext.
2. `colbymchenry/codegraph` – stärkstes Wochenmomentum, aber P2-Risiko bleibt.
3. `Imbad0202/academic-research-skills` – starkes Research-/VdS-Potenzial, Lizenzrisiko.
4. `rohitg00/ai-engineering-from-scratch` – hoher Lern-/Build-Wert, MIT, starkes relatives Wachstum.
5. `tinyhumansai/openhuman` – wichtiges LocalAI-/Memory-Signal, aber nur concept-only.

## Veränderung gegenüber gestern
- Vortagsdatei für 2026-05-24 wurde in diesem Lauf nicht geprüft.
- Gegenüber den bekannten Entscheidungen vom 2026-05-20: `codegraph`, `openhuman`, `academic-research-skills`, `agentmemory`, `CLI-Anything` bleiben relevant; neu besonders auffällig ist `Understand-Anything` als möglicher Vergleichskandidat zu `codegraph`.
- Nachlassendes Momentum: nicht belastbar bewertet, weil keine vollständige historische Zeitreihe vorliegt.

## Hermes-Integrationsentscheidung

### RepoApply + RiskGate Übersicht

#### Understand-Anything – Entscheidung: test-now
- Nutzen für Hermes/Codex/Lernwerkstatt/Agenten: Lokaler Code-Graph könnte Codex-Handoffs, Code-Reviews und Lernwerkstatt-Codeverständnis verbessern.
- Overlap: Starker Overlap mit `codegraph-codebase-map` und bestehendem CodeGraph-P1.
- Wichtigstes Risiko: Installations-/Dependency-Surface; hübscher Graph ohne echten Agentennutzen.
- Kleinster sicherer Sandbox-Test: Public Toy-Repo klonen, keine privaten Repos, keine Tokens, nur lokal; Output und Netzwerkverhalten dokumentieren.
- Graduation: bei Erfolg Cockpit-Aufgabe oder Skill-Vergleichsnotiz; noch kein Memory.
- Codewörter: RepoApply ja; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI ja; ConceptOnly nein.

#### codegraph – Entscheidung: watch / CHRIS_ENTSCHEIDET für P2
- Nutzen: Bereits relevant für lokalen Codekontext, Tokenreduktion, bessere Agent-Handoffs.
- Overlap: Bestehender Skill `codegraph-codebase-map`; P1-Sandbox liegt vor.
- Wichtigstes Risiko: Bekanntes produktives `picomatch` High Audit Warning; P2 nicht freigegeben.
- Kleinster sicherer Sandbox-Test: Falls Chris freigibt, mittelgroßes öffentliches Repo; keine privaten Hermes-/Lernwerkstatt-Repos.
- Graduation: bestehender Skill bleibt; keine weitere Integration ohne P2-Bericht.
- Codewörter: RepoApply teilweise; RiskGate hoch; MemoryCheck nein; Swarm5 nein; LocalAI ja; ConceptOnly nein.

#### academic-research-skills – Entscheidung: concept-only/watch
- Nutzen: VdS-/wissenschaftliche Recherche-Workflows, Review-Schleifen, Quellenarbeit.
- Overlap: Hermes hat Research-Skills, VdS-Kontext und Decision-Inbox; keine direkte Claude-Skill-Übernahme nötig.
- Wichtigstes Risiko: Lizenz NOASSERTION/Other; Qualitäts- und Quellenstandards ungeprüft.
- Kleinster sicherer Sandbox-Test: README-/Strukturreview ohne Installation; 3-5 Prinzipien extrahieren, keine Dateien kopieren.
- Graduation: ggf. Skill-Patch für Research-Workflow, wenn Prinzipien sauber und eigenständig formuliert sind.
- Codewörter: RepoApply nein; RiskGate mittel/hoch; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.

#### ai-engineering-from-scratch – Entscheidung: watch
- Nutzen: Lernpfade und Praxisbeispiele für Startup-/EdTech-/AI-Engineering-Kompetenz.
- Overlap: Ideas/Startup- und Coding-Skills; kein Tooling-Gap.
- Wichtigstes Risiko: Educational Repo kann oberflächlich sein; kein unmittelbarer Systemnutzen.
- Kleinster sicherer Sandbox-Test: Nur Inhaltsreview von 1-2 Modulen, keine Installation nötig.
- Graduation: keine Integration; maximal Leseliste/Runbook, wenn Chris es aktiv lernen will.
- Codewörter: RepoApply nein; RiskGate niedrig; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly teilweise.

#### openhuman – Entscheidung: concept-only
- Nutzen: Ideen für lokale private Memory, Markdown Knowledge, LocalAI und komprimierte Wissensspeicher.
- Overlap: Hermes Memory, Session Search, Skills, Obsidian-Skill.
- Wichtigstes Risiko: GPL-3.0, breite Privacy-Surface, direkte Integration gefährlich.
- Kleinster sicherer Sandbox-Test: Kein Install; nur Architektur-/README-Review mit öffentlichem Material.
- Graduation: höchstens Prinzipiennotiz/Skill-Patch, keine Codeintegration.
- Codewörter: RepoApply nein; RiskGate hoch; MemoryCheck ja; Swarm5 nein; LocalAI ja; ConceptOnly ja.

#### Anthropic-Cybersecurity-Skills – Entscheidung: concept-only/watch
- Nutzen: Strukturvorbild für Sicherheits-Checklisten und Skills.
- Overlap: Hermes Safety-/Reviewer-/Security-Denken, aber kein eigener offensiver Security-Agent gewünscht.
- Wichtigstes Risiko: Security-Automatisierung, ungeprüfte Skillqualität.
- Kleinster sicherer Sandbox-Test: Nur Taxonomie-Review, keine Ausführung.
- Graduation: ggf. kleine Safety-Checklisten-Verbesserung, keine operative Security-Automation.
- Codewörter: RepoApply nein; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.

#### multica – Entscheidung: watch/concept-only
- Nutzen: Agent-Cockpit-/Swarm5-Ideen für Aufgabenvergabe, Fortschritt und Skills.
- Overlap: Hermes-Orchestrator, Kanban, Subagents, Decision Inbox.
- Wichtigstes Risiko: Lizenz unklar, hohe Issue-Zahl, Overengineering.
- Kleinster sicherer Sandbox-Test: Keine Installation; UI/README-Konzeptreview.
- Graduation: evtl. Cockpit-Ideen, aber keine Plattformmigration.
- Codewörter: RepoApply nein; RiskGate hoch; MemoryCheck nein; Swarm5 ja; LocalAI unklar; ConceptOnly ja.

#### CloakBrowser – Entscheidung: block
- Nutzen: Browser-Automation theoretisch, aber nicht legitim genug für Hermes.
- Overlap: Hermes Browser Use/CDP reicht für legitime Tests.
- Wichtigstes Risiko: Stealth/Anti-Bot/Captcha-Bypass und Plattform-ToS.
- Kleinster sicherer Sandbox-Test: keiner.
- Graduation: keine Integration.
- Codewörter: RepoApply nein; RiskGate rot; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly nein.

## Integration Result
- Projects reviewed: 17
- Test-now: `Understand-Anything` als sicherer Public-Toy-Repo-Vergleich gegen CodeGraph.
- Watch: `codegraph`, `agentmemory`, `superpowers`, `pi`, `chrome-devtools-mcp`, `CLI-Anything`, `oh-my-pi`, `orca`.
- Block: `CloakBrowser`, `free-claude-code` für Hermes-Integration.
- Files changed: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-25.md`
- Hermes benefit: Hauptsignal ist lokaler Codekontext für Agents; bestes neues konkretes Signal ist `Understand-Anything`.
- Remaining risks: Trending-Zahlen sind extrahiert, nicht historisch vollständig; keine vollständigen README-/Dependency-Audits; keine Installationen durchgeführt.
- Next action: kleinen Sandbox-Vergleich `Understand-Anything` vs. bestehendes CodeGraph-Vorgehen nur mit öffentlichem Testrepo vorbereiten.

## Quellen
- GitHub Trending daily: https://github.com/trending?since=daily
- GitHub Trending weekly: https://github.com/trending?since=weekly
- GitHub Trending Python daily: https://github.com/trending/python?since=daily
- GitHub Trending TypeScript daily: https://github.com/trending/typescript?since=daily
- GitHub API Repo-Metadaten für die genannten Repositories, abgefragt am 2026-05-25.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Sandbox-Vergleich für `Lum1104/Understand-Anything` mit öffentlichem Toy-Repo vorbereiten; keine Installation in Hermes, keine privaten Repos.
- CHRIS_ENTSCHEIDET: Ob `codegraph` P2 trotz bekanntem `picomatch` High Audit Warning weiter geprüft werden soll.
- BEOBACHTEN: `academic-research-skills`, `openhuman`, `agentmemory`, `oh-my-pi`, `orca`, `chrome-devtools-mcp`.
- SPAETER: `ai-engineering-from-scratch` als Lern-/Startup-Ressource; `superpowers` als Methodikquelle.
- BLOCKIERT: keine echten Blocker; Vortagsvergleich nur eingeschränkt, weil keine vollständige historische Zeitreihe geprüft wurde.
- NICHT_TUN: `CloakBrowser` oder `free-claude-code` in Hermes integrieren; Claude-/Agent-Skill-Repos wholesale kopieren; private Hermes-/Lernwerkstatt-Repos ohne Freigabe indexieren.
- Naechste kleinste Aktion: README-/Installations- und Netzwerk-RiskGate für `Understand-Anything` durchführen, bevor irgendein Sandbox-Run startet.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-25.md`
