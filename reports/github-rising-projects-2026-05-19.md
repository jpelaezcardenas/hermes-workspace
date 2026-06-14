# GitHub Rising Projects Tierlist – 2026-05-19

## Kurzfazit
Heute dominieren wieder AI-Agent-Ökosysteme, Claude-/Codex-Skills, Agent-Memory, lokale Kontextwerkzeuge und einige sehr auffällige Randthemen wie Stealth-Browser, WiFi-Sensing und Finanz-/Research-Agenten. Das stärkste Signal ist nicht „größte Repos“, sondern die Kombination aus sehr hohem 24h-/7d-Momentum und klarer Anschlussfähigkeit an Agenten-Workflows. Gleichzeitig ist das Hype- und Compliance-Risiko hoch: Mehrere Top-Trends sind Skill-Sammlungen, Marketing-Repos oder Tools mit riskanter Zielsetzung.

Datenlage: GitHub Trending und OSSInsight liefern 24h-/7d- bzw. 28d-Trenddaten; Repo-Metadaten wurden über GitHub API geprüft. Relative Wachstumsraten sind Näherungen aus Tages-/Wochensternen relativ zu aktuellen Gesamtsternen.

## S-Tier

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: Local AI / Personal AI / Agent Memory
- Kurzbeschreibung: Lokale persönliche KI-Umgebung mit Privatheitsanspruch.
- Sterne gesamt: 18.711; Forks: 1.642; offene Issues: 220; Lizenz: GPL-3.0; erstellt: 2026-02-18; letzter Push: 2026-05-19
- Sterne-Wachstum 24h / 7 Tage: +3.941 / nicht zuverlässig verfügbar
- Relative Wachstumsrate: ca. 21,1% in 24h – extrem stark
- Warum S-Tier? Sehr starkes relatives Momentum, zentraler Zukunftsbereich „local/private AI“, aktive Pflege, klare Nachfrage nach lokaler persönlicher Wissens- und Agenten-Infrastruktur.
- Mögliche Risiken: GPL-3.0 erschwert direkte Integration; sehr hohe Privacy-Oberfläche; breite Claims; viele Issues; keine Verarbeitung privater Daten im Test.
- Empfehlung: beobachten / concept-only; keine direkte Hermes-Integration.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research-Agent Skills / Claude Code Workflow
- Kurzbeschreibung: Skill-Set für akademische Workflows: research → write → review → revise → finalize.
- Sterne gesamt: 12.891; Forks: 1.263; offene Issues: 10; Lizenz: unklar/NOASSERTION; erstellt: 2026-02-26; letzter Push: 2026-05-19
- Sterne-Wachstum 24h / 7 Tage: +1.439 / +4.402
- Relative Wachstumsrate: ca. 11,2% in 24h; ca. 34,2% in 7d
- Warum S-Tier? Sehr hohe relative Dynamik, direkter Fit zu Recherche-/Schreib-/Review-Workflows, gut anschlussfähig an Hermes-Skills und VdS-/wissenschaftliche Arbeiten.
- Mögliche Risiken: Lizenz unklar; Skill-Sammlungen können oberflächlich oder prompt-lastig sein; Gefahr des ungeprüften Imports fremder Arbeitsweisen.
- Empfehlung: anschauen, aber nur Prinzipien extrahieren; kein Wholesale-Import.

### HKUDS/CLI-Anything
- Link: https://github.com/HKUDS/CLI-Anything
- Kategorie: Agent-native CLI / Tool Hub
- Kurzbeschreibung: Hub, um Software per CLI agentenfähig zu machen.
- Sterne gesamt: 37.062; Forks: 3.576; offene Issues: 65; Lizenz: Apache-2.0; erstellt: 2026-03-08; letzter Push: 2026-05-18
- Sterne-Wachstum 24h / 7 Tage: +1.049 / nicht zuverlässig verfügbar
- Relative Wachstumsrate: ca. 2,8% in 24h
- Warum S-Tier? Sehr klares Meta-Thema für Agenten-Workflows: strukturierte CLI-Oberflächen, Tool-Registries, Agent-native Bedienbarkeit. Apache-2.0 und starke Aktivität sprechen für Substanz.
- Mögliche Risiken: hoher Anspruch („ALL Software“); möglicher Overlap mit Hermes Tools/MCP/Skills; Integrationsnutzen muss praktisch belegt werden.
- Empfehlung: source-check und Konzeptvergleich mit Hermes; ggf. kleiner öffentlicher Sandbox-Test.

## A-Tier

