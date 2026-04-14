export interface Holding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  dayChange: number;      // absolute $ change today
  dayChangePct: number;   // % change today
  totalReturn: number;    // absolute $ total return
  totalReturnPct: number; // % total return
  weight: number;         // % of portfolio
}

export interface PortfolioSummaryData {
  totalValue: number;
  dayPnl: number;
  dayPnlPct: number;
  totalReturn: number;
  totalReturnPct: number;
  cashBalance: number;
  holdingsCount: number;
  asOf: string; // ISO timestamp
}

export interface PortfolioHistoryPoint {
  date: string;  // "YYYY-MM-DD"
  value: number;
}

export type Timeframe = "1W" | "1M" | "3M" | "6M" | "YTD" | "1Y";

export interface PortfolioFilters {
  search: string;
  sector: string | undefined;
  dateRange: { from: string; to: string } | null;
}
