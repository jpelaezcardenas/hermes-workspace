# GitHub Rising Projects Tierlist – 2026-05-24

Quelle: GitHub Trending daily/weekly per Abruf am 2026-05-24 ca. 10:00 MESZ plus GitHub REST Repo-Metadaten. 24h-/7d-Werte stammen aus GitHub Trending; relative Raten sind näherungsweise `neue Sterne / aktuelle Sterne`. Contributor-Zahlen heute nicht belastbar automatisiert geprüft.

## Kurzfazit
Heute ist der Trend sehr klar: Coding-Agent-Infrastruktur, Skills/Plugin-Ökosysteme und Code-Knowledge-Graphen dominieren. Gegenüber gestern hat sich `Understand-Anything` stark nach oben bewegt; `codegraph` bleibt trotz nachlassendem Tagesmomentum der stärkste Hermes-Fit, weil 7-Tage-Momentum und lokaler Nutzen hoch sind. Gleichzeitig tauchen mehrere Skill-/Prompt-Repos mit sehr hohen Starzahlen auf, die eher methodische Inspiration als Integrationskandidaten sind. Risikoseitig bleiben Stealth-Browser, unklare Lizenzen und breite Personal-AI/Memory-Suiten kritisch.

## S-Tier

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Developer Tools, Code-Kontext, Agenten-Infrastruktur
- Kurzbeschreibung: Lokaler, vorindexierter Code-Knowledge-Graph für Claude Code, Codex, Cursor, OpenCode und Hermes Agent.
- Sterne gesamt: 20.452; Forks: 1.146; Lizenz: MIT; Repo-Alter: seit 2026-01-18; letzter Push: 2026-05-23.
- Sterne-Wachstum 24h / 7 Tage: +2.456 / +15.909.
- Relative Wachstumsrate: ca. 12,0% / 77,8%.
- Warum S-Tier? Sehr starkes Wochenmomentum, direkter Fit zu Hermes/Codex-Handoffs, klare Nutzenhypothese: weniger Token, weniger Toolcalls, bessere Code-Navigation. Technische Substanz wirkt höher als bei reinen Prompt-/Skill-Sammlungen.
- Mögliche Risiken: P2 für Chris weiter nicht freigegeben; bekannte Vorsicht wegen produktiver `picomatch`-High-Audit-Warnung und noch fehlendem mittelgroßem Nutzenbeleg. Keine privaten Repos indexieren.
- Empfehlung: test-now nur im engen Sandbox-Rahmen; keine produktive Hermes-/Lernwerkstatt-Integration.

### Lum1104/Understand-Anything
- Link: https://github.com/Lum1104/Understand-Anything
- Kategorie: Code Understanding, Knowledge Graph, Agenten-Tools
- Kurzbeschreibung: Interaktive Knowledge-Graphs, Suche und Fragen über Code; beworben für Claude Code, Codex, Cursor, Copilot, Gemini CLI.
- Sterne gesamt: 22.849; Forks: 2.028; Lizenz: MIT; Repo-Alter: seit 2026-03-15; letzter Push: 2026-05-24.
- Sterne-Wachstum 24h / 7 Tage: +2.299 / +4.880.
- Relative Wachstumsrate: ca. 10,1% / 21,4%.
- Warum S-Tier? Heute stärkstes Code-Kontext-Signal neben `codegraph`; gute relative Tagesdynamik bei mittlerer Größe; Thema passt sehr genau zu Agenten-Workflows, Lernwerkstatt-Code-Erklärung und Codex-Handoffs.
- Mögliche Risiken: Starke Überschneidung mit `codegraph`; unklar, ob es lokal-first genug ist und ob der praktische Nutzen über Visualisierung hinausgeht.
- Empfehlung: anschauen/watch; später kleiner Vergleichstest gegen `codegraph`, aber nicht heute installieren.

