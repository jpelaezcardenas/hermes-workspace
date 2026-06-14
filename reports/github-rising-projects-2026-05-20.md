# GitHub Rising Projects Tierlist – 2026-05-20

## Kurzfazit
Heute dominiert weiterhin ein sehr enges Themencluster: AI-Agenten, Claude-/Agent-Skills, lokale Agent-Memory-/Kontextwerkzeuge und Developer-Produktivität. Auffällig ist, dass viele Top-Signale keine klassischen Libraries sind, sondern Arbeitsmethoden, Skill-Sammlungen oder Agenten-Interfaces. Das macht sie strategisch interessant, aber integrationsseitig riskant: Nicht Sterne kopieren, sondern nur überprüfbare Prinzipien, Sandbox-Tests und klare Sicherheitsgrenzen übernehmen.

Datenlage: GitHub Trending daily/weekly und GitHub REST API wurden geprüft. GitHub Trending liefert sichtbare 24h-/7d-Sternsignale, aber keine vollständige Zeitreihe; relative Wachstumsraten sind daher Näherungen aus neuen Sternen im Verhältnis zu aktuellen Gesamtsternen. Externe Launch-Ursachen wurden nicht belastbar verifiziert.

## S-Tier

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: Local AI / Personal AI / Agent Memory
- Kurzbeschreibung: Private persönliche KI-Umgebung mit lokalem/privatem Anspruch.
- Sterne gesamt: 22.441; Forks: 1.998; offene Issues: 161; Lizenz: GPL-3.0; erstellt: 2026-02-18; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: +3.973 / +17.793 laut GitHub Trending
- Relative Wachstumsrate: ca. 17,7% in 24h; ca. 79,3% in 7d – extrem stark
- Warum S-Tier? Stärkstes Signal im für Chris relevanten Feld LocalAI + persönliche Wissens-/Agenten-Infrastruktur. Sehr hohe relative Dynamik trotz schon mittlerer Größe; aktive Pflege.
- Mögliche Risiken: GPL-3.0, hohe Privacy-Oberfläche, breite Produktclaims, viele Issues. Nicht mit privaten Daten testen.
- Empfehlung: beobachten / concept-only; keine direkte Hermes-Integration.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research-Agent Skills / Claude Code Workflow
- Kurzbeschreibung: Skills für akademische Workflows: research → write → review → revise → finalize.
- Sterne gesamt: 14.715; Forks: 1.366; offene Issues: 12; Lizenz: NOASSERTION/unklar; erstellt: 2026-02-26; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: +3.164 / nicht zuverlässig vollständig aus Quelle extrahiert
- Relative Wachstumsrate: ca. 21,5% in 24h – extrem stark
- Warum S-Tier? Sehr starkes relatives Momentum und direkter Fit zu Recherche-, VdS-, Schreib- und Review-Workflows. Die Aktivität am heutigen Tag wirkt substanzieller als eine reine Sammlung, muss aber source-geprüft werden.
- Mögliche Risiken: Lizenz unklar; fremde Skill-Sammlungen können Qualitäts-, Prompt- und Quellenrisiken enthalten.
- Empfehlung: anschauen/source-check; nur Prinzipien übernehmen, kein Wholesale-Import.

### HKUDS/CLI-Anything
- Link: https://github.com/HKUDS/CLI-Anything
- Kategorie: Agent-native CLI / Developer Tools
- Kurzbeschreibung: Framework/Hub, um Software agentenfähig über CLI-Strukturen bedienbar zu machen.
- Sterne gesamt: 38.057; Forks: 3.634; offene Issues: 68; Lizenz: Apache-2.0; erstellt: 2026-03-08; letzter Push: 2026-05-18
- Sterne-Wachstum 24h / 7 Tage: +1.038 / nicht zuverlässig vollständig verfügbar
- Relative Wachstumsrate: ca. 2,7% in 24h
- Warum S-Tier? Hohe absolute Dynamik, klares strategisches Thema für Hermes: Tools so kapseln, dass Agenten sie sicher, reproduzierbar und prüfbar nutzen können.
- Mögliche Risiken: Overlap mit Hermes Tools, MCP, Skills und Gateway; „ALL Software“ ist ein hoher Claim.
- Empfehlung: source-check / watch; nur mit öffentlichem Dummy-CLI sandboxen.

