# Umsetzungsplan Playbook MVP

Arbeitsgrundlage: Parent-Handoff t_4ef93c67, Coder-Handoff t_c1a79f4b, Ideas-Handoff t_31775e5b, Finance-Handoff t_42bbcc04 sowie die beiden Ursprungsanalysen `vereinsstrategie-ausbauanalyse-wahren-playbook.md` und `kommerzialisierungs-partnerschaftsanalyse-wahren-playbook.md`.

## 1. Executive Summary

Der nächste beste Schritt ist kein weiterer Ausbau der Modulmenge, sondern eine radikale Klärung der Startseite: Das Wahren Playbook muss als wiederkehrender Fußballwochen-Prozess erkennbar werden. Aktuell wirkt die Seite fachlich stark, aber durch viele Guides, Tools, Spielereien, Changelogs und Spezialmodule eher wie eine beeindruckende Sammlung als wie ein klarer Vereinsbegleiter. Die neue Produktlogik lautet: vorbereiten, trainieren, spielen, nachbereiten, besser werden. Deshalb braucht die Startseite zuerst einen klaren Hero, einen sofort nutzbaren „Heute zuerst“-Bereich, getrennte Zielgruppen-Einstiege und einen sichtbaren Wochen-/Matchday-Flow. Auf der Startseite sollten nur 3–5 Kernmodule prominent bleiben; alles Weitere wandert in eine Bibliothek oder tiefere Navigation. Das MVP soll in 30 Tagen nicht „größer“, sondern verständlicher, routinierter und leichter erklärbar werden. Ein Trainer muss in unter 5 Minuten verstehen: Was mache ich diese Woche mit meiner Mannschaft? Ein Spieler muss sofort sehen: Was ist meine Aufgabe bis zum nächsten Spiel? Eltern, Verein und mögliche Partner sollen erkennen: Das ist kein Verkaufsprodukt, sondern digitale Vereinsentwicklung. Kommerzialisierung bleibt in dieser Phase bewusst leise: keine Paywall, keine Banner, sondern später ein dezenter Partnerbereich mit Zweckbindung. Erste Umsetzung: `index.html` neu strukturieren, zentrale Texte ersetzen, lange Modulflächen einklappen oder auslagern, mobile Navigation vereinfachen und die MVP-Kernmodule markieren.

## 2. Neue Produktpositionierung

| Positionierung | Klarheit | Vereinsnähe | Emotionale Wirkung | Kommerzielles Potenzial | Passung zu TSV/Wahren | Bewertung |
|---|---:|---:|---:|---:|---:|---|
| „Der rote Faden für unsere Fußballwoche.“ | sehr hoch | sehr hoch | hoch | mittel | sehr hoch | Beste Hauptpositionierung. Erklärt sofort Prozess und Vereinsnutzen. |
| „Ein Fokus. Ein Spiel. Eine gemeinsame Sprache.“ | hoch | hoch | hoch | mittel | sehr hoch | Sehr gut für Hero-H1: kurz, emotional, amateurfußballtauglich. |
| „Vom Bauchgefühl zum Spielplan.“ | hoch | mittel | hoch | hoch | hoch | Stark für Trainer/Partner, aber etwas allgemeiner als TSV-spezifisch. |
| „Profi-Taktik. Kreisliga-tauglich.“ | sehr hoch | hoch | mittel-hoch | hoch | hoch | Prägnant, aber vorsichtig nutzen: kann selbstironisch gut wirken, darf nicht überheblich klingen. |
| „Unsere Spielwoche, unsere Sprache, unser Weg.“ | mittel-hoch | sehr hoch | sehr hoch | mittel | sehr hoch | Sehr vereinsnah, ideal als Subclaim oder Vereinsbereich-Headline. |

Empfehlung:
- Hero-H1: „Ein Fokus. Ein Spiel. Eine gemeinsame Sprache.“
- Subline/Claim darunter: „Das Wahren Playbook ist der rote Faden für unsere Fußballwoche: vorbereiten, trainieren, spielen, nachbereiten, besser werden.“
- Für Partner/Eltern: „Partner ermöglichen Vereinsentwicklung — keine Werbung, sondern bessere Trainingsmaterialien, Trainerbildung und freie Nutzung im Verein.“

## 3. Neue Startseitenstruktur

### A. Hero-Bereich

Ziel: In 5–7 Sekunden erklären, was das Playbook ist und was man jetzt tun soll.

