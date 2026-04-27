# Buyer Persona: Stock Exchange or Central Securities Depository (CSD)

**Archetype:** SGX (Singapore Exchange), ADX (Abu Dhabi Securities Exchange), Euronext, SIX Digital Exchange, ASX, HKEX, or national CSDs like Euroclear, Clearstream, or Monte Titoli.

## Profile

A market infrastructure operator, the plumbing of the financial system. Operates under direct regulatory oversight with specific market infrastructure regulations (CSDR in EU, SFA in Singapore). Currently runs traditional securities infrastructure and is exploring or mandated to build digital asset market infrastructure alongside. Must maintain backward compatibility with existing market participants while introducing new digital capabilities. Zero tolerance for downtime, market outages make national news.

## Priorities

1. **Settlement finality and integrity**: the solution must provide deterministic, legally final settlement. "Probabilistic finality" is unacceptable for regulated securities settlement.
2. **Throughput and latency**: must handle peak market volumes. Think 100,000+ transactions per hour with sub-second processing for individual transactions.
3. **Regulatory reporting**: real-time or near-real-time reporting to market regulators. EMIR, MiFIR transaction reporting, CSDR settlement discipline compliance.
4. **Interoperability with existing market infrastructure**: SWIFT, T2S, CSD links, existing clearing houses, broker-dealer connectivity. The digital platform cannot be an island.
5. **Market participant onboarding**: must support the full ecosystem: issuers, broker-dealers, custodians, institutional investors, and potentially retail investors through intermediaries.

## Evaluation Culture

Highly technical evaluation teams with deep capital markets expertise. Chief Technology Officer and Head of Market Operations are key decision-makers alongside the business development team. Require detailed technical architecture documentation, not just marketing slides. Proof of concept with realistic market simulation is standard. Evaluation includes stress testing and performance benchmarking. Regulatory approval of the chosen solution may be required before go-live.

## Red Lines

- No solutions without demonstrated settlement finality (legal and technical)
- No platforms that can't meet market-grade throughput requirements
- No vendors without experience in regulated market infrastructure
- No architectures that create single points of failure in the settlement chain
- No solutions without comprehensive audit trail meeting regulatory standards

## Common RFP Patterns

35–50 page RFPs with extensive technical annexes. Separate performance requirements document with specific benchmarks. Include market simulation scenarios for POC phase. Require vendor to demonstrate interoperability with at least two existing market infrastructure systems. Technical architecture review by independent assessor may be included. Two-year implementation timelines are common.
