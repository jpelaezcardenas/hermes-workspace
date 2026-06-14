# Hermes CEO Cockpit - Blocked Monitoring Review

Stand: 2026-05-26, lokale Kanban-DB geprüft unter `/Users/zondrius/.hermes/kanban.db`.

## 1. Kurzfazit

Hermes braucht aktuell keine neue Backend-Logik, sondern eine konsequente CEO-Routine: Board-Zustand prüfen, Blocker lesen, Ergebnisdateien öffnen, nur einen nächsten Mini-Slice starten.

Der aktuelle Board-Zustand ist grundsätzlich gesund:

- Green: 292 erledigte Tasks, 57 archivierte Tasks, keine alten `ready`, `todo` oder `triage`-Reste sichtbar.
- Yellow: 3 laufende Tasks zur aktuellen Schulwerkstatt-/Hermes-Arbeit.
- Red/Blocker: 1 blockierter Task (`t_53a2b37e`, Profil `memory`, Fehler: `pid 52764 not alive`).

Wichtigste Regel: Blocked ist kein Scheitern, sondern ein Stoppschild. Ein blockierter oder übergroßer Task wird nicht unverändert neu gestartet. Erst Diagnose, dann kleiner Slice, dann Handoff oder Entscheidung.

## 2. Aktueller Board-Snapshot

Abfrage am Board:

| Status | Anzahl | Bewertung |
|---|---:|---|
| blocked | 1 | prüfen, nicht ignorieren |
| running | 3 | normal, aber Ergebnisdateien später prüfen |
| done | 292 | gesunde Historie, Ergebnisberichte nutzbar |
| archived | 57 | kein akuter Handlungsbedarf |
| ready | 0 | gut: keine wartenden Sofortstarter |
| triage | 0 | gut: keine ungeklärten Eingangskarten |
| todo | 0 | gut: keine wartenden Abhängigkeiten sichtbar |

Aktive oder kritische Tasks:

| Task | Status | Profil | Titel | CEO-Aktion |
|---|---|---|---|---|
| `t_53a2b37e` | blocked | memory | Hermes CEO - Externe Repo Sicherheitsregel | Blocker prüfen: Ist das nur Spawn/PID-Fehler oder fehlt eine menschliche Entscheidung? Danach neu klein schneiden oder reassignen. |
| `t_5b267ddd` | running | coder | Schulwerkstatt v8 - CEO Implementierungs-Slice vorbereiten | Nach Abschluss Ergebnisdatei und Review-Handoff lesen. Keine neue Feature-Kette starten, bevor Startfluss/Layout/Risiken geprüft sind. |
| `t_91e24d7f` | running | neva | Hermes CEO - Cockpit Blocked Monitoring Review | Dieser Report. |
| `t_6167c97d` | running | schule | Schulwerkstatt v8 - LeseWerk Vernetzungsplan | Nach Abschluss pädagogische Umsetzbarkeit und Datenschutz prüfen. |

Letzte relevante Ergebnisse:

- `t_5888a556`: Schulwerkstatt v8 S-Tier Qualitätsrunde abgeschlossen; Report: `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-v8-qualitaetsrunde-report.md`
- `t_1ef4236a`: Hermes Future Capability Radar abgeschlossen; Report: `/Users/zondrius/hermes-workspace/reports/hermes-future-capability-radar-2026-05-25.md`
- Mehrere Schulwerkstatt-v3 bis v7B Tasks wurden bereits mit CEO-Review abgeschlossen.

## 3. Status-Legende: Was Chris jeweils tun sollte

### triage

Bedeutung: Eine Idee oder Aufgabe ist noch nicht arbeitsfähig. Ziel, Akzeptanzkriterien, Profil oder Risiko sind unklar.

Chris sollte:
- Nicht sofort starten.
- In einen klaren Mini-Auftrag übersetzen: Ziel, Output-Datei, Akzeptanzkriterien, Profil.
- Bei Schul-/Schülerbezug zuerst anonymisieren und Datenschutzgrenze setzen.

Warnsignal:
- Triage älter als 24-48 Stunden bedeutet meist: Idee ist zu breit oder nicht wichtig genug.

### todo

Bedeutung: Aufgabe wartet auf Eltern/Abhängigkeiten. Sie ist geplant, darf aber noch nicht laufen.