Konkreter Vorschlag:
- Eyebrow: `TSV Wahren Playbook · unsere Fußballwoche`
- Headline: `Ein Fokus. Ein Spiel. Eine gemeinsame Sprache.`
- Subheadline: `Das digitale Playbook bündelt Wochenaufgabe, Matchday-Briefing, Teamprinzipien und kurze Lernwege für Spieler, Trainer und Verein.`
- Primärer CTA: `Heute zuerst öffnen` → Anker `#heute-zuerst`
- Sekundärer CTA: `Meine Rolle wählen` → Zielgruppenbereich
- Dritter, kleiner CTA: `Trainerkarte ansehen` → `trainer-dashboard.html` oder spätere `trainer-woche.html`
- Vertrauenssignal: `Für Amateurfußball gebaut: kurze Aufgaben, klare Sprache, direkt im Training nutzbar.`
- Erklärung in einem Satz: `Das Playbook ist kein zusätzlicher Theorieordner, sondern die gemeinsame Wochenroutine für Training, Spieltag und Nachbereitung.`

Wichtig: Nicht mit „alle Tools entdecken“ starten. Dieser Link bleibt sichtbar, aber nachrangig als Bibliothek.

### B. „Heute zuerst“-Bereich

Ziel: Die Seite beantwortet sofort: Was kann ich heute tun? Was bringt mir das in 5 Minuten? Welcher Einstieg passt zu mir?

Konkrete Karte:
- Label: `Heute zuerst`
- Titel: `Rufe den ersten klaren Pressing-Trigger.`
- Kontext: `Wochenfokus: gemeinsam anlaufen, gemeinsam schieben.`
- Nutzen: `In 5 Minuten weißt du, welches Signal du im nächsten Training oder Spiel setzen sollst.`
- Quick Actions:
  1. `Auftrag lesen`
  2. `Trigger-Karte öffnen`
  3. `Nach dem Spiel kurz auswerten`
- Optionaler Status: `offen / erledigt`, lokal gespeichert, nicht als Pflicht im MVP.

Fallback, falls keine echten Spieltagsdaten vorhanden sind:
`Diese Woche: Pressing-Trigger erkennen · Aufgabe: Einmal laut auslösen und gemeinsam schieben.`

### C. Zielgruppen-Einstiege

| Zielgruppe | Bedürfnis | Einstiegsfrage | Passender CTA | Erstes Modul | Nutzen in einem Satz |
|---|---|---|---|---|---|
| Spieler | Wissen, was heute zählt; kurze Aufgaben statt Theorie | `Was ist meine Aufgabe diese Woche?` | `Spielerweg starten` | `weekly-mission.html` | Du bekommst eine kurze Aufgabe, die du direkt im Training oder Spiel anwenden kannst. |
| Trainer | Wochenfokus, Übungen, Teamansage, weniger Erklärzeit | `Wie bereite ich diese Woche in 5 Minuten vor?` | `Trainerkarte öffnen` | `trainer-dashboard.html` oder `trainer-woche.html` | Du bekommst Fokus, 2 Übungen, Coachingpunkte und Nachbereitung in einer Karte. |
| Team | Gemeinsame Sprache, Prinzipien, Rollen, Kommandos | `Welche Spielidee verbindet uns?` | `Mannschafts-Playbook öffnen` | `mannschafts-playbook/index.html` | Das Team wiederholt dieselben Prinzipien und Kommandos statt jeder für sich. |
| Verein / Eltern / Partner | Verstehen, warum es das Playbook gibt und was es dem Verein bringt | `Warum macht der Verein das?` | `Vereinsinfo lesen` | neue Seite `verein.html` oder `partner.html` | Eltern und Partner sehen: Hier geht es um Entwicklung, Orientierung und freie Nutzung für den Verein. |

### D. Matchday-/Wochenflow

Als sichtbare Leiste oder Kartenfolge:

1. Woche vorbereiten
   - Link: `weekly-mission.html`
   - Text: `Fokus setzen: Was wollen wir diese Woche besser machen?`
2. Training fokussieren
   - Link: `mannschafts-playbook/index.html`
   - Text: `1–2 Übungen und eine Teamregel auswählen.`
3. Spiel anwenden
   - Link: `spieltag.html` oder `gegner-scout.html#briefing`
   - Text: `Vor dem Spiel kurz wissen: Was ist heute unser Auftrag?`
4. Nachbereiten
   - Link: `post-match.html`
   - Text: `Eine Rückfrage beantworten: Was hat funktioniert?`
5. Lernen und verbessern
   - Link: `fortschritt.html` oder Bibliothek
   - Text: `Aus der Woche eine bessere nächste Woche machen.`

Mobile Darstellung: einspaltige Karten oder horizontale Swipe-Leiste, Touch-Ziele mindestens 44px.

### E. Playbook-Module neu ordnen

Auf die Startseite gehören sichtbar:
- Wochen-Mission
- Heute-zuerst-Auftrag
- Mannschafts-Playbook / Pressing-Grundprinzipien
- Spieltag / Gegner-Briefing
- Post-Match-Check
- Trainerkarte / Trainer-Dashboard
- kompakte Suche oder Bibliothekszugang

