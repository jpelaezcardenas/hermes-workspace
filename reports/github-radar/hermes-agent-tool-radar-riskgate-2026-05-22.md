# Hermes Agent Tool Radar + RiskGate — 2026-05-22

## Executive Summary

Der GitHub-Rising-Bericht vom 2026-05-22 zeigt ein klares Muster: Agenten-Ökosysteme bewegen sich in Richtung Code-Kontextgraphen, MCP-Browser-Debugging, Skill-/Plugin-Kataloge und agentenlesbare CLI-Strukturen. Für Chris' Hermes-Setup ist das nützlich, aber nur mit strikter Bremse: Trending ist ein Beobachtungssignal, keine Installationsfreigabe.

Dieses Paket definiert deshalb eine wiederverwendbare Entscheidungslogik für zukünftige Rising-Repos:

1. RepoApply: Ein Repo wird nicht direkt installiert, sondern durchläuft Observe -> ConceptOnly -> SourceReview -> P2Sandbox -> IntegrateCandidate -> ProductionCandidate.
2. RiskGate: Jede Stufe prüft Daten-, Account-, Browser-, Datei-, Credential-, Lizenz- und Systemkontrollrisiken.
3. Decision Inbox: Jeder GitHub-Cron-Bericht soll am Ende konkrete Handlungsfelder liefern: Do now, Ask Chris, Watch, Never run, Evidence missing.

Stand 2026-05-22: Kein Repo wird produktiv integriert. `colbymchenry/codegraph` bleibt der stärkste P2Sandbox-Kandidat, aber nur nach expliziter Chris-Freigabe und nur mit öffentlichem/disposable Testrepo. `ChromeDevTools/chrome-devtools-mcp` ist strategisch wichtig, aber wegen Browser-/Cookie-/Account-Risiken vorerst Watch/RiskGate. Skill- und Plugin-Repos werden als ConceptOnly-Quelle für bessere Hermes-Skill-Qualität genutzt, nicht wholesale übernommen.

## Quellen und Kontext

Primärkontext:
- `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-22.md`
- bestehende Hermes-Skill-Logik: `github-rising-integration`
- bestehende Hermes-OS-Logik: `hermes-agent-operating-system`

Vorhandene Struktur, die genutzt wurde:
- Tagesberichte: `/Users/zondrius/hermes-workspace/reports/github-rising-projects-*.md`
- neue vertiefende Radar-Berichte: `/Users/zondrius/hermes-workspace/reports/github-radar/`
- dauerhafte Integrations-/Memory-Notizen: `/Users/zondrius/.hermes/memory/integrations/`

Keine Repos wurden installiert. Keine privaten Konten, Browserprofile, Cookies, GitHub-Credentials, LeseWerk-/Lernwerkstatt-Produktivdaten oder Schüler-/Verbandsdaten wurden verwendet.

## RepoApply Decision Flow

| Stufe | Bedeutung | Erlaubt | Nicht erlaubt | Ausgang |
|---|---|---|---|---|
| Observe | Repo wird als Signal notiert. | README/Metadaten lesen, Nutzenhypothese formulieren. | Installation, Accountverbindung, private Daten. | Watch, ConceptOnly oder SourceReview. |
| ConceptOnly | Nur Prinzipien extrahieren. | Muster, Qualitätskriterien, Architekturideen, Skill-Formate ableiten. | Code kopieren, Dependency einbauen, globale CLI installieren. | Memory/Skill-Prinzip oder Verwerfen. |
| SourceReview | Statische Prüfung vor Ausführung. | README, Lizenz, Releases, Issues, Installationsoberfläche, Dependencies, Netzwerk-/Dateizugriffe prüfen. | Untrusted code ausführen, OAuth/API-Keys eintragen, private Repos scannen. | P2Sandbox, Watch oder Block. |
| P2Sandbox | Isolierter, explizit freigegebener Test. | Disposable Ordner, öffentliche/synthetische Daten, kein Login, kein echtes Profil, dokumentierte Netzwerk-/Dateizugriffe. | Produktivkonfiguration, globale Installer, echte Accounts, private Daten. | Sandbox-Bericht und IntegrateCandidate-Entscheidung. |
| IntegrateCandidate | Nutzwert wurde in Sandbox belegt. | Kleine Hermes-Skill-/Runbook-/Wrapper-Idee vorbereiten. | Produktivpflicht, stille Cron-Automation, unkontrollierte Background-Dienste. | Human Review + zweite Nutzung. |
| ProductionCandidate | Wiederholt nützlich und sicher. | Nach Review in Hermes-Workflow übernehmen. | Direkte Aktivierung ohne Rollback/Scope/Datenschutzgrenze. | Skill, dokumentierter Workflow oder bewusstes Nichttun. |