Chris sollte:
- Prüfen, welcher Parent fehlt.
- Nicht manuell parallel starten, wenn Ergebnis eines Parents nötig ist.
- Wenn Parent blockiert ist: erst Parent lösen, nicht den Child erzwingen.

Warnsignal:
- Viele `todo`-Tasks bedeuten oft: zu große Pipeline, zu viele Abhängigkeiten.

### ready

Bedeutung: Aufgabe ist startbereit, aber noch nicht von einem Worker übernommen.

Chris sollte:
- Prüfen: Ist der Assignee ein existierendes Profil?
- Wenn Task lange ready bleibt: Profilname, Gateway/Dispatcher, Skills oder Model prüfen.
- Alte ready-Tasks entweder starten lassen, neu zuschneiden oder archivieren.

Warnsignal:
- `ready` länger als 15-30 Minuten bei aktivem Gateway: wahrscheinlich Spawn-/Profilproblem.

### running

Bedeutung: Worker arbeitet oder ist claimed.

Chris sollte:
- Nicht sofort eingreifen.
- Bei langen Läufen auf Heartbeats, gestartete Zeit und Ergebnisdateien achten.
- Wenn `running` hängt: prüfen, ob Prozess noch lebt; bei stale Claim reclaimen oder neu slicen.

Warnsignal:
- Running ohne Heartbeat und ohne Prozess über längere Zeit: wahrscheinlich stale/hängender Run.

### blocked

Bedeutung: Worker konnte sicher nicht fortfahren oder wurde durch Fehler/Review gestoppt.

Chris sollte:
- Blockgrund und Kommentare lesen.
- Entscheiden: beantworten, reassignen, reclaimen, archivieren oder kleiner neu schneiden.
- Nie denselben Riesenprompt unverändert neu starten.

Warnsignal:
- Blocked ohne verständlichen Kommentar: Diagnose-Task oder manuelle Board-Prüfung nötig.

### done

Bedeutung: Task ist abgeschlossen. Wichtig ist nicht nur der Status, sondern das Ergebnis.

Chris sollte:
- Ergebnisdatei öffnen.
- Decision Inbox / Next Actions lesen.
- Bei Code-/Materialänderungen: Review Required ernst nehmen, nicht automatisch als „fertig für Klasse“ werten.

Warnsignal:
- Viele `done`, aber keine sichtbare Nutzung: Reports sammeln sich, ohne in Entscheidungen überzugehen.

### archived

Bedeutung: Aus dem aktiven Blick genommen.

Chris sollte:
- Normalerweise ignorieren.
- Nur bei vermissten Tasks oder widersprüchlichem Verlauf prüfen.

## 4. Ampel-Logik für Hermes-Projekte

### Green

Ein Projekt ist Green, wenn:
- keine blockierten Tasks oder nur erklärbare, harmlose Blocker existieren;
- keine alten `ready`/`triage`-Tasks liegen bleiben;
- laufende Tasks klaren Output und kleine Akzeptanzkriterien haben;
- Ergebnisdateien vorhanden und lesbar sind;
- für Schulwerkstatt/LeseWerk Datenschutz, Startfluss, mobile Nutzung und GE-Passung geprüft sind.

CEO-Aktion:
- Nächsten Mini-Slice starten oder vorhandenes Ergebnis praktisch nutzen.

### Yellow

Ein Projekt ist Yellow, wenn:
- 1-2 Blocker existieren, aber lösbar wirken;
- Tasks `running` sind, aber noch nicht verifiziert;
- Reports existieren, aber Next Actions unklar sind;
- Review Required vorliegt;
- Inhalte pädagogisch plausibel sind, aber noch nicht im echten Klassenfluss geprüft wurden.

CEO-Aktion:
- 10-Minuten-Review machen: Ergebnis öffnen, Blocker lesen, genau eine nächste Aktion wählen.

### Red

Ein Projekt ist Red, wenn:
- derselbe Task mehrfach blockiert/timed out/crasht;
- ein großer Prompt unverändert erneut gestartet werden soll;
- Profil/Assignee nicht existiert oder Worker nicht spawnt;
- sensible Schüler-/Eltern-/Diagnosedaten in Aufgaben oder Reports stehen;
- Code-/Materialänderungen ohne Review direkt als einsatzbereit behandelt werden;
- mehrere offene Review Required Handoffs unentschieden bleiben.

CEO-Aktion:
- Stoppen. Diagnose statt Weiterbauen. Aufgabe teilen: 1) Problem lesen, 2) kleinster reproduzierbarer Slice, 3) Review/Handoff.