### anthropics/claude-plugins-official
- Link: https://github.com/anthropics/claude-plugins-official
- Kategorie: Coding-Agent Plugins / Skill-Ökosystem
- Kurzbeschreibung: Offizielles Anthropic-Verzeichnis für hochwertige Claude-Code-Plugins.
- Sterne gesamt: 26.829; Forks: 2.883; Lizenz: keine Lizenz erkannt; Repo-Alter: seit 2025-11-20; letzter Push: 2026-05-23.
- Sterne-Wachstum 24h / 7 Tage: +2.193 / nicht verfügbar.
- Relative Wachstumsrate: ca. 8,2% in 24h.
- Warum S-Tier? Offizieller Ökosystem-Signalwert und starkes Tagesmomentum. Relevant, weil sich Coding-Agenten offenbar weiter in Richtung Plugin-/Skill-Marktplätze entwickeln.
- Mögliche Risiken: Keine erkannte Lizenz; Claude-spezifisch; Plugin-Ökosysteme erhöhen Supply-Chain- und Prompt-Injection-Risiken.
- Empfehlung: concept-only/watch; Struktur und Qualitätskriterien auswerten, keine direkte Integration.

## A-Tier

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research Skills / wissenschaftliche Workflows
- Kurzbeschreibung: Academic Research Skills für Claude Code: research → write → review → revise → finalize.
- Sterne gesamt: 20.015; Forks: 1.713; Lizenz: NOASSERTION; letzter Push: 2026-05-24.
- Sterne-Wachstum 24h / 7 Tage: nicht verfügbar / +11.691.
- Relative Wachstumsrate: ca. 58,4% pro Woche.
- Warum A-Tier? Sehr starkes relatives Wochenmomentum und hoher Fit zu VdS-/Recherche-/Schreibworkflows.
- Risiken: Lizenz unklar; Gefahr unkritischer Prompt-/Skill-Übernahme.
- Empfehlung: concept-only; später Quellen-/Lizenzreview.

### rohitg00/ai-engineering-from-scratch
- Link: https://github.com/rohitg00/ai-engineering-from-scratch
- Kategorie: AI Engineering Curriculum / Lernressource
- Kurzbeschreibung: Lern- und Build-Ressourcen für AI Engineering.
- Sterne gesamt: 14.241; Forks: 2.639; Lizenz: MIT; letzter Push: 2026-05-23.
- Sterne-Wachstum 24h / 7 Tage: +1.521 / +5.026.
- Relative Wachstumsrate: ca. 10,7% / 35,3%.
- Warum A-Tier? Starke relative Dynamik und potenziell nützlich als Curriculum-/Skill-Quelle.
- Risiken: Eher Content-Repo als Tool; Qualität kapitelweise prüfen.
- Empfehlung: beobachten; keine Integration, nur einzelne Lernprinzipien prüfen.

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: Local AI, Personal AI, Memory
- Kurzbeschreibung: Private persönliche AI-Suite mit LocalAI-/Memory-Anspruch.
- Sterne gesamt: 26.628; Forks: 2.459; Lizenz: GPL-3.0; letzter Push: 2026-05-24.
- Sterne-Wachstum 24h / 7 Tage: nicht verfügbar / +16.288.
- Relative Wachstumsrate: ca. 61,2% pro Woche.
- Warum A-Tier? Enormes Wochenmomentum in strategisch wichtigem Feld: lokale/private AI, persönliches Wissen, Memory.
- Risiken: GPL-3.0, breite Claims, hohe Datenschutzfläche, wahrscheinlich komplexe Integration.
- Empfehlung: ConceptOnly; keine Installation, keine Codeübernahme.

### ChromeDevTools/chrome-devtools-mcp
- Link: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Kategorie: MCP, Browser/DevTools, Coding Agents
- Kurzbeschreibung: Chrome DevTools für Coding Agents.
- Sterne gesamt: 41.435; Forks: 2.629; Lizenz: Apache-2.0; letzter Push: 2026-05-24.
- Sterne-Wachstum 24h / 7 Tage: +435 / nicht verfügbar.
- Relative Wachstumsrate: ca. 1,0% in 24h.
- Warum A-Tier? Hohe Substanz und Hersteller-/Ökosystemsignal; MCP + Browser-Debugging bleibt relevant.
- Risiken: Hermes hat bereits Browser/CDP-Werkzeuge; Browser-Kontext kann sensible Daten enthalten.
- Empfehlung: beobachten, nicht integrieren.

