# Alpha 27A – GE Classroom Symbol Review

## classroom verdict

Der aktuelle Leseweg ist grundsätzlich gut erkennbar: Bild -> Silbe -> Wort -> Satz -> Story ist als Lernlogik vorhanden und pädagogisch passend für den GE-Kontext. Für den Kinderpfad wirkt die Struktur aber noch an manchen Stellen eher technisch als wirklich sofort verstehbar; besonders der Wechsel zwischen Aufgaben, Storys, Hilfen und Tagesweg braucht noch klarere, kindnahe Orientierung.

Die unteren Lesestufen sind brauchbar angelegt, aber die visuelle Anziehung und die sofortige Erkennbarkeit könnten noch stärker werden. Der aktuelle Symbolersatz ist als lokale, rechtssichere Übergangslösung akzeptabel, wirkt aber stellenweise noch wie ein Platzhalter und nicht wie eine echte, didaktisch ausgereifte Bildsprache.

## child-orientation problems

1. Der Pfad ist als Logik vorhanden, aber nicht überall als kurzer, kindlicher Weg spürbar.
   - Für Kinder ist wichtig: „Was mache ich jetzt?“ statt „In welchem System bin ich?“
   - Die App hat zwar klare Buttons, aber noch zu wenig einheitliche, wiedererkennbare Wegmarken.

2. Der Übergang zwischen Wortüben und Story lesen ist noch zu wenig rhythmisiert.
   - Bild/Wort/Silbe/Satz/Story sind fachlich nachvollziehbar, aber visuell noch nicht stark genug als Reihenfolge markiert.

3. Einige Bezeichnungen sind für Kinder noch etwas abstrakt.
   - „Tagesweg“ ist verständlich, aber nicht überall sofort selbsterklärend.
   - „Story lesen“ ist gut, könnte aber mit einem einfacheren Begleitlabel noch sicherer werden.

4. Orientierung über Wiederholung ist vorhanden, aber noch ausbaufähig.
   - Die App bietet schon Reduktion, Pilotmodus und Hilfen.
   - Für GE-Praxis wäre noch mehr Konstanz in Farbe, Symbol, Wortlänge und Kartenstruktur sinnvoll.

## symbol/METACOM status

- Echte METACOM-Bilder sind nach der vorliegenden Codebasis nicht vorhanden.
- Die Bild- und Symbolhilfe arbeitet aktuell mit lokalen Unicode-/Form-Cues und Textplatzhaltern.
- In `src/lesewerk-content.mjs` werden Symbolhilfen über `makeSymbolHelp(...)` erzeugt und ausdrücklich als `local-symbol-card` geführt.
- Die Storys tragen Hinweise wie `Bildplatzhalter: ...`; auch das ist klar als Platzhalterlösung erkennbar.

Bewertung:
- Als Übergangslösung: pädagogisch okay und datensicher.
- Als dauerhafte Symbolsprache: noch zu schmal und zu abstrakt.
- Als echte UK-/Symbolunterstützung: noch nicht ausreichend, weil die Darstellung eher Hinweischarakter als Bildqualität hat.

## recommended Leseleiter flow

Für den Kinderpfad würde ich die Reihenfolge so klarer machen:

1. Bild anschauen
2. Wort finden
3. Silben sehen / hören
4. Wort bauen
5. Satz lesen
6. Kleine Story lesen

Praktisch wichtig:
- Die Stufen sollten nicht nur fachlich, sondern auch optisch klar getrennt sein.
- Jede Stufe braucht ein sehr kurzes, immer gleiches Kind-Label.
- Die Rückmeldung sollte nicht nach Bewertung klingen, sondern nach Wegmarke: „weiter“, „noch einmal“, „mit Hilfe“, „kleiner Schritt“.

Didaktisch sinnvoll wäre:
- Bild als Einstieg bei hoher Unterstützung
- dann Silbe/Wort als stabile Mitte
- dann Satz als kurze Erweiterung
- Story erst, wenn der Sinn im kurzen Zusammenhang tragfähig ist

## writing bridge proposal

Schreiben sollte nicht als zusätzlicher Druck erscheinen, sondern als kleine Handlungsbrücke zum Lesen.

Empfohlene Reihenfolge:

1. Nachspuren
   - dicke Linien
   - einzelne Buchstaben oder Silben
   - sehr kurze Einheiten

2. Auswählen
   - richtiges Wort, richtiger Anfangsbuchstabe, richtige Silbe
   - zwei bis drei Optionen

3. Silben bauen
   - Silbenkarten legen
   - Silben zusammensetzen
   - farblich ruhig unterstützt

4. Wort bauen
   - Buchstaben oder Silben in richtiger Reihenfolge legen
   - nur kurze Wörter

5. Mini-Satz ergänzen
   - Lückensatz mit 1 Wort
   - kein freies Schreiben unter Zeit- oder Druckgefühl

