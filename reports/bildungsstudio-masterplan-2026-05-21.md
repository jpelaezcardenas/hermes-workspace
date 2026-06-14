# Bildungsstudio-Masterplan 2026-05-21

Titel: Lernwerkstatt und LeseWerk auf neues Level heben

Status: Masterplan, keine Codeaenderung
Arbeitsweise: lokale Projektdateien und Reports gelesen, keine Webrecherche, kein Build, keine App-Dateien geaendert.

Gelesene Grundlagen:
- /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70a-premium-journey-quality-matrix.md
- /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70b-story-choice-quality-report.md
- /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c0-hermes-self-improvement-loop.md
- /Users/zondrius/hermes-workspace/handoff/codex-handoff-2026-05-21-lesewerk-hermes-workflow.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/APP_KONZEPT.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/LERNKREISLAUF_MODELL.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/tablet-mobile-symbol-mengen-review-2026-05-21.md

## 1. Produktvision in 10 konkreten Saetzen

1. Lernwerkstatt und LeseWerk werden zu einem gemeinsamen lokalen Bildungsstudio fuer den Foerderschwerpunkt Geistige Entwicklung, nicht zu einer Sammlung einzelner Arbeitsblaetter.
2. Kinder starten in ruhigen Spielraeumen mit grossen Kacheln, klarer Handlung, wenig Text und sicheren Hilfen.
3. Lehrkraefte steuern Inhalte, Hilfen, Entwicklungsstufen und Beobachtungen in einem getrennten Erwachsenenbereich, ohne Diagnose- oder Notendruck.
4. LeseWerk bildet den Bereich Lesen und Sprache ab: Bild, Laut, Silbe, Wort, Satz, Mini-Geschichte und einfache Sinnentnahme.
5. Lernwerkstatt bildet breitere GE-Bereiche ab: Mathematik/Praenumerik, Wahrnehmung, Sachunterricht, Kommunikation/UK, Lebenspraxis, Motorik und Lernhaltung.
6. Jedes Spiel folgt einem wiedererkennbaren Muster: orientieren, handeln, Hilfe nutzen, Rueckmeldung bekommen, wiederholen oder fertig zeigen.
7. Die Apps speichern nur, was fuer Lehrkraefte paedagogisch noetig ist, lokal, pseudonym und ohne echte Namen, Diagnosen oder Familieninformationen.
8. Die sichtbare Kinderoberflaeche zeigt keine 1-10-Skala, keine Punkte, keine Bestenlisten, keine Timer als Druckmittel und keine roten Fehlerdramaturgien.
9. Qualitaet entsteht nicht durch mehr Funktionen, sondern durch wenige hochwertige, getestete Spielraeume mit echter GE-Passung.
10. Hermes, Codex und die Spezialrollen arbeiten in kleinen Slices mit fruehem Report, klarer Stop-Regel und menschlicher Entscheidung bei sensiblen oder grossen Schritten.

## 2. Qualitaetsraster fuer S-Tier Bildungsapps im GE-Bereich

