# Ergebnis: Silben-Werkstatt

## Was wurde gebaut?

Gebaut wurde ein eigenständiges, lokal lauffähiges HTML-Lernspiel `Silben-Werkstatt` im Stil der GE Lernwerkstatt 3.0 Beta.

Es ist bewusst als separater Prototyp umgesetzt, damit die bestehende Lernwerkstatt-App und der Symbol-Sortiergarten nicht verändert oder beschädigt werden.

## Speicherort

- Spiel: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/silben-werkstatt/index.html`
- Ergebnisdokumentation: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/silben-werkstatt/ERGEBNIS_SILBEN_WERKSTATT.md`

## So öffnest du es lokal

Direkt im Browser:

```bash
open /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/silben-werkstatt/index.html
```

Oder mit lokalem Server:

```bash
cd /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/silben-werkstatt
python3 -m http.server 4179 --bind 127.0.0.1
```

Dann öffnen:

```text
http://127.0.0.1:4179/index.html
```

## Niveaus

### Niveau A · ganz basal

Ziel: klare Wörter, wenige Karten, basale Reihenfolgearbeit.

Wörter:

- Hase: Ha-se
- Sofa: So-fa
- Auto: Au-to
- Tasse: Tas-se
- Mama: Ma-ma
- Banane: Ba-na-ne

### Niveau B · Sprechsilben finden

Ziel: 2–3 Silben, Alltagssprache, Regel „Wir sprechen in Sprechsilben“.

Wörter:

- Tomate: To-ma-te
- Rakete: Ra-ke-te
- Schule: Schu-le
- Pinsel: Pin-sel
- Telefon: Te-le-fon
- Elefant: E-le-fant

### Niveau C · größerer Silben-Bau

Ziel: 3–4 Silben, erste zusammengesetzte Wörter, Silbenzählen und Zusammensetzen.

Wörter:

- Schokolade: Scho-ko-la-de
- Regenbogen: Re-gen-bo-gen
- Turnschuh: Turn-schuh
- Wasserflasche: Was-ser-fla-sche
- Malstifte: Mal-stif-te
- Kinderwagen: Kin-der-wa-gen

## Didaktische Regeln

Umgesetzt wurden:

- Sprechsilben statt bloßer Buchstabentrennung.
- Kleine, geprüfte Wortliste statt großer unsicherer Wortmenge.
- Kindgerechte Regeln: langsam sprechen, klatschen, jede Silbe bekommt ein Feld, Wort wieder zusammensetzen.
- Keine Behauptung, dass alle Regeln der deutschen Worttrennung vollständig gelernt werden.
- Keine Punkte, keine Noten, keine Bestenliste, kein Timer, keine rote Fehlerlogik.
- Ressourcenorientierte Rückmeldungen wie „Du hast eine Silbe gelegt“ und „Jetzt klingt das Wort ganz“.
- Hilfen: farbige Silben, langsam anzeigen, Beispiel vormachen, weniger Karten als didaktische Idee, Bild betonen, Wort ausblenden.
- Antippen als Hauptbedienung; Drag-and-drop zusätzlich vorbereitet.

## Lernkreislauf

Sichtbar eingebaut sind:

1. Orientierung – Niveau wählen
2. Lernstand – leicht/schwer passend starten
3. Ziel – Silben richtig legen
4. Aufgabe – Karten probieren
5. Begleitung – Hilfe wählen
6. Feedback – wertschätzende Rückmeldung
7. Reflexion – nochmal/fertig/Pause/leicht/schwer/Hilfe war gut
8. Nächster Schritt – leichter, schwerer, nochmal, Pause
9. Lernspur – sichtbare UI-Zusammenfassung ohne Speicherung

Die 1–10-Skala erscheint nicht im Schüler:innenmodus.

## Datenschutz

- Keine Namen.
- Keine Schülerprofile.
- Keine Diagnosen.
- Keine Fotos.
- Kein Login.
- Keine Cloud.
- Keine externe Bildquelle.
- Keine dauerhafte Speicherung.
- Keine Tracking-Skripte.