Tiefer in Navigation oder Bibliothek:
- Positionsguides
- einzelne Masterclasses
- Körper / Performance
- Regelkunde
- Kommunikation
- Downloads
- Taktik-Editor
- Quiz- und Lernpfad-Varianten
- Changelog

MVP:
- Startseite mit Wochenlogik
- Zielgruppen-Einstiege
- Heute-zuerst-Karte
- 5 Kernmodule
- Trainerkarte
- Spieler-Wochenaufgabe
- Matchday-/Post-Match-Element

Später:
- große Modulbibliothek mit Filter
- Saisonplaner
- Videoanalyse
- Badges/Zertifikate
- Lizenzmodell für andere Vereine
- komplexe Dashboards

## 4. Konkrete UI-/UX-Komponenten

| Komponente | Zweck | Sichtbarer Inhalt | Interaktion | Priorität | Aufwand |
|---|---|---|---|---:|---|
| Hero-Modul `HeroLabMVP` | Positionierung und klare Entscheidung | Claim, Subline, 2–3 CTAs, kleine Wochenvorschau | Anker/Links | S | mittel |
| Zielgruppen-Karten `AudienceEntryGrid` | Spieler, Trainer, Team, Verein trennen | 4 Karten mit Einstiegsfrage, Nutzen, CTA | direkte Links | S | niedrig |
| Heute-zuerst-Auftrag `TodayFirstCard` | Tages-/Wochenaktion priorisieren | Fokus, Auftrag, Gegnerkontext, 3 Quick Actions | öffnen, optional abhaken, Link zu Post-Match | S | mittel |
| Matchday-Flow-Leiste `WeekFlow` | Fußballwoche als Prozess erklären | 5 Schritte: Fokus, Training, Briefing, Spiel, Lernen | Step-Links | S | niedrig-mittel |
| Trainer-Schnellstart `TrainerWeekCard` | Trainer in 5 Minuten handlungsfähig machen | Gegner, Wochenziel, 2 Übungen, Teamansage, Nachbereitung | öffnen/kopieren/drucken später | A | mittel-hoch |
| Spieler-5-Minuten-Aufgabe | Spieler sofort aktivieren | Aufgabe, Warum, Beispielaktion, Link zum Guide | starten, weiterlesen, später erledigt markieren | S | niedrig-mittel |
| Modulbibliothek `ModuleLibraryAccordion` | Umfang erhalten, Startseite entlasten | Kategorien und Links | `details/summary` oder eigene Seite | A | mittel |
| Fortschritts-/Lernpfad-Element | Motivation ohne Druck | „Dein nächster Schritt“, Rang/Status optional | lokale Anzeige, Link zu Fortschritt | B | mittel |
| Partner-/Sponsoring-Fläche `PartnerEnablementCard` | Sponsoring als Ermöglichung zeigen | Partner ermöglichen freie Nutzung, Trainerbildung, Material | Link zur Partnerseite | B | niedrig |
| FAQ „Was ist das Playbook?“ | Missverständnisse vermeiden | 4–6 kurze Fragen: Nutzen, Aufwand, Datenschutz, Verein | aufklappen | A | niedrig |
| Changelog kompakt | Updates zeigen, aber nicht dominieren | 3 letzte Updates + Link | Details / eigene Seite | B | niedrig |
| BottomNavMVP | Mobile Orientierung | Heute, Spieler, Trainer, Team, Bibliothek | sticky mobile nav | A | mittel |

Technische Hinweise:
- Erste Umsetzungsphase nur `public/wahren-playbook/index.html`, `styles.css` und optional `home-config.js` anfassen.
- Bestehende Klassen wiederverwenden, neue Startseiten-Komponenten als `.wp-home-*` oder `.home-*` namespacen.
- Datenstruktur optional: `HOME_SECTIONS`, `TODAY_FIRST`, `MODULES` als einfache JS-Arrays/Objekte.
- Service-Worker-Version und Index-Version prüfen/erhöhen, falls Cache-Busting nötig.
- Alle Links als echte `<a>`-Elemente; keine rein farbliche Priorisierung; Touch-Ziele mindestens 44px.

## 5. Content-Verbesserung

### Neue H1

`Ein Fokus. Ein Spiel. Eine gemeinsame Sprache.`

Alternative H1:
- `Der rote Faden für unsere Fußballwoche.`
- `Vom Bauchgefühl zum Spielplan.`
- `Unsere Spielwoche, unser Plan.`

### Neue Subheadline

`Das Wahren Playbook bündelt Wochenaufgabe, Matchday-Briefing, Teamprinzipien und kurze Lernwege — damit Spieler, Trainer und Verein dieselbe Sprache sprechen.`

### 5 kurze CTA-Texte

1. `Heute zuerst öffnen`
2. `Spielerweg starten`
3. `Trainerkarte öffnen`
4. `Mannschafts-Playbook ansehen`
5. `Vereinsinfo lesen`