| Dimension | S-Tier-Kriterium | Warnsignal | Pruefung |
|---|---|---|---|
| Kindgerechter Einstieg | Kind sieht zuerst Profil/Farbe/Spielkachel und eine klare Hauptaktion. | Start wirkt wie Dashboard, Formular oder Lehrkraft-App. | Browserpfad: Start -> Spiel -> erste Handlung. |
| GE-Zugaenge | Basal, konkret-handelnd/unterstuetzt und erweitert sind sichtbar mit Hilfen gedacht. | Ein Spiel passt nur fuer symbolisch lesende Kinder. | Fuer jede Aufgabe drei Zugangsstufen notieren. |
| Spielraum statt Arbeitsblatt | Eigener visueller Raum mit zentralem Lernobjekt und 2-4 Touchzielen. | Liste, Formular, Tabelle oder zu viel Beschreibung. | Sichtpruefung gegen GE-SPIELRAUM-PATTERN. |
| Orientierung | Wiederkehrender Ablauf, wenige Optionen, grosse Buttons, klare Positionen. | Kind muss Navigation neu lernen oder lange Texte lesen. | Tablet- und Mobilansicht pruefen. |
| Handlung | Antippen reicht; Drag darf optional sein, aber nicht zwingend. | Feine Motorik oder Drag-only blockiert Teilnahme. | Eine Runde nur mit Tippen durchfuehren. |
| Hilfe | Hilfe ist positiv: weniger Auswahl, Vormachen, Symbolhinweis, Pause, gemeinsame Handlung. | Hilfe ist versteckt, beschämend oder nur nach Fehler sichtbar. | Hilfe mindestens einmal im Smoke testen. |
| Feedback | Kurz, konkret, handlungsnah: „Du hast gewählt“, „Die Karte ist angekommen“. | „Falsch“, „verloren“, rote Fehlermeldung, Punkte. | Sichtbarer Feedbacktext pruefen. |
| Didaktik | Jede Aufgabe hat Lernziel, Materialbezug, Wiederholung und naechsten kleinen Schritt. | Nur hübsche Interaktion ohne Lernabsicht. | Mini-PRD je Spielraum. |
| Lehrkraftlogik | Beobachtung, Hilfegrad, Transfer und 1-10 nur im getrennten Lehrkraftbereich. | Kinder sehen Skalen, Diagnostik oder Auswertung. | Kinderansicht separat pruefen. |
| Datenschutz | Lokal, anonym/pseudonym, keine echten Namen, Diagnosen, Fotos oder Cloud. | Login, Sync, echte Profile, Tracking, externe Assets ohne Lizenz. | Privacy-Check im Report. |
| Technische Stabilitaet | Build gruen, Kernpfad im Browser sichtbar getestet, keine Overflows. | Nur theoretisch beschrieben, nicht geoeffnet. | Build/Smoke je nach Artefakt. |
| Erweiterbarkeit | Neue Inhalte folgen einem festen Pattern, nicht jedes Spiel ist Sonderbau. | Jede Erweiterung braucht neue Logik und neue Navigation. | Komponenten-/Pattern-Check. |
| Unterrichtstauglichkeit | Lehrkraft kann in 2 Minuten starten und sieht naechste paedagogische Entscheidung. | Zu viel Setup, zu viele Menues, unklare Nutzung. | Real-Class-Review: Einzelkind, Kleingruppe, Tablet. |

Kurzformel: S-Tier im GE-Bereich bedeutet: ruhiger Spielraum + klare Handlung + gute Hilfe + getrennte Beobachtung + lokale Sicherheit + getesteter Kernpfad.

## 3. LeseWerk Roadmap: naechste 10 Slices, sortiert nach Wirkung und Risiko

Sortierung: zuerst hohe Wirkung bei kontrollierbarem Risiko, dann groessere Erweiterungen.

1. Alpha 70C: Visuelle Premium-Symbolkarten fuer Mini-Geschichte-Auswahl
   - Wirkung: hoch, weil die bestehende stabile Mini-Geschichte sofort hochwertiger wirkt.
   - Risiko: mittel, weil visuelle Politur leicht in Redesign kippt.
   - Grenze: keine neuen Inhalte, keine externe Assets, nur bestehende Karten Mama/Sofa/Tasse/Lama.
   - Akzeptanz: Tests/Build gruen, ein repraesentativer Browserpfad zeigt neue Karten, Report existiert.

2. Alpha 70D: Lehrkraft-Auswahl verstaendlicher machen
   - Wirkung: hoch fuer Unterrichtsvorbereitung.
   - Risiko: niedrig-mittel, solange Kinderpfad unveraendert bleibt.
   - Ziel: Erwachsene sehen, warum eine Reise erscheint: Graphem/Silbe/Wort/Satz/Stufe.
   - Grenze: keine neue Diagnostikskala, keine personenbezogene Speicherung.

3. Alpha 70E: Inhaltsmatrix und Wortfamilien-Entscheidung
   - Wirkung: hoch fuer Steuerung der naechsten Inhalte.
   - Risiko: niedrig, weil nur Report/Matrix.
   - Ziel: vorhandene Buchstaben, Silben, Woerter, Saetze, Mini-Geschichten und Luecken sichtbar machen.
   - Ergebnis: ein kleiner naechster Implementierungsslice, nicht zehn neue Woerter auf einmal.

4. Alpha 70F: Stabiler Smoke-Helfer fuer Premium-Lesereisen
   - Wirkung: hoch fuer Prozessstabilitaet.
   - Risiko: mittel technisch.
   - Ziel: Test-/Browsersteuerung so verbessern, dass ein repräsentativer Pfad schneller pruefbar ist.
   - Grenze: keine App-Funktionsaenderung fuer Kinder.

