# Hermes CEO Execution Quality Fix - 2026-06-14

## Kurzfazit

Green. Die CEO-Regeln wurden geschaerft, damit Hermes weniger Optionen offenlaesst und mehr direkt nutzbare Ergebnisse liefert.

## Anlass

Die Auswertung alter Reports vom 2026-06-12 zeigte:

- Morning CEO war sinnvoll, bot aber mehrere Proof-Kandidaten gleichzeitig an.
- Business Firework stoppte korrekt, nannte aber keine harte Freischaltbedingung.
- Institutional Sell Pressure nutzte `Green` fuer eine saubere Pipeline; das konnte als Investment-Signal missverstanden werden.
- Alte Tagesreports koennen bei spaeterer Auswertung versehentlich wie heutige Anweisungen wirken.

## Geaendert

### Morning CEO

- Muss bei Proof-Bedarf genau einen Proof-Kandidaten waehlen.
- Darf Schule-Test, Night-App-Test und Life-Card nicht als drei gleichwertige Optionen anbieten.
- Muss eine copy-ready proof line liefern.
- Muss bei Tagesreports `Gueltig fuer: YYYY-MM-DD` sichtbar machen.

### Business Firework

- Wenn `STOP`, dann mit `Freischaltbedingung`.
- Wenn Proof fehlt, muss der Job die gleiche copy-ready proof line oder die exakte Proof-Bedingung nennen.
- STOP soll Klarheit erzeugen: warum gestoppt, was entsperrt, was nicht tun.

### Institutional Sell Pressure

- Trennt `Pipeline Signal` und `Investment Signal`.
- Pipeline Green ist kein Investment-Signal.
- Form-4-Cluster sind Review-Trigger, kein Verkaufsbeweis.
- Manuelle Form-4-Pruefung nur bei `WARNING`/`CRITICAL_REVIEW` oder bei aktivem Watch-Kandidaten mit zusaetzlichem unabhaengigem Risiko-/Evidenztrigger.

### Control Daily

- Muss alte Tagesreports als `old report date` erkennen.
- Alte Reports duerfen nicht automatisch als heutige Anweisung gelten.
- Ambiguous Green bei Investmentreports soll kritisch eingeordnet werden.

## Dateien

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/.hermes/scripts/hermes_ceo_execution_quality_check.py`
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Naechste Morning-CEO-, Business-Firework- und Institutional-Sell-Pressure-Laeufe auf neue Formulierungen pruefen.
- SPAETER: Wenn Green bei Investment weiterhin missverstaendlich wirkt, alle Finance-Jobs auf zweigeteilte Signalstruktur umstellen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine alten Tagesreports als aktuelle Handlungsanweisung ausgeben.
- Naechste kleinste Aktion: Naechsten Lauf gegen `hermes_ceo_execution_quality_check.py` verifizieren.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-ceo-execution-quality-fix-2026-06-14.md`
