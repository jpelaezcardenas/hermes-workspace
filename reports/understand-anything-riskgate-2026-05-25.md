# RiskGate Report: Lum1104/Understand-Anything
**Datum:** 2026-05-25
**Status:** YELLOW (Safe for Source Review / Plan for Sandbox)
**Task ID:** t_af3be51c

---

## 1. Kurzfazit
Understand-Anything ist ein hochdynamisches Projekt (30k+ Stars, MIT-Lizenz), das Code-Wissensgraphen für LLM-Agenten (Codex, Claude Code, etc.) erstellt. Es verbindet deterministisches Parsing (Tree-sitter) mit semantischer Analyse. Während die Lizenz (MIT) sicherer ist als bei Konkurrenzprodukten, erfordert die Installation via `install.sh` (cloning + symlinking) und die Abhängigkeit von nativen Tree-sitter-Binaries eine kontrollierte Sandbox-Umgebung ohne Schreibzugriff auf produktive Verzeichnisse.

## 2. Gesicherte Fakten (Stand 2026-05-25)
*   **Repo:** https://github.com/Lum1104/Understand-Anything
*   **Lizenz:** MIT (Re-verifiziert online am 2026-05-25).
*   **Aktivität:** Letzter Push am 2026-05-24; ca. 30.670 Stars; 46 offene Issues laut GitHub API-Recheck am 2026-05-25.
*   **Technologie:** TypeScript, pnpm Monorepo, Tree-sitter für Parsing (C, C++, Go, Java, JS, Python, Rust, TS).
*   **Workflow:** Bietet Plugins für Claude Code, Codex, Cursor und Copilot.
*   **Funktionen:** `/understand` (Scan), `/understand-dashboard` (Visualisierung), `/understand-diff` (Impact-Analyse).

## 3. RiskGate Analyse

### A. Dependency & Install Surface
*   **Install-Script:** `install.sh` klont das Repo nach `~/.understand-anything/repo` und erstellt Symlinks in IDE-spezifische Plugin-Ordner (z.B. `.codex-skills`).
*   **Binaries:** Nutzt `onlyBuiltDependencies` in `package.json` für `tree-sitter`, `esbuild` und `sharp`. Dies bedeutet Kompilierung/Installation von nativen Modulen beim Setup.
*   **Empfehlung:** Kein globaler `install.sh` Aufruf in Hermes. Manuelle Installation in isolierten Testordner bevorzugt.

### B. Network, Privacy & Account Risks
*   **LLM-Analyse:** Das Tool nutzt LLMs für "Semantic Mapping" und Zusammenfassungen. Standardmäßig werden wahrscheinlich Umgebungsvariablen für APIs (OpenAI, Anthropic etc.) erwartet.
*   **Dashboard:** Öffnet einen lokalen Webserver für die Visualisierung. Risiko: XSS oder unbefugter Zugriff auf Dateistrukturen über den Dashboard-Server.
*   **Privacy:** Das Tool scannt den gesamten Projektordner. Gefahr der Exfiltration von `secrets` oder `tokens` in den Graphen, die dann dem LLM bereitgestellt werden.

### C. Overlap & Integration
*   **Overlap:** Direkter Konkurrent zu `colbymchenry/codegraph` (P1-Status). Understand-Anything ist "learning-oriented" und bietet visuelle Dashboards, während `codegraph` eher auf reine Kontext-Anreicherung setzt.
*   **Hermes-Workflow:** Könnte `codex-handoff` verbessern, indem es präzisere Symbol-Karten liefert.

## 4. Sandbox Design (Smallest Safe Test)
*   **Ziel:** Ausführung von `/understand` auf einem öffentlichen Toy-Repo.
*   **Umgebung:** `/Users/zondrius/hermes-workspace/integration-tests/ua-sandbox/`
*   **Verbotene Zonen:** Kein Zugriff auf `~/.hermes`, `~/Desktop/LERNWERKSTATT KREISLAUF`, oder `.env` Dateien mit echten Tokens.
*   **Vorgehen:**
    1.  Repo manuell klonen (nicht via `install.sh`).
    2.  Ein leeres, öffentliches Python-Repo als Testobjekt.
    3.  Ausführung mit `UA_DIR` Override in der Sandbox.
    4.  Monitoring der Netzwerkaufrufe (API-Calls).

## 5. Success & Stop Criteria

### Success Criteria (Integration bei:)
*   Erzeugt Maps, die Codex-Handoffs schneller/präziser machen als manuelle Dateilisten.
*   Funktioniert lokal ohne zwingende Cloud-Abhängigkeit für den Graph-Struktur-Teil.
*   MIT-Lizenz bleibt stabil.

### Stop Criteria (Abbruch bei:)
*   `install.sh` versucht Schreibzugriff außerhalb der definierten Pfade.
*   Tool erfordert zwingend Zugriff auf Browser-Cookies oder globale IDE-Configs.
*   Ungefragte Telemetrie-Daten an `Lum1104` oder Dritte.
*   Hoher Token-Verbrauch ohne Mehrwert gegenüber Tree-sitter-only Scans.

## 6. Nächste Schritte
1.  **Phase 1 Sandbox:** Vorbereitung des isolierten Testordners und Auswahl eines Toy-Repos.
2.  **Tooling-Check:** Prüfung der Tree-sitter Kompilierbarkeit auf macOS 15.2 (M-Chip).
3.  **Vergleich:** Parallele Analyse des Toy-Repos mit `codegraph` vs. `Understand-Anything`.

---
**Einschätzung:** Sicherer Kandidat für Source-Review und isolierten Sandbox-Test. Keine akute Gefahr bei reiner Code-Inspektion.
