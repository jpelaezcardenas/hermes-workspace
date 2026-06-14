# Alpha 52A – Review-Modus Audit

## Kurzfazit
Der kleinste sichere nächste Schritt ist kein neuer Kindermodus, sondern eine schlichte Lehreransicht: vorhandene Wortfamilien nur ansehen, vergleichen und manuell als Review auswählen. Das passt zu den Alpha-50/51-Erkenntnissen, bleibt lokal und vermeidet jede neue Bewertungs-, Speicher- oder Automatiklogik.

## Aktuell verfügbare Wortfamilien-Slices
Aus `src/lesewerk-content.mjs` und den Tests sind derzeit vor allem diese kleinen, in sich geschlossenen Wortfamilien-Slices klar erkennbar:

- Tasse
  - Basis im Content: `a-tasse`, `b-ta-sche`, plus Story-Bezüge rund um Tasse/Tisch.
  - Qualitätsslice aus den Tests: kleine Tasse-Kette mit Bedeutung, Silbe, Kontrast und Satztransfer.
- Mama
  - Basis im Content: `b-ma-ma`, plus Story-/Transferbezüge.
  - Qualitätsslice aus den Tests: kleine Mama-Kette mit Bedeutung, Silbe, Kontrast und Satztransfer.

Weitere vorhandene Inhalte im System sind eher Einzelwörter, Storys oder allgemeine Aufgaben, aber kein weiterer gleich klarer Mini-Qualitätsslice mit derselben engen Review-Logik wie Tasse und Mama.

## Was im Code bereits vorhanden ist, das für Review nutzbar wäre
- `App.tsx`
  - `mode` mit `child | teacher`
  - `teacherPreviewProfileKey`
  - `teacherPreviewProfiles` mit anonymen Profilbeispielen
  - `teacherDevelopmentOverview`
  - `teacherDailyPathSuggestion`
  - `teacherPreviewDailyPath`
  - `coverageSummary`
- `src/lesewerk-content.mjs`
  - `getTeacherDevelopmentOverview(...)`
  - `getTeacherDailyPathSuggestion(...)`
  - `getProfileSafeDailyPath(...)`
  - `getTaskRequirementCoverageSummary(...)`
  - lokale, manuelle Profil- und Pfadlogik ohne echte Lerndaten
- Tests
  - Absicherung gegen Score-, Ranking-, Timer-, Diagnose-, Export-, Upload- und Persistenzlogik
  - Absicherung, dass die Lehrerübersicht nur Orientierung liefert

## Drei kleine Review-Modus-Optionen

### Option 1 – Lehrer-Selector mit Read-only-Vorschau
Eine sehr kleine Lehreransicht, in der vorhandene Wortfamilien nur ausgewählt und gelesen werden können.

Was sie zeigt:
- Auswahlknöpfe für bestehende Slices wie Tasse und Mama
- kurze Read-only-Karte pro Slice
- keine Auswertung, kein Fortschritt, keine Speicherung

Vorteil:
- fachlich sehr sicher
- minimaler Eingriff
- passt gut zu „erst prüfen, dann ggf. später auswählen“

Nachteil:
- noch keine echte Review-Gestik außer Sichtung und Vergleich

### Option 2 – Lehrer-Review-Board mit Ampel-Notiz ohne Zahlen
Eine kompakte Übersicht der vorhandenen Slices mit manuellen Markerfeldern wie „geeignet“, „noch prüfen“, „später“.

Was sie zeigt:
- Slice-Name
- Kernmerkmale
- manuelle Notizfelder
- keine automatische Ableitung

Vorteil:
- unterstützt Planung und Teamgespräch
- bleibt noch relativ ruhig

Nachteil:
- wirkt schneller nach Dokumentation oder Förderdiagnostik, wenn zu viele Felder dazukommen

### Option 3 – Nur eine erweiterte teacher-side Vorschlagskarte
Die bestehende Lehrerübersicht bleibt der Kern; sie bekommt nur einen klaren Bereich „Verfügbare Review-Slices“ mit Tasse/Mama als manuell wählbare Karten.

