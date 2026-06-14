# Alpha 70C-0 - Hermes LeseWerk Selbstverbesserungsloop

Datum: 2026-05-21
Status: Gruen
Auftrag: keine App-Aenderung, sondern Arbeitsstruktur fuer stabilere kommende LeseWerk-Slices.

## 1. Kurzfazit

Alpha 70A und 70B waren fachlich erfolgreich, liefen aber jeweils am Ende in Browser-/Iterationslimits. Das Muster ist klar: Hermes erledigte zu viel in einem Durchlauf, verschob Report und Abschluss zu spaet, und behandelte Browser-Smoke als ausgedehnten Endpruefungsblock statt als begrenzten eigenen Slice. Fuer die naechsten LeseWerk-Aufgaben braucht Hermes deshalb nicht mehr Motivation, sondern haertere Prozessgrenzen: kleine Slices, fruehe Ergebnisdatei, Tests/Build vor Browser, Browser-Smoke mit Stop-Regel, und bei Unsicherheit sauberer Handoff statt Endlosschleife.

Diese Datei ist die verbindliche Arbeitsgrundlage fuer Alpha 70C bis 70E. Zusaetzlich wurde eine Handoff-/Workflow-Regel angelegt unter:

`/Users/zondrius/hermes-workspace/handoff/codex-handoff-2026-05-21-lesewerk-hermes-workflow.md`

Begruendung fuer diesen Ort: Die wiederkehrenden Alpha-70-Probleme betreffen nicht die App selbst, sondern die Hermes/Codex-Uebergabe, Abschlussdisziplin und Slice-Steuerung. Der Handoff-Ordner ist deshalb passender als ein weiterer App-Quelltext- oder Test-Ort.

## 2. Gelesene Ausgangsberichte

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70a-premium-journey-quality-matrix.md`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70b-story-choice-quality-report.md`

## 3. Problemursache: Warum 70A/70B trotz guter Arbeit in Limits liefen

### 3.1 Alpha 70A

Was gelang:
- Die vier Premium-Lesereisen Mama, Sofa, Tasse und Lama waren am Ende technisch stabil.
- Tests und Build waren gruen.
- Desktop- und Mobile-Smoke wurden durch Codex sauber abgeschlossen.
- Die Qualitaetsmatrix wurde nachtraeglich nutzbar dokumentiert.

Warum Hermes in Limits lief:
1. Der Auftrag enthielt Audit, technische Absicherung, Browserpruefung, didaktische Bewertung und Report in einem Lauf.
2. Browser-Smoke wurde als grosser Gesamt-Smoke fuer vier Reisen behandelt. Das erzeugt viele UI-Zustaende, viele Klickpfade und hohe Schleifenwahrscheinlichkeit.
3. Der Abschlussreport kam zu spaet. Dadurch gab es keinen stabilen Zwischenstand, als das Budget knapp wurde.
4. Hermes pruefte weiter, statt nach harten Nachweisen frueh zu stoppen und Unsicherheiten offen zu dokumentieren.
5. Codex musste den Abschluss uebernehmen, obwohl Hermes den Audit fachlich vorbereitet hatte.

### 3.2 Alpha 70B

Was gelang:
- Die generische Karte `Da ist Licht` wurde aus der Mini-Geschichte-Auswahl entfernt.
- Mama, Sofa, Tasse und Lama bekamen bewusstere Ziel- und Ablenkerkarten.
- Test und Build waren gruen: 207/207 Tests, Build erfolgreich.
- Ein Teil-Smoke zeigte, dass Tasse bis Mini-Geschichte erreichbar war und die neuen Karten sichtbar waren.

