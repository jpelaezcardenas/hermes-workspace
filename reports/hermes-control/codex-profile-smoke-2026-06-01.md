# Codex Profile Smoke - 2026-06-01

Status: green
Scope: reine Statuspruefung, kein Modell-Prompt, keine Config-Aenderung

## Ergebnis

Hermes ist fuer den Nous-Auslauf weiterhin sauber auf OpenAI Codex ausgerichtet.

Aktuelle Profile:

```text
default:       gpt-5.4-mini, stopped
coder:         gpt-5.4,      stopped
finance:       gpt-5.4,      stopped
ideas:         gpt-5.4-mini, stopped
lernwerkstatt: gpt-5.4-mini, stopped
memory:        gpt-5.4-mini, stopped
neva:          gpt-5.4-mini, running
research:      gpt-5.4-mini, stopped
schule:        gpt-5.4,      stopped
```

Status-Pruefung:

- Provider: OpenAI Codex;
- OpenAI Codex: logged in;
- Nous Portal: not logged in;
- Gateway: running;
- aktive Sessions: 1;
- aktive Jobs: 18.

## Guardrails

- In den aktiven Hermes-Config- und Auth-Dateien wurde kein aktiver `nous`-Eintrag gefunden.
- In den aktiven Hermes-Config- und Auth-Dateien wurde kein Modellname `gpt-5.5` gefunden.
- Eine breite Suche nach `5.5` findet nur Zeitstempel in Auth-Dateien, keine Modellroute.
- Es wurde kein Neva-Neustart ausgefuehrt.
- Es wurde kein Prompt an ein Modell gesendet.

## Bewertung

Die aktuelle Route passt zur Cutover-Regel:

- normale Profile auf `gpt-5.4-mini`;
- schwere Rollen `coder`, `finance`, `schule` auf `gpt-5.4`;
- kein GPT-5.5 als Default oder Nebenroute;
- Nous nicht mehr als aktiver Arbeitskanal.

## Naechster Punkt

Nach dem 2026-06-06 kann entschieden werden, ob die deaktivierten Nous-Backups geloescht oder noch eine Weile als Sicherheitskopie behalten werden.
