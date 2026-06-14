# Alpha 21 - Current Content Gap Analysis

Datum: 2026-05-18
Status: Analyse gegen das Alpha-21-Curriculum-Modell

## Kurzfazit

Der aktuelle Content ist fuer einen lokalen Alpha-Prototypen stark, aber noch nicht ausreichend kontrolliert fuer ein echtes Buchstaben-/Graphemprofil. Es gibt 48 Lernaufgaben, 24 Mini-Geschichten, drei Aufgabentypen und eine gute Mama-Schrittkarte. Fuer S-Tier-Lesecurriculum fehlen jedoch systematische Metadaten: benoetigte Grapheme, Satzbausteine, Silbenmuster, erlaubte Entwicklungsstufe, Textmenge, Distraktor-Schwierigkeit und Qualitaetsstatus.

Die aktuelle Mama-Karte passt am besten zum zukuenftigen Modell, weil sie eine klare Progression Wort -> Silben -> Wort bauen -> Satz -> Mini-Geschichte -> Pause zeigt. Sie muss aber spaeter streng getaggt werden: `Mama ist da.` darf nur erscheinen, wenn nicht nur M/a/m, sondern auch die Satzbausteine `ist` und `da` als mitlesbar/unterstuetzt freigegeben sind.

## Gelesene Quellen im Projekt

