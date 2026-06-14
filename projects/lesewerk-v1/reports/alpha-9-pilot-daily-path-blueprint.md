# LeseWerk Alpha 9 – Pilot- und Daily-Path-Blueprint

Status: Entwurf für Implementierung
Datum: 2026-05-17

## 1. Ziel des Slices

Alpha 9 soll die gewachsene Inhalte-Bibliothek für einen ruhigen GE-Klassenalltag nutzbar machen. Der Fokus liegt nicht auf mehr Content, sondern auf einer kleinen, klaren Tagesauswahl und einem kurzen Pilotablauf für die Lehrkraft.

Kernidee:
- Das Kind sieht nicht die ganze Bibliothek.
- Das Kind sieht heute nur wenige Karten.
- Die Lehrkraft sieht einen klaren Pilotablauf mit Beobachtung und sicherer Datenschutzgrenze.

## 2. Ausgangslage aus den bestehenden Dateien

Aus den Reviews und der Produkt-Spec ergeben sich diese Leitplanken:

- Alpha 8 ist akzeptiert und enthält 24 Stories und 48 Lernaufgaben.
- Die Menge ist grundsätzlich gut, kann aber für den Kinderpfad schnell zu groß wirken.
- In `src/App.tsx` gibt es bereits eine Trennung in Kinderpfad und Lehrkraftbereich.
- Es gibt bereits reduzierte Auswahlfunktionen in `src/lesewerk-content.mjs`.
- Es gibt bereits anonyme Profile, Support-Wahl, lokale Druckvorschau und Reset.
- Die App soll lokal, anonym und ohne Login oder Cloud funktionieren.

Alpha 9 sollte diese vorhandene Struktur nur verdichten, nicht umständlicher machen.

## 3. Vorschlag für den 10–15-Minuten-Pilot in der GE-Klasse

Der Pilot soll in einer normalen Unterrichtssituation funktionieren: kurz, überschaubar, mit wenig Wechseln und klarer Lehrkraftsteuerung.

Empfohlener Ablauf:

### Phase 1: Einstieg und Orientierung – 1 bis 2 Minuten
- Lehrkraft öffnet den Kinderpfad.
- Es wird ein anonymes Farbprofil gewählt, z. B. Blau, Grün oder Sonne.
- Die Lehrkraft benennt knapp: „Heute lesen wir nur ein paar Karten.“
- Ein Support-Start ist erlaubt, z. B. Bildhilfe oder Silbenfarben.

Was hier beobachtet wird:
- Kommt die lernende Person in den Start hinein?
- Wird die Orientierung durch wenige sichtbare Elemente erleichtert?
- Wird eine Hilfe direkt genutzt oder abgelehnt?

### Phase 2: Kurze Tagesauswahl – 2 bis 3 Minuten
- Es werden nur 3 bis 4 Karten sichtbar gezeigt.
- Die Auswahl besteht aus:
  - 2 Wort- oder Silbenkarten,
  - 1 Story- oder Satzkarte,
  - optional 1 Wiederholungskarte.
- Die Lehrkraft darf aktiv vorwählen.

Ziel:
- Das Kind erlebt eine kleine, machbare Auswahl.
- Kein Bibliotheksgefühl, sondern ein klarer Tagespfad.

### Phase 3: Bearbeitung der ersten Karte – 2 bis 3 Minuten
- Das Kind liest oder bearbeitet eine erste Karte.
- Bei Bedarf wird eine Hilfe zugeschaltet:
  - Bildhilfe,
  - Silbenfarben,
  - Vorlesen,
  - reduzierte Auswahl.
- Danach folgt direkt eine einfache Rückmeldung.

Was beobachtet wird:
- Beginn der Aufgabe ohne lange Wartezeit?
- Blick auf Material, Zeigen, Nachsprechen, Auswählen, Wiederholen?
- Welche Hilfe war tatsächlich nützlich?

### Phase 4: Zweite Karte mit kleiner Variation – 2 bis 3 Minuten
- Eine zweite Karte mit ähnlichem Muster wird angeboten.
- Möglichst nur eine kleine Veränderung: anderes Wort, anderes Bild, gleiche Struktur.
- Wenn möglich, wird die zweite Karte leichter oder gleich schwer gehalten, nicht deutlich komplexer.

Ziel:
- Wiederholung mit Variation statt Sprung.

### Phase 5: Kurze Sicherung und Abschluss – 2 bis 3 Minuten
- Lehrkraft schaut auf den ruhigen nächsten Schritt.
- Das Kind wählt zwischen:
  - nochmal,
  - leichter,
  - weiter,
  - fertig.
- Wenn die Sitzung gut lief, wird kurz beendet.
- Wenn das Kind noch stabil ist, kann eine Wiederholung folgen.

Wichtiger Punkt:
- Der Abschluss ist ein Unterrichtsabschluss, kein Testabschluss.

## 4. Kinderfacing Daily Path: kleine Karten statt ganze Bibliothek

