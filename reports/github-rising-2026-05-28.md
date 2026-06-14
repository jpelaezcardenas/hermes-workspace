# GitHub Rising Projects Tierlist – 2026-05-28

## Kurzfazit
Die heutige Lage wird klar von **Agentic Coding, Code-Kontext, lokalen LLM-/Inference-Stacks und MCP-/Browser-Tooling** dominiert. Besonders auffällig sind `opencode`, `claude-code`, `codex`, `llama.cpp` und `open-webui` als Top-Mover im 28-Tage-Fenster. Das Signal ist stark, aber nicht nur nach Sternen zu lesen: Die spannendsten Projekte sind oft die, die bei moderater Gesamtgröße schon sehr hohe relative Dynamik zeigen.

Datenbasis: OSSInsight Trending AI (28-Tage-Movers und Top-Stars), GitHub-Topic-Übersichten, GitHub-API-Metadaten für bereits bekannte Repos aus dem Hermes-Kontext, sowie der Vortagsbericht vom 2026-05-26. 24h-/7d-Zahlen sind, wo verfügbar, Trend-/Hub-Metriken und keine vollständige GitHub-Historie.

## S-Tier

### 1) anomalyco/opencode
- Link: https://github.com/anomalyco/opencode
- Kategorie: Coding Agents / Terminal Agent
- Kurzbeschreibung: Coding-Agent-Tooling für agentisches Entwickeln im Terminal.
- Sterne gesamt: nicht verlässlich aus der heutigen Trendquelle extrahiert
- Sterne-Wachstum 24h / 7 Tage: nicht verlässlich angegeben; Top-Mover im 28-Tage-Fenster mit ca. +1.4k
- Relative Wachstumsrate: qualitativ sehr hoch; für die Größe des Projekts auffällig stark
- Warum S-Tier? Das ist ein klarer „Agentic Coding“-Gewinner mit starkem Momentum. Die Richtung passt direkt zu Hermes/Codex-Workflows.
- Mögliche Risiken: Starker Overlap mit bestehenden Coding-Agenten; Nutzen hängt an Installierbarkeit, Stabilität und Tool-Qualität.
- Empfehlung: **anschauen / testen**

### 2) anthropics/claude-code
- Link: https://github.com/anthropics/claude-code
- Kategorie: Coding Agents
- Kurzbeschreibung: Terminal-basierter Coding-Agent aus dem Anthropic-Ökosystem.
- Sterne gesamt: nicht verlässlich aus der heutigen Trendquelle extrahiert
- Sterne-Wachstum 24h / 7 Tage: Top-Mover im 28-Tage-Fenster mit ca. +786
- Relative Wachstumsrate: hoch, aber eher als Ökosystem-Signal denn als kleines Wachstumswunder
- Warum S-Tier? Sehr starkes Markt- und Themen-Signal; der Bereich ist eines der zentralen aktuellen Felder für DevTools und Agent-Workflows.
- Mögliche Risiken: Starkes Lock-in-/Ökosystem-Risiko; für Hermes nur als Vergleichs- und Ideenquelle sinnvoll.
- Empfehlung: **beobachten / punktuell testen**

### 3) openai/codex
- Link: https://github.com/openai/codex
- Kategorie: Coding Agents
- Kurzbeschreibung: OpenAI-Codex-Tooling für agentisches Programmieren.
- Sterne gesamt: nicht verlässlich aus der heutigen Trendquelle extrahiert
- Sterne-Wachstum 24h / 7 Tage: Top-Mover im 28-Tage-Fenster mit ca. +742
- Relative Wachstumsrate: hoch; aktuell eines der stärksten Signale im Coding-Agent-Markt
- Warum S-Tier? Sehr hoher strategischer Relevanzwert für alle Agent- und Coding-Workflows.
- Mögliche Risiken: Overlap mit bestehenden Hermes-/Codex-Workflows; Risiko ist eher Produkt- als Technik-Overhead.
- Empfehlung: **anschauen / vergleichen**