Warum Hermes wieder in Limits lief:
1. Der Kernauftrag war eigentlich klein, aber der Browser-Smoke wurde nach dem erfolgreichen Test/Build zu breit.
2. Hermes versuchte, die Browser-Auswahl fuer alle vier Reisen vollautomatisch hart freizugeben, obwohl die UI-Zustaende nicht eindeutig genug fuer einen stabilen automatischen Test waren.
3. Die Reportpflicht wurde erneut ans Ende gelegt. Als der Smoke schwierig wurde, fehlte der fertige Abschluss.
4. Es gab keine klare Stop-Regel wie: ein repraesentativer Pfad + dokumentierte Einschraenkung reicht fuer diesen Slice.
5. Die Aufgabe vermischte Inhaltspolitur, Testabsicherung, Browserverifikation und Abschlusskommunikation.

### 3.3 Gemeinsames Muster

Das Problem war nicht fehlende Kompetenz, sondern fehlende Laufbegrenzung. Hermes arbeitete wie ein Perfektionierer: immer noch ein Pfad, noch ein Klick, noch eine Variante. Fuer LeseWerk ist das gefaehrlich, weil UI-Pruefung und GE-Qualitaet zwar wichtig sind, aber schnell unendlich werden. Die Loesung ist eine feste Ergebnisschleife: erst klein bauen, dann hart pruefen, dann sofort schreiben, dann nur noch gezielt nachpruefen.

## 4. Feste Hermes-Regeln fuer kommende LeseWerk-Aufgaben

1. Ein Slice hat genau ein Primaerziel.
   Beispiel: Alpha 70C verbessert nur die visuelle Symbolkarten-Qualitaet fuer bestehende Karten. Keine neuen Woerter, keine neue Lernlogik, keine neue Navigation.

2. Der Report wird vor dem Browser-Endsmoke angelegt.
   Spaetestens nach Code-/Inhaltsaenderung und erstem Test/Build muss eine Reportdatei mit Kurzfazit, Dateien, Verifikation offen sein. Browserbefunde werden ergaenzt, nicht erst danach komplett geschrieben.

3. Tests und Build kommen vor Browser.
   Wenn Code beruehrt wurde: zuerst relevante Tests, dann Build, dann Browser. Browser darf keine fehlende Test-/Build-Klarheit ersetzen.

4. Browser-Smoke ist ein eigener begrenzter Pruefblock.
   Fuer kleine Slices reicht: App laedt, betroffener Einstieg funktioniert, ein vollstaendiger repraesentativer Pfad funktioniert, sichtbarer Zielzustand passt. Vollpruefung aller Varianten nur, wenn der Auftrag exakt das verlangt.

5. Jede Browserpruefung hat eine harte Stop-Regel.
   Maximal zwei Navigationsstrategien. Wenn beide nicht stabil sind, wird dokumentiert: App-Fehler oder Teststeuerungsrisiko. Danach keine Endlosschleife.

6. Bei Budgetrisiko gilt: Handoff statt Heldentum.
   Wenn Tests/Build gruen sind, aber Browser oder Abschluss wackelt, sofort Report aktualisieren und entweder Kanban abschliessen mit Unsicherheit oder einen konkreten Codex-Handoff schreiben.

7. Keine neuen Qualitaetsziele waehrend der Verifikation.
   Wenn im Browser eine neue Idee entsteht, wird sie notiert, aber nicht direkt umgesetzt. Sonst wird aus einem kleinen Slice wieder ein grosser Auftrag.

8. Maximal ein Worker pro kleiner Slice.
   Kleine LeseWerk-Slices sind am stabilsten mit Neva oder einem Coder. Mehr Rollen erzeugen mehr Abstimmung, mehr Texte, mehr offene Enden.

9. GE- und Datenschutzcheck bleibt Pflicht, aber knapp.
   Immer pruefen: keine echten Namen, keine Diagnosen, keine Punkte/Timer/Ranking/Scham, keine externen Assets, keine Tracking-/Storage-Erweiterung. Dieser Check darf nicht zu einer neuen Konzeptarbeit auswachsen.

10. Abschluss ist ein Arbeitsschritt, kein Nachtrag.
   Kanban ist erst fertig, wenn Report/Handoff geschrieben ist. Wenn die technische Arbeit fertig ist, aber die Dokumentation fehlt, ist der Slice noch nicht fertig.