## 5. Tägliches Mini-Ritual

### Phase A: 3 Minuten Kontrolle

1. Board-Zahlen ansehen:
   - blocked
   - running
   - ready
   - triage
2. Nur die roten/gelben Zeilen öffnen:
   - blocked zuerst;
   - alte ready/triage danach;
   - running nur, wenn offensichtlich hängt.
3. Ergebnisberichte der letzten fertigen Tasks merken, aber noch nicht tief lesen.

Leitfrage:
Was braucht heute eine Entscheidung, damit Hermes nicht nur arbeitet, sondern fertig wird?

### Phase B: 10 Minuten Review

1. Genau einen aktuellen Ergebnisbericht öffnen.
2. Prüfen:
   - Was wurde wirklich erstellt?
   - Wo liegt die Datei?
   - Welche Tests/Verifikationen wurden genannt?
   - Gibt es Review Required?
   - Gibt es Datenschutz- oder Schulalltagsrisiken?
3. Entscheidung in einen Bucket sortieren:
   - SOFORT_MACHEN
   - CHRIS_ENTSCHEIDET
   - BEOBACHTEN
   - SPAETER
   - BLOCKIERT
   - NICHT_TUN

Leitfrage:
Welche eine Handlung bringt das Projekt sichtbar weiter, ohne neue Unordnung zu erzeugen?

### Phase C: Nächster Mini-Slice

Nur eine kleine Folgeaktion starten:
- eine Datei prüfen;
- einen Flow im Browser testen;
- eine Aufgabe pädagogisch reviewen;
- einen Blocker beantworten;
- einen Implementierungs-Slice mit klarer Output-Datei beauftragen.

Nicht starten:
- „alles verbessern“;
- „gesamte Lernwerkstatt finalisieren“;
- mehrere Feature-Ketten gleichzeitig;
- Installationen/Migrationen ohne RiskGate.

## 6. Notfallregel gegen Blocked-Schleifen

Wenn ein Task blockiert, timed out oder wegen Iteration Budget erschöpft endet:

1. Nicht denselben Prompt unverändert neu starten.
2. Erst Ursache klassifizieren:
   - Spawn/PID/Gateway-Problem?
   - fehlende menschliche Entscheidung?
   - zu großer Scope?
   - fehlende Datei/Quelle?
   - Datenschutz-/Sicherheitsrisiko?
   - Review Required?
3. Dann klein schneiden:
   - Diagnose-Task: „Lies nur Task X, Kommentare, Ergebnisdateien; nenne Ursache und kleinste nächste Aktion.“
   - Mini-Slice: „Ändere nur eine sichtbare Sache; schreibe Report; teste genau einen Flow.“
   - Handoff: „Wenn Review nötig ist, kommentieren und blockieren, nicht auto-completen.“
4. Erst nach Diagnose reclaimen/reassignen/unblocken.

Merksatz:
Blocked ist kein Gegner. Blocked ist die Stelle, an der Hermes aufhören soll zu raten.

## 7. Konzeptuelle Inspiration aus multica/orca

Nur konzeptionell, keine Installation und keine Migration.

Nützlich übertragbare Ideen:
- Agent-Cockpit: Wer arbeitet gerade woran?
- Fortschritt sichtbar machen: nicht nur „done“, sondern Ergebnislink, Entscheidung, nächster Schritt.
- Rollen klar zeigen: coder, schule, research, memory, neva.
- Handoffs dokumentieren: Was wurde geprüft? Was ist offen? Was darf noch nicht automatisch passieren?
- Ergebnislinks zentral sammeln: Reports, lokale App-Pfade, Review-Dateien.

Nicht übernehmen ohne eigene Prüfung:
- externe Orchestrierungslogik;
- neue Installationen;
- Migration bestehender Hermes-Prozesse;
- automatische Recovery-Aktionen ohne Chris-Freigabe.

## 8. Vorschlag: Schulwerkstatt-interne CEO-Übersicht

Später sinnvoll, aber nicht jetzt erzwingen: Eine kleine lokale Übersicht im Schulwerkstatt-Projekt, z. B. als Markdown oder einfache HTML-Seite.

Mögliche Felder:

