# GE-Spielraum-Pattern

## Zweck

Ein GE-Spielraum ist ein ruhiger, lokaler Lernraum fuer eine konkrete Handlung. Er ersetzt Formular- oder Dashboardlogik im Kindermodus durch eine sichtbare Aufgabe, grosse Touchziele, positive Hilfen und getrennte Lehrkraftlogik.

Das Pattern entstand aus dem getesteten Standalone-Prototyp `Gartenpost - Zeig, wohin die Karte geht`. Es soll kuenftige Lernwerkstatt- und LeseWerk-Slices kleiner, kindgerechter und pruefbarer machen.

## Pflichtmerkmale

- Eigener visueller Raum, nicht Formular, Tabelle oder Dashboard.
- Eine klare Hauptaktion pro Bildschirm.
- Grosses zentrales Lernobjekt: Karte, Menge, Wort, Symbol, Gegenstand oder Bild.
- Zwei bis vier grosse Touchziele.
- Antippen ist die Hauptbedienung; Drag kann zusaetzlich existieren, darf aber nicht noetig sein.
- Hilfe ist sichtbar und positiv: weniger Auswahl, vormachen, Zielhinweis, Symbolhinweis, Pause oder gemeinsame Handlung.
- Feedback ist kurz, wertschatzend und handlungsnah.
- `Nochmal`, `Hilfe` und `Fertig` oder gleichwertige Aktionen sind jederzeit erreichbar.
- Lehrkraft-/Beobachtungslogik ist getrennt vom Kinderbereich.
- Keine Punkte, Timer, Rankings, rote Fehlerdramaturgie, Diagnosesprache oder echten Namen.
- Keine externen Assets, kein Tracking, keine Cloud und keine personenbezogenen Rohdaten.

## Komponentenmodell

### `GameSpace`

Der sichtbare Spielraum. Er enthaelt eine ruhige Umgebung, eine knappe Orientierung und die Kind-Aktionen. Er soll eher wie ein Lernspielraum wirken als wie eine App-Verwaltung.

### `FocusObject`

Das zentrale Lernobjekt:

- bei Gartenpost: Bildkarte;
- bei Mengen: Menge-Matte, Steine oder Zahlbild;
- bei Lesen: Wortkarte, Silbenkarte oder Bild-Wort-Karte;
- bei Sachunterricht/Lebenspraxis: reales Symbol, Ablaufkarte oder Gegenstand.

### `ChoiceTargets`

Zwei bis vier grosse Ziele fuer Auswahl, Zuordnung oder Handlung. Ziele muessen stabil stehen, gut antippbar sein und duerfen bei schmaler Breite nicht ueberlappen.

### `SupportBar`

Ruhige Aktionsleiste mit:

- `Hilfe`;
- `Nochmal`;
- `Fertig`;
- optional `Pause`;
- optional `Zurueck` als sekundärer Ausgang.

### `FeedbackBubble`

Kurze Rueckmeldung nach der Handlung. Sie beschreibt, was passiert ist, nicht wer besser oder schlechter war.

Gute Beispiele:

- `Die Karte ist angekommen.`
- `Passt. Die Menge ist gelegt.`
- `Du hast Hilfe genutzt.`
- `Nochmal ist okay.`

Nicht verwenden:

- `falsch`;
- `du hast verloren`;
- `Note`;
- `Punkte`;
- `schneller`;
- `besser als`.

### `TeacherDrawer`

Getrennter Lehrkraftbereich. Er darf Beobachtungslogik enthalten, aber nicht den Kinderraum dominieren.

Erlaubt:

- Level A/B/C;
- Hilfegrad;
- Kommunikationsform;
- naechster kleiner Schritt;
- situative 1-10-Einschaetzung nur im Lehrkraftbereich.

Nicht erlaubt:

- echte Namen;
- Diagnosen;
- automatische Bewertung;
- Export oder Speicherung ohne gesonderte Freigabe;
- 1-10-Skala im Kinderbereich.

## UX-Regeln fuer den Kindermodus

1. Das Kind sieht zuerst die Handlung, nicht die Verwaltung.
2. Text ist kurz und konkret.
3. Die Aufgabe bleibt sichtbar, waehrend Hilfe angeboten wird.
4. Hilfe reduziert Komplexitaet, statt Fehler zu dramatisieren.
5. Abschluss ist erlaubt: `Fertig` darf eine echte Handlung sein.
6. Wiederholung ist positiv: `Nochmal` ist kein Zuruecksetzen nach Fehler.
7. A/B/C ist eine Anpassung fuer die Lehrkraft, keine Leistungsrangliste.
8. Bewegungen sind ruhig und duerfen die Aufgabe nicht verdecken.
9. Schmale Breite und Tablet/Smartboard muessen mitgeprueft werden.

