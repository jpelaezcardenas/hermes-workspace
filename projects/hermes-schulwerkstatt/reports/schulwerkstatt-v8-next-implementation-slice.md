# Schulwerkstatt v8 · nächster Implementierungs-Slice

Datum: 2026-05-26

## Kurzdiagnose

Die Schulwerkstatt v7 ist technisch schon als lokale, lehrer-facing Ein-Datei-App stabil angelegt. Die Aufgabenbank v2 enthält 48 Aufgaben mit `action`, `teacherGoal`, `material`, `observation`, `overload` und `connector`; die Qualitätsrunde empfiehlt aber, nicht alle 48 Aufgaben gleich stark zu zeigen, sondern 10 S-Tier-Aufgaben als sofort nutzbare Unterrichtspraxis hervorzuheben.

Der nächste risikoarme v8-Schritt sollte deshalb keine neue Aufgabenbank und kein neues Schülerdaten-System sein, sondern eine kleine kuratierte Orientierungsebene in der bestehenden Aufgabenbank/Kartenlogik.

## Quellenbasis

Gelesen und berücksichtigt:

- `README.md`
  - v7-Ziel: lokaler Lehrer-Arbeitsplatz, keine Schülerdatenbank, keine automatische Diagnostik.
  - Aufgabenbank v2: 48 Aufgaben, 12 pro Bereich.
  - Connectoren: LeseWerk, GE-Lernwerkstatt, Spielraum Generator, weekly-plans.
- `index.html`
  - Aufgabenbank ist aktuell als `const taskBank = [...]` eingebettet.
  - Filter laufen über `area`, `level`, `duration`.
  - Karten werden über `taskCardTemplate()` und `taskPrintCardTemplate()` gerendert.
  - Förderkompass empfiehlt über `recommendTasks()` aktuell zwei Aufgaben nach Bereich/Niveau/Fatigue.
- `data/aufgabenbank-v2-content-draft.json`
  - Enthält dieselben 48 Aufgaben als Draft-Datenquelle.
  - Verifizierte Zählung: 48 Aufgaben; je 12 in Lesen, Mengen, Kommunikation/UK, Wahrnehmung/Alltag; IDs eindeutig.
- `reports/schulwerkstatt-v8-qualitaetsrunde-report.md`
  - Entscheidung: keine Vollneuerstellung, sondern v8-Kuration.
  - 10 Aufgaben sollen hervorgehoben werden.
  - Gelb-Aufgaben später sprachlich/materialbezogen schärfen.
- LeseWerk-Vernetzungsplan
  - Im Report-Ordner aktuell noch nicht vorhanden. Der Slice ist daher als vorbereitender Handoff formuliert und hält die LeseWerk-Verlinkung bewusst kompatibel/offen.

## Empfohlener Implementierungs-Slice: S-Tier-Orientierung auf Aufgabenkarte und Druckkarte

### Ziel

Lehrkräfte sollen sofort sehen, welche Aufgaben aus den 48 für v8 als besonders unterrichtsnah empfohlen sind. Kinder bzw. die Kind-Seite der Druckkarte sollen dabei nicht mehr Text oder Diagnosezahlen bekommen, sondern nur eine klarere, handlungsnahe Startorientierung.

### Warum dieser Slice

Dieser Slice hat den besten Nutzen/Risiko-Mix:

- Er nutzt die vorhandene Aufgabenbank statt neue Inhalte zu erfinden.
- Er macht die Qualitätsrunde direkt sichtbar.
- Er verbessert Orientierung, ohne die Oberfläche mit neuen Modulen zu überladen.
- Er ist komplett lokal, ohne externe Assets und ohne Speicherung.
- Er ist rückbaubar, weil nur optionale Metadaten und Rendering-Zweige ergänzt werden.

### Exakte spätere Änderungsstellen

Primär zu ändern:

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

Betroffene Stellen in `index.html`:

1. `const taskBank = [...]`
   - Optionales Feld an den 10 S-Tier-Aufgaben ergänzen.
   - Keine bestehenden Felder entfernen.
2. `taskCardTemplate(task, compact = false)`
   - Kleine S-Tier-Markierung und Lehrkraft-Hinweis anzeigen.
3. `taskPrintCardTemplate(task)`
   - Auf Kind-Seite maximal eine sehr kurze Startzeile anzeigen.
   - Auf Lehrer-Seite den Grund der Empfehlung anzeigen.
4. Optional: Filterbereich `#aufgabenbank`
   - Ein kleiner Button/Select: `Alle Aufgaben` / `Sofort nutzbar`.
   - Nur wenn die Darstellung ohne zusätzlichen Filter unruhig wirkt.

Sekundär nur zur Datenkonsistenz, falls die Draft-Datei weiter als Quell-/Handoff-Datenquelle genutzt werden soll:

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/data/aufgabenbank-v2-content-draft.json`

Empfehlung: Wenn später implementiert wird, entweder beide Datenstellen synchron halten oder im Report klar notieren, dass `index.html` die aktuell eingebettete Laufzeitquelle ist. Nicht heimlich nur die JSON-Datei ändern, weil die App aktuell aus dem eingebetteten `taskBank`-Array rendert.

### Betroffene Datenstruktur

Bestehende Aufgabe:

```js
{
  id: "lesen-1",
  area: "lesen",
  level: "basal",
  duration: 3,
  title: "Silbe hören und Karte berühren",
  action: "Hör Ma. Zeig Ma.",
  teacherGoal: "...",
  material: "...",
  observation: "...",
  overload: "...",
  connector: "LeseWerk"
}
```

Vorgeschlagene optionale Ergänzung nur bei S-Tier-Aufgaben:

```js
curation: {
  status: "sofort-nutzbar",
  label: "Sofort nutzbar",
  childStart: "Erst hören, dann zeigen.",
  teacherUse: "Sehr kurzer Einstieg mit klarer Handlung und wenig Reizlast."
}
```

Regeln:

- `curation` bleibt optional.
- Aufgaben ohne `curation` rendern exakt wie bisher.
- Keine Aufgabe verliert `action`, `teacherGoal`, `material`, `observation`, `overload` oder `connector`.
- Keine Diagnose-, Score-, Rang- oder Fortschrittswerte ergänzen.
- Keine personenbezogenen Daten ergänzen.

### S-Tier-Aufgaben für den ersten Slice

Aus der Qualitätsrunde übernommen:

1. `lesen-1` – Silbe hören und Karte berühren
2. `lesen-6` – Wort im Alltag lesen
3. `mengen-1` – Ein Ding in die Schale
4. `mengen-3` – Fünferfeld belegen
5. `uk-1` – Blick oder Zeigen zählt
6. `uk-8` – Wunschkarte nutzen
7. `uk-9` – Abbruch mitteilen
8. `wahr-1` – Start und Ende fühlen
9. `wahr-5` – Tablett-Aufgabe fertig machen
10. `wahr-6` – Erst dann planen

### Konkrete UI-Wirkung

Aufgabenbank-Karte:

- Oben in der Karte ein ruhiges Badge: `Sofort nutzbar`.
- Unter dem Kind-Auftrag eine kurze Zeile: `Start: ...`.
- Im Lehrerbereich eine kurze Zeile: `Warum empfohlen: ...`.
- Keine Ampelflut auf jeder Karte.

Druckkarte:

- Kind-Seite:
  - Bisheriger Auftrag bleibt dominant.
  - Optional darunter eine kurze Startzeile, z.B. `Start: Erst hören, dann zeigen.`
- Lehrer-Seite:
  - Optional `Empfehlung: sofort nutzbar – ...`
  - Beobachtungsfrage und Überladungsschutz bleiben unverändert sichtbar.

Optionaler Filter:

- Wenn visuell geprüft und weiterhin ruhig: kleiner Filter `Empfehlung` mit Optionen `Alle` und `Sofort nutzbar`.
- Wenn der Filter auf 390 px zu viel Raum nimmt: weglassen und nur Badges nutzen.

## Rückbaubarkeit

Der Slice ist einfach rückbaubar:

1. `curation`-Blöcke aus den 10 Aufgaben entfernen.
2. Rendering-Zweige in `taskCardTemplate()` und `taskPrintCardTemplate()` entfernen.
3. Falls ein Filter ergänzt wurde: Filter-Select/Button und Filterbedingung entfernen.

Da `curation` optional ist und keine bestehende Aufgabe umbenannt oder gelöscht wird, bleiben die 48 Aufgaben und alle vorhandenen Filter/Förderkompass-Funktionen erhalten.

## Acceptance Criteria

Funktional:

- Die App zeigt weiterhin genau 48 Aufgaben in der Aufgabenbank, wenn keine Filter aktiv sind.
- Alle 4 Förderbereiche bleiben sichtbar und filterbar:
  - Lesen
  - Mengen
  - Kommunikation/UK
  - Wahrnehmung/Alltag
- Die 10 S-Tier-Aufgaben sind als `Sofort nutzbar` erkennbar.
- Aufgaben ohne `curation` bleiben sichtbar und unverändert nutzbar.
- Förderkompass-Empfehlungen funktionieren weiterhin und zeigen zwei Aufgaben.
- Druckkarten funktionieren weiterhin für gefilterte und empfohlene Karten.

UI/UX:

- Desktop: Die Aufgabenbank bleibt ruhig lesbar; Badge und Startzeile dürfen die Karte nicht dominieren.
- Mobile 390 px: keine horizontale Scrollbar.
- Mobile 390 px: Karten stapeln sauber einspaltig.
- Die Kind-Seite der Druckkarte bleibt kurz und handlungsnah.
- Kein Kindermodus mit Diagnosezahlen, Scores, Ampelwertung, Ranking oder Leistungsdruck.
- Keine externen Assets, keine Icons aus CDN, keine neuen Fonts.

Pädagogik/Datenschutz:

- Keine echten Namen, Diagnosen, Noten, Rankings oder medizinischen Aussagen.
- Keine automatische Speicherung.
- Sprache bleibt beobachtend und lehrkraftseitig: `Warum empfohlen`, nicht `Kind kann` oder `Defizit`.
- Überladungsschutz bleibt sichtbar.
- Lehrkraftentscheidung bleibt zentral; `Sofort nutzbar` heißt nicht automatisch passend für jedes Kind.

Technik:

- Kein Umbau auf neues Framework.
- Keine neue Dependency.
- Keine globale CSS-Umstrukturierung.
- Keine Änderung an Connector-Pfaden ohne separaten LeseWerk-Handoff.

## Testplan für spätere Umsetzung

Statische Checks:

1. Lokale Daten zählen:
   - Erwartet: 48 Aufgaben.
   - Erwartet: je 12 pro Bereich.
   - Erwartet: 10 Aufgaben mit `curation.status === "sofort-nutzbar"`.
   - Erwartet: keine doppelten IDs.
2. Eingebettetes JavaScript aus `index.html` mit Node prüfen:
   - Erwartet: Syntax ok.
3. Falls JSON mitgeändert wird:
   - `python3 -m json.tool data/aufgabenbank-v2-content-draft.json`
   - Erwartet: gültiges JSON.

Lokaler Browser-Check:

1. Server starten:
   - `cd /Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt`
   - `python3 -m http.server 8788`
2. Öffnen:
   - `http://127.0.0.1:8788/`
