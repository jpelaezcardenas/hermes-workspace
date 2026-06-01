# Goal: Hermes Rollenmatrix v2

Status: policy-complete-no-config-change
Start: 2026-06-01
Owner: Chris / Neva
Mode: Governance + Role Policy first, no direct profile/config mutation

## Leitentscheidung

Hermes soll nicht durch mehr zufaellige Agenten besser werden, sondern durch eine klarere Fuehrungsstruktur:

1. Chris bleibt CEO und entscheidet Richtung, Risiko und Freigaben.
2. Neva wird als Chief-of-Staff / COO / Orchestrator geschaerft.
3. Spezialisten arbeiten in klaren Rollenmodi mit Output-Vertrag.
4. Builder, Reviewer, QA und RiskGate werden sauber getrennt.
5. GPT-5.5 wird nur dort genutzt, wo es den Mehrwert rechtfertigt: komplexe Code-Slices, anspruchsvolle Produktarchitektur, harte Triage oder finale Synthese. Alles andere bleibt unterhalb davon.

Dieses Goal legt die Rollen richtig an, ohne laufende Hermes-Arbeit zu stoeren. Es aendert deshalb in v1 keine aktiven Profile, keine Swarm-Code-Dateien, keine Cronjobs und keine Handoff-Dateien. Die Rollen werden als ausfuehrbare Rollenmatrix und Modellrouting-Policy angelegt. Erst nach Chris-Freigabe duerfen daraus Config- oder UI-Aenderungen entstehen.

## Warum jetzt

Am 2026-06-01 ist bereits eine `Hermes Execution Layer v1` in Arbeit. Diese beruehrt Workspace-Code, API, UI und Reports. Rollenmatrix v2 darf damit nicht kollidieren.

Die Rollenpruefung hat gezeigt:

- Hermes-Profile sind vorhanden und grundsaetzlich gut: `neva`, `schule`, `coder`, `research`, `ideas`, `finance`, `memory`, `lernwerkstatt`.
- Workspace-Swarm-Presets sind ebenfalls vorhanden: Orchestrator, Builder, Reviewer, Triage, Lab, Sage, Scribe, Foundation, QA, Mirror Integrations, Custom.
- Die Luecke liegt in der Bruecke zwischen beiden Systemen.
- `coder` ist zu breit, weil Build, Review und Architektur zusammenfallen.
- `schule` ist fachlich stark, aber braucht einen expliziten `Paedagogische QA`-Modus.
- `ideas` ist Startup-/Business-stark, aber nicht dasselbe wie `Productklarheit PM`.
- `memory` ist gut, sollte aber als `RiskGate / Privacy Veto` sichtbarer werden.
- Modellzuordnung ist uneinheitlich: Swarm-Presets nutzen GPT-5.4/GPT-5.5, die meisten Hermes-Profile stehen auf `google/gemini-3-flash-preview`.

## Zielbild

Hermes bekommt eine stabile Governance-Leiter:

```text
Chris
  CEO / Approval / Richtung / Risiko

Neva
  Chief of Staff / COO / Orchestrator

Rollenmodi
  Productklarheit PM
  Paedagogische QA / GE-Testpilot
  Builder
  Reviewer
  RiskGate / Privacy
  Research / Sage
  Scribe / Memory
  Foundation / Ops
  Finance / Scenario
  Lab / Experiment
```

Diese Rollenmodi sind zunaechst keine neuen Hermes-Profile. Sie sind Routing-Kontrakte. Ein neues Profil wird erst angelegt, wenn ein Modus mindestens dreimal gebraucht wurde, wiederholt unklar war oder andere Profile ueberlastet.

## In Scope

- Rollenmatrix v2 als lokale Hermes-Quelle anlegen.
- Modellrouting-Policy anlegen.
- Aktuelle Modell-Defaults dokumentieren.
- GPT-5.5-Nutzung auf Premium-/Build-/Deep-Synthesis-Faelle begrenzen.
- Klare Freigabe-Gates fuer spaetere Config-Aenderungen definieren.
- Konfliktcheck mit der laufenden Execution-Layer-Arbeit dokumentieren.
- Kurzen Hermes-Control-Report schreiben.

## Out of Scope

- Keine direkte Aenderung an `/Users/zondrius/.hermes/profiles/*/config.yaml`.
- Keine direkte Aenderung an `/Users/zondrius/hermes-workspace/src/screens/swarm2/swarm2-screen.tsx`.
- Keine neuen aktiven Agentenprofile in v1.
- Keine neuen Cronjobs.
- Keine Handoff-Archivierung.
- Keine Modell-/Provider-Installation.
- Keine API-Key-, Token-, Account- oder externe Aktion.
- Kein Commit, Push oder Deploy.

## Success Criteria

- Es gibt eine Rollenmatrix v2 mit klaren Verantwortungen.
- Es gibt eine Modellrouting-Policy mit Kosten-/Abbuchungsdisziplin.
- GPT-5.5 ist nicht pauschal Default, sondern gezielt fuer High-Value-Arbeit vorgesehen.
- Bestehende Profile bleiben unangetastet.
- Laufende Execution-Layer-Arbeit wird nicht ueberschrieben.
- Spaetere Config-Aenderungen sind exakt gegated und muessen von Chris freigegeben werden.
- Neva kann kuenftig sicher entscheiden: selbst arbeiten, delegieren, reviewen lassen, RiskGate holen oder Chris fragen.

## Abbruchkriterien

Stoppen, wenn:

- eine Config-Aenderung ohne explizite Freigabe noetig scheint;
- die Rollenmatrix neue Profile erzwingt;
- GPT-5.5 als Standard fuer einfache Reports, Docs oder Materialideen vorgeschlagen wird;
- bestehende Execution-Layer-Dateien beruehrt werden muessten;
- offene Handoffs oder aktive Goals durch Rollenarbeit verdraengt wuerden.

## Erwartete Dateien

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/ROLE_MATRIX_V2.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/MODEL_ROUTING_POLICY.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/VALIDATION.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-rollenmatrix-v2-2026-06-01.md`

## /goal Prompt

/goal Build Hermes Rollenmatrix v2 as a safe governance and model-routing update for Chris' Hermes setup. Do not mutate active profile configs, Swarm UI presets, cronjobs, handoffs, execution-layer code, API keys or external services in v1. First document the exact CEO-to-worker role hierarchy, role modes, output contracts, when to create a real new profile, and which model tier each role should use. GPT-5.5 must be reserved for complex build, hard triage, high-value product architecture and final deep synthesis; cheaper/lighter models are preferred for drafts, scans, routine docs and memory hygiene. End with a validation report and a Hermes Control summary so Chris can approve or reject the next implementation slice.