### 4) ggml-org/llama.cpp
- Link: https://github.com/ggml-org/llama.cpp
- Kategorie: Local Inference / LLM Infrastructure
- Kurzbeschreibung: De-facto-Standard für lokale LLM-Inferenz.
- Sterne gesamt: 90.410
- Sterne-Wachstum 28 Tage: +581
- Relative Wachstumsrate: ca. 0,64% in 28 Tagen
- Warum S-Tier? Die absolute Größe ist groß, aber das Projekt bleibt strategisch zentral für Local AI, Offline-Inferenz und effiziente Bereitstellung.
- Mögliche Risiken: Reifegrad ist hoch; eher Infrastruktur-Standard als „frühes“ Rising-Projekt.
- Empfehlung: **beobachten**

### 5) open-webui/open-webui
- Link: https://github.com/open-webui/open-webui
- Kategorie: Local AI / LLM UI
- Kurzbeschreibung: Beliebte Web-Oberfläche für lokale und API-gestützte LLM-Nutzung.
- Sterne gesamt: 105.913
- Sterne-Wachstum 28 Tage: +425
- Relative Wachstumsrate: ca. 0,40% in 28 Tagen
- Warum S-Tier? Trotz Reifegrad weiter sehr relevant, weil es lokale AI für breite Nutzergruppen zugänglich macht.
- Mögliche Risiken: Wegen Größe eher Produktstandard als frühes Rising-Signal.
- Empfehlung: **beobachten**

## A-Tier

### 1) langgenius/dify
- Link: https://github.com/langgenius/dify
- Kategorie: LLM Apps / Orchestration
- Kurzbeschreibung: Plattform für den Bau von LLM-Apps.
- Sterne gesamt: 111.403
- Sterne-Wachstum 28 Tage: +350
- Relative Wachstumsrate: ca. 0,31% in 28 Tagen
- Warum A-Tier? Breiter Marktfit, produktionsnah, hohe Relevanz für App-Builder und interne AI-Workflows.
- Risiken: Schon recht groß; Innovation weniger „früh“ als bei kleineren Projekten.
- Empfehlung: **beobachten**

### 2) infiniflow/ragflow
- Link: https://github.com/infiniflow/ragflow
- Kategorie: RAG / Retrieval Infrastructure
- Kurzbeschreibung: RAG-Engine mit starkem Fokus auf produktive Wissenssysteme.
- Sterne gesamt: 61.426
- Sterne-Wachstum 28 Tage: +229
- Relative Wachstumsrate: ca. 0,37% in 28 Tagen
- Warum A-Tier? RAG bleibt strategisch relevant; gutes Signal für lokale/recherchebasierte Wissenssysteme.
- Risiken: Markt ist umkämpft; Substanz entscheidet stärker als Trend.
- Empfehlung: **beobachten**

### 3) All-Hands-AI/OpenHands
- Link: https://github.com/All-Hands-AI/OpenHands
- Kategorie: Coding Agents
- Kurzbeschreibung: Offener Agent für softwarebezogene Aufgaben.
- Sterne gesamt: 60.544
- Sterne-Wachstum 28 Tage: +233
- Relative Wachstumsrate: ca. 0,38% in 28 Tagen
- Warum A-Tier? Relevant für agentisches Entwickeln und Automatisierung, mit klarer Community-Basis.
- Risiken: Starker Wettbewerb, Feature-Overlap mit anderen Agenten.
- Empfehlung: **beobachten**

### 4) modelcontextprotocol/servers
- Link: https://github.com/modelcontextprotocol/servers
- Kategorie: MCP / Infrastructure
- Kurzbeschreibung: Offizielle Sammlung von MCP-Servern.
- Sterne gesamt: nicht in der heutigen Trendquelle sauber extrahiert
- Sterne-Wachstum: nicht präzise angegeben
- Warum A-Tier? MCP bleibt eine der wichtigsten Integrationsachsen für Agenten, Browser, Tools und lokale Workflows.
- Risiken: Abhängig von Ökosystem-Adoption; viele Server variieren stark in Qualität.
- Empfehlung: **beobachten**

