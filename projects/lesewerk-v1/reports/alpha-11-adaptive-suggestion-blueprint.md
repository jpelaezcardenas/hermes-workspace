# Alpha 11 – Adaptive Suggestion Blueprint

Datum: 2026-05-17
Status: Blueprint für Slice B/C

## Ziel
Alpha 11 ergänzt im Lehrkraftbereich eine kleine, lokale und manuell kontrollierte Vorschlagslogik. Die App soll auf Basis bereits vorhandener anonymer Unterrichtssignale einen vorsichtigen nächsten Tagesweg vorschlagen, ohne automatisch etwas zu verändern.

## Nicht-Ziele
Alpha 11 ist kein Dashboard, keine Analyseoberfläche und keine Content-Erweiterung.

Nicht erlaubt sind:
- echte Namen oder andere identifizierbare Schülerdaten
- Cloud, Login, Auth, Backend, Upload, Export
- Scores, Timer, Ranking, Noten, Diagnose, Leistungsurteile
- automatische Auswahlentscheidung ohne Lehrkraft
- neue Inhalte, neue Klassenverwaltung, Verlaufsauswertung über Sitzungen

## Verfügbare lokale Signale
Die Vorschlagslogik darf nur mit bereits vorhandenen, anonymen lokalen Signalen arbeiten:
- anonymes Profil / Farbprofil
- aktive Hilfen aus dem Support-Panel
- bestehende Beobachtungsdaten in `observation`
- letzte Aufgabe / letzte Story / letzte Auswahlhandlung
- vorhandene adaptive Platzierungszusammenfassung
- vorhandene Aufgaben und Stories aus dem lokalen Content

Es werden keine neuen Datenquellen, keine externen APIs und keine gespeicherten personenbezogenen Daten verwendet.

## Exakte Vorschlagslogik
Die Funktion für Slice B soll logisch auf den vorhandenen Signalen aufbauen und maximal einen kleinen, erklärbaren Vorschlag liefern.

Empfohlene Priorität:

1. Wiederholung mit reduzierter Auswahl
   Wenn beides sichtbar ist:
   - Wiederholungswunsch oder Wiederholungszeichen vorhanden, zum Beispiel `Nochmal` in den Choices oder als aktive Unterstützung
   - reduzierte Auswahl ist aktiv, zum Beispiel `Weniger Auswahl`

   Dann ist der Pfad:
   - Vorschlag: `Reduzierte Auswahl und Wiederholung`
   - Begründung: Das Kind/der Lernende arbeitet sichtbar mit Wiederholung und kleiner Auswahl; ein ruhiger, stabiler Schritt passt.
   - Nächster kleiner Schritt: dieselbe Struktur mit zwei Karten und minimaler Variation wiederholen.

2. Story-Verstehen
   Wenn Story-Beobachtung vorhanden ist, also mindestens eine Story in `storyEvidence` liegt:
   - Vorschlag: `Story verstehen`
   - Begründung: Die vorhandene Beobachtung bezieht sich auf eine gelesene Geschichte; eine kurze Rückfrage oder kleine Story-Vertiefung passt.
   - Nächster kleiner Schritt: eine ähnliche Story mit nur einer neuen Schwierigkeit lesen.

3. Silben lesen
   Wenn keine Story-Evidence vorliegt, aber die letzte Aufgabe aus dem Silbenbereich kommt oder Silbenhilfe ohne Bildhilfe sichtbar ist:
   - Vorschlag: `Silben lesen`
   - Begründung: Die vorhandenen Signale zeigen Silbenarbeit oder eine Phase mit starker Silbenstütze.
   - Nächster kleiner Schritt: eine ähnliche Silbenfolge in Ruhe wiederholen.

4. Standardfall
   Wenn keiner der obigen Fälle greift:
   - Vorschlag: `Bild und Wort`
   - Begründung: Das ist der sichere Basispfad für einen kleinen, klaren Einstieg mit visueller Stütze.
   - Nächster kleiner Schritt: noch einmal mit anderem Bild und sehr wenigen Alternativen lesen.

## Thin-Data-Fallback
Wenn die Beobachtungsdaten dünn sind, soll die App bewusst vorsichtig bleiben.

Als dünn gelten zum Beispiel:
- keine oder nur eine Beobachtung
- kein Story-Eintrag
- keine klar erkennbare Wiederholungs- oder Reduktionshandlung
- keine ausreichende Kombination aus Aufgabe und Support-Signal

