import { create } from "zustand";
import type { Timeframe, PortfolioFilters } from "../types/index.js";

interface PortfolioStore {
  timeframe: Timeframe;
  expandedRows: string[];
  filters: PortfolioFilters;

  setTimeframe: (timeframe: Timeframe) => void;
  toggleRow: (id: string) => void;
  setFilter: <K extends keyof PortfolioFilters>(key: K, value: PortfolioFilters[K]) => void;
  resetFilters: () => void;
}

const defaultFilters: PortfolioFilters = {
  search: "",
  sector: undefined,
  dateRange: null,
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  timeframe: "3M",
  expandedRows: [],
  filters: { ...defaultFilters },

  setTimeframe: (timeframe) => set({ timeframe }),

  toggleRow: (id) =>
    set((state) => ({
      expandedRows: state.expandedRows.includes(id)
        ? state.expandedRows.filter((r) => r !== id)
        : [...state.expandedRows, id],
    })),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),
}));
