# Alpha 21 - Leseprofil-Curriculum-Modell

Datum: 2026-05-18
Status: Spezifikation fuer spaetere Alphas, keine Implementierung

## Kurzfazit

LeseWerk sollte zukuenftig nicht nach Klassenstufe, Tempo oder Punktzahl steuern, sondern nach zwei ruhigen Lehrkraft-Entscheidungen:

1. Welche Grapheme, Silben und Wortmuster sind fuer dieses Kind im Moment sicher genug?
2. Auf welcher beobachtbaren Lesestufe arbeitet das Kind heute?

Daraus entsteht ein sicherer Aufgabenfilter: Eine Aufgabe ist nur erlaubt, wenn alle benoetigten Zeichen, Silbenmuster, Worttypen und Satzanforderungen innerhalb des aktuellen Profils liegen. Alles andere bleibt ausgeblendet oder wird als Lehrkraft-Warnung markiert. Das Profil ist keine Diagnose, sondern eine Unterrichtshilfe: "Heute sicher nutzbar", "mit Hilfe", "noch nicht fuer selbststaendige Leseaufgaben".

## A) Buchstaben- und Graphemprofil

### Grundprinzip

Das Profil beschreibt nicht, was ein Kind "kann" im diagnostischen Sinn. Es beschreibt, was LeseWerk fuer eine konkrete Aufgabe verwenden darf. Deshalb muss die Sprache lehrkraftnah, beobachtbar und reversibel bleiben.

Empfohlene Leitfrage fuer die Lehrkraft:

> Welche Zeichen und Muster duerfen heute in Aufgaben vorkommen, ohne das Kind zu ueberfordern?

### Zu trackende Einheiten

#### 1. Basis-Grapheme: Einzelbuchstaben

Frueh und dauerhaft tracken:

- Vokale: A, E, I, O, U, spaeter Ae/Oe/Ue als eigene Einheiten.
- Konsonanten: M, S, F, L, N, R, T, B, H, W, D, P, K, G usw.
- Grossbuchstaben und Kleinbuchstaben getrennt, aber verknuepft.

Warum getrennt?

- Ein Kind kann "M" visuell erkennen, aber "m" noch nicht stabil nutzen.
- Fruehe Leseaufgaben wie "Mama" brauchen M/m + A/a und die Wiederholung Ma-ma.
- Lehrkraftsteuerung muss verhindern, dass ein Wort wegen eines Kleinbuchstabens zu schwer wird.

Empfehlung fuer Datenmodell:

- `M` und `m` als Varianten einer Graphemfamilie `m`.
- Profil kann Familienstatus und Variantenstatus halten.
- Aufgabenanforderungen benennen konkret verwendete Zeichen: z.B. `M`, `a`, `m`.

#### 2. Laut-Buchstaben-Verbindungen

Nicht jedes visuelle Erkennen reicht fuer Lesen. Darum soll pro Einheit unterschieden werden:

- visuell wiedererkennen;
- mit Laut verbinden;
- in Silbe lesen;
- in Wort lesen;
- in einfachem Satz stabil nutzen.

Beispiel:

- Kind findet `M` auf einer Karte: visuell.
- Kind sagt /m/ oder nutzt passende Gebaerde: Lautverbindung.
- Kind liest `Ma`: Silbe.
- Kind liest `Mama`: Wort.
- Kind liest `Mama ist da.` mit Hilfe: Satzkontext.

#### 3. Silben

Ab Stufe 4 tracken:

- offene CV-Silben: Ma, La, So, Fa, Li, Mo, Na, Se, Ro.
- wiederholte Silben: Ma-ma.
- einfache zweisilbige Muster: CV-CV, CV-CVC, CVC-CV.
- schwierige Silben mit Konsonantenhaeufung oder Digraph: Schu, Fens, Tas, sche, Blu, Freu erst spaeter.

Silben duerfen nicht nur als Textsplit gespeichert werden. Jede Silbe braucht eine Schwierigkeitsmarkierung:

- `open_cv`: Ma, La, So, fa.
- `closed_cvc`: Ball, Bus, Hut.
- `cluster`: Blu, Brot, Platz.
- `digraph`: sch, ch.
- `diphthong`: au, ei, eu.

#### 4. Wortmuster

Tracken als Lesemuster, nicht als Vokabelliste:

- Wiederholungswort: Mama, Mimi, Momo.
- CV-CV-Wort: Sofa, Lama, Limo, Nase, Rose.
- einsilbiges CVC/CVCC-Wort: Bus, Hut, Ball, Mond, Licht.
- Wort mit Digraph: Schule, Tasche, Fisch, Buch.
- Wort mit Cluster: Blume, Brot, Platz, Stift.
- Funktionswoerter in Satzphase: ist, da, im, auf, der/die/das, ein.

Wichtig: Funktionswoerter wie "ist", "da", "im" sind fuer Mini-Saetze notwendig, aber sie duerfen nicht stillschweigend als bekannt gelten. Sie brauchen eigene Satzbaustein-Freigabe.

#### 5. Deutsche Mehrzeichen-Grapheme fuer spaetere Stufen

Nicht im fruehen Alpha-22-Filter als Standard freigeben, sondern separat:

