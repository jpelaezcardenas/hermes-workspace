# GitHub Rising Projects Tierlist – 2026-05-23

Quelle: GitHub Trending daily/weekly per Abruf am 2026-05-23 ca. 10:00 MESZ plus GitHub REST Repo-Metadaten. 7-Tage-Werte stammen aus GitHub Trending weekly; wenn ein Projekt dort nicht gelistet war: nicht verfügbar.

## Kurzfazit
Heute dominieren klar Agenten-Infrastruktur, Coding-Agent-Skills, Codegraph-/Code-Kontext-Tools und lokale/private AI. Auffällig ist, dass mehrere mittelgroße Repos sehr hohe relative Wachstumsraten zeigen. Gleichzeitig sind einige Trends riskant: Stealth-Browser, breite Personal-AI-Suiten und Finance-/Research-Toolkits mit unklarer Lizenz oder Datenschutzfläche.

## S-Tier

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Developer Tools, Code-Kontext, Agenten-Infrastruktur
- Kurzbeschreibung: Lokaler, vorindexierter Code-Knowledge-Graph für Claude Code, Codex, Cursor, OpenCode und Hermes.
- Sterne gesamt: 17.412; Forks: 963; Contributors: ca. 22; Lizenz: MIT
- Wachstum 24h / 7 Tage: +3.684 / +14.072
- Relative Wachstumsrate: ca. 21,2% / 80,8% bezogen auf aktuellen Stand
- Warum S-Tier: Sehr starkes absolutes und relatives Momentum, direkter Fit zu Coding-Agenten und Hermes-Handoffs, klare technische These: weniger Tokens und weniger Toolcalls durch lokale Code-Indizes.
- Risiken: P2 für Chris noch nicht freigegeben; bekannte Vorsicht wegen produktiver picomatch-High-Audit-Warnung und noch fehlendem mittelgroßen Nutzenbeleg.
- Empfehlung: Beobachten/test-now nur im bereits definierten engen Sandbox-Rahmen; keine produktive Indexierung privater Repos.

### anthropics/claude-plugins-official
- Link: https://github.com/anthropics/claude-plugins-official
- Kategorie: Coding-Agent Plugins / Skill-Ökosystem
- Kurzbeschreibung: Offizielles Anthropic-Verzeichnis für Claude-Code-Plugins.
- Sterne gesamt: 25.516; Forks: 2.804; Contributors: ca. 32; Lizenz: keine Lizenz erkannt
- Wachstum 24h / 7 Tage: +2.549 / nicht verfügbar
- Relative Wachstumsrate: ca. 10,0% in 24h
- Warum S-Tier: Offizieller Anbieter-Signalwert, sehr starkes Tagesmomentum, relevant für Agenten-Workflows und Skill-Ökosysteme.
- Risiken: Keine erkannte Lizenz; potentiell stark Claude-spezifisch; Plugin-Ökosystem kann schnell Security-/Supply-Chain-Risiken erzeugen.
- Empfehlung: Anschauen und konzeptionell auswerten; keine direkte Integration ohne Lizenz-/Security-Review.

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: Local AI, Personal AI, Memory
- Kurzbeschreibung: Lokale persönliche AI mit Privacy-Anspruch.
- Sterne gesamt: 25.893; Forks: 2.374; Lizenz: GPL-3.0
- Wachstum 24h / 7 Tage: nicht verfügbar / +17.124
- Relative Wachstumsrate: ca. 66,1% pro Woche
- Warum S-Tier: Enormes Wochenmomentum in einem strategisch wichtigen Feld: lokale/private AI, Memory, persönliche Wissenssysteme.
- Risiken: GPL-3.0, hohe Datenschutzfläche, sehr breite Claims; direkte Hermes-Integration bleibt ungeeignet.
- Empfehlung: ConceptOnly; Prinzipien beobachten, nicht integrieren.

## A-Tier

### Lum1104/Understand-Anything
- Link: https://github.com/Lum1104/Understand-Anything
- Kategorie: Code Understanding, Knowledge Graph, Agenten-Tools
- Kurzbeschreibung: Interaktive Knowledge-Graphs für Code, mit Support für Claude Code, Codex, Cursor, Copilot, Gemini CLI.
- Sterne gesamt: 19.260; Forks: 1.750; Lizenz: MIT
- Wachstum 24h / 7 Tage: +1.393 / nicht verfügbar
- Relative Wachstumsrate: ca. 7,2% in 24h
- Warum A-Tier: Starkes Momentum, direkter Bezug zu Code-Kontext und Lern-/Erklärgraphen.
- Risiken: Kann Codegraph überlappen; technische Tiefe und lokale Datenschutzgrenzen noch nicht geprüft.
- Empfehlung: Watch; später gegen codegraph vergleichen.

