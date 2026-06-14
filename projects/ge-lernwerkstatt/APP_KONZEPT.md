# APP_KONZEPT.md – GE Lernwerkstatt Beobachtungs-App

## Ziel

Die App unterstützt Lehrkräfte und pädagogische Fachkräfte in einer GE-Lernwerkstatt dabei, kurze Beobachtungen ressourcenorientiert, pseudonymisiert und alltagsnah zu strukturieren. Neu ist ein Kompetenzraster mit 1–10-Einschätzung, damit Beobachtungen nicht nur als Text, sondern auch nach Lernbereich, Kompetenz, Hilfegrad und Transfer reflektiert werden können.

Die App bewertet nicht automatisch. Sie erzeugt keine Diagnose, keine Note und keinen normierten Testwert.

## Pädagogischer Grundsatz

Die zentrale Frage lautet:

„Wie sicher, selbstständig und übertragbar zeigt sich diese Kompetenz in genau dieser beobachteten Situation?“

Eine Zahl ist nur zusammen mit Kontext fachlich sinnvoll:

- Aufgabe / Situation
- konkrete Handlung
- Hilfegrad
- Sicherheit der Einschätzung
- Transferstatus
- Tagesform / Regulation
- Material und Setting
- nächste Beobachtungsfrage
- nächster kleiner Lernschritt

## Datenmodell

### Observation

```text
Observation:
- id
- datum
- kuerzel
- lerngruppe?
- stationId
- situation
- setting
- lernbereich
- kompetenz
- einschaetzung: 1–10
- sicherheit: sehr unsicher | eher unsicher | ausreichend beobachtet | mehrfach beobachtet
- hilfegrad: ohne Hilfe | verbal | Geste/Zeigen | Symbol/Talker/Bild | Vormachen | Materialstruktur | körpernahe Assistenz
- transfer: nur in dieser Situation | mit gleichem Material | mit ähnlichem Material | in Alltagssituation | noch nicht geprüft
- konkret
- gelingt
- hilfe[]
- kommunikation[]
- barriere[]
- lernschritt
- createdAt?
- updatedAt?
```

### Kompetenzraster

```text
Kompetenzraster:
- lernbereichId
- name
- competencies[]
- indicators[]: basal, unterstützt, erweitert
- questions[]: Beobachtungsfragen
```

### Backup

```text
Backup:
- exportedAt
- app
- version
- privacy
- observations[]
```

## Lernbereiche

### 1. Mathematik / Pränumerik

Beispiele:

- Mengen wahrnehmen
- mehr / weniger / gleich unterscheiden
- zuordnen
- sortieren
- Teil-Ganzes erleben
- Zahl- oder Mengenbegriffe nutzen
- Alltagstransfer, z. B. Tisch decken, verteilen, einkaufen

### 2. Deutsch / Kommunikation

Beispiele:

- Blickkontakt / Aufmerksamkeit auf Kommunikationsangebot
- Auswahl treffen
- Wunsch ausdrücken
- Bild / Symbol / Gegenstand verstehen
- Gebärde, Talker oder Sprache nutzen
- einfache Anweisung verstehen
- Erzähl- oder Gesprächsanlass nutzen
- Schrift / Bild / Symbol wiedererkennen

### 3. Sachunterricht / Weltverstehen

Beispiele:

- Alltagsgegenstände erkunden
- Ursache-Wirkung erleben
- Tiere, Pflanzen, Körper, Jahreszeiten, Umwelt unterscheiden
- einfache Handlungsabläufe verstehen
- Erfahrungen beschreiben oder zeigen
- Alltagssituationen einordnen

### 4. Wahrnehmung

Beispiele:

- visuelle Reize wahrnehmen
- auditive Reize wahrnehmen
- taktile Reize tolerieren oder nutzen
- vestibuläre / propriozeptive Reize verarbeiten
- Reizüberflutung anzeigen
- passende Reizangebote auswählen

### 5. Motorik

Beispiele:

- greifen
- loslassen
- zeigen
- platzieren
- sortieren
- feinmotorisch handeln
- grobmotorisch teilnehmen
- Hilfsmittel oder Material angepasst nutzen

### 6. Lebenspraxis

Beispiele:

- anziehen / ausziehen
- essen / trinken
- Tisch decken
- aufräumen
- Material holen / bringen
- Hygieneabläufe
- Orientierung im Raum
- einfache Dienste übernehmen

### 7. Sozial-emotionale Entwicklung

Beispiele:

- Kontakt aufnehmen
- Nähe / Distanz regulieren
- warten
- Hilfe annehmen
- Frustration zeigen oder regulieren
- Übergänge bewältigen
- Wahl treffen
- gemeinsam handeln

### 8. Unterstützte Kommunikation

Beispiele:

- Objektwahl
- Bildkarte nutzen
- Symbol verstehen
- Ja/Nein anzeigen
- Talker-Wort nutzen
- Kommunikationsanlass erkennen
- Kommunikationsmittel aktiv einsetzen

### 9. Arbeitsverhalten / Lernhaltung

Beispiele:

- Aufgabe beginnen
- bei einer Tätigkeit bleiben
- Material passend nutzen
- Wartezeit aushalten
- Hilfe einfordern oder annehmen
- Arbeitsplatz strukturieren
- Aufgabe beenden
- Rückmeldung nutzen