## A-Tier

### rohitg00/agentmemory
- Link: https://github.com/rohitg00/agentmemory
- Kategorie: Agent Memory
- Kurzbeschreibung: Persistente Memory-Lösung für AI-Coding-Agents.
- Sterne gesamt: 14.515; Forks: 1.207; Issues: 142; Lizenz: Apache-2.0; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: +1.609 / +8.390
- Relative Wachstumsrate: ca. 11,1% in 24h; ca. 57,8% in 7d
- Warum A-Tier? Das Marktsignal ist stark und das Thema zentral. Nicht S für Hermes, weil frühere Sandbox-Hinweise Telemetrie, externe Erstverbindung, Wildcard-Websocket-Binding und Auto-Capture-Risiko gezeigt haben.
- Mögliche Risiken: Datenschutz, unbeabsichtigte Speicherung, Netzwerkoberfläche.
- Empfehlung: watch; keine Produktion, keine Migration.

### millionco/react-doctor
- Link: https://github.com/millionco/react-doctor
- Kategorie: React Quality / AI Code Review
- Kurzbeschreibung: Erkennt schlechte React-Code-Muster, besonders bei AI-generiertem Code.
- Sterne gesamt: 10.373; Forks: 332; Issues: 36; Lizenz: MIT; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: 24h nicht zuverlässig sichtbar / in der Wochenliste als stark wachsend geführt
- Relative Wachstumsrate: nicht belastbar berechnet
- Warum A-Tier? Sehr konkreter Nutzen für Lernwerkstatt-/React-Projekte und Reviewer-Workflows. Praktischer als viele Skill-Sammlungen.
- Mögliche Risiken: False Positives, zu enger React-Fokus, unreife Regeln.
- Empfehlung: test-now nur in Sandbox/Throwaway-React-Projekt; keine produktiven Änderungen.

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Code Context / Knowledge Graph
- Kurzbeschreibung: Lokaler Code-Knowledge-Graph für Claude Code, Codex, Cursor und OpenCode.
- Sterne gesamt: 7.164; Forks: 469; Issues: 62; Lizenz: MIT; letzter Push: 2026-05-20
- Sterne-Wachstum 24h / 7 Tage: nicht zuverlässig aus heutiger Liste extrahiert; weiterhin starkes Wochenmomentum aus Vortags-/Skill-Kontext
- Relative Wachstumsrate: nicht neu belastbar berechnet
- Warum A-Tier? Strategisch relevant für Codex-Handoffs, Tokenkosten und lokale Codekontextsuche. P1-Sandbox war bereits positiv.
- Mögliche Risiken: P2 nicht freigegeben wegen produktiver `picomatch` High audit warning und noch fehlendem Nutzenbeleg an mittelgroßem öffentlichen Repo.
- Empfehlung: watch/test-now nur nach Chris-Freigabe für P2.

### rtk-ai/rtk
- Link: https://github.com/rtk-ai/rtk
- Kategorie: LLM Token Optimization / CLI Proxy
- Kurzbeschreibung: Rust-CLI-Proxy zur Reduktion von LLM-Tokenverbrauch bei Developer-Kommandos.
- Sterne gesamt: 51.332; Forks: 3.124; Issues: 965; Lizenz: Apache-2.0; letzter Push: 2026-05-19
- Sterne-Wachstum 24h / 7 Tage: +704 / nicht zuverlässig verfügbar
- Relative Wachstumsrate: ca. 1,4% in 24h
- Warum A-Tier? Kostenkontrolle und Tokenreduktion passen zu Hermes. Hohe Issue-Zahl spricht aber für Reife-/Support-Risiken.
- Mögliche Risiken: Proxy in Developer-Kommandos kann Transparenz, Logging, Privacy und Debugging erschweren.
- Empfehlung: concept-only/source-check; keine produktive Proxy-Schicht.

## B-Tier

### obra/superpowers
- Link: https://github.com/obra/superpowers
- Kategorie: Agentic Skills / Methodology
- Sterne gesamt: 199.084; Wachstum: +1.623/24h, +10.577/7d
- Einschätzung: Sehr groß und weiter sichtbar, aber relativer Trend niedriger als kleinere Kandidaten. Für Hermes nur als Methodik-Inspiration, nicht als Import.

