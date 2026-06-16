# Agent Tools Scout — 2026-06-15

Kurzfazit: Ein konkreter, risikoarmer Test lohnt sich: OpenAI Codex `rust-v0.139.0` sollte read-only gegen Chris' Codex-Handoff-Regeln geprueft werden. Zwei weitere Entwicklungen sind relevant, aber vorerst nur beobachten. Keine Installationen, keine Tokens, keine privaten Repos.

## Finding 1 — OpenAI Codex `rust-v0.139.0`
- Link: https://github.com/openai/codex/releases/tag/rust-v0.139.0
- Quelle/Fakt: Release vom 2026-06-09; nennt u. a. standalone Websuche im Code-Modus, bessere Erhaltung von `oneOf`/`allOf` in Tool-/Connector-Schemas und erweiterte `codex doctor`-Diagnose mit redigierten JSON-Rohwerten.
- Warum relevant fuer meine Systeme: Direkter Nutzen fuer Codex-Handoffs, Kanban-Stabilitaet, MCP-Tool-Kompatibilitaet und lokale Diagnose bei Coder-Agent-Problemen. Besonders relevant, weil Chris Handoffs klein, pruefbar und sicher halten will.
- Risiko: mittel.
- Konkrete naechste Aktion: testen — aber nur read-only als Sandbox-Reviewkarte, ohne Update/Install/Login/private Repos.

## Finding 2 — Microsoft Playwright MCP `v0.0.76`
- Link: https://github.com/microsoft/playwright-mcp/releases/tag/v0.0.76
- Quelle/Fakt: Release vom 2026-06-10; nennt neue Video-Action-Overlay-Tools, `remoteEndpoint` mit `ConnectOptions` und `--output-max-size` fuer begrenzte Tool-Antworten.
- Warum relevant fuer meine Systeme: Potenziell nuetzlich fuer Browser-QA und visuelle Belege bei Lernwerkstatt-/Leseapp-Tests. `--output-max-size` passt zur Hermes-Stabilitaet, weil grosse Browser-/MCP-Ausgaben begrenzt werden koennen.
- Risiko: mittel.
- Konkrete naechste Aktion: beobachten — kein sofortiger Test, weil Hermes bereits eigene Browser- und Vision-Tools nutzt und ein MCP-Server-Setup/Integration zusaetzliche Oberflaeche schafft.

## Finding 3 — Hermes Agent Main: File-Tools respektieren Session-CWD
- Link: https://github.com/NousResearch/hermes-agent/commit/d6a8d9dca
- Quelle/Fakt: Aktueller Hermes-Commit `fix(tools): respect session cwd in file tools`, im lokalen Fetch sichtbar auf `origin/main` am 2026-06-15.
- Warum relevant fuer meine Systeme: Direkt relevant fuer Skills, Kanban-Tasks und Codex-/Hermes-Handoffs, weil falsches Arbeitsverzeichnis bei Datei-Tools zu Berichten oder Artefakten am falschen Ort fuehren kann.
- Risiko: niedrig.
- Konkrete naechste Aktion: beobachten — erst nach Release/Update-Fenster uebernehmen; heute keine Hermes-Aktualisierung im Cron.

## Ignorieren
- Allgemeine OpenAI-Partner-/Enterprise-News ohne direkte technische Umsetzung fuer Schulwerkstatt, Memory, Skills oder Kanban.
- Neue, kleine Browser-Agent-Repos ohne Lizenz/Stars/Dokumentation oder mit unklarem QA-Nutzen.
- Credential-, Scraping-, Stealth-, Trading- oder Account-Linking-Tools.

## Empfehlung
Hermes/Codex sollte als Naechstes nur die Codex-Release `rust-v0.139.0` read-only pruefen und daraus hoechstens eine kleine Anpassung der Codex-Handoff-Regel ableiten. Keine Installation, kein Upgrade und keine produktive Integration in diesem Lauf.

## Befehlskarte
- Heute testen: Die Sandbox-Testkarte lesen und lokal nur pruefen: `codex --version`, optional `codex doctor`, danach entscheiden, ob die Codex-Handoff-Regel angepasst werden soll.
- Sandbox-Artefakt: `/Users/zondrius/hermes-workspace/reports/agent-tools-scout/tool-sandbox-card-2026-06-15.md`
- Codex-Befehl: `/goal Fuehre einen read-only Review der Codex-Release rust-v0.139.0 anhand von /Users/zondrius/hermes-workspace/reports/agent-tools-scout/tool-sandbox-card-2026-06-15.md durch. Keine Installation, keine Updates, keine Tokens, keine privaten Repos. Ergebnis: kurze Entscheidung, ob codex-handoff oder eine lokale Codex-Pruefregel angepasst werden sollte.`
- Stop-/Park-Befehl: Parken, wenn ein Update, Login, Token, privates Repo, Browser-Login oder Netzwerkzugriff auf nicht oeffentliche Daten erforderlich wird.
- Nicht-ausfuehren: keine Installs, keine Tokens, keine privaten Repos, kein Account-Login, kein Scraping, keine Commits, keine Pushes.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Codex `rust-v0.139.0` read-only gemaess Sandbox-Testkarte pruefen.
- CHRIS_ENTSCHEIDET: Ob nach erfolgreichem Review `codex-handoff` minimal gepatcht werden soll.
- BEOBACHTEN: Playwright MCP `v0.0.76`; Hermes File-Tools-CWD-Fix bis zu einem passenden Update-Fenster.
- SPAETER: Browser-QA-MCP-Videobelege erst testen, wenn eine konkrete Leseapp-/Lernwerkstatt-Browser-QA-Runde ansteht.
- BLOCKIERT: nichts.
- NICHT_TUN: Keine Installationen, Providerwechsel, Tokens, privaten Repos, Stealth-/Scraping-/Trading-Tools.
- Naechste kleinste Aktion: Sandbox-Testkarte fuer Codex lesen und read-only Review starten.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/agent-tools-scout/agent-tools-scout-2026-06-15.md`
