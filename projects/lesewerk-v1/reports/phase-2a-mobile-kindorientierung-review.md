# Phase 2A - Mobile Kindorientierung Review

## Ampel

Yellow-Green.

## Geprueft

- Lokale LeseWerk-App aus `dist` bei 390px Breite.
- Startansicht, Kinderpfad/Lehrkraft-Trennung, erster Tagespfad, sichtbare Buttons und horizontales Layout.
- `npm test` und `npm run build` liefen vor dieser Phase bereits gruen; die laufende Hermes-Pruefung hat beide ebenfalls gestartet.

## Beobachtung

- Kein horizontaler Ueberlauf bei 390px. Das ist gut.
- Buttons sind gross genug und tablet-/touchfreundlich.
- Der Einstieg ist freundlich, aber fuer Kinder noch lang: Auf 390px entsteht sehr viel vertikale Strecke, bevor die eigentliche Aktivitaet voll sichtbar wird.
- Einige Symbol-/Silbenbuttons haben visuell sinnvolle Groesse, aber automatisiert leeren Button-Text. Das kann fuer Barrierefreiheit und klare Lehrkraft-Kontrolle spaeter ein Problem werden.
- Die Mini-Reise-Familien Bus/Buch sind im System vorhanden, aber nicht zwingend auf der ersten Kind-Startansicht sichtbar, weil sie profile-gated sind. Das ist fachlich richtig, muss aber im Lehrkraftbereich klarer erklaert werden.

## Konkrete Reparaturvorschlaege

1. Start im Kindmodus noch staerker kuerzen: ein grosser Startimpuls, eine aktuelle Karte, ein Hilfe-Button. Lehrkraft-/Profilmaterial weiter nach unten.
2. Mini-Reise-Auswahl im Lehrkraftbereich als "Heute vorbereitet" mit klarer Anzahl und naechstem Kind-Schritt zeigen.
3. Symbol-/Silbenbuttons mit sicheren `aria-label` oder sichtbarer Kurzbeschriftung versehen, ohne die Kinderansicht zu ueberladen.
4. Bei 3er-Wahl sicherstellen: nur eine dominante Frage, zwei bis drei grosse Karten, keine zusaetzlichen Nebenmodule im gleichen Blickfeld.
5. Bus/Buch im Lehrkraftbereich sichtbar als "freigeschaltet bei Profil X" markieren, damit Chris nicht denkt, die Inhalte fehlen.

## Entscheidung fuer Phase 2C

Apfel darf starten, aber nur als kleiner Code-Slice. Keine grosse Architektur-Refactor-Operation im selben Schritt.
