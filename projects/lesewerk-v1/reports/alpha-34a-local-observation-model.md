# Alpha 34A - Lokales Modell fuer Lernbeobachtung

## Zweck
Dieses Modell beschreibt eine lokale, GE-orientierte Lernbeobachtung fuer die Lese- und Schreibbruecken im Projekt. Es soll der Lehrkraft helfen, den naechsten kleinen Schritt zu waehlen, ohne ein Kind zu testen, zu bewerten oder diagnostisch einzuordnen.

## Grundlage aus den Berichten und dem Code
Aus den Alpha-33-Berichten und dem aktuellen Code ergibt sich eine klare Linie:
- Die Leseleiter ist sichtbar gestuft: Bild/Symbol -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke.
- `createLocalDidacticProfile()` und `profileBuilderOptions` arbeiten bereits mit lokalem Profil, bekannten Graphemen, bekannten Silben, Support-Optionen und einem `accessFocus`.
- `getAdaptiveNextStepForProfile()` leitet daraus einen naechsten kleinen Schritt ab.
- `getLearningCheckDailyPath()` und `getLearningCheckSummary()` zeigen, dass die Beobachtung lokal, anonym und ohne Speicherung gedacht ist.

Fachlich passt daraus ein Beobachtungsmodell, das nicht "Faehigkeiten" misst, sondern Unterrichtsnaechste beschreibt: Was ist fuer diesen Tag anschlussfaehig, welche Hilfe wird gebraucht, und welcher Lernweg bleibt ruhig und verstehbar?

## Leitprinzipien fuer Alpha 34B
1. Keine Diagnose, kein Test, keine Punkte.
2. Keine Einstufung als allgemein "kann" oder "kann nicht".
3. Nur beobachtbare Unterrichtssignale.
4. Immer mit Support- und Kontextbezug.
5. Immer lokal, anonym und ohne personenbezogene Speicherung.
6. Die Lehrkraft sieht eine didaktische Spur, das Kind sieht einen ruhigen naechsten Schritt.

## Beobachtungsbereiche

### 1) Bekannte Grapheme
Gemeint sind Buchstaben oder Buchstabenverbindungen, die im heutigen Unterricht sicher wiedererkannt oder gemeinsam gelesen werden koennen.

Beobachtbare Anzeichen:
- zeigt bei bekannten Buchstaben Blick, Zeigen oder Mitlesen
- erkennt ein kleines Set wiederkehrender Grapheme wieder
- braucht bei neuen Graphemen deutlich mehr Fuehrung als bei bekannten
- reagiert auf Einzellaut, Buchstabenkarte oder farbig markierte Silbe

Didaktische Bedeutung:
- waehlt Aufgaben mit bekannten Laut-Buchstaben-Beziehungen
- reduziert die Auswahl bei unsicheren Graphemen
- nutzt Wiederholung statt Neuigkeitsdruck

### 2) Sichere Silben
Gemeint sind Silben, die heute ohne Ueberforderung mitgesprochen, geklatscht, gelegt oder gelesen werden koennen.

Beobachtbare Anzeichen:
- spricht eine kurze Silbe mit
- klatscht oder legt eine Silbe mit
- verbindet zwei bekannte Silben zu einem Wort mit Hilfe
- braucht bei Silbenverbindung noch Vorlesen, Nachsprechen oder Bildhilfe

Didaktische Bedeutung:
- Silbe ist der stabile Zwischenraum zwischen Buchstaben und Wort
- gut geeignet fuer den Einstieg in den Tagespfad
- hilfreich fuer Aufgaben mit klarer Struktur und Wiederholung

### 3) Wortschatzfeld
Gemeint ist ein alltagsnahes Bedeutungsfeld, in dem die Woerter inhaltlich anschlussfaehig sind, zum Beispiel Schule, Essen, Kleidung, Raum, Familie, Tiere, Dinge im Raum.