Weitere, nachrangige CTAs:
- `Alle Module in der Bibliothek`
- `Nach dem Spiel auswerten`
- `Partnerbereich ansehen`

### 4 Zielgruppen-Teaser

Spieler:
`Du brauchst keine lange Theorie. Wähle deine Rolle, lies die Wochenaufgabe und nimm eine konkrete Aktion mit ins Training oder Spiel.`

Trainer:
`Fokus, Übungen, Teamansage, Nachbereitung: Die Trainerkarte macht aus vielen Ideen eine klare Woche.`

Team:
`Pressing, Kommandos, Rollen und Matchday-Regeln: Hier entsteht die gemeinsame Sprache, die auf dem Platz zählt.`

Verein / Eltern / Partner:
`Das Playbook zeigt, wie der Verein Fußballwissen, Jugendförderung und Trainerarbeit verständlich macht — ruhig, praktisch und ohne Werbedruck.`

### Erklärung „Was ist das Playbook?“

`Das Wahren Playbook ist der digitale Begleiter für unsere Fußballwoche. Es sammelt nicht einfach Inhalte, sondern führt durch einen Ablauf: Wochenfokus setzen, Training vorbereiten, Spielauftrag anwenden, nach dem Spiel kurz reflektieren und daraus besser werden. Es hilft Spielern, Trainern und Verein, dieselbe Sprache zu sprechen.`

### Erklärung für Trainer

`Für Trainer soll das Playbook Zeit sparen, nicht Arbeit machen. Du bekommst einen Wochenfokus, passende Übungen, Coachingpunkte und eine kurze Teamansage. Ziel ist nicht Kontrolle, sondern ein schneller, gemeinsamer Startpunkt für Training und Spieltag.`

### Erklärung für Spieler

`Für Spieler geht es um eine einfache Frage: Was ist meine nächste gute Aktion? Das Playbook gibt dir kurze Aufgaben, Positionswissen und Matchday-Hinweise, die du direkt auf dem Platz ausprobieren kannst.`

### Erklärung für Eltern/Verein

`Für Eltern und Verein macht das Playbook sichtbar, woran sportlich und pädagogisch gearbeitet wird: klare Spielidee, fairer Umgang, Gesundheit, Trainingsroutine und Entwicklung. Es ersetzt kein Training, sondern erklärt und unterstützt es.`

### Kurzer Sponsoring-/Partnertext

`Diese Partner ermöglichen das Wahren Playbook. Ihr Beitrag finanziert keine Werbung, sondern freie Nutzung im Verein, bessere Trainingsmaterialien, Trainerbildung und Jugendförderung. Die Inhalte bleiben beim Verein; Partner werden transparent und dezent genannt.`

## 6. MVP-Empfehlung

### Das MVP soll enthalten

1. Klare Startseite
   - neuer Hero
   - verständlicher Claim
   - maximal 2–3 Haupt-CTAs

2. Zielgruppen-Einstieg
   - Spieler
   - Trainer
   - Team
   - Verein/Eltern/Partner

3. Heute-zuerst-Bereich
   - Wochenfokus
   - eine Aufgabe
   - 2–3 Quick Actions
   - Fallback ohne API-Abhängigkeit

4. 3–5 zentrale Inhalte
   - Wochen-Mission
   - Mannschafts-Playbook / Pressing
   - Spieltag / Gegner-Briefing
   - Post-Match-Check
   - Trainerkarte / Trainer-Dashboard

5. Ein Trainer-Tool
   - Trainerkarte: Wochenziel, 2 Übungen, Coachingpunkte, Nachbereitung

6. Ein Spieler-Modul
   - 5-Minuten-Aufgabe mit Rollenbezug

7. Ein Matchday-Element
   - Gegner-/Spielauftrag oder 60-Sekunden-Briefing

8. Einfacher CTA
   - `Diese Woche testen`
   - `Heute zuerst öffnen`

9. Messbares Ziel
   - 4 Wochen Pilot
   - 1 Team
   - 1 wöchentlicher Fokus
   - mindestens 2 Trainer nutzen es wiederholt
   - 70% der Spieler können die Wochenaufgabe nennen
   - Trainerfeedback: Spart es Zeit oder schafft es Klarheit?

### Nicht ins MVP

- komplexer Login
- harte Paywall
- breite Akademie-Plattform
- White-Label-SaaS
- große Community-Funktionen
- Videoanalyse mit personenbezogenen Daten
- umfangreiche Spielerprofile/Leistungsdaten
- Sponsor-Banner oder Pop-ups
- mehr als 5 prominent beworbene Kernmodule
- vollständiger Saisonplaner

MVP-Abgrenzung in einem Satz:
`Das MVP ist keine Plattform, sondern eine klare Startseite plus wiederholbare Wochenroutine für ein Team.`

