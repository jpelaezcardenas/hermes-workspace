## Target
- Exercise/flow: `Mehr, fertig, nochmal` / UK-Karten-Spielraum im aktuellen React-Build.
- Learner action: Eine kleine Karten-/Tablett-Runde über die großen UK-Karten `mehr`, `fertig` und optional `nochmal` steuern; Hilfe, weniger Auswahl, Vormachen, Pause oder Nochmal nutzen.
- Teacher observation: Beobachtbar sind aktive Wahlform, benötigte Hilfe, Umgang mit reduzierter Auswahl, Reaktion auf Vormachen und ein nächster Transfer in eine echte Materialroutine.
- Warum dieses Ziel: Der Flow ist ein child-facing Spielraum mit GE-Spielraum-Qualität, war in den letzten Berichten als konkreter UK-Slice sichtbar und ist pädagogisch zentral, weil er Teilhabe/Kommunikation statt reines Klicken prüft.
- Browser/build checked: Ja. `npm run build` lief am 2026-06-11 erfolgreich. `dist/` wurde lokal über `python3 -m http.server 8771 -d dist` geöffnet und im Browser unter `http://127.0.0.1:8771/` geprüft. Normaler Browserklick und ergänzend DOM-Click wurden genutzt; DOM-Click nur zur Verifikation einer verzögert sichtbar werdenden React-Zustandsänderung. Schmaler Tablet-/Mobile-Viewport: nicht geprueft.

## Basal Learner
- Works: Der Start über die Top-Navigation `UK-Karten` führt direkt in einen ruhigen Spielraum ohne Punkte, Timer oder Ranking. Auf Niveau A ist die Auswahl zunächst auf zwei große Karten reduziert: `mehr` und `fertig`. Das passt gut für Blick, Zeigen, gemeinsames Antippen oder Talker-/Symbolbegleitung. Die Rückmeldung bleibt ruhig: `Die Karten sind bereit. Wähle in Ruhe.`
- Breaks: Für basal Lernende ist die Kopfzeile noch textlastig: `Lege eine Karte. Wähle dann mehr oder fertig.` Der eigentliche Handlungsanfang ist visuell nicht ganz so eindeutig wie bei realem Material, weil das Tablett digitale Zahlenkarten zeigt und die UK-Karten darunter mit Text/Icons arbeiten. `Zeig es mir` ist hilfreich, aber erst nach Aktivierung sichtbar als erweiterte Drei-Karten-Demonstration.
- Needed Help: Vor dem Antippen eine echte Karte oder ein reales Objekt zeigen; nur eine Handlungsroutine wählen, z. B. Karte legen → `mehr` oder `fertig`; dann gemeinsam antippen. Bei Belastung `Pause` nutzen und die digitale Runde mit realem Material spiegeln.

## Supported Learner
- Works: Niveau B startet mit drei klaren Wahlkarten und sichtbarer Veränderung auf dem Tablett. Browserprüfung: Klick auf `mehr` erhöhte die Kartenanzahl von 2 auf 3 und erzeugte die Rückmeldung `Du hast mehr gewählt. Ein neues Teil kommt dazu.` `Weniger Karten` reduzierte nach React-Zustandsprüfung die Auswahl auf `mehr` und `fertig` und gab die Rückmeldung `Weniger Karten sind bereit. Du kannst in Ruhe wählen.`
- Breaks: Die Unterstützungsleiste enthält fünf gleichwertig wirkende Buttons (`Hilfe`, `Weniger Karten`, `Zeig es mir`, `Pause`, `Nochmal`). Für unterstützte Lernende kann das als zweite Aufgabenebene wirken: Soll ich jetzt eine UK-Karte wählen oder eine Hilfe-Aktion? Außerdem ist `Karte weg`/`Karte legen` neben den UK-Karten fachlich sinnvoll, aber kann den Fokus von Kommunikation auf Mengen-/Materialsteuerung verschieben.
- Needed Help: Die Lehrkraft sollte vorab entscheiden, ob in dieser Runde die UK-Wahl im Vordergrund steht. Für viele Kinder wäre ein klarer Standardmodus hilfreich: nur Tablett + zwei oder drei UK-Karten; Hilfeaktionen visuell niedriger priorisiert oder als Lehrkraft-/Assistenzbereich.