## 5. Ideales Task-Template fuer kommende LeseWerk-Slices

Kopierbares Template:

```text
Titel:
Alpha XX - [ein konkretes Primaerziel]

Ziel:
[Ein Satz: Was soll am Ende sichtbar oder pruefbar besser sein?]

Nicht-Ziel:
- Keine neuen Inhalte ausser: [falls erlaubt]
- Keine neue Navigation
- Keine externen Assets
- Kein Storage/Tracking
- Kein Push/Commit
- Kein grosses Redesign ausserhalb der genannten Dateien

Betroffene Dateien:
- [exakte App-/Test-/Report-Dateien]

Akzeptanzkriterien:
1. [sichtbares Ergebnis]
2. [didaktische/ge-eignete Bedingung]
3. [technische Bedingung]
4. [Datenschutz-/Sicherheitsbedingung]
5. Report unter `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/[datei].md`

Verifikation:
1. Relevante Tests: `[Befehl]`
2. Build: `npm run build`
3. Browser-Smoke begrenzt:
   - App laedt
   - betroffener Einstieg erreichbar
   - ein repraesentativer Zielpfad vollstaendig
   - sichtbarer Zielzustand passt
4. Wenn Browser-Steuerung instabil ist: maximal zwei Strategien, dann dokumentieren.

Stop-Regel:
- Nach gruenem Test/Build und einem repraesentativen Browserpfad nicht weiter perfektionieren.
- Wenn Browser nicht stabil automatisierbar ist, keine Endlosschleife: Report mit Einschraenkung schreiben.
- Bei Budgetrisiko zuerst Report sichern, dann erst weitere Pruefung.

Handoff:
- Report enthaelt: Ergebnis, geaenderte Dateien, Checks, Browserbefund, GE/Privacy-Check, Risiken, naechster kleinster Schritt.
- Falls Codex gebraucht wird: eigener Handoff mit exaktem Ziel, Dateien, Akzeptanzkriterien und Rueckgabeort.
```

## 6. Rollenlogik fuer LeseWerk-Aufgaben

### Neva allein

Nutzen, wenn:
- es um Analyse, Report, Task-Schnitt, Handoff, Prozessregel oder kleine Text-/Konzeptentscheidung geht;
- keine App-Dateien geaendert werden;
- keine externe Recherche noetig ist;
- die Aufgabe vor allem Orchestrierung und Qualitaetssicherung ist.

Beispiel: Alpha 70C-0, dieser Selbstverbesserungsloop.

### Coder

Nutzen, wenn:
- src-/test-Dateien geaendert werden;
- Build-, Test- oder Browserautomationsprobleme geloest werden muessen;
- eine visuelle UI-Aenderung technisch sauber umgesetzt und verifiziert werden soll.

Wichtig: Coder bekommt eine kleine Slice-Aufgabe, keinen Gesamtauftrag. Rueckgabe: Dateien, Tests, Build, Browserbefund, Risiken.

### Schule / Lernwerkstatt

Nutzen, wenn:
- die Aufgabe didaktisch offen ist;
- neue Inhalte, neue Wortauswahl, neue Foerderlogik oder GE-Angemessenheit bewertet werden muessen;
- Sprache, Hilfen, Fehlerrueckmeldung oder Belastung fuer Kinder unklar sind.

Nicht zwingend fuer reine visuelle Politur vorhandener Inhalte, solange keine neuen Lernanforderungen entstehen.

### Research

Nutzen, wenn:
- aktuelle Quellen, offizielle Standards, Lizenzen, externe Tools oder wissenschaftliche Belege relevant sind.

Nicht nutzen fuer Alpha 70C, weil keine externen Assets und keine neuen Quellen gewuenscht sind.

### Warum maximal 1 Worker pro kleiner Slice oft besser ist