## 7. S/A/B/C-Tierlist

### S-Tier: Muss sofort gemacht werden

| Maßnahme | Grund | Aufwand | Wirkung | Erster konkreter Schritt |
|---|---|---:|---:|---|
| Startseiten-Hero neu schreiben | Positionierung entscheidet, ob Nutzer das Produkt verstehen | mittel | sehr hoch | H1, Subline und CTA-Hierarchie in `index.html` ersetzen |
| „Heute zuerst“-Bereich nach oben | Nutzer brauchen sofort eine Handlung, nicht eine Modulliste | mittel | sehr hoch | Karte mit Wochenfokus und 3 Quick Actions bauen |
| Zielgruppen-Einstiege | Spieler, Trainer, Team und Verein haben unterschiedliche Fragen | niedrig | sehr hoch | 4 Karten mit CTA und erstem Modul einfügen |
| Wochen-/Matchday-Flow | Macht aus der Sammlung einen Prozess | niedrig-mittel | sehr hoch | 5-Step-Komponente unter Zielgruppen platzieren |
| 3–5 MVP-Kernmodule markieren | Reduziert Überforderung | niedrig | hoch | Nur Kernmodule prominent lassen, Rest in Bibliothek |
| Lange Modulfülle einklappen/auslagern | Startseite wirkt sonst weiter überladen | mittel | hoch | `details/summary` oder `bibliothek.html` anlegen |

### A-Tier: Sehr wichtig, direkt danach

| Maßnahme | Grund | Aufwand | Wirkung | Erster konkreter Schritt |
|---|---|---:|---:|---|
| Trainerkarte als Wochen-Schnellstart | Trainerakzeptanz hängt am 5-Minuten-Nutzen | mittel-hoch | hoch | vorhandenes `trainer-dashboard.html` als Wochenkarte framen |
| Mobile Bottom-Navigation vereinfachen | Viele Nutzer kommen mobil | mittel | hoch | Navigation auf Heute, Spieler, Trainer, Team, Bibliothek reduzieren |
| FAQ „Was ist das Playbook?“ | Vermeidet Missverständnisse bei Eltern/Trainer:innen | niedrig | mittel-hoch | 5 FAQ-Fragen auf Startseite oder `verein.html` |
| Eltern-/Vereinsinfo | Erklärt Vereinsnutzen und verhindert „noch eine App“-Gefühl | niedrig-mittel | mittel-hoch | neue `verein.html` oder Abschnitt im MVP |
| Changelog kompakt machen | Updates sollen Vertrauen schaffen, nicht dominieren | niedrig | mittel | nur 3 Updates zeigen, Rest verlinken |
| Datenschutz-/Rechte-Hinweis intern klären | Verhindert spätere Probleme bei Fotos, Spielerprofilen, Sponsoren | niedrig-mittel | hoch | kurze Governance-Notiz erstellen |

### B-Tier: Sinnvoll, aber nicht kritisch

| Maßnahme | Grund | Aufwand | Wirkung | Erster konkreter Schritt |
|---|---|---:|---:|---|
| Partnerbereich-UI dezent vorbereiten | Monetarisierung kann später sauber andocken | niedrig | mittel | Footer-Kachel und `partner.html` skizzieren |
| Sponsoren-One-Pager | Für spätere Partneransprache nötig | niedrig-mittel | mittel | 1 Seite mit Zweckbindung und Paketen S/A/B schreiben |
| PDF-/Methodenkartenpaket | Greifbarer Nutzen für Trainer/Partner | mittel | mittel | 10 Karten aus bestehenden Inhalten auswählen |
| Feedback-Miniformular | MVP-Wirkung prüfen | mittel | mittel | 3 Fragen für Trainer/Spieler definieren |
| Fortschritts-/Lernpfad-Element | Motivation, wenn dezent | mittel | mittel | nur lokale Anzeige, kein Datenzwang |

### C-Tier: Später oder optional

| Maßnahme | Grund | Aufwand | Wirkung | Erster konkreter Schritt |
|---|---|---:|---:|---|
| White-Label-Lizenz für andere Vereine | Erst nach internem Beweis stabil | hoch | später hoch | nach 90 Tagen prüfen, nicht jetzt bauen |
| großes Abo-/Premium-Modell | Risiko für Vereinscharakter | hoch | unsicher | vermeiden |
| Videoanalyse mit personenbezogenen Daten | Datenschutz-/Rechterisiko | hoch | unsicher | nur mit Governance und Einwilligung |
| große Akademie-Plattform | Wirkt überzogen für MVP | hoch | unsicher | Sprache vermeiden, klein starten |
| umfangreiche Spielerprofile | Datenschutz und Pflegeaufwand | hoch | mittel | nicht vor stabiler Nutzung |
| Sponsor-Banner/Ad-Modell | beschädigt Vertrauen | mittel | negativ | nicht umsetzen |

