# Hermes Model Routing Policy v2

Stand: 2026-06-01

## Ziel

Modelle sollen passend zur Aufgabe gewaehlt werden, nicht aus Gewohnheit. GPT-5.5 ist die Premium-Schicht fuer anspruchsvolle Arbeit, aber nicht der Standard fuer jede Hermes-Antwort.

## Cutover-Hinweis

Am 2026-06-01 wurde wegen des Nous-Auslaufs am 2026-06-06 die aktive Profilnutzung von Nous auf `openai-codex` umgestellt. Die folgende Tabelle ist der neue Codex/ChatGPT-Stand nach Cutover.

## Aktuelle Profil-Defaults

| Profil | Aktueller Default | Provider | Bewertung |
|---|---|---|---|
| `neva` | `gpt-5.4-mini` | `openai-codex` | gut fuer Alltag/Orchestrierung, bei Deep-Synthesis eskalieren |
| `memory` | `gpt-5.4-mini` | `openai-codex` | gut fuer Memory-Hygiene, bei RiskGate/Policy auf GPT-5.4 |
| `coder` | `gpt-5.4` | `openai-codex` | Standard-Coding/Review-faehig; GPT-5.5 nur per Build-/Triage-Eskalation |
| `schule` | `gpt-5.4` | `openai-codex` | paedagogische QA und GE-Entscheidungen solide ohne GPT-5.5-Pauschale |
| `research` | `gpt-5.4-mini` | `openai-codex` | breite Scans guenstig; finale Quellen-Synthese auf GPT-5.4/5.5 eskalieren |
| `ideas` | `gpt-5.4-mini` | `openai-codex` | Ideenskizzen guenstig; finale PM-Spec ggf. GPT-5.5 |
| `lernwerkstatt` | `gpt-5.4-mini` | `openai-codex` | Reserve/Routine; nicht als Hauptprofil erzwingen |
| `finance` | `gpt-5.4` | `openai-codex` | Risiko-/Szenario-Synthese staerker; GPT-5.5 nur bei komplexer CEO-Entscheidung |

## Swarm-Preset-Defaults

| Swarm-Preset | Aktueller Default | Bewertung |
|---|---|---|
| Orchestrator | GPT-5.4 | passend |
| Builder | GPT-5.5 | passend fuer echte Code-Aenderungen |
| Reviewer | GPT-5.4 | passend |
| Triage | GPT-5.5 | passend bei Issue/PR-Fix, sonst teuer |
| Lab | GPT-5.4 | passend |
| Sage | GPT-5.5 | stark, aber fuer Routine-Recherche ggf. teuer |
| Scribe | GPT-5.5 | zu hoch fuer Routine-Doku; nur fuer komplexe System-Synthese |
| Foundation | GPT-5.4 | passend |
| QA | GPT-5.4 | passend |
| Mirror Integrations | GPT-5.4 | passend |

## Kosten-/Abbuchungsregel

```text
GPT-5.5 nur dann nutzen, wenn die Aufgabe eine echte Premium-Antwort braucht:
komplexer Code, harte Triage, Architekturentscheidung, finaler Product-Slice,
oder hohe strategische Synthese. Fuer Routine, Entwurf, Scan, Doku,
Memory-Hygiene und einfache Unterrichtsideen bleibt Hermes darunter.
```

## GPT-5.5 erlaubt

GPT-5.5 darf genutzt werden fuer:

- Builder bei echten Code-Aenderungen mit Tests/Build/Smoke.
- Triage, wenn Issue/PR reproduziert und gepatcht werden soll.
- Productklarheit PM, wenn ein finaler Produkt-Slice mit Architektur/UX/Akzeptanzkriterien entsteht.
- finale CEO-Synthese, wenn mehrere Fachperspektiven widersprechen.
- komplexe Systemarchitektur, wenn falsche Entscheidung hohe Folgekosten haette.

## GPT-5.5 nicht erlaubt

GPT-5.5 soll nicht Default sein fuer:

- einfache Tagesberichte;
- Handoff-Listen;
- Routine-Dokumentation;
- Memory-Kandidatensammlung;
- erste Materialideen;
- breite Link-/Quellen-Scans;
- einfache QA-Smokes;
- reine Umformulierungen;
- reine Archiv- oder Ordnungsarbeit.

