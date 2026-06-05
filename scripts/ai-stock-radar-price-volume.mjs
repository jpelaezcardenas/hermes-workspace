const STOOQ_DAILY_ROOT = "https://stooq.com/q/d/l/";

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function pctChange(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === 0) return null;
  return ((end - start) / start) * 100;
}

function average(values) {
  const usable = values.filter(Number.isFinite);
  if (!usable.length) return null;
  return usable.reduce((sum, value) => sum + value, 0) / usable.length;
}

export function buildStooqDailyUrl(ticker) {
  const symbol = `${String(ticker).toLowerCase()}.us`;
  return `${STOOQ_DAILY_ROOT}?s=${symbol}&i=d`;
}

export function parseStooqCsv(csv) {
  const lines = String(csv || "").trim().split(/\r?\n/);
  if (lines.length < 2 || !lines[0].toLowerCase().startsWith("date,")) return [];

  return lines
    .slice(1)
    .map((line) => {
      const [date, open, high, low, close, volume] = line.split(",");
      return {
        date,
        open: numberOrNull(open),
        high: numberOrNull(high),
        low: numberOrNull(low),
        close: numberOrNull(close),
        volume: numberOrNull(volume),
      };
    })
    .filter((candle) => candle.date && Number.isFinite(candle.close) && Number.isFinite(candle.volume));
}

export function computePriceVolumeSignal(candles) {
  const ordered = [...candles].sort((left, right) => left.date.localeCompare(right.date));
  if (ordered.length < 2) {
    return {
      status: "unavailable",
      source: "stooq",
      confirmation: "unavailable",
      reason: "not enough candles",
    };
  }

  const latest = ordered.at(-1);
  const lookback20 = ordered.slice(-20);
  const lookback60 = ordered.slice(-60);
  const return20 = pctChange(lookback20[0].close, latest.close);
  const return60 = pctChange(lookback60[0].close, latest.close);
  const avgVolume20 = average(lookback20.slice(0, -1).map((candle) => candle.volume));
  const volumeRatio20 = avgVolume20 ? latest.volume / avgVolume20 : null;
  const positivePrice = return20 !== null && return20 >= 10 && (return60 === null || return60 >= 0);
  const positiveVolume = volumeRatio20 !== null && volumeRatio20 >= 1.5;
  const stretched = return20 !== null && return20 >= 80;

  return {
    status: "available",
    source: "stooq",
    confirmation: positivePrice && positiveVolume && !stretched ? "positive" : stretched ? "stretched" : "neutral",
    latest_date: latest.date,
    latest_close: latest.close,
    latest_volume: latest.volume,
    return_20d_pct: return20 === null ? null : Number(return20.toFixed(2)),
    return_60d_pct: return60 === null ? null : Number(return60.toFixed(2)),
    volume_ratio_20d: volumeRatio20 === null ? null : Number(volumeRatio20.toFixed(2)),
  };
}

export async function fetchStooqPriceVolume({ ticker, fetcher = fetch }) {
  const url = buildStooqDailyUrl(ticker);

  try {
    const response = await fetcher(url);
    const csv = typeof response === "string" ? response : await response.text();
    const candles = parseStooqCsv(csv);
    const signal = computePriceVolumeSignal(candles);
    return {
      ...signal,
      source: "stooq",
      url,
    };
  } catch (error) {
    return {
      status: "unavailable",
      source: "stooq",
      confirmation: "unavailable",
      url,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}