5. Alpha 71A: Erste neue Wortfamilie als Mini-Slice
   - Wirkung: hoch fuer Inhaltswachstum.
   - Risiko: mittel, weil neue Inhalte didaktisch passen muessen.
   - Vorgehen: nur eine Wortfamilie, gleiche 5-Schritt-Struktur, GE-Review vor Umsetzung.

6. Alpha 71B: Hilfeoption „gemeinsam lesen“ / „nochmal hoeren“
   - Wirkung: hoch fuer unterstuetzte Zugänge.
   - Risiko: mittel, wenn Audio/Assets zu frueh kommen.
   - Grenze: erst ohne externe Audioassets, ggf. als Text-/Visual-Hilfe.

7. Alpha 71C: Mini-Geschichte als ruhiger Spielraum
   - Wirkung: hoch fuer App-Gefuehl.
   - Risiko: mittel-hoch, weil UI-Redesign.
   - Ziel: Auswahlkarten wirken wie kleiner Raum, nicht wie Quiz.

8. Alpha 71D: Lehrer-Drawer fuer Beobachtung ohne Kinderstoerung
   - Wirkung: mittel-hoch fuer Unterricht.
   - Risiko: mittel Datenschutz/UX.
   - Ziel: Hilfeform, Leseschritt, naechster Schritt erfassbar, aber nicht im Kindermodus dominant.

9. Alpha 72A: Transferkarten Sprache/Alltag
   - Wirkung: mittel-hoch, weil Lesen an Alltag knuepft.
   - Risiko: mittel Inhalt/GE-Passung.
   - Ziel: einfache Saetze wie „Ich sehe...“, „Ich bringe...“, ohne Schreibpflicht.

10. Alpha 72B: LeseWerk/Lernwerkstatt gemeinsame Spielraum-Komponenten pruefen
   - Wirkung: langfristig hoch.
   - Risiko: hoch, weil Architektur und Wiederverwendung schnell zu gross werden.
   - Grenze: erst nach mehreren stabilen Einzelspielraeumen; keine grosse Shared-Library sofort.

## 4. Lernwerkstatt Roadmap: naechste 10 Slices, sortiert nach Wirkung und Risiko

1. Gartenpost-Hilfemodus und Beobachtungsdrawer reparieren
   - Wirkung: sehr hoch, weil Testpilot den konkreten Bruch benannt hat.
   - Risiko: niedrig-mittel, wenn nur Standalone-Prototyp game-lab/gartenpost-prototyp.html betroffen ist.
   - Ziel: Hilfe oeffnet drei klare Optionen: Weniger, Zeig es mir, Pause; Drawer verdeckt keine aktiven Kind-Buttons.
   - Akzeptanz: eine volle Runde, alle drei Hilfen, schmale Breite, keine 1-10 im Kinderbereich.

2. Symbol-Garten Teacher-Logik in sekundären Drawer verschieben
   - Wirkung: hoch, weil Symbol-Garten jetzt Spielraum ist, aber Lehrkraft-Lernspur noch zu sichtbar sein kann.
   - Risiko: mittel, weil React-App betroffen ist.
   - Ziel: Kind sieht Spielhandlung zuerst; Beobachtung bleibt erreichbar, aber sekundär.

3. Mengen legen: Hilfen expliziter machen
   - Wirkung: hoch fuer unterstuetzte und basale Lernende.
   - Risiko: niedrig-mittel.
   - Ziel: Hilfe reduziert Material, zeigt Ziel oder modelliert eine Handlung; kein Punkte-/Fehlerdruck.

4. Gemeinsame SupportBar fuer Kinderspielraeume definieren
   - Wirkung: hoch fuer Konsistenz.
   - Risiko: mittel Architektur.
   - Ziel: Hilfe, Nochmal, Pause/Fertig, Zurueck einheitlich, aber lokal einfach.
   - Grenze: erst Pattern/kleine Komponente, kein Komplettumbau.

5. Spielraum-Startbibliothek aufraeumen
   - Wirkung: hoch fuer Orientierung.
   - Risiko: niedrig-mittel.
   - Ziel: grosse Kacheln, wenige sichtbare Optionen, Bereiche Deutsch/Mathe/Sachunterricht/Spiele fuer alle.

