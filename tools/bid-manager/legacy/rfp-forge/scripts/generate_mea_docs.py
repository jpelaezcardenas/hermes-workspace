from pathlib import Path
import re
import sys

SHARED_SCRIPTS_DIR = Path(__file__).resolve().parents[2] / 'shared' / 'scripts'
if str(SHARED_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SHARED_SCRIPTS_DIR))

from office_runtime_guard import append_build_metadata, assert_output_within_agent

RUNTIME_ROOT = Path(__file__).resolve().parents[3]
BASE = RUNTIME_ROOT / 'settlemint-office-agents' / 'rfp-forge' / 'output'

DATA = {
    'banks': [
        ('Emirates NBD', 'tokenized deposits/trade finance', 'United Arab Emirates', 'UAE', ['CBUAE', 'SCA', 'DFSA', 'ADGM FSMR'], ['digital dirham', 'Project Aber', 'DIFC Innovation Hub'], True),
        ('First Abu Dhabi Bank (FAB)', 'digital asset custody', 'United Arab Emirates', 'UAE', ['CBUAE', 'SCA', 'DFSA', 'ADGM FSMR'], ['digital dirham', 'Project Aber', 'ADGM digital asset framework'], False),
        ('Qatar National Bank (QNB)', 'tokenized sukuk', 'Qatar', 'Qatar', ['QCB', 'QFCRA', 'QFMA'], ['regional sukuk digitisation initiatives', 'GCC capital market modernisation'], True),
        ('Saudi National Bank (SNB)', 'tokenized fixed income', 'Saudi Arabia', 'KSA', ['SAMA', 'CMA'], ['Project Aber', 'Saudi Vision 2030 fintech strategy'], False),
        ('Al Rajhi Bank', 'Sharia-compliant tokenized products', 'Saudi Arabia', 'KSA', ['SAMA', 'CMA', 'AAOIFI'], ['Project Aber', 'Saudi Vision 2030 fintech strategy'], True),
        ('Mashreq Bank', 'digital asset payment rails', 'United Arab Emirates', 'UAE', ['CBUAE', 'SCA', 'DFSA', 'ADGM FSMR'], ['digital dirham', 'Project Aber', 'DIFC Innovation Hub'], False),
        ('Standard Bank', 'tokenized securities', 'South Africa', 'South Africa', ['FSCA', 'SARB', 'FIC'], ['Project Khokha', 'South African fintech modernisation'], False),
        ('FirstRand', 'digital bond platform', 'South Africa', 'South Africa', ['FSCA', 'SARB', 'FIC'], ['Project Khokha', 'South African capital markets digitisation'], False),
        ('Absa Group', 'tokenized trade finance', 'South Africa', 'South Africa', ['FSCA', 'SARB', 'FIC'], ['Project Khokha', 'African trade corridor digitisation'], False),
        ('National Bank of Egypt', 'digital asset infrastructure', 'Egypt', 'Egypt', ['CBE', 'FRA'], ['Egyptian financial infrastructure modernisation', 'regional CBDC research'], False),
        ('Attijariwafa Bank', 'tokenized trade finance', 'Morocco', 'Morocco', ['Bank Al-Maghrib', 'AMMC'], ['Moroccan capital market modernisation', 'AfCFTA trade digitisation'], False),
        ('Commercial International Bank (CIB)', 'tokenized fixed income', 'Egypt', 'Egypt', ['CBE', 'FRA'], ['Egyptian debt capital market digital transformation'], False),
    ],
    'fintechs': [
        ('Flutterwave', 'tokenized cross-border payments', 'Nigeria', 'Nigeria/Africa', ['CBN', 'SEC Nigeria', 'NDPC'], ['Pan-African payment infrastructure initiatives', 'African cross-border settlement modernisation'], False),
        ('M-Pesa/Safaricom', 'digital asset mobile payment', 'Kenya', 'Kenya', ['CBK', 'CMA Kenya', 'ODPC'], ['mobile money innovation leadership', 'Pan-African remittance modernisation'], False),
        ('OPay', 'tokenized payment infrastructure', 'Nigeria', 'Nigeria', ['CBN', 'SEC Nigeria', 'NDPC'], ['African merchant payments digitisation'], False),
        ('Tabby', 'tokenized BNPL infrastructure', 'United Arab Emirates', 'UAE/KSA', ['CBUAE', 'SAMA', 'DFSA', 'ADGM FSMR'], ['GCC embedded finance growth', 'DIFC Innovation Hub'], False),
        ('Chipper Cash', 'cross-border tokenized remittance', 'Pan-Africa', 'Africa', ['CBN', 'BoG', 'regional PSP regimes'], ['African remittance corridor modernisation'], False),
        ('Tamara', 'Sharia-compliant tokenized lending', 'Saudi Arabia', 'KSA', ['SAMA', 'CMA', 'AAOIFI'], ['Saudi consumer finance innovation'], True),
        ('Sarwa', 'tokenized investment platform', 'United Arab Emirates', 'UAE', ['SCA', 'DFSA', 'ADGM FSMR'], ['DIFC Innovation Hub', 'UAE retail investing digitisation'], False),
        ('Rain', 'digital asset exchange', 'Bahrain', 'Bahrain', ['CBB'], ['Bahrain digital asset market development'], False),
        ('Interswitch', 'tokenized payment settlement', 'Nigeria', 'Nigeria', ['CBN', 'SEC Nigeria', 'NDPC'], ['African payment switching modernisation'], False),
        ('Jumo', 'tokenized SME lending', 'South Africa', 'South Africa', ['FSCA', 'SARB', 'NCR'], ['SME credit infrastructure modernisation'], False),
    ],
    'financial-institutions': [
        ('ADX', 'digital securities marketplace', 'United Arab Emirates', 'UAE', ['SCA', 'CBUAE', 'DFSA', 'ADGM FSMR'], ['digital dirham', 'DIFC Innovation Hub', 'Abu Dhabi market digitisation'], False),
        ('Tadawul', 'tokenized securities listing', 'Saudi Arabia', 'KSA', ['CMA', 'SAMA'], ['Saudi Vision 2030 capital market modernisation'], False),
        ('JSE', 'digital asset trading', 'South Africa', 'South Africa', ['FSCA', 'SARB', 'FIC'], ['Project Khokha', 'South African exchange modernisation'], False),
        ('DIFC', 'digital asset sandbox', 'United Arab Emirates', 'UAE', ['DFSA', 'CBUAE'], ['DIFC Innovation Hub', 'digital dirham'], False),
        ('ADGM', 'digital asset regulatory framework', 'United Arab Emirates', 'UAE', ['ADGM FSMR', 'FSRA'], ['ADGM digital asset framework', 'digital dirham'], False),
        ('Central Bank of UAE', 'CBDC/digital dirham', 'United Arab Emirates', 'UAE', ['CBUAE'], ['digital dirham', 'Project Aber', 'mBridge-related wholesale interoperability'], False),
        ('SAMA', 'digital riyal pilot', 'Saudi Arabia', 'KSA', ['SAMA', 'CMA'], ['Project Aber', 'digital riyal research'], False),
        ('South African Reserve Bank', 'Project Khokha CBDC', 'South Africa', 'South Africa', ['SARB', 'FSCA'], ['Project Khokha'], False),
        ('Central Bank of Bahrain', 'digital asset regulatory platform', 'Bahrain', 'Bahrain', ['CBB'], ['Bahrain digital asset framework'], False),
        ('Casablanca Stock Exchange', 'tokenized securities', 'Morocco', 'Morocco', ['AMMC', 'Bank Al-Maghrib'], ['Moroccan market infrastructure modernisation'], False),
    ],
}

