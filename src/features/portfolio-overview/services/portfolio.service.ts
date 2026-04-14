import { apiClient } from "@/shared";
import type {
  Holding,
  PortfolioSummaryData,
  PortfolioHistoryPoint,
  Timeframe,
} from "../types/index.js";
import type { PaginatedResponse, ApiResponse } from "@/shared";

export async function fetchPortfolioSummary(): Promise<PortfolioSummaryData> {
  const response = await apiClient.get<PortfolioSummaryData>("/portfolio/summary");
  return response.data;
}

export async function fetchHoldings(): Promise<Holding[]> {
  const response = await apiClient.get<Holding[]>("/portfolio/holdings") as PaginatedResponse<Holding>;
  return response.data;
}

export async function fetchPortfolioHistory(
  timeframe: Timeframe,
): Promise<PortfolioHistoryPoint[]> {
  const response = await apiClient.get<PortfolioHistoryPoint[]>("/portfolio/history", {
    params: { timeframe },
  }) as ApiResponse<PortfolioHistoryPoint[]>;
  return response.data;
}
