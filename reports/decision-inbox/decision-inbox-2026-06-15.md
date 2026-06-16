# Daily Decision Inbox - 2026-06-15

## Kurzfazit
Signal: Yellow. Hermes läuft grundsätzlich, aber ein aktiver Schul-/GE-Cron ist kaputt: `WOCHENPLAN_GE_SONNTAG` findet sein Script nicht. Heute keine neue Projektarbeit starten; zuerst diese kleine Betriebsentscheidung treffen.

## Gesammelte Buckets
- SOFORT_MACHEN: `WOCHENPLAN_GE_SONNTAG` prüfen und entscheiden: fehlenden Scriptpfad reparieren oder aktiven Job pausieren lassen.
- CHRIS_ENTSCHEIDET: Cron-Reparatur/Pause; Nayyal Connector Registry lokal anlegen lassen; UK-Startkarten-Handoffs später archivieren/schließen; Hermes-Doctor-Fixes ausführen; GMEX-Primärquellenfrage manuell prüfen.
- BEOBACHTEN: Proof Ledger ohne echte Real Entries; Nayyal Hub Public/Research/Private-Grenzen; GMEX nur Research-Watch; VdS-GE nächster Wochenlauf; zwei offene UK-Handoffs.
- SPAETER: Handoff-Janitor-Regel schärfen; optionale Config-Migration/Symlink-Hygiene; Nayyal Registry nach Freigabe.
- BLOCKIERT: Sonntags-Wochenplan-Ausgabe durch fehlendes Script; automatische Archivierung der UK-Handoffs ohne Freigabe.
- NICHT_TUN: Keine Fuenferfeld-Linie, keine V2/Produktisierung ohne Proof, keine Finanzaktion, keine Deploys/Commits/Pushes, keine Cron-Änderung automatisch.

## Befehlskarte Heute
- Chris 5-Minuten-Befehl: Entscheide beim Job `WOCHENPLAN_GE_SONNTAG`: reparieren oder pausieren.
- Codex-Befehl: keiner - erst Entscheidung, dann ggf. kleiner Reparatur-Handoff.
- Hermes-Pruefbefehl: `hermes cron list` erneut prüfen und den Sonntagsjob isoliert betrachten.
- Proof-Befehl: keiner für den Cron-Fehler; Proof Ledger bleibt nur für echte Nutzungsbelege relevant.
- Stop-/Park-Befehl: Wenn Wochenplan-Sonntag nicht gebraucht wird, nicht reparieren, sondern bewusst parken/pausieren.
- Nicht-ausfuehren: Keine automatische Reparatur, keine Löschung, keine Script-Neuanlage, keine sensiblen Daten.

## Belege
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-15.md`
- `hermes cron list` 2026-06-15
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: `WOCHENPLAN_GE_SONNTAG` prüfen und entscheiden: fehlenden Scriptpfad reparieren oder aktiven Job pausieren lassen.
- CHRIS_ENTSCHEIDET: Cron-Reparatur/Pause; Nayyal Connector Registry lokal anlegen lassen; UK-Handoffs später archivieren/schließen; Hermes-Doctor-Fixes ausführen.
- BEOBACHTEN: Proof Ledger ohne Real Entries; Nayyal Hub Registry-Signal; GMEX nur Research-Watch; VdS-GE nächster Lauf 2026-06-19.
- SPAETER: Handoff-Janitor-Regel und Hermes-Doctor-Hygiene gebündelt bearbeiten.
- BLOCKIERT: Sonntags-Wochenplan-Ausgabe ist durch fehlendes Script blockiert; automatische Handoff-Archivierung ohne Freigabe blockiert.
- NICHT_TUN: Keine Fuenferfeld-Linie, keine V2 ohne Proof, keine Finanzaktion, keine Deploys/Commits/Pushes, keine Cron-Änderung automatisch.
- Naechste kleinste Aktion: Chris gibt kurz frei: `Wochenplan-Cron reparieren` oder `Wochenplan-Cron pausieren`.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-15.md`
