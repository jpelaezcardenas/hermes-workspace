# Schulwerkstatt Quality Pattern

Trigger: Verwenden, wenn Hermes aus Wochenzielen, Beobachtungen oder bestehenden GE-Systemen konkrete Planungsvorschläge für Chris' Schulwerkstatt erzeugt.

## Datenschutz

- Nur anonymisierte Gruppen- oder Farbcodes verwenden.
- Keine echten Namen, Diagnosen, Geburtsdaten, Familieninformationen oder seltenen Merkmalskombinationen speichern.
- Beobachtungen als pädagogische Arbeitshypothesen formulieren, nicht als feste Zuschreibung.
- Memory speichert nur stabile, nicht-personenbezogene Muster: Unterstützungsform, Materialtyp, Qualitätsregel, Prozessschritt.

## GE-Qualitätsgate

Eine Aufgabe darf in den Wochenplan, wenn sie:

1. eine klare Handlung hat,
2. visuell ruhig bleibt,
3. basal, unterstützt oder erweitert zugänglich ist,
4. konkrete Materialien oder vertraute Wörter nutzt,
5. Wiederholung ohne Druck ermöglicht,
6. keine Ranking-, Bewertungs- oder Beschämungslogik enthält,
7. eine Beobachtungsfrage für die Lehrkraft enthält,
8. einen kleinen nächsten Schritt vorschlägt,
9. die Lehrerentscheidung ausdrücklich zentral lässt.

## Standardstruktur für Hermes-Ausgaben

- Ziel der Woche
- Gruppenannahme anonymisiert
- 5 Stationen mit Ziel, Material, Unterstützung, Beobachtung, nächstem Schritt
- Connector-Hinweise zu LeseWerk, GE-Lernwerkstatt oder Spielraum Generator
- RiskGate: Datenschutz, Überladung, Drucksprache, Umsetzbarkeit
- Nächste kleinste Aktion

## Subagenten-Muster

Maximal drei Rollen:

- Didaktik: GE-Passung und Lernschritt
- Material: konkrete Aufgabe, Karte, Station, Spielidee
- Review: Datenschutz, Überladung, Tonalität, Lehrerentscheidung

Neva integriert und entscheidet. Keine automatische Veröffentlichung oder echte Dokumentation ohne Chris' Freigabe.

## CEO Execute Loop fuer Schulwerkstatt

Wenn Chris grosse Schulwerkstatt-, LeseWerk-, Lernwerkstatt- oder Nayyal-Connector-Ziele startet:

1. Nicht als Monsterprompt ausfuehren. Erst einen engen sichtbaren Slice bauen.
2. Maximal 1-3 Rollen nutzen:
   - `coder` fuer Code/UI/HTML/CSS,
   - `schule` fuer GE-/Unterrichtsqualitaet,
   - `neva` oder `memory` fuer Integration, Datenschutz und dauerhafte Regeln.
3. Jeder Slice braucht ein Artefakt:
   - Datei- oder UI-Aenderung,
   - Report unter `reports/`,
   - bei UI: Browser-Smoke und Screenshot,
   - bei Links: lokaler Statuscheck.
4. Idle-Regel: Wenn ein Agent nach 3-5 Minuten nur initialisiert, kaum CPU nutzt und keine Dateien/Logs veraendert, reclaimen, kommentieren und enger neu starten.
5. Abschluss immer mit Boardcheck:
   - `0 running`,
   - `0 blocked`,
   - offene Risiken benennen,
   - naechsten kleinsten Slice vorschlagen.

Diese Regel ist fuer die Schulwerkstatt wichtiger als maximale Agentenzahl: Qualitaet entsteht durch kleine pruefbare Schritte, nicht durch parallelen Aktionismus.
