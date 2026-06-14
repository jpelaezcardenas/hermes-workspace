# Decision Cleanup - codegraph P2 und agentmemory/Codex P4 - 2026-06-01

Status: vorbereitet fuer Chris-Entscheid
Signal: Yellow, aber kontrolliert
Scope: Entscheidungsverdichtung, keine Ausfuehrung

## Kurzfazit

Beide offenen Punkte sollen heute nicht automatisch ausgefuehrt werden.

Empfehlung:

- `codegraph` P2: parken, nur bei explizitem Bedarf in einer oeffentlichen Wegwerf-Sandbox wieder freigeben.
- agentmemory/Codex P4: bei MCP-only bleiben, keine dauerhafte Codex-Memory-Integration freigeben.

Grund: Hermes ist nach dem Nous-zu-Codex-Cutover und der Rollenmatrix-v2-Arbeit in einer Konsolidierungsphase. Die Codex-Inbox ist leer, laufende Arbeiten sollen nicht gestoert werden, und die aktuelle Decision Inbox sagt ausdruecklich: keine neuen grossen Missionen, keine Installs, keine Commits, keine Pushes, keine Loeschungen.

## Entscheidung 1 - `codegraph` P2

### Empfehlung

Parken.

### Warum

`codegraph` hat im bisherigen P2-Test gezeigt, dass ein lokaler Codebase-Kontext grundsaetzlich nuetzlich sein kann. Der Report vom 2026-05-18 beschreibt 113 indizierte Dateien, 1.650 Nodes, 4.292 Edges und brauchbare Orientierung auf Einstiegspunkte wie `src/index.ts` und `src/extraction/index.ts`.

Gleichzeitig bleiben drei Schutzgruende:

- produktive `picomatch` High-Audit-Warnung ist weiter der harte Risikopunkt;
- parallele Nutzung kann Datenbank-Locks erzeugen;
- Nutzen fuer Hermes/Lernwerkstatt ist noch nicht an einem mittleren, oeffentlichen Frontend-Beispiel bewiesen.

### Freigabe waere nur sauber, wenn

- Chris explizit `codegraph P2 freigeben` sagt;
- nur ein oeffentliches, nicht-sensibles Demo- oder Toy-Repo genutzt wird;
- kein privates Hermes-, LeseWerk-, Lernwerkstatt-, Schul- oder Finanz-Repo indiziert wird;
- keine globale Installation, kein MCP-Server, keine Hermes-Config-Aenderung und kein produktiver Hook entsteht;
- der Lauf zeitlich eng begrenzt bleibt und danach nur ein kurzer Nutzenbericht geschrieben wird.

### Nicht tun

- nicht in Hermes produktiv verdrahten;
- nicht als dauerhaft laufenden Dienst starten;
- nicht gegen private Repos laufen lassen;
- nicht als Voraussetzung fuer aktuelle GE- oder Rollenmatrix-Arbeit behandeln.

### Trigger zum Wiederaufnehmen

Wieder aufnehmen, wenn ein konkreter nicht-sensibler Code-Verstaendnisfall auftaucht, bei dem normale Suche/Lesen zu viel Zeit kostet und der Vergleich mit einem kleinen Codegraph-Kontext wirklich Erkenntnis liefern kann.

## Entscheidung 2 - agentmemory/Codex P4

### Empfehlung

Bei MCP-only bleiben. Keine dauerhafte P4-Freigabe.

### Warum

agentmemory bleibt strategisch interessant, weil Hermes von verlaesslicher Langzeit-Erinnerung profitieren kann. Fuer eine dauerhafte Codex-Verknuepfung ist der Punkt aber noch zu empfindlich.

Die bisherigen Reports nennen als Risiko:

- automatische Memory-Erfassung;
- Netzwerk-, Telemetrie- und Binding-Risiken aus frueherer Sichtung;
- unklare Grenze zwischen nuetzlicher Erinnerung und dauerhaftem Mitloggen;
- Datenschutzrisiko bei Schul-, Eltern-, Diagnose-, Finanz- oder Privatkontext.

Nach dem Modellwechsel weg von Nous sollte Memory-Verhalten erst beobachtet werden, bevor eine neue dauerhafte Schicht angebaut wird.

### Freigabe waere nur sauber, wenn

- ein konkreter wiederkehrender Memory-Schmerz belegt ist;
- klar festgelegt ist, was gespeichert werden darf und was nie gespeichert wird;
- Loeschen, Export und Review der Eintraege praktisch funktionieren;
- keine sensiblen Schul-/Diagnose-/Eltern-/Finanzdaten automatisch erfasst werden;
- Codex nicht selbststaendig projektuebergreifende Erinnerungen schreibt.

### Nicht tun

- keine automatische permanente Codex-Memory-Schicht aktivieren;
- keine Auto-Capture-Funktion fuer laufende Arbeit;
- keine Kopplung an sensible Hermes-Profile;
- keine Migration weg von dateibasierten Hermes-Reports als primaere Nachvollziehbarkeit.

### Trigger zum Wiederaufnehmen

Wieder aufnehmen, wenn Hermes ueber mehrere echte Arbeitstage denselben Kontextverlust zeigt, obwohl die bestehenden Reports, Goals, Rollenmatrix und Handoff-Regeln sauber genutzt wurden.

## Gemeinsame Entscheidung fuer heute

Empfohlener Chris-Entscheid:

```text
codegraph P2: PARKEN
agentmemory/Codex P4: MCP-ONLY BEIBEHALTEN
```

Damit wird aus zwei offenen, wiederkehrenden Entscheidungsresten eine klare Arbeitsregel:

- beobachten statt integrieren;
- nur explizit freigeben, wenn ein echter Bedarf entsteht;
- keine neuen externen Tools in laufende Hermes-Arbeit ziehen;
- Codex nach dem Nous-Auslauf sauber als Hauptarbeitskanal stabilisieren.

## Naechste kleinste Aktion

Keine neue Implementierung. Beim naechsten Hermes-Control-Lauf diese Notiz als Beleg nutzen und die Decision Inbox nicht erneut mit denselben offenen Punkten aufblasen, solange kein neuer Trigger vorliegt.

## Quellenlage

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/codegraph-p2/codegraph-p2-2026-05-18.md`
- `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-20.md`
- `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-25.md`
- `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-06-01.md`