Vorteil:
- wahrscheinlich der kleinste Umbau
- vorhandene Architektur kann weitergenutzt werden
- kaum neue UI-Fläche

Nachteil:
- weniger klar getrennt als ein eigenes Review-Board

## Empfehlung: kleinste sichere 52B-Implementierung
Ich würde Option 3 empfehlen: eine read-only Lehrerkarte mit kleinem Selector für vorhandene Review-Slices.

Warum genau diese Variante:
- sie baut auf der bereits vorhandenen teacher-side Logik auf
- sie bleibt strikt lokal und manuell
- sie erzeugt keinen neuen Kindmodus
- sie vermeidet neue Bewertungssprache
- sie kann als Planungs- und Sichtungsinstrument dienen, ohne einen neuen Lernpfad zu erfinden
- sie ist klein genug, um fachlich und technisch gut kontrollierbar zu bleiben

## Wie 52B minimal aussehen könnte
- In der Lehreransicht erscheint ein kleiner Bereich „Review vorhandener Wortfamilien“.
- Dort stehen nur die bestehenden Mini-Slices, vorerst Tasse und Mama.
- Zu jedem Slice gibt es eine kurze, read-only Zusammenfassung:
  - Kernwort
  - Art der Kette: Bild/Bedeutung, Silbe, Kontrast, Satztransfer
  - Hinweis, ob der Slice nur zur Sichtung oder als nächster möglicher Anschluss taugt
- Auswahl ändert nur die angezeigte Vorschau, nicht den Kinderpfad.
- Kein Speichern, kein Export, kein Login, keine Cloud, keine automatische Pfadmutation.

## Exakte Acceptance Criteria für ein späteres 52B
1. Die App zeigt eine teacher-side Review-Ansicht für vorhandene Wortfamilien.
2. Die Review-Ansicht ist read-only für den Kinderpfad.
3. Die Review-Ansicht enthält zunächst nur vorhandene Mini-Slices wie Tasse und Mama.
4. Der Nutzer kann zwischen den vorhandenen Slices manuell umschalten.
5. Das Umschalten verändert keine Inhalte automatisch im Kinderpfad.
6. Es gibt keine Scores, keine Rankings, keine Timer, keine Prozentwerte und keine Notenlogik.
7. Es gibt keine Speicherung von Auswahlverläufen oder Review-Status.
8. Es gibt keine Upload-, Export-, Login- oder Cloud-Funktion.
9. Es werden keine realen Lernendendaten benötigt oder angezeigt.
10. Wortwahl und UI bleiben klar als Unterrichts-/Planungshilfe erkennbar.

## Wording-Guardrails
Vermeiden:
- Score
- Ranking
- Testwert
- Placement
- Diagnose
- Defizit
- Leistungskurve
- Fortschrittswert
- Timer
- Prozent
- Note
- Fehlerquote
- automatisch eingestuft
- endgültig

Bevorzugen:
- Orientierung
- Sichtung
- manueller Review
- möglicher Anschluss
- gemeinsamer Blick
- nächster möglicher Schritt
- Unterrichtsvorschlag
- read-only
- lokal
- anonym
- bewusst auswählen

## Risiken
- Ein zu breiter Review-Modus kann schnell wie ein Diagnostik-Dashboard wirken.
- Zu viele zusätzliche Felder würden die Klarheit der Lehreransicht schwächen.
- Wenn Review-Status gespeichert werden, entsteht unnötig Persistenz und spätere Komplexität.
- Wenn der Selector automatisch auf den Kinderpfad zurückwirkt, verletzt das die gewünschte Trennung.
- Wenn neue Slice-Typen ohne klare Mini-Qualität angelegt werden, verliert der Modus seine Ruhe.

## Fazit
Für Alpha 52 ist der sicherste Weg ein kleiner Lehrer-Review-Modus als read-only Selector auf vorhandene Wortfamilien. Das ist fachlich nützlich, technisch klein und bleibt sauber getrennt von Schülerpfad, Bewertung und Persistenz.