ORDER = [
    ('RFP', 'banks'), ('RFI', 'banks'),
    ('RFP', 'fintechs'), ('RFI', 'fintechs'),
    ('RFP', 'financial-institutions'), ('RFI', 'financial-institutions'),
]

REGIONAL_NOTES = {
    'UAE': 'The issuing entity operates within a UAE environment that may touch mainland UAE and financial free-zone regimes. Respondents must show how their solution can be deployed in a way that respects CBUAE expectations, UAE Securities and Commodities Authority rules where relevant, and the specialist requirements of DFSA or ADGM FSRA frameworks when a free-zone entity, sandbox, or investor constituency is involved. Particular weight will be placed on outsourcing oversight, operational resilience, evidential audit trails, cyber controls, and the ability to support future participation in digital dirham-related settlement patterns.',
    'KSA': 'The issuing entity operates in the Kingdom of Saudi Arabia and expects a conservative, institution-led control model. Respondents must explain how their platform can align to SAMA expectations, Capital Market Authority requirements, information-security obligations, and, where relevant, Saudi data-hosting or localisation policies. For use cases with capital market characteristics, responses must distinguish issuer-side, distributor-side, and infrastructure-side compliance responsibilities. Sharia governance evidence and ability to support AAOIFI-style review are weighted heavily where applicable.',
    'South Africa': 'The issuing entity operates in a South African regulatory perimeter and expects robust treatment of market conduct, prudential oversight, anti-money laundering controls, and financial market infrastructure obligations. Responses should discuss alignment to FSCA and SARB expectations, the Financial Intelligence Centre context, and lessons from Project Khokha concerning settlement finality, privacy, interoperability, and production readiness. Vendors should show how control evidence can be produced for both bank and market-infrastructure stakeholders.',
    'Egypt': 'The issuing entity operates in the Egyptian market and expects responses tailored to the Central Bank of Egypt and Financial Regulatory Authority environment. Vendors shall describe how their platform can support strong records management, local governance, operational resilience, and legally defensible evidence packages. The buyer is particularly interested in solutions that reduce implementation ambiguity and can support phased institutional adoption without requiring a fragile bespoke architecture.',
    'Morocco': 'The issuing entity operates in Morocco and requires responses that reflect AMMC and Bank Al-Maghrib expectations. Vendors should address cross-border trade and capital-market connectivity, robust governance, auditability, and the ability to support Arabic- and French-language operating environments where needed. Solutions should be designed so that legal documentation, entitlement records, and participant permissions remain institution-controlled and reviewable.',
    'Nigeria/Africa': 'The issuing entity is evaluating a multi-market African operating model. Responses must show how the platform can support different country-specific licensing regimes, especially for payment, remittance, investment, or digital-asset-adjacent activity. Priority will be given to architectures that permit modular country-by-country rollout, country-specific compliance overlays, and strong transaction-monitoring evidence for regulators and partner banks.',
    'Nigeria': 'The issuing entity operates within Nigeria and expects responses that address CBN expectations, SEC Nigeria positioning where relevant, data protection obligations, and the practical realities of high-volume payment infrastructure. The buyer will value solutions that handle reconciliation, dispute support, offline or degraded-network resilience, and modular compliance controls suitable for a fast-scaling payments business.',
    'Kenya': 'The issuing entity operates in Kenya and expects practical alignment to mobile-money realities, central-bank expectations, data protection obligations, and integration with high-volume consumer payment rails. Solutions must balance institutional control with speed, low-friction operations, and reliable evidential support for disputes, fraud review, and regulator-facing reporting.',
    'Africa': 'The issuing entity is assessing a continent-spanning operating model and therefore requires a modular platform that can manage cross-border differences in licensing, AML/KYC obligations, treasury operations, and settlement relationships. Vendors should show how product and workflow layers can be standardised while preserving country-specific controls.',
    'Bahrain': 'The issuing entity expects close alignment to the Central Bank of Bahrain digital asset environment, including governance, custody, market conduct, cyber assurance, and operational resilience. Responses should be explicit about what is currently supported under Bahrain regimes, what depends on additional licensing, and how evidence is generated for supervisory review.',
    'Qatar': 'The issuing entity requires responses suitable for the Qatari banking and capital-markets perimeter, with particular focus on governance, cross-border participant restrictions, and institution-controlled approval flows. Where Islamic capital-market structures are contemplated, respondents must explain how legal workflows, cash-flow rules, and entitlement records can be adapted without undermining Sharia governance.',
}

