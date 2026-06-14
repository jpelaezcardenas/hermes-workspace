# Hermes Agent v0.15.2 Sandbox Check - 2026-06-01

Status: green
Scope: Sandbox-Pruefung, kein Live-Update

## Kurzfazit

Hermes Agent v0.15.2 ist als Update-Kandidat fuer ein kleines Wartungsfenster geeignet.

Der konkrete Release-Fix wurde in der Sandbox bestaetigt: Plugin-Manifeste werden im Wheel mit ausgeliefert, und die Plugin-Discovery erkennt die gebuendelten Plugins sauber.

## Warum geprueft

Der woechentliche Agent-Tools-Scout meldete:

- Hermes Agent v0.15.2 behebt fehlende gebuendelte Plugin-Manifeste im Paket.
- Das ist direkt relevant fuer Plugin-/Skill-Laden, Plattformadapter und Provider-Discovery.
- Aktives Hermes auf dieser Maschine ist noch `Hermes Agent v0.14.0 (2026.5.16)`.

## Sandbox

Temporaerer Pfad waehrend des Laufs:

`/Users/zondrius/hermes-workspace/integration-tests/hermes-agent-v0.15.2-sandbox`

Getesteter Release:

`v2026.5.29.2`

Commit:

`77a1650c78a4cb1813d8a81fa1da40a15b6a3ec5`

## Ergebnisse

### Wheel-Paket

Gebautes Wheel:

`hermes_agent-0.15.2-py3-none-any.whl`

Ergebnis:

- Source `plugin.yaml` / `plugin.yml`: 69
- Wheel `plugin.yaml` / `plugin.yml`: 69
- fehlende Plugin-Manifeste im Wheel: 0
- Source Dashboard-Manifeste: 3
- Wheel Dashboard-Manifeste: 3

Bewertung: Der Packaging-Fix ist in der gebauten Distribution sichtbar.

### Plugin-Discovery

Sandbox-Discovery mit isoliertem `HERMES_HOME` und `HERMES_BUNDLED_PLUGINS`:

- erkannte relevante gebuendelte Plugin-Manifeste: 33
- Backends: 20
- Plattformen: 8
- Standalone-Plugins: 5
- fehlende `__init__.py`: 0

Beim Discovery-/Load-Lauf:

- gelistete Plugins: 33
- aktiv geladene Plugins: 28
- opt-in geparkte Standalone-Plugins: 5
- echte Ladefehler: 0

Die 5 geparkten Plugins sind erwartbar, weil Standalone-Plugins nicht automatisch aktiv werden:

- `disk-cleanup`
- `google_meet`
- `observability/langfuse`
- `security-guidance`
- `teams_pipeline`

### Plugin-Skill-Tests

Gezielter Testlauf:

`tests/test_plugin_skills.py`

Ergebnis:

- 28 Tests bestanden
- 1 Warnung aus `discord.py` wegen Python-Deprecation, nicht release-blockierend

## Nicht angefasst

- Kein `hermes update`.
- Kein Neva-Neustart.
- Keine aktive `.hermes`-Config geaendert.
- Keine aktiven Auth-Dateien geaendert.
- Kein Modell-Prompt gesendet.
- Kein Commit oder Push.
- Die temporaere Upstream-Kopie wurde nach der Pruefung wieder entfernt, damit sie nicht versehentlich mitcommitted wird.

## Entscheidung

Empfehlung:

```text
Hermes Agent v0.15.2: UPDATE-KANDIDAT GRUEN
Produktives Update: nur in kleinem Wartungsfenster
OpenAI Agents SDK v0.17.4: beobachten
browser-use 0.12.9: beobachten
```

Ich wuerde jetzt noch nicht mitten im laufenden Hermes-Zustand automatisch updaten. Der richtige naechste Schritt ist ein kleines Update-Fenster mit Backup, Update, Profil-Check, Plugin-Discovery-Check und Neva-Neustart nur wenn Chris es freigibt.

## Sicheres Update-Fenster

Wenn Chris das Update freigibt:

1. Backup von aktiver Hermes-Config/Auth und aktuellem Hermes-Agent-Stand.
2. Aktive Sessions/Neva-Zustand notieren.
3. `hermes update` ausfuehren.
4. `hermes --version`, `hermes status`, `hermes profile list` pruefen.
5. Plugin-Discovery und Skill-Sichtbarkeit pruefen.
6. Neva nur kontrolliert neu starten, wenn die neue Version nicht ohne Restart aktiv wird.
7. Ergebnisbericht schreiben.

## Quellen

- Cronjob `AGENT_TOOLS_SCOUT_SCHULWERKSTATT_WEEKLY`
- `https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.29.2`
- Temporaeres Sandbox-Repo waehrend des Laufs: `/Users/zondrius/hermes-workspace/integration-tests/hermes-agent-v0.15.2-sandbox/repo`