### rohitg00/ai-engineering-from-scratch
- Link: https://github.com/rohitg00/ai-engineering-from-scratch
- Kategorie: AI Engineering Curriculum / Lernressource
- Kurzbeschreibung: Lern- und Build-Ressourcen für AI Engineering.
- Sterne gesamt: 12.423; Forks: 2.341; Lizenz: MIT
- Wachstum 24h / 7 Tage: +988 / ca. +6.891 laut weekly trending-Zeile
- Relative Wachstumsrate: ca. 8,0% / 55,5%
- Warum A-Tier: Sehr hohe relative Dynamik und guter Nutzen als Lern-/Curriculum-Signal.
- Risiken: Eher Content-/Curriculum-Repo als direktes Tool; Qualität muss kapitelweise geprüft werden.
- Empfehlung: Beobachten; nur einzelne Prinzipien übernehmen.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research Skills / Claude Code Workflow
- Kurzbeschreibung: Academic Research Skills für Claude Code: research → write → review → revise → finalize.
- Sterne gesamt: 19.254; Forks: 1.650; Lizenz: NOASSERTION
- Wachstum 24h / 7 Tage: nicht verfügbar / +11.550
- Relative Wachstumsrate: ca. 60,0% pro Woche
- Warum A-Tier: Starker Fit zu VdS-/Recherche-Workflows und Skill-Methodik.
- Risiken: Lizenz unklar; hohe Gefahr, fremde Prompt-/Skill-Strukturen unkritisch zu kopieren.
- Empfehlung: ConceptOnly bis Lizenz und Qualität geprüft sind.

### dotnet/skills
- Link: https://github.com/dotnet/skills
- Kategorie: Agent Skills, .NET/C# Developer Tools
- Kurzbeschreibung: Skills für AI Coding Agents im .NET- und C#-Kontext.
- Sterne gesamt: 2.616; Forks: 205; Contributors: ca. 45; Lizenz: MIT
- Wachstum 24h / 7 Tage: +389 / nicht verfügbar
- Relative Wachstumsrate: ca. 14,9% in 24h
- Warum A-Tier: Kleineres Repo mit starkem relativem Tageswachstum und hohem Signalwert durch Microsoft/.NET-Ökosystem.
- Risiken: Für Chris nur relevant, wenn .NET/C# auftaucht; sonst methodische Inspiration.
- Empfehlung: Watch/ConceptOnly.

### ChromeDevTools/chrome-devtools-mcp
- Link: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Kategorie: MCP, Browser/DevTools, Coding Agents
- Kurzbeschreibung: Chrome DevTools für Coding Agents.
- Sterne gesamt: 41.101; Forks: 2.618; Lizenz: Apache-2.0
- Wachstum 24h / 7 Tage: +501 / nicht verfügbar
- Relative Wachstumsrate: ca. 1,2% in 24h
- Warum A-Tier: Reifes, relevantes MCP/Browser-Debugging-Signal; gute Passung zu Agenten-Entwicklung.
- Risiken: Hermes hat bereits Browser-/CDP-Funktionen; Integration nur bei klarem Zusatznutzen.
- Empfehlung: Beobachten, nicht sofort integrieren.

## B-Tier

### ruvnet/RuView
- Link: https://github.com/ruvnet/RuView
- Kategorie: WiFi Sensing, Robotics/Spatial Intelligence
- Sterne gesamt: 64.267; Wachstum: +978 / +6.773; Lizenz: MIT
- Einschätzung: Technisch spannendes Spatial-Intelligence-Thema, aber für Hermes/Lernwerkstatt aktuell nur indirekt relevant. Watch.

### supertone-inc/supertonic
- Link: https://github.com/supertone-inc/supertonic
- Kategorie: Local TTS / On-device Audio
- Sterne gesamt: 9.585; Wachstum: weekly +3.621; Lizenz: MIT
- Einschätzung: Hohe lokale TTS-Relevanz; könnte später für Lernwerkstatt/Barrierefreiheit interessant sein. Kein Soforttest, weil TTS in Hermes bereits vorhanden ist.

### can1357/oh-my-pi
- Link: https://github.com/can1357/oh-my-pi
- Kategorie: Terminal Coding Agent
- Sterne gesamt: 6.492; Wachstum: +457 24h; Lizenz: MIT
- Einschätzung: Interessant als Coding-Agent-Konzept, aber starke Überschneidung mit Hermes/Codex/OpenCode-Flows. Watch.