### 5) browser-use/browser-use
- Link: https://github.com/browser-use/browser-use
- Kategorie: Browser Automation / AI Agents
- Kurzbeschreibung: Macht Websites für Agenten nutzbar.
- Sterne gesamt: nicht verlässlich aus der heutigen Trendquelle extrahiert
- Sterne-Wachstum: nicht präzise angegeben
- Warum A-Tier? Strategisch stark für legitime Browser-Automation, Testing und agentische Web-Workflows.
- Risiken: Browser-Automation ist schnell compliance- und stabilitätskritisch.
- Empfehlung: **beobachten**

## B-Tier

### 1) ollama/ollama
- Link: https://github.com/ollama/ollama
- Kategorie: Local AI / Inference
- Kurzbeschreibung: Beliebte lokale LLM-Laufzeit.
- Sterne gesamt: 147.751
- Sterne-Wachstum 28 Tage: +235
- Relative Wachstumsrate: ca. 0,16% in 28 Tagen
- Warum B-Tier? Sehr wichtig, aber als reifes Ökosystem eher Stabilitäts- als Rising-Signal.
- Empfehlung: **beobachten**

### 2) zed-industries/zed
- Link: https://github.com/zed-industries/zed
- Kategorie: Coding Environment
- Kurzbeschreibung: Schneller, moderner Editor mit AI-Relevanz.
- Sterne gesamt: 68.623
- Sterne-Wachstum 28 Tage: +354
- Relative Wachstumsrate: ca. 0,52% in 28 Tagen
- Warum B-Tier? Starker Dev-Tool-Kandidat, aber als Projekt bereits reifer.
- Empfehlung: **beobachten**

### 3) nomic-ai/gpt4all
- Link: https://github.com/nomic-ai/gpt4all
- Kategorie: Local AI
- Kurzbeschreibung: Lokale LLM-Nutzung für breite Anwender.
- Sterne gesamt: 73.243
- Sterne-Wachstum 28 Tage: +14
- Relative Wachstumsrate: praktisch stagnierend im Vergleich zur Größe
- Warum B-Tier? Relevanz bleibt, Momentum aktuell aber schwach.
- Empfehlung: **beobachten**

## C-Tier

- `Significant-Gravitas/AutoGPT` – sehr groß, aber Momentum schwach im Vergleich zur Größe; historisch wichtig, heute eher Referenz als Rising-Signal.
- `microsoft/autogen` – relevant und etabliert, aber nicht mehr klar „aufstrebend“.
- `langchain-ai/langchain` – marktprägend, aber als Trend-Signal zu reif.
- `milvus-io/milvus` / `facebookresearch/faiss` – technisch wichtig, aber ebenfalls reif.

## Early Watchlist

### 1) upstash/context7
- Link: https://github.com/upstash/context7
- Warum interessant? Starkes MCP-/DevTooling-Signal, wahrscheinlich nützlich für Agenten mit besserem Kontextzugriff.
- Was müsste passieren, damit es A- oder S-Tier wird? Mehr öffentlich sichtbare Adoption, klare Integrationen und belastbare Sandbox-Nachweise.

### 2) open-webui/open-webui Plugins/Ökosystem
- Link: https://github.com/open-webui/open-webui
- Warum interessant? Ökosystemeffekte rund um lokale AI sind oft später wichtiger als die Kern-App selbst.
- Was müsste passieren? Klare Erweiterungsstandards und wiederverwendbare Integrationsmuster.

### 3) browser-use/browser-use
- Link: https://github.com/browser-use/browser-use
- Warum interessant? Browser-Automation bleibt eines der heißesten, aber auch riskantesten Felder.
- Was müsste passieren? Stabilere, legitim nutzbare Workflows ohne Compliance-/ToS-Fallen.

### 4) Firecrawl / web extraction tooling
- Link: https://github.com/firecrawl/firecrawl
- Warum interessant? Webdaten-Aufbereitung ist Grundinfrastruktur für Agenten.
- Was müsste passieren? Noch klarere lokale oder kontrollierbare Betriebsmodelle.

