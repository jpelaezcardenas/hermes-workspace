# Codex Handoff

Status: abgeschlossen am 2026-05-17.

Rueckgabe:
`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-17-codegraph-sandbox.md`

## Ziel

Fuehre einen sicheren P1-Sandbox-Test fuer `colbymchenry/codegraph` durch und entscheide danach, ob codegraph fuer Hermes/Codex als Code-Kontext-Tool weiterverfolgt werden soll.

## Kontext

Der GitHub Rising Report vom 2026-05-17 hat `colbymchenry/codegraph` als S-Tier und `test-now` empfohlen.

Statischer Vorcheck:
- `codegraph` ist MIT-lizenziert.
- Es arbeitet laut README lokal mit `.codegraph/codegraph.db`.
- Es bietet CLI- und MCP-Funktionen fuer Symbolsuche, Kontext und Impact.
- Der Standard-Installer schreibt jedoch globale Claude-Konfigurationen.

Deshalb: nur Sandbox, keine globale Installation.

## Dateien

- Statischer Review: `/Users/zondrius/Documents/New project 6/codegraph-static-review-2026-05-17.md`
- Pruefklon: `/Users/zondrius/hermes-workspace/integration-tests/codegraph-2026-05-17`
- Commit: `7e617d819b74686f70eca5dddf5620868f4754bd`
- Ziel-Sandbox: `/Users/zondrius/hermes-workspace/integration-tests/codegraph-sandbox-public`

## Was Hermes schon gemacht hat

- GitHub-Report ausgewertet.
- Repo isoliert geklont.
- README, Lizenz, `package.json`, Installer und CLI grob statisch geprueft.
- Hauptrisiko erkannt: globale Claude-Dateien koennen durch den Installer veraendert werden.
- Diese Aufgabe als kontrollierten Codex-Handoff abgelegt.

## Was Codex tun soll

1. Lies den statischen Review.
2. Pruefe Node-Version. Erlaubt ist Node 18 bis 24.
3. Erstelle eine kleine synthetische JS/TS-Sandbox unter:
   `/Users/zondrius/hermes-workspace/integration-tests/codegraph-sandbox-public`
4. Baue oder starte codegraph so, dass keine globale Konfiguration veraendert wird.
5. Fuehre nur nicht-globale Tests aus:
   - init/index nur auf der Sandbox;
   - status als JSON;
   - query auf ein bekanntes Symbol;
   - context auf eine kleine konkrete Frage;
   - falls sinnvoll `affected` auf eine Testdatei.
6. Schreibe einen Ergebnisbericht nach:
   `/Users/zondrius/Documents/New project 6/codegraph-p1-sandbox-ergebnis-2026-05-17.md`

## Akzeptanzkriterien

- Es wurden keine echten Hermes-, Lernwerkstatt-, VDS-, Schul- oder privaten Repos indexiert.
- Es wurden keine Dateien unter `~/.claude*` veraendert.
- `.codegraph/` liegt nur in der Sandbox.
- Der Bericht enthaelt:
  - Installationsweg;
  - erzeugte Dateien;
  - Status/Query/Context-Ergebnis;
  - Nutzen gegenueber normaler Suche;
  - Risiken;
  - klare Empfehlung: P2 ja/nein/spaeter.

## Risiken

- Der Installer kann globale Claude-/MCP-Dateien veraendern.
- Kontextausgaben koennen zu gross sein.
- WASM-SQLite kann langsam sein.
- Ein gutes Ergebnis auf Mini-Code ist noch kein Beweis fuer Nutzen in grossen Projekten.

## Nicht tun

- Nicht `codegraph` ohne Argumente starten.
- Nicht `codegraph install` starten.
- Nicht global installieren.
- Nicht `~/.claude.json`, `~/.claude/settings.json` oder `~/.claude/CLAUDE.md` bearbeiten.
- Nicht echte Projekte indexieren.
- Nicht Hermes-Config, Codex-Config oder MCP-Konfiguration produktiv veraendern.

## Rueckgabe erwartet

Kurzer Bericht mit P1-Ergebnis und einer Entscheidung:
- `P2 empfohlen`
- `weiter beobachten`
- `nicht integrieren`

Zusaetzlich, falls P2 empfohlen wird:
- kleinster naechster Schritt;
- Rollback;
- genaue Grenze, wo codegraph genutzt werden darf.