### facebook/pyrefly
- Link: https://github.com/facebook/pyrefly
- Kategorie: Python Type Checker / Language Server
- Sterne gesamt: 6.460; Wachstum: +517 weekly; Lizenz: MIT
- Einschätzung: Substanzstark durch Facebook/Meta und 210 Contributors; Momentum geringer, aber langfristig als Python-Quality-Gate relevant.

## C-Tier

- CloakHQ/CloakBrowser – trotz +7.042 weekly und MIT blockiert: Stealth-/Anti-Bot-/Fingerprint-Patching ist für Hermes compliance-riskant.
- Fincept-Corporation/FinceptTerminal – Finance-Analytics mit +367 24h, aber Lizenz NOASSERTION und keine autonome Finanz-/Trading-Integration.
- datawhalechina/easy-vibe – starkes Wochenmomentum, aber eher Kurs-/Content-Repo; Nutzen für Hermes unklar.
- HKUDS/ViMax – interessantes Agentic Video, aber letzter Push 2026-03-29 und für Hermes nicht prioritär.
- trimstray/the-book-of-secret-knowledge / karpathy/nn-zero-to-hero / yt-dlp / odoo – bekannte große Repos; Trend sichtbar, aber nicht wirklich „rising“ im strategischen Sinn.

## Early Watchlist

- dotnet/skills – kleines/mittleres Repo mit +14,9% Tageswachstum; A/S nur, wenn Skill-Design gut dokumentiert und übertragbar ist.
- supertone-inc/supertonic – A-Tier, wenn Installation lokal einfach ist und Qualität/Latency für Schul-/Barrierefreiheitsanwendungen überzeugt.
- can1357/oh-my-pi – A-Tier, wenn klarer Vorteil gegenüber Hermes/Codex/OpenCode und sichere lokale Arbeitsweise belegt ist.
- Lum1104/Understand-Anything – S-Tier-Kandidat, falls lokaler Sandbox-Vergleich gegen codegraph echten Mehrwert zeigt.

## Top 5 Des Tages
1. colbymchenry/codegraph – stärkstes Verhältnis aus Momentum, Substanz und Hermes-Fit.
2. anthropics/claude-plugins-official – wichtiges Ökosystemsignal, aber Lizenz/Supply-Chain prüfen.
3. tinyhumansai/openhuman – strategisch wichtig für LocalAI/Memory, aber nur ConceptOnly.
4. Lum1104/Understand-Anything – potenziell nützlich für Code-Erklärung und Agenten-Kontext.
5. Imbad0202/academic-research-skills – relevant für Recherche-/VdS-Workflows, Lizenz unklar.

## Veränderung gegenüber gestern
- Neue Aufsteiger: anthropics/claude-plugins-official, Lum1104/Understand-Anything, dotnet/skills, supertonic.
- Wiederkehrend: codegraph, openhuman, academic-research-skills, CloakBrowser, pyrefly.
- Absteiger/abnehmendes Momentum: react-doctor taucht heute nicht prominent auf; bleibt aber bereits als Hermes-Review-Skill integriert.
- Blockiert bleibt: CloakBrowser.

## Hermes-Integrationsentscheidung

### colbymchenry/codegraph — test-now, aber P2 nicht freigegeben
- Codewörter: RepoApply ja, RiskGate gelb, MemoryCheck nein, Swarm5 optional, LocalAI ja, ConceptOnly nein.
- Nutzen: bessere Code-Kontextkarten für Codex/Hermes-Handoffs.
- Überschneidung: Hermes hat search_files, codebase-inspection und CodeGraph-Skill; Nutzen muss über Token-/Toolcall-Reduktion kommen.
- Wichtigstes Risiko: Audit-Warnung / produktive Indexierung privater Repos.
- Kleinster Sandbox-Test: nur synthetisches oder öffentliches mittelgroßes Repo; kein global install, keine privaten Repos.
- Graduation: Cockpit-Aufgabe oder Runbook, erst nach Chris-Freigabe.

### anthropics/claude-plugins-official — watch / concept-only
- Codewörter: RepoApply nein, RiskGate gelb, MemoryCheck nein, Swarm5 nein, LocalAI nein, ConceptOnly ja.
- Nutzen: Muster für Plugin-/Skill-Kataloge und Qualitätsstandards.
- Überschneidung: Hermes-Skills existieren bereits.
- Risiko: Lizenz fehlt; Supply-Chain/Plugin-Sicherheit.
- Sandbox: README-/Strukturreview ohne Installation.
- Graduation: ggf. Skill-Prinzipien, keine direkte Integration.

