# Night App Proof-Kiosk — 2026-06-14

## Zweck
Lokaler TEST_CARD-Prototyp, der Chris hilft, endlich eine datensparsame Proof-Ledger-Zeile zu vorhandenen Night-App-Prototypen zu erzeugen. Die App schreibt nichts und nutzt keine externen Dienste.

## Öffnen
```bash
open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-14-proof-kiosk-night-app/index.html
```

## 60-Sekunden-Test
1. Einen vorhandenen Night-App-Prototyp in der linken Auswahl wählen.
2. Den angezeigten `open ...`-Befehl kopieren/ausführen.
3. Den vorhandenen Prototyp kurz klicken.
4. Im Proof-Kiosk `hilfreich`, `nicht hilfreich` oder `parken` wählen.
5. Ledger-Zeile kopieren und manuell unter `## Real Entries` in `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md` eintragen.

## Was würde scheitern?
- Wenn die referenzierten Prototyp-Pfade fehlen.
- Wenn ohne realen Sichttest einfach `tested_useful` eingetragen wird.
- Wenn personenbezogene Details in die Proof-Zeile geraten.

## Grenzen
Keine externen APIs, keine Accounts, kein Deploy, kein Commit, kein Push, keine sensiblen Daten. Kein automatisches Schreiben ins Proof-Ledger.