### K-Dense-AI/scientific-agent-skills
- Link: https://github.com/K-Dense-AI/scientific-agent-skills
- Kategorie: Scientific / Research / Agent Skills
- Kurzbeschreibung: Fertige Agent-Skills für Forschung, Wissenschaft, Engineering, Analyse, Finance und Schreiben.
- Sterne gesamt: 24.620; Forks: 2.592; offene Issues: 30; Lizenz: MIT; erstellt: 2025-10-19; letzter Push: 2026-05-19
- Sterne-Wachstum 24h / 7 Tage: +609 / nicht zuverlässig verfügbar
- Relative Wachstumsrate: ca. 2,5% in 24h
- Warum A-Tier? Sehr guter Themenfit für Recherche- und VdS-Arbeit; aktive Pflege; MIT-Lizenz. Nicht S, weil konkrete Qualität der einzelnen Skills erst geprüft werden muss.
- Mögliche Risiken: Skill-Inflation, unklare fachliche Validität, Finance-Anteile dürfen nicht als Beratung/Trading genutzt werden.
- Empfehlung: beobachten/source-check; einzelne Qualitätsprinzipien übernehmen, wenn belegbar.

### tech-leads-club/agent-skills
- Link: https://github.com/tech-leads-club/agent-skills
- Kategorie: Skill Registry / Developer Agent Workflows
- Kurzbeschreibung: Validierte Skill-Registry für professionelle Coding Agents.
- Sterne gesamt: 4.211; Forks: 359; offene Issues: 13; Lizenz: unklar/NOASSERTION; erstellt: 2026-01-19; letzter Push: 2026-04-28
- Sterne-Wachstum 24h / 7 Tage: +1.244 / nicht zuverlässig verfügbar
- Relative Wachstumsrate: ca. 29,5% in 24h – extrem stark
- Warum A-Tier? Kleine/mittlere Größe mit sehr starkem relativem Momentum; Thema passt zu Hermes-Skill-Qualität. Nicht S wegen unklarer Lizenz und zuletzt weniger aktueller Push-Aktivität als andere Top-Projekte.
- Mögliche Risiken: Lizenz, Registry-Vertrauen, ungeprüfte Skills als Supply-Chain-/Prompt-Risiko.
- Empfehlung: source-check; nur als Inspirationsquelle.

### humanlayer/12-factor-agents
- Link: https://github.com/humanlayer/12-factor-agents
- Kategorie: Agent Engineering Principles
- Kurzbeschreibung: Prinzipien für produktionsfähige LLM-Software.
- Sterne gesamt: 20.862; Forks: 1.582; offene Issues: 24; Lizenz: unklar/NOASSERTION; erstellt: 2025-03-30; letzter Push: 2025-09-21
- Sterne-Wachstum 24h / 7 Tage: +399 / nicht zuverlässig verfügbar
- Relative Wachstumsrate: ca. 1,9% in 24h
- Warum A-Tier? Strategisch relevant: robuste Agenten-Architektur, Mensch-in-der-Schleife, strukturierte Workflows. Nicht S wegen schwacher aktueller Repo-Aktivität.
- Mögliche Risiken: eher Prinzipien als Tool; Lizenz unklar; praktische Übernahme braucht Mapping auf Hermes.
- Empfehlung: concept-only; mit bestehenden Hermes-Orchestrierungsregeln vergleichen.

### millionco/react-doctor
- Link: https://github.com/millionco/react-doctor
- Kategorie: React Quality / AI Code Review
- Kurzbeschreibung: Erkennt schlechte React-Code-Muster, besonders aus AI-Agent-Code.
- Sterne gesamt: 10.238; Forks: 328; offene Issues: 34; Lizenz: MIT; erstellt: 2026-02-13; letzter Push: 2026-05-19
- Sterne-Wachstum 24h / 7 Tage: nicht zuverlässig verfügbar / +2.453
- Relative Wachstumsrate: ca. 24,0% in 7d
- Warum A-Tier? Sehr konkreter Nutzen für Lernwerkstatt-/React-Projekte und AI-Code-Qualität; bereits als Test-now-Kandidat vorgemerkt. Nicht S, weil praktische Trefferquote/False Positives noch sandbox-geprüft werden müssen.
- Mögliche Risiken: Tool könnte Framework-spezifisch, noisig oder unausgereift sein.
- Empfehlung: test-now im Sandbox-/Throwaway-React-Projekt, keine Produktivänderungen.

## B-Tier