Beobachtbare Anzeichen:
- reagiert auf bekannte Alltagswoerter schneller als auf abstrakte Begriffe
- kann Gegenstand, Bild oder Wort aus einem vertrauten Feld zuordnen
- zeigt mehr Sicherheit, wenn das Wort in eine bekannte Situation eingebettet ist

Didaktische Bedeutung:
- Aufgaben sollen an vertraute Bedeutungsfelder gebunden sein
- Bild- und Gegenstandsbezug ist oft sinnvoll
- unbekannte Wortfelder sollen nicht mit neuen Graphemen gleichzeitig kombiniert werden

### 4) Bild-/Symbolbedarf
Gemeint ist, wie stark eine lernende Person auf visuelle Bedeutungsstuetzen angewiesen ist.

Beobachtbare Anzeichen:
- braucht Bild, Gegenstand oder Symbol, um die Aufgabe zu verstehen
- liest oder reagiert besser, wenn das Wort sichtbar und bildlich gestuetzt ist
- profitiert von reduzierter Auswahl und klarer Visualisierung
- verliert Orientierung ohne Bild-/Symbolhilfe schneller

Didaktische Bedeutung:
- hohes Bild-/Symbolbeduerfnis bedeutet: erst Bedeutung sichern, dann Schrift
- passende Station ist Bild/Symbol oder stark gestuetzte Silbe
- Aufgabe soll visuell ruhig, klar und nicht ueberladen sein

### 5) Satzbereitschaft
Gemeint ist die Bereitschaft, kurze Saetze als sinnvolle Einheit zu lesen, zu verstehen oder mitzuergaenzen.

Beobachtbare Anzeichen:
- bleibt bei einem sehr kurzen Satz aufmerksam
- kann einen vertrauten Satz mit Hilfe mitlesen
- versteht eine einfache Handlungsaussage oder Fragespur
- braucht bei Saetzen noch starke Stuetze durch Bild, Geste oder Vorlesen

Didaktische Bedeutung:
- Satzangebote nur, wenn Wortebene schon tragfaehig wirkt
- kurze, alltagsnahe Saetze mit klarem Bildbezug
- keine Satzvielfalt als Leistungsdruck

### 6) Mini-Geschichten-Bereitschaft
Gemeint ist die Bereitschaft, eine kleine Folge von 2 bis 3 Sinnschritten zu verstehen oder mitzulesen.

Beobachtbare Anzeichen:
- bleibt bei einer kleinen Szene oder Abfolge dran
- kann eine kurze Reihenfolge mit Bild oder Satz erkennen
- beantwortet eine einfache Verstehensfrage zu einer Mini-Szene
- braucht Wiederholung, um die kleine Folge zu halten

Didaktische Bedeutung:
- Mini-Geschichten erst anbieten, wenn Satz oder klare Wortbindung tragfaehig sind
- kurze Folgen, klare Bilder, keine inhaltliche Ueberladung
- dient als Uebergang zur zusammenhaengenden Leseerfahrung

### 7) Schreibbruecken-Bereitschaft
Gemeint ist die Bereitschaft, ein Wort ruhig nachzuspuren, zu legen, nachzufahren oder ganz kurz abzuschreiben.

Beobachtbare Anzeichen:
- nimmt an Legen, Nachfahren oder Spuren teil
- kann ein bekanntes Wort mit Hilfe ruhig wiederholen
- ertraegt die Materialhandlung ohne den Fokus zu verlieren
- braucht ggf. Modell, Handfuehrung oder klare Begrenzung

Didaktische Bedeutung:
- Schreibbruecke ist eine optionale Materialhandlung, kein Test
- nur anbieten, wenn das Wort oder die Silbe schon vertraut wirkt
- kurze, ruhige Form statt freier Schreibaufforderung

## Beobachtungslogik fuer die Lehrkraft
Die Lehrkraft soll nicht fragen: "Wie gut ist das Kind?", sondern:
- Woran erkenne ich heute Anschluss?
- Welche Stufe wirkt heute stabil genug?
- Welche Hilfeform passt aktuell?
- Wo bleibt der Weg ruhig und sinnvoll?