- `sch`: Schule, Tasche, Fisch, Schuh.
- `ch`: Buch, Licht.
- `ei`: Stein, ein.
- `au`: Haus, Maus.
- `eu`: Freude.
- `st`, `sp`: Stift, spielen.
- `pf`, `qu`, `ck`, `ng` spaeter.

Regel: Mehrzeichen-Grapheme duerfen nur in Aufgaben erscheinen, wenn sie explizit eingefuehrt oder als ganzes bekanntes Wort durch die Lehrkraft freigegeben sind.

### Empfohlene Skala

Empfehlung: 0-6 Statusskala intern, aber einfache 3-Zonen-Eingabe fuer Lehrkraefte.

Warum nicht 0-3?

- 0-3 ist fuer GE-Unterricht zu grob. Es trennt nicht sauber zwischen "gesehen", "Laut verbunden", "in Silbe" und "im Wort/Satz".
- Dadurch wuerde LeseWerk zu frueh Woerter oder Saetze anbieten.

Warum nicht 0-5?

- Die Aufgabenstellung verlangt mindestens sieben Zustandsbegriffe. Eine 0-5-Skala muesste zwei wichtige Zustaende zusammenlegen.

Empfehlung intern:

| Wert | Interner Status | Bedeutung fuer Aufgabenfilter |
|---|---|---|
| 0 | nicht eingefuehrt | Darf nicht in Leseaufgaben verwendet werden. |
| 1 | mit Hilfe eingefuehrt | Nur passiv zeigen, nie als Antwortanforderung. |
| 2 | visuell erkannt | Erlaubt fuer Such-/Wiedererkennungsaufgaben. |
| 3 | mit Laut verbunden | Erlaubt fuer Laut-Buchstaben-Zuordnung. |
| 4 | in Silbe gelesen | Erlaubt fuer Silbenlesen und Silbenbau. |
| 5 | in Wort gelesen | Erlaubt fuer Wortlesen/Wort-Bild-Zuordnung. |
| 6 | im einfachen Satz stabil | Erlaubt fuer kurze Saetze und Mini-Geschichte. |

Lehrkraft-Eingabe nach aussen:

- Grau: "noch nicht fuer Aufgaben" = intern 0-1.
- Gelb: "mit Hilfe" = intern 1-3, je nach Detailauswahl.
- Gruen: "heute sicher nutzbar" = intern 4-6, je nach Stufe.

Optionaler Detailmodus nur fuer spaeter:

- Lehrkraft tippt auf M und kann fein waehlen: gesehen / Laut / Silbe / Wort / Satz.
- Standard bleibt schnell: nicht nutzen / mit Hilfe / sicher nutzen.

### Nicht-diagnostische Sprache

Vermeiden:

- "Defizit", "schwach", "nicht koennen", "Diagnose", "Level bestanden", "Fehlerquote", "Prozent".

Nutzen:

- "heute sicher", "mit Hilfe", "noch weglassen", "naechster kleiner Schritt", "Material passt", "ruhig wiederholen".

Lehrkraft-Hinweis im UI:

> Das Profil ist nur eine Tagesauswahl fuer passende Aufgaben. Es bewertet kein Kind und ersetzt keine paedagogische Einschaetzung.

## B) Entwicklungsstufen des Lesens fuer GE-Kontext

Die Stufen sind nicht alters- oder klassenbezogen. Ein Kind kann je nach Tagesform, Material, Motivation und Unterstuetzung zwischen Stufen wechseln.

### Stufe 1: Prae-Lesen, Symbol- und Routineorientierung

- Kann: erkennt wiederkehrende Orte, Bilder, Symbole, Start/Pause-Routinen; richtet Aufmerksamkeit auf Material.
- Geeignete Aufgaben: Bild ansehen, reales Objekt zu Bild legen, Startsymbol finden, Pausekarte nutzen, "gleiches Bild" finden.
- Ungeeignet: Buchstabenabfrage, Wortlesen, Auswahl aus vielen Schriftkarten.
- Hilfen: reale Gegenstaende, Foto/Objekt, Gebaerde, Vorlesen, kurze ritualisierte Sprache.
- UI-Form: ein grosses Bild/Symbol, eine grosse Aktion, Pause sichtbar.
- Kleinster naechster Schritt: ein bekanntes Symbol mit einem Grossbuchstaben daneben zeigen, ohne Leseanforderung.
- Ueberlastung: mehr als 2 Optionen, abstrakte Begriffe, wechselnde Layouts.

### Stufe 2: Visuelle Buchstabenerkennung

- Kann: einzelne bekannte Zeichen optisch wiederfinden, z.B. M zwischen 2-3 Zeichen.
- Geeignete Aufgaben: Buchstabe finden, gleiche Buchstaben paaren, Gross-/Kleinvariante mit Hilfe betrachten.
- Ungeeignet: Lautabfrage ohne Hilfe, Silbenlesen, Wort-Bild-Matching.
- Hilfen: Farbrahmen, grosses Zeichen, Laut/Gebaerde optional, wenige Ablenker.
- UI-Form: "Finde M" mit 2-3 grossen Karten.
- Kleinster naechster Schritt: M und A getrennt finden, dann M + A nebeneinander sehen.
- Ueberlastung: aehnliche Distraktoren in grosser Menge, Kleinbuchstaben ohne Vorbereitung.

### Stufe 3: Laut-Buchstaben-Zuordnung