TOPIC_DETAILS = {
    'tokenized deposits/trade finance': {
        'title': 'Tokenized Deposits and Trade Finance Platform',
        'slug': 'tokenized-deposits-trade-finance',
        'drivers': ['digitise corporate liquidity supporting trade-finance flows', 'improve visibility over documentary and payment milestones', 'reduce reconciliation friction between treasury, trade operations, and transaction banking'],
        'deliverables': ['tokenized deposit issuance and redemption workflows', 'trade-finance asset registry and entitlement servicing', 'programmable payment and document-status event orchestration'],
    },
    'digital asset custody': {
        'title': 'Digital Asset Custody Platform', 'slug': 'digital-asset-custody',
        'drivers': ['establish institutional-grade safekeeping and control over digital assets', 'support segregation of customer, treasury, and omnibus assets', 'provide regulator-ready evidence for custody operations'],
        'deliverables': ['wallet and account orchestration', 'policy-based transaction approval and key management integration', 'reconciliation, proof-of-reserves support, and audit reporting'],
    },
    'tokenized sukuk': {
        'title': 'Tokenized Sukuk Issuance and Servicing Platform', 'slug': 'tokenized-sukuk',
        'drivers': ['modernise sukuk issuance workflows while preserving Sharia governance', 'improve investor reporting and lifecycle administration', 'support asset-backing evidence and entitlement clarity'],
        'deliverables': ['sukuk structuring templates and approval workflows', 'profit distribution and redemption event automation', 'Sharia review artefacts and audit-ready reporting'],
    },
    'tokenized fixed income': {
        'title': 'Tokenized Fixed Income Platform', 'slug': 'tokenized-fixed-income',
        'drivers': ['industrialise issuance and servicing of digital fixed-income instruments', 'shorten post-trade processing and reporting cycles', 'improve transparency across bookbuilding, settlement, and investor servicing'],
        'deliverables': ['issuance and bookbuilding workflow tooling', 'coupon/profit and redemption lifecycle automation', 'investor position reporting and reconciliation'],
    },
    'tokenized trade finance': {
        'title': 'Tokenized Trade Finance Platform', 'slug': 'tokenized-trade-finance',
        'drivers': ['digitise trade-finance assets and obligations', 'improve document, milestone, and payment visibility', 'reduce reconciliation friction across transaction-banking operations'],
        'deliverables': ['trade-finance asset registry workflows', 'document and milestone event orchestration', 'participant reporting and reconciliation evidence'],
    },
    'Sharia-compliant tokenized products': {
        'title': 'Sharia-Compliant Tokenized Products Platform', 'slug': 'sharia-compliant-tokenized-products',
        'drivers': ['create a controlled factory for Islamic digital products', 'support product-specific Sharia gating and evidential review', 'enable multi-product expansion without rebuilding the platform'],
        'deliverables': ['Islamic product templates and approval matrices', 'AAOIFI-aligned cashflow and entitlement controls', 'Sharia audit trail packaging'],
    },
    'digital asset payment rails': {
        'title': 'Digital Asset Payment Rails', 'slug': 'digital-asset-payment-rails',
        'drivers': ['improve programmability of institutional payment flows', 'connect digital money representations to existing treasury controls', 'support cross-border and domestic settlement innovation'],
        'deliverables': ['payment instruction orchestration', 'settlement status and exception handling workflows', 'wallet, account, and treasury integration layers'],
    },
    'tokenized securities': {
        'title': 'Tokenized Securities Platform', 'slug': 'tokenized-securities',
        'drivers': ['support issuance, trading, and servicing of digital securities', 'improve transparency over entitlements and investor access', 'prepare the organisation for phased market-infrastructure modernisation'],
        'deliverables': ['security master and issuance workflows', 'transfer, corporate action, and reporting modules', 'market supervision and evidential reporting capabilities'],
    },
    'digital bond platform': {
        'title': 'Digital Bond Platform', 'slug': 'digital-bond-platform',
        'drivers': ['create repeatable issuance capability for digital bonds', 'reduce manual coordination across treasury, capital markets, and operations', 'strengthen auditability across the full bond lifecycle'],
        'deliverables': ['issuance, allocation, and settlement workflow tooling', 'coupon and maturity event servicing', 'investor and internal reporting packages'],
    },
    'digital asset infrastructure': {
        'title': 'Digital Asset Infrastructure Platform', 'slug': 'digital-asset-infrastructure',
        'drivers': ['establish a reusable control plane for multiple digital-asset use cases', 'integrate digital asset operations with enterprise risk and compliance functions', 'avoid fragmented vendor point solutions'],
        'deliverables': ['core platform governance and administration', 'API/event integration services', 'operations, compliance, and reporting dashboards'],
    },
    'tokenized cross-border payments': {
        'title': 'Tokenized Cross-Border Payments Infrastructure', 'slug': 'tokenized-cross-border-payments',
        'drivers': ['improve speed and transparency of cross-border settlement', 'reduce prefunding and reconciliation complexity', 'enable policy-controlled tokenized settlement assets'],
        'deliverables': ['cross-border payment orchestration', 'FX and corridor rules management', 'participant onboarding and monitoring tooling'],
    },
    'digital asset mobile payment': {
        'title': 'Digital Asset Mobile Payment Infrastructure', 'slug': 'digital-asset-mobile-payment',
        'drivers': ['extend mobile-money reach into controlled digital-asset use cases', 'protect consumer trust while enabling innovation', 'support high-volume, low-value transaction processing with strong controls'],
        'deliverables': ['mobile wallet and payment integration layers', 'consumer-risk and fraud controls', 'merchant acceptance and settlement reporting'],
    },
    'tokenized payment infrastructure': {
        'title': 'Tokenized Payment Infrastructure', 'slug': 'tokenized-payment-infrastructure',
        'drivers': ['create programmable settlement capability for merchants and partners', 'improve intraday transparency and control', 'support scale without manual exception growth'],
        'deliverables': ['tokenized settlement asset workflows', 'merchant settlement orchestration', 'operations and dispute-management reporting'],
    },
    'tokenized BNPL infrastructure': {
        'title': 'Tokenized BNPL Infrastructure', 'slug': 'tokenized-bnpl-infrastructure',
        'drivers': ['improve funding and servicing efficiency for BNPL receivables', 'support investor or treasury participation in receivable pools', 'strengthen compliance and consumer-protection evidence'],
        'deliverables': ['receivable pool tokenization workflows', 'consumer and merchant reporting modules', 'policy and eligibility engines'],
    },
    'cross-border tokenized remittance': {
        'title': 'Cross-Border Tokenized Remittance Infrastructure', 'slug': 'cross-border-tokenized-remittance',
        'drivers': ['reduce remittance friction across African corridors', 'improve transparency over fees and settlement timing', 'support regulated scaling through modular corridor controls'],
        'deliverables': ['corridor onboarding and risk rules', 'settlement and liquidity workflow modules', 'consumer, partner, and regulator reporting'],
    },
    'Sharia-compliant tokenized lending': {
        'title': 'Sharia-Compliant Tokenized Lending Infrastructure', 'slug': 'sharia-compliant-tokenized-lending',
        'drivers': ['support compliant funding structures for Islamic lending products', 'improve funding traceability and investor confidence', 'embed Sharia and credit controls into the operating model'],
        'deliverables': ['Islamic lending product templates', 'investor/funder participation and servicing workflows', 'Sharia review and reporting outputs'],
    },
    'tokenized investment platform': {
        'title': 'Tokenized Investment Platform', 'slug': 'tokenized-investment-platform',
        'drivers': ['support digital investment products for advised and self-directed clients', 'improve product governance and client reporting', 'enable asset expansion without a major platform redesign'],
        'deliverables': ['product issuance and distribution tooling', 'portfolio and entitlement servicing', 'client and regulator reporting'],
    },
    'digital asset exchange': {
        'title': 'Digital Asset Exchange Platform', 'slug': 'digital-asset-exchange',
        'drivers': ['strengthen regulated exchange capability for institutional and qualified investors', 'improve market-surveillance readiness', 'support scalable listing, trading, and custody integration'],
        'deliverables': ['listing and market-operations workflows', 'order, trade, and settlement integration', 'surveillance and compliance reporting'],
    },
    'tokenized payment settlement': {
        'title': 'Tokenized Payment Settlement Platform', 'slug': 'tokenized-payment-settlement',
        'drivers': ['modernise switching and settlement operations', 'reduce reconciliation breaks across participants', 'support programmable settlement with enterprise controls'],
        'deliverables': ['participant settlement orchestration', 'intraday liquidity and exception management', 'scheme reporting and audit evidence'],
    },
    'tokenized SME lending': {
        'title': 'Tokenized SME Lending Platform', 'slug': 'tokenized-sme-lending',
        'drivers': ['expand funding flexibility for SME credit books', 'improve transparency and data quality in servicing', 'support investor and warehouse reporting'],
        'deliverables': ['loan pool tokenization and servicing workflows', 'risk and covenant monitoring outputs', 'funding and collections reconciliation'],
    },
    'digital securities marketplace': {'title': 'Digital Securities Marketplace', 'slug': 'digital-securities-marketplace', 'drivers': ['build a market-grade listing and trading environment', 'improve supervision and operational transparency', 'create a reusable foundation for multiple digital instruments'], 'deliverables': ['issuer onboarding and listing workflows', 'trading and settlement integration', 'market oversight and surveillance reporting']},
    'tokenized securities listing': {'title': 'Tokenized Securities Listing Platform', 'slug': 'tokenized-securities-listing', 'drivers': ['create a controlled listing venue for digital securities', 'improve issuer onboarding and disclosure quality', 'support phased adoption by market participants'], 'deliverables': ['listing rule and disclosure workflows', 'issuer/participant onboarding modules', 'market operations dashboards']},
    'digital asset trading': {'title': 'Digital Asset Trading Platform', 'slug': 'digital-asset-trading', 'drivers': ['assess market infrastructure for regulated digital asset trading', 'preserve exchange-grade resilience and oversight', 'support interoperability with settlement and custody infrastructure'], 'deliverables': ['market-operations workflow tooling', 'trade lifecycle and surveillance modules', 'participant risk controls and reporting']},
    'digital asset sandbox': {'title': 'Digital Asset Sandbox Platform', 'slug': 'digital-asset-sandbox', 'drivers': ['create a supervised innovation environment for digital asset use cases', 'standardise controls for cohort onboarding and testing', 'generate structured evidence for policy and licensing decisions'], 'deliverables': ['sandbox applicant and cohort management', 'policy, reporting, and control tooling', 'test-environment orchestration and evidential reporting']},
    'digital asset regulatory framework': {'title': 'Digital Asset Regulatory Platform', 'slug': 'digital-asset-regulatory-framework', 'drivers': ['improve supervision of digital asset market activity', 'standardise licensing and control evidence collection', 'support transparent regulator-led oversight'], 'deliverables': ['licensing and supervisory workflow modules', 'control evidence collection and review', 'regulated-entity reporting interfaces']},
    'CBDC/digital dirham': {'title': 'CBDC and Digital Dirham Infrastructure', 'slug': 'cbdc-digital-dirham', 'drivers': ['assess production-grade infrastructure for wholesale or supervised digital dirham use', 'support interoperability with domestic and cross-border payment systems', 'preserve central-bank control, resilience, and oversight'], 'deliverables': ['issuance and circulation control workflows', 'participant access and rule engines', 'monitoring, analytics, and evidential packages']},
    'digital riyal pilot': {'title': 'Digital Riyal Pilot Infrastructure', 'slug': 'digital-riyal-pilot', 'drivers': ['evaluate infrastructure for supervised digital riyal pilots', 'test wholesale settlement and participant controls', 'generate evidence for future policy choices'], 'deliverables': ['pilot issuance and participant workflow tooling', 'rule and experiment management', 'policy evaluation reporting']},
    'Project Khokha CBDC': {'title': 'Project Khokha CBDC Infrastructure', 'slug': 'project-khokha-cbdc', 'drivers': ['translate Project Khokha learning into structured procurement requirements', 'support wholesale settlement experimentation and possible scaling paths', 'preserve resilience, privacy, and regulator-grade reporting'], 'deliverables': ['wholesale participant and settlement workflows', 'privacy-aware monitoring and audit tooling', 'integration with RTGS or market infrastructure interfaces']},
    'digital asset regulatory platform': {'title': 'Digital Asset Regulatory Platform', 'slug': 'digital-asset-regulatory-platform', 'drivers': ['improve supervisory workflows for digital-asset-regulated entities', 'collect standardised evidence across licensees', 'support evolving policy with configurable control models'], 'deliverables': ['licence and supervisory workflow tooling', 'entity reporting and review modules', 'control evidence and analytics dashboards']},
}


