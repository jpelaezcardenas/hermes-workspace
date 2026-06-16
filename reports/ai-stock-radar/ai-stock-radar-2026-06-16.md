# AI Stock Radar - 2026-06-16

## Kurzfazit
- Signal: Yellow. Live-Discovery lief; SEC/Nasdaq verfügbar, FINRA nicht geprüft.
- Gegenüber gestern kein materieller Fortschritt: GMEX, NBIS und DUKR bleiben unverändert im Research-Watch.
- Hauptbremse bleibt `free_price_data_unavailable` / zu wenig Price-Volume-Bestätigung; keine Hochstufung, kein Deep Dive.
- Research-only: keine Anlageempfehlung, kein Broker-/Trade-/Options-/Leverage-Workflow.

## Progress changed?
- New evidence: nein; kein neuer harter SEC-/News-/Preis-Volume-Beleg mit Thesis-Wirkung.
- Candidate movement: keine materielle Bewegung; GMEX B/Early Watch, NBIS B/Early Watch, DUKR C/Early Watch unchanged.
- Blocker movement: `free_price_data_unavailable` unchanged; Price/Volume bleibt nicht belastbar.
- Report mode: COMPRESSED_NO_PROGRESS

## Marktumfeld
- SEC submissions/companyfacts/company tickers: live/available ohne API-Key.
- Nasdaq symbol directory: live_available.
- Market data: `free_price_data_unavailable`; Stooq optional lieferte keine ausreichende Bestätigung.
- Paid market data/API keys: not_configured; nur mit Chris-Entscheidung.

## Top Kandidaten Heute
- GMEX: B / Early Watch; CEO monitor; Score 65; Hauptlücke Price/Volume + manuelle Quellenprüfung.
- NBIS: B / Early Watch; CEO manual_review; Score 69; Hauptlücke foreign issuer/limited US-GAAP facts + Price/Volume.
- DUKR: C / Early Watch; CEO manual_review; Score 63; Hauptlücke cash-runway/dilution review + Price/Volume.

## Potential Candidate Board
- GMEX: Risk Review; B; Early Watch; WAIT_FOR_CONFIRMATION; gap Price/Volume/manuelle Belegprüfung.
- NBIS: Risk Review; B; Early Watch; DOWNGRADE_REVIEW; gap foreign_issuer/limited_us_gaap_facts/Price.
- DUKR: Risk Review; C; Early Watch; CHECK_DILUTION; gap cash_runway_watch/Price.
- AISP/AMCI/RXRX/GMM/KDK/GFAI/RR und weitere X-Items: Archive/Avoid Review; Risiken name-only AI, delisting, offering/dilution, cash-runway oder fehlende AI-Revenue-Belege.

## Neu Gegenueber Gestern
- New candidate: keine.
- Upgraded: keine.
- Downgraded: keine.
- Same blocker: `free_price_data_unavailable`; GMEX, NBIS, DUKR unchanged.
- Removed / archived: keine manuelle Aenderung; Engine erstellte/aktualisierte 3 Dossiers innerhalb des Limits.
- CEO interpretation: Weiter beobachten, aber keine Research-Hochstufung ohne neue Belege und stabile Price/Volume-Bestaetigung.

## Neue Auffaelligkeiten
- Keine materiell neue Auffaelligkeit gegenüber dem vorherigen Markttagsreport; Live-Lauf bestaetigt im Wesentlichen dieselbe Watch-/Risk-Struktur.

## Idea Grade
- Verteilung: S=0, A=0, B=2, C=1, X=27.
- B: GMEX, NBIS. C: DUKR. X: übrige Risiko-/Avoid-Kandidaten.

## Price/Volume Confirmation
- Für Top-Kandidaten unavailable/not enough candles; Kurs-Momentum bleibt gedeckelt und darf keine These hochstufen.

## Evidence Firewall
- GMEX: pass / WAIT_FOR_CONFIRMATION.
- NBIS: caution / DOWNGRADE_REVIEW wegen foreign_issuer/limited_us_gaap_facts.
- DUKR: caution / CHECK_DILUTION wegen cash_runway_watch.
- Reject-/Caution-Cluster bleiben bei name-only AI, delisting, offering/dilution und schwacher Runway sichtbar.

## CEO Control
- GMEX: monitor / CEO_MONITOR.
- NBIS, DUKR: manual_review / CEO_REVIEW_RISK.
- X/Avoid-Items: reject / CEO_ARCHIVE_REVIEW.