- Kann: bekanntes Zeichen mit Laut, Mundbild, Gebaerde oder Anlaut verbinden.
- Geeignete Aufgaben: Laut hoeren und Buchstabe zeigen, Buchstabe antippen und Laut hoeren, Anlautbild zu Buchstabe.
- Ungeeignet: Wortlesen, Silbenbau mit unbekanntem Vokal.
- Hilfen: Vorlesen, Wiederholen, Gebaerde, Mundbild, Lehrer-Start.
- UI-Form: eine Lautkarte + 2 Buchstabenkarten oder umgekehrt.
- Kleinster naechster Schritt: bekannte Konsonant-Vokal-Verbindung zeigen, z.B. M + A -> Ma.
- Ueberlastung: mehrere neue Laute gleichzeitig, akustisch aehnliche Laute ohne Kontrastaufbau.

### Stufe 4: Silbenlesen

- Kann: bekannte Grapheme zu einfachen offenen Silben verbinden, z.B. Ma, La, So.
- Geeignete Aufgaben: Silbe lesen, Silbe mit Farbe/Segmentierung zeigen, Silbe nachsprechen, Silbe wiederfinden.
- Ungeeignet: dreisilbige Woerter, Cluster, Satzlesen ohne gesicherte Wortbasis.
- Hilfen: Silbenbogen, blau/rot-Farben, langsames Vorlesen, Fingerfuehrung.
- UI-Form: eine grosse Silbe, ggf. 2 Silbenkarten.
- Kleinster naechster Schritt: gleiche Silbe wiederholen: Ma - ma.
- Ueberlastung: geschlossene Silben wie "Ball" als erstes Silbenmaterial, wenn Lautverschmelzung noch unsicher ist.

### Stufe 5: Silbe-zu-Wort-Verschmelzung

- Kann: zwei bekannte Silben zu einem kurzen Wort verbinden, besonders CV-CV oder Wiederholungswort.
- Geeignete Aufgaben: Ma + ma -> Mama, La + ma -> Lama, So + fa -> Sofa; Wort bauen; Silbenreihenfolge legen.
- Ungeeignet: Mini-Geschichte, lange Distraktorlisten, Woerter mit sch/ch/au ohne Freigabe.
- Hilfen: Silbenfarben, getrennte Karten, Lehrkraft liest erst Silben, dann Wort.
- UI-Form: zwei Silbenkarten oben, ein Wortfeld unten.
- Kleinster naechster Schritt: das gebaute Wort als ganzes wiedererkennen.
- Ueberlastung: drei Silben, aehnliche falsche Woerter, zu viel Motorik vor Lesen.

### Stufe 6: Ganzwortlesen bekannter Woerter

- Kann: bekannte kurze Woerter als Ganzes wiedererkennen oder lesen, ggf. mit Bildhilfe.
- Geeignete Aufgaben: Wort lesen, Wort-Bild-Zuordnung, bekanntes Wort in 2 Optionen finden.
- Ungeeignet: neue Woerter mit unbekannten Graphemen, Satzverstehen mit mehreren unbekannten Funktionswoertern.
- Hilfen: Bildhilfe, Silbenfarben optional, Vorlesen als Kontrolle, Wiederholung.
- UI-Form: grosses Wort + Bild/Objekt oder 2 Wortkarten.
- Kleinster naechster Schritt: bekanntes Wort in einen festen Satzrahmen setzen.
- Ueberlastung: 3-4 aehnliche Schriftoptionen, abstrakte Woerter, schnelle Wechsel.

### Stufe 7: Kurzer Satz mit bekanntem Wort

- Kann: ein bekanntes Zielwort in einem sehr kurzen Satz mit bekannten Satzbausteinen lesen/mitlesen.
- Geeignete Aufgaben: "Mama ist da.", "Sofa ist da.", "Ball ist da."; Satz lesen/hoeren; Zielwort im Satz markieren.
- Ungeeignet: dreizeilige Geschichten, Nebensaetze, mehrere neue Funktionswoerter.
- Hilfen: Zielwort hervorheben, Satz vorlesen, Satz mit Symbol/Geste, Pausen zwischen Woertern.
- UI-Form: ein Satz, grosses Zielwort, ein Bild.
- Kleinster naechster Schritt: gleicher Satzrahmen mit anderem bekannten Wort.
- Ueberlastung: Satz mit unbekannten Graphemen in Funktionswoertern, z.B. "winkt" ohne W/i/n/k/t-Freigabe.

### Stufe 8: Mini-Geschichte mit Unterstuetzung

- Kann: 2-3 kurze Saetze mit wiederkehrendem Zielwort verfolgen; Lesen und Hoeren duerfen gemischt sein.
- Geeignete Aufgaben: Mini-Geschichte lesen/hoeren, Satz 1 wiederholen, Zielwort finden, Bildfolge legen.
- Ungeeignet: freies Nacherzaehlen als Pflicht, versteckte Verstaendnisfragen, mehr als 3 kurze Saetze.
- Hilfen: Vorlesen, Satz einzeln anzeigen, Bildfolge, Wiederholung, Stop/Pause.
- UI-Form: eine Satzkarte nach der anderen, nicht kompletter Textblock.
- Kleinster naechster Schritt: eine einfache Auswahlfrage mit 2 konkreten Antworten.
- Ueberlastung: mehrere Figuren, Perspektivwechsel, abstrakte Gefuehle ohne Bildstuetze.