def kebab(text: str) -> str:
    text = text.lower()
    text = text.replace('&', 'and').replace('/', ' ').replace('(', '').replace(')', '')
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return re.sub(r'-+', '-', text).strip('-')


def clean_name(name: str) -> str:
    return name.replace(' (FAB)', '').replace('(CIB)', 'CIB').replace('M-Pesa/Safaricom', 'M-Pesa Safaricom')


def doc_ref(name, doctype):
    initials = ''.join(ch for ch in re.sub(r'[^A-Z]', '', name)[:6]) or 'ORG'
    return f"{initials}-{doctype}-202603"


def top_table(name, doctype, title, category, geography):
    return f"| Field | Value |\n|---|---|\n| Document Reference | {doc_ref(name, doctype)} |\n| Document Type | {doctype} |\n| Version | v1.0 |\n| Issue Date | March 2026 |\n| Response Deadline | May 2026 |\n| Classification | Confidential |\n| Issuing Entity | {name} |\n| Institution Category | {category.replace('-', ' ').title()} |\n| Geography | {geography} |\n| Programme Title | {title} |\n"


def bullet_list(items):
    return '\n'.join(f"- {x}" for x in items)


def _section(title: str, body: str) -> str:
    return f"## {title}\n\n{body.strip()}\n"


