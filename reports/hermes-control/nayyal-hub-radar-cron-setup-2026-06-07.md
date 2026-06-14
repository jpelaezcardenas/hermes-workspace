# Nayyal Hub Radar Cron Setup - 2026-06-07

## Ergebnis
Neuer Hermes-Job angelegt:

- Name: `NAYYAL_HUB_RADAR_DAILY`
- ID: `bd089109d997`
- Rhythmus: taeglich 04:05
- Delivery: Telegram
- Workdir: `/Users/zondrius/hermes-workspace`
- Output: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-YYYY-MM-DD.md`

## Sinn
Hermes soll jede Nacht nayyal.com und bekannte Unterseiten als Hub-System betrachten:

- Was versteht ein Besucher sofort?
- Welche Unterseiten sind sichtbar, versteckt, unklar oder privat?
- Welche Bruecken fehlen zwischen Schulwerkstatt, LeseWerk, GE, Wahren Playbook, Hermes OS und privaten Forschungsbereichen?
- Was sollte oeffentlich wirken, was muss klar privat bleiben?
- Welche kleine Verbesserung hat morgen den groessten Nutzen?

## Meta-Ebene
Der Job soll nicht nur Copy-Vorschlaege liefern. Er soll erkennen, ob Nayyal.com eher:

- persoenliche Hub-Seite,
- Bildungs-/Schulwerkstatt-Schaufenster,
- AI-/Hermes-Systemseite,
- Demo-Katalog,
- Produkt-Reifegradkarte,
- oder sichere Connector-Zentrale

sein sollte.

## Sicherheitsregeln
- Keine Deploys, Commits, Pushes oder Veroeffentlichungen.
- Keine Logins, Formulare, externen Accounts oder Secrets.
- Keine privaten Portfolio-, Cash-, Broker-, Expense- oder Orderdaten in oeffentlichen Vorschlaegen.
- Keine Trading-Empfehlungen.
- Keine echten Schuelerdaten, Diagnosen, Familien- oder Schuldaten.
- Keine GPT-5.5-/teure Modell-Eskalation fuer diesen Routinejob.
- Fuenferfeld bleibt geparkt und darf nicht als Nayyal-Richtung empfohlen werden.

## Hermes-Integration
Zusaetzlich gepatcht:

- `HERMES_CONTROL_DAILY` liest kuenftig den neuesten Nayyal-Hub-Radar mit.
- `CODEX_HANDOFF_SCOUT_DAILY` darf aus dem Nayyal-Hub-Radar nur dann einen Codex-Handoff machen, wenn der Report eindeutig `CODEX_HANDOFF_READY` und `Safe for Codex: yes` meldet.

## Validierung
- Backup erstellt: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260607-before-nayyal-hub-radar`
- Aktive Cron-Datei bleibt gueltiges JSON.
- Neuer Job ist aktiv.
- Naechster Lauf ist auf `2026-06-08T04:05:00+02:00` gesetzt.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: ob der erste Radar-Lauf danach direkt in einen Codex-Handoff uebergehen soll
- BEOBACHTEN: Qualitaet des ersten Nayyal-Hub-Radars am 2026-06-08
- SPAETER: bei guter Qualitaet eine kleine sichere Nayyal-Connector-Verwaltung als Codex-Slice ableiten
- BLOCKIERT: nichts
- NICHT_TUN: keine Live-Seite automatisch veraendern oder deployen
- Naechste kleinste Aktion: ersten Lauf morgen frueh auswerten
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