### dotnet/skills
- Link: https://github.com/dotnet/skills
- Kategorie: Agent Skills, .NET/C# Developer Tools
- Kurzbeschreibung: Skills für AI Coding Agents im .NET-/C#-Kontext.
- Sterne gesamt: 2.799; Forks: 211; Lizenz: MIT; letzter Push: 2026-05-24.
- Sterne-Wachstum 24h / 7 Tage: +266 / nicht verfügbar.
- Relative Wachstumsrate: ca. 9,5% in 24h.
- Warum A-Tier? Kleineres offizielles Ökosystem-Signal mit starkem relativen Tageswachstum.
- Risiken: Für Chris nur direkt relevant bei .NET-Projekten; sonst methodische Inspiration.
- Empfehlung: watch/concept-only.

## B-Tier

### humanlayer/12-factor-agents
- Link: https://github.com/humanlayer/12-factor-agents
- Kategorie: Agent Engineering Principles
- Sterne gesamt: 22.028; Wachstum: weekly +2.035; Lizenz: NOASSERTION; letzter Push laut API: 2025-09-21.
- Einschätzung: Inhaltlich wahrscheinlich wertvoll als Architekturprinzipien, aber Momentum ist eher Konzept-/Content-getrieben und der letzte Push wirkt alt. Watch, keine Integration.

### multica-ai/multica
- Link: https://github.com/multica-ai/multica
- Kategorie: Managed Agents / Coding-Agent-Plattform
- Sterne gesamt: 32.109; Wachstum: +410 24h; Lizenz: NOASSERTION; letzter Push: 2026-05-24.
- Einschätzung: Relevantes Thema, aber Hermes hat bereits Orchestrierung, Skills, Subagents und Handoffs. Ohne klaren lokalen Vorteil eher beobachten.

### K-Dense-AI/scientific-agent-skills
- Link: https://github.com/K-Dense-AI/scientific-agent-skills
- Kategorie: Research/Science/Finance Agent Skills
- Sterne gesamt: 25.454; Wachstum: weekly +2.522; Lizenz: MIT.
- Einschätzung: Potenziell nützlich für Research-Skill-Qualität, aber hohe Überlappung und Prompt-Kopier-Risiko. Concept-only.

### ruvnet/RuView
- Link: https://github.com/ruvnet/RuView
- Kategorie: WiFi Sensing, Robotics/Spatial Intelligence
- Sterne gesamt: 64.938; Wachstum: weekly +6.741; Lizenz: MIT.
- Einschätzung: Technisch spannend und zukunftsrelevant, aber für Hermes/Lernwerkstatt aktuell nur indirekt relevant. Watch.

### Fincept-Corporation/FinceptTerminal
- Link: https://github.com/Fincept-Corporation/FinceptTerminal
- Kategorie: Finance Analytics / Investment Research
- Sterne gesamt: 23.264; Wachstum: +545 24h; Lizenz: NOASSERTION.
- Einschätzung: Finance-Lernsignal möglich, aber keine autonome Finanzintegration. Wegen Lizenz und Finanzrisiko nur beobachten.

## C-Tier
- `multica-ai/andrej-karpathy-skills` – sehr hohe Stars (+3.507 24h), aber als einzelne CLAUDE.md/Skill-Sammlung wahrscheinlich stark hype-/personengetrieben; keine Lizenz erkannt; eher Prinzipien prüfen als übernehmen.
- `CloakHQ/CloakBrowser` – weiter blockiert trotz +6.991 weekly: Stealth-/Anti-Bot-/Fingerprint-Patching ist Compliance-/ToS-riskant.
- `mukul975/Anthropic-Cybersecurity-Skills` – Thema Security ist relevant, aber ohne nähere Prüfung nicht als Skill-Quelle übernehmen; mögliche Dual-Use-/Prompt-Risiken.
- `presenton/presenton` – Präsentations-/Deck-Tool mit Trend, aber kein strategischer Hermes-Schwerpunkt heute.
- `yt-dlp`, `odoo`, `trimstray/the-book-of-secret-knowledge` – bekannte große Repos; Trending sichtbar, aber nicht wirklich „rising“ im strategischen Sinn.

## Early Watchlist
- `dotnet/skills` – kleines offizielles Skill-Repo; A/S, wenn die Skill-Strukturen übertragbare Qualitätsstandards liefern.
- `ChromeDevTools/chrome-devtools-mcp` – A/S, wenn es gegenüber Hermes-Browser/CDP konkrete Debugging-Mehrwerte bietet.
- `humanlayer/12-factor-agents` – A/S als Prinzipienquelle, wenn Lizenz/Quelle sauber und Inhalte substanziell sind.
- `mukul975/Anthropic-Cybersecurity-Skills` – nur mit Sicherheits-/Dual-Use-Review; könnte für Defensive-Security-Checklisten interessant sein.
- `presenton/presenton` – relevant, falls Präsentationsautomatisierung für VdS/Fachtage wichtiger wird.