### microsoft/ai-agents-for-beginners
- Link: https://github.com/microsoft/ai-agents-for-beginners
- Kategorie: Education / AI Agents
- Kurzbeschreibung: 12 Lektionen zum Einstieg in AI Agents.
- Sterne gesamt: 63.749; Forks: 21.211; Issues: 8; Lizenz: MIT; Wachstum: +1.012/24h
- Einschätzung: Starkes absolutes Signal und reif, aber als Lernressource weniger „rising early“. Für Hermes eher Referenzmaterial als Integration.

### rohitg00/agentmemory
- Link: https://github.com/rohitg00/agentmemory
- Kategorie: Agent Memory
- Kurzbeschreibung: Persistent Memory für Coding Agents.
- Sterne gesamt: 13.346; Forks: 1.126; Issues: 138; Lizenz: Apache-2.0; 7d: +7.830
- Einschätzung: Sehr starkes Momentum, aber frühere Hermes-Prüfung zeigte Telemetrie-/Binding-/Auto-Capture-Risiken. Bleibt Watch, keine Produktion.

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Code Context / Knowledge Graph
- Kurzbeschreibung: Lokaler Code-Knowledge-Graph für Claude Code, Codex, Cursor, OpenCode.
- Sterne gesamt: 5.455; Forks: 375; Issues: 55; Lizenz: MIT; 7d: +2.690
- Einschätzung: Sehr guter relativer 7d-Trend; P1-Sandbox war positiv, P2 nicht freigegeben wegen Audit-Warnung und fehlendem mittleren Nutzenbeleg.

### supertone-inc/supertonic
- Link: https://github.com/supertone-inc/supertonic
- Kategorie: Local TTS / ONNX
- Kurzbeschreibung: Schnelle, on-device, mehrsprachige TTS.
- Sterne gesamt: 8.533; Forks: 867; Issues: 84; Lizenz: MIT; Wachstum: +715/24h
- Einschätzung: Interessant für lokale Audio-/TTS-Pipelines. Für Hermes aktuell niedriger priorisiert, weil TTS bereits vorhanden ist.

### anthropics/financial-services
- Link: https://github.com/anthropics/financial-services
- Kategorie: Finance AI Templates
- Kurzbeschreibung: Anthropic-Repo für Financial-Services-Use-Cases.
- Sterne gesamt: 25.628; Forks: 3.551; Issues: 145; Lizenz: Apache-2.0; 7d: +5.259
- Einschätzung: Starkes Signal und vertrauenswürdiger Maintainer, aber für Chris nur Analyse-/Lernmaterial. Keine Anlageentscheidung, kein Trading.

## C-Tier

### CloakHQ/CloakBrowser
- Link: https://github.com/CloakHQ/CloakBrowser
- Begründung: Technisch auffällig und starkes Wachstum (+1.420/24h, +9.124/7d), aber Stealth-/Bot-Detection-Bypass ist für Hermes rechtlich, ethisch und ToS-seitig zu riskant. Trotz MIT und Aktivität: direkte Integration bleibt blockiert.

### ruvnet/RuView
- Link: https://github.com/ruvnet/RuView
- Begründung: Sehr starkes absolutes Signal und spannendes WiFi-Sensing-Thema, aber für Chris' aktuelle Hermes-/Schul-/VdS-Kontexte kaum direkt nutzbar und hardware-/privacy-sensibel. Beobachten, nicht integrieren.

### yikart/AiToEarn
- Link: https://github.com/yikart/AiToEarn
- Begründung: Monetarisierungs-/AI-Earning-Signal kann kurzfristig stark sein, aber hohes Hype-Risiko und geringe strategische Verlässlichkeit. Nicht als Geschäfts- oder Produktstrategie verwenden.

## Early Watchlist

- tech-leads-club/agent-skills – https://github.com/tech-leads-club/agent-skills  
  Warum interessant: Kleine/mittlere Repo-Größe mit extremem 24h-Momentum; relevant für Skill-Qualität.  
  A/S-Bedingung: klare Lizenz, aktive Maintainer, nachvollziehbare Validierung der Skills.

- millionco/react-doctor – https://github.com/millionco/react-doctor  
  Warum interessant: Konkretes Problem bei AI-generiertem React-Code.  
  A/S-Bedingung: Sandbox zeigt echte Treffer bei niedrigen False Positives und einfache Integration in Review-Workflow.

- colbymchenry/codegraph – https://github.com/colbymchenry/codegraph  
  Warum interessant: Lokaler Codekontext kann Tokenkosten und Handoff-Qualität verbessern.  
  A/S-Bedingung: Audit-Risiko geklärt und Nutzen an mittlerem öffentlichen Repo belegt.

- supertone-inc/supertonic – https://github.com/supertone-inc/supertonic  
  Warum interessant: Lokale TTS passt zu privacy-first Audioideen.  
  A/S-Bedingung: gute deutsche Qualität, einfache lokale Installation, klare Runtime-Lizenzen/Modelle.