Grundsatz: Ein Repo darf keine Stufe überspringen, wenn es Dateien, Browser, Konten, Credentials, private Daten, Systemsteuerung oder untrusted code berührt.

## RiskGate Levels

| Level | Definition | Beispiele | Erforderliche Entscheidung |
|---|---|---|---|
| Green | Docs/reference only, keine Ausführung. | Lernrepo, README, Architekturartikel, Skill-Beispiele. | Neva darf zusammenfassen und ConceptOnly-Muster extrahieren. |
| Yellow | SourceReview oder lokaler read-only Sandbox-Check. | Lizenz-/Dependency-Prüfung, statische Codeinspektion, Demo mit synthetischen Daten. | Erlaubt, solange keine untrusted execution und keine privaten Daten. |
| Orange | Tool kann Browser, Dateien, lokale Dienste, DevTools, MCP oder Accounts berühren. | ChromeDevTools MCP, Browser-QA, lokale Agent-CLIs, Codegraph-Indizierung. | Explizite Chris-Freigabe plus isoliertes Profil/Disposable Workspace nötig. |
| Red | Credentials, Account-Automation, Trading, stealth/bot evasion, private Daten, untrusted code execution oder produktive Workspaces. | NotebookLM mit echtem Google-Konto, WhatsApp-Automation, Broker-/Wallet-Keys, Anti-Bot-Browser, globale Installer auf privatem System. | Nicht ausführen ohne separaten schriftlichen Sandboxplan und explizite Freigabe. In vielen Fällen dauerhaft blocken. |

## Required Checks Before Integration

Vor jedem Schritt über ConceptOnly hinaus müssen diese Punkte beantwortet sein:

1. License clarity: Ist die Lizenz vorhanden, passend und kompatibel mit dem geplanten Nutzen?
2. Maintenance signals: letzter Push, Releases/Tags, Issues, Maintainer-Reaktion, Test-/CI-Signale.
3. Installation surface: Muss global installiert werden? Werden Shell-Skripte, postinstall hooks, Browser Extensions, daemons oder dotfiles verändert?
4. Data exposure: Welche Dateien/Daten liest das Tool? Werden Inhalte an externe Dienste gesendet?
5. Account/cookie exposure: Greift es auf Browserprofile, Cookies, OAuth, Google/GitHub/Telegram/WhatsApp oder andere private Konten zu?
6. Overlap with existing Hermes tools: Gibt es den Nutzen bereits über Hermes Tools, Skills, Browser, session_search, memory, Codex-Handoff oder React-Doctor?
7. Direct value for Chris' use cases: Hilft es konkret bei LeseWerk, Lernwerkstatt, Codebase Understanding, GE-Schulmaterial, VdS-Recherche, Agent Skills, Browser-QA oder lokaler Automatisierung?
8. Smallest safe test: Was ist der kleinste Test mit öffentlichen/synthetischen Daten, ohne Credentials und ohne produktive Repos?
9. Graduation criterion: Woran ist erkennbar, dass der Test mehr Nutzen bringt als Risiko/Komplexität?
10. Human review point: Welche Entscheidung muss Chris treffen, bevor es weitergeht?

## Final Repo Decisions — 2026-05-22

### colbymchenry/codegraph

