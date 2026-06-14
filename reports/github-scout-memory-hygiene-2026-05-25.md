# GitHub Scout Memory Hygiene Check — 2026-05-25

STATE: DONE

## Ergebnis

Die GitHub-Rising-Erkenntnisse vom 2026-05-25 sind sinnvoll in Hermes Memory abgelegt, aber nur als kompakte Entscheidungslogik. Keine kurzlebigen Star-Zahlen sollten zusätzlich in Memory dupliziert werden.

Geprüfte Dateien:

- `/Users/zondrius/.hermes/memory/integrations/github-rising-2026-05-25-capability-radar.md`
- `/Users/zondrius/.hermes/memory/integrations/agent-tool-radar-riskgate-2026-05-22.md`
- `/Users/zondrius/.hermes/profiles/neva/memory/workflows/daily-github-scout.md`
- `/Users/zondrius/.hermes/memory/prompts/hermes-future-capability-radar-goal.md`

## Keep

- Die Entscheidungsformen `test-now`, `watch`, `concept-only`, `block`.
- Die Hard-Block-Regeln: keine Stealth-Browser, keine Credential-/ToS-Tools, keine privaten Repos, keine Tokens, keine Schülerdaten.
- Die Regel: `test-now` bedeutet zuerst RiskGate, nicht Installation.
- Die Watchlist-Erweiterung für Understand-Anything, codegraph, academic-research-skills, openhuman, agentmemory und multica.
- Der Future-Capability-Radar-Prompt als wiederverwendbares Goal-Template.

## Change

- In künftigen Memory-Einträgen keine exakten Star-/Fork-/Issue-Zahlen speichern, außer als grobe Momentaufnahme mit Datum. Diese Zahlen gehören in Reports.
- Lizenzangaben in Memory nur speichern, wenn sie eindeutig verifiziert sind. Bei unklarer Lizenz immer `unclear / verify before use`.
- GitHub-Reports sollen bei Konzeptquellen immer ausdrücklich zwischen `Prinzip extrahieren` und `Datei/Text übernehmen` unterscheiden.

## Remove / Avoid

- Keine vollständigen README- oder Skilltexte aus fremden Repos in Hermes Memory kopieren.
- Keine GPL-/NOASSERTION-/unklare Lizenztexte in Skills übernehmen.
- Keine Security-, Browser-, Account- oder Credential-Workflows aus Trendberichten in produktive Hermes-Jobs heben.

## Durable Rule

Hermes soll GitHub-Trends wie Radar-Signale behandeln:

1. Report speichert volatile Details.
2. Memory speichert nur langlebige Regeln und Entscheidungen.
3. Kanban führt kleine RiskGate-/SourceReview-Tasks aus.
4. Installation oder Sandbox-Ausführung braucht separate explizite Freigabe.

## Review

Der Memory-Block `t_4ebf88fe` war ein Protokollfehler des Workers, kein fachlicher Block. Dieser Bericht erfüllt den ursprünglich angeforderten Output.