## 8. 30-60-90-Tage-Plan

### 0–30 Tage: Klarheit herstellen

Ziel: Die Startseite erklärt das Produkt in unter 1 Minute und führt direkt in eine Wochenaktion.

Aufgaben:
- Startseite neu strukturieren: Hero, Heute zuerst, Zielgruppen, Wochenflow, MVP-Module, Bibliothek.
- H1, Subline, CTAs und Zielgruppentexte ersetzen.
- 3–5 MVP-Kernmodule festlegen und sichtbar markieren.
- Lange Modulbereiche einklappen oder auf `bibliothek.html` auslagern.
- Erste Trainerkarte als Muster-Woche definieren.
- Eltern-/Vereinsinfo kurz ergänzen: Warum gibt es das Playbook? Was bringt es? Was nicht?
- Datenschutz-/Rechte-Grenzen intern notieren: keine personenbezogenen Spieler-/Jugenddaten öffentlich, keine Sponsorennutzung ohne Einwilligung.

Messbare Ziele:
- Ein Trainer kann das Playbook in unter 5 Minuten erklären.
- Ein Spieler findet seine Wochenaufgabe mit maximal 2 Klicks.
- Startseite zeigt maximal 5 Kernmodule prominent.
- 1 Team testet die Wochenroutine.

### 31–60 Tage: MVP im Vereinsalltag testen

Ziel: Die neue Struktur wird nicht nur verstanden, sondern wiederholt genutzt.

Aufgaben:
- Trainer-/Spielerflow verbessern: Wochenaufgabe → Training → Spielauftrag → Nachbereitung.
- 2 weitere Wochenkarten erstellen.
- Erste Inhalte mit 1–2 Trainern und Spielern testen.
- Feedback sammeln: Was war klar? Was war zu viel? Was wurde im Training wirklich genutzt?
- Erste Methodenkarten/PDFs aus vorhandenen Inhalten vorbereiten.
- Partneridee vorbereiten: Themenpatenschaft „Gesund spielen“ oder Jugendförderung.
- Sponsoren-One-Pager als Entwurf erstellen, aber noch nicht aggressiv verkaufen.

Messbare Ziele:
- Mindestens 2 Trainer geben Rückmeldung.
- Mindestens 20–30 Spielerinteraktionen oder mündliche Rückmeldungen zur Wochenaufgabe.
- 3 Wochenfoki wurden wiederholt genutzt.
- 1 Partnerkategorie ist priorisiert, z.B. Physiotherapie/Krankenkasse.

### 61–90 Tage: Vereinsprozess und vorsichtige Erweiterung

Ziel: Das Playbook wird als wiederkehrender Vereinsprozess etabliert und die nächste Ausbaustufe wird faktenbasiert entschieden.

Aufgaben:
- Pilot auswerten: Was wurde genutzt, was war Ballast?
- Zweites Team aufnehmen, falls erstes Team echte Nutzung zeigt.
- Interner Trainerabend oder Mini-Workshop durchführen.
- Dezenten Partnerbereich mit 1 echtem Pilotpartner testen, falls passend.
- Wirkung dokumentieren: Was wurde durch Playbook/Partner ermöglicht?
- Roadmap Version 2 festlegen: Team-Paket, Jugendpfad oder Trainerbereich — nur eine Richtung priorisieren.
- Lizenz-/Workshop-Ideen nur als Skizze, nicht als Hauptbauprojekt.

Messbare Ziele:
- Wiederholte Nutzung über mehrere Wochen.
- 1 konkretes Beispiel, wie eine Wochenaufgabe im Training/Spiel genutzt wurde.
- 1 Partnergespräch oder 1 interner Workshop.
- Entscheidung für 6-Monats-Ausbau liegt vor.

## 9. Kommerzialisierung ohne Vereinsverlust

### Welche Monetarisierung passt sofort?

Sofort passt nur eine leise, zweckgebundene Partnerfinanzierung:
- Partnerbereich „Diese Partner ermöglichen das Wahren Playbook“
- Sponsorenpakete S/A/B
- Themenpatenschaft „Gesund spielen“
- Jugendförderpaket für Material und Trainerbildung
- interner Trainerworkshop als Wirkungsnachweis

Beste Pilotidee:
`Gesund spielen` mit Physiotherapie, Sportmedizin, Krankenkasse oder lokalem Gesundheitsakteur.

Warum:
- direkter Spielernutzen
- glaubwürdiger Vereinsbezug
- kein plattes Werbemodell
- Anschluss an Warm-up, Cool-down, Prävention und Erste Hilfe

### Was sollte kostenlos bleiben?

