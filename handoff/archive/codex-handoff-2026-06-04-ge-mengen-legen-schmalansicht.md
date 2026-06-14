# Archiviert: Codex Handoff

Status: automatisch abgeschlossen und archiviert am 2026-06-06
Ergebnis: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-06-05-ge-mengen-legen-schmalansicht.md`

# Codex Handoff

## Ziel
Pruefe fuer den GE-Spielraum-Slice `Mengen legen`, ob der schmale Viewport die Kindaktion und die Hilfebereiche sauber traegt.

## Kontext
Der neueste Testpilot nennt `Schmalansicht-Test fuer Mengen legen gezielt nachholen` als naechste kleinste Aktion. Der reguläre Build war im letzten Lauf nur per Fallback verlaesslich, deshalb soll Codex ausschliesslich die schmale Ansicht und den Flow verifizieren, nicht den Build reparieren.

## Dateien
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-06-04.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/`
- gegebenenfalls relevante lokale Build-/UI-Dateien im GE-Lernwerkstatt-Projekt

## Was Hermes schon gemacht hat
- Den Testpilotbericht gelesen und den naechsten kleinen Schritt identifiziert.
- Geprueft, dass aktuell kein offener Codex-Inbox-Handoff vorhanden ist.
- Geprueft, dass die Aufgabe lokal testbar und ohne externe Aktion ist.

## Was Codex tun soll
- Im GE-Lernwerkstatt-Game-Lab `Mengen legen` auf schmalem Viewport pruefen.
- Nur beurteilen, ob Touchziele, Mattenflaeche, Zahlwahl und offene Lehrkraftbereiche sich gegenseitig stoeren.
- Falls noetig, den Befund knapp in einem Ergebnisdokument festhalten; keine breite Umbauarbeit.

## Akzeptanzkriterien
- Der schmale Viewport-Test ist nachvollziehbar dokumentiert.
- Es ist klar beschrieben, ob die Kinderaktion ohne Ueberlappung sichtbar bleibt.
- Es ist klar beschrieben, ob der offene Lehrkraftbereich Kindaktionen verdeckt oder nicht.
- Keine neuen Features, keine inhaltliche Erweiterung, keine Build-Reparatur ausser wenn sie zwingend fuer die Sichtpruefung noetig ist.

## Risiken
- Der lokale Build kann weiterhin nur mit Fallback lauffaehig sein.
- Die Beurteilung bleibt ein einzelner Sicht-/Flow-Test und ersetzt keinen vollstaendigen Tablet-Feldtest.

## Nicht tun
- Keine neuen Inhalte bauen.
- Keine grossen Navigationsaenderungen.
- Keine Installationen, Commits, Pushes, Deployments oder externen Aktionen.
- Keine personenbezogenen Daten verwenden.

## Rueckgabe erwartet
Eine kurze Ergebnisdatei mit Befund, genutztem Pruefweg, eventuellen Sichtproblemen und dem naechsten kleinen Schritt.