def _common_context(name, topic, geography, regs, initiatives, sharia, category, doctype):
    td = TOPIC_DETAILS[topic]
    reg_text = ', '.join(regs)
    init_text = ', '.join(initiatives)
    sharia_line = (
        "The response must explicitly address Sharia governance, AAOIFI-aligned review, product permissibility controls, and evidence suitable for Sharia-board review."
        if sharia
        else "Where Islamic-finance considerations arise, the response should explain configurable controls and approval routing without implying a forked product architecture."
    )
    return td, reg_text, init_text, sharia_line


def rfp_content(name, topic, country, geography, regs, initiatives, sharia, category):
    td, reg_text, init_text, sharia_line = _common_context(name, topic, geography, regs, initiatives, sharia, category, 'RFP')
    return (
        f"# {name} — Request for Proposal\n"
        f"## {td['title']}\n\n"
        f"{top_table(name, 'RFP', td['title'], category, geography)}\n"
        + _section('1. Procurement Context', f"{name} is seeking a production-grade platform and implementation approach for {topic}. The buyer wants a defensible institutional operating model, not a demo. The programme is driven by {', '.join(td['drivers'])}.")
        + _section('2. Regulatory and Market Context', f"The response must reflect {geography} requirements, including {reg_text}. Relevant market initiatives include {init_text}. {sharia_line}")
        + _section('3. Scope of Required Deliverables', f"Expected deliverables include:\n{bullet_list(td['deliverables'])}\n\nVendors must distinguish shipped capability, configurable platform capability, partner-enabled scope, and roadmap items.")
        + _section('4. Response Requirements', "Respondents must provide architecture, deployment model, integration approach, security controls, operational resilience, implementation plan, support model, commercial assumptions, and evidence references.")
        + _section('5. Evaluation Criteria', "Evaluation will prioritize production maturity, evidence quality, operational control, implementation realism, security, governance, and clarity of scope boundaries.")
    )


