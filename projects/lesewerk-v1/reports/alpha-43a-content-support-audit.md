# Alpha 43A – Content Quality und Supports audit

## Ampel
Gelb.

## Kurzfazit
Die aktuelle Kinderführung ist fachlich brauchbar und sicher aufgebaut, aber an mehreren Stellen noch zu textreich für GE-Lernende mit kurzer Leseausdauer. Der größte Hebel liegt nicht in mehr Inhalt, sondern in einer kleineren, konsistenteren Kindersprache rund um Einstieg, Hilfen und Übergänge.

## Geprüfte Bereiche
- child-facing reading path
- guided path
- active step card
- support toggles
- gesture- und read-aloud-Hinweise
- story/writing bridge language

## Audit: Wo die Sprache noch zu schwer wirkt

### 1) Child-facing reading path
Positiv:
- Die Hauptlogik ist ruhig und stabil: Tagespfad, kleine Auswahl, anschließend Lesen.
- Es gibt bereits klare, wiederholbare Orientierungspunkte.

Noch schwach:
- Der Einstiegssatz am Kinderpfad bündelt zu viele Schritte in einem Satz: „Bild anschauen, Silbe klatschen, Wort lesen, Satz lesen, Mini-Geschichte, Schreibbrücke.“
- Für Kinder mit geringer Lesedauer wirkt das eher wie eine Liste als wie eine kleine Einladung.
- „Der Tagespfad startet unten“ ist für die Kinderansicht funktional, aber sprachlich eher erwachsen und orientiert auf Scrollen statt auf Handlung.

### 2) Guided path
Positiv:
- Die geführte Reihenfolge ist grundsätzlich klar und ritualisierbar.
- Schrittanzeigen und Hilfen sind bereits vorhanden.

Noch schwach:
- Die Begriffe „Tagespfad“, „Schritt 1 von …“ und die längere Helper-Zeile sind eher planend als kindnah.
- Die Struktur erklärt sich selbst noch zu viel, statt nur den nächsten kleinen Schritt zu zeigen.
- Für GE-Lernende wäre eine kürzere, wiederholte Form hilfreicher als mehrere Varianten derselben Orientierung.

### 3) Active step card
Positiv:
- Der aktive Schritt ist visuell vorhanden und nicht versteckt.
- Es gibt klare Aktionsknöpfe und eine ruhige Rückmeldung.

Noch schwach:
- Die Statussprache („Dein Tagesweg“, „Gut gelesen“, „Was möchtest du jetzt?“) ist freundlich, aber nicht überall konsequent kindlich-kurz.
- Die Karte enthält mehrere Informationsarten auf einmal: Wort, Silben, Hilfen, Vorlesen, Gebärde.
- Das ist strukturiert, aber für schwächere Leserinnen und Leser sprachlich noch dicht.

### 4) Support toggles
Positiv:
- Die Hilfen sind grundsätzlich gut verständlich und pädagogisch sinnvoll.
- Die Funktion „Hilfe wählen“ ist bereits als Schutz- und Entlastungsangebot nutzbar.

Noch schwach:
- „Tippe eine Hilfe an. Deine Hilfen bleiben sichtbar.“ ist sauber, aber noch zu erklärend.
- Für Kinder wäre kürzer und unmittelbarer besser, z. B. „Wähle Hilfe“ oder „Hilfe an“.
- Die Hilfebegriffe selbst sind okay, aber die erklärenden Nebensätze erhöhen die Textmenge.

### 5) Gesture- und read-aloud-Hinweise
Positiv:
- Die Geste ist textlich konkret und dem Wort zugeordnet.
- Der Read-aloud-Hinweis ist hilfreich und entlastend.

Noch schwach:
- „Lehrkraft liest bei Bedarf kurz vor. Danach liest du in Ruhe.“ ist verständlich, aber relativ lang.
- Bei GE-Lernenden sollte der Hinweis noch stärker auf die Funktion reduziert werden: erst hören, dann selbst lesen.
- Die Geste könnte noch knapper und handlungsnäher formuliert sein.

### 6) Story-/Writing-Bridge-Sprache
Positiv:
- Die Brückenlogik ist inhaltlich gut: Wort, Bild, kleine Handlung bzw. optionales Schreiben.
- Die Option bleibt freiwillig und passend für den Tag.

Noch schwach:
- „Schreibbrücke“ ist für Kinder vermutlich eher ein Lehrkraftwort als ein unmittelbarer Lerntitel.
- Die Bridge-Hinweise sind sachlich korrekt, aber sprachlich nicht immer leicht genug.
- Besonders die freiwillige Schreibanbahnung braucht noch kürzere, klarere Kindersprache, damit sie nicht wie ein zweiter Unterrichtsblock wirkt.

## Bestehende Unterstützungsstrukturen, die schon tragen
Ohne neue Assets kann die Seite bereits mit bestehenden Strukturen kleiner werden:
- support toggles für Bildhilfe, Gebärden-Hinweis, reduzierte Auswahl, Vorlesen, Wiederholung
- guidedReadingChain mit festen Schritten
- childOrientationSteps als vorbereitete, schrittweise Orientierung
- storyBridge und writingBridge als lokale, optionale Brücken
- reduced choices und bestehende kurze Aufgabenprompts

Das heißt: Es braucht vor allem eine sprachliche Verdichtung, nicht mehr Inhalt.

## Was ich nicht als sinnvoll sehe
- Keine zusätzliche Textmenge auf Kinderseite.
- Keine neue Sonderlogik für den Kinderpfad.
- Keine neue Asset-Ebene.
- Keine automatische Umstellung des Kinderpfads aus der Lehrkraftansicht.

## Genau eine Alpha 43B-Empfehlung
Alpha 43B sollte genau eine kleine Content-/Support-Änderung umsetzen: die kindliche Einstiegs- und Übergangssprache auf eine einheitliche Kurzform verdichten, insbesondere für den Guided Path und die Schreibbrücke.

Konkrete Form:
- eine sehr kurze Kinderzeile für den Einstieg
- eine sehr kurze Kinderzeile für die Hilfen
- eine sehr kurze Kinderzeile für die Schreibbrücke

Ziel: weniger Erklärung, mehr sofortige Orientierung, ohne neue Inhalte oder neue Logik.

## Verifikation
- `npm test` bestanden: 143/143.
- `npm run build` bestanden.

## Datenschutz-/GE-Check
- Keine personenbezogenen Daten.
- Keine Namen, Diagnosen, Scores, Timer, Ranking, Login, Cloud, Upload oder Export.
- Nur allgemeine, anonymisierte GE-Praxisbeobachtung.