## Zielrouting nach Rolle

| Aufgabe | Startmodell | Eskalation | Kommentar |
|---|---|---|---|
| Neva Tagesrouting | GPT-5.4-mini | GPT-5.4 | kurz und ruhig halten |
| CEO Deep Briefing | GPT-5.4 | GPT-5.5 | nur bei hoher Komplexitaet |
| Productklarheit Spec | GPT-5.4 | GPT-5.5 | finaler Produkt-Slice darf Premium nutzen |
| Code Build | GPT-5.5 | GPT-5.5 | Build-Korrektheit rechtfertigt Premium |
| Code Review | GPT-5.4 | GPT-5.5 | 5.5 nur fuer Architektur-/Sicherheitsreview |
| QA Smoke | GPT-5.4 | GPT-5.4 | 5.5 meist nicht noetig |
| GE Material Entwurf | GPT-5.4-mini | GPT-5.4 | finaler paedagogischer Check mit GPT-5.4 |
| Paedagogische QA | GPT-5.4 | GPT-5.4 | 5.5 selten noetig |
| Research Scan | GPT-5.4-mini | GPT-5.4/5.5 | 5.5 nur fuer finale Synthese |
| Memory Hygiene | GPT-5.4-mini | GPT-5.4 | Datenschutz/Policy eskaliert |
| RiskGate | GPT-5.4 | GPT-5.5 | 5.5 nur bei komplexer Tool-/Privacy-Policy |
| Finance Scan | GPT-5.4 | GPT-5.5 | 5.5 nur fuer komplexe CEO-Entscheidung |
| Lab Benchmark | lokal/GPT-5.4 | GPT-5.4 | 5.5 nur fuer Meta-Entscheidung |
| Scribe Doku | GPT-5.4-mini/GPT-5.4 | GPT-5.5 | 5.5 nur bei System-Design-Synthese |

## Empfohlene Config-Aenderungen

Umgesetzt am 2026-06-01:

- aktive Profil-Defaults laufen auf `openai-codex`;
- alle aktiven Auxiliary-Routen, die vorher `nous`/Gemini nutzten, laufen auf `openai-codex` + `gpt-5.4-mini`;
- der Remote-Model-Catalog-Fetch zur Nous-Domain ist deaktiviert;
- die alte Nous-Auth wurde beiseitegelegt, nicht geloescht.

Spaeter pruefen:

1. Swarm `Scribe` Default von GPT-5.5 auf GPT-5.4 senken, falls Scribe hauptsaechlich Routine-Doku macht.
2. Swarm `Sage` Default optional auf GPT-5.4 setzen und GPT-5.5 als Deep-Synthesis-Override nutzen.
3. `coder` Profil nicht pauschal auf GPT-5.5 setzen, solange echte Build-Arbeit ueber Swarm Builder laufen kann.
4. `ideas`, `research` und `lernwerkstatt` Defaults niedrig halten; finale Rollenmodi per Task auf GPT-5.4/GPT-5.5 eskalieren.
5. `neva` und `memory` Defaults behalten; sie sind als Alltagsschicht kostendiszipliniert.

## Config-Aenderungs-Gate

Eine Modell-Config darf erst geaendert werden, wenn:

1. Chris die konkrete Aenderung freigibt.
2. Der betroffene Worker gerade nicht an einem laufenden Task haengt.
3. Ein Backup der Config erstellt wurde.
4. Die Aenderung eine klare Kosten-/Qualitaetsbegruendung hat.
5. Danach ein kleiner Testlauf dokumentiert wird.

Mindest-Backup:

```bash
cp /Users/zondrius/.hermes/profiles/<profile>/config.yaml /Users/zondrius/.hermes/profiles/<profile>/config.yaml.backup-roles-v2-YYYYMMDD-HHMMSS
```

## Sofort gueltige Regel

Bis Chris Config-Aenderungen freigibt:

- Swarm Builder darf GPT-5.5 nutzen.
- Swarm Triage darf GPT-5.5 nutzen, wenn wirklich repro/fix/PR gefragt ist.
- Productklarheit PM darf GPT-5.5 fuer finale Spec nutzen.
- Alles andere startet niedriger und eskaliert bewusst.

Diese Regel ist Routing-Policy, keine Config-Aenderung.