- `reports/alpha-20-watchdog-review.md`
- `reports/alpha-20-tablet-practice-review.md`
- `reports/alpha-19-watchdog-review.md`
- `reports/alpha-19-mama-step-card-report.md`
- `reports/alpha-18-word-inventory-report.md`
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`

## Aktueller Inhaltsbestand

Aus `src/lesewerk-content.mjs` und Tests:

- 48 Lernaufgaben.
- 24 Mini-Geschichten.
- Aufgabentypen:
  - `image-word-match`: 16
  - `syllable-blend`: 16
  - `word-picture-match`: 16
- Level:
  - A: 16
  - B: 16
  - C: 16
- Guided Reading Chain:
  - Aufgabe: `b-ma-ma`
  - Wort: `Mama`
  - Silben: `Ma` / `ma`
  - Satz: `Mama ist da.`
  - Mini-Geschichte: `Mama ist da.`, `Mama winkt.`, `Wir lesen ruhig.`
  - Schritte: Wort ansehen, Silben lesen, Wort bauen, Satz lesen, Mini-Geschichte, Pause.

## Welche aktuellen Woerter/Aufgaben sind bereits fuer kontrollierte Letter-Profile nutzbar?

### Sehr starke Kandidaten fuer fruehe Profilsteuerung

#### Mama / `b-ma-ma`

- Benoetigte sichtbare Kernzeichen: M, a, m.
- Silben: Ma, ma.
- Muster: Wiederholungswort CV-CV.
- Staerke: ideal fuer Profil M + A, wenn Kleinbuchstabe m/a beruecksichtigt wird.
- Grenze: aktuelle Aufgabe hat Distraktoren `Momo`, `Mimi`; diese enthalten o/i und duerfen bei einem reinen M+A-Profil nicht erscheinen.
- Empfehlung: Fuer Alpha 22 als erster Kontrolltest nutzen, aber Distraktorlogik profilabhaengig pruefen.

#### Sofa / `b-so-fa`

- Benoetigte Zeichen: S/s, o, f, a.
- Silben: So, fa.
- Muster: CV-CV.
- Staerke: sehr guter Transfer fuer Profil M+A+S+O+F, wenn `Sofa` alltagsnah/konkret eingefuehrt ist.
- Grenze: Distraktoren `Sonne`, `Salat` enthalten n/e/l/t; sie sind frueh nicht profilrein.
- Empfehlung: Als zweiter Alpha-22/23-Kandidat, aber mit neuen kontrollierten Distraktoren oder 2-Karten-Modus.

#### Lama / `b-la-ma`

- Benoetigte Zeichen: L/l, a, m.
- Silben: La, ma.
- Muster: CV-CV, nah an Mama.
- Staerke: ideal fuer Transfer `Mama` -> `Lama`, wenn L zusaetzlich bekannt ist.
- Grenze: Distraktoren `Sofa`, `Rose` enthalten unbekannte Zeichen.
- Empfehlung: Sehr guter Kandidat fuer Alpha 24 Transferkette.

#### Limo / `b-li-mo`

- Benoetigte Zeichen: L/l, i, m, o.
- Silben: Li, mo.
- Muster: CV-CV.
- Staerke: passt zu Profil L+A+M+I+O teilweise, wenn A nicht noetig ist und I/O sicher sind.
- Grenze: Wort ist alltagsnah, aber weniger basal als Mama/Sofa/Lama; Distraktoren enthalten unbekannte Zeichen.
- Empfehlung: Spaeterer Transferkandidat, nicht erster Einstieg.

### Gute Ganzwort-/Bildwort-Kandidaten, aber nicht graphemrein frueh

- Ball: konkret, sehr stark im Alltag; aber B/a/l/l, geschlossene Silbe, Doppel-l.
- Bus: konkret, einsilbig; braucht B/u/s.
- Hut: konkret; braucht H/u/t.
- Buch: konkret; enthaelt `ch`, spaeteres Graphem.
- Tasse: konkret; aber `ss`, e und Silbentrennung `Tas-se` komplexer.
- Haus/Maus: konkret; aber `au` als Diphthong.

Diese Woerter koennen fuer Ganzwortlesen und Bild-Wort-Zuordnung stark sein, sind aber nicht automatisch fruehe Buchstabenprofil-Woerter.

## Welche aktuellen Items sind zu breit oder nicht genug getaggt?

### Level A/B/C ist nicht ausreichend

Aktuelle Level A, B, C sagen nicht genau:

- welche Grapheme benoetigt werden;
- ob Gross-/Kleinbuchstaben vorkommen;
- ob ein Mehrzeichen-Graphem vorkommt;
- ob das Wort offen CV-CV oder geschlossen/Cluster ist;
- ob Distraktoren unbekannte Zeichen enthalten;
- welche Entwicklungsstufe minimal passt.

Beispiel:

- `a-haus` wirkt Level A, enthaelt aber `au`.
- `a-licht` wirkt Level A, enthaelt aber `ch`.
- `b-schu-le` enthaelt `sch`.
- `c-fisch`, `c-schule`, `c-licht` enthalten `sch/ch` und sind fuer fruehe Graphemprofile ungeeignet.

### Distraktoren sind noch nicht profilkontrolliert

Viele Aufgaben haben gute semantische Distraktoren, aber nicht graphemkontrollierte Distraktoren:

- `b-ma-ma`: `Momo`, `Mimi` fuehren o/i ein.
- `b-so-fa`: `Sonne`, `Salat` fuehren n/e/l/t ein.
- `b-la-ma`: `Sofa`, `Rose` fuehren S/o/f/R/e ein.
- `c-maus`: `Mond`, `Mama` enthalten verschiedene Profile; `Maus` selbst hat `au`.

Fuer spaetere Alphas braucht jede Antwortoption eigene Anforderungen. Eine Aufgabe ist nicht nur wegen des Zielworts erlaubt; auch Optionen muessen kontrolliert sein.

### Geschichten sind inhaltlich ruhig, aber fuer Profilsteuerung zu wenig segmentiert

Mini-Geschichten haben gute Struktur: 3 kurze Saetze, Fokuswort, 2 Antwortoptionen. Es fehlt aber:

- Graphemliste pro Satz;
- bekannte/unkannte Satzbausteine;
- Wortanzahl pro Satz als Metadatum;
- Satzrahmen-Typ;
- Vorlese-/Mitlese-Status;
- Entscheidung, ob Text selbst gelesen werden soll oder nur gehoert/mitverfolgt.

Beispiel `Mama ist da`:

- Zielwort `Mama` ist graphemisch sehr gut kontrollierbar.
- Satzbausteine `ist`, `da` sind aber neue Einheiten.
- `Mama winkt.` fuehrt w/i/n/k/t ein.
- `Wir lesen ruhig.` fuehrt W/i/r/l/e/s/n/u/h/g und das abstraktere Wort `ruhig` ein.

Fazit: Als Vorlese-/Mitlesegeschichte mit Zielwortfokus gut; als selbststaendige Leseaufgabe fuer M+A-Profil nicht erlaubt.

## Fehlende Metadaten

Fuer S-Tier-Expansion braucht jede Aufgabe mindestens:

1. `requiredGraphemes`: alle sichtbaren Buchstaben/Grapheme im Zieltext.
2. `requiredOptionGraphemes`: Grapheme in Antwortoptionen/Distraktoren.
3. `requiredSyllables`: z.B. Ma, ma, So, fa.
4. `syllablePattern`: CV, CV-CV, CVC, Cluster, Digraph, Diphthong.
5. `requiredWords`: bekannte Ganzwoerter, falls Aufgabe auf Ganzwortlesen basiert.
6. `requiredSentenceFrames`: z.B. "X ist da".
7. `minReadingStage`: 2-10 nach Alpha-21-Modell.
8. `maxTextAmount`: Zeichen, Silben, Woerter, Saetze.
9. `choiceCountDefault` und `choiceCountReduced`.
10. `supportAllowed`: Bildhilfe, Silbenfarben, Vorlesen, Gebaerdenhinweis, Reduktion.
11. `qualityStatus`: draft / reviewed_safe / teacher_demo_only / avoid_for_now.
12. `concreteContext`: Zuhause, Schule, Koerper, Essen, Objekt, Routine.
13. `avoidEarlyReason`: falls Wort frueh sichtbar ist, aber graphemisch schwer.

## Staerkste erste Kandidaten fuer kontrollierte Expansion

### 1. Mama

Warum stark:

- emotional/alltagsnah, aber ohne reale Personendaten;
- einfache Wiederholung;
- M+A-Profil moeglich;
- bestehende Schrittkarte vorhanden;
- bereits browser- und tabletgeprueft.

Vorsicht:

- Nicht mit echten Familienkontexten personalisieren.
- Satz/Geschichte nur als Hilfe/Vorlesen, bis Satzbausteine freigegeben sind.

### 2. Lama

Warum stark:

- direkter Transfer Mama -> Lama;
- nur L als neue Schwierigkeit;
- CV-CV;
- gut fuer Musterlernen.

Vorsicht:

- Bild/Symbol muss lizenziert/lokal sein.
- Nicht mit zu vielen Tierwoertern streuen.

### 3. Sofa

Warum stark:

- alltagsnahes Objekt;
- Profil M+A+S+O+F kann `So` + `fa` kontrollieren;
- gute Bruecke zu Objektwort.

Vorsicht:

- Distraktoren aktuell nicht profilrein.
- S/s und F/f muessen wirklich bekannt sein.

### 4. Limo

Warum stark:

- CV-CV, gute offene Silben;
- passt zu L/I/M/O-Profil.

Vorsicht:

- alltags-/ernaehrungspaedeutisch je nach Klasse nicht immer ideal als erster Wortschatz;
- weniger basal als Mama/Sofa/Lama.

### 5. Bus / Hut / Ball als Ganzwortkandidaten

Warum stark:

- konkrete, bildstarke Woerter;
- gut fuer Wort-Bild-Zuordnung und Klassenalltag.

Vorsicht:

- nicht frueh als Silbenverschmelzung verkaufen;
- geschlossene Silben/Doppelkonsonanz sind nicht gleich leicht.

## Woerter, die frueh vermieden oder nur als Lehrkraft-/Vorlesematerial genutzt werden sollten

Nicht frueh als profilkontrollierte Leseaufgabe:

- `Schule`, `Fisch`, `Tasche`, `Buch`, `Licht`: wegen sch/ch oder komplexer Grapheme.
- `Haus`, `Maus`: wegen `au`.
- `Blume`, `Brot`, `Platz`, `Stift`: wegen Cluster/geschlossener Strukturen.
- `Fenster`: wegen Laenge und komplexer Silbenstruktur.
- `Freude`, `Frage`, `Ruhe`, `Hilfe`: teils abstrakter oder semantisch anspruchsvoller; besser spaeter und mit Kontext.
- `Tomate`, `Banane`: dreisilbig; erst wenn zweisilbige Verschmelzung stabil ist.

Diese Woerter sind nicht schlecht. Sie sind nur nicht erste Kandidaten fuer streng kontrollierte Buchstabenprofile.

## Passt die aktuelle Mama-Karte zum Zukunftsmodell?

### Ja, als Strukturmodell

Die Mama-Karte ist die beste vorhandene Blaupause fuer Alpha 21:

1. Wort ansehen.
2. Silben lesen: Ma / ma.
3. Wort bauen.
4. Satz lesen.
5. Mini-Geschichte.
6. Pause.

Das passt sehr gut zu den Stufen 5-8 und zur Idee einer ruhigen, lehrkraftgefuehrten Lesekette.

### Nur eingeschraenkt, als graphemreine Aufgabe

Fuer ein Profil "kennt nur M + A" duerfen nur die ersten Schritte sicher als Leseaufgabe gelten:

- Wort ansehen `Mama`: moeglich, wenn M/m/A/a freigegeben.
- Silben `Ma`/`ma`: moeglich, wenn M/m/A/a auf Laut-/Silbenebene freigegeben.
- Wort bauen `Mama`: moeglich ab Stufe 5.

Nicht automatisch freigegeben:

- Satz `Mama ist da.`: braucht `ist`, `da` oder muss als vorgelesener Satzbaustein markiert sein.
- `Mama winkt.`: enthaelt viele unbekannte Zeichen.
- `Wir lesen ruhig.`: fuer fruehe Profile zu breit und semantisch/orthografisch schwerer.

### Empfehlung fuer spaetere Modellierung

Die Mama-Kette sollte nicht als eine einzige Aufgabe mit einem einzigen Level gespeichert werden. Sie sollte aus Teilanforderungen bestehen:

- `mama.word.look`: M/a/m, Stufe 5/6.
- `mama.syllables.read`: Ma, ma, Stufe 4/5.
- `mama.word.build`: Ma + ma, Stufe 5.
- `mama.sentence.ist-da`: Mama + Satzbausteine ist/da, Stufe 7.
- `mama.story.listen`: Zielwort Mama, Vorlesen erlaubt, Stufe 8.
- `mama.pause`: immer erlaubt.

## Konkrete Gap-Liste fuer Alpha 22

Prioritaet 1:

- Reine Metadatenstruktur fuer Grapheme und Anforderungen anlegen.
- Keine Content-Erweiterung.
- Erste Tests fuer `b-ma-ma`, `b-so-fa`, `b-la-ma`.

Prioritaet 2:

- Distraktoren als eigene Anforderungen erfassen.
- Aufgabenfilter muss auch Antwortoptionen pruefen.

Prioritaet 3:

- Satzbausteine als eigene Einheiten modellieren.
- `ist da` nicht automatisch als bekannt behandeln.

Prioritaet 4:

- Storytexte in Satzkarten segmentieren: selbst lesen vs. vorlesen/mitlesen.

Prioritaet 5:

- Qualitaetsstatus pro Aufgabe einfuehren: `reviewed_safe`, `teacher_demo_only`, `avoid_for_now`.

## Entscheidung

Der aktuelle Content ist als Alpha-Basis geeignet, aber ohne Alpha-21/22-Metadaten nicht sicher genug fuer automatische profilbasierte Aufgabenwahl. Die naechste sinnvolle Umsetzung ist nicht mehr Content, sondern ein kleines, getestetes Anforderungsmodell mit Mama/Sofa/Lama als statischen Beispielen.
