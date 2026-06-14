# Alpha 15 Slice A – Zwei-Karten-Pilotmodus Blueprint

Datum: 2026-05-17
Status: Blueprint erstellt, keine Codeänderungen

## Kurzfazit

Alpha 15 soll keine neue Lernlogik und keinen neuen Inhaltsbereich bauen. Der kleinste sichere Schritt ist ein klarer, primärer 2-Karten-Pilotmodus für die Erstnutzung: Lehrkraft startet bewusst einen sehr kleinen lokalen Lesemoment, das Kind liest genau zwei vorhandene Karten mit einer vorbetonten Hilfe, danach endet der Flow ruhig.

Der bestehende Tagesweg und die Vollbibliothek bleiben erhalten, werden aber während des Pilots sekundär behandelt. Der Pilot ist kein Test, keine Diagnose und kein Fortschrittssystem.

## Ausgangslage

Gelesene Grundlage:

- `reports/alpha-15-goal-prompt.md`
- `reports/alpha-14-gap-audit-and-pilot-blueprint.md`
- `reports/alpha-14-pilot-readiness-report.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

Aktueller Stand:

- Der Kinderpfad startet direkt mit Profil, Hilfen, Tagesweg, Lesekarte und optionaler Vollbibliothek.
- Der Standard-Tagesweg hat vier Karten: zwei Aufgaben, eine Story, eine Wiederholung.
- Die Vollbibliothek ist bereits sekundär in einem `<details className="library-panel">` versteckt.
- Alpha 14 hat Lehrkraft-Onboarding und Pilot-Checkliste ergänzt, aber noch keinen echten 2-Karten-Startfluss.
- Es gibt 48 Aufgaben und 24 Stories; der Pilot soll ausschließlich bestehende Inhalte verwenden.

## Entscheidung 1: Wo der 2-Karten-Pilot startet

Empfehlung: Der Pilot startet im Lehrkraftbereich als primäre Handlung oberhalb oder sehr nah bei `Tagesweg wählen`.

Vorgeschlagener Buttontext:

- `2-Karten-Pilot starten`

Begleittext direkt am Button:

- `Startet einen kurzen lokalen Lesemoment mit genau zwei vorhandenen Karten. Keine Bewertung, keine Diagnose, keine echten Namen.`

Begründung:

- In GE-Erstnutzung sollte die Lehrkraft den Rahmen setzen, nicht das Kind aus mehreren Wegen auswählen lassen.
- Der Start im Lehrkraftbereich passt zu Alpha 14: erst vorbereiten, dann Kind lesen lassen, danach vorsichtig beobachten.
- Ein direkter Kinderpfad-Button im Hero wäre schneller, aber riskanter: Er könnte ohne Lehrkraft-Setzung wie ein Spiel- oder Teststart wirken.

Umsetzungsidee für Slice B, ohne Scope-Ausweitung:

- Neuer lokaler UI-State, z. B. `pilotMode: boolean` und `pilotCardIndex` oder eine kleine Pilotpfad-Liste.
- Button setzt:
  - `mode = 'child'`
  - `pilotMode = true`
  - `selectedDailyPathIds` auf genau zwei sichere bestehende Karten oder eine separate Pilotpfad-Funktion
  - `support.reduceChoices = true`
  - `support.imageHelp = true`
  - `support.syllableColors = true`
  - `phase = 'task'`
- Keine Persistenz außer vorhandener anonymer Profilwahl.

## Entscheidung 2: Welche zwei bestehenden Karten Standard sind

Empfohlene sichere Default-Karten:

1. `a-ball` – Wort: `Ball`
2. `a-tasse` – Wort: `Tasse`

Beide stammen aus Level A / `image-word-match` in `src/lesewerk-content.mjs`.

Begründung für `a-ball`:

- sehr kurzes, konkretes Alltagswort;
- bereits als zweites Element im bestehenden Content vorhanden;
- lokales Symbol ist einfach und nicht lizenzkritisch;
- viele Kinder kennen den Gegenstand, ohne dass ein Schul- oder Familiensetting vorausgesetzt wird.

Begründung für `a-tasse`:

- konkreter Gegenstand, alltagsnah und ruhig;
- zweisilbig, aber gut mit vorhandenen Silbenfarben stützbar;
- Optionenset bleibt überschaubar und nicht emotional/sozial aufgeladen;
- keine personenbezogene, diagnostische oder familiäre Deutung.

Warum nicht als Standard:

- `a-mond`: sicher, aber weniger alltagspraktisch im Klassenraum als Ball/Tasse.
- Story-Karte: für den ersten 2-Karten-Pilot zu viel Sprache und zusätzliche Antwortlogik.
- `Mama`: familiär aufgeladen und für sensible Kontexte weniger neutral.
- Sozial-emotionale Stories: pädagogisch wertvoll, aber für einen sehr ersten, datensparsamen Pilot eher deutungsanfällig.

Fallback, falls eine Karte später entfernt wird:

- Erstes verfügbares Level-A-`image-word-match` mit kurzem Prompt und lokalem Symbol.
- Kein automatischer Wechsel auf Story oder Level B/C.

## Entscheidung 3: Welche Hilfe vorgewählt oder betont wird

Empfehlung: Im Pilot werden `Bildhilfe`, `Silbenfarben` und `Weniger Auswahl` aktiv gesetzt; kommunikativ wird eine Hilfe als Hauptanker betont: `Bildhilfe`.

Praktische Auslegung:

- Voraktiviert:
  - `imageHelp: true`
  - `syllableColors: true`
  - `reduceChoices: true`
- Nicht automatisch aktivieren:
  - `readAloud`
  - `signHint`
  - `repeat`

Begründung:

- `Bildhilfe` ist für GE-Erstnutzung am niedrigschwelligsten und sichtbar entlastend.
- `Silbenfarben` sind ohnehin im bisherigen Default aktiv und stützen ohne zusätzliche Entscheidung.
- `Weniger Auswahl` schützt genau das Alpha-15-Ziel: nicht die Vollbibliothek öffnen, sondern zwei Karten ruhig anbieten.
- `Vorlesen` sollte Lehrkraftentscheidung bleiben, weil es situativ und mündlich geführt wird.
- `Gebärden-Hinweis` ist hilfreich, kann aber im ersten Pilot zusätzliche Erklärlast erzeugen.
- `Nochmal` sollte erst nach einer Karte oder durch Lehrkraftentscheidung entstehen, nicht als Startsignal.

Kindgerechter sichtbarer Hinweis im Pilot:

- `Heute nur zwei Karten. Die Bildhilfe ist an. Alles in Ruhe.`

Lehrkrafthinweis:

- `Für den ersten Pilot: Bildhilfe sichtbar lassen. Weitere Hilfen nur ergänzen, wenn sie dem Kind bekannt sind.`

## Entscheidung 4: Wie der Kinderflow nach zwei Karten endet

Empfehlung: Der Pilot endet automatisch nach genau zwei abgeschlossenen Karten mit einem ruhigen Abschlussbildschirm.

Gewünschter Ablauf:

1. Lehrkraft startet `2-Karten-Pilot starten`.
2. Kinderpfad zeigt anonymes Profil und Pilot-Hinweis.
3. Karte 1: `Ball` lesen, Button `Ich bin fertig`.
4. Kurzes Feedback, aber keine offene große Weiterwahl.
5. Weiter zur Karte 2: `Tasse`.
6. Nach Karte 2: Abschlussbildschirm.

Abschlusskopie:

- Überschrift: `Danke fürs Lesen.`
- Text: `Du hast zwei Karten in Ruhe gelesen. Jetzt ist Pause.`
- Handlungen:
  - primär: `Zur Lehrkraft`
  - sekundär: `Pilot noch einmal starten`

Wichtig:

- Nach Karte 1 darf es keine freie Wahl `Leichter / Weiter` geben, die den Pilot aus dem Zwei-Karten-Rahmen schiebt.
- Nach Karte 2 darf kein automatischer Übergang zur Vollbibliothek oder zur dritten Tageswegkarte passieren.
- `Nochmal` kann im Pilot nur dieselbe Karte wiederholen, ohne den Zwei-Karten-Zähler zu erhöhen; alternativ bleibt `Nochmal` im ersten Slice bewusst draußen, um Implementierung und Tests klein zu halten.

Empfohlene enge Slice-B-Variante:

- Im Pilot keine `Leichter/Weiter/Fertig`-Auswahl nach jeder Karte anzeigen.
- Stattdessen nach Karte 1 ein ruhiger Button `Weiter zur zweiten Karte`.
- Nach Karte 2 nur Abschluss.
- Wiederholung erst später prüfen, nicht in Slice B erzwingen.

## Entscheidung 5: Wie die Vollbibliothek sekundär bleibt

Empfehlung: Im Pilot wird die Vollbibliothek nicht entfernt, aber visuell und funktional klar sekundär gehalten.

Konkretes Verhalten:

- Während `pilotMode === true` bleibt `Alle Wörter und Geschichten öffnen` geschlossen.
- Der Pilotbereich zeigt nur die zwei Pilotkarten.
- Falls die Vollbibliothek sichtbar bleibt, dann mit Hinweis:
  - `Für den Pilot nicht nötig. Nur öffnen, wenn die Lehrkraft bewusst wechseln möchte.`
- Ein Klick in die Vollbibliothek beendet entweder den Pilot bewusst oder zeigt eine klare Entscheidung:
  - `Pilot verlassen und Bibliothek öffnen`

Für Slice B eng halten:

- Am sichersten: Bibliothek im Pilot nicht anzeigen; nach Abschluss im Lehrkraftbereich weiterhin verfügbar.
- Wenn aus technischer Einfachheit sichtbar: sie muss geschlossen bleiben und darf den Zwei-Karten-Zähler nicht beeinflussen.

## Tests, die das Verhalten schützen müssen

Mindesttests für Slice B:

1. Pilotpfad nutzt genau zwei Karten.
   - Erwartung: neue Funktion oder Source-Struktur liefert Länge `2`.
   - IDs exakt: `a-ball`, `a-tasse` oder dokumentierter Fallback.

2. Pilotkarten stammen aus bestehenden Aufgaben.
   - Erwartung: jede Pilot-ID existiert in `getLearningTasks()`.
   - Keine neuen Content-Objekte, keine Storypflicht, keine externen Assets.

3. Pilot-Start setzt sichere Hilfen.
   - Source-/Funktionsprüfung für `imageHelp: true`, `syllableColors: true`, `reduceChoices: true`.
   - Keine automatische Aktivierung von `readAloud`, `signHint`, `repeat`.

4. Kinderflow endet nach zwei Karten.
   - Source-/UI-Test schützt eine Grenze wie `pilotCardIndex >= 1` oder `pilotCards.length === 2` und Abschlusskopie `Du hast zwei Karten in Ruhe gelesen`.
   - Kein automatischer Zugriff auf dritte Tageswegkarte, Story oder Vollbibliothek.

5. Vollbibliothek bleibt sekundär.
   - `library-panel` bleibt `<details>` oder wird im Pilot ausgeblendet.
   - Test stellt sicher, dass der Pilot nicht `getDailyReadingPath()` mit vier Karten als sichtbaren Hauptweg nutzt.

6. Sprach- und Sicherheitsgrenzen bleiben erhalten.
   - Keine Begriffe/Claims: Diagnose, Score, Punkte, Note, Ranking, Timer, Tempo/Zeitdruck, validiert, einsatzfertig, Schülerverwaltung, Login, Cloud, Export.
   - Kopie enthält weiterhin lokal/anonym/nicht-diagnostisch.

7. Regression bestehender Grenzen.
   - Bestehende Tests zu 48 Aufgaben, 24 Stories, lokalen Symbolhilfen, geschlossener Vollbibliothek und Alpha-14-Onboarding bleiben aktiv.

Empfohlene Testdatei:

- Primär `tests/lesewerk-content.test.mjs`, weil dort bereits Content-, Source- und UI-Grenztests liegen.
- Nur bei Bedarf eine kleine separate UI-Testdatei; nicht in Slice B einen großen Browser-/E2E-Testaufbau starten.

## Explizit out of scope für Alpha 15 Slice B

Damit die nächste Aufgabe nicht wieder oversized wird, bleibt draußen:

- keine neue Aufgaben- oder Storybibliothek;
- keine neuen Level, Kompetenzraster oder automatischen Lernstände;
- keine Diagnostik, kein Score, kein Timer, keine Prozentanzeige, keine Rangfolge;
- keine Schülerverwaltung, keine echten Namen, keine Klassenlisten;
- kein Login, keine Cloud, kein Export, keine Datenbank;
- keine neuen externen Bilder, Icons, Symbolsets oder geschützten Assets;
- keine neue Druck-/PDF-/Dokumentationslogik;
- keine breite Startseiten- oder Design-Neugestaltung;
- keine Tablet-Komplettoptimierung über notwendige kleine Layout-Anpassungen hinaus;
- keine Nutzerinterview-, Marketing-, Eduki- oder Verkaufslogik;
- keine automatische Empfehlungserweiterung;
- kein Commit, Push oder Deployment.

## Akzeptanzkriterien für Slice B

Slice B ist ausreichend, wenn:

- eine Lehrkraft sichtbar `2-Karten-Pilot starten` wählen kann;
- der Pilot genau `Ball` und `Tasse` aus vorhandenen Aufgaben nutzt;
- `Bildhilfe`, `Silbenfarben` und `Weniger Auswahl` für den Pilot aktiv sind;
- das Kind nach zwei Karten einen ruhigen Abschluss sieht;
- Vollbibliothek und größerer Tagesweg nicht primär im Pilot erscheinen;
- keine Diagnose-, Bewertungs-, Tempo-, Cloud- oder Echtdatenlogik entsteht;
- fokussierte Tests sowie `npm test` und `npm run build` bestanden haben.

## Empfehlung für die nächste Slice

Slice B sollte ausschließlich den beschriebenen 2-Karten-Pilotmodus implementieren und einen kurzen Report `reports/alpha-15-two-card-pilot-implementation-report.md` schreiben. Wenn während der Umsetzung der Wunsch nach Wiederholung, neuer Auswahl, Story-Pilot oder Lehrkraftnotizen entsteht, muss das als spätere Slice notiert werden und nicht in Slice B wandern.