6. Schueler:innen-Lernspur als nicht-bewertendes Mini-Portfolio
   - Wirkung: hoch paedagogisch.
   - Risiko: mittel-hoch Datenschutz/UX.
   - Ziel: letzte 3 Stationen, Hilfe, Reflexion, naechster Schritt; keine Durchschnitte, keine Vergleiche.

7. Stationskarte in einfacher Sprache
   - Wirkung: mittel-hoch.
   - Risiko: niedrig.
   - Ziel: pro Station Ziel, Material, 3-4 Schritte, Hilfe, Fertig-Signal.

8. UK-/Kommunikationsspielraum „mehr, fertig, Pause, nochmal“
   - Wirkung: hoch fuer GE und UK.
   - Risiko: mittel Inhalt/Unterrichtspraxis.
   - Ziel: reale Kommunikationshandlung statt Symbolquiz.

9. Lebenspraxis-Spielraum „Tisch decken“
   - Wirkung: mittel-hoch fuer Transfer.
   - Risiko: mittel, weil Material-/Alltagsbruecke sauber gedacht werden muss.
   - Ziel: 1:1-Zuordnung, Hilfe, Feedback, naechster Alltagsschritt.

10. Qualitaetsdashboard fuer Lehrkraft nur als Review-/Planungsansicht
   - Wirkung: mittel langfristig.
   - Risiko: hoch, wenn es wieder dashboardlastig und kindfern wird.
   - Ziel: nicht Kinderapp dominieren, sondern Teamentscheidung stuetzen.

## 5. Gemeinsame Designregeln fuer alle Spielraeume

1. Der erste sichtbare Eindruck muss ein Spielraum sein, kein Formular.
2. Pro Bildschirm gibt es genau eine Hauptaktion.
3. Das zentrale Lernobjekt ist gross: Karte, Wort, Menge, Symbol, Gegenstand oder Szene.
4. Zwei bis vier Auswahlziele reichen; mehr Auswahl nur fuer erweiterte Modi.
5. Antippen ist Pflicht; Drag ist nur Zusatz.
6. Hilfe, Nochmal und Fertig/Pause sind jederzeit leicht erreichbar.
7. Feedback beschreibt Handlung, nicht Leistung: „Du hast gewählt“, „Die Menge ist gelegt“, „Nochmal ist okay“.
8. Kein Zeitdruck, keine Punkte, keine Bestenlisten, keine roten Fehlerzustaende.
9. Kindermodus und Lehrkraftmodus sind visuell und funktional getrennt.
10. Navigation ist konstant, gross und bildhaft; lange Menueleisten verschwinden im Spielraum.
11. Tablet und schmale Breite sind Mindestpruefung, nicht Spaeter-Aufgabe.
12. Emojis duerfen nur Platzhalter sein; fuer Unterrichts-/Produktqualitaet braucht es lokale, lizenzsichere Symbol-/Bildsprache.
13. Ruhige Natur-/Werkstattmetaphern sind besser als laute Gamification.
14. Jede neue Spielidee muss zuerst als kleiner, testbarer Raum funktionieren, bevor sie in eine Bibliothek wandert.

## 6. Gemeinsame didaktische Regeln fuer GE

1. Jede Aufgabe benennt Lernziel, Handlung, Material, Hilfe und beobachtbaren naechsten Schritt.
2. Basale Zugänge sind nicht „leichtere Aufgaben“, sondern andere Teilhabemoeglichkeiten: schauen, beruehren, waehlen, reagieren, mitmachen.
3. Unterstuetzte Zugänge brauchen sichtbare Hilfen: weniger Auswahl, Vormachen, Symbol, Wartezeit, Materialstruktur, gemeinsame Handlung.
4. Erweiterte Zugänge duerfen mehr Sprache, Auswahl, Transfer oder Satzstarter enthalten, aber ohne Leistungsdruck.
5. Hilfe ist eine Lernstrategie, kein Mangel.
6. Wiederholung ist positiv und darf als eigener Button sichtbar sein.
7. Reflexion kann nonverbal erfolgen: zeigen, Blick, Objektwahl, Symbol, Talker, Ja/Nein, Smiley, Koerperreaktion.
8. Beobachtung bleibt situativ: Material, Setting, Tagesform, Hilfegrad und Transfer gehoeren dazu.
9. 1-10 ist nur eine vorsichtige Lehrkraft-Momentaufnahme, nie Kinderfeedback.
10. Keine App entscheidet automatisch ueber Foerderplaene, Diagnosen oder Schullaufbahn.
11. Transfer in Alltagssituationen ist wichtiger als abstrakte App-Erfolgsquoten.
12. Eine gute GE-App reduziert Barrieren und macht Teilhabe sichtbar; sie misst nicht Kinder an Regelschulnormen.

