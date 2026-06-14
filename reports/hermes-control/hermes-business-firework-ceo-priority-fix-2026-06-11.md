# Hermes Business Firework CEO Priority Fix - 2026-06-11

## Anlass

Der Business-Ideenjob lieferte am 2026-06-11 zwar einen sinnvollen Proof-Gedanken, stand aber nicht hart genug unter dem Morgen-CEO. Dadurch konnte neben der eigentlichen Tagesaktion ein zweiter `SOFORT_MACHEN`-Impuls entstehen.

Zusätzlich war das Proof Ledger missverstaendlich: Beispielzeilen konnten wie echte Rueckmeldungen wirken, und ein Report nutzte einmal die falsche Mischform `getestet_useful`.

## Geaendert

- `BUSINESS_IDEA_FIREWORK_DAILY` wurde gekuerzt und geschaerft.
- `HERMES_MORNING_CEO_DAILY` ist fuer den Business-Job jetzt explizit die Master-Tagesaktion.
- Wenn Morning CEO bereits einen konkreten Proof-Auftrag gibt, darf Business Firework keinen konkurrierenden `SOFORT_MACHEN` erzeugen.
- Business Firework muss echte Proof-Zeilen von Beispielen trennen.
- Gueltige Proof-Statuswerte sind exakt: `untested`, `tested_useful`, `tested_not_useful`, `parked`.
- Mischformen wie `getestet_useful` sind explizit verboten.
- Das Proof Ledger hat nun einen Bereich `## Real Entries`; nur Zeilen darunter zaehlen als echte Proof-Eintraege.
- `hermes-jobs-overview.md` dokumentiert die neue Regel.

## Dateien

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/.hermes/scripts/hermes_business_firework_light_check.py`
- `/Users/zondrius/.hermes/scripts/hermes_proof_mode_check.py`
- `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`

## Ergebnis

- Business Firework bleibt aktiv, aber untergeordnet.
- Morning CEO bleibt morgens der eine Tagesbefehl.
- Business Firework darf Ideen liefern, aber nicht gegen den Tagesbefehl ziehen.
- Proof Mode ist robuster, weil Beispiele nicht mehr als echte Tests gelten.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Ob Business Firework ab 2026-06-12 bei vorhandener Morning-CEO-Aktion `SOFORT_MACHEN: nichts` oder dieselbe Proof-Aktion nutzt.
- SPAETER: Wenn Business Firework weiterhin zu oft nur Nebenimpulse liefert, Rhythmus auf 2-3x pro Woche senken.
- BLOCKIERT: nichts
- NICHT_TUN: Keine zweite Tagesaktion neben dem Morgen-CEO erzwingen.
- Naechste kleinste Aktion: Morgenbericht vom 2026-06-12 auf CEO-Prioritaet gegenlesen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-business-firework-ceo-priority-fix-2026-06-11.md`
