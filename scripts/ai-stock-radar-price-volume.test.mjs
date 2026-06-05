import { describe, expect, it } from "vitest";

import {
  buildStooqDailyUrl,
  computePriceVolumeSignal,
  fetchStooqPriceVolume,
  parseStooqCsv,
} from "./ai-stock-radar-price-volume.mjs";

const csv = [
  "Date,Open,High,Low,Close,Volume",
  "2026-04-01,10,11,9,10,1000",
  "2026-04-02,10,12,9,11,1100",
  "2026-04-03,11,13,10,12,1200",
  "2026-04-04,12,14,11,13,1300",
  "2026-04-05,13,15,12,14,5000",
].join("\n");

describe("AI stock radar price/volume sensor", () => {
  it("builds Stooq daily CSV URLs for US tickers", () => {
    expect(buildStooqDailyUrl("AAPL")).toBe("https://stooq.com/q/d/l/?s=aapl.us&i=d");
  });

  it("parses Stooq CSV candles", () => {
    expect(parseStooqCsv(csv)).toEqual([
      { date: "2026-04-01", open: 10, high: 11, low: 9, close: 10, volume: 1000 },
      { date: "2026-04-02", open: 10, high: 12, low: 9, close: 11, volume: 1100 },
      { date: "2026-04-03", open: 11, high: 13, low: 10, close: 12, volume: 1200 },
      { date: "2026-04-04", open: 12, high: 14, low: 11, close: 13, volume: 1300 },
      { date: "2026-04-05", open: 13, high: 15, low: 12, close: 14, volume: 5000 },
    ]);
  });

  it("computes conservative price/volume confirmation metrics", () => {
    const signal = computePriceVolumeSignal(parseStooqCsv(csv));

    expect(signal.status).toBe("available");
    expect(signal.latest_close).toBe(14);
    expect(signal.return_20d_pct).toBeCloseTo(40);
    expect(signal.volume_ratio_20d).toBeGreaterThan(2);
    expect(signal.confirmation).toBe("positive");
  });

  it("returns unavailable status when Stooq has no usable candles", async () => {
    const result = await fetchStooqPriceVolume({
      ticker: "MISSING",
      fetcher: async () => "No data",
    });

    expect(result.status).toBe("unavailable");
    expect(result.source).toBe("stooq");
  });
});
