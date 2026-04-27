#!/usr/bin/env python3
"""Generate a showcase config with all 100 recipes, each with sample DALP content."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = ROOT / "blank-recipes" / "CATALOG.json"

with open(CATALOG_PATH) as f:
    cat = json.load(f)
recipes = cat["recipes"]

# Sample content generators per field pattern
SAMPLE = {
    # architecture-stack
    "architecture-stack": {
        "layer1_title": "Operations & UI", "layer1_body": "Asset Designer, Compliance Dashboard, Monitoring Console, Portfolio Views",
        "layer2_title": "Platform Services", "layer2_body": "Token Lifecycle Engine, Compliance Rule Engine, OnchainID, Event Streaming",
        "layer3_title": "Integration Layer", "layer3_body": "REST APIs, Custody Connectors, Collateral Management, XVP Settlement",
        "layer4_title": "Smart Contracts", "layer4_body": "ERC-3643 tokens, 13 SMART extensions, Compliance Modules, Identity Claims",
        "layer5_title": "Blockchain Networks", "layer5_body": "Hyperledger Besu, Ethereum, Polygon, Avalanche, any EVM chain",
    },
    "process-flow": {
        "step1_number": "01", "step1_title": "Configure", "step1_body": "Define asset type, compliance rules, and token parameters",
        "step2_number": "02", "step2_title": "Deploy", "step2_body": "Deploy contracts and identity registry to your EVM network",
        "step3_number": "03", "step3_title": "Operate", "step3_body": "Onboard investors, execute issuance, enforce restrictions",
        "step4_number": "04", "step4_title": "Scale", "step4_body": "Add asset classes, connect custodians, expand networks",
    },
    "stat-callouts": {
        "stat1_number": "7", "stat1_label": "Asset Types", "stat1_body": "Bonds, deposits, stablecoins, equity, funds, real estate, metals",
        "stat2_number": "13", "stat2_label": "SMART Extensions", "stat2_body": "Custody, collateral, yield, governance, pausable modules",
        "stat3_number": "7", "stat3_label": "Add-ons", "stat3_body": "XVP settlement, token sale, vesting, vault, yield schedule",
    },
    "comparison-columns": {
        "left_title": "Traditional", "left_body": "Manual compliance checks\n\n12-18 month builds\n\nSiloed systems\n\nManual corporate actions\n\nFragmented audit trails",
        "right_title": "With DALP", "right_body": "On-chain compliance enforcement\n\nWeeks to deployment\n\nSingle integrated platform\n\nAutomated processing\n\nImmutable audit trail",
    },
    "timeline-horizontal": {
        "milestone1_date": "Week 1-2", "milestone1_title": "Discovery", "milestone1_body": "Requirements and compliance framework",
        "milestone2_date": "Week 3-4", "milestone2_title": "Configure", "milestone2_body": "Template selection and rules setup",
        "milestone3_date": "Week 5-6", "milestone3_title": "Testing", "milestone3_body": "Integration and compliance validation",
        "milestone4_date": "Week 7-8", "milestone4_title": "Go-Live", "milestone4_body": "Production deploy and onboarding",
    },
    "icon-text-grid": {
        "item1_title": "Compliance First", "item1_body": "ERC-3643 modules validate eligibility before execution",
        "item2_title": "Identity Mgmt", "item2_body": "OnchainID provides KYC/AML attestation with reusable claims",
        "item3_title": "Custody Controls", "item3_body": "ISMARTCustodian handles forced transfers and freeze/unfreeze",
        "item4_title": "Corporate Actions", "item4_body": "Automated coupons, dividends, redemptions, fee collection",
        "item5_title": "Multi-Chain", "item5_body": "Deploy to Besu, Ethereum, Polygon, Avalanche from one interface",
        "item6_title": "Observability", "item6_body": "Metrics, logs, traces with pre-built Grafana dashboards",
    },
    "big-number-hero": {
        "stat1_number": "7", "stat1_label": "Asset Types Supported", "stat1_body": "Bonds, deposits, stablecoins, equity, funds, real estate, and precious metals. All on one platform.",
    },
    "hero-statement": {
        "msg1_text": "One platform for the entire digital asset lifecycle", "msg1_subtext": "From configuration to redemption, DALP handles issuance, compliance, custody, and servicing.",
    },
    "quote-callout": {
        "quote1_text": "DALP gave us a governed path from product design to live issuance, with compliance built into every transaction.", "quote1_attribution": "Head of Digital Assets, European Bank",
    },
    "three-pillars": {
        "pillar1_title": "Compliance First", "pillar1_body": "Every token enforces transfer restrictions before execution. ERC-3643 compliance modules validate investor eligibility at the contract level.",
        "pillar2_title": "Full Lifecycle", "pillar2_body": "One platform covers asset design, deployment, onboarding, issuance, transfers, corporate actions, and decommissioning.",
        "pillar3_title": "Multi-Asset", "pillar3_body": "Seven asset types share a common compliance layer while each maintains domain-specific logic and lifecycle behaviors.",
    },
    "vertical-process-4": {
        "step1_number": "1", "step1_title": "Asset Design", "step1_body": "Configure token parameters, compliance rules, and permissions via the Asset Designer",
        "step2_number": "2", "step2_title": "Smart Contract Deploy", "step2_body": "Deploy ERC-3643 contracts with identity registry and compliance modules",
        "step3_number": "3", "step3_title": "Investor Onboarding", "step3_body": "Verify identities via OnchainID, issue reusable KYC claims",
        "step4_number": "4", "step4_title": "Lifecycle Management", "step4_body": "Process corporate actions, distributions, transfers, and redemptions continuously",
    },
    "pros-cons": {
        "left_title": "Advantages", "left_body": "Compliance embedded at contract level\n\nSeven asset types on one platform\n\nDeploy in weeks not months\n\nFull audit trail on-chain\n\nWhite-label deployment",
        "right_title": "Considerations", "right_body": "EVM chains only (no non-EVM support)\n\nRequires OnchainID for identity\n\nInitial compliance configuration needed\n\nBlockchain expertise for self-hosting\n\nIntegration effort for legacy systems",
    },
    "pyramid-3": {
        "level1_text": "Infrastructure: Blockchain Networks, Key Management, Custody Abstraction",
        "level2_text": "Platform Services: Compliance Engine, Identity, Lifecycle Management",
        "level3_text": "Operations: Asset Designer, Dashboard, Monitoring",
    },
    "before-after-numbers": {
        "before_label": "BEFORE DALP", "before_number": "18mo", "before_body": "Average time to build custom blockchain infrastructure for digital asset operations",
        "after_label": "WITH DALP", "after_number": "<8wk", "after_body": "From configuration to production deployment with full compliance and custody",
    },
    "four-quadrants": {
        "q1_title": "High Impact, Quick Win", "q1_body": "Tokenized deposits with existing custody integration",
        "q2_title": "High Impact, Long Term", "q2_body": "Multi-asset platform across jurisdictions",
        "q3_title": "Low Impact, Quick Win", "q3_body": "Internal proof of concept with test tokens",
        "q4_title": "Low Impact, Long Term", "q4_body": "Custom compliance module development",
    },
    "numbered-checklist-6": {
        "item1_number": "1", "item1_title": "Legal Framework", "item1_body": "Establish regulatory approval for token issuance",
        "item2_number": "2", "item2_title": "Token Parameters", "item2_body": "Define asset type, compliance rules, permissions",
        "item3_number": "3", "item3_title": "KYC/KYB Integration", "item3_body": "Connect identity verification provider",
        "item4_number": "4", "item4_title": "Custody Setup", "item4_body": "Configure custodian connection via ISMARTCustodian",
        "item5_number": "5", "item5_title": "Compliance Rules", "item5_body": "Set up transfer restrictions and eligibility",
        "item6_number": "6", "item6_title": "Go-Live", "item6_body": "Deploy contracts and begin investor onboarding",
    },
    "definition-list-4": {
        "def1_term": "ERC-3643", "def1_definition": "Permissioned token standard with embedded compliance. Every transfer is validated against identity claims and policy modules before execution.",
        "def2_term": "OnchainID", "def2_definition": "On-chain identity framework providing cryptographic attestation for KYC, AML, and investor classification with reusable claims.",
        "def3_term": "ISMARTCustodian", "def3_definition": "Smart contract extension enabling forced transfers, address freezing, and wallet recovery for regulatory and compliance scenarios.",
        "def4_term": "XVP Settlement", "def4_definition": "Cross-venue payment and delivery-versus-payment atomic settlement using hash time-locked contracts (HTLCs).",
    },
    "metric-dashboard": {
        "metric1_number": "2,847", "metric1_label": "Active Tokens", "metric1_body": "Across all deployed asset classes",
        "metric2_number": "99.9%", "metric2_label": "Uptime", "metric2_body": "Platform availability SLA",
        "metric3_number": "384", "metric3_label": "Verifications", "metric3_body": "Active identity claims managed",
        "metric4_number": "12", "metric4_label": "Networks", "metric4_body": "Supported blockchain deployments",
    },
    "kpi-row-4": {
        "kpi1_number": "7", "kpi1_label": "Asset Types", "kpi1_body": "Full lifecycle support for each",
        "kpi2_number": "13", "kpi2_label": "Extensions", "kpi2_body": "Composable SMART modules",
        "kpi3_number": "<8wk", "kpi3_label": "Deploy Time", "kpi3_body": "Configuration to production",
        "kpi4_number": "5", "kpi4_label": "Roles", "kpi4_body": "RBAC access control levels",
    },
    "funnel-4": {
        "stage1_text": "Asset Design: Configure token parameters, compliance, and permissions",
        "stage2_text": "Smart Contract Deployment: Deploy to EVM network",
        "stage3_text": "Investor Onboarding: KYC/AML via OnchainID",
        "stage4_text": "Live Operations: Issuance and servicing",
    },
    "donut-stats-3": {
        "stat1_number": "92%", "stat1_label": "Compliance Rate", "stat1_body": "Automated regulatory checks",
        "stat2_number": "7", "stat2_label": "Asset Classes", "stat2_body": "Supported out of the box",
        "stat3_number": "24/7", "stat3_label": "Monitoring", "stat3_body": "Full-stack observability",
    },
    "data-highlight-2": {
        "data1_number": "13", "data1_label": "SMART Extensions", "data1_body": "Composable modules for custody, collateral, yield, governance, and more",
        "data2_number": "7", "data2_label": "Platform Add-ons", "data2_body": "XVP settlement, token sale, airdrop, yield schedule, and vault",
    },
    "process-5": {
        "step1_number": "01", "step1_title": "Design", "step1_body": "Configure asset in the Asset Designer",
        "step2_number": "02", "step2_title": "Deploy", "step2_body": "Smart contract to EVM chain",
        "step3_number": "03", "step3_title": "Onboard", "step3_body": "Verify investors via OnchainID",
        "step4_number": "04", "step4_title": "Issue", "step4_body": "Mint and distribute tokens",
        "step5_number": "05", "step5_title": "Service", "step5_body": "Corporate actions and reporting",
    },
    "chevron-flow-4": {
        "step1_title": "Configure", "step1_body": "Asset parameters and compliance",
        "step2_title": "Deploy", "step2_body": "Contracts to EVM network",
        "step3_title": "Operate", "step3_body": "Issuance and servicing",
        "step4_title": "Scale", "step4_body": "New assets and networks",
    },
    "chevron-flow-5": {
        "step1_title": "Design", "step1_body": "Token config",
        "step2_title": "Deploy", "step2_body": "EVM chain",
        "step3_title": "Onboard", "step3_body": "KYC/AML",
        "step4_title": "Issue", "step4_body": "Mint tokens",
        "step5_title": "Manage", "step5_body": "Lifecycle ops",
    },
    "swimlane-2": {
        "lane1_title": "Issuer", "lane2_title": "Investor",
        "lane1_step1_title": "Design Asset", "lane1_step1_body": "Configure token parameters in Asset Designer",
        "lane1_step2_title": "Deploy", "lane1_step2_body": "Deploy contracts to blockchain",
        "lane1_step3_title": "Distribute", "lane1_step3_body": "Mint and allocate tokens",
        "lane2_step1_title": "Onboard", "lane2_step1_body": "Complete KYC via OnchainID",
        "lane2_step2_title": "Subscribe", "lane2_step2_body": "Purchase tokens",
        "lane2_step3_title": "Hold/Trade", "lane2_step3_body": "Transfer or redeem",
    },
    "input-output": {
        "input_label": "INPUT", "input_title": "Requirements", "input_body": "Asset type, compliance framework, jurisdiction, custody provider",
        "process_label": "PROCESS", "process_title": "DALP Platform", "process_body": "Configure, deploy, validate, and activate digital asset operations",
        "output_label": "OUTPUT", "output_title": "Live Operations", "output_body": "Compliant tokens, investor onboarding, lifecycle management, reporting",
    },
    "phased-rollout-3": {
        "phase1_title": "Phase 1: Foundation", "phase1_body": "Deploy DALP platform\nConfigure first asset type\nIntegrate custody provider\nSet up compliance rules\nOnboard pilot investors",
        "phase2_title": "Phase 2: Expansion", "phase2_body": "Add asset types\nConnect additional networks\nExpand compliance coverage\nIntegrate core banking\nScale investor base",
        "phase3_title": "Phase 3: Maturity", "phase3_body": "Full multi-asset operations\nCross-venue settlement (XVP)\nAdvanced analytics\nAutomated reporting\nWhite-label portals",
    },
    "circular-process-4": {
        "step1_text": "1. Configure: Asset parameters and compliance rules",
        "step2_text": "2. Deploy: Smart contracts to EVM network",
        "step3_text": "3. Operate: Issuance, transfers, corporate actions",
        "step4_text": "4. Monitor: Compliance, performance, audit trail",
    },
    "numbered-checklist-8": {
        "item1_number": "1", "item1_title": "Legal Framework", "item1_body": "Regulatory approval",
        "item2_number": "2", "item2_title": "Token Design", "item2_body": "Asset parameters",
        "item3_number": "3", "item3_title": "KYC/KYB", "item3_body": "Identity provider",
        "item4_number": "4", "item4_title": "Compliance", "item4_body": "Rules configuration",
        "item5_number": "5", "item5_title": "Custody", "item5_body": "Provider connection",
        "item6_number": "6", "item6_title": "Testing", "item6_body": "Integration tests",
        "item7_number": "7", "item7_title": "Audit", "item7_body": "Security review",
        "item8_number": "8", "item8_title": "Go-Live", "item8_body": "Production deploy",
    },
    "comparison-3col": {
        "col1_title": "Self-Build", "col1_body": "12-18 months\nFull engineering team\nCustom per asset\nOngoing maintenance\nNo compliance built-in",
        "col2_title": "Basic Platform", "col2_body": "2-4 months\nLimited asset types\nBasic compliance\nSingle chain only\nNo lifecycle mgmt",
        "col3_title": "DALP", "col3_body": "4-8 weeks\n7 asset types\nFull compliance\nMulti-chain native\nComplete lifecycle",
    },
    "tier-comparison-3": {
        "tier1_name": "Starter", "tier1_price": "Contact Us", "tier1_features": "1 asset type\nSingle network\nBasic compliance\nCloud hosted\nStandard support",
        "tier2_name": "Professional", "tier2_price": "Contact Us", "tier2_features": "3 asset types\nMulti-network\nFull compliance suite\nCloud or hybrid\nPriority support\nAPI access",
        "tier3_name": "Enterprise", "tier3_price": "Contact Us", "tier3_features": "All 7 asset types\nUnlimited networks\nCustom compliance\nSelf-hosted option\nDedicated support\nFull API + SDK\nWhite-label",
    },
    "feature-matrix-4x4": {
        **{f"cell{i}_text": v for i, v in enumerate([
            "Feature", "Bonds", "Stablecoins", "Equity",
            "Compliance", "ERC-3643", "ISMARTCollateral", "ERC-3643",
            "Custody", "ISMARTCustodian", "ISMARTCustodian", "ISMARTCustodian",
            "Governance", "N/A", "N/A", "IVotes (ERC-5805)",
        ], 1)}
    },
    "vs-split": {
        "left_title": "Before DALP", "left_body": "Manual compliance\nCustom builds\nSiloed systems\nSlow deployment\nFragmented data",
        "vs_text": "VS",
        "right_title": "After DALP", "right_body": "Automated compliance\nPre-built templates\nUnified platform\nWeeks to production\nOn-chain audit trail",
    },
    "spectrum-scale-5": {
        "point1_label": "Level 1", "point1_body": "Exploring tokenization",
        "point2_label": "Level 2", "point2_body": "Running pilots",
        "point3_label": "Level 3", "point3_body": "First production asset",
        "point4_label": "Level 4", "point4_body": "Multi-asset operations",
        "point5_label": "Level 5", "point5_body": "Full lifecycle at scale",
    },
    "pyramid-4": {
        "level1_text": "Infrastructure: Blockchain, Key Management, Persistence, Caching",
        "level2_text": "Services: Identity, Transfer Validation, Distribution, Audit",
        "level3_text": "Platform: Asset Engine, Compliance, Corporate Actions",
        "level4_text": "Operations: Dashboard, Monitoring, Reporting",
    },
    "hub-spoke-4": {
        "hub_text": "DALP\nPlatform",
        "spoke1_text": "Asset Design & Issuance",
        "spoke2_text": "Compliance & Identity",
        "spoke3_text": "Settlement & Custody",
        "spoke4_text": "Monitoring & Reporting",
    },
    "hub-spoke-6": {
        "hub_text": "DALP\nCore",
        "spoke1_text": "Asset Designer",
        "spoke2_text": "Compliance Engine",
        "spoke3_text": "Identity (OnchainID)",
        "spoke4_text": "Custody Integration",
        "spoke5_text": "Settlement (XVP)",
        "spoke6_text": "Monitoring & Alerts",
    },
    "modular-blocks-6": {
        "block1_title": "Asset Engine", "block1_body": "7 asset types with configurable parameters",
        "block2_title": "Compliance", "block2_body": "ERC-3643 modules for transfer restrictions",
        "block3_title": "Identity", "block3_body": "OnchainID with reusable KYC claims",
        "block4_title": "Custody", "block4_body": "ISMARTCustodian for custody operations",
        "block5_title": "Settlement", "block5_body": "XVP for atomic DvP settlement",
        "block6_title": "Observability", "block6_body": "Metrics, logs, traces, dashboards",
    },
    "ecosystem-3x2": {
        "comp1_title": "Smart Contracts", "comp1_body": "ERC-3643 tokens with 13 SMART extensions",
        "comp2_title": "Platform API", "comp2_body": "REST endpoints for all operations",
        "comp3_title": "Admin Dashboard", "comp3_body": "Portfolio, compliance, monitoring views",
        "comp4_title": "Identity Layer", "comp4_body": "OnchainID claims and trusted issuers",
        "comp5_title": "Integration", "comp5_body": "Custody, banking, and reporting connectors",
        "comp6_title": "Infrastructure", "comp6_body": "Multi-chain deployment with HA configs",
    },
    "onion-3": {
        "outer_title": "Blockchain Infrastructure",
        "middle_title": "DALP Platform Services",
        "inner_title": "Asset Lifecycle Engine",
        "inner_body": "Configuration, issuance, compliance enforcement, corporate actions, redemption, and reporting. All governed by ERC-3643 identity and policy modules.",
    },
    "dependency-chain-4": {
        "dep1_title": "Identity", "dep1_body": "OnchainID verification, KYC claims, trusted issuers, investor classification",
        "dep2_title": "Compliance", "dep2_body": "Transfer restrictions, eligibility rules, jurisdiction controls, holding limits",
        "dep3_title": "Asset Lifecycle", "dep3_body": "Issuance, transfers, corporate actions, distributions, redemptions",
        "dep4_title": "Reporting", "dep4_body": "Regulatory reports, audit trails, compliance evidence, real-time dashboards",
    },
    "timeline-h-5": {
        "milestone1_date": "Q1", "milestone1_title": "Foundation", "milestone1_body": "Platform setup and first asset",
        "milestone2_date": "Q2", "milestone2_title": "Expansion", "milestone2_body": "Add asset types",
        "milestone3_date": "Q3", "milestone3_title": "Integration", "milestone3_body": "Core banking connect",
        "milestone4_date": "Q4", "milestone4_title": "Scale", "milestone4_body": "Multi-jurisdiction",
        "milestone5_date": "Q5", "milestone5_title": "Maturity", "milestone5_body": "Full operations",
    },
    "timeline-vertical-4": {
        "milestone1_date": "Week 1-2", "milestone1_title": "Discovery", "milestone1_body": "Requirements gathering and compliance framework selection",
        "milestone2_date": "Week 3-4", "milestone2_title": "Configuration", "milestone2_body": "Smart contract templates, compliance rules, identity setup",
        "milestone3_date": "Week 5-6", "milestone3_title": "Testing", "milestone3_body": "End-to-end integration testing and security audit",
        "milestone4_date": "Week 7-8", "milestone4_title": "Go-Live", "milestone4_body": "Production deployment and investor onboarding activation",
    },
    "timeline-vertical-5": {
        "milestone1_date": "Week 1", "milestone1_title": "Discovery", "milestone1_body": "Requirements and scope",
        "milestone2_date": "Week 2-3", "milestone2_title": "Config", "milestone2_body": "Templates and rules",
        "milestone3_date": "Week 4", "milestone3_title": "Integrate", "milestone3_body": "Custody and banking",
        "milestone4_date": "Week 5-6", "milestone4_title": "Test", "milestone4_body": "Validation and audit",
        "milestone5_date": "Week 7-8", "milestone5_title": "Launch", "milestone5_body": "Production deploy",
    },
    "quarterly-roadmap-4": {
        "q1_label": "Q1 2026", "q1_items": "Platform deployment\nFirst asset configuration\nCustody integration\nCompliance rule setup",
        "q2_label": "Q2 2026", "q2_items": "Add 3 asset types\nCore banking integration\nInvestor portal launch\nRegulatory reporting",
        "q3_label": "Q3 2026", "q3_items": "Cross-chain deployment\nXVP settlement go-live\nWhite-label portal\nAdvanced analytics",
        "q4_label": "Q4 2026", "q4_items": "Multi-jurisdiction\nNew compliance packs\nAutomated distributions\nFull lifecycle ops",
    },
    "phase-gate-3": {
        "phase1_title": "Phase 1: Foundation", "phase1_body": "Deploy DALP platform\nConfigure first asset type\nIntegrate custody provider\nSet up compliance rules",
        "phase2_title": "Phase 2: Expansion", "phase2_body": "Add asset types\nConnect additional networks\nIntegrate core banking\nScale investor base",
        "phase3_title": "Phase 3: Maturity", "phase3_body": "Full multi-asset operations\nCross-venue settlement\nAdvanced analytics\nAutomated reporting",
    },
    "phase-gate-4": {
        "phase1_title": "Discover", "phase1_body": "Requirements\nCompliance mapping\nArchitecture review",
        "phase2_title": "Configure", "phase2_body": "Templates\nRules\nIdentity setup",
        "phase3_title": "Validate", "phase3_body": "Integration tests\nSecurity audit\nCompliance check",
        "phase4_title": "Launch", "phase4_body": "Production deploy\nOnboarding\nMonitoring",
    },
    "journey-5": {
        "stage1_number": "1", "stage1_title": "Awareness", "stage1_body": "Institution discovers DALP platform capabilities",
        "stage2_number": "2", "stage2_title": "Evaluation", "stage2_body": "Technical assessment and compliance review",
        "stage3_number": "3", "stage3_title": "Pilot", "stage3_body": "First asset type deployed in test environment",
        "stage4_number": "4", "stage4_title": "Production", "stage4_body": "Live deployment with real investors",
        "stage5_number": "5", "stage5_title": "Scale", "stage5_body": "Multi-asset, multi-jurisdiction operations",
    },
    "maturity-model-5": {
        "level1_text": "L1\nExploring",
        "level2_text": "L2\nPiloting",
        "level3_text": "L3\nOperating",
        "level4_text": "L4\nScaling",
        "level5_text": "L5\nLeading",
    },
    "grid-3x1": {
        "card1_title": "Bonds", "card1_body": "Maturity dates, coupon schedules, redemption logic. Automated yield distribution with ISMARTYield and ISMARTRedeemable extensions.",
        "card2_title": "Stablecoins", "card2_body": "Collateral ratio enforcement via ISMARTCollateral. Reserve monitoring, AML checks on every transfer.",
        "card3_title": "Equity", "card3_body": "Dividend distribution, on-chain governance via IVotes (ERC-5805). Shareholder vote delegation and checkpointing.",
    },
    "grid-4x1": {
        "card1_title": "Configure", "card1_body": "Select asset type and define parameters in the Asset Designer",
        "card2_title": "Deploy", "card2_body": "Deploy contracts to your chosen EVM network",
        "card3_title": "Operate", "card3_body": "Manage issuance, transfers, and corporate actions",
        "card4_title": "Monitor", "card4_body": "Track compliance, performance, and audit trails",
    },
    "feature-cards-4": {
        "feat1_title": "Compliance", "feat1_body": "ERC-3643 compliance modules\nInvestor eligibility\nTransfer restrictions\nJurisdiction rules",
        "feat2_title": "Identity", "feat2_body": "OnchainID framework\nKYC/AML attestation\nReusable claims\nTrusted issuers",
        "feat3_title": "Custody", "feat3_body": "ISMARTCustodian\nForced transfers\nFreeze/unfreeze\nWallet recovery",
        "feat4_title": "Settlement", "feat4_body": "XVP settlement\nAtomic DvP\nCross-venue\nHTLC-based",
    },
    "benefit-grid-3": {
        "benefit1_title": "Speed to Market", "benefit1_body": "Deploy compliant digital asset operations in weeks, not months. Pre-built templates eliminate custom blockchain development.",
        "benefit2_title": "Compliance Built In", "benefit2_body": "ERC-3643 modules validate every transfer before execution. No separate compliance layer needed.",
        "benefit3_title": "Multi-Asset Scale", "benefit3_body": "Start with one asset type, expand to all seven without re-platforming. Same compliance and identity layer across all.",
    },
    "profile-cards-3": {
        "person1_initials": "CTO", "person1_name": "Chief Technology", "person1_role": "Architecture decisions", "person1_body": "Evaluates DALP architecture, EVM compatibility, and integration patterns",
        "person2_initials": "CCO", "person2_name": "Chief Compliance", "person2_role": "Regulatory oversight", "person2_body": "Reviews ERC-3643 compliance modules and jurisdictional rule packs",
        "person3_initials": "COO", "person3_name": "Chief Operations", "person3_role": "Operational readiness", "person3_body": "Assesses lifecycle workflows, custody integration, and deployment model",
    },
    "profile-cards-4": {
        "person1_initials": "CT", "person1_name": "CTO", "person1_role": "Technology", "person1_body": "Architecture and integration",
        "person2_initials": "CC", "person2_name": "CCO", "person2_role": "Compliance", "person2_body": "Regulatory and governance",
        "person3_initials": "CO", "person3_name": "COO", "person3_role": "Operations", "person3_body": "Workflows and processes",
        "person4_initials": "CF", "person4_name": "CFO", "person4_role": "Finance", "person4_body": "ROI and cost analysis",
    },
    "checklist-2col": {
        **{f"check{i}_mark": "✓" for i in range(1, 11)},
        "check1_text": "ERC-3643 compliance modules configured",
        "check2_text": "OnchainID identity provider integrated",
        "check3_text": "Custody provider connected",
        "check4_text": "Transfer restriction rules defined",
        "check5_text": "Investor eligibility criteria set",
        "check6_text": "Maker-checker workflows enabled",
        "check7_text": "Regulatory reporting templates loaded",
        "check8_text": "Monitoring dashboards configured",
        "check9_text": "Security audit completed",
        "check10_text": "Production deployment validated",
    },
    "priority-quadrant": {
        "x_high_label": "High Impact", "x_low_label": "Low Impact",
        "y_high_label": "Quick Win", "y_low_label": "Long Term",
        "q1_title": "Quick Win + High Impact", "q1_body": "Tokenized deposits with existing custody",
        "q2_title": "Quick Win + Low Impact", "q2_body": "Internal PoC with test tokens",
        "q3_title": "Long Term + High Impact", "q3_body": "Multi-asset cross-jurisdiction platform",
        "q4_title": "Long Term + Low Impact", "q4_body": "Custom compliance module development",
    },
    "key-message": {"message_text": "DALP: One platform for the entire digital asset lifecycle."},
    "two-point-contrast": {
        "point1_text": "Building custom blockchain infrastructure takes 12-18 months and requires a dedicated engineering team.",
        "point2_text": "DALP deploys compliant digital asset operations in weeks with pre-built templates and SMART extensions.",
    },
    "agenda-list-5": {
        "agenda1_number": "01", "agenda1_text": "Platform Overview: Architecture and capabilities",
        "agenda2_number": "02", "agenda2_text": "Asset Lifecycle: From configuration to redemption",
        "agenda3_number": "03", "agenda3_text": "Compliance Framework: ERC-3643 and policy modules",
        "agenda4_number": "04", "agenda4_text": "Deployment Options: Cloud, hybrid, self-hosted",
        "agenda5_number": "05", "agenda5_text": "Next Steps: Pilot program and technical workshop",
    },
    "agenda-list-7": {
        "agenda1_number": "01", "agenda1_text": "Introduction and context",
        "agenda2_number": "02", "agenda2_text": "DALP platform overview",
        "agenda3_number": "03", "agenda3_text": "Asset types and lifecycle",
        "agenda4_number": "04", "agenda4_text": "Compliance and identity",
        "agenda5_number": "05", "agenda5_text": "Technical architecture",
        "agenda6_number": "06", "agenda6_text": "Deployment and integration",
        "agenda7_number": "07", "agenda7_text": "Next steps and Q&A",
    },
    "faq-pairs-3": {
        "faq1_question": "What blockchain networks does DALP support?",
        "faq1_answer": "DALP deploys on any EVM-compatible chain: Hyperledger Besu, Ethereum, Polygon, Avalanche, and private networks.",
        "faq2_question": "How long does deployment take?",
        "faq2_answer": "Standard deployment takes 4-8 weeks from configuration to production, including compliance setup and integration testing.",
        "faq3_question": "Can we use our existing custody provider?",
        "faq3_answer": "Yes. DALP integrates with custody providers through the ISMARTCustodian extension and standard API connectors.",
    },
    "highlight-box": {
        "highlight_title": "Key Takeaway",
        "highlight_body": "DALP is the only platform that covers the entire digital asset lifecycle from asset design through compliance, issuance, servicing, and redemption on a single control plane. Seven asset types, 13 composable extensions, and pre-built compliance modules for MiCA, MAS, VARA, SEC, and FCA jurisdictions.",
    },
    "executive-summary": {
        "para1_text": "SettleMint's DALP provides institutions with complete infrastructure for tokenizing, issuing, and managing digital assets across the full lifecycle. The platform serves as a unified operational layer connecting asset originators, compliance teams, custodians, and investors.",
        "para2_text": "Built on ERC-3643 with 13 composable SMART extensions, DALP supports seven asset types: bonds, deposits, stablecoins, equity, funds, real estate, and precious metals. Each asset type ships with built-in compliance rules, identity verification, and operational tooling.",
        "para3_text": "Institutions deploy to production in weeks using pre-built templates. The platform handles compliance enforcement, investor management, corporate action processing, and regulatory reporting across jurisdictions through a single interface with role-based access control.",
    },
    "pullquote-attribution": {
        "quote_mark": "\u201c",
        "quote_text": "DALP transformed our digital asset operations from a 14-month custom build into a governed, repeatable process that went live in 6 weeks.",
        "author_name": "Head of Digital Innovation",
        "author_role": "European Financial Institution",
    },
    "four-quadrants-labeled": {
        "q1_text": "High Priority\nHigh Effort\n\nMulti-asset platform",
        "q2_text": "High Priority\nLow Effort\n\nFirst token issuance",
        "q3_text": "Low Priority\nHigh Effort\n\nCustom compliance",
        "q4_text": "Low Priority\nLow Effort\n\nInternal PoC",
    },
    "step-ladder-4": {
        "step1_text": "Step 1\nExplore\nTokenization",
        "step2_text": "Step 2\nPilot\nFirst Asset",
        "step3_text": "Step 3\nScale\nMulti-Asset",
        "step4_text": "Step 4\nLead\nFull Operations",
    },
    "bridge-diagram": {
        "current_label": "CURRENT STATE", "current_title": "Manual Processes", "current_body": "Spreadsheet tracking\nManual compliance\nSiloed systems\nSlow settlement",
        "bridge_text": "DALP\nPlatform",
        "future_label": "FUTURE STATE", "future_title": "Digital Operations", "future_body": "On-chain automation\nBuilt-in compliance\nUnified platform\nInstant settlement",
    },
    "icon-highlight-3": {
        "item1_title": "Compliance First", "item1_body": "Every transfer validated against jurisdictional requirements before execution. ERC-3643 modules enforce eligibility, restrictions, and holding limits automatically.",
        "item2_title": "Full Lifecycle", "item2_body": "One platform handles design, deployment, onboarding, issuance, transfers, corporate actions, reporting, and decommissioning.",
        "item3_title": "Multi-Asset", "item3_body": "Seven asset types share a common compliance and identity layer. Start with bonds, expand to deposits, stablecoins, equity without re-platforming.",
    },
    "icon-highlight-4": {
        "item1_title": "Bonds", "item1_body": "Maturity, coupons, redemption with ISMARTYield",
        "item2_title": "Stablecoins", "item2_body": "Collateral enforcement via ISMARTCollateral",
        "item3_title": "Equity", "item3_body": "Governance with IVotes (ERC-5805)",
        "item4_title": "Real Estate", "item4_body": "Fractional ownership, pre-mint model",
    },
    "banner-cta": {
        "cta_headline": "Ready to tokenize your assets?",
        "cta_subtext": "Contact SettleMint to discuss a pilot program for your digital asset operations.",
    },
    "logo-grid-6": {
        "logo1_name": "Bonds", "logo2_name": "Deposits", "logo3_name": "Stablecoins",
        "logo4_name": "Equity", "logo5_name": "Funds", "logo6_name": "Real Estate",
    },
    "risk-matrix-3x3": {
        **{f"cell{i}_text": v for i, v in enumerate([
            "Low Risk\nLow Impact", "Low Risk\nMed Impact", "Low Risk\nHigh Impact",
            "Med Risk\nLow Impact", "Med Risk\nMed Impact", "Med Risk\nHigh Impact",
            "High Risk\nLow Impact", "High Risk\nMed Impact", "High Risk\nHigh Impact",
        ], 1)}
    },
    "capability-matrix-3x3": {
        **{f"cap{i}_title": t for i, t in enumerate(["Issuance", "Transfer", "Redemption", "Compliance", "Custody", "Settlement", "Reporting", "Identity", "Monitoring"], 1)},
        **{f"cap{i}_body": b for i, b in enumerate(["Mint tokens via templates", "Pre-validated transfers", "Maturity processing", "ERC-3643 modules", "ISMARTCustodian", "XVP atomic DvP", "Regulatory reports", "OnchainID claims", "Grafana dashboards"], 1)},
    },
    "stakeholder-map-4": {
        "group1_title": "Technology", "group1_body": "CTO, Engineering: Architecture, integration, deployment model",
        "group2_title": "Compliance", "group2_body": "CCO, Legal: Regulatory coverage, audit trail, jurisdiction rules",
        "group3_title": "Operations", "group3_body": "COO, Ops: Workflows, custody, lifecycle management",
        "group4_title": "Business", "group4_body": "CEO, Product: ROI, market opportunity, competitive advantage",
    },
    "venn-2": {
        "left_text": "Traditional\nFinance", "right_text": "Blockchain\nTechnology", "overlap_text": "DALP",
    },
    "venn-3": {
        "circle1_text": "Compliance", "circle2_text": "Technology", "circle3_text": "Operations",
    },
    "concentric-3": {
        "outer_text": "Blockchain Infrastructure",
        "middle_text": "DALP Platform",
        "inner_text": "Asset Lifecycle\nEngine",
    },
    "system-context": {
        "center_text": "DALP\nPlatform",
        "ext1_text": "Investor Portal",
        "ext2_text": "Custody Providers",
        "ext3_text": "Core Banking",
        "ext4_text": "Regulatory Systems",
    },
    "integration-map-4": {
        "hub_text": "DALP\nIntegration Layer",
        "int1_text": "Custody: Fireblocks, Copper",
        "int2_text": "Identity: Onfido, Jumio",
        "int3_text": "Banking: Core Systems",
        "int4_text": "Reporting: Regulatory",
    },
    "decision-tree-2": {
        "question_text": "Does the institution have existing blockchain infrastructure?",
        "yes_label": "YES", "no_label": "NO",
        "yes_body": "Hybrid deployment:\nDALP connects to existing chain\nISMARTCustodian bridges custody\nCompliance modules added on top",
        "no_body": "Full DALP deployment:\nNew EVM network provisioned\nComplete platform setup\nEnd-to-end lifecycle management",
    },
    "pipeline-4": {
        "stage1_title": "Design", "stage1_body": "Asset configuration\nCompliance rules\nPermission setup\nToken parameters",
        "stage2_title": "Deploy", "stage2_body": "Smart contracts\nIdentity registry\nCompliance modules\nNetwork selection",
        "stage3_title": "Operate", "stage3_body": "Investor onboarding\nToken issuance\nTransfer processing\nCorporate actions",
        "stage4_title": "Monitor", "stage4_body": "Compliance tracking\nPerformance metrics\nAudit trail\nRegulatory reports",
    },
    "vertical-process-5": {
        "step1_number": "1", "step1_title": "Requirements", "step1_body": "Gather business requirements, compliance framework, and technical constraints",
        "step2_number": "2", "step2_title": "Configuration", "step2_body": "Select asset templates, configure compliance rules, set up identity providers",
        "step3_number": "3", "step3_title": "Integration", "step3_body": "Connect custody, core banking, and reporting systems via REST APIs",
        "step4_number": "4", "step4_title": "Validation", "step4_body": "End-to-end testing, security audit, compliance verification",
        "step5_number": "5", "step5_title": "Production", "step5_body": "Deploy to production, activate monitoring, begin investor onboarding",
    },
    "gantt-3": {
        "timeline_header": "Q1 2026          Q2 2026          Q3 2026          Q4 2026",
        "track1_label": "Foundation", "track1_text": "Platform setup and first asset deployment",
        "track2_label": "Expansion", "track2_text": "Multi-asset and core banking integration",
        "track3_label": "Scale", "track3_text": "Cross-jurisdiction and advanced features",
    },
    "feature-cards-6": {
        "feat1_title": "Compliance", "feat1_body": "ERC-3643 modules for transfer restrictions",
        "feat2_title": "Identity", "feat2_body": "OnchainID KYC/AML attestation",
        "feat3_title": "Custody", "feat3_body": "ISMARTCustodian operations",
        "feat4_title": "Settlement", "feat4_body": "XVP atomic DvP settlement",
        "feat5_title": "Governance", "feat5_body": "IVotes delegation (ERC-5805)",
        "feat6_title": "Yield", "feat6_body": "ISMARTYield distribution",
    },
    "rating-comparison-4": {
        "item1_name": "DALP", "item1_ratings": "Compliance: Full\nAsset Types: 7\nDeploy Time: Weeks\nLifecycle: Complete",
        "item2_name": "Custom Build", "item2_ratings": "Compliance: Manual\nAsset Types: 1\nDeploy Time: 12-18mo\nLifecycle: Partial",
        "item3_name": "Basic Platform", "item3_ratings": "Compliance: Basic\nAsset Types: 2-3\nDeploy Time: 2-4mo\nLifecycle: Limited",
        "item4_name": "No Platform", "item4_ratings": "Compliance: None\nAsset Types: 0\nDeploy Time: N/A\nLifecycle: None",
    },
    "competitive-grid-4": {
        "comp1_name": "SettleMint DALP", "comp1_body": "Full lifecycle platform\n7 asset types\nERC-3643 compliance\nMulti-chain native",
        "comp2_name": "Custom Build", "comp2_body": "Bespoke development\nSingle asset focus\nManual compliance\n12-18 month timeline",
        "comp3_name": "Basic Tokenization", "comp3_body": "Token minting only\nNo lifecycle mgmt\nNo compliance built-in\nSingle chain",
        "comp4_name": "Legacy Systems", "comp4_body": "Traditional infrastructure\nNo tokenization\nManual processes\nSiloed data",
    },
    "weighted-criteria-5": {
        "criterion1_name": "Compliance", "criterion1_score": "95%",
        "criterion2_name": "Lifecycle Coverage", "criterion2_score": "90%",
        "criterion3_name": "Multi-Chain", "criterion3_score": "85%",
        "criterion4_name": "Time to Deploy", "criterion4_score": "92%",
        "criterion5_name": "Integration", "criterion5_score": "88%",
    },
    "feature-matrix-3x5": {
        **{f"cell{i}_text": v for i, v in enumerate([
            "Bonds", "Stablecoins", "Equity",
            "ISMARTYield", "ISMARTCollateral", "IVotes",
            "ISMARTRedeemable", "ISMARTPausable", "ISMARTPausable",
            "ISMARTCapped", "ISMARTCustodian", "ISMARTCustodian",
            "ISMARTHistorical", "ISMARTBurnable", "ISMARTBurnable",
        ], 1)}
    },
    "past-present-future": {
        "past_title": "2020-2023", "past_body": "Blockchain exploration\nManual pilot projects\nCustom smart contracts\nFragmented tooling",
        "present_title": "2024-2025", "present_body": "DALP platform launch\nFirst institutional deployments\nERC-3643 compliance\n7 asset types live",
        "future_title": "2026+", "future_body": "Cross-chain operations\nGlobal jurisdiction coverage\nAI-powered compliance\nInstitutional scale",
    },
    "feature-matrix-header": {
        "col1_header": "Bonds", "col2_header": "Stablecoins", "col3_header": "Equity",
        "row1_label": "Compliance", "row1_col1": "ERC-3643", "row1_col2": "ERC-3643 + Collateral", "row1_col3": "ERC-3643",
        "row2_label": "Custody", "row2_col1": "ISMARTCustodian", "row2_col2": "ISMARTCustodian", "row2_col3": "ISMARTCustodian",
        "row3_label": "Special", "row3_col1": "ISMARTYield", "row3_col2": "ISMARTCollateral", "row3_col3": "IVotes",
        "row4_label": "Supply", "row4_col1": "ISMARTCapped", "row4_col2": "Uncapped", "row4_col3": "Uncapped",
        "row5_label": "Burn", "row5_col1": "ISMARTBurnable", "row5_col2": "ISMARTBurnable", "row5_col3": "ISMARTBurnable",
    },
    "raci-grid": {
        "r_header": "Responsible", "a_header": "Accountable", "c_header": "Consulted", "i_header": "Informed",
        "task1_name": "Asset Design", "task1_r": "Product", "task1_a": "CTO", "task1_c": "Legal", "task1_i": "Ops",
        "task2_name": "Compliance", "task2_r": "Legal", "task2_a": "CCO", "task2_c": "Product", "task2_i": "Eng",
        "task3_name": "Deployment", "task3_r": "Engineering", "task3_a": "CTO", "task3_c": "Ops", "task3_i": "Legal",
        "task4_name": "Onboarding", "task4_r": "Ops", "task4_a": "COO", "task4_c": "Legal", "task4_i": "Product",
        "task5_name": "Monitoring", "task5_r": "Ops", "task5_a": "CTO", "task5_c": "Eng", "task5_i": "CCO",
        "task6_name": "Reporting", "task6_r": "Compliance", "task6_a": "CCO", "task6_c": "Ops", "task6_i": "CEO",
    },
    "title-only-centered": {"center_text": "Digital Asset Lifecycle Platform"},
    "stat-2": {
        "stat1_number": "<8wk", "stat1_label": "To Production", "stat1_body": "From configuration to live token issuance with full compliance",
        "stat2_number": "7", "stat2_label": "Asset Types", "stat2_body": "Bonds, deposits, stablecoins, equity, funds, real estate, precious metals",
    },
    "progress-tracker-5": {
        "step1_number": "1", "step1_title": "Discover", "step1_body": "Requirements and compliance mapping",
        "step2_number": "2", "step2_title": "Configure", "step2_body": "Templates and rules setup",
        "step3_number": "3", "step3_title": "Integrate", "step3_body": "Custody and banking connectors",
        "step4_number": "4", "step4_title": "Validate", "step4_body": "Testing and security audit",
        "step5_number": "5", "step5_title": "Launch", "step5_body": "Production and onboarding",
    },
    "metric-comparison-3": {
        "metric1_number": "<8wk", "metric1_variance": "vs 18mo custom", "metric1_label": "Deploy Time", "metric1_body": "Configuration to production",
        "metric2_number": "7", "metric2_variance": "vs 1 custom", "metric2_label": "Asset Types", "metric2_body": "Out of the box",
        "metric3_number": "13", "metric3_variance": "composable", "metric3_label": "Extensions", "metric3_body": "SMART modules",
    },
    "score-card": {
        "score_number": "95", "score_label": "Platform Readiness Score",
        "detail1_text": "Compliance: 98%", "detail2_text": "Integration: 92%", "detail3_text": "Operations: 95%",
    },
    "percentage-bar-3": {
        "bar1_label": "Compliance Coverage", "bar1_value": "95%",
        "bar2_label": "Asset Type Coverage", "bar2_value": "100%",
        "bar3_label": "Integration Ready", "bar3_value": "88%",
    },
    "growth-indicators-3": {
        "metric1_number": "847", "metric1_change": "+23%", "metric1_label": "Active Tokens", "metric1_body": "Across all deployed asset classes on the platform",
        "metric2_number": "99.9%", "metric2_change": "Stable", "metric2_label": "Uptime", "metric2_body": "Platform availability with multi-region failover",
        "metric3_number": "384", "metric3_change": "+45%", "metric3_label": "Verifications", "metric3_body": "Active identity claims managed via OnchainID",
    },
}

# Build config
slides = [
    {"bank_file": "slide-001-cover-slide.pptx", "title": "DALP Recipe Catalog: 100 Designs", "subtitle": "Complete showcase of blank slide recipes | April 2026"}
]

for recipe_name in sorted(recipes.keys()):
    # Convert kebab-case recipe name to sentence case for the slide title
    display_title = recipe_name.replace("-", " ").replace("_", " ")
    display_title = display_title[0].upper() + display_title[1:] if display_title else display_title
    slide = {"bank_file": "slide-004-blank.pptx", "title": display_title, "recipe": recipe_name}
    if recipe_name in SAMPLE:
        slide.update(SAMPLE[recipe_name])
    slides.append(slide)

slides.append({"bank_file": "slide-024-thank-you.pptx"})

config = {
    "project": "2026-04-03-recipe-catalog-showcase-100",
    "output": "output/2026-04-03-recipe-catalog-showcase-100.pptx",
    "description": "Showcase of all 100 blank slide recipes with sample DALP content",
    "slides": slides
}

outpath = ROOT / "configs" / "2026-04-03-recipe-catalog-showcase-100.json"
with open(outpath, "w") as f:
    json.dump(config, f, indent=2)

print(f"Generated config with {len(slides)} slides ({len(slides)-2} recipe slides)")
print(f"Saved to: {outpath}")
