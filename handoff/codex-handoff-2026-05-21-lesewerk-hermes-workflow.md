# LeseWerk Hermes/Codex Workflow-Regel

Datum: 2026-05-21
Gilt fuer: kommende LeseWerk-Slices ab Alpha 70C
Quelle: Alpha 70A/70B liefen fachlich gut, aber Hermes blockte jeweils am Ende durch Browser-/Iterationsbudget.

## Zweck

Diese Datei ist keine konkrete Codex-Aufgabe, sondern eine Handoff- und Arbeitsregel. Sie soll verhindern, dass kleine LeseWerk-Slices wieder zu grossen Endloslaeufen werden.

## Kernregel

Ein LeseWerk-Slice wird erst dann gestartet, wenn Ziel, Nicht-Ziel, Dateien, Akzeptanzkriterien, Verifikation, Stop-Regel und Reportpfad klar sind.

Wenn ein Slice Code aendert:
1. relevante Dateien lesen;
2. kleinste Aenderung planen;
3. Code/Test minimal aendern;
4. Report frueh anlegen;
5. Tests laufen lassen;
6. Build laufen lassen;
7. Browser-Smoke begrenzt durchfuehren;
8. Report finalisieren;
9. Kanban abschliessen oder bei echter Unsicherheit gezielten Handoff schreiben.

## Harte Stop-Regel

Nach gruenem Test/Build und einem repraesentativen sichtbaren Browserpfad wird nicht weiter perfektioniert.

Wenn Browsersteuerung instabil ist:
- maximal zwei Navigationsstrategien versuchen;
- dann dokumentieren, ob es ein App-Fehler oder Teststeuerungsrisiko ist;
- keine Endlosschleife;
- Report sichern;
- ggf. Codex-Handoff fuer genau diese Browser-/Verifikationsfrage schreiben.

## Wann Neva allein arbeitet

Neva arbeitet allein bei:
- Prozessanalyse;
- Report-/Handoff-Erstellung;
- Task-Schnitt;
- Qualitaetsregeln;
- kleinen Konzeptentscheidungen ohne Codeaenderung.

## Wann Coder/Codex eingesetzt wird

Coder/Codex wird eingesetzt bei:
- src-/test-Aenderungen;
- Browser-/Build-/Testproblemen;
- UI- oder CSS-/SVG-Umsetzung;
- finaler Verifikation, wenn Hermes im Browserbudget haengt.

Codex bekommt immer nur eine kleine, file-spezifische Aufgabe. Keine breiten App-Auftraege.

## Wann Schule/Lernwerkstatt eingesetzt wird

Schule/Lernwerkstatt wird eingesetzt, wenn:
- neue Inhalte oder Wortauswahl entstehen;
- GE-Angemessenheit unklar ist;
- Hilfesystem, Fehlerrueckmeldung oder Belastung fuer Kinder geaendert werden;
- didaktische Sprache bewertet werden muss.

Nicht noetig fuer reine technische/visuelle Politur vorhandener Inhalte, wenn keine neue Lernanforderung entsteht.

## Wann Research eingesetzt wird

Research nur nutzen, wenn aktuelle externe Quellen, wissenschaftliche Belege, Lizenzen oder Toolentscheidungen relevant sind. Fuer LeseWerk-Alpha-70C ist Research nicht noetig, weil keine externen Assets und keine neuen Quellen gewuenscht sind.

## Mini-Template fuer jeden naechsten LeseWerk-Slice

```text
Ziel:

Nicht-Ziel:

Betroffene Dateien:

Akzeptanzkriterien:
1.
2.
3.

Verifikation:
- Tests:
- Build:
- Browser-Smoke begrenzt auf:

Stop-Regel:

Reportpfad:

Handoff falls noetig:
```

## Naechste geplante Reihenfolge

1. Alpha 70C: visuelle Premium-Symbolkarten fuer Mama/Sofa/Tasse/Lama, ohne neue Inhalte, ohne externe Assets.
2. Alpha 70D: Lehrkraft-Auswahl verstaendlicher machen, ohne neue Kinderaufgabe.
3. Alpha 70E: Inhaltsmatrix und naechste Wortfamilien-Entscheidung, noch ohne Implementierung neuer Woerter.

## Verweis

Ausfuehrlicher Report:
`/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c0-hermes-self-improvement-loop.md`
