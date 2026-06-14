# Lernpfad-Memory v1 – Konzeptreport

## Kurzfassung
Lernpfad-Memory v1 ist als kleiner, lokaler und strikt anonymer Zwischenspeicher gedacht. Er merkt sich nur den kleinsten sicheren Lernfortschritt zwischen Slices: bekannte Buchstaben oder andere sichere Anker, hilfreiche Unterstützung, nächste sinnvolle Stufe und eine offene pädagogische Frage.

Wichtig ist dabei die klare Trennung zwischen UI-Konzept, Export-Hinweis und Speicherung: Es gibt zunächst keine automatische Persistenz sensibler Daten. Ein Speichern oder Exportieren soll nur nach expliziter Freigabe und mit deutlich sichtbarem Hinweis erfolgen.

## Ziel des Bausteins
- Fortschritt über mehrere Bearbeitungen hinweg sichtbar halten
- Anonyme Lernnotizen statt personenbezogener Verlaufsdaten
- Unterstützung und nächste Schritte dokumentieren, nicht bewerten
- Eine sichere Grundlage für spätere Export- oder Speicherfunktionen schaffen

## Was im Memory stehen darf
Nur nicht-personenbezogene, stabile Informationen:
- anonymer Farbcode oder Profilcode statt Name
- aktueller Slice-Status oder Lernpfad-Abschnitt
- bekannte Inhalte / sichere Anker
- hilfreiche Unterstützungsform
- nächster plausibler Lernschritt
- offene Frage für die nächste Bearbeitung
- optional ein knapper Risiko- oder Qualitätshinweis

## Was bewusst nicht gespeichert wird
- Namen, Initialen, Geburtsdaten, Adressen
- Diagnosen oder medizinische Angaben
- Familieninfos oder andere identifizierbare Zusatzdetails
- wörtliche Beobachtungen mit hohem Wiedererkennungswert
- Ranglisten, Bewertungen oder Defizitlogik
- Rohdaten aus Schule, Elternkontakt oder Förderdiagnostik

## UI-Konzept
Die Oberfläche sollte drei Dinge klar voneinander trennen:

1. Lernnotiz anzeigen
   - anonymer Farbcode / Profilcode
   - bekannte Buchstaben oder sichere Anker
   - hilfreiche Unterstützung
   - nächste Stufe

2. Export vorbereiten
   - kurze Vorschau der anonymisierten Notiz
   - klarer Hinweis: keine automatische Speicherung
   - Export nur nach bewusster Aktion

3. Speicherung freigeben
   - explizite Freigabe in einem zweiten Schritt
   - deutliches Warnlabel, dass nur anonymisierte Inhalte gespeichert werden
   - Session-Ende bleibt standardmäßig flüchtig

## Empfohlenes Wording
Für die Unterstützung sollte kein Ranking- oder Ampelgefühl entstehen. Geeignet sind neutrale, pädagogische Labels wie:
- Hand dabei
- kurz gezeigt
- alleine versucht

Für die Lernnotiz selbst ist eine sachliche Form sinnvoll:
- Farbe / Profil
- Bereich
- Lerninhalt
- bekannte Buchstaben
- hilfreiche Unterstützung
- nächster kleiner Schritt

## Export-Konzept
Der Export soll bewusst klein, anonym und überprüfbar sein.

Empfohlene Export-Felder:
- Profilcode oder Farbcode
- Lernbereich
- sicher bekannte Buchstaben / Inhalte
- hilfreiche Unterstützung
- nächster Schritt
- offene Frage
- Hinweis: anonymisiert und nicht-diagnostisch

Der Export sollte als kurze Text- oder JSON-ähnliche Vorschau möglich sein, damit Lehrkräfte vor dem Speichern sehen, was tatsächlich herausgeht.

## Sicherheits- und Datenschutzprinzip
- keine automatische Speicherung
- keine stillen Hintergrund-Exports
- keine personenbezogenen Felder
- kein LocalStorage als verdeckter Ersatz für echte Freigabe
- sichtbarer Hinweis: nur anonymisierte Lernnotiz, keine Diagnose
- menschliche Prüfung bleibt Pflicht

## Pädagogische Logik
Der Baustein soll nicht „Leistung“ messen, sondern Lernhilfe sichtbar machen:
- Ausgangspunkt: was sicher gelingt
- Unterstützung: was geholfen hat
- Fortschritt: was jetzt schon möglich ist
- nächster Schritt: was als nächstes sinnvoll ist

So bleibt der Lernpfad lesbar, ohne Defizite zu markieren oder Personen indirekt erkennbar zu machen.

## Grenzen
- Kein automatisches Langzeitgedächtnis für sensible Daten
- Kein diagnostischer Anspruch
- Keine verdeckte Persistenz
- Keine Personalisierung über Identifikatoren

## Nächster sinnvoller Schritt
Als kleinste nächste Ausbaustufe bietet sich ein reines UI-Prototyping an:
- Karte für anonyme Lernnotiz
- Export-Vorschau
- Double-Lock-Bestätigung für das Speichern
- deutlicher Datenschutz-Hinweis

## Kurzfazit
Lernpfad-Memory v1 ist nützlich, wenn es sehr klein bleibt: anonyme Notizen, klare Export-Vorschau und explizite Freigabe statt automatischer Speicherung. Damit entsteht ein sicherer didaktischer Zwischenspeicher ohne unnötige Datenschutzrisiken.