# GitHub Rising Projects Tierlist – 2026-05-21

## Kurzfazit
Heute bleibt das Signal sehr einseitig: **Agent-Skills, Coding-Agent-Kontext, LocalAI/Personal-AI und agent-native Developer-Tools** dominieren. Die stärksten relativen Wachstumsraten kommen weiterhin aus Skill-/Workflow-Repos und LocalAI-Projekten. Praktisch relevant für Chris ist weniger die direkte Installation, sondern das Herausziehen robuster Prinzipien: bessere Skills, sichere Repo-Kontextsuche, Research-Workflows und Qualitäts-Gates. 

Datenlage: GitHub Trending daily/weekly, OSSInsight AI Trending und GitHub REST API wurden geprüft. GitHub Trending liefert 24h-/7d-Signale, aber keine vollständige Zeitreihe. Relative Wachstumsraten sind Näherungen aus neuen Sternen im Verhältnis zu aktuellen Sternen. Launch-Ursachen außerhalb GitHub wurden heute **nicht belastbar verifiziert**.

## S-Tier

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Code Context / Knowledge Graph / Coding-Agent-Infrastruktur
- Kurzbeschreibung: Lokaler, vorindizierter Code-Knowledge-Graph für Claude Code, Codex, Cursor und OpenCode; Ziel: weniger Token, weniger Tool Calls, 100% lokal.
- Sterne gesamt: 11.081; Forks: 672; offene Issues: 82; Lizenz: MIT; erstellt: 2026-01-18; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: +2.123 / +6.731 laut GitHub Trending
- Relative Wachstumsrate: ca. 19,2% in 24h; ca. 60,7% in 7d – extrem stark
- Warum S-Tier? Heute das beste Verhältnis aus Momentum, konkretem Nutzen und Hermes-Fit. Codekontext, Impact-Analyse und Tokenreduktion sind direkt relevant für Codex-/Hermes-Handoffs.
- Mögliche Risiken: P2 noch nicht freigegeben; früherer P1-Kontext nennt produktive `picomatch` High-Audit-Warnung und noch fehlenden Nutzenbeleg an mittelgroßem öffentlichem Repo.
- Empfehlung: beobachten / nur nach Chris-Entscheid P2 testen; keine globale Installation, keine privaten Repos.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research-Agent Skills / Schreib- und Review-Workflow
- Kurzbeschreibung: Claude-Code-Skills für akademische Workflows: research → write → review → revise → finalize.
- Sterne gesamt: 17.116; Forks: 1.492; offene Issues: 11; Lizenz: NOASSERTION/unklar; erstellt: 2026-02-26; letzter Push: 2026-05-21
- Sterne-Wachstum 24h / 7 Tage: 24h nicht zuverlässig extrahiert; +8.737/Woche laut GitHub Trending Weekly
- Relative Wachstumsrate: ca. 51,0% in 7d – sehr stark
- Warum S-Tier? Sehr guter Fit zu VdS-/Recherche-/Schreib- und Review-Arbeit. Kleine Issue-Zahl und aktueller Push sprechen für Aktivität; das Skill-Format passt zu Hermes.
- Mögliche Risiken: Lizenz unklar; fremde Skills können Quellen-, Qualitäts- und Prompt-Risiken enthalten. Kein Wholesale-Import.
- Empfehlung: source-check / concept-only; nur konkrete Prinzipien übernehmen, falls besser als bestehende Hermes-Research-Regeln.

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: LocalAI / Personal AI / Memory
- Kurzbeschreibung: Private persönliche KI-Umgebung mit lokalem/privatem Anspruch.
- Sterne gesamt: 24.140; Forks: 2.171; offene Issues: 168; Lizenz: GPL-3.0; erstellt: 2026-02-18; letzter Push: 2026-05-21
- Sterne-Wachstum 24h / 7 Tage: +3.394 / +19.177 laut GitHub Trending
- Relative Wachstumsrate: ca. 14,1% in 24h; ca. 79,4% in 7d – extrem stark
- Warum S-Tier? Stärkstes LocalAI-/Personal-AI-Signal und strategisch nah an Memory, Obsidian-artigem Wissen, LocalAI und privaten Agenten-Workflows.
- Mögliche Risiken: GPL-3.0, hohe Datenschutzoberfläche, breite Produktclaims, viele Issues. Nicht mit privaten Daten testen.
- Empfehlung: concept-only / beobachten; keine direkte Hermes-Integration.

