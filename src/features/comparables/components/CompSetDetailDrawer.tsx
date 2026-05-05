import { useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, SelectionChangedEvent } from "ag-grid-community";
import type { ICellRendererParams } from "ag-grid-community";
import { Button, Input, Popconfirm } from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CompSet, Instrument } from "../types/index.js";
import { useComparablesStore } from "../store/comparables.store.js";

type Props = {
  detail: CompSet;
  onClose: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onRemoveInstruments: (setId: string, isins: string[]) => void;
  onDropInstrument: (instrument: Instrument) => void;
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
    width: 60,
    cellRenderer: CurrencyCell,
    sortable: true,
  },
  {
    headerName: "ISIN",
    field: "isin",
    width: 130,
    cellStyle: { fontFamily: "monospace" } as Record<string, string>,
  },
  {
    headerName: "Security",
    field: "securityName",
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: "Type",
    field: "bondType",
    width: 72,
    cellRenderer: BondTypeCell,
  },
];

const GRID_STYLE = {
  "--ag-font-size": "12px",
  "--ag-row-height": "32px",
  "--ag-header-height": "34px",
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

export function CompSetDetailDrawer({
  detail,
  onClose,
  onRename,
  onDelete,
  onRemoveInstruments,
  onDropInstrument,
}: Props) {
  const gridRef = useRef<AgGridReact<Instrument>>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(detail.name);
  const [selectedIsins, setSelectedIsins] = useState<string[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const draggingInstrument = useComparablesStore((s) => s.draggingInstrument);
  const canDropHere =
    !!draggingInstrument &&
    !detail.instruments.some((i) => i.isin === draggingInstrument.isin);

  function saveRename() {
    if (nameValue.trim() && nameValue.trim() !== detail.name) {
      onRename(detail.id, nameValue.trim());
    }
    setEditingName(false);
  }

  function cancelRename() {
    setNameValue(detail.name);
    setEditingName(false);
  }

  const onSelectionChanged = useCallback((e: SelectionChangedEvent<Instrument>) => {
    setSelectedIsins(e.api.getSelectedRows().map((r) => r.isin));
  }, []);

  function handleRemove() {
    onRemoveInstruments(detail.id, selectedIsins);
    setSelectedIsins([]);
    gridRef.current?.api?.deselectAll();
  }

  const isDropActive = isHovering && canDropHere;
  const isAlreadyInSet = isHovering && !canDropHere;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          {editingName ? (
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onPressEnter={saveRename}
              onBlur={saveRename}
              onKeyDown={(e) => e.key === "Escape" && cancelRename()}
              autoFocus
              size="small"
              style={{ flex: 1 }}
            />
          ) : (
            <span
              onClick={() => setEditingName(true)}
              title="Click to rename"
              style={{
                fontWeight: 600,
                fontSize: "var(--font-size-base)",
                color: "var(--color-text-primary)",
                cursor: "text",
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {detail.name}
              <EditOutlined style={{ fontSize: 11, color: "var(--color-text-tertiary)", opacity: 0.6 }} />
            </span>
          )}
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={onClose}
            aria-label="Close detail panel"
            style={{ flexShrink: 0, color: "var(--color-text-tertiary)" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {detail.instruments.length} instrument{detail.instruments.length !== 1 ? "s" : ""}
          </span>
          <Popconfirm
            title="Delete this comp set?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(detail.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            placement="bottomRight"
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />} aria-label="Delete comp set">
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>

      {/* Drop zone + Grid */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          transition: "background 120ms",
          background: isDropActive
            ? "rgba(59,130,246,0.04)"
            : isAlreadyInSet
              ? "rgba(239,68,68,0.04)"
              : undefined,
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          if (draggingInstrument) setIsHovering(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsHovering(false);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (draggingInstrument && canDropHere) {
            onDropInstrument(draggingInstrument);
          }
          setIsHovering(false);
        }}
      >
        {/* Drop overlay */}
        {isHovering && draggingInstrument && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              border: `2px dashed ${isDropActive ? "#3B82F6" : "#EF4444"}`,
              borderRadius: 4,
              margin: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              background: isDropActive ? "rgba(59,130,246,0.06)" : "rgba(239,68,68,0.06)",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: isDropActive ? "#2563EB" : "#DC2626",
                background: isDropActive ? "#EFF6FF" : "#FEF2F2",
                padding: "4px 10px",
                borderRadius: 4,
              }}
            >
              {isDropActive ? "Drop to add" : "Already in set"}
            </span>
          </div>
        )}

        <div className="ag-theme-alpine" style={GRID_STYLE}>
          <AgGridReact<Instrument>
            ref={gridRef}
            rowData={detail.instruments}
            columnDefs={COLUMN_DEFS}
            rowSelection="multiple"
            rowMultiSelectWithClick
            rowStyle={{ cursor: "pointer" }}
            onSelectionChanged={onSelectionChanged}
            animateRows
            suppressCellFocus
            noRowsOverlayComponent={() => (
              <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
                No instruments in this set yet. Drag rows here to add.
              </span>
            )}
          />
        </div>
      </div>

      {/* Remove action bar */}
      {selectedIsins.length > 0 && (
        <div
          style={{
            padding: "10px 14px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "var(--color-surface-white)",
          }}
        >
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {selectedIsins.length} selected
          </span>
          <Button size="small" danger onClick={handleRemove}>
            Remove from set
          </Button>
        </div>
      )}
    </div>
  );
}
