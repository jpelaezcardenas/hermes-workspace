# Competitive Pre-Analysis Protocol

## Purpose
Before writing any proposal response, analyze the RFP context to identify likely competitors and pull counter-positioning from the competitor dossiers.

## Trigger
Runs during the Bid Manager's analysis phase (after ingesting the RFP, before writing the response).

## Steps

### Step 1: Identify Likely Competitors
From the RFP context, infer likely competing vendors based on:
- **Geography:** UAE/Gulf → Taurus, Fireblocks, Securitize | Europe → Tokeny, Taurus, Securitize | Asia → Hashstacs, Libeara
- **Asset class:** Securities/bonds → Securitize, Tokeny | Real estate → DigiShares | Funds → FundsDLT | Multi-asset → Taurus
- **Buyer type:** Banks → Fireblocks, Taurus, Securitize | Central banks → ConsenSys, R3 | Exchanges → STACS, Hashstacs
- **RFP signals:** Specific vendor names mentioned, technology preferences (Hyperledger = R3/ConsenSys, EVM = broader field)

### Step 2: Pull Counter-Positioning
For each identified competitor, read their dossier from:
`/Users/quark/Public/quark/workspace/product/dalp/competitors/`

Extract:
- Their key weaknesses vs DALP
- Their strengths we must acknowledge or counter
- Their typical pricing model (if known)
- Their reference clients in this geography/sector

### Step 3: Embed in Response
Do NOT name competitors in the proposal. Instead:
- Strengthen sections where competitors are known to be strong
- Add specific evidence/differentiators where competitors are known to be weak
- Frame DALP advantages in terms the evaluator will use to compare vendors

### Step 4: Log Analysis
Save the competitive pre-analysis to the output folder as `competitive-context.md` (internal only, never delivered to client).

## Competitor Quick-Reference by Region

| Region | Primary Competitors | DALP Advantages |
|--------|-------------------|-----------------|
| UAE/Gulf | Taurus, Fireblocks, Securitize | Regulatory readiness (VARA/ADGM), 5 Gulf reference clients |
| Europe | Tokeny, Taurus, Securitize | Ex-ante compliance (T-REX), MiCA alignment, configurable modules |
| Southeast Asia | Hashstacs, Libeara, STACS | Production track record (OCBC, Maybank, SBI), multi-asset |
| India | Limited direct competitors | RBI reference, local regulatory understanding |
| Japan | Limited direct competitors | Sony Bank and Mizuho references |

## Standing Instructions
- Update this quick-reference when new competitor dossiers are added
- Always run pre-analysis before writing; never skip it
- Internal analysis only; never share competitive context with the client
