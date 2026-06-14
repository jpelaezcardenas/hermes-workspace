# Codex Result

## Auftrag

Offenen Codex-Handoff `codex-handoff-2026-06-04-ge-mengen-legen-schmalansicht.md` bearbeiten:

Pruefen, ob `Mengen legen` im schmalen Viewport die Kindaktion, Mattenflaeche, Zahlwahl, Hilfen und den offenen Lehrkraftbereich sauber traegt.

## Gepruefter Stand

- Projekt: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt`
- Lokaler Server: `http://127.0.0.1:5173/`
- Viewport: `390 x 844`
- Pfad: Start -> `Mengen legen`
- Flow: zwei Steine legen -> zur Zahlwahl scrollen -> `2` waehlen -> Feedback pruefen -> Lehrkraft-Hinweis oeffnen

## Ergebnis Kurz

Status: bestanden mit kleinem Test-Hinweis.

Der schmale Viewport traegt den Flow:

- kein horizontaler Ueberlauf;
- Mattenflaeche ist sichtbar;
- `Stein legen` ist im ersten Viewport voll erreichbar;
- Zahlwahl ist nach kurzem Scrollen erreichbar;
- Feedback `Passt. Die Menge ist gelegt.` erscheint sichtbar;
- der offene Lehrkraft-Hinweis verdeckt keine Kindaktion, sondern liegt statisch unter der Hilfeleiste.

## Messwerte

Erster schmaler Viewport:

- Viewport: `390 x 844`
- Dokumentbreite: `390`
- Mattenflaeche: `340 x 172`, sichtbar
- Button `Stein legen`: `166 x 58`, komplett sichtbar, Bottom `743` bei Viewporthoehe `844`
- Supportbereich geschlossen/weiter unten, keine Ueberdeckung im ersten Viewport

Nach zwei Steinen und Auswahl `2`:

- Feedback gefunden: ja
- Feedback sichtbar: `340 x 56`
- Text: `Passt. Die Menge ist gelegt.`
- Dokumentbreite weiterhin: `390`

Offener Lehrkraft-Hinweis:

- Lehrkraftbereich offen: ja
- Position: `static`
- Start Lehrkraftbereich: `y=762`
- Ende Hilfeleiste: `y=752`
- Ergebnis: kein Overlay, keine Ueberdeckung; der Lehrkraftbereich schiebt die Seite nach unten.

## Checks

Bestanden:

- `npm run build`
- `npm run build:esbuild`
- Browser-Flow im schmalen Viewport

Nicht bestanden:

- `node tests/quantity-narrow-css.test.mjs`

Grund:

Der Test erwartet eine einzelne Regel `.quantitySupportBar { ... }`. Die aktuelle CSS-Regel ist kombiniert geschrieben:

```css
.quantitySupportBar,
.ukSupportBar {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

Die echte Browsermessung zeigt trotzdem die gewuenschte 2-Spalten-Hilfeleiste. Das ist daher kein Sichtfehler im Flow, sondern ein zu eng formulierter Test.

## Screenshot

Screenshot wurde versucht, lief aber in einen Browser-Capture-Timeout. Die DOM-/Layoutmessung und der Flow wurden im laufenden Browser bestaetigt.

## Bewertung

Der Handoff ist fachlich erledigt:

- Kinderaktion bleibt sichtbar und nutzbar.
- Mattenflaeche und Zahlwahl ueberlappen nicht.
- Offener Lehrkraftbereich verdeckt keine Kindaktion.
- Keine neue Funktion oder Inhaltsaenderung noetig.

## Risiken

- Der CSS-Test sollte spaeter minimal an kombinierte Selektoren angepasst werden, wenn dieser Test als dauerhaftes Sicherheitsnetz dienen soll.
- Ein echter Tablet-/Unterrichtstest bleibt wertvoll, ersetzt aber nicht diese technische Sichtpruefung.

## Nicht Gemacht

- Keine neuen Inhalte.
- Keine UI-Umbauten.
- Keine App-Code-Aenderung.
- Keine Installation.
- Kein Commit, Push oder Deploy.
- Keine personenbezogenen Daten.

## Naechster Kleiner Schritt

Den offenen Inbox-Handoff als mit Rueckgabe versehen behandeln. Danach kann Hermes Janitor/Handoff-Hygiene entscheiden, ob der Handoff archiviert wird.