## 7. Hermes-Rollenlogik: Neva, coder, schule, lernwerkstatt, research

Neva
- Rolle: Orchestrator, Scope-Waechter, Qualitaetsintegration, Datenschutz-/Risiko-Erstcheck.
- Nutzt Direktmodus fuer Reports, Task-Schnitt, Prozessregeln und kleine Konzeptentscheidungen.
- Muss grosse Ziele in kleine Slices schneiden und Abschlussdisziplin sichern.
- Darf keine Code-, Send-, Publish-, Loesch- oder Commit-Aktion ohne Freigabe autonom ausweiten.

coder
- Rolle: technische Umsetzung, minimale Codeaenderung, Tests, Build, Browser-Smoke.
- Bekommt nur kleine, dateinahe Aufgaben mit Ziel, Nicht-Ziel, Akzeptanz, Reportpfad und Stop-Regel.
- Gibt zurueck: geaenderte Dateien, Tests/Build, Browserbefund, Risiken, naechster kleiner Schritt.
- Nicht geben: „Bau die ganze Lernwerkstatt neu“.

schule
- Rolle: GE-Passung, Unterrichtsrealismus, Differenzierung, Foerderlogik, Team-/Eltern-/Schulsprache.
- Nutzen bei neuen Inhalten, Hilfe-/Feedbacksprache, Beobachtungslogik, sensiblen paedagogischen Entscheidungen.
- Prueft: basal/unterstuetzt/erweitert, Belastung, echte Unterrichtssituation, keine Diagnosesicherheit.

lernwerkstatt
- Rolle: Spezialblick auf Spielraeume, Lernkreislauf, Schuelermodus, Beta-3.0-Qualitaet, Testpilot-Perspektiven.
- Nutzen bei neuer Uebung, Spielraum, Student Flow, Qualitaetsreview.
- Liefert: Works/Breaks/Needed Help, Verdict, Next Micro-Prompt.

research
- Rolle: externe Quellen, offizielle Vorgaben, Wissenschaft, Lizenzen, Markt-/Tooldaten.
- Nur nutzen, wenn Aktualitaet oder externe Fakten wirklich relevant sind.
- Fuer reine lokale Slices ohne Webbedarf nicht einsetzen.

Standard-Routing:
- Report/Plan ohne Code: Neva allein.
- Code-Slice: coder, danach ggf. Neva-Review.
- Neue didaktische Inhalte: schule oder lernwerkstatt vor coder.
- Quellen-/Lizenz-/Marktfrage: research.
- Sensible Personen-/Schuelerdaten: Safety-Modus, anonymisieren, ggf. stoppen.

## 8. Drei direkt kopierbare Mega-Execute-Prompts

### A. LeseWerk S-Tier Ausbau