### Stufe 9: Einfache Verstehensantwort

- Kann: nach Lesen/Hoeren eine konkrete Frage mit 2 Auswahloptionen beantworten.
- Geeignete Aufgaben: "Was liegt im Garten? Ball oder Bus"; Bild- oder Wortantwort waehlen.
- Ungeeignet: offene Warum-Fragen, 4 Antwortoptionen, Textsuche in langen Abschnitten.
- Hilfen: Text erneut hoeren, Zielwort markieren, Antwortbilder, Lehrkraft kann Frage wiederholen.
- UI-Form: Frage oben, 2 grosse Karten, "Nochmal lesen".
- Kleinster naechster Schritt: gleiche Struktur mit bekanntem neuem Wort.
- Ueberlastung: falsche Antwort als rot/negativ markieren, Zeitdruck, Punkte.

### Stufe 10: Transfer mit bekanntem Muster

- Kann: ein bekanntes Graphem-/Silben-/Satzmuster auf ein neues, aber kontrolliertes Wort uebertragen.
- Geeignete Aufgaben: Ma-ma -> La-ma, So-fa -> Li-mo; "X ist da" mit bekanntem X; bekanntes Muster mit neuem Bild.
- Ungeeignet: freie Textproduktion, mehrere neue Muster gleichzeitig.
- Hilfen: Vergleichskarte "Das kennst du", Silbenfarben, Lehrkraft modelliert erstes Beispiel.
- UI-Form: bekanntes Beispiel links, neuer kleiner Transfer rechts.
- Kleinster naechster Schritt: nur eine Variable aendern: ein Buchstabe, eine Silbe oder ein Zielwort.
- Ueberlastung: neue Grapheme plus neue Satzstruktur plus neue Aufgabe gleichzeitig.

## C) Aufgabe-Typen-Matrix

### Steuerlogik

Eine Aufgabe wird erlaubt, wenn alle vier Bedingungen stimmen:

1. Entwicklungsstufe passt zum Aufgabentyp.
2. Alle benoetigten Grapheme/Silben/Woerter sind im Profil ausreichend freigegeben.
3. Textmenge, Antwortzahl und visuelle Hilfen liegen innerhalb der Stufen-Grenze.
4. Qualitaetsstatus der Aufgabe ist freigegeben: `reviewed_safe` oder `teacher_demo_only`.

### Matrix nach Aufgabentyp

| Aufgabentyp | Frueheste Stufe | Erforderliche bekannte Einheiten | Max. Textmenge | Antwortoptionen | Visuelle Hilfe | Geste/Hinweis | Stop/Simplify wenn... |
|---|---:|---|---|---:|---|---|---|
| Buchstabe finden/erkennen | 2 | Zielbuchstabe Status >= 2; Distraktoren bereits eingefuehrt oder stark verschieden | 1 Zeichen + kurze Ansage | 2, spaeter 3 | grosse Karten, hoher Kontrast | "Zeig M" + ggf. Laut | Blick wandert, keine Auswahl nach 2 ruhigen Wiederholungen, Zeichen verwechselt mit aehnlichem Zeichen |
| Laut-Buchstaben-Zuordnung | 3 | Zielbuchstabe Status >= 3; Laut/Gebaerde eingefuehrt | 1 Laut + 1 Zeichen | 2 | Mundbild/Gebaerde optional | "Wir hoeren /m/" | Kind reagiert nur auf Bild/Position, nicht auf Laut; dann zur visuellen Stufe zurueck |
| Silbe lesen | 4 | alle Grapheme der Silbe Status >= 3, Silbenmuster freigegeben; fuer eigenstaendiges Lesen Zielstatus >= 4 | 1 Silbe, spaeter 2 | keine oder 2 | Silbenfarbe, Bogen | Finger zieht von links nach rechts | Laut-fuer-Laut bricht ab, Vokal unbekannt, Silbe wird geraten |
| Silbe bauen | 5 | Einzelgrapheme Status >= 3; Ziel-Silbe als Muster eingefuehrt | 2 Zeichenkarten oder 2 Silbenkarten | 2-3 Bausteine | Legefeld, klare Reihenfolge | "Erst M, dann A" | Motorik ueberlagert Lesen; zu viele Bausteine; dann nur lesen statt bauen |
| Wort lesen | 6 | alle Grapheme/Silben Status >= 4; Zielwort Status >= 5 oder kontrolliertes Transferwort | 1 Wort | keine oder 2 | optional Bild verdeckt/aufdeckbar | "Silben helfen" | Wort enthaelt unbekanntes Zeichen; Kind nutzt nur Bild statt Wort |
| Wort-Bild-Zuordnung | 6 | Zielwort Status >= 5; Distraktoren bekannt oder visuell klar verschieden; keine unbekannten Zielgrapheme | 1 Wort + 1-2 Bilder oder umgekehrt | 2, spaeter 3 | Bildhilfe stark | "Schau auf das Wort, dann aufs Bild" | Bildraten dominiert; Optionen zu aehnlich; dann auf 2 Optionen reduzieren |
| Satz lesen | 7 | Zielwort Status >= 5; Satzbausteine freigegeben; kritische Funktionswoerter bekannt/mitlesbar | 1 kurzer Satz, 3-5 Woerter | keine oder 2 Satzbilder | Zielwort markiert | Satz mit Finger fuehren | mehr als ein unbekanntes Wort; Satz laenger als Aufmerksamkeitsspanne |
| Mini-Geschichte lesen/hoeren | 8 | Zielwort Status >= 5; Satzrahmen bekannt; Vorlesen erlaubt | 2-3 Saetze, je 3-6 Woerter | keine waehrend Lesen | Satz-fuer-Satz, Bildfolge | "Erst Satz 1" | Kind verliert Orientierung, ganzer Textblock ueberfordert; dann Satz einzeln zeigen |
| Einfache Verstehenswahl | 9 | Text wurde gelesen/gehoert; Antwortwoerter/Bilder bekannt; Frage konkret | 1 Frage + 2 Antworten | 2 | Antwortbilder oder klare Wortkarten | "Nochmal lesen" | Fragewort unverstanden; Antwort erfordert Weltwissen statt Text |
| Transfer mit bekanntem Muster | 10 | Basis-Muster stabil; nur 1 neue Variable; neue Einheit mindestens Status 3-4 | Vergleich + Zielkarte | 2 | bekannt/neu nebeneinander | "Das ist wie Mama - jetzt Lama" | mehr als eine neue Schwierigkeit; Kind errät Muster ohne Lesen |

