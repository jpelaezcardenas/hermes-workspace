# GitHub Rising Projects Tierlist – 2026-05-26

## Kurzfazit
Heute bleibt **Agentic Coding / Skills / Code-Kontext** das dominante Thema. Die stärksten Signale kommen von `Understand-Anything`, `codegraph`, Claude-/Agent-Skill-Repos und lokalen Agent-Workflows. Gegenüber gestern hat `Understand-Anything` weiter beschleunigt; `codegraph` bleibt extrem stark im Wochenfenster, ist für Hermes aber wegen bereits bekannter P2-Risiken nicht automatisch der nächste Schritt. Auffällig: Viele Repos verkaufen „bessere Agenten“ über Skills, Memory oder Plugins — hier ist Substanzprüfung wichtiger als Sterne.

Datenbasis: GitHub Trending daily/weekly und GitHub API Repo-Metadaten am 2026-05-26. 24h-/7d-Zahlen sind GitHub-Trending-Anzeigen, keine vollständige Star-Historie. Relative Wachstumsraten sind Näherungen bezogen auf aktuelle Gesamtsterne.

## S-Tier

### Lum1104/Understand-Anything
- Link: https://github.com/Lum1104/Understand-Anything
- Kategorie: Developer Tools / Code Knowledge Graph / AI Agent Context
- Kurzbeschreibung: Interaktive, durchsuchbare Wissensgraphen für Codebases; kompatibel mit Claude Code, Codex, Cursor, Copilot, Gemini CLI.
- Sterne gesamt: 32.860; Forks: 2.667; offene Issues: 48; erstellt: 2026-03-15; letzter Push: 2026-05-26; Lizenz: MIT.
- Sterne-Wachstum 24h / 7 Tage: +5.604 / +14.750.
- Relative Wachstumsrate: ca. 17,1% täglich; ca. 44,9% wöchentlich.
- Warum S-Tier? Sehr starkes Tages- und Wochenmomentum, klarer Use Case, MIT-Lizenz, direkter Fit zu Agent-Codeverständnis. Im Vergleich zu gestern nochmals stärkeres Tagesmomentum.
- Mögliche Risiken: Nutzen gegenüber bestehendem `codegraph` und Hermes-Codegraph-Skill ist nicht bewiesen; Graph-Visualisierung kann oberflächlich sein; Installations-/Dependency-Surface nicht geprüft.
- Empfehlung: **test-now**, aber nur als Sandbox-Vergleich mit öffentlichem Toy-Repo.

### colbymchenry/codegraph
- Link: https://github.com/colbymchenry/codegraph
- Kategorie: Developer Tools / Local Code Graph / Agent Context
- Kurzbeschreibung: Lokaler pre-indexed code knowledge graph für Claude Code, Codex, Cursor, OpenCode und Hermes Agent.
- Sterne gesamt: 26.328; Forks: 1.467; offene Issues: 172; erstellt: 2026-01-18; letzter Push: 2026-05-26; Lizenz: MIT.
- Sterne-Wachstum 24h / 7 Tage: +3.161 / +20.208.
- Relative Wachstumsrate: ca. 12,0% täglich; ca. 76,8% wöchentlich.
- Warum S-Tier? Stärkstes Wochenmomentum im heutigen Set und sehr hoher Hermes-Fit: lokaler Codekontext, weniger Tokens, bessere Handoffs an Codex/Hermes.
- Mögliche Risiken: P1-Sandbox ist schon passiert; P2 bleibt nicht freigegeben wegen bekanntem produktivem `picomatch` High Audit Warning und fehlendem mittelgroßem Nutzenbeweis.
- Empfehlung: **watch / P2 nur nach Chris-Entscheid**.

### rohitg00/ai-engineering-from-scratch
- Link: https://github.com/rohitg00/ai-engineering-from-scratch
- Kategorie: AI Engineering Education / Build Guides
- Kurzbeschreibung: Lern- und Build-Ressource für AI-Engineering-Projekte.
- Sterne gesamt: 19.445; Forks: 3.256; offene Issues: 41; erstellt: 2026-03-18; letzter Push: 2026-05-25; Lizenz: MIT.
- Sterne-Wachstum 24h / 7 Tage: +3.154 / +10.035.
- Relative Wachstumsrate: ca. 16,2% täglich; ca. 51,6% wöchentlich.
- Warum S-Tier? Heute deutlich stärker als gestern: hohes relatives Wachstum, MIT, praktischer Lern-/Build-Fokus, guter Nutzen für Startup-/EdTech-/AI-Engineering-Kompetenz.
- Mögliche Risiken: Eher Lernsammlung als Tool; Qualität einzelner Module nicht geprüft; unmittelbarer Hermes-Systemnutzen begrenzt.
- Empfehlung: **watch / punktuell anschauen**, kein Integrationsprojekt.