Dann gilt:
- der sichere Standardvorschlag bleibt aktiv
- die Formulierung bleibt offen und nicht endgültig
- die Begründung macht sichtbar, dass die Einordnung vorsichtig ist
- es wird kein stärkerer Pfad behauptet, als die Daten hergeben

Empfohlene Fallback-Sprache:
- `Heute passt vermutlich Bild und Wort mit klarer visueller Stütze.`
- `noch nicht endgültig`
- `vorsichtig`
- `nur auf sichtbaren Signalen`

## Teacher-facing wording
Die Lehrkraft soll die Vorschlagslogik in ruhiger, kurzer Sprache sehen.

Verbindliche Begriffe:
- Vorschlag / Vorsichtiger Vorschlag
- Warum dieser Vorschlag?
- Alternative
- In Tagesweg übernehmen
- Ignorieren

Sprachregeln:
- immer als Vorschlag formulieren, nie als Wahrheit
- nie diagnostisch, nie bewertend
- maximal 1–2 kurze Sätze pro Erklärung
- die Begründung nennt sichtbare Signale, keine Deutung als Fähigkeit

Beispielstruktur:
- Vorschlag: `Heute passt vermutlich Story verstehen.`
- Warum dieser Vorschlag?: `Es gibt bereits eine Story-Beobachtung; ein kurzer nächster Schritt passt dazu.`
- Alternative: `Bild und Wort` oder ein anderer ruhiger Basispfad

## Alternative-Logik
Zu jedem Vorschlag muss eine kleine Alternative sichtbar sein.

Regel:
- Die Alternative ist der nächste nahe sichere Pfad, nicht ein weites Ausweichen.
- Sie bleibt klein, ruhig und lokal.
- Sie darf den aktuellen Vorschlag nicht abwerten.

Beispiele:
- bei `Bild und Wort` als Alternative: `Silben lesen`
- bei `Silben lesen` als Alternative: `Bild und Wort`
- bei `Story verstehen` als Alternative: `Bild und Wort`
- bei `Reduzierte Auswahl und Wiederholung` als Alternative: `Bild und Wort`

## Manual Apply Behavior
`In Tagesweg übernehmen` darf nur durch die Lehrkraft ausgelöst werden.

Verbindliches Verhalten:
- ein Klick/Tippen auf Übernehmen schreibt den vorgeschlagenen Pfad in die lokale Tagesweg-Auswahl
- der Kinderpfad ändert sich erst nach dieser manuellen Übernahme
- die maximale Auswahlgrenze von vier Karten bleibt bestehen
- wenn der vorgeschlagene Pfad mehr als vier Elemente hätte, wird er auf vier begrenzt
- die Auswahl bleibt lokal im aktuellen Demo-Stand

Wichtig:
- kein automatisches Übernehmen beim Laden
- kein Auto-Apply nach einer Beobachtung
- keine Übernahme ohne sichtbaren Vorschlag

## Ignore Behavior
`Ignorieren` ist ein reiner Verwerfungsweg.

Verbindliches Verhalten:
- der aktuelle Kinderpfad bleibt unverändert
- die bisherige Tagesweg-Auswahl bleibt unverändert
- der Vorschlag verschwindet oder wird als ignoriert markiert
- kein stiller Wechsel auf einen anderen Pfad
- keine Daten werden gelöscht, außer wenn der Lehrkraft-Reset das ausdrücklich tut

## Reset-Verhalten
Ein lokaler Reset soll den Zustand wieder auf den sicheren Ausgangspunkt setzen.

Verbindliches Verhalten:
- vorgeschlagene, angewählte oder übernommene Tagesweg-Entscheidungen werden zurückgesetzt
- die sichere Fallback-Auswahl ist wieder aktiv
- der Vorschlagsblock kann danach erneut aus den bestehenden Signalen berechnet werden

## Privacy Boundary
Die Vorschlagslogik muss strikt innerhalb dieser Grenzen bleiben:

Erlaubt:
- anonyme Farbprofile
- sichtbare Unterrichtssignale
- lokale Berechnung
- lokal verständliche Vorschläge

Nicht erlaubt:
- reale Namen
- Diagnosen oder Diagnoseersatz
- Scores, Rankings, Zeitwerte oder Leistungsurteile
- Cloud, Upload, Backend, Auth, Export
- automatische Speicherung personenbezogener Daten
- Rückschlüsse auf Identität oder familiären Kontext

