import { create } from "zustand";
import type { CompSet, Instrument } from "../types/index.js";
import { mockCompSets } from "../mocks/data.js";

type ComparablesState = {
  compSets: CompSet[];
  activeSetId: string | null;
  isDrawerOpen: boolean;
  selectedInstruments: Instrument[];
  draggingInstrument: Instrument | null;

  setActiveSet: (id: string) => void;
  closeDrawer: () => void;
  openDrawer: () => void;
  setSelectedInstruments: (rows: Instrument[]) => void;
  clearSelection: () => void;
  setDraggingInstrument: (i: Instrument | null) => void;

  createCompSet: (name: string) => void;
  deleteCompSet: (id: string) => void;
  renameCompSet: (id: string, name: string) => void;
  addToCompSets: (isins: string[], setIds: string[], allInstruments: Instrument[]) => void;
  removeFromCompSet: (setId: string, isins: string[]) => void;
};

export const useComparablesStore = create<ComparablesState>((set) => ({
  compSets: mockCompSets,
  activeSetId: null,
  isDrawerOpen: false,
  selectedInstruments: [],

  draggingInstrument: null,

  setActiveSet: (id) => set({ activeSetId: id, isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openDrawer: () => set({ isDrawerOpen: true }),
  setSelectedInstruments: (rows) => set({ selectedInstruments: rows }),
  clearSelection: () => set({ selectedInstruments: [] }),
  setDraggingInstrument: (i) => set({ draggingInstrument: i }),

  createCompSet: (name) =>
    set((s) => ({
      compSets: [
        ...s.compSets,
        { id: `cs-${Date.now()}`, name, instruments: [] },
      ],
    })),

  deleteCompSet: (id) =>
    set((s) => ({
      compSets: s.compSets.filter((c) => c.id !== id),
      activeSetId: s.activeSetId === id ? null : s.activeSetId,
      isDrawerOpen: s.activeSetId === id ? false : s.isDrawerOpen,
    })),

  renameCompSet: (id, name) =>
    set((s) => ({
      compSets: s.compSets.map((c) => (c.id === id ? { ...c, name } : c)),
    })),

  addToCompSets: (isins, setIds, allInstruments) =>
    set((s) => ({
      compSets: s.compSets.map((c) => {
        if (!setIds.includes(c.id)) return c;
        const toAdd = allInstruments.filter(
          (i) => isins.includes(i.isin) && !c.instruments.some((e) => e.isin === i.isin),
        );
        return { ...c, instruments: [...c.instruments, ...toAdd] };
      }),
    })),

  removeFromCompSet: (setId, isins) =>
    set((s) => ({
      compSets: s.compSets.map((c) =>
        c.id === setId
          ? { ...c, instruments: c.instruments.filter((i) => !isins.includes(i.isin)) }
          : c,
      ),
    })),
}));
