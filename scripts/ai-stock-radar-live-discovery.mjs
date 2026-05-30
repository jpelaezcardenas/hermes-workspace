export const AI_KEYWORDS = [
  "artificial intelligence",
  "ai",
  "machine learning",
  "deep learning",
  "neural",
  "gpu",
  "accelerated computing",
  "data center",
  "datacenter",
  "robotics",
  "automation",
  "voice ai",
  "generative ai",
];

const AI_KEYWORD_PATTERNS = [
  /\bartificial intelligence\b/i,
  /\bai\b/i,
  /\bmachine learning\b/i,
  /\bdeep learning\b/i,
  /\bneural\b/i,
  /\bgpu\b/i,
  /\baccelerated computing\b/i,
  /\bdata[- ]?center\b/i,
  /\brobotics\b/i,
  /\bautomation\b/i,
  /\bvoice ai\b/i,
  /\bgenerative ai\b/i,
];

const NASDAQ_LISTED_URL = "https://www.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt";
const OTHER_LISTED_URL = "https://www.nasdaqtrader.com/dynamic/SymDir/otherlisted.txt";
const SEC_COMPANY_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json";
const SEC_SUBMISSIONS_ROOT = "https://data.sec.gov/submissions";
const SEC_USER_AGENT =
  process.env.AI_STOCK_RADAR_SEC_USER_AGENT ||
  "HermesAIStockRadar/1.0 contact=local-research@example.invalid";

const COMMON_STOCK_MARKERS = [
  "common stock",
  "ordinary shares",
  "american depositary",
  "class a",
  "class b",
];

const EXCLUDED_NAME_MARKERS = [
  "etf",
  "fund",
  "warrant",
  "unit",
  "right",
  "note due",
  "preferred",
  "depositary share",
];

const EXCHANGE_CODES = {
  A: "NYSE American",
  N: "NYSE",
  P: "NYSE Arca",
  Z: "BATS",
  V: "IEX",
};

function cleanCompanyName(securityName) {
  return String(securityName || "")
    .replace(/\s+-\s+.*$/, "")
    .replace(/\s+Class [A-Z].*$/i, "")
    .replace(/\s+Common Stock.*$/i, "")
    .replace(/\s+Ordinary Shares.*$/i, "")
    .trim();
}

function splitPipeRows(text) {
  const [headerLine, ...lines] = String(text || "").trim().split(/\r?\n/);
  const headers = headerLine.split("|");

  return lines
    .filter((line) => line && !line.startsWith("File Creation Time:"))
    .map((line) => {
      const values = line.split("|");
      return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
    });
}

function isOperatingEquity({ securityName, etf, testIssue }) {
  const normalized = String(securityName || "").toLowerCase();
  if (etf === "Y" || testIssue === "Y") return false;
  if (EXCLUDED_NAME_MARKERS.some((marker) => normalized.includes(marker))) return false;
  return COMMON_STOCK_MARKERS.some((marker) => normalized.includes(marker));
}

export function parseNasdaqListed(text) {
  return splitPipeRows(text)
    .filter((row) =>
      isOperatingEquity({
        securityName: row["Security Name"],
        etf: row.ETF,
        testIssue: row["Test Issue"],
      }),
    )
    .map((row) => ({
      ticker: row.Symbol,
      company: cleanCompanyName(row["Security Name"]),
      exchange: "Nasdaq",
      listed: true,
      security_name: row["Security Name"],
    }));
}

export function parseOtherListed(text) {
  return splitPipeRows(text)
    .filter((row) =>
      isOperatingEquity({
        securityName: row["Security Name"],
        etf: row.ETF,
        testIssue: row["Test Issue"],
      }),
    )
    .map((row) => ({
      ticker: row["ACT Symbol"],
      company: cleanCompanyName(row["Security Name"]),
      exchange: EXCHANGE_CODES[row.Exchange] || row.Exchange || "Other",
      listed: true,
      security_name: row["Security Name"],
    }));
}

export function normalizeSecCompanyTickers(companyTickers) {
  return Object.values(companyTickers || {}).reduce((byTicker, entry) => {
    const ticker = String(entry.ticker || "").toUpperCase();
    if (!ticker) return byTicker;

    byTicker[ticker] = {
      cik: String(entry.cik_str).padStart(10, "0"),
      ticker,
      title: entry.title,
    };
    return byTicker;
  }, {});
}

export function inferAiProfile({ ticker, company, security_name, seedByTicker }) {
  const seed = seedByTicker[ticker] || {};
  const haystack = `${company || ""} ${security_name || ""}`.toLowerCase();
  const keywordMatches = AI_KEYWORD_PATTERNS.filter((pattern) => pattern.test(haystack));
  const seedThemes = seed.themes || [];
  const themes = [...new Set([...seedThemes, ...keywordMatches.map(() => "ai_keyword_match")])];
  const isAiRelevant = themes.length > 0;

  return {
    isAiRelevant,
    themes,
    ai_exposure: seed.ai_exposure || (keywordMatches.length > 0 ? "core" : "watch"),
    risk_flags: seed.risk_flags || [],
  };
}

export function summarizeSubmissions(submissions) {
  const forms = submissions?.filings?.recent?.form || [];
  const relevantForms = [...new Set(forms.filter((form) => ["10-K", "10-Q", "8-K", "20-F", "6-K"].includes(form)))]
    .slice(0, 5);
  const catalystLabels = ["recent_public_company_filings"];

  if (relevantForms.includes("8-K") || relevantForms.includes("6-K")) {
    catalystLabels.push("recent_8k");
  }

  return {
    recent_filings: relevantForms,
    has_company_facts: relevantForms.some((form) => ["10-K", "10-Q", "20-F", "6-K"].includes(form)),
    catalyst_labels: catalystLabels,
  };
}