Wichtig:
- Schreiben eher als „mitmachen“ statt „aufschreiben“ denken.
- Für den GE-Kontext sind Greifen, Legen, Zeigen, Wählen und Nachspuren oft tragfähiger als sofort freies Schreiben.

## top 10 highest-impact improvements

1. Einheitliche Wegsprache für den Kinderpfad.
   - Immer dieselben kurzen Begriffe für Bild, Wort, Silbe, Satz, Story.

2. Stärkere visuelle Staffelung der Stufen.
   - Jede Stufe braucht eine klare Farb- oder Formlogik.

3. Bessere Symbolqualität für die häufigsten Wörter.
   - Besonders Ball, Tasse, Brot, Hut, Fenster, Licht, Blume, Buch, Schule, Tasche.

4. Platzhalter deutlich stärker als Übergang markieren.
   - Damit Kinder nicht den Eindruck einer echten Bildbibliothek bekommen.

5. Mehr ruhige Wiedererkennung statt Vielfalt um der Vielfalt willen.
   - Lieber wenige starke, gut erkennbare Symbole als viele mittelgute.

6. Kinderlabels noch kürzer machen.
   - Z. B. „Bild“, „Wort“, „Silbe“, „Satz“, „Geschichte“ statt längerer Formulierungen.

7. Storys mit klarer Bildstütze versehen.
   - Jede Story braucht ein sofort lesbares Symbolmotiv.

8. Schreibbrücke sichtbar machen.
   - „Nachspuren“, „legen“, „bauen“, „wählen“ als kleine Folge.

9. Lehrer- und Kinderansicht konsequent trennen.
   - Komplexe Begriffe, Beobachtungslogik und Profilhinweise nur für Lehrkräfte.

10. Für den Leseweg mehr Orientierung über Wiederholung.
   - Gleiche Kartenformen, gleiche Buttonpositionen, gleiche Reihenfolge.

## exact next implementation suggestions for Alpha 27B

1. Einführen einer klaren Kinder-Wegleiste.
   - Feste Stufenanzeige: Bild -> Wort -> Silbe -> Satz -> Story.
   - Kurze, große Labels.

2. Symbolkarten nicht nur als Textplatzhalter, sondern als visuell klarere lokale Übergangskarten.
   - Ruhige Form, deutlicher Rahmen, ggf. stärkere Farb-/Formcodierung.

3. Die wichtigsten Aufgaben mit expliziten Symbolprioritäten markieren.
   - Besonders die häufigen Alltagswörter und Story-Fokuswörter.

4. Schreibstufen als eigene Mini-Schritte ergänzen.
   - Nachspuren, auswählen, Silben legen, Wort bauen.

5. Ein kindnahes Mini-Glossar für Wegbegriffe einführen.
   - Nur kurze Wörter, keine Fachsprache.

6. Lehrkraftansicht um Symbolstatus ergänzen.
   - Was ist echter Bildinhalt, was ist Platzhalter, was braucht später lizenzierte Assets.

7. Für die spätere Asset-Nutzung einen sicheren Lizenz-Workflow vorbereiten.
   - Nur geprüfte, dokumentierte, lokal eingebundene Assets.
   - Keine ungeklärten Downloads, keine stillen Fremdquellen.

8. Story-Set so erweitern, dass jede Story ein starkes, sofort verständliches Motiv hat.
   - Ein Fokuswort, ein Bildkern, eine klare Frage.

9. Reduktion als Standardoption sichtbarer machen.
   - Wenn Auswahl zu groß wird, muss der kleine Weg sofort auffindbar sein.

10. Kindertexte sprachlich vereinfachen.
   - Mehr: „Lies mit Bild.“ / „Lies das Wort.“ / „Baue die Silbe.“ / „Lies die Geschichte.“
   - Weniger: längere, erklärende Sätze im Kinderpfad.

## legally safe future licensed asset workflow needs

Für spätere echte Symbol-/Bildassets braucht es einen sauberen, dokumentierten Prozess:

- Lizenzstatus vor Einbau prüfen und schriftlich festhalten
- Quellen eindeutig benennen
- lokale Speicherung statt externer Laufzeitladewege
- klare Trennung von Lizenzdaten und Unterrichtsdaten
- keine Vermischung mit realen Schülerinformationen
- Ersatzstrategie, falls Assets nicht verfügbar sind
- fachliche Freigabe, bevor die Bibliothek produktiv genutzt wird

## summary judgement

Didaktisch ist die Richtung gut und GE-passend. Der Hauptbedarf liegt jetzt nicht im Grundkonzept, sondern in der besseren kindlichen Orientierung, in stärkerer visueller Klarheit und in einer saubereren Symbolsprache. Für Alpha 27B würde ich deshalb weniger neue Inhalte, sondern vor allem klarere Wegmarken, bessere Platzhalter-Qualität und eine einfache Schreibbrücke priorisieren.
