#!/usr/bin/env python3
"""Build and POST 9 new DALP country pages to HubSpot."""
import json, os, sys, time, copy

HUBSPOT_TOKEN = os.environ.get("HUBSPOT_ACCESS_TOKEN", "")
CONTENT_DIR = "/Users/quark/Public/quark/workspace/settlemint-office-agents/dalp-for-x/content"
TEMPLATE_PATH = "Marketplace/One_Elements child-theme/templates/One - Competitors Comparison.html"

# ---- COUNTRY DEFINITIONS ----
COUNTRIES = [
    {
        "slug": "spain",
        "name": "Spain",
        "adjective": "Spanish",
        "regulator": "CNMV",
        "meta_description": "SettleMint DALP for Spain: MiCA-aligned compliance, CNMV oversight, stablecoin support, and full digital asset lifecycle for Spanish institutions.",
        "html_title": "SettleMint DALP for Spain: Digital Asset Platform for Spanish Institutions",
        "page_name": "SettleMint DALP for Spain, MiCA-Aligned Digital Asset Platform for Spanish Financial Institutions",
        "hero_h1": "Digital assets, built for Spain's MiCA-aligned regulatory framework.",
        "hero_intro": "Spanish financial institutions operate under CNMV supervision and the EU's MiCA regulation, now fully enforceable. With BBVA and CaixaBank joining the Qivalis consortium to build a regulated euro stablecoin, Spain is positioning itself as a MiCA leader. DALP delivers the compliance controls, deployment flexibility, and lifecycle tooling that regulated issuers in Spain require.",
        "table_heading": "What Spanish institutions need vs. how DALP delivers",
        "table_rows": [
            ("MiCA-compliant token issuance and CASP licensing support", "7 asset templates with configurable compliance rules aligned to MiCA requirements for ARTs, EMTs, and other crypto-assets; ERC-3643 transfer controls enforced at the smart contract layer"),
            ("CNMV-aligned investor eligibility and transfer restrictions", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Euro stablecoin infrastructure for Qivalis consortium participation", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. Two-layer compliance model enforces issuer-defined rules on every transfer"),
            ("Maker-checker governance for banking-grade operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Bond and fund tokenization under Spanish securities law", "Purpose-built bond template with maturity redemption and yield schedules, plus fund template with AUM fee servicing. Both aligned with FIEA-equivalent Spanish securities requirements"),
            ("Integration with existing custodians and payment rails", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility, weighted multisig vaults. ISO 20022 payment rail connectivity for SEPA"),
            ("Full audit trails for CNMV oversight and regulatory reporting", "21 pre-built Grafana dashboards, VictoriaMetrics metrics, Loki logs, and Tempo traces provide end-to-end audit trails for all platform operations"),
            ("Atomic settlement for DvP transactions", "XvP/DvP atomic settlement via HTLC hashlock: delivery and payment finalize simultaneously with zero counterparty risk"),
            ("Data residency options within EU borders", "Kubernetes/Helm deployment supports cloud, on-prem, hybrid, and air-gapped environments. Data residency configurable to keep all data within Spain or the EU"),
            ("KYC/AML integration for Spanish AML obligations", "OnchainID identity registry with invitation-based KYC onboarding, claim lifecycle management, and configurable trusted issuer hierarchy for AML/KYC claim verification"),
        ],
        "reasons_heading": "3 Reasons Spanish Institutions Choose DALP",
        "reasons_intro": "From BBVA to regulated issuers, DALP gives Spanish institutions the controls they need to operate digital assets under MiCA and CNMV oversight.",
        "cards": [
            ("MiCA compliance built into every transfer", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls required under MiCA. Ex-ante validation means every transfer is checked before execution, not after."),
            ("Euro stablecoin and multi-asset lifecycle support", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. The stablecoin template supports reserve attestation hooks and issuer-defined transfer rules for MiCA-compliant EMTs."),
            ("Deployment flexibility for EU data residency", "On-premises, hybrid, and cloud deployment via Kubernetes and Helm. Keep all data within Spain or the EU to meet CNMV and MiCA data handling requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Spanish institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Spain's MiCA-aligned securities and payments markets",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and holding period controls under MiCA",
            "Stablecoin template with reserve attestation hooks: supports Qivalis euro stablecoin and MiCA EMT requirements",
            "Maker-checker approval workflows: dual-control governance aligned with Spanish banking standards",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "21 pre-built Grafana dashboards: full observability for operations, compliance, and audit teams",
        ],
        "cta_h2": "Ready to launch digital asset operations in Spain?",
        "cta_body": "DALP covers the full digital asset lifecycle under MiCA and CNMV regulatory requirements. Talk to a product specialist about your use case.",
        "faq": [
            ("Is SettleMint DALP compliant with Spain's MiCA framework?", "DALP provides the technical infrastructure for MiCA compliance: 12 configurable on-chain compliance module types cover investor eligibility, transfer restrictions, jurisdiction controls, and holding period enforcement. These can be configured to align with CNMV guidelines and MiCA requirements for ARTs, EMTs, and other crypto-assets. DALP is a platform, not a licensed financial institution. Regulatory approval for your specific use case is managed by your legal team."),
            ("Can DALP support euro stablecoin issuance under MiCA?", "Yes. DALP includes a purpose-built stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. The two-layer compliance model enforces issuer-defined rules on every transfer, supporting MiCA EMT requirements."),
            ("Which asset types are most relevant for Spanish financial institutions?", "Bonds and stablecoins are primary use cases for Spain's capital markets. DALP ships purpose-built templates for both, including automated coupon payments, maturity redemption, and stablecoin issuance with reserve controls. DALP also supports funds, equity, deposits, real estate, and precious metals."),
            ("Can DALP be deployed within EU data residency requirements?", "Yes. DALP supports on-premises, hybrid, and cloud deployment via Kubernetes and Helm. All data, including blockchain node data, private keys, and transaction history, can be kept within Spain or the EU to meet CNMV and MiCA data handling requirements."),
            ("How does DALP support Qivalis consortium requirements?", "DALP's stablecoin template, compliance modules, and atomic settlement capabilities align with the infrastructure needs of regulated euro stablecoin initiatives. The platform supports multi-asset lifecycle management, ex-ante compliance enforcement, and integration with existing banking systems via standard APIs."),
        ],
    },
    {
        "slug": "belgium",
        "name": "Belgium",
        "adjective": "Belgian",
        "regulator": "FSMA",
        "meta_description": "SettleMint DALP for Belgium: FSMA-supervised MiCA compliance, KBC Qivalis participation, and full digital asset lifecycle for Belgian institutions.",
        "html_title": "SettleMint DALP for Belgium: Digital Asset Platform for Belgian Institutions",
        "page_name": "SettleMint DALP for Belgium, MiCA-Aligned Digital Asset Platform for Belgian Financial Institutions",
        "hero_h1": "Digital assets, built for Belgium's regulatory framework.",
        "hero_intro": "Belgian financial institutions operate under FSMA supervision and the EU's MiCA regulation, implemented in Belgian law via the Act of 11 December 2025. With KBC joining the Qivalis consortium to build a regulated euro stablecoin, Belgium's institutions are moving from exploration to execution. DALP delivers the compliance controls, deployment flexibility, and lifecycle tooling required.",
        "table_heading": "What Belgian institutions need vs. how DALP delivers",
        "table_rows": [
            ("MiCA-compliant CASP operations under FSMA supervision", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution, aligned with MiCA and FSMA requirements"),
            ("Euro stablecoin infrastructure for Qivalis consortium participation", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. Two-layer compliance model supports MiCA EMT rules"),
            ("Maker-checker governance for Belgian banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Bond tokenization under Belgian and EU securities law", "Purpose-built bond template with maturity redemption and yield schedules. Fund template with AUM fee servicing. 7 asset templates total"),
            ("Integration with existing custodians and SEPA payment rails", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility. ISO 20022 connectivity for SEPA payments"),
            ("Audit trails for FSMA oversight and regulatory reporting", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki logs, and Tempo traces provide end-to-end audit trails"),
            ("Atomic settlement for securities transactions", "XvP/DvP atomic settlement via HTLC hashlock: delivery and payment finalize simultaneously with zero counterparty risk"),
            ("EU data residency and deployment flexibility", "Kubernetes/Helm deployment supports cloud, on-prem, hybrid, and air-gapped environments. Data residency configurable within Belgium or the EU"),
            ("KYC/AML compliance for Belgian AML framework", "OnchainID identity registry with invitation-based KYC onboarding, claim lifecycle management, and configurable trusted issuer hierarchy"),
            ("Operational resilience for financial infrastructure", "Velero-based backup and DR packaged in the DALP Helm chart. Restate durable execution prevents workflow loss on node failure. 298 CLI commands for operational automation"),
        ],
        "reasons_heading": "3 Reasons Belgian Institutions Choose DALP",
        "reasons_intro": "From KBC to regulated issuers, DALP gives Belgian institutions the controls they need to operate digital assets under MiCA and FSMA oversight.",
        "cards": [
            ("MiCA compliance enforced at every transfer", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls required under MiCA. Every transfer is validated before execution via ex-ante enforcement."),
            ("Stablecoin and multi-asset lifecycle coverage", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. The stablecoin template supports Qivalis euro stablecoin requirements with reserve attestation hooks."),
            ("EU deployment with Belgian data residency", "On-premises, hybrid, and cloud deployment via Kubernetes and Helm. Keep all data within Belgium or the EU to satisfy FSMA and MiCA requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Belgian institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Belgium's capital markets",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and holding period controls under MiCA",
            "Stablecoin template with reserve attestation hooks: supports Qivalis euro stablecoin and MiCA EMT compliance",
            "Maker-checker approval workflows: dual-control governance aligned with Belgian banking standards",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "21 pre-built Grafana dashboards: full observability for operations, compliance, and audit teams",
        ],
        "cta_h2": "Ready to launch digital asset operations in Belgium?",
        "cta_body": "DALP covers the full digital asset lifecycle under MiCA and FSMA regulatory requirements. Talk to a product specialist about your use case.",
        "faq": [
            ("Is SettleMint DALP compliant with Belgium's MiCA implementation?", "DALP provides the technical infrastructure for MiCA compliance: 12 configurable on-chain compliance module types cover investor eligibility, transfer restrictions, jurisdiction controls, and holding period enforcement. These align with FSMA requirements under the Act of 11 December 2025. DALP is a platform, not a licensed financial institution."),
            ("Can DALP support euro stablecoin issuance for Belgian banks?", "Yes. DALP includes a stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. The two-layer compliance model supports MiCA EMT requirements for regulated euro stablecoin initiatives."),
            ("Which asset types are most relevant for Belgian financial institutions?", "Bonds, funds, and stablecoins are primary use cases. DALP ships purpose-built templates for each, including automated coupon payments, maturity redemption, fund AUM fee servicing, and stablecoin issuance with reserve controls."),
            ("Can DALP be deployed with EU data residency?", "Yes. DALP supports on-premises, hybrid, and cloud deployment via Kubernetes and Helm. All data can be kept within Belgium or the EU to meet FSMA and MiCA data handling requirements."),
        ],
    },
    {
        "slug": "united-states",
        "name": "United States",
        "adjective": "American",
        "regulator": "SEC",
        "meta_description": "SettleMint DALP for the US: SEC and CFTC aligned compliance, tokenized securities support, and full digital asset lifecycle for US institutions.",
        "html_title": "SettleMint DALP for the United States: Digital Asset Platform for US Institutions",
        "page_name": "SettleMint DALP for the United States, Digital Asset Platform for US Financial Institutions",
        "hero_h1": "Digital assets, built for the US regulatory landscape.",
        "hero_intro": "US financial institutions operate under SEC and CFTC oversight, with the 2026 joint guidance introducing a 5-category digital asset taxonomy and innovation exemptions. With DTCC and Nasdaq running tokenized securities pilots, institutional adoption is accelerating. DALP delivers the compliance controls, deployment flexibility, and lifecycle tooling that regulated US institutions require.",
        "table_heading": "What US institutions need vs. how DALP delivers",
        "table_rows": [
            ("SEC-aligned transfer restrictions and investor eligibility controls", "12 compliance module types covering eligibility, accreditation, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Support for tokenized securities under Regulation D, Reg S, and Reg A+", "7 asset templates with configurable compliance rules. Bond, equity, and fund templates support the transfer restrictions and holding periods required for exempt securities"),
            ("Maker-checker governance for institutional operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Integration with existing custodians (qualified custodians, broker-dealers)", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility, weighted multisig vaults. No custody lock-in"),
            ("Atomic settlement for DvP transactions (DTCC pilot context)", "XvP/DvP atomic settlement via HTLC hashlock: delivery and payment finalize simultaneously with zero counterparty risk"),
            ("Full audit trails for SEC and FINRA oversight", "21 pre-built Grafana dashboards, VictoriaMetrics metrics, Loki logs, and Tempo traces provide end-to-end audit trails for all platform operations"),
            ("On-premises deployment for data sovereignty and security requirements", "Kubernetes/Helm deployment supports cloud, on-prem, hybrid, and air-gapped environments. Data residency is configurable at deployment level"),
            ("KYC/AML integration for BSA/AML and FinCEN obligations", "OnchainID identity registry with invitation-based KYC onboarding, claim lifecycle management, and configurable trusted issuer hierarchy for AML/KYC claim verification"),
            ("Stablecoin infrastructure for USD payment tokens", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. Supports the payment stablecoin category in the SEC-CFTC taxonomy"),
            ("Operational resilience and disaster recovery", "Velero-based backup and DR packaged in the DALP Helm chart. Restate durable execution prevents workflow loss on node failure. 298 CLI commands for operational automation"),
        ],
        "reasons_heading": "3 Reasons US Institutions Choose DALP",
        "reasons_intro": "From broker-dealers to asset managers, DALP gives US institutions the controls they need to operate digital assets under SEC and CFTC oversight.",
        "cards": [
            ("Compliance controls for US securities regulation", "12 on-chain compliance module types enforce transfer restrictions, investor accreditation, and holding period controls required under Reg D, Reg S, and Reg A+. Ex-ante validation checks every transfer before execution."),
            ("Multi-asset lifecycle from issuance to servicing", "7 asset templates cover bonds, equity, funds, stablecoins, deposits, real estate, and precious metals. Each template includes built-in lifecycle logic for coupon payments, maturity redemption, and corporate actions."),
            ("Deployment flexibility for US data sovereignty", "On-premises, hybrid, and cloud deployment via Kubernetes and Helm. Air-gapped environments supported. Full control over data residency and infrastructure."),
        ],
        "diff_heading": "DALP capabilities most relevant to US institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds, equity, and funds most relevant for US capital markets",
            "Ex-ante compliance enforcement: 12 module types covering accreditation, transfer restrictions, and holding period controls",
            "On-premises and air-gapped deployment: full data sovereignty, Kubernetes and Helm packaged",
            "Maker-checker approval workflows: dual-control governance for institutional operations",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "298 CLI commands for operational automation and infrastructure management",
        ],
        "cta_h2": "Ready to launch digital asset operations in the United States?",
        "cta_body": "DALP covers the full digital asset lifecycle with the compliance controls, deployment flexibility, and operational tooling US institutions require. Talk to a product specialist about your use case.",
        "faq": [
            ("Can SettleMint DALP support SEC-regulated tokenized securities?", "DALP provides the technical infrastructure for securities compliance: 12 configurable on-chain compliance module types cover investor accreditation, transfer restrictions, jurisdiction controls, and holding period enforcement. These can be configured for Reg D, Reg S, and Reg A+ requirements. DALP is a platform, not a licensed broker-dealer or transfer agent."),
            ("Does DALP support on-premises deployment in the US?", "Yes. DALP supports on-premises, hybrid, cloud, and air-gapped deployment via Kubernetes and Helm. All data, including blockchain node data, private keys, and transaction history, remains under the institution's control."),
            ("Which asset types are most relevant for US financial institutions?", "Bonds, equity, and funds are primary use cases for US capital markets. DALP ships purpose-built templates for each, including automated coupon payments, maturity redemption, fund subscription and redemption, and AUM fee collection."),
            ("How does DALP handle KYC/AML for US compliance?", "DALP uses OnchainID for verifiable on-chain investor identities with invitation-based KYC onboarding, claim lifecycle management, and a configurable trusted issuer hierarchy. This supports BSA/AML and FinCEN requirements for identity verification."),
            ("Does DALP support atomic settlement for DvP transactions?", "Yes. DALP provides XvP/DvP atomic settlement via HTLC hashlock. Both the asset and payment legs complete together or both revert, eliminating counterparty risk. This aligns with the settlement model used in DTCC and Nasdaq tokenized securities pilots."),
        ],
    },
    {
        "slug": "austria",
        "name": "Austria",
        "adjective": "Austrian",
        "regulator": "FMA",
        "meta_description": "SettleMint DALP for Austria: FMA-supervised MiCA compliance, Raiffeisen context, and full digital asset lifecycle for Austrian institutions.",
        "html_title": "SettleMint DALP for Austria: Digital Asset Platform for Austrian Institutions",
        "page_name": "SettleMint DALP for Austria, MiCA-Aligned Digital Asset Platform for Austrian Financial Institutions",
        "hero_h1": "Digital assets, built for Austria's regulatory framework.",
        "hero_intro": "Austrian financial institutions operate under FMA supervision and the EU's MiCA regulation. With Raiffeisen Bank International joining the Qivalis consortium for a regulated euro stablecoin and Austrian banks like Wiener Privatbank exploring RWA tokenization, the market is moving to execution. DALP delivers the compliance controls, deployment flexibility, and lifecycle tooling required.",
        "table_heading": "What Austrian institutions need vs. how DALP delivers",
        "table_rows": [
            ("MiCA-compliant operations under FMA supervision", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Euro stablecoin infrastructure for Qivalis consortium participation", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. Two-layer compliance model supports MiCA EMT rules"),
            ("Maker-checker governance for Austrian banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Bond and fund tokenization under Austrian securities law", "7 asset templates including bonds with maturity redemption and yield schedules, funds with AUM fee servicing"),
            ("Integration with existing custodians and SEPA payment rails", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility. ISO 20022 connectivity for SEPA"),
            ("Audit trails for FMA oversight", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki, and Tempo provide end-to-end audit trails"),
            ("Atomic settlement for securities transactions", "XvP/DvP atomic settlement via HTLC hashlock: both legs complete together or both revert"),
            ("EU data residency and deployment flexibility", "Kubernetes/Helm deployment supports cloud, on-prem, hybrid, and air-gapped environments. Data residency within Austria or the EU"),
            ("KYC/AML compliance for Austrian AML framework", "OnchainID identity registry with invitation-based KYC onboarding and configurable trusted issuer hierarchy"),
            ("RWA tokenization support for real estate and securities", "Real estate template with fractional ownership support, plus equity template for tokenized shares. Configurable compliance for each asset class"),
        ],
        "reasons_heading": "3 Reasons Austrian Institutions Choose DALP",
        "reasons_intro": "From Raiffeisen to regulated issuers, DALP gives Austrian institutions the controls they need to operate digital assets under MiCA and FMA oversight.",
        "cards": [
            ("MiCA compliance enforced at every transfer", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls under MiCA. Ex-ante validation ensures compliance before execution."),
            ("Multi-asset lifecycle for Austrian capital markets", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. Each template includes purpose-built lifecycle logic for the Austrian and EU regulatory context."),
            ("EU deployment with Austrian data residency", "On-premises, hybrid, and cloud deployment via Kubernetes and Helm. Keep all data within Austria or the EU to meet FMA and MiCA requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Austrian institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds, stablecoins, and real estate most relevant for Austria's markets",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and holding period controls under MiCA",
            "Stablecoin template with reserve attestation hooks: supports Qivalis euro stablecoin and MiCA EMT compliance",
            "Maker-checker approval workflows: dual-control governance aligned with Austrian banking standards",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "On-premises and air-gapped deployment: full data residency within Austria, Kubernetes and Helm packaged",
        ],
        "cta_h2": "Ready to launch digital asset operations in Austria?",
        "cta_body": "DALP covers the full digital asset lifecycle under MiCA and FMA regulatory requirements. Talk to a product specialist about your use case.",
        "faq": [
            ("Is SettleMint DALP compliant with Austria's MiCA implementation?", "DALP provides the technical infrastructure for MiCA compliance: 12 configurable on-chain compliance module types cover investor eligibility, transfer restrictions, jurisdiction controls, and holding period enforcement. These align with FMA requirements. DALP is a platform, not a licensed financial institution."),
            ("Can DALP support euro stablecoin issuance for Austrian banks?", "Yes. DALP includes a stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. This supports MiCA EMT requirements for regulated euro stablecoin initiatives like Qivalis."),
            ("Can DALP be deployed within Austrian data residency requirements?", "Yes. DALP supports on-premises, hybrid, and cloud deployment via Kubernetes and Helm. All data can remain within Austria or the EU."),
            ("Which asset types does DALP support for Austrian markets?", "DALP supports 7 asset classes: bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. Each template ships with built-in lifecycle logic, compliance controls, and servicing automation."),
        ],
    },
    {
        "slug": "egypt",
        "name": "Egypt",
        "adjective": "Egyptian",
        "regulator": "CBE",
        "meta_description": "SettleMint DALP for Egypt: CBE-aligned compliance, CBDC readiness, data residency, and full digital asset lifecycle for Egyptian institutions.",
        "html_title": "SettleMint DALP for Egypt: Digital Asset Platform for Egyptian Institutions",
        "page_name": "SettleMint DALP for Egypt, Digital Asset Platform for Egyptian Financial Institutions",
        "hero_h1": "Digital assets, built for Egypt's financial modernization.",
        "hero_intro": "Egyptian financial institutions operate under Central Bank of Egypt (CBE) oversight as the country advances its digital transformation. With CBE exploring CBDC collaboration with China's PBoC, launching payment card tokenization, and targeting a digital pound by 2030, Egypt's financial infrastructure is evolving. DALP delivers the compliance controls, sovereign deployment, and lifecycle tooling that institutions in Egypt require.",
        "table_heading": "What Egyptian institutions need vs. how DALP delivers",
        "table_rows": [
            ("CBE-aligned compliance controls for digital asset operations", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Sovereign deployment for Egyptian data residency requirements", "Kubernetes/Helm deployment supports on-prem, hybrid, cloud, and air-gapped environments. All data stays within Egypt's borders"),
            ("CBDC readiness for the digital pound initiative", "Settlement infrastructure with atomic DvP/XvP supports CBDC as a settlement rail. Platform architecture is chain-agnostic across EVM networks"),
            ("Maker-checker governance for Egyptian banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Bond and sukuk tokenization for Egyptian capital markets", "7 asset templates including bonds with maturity redemption and yield schedules. Configurable compliance per asset class"),
            ("Integration with existing custodians", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility, weighted multisig vaults"),
            ("Full audit trails for CBE and FRA oversight", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki, and Tempo provide end-to-end audit trails"),
            ("KYC/AML integration for Egyptian AML regulations", "OnchainID identity registry with invitation-based KYC onboarding and configurable trusted issuer hierarchy for AML/KYC claim verification"),
            ("Stablecoin infrastructure for Egyptian pound digital initiatives", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks"),
            ("Operational resilience for financial infrastructure", "Velero-based backup and DR. Restate durable execution prevents workflow loss. 298 CLI commands for operational automation"),
        ],
        "reasons_heading": "3 Reasons Egyptian Institutions Choose DALP",
        "reasons_intro": "From national banks to regulated issuers, DALP gives Egyptian institutions the controls they need to operate digital assets under CBE oversight.",
        "cards": [
            ("Sovereign deployment and data residency", "On-premises and air-gapped deployment via Kubernetes and Helm. All data, including blockchain nodes, private keys, and transaction history, stays within Egypt's borders. Full infrastructure control."),
            ("CBDC-ready settlement infrastructure", "Atomic DvP/XvP settlement supports CBDC integration as a settlement rail. As CBE advances its digital pound initiative, DALP provides the lifecycle infrastructure for digital asset operations alongside central bank digital currencies."),
            ("Compliance controls for Egyptian regulations", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls. Configurable for CBE and FRA requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Egyptian institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Egypt's capital markets",
            "On-premises and air-gapped deployment: full data sovereignty within Egypt, Kubernetes and Helm packaged",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and time-based controls",
            "CBDC settlement integration: atomic DvP/XvP supports central bank digital currencies as a settlement rail",
            "Maker-checker approval workflows: dual-control governance for Egyptian banking operations",
            "21 pre-built Grafana dashboards: full observability for operations and audit teams",
        ],
        "cta_h2": "Ready to launch digital asset operations in Egypt?",
        "cta_body": "DALP covers the full digital asset lifecycle with sovereign deployment, compliance controls, and operational tooling for Egyptian institutions. Talk to a product specialist.",
        "faq": [
            ("Can DALP be deployed within Egypt's borders?", "Yes. DALP supports on-premises, hybrid, cloud, and air-gapped deployment via Kubernetes and Helm. All data, including blockchain node data, private keys, and transaction history, can be kept within Egypt to meet CBE data residency requirements."),
            ("Does DALP support CBDC integration?", "DALP's atomic DvP/XvP settlement infrastructure supports CBDC as a settlement rail. As CBE advances its digital pound initiative, DALP can serve as the lifecycle platform for digital asset operations alongside central bank digital currencies."),
            ("Which asset types does DALP support for Egyptian markets?", "DALP supports 7 asset classes: bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. Bond and stablecoin templates are most relevant for Egypt's capital markets and digital currency initiatives."),
            ("How does DALP handle KYC/AML for Egyptian regulations?", "DALP uses OnchainID for verifiable on-chain investor identities with invitation-based KYC onboarding, claim lifecycle management, and a configurable trusted issuer hierarchy for AML/KYC verification."),
        ],
    },
    {
        "slug": "oman",
        "name": "Oman",
        "adjective": "Omani",
        "regulator": "CMA",
        "meta_description": "SettleMint DALP for Oman: CMA-aligned compliance, GCC interoperability, data residency, and full digital asset lifecycle for Omani institutions.",
        "html_title": "SettleMint DALP for Oman: Digital Asset Platform for Omani Institutions",
        "page_name": "SettleMint DALP for Oman, Digital Asset Platform for Omani Financial Institutions",
        "hero_h1": "Digital assets, built for Oman's evolving regulatory framework.",
        "hero_intro": "Omani financial institutions operate under the Capital Market Authority (CMA) as the country develops its VASP regulatory framework aligned with FATF standards. With Oman's digital roadmap targeting 2030, fintech licensing accelerating, and the broader GCC region leading global tokenization activity, Omani institutions need infrastructure that is ready today. DALP delivers the compliance controls, sovereign deployment, and lifecycle tooling required.",
        "table_heading": "What Omani institutions need vs. how DALP delivers",
        "table_rows": [
            ("CMA-aligned compliance for digital asset operations", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Sovereign deployment for Omani data residency", "Kubernetes/Helm deployment supports on-prem, hybrid, cloud, and air-gapped environments. All data stays within Oman's borders"),
            ("Sukuk and bond tokenization for Omani capital markets", "7 asset templates including bonds with maturity redemption and yield schedules. Configurable compliance per asset class supports Islamic finance structures"),
            ("Maker-checker governance for Omani banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("GCC interoperability for cross-border digital asset operations", "Standard APIs (REST, GraphQL, webhooks) and ISO 20022 payment rail connectivity. EVM-based architecture works across GCC blockchain initiatives"),
            ("Integration with existing custodians", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility, weighted multisig vaults"),
            ("Full audit trails for CMA oversight", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki, and Tempo provide end-to-end audit trails"),
            ("KYC/AML integration for FATF-aligned requirements", "OnchainID identity registry with invitation-based KYC onboarding and configurable trusted issuer hierarchy for AML/KYC verification"),
            ("Atomic settlement for securities transactions", "XvP/DvP atomic settlement via HTLC hashlock: both legs complete together or both revert"),
            ("Operational resilience for financial infrastructure", "Velero-based backup and DR. Restate durable execution prevents workflow loss. 298 CLI commands for operational automation"),
        ],
        "reasons_heading": "3 Reasons Omani Institutions Choose DALP",
        "reasons_intro": "From national banks to regulated issuers, DALP gives Omani institutions the controls they need to operate digital assets under CMA oversight.",
        "cards": [
            ("Sovereign deployment and data residency", "On-premises and air-gapped deployment via Kubernetes and Helm. All data stays within Oman's borders, meeting CMA requirements for data sovereignty and regulatory control."),
            ("GCC-ready multi-asset lifecycle", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. Sukuk-compatible bond templates support Islamic finance structures common across the GCC."),
            ("Compliance controls for Omani regulations", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls. Configurable for CMA and FATF-aligned requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Omani institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Oman's capital markets",
            "On-premises and air-gapped deployment: full data sovereignty within Oman, Kubernetes and Helm packaged",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and time-based controls",
            "Maker-checker approval workflows: dual-control governance for Omani banking operations",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "ISO 20022 payment rail connectivity: supports GCC cross-border payment integration",
        ],
        "cta_h2": "Ready to launch digital asset operations in Oman?",
        "cta_body": "DALP covers the full digital asset lifecycle with sovereign deployment, compliance controls, and GCC interoperability. Talk to a product specialist.",
        "faq": [
            ("Can DALP be deployed within Oman's borders?", "Yes. DALP supports on-premises, hybrid, cloud, and air-gapped deployment via Kubernetes and Helm. All data can remain within Oman to meet CMA data residency requirements."),
            ("Does DALP support sukuk and Islamic finance structures?", "DALP's bond template supports configurable yield schedules and maturity redemption that can be structured for sukuk. Compliance modules can enforce Sharia-aligned transfer restrictions and investor eligibility."),
            ("How does DALP fit into the broader GCC digital asset ecosystem?", "DALP's EVM-based architecture, standard APIs, and ISO 20022 connectivity enable interoperability with GCC blockchain initiatives. Institutions in Oman can operate alongside counterparts in UAE, Saudi Arabia, Qatar, Bahrain, and Kuwait."),
            ("How does DALP handle KYC/AML for Omani compliance?", "DALP uses OnchainID for verifiable on-chain investor identities with invitation-based KYC onboarding and a configurable trusted issuer hierarchy aligned with FATF AML/KYC standards."),
        ],
    },
    {
        "slug": "denmark",
        "name": "Denmark",
        "adjective": "Danish",
        "regulator": "Finanstilsynet",
        "meta_description": "SettleMint DALP for Denmark: Finanstilsynet-supervised MiCA compliance, Danske Bank context, and full digital asset lifecycle for Danish institutions.",
        "html_title": "SettleMint DALP for Denmark: Digital Asset Platform for Danish Institutions",
        "page_name": "SettleMint DALP for Denmark, MiCA-Aligned Digital Asset Platform for Danish Financial Institutions",
        "hero_h1": "Digital assets, built for Denmark's regulatory framework.",
        "hero_intro": "Danish financial institutions operate under Finanstilsynet supervision and the EU's MiCA regulation. With Danske Bank joining the Qivalis consortium for a regulated euro stablecoin and now offering crypto ETPs to its 5 million customers, Denmark's largest bank signals that institutional digital asset adoption has arrived. DALP delivers the compliance controls, deployment flexibility, and lifecycle tooling required.",
        "table_heading": "What Danish institutions need vs. how DALP delivers",
        "table_rows": [
            ("MiCA-compliant CASP operations under Finanstilsynet", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Euro stablecoin infrastructure for Qivalis consortium participation", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. Two-layer compliance model supports MiCA EMT rules"),
            ("Maker-checker governance for Danish banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Bond tokenization under Danish and EU securities law", "Purpose-built bond template with maturity redemption and yield schedules. Fund template with AUM fee servicing. 7 asset templates total"),
            ("Integration with existing custodians and payment rails", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility. ISO 20022 connectivity for SEPA/Nordic payments"),
            ("Audit trails for Finanstilsynet oversight", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki, and Tempo provide end-to-end audit trails"),
            ("Atomic settlement for securities transactions", "XvP/DvP atomic settlement via HTLC hashlock: both legs complete together or both revert"),
            ("EU data residency and deployment flexibility", "Kubernetes/Helm deployment supports cloud, on-prem, hybrid, and air-gapped environments. Data residency within Denmark or the EU"),
            ("KYC/AML compliance for Danish AML framework", "OnchainID identity registry with invitation-based KYC onboarding and configurable trusted issuer hierarchy"),
            ("Operational resilience for critical financial infrastructure", "Velero-based backup and DR. Restate durable execution prevents workflow loss. 298 CLI commands for operational automation"),
        ],
        "reasons_heading": "3 Reasons Danish Institutions Choose DALP",
        "reasons_intro": "From Danske Bank to regulated issuers, DALP gives Danish institutions the controls they need to operate digital assets under MiCA and Finanstilsynet oversight.",
        "cards": [
            ("MiCA compliance enforced at every transfer", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls under MiCA. Every transfer is validated before execution via ex-ante enforcement."),
            ("Stablecoin and multi-asset lifecycle coverage", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. The stablecoin template supports Qivalis euro stablecoin requirements."),
            ("EU deployment with Danish data residency", "On-premises, hybrid, and cloud deployment via Kubernetes and Helm. Keep all data within Denmark or the EU to meet Finanstilsynet and MiCA requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Danish institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Denmark's capital markets",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and holding period controls under MiCA",
            "Stablecoin template with reserve attestation hooks: supports Qivalis euro stablecoin and MiCA EMT compliance",
            "Maker-checker approval workflows: dual-control governance aligned with Danish banking standards",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "21 pre-built Grafana dashboards: full observability for operations, compliance, and audit teams",
        ],
        "cta_h2": "Ready to launch digital asset operations in Denmark?",
        "cta_body": "DALP covers the full digital asset lifecycle under MiCA and Finanstilsynet regulatory requirements. Talk to a product specialist about your use case.",
        "faq": [
            ("Is SettleMint DALP compliant with Denmark's MiCA framework?", "DALP provides the technical infrastructure for MiCA compliance: 12 configurable on-chain compliance module types cover investor eligibility, transfer restrictions, jurisdiction controls, and holding period enforcement. These align with Finanstilsynet requirements. DALP is a platform, not a licensed financial institution."),
            ("Can DALP support euro stablecoin issuance for Danish banks?", "Yes. DALP includes a stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. The two-layer compliance model supports MiCA EMT requirements for regulated euro stablecoin initiatives like Qivalis."),
            ("Can DALP be deployed within EU data residency requirements?", "Yes. DALP supports on-premises, hybrid, and cloud deployment via Kubernetes and Helm. All data can remain within Denmark or the EU to meet Finanstilsynet and MiCA data handling requirements."),
            ("Which asset types are most relevant for Danish financial institutions?", "Bonds, funds, and stablecoins are primary use cases. DALP ships purpose-built templates for each, with automated coupon payments, maturity redemption, fund AUM fee servicing, and stablecoin issuance with reserve controls."),
        ],
    },
    {
        "slug": "sweden",
        "name": "Sweden",
        "adjective": "Swedish",
        "regulator": "Finansinspektionen",
        "meta_description": "SettleMint DALP for Sweden: Finansinspektionen-supervised MiCA compliance, SEB Qivalis context, and full digital asset lifecycle for Swedish institutions.",
        "html_title": "SettleMint DALP for Sweden: Digital Asset Platform for Swedish Institutions",
        "page_name": "SettleMint DALP for Sweden, MiCA-Aligned Digital Asset Platform for Swedish Financial Institutions",
        "hero_h1": "Digital assets, built for Sweden's regulatory framework.",
        "hero_intro": "Swedish financial institutions operate under Finansinspektionen (FI) supervision and the EU's MiCA regulation. With SEB joining the Qivalis consortium for a regulated euro stablecoin, Sweden's financial sector is preparing for institutional-scale digital asset operations. DALP delivers the compliance controls, deployment flexibility, and lifecycle tooling required.",
        "table_heading": "What Swedish institutions need vs. how DALP delivers",
        "table_rows": [
            ("MiCA-compliant CASP operations under Finansinspektionen", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Euro stablecoin infrastructure for Qivalis consortium participation", "Stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. Two-layer compliance model supports MiCA EMT rules"),
            ("Maker-checker governance for Swedish banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("Bond and fund tokenization under Swedish and EU securities law", "Purpose-built bond template with maturity redemption and yield schedules. Fund template with AUM fee servicing. 7 asset templates total"),
            ("Integration with existing custodians and Nordic payment rails", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility. ISO 20022 connectivity for SEPA/Nordic payments"),
            ("Audit trails for Finansinspektionen oversight", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki, and Tempo provide end-to-end audit trails"),
            ("Atomic settlement for securities transactions", "XvP/DvP atomic settlement via HTLC hashlock: both legs complete together or both revert"),
            ("EU data residency and deployment flexibility", "Kubernetes/Helm deployment supports cloud, on-prem, hybrid, and air-gapped environments. Data residency within Sweden or the EU"),
            ("KYC/AML compliance for Swedish AML framework", "OnchainID identity registry with invitation-based KYC onboarding and configurable trusted issuer hierarchy"),
            ("Operational resilience for critical financial infrastructure", "Velero-based backup and DR. Restate durable execution prevents workflow loss. 298 CLI commands for operational automation"),
        ],
        "reasons_heading": "3 Reasons Swedish Institutions Choose DALP",
        "reasons_intro": "From SEB to regulated issuers, DALP gives Swedish institutions the controls they need to operate digital assets under MiCA and Finansinspektionen oversight.",
        "cards": [
            ("MiCA compliance enforced at every transfer", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls under MiCA. Every transfer is validated before execution via ex-ante enforcement."),
            ("Stablecoin and multi-asset lifecycle coverage", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. The stablecoin template supports Qivalis euro stablecoin requirements."),
            ("EU deployment with Swedish data residency", "On-premises, hybrid, and cloud deployment via Kubernetes and Helm. Keep all data within Sweden or the EU to meet Finansinspektionen and MiCA requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Swedish institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Sweden's capital markets",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and holding period controls under MiCA",
            "Stablecoin template with reserve attestation hooks: supports Qivalis euro stablecoin and MiCA EMT compliance",
            "Maker-checker approval workflows: dual-control governance aligned with Swedish banking standards",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "21 pre-built Grafana dashboards: full observability for operations, compliance, and audit teams",
        ],
        "cta_h2": "Ready to launch digital asset operations in Sweden?",
        "cta_body": "DALP covers the full digital asset lifecycle under MiCA and Finansinspektionen regulatory requirements. Talk to a product specialist about your use case.",
        "faq": [
            ("Is SettleMint DALP compliant with Sweden's MiCA framework?", "DALP provides the technical infrastructure for MiCA compliance: 12 configurable on-chain compliance module types cover investor eligibility, transfer restrictions, jurisdiction controls, and holding period enforcement. These align with Finansinspektionen requirements. DALP is a platform, not a licensed financial institution."),
            ("Can DALP support euro stablecoin issuance for Swedish banks?", "Yes. DALP includes a stablecoin asset template with configurable issuance controls, transfer restrictions, and reserve attestation hooks. The two-layer compliance model supports MiCA EMT requirements for regulated euro stablecoin initiatives like Qivalis."),
            ("Can DALP be deployed within EU data residency requirements?", "Yes. DALP supports on-premises, hybrid, and cloud deployment via Kubernetes and Helm. All data can remain within Sweden or the EU to meet Finansinspektionen and MiCA data handling requirements."),
            ("Which asset types are most relevant for Swedish financial institutions?", "Bonds, funds, and stablecoins are primary use cases. DALP ships purpose-built templates for each, with automated coupon payments, maturity redemption, fund AUM fee servicing, and stablecoin issuance with reserve controls."),
        ],
    },
    {
        "slug": "kuwait",
        "name": "Kuwait",
        "adjective": "Kuwaiti",
        "regulator": "CMA Kuwait",
        "meta_description": "SettleMint DALP for Kuwait: CMA-aligned compliance, GCC interoperability, data residency, and full digital asset lifecycle for Kuwaiti institutions.",
        "html_title": "SettleMint DALP for Kuwait: Digital Asset Platform for Kuwaiti Institutions",
        "page_name": "SettleMint DALP for Kuwait, Digital Asset Platform for Kuwaiti Financial Institutions",
        "hero_h1": "Digital assets, built for Kuwait's financial transformation.",
        "hero_intro": "Kuwaiti financial institutions operate under Capital Markets Authority (CMA) oversight as the country advances its digital transformation agenda. With CMA developing its fintech regulatory framework, authorizing securities-based crowdfunding, and the broader GCC region leading global tokenization activity, Kuwait's institutions need infrastructure that is ready today. DALP delivers the compliance controls, sovereign deployment, and lifecycle tooling required.",
        "table_heading": "What Kuwaiti institutions need vs. how DALP delivers",
        "table_rows": [
            ("CMA-aligned compliance for digital asset operations", "12 compliance module types covering eligibility, country restrictions, transfer controls, and time-based rules. Ex-ante enforcement validates every transfer before execution"),
            ("Sovereign deployment for Kuwaiti data residency", "Kubernetes/Helm deployment supports on-prem, hybrid, cloud, and air-gapped environments. All data stays within Kuwait's borders"),
            ("Sukuk and bond tokenization for Kuwaiti capital markets", "7 asset templates including bonds with maturity redemption and yield schedules. Configurable compliance per asset class supports Islamic finance structures"),
            ("Maker-checker governance for Kuwaiti banking operations", "RBAC/ABAC with maker-checker approval workflows for all sensitive operations: issuance, transfers, compliance changes, and administrative actions"),
            ("GCC interoperability for cross-border digital asset operations", "Standard APIs (REST, GraphQL, webhooks) and ISO 20022 payment rail connectivity. EVM-based architecture works across GCC blockchain initiatives"),
            ("Integration with existing custodians", "Bring-your-own-custodian model: native Fireblocks and DFNS integration, HSM compatibility, weighted multisig vaults"),
            ("Full audit trails for CMA oversight", "21 pre-built Grafana dashboards, VictoriaMetrics, Loki, and Tempo provide end-to-end audit trails"),
            ("KYC/AML integration for Kuwaiti AML framework", "OnchainID identity registry with invitation-based KYC onboarding and configurable trusted issuer hierarchy for AML/KYC verification"),
            ("Atomic settlement for securities transactions", "XvP/DvP atomic settlement via HTLC hashlock: both legs complete together or both revert"),
            ("Boursa Kuwait integration readiness", "Standard APIs and webhooks enable integration with Boursa Kuwait and existing market infrastructure for digital securities"),
        ],
        "reasons_heading": "3 Reasons Kuwaiti Institutions Choose DALP",
        "reasons_intro": "From national banks to regulated issuers, DALP gives Kuwaiti institutions the controls they need to operate digital assets under CMA oversight.",
        "cards": [
            ("Sovereign deployment and data residency", "On-premises and air-gapped deployment via Kubernetes and Helm. All data stays within Kuwait's borders, meeting CMA requirements for data sovereignty and regulatory control."),
            ("GCC-ready multi-asset lifecycle", "7 asset templates cover bonds, funds, stablecoins, equity, deposits, real estate, and precious metals. Sukuk-compatible bond templates support Islamic finance structures common across the GCC."),
            ("Compliance controls for Kuwaiti regulations", "12 on-chain compliance module types enforce transfer restrictions, investor eligibility, and jurisdiction controls. Configurable for CMA and FATF-aligned requirements."),
        ],
        "diff_heading": "DALP capabilities most relevant to Kuwaiti institutions",
        "diff_items": [
            "7 asset templates with built-in lifecycle logic: bonds and stablecoins most relevant for Kuwait's capital markets",
            "On-premises and air-gapped deployment: full data sovereignty within Kuwait, Kubernetes and Helm packaged",
            "Ex-ante compliance enforcement: 12 module types covering eligibility, transfer restrictions, and time-based controls",
            "Maker-checker approval workflows: dual-control governance for Kuwaiti banking operations",
            "Atomic DvP/XvP settlement with HTLC hashlock: both legs complete together or both revert",
            "ISO 20022 payment rail connectivity: supports GCC cross-border payment integration",
        ],
        "cta_h2": "Ready to launch digital asset operations in Kuwait?",
        "cta_body": "DALP covers the full digital asset lifecycle with sovereign deployment, compliance controls, and GCC interoperability. Talk to a product specialist.",
        "faq": [
            ("Can DALP be deployed within Kuwait's borders?", "Yes. DALP supports on-premises, hybrid, cloud, and air-gapped deployment via Kubernetes and Helm. All data can remain within Kuwait to meet CMA data residency requirements."),
            ("Does DALP support sukuk and Islamic finance structures?", "DALP's bond template supports configurable yield schedules and maturity redemption that can be structured for sukuk. Compliance modules can enforce Sharia-aligned transfer restrictions and investor eligibility."),
            ("How does DALP fit into the broader GCC digital asset ecosystem?", "DALP's EVM-based architecture, standard APIs, and ISO 20022 connectivity enable interoperability with GCC blockchain initiatives. Institutions in Kuwait can operate alongside counterparts in UAE, Saudi Arabia, Qatar, Bahrain, and Oman."),
            ("How does DALP handle KYC/AML for Kuwaiti compliance?", "DALP uses OnchainID for verifiable on-chain investor identities with invitation-based KYC onboarding and a configurable trusted issuer hierarchy aligned with FATF AML/KYC standards."),
        ],
    },
]

def build_table_html(country_name, rows):
    """Build the HTML table for section-2."""
    header_left = f"What {country_name} institutions need"
    header_right = "How DALP delivers it"
    html = f'<table style="width:100%; border-collapse:collapse; color:#1a1a2e;"><colgroup><col style="width:50%"><col style="width:50%"></colgroup>\n'
    html += f'<thead style="background-color:#000048 !important; color:#ffffff !important;">\n'
    html += f'<tr style="border-bottom:1px solid #e5e5e5;">\n'
    html += f'<th style="padding:12px 16px; text-align:left; color:#ffffff !important; background-color:#000048 !important; border:1px solid #1a1a5e;">{header_left}</th>\n'
    html += f'<th style="padding:12px 16px; text-align:left; color:#ffffff !important; background-color:#000048 !important; border:1px solid #1a1a5e;">{header_right}</th>\n'
    html += '</tr>\n</thead>\n<tbody>\n'
    for left, right in rows:
        html += f'<tr style="border-bottom:1px solid #e5e5e5;">\n'
        html += f'<td style="padding:12px 16px; border-bottom:1px solid #e5e5e5; color:#1a1a2e;">{left}</td>\n'
        html += f'<td style="padding:12px 16px; border-bottom:1px solid #e5e5e5; color:#1a1a2e;">{right}</td>\n'
        html += '</tr>\n'
    html += '</tbody>\n</table>'
    return html

def build_faq_schema(country_name, faq_items):
    """Build FAQ + SoftwareApplication schema for headHtml."""
    faq_entities = []
    for q, a in faq_items:
        faq_entities.append({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": a
            }
        })
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq_entities
    }
    sw_schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SettleMint DALP",
        "description": f"Digital Asset Lifecycle Platform for {country_name} institutions. Covers issuance, compliance, servicing, settlement, and custody via a single EVM-based platform.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Cloud, On-Premises, Kubernetes",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SettleMint",
            "url": "https://www.settlemint.com"
        }
    }
    return (
        f'<script type="application/ld+json">\n{json.dumps(faq_schema, indent=2)}\n</script>\n'
        f'<script type="application/ld+json">\n{json.dumps(sw_schema, indent=2)}\n</script>'
    )

def build_checkmark_item(text):
    """Build a single checkmark list item."""
    return {
        "icon": {
            "alt": "checkmark",
            "height": 30,
            "loading": "disabled",
            "size_type": "exact",
            "src": "https://8639589.fs1.hubspotusercontent-eu1.net/hubfs/8639589/Icons/Tick_icon_blue.png",
            "width": 30
        },
        "icon_color": {"color": "#2253FF", "opacity": 100},
        "icon_field": {"name": "check", "type": "SOLID", "unicode": "f00c"},
        "icon_size": 20,
        "text": f'<p style="font-weight: 500;">{text}</p>',
        "type_icon": "image"
    }

def build_card_item(title, body):
    """Build a single card item for section-3."""
    return {
        "cta_link": {"no_follow": False, "open_in_new_tab": False, "url": {"href": ""}},
        "cta_text": "",
        "description": f"<p>{body}</p>",
        "number_text": title
    }

def build_layout_sections(c):
    """Build complete layoutSections matching the live Japan page structure."""
    return {
        "section-1": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-1", "name": "section-1", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 48}, "top": {"units": "px", "value": 80}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 40}, "top": {"units": "px", "value": 48}}}}}}],
            "rows": [{"0": {
                "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                "name": "section-1-col", "params": {"css_class": "dnd-column"},
                "rowMetaData": [{"cssClass": "dnd-row"}],
                "rows": [
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Eyebrow Heading", "name": "widget_tokeny_hero_eyebrow", "params": {"css_class": "dnd-module", "eyebrow_color": {"color": "#000017", "opacity": 100}, "eyebrow_text": f"DALP for {c['name']}", "heading_color": {"color": "#000000", "opacity": 100}, "heading_text": c["hero_h1"], "module_id": 374272770289, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Rich Text", "name": "widget_tokeny_hero_richtext", "params": {"css_class": "dnd-module", "html": f'<p style="color: #4C4C4C;">{c["hero_intro"]}</p>', "module_id": 1155639, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "One - Buttons", "name": "widget_tokeny_hero_button", "params": {"button": [{"button_text": "See DALP in Action", "class_button": "btn-primary-dark", "display_options": {"enable_on_desktop": True, "enable_on_mobile": True, "enable_on_tablet": True}, "enable_icon": "right_icon", "icon_color": {"color": "#FFFFFF", "opacity": 100}, "icon_color_hover": {"color": "#FFFFFF", "opacity": 100}, "icon_field": {"name": "arrow-right", "type": "REGULAR", "unicode": "f061"}, "icon_size_button": 12, "link_field": {"no_follow": False, "open_in_new_tab": False, "url": {"href": "/demo"}}}], "css_class": "dnd-module", "module_id": 362517245155, "schema_version": 2, "settings": {"button_align_desktop": "left", "button_align_mobile": "left"}}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                ],
                "type": "cell", "w": 12, "x": 0
            }}],
            "w": 0, "x": 0
        },
        "section-2": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-2", "name": "section-2", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 80}, "top": {"units": "px", "value": 80}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 64}, "top": {"units": "px", "value": 80}}}}}}],
            "rows": [{"0": {
                "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                "name": "section-2-col", "params": {"css_class": "dnd-column"},
                "rowMetaData": [{"cssClass": "dnd-row"}],
                "rows": [
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Eyebrow Heading", "name": "widget_tokeny_table_heading", "params": {"css_class": "dnd-module", "eyebrow_color": {"color": "#4c4c4c", "opacity": 100}, "eyebrow_text": "Platform Fit", "heading_color": {"color": "#000000", "opacity": 100}, "heading_text": c["table_heading"], "module_id": 374272770289, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Rich Text", "name": "widget_tokeny_table_richtext", "params": {"css_class": "dnd-module", "html": build_table_html(c["name"], c["table_rows"]), "module_id": 1155639, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                ],
                "type": "cell", "w": 12, "x": 0
            }}],
            "w": 0, "x": 0
        },
        "section-3": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-3", "name": "section-3", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"backgroundColor": {"a": 1.0, "b": 248, "g": 248, "r": 247}, "breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 80}, "top": {"units": "px", "value": 80}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 64}, "top": {"units": "px", "value": 80}}}}}}],
            "rows": [{"0": {
                "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                "name": "section-3-col", "params": {"css_class": "dnd-column"},
                "rowMetaData": [{"cssClass": "dnd-row"}],
                "rows": [
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Eyebrow Heading", "name": "widget_tokeny_reasons_heading", "params": {"css_class": "dnd-module", "eyebrow_color": {"color": "#4c4c4c", "opacity": 100}, "eyebrow_text": "Why Choose DALP", "heading_color": {"color": "#000017", "opacity": 100}, "heading_text": c["reasons_heading"], "module_id": 374272770289, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Rich Text", "name": "widget_tokeny_reasons_intro", "params": {"css_class": "dnd-module", "html": f'<p style="color: #4c4c4c;">{c["reasons_intro"]}</p>', "module_id": 1155639, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "One - Cards - Grid", "name": "widget_tokeny_reasons_cards", "params": {"css_class": "dnd-module", "full_width": True, "items": [build_card_item(t, b) for t, b in c["cards"]], "module_id": 376294640884, "schema_version": 2, "spacing": {"padding_bottom": 0, "padding_left": 0, "padding_right": 0, "padding_top": 0}, "style": {"background_color": {"color": "#FFFFFF", "opacity": 0}, "description_color": {"color": "#4C4C4C"}, "number_color": {"color": "#000017"}}}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                ],
                "type": "cell", "w": 12, "x": 0
            }}],
            "w": 0, "x": 0
        },
        "section-4": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-4", "name": "section-4", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 80}, "top": {"units": "px", "value": 80}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 64}, "top": {"units": "px", "value": 80}}}}}}],
            "rows": [{
                "0": {
                    "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                    "name": "section-4-col-left", "params": {"css_class": "dnd-column"},
                    "rowMetaData": [{"cssClass": "dnd-row"}],
                    "rows": [
                        {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Eyebrow Heading", "name": "widget_tokeny_diff_heading", "params": {"css_class": "dnd-module", "eyebrow_color": {"color": "#4c4c4c", "opacity": 100}, "eyebrow_text": "Platform Capabilities", "heading_color": {"color": "#000017", "opacity": 100}, "heading_text": c["diff_heading"], "module_id": 374272770289, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    ],
                    "type": "cell", "w": 5, "x": 0
                },
                "6": {
                    "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                    "name": "section-4-col-right", "params": {"css_class": "dnd-column"},
                    "rowMetaData": [{"cssClass": "dnd-row"}],
                    "rows": [
                        {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "One - List Items", "name": "widget_tokeny_diff_list", "params": {"css_class": "dnd-module", "items": [build_checkmark_item(item) for item in c["diff_items"]], "module_id": 362517245149, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    ],
                    "type": "cell", "w": 6, "x": 6
                }
            }],
            "w": 0, "x": 0
        },
        "section-5": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-5", "name": "section-5", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 1}, "top": {"units": "px", "value": 1}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 0}, "top": {"units": "px", "value": 0}}}}}}],
            "rows": [{"0": {
                "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                "name": "section-5-col", "params": {"css_class": "dnd-column"},
                "rowMetaData": [{"cssClass": "dnd-row"}],
                "rows": [
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "One - Divider", "name": "widget_tokeny_divider", "params": {"css_class": "dnd-module", "module_id": 362496925910, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                ],
                "type": "cell", "w": 12, "x": 0
            }}],
            "w": 0, "x": 0
        },
        "section-6": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-6", "name": "section-6", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 80}, "top": {"units": "px", "value": 80}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 64}, "top": {"units": "px", "value": 64}}}}}}],
            "rows": [{"0": {
                "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                "name": "section-6-col", "params": {"css_class": "dnd-column"},
                "rowMetaData": [{"cssClass": "dnd-row"}],
                "rows": [
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Eyebrow Heading", "name": "widget_tokeny_faq_heading", "params": {"css_class": "dnd-module", "eyebrow_color": {"color": "#4c4c4c", "opacity": 100}, "eyebrow_text": "", "heading_color": {"color": "#000000", "opacity": 100}, "heading_text": "Frequently Asked Questions", "module_id": 374272770289, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Accordion Toggle", "name": "widget_tokeny_faq_accordion", "params": {"accordions": [{"content": f"<p>{a}</p>", "open_by_default": False, "title": q} for q, a in c["faq"]], "css_class": "dnd-module", "module_id": 61991970375, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                ],
                "type": "cell", "w": 12, "x": 0
            }}],
            "w": 0, "x": 0
        },
        "section-7": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
            "label": "section-7", "name": "section-7", "params": {},
            "rowMetaData": [{"cssClass": "dnd-section", "styles": {"backgroundColor": {"a": 1.0, "b": 72, "g": 0, "r": 0}, "breakpointStyles": {"default": {"padding": {"bottom": {"units": "px", "value": 80}, "top": {"units": "px", "value": 80}}}, "mobile": {"padding": {"bottom": {"units": "px", "value": 64}, "top": {"units": "px", "value": 64}}}}}}],
            "rows": [{
                "0": {
                    "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                    "name": "section-7-col-left", "params": {"css_class": "dnd-column"},
                    "rowMetaData": [{"cssClass": "dnd-row"}],
                    "rows": [
                        {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Rich Text", "name": "widget_tokeny_ctah2_heading", "params": {"css_class": "dnd-module", "html": f'<h2 style="margin-bottom: 24px; color: #ffffff;">{c["cta_h2"]}</h2>', "module_id": 1155639, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                        {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Rich Text", "name": "widget_tokeny_ctah2_subtext", "params": {"css_class": "dnd-module", "html": f'<p style="color: #e0e0e0;">{c["cta_body"]}</p>', "module_id": 1155639, "schema_version": 2}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    ],
                    "type": "cell", "w": 8, "x": 0
                },
                "8": {
                    "cells": [], "cssClass": "", "cssId": "", "cssStyle": "",
                    "name": "section-7-col-right", "params": {"css_class": "dnd-column"},
                    "rowMetaData": [{"cssClass": "dnd-row"}],
                    "rows": [
                        {"0": {"cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "One - Buttons", "name": "widget_tokeny_ctah2_buttons", "params": {"button": [{"button_text": "Book a Demo", "class_button": "btn-secondary-dark", "display_options": {"enable_on_desktop": True, "enable_on_mobile": True, "enable_on_tablet": True}, "enable_icon": "right_icon", "icon_color": {"color": "#FFFFFF", "opacity": 100}, "icon_color_hover": {"color": "#FFFFFF", "opacity": 100}, "icon_field": {"name": "arrow-right", "type": "REGULAR", "unicode": "f061"}, "icon_size_button": 12, "link_field": {"no_follow": False, "open_in_new_tab": False, "url": {"href": "/request-a-demo"}}}], "css_class": "dnd-module", "module_id": 362517245155, "schema_version": 2, "settings": {"button_align_desktop": "left", "button_align_mobile": "left"}}, "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}},
                    ],
                    "type": "cell", "w": 4, "x": 8
                }
            }],
            "w": 0, "x": 0
        },
    }

def build_page_payload(c):
    """Build complete HubSpot page creation payload."""
    return {
        "domain": "",
        "slug": f"for/{c['slug']}",
        "name": c["page_name"],
        "htmlTitle": c["html_title"],
        "metaDescription": c["meta_description"],
        "linkRelCanonicalUrl": f"https://www.settlemint.com/for/{c['slug']}",
        "templatePath": TEMPLATE_PATH,
        "headHtml": build_faq_schema(c["name"], c["faq"]),
        "layoutSections": build_layout_sections(c),
    }

def validate_no_em_dashes(payload_str, slug):
    """Check for em dashes in serialized payload."""
    if "\u2014" in payload_str:
        print(f"  WARNING: Em dash found in {slug}!")
        return False
    return True

def validate_meta_desc(meta, slug):
    """Check meta description length."""
    if len(meta) > 155:
        print(f"  WARNING: Meta description for {slug} is {len(meta)} chars (max 155)!")
        return False
    return True

def post_page(payload, slug):
    """POST a page to HubSpot and return the page ID."""
    import urllib.request
    url = "https://api.hubapi.com/cms/v3/pages/site-pages"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {HUBSPOT_TOKEN}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            page_id = result.get("id", "unknown")
            print(f"  Created: {slug} -> Page ID: {page_id}")
            return page_id, result
    except Exception as e:
        error_body = ""
        if hasattr(e, "read"):
            error_body = e.read().decode("utf-8", errors="replace")
        print(f"  ERROR creating {slug}: {e}\n  Response: {error_body[:500]}")
        return None, None

def main():
    if not HUBSPOT_TOKEN:
        print("ERROR: HUBSPOT_ACCESS_TOKEN not set")
        sys.exit(1)

    results = {}
    for i, c in enumerate(COUNTRIES):
        slug = c["slug"]
        print(f"\n[{i+1}/9] Building {slug}...")

        payload = build_page_payload(c)
        payload_str = json.dumps(payload)

        # Validations
        validate_no_em_dashes(payload_str, slug)
        validate_meta_desc(c["meta_description"], slug)

        # POST to HubSpot
        page_id, resp = post_page(payload, slug)
        results[slug] = page_id

        # Save locally
        content_path = os.path.join(CONTENT_DIR, f"{slug}.json")
        # Build a content JSON similar to japan.json
        content_json = {
            "meta": {
                "title": f"DALP for {c['name']}",
                "name": c["page_name"],
                "slug": f"for/{slug}",
                "html_title": c["html_title"],
                "meta_description": c["meta_description"],
                "canonical_url": f"https://www.settlemint.com/for/{slug}",
                "hubspot_page_id": page_id
            },
            "hero": {
                "eyebrow": f"DALP for {c['name']}",
                "h1": c["hero_h1"],
                "intro": c["hero_intro"],
                "cta_text": "See DALP in Action",
                "cta_href": "/demo"
            },
            "table": {
                "eyebrow": "Platform Fit",
                "heading": c["table_heading"],
                "rows": [{"need": left, "dalp": right} for left, right in c["table_rows"]]
            },
            "reasons": {
                "eyebrow": "Why Choose DALP",
                "heading": c["reasons_heading"],
                "intro": c["reasons_intro"],
                "cards": [{"title": t, "body": b} for t, b in c["cards"]]
            },
            "differentiators": {
                "eyebrow": "Platform Capabilities",
                "heading": c["diff_heading"],
                "items": c["diff_items"]
            },
            "cta": {
                "h2": c["cta_h2"],
                "body": c["cta_body"],
                "button_text": "Book a Demo",
                "button_href": "/request-a-demo"
            },
            "faq": {
                "items": [{"q": q, "a": a} for q, a in c["faq"]]
            }
        }
        with open(content_path, "w") as f:
            json.dump(content_json, f, indent=2)
        print(f"  Saved: {content_path}")

        # Rate limit: wait between requests
        if i < len(COUNTRIES) - 1:
            time.sleep(2)

    # Print summary
    print("\n" + "="*60)
    print("RESULTS SUMMARY")
    print("="*60)
    for slug, page_id in results.items():
        status = f"Page ID: {page_id}" if page_id else "FAILED"
        print(f"  {slug}: {status}")

    # Output for registry update
    print("\n\nREGISTRY UPDATE LINES:")
    for c in COUNTRIES:
        slug = c["slug"]
        pid = results.get(slug, "UNKNOWN")
        print(f"| {slug} | DALP for {c['name']} | P2 | {pid} | published | Built {time.strftime('%Y-%m-%d')} |")

if __name__ == "__main__":
    main()
