import { useQuery } from "@tanstack/react-query";
import {
  fetchPortfolioSummary,
  fetchHoldings,
  fetchPortfolioHistory,
} from "../services/portfolio.service.js";
import { usePortfolioStore } from "../store/portfolio.store.js";

export const portfolioKeys = {
  all: ["portfolio"] as const,
  summary: () => [...portfolioKeys.all, "summary"] as const,
  holdings: () => [...portfolioKeys.all, "holdings"] as const,
  history: (timeframe: string) => [...portfolioKeys.all, "history", timeframe] as const,
};

export function usePortfolioSummary() {
  return useQuery({
    queryKey: portfolioKeys.summary(),
    queryFn: fetchPortfolioSummary,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useHoldings() {
  return useQuery({
    queryKey: portfolioKeys.holdings(),
    queryFn: fetchHoldings,
    staleTime: 30_000,
  });
}

export function usePortfolioHistory() {
  const timeframe = usePortfolioStore((s) => s.timeframe);

  return useQuery({
    queryKey: portfolioKeys.history(timeframe),
    queryFn: () => fetchPortfolioHistory(timeframe),
    staleTime: 60_000,
  });
}
