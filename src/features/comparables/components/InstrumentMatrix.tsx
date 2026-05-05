import { useState, useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GetRowIdParams } from "ag-grid-community";
import type { ICellRendererParams } from "ag-grid-community";
import { Checkbox, Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useComparablesStore } from "../store/comparables.store.js";
import type { Instrument } from "../types/index.js";
import { CheckboxColHeader } from "./CheckboxColHeader.js";
import type { CheckboxHeaderParams } from "./CheckboxColHeader.js";

const CURRENCY_ORDER = ["EUR", "USD", "CHF", "GBP"];

type MatrixRow = Instrument & {
  fairValue: number;
  fairValueChecked: boolean;
  [key: string]: unknown; // cs_${id}: boolean
};

// --- Cell params type shared by checkbox cells ---
type CheckboxCellParams = ICellRendererParams<MatrixRow> & {
  checkboxField: string;
  onToggle: (isin: string, field: string) => void;
};

// --- Deterministic fair value from ISIN ---
function isinToFairValue(isin: string): number {
  let h = 0;
  for (const c of isin) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return Math.round((98.5 + (Math.abs(h) % 400) / 100) * 100) / 100;
}

// --- Cell renderers ---
const CURRENCY_COLORS: Record<string, string> = {
  CHF: "#dc2626", EUR: "#2563eb", USD: "#059669", GBP: "#7c3aed",
};

function CurrencyCell({ value }: ICellRendererParams) {
  const color = CURRENCY_COLORS[value as string] ?? "var(--color-text-secondary)";
  return <span style={{ color, fontWeight: 700, letterSpacing: "0.03em" }}>{value as string}</span>;
}

function BondTypeCell({ value }: ICellRendererParams) {
  const isGlobal = value === "Global";
  return (
    <span style={{
      fontSize: 10, padding: "1px 5px", borderRadius: 3,
      background: isGlobal ? "#EFF6FF" : "#F1F5F9",
      color: isGlobal ? "#1D4ED8" : "#475569",
      border: `1px solid ${isGlobal ? "#BFDBFE" : "#CBD5E1"}`,
    }}>{value as string}</span>
  );
}

function FairValueCheckboxCell({ data, checkboxField, onToggle }: CheckboxCellParams) {
  const row = data as MatrixRow;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
      <Checkbox
        checked={!!row[checkboxField]}
        onChange={() => onToggle(row.isin, checkboxField)}
        onClick={(e) => e.stopPropagation()}
      />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--color-text-secondary)" }}>
        {row.fairValue.toFixed(2)}
      </span>
    </div>
  );
}