Sinnvolle Beobachtungsmarker sind:
- bekannte Grapheme werden wiedererkannt
- sichere Silben koennen mitgesprochen oder gelegt werden
- ein Wortfeld ist inhaltlich anschlussfaehig
- Bild-/Symbolhilfe wird gebraucht oder entlastet
- ein kurzer Satz ist heute tragfaehig oder noch zu viel
- Mini-Geschichte ist moeglich oder noch zu lang
- Schreibbruecke ist heute sinnvoll oder besser spaeter

## Erlaubte Formulierungen fuer Alpha 34B
Erlaubt sind Formulierungen, die Unterrichtsbezug und Beobachtung sichtbar machen:
- bekannte Grapheme
- sichere Silben
- vertrautes Wortschatzfeld
- hoher / mittlerer / geringer Bildbedarf
- Satz noch nicht / mit Hilfe / heute passend
- Mini-Geschichte mit starker Stuetze
- Schreibbruecke als optionale Materialhandlung
- naechster kleiner Schritt
- ruhige Auswahl
- gemeinsame Wiederholung
- Beobachtungsnotiz
- heutige Unterrichtsspur

Beispielsaetze:
- "Die Aufgabe passt heute, weil bekannte Grapheme und eine reduzierte Auswahl genutzt werden koennen."
- "Die lernende Person profitiert von Bildhilfe und einer kurzen Silbenstruktur."
- "Eine Mini-Geschichte wird erst dann angeboten, wenn der kurze Satz bereits mitgetragen werden kann."
- "Die Schreibbruecke ist heute als optionale Materialhandlung sinnvoll."

## Verbotene Formulierungen fuer Alpha 34B
Nicht erlaubt sind Formulierungen, die nach Diagnose, Bewertung oder Endurteil klingen:
- leseschwach / schreibschwach
- kann es nicht / ist nicht faehig
- Defizit, Mangel, Versagen
- Test bestanden / nicht bestanden
- Punktzahl, Score, Ranking, Level im Wettbewerbssinn
- normgerecht, altersgerecht als starres Urteil
- ungeeignet als Personenzuschreibung
- Diagnose, Befund, Therapieableitung
- "zu schlecht", "zu langsam", "zu wenig"

Auch vermeiden:
- Vergleich mit anderen Kindern
- Formulierungen mit Druck wie "muss schaffen"
- Formulierungen, die Lernen als Fehlerkontrolle darstellen

## Kriterien fuer die Lehrkraftsicht in Alpha 34B
Die Lehrkraft muss im UI oder Bericht unmittelbar sehen:
1. welche Beobachtungsstufe gemeint ist
2. warum diese Stufe heute passt
3. welche Hilfeform vorgesehen ist
4. ob die Aufgabe eher Bild/Symbol, Silbe, Wort, Satz, Mini-Geschichte oder Schreibbruecke ist
5. dass keine diagnostische Einordnung stattfindet
6. dass das Modell lokal und anonym bleibt

Optional sinnvoll:
- kurze Notiz zum naechsten Lernschritt
- kurze Notiz zur Hilfeform
- Anzeige von bekanntem Graphem- und Silbenbezug

## 6 bis 8 sinnvolle Beispielaufgaben fuer Alpha 34B
Die Aufgaben sollen klein, klar und alltagsnah sein. Sinnvoll sind:

1. Bild/Symbol -> Wortzuordnung
- Beispiel: vertrauter Gegenstand mit zwei Auswahlwoertern
- Ziel: Bedeutung sichern, Bildbedarf sichtbar machen

2. Bekanntes Graphem wiedererkennen
- Beispiel: einzelner Buchstabe oder sichere Buchstabenverbindung aus dem Profil
- Ziel: bekannte Grapheme sichtbar machen

3. Sichere Silbe klatschen oder legen
- Beispiel: Ma / ma oder eine andere sichere Silbe
- Ziel: Silbenkomfort beobachten

