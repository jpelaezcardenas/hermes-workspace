## Tool / Version / Link
OpenAI Codex `rust-v0.139.0` — https://github.com/openai/codex/releases/tag/rust-v0.139.0

## Warum Fuer Chris Relevant
Die Release Notes nennen drei Punkte mit direktem Nutzen fuer Chris' Hermes-Systeme: standalone Websuche im Code-Modus, bessere MCP-Tool-Schema-Kompatibilitaet (`oneOf`/`allOf`) und erweiterte `codex doctor`-Diagnose. Das passt zu Browser-QA, Skills/Kanban-Handoffs und stabileren lokalen Codex-Prueflaeufen.

## Sandbox-Ziel
Nur lokal und read-only pruefen, ob die Release-Notes fuer bestehende Codex-Handoffs eine konkrete Anpassung der Handoff-Vorlage oder einer Hermes-Skill-Regel rechtfertigen. Kein Update, keine Installation, keine Provider-/Token-Aenderung.

## 10-Minuten-Testschritte
1. Release-Notes lesen: https://github.com/openai/codex/releases/tag/rust-v0.139.0
2. Lokal pruefen, welche Codex-Version bereits vorhanden ist: `codex --version`.
3. Wenn Codex vorhanden ist: `codex doctor` ausfuehren und nur auf lokale Diagnosehinweise achten; keine Secrets kopieren.
4. Eine bestehende Codex-Handoff-Vorlage kurz gegen die neuen Punkte pruefen: Websuche erlaubt? MCP-Schema-Hinweis noetig? Doctor-Ausgabe als Pflichtbeleg sinnvoll?
5. Ergebnis in maximal 5 Bulletpoints notieren; keine Dateien ausser einem kurzen Review-Artefakt aendern.

## Erfolgskriterium
Es gibt eine klare Ja/Nein-Entscheidung, ob `codex-handoff` oder eine Codex-Pruefregel um `codex doctor`/MCP-Schema/Websuche ergaenzt werden sollte.

## Abbruchregel
Abbrechen, wenn Codex nicht installiert ist, ein Login/Token/Update verlangt wird, `codex doctor` sensible Werte ausgeben will, oder die lokale Version nicht vergleichbar ist.

## Risiken Und Grenzen
Mittel: Websuche im Code-Modus kann Quellenqualitaet verbessern, aber auch unkontrollierte externe Recherche in Handoffs ausloesen. MCP-Schema-Verbesserungen sind positiv, muessen aber nicht automatisch produktiv genutzt werden. `codex doctor` kann Umgebungsdetails enthalten; keine Rohlogs teilen, wenn Secrets/Pfade sensibel sind.

## Nicht Installieren / Nicht Verbinden
Kein Codex-Update, kein npm/pip/brew install, keine Tokens, kein OAuth, keine privaten Repos, keine Schul-/VdS-Daten, keine automatischen Commits oder Pushes.

## Naechster Entscheid
Nach dem Read-only-Test entscheiden: `codex-handoff` minimal patchen oder die Release nur beobachten.