## Top 5 Des Tages
1. `colbymchenry/codegraph` – stärkster Mix aus Momentum, technischem Nutzen und Hermes-Fit.
2. `Lum1104/Understand-Anything` – deutlicher Aufsteiger im Code-Knowledge-Graph-Segment.
3. `anthropics/claude-plugins-official` – wichtiges Ökosystemsignal für Coding-Agent-Plugins.
4. `Imbad0202/academic-research-skills` – hoher Fit zu Recherche-/VdS-Workflows, aber Lizenz unklar.
5. `tinyhumansai/openhuman` – strategisch wichtig für LocalAI/Memory, aber nur ConceptOnly.

## Veränderung gegenüber gestern
- Neue/klare Aufsteiger: `Understand-Anything` steigt von A zu S; `humanlayer/12-factor-agents` erscheint als wieder relevantes Prinzipienrepo; `multica` gewinnt Tagesmomentum.
- Wiederkehrend stark: `codegraph`, `claude-plugins-official`, `openhuman`, `academic-research-skills`, `dotnet/skills`, `ChromeDevTools/chrome-devtools-mcp`.
- Nachlassend/relativ schwächer: `codegraph` bleibt S-Tier, aber Tageswachstum ist niedriger als gestern; Momentum bleibt durch 7-Tage-Wert trotzdem hoch.
- Blockiert bleibt: `CloakBrowser`.
- Bereits angewendet: `react-doctor` taucht heute nicht prominent auf, bleibt aber als guarded Review Skill vorbereitet.

## Hermes-Integrationsentscheidung

### colbymchenry/codegraph — test-now, aber nur bestehender Sandbox-Pfad
- Codewörter: RepoApply ja; RiskGate gelb; MemoryCheck nein; Swarm5 optional; LocalAI ja; ConceptOnly nein.
- Nutzen: bessere Code-Kontextkarten für Codex/Hermes-Handoffs und mögliche Token-/Toolcall-Reduktion.
- Überschneidung: Hermes hat `search_files`, `codebase-inspection`, CodeGraph-Skill und Codex-Handoffs.
- Wichtigstes Risiko: Audit-Warnung / produktive Indexierung privater Repos.
- Kleinster sicherer Sandbox-Test: öffentliches oder synthetisches mittelgroßes Repo; kein global install; keine privaten Hermes-/Lernwerkstatt-Repos.
- Graduation: Cockpit-Aufgabe oder Runbook erst nach Chris-Freigabe.

### Lum1104/Understand-Anything — watch
- Codewörter: RepoApply später; RiskGate gelb; MemoryCheck nein; Swarm5 optional; LocalAI vermutlich; ConceptOnly teilweise.
- Nutzen: Code-Erklärgraphen für Hermes-/Lernwerkstatt-Code und bessere visuelle Handoffs.
- Überschneidung: starke Überlappung mit `codegraph` und Codebase-Inspection.
- Wichtigstes Risiko: Tool-Duplizierung, unbekannte Datenflüsse, Visualisierung ohne echten Workflow-Gewinn.
- Kleinster sicherer Sandbox-Test: README-/Architekturcheck, danach synthetisches Mini-Repo; Netzwerkaufrufe protokollieren.
- Graduation: Vergleichsnotiz; eventuell später Skill, wenn klar besser als bestehende Optionen.

### anthropics/claude-plugins-official — concept-only / watch
- Codewörter: RepoApply nein; RiskGate gelb; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.
- Nutzen: Qualitätsmuster für Plugin-/Skill-Kataloge.
- Überschneidung: Hermes-Skills und bestehende Skill-Governance.
- Wichtigstes Risiko: fehlende Lizenz, Supply-Chain-/Plugin-Sicherheitsrisiko.
- Kleinster sicherer Sandbox-Test: Struktur-/README-Review ohne Installation.
- Graduation: einzelne Prinzipien in Skill-Standards, keine direkte Integration.