3. Desktop prüfen:
   - Aufgabenbank zeigt 48 Aufgaben.
   - S-Tier-Badges sind sichtbar, aber nicht dominant.
   - Alle vier Bereiche lassen sich filtern.
   - Förderkompass erzeugt weiterhin zwei empfohlene Aufgaben.
   - Materialkorb und Druckkarten aktualisieren sich weiter.
4. Mobile 390 px prüfen:
   - Viewport auf 390 px setzen.
   - Keine horizontale Scrollbar.
   - Aufgabenbank-Karten einspaltig.
   - S-Tier-Information erzeugt keine Textüberläufe.
   - Druckkarten/Materialkorb bleiben lesbar.
5. Regressionsprüfung:
   - Standardmodus: 48 Aufgabenbank-Karten.
   - Standardmodus: 48 Druckkarten.
   - Bereich Lesen: 12 Aufgaben.
   - Bereich Mengen: 12 Aufgaben.
   - Bereich Kommunikation/UK: 12 Aufgaben.
   - Bereich Wahrnehmung/Alltag: 12 Aufgaben.

## Nicht-Tun-Liste gegen Überfrachtung

- Keine neue Aufgabenbank v3 bauen.
- Nicht alle 48 Aufgaben gleichzeitig mit langen Qualitätskommentaren versehen.
- Keine Ampelmatrix auf jede Karte setzen.
- Keine Schülerprofile, Diagnosedaten, Scores, Fortschrittsbalken oder Rankings ergänzen.
- Keine echte Speicherung, kein LocalStorage für Kinddaten, keine Cloud.
- Keine externen Bild-/Symbolpakete oder CDN-Assets einbinden.
- Keine Connector-Pfade ändern, bevor der LeseWerk-Vernetzungsplan vorliegt.
- Keine neuen Förderbereiche ergänzen.
- Keine globale Layout- oder Framework-Umstellung.
- Keine Materiallisten automatisch als verpflichtend darstellen; sie bleiben Team-/Lehrkraftprüfung.