## A-Tier

### rohitg00/agentmemory
- Link: https://github.com/rohitg00/agentmemory
- Kategorie: Agent Memory / Coding Agents
- Kurzbeschreibung: Persistente Memory-Schicht für AI-Coding-Agents mit Benchmark-Anspruch.
- Sterne gesamt: 15.406; Forks: 1.274; offene Issues: 145; Lizenz: Apache-2.0; erstellt: 2026-02-25; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: 24h nicht neu zuverlässig; +7.976/Woche laut GitHub Trending Weekly
- Relative Wachstumsrate: ca. 51,8% in 7d
- Warum A-Tier? Thema ist zentral für Hermes. Nicht S für Integration, weil frühere Sandbox-Hinweise Telemetrie, externe Erstverbindung, Wildcard-Websocket-Binding und Auto-Capture-Risiko gezeigt haben.
- Mögliche Risiken: Datenschutz, unbeabsichtigte Speicherung, Netzwerkoberfläche.
- Empfehlung: watch; keine Produktion, keine Memory-Migration.

### HKUDS/CLI-Anything
- Link: https://github.com/HKUDS/CLI-Anything
- Kategorie: Agent-native CLI / Developer Tools
- Kurzbeschreibung: CLI-Hub, um Software agentenfähig über CLI-Strukturen bedienbar zu machen.
- Sterne gesamt: 38.751; Forks: 3.688; offene Issues: 56; Lizenz: Apache-2.0; erstellt: 2026-03-08; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: +890 / 7d nicht zuverlässig vollständig verfügbar
- Relative Wachstumsrate: ca. 2,3% in 24h
- Warum A-Tier? Strategisch relevant für Tool-Kapselung, Runbooks, agentenlesbare Schnittstellen und sichere Automatisierung.
- Mögliche Risiken: Overlap mit Hermes Tools, MCP, Gateway und Skills; Claim „ALL Software“ wirkt überbreit.
- Empfehlung: watch/source-check; höchstens Dummy-CLI-Sandbox mit öffentlichen Daten.

### millionco/react-doctor
- Link: https://github.com/millionco/react-doctor
- Kategorie: React Quality / AI-Code-Review
- Kurzbeschreibung: Erkennt schlechte React-Code-Muster, besonders bei AI-generiertem Code.
- Sterne gesamt: 10.518; Forks: 338; offene Issues: 8; Lizenz: MIT; erstellt: 2026-02-13; letzter Push: 2026-05-21
- Sterne-Wachstum 24h / 7 Tage: 24h nicht zuverlässig sichtbar; in Weekly Trending weiter als stark wachsend geführt
- Relative Wachstumsrate: nicht belastbar berechnet
- Warum A-Tier? Praktischster schon getesteter Kandidat für Lernwerkstatt-/React-Qualität. P1 Sandbox war bestanden; P2 Review Skill ist vorbereitet.
- Mögliche Risiken: False Positives, zu enger React-Fokus, keine produktiven Scans ohne Chris-Freigabe.
- Empfehlung: test-now nur als offline/read-only Quality Gate, wenn ein konkretes React-Projekt freigegeben wird.

### mattpocock/skills
- Link: https://github.com/mattpocock/skills
- Kategorie: Developer Skills / Claude Workflows
- Kurzbeschreibung: „Skills for Real Engineers“, direkt aus einer `.claude`-Arbeitsumgebung.
- Sterne gesamt: 97.657; Forks: 8.637; offene Issues: 32; Lizenz: MIT; erstellt: 2026-02-03; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: 24h nicht zuverlässig; +18.368/Woche laut GitHub Trending Weekly
- Relative Wachstumsrate: ca. 18,8% in 7d
- Warum A-Tier? Weiter starkes Signal für Skills als Arbeitsform. Für Hermes bereits am 2026-05-16 als Prinzipienquelle integriert.
- Mögliche Risiken: Overlap, Hype um Skill-Sammlungen, Gefahr des unkritischen Kopierens.
- Empfehlung: beobachten; keine neue Aktion.

## B-Tier

### obra/superpowers
- Link: https://github.com/obra/superpowers
- Kategorie: Agentic Skills / Software-Methodik
- Sterne gesamt: 200.642; Wachstum: +10.851/Woche
- Einschätzung: Sehr groß, weiter sichtbar, aber relativ weniger „rising“ als kleinere Kandidaten. Wertvoll als Methodik-Inspiration, nicht als Import.