Die tägliche Oberfläche soll das Gefühl geben: „Heute ist mein kleiner Weg.“

Empfohlene Struktur:
- maximal 3 bis 4 Karten sichtbar;
- klare Reihenfolge;
- nur eine aktive Karte im Fokus;
- eine Karte kann wiederholt werden;
- die restlichen Inhalte bleiben in der Bibliothek verborgen oder nachrangig.

Praktischer Vorschlag für den Tagespfad:
1. 1 Wort- oder Silbenkarte als Einstieg.
2. 1 weitere Wort- oder Silbenkarte mit ähnlicher Struktur.
3. 1 Story- oder Satzkarte.
4. optional 1 Wiederholungskarte oder Abschlusskarte.

Die Kindersicht soll nicht wie eine Sammlung von 24 Stories wirken. Sie soll wie eine kleine Folge von heute ausgewählten Karten wirken.

## 5. Wie „Heute“ von der großen Bibliothek unterschieden wird

Ohne komplexe Navigation wird der Unterschied am besten über eine einfache Sichtbarkeitslogik gelöst.

Empfohlene Minimal-Logik:
- Es gibt einen klar benannten Bereich wie „Heute lesen“ oder „Tagesweg“.
- Nur dort werden die wenigen Tageskarten gezeigt.
- Die übrigen Stories und Aufgaben bleiben in einem separaten, klar als Bibliothek erkennbaren Bereich.
- Die Bibliothek darf vorhanden sein, aber sie ist nicht die erste Sicht.

Einfacher UI-Gedanke:
- „Heute lesen“ = kuratierte kleine Auswahl
- „Alle Geschichten / alle Aufgaben“ = vollständige Bibliothek

Wichtig:
- Es braucht keine aufwendige Filtermaschine, kein komplexes Drag-and-drop, keine Planungsoberfläche mit vielen Optionen.
- Einfache Kuratierung reicht: wenige Karten sichtbar, Rest im Hintergrund.

Empfohlene Designentscheidung:
- Der Tagespfad ist eine feste, ruhige Startfläche.
- Die Bibliothek bleibt sekundär und nur bei Bedarf erreichbar.

## 6. Welche Karten heute sichtbar sein sollen

Für den täglichen Pfad reicht eine kleine Standardgruppe.

Empfehlung:
- 2 Karten aus dem Wort-/Silbenbereich;
- 1 Karte aus dem Story-/Satzbereich;
- 1 optionale Wiederholung oder freie Entscheidung.

Auswahlregeln:
- einfache, bekannte Wörter zuerst;
- möglichst wiederkehrende Satzmuster;
- keine hohe Sprunghaftigkeit zwischen den Karten;
- im Zweifel lieber ähnliche Karten als neue, ungewohnte Karten.

Beispiel für die Auswahl aus dem vorhandenen Bestand:
- eine sehr sichere Wortkarte,
- eine zweite Wortkarte mit kleiner Variation,
- eine bekannte Story mit klarer Bildfrage,
- optional ein leichter Rückgriff auf die erste Karte.

## 7. Was die Lehrkraft beobachten soll

Die Beobachtung soll sehr konkret und datensparsam sein. Beobachtet werden nur sichtbare Lernhandlungen und Unterstützungsbedarf im Moment.

Beobachtungsschwerpunkte:
- Einstieg gelingt oder braucht Anbahnung.
- Das Kind bleibt an einer Karte.
- Das Kind wählt zwischen wenigen Optionen.
- Das Kind nutzt eine Hilfe sichtbar.
- Das Kind kann wiederholen.
- Das Kind benötigt Reduktion statt Erweiterung.
- Das Kind wechselt sicher in den Abschluss.

Geeignete Beobachtungsformulierungen:
- „Start mit kurzer Orientierung gelungen.“
- „Bildhilfe wurde angenommen.“
- „Bei zwei Optionen war die Auswahl sicherer als bei vier Optionen.“
- „Wiederholung half beim Weiterarbeiten.“
- „Die Story-Karte war nach Wortkarten noch gut bearbeitbar.“

Nicht sinnvoll ist:
- schnelle Fehlerzählung,
- Ranking,
- Leistungsdruck,
- interpretierende Diagnosesprache.

## 8. Was nicht recorded werden darf

Für den Pilot ist wichtig, dass nichts Unnötiges oder Personenbezogenes dokumentiert wird.

Nicht aufnehmen:
- echte Namen;
- Geburtsdaten;
- Diagnosen;
- Familieninformationen;
- Adressen;
- Fotos oder Audioaufnahmen;
- detaillierte Verhaltensbiografien;
- Zeitmessung als Leistungswert;
- Scores, Noten oder Rankings;
- sensible Einzelfalldeutungen;
- Cloud- oder Accountdaten.

Wenn überhaupt dokumentiert wird, dann nur anonymisiert und funktional:
- Profilfarbe;
- genutzte Hilfe;
- sichtbarer Einstieg;
- sichtbarer Abbruchpunkt;
- nächster kleiner Schritt.

