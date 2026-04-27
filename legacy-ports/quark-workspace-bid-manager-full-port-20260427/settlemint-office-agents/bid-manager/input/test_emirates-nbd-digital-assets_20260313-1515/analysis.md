# RFP Analysis: Emirates NBD Digital Asset Platform

## Document Metadata
- **Document Type:** Technical RFP
- **Client:** Emirates NBD
- **RFP Reference:** ENBD-DATP-2026-0042
- **Issue Date:** 13 March 2026
- **Submission Deadline:** 15 April 2026

## Scope
- Bond tokenization (conventional fixed-income)
- Sukuk tokenization (Islamic finance instruments)
- Equity tokenization (common and preferred shares)
- Structured products (multi-tranche)
- Full lifecycle: issuance → distribution → corporate actions → redemption

## Key Requirements

### Technical Requirements
| Req ID | Requirement | DALP Relevance |
|--------|-------------|----------------|
| TR-01 | ERC-3643 compliance standard | Core capability. DALP supports ERC-3643 natively |
| TR-02 | REST API integration (OAuth 2.0) | Core capability. API-first architecture |
| TR-03 | Multi-tenant architecture | Core capability, built-in multi-tenancy |
| TR-04 | Role-based access control (RBAC) | Core capability, granular RBAC with custom roles |
| TR-05 | Custody integration (Fireblocks preferred) | Integration capability. Fireblocks supported |

### Compliance Requirements
| Req ID | Requirement | DALP Relevance |
|--------|-------------|----------------|
| CR-01 | MiFID II compliance | Compliance engine, configurable regulatory rules |
| CR-02 | UAE VARA regulatory compliance | Compliance engine, jurisdiction-aware rules |
| CR-03 | KYC/AML integration | Integration capability. KYC/AML provider connectors |
| CR-04 | Transfer restrictions (investor type, jurisdiction) | Core capability, on-chain transfer rules |

### Implementation Requirements
| Req ID | Requirement | DALP Relevance |
|--------|-------------|----------------|
| IR-01 | 6-month implementation timeline | Achievable, standard DALP deployment is 4-6 months |
| IR-02 | Training for 50 staff | Standard offering, role-based training tracks |
| IR-03 | 99.95% uptime SLA | Standard SLA, meets or exceeds with HA deployment |

## Recommended Response Structure
- **Skeleton:** `technical-proposal`
- **Reusable Blocks:**
  - `about-settlemint`: Company overview (Section 4)
  - `about-dalp`: Platform overview (Section 5)
  - `deployment-options`: Deployment models (Section 10)
  - `implementation-plan`: Phased delivery plan (Section 9)
  - `support-sla`: Support tiers and SLA framework (Section 11)
  - `training`: Training tracks and knowledge transfer (Section 12)

## Risk Assessment
- **Timeline Risk:** LOW, 6 months is within standard DALP deployment window
- **Technical Risk:** LOW, all technical requirements map to existing capabilities
- **Compliance Risk:** MEDIUM. VARA compliance specifics may need validation
- **Integration Risk:** MEDIUM, depth of core banking integration TBD

## Notes
- Client explicitly prefers Fireblocks for custody, highlight this integration
- Islamic finance (sukuk) requires specific corporate action handling (profit distribution vs. coupon)
- UAE business hours are Sunday–Thursday, factor into support model
- Multi-tranche structured products may need detailed solution design
