# Lernpfad-Memory und Gesamtpräsentation – Handoff-Spezifikation

Datum: 2026-05-27
Task: t_b3d913ee

## Kurzfazit

Lernpfad-Memory soll nur den kleinsten sicheren Fortschritt zwischen Slices sichern: allgemeine Lernstandsmuster, nächste sinnvolle Stufe, hilfreiche Unterstützung und offene Fragen. Die Gesamtpräsentation soll diese Entwicklung als didaktische Erzählung sichtbar machen, aber ohne Personenbezug, Diagnosen oder sonstige identifizierbare Schülerdaten.

## 1. Was im Lernpfad-Memory persistiert werden soll

Nur stabile, nicht-personenbezogene Informationen:
- anonymisierter Gruppen- oder Farbcode statt Name
- aktueller Lernpfad-Abschnitt oder Slice-Status
- bekannte Inhalte / sichere Anker
- hilfreiche Unterstützungsform
- nächster plausibler Lernschritt
- offene pädagogische Frage für die nächste Bearbeitung
- Qualitäts- oder Risiko-Hinweis, falls relevant

Nicht speichern:
- Namen, Initialen, Geburtsdaten, Diagnosen, Familieninfos
- seltene Merkmalskombinationen, die eine Person indirekt identifizierbar machen
- wörtliche Beobachtungen mit Wiedererkennungswert
- leistungsbezogene Ranglisten oder Bewertungslogik
- sensible Rohdaten aus Schule, Elternkontakt oder Förderdiagnostik

## 2. Wie Fortschritt über mehrere Slices sichtbar bleibt

Der Lernpfad soll nicht als Einzelaktion erscheinen, sondern als Kette von Entwicklungsstufen:
- Ausgangspunkt: was bereits sicher gelingt
- Brücke: welche Unterstützung oder welches Material geholfen hat
- nächster Schritt: was als nächstes sinnvoll ist
- Rückmeldung: was beibehalten, vereinfachen oder erweitern werden sollte

Empfohlene semantische Form pro Slice:
- Ausgangslage
- wirksame Unterstützung
- beobachteter Lernfortschritt
- nächster Schritt
- offene Entscheidung

So bleibt der Verlauf lesbar, auch wenn die einzelnen Slices getrennt bearbeitet werden.

## 3. Darstellung in der Gesamtpräsentation

Die Gesamtpräsentation soll für Lehrkräfte verständlich und sicher sein:
- kein Personenbezug
- keine echten Schülerdaten
- keine diagnostischen Endurteile
- keine Überladung mit Detaildaten
- klarer Bezug auf Förderlogik und praktische Nutzung

Geeignete Inhalte:
- Was der Lernpfad kann
- Wie ein Slice aufgebaut ist
- Wie Fortschritt dokumentiert wird
- Welche Unterstützung sichtbar gemacht wird
- Wo die Grenzen liegen
- Was der nächste Ausbauschritt ist

Sinnvolle Darstellungsform:
- kurze Statusübersicht
- anonymisierte Verlaufskarte oder Roadmap
- Beispiel mit Farbcode statt Person
- Stärken, Grenzen, offene Fragen
- klarer Hinweis auf menschliche Prüfpflicht

## 4. Sicherer Handoff an die nächste Slice

Jeder Slice-Handoff sollte enthalten:
- eindeutige Slice-ID oder Arbeitsname
- aktueller Zustand in 1-2 Sätzen
- was übernommen werden soll
- was bewusst offen bleibt
- welche Risiken oder Datenschutzgrenzen gelten
- welches Artefakt oder welche Datei als Referenz dient
- welche nächste kleinste Aktion empfohlen ist

Nicht enthalten sollten:
- personenbezogene Details
- Interpretationen als Fakten
- ungesicherte Schlussfolgerungen
- breit gestreute Projektgeschichte ohne Relevanz

## 5. Sicherer Handoff an Reviewer

Für Review oder Abnahme braucht es:
- was geändert oder ergänzt wurde
- welche semantische Regel gilt
- wie Datenschutz eingehalten wurde
- was absichtlich nicht gemacht wurde
- welche Unsicherheiten bleiben
- welches konkrete Artefakt geprüft werden soll

Der Reviewer soll schnell erkennen können:
- Ist das anonymisiert?
- Ist der Fortschritt nachvollziehbar?
- Ist die Förderlogik stimmig?
- Ist die Darstellung ohne Risiko nutzbar?

## 6. Leitlinie für die weitere Umsetzung

Die beste Minimalform ist:
- ein kleiner, lokaler Speicher für anonyme Lernpfadnotizen
- eine transparente Verlaufsdarstellung in der Gesamtpräsentation
- ein klarer Übergabe-Block pro Slice
- ein expliziter Datenschutz- und Review-Hinweis

Damit bleibt das System nützlich, ohne sensible Daten unnötig zu speichern oder auszubreiten.