## A-Tier

### anthropics/knowledge-work-plugins
- Link: https://github.com/anthropics/knowledge-work-plugins
- Kategorie: Agent Plugins / Knowledge Work / Claude Ecosystem
- Kurzbeschreibung: Open-Source-Plugins für Wissensarbeit in Claude Cowork.
- Sterne gesamt: 16.053; Forks: 1.904; offene Issues: 124; erstellt: 2026-01-23; letzter Push: 2026-05-25; Lizenz: Apache-2.0.
- Sterne-Wachstum 24h / 7 Tage: +1.441 / nicht verlässlich extrahiert.
- Relative Wachstumsrate: ca. 9,0% täglich.
- Warum A-Tier? Offizielles Anthropic-Signal, Apache-2.0, klare Relevanz für Plugin-/Skill-Ökosysteme.
- Risiken: Claude-spezifisch; direkter Nutzen für Hermes nur über Prinzipien/Standards, nicht über Plug-and-play.
- Empfehlung: **concept-only/watch**.

### tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Kategorie: Local AI / Personal AI / Memory
- Kurzbeschreibung: „Personal AI super intelligence“, privat und lokal positioniert.
- Sterne gesamt: 27.964; Forks: 2.588; offene Issues: 132; erstellt: 2026-02-18; letzter Push: 2026-05-26; Lizenz: GPL-3.0.
- Sterne-Wachstum 24h / 7 Tage: 24h nicht verlässlich extrahiert / +11.906.
- Relative Wachstumsrate: wöchentlich ca. 42,6%.
- Warum A-Tier? Weiterhin starkes LocalAI-/Memory-Signal und strategisch relevant für private Wissenssysteme.
- Risiken: GPL-3.0, breite Claims, hohe Privacy-Oberfläche, direkte Integration ungeeignet.
- Empfehlung: **concept-only**.

### Imbad0202/academic-research-skills
- Link: https://github.com/Imbad0202/academic-research-skills
- Kategorie: Research Skills / Academic Agent Workflows
- Kurzbeschreibung: Skillset entlang research → write → review → revise → finalize.
- Sterne gesamt: 21.760; Forks: 1.846; offene Issues: 22; erstellt: 2026-02-26; letzter Push: 2026-05-25; Lizenz: NOASSERTION.
- Sterne-Wachstum 24h / 7 Tage: 24h nicht verlässlich extrahiert / +10.678.
- Relative Wachstumsrate: wöchentlich ca. 49,1%.
- Warum A-Tier? Sehr starkes Research-/VdS-Signal, aber wegen unklarer Lizenz nicht S-Tier.
- Risiken: Lizenz unklar; Qualitäts- und Quellenstandards nicht geprüft; keine direkte Skill-Übernahme.
- Empfehlung: **concept-only/watch**.

### mukul975/Anthropic-Cybersecurity-Skills
- Link: https://github.com/mukul975/Anthropic-Cybersecurity-Skills
- Kategorie: Security Skills / Agent Safety
- Kurzbeschreibung: 754 strukturierte Cybersecurity-Skills mit MITRE-/NIST-Mapping.
- Sterne gesamt: 9.545; Forks: 1.151; offene Issues: 17; erstellt: 2026-02-25; letzter Push: 2026-05-13; Lizenz: Apache-2.0.
- Sterne-Wachstum 24h / 7 Tage: +1.004 / nicht verlässlich extrahiert.
- Relative Wachstumsrate: ca. 10,5% täglich.
- Warum A-Tier? Starkes relatives Tagesmomentum und nützliche Strukturideen für Security-/RiskGate-Skills.
- Risiken: Security-Automation kann riskant sein; letzter Push nicht ganz frisch; Inhalte nicht geprüft.
- Empfehlung: **concept-only/watch**, keine operative Security-Automation.

### manaflow-ai/cmux
- Link: https://github.com/manaflow-ai/cmux
- Kategorie: macOS Agent Terminal / Developer Productivity
- Kurzbeschreibung: Ghostty-basiertes macOS-Terminal mit vertikalen Tabs und Notifications für AI Coding Agents.
- Sterne gesamt: 19.646; Forks: 1.480; offene Issues: 2.151; erstellt: 2026-01-28; letzter Push: 2026-05-26; Lizenz: NOASSERTION.
- Sterne-Wachstum 24h / 7 Tage: +603 / nicht verlässlich extrahiert.
- Relative Wachstumsrate: ca. 3,1% täglich.
- Warum A-Tier? Thema passt zu Agent-Cockpit/Swarm5-Workflows auf macOS.
- Risiken: Sehr hohe Issue-Zahl, unklare Lizenz, potenzieller Overlap mit Hermes TUI/Kanban/Subagents.
- Empfehlung: **watch**, kein Install.

