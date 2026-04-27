Request for Proposal: Digital Asset Platform for Emirates NBD

# 1. Introduction

Emirates NBD, one of the largest banking groups in the Middle East, is seeking proposals from qualified technology providers for the implementation of a comprehensive Digital Asset Tokenization Platform. This platform will enable Emirates NBD to issue, manage, and service tokenized financial instruments across multiple asset classes, supporting the bank's strategic vision for digital transformation in capital markets.

This Request for Proposal (RFP) outlines the functional, technical, compliance, and operational requirements for the proposed platform. Respondents are expected to provide a detailed technical proposal demonstrating their platform's capabilities, implementation approach, and alignment with Emirates NBD's regulatory and operational environment.

RFP Reference: ENBD-DATP-2026-0042
Issue Date: 13 March 2026
Submission Deadline: 15 April 2026

# 2. Scope of Work

The selected vendor shall provide a platform capable of tokenizing and managing the full lifecycle of the following financial instrument types:

* Fixed-income instruments (bonds), conventional and Islamic (sukuk)
* Equity instruments, common shares and preferred shares
* Structured products, multi-tranche tokenized securities

The platform must support the complete asset lifecycle including issuance, primary distribution, secondary trading support, corporate actions (coupon payments, dividend distributions, maturity processing), and redemption. The solution must integrate with Emirates NBD's existing core banking infrastructure, custody systems, and compliance tools.

# 3. Technical Requirements

The proposed platform must meet the following technical requirements:

## TR-01: ERC-3643 Compliance Standard

The platform must natively support the ERC-3643 (T-REX) token standard for compliant security tokens. This includes identity-based transfer restrictions, on-chain compliance verification, and support for regulatory recovery and forced transfer mechanisms.

## TR-02: REST API Integration

The platform must expose a comprehensive REST API for integration with Emirates NBD's existing systems, including core banking, treasury management, and client-facing applications. The API must support authentication via OAuth 2.0 and provide full CRUD operations for all platform entities.

## TR-03: Multi-Tenant Architecture

The platform must support multi-tenant deployment, enabling logical separation of data, configurations, and user access across different business units and subsidiaries of Emirates NBD Group.

## TR-04: Role-Based Access Control

The platform must implement granular role-based access control (RBAC) supporting custom role definitions, hierarchical permissions, and integration with Emirates NBD's existing Active Directory / LDAP infrastructure. Minimum required roles: Super Admin, Asset Manager, Compliance Officer, Investor, Auditor (read-only).

## TR-05: Custody Integration

The platform must support integration with institutional custody solutions. Fireblocks integration is strongly preferred. The platform should support MPC-based key management, multi-signature approval workflows, and segregated custody wallets per asset class.

# 4. Compliance Requirements

The platform must address the following regulatory and compliance requirements:

## CR-01: MiFID II Compliance

The platform must support compliance with the Markets in Financial Instruments Directive II (MiFID II), including best execution reporting, transaction reporting, product governance requirements, and client categorization (retail, professional, eligible counterparty).

## CR-02: UAE VARA Regulatory Compliance

The platform must comply with the Dubai Virtual Assets Regulatory Authority (VARA) framework, including requirements for virtual asset service providers (VASPs), token classification rules, and ongoing regulatory reporting obligations.

## CR-03: KYC/AML Integration

The platform must integrate with Emirates NBD's existing KYC/AML infrastructure, supporting automated identity verification, ongoing transaction monitoring, sanctions screening (OFAC, EU, UN), and suspicious activity reporting. The platform must support configurable risk scoring models.

## CR-04: Transfer Restrictions

The platform must enforce transfer restrictions based on investor type (accredited, qualified, retail), jurisdiction (country-level allow/block lists), holding periods (lock-up enforcement), and regulatory classification. Restrictions must be enforceable on-chain and auditable.

# 5. Implementation Requirements

## IR-01: Implementation Timeline

The complete implementation, from project initiation through go-live and hypercare completion, must not exceed 6 months. Respondents must provide a detailed phase-by-phase implementation plan demonstrating feasibility within this timeline.

## IR-02: Training

The vendor must provide comprehensive training for a minimum of 50 Emirates NBD staff members, covering platform administration, asset management workflows, compliance operations, and API integration. Training must include instructor-led sessions, hands-on workshops, and self-paced digital materials.

## IR-03: Uptime SLA

The platform must guarantee a minimum of 99.95% uptime, measured monthly, excluding planned maintenance windows. Planned maintenance must not exceed 4 hours per month and must be scheduled outside UAE business hours (Sunday–Thursday, 08:00–17:00 GST).

# 6. Submission Requirements

Respondents must submit the following documents:

## Technical Proposal (maximum 80 pages)

A comprehensive technical proposal addressing all requirements outlined in Sections 3–5 of this RFP. The proposal must follow a structured format and include architecture diagrams, requirement mapping, and implementation methodology.

## Commercial Proposal

A separate commercial proposal detailing pricing structure, licensing model, implementation costs, ongoing support costs, and any optional add-on pricing.

## Implementation Plan

A detailed implementation plan with Gantt chart, milestones, resource allocation, and risk mitigation strategy.

All proposals must be submitted electronically to procurement@emiratesnbd.com by 15 April 2026, 17:00 GST. Late submissions will not be considered.
