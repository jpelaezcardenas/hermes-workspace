# Hermes Creative Next Slices - 2026-05-27

## Prinzip

Hermes soll kreative Ideen nicht als neue Dauerbaustellen starten, sondern als kleine, pruefbare Slices. Jeder Slice braucht:

- ein Ziel;
- einen engen Scope;
- klare Nicht-Tun-Regeln;
- Test-/Review-Nachweis;
- Outbox-Rueckgabe oder Report.

## P1 - LeseWerk Startklarheit 2

Idee: Profilwahl im Kinderblick noch ruhiger staffeln.

Warum:

- Startklarheit 1 hat die Hauptaktion vor die lange Orientierung gezogen.
- Profilwahl steht aber weiterhin vor dem Kinderpfad.

Moeglicher Slice:

- Profilwahl kompakter machen oder als ruhige kleine Auswahl unter den Startimpuls setzen.
- Keine neue Wortfamilie.
- 390px-Smoke mit Tagespfad und Wortpost.

## P2 - GE-Spielraum naechster Slice

Idee: Gartenpost-Pattern auf eine echte GE-Lernwerkstatt-Uebung anwenden.

Warum:

- Gartenpost und LeseWerk-Wortpost zeigen: grosse Karte + klare Handlung + Hilfe + Lehrkrafttrennung funktioniert.

Moeglicher Slice:

- Eine bestehende Mengen-/Symbol-Uebung in einen Spielraum heben.
- Keine neue Bibliothek, keine echten Daten.

## P3 - Hermes Abschlusslogik

Idee: Handoff-Paare nach Outbox-Rueckgabe automatisch als `completed-known` markieren, ohne Outbox-Belege zu loeschen.

Warum:

- Hermes meldet alte abgeschlossene Paare wiederholt.

Moeglicher Slice:

- `HANDOFF_OVERVIEW.md` und Janitor-Report sauberer formulieren:
  - offen
  - in Arbeit
  - abgeschlossen mit Beleg
  - archiviert

## P4 - Kreativradar fuer Unterrichtsslices

Idee: Taeglicher oder woechentlicher Hermes-Scout, der aus vorhandenen Reports genau drei neue Unterrichtsslice-Ideen vorschlaegt:

1. ein UI-Klarheits-Slice;
2. ein didaktischer Mini-Slice;
3. ein Qualitaets-/Review-Slice.

Guardrail:

- Der Scout darf nur vorschlagen, nicht automatisch Handoffs erzeugen, solange aktive Handoffs offen sind.

## P5 - Unterrichts-Asset-Plan

Idee: Lokale, lizenzsichere Symbol-/Bildasset-Roadmap fuer Gartenpost, LeseWerk und GE-Spielraeume.

Warum:

- Emoji-/CSS-Platzhalter reichen fuer Prototypen, aber nicht dauerhaft fuer Unterrichtsmaterial.

Moeglicher Slice:

- Asset-Kategorien definieren;
- keine externen Downloads;
- keine echten Schuelerbilder;
- Prioritaet auf 10 Basis-Symbole.

## CEO-Empfehlung

Naechste Reihenfolge:

1. LeseWerk Startklarheit 2 nur nach kurzer Sichtung des neuen Screenshots.
2. GE-Spielraum naechster Slice.
3. Hermes Abschlusslogik, damit alte Paare nicht wieder taeglich gemeldet werden.
4. Erst danach neue Wort-/Inhaltsslices.
