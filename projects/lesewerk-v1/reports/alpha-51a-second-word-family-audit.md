# Alpha 51A – Zweite Wortfamilie Audit

## Kurzfazit
Die beste zweite kleine Wortfamilie ist aus meiner Sicht `Mama` (`Ma - ma`). Sie ist im bestehenden Content bereits als ruhige, profil-sichere CV-CV-Einheit angelegt, passt zum vorhandenen Guided-Reading-Pfad und ermöglicht den klarsten Transfer von Bild → Silbe → Wort → Satz, ohne neue Komplexität oder riskante Graphem-Sprünge.

## Best candidate
`Mama` / `Ma - ma`

Warum genau diese Familie:
- sehr bekannte, alltagsnahe Bedeutung
- einfache Silbenstruktur mit wiederholtem Muster
- bereits im Code verankert und damit gut anschlussfähig
- anschlussfähig für eine Mini-Geschichte: `Mama ist da.`
- gut geeignet für ruhige Wiederholung ohne Bewertungsdruck
- klarer Weg von Bild- und Wortkarte zu Silbe, Wort und kurzem Satz

## Rejected candidates und warum

### `Sofa`
- ebenfalls einfach, aber etwas weniger alltagszentriert als `Mama`
- hat zwar klare Silbenstruktur, wirkt in der frühen Leselogik etwas weniger unmittelbar
- als zweiter Slice nach `Tasse` etwas weniger stark auf Beziehung/Alltagsbedeutung fokussiert

### `Lama`
- formal passend und bildstark
- aber semantisch weniger alltagsnah für den Kerngebrauch in der GE-Lernwerkstatt
- Gefahr, dass das Wort eher als niedliches Einzelwort wirkt statt als stabiler Anschlusswortschatz

### `Limo`
- gut lesbar, aber alltagsbezogen etwas spezieller
- geringere Anschlussstärke an die bereits vorhandene Mama-Story und den Anfangspfad

### `Haus` / `Maus`
- als einzelne Wörter stark
- als zweite Wortfamilie nach `Tasse` eher weniger ruhig als `Mama`, weil sie in der frühen Pfadlogik schneller in neue Kontraste und Storyvarianten driften könnten

### `Brot`
- alltagsnah und gut bildbar
- im aktuellen Pfad aber weniger eng mit der vorhandenen Satz- und Wiederholungslogik verbunden als `Mama`

## Exakter tiny 51B Content Slice
Ich würde für Alpha 51B einen sehr kleinen `Mama`-Slice bauen, mit vier Schritten:

1. Bild → Wort
   - Aufgabe: `Zeige Mama.`
   - Material: Bildkarte / Symbolkarte / Wortkarte
   - Ziel: sichere Bedeutungszuordnung

2. Silbe
   - Aufgabe: `Lies: Ma - ma.`
   - Ziel: Silbenwiederholung und ruhiges Mitsprechen

3. Wort
   - Aufgabe: `Lies Mama. Zeige Mama.`
   - Ziel: Worterkennung mit reduzierter Auswahl

4. Satz / Mini-Geschichte
   - Aufgabe: `Mama ist da.`
   - Ziel: kurzer Satztransfer mit Bild-/Handlungsbezug

Optional als ganz kleiner Erweiterungsschritt:
- `Mama sitzt da.` oder `Mama winkt.`
- nur wenn die Lernenden die erste Satzform schon sicher tragen

## Profile-Safety considerations
- keine echten Lernerdaten
- keine Diagnose-, Score-, Timer- oder Rankinglogik
- keine automatische Pfadmutation
- keine externen oder geschützten Bildquellen
- nur lokale, einfache Bild-/Wort-/Silbenkarten
- Auswahl klein halten, am besten 1–2 Optionen
- Sprache ruhig, klar und nicht bewertend
- bei schwächeren Profilen `Mama` als ganze Einheit mit Bildstütze behandeln

## Acceptance criteria
Ein guter Alpha-51B-Slice erfüllt aus meiner Sicht diese Punkte:
- nur eine Wortfamilie
- höchstens 4 kleine Aufgaben
- Bild, Silbe, Wort und Satz sind sichtbar verbunden
- alle Inhalte bleiben lokal und einfach
- keine komplexen Distraktoren wie `sch`, `ch` oder neue Kontrastlogik
- keine Überladung des Kinderpfads
- für das GE-Setting gut beobachtbar und im Team verständlich

## Risiken
- Zu viel Kontext auf einmal kann aus einer ruhigen Wortfamilie schnell ein Mini-Dashboard machen.
- Wenn die Satzstufe zu früh kommt, kippt der Slice von Lesesicherheit in Arbeitsgedächtnisbelastung.
- Zu viele Zusatzoptionen würden die Klarheit der Wortfamilie schwächen.
- Wenn `Mama` zu stark emotional aufgeladen wird, muss die Sachebene trotzdem im Vordergrund bleiben.

## Empfehlung
Für Alpha 51B würde ich `Mama` als zweite kleine Wortfamilie nehmen und sie bewusst noch kleiner halten als ein „voller Ausbau“. Der Gewinn liegt nicht in Menge, sondern in der sauberen Kette vom Bild zur Silbe zum Wort zum Satz. Genau darin ist `Mama` derzeit der sicherste und fachlich rundeste Anschluss.