def rfi_content(name, topic, country, geography, regs, initiatives, sharia, category):
    td, reg_text, init_text, sharia_line = _common_context(name, topic, geography, regs, initiatives, sharia, category, 'RFI')
    return (
        f"# {name} — Request for Information\n"
        f"## {td['title']}\n\n"
        f"{top_table(name, 'RFI', td['title'], category, geography)}\n"
        + _section('1. Purpose of Inquiry', f"{name} is gathering market information for {topic}. This RFI is exploratory and intended to test vendor maturity, implementation realism, and control-model fit.")
        + _section('2. Information Objectives', f"The buyer wants evidence on workflow maturity, architecture, integrations, security, resilience, regulatory fit, and commercial/delivery models. Relevant regulatory context includes {reg_text}; market initiatives include {init_text}. {sharia_line}")
        + _section('3. Requested Vendor Input', f"Respondents should describe support for:\n{bullet_list(td['deliverables'])}\n\nResponses must clearly mark current, configurable, partner-enabled, roadmap, and unsupported capabilities.")
        + _section('4. Follow-up Path', "The buyer may use responses to shape a later RFP, pilot, market sounding, or internal strategy paper. Vague product marketing will be scored down.")
    )


def ensure_dirs():
    for doctype, category in ORDER:
        path = BASE / doctype / 'Middle-East-Africa' / category
        path.mkdir(parents=True, exist_ok=True)


def main():
    ensure_dirs()
    generated = []
    for doctype, category in ORDER:
        for row in DATA[category]:
            name, topic, country, geography, regs, initiatives, sharia = row
            td = TOPIC_DETAILS[topic]
            fname = f"{kebab(clean_name(name))}-{doctype.lower()}-{td['slug']}-202603-v1.0.md"
            out = assert_output_within_agent("rfp-forge", BASE / doctype / 'Middle-East-Africa' / category / fname)
            if doctype == 'RFP':
                content = rfp_content(name, topic, country, geography, regs, initiatives, sharia, category)
            else:
                content = rfi_content(name, topic, country, geography, regs, initiatives, sharia, category)
            out.write_text(content)
            append_build_metadata(
                "rfp-forge",
                output_path=out,
                operation="generate_mea_docs",
                extra={
                    "document_type": doctype,
                    "category": category,
                    "institution": name,
                    "topic": topic,
                },
                log_markdown_name=None,
            )
            generated.append(out)
    print(f'Generated {len(generated)} documents')
    for p in generated:
        print(p.relative_to(BASE.resolve()))

if __name__ == '__main__':
    main()
