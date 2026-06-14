# Hermes Execution Quality Fixes - 2026-06-08

## Kurzfazit
Green. Die heutigen Hermes-Ausgaben waren inhaltlich brauchbar, aber nicht sauber genug fuer echte Execution: Nayyal hatte kaputte Zeichen und zu wenig konkretes Artefakt; Night App Studio hatte einen halben V2-Codex-Befehl. Die betroffenen Regeln wurden gezielt nachgeschaerft.

## Root Cause
- Nayyal Hub Radar hatte keine harte Output-Hygiene gegen NUL-Bytes/mojibake.
- Nayyal erzeugte gute Strategie, aber keine konkrete Public/Research/Private-Arbeitskarte.
- Der Codex-Ready-Block war im heutigen Nayyal-Report trotz Promptformat nicht vorhanden.
- Night App Studio erlaubte einen bedingten Pseudo-Befehl in der Form `/goal nur dann ...`.

## Fixes
- Backup der Cron-Konfiguration erstellt:
  `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260608-before-execution-quality-fixes`
- `NAYYAL_HUB_RADAR_DAILY` ergaenzt:
  - Output hygiene gate: keine NUL-Bytes, keine kaputten Zeichen.
  - ASCII-Transliteration als Fallback: ae/oe/ue/ss.
  - konkrete Public / Research / Private map als companion artifact, wenn Orientierung der beste naechste Schritt ist.
  - Codex-Ready consistency rule: CODEX_HANDOFF_READY nur bei sicherem lokalen Slice; sonst HUMAN_REVIEW_FIRST oder IDEA_ONLY.
- `NIGHT_APP_STUDIO_BUILD_DAILY` ergaenzt:
  - Execution-output gate.
  - V2-Codex-Befehl muss exakt `keiner` oder ein voll kopierbarer `/goal ...` sein.
  - bedingte Pseudo-Befehle sind verboten.
- `NIGHT_APP_STUDIO_BRIEFING_DAILY` ergaenzt:
  - Befehlskarte quality gate fuer Telegram.
  - unvollstaendige V2-Befehle werden nicht als Befehl wiederholt.
- Heutigen Nayyal-Report lesbar gemacht und um `## Codex-Ready Slice` ergaenzt:
  `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-08.md`
- Heutigen Night-App-Report korrigiert:
  `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-08.md`
- Konkretes Nayyal-Begleitartefakt angelegt:
  `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-08.md`
- Job-Uebersicht aktualisiert:
  `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`

## Schutz
- Keine Nayyal-Code-Dateien geaendert.
- Kein Deploy.
- Keine Logins.
- Keine privaten Daten.
- Keine Handoffs erzeugt.
- Keine Jobs deaktiviert.
- Keine Zeiten oder Job-IDs geaendert.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Die neue Nayyal Public / Research / Private Map einmal lesen und entscheiden, ob Nayyal nach aussen eher Studio-Hub oder private Research-Zentrale sein soll.
- CHRIS_ENTSCHEIDET: Studio-Hub vs private Research-Zentrale mit oeffentlichen Fenstern.
- BEOBACHTEN: Ob die naechsten Nayyal- und Night-App-Reports konkrete Befehlskarten ohne kaputte Zeichen liefern.
- SPAETER: Nach Chris-Entscheidung einen sicheren lokalen Codex-Slice fuer Nayyal-Route-Map oder Connector-Registry anlegen.
- BLOCKIERT: kein Codex-Handoff fuer Nayyal, solange die Positionierung nicht entschieden ist.
- NICHT_TUN: kein Deploy, keine privaten Daten, keine Trading-Sprache, keine bedingten Pseudo-Goals.
- Naechste kleinste Aktion: `nayyal-public-research-private-map-2026-06-08.md` pruefen.
- Beleg / Datei: `/Users/zondrius/.hermes/scripts/hermes_execution_quality_check.py`