```text
MEGA EXECUTE GOAL: LeseWerk S-Tier Ausbau - Alpha 70C bis 70E kontrolliert starten

Arbeitsort:
/Users/zondrius/hermes-workspace/projects/lesewerk-v1

Ziel:
Hebe LeseWerk in kleinen, verifizierbaren Slices weiter Richtung S-Tier GE-Leseapp. Starte NICHT mit neuen grossen Features. Beginne mit Alpha 70C: visuelle Premium-Symbolkarten fuer die bestehenden Mini-Geschichte-Auswahlkarten Mama, Sofa, Tasse und Lama.

Kontext lesen:
- /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70a-premium-journey-quality-matrix.md
- /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70b-story-choice-quality-report.md
- /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c0-hermes-self-improvement-loop.md
- /Users/zondrius/hermes-workspace/handoff/codex-handoff-2026-05-21-lesewerk-hermes-workflow.md

Primaerziel Alpha 70C:
Verbessere nur die visuelle Qualitaet der bestehenden Mini-Geschichte-Auswahlkarten. Die Karten sollen weniger wie Emoji-/Platzhalter und mehr wie lokale, ruhige Premium-Symbol-/Szenenkarten wirken.

Nicht tun:
- Keine neuen Woerter.
- Keine neuen Karteninhalte.
- Keine neue Lernlogik.
- Keine externe Assets, keine Downloads, keine neuen Packages.
- Keine echten Schuelerdaten.
- Keine Punkte, Timer, Ranking, rote Fehlerdramaturgie oder Diagnosesprache.
- Kein Commit, Push oder Deployment.
- Kein breiter Umbau ausserhalb des noetigen Karten-/Style-Bereichs.

Akzeptanzkriterien:
1. Mama, Sofa, Tasse und Lama haben sichtbar hochwertigere lokale Karten-/Szenendarstellung.
2. Diese Texte bleiben gleich: Mama ist da. / Das Sofa ist da. / Die Tasse ist da. / Das Lama ist da.
3. Touchflaechen bleiben gross, ruhig und GE-tauglich.
4. Kindermodus bleibt frei von Score-, Timer-, Ranking-, Diagnose- und Schamsprache.
5. Relevante Tests laufen gruen oder Abweichungen sind exakt dokumentiert.
6. npm run build laeuft gruen oder Abweichungen sind exakt dokumentiert.
7. Browser-Smoke ist begrenzt: App laedt, ein betroffener Einstieg funktioniert, ein repraesentativer Mini-Geschichte-Pfad zeigt die neuen Karten.
8. Report existiert unter /Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c-symbol-card-visual-quality-report.md

Stop-Regel:
Nach gruenem Test/Build und einem repraesentativen sichtbaren Browserpfad nicht weiter perfektionieren. Wenn Browsersteuerung instabil ist: maximal zwei Strategien versuchen, dann dokumentieren, ob es App-Fehler oder Teststeuerungsrisiko ist. Report sichern vor weiterer Pruefung.

Rueckgabe:
- Geaenderte Dateien
- Tests/Build
- Browserbefund
- GE/Privacy-Check
- Risiken
- Naechster kleinster Slice: Alpha 70D oder Korrektur, falls 70C nicht stabil ist
```

### B. Lernwerkstatt 4.0 Premium-Spielraeume

```text
MEGA EXECUTE GOAL: Lernwerkstatt 4.0 Premium-Spielraeume - erster sicherer Slice

Arbeitsort:
/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt

Ziel:
Hebe die GE-Lernwerkstatt Richtung Premium-Spielraeume, aber starte mit genau einem kleinen, wirksamen Slice. Repariere zuerst den Gartenpost-Prototyp: Hilfemodus konkretisieren und Beobachtungsdrawer so fuehren, dass der Kinderspielraum nicht gestoert wird.

Kontext lesen:
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/LERNKREISLAUF_MODELL.md

Betroffene Datei:
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html

Primaerziel:
Der Hilfe-Button oeffnet einen kindgerechten Hilfemodus mit genau drei grossen Optionen: Weniger, Zeig es mir, Pause. Der Beobachtungsdrawer darf keine aktiven Kind-Aktionen halb verdecken.

Nicht tun:
- Nicht die ganze React-App umbauen.
- Nicht mehrere Spielraeume gleichzeitig bearbeiten.
- Keine echten Schuelerdaten, keine Namen, keine Diagnosen, keine Speicherung.
- Keine Cloud, kein Tracking, keine externen Assets oder neuen Packages.
- Keine Punkte, Timer, Ranking, rote Fehlerdramaturgie.
- Kein Commit, Push oder Deployment.

Akzeptanzkriterien:
1. Eine vollstaendige Runde funktioniert: Karte antippen -> Briefkasten antippen -> Feedback -> naechste Karte.
2. Hilfeoption Weniger reduziert auf zwei Ziele und markiert ruhig die naechste Handlung.
3. Hilfeoption Zeig es mir fuehrt eine langsame Demo aus.
4. Hilfeoption Pause zeigt, dass Pause/Fertig okay ist, ohne Druck.
5. Beobachtung oeffnen: keine halb verdeckten aktiven Kind-Buttons; 1-10 bleibt nur im Lehrkraftbereich.
6. Schmale Breite geprueft: keine Textueberlappung, Touchziele bleiben gross.
7. Report schreiben unter /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/gartenpost-hilfe-drawer-fix-2026-05-21.md

Verifikation:
- Standalone lokal per Server oeffnen.
- Browser-Smoke fuer volle Runde, alle drei Hilfen und Beobachtungsdrawer.
- Kein npm build noetig, wenn nur Standalone-HTML geaendert wird; falls React-App beruehrt wird, npm run build.

Stop-Regel:
Nach erfolgreichem Kernpfad und Hilfetests stoppen. Keine Integration in React-App im selben Slice. Keine neuen Spielraeume beginnen.

Rueckgabe:
- Geaenderte Datei(en)
- Gepruefte Browserpfade
- GE/Privacy-Check
- Staerken, Schwaechen, Risiken
- Naechster kleinster Slice
```