- Kategorie: Code Context / Knowledge Graph / Coding-Agent-Infrastruktur.
- Entscheidung: P2Sandbox candidate, aber keine ProductionCandidate-Integration.
- RiskGate: Orange, weil Codegraph lokale Repos indiziert und potenziell private Projektinhalte verarbeitet.
- Hermes-Nutzen: möglicher besserer Codekontext für Codex/Hermes-Handoffs, größere React-/Lernwerkstatt-Repos, Impact-Analyse und weniger Tokenverbrauch.
- Aktuelle Bremse: P1 war bereits interessant, aber P2 ist nicht freigegeben; bekannte Sorge aus bestehender Hermes-Memory: produktive `picomatch` High-Audit-Warnung und fehlender mittelgroßer Nutzenbeleg.
- Safe P2Sandbox Plan:
  1. Nur nach Chris-Freigabe.
  2. Nur öffentliches mittelgroßes Repo oder disposable Copy, keine Hermes-/Lernwerkstatt-/LeseWerk-/VdS-Privatdaten.
  3. Kein interaktiver globaler Installer, keine Änderungen an `~/.claude*`, keine produktiven Agent-Konfigurationen.
  4. Netzwerk-/Dateizugriffe dokumentieren.
  5. Messfrage: Verbessert Codegraph wirklich Handoffs gegenüber `search_files`, `codebase-inspection`, Codex-Kontext und vorhandenen Hermes-Tools?
  6. Ergebnis nur als Sandbox-Bericht; Integration erst nach Review.
- Decision Inbox: CHRIS_ENTSCHEIDET.

### ChromeDevTools/chrome-devtools-mcp

- Kategorie: MCP / Browser Automation / Developer Tooling.
- Entscheidung: Watch / RiskGate concept. Keine Aktivierung jetzt.
- RiskGate: Orange bis Red, je nach Browserprofil. Orange bei localhost-only Testprofil; Red bei echten Cookies, Logins, privaten Seiten oder Schüler-/VdS-Daten.
- Hermes-Nutzen: strukturierte Frontend-QA, DevTools-Inspektion, lokale Lernwerkstatt-/LeseWerk-Debuggingpfade, Ergänzung zu Browser-Automation und React-Doctor.
- Hauptgefahr: Browser-Tools können sehr schnell echte Sessions, Cookies, private Seiten, eingeloggte Plattformen oder sensible Daten berühren.
- Safe future test:
  1. Nur gegen localhost Demo-App oder bewusst gestartete lokale App.
  2. Separater Chrome-Testprofilordner, kein Login, keine echten Cookies.
  3. Kein Zugriff auf Schule/VdS/Google/WhatsApp/Telegram/GitHub logged-in Seiten.
  4. MCP-Server nur temporär, dokumentierte Ports, nach Test beenden.
  5. Vorher RiskGate-Checklist ausfüllen.
- Decision Inbox: BEOBACHTEN / SPAETER.

### anthropics/claude-plugins-official

- Kategorie: Claude Code Plugins / Agent Tooling.
- Entscheidung: ConceptOnly.
- RiskGate: Green bis Yellow, solange nur Struktur und README/Beispiele gelesen werden.
- Hermes-Nutzen: Signal für Plugin-/Skill-Qualität, Katalogisierung, klare Toolgrenzen und Agent-UX.
- Risiken: Lizenz unklar laut Bericht; Claude-spezifischer Fokus; hoher Issue-Stand; Gefahr, fremde Plugin-Patterns unkritisch in Hermes zu kopieren.
- Safe action: 2–3 Plugin-Beispiele statisch vergleichen und Qualitätsmerkmale in Hermes Skill Quality Rubric überführen.
- Nicht tun: keine Installation, keine Wholesale-Übernahme, keine Claude-spezifische Abhängigkeit in Hermes erzwingen.
- Decision Inbox: SPAETER / ConceptOnly.

### HKUDS/CLI-Anything

- Kategorie: Agent-native CLI / Developer Tools.
- Entscheidung: Watch / SourceReview only.
- RiskGate: Yellow bei statischer Prüfung; Orange, sobald reale CLI-Steuerung von Tools/Systemen getestet wird.
- Hermes-Nutzen: Ideen für agentenlesbare CLIs, Tool-Kapselung, Runbooks, klare Input-/Output-Verträge.
- Risiken: sehr breiter Claim, Overengineering, hoher Systemsteuerungsdrang, Overlap mit bestehenden Hermes Tools/MCP/Skills.
- Safe action: Später SourceReview oder Dummy-CLI mit synthetischen Daten, keine Credentials, keine produktiven Workspaces.
- Nicht tun: nicht als generischen Ersatz für Hermes Tools einsetzen.
- Decision Inbox: BEOBACHTEN.