## B-Tier

### rohitg00/agentmemory
- Link: https://github.com/rohitg00/agentmemory
- Kategorie: Agent Memory
- Sterne gesamt: 17.982; 7 Tage: +5.687; relative Woche: ca. 31,6%.
- Begründung: Weiter starkes Memory-Signal, aber frühere Sandbox zeigte Telemetrie-/externen First-Run-/Wildcard-Websocket-/Auto-Capture-Risiken. Entscheidung bleibt **watch**, keine Migration.

### ChromeDevTools/chrome-devtools-mcp
- Link: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Kategorie: MCP / Browser DevTools
- Sterne gesamt: 41.781; 7 Tage: +1.818; relative Woche: ca. 4,4%.
- Begründung: Offiziell, substanzstark und relevant für Browser-Debugging; wegen bestehender Hermes-Browser-Tools eher bedarfsgetrieben später prüfen.

### HKUDS/CLI-Anything
- Link: https://github.com/HKUDS/CLI-Anything
- Kategorie: Agent-native CLI / Tooling
- Sterne gesamt: 40.464; 7 Tage: +4.010; relative Woche: ca. 9,9%.
- Begründung: Strategisch interessant für agent-native Softwarebedienung, aber breite Claims und starker Overlap mit bestehenden Hermes-Tools.

### presenton/presenton
- Link: https://github.com/presenton/presenton
- Kategorie: Open Source SaaS / Präsentationen
- Sterne-Wachstum 7 Tage: +1.787; weitere Metadaten heute nicht tief geprüft.
- Begründung: Nützliches Produktivitätssignal, aber nicht zentral für Hermes-Agenten, Lernwerkstatt oder VdS-Research.

## C-Tier

- `CloakHQ/CloakBrowser` – trotz +6.167 Sternen/Woche bleibt direkte Integration blockiert: Stealth-/Anti-Bot-/Fingerprint-Patching ist Compliance- und Plattform-ToS-Risiko.
- `affaan-m/ECC` – sehr hohe Sterne (+2.025 heute), aber extrem breite Claims „skills, instincts, memory, security“ und riesige Gesamtgröße; Substanz nicht geprüft, Hype-Risiko hoch.
- `multica-ai/andrej-karpathy-skills` – +2.749 heute, aber offenbar einzelnes Skill-/Prompt-Artefakt mit sehr hoher Gesamtgröße; höchstens Prinzipienquelle.
- `hardikpandya/stop-slop` / `Leonxlnx/taste-skill` – gutes Signal gegen generische AI-Texte, aber eher kleine Prompt-/Skill-Artefakte; für Hermes nur als Schreibprinzipien interessant.
- `Fincept-Corporation/FinceptTerminal` und `shiyu-coder/Kronos` – Finance-Signale, aber keine autonome Trading- oder Investment-Integration; höchstens später Finance-Research, paper-only.

## Early Watchlist

- `ruvnet/RuView` – https://github.com/ruvnet/RuView  
  Warum interessant: Wochenmomentum +6.396; Name/Use Case heute nicht tief geprüft. A/S-Tier nur bei klarer README, Lizenz und erkennbarem Hermes-Fit.
- `dograh-hq/dograh` – https://github.com/dograh-hq/dograh  
  Warum interessant: kleineres Wochenmomentum (+693), potenziell frühes Signal. A/S-Tier nur nach Source-Check.
- `phodal/routa` – https://github.com/phodal/routa  
  Warum interessant: kleineres wöchentliches Signal (+470) im Agent-/Routing-Umfeld möglich. A/S-Tier nur bei klarem Nutzen gegenüber Hermes-Routing.
- `cursor/plugins` – https://github.com/cursor/plugins  
  Warum interessant: offizieller Plugin-Standard-Kandidat. A-Tier nur, wenn daraus interoperable Skill-/Plugin-Ideen entstehen.
- `can1357/oh-my-pi` – https://github.com/can1357/oh-my-pi  
  Warum interessant: +2.584/Woche; mögliches Tool-Harness-/Agent-Pattern. A/S-Tier nur nach sicherem Readme-/Lizenzcheck.

