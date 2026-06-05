# Institutional Sell Pressure Radar - 2026-05-31

## Kurzfazit
- Research-only radar for public institutional sell-pressure signals.
- Candidates reviewed: 20
- WARNING or CRITICAL_REVIEW: 0
- 13F data is delayed quarterly and cannot prove live selling by itself.

## Existing Stock Job Alignment
- Existing daily stock job: AI_STOCK_RADAR_DAILY (35 9 * * 1-5)
- Existing weekly stock job: AI_STOCK_DEEPDIVE_WEEKLY (30 16 * * 0)
- Recommended sell-pressure schedule: 50 9 * * 1-5

## New Warnings
- Keine WARNING oder CRITICAL_REVIEW Signale.

## Top Sell Pressure
- MDAI: INFO / SELL_PRESSURE_MONITOR; score 20; latency short_delay; reasons: Form 4 ownership filing requires transaction-code review; issuer risk context present: delisting_watch, dilution_trend_watch
- AIFC: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, offering_watch, cash_runway_watch
- AMCI: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch
- ARAI: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, dilution_trend_watch
- ARBE: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: cash_runway_watch, dilution_trend_watch
- BFRG: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, dilution_trend_watch
- DUKR: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: cash_runway_watch
- DVLT: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, cash_runway_watch, dilution_trend_watch
- FABC: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, offering_watch
- GXAI: INFO / SELL_PRESSURE_MONITOR; score 15; latency unavailable; reasons: issuer risk context present: delisting_watch, cash_runway_watch, dilution_trend_watch

## 13F Ownership Changes
- Keine 13F-Reduktionssignale.

## 13D/13G Alerts
- Keine 13D/13G-Alerts.

## Insider / 10 Percent Holder Activity
- MDAI: 4; Spectral AI, Inc.; review required; date 2026-05-27

## Short Pressure Context
- Keine FINRA-Short-Kontextsignale.

## Price/Volume Confirmation
- MDAI: unavailable / unavailable; 20d n/a; volume ratio n/a
- AIFC: unavailable / unavailable; 20d n/a; volume ratio n/a
- AMCI: unavailable / unavailable; 20d n/a; volume ratio n/a
- ARAI: unavailable / unavailable; 20d n/a; volume ratio n/a
- ARBE: unavailable / unavailable; 20d n/a; volume ratio n/a
- BFRG: unavailable / unavailable; 20d n/a; volume ratio n/a
- DUKR: unavailable / unavailable; 20d n/a; volume ratio n/a
- DVLT: unavailable / unavailable; 20d n/a; volume ratio n/a
- FABC: unavailable / unavailable; 20d n/a; volume ratio n/a
- GXAI: unavailable / unavailable; 20d n/a; volume ratio n/a

## False Positive Checks
- 13F-only signals stay capped because they are delayed quarterly.
- Short-volume-only signals remain context, not institutional selling proof.
- Index rebalancing, CUSIP changes, split effects, amendments, and issuer actions require manual review.

## Datenqualitaet Und Luecken
- near_real_time: 0
- short_delay: 1
- quarterly_delayed: 0
- mixed: 0
- unavailable: 19

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob WARNING/CRITICAL_REVIEW Faelle manuell gegen SEC-Filings geprueft werden sollen.
- BEOBACHTEN: 13D/13G-Aenderungen, Form-4-Cluster, 13F-Reduktionen, Short-Kontext und Preis/Volumen-Bestaetigung.
- SPAETER: Vollmarkt-13F-Ingestion mit CUSIP-Mapping nur nach stabiler Watchlist-Version ausbauen.
- BLOCKIERT: Live-Intraday-Verkaeufe von Institutionen sind in kostenlosen oeffentlichen Daten nicht direkt sichtbar.
- NICHT_TUN: Keine automatischen Trades, keine Short-, Derivate- oder Hebel-Workflows, keine 13F-Daten als Live-Verkauf missverstehen.
- Naechste kleinste Aktion: WARNING/CRITICAL_REVIEW Kandidaten mit Original-Filing und Datenlatenz pruefen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/institutional-sell-radar/institutional-sell-radar-2026-05-31.md