## Top 5 Des Tages
1. tinyhumansai/openhuman – stärkstes relatives Momentum im Local-AI-/Personal-AI-Bereich, aber nur concept-only.
2. Imbad0202/academic-research-skills – sehr starkes Research-Skill-Signal, Lizenz prüfen.
3. HKUDS/CLI-Anything – strategisch wichtig für agent-native CLI-Ideen.
4. millionco/react-doctor – praktischster Hermes-/Lernwerkstatt-naher Testkandidat.
5. colbymchenry/codegraph – weiterhin relevanter lokaler Code-Kontext-Kandidat, aber P2 gebremst.

## Veränderung gegenüber gestern
Kein lokaler Vortagsreport wurde unter `/Users/zondrius` gefunden; daher keine belastbare Delta-Analyse aus eigener Historie. Wiederkehrende Projekte aus den Skills/letzten Integrationsentscheidungen: openhuman, agentmemory, codegraph, react-doctor, CloakBrowser, mattpocock/skills. Neue/auffälligere Tagesaufsteiger laut heutiger Datenlage: academic-research-skills, CLI-Anything, tech-leads-club/agent-skills, supertonic.

## Hermes-Integrationsentscheidung

### RepoApply / RiskGate – tinyhumansai/openhuman
- Entscheidung: concept-only
- Nutzen für Hermes: Ideen zu LocalAI, privater Wissensbasis, komprimiertem Memory, lokaler persönlicher Assistenz.
- Überschneidung: Hermes Memory, Session Search, Skills, Obsidian-/lokale Workflows.
- Wichtigstes Risiko: GPL-3.0, Privacy-Oberfläche, frühe Beta, mögliche private Datenaufnahme.
- Kleinster sicherer Sandbox-Test: nicht jetzt; höchstens README-/Architektur-Notizen mit öffentlichen Beispielen.
- Graduation: keine Integration; ggf. MemoryCheck-Prinzipien in bestehende Datenschutz-/Memory-Regeln einarbeiten.

### RepoApply / RiskGate – Imbad0202/academic-research-skills
- Entscheidung: watch / concept-only
- Nutzen für Hermes: Verbesserung von Recherche-, Schreib-, Review- und Quellenprüfungs-Skills für VdS und wissenschaftliche Arbeit.
- Überschneidung: research-Skills, VdS-Agent, Schreib-Agent, Reviewer-Agent.
- Wichtigstes Risiko: Lizenz unklar; Qualitäts- und Quellenstandards müssen geprüft werden.
- Kleinster sicherer Sandbox-Test: README und 2–3 Beispielskills statisch prüfen; keine Installation, keine privaten Dokumente.
- Graduation: möglich als Skill-Verbesserung, wenn konkrete Prüfschritte besser sind als bestehende Hermes-Skills.

### RepoApply / RiskGate – HKUDS/CLI-Anything
- Entscheidung: watch / kleiner source-check sinnvoll
- Nutzen für Hermes: Agent-native CLI-Ideen, Tool-Discovery, strukturierte Aufrufe, mögliche Inspiration für Runbooks.
- Überschneidung: Hermes Tools, MCP, Skills, Gateway, Terminal-Wrappers.
- Wichtigstes Risiko: Overengineering und unklare tatsächliche Integrationsqualität.
- Kleinster sicherer Sandbox-Test: Source-/README-Check, dann nur mit öffentlichem Dummy-CLI in disposable dir.
- Graduation: Runbook oder ConceptOnly-Notiz, nicht sofort produktiv.

### RepoApply / RiskGate – K-Dense-AI/scientific-agent-skills
- Entscheidung: concept-only / watch
- Nutzen für Hermes: Qualitätsmuster für Research-, Analyse- und Schreibskills.
- Überschneidung: research, vds-ge-monitor, github-rising-integration, vorhandene Review-Skills.
- Wichtigstes Risiko: fachliche Scheingenauigkeit; Finance-Anteile nicht als Beratung verwenden.
- Kleinster sicherer Sandbox-Test: statische Prüfung einzelner Skills auf Quellenpflicht, Unsicherheitsmarkierung und Review-Schleifen.
- Graduation: Skill-Patch, falls klare bessere Standards gefunden werden.