LeseWerk-Slices sind derzeit eng gekoppelt: kleine UI-Aenderung, direkter Test, kurzer Browserpfad, Report. Mehrere Worker erzeugen Uebergabeverluste und oft doppelte Pruefung. Fuer kleine Slices ist ein Worker mit klarer Stop-Regel besser als ein Mini-Swarm. Multi-Agent lohnt erst, wenn ein Slice tatsaechlich verschiedene Wissensarten braucht, z.B. neue Inhalte plus GE-Pruefung plus technische Umsetzung.

## 7. Konkrete Reihenfolge fuer Alpha 70C, 70D, 70E

### Alpha 70C - Visuelle Premium-Symbolkarten

Primaerziel:
- Mama, Sofa, Tasse, Lama in den Mini-Geschichte-Auswahlkarten visuell hochwertiger darstellen.

Grenze:
- Keine neuen Karteninhalte.
- Keine externen Assets.
- Keine Emoji-Platzhalter-Anmutung.
- Keine neue Lernlogik.

Verifikation:
- Test/Build.
- Browser-Smoke fuer mindestens einen repraesentativen Pfad, ideal Tasse oder Lama, weil dort die Kartenwirkung besonders sichtbar ist.
- Sichtpruefung: Karten wirken wie bewusst gestaltete lokale CSS-/SVG-Symbolkarten, nicht wie zufaellige Emoji-Badges.

### Alpha 70D - Lehrkraft-Auswahl verstaendlicher machen

Primaerziel:
- Erwachsene verstehen schneller, warum Mama/Sofa/Tasse/Lama erscheinen und welche Buchstaben/Silben/Entwicklungsstufen sie bedienen.

Grenze:
- Keine neue Kinderaufgabe.
- Keine neue Diagnostikskala.
- Keine personenbezogene Speicherung.

Verifikation:
- Lehrkraftbereich oeffnen.
- Auswahl-/Begruendungstext sichtbar.
- Kindermodus bleibt unveraendert ruhig.

### Alpha 70E - Inhaltsmatrix und naechste Wortfamilien-Entscheidung

Primaerziel:
- Kurze Matrix erstellen: vorhandene Buchstaben, Silben, Woerter, Saetze, Mini-Geschichten, Entwicklungsnutzen, naechster sinnvoller Ausbau.

Grenze:
- Noch keine neuen Woerter implementieren.
- Keine breite Curriculum-Abhandlung.

Verifikation:
- Report/Matrix existiert.
- Naechster Implementierungsslice ist klein und begruendet.

## 8. Direkt kopierbarer Execute-Goal-Prompt fuer Alpha 70C

