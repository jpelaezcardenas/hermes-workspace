# Hermes Workflow Governance v1

Datum: 2026-05-26

## Ziel

Die wiederkehrenden Hermes-Probleme sollen direkt im System abgefedert werden:

- zu grosse Goals,
- Tasks, die scheinbar laufen, aber nichts tun,
- fehlende Reports/Screenshots,
- unklare Ergebnisorte,
- zu viele oder falsche Agenten,
- wiederholtes Retryen derselben blockierten Aufgabe.

## Umgesetzt

Geaendert oder angelegt:

- `/Users/zondrius/.hermes/memories/MEMORY.md`
- `/Users/zondrius/.hermes/memory/workflows/hermes-ceo-execute-loop.md`
- `/Users/zondrius/.hermes/memory/prompts/ceo-execute-goal-template.md`
- `/Users/zondrius/.hermes/skills/orchestration/hermes-agent-operating-system/SKILL.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/memory/schulwerkstatt-quality-pattern.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-26-hermes-workflow-governance/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-26-hermes-workflow-governance/EXECUTE_PLAN.md`

## Neue Regeln

1. Grosse Ziele werden nicht als Monsterprompt ausgefuehrt.
2. Es gibt eine Mission und dann kleine pruefbare Slices.
3. Maximal 1-3 Helfer gleichzeitig.
4. Jeder nicht-triviale Task braucht ein Artefakt.
5. UI-Aufgaben brauchen nach Moeglichkeit Screenshot und Browser-Smoke.
6. Connector-Aufgaben brauchen Linkcheck.
7. Memory-Aufgaben nennen exakt die Memory-/Skill-Dateien.
8. Idle-Watchdog: nach 3-5 Minuten ohne sinnvollen Fortschritt reclaimen und enger neu starten.
9. Nicht denselben blockierten Prompt unveraendert retryen.
10. Abschluss immer mit Boardstatus und naechstem kleinsten Slice.

## Empfehlung fuer Chris' Arbeitsmodus

Wenn Chris sagt `go on`, `alles umsetzen`, `weltklasse`, `du hast alle Freiheiten`:

1. CEO formuliert Oberziel.
2. CEO erstellt 1-3 erste Slices.
3. `coder` setzt konkrete UI/Code-Slices um.
4. `schule` prueft GE-/Unterrichtsqualitaet, wenn relevant.
5. `memory` prueft Regeln nur, wenn dauerhaftes Lernen entsteht.
6. CEO kontrolliert Board, Reports, Screenshots und naechsten Slice.

## Noch offen

Ein Hermes-Validierungstask soll pruefen, ob die neuen Regeln fuer einen kuenftigen Task abrufbar und anwendbar sind.