### mattpocock/skills
- Link: https://github.com/mattpocock/skills
- Kategorie: Developer Skills / Claude Workflows
- Sterne gesamt: 95.473; Wachstum: +19.038/7d
- Einschätzung: Starkes Skill-Design-Signal, aber bereits am 2026-05-16 als Prinzipienquelle bewertet. Kein weiterer Integrationsdruck heute.

### anthropics/claude-plugins-official
- Link: https://github.com/anthropics/claude-plugins-official
- Kategorie: Claude Plugins / Official Directory
- Sterne gesamt: 20.411; Wachstum: +171/24h
- Einschätzung: Vertrauenswürdiger Maintainer und relevant für Ökosystembeobachtung, aber Lizenz fehlt in API und Overlap mit Hermes-Skills/Tools ist groß.

### microsoft/ai-agents-for-beginners
- Link: https://github.com/microsoft/ai-agents-for-beginners
- Kategorie: Education / AI Agents
- Sterne gesamt: 64.704; Wachstum: +818/24h
- Einschätzung: Reife Lernressource, aber kein frühes Rising-Projekt. Gut als Referenz, nicht als Integration.

### facebook/pyrefly
- Link: https://github.com/facebook/pyrefly
- Kategorie: Python Type Checker / LSP
- Sterne gesamt: 6.310; Forks: 371; Issues: 568; Lizenz: MIT; letzter Push: 2026-05-20
- Einschätzung: Technisch substanziell und Maintainer-stark. Für Chris' Hermes heute nur mittelbar relevant, weil bestehende Python-Checks meist ausreichen.

## C-Tier

### CloakHQ/CloakBrowser
- Link: https://github.com/CloakHQ/CloakBrowser
- Begründung: Sehr starkes Momentum (+1.463/24h, +8.997/7d), aber Stealth-/Bot-Detection-Bypass und Playwright-Ersatz mit Fingerprint-Patches sind für Hermes rechtlich/ethisch/ToS-seitig zu riskant. Bleibt blockiert.

### multica-ai/andrej-karpathy-skills
- Link: https://github.com/multica-ai/andrej-karpathy-skills
- Begründung: Sehr viele Sterne und +1.955/24h, aber nur ein `CLAUDE.md`-Ansatz, Lizenz laut API nicht erkennbar und letzter Push 2026-04-20. Als Methodik-Idee okay, als Projekt überbewertet.

### ruvnet/RuView
- Link: https://github.com/ruvnet/RuView
- Begründung: Technisch auffälliges WiFi-Sensing mit +8.076/7d, aber für Hermes/Schule/VdS kaum direkt passend und privacy-/hardware-sensibel.

## Early Watchlist

- millionco/react-doctor – https://github.com/millionco/react-doctor  
  Warum interessant: Konkretes Qualitätsproblem bei AI-generiertem React-Code.  
  A/S-Bedingung: Sandbox zeigt reale Treffer bei niedrigen False Positives.

- colbymchenry/codegraph – https://github.com/colbymchenry/codegraph  
  Warum interessant: Lokaler Codekontext könnte Codex-Handoffs und Tokenkosten verbessern.  
  A/S-Bedingung: P2-Nutzenbeleg an öffentlichem mittelgroßem Repo und Audit-Risiko geklärt.

- facebook/pyrefly – https://github.com/facebook/pyrefly  
  Warum interessant: Rust-basierter schneller Python-Typechecker von Meta.  
  A/S-Bedingung: klare Vorteile gegenüber vorhandenen Checks in konkreten Hermes-/Python-Projekten.

- rtk-ai/rtk – https://github.com/rtk-ai/rtk  
  Warum interessant: Token- und Kostenreduktion ist strategisch passend.  
  A/S-Bedingung: transparente lokale Funktionsweise ohne sensible Logs/Proxy-Risiken.