Die Symbole sind Emoji/Unicode und damit lokal ohne Bilddienst nutzbar.

## Technische Umsetzung

- Eine einzelne HTML-Datei mit eingebettetem CSS und JavaScript.
- Keine externen Bibliotheken.
- Kein Backend.
- Keine Veränderung der bestehenden React-App.
- Keine Veränderung des vorhandenen Builds.

## Durchgeführte Tests

Browser-Test über lokalen Server:

```text
http://127.0.0.1:4179/index.html
```

Geprüft:

- Seite öffnet ohne Konsolenfehler.
- Niveau A: Hase / Ha-se korrekt gelegt und Feedback erhalten.
- Niveau B: Tomate / To-ma-te korrekt gelegt, Hilfe „Silben farbig“ getestet, Reflexion „Hilfe war gut“ getestet.
- Niveau C: Schokolade / Scho-ko-la-de korrekt gelegt und Feedback erhalten.
- Navigation zu Regeln und Lehrkraftbereich funktioniert.
- Wortliste und fachliche Hinweise sind sichtbar.
- Visuelle Prüfung: ruhiges Layout, große Buttons, lesbare Texte, keine sichtbaren Überlappungen bei Desktop-/Tabletbreite.

## Grenzen

- Audio ist nur als Button vorbereitet. Es gibt noch keine lokalen Audiodateien und keine Sprachausgabe.
- Emoji-Symbole sind datensparsam, aber nicht so pädagogisch präzise wie geprüfte Symbolsysteme oder echte Gegenstände.
- Niveau C ist für viele GE-Schüler:innen möglicherweise noch abstrakt, besonders zusammengesetzte Wörter.
- „Weniger Karten“ ist als Hilfe benannt, aber im Prototyp noch nicht konsequent als eigener Reduktionsmodus umgesetzt.
- Echte Tablet-Erprobung mit Touch, Motorik, Blickführung und Ablenkbarkeit steht noch aus.

## Kritische Qualitätsbewertung nach Anti-Glaze-Prinzip

Stark:

- Separat und sicher integriert, ohne bestehende App zu riskieren.
- Pädagogisch ruhige Rückmeldelogik ohne Beschämung.
- Drei Niveaus mit kleiner geprüfter Wortliste.
- Lernkreislauf ist sichtbar und nicht nur behauptet.
- Antippen funktioniert als barriereärmere Alternative zu Drag-and-drop.

Mittelmäßig:

- Visuelle Symbolik bleibt über Emoji recht allgemein.
- Die Hilfen sind nützlich, aber noch nicht alle vollständig funktional differenziert.
- Die Lehrkraftansicht ist informativ, aber noch kein echtes Beobachtungs- oder Materialdruckmodul.

Für echte GE-Schüler:innen möglicherweise zu abstrakt:

- Silbenkarten ohne echte Gegenstände können für basal lernende Schüler:innen zu symbolisch sein.
- Reflexionswörter wie „schwer“ oder „Hilfe war gut“ brauchen Modellierung, Gebärde, Talker oder reale Karten.
- Niveau C sollte nur mit Erwachsenenbegleitung und realem Material genutzt werden.

Problematische oder zu prüfende Wörter:

- Mama: alltagsnah, aber familiär sensibel; bei manchen Kindern emotional nicht neutral. Bei Bedarf ersetzen.
- Kinderwagen: je nach Lebenswelt möglicherweise weniger passend.
- Wasserflasche: lang, aber schulnah; echte Flasche als Material nutzen.
- Turnschuh/Malstifte: zusammengesetzte Wörter müssen langsam modelliert werden.

Größter nächster pädagogischer Nutzen:

1. Lokale Audioaufnahmen oder Web-Speech optional, aber datenschutzsicher und abschaltbar.
2. Reduktionsmodus wirklich umsetzen: nur zwei sichtbare Karten, dann langsam erweitern.
3. Druckbare Silbenkarten mit gleichen Farben und Lehrkraft-Hinweisen.
4. Tablet-Test mit echter Touchbedienung und mindestens zwei motorisch unterschiedlichen Bedienwegen.
