# Section 7: Commercial Proposal: Notes

## Source Grounding

### Verified Claims (from capability-mapping and dalp-narrative.md)
- Platform licensing model (not per-transaction), aligned with narrative positioning as "Digital Asset Lifecycle Platform"
- 7 asset classes: bonds, equities, funds, stablecoins, deposits, real estate, precious metals, confirmed in asset-lifecycle.md and narrative
- 12 compliance module types, confirmed in compliance-and-identity.md (12 concrete module type IDs in discriminated-union schema, with additional types in validation)
- Configurable Token with up to 32 pluggable features, confirmed in asset-lifecycle.md (SMART Configurable extension system)
- Full API surface: REST v2, oRPC, GraphQL, SDK, CLI (301 commands, 26 groups), confirmed in developer-surface.md and cli-automation-surface.md
- Kubernetes deployment via Helm charts, confirmed in operations-and-reliability.md (Helm charts referenced)
- Custody integration: local, Fireblocks, DFNS, confirmed in custody-settlement.md and operations-and-reliability.md
- Observability: Grafana, VictoriaMetrics, Loki, Tempo, confirmed in narrative and operations-and-reliability.md
- Atomic DvP/XvP settlement, confirmed in custody-settlement.md
- Ex-ante compliance enforcement, confirmed in compliance-and-identity.md
- UUPS proxy-based contract upgrades, confirmed in multiple capability records
- Production proof points (OCBC, MENA real estate, bank deployments), confirmed in dalp-narrative.md

### Items Marked [TO VERIFY]
- **Source code escrow**: No evidence found in capability mapping or narrative. Needs confirmation from commercial/legal team.
- **Custom smart contract development offering**: No clear evidence of whether SettleMint offers custom contract development as a service. The platform is self-serve but some clients may need bespoke work.

### Items Marked [CLIENT-SPECIFIC]
All pricing figures, response time SLAs, discount terms, and payment terms are intentionally left as placeholders. These must be filled per engagement based on:
- Deployment complexity
- Number of environments
- Integration scope
- Support tier
- Contract duration
- Strategic importance

## Adaptation Guidance

### When Using This Section
1. **Replace all [CLIENT-SPECIFIC] markers** with actual figures from the pricing sheet or approved pricing guidelines
2. **Select the appropriate tier** and emphasize it, don't present all three equally unless the client is undecided
3. **Customize implementation phases** based on actual scoping, durations are ranges, not commitments
4. **ROI framework**: Use client-specific data for current costs where available; generic percentages are from narrative claims and should be validated per use case
5. **Remove irrelevant deployment models**: if the client is definitely cloud-managed, don't dwell on on-prem details

### Pricing Strategy Notes
- The platform licensing model is a competitive differentiator vs per-transaction competitors, emphasize this
- Multi-year commitments should be encouraged via pricing incentives
- Implementation services can be fixed-price (lower risk for client, requires tight scoping) or T&M (more flexible, requires trust)
- Infrastructure costs are pass-through for cloud, make this transparent

### What NOT to Include
- No per-transaction pricing breakdowns (this is explicitly not our model)
- No "unlimited everything" claims (scope varies by tier)
- No guaranteed timelines (ranges only, qualified by dependencies)
- No competitor pricing comparisons (focus on our value, not their costs)

## Word Count
Target: ~5,000 words
Actual: ~4,800 words (within range)