```text
Work kanban/task or execute directly in `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`.

Titel: Alpha 70C - Visuelle Premium-Symbolkarten fuer Mini-Geschichte-Auswahl

Ziel:
Verbessere nur die visuelle Qualitaet der bestehenden Mini-Geschichte-Auswahlkarten fuer Mama, Sofa, Tasse und Lama. Die Karten sollen weniger nach Emoji-/Platzhalter wirken und mehr wie bewusst gestaltete, lokale Premium-Symbolkarten in einer ruhigen GE-Lese-App. Keine neuen Inhalte, keine neuen Woerter, keine neue Lernlogik.

Kontext:
- Alpha 70A machte Mama/Sofa/Tasse/Lama als Premium-Lesereisen stabil.
- Alpha 70B ersetzte die generische Karte `Da ist Licht` durch bewusste Ziel-/Ablenkerkarten.
- Jetzt ist nur die visuelle Ebene dran.
- Lies zuerst:
  - `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70a-premium-journey-quality-matrix.md`
  - `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70b-story-choice-quality-report.md`
  - `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c0-hermes-self-improvement-loop.md`

Nicht tun:
- Keine neuen Karteninhalte.
- Keine externen Assets, keine Bilddownloads, keine neuen Packages.
- Keine echten Personen-/Schuelerdaten.
- Keine Punkte, Timer, Ranking, Diagnostik- oder Scham-Sprache im Kindermodus.
- Kein grosses Redesign ausserhalb der Auswahlkarten.
- Kein Commit, Push oder Deployment.

Erlaubt:
- Lokale CSS-/SVG-/HTML-Strukturen in vorhandenen App-Dateien verbessern.
- Bestehende Tests anpassen/ergaenzen, wenn sie die neuen Karten stabil absichern.
- Report schreiben.

Akzeptanzkriterien:
1. Mama, Sofa, Tasse und Lama haben in den Mini-Geschichte-Auswahlkarten eine hochwertigere lokale Symbol-/Szenendarstellung.
2. Die bestehenden Texte bleiben inhaltlich gleich:
   - Mama: `Mama ist da.` / `Das Sofa ist da.`
   - Sofa: `Das Sofa ist da.` / `Mama ist da.`
   - Tasse: `Die Tasse ist da.` / `Das Sofa ist da.`
   - Lama: `Das Lama ist da.` / `Mama ist da.`
3. Die Karten bleiben ruhig, gross, touchfreundlich und fuer GE-Kinder nicht ueberladen.
4. Keine externen Assets und keine neuen Abhaengigkeiten.
5. Tests und Build sind gruen oder Abweichungen sind konkret dokumentiert.
6. Browser-Smoke ist begrenzt: App laedt, ein betroffener Einstieg funktioniert, ein repraesentativer Mini-Geschichte-Pfad zeigt die neuen Karten sichtbar. Wenn Browsersteuerung instabil ist: maximal zwei Strategien, dann dokumentieren.
7. Report existiert unter `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c-symbol-card-visual-quality-report.md`.

Verifikationsreihenfolge:
1. Relevante Dateien lesen.
2. Kleinste visuelle Aenderung planen.
3. Code/Test minimal aendern.
4. Reportdatei frueh anlegen.
5. `npm test -- --run`
6. `npm run build`
7. Begrenzter Browser-Smoke.
8. Report finalisieren mit: Ergebnis, Dateien, Checks, Browserbefund, GE/Privacy-Check, Risiken, naechster kleinster Schritt.

Stop-Regel:
Nach gruenem Test/Build und einem repraesentativen sichtbaren Browserpfad nicht weiter perfektionieren. Wenn der Browser-Smoke instabil ist, keine Endlosschleife: Report mit Einschraenkung schreiben und Kanban sauber abschliessen oder gezielten Codex-Handoff erstellen.
```

## 9. Qualitaetscheck dieser Selbstverbesserungsstruktur

Staerken:
- Die Regeln greifen genau das wiederkehrende Fehlerbild aus 70A/70B auf.
- Der naechste Alpha-70C-Prompt ist direkt kopierbar und bewusst klein.
- Handoff und Report trennen Prozesslernen von App-Code.

Schwaechen:
- Diese Struktur verhindert Limits nur, wenn kommende Worker sie wirklich lesen und die Stop-Regel ernst nehmen.
- Browser-Smoke bleibt technisch anfaellig, solange die App keine eigenen stabilen Smoke-Hilfen/Test-IDs fuer alle Pfade hat.

Risiken:
- Visuelle Premium-Verbesserung kann leicht in grosses Redesign kippen.
- Symbolkarten ohne externe Assets brauchen gute CSS-/SVG-Ideen; sonst bleibt der Qualitaetsgewinn klein.
- Wenn Report wieder ans Ende geschoben wird, wiederholt sich das alte Muster.

Fehlende Evidenz:
- Kein Build/Test noetig und nicht ausgefuehrt, weil dieser Auftrag bewusst keine App-Dateien beruehrt.
- Keine Browserpruefung noetig, weil keine UI-Aenderung vorgenommen wurde.

Kleinster sicherer naechster Schritt:
- Alpha 70C mit dem Prompt aus Abschnitt 8 als kleiner Coder-Slice ausfuehren lassen oder direkt bearbeiten, aber mit frueh angelegtem Report und harter Browser-Stop-Regel.
