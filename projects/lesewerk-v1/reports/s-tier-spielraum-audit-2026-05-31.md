# S-Tier Spielraum Audit - 2026-05-31

## Auftrag
Audit-only. Keine Umsetzung, keine Codeaenderung. Ziel: die aktuellen Bereiche auf S-Tier-Luecken im App-Feeling fuer GE-Schueler pruefen und die kleinsten sicheren naechsten UI-Slices benennen.

## Gepruefte Quellen
- `reports/s-tier-all-areas-execute-goal-2026-05-31.md`
- `reports/s-tier-all-areas-ceo-stabilization-2026-05-31.md`
- aktuelle App-Sicht im Browser auf `http://127.0.0.1:5174/`
- relevante Stellen in `src/App.tsx`

## Kurzfazit
Der Einstieg ist schon klarer als ein klassisches Dashboard: Der Kinderpfad startet in einen eigenen Spielraum, die Lese-Mission ist vorhanden und der Lehrkraftbereich trennt sich sichtbar ab. Trotzdem ist das App-Feeling noch nicht durchgehend S-Tier, weil an mehreren Stellen zu viel Orientierungstext, zu viel Strukturaufzaehlung und noch zu wenig unmittelbare Kinderhandlung sichtbar sind.

Die groesste Luecke ist nicht Funktion, sondern Wahrnehmung: Das Kind sieht zwar Ziele und Hilfen, aber nicht ueberall sofort eine grosse, einfache Handlung mit maximal wenig Text und viel Spielraum.

## Qualitaetsmatrix

| Bereich | Aktueller Stand | Risiko | S-Tier-Luecke | Kleinster sicherer naechster UI-Slice |
|---|---|---|---|---|
| Startseite | Sehr klarer Einstieg mit `Kinderpfad` / `Lehrkraft` und anonymen Profilen. Allerdings noch klassischer Begruessungsbildschirm mit viel Auswahl vor dem Spielraum. | Zu viel Startlogik vor dem eigentlichen Lernen; Kind muss erst verstehen, welche Ebene fuehrt wohin. | Noch eher Portal als Spielraum. Das erste Handeln ist nicht gross genug und nicht sofort die Lernhandlung selbst. | Eine gross sichtbare Kind-Startkarte mit einem einzigen Primarpa d und nur 1 Nebenoption; Lehrkraft klar getrennt und kleiner. |
| Mein Tag | Der Tagespfad ist bereits relativ stark: eigener Vollbereich, klare Schrittfolge, grosse Startaktion, Fokusrahmen, Ruhezusatz. | Der obere Bereich erklaert noch viel; die Leiste mit 6 Schritten und die Orientierungstexte machen das Setting eher zu einer Lernstrecke als zu einem Spielraum. | Kind sieht den Ablauf, aber noch zu wenig die naechste konkrete Handlung in einem einzigen Blick. | Den oberen Spielraum auf eine Hero-Karte mit groesserem Handlungsbutton und einer reduzierten 1-Zeilen-Orientierung verdichten. |
| Meine Reisen | Als Einstieg vorhanden, aber in der aktuellen Sicht nicht als eigenstaendiger, praechtiger Kindermodus sichtbar geprueft. Der Code zeigt zwar Startlogik fuer Mini-Reisen und Familienreisen, aber die Erlebnisqualitaet ist im Audit nicht gleich stark wie beim Tagespfad. | Gefahr, dass Reisen funktional vorhanden sind, aber visuell noch zu sehr wie Varianten eines Formulars wirken. | Es fehlt ein klarer, spielraumartiger Reise-Start mit einem sofort sichtbaren Ziel, einer grossen Karte und weniger Wegtext. | Eine Reise-Startkarte mit nur einem Reiseanker, einer grossen visuellen Vorschau und einer einzigen Starthandlung. |
| Lese-Mission | Im Code klar eingebunden: Start aus Materialkorb, drei ausgewaehlte Woerter, eigene FocusGameShell, ruhige Mission-Formulierung. | Textliche Erklaerung und Mission-Setup koennen noch zu viel Kopf statt Handlung erzeugen; es droht ein Mix aus Mission und Werkzeug. | Mission ist noch nicht durchgaengig als Spielhandlung inszeniert; das Kind soll schneller sehen: Karte, Aufgabe, weiter. | Mission-Topbereich auf 1 Ziel, 1 grosse Karte, 1 Aktion pro Schritt reduzieren; Lehrkraftinfos aus dem Kindblick entfernen. |
| Lehrkraft | Sichtbar abgetrennter Bereich mit Planung, Materialpaketen, Mini-Reisen-Bereitschaft und Erklaerungen. Fachlich reich, aber scanbar genug. | Zu viel Lehrkrafttext kann den Kontrast zum Kindmodus verwischen, wenn zu viel davon im selben View zu sehen ist. | Lehrkraft ist noch zu nah an der Kindlogik und faehrt zu viele Begruendungen gleichzeitig auf. | Lehrkraft als eigenes, noch klarer abgesetztes Analyse-/Vorbereitungsboard mit zusammenklappbaren Details und klaren Handlungsbloecken. |
| Materialkorb | Im Code sehr stark vorbereitet: lokale Vorbereitung, Materialpakete, Presets, Mini-Assistent, klare Trennung von Lehrkraft und Kind. | Der Bereich kann schnell technisch oder adminlastig wirken, wenn zu viele Gating-/Filterbegriffe sichtbar sind. | Der Materialkorb ist inhaltlich stark, aber noch nicht durchgehend wie eine kindliche Schatzkiste inszeniert. | Eine reduzierte Materialkorb-Ansicht mit 3 grossen Karten: waehlen, pruefen, starten. |
| Mini-Reisen | Lehrkraftsicht vorhanden: Bereitschaft, Gruende, naechster Schritt, Objekt-Moment und Auswahl passender Reisen. Das wirkt strukturiert und nützlich. | Zu viel Kategorisierung und Begruendung kann das Kind aus dem Flow holen, wenn davon etwas in den Kindmodus durchsickert. | Die Reise wirkt noch eher wie ein Lehrkraft-Gating als wie ein eigener kleiner Abenteuermodus. | Fuer den Kindmodus pro Mini-Reise nur einen Anker, ein Bild und eine grosse Startaktion zeigen; die Begruendung bleibt im Lehrkraftbereich. |