### can1357/oh-my-pi
- Link: https://github.com/can1357/oh-my-pi
- Kategorie: Terminal Coding Agent
- Sterne gesamt: 5.594; Forks: 463; Issues: 176; Lizenz: MIT; letzter Push: 2026-05-21
- Einschätzung: Frühes, technisch interessantes Terminal-Agent-Signal mit LSP, browser, subagents und hash-anchored edits. Für Hermes aber hoher Overlap mit Codex/Hermes-Tools; erst beobachten.

### facebook/pyrefly
- Link: https://github.com/facebook/pyrefly
- Kategorie: Python Type Checker / LSP
- Sterne gesamt: 6.359; Forks: 375; Issues: 579; Lizenz: MIT; letzter Push: 2026-05-21
- Einschätzung: Substanziell und Maintainer-stark, aber heute kein klarer Hermes-Schmerzpunkt. Später als Python-Quality-Gate prüfen.

### zakirullin/files.md
- Link: https://github.com/zakirullin/files.md
- Kategorie: Markdown Knowledge / Local Notes
- Sterne gesamt: 2.357; Forks: 54; Issues: 8; Lizenz: MIT; letzter Push: 2026-05-21
- Einschätzung: Interessant für private Markdown-Wissensräume und Local-First-Denken; aber eher Produkt/App als Hermes-Integration.

## C-Tier

### CloakHQ/CloakBrowser
- Link: https://github.com/CloakHQ/CloakBrowser
- Begründung: Sehr starkes Momentum (+8.348/Woche), aber Stealth-/Bot-Detection-Bypass und Fingerprint-Patching sind für Hermes rechtlich/ethisch/ToS-seitig zu riskant. Bleibt blockiert.

### multica-ai/andrej-karpathy-skills
- Link: https://github.com/multica-ai/andrej-karpathy-skills
- Begründung: +2.679/24h und sehr hohe Gesamtsterne, aber nur ein `CLAUDE.md`-Ansatz, Lizenz nicht erkennbar und letzter Push 2026-04-20. Als Methodik-Idee okay, als Projekt überbewertet.

### ruvnet/RuView
- Link: https://github.com/ruvnet/RuView
- Begründung: Starkes Wochenmomentum (+8.028), technisch auffällig, aber hardware-/privacy-sensibel und für Hermes/Schule/VdS nicht direkt passend.

### HKUDS/ViMax
- Link: https://github.com/HKUDS/ViMax
- Begründung: Agentic Video Generation ist marktseitig relevant, aber letzter Push laut API 2026-03-29; unklarer direkter Nutzen für Chris' Kernsystem.

### rmyndharis/OpenWA
- Link: https://github.com/rmyndharis/OpenWA
- Begründung: WhatsApp-Gateway ist potenziell nützlich, aber stark ToS-/Datenschutz-/Account-Risiko. Keine Hermes-Integration ohne ausdrückliche Freigabe.

## Early Watchlist
- can1357/oh-my-pi – https://github.com/can1357/oh-my-pi  
  Warum interessant: Terminal-Agent mit technischen Konzepten wie hash-anchored edits und LSP-Unterstützung.  
  A/S-Bedingung: klare Vorteile gegenüber Hermes/Codex, sichere lokale Sandbox, keine private Repo-Nutzung.

- zakirullin/files.md – https://github.com/zakirullin/files.md  
  Warum interessant: Ruhiger Markdown-Workspace passt konzeptionell zu LocalAI/MemoryCheck.  
  A/S-Bedingung: überzeugende lokale Datenhaltung, Exportierbarkeit, Nutzen über Obsidian/Hermes-Notizen hinaus.

- facebook/pyrefly – https://github.com/facebook/pyrefly  
  Warum interessant: Schneller Rust-basierter Python-Typechecker von Meta.  
  A/S-Bedingung: konkrete Vorteile in einem Hermes-/Python-Projekt gegenüber bestehenden Checks.

- millionco/react-doctor – https://github.com/millionco/react-doctor  
  Warum interessant: Bereits erfolgreich als guarded review skill vorbereitet.  
  A/S-Bedingung: produktnaher, aber freigegebener Read-only-Scan zeigt niedrige False-Positive-Rate.

