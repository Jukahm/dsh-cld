import { useEffect, useMemo, useState } from "react";
import { useComparablesStore } from "./store/comparables.store.js";
import { searchInstruments, mockAllInstruments } from "./mocks/data.js";
import { ComparablesManagerLayout } from "./components/ComparablesManagerLayout.js";
import { CompSetNavigator } from "./components/CompSetNavigator.js";
import { CompSetDetailDrawer } from "./components/CompSetDetailDrawer.js";
import { InstrumentSearchControls } from "./components/InstrumentSearchControls.js";
import { InstrumentSearchGrid } from "./components/InstrumentSearchGrid.js";
import { InstrumentSelectionTray } from "./components/InstrumentSelectionTray.js";
import { PageHeader } from "@/ui";
import type { CompSetSummary } from "./types/index.js";

export function ComparablesManager() {
  const {
    compSets, activeSetId, isDrawerOpen,
    selectedInstruments, setActiveSet, closeDrawer, openDrawer,
    setSelectedInstruments, clearSelection,
    createCompSet, deleteCompSet, renameCompSet,
    addToCompSets, removeFromCompSet,
  } = useComparablesStore();

  const [searchQuery, setSearchQuery] = useState("");

  // Keyboard: Escape clears selection or closes drawer
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (selectedInstruments.length > 0) { clearSelection(); return; }
      if (isDrawerOpen) { closeDrawer(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedInstruments.length, isDrawerOpen, clearSelection, closeDrawer]);

  const searchResults = useMemo(
    () => searchInstruments(searchQuery),
    [searchQuery],
  );

  const activeSet = compSets.find((c) => c.id === activeSetId) ?? null;

  const compSetSummaries: CompSetSummary[] = compSets.map((c) => ({
    id: c.id,
    name: c.name,
    instrumentCount: c.instruments.length,
  }));

  return (
    <div>
      <PageHeader
        title="Comparables Manager"
        subtitle="Search instruments and manage comp sets"
        breadcrumbs={[{ label: "Dashboard" }, { label: "Comparables" }]}
      />

      <ComparablesManagerLayout
        isDrawerOpen={isDrawerOpen}
        leftSlot={
          <CompSetNavigator
            compSets={compSetSummaries}
            activeSetId={activeSetId}
            onSelectSet={setActiveSet}
            onCreateNew={createCompSet}
          />
        }
        centerSlot={
          <>
            <InstrumentSearchControls
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              activeSetName={activeSet?.name ?? null}
              onOpenDrawer={openDrawer}
            />
            <InstrumentSearchGrid
              rows={searchResults}
              isLoading={false}
              searchQuery={searchQuery}
              onSelectionChange={setSelectedInstruments}
              selectedIsins={selectedInstruments.map((i) => i.isin)}
            />
            <InstrumentSelectionTray
              selectedInstruments={selectedInstruments}
              availableCompSets={compSetSummaries}
              activeSetId={activeSetId}
              onAdd={(isins, setIds) => addToCompSets(isins, setIds, mockAllInstruments)}
              onClearSelection={clearSelection}
            />
          </>
        }
        rightSlot={
          activeSet ? (
            <CompSetDetailDrawer
              detail={activeSet}
              onClose={closeDrawer}
              onRename={renameCompSet}
              onDelete={deleteCompSet}
              onRemoveInstruments={removeFromCompSet}
            />
          ) : null
        }
      />
    </div>
  );
}