## Konkrete S-Tier-Luecken nach Prioritaet

1. Zu viel Text vor der Handlung
   - Besonders bei Startseite, Mein Tag und Reise-/Missionseinstieg.
   - Das Kind soll nicht erst den Modus verstehen muessen, sondern sofort etwas tun koennen.

2. Kind- und Lehrkraftsicht noch nicht hart genug getrennt
   - Lehrkraftlogik ist schon da, aber an einigen Stellen noch zu nah am Kindmodus.
   - S-Tier braucht: Kind = Handlung, Lehrkraft = Planung/Begruendung.

3. Vollbild-/Spielraumgefühl noch nicht in allen Wegen gleich stark
   - Der Tagespfad ist am weitesten.
   - Mini-Reisen, Materialkorb und Missions-Einstiege muessen visuell und semantisch noch mehr wie echte Spielraeume wirken.

4. Zu viele Erklaerungsleisten statt einer grossen Kernaktion
   - Schrittleisten, Hilfetexte, Gatingtexte und Bereitschaftsbegruendungen sind fachlich sinnvoll, aber fuer GE-Schueler oft zu viel auf einmal.

## Kleinste sichere naechste UI-Slices

1. Startseite: eine grosse Kindskarte statt Portal-Charakter
   - Eine einzelne Hauptkarte fuer den Kindpfad.
   - Lehrkraftbereich kleiner und klar separiert.
   - Ziel: sofort erkennen, was das Kind als Erstes macht.

2. Mein Tag: Hero auf eine Kernhandlung reduzieren
   - Oben nur ein Satz, ein grosser Button, ein klares Bild.
   - Die 6er-Schrittlogik bleibt, aber nicht als dominanter Blickfang.

3. Lese-Mission: Mission als eine einzige klare Spielspur zeigen
   - Ein Ziel, eine Karte, ein naechster Schritt.
   - Weniger Missionssprache, mehr handlungsbezogene Oberflaeche.

4. Mini-Reisen: pro Anker eine groessere, ruhigere Reisekarte
   - Bild + Wort + Start.
   - Erklaerungen nur noch in Lehrkraftsicht.

5. Materialkorb: drei grosse Einstiege statt vieler Vorbereitungsbegriffe
   - Waehlen, pruefen, starten.
   - Weniger Filter-/Gating-Sprache im sichtbaren Erstblick.

## Bewertete Starke Punkte

- Der Kinderpfad ist bereits deutlich ruhiger als ein klassisches Web-Frontend.
- Die App arbeitet ohne Timer, Score und Ranking in den geprueften Bereichen.
- Die Lese-Mission und der Tagespfad haben eine echte Spielraum-Grundidee.
- Lehrkraftsicht und Kindsicht sind konzeptionell vorhanden und koennen weiter auseinandergezogen werden.

## Risiken

- Wenn jetzt zu gross umgebaut wird, geht die aktuelle Stabilitaet verloren.
- Die naechsten Verbesserungen sollten visuell und semantisch sein, nicht architektonisch.
- Ein zu starker Fokus auf Erklaerungen laesst das Erlebnis wieder wie eine Lernplattform wirken.

## Empfehlung

Naechster sinnvoller Schritt ist kein neuer grosser Funktionsblock, sondern eine Verdichtung der Startseite und des Haupt-Kinderblicks: weniger Portal, mehr sofort sichtbare Handlung. Danach erst die anderen Wege nachziehen.

## Abschluss

Audit-only abgeschlossen. Keine Codeaenderungen vorgenommen.
