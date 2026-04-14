import type { Holding, PortfolioSummaryData, PortfolioHistoryPoint } from "../types/index.js";

export const mockHoldings: Holding[] = [
  {
    id: "aapl",
    ticker: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    shares: 120,
    avgCost: 142.5,
    currentPrice: 189.84,
    marketValue: 22780.8,
    dayChange: 342.0,
    dayChangePct: 1.52,
    totalReturn: 5680.8,
    totalReturnPct: 33.16,
    weight: 18.7,
  },
  {
    id: "msft",
    ticker: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology",
    shares: 55,
    avgCost: 285.0,
    currentPrice: 374.51,
    marketValue: 20598.05,
    dayChange: 110.0,
    dayChangePct: 0.54,
    totalReturn: 4920.55,
    totalReturnPct: 31.39,
    weight: 16.9,
  },
  {
    id: "googl",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    shares: 80,
    avgCost: 125.3,
    currentPrice: 156.2,
    marketValue: 12496.0,
    dayChange: -124.8,
    dayChangePct: -0.99,
    totalReturn: 2472.0,
    totalReturnPct: 24.66,
    weight: 10.2,
  },
  {
    id: "jpm",
    ticker: "JPM",
    name: "JPMorgan Chase",
    sector: "Financials",
    shares: 95,
    avgCost: 152.0,
    currentPrice: 198.45,
    marketValue: 18852.75,
    dayChange: 285.0,
    dayChangePct: 1.53,
    totalReturn: 4412.75,
    totalReturnPct: 30.61,
    weight: 15.5,
  },
  {
    id: "brk",
    ticker: "BRK.B",
    name: "Berkshire Hathaway",
    sector: "Financials",
    shares: 40,
    avgCost: 295.0,
    currentPrice: 348.6,
    marketValue: 13944.0,
    dayChange: 0.0,
    dayChangePct: 0.0,
    totalReturn: 2144.0,
    totalReturnPct: 18.17,
    weight: 11.4,
  },
  {
    id: "unh",
    ticker: "UNH",
    name: "UnitedHealth Group",
    sector: "Healthcare",
    shares: 22,
    avgCost: 480.0,
    currentPrice: 521.3,
    marketValue: 11468.6,
    dayChange: -44.0,
    dayChangePct: -0.38,
    totalReturn: 908.6,
    totalReturnPct: 8.60,
    weight: 9.4,
  },
  {
    id: "v",
    ticker: "V",
    name: "Visa Inc.",
    sector: "Financials",
    shares: 48,
    avgCost: 225.0,
    currentPrice: 261.4,
    marketValue: 12547.2,
    dayChange: 96.0,
    dayChangePct: 0.77,
    totalReturn: 1747.2,
    totalReturnPct: 16.17,
    weight: 10.3,
  },
  {
    id: "lly",
    ticker: "LLY",
    name: "Eli Lilly",
    sector: "Healthcare",
    shares: 14,
    avgCost: 550.0,
    currentPrice: 643.9,
    marketValue: 9014.6,
    dayChange: 70.0,
    dayChangePct: 0.78,
    totalReturn: 1314.6,
    totalReturnPct: 17.07,
    weight: 7.4,
  },
];

export const mockPortfolioSummary: PortfolioSummaryData = {
  totalValue: 121701.0,
  dayPnl: 734.2,
  dayPnlPct: 0.61,
  totalReturn: 23600.5,
  totalReturnPct: 24.06,
  cashBalance: 2500.0,
  holdingsCount: mockHoldings.length,
  asOf: new Date().toISOString(),
};

/** Generate 90 days of portfolio history with a random walk */
function generateHistory(days: number, finalValue: number): PortfolioHistoryPoint[] {
  const points: PortfolioHistoryPoint[] = [];
  let value = finalValue * 0.78; // start ~22% lower
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    if (i === 0) {
      value = finalValue;
    } else {
      // Random walk with slight upward drift
      const change = (Math.random() - 0.44) * 0.015 * value;
      value = Math.max(value + change, finalValue * 0.6);
    }

    points.push({
      date: date.toISOString().split("T")[0] ?? date.toISOString(),
      value: Math.round(value * 100) / 100,
    });
  }
  return points;
}

export const mockPortfolioHistory: PortfolioHistoryPoint[] = generateHistory(
  90,
  mockPortfolioSummary.totalValue,
);
