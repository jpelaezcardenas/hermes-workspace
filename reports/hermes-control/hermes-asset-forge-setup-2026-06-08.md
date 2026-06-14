# Hermes Asset Forge Setup - 2026-06-08

## Kurzfazit
Green. Der neue Wochenjob `HERMES_ASSET_FORGE_WEEKLY` wurde angelegt. Er soll jede Woche aus bestehenden Hermes-Signalen genau ein bleibendes, sicheres Asset auswaehlen und als lokalen Brief oder Draft liefern.

## Job
- Name: `HERMES_ASSET_FORGE_WEEKLY`
- ID: `8c9e4b1d72af`
- Rhythmus: Montag 06:30
- Delivery: Telegram
- Workdir: `/Users/zondrius/hermes-workspace`
- Model/provider/base_url: nicht gesetzt

## Warum Montag 06:30
- Nach Wochenplan, Teacher-Nextday, Night App und den letzten Wochenreports.
- Vor den Montag-Vormittagsjobs.
- Gut fuer eine Wochenentscheidung: Was bleibt diese Woche als nutzbares Asset?

## Zweck
Hermes soll nicht nur melden, welche Ideen interessant sind. Der Job fragt:

`Welches kleine Asset soll diese Woche wirklich entstehen, weil es Chris dauerhaft hilft?`

Moegliche Assets:
- GE-Unterrichtskarte
- Nayyal-Hub-Baustein
- VdS-interne Notiz
- Business-Testkarte
- Tool-Sandboxkarte
- Night-App-V2-Brief
- sicherer lokaler Codex-Slice-Brief
- Hermes-Checkliste oder Operating-Regel

## Output
- Hauptreport:
  `/Users/zondrius/hermes-workspace/reports/asset-forge/asset-brief-YYYY-MM-DD.md`
- Optionaler lokaler Draft:
  `/Users/zondrius/hermes-workspace/reports/asset-forge/assets/YYYY-MM-DD-<slug>.md`

## Schutz
- Genau ein Asset.
- Kein Deploy.
- Keine externen Sends.
- Keine privaten Daten.
- Keine echten Schueler-, Eltern-, Diagnose-, Familien-, Login-, Broker-, Cash- oder Steuerdaten.
- Kein Trading, keine Kauf-/Verkaufssprache.
- Keine Installationen, Tokens, Provider, Accounts, Commits, Pushes oder Loeschungen.
- Kein GPT-5.5.
- Fuenferfeld bleibt geparkt.
- Kein direkter Codex-Handoff; nur ein kopierbarer Codex-Befehl, wenn sicher.

## Backup
`/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260608-before-asset-forge`

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob der erste echte Asset-Forge-Lauf nach dem 2026-06-15 manuell nachgeschaerft werden soll.
- BEOBACHTEN: Ob der Job wirklich ein bleibendes Asset statt einer weiteren Ideenliste liefert.
- SPAETER: Nach zwei Laeufen kann der Job bei Bedarf enger auf Schule/Nayyal/Business gewichtet werden.
- BLOCKIERT: nichts
- NICHT_TUN: keine Autopiloten, keine externen Aktionen, keine privaten Daten, keine Handoff-Duplikate.
- Naechste kleinste Aktion: Den ersten Lauf am 2026-06-15 pruefen.
- Beleg / Datei: `/Users/zondrius/.hermes/scripts/hermes_asset_forge_check.py`
