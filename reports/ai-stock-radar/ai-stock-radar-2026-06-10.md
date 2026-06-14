# AI Stock Radar - 2026-06-10

## Kurzfazit
- Signal: Yellow; Live-Discovery lief, aber `free_price_data_unavailable` bleibt Hauptblocker.
- Keine materielle neue Evidenz vs. 2026-06-09; keine Deep-Dive-Freigabe.
- Research-only: keine Anlageempfehlung und keine Echtgeld-/Broker-Aktion.
## Progress changed?
- New evidence: nein.
- Candidate movement: keine; GMEX, NBIS, DUKR unchanged Early Watch.
- Blocker movement: `free_price_data_unavailable` unchanged.
- Report mode: COMPRESSED_NO_PROGRESS
## Marktumfeld
- SEC/Nasdaq liefern Basisevidenz; belastbare freie Price/Volume-Bestaetigung fehlt.
## Top Kandidaten Heute
- NBIS: B / Early Watch; Luecke: foreign issuer, limited US-GAAP facts, Price-Confirmation.
- GMEX: B / Early Watch; Luecke: manuelle Quellenpruefung, Price-Confirmation.
- DUKR: C / Early Watch; Luecke: cash-runway/dilution review, Price-Confirmation.
## Potential Candidate Board
- Sichtbarkeitsboard fuer bis zu 15 Kandidaten aus dem aktuellen Lauf; Research-only, keine Anlageempfehlung.
- GMEX: Risk Review; Grade B; Early Watch; Score 65; action WAIT_FOR_CONFIRMATION; risk/gap free-source evidence still needs manual review; data not enough candles, source_missing_1
- NBIS: Risk Review; Grade B; Early Watch; Score 69; action DOWNGRADE_REVIEW; risk/gap foreign_issuer, limited_us_gaap_facts, foreign issuer; data not enough candles, source_missing_1
- DUKR: Risk Review; Grade C; Early Watch; Score 63; action CHECK_DILUTION; risk/gap cash_runway_watch, cash runway watch; data not enough candles, source_missing_1
- AISP: Archive/Avoid Review; Grade X; Avoid; Score 52; action DOWNGRADE_REVIEW; risk/gap name_only_ai_watch, name only ai watch, name-only AI evidence; needs manual substance check; data not enough candles, source_missing_1
- AMCI: Archive/Avoid Review; Grade X; Avoid; Score 47; action ARCHIVE_REVIEW; risk/gap delisting_watch, delisting watch; data not enough candles, source_missing_1
## Neu Gegenueber Gestern
- New candidate: keine.
- Upgraded: keine.
- Downgraded: keine.
- Same blocker: `free_price_data_unavailable`; repeated candidates unchanged.
- Removed / archived: keine.
- CEO interpretation: Yellow; beobachten statt handeln.
## Neue Auffaelligkeiten
- Keine neue source-backed Auffaelligkeit fuer Hochstufung.
## Idea Grade
- Kein S/A; Price/Volume und Firewall-/Datenluecken blockieren Conviction.
## Price/Volume Confirmation
- Nicht verlaesslich aktiv; nur Kontext, kein Aktionssignal.
## Evidence Firewall
- Caution/Review dominiert; reject bleibt X/Avoid bzw. Archive Review.
## CEO Control
- Keine focus-Lane; plausible Kandidaten monitor/manual_review.
## Source Confidence Ledger
- Fakten: SEC/Nasdaq/live discovery. Interpretation: AI-Thesis pruefpflichtig. Fehlend: robuste Preis-/Volumendaten, teils Fundamentals/Ownership/AI-Revenue-Proof.
## Entry Readiness
- Simulation-only; keine reale Aktion. Ueberwiegend WAIT_FOR_CONFIRMATION/TOO_RISKY/FAKE_AI_HYPE.
## Advanced Signal Stack
- Kein Advanced-Signal ueberschreibt Risk Gates; missing basket/ownership ist unavailable, nicht bullish.
## Thesis Intelligence
- AI-Revenue-Proof fehlt teils; Luecke bleibt Luecke.
## Alpha Memory
- Wiederholte Muster: name-only AI, dilution/offering/cash-runway, delisting/reverse-split, fehlende Price-Confirmation.
## Watchlist Aenderungen
- Engine-State aktualisiert; keine manuelle Promotion ergaenzt.
## Deep-Dive Kandidaten
- Keine.
## Overheated / Avoid
- Avoid-/Archive-Review Items bleiben sichtbar; keine neue Overheated-Promotion.
## Datenqualitaet Und Luecken
- `free_price_data_unavailable` unchanged; FINRA/Preis-/Volumen-Kontext kann fehlen; fehlende Daten wurden nicht positiv interpretiert.
## Naechste Aktion
- Keine automatische Aktion; optional nur manuelle Primaerquellenpruefung eines Kandidaten.
## Befehlskarte
- Chris 5-Minuten-Befehl: Report oeffnen, NBIS/GMEX/DUKR auf neue Primaerquellen pruefen; wenn nein, parken.
- Hermes-Pruefbefehl: `grep -n "Report mode:\|Neu Gegenueber Gestern\|Decision Inbox" /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-10.md`
- Stop-/Park-Befehl: Bei unveraendertem `free_price_data_unavailable` keine Deep-Dive-/Alert-Arbeit starten.
- Nicht-ausfuehren: keine automatischen Trades, Broker/API-Key-Setups, Optionen, Leverage, Margin oder Hype-Chasing.
## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob spaeter ein kostenloser, terms-konformer Preisdatensatz ergaenzt werden soll; keine bezahlten Provider/API-Keys ohne Freigabe.
- BEOBACHTEN: NBIS, GMEX, DUKR unchanged als Research-Watch; X/Avoid-Items nur Risiko-/Archivsichtbarkeit.
- SPAETER: Backtesting/UI erst nach stabilerem Free-Source-Preis-/Volumen-Kontext.
- BLOCKIERT: Verlaessliches Kurs-Momentum ohne geprueften stabilen Datenprovider.
- NICHT_TUN: Keine automatischen Trades; keine Hype-Hochstufung aus Namen, Einzelquelle oder fehlendem Preis-/Volumen-Kontext.
- Naechste kleinste Aktion: keine; optional nur manuelle Primaerquellenpruefung.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-10.md
Companion reports:
- /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-ceo-audit-2026-06-10.md
- /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-shadow-backtest-2026-06-10.md
- /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-paper-portfolio-2026-06-10.md
- /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-advanced-signals-2026-06-10.md
- /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-thesis-intelligence-2026-06-10.md
- /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-alpha-memory-2026-06-10.md