## Top 5 Des Tages
1. `Lum1104/Understand-Anything` – bestes neues Testsignal für Hermes-Codekontext.
2. `colbymchenry/codegraph` – stärkstes Wochenmomentum, aber P2 weiter nicht automatisch freigeben.
3. `rohitg00/ai-engineering-from-scratch` – heute stark beschleunigt, hoher Lern-/Build-Wert.
4. `anthropics/knowledge-work-plugins` – offizielles Plugin-/Skill-Ökosystemsignal.
5. `Imbad0202/academic-research-skills` – relevant für VdS-/Research-Workflows, aber Lizenz unklar.

## Veränderung gegenüber gestern
- Neue Aufsteiger: `anthropics/knowledge-work-plugins` ersetzt das gestrige Claude-Plugin-Signal als konkret geprüfter Repo-Kandidat; `manaflow-ai/cmux` kommt als macOS-Agent-Terminal-Signal hinzu.
- Weiter stark: `Understand-Anything`, `codegraph`, `ai-engineering-from-scratch`, `openhuman`, `academic-research-skills`, `agentmemory`.
- Absteiger / gebremst: `academic-research-skills` bleibt stark, fällt aber wegen unklarer Lizenz aus S-Tier auf A-Tier. `openhuman` bleibt wegen GPL-3.0/Privacy nur concept-only.
- Wiederkehrende Risiken: Skill-/Prompt-Repos wachsen extrem schnell, aber viele haben unklare Lizenz, hohe Hype-Gefahr oder überlappen stark mit Hermes-Skills.

## Hermes-Integrationsentscheidung

### RepoApply + RiskGate Übersicht

#### Understand-Anything – Entscheidung: test-now
- Nutzen für Hermes/Codex/Lernwerkstatt/Agenten: Lokaler Code-Graph könnte Codex-Handoffs, Code-Reviews und Lernwerkstatt-Codeverständnis verbessern.
- Overlap: Starker Overlap mit `codegraph-codebase-map` und CodeGraph-P1.
- Wichtigstes Risiko: hübscher Graph ohne echten Agentennutzen; unbekannte Dependencies/Netzwerkaufrufe.
- Kleinster sicherer Sandbox-Test: Public Toy-Repo in disposable dir; keine privaten Repos, keine Tokens; Installations- und Netzwerkverhalten dokumentieren; Vergleich gegen bestehendes `codegraph` qualitativ notieren.
- Graduation: bei Erfolg Cockpit-Aufgabe oder Skill-Vergleichsnotiz; noch kein Memory.
- Codewörter: RepoApply ja; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI ja; ConceptOnly nein.

#### codegraph – Entscheidung: watch / CHRIS_ENTSCHEIDET für P2
- Nutzen: Lokaler Codekontext, Tokenreduktion, bessere Agent-Handoffs.
- Overlap: Bestehender Skill `codegraph-codebase-map`; P1-Sandbox liegt vor.
- Wichtigstes Risiko: Bekanntes produktives `picomatch` High Audit Warning; P2 nicht freigegeben.
- Kleinster sicherer Sandbox-Test: Nur nach Chris-Freigabe: mittelgroßes öffentliches Repo, keine privaten Hermes-/Lernwerkstatt-Repos.
- Graduation: bestehender Skill bleibt; keine weitere Integration ohne P2-Bericht.
- Codewörter: RepoApply teilweise; RiskGate hoch; MemoryCheck nein; Swarm5 nein; LocalAI ja; ConceptOnly nein.

#### ai-engineering-from-scratch – Entscheidung: watch
- Nutzen: Lernpfade für AI Engineering, Startup-/EdTech-Kompetenz, mögliche Ideengeber für kleine MVPs.
- Overlap: Ideas/Startup- und Coding-Skills; kein Tooling-Gap.
- Wichtigstes Risiko: Educational Repo statt direkt nutzbares Werkzeug.
- Kleinster sicherer Sandbox-Test: Inhaltsreview von 1–2 Modulen, keine Installation nötig.
- Graduation: keine Integration; maximal Leseliste/Runbook, falls Chris aktiv lernen will.
- Codewörter: RepoApply nein; RiskGate niedrig; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly teilweise.

#### anthropics/knowledge-work-plugins – Entscheidung: concept-only/watch
- Nutzen: Standards und Muster für Wissensarbeits-Plugins; potenziell relevant für VdS-Research- und Schreibworkflows.
- Overlap: Hermes Skills, Research-Skills, Decision Inbox, Obsidian/Google-Workspace-Skills.
- Wichtigstes Risiko: Claude-spezifische Kopplung; Plugin-Ökosystem nicht 1:1 auf Hermes übertragen.
- Kleinster sicherer Sandbox-Test: README-/Strukturreview, keine Installation, keine OAuth-/API-Keys.
- Graduation: ggf. Skill-Prinzipien oder Runbook, keine direkte RepoApply-Integration.
- Codewörter: RepoApply nein; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.

