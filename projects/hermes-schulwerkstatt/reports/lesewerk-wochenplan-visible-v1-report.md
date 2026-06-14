# Report: LeseWerk-Wochenplan sichtbar in der Schulwerkstatt-App

Die Schulwerkstatt-App zeigt den LeseWerk-Wochenplan jetzt sichtbar im Bereich `#wochenplan`. Die Wochenstruktur ist als 5-Tage-Plan mit Montag bis Freitag dargestellt und enthält pro Tag Karte, Aufgabe, Beobachtungsfrage, Materialbezug und Support-Hinweis.

## Was umgesetzt wurde

- Der Wochenplan-Bereich wurde um eine kurze erklärende Einordnung ergänzt.
- Eine Guardrail-Anzeige wurde eingebaut: keine Etiketten, alles anonym, vor Einsatz menschlich prüfen.
- Die 5-Tage-Darstellung ist sichtbar und an die vorhandene LeseWerk-Logik gekoppelt.
- Die Darstellung nutzt die bereits vorhandenen Datenquellen aus der App:
  - `readingLibrary`
  - `readingProfiles`
  - `readingStages`
  - `supportText(...)`
- Mobile Layout-Risiken wurden reduziert, indem die Wochenkarten auf schmalen Bildschirmen nicht mehr unnötig breiten Mindestbreiten folgen.

## Sichtbarer Aufbau im Wochenplan

- Montag: Wiederholung / sicherer Einstieg
- Dienstag: Materialanker
- Mittwoch: Kindermodus / kurze Übung
- Donnerstag: Transfer
- Freitag: Mini-Check / Rückblick

Jeder Tag zeigt zusätzlich eine Karte aus der Bibliothek, eine Aufgabe, eine Beobachtungsfrage, den Materialbezug und einen Support-Hinweis.

## Verifikation

- `index.html` lädt erfolgreich über lokalen HTTP-Server.
- `#wochenplan` enthält den sichtbaren LeseWerk-5-Tage-Plan.
- Die neue Guardrail-Zeile ist im HTML vorhanden.
- Lokaler HTTP-Check für `index.html`: `200 OK`.

## Hinweise

- Es wurden keine echten Schülerdaten verwendet.
- Es wurden keine Diagnose- oder Medizinbegriffe in den neuen Wochenplantext aufgenommen.
- Die App bleibt als Einzel-HTML-Slice funktionsfähig; es wurden keine externen Abhängigkeiten ergänzt.