## Top 5 Des Tages
1. tinyhumansai/openhuman – stärkstes LocalAI-/Personal-AI-Signal, aber nur concept-only.
2. Imbad0202/academic-research-skills – starkes Research-Skill-Momentum; Lizenz prüfen.
3. HKUDS/CLI-Anything – strategisch wichtig für agent-native CLI-Ideen.
4. millionco/react-doctor – praktischster nächster Hermes-/Lernwerkstatt-naher Sandbox-Kandidat.
5. rohitg00/agentmemory – starkes Memory-Signal, aber wegen Datenschutz-/Netzwerkrisiken nicht produktiv.

## Veränderung gegenüber gestern
- Neue/weiter verstärkte Aufsteiger: academic-research-skills sprang deutlich nach oben (+3.164/24h); openhuman wuchs weiter stark und überschritt 22k Sterne; CLI-Anything bleibt stabil im S-Tier.
- Wiederkehrende Projekte: openhuman, agentmemory, codegraph, react-doctor, CloakBrowser, superpowers, mattpocock/skills.
- Absteiger bzw. niedriger priorisiert: CloakBrowser bleibt trotz Wachstum C/block wegen Compliance-Risiko; superpowers/mattpocock bleiben wertvoll, aber eher Methodik-Referenz als neue Aktion.
- Nachlassendes/unklares Momentum: codegraph und react-doctor bleiben relevant, aber heutige 24h-Zahlen waren nicht zuverlässig sichtbar; Bewertung stützt sich auf Vortags-/Skill-Kontext und Repo-Aktivität.

## Hermes-Integrationsentscheidung

### RepoApply / RiskGate – tinyhumansai/openhuman
- Entscheidung: concept-only
- Nutzen für Hermes: LocalAI-Ideen, private persönliche Wissensbasis, MemoryCheck, komprimierte Markdown-/Obsidian-artige Wissensstrukturen.
- Überschneidung: Hermes Memory, Session Search, Skills, Obsidian- und lokale Recherche-Workflows.
- Wichtigstes Risiko: GPL-3.0 und hohe Datenschutzoberfläche.
- Kleinster sicherer Sandbox-Test: keiner heute; höchstens statischer README-/Architekturvergleich mit öffentlichen Beispielen.
- Graduation: keine Integration; ggf. später ConceptOnly-Notiz oder Datenschutz-/Memory-Prinzip.

### RepoApply / RiskGate – Imbad0202/academic-research-skills
- Entscheidung: watch / concept-only
- Nutzen für Hermes: Recherche-, Schreib-, Review- und Quellenprüfungs-Workflows für VdS und wissenschaftliche Arbeit.
- Überschneidung: research-Skills, VdS-Agent, Schreib-Agent, Reviewer-Agent, Swarm5-Prinzipien.
- Wichtigstes Risiko: Lizenz unklar und fachliche Qualität einzelner Skills nicht geprüft.
- Kleinster sicherer Sandbox-Test: statische Prüfung von README und 2–3 Beispielskills; keine Installation, keine privaten Dokumente.
- Graduation: möglicher Skill-Patch, wenn konkrete Prüfschritte besser als bestehende Hermes-Regeln sind.

### RepoApply / RiskGate – HKUDS/CLI-Anything
- Entscheidung: watch / source-check
- Nutzen für Hermes: Agent-native CLI-Kapselung, Tool-Discovery, Runbook-Ideen, sichere Tool-Schnittstellen.
- Überschneidung: Hermes Tools, MCP, Gateway, Skills, Terminal-Wrapper.
- Wichtigstes Risiko: Overengineering und unnötiger Ersatz vorhandener Hermes-Funktionen.
- Kleinster sicherer Sandbox-Test: öffentlicher Dummy-CLI in disposable dir; keine Secrets, keine privaten Dateien.
- Graduation: Runbook oder ConceptOnly, nicht direkte Integration.

### RepoApply / RiskGate – rohitg00/agentmemory
- Entscheidung: watch
- Nutzen für Hermes: Memory-Architekturideen und Benchmark-Fragen.
- Überschneidung: bestehendes Hermes Memory, Session Search, Memory-Curator-Regeln.
- Wichtigstes Risiko: automatische Memory-Erfassung, Netzwerk-/Telemetry-/Binding-Risiken aus früherem Test.
- Kleinster sicherer Sandbox-Test: keiner heute; nur Architekturvergleich mit öffentlichen Daten.
- Graduation: keine; MemoryCheck-Referenz höchstens als Negativ-/Risiko-Checkliste.