### Matrix nach Entwicklungsstufe

| Stufe | Erlaubte Aufgaben | Nur mit Lehrkraft/Hilfe | Nicht anbieten |
|---:|---|---|---|
| 1 | Symbolroutine, Objekt/Bild, Start/Pause | Buchstabe als Umgebungshinweis | Buchstabenabfrage, Wort-/Satzlesen |
| 2 | Buchstabe finden, gleiches Zeichen | Gross/Klein-Paar betrachten | Lautzuordnung als Pflicht, Silben |
| 3 | Laut-Buchstaben-Matching | erste CV-Silbe ansehen | Wortlesen, mehrere Silben |
| 4 | Silbe lesen, Silbe wiederfinden | Silbe bauen mit 2 Karten | Satz, Mini-Geschichte |
| 5 | Silbe-zu-Wort, Wort bauen | Wort mit Bild stützen | Verstehensfrage, Transfer mit neuem Graphem |
| 6 | Wort lesen, Wort-Bild | kurzer Satz mit bekanntem Rahmen | Mini-Geschichte als Pflicht |
| 7 | einzelner kurzer Satz | Mini-Geschichte vorlesen/mitlesen | freie Fragen, 3+ Satzkarten gleichzeitig |
| 8 | Mini-Geschichte Satz fuer Satz | einfache Frage mit 2 Optionen | offene Fragen, langer Textblock |
| 9 | einfache Verstehenswahl | Transfer mit bekanntem Muster | mehrere neue Woerter/Muster zugleich |
| 10 | Transferaufgabe | neue Einheit in bekanntem Muster | breiter unkontrollierter Text |

## D) Deutsche GE-Qualitaetsregeln fuer S-Tier-Aufgaben

### Inhaltsqualitaet

- Konkrete Alltagswoerter zuerst: Mama, Sofa, Lama, Ball, Bus, Hut, Tasse, Buch, Tisch, Heft.
- Fruehe Aufgaben vermeiden abstrakte oder sozial-emotionale Woerter als Lesefokus: Freude, Frage, Hilfe, Ruhe nur spaeter oder als gehoerte Geschichte.
- Ein Ziel pro Screen: finden, lesen, bauen, zuordnen oder Pause.
- Keine Fuellwoerter, die nur Schriftmenge erhoehen.
- Neue Schwierigkeit isolieren: entweder neues Graphem, neues Silbenmuster, neuer Satzrahmen oder neue Aufgabe - nicht alles zugleich.

### Wiederholung mit Variation

- Wiederholung ist kein Fehler, sondern Kernprinzip.
- Variation soll kontrolliert sein: Mama -> Lama, Sofa -> Limo, "X ist da".
- Wiederholung darf nicht wie Strafe wirken. Sprache: "Nochmal ruhig", "Wir schauen noch einmal".

### Druckfreie Oberflaeche

- Keine Punkte, Sterne als Leistung, Timer, Ranglisten, Prozent, rote Fehlerzustaende.
- Kein "falsch", "versuche es besser", "du musst".
- Feedback beschreibt Unterstuetzung: "Die Silben helfen", "Wir lesen langsam".

### GE-passende Interaktion

- Lehrer-led, aber kind-visible: Lehrkraft kann steuern; Kind sieht nur die aktuelle Aufgabe.
- Grosse Touch-Ziele: mindestens 56-64px hoch, klare Abstaende.
- Maximal 2 Optionen frueh, 3 nur bei stabiler Stufe.
- Drag-and-drop nie als einzige Bedienform; Tippen muss reichen.
- Pause/Fertig immer erreichbar oder sichtbar.
- Kein endloser Aufgabenstrom.

### Unterstuetzung

- Symbol/Bild nur lokal oder selbst erstellt/lizenziert; keine geschuetzten externen Assets.
- Vorlesen als Hilfe, nicht als Bewertung.
- Gebaerdenhinweis als optionaler Text/Lehrkraft-Cue, nicht als behauptetes Standardsymbol.
- Silbenfarben konsistent, nicht dekorativ.

### Datenschutz/local-first