## Symbolic / Extended Learner
- Works: Niveau C bietet eine einfache Erweiterung: Die Runde kann wachsen, enden oder neu starten. Das bleibt spielerisch und wird nicht zum Arbeitsblatt. `nochmal` funktioniert als echte Wiederholungsidee, nicht nur als Reset-Knopf. Die Lehrkraftspur nennt Transferoptionen wie Materialroutine, kurze Begründung mit Geste/Symbol/Sprache oder Rückstufung auf Niveau B.
- Breaks: Für stärkere Lernende fehlt noch eine deutliche alltagsnahe Entscheidungssituation im Spielraum selbst. Der Flow sagt zwar `Was brauchst du?`, aber der Kontext ist noch abstrakt: digitale Karten auf einem Tablett. Ohne reale Einbettung kann `mehr/fertig/nochmal` mechanisch statt kommunikativ werden.
- Needed Help: Eine kleine Kontextkarte oder Mini-Situation, z. B. `Wir bauen weiter`, `Snack ist fertig`, `Runde nochmal`, könnte die symbolische Entscheidung stärker an echte Kommunikation binden, ohne neue Spiellogik zu bauen.

## Teacher In Real Class
- Startability: Hoch. Der Flow ist vom Start aus mit einem Klick erreichbar (`UK-Karten`) und braucht keine Anmeldung, keine echten Namen und keine Speicherung. Das passt für eine kurze Lernwerkstatt-Station oder eine 1:1-/Kleingruppenroutine.
- Observable evidence: Sichtbar sind gewähltes Niveau, Anzahl der digitalen Karten, Wahl von `mehr/fertig/nochmal`, Nutzung von `Weniger Karten`, Reaktion auf `Zeig es mir`, Pause/Nochmal und die aktuelle Lernspur im Lehrkraft-Hinweis. Der Lehrkraftbereich enthält sinnvolle Felder zu Hilfeform, Zugang, Beobachtungsfrage, Momentaufnahme 1–10 nur für Lehrkräfte und nächstem Schritt.
- Missing observation: Es wird nicht automatisch gespeichert; das ist datenschutzfreundlich, aber die Lehrkraft muss die relevante Beobachtung selbst knapp übertragen. Nicht geprüft wurde, ob der geöffnete Lehrkraft-Hinweis auf schmalem Tablet die Kindaktion stört. Ebenfalls nicht im echten Unterricht geprüft: ob Kinder die Symbole `+`, `OK`, `↻` ohne Modellierung verstehen.

## Works
- Kindgerechter UK-Spielraum ist vorhanden, nicht nur ein Formular.
- Student-facing: keine Punkte, kein Timer, kein Ranking, keine rote Fehlerlogik.
- Große Wahlkarten `mehr`, `fertig`, `nochmal` und ruhige Rückmeldungen sind vorhanden.
- Niveau A/B/C ermöglicht basal, unterstützt und erweitert.
- `mehr` veränderte im Browser die Tablettmenge sichtbar.
- `Weniger Karten` reduzierte die Auswahl nach verifizierter Zustandsaktualisierung auf zwei Karten.
- `Zeig es mir` machte im Niveau A die dritte Karte sichtbar und gab modellierende Rückmeldung.
- Lehrkraft-Hinweis ist getrennt, nicht dominant im Startzustand, anonym und mit Datenschutzwarnung versehen.
- Buildstatus: grün mit regulärem `npm run build` am 2026-06-11.

## Breaks
- Die erste Orientierung bleibt für basal Lernende noch recht sprachlich: `Was brauchst du?`, `Lege eine Karte`, `mehr/fertig/nochmal` brauchen Modellierung.
- Hilfe-/Supportleiste und eigentliche UK-Karten konkurrieren visuell etwas miteinander.
- Der digitale Tablettkontext ist noch abstrakt; eine alltagsnahe Mini-Situation fehlt.
- Der normale Browserklick auf `Weniger Karten` wirkte im ersten Snapshot nicht sofort verändert; nach DOM-/Snapshot-Verifikation war die Zustandsänderung sichtbar. Das sollte nicht als Funktionsfehler gewertet werden, aber als Hinweis für weitere Browserprüfung.
- Schmaler Tablet-/Mobile-Viewport wurde nicht geprueft.