### dotnet/skills

- Kategorie: .NET/C# Agent Skills.
- Entscheidung: ConceptOnly.
- RiskGate: Green.
- Hermes-Nutzen: domänenspezifische Skill-Struktur als Vorbild für bessere Hermes-Skills, auch wenn Chris aktuell nicht primär .NET nutzt.
- Risiken: indirekter Nutzen; Ablenkung durch .NET-Spezifika; Issue-Zahl im Bericht relativ hoch.
- Safe action: Strukturprinzipien in Hermes Skill Quality Rubric aufnehmen: klare Trigger, konkrete Commands, Risiken, Verification, Scope.
- Nicht tun: keine .NET-Skill-Sammlung importieren.
- Decision Inbox: SPAETER.

### teng-lin/notebooklm-py

- Kategorie: Research Automation / Unofficial API / Agentic NotebookLM.
- Entscheidung: Watch only.
- RiskGate: Red, sobald echte Google-Konten, NotebookLM-Accounts, private Dokumente oder Cookies benötigt werden.
- Hermes-Nutzen: theoretisch interessant für Quellenarbeit, VdS-Recherche und Public-Research-Automation.
- Risiken: inoffizielle Google-API, ToS-/Stabilitäts-/Account-Risiko, private Dokumente, potenziell sensible VdS-/Schulmaterialien.
- Safe action: Vorerst nur beobachten. Falls jemals Test: nur öffentliche Demoquellen, Wegwerf-/Testaccount, vorher ToS-/Datenschutzprüfung und Chris-Freigabe.
- Nicht tun: keine privaten Docs, keine Schüler-/Verbandsdaten, kein echter Google-Account, keine Cron-Automation.
- Decision Inbox: BEOBACHTEN / NICHT_TUN für private Daten.

### rohitg00/ai-engineering-from-scratch

- Kategorie: AI Engineering Education.
- Entscheidung: Learning/reference only.
- RiskGate: Green, solange nur als Lernmaterial genutzt.
- Hermes-Nutzen: möglicher Lehr-/Selbstlern-Curriculum-Baustein für AI Engineering, Agentenverständnis und Chris' technisches Lernen.
- Risiken: kein direkter Tool-Integrationsnutzen; mögliche Ablenkung von konkreten Hermes-/Lernwerkstatt-Zielen.
- Safe action: Bei Bedarf Lernpfad oder Leseliste extrahieren.
- Nicht tun: kein Tool daraus bauen, keine produktive Abhängigkeit.
- Decision Inbox: SPAETER.

## Practical Next-Action Backlog

Nur sichere nächste Aktionen, keine Ausführung ohne Freigabe:

1. codegraph P2 sandbox prep task
   - Status: approval required.
   - Ziel: P2-Plan mit öffentlichem mittelgroßem Repo, kein privates Material, kein globaler Installer.
   - Akzeptanz: Sandboxplan nennt Repo, Befehlsgrenzen, Daten-/Netzwerkgrenzen, Messfrage und Abbruchkriterien.

2. ChromeDevTools MCP RiskGate checklist
   - Status: future local browser QA only.
   - Ziel: Checkliste für localhost-only, separates Chrome-Profil, keine Logins, keine Cookies, keine sensiblen Seiten.
   - Akzeptanz: Vor jedem Browser-MCP-Test muss klar sein: URL, Profilpfad, Port, Datenklasse, Exit/Shutdown.

3. Hermes Skill Quality Rubric from skill-repo trend
   - Status: ConceptOnly.
   - Ziel: Qualitätsraster aus `anthropics/claude-plugins-official` und `dotnet/skills` ableiten.
   - Akzeptanz: Rubric bewertet Trigger, Scope, Commands, Datenschutz, Verifikation, Maintenance, Anti-Pattern.

4. GitHub Cron Report upgrade
   - Status: safe workflow improvement.
   - Ziel: Jeder zukünftige GitHub-Rising-Bericht enthält Decision-Inbox-Felder.
   - Pflichtfelder: Do now, Ask Chris, Watch, Never run, Evidence missing.
   - Akzeptanz: Keine Trending-Liste endet ohne konkrete Nicht-Tun- und Evidenz-Lücken.