- Keine echten Namen, keine Klassenlisten, keine Diagnosen, keine Familieninfos.
- Profile anonym: Farbe/Form/Tier/Nummer.
- Aktueller Stand: keine Speicherung von Leseprofilen in der App; nur Designmodell.
- Spaeter nur lokale, sparsame Speicherung nach ausdruecklicher Entscheidung.
- Lehrkraftnotizen: als nicht-speichernder Papierhinweis oder lokaler Entwurf, nie Cloud/Upload.

## E) Letter-set Beispiele

### Profil 1: kennt nur M + A

Annahme: M/m und A/a sind visuell eingefuehrt; Lautverbindung fuer M und A mit Hilfe; Silbe Ma entsteht erst.

Erlaubte Aufgaben:

1. Buchstabe finden: "Finde M" mit M und A als grosse Karten.
   - Grund: benoetigt nur visuelle Erkennung bekannter Zeichen.
2. Laut-Buchstaben-Matching: Lehrkraft spricht /m/, Kind zeigt M.
   - Grund: wenn M Status 3 erreicht, ist Lautzuordnung moeglich.
3. Silbe ansehen/mitlesen: `Ma` gross, Lehrkraft liest, Kind zeigt/mitlautiert.
   - Grund: erster Uebergang zu Stufe 4, noch nicht selbststaendiges Wortlesen.

Verbotene Aufgaben:

1. `Mama ist da.` lesen.
   - Grund: enthaelt Kleinbuchstaben, Satzbausteine `ist`, `da` und Satzanforderung.
2. Wort-Bild-Matching `Mama` gegen `Mimi`/`Momo`.
   - Grund: i/o nicht bekannt; Distraktoren fuehren unbekannte Vokale ein.

### Profil 2: kennt M + A + S + O + F

Annahme: Grapheme sind auf Lautebene sicher; offene Silben Ma, So, fa mit Hilfe moeglich.

Erlaubte Aufgaben:

1. Silben lesen: `Ma`, `So`, `fa` einzeln.
   - Grund: alle Zeichen bekannt; offene Silben passen.
2. Wort bauen: `So` + `fa` -> `Sofa` mit Bildhilfe.
   - Grund: CV-CV-Transfer mit bekannten Graphemen.
3. Wort lesen: `Sofa` mit 2 Optionen `Sofa` / `Mama`.
   - Grund: beide Woerter aus bekannten Graphemen; visuell klar verschieden.

Verbotene Aufgaben:

1. `Sonne` lesen.
   - Grund: N/n und e sind unbekannt, zudem Doppelkonsonanz/zweite Silbe.
2. Geschichte "Sofa ist da" falls `ist/da` nicht freigegeben.
   - Grund: Satzbausteine duerfen nicht stillschweigend bekannt sein.

### Profil 3: kennt L + A + M + I + O

Annahme: L/M + Vokale A/I/O koennen in offenen Silben genutzt werden.

Erlaubte Aufgaben:

1. Silben lesen: `La`, `Ma`, `Li`, `mo`.
   - Grund: offene CV-Silben aus bekannten Zeichen.
2. Wort bauen: `La` + `ma` -> `Lama`.
   - Grund: kontrolliertes zweisilbiges Wort; alle Grapheme bekannt.
3. Transfer: `Mama` links, `Lama` rechts, nur erster Buchstabe aendert sich.
   - Grund: ein Variationsschritt, keine neue Satzstruktur.

Verbotene Aufgaben:

1. `Limo` als Bild-Wort mit Distraktor `Sofa`.
   - Grund: S/f unbekannt im Distraktor; Antwortoptionen muessen ebenfalls kontrolliert sein.
2. `Licht` lesen.
   - Grund: ch, t und geschlossene Struktur nicht freigegeben.

### Profil 4: kennt mehrere einsilbige Woerter, aber schwache Silbenverschmelzung

Annahme: Kind erkennt z.B. Ball, Bus, Hut als Ganzwoerter/Bildwoerter, hat aber Schwierigkeiten mit Ma+ma oder So+fa.

Erlaubte Aufgaben:

1. Ganzwort lesen: `Ball` mit Bildhilfe, 2 Optionen.
   - Grund: staerkt vorhandene Ganzwortstrategie ohne neue Silbenlast.
2. Silbe-zu-Wort sehr reduziert: `Ma` + `ma` -> `Mama`, Lehrkraft fuehrt laut.
   - Grund: gezielter kleiner Aufbau der schwachen Verschmelzung.
3. Wortvergleich: `Ball` / `Bus` mit echten Objekten oder Bildern.
   - Grund: bekannte einsilbige Woerter, konkrete Unterscheidung.

Verbotene Aufgaben:

1. `Tomate` aus drei Silben bauen.
   - Grund: dreisilbig und zu hohe Verschmelzungsanforderung.
2. Mini-Geschichte mit mehreren Zielwoertern.
   - Grund: Satz-/Textlast verdeckt die eigentliche Silbenbaustelle.

### Profil 5: liest Mama/Sofa/Lama, strauchelt aber bei Satzlesen

Annahme: CV-CV-Woerter sind auf Wortebene sicher, Satzbausteine und Zeilenorientierung noch unsicher.

Erlaubte Aufgaben:

1. Wort lesen: `Mama`, `Sofa`, `Lama` in ruhiger Wiederholung.
   - Grund: sichert Stufe 6.