| Bereich | Inhalt |
|---|---|
| Aktueller Stand | Version, letzter geprüfter Slice, offene Review Required Punkte |
| Ergebnislinks | Reports, App-Pfad, relevante Task-IDs |
| Qualitätslücken | Startfluss, mobile Ansicht, Druck, GE-Passung, Datenschutz, Team-Verständlichkeit |
| Nächster Mini-Schritt | genau eine Aufgabe, maximal 30-60 Minuten Agentenarbeit |
| Nicht jetzt | Ideen, die bewusst geparkt sind |

Für Schulwerkstatt/LeseWerk besonders wichtig:
- keine Namen echter Schüler;
- keine Diagnosen in Aufgaben/Reports;
- keine Ranking-/Notenlogik;
- keine Regelschulnorm als versteckter Maßstab;
- Startbuttons, Schülerfluss, Tablet/Mobile und Ausdruck prüfen, bevor neue Features wachsen.

## 9. Konkrete Next Actions für aktuelle Schulwerkstatt/LeseWerk-Arbeit

### SOFORT_MACHEN

Nach Abschluss von `t_5b267ddd` und `t_6167c97d` jeweils nur die Ergebnisdatei öffnen und folgende vier Punkte abhaken:

1. Gibt es einen klaren Pfad zur Datei oder App?
2. Wurde ein Schüler-Startfluss oder Materialfluss wirklich geprüft?
3. Gibt es Review Required oder offene Risiken?
4. Was ist genau der nächste kleinste Slice?

### CHRIS_ENTSCHEIDET

Für `t_53a2b37e` entscheiden:
- Soll der blockierte Memory-Task neu gestartet/reassigned werden?
- Oder reicht eine manuelle Regel im CEO-Report: keine externen Repo-Integrationen ohne RiskGate?

Meine Empfehlung: nicht blind unblocken. Erst Blockgrund lesen; bei reinem PID-Fehler als kleinen Diagnose-/Memory-Slice neu starten lassen.

### BEOBACHTEN

- Ob `ready`/`triage` wieder anwachsen.
- Ob Review Required Handoffs zwar erledigt wirken, aber praktisch nicht von Chris geprüft wurden.
- Ob große Schulwerkstatt-Prompts wieder Iteration-Budget-Probleme erzeugen.

### NICHT_TUN

- Kein multica/orca installieren.
- Keine Migration des Hermes-Backends.
- Keine automatische Veröffentlichung, Pushes, Löschungen oder Repo-Änderungen aus Monitoring heraus.
- Keine sensiblen Schülerdaten in Board, Reports oder Memory eintragen.

## 10. CEO-Checkliste zum Kopieren

Täglich:

```text
1. Board-Ampel:
   blocked: __ / running: __ / ready: __ / triage: __

2. Rote Karte zuerst:
   Task-ID:
   Blockgrund:
   Entscheidung: beantworten / reassignen / archivieren / kleiner Slice

3. Ein Ergebnis öffnen:
   Datei:
   wirklich geprüft: ja/nein
   Risiko:
   nächster kleinster Schritt:

4. Stop-Regel:
   Starte ich gerade denselben Riesenprompt nochmal? Wenn ja: abbrechen und Diagnose-Slice machen.
```

## 11. Decision Inbox

- Signal: Yellow
- SOFORT_MACHEN: Nach Abschluss der zwei laufenden Schulwerkstatt/LeseWerk-Tasks je Ergebnisdatei öffnen und nur eine nächste Mini-Aktion wählen.
- CHRIS_ENTSCHEIDET: Blockierten Task `t_53a2b37e` prüfen: neu als kleiner Diagnose-/Memory-Slice starten oder archivieren.
- BEOBACHTEN: Ob neue `ready`/`triage`-Reste oder Review Required Handoffs liegen bleiben.
- SPAETER: Lokale Schulwerkstatt-CEO-Übersicht als Markdown/HTML mit Ergebnislinks und Qualitätslücken.
- BLOCKIERT: nichts Grundsätzliches; nur `t_53a2b37e` braucht Board-Entscheidung.
- NICHT_TUN: keine Installationen, keine Migration, kein unveränderter Neustart großer Prompts, keine sensiblen Schülerdaten.
- Naechste kleinste Aktion: `t_53a2b37e` öffnen und entscheiden, ob PID-Fehler reicht für Reassign/kleinen Neustart oder ob eine inhaltliche Sicherheitsregel manuell dokumentiert wird.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-cockpit-blocked-monitoring-review-2026-05-26.md`