#### openhuman – Entscheidung: concept-only
- Nutzen: Ideen für lokale private Memory, Markdown Knowledge, LocalAI und komprimierte Wissensspeicher.
- Overlap: Hermes Memory, Session Search, Skills, Obsidian-Skill.
- Wichtigstes Risiko: GPL-3.0, breite Privacy-Surface, direkte Integration gefährlich.
- Kleinster sicherer Sandbox-Test: Kein Install; nur Architektur-/README-Review mit öffentlichem Material.
- Graduation: höchstens Prinzipiennotiz/Skill-Patch, keine Codeintegration.
- Codewörter: RepoApply nein; RiskGate hoch; MemoryCheck ja; Swarm5 nein; LocalAI ja; ConceptOnly ja.

#### academic-research-skills – Entscheidung: concept-only/watch
- Nutzen: VdS-/wissenschaftliche Recherche-Workflows, Review-Schleifen, Quellenarbeit.
- Overlap: Hermes Research-Skills und VdS-Kontext.
- Wichtigstes Risiko: Lizenz NOASSERTION; direkte Übernahme von Skills wäre riskant.
- Kleinster sicherer Sandbox-Test: README-/Strukturreview; 3–5 Prinzipien eigenständig formulieren, keine Dateien kopieren.
- Graduation: ggf. Research-Skill-Patch, wenn Prinzipien sauber und lizenzsicher paraphrasiert sind.
- Codewörter: RepoApply nein; RiskGate mittel/hoch; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.

## Quellen
- GitHub Trending daily: https://github.com/trending?since=daily
- GitHub Trending weekly: https://github.com/trending?since=weekly
- GitHub API Repo-Metadaten: `https://api.github.com/repos/<owner>/<repo>` für die oben genannten Kandidaten.
- Vortagsvergleich: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-25.md`

## Integration Result
- Projects reviewed: `Understand-Anything`, `codegraph`, `ai-engineering-from-scratch`, `knowledge-work-plugins`, `openhuman`, `academic-research-skills`, `Anthropic-Cybersecurity-Skills`, `cmux`, `agentmemory`, `chrome-devtools-mcp`, `CLI-Anything`, plus C-/Watchlist-Kandidaten.
- Test-now: `Lum1104/Understand-Anything` als sicherer Sandbox-Vergleich.
- Watch: `codegraph`, `ai-engineering-from-scratch`, `Anthropic-Cybersecurity-Skills`, `cmux`, `agentmemory`, `chrome-devtools-mcp`, `CLI-Anything`.
- Block: `CloakHQ/CloakBrowser` für direkte Hermes-Integration.
- Files changed: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-26.md`
- Hermes benefit: Besser priorisierte Auswahl zwischen Code-Kontext-Tools, Skill-Prinzipien und LocalAI/Memory-Ideen.
- Remaining risks: GitHub-Trending-Zahlen sind Momentaufnahmen; README-/Dependency-/Security-Checks für neue Kandidaten noch nicht erfolgt.
- Next action: `Understand-Anything` nur in disposable Sandbox prüfen, wenn Chris keinen Einwand hat.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Sandbox-Readme-/Installationscheck fuer `Lum1104/Understand-Anything` in disposable Public-Toy-Repo vorbereiten, ohne private Daten und ohne Tokens.
- CHRIS_ENTSCHEIDET: Ob `codegraph` P2 trotz bekanntem `picomatch` High Audit Warning weiterverfolgt werden soll; ob `Understand-Anything` praktisch getestet werden darf.
- BEOBACHTEN: `anthropics/knowledge-work-plugins`, `academic-research-skills`, `openhuman`, `agentmemory`, `ChromeDevTools/chrome-devtools-mcp`, `CLI-Anything`, `cmux`.
- SPAETER: Finance-Repos wie `FinceptTerminal`/`Kronos` nur als paper-only Finance-Research prüfen; `presenton` nur bei konkretem Präsentationsbedarf.
- BLOCKIERT: Keine echten Blocker; Detailbewertung einzelner Repos erst nach README-/License-/Dependency-Review.
- NICHT_TUN: `CloakHQ/CloakBrowser` oder andere Stealth-/Anti-Bot-Browser in Hermes integrieren; Skill-Repos ungeprüft kopieren; private Hermes-/Lernwerkstatt-Repos für Sandboxes nutzen.
- Naechste kleinste Aktion: `Understand-Anything` Source-Check mit README, License, package/dependency scan und minimalem public-data Sandboxplan.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-26.md`
