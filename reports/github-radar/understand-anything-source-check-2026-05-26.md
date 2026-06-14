# Understand-Anything Source-Check - 2026-05-26

## Entscheidung

Signal: Yellow/Red

Nicht direkt in Hermes oder Codex installieren. Der Kandidat bleibt strategisch interessant, aber der heutige Source-Check ergibt: erst beobachten oder in einer komplett wegwerfbaren Sandbox testen, nicht in produktive Hermes-/Codex-Skillpfade symlinken.

## Gepruefte Quelle

- Repo: `https://github.com/Lum1104/Understand-Anything`
- Lokaler Check-out nur temporaer: `/tmp/hermes-understand-anything-source-check`
- Commit: `26edf61856fa476e466bda1814819a266a293c47`
- Commit-Datum: `2026-05-26`
- Commit-Text: `Merge pull request #235 from ZebangCheng/feat/add-trae-platform`
- Umfang: 403 getrackte Dateien, ca. 48 MB
- Lizenz: MIT

## Was das Projekt bietet

- Code-/Wissensgraph fuer Agenten und Menschen.
- Skills:
  - `understand`
  - `understand-dashboard`
  - `understand-diff`
  - `understand-domain`
  - `understand-knowledge`
  - `understand-chat`
  - `understand-explain`
  - `understand-onboard`
- Dashboard auf React/Vite-Basis.
- Graph-Ausgabe im Zielprojekt unter `.understand-anything/`.
- Install-Script unterstuetzt u. a.:
  - `codex` -> `$HOME/.agents/skills` als einzelne Symlinks
  - `hermes` -> `$HOME/.hermes/skills` als Ordner-Symlink
  - universeller Plugin-Link `$HOME/.understand-anything-plugin`

## Positive Signale

- MIT-Lizenz ist integrationsfreundlich.
- Use Case passt stark zu Hermes/Codex: Codekontext, Onboarding, Diff-Impact, Architekturueberblick.
- Skill-Struktur ist konkret und besser als reine Prompt-Sammlung.
- Dashboard und Graph-Dateien koennen einen echten Ueberblick liefern.
- Lokale Analyse ist prinzipiell passend fuer private Arbeitsweise.

## Risiken

- `pnpm audit --prod --audit-level high` meldete 7 Vulnerabilities:
  - 3 high
  - 4 moderate
- High-Warnungen:
  - `picomatch` ReDoS, vulnerable `<2.3.2`
  - `picomatch` ReDoS, vulnerable `>=4.0.0 <4.0.4`
  - `devalue` DoS, vulnerable `>=5.6.3 <=5.8.0`
- Das Install-Script legt Symlinks in aktive Skill-Verzeichnisse:
  - `$HOME/.hermes/skills`
  - `$HOME/.agents/skills`
- Das Plugin kann Auto-Update-Hooks mit `PostToolUse` und `SessionStart` verwenden, sobald `.understand-anything/config.json` `autoUpdate: true` enthaelt.
- Analyse schreibt ins Zielrepo nach `.understand-anything/`; fuer private oder sensible Repos darf das nicht unkontrolliert laufen.
- Der Dashboard-Start installiert Dependencies bei Bedarf und startet Vite. Das ist fuer einen sicheren ersten Check zu viel Oberflaeche.

## Hermes-Entscheidung

Nicht tun:

- Kein `curl | bash`.
- Keine Installation nach `$HOME/.hermes/skills`.
- Keine Installation nach `$HOME/.agents/skills`.
- Keine Ausfuehrung auf privaten Hermes-, Lernwerkstatt- oder LeseWerk-Repos.
- Kein `--auto-update`.
- Keine Hooks in produktiven Agent-Workflows aktivieren.

Erlaubt:

- ConceptOnly: Skill-Struktur, Graph-Idee, Diff-Impact und Onboarding-Idee auswerten.
- Watch: Repo weiter beobachten, bis Audit-Warnungen reduziert sind.
- Sandbox nur spaeter: komplett wegwerfbares Public-Toy-Repo, keine Tokens, keine privaten Daten, keine Symlinks in echte Skillpfade.

## Naechste kleinste Aktion

Kein neuer Codex-Handoff jetzt noetig. Der sichere Status ist dokumentiert: `Understand-Anything` bleibt auf Watch/ConceptOnly, bis die Dependency-Warnungen und Hook-Oberflaeche neu bewertet wurden.

## Empfehlung fuer den GitHub-Scout

Wenn `Understand-Anything` erneut als `test-now` auftaucht, soll Hermes es auf `watch / RiskGate` herabstufen, solange:

- `pnpm audit --prod --audit-level high` High-Warnungen meldet;
- Auto-Update-Hooks aktiv in der Plugin-Struktur liegen;
- kein isolierter Public-Toy-Sandboxlauf dokumentiert wurde.