- Startseite / Spieler-Hub
- Positionsbasics und zentrale Guides
- Wochen-Mission
- Matchday-Fokus
- Warm-up, Cool-down, Erste Hilfe, Prävention
- Fairness und Regelkunde
- Basis-Quiz und Lernpfade für TSV-Spieler
- Eltern-/Vereinsinformation
- Kernmodule für Vereinsmitglieder

### Was könnte später bezahlt sein?

Erst nach internem MVP-Beweis:
- externe Trainerworkshops
- PDF-/Methodenkartenpakete für externe Nutzer
- Beratungsangebot für andere Vereine
- Pilotlizenz für befreundete Vereine
- Akademietag/Feriencamp
- Fördermittelprojekt mit klarer Dokumentation

Nicht vor Monat 6:
- White-Label-SaaS
- breite Kursplattform
- digitale Abo-Modelle
- personenbezogene Videoanalyse

### Glaubwürdigste Sponsoringidee

`Themenpatenschaft Gesund spielen`

Beispieltext für Partneransprache:

> Der TSV Wahren baut ein digitales Playbook für Spieler, Trainer und Eltern — keine App mit Werbung, sondern Vereinswissen, das im Training und am Spieltag wirkt. Wir suchen einen Partner für den Bereich „Gesund spielen“: Warm-up, Cool-down, Verletzungsprävention und Belastungssteuerung. Ihr Name wird dezent an den passenden Stellen sichtbar, nicht als Banner, sondern als ermöglichender Partner. Ihr Beitrag fließt direkt in Trainerfortbildung, Material und freie Nutzung im Verein.

### Welche Kommerzialisierung sollte vermieden werden?

- harte Paywall für TSV-Kerninhalte
- „Jetzt upgraden“-Mechaniken für Spieler
- große Sponsor-Banner auf der Startseite
- Pop-ups, Tracking-Pixel oder werbliche Overlays
- Sponsor bestimmt Inhalte
- Verkauf von Spieler-/Nutzungsdaten
- Budgetplanung, die fest mit Playbook-Einnahmen rechnet
- „Akademie“- oder „Eliteprogramm“-Sprache, bevor Struktur und Qualität bewiesen sind

Governance-Regel:
`Sponsor bekommt Sichtbarkeit und Zweckbindung, aber keine redaktionelle Mitbestimmung.`

## 10. Risiken und Gegenmaßnahmen

| Risiko | Warnsignal | Gegenmaßnahme | Entscheidungsempfehlung |
|---|---|---|---|
| Überforderung Ehrenamt | „Das macht doch wieder nur eine Person.“ | MVP klein halten, Pflegefenster 1x/Monat 30 Minuten, Rollen für Inhalt/Technik/Feedback trennen | Keine neue Plattformlogik, bevor Pflege realistisch verteilt ist. |
| Zu viel Komplexität | Nutzer fragen: „Wo soll ich anfangen?“ | Startseite auf Heute zuerst, Zielgruppen und 5 Kernmodule reduzieren | Module nicht löschen, aber in Bibliothek verschieben. |
| Datenschutz und Rechte | Fotos, Videos, Spielerprofile oder Leistungsdaten sollen für Partner genutzt werden | Keine personenbezogenen Daten extern, Einwilligungen, eigene Medien, anonymisierte Kennzahlen | Im MVP keine personenbezogenen Profile oder Videoanalyse bauen. |
| Akzeptanz bei Trainer:innen | Trainer empfinden Playbook als Kontrolle oder Zusatzpflicht | Trainerkarte als Zeitersparnis framen, Trainer als Mitautoren einbinden | Keine Pflichtstatistiken, kein Kontroll-Dashboard im MVP. |
| Akzeptanz bei Spieler:innen | Spieler öffnen die Seite, finden aber nur Theorie | 5-Minuten-Aufgabe, Rollenbezug, kurze Sprache, direkt spielnah | Spieler-Einstieg vor Modulbibliothek priorisieren. |
| Kommerzialisierung wirkt unpassend | Eltern/Spieler sagen: „Da wird nur noch Geld verdient.“ | Kern bleibt frei, Partner dezent, Zweckbindung offen erklären | Keine Paywall, keine Banner, Partner erst nach klarem Vereinsnutzen. |
| Pflegeaufwand | Changelog veraltet, Inhalte wachsen unkontrolliert | Redaktionsroutine, alter Inhalt wird gelöscht/archiviert, Bibliothek kuratieren | Monatliches Review verpflichtend, sonst kein weiterer Ausbau. |
| Sponsor beeinflusst Inhalte | Sponsor fordert werbliche Einbindung oder Aussagen | Schriftliche redaktionelle Hoheit beim Verein, Gastbeiträge markieren | Ohne Governance kein Sponsorvertrag. |
| Falsche Erfolgsmessung | Featureanzahl oder Seitenaufrufe gelten als Erfolg | Messen: Trainer spart Zeit, Spieler kennt Aufgabe, Wochenroutine wird wiederholt | Wirkung vor Reichweite. |
| Ein-Personen-Abhängigkeit | Technik, Inhalt und Sponsoring hängen an Chris/einer Person | kleine Verantwortlichkeiten definieren | Vor Skalierung mindestens 2–3 Mitwirkende einbinden. |