### C. Hermes Dauer-Qualitaetsloop

```text
MEGA EXECUTE GOAL: Hermes Dauer-Qualitaetsloop fuer Bildungsstudio

Ziel:
Betreibe Lernwerkstatt und LeseWerk nicht als Endlosbau, sondern als wiederholbaren Qualitaetsloop: lesen, klein schneiden, bauen oder pruefen, verifizieren, berichten, naechste Entscheidung ableiten.

Jede Runde beginnt mit:
1. Ziel in einem Satz.
2. Nicht-Ziele.
3. Betroffene Dateien.
4. Akzeptanzkriterien.
5. Verifikationsplan.
6. Reportpfad.
7. Stop-Regel.

Rollenlogik:
- Neva: Scope, Datenschutz, Ergebnisintegration, Kanban-Abschluss.
- coder: nur konkrete Code-/Test-/Browser-Slices.
- schule: GE-Passung, Unterrichtsrealismus, Hilfe-/Feedbacksprache.
- lernwerkstatt: Spielraum-, Student-Flow- und Testpilot-Review.
- research: nur bei Quellen, Lizenz, Wissenschaft, Markt oder aktuellen externen Fakten.

Pflicht-Gates:
- PrivacyGate: keine echten Namen, Diagnosen, Familieninfos, Fotos, Cloud, Tracking oder Schuelerdaten in Prompts/Reports.
- ChildModeGate: keine Punkte, Timer, Rankings, 1-10, Diagnosesprache oder rote Fehlerdramaturgie im Kindermodus.
- SliceGate: genau ein Primaerziel pro Aufgabe.
- EvidenceGate: Report nennt Dateien, Checks, Browser-/Sichtbefund und Risiken.
- StopGate: nach ausreichender Evidenz stoppen, nicht perfektionieren.

Arbeitsreihenfolge pro Slice:
1. Noetige Kontextdateien lesen, keine Webrecherche ohne Bedarf.
2. Mini-PRD oder Annahmen notieren.
3. Bei Code: kleinste Aenderung, Tests/Build, begrenzter Browser-Smoke.
4. Bei Review: gegen Beta-3.0, GE-SPIELRAUM-PATTERN und Datenschutz pruefen.
5. Report frueh anlegen und finalisieren.
6. Decision Inbox Block schreiben: SOFORT_MACHEN, CHRIS_ENTSCHEIDET, BEOBACHTEN, SPAETER, BLOCKIERT, NICHT_TUN, Naechste kleinste Aktion, Beleg/Datei.

Nicht tun:
- Keine grossen Sammelprompts wie „mach alles besser“.
- Keine neuen Features nach der Verifikation anfangen.
- Keine Browser-Endlosschleifen.
- Keine Handoffs fuer unklare Ideen.
- Keine App-Integration, Symbol-Lizenzentscheidung, Veroeffentlichung, Commits oder Deployments ohne Chris.

Rueckgabeformat:
## Result
- Built/changed or reviewed:
- Open/check here:
- Verified:
- GE/privacy check:
- Strengths:
- Weaknesses:
- Risks:
- Next best prompt:
```

## 9. Klare Warnungen: Was nicht tun, damit es nicht wieder blockiert oder unuebersichtlich wird