function seedMap(seedRecords) {
  return Object.fromEntries((seedRecords || []).map((record) => [record.ticker, record]));
}

async function resolveSubmission({ cik, submissionsByCik, fetcher }) {
  if (submissionsByCik && submissionsByCik[cik]) return submissionsByCik[cik];
  return fetcher(`${SEC_SUBMISSIONS_ROOT}/CIK${cik}.json`);
}

export async function buildLiveEvidenceRecords({
  nasdaqListedText,
  otherListedText,
  secCompanyTickers,
  submissionsByCik = {},
  seedRecords = [],
  fetcher = defaultTextOrJsonFetcher,
  maxSubmissionFetches = 25,
  maxRecords = 20,
}) {
  const listed = [...parseNasdaqListed(nasdaqListedText), ...parseOtherListed(otherListedText)];
  const secByTicker = normalizeSecCompanyTickers(secCompanyTickers);
  const seedByTicker = seedMap(seedRecords);
  const aiCandidates = listed
    .map((record) => ({
      ...record,
      sec: secByTicker[record.ticker],
      aiProfile: inferAiProfile({
        ticker: record.ticker,
        company: record.company,
        security_name: record.security_name,
        seedByTicker,
      }),
    }))
    .filter((record) => record.sec && record.aiProfile.isAiRelevant)
    .slice(0, maxSubmissionFetches);

  const evidence = [];
  for (const record of aiCandidates) {
    const submissions = await resolveSubmission({
      cik: record.sec.cik,
      submissionsByCik,
      fetcher,
    });
    const submissionSummary = summarizeSubmissions(submissions);
    const seed = seedByTicker[record.ticker] || {};

    evidence.push({
      ticker: record.ticker,
      company: record.company || record.sec.title,
      exchange: record.exchange,
      listed: true,
      themes: record.aiProfile.themes,
      ai_exposure: record.aiProfile.ai_exposure,
      source_types: ["nasdaq_symbol_directory", "sec_company_tickers", "sec_submissions", "sec_companyfacts"],
      recent_filings: submissionSummary.recent_filings,
      catalyst_labels: submissionSummary.catalyst_labels,
      has_company_facts: submissionSummary.has_company_facts,
      finra_context: "not_checked",
      risk_flags: record.aiProfile.risk_flags,
      source_urls: [
        NASDAQ_LISTED_URL,
        OTHER_LISTED_URL,
        SEC_COMPANY_TICKERS_URL,
        `${SEC_SUBMISSIONS_ROOT}/CIK${record.sec.cik}.json`,
        ...(seed.source_urls || []),
      ],
    });
  }

  return evidence.slice(0, maxRecords);
}

async function defaultTextOrJsonFetcher(url) {
  const response = await fetch(url, {
    headers: url.includes("sec.gov")
      ? {
          "User-Agent": SEC_USER_AGENT,
          Accept: "application/json,text/plain,*/*",
        }
      : {
          Accept: "text/plain,application/json,*/*",
        },
  });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json") || url.endsWith(".json")) {
    return response.json();
  }
  return response.text();
}

export async function discoverLiveEvidence({
  fetcher = defaultTextOrJsonFetcher,
  seedRecords = [],
  maxSubmissionFetches = 25,
  maxRecords = 20,
} = {}) {
  try {
    const [nasdaqListedText, otherListedText, secCompanyTickers] = await Promise.all([
      fetcher(NASDAQ_LISTED_URL),
      fetcher(OTHER_LISTED_URL),
      fetcher(SEC_COMPANY_TICKERS_URL),
    ]);
    const records = await buildLiveEvidenceRecords({
      nasdaqListedText,
      otherListedText,
      secCompanyTickers,
      seedRecords,
      fetcher,
      maxSubmissionFetches,
      maxRecords,
    });

    if (records.length === 0) {
      return {
        mode: "seed_fallback",
        records: seedRecords,
        fallbackReason: "live discovery returned no AI-relevant joined records",
        sourceStatus: {
          nasdaq_symbol_directory: "live_available_no_ai_records",
          sec_company_tickers: "live_available_no_ai_records",
          sec_submissions: "live_available_no_ai_records",
          sec_companyfacts: "available_without_api_key",
          finra_public_data: "not_checked",
          paid_market_data: "not_configured",
        },
      };
    }

    return {
      mode: "live",
      records,
      fallbackReason: "",
      sourceStatus: {
        nasdaq_symbol_directory: "live_available",
        sec_company_tickers: "live_available",
        sec_submissions: "live_available",
        sec_companyfacts: "available_without_api_key",
        finra_public_data: "not_checked",
        paid_market_data: "not_configured",
      },
    };
  } catch (error) {
    return {
      mode: "seed_fallback",
      records: seedRecords,
      fallbackReason: error instanceof Error ? error.message : String(error),
      sourceStatus: {
        nasdaq_symbol_directory: "live_failed_seed_fallback",
        sec_company_tickers: "live_failed_seed_fallback",
        sec_submissions: "live_failed_seed_fallback",
        sec_companyfacts: "available_without_api_key",
        finra_public_data: "not_checked",
        paid_market_data: "not_configured",
      },
    };
  }
}
