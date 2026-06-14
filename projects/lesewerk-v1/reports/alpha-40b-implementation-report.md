# Alpha 40B Implementation Report

## Ergebnis

Alpha 40B wurde als kleine, bewusst begrenzte Wort- und Silben-Erweiterung umgesetzt. Die App hat vier neue lokale Leseangebote erhalten:

- `alpha40-a-ich` -> Ich
- `alpha40-a-da` -> Da
- `alpha40-a-ja` -> Ja
- `alpha40-b-nein` -> Nein

Die Aufgaben bleiben auf der fruehen Bild-Wort-Ebene und veraendern den Kinderpfad nicht automatisch. Sie werden nur ueber die lokalen Profil-/Gating-Regeln angeboten, wenn Grapheme, Silben und Unterstuetzungsprofil passen.

## Geaenderte Dateien

- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

## Didaktische Einordnung

Die neuen Woerter ergaenzen die kommunikative fruehe Leseschiene. Sie sind kurz, alltagsnah und fuer GE-Lernsettings gut beobachtbar:

- Ich: Selbstbezug, Identitaet, Zeigegeste
- Da: gemeinsamer Aufmerksamkeitsfokus
- Ja: Zustimmung, Wahlhandlung
- Nein: Ablehnung, Stopp, Selbstbestimmung

Die Erweiterung bleibt absichtlich klein, damit die Orientierung der App nicht wieder unuebersichtlich wird.

## Profil- und Sicherheitslogik

Erweitert wurden:

- `profileBuilderOptions.graphemes` um `d`, `j`, `ei`
- `profileBuilderOptions.syllables` um `ich`, `da`, `ja`, `nein`
- `taskRequirementProfiles` um vollstaendige lokale Profile fuer alle vier neuen Aufgaben

Ein sehr fruehes Profil mit nur `m`, `a`, `ma` blockiert alle Alpha-40B-Aufgaben weiterhin. Ein passendes Kommunikationsprofil kann die vier Aufgaben zulassen.

## Verifikation

Frisch geprueft am 2026-05-19:

- `npm test`: 141/141 Tests bestanden
- `npm run build`: erfolgreich
- Lokale Inhaltspruefung:
  - Standard-Tagespfad bleibt bei 4 Karten
  - fruehes Profil startet weiter mit der bestehenden Mama-Logik
  - Alpha-40B-Aufgaben sind fuer ein sehr fruehes Profil blockiert
  - Alpha-40B-Aufgaben sind fuer ein passendes Kommunikationsprofil erlaubt
- Browser-Smoke:
  - Desktop 1280x900: App laedt, Lehrkraftbereich erreichbar, kein horizontaler Overflow, keine JS-Fehler
  - Mobile 390x844: App laedt, Lehrkraftbereich erreichbar, kein horizontaler Overflow, keine JS-Fehler

Hinweis: Der Favicon-404 wurde ignoriert, weil er nicht zur App-Funktion gehoert.

## Safety

Die Erweiterung fuegt keine riskanten Funktionen hinzu:

- keine echten Schuelerdaten
- keine Namen, Klassen, Logins, Cloud- oder Exportlogik
- keine Diagnose-, Score-, Timer- oder Rankinglogik
- keine externen oder geschuetzten Symbolassets
- keine automatische Uebernahme in den Kinderpfad

## Naechster sinnvoller Schritt

Alpha 40C sollte nicht mehr neue Woerter in Masse erzeugen, sondern die Orientierung staerken: Lehrkraft soll besser sehen, wann von Bild zu Silbe, Wort, Satz und Mini-Geschichte gewechselt wird. Fuer Kinder sollte die aktuelle Ebene klarer, attraktiver und ruhiger sichtbar werden.
