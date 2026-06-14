# GitHub Rising Integration Report — 2026-05-13

Status: kontrollierte Integrationsspuren, keine produktive Installation.
Arbeitsmodus: Research + Coder-Sandboxplanung + Finance-Safety-Analyse.
Datenschutz: keine Schülerdaten, keine privaten Dokumente, keine echten API-Keys, keine produktiven Hermes-Änderungen.

## Kurzfazit

Test-Now:
- LearningCircuit/local-deep-research — lokale öffentliche Quellenrecherche/RAG-Sandbox.
- millionco/react-doctor — Qualitätscheck für Hermes-erzeugte React-Apps, zuerst nur read-only/synthetisch.
- VectifyAI/PageIndex — RAG/Document-Indexing-Check mit synthetischen/öffentlichen Dokumenten.

Watch:
- Hmbown/DeepSeek-TUI — Coding-Agent-Vergleich nur isoliert, kein Ersatz für Hermes/Codex.
- rohitg00/agentmemory — nur Watchlist/Memory-Policy-Referenz wegen Test 2026-05-12.
- HKUDS/AI-Trader — Finance-Research/Paper-only, wegen Copy-Trading-/Broker-Nähe nur Watch.
- TauricResearch/TradingAgents — Go für Research-/Paper-Sandbox, Watch bei Live-Daten.

Block:
- CloakHQ/CloakBrowser — keine direkte Hermes-Integration wegen Stealth-/Anti-Bot-/Captcha-/Compliance-Risiko.

## Projektentscheidungen

| Projekt | Lane | Entscheidung | Begründung | Go/Watch/No-Go |
|---|---|---|---|---|
| LearningCircuit/local-deep-research | Test-Now | Sandbox-Test vorbereiten | Hoher Nutzen für lokale öffentliche Quellenrecherche/RAG; MIT; lokale/Cloud-Modi; Netzwerk- und LLM-Provider bewusst kontrollieren. | Go für öffentliche/synthetische Sandbox; Watch für private Docs; No-Go für Schüler-/VdS-Interna. |
| millionco/react-doctor | Test-Now | Read-only Sandbox-Test vorbereiten | Passt als Qualitätscheck für React/Lernwerkstatt-Apps; npx/npm-Supply-Chain und Schreibmodus `install` beachten. | Go für synthetische oder bereits öffentliche Testrepos; Watch für echte Projektrepos; No-Go für unreviewed `install` oder CI-Kommentare. |
| Hmbown/DeepSeek-TUI | Watch/Test begrenzt | Erst Architektur- und Mock-Sandbox | Coding-Agent mit Shell-, Git-, Web-, MCP- und YOLO-Funktionen; Side-Effect-Fläche hoch. | Watch; Go nur in Throwaway-Repo/Container ohne Secrets; No-Go für YOLO, produktive Repos, echte API-Keys. |
| VectifyAI/PageIndex | Test-Now | Synthetischer Document-Indexing-Test vorbereiten | Interessanter vectorless/hierarchischer RAG-Ansatz; Default-Setup kann OpenAI/API-Nutzung enthalten. | Go mit synthetischen/öffentlichen Dokumenten; Watch bei Cloud-LLM; No-Go für private/sensible Dokumente. |
| rohitg00/agentmemory | Watch | Keine Integration | Voriger Test 2026-05-12: Telemetrie/Netzwerk-/WebSocket-/Auto-Memory-Risiken. Als Memory-Policy-Referenz nützlich. | Watch; No-Go für produktive Hermes-Memory-Migration. |
| HKUDS/AI-Trader | Finance Watch | Paper-/Benchmark-Studium, keine Ausführung | Stark in Richtung automatisiertes Trading, Signale, Copy-Trading, Broker/Exchange-Nähe. | Watch für Paper-only; No-Go für Broker-Keys, Wallets, Webhooks, Copy-Trading, Realgeld. |
| TauricResearch/TradingAgents | Finance Research | Sichere Paper-Sandbox möglich | Multi-Agent-Finanzanalyse mit Research-/Simulation-Fokus; Performance-Claims vorsichtig behandeln. | Go für Research-/Paper-Sandbox; Watch bei Live-Daten; No-Go für autonome Orders/Broker. |
| CloakHQ/CloakBrowser | Block | Direkte Integration blockiert | Explizite Stealth-/Anti-Bot-/Captcha-/Cloudflare-Bypass-Positionierung; Supply-Chain/Binary-Lizenz-Fragen. | No-Go für Hermes-Integration. |

## Test-Now: kontrollierte nächste Sandbox-Tests

1. local-deep-research
- Ziel: lokale Recherche/RAG nur mit öffentlichen oder synthetischen Quellen.
- Nächster Test: README/Lizenz/Startbefehle prüfen, dann in sandbox/local-deep-research mit Dummy-Daten vorbereiten.
- Erlaubt: localhost, öffentliche Testdokumente, lokale Logs.
- Verboten: Schülerdaten, VdS-Interna, echte Provider-Keys im Ersttest.

2. react-doctor
- Ziel: Qualitätsbericht auf einem frisch erzeugten Mini-React-Projekt.
- Nächster Test: Tool-Version pinnen, `npx`-Befehl vorab prüfen, nur JSON/Report-Modus, kein `install`.
- Erlaubt: synthetisches React-Demo.
- Verboten: produktive Lernwerkstatt-App ohne Review, npm tokens, CI-Kommentare.