## Source Confidence Ledger
- Faktenbasis: SEC/Nasdaq/companyfacts überwiegend vorhanden; Interpretation bleibt durch fehlende Price/Volume- und AI-Revenue-Belege begrenzt.
- Fehlende Daten: Price/Volume confirmation; teils SEC fundamentals/US-GAAP-Kontext; teils expliziter AI-Revenue-Split.

## Entry Readiness
- GMEX: WAIT_FOR_CONFIRMATION. NBIS/DUKR und Risk-Items: TOO_RISKY oder FAKE_AI_HYPE; keine Paper-Entry-Promotion.

## Advanced Signal Stack
- GMEX: WAIT. NBIS/DUKR und viele X-Items: RISK_TRAP oder Advanced Archive/Risk Review; fehlende relative strength/liquidity/ownership context bleibt `unavailable`.

## Thesis Intelligence
- GMEX: WATCH_THESIS mit AI-Revenue-Gap. NBIS/DUKR und X-Items: BROKEN_THESIS/THESIS_ARCHIVE_REVIEW durch kritische Negative-Catalyst- oder Revenue-Reality-Risiken.

## Alpha Memory
- GMEX: CONTRADICTION_REVIEW wegen AI story without revenue proof. NBIS/DUKR und X-Items: RISK_PATTERN/ALPHA_RISK_ARCHIVE bei kritischen Widerspruechen oder stale/thin catalyst timing.

## Watchlist Aenderungen
- Watchlist wurde durch den Free-Source-Lauf aktualisiert; keine manuelle Hochstufung. Dossiers: maximal 3 durch Engine.

## Deep-Dive Kandidaten
- Keine. Deep Dive bleibt blockiert, weil keine neue harte These plus stabile Price/Volume-Bestaetigung vorliegt.

## Overheated / Avoid
- Verkuerzt wegen COMPRESSED_NO_PROGRESS: 27 X/Avoid-Kandidaten, u.a. AISP, AMCI, RXRX, GMM, KDK, GFAI, RR; Details im Engine-Run/Watchlist.

## Datenqualitaet Und Luecken
- `free_price_data_unavailable` unchanged.
- FINRA nicht geprüft; optionale Stooq-Kontexte liefern nicht genug Candles.
- SEC/Nasdaq belegen Existenz/Filing/AI-Kontext, aber keine Kurs- oder Umsatzthese.
- Missing AI revenue proof bleibt Gap, nicht bullisher Beleg.

## Naechste Aktion
- Keine automatische Aktion. Optional nur menschliche Primaerquellenpruefung eines Kandidaten, falls Chris bewusst tiefer prüfen will.

## Befehlskarte
- Chris 5-Minuten-Befehl: Öffne den Report und prüfe nur, ob GMEX/NBIS/DUKR wirklich neue Primärquellen haben; wenn nein, schließen.
- Hermes-Pruefbefehl: `AI_STOCK_RADAR_DATE=2026-06-16 node /Users/zondrius/hermes-workspace/scripts/ai-stock-radar-free-signal-engine.mjs` im Workspace erneut ausführen und Report-Diff lesen.
- Stop-/Park-Befehl: Wenn `free_price_data_unavailable` weiter Hauptblocker bleibt, keine Deep-Dive-Arbeit starten.
- Nicht-ausfuehren: keine Trades, keine Broker-/API-Key-/Paid-Provider-Einrichtung, keine Optionen/Leverage/Margin, keine hypegetriebene Hochstufung.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob spaeter ein kostenloser, terms-konformer Preisdatensatz ergaenzt werden soll; keine bezahlten Provider/API-Keys ohne Freigabe.
- BEOBACHTEN: GMEX, NBIS, DUKR unchanged als Research-Watch; X/Avoid-Items nur als Risiko-/Archivsichtbarkeit.
- SPAETER: Backtesting/UI erst nach stabilerem Free-Source-Preis-/Volumen-Kontext.
- BLOCKIERT: Verlaessliches Kurs-Momentum ohne geprueften stabilen Datenprovider.
- NICHT_TUN: Keine automatischen Trades; keine Hype-Hochstufung aus Namen, Einzelquelle oder fehlendem Preis-/Volumen-Kontext.
- Naechste kleinste Aktion: keine; optional nur manuelle Primaerquellenpruefung.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-16.md
