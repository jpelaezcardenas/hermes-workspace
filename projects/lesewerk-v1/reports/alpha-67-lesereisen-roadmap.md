# Alpha 67 Lesereisen Roadmap

Ziel: Mini-Lesereisen konservativ ausbauen, ohne Kindmodus aufzublasen, ohne Speicherung und ohne Diagnose-/Drucksprache. Jede Erweiterung bleibt lokal, klein testbar und erst nach stabiler UI sinnvoll.

## Priorität 1: 67F Tasse-Reise erst nach stabiler Auswahl

- Nutzen: Dritte Wortfamilie erweitert die Auswahl, wenn Grapheme/Silben `t`, `a`, `s`, `e`, `tas`, `se` bekannt sind.
- Risiko: Zu frühe Erweiterung macht die Lehrkraftauswahl voller und kann den Kindmodus unruhiger machen.
- Kleinster sicherer Slice: Nur Daten-/Selector-Anbindung für `Tasse-Mini-Reise`, keine neuen UI-Muster.
- Akzeptanzkriterien: Tasse erscheint nur bei passenden bekannten Einheiten; fünf ruhige Schritte bleiben Bild, Silbe, Wort, Satz, Mini-Geschichte; Mama/Sofa bleiben unverändert; Tests/Build grün.

## Priorität 2: Bildhafte Symbolanker für Reise-Karten

- Nutzen: Lehrkräfte erfassen Karten schneller; Kinder können später über bekannte Wortanker wiedererkennen.
- Risiko: Externe oder geschützte Bildsysteme dürfen nicht stillschweigend genutzt werden.
- Kleinster sicherer Slice: Lokale rein typografische/HTML-CSS-Anker weiterentwickeln, z. B. große Wortkachel plus Form/Farbe, ohne Bilddateien.
- Akzeptanzkriterien: Keine externen Assets, keine Metacom-/Lizenzbehauptung; Mobile ohne horizontale Scrollbar; Wortanker bleibt textlich zugänglich.

## Priorität 3: Adaptive Wiederholung ohne Speicherung

- Nutzen: Nach einem Durchlauf kann die Lehrkraft sofort eine ruhige Wiederholung wählen, ohne Daten über das Kind zu speichern.
- Risiko: Adaptive Logik kann schnell wie Bewertung wirken.
- Kleinster sicherer Slice: Nur sitzungsinterne Option „Nochmal mit mehr Hilfe“ oder „Nochmal kürzer“, ohne localStorage/sessionStorage.
- Akzeptanzkriterien: Keine Punkte, Timer, Noten, Ranking oder Diagnosewörter; Zustand verschwindet beim Neuladen; Kind sieht nur unterstützende Sprache.

## Priorität 4: Lokale Lehrkraftnotiz statt Diagnostik-Schnittstelle

- Nutzen: Sichtbare Beobachtungen können direkt im Unterricht festgehalten und bei Bedarf anonym auf Papier übertragen werden.
- Risiko: Speicherung personenbezogener Daten oder diagnostische Zuschreibung.
- Kleinster sicherer Slice: Nicht-speicherndes Textfeld mit Datenschutzhinweis und Beispiel in anonymer Beobachtungssprache.
- Akzeptanzkriterien: Keine automatische Speicherung, kein Export; Hinweis „nicht gespeichert“ sichtbar; keine Namen/Diagnosen/Skalen 1-10.

## Priorität 5: Mini-Geschichten systematischer ausbauen

- Nutzen: Lesereisen werden narrativer, ohne weitere Aufgabentypen zu erfinden.
- Risiko: Zu lange Texte überfordern basal oder unterstützend arbeitende Kinder.
- Kleinster sicherer Slice: Pro Ankerwort eine 2-3-Zeilen-Geschichte mit wiederholter Zielstruktur und optionalem Satzanker.
- Akzeptanzkriterien: Leichte, konkrete Sprache; maximal kurze Zeilen; bestehende fünf Schritte bleiben erhalten; kein neuer Pflichtschritt.

## Priorität 6: Hilfen sichtbar steuerbar machen

- Nutzen: Silben, Gebärdenhinweis und leichte Sprache können als Unterrichtshilfen klarer eingesetzt werden.
- Risiko: Gebärdenhinweise dürfen nicht als normierte Fachquelle behauptet werden, wenn keine geprüfte Quelle eingebunden ist.
- Kleinster sicherer Slice: Lokale Hinweiszeile „Gebärde/Handzeichen zeigen, wenn im Team vereinbart“ plus Silben-/Leichte-Sprache-Option im Lehrkraftbereich.
- Akzeptanzkriterien: Keine Fachsystem-Behauptung; Hilfen sind optional; Kindmodus bleibt ruhig; Tests prüfen druckfreie Sprache.

## Priorität 7: Review-Modus für Lehrkraft

- Nutzen: Lehrkraft kann vor dem Start prüfen, ob die Reise heute wirklich passt.
- Risiko: Ein Review-Dashboard kann zu viel Verwaltung und Drucksprache erzeugen.
- Kleinster sicherer Slice: Eine kompakte Vorschaukarte mit „passt heute, weil …“ und „kleinster nächster Schritt“.
- Akzeptanzkriterien: Nur im Lehrkraftbereich; kein Score, keine Ampel, keine Diagnose; Startbutton bleibt eindeutig.

## Priorität 8: Export/Print nur lokal und später

- Nutzen: Teamvorbereitung oder Materialablage wird einfacher, wenn eine sichere Druckansicht existiert.
- Risiko: Export kann sensible Notizen oder Schülerbezug erzeugen.
- Kleinster sicherer Slice: Später nur eine statische Druckansicht der generischen Reise ohne Notizfelder und ohne Personendaten.
- Akzeptanzkriterien: Keine Speicherung, kein Upload, keine echten Namen; Druckinhalt ist generisch; menschliche Prüfung vor Nutzung.