### 5) tinyhumansai/openhuman
- Link: https://github.com/tinyhumansai/openhuman
- Warum interessant? LocalAI-/Memory-/Personal-AI-Signal bleibt strategisch relevant.
- Was müsste passieren? Lizenz-/Privacy-Risiko müsste sauberer sein, dazu belastbare Architektur und bessere Abgrenzung gegen Hype.

## Top 5 Des Tages
1. `anomalyco/opencode`
2. `anthropics/claude-code`
3. `openai/codex`
4. `ggml-org/llama.cpp`
5. `open-webui/open-webui`

## Veränderung gegenüber gestern
- Neue starke Spitzenreiter: `opencode`, `claude-code` und `openai/codex` tauchen als dominierende Coding-Agent-Signale auf.
- Lokale Inferenz bleibt stabil stark: `llama.cpp` und `open-webui` halten sich mit soliden 28-Tage-Zuwächsen.
- Gegenüber dem 2026-05-26-Bericht verschiebt sich der Fokus stärker von Code-Graph-/Skill-Repos hin zu **Terminal Coding Agents** und **lokalen AI-Inference-Stacks**.
- Frühere Hermes-spezifische Kandidaten wie `codegraph`, `openhuman`, `academic-research-skills` und `agentmemory` sind weiterhin relevant, liegen heute aber eher im Beobachtungs- als im Zentrum des Trendbilds.

## Hermes-Integrationsentscheidung

### RepoApply + RiskGate Übersicht

#### anomalyco/opencode – Entscheidung: test-now
- Nutzen für Hermes: Direkt relevant für Coding-Agent-Workflows, Terminal-Automation und mögliche Codex/Hermes-Handoffs.
- Overlap: Teilweise hoch mit bestehenden Coding-Agenten und Hermes-Subagenten.
- Wichtigstes Risiko: Tool könnte nur eine weitere Agenten-Frontendschicht sein; echter Mehrwert muss in Sandbox bewiesen werden.
- Kleinster sicherer Sandbox-Test: Public Toy-Repo, kein privates Repository, keine Tokens, lokale Installation, dokumentierte Netzwerkaufrufe.
- Ob daraus etwas werden sollte: Wenn der Test überzeugt, eher **Runbook** oder **Cockpit-Aufgabe**, nicht direkt Memory.
- Codewörter: RepoApply ja; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI teilweise; ConceptOnly nein.

#### anthropics/claude-code – Entscheidung: watch
- Nutzen für Hermes: Vergleichsmaßstab für Terminal-Coding-Agenten und Prompt-/Tool-UX.
- Overlap: Sehr hoch mit Hermes/Codex-Routing, daher als Benchmark nützlich.
- Wichtigstes Risiko: Ökosystem-Lock-in; direkte Integration ist selten sinnvoll.
- Kleinster sicherer Sandbox-Test: Nur README- und Workflow-Vergleich, kein produktiver Umbau.
- Ob daraus etwas werden sollte: höchstens **ConceptOnly** oder ein Vergleichs-Runbook.
- Codewörter: RepoApply nein; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.

#### openai/codex – Entscheidung: watch
- Nutzen für Hermes: Referenz für Coding-Agent-Verhalten und CLI-Workflows.
- Overlap: Sehr hoch, weil Hermes bereits über Codex-/Agent-Routing denkt.
- Wichtigstes Risiko: Blinder Nachbau ohne Zusatznutzen.
- Kleinster sicherer Sandbox-Test: nur Beobachtung von UX, Installation und Workflow-Design.
- Ob daraus etwas werden sollte: keine Integration, eher **ConceptOnly**.
- Codewörter: RepoApply nein; RiskGate mittel; MemoryCheck nein; Swarm5 nein; LocalAI nein; ConceptOnly ja.

