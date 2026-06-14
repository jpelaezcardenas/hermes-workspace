# Hermes External Repo Safety Policy - 2026-05-26

## Zweck

Diese Regel schützt Chris' Hermes-System vor riskanten GitHub-Integrationen, unbekannten Installern, Credential-Leaks und ungeprüfter Agent-Automation. Externe Projekte dürfen Ideen liefern, aber nicht ungeprüft auf dem System laufen.

## Harte Regeln

- Keine Installation externer Repositories ohne ausdrückliche Freigabe.
- Keine globalen `npm`, `pip`, `cargo`, `brew` oder ähnlichen Installationen aus fremden Repos.
- Keine Ausführung unbekannter Scripts, Installer, MCP-Server oder CLIs.
- Keine Nutzung mit privaten Repositories, Schülerdaten, Tokens, Browser-Cookies, Telegram-/WhatsApp-Credentials oder Finanzzugängen.
- Keine praktischen Tests von Stealth-, Anti-Bot-, Captcha-, Credential-Bypass- oder Security-Automation.
- Erst lesen, prüfen, eingrenzen, dann eventuell in Quarantäne-Sandbox mit Toy-Daten testen.

## Standard-Gates

| Gate | Frage | Ergebnis |
| --- | --- | --- |
| RepoApply | Passt das Projekt wirklich zu Hermes, Schulwerkstatt, Lese-App oder Codex? | Nur relevante Projekte weiter prüfen. |
| RiskGate | Welche Rechte, Netzwerkzugriffe, Installer, Telemetrie oder Auto-Start-Mechanismen gibt es? | Bei unklarer Lage stoppen. |
| LicenseGate | Ist die Lizenz eindeutig und kompatibel? | Bei GPL/unklarer Lizenz nur Konzept, keine Übernahme. |
| DataBoundary | Würde das Tool private Daten, Tokens oder Schülerdaten berühren? | Dann nicht praktisch testen. |
| SandboxOnly | Kann ein Test ohne private Daten, ohne globale Installation und ohne echte Accounts laufen? | Nur dann P1/P2-Sandbox. |
| GraduationCriteria | Gibt es nachweisbaren Nutzen gegenüber Hermes-Bordmitteln? | Nur dann dauerhafte Aufnahme erwägen. |
| KillCriteria | Gibt es Installer-Zwang, Obfuscation, unklare Telemetrie, Credential-Zugriff oder Bypass-Charakter? | Sofort stoppen. |

## Aktuelle Projektentscheidungen

| Projekt | Entscheidung | Begründung |
| --- | --- | --- |
| Understand-Anything | test-now nur nach RiskGate | Interessanter Code-/Kontext-Kandidat, aber erst Quarantäne, Toy-Repo und Dependency-Prüfung. |
| codegraph | watch/P2 nur nach Chris-Freigabe | Hoher Hermes-Fit, aber P2 braucht klare Sandbox und Nutzenbeleg. |
| academic-research-skills | concept-only | Lizenz unklar; keine Text- oder Skill-Übernahme ohne Klärung. |
| openhuman | concept-only | Starkes LocalAI-/Memory-Signal, aber GPL/Privacy-Oberfläche zu breit. |
| agentmemory | concept-only/watch | Memory-Architektur interessant, aber frühere Risiko-Signale verhindern Migration. |
| multica/orca | cockpit inspiration only | Interessant für Agent-Cockpit-Ideen, aber keine Plattformmigration. |
| CloakBrowser | blocked/no-go | Stealth-/Anti-Bot-Risiko. |
| free-claude-code | blocked/no-go | Credential-/ToS-/Account-Risiko. |

## Praktische Regel für Hermes

Wenn ein GitHub-Rising-Job ein Projekt empfiehlt, darf Hermes zuerst nur drei Dinge tun:

1. Kurzbericht schreiben: Nutzen, Risiken, Lizenz, Datenzugriff, Overlap.
2. Memory-Eintrag als Watch/ConceptOnly/TestNow speichern.
3. Einen sicheren Sandbox-Plan vorschlagen.

Hermes darf nicht selbst installieren, nicht ausführen und nicht mit echten Daten verbinden, bevor Chris explizit den konkreten P2-Test freigibt.

## Empfohlenes Vorgehen

Für Schulwerkstatt und Lese-App sind externe Repos vor allem Inspirationsquellen. Der direkte Wert liegt in Prinzipien: bessere Code-Kontextkarten, bessere Skill-Qualität, klareres Agent-Cockpit und lokale Memory-Architektur. Das Produkt selbst bleibt lokal, nachvollziehbar und ohne riskante Abhängigkeiten.
