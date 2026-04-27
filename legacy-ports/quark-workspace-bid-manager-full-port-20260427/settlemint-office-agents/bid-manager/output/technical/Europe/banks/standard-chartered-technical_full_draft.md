# Technical Proposal: Digital Asset Custody Platform

| Field | Value |
|---|---|
| Proposal title | Technical Proposal. Digital Asset Custody Platform |
| Client | Standard Chartered |
| Submitted by | SettleMint NV |
| Date | March 2026 |
| Version | v1.0 |
| Confidentiality | Confidential |
| RFP Reference | STANDARD-CHARTERED-RFP-DIGITAL-ASSET-CUSTODY-202603 |

---

## Executive Summary

Standard Chartered is establishing a digital asset custody platform to serve institutional clients across Asia, Africa, and the Middle East. The platform will provide secure storage and servicing of tokenized assets with integration to existing custody infrastructure.

SettleMint's DALP provides the custody infrastructure layer with enterprise key management, multi-asset support, and regulatory compliance.

**Key Points:**

- Enterprise key management (HSM, MPC)
- Multi-asset support
- Regulatory compliance (FCA, MAS, HKMA)
- Integration with existing custody infrastructure

---

## Architecture

### Custody Stack

| Layer | Function |
|-------|----------|
| Key Guardian | Key management |
| Transaction Signer | Transaction execution |
| Compliance Engine | Regulatory enforcement |
| Asset Vault | Asset storage |

---

## Security

### Key Management

- HSM integration (FIPS 140-2 Level 3)
- MPC custody (DFNS, Fireblocks)
- Multi-signature support

### Defense Layers

1. Authentication
2. Authorization
3. Wallet verification
4. On-chain compliance
5. Custody policy

---

## Compliance

### Regulatory Coverage

- FCA (UK)
- MAS (Singapore)
- HKMA (Hong Kong)
- AMF (France)

---

## Implementation

19-week deployment with dedicated cloud model.

---

*End of Technical Proposal*