### tinyhumansai/openhuman — concept-only
- Codewörter: RepoApply nein, RiskGate rot/gelb, MemoryCheck ja, Swarm5 nein, LocalAI ja, ConceptOnly ja.
- Nutzen: Ideen für lokale/private Memory-Architekturen.
- Überschneidung: Hermes Memory, session_search, Skills, Obsidian-artige Notizen.
- Risiko: GPL-3.0 und Datenschutzfläche.
- Sandbox: kein Install; nur Architektur-/README-Auswertung.
- Graduation: Memory-/Skill-Prinzipien, keine Codeübernahme.

### Lum1104/Understand-Anything — watch
- Codewörter: RepoApply später, RiskGate gelb, MemoryCheck nein, Swarm5 optional, LocalAI vermutlich, ConceptOnly teilweise.
- Nutzen: Code-Erklärgraphen für Lernwerkstatt-/Hermes-Repos.
- Überschneidung: codegraph und bestehende Codebase-Inspection.
- Risiko: Tool-Duplizierung und unbekannte Datenflüsse.
- Sandbox: öffentliches Mini-Repo, Netzwerkaufrufe protokollieren.
- Graduation: Vergleichsnotiz oder später Skill.

### Imbad0202/academic-research-skills — concept-only
- Codewörter: RepoApply nein, RiskGate gelb, MemoryCheck nein, Swarm5 nein, LocalAI nein, ConceptOnly ja.
- Nutzen: bessere Recherche-/Review-Schleifen für VdS und wissenschaftliche Texte.
- Überschneidung: vorhandene Research- und Schreibskills.
- Risiko: Lizenz NOASSERTION; Prompt-Kopier-Risiko.
- Sandbox: Quellen-/Lizenzreview, keine Übernahme.
- Graduation: einzelne Prinzipien in Research-Skill, falls sauber.

### ChromeDevTools/chrome-devtools-mcp — watch
- Codewörter: RepoApply nein, RiskGate gelb, MemoryCheck nein, Swarm5 nein, LocalAI nein, ConceptOnly ja.
- Nutzen: Debugging für Webapps und Coding Agents.
- Überschneidung: Hermes Browser/CDP bereits aktiv.
- Risiko: unnötige Tool-Duplizierung; Browser-Kontext kann sensibel sein.
- Sandbox: nur öffentliches lokales Demo-Projekt.
- Graduation: Runbook nur bei klarem Mehrwert.

## Integration Result
- Projects reviewed: 18
- Test-now: codegraph nur im begrenzten, bereits bekannten Sandbox-Rahmen; keine neue Installation heute.
- Watch: anthropics/claude-plugins-official, Lum1104/Understand-Anything, dotnet/skills, ChromeDevTools/chrome-devtools-mcp, supertonic, pyrefly, oh-my-pi.
- Block: CloakBrowser direkte Integration.
- Files changed: /Users/zondrius/hermes-workspace/reports/github-rising-tierlist-2026-05-23.md
- Hermes benefit: heutiger stärkster Nutzen liegt in Code-Kontext-/Skill-Ökosystem-Review, nicht in sofortiger Installation.
- Remaining risks: mehrere Projekte ohne klare Lizenz; hohe Hype-Dichte; GitHub-Trending liefert keine vollständigen historischen Zeitreihen.
- Next action: kleines, read-only Strukturreview von anthropics/claude-plugins-official als Skill-Katalog-Signal.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Read-only Strukturreview von anthropics/claude-plugins-official auf Skill-/Plugin-Qualitätsmuster, ohne Installation.
- CHRIS_ENTSCHEIDET: Ob codegraph P2 mit einem öffentlichen mittelgroßen Repo geprüft werden soll; jede Installation oder produktive Repo-Indexierung bleibt freigabepflichtig.
- BEOBACHTEN: Lum1104/Understand-Anything, tinyhumansai/openhuman, Imbad0202/academic-research-skills, dotnet/skills, ChromeDevTools/chrome-devtools-mcp, supertonic, pyrefly.
- SPAETER: Vergleich Understand-Anything vs. codegraph; lokaler TTS-Test supertonic für Barrierefreiheit/Lernwerkstatt.
- BLOCKIERT: Exakte 7-Tage-Historie für alle Repos nicht verfügbar über GitHub Trending; nur weekly-listed Repos haben Wochenwerte.
- NICHT_TUN: CloakBrowser integrieren; Provider-/Plugin-Ökosysteme ohne Lizenz- und Security-Review installieren; private Hermes/Lernwerkstatt/VdS-Repos mit neuen Tools scannen.
- Naechste kleinste Aktion: anthropics/claude-plugins-official README/Lizenz/Struktur read-only prüfen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/github-rising-tierlist-2026-05-23.md
