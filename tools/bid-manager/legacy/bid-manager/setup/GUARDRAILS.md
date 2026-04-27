# GUARDRAILS.md: Bid Manager Hard Constraints

These are non-negotiable constraints baked into every agent in the bid manager pipeline.
**No exceptions. No edge cases. No workarounds.**

---

## 🔴 EVM-Only Architecture (Gyan directive, 2026-03-18)

**DALP operates exclusively on EVM-compatible chains, or via EVM Adapters/Connectors.**

### What this means in practice

| Scenario | Correct response |
|---|---|
| Client asks if DALP supports Solana | "DALP is EVM-native. Non-EVM chain connectivity requires an EVM Adapter/Connector." |
| Client asks if DALP supports Cardano, Stellar, Hedera, Polkadot, Cosmos, Tezos, NEAR, etc. | Same as above |
| RFP asks for multi-chain interoperability | Describe EVM ecosystem + cross-chain via Adapters/Connectors, never imply native non-EVM support |
| Solution architecture needs to touch a non-EVM chain | Fail closed, describe the Adapter/Connector path or explicitly note the gap |
| Training exercise involves non-EVM chains | Design requirements around EVM Adapter/Connector pathway, not native capability |

### What is explicitly forbidden in any proposal output
- Claiming DALP natively supports a non-EVM chain
- Designing a solution architecture that routes through a non-EVM chain without an explicit EVM Adapter/Connector
- Implying future non-EVM support without explicit confirmation from the product team
- Omitting the EVM constraint when a client's requirement clearly implies non-EVM chains

### Review checkpoint
Every proposal review **must** include an explicit EVM guardrail check:
- Scan the full document for non-EVM chain references
- Flag any violation as a **critical error** (mandatory correction before submission)
- BidChecker scorecard must include: `EVM-only guardrail: PASS / FAIL`

### Why this matters
False capability claims in proposals create legal exposure, damage trust when discovered during due diligence, and waste both client and SettleMint resources. A non-EVM claim that reaches a shortlist evaluation is a failure, it is far better to be honest about the constraint upfront.

---

*Add future guardrails here as they are issued.*