## Needed Help
- Reales Material oder echte Symbolkarten vor dem digitalen Start zeigen.
- Niveau A nutzen, wenn die Wahl noch basal/unterstützt ist.
- Wahlmöglichkeiten kurz halten: zuerst `mehr`/`fertig`, `nochmal` erst nach Modellierung.
- Assistenz sollte die Supportbuttons bedienen, wenn das Kind sonst zwischen Hilfeknopf und UK-Karte unsicher wird.
- Transfer in eine echte Routine vorbereiten: Materialdienst, Snack, Bauen, Aufräumen oder Spielrunde.

## Verdict
- Status: small fix
- Biggest blocker: Nicht die technische Funktion, sondern die noch zu abstrakte kommunikative Situation. Der Flow zeigt UK-Wörter, aber noch nicht stark genug, wofür das Kind sie in einer echten Situation benutzt.
- Smallest useful fix: Eine einzige kleine Kontextzeile/Kontextkarte in den UK-Spielraum einbauen, die die Runde als reale Wahlhandlung rahmt, ohne neue Features oder Speicherung.

## Next Micro-Prompt
Verbessere ausschließlich den UK-Spielraum `Mehr, fertig, nochmal`: Ergänze oberhalb der UK-Karten eine kleine alltagsnahe Kontextkarte mit 3 umschaltbaren Situationen (`bauen`, `Snack`, `Spielrunde`) und je einem kurzen Satz in einfacher Sprache, z. B. `Wir bauen weiter. Brauchst du mehr, fertig oder nochmal?`. Keine neue Datenlogik, keine Speicherung, keine neuen Dependencies. Akzeptanz: Niveau A bleibt mit zwei Karten ruhig, Niveau B/C behalten drei Karten, Supportbuttons bleiben sekundär, Browserpfad Start → UK-Karten → Situation sehen → `mehr` wählen → sichtbare Rückmeldung funktioniert, keine Punkte/Timer/Ranking.

## Befehlskarte
- Chris 5-Minuten-Befehl: Öffne den UK-Spielraum und prüfe nur, ob die Wörter `mehr/fertig/nochmal` für dich wie echte Kommunikation wirken oder noch wie Buttons ohne Situation.
- Hermes-Pruefbefehl: Nach Umsetzung des Micro-Prompts Browserpfad `Start → UK-Karten → Situation wählen/sehen → mehr/fertig/nochmal` testen und prüfen, ob Supportbuttons die Kindaktion nicht dominieren.
- Stop-/Park-Befehl: Wenn dafür ein großer Umbau der App-Navigation, Speicherung oder neue Symbolbibliotheken nötig würden, stoppen und nur als Konzept parken.
- Nicht-ausfuehren: Keine neuen Spiele, keine echte Schülerdaten-Erfassung, keine Veröffentlichung, keine Commits/Pushes, keine Diagnosen oder Leistungsbewertungen.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: UK-Spielraum mit einer kleinen alltagsnahen Kontextkarte rahmen.
- CHRIS_ENTSCHEIDET: Ob die Kontextvarianten `bauen`, `Snack`, `Spielrunde` pädagogisch passen oder durch andere Klassenroutinen ersetzt werden sollen.
- BEOBACHTEN: Ob `Weniger Karten`/Supportleiste im echten Einsatz die UK-Wahl unterstützt oder visuell konkurriert.
- SPAETER: Schmalen Tablet-/Mobile-Viewport für den geöffneten Lehrkraft-Hinweis prüfen.
- BLOCKIERT: nicht geprueft: echte Unterrichtssituation und schmaler Viewport.
- NICHT_TUN: Keine neue UK-Komplett-App und keine Symbolbibliothek bauen, bevor dieser eine Flow situativ klarer ist.
- Naechste kleinste Aktion: Kontextkarte als kleinen UI-Slice planen oder umsetzen lassen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-06-11.md
