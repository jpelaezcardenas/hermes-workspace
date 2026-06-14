# GE Spielraum-Qualitaet in Lernwerkstatt und Leseuebungen

Status: active  
Start: 2026-05-20  
Ausloeser: Gartenpost-Prototyp zeigt, dass Hermes-Handoff -> Codex-Slice -> gepruefter GE-Spielraum funktioniert.

## Ziel

Die Qualitaet des Gartenpost-Prototyps soll als wiederverwendbares Muster in die GE-Lernwerkstatt und spaeter in Leseuebungen uebertragen werden, ohne sofort die Haupt-Apps gross umzubauen.

## Warum

Gartenpost wirkt stark, weil er nicht als Formular, Dashboard oder Test erscheint. Der Prototyp verbindet:

- ruhigen eigenen Spielraum;
- eine klare Handlung pro Bildschirm;
- grosses zentrales Lernobjekt;
- grosse Touchziele;
- positive Hilfen;
- wertschatzendes Feedback;
- getrennte Lehrkraft-/Beobachtungslogik;
- keine Punkte, Timer, Rankings oder rote Fehlerdramaturgie.

Diese Qualitaet ist vermutlich der wichtigste wiederverwendbare Baustein fuer die GE-Lernwerkstatt und fuer LeseWerk.

## Scope

In Scope:

- Muster aus Gartenpost als `GE-Spielraum-Pattern` beschreiben;
- einen kleinen wiederverwendbaren UI-/Interaktionsschnitt planen;
- zuerst eine bestehende GE-Lernwerkstatt-Uebung oder einen neuen kleinen Spielraum-Slice umbauen;
- danach eine Leseuebung mit demselben Muster pruefen;
- Ergebnisse mit Screenshots, Checks und Risiken dokumentieren.

Out of Scope:

- keine grosse App-Restrukturierung;
- keine externen Assets oder Symbolbibliotheken;
- keine echten Schuelerdaten;
- kein Deployment, kein Push, kein Commit durch Cronjobs;
- keine automatische Diagnostik;
- kein paralleler Umbau beider Apps ohne ersten validierten Slice.

## Leitentscheidung

Nicht den Gartenpost-Code blind kopieren. Erst das Muster extrahieren:

**Spielraum + Lernobjekt + Ziele + Hilfe + Feedback + Lehrkraftpanel**

Dann dieses Muster in kleinen Slices anwenden.

## Erfolgskriterien

- Es gibt eine kurze Pattern-Spezifikation im Projekt.
- Es gibt mindestens einen integrierten oder app-nahen Spielraum-Slice in der GE-Lernwerkstatt.
- Es gibt danach einen LeseWerk-Slice, der dieselbe Qualitaet auf Silben-/Wort-/Bild-Zuordnung uebertraegt.
- Jede Stufe ist lokal pruefbar, screenshotbar und ohne echte Daten.
- Die Kinderansicht bleibt frei von 1-10-Skala, Diagnosesprache, Punkten, Timer und Ranking.

## Quellen

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/LERNKREISLAUF_MODELL.md`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