4. Zwei Silben zu einem Wort verbinden
- Beispiel: vertrautes, kurzes Wort mit reduzierter Auswahl
- Ziel: sichere Silben im Wortverband beobachten

5. Kurzer Satz mit Bildbezug
- Beispiel: sehr kurzer Satz aus alltagsnahem Wortschatz
- Ziel: Satzbereitschaft pruefen, ohne zu ueberfordern

6. Mini-Geschichte mit 2 bis 3 sehr kurzen Schritten
- Beispiel: kleine Szene mit Bildfolge oder Satzfolge
- Ziel: Verstehens- und Folgebezug beobachten

7. Schreibbruecke: Wort nachspuren oder legen
- Beispiel: bekanntes Wort aus dem bisherigen Pfad
- Ziel: ruhige Materialhandlung beobachten

8. Schreibbruecke mit minimaler Erweiterung
- Beispiel: Wort mit Vor- und Nachspur oder Abschreiben in sehr kleiner Form
- Ziel: sehen, ob die Uebertragung von Lesen zu Schreiben heute tragfaehig ist

## Geeignete Aufgabenprinzipien
Alle Beispielaufgaben sollten diese Prinzipien erfuellen:
- nur eine klare Hauptanforderung
- kurze Instruktion
- reduzierte Auswahl
- bekannte Woerter oder bekannte Grapheme
- sichtbare Hilfe
- kein Zeitdruck
- kein Erfolgsvergleich
- keine automatische Bewertungssprache

## Akzeptanzkriterien fuer Alpha 34B
Alpha 34B ist fachlich passend, wenn folgende Punkte erfuellt sind:

### Inhaltlich
- Das Modell unterscheidet sinnvoll zwischen Graphem, Silbe, Wortschatzfeld, Bildbedarf, Satz, Mini-Geschichte und Schreibbruecke.
- Das Modell bleibt beobachtungsnah und wertfrei.
- Es laesst unterschiedliche Ausgangslagen zu, ohne sie als Defizit zu markieren.
- Es liefert eine klare didaktische Begruendung fuer den naechsten Schritt.

### Sprachlich
- Keine Diagnose- oder Testsprache.
- Keine Punkte-, Score- oder Rankinglogik.
- Keine endgueltigen Faehigkeitsaussagen.
- Formulierungen sind fuer Lehrkraefte direkt verständlich.
- Formulierungen sind fuer Teamgespraeche und Dokumentation nutzbar.

### Fachlich-praktisch
- Die Lehrkraft kann an der Beobachtung ableiten, ob eher Bild/Symbol, Silbe, Wort, Satz, Mini-Geschichte oder Schreibbruecke passt.
- Die Hilfeform ist benennbar.
- Die Aufgabenfamilien bleiben klein genug fuer den GE-Alltag.
- Die Auswahl ist lokal und anonym nutzbar.

### Datenschutz / Safety
- Keine echten Lernendendaten.
- Keine Namen, Diagnosen, Geburtsdaten, Elterninfos oder Klassenlisten.
- Keine Cloud-, Login- oder Exportpflicht.
- Keine geschuetzten Symbolclaims.
- Keine versteckte Bewertung.

## Offene Annahmen
- Ich gehe davon aus, dass Alpha 34B lokal bleiben soll und keine Speicherung echter Lernendendaten erhaelt.
- Ich gehe davon aus, dass die App weiterhin eher Planungs- als Testwerkzeug sein soll.
- Ich gehe davon aus, dass das Modell bewusst klein und klar bleiben muss, damit es im GE-Alltag nutzbar ist.

## Kurzfazit
Alpha 34A sollte nicht versuchen, Lernen zu messen, sondern Lernanschluesse sichtbar zu machen. Das Modell ist dann gut, wenn eine Lehrkraft in wenigen Sekunden erkennt: Welche Stufe passt heute, welche Hilfe braucht es, und warum ist der naechste Schritt fachlich stimmig?