function MemberCheckboxCell({ data, checkboxField, onToggle }: CheckboxCellParams) {
  const row = data as MatrixRow;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Checkbox
        checked={!!row[checkboxField]}
        onChange={() => onToggle(row.isin, checkboxField)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// --- Fixed (pinned) columns ---
const PINNED_COLS: ColDef<MatrixRow>[] = [
  { headerName: "CCY", field: "currency", pinned: "left", width: 58, cellRenderer: CurrencyCell, sortable: true, resizable: false },
  { headerName: "ISIN", field: "isin", pinned: "left", width: 144, cellStyle: { fontFamily: "monospace", fontSize: "11px", color: "var(--color-text-secondary)" } as Record<string, string>, sortable: true },
  { headerName: "Issuer", field: "issuer", pinned: "left", width: 72, cellStyle: { color: "var(--color-text-secondary)" } as Record<string, string>, sortable: true },
  { headerName: "Security", field: "securityName", pinned: "left", flex: 1, minWidth: 160, sortable: true },
  { headerName: "Type", field: "bondType", pinned: "left", width: 68, cellRenderer: BondTypeCell, sortable: true, resizable: false },
];

const GRID_STYLE = {
  "--ag-font-size": "12px",
  "--ag-row-height": "32px",
  "--ag-header-height": "36px",
  "--ag-foreground-color": "#0F172A",
  "--ag-header-background-color": "#F1F5F9",
  "--ag-header-foreground-color": "#64748B",
  "--ag-header-font-weight": "600",
  "--ag-border-color": "#E2E8F0",
  "--ag-row-border-color": "#E2E8F0",
  "--ag-selected-row-background-color": "#EFF6FF",
  "--ag-background-color": "#FFFFFF",
  "--ag-odd-row-background-color": "#FAFBFC",
  "--ag-accent-color": "#3B82F6",
  "--ag-cell-horizontal-padding": "10px",
  "--ag-wrapper-border-radius": "0px",
  "--ag-pinned-column-border-color": "#CBD5E1",
  height: "100%",
} as React.CSSProperties;

const getRowId = (params: GetRowIdParams<MatrixRow>) => params.data.isin;

// --- Main component ---
export function InstrumentMatrix() {
  const compSets = useComparablesStore((s) => s.compSets);
  const gridRef = useRef<AgGridReact<MatrixRow>>(null);
  const [isinFilter, setIsinFilter] = useState("");
  const [issuerFilter, setIssuerFilter] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  // Filter state in a ref so AG Grid's external filter reads latest value without re-renders
  const filterRef = useRef({ isin: "", issuer: "" });

  // Stats per currency for tab labels (instrument count + relevant comp set count)
  const currencyStats = useMemo(() => {
    const instrSets: Record<string, Set<string>> = {};
    const csSets: Record<string, Set<string>> = {};
    for (const cs of compSets) {
      for (const instr of cs.instruments) {
        const ccy = instr.currency;
        (instrSets[ccy] ??= new Set()).add(instr.isin);
        (csSets[ccy] ??= new Set()).add(cs.id);
      }
    }
    return CURRENCY_ORDER
      .filter((c) => instrSets[c])
      .map((c) => ({ currency: c, instruments: instrSets[c]!.size, compSets: csSets[c]!.size }));
  }, [compSets]);

  // Flatten instruments for the selected currency only. Checkbox state starts in data.
  const rowData = useMemo<MatrixRow[]>(() => {
    const seen = new Map<string, MatrixRow>();
    for (const cs of compSets) {
      for (const instr of cs.instruments) {
        if (instr.currency !== selectedCurrency) continue;
        if (!seen.has(instr.isin)) {
          seen.set(instr.isin, {
            ...instr,
            fairValue: isinToFairValue(instr.isin),
            fairValueChecked: false,
          });
        }
        // comp set column initial checked state = membership
        (seen.get(instr.isin) as MatrixRow)[`cs_${cs.id}`] = true;
      }
    }
    return Array.from(seen.values());
  }, [compSets, selectedCurrency]);

  // Flip one cell's boolean field via a targeted transaction
  const toggleCell = useCallback((isin: string, field: string) => {
    const api = gridRef.current?.api;
    if (!api) return;
    const node = api.getRowNode(isin);
    if (!node?.data) return;
    const updated = { ...(node.data as MatrixRow), [field]: !node.data[field] };
    api.applyTransaction({ update: [updated] });
  }, []);

  // Toggle all visible rows for a column
  const toggleAll = useCallback((field: string, nextChecked: boolean) => {
    const api = gridRef.current?.api;
    if (!api) return;
    const updates: MatrixRow[] = [];
    api.forEachNodeAfterFilter((node) => {
      if (node.data) updates.push({ ...(node.data as MatrixRow), [field]: nextChecked });
    });
    if (updates.length) api.applyTransaction({ update: updates });
  }, []);

  // Only comp sets that contain at least one instrument in the selected currency
  const visibleCompSets = useMemo(
    () => compSets.filter((cs) => cs.instruments.some((i) => i.currency === selectedCurrency)),
    [compSets, selectedCurrency],
  );

  // Dynamic scrollable columns: Fair Value + one per relevant comp set
  const scrollableCols = useMemo<ColDef<MatrixRow>[]>(() => {
    const fvParams: CheckboxHeaderParams = { membershipField: "fairValueChecked", onToggleAll: toggleAll };
    const cols: ColDef<MatrixRow>[] = [{
      headerName: "Fair Value",
      field: "fairValueChecked",
      width: 124,
      headerComponent: CheckboxColHeader,
      headerComponentParams: fvParams,
      cellRenderer: FairValueCheckboxCell,
      cellRendererParams: { checkboxField: "fairValueChecked", onToggle: toggleCell },
      sortable: false,
    }];

    for (const cs of visibleCompSets) {
      const field = `cs_${cs.id}`;
      const csParams: CheckboxHeaderParams = { membershipField: field, onToggleAll: toggleAll };
      cols.push({
        headerName: cs.name,
        field,
        width: Math.max(110, cs.name.length * 8 + 48),
        headerComponent: CheckboxColHeader,
        headerComponentParams: csParams,
        cellRenderer: MemberCheckboxCell,
        cellRendererParams: { checkboxField: field, onToggle: toggleCell },
        sortable: false,
      });
    }
    return cols;
  }, [visibleCompSets, toggleCell, toggleAll]);

  const colDefs = useMemo<ColDef<MatrixRow>[]>(
    () => [...PINNED_COLS, ...scrollableCols],
    [scrollableCols],
  );

  // External filter: avoids replacing rowData (which would wipe transaction state)
  const isExternalFilterPresent = useCallback(() => {
    return !!(filterRef.current.isin || filterRef.current.issuer);
  }, []);

  const doesExternalFilterPass = useCallback((node: { data: MatrixRow | undefined }) => {
    const row = node.data;
    if (!row) return true;
    const { isin, issuer } = filterRef.current;
    return (
      (!isin || row.isin.toLowerCase().includes(isin)) &&
      (!issuer || row.issuer.toLowerCase().includes(issuer))
    );
  }, []);

  function clearTextFilters() {
    setIsinFilter("");
    setIssuerFilter("");
    filterRef.current = { isin: "", issuer: "" };
    gridRef.current?.api?.onFilterChanged();
  }

  function onCurrencyChange(ccy: string) {
    setSelectedCurrency(ccy);
    clearTextFilters();
  }

  function onIsinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setIsinFilter(val);
    filterRef.current.isin = val.trim().toLowerCase();
    gridRef.current?.api?.onFilterChanged();
  }

  function onIssuerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setIssuerFilter(val);
    filterRef.current.issuer = val.trim().toLowerCase();
    gridRef.current?.api?.onFilterChanged();
  }

  const tabItems = currencyStats.map(({ currency, instruments, compSets: csCount }) => ({
    key: currency,
    label: (
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontWeight: 700, color: CURRENCY_COLORS[currency] ?? "inherit" }}>
          {currency}
        </span>
        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", fontWeight: 400 }}>
          {instruments} · {csCount}cs
        </span>
      </span>
    ),
  }));

  const currentStats = currencyStats.find((s) => s.currency === selectedCurrency);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Currency tabs */}
      <Tabs
        activeKey={selectedCurrency}
        items={tabItems}
        onChange={onCurrencyChange}
        size="small"
        style={{ flexShrink: 0 }}
        tabBarStyle={{ marginBottom: 0, borderBottom: "1px solid var(--color-border)" }}
      />

      {/* Filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0 8px", flexShrink: 0, borderBottom: "1px solid var(--color-border)" }}>
        <Input
          prefix={<SearchOutlined style={{ color: "var(--color-text-tertiary)" }} />}
          placeholder="Filter by ISIN…"
          value={isinFilter}
          onChange={onIsinChange}
          allowClear
          size="small"
          style={{ width: 220 }}
        />
        <Input
          prefix={<SearchOutlined style={{ color: "var(--color-text-tertiary)" }} />}
          placeholder="Filter by Issuer…"
          value={issuerFilter}
          onChange={onIssuerChange}
          allowClear
          size="small"
          style={{ width: 200 }}
        />
        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginLeft: "auto" }}>
          {rowData.length} instrument{rowData.length !== 1 ? "s" : ""}
          {currentStats && ` · ${currentStats.compSets} comp set${currentStats.compSets !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <div className="ag-theme-alpine" style={GRID_STYLE}>
          <AgGridReact<MatrixRow>
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            getRowId={getRowId}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            suppressRowClickSelection
            suppressCellFocus
            suppressMovableColumns
            animateRows={false}
            noRowsOverlayComponent={() => (
              <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
                No instruments match the current filters.
              </span>
            )}
          />
        </div>
      </div>
    </div>
  );
}