### RepoApply / RiskGate – millionco/react-doctor
- Entscheidung: test-now, aber nur nach Chris-Freigabe für Sandbox-Ausführung
- Nutzen für Hermes/Codex/Lernwerkstatt: Reviewer-Check für AI-generierten React-Code; potenziell nützlich für Lernwerkstatt-Frontends.
- Überschneidung: Coder-/Reviewer-Agent, bestehende Tests/Lints.
- Wichtigstes Risiko: False Positives und Tool-Reife.
- Kleinster sicherer Sandbox-Test: disposable React-Beispiel oder öffentliches Mini-Repo, `npx`/lokaler Lauf ohne Produktivänderungen; Ausgabe vergleichen.
- Graduation: mögliche Coder/Reviewer-Qualitätscheck-Skill, wenn Trefferquote gut ist.

### RepoApply / RiskGate – colbymchenry/codegraph
- Entscheidung: watch; P2 bleibt CHRIS_ENTSCHEIDET
- Nutzen für Hermes/Codex: lokaler Codekontext, bessere Handoffs, weniger Token/Toolcalls.
- Überschneidung: Codex-Handoff, search_files, bestehende Code-Inspection-Skills.
- Wichtigstes Risiko: produktive `picomatch` High audit warning und fehlender mittlerer Nutzenbeleg.
- Kleinster sicherer Sandbox-Test: nur nach Freigabe an öffentlichem mittelgroßem Repo; keine privaten Hermes-/Lernwerkstatt-Repos.
- Graduation: Cockpit-/Kanban-Aufgabe erst nach P2-Freigabe.

### RepoApply / RiskGate – rtk-ai/rtk
- Entscheidung: concept-only
- Nutzen für Hermes: Kosten-/Tokenkontrollideen, LocalAI-nahe CLI-Optimierung.
- Überschneidung: Hermes Tool-Auswahl, kompakte Outputs, Skills, Modellrouting.
- Wichtigstes Risiko: Proxy-Schicht kann Transparenz und Datenschutz verschlechtern.
- Kleinster sicherer Sandbox-Test: nicht heute; zuerst Source-Check zu Logging/Netzwerk/Command-Intercept.
- Graduation: eventuell Runbook-Idee, keine Integration.

### RiskGate – CloakHQ/CloakBrowser
- Entscheidung: block
- Nutzen: legitime Browser-Testautomation wäre theoretisch möglich.
- Überschneidung: Hermes Browser/Computer-Use ist bereits vorhanden.
- Wichtigstes Risiko: Stealth-/Anti-Bot-/Captcha-Bypass-Positionierung.
- Kleinster sicherer Sandbox-Test: keiner.
- Graduation: keine Integration; NICHT_TUN.

## Quellen
- GitHub Trending daily: https://github.com/trending?since=daily
- GitHub Trending weekly: https://github.com/trending?since=weekly
- GitHub REST API Repo-Metadaten, geprüft für die genannten Repositories am 2026-05-20
- Vortagsreport: /Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-19.md

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: React-Doctor-Sandbox als kleinen, isolierten Qualitätscheck vorbereiten, aber noch nicht produktiv installieren.
- CHRIS_ENTSCHEIDET: Freigabe, ob `millionco/react-doctor` in einem disposable/public React-Beispiel getestet werden soll; P2-Test von `colbymchenry/codegraph` bleibt ebenfalls entscheidungspflichtig.
- BEOBACHTEN: openhuman, academic-research-skills, CLI-Anything, agentmemory, rtk.
- SPAETER: pyrefly als möglicher Python-Quality-Check; mattpocock/skills und superpowers nur weiter als Methodikquelle.
- BLOCKIERT: keine echten Blocker; mehrere 24h-/7d-Zahlen sind nur über GitHub Trending sichtbar und nicht als vollständige Zeitreihe verfügbar.
- NICHT_TUN: CloakBrowser integrieren oder Stealth-/Anti-Bot-Browserautomation als Hermes-Abhängigkeit testen.
- Naechste kleinste Aktion: Wenn Chris zustimmt: React-Doctor in einem Wegwerf-React-Projekt mit synthetischem Code ausführen und False-Positive-Quote dokumentieren.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-20.md