2. Satzrahmen: `Mama ist da.` mit Zielwort markiert und Vorlesen.
   - Grund: genau ein kurzer Satz, bekannte Zielwortbasis.
3. Transfer im Satzrahmen: `Lama ist da.` nur wenn `ist/da` als Satzbaustein geuebt wird.
   - Grund: eine Variable, gleicher Rahmen.

Verbotene Aufgaben:

1. Drei-Satz-Mini-Geschichte ohne Satz-fuer-Satz-Anzeige.
   - Grund: zu viel Textmenge fuer die aktuelle Grenze.
2. Verstehensfrage mit 3-4 Antwortoptionen.
   - Grund: Satzlesen ist noch nicht stabil; Antwortlast wuerde ueberfordern.

## F) Datenmodell-Vorschlag

Dies ist ein Designmodell, keine Datenbankentscheidung und keine Aufforderung zur Speicherung realer Lernprofile.

### GraphemeUnit

```ts
type GraphemeUnit = {
  id: string;                 // "m", "a", "sch", "au"
  display: string;            // "M/m", "A/a", "sch"
  kind: 'vowel' | 'consonant' | 'digraph' | 'diphthong' | 'cluster' | 'functionWord';
  variants?: string[];        // ["M", "m"]
  typicalSound?: string;      // teacher hint only, e.g. "/m/"
  introducedAfter?: string[]; // optional prerequisite ids
  earlyUse: 'early' | 'later' | 'avoidEarly';
};
```

### LearnerReadingProfile

```ts
type UnitStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type LearnerReadingProfile = {
  id: string;                 // anonymous local id, e.g. "profil-blau"
  label: string;              // "Profil Blau"
  readingStage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  graphemeStatus: Record<string, UnitStatus>;
  syllableStatus?: Record<string, UnitStatus>;
  knownWords?: Record<string, UnitStatus>;
  sentenceFrames?: Record<string, UnitStatus>; // "X ist da"
  supportSettings: SupportSettings;
  dayMode: 'very_short' | 'normal' | 'repeat_only';
};
```

### TaskRequirements

```ts
type TaskRequirements = {
  minStage: number;
  maxStage?: number;
  requiredGraphemes: string[];
  requiredSyllables?: string[];
  requiredWords?: string[];
  requiredSentenceFrames?: string[];
  forbiddenIfUnknown: string[];
  maxTextUnits: {
    letters?: number;
    syllables?: number;
    words?: number;
    sentences?: number;
  };
  maxChoices: 2 | 3;
  allowedSupports: SupportKey[];
};
```

### TaskMetadata

```ts
type ReadingTaskMetadata = {
  id: string;
  type: 'letter-find' | 'sound-letter-match' | 'syllable-read' | 'syllable-build' | 'word-read' | 'word-picture-match' | 'sentence-read' | 'mini-story' | 'comprehension-choice' | 'pattern-transfer';
  title: string;
  targetText: string;
  syllables?: string[];
  focusWord?: string;
  sentenceFrame?: string;
  requirements: TaskRequirements;
  concreteContext: 'home' | 'school' | 'body' | 'food' | 'object' | 'routine';
  visualSupport: 'object' | 'local-symbol' | 'teacher-picture' | 'none';
  teacherCue: string;
  childVisiblePrompt: string;
  calmFinishText: string;
};
```

### QualityReviewStatus

```ts
type QualityReviewStatus = {
  status: 'draft' | 'needs_review' | 'reviewed_safe' | 'teacher_demo_only' | 'avoid_for_now';
  checkedFor: {
    knownLettersOnly: boolean;
    geFit: boolean;
    noPressureLanguage: boolean;
    noProtectedAssets: boolean;
    localPrivacySafe: boolean;
    touchReadable: boolean;
  };
  reviewerNote?: string; // no personal data
};
```

### SupportSettings

```ts
type SupportSettings = {
  imageHelp: boolean;
  syllableColors: boolean;
  readAloud: boolean;
  signHint: boolean;
  reduceChoices: boolean;
  repeat: boolean;
  oneCardMode: boolean;
  pauseAfterTask: boolean;
};
```

### Teacher-only notes

Im aktuellen App-Modell nicht speichern. Wenn ueberhaupt sichtbar:

```ts
type TeacherScratchNote = {
  visibleOnlyInSession: true;
  text: string; // Hinweis: sofort anonym auf Papier uebertragen, wird nicht gespeichert.
};
```

Keine Namen, Diagnosen, Familieninfos, Klassenlisten oder dauerhafte Verlaeufe.

## G) UI-Konzept fuer spaetere Lehrkraftsteuerung

### Ziel

Die Lehrkraft soll in unter 60 Sekunden einen passenden Tagespfad einstellen koennen, ohne Diagnosegefuehl und ohne lange Fachmaske.

### Bereich 1: Tagesprofil

Titel: "Heute passende Leseaufgaben waehlen"

Controls:

1. Profilwahl anonym: Profil Blau / Profil Gruen / Profil Sonne.
2. Entwicklungsstufe: 10 ruhige Karten, aber nur Kurzlabel sichtbar:
   - Symbolroutine
   - Buchstaben sehen
   - Laut verbinden
   - Silben lesen
   - Silben zum Wort
   - Wort lesen
   - Satz lesen
   - Mini-Geschichte
   - Verstehenswahl
   - Transfer