### RepoApply / RiskGate – tech-leads-club/agent-skills
- Entscheidung: watch
- Nutzen für Hermes: Skill-Registry-Standards, Validierungsideen, mögliche Qualitätskriterien.
- Überschneidung: Hermes Skill-System, spec-driven-goal-routing, kanban-orchestrator.
- Wichtigstes Risiko: Lizenz unklar; Supply-Chain-/Prompt-Trust-Risiko.
- Kleinster sicherer Sandbox-Test: nur statische README-/License-Prüfung.
- Graduation: keine direkte Integration; ggf. MemoryCheck/Skill-Checklist-Prinzipien.

### RepoApply / RiskGate – millionco/react-doctor
- Entscheidung: test-now
- Nutzen für Hermes/Codex/Lernwerkstatt: konkreter Reviewer für React-Code, potenziell nützlich gegen AI-generierte Fehler in Lernwerkstatt- oder Web-App-Projekten.
- Überschneidung: bestehende Tests, ESLint, TypeScript, Coder-/Reviewer-Agent.
- Wichtigstes Risiko: False Positives, unreife Regeln, unnötige Tool-Komplexität.
- Kleinster sicherer Sandbox-Test: disposable React-Beispiel oder öffentliches Mini-Repo; keine Produktivänderung, kein Push.
- Graduation: Coder/Reviewer-Quality-Check-Skill, falls Nutzen belegt.

### RepoApply / RiskGate – colbymchenry/codegraph
- Entscheidung: watch; P2 weiterhin nicht freigegeben
- Nutzen für Hermes/Codex: LocalAI-Codekontext, bessere Handoffs, weniger Token/Toolcalls.
- Überschneidung: search_files, ripgrep, codebase-inspection, Codex-Handoffs.
- Wichtigstes Risiko: produktive picomatch High audit warning; noch kein mittelgroßer Nutzenbeleg.
- Kleinster sicherer Sandbox-Test: erst Audit-/Dependency-Klärung; kein Indexieren privater Repos.
- Graduation: später evtl. Runbook/Skill, jetzt nicht.

### RepoApply / RiskGate – CloakHQ/CloakBrowser
- Entscheidung: block
- Nutzen für Hermes: theoretisch Browser Automation; praktisch nicht nötig.
- Überschneidung: vorhandene Browser-/Computer-Use-Tools.
- Wichtigstes Risiko: Anti-Bot-/Stealth-/Captcha-Bypass, Plattform-ToS und Compliance.
- Kleinster sicherer Sandbox-Test: keiner empfohlen.
- Graduation: keine Integration; RiskGate bleibt block.

## Quellen
- GitHub Trending daily: https://github.com/trending?since=daily
- GitHub Trending weekly: https://github.com/trending?since=weekly
- OSSInsight Trending: https://ossinsight.io/trending
- OSSInsight AI Trending: https://ossinsight.io/trending/ai
- GitHub API Repo-Metadaten für die genannten Repositories, abgerufen am 2026-05-19.

## Integration Result
- Projects reviewed: tinyhumansai/openhuman; Imbad0202/academic-research-skills; HKUDS/CLI-Anything; K-Dense-AI/scientific-agent-skills; tech-leads-club/agent-skills; humanlayer/12-factor-agents; millionco/react-doctor; microsoft/ai-agents-for-beginners; rohitg00/agentmemory; colbymchenry/codegraph; supertone-inc/supertonic; anthropics/financial-services; CloakHQ/CloakBrowser; ruvnet/RuView; yikart/AiToEarn.
- Test-now: millionco/react-doctor, aber nur Sandbox.
- Watch: HKUDS/CLI-Anything; academic-research-skills; scientific-agent-skills; tech-leads-club/agent-skills; codegraph; agentmemory.
- Block: CloakHQ/CloakBrowser direkte Integration.
- Files changed: /Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-19.md
- Hermes benefit: Bessere Priorisierung von Agent-/Skill-/Codequalitätstrends ohne Hype-Installation.
- Remaining risks: Trenddaten sind nicht vollständig konsistent; manche Lizenzen unklar; 24h-/7d-Werte teils nur aus aggregierten Trending-Quellen.
- Next action: React Doctor in einem Wegwerf-React-Projekt minimal testen, nur wenn Chris Sandbox-Test freigibt.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Freigabe, ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll.
- BEOBACHTEN: `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`.
- SPAETER: `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nächster Hermes-Orchestrierungsüberarbeitung mappen.
- BLOCKIERT: keine echten Blocker; Vortagsvergleich mangels lokal auffindbarem Report nicht geprüft.
- NICHT_TUN: `CloakBrowser` nicht in Hermes integrieren; keine Skill-Repos wholesale kopieren; keine Trading-/Finance-Agenten produktiv oder mit Echtgeld verbinden.
- Naechste kleinste Aktion: Entscheidung von Chris zur React-Doctor-Sandbox abwarten.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-19.md