## 9. Stop-/Assist-Regeln für den Pilot

Die Regeln sollen der Lehrkraft helfen, schnell und ruhig zu entscheiden.

### Wiederholen
Wiederholen, wenn:
- das Kind die Aufgabe fast geschafft hat;
- die gleiche Struktur mit etwas mehr Ruhe sinnvoll scheint;
- die Hilfe gut angenommen wurde;
- die nächste Karte nur eine kleine Variation braucht.

### Auswahl reduzieren
Reduzieren, wenn:
- die Lernende Person zwischen zu vielen Karten unsicher wird;
- Blick abwandert und die Entscheidung sichtbar zu groß ist;
- die Auswahl stockt;
- das Kind bei 4 Optionen überfordert wirkt.

Praktische Reduktion:
- von 4 auf 2 Karten,
- von Story plus Auswahl auf nur eine klare Antwort,
- von freier Wahl auf Lehrkraftvorwahl.

### Stoppen
Stoppen, wenn:
- das Kind deutlich überlastet wirkt;
- die Aufmerksamkeit kippt und keine Rückkehr gelingt;
- wiederholte Hilfen keine Stabilisierung bringen;
- die Sitzung in Unruhe oder Frust kippt;
- das Kind keine weitere Karte mehr sinnvoll bearbeiten kann.

### Support wechseln
Support wechseln, wenn:
- eine Hilfe offensichtlich nicht trägt;
- Bildhilfe nicht reicht, aber Vorlesen hilft;
- Vorlesen zu viel ist, aber Reduktion hilft;
- Silbenfarben zu wenig helfen, aber Objekt-/Bildhilfe hilft;
- die Reihenfolge stabiler wird, wenn die Lehrkraft die Auswahl stärker steuert.

Merksatz:
- Erst mehr Struktur, dann weniger Auswahl, dann ggf. Pause.

## 10. Konkrete Teacher-Notiz für den Abschluss des Pilots

Am Ende sollte die Lehrkraft nur eine kurze, sichere Einschätzung notieren können:
- Welche Karten waren gut zugänglich?
- Welche Hilfe hat geholfen?
- Wo wurde reduziert?
- Wo war ein Stopp sinnvoll?
- Welcher nächste kleine Schritt passt morgen?

Beispiel:
- „Heute funktionierten zwei Wortkarten und eine kurze Story mit Bildhilfe. Bei vier sichtbaren Karten wurde reduziert. Nächster Schritt: wieder mit zwei Wortkarten starten.“

## 11. Minimaler Implementierungsvorschlag für den coder

Ohne komplexe neue Navigation sollte die Umsetzung ungefähr so aussehen:

- neuer sichtbarer Einstieg „Heute lesen“ oder „Tagesweg“;
- 3 bis 4 sichtbar kuratierte Karten;
- klare Unterscheidung zwischen Tagesweg und Bibliothek;
- bestehende Kinderpfad-Struktur weiterverwenden;
- Lehrkraftbereich bleibt getrennt;
- Support- und Reset-Funktionen bleiben erhalten;
- keine neuen Backend-Abhängigkeiten.

Die Umsetzung sollte die bestehenden reduzierten Auswahlfunktionen nutzen und nicht durch ein neues Navigationssystem ersetzen.

## 12. Acceptance Criteria für die Implementierung

Alpha 9 ist aus dieser Blueprint-Sicht umsetzbar, wenn alles Folgende erfüllt ist:

1. Es gibt einen klar erkennbaren Kinderbereich für den täglichen Pfad.
2. Der tägliche Pfad zeigt nur wenige Karten gleichzeitig.
3. Die große Bibliothek ist von der Tagesauswahl unterscheidbar.
4. Die Lehrkraft kann einen 10–15-Minuten-Pilot einfach durchführen.
5. Es gibt klare Beobachtungspunkte für Einstieg, Hilfe, Reduktion, Wiederholung und Stopp.
6. Es werden keine personenbezogenen Daten oder sensiblen Inhalte verlangt oder gespeichert.
7. Der Pilot bleibt lokal, anonym und ohne Login.
8. Der Nutzerpfad bleibt ruhig, einfach und GE-tauglich.
9. Die App kann nach der Sitzung einfach zurückgesetzt werden.
10. Die Implementierung bleibt klein genug, um ohne neue komplexe Navigation auszukommen.

## 13. Entscheidung für Alpha 9

Empfehlung:
- Zuerst die Tagespfad-Logik bauen.
- Die Bibliothek nur sekundär sichtbar lassen.
- Kein großer Umbau der Navigation.
- Der Pilot soll im Schulalltag schnell verständlich und wiederholbar sein.

Kurzform für die Umsetzung:
- wenige Karten;
- klare Tagesfläche;
- einfache Bibliotheksabgrenzung;
- datensparsame Beobachtung;
- klare Stop-/Assist-Regeln.
