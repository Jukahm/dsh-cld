import { useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, SelectionChangedEvent, RowDragEvent } from "ag-grid-community";
import type { ICellRendererParams } from "ag-grid-community";
import { SearchOutlined } from "@ant-design/icons";
import { SkeletonWidget } from "@/ui";
import type { Instrument } from "../types/index.js";
import { useComparablesStore } from "../store/comparables.store.js";

type Props = {
  rows: Instrument[];
  isLoading: boolean;
  searchQuery: string;
  onSelectionChange: (rows: Instrument[]) => void;
  selectedIsins: string[];
};

const CURRENCY_COLORS: Record<string, string> = {
  CHF: "#dc2626",
  EUR: "#2563eb",
  USD: "#059669",
  GBP: "#7c3aed",
};

function CurrencyCell({ value }: ICellRendererParams<Instrument>) {
  const color = CURRENCY_COLORS[value as string] ?? "var(--color-text-secondary)";
  return <span style={{ color, fontWeight: 600 }}>{value as string}</span>;
}

function BondTypeCell({ value }: ICellRendererParams<Instrument>) {
  const isGlobal = value === "Global";
  return (
    <span
      style={{
        fontSize: 10,
        padding: "1px 5px",
        borderRadius: 3,
        background: isGlobal ? "#EFF6FF" : "#F1F5F9",
        color: isGlobal ? "#1D4ED8" : "#475569",
        border: `1px solid ${isGlobal ? "#BFDBFE" : "#CBD5E1"}`,
        whiteSpace: "nowrap",
      }}
    >
      {value as string}
    </span>
  );
}

const COLUMN_DEFS: ColDef<Instrument>[] = [
  {
    headerName: "CCY",
    field: "currency",
    width: 72,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    cellRenderer: CurrencyCell,
    rowDrag: true,
  },
  {
    headerName: "ISIN",
    field: "isin",
    width: 140,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    cellStyle: { fontFamily: "monospace", color: "var(--color-text-secondary)" } as Record<string, string>,
  },
  {
    headerName: "Security Name",
    field: "securityName",
    flex: 1,
    minWidth: 160,
    filter: "agTextColumnFilter",
    floatingFilter: true,
  },
  {
    headerName: "Type",
    field: "bondType",
    width: 88,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    cellRenderer: BondTypeCell,
  },
  {
    headerName: "Issuer",
    field: "issuer",
    width: 80,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    cellStyle: { color: "var(--color-text-tertiary)" } as Record<string, string>,
  },
];

const GRID_STYLE = {
  "--ag-font-size": "12px",
  "--ag-row-height": "32px",
  "--ag-header-height": "34px",
  "--ag-floating-filter-height": "32px",
  "--ag-foreground-color": "#0F172A",
  "--ag-header-background-color": "#F8FAFC",
  "--ag-header-foreground-color": "#64748B",
  "--ag-header-font-weight": "600",
  "--ag-border-color": "#E2E8F0",
  "--ag-row-border-color": "#E2E8F0",
  "--ag-selected-row-background-color": "#EFF6FF",
  "--ag-background-color": "#FFFFFF",
  "--ag-odd-row-background-color": "#FFFFFF",
  "--ag-accent-color": "#3B82F6",
  "--ag-cell-horizontal-padding": "8px",
  "--ag-wrapper-border-radius": "0px",
  height: "100%",
} as React.CSSProperties;

export function InstrumentSearchGrid({ rows, isLoading, searchQuery, onSelectionChange, selectedIsins }: Props) {
  const gridRef = useRef<AgGridReact<Instrument>>(null);
  const setDraggingInstrument = useComparablesStore((s) => s.setDraggingInstrument);

  // Clear grid selection when external state is cleared (e.g. Escape key)
  useEffect(() => {
    if (selectedIsins.length === 0) {
      gridRef.current?.api?.deselectAll();
    }
  }, [selectedIsins.length]);

  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<Instrument>) => {
      onSelectionChange(e.api.getSelectedRows());
    },
    [onSelectionChange],
  );

  const onRowDragEnter = useCallback(
    (e: RowDragEvent<Instrument>) => {
      setDraggingInstrument(e.node.data ?? null);
    },
    [setDraggingInstrument],
  );

  const onRowDragEnd = useCallback(() => {
    setDraggingInstrument(null);
  }, [setDraggingInstrument]);

  if (isLoading) {
    return <div style={{ padding: 16 }}><SkeletonWidget rows={8} /></div>;
  }

  if (!searchQuery.trim()) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-text-tertiary)",
          gap: 8,
          padding: 32,
        }}
      >
        <SearchOutlined style={{ fontSize: 32, opacity: 0.3 }} />
        <span style={{ fontSize: "var(--font-size-sm)" }}>Search for instruments to display data</span>
        <span style={{ fontSize: "var(--font-size-xs)" }}>Try searching for EIB, KFW, or IBRD</span>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 0 }}>
      <div className="ag-theme-alpine" style={GRID_STYLE}>
        <AgGridReact<Instrument>
          ref={gridRef}
          rowData={rows}
          columnDefs={COLUMN_DEFS}
          rowSelection="multiple"
          rowMultiSelectWithClick
          rowDragEntireRow
          rowStyle={{ cursor: "pointer" }}
          onSelectionChanged={onSelectionChanged}
          onRowDragEnter={onRowDragEnter}
          onRowDragEnd={onRowDragEnd}
          animateRows
          suppressCellFocus
          noRowsOverlayComponent={() => (
            <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
              No instruments found for this criteria
            </span>
          )}
        />
      </div>
    </div>
  );
}
