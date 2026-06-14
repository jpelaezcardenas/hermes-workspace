# Lernwerkstatt Testpilot – 2026-05-21

## Target
- **Exercise/flow:** Gartenpost-Prototyp, `game-lab/gartenpost-prototyp.html`.
- **Auswahlgrund:** höchster aktueller Spielraum-Wert nach Prioritätsregel: aktiver Gartenpost-/GE-Spielraum-Prototyp aus dem Game Lab vom 2026-05-20.
- **Learner action:** Bildkarte antippen, passenden Briefkasten antippen, ruhige Rückmeldung wahrnehmen; bei Bedarf Hilfe/Fertig nutzen.
- **Teacher observation:** Level, Hilfegrad, Kommunikationsform und nächster kleiner Schritt im getrennten Beobachtungsdrawer prüfen; keine echten Namen, keine Diagnosen, keine Speicherung.
- **Browser/build checked:** Browser geprüft über lokalen Server `http://127.0.0.1:8766/game-lab/gartenpost-prototyp.html`. Eine vollständige Interaktion wurde getestet: Karte antippen → passenden Briefkasten antippen → Feedback „Die Karte ist angekommen.“ → nächste Karte erscheint. Hilfe wurde per DOM-Klick geprüft: „Weniger Briefkästen. Schau in Ruhe.“ reduziert auf zwei Ziele und markiert das Ziel. Beobachtungsdrawer wurde geöffnet. Kein `npm run build`, weil der getestete Zielausschnitt eine Standalone-HTML-Datei ist und keine React/Vite-Änderung gebaut wurde.

## Basal Learner
- **Works:** Der Startreiz ist groß und wahrnehmbar: zentrale Karte, großes Symbol, klare Handlungsaufforderung „Tippe die Karte an.“ Antippen reicht; kein Drag-only. „Fertig“ akzeptiert Pause/Abschluss ohne Druck. Keine Punkte, kein Timer, keine rote Fehlerlogik.
- **Breaks:** Die Karte zeigt zusätzlich ein geschriebenes Wort. Für basal Lernende ist das nicht schädlich, kann aber gegenüber Symbol/Objekt unnötige Aufmerksamkeit binden. Der Hilfe-Button löst zunächst eine reduzierte Auswahl aus, aber es gibt kein explizites Vormachen ohne zweiten Hilfeschritt; basal Lernende könnten nach dem ersten Hilfe-Feedback weiterhin nicht wissen, was zu tun ist.
- **Needed Help:** Optionaler Erwachsenenimpuls oder App-Demo: „Ich zeige es dir“ sollte als eigene, sofort erkennbare Hilfe neben „Weniger“ verfügbar sein. Reale Bildkarte/Gegenstand parallel wäre für Unterricht sinnvoll.

## Supported Learner
- **Works:** Level A/B/C ist angelegt; Level A bzw. Hilfe reduziert auf zwei Briefkästen. Touchziele sind groß, Abstände grundsätzlich gut. Feedback bleibt ruhig: „Du hast gewählt“, „Die Karte ist angekommen“, „Schau noch einmal. Ich zeige dir zwei Möglichkeiten.“
- **Breaks:** Hilfe ist nur ein einzelner Button mit wechselnder Funktion. Lernende oder Assistenzkräfte sehen vor dem Klick nicht, ob „Weniger“, „Zeig es mir“ oder „Pause“ kommt. Im getesteten Ablauf war der normale Browser-Klick auf „Hilfe“ nach einer laufenden Animation nicht zuverlässig erkennbar; per explizitem DOM-Klick funktionierte die Reduktion. Das spricht eher für Timing-/Busy-State-Friktion als für einen vollständigen Defekt.
- **Needed Help:** Drei sichtbare Hilfekacheln im geöffneten Hilfemodus: „Weniger“, „Zeig es mir“, „Pause“. Nach jeder Hilfe sollte die nächste Handlung visuell markiert werden, ohne viel Text.

## Symbolic / Extended Learner
- **Works:** Level C ist als vier Briefkästen angelegt; mehrere Karten nacheinander funktionieren. Wort + Symbol ermöglicht Benennen, Kategorienbildung und einfache Satzstarter wie „Ich bringe … zu …“. Die Aufgabe bleibt spielerisch und wird nicht zum Arbeitsblatt.
- **Breaks:** Die erweiterte Herausforderung ist im Kindermodus noch nicht als eigener ruhiger Auftrag sichtbar. Es gibt keine Satzstarter-Karte oder optionale Sprachhandlung, obwohl das Konzept diese Ebene vorsieht.
- **Needed challenge:** Eine kleine optionale Sprach-/UK-Leiste nach erfolgreicher Zustellung: „Ich bringe ___ zu ___.“ / „nochmal“ / „fertig“ – ohne Bewertung und ohne Schreibpflicht.

## Teacher In Real Class
- **Startability:** Hoch für einen Einzelprototyp: lokale HTML öffnen, keine Anmeldung, keine Daten nötig. Der Spielraum ist direkt startbar.
- **Observable evidence:** Sichtbar beobachtbar sind: Karte wahrgenommen/angetippt, Ziel gewählt, Hilfe genutzt, Pause/Fertig gezeigt. Der Drawer bietet Hilfegrad, Kommunikationsform, Level und nächsten Schritt. 1–10 liegt nur im Lehrkraftbereich.
- **Missing observation:** Der Drawer ist als Overlay sichtbar stark und überdeckt bei geöffnetem Zustand Spielbereich/„Fertig“-Button. Für reale Beobachtung ist das riskant: Lehrkraft kann dokumentieren, aber Kinderspiel wird dabei gestört. Außerdem werden Hilfen nicht als Beobachtungsereignisse gesammelt, sondern nur situativ im Text „nächster Schritt“ gespiegelt; das ist für eine schnelle Unterrichtsnotiz noch dünn.

