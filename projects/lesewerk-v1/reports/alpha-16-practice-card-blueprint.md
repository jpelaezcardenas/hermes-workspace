# Alpha 16 Slice A – Praxis-Pilotkarte Blueprint

Datum: 2026-05-17
Status: Blueprint erstellt

## Kurzfazit

Die Praxis-Pilotkarte sollte als ruhige, kompakte Nachbereitung direkt im Lehrerbereich unterhalb des 2-Karten-Pilotmodus stehen. So bleibt die Reihenfolge logisch: erst der kurze Pilot, dann genau drei beobachtende Leitfragen, dann ein nächster kleiner Schritt ohne Diagnose, Export oder Speicherung.

## Ziel der Karte

Die Karte unterstützt die Lehrkraft nach dem Alpha-15-Zwei-Karten-Pilot dabei, nur das zu sichern, was im Unterricht wirklich sichtbar war:

- Start gelang oder brauchte es Einstiegshilfe?
- Welche Hilfe war tatsächlich nützlich?
- Was ist der kleinste sinnvolle nächste Schritt?

Die Karte ist damit eine Unterrichtsnotiz für die direkte Praxis, kein Diagnoseinstrument und kein Dokumentationssystem.

## Platzierung im Lehrerbereich

Empfohlener Ort:

- im Lehrerbereich als eigene, kompakte Karte direkt unter dem 2-Karten-Pilotmodus;
- visuell näher an der Pilot-Startlogik als an der allgemeinen Tagesweg-Auswahl;
- optional als sekundäre Karte neben oder unter der kurzen Pilotbeschreibung, damit der Bezug zur Erstnutzung sofort sichtbar bleibt.

Begründung:

- Der Pilot ist der konkrete Anlass für die Beobachtung.
- Die Praxiskarte gehört deshalb dorthin, wo die Lehrkraft nach dem ersten Lauf weitermacht.
- Die Karte soll nicht wie eine zusätzliche Diagnoseseite wirken, sondern wie ein kurzer Reflexionsschritt im selben Handlungsfluss.

## Anschluss an den Alpha-15-2-Karten-Pilot

Die Karte soll den Pilot nicht ersetzen, sondern direkt daran anschließen:

1. Lehrkraft startet den 2-Karten-Pilot.
2. Die Beobachtung bleibt auf das Sichtbare begrenzt.
3. Nach dem Pilot öffnet die Lehrkraft die Praxis-Pilotkarte.
4. Dort werden drei einfache Leitfragen bearbeitet.
5. Aus der Antwort entsteht nur der nächste kleinste Schritt, nicht ein Etikett.

Wichtig ist, dass die Karte den gleichen Ton wie Alpha 15 hält: ruhig, knapp, lokal, anonym und ohne Leistungsdruck.

## Exakte Wortlaute der drei Prompts

Die drei Prompts sollen genau so lauten:

- Start gelungen?
- Welche Hilfe wurde genutzt?
- Nächster kleinster Schritt?

Warum genau diese Form:

- kurz genug für Tablet und Desktop;
- leicht lesbar bei wenig Zeit;
- sachlich und nicht bewertend;
- anschlussfähig an Unterrichtsbeobachtung in GE;
- ohne Fachjargon und ohne diagnostische Zuspitzung.

## Wie die Karte browser-print-freundlich wird

Ohne Export-, Datei- oder Upload-Logik kann die Karte so print-freundlich bleiben:

- als klar abgegrenzter, weißer oder sehr ruhiger Kartenbereich mit hoher Kontrastlesbarkeit;
- mit wenig Text, großen Abständen und einer einzigen Spalte auf schmalen Bildschirmen;
- mit sichtbarer Überschrift, den drei Leitfragen und einem kurzen Abschlussfeld;
- ohne interaktive Elemente, die auf dem Ausdruck stören würden;
- mit bestehendem Browserdruck/Print-Preview nutzbar, aber ohne eigenen Datei- oder PDF-Workflow.

Praktisch heißt das: Die Lehrkraft kann die Bildschirmansicht im Browser drucken, wenn sie möchte. Die App selbst erzeugt dafür aber keinen Export und speichert nichts automatisch.

## Inhaltliche Form der Praxiskarte

Empfohlene Struktur:

- kurze Überschrift mit Bezug zur Praxis;
- 1 Satz Erinnerung an den 2-Karten-Pilot;
- genau drei Fragen mit Freitextfeld oder knappen Antwortfeldern;
- ein sehr kurzer Abschlussbereich mit „Nächster kleinster Schritt“;
- optional ein ruhiger Hinweis wie „Nur das festhalten, was sichtbar war“.

Die Karte sollte nicht mehr als diese Funktionen tragen.

## Datenschutz- und GE-Schutz

Die Karte muss konsequent anonym bleiben:

- keine echten Namen;
- keine Klassenliste;
- keine Diagnosefelder;
- keine sensiblen personenbezogenen Angaben;
- keine automatische Speicherung von Beobachtungen;
- kein Cloud-, Upload- oder Exportpfad;
- keine Formulierung, die wie Bewertung oder Testauswertung wirkt.

GE-passend ist die Karte dann, wenn sie beobachtbar, entlastend und teamverständlich bleibt.

## Testidee für Privacy, Einfachheit und GE-Suitability

Die Implementierung sollte durch kleine, gezielte Tests abgesichert werden. Sinnvoll sind vor allem Tests, die prüfen, dass die Karte:

1. nur im Lehrerbereich erscheint;
2. den klaren Anschluss an den 2-Karten-Pilot hat;
3. exakt diese drei Prompts enthält:
   - Start gelungen?
   - Welche Hilfe wurde genutzt?
   - Nächster kleinster Schritt?
4. keine Hinweise auf Speicherung, Export, Login, Upload oder Cloud enthält;
5. sprachlich kurz, ruhig und nicht-diagnostisch bleibt;
6. auf schmalen Viewports nicht in eine unlesbare Mehrspaltenstruktur kippt.

Wenn man die Tests knapp halten will, sind drei Schutzrichtungen am wichtigsten:

- Privacy: keine personenbezogene oder exportbezogene Funktion;
- Simplicity: nur drei Fragen, keine Zusatzlogik;
- GE suitability: ruhige, konkrete, nicht wertende Sprache.

## Empfohlene Testformulierung

Die Tests sollten eher Inhalts- und Strukturtests als Funktions- oder Flowtests sein, zum Beispiel:

- Karte im Lehrerbereich auffindbar;
- drei exakte Prompt-Texte vorhanden;
- keine gespeicherte Beobachtung erzeugt;
- keine Export-/Upload-/Cloud-Wörter im Zusammenhang mit der Karte;
- Print-/Responsive-Layout bleibt einspaltig und lesbar.

## Abgrenzung

Nicht Teil dieser Slice:

- keine Codeänderung;
- keine neue Speicherlogik;
- kein PDF-Export;
- keine Diagnoseauswertung;
- keine Erweiterung des Kartenkatalogs.

## Nächster Umsetzungsschritt

Die Implementierung sollte die Praxiskarte als schmale, ruhige Lehrerkarte unter dem 2-Karten-Pilot einbauen und danach mit gezielten Inhalts- und Layouttests absichern.