## 11. Konkreter Folgeauftrag für Umsetzung

Perfekter nächster Hermes-/Coder-Prompt:

```text
Arbeite im lokalen Projekt:
/Users/zondrius/Desktop/Wahren-Playbook

Ziel:
Setze Phase 1 des Wahren Playbook MVP-Umbaus um. Grundlage ist:
/Users/zondrius/hermes-workspace/projects/tsv-playbook-analyse/UMSETZUNGSPLAN_PLAYBOOK_MVP.md

Bitte lies zusätzlich:
- /Users/zondrius/Desktop/Wahren-Playbook/CLAUDE.md
- /Users/zondrius/Desktop/Wahren-Playbook/STATE.md
- /Users/zondrius/Desktop/Wahren-Playbook/public/wahren-playbook/index.html
- /Users/zondrius/Desktop/Wahren-Playbook/public/wahren-playbook/styles.css
- relevante Dateien: weekly-mission.html, weekly-missions.js, trainer-dashboard.html, spieltag.html, mannschafts-playbook/index.html, post-match.html

Aufgabe:
Baue die Startseite so um, dass sie nicht mehr wie eine große Modulsammlung wirkt, sondern wie der rote Faden für die Fußballwoche.

Umzusetzen in Phase 1:
1. Neuer Hero:
   - Eyebrow: TSV Wahren Playbook · unsere Fußballwoche
   - H1: Ein Fokus. Ein Spiel. Eine gemeinsame Sprache.
   - Subheadline aus Umsetzungsplan übernehmen
   - CTAs: Heute zuerst öffnen, Meine Rolle wählen, Trainerkarte ansehen

2. Neuer Abschnitt „Heute zuerst“ direkt nach dem Hero:
   - Wochenfokus
   - eine konkrete Aufgabe
   - Nutzen in 1 Satz
   - 3 Quick Actions: Auftrag lesen, Trigger-Karte öffnen, Nach dem Spiel auswerten
   - stabiler statischer Fallback, falls keine API/Weekly-Daten verfügbar sind

3. Zielgruppen-Einstiege:
   - Spieler
   - Trainer
   - Team
   - Verein / Eltern / Partner
   Jede Karte mit Einstiegsfrage, Nutzen, CTA und Link.

4. Matchday-/Wochenflow:
   - 5 Schritte: Fokus, Training, Briefing, Spiel, Lernen
   - als mobile-taugliche Karten oder Flow-Leiste

5. MVP-Kernmodule:
   - Wochen-Mission
   - Mannschafts-Playbook / Pressing
   - Spieltag / Gegner-Briefing
   - Post-Match-Check
   - Trainerkarte / Trainer-Dashboard
   Nur diese prominent zeigen.

6. Modulfuelle reduzieren:
   - lange bestehende Modulbereiche entweder einklappen oder in einen klaren Bibliotheksbereich verschieben
   - keine Inhalte löschen, wenn unsicher; nur visuell nachrangig machen

7. Dezente FAQ oder Erklärung „Was ist das Playbook?“ ergänzen.

Technische Leitplanken:
- Vanilla HTML/CSS/JS beibehalten, kein Framework.
- Primär index.html und styles.css ändern; optional home-config.js, falls es die Pflege deutlich vereinfacht.
- Neue Klassen namespacen, z.B. .wp-home-*.
- Mobile zuerst prüfen: Touch-Ziele mindestens 44px, CTAs nicht zu eng.
- Keine Paywall, keine Partnerbanner, keine personenbezogenen Daten.
- Service-Worker-/Cache-Version prüfen und bei Bedarf synchron erhöhen.
- Keine Deployments, keine destruktiven Git-Befehle.

Verifikation:
- git diff prüfen
- lokale Datei/Startseite im Browser prüfen, wenn möglich
- mobile Breite prüfen
- sicherstellen, dass alle Links entweder funktionieren oder als bewusst spätere Platzhalter markiert sind
- kurz dokumentieren: geänderte Dateien, offene Punkte, Tests
```

Konkrete Bau-Reihenfolge für den Coder:
1. `index.html` sichern/strukturieren, ohne Inhalte zu löschen.
2. Hero ersetzen.
3. Heute-zuerst-Karte einbauen.
4. Zielgruppen-Karten einbauen.
5. WeekFlow einbauen.
6. MVP-Kernmodule sichtbar machen.
7. Rest in Bibliothek/Accordion verschieben.
8. `styles.css` mobile-tauglich ergänzen.
9. Links und Cache prüfen.
10. Browsercheck und kurze Übergabe.