3. PageIndex
- Ziel: Indexing-/Retrieval-Qualität mit synthetischen Markdown/HTML/PDF-Dateien vergleichen.
- Nächster Test: lokale Beispiel-Dokumente erstellen, Cloud-LLM vermeiden oder bewusst als Risiko markieren.
- Erlaubt: öffentliche/synthetische Dateien.
- Verboten: private PDFs, Schüler-/Eltern-/Verbandsdaten.

4. DeepSeek-TUI
- Ziel: Coding-Agent-Vergleich nur gegen Mock-/Throwaway-Repo.
- Nächster Test: Architektur lesen, Konfiguration auf Provider/History/Shell/Yolo prüfen.
- Erlaubt: Throwaway-Repo, kein Secret, kein YOLO.
- Verboten: produktive Hermes-Repos, echte API-Keys, automatische Shell-Ausführung.

## Watch

- agentmemory: bleibt Policy-Referenz. Wertvoll für Fragen wie: Was darf Memory speichern? Wie werden Löschung, Export, Telemetrie, Ports, Auto-Capture begrenzt?
- AI-Trader: nur passives Paper-/Benchmark-Studium oder isolierte Paper-Simulation. Besonders kritisch: Copy-Trading, Auto-Follow, Position Sync, Broker-/Exchange-Bezüge.
- TradingAgents: geeignet für Finanz-Lernanalyse/Paper-Szenarien, aber nicht als Anlageentscheidungssystem. Performance-Claims sind nicht validiertes Investmentwissen.

## Block

- CloakBrowser: keine direkte Integration, kein Ausführen, kein Dependency-Einbau. Grund: Stealth-/Anti-Bot-/Captcha-/Bypass-Fokus, potenzielle Plattform-ToS-/Compliance-Probleme, gepatchte Binary/Supply-Chain-Fragen.

## Risiken

Allgemein:
- Supply-Chain-Risiko bei `npx`, pip, Docker Images und Auto-Downloads.
- Cloud-LLM-/API-Risiko: Prompts und Dokumente können Drittanbieter erreichen.
- Datenschutz: RAG/Memory/Indexing kann sensible Inhalte dauerhaft speichern.
- Netzwerk: Web-Recherche/Crawling kann unerwartete externe Calls auslösen.
- Lokale Server: keine Bindung an 0.0.0.0 oder öffentliche Interfaces.

Finance:
- Keine Anlageberatung, keine Gewissheit.
- Backtest-Bias, Look-ahead, Survivorship Bias, Overfitting, Slippage-/Kostenlücken.
- Keine Broker-Keys, Wallets, Orders, Webhooks, Copy-Trading, Auto-Follow.

Coding-Agenten:
- Shell-/Datei-/Git-Zugriffe nur in Wegwerfverzeichnissen.
- Kein YOLO/Auto-Approve.
- Keine Secrets in Prompts, Logs oder History.

## Angelegte Dateien

Basisordner:
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13

Kontrollierte Integrationsspuren:
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/README.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/manifests/candidates.yaml
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/checks/preflight-checklist.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/checks/abort-rules.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/synthetic-data/README.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/runbooks/local-deep-research.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/runbooks/react-doctor.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/runbooks/deepseek-tui.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/runbooks/pageindex.md
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/.gitkeep
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/reports/integration-report.md

## Quellen

- LearningCircuit/local-deep-research: https://github.com/LearningCircuit/local-deep-research
- millionco/react-doctor: https://github.com/millionco/react-doctor
- Hmbown/DeepSeek-TUI: https://github.com/Hmbown/DeepSeek-TUI
- VectifyAI/PageIndex: https://github.com/VectifyAI/PageIndex
- rohitg00/agentmemory: https://github.com/rohitg00/agentmemory
- CloakHQ/CloakBrowser: https://github.com/CloakHQ/CloakBrowser
- HKUDS/AI-Trader: https://github.com/HKUDS/AI-Trader
- AI-Trader Paper: https://arxiv.org/abs/2512.10971
- AI-Trader User Guide: https://github.com/HKUDS/AI-Trader/blob/main/docs/README_USER.md
- TauricResearch/TradingAgents: https://github.com/tauricresearch/tradingagents
- TradingAgents Projektseite: https://tradingagents-ai.github.io/
- TradingAgents Paper: https://arxiv.org/pdf/2412.20138

## Konkreter nächster Sandbox-Test

Empfohlen als erster Test: react-doctor auf synthetischem Mini-React-Projekt.

Warum zuerst:
- kleiner Scope,
- schnell messbarer Nutzen für Hermes-erzeugte Apps,
- kein RAG-/Dokumenten-/Memory-Datenschutzrisiko,
- klare Abbruchregeln.

Runbook:
- /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/runbooks/react-doctor.md

Vor Ausführung zwingend:
- Tool-Version pinnen,
- npm-Paketinhalt/Skripte prüfen,
- nur synthetisches Projekt,
- Report unter sandbox/_reports,
- kein `install`, keine CI-Integration, keine produktiven Repos.

## Qualitätscheck

- Produktive Installation: nicht durchgeführt.
- Repos geklont: nicht durchgeführt.
- API-Keys: keine verwendet.
- Private Daten: keine verwendet.
- Schülerdaten: keine verwendet.
- Trading-Ausführung: blockiert.
- Stealth-Browser-Integration: blockiert.
- Menschliche Freigabe vor tatsächlichem Sandbox-Test weiterhin erforderlich.