## Top 5 Des Tages
1. colbymchenry/codegraph – bestes Verhältnis aus Momentum, konkretem Coding-Agent-Nutzen und Local-First-Ansatz.
2. Imbad0202/academic-research-skills – sehr starkes Research-/VdS-/Schreibworkflow-Signal, aber Lizenz unklar.
3. tinyhumansai/openhuman – stärkstes LocalAI-/Personal-AI-Signal, aber nur ConceptOnly wegen GPL/privacy.
4. rohitg00/agentmemory – wichtiges Memory-Signal, aber Datenschutz-/Netzwerkrisiken bleiben.
5. millionco/react-doctor – praktischster qualitätsnaher Kandidat für Lernwerkstatt-/React-Arbeit, bereits sicher eingegrenzt.

## Veränderung gegenüber gestern
- Neue Aufsteiger: codegraph ist heute wieder ganz oben im Daily Trending und rückt in der analytischen Priorität nach vorn.
- Wiederkehrende Projekte: openhuman, academic-research-skills, CLI-Anything, agentmemory, react-doctor, superpowers, mattpocock/skills, CloakBrowser.
- Absteiger/niedriger priorisiert: HKUDS/CLI-Anything bleibt interessant, aber ohne neue konkrete Prüfergebnisse eher A statt S; CloakBrowser bleibt trotz Momentum blockiert.
- Nachlassendes/unklares Momentum: react-doctor bleibt nützlich, aber heutige 24h-Zahlen waren nicht zuverlässig sichtbar; Bewertung stützt sich auf Vortags-Sandbox und Weekly-Signal.

## Hermes-Integrationsentscheidung

### RepoApply / RiskGate – colbymchenry/codegraph
- Entscheidung: watch / CHRIS_ENTSCHEIDET vor P2
- Nutzen für Hermes: lokaler Codekontext für Codex, bessere Handoffs, weniger Token, potenziell schnellere Impact-Analyse.
- Überschneidung: Hermes search_files, Codebase-Inspection-Skill, Codex-Handoffs, bestehende lokale Tools.
- Wichtigstes Risiko: bekannte P1-Bremse durch produktive `picomatch` High Audit Warning und fehlender mittelgroßer Nutzenbeleg.
- Kleinster sicherer Sandbox-Test: P2 nur an öffentlichem mittelgroßem Repo in disposable dir, keine privaten Hermes-/Lernwerkstatt-Repos, kein globaler Installer.
- Graduation: Cockpit-Aufgabe oder Runbook, erst nach P2; kein MemoryCheck nötig.

### RepoApply / RiskGate – Imbad0202/academic-research-skills
- Entscheidung: concept-only / watch
- Nutzen für Hermes: bessere Recherche-, Review- und Schreibschleifen für VdS, wissenschaftliche Texte und Quellenprüfung; Swarm5-Prinzipien denkbar.
- Überschneidung: bestehende Research-, VdS-, Schreib- und Reviewer-Regeln.
- Wichtigstes Risiko: Lizenz unklar; Qualität einzelner Skills nicht geprüft.
- Kleinster sicherer Sandbox-Test: statische Prüfung von README und 2–3 Beispielskills; keine Installation, keine privaten Dokumente.
- Graduation: möglicher Skill-Patch, wenn konkrete Prüfschritte klar besser sind.

### RepoApply / RiskGate – tinyhumansai/openhuman
- Entscheidung: concept-only
- Nutzen für Hermes: LocalAI-, MemoryCheck-, Markdown-Wissens- und private Agenten-Ideen.
- Überschneidung: Hermes Memory, Session Search, Skills, Obsidian, lokale Recherche.
- Wichtigstes Risiko: GPL-3.0 und hohe Privacy-Oberfläche.
- Kleinster sicherer Sandbox-Test: heute keiner; nur Architektur-/README-Vergleich mit öffentlichen Beispielen.
- Graduation: keine Integration; höchstens ConceptOnly-Notiz.

### RepoApply / RiskGate – rohitg00/agentmemory
- Entscheidung: watch
- Nutzen für Hermes: Memory-Architekturideen und Benchmark-Fragen.
- Überschneidung: Hermes Memory, Session Search, Memory-Curator.
- Wichtigstes Risiko: automatische Memory-Erfassung, externe Erstverbindung, Telemetrie-/Binding-Risiken aus früherem Test.
- Kleinster sicherer Sandbox-Test: keiner heute; nur Architekturvergleich.
- Graduation: keine; nur MemoryCheck-Risikoliste.