3. Hinweis: "Das ist eine Tagesauswahl, keine Bewertung."

### Bereich 2: Grapheme markieren

Ein Buchstabenfeld mit drei Zustaenden:

- Aus: noch weglassen.
- Gelb: mit Hilfe moeglich.
- Gruen: heute sicher nutzen.

Detail optional per langem Tippen oder "Mehr":

- gesehen;
- Laut;
- Silbe;
- Wort;
- Satz.

Fruehe Ansicht zeigt nur A, E, I, O, U, M, S, F, L, N, R, T, B, H. Spaetere Grapheme wie sch/ch/au/eu sind eingeklappt unter "spaeter".

### Bereich 3: Hilfen aktivieren

Schalter:

- Bildhilfe an.
- Silbenfarben an.
- Vorlesen/Lehrkraft liest an.
- Gebaerdenhinweis anzeigen.
- Nur 2 Auswahlkarten.
- Nach jeder Aufgabe Pause anbieten.

### Bereich 4: Tagesziel

Maximal eine Auswahl:

- Ein Zeichen sichern.
- Eine Silbe lesen.
- Ein Wort ruhig lesen.
- Ein Wort im Satz lesen.
- Eine Mini-Geschichte mit Hilfe.
- Heute nur wiederholen.

### Bereich 5: Sichere Aufgaben anzeigen

Die Aufgabenliste zeigt nur freigegebene Aufgaben. Jede Karte hat Lehrkraft-Metadaten:

- benoetigt: M, a, m, Satzbaustein "ist da";
- passt zu: Stufe 7;
- Hilfen: Silbenfarben, Vorlesen;
- Qualitaet: geprueft.

### Warnung bei unbekannten Zeichen

Wenn Lehrkraft eine nicht passende Aufgabe waehlt:

> Diese Aufgabe enthaelt noch nicht freigegebene Zeichen: i, s, t. Lieber Satzbaustein erst mit Hilfe einfuehren oder eine Wortaufgabe waehlen.

Buttons:

- "Leichtere Aufgabe zeigen"
- "Trotzdem als Lehrkraft-Demo oeffnen" (spaeter nur nach bewusstem Klick, nicht Standard)

### Kindansicht

Das Kind sieht nicht das Profil, nicht die Skala und nicht die Warnung. Es sieht nur:

- eine Karte;
- eine Hauptaktion;
- Hilfe/Nochmal;
- Pause/Fertig.

## H) Implementation Roadmap nach Alpha 21

### Alpha 22: Datenmodell und statische Beispielprofile

Ziel:

- Keine breite UI.
- Keine neuen Inhalte.
- Ein statisches Curriculum-Modell als Code/JSON neben bestehendem Inhalt.
- 3-5 Beispielprofile anonym.
- Funktion `isTaskAllowedForProfile(task, profile)` als reine Logik oder vorbereitete Spezifikation.

Akzeptanz:

- Tests pruefen: Mama ist nur erlaubt, wenn M/a/m und passende Stufe freigegeben sind.
- Unbekannte Grapheme blockieren Aufgabe.
- Keine Speicherung, kein Login, keine Schuelerdaten.

### Alpha 23: Kleiner Lehrkraft-Prototyp fuer Profilwahl

Ziel:

- Minimale Teacher-Control-Karte: bekannte Grapheme markieren + Stufe waehlen.
- Nur im lokalen UI, keine Persistenz.
- Zeigt gefilterte Vorschau: "erlaubt", "mit Hilfe", "noch weglassen".

Akzeptanz:

- Lehrkraft kann M/A/S/O/F anklicken.
- App zeigt korrekt, warum Sofa erlaubt oder nicht erlaubt ist.
- Kindansicht bleibt ruhig und unveraendert klein.

### Alpha 24: Eine sichere Aufgaben-Kette aus bekannten Zeichen

Ziel:

- Aus einem Profil wird genau eine kleine Kette erzeugt/ausgewaehlt: Silbe -> Wort -> optional Satz.
- Beispiel: M+A -> Ma ansehen, Ma lesen, Mama mit Hilfe; oder M+A+S+O+F -> So/fa -> Sofa.
- Keine breite Content-Erweiterung.

Akzeptanz:

- Kette nutzt nur freigegebene Grapheme/Silben.
- Bei unbekannten Satzbausteinen bleibt Satz gesperrt.
- Browsercheck 390px: keine Ueberladung, eine Karte im Fokus.

### Nicht vor Alpha 25

- dauerhaft gespeicherte echte Profile;
- Klassenlisten;
- Export;
- automatische Generierung grosser Wortmengen;
- Asset-Import;
- offene KI-Generierung im Unterrichtsmodus.

## Entscheidende Systemregel

Eine LeseWerk-Aufgabe darf erst erscheinen, wenn sie drei Ja-Antworten bekommt:

1. Darf das Kind die Zeichen in dieser Aufgabe heute sehen/lesen?
2. Passt die Aufgabe zur aktuellen Entwicklungsstufe und Tagesform?
3. Ist die Aufgabe qualitativ geprueft: konkret, ruhig, lokal, ohne Druck, mit klarer Hilfe?

Wenn eine Antwort Nein ist, wird die Aufgabe nicht angeboten oder nur als Lehrkraft-Demo mit Warnung sichtbar.