### 10. Selbstständigkeit / Orientierung im Schulalltag

Beispiele:

- Tagesstruktur wiedererkennen
- Wege im Schulhaus bewältigen
- Material finden oder wegräumen
- Übergänge mitgestalten
- eigene Bedürfnisse anzeigen
- Hilfe holen
- Routinen wiederholen
- kleine Dienste übernehmen

## Skalenlogik 1–10

Die Skala ist eine pädagogische Momentaufnahme. Sie beschreibt keine Leistung im Sinne einer Note.

1 = zeigt die Kompetenz aktuell noch nicht beobachtbar
2 = reagiert kurz oder unspezifisch auf Angebot
3 = zeigt erste Aufmerksamkeit oder Beteiligung mit viel Unterstützung
4 = beteiligt sich mit klarer Struktur und direkter Hilfe
5 = zeigt die Kompetenz in vertrauter Situation mit Unterstützung
6 = zeigt die Kompetenz wiederholt mit geringer Hilfe
7 = zeigt die Kompetenz in vertrauter Situation weitgehend selbstständig
8 = überträgt die Kompetenz auf ähnliche Materialien oder Situationen
9 = zeigt die Kompetenz flexibel in mehreren Situationen
10 = nutzt die Kompetenz sicher, selbstständig und alltagsbezogen

## Verlauf mit Kompetenzraster

Die Verlaufsansicht zeigt:

- Entwicklung pro Kürzel/Farbe
- Entwicklung pro Lernbereich
- Entwicklung pro Kompetenz
- letzte Einschätzungen
- Durchschnitt nur als vorsichtige Orientierung
- Veränderung: stabil, unsicher, zunehmend oder noch zu wenig Daten

Bei wenigen Beobachtungen formuliert die App vorsichtig:

„Noch keine belastbare Verlaufsaussage. Weitere Beobachtungen nötig.“

## Auswertung

Die Auswertung zeigt zusätzlich:

- Lernbereich
- Kompetenz
- Einschätzung 1–10
- kurze Bedeutung der Stufe
- Hilfegrad
- Transferstatus
- passende nächste Stufe
- nächste Beobachtungsfrage
- nächster kleiner Lernschritt
- Förderplan-Formulierung

Beispiel:

„Einschätzung 5/10 bedeutet: Die Kompetenz zeigt sich in vertrauter Situation mit Unterstützung. Nächster sinnvoller Schritt: gleiche Handlung mit etwas weniger Hilfe oder in ähnlicher Situation wiederholen.“

## Export und Druck

Markdown-Export und Druckansicht enthalten:

- Lernbereich
- Kompetenz
- Einschätzung 1–10
- Bedeutung der Stufe
- Sicherheit der Einschätzung
- Hilfegrad
- Transferstatus
- nächste Beobachtungsfrage
- Förderplan-Formulierung
- kurze Teamzusammenfassung für Gespräche und Förderplanung

Zusätzlich gibt es Vorlagen für Teamgespräch, nächste Woche und Beobachtungsbogen. Diese sind bewusst knapp gehalten, damit sie im Alltag schnell nutzbar bleiben.

## Datenschutz und Ethik

- Einschätzungen 1–10 sind sensible pädagogische Daten.
- Keine echten Namen verwenden.
- Keine Diagnosen daraus ableiten.
- Skala nie isoliert betrachten.
- Immer Kontext, Hilfeform, Transfer und Tagesform berücksichtigen.
- Einschätzung muss durch Beobachtung begründet sein.
- Alles bleibt lokal im Browser.
- JSON-Backups müssen sicher gespeichert werden.

## Bewusst nicht gebaut

- keine Cloud-Synchronisierung
- kein Login
- keine Schülerdatenbank
- keine automatische Förderdiagnostik
- keine Notenlogik
- kein Ranking
- keine Ampel „bestanden/nicht bestanden“
- keine Regelschulnormen

## Qualitätskriterien

- Förderschwerpunkt Geistige Entwicklung steht im Mittelpunkt.
- Sprache bleibt ressourcenorientiert und vorsichtig.
- Basale, unterstützte und erweiterte Zugänge werden mitgedacht.
- Hilfegrad und Kontext sind genauso wichtig wie die Zahl.
- Die Lehrkraft bleibt verantwortlich.

## Integration MVP 6

Die Endabnahme hat die Handoffs der Voraufgaben berücksichtigt. Der Coder-Handoff wurde umgesetzt und geprüft. Die fachlichen Handoffs der Aufgaben Lernwerkstatt und Schule waren auf dem Board ohne Ergebnistext dokumentiert; deshalb wurden deren Prüfkriterien in dieser Endabnahme direkt abgearbeitet.

Fachliche Entscheidungen:

- Die Skala bleibt als pädagogische Momentaufnahme benannt, nicht als Leistungs- oder Diagnosewert.
- Formulierungen sprechen von beobachteten Situationen, Hilfeformen, Transfer und nächsten kleinen Lernschritten.
- Das Kompetenzraster umfasst jetzt zehn GE-relevante Bereiche, inklusive Arbeitsverhalten/Lernhaltung und Selbstständigkeit/Orientierung im Schulalltag.
- Druck und Export bleiben bewusst lokal und knapp; sie dienen Teamgespräch und Förderplanung, nicht automatischer Diagnostik.