### RepoApply / RiskGate – HKUDS/CLI-Anything
- Entscheidung: watch / source-check später
- Nutzen für Hermes: agent-native CLI-Kapselung und Runbook-Ideen.
- Überschneidung: Hermes Tools, MCP, Gateway, Terminal-Wrapper, Skills.
- Wichtigstes Risiko: Overengineering und Ersatz vorhandener Funktionen ohne Qualitätsgewinn.
- Kleinster sicherer Sandbox-Test: öffentlicher Dummy-CLI in disposable dir, keine Secrets.
- Graduation: Runbook oder ConceptOnly, nicht direkte Integration.

### RepoApply / RiskGate – millionco/react-doctor
- Entscheidung: test-now nur guarded/read-only und nur mit freigegebenem Projekt
- Nutzen für Hermes/Lernwerkstatt: React-Qualitäts-Gate für AI-generierten Code.
- Überschneidung: bestehender Skill `/Users/zondrius/.hermes/skills/software-development/react-doctor-quality-gate/SKILL.md`, Reviewer-/Coder-Flows.
- Wichtigstes Risiko: False Positives oder ungeprüfte produktive Scans.
- Kleinster sicherer Sandbox-Test: bestehende Sandbox weiter nutzen oder ein ausdrücklich freigegebenes React-Projekt read-only scannen; kein install, kein Token, kein Auto-Fix.
- Graduation: bereits als guarded Review Skill vorbereitet; weitere Nutzung nur nach Chris-Freigabe.

## Integration Result
- Projects reviewed: codegraph, openhuman, academic-research-skills, agentmemory, CLI-Anything, react-doctor, mattpocock/skills, superpowers, oh-my-pi, pyrefly, files.md, CloakBrowser, andrej-karpathy-skills, RuView, ViMax, OpenWA
- Test-now: react-doctor nur guarded/read-only bei freigegebenem React-Projekt; codegraph P2 nur nach Chris-Entscheid
- Watch: agentmemory, CLI-Anything, oh-my-pi, pyrefly, files.md, superpowers, mattpocock/skills
- Block: CloakBrowser; OpenWA ohne ausdrückliche Freigabe wegen ToS-/Datenschutzrisiko
- Files changed: `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-21.md`
- Hermes benefit: klarer Fokus auf lokale Codekontextsuche, Research-Skill-Qualität, MemoryCheck-Grenzen und React-Qualitäts-Gates
- Remaining risks: Trending-Daten sind keine vollständige Zeitreihe; Launch-Ursachen nicht verifiziert; mehrere Skill-Repos haben Lizenz-/Qualitätsfragen
- Next action: kein automatischer Install; kleinste sichere Aktion wäre ein statischer Source-Check von `academic-research-skills` oder Chris-Entscheid zu codegraph P2

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: statischer Source-Check von `Imbad0202/academic-research-skills` README und 2–3 Beispielskills, ohne Installation und ohne private Daten
- CHRIS_ENTSCHEIDET: ob `colbymchenry/codegraph` P2 an einem öffentlichen mittelgroßen Repo trotz früherer `picomatch`-Warnung getestet werden soll; ob `react-doctor` read-only auf einem konkreten freigegebenen React-Projekt laufen darf
- BEOBACHTEN: `tinyhumansai/openhuman` als LocalAI/MemoryCheck-ConceptOnly; `rohitg00/agentmemory` nur als Memory-Risiko-/Architekturvergleich; `can1357/oh-my-pi` als Terminal-Agent-Signal
- SPAETER: `facebook/pyrefly` als möglicher Python-Quality-Gate-Vergleich; `zakirullin/files.md` als Markdown-/Local-First-Idee
- BLOCKIERT: keine echten Blocker; vollständige 24h-Zeitreihen und externe Launch-Ursachen nicht geprueft
- NICHT_TUN: `CloakHQ/CloakBrowser` integrieren; WhatsApp-Gateway/OpenWA ohne ausdrückliche Freigabe anbinden; fremde Skill-Repos wholesale importieren
- Naechste kleinste Aktion: Source-Check `academic-research-skills` statisch und kurz dokumentieren
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-21.md`; Quellen: GitHub Trending daily/weekly, OSSInsight AI Trending, GitHub REST API