## Exact Things Hermes Must NOT Do

- Kein globales Installieren von Rising-Repos.
- Kein Ausführen untrusted code aus Trending-Repos ohne expliziten P2Sandbox-Plan.
- Kein Verbinden privater Konten, Cookies, Browserprofile, Telegram, WhatsApp, Google, GitHub-Credentials oder Produktivworkspaces.
- Kein Scannen privater Hermes-, LeseWerk-, Lernwerkstatt-, VdS- oder Schuldaten mit neuen Tools.
- Keine NotebookLM-/Google-Automation mit echtem Account oder privaten Dokumenten.
- Keine Browser-MCP-Tests auf eingeloggten oder sensiblen Seiten.
- Keine Trading-, Wallet-, Broker-, Stealth-/Anti-Bot-/Captcha-Bypass-Integrationen.
- Keine direkte Änderung an LeseWerk-/Lernwerkstatt-App-Code aus diesem Radar heraus.
- Kein Wholesale-Import fremder Skill-/Plugin-Sammlungen.
- Kein Memory-Eintrag mit Schüler-, Eltern-, Kollegiums-, Verbandsintern- oder Credential-Daten.

## How This Improves Future GitHub Cronjob Evaluation

Bisherige GitHub-Rising-Berichte können Hype gut sichtbar machen. Dieses RiskGate-Paket ergänzt die fehlende Sicherheits- und Entscheidungslogik:

1. Jede Beobachtung bekommt eine Integrationsstufe statt nur ein Tier.
2. Jedes Repo bekommt eine Daten-/Account-/Systemrisiko-Einstufung.
3. Jede Empfehlung enthält den kleinsten sicheren Test oder ein klares Nicht-Tun.
4. Decision-Inbox-Felder machen Cron-Ergebnisse umsetzbar statt nur interessant.
5. Hermes kann gute Konzepte übernehmen, ohne fremden Code, Credentials oder private Daten zu riskieren.
6. Chris behält Freigabehoheit bei Orange/Red-Risiken.

Empfohlenes Standardende für künftige GitHub-Rising-Cronberichte:

```text
Decision Inbox
- Do now:
- Ask Chris:
- Watch:
- Never run:
- Evidence missing:
- Smallest safe next action:
- Source / report file:
```

## Quality Check

- Datenschutz: keine personenbezogenen Schüler-, Eltern-, Kollegiums- oder Verbandsdaten verarbeitet.
- Sicherheit: keine Installation, keine Credentials, keine Konten, keine Browserprofile, keine untrusted execution.
- Praktische Nutzbarkeit: enthält konkrete RepoApply-Stufen, RiskGate-Level, Checklisten, Repo-Entscheidungen und Backlog.
- Hermes-Fit: ausgerichtet auf LeseWerk, Lernwerkstatt, Codebase Understanding, Agent Skills, Browser-QA, lokale Automatisierung und langfristige Memory.
- Menschliche Kontrollpflicht: P2Sandbox, Browser-MCP und Account-nahe Tools bleiben freigabepflichtig.

## Integration Result

- Projects reviewed: `colbymchenry/codegraph`, `ChromeDevTools/chrome-devtools-mcp`, `anthropics/claude-plugins-official`, `HKUDS/CLI-Anything`, `dotnet/skills`, `teng-lin/notebooklm-py`, `rohitg00/ai-engineering-from-scratch`.
- Test-now: keines ohne Chris-Entscheidung.
- P2Sandbox candidate: `colbymchenry/codegraph` only, approval required.
- Watch: `ChromeDevTools/chrome-devtools-mcp`, `HKUDS/CLI-Anything`, `teng-lin/notebooklm-py`.
- ConceptOnly: `anthropics/claude-plugins-official`, `dotnet/skills`.
- Learning/reference: `rohitg00/ai-engineering-from-scratch`.
- Never run without separate approval: account/cookie automation, private-data browser automation, untrusted code execution, trading/stealth/bot-evasion tools.
- Files produced: this report and compact memory note.