## Works
- Gartenpost fühlt sich stärker wie ein eigener Spielraum an als wie ein Formular.
- Zentrale Handlung ist klar: Karte antippen, Briefkasten antippen.
- Touchziele sind groß; Antippen funktioniert ohne Drag.
- Rückmeldungen sind wertschätzend und ohne Leistungsdruck.
- Hilfe reduziert Auswahl; falsche Zuordnung beschämt nicht.
- Datenschutzgrenzen sind sichtbar benannt: keine echten Namen, keine Diagnose, keine Speicherung.
- Der Beobachtungsbereich trennt Lehrkraftskala vom Kindermodus.

## Breaks
- Beobachtungsdrawer überdeckt bei geöffnetem Zustand den Spielbereich und teilweise den „Fertig“-Button; das ist der größte praktische Bruch.
- Hilfe ist zu verborgen/mehrdeutig: Ein Button mit wechselnder Funktion ist für GE-Unterstützung weniger klar als sichtbare Hilfekarten.
- Symbol-/Emoji-Platzhalter sind okay für Prototyp, aber nicht als lizenzierte Unterrichtssymbole zu verstehen.
- Erweiterter Zugang mit Satzstarter/UK-Handlung ist konzeptionell da, aber im Prototyp noch kaum sichtbar.
- Keine persistente oder exportierte Beobachtung; für diesen ersten Schnitt akzeptabel, aber die Lehrkraft muss Beobachtungen außerhalb des Prototyps sichern.

## Needed Help
- Sofort pädagogisch hilfreich: Hilfemodus mit drei großen, klaren Optionen **Weniger**, **Zeig es mir**, **Pause** statt nur einem zyklischen Hilfe-Button.
- Technisch/UX hilfreich: Beobachtungsdrawer darf im geöffneten Zustand keine Kind-Aktionen überdecken; entweder Spiel pausieren und Overlay klar als Lehrkraftmodus markieren oder Drawer als nicht störendes Panel unterhalb/seitlich mit reserviertem Platz führen.
- Für GE-Unterricht: optional echte Bildkarte/Gegenstand parallel; im Prototyp nur als Hinweis, nicht als Datenspeicherung.

## Verdict
- **Status:** small fix
- **Biggest blocker:** Der Beobachtungsdrawer stört den Kinderspielraum, wenn er geöffnet ist; außerdem ist Hilfe noch zu wenig explizit.
- **Smallest useful fix:** Im nächsten Slice nur den Hilfemodus konkretisieren und den geöffneten Lehrkraftdrawer so behandeln, dass keine Kind-Aktion verdeckt wird.

## Next Micro-Prompt
```text
/goal Verbessere nur den bestehenden Standalone-Prototyp `game-lab/gartenpost-prototyp.html` für Gartenpost.

Kontext: Lernwerkstatt GE, Klasse 1-4, lokaler Prototyp. Keine echten Schülerdaten, keine Cloud, kein Tracking, keine neuen Features außerhalb dieses kleinen Slice.

Aufgabe:
1. Ersetze den einzelnen wechselnden Hilfe-Button nicht komplett, sondern öffne beim Klick einen kleinen kindgerechten Hilfemodus mit genau drei großen Optionen: „Weniger“, „Zeig es mir“, „Pause“.
2. „Weniger“ reduziert auf zwei Briefkästen und markiert ruhig die nächste Handlung.
3. „Zeig es mir“ führt eine langsame Demo aus: Karte wird ausgewählt und zum passenden Briefkasten zugestellt.
4. „Pause“ zeigt „Fertig zeigen. Pause ist okay.“ und lässt „Nochmal“ und „Fertig“ sichtbar.
5. Passe den Beobachtungsdrawer so an, dass beim Öffnen keine Kind-Aktion überdeckt wird: entweder Spiel sichtbar pausieren und Overlay als Lehrkraftmodus nutzen oder die Spielaktion hinter dem Drawer deaktivieren; der „Fertig“-Button darf nicht halb verdeckt/interaktiv bleiben.

Akzeptanzkriterien:
- Lokalen Server öffnen und eine vollständige Runde testen: Karte antippen → Briefkasten antippen → Feedback → nächste Karte.
- Hilfe testen: „Weniger“, „Zeig es mir“, „Pause“ jeweils einmal.
- Beobachtung öffnen: keine halb verdeckten aktiven Kind-Buttons; 1-10 bleibt nur im Lehrkraftbereich.
- Schmale Breite prüfen: keine Textüberlappung, Touchziele bleiben groß.
- Keine Punkte, Timer, Ranking, rote Fehlerzustände, echten Namen oder Speicherung einbauen.
```

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Hilfemodus und Beobachtungsdrawer als kleinen Gartenpost-Fix gemäß Next Micro-Prompt verbessern.
- CHRIS_ENTSCHEIDET: Ob Gartenpost danach in die React-Lernwerkstatt integriert werden soll oder zunächst als Standalone-Spielraum weiter getestet wird.
- BEOBACHTEN: Ob die Hilfe im realen Unterricht eher „Weniger“ oder „Zeig es mir“ zuerst braucht; das nicht aus Simulation ableiten.
- SPAETER: Lizenzierte lokale Symbole statt Emoji-Platzhalter auswählen.
- BLOCKIERT: nichts
- NICHT_TUN: Nicht die ganze Spielbibliothek oder ein Teacher-Dashboard bauen, bevor dieser eine Hilfeflow stabil getestet ist.
- Naechste kleinste Aktion: Next Micro-Prompt als Codex-/Coder-Slice ausführen lassen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md