1. Nicht beide Apps gleichzeitig umbauen. Masterplan ja, Implementierung immer nur ein kleiner Slice.
2. Nicht neue Inhalte, visuelle Politur, Architektur, Tests und Browservollpruefung in einen Lauf packen.
3. Nicht erst am Ende den Report schreiben; bei Budgetrisiko ist sonst die gute Arbeit nicht sauber gesichert.
4. Nicht Browser-Smoke als endlose Vollabnahme aller Varianten behandeln. Ein repräsentativer Pfad reicht, wenn der Auftrag nicht Vollabnahme lautet.
5. Nicht automatisch Multi-Agent einsetzen. Bei kleinen Slices erzeugt das mehr Koordination als Nutzen.
6. Nicht mit externen Assets, Symbolbibliotheken oder Bilddownloads starten. Erst Lizenz-/Datenschutzfrage klaeren.
7. Nicht echte Schueler-, Eltern-, Diagnose-, Foto- oder Familieninformationen in Prompts, Appdaten, Reports oder Memory schreiben.
8. Nicht 1-10, Diagnostik, Ranking oder Leistungssprache in den Kindermodus schieben.
9. Nicht jede gute Idee sofort bauen. Ideen gehoeren in Roadmap oder Next Prompt, nicht in denselben Slice.
10. Nicht eine gemeinsame Komponentenbibliothek zu frueh erzwingen. Erst mehrere stabile Spielraeume, dann abstrahieren.
11. Nicht aus einem Prototyp ein Produktversprechen machen. S-Tier braucht verifizierte Nutzung, nicht nur UI-Politur.
12. Nicht Kanban blockieren lassen durch Perfektionismus. Wenn Kernziel erreicht und Risiken dokumentiert sind: sauber abschliessen.

## 10. Empfehlung: Was soll als naechstes sofort ausgefuehrt werden?

Empfehlung 1, sofort und am sichersten:
LeseWerk Alpha 70C ausfuehren: visuelle Premium-Symbolkarten fuer Mini-Geschichte-Auswahlkarten.

Warum:
- Die Alpha-70A/70B-Basis ist bereits technisch gruen.
- Der naechste Schritt ist in den Reports klar vorbereitet.
- Der Slice ist klein, sichtbar und wirkungsstark.
- Es gibt bereits eine harte Stop-Regel aus Alpha 70C-0.

Direkter naechster Auftrag:
Nutze Prompt A aus Abschnitt 8 und starte nur Alpha 70C. Kein Alpha 70D/70E im selben Lauf.

Empfehlung 2, parallel spaeter oder danach:
Lernwerkstatt Gartenpost-Hilfemodus und Drawer-Fix ausfuehren.

Warum:
- Der Testpilot hat einen konkreten Bruch identifiziert.
- Der Fix ist paedagogisch wichtig: Hilfe wird sichtbar und der Lehrkraftbereich stoert den Kinderspielraum nicht.
- Es ist ein Standalone-Prototyp-Slice mit ueberschaubarem Risiko.

Direkter naechster Auftrag:
Nutze Prompt B aus Abschnitt 8. Keine React-Integration im selben Slice.

Entscheidung:
Wenn nur ein Task gestartet wird, starte LeseWerk Alpha 70C. Es ist der stabilere naechste Schritt, weil die bestehende Alpha-70-Prozessregel genau dafuer geschrieben wurde. Danach Gartenpost-Fix als Lernwerkstatt-Slice.

## Qualitaetscheck dieses Masterplans

Staerken:
- Roadmap trennt LeseWerk und Lernwerkstatt, verbindet sie aber ueber gemeinsame Spielraum- und GE-Regeln.
- Die naechsten Schritte sind konkret und klein genug fuer Kanban/Codex.
- Datenschutz, Kindermodus und Stop-Regeln sind als harte Gates formuliert.

Schwaechen:
- Keine externe Forschung oder Marktanalyse enthalten, weil der Auftrag Webrecherche ausgeschlossen hat.
- Keine aktuelle Codepruefung oder Browserpruefung, weil der Auftrag nur lesenden Scan und Report verlangte.
- Die Roadmap priorisiert aus vorhandenen Reports; echte Unterrichtserprobung kann Prioritaeten verschieben.

Risiken:
- S-Tier kann nur erreicht werden, wenn jeder Slice wirklich getestet wird, nicht nur geplant.
- Symbol-/Asset-Fragen koennen spaeter rechtlich und gestalterisch relevant werden.
- Gemeinsame Designregeln duerfen nicht zu starrer Gleichmacherei fuehren; GE braucht Anpassung an Material, Kind und Setting.

Naechste kleinste Aktion:
- Alpha 70C als kleiner Coder-/Codex-Slice nach Prompt A ausfuehren lassen.
