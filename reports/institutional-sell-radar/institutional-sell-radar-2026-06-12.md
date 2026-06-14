# Institutional Sell Pressure Radar - 2026-06-12

## Kurzfazit
- Research-only radar for public institutional sell-pressure signals.
- Candidates reviewed: 30
- WARNING or CRITICAL_REVIEW: 0
- 13F data is delayed quarterly and cannot prove live selling by itself.

## Existing Stock Job Alignment
- Existing daily stock job: AI_STOCK_RADAR_DAILY (35 9 * * 1-5)
- Existing weekly stock job: AI_STOCK_DEEPDIVE_WEEKLY (30 16 * * 0)
- Recommended sell-pressure schedule: 50 9 * * 1-5

## New Warnings
- Keine WARNING oder CRITICAL_REVIEW Signale.

## Top Sell Pressure
- ARBE: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: cash_runway_watch, dilution_trend_watch
- DVLT: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: delisting_watch, cash_runway_watch, dilution_trend_watch
- MDAI: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: delisting_watch, dilution_trend_watch
- PDYN: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: delisting_watch, offering_watch, cash_runway_watch
- PLTR: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: delisting_watch, offering_watch
- RXRX: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: offering_watch, dilution_trend_watch
- AIFC: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, offering_watch, cash_runway_watch
- AMCI: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch
- ARAI: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, dilution_trend_watch
- BFRG: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, dilution_trend_watch

## 13F Ownership Changes
- Keine 13F-Reduktionssignale.

## 13D/13G Alerts
- Keine 13D/13G-Alerts.

## Insider / 10 Percent Holder Activity
- ARBE: 4; Arbe Robotics Ltd.; review required; date 2026-06-05
- DVLT: 4; Datavault AI Inc.; review required; date 2026-06-02
- MDAI: 4; Spectral AI, Inc.; review required; date 2026-05-27
- MDAI: 4; Spectral AI, Inc.; review required; date 2026-06-01
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-01
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-01
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-01
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PDYN: 4; Palladyne AI Corp.; review required; date 2026-06-08
- PLTR: 4; Palantir Technologies Inc.; review required; date 2026-06-02
- PLTR: 4; Palantir Technologies Inc.; review required; date 2026-06-08
- PLTR: 4; Palantir Technologies Inc.; review required; date 2026-06-08
- PLTR: 4; Palantir Technologies Inc.; review required; date 2026-06-08
- PLTR: 4; Palantir Technologies Inc.; review required; date 2026-06-08
- RXRX: 4; RECURSION PHARMACEUTICALS, INC.; review required; date 2026-05-27
- RXRX: 4; RECURSION PHARMACEUTICALS, INC.; review required; date 2026-06-04
- RXRX: 4; RECURSION PHARMACEUTICALS, INC.; review required; date 2026-06-04
- RXRX: 4; RECURSION PHARMACEUTICALS, INC.; review required; date 2026-06-05
- RXRX: 4; RECURSION PHARMACEUTICALS, INC.; review required; date 2026-06-05
- AISP: 4; Airship AI Holdings, Inc.; review required; date 2026-06-04
- GMEX: 4; GMEX Robotics Corp; review required; date 2026-06-01
- GMEX: 4; GMEX Robotics Corp; review required; date 2026-06-09
- NBIS: 4; Nebius Group N.V.; review required; date 2026-06-03
- NBIS: 4; Nebius Group N.V.; review required; date 2026-06-03
- NBIS: 4; Nebius Group N.V.; review required; date 2026-06-05

## Short Pressure Context
- Keine FINRA-Short-Kontextsignale.

## Price/Volume Confirmation
- ARBE: unavailable / unavailable; 20d n/a; volume ratio n/a
- DVLT: unavailable / unavailable; 20d n/a; volume ratio n/a
- MDAI: unavailable / unavailable; 20d n/a; volume ratio n/a
- PDYN: unavailable / unavailable; 20d n/a; volume ratio n/a
- PLTR: unavailable / unavailable; 20d n/a; volume ratio n/a
- RXRX: unavailable / unavailable; 20d n/a; volume ratio n/a
- AIFC: unavailable / unavailable; 20d n/a; volume ratio n/a
- AMCI: unavailable / unavailable; 20d n/a; volume ratio n/a
- ARAI: unavailable / unavailable; 20d n/a; volume ratio n/a
- BFRG: unavailable / unavailable; 20d n/a; volume ratio n/a

## False Positive Checks
- 13F-only signals stay capped because they are delayed quarterly.
- Short-volume-only signals remain context, not institutional selling proof.
- Index rebalancing, CUSIP changes, split effects, amendments, and issuer actions require manual review.

## Datenqualitaet Und Luecken
- near_real_time: 0
- short_delay: 9
- quarterly_delayed: 0
- mixed: 0
- unavailable: 21

## Befehlskarte
- Chris 5-Minuten-Befehl: Report öffnen und nur prüfen, ob die Form-4-Cluster bei PDYN, PLTR und RXRX eine manuelle Original-Filing-Sichtung rechtfertigen.
- Hermes-Pruefbefehl: `INSTITUTIONAL_SELL_RADAR_DATE=2026-06-12 node /Users/zondrius/hermes-workspace/scripts/institutional-sell-radar.mjs && sed -n '1,140p' /Users/zondrius/hermes-workspace/reports/institutional-sell-radar/institutional-sell-radar-2026-06-12.md`
- Stop-/Park-Befehl: Wenn keine WARNING/CRITICAL_REVIEW-Signale entstehen und Preis/Volumen bleibt unavailable, bis zum nächsten Werktagslauf nur beobachten.
- Nicht-ausfuehren: Keine automatischen Trades, kein Shorting, keine Derivate, kein Hebel, keine Margin, keine Broker- oder Paid-Provider-Einrichtung; 13F-Daten nicht als Live-Verkauf behandeln.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob WARNING/CRITICAL_REVIEW Faelle manuell gegen SEC-Filings geprueft werden sollen.
- BEOBACHTEN: 13D/13G-Aenderungen, Form-4-Cluster, 13F-Reduktionen, Short-Kontext und Preis/Volumen-Bestaetigung.
- SPAETER: Vollmarkt-13F-Ingestion mit CUSIP-Mapping nur nach stabiler Watchlist-Version ausbauen.
- BLOCKIERT: Live-Intraday-Verkaeufe von Institutionen sind in kostenlosen oeffentlichen Daten nicht direkt sichtbar.
- NICHT_TUN: Keine automatischen Trades, keine Short-, Derivate- oder Hebel-Workflows, keine 13F-Daten als Live-Verkauf missverstehen.
- Naechste kleinste Aktion: keine; nur bei späteren WARNING/CRITICAL_REVIEW Kandidaten Original-Filing und Datenlatenz prüfen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/institutional-sell-radar/institutional-sell-radar-2026-06-12.md