#### ggml-org/llama.cpp – Entscheidung: watch
- Nutzen für Hermes: Weiterhin zentral für lokale Modellnutzung, Datenschutz und Offline-Szenarien.
- Overlap: Hoch mit LocalAI-/Inference-Strategien.
- Wichtigstes Risiko: Als Infrastrukturstandard wenig „Rising“-Charakter, eher Basistechnologie.
- Kleinster sicherer Sandbox-Test: nur Benchmark-/Kompatibilitätscheck mit öffentlichem Modell.
- Ob daraus etwas werden sollte: eher **Runbook** oder Infrastruktur-Referenz.
- Codewörter: RepoApply nein; RiskGate niedrig; MemoryCheck nein; Swarm5 nein; LocalAI ja; ConceptOnly nein.

#### open-webui/open-webui – Entscheidung: watch
- Nutzen für Hermes: UI-Referenz für LocalAI und private LLM-Workflows.
- Overlap: Hoch mit bestehenden UI-/Gateway-/Workspace-Ideen.
- Wichtigstes Risiko: Frontend ist nützlich, aber Integration kann schnell redundant werden.
- Kleinster sicherer Sandbox-Test: nur Public-Model-/UI-Review.
- Ob daraus etwas werden sollte: eher **ConceptOnly** oder UI-Ideen für Cockpit.
- Codewörter: RepoApply nein; RiskGate niedrig; MemoryCheck nein; Swarm5 nein; LocalAI ja; ConceptOnly ja.

#### codegraph / openhuman / academic-research-skills – Entscheidung: watch / concept-only
- Nutzen: bleiben strategisch relevant für Codekontext, Local Memory und Research-Workflows.
- Overlap: hoch mit bestehenden Hermes-Fähigkeiten und Regeln.
- Wichtigstes Risiko: bei diesen Repos ist die Hürde nicht der Trend, sondern Risiko-/Lizenz-/Mehrwertprüfung.
- Kleinster sicherer Sandbox-Test: nur öffentliche README-/Architekturprüfung.
- Ob daraus etwas werden sollte: eher **MemoryCheck** bei stabilen Erkenntnissen oder **ConceptOnly**; keine direkte Rebuild-Aktion.
- Codewörter: RepoApply nein; RiskGate hoch; MemoryCheck teilweise; Swarm5 nein; LocalAI teilweise; ConceptOnly ja.

## Quellen
- GitHub Trending AI / OSSInsight: https://ossinsight.io/trending/ai
- GitHub Topic AI Agents: https://github.com/topics/ai-agents
- GitHub Topic Multi-Agent Systems: https://github.com/topics/multi-agent-systems
- Vorheriger Hermes-Bericht: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-26.md`

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: `anomalyco/opencode` als kleinsten Sandbox-Kandidat mit öffentlichem Toy-Repo und ohne private Daten oder Tokens vorprüfen.
- CHRIS_ENTSCHEIDET: Ob wir `claude-code` / `codex` nur als Benchmark beobachten oder ein kleines Vergleichs-Runbook anlegen; ob Browser-Automation-Tools wie `browser-use` weiter verfolgt werden sollen.
- BEOBACHTEN: `llama.cpp`, `open-webui`, `dify`, `ragflow`, `OpenHands`, `MCP servers`, `browser-use`, `firecrawl`, `codegraph`, `openhuman`.
- SPAETER: Reife Infrastruktur-Repos wie `ollama`, `langchain`, `AutoGPT`, `Autogen` nur bei konkretem Bedarf erneut priorisieren.
- BLOCKIERT: Keine echten Blocker; für tiefe Bewertung fehlen bei mehreren Kandidaten aktuell noch belastbare Lizenz-/README-/Dependency-Checks.
- NICHT_TUN: Keine Stealth-/Anti-Bot-Repos oder Credential-lastige Integrationen blind übernehmen; keine direkte Produktionsintegration von Hype-Repos nur wegen hoher Sterne.
- Naechste kleinste Aktion: `anomalyco/opencode` README, Lizenz und Installationsweg gegen einen öffentlichen Toy-Repo-Sandboxtest prüfen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-28.md`