### Imbad0202/academic-research-skills — concept-only
- Codewörter: RepoApply nein; RiskGate gelb; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.
- Nutzen: mögliche Research-/Review-Schleifen für VdS, wissenschaftliche Texte und Quellenarbeit.
- Überschneidung: vorhandene Research-, Schreib- und Review-Skills.
- Wichtigstes Risiko: Lizenz NOASSERTION und Prompt-Kopier-Risiko.
- Kleinster sicherer Sandbox-Test: Lizenz-/Quellenreview; keine Übernahme.
- Graduation: eventuell Research-Skill-Prinzipien nach sauberer Prüfung.

### tinyhumansai/openhuman — concept-only
- Codewörter: RepoApply nein; RiskGate rot/gelb; MemoryCheck ja; Swarm5 nein; LocalAI ja; ConceptOnly ja.
- Nutzen: Ideen für lokale/private Memory-Architekturen und komprimierte persönliche Wissensspeicher.
- Überschneidung: Hermes Memory, Session Search, Skills, Obsidian-artige Notizen.
- Wichtigstes Risiko: GPL-3.0, Datenschutzfläche, breite Personal-AI-Claims.
- Kleinster sicherer Sandbox-Test: kein Install; nur README-/Architekturauswertung.
- Graduation: Memory-/Skill-Prinzipien, keine Codeübernahme.

### ChromeDevTools/chrome-devtools-mcp — watch
- Codewörter: RepoApply nein; RiskGate gelb; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.
- Nutzen: Webapp-Debugging für Coding Agents.
- Überschneidung: Hermes Browser/CDP ist bereits aktiv.
- Wichtigstes Risiko: doppelte Browser-Automation und mögliche Verarbeitung sensibler Browser-Kontexte.
- Kleinster sicherer Sandbox-Test: nur öffentliche lokale Demo-App; keine eingeloggten Seiten.
- Graduation: keine Integration ohne klaren Zusatznutzen.

## Integration Result
- Projects reviewed: 17
- Test-now: `colbymchenry/codegraph` nur im bereits bekannten Sandbox-Rahmen.
- Watch: `Understand-Anything`, `ChromeDevTools/chrome-devtools-mcp`, `dotnet/skills`, `multica`, `humanlayer/12-factor-agents`, `RuView`, `FinceptTerminal`.
- Block: `CloakHQ/CloakBrowser`.
- Files changed: `/Users/zondrius/hermes-workspace/reports/github-rising-tierlist-2026-05-24.md`
- Hermes benefit: Heute vor allem Code-Kontext-/Agenten-Skill-Signale; sinnvollster praktischer Nutzen bleibt ein kontrollierter Codegraph-/Understand-Anything-Vergleich, nicht eine neue produktive Integration.
- Remaining risks: Trending-Zahlen sind GitHub-Trending-Näherungen; Contributors/Issue-Qualität nicht tief geprüft; keine READMEs vollständig auditiert.
- Next action: kein automatischer Install. Wenn überhaupt: README-/Architekturcheck für `Understand-Anything` als Vergleichskandidat zu `codegraph`.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: README-/Architekturcheck für `Lum1104/Understand-Anything` als reiner Vergleich zu `codegraph`, ohne Installation und ohne private Repos.
- CHRIS_ENTSCHEIDET: Ob ein späterer Sandbox-Vergleich `codegraph` vs. `Understand-Anything` mit einem öffentlichen mittelgroßen Repo angelegt werden soll.
- BEOBACHTEN: `claude-plugins-official`, `academic-research-skills`, `openhuman`, `ChromeDevTools/chrome-devtools-mcp`, `dotnet/skills`.
- SPAETER: Research-Skill-Prinzipien aus `academic-research-skills` prüfen; Browser-MCP erst prüfen, wenn Hermes-Browser/CDP konkret nicht reicht.
- BLOCKIERT: keine echten Blocker; tiefe Contributor-/Issue-Qualität heute nicht geprueft.
- NICHT_TUN: `CloakBrowser` integrieren; Plugin-/Skill-Repos wholesale kopieren; private Hermes-/Lernwerkstatt-Repos mit neuen Tools indexieren.
- Naechste kleinste Aktion: README-/Architekturcheck `Understand-Anything` ohne Installation.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/github-rising-tierlist-2026-05-24.md`