Die Lehrkraftsprache soll immer klar machen:
- lokal
- anonym
- vorsichtig
- nicht endgültig
- manuell steuerbar

## Implementierbare Helfer-Schnittstelle
Slice B sollte eine kleine Helper-Funktion liefern, die ein einheitliches Ergebnisobjekt zurückgibt.

Empfohlene Form:
- `pathLabel`
- `suggestion`
- `reason`
- `alternative`
- `nextSmallStep`
- `observedSignals`
- `dataQuality` oder `uncertainty`
- `teacherExplanation`

`teacherExplanation` sollte mindestens enthalten:
- `observedSignals`
- `suggestedPath`
- `uncertainty`
- `nextSmallStep`

Die Werte müssen direkt für UI-Text und Tests nutzbar sein.

## UI-Contract für Slice C
Im Lehrkraftbereich braucht es genau einen kompakten Vorschlagsblock.

Pflichtinhalte:
- Überschrift mit einem ruhigen Vorschlagswort
- kurze Begründung
- kleine Alternative
- Button `In Tagesweg übernehmen`
- Button `Ignorieren`

Verhalten:
- Vorschlag sichtbar nur im Lehrkraftmodus
- Kinderbereich bleibt ruhig und frei von der Vorschlagslogik
- kein Dashboard-Feeling
- kein zusätzlicher Analysebereich notwendig

## Test-Contract
### Helper-Tests
Die Tests müssen belegen, dass:
- die Vorschlagslogik nur vorhandene lokale Signale nutzt
- der Standardfall sicher und vorsichtig bleibt
- Story-/Silben-/Wiederholungsfälle korrekt erkannt werden
- Thin-Data zum sicheren Fallback führt
- die Formulierungen nicht diagnostisch werden

### UI-Tests
Die Tests müssen belegen, dass:
- der Vorschlagsblock sichtbar ist
- `In Tagesweg übernehmen` existiert
- `Ignorieren` existiert
- die manuelle Übernahme den lokalen Tagesweg verändert
- Ignorieren den Kinderpfad nicht verändert
- Reset den Ausgangszustand wiederherstellt
- max. vier Karten bleiben geschützt

### Browser-Checks
Die Browser-Prüfung muss zeigen:
- Lehrkraft sieht den kompakten Vorschlagsblock
- Kind sieht keinen erklärenden Diagnose-/Analyseblock
- Übernehmen ändert sichtbar den Tagesweg
- Ignorieren lässt den Tagesweg unverändert
- Reset kehrt zum sicheren Fallback zurück

### Finaler Watchdog
Der finale Bericht muss nur dann akzeptieren, wenn:
- `npm test` grün ist
- `npm run build` grün ist
- der Browsercheck den manuellen Flow bestätigt
- ein Forbidden-Pattern-Scan keine riskanten Begriffe in aktiven Produktdateien findet

Zu scannen sind insbesondere:
- echte Namen
- Diagnosebegriffe
- Score/Ranking/Timer
- Cloud/Login/Backend/Upload/Auth/Export
- Scham- oder Drucksprache

## Acceptance Criteria für Alpha 11
Alpha 11 ist implementierbar, wenn alle folgenden Punkte klar erfüllt werden:

1. Die Vorschlagslogik ist vollständig aus lokalen anonymen Signalen ableitbar.
2. Bei dünnen Daten fällt die App sicher auf einen vorsichtigen Standardvorschlag zurück.
3. Die Lehrkraft sieht Vorschlag, Grund, Alternative, Übernehmen und Ignorieren.
4. Die Übernahme ist rein manuell.
5. Ignorieren verändert den Kinderpfad nicht.
6. Der Kinderpfad bleibt ruhig, klein und ohne Analyse- oder Diagnosewirkung.
7. Es gibt keine neue Inhaltsausweitung.
8. Datenschutzgrenze und GE-gerechte Sprache bleiben eingehalten.
9. Tests, Build und Browsercheck können den Flow eindeutig absichern.

## Kurzfassung für die nächsten Slices
- Slice B: Helper-Funktion und Tests für adaptive Vorschläge
- Slice C: UI-Block mit manuellem Übernehmen / Ignorieren
- Slice D: GE-Usability-Review
- Slice E: Finaler Watchdog
