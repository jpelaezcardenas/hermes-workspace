# S-Tier Schulwerkstatt Roadmap 1-10

Stand: 2026-05-27

Ziel: Die Schulwerkstatt soll schrittweise von einem Cockpit mit ersten Lese-Funktionen zu einem hochwertigen Förder-Ökosystem für GE-Unterricht wachsen. Jeder Schritt ist als kleiner, prüfbarer Hermes-Slice gedacht. Qualität, Übersichtlichkeit, Datenschutz und Kindorientierung stehen über Tempo.

## CEO-Regeln

- Immer nur ein aktiver Umsetzungsslice.
- Keine echten Schülernamen oder sensiblen Daten.
- Keine Diagnosebehauptungen; nur Beobachtung, Förderhypothese und nächster Unterrichtsschritt.
- Keine externen Assets oder Dependencies ohne eigene Freigabe.
- Jeder Slice braucht Report, Linkcheck, mobile Prüfung und Handoff.
- Wenn Hermes wegen OAuth/Toollimit/Idle blockiert: sofort CEO-Handoff, nicht erneut denselben Task starten.

## 1. LeseWerk Druckkarten v1

Aus der Inhaltsbibliothek entstehen druckbare Wort-, Silben- und Satzkarten. Lehrkraft filtert Stufe/Kategorie/Hilfe und erhält ein klares Materialset für Unterrichtstisch, Klettmappe oder Stationsarbeit.

Akzeptanz: Druckbereich, 6-12 Karten je Seite, Silbenfarbe, keine Kinddaten, mobile/print smoke.

## 2. Adaptiver Wochenplan Lesen v1

Profil, Lesestufe und 60-Sekunden-Check erzeugen eine 5-Tage-Struktur: Wiederholen, Materialanker, Spielmodus, Transfer, Mini-Check.

Akzeptanz: Wochenplan erzeugt konkrete Lese-Minieinheiten aus Bibliothek und Förderkreislauf.

## 3. Diagnostik-Radar Deutsch/Lesen v1

Ein vorsichtiges Beobachtungsraster für Vorläufer, Symbolverständnis, phonologische Bewusstheit, Buchstabe-Laut, Silbe, Wort, Satz, Sinnverstehen und Schreibvorläufer.

Akzeptanz: Raster mit Ampel/Notizen, keine Test-/Diagnose-Sprache, klare Förderhypothese.

## 4. Kinder-Spielwelt Vollbild v1

Der Kindermodus wird zu einer eigenen ruhigen Vollbild-Spieloberfläche. Eine Aufgabe pro Bildschirm, große Touchflächen, klare Rückkehr für Lehrkraft.

Akzeptanz: Vollbild-ähnlicher Modus, keine Lehrertexte, kein Score/Timer, Rückweg zu Beobachtung.

## 5. Aufgaben-Varianten-Maschine v1

Jede Karte erzeugt Varianten: leichter, gleich, schwerer, motorisch, kommunikativ, Alltagstransfer.

Akzeptanz: Varianten sichtbar pro Karte und im Generator nutzbar.

## 6. UK-/Gebärden- und Bildanker-System v1

Jede Aufgabe bekommt optionale Antwortwege: zeigen, auswählen, Gebärdenhinweis, Schau-mal-meine-Hände-an, Bildanker, Gegenstand.

Akzeptanz: Support-Modus beeinflusst Aufgabe und Kindermodus klar sichtbar.

## 7. Content-Qualitätsprüfer v1

Ein internes Prüfraster bewertet Karten: vertrauter Wortschatz, Lesestufe, Satzlänge, unbekannte Buchstaben, Überladung, GE-Eignung.

Akzeptanz: Jede Karte erhält Status oder Hinweise; problematische Karten werden markiert.

## 8. Gruppenmodus v1

Mehrere anonyme Profile werden zu einer Unterrichtsstunde zusammengeführt: Station A, Station B, Spielmodus, Materialtisch, gemeinsamer Abschluss.

Akzeptanz: 3 anonyme Profile wählbar, differenzierte Stationen, keine Datenpersistenz.

## 9. Lernpfad-Memory v1

Anonyme Lernstände werden als lokale, nicht-personenbezogene Lernnotizen gedacht: bekannte Buchstaben, hilfreiche Unterstützung, nächste Stufe. Speicherung nur nach expliziter Freigabe.

Akzeptanz: Zunächst UI/Export-Konzept ohne automatische Speicherung sensibler Daten.

## 10. Gesamtpräsentation und Qualitätsreview v1

Die App zeigt eine Lehrer-Präsentation: Was gibt es, wie nutze ich es, welche Förderlogik steckt dahinter, welche Grenzen gibt es, was ist der nächste Ausbauschritt.

Akzeptanz: Präsentationsbereich oder Report mit Screenshots, Stärken, Schwächen, Roadmap.

## Startreihenfolge

1. Druckkarten v1
2. Wochenplan Lesen v1
3. Diagnostik-Radar v1
4. Kinder-Spielwelt v1
5. Varianten-Maschine v1
6. UK-/Bildanker v1
7. Content-Qualitätsprüfer v1
8. Gruppenmodus v1
9. Lernpfad-Memory v1
10. Gesamtpräsentation v1

## Aktueller technischer Blocker

Hermes-Profile mit Codex-Unterbau stürzen aktuell mit einem lokalen OAuth-Refresh-Tokenfehler ab. Bis zur Reauthentifizierung sollten Tasks zwar vorbereitet werden, aber Umsetzung entweder erst nach Reauth oder per CEO-Handoff erfolgen.
