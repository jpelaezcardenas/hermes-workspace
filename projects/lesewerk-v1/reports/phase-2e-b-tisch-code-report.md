# Phase 2E-B - Tisch Mini-Reise Code Report

## Ergebnis

`Tisch` ist als volle Mini-Reise eingebaut.

## Umgesetzt

- Neue Wortfamilie `Tisch`.
- Gating ueber `t`, `i`, `s`, `ch` und `tisch`.
- Fuenf Stationen:
  - Bild: `Schau den Tisch an.`
  - Silbe/Wortaufbau: `Lies: Tisch.`
  - Wort: `Lege oder wähle Tisch.`
  - Satz: `Lies: Der Tisch ist da.`
  - Mini-Geschichte: `Der Tisch ist da. Was passt?`
- Lokales CSS-Symbol fuer Tisch, ohne externe Bilder.
- Lehrkraft-Rationale mit sichtbarem `ch`-Risiko.
- Readiness-Uebersicht und Story-Choice.
- UI-Integration in Auswahlkarte, Symbolszene und Mini-Geschichte.

## CEO-Handoff

Der Hermes-Worker hat lange gelesen, aber nicht geschrieben. Danach wurde der Code-Slice gezielt umgesetzt und verifiziert.

## Verifikation

- `npm test`: 232/232 Tests gruen.
- `npm run build`: gruen.
- Direkter Inhaltscheck: Tisch-Karte erscheint bei passendem Profil und alle fuenf Prompts sind korrekt.

## Bewertung

Gruen. Tisch ist fachlich sinnvoll, aber wegen `ch` bewusst lehrkraftgefuehrt und nicht als fruehestes Kind-Wort gedacht.