## Offene Abhängigkeiten

- LeseWerk-Vernetzungsplan liegt im Schulwerkstatt-Reportordner noch nicht vor. Deshalb sollte dieser Slice keine neuen LeseWerk-Deep-Links oder Pfadlogiken einführen.
- Falls eine spätere Qualitätsrunde andere S-Tier-Aufgaben festlegt, muss nur die Liste der Aufgaben mit `curation` angepasst werden.
- Vor echtem Unterrichtseinsatz bleibt eine kurze lehrkraftseitige Sichtprüfung nötig.

## Alternative 1: Lesepfad-Verlinkung nur für Lese-Aufgaben

Beschreibung:

- Für ausgewählte Lesen-Aufgaben eine zusätzliche optionale Zeile `Lesepfad: LeseWerk manuell öffnen` anzeigen.
- Keine Deep-Link-Logik, solange der LeseWerk-Vernetzungsplan fehlt.

Vorteil:

- Stärkt die Vernetzung mit LeseWerk.

Nachteil:

- Nutzen hängt vom noch offenen Vernetzungsplan ab.
- Hilft primär dem Bereich Lesen, nicht allen vier Förderbereichen.

Bewertung:

- Gute spätere Ergänzung, aber nicht der beste erste v8-Slice.

## Alternative 2: Gelb-Aufgaben sprachlich schärfen

Beschreibung:

- Einige Gelb-Aufgaben aus der Qualitätsrunde direkt in `action`, `teacherGoal`, `material` oder `overload` vereinfachen.

Vorteil:

- Inhaltliche Qualität steigt unmittelbar.

Nachteil:

- Höheres Risiko, weil bestehende Aufgabeninhalte verändert werden.
- Schwerer rückbaubar als optionale Metadaten.
- Braucht genauere fachliche Prüfung je Aufgabe.

Bewertung:

- Sinnvoll nach der S-Tier-Orientierung, aber nicht als erster Mini-Slice.

## Empfehlung

Als nächstes nur den S-Tier-Orientierungs-Slice umsetzen: optionale `curation`-Metadaten für 10 Aufgaben plus sehr ruhige Anzeige in Aufgabenbank und Druckkarte. Dieser Schritt bringt Kindern mehr klare Startorientierung, Lehrkräften eine sofort nutzbare Kuration und hält die v7-Architektur stabil.