## Lehrkraft- und Beobachtungsregeln

Der Lehrkraftbereich soll die naechste paedagogische Entscheidung erleichtern, aber keine Diagnose behaupten.

Sinnvolle Beobachtungen:

- Welche Hilfe wurde genutzt?
- War weniger Auswahl noetig?
- Hat das Kind gezeigt, gesprochen, getippt oder mit Gegenstand reagiert?
- Wurde die Aufgabe wiederholt?
- Welcher naechste kleine Schritt passt?

Grenzen:

- keine echten Schuelernamen;
- keine Diagnose;
- keine Notenlogik;
- keine automatische Foerderplanentscheidung;
- keine Cloud- oder Exportlogik im Spielraum.

## Datenschutz- und Asset-Regeln

- Standalone-Prototypen duerfen nur lokale Platzhalter nutzen.
- Emojis sind nur Platzhalter, nicht automatisch lizenzsichere Unterrichtsassets.
- Fuer echte Unterrichtsnutzung muessen lokale, lizenzsichere Symbol-/Bildassets geplant werden.
- Keine externen URLs, CDNs, Tracking, APIs, Foto-Uploads oder Speichermechanismen im Kinderspielraum.
- Keine Schueler-, Eltern-, Familien-, Diagnose- oder Gesundheitsdaten.

## Uebertragung auf GE-Lernwerkstatt

Geeignete Bereiche:

- Mengen legen;
- Symbolsortieren;
- Zuordnen nach Merkmalen;
- Lebenspraxis, z. B. Tisch decken oder Post sortieren;
- Kommunikation/UK, z. B. `mehr`, `fertig`, `Pause`, `nochmal`;
- Wahrnehmung und Motorik.

Erster sinnvoller App-Slice:

1. Nicht die ganze App umbauen.
2. Eine bestehende Uebung in einen ruhigen Spielraum heben.
3. Hauptnavigation im Spielraum reduzieren.
4. Lehrkraftlogik sekundaer halten.
5. Eine Runde, eine Hilfe und schmale Breite pruefen.

## Uebertragung auf LeseWerk

Geeignet fuer Leseuebungen mit:

- grosser Wort- oder Silbenkarte;
- zwei bis vier Bild-/Silben-/Wortzielen;
- Antippen der Karte und Antippen des Zieles;
- Hilfe `weniger Auswahl`;
- Hilfe `gemeinsam lesen` oder `laut vorsprechen`;
- ruhigem Feedback ohne Testdruck;
- getrenntem Lehrerhinweis fuer naechsten Leseschritt.

Beispiel:

- `FocusObject`: Wortkarte `Mama`;
- `ChoiceTargets`: Bildkarten oder Wortziele;
- `SupportBar`: `Hilfe`, `Nochmal`, `Fertig`;
- `TeacherDrawer`: bekannte Grapheme/Silben, Hilfeform, naechster kleiner Schritt.

## Do / Don't

Do:

- Aufgabe sichtbar und direkt startbar machen.
- Touchziele gross halten.
- Hilfen als normale Lernhandlung zeigen.
- Beobachtung trennen.
- Lokal und datensparsam bleiben.
- Erst einen Slice pruefen, dann erweitern.

Don't:

- Spielraum als Formular bauen.
- Lehrkraftnavigation im Kinderbereich dominieren lassen.
- Neue Grossbibliotheken oder externe Assets einbauen.
- Punkte, Timer, Ranking, rote Fehlerzustände oder Diagnosesprache nutzen.
- Mehrere neue Spiele gleichzeitig bauen.
- Pattern ungeprueft in LeseWerk oder Lernwerkstatt kopieren.

## Pruefcheckliste fuer kuenftige Slices

- [ ] Grosse Startkachel oder klarer Einstieg vorhanden.
- [ ] Eigener Spielraum statt Formular/Dashboard.
- [ ] Genau eine Hauptaktion pro Bildschirm.
- [ ] Zentrales Lernobjekt sichtbar.
- [ ] Zwei bis vier grosse Touchziele.
- [ ] `Hilfe`, `Nochmal`, `Fertig` oder gleichwertige Aktionen vorhanden.
- [ ] Mindestens eine Hilfe reduziert, modelliert oder markiert.
- [ ] Wertschätzendes Feedback sichtbar.
- [ ] Lehrkraftlogik getrennt.
- [ ] Keine 1-10-Skala im Kinderbereich.
- [ ] Keine Punkte, Timer, Rankings oder rote Fehlerdramaturgie.
- [ ] Keine echten Daten, keine Cloud, keine externen Assets.
- [ ] Vollstaendige Runde getestet.
- [ ] Hilfe getestet.
- [ ] Schmale Breite getestet.
- [ ] Ergebnisbericht nennt Risiken und naechsten kleinen Schritt.
