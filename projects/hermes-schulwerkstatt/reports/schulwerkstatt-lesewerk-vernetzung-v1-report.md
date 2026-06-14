# Schulwerkstatt v8 · LeseWerk Vernetzungsplan v1

Datum: 2026-05-26

## Kurzfazit

Die beiden Systeme passen fachlich gut zusammen, aber nur mit klarer Trennung: Schulwerkstatt bleibt die ruhige Lehrer-Entscheidungs- und Wochenplanoberfläche, LeseWerk bleibt die kindzentrierte Lese-/Diagnostik- und Mini-Reise-Welt. Die beste Verbindung ist deshalb kein „großer Merge“, sondern eine kleine Datenbrücke mit expliziter Freigabe pro Lesestufe und ein einziger Übergabepunkt für passende Aufgaben.

## Reale gefundene Dateien und Pfade

LeseWerk / Lese-App:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/index.html`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/lesewerk-content.mjs`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-21-leseprofil-curriculum-model.md`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-67-lesereisen-roadmap.md`

Schulwerkstatt:

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/README.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-v2-report.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-aufgabenbank-v2-integration-report.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-v8-qualitaetsrunde-report.md`

## Was in LeseWerk schon existiert

Aus `lesewerk-content.mjs` und den Reports ist klar sichtbar:

- anonyme Profile mit Farben/Symbolen statt Namen
- profilnahe Einstiegssprache: „ruhig starten“, „mit Hilfe lesen“, „nochmal versuchen"
- lokale Symbolhilfen statt externer Bilder
- Gebärden-/Handzeichen-Hinweise als begleitende Stütze
- Aufgabenobjekte mit `level`, `type`, `word`, `pictureHint`, `syllables`, `prompt`, `options`
- Story-Schicht mit `storyBridge`, `comprehensionPrompt`, `reducedChoice`, `nextStep`
- klare Entwicklungslogik: von Prä-Lesen über Buchstaben, Laut, Silbe, Wort, Satz bis Mini-Geschichte
- Lehrkraftperspektive mit freigebbaren Zeichen/Mustern statt Diagnosewortschatz
- bewusste Trennung von Kindmodus und Lehrkraftentscheidung

Besonders wichtig für die Vernetzung:

- `alpha-21-leseprofil-curriculum-model.md` definiert eine Filterlogik „heute sicher nutzbar / mit Hilfe / noch nicht“.
- `alpha-67-lesereisen-roadmap.md` betont: keine Aufblähung des Kindmodus, keine Speicherung, keine automatische Diagnose.

## Was in der Schulwerkstatt schon existiert

Aus den Reports zur Schulwerkstatt ergibt sich:

- teacher-facing Dashboard mit Profil, Wochenplan, Aufgabenbank, Connectoren, Beobachtung, Quality Panel
- 48 Aufgaben in vier Bereichen: Lesen, Mengen, Kommunikation/UK, Wahrnehmung/Alltag
- lokale Verweise auf LeseWerk und weitere Lernsysteme, ohne die anderen Apps zu verändern
- strukturierte, ruhige Wochenplanung mit Beobachtungsfragen und nächstem Schritt
- klare Datenschutzlinie: anonymisiert, ohne echte Namen oder Diagnosen

## P0 / P1 / P2-Verknüpfungslogik

| Priorität | Anschlussidee | Warum wichtig | Risiko | Empfehlung |
|---|---|---|---|---|
| P0 | Gemeinsames Profil-Objekt für LeseWerk und Schulwerkstatt | Ohne gemeinsame Logik bleiben beide Systeme Insellösungen. | Zu viel Datenmodell auf einmal. | Erst als lesbare JSON-Struktur, nicht als persistente Datenbank. |
| P0 | Freigabe-Matrix Lesestufe ↔ Aufgabenfilter | Verhindert Überforderung und unpassende Aufgaben. | Wird schnell zu komplex, wenn zu fein. | Nur 3 Lehrkraft-Zonen: noch nicht / mit Hilfe / sicher nutzbar. |
| P0 | Ein Übergabepunkt „Passende LeseWerk-Aufgabe öffnen“ aus der Schulwerkstatt | Das ist der kleinste sichere Nutzen im Alltag. | Link-/Routing-Bruch. | Ein einzelner Start-Button pro empfohlenem Lese-Anker. |
| P1 | Beobachtung zurück in die Schulwerkstatt: „gesehen / mit Hilfe / nächster Schritt“ | Verbindet Lesen mit Förderplanung. | Kann wie Bewertung wirken. | Nur als kurze Lehrkraftnotiz, nicht als Score. |
| P1 | Story-Brücken von Schulwerkstatt-Aufgaben zu LeseWerk-Mini-Reisen | Verknüpft Wochenziel und Leseanlass. | Zu viele Geschichten, zu wenig Fokus. | Erst 3 Ankerwörter, später erweitern. |
| P1 | Symbol-/Metacom-nahe lokale Wortanker ohne externe Assets | Unterstützt GE-taugliche Orientierung. | Lizenz-/Asset-Risiko bei falscher Quelle. | Nur lokale Typo-/Form-Anker oder eigene Platzhalter. |
| P2 | Gemeinsamer Druck-/Exporttext für Teamgespräch | Praktisch für Besprechungen und Elternarbeit. | Datenschutz bei zu viel Freitext. | Nur anonymisierte Kurzfassung, kein Auto-Speichern. |
| P2 | Lehrkraftmodus mit Vorprüfung: „passt heute, weil…“ | Hilft bei Unterrichtsvorbereitung. | Kann zu Verwaltung werden. | Später, nicht vor der Kernverknüpfung. |

## 48 Aufgabenbank-v2: mögliche LeseWerk-Anschlüsse

Die 48 Aufgaben lassen sich nicht 1:1 in LeseWerk „importieren“. Sinnvoll ist eine Zuordnung in Anschlusslogik.

### 1) Lesen-Aufgaben (12)

Passender LeseWerk-Anschluss:

- Buchstaben erkennen
- Laut zuordnen
- Silben lesen
- Wort-Bild-Zuordnung
- kurze Satzrahmen
- Mini-Geschichte mit Auswahlfrage

Typische Brücke:

- Aufgabe aus Schulwerkstatt benennt Zielwort oder Satztyp.
- LeseWerk liefert das passende Lesemuster als Mini-Reise.
- Beobachtung wandert zurück: „mit Bild, mit Silbenfarben, mit Vorlesen, mit zwei Optionen“.

### 2) Kommunikation/UK-Aufgaben (12)

Passender LeseWerk-Anschluss:

- Bild-/Symbol-Wort-Zuordnung
- Ja/Nein- oder 2er-Auswahl
- Satzbausteine mit festen Mustern
- handlungsbegleitende Satzmuster
- Wortkarten für Unterstützte Kommunikation

Hier ist der Nutzen besonders hoch, weil Lesen und UK in GE oft zusammenlaufen: ein Wort wird nicht nur gelesen, sondern als Kommunikationsstütze genutzt.

### 3) Wahrnehmung/Alltag (12)

Passender LeseWerk-Anschluss:

- alltagsnahe Bild-Wort-Kopplung
- Gegenstand → Bild → Wort
- Raum-/Ortswörter
- Routinen in Mini-Sätzen
- Orientierungssprache mit festen Ankern

Hier sollte LeseWerk nicht textlastig werden. Ein Wort oder ein kurzer Satz reicht oft.

### 4) Mengen (12)

Nur angrenzende Förderlogik, kein Kernanschluss.

Mögliche Verknüpfungen:

- Zählwörter als Lesewortanker
- Mengenbegriffe in Satzmustern („ein Ball“, „zwei Becher“)
- Zahl-/Wort-Zuordnung nur bei stabiler Lesebasis
- keine künstliche Leseförderung über Mengen, wenn das eigentliche Ziel Wahrnehmung oder Mathematik ist

## Datenbrücke: Schülerprofil → Entwicklungsstufe → bekannte Muster → Aufgabe → Beobachtung → nächster Vorschlag

Empfohlene Brückenstruktur:

| Schritt | Inhalt | Beispiel |
|---|---|---|
| 1 | Schülerprofil | anonymes Farbprofil, kein Name |
| 2 | Entwicklungsstufe | Prä-Lesen / Buchstabe / Silbe / Wort / Satz / Mini-Geschichte |
| 3 | Bekannte Muster | z. B. M, A, Ma, Mama, ist, da |
| 4 | Passende Aufgaben | 2–5 Aufgaben aus Schulwerkstatt + 1 LeseWerk-Startpunkt |
| 5 | Beobachtung | „mit Bild“, „mit Vorlesen“, „2 Optionen“, „braucht Rückkehr zur Silbe“ |
| 6 | Nächster Vorschlag | genau ein kleiner Schritt, nicht drei |

Wichtige Regel:

- Das System soll Vorschläge machen, aber keine automatische Förderentscheidung behaupten.
- Ein Vorschlag bleibt immer eine Lehrkraft-Vermutung.
- Wenn Lesemuster unsicher sind, wird die Aufgabe abgesenkt statt „hart“ angeboten.

## UI-Konzept

### Schulwerkstatt

Ziel: ruhige Lehreroberfläche.

- obere Ebene: Gruppe, Ziel, Wochenplan, Aufgabenbank
- untere Ebene: Beobachtung, Druck, Connectoren
- klare Buttons statt tiefer Verschachtelung
- LeseWerk nur als eindeutiger Übergang, nicht als eingebettete zweite Welt

### LeseWerk

Ziel: kindzentrierte Leseoberfläche.

- große Karten
- wenig Text auf einmal
- klare Bild-/Symbolhilfe
- ein Satz oder ein Wort pro Schritt
- Kindmodus bleibt spielerisch und ruhig

### Lehrkraftmodus

Ziel: Diagnostik und Planung getrennt vom Kindmodus.

- Freigabe von Graphemen, Silben, Wörtern, Satzrahmen
- Beobachtungsnotiz: beobachtbar und datensparsam
- kein Score, kein Ranking, keine Notenlogik
- Vorschläge nur als Unterrichtsoptionen

## Mindestens 5 konkrete Anschlussideen

1. LeseWerk-Startkarte aus der Schulwerkstatt
   - Eine Schulwerkstatt-Aufgabe mit Lesefokus kann direkt eine passende Mini-Reise in LeseWerk öffnen.

2. Gemeinsames Stufenfilter-Modell
   - Schulwerkstatt fragt nur: Prä-Lesen, Buchstabe, Silbe, Wort, Satz, Mini-Geschichte.
   - LeseWerk zeigt nur passende Inhalte.

3. Rückmeldeschleife nach der Durchführung
   - Nach einer LeseWerk-Runde wählt die Lehrkraft: „gelingt mit Bild“, „gelingt mit Hilfe“, „noch kürzer / noch wiederholen“.

4. Wortanker aus Schulwerkstatt-Aufgaben
   - Lesen- und UK-Aufgaben teilen ein kleines Set an Alltagswörtern als Brücke.

5. Anonyme Fördernotiz statt Voll-Diagnostik
   - Schulwerkstatt übernimmt nur den nächsten kleinen Schritt, keine personenbezogene Begründung.

6. Mini-Geschichten als Wochenziel-Baustein
   - Schulwerkstatt kann aus einem Wochenziel einen LeseWerk-Geschichtenanker ableiten.

7. Lokaler Materialpfad ohne externe Assets
   - Bilder/Symbole bleiben lokal oder typografisch; keine neue Asset-Pipeline nötig.

## Sicherer Mini-Slice für den nächsten Bau-Schritt

Empfohlener kleinster Implementierungsslice:

- In der Schulwerkstatt genau einen neuen LeseWerk-Übergabe-Button pro empfohlenem Leseartefakt ergänzen.
- Dieser Button öffnet nur einen lokalen LeseWerk-Einstieg oder zeigt den sicheren Pfad an.
- Keine Speicherung.
- Keine neue Diagnostiklogik.
- Keine App-Überarbeitung.
- Kein externes Asset.

Warum genau dieser Slice?

- sehr kleines Risiko
- sofort testbar
- fachlich sinnvoll
- schafft echte Vernetzung ohne Build-Gefahr

## Was ausdrücklich nicht gebaut werden sollte

- kein großer gemeinsamer Datenbank-Merge
- keine automatische Diagnostik
- keine personenbezogene Speicherung
- keine externen Bilder/Metacom-Assets ohne Freigabe
- keine vollständige Neustrukturierung beider Apps
- kein „alles in einem Dashboard“
- keine Score-/Ranking- oder Notenlogik

## Empfehlung

Als Nächstes bauen: eine sehr kleine, sichere Übergabe von der Schulwerkstatt zu genau einem passenden LeseWerk-Einstieg pro Lesefokus.

Nicht als Nächstes bauen: eine tiefe Integrationsarchitektur, ein gemeinsames Diagnosemodell oder eine neue medienreiche Kindoberfläche.

## Prüfnotiz

Dieser Plan basiert auf den vorhandenen lokalen Reports und Quelltexten. Es wurden keine externen Assets geladen und keine der Apps überschrieben.
